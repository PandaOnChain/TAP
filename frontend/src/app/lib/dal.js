const baseUrl = "https://saburov.xyz/api";

export const getToken = async (initData) => {
	const response = await fetch(`${baseUrl}/auth/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ initData }),
	});

	if (!response.ok) {
		throw new Error(`Error during authentication ${response.status}`);
	}

	localStorage.removeItem("access_token");
	const result = await response.json();
	return result.access_token;
};

export const getReps = async (access_token) => {
	const response = await fetch(`${baseUrl}/reps/`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${access_token}`,
			"ngrok-skip-browser-warning": "nadoel",
		},
	});

	if (response.status === 403) {
		throw new Error("Unauthorized: Token cleared due to 403 error.");
	}
	if (!response.ok) {
		throw new Error("error during fetching repetitions");
	}
	const repetitions = await response.json();
	return repetitions;
};

export const createRep = async (access_token, title) => {
	const response = await fetch(`${baseUrl}/reps/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${access_token}`,
			"ngrok-skip-browser-warning": "nadoel",
		},

		body: JSON.stringify({ title }),
	});

	if (response.status === 403) { 
		throw new Error("Unauthorized: Token cleared due to 403 error.");
	}
	if (!response.ok) {
		throw new Error("error during creating rep");
	}
	return response;
};

export const markDaily = async (
	repetition_id,
	date,
	note,
	done
) => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	const dateString = `${year}-${month}-${day}`;
	const access_token = localStorage.getItem("access_token");
	const response = await fetch(`${baseUrl}/reps/daily/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${access_token}`,
			"ngrok-skip-browser-warning": "nadoel",
		},

		body: JSON.stringify({ repetition_id, date: dateString, note, done }),
	});

	if (response.status === 403) { 
		throw new Error("Unauthorized: Token cleared due to 403 error.");
	}
	if (!response.ok) {
		throw new Error("error during creating dailyNote");
	}
	return response;
};

// export const authentincateUser = async () => {
// 	const WebApp = (await import("@twa-dev/sdk")).default;
// 	WebApp.ready();
// 	const initData = WebApp.initData;
// 	if (initData) {
// 		const access_token = getToken(initData);
// 		if (access_token) {
// 			localStorage.setItem("access_token", access_token);

// 		}
// 	}

// };
