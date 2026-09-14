'use client';

import React, { useState, useEffect } from 'react';

export interface PassionCardData {
  id: string;
  category: string;
  badgeEmoji: string;
  title: string;
  subtitle: string;
  description: string;
  media: { type: 'image' | 'video'; url: string }[];
  tags: string[];
  isBarca?: boolean;
}

const PASSIONS: PassionCardData[] = [
  {
    id: 'barca',
    category: 'Blaugrana Loyalty',
    badgeEmoji: '🔵🔴',
    title: 'FC Barcelona Enthusiast',
    subtitle: 'Matchday Energy & Unwavering Support',
    description:
      'When matchday rolls around, allegiance is never up for debate. Reps the Blaugrana colors with pride—win, draw, or pure masterclass.',
    media: [
      {
        type: 'image',
        url: '/images/barca/barca_pic.jpg',
      },
      {
        type: 'video',
        url: '/videos/barca/barca_vid.mp4',
      },
    ],
    tags: ['#ViscaElBarça', '#Culers', '#MatchDayImmunity'],
    isBarca: true,
  },
  {
    id: 'sports-fest',
    category: 'Champion Energy',
    badgeEmoji: '🏆',
    title: 'Sports Fest Hype Woman',
    subtitle: 'Lifting The Trophy & The Squad',
    description:
      'Whether competing or celebrating, her presence steals the entire show.',
    media: [
      {
        type: 'image',
        url: '/images/loves/trophy.jpg',      },
    ],
    tags: ['#MVPStatus', '#TrophyVibes', '#SquadCaptain'],
  },
  {
    id: 'chef',
    category: 'Culinary Arts',
    badgeEmoji: '🍳',
    title: 'Executive Chef Oluchi',
    subtitle: 'Midnight Cravings & Kitchen Experiments',
    description:
      'Making meals look like five-star restaurant tastings. Equal parts comfort food enthusiast and culinary mastermind when the mood strikes.',
    media: [
      {
        type: 'video',
        url: '/videos/chef.mp4',      
      },
      {
        type: 'video',
        url: '/videos/smooth.mp4',
      },
      {
        type: 'video',
        url: '/videos/scarf.mp4',
      },
    ],
    tags: ['#ChefOluchi', '#MidnightSnackMaster', '#TasteTester'],
  },
  {
    id: 'vocals',
    category: 'Melodic Soul',
    badgeEmoji: '🎤',
    title: 'The Private Concert Headliner',
    subtitle: 'Acoustic Harmonies & Car Rides',
    description:
      'Catching melodies effortlessly, hitting every high note in shower acoustics, and always owning the aux cord with an impeccable ear for sound.',
    media: [
      {
        type: 'video',
        url: '/videos/burna.mp4',
      },
      {
        type: 'video',
        url: '/videos/sza.mp4',
      }
    ],
    tags: ['#MainVocalist', '#AuxDictator', '#SoulfulVibes'],
  },
];

function PassionCardItem({
  card,
  onUnlockEasterEgg,
}: {
  card: PassionCardData;
  onUnlockEasterEgg: () => void;
}) {
  const [currentIdx, setCurrentIdx] = useState(0);

  const activeMedia = card.media[currentIdx] || card.media[0];

  // If the active item is an image and there are other media items, move to next after exactly 4 seconds
  useEffect(() => {
    if (card.media.length <= 1) return;

    if (activeMedia.type === 'image') {
      const timer = setTimeout(() => {
        setCurrentIdx((prev) => (prev + 1) % card.media.length);
      }, 4000); // exactly 4 seconds for pictures

      return () => clearTimeout(timer);
    }
  }, [activeMedia, card.media.length]);

  // When a video ends, advance to the next slide (back to the picture)
  const handleVideoEnded = () => {
    if (card.media.length > 1) {
      setCurrentIdx((prev) => (prev + 1) % card.media.length);
    }
  };

  const prevMedia = () => {
    setCurrentIdx((prev) => (prev === 0 ? card.media.length - 1 : prev - 1));
  };

  const nextMedia = () => {
    setCurrentIdx((prev) => (prev === card.media.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-[310px] sm:w-[350px] h-[520px] rounded-3xl overflow-hidden border border-[#2E2226] bg-[#1A1618] snap-center group hover:border-[#FF334B]/60 transition-all duration-300 shadow-2xl flex-shrink-0 flex flex-col justify-end">
      {/* Media Rendering */}
      {activeMedia.type === 'video' ? (
        <video
          key={activeMedia.url}
          src={activeMedia.url}
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnded}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
        />
      ) : (
        <img
          key={activeMedia.url}
          src={activeMedia.url}
          alt={card.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
        />
      )}

      {/* Dark Vignettes */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B0C] via-[#0D0B0C]/50 to-transparent pointer-events-none" />

      {/* Media Slider Controls */}
      {card.media.length > 1 && (
        <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-between">
          <div className="flex gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
            {card.media.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIdx ? 'w-5 bg-[#FF334B]' : 'w-1.5 bg-white/40'
                }`}
              />
            ))}
          </div>

          <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevMedia();
              }}
              className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-[#FF334B] transition-colors cursor-pointer"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextMedia();
              }}
              className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-[#FF334B] transition-colors cursor-pointer"
            >
              ›
            </button>
          </div>
        </div>
      )}

      {/* Card Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-6 space-y-2">
        <div className="flex items-center gap-2">
          {card.isBarca ? (
            <button
              type="button"
              onClick={onUnlockEasterEgg}
              className="text-[11px] font-mono uppercase tracking-widest text-[#FF334B] bg-gradient-to-r from-[#004D98]/40 to-[#A50044]/40 px-2.5 py-1 rounded-full border border-[#EDBB00]/50 hover:border-[#EDBB00] transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
              title="Click to unlock VIP pass!"
            >
              <span>{card.badgeEmoji}</span>
              <span>{card.category}</span>
              <span className="text-[10px] text-[#EDBB00] font-bold">✨ TAP</span>
            </button>
          ) : (
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#FF334B] bg-[#FF334B]/10 px-2.5 py-1 rounded-full border border-[#FF334B]/30 backdrop-blur-md">
              {card.badgeEmoji} {card.category}
            </span>
          )}
        </div>

        <h3 className="text-2xl font-bold text-white tracking-wide">
          {card.title}
        </h3>

        <p className="text-xs text-[#FF334B] font-mono">
          {card.subtitle}
        </p>

        <p className="text-sm text-[#D1CBD0] line-clamp-3 leading-relaxed">
          {card.description}
        </p>

        <div className="pt-2 flex flex-wrap gap-1.5">
          {card.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/40 border border-[#2E2226] text-[#9E9398]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PassionsDeck({
  onUnlockEasterEgg,
}: {
  onUnlockEasterEgg: () => void;
}) {
  const [barcaUnlocked, setBarcaUnlocked] = useState(false);

  const handleBarcaTrigger = () => {
    setBarcaUnlocked(true);
    onUnlockEasterEgg();
  };

  return (
    <section className="w-full max-w-7xl px-4 py-16">
      <div className="text-center mb-8 space-y-2 relative z-10">
        <span className="inline-block text-xs uppercase tracking-[0.35em] text-[#FF334B] font-extrabold px-3 py-1 rounded-full bg-black/60 border border-[#FF334B]/30 backdrop-blur-md shadow-lg">
          Passions & Hobbies
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight drop-shadow-[0_3px_8px_rgba(0,0,0,0.95)]">
          Other Things Oluchi Loves<span className="text-[#FF334B]">.</span>
        </h2>
        <p className="text-sm sm:text-base font-medium text-white/90 max-w-md mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
          From the pitch and trophies to late-night culinary creations and acoustic soul.
        </p>
      </div>

      {/* Barça Easter Egg VIP Banner */}
      {barcaUnlocked && (
        <div className="max-w-2xl mx-auto mb-8 p-4 rounded-2xl bg-gradient-to-r from-[#004D98]/40 via-[#A50044]/40 to-[#004D98]/40 border border-[#EDBB00]/60 backdrop-blur-md text-center animate-in fade-in zoom-in duration-300">
          <p className="text-xs font-mono uppercase tracking-widest text-[#EDBB00] font-bold">
            ★ Official Culers VIP Pass Unlocked ★
          </p>
          <p className="text-sm font-semibold text-white mt-1">
            Oluchi • Lifetime Honorary Barça Member #10 🔵🔴
          </p>
          <p className="text-xs text-[#E0D0D5] mt-0.5">
            Perks: Unlimited aux cord rights, zero stress tolerance, and matchday immunity.
          </p>
        </div>
      )}

      {/* Horizontal Carousel */}
      <div className="w-full overflow-x-auto no-scrollbar pb-6 pt-2">
        <div className="flex gap-6 w-max px-2 snap-x snap-mandatory">
          {PASSIONS.map((card) => (
            <PassionCardItem
              key={card.id}
              card={card}
              onUnlockEasterEgg={handleBarcaTrigger}
            />
          ))}
        </div>
      </div>
    </section>
  );
}