from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr


class MessageCreate(BaseModel):
    name: str
    email: EmailStr
    message: str


class MessageResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    message: str
    is_read: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class MessageReadUpdate(BaseModel):
    is_read: bool