from datetime import datetime, date, timedelta
from uuid import UUID
from fastapi import APIRouter, HTTPException
from sqlmodel import func, select
from app.core.dependencies import SessionDep, generate_token, CurrentUser
from app.core.models import (
    Message,
    DailyNote,
    Repetition,
    RepetitionCreate,
    RepetitionPublic,
    RepetitionUpdate,
    RepetitionsPublic,
    WeekNote,
    Token,
)

router = APIRouter(prefix="/reps")


@router.get("/")
def read_reps(session: SessionDep, current_user: CurrentUser) -> RepetitionsPublic:
    count_statement = (
        select(func.count())
        .select_from(Repetition)
        .where(Repetition.owner_id == current_user.id)
        .where(Repetition.deleted == False)
    )
    count = session.exec(count_statement).one()

    statement = (
        select(Repetition)
        .where(Repetition.owner_id == current_user.id)
        .where(Repetition.deleted == False)
    )
    repetitions = session.exec(statement).all()

    today = date.today()
    seven_days_ago = today - timedelta(days=7)

    reps_with_notes = {}
    for rep in repetitions:
        daily_notes = session.exec(
            select(DailyNote)
            .where(DailyNote.repetition_id == rep.id)
            .where(DailyNote.date.between(seven_days_ago, today))
        ).all()
        reps_with_notes[rep.id] = daily_notes

    reps_public = []
    for rep in repetitions:
        week_notes = []
        for daily_note in reps_with_notes.get(rep.id, []):
            week_notes.append(
                WeekNote(
                    id=daily_note.id,
                    date=daily_note.date,
                    done=daily_note.done,
                    note=daily_note.note,
                )
            )
        reps_public.append(
            RepetitionPublic(
                id=rep.id,
                title=rep.title,
                description=rep.description,
                frequency_per_week=rep.frequency_per_week,
                week_notes=week_notes,
            )
        )

    return RepetitionsPublic(repetitions=reps_public, count=count)


# add route to get one practice with days for current month


@router.post("/")
def create_repetition(
    *, session: SessionDep, current_user: CurrentUser, repetition: RepetitionCreate
) -> RepetitionPublic:
    repetition = Repetition.model_validate(
        repetition, update={"owner_id": current_user.id}
    )
    session.add(repetition)
    session.commit()
    session.refresh(repetition)
    return repetition


@router.patch("/{id}")
def update_item(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    id: UUID,
    repetition_in: RepetitionUpdate
) -> RepetitionPublic:
    repetition = session.get(Repetition, id)
    if not repetition:
        raise HTTPException(status_code=404, detail="Practice not found")
    if repetition.owner_id != current_user.id:
        raise HTTPException(status_code=400, detail="It is not yours")
    update_dict = repetition_in.model_dump(exclude_unset=True)
    repetition.sqlmodel_update(update_dict)
    repetition.updated = datetime.now()
    session.add(repetition)
    session.commit()
    session.refresh(repetition)
    return repetition


@router.delete("/{id}")
def delete_repetition(
    session: SessionDep, current_user: CurrentUser, id: UUID
) -> Message:
    repetition = session.get(Repetition, id)
    repetition.deleted = True
    session.add(repetition)
    session.commit()
    session.refresh(repetition)
    return Message(message="Practice deleted successfully")
