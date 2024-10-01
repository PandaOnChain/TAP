from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from .api.routes import auth

app = FastAPI(title="The Almanac of Practice API")

class User(BaseModel):
    id: int
    first_name: str
    last_name: str|None = None
    username: str|None = None
    language_code: str
    allows_write_to_pm: bool 


origins = [
    "http://localhost",
    "http://localhost:3000",
    "https://780a-31-30-167-157.ngrok-free.app",
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

app.include_router(auth.router)