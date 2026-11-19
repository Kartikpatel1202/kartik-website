/** First focusable element on every page: jumps keyboard users past the navigation. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="fixed top-3 left-3 z-50 inline-flex min-h-11 -translate-y-20 items-center rounded-md bg-accent px-4 py-2 font-medium text-on-accent shadow-2 transition-transform duration-150 focus-visible:translate-y-0"
    >
      Skip to content
    </a>
  );
}
