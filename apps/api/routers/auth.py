import uuid
from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

# Imports from your project structure
from database.models import User, Session
from schemas.generated import UserAuth, LoginResponse, CookieObj, PassportObj, UserIDObj, Error
from utils.security import verify_password, get_password_hash
from dependencies import get_db

# Constants
SESSION_EXPIRATION_HOURS = 24
SESSION_MAX_AGE_SECONDS = 86400  # 24 hours in seconds

router = APIRouter(
    tags=["Authentication"],
    prefix='/auth'
)

def create_session_for_user(user_id: int, response: Response, session: Session) -> LoginResponse:
    """
    Creates a DB session, sets the cookie, and returns the Passport JSON.
    Used by both Login and Signup.
    Note: Does NOT commit - caller must manage transaction.
    """
    # 1. Construct Passport/Express-session style JSON
    session_content = {
        "cookie": {
            "originalMaxAge": None,
            "expires": None,
            "httpOnly": True,
            "path": "/"
        },
        "passport": {
            "user": {
                "id": user_id
            }
        }
    }

    # 2. Create Session in DB
    session_id = str(uuid.uuid4())
    expiration = datetime.now(timezone.utc) + timedelta(hours=SESSION_EXPIRATION_HOURS)

    new_session = Session(
        sid=session_id,
        sess=session_content,
        expire=expiration
    )
    session.add(new_session)

    # 3. Set the Cookie on the Response object
    response.set_cookie(
        key="connect.sid",
        value=session_id,
        httponly=True,
        max_age=SESSION_MAX_AGE_SECONDS,
        samesite="lax",
        path="/"
    )

    # 4. Return the typed response
    return LoginResponse(
        cookie=CookieObj(
            originalMaxAge=None,
            expires=None,
            httpOnly=True,
            path="/"
        ),
        passport=PassportObj(
            user=UserIDObj(id=user_id)
        )
    )

@router.post("/signup", status_code=201, response_model=LoginResponse, responses={400: {"model": Error}})
def signup(user_data: UserAuth, response: Response, session: Session = Depends(get_db)) -> LoginResponse:
    # 1. Check if username exists
    if session.query(User).filter_by(username=user_data.username).first():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already registered")

    # 2. Create User
    hashed_pw = get_password_hash(user_data.password.get_secret_value())
    new_user = User(username=user_data.username, pass_hash=hashed_pw)

    session.add(new_user)
    session.flush()
    session.refresh(new_user)

    # 3. Auto-Login (Create session + Cookie)
    login_response = create_session_for_user(new_user.id, response, session)
    session.commit()
    return login_response

@router.post("/login", response_model=LoginResponse, responses={401: {"model": Error}})
def login(user_data: UserAuth, response: Response, session: Session = Depends(get_db)) -> LoginResponse:
    user = session.query(User).filter_by(username=user_data.username).first()
    if not user or not verify_password(user_data.password.get_secret_value(), user.pass_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )

    # 2. Login (Create session + Cookie)
    login_response = create_session_for_user(user.id, response, session)
    session.commit()
    return login_response

