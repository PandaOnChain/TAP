from datetime import datetime
from typing import Any
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from app.core.dependencies import SessionDep, generate_token, CurrentUser
from app.core.models import Token
from app.core.crud import create_user, get_user_by_userId, validateTelegramWebAppData 


class User(BaseModel):
    allows_write_to_pm: bool
    first_name: str
    id: int
    language_code: str
    last_name: str | None = None
    username: str | None = None


class InitDataUnsafe(BaseModel):
    auth_date: str
    chat_instance: str
    chat_type: str
    hash: str
    user: User


class InitData(BaseModel):
    initData: str

router = APIRouter(prefix="/auth")


@router.post("/")
def authenticate_user(initData: InitData, session: SessionDep) -> Token: 
    validation_result = validateTelegramWebAppData(telegramInitData=initData.initData)
    if not validation_result:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid Telegram data"
        )
    db_user = get_user_by_userId(session=session, id=validation_result["id"])
    if not db_user:
        create_user(session=session, user_create=validation_result)
    return Token(access_token=generate_token(validation_result["id"]))


@router.get("/session")
def check_session(current_user: CurrentUser) -> Any:
    return current_user


# get a secret key to encode
# function to encrypt with jwt token alg HS256, ExpirationTime 1 day
# function to decrypt jwt as string , verify with predefined secret key and the algorithm, validate token, extract payload from token and return payload if token is valid
# get session cookie retrieves session from cookie, if cookie does not exist return null else decrypt session and return session data
# function update session. if session doesn't exist return , else decrypt session, refresh session expiration time: curr time + session duration.
# set the updated cookie to cookie named session
