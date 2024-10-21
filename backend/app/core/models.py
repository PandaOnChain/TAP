from sqlmodel import Field, SQLModel, create_engine, Session, select
from .database import DATABASE_URL 

class Hero(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    secret_name: str
    age: int | None = None 


class UserBase(SQLModel): 
    allows_write_to_pm: bool
    first_name: str
    id: int = Field(primary_key=True, unique=True)
    language_code: str
    last_name: str | None = None
    username: str | None = None
    is_premium: bool | None = False
 

class User(UserBase, table=True):
    pass

class Token(SQLModel):
    access_token: str
    token_type: str = "Bearer"

class TokenPayload(SQLModel):
    sub: int | None = None
    # exp: int | None = None

engine = create_engine(DATABASE_URL, echo=True)


def create_heroes():
    hero_1 = Hero(name="Deadpond", secret_name="Dive Wilson")
    hero_2 = Hero(name="Spider-Boy", secret_name="Pedro Parqueador")
    hero_3 = Hero(name="Rusty-Man", secret_name="Tommy Sharp", age=48)

    with Session(engine) as session:

        session.add(hero_1)
        session.add(hero_2)
        session.add(hero_3)

        session.commit() 

def select_heroes():
    with Session(engine) as session:
        statement = select(Hero)
        results = session.exec(statement)
        for hero in results:
            print(hero)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


if __name__ == "__main__":
    create_db_and_tables()
    # # create_heroes()
    # select_heroes()
