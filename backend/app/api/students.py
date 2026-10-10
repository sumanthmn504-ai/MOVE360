from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.auth import get_current_teacher
from app.database import get_db
from app.models import Student, Teacher

router = APIRouter(prefix="/api", tags=["students"])


@router.get("/students")
def get_students(db: Session = Depends(get_db), current_teacher: Teacher = Depends(get_current_teacher)):
    return db.query(Student).all()
