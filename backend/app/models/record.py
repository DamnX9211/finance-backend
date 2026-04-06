from sqlalchemy import Column, Integer, String,Float, Date, ForeignKey
from app.db.database import Base

class FinancialRecord(Base):
    __tablename__ = "records"

    id = Column(Integer, primary_key=True, index=True)
    amount = Column(Float)
    type = Column(String) # income or expense
    category = Column(String)
    date = Column(Date)
    notes = Column(String)
    created_by = Column(Integer, ForeignKey("users.id"))