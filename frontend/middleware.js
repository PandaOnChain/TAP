import { NextResponse } from "next/server";

const protectedRoutes = ["/home", "/reps"];
const publicRoutes = ["/"];

export function middleware(request) {
	console.log("running");
	return NextResponse.next();
}
