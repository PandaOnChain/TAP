from datetime import datetime
from uuid import UUID
from fastapi import APIRouter, HTTPException
from app.core.dependencies import SessionDep, CurrentUser
from app.core.models import Message, DailyNote, DailyNoteCreate, DailyNoteUpdate, Repetition


router = APIRouter(prefix="/reps/daily")


@router.post("/")
def create_dailynote(*, session: SessionDep, current_user: CurrentUser, dailynote_in: DailyNoteCreate) -> Message:
    dailynote = DailyNote.model_validate(dailynote_in)
    session.add(dailynote)
    session.commit()
    session.refresh(dailynote)
    repetition = session.get(Repetition, dailynote_in.repetition_id)
    return Message(message=f"dailynote for {repetition.title} has been created.")

@router.patch("/")
def update_dailynote(*, session: SessionDep, current_user: CurrentUser, dailynote_in: DailyNoteUpdate) -> Message:
    dailynote = session.get(DailyNote, dailynote_in.id)
    if not dailynote:
        raise HTTPException(status_code=404, detail="Dailynote not found")
    update_dict = dailynote_in.model_dump(exclude_unset=True)
    dailynote.sqlmodel_update(update_dict)
    dailynote.updated = datetime.now()
    session.add(dailynote)
    session.commit()
    session.refresh(dailynote)
    return Message(message=f"dailynote {dailynote.date} has been updated")