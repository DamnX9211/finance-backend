from fastapi import APIRouter, Depends, HTTPException
from app.dependencies.auth_dependencies import get_db
from app.services.user_service import  get_all_users, update_user_role, toggle_user_status
from sqlalchemy.orm import Session
from app.dependencies.role_checker import require_role
from app.models.user import UserRole


router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/me")
def get_users(
    db: Session = Depends(get_db),
    user = Depends(require_role(["admin"]))
):
    return get_all_users(db)


# change user role for admin
@router.patch("/{user_id}/role")
def change_role(
    user_id: int,
    new_role: UserRole,
    db: Session = Depends(get_db),
    user=Depends(require_role(["admin"]))
):
    try:
        return update_user_role(db, user_id, new_role)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    

@router.patch("/{user_id}/status")
def toggle_status(
    user_id: int,
    db: Session = Depends(get_db),
    user=Depends(require_role(["admin"]))
):
    try:
        return toggle_user_status(db, user_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))