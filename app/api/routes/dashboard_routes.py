from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies.auth_dependencies import get_db
from app.dependencies.role_checker import require_role
from app.services.dashboard_service import get_summary

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/summary")
def summary(
    db: Session = Depends(get_db),
    user=Depends(require_role(["admin", "analyst"]))
):
    return get_summary(db)