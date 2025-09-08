"use client";
import React from "react";
import WelcomeChat from "./components/WelcomeChat";
import ProjectGrid from "./components/ProjectGrid";


export default function Home() {
  const [showProjects, setShowProjects] = React.useState(false);

  return (
    <div id="page" className="grid grid-cols-12 p-8 gap-8 min-h-screen relative">
      {!showProjects && (
        <button
          onClick={() => setShowProjects(true)}
          className="fixed top-6 right-6 px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm z-50"
        >
          Skip
        </button>
      )}
      {!showProjects ? (
        <WelcomeChat onChatFinished={() => setShowProjects(true)} />
      ) : (
        <ProjectGrid />
      )}
    </div>
  );
}
