from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.auth import get_current_teacher
from app.database import get_db
from app.models import CurriculumMapping, Teacher

router = APIRouter(prefix="/api", tags=["curriculum"])


@router.get("/curriculum")
def get_curriculum(db: Session = Depends(get_db), current_teacher: Teacher = Depends(get_current_teacher)):
    mapping = db.query(CurriculumMapping).all()
    if not mapping:
        return [{
            "state": "Pending",
            "authority": "Pending verification",
            "document_name": "Curriculum mapping pending verification.",
            "version_year": "Pending",
            "grade": 5,
            "learning_outcome": "Curriculum mapping pending verification.",
            "pe_competency": "Curriculum mapping pending verification.",
            "skill": "Movement",
            "activity_mapping": "Curriculum mapping pending verification.",
            "source_reference": "Curriculum mapping pending verification.",
            "verified": False,
        }]
    return mapping
