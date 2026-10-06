from sqlalchemy import Column, Date, DateTime, Integer, String, Text
from sqlalchemy.sql import func

from src.backend.db.database import Base


class Experience(Base):
    __tablename__ = "experience"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    company = Column(
        String(255),
        nullable=True
    )

    position = Column(
        String(255),
        nullable=True
    )

    description = Column(
        Text,
        nullable=True
    )

    start_date = Column(
        Date,
        nullable=True
    )

    end_date = Column(
        Date,
        nullable=True
    )

    created_at = Column(
        DateTime,
        server_default=func.now(),
        nullable=False
    )

    updated_at = Column(
        DateTime,
        server_default=func.now(),
        onupdate=func.now(),
        nullable=True
    )