import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { VisuallyHidden } from "@/components/ui/VisuallyHidden";
import { getCertifications, sectionCopy } from "@/content";
import { imageProps } from "@/lib/images";

const copy = sectionCopy.certifications;

/**
 * Certifications (2026-11-16): the five confirmed credentials as cards, each with its issuer's logo
 * (supplied by Kartik, 2026-11-19). Each whole card links to the credential document and opens in
 * a new tab; the ↗ arrow slides on hover.
 */
export function Certifications() {
  const items = getCertifications();
  if (items.length === 0) return null;

  return (
    <section id="certifications" aria-labelledby="certifications-title" className="section-y">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <SectionHeader
            eyebrow={copy.eyebrow}
            id="certifications-title"
            title={copy.title}
            lead={copy.lead}
            align="left"
            className="lg:sticky lg:top-28"
          />
        </Reveal>

        <ul className="flex flex-col gap-4 lg:col-span-8">
          {items.map((item, i) => {
            return (
              <Reveal as="li" key={item.id} delay={i * 60}>
                <a
                  href={item.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-spotlight=""
                  className="group flex items-center gap-4 rounded-3xl border border-border bg-bg-1/80 p-5 transition-colors duration-300 hover:border-border-strong hover:bg-bg-1 sm:p-6"
                >
                  {/* Decorative: the issuer is named right beside it. */}
                  <span className="size-14 shrink-0 overflow-hidden rounded-2xl border border-border-strong shadow-1 transition-[rotate,scale] duration-500 ease-out-expo group-hover:scale-105 group-hover:-rotate-3">
                    <Image
                      {...imageProps(item.logo)}
                      alt=""
                      sizes="56px"
                      className="size-full object-cover"
                    />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col gap-1">
                    <VisuallyHidden>{copy.viewSr}</VisuallyHidden>
                    <span className="font-display text-body-lg leading-snug font-extrabold tracking-[-0.01em] text-text-primary">
                      {item.title}
                    </span>
                    <span className="font-medium text-accent-2">{item.issuer}</span>
                    <span className="font-mono text-[0.75rem] text-text-muted">
                      {copy.issuedPrefix} <time dateTime={item.issuedDate}>{item.issued}</time>
                    </span>
                    <VisuallyHidden>{sectionCopy.common.newTab}</VisuallyHidden>
                  </span>
                  <span
                    aria-hidden
                    className="grid size-11 shrink-0 place-items-center rounded-full border border-border text-text-muted transition-[transform,color,border-color] duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-border-strong group-hover:text-text-primary"
                  >
                    <Icon name="arrow-up-right" size={18} />
                  </span>
                </a>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
