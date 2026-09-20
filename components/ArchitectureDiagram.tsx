'use client';

import React from 'react';
import { ArchitectureNode } from '@/data/profileData';
import { sounds } from '@/lib/soundEffects';
import { ArrowRight, Info, Zap, Terminal } from 'lucide-react';

interface ArchitectureDiagramProps {
  nodes: ArchitectureNode[];
  dataFlow: string[];
  onSelectNode: (node: ArchitectureNode) => void;
  selectedNodeId?: string;
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({
  nodes,
  dataFlow,
  onSelectNode,
  selectedNodeId,
}) => {
  return (
    <div className="mt-4 bg-slate-900 text-white rounded-2xl p-4 sm:p-6 border-3 border-black shadow-brutal-lg">
      {/* Header bar of the blueprint */}
      <div className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-700 gap-2">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
          </div>
          <span className="font-mono text-xs font-bold text-funky-cyan tracking-wider uppercase flex items-center">
            <Terminal className="w-3.5 h-3.5 mr-1" /> Interactive Architecture Blueprint
          </span>
        </div>
        <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-600">
          💡 Click any block to inspect design decisions &amp; code
        </span>
      </div>

      {/* Interactive Visual Node Pipeline */}
      <div className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {nodes.map((node, index) => {
            const isSelected = selectedNodeId === node.id;
            return (
              <div
                key={node.id}
                onClick={() => {
                  sounds.playPop();
                  onSelectNode(node);
                }}
                className={`relative group p-4 rounded-xl border-2 transition-all cursor-pointer select-none ${
                  isSelected
                    ? 'bg-funky-lime text-black border-white shadow-brutal-white scale-[1.02]'
                    : 'bg-slate-800/90 text-white border-slate-600 hover:border-funky-cyan hover:bg-slate-800 hover:-translate-y-1 shadow-brutal'
                }`}
              >
                {/* Node Step Index & Badge */}
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black font-mono border ${
                      isSelected
                        ? 'bg-black text-funky-lime border-black'
                        : 'bg-slate-900 text-funky-cyan border-funky-cyan/40'
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                      isSelected
                        ? 'bg-black text-white border-black'
                        : 'bg-slate-900/80 text-funky-yellow border-funky-yellow/40'
                    }`}
                  >
                    {node.badge || 'Component'}
                  </span>
                </div>

                {/* Node Name */}
                <h4
                  className={`font-black text-base leading-tight tracking-tight mb-1 ${
                    isSelected ? 'text-black' : 'text-white group-hover:text-funky-cyan'
                  }`}
                >
                  {node.name}
                </h4>

                {/* Role */}
                <p
                  className={`text-xs mb-3 font-medium line-clamp-2 ${
                    isSelected ? 'text-slate-800' : 'text-slate-300'
                  }`}
                >
                  {node.role}
                </p>

                {/* Tech Pill & Inspect Hint */}
                <div className="flex items-center justify-between pt-2 border-t border-dashed border-slate-700/60 text-[11px] font-mono">
                  <span
                    className={`font-bold truncate max-w-[150px] ${
                      isSelected ? 'text-black' : 'text-funky-cyan'
                    }`}
                  >
                    {node.tech}
                  </span>
                  <span
                    className={`font-bold flex items-center shrink-0 ${
                      isSelected ? 'text-black' : 'text-slate-400 group-hover:text-white'
                    }`}
                  >
                    <Info className="w-3 h-3 mr-1" /> Inspect
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sequential Data Flow Walkthrough */}
      <div className="mt-6 pt-5 border-t border-slate-700/80">
        <h5 className="font-mono text-xs font-black uppercase tracking-wider text-funky-yellow flex items-center mb-3">
          <Zap className="w-3.5 h-3.5 mr-1.5 text-funky-yellow" /> End-to-End Execution Sequence
        </h5>
        <div className="space-y-1.5 font-mono text-xs text-slate-300">
          {dataFlow.map((step, idx) => (
            <div key={idx} className="flex items-start space-x-2 py-1 px-2 rounded hover:bg-slate-800/60">
              <span className="text-funky-lime font-bold shrink-0">➜</span>
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
