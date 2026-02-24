# Rally Master Action List
**Generated:** 2026-02-22 04:26 UTC  
**Status:** Comprehensive list of all decisions, features, and action items

---

## 🎯 Core Strategy Decisions

### Positioning & Messaging
- ~~"Solo CRM" (old)~~ → **Rally** (new)
- ~~"CRM for solo entrepreneurs"~~ → **AI-Powered Business Outcome Platform**
- Core value prop: "Intelligence on demand. Pay for outcomes, not access."
- Tagline candidates:
  - "The platform that charges for intelligence, not access"
  - "AI-powered outcomes, not SaaS subscriptions"
  - "Stop paying SaaS tax. Pay for results."
  - **"Rally: AI that delivers business outcomes"** ✨

### Monetization Model
- **Free tier:** Unlimited storage, email/SMS, pipelines, basic features
- **Pro tier:** Remove Rally footer, custom domain, more AI credits, API access
- **Intelligence Wallet:** Usage-based credits for AI actions
  - Tier 1 (1-5 credits): Basic AI (draft email, enrich contact, score lead)
  - Tier 2 (10-50 credits): HornetHive crews (deep research, campaign sequences, competitive analysis)

### Viral Growth Mechanism
- "Powered by Rally" footer on all outbound emails (free tier)
- Recipients click → explore → sign up → send outbound → repeat
- Outbound volume = embedded growth

---

## 🏗️ Platform Architecture (UPDATED 2026-02-22)

### New Simplified Stack
| Component | What It Does | Status |
|-----------|-------------|--------|
| **Tao** | The platform backend — ALL APIs live here (execution + observability) | 🔄 Merging Crucible/HiveForge MCP |
| **Rally** | Outcomes platform UI (the main product) | ✅ Active development |
| **Product Hacker** | Marketing site + app showcase | ✅ Marketing focus |
| **Supabase** | Shared auth + database | ✅ Foundation |
| **Reflectory** | Voice-first AI showcase (uses Tao voice API) | 🔄 Migration planned |

### What's Being Consolidated
- ❌ **TaskCrush** → Features moving to Rally
- ❌ **Tribe** → Workspace sharing in Rally
- ❌ **Data Services** → APIs moving to Tao, UI deprecated
- ❌ **HiveForge MCP/Crucible** → Merging into Tao

### Services Consolidation Plan
**Phase 1 (Now - 2 months):** Move shared services to HiveForge MCP
- Enrichment services (company, contact, email finder)
- Tao tracing
- Auth/API key validation
- Rate limiting

**Phase 2 (3-6 months):** Consolidate app backends
- All routes → HiveForge MCP
- Frontends become pure SPAs
- HiveForge MCP = Product Hacker Platform API

**Phase 3 (6-12 months):** Public API + billing
- `api.producthacker.ai`
- OpenAPI docs, SDKs
- Stripe usage-based billing

---

## 🚀 Rally Feature Roadmap

### Shipped (Already Live)
- ✅ Photo attachments in chat with AI data extraction
- ✅ Google Calendar integration (OAuth, day view, time blocks)
- ✅ Auto-prompt daily briefing (calendar + pipeline aware)
- ✅ Timezone + working hours in user profile
- ✅ Inline feature request form
- ✅ 503 timeout fix (4-layer defense)

### This Week
1. **Rebrand Solo CRM → Rally**
   - Logo, domain (rally.producthacker.ai or rally.ai?), messaging
   - Update all copy, docs, landing page
   
2. **Add "Powered by Rally" footer to outbound emails**
   - Free tier: footer always on
   - Pro tier: removable
   
3. **Build Intelligence Wallet UI**
   - Credit balance display
   - Preload credits flow
   - Per-action credit costs
   - Usage history

4. **Wire HornetHive to Rally**
   - Enable HornetHive in HiveForge MCP (set `HORNETHIVE_API_KEY`)
   - Add "Deep Research" action in Rally UI
   - Map crew types to credit costs

### This Month
5. **Launch Rally publicly (free tier)**
   - Landing page
   - Signup flow
   - Onboarding wizard
   
6. **Get first 100 users**
   - LinkedIn campaign (see below)
   - Product Hunt launch
   - Early access invites

7. **Ship Pro tier**
   - Remove footer option
   - Custom sending domain
   - Larger AI credit allocation

8. **Data provider integration**
   - ContactOut (Alex Southworth intro)
   - Discolike (company data)
   - Fallback to AI enrichment

---

## 📊 Apps Dashboard & Alignment

### Product Hacker App Registry
**8 apps tracked:**
1. Product Hacker (producthacker.ai)
2. TaskCrush (taskcrush.producthacker.ai)
3. Rally (rally.producthacker.ai) — formerly Solo CRM
4. BlankSlate (blankslate.producthacker.ai)
5. Data Services (data.producthacker.ai)
6. PeanutButter (pb.producthacker.ai)
7. Tribe (tribe.producthacker.ai)
8. EarnQuest (earnquest — new, no URL yet)

### Alignment System (Tao-Powered)
**13 conformity checks:**
- GA tag, footer, CLAUDE.md, .gitignore
- Supabase auth, CSS variables, feature request widget
- Product docs, history, Tao integration, Tao prompts
- Arch page, health check, attachment traces

**Current status:** All apps registered in Tao, but scores are null (conformity scanner hasn't run yet)

**Next:** Trigger first scan to populate alignment scores

---

## 🔌 Distribution: MCP & Plugins

### Claude Desktop (Ready Now - 1 day)
- HiveForge MCP already MCP-compatible
- Users add to `claude_desktop_config.json`
- **Action items:**
  1. Test with Claude Desktop
  2. Write setup guide (screenshots, config)
  3. Create demo video
  4. Submit to MCP directory
  5. Blog: "Use Rally from Claude Desktop"

### ChatGPT Plugin (1-2 weeks)
- Build OpenAPI spec adapter
- Create `ai-plugin.json` manifest
- OAuth or API key flow
- Submit to OpenAI plugin store (2 week review)
- **Action items:**
  1. Build adapter
  2. Submit to OpenAI
  3. Promote when approved

### Claude Code (Already works, just document)
- Add to docs: "Use with Claude Code"
- Tweet demo

---

## 🧠 HornetHive Integration

### Status
- ✅ Client built (`HornetHiveClient`)
- ✅ 4 MCP tools registered
- ❌ Not enabled (missing `HORNETHIVE_API_KEY`)

### 16 Available Crews
analyst, writer, researcher, strategist, developer, marketing, sales, support, hr, finance, legal, operations, product, design, data, security

### Rally Use Cases (Intelligence Wallet Tier 2)
| Action | Crew(s) | Credits |
|--------|---------|---------|
| Deep company research | researcher_crew | 10 |
| Write 5-email sequence | writer + strategist | 15 |
| Competitive analysis | analyst_crew | 12 |
| Campaign strategy | marketing + strategist | 20 |
| Sales play generation | sales + product | 18 |

### To Enable
1. Get HornetHive API key (hornethive.ai)
2. Set in Railway: `HORNETHIVE_API_KEY=hive_sk_...`
3. Redeploy HiveForge MCP
4. Test from Rally
5. Wire into Rally UI ("Deep Research" button)

---

## 📱 LinkedIn Launch Strategy

### Week 1 Tasks (From TOMORROW.md)
1. Set up Rally with first 20 target prospects (Jody)
2. LinkedIn Post 1: The Meta Problem (Jody)
3. LinkedIn Post 2: Data Services Deep Dive (Cam)
4. LinkedIn Post 3: BlankSlate Feedback Loop (Jody)
5. LinkedIn Post 4: Build in Public Metrics (Cam)
6. Create launch landing page (Cam)
7. First 5 outbound emails using Rally (Jody)

### Content Themes
- **Week 1:** "We're using our own platform to sell our platform"
- **Week 2:** "Watch us improve in real-time (Tao observability)"
- **Week 3:** "You can request features, we ship them (BlankSlate)"
- **Week 4:** "We closed deals using our own tools"

---

## 🔧 Technical Debt & Bugs

### HiveForge Platform
- Jody: "Almost fully automated but a lot of bugs"
- **Action:** Audit bugs, prioritize fixes, bug-bash plan
- Critical for Rally if it's the platform API layer

### TaskCrush API Endpoints
- Tasks/goals endpoints returning "Authentication required"
- BlankSlate endpoints working fine
- Likely related to repo move (task-crush → product-hacker)
- **Action:** Investigate auth issue, fix routing

### Memory Match Game (TestFlight)
- White-on-white text issue persists after 3 reinstalls
- **Action:** Jody to debug, update for App Store submission
- Reminder set for 9 AM ET (2026-02-21)

---

## 📋 DevOps & Infra

### Supabase OAuth Setup (Cam → Jody)
**Google Provider:** ✅ Already configured
**GitHub Provider:** ❌ Needs setup
- Client ID: Get from GitHub settings
- Client Secret: `3_uBL4TPppQi_q9`
- Add redirect URLs for all domains

**Redirect URLs to add:**
- `https://producthacker.ai`, `https://producthacker.ai/**`
- `https://tao.producthacker.ai`, `https://tao.producthacker.ai/**`
- `http://localhost:3000`, `http://localhost:3001`, `http://localhost:5173`

### Railway Env Vars
**To enable HornetHive:**
```bash
HORNETHIVE_API_KEY=hive_sk_...
HORNETHIVE_BASE_URL=https://api.hornethive.ai
```

---

## 🎨 Branding & Messaging

### Rally Identity

**Old (Solo CRM):**
- "It's a CRM for solo entrepreneurs"
- Generic, crowded category
- Unclear value prop

**New (Rally):**
- **NOT a CRM** — AI-powered business outcome platform
- Positioning: "Intelligence on demand"
- Category: New (create your own)

### Positioning Options

**Option A: Outcome Platform**
> "Rally: The AI platform that delivers business outcomes.  
> Stop paying for tools. Start paying for results."

**Option B: Intelligence Platform**
> "Rally: Intelligence on demand for operators.  
> Free access. Metered intelligence. Performance compounds."

**Option C: Execution Engine**
> "Rally: AI that executes.  
> Not another dashboard. An execution layer for your business."

**Option D (Recommended):**
> **"Rally: The AI platform that gets work done."**  
> Research. Outreach. Analysis. Strategy.  
> Pay for outcomes, not subscriptions.

### Category Language
- ❌ CRM, Sales Tool, Marketing Platform
- ✅ Business Automation Platform
- ✅ AI-Powered Operations System
- ✅ Intelligent Execution Layer
- ✅ **Outcome Delivery Platform**

---

## 🗂️ Documentation Needs

### For Users
1. **Rally product docs** — What it does, how to use
2. **Intelligence Wallet guide** — What each action costs, when to use what
3. **MCP/Plugin setup** — How to use Rally from Claude/ChatGPT
4. **API reference** — For developers building on Rally

### For Developers
1. **HiveForge MCP docs** — API endpoints, auth, rate limits
2. **Integration guides** — How to connect Rally to other tools
3. **Webhook docs** — How to get notified of Rally events

### For Internal
1. **Conformity check guide** — How to run, what it checks
2. **Tao integration guide** — How to trace actions properly
3. **HornetHive crew guide** — When to use which crew

---

## 📊 Metrics to Track

### Product Metrics
- Rally signups (free vs pro)
- Intelligence Wallet usage (credits consumed per user)
- Email send volume (viral coefficient)
- MCP/Plugin installs
- Feature requests via BlankSlate

### Business Metrics
- MRR (Pro subscriptions + Intelligence Wallet top-ups)
- CAC (cost to acquire via LinkedIn, Product Hunt, viral)
- LTV (lifetime credit spend per user)
- Churn (free → pro, pro retention)

### Platform Metrics (Tao)
- AI action quality scores
- HornetHive crew success rates
- Enrichment accuracy
- Latency per service

---

## 🔮 Open Questions

1. **Domain:** rally.producthacker.ai or register rally.ai? ($$$$)
2. **EarnQuest:** What is it? (Newly added to app registry, no URL)
3. **Tribe:** What does it do? (Listed in app registry, unclear purpose)
4. **HiveForge bugs:** What's blocking full automation?
5. **Conformity scanner:** Who runs it? Cron? CI/CD? Manual?
6. **Tao `/alignment/all`:** Who owns populating the scores?

---

## 🚦 Priority Matrix

### This Week (Critical)
1. Enable HornetHive in HiveForge MCP
2. Add "Powered by Rally" footer
3. Build Intelligence Wallet UI
4. Test Claude Desktop MCP connection

### This Month (High)
1. Launch Rally publicly
2. Get first 100 users
3. Build ChatGPT plugin adapter
4. Integrate ContactOut + Discolike

### This Quarter (Medium)
1. Consolidate services in HiveForge MCP
2. Open public API with billing
3. Build MCP directory presence
4. Run first conformity scans

---

## 📝 Next Session Prep

**Before next sync:**
- Cam: Enable HornetHive, ship footer, start Intelligence Wallet
- Jody: Fix TaskCrush auth, run conformity scan, draft positioning
- Agent: Draft Claude Desktop guide, ChatGPT plugin spec, Rally docs

**Questions to resolve:**
- Final positioning statement for Rally
- Domain decision (rally.ai?)
- HiveForge bug priority list
- First LinkedIn post schedule

---

**Status:** All decisions and action items captured. Nothing lost. 🎯
