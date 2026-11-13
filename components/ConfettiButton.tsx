'use client';

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

export function fireMultiverseConfetti() {
  const shapes = ['🎀', '⚽', '🍒', '🏆', '✨', '🎧'];
  
  const isBday = typeof window !== 'undefined' && localStorage.getItem('oluchi_birthday_active') === 'true';
  const colors = isBday ? ['#D4AF37', '#FFD700', '#FF334B', '#FFE066', '#FFFFFF'] : undefined;

  // Left burst
  confetti({
    particleCount: 35,
    spread: 70,
    origin: { x: 0.2, y: 0.8 },
    shapes: shapes.map((shape) => confetti.shapeFromText({ text: shape, scalar: 2 })),
    scalar: 2,
    ticks: 200,
    ...(colors && { colors }),
  });

  // Right burst
  confetti({
    particleCount: 35,
    spread: 70,
    origin: { x: 0.8, y: 0.8 },
    shapes: shapes.map((shape) => confetti.shapeFromText({ text: shape, scalar: 2 })),
    scalar: 2,
    ticks: 200,
    ...(colors && { colors }),
  });
}

export default function ConfettiButton() {
  const [pressed, setPressed] = useState(false);
  const [birthdayActive, setBirthdayActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [requestText, setRequestText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const lastTapRef = useRef<number>(0);

  useEffect(() => {
    const isBday = localStorage.getItem('oluchi_birthday_active') === 'true';
    setBirthdayActive(isBday);

    const sent = localStorage.getItem('oluchi_request_sent') === 'true';
    setRequestSent(sent);
  }, []);

  const handleClick = () => {
    setPressed(true);
    setTimeout(() => setPressed(false), 300);

    const now = Date.now();
    const timeSinceLastTap = now - lastTapRef.current;

    // Check if it's a double tap (within 400ms) AND she hasn't already sent her request yet
    if (timeSinceLastTap < 400 && !requestSent) {
      setShowModal(true);
      return;
    }

    lastTapRef.current = now;

    // Normal single-tap confetti behavior
    fireMultiverseConfetti();
  };

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestText.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/birthday-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestText }),
      });

      if (res.ok) {
        localStorage.setItem('oluchi_request_sent', 'true');
        setRequestSent(true);
        setShowModal(false);
        fireMultiverseConfetti();
      } else {
        alert('Something went wrong. Try again!');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to send request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          type="button"
          onClick={handleClick}
          aria-label="Celebrate Oluchi"
          className={`group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#1A1618] border ${
            birthdayActive
              ? 'border-[#D4AF37]/75 shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(212,175,55,0.7)] hover:border-[#D4AF37]'
              : 'border-[#FF334B]/60 shadow-[0_0_25px_rgba(255,51,75,0.4)] hover:shadow-[0_0_35px_rgba(255,51,75,0.7)] hover:border-[#FF334B]'
          } hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer ${
            pressed ? 'scale-90' : ''
          }`}
        >
          {/* Subtle pulsing background glow */}
          <span
            className={`absolute inset-0 rounded-full ${
              birthdayActive ? 'bg-[#D4AF37]/20' : 'bg-[#FF334B]/20'
            } animate-ping pointer-events-none`}
          />

          {/* Ribbon Emoji */}
          <span className="text-2xl transition-transform duration-300 group-hover:rotate-12 select-none">
            🎀
          </span>

          {/* Hover Tooltip */}
          <span className="absolute right-16 px-3 py-1.5 rounded-xl bg-[#1A1618] border border-[#2E2226] text-[#F8F9FA] text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl">
            {requestSent ? 'Tap for hype ✨' : 'Tap for hype • Double-tap for secret 🤫'}
          </span>
        </button>
      </div>

      {/* Secret Request Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-md rounded-3xl bg-[#1A1618] border border-[#D4AF37] p-8 text-center space-y-4 shadow-[0_0_50px_rgba(212,175,55,0.3)] overflow-hidden">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

            <span className="text-3xl select-none">🤫✨</span>

            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
              What do you want for today that I can cover, you know I&apos;m not rich😂
            </h3>

            <form onSubmit={handleSubmitRequest} className="space-y-4 pt-2">
              <textarea
                value={requestText}
                onChange={(e) => setRequestText(e.target.value)}
                placeholder="Type your wish here..."
                rows={3}
                className="w-full rounded-2xl bg-[#0D0B0C] border border-white/10 p-3.5 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors resize-none shadow-inner"
                required
              />

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 rounded-full bg-white/10 hover:bg-white/20 text-[#D1CBD0] font-bold text-xs tracking-wide transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#FF334B] hover:opacity-90 text-white font-bold text-xs tracking-wide transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)] cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Request 🚀'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}