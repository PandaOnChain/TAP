FROM python:3.12-slim-bullseye

RUN apt-get update && apt-get install -y \
    libpq-dev gcc && \
    apt-get clean && rm -rf /var/lib/apt/lists/
 

WORKDIR /app

COPY requirements.txt /app/

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY ./ /app/

CMD ["sh", "-c", "alembic upgrade head && fastapi run main.py --port 8000 --root-path /api/"]