"use client";
import React from "react";
import HomeHeader from "./HomeHeader"; 
import CreateRep from "./CreateRep";

const HomePage = ({ children }) => {
	return (
		<div className="max-w-screen-sm mx-auto flex h-screen flex-col relative bg-black">
			<div className="w-full flex-none sticky top-0 bg-black">
				<HomeHeader />
			</div>
			<div className="mb-50">{children}</div>
			<div className="fixed left-0 right-0 bottom-0 flex   bg-brand-yellow h-[80px] rounded-t-xl max-w-screen-sm mx-auto">
				<CreateRep />
			</div>
		</div>
	);
};

export default HomePage;
