'use client';

import React, { useState, useEffect } from 'react';
import ArtistsSection from '@/components/ArtistsSection';
import ConfettiButton, { fireMultiverseConfetti } from '@/components/ConfettiButton';
import RouletteWheel from '@/components/RouletteWheel';
import PassionsDeck from '@/components/PassionsDeck';
import AmbientBackground from '@/components/AmbientBackground';
import DailyAffirmation from '@/components/DailyAffirmation';
import ScratchCard from '@/components/ScratchCard';
import BirthdayPopup from '@/components/BirthdayPopup';
import PasscodeGate from '@/components/PasscodeGate';

interface MediaItem {
  type: 'image' | 'video';
  url: string;
}

interface VersionCard {
  id: string;
  title: string;
  tagline: string;
  description: string;
  media: MediaItem[];
}

const VERSIONS: VersionCard[] = [
  {
    id: 'fun',
    title: 'The Goofball',
    tagline: 'Pure Unfiltered Chaos',
    description: 'Always laughing, cracking jokes, and impossible to take a serious photo with.',
    media: [
      { type: 'video', url: '/videos/goofball.mp4' },
    ],
  },
  {
    id: 'dancer',
    title: 'Dancer & Creator',
    tagline: 'Spotlight & Rhythm',
    description: 'Moves on beat, lives on TikTok, and turns every room into a dance studio. Connect with her now to see her routines and creative content.',
    media: [
      { type: 'video', url: '/videos/dancer.mp4' },
      { type: 'video', url: '/videos/political.mp4' },
      { type: 'video', url: '/videos/dancer3.mp4' },
    ],
  },
  {
    id: 'therapist',
    title: 'The Free Therapist',
    tagline: 'Calm, Safe & Honest',
    description: 'The late-night call, the one who actually listens and gives real talk when you need it.',
    media: [
      { type: 'image', url: '/images/loves/cheeky.jpg' },
    ],
  },
  {
    id: 'academic',
    title: 'Serious & Academic',
    tagline: 'Locked In & Ambitious',
    description: 'Headphones on, high honors, and handles business with zero excuses.',
    media: [
      { type: 'image', url: '/images/loves/no_face.jpg' },
    ],
  },
  {
    id: 'gentle',
    title: 'Soft & Gentle',
    tagline: 'Grounded & Peaceful',
    description: 'Quiet moments, soft aesthetic vibes, and simple appreciation for good days.',
    media: [
      { type: 'image', url: '/images/loves/happy_easter.jpg' },
    ],
  },
];

function FlippableBioCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      onClick={() => setIsFlipped((prev) => !prev)}
      className="w-full max-w-2xl mb-8 [perspective:1200px] cursor-pointer group relative z-10"
    >
      <div
        className={`relative w-full transition-transform duration-700 [transform-style:preserve-3d] min-h-[220px] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* FRONT SIDE */}
        <div className="w-full h-full bg-[#1A1618]/90 border border-[#2E2226] group-hover:border-[#FF334B]/50 transition-colors rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl text-center relative overflow-hidden [backface-visibility:hidden]">
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#FF334B]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#FF334B] bg-[#FF334B]/10 px-3 py-1 rounded-full border border-[#FF334B]/30 font-bold">
              The Protagonist
            </span>
            <span className="text-[11px] font-mono text-[#D1CBD0] flex items-center gap-1 group-hover:text-[#FF334B] transition-colors">
              Tap to flip ↺
            </span>
          </div>

          <h2 className="text-2xl font-extrabold text-white mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Behind The Multiverse
          </h2>

          <p className="text-[#E8E1E5] text-sm sm:text-base leading-relaxed">
            Equal parts calm energy and undeniable presence. Oluchi is the definition of effortlessly chill—someone who navigates life with good humor, quiet confidence, and an elite ear for music. Whether she is dialed in handling business or caught laughing uncontrollably at something completely unserious, every version of her brings the exact energy a room needs.
          </p>
        </div>

        {/* BACK SIDE */}
        <div className="absolute inset-0 w-full h-full bg-[#1A1618]/90 border border-[#FF334B]/40 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl text-center overflow-hidden [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-[#FF334B]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#FF334B] bg-[#FF334B]/10 px-3 py-1 rounded-full border border-[#FF334B]/30 font-bold">
              The Real Talk
            </span>
            <span className="text-[11px] font-mono text-[#D1CBD0] flex items-center gap-1 group-hover:text-[#FF334B] transition-colors">
              Tap to flip ↻
            </span>
          </div>

          <h2 className="text-2xl font-extrabold text-white mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Pure Oluchi Energy
          </h2>

          <p className="text-[#E8E1E5] text-sm sm:text-base leading-relaxed">
            To know Oluchi is to witness someone who can switch from peaceful and unbothered to full-blown comedic chaos in three seconds flat. She runs on great melodies, late-night talks, and zero tolerance for unnecessary stress. A certified protagonist with a soundtrack for every mood.
          </p>
        </div>
      </div>
    </div>
  );
}

function Card({ card }: { card: VersionCard }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Use 15 seconds for dancer, 4.5 seconds for other cards
  const slideDuration = card.id === 'dancer' ? 15000 : 4500;

  React.useEffect(() => {
    if (card.media.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === card.media.length - 1 ? 0 : prev + 1));
    }, slideDuration);

    return () => clearInterval(timer);
  }, [card.media.length, slideDuration]);

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === card.media.length - 1 ? 0 : prev - 1));
  };

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === card.media.length - 1 ? 0 : prev + 1));
  };

  const activeMedia = card.media[currentIndex];

  return (
    <div className="relative w-[300px] sm:w-[340px] h-[520px] rounded-3xl overflow-hidden border border-[#2E2226] bg-[#1A1618] snap-center group hover:border-[#FF334B]/60 transition-all duration-300 shadow-2xl flex-shrink-0 flex flex-col justify-end">
      {activeMedia?.type === 'video' ? (
        <video
          key={activeMedia.url}
          src={activeMedia.url}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
        />
      ) : (
        <img
          key={activeMedia?.url}
          src={activeMedia?.url}
          alt={card.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B0C] via-[#0D0B0C]/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />

      {card.media.length > 1 && (
        <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-between">
          <div className="flex gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
            {card.media.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'w-5 bg-[#FF334B]' : 'w-1.5 bg-white/40'
                }`}
              />
            ))}
          </div>

          <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous slide"
              className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-[#FF334B] transition-colors cursor-pointer"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next slide"
              className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-[#FF334B] transition-colors cursor-pointer"
            >
              ›
            </button>
          </div>
        </div>
      )}

      <div className="relative z-10 h-full flex flex-col justify-end p-6 space-y-2 pointer-events-none">
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#FF334B] bg-[#FF334B]/10 px-2.5 py-1 rounded-full w-max border border-[#FF334B]/30 backdrop-blur-md font-bold">
          {card.tagline}
        </span>

        <h3 className="text-2xl font-extrabold text-white tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          {card.title}
        </h3>

        <p className="text-sm text-[#E8E1E5] line-clamp-3 leading-relaxed">
          {card.description}
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  const [ribbonClicks, setRibbonClicks] = useState(0);
  const [blaugranaMode, setBlaugranaMode] = useState(false);
  const [birthdayActive, setBirthdayActive] = useState(false);

  useEffect(() => {
    // Check if the 24-hour November 13th birthday takeover is live
    const isBday = localStorage.getItem('oluchi_birthday_active') === 'true';
    setBirthdayActive(isBday);
  }, []);

  const handleRibbonTap = () => {
    const nextCount = ribbonClicks + 1;
    if (nextCount >= 5) {
      setBlaugranaMode(true);
      fireMultiverseConfetti();
      setRibbonClicks(0);
      setTimeout(() => setBlaugranaMode(false), 7000);
    } else {
      setRibbonClicks(nextCount);
      setTimeout(() => setRibbonClicks(0), 2500);
    }
  };

  return (
    <PasscodeGate>
      <main className={`min-h-screen ${blaugranaMode ? 'bg-[#060D1E]' : birthdayActive ? 'bg-[#120E10]' : 'bg-[#0D0B0C]'} text-[#F8F9FA] px-4 py-12 md:px-12 flex flex-col items-center relative overflow-hidden transition-colors duration-1000`}>
        {/* Background Video Slideshow */}
        <AmbientBackground />

        {/* Secret Birthday Trigger Popup */}
        <BirthdayPopup />

        {/* Velvet Noir & Birthday Gold Spotlights */}
        {blaugranaMode ? (
          <>
            <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-[#004D98]/30 blur-[130px] pointer-events-none rounded-full" />
            <div className="absolute top-10 right-1/4 w-[500px] h-[400px] bg-[#A50044]/35 blur-[130px] pointer-events-none rounded-full" />
          </>
        ) : birthdayActive ? (
          <>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#D4AF37]/15 blur-[140px] pointer-events-none rounded-full" />
            <div className="absolute top-[40%] right-[-10%] w-[450px] h-[450px] bg-[#FF334B]/10 blur-[150px] pointer-events-none rounded-full" />
          </>
        ) : (
          <>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#E02138]/10 blur-[140px] pointer-events-none rounded-full" />
            <div className="absolute top-[40%] right-[-10%] w-[450px] h-[450px] bg-[#FF334B]/5 blur-[150px] pointer-events-none rounded-full" />
          </>
        )}

        {/* Culers Easter Egg Banner */}
        {blaugranaMode && (
          <div className="fixed top-6 z-50 px-4 py-2 rounded-full bg-gradient-to-r from-[#004D98] to-[#A50044] text-white text-xs font-mono font-bold tracking-widest uppercase shadow-2xl border border-white/20 animate-bounce">
            🔵🔴 Secret Culers Mode Unlocked 🔵🔴
          </div>
        )}

        {/* Header */}
        <header className="max-w-4xl text-center mb-10 space-y-3 relative z-10">
          {birthdayActive && (
            <span className="inline-block text-[11px] font-mono uppercase tracking-[0.3em] text-[#D4AF37] bg-[#D4AF37]/10 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 font-bold shadow-lg animate-pulse">
              ✨ Official Level 19 Takeover ✨
            </span>
          )}
          <h1 className="text-4xl md:text-5xl font-black tracking-tight select-none text-white drop-shadow-[0_3px_8px_rgba(0,0,0,0.9)]">
            <span
              onClick={handleRibbonTap}
              className="cursor-pointer inline-block hover:scale-125 active:scale-95 transition-transform mr-1"
              title="Tap me"
            >
              🎀
            </span>
            Oluchi&apos;s Multiverse
            <span
              onClick={handleRibbonTap}
              className="cursor-pointer inline-block hover:scale-125 active:scale-95 transition-transform ml-1"
              title="Tap me"
            >
              🎀
            </span>
          </h1>
          <p className="text-[#F0EAEF] text-sm md:text-base max-w-lg mx-auto font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {birthdayActive ? 'Celebrating 19 years of unmatched energy and elite vibes. Happy Birthday!' : 'One person, multiple eras. Swipe through to see every side of the story.'}
          </p>
        </header>

        {/* Flippable Info Card */}
        <FlippableBioCard />

        {/* Daily Affirmation Card */}
        <DailyAffirmation />

        {/* Multiverse Eras Header & Carousel */}
        <section className="w-full max-w-7xl px-4 py-8 relative z-10">
          <div className="text-center mb-8 space-y-2">
            <span className="inline-block text-xs uppercase tracking-[0.35em] text-[#FF334B] font-extrabold px-3.5 py-1 rounded-full bg-black/70 border border-[#FF334B]/40 backdrop-blur-md shadow-lg">
              THE ERAS & IDENTITIES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-[0_3px_8px_rgba(0,0,0,0.95)]">
              The Multiverse of Oluchi<span className="text-[#FF334B]">.</span>
            </h2>
            <p className="text-sm sm:text-base font-medium text-white/90 max-w-md mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
              Swipe sideways to explore every distinct version, mood, and era.
            </p>
          </div>

          {/* Horizontal Scroll Deck */}
          <div className="w-full overflow-x-auto no-scrollbar pb-6 pt-2">
            <div className="flex gap-6 w-max px-2 snap-x snap-mandatory">
              {VERSIONS.map((card) => (
                <Card key={card.id} card={card} />
              ))}
            </div>
          </div>
        </section>

        {/* Daily Alignment Roulette Wheel */}
        <RouletteWheel />

        {/* Secret Scratch Card */}
        <ScratchCard />

        {/* Passions Carousel */}
        <PassionsDeck onUnlockEasterEgg={() => {
          setBlaugranaMode(true);
          fireMultiverseConfetti();
          setTimeout(() => setBlaugranaMode(false), 8000);
        }} />

        {/* Music Section */}
        <ArtistsSection />

        {/* Social Links */}
        <footer className="mt-12 flex flex-col sm:flex-row items-center gap-4 relative z-10">
          <a
            href="https://www.tiktok.com/@typical_oluchi"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-full bg-[#1A1618] border border-[#2E2226] hover:border-[#FF334B] hover:text-[#FF334B] transition-all text-sm font-medium tracking-wide flex items-center gap-2 shadow-lg"
          >
            <span>TikTok</span>
            <span className="text-xs text-[#9E9398]">↗</span>
          </a>

          <a
            href="https://www.snapchat.com/add/typical_oluchi"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-full bg-[#1A1618] border border-[#2E2226] hover:border-[#FF334B] hover:text-[#FF334B] transition-all text-sm font-medium tracking-wide flex items-center gap-2 shadow-lg"
          >
            <span>Snapchat</span>
            <span className="text-xs text-[#9E9398]">↗</span>
          </a>
        </footer>

        {/* Floating Confetti Cannon */}
        <ConfettiButton />
      </main>
    </PasscodeGate>
  );
}