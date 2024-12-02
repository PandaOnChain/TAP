from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from .api.routes import auth, repetition, dailynote

app = FastAPI(
    title="The Almanac of Practice API",
    root_path="/api/",
)


origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:4000",
    "https://e3bc-31-30-167-210.ngrok-free.app",
    "https://saburov.xyz"
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


app.include_router(auth.router, tags=["user"])
app.include_router(repetition.router, tags=["repetitions"])
app.include_router(dailynote.router, tags=["dailynotes"])
