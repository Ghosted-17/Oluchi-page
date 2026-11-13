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

const BIRTHDAY_AFFIRMATIONS = [
  {
    tag: 'Level 19',
    text: 'Nineteen looks exceptionally good on you. Another year of unmatched energy, elite style, and legendary core memories.',
    author: 'Official Birthday Directive',
  },
  {
    tag: 'Main Character Milestone',
    text: 'Today the entire multiverse revolves around you. Soak in all the love, eat the best food, and celebrate to the maximum.',
    author: 'Level 19 Status',
  },
  {
    tag: 'Elite Status',
    text: 'Entering year 19 with zero stress, maximum vibes, and the absolute best company. Have an unforgettable day!',
    author: 'Multiverse Milestone',
  },
];

export default function DailyAffirmation() {
  const [index, setIndex] = useState(0);
  const [isNewDay, setIsNewDay] = useState(false);
  const [birthdayActive, setBirthdayActive] = useState(false);

  useEffect(() => {
    // Check if 19th birthday takeover is active
    const isBday = localStorage.getItem('oluchi_birthday_active') === 'true';
    setBirthdayActive(isBday);

    const activeList = isBday ? BIRTHDAY_AFFIRMATIONS : AFFIRMATIONS;

    // Seed affirmation by calendar date so it stays consistent for the day
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('oluchi_affirmation_date');
    const savedIdx = localStorage.getItem('oluchi_affirmation_idx');

    if (savedDate === today && savedIdx !== null) {
      const parsedIdx = parseInt(savedIdx, 10);
      setIndex(parsedIdx < activeList.length ? parsedIdx : 0);
    } else {
      const dailyIdx = Math.floor(Math.random() * activeList.length);
      setIndex(dailyIdx);
      localStorage.setItem('oluchi_affirmation_date', today);
      localStorage.setItem('oluchi_affirmation_idx', dailyIdx.toString());
      setIsNewDay(true);
    }
  }, []);

  const activeList = birthdayActive ? BIRTHDAY_AFFIRMATIONS : AFFIRMATIONS;

  const handleManualShuffle = () => {
    const nextIdx = (index + 1) % activeList.length;
    setIndex(nextIdx);
    localStorage.setItem('oluchi_affirmation_idx', nextIdx.toString());
    fireMultiverseConfetti();
  };

  const current = activeList[index] || activeList[0];

  return (
    <section className="w-full max-w-2xl px-4 py-10 relative z-10">
      <div className={`relative rounded-3xl bg-[#1A1618]/90 border ${birthdayActive ? 'border-[#D4AF37]/50 shadow-[0_0_35px_rgba(212,175,55,0.2)]' : 'border-[#FF334B]/40 shadow-[0_0_35px_rgba(255,51,75,0.15)]'} p-6 sm:p-8 backdrop-blur-md overflow-hidden text-center group`}>
        {/* Ambient Top Glow */}
        <div className={`absolute -top-12 left-1/2 -translate-x-1/2 w-40 h-40 ${birthdayActive ? 'bg-[#D4AF37]/20' : 'bg-[#FF334B]/20'} rounded-full blur-2xl pointer-events-none`} />

        <div className="flex items-center justify-between mb-4">
          <span className={`text-[11px] font-mono uppercase tracking-widest ${birthdayActive ? 'text-[#D4AF37] bg-[#D4AF37]/10 border-[#D4AF37]/30' : 'text-[#FF334B] bg-[#FF334B]/10 border-[#FF334B]/30'} px-3 py-1 rounded-full border font-bold shadow-sm`}>
            {birthdayActive ? '👑 Level 19 Special' : '✨ Daily Affirmation'}
          </span>
          <button
            type="button"
            onClick={handleManualShuffle}
            className={`text-[11px] font-mono text-[#D1CBD0] ${birthdayActive ? 'hover:text-[#D4AF37]' : 'hover:text-[#FF334B]'} transition-colors flex items-center gap-1 cursor-pointer`}
            title="Get another reminder"
          >
            New vibe ↺
          </button>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] my-3">
          &ldquo;{current.text}&rdquo;
        </h3>

        <div className="pt-2 flex items-center justify-center gap-2">
          <span className={`h-[1px] w-6 ${birthdayActive ? 'bg-[#D4AF37]/40' : 'bg-[#FF334B]/40'}`} />
          <span className={`text-xs font-mono uppercase tracking-widest ${birthdayActive ? 'text-[#D4AF37]' : 'text-[#FF334B]'} font-semibold`}>
            {current.tag} • {current.author}
          </span>
          <span className={`h-[1px] w-6 ${birthdayActive ? 'bg-[#D4AF37]/40' : 'bg-[#FF334B]/40'}`} />
        </div>
      </div>
    </section>
  );
}