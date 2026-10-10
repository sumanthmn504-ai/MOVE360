from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.auth import get_current_teacher
from app.database import get_db
from app.models import Teacher

router = APIRouter(prefix="/api", tags=["reports"])


@router.get("/reports")
def get_reports(db: Session = Depends(get_db), current_teacher: Teacher = Depends(get_current_teacher)):
    return {
        "session_information": {"name": "Grade 5 Inclusive Session", "students": 36, "duration": 40},
        "participation": {"active_students": 30, "waiting_students": 6, "participation_percent": 83.3},
        "active_minutes": 34,
        "equipment": ["Balls", "Cones", "Hoops"],
        "zone_performance": [{"zone": "Zone 1", "participation": 88}, {"zone": "Zone 2", "participation": 80}],
        "teacher_observations": "Most students stayed active with short transitions and low waiting time.",
        "accessibility_adaptations_used": ["Shorter distance", "Walking version", "Visual demonstration"],
        "demo_data": True,
    }


@router.get("/reports/comparison")
def get_comparison(db: Session = Depends(get_db), current_teacher: Teacher = Depends(get_current_teacher)):
    return {
        "before": {"students": 36, "active_students": 11, "waiting_students": 25, "active_minutes": 14, "participation_percent": 30.6},
        "after": {"students": 36, "active_students": 30, "waiting_students": 6, "active_minutes": 34, "participation_percent": 83.3},
        "label": "Demo data only. No field-test data available yet.",
    }
