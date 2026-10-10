from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Activity
from app.schemas import ActivityOut

router = APIRouter(prefix="/api", tags=["activities"])


@router.get("/activities", response_model=list[ActivityOut])
def list_activities(db: Session = Depends(get_db)):
    return db.query(Activity).all()


@router.get("/activities/{activity_id}", response_model=ActivityOut)
def get_activity(activity_id: int, db: Session = Depends(get_db)):
    activity = db.query(Activity).filter(Activity.id == activity_id).first()
    if not activity:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Activity not found")
    return activity
