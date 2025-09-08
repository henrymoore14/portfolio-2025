"use client";
import React, { useRef, useEffect } from "react";
import WelcomeChat from "./components/WelcomeChat";
import ProjectGrid from "./components/ProjectGrid";

export default function Home() {
  const [showProjects, setShowProjects] = React.useState(false);
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let vantaEffect: any;
    if (typeof window !== "undefined" && vantaRef.current) {
      import('vanta/dist/vanta.fog.min').then(VANTA => {
        import('three').then(THREE => {
          vantaEffect = VANTA.default({
            el: vantaRef.current,
            THREE: THREE,
            mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  highlightColor: 0xffffff,
  midtoneColor: 0x969696,
  lowlightColor: 0xffffff,
  baseColor: 0xffffff,
  blurFactor: 0.20,
  speed: 0.10,
  zoom: 0.20
            // mouseControls: true,
            // touchControls: true,
            // gyroControls: false,
            // minHeight: 200.00,
            // minWidth: 200.00,
            // highlightColor: 0xf7cead,
            // midtoneColor: 0xe1dad9,
            // lowlightColor: 0x4a4a50,
            // baseColor: 0xffffff,
            // blurFactor: 0.09,
            // speed: 0.40,
            // zoom: 0.60
          });
        });
      });
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <div className="bg-white h-screen w-full overflow-hidden flex items-center justify-center">
      <div className="relative w-[calc(100vw-64px)] h-[calc(100vh-64px)] rounded-3xl overflow-hidden">
        <div ref={vantaRef} className="absolute inset-0 w-full h-full z-0" />
        <div
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          style={{
            backgroundImage: `url(/textures/acid/${Math.floor(Math.random()*21)+1}.jpg)`,
            backgroundSize: '120% 120%',
            backgroundPosition: 'center',
            opacity: 0.2,
            mixBlendMode: 'color-burn',
          }}
        />
        {/* Plastic texture overlay */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
          style={{
            backgroundImage: `url(/textures/plastic/11.jpg)`,
            backgroundSize: 'cover',
            opacity: 1,
            mixBlendMode: 'screen',
          }}
        />
        <div id="page" className="grid grid-cols-12 p-8 gap-8 h-full relative z-40">
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
      </div>
    </div>
  );
}
