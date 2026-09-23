# PH print collateral (2026-09-22)

Print-ready business card + 2 sticker designs, built for Jody's London Claude
event (same-day print run). HTML → Playwright → PDF at exact bleed dimensions.

- `card.html` — Jody's business card, front+back. UK trim 85×55mm, doc 91×61mm (3mm bleed).
- `sticker-terminal.html` — terminal-window decal. Trim 90×54mm, doc 96×60mm.
- `sticker-circle.html` — circle badge. Trim 76mm circle, doc 82×82mm.
- `render.mjs` — renders PDFs + 300dpi PNGs (needs playwright; run with the
  browser-rig node_modules import path as-is).

Brand: navy #0f172a, cyan #22d3ee, PH chip monogram, SF Mono terminal motif.
Rendered output lives in Supabase storage bucket `ph-print` (shared project
tdjyqykkngyflqkjuzai, public): .../storage/v1/object/public/ph-print/PH-print-pack-jody.zip
