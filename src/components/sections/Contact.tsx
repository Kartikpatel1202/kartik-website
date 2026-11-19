import { CopyEmail } from "@/components/contact/CopyEmail";
import { DispatchForm } from "@/components/contact/DispatchForm";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { contactSectionId, getSocialLinks, homeCopy, profile } from "@/content";

const copy = homeCopy.contact;

/**
 * "Live dispatch": one large glass panel with the closing headline, the transmission form, its
 * live payload terminal and, under the terminal, the direct channels (email with one-click copy,
 * phone, location, profile icons). Messages are emailed by FormSubmit (src/lib/contact.ts).
 */
export function Contact() {
  const email = getSocialLinks().find((link) => link.platform === "email");

  return (
    <section
      id={contactSectionId}
      aria-labelledby="contact-title"
      className="relative overflow-x-clip section-y"
    >
      <Container size="wide" className="flex flex-col gap-8">
        <Reveal
          distance="lg"
          className="relative overflow-hidden rounded-[2rem] border border-border-strong bg-bg-1/85 p-6 shadow-2 backdrop-blur-md sm:p-10 lg:p-14"
        >
          {/* Light falling on the top of the panel. */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[70%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(243_242_245/0.12),transparent)] blur-2xl"
          />
          <div className="relative flex flex-col gap-10">
            <div className="flex max-w-3xl flex-col gap-5">
              <p className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-bg-0/70 px-3.5 py-1.5 font-mono text-[0.6875rem] tracking-[0.14em] text-text-secondary uppercase">
                <span aria-hidden className="size-1.5 rounded-full bg-success" />
                {copy.eyebrow}
              </p>
              <h2
                id="contact-title"
                className="text-chrome font-display text-h1 leading-[0.95] font-extrabold tracking-[-0.04em]"
              >
                {copy.title[0]}
                <br />
                {copy.title[1]}
              </h2>
              <p className="max-w-prose text-body-lg text-text-secondary">{copy.lead}</p>
            </div>

            {email && (
              <DispatchForm to={email.handle}>
                <ContactDetails email={email.handle} mailto={email.href} />
              </DispatchForm>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

interface DetailRow {
  icon: IconName;
  label: string;
  value: string;
  href?: string;
}

/** Email (with copy), phone and location as quiet rows, then monochrome profile icons. */
function ContactDetails({ email, mailto }: { email: string; mailto: string }) {
  const details = copy.details;
  const rows: DetailRow[] = [
    { icon: "mail", label: details.email, value: email, href: mailto },
    ...(profile.phone
      ? [
          {
            icon: "phone" as const,
            label: details.phone,
            value: profile.phone.display,
            href: profile.phone.href,
          },
        ]
      : []),
    { icon: "map-pin", label: details.location, value: profile.locationShort },
  ];

  return (
    <section
      aria-labelledby="contact-details-title"
      className="flex flex-col gap-5 rounded-2xl border border-border bg-bg-0/60 p-5 sm:p-6"
    >
      <h3
        id="contact-details-title"
        className="font-mono text-[0.6875rem] tracking-[0.14em] text-text-muted uppercase"
      >
        {details.label}
      </h3>
      <ul className="flex flex-col gap-4">
        {rows.map((row) => (
          <li key={row.label} className="flex items-center gap-4">
            <span
              aria-hidden
              className="grid size-11 shrink-0 place-items-center rounded-xl border border-border bg-bg-1 text-text-secondary"
            >
              <Icon name={row.icon} size={18} />
            </span>
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted uppercase">
                {row.label}
                <span className="sr-only">: </span>
              </span>
              <span className="min-w-0 [overflow-wrap:anywhere] text-text-primary">
                {row.href ? (
                  <a href={row.href} className="link-draw rounded-sm">
                    {row.value}
                  </a>
                ) : (
                  row.value
                )}
              </span>
            </div>
            {row.icon === "mail" && <CopyEmail address={email} />}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap items-center gap-3 border-t border-border pt-5">
        <h4 className="sr-only">{details.profiles}</h4>
        <SocialLinks
          className="gap-2"
          iconSize={18}
          linkClassName="rounded-xl border border-border bg-bg-1 hover:border-text-muted"
        />
      </div>
    </section>
  );
}
