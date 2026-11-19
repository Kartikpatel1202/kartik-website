import { getSocialLinks } from "@/content";
import { socialIcons } from "@/lib/social";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

interface SocialLinksProps {
  className?: string;
  /** Extra classes for each icon link (sizes/borders differ per context). */
  linkClassName?: string;
  iconSize?: number;
}

/** Icon-only links to Kartik's confirmed profiles; each has an accessible name. */
export function SocialLinks({ className, linkClassName, iconSize = 20 }: SocialLinksProps) {
  const links = getSocialLinks();
  if (links.length === 0) return null;

  return (
    <ul className={cn("flex gap-1", className)}>
      {links.map((link) => {
        const external = link.platform !== "email";
        return (
          <li key={link.platform}>
            <a
              href={link.href}
              {...(external && { target: "_blank", rel: "noopener noreferrer" })}
              className={cn(
                "grid size-11 place-items-center rounded-full text-text-secondary transition-colors duration-150 hover:bg-surface-hover hover:text-text-primary",
                linkClassName,
              )}
            >
              <Icon
                name={socialIcons[link.platform]}
                size={iconSize}
                label={external ? `${link.label} (opens in a new tab)` : link.label}
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
