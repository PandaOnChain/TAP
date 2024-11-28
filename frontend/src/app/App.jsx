"use client";
import { useContext, useEffect } from "react";
import { AuthContext, AuthProvider } from "./components/auth/Authentication";
import Home from "./page";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = ({ children }) => {
	useEffect(() => { 
		const script = document.createElement("script");
		script.src = "https://cdn.jsdelivr.net/npm/eruda";
		document.body.appendChild(script);
		script.onload = () => {
			eruda.init();
		};
		return () => {
			script.remove()
		}
	}, []);
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider> 
				{children}
			</AuthProvider>
		</QueryClientProvider>
	);
};

export default App;
