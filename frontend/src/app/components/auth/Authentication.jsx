"use client";

import { getToken } from "@/app/lib/dal";
import { createContext, useContext, useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../Loading";
import { useRouter } from "next/router";

export const AuthContext = createContext({
	isAuthenticated: false,
	refreshToken: () => {},
});

const useAuth = () => {
	return useQuery({
		queryKey: ["auth"],
		queryFn: () => authentincateUser(),
		staleTime: 60 * 60 * 1000,
	});
};

export const AuthProvider = ({ children }) => {
	
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const {
		data,
		refetch,
		isStale,
		isFetching,
		isError,
		isSuccess,
		isPending,
		error,
	} = useAuth();

	// useEffect(() => {
	// 	if (isSuccess) {
	// 		setIsAuthenticated(true);
	// 	}
	// }, [isSuccess]);

	if (isPending) {
		return (
			<div className="flex w-full h-full justify-items-center">
				<Loading />
			</div>
		);
	}

	if (isError) {
		console.log(error);
		return (
			<div className="w-full h-full justify-items-center">
				Something went wrong... || {error.message} ||
			</div>
		);
	}

	if (isSuccess) {
		return (
			<AuthContext.Provider value={{ isAuthenticated, refetch }}>
				{children}
			</AuthContext.Provider>
		);
	}
};

const authentincateUser = async () => {
	const WebApp = (await import("@twa-dev/sdk")).default;
	WebApp.ready();
	const initData = WebApp.initData;
	console.log(WebApp);
	// const tokenInLocalStorage = localStorage.getItem("access_token");
	// if (tokenInLocalStorage) {
	// 	return true;
	// }
	if (initData) {
		const access_token = await getToken(initData);
		if (access_token) {
			localStorage.setItem("access_token", access_token);
			return true;
		}
	}
	console.error("Something went wrong in authenticateUser");
	return false;
};
