from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="The Almanac of Practice API")

class User(BaseModel):
    id: int
    first_name: str
    last_name: str|None = None
    username: str|None = None
    language_code: str
    allows_write_to_pm: bool 


origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000",
    "https://10f6-31-30-167-157.ngrok-free.app",
    "https://31.30.167.157",
    "http://31.30.167.157",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def first():
    return {"message":"bolno"}
# app.include_router()


@app.post("/telegram/")
def get_all_initdata(user: User, userInit: str|None=None):
    print(user)
    print(user.username)
    return {"message":"OK"}
