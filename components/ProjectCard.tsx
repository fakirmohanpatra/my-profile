'use client';

import React, { useState } from 'react';
import { Project, ArchitectureNode } from '@/data/profileData';
import { ArchitectureDiagram } from '@/components/ArchitectureDiagram';
import { sounds } from '@/lib/soundEffects';
import { 
  Layers, ChevronDown, ChevronUp, HelpCircle, 
  ExternalLink, CheckCircle2, ShieldCheck, Flame, Cpu 
} from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onSelectNode: (node: ArchitectureNode, projectName: string) => void;
  defaultExpanded?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelectNode, defaultExpanded = false }) => {
  const [showArchitecture, setShowArchitecture] = useState(defaultExpanded || project.featured);
  const [showWhyQA, setShowWhyQA] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | undefined>();

  const handleNodeClick = (node: ArchitectureNode) => {
    setSelectedNodeId(node.id);
    onSelectNode(node, project.title);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-3 border-black dark:border-white/20 rounded-2xl p-5 sm:p-7 shadow-brutal-lg transition-all hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b-2 border-black dark:border-white/20">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-black bg-funky-yellow text-black border-2 border-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            {project.category}
          </span>
          <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-400 font-mono">
            {project.company}
          </span>
          {project.period && (
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              {project.period}
            </span>
          )}
        </div>

        {project.featured && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-black bg-funky-pink text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <Flame className="w-3.5 h-3.5 mr-1" /> Flagship Production
          </span>
        )}
      </div>

      {/* Title & Tagline */}
      <div className="mt-4">
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          {project.title}
        </h3>
        <p className="mt-2 text-base sm:text-lg font-semibold text-slate-700 dark:text-slate-300 leading-relaxed">
          {project.tagline}
        </p>
      </div>

      {/* Impact Metrics Banner */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {project.impactMetrics.map((metric, idx) => (
          <div
            key={idx}
            className="p-2.5 bg-funky-lime/15 dark:bg-funky-lime/10 border-2 border-black dark:border-funky-lime/40 rounded-xl"
          >
            <div className="text-lg sm:text-xl font-black text-slate-900 dark:text-funky-lime font-mono">
              {metric.metric}
            </div>
            <div className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-tight truncate">
              {metric.label}
            </div>
          </div>
        ))}
      </div>

      {/* Problem & Solution Breakdown */}
      <div className="mt-5 space-y-3 text-sm">
        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-300 dark:border-slate-700">
          <span className="font-mono text-xs font-black uppercase tracking-wider text-rose-600 dark:text-rose-400 block mb-1">
            ⚡ Problem Bottleneck
          </span>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            {project.problemStatement}
          </p>
        </div>

        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-300 dark:border-slate-700">
          <span className="font-mono text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">
            🚀 Delivered Architecture &amp; Impact
          </span>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            {project.solution}
          </p>
        </div>
      </div>

      {/* Tech Stack Pills */}
      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.techStack.map((tech, idx) => (
          <span
            key={idx}
            className="px-2.5 py-1 rounded-md text-xs font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Interactive Blueprint Toggle */}
      <div className="mt-6 pt-4 border-t-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-wrap gap-3">
        <button
          onClick={() => {
            sounds.playClick();
            setShowArchitecture(!showArchitecture);
          }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold border-2 border-black transition-all flex items-center space-x-2 shadow-brutal active:translate-x-0.5 active:translate-y-0.5 ${
            showArchitecture
              ? 'bg-funky-cyan text-black'
              : 'bg-white dark:bg-slate-800 text-black dark:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>
            {showArchitecture ? 'Hide Architecture Blueprint' : 'Inspect Interactive Architecture Blueprint'}
          </span>
          {showArchitecture ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {project.whyQuestions && project.whyQuestions.length > 0 && (
          <button
            onClick={() => {
              sounds.playClick();
              setShowWhyQA(!showWhyQA);
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold border-2 border-black transition-all flex items-center space-x-2 shadow-brutal active:translate-x-0.5 active:translate-y-0.5 ${
              showWhyQA
                ? 'bg-funky-pink text-white'
                : 'bg-white dark:bg-slate-800 text-black dark:text-white'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>
              {showWhyQA ? 'Hide "Why" Decisions' : `Why This Tech? (${project.whyQuestions.length} Q&As)`}
            </span>
            {showWhyQA ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Expanded Architecture Diagram */}
      {showArchitecture && (
        <ArchitectureDiagram
          nodes={project.architecture.nodes}
          dataFlow={project.architecture.dataFlow}
          onSelectNode={handleNodeClick}
          selectedNodeId={selectedNodeId}
        />
      )}

      {/* Expanded Why Q&A Section */}
      {showWhyQA && project.whyQuestions && (
        <div className="mt-4 p-5 bg-amber-50 dark:bg-slate-900 border-2 border-black dark:border-amber-400/40 rounded-2xl shadow-brutal space-y-4">
          <div className="flex items-center space-x-2 pb-2 border-b border-black/20 dark:border-white/20">
            <HelpCircle className="w-5 h-5 text-funky-pink" />
            <h4 className="font-mono text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
              Architectural Decision Records (ADRs) &amp; Deep-Dive Rationale
            </h4>
          </div>

          <div className="space-y-3 text-sm">
            {project.whyQuestions.map((qa, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-black/20 dark:border-white/10 shadow-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <h5 className="font-bold text-slate-900 dark:text-white mb-1.5 flex items-start">
                    <span className="text-funky-pink font-mono mr-2 font-black">Q:</span>
                    {qa.q}
                  </h5>
                  {qa.tag && (
                    <span className="shrink-0 text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold border">
                      {qa.tag}
                    </span>
                  )}
                </div>
                <p className="text-slate-700 dark:text-slate-300 font-medium pl-6 leading-relaxed">
                  {qa.a}
                </p>
              </div>
            ))}
          </div>

          {/* Key Trade-Off Table if Available */}
          {project.keyTradeoffs && project.keyTradeoffs.length > 0 && (
            <div className="mt-4 pt-3 border-t border-black/10 dark:border-white/10">
              <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-300 mb-2">
                ⚖️ Documented Trade-Off Matrix
              </h5>
              <div className="overflow-x-auto">
                <table className="w-full text-xs font-mono border-collapse">
                  <thead>
                    <tr className="bg-slate-200 dark:bg-slate-800 text-left">
                      <th className="p-2 border border-slate-400">Architectural Decision</th>
                      <th className="p-2 border border-slate-400">Alternative Considered</th>
                      <th className="p-2 border border-slate-400">Rationale &amp; Trade-off</th>
                    </tr>
                  </thead>
                  <tbody>
                    {project.keyTradeoffs.map((item, idx) => (
                      <tr key={idx} className="border-b border-slate-300 dark:border-slate-700">
                        <td className="p-2 font-bold text-slate-900 dark:text-white border border-slate-400">
                          {item.decision}
                        </td>
                        <td className="p-2 text-slate-600 dark:text-slate-400 border border-slate-400">
                          {item.alternative}
                        </td>
                        <td className="p-2 text-slate-800 dark:text-slate-200 border border-slate-400 font-sans">
                          {item.rationale}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
