'use client';

import React, { useState, useEffect } from 'react';
import { fireMultiverseConfetti } from './ConfettiButton';

interface Era {
  id: string;
  title: string;
  tagline: string;
  emoji: string;
  vibeText: string;
  color: string;
}

const ERAS: Era[] = [
  {
    id: 'goofball',
    title: 'The Goofball',
    tagline: 'Pure Unfiltered Chaos',
    emoji: '🤪',
    vibeText: 'Zero serious thoughts, laughing at things that are not even funny, and causing menace.',
    color: '#FF334B',
  },
  {
    id: 'dancer',
    title: 'Dancer & Creator',
    tagline: 'Spotlight & Rhythm',
    emoji: '💃',
    vibeText: 'Every sound is a choreography opportunity. Unmatched rhythm, main character dance energy.',
    color: '#FF576D',
  },
  {
    id: 'therapist',
    title: 'The Free Therapist',
    tagline: 'Calm, Safe & Honest',
    emoji: '☕',
    vibeText: 'Listening ear activated. The person everyone turns to for clarity, comfort, and real talk.',
    color: '#E02138',
  },
  {
    id: 'academic',
    title: 'Serious & Academic',
    tagline: 'Locked In & Ambitious',
    emoji: '📚',
    vibeText: 'Do not disturb. Goals on lock, business handled, high honors only.',
    color: '#9E9398',
  },
  {
    id: 'gentle',
    title: 'Soft & Gentle',
    tagline: 'Grounded & Peaceful',
    emoji: '🌸',
    vibeText: 'Unbothered, soft aesthetic, good snacks, and peaceful frequencies only.',
    color: '#FFA8B5',
  },
  {
    id: 'barca',
    title: 'Blaugrana VIP',
    tagline: 'Matchday Energy',
    emoji: '🔵🔴',
    vibeText: 'Reps the colors with loyalty. Passionate, competitive, and unmatched hype.',
    color: '#004D98',
  },
];

const COOLDOWN_MS = 60 * 60 * 1000;

export default function RouletteWheel() {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedEra, setSelectedEra] = useState<Era | null>(null);
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const checkCooldown = () => {
      const savedTime = localStorage.getItem('oluchi_roulette_timestamp');
      const savedEra = localStorage.getItem('oluchi_roulette_result');

      if (savedEra) {
        const found = ERAS.find((e) => e.id === savedEra);
        if (found) setSelectedEra(found);
      }

      if (savedTime) {
        const elapsed = Date.now() - parseInt(savedTime, 10);
        if (elapsed < COOLDOWN_MS) {
          setIsLocked(true);
          const remaining = COOLDOWN_MS - elapsed;
          const mins = Math.floor((remaining / (1000 * 60)) % 60);
          const secs = Math.floor((remaining / 1000) % 60);
          setTimeLeft(`${mins}m ${secs}s`);
        } else {
          setIsLocked(false);
          setTimeLeft(null);
        }
      }
    };

    checkCooldown();
    const interval = setInterval(checkCooldown, 1000);
    return () => clearInterval(interval);
  }, []);

  const spinWheel = () => {
    if (spinning || isLocked) return;

    setSpinning(true);
    const randomIndex = Math.floor(Math.random() * ERAS.length);
    const chosen = ERAS[randomIndex];

    const segmentAngle = 360 / ERAS.length;
    const targetAngle = 1800 + randomIndex * segmentAngle + (Math.random() * 20 - 10);
    const newRotation = rotation + targetAngle;

    setRotation(newRotation);

    setTimeout(() => {
      setSpinning(false);
      setSelectedEra(chosen);
      setIsLocked(true);

      localStorage.setItem('oluchi_roulette_timestamp', Date.now().toString());
      localStorage.setItem('oluchi_roulette_result', chosen.id);

      fireMultiverseConfetti();
    }, 3500);
  };

  return (
    <section className="w-full max-w-2xl px-4 py-12 flex flex-col items-center relative z-10">
      <div className="text-center mb-6 space-y-1">
        <span className="text-xs uppercase tracking-[0.3em] text-[#FF334B] font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          DAILY ALIGNMENT
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
          Which Oluchi Are You Right Now<span className="text-[#FF334B]">?</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#F0EAEF] max-w-sm mx-auto drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
          Spin the vinyl record to see which multiverse era takes the wheel for the next hour.
        </p>
      </div>

      <div className="flex flex-col items-center gap-6 bg-[#1A1618]/90 border border-[#2E2226] rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative overflow-hidden backdrop-blur-md">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FF334B]/10 via-transparent to-transparent pointer-events-none" />

        {/* Compact Vinyl Disc for Mobile Screens */}
        <div className="relative w-48 h-48 sm:w-60 sm:h-60 flex items-center justify-center">
          {/* Top Indicator */}
          <div className="absolute -top-2.5 z-30 flex flex-col items-center">
            <div className="w-3.5 h-5 bg-[#FF334B] rounded-b-full shadow-[0_0_8px_#FF334B]" />
          </div>

          <div
            className="w-full h-full rounded-full border-4 border-[#2E2226] bg-[#0D0B0C] shadow-2xl flex items-center justify-center relative overflow-hidden transition-transform duration-[3500ms] ease-out"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <div className="absolute inset-3 rounded-full border border-white/5 pointer-events-none" />
            <div className="absolute inset-6 rounded-full border border-white/5 pointer-events-none" />
            <div className="absolute inset-10 rounded-full border border-white/5 pointer-events-none" />

            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#A50044] via-[#FF334B] to-[#FF576D] flex items-center justify-center shadow-inner border border-white/30 z-10">
              <span className="text-xl sm:text-2xl select-none">
                {spinning ? '🌀' : selectedEra ? selectedEra.emoji : '🎀'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col items-center gap-2">
          {isLocked && timeLeft ? (
            <div className="flex flex-col items-center gap-1">
              <button
                disabled
                className="px-6 py-2.5 rounded-full bg-[#1A1618] border border-[#2E2226] text-[#D1CBD0] font-mono text-xs cursor-not-allowed"
              >
                Next spin in: {timeLeft}
              </button>
              <span className="text-[10px] text-[#D1CBD0] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                Locked to preserve your hourly alignment ✨
              </span>
            </div>
          ) : (
            <button
              type="button"
              onClick={spinWheel}
              disabled={spinning}
              className={`px-7 py-3 rounded-full bg-[#FF334B] hover:bg-[#E02138] text-white font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(255,51,75,0.4)] hover:scale-105 active:scale-95 cursor-pointer ${
                spinning ? 'opacity-50 cursor-wait' : ''
              }`}
            >
              {spinning ? 'Consulting The Multiverse...' : 'Spin The Record ↺'}
            </button>
          )}
        </div>

        {/* Result Card */}
        {selectedEra && !spinning && (
          <div className="w-full p-4 rounded-2xl bg-[#0D0B0C]/90 border border-[#FF334B]/50 text-center space-y-1.5 animate-in fade-in zoom-in duration-300">
            <span className="text-2xl">{selectedEra.emoji}</span>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              {selectedEra.title}
            </h3>
            <p className="text-[11px] uppercase font-mono tracking-widest text-[#FF334B]">
              {selectedEra.tagline}
            </p>
            <p className="text-xs text-[#E8E1E5] leading-relaxed pt-1">
              {selectedEra.vibeText}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}