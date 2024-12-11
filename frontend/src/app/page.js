"use client";
import { useContext, useEffect } from "react";
import { AuthContext, AuthProvider } from "./components/auth/Authentication";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import HomePage from "./home/layout";

const queryClient = new QueryClient();

const App = ({}) => {
	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://cdn.jsdelivr.net/npm/eruda";
		document.body.appendChild(script);
		script.onload = () => {
			eruda.init();
		};
		return () => {
			script.remove();
		};
	}, []);
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<HomePage />
			</AuthProvider>
		</QueryClientProvider>
	);
};

export default App;
