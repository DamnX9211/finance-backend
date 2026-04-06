from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.record import FinancialRecord


def get_summary(db: Session):
    total_income = db.query(func.sum(FinancialRecord.amount))\
        .filter(FinancialRecord.type == "income").scalar() or 0
    
    total_expense = db.query(func.sum(FinancialRecord.amount))\
        .filter(FinancialRecord.type == "expense").scalar() or 0
    
    net_balance = total_income - total_expense

    category_data = db.query(
        FinancialRecord.category,
        func.sum(FinancialRecord.amount)
    ).group_by(FinancialRecord.category).all()

    recent = db.query(FinancialRecord)\
        .order_by(FinancialRecord.date.desc()).limit(5).all()

    return {
        "total_income": total_income,
        "total_expense": total_expense,
        "net_balance": net_balance,
        "category_breakdown": [
            {"category": c, "total": t} for c, t in category_data
        ],
        "recent_transactions": recent,
        "message": "Summary retrieved successfully"
    }
