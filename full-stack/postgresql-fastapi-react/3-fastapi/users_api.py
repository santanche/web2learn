from datetime import date
from fastapi import FastAPI
from sqlmodel import Field, Session, SQLModel, create_engine, select

class Users(SQLModel, table=True):
    email_id: str = Field(default=None, primary_key=True)
    name: str
    birthday: date | None = None

POSTGRES_USER = "postgres"
POSTGRES_PASSWORD = "postgres"
POSTGRES_SERVER = "localhost"
POSTGRES_PORT = "5431"
POSTGRES_DB = "test"
POSTGRES_URL = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_SERVER}:{POSTGRES_PORT}/{POSTGRES_DB}"

engine = create_engine(POSTGRES_URL, echo=True)

app = FastAPI()

@app.post("/users/")
def create_user(user: Users):
    with Session(engine) as session:
        session.add(user)
        session.commit()
        session.refresh(user)
        return user

@app.get("/users/")
def read_users():
    with Session(engine) as session:
        users = session.exec(select(Users)).all()
        return users
