'use client';

import React, { useState } from 'react';
import { ArchitectureNode } from '@/data/profileData';
import { sounds } from '@/lib/soundEffects';
import { X, Check, Copy, Code, AlertTriangle, Cpu, ArrowRight } from 'lucide-react';

interface NodeDetailModalProps {
  node: ArchitectureNode | null;
  onClose: () => void;
  projectName?: string;
}

export const NodeDetailModal: React.FC<NodeDetailModalProps> = ({ node, onClose, projectName }) => {
  const [copied, setCopied] = useState(false);

  if (!node) return null;

  const handleCopy = (code: string) => {
    sounds.playSuccess();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border-3 border-black dark:border-white/30 rounded-2xl p-6 shadow-brutal-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="flex items-start justify-between pb-4 border-b-2 border-black dark:border-white/20 mb-5">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-funky-yellow text-black border border-black uppercase tracking-wider">
                {node.badge || 'Architecture Node'}
              </span>
              {projectName && (
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  {projectName}
                </span>
              )}
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {node.name}
            </h2>
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
              {node.role}
            </p>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg border-2 border-black dark:border-white/20 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-brutal active:translate-x-0.5 active:translate-y-0.5"
          >
            <X className="w-5 h-5 text-black dark:text-white" />
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-4 text-sm">
          {/* Technology Used */}
          <div className="p-3 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-black dark:border-white/20 flex items-center justify-between font-mono">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider flex items-center">
              <Cpu className="w-4 h-4 mr-1.5 text-blue-500" /> Technology / Protocol:
            </span>
            <span className="font-extrabold text-slate-900 dark:text-white">
              {node.tech}
            </span>
          </div>

          {/* Why was this chosen? */}
          {node.whyChosen && (
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border-2 border-emerald-600 dark:border-emerald-500/40 rounded-xl">
              <h4 className="font-black text-emerald-900 dark:text-emerald-300 text-xs uppercase tracking-wider mb-1">
                💡 Why this component was chosen over alternatives
              </h4>
              <p className="text-emerald-950 dark:text-emerald-200 leading-relaxed font-medium">
                {node.whyChosen}
              </p>
            </div>
          )}

          {/* Architectural Trade-off */}
          {node.tradeoff && (
            <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-600 dark:border-amber-500/40 rounded-xl">
              <h4 className="font-black text-amber-900 dark:text-amber-300 text-xs uppercase tracking-wider mb-1">
                ⚖️ Architectural Trade-off &amp; Rationale
              </h4>
              <p className="text-amber-950 dark:text-amber-200 leading-relaxed font-medium">
                {node.tradeoff}
              </p>
            </div>
          )}

          {/* Failure Mode & Resilience */}
          {node.failureMode && (
            <div className="p-4 bg-rose-50 dark:bg-rose-950/30 border-2 border-rose-500 dark:border-rose-500/40 rounded-xl">
              <h4 className="font-black text-rose-900 dark:text-rose-300 text-xs uppercase tracking-wider mb-1 flex items-center">
                <AlertTriangle className="w-3.5 h-3.5 mr-1 text-rose-600" /> Failure Modes &amp; Resilience Strategy
              </h4>
              <p className="text-rose-950 dark:text-rose-200 leading-relaxed font-medium">
                {node.failureMode}
              </p>
            </div>
          )}

          {/* Code Snippet / Implementation Pattern */}
          {node.codeSnippet && (
            <div className="mt-4">
              <div className="flex items-center justify-between pb-1.5">
                <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 flex items-center">
                  <Code className="w-3.5 h-3.5 mr-1" /> Implementation Pattern / Code
                </span>
                <button
                  onClick={() => handleCopy(node.codeSnippet!)}
                  className="flex items-center space-x-1 text-xs font-mono font-bold px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded hover:bg-slate-300 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-500" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Snippet</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3 bg-slate-950 text-funky-lime rounded-xl border-2 border-black font-mono text-xs overflow-x-auto leading-relaxed">
                <code>{node.codeSnippet}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="px-4 py-2 bg-funky-lime text-black font-extrabold text-sm border-2 border-black rounded-lg shadow-brutal hover:bg-lime-300 active:translate-x-0.5 active:translate-y-0.5"
          >
            Close Deep-Dive
          </button>
        </div>
      </div>
    </div>
  );
};
