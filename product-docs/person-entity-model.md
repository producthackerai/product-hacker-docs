# Person, builder, member: the entity model

Written 2026-09-12, answering Cam's question: *"how do data models and profile
pages differ / overlap for AI builders and Boise AI Collective members? If you
were designing from scratch, would you do anything differently? Should we make
those updates now?"*

## What exists today

A person who is a member of the collective is stored **three times**:

| Table | Rows | What it is | What it adds |
|---|---|---|---|
| `od_profiles` | 2,314 people | The canonical entity in the OnlyData pool | slug, name, headline, links, claimed, scores |
| `bai_people` | 56 | A row in the *Local AI Builders* dataset. Carries `od_profile_slug` | `builder_type`, `focus`, `why_in_db`, `local_tie`, `publish_status`, `added_via`, `originated_by`, `claimed_by` |
| `bai_members` | 14 | The roster. Carries `person_slug` | `email`, `phone`, `offers`, `asks`, `available_for_hire`, `status`, `role`, `user_id` |

Cam's read is right: these are **one entity with progressive extensions**.
A builder is a person who is listed in a dataset. A member is a person who is on
the roster and can do more. And the two are genuinely independent — 42 of 56
builders are not members, and a member who is not a builder is possible (none
today).

## What is actually wrong with it

Not the shape — the **duplication**. Three specific costs, all of which have
already bitten:

1. **Identity is stored three times and drifts.** `bai_members` keeps its own
   `bio`, `links`, `org`, `title`, reconciled by `profile_synced_at`. Every copy
   is a chance to disagree.
2. **Ownership is recorded twice.** `bai_people.claimed_by` and
   `bai_members.user_id` both mean "this person's account". On 2026-09-12 four
   active members had the roster link and a null `claimed_by`, so the site asked
   them to claim profiles they already owned — and none of them could edit via
   the owner policy, which keys on `claimed_by`.
3. **Membership is implied by a row existing**, not stated as a dated fact. There
   is no way to express "was a member, lapsed", "sponsor", or "organizer of one
   thing but not another" without another table.

A fourth, smaller: the same question — *what is this person to us?* — is answered
independently in about six places. Paige Giese made an account, claimed her
builder profile, and was never considered for the roster, because nothing was
looking at the whole picture.

## What I would build from scratch

**One person entity, and every role as a typed, dated relationship with a payload.**

```
person  (od_profiles — the pool entity, the only place identity lives)
   │
   ├── role: listed_in  → list: local-ai-builders
   │        payload: builder_type, focus, why_in_db, local_tie, publish_status
   │
   ├── role: member_of  → org: boise-ai-collective
   │        payload: offers, asks, available_for_hire, contact ref
   │        since / until  ← lapsing is a date, not a deletion
   │
   └── role: organizer_of → org: boise-ai-collective
```

Permissions derive from the role rows rather than from a parallel table, so
"member" means exactly one thing in exactly one place.

**The important part: this is not a new idea in this codebase — it is already
half-built.** `bai_affiliations` is exactly this shape, and the collective is
already an org (`boise-ai-collective`) that members already carry affiliations
to. The three-table split is the legacy half, not the design.

## Should we migrate now?

**No — not the storage. The pain is not real yet and the blast radius is.**

56 builders and 14 members do not justify moving RLS policies, column grants,
the ingest pipeline, `readBackClaimed`, `sync-onlydata`, the claim flow, and six
check scripts that are currently correct. That is precisely the spaghetti Cam
worries about, spent on a problem that is not hurting.

**Do these three instead. They get most of the benefit, none of the risk, and
they make the eventual migration trivial if it ever comes.**

1. **One resolver, used everywhere.** A single `personState(slug)` returning
   identity plus roles plus flags — is_builder, is_member, is_claimed, is_hidden,
   owns_account. Every surface reads it instead of re-deriving. This is the fix
   for the whole class of bug above: the claim prompt, the four un-editable
   members, and Paige all came from six places answering one question
   separately. *Highest value, lowest risk — do this one first.*
2. **Stop copying identity into `bai_members`.** Drop `bio`, `links`, `org`,
   `title` from the roster and read them from the person. Keep only what is
   genuinely membership-specific: contact, offers, asks, status, user_id. Kills
   the drift class outright and shrinks the sync surface.
3. **Make membership a dated fact.** Add `since` / `until` rather than deleting
   rows. Additive, cheap, and it is the one piece of the edge model that is hard
   to retrofit later because the history is gone once you delete.

## The trigger to actually migrate

When a **third role** appears — sponsor, alum, chapter organizer, org admin — or
when a second community reuses this machinery. At that point the typed-edge
model pays for itself immediately, and having done step 3 means the history is
there to migrate. Before then it is ceremony.

## On URLs

Cam: *"the fewer URLs the better."* Agreed, and the current split is defensible
as it stands: `onlydata.club/<slug>` is the person in the pool,
`boiseai.org/data/local-ai-builders/<slug>` is that person **as a builder in a
named dataset**, and `boiseai.org/contribute/<slug>` is the invitation view. Three
URLs for three genuinely different questions, all keyed on the same slug. The
thing to protect is that the **slug never differs between them** — that is what
makes them feel like one entity rather than three records.
