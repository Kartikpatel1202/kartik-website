import { About } from "@/components/sections/About";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Roadmap } from "@/components/sections/Roadmap";
import { TechStack } from "@/components/sections/TechStack";
import { JsonLd } from "@/components/seo/JsonLd";
import { getEducation, getSocialLinks, profile } from "@/content";
import { absoluteUrl } from "@/lib/site";

export default function HomePage() {
  const education = getEducation()[0];
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    description: profile.positioning,
    url: absoluteUrl("/"),
    image: profile.avatarUrl,
    address: { "@type": "PostalAddress", addressLocality: profile.locationShort },
    ...(education && {
      alumniOf: { "@type": "CollegeOrUniversity", name: education.institution },
    }),
    // Public profiles only (the unconfirmed email is filtered out by getSocialLinks).
    sameAs: getSocialLinks()
      .filter((link) => link.platform !== "email")
      .map((link) => link.href),
  };

  return (
    <main id="main">
      <JsonLd data={person} />
      <Hero />
      <About />
      <TechStack />
      <Roadmap />
      <Projects />
      <Experience />
      <Education />
      <Certifications />
      <Contact />
    </main>
  );
}
