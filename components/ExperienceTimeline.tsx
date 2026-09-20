'use client';

import React from 'react';
import { PROFILE_DATA } from '@/data/profileData';
import { Briefcase, GraduationCap, Award, CheckCircle2, Calendar, MapPin } from 'lucide-react';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-14 border-b-2 border-black dark:border-white/20 bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-funky-cyan text-black font-extrabold text-xs rounded-full border-2 border-black shadow-brutal mb-3 uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Track Record &amp; Pedigree</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Experience &amp; Academic Foundation
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 font-medium">
            Progressive engineering impact across industrial enterprise IoT, distributed streaming, and computational research.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Work Experience (Left 7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center space-x-2 border-b-2 border-black dark:border-white/20 pb-2">
              <Briefcase className="w-5 h-5 text-funky-pink" />
              <h3 className="font-mono text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider">
                Professional Experience
              </h3>
            </div>

            {/* Kongsberg Digital */}
            <div className="bg-white dark:bg-slate-800 border-3 border-black dark:border-white/20 rounded-2xl p-6 shadow-brutal relative">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div>
                  <h4 className="text-xl font-black text-slate-900 dark:text-white">
                    Software Developer
                  </h4>
                  <div className="flex items-center space-x-2 text-sm font-bold text-funky-pink">
                    <span>Kongsberg Digital</span>
                    <span>•</span>
                    <span className="flex items-center text-xs text-slate-500 dark:text-slate-400 font-mono">
                      <MapPin className="w-3 h-3 mr-0.5" /> Bangalore, IN
                    </span>
                  </div>
                </div>
                <span className="px-3 py-1 bg-funky-yellow text-black border border-black rounded-lg text-xs font-mono font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  July 2023 – Present
                </span>
              </div>

              <ul className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                <li className="flex items-start">
                  <span className="text-funky-lime font-black mr-2 text-base">✦</span>
                  <span>
                    <strong>Led POC &amp; End-to-End Migration to GreptimeDB:</strong> Architected time-series alert migration at 10M+ scale, hitting <strong>~18,500 rows/sec</strong> via gRPC, <strong>519ms</strong> filtered query latency, and 30-day automated TTL lifecycle.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-funky-cyan font-black mr-2 text-base">✦</span>
                  <span>
                    <strong>Upgraded Messaging to .NET 10 &amp; Wolverine:</strong> Modernized Kafka, NATS JetStream, and Orleans integrations. Refactored custom JetStream bootstrap into native framework provisioning, eliminating code bloat and startup crash regressions.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-funky-pink font-black mr-2 text-base">✦</span>
                  <span>
                    <strong>Low-Latency Voice AI Pipeline (KvantumX):</strong> Built authenticated WebSocket byte-pump for GPT-Realtime with private-cloud Whisper/Piper fallback. Solved multi-turn concurrency corruption and auto-healed orphaned tool calls.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-funky-yellow font-black mr-2 text-base">✦</span>
                  <span>
                    <strong>Flask to .NET Core CQRS Migration:</strong> Re-engineered legacy telemetry microservices into high-throughput CQRS pipelines, improving reliability, OpenTelemetry observability, and CI/CD via Argo CD.
                  </span>
                </li>
              </ul>
            </div>

            {/* TCS Research & Innovocare */}
            <div className="bg-white dark:bg-slate-800 border-3 border-black dark:border-white/20 rounded-2xl p-6 shadow-brutal relative">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div>
                  <h4 className="text-xl font-black text-slate-900 dark:text-white">
                    Research &amp; Data Science Intern
                  </h4>
                  <div className="flex items-center space-x-2 text-sm font-bold text-slate-600 dark:text-slate-400">
                    <span>TCS Research &amp; Innovocare HealthSoft</span>
                    <span>•</span>
                    <span className="text-xs font-mono">India</span>
                  </div>
                </div>
                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-black rounded-lg text-xs font-mono font-bold">
                  2021 – 2022
                </span>
              </div>

              <ul className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                <li className="flex items-start">
                  <span className="text-indigo-500 font-black mr-2 text-base">✦</span>
                  <span>
                    Built processing pipelines for biological sequences and multi-channel ECG/EEG time-series using <strong>BERT-based transformer models</strong> and <strong>FFT/time-frequency analysis</strong>.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 font-black mr-2 text-base">✦</span>
                  <span>
                    Extracted discriminative non-linear features from large-scale structured and unstructured biomedical datasets for early-stage diagnostic anomaly detection.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Education & Honors (Right 5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center space-x-2 border-b-2 border-black dark:border-white/20 pb-2">
              <GraduationCap className="w-5 h-5 text-funky-lime" />
              <h3 className="font-mono text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider">
                Education &amp; Credentials
              </h3>
            </div>

            {/* IIT Madras */}
            <div className="bg-white dark:bg-slate-800 border-3 border-black dark:border-white/20 rounded-2xl p-5 shadow-brutal">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-black uppercase text-funky-pink">
                  Premier Technical Institute
                </span>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-bold">
                  2021 – 2023
                </span>
              </div>
              <h4 className="text-lg font-black text-slate-900 dark:text-white">
                M.Tech in Applied Mechanics
              </h4>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Indian Institute of Technology Madras (IIT Madras)
              </p>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                Rigorous curriculum in advanced computational mechanics, mathematical modeling, numerical optimization, and algorithm design.
              </p>
            </div>

            {/* IIIT Jabalpur */}
            <div className="bg-white dark:bg-slate-800 border-3 border-black dark:border-white/20 rounded-2xl p-5 shadow-brutal">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-black uppercase text-indigo-500">
                  Undergraduate Degree
                </span>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-bold">
                  2015 – 2019
                </span>
              </div>
              <h4 className="text-lg font-black text-slate-900 dark:text-white">
                B.Tech in Mechanical Engineering
              </h4>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Indian Institute of Information Technology Jabalpur (IIIT Jabalpur)
              </p>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                Strong engineering foundation in kinematics, robotics, control systems, and computational algorithms.
              </p>
            </div>

            {/* Awards & Certifications Card */}
            <div className="bg-amber-100/70 dark:bg-slate-800 border-3 border-black dark:border-white/20 rounded-2xl p-5 shadow-brutal">
              <div className="flex items-center space-x-2 text-xs font-mono font-black uppercase text-slate-900 dark:text-white mb-3">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Awards &amp; Certifications</span>
              </div>
              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-black/30 dark:border-white/20">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 dark:text-white">
                      🏆 2x Spotlight Award
                    </span>
                    <span className="font-mono text-slate-500 dark:text-slate-400">2023 – 2024</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mt-0.5">
                    Kongsberg Digital: Recognized for Python-to-.NET migration &amp; time-series POC leadership.
                  </p>
                </div>

                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-black/30 dark:border-white/20">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 dark:text-white">
                      ⚡ Top 5 in AI Hackathon
                    </span>
                    <span className="font-mono text-slate-500 dark:text-slate-400">2024</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mt-0.5">
                    Built domain-specific RAG chatbot with deterministic citation grounding.
                  </p>
                </div>

                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-black/30 dark:border-white/20">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 dark:text-white">
                      📜 Azure AI Certified (AI-900)
                    </span>
                    <span className="font-mono text-slate-500 dark:text-slate-400">June 2025</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mt-0.5">
                    Microsoft Certified: Azure AI Fundamentals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
