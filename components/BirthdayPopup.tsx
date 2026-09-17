'use client';

import React, { useState, useEffect } from 'react';
import { fireMultiverseConfetti } from './ConfettiButton';

export default function BirthdayPopup() {
  const [modalType, setModalType] = useState<'midnight' | 'midday' | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !('Notification' in window)) return;

    // Check how many times we've asked her
    const askCount = parseInt(localStorage.getItem('oluchi_ask_count') || '0', 10);
    const permission = Notification.permission;

    // Show prompt if permission is still default (not allowed/blocked) and she hasn't been asked twice yet
    if (permission === 'default' && askCount < 2) {
      // Delay showing it slightly so the page loads smoothly first
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 2000);
      return () => clearTimeout(timer);
    }

    const checkBirthdayTriggers = () => {
      const now = new Date();
      const month = now.getMonth(); // 10 is November
      const date = now.getDate();
      const hours = now.getHours();

      // Checks if today is November 13th
      const isNov13 = (month === 10 && date === 13); 

      if (!isNov13) return;

      const todayStr = now.toDateString();

      // 1. Midnight Trigger (00:00 to 02:00)
      if (hours >= 0 && hours < 2) {
        const lastMidnightShown = localStorage.getItem('oluchi_bday_midnight');
        if (lastMidnightShown !== todayStr) {
          setModalType('midnight');
          localStorage.setItem('oluchi_bday_midnight', todayStr);
          fireMultiverseConfetti();
          sendPhoneNotification('Happy Birthday, Oluchi! 🎉', 'The multiversal celebration has officially begun. Tap to open your day!');
        }
      }

      // 2. Midday Trigger (12:00 to 14:00)
      if (hours >= 12 && hours < 14) {
        const lastMiddayShown = localStorage.getItem('oluchi_bday_midday');
        if (lastMiddayShown !== todayStr) {
          setModalType('midday');
          localStorage.setItem('oluchi_bday_midday', todayStr);
          fireMultiverseConfetti();
          sendPhoneNotification('Midday Check-In! ✨', 'Still your day! Take a breather and make sure you are having maximum fun.');
        }
      }
    };

    checkBirthdayTriggers();
    const interval = setInterval(checkBirthdayTriggers, 60000);
    return () => clearInterval(interval);
  }, []);

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) return;

    const askCount = parseInt(localStorage.getItem('oluchi_ask_count') || '0', 10);
    localStorage.setItem('oluchi_ask_count', (askCount + 1).toString());

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      new Notification('Good', {
        body: 'See you 🎀',
        icon: '/favicon.ico',
      });
    }
    setShowPrompt(false);
  };

  const dismissPrompt = () => {
    // Track that we asked once, hide it now, but allow it to reappear later for a 2nd try
    const askCount = parseInt(localStorage.getItem('oluchi_ask_count') || '0', 10);
    localStorage.setItem('oluchi_ask_count', (askCount + 1).toString());
    setShowPrompt(false);
  };

  const sendPhoneNotification = (title: string, body: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon: '/favicon.ico',
      });
    }
  };

  return (
    <>
      {/* Sleek Subdued Opt-In Prompt on the Bottom Left */}
      {showPrompt && (
        <div className="fixed bottom-4 left-4 z-40 max-w-xs p-3.5 rounded-2xl bg-[#1A1618]/95 border border-[#FF334B]/40 backdrop-blur-md shadow-2xl flex items-center gap-3 text-left animate-in fade-in slide-in-from-bottom-4">
          <span className="text-xl">✨</span>
          <div className="flex-1">
            <p className="text-xs font-bold text-white">Enable Surprise Mode</p>
            <p className="text-[10px] text-[#D1CBD0]">Unlock special updates later!</p>
          </div>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={dismissPrompt}
              className="px-2.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#D1CBD0] text-[10px] font-bold transition-all cursor-pointer"
            >
              Later
            </button>
            <button
              type="button"
              onClick={requestNotificationPermission}
              className="px-3 py-1.5 rounded-full bg-[#FF334B] hover:bg-[#E02138] text-white text-[11px] font-bold transition-all cursor-pointer shadow-md"
            >
              Allow
            </button>
          </div>
        </div>
      )}

      {/* Full-Screen Celebration Modal */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-md rounded-3xl bg-[#1A1618] border border-[#FF334B] p-8 text-center space-y-4 shadow-[0_0_50px_rgba(255,51,75,0.4)] overflow-hidden">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#FF334B]/20 rounded-full blur-3xl pointer-events-none" />

            <span className="text-3xl select-none">
              {modalType === 'midnight' ? '🎂' : '👑'}
            </span>

            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {modalType === 'midnight'
                ? 'Happy Birthday, Oluchi! 🎉'
                : 'Midday Check-In! ✨'}
            </h3>

            <p className="text-sm sm:text-base text-[#E8E1E5] leading-relaxed">
              {modalType === 'midnight'
                ? 'The clock just struck 12. Another year of unmatched energy, elite music taste, and pure protagonist behavior. Have an unforgettable day!'
                : 'Just a reminder that it is still your day! Take a breather, soak in all the love, and make sure you are having maximum fun right now.'}
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setModalType(null);
                  fireMultiverseConfetti();
                }}
                className="w-full py-3 rounded-full bg-[#FF334B] hover:bg-[#E02138] text-white font-bold text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(255,51,75,0.4)] cursor-pointer"
              >
                Let&apos;s Go 🎈
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}