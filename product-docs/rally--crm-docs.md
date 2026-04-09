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

<!-- AUTO:TOOLS_START -->
## Available Tools (auto-generated)

*110 tools across 25 plugins. Generated 2026-03-25.*

### Alerts Tools (alerts-tools)
- **crm_check_alerts** — Fetch the user's recent notifications and activity alerts. Shows unread mentions, broadcasts, blog posts, and CRM activity. Use when the user says "/alerts", "what did I miss", "any notifications", "w

### Calendar Tools (calendar-tools)
- **calendar_list_events** — List events from the user's Google Calendar. Defaults to the next 7 days. Returns event summaries, times, attendees, and links.
- **calendar_get_event** — Get detailed information about a single calendar event by its ID.
- **calendar_create_event** — Create a new Google Calendar event. Can add CRM contacts as attendees by resolving their email addresses. Logs an interaction for linked CRM contacts.
- **calendar_update_event** — Update an existing calendar event. Can modify title, time, description, location, or attendees.
- **calendar_delete_event** — Delete (cancel) a calendar event. Sends cancellation notifications to attendees.
- **calendar_suggest_blocks** — Analyze the user's calendar and CRM pipeline to suggest time blocks for the day. Returns existing events, free slots, and AI-suggested activities (meetings, focus time, follow-ups). Use when the user 

### Compound Tools (compound-tools)
- **crm_batch_create_tasks** — Create multiple tasks in a single call. Each task gets a unique sequential ID. Optionally link all tasks to a goal.
- **crm_create_goal_with_tasks** — Create a goal with tasks and optional documents in a single call. This is the recommended way to set up new initiatives — avoids orphan goals and partial failures. All entities are created atomically.
- **crm_setup_workspace** — Initialize or configure a workspace with strategy, goals, and tasks in one call. Use this for onboarding new workspaces or reconfiguring existing ones. Sets workspace strategy/context, creates initial

### ContactOut Enrichment (contactout-tools)
- **crm_contactout_enrich** — Enrich an existing CRM contact with verified emails and phone numbers from ContactOut. Use when the user asks for "verified email", "real email", "ContactOut lookup", or when web search enrichment did
- **crm_contactout_decision_makers** — Find decision makers at a company by domain using ContactOut. Use when the user asks "who are the decision makers at X", "find the CTO at X", "key people at X". Max 50 results per call. Costs credits.

### Context Tools (context-tools)
- **crm_get_my_profile** — Read the current user's business profile and personal context. Returns company name, industry, sales style, strengths, weaknesses, and other business info the user has shared. Use this when the user a
- **crm_update_my_profile** — Save or update the user's business profile. Merge-updates fields — only specified fields are changed. Use this proactively when the user shares business information about themselves (company, industry
- **crm_get_context** — Read the current workspace's context — ICP, sales process, competitive advantages, playbooks, strategy, etc. For shared workspaces, this is team-level context visible on the Context tab. Use when the 
- **crm_update_context** — Update the workspace context. Merge-updates fields — only specified fields are changed. Use when the user shares context like ICP, sales process, competitive advantages, playbooks, or any freeform not
- **crm_get_branding** — Read the agent/workspace branding profile — logo, headshot, brokerage info, license, bio, tagline, testimonials, awards, service areas, social links, and Rally Pages config. Use when the user asks abo
- **crm_update_branding** — Update the agent/workspace branding profile. Merge-updates — only specified fields are changed. Use when the user shares branding info: bio, tagline, headshot, brokerage details, testimonials, awards,

### Rally CRM Tools (crm-tools)
- **crm_create_contact** — Create a new CRM contact. Use when the user mentions adding a person to the CRM, or pastes contact details. IMPORTANT: Include ALL known fields — title, companyName, email, etc. If you found data via 
- **crm_create_company** — Create a new CRM company record. Use when the user mentions adding a company or organization.
- **crm_list_contacts** — Search and list CRM contacts. The system prompt only shows a small sample — ALWAYS use this tool when the user asks about specific contacts, asks "how many", asks to find someone, or needs a complete 
- **crm_list_companies** — Search and list CRM companies. The system prompt only shows a small sample — ALWAYS use this tool when the user asks about specific companies or needs a complete view. Supports search across ALL compa
- **crm_update_contact** — Update a CRM contact. Use when the user wants to change a contact's stage, add notes, update deal value, etc. IMPORTANT: Also use this tool to save any enrichment data you find via web search — always
- **crm_update_company** — Update a CRM company record.
- **crm_enrich_contact** — Enrich a CRM contact via web search. Looks up the person online and fills in missing data (title, company, LinkedIn, etc.). Use when the user says "enrich", "look up", or "find info about" a contact.
- **crm_enrich_company** — Enrich a CRM company via web search. Looks up company data online (industry, size, domain, funding, etc.).
- **crm_enrich_company_by_domain** — Look up a company by domain name, create it if it doesn't exist, and enrich it via web search. Use when the user gives you a company domain or website URL and wants company data. Returns fully enriche
- **crm_submit_feature_request** — Submit a feature request for Rally. Use when the user asks for a new feature, suggests an improvement, or says "I wish it could..." or "Can you add...".
- **crm_import_url** — Import a contact from a LinkedIn URL or website. Parses the URL to extract name, company, title, and creates a contact record. Use when the user pastes a LinkedIn URL. IMPORTANT: If you already know t
- **crm_trace** — Show the full provenance/source history of a contact or company. Displays which sources contributed data for each field, which value "won" via waterfall resolution, and all alternate values. Use when 
- **crm_company_sync** — Sync companies for all contacts that have a company_name but no linked company record. Creates missing companies and links them. Use when the user asks to sync companies, create missing companies, or 
- **crm_set_always_on** — Star/favorite a contact or company so they appear in every briefing and standup. Use when users say "star", "favorite", "VIP", "always tell me about", "mark as important".
- **crm_archive_contact** — Archive (soft-delete) a contact or company to hide it from all views, standups, and briefings. The record is NOT deleted — it can be unarchived later. Use when users say "archive", "hide", "remove fro
- **crm_score_contacts** — Score contacts using the FREE heuristic algorithm (no LLM cost). Supports configurable scoring profiles for different use cases.

Built-in profiles:
- "default" — Balanced: completeness + pipeline + d

### Deal Pipeline Tools (deal-tools)
- **crm_create_deal** — Submit a new deal to the pipeline. Starts at "inbound" stage.
- **crm_list_deals** — List deals in the pipeline. Optionally filter by stage.
- **crm_update_deal** — Update a deal. Use action "advance" to move to next stage, "pass" to reject, or "backburner" to put on hold.

### Document Tools (document-tools)
- **crm_create_document** — Create a new markdown document. Optionally link to an entity (contact, company, deal, goal).
- **crm_list_documents** — List documents for the current workspace. Optionally filter by linked entity.
- **crm_get_document** — Get a document with its full content by ID.

### Activity Dump (dump-tools)
- **crm_activity_dump** — Parse an unstructured activity update and apply CRM changes automatically. Use this when the user gives a casual update like "Had coffee with Sarah from TechCorp, talked about their Series A" or "Emai

### Email Tools (email-tools)
- **email_check_domain** — Check a domain's email infrastructure — MX records, SPF/DKIM/DMARC, provider detection (including security gateway + underlying mailbox), catch-all status, deliverability score, and full marketing int
- **email_validate_address** — Validate an email address — checks syntax, domain MX records, disposable domain status, role-based detection, provider intelligence, and generates a full deliverability report with marketing tips. Use

### Feed Tools (feed-tools)
- **crm_get_activities** — Fetch personalized local activity and event suggestions for the user based on their location and preferences. Returns cached suggestions (refreshed weekly). Use when the user says "/activities", "what
- **crm_get_updates** — Fetch curated trending content recommendations (articles, podcasts, videos, tools) personalized to the user. Returns cached suggestions (refreshed weekly). Use when the user says "/updates", "what's t

### Gmail Tools (gmail-tools)
- **gmail_search** — Search the user's Gmail inbox using Gmail query syntax (e.g. "from:john subject:proposal", "is:unread newer_than:7d"). Returns message metadata without full body.
- **gmail_get_email** — Read the full content of a specific email by its message ID. Returns headers, body text, and labels.
- **gmail_extract_contacts** — Scan recent emails to find unique contacts the user has been emailing. Returns deduplicated list sorted by frequency. Filters out the user's own email. Use when the user asks "who have I been emailing
- **gmail_find_emails_for_contact** — Find emails related to a CRM contact. Looks up the contact's email/name from the CRM, then searches Gmail for matching messages.
- **gmail_lookup_email** — Find someone's email address by searching Gmail for messages they sent or received. Use this when a CRM contact has no email, or when the user asks to email someone and you don't have their address. O
- **gmail_send_email** — Send an email from the user's connected Gmail account. Can send new emails or reply to existing threads. Auto-creates a CRM contact for the recipient if one doesn't exist. IMPORTANT: Always show the u

### Goal Tools (goal-tools)
- **crm_list_goals** — List goals/initiatives for the current workspace. Optionally filter by status.
- **crm_update_goal** — Update an existing goal. Use this to change status, priority, description, or target date.
- **get_referenced_content** — Get the content of a referenced entity (doc, goal, list, contact, company). Returns markdown for docs/goals, CSV for lists, summary for contacts/companies.
- **crm_create_goal** — Create a new goal/initiative.

### Artifact List Tools (list-tools)
- **crm_get_list** — Retrieve a saved artifact list by ID to view its contents or prepare updates. Use when the user references a specific list or asks to see/modify list data.
- **crm_create_list** — Create a spreadsheet-style artifact list. Use when the user asks for a list, table, report, or "artifact". Returns a saved list that the user can view, filter, and edit in the Lists tab.

IMPORTANT: R
- **crm_update_list_rows** — Update rows in an existing artifact list. Use when the user asks to modify, add to, or update data in a saved list.

Use cases:
- "Update contact fields from CRM" — re-fetch CRM data and update matchi
- **crm_enrich_list_rows** — Enrich rows in a saved artifact list. Uses the same enrichment services available elsewhere in the CRM (web search, CRM contact/company enrichment, Gmail lookup).

Use when the user asks to:
- "Enrich
- **crm_search_lists** — Search and browse saved artifact lists. Use when the user asks "show my lists", "what lists do I have", "my most recent list", "find the list about X", etc. Returns list metadata (not full row data — 

### Meeting Notes Tools (meeting-notes-tools)
- **crm_create_meeting_note** — Create a meeting note linked to a company and/or contacts. Use after a call or meeting to capture notes, action items, and context. Can also be used to save pasted transcripts.
- **crm_list_meeting_notes** — List meeting notes. Filter by company, contact, or event. Returns notes sorted by event date (most recent first).
- **crm_get_meeting_note** — Get a meeting note with full content by ID.
- **crm_update_meeting_note** — Update a meeting note — add content, change company/contact links, add summary.
- **crm_sync_calendar_companies** — Scan recent and upcoming calendar events, find attendee emails with business domains, and ensure contacts and companies exist in the CRM. Creates missing contacts/companies and links them. Returns a s

### Workspace Member Management (member-tools)
- **crm_list_members** — List all members of the current workspace with their roles and join dates.
- **crm_get_member** — Get details for a specific workspace member by user ID or email.
- **crm_add_member** — Add a new member to the current workspace. Requires owner role.
- **crm_update_member_role** — Change a workspace member's role. Requires owner role.
- **crm_remove_member** — Remove a member from the current workspace. Requires owner role. Cannot remove the last owner.

### Network Updates Tools (network-tools)
- **crm_network_updates** — Generate a summary of recent network activity — recent emails and upcoming calendar events involving the user's top CRM contacts. Returns per-contact updates and an AI-synthesized summary. Use when th

### Rally PE Deal Sourcing Tools (pe-tools)
- **pe_risk_score** — Assess investment risk for a target company. Searches the web for risk signals (declining headcount, lawsuits, negative news, customer concentration, key person risk, regulatory exposure) and returns 
- **pe_propensity_to_sell** — Estimate how likely a company or founder is to sell. Analyzes CEO age/career stage, company maturity, funding timeline, investor pressure, market timing, and personal signals. Returns a propensity sco

### Rally Real Estate Tools (realestate-tools)
- **re_create_listing** — Create a new property listing. Use when the user says "add a listing", "new listing at", "list this property", or provides property details like address + price.
- **re_list_listings** — Search and filter property listings. Use when the user asks "show me my listings", "active listings", "what's pending", "listings in [area]", or wants a listings overview.
- **re_get_listing** — Get full details for a specific listing by ID. Use when discussing a specific property.
- **re_update_listing** — Update a listing — change price, status, dates, details, or add notes. Use for "price reduction", "mark as pending", "update closing date", etc.
- **re_create_target** — Create a target property to watch for changes. Use when the user says "watch this property", "alert me if anything happens at", "set up alerts for", "track this address".
- **re_list_targets** — List all watched target properties and their alert status. Use when user asks "what am I watching?", "my target properties", "saved searches".
- **re_check_alerts** — Check for property alerts — price changes, status changes, new listings matching criteria. Use when user asks "any alerts?", "what changed?", "new activity?".
- **re_set_always_on** — Mark a contact as "always-on" — they'll be mentioned in every briefing and alert. Use for VIP clients, key referral sources, and active deal parties. Use when user says "always tell me about [name]", 

### Recurring Tools (recurring-tools)
- **recurring_create** — Create a new recurring item (habit, routine, or recurring task). Returns the created task.
- **recurring_list** — List recurring items with progress and streak information. Use filter "due_today" to see only items due now, or "all" for everything.
- **recurring_complete** — Mark a recurring item as complete for the current period. Appends a completion timestamp.
- **recurring_update** — Update a recurring item's schedule or title. Only specified fields are changed.

### Public Share Link Tools (share-tools)
- **crm_create_share_link** — Create a public share link for a CRM entity (contact, company, list, or pipeline). Returns a URL that anyone can view without signing in. Links expire after 30 days by default.
- **crm_list_share_links** — List all active public share links for the current workspace.
- **crm_revoke_share_link** — Revoke (deactivate) a public share link so it can no longer be accessed.

### SMS & iMessage Tools (sms-tools)
- **sms_search_messages** — Search imported SMS and iMessage conversations. Use this when the user asks about text messages, SMS history, or iMessage conversations with a contact. Supports searching by text content, contact ID, 
- **sms_get_conversation** — Get a summary of the SMS/iMessage conversation with a specific CRM contact. Shows message count, first/last message dates, inbound vs outbound breakdown, and the 20 most recent messages. Use this when
- **sms_log_interaction** — Log an SMS or iMessage interaction for a CRM contact. Use this when the user pastes a text conversation or tells you about a text exchange they had. Creates an interaction record attached to the conta
- **sms_import_stats** — Get statistics about imported SMS/iMessage data for this workspace. Shows total messages, how many are linked to CRM contacts, and unique conversation count. Use this when the user asks about their me

### Task Tools (task-tools)
- **crm_create_task** — Create a one-time task. For recurring habits/routines, use recurring_create instead.
- **crm_list_tasks** — List one-time tasks. Excludes recurring items. Optionally filter by status or linked goal.
- **crm_update_task** — Update a one-time task. Set status to "done" to complete it.

### Tribe Calendar Tools (tribe-calendar-tools)
- **tribe_create_events** — Create one or more events on the workspace shared calendar. Use this when users paste screenshots of schedules, text from emails, or describe events to add. Parse ALL events from the input — extract d
- **tribe_list_events** — List events from the workspace shared calendar. Shows upcoming events by default.
- **tribe_update_event** — Update an existing workspace calendar event — change time, title, description, location, volunteer status, etc.
- **tribe_claim_event** — Claim/volunteer for a workspace calendar event. The current user signs up for the event.
- **tribe_unclaim_event** — Remove yourself from a claimed/volunteered event.

### Rally Venture Deal Sourcing Tools (venture-tools)
- **vc_scan_signals** — Scan the WEB (not Twitter/X) for venture-relevant founding signals in a sector or theme. Searches news sites, Crunchbase, ProductHunt, LinkedIn, job boards, patent databases, and accelerator announcem
- **vc_evaluate_company** — Quick screen evaluation of a company for venture investment. Generates thesis fit score, market size estimate, competitive position, founder assessment, and red flags. Use when user says "/evaluate [c
- **vc_founder_research** — Deep research on a founder — career history, previous companies/exits, domain expertise, network, public presence, and what people say about them. Use when user says "/founder [name]", "research found
- **vc_generate_memo** — Draft a structured investment memo for partner review. Covers company overview, market opportunity, product, business model, traction, team, competition, risks, deal terms, and recommendation. Use whe
- **vc_market_landscape** — Map the competitive landscape for a sector — key players, funding levels, market dynamics, recent M&A, technology trends, and white space opportunities. Use when user says "/landscape [sector]", "map 
- **vc_portfolio_pulse** — Check on portfolio companies for recent news, hiring signals, traction indicators, and network intel. Also surfaces any signals from portfolio founder networks about new founders or companies. Use whe
- **vc_thesis_score** — Score a company against the fund's investment thesis. Returns a structured scorecard with dimension-level scores (thesis fit, founder quality, market timing, signal strength, network proximity) and ov
- **vc_partner_promotion** — Analyst-to-partner promotion workflow. Takes a company (found by analyst, signal, or direct) and produces a full partner-ready package: deep research report, standardized proposal document, and a draf
- **vc_x_signal_scan** — Scan TWITTER/X SPECIFICALLY for investment-relevant tweets, threads, and people. Only use this when the user explicitly mentions Twitter or X. For general signal scanning ("scan for signals", "run sig
- **vc_track_signal** — Log a signal or tip from a network contact. Captures the source, signal description, strength assessment, and suggested follow-up. Creates or updates contacts/companies as needed. Use when user says "

### Scoring Profiles
- **enterprise-sales** — Enterprise Sales
- **startup-outbound** — Startup Outbound
- **relationship-focused** — Relationship-Focused
- **pe-sourcing** — PE Deal Sourcing
- **real-estate** — Real Estate Agent

### Modes
- **work** (GTM) — 2 stages, 6 plays
- **personal** (Personal) — 2 stages, 4 plays
- **network** (Network) — 2 stages, 5 plays
- **tribe** (Tribe) — 2 stages, 4 plays
- **pe** (PE) — 2 stages, 6 plays
- **salesops** (SalesOps) — 2 stages, 6 plays
- **roadmap** (Roadmap) — 2 stages, 6 plays
- **realEstate** (Real Estate) — 2 stages, 8 plays
- **crumble** () — 2 stages, 6 plays
- **ninetyNineProof** (99C) — 2 stages, 6 plays
- **venture** (Venture) — 2 stages, 9 plays

<!-- AUTO:TOOLS_END -->
