# Product Hacker Release Notes

> What's new, improved, and fixed in Product Hacker — updated with every release.

---

## February 17, 2026

### Slack-Like Sidebar Navigation
`major` `new-feature` `2026-02-17`

Complete navigation redesign inspired by Slack. The overloaded header (workspace buttons + nav tabs + 17-item "More" dropdown) has been replaced with a clean sidebar + slim header layout. The sidebar features a workspace switcher at the top, categorized app sections (Core, Tools, Resources, Admin, Exploration), a collapsible icon-only mode, and a mobile drawer overlay. The slim 48px header shows the PH brand logo, current page title, and user avatar dropdown.

---

### App Registry & Manage Apps
`major` `new-feature` `2026-02-17`

New app registry system defines all 21 navigable pages with categories, icons, role requirements, and toggle states. Users can open "Manage Apps" from the sidebar or dashboard to enable/disable Tools and Resources via toggle switches. Preferences persist to your profile. Core apps (Dashboard, Board, AI Chat) are always visible; admin pages are role-gated.

---

### Product Hacker Rebrand
`major` `enhancement` `2026-02-17`

Full rebrand from TaskCrush to Product Hacker. New landing page for logged-out users with hero section, services overview, portfolio, stats, and contact form. Professional agency-style design with gradient effects, animations, and responsive layout. PH logo badge appears throughout the app.

---

### Unified Workspace Model
`major` `new-feature` `2026-02-17`

Workspaces simplified: "personal" and "work" merged into a single "Individual" workspace (use tags to organize within). Shared workspaces like "product-hacker" are now regular DB workspaces via `tc_workspaces` + `tc_workspace_members`. No more special-casing — cleaner architecture with a workspace switcher in the sidebar.

---

### Rally (formerly Solo CRM) — Real Pipeline
`major` `new-feature` `2026-02-17`

Rally (formerly Solo CRM) upgraded from concept to working product. Upload CSV/vCard contacts, the system validates, normalizes, and enriches them using AI web search. Revenue intelligence chat with 5 AI-powered plays: Pipeline Snapshot, Pre-Call Brief, Stale Opp Rescue, Progression Detection, and Contact Quick-Add. Workspace-aware so CRM data is scoped to your current workspace. Onboarding wizard guides first-time setup.

---

### PeanutButter Timer App
`minor` `new-feature` `2026-02-17`

New micro-app for workout challenges. Pull-ups and burpees timer with configurable rounds and rest periods. Available in the Tools section of the sidebar (disabled by default, enable via Manage Apps).

---

### Session Persistence & Auth Improvements
`minor` `enhancement` `2026-02-17`

Session refresh now works correctly — if your token expires, the app automatically refreshes it before logging you out. Auth headers include impersonation support for super admin "View As" feature.

---

## February 16, 2026

### Product Hacker Website
`major` `new-feature` `2026-02-16`

Standalone marketing website deployed at producthacker.ai. Built with its own Vite config, Express server, and Railway deployment. Includes About page, platform overview, articles section with MDX support. Admin-only preview accessible from the main app.

---

### Tribe Care Concept Page
`minor` `new-feature` `2026-02-16`

Concept page for Tribe Care — a family coordination app. Includes Open Items checklist feature. Admin-only, now in the Exploration section of the sidebar. Live version at tribe.producthacker.ai (separate repo).

---

## February 15, 2026

### OpenClaw Research Updates
`minor` `enhancement` `2026-02-15`

Added TestFlight automation pipeline section and super admin chat routing with toggle to the OpenClaw research page.

---

### CI/CD Optimization
`minor` `bug-fix` `2026-02-15`

Optimized GitHub Actions workflows to reduce Actions minutes burn. Added concurrency groups to BlankSlate queue workflow to prevent parallel runs.

---

### BlankSlate Mobile Fix
`minor` `bug-fix` `2026-02-15`

Fixed the BlankSlate customize panel to be opaque on mobile instead of transparent, improving readability.

---

## February 14, 2026

### App Skins — Custom Themes System
`major` `new-feature` `2026-02-14`

Winamp-inspired "skins" system for TaskCrush. Users can create, save, share, and browse custom themes that change the entire look of the app. The **Theme Lab** is a CSS science lab where you mix color formulas, pick fonts, and rearrange dashboard widgets. Includes 6 built-in color presets (Midnight Blue, Cyberpunk, Forest, Sunset, Arctic, Lavender) and 11 font choices including retro options like Press Start 2P and VT323. Widget layout customization lets you reorder, resize (half/full width), and hide any dashboard widget. Themes are shared in a public gallery where anyone can preview, try, and activate community creations. Available under More > App Skins in the nav.

---

### Theme Lab — Interactive Color & Font Editor
`major` `new-feature` `2026-02-14`

Full-featured theme editor with live preview. Four sections: Colors (13 CSS variables with color pickers, hex input, and quick-apply palette presets), Fonts (display + monospace font selectors with live specimen preview), Widgets (reorder, resize, and toggle dashboard widgets), and Save (name, describe, tag, and publish your creation). Live preview mode applies changes to the actual app in real-time while you experiment. Tags enable community discovery.

---

### Theme Gallery — Browse & Share Community Skins
`major` `new-feature` `2026-02-14`

Netflix-style gallery for browsing all available themes. Each card shows a mini color preview, author info, usage count, and tags. Filter by All/My Themes/Popular, search by name or tag. One-click preview applies a theme temporarily so you can see what it looks like before committing. "Use This" activates a theme and persists it across sessions. Active theme indicator and easy reset-to-default.

---

### Recent Features Dashboard Widget
`major` `new-feature` `2026-02-14`

New "Recent Features" widget on the dashboard shows the latest release notes entries at a glance. Displays category badges (New, Update, Fix), importance tags, dates, and truncated descriptions. Configurable via App Skins: control how many items to show, sort order (newest/oldest/major first), filter by category or importance, and toggle category badges. Links to the full Release Notes page.

---

### Deep Widget Configuration in Theme Lab
`major` `enhancement` `2026-02-14`

The Widgets tab in Theme Lab now supports per-widget configuration. Click the gear icon on any widget to expand its settings panel. Configure limits (how many items to show), sort order, filters, days ahead for due dates, toggle options, and more. Each widget type has its own set of configurable options — all saved as part of the theme so different skins can completely change not just how the dashboard looks, but what it shows and how it's organized.

---

## February 8, 2026

### Pin Activity Suggestions
`major` `new-feature` `2026-02-08`

Pin your favorite activity suggestions to the front of any row. Pinned items persist across regenerations and page visits. The AI knows what's pinned and won't duplicate them. List-specific pinning means the same activity can be pinned in one row without affecting others.

---

### Feedback Notes & List Notes
`major` `enhancement` `2026-02-08`

Both thumbs-up and thumbs-down feedback now open a modal where you can add optional prose notes explaining *why* you liked or disliked a suggestion. Plus, each activity row has a new notes icon where you can give the AI free-text guidance for that list (e.g., "more jazz, less country" or "focus on free events"). All notes feed directly into the AI prompt for better personalization.

---

### Centralized AI Provider with Gemini Support
`major` `new-feature` `2026-02-08`

All AI calls (chat, activities, onboarding, admin) now route through a centralized provider system supporting both Google Gemini and Anthropic Claude. Automatic fallback ensures if one provider fails, the other is tried. Super admins can switch the default provider from the Admin > AI Costs tab.

[See Admin Dashboard docs →](/docs#admin-dashboard)

---

### Activities Page: Progressive Streaming
`major` `enhancement` `2026-02-08`

The Activities/Explore page now loads suggestions progressively using Server-Sent Events (SSE). Themed rows appear as they generate (in batches of 3), with skeleton loaders for remaining content. Previously took 2+ minutes in a single blocking call.

---

### Admin AI Cost Tracking
`major` `new-feature` `2026-02-08`

New AI Costs tab in the Admin Dashboard shows total generation costs, token usage, web search counts, cache hit rates, daily/per-user breakdowns, and recent generation history. Supports filtering by time range and hiding cached rows.

[See Admin Dashboard docs →](/docs#admin-dashboard)

---

### Generation Deduplication Locks
`minor` `enhancement` `2026-02-08`

Prevents duplicate expensive AI generations when multiple requests arrive for the same user simultaneously. A lock system ensures only one generation runs at a time per user; concurrent requests wait and serve from cache.

---

## February 7, 2026

### Sync Chat History Clearing Across All Surfaces
`minor` `enhancement` `2026-02-07`

Chat history clearing now syncs across all chat surfaces instantly. When you clear history via the button or when Claude uses the delete_chat_history tool, all chat panels (sidebar, modal, dashboard inline) reset to the welcome message simultaneously using a cross-component event system.

[See Chat Interface docs →](/docs#chat-interface)

---

### Dashboard Layout Redesign
`major` `enhancement` `2026-02-07`

Completely redesigned the dashboard with a responsive CSS Grid layout. Cards now reflow intelligently across breakpoints — AI suggestions span full width, tree view and priority tasks get prominent space, and sidebar widgets (upcoming, progress, activity, aurora) reorder for optimal mobile experience. Replaces the old sidebar/main column structure for better content hierarchy and mobile-first design.

[See Dashboard docs →](/docs#dashboard-overview)

---

## February 6, 2026

### Auto-Updating Product Documentation
`major` `new-feature` `2026-02-06`

Product documentation now auto-updates whenever code is merged to main. A new Phase 2 in the GitHub Actions workflow analyzes code diffs against the current docs and uses Claude to rewrite any stale or missing sections — keeping the AI chat's knowledge base always accurate.

[See GitHub Workflows docs →](/docs#github-workflows)

---

### AI-Powered Task & Goal Auto-Completion
`major` `new-feature` `2026-02-06`

Added a GitHub Actions workflow that automatically marks app-workspace tasks and goals as done when related code lands on main. Claude analyzes commit messages against open tasks/goals and updates their status, creates new tasks for substantial untracked work, and rolls up goal progress.

[See Automation Pipeline docs →](/docs#automation-pipeline)

---

### App Docs Page & Chat Tool
`major` `new-feature` `2026-02-06`

New dedicated App Docs page with sidebar navigation, section search, and responsive layout. The AI chat can now look up product documentation via the `get_app_docs` tool — ask it "how does X work?" and it pulls from the live docs.

[See App Docs →](/docs#app-docs)

---

### View As User (Super Admin Impersonation)
`major` `new-feature` `2026-02-06`

Super admins can now view the app as any user to debug issues or verify data. Search by email in the user menu, and all data reflects the selected user's perspective. An impersonation banner shows when active.

[See User Roles docs →](/docs#user-roles--permissions)

---

### Admin Activity Tester
`minor` `new-feature` `2026-02-06`

New admin tab for testing activity suggestions with editable fake profiles. Wired up to the real feedback database so you can verify the suggestion-feedback loop end-to-end.

---

## February 5, 2026

### Tao Data Integration
`major` `new-feature` `2026-02-05`

Integrated Tao blockchain data into the platform, providing real-time subnet and validator information within the app workspace.

[See Tao Data Integration docs →](/docs#tao-data-integration)

---

### Automation Control Panel Rewrite
`major` `enhancement` `2026-02-05`

Completely rewrote the Automation page as an editable control panel with real prompts. Super admins can now customize evaluation and implementation prompts, toggle automation on/off, and see the full pipeline status.

[See Automation Control Panel docs →](/docs#automation-control-panel)

---

### Auto-Close Tasks on PR Merge
`minor` `new-feature` `2026-02-05`

Tasks linked to a PR are now automatically closed when the PR merges. The system detects PR references in task metadata and updates status accordingly.

---

### Preferred Time for Recurring Tasks
`minor` `enhancement` `2026-02-05`

Recurring tasks and habits now support a preferred time field. Habits are grouped by frequency (daily, weekly, etc.) for better organization on the dashboard.

[See Recurring Tasks docs →](/docs#recurring-tasks--habits)

---

### Activity Feedback Persistence
`minor` `enhancement` `2026-02-05`

Activity suggestion feedback (thumbs up/down) now persists across sessions. Previously, refreshing the page lost your feedback state. Category preference boosts are also saved reliably.

[See Activity Feedback docs →](/docs#activity-feedback-system)

---

### Fix: Activity Widget Caching & Refresh
`minor` `bug-fix` `2026-02-05`

Fixed activity widget caching issues and added a manual refresh button. Resolved undefined feedback variable and missing column errors in the suggestion pipeline.

---

### Fix: Mobile Chat UI
`minor` `bug-fix` `2026-02-05`

Fixed chat panel layout on mobile — hidden suggestion chips that overlapped content and fixed header overlap issues. Improved button spacing in chat header on small screens.

---

## February 4, 2026

### Inline Task Editing
`minor` `new-feature` `2026-02-04`

Double-click any task card to edit it inline — no more opening a modal for quick title or description changes. Changes save automatically on blur.

---

### Drag-and-Drop Goal Reordering
`minor` `enhancement` `2026-02-04`

Goals can now be reordered via drag and drop in the goals panel. Goal edits also persist correctly now (previously some edits were lost on refresh).

---

### Auto PR Button on Task Cards
`minor` `new-feature` `2026-02-04`

App workspace task cards now have an "Auto PR" button that triggers the automation pipeline to create a PR for that task using Claude Code.

[See Automation Pipeline docs →](/docs#automation-pipeline)

---

### Feedback Automation System
`major` `new-feature` `2026-02-04`

Implemented the full feedback automation pipeline: user feedback is evaluated by Claude, and actionable items are automatically turned into PRs via Claude Code and GitHub Actions. Includes eval prompt, implementation prompt, and automated PR creation.

[See Automation Pipeline docs →](/docs#automation-pipeline)

---

### Fix: Automated Feedback Processing
`minor` `bug-fix` `2026-02-04`

Multiple fixes to the automated feedback processing pipeline — correct Claude Code action parameters, proper task status tracking after automation, workflow file protection, and failure handling.

---

### Fix: Goal Panel UI
`minor` `bug-fix` `2026-02-04`

Fixed goal items shrinking unexpectedly, added proper padding, visible status rows, and consistent border-left styling matching TaskCard patterns.

---
