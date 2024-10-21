import hashlib
import hmac
from urllib.parse import unquote
import json
from fastapi import HTTPException, status
from sqlmodel import Session, select

from .dependencies import generate_token
from .models import Token, User, UserBase 
from .database import BOT_TOKEN

def create_user(*, session: Session, user_create: UserBase):
    db_obj = User.model_validate(user_create)
    session.add(db_obj)
    session.commit()
    session.refresh(db_obj)
    return db_obj

def get_user_by_userId(*, session: Session, id: int):
    statement = select(User).where(User.id == id)
    session_user = session.exec(statement).first()
    return session_user

 



def validateTelegramWebAppData(telegramInitData: str): 
    parsedData = parseInitData(initData=telegramInitData)
    hash = parsedData["hash"]
    parsedData.pop("hash")
    # retrieve auth_date parameter from initData
    # TODO if auth_date older then 1 day, raise exception and renew token

    data_check_string = "\n".join(
        f"{key}={value}" for key, value in sorted(parsedData.items())
    )
    secret_key = hmac.new(
        "WebAppData".encode(), BOT_TOKEN.encode(), hashlib.sha256
    ).digest()
    calculated_hash = hmac.new(
        secret_key, data_check_string.encode(), hashlib.sha256
    ).hexdigest()

    print(f"hash:  {hash}\nchash: {calculated_hash}")

    if hash == calculated_hash:
        user = json.loads(parsedData["user"])
        print(f"YYYYYYYYYYYYESSSS{user}")
        return user
    else:
        return None


def parseInitData(initData: str) -> dict:
    data_check_string = unquote(initData)
    parts = data_check_string.split("&")
    user_data = {}
    for part in parts:
        key, value = part.split("=")
        user_data[key] = value
    return user_data
