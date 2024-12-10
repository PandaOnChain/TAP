"use client";
import Loading from "../components/Loading";
import RepCard from "./RepCard";
import { getReps } from "../lib/dal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../components/auth/Authentication";
import { useEffect, useReducer } from "react";
import CreateRep from "./CreateRep";

function updateRepDayStatus(reps, daily) {
	//filter in reps
	//filter in dailies
	//update dailies
	//return rep to reps
}

function reducer(reps, action) {
	console.log(action.repetition, reps)
	switch (action.type) {
		case "reset_reps":
			return action.repetitions;
		case "add_repetition":
			return [...reps, action.repetition];

		case "update_repetition_daily":
			console.log("update_daily")
			return reps.map((repetition) => {
				if (repetition && repetition.id === action.repetition.id) {
					return {
						...repetition,
						week_notes: repetition.week_notes.map((note) =>
							note && note.date === action.repetition.note.date
								? action.repetition.note
								: note
						),
					};
				}
				return repetition;
			});

		case "add_repetition_daily":
			console.log("add_daily")
			return reps.map((repetition) => {
				if (repetition && repetition.id === action.repetition.id) {
					return {
						...repetition,
						week_notes: [
							...repetition.week_notes,
							action.repetition.note,
						],
					};
				}
				return repetition;
			});

		default:
			return reps;
	}
}

function useReps() {
	const access_token = localStorage.getItem("access_token");
	return useQuery({
		queryKey: ["repetitions", access_token],
		queryFn: () => getReps(access_token),
	});
}

const Content = () => {
	const { data, isPending, isError, error, isSuccess } = useReps();
	
	const [reps, dispatch] = useReducer(reducer, data?.repetitions || []);

	useEffect(() => {
		if (isSuccess && data?.repetitions) {
			dispatch({ type: "reset_reps", repetitions: data.repetitions });
		}
	}, [isSuccess, data]);

	if (isPending) {
		return <Loading />;
	}

	if (isError) {
		if (error?.message.includes("Unauthorized")) {
			console.error(error.message);
		}
		return (
			<div>
				Something went wrong during fetching reps <br/> || {error.message} ||
			</div>
		);
	}

	if (isSuccess) { 

		const handleAddRepetition = (repetition) => {
			dispatch({type: "add_repetition", repetition})
		}

		const handleUpdateDailyNote = (repetition) => {
			dispatch({type: "update_repetition_daily", repetition})
		}

		const handleAddDailyNote = (repetition) => {
			dispatch({type: "add_repetition_daily", repetition})
		}

		return (
			<>
				<div className="mb-50">
					<div className="flex flex-col place-content-center mb-20 px-3">
						{reps.map(({ title, id, week_notes }, index) => (
							<RepCard
								key={index}
								repetitionId={id}
								weekNotes={week_notes}
								title={title} 
								handleAddDailyNote={handleAddDailyNote}
								handleUpdateDailyNote={handleUpdateDailyNote}
							/>
						))}
					</div>
				</div>
				<div className="fixed left-0 right-0 bottom-0 flex   bg-brand-yellow h-[80px] rounded-t-xl max-w-screen-sm mx-auto">
					<CreateRep handleAddRepetition={handleAddRepetition}/>
				</div>
			</>
		);
	}

	
};

export default Content;
