"use client";
import TelegramAuth from "./components/TelegramAuth";
import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";



//store to local storage the token
//make new request with included token and make separate button to get data

export default function Home() {
	const [userData, setUserData] = useState(null);
	const [erudaInitialized, setErudaInitialized] = useState(false);
	const [userInitData, setUserInitData] = useState(null)
	const [accessToken, setAccessToken] = useState(null)
	

	const sendInitData = async (userData) => {
	const userdatadata = JSON.stringify({initData: userData}) 
	try {
		const response = await fetch(
			"https://c209-31-30-167-155.ngrok-free.app/auth/",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: userdatadata,
			}
		);
		const result = await response.json();
		console.log("Success:", result);  
		setAccessToken(result.access_token)
	} catch (error) {
		console.error("error fetching Initdata:", error);
	}
};

	useEffect( ( ) => { 
		const script = document.createElement("script");
		script.src = "https://cdn.jsdelivr.net/npm/eruda";
		document.body.appendChild(script);
		script.onload = () => {
			eruda.init();
			setErudaInitialized(true);
		};
	})


	useEffect(() => {
		
		if (WebApp.initDataUnsafe.user) {
			setUserData(WebApp.initDataUnsafe);  
			setUserInitData(WebApp.initData)
		}
	}, []);
	
	const handleShowUserData = () => {
		console.log(userData)
		console.debug(WebApp.initData);
		console.error(WebApp)
	}

	const handleSendUserData = () => {
		sendInitData(userInitData)
	}

	const handleGetSession = async () =>{
		try{
		const userRequset = await fetch(
			"https://c209-31-30-167-155.ngrok-free.app/auth/session/",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${accessToken}`,
				},
			}
		);
		console.log("access_token", accessToken)
		const userResult = await userRequset.json()
		console.log("user data", userResult)
	} catch (error) {
		console.error("error fetching data:", error);
	}
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<h1 className="text-4xl">
				JWT authentication for Telegram Mini Apps
			</h1>
			<div className="flex flex-col">
				{userData ? (
					Object.keys(userData).forEach(function (key) {
						<div className="flex">
							<p className="text-xl">{key}</p>
							<p className="text-gray">{userData[key]}</p>
						</div>;
					})
				) : (
					<p>No data yet</p>
				)}

				<button
					type="button"
					className="p-3 rounded m-3 bg-gray"
					onClick={handleShowUserData}
				>
					Show user data
				</button>
				<button
					type="button"
					className="p-3 rounded hover:bg-blue"
					onClick={handleSendUserData}
				>
					Send data
				</button>
				<button
					type="button"
					className="p-3 rounded"
					onClick={handleGetSession}
				>
					Get session
				</button>
			</div>
		</main>
	);
}
