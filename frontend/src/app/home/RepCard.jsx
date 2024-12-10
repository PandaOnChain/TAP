import React, { useState } from "react";
import Image from "next/image";
import DayButton from "./DayButton";

const RepCard = ({ title, repetitionId, weekNotes, handleAddDailyNote, handleUpdateDailyNote }) => {
	const today = new Date();
	const daysLetters = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
	const currentDayIndex = today.getDay();
	const adjustedDayIndex = currentDayIndex === 0 ? 6 : currentDayIndex - 1;
	const todayDate = today.getDate();
	// const [weekNote, setWeekNote] = useState(weekNotes)

	// const handleUpdateWeekNote = (index, updatedNote) => {
	// 	const newWeekNotes = weekNote.map((note, i)=> i !== index ? updatedNote : note)
	// 	setWeekNote(newWeekNotes)
	// }

	const dates = [];
	for (let i = 0; i < 7; i++) {
		const date = new Date(today);
		date.setDate(today.getDate() + i - adjustedDayIndex);
		dates.push({
			date: date,
			dateDay: date.getDate(),
			timestamp: date.getTime(),
		});
	}

	return (
		<div className="w-full my-3 bg-brand-yellow rounded-lg place-items-center flex flex-col">
			<div className="p-1">{title}</div>
			<div className="container px-3 py-1 grid grid-cols-7 gap-2">
				{" "}
				{daysLetters.map((day, index) => {
					const isToday = dates[index].dateDay === todayDate;
					const isFuture = dates[index].timestamp > today.getTime();
					const dayDateNum = dates[index].dateDay;

					const status = weekNotes.find((note) => {
						const noteDate = new Date(note.date);
						const buttonDate = new Date(dates[index].date);
						if (noteDate.getDate() === buttonDate.getDate()) {
							return note.done;
						} else {
							return false;
						}
					});
					const note = weekNotes.find((note) => {
						const noteDate = new Date(note.date);
						const buttonDate = new Date(dates[index].date);
						if (noteDate.getDate() === buttonDate.getDate()) { 
							return true;
						} else {
							return "";
						}
					});

					return (
						<DayButton
							key={day}
							day={day}
							dayDateNum={dayDateNum}
							date={dates[index].date}
							isToday={isToday}
							isFuture={isFuture}
							title={title}
							repetitionId={repetitionId}
							status={status}
							note={
								note 
							}
							handleDailyNote={
								note
									? handleUpdateDailyNote
									: handleAddDailyNote
							}
							// updateWeekNotes={handleUpdateWeekNote}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default RepCard;
