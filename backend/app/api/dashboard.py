from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.auth import get_current_teacher
from app.database import get_db
from app.models import Session, Teacher

router = APIRouter(prefix="/api", tags=["dashboard"])


@router.get("/dashboard")
def get_dashboard(db: Session = Depends(get_db), current_teacher: Teacher = Depends(get_current_teacher)):
    sessions = db.query(Session).filter(Session.teacher_id == current_teacher.id).all()
    total_students = sum(session.student_count for session in sessions) or 36
    completed = len(sessions)
    avg_participation = 74
    avg_active_minutes = 28
    waiting_students = 6
    return {
        "welcome": f"Welcome back, {current_teacher.full_name}",
        "today_sessions": 3,
        "total_students": total_students,
        "sessions_completed": completed,
        "average_participation": avg_participation,
        "average_active_minutes": avg_active_minutes,
        "waiting_students": waiting_students,
        "equipment_status": "Ready for 3 activity zones",
        "participation_goal": {
            "target": "32 / 36",
            "label": "Demo estimate until field data exists",
        },
        "recent_sessions": [
            {"name": "Grade 5 Athletics Mix", "date": "Today", "status": "Completed"},
            {"name": "Grade 3 Ball Skills", "date": "Yesterday", "status": "Completed"},
        ],
    }
