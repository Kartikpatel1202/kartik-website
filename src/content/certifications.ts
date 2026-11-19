import type { Certification } from "@/types/content";

/*
 * Confirmed by Kartik on 2026-11-16, each with a link to the credential document he supplied
 * (Google Drive). Order as Kartik listed them. The OCI Generative AI and AWS Generative AI links
 * were swapped on 2026-11-16 at Kartik's request.
 */
export const certifications: readonly Certification[] = [
  {
    id: "aws-saa",
    status: "confirmed",
    sources: ["old-portfolio", "confirmed by Kartik 2026-11-16"],
    title: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    issued: "April 2026",
    issuedDate: "2026-04",
    verifyUrl: "https://drive.google.com/file/d/1U3ZOBQIA7esZ9M-QvJkUL1jN8nIrMTjH/view",
    logo: "logos/aws",
  },
  {
    id: "oracle-java-17",
    status: "confirmed",
    sources: ["old-portfolio", "confirmed by Kartik 2026-11-16"],
    title: "Oracle Certified Professional: Java SE 17 Developer",
    issuer: "Oracle University",
    issued: "July 2025",
    issuedDate: "2025-07",
    verifyUrl: "https://drive.google.com/file/d/1_GYbHrU-dTqAxyDAnVZOxr0lUKv0p5pN/view",
    logo: "logos/oracle",
  },
  {
    id: "oci-genai-2025",
    status: "confirmed",
    sources: ["old-portfolio", "confirmed by Kartik 2026-11-16"],
    title: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
    issuer: "Oracle University",
    issued: "August 2025",
    issuedDate: "2025-08",
    verifyUrl: "https://drive.google.com/file/d/1G3sJ6Em6Zdj1BqqtjliV5eli4UG0p500/view",
    logo: "logos/oracle",
  },
  {
    id: "forage-deloitte",
    status: "confirmed",
    sources: ["old-portfolio", "confirmed by Kartik 2026-11-16"],
    title: "Data Analytics Virtual Job Simulation – Deloitte Australia",
    issuer: "Forage",
    issued: "July 2025",
    issuedDate: "2025-07",
    verifyUrl: "https://drive.google.com/file/d/1_olfu6-GbvO5n143Gpbq0K-oUs9NNNsG/view",
    logo: "logos/forage",
  },
  {
    id: "aws-genai-intro",
    status: "confirmed",
    sources: ["old-portfolio", "confirmed by Kartik 2026-11-16"],
    title: "Introduction to Generative AI – Art of the Possible",
    issuer: "Amazon Web Services",
    issued: "July 2025",
    issuedDate: "2025-07",
    verifyUrl: "https://drive.google.com/file/d/1agx0kkikg6RYUjGLje2lqQji91-Mm3W-/view",
    logo: "logos/aws",
  },
];
