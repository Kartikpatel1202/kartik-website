/**
 * Runs `callback` when the browser is idle (or after `timeout` ms at the latest). Falls back to a
 * plain timeout where requestIdleCallback is missing (Safari). Returns a cancel function.
 */
export function onIdle(callback: () => void, timeout = 2500): () => void {
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(callback, { timeout });
    return () => window.cancelIdleCallback(id);
  }
  const id = setTimeout(callback, Math.min(timeout, 1200));
  return () => clearTimeout(id);
}
