import json

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.auth import get_current_teacher
from app.database import get_db
from app.models import Activity, Session, SessionGroup, SessionRotation, Teacher
from app.schemas import SessionCreate, SessionOut
from app.services.activity_service import build_rotation_schedule
from app.services.session_service import generate_groups

router = APIRouter(prefix="/api", tags=["sessions"])


@router.get("/sessions", response_model=list[SessionOut])
def list_sessions(db: Session = Depends(get_db), current_teacher: Teacher = Depends(get_current_teacher)):
    return db.query(Session).filter(Session.teacher_id == current_teacher.id).all()


@router.post("/sessions", response_model=SessionOut)
def create_session(payload: SessionCreate, db: Session = Depends(get_db), current_teacher: Teacher = Depends(get_current_teacher)):
    session = Session(
        teacher_id=current_teacher.id,
        grade=payload.grade,
        class_name=payload.class_name,
        student_count=payload.student_count,
        duration=payload.duration,
        ground_size=payload.ground_size,
        location=payload.location,
        objective=payload.objective,
        intensity=payload.intensity,
        equipment_available=payload.equipment_available,
        accessibility_considerations=payload.accessibility_considerations,
        teacher_notes=payload.teacher_notes,
        participation_target=max(20, int(payload.student_count * 0.85)),
    )
    db.add(session)
    db.commit()
    db.refresh(session)
    return session


@router.get("/sessions/{session_id}", response_model=SessionOut)
def get_session(session_id: int, db: Session = Depends(get_db), current_teacher: Teacher = Depends(get_current_teacher)):
    session = db.query(Session).filter(Session.id == session_id, Session.teacher_id == current_teacher.id).first()
    if not session:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Session not found")
    return session


@router.post("/sessions/{session_id}/generate")
def generate_session(session_id: int, db: Session = Depends(get_db), current_teacher: Teacher = Depends(get_current_teacher)):
    session = db.query(Session).filter(Session.id == session_id, Session.teacher_id == current_teacher.id).first()
    if not session:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Session not found")

    activities = db.query(Activity).all()[:6]
    groups = generate_groups(session.student_count, session.grade)
    db.query(SessionGroup).filter(SessionGroup.session_id == session.id).delete()
    db.query(SessionRotation).filter(SessionRotation.session_id == session.id).delete()

    for group in groups:
        db.add(SessionGroup(session_id=session.id, name=group["name"], members=json.dumps(group["students"])))

    schedule = build_rotation_schedule(session.student_count, [activity.name for activity in activities])
    for item in schedule:
        db.add(
            SessionRotation(
                session_id=session.id,
                round_number=int(item["round"]),
                group_name=str(item["group"]),
                zone_name=str(item["zone"]),
                zone_activity=str(item["activity"]),
                duration=8,
                instructions="Teacher instructions: balance active effort with safe spacing and inclusive adaptations.",
            )
        )

    session.generated_summary = "Warm-up, activity zones, rotation schedule, and cool-down prepared for a student active PE session."
    session.participation_target = max(20, int(session.student_count * 0.85))
    db.commit()

    return {
        "message": "Inclusive session generated",
        "warm_up": "Dynamic mobility and coordination game",
        "groups": groups,
        "zones": [
            {"name": activity.name, "activity": activity.name, "group": group["name"], "duration": 8, "equipment": activity.equipment, "instructions": activity.instructions, "difficulty": activity.difficulty, "adaptation": activity.accessibility_adaptations, "safety": activity.safety_instructions}
            for activity, group in zip(activities, groups)
        ],
        "rotation_schedule": schedule,
        "participation_target": session.participation_target,
    }


@router.get("/sessions/{session_id}/groups")
def get_session_groups(session_id: int, db: Session = Depends(get_db), current_teacher: Teacher = Depends(get_current_teacher)):
    session = db.query(Session).filter(Session.id == session_id, Session.teacher_id == current_teacher.id).first()
    if not session:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Session not found")
    groups = db.query(SessionGroup).filter(SessionGroup.session_id == session.id).all()
    return [{"id": group.id, "name": group.name, "members": json.loads(group.members)} for group in groups]


@router.get("/sessions/{session_id}/rotations")
def get_session_rotations(session_id: int, db: Session = Depends(get_db), current_teacher: Teacher = Depends(get_current_teacher)):
    session = db.query(Session).filter(Session.id == session_id, Session.teacher_id == current_teacher.id).first()
    if not session:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Session not found")
    rotations = db.query(SessionRotation).filter(SessionRotation.session_id == session.id).all()
    return [{
        "id": rotation.id,
        "round_number": rotation.round_number,
        "group_name": rotation.group_name,
        "zone_name": rotation.zone_name,
        "zone_activity": rotation.zone_activity,
        "duration": rotation.duration,
        "instructions": rotation.instructions,
    } for rotation in rotations]
