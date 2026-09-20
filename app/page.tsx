'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { SearchPalette } from '@/components/SearchPalette';
import { ProjectCard } from '@/components/ProjectCard';
import { NodeDetailModal } from '@/components/NodeDetailModal';
import { WhyQuestionsSection } from '@/components/WhyQuestionsSection';
import { SkillsMatrix } from '@/components/SkillsMatrix';
import { ExperienceTimeline } from '@/components/ExperienceTimeline';
import { ResumeModal } from '@/components/ResumeModal';
import { Footer } from '@/components/Footer';
import { PROJECTS_DATA, ArchitectureNode, Project } from '@/data/profileData';
import { sounds } from '@/lib/soundEffects';
import { Layers, Sparkles, Filter, Terminal, Briefcase } from 'lucide-react';

export default function Home() {
  const [mode, setMode] = useState<'recruiter' | 'architect'>('recruiter');
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode | null>(null);
  const [selectedProjectName, setSelectedProjectName] = useState<string>('');
  const [resumeOpen, setResumeOpen] = useState<boolean>(false);
  const [projectCategory, setProjectCategory] = useState<string>('All');

  const categories = [
    'All',
    'Distributed Systems',
    'AI & Real-Time',
    'Automation & Media',
    'Backend Modernization'
  ];

  const filteredProjects = projectCategory === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === projectCategory);

  const handleSelectNode = (node: ArchitectureNode, projectName: string) => {
    setSelectedNode(node);
    setSelectedProjectName(projectName);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProjectSelectFromSearch = (projectId: string) => {
    const el = document.getElementById(`project-${projectId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-funky-dark transition-colors">
      {/* Top Header */}
      <Header
        mode={mode}
        setMode={setMode}
        onOpenResume={() => setResumeOpen(true)}
      />

      {/* Hero Section */}
      <Hero
        mode={mode}
        onScrollToProjects={() => scrollToSection('projects-section')}
        onScrollToWhy={() => scrollToSection('why-questions')}
        onOpenResume={() => setResumeOpen(true)}
      />

      {/* Instant Search Palette */}
      <SearchPalette onSelectProject={handleProjectSelectFromSearch} />

      {/* Interactive Projects Showcase */}
      <section id="projects-section" className="py-16 border-b-2 border-black dark:border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-funky-yellow text-black font-black text-xs rounded-full border-2 border-black shadow-brutal uppercase tracking-wider mb-2">
                <Terminal className="w-3.5 h-3.5" />
                <span>Interactive Production Deployments</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Architectural Blueprints &amp; Systems
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium max-w-2xl">
                Explore real-world distributed architectures. Click on any component block within the interactive blueprints to uncover benchmarks, code patterns, and failure mode mitigations.
              </p>
            </div>

            {/* Project Filter Pills */}
            <div className="flex flex-wrap gap-1.5 shrink-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    sounds.playClick();
                    setProjectCategory(cat);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all border-2 border-black shadow-brutal active:translate-x-0.5 active:translate-y-0.5 ${
                    projectCategory === cat
                      ? 'bg-funky-lime text-black scale-105'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Projects List */}
          <div className="space-y-10">
            {filteredProjects.map((project, idx) => (
              <div key={project.id} id={`project-${project.id}`}>
                <ProjectCard
                  project={project}
                  onSelectNode={handleSelectNode}
                  defaultExpanded={idx === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Questions Section (Recruiter & Technical Deep Dive) */}
      <WhyQuestionsSection />

      {/* Skills Matrix */}
      <SkillsMatrix />

      {/* Experience & Education */}
      <ExperienceTimeline />

      {/* Footer */}
      <Footer />

      {/* Interactive Architecture Node Detail Modal */}
      <NodeDetailModal
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
        projectName={selectedProjectName}
      />

      {/* Resume Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </main>
  );
}
