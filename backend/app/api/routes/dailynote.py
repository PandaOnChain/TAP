from datetime import datetime
from uuid import UUID
from fastapi import APIRouter, HTTPException
from app.core.dependencies import SessionDep, CurrentUser
from app.core.models import Message, DailyNote, DailyNoteCreate, DailyNoteUpdate, Repetition
from sqlmodel import func, select

router = APIRouter(prefix="/reps/daily")


@router.post("/")
def create_dailynote(*, session: SessionDep, current_user: CurrentUser, dailynote_in: DailyNoteCreate) -> Message:
    statement = select(DailyNote).where(
        DailyNote.repetition_id == dailynote_in.repetition_id,
        DailyNote.date == dailynote_in.date,
    )
    existing_dailynote = session.exec(statement).first()

    if existing_dailynote: 
        update_dict = dailynote_in.model_dump(
            exclude_unset=True
        )   
        existing_dailynote.sqlmodel_update(update_dict)
        existing_dailynote.updated = datetime.now()
        session.add(existing_dailynote)
        session.commit()
        session.refresh(existing_dailynote)
        message = f"Daily note for {existing_dailynote.date} updated."

    else: 
        dailynote = DailyNote.model_validate(dailynote_in)
        session.add(dailynote)
        session.commit()
        session.refresh(dailynote)
        repetition = session.get(Repetition, dailynote_in.repetition_id)
        if not repetition:
            raise HTTPException(status_code=404, detail="Repetition not found")
        message = f"Daily note for {repetition.title} created."

    return Message(message=message)

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
