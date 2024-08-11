# Base Model

Base data model, connecting all layers of the full-stack example.

## Relational (SQL) Model

~~~sql
CREATE TABLE users (
  email_id VARCHAR(320),
  name  VARCHAR(100) NOT NULL,
  birthday DATE,
  PRIMARY KEY (email_id)
);
~~~

## Object (Python) Model

~~~python
class Users(SQLModel, table=True):
    email_id: str = Field(default=None, primary_key=True)
    name: str
    birthday: date | None = None
~~~

