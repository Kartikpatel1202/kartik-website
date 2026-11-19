import type { Experience } from "@/types/content";

/*
 * Roles, dates, locations, descriptions and tags confirmed by Kartik on 2026-11-16 (supplied with
 * reference screenshots). Originally from his old portfolio; see docs/CONTENT.md §4.
 * Reverse-chronological.
 */
export const experience: readonly Experience[] = [
  {
    id: "successive-digital",
    // Logo supplied by Kartik, 2026-11-18.
    logo: "logos/successive-digital",
    status: "confirmed",
    sources: ["old-portfolio", "confirmed by Kartik 2026-11-16", "repo: ExpenseTracker"],
    role: "SDE Intern",
    organisation: "Successive Digital",
    period: "June 2026 – Present",
    startDate: "2026-06",
    location: "Noida, India",
    description:
      "Hands-on training in full-stack web development with the MERN Stack. Working on real-world assignments, version-controlled projects, and modern web technologies while building scalable applications and preparing a production-ready MERN capstone project.",
    tags: [
      "MERN Stack",
      "JavaScript",
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Web Development",
    ],
    link: {
      href: "https://github.com/Kartikpatel1202/ExpenseTracker",
      label: "ExpenseTracker on GitHub",
    },
    kind: "work",
  },
  {
    id: "codec-technologies",
    // Logo supplied by Kartik, 2026-11-18.
    logo: "logos/codec-technologies",
    status: "confirmed",
    sources: [
      "old-portfolio",
      "confirmed by Kartik 2026-11-16",
      "repo: Customer-Churn-Predictor",
      "repo: Weather-Data-Analysis-and-Prediction",
    ],
    role: "Artificial Intelligence Intern",
    organisation: "Codec Technologies",
    period: "Jul 2025 – Aug 2025",
    startDate: "2025-07",
    location: "Mumbai, India",
    description:
      "AICTE & ICAC approved internship focused on applied ML. Built a Customer Churn Prediction model (80%+ accuracy) and Weather Data Analysis project. Deployed an interactive Streamlit app for real-time inference.",
    tags: ["Python", "EDA", "ML Models", "Streamlit"],
    kind: "work",
  },
  {
    id: "srip-vit",
    // Logo supplied by Kartik, 2026-11-18.
    logo: "logos/vit",
    status: "confirmed",
    sources: ["old-portfolio", "confirmed by Kartik 2026-11-16"],
    role: "Research Intern — Model Impact Analyst",
    organisation: "SRIP, VIT Chennai",
    period: "May 2025 – Jun 2025",
    startDate: "2025-05",
    location: "Chennai, India",
    description:
      "Bloom’s Taxonomy-based question generation using FLAN-T5 and Mistral-7B-Instruct. Curated large-scale educational datasets, fine-tuned models, and deployed on Hugging Face Hub. Evaluated outputs across taxonomy levels and improved results with prompt engineering.",
    tags: ["NLP", "FLAN-T5", "Mistral-7B", "Hugging Face", "Prompt Engineering"],
    kind: "research",
  },
];
