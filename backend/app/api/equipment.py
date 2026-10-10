from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.auth import get_current_teacher
from app.database import get_db
from app.models import Equipment, Teacher
from app.schemas import EquipmentCreate, EquipmentOut

router = APIRouter(prefix="/api", tags=["equipment"])


@router.get("/equipment", response_model=list[EquipmentOut])
def list_equipment(db: Session = Depends(get_db), current_teacher: Teacher = Depends(get_current_teacher)):
    return db.query(Equipment).filter(Equipment.teacher_id == current_teacher.id).all()


@router.post("/equipment", response_model=EquipmentOut)
def create_equipment(payload: EquipmentCreate, db: Session = Depends(get_db), current_teacher: Teacher = Depends(get_current_teacher)):
    equipment = Equipment(**payload.dict(), teacher_id=current_teacher.id)
    db.add(equipment)
    db.commit()
    db.refresh(equipment)
    return equipment


@router.put("/equipment/{equipment_id}", response_model=EquipmentOut)
def update_equipment(equipment_id: int, payload: EquipmentCreate, db: Session = Depends(get_db), current_teacher: Teacher = Depends(get_current_teacher)):
    equipment = db.query(Equipment).filter(Equipment.id == equipment_id, Equipment.teacher_id == current_teacher.id).first()
    if not equipment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Equipment not found")
    for field, value in payload.dict().items():
        setattr(equipment, field, value)
    db.commit()
    db.refresh(equipment)
    return equipment


@router.delete("/equipment/{equipment_id}")
def delete_equipment(equipment_id: int, db: Session = Depends(get_db), current_teacher: Teacher = Depends(get_current_teacher)):
    equipment = db.query(Equipment).filter(Equipment.id == equipment_id, Equipment.teacher_id == current_teacher.id).first()
    if not equipment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Equipment not found")
    db.delete(equipment)
    db.commit()
    return {"message": "Equipment removed"}
