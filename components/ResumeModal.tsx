'use client';

import React, { useState } from 'react';
import { PROFILE_DATA } from '@/data/profileData';
import { sounds } from '@/lib/soundEffects';
import { X, Printer, Download, Copy, Check, ExternalLink, FileText } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    sounds.playClick();
    window.print();
  };

  const handleCopyLatex = () => {
    sounds.playSuccess();
    const latexResume = `\\documentclass[letterpaper,11pt]{article}
% Fakir Mohan Patra Resume
% Generated from interactive profile
\\begin{document}
Fakir Mohan Patra - Bangalore, IN - fakirmohan@alumni.iitm.ac.in
\\end{document}`;
    navigator.clipboard.writeText(latexResume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-4xl bg-white text-slate-900 rounded-2xl border-4 border-black shadow-brutal-lg max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Action Bar */}
        <div className="flex items-center justify-between p-4 bg-slate-900 text-white border-b-2 border-black shrink-0">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-funky-lime" />
            <span className="font-mono text-sm font-black uppercase tracking-wider">
              Curriculum Vitae — Fakir Mohan Patra
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-funky-lime text-black font-extrabold text-xs rounded-lg border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-lime-300 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Sheet Content (Printable document style) */}
        <div className="p-6 sm:p-10 overflow-y-auto font-sans leading-relaxed text-slate-900 select-text print:p-0">
          {/* Header */}
          <div className="text-center pb-4 border-b border-slate-300">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
              Fakir Mohan Patra
            </h1>
            <div className="mt-2 text-xs sm:text-sm font-medium text-slate-600 flex flex-wrap justify-center items-center gap-x-3 gap-y-1">
              <span>Bangalore, IN</span>
              <span>•</span>
              <span>+91 93483 63260</span>
              <span>•</span>
              <a href="mailto:fakirmohan@alumni.iitm.ac.in" className="text-blue-700 hover:underline">
                fakirmohan@alumni.iitm.ac.in
              </a>
              <span>•</span>
              <a href="https://linkedin.com/in/fakir-mohan-patra/" target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">
                linkedin.com/in/fakir-mohan-patra
              </a>
              <span>•</span>
              <a href="https://github.com/fakirmohanpatra" target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">
                github.com/fakirmohanpatra
              </a>
            </div>
          </div>

          {/* Summary */}
          <div className="mt-5 text-sm text-slate-800 font-medium">
            <p>
              <strong>Backend Engineer</strong> focused on designing and building <strong>distributed, real-time data systems</strong> using <strong>.NET and Orleans</strong>. Strong expertise in <strong>event-driven architectures</strong>, leveraging <strong>Kafka and NATS</strong> to process <strong>high-throughput pipelines (10M+ events/day)</strong> with reliability and low latency. Experienced in architecting <strong>cloud-native systems on Azure</strong>, with emphasis on scalability, fault tolerance, and performance. <strong>IIT Madras</strong> alumnus with proven experience delivering high-impact backend platforms in production environments.
            </p>
          </div>

          {/* Technical Skills */}
          <div className="mt-6">
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 pb-1 border-b-2 border-slate-900">
              Technical Skills
            </h2>
            <ul className="mt-2.5 space-y-1 text-sm text-slate-800">
              <li>
                <strong>Languages &amp; Frameworks:</strong> C#, .NET Core, SQL
              </li>
              <li>
                <strong>Distributed Systems &amp; Streaming:</strong> Orleans (Grains), Kafka, NATS, CQRS, Wolverine
              </li>
              <li>
                <strong>Databases &amp; Cloud:</strong> SQL Server, MongoDB, GreptimeDB, Azure Functions, CI/CD, Docker, Argo CD
              </li>
            </ul>
          </div>

          {/* Experience */}
          <div className="mt-6">
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 pb-1 border-b-2 border-slate-900">
              Experience
            </h2>

            <div className="mt-3 space-y-4">
              <div>
                <div className="flex justify-between items-baseline text-sm">
                  <span className="font-extrabold text-slate-900">Software Developer</span>
                  <span className="text-xs font-mono text-slate-600">July 2023 – Present</span>
                </div>
                <div className="flex justify-between items-baseline text-xs italic text-slate-600 mb-1.5">
                  <span>Falkor</span>
                  <span>Bangalore, IN</span>
                </div>
                <ul className="list-disc list-outside pl-4 space-y-1.5 text-xs text-slate-800 leading-normal">
                  <li>
                    Led a <strong>POC and end-to-end migration</strong> from <strong>SQL Server to GreptimeDB</strong> for high-volume ingestion of <strong>7K+ time-series alert records per minute</strong>; designed a scalable schema with <strong>TTL-based compaction</strong> to prevent production data bloating, eliminate manual cleanup, and retain historical data intelligently for long-term access.
                  </li>
                  <li>
                    Upgraded the messaging platform from <strong>.NET 8 to .NET 10</strong>, modernizing <strong>Wolverine, Kafka, NATS integrations</strong> by replacing custom NATS JetStream initialization with native <strong>NATS.Net v3 capabilities</strong>, building a <strong>plug-and-play messaging abstraction</strong> that enabled customers to switch between Kafka and NATS without application-level changes while simplifying stream and consumer provisioning and improving startup reliability.
                  </li>
                  <li>
                    Designed and implemented a <strong>real-time STT-TTS conversational pipeline</strong> for enterprise voice interactions, enabling customers to engage through live voice conversations instead of typed queries; resolved <strong>concurrency, session management, state isolation, and audio echo issues</strong> to deliver low-latency multi-session experiences, creating a compelling customer demo that became a valuable sales enablement asset during product showcases.
                  </li>
                  <li>
                    Migrated third-party data ingestion services from <strong>Flask to .NET Core</strong>, implementing a <strong>CQRS-based ingestion architecture</strong> that standardized data flows within the .NET ecosystem, <strong>reduced production issue diagnosis time by 30%</strong>, and improved observability through centralized logging and monitoring for faster failure debugging.
                  </li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-baseline text-sm">
                  <span className="font-extrabold text-slate-900">Research &amp; Data Science Intern</span>
                  <span className="text-xs font-mono text-slate-600">2021 – 2022</span>
                </div>
                <div className="flex justify-between items-baseline text-xs italic text-slate-600 mb-1.5">
                  <span>TCS Research &amp; Innovocare HealthSoft Solutions</span>
                  <span>India</span>
                </div>
                <ul className="list-disc list-outside pl-4 space-y-1.5 text-xs text-slate-800 leading-normal">
                  <li>
                    Built data processing pipelines for <strong>biological sequences</strong> and <strong>ECG/EEG time-series data</strong>, applying <strong>BERT-based models</strong> and <strong>FFT/time–frequency analysis</strong> for pattern extraction and anomaly detection.
                  </li>
                  <li>
                    Worked with <strong>large-scale structured and unstructured datasets</strong>, extracting meaningful features for downstream prediction tasks and early-stage diagnostic insights.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="mt-6">
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 pb-1 border-b-2 border-slate-900">
              Education
            </h2>
            <ul className="mt-2.5 space-y-1 text-xs text-slate-800">
              <li className="flex justify-between items-baseline">
                <span><strong>M.Tech, Indian Institute of Technology Madras (IIT Madras)</strong> — Applied Mechanics</span>
                <span className="font-mono text-slate-600">2021 – 2023</span>
              </li>
              <li className="flex justify-between items-baseline">
                <span><strong>B.Tech, Indian Institute of Information Technology, Jabalpur (IIIT Jabalpur)</strong> — Mechanical Engineering</span>
                <span className="font-mono text-slate-600">2015 – 2019</span>
              </li>
            </ul>
          </div>

          {/* Certifications & Achievements */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 pb-1 border-b-2 border-slate-900">
                Certifications
              </h2>
              <p className="mt-2 text-xs text-slate-800">
                Microsoft Certified: Azure AI Fundamentals (AI 900) — June 2025
              </p>
            </div>
            <div>
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 pb-1 border-b-2 border-slate-900">
                Achievements (2023 – 2024)
              </h2>
              <ul className="mt-2 list-disc list-outside pl-4 text-xs text-slate-800 space-y-1">
                <li><strong>(2x) Spotlight Award</strong> for leading Python-to-.NET Core migration and delivering scalable data integration POC.</li>
                <li><strong>Top 5 in AI Hackathon</strong> for building a RAG-based chatbot for domain-specific marketing content generation.</li>
              </ul>
            </div>
          </div>

          {/* Personal Projects */}
          <div className="mt-6">
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 pb-1 border-b-2 border-slate-900">
              Personal Projects
            </h2>
            <div className="mt-2.5">
              <div className="flex justify-between items-baseline text-xs">
                <span className="font-bold text-slate-900">
                  The Dugout – Autonomous AI Media Pipeline
                </span>
                <span className="font-mono text-slate-500 italic">
                  Python, Gemini API, FFmpeg, Docker, YouTube Data API
                </span>
              </div>
              <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-800 mt-1">
                <li>
                  Built an end-to-end automated sports media pipeline publishing <strong>5 daily short-form videos</strong>, integrating multi-source RSS discovery, virality scoring, and <strong>30-day Jaccard-based deduplication</strong>.
                </li>
                <li>
                  Engineered fact-verified scripts and broadcast-style <strong>1080x1920 video generation</strong> with real photography, FFmpeg/MoviePy motion effects, Gemini/Edge TTS, subtitles, and automated platform publishing.
                </li>
                <li>
                  Automated <strong>24/7 cloud execution</strong> using Docker and GitHub Actions with scheduled generation, video processing, thumbnail handling, and multi-platform distribution.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
