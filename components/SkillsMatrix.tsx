'use client';

import React, { useState } from 'react';
import { SKILLS_DATA, SkillCategory } from '@/data/profileData';
import { sounds } from '@/lib/soundEffects';
import { 
  Code2, Layers, Database, Mic, Cloud, 
  CheckCircle2, Sparkles, Filter 
} from 'lucide-react';

export const SkillsMatrix: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...SKILLS_DATA.map((c) => c.category)];

  const getIcon = (catName: string) => {
    switch (catName) {
      case 'Languages & Core':
        return <Code2 className="w-5 h-5 text-indigo-500" />;
      case 'Distributed Systems & Streaming':
        return <Layers className="w-5 h-5 text-funky-pink" />;
      case 'Databases & Storage':
        return <Database className="w-5 h-5 text-funky-lime" />;
      case 'AI, Audio & Realtime':
        return <Mic className="w-5 h-5 text-funky-cyan" />;
      case 'Cloud, DevOps & Tooling':
        return <Cloud className="w-5 h-5 text-amber-500" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  const filteredData = activeCategory === 'All'
    ? SKILLS_DATA
    : SKILLS_DATA.filter((c) => c.category === activeCategory);

  return (
    <section id="skills-matrix" className="py-14 border-b-2 border-black dark:border-white/20 bg-white dark:bg-funky-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-funky-lime text-black font-extrabold text-xs rounded-full border-2 border-black shadow-brutal mb-3 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Production Competency &amp; Depth</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Technical Arsenal &amp; Systems Depth
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 font-medium">
            Battle-tested in high-throughput enterprise production and real-time streaming environments.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sounds.playClick();
                  setActiveCategory(cat);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all border-2 border-black shadow-brutal active:translate-x-0.5 active:translate-y-0.5 ${
                  activeCategory === cat
                    ? 'bg-funky-yellow text-black scale-105'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="space-y-8">
          {filteredData.map((categoryGroup) => (
            <div key={categoryGroup.category} className="space-y-3">
              <div className="flex items-center space-x-2 border-b-2 border-black dark:border-white/20 pb-2">
                {getIcon(categoryGroup.category)}
                <h3 className="font-mono text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">
                  {categoryGroup.category}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {categoryGroup.items.map((skill, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-slate-50 dark:bg-slate-800/80 border-2 border-black dark:border-white/20 rounded-xl shadow-brutal hover:-translate-y-1 transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-black text-base text-slate-900 dark:text-white">
                        {skill.name}
                      </h4>
                      <div className="flex items-center space-x-1.5">
                        <span
                          className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-black ${
                            skill.level === 'Expert'
                              ? 'bg-funky-lime text-black'
                              : skill.level === 'Advanced'
                              ? 'bg-funky-cyan text-black'
                              : 'bg-funky-pink text-white'
                          }`}
                        >
                          {skill.level}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400">
                          {skill.years}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                      {skill.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
