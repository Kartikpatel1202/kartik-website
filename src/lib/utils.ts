import { clsx, type ClassValue } from "clsx";

/** Joins conditional class names. */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/** True for absolute http(s) URLs and mailto links, which open outside the site. */
export function isExternalHref(href: string): boolean {
  return /^(https?:)?\/\//.test(href) || href.startsWith("mailto:");
}
