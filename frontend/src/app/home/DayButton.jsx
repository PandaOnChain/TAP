import React, { useState } from "react";
import { markDaily } from "../lib/dal";

const DayButton = ({
	isToday,
	isFuture,
	status,
	repetitionId,
    date,
	key,
	dayDateNum,
}) => {
	const [done, setDone] = useState(status);  
	const handleClick = async () => {
		//date, repetition_id, done
        const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		const dateString = `${year}-${month}-${day}`; 
        console.log(repetitionId)
		const access_token = localStorage.getItem("access_token");
		const response = await markDaily(access_token, repetitionId, dateString, "", !done);
		if (response.ok) {
			setDone(() => !done);
		}
	};
	return (
		<div className="flex flex-col">
			<h6 className="text-center">{key}</h6>
			<button
				className={`flex flex-col rounded-md border-2 mx-1 items-center ${
					isToday && "border-green-200"
				}`}
				disabled={isFuture}
				onClick={handleClick}
			>
				<h6 className="text-center text-xs">{dayDateNum}</h6>
				<div className="">
					{isFuture && <LockSvg width={22} height={22} />}
					{isToday &&
						(done ? (
							<DoneVector
								width={22}
								height={22}
								color={"#00FF00"}
							/>
						) : (
							<EndHourGlass width={22} height={22} />
						))}
					{!isToday &&
						!isFuture &&
						(!done ? (
							<NotDoneVector
								width={22}
								height={22}
								color={"#FF0000"}
							/>
						) : (
							<DoneVector
								width={22}
								height={22}
								color={"#00FF00"}
							/>
						))}
				</div>
			</button>
		</div>
	);
};

export default DayButton;

const StartHourGlass = ({ width, height, color, strokeWidth }) => {
	return (
		<svg
			width={`${width ? width : "20"}px`}
			height={`${height ? height : "20"}px`}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M15 6H9M20 21H19M19 21H5M19 21C19 18.4898 17.7877 16.1341 15.7451 14.675L12 12M5 21H4M5 21C5 18.4898 6.21228 16.1341 8.25493 14.675L12 12M20 3H19M19 3H5M19 3C19 5.51022 17.7877 7.86592 15.7451 9.32495L12 12M5 3H4M5 3C5 5.51022 6.21228 7.86592 8.25493 9.32495L12 12"
				stroke={color ? color : "#FFFFFF"}
				stroke-width={strokeWidth ? strokeWidth : "2"}
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
};

const EndHourGlass = ({ width, height, color, strokeWidth }) => {
	return (
		<svg
			width={`${width ? width : "20"}px`}
			height={`${height ? height : "20"}px`}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M15 18H9M20 3H19M19 3H5M19 3C19 5.51022 17.7877 7.86592 15.7451 9.32495L12 12M5 3H4M5 3C5 5.51022 6.21228 7.86592 8.25493 9.32495L12 12M20 21H19M19 21H5M19 21C19 18.4898 17.7877 16.1341 15.7451 14.675L12 12M5 21H4M5 21C5 18.4898 6.21228 16.1341 8.25493 14.675L12 12"
				stroke={color ? color : "#FFFFFF"}
				strokeWidth={strokeWidth ? strokeWidth : "2"}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

const LockSvg = ({ width, height, color, strokeWidth }) => {
	return (
		<svg
			width={`${width ? width : "20"}px`}
			height={`${height ? height : "20"}px`}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M12 14.5V16.5M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288"
				stroke={color ? color : "#FFFFFF"}
				stroke-width={strokeWidth ? strokeWidth : "2"}
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
};

const DoneNoteVector = ({ width, height, color, strokeWidth }) => {
	return (
		<svg
			width={`${width ? width : "20"}px`}
			height={`${height ? height : "20"}px`}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M9 15L11 17L15 13M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V9M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19"
				stroke={color ? color : "#FFFFFF"}
				stroke-width={strokeWidth ? strokeWidth : "2"}
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
};

const DoneVector = ({ width, height, color, strokeWidth }) => {
	return (
		<svg
			width={`${width ? width : "20"}px`}
			height={`${height ? height : "20"}px`}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M4 12.6111L8.92308 17.5L20 6.5"
				stroke={color ? color : "#FFFFFF"}
				stroke-width={strokeWidth ? strokeWidth : "2"}
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
};

const NotDoneVector = ({ width, height, color, strokeWidth }) => {
	return (
	<svg
		width={`${width ? width : "20"}px`}
		height={`${height ? height : "20"}px`}
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M6 6L18 18M18 6L6 18"
			stroke={color ? color : "#FFFFFF"}
			stroke-width={strokeWidth ? strokeWidth : "2"}
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>);
};