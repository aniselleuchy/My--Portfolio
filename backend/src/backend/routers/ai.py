from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from src.backend.db.database import get_db
from src.backend.schemas.ai import (
    AIChatRequest,
    AIChatResponse
)
from src.backend.services.ai_agent import run_ai_agent


router = APIRouter(
    prefix="/api/ai",
    tags=["AI"]
)


@router.post(
    "/chat",
    response_model=AIChatResponse
)
def ai_chat(
    data: AIChatRequest,
    db: Session = Depends(get_db)
):
    try:
        answer = run_ai_agent(
            message=data.message,
            db=db
        )

        return {
            "response": answer
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"AI error: {str(error)}"
        )