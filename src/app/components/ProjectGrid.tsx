import React from "react";

interface Project {
  title: string;
  description: string;
}

// Dummy data for projects
const projects: Project[] = [
  { title: "Project Alpha", description: "AI-powered design system." },
  { title: "Project Beta", description: "Conversational UI toolkit." },
  { title: "Project Gamma", description: "Agent workflow automation." },
  { title: "Project Delta", description: "Portfolio analytics dashboard." }
];

export default function ProjectGrid() {
  return (
    <div className="col-span-12 grid grid-cols-2 grid-rows-2 gap-8 w-full h-full">
      {projects.map((project, idx) => (
        <div
          key={idx}
          className="bg-white rounded-xl shadow flex flex-col items-start p-6"
        >
          <h3 className="font-bold text-lg mb-2 text-gray-900">{project.title}</h3>
          <p className="text-gray-600 text-sm">{project.description}</p>
        </div>
      ))}
    </div>
  );
}
