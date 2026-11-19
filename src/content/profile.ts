import type { Principle, Profile, Role, SocialLink } from "@/types/content";

export const profile: Profile = {
  status: "confirmed",
  sources: ["GitHub profile", "brief (positioning)", "repo: BECO_DATA_ANALYST_ASSIGNMENT"],
  name: "Kartik Patel",
  role: "Software Developer",
  headline: "Software Developer · Full-stack & AI engineering",
  // Positioning is assembled only from verified repo facts. TODO: confirm wording with Kartik.
  positioning:
    "I build full-stack products with AI at the core (LLM agents, risk models, OCR pipelines) and engineer them to be tested, auditable and safe.",
  // Bengaluru confirmed by Kartik on 2026-11-16 (contact details).
  location: "Bengaluru, Karnataka, India",
  locationShort: "Bengaluru, India",
  // Confirmed by Kartik on 2026-11-16 for the contact section.
  phone: { display: "+91-9413906471", href: "tel:+919413906471" },
  // India has a single time zone, so this holds whichever city is confirmed in CONTENT.md §1.
  timeZone: "Asia/Kolkata",
  institution: "Vellore Institute of Technology",
  bio: "B.Tech CS student passionate about solving real-world problems through code. Interested in software development, DSA, AI, IoT & cybersecurity.",
  // Three paragraphs, ≤ 90 words each: background · journey · interest in AI-powered engineering.
  about: [
    // CGPA 9.15 confirmed by Kartik on 2026-11-16.
    "I’m a B.Tech Computer Science student at Vellore Institute of Technology, holding a 9.15 CGPA. I work where software meets intelligence: taking an AI idea that looks great in a demo and engineering it into something people can actually rely on, with clean code, real tests and its limits written down.",
    "I started in 2025 with classic machine-learning projects: churn prediction, weather forecasting and heart-disease risk. In 2026 I moved to full systems: a payment-risk platform, a voice-controlled browser agent, an AI-assisted onboarding product and a security framework for LLM agents.",
    "What draws me to AI-powered engineering is making it trustworthy. In my projects the language model handles the conversation, deterministic code makes the decisions, sensitive actions wait for a human, and every result ships with tests and its limits written down.",
  ],
  interests: ["Software development", "DSA", "AI"],
  /** Focus areas for the About quick facts (from the brief's positioning and the repos). */
  focus: ["Full-stack products", "LLM agents & guardrails", "Applied ML"],
  avatarUrl: "https://avatars.githubusercontent.com/u/220485831?v=4",
  // TODO: confirm with Kartik — campus (VIT Chennai), years 2023–2027, CGPA, cricket interest,
  // portrait photo. All from the old portfolio only; kept out of the rendered site.
  // Résumé supplied by Kartik on 2026-11-16 (Google Drive; opens in a new tab).
  resumeUrl: "https://drive.google.com/file/d/1WQOheJe6i75jIiEP36MADMM3Es5yayKg/view?usp=sharing",
};

/** Roles cycled once in the hero; the first is the resting state (and the SSR/no-JS text). */
export const roles: readonly Role[] = [
  {
    status: "confirmed",
    sources: ["brief (positioning)", "repo: TaskPilot-AI", "repo: duolingo-web-app"],
    label: "Full-stack developer",
  },
  {
    status: "confirmed",
    sources: ["repo: Airtel-Sync", "repo: AgenticAiSafety", "repo: RazorShield…"],
    label: "AI systems engineer",
  },
  {
    status: "confirmed",
    sources: ["GitHub profile", "repo: BECO_DATA_ANALYST_ASSIGNMENT"],
    label: "CS undergrad at VIT",
  },
];

export const principles: readonly Principle[] = [
  {
    status: "confirmed",
    sources: ["repo: Airtel-Sync"],
    title: "The model talks; code decides.",
    detail:
      "Eligibility, pricing and KYC verdicts come from deterministic engines. An output guard rejects any price or product the tools did not return.",
    proofSlug: "airtelsync",
  },
  {
    status: "confirmed",
    sources: ["repo: TaskPilot-AI"],
    title: "Humans approve what matters.",
    detail:
      "Plans run only after an explicit click, sensitive steps stop for approval, and payments, checkout, sending and deletion are never automated.",
    proofSlug: "taskpilot-ai",
  },
  {
    status: "confirmed",
    sources: [
      "repo: RazorShield-AI-Autonomous-Payment-Risk-Fraud-Intelligence-Platform",
      "repo: AgenticAiSafety",
    ],
    title: "Measure honestly.",
    detail:
      "Feature code is structurally unable to read future rows, and every benchmark ships with its caveats, including what has not been run yet.",
    proofSlug: "razorshield-ai",
  },
];

export const socialLinks: readonly SocialLink[] = [
  {
    status: "confirmed",
    sources: ["GitHub profile"],
    platform: "github",
    label: "GitHub",
    href: "https://github.com/Kartikpatel1202",
    handle: "Kartikpatel1202",
  },
  {
    status: "confirmed",
    sources: ["brief", "old-portfolio"],
    platform: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kartik-patel-49289028b/",
    handle: "kartik-patel-49289028b",
  },
  {
    status: "confirmed",
    sources: ["old-portfolio", "confirmed by Kartik 2026-11-16"],
    platform: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/kartikpatel1202",
    handle: "kartikpatel1202",
  },
  {
    status: "confirmed",
    sources: ["old-portfolio", "confirmed by Kartik 2026-11-16"],
    platform: "email",
    label: "Email",
    href: "mailto:kartikpatel06471@gmail.com",
    handle: "kartikpatel06471@gmail.com",
  },
];
