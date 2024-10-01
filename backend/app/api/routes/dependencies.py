from datetime import datetime, timedelta, timezone
import os
from fastapi.responses import JSONResponse
import jwt
from fastapi import Depends, FastAPI, HTTPException, status, Request
from jwt.exceptions import InvalidTokenError
from passlib.context import CryptContext
from pydantic import BaseModel

from dotenv import load_dotenv

load_dotenv()

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGRITHM = os.getenv("ALGORITHM")
SESSION_DURATION = os.getenv("SESSION_DURATION")


async def generate_token(request: Request):
    user_id = 9999
    payload = {
        "sub": user_id,
        "exp": datetime.now()+timedelta(hours=12)
    }

    token = jwt.encode(payload=payload, algorithm="HS256", key=JWT_SECRET_KEY)

    return JSONResponse({"session":token})


async def 