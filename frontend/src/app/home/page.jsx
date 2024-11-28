"use client";
import React, { Suspense, useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import RepCard from "./RepCard";
import { getReps } from "../lib/dal";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../components/auth/Authentication";

function useReps() {
	const access_token = localStorage.getItem("access_token");
	return useQuery({
		queryKey: ["repetitions", access_token],
		queryFn: () => getReps(access_token),
	});
}

const Content = () => {

	const {refetch} = useContext(AuthContext)

	const { data, isPending, isError } = useReps();

	if (isPending) {
		return (
			<div className="flex h-full justify-items-center">
				<Loading />
			</div>
		);
	}

	if (isError) {
		//if error, then remove
		// localStorage.removeItem("access_token");
		console.log("Error during fetching reps")
		refetch()
		return <div>Something went wrong during fetching reps</div>;
	}

	console.error(data);

	return (
		<div className="flex flex-col place-content-center mb-20">
			{data.repetitions.map(({ title, id, week_notes }, index) => (
				<RepCard key={index} repetitionId={id} weekNotes={week_notes} title={title} />
			))}
		</div>
	);
};

export default Content;
