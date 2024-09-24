from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="The Almanac of Practice API")

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8000",
    "https://839e-31-30-167-157.ngrok-free.app",
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


@app.post("/telegram")
def get_all_initdata(initdatafromtelegram: dict):
    print(type(initdatafromtelegram))
    print(initdatafromtelegram.initData)
    return {"message":"OK"}
