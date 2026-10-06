from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.backend.db.database import get_db
from src.backend.models.experience import Experience
from src.backend.models.message import Message
from src.backend.models.project import Project
from src.backend.models.skill import Skill
from src.backend.models.user import User
from src.backend.routers.auth import get_current_admin


router = APIRouter(
    prefix="/api/admin",
    tags=["Admin Dashboard"]
)


@router.get("/dashboard")
def get_dashboard(
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):
    total_projects = db.query(Project).count()
    total_skills = db.query(Skill).count()
    total_experience = db.query(Experience).count()
    total_messages = db.query(Message).count()

    unread_messages = (
        db.query(Message)
        .filter(Message.is_read == False)
        .count()
    )

    total_users = db.query(User).count()

    return {
        "projects": total_projects,
        "skills": total_skills,
        "experience": total_experience,
        "messages": total_messages,
        "unread_messages": unread_messages,
        "users": total_users
    }