'use client';

import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Layers, Code2, ArrowRight, X } from 'lucide-react';
import { PROJECTS_DATA, SKILLS_DATA, Project } from '@/data/profileData';
import { sounds } from '@/lib/soundEffects';

interface SearchPaletteProps {
  onSelectProject: (projectId: string) => void;
}

export const SearchPalette: React.FC<SearchPaletteProps> = ({ onSelectProject }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{
    projects: { id: string; title: string; snippet: string }[];
    skills: { name: string; category: string; details: string }[];
  }>({ projects: [], skills: [] });

  useEffect(() => {
    if (!query.trim()) {
      setResults({ projects: [], skills: [] });
      return;
    }

    const q = query.toLowerCase();

    // Client-side instant fuzzy search
    const matchedProjects = PROJECTS_DATA.filter((p) => {
      const fullText = `${p.title} ${p.tagline} ${p.techStack.join(' ')} ${p.problemStatement} ${p.solution}`.toLowerCase();
      return fullText.includes(q);
    }).map((p) => ({
      id: p.id,
      title: p.title,
      snippet: p.tagline,
    }));

    const matchedSkills: { name: string; category: string; details: string }[] = [];
    SKILLS_DATA.forEach((cat) => {
      cat.items.forEach((item) => {
        if (item.name.toLowerCase().includes(q) || item.details.toLowerCase().includes(q)) {
          matchedSkills.push({
            name: item.name,
            category: cat.category,
            details: item.details,
          });
        }
      });
    });

    setResults({
      projects: matchedProjects,
      skills: matchedSkills,
    });
  }, [query]);

  return (
    <div className="max-w-2xl mx-auto px-4 -mt-6 relative z-30">
      <div className="bg-white dark:bg-slate-800 border-3 border-black dark:border-white/30 rounded-2xl p-2.5 shadow-brutal-lg flex items-center space-x-2">
        <div className="p-2 bg-funky-yellow border-2 border-black rounded-xl text-black">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by keyword: 'Orleans', 'Kafka', 'GreptimeDB', 'Latency', 'TTS'..."
          className="w-full bg-transparent border-none outline-none font-mono text-sm text-slate-900 dark:text-white placeholder:text-slate-400 font-medium"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="p-1 rounded-lg text-slate-400 hover:text-black dark:hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Instant Search Results Dropdown */}
      {query.trim() && (
        <div className="absolute left-4 right-4 mt-2 bg-white dark:bg-slate-900 border-3 border-black dark:border-white/30 rounded-2xl shadow-brutal-lg max-h-80 overflow-y-auto p-4 space-y-4 z-50">
          {results.projects.length === 0 && results.skills.length === 0 ? (
            <div className="p-4 text-center text-sm font-mono text-slate-500">
              No matching keywords found for &ldquo;{query}&rdquo;. Try &apos;Kafka&apos;, &apos;gRPC&apos;, &apos;Python&apos;, or &apos;TTL&apos;.
            </div>
          ) : (
            <>
              {results.projects.length > 0 && (
                <div>
                  <h4 className="font-mono text-xs font-black uppercase tracking-wider text-funky-pink flex items-center mb-2">
                    <Layers className="w-3.5 h-3.5 mr-1" /> Projects ({results.projects.length})
                  </h4>
                  <div className="space-y-2">
                    {results.projects.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          sounds.playClick();
                          setQuery('');
                          onSelectProject(p.id);
                        }}
                        className="w-full text-left p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-funky-cyan/20 border border-slate-300 dark:border-slate-700 transition-colors flex items-center justify-between group"
                      >
                        <div>
                          <div className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600">
                            {p.title}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                            {p.snippet}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-black shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {results.skills.length > 0 && (
                <div>
                  <h4 className="font-mono text-xs font-black uppercase tracking-wider text-funky-lime flex items-center mb-2">
                    <Code2 className="w-3.5 h-3.5 mr-1" /> Skills &amp; Technologies ({results.skills.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {results.skills.map((s, idx) => (
                      <div
                        key={idx}
                        className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                      >
                        <div className="font-bold text-slate-900 dark:text-white">
                          {s.name}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          {s.category}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
