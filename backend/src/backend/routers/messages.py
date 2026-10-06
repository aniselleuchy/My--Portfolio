from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from src.backend.db.database import get_db
from src.backend.models.message import Message
from src.backend.models.user import User
from src.backend.routers.auth import get_current_admin
from src.backend.schemas.message import (
    MessageCreate,
    MessageReadUpdate,
    MessageResponse
)


router = APIRouter(
    prefix="/api/messages",
    tags=["Messages"]
)


@router.post(
    "",
    response_model=MessageResponse,
    status_code=status.HTTP_201_CREATED
)
def create_message(
    data: MessageCreate,
    db: Session = Depends(get_db)
):
    message = Message(
        name=data.name,
        email=data.email,
        message=data.message,
        is_read=False
    )

    db.add(message)
    db.commit()
    db.refresh(message)

    return message


@router.get(
    "",
    response_model=list[MessageResponse]
)
def get_messages(
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):
    return (
        db.query(Message)
        .order_by(Message.created_at.desc())
        .all()
    )


@router.get(
    "/{message_id}",
    response_model=MessageResponse
)
def get_message(
    message_id: int,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):
    message = (
        db.query(Message)
        .filter(Message.id == message_id)
        .first()
    )

    if not message:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Message not found"
        )

    return message


@router.put(
    "/{message_id}/read",
    response_model=MessageResponse
)
def update_message_read_status(
    message_id: int,
    data: MessageReadUpdate,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):
    message = (
        db.query(Message)
        .filter(Message.id == message_id)
        .first()
    )

    if not message:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Message not found"
        )

    message.is_read = data.is_read

    db.commit()
    db.refresh(message)

    return message


@router.delete(
    "/{message_id}"
)
def delete_message(
    message_id: int,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):
    message = (
        db.query(Message)
        .filter(Message.id == message_id)
        .first()
    )

    if not message:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Message not found"
        )

    db.delete(message)
    db.commit()

    return {
        "message": "Message deleted successfully"
    }