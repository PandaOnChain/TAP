"use client";
import React, { Suspense, useEffect, useState } from "react";
import Loading from "../components/Loading";
import RepCard from "./RepCard";
import { getReps } from "../lib/dal";

const Content = () => {
	const [repetitions, setRepetitions] = useState([]);

	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://cdn.jsdelivr.net/npm/eruda";
		document.body.appendChild(script);
		script.onload = () => {
			eruda.init();
		};
	});

	useEffect(() => {
		const fetchReps = async () => {
			const reps = await getReps(localStorage.getItem("access_token"));
			setRepetitions(reps);  
		};
		fetchReps();
	}, []);
	return (
		<div className="flex flex-col place-content-center pt-20">
			<Suspense fallback={<Loading />}>
				{(repetitions || []).map(({ title }, index) => (
					<RepCard key={index} title={title} />
				))}
			</Suspense>
		</div>
	);
};

export default Content;
