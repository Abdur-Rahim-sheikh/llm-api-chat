// src/app/layout.tsx
import type { Metadata } from "next";
import { Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
	subsets: ["latin"],
	variable: "--font-syne",
	weight: ["400", "500", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
	weight: ["400", "500"],
});

export const metadata: Metadata = {
	title: "LLM Chat — Multi-Provider AI",
	description: "Chat with ChatGPT and Gemini, track your costs.",
	icons: {
		icon: "/favicon.ico",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={`${syne.variable} ${jetbrains.variable}`}>
			<body className="bg-zinc-950 text-zinc-100 font-sans antialiased">
				{children}
			</body>
		</html>
	);
}
