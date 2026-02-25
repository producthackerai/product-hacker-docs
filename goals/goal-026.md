# Rally Headless Agent & Distribution Channels

**Status:** in_progress
**Progress:** 20%

## Vision

Rally's AI agent should work for you even when you're not looking at the app. Like Boardy (the AI networking agent that operates autonomously at events), Rally's headless agent proactively surfaces stale deals, hot prospects, pipeline bottlenecks, and action items — then delivers them through whatever channel you prefer: web dashboard, CLI, Telegram, email, SMS, or Slack.

## What's Built (Phase 1 — Complete)

### Standup Generation Engine (`standupService.js`)
Pure data analysis — no LLM calls needed. Analyzes CRM data and produces structured JSON:
- **Pipeline stats**: Stage aggregation with counts, values, sample contacts
- **Stale deals**: 7-day warning, 14-day critical, with suggested actions
- **Hot prospects**: High score (>=70), advanced stages, high deal value (>=100K)
- **Recent outcomes**: Wins/losses in last 7 days
- **Action items**: Structured with priority, type, description, and `agentPrompt` for one-click delegation
- **Insights**: Bottleneck detection, data quality warnings, stale ratio health, company coverage gaps
- **Summary line**: e.g. "42 active deals · $1.2M in pipeline · 3 gone dark · 5 hot"

### API Endpoint
- `GET /rally/standup?workspace=<slug>` — Returns full standup JSON
- Accessible to all roles including `demo_viewer`
- Resolves workspace mode from settings

### Dashboard Widget (Agent Briefing)
- Collapsible card on HomeTab between stats row and two-column layout
- Action items with priority badges and "Let Agent Handle This" buttons
- "Let Agent Handle This" sends `agentPrompt` directly to chat — one-click delegation
- Insights with type icons (bottleneck, health warning, data quality, opportunity)
- Hot prospects with score badges and reasons
- Responsive mobile design

### CLI Command
- `/rallyping <workspace>` — Workspace status check including co-op, sharing, data counts

## What's Next (Phase 2 — Non-Web Distribution)

### Telegram Bot (Recommended First Channel)
- **Cost**: $0 API cost — only hosting + AI inference
- **Effort**: 1-2 days for basic bot, 3-5 days polished
- **Architecture**: Webhook mode, grammY library, inline keyboards for actions
- **Features**: Morning standup delivery, "Handle This" inline buttons, slash commands
- See `strategy/RALLY_DISTRIBUTION_CHANNELS.md` for full cost analysis

### Scheduled Delivery (Cron)
- Morning standup at user-configured time
- Stale deal alerts (immediate when deal goes critical)
- Weekly pipeline recap
- Configurable per-workspace in settings

### Email Digest
- **Cost**: ~$0.0001/email via AWS SES
- **Effort**: 1-2 days
- HTML-formatted standup with action links back to Rally web
- Daily or weekly frequency, user-configurable

## Phase 3 — Advanced Channels
- Slack app integration
- SMS alerts for critical items (Twilio, ~$0.011/msg)
- Voice briefings (Twilio, ~$0.014/min)
- WhatsApp (complex setup, deferred)

## Phase 4 — Autonomous Actions
- Agent auto-drafts follow-up emails for stale deals
- Auto-sends pipeline snapshot to workspace Slack channel
- Scheduled enrichment runs on new contacts
- Auto-stage-progression detection and notification

## Key Files
- `rally/backend/services/standupService.js` — Core engine
- `rally/backend/routes/rally.js` — `/rally/standup` endpoint
- `rally/src/components/HomeTab.jsx` — Dashboard widget
- `rally/src/styles/HomeTab.css` — Widget styles
- `rally/cli/src/commands/slash.js` — `/rallyping` command
