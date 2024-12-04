"use client";

import TelegramAuth from "./components/TelegramAuth";
import { Suspense, useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import Link from "next/link";
import { getReps, getToken } from "./lib/dal";
import Loading from "./components/Loading";
import App from "./App";
import { useRouter } from "next/navigation";

// try to get token
// if localstorage.token !==null => return home page component  // check Suspense react // Ch9 Streaming
// return loading page

export default function Home() {
	const router = useRouter();

	useEffect(() => {
		router.push("/home/");
	});

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<h1 className="text-4xl">
				JWT authentication for Telegram Mini Apps
			</h1>
			<div className="flex flex-col">
				<Link href={"/home/"}>
					<button type="button" className="p-3 rounded">
						Go home
					</button>
				</Link>
			</div>
		</main>
	);
}
