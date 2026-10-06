from datetime import datetime

from pydantic import BaseModel, ConfigDict


class SkillCreate(BaseModel):
    name: str
    category: str | None = None
    level: int | None = None


class SkillUpdate(BaseModel):
    name: str | None = None
    category: str | None = None
    level: int | None = None


class SkillResponse(BaseModel):
    id: int
    name: str
    category: str | None
    level: int | None
    created_at: datetime
    updated_at: datetime | None

    model_config = ConfigDict(from_attributes=True)