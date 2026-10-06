from sqlalchemy import text

from src.backend.db.database import engine


def test_database():
    try:
        with engine.connect() as connection:
            result = connection.execute(text("SELECT 1"))
            print("DATABASE CONNECTED")
            print("RESULT:", result.scalar())

    except Exception as e:
        print("DATABASE ERROR")
        print(type(e).__name__)
        print(e)


if __name__ == "__main__":
    test_database()