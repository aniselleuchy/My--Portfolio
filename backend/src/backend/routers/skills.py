from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from src.backend.db.database import get_db
from src.backend.models.skill import Skill
from src.backend.models.user import User
from src.backend.routers.auth import get_current_admin
from src.backend.schemas.skill import (
    SkillCreate,
    SkillResponse,
    SkillUpdate
)


router = APIRouter(
    prefix="/api/skills",
    tags=["Skills"]
)


@router.get(
    "",
    response_model=list[SkillResponse]
)
def get_skills(
    db: Session = Depends(get_db)
):
    return (
        db.query(Skill)
        .order_by(Skill.id.asc())
        .all()
    )


@router.get(
    "/{skill_id}",
    response_model=SkillResponse
)
def get_skill(
    skill_id: int,
    db: Session = Depends(get_db)
):
    skill = (
        db.query(Skill)
        .filter(Skill.id == skill_id)
        .first()
    )

    if not skill:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Skill not found"
        )

    return skill


@router.post(
    "",
    response_model=SkillResponse,
    status_code=status.HTTP_201_CREATED
)
def create_skill(
    data: SkillCreate,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):
    skill = Skill(
        name=data.name,
        category=data.category,
        level=data.level
    )

    db.add(skill)
    db.commit()
    db.refresh(skill)

    return skill


@router.put(
    "/{skill_id}",
    response_model=SkillResponse
)
def update_skill(
    skill_id: int,
    data: SkillUpdate,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):
    skill = (
        db.query(Skill)
        .filter(Skill.id == skill_id)
        .first()
    )

    if not skill:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Skill not found"
        )

    update_data = data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(skill, field, value)

    db.commit()
    db.refresh(skill)

    return skill


@router.delete(
    "/{skill_id}"
)
def delete_skill(
    skill_id: int,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):
    skill = (
        db.query(Skill)
        .filter(Skill.id == skill_id)
        .first()
    )

    if not skill:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Skill not found"
        )

    db.delete(skill)
    db.commit()

    return {
        "message": "Skill deleted successfully"
    }