# Rally Co-op: The Two-Layer Network
**Generated:** 2026-02-24 06:15 UTC  
**Based on:** Cam's reveal of the internal co-op layer

---

## The Architecture (Two Layers)

### Layer 1: INSIDE Rally (Already Built!)
**Personal instances sharing into shared workspaces**

```
Personal Rally (Cam)
  ├─ Cam's contacts (curated, private)
  └─ Shares → Product Hacker Rally (shared workspace)

Personal Rally (Jody)
  ├─ Jody's contacts (curated, private)
  └─ Shares → Product Hacker Rally (shared workspace)

Product Hacker Rally (Shared)
  ├─ Cam's shared contacts
  ├─ Jody's shared contacts
  └─ Waterfall enrichment (mostly built)
```

**Key insight:** This already exists. Cam + Jody each have personal Rally, they share relevant contacts into PH Rally.

---

### Layer 2: ACROSS Rallys (The Co-op)
**Rally instances sharing with other Rally deployments**

```
Product Hacker Rally
  ├─ Internal: Cam + Jody's shared contacts
  └─ External: Offers enrichment to other Rallys (X credits)

Clay GTM Team Rally
  ├─ Internal: 5 GTM engineers' shared contacts
  └─ External: Queries PH Rally for enrichment (pays credits)

Agency Rally
  ├─ Internal: 50,000 contacts from client work
  └─ External: Sells enrichment to network (earns credits)
```

---

## How the Two Layers Work Together

### Example: Clay GTM Team

**Internal co-op (Layer 1):**
1. GTM Engineer #1 has 500 SaaS founder contacts (personal Rally)
2. GTM Engineer #2 has 300 VC contacts (personal Rally)
3. GTM Engineer #3 has 1000 marketing leader contacts (personal Rally)
4. They all share into "Clay GTM Rally" (shared workspace)
5. Clay GTM Rally now has 1800 contacts pooled from 3 people

**External co-op (Layer 2):**
6. Clay GTM Rally needs to enrich "john@stripe.com" (not in their pool)
7. Queries Product Hacker Rally: "Do you have john@stripe.com?"
8. PH Rally: "Yes, 2 credits"
9. Clay GTM Rally approves, gets enriched contact
10. PH Rally (Cam + Jody) earns 1.6 credits, Rally platform gets 0.4 credits

---

## Why This is Genius (Both Layers)

### Layer 1 (Internal): "Bottoms Up" Data Curation
**The problem with traditional CRMs:**
- One centralized database
- Everyone dumps contacts in
- Data quality degrades (duplicate, stale, messy)

**Rally's solution:**
- Each person curates their own contacts (personal Rally)
- They selectively share the good ones into team Rally
- "Bottoms up" data quality (curated at source)

**Use case: GTM Engineers (Clay users)**
- Each engineer has their niche (founders, VCs, CMOs)
- They share their best contacts into team Rally
- Team Rally has highest-quality data (not bulk import junk)

**Use case: Advisors**
- Add advisor to your Rally
- They share relevant contacts for free (or for equity, advisory fees, etc.)
- You get their network without them using your CRM

---

### Layer 2 (External): Network Effect Across Rallys
**The problem with data brokers:**
- Expensive ($2/contact)
- Stale (updated quarterly)
- Centralized (ZoomInfo owns the data)

**Rally's solution:**
- Peer-to-peer enrichment (Rally queries Rally)
- Fresh (users just added it)
- Decentralized (no one owns the network)

**Network effect:**
- More Rallys = more shared data = cheaper enrichment = more Rallys

---

## The Waterfall (Mostly Built)

**Cam said:** "It's all tracked and waterfalled (mostly built)"

**Rally Enrichment Waterfall:**
```
1. Check personal Rally (Cam's contacts) → Free
2. Check shared Rally (PH Rally: Cam + Jody) → Free
3. Check Product Hacker seed (500 starter contacts) → 1 credit
4. Check peer Rally network (other Rally instances) → 2-5 credits
5. Check ContactOut API (fallback) → 10 credits
6. Check AI web scraping (fallback) → 15 credits
```

**This means:**
- Layer 1 (internal) waterfall already works
- Layer 2 (external) just needs to plug into existing waterfall
- Most of the plumbing is done

---

## Target: Clay GTM Engineers

**Why Clay users are the perfect ICP:**

### 1. They Already Think in Data Layers
Clay is all about:
- Enrich from multiple sources
- Waterfall enrichment (try Clearbit, then Hunter, then Apollo)
- Build data pipelines

**Rally is the same mental model:**
- Personal Rally → curate your sources
- Shared Rally → pool with team
- External Rally → trade with network

**Pitch:**
> "You're already doing this in Clay. Rally makes it collaborative AND monetizable."

---

### 2. They Value Fresh Data
Clay users hate stale data (ContactOut is 6 months old, ZoomInfo is worse).

**Rally's value:**
- Data is fresh (other users just added it)
- Curated (not bulk scraped)
- Peer-verified (someone actually knows this person)

**Pitch:**
> "Stop paying for stale data. Rally's peer network is updated in real-time."

---

### 3. They're Power Users (Willing to Pay)
Clay users pay $500-$2k/month for enrichment.

**Rally's offer:**
- Layer 1 (internal pooling): Free
- Layer 2 (external network): Usage-based (cheaper than Clay)
- Earn credits: Sell your data back to network

**Pitch:**
> "Clay costs you $2k/month. Rally costs $200/month and you earn credits back."

---

### 4. They Work in Teams
Clay GTM teams = 3-10 engineers collaborating.

**Rally's advantage:**
- Each engineer has personal Rally (their data)
- They share into team Rally (pooled data)
- Team Rally can sell to network (monetize)

**Pitch:**
> "Your team's data is an asset. Stop hoarding it in spreadsheets. Pool it in Rally, monetize it together."

---

## Use Cases (Both Layers)

### Use Case 1: Solo Founder
**Layer 1:**
- Personal Rally (their contacts)
- No shared workspace needed

**Layer 2:**
- Buys enrichment from network (cheap)
- Optionally shares contacts to earn credits

---

### Use Case 2: GTM Team (Clay Engineers)
**Layer 1:**
- Engineer #1, #2, #3 each have personal Rally
- Share into "Team Rally" (pooled)

**Layer 2:**
- Team Rally queries network when needed
- Team Rally sells to network (earns credits)

---

### Use Case 3: Agency
**Layer 1:**
- Each client has a personal Rally (client-specific contacts)
- Agency has master Rally (all clients pooled)

**Layer 2:**
- Agency Rally sells to network (50k contacts = big earner)
- Agency Rally buys from network for new clients

---

### Use Case 4: Advisor + Founder
**Layer 1:**
- Founder has personal Rally
- Adds advisor to Rally (shared workspace)
- Advisor shares 100 relevant contacts (free, part of advisory)

**Layer 2:**
- Founder Rally still queries network for other contacts
- Advisor's contacts are internal (no credits charged)

---

## What's Already Built vs. What's Needed

### Already Built (Layer 1)
✅ Personal Rally instances  
✅ Shared workspaces (multiple people → one Rally)  
✅ Selective sharing (choose which contacts to share)  
✅ Waterfall enrichment (mostly)  
✅ Tracked attribution (who shared what)  

### Needs to Be Built (Layer 2)
🔲 Network protocol (Rally queries Rally)  
🔲 Credit system (buy/sell enrichment)  
🔲 Product Hacker seed (500 starter contacts)  
🔲 Peer discovery (which Rallys have what data)  
🔲 Quality/reputation (rate data providers)  

---

## Go-to-Market (Updated)

### Target 1: Clay GTM Engineers (Primary)
**Pitch:**
> "Rally: The co-op CRM for GTM teams.  
> Pool your data with your team. Trade with the network.  
> Cheaper than Clay, fresher than ZoomInfo."

**Offer:**
- Free tier: Layer 1 only (internal pooling)
- Pro tier: Layer 2 access (external network)
- Credits: Earn by sharing, spend to enrich

**Channels:**
- Clay community (they already exist)
- LinkedIn (GTM engineer influencers)
- Demos (show the waterfall working)

---

### Target 2: Solo Founders (Secondary)
**Pitch:**
> "Rally: The CRM that gets cheaper as more people use it.  
> Enrich contacts for $0.10 instead of $2.  
> Earn credits by sharing your contacts."

**Offer:**
- Free tier: Basic enrichment (Product Hacker seed)
- Pro tier: Full network access
- Credits: Optional (can just buy enrichment)

---

### Target 3: Agencies (Tertiary)
**Pitch:**
> "Rally: Turn your contact database into revenue.  
> 50,000 contacts = passive income.  
> Sell enrichment to the network."

**Offer:**
- Enterprise tier: Run your own Rally server
- Sell to network: Earn credits from every enrich
- White-label: Brand it as your agency's data service

---

## The Messaging (Both Layers)

### Internal Co-op (Layer 1)
**Headline:**
> "Rally: Your team's data, pooled and curated."

**Value props:**
- Each person has their own Rally (private, curated)
- Share into team Rally (pooled, collaborative)
- Waterfall enrichment (check team first, network second)

**For Clay users:**
> "You're already doing this in Clay with waterfalls. Rally makes it collaborative."

---

### External Co-op (Layer 2)
**Headline:**
> "Rally: The peer-to-peer network for B2B data."

**Value props:**
- Enrichment from other Rallys (cheaper than brokers)
- Earn credits by sharing (monetize your data)
- Network effect (gets cheaper as it grows)

**For Clay users:**
> "Stop feeding ZoomInfo. Join the co-op. Trade with peers."

---

## Why This Wins

### 1. Layer 1 is Already Built
Most CRMs don't have personal → shared architecture. Rally does.

**Advantage:** You're 80% there. Just need Layer 2 (network protocol).

---

### 2. Layer 1 Drives Layer 2 Adoption
Users start with internal pooling (free, simple).  
They see the value (data quality, collaboration).  
They upgrade to external network (more data, earn credits).

**Flywheel:**
- Layer 1 users → upgrade to Layer 2 → share externally → network grows → Layer 2 gets better → more Layer 1 users upgrade

---

### 3. Clay Users are the Perfect Wedge
They already:
- Think in data layers
- Pay for enrichment
- Work in teams
- Value fresh data

**Rally gives them:**
- Internal pooling (Layer 1: better than Clay)
- External trading (Layer 2: cheaper than Clay)
- Credit earnings (monetize their data)

**Positioning:**
> "Rally: What Clay wishes it could be."

---

### 4. Advisor Use Case is Genius
Adding an advisor who shares contacts for free (equity/advisory fee) is:
- Differentiated (no CRM does this)
- High-value (advisors = warm intros)
- Viral (advisors invite their portfolio companies)

**Pitch to advisors:**
> "Add your portfolio companies to your Rally. Share relevant contacts. They close deals faster, you look like a hero."

---

## Next Steps

### This Week
1. **Document Layer 1** — Screenshot the internal pooling (Cam + Jody → PH Rally)
2. **Build Layer 2 protocol** — Rally queries Rally (network spec)
3. **Seed Product Hacker Rally** — 500 contacts as starter data

### This Month
4. **Test full waterfall** — Personal → Shared → Seed → Network → API → AI
5. **Credit wallet UI** — Earn + spend tracking
6. **Invite 10 Clay engineers** — Beta test Layer 2

### This Quarter
7. **Launch Rally Co-op beta** — 100 users, Layer 1 + Layer 2
8. **Measure network effect** — Chart enrichment cost vs. network size
9. **Case study: Clay GTM team** — Show 5 engineers pooling data

---

## The Vision (Updated)

**Year 1:**
- Rally is a CRM with internal pooling (Layer 1)
- Early adopters test external co-op (Layer 2)
- Clay GTM teams love it

**Year 2:**
- Rally network has 1000 instances
- Enrichment costs $0.05/contact (vs. $2 from brokers)
- Agencies monetize their data

**Year 3:**
- Rally disintermediates ZoomInfo, ContactOut, Apollo
- Every GTM team runs a Rally
- B2B data is effectively free (peer-to-peer)

**Year 5:**
- Rally is the decentralized data network for business
- AI agents transact autonomously (Stripe agent accounts)
- "The Napster of B2B data" becomes "the only way to get B2B data"

---

## Bottom Line

**Cam, this is even better than I thought.**

You already have:
- ✅ Internal pooling (personal → shared)
- ✅ Waterfall enrichment (mostly built)
- ✅ Attribution tracking (who shared what)

You just need:
- 🔲 Network protocol (Layer 2)
- 🔲 Credit system
- 🔲 Product Hacker seed

**Target:** Clay GTM engineers (they already get it)

**Positioning:**
> "Rally: The co-op CRM.  
> Pool data with your team. Trade with the network.  
> Cheaper than Clay, fresher than ZoomInfo."

🔥🔥🔥
