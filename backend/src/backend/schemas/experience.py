from datetime import date, datetime

from pydantic import BaseModel, ConfigDict


class ExperienceCreate(BaseModel):
    company: str | None = None
    position: str | None = None
    description: str | None = None
    start_date: date | None = None
    end_date: date | None = None


class ExperienceUpdate(BaseModel):
    company: str | None = None
    position: str | None = None
    description: str | None = None
    start_date: date | None = None
    end_date: date | None = None


class ExperienceResponse(BaseModel):
    id: int
    company: str | None
    position: str | None
    description: str | None
    start_date: date | None
    end_date: date | None
    created_at: datetime
    updated_at: datetime | None

    model_config = ConfigDict(from_attributes=True)