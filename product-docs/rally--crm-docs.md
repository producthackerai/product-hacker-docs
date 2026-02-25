# Rally Documentation

## Overview

Rally is a revenue intelligence tool built into Product Hacker. It's an AI-first CRM where you manage contacts and companies through chat, CSV uploads, or the REST API. The AI agent has live web search — it can look up real people and companies for you.

All CRM data lives in the shared "app" workspace, so all admins see the same contacts and companies.

## Getting Started

### Add Contacts

There are three ways to add contacts:

1. **Upload CSV** — Click the "Upload CSV" button. The system auto-detects column names (supports 50+ variations like "First Name", "fname", "given_name", etc.), normalizes data, validates, deduplicates, and imports.

2. **Via Chat** — Tell the Revenue Agent: "Add John Smith at Acme Corp, email john@acme.com, deal worth $50K" and it creates the contact.

3. **Via API** — `POST /api/crm/contacts` with JSON body. Works with any automation tool.

### Add Companies

Same three methods. Companies track organizational data: domain, industry, employee count, revenue range, NAICS/SIC codes.

### Enrich Contacts & Companies

Click the "Enrich via Web Search" button on any contact or company card, or tell the chat agent: "Enrich contact-001". The agent searches the web for the person/company and fills in missing fields (title, LinkedIn, email, company info, industry, funding, etc.).

## Contact Fields

| Field | Description |
|-------|-------------|
| first_name, last_name, full_name | Name fields — auto-parsed from full name |
| email | Email address (used for deduplication) |
| phone | Phone number |
| linkedin_url | LinkedIn profile URL (used for deduplication) |
| title | Short job title (e.g., "VP Engineering") — stripped of company names |
| headline | Full LinkedIn-style headline (e.g., "CEO & Founder \| Building the future of CRM"). More verbose than title. |
| company_name | Company they work at |
| company_id | Link to a company record |
| stage | Pipeline stage (see Pipeline Stages below) |
| score | Lead score 0-100 |
| deal_value | Deal value in dollars |
| source | How contact was added: csv_upload, chat, api, linkedin, manual |
| tags | Array of tags for categorization |
| notes | Free-text notes |
| custom_fields | JSONB for user-defined fields |
| enrichment_data | JSONB storing web search enrichment results |

## Company Fields

| Field | Description |
|-------|-------------|
| name | Company name (required) |
| domain | Website domain (e.g., acme.com) — used for deduplication |
| website | Full website URL |
| linkedin_url | Company LinkedIn page |
| industry | Primary industry |
| employee_count | Range: "1-10", "11-50", "51-200", "201-500", "501-1000", "1001-5000", "5000+" |
| revenue_range | Range: "<1M", "1M-10M", "10M-50M", "50M-250M", "250M-1B", "1B+" |
| founded_year | Year founded |
| location | HQ location |
| entity_type | "b2b", "b2c", or "non_business" |
| naics_code | 6-digit NAICS code |
| sic_code | 4-digit SIC code |
| tags, notes, custom_fields, enrichment_data | Same as contacts |

## Pipeline Stages

Contacts progress through these stages:

| Stage | Description |
|-------|-------------|
| **lead** | New contact, not yet engaged |
| **discovery** | Initial conversations happening |
| **qualified** | Confirmed fit and budget |
| **proposal** | Proposal or demo sent |
| **negotiation** | Contract or terms being discussed |
| **closed_won** | Deal closed successfully |
| **closed_lost** | Deal lost |

Update via chat: "Move contact-003 to qualified" or "Update Sarah's stage to proposal"

## CSV Upload

### Supported Formats
- Standard CSV files (.csv)
- Up to 5MB file size
- First row must be headers
- Supports quoted fields, various delimiters

### Column Name Mapping
The system recognizes 50+ common column name variations. Examples:
- "First Name", "first_name", "fname", "given_name" → first_name
- "Email", "email_address", "e-mail", "work_email" → email
- "Company", "organization", "org", "employer" → company_name
- "LinkedIn", "profile_url", "linkedin_url" → linkedin_url
- "Phone", "telephone", "mobile", "cell" → phone

### Auto-Detection
The system automatically detects whether your CSV contains contacts or companies based on the column headers present.

### Deduplication
- **Contacts** are deduped by email + LinkedIn URL combination
- **Companies** are deduped by domain (or name if no domain)
- Duplicate uploads merge new data into existing records (fills blanks, never overwrites)

## Enrichment

### Master Enrichment (Waterfall)
The default enrichment mode cascades through ALL available providers in your waterfall priority order. Providers that aren't configured for your account are automatically skipped.

**How it works:**
1. System reads your workspace's waterfall priority order
2. For each provider (top to bottom): if available AND supports the entity type, run it
3. Each provider writes source records with its own confidence level
4. Fields are resolved using waterfall priority (highest provider wins)

**Example:** If your waterfall is `Manual > ContactOut > Web Search > CSV`, and you enrich a contact:
- ContactOut runs first (verified emails/phones)
- Web Search runs second (LinkedIn, company info, news)
- Each writes to `source_records` — ContactOut data wins for overlapping fields

### Enrichment Providers

| Provider | What it finds | Confidence | Availability |
|----------|--------------|------------|--------------|
| **ContactOut** | Verified emails, phones, LinkedIn profile data, company info | Verified | Requires API key (`CONTACTOUT_API_KEY`) |
| **Web Search** | LinkedIn profiles, company info, funding, news, job postings | AI Inferred | Always available |

### Single-Provider Enrichment
You can also target a specific provider:
- "Enrich contact-001 via ContactOut" — ContactOut only
- "Enrich contact-001 via web search" — Web search only

### Batch Enrichment
Enrich multiple records at once via the API:
```
POST /api/crm/enrich
{ "entityType": "contact", "entityIds": ["contact-001", "contact-002"] }
```
Default `enrichmentType` is `"waterfall"` (all available providers). Set to `"contactout"` or `"web_search"` for single-provider.

### Enrichment Providers Endpoint
Check which providers are available:
```
GET /api/crm/enrichment-providers
→ { "providers": [{ "name": "contactout", "label": "ContactOut", "available": true, "entityTypes": ["contact"] }, ...] }
```

## Chat Commands

Talk to the Revenue Agent naturally. Examples:

### Creating Records
- "Add John Smith at Acme Corp, email john@acme.com"
- "Create a company: Anthropic, domain anthropic.com, AI industry"

### Searching & Listing
- "Show me all contacts at Acme"
- "List my qualified leads"
- "Who's in negotiation stage?"

### Updating Records
- "Move contact-003 to qualified"
- "Update Acme Corp's industry to AI/ML"
- "Set Sarah's deal value to $150K"

### Enriching
- "Enrich contact-001" — searches the web for that person
- "Look up Stripe — what do they do, funding, size?"
- "Enrich all contacts at Acme Corp"

### Pipeline Analysis
- "Show me my pipeline"
- "What's my total pipeline value?"
- "Who should I follow up with today?"

### URL Import
- Paste a LinkedIn URL: "https://linkedin.com/in/johndoe" — auto-creates and enriches

### Trace / Provenance
- "Trace contact-001" — show full source history for every field
- "Where did this email come from?" — show which source provided it and alternatives
- "Show provenance for Sarah" — per-field breakdown of all sources, winning values, and alternates

## API Reference

All endpoints require authentication (Bearer token). Default workspace is "app".

### Contacts
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/crm/contacts?workspace=individual | List contacts (filters: stage, search, limit, offset) |
| POST | /api/crm/contacts?workspace=individual | Create contact |
| PUT | /api/crm/contacts/:id?workspace=individual | Update contact |
| DELETE | /api/crm/contacts/:id?workspace=individual | Delete contact |

### Companies
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/crm/companies?workspace=individual | List companies (filters: search, limit) |
| POST | /api/crm/companies?workspace=individual | Create company |
| PUT | /api/crm/companies/:id?workspace=individual | Update company |
| DELETE | /api/crm/companies/:id?workspace=individual | Delete company |

### Upload & Enrichment
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/crm/upload?workspace=individual | Upload CSV (multipart form, field: "file") |
| POST | /api/crm/upload/preview?workspace=individual | Preview CSV without importing |
| POST | /api/crm/enrich?workspace=individual | Enrich records via web search |

### Custom Fields
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/crm/fields?workspace=individual | List field definitions |
| POST | /api/crm/fields?workspace=individual | Create field definition |

## Populating Your CRM

### Quick Start: Manual Entry
Start by adding your top 5-10 contacts via chat. The AI will help you structure the data.

### From Gmail
Google Contacts can be exported as CSV from https://contacts.google.com → Export → Google CSV. Upload that file directly. (Native Gmail API integration coming soon — will auto-sync.)

### From LinkedIn
1. **Export connections:** Go to LinkedIn → Settings → Data Privacy → Get a copy of your data → Select "Connections" → Download. Upload the CSV.
2. **Individual contacts:** Paste any LinkedIn profile URL in the chat — the agent creates a contact and enriches via web search.
3. **Sales Navigator:** If you use LinkedIn Sales Navigator, you can export lead lists as CSV and upload them.

### From Other CRMs
Export contacts as CSV from Salesforce, HubSpot, Pipedrive, etc. and upload. The column mapper handles most standard CRM export formats.

## Gmail Integration Roadmap

Native Gmail integration is planned using the Google People API:
1. **One-click Google OAuth** — Connect your Google account
2. **Auto-import contacts** — Pull all Google Contacts into Rally
3. **Sync updates** — Keep contacts in sync bidirectionally
4. **Email activity tracking** — See when you last emailed a contact

## LinkedIn Integration Roadmap

LinkedIn data access options:
1. **CSV export** (available now) — Export connections from LinkedIn settings
2. **URL parsing** (available now) — Paste profile URLs for auto-enrichment
3. **Sales Navigator CSV** — Export and upload lead lists
4. **Browser extension** (future) — One-click import from LinkedIn profiles

## Source Records & Waterfall Profiling

### Overview
Rally tracks ALL values from ALL sources for each field, with provenance metadata. When multiple sources provide different values for the same field (e.g., email from CSV upload vs ContactOut), the **waterfall** determines which value "wins" and is displayed.

### Source Records
Every contact and company has a `source_records` JSONB column. Each field (email, phone, title, etc.) stores an array of source entries:

```json
{
  "email": [
    { "value": "john@acme.com", "normalized": "john@acme.com", "source": "csv_upload", "confidence": "user_provided", "timestamp": "..." },
    { "value": "j.doe@acme.com", "normalized": "j.doe@acme.com", "source": "contactout", "confidence": "verified", "timestamp": "..." }
  ]
}
```

### Sources
| Source Tag | Description | Typical Confidence |
|-----------|-------------|-------------------|
| `manual` | User explicitly edited the field in the UI | user_provided |
| `contactout` | ContactOut verified vendor data | verified |
| `web_search` | AI web enrichment | inferred |
| `csv_upload` | CSV import | user_provided |
| `linkedin` | LinkedIn import/URL | user_provided |
| `chat` | Created/updated via chat tool | user_provided |
| `api` | Created via REST API | user_provided |

### Waterfall Priority
The winning value for each field is chosen by source priority (highest first), then confidence, then recency.

**Default priority order:**
1. **manual** — User explicitly set this value (always wins)
2. **contactout** — Verified vendor data
3. **web_search** — AI web enrichment
4. **csv_upload** — CSV import
5. **linkedin** — LinkedIn import
6. **chat** — AI chat tool
7. **api** — API-created

### Configuring the Waterfall
The waterfall priority is configurable per workspace:

1. Go to **Settings tab** (gear icon) → **Data Sources & Waterfall** section
2. View which enrichment providers are active (green = configured, gray = not available)
3. Reorder the priority list using the up/down arrows
4. Click **Save Priority** to persist

**API:**
```
PUT /api/workspaces/:slug/waterfall
{ "priority": ["manual", "contactout", "web_search", "csv_upload", "linkedin", "chat", "api"] }
```

**How it interacts with enrichment:** When you run a master enrichment (default), only providers that are AVAILABLE for your account are called. If you don't have a ContactOut API key, contactout is skipped — even if it's high in your waterfall. The waterfall only affects which values win when multiple sources have data for the same field.

### Confidence Levels
| Level | Score | Meaning |
|-------|-------|---------|
| verified | 4 | Confirmed by verified source (e.g., ContactOut) |
| user_provided | 3 | User directly entered or uploaded |
| inferred | 2 | AI-inferred from web search |
| unknown | 1 | Source unknown |

### Source Visibility
In the UI, fields with multiple sources show a small indicator badge (e.g., "3" with a database icon). Clicking it opens a popover showing all source records for that field, with the winning value highlighted. Users can "pin" a non-winning value by clicking "Use this value" — this creates a `manual` source entry (highest priority).

## Normalization & Validation Reference

Rally normalizes field values at write-time. Both the raw and normalized values are stored in source records. Normalization ensures consistent matching and deduplication.

### Field Normalization Rules

| Field | Normalization | Example |
|-------|--------------|---------|
| **company_name** | Strip suffixes (LLC, Inc, Corp, Ltd, Co, GmbH, etc.), trim, title-case | "Goodbuy LLC" → "Goodbuy" |
| **email** | Lowercase, trim, strip `mailto:` | "JOHN@Acme.COM" → "john@acme.com" |
| **phone** | Strip non-digits except leading `+`, US 10-digit → E.164 | "(415) 555-1234" → "+14155551234" |
| **linkedin_url** | Lowercase, ensure `https://`, strip query params & trailing slashes | "http://LinkedIn.com/in/johndoe/" → "https://linkedin.com/in/johndoe" |
| **domain** | Lowercase, strip `www.`, strip protocol & trailing slashes | "https://www.Acme.com/" → "acme.com" |
| **full_name** / **first_name** / **last_name** | Trim, title-case, strip honorifics (Mr., Dr., etc.) and suffix titles | "Dr. John Smith Jr." → "John Smith" |
| **title** | Trim, title-case, strip "at Company" / "- Company" suffixes | "Senior Engineer at Google" → "Senior Engineer" |
| **headline** | Trim only — headlines are intentionally verbose | "CEO & Founder \| Building the future" → kept as-is |
| **location** | Trim, standardize US state names to abbreviations | "San Francisco, California" → "San Francisco, CA" |
| **website** | Same as domain | |
| **industry** / **employee_count** / other | Stored as-is (string coercion) | |

### Title vs Headline
- **title**: Short, clean role name. Stripped of company names. Normalized via title-case. e.g., "Senior Software Engineer"
- **headline**: Full LinkedIn-style tagline. Kept verbose. e.g., "CEO & Founder | Building the future of CRM at Acme Corp". Good for context and search, not for display as a clean label.

### Deduplication
- **Contacts**: Dedup key = `email|linkedin_url` (both normalized)
- **Companies**: Dedup key = `domain` (normalized) or `name` (lowercased) if no domain

### Validation
- Contact requires at least one of: full_name, email, linkedin_url
- Company requires: name
- Email format validated (must contain @)
- Phone must have at least 7 digits
- All values trimmed of whitespace

## Rally Web Code (Browser Terminal)

Rally Web Code brings the terminal experience to the browser — no CLI installation needed. It's a full-page, chat-first interface styled like a real terminal (black background, monospace text, minimal chrome).

### Activating Web Code
- **URL param**: Visit `rally.producthacker.ai?code=true` — instant session activation
- **Settings**: Toggle ON in Settings tab → Rally Web Code section (persists)
- **Exit**: Click "Open full CRM" button in header to return to standard layout

### How It Works
When Web Code is active:
- Sidebar is hidden — everything happens through the chat
- Terminal-style dark theme with monospace font
- Input prompt shows current workspace: `rally/workspace-name >`
- Slash command suggestions: `/pipeline`, `/contacts`, `/add`, `/enrich`, `/score`, `/brief`
- All the same AI agent capabilities — contacts, enrichment, plays, email, calendar, lists

### Quick Commands
| Command | What it does |
|---------|-------------|
| `/pipeline` | Show your deal pipeline |
| `/contacts` | Search your contacts |
| `/add` | Add a new contact |
| `/enrich` | Enrich contacts with web data |
| `/score` | Score your pipeline |
| `/brief` | Get your daily briefing |

Or just type anything in plain English — the AI agent handles it.

### When to Use Web Code vs Standard CRM
- **Web Code**: Fast, keyboard-driven workflows. Great for power users who prefer typing over clicking.
- **Standard CRM**: Visual pipeline views, drag-and-drop, spreadsheet-style lists, calendar UI.

## Rally PE Mode (Private Equity Deal Sourcing)

### Overview
PE mode transforms Rally into a private equity deal sourcing and target evaluation workspace. It adds thesis-driven pipeline stages, PE-specific AI plays, a deal-focused scoring profile, and model-based enrichment tools with confidence and evidence tracing.

### PE Pipeline Stages
| Stage | Description |
|-------|-------------|
| Universe | Broad screening — all companies that match sector filters |
| Screening | Passed initial filter, need deeper evaluation |
| Target | Actively evaluating — strong thesis fit |
| Outreach | Reaching out to management team |
| Due Diligence | In DD process — financials, legal, commercial review |
| LOI | Letter of Intent stage |
| Closing | Deal in closing process |
| Acquired | Deal closed — company acquired |
| Passed | Evaluated and passed — with reason tracked |

### PE Relationship Types
target_ceo, target_cfo, operator, advisor, lp, banker, lawyer, competitor

### PE Plays
| Play | Description | Trigger |
|------|-------------|---------|
| Thesis Screener | Score companies against investment thesis | "Screen my targets" |
| Target Deep Dive | Full enrichment + competitive landscape + key people | "Deep dive on [company]" |
| Deal Pipeline Review | Pipeline snapshot with stage distribution + stale targets | "Deal pipeline review" |
| Operator Finder | Find CEO/CFO/CTO for a target company | "Find the CEO of [company]" |
| Comp Table Builder | Build comparable company list with metrics | "Build comp table for [company]" |
| DD Checklist | Generate due diligence checklist for a target | "DD checklist for [company]" |

### PE Slash Commands
| Command | What it does |
|---------|-------------|
| `/screen [sector]` | Screen companies against investment thesis |
| `/deep-dive [company]` | Full target analysis |
| `/comp-table [company]` | Build comparable company list |
| `/dd [company]` | Due diligence checklist |
| `/operators [company]` | Find key management team |
| `/pipeline` | Deal flow pipeline review |
| `/thesis` | Show/update investment thesis |
| `/risk-score [company]` | AI-powered 6-dimension risk assessment with confidence score |
| `/propensity-to-sell [company]` | AI analysis of founder/company readiness to sell |

### PE Scoring Profile (pe-sourcing)
Free heuristic scoring optimized for deal sourcing:
- **Thesis Fit / Title Seniority** (20 each) — CEO/CFO/founder get max score
- **Pipeline Stage** (20) — targets in DD/LOI score highest
- **Deal Value** (15) — larger deals rank higher
- **Completeness** (15) — more data = better evaluated
- **Industry Match** (10) — matches fund's sector focus
- **Engagement** (10) — notes, enrichment, tags signal active evaluation
- **Keyword boosts**: +8 for deal signals (acquisition, exit, ARR, EBITDA), -5 for risk flags (declining, layoff, lawsuit)

### Model-Based Enrichment (PE Tools)
Two AI tools that perform web-search-powered analysis and save results with full model trace:

**pe_risk_score** — Assesses investment risk across 6 dimensions:
- Financial Risk (declining revenue, burn rate, down rounds)
- Market Risk (shrinking TAM, commoditization, disruptive competitors)
- Team Risk (key person departures, Glassdoor red flags)
- Customer Risk (concentration, churn, negative reviews)
- Legal/Regulatory Risk (lawsuits, compliance gaps)
- Operational Risk (declining headcount, tech debt)
- Returns: overall risk level, score (0-1), confidence (0-1), recommendation, per-dimension breakdown

**pe_propensity_to_sell** — Estimates likelihood of exit:
- Founder Life Stage (age, years at company, previous exits)
- Company Maturity (years since founding, growth trajectory)
- Funding Timeline (time since last round, VC fund lifecycle pressure)
- Market Timing (sector M&A activity, comparable exits)
- Operational Signals (CFO hire, banker engagement, board changes)
- Personal Signals (CEO delegation, fewer conferences, legacy talk)
- Returns: propensity score (0-1), label, timeframe estimate, approach strategy

### Model Trace / Provenance
All model-based enrichments are saved to `source_records` with metadata:
- **model_id** — which model produced the prediction (e.g., `pe_risk_score_v1`)
- **confidence_score** — 0.0-1.0 model confidence
- **reasoning** — why the model made this prediction
- **evidence** — specific data points that informed it

View model trace in the UI: click any field's source badge to see all sources including model predictions with confidence percentages (color-coded green/amber/red), reasoning text, and evidence.

### Investment Thesis
The fund's investment thesis is stored in the **Context tab** (Brain icon) under workspace strategy. The AI agent references it when screening targets, scoring contacts, and evaluating thesis fit. Fields include: sector focus, geographic focus, revenue range, deal size range, growth profile, margin profile, ideal attributes, and dealbreakers.

## Co-Op Mode

### Overview
Shared workspaces can enable **Co-Op Mode** to contribute and consume data from a shared Rally DB backbone. When enabled, CRM writes are synced to a central Rally DB, and enrichment can pull from data contributed by other workspaces.

### Toggle
Co-op mode is controlled per shared workspace via the **Settings tab** (gear icon) → Rally Co-op section. The `product-hacker` workspace has co-op enabled by default.

### Privacy
- Workspace names are NEVER shared between co-op participants
- Only resolved profile data is shared (no internal IDs, notes, or deal values)
- Contributing workspaces are tracked internally for attribution but not exposed to consumers
