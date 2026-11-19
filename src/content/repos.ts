import type { Repo, RepoId } from "@/types/content";

export const githubProfileUrl = "https://github.com/Kartikpatel1202";
const GH = githubProfileUrl;

/** All 15 public repositories (GitHub API, 2026-11-15) with display names and star counts. */
export const repos: Record<RepoId, Repo> = {
  AgenticAiSafety: {
    id: "AgenticAiSafety",
    name: "Agentic AI Safety",
    url: `${GH}/AgenticAiSafety`,
    stars: 0,
  },
  "Airtel-Sync": { id: "Airtel-Sync", name: "AirtelSync", url: `${GH}/Airtel-Sync`, stars: 0 },
  BECO_DATA_ANALYST_ASSIGNMENT: {
    id: "BECO_DATA_ANALYST_ASSIGNMENT",
    name: "BECO analysis",
    url: `${GH}/BECO_DATA_ANALYST_ASSIGNMENT`,
    stars: 0,
  },
  "Customer-Churn-Predictor": {
    id: "Customer-Churn-Predictor",
    name: "Churn Predictor",
    url: `${GH}/Customer-Churn-Predictor`,
    stars: 0,
  },
  ExpenseTracker: {
    id: "ExpenseTracker",
    name: "Expense Tracker",
    url: `${GH}/ExpenseTracker`,
    stars: 0,
  },
  "RazorShield-AI-Autonomous-Payment-Risk-Fraud-Intelligence-Platform": {
    id: "RazorShield-AI-Autonomous-Payment-Risk-Fraud-Intelligence-Platform",
    name: "RazorShield AI",
    url: `${GH}/RazorShield-AI-Autonomous-Payment-Risk-Fraud-Intelligence-Platform`,
    stars: 0,
  },
  "TaskPilot-AI": { id: "TaskPilot-AI", name: "TaskPilot AI", url: `${GH}/TaskPilot-AI`, stars: 0 },
  "Weather-Data-Analysis-and-Prediction": {
    id: "Weather-Data-Analysis-and-Prediction",
    name: "Weather Forecasting",
    url: `${GH}/Weather-Data-Analysis-and-Prediction`,
    stars: 0,
  },
  "Zero-Trust-Application-Security-System": {
    id: "Zero-Trust-Application-Security-System",
    name: "Zero Trust Messaging",
    url: `${GH}/Zero-Trust-Application-Security-System`,
    stars: 0,
  },
  "ai-healthcare-decision-support-system": {
    id: "ai-healthcare-decision-support-system",
    name: "Heart-Disease Risk",
    url: `${GH}/ai-healthcare-decision-support-system`,
    stars: 0,
  },
  "duolingo-web-app": {
    id: "duolingo-web-app",
    name: "Lingo",
    url: `${GH}/duolingo-web-app`,
    stars: 0,
  },
  "kartik-portfolio": {
    id: "kartik-portfolio",
    name: "Portfolio v1",
    url: `${GH}/kartik-portfolio`,
    stars: 0,
  },
  "nutrition-tracker": {
    id: "nutrition-tracker",
    name: "Nutrition Tracker",
    url: `${GH}/nutrition-tracker`,
    stars: 0,
  },
  "space-shooter": {
    id: "space-shooter",
    name: "Space Shooter",
    url: `${GH}/space-shooter`,
    stars: 0,
  },
  "trademarkia-semantic-search": {
    id: "trademarkia-semantic-search",
    name: "Semantic Search",
    url: `${GH}/trademarkia-semantic-search`,
    stars: 0,
  },
};
