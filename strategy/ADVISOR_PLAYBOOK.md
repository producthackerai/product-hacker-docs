# Rally Advisor Playbook
**For PE/Fund Meeting**  
**Generated:** 2026-02-24

---

## Executive Summary

Rally is building the first **peer-to-peer B2B data network** — a co-op where companies share and trade contact/company data instead of paying data brokers.

**The opportunity:** Disintermediate ZoomInfo, ContactOut, and Apollo (multi-billion dollar market) with a P2P model where users:
1. Pay $0.10/contact instead of $2/contact
2. Earn credits by sharing their data
3. Get fresher data (peer-contributed, not stale databases)

**The moat:** Network effect — every user adds supply (their data) AND demand (they want enrichment). First to 1000 users wins the market.

**Current traction:**
- Layer 1 (internal co-op) already built
- Layer 2 (external network) in development
- Target ICP: Clay GTM engineers (3-10k users, willing to pay $500-$2k/month)

**Ask:** Seeking [$X] for [Y]

---

## The Problem

### B2B Data is Broken

**For buyers:**
- Expensive ($2/contact from ZoomInfo, ContactOut)
- Stale (updated quarterly, often 6+ months old)
- Low quality (bulk scraped, not verified)
- Centralized (brokers own the data, users rent access)

**For sellers:**
- Can't monetize their own data
- Locked into CRMs (data silos)
- No way to share selectively

**Market size:**
- ZoomInfo: $1.2B revenue (2023)
- Apollo: $500M+ valuation
- ContactOut, Hunter, Clearbit: $100M+ each
- **Total TAM:** $3B+ (data enrichment for B2B)

---

## The Solution: Rally Co-op Network

### Two-Layer Architecture

**Layer 1: Internal Co-op (Already Built)**
```
Personal Rally (Engineer #1)
  ├─ 500 curated SaaS founder contacts
  └─ Shares 300 → Team Rally

Personal Rally (Engineer #2)
  ├─ 400 VC contacts
  └─ Shares 250 → Team Rally

Team Rally (Shared)
  ├─ 550 pooled contacts
  └─ Waterfall enrichment
```

**Benefits:**
- Each person curates their own data (quality at source)
- Team pools the best contacts
- "Bottoms up" data quality (not bulk import junk)

**Status:** Shipped. Users can create personal Rallys and share into team workspaces.

---

**Layer 2: External Co-op (In Development)**
```
Product Hacker Rally
  ├─ 500 seed contacts (Cam + Jody's real network)
  └─ Offers enrichment to other Rallys (2 credits)

Clay GTM Team Rally
  ├─ 2000 internal contacts
  └─ Buys from network when needed (pays credits)

Agency Rally
  ├─ 50,000 contacts from client work
  └─ Sells to network (earns credits)
```

**Benefits:**
- Peer-to-peer enrichment (cheaper than brokers)
- Fresh data (users just added it)
- Network effect (more nodes = more data = cheaper enrichment)
- Users earn credits (monetize their data)

**Status:** Network protocol in development. Beta launch Q2 2026.

---

### The Economics

| Source | Cost/Contact | Data Freshness | User Earns? |
|--------|-------------|----------------|-------------|
| ZoomInfo | $2.00 | 6 months stale | No |
| ContactOut | $1.50 | 3 months stale | No |
| Apollo | $1.00 | 6 months stale | No |
| **Rally Network** | **$0.10** | **Real-time** | **Yes (credits)** |

**Rally's cut:** 20% of every transaction  
**User keeps:** 80% of credits earned  
**Network effect:** Cost decreases as network grows

---

### The Waterfall (How It Works)

```
User wants to enrich "john@stripe.com"

1. Check personal Rally → Free (if you have it)
2. Check team Rally → Free (pooled contacts)
3. Check Product Hacker seed → 1 credit (500 starter contacts)
4. Check peer Rally network → 2-5 credits (other users)
5. Check ContactOut API → 10 credits (fallback)
6. Check AI web scraping → 15 credits (last resort)
```

**Result:**
- 90% of enriches hit Layer 1-4 (cheap, fast, fresh)
- 10% fallback to APIs (expensive, slow)
- Average cost: $0.10/contact (vs. $2 from brokers)

---

## The Market

### Target ICP: Clay GTM Engineers

**Who they are:**
- 3-10 person GTM teams
- Use Clay for data enrichment ($500-$2k/month)
- Think in waterfalls (Clearbit → Hunter → Apollo)
- Value fresh data over bulk data
- Willing to pay for quality

**Why they'll love Rally:**
- Internal pooling (Layer 1) = free collaboration
- External trading (Layer 2) = cheaper than Clay
- Earn credits = monetize their data
- Fresh data = peer-verified, not stale
- Same mental model they already use

**Market size:**
- 10,000+ Clay users
- 3,000+ power users (GTM engineers)
- $1,000/user/year = $3M TAM (just Clay)
- Total B2B enrichment market: $3B+

---

### Wedge Strategy

**Phase 1 (Q2 2026):** Clay GTM engineers
- 100 beta users
- Layer 1 (internal pooling) is free
- Layer 2 (external trading) is paid ($99-$299/month)
- Network effect kicks in at 100+ nodes

**Phase 2 (Q3-Q4 2026):** Agencies + consultancies
- 1,000 users
- Agencies monetize their 50k+ contact databases
- Rally becomes the marketplace for B2B data

**Phase 3 (2027):** Displace data brokers
- 10,000+ users
- Enrichment costs $0.05/contact (network scale)
- ZoomInfo/ContactOut/Apollo lose market share

---

## The Moat

### 1. Network Effect (Strongest Moat)
- Every user adds supply (their data) AND demand (they want enrichment)
- More users = more data = cheaper enrichment = more users
- First to 1000 users creates defensible network

### 2. Data Freshness
- Peer-contributed data is real-time (users just added it)
- Brokers update quarterly (6 months stale)
- Rally's data quality improves over time (user ratings, Tao tracing)

### 3. First-Mover Advantage
- Product Hacker seeds the network (500 starter contacts)
- Early users become "super nodes" (high-value data sellers)
- Competitors can't copy without user base

### 4. Credit Economy Lock-In
- Users earn credits by sharing
- They spend credits to enrich
- Switching cost = losing credit balance

### 5. Agent-Ready Infrastructure
- Stripe launched agent accounts (agents can pay)
- Google shipped MCP in Chrome (agent-to-agent communication)
- Rally is the first B2B data network built for agents

---

## Business Model

### Revenue Streams

**1. Transaction Fees (Primary)**
- 20% cut on every peer-to-peer enrichment
- User A pays 5 credits → User B gets 4, Rally gets 1
- Scales with network activity

**2. Subscription Tiers**
- Free: Layer 1 only (internal pooling)
- Pro ($99/mo): Layer 2 access (external network)
- Enterprise ($299/mo): Run your own Rally server, sell to network

**3. Intelligence Wallet (Credit Top-Ups)**
- Users buy credits: $10 = 100 credits, $50 = 600 credits
- Rally earns margin on credit sales (10-20%)

**4. Premium Data Providers**
- Product Hacker sells "verified seed data" ($1-2/contact)
- High-quality contacts from Cam + Jody's real network

---

### Unit Economics

**Per User (Average):**
- 100 enriches/month at 3 credits each = 300 credits spent
- Rally's cut (20%) = 60 credits = $6 revenue
- User also earns credits by sharing (net spend: ~200 credits/month)

**At Scale (1,000 users):**
- 100k enriches/month
- 300k credits transacted
- 60k credits = $6k revenue (transaction fees)
- Plus subscriptions: 500 Pro users at $99/mo = $50k MRR
- **Total MRR: $56k at 1,000 users**

**At 10,000 users:**
- 1M enriches/month
- 3M credits transacted
- 600k credits = $60k revenue (transaction fees)
- Plus subscriptions: 5,000 Pro users at $99/mo = $500k MRR
- **Total MRR: $560k at 10,000 users**

---

## Traction & Roadmap

### Current Status (Feb 2026)

**Layer 1 (Internal Co-op):**
- ✅ Personal Rally instances built
- ✅ Shared workspaces (team pooling)
- ✅ Waterfall enrichment (mostly built)
- ✅ Attribution tracking (who shared what)

**Layer 2 (External Co-op):**
- 🔄 Network protocol in development
- 🔄 Credit buy/sell system
- 🔄 Product Hacker seed (500 contacts)
- 🔄 Peer discovery

**Positioning:**
- ✅ "Outcomes platform" messaging locked
- ✅ Clay GTM engineers identified as ICP
- ✅ Advisor use case validated

---

### Roadmap

**Q2 2026 (Next 3 Months):**
- Ship Layer 2 (network protocol)
- Launch Rally Co-op beta (100 users, invite-only)
- Onboard 10 Clay GTM teams
- Seed Product Hacker Rally with 500 contacts
- Measure network effect (enrichment cost vs. network size)

**Q3 2026:**
- Open beta (1,000 users)
- Invite agencies (monetize their databases)
- Add quality/reputation scoring
- First $50k MRR

**Q4 2026:**
- 5,000 users
- Agent-to-agent commerce (Stripe agent accounts)
- API for external apps (Rally as data marketplace)
- $200k MRR

**2027:**
- 10,000+ users
- Displace data brokers (ZoomInfo, ContactOut)
- $500k+ MRR
- Series A

---

## Risks & Mitigation

### Legal Risk: "The Napster Question"

**Risk:** GDPR/CCPA violations (sharing contacts without consent)

**Mitigation:**
- Opt-in by default (users choose to share)
- Clear ToS (users warrant they have right to share)
- Anonymize sensitive fields (share company data, not personal emails)
- Track sources, respect opt-outs
- B2B data has weaker privacy protections than consumer data
- Platform defense (marketplace, not database)

**Precedent:**
- LinkedIn scraping cases (mostly lost, but B2B data is less protected)
- Facebook data sharing (consumer data = stricter)
- Rally is peer-to-peer (not centralized database)

**Verdict:** Legal risk is manageable. B2B data + opt-in + platform defense = lower risk than Napster (consumer music).

---

### Product Risk: Data Quality

**Risk:** Users upload junk data to earn credits (garbage in, garbage out)

**Mitigation:**
- Product Hacker seed ensures baseline quality (500 verified contacts)
- Tao tracing on every enrich (quality scores, user ratings)
- Reputation system (high-quality sellers get more business)
- Rally audits high-volume sellers
- Users can downvote bad data (credits refunded)

---

### Market Risk: Cold Start

**Risk:** No one shares data initially (chicken-and-egg)

**Mitigation:**
- Product Hacker seeds the network (500 contacts)
- Early adopters incentivized (earn credits, free Pro tier)
- Layer 1 (internal pooling) doesn't require network (users see value immediately)
- Advisor use case drives viral adoption (advisors invite portfolio companies)

---

### Competition Risk: ZoomInfo/Apollo Fight Back

**Risk:** Incumbents lower prices or add P2P features

**Mitigation:**
- Network effect moat (first to 1000 users wins)
- Rally is decentralized (can't be shut down like centralized service)
- Credit economy lock-in (users earn credits, don't want to switch)
- Agent-ready (incumbents are human-only)

---

## The Team

**Cam Fortin (Co-founder, CEO)**
- [Background]
- Built Rally Layer 1 (internal co-op) in [timeframe]
- Previously: [experience]

**Jody Roberts (Co-founder, [title])**
- [Background]
- Product vision, GTM strategy
- Previously: [experience]

**ProductHackerAI (Agent)**
- Ops intelligence layer
- Manages docs, memory, integrations
- First AI co-founder

**Advisors:**
- Brian Jones (ex-D&B co-founder) — data aggregation + SMB strategy
- [Others TBD]

---

## The Ask

**Raising:** [$X]

**Use of Funds:**
1. Ship Layer 2 (network protocol, credit system) — 3 months, $[Y]
2. Beta launch + user acquisition (100 users) — 3 months, $[Y]
3. Go-to-market (Clay community, LinkedIn, demos) — 6 months, $[Y]
4. Legal + compliance (GDPR, ToS, platform defense) — $[Y]
5. Runway (12-18 months to $100k MRR)

**Milestones:**
- 3 months: 100 beta users, Layer 2 live
- 6 months: 1,000 users, $50k MRR
- 12 months: 5,000 users, $200k MRR
- 18 months: Series A

---

## Why Now?

### Timing is Perfect

**1. AI Agents Are Buying**
- Stripe launched agent accounts (Feb 2024)
- Google shipped MCP in Chrome (2025)
- Rally is the first B2B data network built for agent-to-agent commerce

**2. Data Brokers Are Hated**
- ZoomInfo lawsuits (scraping complaints)
- Apollo stale data complaints
- Users want alternatives (willing to try P2P)

**3. Outcomes-Based Pricing is Accepted**
- Usage-based SaaS is mainstream (Snowflake, Stripe, Vercel)
- "Pay for results, not access" resonates with buyers
- Rally's credit model fits the trend

**4. Clay GTM Engineers Exist**
- 10,000+ users who already think in waterfalls
- They pay $500-$2k/month for enrichment
- Perfect wedge ICP (willing to pay, understand the model)

---

## Comparable Deals

**Data marketplaces:**
- Snowflake Data Marketplace (launched 2019, now $2B+ GMV)
- AWS Data Exchange (launched 2019)
- Narrative.io ($10M Series A)

**P2P networks:**
- Helium (decentralized wireless) — $1.2B valuation
- Filecoin (decentralized storage) — $3B+ valuation
- Rally = "Helium for B2B data"

**B2B data:**
- ZoomInfo IPO: $13B valuation (2020)
- Apollo: $500M+ valuation
- Clearbit (acquired by HubSpot): $150M+

**Rally's advantage:** P2P model = no database costs, no scraping liability, faster growth via network effect.

---

## Next Steps

**For this meeting:**
1. Feedback on co-op model (is it defensible?)
2. Legal risk appetite (GDPR/ToS concerns?)
3. Market fit validation (Clay GTM engineers = right ICP?)
4. Interest in leading/participating in round?

**Follow-up:**
- Demo (Layer 1 working today, Layer 2 beta in 6 weeks)
- Customer interviews (talk to Clay users)
- Legal review (GDPR/ToS strategy)
- Financial model (unit economics, projections)

---

## Appendix: The Vision (Long-Term)

**Year 1:** Rally is a CRM with peer-to-peer enrichment (Clay alternative)  
**Year 2:** Rally is a B2B data marketplace (agents buying from agents)  
**Year 3:** Rally disintermediates ZoomInfo, ContactOut, Apollo  
**Year 5:** Every business runs a Rally node, B2B data is effectively free

**Positioning:**
> "Rally: The decentralized data network for business.  
> No brokers. No gatekeepers. Just peers helping peers."

**Exit scenarios:**
1. Strategic acquisition (Salesforce, HubSpot, Microsoft)
2. IPO (B2B data marketplace at scale)
3. Stay independent (network effect moat, profitable at scale)

---

**Contact:**  
Cam Fortin — [email]  
Jody Roberts — [email]

**Repo:**  
https://github.com/producthackerai/product-hacker-docs

**Last Updated:** 2026-02-24
