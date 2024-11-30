FROM python:3.12-slim

RUN apt-get update

WORKDIR /app

COPY requirements.txt /app/

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY ./ /app/

CMD ["sh", "-c", "alembic upgrade head && fastapi run api/main.py --port 8000"]