import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "The Almanac of Practice",
  description: "A simple Telegram Mini App to track your perseverance",
};

export default function RootLayout({ children }) {
  return (
		<html lang="en">
			<head>
				<Script
					src="https://telegram.org/js/telegram-web-app.js"
					strategy="beforeInteractive"
				/> 
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{children}
			</body>
		</html>
  );
}
