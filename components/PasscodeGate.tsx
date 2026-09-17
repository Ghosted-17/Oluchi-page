'use client';

import React, { useState, useEffect } from 'react';

export default function PasscodeGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [error, setError] = useState(false);

  // Set the secret answer here (forced to lowercase for smooth checking)
  const CORRECT_ANSWER = 'ghosted'; // <--- Change this to your special nickname for her!

  useEffect(() => {
    // Check if she already unlocked it previously on this device
    const isUnlocked = localStorage.getItem('oluchi_multiverse_unlocked');
    if (isUnlocked === 'true') {
      setUnlocked(true);
    }
  }, []);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedInput = inputVal.trim().toLowerCase();

    if (cleanedInput === CORRECT_ANSWER) {
      localStorage.setItem('oluchi_multiverse_unlocked', 'true');
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
      // Shake animation trigger or reset error after a second
      setTimeout(() => setError(false), 1500);
    }
  };

  // If already unlocked, render the normal website content
  if (unlocked) {
    return <>{children}</>;
  }

  // Otherwise, render the secure passcode gate screen
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0D0B0C] text-[#F8F9FA]">
      {/* Background ambient glow */}
      <div className="absolute w-72 h-72 bg-[#FF334B]/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-md rounded-3xl bg-[#1A1618] border border-[#2E2226] p-8 text-center space-y-6 shadow-2xl backdrop-blur-xl">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#FF334B]/10 border border-[#FF334B]/30 flex items-center justify-center text-2xl shadow-inner">
          🔒
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#FF334B] font-bold">
            Restricted Multiverse
          </span>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Who made this
          </h2>
          <p className="text-xs text-[#9E9398] leading-relaxed">
            This space is strictly private. Enter the special nickname or name you are known by to access the portal.
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Enter passcode / nickname..."
              className={`w-full px-4 py-3.5 rounded-2xl bg-black/50 border text-white text-sm text-center placeholder-[#6E6368] focus:outline-none transition-all ${
                error
                  ? 'border-[#FF334B] animate-shake shadow-[0_0_15px_rgba(255,51,75,0.4)]'
                  : 'border-[#2E2226] focus:border-[#FF334B]'
              }`}
              autoFocus
            />
          </div>

          {error && (
            <p className="text-[11px] font-mono text-[#FF334B] animate-pulse">
              Incorrect. Try again, main character!
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-[#FF334B] hover:bg-[#E02138] text-white font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(255,51,75,0.3)] cursor-pointer"
          >
            Unlock Portal ✨
          </button>
        </form>

        <p className="text-[10px] font-mono text-[#6E6368]">
          Protected by Velvet Noir Security Layer
        </p>
      </div>
    </div>
  );
}