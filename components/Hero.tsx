'use client';

import React, { useState } from 'react';
import { PROFILE_DATA } from '@/data/profileData';
import { sounds } from '@/lib/soundEffects';
import confetti from 'canvas-confetti';
import { 
  Copy, Check, Mail, Phone, MapPin, ExternalLink, 
  Sparkles, Award, GraduationCap, Zap, ArrowRight, Terminal, Layers
} from 'lucide-react';

interface HeroProps {
  mode: 'recruiter' | 'architect';
  onScrollToProjects: () => void;
  onScrollToWhy: () => void;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ mode, onScrollToProjects, onScrollToWhy, onOpenResume }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    sounds.playSuccess();
    navigator.clipboard.writeText(text);
    setCopied(label);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 }
    });
    setTimeout(() => setCopied(null), 2500);
  };

  return (
    <section className="relative pt-8 pb-12 overflow-hidden border-b-2 border-black dark:border-white/20 bg-gradient-to-b from-amber-50/40 via-white to-sky-50/30 dark:from-funky-dark dark:via-slate-900 dark:to-funky-dark">
      {/* Decorative funky background dots/grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none dark:opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Top Badges / Sticker Ribbon */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="inline-flex items-center px-3 py-1 bg-funky-lime text-black font-extrabold text-xs rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wider transform -rotate-1 hover:rotate-0 transition-transform">
            <GraduationCap className="w-3.5 h-3.5 mr-1" /> IIT Madras Alumnus
          </span>
          <span className="inline-flex items-center px-3 py-1 bg-funky-pink text-white font-extrabold text-xs rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wider transform rotate-1 hover:rotate-0 transition-transform">
            <Award className="w-3.5 h-3.5 mr-1" /> 2x Spotlight Award Winner
          </span>
          <span className="inline-flex items-center px-3 py-1 bg-funky-cyan text-black font-extrabold text-xs rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wider transform -rotate-2 hover:rotate-0 transition-transform">
            <Zap className="w-3.5 h-3.5 mr-1" /> 10M+ Events/Day In Production
          </span>
          <span className="inline-flex items-center px-3 py-1 bg-funky-yellow text-black font-extrabold text-xs rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 mr-1" /> .NET 10 • Orleans • Kafka • Python
          </span>
        </div>

        {/* Main Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.08]">
              Hi, I&apos;m <span className="underline decoration-funky-pink decoration-wavy decoration-4">Fakir Mohan Patra</span>.
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Distributed Systems
              </span>{' '}
              &amp;{' '}
              <span className="bg-funky-lime text-black px-2 py-0.5 border-2 border-black inline-block shadow-brutal rotate-1">
                Real-Time AI
              </span>{' '}
              Engineer.
            </h1>

            {/* Dynamic Intro based on Mode */}
            <div className="mt-5 text-base sm:text-lg text-slate-700 dark:text-slate-300 font-medium max-w-3xl leading-relaxed">
              {mode === 'recruiter' ? (
                <div className="p-4 bg-amber-100/60 dark:bg-slate-800/80 border-2 border-black dark:border-white/20 rounded-xl shadow-brutal">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    🎯 <span className="font-extrabold text-indigo-700 dark:text-indigo-400">Recruiter Elevator Pitch:</span> I specialize in architecting resilient distributed backend systems, event-driven streaming with Kafka &amp; NATS (10M+ events/day), modernizing services to .NET 10, and building real-time voice AI pipelines. Proven track record at <strong className="font-bold text-black dark:text-white">Falkor</strong> delivering high-volume time-series ingestion (7K+ records/min) with automated TTL compaction, reducing issue diagnosis time by 30%, and resolving multi-session voice concurrency.
                  </p>
                </div>
              ) : (
                <div className="p-4 bg-sky-100/60 dark:bg-slate-800/80 border-2 border-black dark:border-white/20 rounded-xl shadow-brutal font-mono text-sm">
                  <p className="text-slate-900 dark:text-white">
                    🛠️ <span className="font-bold text-cyan-600 dark:text-cyan-400">Architect Deep-Dive:</span> Core strengths in <span className="bg-funky-cyan/40 px-1 border border-black dark:border-white/30 rounded">virtual actors (Orleans)</span>, <span className="bg-funky-lime/40 px-1 border border-black dark:border-white/30 rounded">streaming topologies (Kafka &amp; NATS JetStream)</span>, and <span className="bg-funky-pink/20 px-1 border border-black dark:border-white/30 rounded">time-series migrations (GreptimeDB gRPC)</span>. Hands-on expertise resolving low-level WebSocket race conditions, orphaned tool calls (ChatMessageSanitizer), and fact-verified regex-grounded LLM pipelines.
                  </p>
                </div>
              )}
            </div>

            {/* CTA Action Buttons */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  sounds.playPowerUp();
                  onScrollToProjects();
                }}
                className="px-5 py-3 bg-funky-cyan text-black font-black text-sm sm:text-base border-2 border-black rounded-xl shadow-brutal hover:bg-cyan-300 active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center space-x-2"
              >
                <Layers className="w-4 h-4" />
                <span>Interactive Architecture Diagrams</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  onScrollToWhy();
                }}
                className="px-5 py-3 bg-white dark:bg-slate-800 text-black dark:text-white font-black text-sm sm:text-base border-2 border-black dark:border-white/20 rounded-xl shadow-brutal hover:bg-slate-50 dark:hover:bg-slate-700 active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-funky-pink" />
                <span>Why Questions &amp; Trade-offs</span>
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenResume();
                }}
                className="px-5 py-3 bg-funky-lime text-black font-black text-sm sm:text-base border-2 border-black rounded-xl shadow-brutal hover:bg-lime-300 active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center space-x-2"
              >
                <span>View Full Resume</span>
              </button>
            </div>
          </div>

          {/* Quick Contact & Card on Right */}
          <div className="lg:col-span-4">
            <div className="bg-white dark:bg-slate-800 border-2 border-black dark:border-white/20 rounded-2xl p-5 shadow-brutal-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-funky-yellow text-black text-xs font-black px-3 py-1 border-b-2 border-l-2 border-black rounded-bl-lg">
                READY TO INTERVIEW
              </div>

              <div className="flex items-center space-x-3 mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-funky-pink to-funky-yellow border-2 border-black flex items-center justify-center font-black text-white text-2xl shadow-brutal">
                  FMP
                </div>
                <div>
                  <h3 className="font-black text-lg text-slate-900 dark:text-white">
                    {PROFILE_DATA.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    Software Developer @ Falkor
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-0.5">
                    <MapPin className="w-3 h-3 mr-1 text-red-500" />
                    {PROFILE_DATA.location}
                  </p>
                </div>
              </div>

              {/* Contact Items with 1-Click Copy */}
              <div className="space-y-2 text-xs font-mono">
                {/* Email */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700">
                  <div className="flex items-center space-x-2 truncate">
                    <Mail className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span className="truncate text-slate-800 dark:text-slate-200">
                      {PROFILE_DATA.email}
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(PROFILE_DATA.email, 'email')}
                    className="p-1 text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white shrink-0 ml-2"
                    title="Copy Email"
                  >
                    {copied === 'email' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Phone */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700">
                  <div className="flex items-center space-x-2 truncate">
                    <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="truncate text-slate-800 dark:text-slate-200">
                      {PROFILE_DATA.phone}
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(PROFILE_DATA.phone, 'phone')}
                    className="p-1 text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white shrink-0 ml-2"
                    title="Copy Phone"
                  >
                    {copied === 'phone' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Links */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href={PROFILE_DATA.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center space-x-1.5 p-2 bg-blue-50 dark:bg-blue-950/40 border border-blue-300 dark:border-blue-700 rounded-lg text-blue-700 dark:text-blue-300 font-bold hover:bg-blue-100 transition-colors"
                  >
                    <span>LinkedIn</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={PROFILE_DATA.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center space-x-1.5 p-2 bg-slate-100 dark:bg-slate-900 border border-slate-400 dark:border-slate-600 rounded-lg text-slate-800 dark:text-slate-200 font-bold hover:bg-slate-200 transition-colors"
                  >
                    <span>GitHub</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Status Note */}
              <div className="mt-4 pt-3 border-t border-dashed border-slate-300 dark:border-slate-700 text-center">
                <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  ⚡ Open to Senior Backend / Distributed Systems roles
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {PROFILE_DATA.stats.map((item, idx) => (
            <div
              key={idx}
              className="p-3 bg-white dark:bg-slate-800/90 border-2 border-black dark:border-white/20 rounded-xl shadow-brutal hover:-translate-y-1 transition-transform"
            >
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {item.value}
              </div>
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate">
                {item.label}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                {item.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Ticker */}
      <div className="mt-8 bg-black text-funky-lime border-y-2 border-black py-2 overflow-hidden flex whitespace-nowrap">
        <div className="inline-block animate-marquee font-mono text-xs font-bold tracking-widest uppercase">
          ⚡ 10M+ DAILY EVENTS • 🚀 7K+ ALERTS/MIN INGESTION • ⏱️ SUB-SECOND TIME-SERIES QUERIES • 🎙️ REAL-TIME CONVERSATIONAL VOICE AI • 🎬 5 AUTONOMOUS VIDEOS/DAY • 🏆 2X SPOTLIGHT AWARD @ Falkor • 🎓 IIT MADRAS M.TECH • 🛡️ FACT-VERIFIED MEDIA PIPELINE • ⚡ 10M+ DAILY EVENTS • 🚀 7K+ ALERTS/MIN INGESTION • ⏱️ SUB-SECOND TIME-SERIES QUERIES • 🎙️ REAL-TIME CONVERSATIONAL VOICE AI • 🎬 5 AUTONOMOUS VIDEOS/DAY
        </div>
      </div>
    </section>
  );
};
