import { agenticCanary, airtelSyncGuard, razorShieldJwt, taskPilotGuard } from "./excerpts";
import type { Project } from "@/types/content";

/*
 * Facts come from docs/CONTENT.md §5 and each repository's README and source (clones of
 * 2026-11-15). Roles come from commit authorship; timelines from commit dates. Live demos are
 * omitted until they have been verified to load.
 */
export const projects: readonly Project[] = [
  // ───────────────────────────── Featured ─────────────────────────────
  {
    slug: "razorshield-ai",
    category: "Fintech & risk",
    status: "confirmed",
    sources: ["repo: RazorShield-AI-Autonomous-Payment-Risk-Fraud-Intelligence-Platform"],
    title: "RazorShield AI: Payment Risk & Fraud Intelligence",
    shortTitle: "RazorShield AI",
    oneLiner:
      "A real-time payment-risk platform combining an ML fraud model, behavioural anomaly detection, deterministic policy and human-in-the-loop investigation in one auditable console.",
    featured: true,
    year: 2026,
    role: "Solo build (sole commit author)",
    timeline: "Aug 2026",
    repo: "RazorShield-AI-Autonomous-Payment-Risk-Fraud-Intelligence-Platform",
    // TODO: confirm live demo works — https://razor-shield-ai-autonomous-payment.vercel.app
    context:
      "Independent demonstration platform. It is not affiliated with Razorpay, and every generated transaction is labelled SIMULATED.",
    teaser: {
      problem:
        "Fraud is a tiny share of payment volume, and risk teams need to know why a payment is risky, not just that it is.",
      solution:
        "Two models score every payment, an AI agent investigates, and a deterministic, versioned policy makes the final, auditable call.",
    },
    overview: [
      "RazorShield AI is a full-stack risk console for payments. A supervised fraud model and an independent behavioural anomaly engine score every payment, an AI agent investigates and cites its evidence, and a versioned rule set, not a language model, turns all of it into one decision.",
      "It is an independent demonstration platform, not affiliated with Razorpay. A controlled simulator generates the traffic, and every simulated transaction is prefixed SIM_ and labelled SIMULATED.",
    ],
    problem:
      "Fraud is a tiny fraction of high transaction volumes, and a bare “fraud = true” flag is not enough. Risk teams need to know why a payment is risky, which rule fired and who acted on it.",
    solution:
      "An eight-step decision pipeline: intake, fraud model, behavioural analysis, investigation, policy, decision (approve, step-up, review or block), persistence and audit.",
    architecture: {
      summary:
        "The React dashboard calls a FastAPI backend, which scores each payment with the ML risk engine, sends risky cases to the investigation agent, and lets the deterministic policy engine decide before the outcome is stored in PostgreSQL.",
      nodes: [
        {
          id: "ui",
          label: "React dashboard",
          kind: "client",
          tier: 0,
          detail:
            "Live risk stream, transaction explorer, investigation views, role-aware navigation",
        },
        {
          id: "api",
          label: "FastAPI",
          kind: "api",
          tier: 1,
          detail: "JWT auth, RBAC with four roles, controlled transaction simulator",
        },
        {
          id: "ml",
          label: "ML risk engine",
          kind: "ai",
          tier: 2,
          detail: "XGBoost fraud probability and an independent behavioural anomaly score",
        },
        {
          id: "agent",
          label: "Investigation agent",
          kind: "ai",
          tier: 2,
          detail: "LLM agent behind a provider abstraction; it explains and cites evidence",
        },
        {
          id: "policy",
          label: "Policy engine",
          kind: "service",
          tier: 3,
          detail: "Deterministic YAML policy maps signals to approve, step-up, review or block",
        },
        {
          id: "llm",
          label: "LLM provider",
          kind: "external",
          tier: 3,
          detail: "Anthropic SDK; reports from the deterministic mock provider are flagged as mock",
        },
        {
          id: "db",
          label: "PostgreSQL",
          kind: "data",
          tier: 4,
          detail: "SQLAlchemy models, Alembic migrations, append-only audit log",
        },
      ],
      edges: [
        { from: "ui", to: "api" },
        { from: "api", to: "ml" },
        { from: "api", to: "agent" },
        { from: "ml", to: "policy" },
        { from: "agent", to: "policy" },
        { from: "agent", to: "llm" },
        { from: "policy", to: "db" },
      ],
    },
    stack: [
      "Python",
      "FastAPI",
      "SQLAlchemy",
      "Alembic",
      "PostgreSQL",
      "XGBoost",
      "scikit-learn",
      "pandas",
      "Anthropic SDK",
      "PyJWT",
      "bcrypt",
      "React",
      "TypeScript",
      "Docker",
    ],
    features: [
      "Real-time risk stream and transaction explorer",
      "Explainable decisions with a model-vs-anomaly disagreement view",
      "Human-in-the-loop investigation workflow",
      "Role-based access: Admin, Risk Analyst, Merchant, Viewer",
      "Audit log of the full decision chain",
      "Controlled transaction simulator",
    ],
    shots: [
      {
        image: "razorshield-ai/live-risk-stream",
        alt: "RazorShield AI live risk stream: a traffic generator with scenario, rate and count controls above tiles for throughput, high-risk, approved, step-up, review and blocked counts.",
        caption: "Live risk stream. The simulator only generates behaviour; the pipeline decides.",
      },
      {
        image: "razorshield-ai/transaction-explorer",
        alt: "Transaction explorer table of simulated payments with amount, fraud probability, anomaly score, severity, risk level and a policy decision such as step-up or review.",
        caption: "Transaction explorer. Filtering, sorting and paging run in the database.",
      },
      {
        image: "razorshield-ai/investigations",
        alt: "Completed investigations table listing risk level, confidence, evidence and finding counts, with every row tagged as produced by the mock provider.",
        caption:
          "Investigations. Reports from the deterministic mock provider are flagged, never shown as live model output.",
      },
    ],
    highlights: [
      {
        area: "Data integrity",
        text: "Temporal leakage is prevented structurally: feature functions receive only a history window and have no database access, so they cannot read future rows.",
      },
      {
        area: "Security",
        text: "JWT verification uses a fixed algorithm list, closing off “alg: none” and HS/RS confusion.",
      },
      {
        area: "Trade-off",
        text: "Models advise and the agent explains, but only the deterministic policy decides, so every outcome traces back to a versioned rule.",
      },
      {
        area: "Correctness",
        text: "No probability is hard-coded; the score comes from the trained model.",
      },
      { area: "Testing", text: "Linted and type-checked with ruff and mypy; 49 test files." },
    ],
    excerpts: [razorShieldJwt],
    metrics: [
      { value: "8", label: "pipeline stages" },
      { value: "4", label: "RBAC roles" },
      { value: "49", label: "test files" },
    ],
    limitations: [
      "A demonstration platform on synthetic data, not a production payment system.",
      "It does not process real payment traffic or real customer financial data.",
    ],
    improvements: [
      "Replace the controlled simulator with production-grade event streaming, such as Kafka in front of the risk pipeline.",
      "Add graph-based detection across customers, devices, payment methods, merchants and IP or location to surface coordinated fraud rings.",
      "Connect to authorised payment providers through secure APIs, which the project deliberately avoids today.",
    ],
    tags: [],
    visual: {
      kind: "image",
      shot: {
        image: "razorshield-ai/risk-command-center",
        alt: "RazorShield AI Risk Command Center showing 20,116 transactions, an 89.9% approval rate, 328 high-risk payments, 347 open reviews and a daily risk-trend chart.",
        caption: "Risk Command Center, from the project README.",
      },
    },
  },
  {
    slug: "taskpilot-ai",
    category: "Browser automation",
    status: "confirmed",
    sources: ["repo: TaskPilot-AI"],
    title: "TaskPilot AI: Voice-Controlled Browser Agent",
    shortTitle: "TaskPilot AI",
    oneLiner:
      "A voice and text agent that turns English, Hindi or Hinglish requests into validated, risk-classified browser plans and runs them in real Chromium, asking for approval before anything sensitive.",
    featured: true,
    year: 2026,
    role: "Solo build (sole commit author)",
    timeline: "Nov 2026",
    repo: "TaskPilot-AI",
    teaser: {
      problem:
        "Everyday web chores take many clicks, and naïve browser agents act on the web without enough safety.",
      solution:
        "An LLM planner turns spoken or typed requests into typed, risk-classified plans that run in real Chromium only after the user approves them.",
    },
    overview: [
      "TaskPilot AI takes a spoken or typed request in English, Hindi or Hinglish, works out the intent, and produces a typed, risk-classified plan. Nothing runs until the user clicks Run Plan.",
      "Playwright then executes the plan in a real Chromium browser, streams live screenshots back to the dashboard and stops at approval checkpoints before anything sensitive.",
    ],
    problem:
      "Everyday web chores such as grocery carts, email drafts and calendar events take many clicks, and naïve agents act on the web without enough safety.",
    solution:
      "An LLM planner (Anthropic or OpenAI, with an offline rule-based fallback) produces a typed plan. Nothing runs until the user clicks Run Plan; Playwright then executes it, streams live screenshots and stops at approval checkpoints.",
    architecture: {
      summary:
        "The Next.js dashboard talks to FastAPI services over REST and a WebSocket; the planner asks an LLM provider (or an offline rule-based fallback) for a plan, and the Playwright engine runs approved plans through allow-listed domain adapters.",
      nodes: [
        {
          id: "ui",
          label: "Next.js dashboard",
          kind: "client",
          tier: 0,
          detail:
            "Command centre, voice input, plan preview, live browser preview, approval dialog",
        },
        {
          id: "transport",
          label: "REST + WebSocket",
          kind: "api",
          tier: 1,
          detail: "Zod-validated telemetry with ordering, dedupe and replay",
        },
        {
          id: "api",
          label: "FastAPI services",
          kind: "service",
          tier: 2,
          detail: "Task and approval services, explicit state machine, event manager",
        },
        {
          id: "planner",
          label: "Planner",
          kind: "ai",
          tier: 3,
          detail: "Intent classification, entities, session memory, risk-classified plans",
        },
        {
          id: "browser",
          label: "Playwright engine",
          kind: "service",
          tier: 3,
          detail: "Isolated contexts, navigation guard, execution engine",
        },
        {
          id: "llm",
          label: "LLM provider",
          kind: "external",
          tier: 4,
          detail: "Anthropic or OpenAI, with an offline rule-based fallback",
        },
        {
          id: "domains",
          label: "Domain adapters",
          kind: "service",
          tier: 4,
          detail: "Blinkit, Amazon India, YouTube, Gmail drafts, Google Calendar",
        },
      ],
      edges: [
        { from: "ui", to: "transport" },
        { from: "transport", to: "api" },
        { from: "api", to: "planner" },
        { from: "api", to: "browser" },
        { from: "planner", to: "llm" },
        { from: "browser", to: "domains" },
      ],
    },
    stack: [
      "Python",
      "FastAPI",
      "Pydantic v2",
      "asyncio",
      "Playwright",
      "Next.js 14",
      "React 18",
      "TypeScript",
      "Tailwind CSS",
      "Zod",
      "Web Speech API",
      "Docker",
      "GitHub Actions",
    ],
    features: [
      "Multilingual intent classification across 12 intents",
      "Session memory and clarifying questions instead of guesses",
      "Live browser preview over a binary WebSocket",
      "Deterministic product matching and cart verification",
      "Exact-event approval for calendar actions",
      "Safe downloads: allow-list, MIME and magic-byte checks, SHA-256",
    ],
    shots: [],
    highlights: [
      {
        area: "Security",
        text: "Payments, checkout, placing orders, sending email and deletion are never automated, even with approval.",
      },
      {
        area: "Security",
        text: "Navigation guard with an allow-list, public-IP DNS checks and validated redirects.",
      },
      {
        area: "Trade-off",
        text: "Sign-in, OTP and CAPTCHA are never automated: a run stops and hands control back instead of working around them.",
      },
      {
        area: "Testing",
        text: "Four GitHub Actions workflows: backend, frontend, integration and security.",
      },
      { area: "Testing", text: "579 backend and 182 frontend tests, as reported in the README." },
    ],
    excerpts: [taskPilotGuard],
    metrics: [
      { value: "761", label: "tests (579 + 182)" },
      { value: "12", label: "intents" },
      { value: "4", label: "CI workflows" },
    ],
    limitations: [
      "Commerce, YouTube, Gmail and Calendar flows are verified against local fixtures only, not the live sites.",
      "The OpenAI and Anthropic providers are unit-tested against mocked SDKs, not yet called live.",
      "State is in memory; there is no authentication yet.",
    ],
    improvements: [
      "Execution monitoring, failure recovery and activity-log views (roadmap phase 4b).",
      "Hardening: authentication, multi-user support, deployment and observability (roadmap phase 6).",
      "Persist task history, which is lost today when the backend restarts.",
    ],
    tags: ["Fixture-verified"],
    visual: { kind: "code", excerpt: taskPilotGuard },
  },
  {
    slug: "airtelsync",
    category: "Telecom · Hackathon",
    status: "confirmed",
    sources: ["repo: Airtel-Sync"],
    title: "AirtelSync: AI-Assisted Small-Business Onboarding",
    shortTitle: "AirtelSync",
    oneLiner:
      "A multilingual onboarding platform where an AI advisor recommends plans, deterministic code decides eligibility and price, and OCR-based KYC feeds an order tracker and a sales console.",
    featured: true,
    year: 2026,
    // TODO: confirm with Kartik — his role, team size and any hackathon result.
    timeline: "Nov 2026",
    repo: "Airtel-Sync",
    context:
      "Built for the YTL Hackathon 2026 (Enterprise Track A) for a fictional operator, Accel Business. Team project.",
    teaser: {
      problem:
        "Small-business owners face confusing connectivity pricing, slow KYC and opaque installation timelines.",
      solution:
        "An AI advisor talks to owners in their language while deterministic code decides eligibility, price and KYC verdicts, and a guard blocks any number no tool returned.",
    },
    overview: [
      "AirtelSync is digital-first onboarding for small businesses. An owner chats with an advisor in their own language, gets a bundle with one transparent monthly price, completes KYC in minutes and tracks installation without calling support.",
      "The design rule is simple: the LLM handles conversation, and deterministic code decides eligibility, price and KYC verdicts.",
    ],
    problem:
      "Small-business owners need connectivity bundles but face confusing pricing, slow KYC and opaque installation timelines.",
    solution:
      "The LLM handles conversation in the owner’s language while deterministic engines decide eligibility, price and KYC verdicts. An output guard rejects any price or product ID that a tool did not return.",
    architecture: {
      summary:
        "The owner PWA and the sales console call a FastAPI backend; its advisor loop lets an LLM converse but routes every eligibility, price and KYC decision to deterministic engines, which validate IDs against mock registries.",
      nodes: [
        {
          id: "pwa",
          label: "React + Vite PWA",
          kind: "client",
          tier: 0,
          detail: "Advisor chat in 10 UI languages, quote builder, KYC, order tracker",
        },
        {
          id: "console",
          label: "Sales console",
          kind: "client",
          tier: 0,
          detail: "Lead scoring, assisted mode, KYC reviews",
        },
        {
          id: "api",
          label: "FastAPI",
          kind: "api",
          tier: 1,
          detail: "Advisor tool-calling loop with output guard and scripted fallback",
        },
        {
          id: "llm",
          label: "Gemini / Claude",
          kind: "ai",
          tier: 2,
          detail: "Converses with the owner and calls engine tools; never sets a price",
        },
        {
          id: "engine",
          label: "Pure-function engine",
          kind: "service",
          tier: 2,
          detail: "Eligibility, dependencies, pricing, recommendation",
        },
        {
          id: "kyc",
          label: "Smart KYC",
          kind: "service",
          tier: 2,
          detail: "Tesseract OCR, five layers of checks, four verdicts",
        },
        {
          id: "ids",
          label: "ID validators",
          kind: "data",
          tier: 3,
          detail: "GSTIN checksum and Udyam validation against mock registries",
        },
      ],
      edges: [
        { from: "pwa", to: "api" },
        { from: "console", to: "api" },
        { from: "api", to: "llm" },
        { from: "api", to: "engine" },
        { from: "api", to: "kyc" },
        { from: "engine", to: "ids" },
        { from: "kyc", to: "ids" },
      ],
    },
    stack: [
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "Vite",
      "Gemini / Claude tool calling",
      "Tesseract OCR",
      "scikit-learn",
      "Fernet encryption",
    ],
    features: [
      "Advisor chat with voice input and three-tier plan cards",
      "Quote builder with dependency checks and one-tap fixes",
      "Five-layer KYC with approved, needs-action, review and blocked verdicts",
      "Order state machine with ETAs, SLA flags and fibre-to-5G rerouting",
      "Sales and partner console with lead scoring",
    ],
    shots: [
      {
        image: "airtelsync/advisor-chat",
        alt: "AirtelSync advisor chat in Hindi: the owner asks for CCTV and business email and shares a GSTIN; the advisor finds the business and recommends a plan at ₹6,701 a month including GST.",
        caption: "Advisor chat in Hindi. Every price comes from a tool result.",
      },
      {
        image: "airtelsync/kyc-blocked",
        alt: "KYC result saying the business can't be verified because its GST registration is cancelled and its Udyam certificate has no registration number, with an option to fetch documents from DigiLocker.",
        caption: "Smart KYC blocking a specimen applicant, with the reason and a next step.",
      },
      {
        image: "airtelsync/order-tracker",
        alt: "Order tracker showing installation scheduled, a notice that fibre was unavailable so the order switched to 5G AirFiber at a lower price, and steps from quote accepted to services active.",
        caption: "Order tracker after an automatic fibre-to-5G reroute.",
      },
    ],
    highlights: [
      {
        area: "Correctness",
        text: "If the advisor mentions a price or product no tool returned, it gets one corrective retry, then falls back to the scripted advisor, so a demo never dead-ends.",
      },
      {
        area: "Correctness",
        text: "The engine rejects all 49 rule-breaking line items found in the case data.",
      },
      {
        area: "Evaluation",
        text: "Lead-score model: AUC 0.70, and the top decile converts at 18.2% vs a 7.4% base (2.45×).",
      },
      {
        area: "Evaluation",
        text: "KYC evaluation: 12 of 12 specimen applicants match the answer key.",
      },
      {
        area: "Privacy",
        text: "Raw ID images are encrypted at rest and deleted after a decision; IDs are masked in every API response.",
      },
    ],
    excerpts: [airtelSyncGuard],
    metrics: [
      { value: "0.70", label: "lead-score AUC" },
      { value: "12/12", label: "KYC eval cases" },
      { value: "30", label: "advisor eval scenarios" },
    ],
    limitations: [
      "Prototype on synthetic case data; registry and e-sign integrations are mocked.",
      "The Twilio WhatsApp notification adapter has not been tested with real credentials.",
    ],
    improvements: [
      "Swap the mock GSTIN and Udyam registries, DigiLocker, Aadhaar e-sign and UPI AutoPay for real integrations.",
      "Test the WhatsApp notification adapter end to end in the Twilio sandbox.",
    ],
    tags: ["Team project", "Hackathon"],
    visual: {
      kind: "image",
      shot: {
        image: "airtelsync/lead-score-console",
        alt: "AirtelSync sales console, lead score model tab: AUC 0.7, 7.4% base activation, 18.2% top-decile activation, 54% of activations in the top 30%, and the strongest factors ranked.",
        caption: "Sales console and owner app, from screenshots in the repository.",
      },
      inset: {
        image: "airtelsync/advisor-plans",
        alt: "Mobile advisor screen in Hindi showing the recommended plan card at ₹6,701 a month with its bundled products.",
        caption: "Recommended plan card in the owner app.",
      },
    },
  },
  {
    slug: "agentic-ai-safety",
    category: "AI security",
    status: "confirmed",
    sources: ["repo: AgenticAiSafety"],
    title: "Agentic AI Safety: Adversarial Robustness of LLM Agents",
    shortTitle: "Agentic AI Safety",
    oneLiner:
      "A security and evaluation framework that builds an LLM agent, attacks it systematically, defends it in layers and measures whether the defence actually works.",
    featured: true,
    year: 2026,
    role: "Solo build (sole commit author)",
    timeline: "Sep – Oct 2026",
    repo: "AgenticAiSafety",
    teaser: {
      problem:
        "Tool-using LLM agents are exposed to prompt injection, jailbreaks and data exfiltration, and defences are rarely measured.",
      solution:
        "Layered ingress, tool-call and egress controls, measured on a 228-case benchmark that compares an undefended baseline with the secured agent.",
    },
    overview: [
      "Agentic AI Safety builds a tool-using LLM agent, attacks it systematically, defends it in layers and then measures whether the defence works.",
      "Its starting principle is that the LLM is not a security boundary: it reasons but does not authorise. Every critical attack category has a deterministic control behind the probabilistic one.",
    ],
    problem:
      "Tool-using LLM agents are exposed to prompt injection, jailbreaks and data exfiltration, and defences are rarely measured.",
    solution:
      "Layered protection: ingress validation with nine attack detectors and a policy engine, independent authorisation of every tool call, and egress checks for credentials and canary tokens, all measured against a custom benchmark.",
    architecture: {
      summary:
        "Requests from the operator dashboard (through FastAPI) and from the benchmark harness pass the ingress guard before reaching the agent; every tool call is authorised separately, every output passes egress checks, and decisions are written to a SQLite audit store.",
      nodes: [
        {
          id: "ui",
          label: "React dashboard",
          kind: "client",
          tier: 0,
          detail: "Security dashboard, audit log, attack taxonomy, evaluations",
        },
        {
          id: "api",
          label: "FastAPI",
          kind: "api",
          tier: 1,
          detail: "Agent endpoints and background evaluation jobs",
        },
        {
          id: "eval",
          label: "Benchmark harness",
          kind: "service",
          tier: 1,
          detail: "228 cases, baseline vs secured runs",
        },
        {
          id: "ingress",
          label: "Ingress guard",
          kind: "service",
          tier: 2,
          detail: "Validation, sanitisation, nine detectors, risk scoring, policy",
        },
        {
          id: "agent",
          label: "Agent core",
          kind: "ai",
          tier: 3,
          detail: "Provider abstraction: a deterministic mock, or a local model through Ollama",
        },
        {
          id: "tools",
          label: "Tool governance",
          kind: "service",
          tier: 4,
          detail: "Per-call authorisation against registry and policy",
        },
        {
          id: "egress",
          label: "Egress checks",
          kind: "service",
          tier: 4,
          detail: "Credential and canary-token detection on outputs",
        },
        {
          id: "db",
          label: "SQLite",
          kind: "data",
          tier: 5,
          detail: "Audit log of every decision and persisted evaluation results",
        },
      ],
      edges: [
        { from: "ui", to: "api" },
        { from: "api", to: "ingress" },
        { from: "eval", to: "ingress" },
        { from: "ingress", to: "agent" },
        { from: "agent", to: "tools" },
        { from: "agent", to: "egress" },
        { from: "tools", to: "db" },
        { from: "egress", to: "db" },
      ],
    },
    stack: [
      "Python 3.11",
      "Pydantic v2",
      "FastAPI",
      "SQLAlchemy",
      "SQLite",
      "React 18",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
    ],
    features: [
      "Nine attack detectors with risk scoring",
      "Tool-call authorisation and egress canary checks",
      "228-case custom agentic benchmark",
      "Operator dashboard, audit log and background evaluations",
    ],
    shots: [],
    highlights: [
      {
        area: "Evaluation",
        text: "On the deterministic mock provider, attack success fell from 7/29 to 0/29 with 0/7 false positives.",
      },
      {
        area: "Security",
        text: "Zero unauthorised tool executions and zero canary leaks across the evaluation.",
      },
      {
        area: "Trade-off",
        text: "Canary tokens prove a leak with no false positives but miss a paraphrased system prompt, so a separate ingress detector covers that gap.",
      },
      {
        area: "Correctness",
        text: "Hardening audits found and fixed concurrency and ordering bugs that earlier tests had missed.",
      },
      { area: "Testing", text: "986 backend and 143 frontend tests, as reported in the README." },
    ],
    excerpts: [agenticCanary],
    metrics: [
      { value: "0/29", label: "attacks succeeded (secured)" },
      { value: "228", label: "benchmark cases" },
      { value: "1,129", label: "tests (986 + 143)" },
    ],
    limitations: [
      "All results use a deterministic mock provider; they describe the security pipeline, not robustness under a real model.",
      "Detection is rule-based: about a quarter of adversarial test cases are flagged, and paraphrase evades it.",
      "The API has no authentication or rate limiting and binds to the local machine only.",
    ],
    improvements: [
      "Run the evaluation against a real model; the real-provider path is built but has not been run.",
      "Evaluate on a public corpus, not only the 228 self-authored cases.",
      "Replace lexical hashing retrieval with semantic embeddings and measure retrieval quality.",
    ],
    tags: ["Mock-provider results"],
    visual: { kind: "code", excerpt: agenticCanary },
  },

  // ───────────────────────────── More projects ─────────────────────────────
  {
    slug: "lingo",
    category: "EdTech",
    status: "confirmed",
    sources: ["repo: duolingo-web-app"],
    title: "Lingo: Language-Learning App",
    shortTitle: "Lingo",
    oneLiner:
      "A full-stack, Duolingo-style language-learning app built for an SDE assessment, with five exercise types and server-side gamification.",
    featured: false,
    year: 2026,
    repo: "duolingo-web-app",
    // TODO: confirm live demo works — https://duolingo-web-app-self.vercel.app
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "TanStack Query",
      "FastAPI",
      "SQLAlchemy 2",
      "SQLite",
      "Playwright",
    ],
    tags: [],
  },
  {
    slug: "semantic-search",
    category: "Search & ML",
    status: "confirmed",
    sources: ["repo: trademarkia-semantic-search"],
    title: "Semantic Search with Fuzzy Clustering",
    shortTitle: "Semantic Search",
    oneLiner:
      "A semantic search service over 20 Newsgroups with sentence embeddings, FAISS, Gaussian-mixture soft clustering and a custom semantic cache.",
    featured: false,
    year: 2026,
    repo: "trademarkia-semantic-search",
    stack: ["Python", "sentence-transformers", "FAISS", "scikit-learn", "FastAPI", "Docker"],
    tags: [],
  },
  {
    slug: "zero-trust-messaging",
    category: "Security",
    status: "confirmed",
    sources: ["repo: Zero-Trust-Application-Security-System"],
    title: "Zero Trust Secure Messaging",
    shortTitle: "Zero Trust Messaging",
    oneLiner:
      "A secure messaging platform that verifies every user, device and request, with X25519 key exchange, AES-256-GCM encryption and Merkle-tree identity proofs.",
    featured: false,
    year: 2026,
    repo: "Zero-Trust-Application-Security-System",
    stack: ["Python", "React", "Vite", "Supabase", "X25519", "AES-256-GCM"],
    tags: [],
  },
  {
    slug: "nutrition-tracker",
    category: "Health",
    status: "confirmed",
    sources: ["repo: nutrition-tracker"],
    title: "Nutrition Tracker & Meal Suitability Score",
    shortTitle: "Nutrition Tracker",
    // Described as rule-based on purpose: the code has no LLM/ML calls (docs/CONTENT.md §5).
    // TODO: confirm with Kartik — his role (two contributors) and the ICMR/WHO standards claim.
    oneLiner:
      "A full-stack meal tracker for hostel food that computes calories and macros and gives each meal a rule-based 0–100 suitability score.",
    featured: false,
    year: 2025,
    repo: "nutrition-tracker",
    // TODO: confirm live demo works — https://ai-nutrition-tracker-pearl.vercel.app
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    tags: ["Team project"],
  },
  {
    slug: "heart-disease-risk",
    category: "Healthcare ML",
    status: "confirmed",
    sources: ["repo: ai-healthcare-decision-support-system"],
    title: "Healthcare Decision Support: Heart-Disease Risk",
    shortTitle: "Heart-Disease Risk",
    // TODO: confirm with Kartik — the README's 98.5% accuracy is omitted until the evaluation method is known.
    oneLiner:
      "A Streamlit decision-support app that compares Random Forest, Decision Tree and SVM models for heart-disease risk and generates PDF reports.",
    featured: false,
    year: 2025,
    repo: "ai-healthcare-decision-support-system",
    stack: ["Python", "scikit-learn", "Streamlit", "SQLite", "ReportLab"],
    tags: [],
  },
  {
    slug: "space-shooter",
    category: "Game dev",
    status: "confirmed",
    sources: ["repo: space-shooter"],
    title: "Space Shooter",
    shortTitle: "Space Shooter",
    oneLiner:
      "A 2D arcade space shooter built with Phaser and Vite, with enemy waves, ship upgrades, a shop, combos and sound controls.",
    featured: false,
    year: 2026,
    repo: "space-shooter",
    stack: ["JavaScript", "Phaser 4", "Vite"],
    tags: [],
  },
];
