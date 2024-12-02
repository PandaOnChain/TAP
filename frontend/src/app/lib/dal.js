const ngrokUrl = "http://localhost:8000";

export const getToken = async (initData) => {
	const response = await fetch(`${ngrokUrl}/auth/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ initData }),
	});

	if (!response.ok) {
		throw new Error("Error during authentication");
	}
	const result = await response.json();
	return result.access_token;
};

export const getReps = async (access_token) => {
	const response = await fetch(`${ngrokUrl}/reps/`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${access_token}`,
			"ngrok-skip-browser-warning": "nadoel",
		},
	});

	if (!response.ok) {
		throw new Error("error during fetching repetitions");
	}
	const repetitions = await response.json();
	return repetitions;
};

export const createRep = async (access_token, title) => { 
	const response = await fetch(`${ngrokUrl}/reps/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${access_token}`,
			"ngrok-skip-browser-warning": "nadoel",
		},

		body: JSON.stringify({ title })
	});

	if (!response.ok) {
		throw new Error("error during creating rep");
	} 
	return response;
}

export const markDaily = async (access_token, repetition_id, date, note, done) => {
	const response = await fetch(`${ngrokUrl}/reps/daily/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${access_token}`,
			"ngrok-skip-browser-warning": "nadoel",
		},

		body: JSON.stringify({ repetition_id, date, note, done }),
	});

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
