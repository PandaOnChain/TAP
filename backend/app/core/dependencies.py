from collections.abc import Generator
from datetime import datetime, timedelta, timezone
import os
from typing import Annotated
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2AuthorizationCodeBearer, OAuth2PasswordBearer
import jwt
from fastapi import Depends, FastAPI, HTTPException, status, Request
from jwt.exceptions import InvalidTokenError
from passlib.context import CryptContext
from pydantic import BaseModel, ValidationError

from sqlmodel import Session

from app.core.models import TokenPayload, User
from .database import engine
from dotenv import load_dotenv

load_dotenv()

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
SESSION_DURATION = os.getenv("SESSION_DURATION")


reusable_oauth2 = OAuth2PasswordBearer(tokenUrl="auth/access-token")

def generate_token(user_id: int) -> str: 
    payload = {"sub": user_id, "exp": datetime.now() + timedelta(hours=12)}
    token = jwt.encode(payload=payload, algorithm=ALGORITHM, key=JWT_SECRET_KEY)
    return token


def get_db() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_db)]
TokenDep = Annotated[str, Depends(reusable_oauth2)]


def get_current_user(session: SessionDep, token: TokenDep) -> User:
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[ALGORITHM])
        token_data = TokenPayload(**payload)
    except (InvalidTokenError, ValidationError):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Could not validate credentials")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token has expired")
    except jwt.PyJWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    user = session.get(User, token_data.sub)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

CurrentUser = Annotated[User, Depends(get_current_user)]