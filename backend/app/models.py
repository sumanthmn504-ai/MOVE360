from __future__ import annotations

from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from app.database import Base


class Teacher(Base):
    __tablename__ = "teachers"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(80), unique=True, index=True, nullable=False)
    email = Column(String(120), unique=True, index=True, nullable=False)
    full_name = Column(String(120), nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(40), default="teacher")
    created_at = Column(DateTime, default=datetime.utcnow)

    sessions = relationship("Session", back_populates="teacher")
    equipment = relationship("Equipment", back_populates="teacher")


class Equipment(Base):
    __tablename__ = "equipment"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False)
    category = Column(String(80), nullable=False)
    quantity = Column(Integer, default=0)
    condition = Column(String(40), default="Good")
    location = Column(String(120), default="Store room")
    notes = Column(Text, default="")
    available = Column(Boolean, default=True)
    teacher_id = Column(Integer, ForeignKey("teachers.id"), nullable=False)

    teacher = relationship("Teacher", back_populates="equipment")


class Activity(Base):
    __tablename__ = "activities"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False)
    description = Column(Text, nullable=False)
    grade_range = Column(String(40), default="1-10")
    skill = Column(String(80), default="movement")
    objective = Column(String(120), default="Participation")
    duration = Column(Integer, default=10)
    group_size = Column(Integer, default=6)
    equipment = Column(String(200), default="None")
    equipment_quantity = Column(String(80), default="1")
    space_required = Column(String(80), default="Medium")
    intensity = Column(String(40), default="Moderate")
    difficulty = Column(String(40), default="Standard")
    instructions = Column(Text, default="")
    setup = Column(Text, default="")
    safety_instructions = Column(Text, default="")
    beginner_variation = Column(Text, default="")
    standard_variation = Column(Text, default="")
    challenge_variation = Column(Text, default="")
    accessibility_adaptations = Column(Text, default="")
    curriculum_mapping = Column(Text, default="Curriculum mapping pending verification.")
    category = Column(String(80), default="movement")
    demo = Column(Boolean, default=True)


class Session(Base):
    __tablename__ = "sessions"

    id = Column(Integer, primary_key=True, index=True)
    teacher_id = Column(Integer, ForeignKey("teachers.id"), nullable=False)
    grade = Column(Integer, nullable=False)
    class_name = Column(String(120), default="PE Class")
    student_count = Column(Integer, default=0)
    duration = Column(Integer, default=30)
    ground_size = Column(String(30), default="Medium")
    location = Column(String(30), default="Outdoor")
    objective = Column(String(200), default="Movement")
    intensity = Column(String(30), default="Moderate")
    equipment_available = Column(Text, default="")
    accessibility_considerations = Column(Text, default="")
    teacher_notes = Column(Text, default="")
    generated_summary = Column(Text, default="")
    participation_target = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

    teacher = relationship("Teacher", back_populates="sessions")


class SessionGroup(Base):
    __tablename__ = "session_groups"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("sessions.id"), nullable=False)
    name = Column(String(40), nullable=False)
    members = Column(Text, default="")
    created_at = Column(DateTime, default=datetime.utcnow)


class SessionRotation(Base):
    __tablename__ = "session_rotations"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("sessions.id"), nullable=False)
    round_number = Column(Integer, nullable=False)
    group_name = Column(String(40), nullable=False)
    zone_name = Column(String(80), nullable=False)
    zone_activity = Column(String(150), nullable=False)
    duration = Column(Integer, default=5)
    instructions = Column(Text, default="")


class ParticipationRecord(Base):
    __tablename__ = "participation_records"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("sessions.id"), nullable=False)
    round_number = Column(Integer, nullable=False)
    zone_name = Column(String(80), default="")
    group_name = Column(String(40), default="")
    active_count = Column(Integer, default=0)
    partially_active_count = Column(Integer, default=0)
    waiting_count = Column(Integer, default=0)
    observed_at = Column(DateTime, default=datetime.utcnow)


class FeedbackRecord(Base):
    __tablename__ = "feedback"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("sessions.id"), nullable=False)
    easy_to_conduct = Column(Integer, default=0)
    setup_time_reasonable = Column(Integer, default=0)
    students_active = Column(Integer, default=0)
    instructions_clear = Column(Integer, default=0)
    adaptations_useful = Column(Integer, default=0)
    equipment_sufficient = Column(Integer, default=0)
    what_worked = Column(Text, default="")
    what_did_not_work = Column(Text, default="")
    what_should_change = Column(Text, default="")
    created_at = Column(DateTime, default=datetime.utcnow)


class CurriculumMapping(Base):
    __tablename__ = "curriculum_mapping"

    id = Column(Integer, primary_key=True, index=True)
    state = Column(String(80), default="Pending verification")
    authority = Column(String(120), default="Pending verification")
    document_name = Column(String(200), default="Curriculum mapping pending verification.")
    version_year = Column(String(40), default="Pending")
    grade = Column(Integer, default=1)
    learning_outcome = Column(String(200), default="Pending verification")
    pe_competency = Column(String(120), default="Pending verification")
    skill = Column(String(100), default="Movement")
    activity_mapping = Column(String(200), default="Pending verification")
    source_reference = Column(String(200), default="Pending verification")
    verified = Column(Boolean, default=False)


class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    class_name = Column(String(80), nullable=False)
    name = Column(String(80), nullable=False)
    grade = Column(Integer, default=1)
    participation_level = Column(String(40), default="Developing")
    confidence = Column(Integer, default=3)
    skill_level = Column(Integer, default=3)
    mobility = Column(String(40), default="Standard")
