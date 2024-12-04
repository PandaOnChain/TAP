"use client";
import React, { Suspense, useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import RepCard from "./RepCard";
import { getReps } from "../lib/dal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../components/auth/Authentication";

function useReps() {
	const access_token = localStorage.getItem("access_token");
	return useQuery({
		queryKey: ["repetitions", access_token],
		queryFn: () => getReps(access_token),
	});
}

const Content = () => {
	 
	const { refetch } = useContext(AuthContext);

	const { data, isPending, isError, error } = useReps();

	if (isPending) {
		return <Loading />;
	}

	if (isError) {
		if (error?.message.includes("Unauthorized")) {
			
			refetch();
		}
		return (
			<div>
				Something went wrong during fetching reps || {error.message} ||
			</div>
		);
	}

	console.log(data);

	return (
		<div className="flex flex-col place-content-center mb-20 px-3">
			{data.repetitions.map(({ title, id, week_notes }, index) => (
				<RepCard
					key={index}
					repetitionId={id}
					weekNotes={week_notes}
					title={title}
					authRefetch={refetch}
				/>
			))}
		</div>
	);
};

export default Content;
