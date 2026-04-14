from fastapi import HTTPException

from sqlalchemy.orm import Session
from app.models.record import FinancialRecord


def create_record(db: Session, data, user_id: int):
    record = FinancialRecord(
        amount=data.amount,
        type=data.type,
        category=data.category,
        date=data.date,
        notes=data.notes,
        created_by=user_id
    )
    

    db.add(record)
    db.commit()
    db.refresh(record)

    return record


def get_records(db: Session, filters: dict):
    query = db.query(FinancialRecord)


    if filters.get("type"):
        query = query.filter(FinancialRecord.type == filters["type"])

    if filters.get("category"):
        query = query.filter(FinancialRecord.category == filters["category"])

    if filters.get("start_date"):
        query = query.filter(FinancialRecord.date >= filters["start_date"])

    if filters.get("end_date"):
        query = query.filter(FinancialRecord.date <= filters["end_date"])

    if filters.get("user_id"):
        query = query.filter(FinancialRecord.created_by == filters["user_id"])

    return query.all()        



def update_record(db: Session, record_id: int, data, user_id: int):
    record = db.query(FinancialRecord).filter(FinancialRecord.id == record_id).first()

    if not record:
        raise HTTPException(status_code=404, detail="Record not found")
    
    if record.created_by != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to update this record")
    
    for key, value in data.dict(exclude_unset=True).items():
        setattr(record, key, value)

    db.commit()
    db.refresh(record)

    return record



def delete_record(db: Session, record_id: int, user_id: int):
    record = db.query(FinancialRecord).filter(FinancialRecord.id == record_id).first()

    if not record:
        raise HTTPException(status_code=404, detail="Record not found")

    if record.created_by != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this record")

    db.delete(record)
    db.commit()

    return record, {"message": "Record deleted successfully"}