from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, AsyncAttrs
from sqlalchemy.orm import DeclarativeBase, sessionmaker, mapped_column, Mapped
from sqlalchemy import func
from datetime import datetime
from sqlmodel import create_engine

from dotenv import dotenv_values

DB_HOST = dotenv_values(".env")["DB_HOST"]
DB_PORT = dotenv_values(".env")["DB_PORT"]
DB_USER = dotenv_values(".env")["DB_USER"]
DB_PASS = dotenv_values(".env")["DB_PASS"]
DB_NAME = dotenv_values(".env")["DB_NAME"]
DATABASE_URL = f'{dotenv_values(".env")["DATABASE_URL"]}{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}'
print("SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS RRRRRRRRRRRRRRRRRRRRR :::::::::::::::::::::\n"+DATABASE_URL)
BOT_TOKEN = dotenv_values(".env")["BOT_TOKEN"]

# engine = create_async_engine(DATABASE_URL,
#                              pool_pre_ping=True, echo=True, future=True)

# async_session_maker = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)

# class Base(AsyncAttrs, DeclarativeBase):
#     created_at: Mapped[datetime] = mapped_column(server_default=func.now())
#     updated_at: Mapped[datetime] = mapped_column(server_default=func.now(), onupdate=func.now())


engine = create_engine(DATABASE_URL)