'use client';

import React, { useState, useEffect } from 'react';

// Your background video paths
const BG_VIDEOS = [
  '/videos/bg.mp4',
  '/videos/bg2.mp4',
  '/videos/bg3.mp4',
  '/videos/bg4.mp4',
  '/videos/bg5.mp4',
  '/videos/bg6.mp4',
  '/videos/bg7.mp4',
];

export default function AmbientBackground() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (BG_VIDEOS.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % BG_VIDEOS.length);
    }, 9000); // Cycles every 9 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {BG_VIDEOS.map((src, i) => (
        <video
          key={src}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            i === activeIdx ? 'opacity-45' : 'opacity-0'
          }`}
        />
      ))}

      {/* Velvet Noir Scrim & Gradient: Calibrated for clarity and legibility */}
      <div className="absolute inset-0 bg-[#0D0B0C]/60 backdrop-blur-[1px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0B0C]/80 via-transparent to-[#0D0B0C]/90" />
    </div>
  );
}