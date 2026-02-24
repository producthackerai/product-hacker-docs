# Operational Memory

Curated insights and learned patterns. Updated nightly by log rotation cron.

## User Patterns
- Jody (EST) is primary user; Cam (MST) is secondary
- Cam's Telegram ID: 8250315899
- Recent comprehensive setup completion (2026-02-19) — all services wired, crons configured
- Telegram group policy changed to `open` (2026-02-19) so all group members can interact
- Cam thinking about monetization — data-services product initiative underway

## Common Requests
- Task/goal status checks (TaskCrush)
- BlankSlate pipeline snapshots
- Daily briefs (scheduled 8 AM ET)
- GitHub PR/CI checks

## Known Issues
- Skills auto-loading unreliable — API docs embedded in AGENTS.md
- HiveForge internal URL can be slow on first call after idle
- **[PERSISTENT] HiveForge connectivity down** — Both TaskCrush and BlankSlate endpoints returning "Failed to connect" errors. First seen 2026-02-20 05:00 UTC, ongoing through 2026-02-22 05:00 UTC (4th nightly cleanup attempt failed). Nightly cleanup skipped 2026-02-21, 2026-02-22. **CRITICAL: Escalate to infrastructure team immediately — likely auth token rotation, endpoint misconfiguration, or HiveForge MCP service down.** Retry attempts: 2026-02-21 05:00 UTC, 2026-02-21 05:05 UTC, 2026-02-22 05:00 UTC — all failed.

## Environment Notes
- `gh` CLI not available in sandbox; use curl + GitHub API + python3 for JSON parsing
- `jq` not available; python3 works as substitute

## Operational Notes
- OpenClaw user ID: 824666b4-d7f7-4ad2-8ba4-08f4fe5c08ce
- Telegram bot: @Producthackerai_bot (long-polling)
- **Setup complete (2026-02-19):** All 3 cron jobs live (morning brief 8am ET weekdays, nightly cleanup, log rotation)
- HiveForge MCP connection verified; auth token working (tasks endpoint auth issue noted; BlankSlate healthy)
- All 6 hiveforge skills operational: tasks, goals, blankslate, crews, github, tao

## Last Updated
2026-02-24 05:30 UTC (Log Rotation: HiveForge outage ongoing — all TaskCrush/BlankSlate operations remain blocked. No stale entries to prune; memory structure stable. Key pattern: Jody is primary user; both users depend heavily on HiveForge connectivity for daily operations. Escalation status: **CRITICAL — Infrastructure team action required immediately. Outage duration: 79+ hours. Impact: All task, goal, and pipeline management operations offline.** No new durable insights to add pending HiveForge restoration.)
