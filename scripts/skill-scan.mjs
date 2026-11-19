// Counts, per skill, which public repositories show evidence of it (manifests, source, workflows).
// Usage: clone the repos (git clone --depth 1 …) into one folder, then: node scripts/skill-scan.mjs <folder>
// Output feeds src/content/skills.ts (`repos` per skill). Last run: 2026-11-15.
import { execSync } from "node:child_process";
import { readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const dir = process.argv[2];
const repos = execSync(`ls "${dir}"`).toString().trim().split("\n");

const MANIFEST =
  /(^|\/)(package\.json|requirements[^/]*\.txt|pyproject\.toml|Pipfile|environment\.yml|setup\.py)$/;
const SOURCE = /\.(py|ts|tsx|js|jsx|mjs|ipynb|sql|yml|yaml|toml|cfg|ini|html)$/;
const SKIP = /(node_modules|dist|build|\.next|package-lock|pnpm-lock|vendor|\.min\.)/;

function load(repo) {
  const files = execSync("git ls-files", { cwd: join(dir, repo), maxBuffer: 64e6 })
    .toString()
    .split("\n")
    .filter(Boolean);
  const read = (f) => {
    try {
      const p = join(dir, repo, f);
      if (statSync(p).size > 400_000) return "";
      return readFileSync(p, "utf8");
    } catch {
      return "";
    }
  };
  const manifests = files
    .filter((f) => MANIFEST.test(f) && !SKIP.test(f))
    .map(read)
    .join("\n")
    .toLowerCase();
  const source = files
    .filter((f) => SOURCE.test(f) && !SKIP.test(f))
    .map(read)
    .join("\n");
  return { files, manifests, source };
}

const has = (re) => (r) => re.test(r.manifests);
const src = (re) => (r) => re.test(r.source);
const file = (re) => (r) => r.files.some((f) => re.test(f) && !SKIP.test(f));
const any =
  (...fns) =>
  (r) =>
    fns.some((fn) => fn(r));

const rules = {
  Python: file(/\.py$/),
  TypeScript: file(/\.tsx?$/),
  JavaScript: file(/(^|\/)(src|client|server|frontend|crypto)\/.*\.(js|jsx)$/),
  SQL: any(file(/\.sql$/), src(/\bSELECT\b[\s\S]{0,200}\bFROM\b/)),
  React: has(/"react"\s*:/),
  "Next.js": has(/"next"\s*:/),
  "Tailwind CSS": has(/"tailwindcss"\s*:/),
  Vite: has(/"vite"\s*:/),
  "TanStack Query": has(/@tanstack\/react-query/),
  Zod: has(/"zod"\s*:/),
  "Web Speech API": src(/SpeechRecognition|speechSynthesis/),
  Phaser: has(/"phaser"\s*:/),
  FastAPI: any(has(/fastapi/), src(/from fastapi import/)),
  Pydantic: any(has(/pydantic/), src(/from pydantic import/)),
  WebSockets: src(/WebSocket\b/),
  "SQLAlchemy & Alembic": any(has(/sqlalchemy/), src(/from sqlalchemy/)),
  "JWT auth": any(
    has(/pyjwt|python-jose|jsonwebtoken|"jose"/),
    src(/import jwt\b|from jose|jsonwebtoken/),
  ),
  "Node.js & Express": has(/"express"\s*:/),
  "Applied cryptography": src(/AESGCM|X25519|Fernet\(|createCipheriv/),
  PostgreSQL: any(has(/psycopg|asyncpg|"pg"\s*:/), src(/postgresql(\+\w+)?:\/\//)),
  SQLite: src(/sqlite3|sqlite:\/\//),
  Supabase: has(/supabase/),
  MongoDB: has(/mongoose|pymongo|"mongodb"/),
  FAISS: any(has(/faiss/), src(/import faiss/)),
  "LLM APIs (Claude, OpenAI, Gemini)": any(
    has(/anthropic|openai|google-generativeai|google-genai|@google\/genai/),
    src(/from anthropic|import anthropic|from openai|google\.genai|generativeai/),
  ),
  "Prompt-injection defence": src(/prompt[_ -]?injection/i),
  Playwright: any(has(/playwright/), src(/from playwright|@playwright\/test/)),
  "scikit-learn": any(has(/scikit-learn|sklearn/), src(/from sklearn|import sklearn/)),
  XGBoost: any(has(/xgboost/), src(/import xgboost|from xgboost/)),
  "Embeddings & vector search": any(
    has(/sentence-transformers|sentence_transformers/),
    src(/SentenceTransformer/),
  ),
  "OCR (Tesseract)": any(has(/pytesseract|tesseract/), src(/pytesseract|tesseract/i)),
  Streamlit: any(has(/streamlit/), src(/import streamlit/)),
  pandas: any(has(/pandas/), src(/import pandas/)),
  Docker: file(/(^|\/)(Dockerfile|docker-compose\.ya?ml|compose\.ya?ml)$/),
  "GitHub Actions": file(/^\.github\/workflows\//),
  pytest: any(has(/pytest/), file(/(^|\/)test_[^/]*\.py$/)),
  Vitest: has(/"vitest"\s*:/),
  "ruff & mypy": any(has(/ruff|mypy/), file(/(^|\/)ruff\.toml$/)),
  Git: () => true,
};

const data = Object.fromEntries(repos.map((r) => [r, load(r)]));
const out = {};
for (const [skill, test] of Object.entries(rules)) out[skill] = repos.filter((r) => test(data[r]));
console.log(JSON.stringify(out, null, 1));
