from pydantic import BaseModel, Field
from datetime import datetime
import enum

class RecordType(str, enum.Enum):
    income = "income"
    expense = "expense"

class RecordCreate(BaseModel):
    amount: float = Field(..., gt=0)
    type: str
    category: str
    date: datetime
    notes: str | None = None



class RecordUpdate(BaseModel):
        amount: float | None = None
        type: str | None = None
        category: str | None = None
        date: datetime | None = None
        notes: str | None = None


class RecordResponse(BaseModel):
      id: int
      amount: float
      type: str
      category: str
      date: datetime
      notes: str | None = None
      created_by: int

      class config:
            from_attributes = True        
