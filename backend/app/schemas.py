from __future__ import annotations

from typing import Any, Literal

from pydantic import BaseModel, Field


class TeacherCreate(BaseModel):
    username: str
    email: str
    full_name: str
    password: str


class TeacherLogin(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TeacherOut(BaseModel):
    id: int
    username: str
    email: str
    full_name: str
    role: str

    class Config:
        orm_mode = True


class EquipmentCreate(BaseModel):
    name: str
    category: Literal["Balls", "Cones", "Ropes", "Hoops", "Mats", "Markers", "Other"]
    quantity: int = 1
    condition: str = "Good"
    location: str = "Store room"
    notes: str = ""
    available: bool = True


class EquipmentOut(EquipmentCreate):
    id: int
    teacher_id: int

    class Config:
        orm_mode = True


class ActivityOut(BaseModel):
    id: int
    name: str
    description: str
    grade_range: str
    skill: str
    objective: str
    duration: int
    group_size: int
    equipment: str
    equipment_quantity: str
    space_required: str
    intensity: str
    difficulty: str
    instructions: str
    setup: str
    safety_instructions: str
    beginner_variation: str
    standard_variation: str
    challenge_variation: str
    accessibility_adaptations: str
    curriculum_mapping: str
    category: str
    demo: bool = True

    class Config:
        orm_mode = True


class SessionCreate(BaseModel):
    grade: int = Field(..., ge=1, le=10)
    class_name: str
    student_count: int = Field(..., ge=1)
    duration: int = Field(..., ge=10, le=120)
    ground_size: Literal["Small", "Medium", "Large"]
    location: Literal["Indoor", "Outdoor"]
    objective: str
    intensity: Literal["Low", "Moderate", "High"]
    equipment_available: str = ""
    accessibility_considerations: str = ""
    teacher_notes: str = ""


class SessionOut(SessionCreate):
    id: int
    teacher_id: int
    generated_summary: str
    participation_target: int
    created_at: str

    class Config:
        orm_mode = True


class GroupGenerateRequest(BaseModel):
    class_name: str
    student_count: int
    groups: int | None = None


class SessionReport(BaseModel):
    session_id: int
    metrics: dict[str, Any]


class FeedbackCreate(BaseModel):
    session_id: int
    easy_to_conduct: int = Field(..., ge=1, le=5)
    setup_time_reasonable: int = Field(..., ge=1, le=5)
    students_active: int = Field(..., ge=1, le=5)
    instructions_clear: int = Field(..., ge=1, le=5)
    adaptations_useful: int = Field(..., ge=1, le=5)
    equipment_sufficient: int = Field(..., ge=1, le=5)
    what_worked: str = ""
    what_did_not_work: str = ""
    what_should_change: str = ""


class CurriculumMappingOut(BaseModel):
    id: int
    state: str
    authority: str
    document_name: str
    version_year: str
    grade: int
    learning_outcome: str
    pe_competency: str
    skill: str
    activity_mapping: str
    source_reference: str
    verified: bool = False

    class Config:
        orm_mode = True


class AIRequest(BaseModel):
    message: str
    context: dict[str, Any] = Field(default_factory=dict)


class AIResponse(BaseModel):
    reply: str
    fallback: bool = False
