from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from src.backend.db.database import get_db
from src.backend.models.experience import Experience
from src.backend.models.user import User
from src.backend.routers.auth import get_current_admin
from src.backend.schemas.experience import (
    ExperienceCreate,
    ExperienceResponse,
    ExperienceUpdate
)


router = APIRouter(
    prefix="/api/experience",
    tags=["Experience"]
)


@router.get(
    "",
    response_model=list[ExperienceResponse]
)
def get_experience(
    db: Session = Depends(get_db)
):
    return (
        db.query(Experience)
        .order_by(Experience.start_date.desc())
        .all()
    )


@router.get(
    "/{experience_id}",
    response_model=ExperienceResponse
)
def get_experience_item(
    experience_id: int,
    db: Session = Depends(get_db)
):
    experience = (
        db.query(Experience)
        .filter(Experience.id == experience_id)
        .first()
    )

    if not experience:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Experience not found"
        )

    return experience


@router.post(
    "",
    response_model=ExperienceResponse,
    status_code=status.HTTP_201_CREATED
)
def create_experience(
    data: ExperienceCreate,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):
    experience = Experience(
        company=data.company,
        position=data.position,
        description=data.description,
        start_date=data.start_date,
        end_date=data.end_date
    )

    db.add(experience)
    db.commit()
    db.refresh(experience)

    return experience


@router.put(
    "/{experience_id}",
    response_model=ExperienceResponse
)
def update_experience(
    experience_id: int,
    data: ExperienceUpdate,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):
    experience = (
        db.query(Experience)
        .filter(Experience.id == experience_id)
        .first()
    )

    if not experience:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Experience not found"
        )

    update_data = data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(experience, field, value)

    db.commit()
    db.refresh(experience)

    return experience


@router.delete(
    "/{experience_id}"
)
def delete_experience(
    experience_id: int,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):
    experience = (
        db.query(Experience)
        .filter(Experience.id == experience_id)
        .first()
    )

    if not experience:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Experience not found"
        )

    db.delete(experience)
    db.commit()

    return {
        "message": "Experience deleted successfully"
    }