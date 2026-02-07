from fastapi import APIRouter, Depends
from database.models import User
from dependencies import get_current_user
from schemas.generated import UserProfile, Error

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

@router.get("/me", response_model=UserProfile, responses={401: {"model": Error}})
def read_my_profile(current_user: User = Depends(get_current_user)) -> UserProfile:
    return UserProfile(
        id=current_user.id,
        username=current_user.username,
        message="Welcome back!"
    )
