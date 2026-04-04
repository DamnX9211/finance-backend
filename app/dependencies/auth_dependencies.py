from fastapi import Depends, HTTPException
from jose import jwt
from app.core.security import SECRET_KEY, ALGORITHM
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.models.user import User

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()  

def get_current_user(token: str, db: Session=Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("user_id")
    except:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user
        