'use client';

import React, { useState } from 'react';
import ArtistsSection from '@/components/ArtistsSection';

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
      // { type: 'image', url: '/images/goofball-2.jpg' },
    ],
  },
  {
    id: 'dancer',
    title: 'Dancer & Creator',
    tagline: 'Spotlight & Rhythm',
    description: 'Moves on beat, lives on TikTok, and turns every room into a dance studio. Connect with her now to see her routines and creative content.',
    media: [
      { type: 'video', url: '/videos/dancer.mp4' },
      // { type: 'video', url: '/videos/dance-routine.mp4' },
    ],
  },
  {
    id: 'therapist',
    title: 'The Free Therapist',
    tagline: 'Calm, Safe & Honest',
    description: 'The late-night call, the one who actually listens and gives real talk when you need it.',
    media: [
      { type: 'video', url: 'https://assets.mixkit.co/videos/preview/mixkit-woman-sitting-on-a-balcony-at-sunset-42861-large.mp4' },
      // { type: 'image', url: '/images/therapist-chat.jpg' },
    ],
  },
  {
    id: 'academic',
    title: 'Serious & Academic',
    tagline: 'Locked In & Ambitious',
    description: 'Headphones on, high honors, and handles business with zero excuses.',
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80' },
      // { type: 'image', url: '/images/studying.jpg' },
    ],
  },
  {
    id: 'gentle',
    title: 'Soft & Gentle',
    tagline: 'Grounded & Peaceful',
    description: 'Quiet moments, soft aesthetic vibes, and simple appreciation for good days.',
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80' },
      // { type: 'image', url: '/images/soft-portrait.jpg' },
    ],
  },
];

const BARCA_IMAGES = [
  'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1000&q=80',
];

function FlippableBioCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      onClick={() => setIsFlipped((prev) => !prev)}
      className="w-full max-w-2xl mb-12 [perspective:1200px] cursor-pointer group"
    >
      <div
        className={`relative w-full transition-transform duration-700 [transform-style:preserve-3d] min-h-[220px] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* FRONT SIDE (Option 1) */}
        <div className="w-full h-full bg-[#1A1618] border border-[#2E2226] group-hover:border-[#FF334B]/50 transition-colors rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl text-center relative overflow-hidden [backface-visibility:hidden]">
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#FF334B]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#FF334B] bg-[#FF334B]/10 px-3 py-1 rounded-full border border-[#FF334B]/30">
              The Protagonist
            </span>
            <span className="text-[11px] font-mono text-[#9E9398] flex items-center gap-1 group-hover:text-[#FF334B] transition-colors">
              Tap to flip ↺
            </span>
          </div>

          <h2 className="text-2xl font-bold text-white mb-3">
            Behind The Multiverse
          </h2>

          <p className="text-[#D1CBD0] text-sm sm:text-base leading-relaxed">
            Equal parts calm energy and undeniable presence. Oluchi is the definition of effortlessly chill—someone who navigates life with good humor, quiet confidence, and an elite ear for music. Whether she is dialed in handling business or caught laughing uncontrollably at something completely unserious, every version of her brings the exact energy a room needs.
          </p>
        </div>

        {/* BACK SIDE (Option 2) */}
        <div className="absolute inset-0 w-full h-full bg-[#1A1618] border border-[#FF334B]/40 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl text-center overflow-hidden [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-[#FF334B]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#FF334B] bg-[#FF334B]/10 px-3 py-1 rounded-full border border-[#FF334B]/30">
              The Real Talk
            </span>
            <span className="text-[11px] font-mono text-[#9E9398] flex items-center gap-1 group-hover:text-[#FF334B] transition-colors">
              Tap to flip ↻
            </span>
          </div>

          <h2 className="text-2xl font-bold text-white mb-3">
            Pure Oluchi Energy
          </h2>

          <p className="text-[#D1CBD0] text-sm sm:text-base leading-relaxed">
            To know Oluchi is to witness someone who can switch from peaceful and unbothered to full-blown comedic chaos in three seconds flat. She runs on great melodies, late-night talks, and zero tolerance for unnecessary stress. A certified protagonist with a soundtrack for every mood.
          </p>
        </div>
      </div>
    </div>
  );
}

function Card({ card }: { card: VersionCard }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? card.media.length - 1 : prev - 1));
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
              onClick={prevSlide}
              aria-label="Previous slide"
              className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-[#FF334B] transition-colors cursor-pointer"
            >
              ‹
            </button>
            <button
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
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#FF334B] bg-[#FF334B]/10 px-2.5 py-1 rounded-full w-max border border-[#FF334B]/30 backdrop-blur-md">
          {card.tagline}
        </span>

        <h3 className="text-2xl font-bold text-white tracking-wide">
          {card.title}
        </h3>

        <p className="text-sm text-[#D1CBD0] line-clamp-3 leading-relaxed">
          {card.description}
        </p>
      </div>
    </div>
  );
}

function BarcaSection() {
  const [slide, setSlide] = useState(0);

  const prev = () => setSlide((s) => (s === 0 ? BARCA_IMAGES.length - 1 : s - 1));
  const next = () => setSlide((s) => (s === BARCA_IMAGES.length - 1 ? 0 : s + 1));

  return (
    <section className="w-full max-w-4xl px-4 py-16">
      <div className="text-center mb-8 space-y-2">
        <span className="text-xs uppercase tracking-[0.3em] text-[#FF334B] font-semibold">
          Passions & Hobbies
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          Other things Oluchi loves<span className="text-[#FF334B]">.</span>
        </h2>
      </div>

      <div className="bg-[#1A1618] border border-[#2E2226] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-center shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#004D98]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#A50044]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative w-full md:w-[320px] h-[380px] rounded-2xl overflow-hidden border border-[#2E2226] flex-shrink-0 bg-black/40 group">
          <img
            key={BARCA_IMAGES[slide]}
            src={BARCA_IMAGES[slide]}
            alt="Oluchi in Barcelona jersey"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

          <div className="absolute bottom-4 inset-x-4 flex items-center justify-between z-10">
            <div className="flex gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
              {BARCA_IMAGES.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === slide ? 'w-5 bg-[#FF334B]' : 'w-1.5 bg-white/40'
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-1.5">
              <button
                onClick={prev}
                aria-label="Previous Barca image"
                className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-[#FF334B] transition-colors cursor-pointer"
              >
                ‹
              </button>
              <button
                onClick={next}
                aria-label="Next Barca image"
                className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-[#FF334B] transition-colors cursor-pointer"
              >
                ›
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-4 text-center md:text-left z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#004D98]/20 to-[#A50044]/20 border border-[#A50044]/30 text-xs font-mono tracking-widest text-[#FF334B]">
            <span>🔵🔴</span>
            <span>FC BARCELONA</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
            Oluchi is a true Barcelona fan
          </h3>

          <p className="text-[#D1CBD0] text-sm sm:text-base leading-relaxed">
            When match day rolls around, allegiance isn't up for debate. Reps the Blaugrana colors with pure loyalty—win, draw, or masterclass. You will always catch her locked into the ninety minutes, repping the kit with pride.
          </p>

          <div className="pt-2 flex flex-wrap gap-2 justify-center md:justify-start">
            <span className="text-xs px-3 py-1 rounded-full bg-black/40 border border-[#2E2226] text-[#9E9398]">
              #ViscaElBarça
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-black/40 border border-[#2E2226] text-[#9E9398]">
              #Culers
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-black/40 border border-[#2E2226] text-[#9E9398]">
              #MatchDayEnergy
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0D0B0C] text-[#F8F9FA] px-4 py-12 md:px-12 flex flex-col items-center relative overflow-hidden">
      {/* Velvet Noir Ambient Spotlights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#E02138]/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-[40%] right-[-10%] w-[450px] h-[450px] bg-[#FF334B]/5 blur-[150px] pointer-events-none rounded-full" />
      {/* Header */}
      <header className="max-w-4xl text-center mb-10 space-y-3">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          🎀Oluchi's Multiverse🎀
        </h1>
        <p className="text-[#9E9398] text-sm md:text-base max-w-lg mx-auto">
          One person, multiple eras. Swipe through to see every side of the story.
        </p>
      </header>

      {/* Flippable Info Card */}
      <FlippableBioCard />

      {/* Horizontal Scroll Deck */}
      <div className="w-full max-w-7xl overflow-x-auto no-scrollbar pb-8 pt-4">
        <div className="flex gap-6 w-max px-4 snap-x snap-mandatory">
          {VERSIONS.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      </div>

      {/* Other things Oluchi loves (Barca Slideshow Section) */}
      <BarcaSection />

      {/* Heavy Rotation Music Section */}
      <ArtistsSection />

      {/* Social Links Section */}
      <footer className="mt-12 flex flex-col sm:flex-row items-center gap-4">
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
    </main>
  );
}