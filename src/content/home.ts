/**
 * Copy for the home page (Phase 10 redesign: preloader, scroll-scrubbed hero, system profile,
 * technical stack, engineering roadmap, projects carousel, live-dispatch contact, footer).
 *
 * Every factual claim comes from docs/CONTENT.md: roles (§1), skills and their repository evidence
 * (§3), proof numbers and positioning (§1, §5). Phrasing is site copy. Labels such as
 * "System profile" are stylistic section markers, not claims.
 */
export const homeCopy = {
  preloader: {
    status: "Initializing system",
    progress: "Loading modules",
    done: "Interface ready",
    label: "Loading Kartik Patel’s portfolio",
  },

  hero: {
    greeting: "Hi, I’m",
    scrubHint: "Scroll to scrub timeline",
    /**
     * One stage per third of the pinned scroll. Bios: stage 1 is Kartik's own wording; stages 2
     * and 3 are written from facts he supplied on 2026-11-16 (Successive Digital SDE internship,
     * Node/Express/MongoDB/Supabase work, Mistral-7B and FLAN-T5 fine-tuning, AWS Rekognition
     * pipelines) plus repository evidence (TaskPilot AI). See docs/CONTENT.md §1 and §4.
     */
    stages: [
      {
        label: "Turning ideas into reality",
        headline: ["Software", "engineer"],
        text: "I am a Computer Science Engineering student at Vellore Institute of Technology, passionate about building innovative, scalable, and impactful technology solutions. With a strong foundation in software development, artificial intelligence, machine learning, and cloud computing, I enjoy transforming ideas into practical applications that solve real-world problems. I am driven by continuous learning, analytical thinking, and a commitment to writing efficient, reliable, and maintainable code. I am eager to collaborate with like-minded professionals, take on challenging projects, and grow as a software engineer while contributing to meaningful technological advancements.",
      },
      {
        label: "From database to interface",
        headline: ["Full-stack", "developer"],
        text: "I design and build responsive web applications end to end, from the database schema to the interface people actually use. As a Software Development Engineer Intern at Successive Digital, I built scalable full-stack products with React, Next.js, Node.js and Express on MongoDB and Supabase, with a focus on clean APIs, predictable state management and production-ready performance.",
      },
      {
        label: "AI that works in production",
        headline: ["AI systems", "engineer"],
        text: "I build intelligent software that connects machine-learning models to real cloud and web infrastructure. My work spans fine-tuning large language models such as Mistral-7B and FLAN-T5, the voice-controlled agent workflows in TaskPilot AI, and real-time AWS Rekognition pipelines, always aiming to turn cutting-edge AI into reliable, practical engineering.",
      },
    ],
    primaryCta: "View my work",
    secondaryCta: "Contact me",
    stageLabel: (n: number, total: number) => `Stage ${n} of ${total}`,
    portraitAlt: "Kartik Patel in a dark navy suit, white shirt and blue patterned tie",
  },

  about: {
    eyebrow: "System profile",
    greeting: "Hello, I’m",
    portraitAlt: "Portrait of Kartik Patel in a navy suit and blue tie",
    /** Availability pill on the portrait (requested by Kartik, 2026-11-16). */
    availability: "Open to opportunities",
    availabilityYear: "2026",
    stats: [
      { title: "Full-stack", detail: "React · Next.js · FastAPI" },
      { title: "AI systems", detail: "LLM agents · ML models" },
      { title: "15 repos", detail: "Public on GitHub" },
    ],
  },

  stack: {
    eyebrow: "Technical stack",
    title: "Technologies I Work With",
    lead: "Every technology here appears in at least one of my public repositories.",
    listLabel: "Technologies",
    reposLabel: (count: number) => `${count} ${count === 1 ? "repo" : "repos"}`,
  },

  roadmap: {
    eyebrow: "Engineering roadmap",
    title: "Core Execution Roadmap",
    lead: "Four tracks I work across, each backed by the repositories that use them.",
    trackLabel: (n: number) => `Track ${String(n).padStart(2, "0")}`,
    evidenceLabel: (count: number) => `Used in ${count} repos`,
    /** `skills` must match names in src/content/skills.ts; repo counts are derived from them. */
    tracks: [
      {
        title: "Frontend Development",
        text: "Responsive, accessible interfaces in React and Next.js, typed end to end with TypeScript.",
        skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      },
      {
        title: "Backend Development",
        text: "Typed APIs with FastAPI and Pydantic over SQL databases, with auth and audit trails.",
        skills: ["FastAPI", "Pydantic", "SQLAlchemy", "SQL"],
      },
      {
        title: "AI & Machine Learning",
        text: "LLM agents with guardrails, and classical models from scikit-learn to XGBoost.",
        skills: ["LLM APIs", "Prompt-injection defence", "scikit-learn", "XGBoost"],
      },
      {
        title: "Testing & Delivery",
        text: "pytest and Playwright suites, ruff and mypy checks, Docker and GitHub Actions.",
        skills: ["pytest", "Playwright", "ruff & mypy", "Docker", "GitHub Actions"],
      },
    ],
  },

  projects: {
    eyebrow: "Portfolio mode",
    title: "Featured Engineering Projects",
    lead: "Drag, swipe or use the arrows to turn the ring. Featured builds open a full case study.",
    projectLabel: (n: number) => `Project ${String(n).padStart(2, "0")}`,
    carouselLabel: "Projects",
    previous: "Previous project",
    next: "Next project",
    pause: "Pause",
    play: "Play",
    goTo: (n: number, name: string) => `Show project ${n}: ${name}`,
    position: (n: number, total: number) => `${n} / ${total}`,
    code: "Code",
    codeSr: (name: string) => ` for ${name} on GitHub`,
    caseStudy: "Case study",
    caseStudySr: (name: string) => `${name} `,
    seeAll: "See all on GitHub",
  },

  contact: {
    eyebrow: "Live dispatch",
    title: ["Let’s Build Something", "Exceptional."],
    lead: "Fill out the transmission form and watch your payload stream live. Every message lands straight in my inbox.",
    terminalTitle: "payload.json",
    awaiting: {
      name: "Awaiting name",
      email: "Awaiting email",
      subject: "Awaiting subject",
      message: "Awaiting message",
    },
    badge: {
      live: "Live",
      sending: "Sending",
      delivered: "200 OK — Delivered",
      failed: "Error",
    },
    fields: {
      firstName: "First name",
      lastName: "Last name",
      email: "Email address",
      subject: "Subject",
      message: "Your message",
    },
    errors: {
      firstName: "Please enter your first name.",
      email: "Enter an email address like name@example.com.",
      subject: "Please add a subject.",
      message: "Please write at least 10 characters.",
    },
    minMessage: 10,
    submit: "Transmit message",
    sending: "Transmitting…",
    errorSummary: "Please fix the highlighted fields.",
    sent: "Transmission received. I’ll get back to you shortly.",
    failed: "Transmission failed. Please try again, or email me directly:",
    inactive: "The message inbox is being set up. Please email me directly for now:",
    /** Subject line of the email Kartik receives. */
    emailSubject: (subject: string, name: string) => `[Portfolio] ${subject} (from ${name})`,
    signature: (name: string, email: string) => `${name} · ${email}`,
    details: {
      label: "Direct channels",
      email: "Email",
      phone: "Phone",
      location: "Location",
      profiles: "Profiles",
    },
  },

  footer: {
    terminal: ["> shutdown --graceful", "> session saved", "> see you soon_"],
    columns: {
      focus: "Focus",
      now: "Now",
      region: "Region",
    },
    nowLine: "B.Tech CSE at VIT",
    viewWork: "View work",
    timeZone: "IST · UTC+5:30",
  },
} as const;
