"use client";
import React from "react";
import HomeHeader from "./HomeHeader";
import CreateRep from "./CreateRep";
import Content from "./RepMain";

const HomePage = ({ children }) => {
	return (
		<div className="max-w-screen-sm mx-auto flex h-screen flex-col relative bg-black text-brand-beige">
			<div className="w-full flex-none sticky top-0 bg-black">
				<HomeHeader />
			</div>
			<Content />
		</div>
	);
};

export default HomePage;
