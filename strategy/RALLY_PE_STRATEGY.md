# Rally PE: Private Equity Vertical Strategy
**Date:** 2026-02-24
**Status:** Strategic planning
**Author:** Product Hacker team

---

## Table of Contents

1. [Why PE](#1-why-pe)
2. [Investment Thesis Framework](#2-investment-thesis-framework)
3. [Deal Sourcing Pipeline](#3-deal-sourcing-pipeline)
4. [Competitive Landscape](#4-competitive-landscape)
5. [Rally Advantages](#5-rally-advantages)
6. [Target User Profiles](#6-target-user-profiles)
7. [Feature Map: Base Rally vs PE Mode](#7-feature-map-base-rally-vs-pe-mode)
8. [PE Plays (AI Workflows)](#8-pe-plays-ai-workflows)
9. [PE Scoring Profile](#9-pe-scoring-profile)
10. [Go-to-Market](#10-go-to-market)
11. [Implementation Plan](#11-implementation-plan)
12. [Revenue Model](#12-revenue-model)

---

## 1. Why PE

Private equity dealmaking runs on relationships, proprietary deal flow, and rapid thesis validation. The tools PE professionals use today --- PitchBook, spreadsheets, Affinity, and email --- are disconnected, manual, and built for a world where data was scarce and labor was cheap. Neither is true anymore.

PE firms today face three compounding problems:

**Data overload without synthesis.** A mid-market PE associate has access to PitchBook, Capital IQ, Grata, LinkedIn, industry reports, and portfolio company data. None of it talks to each other. The associate's job is to be the human integration layer, copying data between tabs and synthesizing it in their head. This is exactly what an AI agent should do.

**Proprietary deal flow is a fiction for most firms.** The top 50 PE firms have genuine proprietary networks. Everyone else is working the same intermediated auction processes, using the same PitchBook alerts, and calling the same brokers. The firms that win below the top tier are the ones that systematically source off-market deals through direct outreach, operator networks, and thesis-driven screening. Rally PE is the tool that makes that systematic.

**Thesis drift.** Most PE funds have an investment thesis on their website and a different one in practice. The thesis lives in a pitch deck, not in the workflow. Rally PE operationalizes the thesis: it becomes the scoring model, the screening filter, the enrichment prompt, and the deal evaluation framework. When the thesis changes, the entire pipeline recalibrates.

**The market opportunity:** There are approximately 4,000 PE firms in the US, plus 2,000+ VC firms, 1,500+ family offices, and an estimated 7,000+ active search fund operators and independent sponsors. Total addressable market for deal-sourcing and relationship-management tooling in PE/VC is north of $2B annually (PitchBook alone does $500M+ in revenue). Rally PE does not need to replace PitchBook. It needs to be the AI-first layer that sits on top of whatever data the firm already has and makes it actionable.

---

## 2. Investment Thesis Framework

Rally PE helps a fund define, encode, and operationalize its investment thesis as a machine-readable configuration that drives every downstream function: screening, scoring, enrichment, outreach, and due diligence.

### Thesis-as-Configuration

A PE fund's thesis becomes a structured object stored in the workspace's `settings.strategy` JSONB field (the same architecture Rally already uses for business context via `crm_update_context`). This is not a new data model --- it is a PE-specific schema applied to the existing workspace strategy infrastructure.

```json
{
  "thesis": {
    "fundName": "Alpine Growth Partners",
    "fundSize": "$350M",
    "checkSize": { "min": 15000000, "max": 75000000 },
    "holdPeriod": "5-7 years",
    "strategyType": "growth_equity",
    "geographicFocus": ["US", "Canada"],
    "sectorFocus": [
      "healthcare IT",
      "vertical SaaS",
      "business services"
    ],
    "revenueRange": {
      "min": 5000000,
      "max": 50000000,
      "preferred": "10M-30M"
    },
    "ebitdaRange": {
      "min": 2000000,
      "max": 15000000
    },
    "growthProfile": "20%+ revenue CAGR or clear path to 20%+ with operational improvement",
    "ownershipPreference": "majority or significant minority with governance rights",
    "operatingModel": "buy-and-build with add-on acquisition strategy",
    "valueCreation": [
      "revenue acceleration through sales & marketing buildout",
      "add-on acquisitions in fragmented verticals",
      "technology modernization and product expansion"
    ],
    "dealbreakers": [
      "customer concentration >30% from single customer",
      "declining revenue without clear turnaround thesis",
      "heavy regulatory risk without existing compliance infrastructure",
      "founder unwilling to retain equity or stay through transition"
    ],
    "idealFounderProfile": "technical founder who has built product-market fit but lacks go-to-market infrastructure; ready for a growth partner, not an exit",
    "competitiveEdge": "operating partner bench with 4 former SaaS CEOs who plug in post-close"
  }
}
```

### How the Thesis Propagates

Once the thesis is stored in workspace strategy, it flows into every Rally PE function:

| Function | How Thesis Is Used |
|----------|-------------------|
| **Screening** | AI uses `sectorFocus`, `revenueRange`, `ebitdaRange`, `geographicFocus` to filter universe |
| **Scoring** | PE scoring profile weights deal-level fit against thesis parameters |
| **Enrichment** | Web search enrichment prompts reference thesis to prioritize relevant data (e.g., "Does this company have customer concentration risk?") |
| **Plays** | Thesis Screener play evaluates a company against every thesis criterion and returns a fit/gap analysis |
| **Outreach** | Revenue Agent drafts outreach that references the fund's value-creation angle relevant to the target |
| **DD Checklist** | Due diligence play generates a thesis-aligned checklist, emphasizing areas where the thesis has dealbreakers |

### Thesis Management via Chat

The Revenue Agent (Rally's AI chat) can read and update the thesis through existing context tools:

- "Show me our current investment thesis" --> `crm_get_context` returns the thesis object
- "Update our check size to $20M-$80M" --> `crm_update_context` merges the change
- "We're adding cybersecurity to our sector focus" --> `crm_update_context` appends to `sectorFocus` array
- "Score this company against our thesis" --> Thesis Screener play reads context, runs evaluation

This means the thesis is a living document. Every conversation about strategy refines it. Every deal that passes or fails informs it. The thesis is not a PDF on a shared drive. It is the operating system of the fund.

---

## 3. Deal Sourcing Pipeline

Rally PE implements a six-stage pipeline that maps to how PE deals actually move. These stages replace Rally's default CRM stages (`lead` --> `discovery` --> `qualified` --> `proposal` --> `negotiation` --> `closed_won/lost`) with PE-specific stages stored in the workspace's custom stage configuration.

### Stage Definitions

| Stage | Description | Typical Duration | Key Activities |
|-------|------------|-----------------|----------------|
| **Universe** | Initial identification. Company appears on a screen, a list, or a mention. No outreach yet. | Ongoing | AI screening, PitchBook alerts, industry monitoring, co-op network signals |
| **Target** | Company passes initial thesis screen. Assigned to a deal team member for deeper evaluation. | 1-2 weeks | Enrichment, thesis scoring, preliminary financial analysis, management team research |
| **Outreach** | Active contact initiated. Introductions requested, cold outreach sent, or broker relationship activated. | 2-6 weeks | Email sequences, warm intros via co-op network, LinkedIn outreach, broker conversations |
| **Diligence** | Target has expressed interest. Formal or informal due diligence underway. | 4-12 weeks | Financial DD, customer references, market sizing, management meetings, legal review |
| **LOI** | Letter of Intent issued or received. Exclusivity period. | 2-6 weeks | LOI drafting, price negotiation, exclusivity terms, confirmatory DD planning |
| **Close** | Post-LOI. Final DD, definitive agreement negotiation, closing. | 4-12 weeks | Legal docs, final DD items, financing, board approvals, closing mechanics |

### How the Pipeline Works in Rally

**Contacts represent people.** The CEO you are building a relationship with, the investment banker running the process, the operating partner who made the introduction.

**Companies represent deal targets.** The entity being evaluated for investment. Company records in Rally carry the enrichment data, thesis scores, financial metrics (in `custom_fields` JSONB), and DD status.

**Stages apply to companies (targets), not contacts.** When a company moves from Universe to Target, all associated contacts inherit visibility into the deal progression, but the stage is a company-level attribute. This maps cleanly to Rally's existing company model, which already has a stage-like pipeline capability through custom fields.

**Lists are deal lists.** Rally's artifact list system (`crm_create_list`) becomes the natural container for building target lists, comp tables, and deal tracking spreadsheets. A PE associate says "Build me a list of healthcare IT companies between $10M-$30M revenue in the mountain west" and the AI creates a structured list artifact with columns for revenue, EBITDA, employee count, thesis fit score, and next action.

### Pipeline Velocity Tracking

Rally already tracks `created_at` and `updated_at` on all records, plus full audit history via `logAudit`. PE mode surfaces pipeline velocity as a first-class metric:

- Average days Universe --> Target (screening efficiency)
- Average days Target --> Outreach (activation speed)
- Average days Outreach --> Diligence (conversion rate)
- Total active pipeline by stage (funnel health)
- Drop-off rates by stage (where deals die)

---

## 4. Competitive Landscape

### PitchBook / Capital IQ

**What they do:** Comprehensive financial databases. Company profiles, deal histories, fund performance, valuation comparables, industry reports. PitchBook is the default tool for PE associates.

**Pricing:** $20,000-$50,000+/year per seat. Capital IQ similar.

**Strengths:** Breadth of data. Verified financials. Historical deal comps. Industry reports. Everyone uses it, so it is the common language of PE.

**Weaknesses:** Static data. No workflow. No AI synthesis. No outreach tools. No relationship tracking beyond basic CRM. The data is the same for everyone --- no proprietary edge. Expensive enough that smaller firms, search funds, and independent sponsors often cannot afford it.

**Rally PE position:** Rally PE does not replace PitchBook. It consumes PitchBook data (via CSV import or future API integration) and makes it actionable. Rally PE is the workflow layer that takes PitchBook data and turns it into scored targets, enriched profiles, thesis-aligned screening, and outreach sequences. For firms that cannot afford PitchBook, Rally PE's web search enrichment provides a viable alternative for basic company data at a fraction of the cost.

### Affinity

**What they do:** Relationship intelligence CRM built for VC and PE. Auto-captures email and calendar data to map relationship networks. Deal flow tracking. Introductions and warm paths.

**Pricing:** $2,400-$4,800+/year per seat (estimated from public info).

**Strengths:** Relationship mapping is genuinely good. Auto-capture reduces manual data entry. Built for dealmakers, not salespeople. Good integrations with Gmail/Calendar.

**Weaknesses:** Not AI-first. Enrichment is basic (relies on Clearbit and similar). No thesis-driven scoring. No web search enrichment. No co-op data network. The relationship mapping is passive --- it tells you who you know, but it does not help you figure out who you should know. Closed ecosystem: your data stays in Affinity and only benefits you.

**Rally PE position:** Rally PE has native AI with web search built into the chat agent. Where Affinity passively maps relationships, Rally PE actively works: "Who should I talk to at this company?" triggers real-time web search, LinkedIn lookup, and co-op network queries. Rally's waterfall enrichment (manual > ContactOut > web search > CSV > co-op) is architecturally superior to Affinity's single-source enrichment. And the co-op network means Rally PE gets better for everyone as the network grows --- Affinity's data only benefits the individual firm.

### 4Degrees

**What they do:** Relationship intelligence and deal flow CRM for PE/VC. Auto-capture, relationship scoring, deal pipeline management.

**Pricing:** Comparable to Affinity ($2,000-$5,000/year per seat range).

**Strengths:** Strong relationship scoring. Pipeline analytics. Built specifically for PE workflow. Better pipeline stage customization than Affinity.

**Weaknesses:** Similar limitations to Affinity: not AI-first, single-source enrichment, no thesis operationalization, closed data ecosystem. Smaller market presence means fewer integrations and less community.

**Rally PE position:** Same structural advantages as against Affinity, plus Rally PE's plays system provides workflow automation that 4Degrees lacks. A PE associate using 4Degrees still manually researches companies, writes outreach, and builds DD checklists. Rally PE automates all three through AI plays.

### Grata

**What they do:** AI-powered company search and discovery for PE. Uses natural language to search for companies matching specific criteria. Strong for thesis-driven screening.

**Pricing:** $5,000-$15,000+/year per seat.

**Strengths:** Best-in-class company discovery. Natural language search ("B2B SaaS companies in healthcare with $5M-$20M revenue in the southeast") actually works. Good for building target lists quickly.

**Weaknesses:** Discovery only --- no CRM, no relationship tracking, no outreach, no DD workflow. You find companies in Grata and then manage everything else in a different tool. No enrichment beyond their own database. Expensive for what it does. No co-op network.

**Rally PE position:** Rally PE's Thesis Screener play provides thesis-driven company evaluation comparable to Grata's search, but within the full CRM workflow. When Rally PE identifies a target, it does not hand you a name and a website --- it creates a fully enriched company record, scores it against your thesis, identifies the management team, and suggests an outreach strategy. Grata finds the needle; Rally PE finds it, threads it, and sews.

### Summary Comparison

| Capability | PitchBook | Affinity | 4Degrees | Grata | Rally PE |
|-----------|----------|---------|---------|------|---------|
| Financial data depth | Best | Poor | Poor | Good | Good (enrichment) |
| Relationship mapping | None | Best | Good | None | Good (co-op) |
| AI-first architecture | No | No | No | Partial | Yes |
| Thesis operationalization | No | No | No | Partial | Yes |
| Web search enrichment | No | No | No | No | Yes |
| Waterfall data sourcing | No | No | No | No | Yes |
| Co-op data network | No | No | No | No | Yes |
| Outreach automation | No | No | No | No | Yes |
| DD workflow | No | No | No | No | Yes |
| Plays (AI workflows) | No | No | No | No | Yes |
| Custom scoring profiles | No | No | Basic | No | Yes |
| Price per seat/year | $30K+ | $3K+ | $3K+ | $10K+ | TBD (see Revenue Model) |

---

## 5. Rally Advantages

### 5.1 AI-First Enrichment

Rally's enrichment architecture is fundamentally different from every competitor. When Rally enriches a company, it does not query a stale database. It runs a real-time web search through Claude's `web_search_20250305` server tool, synthesizes results, and writes structured data to the record.

This matters enormously for PE because:

- **Management team changes are caught in real-time.** PitchBook might show a CEO who left 6 months ago. Rally's web search finds the new CEO's LinkedIn announcement from last week.
- **Competitive dynamics are current.** "Has this company raised funding recently?" and "Who are their main competitors?" get real-time answers, not last quarter's data.
- **Thesis-relevant data is pulled automatically.** The enrichment prompt can be customized to pull data that matters for the specific thesis: customer concentration signals, regulatory exposure, technology stack, geographic footprint.

Rally's enrichment prompt system (defined in `enrichment.js`) already supports contact and company enrichment with structured JSON output. PE mode extends this with thesis-aware enrichment prompts that pull PE-relevant fields: EBITDA indicators, ownership structure, acquisition history, key customer information, and competitive positioning.

### 5.2 Waterfall Data Sourcing

Rally's waterfall architecture (defined in `waterfall.js`) resolves field values across multiple sources using configurable priority:

```
manual > contactout > web_search > csv_upload > linkedin > chat > coop > api
```

For PE, this means:

1. **Manual entries always win.** If a PE associate personally confirms a CEO's phone number, that takes priority over any automated source.
2. **ContactOut provides verified contact data** as the first automated layer.
3. **Web search fills gaps** that ContactOut misses.
4. **CSV imports from PitchBook, Capital IQ, or broker lists** slot in at the appropriate priority level.
5. **Co-op network data** provides an additional source layer.

Each field on every contact and company record tracks provenance: which source provided the value, when, and at what confidence level. PE firms live and die by data accuracy. Waterfall provenance means they can always answer "where did this data come from?" for any field on any record.

### 5.3 Co-op Network Potential

The co-op network (documented in `RALLY_COOP_NETWORK.md` and `RALLY_COOP_LAYERS.md`) has a specific PE application: deal flow sharing.

**Layer 1 (Internal co-op):** A PE firm's partners, associates, and operating advisors each maintain personal Rallys. They selectively share relevant contacts into the firm's shared workspace. This is "bottoms up" relationship management: the partner who knows the CEO shares that relationship into the firm's deal pipeline. The associate who found the company on a screen shares the target. The operating partner who ran a similar company shares competitive intel.

**Layer 2 (External co-op):** Multiple PE firms could form co-investment networks where they share deal flow in non-competitive sectors. Firm A focuses on healthcare IT and Firm B focuses on industrial services. When Firm A encounters a strong industrial services company, they route it to Firm B through the co-op. Credits flow, relationships strengthen, and both firms get access to deal flow they would never have seen otherwise.

This is not theoretical. PE co-investment is a $200B+ market. The relationships are informal today --- a partner texts another partner. Rally PE makes it systematic, tracked, and scalable.

### 5.4 Scoring Profiles

Rally's scoring engine (defined in `scoring.js`) already supports custom scoring profiles with configurable weights, title boosts, industry boosts, and keyword boosts. PE mode adds a PE-specific scoring profile that evaluates targets against thesis criteria.

The existing architecture supports:
- **Weights** across dimensions (completeness, pipeline position, deal value, engagement, recency)
- **Title boosts** for seniority matching
- **Industry boosts** for target sector matching
- **Keyword boosts** for arbitrary field matching

PE mode does not require a new scoring engine. It requires a new built-in profile (see Section 9) and the ability to score at the company level rather than only at the contact level.

### 5.5 Lists as Deal Artifacts

Rally's list system (`crm_create_list`, `crm_update_list_rows`, `crm_enrich_list_rows`) is a spreadsheet-like artifact builder that the AI creates and populates. For PE, lists become:

- **Target lists:** "Build me a list of 50 vertical SaaS companies in the southeast with $10M+ revenue"
- **Comp tables:** "Create a comparable company analysis for this target using public comps"
- **DD checklists:** "Generate a due diligence checklist for this healthcare IT acquisition"
- **Operator rosters:** "List operating partners and advisors with healthcare IT experience"
- **Pipeline reports:** "Show me all active deals by stage with thesis fit scores"

Lists support web search enrichment, CRM enrichment, Gmail enrichment, and custom prompt enrichment. A PE associate can create a target list, enrich it from the web, score it against the thesis, and export it --- all through the chat interface.

---

## 6. Target User Profiles

### 6.1 PE Associates (Primary)

**Who they are:** 2-5 years post-MBA or post-banking. They do the actual work of deal sourcing, screening, and DD. They are the heaviest users of PitchBook, Excel, and whatever CRM the firm has.

**Pain points:**
- Spend 60%+ of their time on data gathering and synthesis, not analysis
- Toggle between 6+ tools daily (PitchBook, Capital IQ, LinkedIn, Excel, email, CRM)
- Build the same type of comp table, target list, and DD checklist for every deal
- Thesis alignment is a manual mental exercise for every screen

**What Rally PE gives them:**
- AI that does the data gathering and synthesis (enrichment + plays)
- One tool for pipeline, contacts, enrichment, outreach, and DD workflows
- Automated comp tables, target lists, and DD checklists via plays
- Thesis-driven scoring that quantifies fit instead of relying on gut

**Adoption driver:** Time savings. If Rally PE saves an associate 10 hours per week on data gathering and list building, it sells itself. The associate is the internal champion who brings the tool to the firm.

### 6.2 VC Analysts

**Who they are:** Similar role to PE associates but in venture capital. Earlier stage focus. More volume (screening hundreds of startups per week vs. dozens of mid-market companies).

**Pain points:**
- Volume overwhelm: too many companies to screen, not enough time
- Crunchbase/PitchBook data on early-stage companies is sparse
- Relationship tracking is critical (warm intros drive VC deal flow)
- Thesis alignment is even more subjective at early stages

**What Rally PE gives them:**
- Web search enrichment that finds startup data PitchBook misses
- Volume screening via AI plays (Thesis Screener processes 50 companies in minutes)
- Co-op network for warm intro discovery
- Scoring profiles tuned for VC criteria (team, market, traction, tech)

**Adoption driver:** Coverage. A VC analyst using Rally PE can screen 3x the deal flow in the same time. In VC, seeing more means missing less.

### 6.3 Corporate Development Teams

**Who they are:** In-house M&A teams at mid-to-large companies. They source acquisitions, manage integration, and build strategic partnerships.

**Pain points:**
- Acquisitions are strategic (must fit corporate thesis and product roadmap)
- Internal stakeholders (CEO, product, engineering) all have opinions on targets
- Data lives in multiple systems (CRM, ERP, product analytics, market research)
- DD process is more complex (technology DD, product integration assessment, cultural fit)

**What Rally PE gives them:**
- Thesis operationalization maps to corporate strategic priorities
- Shared workspace lets multiple stakeholders collaborate on pipeline
- Custom scoring profiles with corporate-specific criteria (technology stack, product overlap, customer overlap)
- DD checklist play generates corporate-specific diligence items (integration complexity, technology compatibility)

**Adoption driver:** Alignment. Corp dev teams struggle to keep internal stakeholders aligned on acquisition criteria. Rally PE's thesis-as-configuration makes the criteria explicit and shared.

### 6.4 Search Fund Operators

**Who they are:** Individual entrepreneurs or small teams searching for a company to acquire and operate. Typically funded by a group of investors. Budget-constrained. Wear every hat.

**Pain points:**
- Cannot afford PitchBook ($30K+/year)
- Need to screen thousands of companies with limited time and budget
- Relationship-driven sourcing (owners, brokers, advisors) but no CRM budget
- DD process is self-managed (no large deal team)

**What Rally PE gives them:**
- Full CRM with AI enrichment at a fraction of PitchBook's cost
- Web search enrichment as a PitchBook alternative for basic company data
- Thesis-driven screening without expensive databases
- DD checklist generation so they do not miss critical items
- Co-op network for connecting with other searchers and sharing deal flow in non-overlapping sectors

**Adoption driver:** Affordability and breadth. Search fund operators need a tool that does everything (CRM + enrichment + screening + DD) because they cannot afford specialized tools for each function. Rally PE is that tool.

---

## 7. Feature Map: Base Rally vs PE Mode

PE mode is not a separate product. It is a configuration layer applied to the existing Rally architecture. Technically, PE mode is:

1. A workspace `mode` setting (`mode: 'pe'`) stored in `tc_workspaces.settings`
2. A PE-specific system prompt injected into the Revenue Agent chat
3. A PE scoring profile added to `BUILT_IN_PROFILES`
4. PE plays registered in the plays system
5. PE-specific custom field schemas suggested during workspace setup
6. PE deal stages replacing default CRM stages

### Feature Comparison

| Feature | Base Rally | PE Mode Adds |
|---------|-----------|-------------|
| **Contacts** | Full CRUD, enrichment, scoring | Same (people are people) |
| **Companies** | Full CRUD, enrichment | PE-specific fields: EBITDA, revenue, ownership structure, acquisition history |
| **Pipeline stages** | lead > discovery > qualified > proposal > negotiation > closed | universe > target > outreach > diligence > loi > close |
| **Scoring** | 4 built-in profiles (default, enterprise-sales, startup-outbound, relationship-focused) | PE Deal Fit profile with thesis-weighted scoring |
| **Enrichment** | Contact + company web search, ContactOut, batch enrichment | Thesis-aware enrichment prompts, PE-specific fields in enrichment output |
| **Lists** | Create, enrich, update via chat | PE list templates: target list, comp table, DD checklist, operator roster |
| **Chat persona** | Revenue Agent (sales-focused) | Deal Agent (PE-focused). Understands PE terminology, deal structures, and thesis-driven evaluation. |
| **Plays** | Pipeline Snapshot, Pre-Call Brief, Stale Opp Rescue, Progression Detection, Contact Quick-Add | Thesis Screener, Target Deep Dive, Deal Pipeline Review, Operator Finder, Comp Table Builder, DD Checklist |
| **Context/Strategy** | ICP, sales process, competitive advantages, playbooks | Investment thesis, fund parameters, value creation levers, dealbreakers |
| **Workspace setup** | Business context wizard | PE-specific onboarding: fund name, fund size, check size, sector focus, thesis upload |
| **Gmail integration** | Email lookup, conversation context | Same (email is email) |
| **Calendar** | Day view, time blocks, briefing | Pre-meeting prep play auto-triggers before deal meetings |
| **Co-op network** | Contact sharing, enrichment marketplace | Deal flow sharing, co-investment routing |
| **Audit log** | Full activity history | Same (compliance-grade audit trail is a PE selling point) |
| **Waterfall** | Source record tracking with provenance | Same (data provenance is critical for PE DD) |

### What PE Mode Does NOT Require

PE mode does not need:

- **New database tables.** Company custom fields (`custom_fields` JSONB) store PE-specific data. Pipeline stages are configuration, not schema. Thesis is stored in workspace strategy.
- **New API endpoints.** Existing CRM, enrichment, scoring, list, and context endpoints handle all PE operations.
- **New frontend components.** PE stages render in the existing pipeline UI. PE scoring uses the existing scoring display. PE plays use the existing plays execution system.
- **New enrichment infrastructure.** The existing `aiGenerateWithSearch()` function with a PE-tuned prompt handles PE enrichment.

What PE mode needs is configuration, content, and prompts. This is Rally's architectural advantage: the platform is general enough that verticalizing it is a content problem, not an engineering problem.

---

## 8. PE Plays (AI Workflows)

Plays are named AI workflows triggered through the Revenue Agent chat. Base Rally ships with 5 plays. PE mode adds 6 more. Each play uses existing Rally tools (CRM queries, enrichment, list creation, context retrieval) orchestrated by the AI agent.

### Play 1: Thesis Screener

**Trigger:** "Screen [company] against our thesis" or "Does [company] fit our thesis?"

**What it does:**
1. Reads the fund's investment thesis from workspace context (`crm_get_context`)
2. Fetches the company record from CRM (or creates one if it does not exist)
3. Runs web search enrichment to get current company data
4. Evaluates the company against every thesis criterion: sector, revenue range, EBITDA, geography, growth profile, ownership structure, dealbreakers
5. Returns a structured fit/gap analysis with a thesis fit score (0-100)

**Output example:**
```
Thesis Screener: Acme SaaS Inc.
Thesis Fit Score: 78/100

FITS:
- Vertical SaaS (healthcare scheduling) -- matches sector focus
- Revenue $18M (within $5M-$50M range)
- 35% YoY growth (exceeds 20% threshold)
- HQ in Nashville (US geographic focus)
- Founder-led, appears open to growth capital

GAPS:
- EBITDA estimated at $1.2M (below $2M minimum)
- Customer concentration unknown (potential dealbreaker)
- No prior institutional capital (could indicate lack of governance)

RECOMMENDATION: Advance to Target stage. Priority DD items:
verify EBITDA with TTM financials, assess customer concentration,
confirm founder's appetite for institutional capital.
```

### Play 2: Target Deep Dive

**Trigger:** "Deep dive on [company]" or "Tell me everything about [company]"

**What it does:**
1. Runs comprehensive web search enrichment on the company
2. Identifies and enriches all known management team members
3. Searches for recent news, funding events, competitive dynamics
4. Checks CRM for any existing relationships (contacts at the company, contacts who know people there)
5. Checks co-op network for warm paths
6. Returns a comprehensive target brief

**Output:** A multi-section brief covering company overview, management team, financial indicators, competitive landscape, recent news, relationship paths, and recommended next steps. Optionally creates a list artifact with the management team for reference.

### Play 3: Deal Pipeline Review

**Trigger:** "Pipeline review" or "Show me where we stand on active deals"

**What it does:**
1. Queries all companies in active deal stages (Target through Close)
2. For each deal: thesis fit score, days in current stage, last activity date, assigned team member, key next action
3. Flags stale deals (no activity in 14+ days)
4. Flags stage anomalies (too long in Outreach, LOI without recent activity)
5. Returns a pipeline summary with recommended actions

**Output:** A dashboard-style summary, optionally rendered as a list artifact. Includes total pipeline value, deal count by stage, velocity metrics, and specific action items for each active deal.

### Play 4: Operator Finder

**Trigger:** "Find operators with [industry/skill] experience" or "Who can help with this deal?"

**What it does:**
1. Reads the deal context (company record, industry, challenges)
2. Searches CRM contacts filtered by relationship type `advisor` or `partner`
3. Searches co-op network for relevant operators
4. Runs web search to identify potential operating advisors in the target industry
5. Returns a ranked list of operators with relevance explanations

**Output:** A list of potential operating partners/advisors with their background, relevance to the deal, and whether they are already in the firm's network. Creates a list artifact for tracking outreach.

### Play 5: Comp Table Builder

**Trigger:** "Build comps for [company]" or "Comparable company analysis for [target]"

**What it does:**
1. Reads the target company's profile and thesis context
2. Identifies 5-10 comparable companies via web search (public comps, private comps, recent transactions)
3. For each comp: searches for revenue, EBITDA, growth rate, valuation multiples, transaction multiples if applicable
4. Creates a structured list artifact with comp table columns: company name, revenue, EBITDA, growth rate, EV/Revenue, EV/EBITDA, transaction date, buyer
5. Enriches each row via web search

**Output:** A list artifact formatted as a comp table. Data quality will vary (private company financials are hard to find), so the play includes confidence indicators and source attribution for each data point.

### Play 6: DD Checklist

**Trigger:** "DD checklist for [company]" or "What should we diligence?"

**What it does:**
1. Reads the investment thesis (especially dealbreakers and value creation levers)
2. Reads the company profile and enrichment data
3. Generates a thesis-aligned DD checklist organized by category: financial, commercial, technology, legal, management, operations
4. Prioritizes items based on thesis dealbreakers (customer concentration gets priority if it is a dealbreaker)
5. Creates a list artifact with checklist items, status column (not started / in progress / complete), assigned team member, and notes

**Output:** A list artifact functioning as an interactive DD tracker. Items are pre-populated based on the thesis and target profile. The associate can update status through chat ("Mark customer concentration DD as complete -- confirmed top 5 customers are 40% of revenue").

---

## 9. PE Scoring Profile

The PE scoring profile is a new entry in `BUILT_IN_PROFILES` (in `scoring.js`) designed to score companies (not just contacts) against PE deal criteria.

### Profile Definition

```javascript
'pe-deal-fit': {
  name: 'pe-deal-fit',
  label: 'PE Deal Fit',
  description: 'Scores companies against PE investment thesis criteria: sector fit, financial profile, growth, management, and strategic alignment',
  weights: {
    sectorFit: 20,        // Does the company match target sectors?
    financialProfile: 25,  // Revenue, EBITDA, margins in range?
    growthMetrics: 20,     // Revenue growth, customer growth signals?
    managementQuality: 15, // Leadership team completeness and seniority?
    strategicFit: 10,      // Alignment with value creation levers?
    dataCompleteness: 10,  // How much do we actually know?
  },
  // Sector matching against thesis sectorFocus
  industryBoost: {
    points: 20,
    // targetIndustries populated dynamically from workspace thesis
  },
  // Title boost for management team evaluation
  titleBoost: {
    points: 15,
    seniorTitles: ['ceo', 'cfo', 'cto', 'coo', 'president', 'founder', 'co-founder', 'managing partner', 'general manager'],
    midTitles: ['vp', 'vice president', 'director', 'head of', 'svp'],
    seniorPoints: 15,
    midPoints: 8,
  },
  // Keyword boosts for financial indicators
  keywordBoosts: [
    {
      field: 'notes',
      keywords: ['profitable', 'ebitda positive', 'cash flow positive', 'recurring revenue', 'saas', 'subscription'],
      points: 10,
      label: 'positive financial signals',
    },
    {
      field: 'notes',
      keywords: ['customer concentration', 'key man risk', 'regulatory risk', 'declining revenue', 'cash burn'],
      points: -10,
      label: 'risk signals',
    },
  ],
}
```

### Scoring Dimensions

**Sector Fit (20 pts):** Does the company operate in a sector the fund targets? Checked against `thesis.sectorFocus` via keyword matching in enrichment data, industry field, and notes.

**Financial Profile (25 pts):** Is the company in the right size range? Revenue, EBITDA, and deal value checked against `thesis.revenueRange` and `thesis.ebitdaRange`. Points deducted if below minimum, full points if in preferred range, partial points if in acceptable range.

**Growth Metrics (20 pts):** Signals of growth from enrichment data: revenue growth mentions, hiring signals (employee count increase), product launches, market expansion. Derived from web search enrichment notes and recent news.

**Management Quality (15 pts):** Completeness of management team data. Having identified CEO, CFO, CTO contacts in CRM scores higher than having no management contacts. Title seniority of known contacts contributes. This incentivizes the deal team to build out the relationship map.

**Strategic Fit (10 pts):** Alignment with the fund's value creation levers. If the thesis says "buy-and-build in fragmented verticals," companies in fragmented markets with add-on acquisition potential score higher. Evaluated via keyword matching against `thesis.valueCreation`.

**Data Completeness (10 pts):** How much data does the team actually have on this target? Enrichment completeness, number of contacts identified, presence of financial data, DD checklist progress. This creates a natural incentive to enrich and research targets.

---

## 10. Go-to-Market

### Positioning Statement

Rally PE is the AI-first deal sourcing and pipeline management platform for private equity. It operationalizes your investment thesis, enriches targets from the live web, and automates the repetitive work of screening, diligence, and relationship management --- so your deal team spends time on judgment, not data entry.

### Positioning Principles

**Do not compete with PitchBook on data.** PitchBook has 20 years of financial data. Rally PE has none. Compete on workflow, intelligence, and speed. "PitchBook tells you what happened. Rally PE tells you what to do about it."

**Do not compete with Affinity on relationship mapping.** Affinity has deep Gmail/Calendar auto-capture. Rally PE has basic Gmail integration. Compete on thesis operationalization and AI-powered enrichment. "Affinity maps your relationships. Rally PE works your deals."

**Compete on the integration of all three.** No existing tool combines data, relationships, and AI-powered workflow. Rally PE does. "One platform: thesis, pipeline, enrichment, outreach, and DD. AI that works your deal flow, not just stores it."

### Channel Strategy

**Channel 1: Search Fund Community (Beachhead)**

Search fund operators are the ideal beachhead:
- Price-sensitive (cannot afford PitchBook)
- Need an all-in-one tool (small team, limited budget)
- Active online communities (Search Fund Accelerator, Stanford GSB network, searchfunder.com)
- Early adopters (younger, tech-forward)
- Multiplier effect: search fund investors advise 5-10 searchers each. Win one investor, reach 10 operators.

**Tactic:** Free tier for search fund operators. Thesis-driven screening and DD checklists as the hook. "The PE platform you can actually afford."

**Channel 2: PE Associate Networks**

PE associates are the users, even if the firm writes the check.

**Tactic:** LinkedIn content targeting PE associates. "I just screened 200 companies against our thesis in 15 minutes. Here is how." Build a content brand around PE productivity. Associates bring the tool into the firm as a "personal productivity hack" that becomes team infrastructure.

**Channel 3: Operating Partner Networks**

Operating partners and advisors sit across multiple fund relationships. They are natural co-op network nodes.

**Tactic:** The Operator Finder play. Demonstrate that Rally PE can help operating partners get matched to relevant deals across their network. "Stop getting random inbound from portfolio companies. Get matched to deals where your experience matters."

**Channel 4: PE Conferences and Communities**

ACG (Association for Corporate Growth) conferences, ILPA events, PE industry groups.

**Tactic:** Booth demo showing live thesis screening and DD checklist generation. "Give me your investment thesis and 5 target companies. I will score them against your thesis in real-time." This is a compelling live demo because the AI does visible work in front of the prospect.

### Messaging by Persona

**For PE Associates:**
> "Rally PE does your first pass so you can focus on your best judgment. Screen 200 companies in 15 minutes. Build comp tables while you eat lunch. Generate DD checklists before the management meeting."

**For PE Partners:**
> "Your thesis is your edge. Rally PE turns it into a scoring model, a screening filter, and a deal evaluation framework. When the thesis evolves, every deal in your pipeline automatically re-scores."

**For Search Fund Operators:**
> "You cannot afford PitchBook. You should not have to. Rally PE gives you AI-powered company screening, web search enrichment, and deal pipeline management at a price that works for a search fund budget."

**For Corporate Dev:**
> "Your acquisition criteria live in a strategy deck no one reads. Rally PE turns your strategic priorities into a machine-readable thesis that drives every screen, score, and DD checklist."

---

## 11. Implementation Plan

### Phase 1: PE Configuration (1-2 weeks)

**No new infrastructure.** This phase is configuration and content.

1. **Add `pe` to valid workspace modes** in `workspace.js` route handler (currently `['work', 'personal', 'network', 'tribe']`). This is a one-line change.

2. **Define PE deal stages** as a workspace setting. Store in `tc_workspaces.settings.deal_stages`:
   ```json
   ["universe", "target", "outreach", "diligence", "loi", "close", "passed", "closed"]
   ```
   The existing stage field on company records is a text field. No schema change needed.

3. **Create PE scoring profile.** Add `pe-deal-fit` to `BUILT_IN_PROFILES` in `scoring.js`. The existing scoring engine handles all the logic.

4. **Write PE system prompt.** Modify the Revenue Agent's system prompt (in `rally.js`) to inject PE-specific instructions when `workspace.settings.mode === 'pe'`. The prompt tells the AI it is a "Deal Agent," understands PE terminology, and has access to PE plays.

5. **Define thesis schema.** Document the thesis JSON structure and add it to the workspace context tools (`crm_update_context`) input schema. The existing context tools handle storage.

### Phase 2: PE Plays (2-3 weeks)

6. **Implement Thesis Screener play.** This is the highest-value play and the one that demonstrates the platform's thesis-operationalization capability. It combines `crm_get_context` (thesis), `crm_enrich_company` (data), and a structured evaluation prompt.

7. **Implement DD Checklist play.** Uses `crm_get_context` (thesis, dealbreakers) and `crm_create_list` (checklist artifact). High value for search fund operators.

8. **Implement Comp Table Builder play.** Uses `crm_create_list` with web search enrichment on each row. Demonstrates the list + enrichment combination.

9. **Implement Target Deep Dive, Deal Pipeline Review, and Operator Finder.** These are variations on existing patterns (enrichment, list queries, contact search).

### Phase 3: PE Onboarding (1 week)

10. **PE workspace setup wizard.** When a user creates a workspace with mode `pe`, show a PE-specific onboarding flow: fund name, fund size, check size range, sector focus, geographic focus, thesis upload (freeform text that the AI parses into structured thesis). This extends the existing onboarding wizard pattern.

11. **Thesis import.** Allow users to paste their investment thesis as freeform text. The AI parses it into structured thesis JSON using the existing `crm_update_context` tool. "Paste your investment thesis below and we will turn it into your deal scoring model."

### Phase 4: Go-to-Market (Ongoing)

12. **Search fund outreach.** Activate search fund community channels.
13. **Content creation.** PE associate productivity content on LinkedIn.
14. **Conference presence.** ACG conference demo prep.
15. **Feedback loop.** First 10 PE users provide feedback that shapes Phase 5.

### Phase 5: Advanced (Quarter 2)

16. **Company-level scoring.** Extend the scoring engine to evaluate company records (not just contacts) against the PE scoring profile. This requires modest changes to `scoreContact()` to also accept company records.
17. **PitchBook CSV import template.** Pre-mapped CSV import that knows PitchBook's export format. Uses existing `importRecords` with a PitchBook-specific column mapping.
18. **Co-op deal flow sharing.** PE-specific co-op features: deal flow routing between non-competing firms.
19. **Fund performance tracking.** Portfolio company monitoring via periodic enrichment re-runs.

---

## 12. Revenue Model

### Pricing Tiers

**Starter (Free)**
- 1 workspace, 1 user
- 500 contacts, 100 companies
- 50 AI enrichments/month
- 3 plays/day
- Target: search fund operators in evaluation phase

**Professional ($99/month per seat)**
- Unlimited workspaces and contacts
- 500 AI enrichments/month
- Unlimited plays
- Thesis operationalization
- Custom scoring profiles
- ContactOut integration
- Target: individual PE associates, small search funds

**Team ($249/month per seat, 3 seat minimum)**
- Everything in Professional
- Shared workspaces with role-based access
- 2,000 AI enrichments/month (pooled)
- Co-op network access (Layer 2)
- Pipeline analytics and velocity tracking
- Priority enrichment (faster web search)
- Target: PE firms, corp dev teams

**Enterprise (Custom)**
- Everything in Team
- Dedicated co-op network node
- Custom enrichment prompts
- API access
- SSO/SAML
- Dedicated support
- Target: large PE firms, multi-fund platforms

### Revenue Math

Conservative scenario: 200 paying users in Year 1

| Tier | Users | MRR | Annual |
|------|-------|-----|--------|
| Starter (free) | 500 | $0 | $0 |
| Professional | 100 | $9,900 | $118,800 |
| Team | 75 (25 teams x 3) | $18,675 | $224,100 |
| Enterprise | 25 | TBD | TBD |
| **Total** | **200 paid** | **$28,575+** | **$342,900+** |

Plus usage-based revenue from enrichment credits (Intelligence Wallet) and co-op network transaction fees.

### Competitive Pricing Context

- PitchBook: $20,000-$50,000/seat/year
- Affinity: $2,400-$4,800/seat/year
- 4Degrees: $2,000-$5,000/seat/year
- Grata: $5,000-$15,000/seat/year
- **Rally PE Professional: $1,188/seat/year**
- **Rally PE Team: $2,988/seat/year**

Rally PE is priced below Affinity and 4Degrees, dramatically below PitchBook and Grata, and delivers more AI-powered functionality than any of them. The price point is accessible to search fund operators (the beachhead) while still generating meaningful revenue at scale.

---

## Appendix: Technical Architecture Summary

### What Already Exists in Rally (No Changes Needed)

| Component | File | PE Usage |
|-----------|------|----------|
| Contact CRUD + enrichment | `backend/routes/crm.js` | People in deal pipeline |
| Company CRUD + enrichment | `backend/routes/crm.js` | Deal targets |
| Web search enrichment | `backend/services/crm/enrichment.js` | Thesis-aware target research |
| Waterfall source records | `backend/services/crm/waterfall.js` | Data provenance for DD |
| Scoring engine | `backend/services/crm/scoring.js` | PE deal fit scoring |
| List artifacts | `backend/plugins/list-tools/index.js` | Comp tables, DD checklists, target lists |
| List enrichment | `backend/services/crm/listEnrichment.js` | Enrich comp table rows |
| Context/strategy tools | `backend/plugins/context-tools/index.js` | Thesis storage and retrieval |
| Plugin registry | `backend/plugins/registry.js` | PE plays registered as tools |
| Revenue Agent chat | `backend/routes/rally.js` | Deal Agent persona |
| Workspace management | `backend/routes/workspace.js` | PE workspace mode |
| Audit log | `backend/lib/auditLog.js` | Compliance-grade activity tracking |
| ContactOut integration | `backend/services/crm/contactout.js` | Verified contact data |
| Gmail integration | `backend/routes/gmail.js` | Email context for relationships |
| Calendar integration | `backend/routes/calendar.js` | Meeting prep, scheduling |
| CSV import | `backend/services/crm/importer.js` | PitchBook data import |
| Batch enrichment | `backend/services/crm/enrichment.js` | Bulk target enrichment |

### What PE Mode Adds (Configuration + Content)

| Addition | Type | Effort |
|----------|------|--------|
| `pe` workspace mode | Config | 1 line |
| PE deal stages | Config | JSON in workspace settings |
| `pe-deal-fit` scoring profile | Config | ~80 lines in scoring.js |
| PE system prompt | Content | ~200 lines of prompt text |
| Thesis JSON schema | Content | Schema documentation |
| 6 PE plays | Content + orchestration | ~50 lines per play (prompt + tool calls) |
| PE onboarding flow | UI | Extends existing wizard |
| Company-level scoring | Code | Modest refactor of scoring functions |

**Total estimated engineering effort for Phase 1 + 2:** 3-5 weeks for one developer. This is the advantage of building PE mode on top of a general-purpose AI CRM platform --- the infrastructure is already built.
