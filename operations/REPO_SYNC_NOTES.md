# Repo Sync Structure & Best Practices
**Generated:** 2026-02-24  
**For:** ProductHackerAI + Cam + Jody

---

## Current Structure (What Exists Now)

### product-hacker-docs Repository

```
product-hacker-docs/
├── README.md
│
├── strategy/              ← ProductHackerAI strategic docs
│   ├── RALLY_COOP_NETWORK.md
│   ├── RALLY_COOP_LAYERS.md
│   ├── RALLY_MASTER_LIST.md
│   ├── ARCHITECTURE_PIVOT.md
│   ├── TOMORROW.md
│   ├── ADVISOR_PLAYBOOK.md
│   └── RALLY_FEDERATION_PROTOCOL.md  ← NEW (Cam/Claude Code added)
│
├── context/               ← NEW (App context synced from Rally)
│   └── workspace-strategy.md  (Rally's workspace strategy)
│
├── goals/                 ← NEW (App goals synced from TaskCrush/Rally)
│   ├── goal-001.md (Launch Co-op Model)
│   ├── goal-002.md ... goal-025.md
│   ├── app-goal-onboarding.md
│   ├── feedback-ai-chat.md
│   └── etc.
│
├── operations/            ← ProductHackerAI ops docs
│   ├── CAM_SYNC.md
│   └── MEMORY.md
│
├── identity/              ← ProductHackerAI identity
│   ├── SOUL.md
│   ├── AGENTS.md
│   ├── IDENTITY.md
│   └── USER.md
│
├── config/                ← ProductHackerAI config
│   ├── DECISIONS.md
│   ├── HEARTBEAT.md
│   └── TOOLS.md
│
└── memory/                ← ProductHackerAI session logs
    ├── 2026-02-20.md
    └── 2026-02-21.md
```

---

## What's Being Synced (App → Repo)

Based on commits "sync: update goals and context from apps":

### From Rally/TaskCrush:
- **Workspace strategy** → `context/workspace-strategy.md`
- **Goals** → `goals/goal-XXX.md`, `goals/app-goal-*.md`
- **Feedback goals** → `goals/feedback-*.md`

### Not Yet Synced (But Should Be):
- Product docs (features, user guides, API reference)
- CLAUDE.md files (per-app agent instructions)
- Changelog entries

---

## Best Practices (How We Coexist)

### 1. **Directory Ownership (Clear Boundaries)**

| Directory | Owner | Purpose | Sync? |
|-----------|-------|---------|-------|
| `/strategy/` | ProductHackerAI | High-level strategic docs (co-op, architecture, GTM) | Manual (PH agent pushes) |
| `/context/` | Apps (Rally/TaskCrush) | App workspace strategies, business context | Auto-sync from apps |
| `/goals/` | Apps (Rally/TaskCrush) | App goals (product roadmap, features) | Auto-sync from apps |
| `/operations/` | ProductHackerAI | Ops logs, sync notes, memory | Manual (PH agent pushes) |
| `/identity/` | ProductHackerAI | SOUL, AGENTS, brand | Manual (PH agent pushes) |
| `/config/` | ProductHackerAI | DECISIONS, HEARTBEAT | Manual (PH agent pushes) |
| `/memory/` | ProductHackerAI | Session logs | Auto-push (nightly) |

**New directories needed:**

| Directory | Owner | Purpose | Sync? |
|-----------|-------|---------|-------|
| `/docs/` | Apps | Product docs (features, guides, FAQs) | Auto-sync from apps |
| `/api/` | Apps | API reference docs | Auto-sync from apps |
| `/changelog/` | Apps | Changelog entries per app | Auto-sync from apps |
| `/claude/` | Apps | CLAUDE.md per app | Auto-sync from apps |

---

### 2. **Sync Protocol (Avoid Conflicts)**

#### ProductHackerAI Rules:
1. ✅ **Can write to:** `/strategy/`, `/operations/`, `/identity/`, `/config/`, `/memory/`
2. ❌ **Never write to:** `/context/`, `/goals/`, `/docs/`, `/api/`, `/changelog/`, `/claude/`
3. ✅ **Can read from:** All directories (for context)
4. ⚠️ **Before pushing:** Always `git pull origin main` first (avoid merge conflicts)

#### App Sync Rules (Claude Code / Scripts):
1. ✅ **Can write to:** `/context/`, `/goals/`, `/docs/`, `/api/`, `/changelog/`, `/claude/`
2. ❌ **Never write to:** `/strategy/`, `/operations/`, `/identity/`, `/config/`, `/memory/`
3. ✅ **Commit message format:** `sync: update [category] from [app]` (e.g., "sync: update goals from Rally")
4. ⚠️ **Before pushing:** Always `git pull origin main` first

---

### 3. **File Naming Conventions**

#### Strategy Docs (ProductHackerAI):
- Use SCREAMING_SNAKE_CASE for major docs: `RALLY_COOP_NETWORK.md`
- Date-stamp time-sensitive docs: `TOMORROW.md` or `2026-Q1-PLAN.md`
- Descriptive names: `ADVISOR_PLAYBOOK.md`, `ARCHITECTURE_PIVOT.md`

#### App Docs (Synced):
- Goals: `goal-XXX.md` (numbered) or `app-goal-{feature}.md` (semantic)
- Context: `workspace-strategy.md`, `business-profile.md`
- Product docs: `feature-{name}.md`, `guide-{topic}.md`
- API: `api-{endpoint}.md` or `openapi.yaml`
- Changelog: `YYYY-MM-DD-{summary}.md` or `changelog-{app}.md`
- Claude: `CLAUDE-{app}.md` (e.g., `CLAUDE-rally.md`, `CLAUDE-taskcrush.md`)

---

### 4. **README.md Structure (Organized by Source)**

Update README to reflect ownership:

```markdown
## Structure

### High-Level Strategy (ProductHackerAI)
Strategic vision, market positioning, GTM plans
- `/strategy/` — RALLY_COOP_NETWORK, ADVISOR_PLAYBOOK, etc.

### App Context & Goals (Auto-Synced from Apps)
Real-time workspace strategies and product roadmaps
- `/context/` — workspace-strategy.md (Rally's current strategy)
- `/goals/` — goal-001.md ... (Rally/TaskCrush product goals)

### Product Documentation (Auto-Synced from Apps)
User-facing docs, API reference, feature guides
- `/docs/` — Feature docs, user guides, FAQs
- `/api/` — API reference, OpenAPI specs
- `/changelog/` — Changelog entries per app
- `/claude/` — Per-app agent instructions (CLAUDE.md)

### Operations (ProductHackerAI)
Day-to-day ops, sync logs, memory
- `/operations/` — CAM_SYNC.md, MEMORY.md

### Identity (ProductHackerAI)
Brand, persona, agent instructions
- `/identity/` — SOUL.md, AGENTS.md, IDENTITY.md, USER.md

### Config (ProductHackerAI)
Decisions, heartbeat, tool notes
- `/config/` — DECISIONS.md, HEARTBEAT.md, TOOLS.md

### Memory (ProductHackerAI)
Session logs (auto-generated)
- `/memory/` — YYYY-MM-DD.md (date-stamped session notes)
```

---

### 5. **Merge Conflict Prevention**

#### Scenario: Both ProductHackerAI and App Sync Push at the Same Time

**Solution:** Use separate directories (already done).

**Remaining risk:** README.md updates

**Mitigation:**
- ProductHackerAI: Only update README.md when adding new directories or major structure changes (rare)
- App Sync: Don't touch README.md (or only append new sections)
- If conflict: Human resolves (Cam/Jody)

---

### 6. **Context Consistency Across Both**

**Goal:** Claude Code (in Rally) and ProductHackerAI should have consistent knowledge.

**How:**

#### For Claude Code (in Rally):
1. Read `product-hacker-docs/context/workspace-strategy.md` (already done)
2. Read `product-hacker-docs/goals/` for product roadmap (already done)
3. Read `product-hacker-docs/strategy/` for co-op architecture (new recommendation)
   - Before designing co-op features, check `RALLY_COOP_NETWORK.md` and `RALLY_COOP_LAYERS.md`

#### For ProductHackerAI (me):
1. Read `product-hacker-docs/context/` for app's current strategy
2. Read `product-hacker-docs/goals/` for app's product roadmap
3. Read `product-hacker-docs/docs/` for user-facing features (when added)
4. Read `product-hacker-docs/claude/` for per-app agent instructions (when added)

**Implementation:**
- Claude Code workspace includes: `context/`, `goals/`, `strategy/`, `docs/`, `api/`
- ProductHackerAI workspace includes: All directories (full context)

---

## Recommendations for Next Steps

### 1. Add Missing Directories
```bash
cd product-hacker-docs
mkdir docs api changelog claude
git add .
git commit -m "structure: add directories for app docs, API, changelog, CLAUDE.md"
git push origin main
```

### 2. Sync Product Docs (Claude Code Task)
- Copy Rally's product docs → `docs/rally-*.md`
- Copy TaskCrush's product docs → `docs/taskcrush-*.md`
- Copy CLAUDE.md files → `claude/CLAUDE-rally.md`, `claude/CLAUDE-taskcrush.md`
- Commit: `sync: add product docs and CLAUDE.md from apps`

### 3. Update README
- Add new directory descriptions
- Clarify ownership (ProductHackerAI vs. Auto-Sync)
- Add sync protocol notes

### 4. Document Sync Process
- Create `SYNC_PROTOCOL.md` in root
- Explain how apps sync to this repo
- Include commands/scripts used

### 5. ProductHackerAI: Check Repo Before Pushing
Add to my procedure (`.doc-repo-procedure.md`):
```bash
# Before pushing any new docs:
cd /tmp/product-hacker-docs
git pull origin main  # ← ALWAYS DO THIS FIRST
# ... then add files, commit, push
```

---

## What ProductHackerAI Will Do (Updated Behavior)

### Before Creating New Docs:
1. `git pull origin main` (check for app sync updates)
2. Create doc in `/data/workspace/`
3. Determine category (strategy/operations/identity/config/memory)
4. Copy to appropriate directory
5. `git pull origin main` again (safety check)
6. `git add`, `git commit`, `git push`

### Never Touch:
- `/context/` (owned by apps)
- `/goals/` (owned by apps)
- `/docs/` (owned by apps, when added)
- `/api/` (owned by apps, when added)
- `/changelog/` (owned by apps, when added)
- `/claude/` (owned by apps, when added)

### Always Read (For Context):
- Check `/context/workspace-strategy.md` before strategic planning
- Check `/goals/` before proposing new features
- Check `/strategy/RALLY_COOP_*.md` when discussing co-op architecture

---

## Summary

**What's working:**
- ✅ App sync is working (goals + context being pushed)
- ✅ ProductHackerAI strategy docs are separate (no conflicts)
- ✅ Directory ownership is clear

**What needs to be added:**
- 🔲 `/docs/` for product documentation
- 🔲 `/api/` for API reference
- 🔲 `/changelog/` for changelog entries
- 🔲 `/claude/` for per-app CLAUDE.md files

**What needs to be documented:**
- 🔲 Update README to reflect new structure
- 🔲 Create SYNC_PROTOCOL.md
- 🔲 Update my `.doc-repo-procedure.md` to always `git pull` first

**Risk mitigation:**
- ✅ Separate directories = no merge conflicts
- ✅ ProductHackerAI reads app context before planning
- ✅ Claude Code reads strategic context before building

---

**Status:** Coexistence protocol defined. Ready to implement.  
**Next:** Cam/Claude Code adds missing directories + syncs product docs.  
**ProductHackerAI:** Updated to always `git pull` before pushing.
