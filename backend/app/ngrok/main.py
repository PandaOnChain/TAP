# main.py
from contextlib import asynccontextmanager
from os import getenv

import ngrok
import uvicorn
from fastapi import FastAPI
from loguru import logger

NGROK_AUTH_TOKEN = getenv("NGROK_AUTH_TOKEN", "")
NGROK_EDGE = getenv("NGROK_EDGE", "edge:edghts_")
APPLICATION_PORT = 5000


# ngrok free tier only allows one agent. So we tear down the tunnel on application termination
@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Setting up Ngrok Tunnel")
    ngrok.set_auth_token(NGROK_AUTH_TOKEN)
    ngrok.forward(
        addr=APPLICATION_PORT,
        labels=NGROK_EDGE,
        proto="labeled",
    )
    yield
    logger.info("Tearing Down Ngrok Tunnel")
    ngrok.disconnect()


app = FastAPI(lifespan=lifespan)


@app.get("/")
async def root():
    return {"message": "Hello World"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=APPLICATION_PORT, reload=True)
