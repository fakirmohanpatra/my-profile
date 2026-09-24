export interface Metric {
  metric: string;
  label: string;
}

export interface ArchitectureNode {
  id: string;
  name: string;
  role: string;
  tech: string;
  badge?: string;
  whyChosen?: string;
  tradeoff?: string;
  codeSnippet?: string;
  failureMode?: string;
}

export interface WhyQuestion {
  q: string;
  a: string;
  tag?: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  company: string;
  period?: string;
  category: 'Distributed Systems' | 'AI & Real-Time' | 'Automation & Media' | 'Backend Modernization' | 'Signal Processing';
  featured: boolean;
  impactMetrics: Metric[];
  techStack: string[];
  problemStatement: string;
  solution: string;
  architecture: {
    summary: string;
    nodes: ArchitectureNode[];
    dataFlow: string[];
  };
  whyQuestions: WhyQuestion[];
  keyTradeoffs?: {
    decision: string;
    alternative: string;
    rationale: string;
  }[];
}

export interface SkillItem {
  name: string;
  level: 'Expert' | 'Advanced' | 'Intermediate';
  years: string;
  details: string;
  tags?: string[];
}

export interface SkillCategory {
  category: string;
  iconName: string;
  items: SkillItem[];
}

export const PROFILE_DATA = {
  name: "Fakir Mohan Patra",
  title: "Backend Engineer",
  tagline: "Designing and building distributed, real-time data systems using .NET and Orleans. Strong expertise in event-driven architectures with Kafka and NATS (10M+ events/day) on Azure.",
  location: "Bangalore, IN",
  phone: "+91 93483 63260",
  email: "fakirmohan@alumni.iitm.ac.in",
  linkedin: "https://www.linkedin.com/in/fakir-mohan-patra/",
  github: "https://github.com/fakirmohanpatra",
  bio: "IIT Madras alumnus with proven production experience architecting distributed event-driven systems, time-series migrations at scale, and low-latency voice AI pipelines. Focused on scalability, fault tolerance, performance, and delivering high-impact backend platforms in production environments.",
  education: [
    {
      degree: "M.Tech in Applied Mechanics",
      institution: "Indian Institute of Technology Madras (IIT Madras)",
      period: "2021 – 2023",
      score: "Graduated with Honors",
      highlights: "Rigorous computational mechanics, non-linear dynamics, time-frequency analysis, and advanced numerical systems."
    },
    {
      degree: "B.Tech in Mechanical Engineering",
      institution: "Indian Institute of Information Technology, Jabalpur (IIIT Jabalpur)",
      period: "2015 – 2019",
      score: "First Class",
      highlights: "Core engineering foundation, algorithmic problem solving, robotics, and computational modeling."
    }
  ],
  certifications: [
    {
      name: "Microsoft Certified: Azure AI Fundamentals (AI 900)",
      issued: "June 2025",
      issuer: "Microsoft",
      badge: "Azure AI Fundamentals"
    }
  ],
  awards: [
    {
      title: "2x Spotlight Award",
      organization: "Falkor",
      period: "2023 – 2024",
      description: "Recognized twice for engineering excellence: leading the Python-to-.NET Core migration and delivering a scalable data integration POC."
    },
    {
      title: "Top 5 in AI Hackathon",
      organization: "Enterprise AI Challenge",
      period: "2024",
      description: "Built a RAG-based chatbot for domain-specific marketing content generation with semantic retrieval and grounded citations."
    }
  ],
  stats: [
    { label: "Daily Event Throughput", value: "10M+", sub: "Kafka & NATS streaming" },
    { label: "Time-Series Ingestion", value: "7K+/min", sub: "GreptimeDB alert stream" },
    { label: "Issue Diagnosis Time", value: "-30%", sub: "Centralized observability" },
    { label: "Autonomous Video Output", value: "5 / day", sub: "The Dugout AI pipeline" },
    { label: "Runtime Modernization", value: ".NET 10", sub: "Wolverine + NATS.Net v3" },
    { label: "Alma Mater", value: "IIT Madras", sub: "M.Tech Applied Mechanics" }
  ]
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "greptimedb-migration",
    title: "Time-Series Alert Ingestion & GreptimeDB Migration",
    tagline: "Led POC and end-to-end migration from SQL Server to GreptimeDB for high-volume ingestion of 7K+ time-series alert records per minute with automated TTL-based compaction.",
    company: "Falkor",
    period: "2024",
    category: "Distributed Systems",
    featured: true,
    impactMetrics: [
      { metric: "7K+/min", label: "Alert Ingestion Rate" },
      { metric: "Sub-Second", label: "Query Response Time" },
      { metric: "Auto TTL", label: "Compaction & Retention" },
      { metric: "Dual-Write", label: "Zero-Downtime Cutover" }
    ],
    techStack: ["GreptimeDB", "C# / .NET Core", "gRPC", "PostgreSQL Protocol", "SQL Server", "PromQL", "Grafana", "Docker"],
    problemStatement: "Alert data storage was hosted on SQL Server, creating severe scalability bottlenecks as historical volume accumulated. High-volume ingestion struggled under lock contention, manual retention cleanup jobs triggered database blocking, and relational storage lacked efficient time-series compaction.",
    solution: "Led a POC and end-to-end migration from SQL Server to GreptimeDB for high-volume ingestion of 7K+ time-series alert records per minute; designed a scalable schema with TTL-based compaction to prevent production data bloating, eliminate manual cleanup, and retain historical data intelligently for long-term access. Implemented a dual-write transition strategy and leveraged an in-house gRPC client for ingestion with PostgreSQL wire protocol for application querying.",
    architecture: {
      summary: "Dual-write hybrid ingestion with high-speed gRPC stream writing to GreptimeDB, while SQL Server retains relational user settings. Read paths shifted to GreptimeDB Postgres protocol.",
      nodes: [
        {
          id: "alert-source",
          name: "Industrial Alert Stream",
          role: "High-frequency operational sensor and telemetry alerts",
          tech: "Kafka / Wolverine Message Bus",
          badge: "Ingestion Source",
          whyChosen: "Unified enterprise messaging backbone providing partitioned, ordered alert delivery.",
          failureMode: "Buffered in Kafka partitions during transient downstream database hiccups."
        },
        {
          id: "dual-write",
          name: "Dual-Write Ingestion Layer",
          role: "Replicates alerts to SQL Server & GreptimeDB during transition",
          tech: "C# .NET Core Command Handler",
          badge: "Zero Downtime",
          whyChosen: "Ensured 100% data parity and zero downtime while benchmarking live production traffic before cutover.",
          tradeoff: "Temporary double-write IO overhead; mitigated by asynchronous background task queues.",
          codeSnippet: `// Parallel dual-write dispatch\nvar sqlTask = _sqlRepo.InsertAlertAsync(alert, ct);\nvar greptimeTask = _greptimeIngester.WriteRowAsync(alert.ToRow(), ct);\nawait Task.WhenAll(sqlTask, greptimeTask);`
        },
        {
          id: "grpc-ingest",
          name: "GreptimeDBIngester (gRPC)",
          role: "Direct binary streaming into GreptimeDB storage engine",
          tech: "In-House gRPC Client",
          badge: "gRPC Streaming",
          whyChosen: "Bypassed experimental official .NET SDK. In-house gRPC client provided efficient serialization and rock-solid connection pooling.",
          tradeoff: "Required custom protobuf mappings, but delivered dependable, scalable ingestion of 7K+ records/min without connection overhead."
        },
        {
          id: "greptimedb",
          name: "GreptimeDB Time-Series Cluster",
          role: "Columnar time-series store with automated TTL-based compaction",
          tech: "GreptimeDB / PromQL Engine",
          badge: "Automated TTL",
          whyChosen: "Native dual-protocol (gRPC + Postgres), built-in compression, and TTL-based compaction that completely eliminated manual cleanup.",
          failureMode: "Batch ingestion failure handling mitigated via idempotency and dead-letter queues."
        },
        {
          id: "query-layer",
          name: "Hydration & Query Path",
          role: "Sub-second filtered time-range lookups",
          tech: "Postgres Wire Protocol / Npgsql",
          badge: "Sub-Second Latency",
          whyChosen: "PostgreSQL wire protocol compatibility allowed standard Npgsql drivers and PromQL/Grafana dashboards with zero custom query middleware."
        },
        {
          id: "sql-metadata",
          name: "SQL Server (Relational)",
          role: "Retains UserNotification, AlertSetting & Subscriptions",
          tech: "Entity Framework Core",
          badge: "Metadata Store",
          whyChosen: "Retained for relational entities requiring multi-table joins, while moving high-volume time-series alerts out."
        }
      ],
      dataFlow: [
        "1. Field alert events published to Kafka/Wolverine message streams.",
        "2. Dual-write ingestion writes concurrently to SQL Server and GreptimeDB during rollout.",
        "3. Ingest gRPC stream converts alert DTOs to GreptimeDB rows, processing 7K+ records/min seamlessly.",
        "4. Application reads cut over to GreptimeDB via PostgreSQL wire protocol, querying with sub-second latencies.",
        "5. Storage-level TTL-based compaction purges expired alerts automatically without external cleanup jobs."
      ]
    },
    whyQuestions: [
      {
        q: "Why GreptimeDB instead of TimescaleDB or ClickHouse?",
        a: "GreptimeDB natively supports dual protocols (gRPC for high-speed writes + PostgreSQL wire protocol for standard querying and PromQL for metrics). TimescaleDB carried relational overhead and bloat, while GreptimeDB's columnar compression and built-in TTL eliminated manual table vacuuming and cron scripts.",
        tag: "Database Selection"
      },
      {
        q: "Why reuse the in-house gRPC client rather than the official .NET SDK?",
        a: "The official GreptimeDB .NET SDK was in early incubation and lacked enterprise connection resilience. Reusing our battle-tested GreptimeDBIngester gRPC client eliminated external SDK volatility while achieving reliable high-throughput ingestion.",
        tag: "Reliability & SDK"
      },
      {
        q: "What architectural trade-offs were made and documented?",
        a: "1) Referential Integrity: Moved from database foreign keys to application layer because tables now span two different database engines. 2) OData syntax: Removing SQL Server navigation properties required denormalizing filter fields onto UserNotification. 3) Create-Only (CR) pattern: Alerts are append-only; updates and manual deletes were abandoned since TTL natively handles expiration.",
        tag: "Trade-offs"
      }
    ],
    keyTradeoffs: [
      {
        decision: "Dual-write cutover strategy",
        alternative: "Big-bang switchover or read-only historical copy",
        rationale: "Zero downtime and zero data loss. Enabled live side-by-side performance benchmarking before permanently disabling SQL Server alert writes."
      },
      {
        decision: "Application-layer referential integrity",
        alternative: "Distributed transactions / 2PC",
        rationale: "Distributed 2PC introduces extreme latency and failure modes. Handling relationships in application logic kept GreptimeDB writes fast and decoupled."
      },
      {
        decision: "Automated TTL-based storage compaction",
        alternative: "Nightly SQL Server DELETE cron batch jobs",
        rationale: "DELETE queries caused lock contention, transaction log explosions, and maintenance headaches. Native TTL-based compaction is zero-maintenance."
      }
    ]
  },
  {
    id: "the-dugout-media-pipeline",
    title: "The Dugout: Autonomous AI Media Pipeline",
    tagline: "End-to-end autonomous sports media pipeline publishing 5 broadcast-grade short videos daily to YouTube Shorts & Instagram Reels with fact-verified scripts and automated publishing.",
    company: "Personal Engineering Project",
    period: "2024",
    category: "Automation & Media",
    featured: true,
    impactMetrics: [
      { metric: "5 / day", label: "Daily Autonomous Videos" },
      { metric: "Fact-Audited", label: "Deterministic Regex + Grounding" },
      { metric: "Frame 0 CTR", label: "Thumbnail Algorithmic Injection" },
      { metric: "24/7 Cloud", label: "Docker & GitHub Actions" }
    ],
    techStack: ["Python", "Google Gemini API", "FFmpeg / MoviePy", "Docker", "Edge-TTS", "YouTube Data API v3", "Meta Graph API", "GitHub Actions"],
    problemStatement: "Creating viral sports short-form video content requires continuous breaking news monitoring, factual stats verification, compelling scriptwriting, dynamic motion editing, and scheduled publishing across platforms. Doing this manually consumes 4+ hours every day and is prone to factual errors.",
    solution: "Engineered an autonomous 5-stage pipeline: RSS Discovery with custom virality scoring, 30-day Jaccard deduplication, 5-beat retention scriptwriter across 4 personas, dual-engine voice synthesis (Gemini Puck + Edge-TTS fallback), authentic press photo retrieval with Ken Burns motion, and automated Frame 0 publishing via GitHub Actions cron.",
    architecture: {
      summary: "5-stage autonomous conveyor belt running 5 times daily on GitHub Actions: Trend Discovery -> Scriptwriting -> Safety & Fact-Audit -> Audio/Visual Synthesis -> Multi-Platform Publishing.",
      nodes: [
        {
          id: "rss-aggregator",
          name: "Multi-Feed RSS & Virality Scorer",
          role: "Scrapes breaking sports feeds & computes virality score",
          tech: "Python / Feedparser / Beautiful Soup",
          badge: "Trend Discovery",
          whyChosen: "Custom virality formula (+7 Team India, +5 star athletes like Kohli/Rohit, +6 marquee rivalries) with 98% Cricket / 1% Javelin / 1% Chess deficit balancing.",
          codeSnippet: `score = (7 if is_team_india else 0) + (5 if star_athlete else 0) + (6 if rivalry else 0)\nquota_balance(sport, target_ratio=[0.98, 0.01, 0.01])`
        },
        {
          id: "dedup-shield",
          name: "30-Day Dedup Gate",
          role: "Jaccard similarity (>=35%) + entity cooldown",
          tech: "Jaccard Token Distance / Git JSON",
          badge: "30-Day Memory",
          whyChosen: "Prevents duplicate video generation on recurring sports news. Syncs state to Git using [skip ci] without external cloud database costs."
        },
        {
          id: "script-engine",
          name: "5-Beat Retention Scriptwriter",
          role: "Generates 95-115 word scripts across 4 creator personas",
          tech: "Google Gemini 2.5 Flash",
          badge: "40-45s Budget",
          whyChosen: "Enforces 5 beats: Pattern Interrupt Hook -> Conflict -> Stat/History -> Impact -> Debate CTA in Romanized Hinglish."
        },
        {
          id: "fact-checker",
          name: "Zero-Hallucination Fact Guard",
          role: "Regex token isolation + LLM fact grounding",
          tech: "Python Regex + LLM Statistician",
          badge: "Zero Tolerance",
          whyChosen: "Sports fans reject incorrect scores or wicket numbers. Isolates all numbers and validates strictly against source articles.",
          codeSnippet: `numbers = re.findall(r'\\b\\d+(?:st|nd|rd|th|runs|wickets|m)?\\b', script)\naudit_grounding(numbers, source_article_facts)`
        },
        {
          id: "av-synthesis",
          name: "Dual-Engine TTS & Photo Retrieval",
          role: "Gemini Native Voice + Edge-TTS fallback & Wikimedia Press Photos",
          tech: "Gemini 'Puck' / Edge-TTS / Wikimedia",
          badge: "Dual-Engine Audio",
          whyChosen: "Real press photography guarantees realism at zero cost. Dual-engine TTS ensures 99.9% uptime if Gemini API hits quota limits."
        },
        {
          id: "video-render",
          name: "MoviePy Compositor & Frame 0 CTR",
          role: "1080x1920, Ken Burns directional motion, subtitle sync, Frame 0 poster",
          tech: "FFmpeg / MoviePy / PIL",
          badge: "Frame 0 CTR",
          whyChosen: "YouTube Shorts doesn't support thumbnail uploads via API. Injecting the custom thumbnail at Frame 0 forces the algorithm to use it as the preview poster."
        },
        {
          id: "cloud-publisher",
          name: "Multi-Platform Cloud Uploader",
          role: "Publishes to YouTube Shorts & Instagram Reels",
          tech: "YouTube Data API v3 / Meta Graph API",
          badge: "Autonomous Pub",
          whyChosen: "Headless publishing triggered by 5 daily peak Indian viewing slots (morning, lunch, evening, prime-time, night)."
        }
      ],
      dataFlow: [
        "1. Scrapes feeds and calculates virality score with deficit balancing.",
        "2. Jaccard similarity audit filters out topics covered in the past 30 days.",
        "3. Gemini generates 95-115 word script in Hinglish tailored to selected persona.",
        "4. Regex isolates numbers/stats and cross-verifies against source news.",
        "5. Wikimedia authentic press photo fetched; Gemini/Edge-TTS voice generated.",
        "6. MoviePy composites 1080x1920 vertical video with subtitles, Ken Burns sweeps, and Frame 0 poster.",
        "7. Docker container on GitHub Actions publishes to YouTube Shorts & Instagram Reels."
      ]
    },
    whyQuestions: [
      {
        q: "Why authentic press photography instead of AI image generators like Midjourney or Flux?",
        a: "AI image generators produce uncanny athlete faces, wrong team jersey sponsors, and distorted cricket bat grips. Verified press and Wikimedia Commons photos guarantee 100% realism, zero uncanny valley, and zero API generation cost.",
        tag: "AI & Visuals"
      },
      {
        q: "Why embed the custom thumbnail into Frame 0?",
        a: "The YouTube Shorts API doesn't support separate thumbnail uploads. By rendering the high-CTR thumbnail as the first frame (Frame 0) of the MP4 video, YouTube's platform algorithm picks it up as the default preview thumbnail.",
        tag: "Algorithm CTR"
      },
      {
        q: "Why dual-engine TTS (Gemini Native Audio + Edge-TTS fallback)?",
        a: "Gemini Native Audio ('Puck') provides conversational, emotive speech. However, during API quota exhaustion or network hiccups, the pipeline automatically falls back to Microsoft Edge-TTS ('en-IN-PrabhatNeural'), guaranteeing 24/7 autonomous publishing without failure.",
        tag: "High Availability"
      },
      {
        q: "Why Git-backed state synchronization instead of a cloud database?",
        a: "To achieve a truly zero-cost, serverless architecture. Storing the 30-day topic history directly in a git repository and committing via GitHub Actions using `[skip ci]` eliminates monthly cloud database hosting bills.",
        tag: "Cost & Architecture"
      }
    ],
    keyTradeoffs: [
      {
        decision: "Deterministic Regex + LLM Double Verification",
        alternative: "Single prompt 'Make sure you don't hallucinate'",
        rationale: "Prompts alone fail to catch subtle numerical errors. Regex isolates numerical claims into a strict token list audited against news text."
      },
      {
        decision: "Pre-rendered Ken Burns Motion via FFmpeg",
        alternative: "Client-side / WebGL animation or complex 3D engine",
        rationale: "FFmpeg and MoviePy run headless in lightweight Docker containers without GPU dependencies on standard CI runners."
      }
    ]
  },
  {
    id: "gpt-realtime-voice",
    title: "Enterprise Real-Time Voice AI Conversational Pipeline",
    tagline: "Real-time STT-TTS conversational pipeline for enterprise voice interactions, delivering low-latency multi-session experiences.",
    company: "Falkor",
    period: "2024",
    category: "AI & Real-Time",
    featured: true,
    impactMetrics: [
      { metric: "Low Latency", label: "Multi-Session Voice Engine" },
      { metric: "Zero Leaks", label: "Server-Side Byte-Pump Relay" },
      { metric: "Isolated", label: "Session State & Concurrency" },
      { metric: "Demo Asset", label: "Sales Enablement Showcase" }
    ],
    techStack: ["OpenAI GPT Realtime", "WebSockets", "C# / ASP.NET Core", "Piper Neural TTS", "Whisper", "VAD", "Kubernetes", "Enterprise Agent Protocol"],
    problemStatement: "Enterprise operations required hands-free conversational voice assistance instead of typed queries. Early implementations faced concurrency race conditions, session state corruption across multi-turn exchanges, audio echo, and connection dropouts during silent intervals.",
    solution: "Designed and implemented a real-time STT-TTS conversational pipeline for enterprise voice interactions, enabling customers to engage through live voice conversations instead of typed queries; resolved concurrency, session management, state isolation, and audio echo issues to deliver low-latency multi-session experiences, creating a compelling customer demo that became a valuable sales enablement asset during product showcases.",
    architecture: {
      summary: "Lean WebSocket byte-pump bridging browser mic audio to OpenAI GPT Realtime while keeping API keys server-side. Tool calls are routed through the shared enterprise orchestrator agent.",
      nodes: [
        {
          id: "browser-client",
          name: "Operator Client (Browser/Mobile)",
          role: "Captures microphone PCM stream and plays incoming synthesized audio",
          tech: "Web Audio API / PCM Stream",
          badge: "Field Operator",
          whyChosen: "Pure browser audio streaming with zero heavy local ML runtime required on edge client."
        },
        {
          id: "ws-bridge",
          name: "RealtimeVoiceWebSocketBridge",
          role: "Authenticated server-side byte-pump keeping API keys secure",
          tech: "C# ASP.NET Core WebSockets",
          badge: "Secure Byte-Pump",
          whyChosen: "Keeps OpenAI API keys strictly server-side. Inspects audio frames, manages mute silence packets, and routes tool calls.",
          codeSnippet: `// Server-side byte pump relay\nwhile (!ws.CloseStatus.HasValue) {\n  var buffer = await ws.ReceiveAsync(memory, ct);\n  if (isMuted) {\n    await openAiWs.SendAsync(SyntheticSilencePcmFrame, ct);\n  } else {\n    await openAiWs.SendAsync(buffer, ct);\n  }\n}`
        },
        {
          id: "openai-realtime",
          name: "OpenAI GPT-Realtime Model",
          role: "Cloud multimodal speech-to-speech engine",
          tech: "GPT Realtime WebSocket Protocol",
          badge: "Primary Flow",
          whyChosen: "Delivers natural conversational speech-to-speech interaction with native interruption handling."
        },
        {
          id: "tool-orchestrator",
          name: "Orchestrator Agent",
          role: "Single source of truth tool resolver",
          tech: "Enterprise Domain Agents",
          badge: "Single Source of Truth",
          whyChosen: "Restricting the model to `ask_orchestrator_agent` ensured that voice and text chat share 100% identical domain logic and security rules."
        },
        {
          id: "sanitizer",
          name: "ChatMessageSanitizer",
          role: "Auto-heals orphaned tool calls and poisoned chat graphs",
          tech: "C# History Validator",
          badge: "Defensive Sanitizer",
          whyChosen: "Eliminated HTTP 400 Bad Gateway errors caused by orphaned tool calls when voice turns were interrupted.",
          codeSnippet: `// Auto-heal orphaned tool calls\npublic List<Message> Sanitize(List<Message> history) {\n  var toolCallIds = history.SelectMany(m => m.ToolCalls).Select(t => t.Id).ToHashSet();\n  return history.Where(m => m.Role != "tool" || toolCallIds.Contains(m.ToolCallId)).ToList();\n}`
        },
        {
          id: "offline-fallback",
          name: "Private-Cloud Offline Flow",
          role: "Energy-based VAD + Whisper + Self-Hosted Piper TTS",
          tech: "Local Neural Audio Stack",
          badge: "Flow 2 Fallback",
          whyChosen: "Provides zero-cloud offline capability for environments with restricted internet or sensitive data sovereignty."
        }
      ],
      dataFlow: [
        "1. Field operator speaks; browser streams PCM audio over authenticated WebSocket to backend bridge.",
        "2. Bridge relays audio to OpenAI GPT Realtime; sends synthetic silence frames during mute to preserve connection.",
        "3. Model triggers single `ask_orchestrator_agent` tool call for telemetry and domain questions.",
        "4. Per-session lock queue serializes tool calls, preventing state corruption in multi-turn voice chats.",
        "5. ChatMessageSanitizer audits conversation history graph before every turn to prune orphaned calls.",
        "6. If cloud connection drops, server seamlessly dispatches to local Whisper + Piper TTS flow."
      ]
    },
    whyQuestions: [
      {
        q: "Why a server-side WebSocket byte-pump instead of direct client-to-OpenAI connection?",
        a: "Security, compliance, and governance. Connecting from the browser directly exposes the enterprise API key or requires short-lived ephemeral client tokens that cannot enforce server-side tool governance, rate limiting, or instant failover to our self-hosted Piper TTS stack.",
        tag: "Security & Architecture"
      },
      {
        q: "How did you diagnose and fix garbled multi-turn voice responses?",
        a: "We discovered that concurrent tool executions were mutating shared conversation state in parallel. Implementing a strict per-session concurrency lock queue serialized tool executions, preventing out-of-order state mutations.",
        tag: "Concurrency Bug"
      },
      {
        q: "Why did muted operators experience dropped voice sessions?",
        a: "WebSockets and voice activity detection time out when silence is transmitted as zero data frames. We fixed this by generating and streaming synthetic silence PCM frames while muted, keeping the TCP connection active without triggering voice processing.",
        tag: "Protocol Fix"
      },
      {
        q: "What was ChatMessageSanitizer and why was it critical?",
        a: "When an operator interrupted an agent midway through a tool execution, the tool call remained orphaned without a matching response. The subsequent turn would fail with an HTTP 400 Bad Gateway from OpenAI. ChatMessageSanitizer programmatically detects and heals these orphaned branches before payload dispatch.",
        tag: "Reliability & Healing"
      }
    ],
    keyTradeoffs: [
      {
        decision: "Single tool call (`ask_orchestrator_agent`)",
        alternative: "Exposing 15+ granular domain tools to the voice model",
        rationale: "Fewer tool choices drastically reduce LLM decision latency and hallucination, while preserving a single source of truth across voice and text chat."
      },
      {
        decision: "Dual-flow server-driven dispatch",
        alternative: "Cloud-only or local-only deployment",
        rationale: "Allows enterprise field environments with intermittent connectivity to switch to private-cloud Whisper/Piper with zero frontend rebuilds."
      }
    ]
  },
  {
    id: "dotnet-messaging-upgrade",
    title: ".NET 10 & Wolverine Messaging Modernization",
    tagline: "Upgraded enterprise messaging platform from .NET 8 to .NET 10, modernizing Wolverine, Kafka, and NATS integrations with native NATS.Net v3 capabilities.",
    company: "Falkor",
    period: "2024",
    category: "Distributed Systems",
    featured: false,
    impactMetrics: [
      { metric: ".NET 10", label: "Target Runtime Modernized" },
      { metric: "NATS.Net v3", label: "Native Capabilities Adopted" },
      { metric: "Plug-and-Play", label: "Kafka & NATS Abstraction" },
      { metric: "Reliable", label: "Stream & Consumer Provisioning" }
    ],
    techStack: [".NET 10", "C#", "Wolverine", "NATS JetStream", "Apache Kafka", "Microsoft Orleans", "Docker", "Kubernetes"],
    problemStatement: "The enterprise messaging platform supported multiple brokers via generic abstractions, but NATS JetStream required substantial custom initialization and consumer plumbing around Wolverine. As the team targeted .NET 10, maintaining redundant custom wrappers increased technical debt and operational complexity.",
    solution: "Upgraded the messaging platform from .NET 8 to .NET 10, modernizing Wolverine, Kafka, NATS integrations by replacing custom NATS JetStream initialization with native NATS.Net v3 capabilities, building a plug-and-play messaging abstraction that enabled customers to switch between Kafka and NATS without application-level changes while simplifying stream and consumer provisioning and improving startup reliability.",
    architecture: {
      summary: "Modernized .NET 10 generic messaging abstraction with native Wolverine NATS JetStream integration, Orleans virtual actors, and Kafka streams.",
      nodes: [
        {
          id: "wolverine-bus",
          name: "Wolverine Messaging Bus",
          role: "Command bus, mediator, and transport routing",
          tech: "Wolverine (.NET 10)",
          badge: "Mediator",
          whyChosen: "Provides clean in-process mediator and out-of-process transport abstraction without coupling business handlers to broker specifics."
        },
        {
          id: "nats-jetstream",
          name: "NATS JetStream Transport",
          role: "Ultra-fast streaming and persistent consumer groups",
          tech: "Native Wolverine NATS Integration",
          badge: "Auto-Provisioning",
          whyChosen: "Delegated stream creation and consumer lifecycle to Wolverine native handlers, eliminating custom bootstrap wrappers."
        },
        {
          id: "orleans-silo",
          name: "Microsoft Orleans Silo",
          role: "Virtual actor state management and grain workflows",
          tech: "Microsoft Orleans (.NET 10)",
          badge: "Virtual Actors",
          whyChosen: "Maintains stateful operational entities in distributed memory with automatic grain placement and activation."
        },
        {
          id: "kafka-backbone",
          name: "Apache Kafka Enterprise Bus",
          role: "Durable cross-system event streaming",
          tech: "Apache Kafka",
          badge: "Event Backbone",
          whyChosen: "High-throughput replayable event log for enterprise-wide integration."
        }
      ],
      dataFlow: [
        "1. Upgraded core project files and dependencies to .NET 10 runtime.",
        "2. Replaced custom JetStream initialization with Wolverine's native stream declarations.",
        "3. Standardized consumer configuration and automated provisioning.",
        "4. Enriched startup diagnostics to clearly distinguish ignorable stream-exists exceptions from fatal errors."
      ]
    },
    whyQuestions: [
      {
        q: "Why refactor NATS initialization into native Wolverine features?",
        a: "Custom transport wrappers increase maintenance surface and lag behind upstream framework fixes. Newer Wolverine and NATS.Net v3 capabilities provide first-class native JetStream stream and consumer provisioning, simplifying startup and reducing code bloat.",
        tag: "Modernization"
      },
      {
        q: "How did error classification improve Kubernetes deployment reliability?",
        a: "In multi-pod clusters, idempotent operations like creating an existing JetStream stream previously threw exceptions that triggered pod crash loops. Categorizing benign setup exceptions allowed deterministic, clean multi-pod startups.",
        tag: "DevOps & K8s"
      }
    ]
  },
  {
    id: "flask-to-dotnet-cqrs",
    title: "CQRS Ingestion Service Migration (Flask to .NET Core)",
    tagline: "Migrated third-party telemetry ingestion services from Flask to .NET Core with a CQRS architecture, cutting issue diagnosis time by 30% and improving observability.",
    company: "Falkor",
    period: "2023 – 2024",
    category: "Backend Modernization",
    featured: false,
    impactMetrics: [
      { metric: "CQRS", label: "Decoupled Command/Query Flow" },
      { metric: "-30%", label: "Issue Diagnosis Time" },
      { metric: "Standardized", label: ".NET Ecosystem Flows" },
      { metric: "Centralized", label: "Logging & Observability" }
    ],
    techStack: [".NET Core", "C#", "CQRS", "Flask / Python", "Docker", "Argo CD", "OpenTelemetry"],
    problemStatement: "Third-party data ingestion microservices were built on Flask, creating operational friction with the rest of the .NET enterprise platform, lacking unified telemetry and centralized logging, and making failure diagnosis slow and fragmented.",
    solution: "Migrated third-party data ingestion services from Flask to .NET Core, implementing a CQRS-based ingestion architecture that standardized data flows within the .NET ecosystem, reduced production issue diagnosis time by 30%, and improved observability through centralized logging and monitoring for faster failure debugging.",
    architecture: {
      summary: "CQRS-based ingestion pipeline with separated write commands and read models, providing high throughput and standardized monitoring.",
      nodes: [
        {
          id: "sensor-source",
          name: "Field Sensor Ingestion",
          role: "Raw telemetry webhooks and sensor streams",
          tech: "HTTP / Webhooks",
          badge: "Sensor Feeds"
        },
        {
          id: "command-pipeline",
          name: "CQRS Command Handlers",
          role: "Validates payloads and publishes domain events",
          tech: ".NET Core Command Handlers",
          badge: "Write Pipeline"
        },
        {
          id: "query-pipeline",
          name: "CQRS Query Handlers",
          role: "Hydrates operational dashboards and reports",
          tech: ".NET Core Query Handlers",
          badge: "Read Pipeline"
        }
      ],
      dataFlow: [
        "1. Third-party sensor payloads hit high-speed .NET Core command handlers.",
        "2. Handlers validate schema, emit domain events, and buffer writes.",
        "3. Query handlers asynchronously update read models for dashboards.",
        "4. Monitored via centralized logging and monitoring, deployed with Argo CD."
      ]
    },
    whyQuestions: [
      {
        q: "Why migrate from Flask to .NET Core?",
        a: "Standardizing on .NET Core unified codebases, reduced DevOps overhead, shared enterprise libraries (auth, tracing, metrics), and provided superior multi-threaded CPU throughput for high-frequency sensor ingestion.",
        tag: "Architecture"
      }
    ]
  },
  {
    id: "biosignals-nlp-research",
    title: "Biological Sequences & ECG/EEG Time-Series Analysis",
    tagline: "Engineered signal processing and transformer pipelines combining FFT with BERT for anomaly detection in physiological telemetry.",
    company: "TCS Research & Innovocare HealthSoft",
    period: "2021 – 2022",
    category: "Signal Processing",
    featured: false,
    impactMetrics: [
      { metric: "BERT + FFT", label: "Hybrid Signal & Sequence Architecture" },
      { metric: "Multi-Modal", label: "ECG, EEG & Genomic Sequences Analyzed" }
    ],
    techStack: ["Python", "PyTorch", "BERT", "FFT / Wavelets", "NumPy / SciPy", "Pandas"],
    problemStatement: "Early-stage physiological anomaly detection required extracting subtle non-linear signatures across noisy biological sequences and multi-channel ECG/EEG time-series data.",
    solution: "Designed automated data pipelines combining Fast Fourier Transform (FFT) / time-frequency wavelets with transformer embeddings (BERT) for feature extraction and pattern recognition.",
    architecture: {
      summary: "Hybrid pipeline feeding spectral frequency features and sequence transformer embeddings into anomaly detection classifiers.",
      nodes: [
        {
          id: "signal-ingest",
          name: "Raw Bio-Telemetry",
          role: "Multi-channel ECG/EEG and genomic FASTA streams",
          tech: "Time-Series Signals",
          badge: "Raw Signals"
        },
        {
          id: "fft-engine",
          name: "FFT Spectral Denoising",
          role: "Time-frequency decomposition and wavelet filtering",
          tech: "SciPy / NumPy",
          badge: "Frequency Domain"
        },
        {
          id: "transformer-bert",
          name: "BERT Sequence Embedder",
          role: "Extracts contextual representations from sequence tokens",
          tech: "PyTorch / Transformers",
          badge: "Deep Learning"
        }
      ],
      dataFlow: [
        "1. Ingest raw physiological signals and biological sequences.",
        "2. Apply FFT and wavelet filtering to denoise periodic signals.",
        "3. Generate contextual embeddings with fine-tuned BERT models.",
        "4. Train anomaly models for early diagnostic insights."
      ]
    },
    whyQuestions: [
      {
        q: "Why combine FFT with Transformers?",
        a: "FFT captures periodic cyclical physiological frequencies (heart rate variability, brain wave bands), while Transformers capture long-range contextual sequence dependencies, giving superior classification accuracy over purely recurrent models.",
        tag: "Data Science"
      }
    ]
  }
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    category: "Languages & Core",
    iconName: "Code2",
    items: [
      { name: "C# / .NET (8 & 10)", level: "Expert", years: "3+ yrs", details: "Async workflows, memory management, LINQ, gRPC, ASP.NET Core, high-throughput microservices." },
      { name: "Python", level: "Expert", years: "4+ yrs", details: "FastAPI, PyTorch, MoviePy, FFmpeg automation, signal processing, AI orchestration." },
      { name: "SQL", level: "Advanced", years: "3+ yrs", details: "Execution plans, index tuning, dual-write migrations, complex time-series queries, SQL Server." }
    ]
  },
  {
    category: "Distributed Systems & Streaming",
    iconName: "Layers",
    items: [
      { name: "Microsoft Orleans", level: "Advanced", years: "2+ yrs", details: "Virtual actor model, grain lifecycle, distributed state isolation, cluster membership." },
      { name: "Apache Kafka", level: "Advanced", years: "2+ yrs", details: "High-throughput event streaming (10M+ events/day), partition design, consumer group reliability." },
      { name: "NATS & JetStream", level: "Advanced", years: "2+ yrs", details: "Low-latency pub/sub, JetStream persistent streams, consumer provisioning, Wolverine native transport." },
      { name: "Wolverine", level: "Advanced", years: "2+ yrs", details: "Command bus, mediator pattern, transactional outbox/inbox, multi-broker integration." },
      { name: "CQRS & Event-Driven", level: "Advanced", years: "2+ yrs", details: "Command/Query decoupling, domain events, read-model denormalization, async processing." }
    ]
  },
  {
    category: "Databases & Storage",
    iconName: "Database",
    items: [
      { name: "GreptimeDB", level: "Expert", years: "1+ yr", details: "Time-series schema design, PromQL, gRPC ingestion (7K+ records/min), TTL-based compaction." },
      { name: "SQL Server", level: "Advanced", years: "3+ yrs", details: "Enterprise relational schemas, migration strategies, dual-write cutovers, performance tuning." },
      { name: "MongoDB", level: "Intermediate", years: "1+ yr", details: "Document store collections, aggregation pipelines, caching patterns." }
    ]
  },
  {
    category: "AI, Audio & Realtime",
    iconName: "Mic",
    items: [
      { name: "OpenAI GPT-Realtime", level: "Advanced", years: "1+ yr", details: "WebSocket byte-pump, speech-to-speech, tool orchestration, session serialization, history healing." },
      { name: "Voice Pipelines (VAD/TTS)", level: "Advanced", years: "2+ yrs", details: "Piper neural TTS, Whisper STT, energy-based VAD, PCM audio streaming, silence packet buffering." },
      { name: "Google Gemini API", level: "Advanced", years: "1+ yr", details: "Gemini 2.5 Flash, Native Audio TTS ('Puck'), 5-beat retention prompts, RAG." }
    ]
  },
  {
    category: "Cloud, DevOps & Tooling",
    iconName: "Cloud",
    items: [
      { name: "Docker & Containers", level: "Advanced", years: "3+ yrs", details: "Multi-stage builds, headless video rendering, microservice containerization." },
      { name: "Kubernetes & Argo CD", level: "Intermediate", years: "2+ yrs", details: "GitOps deployment, ingress routing, multi-pod session affinity, zero-downtime rollouts." },
      { name: "Azure Functions & AI", level: "Intermediate", years: "2+ yrs", details: "Certified Azure AI Fundamentals (AI 900), serverless functions, KeyVault, App Services." },
      { name: "CI/CD & GitHub Actions", level: "Advanced", years: "2+ yrs", details: "Autonomous cron workflows, automated video publishing, state-sync commits [skip ci]." }
    ]
  }
];

export const WHY_HIRING_QA = [
  {
    question: "Why should a Hiring Manager or HR hire Fakir?",
    summary: "Proven production ownership, deep distributed systems expertise, and exceptional speed of execution.",
    tag: "Candidate Pitch",
    badge: "Staff Potential",
    detailed: "Fakir bridges rigorous mathematical foundations (IIT Madras M.Tech) with high-stakes production execution at Falkor. He has engineered systems handling 10M+ daily events, executed complex storage migrations from SQL Server to GreptimeDB (7K+ alert records/min) with sub-second queries, reduced issue diagnosis time by 30% through CQRS modernization, and solved deep concurrency and session isolation challenges in real-time voice AI pipelines. He is a self-starter who moves fast, values zero-downtime reliability, and communicates trade-offs clearly."
  },
  {
    question: "How do you ensure zero downtime and data integrity during major database migrations?",
    summary: "Dual-write pipelines, progressive read shifting, and application-layer referential integrity.",
    tag: "System Design",
    badge: "Migration Strategy",
    detailed: "During the high-volume alert migration from SQL Server to GreptimeDB (7K+ alert records/min), we adopted a phased dual-write strategy. In Phase 1, telemetry was written to both engines in parallel while all reads remained on SQL Server. In Phase 2, reads were progressively redirected to GreptimeDB via PostgreSQL wire protocol to validate sub-second query latencies and zero data drift. Finally, SQL Server alert writes were safely decommissioned. Automated TTL-based compaction eliminated data bloating and fragile nightly delete cron jobs."
  },
  {
    question: "How did you solve concurrency and state corruption in the real-time voice pipeline?",
    summary: "Per-session lock queues, synthetic silence packet injection, and ChatMessageSanitizer auto-healing.",
    tag: "Real-Time AI",
    badge: "Production Bug Post-Mortem",
    detailed: "We encountered three critical production bugs: 1) Garbled multi-turn audio caused by parallel tool calls mutating conversation state — solved with a strict per-session concurrency lock queue. 2) Mute timeouts dropping WebSocket connections — solved by streaming synthetic silence PCM frames while muted. 3) HTTP 400 bad gateway rejections from orphaned tool calls when turns were interrupted — solved by engineering ChatMessageSanitizer, which audits and prunes orphaned tool-call trees prior to dispatch."
  },
  {
    question: "What is your philosophy on choosing between Kafka, NATS, and Wolverine?",
    summary: "Match throughput, durability, latency, and developer ergonomics to clear domain boundaries.",
    tag: "Distributed Messaging",
    badge: "Architecture Strategy",
    detailed: "Apache Kafka is our choice for long-term durable event logs and cross-boundary enterprise integrations where multi-day replayability is mandatory. NATS JetStream is optimal for ultra-low latency internal microservice pub/sub and high-speed persistent streams. Wolverine binds them together in .NET with clean in-process mediator patterns and transactional outboxes, keeping domain handlers decoupled from transport specifics."
  },
  {
    question: "What is the Frame 0 custom thumbnail injection technique?",
    summary: "Algorithmic CTR optimization for automated video pipelines bypassing API limitations.",
    tag: "Creative Engineering",
    badge: "Growth Hack",
    detailed: "Because the YouTube Shorts API prohibits separate thumbnail image uploads, automated video pipelines normally get assigned arbitrary preview frames that kill click-through rates (CTR). By programmatically stitching a high-contrast, attention-grabbing custom graphic into Frame 0 (first video frame) of the rendered MP4 file, YouTube's ingestion algorithm automatically locks onto Frame 0 as the preview poster."
  }
];
