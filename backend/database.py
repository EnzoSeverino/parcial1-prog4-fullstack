from sqlmodel import create_engine, SQLModel

DATABASE_URL = "postgresql://postgres:db788622@localhost:5432/mydb"

engine = create_engine(
    DATABASE_URL,
    echo=True,
)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)