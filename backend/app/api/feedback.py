from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.auth import get_current_teacher
from app.database import get_db
from app.models import FeedbackRecord, Teacher
from app.schemas import FeedbackCreate

router = APIRouter(prefix="/api", tags=["feedback"])


@router.post("/feedback")
def submit_feedback(payload: FeedbackCreate, db: Session = Depends(get_db), current_teacher: Teacher = Depends(get_current_teacher)):
    record = FeedbackRecord(
        session_id=payload.session_id,
        easy_to_conduct=payload.easy_to_conduct,
        setup_time_reasonable=payload.setup_time_reasonable,
        students_active=payload.students_active,
        instructions_clear=payload.instructions_clear,
        adaptations_useful=payload.adaptations_useful,
        equipment_sufficient=payload.equipment_sufficient,
        what_worked=payload.what_worked,
        what_did_not_work=payload.what_did_not_work,
        what_should_change=payload.what_should_change,
    )
    db.add(record)
    db.commit()
    return {"message": "Feedback saved", "success": True}
