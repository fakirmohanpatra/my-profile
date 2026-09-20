'use client';

import React, { useState } from 'react';
import { WHY_HIRING_QA } from '@/data/profileData';
import { sounds } from '@/lib/soundEffects';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, CheckCircle, ShieldCheck } from 'lucide-react';

export const WhyQuestionsSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First one open by default

  const toggleOpen = (index: number) => {
    sounds.playClick();
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="why-questions" className="py-14 border-b-2 border-black dark:border-white/20 bg-amber-50/50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-funky-pink text-white font-extrabold text-xs rounded-full border-2 border-black shadow-brutal mb-3 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Recruiter &amp; Hiring Manager Cheat Sheet</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            The &ldquo;Why&rdquo; Questions Answered
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 font-medium">
            Straight answers to the critical engineering and behavioral questions leaders ask during senior technical evaluations.
          </p>
        </div>

        {/* Accordion List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {WHY_HIRING_QA.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`bg-white dark:bg-slate-800 border-3 border-black dark:border-white/20 rounded-2xl transition-all shadow-brutal hover:shadow-brutal-lg overflow-hidden ${
                  isOpen ? 'ring-2 ring-funky-yellow' : ''
                }`}
              >
                {/* Question Header */}
                <button
                  onClick={() => toggleOpen(index)}
                  className="w-full p-5 text-left flex items-start justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-funky-lime text-black border border-black">
                        {item.tag}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                      {item.question}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400">
                      💡 {item.summary}
                    </p>
                  </div>

                  <div className="shrink-0 p-2 rounded-lg bg-slate-100 dark:bg-slate-700 border border-black dark:border-white/20">
                    {isOpen ? <ChevronUp className="w-5 h-5 text-black dark:text-white" /> : <ChevronDown className="w-5 h-5 text-black dark:text-white" />}
                  </div>
                </button>

                {/* Expanded Detailed Response */}
                {isOpen && (
                  <div className="px-5 pb-6 pt-2 border-t-2 border-dashed border-slate-200 dark:border-slate-700 text-sm">
                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 leading-relaxed font-medium text-slate-800 dark:text-slate-200">
                      <div className="flex items-center space-x-1.5 text-xs font-mono font-bold uppercase tracking-wider text-funky-pink mb-2">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Comprehensive Architectural Rationale</span>
                      </div>
                      <p>{item.detailed}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
