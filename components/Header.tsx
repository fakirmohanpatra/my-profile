'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Terminal, Briefcase, FileText, CheckCircle2 } from 'lucide-react';
import { sounds } from '@/lib/soundEffects';

interface HeaderProps {
  mode: 'recruiter' | 'architect';
  setMode: (mode: 'recruiter' | 'architect') => void;
  onOpenResume: () => void;
}

export const Header: React.FC<HeaderProps> = ({ mode, setMode, onOpenResume }) => {
  const [soundActive, setSoundActive] = useState(false);
  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'static'>('checking');

  useEffect(() => {
    // Check FastAPI health
    fetch('/api/health')
      .then((res) => {
        if (res.ok) setApiStatus('online');
        else setApiStatus('static');
      })
      .catch(() => setApiStatus('static'));
  }, []);

  const handleToggleSound = () => {
    const newState = sounds.toggleSound();
    setSoundActive(newState);
  };

  const handleModeChange = (newMode: 'recruiter' | 'architect') => {
    sounds.playPop();
    setMode(newMode);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-funky-dark/90 backdrop-blur-md border-b-2 border-black dark:border-white/20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo & Name */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-funky-lime border-2 border-black flex items-center justify-center font-black text-black text-xl shadow-brutal transform -rotate-3 hover:rotate-0 transition-transform cursor-pointer">
            FP
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white">
                Fakir Mohan Patra
              </span>
              <span className="hidden md:inline-flex items-center px-2 py-0.5 text-xs font-bold bg-funky-yellow text-black border border-black rounded shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                IIT Madras
              </span>
            </div>
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-500 dark:text-slate-400">
              <span className="flex items-center">
                <span
                  className={`w-2 h-2 rounded-full mr-1.5 ${
                    apiStatus === 'online' ? 'bg-emerald-500 animate-pulse' : 'bg-funky-cyan'
                  }`}
                />
                {apiStatus === 'online' ? 'FastAPI .venv active' : 'Hybrid Vercel Edge'}
              </span>
            </div>
          </div>
        </div>

        {/* Mode Selector Pill (Center/Right) */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Funky Mode Switcher */}
          <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border-2 border-black dark:border-white/20 flex items-center shadow-brutal">
            <button
              onClick={() => handleModeChange('recruiter')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                mode === 'recruiter'
                  ? 'bg-funky-yellow text-black border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] scale-[1.02]'
                  : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>HR Fast-Pass</span>
            </button>
            <button
              onClick={() => handleModeChange('architect')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                mode === 'architect'
                  ? 'bg-funky-cyan text-black border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] scale-[1.02]'
                  : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Architect Mode</span>
            </button>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            title={soundActive ? 'Mute 8-bit sound effects' : 'Enable 8-bit sound effects'}
            className={`p-2 rounded-lg border-2 border-black dark:border-white/20 transition-all shadow-brutal active:translate-x-0.5 active:translate-y-0.5 ${
              soundActive
                ? 'bg-funky-pink text-white animate-pulse-fast'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            {soundActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Resume Button */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenResume();
            }}
            className="hidden sm:flex items-center space-x-1 px-3 py-1.5 bg-funky-lime text-black font-extrabold text-xs sm:text-sm border-2 border-black rounded-lg shadow-brutal hover:bg-lime-300 active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>Resume</span>
          </button>
        </div>
      </div>
    </header>
  );
};
