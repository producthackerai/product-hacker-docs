# Launch Co-op Model

**Status:** active
**Priority:** medium

## Attached Documents

### coop_strategy.md

# Rally Co-op Strategy

> Turn every Rally workspace into a node in a decentralized data marketplace.

## Vision

Rally Co-op is a bottoms-up data cooperative where every Rally workspace is a potential data supplier and consumer. AI agents discover Rallies via the marketplace, read the agents.md manifest, negotiate terms, execute transactions, and clean up — no human needed for routine operations.

**Core principles:**
- **Bottoms-up data co-op**: Every Rally workspace is a potential data supplier and consumer
- **Agent-to-agent protocol**: AI agents discover, negotiate, transact autonomously
- **Strict governance**: Session-only retention, required attribution, manual/auto approval. All interactions logged
- **Credit economy**: Workspaces earn credits when others consume their data

---

## The Four Pillars

### 1. Publish
List your Rally's capabilities — contacts, enrichment, research — in the marketplace for others to discover. Each workspace configures what it offers through the Strategy tab.

### 2. Agent Protocol
Your `agents.md` manifest tells visiting AI agents what you offer, what it costs, and how to request access — no human needed. The manifest is auto-generated from your marketplace configuration.

### 3. Your Terms
Strict data governance with full control:
- **Access levels**: Read-only, Enrichment, Campaign execution, Full access
- **Data retention**: Session-only (deleted after task), 24 hours, 7 days, Permanent
- **Attribution**: Required or not required
- **Approval**: Manual review for each request, or auto-approved

### 4. Earn Credits
Set per-request or subscription pricing. When another Rally enriches from your data, you get paid. Pricing models: Free, Per-request, Subscription, Negotiable.

---

## Marketplace Listing Configuration

Each workspace configures these settings in Strategy > Rally Co-op:

### Listing Status
- **Listed**: Discoverable in the marketplace by other Rallies and their agents
- **Unlisted**: Private, not visible in marketplace search

### Tagline & Description
- One-liner describing your data value proposition
- Detailed description of what your Rally offers to collaborators

### Offerings Grid
| Offering | Description |
|----------|-------------|
| Contacts | Verified contact data available for lookup and enrichment |
| Enrichment | Data enrichment services (email, phone, LinkedIn, firmographics) |
| Lists | Curated prospect and account lists |
| Campaigns | Targeted outreach campaign execution |
| Research | Custom research and intelligence gathering |

---

## Data Profile

Describe the shape and scope of your data:

| Field | Example |
|-------|---------|
| Industries | SaaS, Fintech, Healthcare, E-commerce |
| Contact Volume | 500+, 2K, 10K+ |
| Regions | North America, Europe, APAC |
| Data Types | Email, Phone, LinkedIn, Company info, Firmographics |

---

## Access Terms

| Setting | Options |
|---------|---------|
| Access Level | Read-only, Enrichment, Campaign execution, Full access |
| Data Retention | Session-only, 24 hours, 7 days, Permanent |
| Attribution | Required / Not required |
| Approval Mode | Manual review / Auto-approved |
| Allowed Uses | Prospecting, Enrichment, Market research, Competitive analysis |

---

## Pricing Model

| Model | Description |
|-------|-------------|
| Free | Open collaboration, no cost |
| Per-request | Pay per lookup/action (e.g., 1 credit per contact lookup) |
| Subscription | Recurring access (monthly/annual) |
| Negotiable | Agents propose terms, owner reviews |

**Rate card fields:**
- Contact lookup price (e.g., 1 credit, /bin/zsh.10)
- Enrichment batch price (e.g., 5 credits per 10 contacts)
- Campaign execution price (e.g., 25 credits per campaign)
- Custom/notes (volume discounts, enterprise tiers)

---

## agents.md Auto-Generation

The `agents.md` manifest is auto-generated from the marketplace config. It's a machine-readable markdown file that AI agents parse to understand capabilities, terms, and pricing.

### Format

```markdown
# [Workspace Name]
> [Tagline]

## Capabilities
- **Contacts**: Verified contact data available for lookup and enrichment
- **Enrichment**: Data enrichment services

## Data Profile
- Industries: SaaS, Fintech
- Contact volume: 500+
- Data types: email, phone, LinkedIn
- Regions: North America

## Terms
- Access: Enrichment
- Data retention: Session-only
- Attribution: Required
- Approval: Manual review for each request

## Pricing
- Model: Per request
- Contact lookup: 1 credit

## Collaboration Protocol
1. Discover this Rally via marketplace or agent search
2. Read this manifest to understand capabilities and terms
3. Request access (specify data needed + purpose)
4. Owner reviews and approves
5. Data provided within agreed scope and retention policy
6. Usage logged, attributed, and reported to both parties
```

---

## Data Model

Stored in `tc_workspaces.settings.marketplace` JSONB:

```json
{
  "listed": false,
  "tagline": "500+ verified SaaS decision-makers",
  "description": "...",
  "offerings": {
    "contacts": true,
    "enrichment": true,
    "lists": false,
    "campaigns": false,
    "research": false
  },
  "dataProfile": {
    "industries": ["SaaS"],
    "contactCount": "500+",
    "dataTypes": ["email", "phone"],
    "regions": ["North America"]
  },
  "terms": {
    "accessLevel": "enrichment",
    "retention": "session-only",
    "attribution": true,
    "approvalRequired": true,
    "allowedUses": ["prospecting"]
  },
  "pricing": {
    "model": "per-request",
    "contactLookup": "1 credit",
    "enrichmentBatch": "5 credits"
  },
  "agentsMd": "# ... auto-generated ..."
}
```

---

## API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/workspaces/:slug/marketplace` | PUT | Update marketplace / co-op settings (editor+ role) |

---

## Implementation Status

### Completed (Feb 2026)
- StrategyTab UI: Vision statement, 4 pillars, marketplace toggle, offerings, data profile, terms, pricing, agents.md preview
- Backend: PUT endpoint for saving marketplace settings
- agents.md auto-generation from config
- Stats card using Rally DB data

### Future Work
- Rally marketplace API for programmatic workspace discovery
- Agent authentication + capability negotiation
- Credit/payment clearing between workspaces
- Transaction logging + audit trail
- Real-time usage reporting for data providers
- Rate limiting + abuse prevention
- Marketplace browser UI (search/filter other Rallies)


### legal_brief.md

# Rally Co-op: Legal Brief

> What legal frameworks, terms, and protections are needed before enabling data sharing between Rally workspaces?

## 1. The Core Legal Question

When Rally workspaces share CRM contact data through the Co-op model, we are facilitating the transfer of **personally identifiable information (PII)** between separate business entities. This triggers obligations under:

- **CCPA/CPRA** (California Consumer Privacy Act / California Privacy Rights Act)
- **GDPR** (if any EU contacts exist in the data)
- **CAN-SPAM** (email contact data)
- **State-level privacy laws** (Virginia VCDPA, Colorado CPA, Connecticut CTDPA, etc.)
- **Contractual obligations** the original data collector may have with their contacts

## 2. Data Classification

### What's Being Shared
| Data Type | PII? | Sensitivity |
|-----------|------|-------------|
| Full name | Yes | Low |
| Email address | Yes | Medium |
| Phone number | Yes | Medium |
| Company/title | Quasi-PII | Low |
| LinkedIn URL | Quasi-PII | Low |
| Deal value/stage | Business data | Low (not PII of the contact) |
| Notes/custom fields | Potentially | Variable — could contain sensitive info |
| Enrichment data (location, etc.) | Yes | Medium |

### Key Risk: Notes & Custom Fields
Users may store sensitive info in free-text fields (health conditions, financial details, personal opinions). Any sharing framework must either:
- **Exclude** notes/custom fields from shared data by default, OR
- **Require explicit opt-in** for sharing free-text fields

## 3. Required Legal Instruments

### 3a. Terms of Service (Platform-Level)
Our ToS must explicitly cover:
- **Data processor role**: Rally acts as a data processor, not controller. Users are controllers of their contact data.
- **Sharing consent**: Users affirm they have the right to share their contact data (e.g., they collected it lawfully with proper notice).
- **Prohibited data**: Users must not upload data they don't have rights to share (purchased lists without sharing rights, scraped data from restricted sources).
- **Indemnification**: Users indemnify Rally for any claims arising from data they shared that they didn't have rights to share.

### 3b. Data Sharing Agreement (Co-op Level)
When a workspace enables Co-op sharing, the workspace owner must accept a **Data Sharing Addendum** that covers:
- **Purpose limitation**: Shared data may only be used for legitimate business development purposes.
- **No resale**: Recipients cannot resell or re-share the data outside the Rally platform.
- **Retention**: When a workspace disconnects, shared data references are removed (we already do this — our sharing model uses references, not copies).
- **Right to withdraw**: Any workspace can disconnect and remove their shared contacts at any time (already implemented via DELETE /sharing/demo and sharing mode toggles).

### 3c. Privacy Policy Updates
Our privacy policy must describe:
- What data is collected and how it's used
- That data may be shared between workspaces within the Rally platform
- How users can request deletion of their data
- Contact information for privacy inquiries

## 4. Technical Safeguards (Already Implemented or Planned)

| Safeguard | Status | Notes |
|-----------|--------|-------|
| Reference-based sharing (not copies) | Done | Shares point to source contacts; disconnect removes all references |
| One-click disconnect | Done | DELETE endpoint removes all demo/shared contacts instantly |
| Workspace-level access control | Done | Only workspace members with appropriate roles can see shared contacts |
| Audit logging | Done | tc_crm_audit_log tracks all contact operations |
| User attribution | Done | _sharedBy metadata tracks who shared what |
| Demo source tagging | Done | demo_source_slug distinguishes sample data from real shares |

### Additional Technical Requirements
- [ ] **Consent gate**: Before enabling Co-op, show Data Sharing Addendum and require explicit acceptance (checkbox + timestamp stored in tc_workspaces.settings)
- [ ] **Field-level sharing controls**: Let workspace owners choose which fields are shared (exclude notes/custom_fields by default)
- [ ] **Data export**: Provide a way for contact subjects to request their data (GDPR Art. 15 right of access)
- [ ] **Deletion propagation**: If source contact is deleted, ensure shared references are cleaned up
- [ ] **Rate limiting on share creation**: Prevent mass data exfiltration through rapid share-unshare cycles

## 5. Compliance Roadmap

### Phase 1: Pre-Launch (Before Co-op goes public)
1. **Update Terms of Service** to include data sharing provisions
2. **Update Privacy Policy** to describe workspace-to-workspace data sharing
3. **Create Data Sharing Addendum** as a click-through agreement
4. **Implement consent gate** in workspace settings (Co-op toggle requires accepting addendum)
5. **Add field-level sharing controls** (at minimum, exclude notes by default)

### Phase 2: Launch
6. **DPIA (Data Protection Impact Assessment)** — document the sharing model's privacy impact
7. **Cookie/tracking disclosure** (if analytics are added to shared views)
8. **Add contact subject access request flow** (for GDPR compliance if EU contacts exist)

### Phase 3: Scale
9. **Data Processing Agreement (DPA)** template for enterprise customers
10. **SOC 2 Type II audit** if pursuing enterprise customers
11. **International data transfer mechanisms** (Standard Contractual Clauses for EU→US transfers)

## 6. Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| User shares data they don't own | Medium | High | ToS indemnification + prohibited data clause |
| GDPR subject access request | Low (US-focused) | Medium | Build SAR workflow before EU expansion |
| Contact complains about being in CRM | Low | Low | Individual workspace owners handle (they're the controller) |
| Data breach exposing shared contacts | Low | Very High | Standard security practices, encryption at rest, row-level security |
| Regulatory fine (CCPA/GDPR) | Very Low | Very High | Compliance roadmap above, DPA templates |

## 7. Summary & Recommendations

**Before enabling Co-op publicly:**
1. ToS update with data sharing provisions (**required**)
2. Privacy Policy update (**required**)
3. Data Sharing Addendum click-through (**required**)
4. Field-level sharing controls (**strongly recommended**)
5. Consent gate in UI (**required**)

**The sharing model architecture is already legally sound** — reference-based sharing (not copies), one-click disconnect, and workspace isolation provide a strong technical foundation. The remaining work is primarily **documentation and user consent flows**.

> **Note**: This brief is informational guidance, not legal advice. Before launching Co-op publicly, consult with a licensed attorney specializing in data privacy law to review the specific terms and compliance requirements.


---
*Last synced: 2026-02-24*
