import React from "react";

function HomeHeader() {
	const today = new Date();
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const currentMonth = months[today.getMonth()];
	const currentYear = today.getFullYear();
	return (
		<div className="relative flex items-center w-full">
			<div className="absolute left-1/2 transform -translate-x-1/2 text-2xl">
				{currentMonth}
			</div>
			<div className="ml-auto mr-3 text-2xl">{currentYear}</div>
		</div>
	);
}

export default HomeHeader;
