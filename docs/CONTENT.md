# CONTENT.md — Kartik Patel portfolio, single source of truth

Research date: 2026-11-15. Every fact below cites its source in brackets.

**Source key**
- `[GitHub profile]`: public GitHub user record for `Kartikpatel1202`.
- `[repo: <name>]`: that repository's README, source tree, or commit history.
- `[old-portfolio]`: Kartik's earlier, self-authored portfolio site (`repo: kartik-portfolio`, last commit 2026-06-25). These are his own claims and are **not** independently verified. They carry `TODO: confirm` until he checks them against LinkedIn.
- `[LinkedIn]`: **not reachable**. The profile redirects to LinkedIn's sign-in wall. Nothing here comes from LinkedIn. See §9.

---

## 1. Identity

- **Name:** Kartik Patel [GitHub profile]
- **Headline (proposed, assembled from verified facts):** Software Developer · Full-stack & AI engineering. *TODO: confirm wording with Kartik.*
  - Earlier self-description: "AI Developer · Software Engineer" [old-portfolio]
- **One-line positioning (proposed):** Computer Science student at VIT Chennai who builds full-stack products with AI at the core (LLM agents, risk models, OCR pipelines) and engineers them to be tested, auditable and safe. [repo: RazorShield…, TaskPilot-AI, AgenticAiSafety, Airtel-Sync; old-portfolio for VIT]
- **Location:** Bengaluru, Karnataka, India. ✅ Confirmed by Kartik, 2026-11-16 (contact details). Earlier sources: Chennai [GitHub profile]; the SDE internship is listed as Noida [old-portfolio].
- **Phone:** +91-9413906471. ✅ Supplied by Kartik for the contact section, 2026-11-16.
- **Links:**
  - GitHub: https://github.com/Kartikpatel1202 [GitHub profile]
  - LinkedIn: https://www.linkedin.com/in/kartik-patel-49289028b/ [brief; old-portfolio]
  - Email: kartikpatel06471@gmail.com. ✅ Confirmed by Kartik, 2026-11-16: the contact form emails submissions to it (FormSubmit).
  - Résumé: ✅ supplied by Kartik, 2026-11-16 (Google Drive link, opens in a new tab): https://drive.google.com/file/d/1WQOheJe6i75jIiEP36MADMM3Es5yayKg/view
  - Avatar: https://avatars.githubusercontent.com/u/220485831 [GitHub profile]. The old portfolio also includes a photo, `public/Kartik_Image.jpeg` [old-portfolio]. *TODO: confirm which photo to use, if any.*

## 2. About

Write the About section only from these facts:

- B.Tech in Computer Science & Engineering at Vellore Institute of Technology, Chennai, 2023–2027 [old-portfolio; BECO repo names VIT as institute: repo: BECO_DATA_ANALYST_ASSIGNMENT]
- Bio: "B.Tech CS student passionate about solving real-world problems through code. Interested in software development, DSA, AI, IoT & cybersecurity." [GitHub profile]
- Journey shown by the repo timeline:
  - 2025: classic ML projects (churn prediction, weather forecasting, heart-disease prediction) [repo: Customer-Churn-Predictor, Weather-Data-Analysis-and-Prediction, ai-healthcare-decision-support-system]
  - Early 2026: security and retrieval systems [repo: Zero-Trust-Application-Security-System, trademarkia-semantic-search]
  - Mid–late 2026: large, multi-phase, test-heavy platforms that combine LLMs with deterministic engines [repo: RazorShield…, AgenticAiSafety, TaskPilot-AI, Airtel-Sync]
- Recurring engineering stance across his recent work:
  - The LLM handles conversation, while deterministic code makes decisions [repo: Airtel-Sync]
  - Payments, checkout and sending are never automated [repo: TaskPilot-AI]
  - No probability is hard-coded, and features cannot see future rows [repo: RazorShield… docs/ml-methodology.md]
  - Results come with honest limitation sections ("NOT RUN", "fixture-verified") [repo: AgenticAiSafety, TaskPilot-AI]
- Interests: AI, IoT, cybersecurity, cloud [GitHub profile; old-portfolio]
- Personal: cricket enthusiast [old-portfolio]. *TODO: confirm he wants this on the site.*

## 3. Skills (each item tagged with evidence)

> **Phase 5 update (2026-11-15):** the site now uses an automated evidence scan of all 15 public repositories (`scripts/skill-scan.mjs`: dependency manifests, source files, CI workflows). It records how many repos use each skill; the counts and repo lists live in `src/content/skills.ts`. Site tiers come only from those counts: Daily drivers = 5+ repos, Comfortable = 2–4, Exploring = 1. Results that differ from the hand-made list below:
> - Python 10 repos, SQL 9, React 9, TypeScript 7.
> - Tailwind, Vite, FastAPI, Pydantic, SQLite and scikit-learn 6 each; pandas and pytest 5 each.
> - Git is in all 15.
> - "PWA & i18n" and "Anomaly detection" are evidenced by READMEs rather than code (Airtel-Sync, RazorShield).
> - Java, AWS and LLM fine-tuning remain `TODO: confirm` (no repo evidence).

**Languages**
- Python [repo: RazorShield…, TaskPilot-AI, AgenticAiSafety, Airtel-Sync, + 6 more]
- TypeScript (strict) [repo: TaskPilot-AI, duolingo-web-app, Airtel-Sync, nutrition-tracker]
- JavaScript [repo: space-shooter, ExpenseTracker, Zero-Trust…]
- SQL [repo: BECO_DATA_ANALYST_ASSIGNMENT (Snowflake SQL), RazorShield… (PostgreSQL)]
- Java: certification claim only [old-portfolio]. No public Java repos. *TODO: confirm.*

**Frontend**
- React 18/19 [repo: TaskPilot-AI, duolingo-web-app, AgenticAiSafety, Airtel-Sync]
- Next.js 14/16 App Router [repo: TaskPilot-AI, duolingo-web-app, nutrition-tracker]
- Vite [repo: Airtel-Sync, AgenticAiSafety, space-shooter]
- Tailwind CSS [repo: TaskPilot-AI, duolingo-web-app, AgenticAiSafety, nutrition-tracker]
- TanStack Query and `openapi-fetch` typed clients [repo: duolingo-web-app]
- Zod [repo: TaskPilot-AI]
- PWA and i18n in 10 languages [repo: Airtel-Sync]
- Web Speech API [repo: TaskPilot-AI, Airtel-Sync]
- Phaser 4 [repo: space-shooter]

**Backend**
- FastAPI, Pydantic v2 [repo: RazorShield…, TaskPilot-AI, AgenticAiSafety, Airtel-Sync, duolingo-web-app, trademarkia-semantic-search]
- WebSockets with replay and backpressure [repo: TaskPilot-AI]
- SQLAlchemy 2 + Alembic [repo: RazorShield…, duolingo-web-app]
- JWT (PyJWT) and bcrypt [repo: RazorShield…]
- RBAC and audit logging [repo: RazorShield…, Airtel-Sync]
- Node.js and Express [repo: ExpenseTracker]
- Cryptography: X25519, AES-256-GCM, Merkle trees [repo: Zero-Trust…]

**Databases**
- PostgreSQL [repo: RazorShield…]
- SQLite [repo: duolingo-web-app, AgenticAiSafety]
- Supabase [repo: nutrition-tracker, Zero-Trust…]
- MongoDB / Mongoose [repo: ExpenseTracker]
- FAISS vector index [repo: trademarkia-semantic-search]

**AI / ML**
- LLM tool-calling agents (Gemini, Claude, OpenAI behind provider abstractions) [repo: Airtel-Sync, TaskPilot-AI, RazorShield… (agent/)]
- Prompt-injection defence and an agent-security evaluation harness [repo: AgenticAiSafety]
- Browser automation agents with Playwright [repo: TaskPilot-AI]
- XGBoost and scikit-learn (gradient boosting, logistic regression, Random Forest, GMM) [repo: RazorShield…, Airtel-Sync, Customer-Churn-Predictor, trademarkia-semantic-search]
- Anomaly detection [repo: RazorShield…]
- sentence-transformers embeddings and semantic caching [repo: trademarkia-semantic-search]
- OCR with Tesseract and OpenCV-style preprocessing (deskew, blur score) [repo: Airtel-Sync]
- Streamlit [repo: Customer-Churn-Predictor, ai-healthcare-decision-support-system]
- FLAN-T5 / Mistral-7B fine-tuning on Hugging Face [old-portfolio, internship claim]. ✅ Confirmed by Kartik, 2026-11-16 (hero copy).

**DevOps & Tools**
- Docker and Docker Compose [repo: RazorShield…, TaskPilot-AI, trademarkia-semantic-search]
- GitHub Actions (backend, frontend, integration and security workflows) [repo: TaskPilot-AI]
- pytest [repo: RazorShield…, TaskPilot-AI, AgenticAiSafety, Airtel-Sync, duolingo-web-app]
- Vitest + React Testing Library [repo: TaskPilot-AI]
- Playwright end-to-end tests [repo: duolingo-web-app]
- ruff and mypy [repo: RazorShield…, duolingo-web-app]
- Git
- AWS: certification claim [old-portfolio]; real-time AWS Rekognition pipelines confirmed by Kartik, 2026-11-16 (hero copy). The certification itself is still *TODO: confirm.*

## 4. Experience

> **Update 2026-11-16 (confirmed by Kartik with reference screenshots).**
> - **Experience:** all three roles are confirmed and now shown on the site in place of the
>   "Building in public" log.
>   - SDE Intern, Successive Digital (June 2026 – Present, Noida); linked to the ExpenseTracker
>     repo.
>   - Artificial Intelligence Intern, Codec Technologies (Jul–Aug 2025, Mumbai).
>   - Research Intern, Model Impact Analyst, SRIP VIT Chennai (May–Jun 2025, Chennai).
> - **Education:** confirmed, with the Recognition row removed.
>   - B.Tech CSE, VIT Chennai, 2023–2027, 9.15 CGPA.
>   - CBSE 12th, Central Academy School Pali, 2020–2021, 94.6%.
>   - CBSE 10th, same school, 2018–2019, 90.0%.
> - **Certifications:** all five are confirmed, each linked to a credential document
>   (Google Drive) supplied by Kartik. They appear in a new Certifications section.


All entries come from the old portfolio and LinkedIn could not be checked, so each role is **TODO: confirm titles, dates and bullets with Kartik**.

**SDE Intern — Successive Digital** · June 2026 – Present · Noida, India [old-portfolio]. ✅ Role confirmed by Kartik, 2026-11-16: full-stack work with React, Next.js, Node.js, Express, MongoDB and Supabase (hero copy). Dates, location and impact bullets are still to confirm.
- Full-stack training on the MERN stack: real-world assignments, version-controlled projects, and a production-ready MERN capstone [old-portfolio]
- Possibly related: `ExpenseTracker` describes itself as a "MERN intern training project" (React, Express, MongoDB, JWT) [repo: ExpenseTracker]. *TODO: confirm the link and whether it can be shown.*
- *TODO: Kartik to supply 2–3 impact bullets.*

**Artificial Intelligence Intern — Codec Technologies** · Jul 2025 – Aug 2025 · Remote. The old portfolio lists the location as both "Mumbai" and "Remote". [old-portfolio]
- AICTE & ICAC-approved applied-ML internship [old-portfolio]
- Built Customer Churn Prediction with a logistic-regression model and a Streamlit app (~80% accuracy, as stated in the repo) [repo: Customer-Churn-Predictor; old-portfolio]
- Built Weather Data Analysis & Temperature Prediction: regression forecasting, Naive Bayes summary classification, and a Streamlit app [repo: Weather-Data-Analysis-and-Prediction; old-portfolio]
- Covered the end-to-end ML workflow: preprocessing, training, evaluation and deployment [old-portfolio]

**Research Intern (Model Impact Analyst) — SRIP, VIT Chennai** · May 2025 – Jun 2025 · Chennai [old-portfolio]
- Generated questions based on Bloom's Taxonomy using FLAN-T5 and Mistral-7B-Instruct [old-portfolio]
- Curated educational datasets, fine-tuned models, and deployed them to the Hugging Face Hub [old-portfolio]
- Evaluated outputs across taxonomy levels and improved results with prompt engineering [old-portfolio]
- *TODO: a Hugging Face link would make this verifiable.*

## 5. Projects

### Featured

#### 5.1 RazorShield AI: payment risk & fraud intelligence platform
- **One-liner:** Real-time payment-risk platform that combines an ML fraud model, behavioural anomaly detection, deterministic policy and human-in-the-loop investigation in one auditable console. [repo: RazorShield-AI-Autonomous-Payment-Risk-Fraud-Intelligence-Platform]
- **Problem:** Fraud is rare in high transaction volumes. Fraud teams need to know *why* a payment is risky, which rule fired, and who acted, not just a fraud = true flag. [repo]
- **Solution:** An 8-step pipeline: intake → fraud model → behavioural analysis → investigation → policy → decision (approve / step-up / review / block) → persistence → audit. [repo]
- **Architecture:** React dashboard → FastAPI → PostgreSQL (SQLAlchemy + Alembic). The repo has separate `ml/` (features, training, inference, anomaly), `agent/` (LLM investigation agent behind a provider abstraction) and `policy/` (YAML deterministic policy) packages. Everything runs in Docker Compose. [repo]
- **Stack:** Python, FastAPI, SQLAlchemy, Alembic, PostgreSQL, XGBoost, scikit-learn, pandas, Anthropic SDK, PyJWT, bcrypt, React, TypeScript, Docker. [repo: backend/requirements.txt, README]
- **Key features:**
  - Live risk stream
  - Transaction explorer
  - Explainable decisions
  - Model-vs-anomaly disagreement view
  - Investigation workflow
  - RBAC with four roles (Admin, Risk Analyst, Merchant, Viewer)
  - Audit log
  - Controlled transaction simulator, with every generated transaction labelled `SIMULATED` [repo]
- **Engineering highlights:**
  - Prevents temporal leakage structurally: feature functions receive only a `HistoryWindow` and have no database access, so they cannot read future rows [repo: docs/ml-methodology.md]
  - JWT verification uses a fixed algorithm list, which blocks `alg:none` and HS/RS confusion [repo: backend/requirements.txt comments]
  - 49 test files [repo]
  - ruff and mypy [repo]
- **Repo:** https://github.com/Kartikpatel1202/RazorShield-AI-Autonomous-Payment-Risk-Fraud-Intelligence-Platform
- **Live:** https://razor-shield-ai-autonomous-payment.vercel.app [repo homepage]. **Unverified:** the TLS certificate was untrusted from the research machine. TODO: confirm the demo works.
- **Screenshots:** available, 28 images in `docs/` (Dashboard1–3.png, architecture.png and others) [repo]
- **Note:** this is a demo platform and is not affiliated with Razorpay. The site copy must keep that disclaimer. [repo]

#### 5.2 TaskPilot AI: voice-controlled browser agent
- **One-liner:** Voice- and text-controlled agent that turns English, Hindi or Hinglish requests into validated, risk-classified browser plans, then runs them in real Chromium with human approval before anything sensitive. [repo: TaskPilot-AI]
- **Problem:** Everyday web chores such as grocery carts, emails and calendar events take many clicks, and naïve agents act unsafely. [repo]
- **Solution:**
  - An LLM planner (Anthropic or OpenAI, with an offline rule-based fallback) produces a typed plan
  - Nothing runs until the user clicks **Run Plan**
  - Playwright then executes the plan, streams live screenshots, and stops at approval checkpoints
  - Payments, checkout, order placement, sending email and deletion are never automated [repo]
- **Architecture:**
  - Next.js 14 dashboard with a Context + reducer and Zod-validated events
  - REST plus WebSocket telemetry (ordered, deduplicated, with replay)
  - FastAPI services, with a state machine and event manager
  - Planner, a Playwright browser manager, an execution engine, domain adapters (Blinkit, Amazon India, YouTube, Gmail drafts, Google Calendar) and a capability registry [repo]
- **Stack:** Python, FastAPI, Pydantic v2, asyncio, Playwright, Next.js 14, React 18, TypeScript (strict), Tailwind, shadcn/ui, Zod, Web Speech API, Docker, GitHub Actions. [repo]
- **Key features:**
  - Multilingual intent classification (12 intents)
  - Session memory and clarification questions
  - Live browser preview over a binary WebSocket
  - Deterministic product matching and cart verification
  - Exact-event approval for calendar actions
  - Safe downloads (allow-list, MIME/magic validation, SHA-256 hashing) [repo]
- **Engineering highlights:**
  - Backend: 579 tests (as stated in the README)
  - Frontend: 182 tests (as stated in the README)
  - Four GitHub Actions workflows: backend, frontend, integration, security
  - Navigation guard with public-IP DNS checks
  - Documented limitations: commerce, YouTube, Gmail and Calendar flows were tested only against local fixtures, not the live sites [repo]
- **Repo:** https://github.com/Kartikpatel1202/TaskPilot-AI
- **Live:** none (runs locally) [repo]
- **Screenshots:** only 1 image in the repo. TODO: capture dashboard screenshots.

#### 5.3 AirtelSync (Project Udyam Digital): AI-assisted SMB onboarding
- **One-liner:** Multilingual small-business acquisition and onboarding platform. An AI advisor recommends plans, deterministic code decides eligibility and price, and OCR-based KYC is followed by an order tracker and a sales console. [repo: Airtel-Sync]
- **Context:** YTL Hackathon 2026, Enterprise Track A. Built for the fictional operator "Accel Business". [repo]
- **Team project:** the commit history has 2 authors, and Kartik made 4 of 12 commits [repo: git log]. *TODO: confirm Kartik's role, team size and any result.*
- **Problem:** Small-business owners need connectivity bundles but face confusing pricing, slow KYC and opaque installation. [repo]
- **Solution:** The LLM handles conversation, while deterministic code decides eligibility, price and KYC verdicts. An output guard rejects any price or product ID that no tool returned. [repo]
- **Architecture:** React + Vite PWA → FastAPI. The repo has a pure-function engine (eligibility, pricing, recommendation), GSTIN checksum and Udyam validators, mock registry APIs, and a pytest suite. [repo]
- **Stack:** Python, FastAPI, React, TypeScript, Vite, Gemini / Claude tool calling, Tesseract OCR, Fernet encryption, scikit-learn logistic regression. Twilio WhatsApp is optional and untested without credentials. [repo]
- **Key features:**
  - Advisor chat in 10 UI languages, with voice input
  - Three-tier plan cards and a quote builder
  - 5-layer KYC verdicts: approved, needs_action, review, blocked
  - Order state machine with SLA flags
  - Sales console with a lead-scoring model [repo]
- **Engineering highlights:**
  - Lead-score model: AUC 0.70; top decile converts at 18.2% vs a 7.4% base (2.45×) [repo]
  - KYC eval: 12/12 specimen applicants match the answer key [repo]
  - Engine rejects all 49 rule-breaking line items from the case data [repo]
  - Advisor eval harness: 30 scenarios [repo]
  - Data protection: raw ID images encrypted at rest and deleted after the decision; IDs masked in API responses [repo]
- **Repo:** https://github.com/Kartikpatel1202/Airtel-Sync
- **Live:** none [repo]
- **Screenshots:** 57 images in the repo [repo]

#### 5.4 Agentic AI Safety: adversarial robustness of LLM agents
- **One-liner:** Security and evaluation framework that builds an LLM agent, attacks it systematically, defends it in layers, and measures whether the defence works. [repo: AgenticAiSafety]
- **Problem:** Tool-using LLM agents are exposed to prompt injection, jailbreaks and data exfiltration. [repo]
- **Solution:**
  - Ingress: validation, nine attack detectors, risk scoring and a policy engine
  - Tool governance: every tool call is authorised independently
  - Egress: credential and canary-token checks
  - A 228-case custom benchmark and an operator dashboard [repo]
- **Architecture:** React + TypeScript + Tailwind (Vite) → FastAPI → SQLAlchemy/SQLite. Provider-agnostic LLM layer with OpenAI-compatible endpoints. [repo]
- **Stack:** Python 3.11, Pydantic v2, FastAPI, SQLAlchemy, SQLite, React 18, TypeScript, Tailwind, Vite. [repo]
- **Headline result:** on the deterministic **mock provider**, attack success fell from 7/29 to 0/29, with 0/7 false positives, 0 unauthorized tool runs and 0 canary leaks. [repo]
  - The repo says this measures the security pipeline, not robustness under a real model. Real-provider runs have **not** been done. The site copy must keep this caveat.
- **Engineering highlights:**
  - 986 backend tests and 143 frontend tests (as stated in the README) [repo]
  - Phase 7.5 and Phase 8 audits found and fixed concurrency and ordering bugs that the earlier tests missed [repo]
- **Repo:** https://github.com/Kartikpatel1202/AgenticAiSafety
- **Live:** none
- **Screenshots:** none in the repo. TODO: capture the dashboard.

### Other projects

1. **Lingo: Duolingo-style language-learning app.**
   - Built for an SDE assessment.
   - Next.js 16, React 19, strict TypeScript, Tailwind v4, TanStack Query, FastAPI, SQLAlchemy 2, SQLite.
   - Five exercise types, server-side gamification (XP, hearts, streaks, leagues), real accounts.
   - Tested with pytest, ruff, mypy and Playwright e2e.
   - Repo: https://github.com/Kartikpatel1202/duolingo-web-app · Live: https://duolingo-web-app-self.vercel.app (**unverified**: TLS error from the research machine)
   - Present it as "Lingo" and avoid using Duolingo's brand assets on the portfolio.
   - Source: [repo: duolingo-web-app]
2. **Semantic Search with Fuzzy Clustering & Semantic Cache.**
   - Internship assignment for Trademarkia.
   - 20 Newsgroups dataset, MiniLM embeddings, FAISS, GMM soft clustering, a custom cosine-similarity cache, FastAPI and Docker.
   - Repo: https://github.com/Kartikpatel1202/trademarkia-semantic-search
   - Source: [repo: trademarkia-semantic-search]
3. **Zero Trust Secure Messaging.**
   - X25519 key exchange, AES-256-GCM, Merkle-tree identity verification, Supabase.
   - Python backend with a React (Vite) frontend.
   - Repo: https://github.com/Kartikpatel1202/Zero-Trust-Application-Security-System
   - Source: [repo: Zero-Trust-Application-Security-System]
4. **Nutrition Tracker & Meal Suitability Score.**
   - Next.js, Supabase and Tailwind; rule-based nutrient scoring and recommendations.
   - The README says "AI-powered", but the code has no LLM or ML calls, so the site must call it rule-based. The repo description cites ICMR/WHO standards, but they are not referenced in the code. TODO: confirm.
   - Co-authored: 2 contributors in the git history.
   - Repo: https://github.com/Kartikpatel1202/nutrition-tracker · Live: https://ai-nutrition-tracker-pearl.vercel.app (**unverified**)
   - Source: [repo: nutrition-tracker]
5. **AI Healthcare Decision Support (heart-disease risk).**
   - Streamlit, scikit-learn (Random Forest / Decision Tree / SVM), SQLite, ReportLab PDF reports.
   - The repo states 98.5% accuracy. Do not quote it without confirming the evaluation method.
   - Repo: https://github.com/Kartikpatel1202/ai-healthcare-decision-support-system
   - Source: [repo: ai-healthcare-decision-support-system]
6. **Space Shooter.**
   - Phaser 4 + Vite arcade game with waves, upgrades, a shop and combos.
   - Repo: https://github.com/Kartikpatel1202/space-shooter
   - Source: [repo: space-shooter]

**Not shown on the site:** Customer-Churn-Predictor and Weather-Data-Analysis are mentioned under the Codec internship instead. BECO_DATA_ANALYST_ASSIGNMENT is a data-analysis assignment with no code languages. ExpenseTracker is an intern training scaffold. kartik-portfolio is superseded by this site.

## 6. Achievements & certifications

All entries come from the old portfolio, which links each one to a Google Drive PDF. They are not verified against issuer registries. **TODO: confirm each, and provide Credly or verification URLs if available.**

- AWS Certified Solutions Architect – Associate · Amazon Web Services · April 2026 [old-portfolio]
- Oracle Certified Professional: Java SE 17 Developer · Oracle University · July 2025 [old-portfolio]
- Oracle Cloud Infrastructure 2025 Certified Generative AI Professional · Oracle University · August 2025 [old-portfolio]
- Deloitte Australia Data Analytics Job Simulation · Forage · July 2025 [old-portfolio]
- Introduction to Generative AI – Art of the Possible · AWS · July 2025 [old-portfolio]
- YTL Hackathon 2026 participant, Enterprise Track A [repo: Airtel-Sync]. *TODO: result or placement?*

## 7. Education

- **B.Tech, Computer Science & Engineering — Vellore Institute of Technology, Chennai** · 2023–2027 · CGPA 9.15 [old-portfolio; institute also in repo: BECO_DATA_ANALYST_ASSIGNMENT]. *TODO: confirm the current CGPA.*
- CBSE Class XII — Central Academy School, Pali · 2020–2021 · 94.6% [old-portfolio]. *TODO: confirm and decide whether to show.*
- CBSE Class X — Central Academy School, Pali · 2018–2019 · 90.0% [old-portfolio]. *TODO: confirm and decide whether to show.*

## 8. Contact

- GitHub: https://github.com/Kartikpatel1202 [GitHub profile]
- LinkedIn: https://www.linkedin.com/in/kartik-patel-49289028b/ [brief]
- Email: kartikpatel06471@gmail.com. ✅ Confirmed by Kartik, 2026-11-16.
- Instagram: instagram.com/kartikpatel1202 [old-portfolio]. ✅ Kartik asked for it on the site, 2026-11-16.
- Logos (Successive Digital, Codec Technologies, VIT, Central Academy School; AWS, Oracle, Forage): ✅ supplied by Kartik, 2026-11-18 and 2026-11-19; square marks cropped into assets/logos/ for the work-history, education and certification cards..

## 9. Needs input from Kartik

LinkedIn was blocked by its sign-in wall. Please paste the following.

1. **LinkedIn headline** and About text.
2. **Experience:** confirm titles, organisations, dates and locations for Successive Digital, Codec Technologies and SRIP VIT. Add 2–4 impact bullets each, especially for the current Successive Digital role. Add any other roles.
3. **Education:** ✅ CGPA 9.15 confirmed by Kartik, 2026-11-16 (shown on the site). Still to confirm: whether to show Class X and XII.
4. **Certifications:** confirm each of the five, with a verification link (Credly, AWS validation number, Oracle CertView) if possible.
5. **Achievements:** YTL Hackathon result; any rankings, contests or publications.
6. **AirtelSync:** your role and team size; Vishal also committed to it.
7. **Nutrition Tracker:** your role (2 contributors) and whether it should be called "AI".
8. **Healthcare project:** how the 98.5% accuracy was measured, or permission to omit it.
9. **SRIP research:** a Hugging Face model or dataset link, or the paper.
10. **Live demos:** confirm the RazorShield, Lingo and nutrition demos are up. They could not be loaded from this machine because the TLS certificates were not trusted here.
11. **Screenshots:** TaskPilot AI and AgenticAiSafety have none in their repos. Please share them, or let me capture them from a local run in a later phase.
12. ~~**Contact:** the email to publish, plus a current résumé PDF.~~ ✅ Both supplied 2026-11-16.
13. **Photo:** ✅ Resolved 2026-11-16: supplied for the redesign (navy suit, outdoors). The background was removed locally; the original and the cutout are in `assets/portrait/source/`.
14. **Headline wording:** approve or edit the proposed headline and positioning line in §1.

## 10. Sources

- https://github.com/Kartikpatel1202
- https://api.github.com/users/Kartikpatel1202
- https://api.github.com/users/Kartikpatel1202/repos?per_page=100&sort=updated
- https://api.github.com/repos/Kartikpatel1202/{repo}/languages, for all 15 repos
- https://api.github.com/repos/Kartikpatel1202/Kartikpatel1202 (404: no profile README)
- Shallow clones (README, source tree, commit history) of:
  - https://github.com/Kartikpatel1202/Airtel-Sync
  - https://github.com/Kartikpatel1202/TaskPilot-AI
  - https://github.com/Kartikpatel1202/AgenticAiSafety
  - https://github.com/Kartikpatel1202/RazorShield-AI-Autonomous-Payment-Risk-Fraud-Intelligence-Platform
  - https://github.com/Kartikpatel1202/duolingo-web-app
  - https://github.com/Kartikpatel1202/nutrition-tracker
  - https://github.com/Kartikpatel1202/Zero-Trust-Application-Security-System
  - https://github.com/Kartikpatel1202/trademarkia-semantic-search
  - https://github.com/Kartikpatel1202/space-shooter
  - https://github.com/Kartikpatel1202/ai-healthcare-decision-support-system
  - https://github.com/Kartikpatel1202/ExpenseTracker
  - https://github.com/Kartikpatel1202/Customer-Churn-Predictor
  - https://github.com/Kartikpatel1202/Weather-Data-Analysis-and-Prediction
  - https://github.com/Kartikpatel1202/BECO_DATA_ANALYST_ASSIGNMENT
  - https://github.com/Kartikpatel1202/kartik-portfolio
- https://www.linkedin.com/in/kartik-patel-49289028b/ (redirected to the sign-in wall; no data used)
- Attempted, but the TLS certificate was untrusted on this machine, so not verified:
  - https://razor-shield-ai-autonomous-payment.vercel.app
  - https://duolingo-web-app-self.vercel.app
  - https://ai-nutrition-tracker-pearl.vercel.app
  - https://kartik-portfolio-1202.vercel.app
