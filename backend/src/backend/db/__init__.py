from src.backend.db.database import Base, engine

from src.backend.models.user import User
from src.backend.models.project import Project


def init_database():
    Base.metadata.create_all(bind=engine)
    print("DATABASE TABLES CREATED")


if __name__ == "__main__":
    init_database()