# Doc System Standard — One Pattern

## The Rule

All Rally / Product Hacker docs go through the doc hub sync. One pattern. One script. No more seed scripts for individual docs.

**The canonical script:** `product-hacker/scripts/sync-docs-hub.js`

---

## How Docs Get Into the Database

### Option A: Add a markdown file to this repo (preferred for strategy/identity/ops docs)

1. Create a `.md` file in the appropriate folder:
   - `strategy/` — Strategic decisions, pivots, playbooks
   - `identity/` — Brand, soul, agents, user personas
   - `operations/` — Cam sync, memory, repo notes
   - `config/` — Decisions, heartbeat, tools config
   - `memory/` — Session memory snapshots

2. The slug is generated automatically from the file path:
   - `strategy/ADVISOR_PLAYBOOK.md` → slug `strategy--advisor-playbook`
   - `identity/SOUL.md` → slug `identity--soul`

3. Run the sync:
   ```bash
   cd product-hacker && node scripts/sync-docs-hub.js --direction repo-to-db
   ```

4. The doc appears in the DB with a sequential `doc-NNN` ID and is immediately accessible in the Rally frontend.

### Option B: Create via chat (AI-generated docs)

The Rally AI chat can create docs via the `crm_create_document` tool. These land in `tc_documents` directly. On the next sync run, `syncRallyContextDocs()` picks them up and verifies they have correct records. Their IDs may be non-sequential (hex fragment format) — that's fine, the sync handles them by slug.

### Option C: Via the Rally UI

Docs created through the Rally frontend use the `POST /api/documents` endpoint, which generates a sequential `doc-NNN` ID. These are immediately accessible.

---

## What NOT to Do

**Do not create seed scripts** (like `backend/scripts/create-*-doc.mjs`) to insert individual docs. These cause three problems:

1. **ID fragmentation** — seed scripts used custom IDs like `doc-ph-*` and hex fragments that break the sequential ID counter
2. **No file backup** — the content only lives in the script, not in a tracked markdown file
3. **Not idempotent** — running the script twice creates duplicates or requires ID-based checks

---

## The Sync Script

`product-hacker/scripts/sync-docs-hub.js` handles:

| Source | Direction | What it does |
|--------|-----------|-------------|
| `product-hacker-docs/` repo markdown files | → DB | Strategy, identity, ops docs from git |
| `rally/src/data/crm-docs.md` | → DB | Rally product docs |
| `product-hacker/src/data/*.md` | → DB | Product Hacker app docs |
| `rally/.context/docs/` | → DB (verify) | Ensures ad-hoc docs have canonical records |
| `tc_goals` + `tc_documents` | → repo | Goals and context back to git for versioning |
| `tc_feature_requests` + `tc_changelog` | → DB | Pipeline snapshots |

**Run the sync:**
```bash
cd product-hacker
node scripts/sync-docs-hub.js --direction both      # Full bidirectional sync
node scripts/sync-docs-hub.js --direction repo-to-db  # File changes → DB only
node scripts/sync-docs-hub.js --direction db-to-repo  # Goals/context → git only
```

---

## ID Format

Canonical docs created by the sync use sequential IDs: `doc-001`, `doc-002`, ... `doc-NNN`.

Ad-hoc docs (from chat tools, old manual inserts) may have hex-fragment IDs like `doc-81690543`. These are valid — the frontend fetches by ID and the sync tracks them by slug. Do not manually change these IDs.

---

*Last updated: 2026-04-08*
