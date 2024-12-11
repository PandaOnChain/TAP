import React, { useContext, useState } from "react";
import { createRep } from "../lib/dal"; 
import { AuthContext } from "../components/auth/Authentication";

const CreateRep = ({handleAddRepetition}) => { 
	const [isCreateActive, setIsCreateActive] = useState(false);
	const [title, setTitle] = useState(""); 
	const { refetch } = useContext(AuthContext);

	const handleCreateButton = async (e) => {
		if (title.length < 3) {
			alert("please, create more meaningfull practice");
		} else {
			try {
				const access_token = localStorage.getItem("access_token");
				const response = await createRep(access_token, title);
				if (response.ok) {
					const repetition = await response.json();
					handleAddRepetition(repetition);
					setTitle("");
					setIsCreateActive(false);
				}
			} catch (error) {
				if (error?.message.includes("Unauthorized")) {
					refetch();
				}
			} 
		}
	};

	if (!isCreateActive) {
		return (
			<div className="flex flex-row w-full items-center px-5  justify-between">
				<h3 className="text-lg text-white">The Almanac of Practice</h3>
				<button
					type="button"
					className="px-3 py-2 bg-brand-purple rounded-lg"
					onClick={() => {
						setIsCreateActive(!isCreateActive);
					}}
				>
					+
				</button>
			</div>
		);
	}

	return (
		<div className="flex flex-row w-full items-center px-5 justify-between">
			<input
				type="text"
				name="title"
				onChange={(e) => {
					setTitle(e.target.value);
				}}
				className="bg-inherit border-b-2 border-black text-black"
			/>
			<button
				type="button"
				className="px-3 py-2 bg-brand-purple rounded-lg"
				onClick={handleCreateButton}
			>
				↑
			</button>
		</div>
	);
};
export default CreateRep;
