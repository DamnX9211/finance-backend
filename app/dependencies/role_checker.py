from fastapi import Depends, HTTPException
from app.dependencies.auth_dependencies import get_current_user

def require_role(allowed_role: list):
    def role_checker(user=Depends(get_current_user)):
        if user.role not in allowed_role:
            raise HTTPException(status_code=403, detail="Access denied")
        return user
    return role_checker