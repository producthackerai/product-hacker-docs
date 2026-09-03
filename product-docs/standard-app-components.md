# Standard Product Hacker app components

Established 2026-09-02 (Cam: "on all our pages by default — we're graph heavy
baby"). Reference implementation: **boiseai.org** (`producthackerai/boise-ai`).
New Product Hacker apps adopt these by default; existing apps adopt them as
they get touched. The one-shot playbook should grow these over time.

## 1. Page registry + provenance strip (graph-native pages)

Every route declares itself in ONE module (`src/lib/pageRegistry.js` pattern):

- `kind`: `live` (queried on view) | `build` (regenerated on deploy) | `bot`
  (scheduled agent job, cadence declared) | `hand` (prose under a review
  contract — max days between reviews, enforced against git history).
- `consumes`: the tables/feeds that make the page what it is.
- A shared `PageProvenance` component renders the registry entry at the bottom
  of **every page by default**: the update contract, the checks that hold the
  page true (hover for what each catches), a collapsible build-graph SVG
  (feeds → page → checks), and sibling pages computed from shared feeds.
- **Sanitized by construction**: describe contracts (what runs, when, what it
  guards) — never machine names, scheduler labels, or file paths.
- **Enforced, not decorative**: a checker fails the weekly pass when (a) any
  live route is missing from the registry (parity), or (b) hand prose is past
  its review contract. The strip renders the same module the checker enforces,
  so the promise on the page IS the check.

## 2. The release-guard check stack (the "held true by" list)

The real hooks between an edit and the public, each born from a specific scar:

1. **Lint gate in prebuild** — an undefined reference refuses to deploy.
2. **Headless-browser smoke** over every public route before push + hourly
   against production (page error, blank body, wrong redirect ⇒ fail + page).
3. **Registry parity** (above).
4. **Review contracts** for hand prose (above).
5. **Link integrity** — every slug/cross-link resolves; hosting domains
   (meetup.com etc.) can never pose as identity.
6. **Ingest validators + snapshots** on data refreshes — a bad pass degrades
   to "unchanged", never "wiped".

## 3. Site timeline (`/timeline`)

Inception-to-now, **major updates only** (features, datasets, big upgrades —
never bug fixes). Curated JSON file; HARD RULE: the session that ships a major
feature appends the entry in the same session. The registry gives the file a
short review contract so a shipping repo with a silent timeline fails the
weekly check — staleness is loud by design.

## 4. Requests board (`/requests`)

A general ask-for-anything door: features, datasets, models, data. Signed-in
to write AND to read — the whole board (request, status, agent prediction,
organizer note) is public to the signed-in community.

- Table pattern: `<prefix>_feature_requests`, RLS = select all authenticated,
  insert own, update admin-only.
- A scheduled agent **triages** each new request: classifies it, links the
  datasets/pages it touches (`related` — the request's graph edges), and
  **predicts** accept/decline with confidence + a public-facing summary.
- **Predict-only**: the agent never decides and never builds. Humans decide in
  an admin queue; the decision + note render publicly. Auto-classify-and-build
  is deliberately future work everywhere.

## 5. Header: menu always, primaries only

The hamburger menu shows on ALL device types. The large-screen header row
carries only the 3–5 most important destinations + auth; everything else is
drawer-only (`.nav-more` pattern). One markup tree — the drawer is the same
list, full-screen on mobile, right-docked panel on desktop. A nav that can't
grow past five items can't get wild.

## Existing shared standards these join

- Shared Supabase auth (one account across apps), per-app table prefixes.
- Metric cards always link to the list that produces the number.
- All entity cards clickable; graphs interactive or they're pictures.
- Stats queried, never typed; zero shown as zero.
- Provenance on every data row (added_via / originated_by, one chip).
- Audio editions on analysis pages/posts by default.
