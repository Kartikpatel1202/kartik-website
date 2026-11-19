/**
 * Section-level copy (eyebrows, titles, leads, labels). Facts inside these strings come from
 * docs/CONTENT.md; the phrasing is site copy. Home-page section copy lives in ./home.ts.
 */
export const sectionCopy = {
  common: {
    newTab: " (opens in a new tab)",
  },
  about: {
    principlesHeading: "How I work",
    proofPrefix: "See it in",
  },
  experience: {
    eyebrow: "Experience",
    title: "Work history.",
    lead: "Internships across full-stack engineering, applied machine learning and NLP research.",
    tagsLabel: "Technologies",
    linkSr: (label: string) => `Open ${label}`,
  },
  projects: {
    links: {
      caseStudy: { label: "Case study", srPrefix: (name: string) => `Read the ${name} ` },
      source: { label: "GitHub", srPrefix: (name: string) => `View ${name} source on ` },
      live: { label: "Live demo", srPrefix: (name: string) => `Open the ${name} ` },
    },
  },
  caseStudy: {
    eyebrow: "Case study",
    roleLabel: "Role",
    timelineLabel: "Timeline",
    stackLabel: "Stack",
    headings: {
      overview: "Overview",
      problem: "The problem",
      approach: "Approach & architecture",
      features: "Key features",
      highlights: "Engineering highlights",
      source: "From the source",
      next: "What I’d improve next",
      limits: "Known limits",
      links: "Links",
    },
    componentsLabel: "Components, in request order",
    diagramTitle: (name: string) => `${name} architecture diagram`,
    legendLabel: "Legend",
    kindLabels: {
      client: "Client",
      api: "API",
      service: "Service",
      ai: "AI component",
      data: "Data store",
      external: "External service",
    },
    codeLink: "View these lines on GitHub",
    codeLabel: (file: string, start: number, end: number) =>
      `Source code from ${file}, lines ${start} to ${end}`,
    back: "Back to all projects",
    pagerLabel: "More case studies",
    previous: "Previous project",
    next: "Next project",
  },
  education: {
    eyebrow: "Education",
    title: "Where I study.",
    yearsLabel: "Years",
    scoreLabel: "Score",
  },
  certifications: {
    eyebrow: "Certifications",
    title: "Credentials.",
    lead: "Professional certifications validating expertise in cloud and AI.",
    issuedPrefix: "Issued",
    viewSr: "View credential: ",
  },
  contact: {
    email: {
      copy: "Copy email address",
      copied: "Copied!",
      copiedAnnouncement: "Email address copied to the clipboard.",
      copyFailed: "Couldn’t copy automatically.",
    },
  },
  footer: {
    navLabel: "Footer",
    credit: (name: string) => `Designed & built by ${name}.`,
    builtWith: "Built with Next.js, Tailwind CSS and GSAP.",
    backToTop: "Back to top",
  },
  notFound: {
    metaTitle: "Page not found",
    index: "404",
    eyebrow: "Route not found",
    title: "This route was never deployed.",
    lead: "The link may be out of date, or the page moved in a refactor. Everything else is exactly where it should be.",
    home: "Take me home",
    work: "See the projects",
  },
} as const;
