"use client";

import TelegramAuth from "./components/TelegramAuth";
import { Suspense, useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import Link from "next/link";
import { getReps, getToken } from "./lib/dal";
import Loading from "./components/Loading";
import App from "./App";
import { useRouter } from "next/navigation";

//store to local storage the token
//make new request with included token and make separate button to get data

// try to get token
// if localstorage.token !==null => return home page component  // check Suspense react // Ch9 Streaming
// return loading page


export default function Home() {

	const router = useRouter()

	useEffect(()=>{
		router.push("/home/")
	})
	// const [erudaInitialized, setErudaInitialized] = useState(false);
	// const [userInitData, setUserInitData] = useState(null);
	// const [accessToken, setAccessToken] = useState(null);

	// const sendInitData = async (userInitData) => {
	// 	const userData = JSON.stringify({ initData: userInitData });
	// 	const accessToken = await getToken(userData);
	// 	if (accessToken) {
	// 		localStorage.setItem("access_token", accessToken);
	// 	}
	// };

	// useEffect(() => {
	// 	if (!localStorage.getItem("access_token")) {
	// 		sendInitData(WebApp.initData);
	// 	}
	// }, []);

	// const handleShowUserData = () => {
	// 	console.debug(WebApp.initData);
	// 	console.error(WebApp);
	// };

	// const handleSendUserData = () => {
	// 	sendInitData(userInitData);
	// };

	// const handleGetSession = async () => {
	// 	try {
	// 		const userRequset = await fetch(`${ngrokUrl}/auth/session/`, {
	// 			method: "GET",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 				Authorization: `Bearer ${localStorage.getItem(
	// 					"access_token"
	// 				)}`,
	// 			},
	// 		});
	// 		console.log("access_token", accessToken);
	// 		const userResult = await userRequset.json();
	// 		console.log("user data", userResult);
	// 	} catch (error) {
	// 		console.error("error fetching data:", error);
	// 	}
	// };

	// const handleGetReps = async () => {
	// 	const reps = await getReps(localStorage.getItem("access_token"));
	// 	console.log(reps);
	// };

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<h1 className="text-4xl">
				JWT authentication for Telegram Mini Apps
			</h1>
			<div className="flex flex-col">
				<button
					type="button"
					className="p-3 rounded m-3 bg-gray"
					// onClick={handleShowUserData}
				>
					Show user data
				</button>
				<button
					type="button"
					className="p-3 rounded hover:bg-blue"
					// onClick={handleSendUserData}
				>
					Send data
				</button>
				<button
					type="button"
					className="p-3 rounded"
					// onClick={handleGetReps}
				>
					Get practices
				</button>
				<Link href={"/home/"}>go to home</Link>
			</div>
		</main>
	);
}
