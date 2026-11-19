import type { RepoId, SkillGroup } from "@/types/content";

/*
 * Evidence comes from an automated scan of all 15 public repositories (2026-11-15): dependency
 * manifests, source files and workflow files. Entries marked "README" are evidenced by the
 * repository README instead. Depth tiers on the site are derived from these counts only.
 */
const SCAN = "repo scan 2026-11-15";

const AAS: RepoId = "AgenticAiSafety";
const AS: RepoId = "Airtel-Sync";
const BECO: RepoId = "BECO_DATA_ANALYST_ASSIGNMENT";
const CHURN: RepoId = "Customer-Churn-Predictor";
const EXP: RepoId = "ExpenseTracker";
const RS: RepoId = "RazorShield-AI-Autonomous-Payment-Risk-Fraud-Intelligence-Platform";
const TP: RepoId = "TaskPilot-AI";
const WX: RepoId = "Weather-Data-Analysis-and-Prediction";
const ZT: RepoId = "Zero-Trust-Application-Security-System";
const HD: RepoId = "ai-healthcare-decision-support-system";
const LINGO: RepoId = "duolingo-web-app";
const PV1: RepoId = "kartik-portfolio";
const NUT: RepoId = "nutrition-tracker";
const SS: RepoId = "space-shooter";
const SEM: RepoId = "trademarkia-semantic-search";

const ALL: RepoId[] = [AAS, AS, BECO, CHURN, EXP, RS, TP, WX, ZT, HD, LINGO, PV1, NUT, SS, SEM];

export const skillGroups: readonly SkillGroup[] = [
  {
    id: "languages",
    label: "Languages",
    skills: [
      {
        name: "Python",
        status: "confirmed",
        sources: [SCAN],
        repos: [AAS, AS, CHURN, RS, TP, WX, ZT, HD, LINGO, SEM],
      },
      {
        name: "SQL",
        status: "confirmed",
        sources: [SCAN],
        repos: [AAS, AS, BECO, RS, TP, ZT, HD, LINGO, NUT],
      },
      {
        name: "TypeScript",
        status: "confirmed",
        sources: [SCAN],
        repos: [AAS, AS, RS, TP, LINGO, PV1, NUT],
      },
      { name: "JavaScript", status: "confirmed", sources: [SCAN], repos: [AAS, EXP, ZT, SS] },
      // TODO: confirm with Kartik — Java is evidenced only by an unverified certification claim.
      { name: "Java", status: "todo", sources: ["old-portfolio"], repos: [] },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      {
        name: "React",
        status: "confirmed",
        sources: [SCAN],
        repos: [AAS, AS, EXP, RS, TP, ZT, LINGO, PV1, NUT],
      },
      {
        name: "Tailwind CSS",
        status: "confirmed",
        sources: [SCAN],
        repos: [AAS, RS, TP, LINGO, PV1, NUT],
      },
      { name: "Vite", status: "confirmed", sources: [SCAN], repos: [AAS, AS, EXP, RS, ZT, SS] },
      { name: "Next.js", status: "confirmed", sources: [SCAN], repos: [TP, LINGO, PV1, NUT] },
      { name: "Zod", status: "confirmed", sources: [SCAN], repos: [EXP, TP, PV1, NUT] },
      { name: "Web Speech API", status: "confirmed", sources: [SCAN], repos: [AS, TP, LINGO] },
      { name: "TanStack Query", status: "confirmed", sources: [SCAN], repos: [LINGO] },
      {
        name: "PWA & i18n",
        status: "confirmed",
        sources: ["repo: Airtel-Sync README"],
        repos: [AS],
      },
      { name: "Phaser", status: "confirmed", sources: [SCAN], repos: [SS] },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    skills: [
      {
        name: "FastAPI",
        status: "confirmed",
        sources: [SCAN],
        repos: [AAS, AS, RS, TP, LINGO, SEM],
      },
      {
        name: "Pydantic",
        status: "confirmed",
        sources: [SCAN],
        repos: [AAS, AS, RS, TP, LINGO, SEM],
      },
      { name: "SQLAlchemy", status: "confirmed", sources: [SCAN], repos: [AAS, RS, TP, LINGO] },
      { name: "JWT auth", status: "confirmed", sources: [SCAN], repos: [EXP, RS, TP] },
      { name: "Applied cryptography", status: "confirmed", sources: [SCAN], repos: [AS, TP, ZT] },
      { name: "WebSockets", status: "confirmed", sources: [SCAN], repos: [TP] },
      { name: "Node.js & Express", status: "confirmed", sources: [SCAN], repos: [EXP] },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    skills: [
      { name: "SQLite", status: "confirmed", sources: [SCAN], repos: [AAS, AS, RS, TP, HD, LINGO] },
      { name: "PostgreSQL", status: "confirmed", sources: [SCAN], repos: [RS, TP] },
      { name: "Supabase", status: "confirmed", sources: [SCAN], repos: [ZT, NUT] },
      { name: "MongoDB", status: "confirmed", sources: [SCAN], repos: [EXP] },
      { name: "FAISS", status: "confirmed", sources: [SCAN], repos: [SEM] },
    ],
  },
  {
    id: "ai-ml",
    label: "AI / ML",
    skills: [
      {
        name: "scikit-learn",
        status: "confirmed",
        sources: [SCAN],
        repos: [AAS, CHURN, RS, WX, HD, SEM],
      },
      { name: "pandas", status: "confirmed", sources: [SCAN], repos: [AAS, CHURN, RS, WX, HD] },
      { name: "LLM APIs", status: "confirmed", sources: [SCAN], repos: [AAS, AS, RS, TP] },
      { name: "Streamlit", status: "confirmed", sources: [SCAN], repos: [AAS, CHURN, WX, HD] },
      {
        name: "Prompt-injection defence",
        status: "confirmed",
        sources: [SCAN],
        repos: [AAS, RS, TP],
      },
      { name: "XGBoost", status: "confirmed", sources: [SCAN], repos: [RS] },
      {
        name: "Anomaly detection",
        status: "confirmed",
        sources: ["repo: RazorShield README"],
        repos: [RS],
      },
      { name: "Embeddings", status: "confirmed", sources: [SCAN], repos: [SEM] },
      { name: "OCR (Tesseract)", status: "confirmed", sources: [SCAN], repos: [AS] },
      // TODO: confirm with Kartik — internship claim only (FLAN-T5 / Mistral-7B fine-tuning).
      { name: "LLM fine-tuning", status: "todo", sources: ["old-portfolio"], repos: [] },
    ],
  },
  {
    id: "devops",
    label: "DevOps & Tools",
    skills: [
      { name: "Git", status: "confirmed", sources: [SCAN], repos: ALL },
      { name: "pytest", status: "confirmed", sources: [SCAN], repos: [AAS, AS, RS, TP, LINGO] },
      { name: "ruff & mypy", status: "confirmed", sources: [SCAN], repos: [AAS, RS, TP, LINGO] },
      { name: "Docker", status: "confirmed", sources: [SCAN], repos: [RS, TP, SEM] },
      { name: "Playwright", status: "confirmed", sources: [SCAN], repos: [AS, TP, LINGO] },
      { name: "Vitest", status: "confirmed", sources: [SCAN], repos: [AAS, RS, TP] },
      { name: "GitHub Actions", status: "confirmed", sources: [SCAN], repos: [TP] },
      // TODO: confirm with Kartik — AWS is evidenced only by an unverified certification claim.
      { name: "AWS", status: "todo", sources: ["old-portfolio"], repos: [] },
    ],
  },
];
