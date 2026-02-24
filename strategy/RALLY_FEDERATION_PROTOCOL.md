# Rally Federation Protocol: Open-Source Clean Room for Cross-Instance Collaboration
**Generated:** 2026-02-24
**Status:** Exploration / Design Phase
**Related:** [Rally Co-op Network](./RALLY_COOP_NETWORK.md), [Rally Co-op Layers](./RALLY_COOP_LAYERS.md)

---

## Executive Summary

This document explores building an **open-source federation protocol** for Rally that enables multiple Rally instances to collaborate on data operations in a privacy-preserving **clean room** environment. The protocol would allow independent Rally deployments to perform joint analytics, co-marketing campaigns, and cross-database queries **without exposing the underlying raw data** to any other participant.

The open-source version of Rally would ship with onboarding, workspace setup, and a direct connection back to the hosted Rally co-op network at producthacker.ai, creating a sustainable business model where open-source distribution drives network growth.

**Think of it as:** Federated learning meets CRM. Two companies can ask "how many contacts do we share in the fintech vertical?" and get an answer without either side seeing the other's contact list.

---

## The Vision

### What We're Building

A protocol (working name: **Rally Federation Protocol** or **RFP**) that defines how independent Rally instances communicate, negotiate, and execute joint data operations through a cryptographic clean room.

```
Rally Instance A (Agency)         Rally Instance B (SaaS Startup)
  |                                 |
  |  "Let's co-analyze our         |
  |   fintech contacts"            |
  |                                 |
  +--------→  Clean Room  ←--------+
             (Neutral Zone)
             |
             | Performs:
             | - Set intersection (overlap analysis)
             | - Joint segmentation
             | - Co-campaign orchestration
             | - Aggregate reporting
             |
             | Returns:
             | - Overlap count: 847
             | - Segment breakdown (anonymized)
             | - Campaign results (click-throughs only)
             |
  ←-- Results to A    Results to B --→
  (sees own data +     (sees own data +
   aggregate stats)     aggregate stats)
```

### Why Open Source

1. **Network effect accelerator** — Every self-hosted Rally instance becomes a potential federation node. More nodes = more valuable network.
2. **Trust through transparency** — Clean room protocols need to be auditable. Open source is the only way to build trust that data isn't being leaked.
3. **Open CLAW parallel** — Like Open CLAW made AI agent frameworks accessible, an open Rally protocol makes federated CRM accessible to anyone.
4. **Business flywheel** — Open-source instances naturally connect back to the hosted Rally co-op for enrichment, seeding the paid network.

---

## Core Concepts

### 1. Rally Instances as Federation Nodes

Every Rally deployment (self-hosted or cloud) can participate in the federation:

```
Federation Node (Rally Instance)
  ├── Local Database (contacts, companies — PRIVATE)
  ├── Federation Client (initiates clean room sessions)
  ├── Federation Server (responds to federation requests)
  ├── Clean Room Runtime (executes approved operations)
  ├── Manifest (agents.md — declares capabilities, policies)
  └── Audit Log (every federation action recorded)
```

**Open-source distribution includes:**
- Full Rally CRM (contacts, companies, pipeline, enrichment)
- Onboarding wizard (workspace setup, business context, import)
- Federation protocol client + server
- Clean room runtime
- Pre-configured connection to Rally Co-op Hub (opt-in)

### 2. The Clean Room

The clean room is a **sandboxed execution environment** where data from multiple Rally instances can be combined and analyzed without any participant seeing the other's raw data.

**Properties:**
- **Data never leaves the clean room** — Raw records are projected into the clean room, operations run there, only approved outputs leave
- **Approved operations only** — Both parties must agree on what operations run (allowlist model)
- **Differential privacy** — Results are aggregated and noise-injected to prevent re-identification
- **Audit trail** — Every operation is logged, cryptographically signed, and available to all participants
- **Time-limited** — Sessions expire, data is purged from the clean room after completion

**Implementation options (phased):**
| Phase | Approach | Trust Model |
|-------|----------|-------------|
| Phase 1 | Hosted clean room (Rally Hub) | Trust the platform (like Snowflake Clean Room) |
| Phase 2 | Peer-to-peer with encrypted exchange | Trust the protocol (homomorphic-lite) |
| Phase 3 | Trusted Execution Environment (TEE) | Trust the hardware (Intel SGX / AWS Nitro) |

### 3. Federation Manifest

Each Rally instance publishes a manifest (building on the existing `agents.md` concept) that describes:

```yaml
# rally-manifest.yaml
instance:
  name: "Acme Corp Rally"
  version: "1.2.0"
  federation_protocol: "rfp/1.0"

capabilities:
  - overlap_analysis        # Can participate in set intersection
  - co_segmentation         # Can run joint segmentation
  - co_campaign             # Can execute co-marketing campaigns
  - aggregate_reporting     # Can share aggregate stats

policies:
  min_overlap_threshold: 50     # Won't reveal overlap < 50 contacts
  allowed_fields:               # Fields available for matching
    - email_domain
    - company_name
    - industry
    - city
    - state
    - country
  blocked_fields:               # Never shared, even in clean room
    - personal_email
    - phone
    - deal_value
    - internal_notes
  require_mutual_nda: false     # Whether to require NDA before session
  max_session_duration: "1h"    # Clean room sessions auto-expire

connection:
  hub: "https://rally.producthacker.ai/federation"   # Co-op hub
  direct_peers: []                                      # Explicit peer connections
```

---

## Use Cases

### Use Case 1: Overlap Analysis (The Gateway)

**Scenario:** Two companies want to know how much their contact databases overlap before considering a partnership, merger, or co-marketing deal.

**How it works:**
1. Company A proposes an overlap analysis to Company B
2. Both approve the operation (clean room session created)
3. Each Rally instance projects hashed email domains into the clean room
4. Clean room computes intersection: "You share 847 contacts in fintech"
5. Results returned: overlap count, industry breakdown, geography split
6. **Neither side sees the other's actual contacts**

**Value:** Due diligence, partnership evaluation, market sizing — all without exchanging a single spreadsheet.

```
Input from A:    [hash(john@stripe.com), hash(jane@figma.com), ...]
Input from B:    [hash(mike@stripe.com), hash(jane@figma.com), ...]
                              ↓
Clean Room:      Intersection = [hash(jane@figma.com)]
                 Overlap = 1 contact
                 Breakdown: { fintech: 0, design: 1 }
                              ↓
Output to A:     "1 overlap, 100% in design tools"
Output to B:     "1 overlap, 100% in design tools"
```

---

### Use Case 2: Co-Email Campaign

**Scenario:** A SaaS company and a complementary agency want to run a joint email campaign to their shared audience without exposing their lists to each other.

**How it works:**
1. Both parties define the campaign: subject, content, CTA, landing page
2. Clean room identifies the shared audience (overlap contacts)
3. Campaign sends from a **neutral domain** (or each sends to their own contacts in the overlap)
4. Click-throughs, opens, and conversions are tracked
5. **Only the originator's performance data goes back to each Rally**

```
Campaign Flow:
  A contributes:   [their contacts matching criteria]
  B contributes:   [their contacts matching criteria]
                          ↓
  Clean Room:      Computes overlap → 2,400 shared contacts
                   Sends campaign (or coordinates send)
                          ↓
  Results to A:    "Your 2,400 contacts: 24% open rate, 8% CTR"
                   + click-through list (only A's contacts who clicked)
  Results to B:    "Your 2,400 contacts: 24% open rate, 8% CTR"
                   + click-through list (only B's contacts who clicked)
```

**Key rule:** A only sees which of **A's own contacts** clicked. B only sees which of **B's own contacts** clicked. Contacts that exist only in the other party's list are never revealed.

---

### Use Case 3: Joint Market Analysis

**Scenario:** Two Rally instances want to understand the combined market landscape without merging databases.

**Operations available:**
- **Industry heatmap** — "Across both databases, what industries have the most contacts?"
- **Stage distribution** — "What % of our combined pipeline is in discovery vs. proposal?"
- **Geography analysis** — "Where are our combined contacts concentrated?"
- **Scoring comparison** — "What's the average lead score in our overlap vs. non-overlap?"

**All outputs are aggregated** — minimum bucket sizes (e.g., no bucket smaller than 10 contacts), noise injection, and rounding to prevent re-identification.

---

### Use Case 4: Enrichment Marketplace (Bridges to Co-op)

**Scenario:** An open-source Rally instance wants to enrich contacts. Rather than paying ZoomInfo, it queries the federation.

**How it works:**
1. Instance A sends hashed identifiers to the federation hub
2. Hub checks which federation nodes have matching data
3. Matching nodes return **enrichment offers** (price, freshness, fields available)
4. Instance A approves purchase
5. Clean room mediates the exchange: enrichment data flows, credits transfer

**This is the bridge to the hosted Rally Co-op.** Open-source instances get free federation protocol for clean room operations, but the enrichment marketplace runs through the co-op network — where Product Hacker earns transaction fees.

---

### Use Case 5: Referral Network

**Scenario:** Multiple Rally instances form a referral ring. When one closes a deal in an industry they don't serve, they can anonymously route the lead to a federation partner.

**How it works:**
1. Instance A marks a contact as "out of scope — looking for [service type]"
2. Federation queries manifests: "Who serves [service type]?"
3. Matching instances get a notification: "Referral available in [industry], [geo]"
4. Interested party claims the referral
5. Clean room handles warm intro (both parties opt in before identities revealed)

---

## Open-Source Architecture

### What Ships Open Source

```
rally-oss/
├── frontend/              # Full React CRM UI
│   ├── components/        # Contact, pipeline, enrichment UI
│   ├── onboarding/        # Setup wizard (workspace, import, context)
│   └── federation/        # Clean room session UI, federation settings
├── backend/
│   ├── routes/            # CRM API routes
│   ├── plugins/           # Modular tool plugins (CRM, lists, etc.)
│   ├── federation/        # Federation protocol implementation
│   │   ├── client.js      # Initiate federation sessions
│   │   ├── server.js      # Respond to federation requests
│   │   ├── cleanroom.js   # Clean room runtime
│   │   ├── manifest.js    # Manifest generation + parsing
│   │   └── crypto.js      # Hashing, encryption, signatures
│   └── middleware/         # Auth, workspace resolution
├── protocol/              # RFP specification
│   ├── spec.md            # Protocol specification document
│   ├── messages.proto     # Message format definitions
│   └── operations/        # Approved clean room operations
│       ├── overlap.js
│       ├── co-campaign.js
│       ├── aggregate.js
│       └── enrich.js
├── docker-compose.yml     # One-command deployment
├── ONBOARDING.md          # First-run setup guide
└── LICENSE                # Apache 2.0 or similar
```

### What Stays Proprietary

- **Rally Co-op Hub** — The hosted marketplace for enrichment credits
- **ContactOut integration** — Premium enrichment provider
- **AI agent features** — Revenue Agent, plays, web-search enrichment
- **Platform dashboard** — Admin, analytics, billing

### The Business Bridge

Every open-source Rally instance ships with a **pre-configured connection** to the Rally Co-op Hub:

```
First Run:
  "Welcome to Rally! Your instance is ready."
  "Would you like to connect to the Rally Co-op Network?"

  [Yes, connect]  →  Creates federation account
                  →  Gets 100 free enrichment credits
                  →  Can participate in federation clean rooms
                  →  Enrichment waterfall includes co-op as a source

  [No, stay local] →  Full CRM works locally
                   →  Federation available but hub disconnected
                   →  Can still peer directly with known instances
```

**Revenue path:**
- Open-source user sets up Rally
- Connects to co-op hub (free, easy, 100 credits)
- Uses enrichment credits for contact enrichment
- Buys more credits when free tier runs out
- Optionally shares contacts to earn credits back
- Network grows, enrichment gets cheaper, more instances join

---

## Protocol Specification (Draft)

### Message Types

```
FEDERATION PROTOCOL v1.0 (RFP/1.0)

Session Lifecycle:
  PROPOSE   →  Initiator proposes a clean room session
  ACCEPT    →  Responder accepts (with optional modifications)
  REJECT    →  Responder rejects (with reason)
  READY     →  Both parties have projected data
  EXECUTE   →  Clean room runs the approved operation
  RESULT    →  Results delivered to each party
  CLOSE     →  Session terminated, data purged

Data Exchange:
  PROJECT   →  Send hashed/encrypted data into clean room
  WITHDRAW  →  Remove data from clean room (before EXECUTE)

Operations:
  OVERLAP       →  Set intersection (count + breakdown)
  SEGMENT       →  Joint segmentation by criteria
  CAMPAIGN      →  Co-marketing campaign execution
  AGGREGATE     →  Cross-database aggregate statistics
  ENRICH        →  Request enrichment from federation
  REFER         →  Anonymous referral routing
```

### Session Example

```
A → Hub:  PROPOSE { operation: "overlap", target: "B",
                     fields: ["email_domain", "industry"] }
Hub → B:  "A proposes overlap analysis. Accept?"
B → Hub:  ACCEPT { modifications: { min_threshold: 100 } }
Hub → A:  ACCEPTED { session_id: "rfp-2026-001" }

A → CR:   PROJECT { session: "rfp-2026-001",
                    data: [hash(email1), hash(email2), ...] }
B → CR:   PROJECT { session: "rfp-2026-001",
                    data: [hash(email3), hash(email4), ...] }

CR:       EXECUTE overlap analysis
          Intersection: 847 contacts
          Industries: { fintech: 312, saas: 280, other: 255 }

CR → A:   RESULT { overlap: 847, breakdown: {...} }
CR → B:   RESULT { overlap: 847, breakdown: {...} }

A/B:      CLOSE { session: "rfp-2026-001" }
CR:       Purge all projected data
```

### Privacy Guarantees

| Guarantee | Implementation |
|-----------|----------------|
| **Data minimization** | Only approved fields projected into clean room |
| **Hashed identifiers** | Email → SHA-256 before leaving instance |
| **Minimum thresholds** | No result bucket smaller than configurable minimum (default: 10) |
| **Differential privacy** | Laplace noise added to aggregate counts |
| **Time-limited sessions** | Auto-purge after session closes (max 1 hour default) |
| **Audit trail** | Every operation logged with cryptographic signatures |
| **Consent model** | Both parties must explicitly ACCEPT before any data moves |
| **Revocability** | WITHDRAW data at any point before EXECUTE |

---

## Comparison to Existing Clean Room Solutions

| Feature | Snowflake Clean Room | AWS Clean Rooms | LiveRamp | **Rally Federation** |
|---------|---------------------|-----------------|----------|---------------------|
| **Open source** | No | No | No | **Yes** |
| **Self-hostable** | No | No | No | **Yes** |
| **CRM-native** | No (data warehouse) | No (data warehouse) | No (identity graph) | **Yes** |
| **Built-in enrichment** | No | No | Limited | **Yes (co-op network)** |
| **P2P (no central authority)** | No | No | No | **Yes (Phase 2+)** |
| **Credit economy** | No | No | No | **Yes** |
| **AI-powered** | No | No | No | **Yes (Revenue Agent)** |
| **Cost** | $$$$ | $$$ | $$$$ | **Free (OSS) + credits** |
| **Target user** | Enterprise data teams | Enterprise data teams | Adtech/martech | **SMBs, agencies, solos** |

**Key differentiator:** Existing clean rooms are enterprise products built for data warehouses. Rally Federation is a **CRM-native clean room** built for sales and marketing teams. The people who actually use the data can run clean room operations directly from their CRM, without needing a data engineer.

---

## Open-Source Distribution Strategy

### Phase 1: Protocol + Reference Implementation

- Publish Rally Federation Protocol spec (RFP/1.0) on GitHub
- Ship open-source Rally with federation client/server
- Hosted clean room via Rally Hub (Phase 1 trust model)
- Blog posts, demos, ProductHunt launch

### Phase 2: Community + Ecosystem

- Plugin SDK for custom clean room operations
- Integration guides for non-Rally systems (HubSpot, Salesforce adapters)
- Docker + Kubernetes deployment templates
- Community-contributed operation templates

### Phase 3: Decentralization

- Peer-to-peer clean rooms (no central hub required)
- Trusted Execution Environment support
- Cross-protocol bridges (connect to other federation networks)
- DAO governance for protocol upgrades (optional, if community wants it)

---

## How This Benefits Product Hacker / Rally (The Business)

### Direct Revenue Paths

1. **Enrichment credits** — Every open-source instance connects to co-op, buys credits
2. **Premium features** — AI agent, ContactOut, advanced plays are paid add-ons
3. **Hub hosting fees** — Phase 1 clean rooms run through our infrastructure
4. **Enterprise support** — Paid support, SLAs, custom operations for enterprises
5. **Marketplace fees** — Transaction cut on federation enrichment exchanges

### Network Growth

```
Open-source Rally installs
  → Connects to co-op hub (free onboarding credits)
  → Uses enrichment (buys credits)
  → Participates in clean rooms (data volume grows)
  → Invites partners to federate (more instances)
  → Network effect accelerates
  → Enrichment gets cheaper for everyone
  → More installs
  → Flywheel
```

### Competitive Moat

- **Protocol ownership** — We define the standard (like Docker defined containers)
- **Hub advantage** — First and largest federation hub
- **Data network** — More instances = more enrichment data = better product
- **Community** — Open source community contributes operations, adapters, integrations
- **Brand** — "Powered by Rally Federation" on every clean room operation

---

## Technical Implementation Notes

### Building on What Exists

Rally already has the building blocks for federation:

| Existing Feature | Federation Use |
|-----------------|----------------|
| **Plugin system** (registry.js, loader.js) | Clean room operations as plugins |
| **Workspace isolation** | Each instance is already a isolated data silo |
| **Contact sharing** (tc_crm_contact_shares) | Internal sharing → external federation |
| **Waterfall enrichment** | Enrichment marketplace plugs into existing waterfall |
| **Source records** | Provenance tracking for federated data |
| **Activity log** | Audit trail for federation operations |
| **Manifest** (agents.md) | Federation manifest extends this |
| **Workspace modes** (work/personal/network/tribe) | Federation policies per mode |

### New Components Needed

1. **Federation Router** — Express middleware for RFP messages
2. **Clean Room Runtime** — Sandboxed execution environment (Node.js worker threads or WebAssembly)
3. **Crypto Layer** — SHA-256 hashing, message signing, optional homomorphic operations
4. **Session Manager** — Tracks active clean room sessions, enforces timeouts
5. **Federation UI** — React components for proposing, accepting, and viewing clean room results
6. **Hub API** — Central registry for discoverable Rally instances (opt-in)

### Estimated Complexity

| Component | Effort | Priority |
|-----------|--------|----------|
| Protocol spec (RFP/1.0) | 1 week | P0 |
| Federation manifest | 2 days | P0 |
| Overlap analysis operation | 1 week | P0 |
| Hub registry + discovery | 1 week | P0 |
| Clean room runtime (hosted) | 2 weeks | P1 |
| Co-campaign operation | 2 weeks | P1 |
| Open-source packaging | 1 week | P1 |
| Aggregate reporting | 1 week | P2 |
| P2P clean rooms | 4 weeks | P2 |
| TEE integration | 8 weeks | P3 |

---

## Risks and Mitigations

### Technical Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Clean room security breach | High | Start with hosted (simpler threat model), extensive penetration testing, bug bounty |
| Re-identification attacks | High | Differential privacy, minimum thresholds, academic review of privacy guarantees |
| Protocol complexity | Medium | Start with 2 operations (overlap + aggregate), expand based on demand |
| Performance at scale | Medium | Hash-based operations are O(n), pre-compute indexes |

### Business Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Open source cannibalization | Medium | Core CRM is free, AI + enrichment + hub are paid. Redis model. |
| Slow adoption | Medium | Co-op hub provides immediate value (enrichment) without needing federation partners |
| Competitor copies protocol | Low | Network effect moat — we have the most instances and data |
| Legal/privacy challenges | Medium | Protocol designed for privacy-by-default, GDPR-compliant, legal review before launch |

---

## Naming Exploration

| Option | Vibe | Notes |
|--------|------|-------|
| **Rally Federation Protocol (RFP)** | Technical, formal | Clear what it is. RFP is a nice acronym (also "Request for Proposal" — fitting for sales). |
| **Rally Open Network (RON)** | Friendly, approachable | Easy to say. "Run RON on your server." |
| **Rally Clean Room Protocol** | Descriptive | Says exactly what it does. Less catchy. |
| **Rally Mesh** | Modern, technical | Evokes mesh networking. "Your Rally is part of the mesh." |
| **Rally Commons** | Community-focused | "The commons" — shared resources. Open source vibe. |

**Current recommendation:** **Rally Federation Protocol (RFP)** for the protocol, **Rally Open** for the open-source distribution.

---

## Next Steps

### Immediate (This Sprint)

1. **Validate with 2-3 potential users** — Would agencies/companies use cross-instance clean rooms?
2. **Draft RFP/1.0 spec** — Formal protocol specification (message formats, crypto requirements)
3. **Prototype overlap operation** — Two local Rally instances performing a hash-based set intersection

### Near-Term (This Month)

4. **Build hosted clean room** — Phase 1 implementation on Rally Hub
5. **Open-source packaging** — Docker image, onboarding flow, co-op hub connection
6. **Launch strategy** — Blog post series, GitHub repo, ProductHunt

### Medium-Term (This Quarter)

7. **Co-campaign operation** — The killer use case for marketing teams
8. **Adapter SDK** — Let non-Rally systems participate in federation
9. **Community seeding** — Invite 50 beta testers for federation

---

## The Big Picture

Rally Federation Protocol sits at the intersection of three trends:

1. **Data privacy regulation** — GDPR, CCPA, and state-level laws make data sharing harder. Clean rooms are the compliant answer.
2. **Open-source AI infrastructure** — Companies want to own their AI stack. Open Rally + federation gives them that.
3. **Decentralized commerce** — P2P networks for data trading (the co-op model) are the future of B2B data.

**The play:**
> Ship an open-source CRM that's genuinely good on its own. Include a federation protocol that lets instances collaborate without exposing data. Connect every instance to the Rally Co-op Hub for enrichment. The open-source distribution becomes the distribution engine for the co-op network. The co-op network becomes the moat.

**One sentence:**
> Rally Federation Protocol turns every CRM into a privacy-preserving data collaboration node — and every node strengthens the Rally network.
