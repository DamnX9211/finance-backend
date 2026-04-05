from pydantic import BaseModel
from datetime import datetime

class RecordCreate(BaseModel):
    amount: float
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