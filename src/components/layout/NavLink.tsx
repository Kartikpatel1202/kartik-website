import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";

interface NavLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  /** Target section id on the home page. */
  sectionId: string;
  /** Whether the current route is the home page. */
  onHome: boolean;
}

/**
 * Link to a home-page section. On the home page it is a plain hash link handled by SmoothScroll;
 * elsewhere it is a Next <Link> to "/#id" (client navigation, then the browser scrolls to the id).
 */
export function NavLink({ sectionId, onHome, children, ...rest }: NavLinkProps) {
  if (onHome) {
    return (
      <a href={`#${sectionId}`} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={`/#${sectionId}`} {...rest}>
      {children}
    </Link>
  );
}
