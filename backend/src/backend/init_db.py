from src.backend.db.database import Base, engine

from src.backend.models.user import User
from src.backend.models.project import Project
from src.backend.models.skill import Skill
from src.backend.models.experience import Experience
from src.backend.models.message import Message


def init_database():
    Base.metadata.create_all(bind=engine)
    print("DATABASE TABLES CREATED")


if __name__ == "__main__":
    init_database()