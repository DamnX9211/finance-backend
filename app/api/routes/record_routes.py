from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from datetime import date

from app.schemas.record_schema import RecordCreate, RecordUpdate
from app.services.record_service import (create_record, get_records, update_record, delete_record)
from app.dependencies.auth_dependencies import get_db
from app.dependencies.role_checker import require_role

router = APIRouter(prefix="/records", tags=["Records"])

@router.post("/")
def create(
    data: RecordCreate,
    db: Session = Depends(get_db),
    user = Depends(require_role(["admin"]))
):
    return create_record(db, data, user.id)


@router.get("/")
def get(
    type: str | None = None,
    category: str | None = None,
    start_date: date | None = None,
    end_date: date | None = None,
    db: Session = Depends(get_db),
    user = Depends(require_role(["admin", "analyst"]))
):
    filters = {
        "type": type,
        "category": category,
        "start_date": start_date,
        "end_date": end_date
    }
    return get_records(db, filters)



@router.patch("/{record_id}")
def update(
    record_id: int,
    data: RecordUpdate,
    db: Session = Depends(get_db),
    user = Depends(require_role(["admin"]))
): 
    try:
        return update_record(db, record_id, data)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    


@router.delete("/{record_id}")
def delete(
    record_id: int,
    db: Session=Depends(get_db),
    user=Depends(require_role(["admin"]))
):
    try:
        return delete_record(db, record_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))