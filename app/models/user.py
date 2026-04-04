from sqlalchemy import Column, Integer, String, Boolean, Enum
from app.db.database import Base
import enum

class UserRole(str, enum.Enum):
    viewer = "viewer"
    analyst = "analyst"
    admin = "admin"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    role = Column(Enum(UserRole), default=UserRole.viewer)
    is_active = Column(Boolean, default=True)
        