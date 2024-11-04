from datetime import datetime
from uuid import UUID, uuid4
from sqlalchemy import table
from sqlmodel import Field, SQLModel, create_engine, Session, select
from .database import DATABASE_URL 


class UserBase(SQLModel): 
    allows_write_to_pm: bool
    first_name: str
    id: int = Field(primary_key=True, unique=True)
    language_code: str
    last_name: str | None = None
    username: str | None = None
    is_premium: bool | None = False


class User(UserBase, table=True):
    last_sign_in: datetime | None = Field(default_factory=datetime.now)
    created: datetime | None = Field(default_factory=datetime.now)

class Token(SQLModel):
    access_token: str
    token_type: str = "Bearer"

class TokenPayload(SQLModel):
    sub: int | None = None
    # exp: int | None = None


class RepetitionBase(SQLModel):
    title: str = Field(min_length=3, max_length=255)
    description: str | None = Field(default=None, max_length=255)
    frequency_per_week: int | None = Field(default=None, gt=0, lt=8)


class RepetitionCreate(RepetitionBase):
    pass

class RepetitionUpdate(RepetitionBase):
    title: str | None = Field(default=None, min_length=3, max_length=255)
    description: str | None = Field(default=None, max_length=255) 

class Repetition(RepetitionBase, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    title: str = Field(max_length=255)
    owner_id: int = Field(foreign_key="user.id", nullable=False, ondelete="CASCADE")
    deleted: bool | None = False
    created: datetime | None = Field(default_factory=datetime.now)
    updated: datetime | None = Field(default_factory=datetime.now)


class RepetitionPublic(RepetitionBase):
    id: UUID

class RepetitionsPublic(SQLModel):
    data: list[RepetitionPublic]
    count: int 


class DailyNoteBase(SQLModel):
    done: bool | None = False
    note: str | None = None

class DailyNoteCreate(DailyNoteBase):   
    pass

class DailyNoteUpdate(DailyNoteBase):
    done: bool | None = None
    note: str | None = None
    updated: datetime | None = Field(default_factory=datetime.now) 

class DailyNote(DailyNoteBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    done: bool
    description: str | None = None
    created: datetime | None = Field(default_factory=datetime.now)
    updated: datetime | None = Field(default_factory=datetime.now)
    repetition_id: UUID = Field(foreign_key="repetition.id", nullable=False, ondelete="CASCADE")


class Message(SQLModel):
    message: str

engine = create_engine(DATABASE_URL, echo=True)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


if __name__ == "__main__":
    create_db_and_tables() 
