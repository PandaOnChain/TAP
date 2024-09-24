"use client";
import TelegramAuth from "./components/TelegramAuth";
import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";


export default function Home() {
	const [userData, setUserData] = useState(null);
	const [erudaInitialized, setErudaInitialized] = useState(false);

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
		const sendInitData = async () => {
			try {
				const response = await fetch(
					"https://3189-31-30-167-157.ngrok-free.app/telegram",
					{
						method: "POST",
						body: JSON.stringify({ initData: userData }),
					}
				);
				console.log(userData);
			} catch (error) {
				console.error("error fetching data:", error);
			}
		};
		if (WebApp.initDataUnsafe.user) {
			setUserData(WebApp.initDataUnsafe.user);
			sendInitData();
			console.debug(WebApp.initData.user);
		}
	}, []);
 

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
			</div>
		</main>
	);
}
