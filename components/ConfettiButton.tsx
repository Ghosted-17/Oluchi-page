'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';

export function fireMultiverseConfetti() {
  const shapes = ['🎀', '⚽', '🍒', '🏆', '✨', '🎧'];

  // Left burst
  confetti({
    particleCount: 35,
    spread: 70,
    origin: { x: 0.2, y: 0.8 },
    shapes: shapes.map((shape) => confetti.shapeFromText({ text: shape, scalar: 2 })),
    scalar: 2,
    ticks: 200,
  });

  // Right burst
  confetti({
    particleCount: 35,
    spread: 70,
    origin: { x: 0.8, y: 0.8 },
    shapes: shapes.map((shape) => confetti.shapeFromText({ text: shape, scalar: 2 })),
    scalar: 2,
    ticks: 200,
  });
}

export default function ConfettiButton() {
  const [pressed, setPressed] = useState(false);

  const handleClick = () => {
    setPressed(true);
    fireMultiverseConfetti();
    setTimeout(() => setPressed(false), 300);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        type="button"
        onClick={handleClick}
        aria-label="Celebrate Oluchi"
        className={`group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#1A1618] border border-[#FF334B]/60 shadow-[0_0_25px_rgba(255,51,75,0.4)] hover:shadow-[0_0_35px_rgba(255,51,75,0.7)] hover:border-[#FF334B] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer ${
          pressed ? 'scale-90' : ''
        }`}
      >
        {/* Subtle pulsing background glow */}
        <span className="absolute inset-0 rounded-full bg-[#FF334B]/20 animate-ping pointer-events-none" />
        
        {/* Ribbon Emoji */}
        <span className="text-2xl transition-transform duration-300 group-hover:rotate-12 select-none">
          🎀
        </span>

        {/* Hover Tooltip */}
        <span className="absolute right-16 px-3 py-1.5 rounded-xl bg-[#1A1618] border border-[#2E2226] text-[#F8F9FA] text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl">
          Tap for hype ✨
        </span>
      </button>
    </div>
  );
}