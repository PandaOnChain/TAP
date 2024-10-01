from datetime import datetime
from fastapi import APIRouter, HTTPException, status

from pydantic import BaseModel

class User(BaseModel):
    allows_write_to_pm: bool
    first_name: str
    id: int
    language_code: str
    last_name: str | None = None
    username: str | None = None 

class InitData(BaseModel):
    auth_date: str
    chat_instance: str
    chat_type: str
    hash: str
    user: User


router = APIRouter(prefix="/auth")

@router.post("/")
def authenticate_user(initData: InitData): 
    print(f"username: {initData.user.username}")
    validationResult = validateTelegramWebAppData(initData)
    if validationResult:
        user = {"telegramId":initData.user.id}
        

        #new session
        expires = datetime.now()#+1day
        #session = encrypt(user, expires )

        #Save the session in a cookie
        #cookies().set("session", session, {expires, httpOnly: True})

        return {"message": "Authentication successful"}

    else:
        return HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)


    return {"username": initData.user.username}
    



@router.get("/session")
def check_session():
    #session = getSession()

    if session:
        return {"isAuthenticated":True}
    else:
        return {"isAuthenticated":False}







# get a secret key to encode
# function to encrypt with jwt token alg HS256, ExpirationTime 1 day
# function to decrypt jwt as string , verify with predefined secret key and the algorithm, validate token, extract payload from token and return payload if token is valid
# get session cookie retrieves session from cookie, if cookie does not exist return null else decrypt session and return session data
# function update session. if session doesn't exist return , else decrypt session, refresh session expiration time: curr time + session duration. 
# set the updated cookie to cookie named session


# function ValidateTelegramWebAppData gets telegramInitData as string
# 

def validateTelegramWebAppData(telegramInitData: str):
    BOT_TOKEN = "BOT_TOKEN_ENV"

    #get hash parameter from telegramInitData
    hash = 0
    #if !hash return {message: "Hash is missing from initData", validateData: None, user: {}}

    #delete hash parameter from initData
    #retrieve auth_date parameter from initData

    data_check_string = "\n".join([])#sort keys by alphabet and make string {key}={value}

    secret_key = {"WebAppData": BOT_TOKEN}
    calculated_hash = secret_key.update(data_check_string)

    if hash == calculated_hash: 
        user = None # initData["user"]
    

    return #{validatedData, user, message}

