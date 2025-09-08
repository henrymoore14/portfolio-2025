"use client";
import React, { useState, useEffect } from "react";
import ColumnScaffold from "./ColumnScaffold";

interface ChatMessage {
	id: number;
	text: string;
	sender: "henry" | "user";
}

interface WelcomeChatProps {
	onChatFinished?: () => void;
}

export default function WelcomeChat({ onChatFinished }: WelcomeChatProps) {
	// Toggle for column scaffold (set to true to show)
	const [showScaffold, setShowScaffold] = useState(false);
	// State for chat messages
	const [messages, setMessages] = useState<ChatMessage[]>([
		{
			id: 1,
			text:
				"Hi I'm Henry!\nI'm a Product designer based in SF, currently working on AI Agents at Microsoft. I thought it'd be cool for us to connect a bit, so I've played my favorite song to welcome you to my site :)...",
			sender: "henry",
		},
		{
			id: 2,
			text: "Who do I have the pleasure of meeting today?",
			sender: "henry",
		},
	]);
	const [input, setInput] = useState("");
	const [userName, setUserName] = useState<string | null>(null);
	const [showInput, setShowInput] = useState(true);
	// Typewriter animation state
	const [currentMsgIdx, setCurrentMsgIdx] = useState(0);
	const [typedMessages, setTypedMessages] = useState<string[]>([]);
		// Show project grid after last message animates
		const showProjects = currentMsgIdx >= messages.length && !showInput;

		useEffect(() => {
			if (showProjects && onChatFinished) {
				onChatFinished();
			}
		}, [showProjects, onChatFinished]);

	useEffect(() => {
		// Animate each message in sequence
		if (currentMsgIdx < messages.length) {
			const msg = messages[currentMsgIdx];
			const speed = msg.sender === "henry" ? 30 : 15;
			let i = 0;
			// Only initialize if this is the first character
			setTypedMessages((prev) => {
				if (prev.length < messages.length) {
					const arr = Array(messages.length).fill("");
					for (let j = 0; j < prev.length; j++) arr[j] = prev[j];
					return arr;
				}
				return prev;
			});
			const interval = setInterval(() => {
				setTypedMessages((prev) => {
					const updated = [...prev];
					updated[currentMsgIdx] = msg.text.slice(0, i + 1);
					return updated;
				});
				i++;
				if (i >= msg.text.length) {
					clearInterval(interval);
					setTimeout(() => setCurrentMsgIdx((idx) => idx + 1), 400);
				}
			}, speed);
			return () => clearInterval(interval);
		}
	}, [currentMsgIdx, messages]);

	// Handles sending user's name and triggers Henry's response
	const handleSend = (e: React.FormEvent) => {
		e.preventDefault();
		if (!input.trim()) return;
		setMessages((prev) => [
			...prev,
			{ id: prev.length + 1, text: input, sender: "user" },
			{
				id: prev.length + 2,
				text: `It's great to meet you ${input}, I appreciate you taking the time to look at my portfolio today. Let's take a look at some of my projects!`,
				sender: "henry",
			},
		]);
		setUserName(input);
		setInput("");
		setShowInput(false);
	};

	return (
		<>
			{/* 12-column scaffold, underneath all content */}
			<ColumnScaffold show={showScaffold} />
			<div
				className="col-start-5 col-span-4 min-h-screen flex items-center justify-center"
			>
				<div className="col-start-5 col-span-4 flex flex-col items-center w-full">
					<h1 className="text-2xl font-bold mb-4 font-[var(--font-outfit)] text-gray-900">Welcome!</h1>
					{/* Show chat until projects are revealed */}
					{!showProjects && (
						<>
							<div className="space-y-4 mb-4 w-full">
								{messages.map((msg, idx) => {
									// Only show bubble if text is animating or has animated
									if (!typedMessages[idx] && currentMsgIdx !== idx) return null;
									return (
										<div
											key={msg.id}
											className={`flex ${msg.sender === "henry" ? "justify-start" : "justify-end"} w-full`}
										>
											<div
																		className={
																			`px-4 py-2 rounded-lg ${
																					msg.sender === "user"
																						? "bg-blue-100 text-gray-900 inline-block max-w-[80%]"
																						: "bg-gray-100 text-gray-800 w-full"
																				}`
																			}
											>
												{typedMessages[idx]}
												{currentMsgIdx === idx && <span className="animate-pulse">|</span>}
											</div>
										</div>
									);
								})}
							</div>
							{/* Input box for user's name, only after all messages are animated */}
							{showInput && currentMsgIdx >= messages.length && (
								<div className="bg-white rounded-xl shadow-md p-4 flex items-center w-full" style={{ maxWidth: "100%", background: "#fff" }}>
									<form onSubmit={handleSend} className="flex w-full items-center">
										<input
											type="text"
											className="flex-1 bg-transparent outline-none px-2 text-gray-900 placeholder-gray-400"
											placeholder="Your name..."
											value={input}
											onChange={(e) => setInput(e.target.value)}
											required
										/>
										<button
											type="submit"
											className="ml-2 p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center"
											aria-label="Send"
										>
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
												<path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
											</svg>
										</button>
									</form>
								</div>
							)}
						</>
					)}
					{/* Show project grid after chat animation */}
						{/* Project grid is now handled by parent */}
				</div>
			</div>
			{/* Toggle button for scaffold (for dev use) */}
			<button
				onClick={() => setShowScaffold((v) => !v)}
				className="fixed bottom-6 right-6 bg-gray-200 text-gray-700 px-3 py-1 rounded shadow z-50"
				style={{ fontSize: 14 }}
			>
				{showScaffold ? "Hide" : "Show"} Scaffold
			</button>
		</>
	);
}