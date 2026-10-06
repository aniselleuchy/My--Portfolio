from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ProjectCreate(BaseModel):
    title: str
    description: str | None = None
    image_url: str | None = None
    github_url: str | None = None
    demo_url: str | None = None


class ProjectUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    image_url: str | None = None
    github_url: str | None = None
    demo_url: str | None = None


class ProjectResponse(BaseModel):
    id: int
    title: str
    description: str | None
    image_url: str | None
    github_url: str | None
    demo_url: str | None
    created_at: datetime
    updated_at: datetime | None

    model_config = ConfigDict(from_attributes=True)