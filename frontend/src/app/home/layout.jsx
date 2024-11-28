"use client";
import React from "react";
import HomeHeader from "./HomeHeader"; 
import CreateRep from "./CreateRep";

const HomePage = ({ children }) => {
	return (
		<div className="flex h-screen flex-col relative">
			<div className="w-full flex-none sticky top-0 bg-black">
				<HomeHeader />
			</div>
			<div className="mb-50">{children}</div>
			<div className="fixed left-0 right-0 bottom-0 flex mx-2 bg-yellow-200 h-[80px] rounded-t-xl">
				<CreateRep/>
			</div>
		</div>
	);
};

export default HomePage;
