'use client';

import React, { useRef, useState, useEffect } from 'react';
import { fireMultiverseConfetti } from './ConfettiButton';

const COMPLIMENTS = [
  {
    tag: 'Authentic Soul',
    message:
      'You have this effortless ability to bring warmth and hilarious chaos wherever you go. Life around you is genuinely never dull.',
  },
  {
    tag: 'Certified 1 of 1',
    message:
      'The quiet ambition, the elite taste in sound, and the sharp humor—you are rare in a world where everyone tries to be a copy.',
  },
  {
    tag: 'Unfiltered Energy',
    message:
      'Whether you are laughing at something completely unserious or dialed in handling business, every version of you is elite.',
  },
  {
    tag: 'Pure Grace',
    message:
      'You handle things with so much composure, even when days get messy. You deserve every win coming your way.',
  },
  {
    tag: 'The Standard',
    message:
      'Someone who is genuinely kind, effortlessly stylish, and impossible to forget. Keep being exactly who you are.',
  },
];

export default function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [compliment, setCompliment] = useState(COMPLIMENTS[0]);
  const isDrawing = useRef(false);

  // Pick a fresh random compliment on load
  useEffect(() => {
    const randomItem = COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)];
    setCompliment(randomItem);
  }, []);

  // Initialize Canvas Foil
  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Velvet Noir metallic foil gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#2E2226');
    gradient.addColorStop(0.5, '#402B30');
    gradient.addColorStop(1, '#1A1618');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Decorative foil text
    ctx.font = 'bold 13px monospace';
    ctx.fillStyle = '#FF334B';
    ctx.textAlign = 'center';
    ctx.fillText('✨ SCRATCH WITH FINGER OR CURSOR ✨', canvas.width / 2, canvas.height / 2);
  };

  useEffect(() => {
    initCanvas();
    window.addEventListener('resize', initCanvas);
    return () => window.removeEventListener('resize', initCanvas);
  }, []);

  const scratch = (clientX: number, clientY: number) => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    checkPercentage();
  };

  const checkPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++;
    }

    const scratchedRatio = transparent / (pixels.length / 4);

    if (scratchedRatio > 0.4) {
      setIsRevealed(true);
      fireMultiverseConfetti();
    }
  };

  const resetCard = () => {
    setIsRevealed(false);
    const randomItem = COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)];
    setCompliment(randomItem);
    setTimeout(initCanvas, 50);
  };

  return (
    <section className="w-full max-w-xl px-4 py-10 relative z-10 flex flex-col items-center">
      <div className="text-center mb-6 space-y-1">
        <span className="inline-block text-xs uppercase tracking-[0.35em] text-[#FF334B] font-extrabold px-3 py-1 rounded-full bg-black/70 border border-[#FF334B]/40 backdrop-blur-md shadow-lg">
          CONFIDENTIAL NOTE
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
          Scratch To Reveal<span className="text-[#FF334B]">.</span>
        </h2>
        <p className="text-xs sm:text-sm font-medium text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
          A secret truth meant only for you. Scratch off the surface.
        </p>
      </div>

      <div className="relative w-full h-56 rounded-3xl bg-[#1A1618] border border-[#FF334B]/50 overflow-hidden shadow-[0_0_35px_rgba(255,51,75,0.2)] flex items-center justify-center p-6 text-center select-none">
        {/* Hidden Compliment Underneath */}
        <div className="flex flex-col items-center justify-center space-y-2 max-w-md z-0">
          <span className="text-xs font-mono uppercase tracking-widest text-[#FF334B] bg-[#FF334B]/10 px-3 py-0.5 rounded-full border border-[#FF334B]/30 font-bold">
            {compliment.tag}
          </span>
          <p className="text-base sm:text-lg font-bold text-white leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            &ldquo;{compliment.message}&rdquo;
          </p>
          <span className="text-[11px] font-mono text-[#D1CBD0]">
            From: El Princessa Ghost🎀
          </span>
        </div>

        {/* Scratchable Canvas Layer */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full cursor-pointer z-10 transition-opacity duration-700 ${
            isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          onMouseDown={() => {
            isDrawing.current = true;
          }}
          onMouseUp={() => {
            isDrawing.current = false;
          }}
          onMouseLeave={() => {
            isDrawing.current = false;
          }}
          onMouseMove={(e) => {
            if (isDrawing.current) scratch(e.clientX, e.clientY);
          }}
          onTouchStart={() => {
            isDrawing.current = true;
          }}
          onTouchEnd={() => {
            isDrawing.current = false;
          }}
          onTouchMove={(e) => {
            if (isDrawing.current && e.touches[0]) {
              scratch(e.touches[0].clientX, e.touches[0].clientY);
            }
          }}
        />
      </div>

      {isRevealed && (
        <button
          type="button"
          onClick={resetCard}
          className="mt-4 px-5 py-2 rounded-full bg-[#1A1618] border border-[#2E2226] hover:border-[#FF334B] text-xs font-mono text-[#D1CBD0] hover:text-[#FF334B] transition-all cursor-pointer shadow-lg animate-in fade-in"
        >
          Scratch another note ↺
        </button>
      )}
    </section>
  );
}