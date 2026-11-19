import type { Education } from "@/types/content";

/* Confirmed by Kartik on 2026-11-16 (CGPA, campus, years and school results). */
export const education: readonly Education[] = [
  {
    id: "btech-vit",
    // Logo supplied by Kartik, 2026-11-18.
    logo: "logos/vit",
    status: "confirmed",
    sources: ["GitHub profile", "old-portfolio", "confirmed by Kartik 2026-11-16"],
    degree: "B.Tech in Computer Science Engineering",
    institution: "Vellore Institute of Technology, Chennai",
    start: "2023",
    end: "2027",
    score: "9.15 CGPA",
    primary: true,
  },
  {
    id: "cbse-xii",
    // Logo supplied by Kartik, 2026-11-18.
    logo: "logos/central-academy",
    status: "confirmed",
    sources: ["old-portfolio", "confirmed by Kartik 2026-11-16"],
    degree: "CBSE 12th Board",
    institution: "Central Academy School, Pali",
    start: "2020",
    end: "2021",
    score: "94.6%",
  },
  {
    id: "cbse-x",
    // Logo supplied by Kartik, 2026-11-18.
    logo: "logos/central-academy",
    status: "confirmed",
    sources: ["old-portfolio", "confirmed by Kartik 2026-11-16"],
    degree: "CBSE 10th Board",
    institution: "Central Academy School, Pali",
    start: "2018",
    end: "2019",
    score: "90.0%",
  },
];
