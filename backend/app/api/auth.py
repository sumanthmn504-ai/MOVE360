from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.core.config import ACCESS_TOKEN_EXPIRE_MINUTES
from app.core.security import create_access_token, get_password_hash, get_token_payload, verify_password
from app.database import get_db
from app.models import Teacher
from app.schemas import TeacherCreate, TeacherLogin, TeacherOut, TokenResponse

router = APIRouter(prefix="/api/auth", tags=["auth"])
security = HTTPBearer(auto_error=False)


@router.post("/register", response_model=TokenResponse)
def register_teacher(payload: TeacherCreate, db: Session = Depends(get_db)):
    if db.query(Teacher).filter((Teacher.username == payload.username) | (Teacher.email == payload.email)).first():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Teacher already exists")

    teacher = Teacher(
        username=payload.username,
        email=payload.email,
        full_name=payload.full_name,
        password_hash=get_password_hash(payload.password),
        role="teacher",
    )
    db.add(teacher)
    db.commit()
    db.refresh(teacher)
    access_token = create_access_token({"sub": teacher.username}, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/login", response_model=TokenResponse)
def login_teacher(payload: TeacherLogin, db: Session = Depends(get_db)):
    teacher = db.query(Teacher).filter(Teacher.username == payload.username).first()
    if not teacher or not verify_password(payload.password, teacher.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")

    access_token = create_access_token({"sub": teacher.username}, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    return {"access_token": access_token, "token_type": "bearer"}


def get_current_teacher(
    credentials: HTTPAuthorizationCredentials | None = Depends(security),
    db: Session = Depends(get_db),
):
    if credentials is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required")

    payload = get_token_payload(credentials.credentials)
    username = payload.get("sub")
    teacher = db.query(Teacher).filter(Teacher.username == username).first()
    if teacher is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    return teacher


@router.get("/me", response_model=TeacherOut)
def read_current_teacher(current_teacher: Teacher = Depends(get_current_teacher)):
    return current_teacher


@router.post("/logout")
def logout_teacher():
    return {"message": "Logged out successfully"}
