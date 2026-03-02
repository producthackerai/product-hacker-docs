# Robot Overlord Probe

> "Is your site ready for AI agents?" — Paste a URL. Get a score. Meet your new overlords.

**Domain:** `agentprobe.producthacker.ai`
**Location:** `product-hacker/agentready/` (self-contained, HappyMailer pattern)
**Status:** v1 built — needs deploy + migration verification
**Date:** March 2026
**Authors:** Cam (vision + architecture + v1 build), Jody (review + annotations)

---

## What This Is

New public-facing app in the product-hacker repo (not a new repo). Lives at `agentready/` alongside `admin/`, `backend/`, `src/`, etc. Same pattern as Happy Mailer — self-contained Vite + Express app, shares Supabase with everything else.

**Concept:** Paste any URL, get an Agent Readiness Score (0-10). Checks how well AI agents can crawl, read, and interact with the site. Six scored categories plus a bonus human SEO score as a secondary section. Terminal aesthetic, shareable results, email capture.

**Cost:** ~$0.005 per scan (one Haiku 4.5 call). 10,000 scans = ~$50.
**Scan time:** ~10 seconds end-to-end.

---

## Scoring Model

### Agent Readiness Score (0-10) — Primary

Six categories, each scored 0-10, weighted into an overall score:

| Category | What It Measures |
|----------|-----------------|
| **Crawlability** | `robots.txt` quality, `sitemap.xml` presence/structure, crawl directives, AI crawler permissions (GPTBot, ClaudeBot, etc.) |
| **Machine Readability** | JSON-LD / Schema.org structured data, OpenGraph tags, Twitter cards, semantic HTML (`<article>`, `<nav>`, `<main>`) |
| **API Readiness** | `/.well-known/ai-plugin.json`, `/.well-known/agent.json`, Swagger/OpenAPI links, RSS/Atom feeds, `<link rel="api">` |
| **Agentic Commerce** | Can agents transact? Product schema, pricing markup, checkout APIs, payment endpoints, cart/order structured data |
| **Content Accessibility** | Heading hierarchy, meta descriptions, content length/density, JS-rendering dependency, text-to-markup ratio |
| **Agent Signals** | `llms.txt`, MCP manifests, agent-specific headers, CORS for API access, explicit agent instructions |

### SPA Detection (Analyzer Intelligence)

The analyzer prompt must detect JavaScript-rendered sites and score them accurately. When raw HTML is small (e.g. 1KB) but the site clearly has content behind JS:
- **Machine Readability** scores what's actually in the HTML — JSON-LD in `<head>`, meta tags, OpenGraph. No false claims about "missing headings" when headings exist but require JS to render.
- **Content Accessibility** takes the JS-rendering penalty — "content trapped behind JavaScript", "no noscript fallback", "agents fetching raw HTML get nothing."

This prevents double-counting the same problem across categories. A site with JSON-LD in the `<head>` but JS-rendered body content should score well on Machine Readability but poorly on Content Accessibility.

### Score Interpretation

| Score Range | Label | What It Means |
|-------------|-------|---------------|
| 0-2 | Invisible | Agents can't find or read your site at all |
| 3-4 | Basic | Minimal signals, agents are mostly guessing |
| 5-6 | Emerging | Some foundations in place, clear gaps remain |
| 7-8 | Ready | Agents can reliably discover and work with your site |
| 9-10 | Ahead | You're ahead of virtually everyone on the web |

The average site today scores **2-3**. Most of the internet isn't ready.

### Human SEO Score — Secondary Bonus Section

Traditional SEO signals as a secondary readout: title tag quality, meta description, page speed, HTTPS, mobile hints, canonical URLs. Free bonus value — makes the tool useful even for people who came for SEO and leave understanding agent readiness.

> **Note:** The "agentic commerce" category is a differentiator. No other free tool scores this. It positions us in the AI commerce conversation early.

---

## Architecture

```
User enters URL
  → POST /api/scan (rate limited: 5/min, 20/hr per IP)
    → scanner.js: fetches robots.txt, sitemap.xml, HTML, .well-known/ files (FREE, native fetch)
    → cheerio: parses HTML for JSON-LD, meta tags, semantic structure (FREE)
    → analyzer.js: one Haiku 4.5 call with all signals → JSON scores + findings (~$0.005)
    → scanStore.js: saves to tc_agent_readiness_scans, generates share_id
    → costTracker.js: logs to tc_skill_executions (app: 'probe')
    → adminNotify.js: creates tc_notifications for super_admins
  ← Returns scores, findings, recommendations, share URL
```

### Key Files (all built)

**Backend** (`server.js` + `server/`):

| File | Purpose |
|------|---------|
| `server.js` | Express entry point — 12 routes, rate limiting, OG tag injection for share URLs, static SPA serving |
| `server/scanner.js` | Free signal fetcher — parallel fetches robots.txt, sitemap.xml, HTML, .well-known/, llms.txt, ai-plugin.json, mcp.json, security.txt. 8s timeout, 200KB HTML limit. Custom User-Agent. |
| `server/analyzer.js` | Single Haiku 4.5 call — weighted scoring prompt (crawl 20%, machine read 20%, agent signals 20%, content access 15%, API ready 15%, agentic commerce 10%), SPA detection, JSON response parsing |
| `server/scanStore.js` | Supabase CRUD — save scan, get by share_id, update email, stats (total/domains/today), domain history (last 20) |
| `server/costTracker.js` | Fire-and-forget to `tc_skill_executions` with `app: 'probe'`. Haiku 4.5 pricing: $0.0008/1K in, $0.004/1K out |
| `server/adminNotify.js` | Fire-and-forget — fetches all super_admin user IDs, inserts `tc_notifications` rows (type: 'probe_scan') |
| `server/rateLimit.js` | In-memory dual-window rate limiter — 5/min + 20/hr per IP, auto-cleanup every 5 min |
| `server/supabase.js` | Supabase client init, loads .env from agentready root with backend fallback |

**Frontend** (`src/`):

| File | Purpose |
|------|---------|
| `App.jsx` | Hash-based routing (home/result/requests/changelog/faq/tos), 10 cycling loading messages, score color mapping, header nav |
| `components/ScanResult.jsx` | Animated SVG gauge (270-degree arc), 2-column category grid, findings with status icons (✓/✗/⚠), recommendations |
| `components/HumanSEO.jsx` | Collapsible SEO bonus section — click to expand/collapse |
| `components/ShareModal.jsx` | Copy link + Twitter + LinkedIn sharing with pre-filled text |
| `components/EmailCapture.jsx` | "Get notified when your score changes" — email opt-in |
| `components/ScanHistory.jsx` | Domain trend table — up to 20 scans, arrows (↑/↓/—), score diff, view links |
| `components/ScanCounter.jsx` | Homepage stats — total scans, unique domains, today's count |
| `components/FeatureRequests.jsx` | Full BlankSlate pipeline UI — submit form, status colors, complexity badges, voting (localStorage), relevance validation |
| `components/ReleaseNotes.jsx` | Changelog filtered to `app='probe'` |
| `components/FAQ.jsx` | 9 expandable questions (with personality) |
| `components/TermsOfService.jsx` | Legal terms, contact: cam@producthacker.ai |
| `components/Footer.jsx` | Links to all Product Hacker properties |
| `styles/probe.css` | Full terminal theme — black/amber/monospace, animations (fadeInUp, dotPulse), responsive mobile breakpoints |

> **Note:** `costTracker.js` replicates the main app's pattern but doesn't include the secondary Tao trace write. Could add later for observability parity.

### Rate Limiting

- **5 scans per minute** per IP (burst protection)
- **20 scans per hour** per IP (sustained abuse protection)

> **Note:** These are tighter than the main app's 200 req/min because each scan costs ~$0.005 in AI. At 20/hr sustained, worst case per-abuser cost is $0.10/hr — manageable.

---

## Database

### Table: `tc_agent_readiness_scans`

**Verify migration has been run in Supabase.** The code expects these columns:

| Column | Type | Purpose |
|--------|------|---------|
| `id` | serial PK | Auto-increment |
| `url`, `domain` | text | What was scanned |
| `overall_score` | numeric | Weighted 0-10 |
| `crawlability_score`, `machine_readability_score`, `api_readiness_score`, `agentic_commerce_score`, `content_accessibility_score`, `agent_signals_score`, `seo_score` | numeric | Per-category 0-10 |
| `raw_signals` | JSONB | Everything scanner.js fetched |
| `analysis` | JSONB | Full Haiku response (findings, recommendations, summary) |
| `seo_details` | JSONB | SEO-specific findings |
| `input_tokens`, `output_tokens` | int | Token usage |
| `model` | text | Model used (claude-haiku-4-5-20251001) |
| `cost_usd` | numeric | Computed cost |
| `latency_ms` | int | AI call duration |
| `ip_address`, `user_agent` | text | Request metadata |
| `email` | text | NULL until captured |
| `user_id` | UUID | NULL (public, no auth) |
| `share_id` | text (unique) | Random 6-byte base64url for share URLs |
| `scan_source` | text | Source identifier |
| `created_at`, `updated_at` | timestamptz | Timestamps |

Multiple scans per domain are expected — this is the scan history. Query by domain + order by `created_at DESC` to show trend lines and before/after comparisons.

### Existing Table Integrations

| Table | How Probe Uses It |
|-------|-------------------|
| `tc_skill_executions` | Cost tracking — every Haiku call logged with `app: 'probe'` |
| `tc_notifications` | Admin alerts — super_admins notified on each scan |
| `tc_feature_requests` | Feature requests from probe UI go through BlankSlate eval pipeline |
| `tc_changelog` | Release notes filtered to `app='robot-overlord-probe'` |

> **Note (future consideration):** Email capture currently saves to `tc_agent_readiness_scans.email`. If/when we want to bridge to Rally CRM, the `scanStore.js` is the natural place to add a `crmBridge` call — auto-create company from domain + contact from email, tagged `source: 'probe'`. Not in v1 scope, but the data model supports it cleanly.

---

## API Endpoints (all built)

| Method | Path | Rate Limit | Purpose |
|--------|------|------------|---------|
| `GET` | `/api/health` | — | Health check (Railway) |
| `POST` | `/api/scan` | 5/min, 20/hr | Run a scan — fetch signals + Haiku score + save + notify admins |
| `GET` | `/api/scan/:shareId` | — | Get shared scan result |
| `POST` | `/api/scan/:id/email` | — | Capture email for a scan |
| `GET` | `/api/scans/stats` | — | Total scans, unique domains, today's count |
| `GET` | `/api/scans/recent` | — | Last 10 scans (domain + score + date) |
| `GET` | `/api/scans/history/:domain` | — | Up to 20 scans for a domain (trend data) |
| `GET` | `/api/changelog` | — | Release notes filtered to `app='probe'` |
| `GET` | `/api/feature-requests` | — | List feature requests tagged 'probe' |
| `POST` | `/api/feature-requests` | 3/hr | Submit request (relevance validated against 30+ terms) |
| `POST` | `/api/feature-requests/:id/vote` | — | Vote on a request (calls `bs_increment_vote` RPC) |
| `GET` | `/s/:shareId` | — | Share page with dynamic OG tag injection for social previews |

No auth required on any endpoint — fully public app.

---

## Features Built

- **Terminal-themed React UI** — black + amber + monospace (HappyMailer aesthetic)
- **Animated SVG score gauge** — 270-degree arc with color-coded score
- **Six category cards** — each with score, findings (✓/✗/⚠ icons), and description
- **Human SEO section** — collapsible bonus readout
- **Share modal** — copy link + Twitter + LinkedIn with pre-filled text and dynamic OG tags
- **Email capture** — "Get notified when your score changes"
- **Scan history per domain** — trend table with arrows (↑/↓/—), score diff, up to 20 scans
- **Scan counter** — homepage stats (total scans, unique domains, today)
- **Feature requests** — full BlankSlate pipeline UI with status colors, complexity badges, voting, relevance validation
- **FAQ section** — 9 expandable questions (with personality)
- **Terms of Service** — real legal terms
- **Changelog** — filtered to probe-specific updates
- **Rate limiting** — dual-window in-memory (5/min, 20/hr per IP)
- **Cost tracking** — fire-and-forget to `tc_skill_executions`
- **Admin notifications** — fire-and-forget to all super_admins
- **10 cycling loading messages** — "Dispatching robot scouts...", "Reading robots.txt...", etc.
- **Hash-based routing** — no backend routing needed for page navigation
- **Google Analytics** — GA tag included
- **Responsive** — mobile breakpoints at 768px

---

## Design Language

```
Background:     #000000 (pure black)
Cards/panels:   #0a0a0a, #111111
Borders:        #1a1a1a, #333333
Accent:         #f59e0b (amber)
Accent hover:   #d97706
Score high:     #10b981 (emerald green)
Score mid:      #f59e0b (amber)
Score low:      #ef4444 (red)
Text primary:   #ffffff
Text body:      #cccccc
Text muted:     #888888
Font:           'SF Mono', 'Fira Code', 'JetBrains Mono', monospace
```

Terminal prompt `>` before inputs. Typewriter animation on results. Scan progress styled like CLI output with checkmarks. Score gauge uses ASCII-style progress bars.

---

## Deployment

### 1. Create Railway Service

- Railway dashboard → New Service → GitHub repo `producthackerai/product-hacker`
- Set root directory: `agentready`
- Railway auto-detects `railway.toml`
- Build: `npm install --include=dev && npm run build`
- Start: `node server.js`

### 2. Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=https://tdjyqykkngyflqkjuzai.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<copy from existing Railway service>
ANTHROPIC_API_KEY=<copy from existing Railway service>
PORT=3008
```

### 3. DNS

- CNAME: `agentprobe.producthacker.ai` → Railway service URL
- Railway → Settings → Custom Domain → add `agentprobe.producthacker.ai`

### 4. Verify

```bash
curl https://agentprobe.producthacker.ai/api/health
# → {"status":"ok","app":"agentic-overlord-probe",...}
```

Then visit `https://agentprobe.producthacker.ai` and scan a URL.

---

## Launch Content Play

### Blog Post 1: "Before" (draft exists at `internal-docs/blog-drafts/agentic-overlord-probe-launch.md`)

Cam already wrote this. Key beats:
- We scanned producthacker.ai, scored **5.2/10** ("Emerging")
- **What we did right** — Agent Signals 8.0 (llms.txt, ai-plugin.json, MCP manifest all present)
- **Where we got caught** — Machine Readability 2.0 (zero JSON-LD, no semantic markup in raw HTML)
- **The JS problem** — Content Accessibility 3.5 (site is a React SPA, agents see 1KB of loader HTML)
- **The tool fixed itself** — scanning our own site revealed a bug in the analyzer prompt (false claim about missing headings that actually exist but are JS-rendered). Filed feature request #382 through the probe's own feature request system. Fixed the prompt. Shipped the fix. Self-building app in action.
- **What we fixed** — JSON-LD (Organization + SoftwareApplication), sitemap.xml (5 URLs for all properties), robots.txt with sitemap reference, OG tags + Twitter Cards + canonical URL
- **What we didn't fix yet** — SPA rendering (needs SSR/pre-rendering, bigger lift)
- Ends with CTA to try the tool + promise of rescan results post

### Blog Post 2: "After" (not yet written)

Rescan producthacker.ai after fixes. Show score improvement. Write "How We Went From 5.2 to X.X" follow-up.

### The Self-Fixing Loop

This is the real demo of the BlankSlate thesis: the probe scans a site → finds a problem → but the problem description isn't quite right → which is itself a bug in the probe → that bug goes through the same feature request pipeline any user's feedback would → gets fixed → ships. The tool improves by using itself. That narrative is the launch post's strongest section.

---

## Reference: producthacker.ai Test Scan

Cam's local test — the baseline for the launch post:

| Category | Score | Key Findings |
|----------|-------|-------------|
| **Agent Signals** | 8.0 | llms.txt, ai-plugin.json, MCP manifest all present |
| **Crawlability** | 6.5 | robots.txt allows all bots, but no sitemap.xml |
| **API Readiness** | 4.0 | .well-known/ accessible, but no /api/ or /docs/ links, no OpenAPI spec |
| **Content Accessibility** | 3.5 | 1KB HTML shell, full JS-rendering dependency, no noscript fallback |
| **Machine Readability** | 2.0 | Zero JSON-LD, no structured data in raw HTML |
| **Agentic Commerce** | — | Not applicable (not a commerce site) |
| **Overall** | **5.2** | "Emerging" — strong agent signals but weak fundamentals |

---

## What's Left to Ship

1. **Verify `tc_agent_readiness_scans` migration** — confirm the table exists in Supabase with all columns the code expects. If not, run the migration.
2. **Verify `bs_increment_vote` RPC** — feature request voting calls this Supabase function. Confirm it exists.
3. **Create Railway service** — follow Cam's deployment steps above.
4. **Set environment variables** — copy keys from existing Railway services.
5. **Configure DNS** — CNAME `agentprobe.producthacker.ai` → Railway service URL.
6. **Smoke test** — scan producthacker.ai, verify score matches Cam's 5.2 baseline.
7. **Publish blog post 1** — Cam's draft is ready at `internal-docs/blog-drafts/agentic-overlord-probe-launch.md`.

## Open Questions

1. **Name in UI** — Code says "Agentic Overlord Probe" throughout. Keep as-is or rebrand to "Robot Overlord Probe"?
2. **Email capture flow** — Currently: full score free, email opt-in for "track changes." Is that the right gate or should the detailed fix-it guide be behind email?
3. **Blog post timing** — Publish post 1 day-of launch? Or wait for some organic scans first?
