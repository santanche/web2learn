from datetime import date
from typing import Optional

from sqlmodel import Field, Session, SQLModel, create_engine

def parse_date(birthday_str: Optional[str]) -> Optional[date]:
    if birthday_str:
        return date.fromisoformat(birthday_str)
    return None

class Users(SQLModel, table=True):
    email_id: str = Field(default=None, primary_key=True)
    name: str
    birthday: Optional[date] = None

user_1 = Users(email_id="asdrubal@email.com", name="Asdrubal", birthday=parse_date("2024-01-20"))
user_2 = Users(email_id="doriana@email.com", name="Doriana", birthday=parse_date("2024-03-05"))
user_3 = Users(email_id="bonerges@email.com", name="Bonerges", birthday=parse_date("2024-05-01"))

POSTGRES_USER = "postgres"
POSTGRES_PASSWORD = "postgres"
POSTGRES_SERVER = "localhost"
POSTGRES_PORT = "5431"
POSTGRES_DB = "test"
POSTGRES_URL = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_SERVER}:{POSTGRES_PORT}/{POSTGRES_DB}"

engine = create_engine(POSTGRES_URL)

SQLModel.metadata.create_all(engine)

with Session(engine) as session:
    session.add(user_1)
    session.add(user_2)
    session.add(user_3)
    session.commit()