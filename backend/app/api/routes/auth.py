from fastapi import APIRouter

router = APIRouter(prefix="auth")

@router.post("/")
def authenticate_user():
    pass


