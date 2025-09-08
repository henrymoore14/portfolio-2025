import React from "react";

interface ProjectProps {
	title: string;
	description: string;
	image: string;
	song: string;
	onClose: () => void;
}

export default function Project({ title, description, image, song, onClose }: ProjectProps) {
	return (
		<div className="col-span-12 flex flex-col items-center justify-center min-h-screen">
			<button onClick={onClose} className="self-end mb-4 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700">Close</button>
			<img src={image} alt={title} className="w-full max-w-md h-64 object-cover rounded mb-6" />
			<h2 className="font-bold text-2xl mb-2 text-gray-900">{title}</h2>
			<p className="text-gray-600 text-base mb-4 text-center max-w-xl">{description}</p>
			<a href={song} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline text-lg">Listen to song</a>
		</div>
	);
}
