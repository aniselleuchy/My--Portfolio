import os

import certifi
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

from src.backend.core.config import settings
from urllib.parse import quote_plus


password = quote_plus(settings.DB_PASSWORD)

DATABASE_URL = (
    f"mysql+pymysql://"
    f"{settings.DB_USER}:{password}"
    f"@{settings.DB_HOST}:{settings.DB_PORT}"
    f"/{settings.DB_NAME}"
)


connect_args = {"connect_timeout": 10}

# TLS is required by TiDB Cloud; enabled only when DB_SSL=true (set on Render)
if os.getenv("DB_SSL", "").lower() == "true":
    connect_args["ssl"] = {"ca": certifi.where()}


engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    pool_recycle=280,
    connect_args=connect_args,
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()