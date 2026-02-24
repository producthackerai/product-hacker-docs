# Cam's Weekend Ship Log + Integration Analysis
**Generated:** 2026-02-21 19:55 UTC  
**For:** Jody + ProductHackerAI agent

---

## What Cam Built (Feb 20-21)

### 1. **Product Hacker: App Registry + Alignment Dashboard**

#### App Registry (`APP_CONFIGS` in AppsDashboard.jsx)
Centralized registry of all Product Hacker apps with metadata:

```javascript
[
  { id: 'product-hacker', tag: 'product-hacker', url: 'https://producthacker.ai', repo: 'producthackerai/product-hacker' },
  { id: 'taskcrush', tag: 'taskcrush', url: 'https://taskcrush.producthacker.ai', repo: 'producthackerai/task-crush' },
  { id: 'solo-crm', tag: 'crm', altTags: ['solo-crm'], url: 'https://crm.producthacker.ai', repo: 'producthackerai/crm' },
  { id: 'blankslate', tag: 'blankslate', url: 'https://blankslate.producthacker.ai', repo: 'producthackerai/blankslate' },
  { id: 'data-services', tag: 'data-services', url: 'https://data.producthacker.ai', repo: 'producthackerai/data-services' },
  { id: 'peanutbutter', tag: 'peanutbutter', url: 'https://pb.producthacker.ai', repo: 'producthackerai/peanutbutter' },
  { id: 'tribe', tag: 'tribe', url: 'https://tribe.producthacker.ai', repo: 'producthackerai/tribe' },
  { id: 'earnquest', tag: 'earnquest', url: null, repo: 'producthackerai/earnquest' }, // NEW!
]
```

#### Alignment Scores (from Tao API)
- **Dashboard fetches from:** `https://api.taodata.ai/alignment/all`
- **Shows per-app conformance:** % score + visual checks
- **13 conformity checks tracked:**
  - GA Tag, Footer, CLAUDE.md, .gitignore
  - Supabase Auth, CSS Variables, Feature Request widget
  - Product Docs, History, Tao Integration, Tao Prompts
  - Arch Page, Health Check, Attachment Traces

#### Alignment Score Visualization
- Color-coded progress bars (red <50%, orange <70%, yellow <90%, green ≥90%)
- Per-check badges (✓ or ✗)
- Last scanned timestamp
- Pulls **live data from Tao** (not hardcoded)

#### Changelog + Request Integration
- Apps dashboard shows per-app:
  - Open requests (submitted → building)
  - Shipped requests
  - Feedback count
  - Changelog entries
  - Last update timestamp

**Key commit:** `02a278c` — "feat: alignment system overhaul — fetch scores from Tao API"

---

### 2. **Solo CRM: Photo Attachments + Data Extraction**

#### New Features (commits `ad54553`, `279a48b`)
- **Photo attachments in chat:** Users can attach images to Revenue Agent chat
- **AI data extraction:** AI extracts structured data from photos (business cards, screenshots, etc.)
- **Tao trace logging:** Attachment metadata (type, size, MIME) logged to Tao on every chat call

#### Auto-Prompt Daily Briefing (commits `c5a3eab`, `0135624`, `5af10be`)
- **Fixed auto-prompt trigger:** Now checks actual calendar date (not localStorage)
- **Daily briefing:** Checks calendar, emails, pipeline on first page load each day
- **Database-backed:** Uses Supabase check instead of sessionStorage

#### Google Calendar Integration (commit `27d8cb4`)
- **Full Google Calendar OAuth:** Read/write calendar events
- **Day view:** Shows meetings, blocks, free time
- **AI time block suggestions:** Revenue Agent suggests optimal meeting times based on calendar

#### Timezone + Working Hours (commit `e00ce4b`)
- **User profile fields:** Timezone, working hours (start/end)
- **Calendar time blocks:** Respect user timezone for scheduling

#### Feature Request Inline Form (commit `b598298`)
- **Requests tab:** Inline form to submit feature requests
- **Chat feedback button:** Easy access to BlankSlate pipeline from chat

#### Solo CRM 503 Fix (commit `334a2e1`)
- **4 layers of defense:** Timeout increases, retry logic, queue management, error handling
- **Problem:** Tool-heavy chat requests timing out → backend 503
- **Solution:** Longer timeouts, exponential backoff, graceful degradation

**Key commits:** `ad54553`, `27d8cb4`, `334a2e1`

---

### 3. **Tao Data: Alignment Endpoint**

#### `/alignment/all` API
Cam added (or Tao already had) an endpoint that returns alignment scores for all registered apps:

```json
[
  {
    "app_slug": "solo-crm",
    "score_pct": 85,
    "checks_passed": 11,
    "checks_total": 13,
    "checks": {
      "ga_tag": true,
      "footer": true,
      "claude_md": true,
      "tao_integration": false,
      "attachment_traces": true,
      ...
    },
    "last_scanned": "2026-02-21T15:30:00Z"
  },
  ...
]
```

**✅ CONFIRMED:** Endpoint is live at `https://api.taodata.ai/alignment/all`

**Agent verification (2026-02-21 19:58 UTC):**
- Endpoint accessible, returns 9 apps
- Apps registered: BlankSlate, Data Services, EarnQuest, PeanutButter, Product Hacker, Solo CRM, Tao, TaskCrush, Tribe
- All apps have `app_id`, `app_name`, `app_slug`
- **All scores are null** — conformity checks have NOT been run yet (no `scan_source`, no `last_scanned`)

**Implication:** The alignment infrastructure is ready, but the conformity scanner hasn't run. Need to trigger first scan.

---

### 4. **Product Hacker: Conformity Check Skill** (commit `2dab298`)

Referenced in CRM commit `90f7bfc` — "chore: add conformity-check skill, register-features script, update docs"

**Implies:** There's a skill (possibly in `backend/skills/conformity-check/`) that scans repos for alignment and pushes scores to Tao.

**Status:** File not found in my checks — might be in a different location or not committed yet.

---

## The Big Picture: What Jody (and the Agent) Need to Know

### 1. **App Registry is Now Centralized**
- Product Hacker has the canonical list of all apps
- Each app has: ID, name, tag, URL, repo, color, icon
- This powers the Apps dashboard

### 2. **Alignment Scores Come from Tao**
- Tao has an `/alignment/all` endpoint (or will soon)
- Product Hacker fetches it and displays conformance scores
- This creates accountability: "Is your app Product Hacker conformant?"

### 3. **Changelog + Requests are Cross-App**
- Changelog table has `app` column (recently added)
- Feature requests have tags that map to apps
- Apps dashboard aggregates across all apps

### 4. **Solo CRM Got Major Upgrades**
- Photo attachments + AI extraction
- Calendar integration
- Daily auto-prompt briefing
- 503s are fixed

---

## Integration Questions (for Cam/Jody)

### Q1: Tao App Registry ✅ **YES, IT EXISTS**
**Tao ALREADY has app registry!**

**Current Tao app registry schema:**
```json
{
  "app_id": "27b8286f-81aa-45a9-badf-f6fde08b9233",
  "app_name": "Solo CRM",
  "app_slug": "solo-crm",
  "score_pct": null,
  "checks_passed": null,
  "checks_total": null,
  "checks": null,
  "last_scanned": null,
  "scan_source": null
}
```

**9 apps registered in Tao:**
1. BlankSlate (`blankslate`)
2. Data Services (`data-services`)
3. EarnQuest (`earnquest`)
4. PeanutButter (`peanutbutter`)
5. Product Hacker (`product-hacker`)
6. Solo CRM (`solo-crm`)
7. Tao (`tao`)
8. TaskCrush (`taskcrush`)
9. Tribe (`tribe`)

**Proposal:** Product Hacker should **pull app registry from Tao** instead of hardcoding `APP_CONFIGS`.

**Current state:** Product Hacker has `APP_CONFIGS` hardcoded with additional metadata (url, repo, color, icon).

**Hybrid approach:**
1. Fetch `app_slug`, `app_name`, `app_id` from Tao `/alignment/all`
2. Merge with local metadata (url, repo, color, icon) stored in Product Hacker
3. If app exists in Tao but not in local config, use defaults

**Advantage:** Single source of truth for app list. Add a new app in Tao → automatically appears in Product Hacker dashboard (with default styling until local metadata added).

### Q2: HiveForge MCP App Registry
**Should HiveForge MCP know about all Product Hacker apps?**

Currently hiveforge-mcp has:
- TaskCrush tools
- BlankSlate tools
- Tao Data tools
- HiveForge Platform tools (SaaS instance management)

**Proposal:** Add a "Product Hacker App Registry" tool to HiveForge MCP:

```bash
curl -s -H "Authorization: Bearer $HIVEFORGE_SERVICE_KEY" \
  "$HIVEFORGE_API_URL/api/v1/openclaw/apps" | jq
```

Returns the canonical app list. Agents and skills can query it.

**Use cases:**
- AI agents need to know which apps exist to route feature requests
- Skills need app metadata to run conformity checks
- Dashboards need app list to fetch stats

### Q3: Conformity Check Automation
**How does the conformity check run?**

Options:
1. **Manual:** Someone runs a script that scans repos and pushes scores to Tao
2. **Cron:** Scheduled job runs nightly, scans all repos, updates Tao
3. **On-demand:** Apps dashboard has a "Scan Now" button that triggers checks
4. **CI/CD:** GitHub Actions runs conformity check on every commit, pushes to Tao

**Recommendation:** Option 2 (cron) + Option 4 (CI/CD) for real-time updates.

### Q4: Skills Location
**Where should conformity-check skill live?**

Jody's hiveforge skills (in `/openclaw/skills/`) are system-level.  
Cam's Product Hacker skills (referenced in CRM commit) are app-level.

**Proposal:**
- **System-level skill:** `/openclaw/skills/conformity-check` (scans any repo)
- **Product Hacker skill:** `/data/workspace/skills/conformity-check` (knows Product Hacker apps)

Agent should have access to both via the skills system.

---

## Next Steps (Action Items)

### For Cam:
1. **Confirm Tao `/alignment/all` endpoint is live** — Is it at `https://api.taodata.ai/alignment/all`?
2. **Check if Tao has app registry capability** — Can we store app metadata in Tao?
3. **Decide conformity check automation strategy** — Cron? CI/CD? Both?
4. **EarnQuest status** — It's in the app registry but has no URL. What is it?

### For Jody:
1. **Review conformity-check skill** — Does it exist? Where is it?
2. **Update OpenClaw skills** — Pull latest from Product Hacker if needed
3. **HiveForge MCP app registry tool** — Should we add this?

### For ProductHackerAI Agent (me):
1. **Update hiveforge skills** — If conformity-check exists, add it to my skill inventory
2. **Query Tao alignment endpoint** — Test if `/alignment/all` is accessible
3. **Propose HiveForge MCP enhancement** — Add app registry endpoint to hiveforge-mcp

---

## Technical Notes

### Tao Integration Pattern
All Product Hacker apps should follow this pattern:

1. **`taoClient.js` in backend** — Tao API wrapper
2. **Register prompts on startup** — `POST /prompts/register`
3. **Trace every AI call** — `POST /ingest` with prompt_id, input, output, latency, tags
4. **Use workspace_id** — Renamed from `project_id` (commit `885e11a`)

### Conformity Checks (13 total)
```javascript
{
  ga_tag: 'Has Google Analytics tag',
  footer: 'Has Product Hacker footer',
  claude_md: 'Has CLAUDE.md file',
  gitignore: 'Has .gitignore',
  supabase_auth: 'Uses Supabase auth',
  css_design: 'Uses CSS variable design system',
  feature_request: 'Has feature request widget',
  product_docs: 'Has product docs',
  history: 'Has history/changelog',
  tao_integration: 'Integrated with Tao Data',
  tao_prompts: 'Prompts registered in Tao',
  arch_page: 'Has architecture page',
  health_check: 'Has /api/health endpoint',
  attachment_traces: 'Traces file attachments',
}
```

### App Taxonomy
- **Product Hacker** = Parent platform + brand
- **TaskCrush** = Productivity (tasks, goals, habits)
- **Solo CRM** = Revenue (contacts, deals, plays, calendar)
- **BlankSlate** = Feedback pipeline (requests → ship)
- **Data Services** = API marketplace (enrichment, normalization)
- **PeanutButter** = Fitness (EMOM pull-ups/burpees tracker)
- **Tribe** = Community/social (unclear — Cam to clarify)
- **EarnQuest** = NEW (unclear — Cam to clarify)

---

## Summary

Cam built an **app registry + alignment dashboard** that:
- Tracks all Product Hacker apps in one place
- Fetches conformance scores from Tao in real-time
- Shows per-app stats (requests, changelog, feedback)
- Makes alignment visible and actionable

Solo CRM got major upgrades:
- Photo attachments + AI data extraction
- Google Calendar integration
- Daily briefing auto-prompt
- Fixed 503 timeout issues

**The vision:** Every Product Hacker app is conformant, observable, and connected. The alignment dashboard holds everyone accountable.

**Next:** Connect HiveForge MCP, Tao, and Product Hacker app registry so the whole system knows about every app.

---

**Status:** Waiting for Cam/Jody input on:
- Tao `/alignment/all` endpoint status
- Conformity-check skill location
- HiveForge MCP app registry proposal
- EarnQuest + Tribe app details
