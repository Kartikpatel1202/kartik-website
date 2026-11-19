import type { CSSProperties } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getSkillViews, homeCopy, type SkillView } from "@/content";
import { getSkillLogo, SKILL_SPRITE_URL } from "@/lib/skillLogos";

const copy = homeCopy.stack;

/** One technology chip: brand logo (from the shared sprite) or a two-letter mark, name, evidence. */
function Chip({ skill }: { skill: SkillView }) {
  const logo = getSkillLogo(skill.name);
  return (
    <span className="flex shrink-0 items-center gap-2.5 rounded-xl border border-border bg-bg-1/80 py-2.5 pr-4 pl-3 font-mono text-[0.8125rem] whitespace-nowrap text-text-primary">
      {logo ? (
        <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill={logo.color}>
          <use href={`${SKILL_SPRITE_URL}#${logo.id}`} />
        </svg>
      ) : (
        <span className="grid size-4 shrink-0 place-items-center rounded-sm border border-border-strong text-[0.5625rem] text-text-secondary">
          {skill.name.slice(0, 2)}
        </span>
      )}
      {skill.name}
      <span className="text-[0.6875rem] text-text-muted">{copy.reposLabel(skill.repoCount)}</span>
    </span>
  );
}

/** A marquee row: two identical tracks so the loop is seamless; the copy is hidden from AT. */
function MarqueeRow({ skills, reverse }: { skills: SkillView[]; reverse?: boolean }) {
  const style = {
    "--marquee-duration": `${skills.length * 3.2}s`,
    "--marquee-direction": reverse ? "reverse" : "normal",
  } as CSSProperties;
  return (
    <div className="marquee" style={style}>
      {[0, 1].map((copyIndex) => (
        <div
          key={copyIndex}
          className="marquee-track"
          aria-hidden="true"
          data-duplicate={copyIndex === 1 ? "" : undefined}
        >
          {skills.map((skill) => (
            <Chip key={skill.name} skill={skill} />
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * "Technologies I work with" (Phase 10): every confirmed skill, as two marquee rows moving in
 * opposite directions. Each chip carries its evidence (number of public repositories using it).
 * Hover or focus pauses the rows; reduced motion shows one static, wrapped set. The visual rows are
 * decorative duplicates; assistive technology reads one plain list.
 */
export function TechStack() {
  const skills = getSkillViews();
  const half = Math.ceil(skills.length / 2);

  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="relative overflow-x-clip section-y"
    >
      <Container className="flex flex-col gap-14">
        <Reveal>
          <SectionHeader
            eyebrow={copy.eyebrow}
            id="skills-title"
            title={copy.title}
            lead={copy.lead}
          />
        </Reveal>
      </Container>

      <ul className="sr-only" aria-label={copy.listLabel}>
        {skills.map((skill) => (
          <li key={skill.name}>
            {skill.name}: {copy.reposLabel(skill.repoCount)}
          </li>
        ))}
      </ul>

      <Reveal className="mt-14 flex flex-col gap-3">
        <MarqueeRow skills={skills.slice(0, half)} />
        <MarqueeRow skills={skills.slice(half)} reverse />
      </Reveal>
    </section>
  );
}
