from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from .api.routes import auth

app = FastAPI(title="The Almanac of Practice API")


origins = [
    "http://localhost",
    "http://localhost:3000",
    "https://09c6-31-30-167-155.ngrok-free.app",
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


app.include_router(auth.router)
