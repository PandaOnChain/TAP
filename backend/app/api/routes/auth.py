from datetime import datetime
import hashlib
import hmac
from fastapi import APIRouter, HTTPException, status
from urllib.parse import unquote
import json
from pydantic import BaseModel


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
def authenticate_user(initData: InitData):
    # print(f"username: {initData.user.username}")
    validationResult = validateTelegramWebAppData(initData.initData)
    if validationResult:
        # user = {"telegramId": validationResult["user"]["id"]}
        # print(user)
        # new session
        expires = datetime.now()  # +1day
        # session = encrypt(user, expires )

        # Save the session in a cookie
        # cookies().set("session", session, {expires, httpOnly: True})

        return {"message": "Authentication successful"}

    else:
        return HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    return {"username": initData.user.username}


@router.get("/session")
def check_session():
    # session = getSession()

    if session:
        return {"isAuthenticated": True}
    else:
        return {"isAuthenticated": False}


# get a secret key to encode
# function to encrypt with jwt token alg HS256, ExpirationTime 1 day
# function to decrypt jwt as string , verify with predefined secret key and the algorithm, validate token, extract payload from token and return payload if token is valid
# get session cookie retrieves session from cookie, if cookie does not exist return null else decrypt session and return session data
# function update session. if session doesn't exist return , else decrypt session, refresh session expiration time: curr time + session duration.
# set the updated cookie to cookie named session


# function ValidateTelegramWebAppData gets telegramInitData as string
#


def validateTelegramWebAppData(telegramInitData: str):
    BOT_TOKEN = "1261793792:AAHbQxCX8-ywsNEW_6oeZn5CP7KUPZlTtgQ"

    parsedData = parseInitData(initData=telegramInitData)
    # get hash parameter from telegramInitData
    hash = parsedData["hash"]
    # if !hash return {message: "Hash is missing from initData", validateData: None, user: {}}

    # delete hash parameter from initData
    # retrieve auth_date parameter from initData
    # TODO if auth_date older then 1 day, raise exception and renew token

    parsedData.pop("hash")

    data_check_string = "\n".join(
        f"{key}={value}" for key, value in sorted(parsedData.items())
    )  # sort keys by alphabet and make string {key}={value}

    print(data_check_string)

    secret_key = hmac.new(
        "WebAppData".encode(), BOT_TOKEN.encode(), hashlib.sha256
    ).digest()
    calculated_hash = hmac.new(secret_key, data_check_string.encode(), hashlib.sha256).hexdigest()

    print(f"hash:  {hash}\nchash: {calculated_hash}")

    if hash == calculated_hash:
        user = parsedData["user"]  # initData["user"]
        print(f"YYYYYYYYYYYYESSSS{user}")

    return parsedData # {validatedData, user, message}


def parseInitData(initData: str) -> dict:
    data_check_string = unquote(initData)
    parts = data_check_string.split("&")
    user_data = {}
    for part in parts:
        key, value = part.split("=")  
        user_data[key] = value 
    return user_data
