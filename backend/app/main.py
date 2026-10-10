from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import inspect

from app.api.activities import router as activities_router
from app.api.ai import router as ai_router
from app.api.auth import router as auth_router
from app.api.curriculum import router as curriculum_router
from app.api.dashboard import router as dashboard_router
from app.api.equipment import router as equipment_router
from app.api.feedback import router as feedback_router
from app.api.reports import router as reports_router
from app.api.sessions import router as sessions_router
from app.api.students import router as students_router
from app.database import Base, SessionLocal, engine
from app.models import *  # noqa: F401,F403
from app.seed import seed_demo_data

app = FastAPI(title="MOVE360", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup_event():
    existing_tables = set(inspect(engine).get_table_names())
    missing_tables = [table.name for table in Base.metadata.sorted_tables if table.name not in existing_tables]

    if missing_tables:
        Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        seed_demo_data(db)
    finally:
        db.close()


app.include_router(auth_router)
app.include_router(dashboard_router)
app.include_router(sessions_router)
app.include_router(activities_router)
app.include_router(equipment_router)
app.include_router(students_router)
app.include_router(reports_router)
app.include_router(curriculum_router)
app.include_router(feedback_router)
app.include_router(ai_router)


@app.get("/health")
def health_check():
    return {"status": "ok", "service": "MOVE360"}
