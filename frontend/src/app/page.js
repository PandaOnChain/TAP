"use client"

import Image from "next/image";
import TelegramAuth from "./components/TelegramAuth";
import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";

export default function Home() {
	const [userData, setUserData] = useState(null)
	useEffect(()=>{
		const sendInitData = async () => {
			const response = await fetch(
				"https://ba75-31-30-167-157.ngrok-free.app/telegram", {
					method: "POST",
					body: JSON.stringify(userData)
				}
			);
		};
		if (WebApp.initDataUnsafe.user) {
			setUserData(WebApp.initDataUnsafe.user) 
			sendInitData()
			
		}
	},[])

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<h1 className="text-4xl">
				JWT authentication for Telegram Mini Apps
			</h1>
			<div className="flex flex-col">
					{userData ? (Object.keys(userData).forEach(function(key){
						<div className="flex">
							<p className="text-xl">{key}</p>
							<p className="text-gray">{userData[key]}</p>
						</div>
					})):(<p>No data yet</p>)}
			</div>
			 
		</main>
	);
}
