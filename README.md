# Fakir Mohan Patra — Interactive Engineering Profile

An illustrative, funky, and ultra-interactive profile application engineered for **HR recruiters**, **Engineering Hiring Managers**, and **Staff+ Technical Interviewers**.

Built with **Next.js 14 (React 18 + Tailwind CSS)** and a **Python FastAPI backend in `.venv`**, ready for zero-config **Vercel deployment**.

---

## ⚡ Highlights & Key Features

- **Dual-Persona Mode Switcher**:
  - **⚡ HR Fast-Pass**: 60-second summary, core competencies, awards (2x Spotlight Award at Kongsberg Digital), education (IIT Madras M.Tech), 1-click contact copy with confetti, and printable resume.
  - **🛠️ Architect & Tech Lead Mode**: Full system design blueprints, Architectural Decision Records (ADRs), trade-off matrices, benchmark numbers, and production bug post-mortems.
- **Interactive Visual Architecture Blueprints**:
  - Click on **any component node** in the system diagrams (e.g. *GreptimeDBIngester*, *RealtimeVoiceWebSocketBridge*, *ChatMessageSanitizer*, *DedupGate*, *Frame 0 CTR*) to inspect:
    - Why that specific component was chosen over alternatives
    - Documented architectural trade-offs
    - Exact code patterns & implementations
    - Failure modes and resilience strategies (timeouts, orphaned tool-calls, dead-letter queues)
- **Flagship Production Systems Showcased**:
  1. **SitecomAlert (SQL Server to GreptimeDB Migration)**: ~18,500 rows/sec gRPC ingestion, 519ms filtered queries at 10M+ records, automated 30-day storage TTL.
  2. **Enterprise GPT-Realtime Voice AI (KvantumX)**: Low-latency WebSocket byte-pump with zero API key leaks, tool serialization, silence streaming, and private-cloud offline fallback.
  3. **The Dugout (Autonomous AI Media Pipeline)**: 5 daily videos to YouTube Shorts & Reels, Jaccard 30-day dedup, Frame 0 algorithmic CTR injection, zero-hallucination regex guard.
  4. **.NET 10 & Wolverine Modernization**: Upgraded from .NET 8, native NATS JetStream stream provisioning, Orleans virtual actors.
  5. **CQRS Telemetry Modernization**: Flask to .NET Core migration with separated command/query pipelines and Argo CD.
- **"Why Questions" & Recruiter Cheat Sheet**:
  - Comprehensive answers to high-stakes interview questions with documented trade-off comparisons.
- **Interactive Skills Arsenal**:
  - Categorized matrix with depth indicators, years of experience, and production context.
- **Instant Search Palette**:
  - Real-time search across projects, technologies, and design concepts.
- **Printable / Clean Resume View**:
  - Formatted after the LaTeX curriculum vitae with print-to-PDF support.
- **Funky Neo-Brutalist Engineering Aesthetics**:
  - High-voltage palette (Lime, Cyan, Pink, Amber), bold drop shadows, and self-contained 8-bit synthesizer sound effects via Web Audio API.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS (Neo-brutalist theme), Lucide Icons, Canvas Confetti.
- **Backend / API**: Python 3.9+ FastAPI in `.venv`, Uvicorn, Pydantic, HTTPX.
- **Deployment**: Vercel Native (`vercel.json` serverless rewrite + `@vercel/python`).

---

## 🚀 Local Development Setup

### 1. Python Virtual Environment (`.venv`)
The project includes a ready-to-use virtual environment:

```bash
# Activate virtual environment
source .venv/bin/activate

# (Optional) Verify dependencies
pip install -r requirements.txt
```

### 2. Start Backend API (FastAPI)
```bash
# Runs Uvicorn on http://127.0.0.1:8000
npm run fastapi-dev
```

### 3. Start Frontend (Next.js)
In a separate terminal:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the interactive application.

---

## ☁️ Vercel Deployment Guide

Deploying this project to Vercel takes less than 2 minutes:

### Option A: Using the Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option B: Deploy via GitHub (Recommended)
1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: initial interactive engineering profile"
   git remote add origin https://github.com/fakirmohanpatra/my-profile.git
   git push -u origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import the `my-profile` repository.
4. Click **Deploy**. Vercel will automatically detect Next.js and the Python FastAPI serverless endpoint configured in `vercel.json`!

---

## 📬 Contact

- **Name**: Fakir Mohan Patra
- **Email**: [fakirmohan@alumni.iitm.ac.in](mailto:fakirmohan@alumni.iitm.ac.in)
- **Phone**: +91 93483 63260
- **LinkedIn**: [linkedin.com/in/fakir-mohan-patra](https://www.linkedin.com/in/fakir-mohan-patra/)
- **GitHub**: [github.com/fakirmohanpatra](https://github.com/fakirmohanpatra)
