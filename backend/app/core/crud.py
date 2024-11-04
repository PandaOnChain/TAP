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

def update_user(*, session: Session, user_id: int, user_update: UserBase):
    user = session.get(User, user_id)
    # update_dict = user_update.model_dump(exclude_unset=True)
    user.sqlmodel_update(user_update)
    session.add(user)
    session.commit()
    session.refresh(user)
    return None

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
 

    if hash == calculated_hash:
        user = json.loads(parsedData["user"]) 
        return user
    else:
        raise HTTPException(status_code=400, detail="Hash has not verified")


def parseInitData(initData: str) -> dict:
    data_check_string = unquote(initData)
    parts = data_check_string.split("&")
    user_data = {}
    for part in parts:
        key, value = part.split("=")
        user_data[key] = value
    return user_data
