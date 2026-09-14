'use client';

import React, { useState, useEffect } from 'react';

interface Song {
  title: string;
  type: 'track' | 'album';
  spotifyId: string;
}

interface Artist {
  name: string;
  subtitle: string;
  songs: Song[];
}

const ARTISTS: Artist[] = [
  {
    name: 'SZA',
    subtitle: 'Vibes, R&B & Raw Truth',
    songs: [
      { title: 'Crybaby', type: 'track', spotifyId: '1g7pFO1WtclKCuIQiS8sNM' },
      { title: 'Snooze', type: 'track', spotifyId: '4iZ4pt7kvcaH6Yo8UoZ4s2' },
      { title: 'Open Arms', type: 'track', spotifyId: '0xaFw2zDYf1rIJWl2dXiSF' },
    ],
  },
  {
    name: 'Ariana Grande',
    subtitle: 'Eternal Sunshine Era',
    songs: [
      { title: 'Kiss Me', type: 'track', spotifyId: '0lok0VDJn0zRvHLBCITSSw' },
      { title: 'Hate That I Made You Love Me', type: 'track', spotifyId: '20jbSiX29FDX4oQxBXyUEi' },
    ],
  },
  {
    name: 'Olivia Dean',
    subtitle: 'Soulful & Nostalgic',
    songs: [
      { title: 'Lady Lady', type: 'track', spotifyId: '2dmBAIjIfisvCG7G9YEh0g' },
      { title: 'So Easy (To Fall In Love)', type: 'track', spotifyId: '6sGIMrtIzQjdzNndVxe397' },
    ],
  },
  {
    name: 'Sienna Spiro',
    subtitle: 'Pure Vocals & Heartbreak',
    songs: [
      { title: 'Pure', type: 'track', spotifyId: '31IKMjvv6Oskp4hjGVeYsT' },
    ],
  },
  {
    name: 'Mavo',
    subtitle: 'New Wave Melodies',
    songs: [
      { title: 'Superwoman', type: 'track', spotifyId: '46x0AxDuBz6vcI0rbm8QHV' },
      { title: 'Ice Cream', type: 'track', spotifyId: '16TR0AiDrZRV9TFOXBcSE9' },
    ],
  },
  {
    name: 'Asake',
    subtitle: 'Street Energy & Chants',
    songs: [
      { title: 'WA', type: 'track', spotifyId: '5KX0YeCNKaOc3XhhDHi3mI' },
      { title: 'MCBH', type: 'track', spotifyId: '36PS8XCemqmPvigIL8S40B' },
      { title: 'Forgiveness', type: 'track', spotifyId: '5u4rozuOBse9MgrAzGspQy' },
      { title: 'Introduction', type: 'track', spotifyId: '4XDAismaOMDkVgVW5eQSfk' },
    ],
  },
];

function ArtistCard({ artist, cardIndex }: { artist: Artist; cardIndex: number }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slideshow set to 30 seconds matching Spotify's preview length
  useEffect(() => {
    if (artist.songs.length <= 1) return;

    const staggerOffset = (cardIndex % 3) * 4000;
    let interval: NodeJS.Timeout;

    const timer = setTimeout(() => {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % artist.songs.length);
      }, 60000); // 1 minute
    }, staggerOffset);

    return () => {
      clearTimeout(timer);
      if (interval) clearInterval(interval);
    };
  }, [artist.songs.length, cardIndex]);

  const activeSong = artist.songs[currentIndex];

  return (
    <div className="flex flex-col justify-between bg-[#1A1618] border border-[#2E2226] hover:border-[#FF334B]/50 rounded-3xl p-6 transition-all duration-300 shadow-2xl backdrop-blur-md">
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white tracking-wide">{artist.name}</h3>
            <p className="text-xs text-[#9E9398]">{artist.subtitle}</p>
          </div>
          <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-1 rounded-md bg-[#FF334B]/10 text-[#FF334B] border border-[#FF334B]/30">
            {currentIndex + 1} / {artist.songs.length}
          </span>
        </div>

        {/* Single Spotify Player dynamically using activeSong.spotifyId */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-black/40 border border-[#2E2226] h-[160px]">
          <iframe
            key={`${activeSong.type}-${activeSong.spotifyId}`}
            src={`https://open.spotify.com/embed/${activeSong.type}/${activeSong.spotifyId}?utm_source=generator&theme=0`}
            width="100%"
            height="160"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="eager"
            className="border-0 rounded-2xl w-full h-full"
          />
        </div>
      </div>

      {/* Manual Track Selection */}
      {artist.songs.length > 1 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {artist.songs.map((song, idx) => (
            <button
              key={song.title}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`text-xs px-3 py-1.5 rounded-full transition-all duration-200 border ${
                currentIndex === idx
                  ? 'bg-[#FF334B] text-white border-[#FF334B] shadow-md shadow-[#FF334B]/25 font-semibold'
                  : 'bg-black/30 text-[#9E9398] border-[#2E2226] hover:border-[#FF334B]/40 hover:text-[#F8F9FA]'
              }`}
            >
              {song.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ArtistsSection() {
  return (
    <section className="w-full max-w-7xl px-4 py-16">
      <div className="text-center mb-8 space-y-2 relative z-10">
        <span className="inline-block text-xs uppercase tracking-[0.35em] text-[#FF334B] font-extrabold px-3 py-1 rounded-full bg-black/60 border border-[#FF334B]/30 backdrop-blur-md shadow-lg">
          HEAVY ROTATION
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight drop-shadow-[0_3px_8px_rgba(0,0,0,0.95)]">
          Oluchi vibes with these artistes<span className="text-[#FF334B]">.</span>
        </h2>
        <p className="text-sm sm:text-base font-medium text-white/90 max-w-md mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
          The cards auto-cycle through her top picks every minute. Click play on any preview or pick a track manually.
        </p>
      </div>

      {/* 6 Artist Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ARTISTS.map((artist, index) => (
          <ArtistCard key={artist.name} artist={artist} cardIndex={index} />
        ))}
      </div>
    </section>
  );
}