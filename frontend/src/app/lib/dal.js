const ngrokUrl = "https://ce8d-193-84-36-65.ngrok-free.app";

export const getToken = async (userData) => {
	try {
        console.log(userData)
		const response = await fetch(`${ngrokUrl}/auth/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: userData,
		});
		const result = await response.json(); 
		return result.access_token;
		
	} catch (error) {
		console.error("error fetching user token:", error);
        return null;
	}
};


export const getReps = async (access_token) => {
    try {
        console.log(access_token)
        const response = await fetch(`${ngrokUrl}/reps/`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`,
                "ngrok-skip-browser-warning": "nadoel",
            }   
        })
        const repetitions = await response.json()
        console.log(repetitions.data)
        return repetitions.data
    } catch (error){
        console.error("error fetching reps:", error)
    }
}