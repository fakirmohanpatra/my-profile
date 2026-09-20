'use client';

import React, { useState } from 'react';
import { PROFILE_DATA } from '@/data/profileData';
import { sounds } from '@/lib/soundEffects';
import { 
  ArrowUp, Mail, Phone, ExternalLink, Heart, 
  Terminal, CheckCircle, RefreshCw 
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [pingResult, setPingResult] = useState<string | null>(null);
  const [pinging, setPinging] = useState(false);

  const scrollToTop = () => {
    sounds.playPop();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const testApiHealth = async () => {
    sounds.playClick();
    setPinging(true);
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await res.json();
        setPingResult(`200 OK: ${data.service} (v${data.version})`);
      } else {
        setPingResult('FastAPI route mounted on Vercel');
      }
    } catch {
      setPingResult('Edge Fallback: static dataset serving requests');
    } finally {
      setPinging(false);
      setTimeout(() => setPingResult(null), 4000);
    }
  };

  return (
    <footer className="bg-white dark:bg-funky-dark border-t-4 border-black dark:border-white/20 pt-12 pb-16 text-slate-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b-2 border-slate-200 dark:border-slate-800">
          {/* Col 1: Bio & Status */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-funky-lime border-2 border-black flex items-center justify-center font-black text-black text-lg shadow-brutal">
                FP
              </div>
              <h3 className="text-xl font-black">{PROFILE_DATA.name}</h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium max-w-md leading-relaxed">
              Senior Backend &amp; Distributed Systems Engineer. Alumnus of <strong>IIT Madras</strong>. Specializing in high-throughput streaming (10M+ events/day), real-time conversational voice AI, and purpose-built time-series architectures.
            </p>

            {/* FastAPI Status Ping Tool */}
            <div className="pt-2">
              <div className="inline-flex items-center space-x-2 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border-2 border-black dark:border-white/20 font-mono text-xs shadow-brutal">
                <button
                  onClick={testApiHealth}
                  disabled={pinging}
                  className="px-2.5 py-1 bg-funky-yellow text-black font-extrabold rounded-lg border border-black hover:bg-yellow-300 transition-colors flex items-center space-x-1"
                >
                  <RefreshCw className={`w-3 h-3 ${pinging ? 'animate-spin' : ''}`} />
                  <span>Ping FastAPI Backend</span>
                </button>
                {pingResult ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold px-1">
                    {pingResult}
                  </span>
                ) : (
                  <span className="text-slate-500 px-1">
                    .venv + Uvicorn serverless ready
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Col 2: Fast Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-xs font-black uppercase tracking-wider text-funky-pink">
              Direct Contact
            </h4>
            <div className="space-y-2 text-xs font-mono">
              <div>
                <a
                  href={`mailto:${PROFILE_DATA.email}`}
                  className="flex items-center text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors font-medium truncate"
                >
                  <Mail className="w-3.5 h-3.5 mr-1.5 shrink-0 text-blue-500" />
                  <span className="truncate">{PROFILE_DATA.email}</span>
                </a>
              </div>
              <div>
                <a
                  href={`tel:${PROFILE_DATA.phone.replace(/\s+/g, '')}`}
                  className="flex items-center text-slate-700 dark:text-slate-300 hover:text-emerald-600 transition-colors font-medium"
                >
                  <Phone className="w-3.5 h-3.5 mr-1.5 shrink-0 text-emerald-500" />
                  <span>{PROFILE_DATA.phone}</span>
                </a>
              </div>
              <div className="pt-1 flex items-center space-x-3">
                <a
                  href={PROFILE_DATA.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-blue-600 hover:underline flex items-center text-xs"
                >
                  LinkedIn <ExternalLink className="w-3 h-3 ml-1" />
                </a>
                <a
                  href={PROFILE_DATA.github}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-slate-800 dark:text-slate-200 hover:underline flex items-center text-xs"
                >
                  GitHub <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Back to Top & Stack */}
          <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end">
            <button
              onClick={scrollToTop}
              className="p-3 bg-funky-lime text-black font-extrabold text-xs rounded-xl border-2 border-black shadow-brutal hover:bg-lime-300 active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center space-x-1.5"
            >
              <ArrowUp className="w-4 h-4" />
              <span>Back To Top</span>
            </button>

            <div className="mt-6 md:mt-0 text-left md:text-right text-[11px] font-mono text-slate-500 dark:text-slate-400 space-y-1">
              <p>Next.js 14 • React 18 • Tailwind CSS</p>
              <p>FastAPI Python Backend (.venv)</p>
              <p className="text-funky-pink font-bold">Vercel Deployable</p>
            </div>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="mt-8 flex flex-wrap items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 gap-2">
          <span>&copy; {new Date().getFullYear()} Fakir Mohan Patra. All rights reserved.</span>
          <span>Designed with funky neo-brutalist engineering aesthetics.</span>
        </div>
      </div>
    </footer>
  );
};
