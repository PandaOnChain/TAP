import React from "react";
import Image from "next/image";
import DayButton from "./DayButton";

const RepCard = ({ title, repetitionId, weekNotes }) => {
	const done = true;

	const today = new Date();
	const daysLetters = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
	const currentDayIndex = today.getDay();
	const todayDate = today.getDate();

	const dates = [];
	for (let i = 1; i < 8; i++) {
		const date = new Date(today);
		date.setDate(today.getDate() + i - currentDayIndex);
		dates.push({
			date: date,
			dateDay: date.getDate(),
			timestamp: date.getTime(),
		});
	}

	return (
		<div className="w-[95%] m-3 bg-yellow-500 rounded-lg place-items-center flex flex-col">
			<div className="p-1">{title}</div>
			<div className="container px-3 py-1 grid grid-cols-7 gap-2">
				{" "}
				{daysLetters.map((day, index) => {
					const isToday = dates[index].date === todayDate;
					const isFuture = dates[index].timestamp > today.getTime();
					const status = done
					const dayDateNum = dates[index].dateDay
					return (
						<DayButton key={day} dayDateNum={dayDateNum} date={dates[index].date} isToday={isToday} isFuture={isFuture} repetitionId={repetitionId}  status={status}/>
					);
				})}
			</div>
		</div>
	);
};

export default RepCard;
