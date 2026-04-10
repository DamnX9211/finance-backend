from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.user_schema import UserCreate, UserLogin
from app.services.user_service import create_user, authenticate_user
from app.dependencies.auth_dependencies import get_db
from app.core.security import create_access_token

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    try:
        new_user = create_user(db, user)
        return {"message": "User created successfully", "user_id": new_user.id}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    


@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = authenticate_user(db, user.email, user.password)

    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_access_token({"user_id": db_user.id})
    
    return {
        "access_token": token, 
        "token_type": "bearer",
        "role": db_user.role
        }
   