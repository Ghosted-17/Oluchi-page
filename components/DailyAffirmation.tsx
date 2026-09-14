'use client';

import React, { useState, useEffect } from 'react';
import { fireMultiverseConfetti } from './ConfettiButton';

const AFFIRMATIONS = [
  {
    tag: 'Main Character',
    text: 'You don’t have to force anything. Your energy alone effortlessly commands whatever room you enter.',
    author: 'Reminder of the day',
  },
  {
    tag: 'Unmatched Presence',
    text: 'Nobody does life quite like you. Unapologetically funny, completely authentic, and effortlessly chill.',
    author: 'Multiverse Fact',
  },
  {
    tag: 'Locked In',
    text: 'Smart, ambitious, and capable of executing every single goal on your vision board. Take up space today.',
    author: 'Standard Operating Procedure',
  },
  {
    tag: 'Certified Rare',
    text: 'Loyal friend, elite taste in music, and impossible to replace. Protect your peace and keep thriving.',
    author: 'Universal Truth',
  },
  {
    tag: 'Pure Energy',
    text: 'Even on your quiet days, your impact is loud. Walk into today knowing you are someone people are genuinely lucky to know.',
    author: 'Today’s Truth',
  },
];

export default function DailyAffirmation() {
  const [index, setIndex] = useState(0);
  const [isNewDay, setIsNewDay] = useState(false);

  useEffect(() => {
    // Seed affirmation by calendar date so it stays consistent for the day
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('oluchi_affirmation_date');
    const savedIdx = localStorage.getItem('oluchi_affirmation_idx');

    if (savedDate === today && savedIdx !== null) {
      setIndex(parseInt(savedIdx, 10));
    } else {
      const dailyIdx = Math.floor(Math.random() * AFFIRMATIONS.length);
      setIndex(dailyIdx);
      localStorage.setItem('oluchi_affirmation_date', today);
      localStorage.setItem('oluchi_affirmation_idx', dailyIdx.toString());
      setIsNewDay(true);
    }
  }, []);

  const handleManualShuffle = () => {
    const nextIdx = (index + 1) % AFFIRMATIONS.length;
    setIndex(nextIdx);
    localStorage.setItem('oluchi_affirmation_idx', nextIdx.toString());
    fireMultiverseConfetti();
  };

  const current = AFFIRMATIONS[index];

  return (
    <section className="w-full max-w-2xl px-4 py-10 relative z-10">
      <div className="relative rounded-3xl bg-[#1A1618]/90 border border-[#FF334B]/40 p-6 sm:p-8 backdrop-blur-md shadow-[0_0_35px_rgba(255,51,75,0.15)] overflow-hidden text-center group">
        {/* Ambient Top Glow */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-40 h-40 bg-[#FF334B]/20 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#FF334B] bg-[#FF334B]/10 px-3 py-1 rounded-full border border-[#FF334B]/30 font-bold shadow-sm">
            ✨ Daily Affirmation
          </span>
          <button
            type="button"
            onClick={handleManualShuffle}
            className="text-[11px] font-mono text-[#D1CBD0] hover:text-[#FF334B] transition-colors flex items-center gap-1 cursor-pointer"
            title="Get another reminder"
          >
            New vibe ↺
          </button>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] my-3">
          &ldquo;{current.text}&rdquo;
        </h3>

        <div className="pt-2 flex items-center justify-center gap-2">
          <span className="h-[1px] w-6 bg-[#FF334B]/40" />
          <span className="text-xs font-mono uppercase tracking-widest text-[#FF334B] font-semibold">
            {current.tag} • {current.author}
          </span>
          <span className="h-[1px] w-6 bg-[#FF334B]/40" />
        </div>
      </div>
    </section>
  );
}