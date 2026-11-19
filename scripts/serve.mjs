// Minimal static file server for previewing the exported site in /out (no dependencies).
// Behaves like a typical static host so local Lighthouse runs are representative: gzip for text
// responses, long immutable caching for hashed /_next/static assets, revalidation for the rest.
import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { createGzip } from "node:zlib";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve("out");
const port = Number(process.env.PORT ?? 3000);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".webmanifest": "application/manifest+json",
  ".pdf": "application/pdf",
};

if (!existsSync(root)) {
  console.error("No /out directory. Run `npm run build` first.");
  process.exit(1);
}

createServer((req, res) => {
  const path = decodeURIComponent(new URL(req.url ?? "/", "http://localhost").pathname);
  let file = normalize(join(root, path));
  if (!file.startsWith(root)) {
    res.writeHead(403).end();
    return;
  }
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  let status = 200;
  if (!existsSync(file)) {
    file = join(root, "404.html");
    status = 404;
  }
  // Extension-less files are the generated Open Graph images (PNG).
  const type =
    types[extname(file)] ?? (extname(file) === "" ? "image/png" : "application/octet-stream");
  const headers = {
    "Content-Type": type,
    "Cache-Control": path.startsWith("/_next/static/")
      ? "public, max-age=31536000, immutable"
      : "public, max-age=0, must-revalidate",
  };
  const compressible = /^(text\/|application\/(json|xml|manifest)|image\/svg)/.test(type);
  if (compressible && /\bgzip\b/.test(req.headers["accept-encoding"] ?? "")) {
    res.writeHead(status, { ...headers, "Content-Encoding": "gzip", Vary: "Accept-Encoding" });
    createReadStream(file).pipe(createGzip()).pipe(res);
    return;
  }
  res.writeHead(status, headers);
  createReadStream(file).pipe(res);
}).listen(port, () => console.log(`Serving /out at http://localhost:${port}`));
