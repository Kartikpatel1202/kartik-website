import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { Magnetic } from "@/components/motion/Magnetic";
import { cn, isExternalHref } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";
import { VisuallyHidden } from "./VisuallyHidden";

export type ButtonVariant = "primary" | "ghost" | "link";
export type ButtonSize = "sm" | "md" | "lg";

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leadingIcon?: IconName;
  trailingIcon?: IconName;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap select-none transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-out-expo disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary:
    "btn-sheen rounded-full bg-accent font-semibold text-on-accent shadow-1 hover:shadow-glow-accent active:translate-y-px",
  ghost:
    "rounded-full border border-border-strong bg-bg-0/40 font-semibold text-text-primary backdrop-blur-sm hover:border-text-muted hover:bg-surface-hover active:translate-y-px",
  link: "min-h-11 rounded-sm text-accent-2",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-9 px-3 text-small",
  md: "min-h-11 px-5 text-body",
  lg: "min-h-13 px-7 text-body-lg",
};

/**
 * Action or navigation control; renders a <button>, a Next <Link> or an external <a> based on
 * `href`. Primary and ghost buttons are magnetic (fine pointers, motion allowed); primary adds a
 * one-shot sheen on hover; the link variant draws its underline from the left.
 */
export function Button(props: ButtonProps) {
  const control = <ButtonControl {...props} />;
  return props.variant === "link" ? control : <Magnetic>{control}</Magnetic>;
}

function ButtonControl(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    leadingIcon,
    trailingIcon,
    className,
    children,
    ...rest
  } = props;
  const classes = cn(base, variants[variant], variant !== "link" && sizes[size], className);
  const iconSize = size === "sm" ? 16 : 18;
  // Links that open a new tab always carry the arrow icon (plus visually hidden text below).
  const opensNewTab =
    rest.href !== undefined && isExternalHref(rest.href) && !rest.href.startsWith("mailto:");
  const endIcon = trailingIcon ?? (opensNewTab ? "arrow-up-right" : undefined);
  const content = (
    <>
      {leadingIcon && <Icon name={leadingIcon} size={iconSize} />}
      {/* The link variant draws its underline under the text only, not the 44px hit area. */}
      {variant === "link" ? <span className="link-draw">{children}</span> : children}
      {endIcon && <Icon name={endIcon} size={iconSize} />}
    </>
  );

  if (rest.href === undefined) {
    const { type = "button", ...buttonRest } = rest as Omit<ButtonAsButton, keyof CommonProps>;
    return (
      <button type={type} className={classes} {...buttonRest}>
        {content}
      </button>
    );
  }

  const { href, ...anchorRest } = rest as Omit<ButtonAsLink, keyof CommonProps>;

  if (isExternalHref(href)) {
    return (
      <a
        href={href}
        className={classes}
        {...(opensNewTab && { target: "_blank", rel: "noopener noreferrer" })}
        {...anchorRest}
      >
        {content}
        {opensNewTab && <VisuallyHidden> (opens in a new tab)</VisuallyHidden>}
      </a>
    );
  }

  // Same-page anchors stay plain <a> so the smooth-scroll handler (offset, focus, hash) owns them.
  if (href.startsWith("#")) {
    return (
      <a href={href} className={classes} {...anchorRest}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...anchorRest}>
      {content}
    </Link>
  );
}
