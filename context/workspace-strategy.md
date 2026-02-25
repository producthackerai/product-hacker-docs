# Workspace Strategy: product-hacker

## Elevator Pitch

A SaaS platform that builds itself from user feedback using autonomous AI agents. Users submit feature requests, AI evaluates, builds, tests, and deploys — automatically. Product Hacker is the parent company; TaskCrush, Solo CRM, BlankSlate, PeanutButter, Data Services, and Tribe are the apps in the ecosystem.

## Playbooks

Hypothesis-Driven Development:
- H1: Users submit feature requests (50+ in 30 days) - track via BlankSlate
- H2: AI ships features autonomously 60%+ - track via tc_build_events
- H3: Build-in-public drives LinkedIn reach - track impressions
- H4: Transparency beats AI hype for trust
- H5: Experiment generates consulting inbound
- H6: User feedback improves AI output quality
- H7: Multi-app spawning is differentiator
- H8: Auto-generated content sustains cadence

Content Playbook:
- Auto-generate LinkedIn posts from deploy events
- Weekly "What the AI built" summary
- Paired blog posts: "The Botz" (auto) + "The Humanz" (draft)
- Screenshot/video automation for visual proof

Apps Ecosystem:
- Product Hacker (parent platform): producthacker.ai
- TaskCrush (task/goal management): taskcrush.producthacker.ai
- Solo CRM (AI-first CRM): crm.producthacker.ai
- BlankSlate (public feature board): blankslate.producthacker.ai
- Data Services (API platform): data.producthacker.ai
- PeanutButter (workout tracker): pb.producthacker.ai
- Tribe (family coordination): tribe.producthacker.ai

## Raw Context

## Company Overview
Product Hacker is an AI-first SaaS platform company founded by Cam Fortin (CEO/Product) and Jody Roberts (CTO/Technical). We build apps that build themselves from user feedback using autonomous AI agents.

## Team
- **Cam Fortin** — CEO/Product. Handles strategy, AI architecture, LinkedIn content, consulting sales. Primary contact. LinkedIn: linkedin.com/in/camfortin/
- **Jody Roberts** — CTO/Technical. Building Railway auto-deploy pipeline, HiveForge deployment system, core infrastructure. LinkedIn: linkedin.com/in/jody-roberts/
- **Claude** — AI agent team member. Handles code tasks, docs, content drafts, analysis. Runs autonomously via Claude Code skills.
- **OpenClaw** — Automated Telegram bot for team coordination.

## App Ecosystem (7 apps, all live)
1. **Product Hacker** (producthacker.ai) — Parent platform. Dashboard, AI chat, task/goal management, admin tools, plugin system, onboarding. Repo: producthackerai/product-hacker
2. **TaskCrush** (taskcrush.producthacker.ai) — Standalone task & goal management. Extracted from Product Hacker. Repo: producthackerai/task-crush
3. **Solo CRM** (crm.producthacker.ai) — AI-first CRM for solo entrepreneurs. Revenue Agent chat, contact management, pipeline, plays. Repo: producthackerai/crm
4. **BlankSlate** (blankslate.producthacker.ai) — Public feature request board. Users submit requests → AI evaluates → triage → build → review → deploy. The core proof-of-concept. Repo: producthackerai/blankslate
5. **Data Services** (data.producthacker.ai) — API platform for data enrichment and services. Repo: producthackerai/data-services
6. **PeanutButter** (pb.producthacker.ai) — Pull-ups & Burpees workout timer. Simple wellness app. Repo: producthackerai/peanutbutter
7. **Tribe** (tribe.producthacker.ai) — Family & group coordination app. Calendar, tasks, members, AI chat. Repo: producthackerai/tribe

## Revenue Model
- **Consulting bridge revenue**: AI consulting and dev services, typical deal $20K, 1-month cycle
- **SaaS pricing** (planned): Completion-based pricing with tiers: Micro ($0.15), Small ($0.60), Medium ($2.40), Large ($7.50), XL ($24). Guarantee mode: users only pay for successful completions.
- **Agent Purchase API** (vision): AI agents with buy budgets can programmatically discover, estimate, and purchase dev services.

## Key Infrastructure
- **Supabase**: All apps share one Supabase instance (project ref: tdjyqykkngyflqkjuzai). All tables use tc_ prefix.
- **Railway**: App deployment platform. Auto-deploy pipeline being built by Jody.
- **Tao Data** (taodata.ai): AI evaluation system. Rates all prompts and interactions for quality.
- **HiveForge** (hiveforge.dev): Deployment orchestration.
- **BlankSlate Pipeline**: Submit → Tao Eval → Triage Classifier → Route by Complexity → Build → Review → Ship. Fully autonomous for tiny/small features.

## Brand Architecture
Product Hacker (parent platform) > Only Users (consumer framework brand concept) > TaskCrush (showcase app / training data generator)

## Strategic Hypotheses (Lean Startup)
H1: Users submit feature requests (50+ in 30 days) - HIGH RISK
H2: AI ships features autonomously 60%+ - HIGH RISK
H3: Build-in-public drives LinkedIn reach - MEDIUM RISK
H4: Transparency beats AI hype for trust - LOW RISK
H5: Experiment generates consulting inbound - MEDIUM RISK
H6: User feedback improves AI output - MEDIUM RISK
H7: Multi-app spawning is differentiator - HIGH RISK
H8: Auto-generated content sustains cadence - LOW RISK

## Current Status (Feb 2026)
- Pre-revenue, in public beta
- 7 apps live and running
- Autonomous build pipeline working for small features
- BlankSlate public board accepting submissions
- Cross-app feedback system just implemented (all apps → tc_feature_requests → Product Hacker workspace)
- LinkedIn build-in-public content in progress
- Consulting pipeline warm but no closed deals yet


[Product Positioning & Monetization Strategy - Feb 25, 2026]

## GOAL: Launch TaskCrush Pro ($29/month) with AI-Improvement Positioning

**Target**: Q1 2026 launch of TaskCrush Pro subscription model
**Focus Persona**: Solo entrepreneurs ($50K-500K revenue)
**Key Positioning**: "TaskCrush: The only task manager that learns from how YOU work"

### NOW PHASE PRIORITIES:
1. **Prove the Magic** - Document every AI improvement with before/after screenshots
2. **Freemium to Pro** - TaskCrush free tier → $29/month Pro (unlimited AI improvements)
3. **BlankSlate Validation** - Target: 50 feature requests submitted in 30 days
4. **Trust Through Transparency** - Show real deploys, not just promises
5. **Content Strategy** - Auto-generate posts from actual AI builds

### MONETIZATION TIERS DEFINED:
- TaskCrush Starter ($0) - Core features, 5 AI improvements/month
- TaskCrush Pro ($29/month) - Unlimited AI improvements, priority requests
- Product Hacker Platform ($79/month) - Multi-app ecosystem
- Team Platform ($299/month) - Team collaboration features
- Enterprise ($999/month) - Custom deployment and integrations

### PERSONAS PRIORITIZED:
1. **Solo Entrepreneurs** (90% confidence) - $29-79/month WTP, massive pent-up demand
2. **AI Consulting Bridge** (80% confidence) - $20K engagements while building SaaS MRR
3. **AI Company Internal Tools** (70% confidence) - $500-2000/month enterprise deals

### SUCCESS METRICS:
- 50 BlankSlate feature requests (validation)
- 10 TaskCrush Pro subscribers at $29/month
- Document 60%+ AI autonomous feature completion rate
- Generate 1 consulting lead from positioning content

### KEY INSIGHT: Start with TaskCrush solo entrepreneur focus, prove the AI-improvement magic works, then expand to platform play. Transparency and "show don't tell" beats AI hype every time.


## Industry

AI-Powered SaaS / Developer Tools / No-Code Platform

## What Works

LinkedIn build-in-public content drives awareness and trust. Showing real deploys with before/after screenshots. The BlankSlate public board where anyone can submit and track requests creates engagement. Transparent changelog showing AI vs human contributions. Consulting as bridge revenue while building SaaS MRR.

## What Doesnt

Cold outreach for SaaS signups (too early). Over-engineering features before validating demand. Trying to sell the platform concept abstractly — need to show the live apps. Feature bloat without user feedback validation.

## Company Name

Product Hacker

## Common Objections

[
  "Is AI-built code reliable enough for production?",
  "What if the AI builds the wrong thing?",
  "How is this different from Cursor/Copilot/other AI dev tools?",
  "Can it handle complex multi-service features?",
  "What about security and data privacy?",
  "Pre-revenue company — will you be around in a year?"
]

## Ideal Customer Profile

{
  "titles": [
    "CEO",
    "CTO",
    "Founder",
    "Solo Entrepreneur",
    "Product Manager",
    "VP Engineering"
  ],
  "industries": [
    "SaaS",
    "AI/ML",
    "Developer Tools",
    "Startups",
    "Solo Entrepreneurs",
    "Small Business"
  ],
  "budgetRange": "$29-299/mo (SaaS) or $10K-50K (consulting engagements)",
  "companySizes": [
    "1",
    "2-10",
    "11-50"
  ]
}

## Competitive Advantages

[
  "Apps that literally build themselves from user feedback",
  "Full autonomous AI pipeline: eval → triage → build → review → deploy",
  "Radical transparency — public board shows every request and its status",
  "Multi-app ecosystem sharing one AI platform layer",
  "Completion-based pricing — users only pay for successful builds",
  "Build-in-public content generates trust and distribution",
  "Live proof-of-concept: 7 apps already running on the platform"
]

## Sales Process Description

SaaS: Self-serve signup → freemium → paid conversion via feature value. Users discover via LinkedIn build-in-public content, BlankSlate public board, or direct referral. Consulting: Inbound from LinkedIn content → discovery call → scope → proposal → close in 2-4 weeks.

## Target Market Description

Two segments: (1) AI-first companies needing consulting/dev services (bridge revenue), (2) Solo entrepreneurs and small teams who want AI-powered productivity tools that improve autonomously from their feedback.

---
*Last synced: 2026-02-25*
