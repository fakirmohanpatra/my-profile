from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List, Dict, Any

app = FastAPI(
    title="Fakir Mohan Patra - Interactive Engineering Profile API",
    description="Backend API powering the interactive portfolio for hiring managers, tech leads, and HR recruiters.",
    version="1.0.0"
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

PROFILE_DATA = {
    "name": "Fakir Mohan Patra",
    "title": "Backend Engineer",
    "tagline": "Designing and building distributed, real-time data systems using .NET and Orleans. Strong expertise in event-driven architectures with Kafka and NATS (10M+ events/day) on Azure.",
    "location": "Bangalore, IN",
    "phone": "+91 93483 63260",
    "email": "fakirmohan@alumni.iitm.ac.in",
    "linkedin": "https://www.linkedin.com/in/fakir-mohan-patra/",
    "github": "https://github.com/fakirmohanpatra",
    "education": [
        {
            "degree": "M.Tech in Applied Mechanics",
            "institution": "Indian Institute of Technology Madras (IIT Madras)",
            "period": "2021 – 2023",
            "highlights": "Deep focus on mathematical modeling, computational systems, and advanced algorithmic analysis."
        },
        {
            "degree": "B.Tech in Mechanical Engineering",
            "institution": "Indian Institute of Information Technology, Jabalpur (IIIT Jabalpur)",
            "period": "2015 – 2019",
            "highlights": "Strong foundation in computational mechanics, robotics, and systems engineering."
        }
    ],
    "certifications": [
        {
            "name": "Microsoft Certified: Azure AI Fundamentals (AI 900)",
            "issued": "June 2025",
            "badge": "Azure AI Fundamentals"
        }
    ],
    "awards": [
        {
            "title": "2x Spotlight Award",
            "organization": "Falkor",
            "year": "2023 – 2024",
            "description": "Recognized twice for engineering excellence: leading the Python-to-.NET Core migration and delivering a scalable data integration POC."
        },
        {
            "title": "Top 5 in AI Hackathon",
            "organization": "Enterprise AI Innovation Challenge",
            "year": "2024",
            "description": "Built a RAG-based chatbot for domain-specific marketing content generation with semantic retrieval and grounded citations."
        }
    ],
    "stats": [
        {"label": "Daily Events Processed", "value": "10M+", "sub": "Kafka & NATS pipelines"},
        {"label": "Time-Series Ingestion", "value": "7K+/min", "sub": "GreptimeDB alert stream"},
        {"label": "Issue Diagnosis Time", "value": "-30%", "sub": "Centralized observability"},
        {"label": "Autonomous Videos", "value": "5 / day", "sub": "The Dugout AI pipeline"},
        {"label": "Runtime Modernization", "value": ".NET 10", "sub": "Wolverine + NATS.Net v3"}
    ]
}

PROJECTS_DATA = [
    {
        "id": "greptimedb-migration",
        "title": "Time-Series Alert Ingestion & GreptimeDB Migration",
        "tagline": "Led POC and end-to-end migration from SQL Server to GreptimeDB for high-volume ingestion of 7K+ time-series alert records per minute with automated TTL-based compaction.",
        "company": "Falkor",
        "category": "Distributed Systems / Databases",
        "featured": True,
        "impactMetrics": [
            {"metric": "7K+/min", "label": "Alert Ingestion Rate"},
            {"metric": "Sub-Second", "label": "Query Response Time"},
            {"metric": "Auto TTL", "label": "Compaction & Retention"},
            {"metric": "Dual-Write", "label": "Zero-Downtime Cutover"}
        ],
        "techStack": ["GreptimeDB", "C# / .NET Core", "gRPC", "PostgreSQL Protocol", "SQL Server", "PromQL", "Grafana", "Docker"],
        "problemStatement": "Alert data storage on SQL Server faced severe scalability bottlenecks as historical volume accumulated. High-volume ingestion struggled under lock contention, manual retention cleanup jobs caused database blocking, and relational storage lacked efficient time-series compaction.",
        "solution": "Led a POC and end-to-end migration from SQL Server to GreptimeDB for high-volume ingestion of 7K+ time-series alert records per minute; designed a scalable schema with TTL-based compaction to prevent production data bloating, eliminate manual cleanup, and retain historical data intelligently for long-term access. Implemented a dual-write transition strategy and leveraged an in-house gRPC client for ingestion with PostgreSQL wire protocol for application querying.",
        "architecture": {
            "nodes": [
                {"id": "ingest", "name": "Telemetry Ingestion", "role": "Raw Alert Stream", "tech": "Kafka / Wolverine"},
                {"id": "grpc", "name": "GreptimeDBIngester", "role": "High-speed gRPC Client", "tech": "In-house gRPC Client"},
                {"id": "greptime", "name": "GreptimeDB Cluster", "role": "Time-Series Store with Automated TTL", "tech": "PromQL / Tags & TimeIndex"},
                {"id": "query", "name": "Query Engine", "role": "Hydrates Alert Details", "tech": "Postgres Wire Protocol"},
                {"id": "sqlserver", "name": "SQL Server (Relational)", "role": "Retains UserNotification & Settings", "tech": "Entity Framework Core"}
            ],
            "dataFlow": [
                "1. Alerts arrive via Kafka/Wolverine consumers",
                "2. Dual-write during transition: writes to SQL Server and GreptimeDB concurrently",
                "3. Ingest via gRPC ingester processing 7K+ alert records/min",
                "4. Reads migrated to hydrate alert details directly from GreptimeDB via Postgres protocol with sub-second latencies",
                "5. Automatic TTL-based compaction purges expired records at storage layer without manual cleanup jobs"
            ]
        },
        "whyQuestions": [
            {
                "q": "Why GreptimeDB instead of TimescaleDB or ClickHouse?",
                "a": "GreptimeDB offers native dual-protocol support (gRPC for high-volume ingest + Postgres/PromQL for familiar querying), lightweight cloud-native clustering, and seamless Prometheus/Grafana compatibility. TimescaleDB had relational overhead, while GreptimeDB's columnar time-series compression and built-in TTL eliminated manual retention scripts."
            },
            {
                "q": "Why reuse in-house gRPC client instead of official GreptimeDB .NET SDK?",
                "a": "The official GreptimeDB .NET SDK was still in early incubation. Reusing our battle-tested in-house GreptimeDBIngester gRPC client eliminated experimental third-party dependency risks while delivering reliable high-throughput ingestion."
            },
            {
                "q": "What architectural trade-offs were made?",
                "a": "1) Referential Integrity: Moved from DB constraints to application layer since foreign keys don't span SQL Server and GreptimeDB. 2) OData syntax: Removing SQL Server navigation properties required denormalizing fields onto UserNotification. 3) Create-Only (CR) pattern: Alerts are append-only; updates and manual deletes are avoided in favor of TTL."
            }
        ]
    },
    {
        "id": "gpt-realtime-voice",
        "title": "Enterprise Real-Time Voice AI Conversational Pipeline",
        "tagline": "Real-time STT-TTS conversational pipeline for enterprise voice interactions, delivering low-latency multi-session experiences.",
        "company": "Falkor",
        "category": "AI & Real-Time Streaming",
        "featured": True,
        "impactMetrics": [
            {"metric": "Low Latency", "label": "Multi-Session Voice Engine"},
            {"metric": "Zero Leaks", "label": "Server-Side Byte-Pump Relay"},
            {"metric": "Isolated", "label": "Session State & Concurrency"},
            {"metric": "Demo Asset", "label": "Sales Enablement Showcase"}
        ],
        "techStack": ["OpenAI GPT Realtime", "WebSockets", "C# / .NET", "Piper Neural TTS", "Whisper", "VAD", "Kubernetes", "Enterprise Agent Protocol"],
        "problemStatement": "Enterprise operations required hands-free conversational voice assistance instead of typed queries. Early implementations faced concurrency race conditions, session state corruption across multi-turn exchanges, audio echo, and connection dropouts during silent intervals.",
        "solution": "Designed and implemented a real-time STT-TTS conversational pipeline for enterprise voice interactions, enabling customers to engage through live voice conversations instead of typed queries; resolved concurrency, session management, state isolation, and audio echo issues to deliver low-latency multi-session experiences, creating a compelling customer demo that became a valuable sales enablement asset during product showcases.",
        "architecture": {
            "nodes": [
                {"id": "client", "name": "Browser / Mobile Client", "role": "Captures mic audio & plays PCM stream", "tech": "Web Audio API"},
                {"id": "bridge", "name": "Voice WebSocket Bridge", "role": "Secure Byte-Pump & Auth Guard", "tech": "C# ASP.NET Core WS"},
                {"id": "realtime", "name": "OpenAI GPT-Realtime", "role": "Native Speech-to-Speech", "tech": "GPT Realtime WebSocket"},
                {"id": "orchestrator", "name": "Orchestrator Agent", "role": "Single Source of Truth Tool Calling", "tech": "Enterprise Orchestrator API"},
                {"id": "fallback", "name": "Private-Cloud Fallback", "role": "Offline VAD + Whisper + Piper TTS", "tech": "Local Neural Audio"}
            ],
            "dataFlow": [
                "1. Browser connects via authenticated WebSocket to RealtimeVoiceWebSocketBridge",
                "2. Backend proxies raw PCM bytes to OpenAI GPT-Realtime with server-side API keys",
                "3. Model triggers single tool: `ask_orchestrator_agent` for domain logic",
                "4. Tool execution is strictly serialized per session to avoid state corruption",
                "5. If offline or cloud fails, server dynamically switches to Flow 2 (VAD + Whisper + Piper TTS)"
            ]
        },
        "whyQuestions": [
            {
                "q": "Why a server-side WebSocket byte-pump instead of browser connecting directly to OpenAI?",
                "a": "Security and governance: Browser-direct connection would expose the enterprise OpenAI API key or require short-lived client tokens that cannot enforce tool-call governance. The byte-pump ensures zero client exposure, enforces message sanitization, and allows instant failover to the local Piper/Whisper stack."
            },
            {
                "q": "How did you solve the garbled multi-turn voice responses?",
                "a": "Identified that parallel tool calls were mutating shared conversation state asynchronously. We implemented a strict per-session concurrency lock queue, serializing tool executions so the audio stream never interleaves out-of-order context."
            },
            {
                "q": "Why were connections dropping when operators muted?",
                "a": "WebRTC/WebSocket voice protocols time out when silence is detected as empty frames. Fixed by streaming continuous synthetic silence PCM frames during mute, keeping TCP sockets and voice sessions alive indefinitely."
            },
            {
                "q": "What was ChatMessageSanitizer?",
                "a": "When an agentic voice turn failed midway, orphaned tool calls without corresponding tool-outputs lingered in history. Next turn, OpenAI rejected the payload with HTTP 400. ChatMessageSanitizer inspects and auto-heals poisoned history graphs prior to dispatch."
            }
        ]
    },
    {
        "id": "the-dugout-media-pipeline",
        "title": "The Dugout: Autonomous AI Media Pipeline",
        "tagline": "End-to-end autonomous sports media pipeline publishing 5 daily broadcast-grade short videos to YouTube Shorts & Instagram Reels with fact-verified scripts and automated publishing.",
        "company": "Personal Engineering Project",
        "category": "AI Automation & Computer Vision",
        "featured": True,
        "impactMetrics": [
            {"metric": "5 videos/day", "label": "Daily Autonomous Output"},
            {"metric": "Fact-Audited", "label": "Deterministic Regex + Grounding"},
            {"metric": "Frame 0 CTR", "label": "Custom Thumbnail Algorithmic Injection"},
            {"metric": "24/7 Cloud", "label": "Docker & GitHub Actions Execution"}
        ],
        "techStack": ["Python", "Google Gemini API", "FFmpeg / MoviePy", "Docker", "Edge-TTS", "YouTube Data API v3", "Meta Graph API", "GitHub Actions"],
        "problemStatement": "Creating viral sports short-form video content requires constant breaking news monitoring, verified stats, compelling scriptwriting, dynamic video editing, and scheduled publishing across multiple platforms. Doing this manually costs 4+ hours daily.",
        "solution": "Engineered an autonomous 5-stage pipeline: RSS Discovery with custom virality scoring, 30-day Jaccard deduplication, 5-beat retention scriptwriter across 4 personas, dual-engine voice synthesis (Gemini Puck + Edge-TTS fallback), authentic Wikimedia photo retrieval with Ken Burns sweeps, and automated Frame 0 publishing.",
        "architecture": {
            "nodes": [
                {"id": "rss", "name": "Trend Discovery & Scoring", "role": "Weighted virality formula (+7 Team India, +5 Stars)", "tech": "Multi-Feed RSS + Quota Balancer"},
                {"id": "dedup", "name": "30-Day Dedup Shield", "role": "Jaccard similarity >= 35% + entity cooldown", "tech": "Git-backed JSON storage"},
                {"id": "editor", "name": "5-Beat Scriptwriter", "role": "Hook -> Conflict -> Stat -> Impact -> CTA", "tech": "Gemini 2.5 + 4 Creator Personas"},
                {"id": "fact", "name": "Fact-Checker Gate", "role": "Regex score/wicket extraction + LLM grounding", "tech": "Zero-Tolerance Grounding"},
                {"id": "render", "name": "Audio/Visual Compositor", "role": "1080x1920, Ken Burns, Subtitle cues, Frame 0", "tech": "MoviePy / FFmpeg + Edge-TTS"},
                {"id": "publish", "name": "Multi-Platform Uploader", "role": "YouTube Shorts + Instagram Reels", "tech": "YouTube API v3 + Meta Graph API"}
            ],
            "dataFlow": [
                "1. Scrapes breaking cricket/javelin/chess feeds and scores virality",
                "2. Checks 30-day topic history using Jaccard keyword overlap to prevent repeats",
                "3. Generates 95-115 word script in Hinglish matching persona voice",
                "4. Regex isolates every numerical claim; LLM statistician audits against source article",
                "5. Dual-engine TTS produces voice; MoviePy renders Ken Burns vertical 1080x1920 video",
                "6. Embeds custom thumbnail at Frame 0 and dispatches via YouTube & Meta APIs on 5 daily cron slots"
            ]
        },
        "whyQuestions": [
            {
                "q": "Why authentic press photography instead of Midjourney or Flux AI images?",
                "a": "Generative AI notoriously distorts recognizable athlete faces, team jerseys, sponsor badges, and cricket bat grips, resulting in uncanny outputs rejected by sports fans. Fetching verified press/Wikimedia photography guarantees 100% authenticity at zero API cost."
            },
            {
                "q": "Why embed the custom thumbnail into Frame 0?",
                "a": "The YouTube Shorts API does not support separate thumbnail uploads. By rendering the high-CTR custom thumbnail as Frame 0 (first frame) of the MP4 video, YouTube's algorithm automatically uses it as the default preview card in search and feeds."
            },
            {
                "q": "Why dual-engine TTS (Gemini Native Audio + Edge-TTS fallback)?",
                "a": "Gemini Native Audio ('Puck') delivers emotional inflection, but API quotas or transient network latency can stall an automated cron pipeline. Fallback to Microsoft Edge-TTS (en-IN-PrabhatNeural) guarantees 99.9% uptime without human intervention."
            },
            {
                "q": "Why Git-backed state sync instead of DynamoDB or Redis?",
                "a": "To keep the entire infrastructure serverless and zero-cost. Storing the 30-day topic history directly in a git repository and committing via GitHub Actions with `[skip ci]` eliminates monthly cloud database bills."
            }
        ]
    },
    {
        "id": "dotnet-messaging-upgrade",
        "title": ".NET 10 & Wolverine Messaging Platform Modernization",
        "tagline": "Upgraded enterprise messaging platform from .NET 8 to .NET 10, modernizing Wolverine, Kafka, and NATS integrations with native NATS.Net v3 capabilities.",
        "company": "Falkor",
        "category": "Cloud & Infrastructure",
        "featured": False,
        "impactMetrics": [
            {"metric": ".NET 10", "label": "Target Runtime Modernized"},
            {"metric": "NATS.Net v3", "label": "Native Capabilities Adopted"},
            {"metric": "Plug-and-Play", "label": "Kafka & NATS Abstraction"},
            {"metric": "Reliable", "label": "Stream & Consumer Provisioning"}
        ],
        "techStack": [".NET 10", "C#", "Wolverine", "NATS JetStream", "Apache Kafka", "Microsoft Orleans", "Docker", "Kubernetes"],
        "problemStatement": "The enterprise messaging platform supported multiple brokers via generic abstractions, but NATS JetStream required substantial custom initialization and consumer plumbing around Wolverine. As the team targeted .NET 10, maintaining redundant custom wrappers increased technical debt and operational complexity.",
        "solution": "Upgraded the messaging platform from .NET 8 to .NET 10, modernizing Wolverine, Kafka, NATS integrations by replacing custom NATS JetStream initialization with native NATS.Net v3 capabilities, building a plug-and-play messaging abstraction that enabled customers to switch between Kafka and NATS without application-level changes while simplifying stream and consumer provisioning and improving startup reliability.",
        "architecture": {
            "nodes": [
                {"id": "orleans", "name": "Orleans Grains", "role": "Virtual Actor State & Workflows", "tech": "Microsoft Orleans (.NET 10)"},
                {"id": "wolverine", "name": "Wolverine Bus", "role": "Mediator & Generic Message Transport", "tech": "Wolverine Modernized"},
                {"id": "nats", "name": "NATS JetStream", "role": "High-Throughput Streaming & Persistence", "tech": "Native Auto-Provisioning"},
                {"id": "kafka", "name": "Apache Kafka", "role": "Enterprise Event Log", "tech": "Event Stream Consumers"}
            ],
            "dataFlow": [
                "1. Upgraded application runtime to .NET 10 with Wolverine and Orleans package updates",
                "2. Replaced custom NATS JetStream bootstrap with native Wolverine stream declarations",
                "3. Automated consumer group provisioning and subscription lifecycle management",
                "4. Enhanced broker diagnostics to isolate transient connection drops from configuration faults"
            ]
        },
        "whyQuestions": [
            {
                "q": "Why eliminate custom NATS initialization in favor of Wolverine native capabilities?",
                "a": "Custom boilerplate creates maintenance debt and divergence across broker implementations. Newer Wolverine and NATS.Net v3 capabilities provide first-class native JetStream stream and consumer provisioning, simplifying startup and reducing code bloat."
            },
            {
                "q": "How did startup exception handling improve reliability?",
                "a": "Previously, idempotent errors (e.g. stream already exists) occasionally triggered panic restarts in Kubernetes. We categorized exceptions into benign/ignorable vs terminal, enabling clean deterministic startup across multi-pod clusters."
            }
        ]
    },
    {
        "id": "flask-to-dotnet-cqrs",
        "title": "CQRS Ingestion Service Migration (Flask to .NET Core)",
        "tagline": "Migrated third-party telemetry ingestion services from Flask to .NET Core with a CQRS architecture, cutting issue diagnosis time by 30% and improving observability.",
        "company": "Falkor",
        "category": "Backend Modernization",
        "featured": False,
        "impactMetrics": [
            {"metric": "CQRS", "label": "Decoupled Command/Query Flow"},
            {"metric": "-30%", "label": "Issue Diagnosis Time"},
            {"metric": "Standardized", "label": ".NET Ecosystem Flows"},
            {"metric": "Centralized", "label": "Logging & Observability"}
        ],
        "techStack": [".NET Core", "C#", "CQRS", "Flask / Python", "Docker", "Argo CD", "OpenTelemetry"],
        "problemStatement": "Third-party data ingestion microservices were built on Flask, creating operational friction with the rest of the .NET enterprise platform, lacking unified telemetry and centralized logging, and making failure diagnosis slow and fragmented.",
        "solution": "Migrated third-party data ingestion services from Flask to .NET Core, implementing a CQRS-based ingestion architecture that standardized data flows within the .NET ecosystem, reduced production issue diagnosis time by 30%, and improved observability through centralized logging and monitoring for faster failure debugging.",
        "architecture": {
            "nodes": [
                {"id": "source", "name": "3rd Party Telemetry Source", "role": "Field Sensors & Well Data", "tech": "HTTP / Webhook"},
                {"id": "command", "name": "Command Handler (Write)", "role": "Validates & publishes raw events", "tech": ".NET Core CQRS Command"},
                {"id": "store", "name": "Event Store / Buffer", "role": "Durable staging queue", "tech": "Kafka / In-memory"},
                {"id": "query", "name": "Query Handler (Read)", "role": "Aggregations & Operational Dashboards", "tech": ".NET Core CQRS Query"}
            ],
            "dataFlow": [
                "1. Webhooks ingest sensor feeds into Command Handler",
                "2. Validates payloads and emits domain events",
                "3. Query handlers asynchronously update operational read models",
                "4. Monitored via centralized logging and monitoring, deployed with Argo CD"
            ]
        },
        "whyQuestions": [
            {
                "q": "Why migrate from Flask to .NET Core?",
                "a": "Standardizing on .NET Core unified codebases, reduced DevOps overhead, shared enterprise libraries (auth, tracing, metrics), and provided superior multi-threaded CPU throughput for high-frequency sensor ingestion."
            }
        ]
    },
    {
        "id": "biosignals-nlp-research",
        "title": "Biological Sequences & ECG/EEG Time-Series Analysis",
        "tagline": "Engineered signal processing and transformer pipelines for bio-sequences and physiological telemetry anomaly detection.",
        "company": "TCS Research & Innovocare HealthSoft",
        "category": "Data Science & Signal Processing",
        "featured": False,
        "impactMetrics": [
            {"metric": "BERT + FFT", "label": "Hybrid Time-Frequency Architecture"},
            {"metric": "Multimodal", "label": "ECG, EEG & Genomic Sequences"}
        ],
        "techStack": ["Python", "PyTorch", "BERT", "FFT / Wavelets", "NumPy / SciPy", "Pandas"],
        "problemStatement": "Early diagnostic detection required extracting deep non-linear patterns across high-dimensional physiological time-series and genomic sequences.",
        "solution": "Built automated data processing pipelines combining Fast Fourier Transform (FFT) / time-frequency wavelets with transformer embeddings (BERT) for feature extraction and anomaly classification.",
        "architecture": {
            "nodes": [
                {"id": "raw", "name": "Bio-Telemetry Stream", "role": "Raw ECG, EEG, DNA sequences", "tech": "Sensors / FASTA"},
                {"id": "fft", "name": "FFT & Spectral Filter", "role": "Denoising & time-frequency mapping", "tech": "SciPy / NumPy"},
                {"id": "transformer", "name": "Transformer Feature Extractor", "role": "Sequence embedding representation", "tech": "BERT / PyTorch"},
                {"id": "classifier", "name": "Diagnostic Classifier", "role": "Predictive anomaly scorer", "tech": "Deep Learning"}
            ],
            "dataFlow": [
                "1. Ingest raw time-series signals and genetic sequences",
                "2. Filter high-frequency noise using spectral wavelets and FFT",
                "3. Tokenize sequences and generate semantic contextual embeddings",
                "4. Train anomaly models for early diagnostic alerts"
            ]
        },
        "whyQuestions": [
            {
                "q": "Why combine FFT with Transformers?",
                "a": "FFT captures periodic cyclical physiological frequencies (heart rate variability, brain wave bands), while Transformers capture long-range contextual sequence dependencies, giving superior classification accuracy over purely recurrent models."
            }
        ]
    }
]

SKILLS_DATA = [
    {
        "category": "Languages & Core",
        "items": [
            {"name": "C# / .NET (8 & 10)", "level": "Expert", "icon": "Code2", "years": "3+ yrs", "details": "High-performance async backend services, memory management, LINQ, gRPC"},
            {"name": "Python", "level": "Expert", "icon": "FileCode", "years": "4+ yrs", "details": "FastAPI, PyTorch, MoviePy, signal processing, AI orchestration"},
            {"name": "SQL & Relational", "level": "Advanced", "icon": "Database", "years": "3+ yrs", "details": "Schema design, indexing, query optimization, SQL Server, PostgreSQL"}
        ]
    },
    {
        "category": "Distributed Systems & Streaming",
        "items": [
            {"name": "Microsoft Orleans", "level": "Advanced", "icon": "Layers", "years": "2+ yrs", "details": "Virtual actor model, grain lifecycle, distributed state isolation"},
            {"name": "Apache Kafka", "level": "Advanced", "icon": "Share2", "years": "2+ yrs", "details": "Event-driven pipelines, partition strategies, high-throughput consumer groups (10M+/day)"},
            {"name": "NATS & JetStream", "level": "Advanced", "icon": "Zap", "years": "2+ yrs", "details": "Low-latency pub/sub, JetStream persistence, native Wolverine integration"},
            {"name": "Wolverine", "level": "Advanced", "icon": "Cpu", "years": "2+ yrs", "details": "Command bus, mediator, transactional inbox/outbox, multi-broker routing"},
            {"name": "CQRS & Event Sourcing", "level": "Advanced", "icon": "Split", "years": "2+ yrs", "details": "Command-query segregation, domain events, read-model denormalization"}
        ]
    },
    {
        "category": "Databases & Storage",
        "items": [
            {"name": "GreptimeDB", "level": "Expert", "icon": "Clock", "years": "1+ yr", "details": "Time-series design, PromQL, gRPC ingestion (7K+/min), TTL-based compaction"},
            {"name": "SQL Server", "level": "Advanced", "icon": "Server", "years": "3+ yrs", "details": "Migration, stored procedures, execution plan tuning, dual-write cutovers"},
            {"name": "MongoDB", "level": "Intermediate", "icon": "Boxes", "years": "1+ yr", "details": "Document stores, aggregation pipelines, caching patterns"}
        ]
    },
    {
        "category": "AI, Audio & Realtime",
        "items": [
            {"name": "OpenAI GPT-Realtime", "level": "Advanced", "icon": "Mic", "years": "1+ yr", "details": "Low-latency WebSockets, speech-to-speech, tool orchestration, session serialization"},
            {"name": "Voice Pipelines (VAD/TTS)", "level": "Advanced", "icon": "Headphones", "years": "2+ yrs", "details": "Piper neural TTS, Whisper STT, energy-based VAD, audio byte streaming"},
            {"name": "Google Gemini API", "level": "Advanced", "icon": "Sparkles", "years": "1+ yr", "details": "Gemini 2.5 Flash, Native Audio TTS, multi-agent editorial prompting, RAG"}
        ]
    },
    {
        "category": "Cloud, DevOps & Tooling",
        "items": [
            {"name": "Docker & Containers", "level": "Advanced", "icon": "Container", "years": "3+ yrs", "details": "Multi-stage builds, rootless containers, microservice containerization"},
            {"name": "Kubernetes & Argo CD", "level": "Intermediate", "icon": "Cloud", "years": "2+ yrs", "details": "GitOps delivery, ingress routing, multi-pod session affinity runbooks"},
            {"name": "Azure Functions & Cloud", "level": "Intermediate", "icon": "CloudRain", "years": "2+ yrs", "details": "Serverless functions, Azure AI (AI 900 certified), App Services, KeyVault"}
        ]
    }
]

WHY_QA_DATA = [
    {
        "question": "Why hire Fakir as a Senior / Staff Backend Engineer?",
        "summary": "Proven track record delivering mission-critical distributed systems, time-series migrations, and real-time AI pipelines in production.",
        "detailed": "Fakir combines deep academic rigor (IIT Madras M.Tech) with production execution at Falkor. He has engineered systems handling 10M+ daily events, executed complex storage migrations from SQL Server to GreptimeDB (7K+ alert records/min) with sub-second queries, reduced issue diagnosis time by 30% through CQRS modernization, and resolved multi-session concurrency in real-time voice AI pipelines."
    },
    {
        "question": "How do you approach system reliability and zero-downtime migrations?",
        "summary": "Dual-write strategies, backward compatibility, idempotency, and automated health self-healing.",
        "detailed": "During the high-volume alert migration from SQL Server to GreptimeDB (7K+ alert records/min), we implemented a dual-write pattern where telemetry was replicated into both engines while read paths were progressively shifted. Automated TTL-based compaction removed fragile external cron jobs and eliminated data bloating. In the voice pipeline, defensive sanitizers (ChatMessageSanitizer) and silence audio streaming eliminated connection drops and 400 bad gateway errors."
    },
    {
        "question": "What is your philosophy on choosing the right message broker (Kafka vs NATS vs Wolverine)?",
        "summary": "Match throughput, latency, persistence, and developer ergonomics to the exact domain boundary.",
        "detailed": "We use Apache Kafka for long-retention, replayable event backbones across enterprise boundaries. For ultra-low latency internal microservice pub/sub and lightweight stream persistence, NATS JetStream shines. Wolverine ties them together under a unified C# mediator abstraction, shielding application code from broker-specific transport plumbing."
    },
    {
        "question": "Can you explain the Frame 0 custom thumbnail injection technique?",
        "summary": "Algorithmic CTR optimization for YouTube Shorts via video frame manipulation.",
        "detailed": "Because the YouTube Shorts API prohibits direct thumbnail uploads, automated pipelines normally suffer from random frame picks that hurt CTR. By programmatically baking a high-contrast, attention-grabbing visual into Frame 0 of the MP4 container, YouTube's ingestion algorithm locks onto it as the default poster frame."
    }
]

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "service": "fakir-profile-api", "version": "1.0.0"}

@app.get("/api/profile")
def get_profile():
    return PROFILE_DATA

@app.get("/api/projects")
def get_projects(featured_only: bool = False, category: Optional[str] = None):
    results = PROJECTS_DATA
    if featured_only:
        results = [p for p in results if p.get("featured", False)]
    if category:
        results = [p for p in results if p.get("category", "").lower() == category.lower()]
    return results

@app.get("/api/projects/{project_id}")
def get_project_by_id(project_id: str):
    for p in PROJECTS_DATA:
        if p["id"] == project_id:
            return p
    return {"error": "Project not found"}

@app.get("/api/skills")
def get_skills():
    return SKILLS_DATA

@app.get("/api/why-qa")
def get_why_qa():
    return WHY_QA_DATA

@app.get("/api/search")
def search(q: str = Query(..., min_length=1)):
    query = q.lower()
    matched_projects = []
    for p in PROJECTS_DATA:
        text_corpus = f"{p['title']} {p['tagline']} {' '.join(p['techStack'])} {p['solution']} {p['problemStatement']}".lower()
        if query in text_corpus:
            matched_projects.append({"type": "project", "id": p["id"], "title": p["title"], "snippet": p["tagline"]})
            
    matched_skills = []
    for cat in SKILLS_DATA:
        for skill in cat["items"]:
            if query in skill["name"].lower() or query in skill["details"].lower():
                matched_skills.append({"type": "skill", "category": cat["category"], "name": skill["name"], "details": skill["details"]})
                
    return {
        "query": q,
        "results": {
            "projects": matched_projects,
            "skills": matched_skills
        }
    }
