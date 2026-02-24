# Architecture Pivot: Tao as The Platform
**Generated:** 2026-02-22 15:57 UTC  
**Based on:** Cam's vision + Product Hacker marketing page analysis

---

## The New Stack (Simplified)

### Before (8-9 Apps)
```
Product Hacker (marketing)
├─ Rally (CRM)
├─ TaskCrush (productivity)
├─ Tribe (community)
├─ Data Services (API marketplace)
├─ BlankSlate (feedback)
├─ Tao (observability)
├─ Reflectory (voice)
└─ PeanutButter, EarnQuest, etc.
```

**Problem:** Too many apps, duplicated services, unclear positioning

---

### After (3 Core + Showcases)
```
PRODUCT HACKER (Marketing & Brand)
  - producthacker.ai (showcase site)
  - Blog, docs, app directory
  - "The platform that delivers outcomes"

TAO (The Platform Backend)
  - api.producthacker.ai or api.taodata.ai
  - Everything with APIs lives here:
    • Execution APIs (enrichment, HornetHive, normalization)
    • Observability APIs (traces, evals, alignment)
    • Templates & Worklab
    • Voice streaming (Gemini)
    • Auth, rate limiting, billing
  - Single Railway deployment
  - Positioning: "AI execution + evaluation platform"

RALLY (The Main Product)
  - rally.producthacker.ai
  - Outcomes platform UI
  - Free tier + Intelligence Wallet
  - Calls Tao for everything
  - Positioning: "AI-powered business outcomes"

SHOWCASES (Optional)
  - Reflectory (voice-first AI, proves Gemini streaming works)
  - BlankSlate (feedback widget, could be Rally feature)
```

---

## Why Merge Crucible into Tao

**Cam's question:** "Is there a reason Tao wouldn't have the crucible functionality in it?"

**Answer: No. Merge them.**

### Reasons TO Merge:

1. **Tao already has APIs** — alignment, traces, prompts registered
2. **Adding execution APIs is natural** — enrichment, HornetHive routing, voice streaming
3. **Simpler for users** — One API surface, one auth, one subscription
4. **Better positioning** — "Tao: AI execution + evaluation platform" (not just observability)
5. **Deployment simplicity** — One Railway service instead of two
6. **Unified tracing** — Every execution API auto-traces itself (dogfooding)
7. **Stronger product** — Tao becomes the platform, not just a monitoring tool

### Reasons NOT to Merge:

1. ~~Separation of concerns~~ — **Counterpoint:** They're already intertwined (evals need execution, execution needs evals)
2. ~~Harder to sell Tao standalone~~ — **Counterpoint:** Richer product = easier to sell ("execution + evals" > "just evals")
3. ~~More complex codebase~~ — **Counterpoint:** Current Crucible/HiveForge MCP is already complex, merging reduces surface area

**Verdict: Merge them. Tao becomes "the platform."**

---

## What Tao Would Contain (Post-Merge)

### 1. Execution APIs
```
POST /api/v1/enrich/company
POST /api/v1/enrich/contact
POST /api/v1/normalize/contacts
POST /api/v1/email/find
POST /api/v1/voice/stream (Gemini streaming)
POST /api/v1/crews/researcher/execute (HornetHive routing)
```

### 2. Observability APIs (Already Exists)
```
POST /api/v1/traces
POST /api/v1/prompts/register
GET  /api/v1/alignment/all
GET  /api/v1/evals/{prompt_id}
```

### 3. Templates & Worklab
```
GET  /api/v1/templates (app templates? prompt templates?)
POST /api/v1/worklab/experiments (A/B test prompts)
```

### 4. Auth & Billing
```
POST /api/v1/auth/login
POST /api/v1/billing/credits (Intelligence Wallet)
GET  /api/v1/usage/{user_id}
```

---

## App Consolidation Plan

### Rally Subsumes:
- ✅ **TaskCrush** — Tasks/goals become Rally features ("Outcomes → Tasks")
- ✅ **Tribe** — Community becomes Rally workspace sharing
- ✅ **Data Services UI** — Enrichment is Rally's backend, no separate UI needed

**Result:** Rally is the one "outcomes platform" — contacts, tasks, goals, campaigns, all traced by Tao

### Tao Subsumes:
- ✅ **Data Services backend** — Enrichment APIs live in Tao
- ✅ **HiveForge MCP / Crucible** — Service routing + execution in Tao
- ✅ **HornetHive routing** — Tao proxies to HornetHive, traces the calls
- ✅ **Reflectory voice backend** — Gemini streaming service in Tao

**Result:** Tao is the unified platform API — execution + evaluation in one place

### Product Hacker Becomes:
- ✅ **Marketing site** — Showcases Rally, Tao, Reflectory
- ✅ **App directory** — "Apps built on Tao"
- ✅ **Docs hub** — API docs, guides, changelog

---

## Railway Project Structure (Simplified)

### Current (Too Many Services):
```
Railway Project: Product Hacker
├─ rally-backend
├─ taskcrush-backend
├─ data-services-backend
├─ hiveforge-mcp
├─ tao-data
├─ blankslate-backend
└─ product-hacker-frontend
```

### Proposed (3 Services):
```
Railway Project: Product Hacker
├─ tao (the platform backend)
│   - Port 8000
│   - All APIs (execution + observability)
│   - Internal URL: http://tao.railway.internal
│   - Public URL: https://api.taodata.ai
│
├─ rally (frontend + minimal backend)
│   - Port 3000
│   - React SPA + Express for auth/session
│   - Calls Tao for everything else
│   - Public URL: https://rally.producthacker.ai
│
└─ product-hacker (marketing site)
    - Port 3001
    - Next.js SSG
    - Public URL: https://producthacker.ai
```

**Optional:**
```
├─ reflectory (voice showcase)
│   - Port 3002
│   - Calls Tao /api/v1/voice/stream
│   - Public URL: https://reflectory.producthacker.ai
```

---

## Migration Path

### Phase 1: Move Enrichment to Tao (This Week)
1. Copy enrichment services from data-services → Tao
2. Add routes: `/api/v1/enrich/company`, `/api/v1/enrich/contact`
3. Rally calls Tao instead of local enrichment
4. Deprecate data-services backend

### Phase 2: Move HornetHive Routing to Tao (Next Week)
1. Copy HornetHive client from Crucible → Tao
2. Add routes: `/api/v1/crews/{crew_type}/execute`
3. Rally calls Tao for HornetHive crews
4. Deprecate Crucible/HiveForge MCP

### Phase 3: Move Voice to Tao (This Month)
1. Extract Gemini streaming from Reflectory → Tao
2. Add route: `/api/v1/voice/stream`
3. Reflectory calls Tao for voice
4. Rally can add voice features (voice compose, voice brief)

### Phase 4: Consolidate Rally Backend (Next Month)
1. Move Rally-specific routes to Tao
2. Rally frontend becomes pure SPA
3. One API, one auth, one deployment

---

## Positioning Post-Consolidation

### Tao
**Tagline:** "AI execution + evaluation platform"  
**Pitch:** "Tao runs your AI services and tells you if they're working. Enrichment, crews, voice — all traced, versioned, evaluated."  
**Buyers:** Dev teams, AI startups, agencies  
**Price:** $99-$499/mo SaaS + usage-based for execution APIs

### Rally
**Tagline:** "AI-powered business outcomes"  
**Pitch:** "Rally gets work done. Research, outreach, analysis, strategy. Pay for outcomes, not subscriptions."  
**Buyers:** Founders, sales teams, operators  
**Price:** Free tier + Intelligence Wallet (usage-based)

### Product Hacker
**Tagline:** "The platform that delivers outcomes"  
**Pitch:** "Product Hacker apps run on Tao. Build fast, ship fast, improve fast. Apps, APIs, and the eval layer to make them better."  
**Buyers:** Developers, agencies, technical founders  
**Price:** Platform play (Rally + Tao bundled)

---

## What Gets Sunset

### Immediate:
- ❌ **TaskCrush** (standalone app) → Features move to Rally
- ❌ **Tribe** (standalone app) → Workspace sharing in Rally
- ❌ **Data Services** (standalone UI) → APIs in Tao, no separate UI
- ❌ **HiveForge MCP** (as separate service) → Merged into Tao

### Keep as Showcases:
- ✅ **Reflectory** — Proves voice streaming works, uses Tao voice API
- ✅ **BlankSlate** — Could be Rally feature or standalone feedback widget
- ✅ **PeanutButter** — Niche app showcase (fitness), optional

---

## Technical: Tao API Structure

```
tao/
├── src/
│   ├── api/
│   │   ├── execution/        # NEW
│   │   │   ├── enrichment.ts
│   │   │   ├── normalization.ts
│   │   │   ├── email.ts
│   │   │   ├── voice.ts
│   │   │   └── crews.ts
│   │   ├── observability/    # EXISTS
│   │   │   ├── traces.ts
│   │   │   ├── prompts.ts
│   │   │   ├── alignment.ts
│   │   │   └── evals.ts
│   │   ├── auth.ts
│   │   ├── billing.ts
│   │   └── worklab.ts
│   ├── clients/
│   │   ├── hornethive.ts
│   │   ├── gemini.ts
│   │   ├── contactout.ts     # NEW
│   │   └── discolike.ts      # NEW
│   ├── middleware/
│   │   ├── auth.ts
│   │   ├── rateLimit.ts
│   │   └── taoTrace.ts       # Self-tracing
│   └── services/
│       ├── enrichment/
│       ├── voice/
│       └── evals/
```

---

## Revenue Model (Simplified)

### Rally (Free + Usage)
- Free tier: Unlimited storage, basic AI (5 credits/mo free)
- Intelligence Wallet: $10 = 100 credits, $50 = 600 credits, etc.
- Pro: $29/mo (remove footer, custom domain, 50 credits/mo included)

### Tao (SaaS + Usage)
- Starter: $99/mo (10k traces, basic evals, 1k execution API calls)
- Pro: $299/mo (100k traces, advanced evals, 10k execution API calls)
- Enterprise: Custom (unlimited, white-label, dedicated support)

### Bundled (Platform Play)
- Rally Pro + Tao Starter: $99/mo (instead of $128)
- Rally + Tao + Reflectory: Enterprise bundle

---

## Bottom Line

**Cam, you're right:**
1. **Rally makes TaskCrush + Tribe obsolete** → Consolidate into one outcomes platform
2. **Tao makes Data Services obsolete** → Execution APIs live in Tao, no separate UI
3. **Crucible should live IN Tao** → One platform backend, not two
4. **Everything with APIs lives in Tao** → Simplifies architecture, stronger product
5. **Product Hacker = marketing** → Showcases the platform, not a product itself

**New Stack:**
- **Tao** = The platform (execution + evals, everything with APIs)
- **Rally** = The main product (outcomes platform, calls Tao)
- **Product Hacker** = Marketing site (showcases Tao + Rally)
- **Reflectory** = Voice showcase (optional)

**Migration:** Start with enrichment → Tao this week. Rest follows over next month.

**Positioning:** "Outcomes Platform" is the key. Don't let us forget it. 🎯
