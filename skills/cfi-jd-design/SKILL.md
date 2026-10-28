---
name: cfi-jd-design
description: Design and language system for Crashfree India job descriptions (JDs) and hiring posts, in the style of the SATARK "Builder" JD. Use whenever someone asks to write, draft, redesign or render a JD, job post, hiring one-pager, "we're hiring" creative or LinkedIn hiring carousel for Crashfree India / CFI / Cars24 Commitment. Gives the page layout (HTML templates, 1080x1350), brand tokens, the voice and sentence rules, a section structure, a render script (PNG + PDF) and a QA checklist. It does not supply role content: the user brings the role.
---

# Crashfree India JD design & language

This skill makes every Crashfree India JD look and read like one family. It covers the **form** (layout, type, colour, rendering) and the **voice** (how sentences are written). It does **not** decide what a role is: the person using it brings the role, the responsibilities and the asks.

Reference output: `examples/example_cover.png` (LinkedIn cover) and `examples/example_jd_page.png` (the JD page). Study both before you start.

## Deliverables

A standard JD set has two 1080×1350 px pages (LinkedIn 4:5), rendered at 2× (2160×2700):

1. **Cover** (`templates/cover.html`): full brand-blue poster with one big line. Optional; use it for LinkedIn posts.
2. **JD page** (`templates/jd_page.html`): blue header band and white body with the sections. Always required.

Export each page as PNG (for LinkedIn and Slack) and as a single PDF (for email and WhatsApp).

## Workflow

1. **Collect inputs** from the user. Ask only for what is missing:
   - role title and a short role line (e.g. "Builder", "AI Traffic Enforcement")
   - location
   - what the person will do (raw notes are fine)
   - what they need to bring
   - what they get
   - how to apply: a form link, an email, or both
   - whether a cover page is wanted
2. **Write the copy** using the language rules below. Draft it in plain text first and check it against the word budget.
3. **Fill the templates.** Copy the files from `templates/` and `assets/` into one working folder (the HTML expects the logo and `apply_qr.png` next to it), then replace every `{{PLACEHOLDER}}`. Remove optional blocks you don't need, such as the QR code.
4. **Render** with `node scripts/render.js <folder> jd_page.html cover.html` (see "Rendering").
5. **QA**: open the PNGs and run the checklist at the end. Fix anything that fails, then re-render.
6. Hand back the PNGs and PDF, plus the plain-text copy, so the post caption can reuse it.

## Language rules (the voice)

The voice is **direct, plain, concrete and warm**. It reads like a founder talking to one person across a table, not like an HR template.

**Sentences**
- Talk to one person: "You will…", "You need…". Never "the candidate" or "the ideal applicant".
- Keep sentences short. Most are under 20 words. One idea per sentence.
- Use active verbs that start each bullet: set, sign, run, build, track, fix, decide, find, ship.
- Prefer concrete detail to adjectives. Write "live in three cities", "about ten seconds", "100 districts", never "fast-growing" or "cutting-edge".
- Give one short line of attitude per page, and no more. For example: "There is no set playbook. You will build it." or "Failures count."
- Use Indian/British spelling: organised, programme, prioritise.
- Use curly apostrophes and quotes (’ “ ”). Avoid em dashes; use a colon or a comma.

**Bullets**
- Each bullet is one line, two at most, with no sub-bullets.
- Use 4–6 bullets for "do", 4–6 for "bring", and 2–3 for "get".
- A "bring" bullet describes evidence, not a personality trait. Write "Something you have built or run yourself", not "Self-starter".
- Make each bullet different in kind: no two bullets saying the same thing in other words.

**Banned words and moves.** Rewrite these:
- rockstar, ninja, guru, superstar, passionate, dynamic, synergy, fast-paced environment, wear many hats, world-class, cutting-edge, disrupt, leverage (as a verb), ecosystem, stakeholders galore, "and more!"
- "Responsible for…", "Ability to…", "Excellent communication skills", "X+ years of experience" (state what they should have done instead)
- exclamation marks, emoji, ALL CAPS sentences, and "we are a family"
- compensation numbers, unless the hiring owner explicitly asks for them

**Headline formulas that fit the voice**
- "Build it like a founder." / "Build this vertical like a founder. We’ll back you like one."
- An outcome line with a number: "Take [thing] to [scale], and [result]."
- A support line: "A team, funding and Cars24 behind you."

**Word budget for the JD page:** about 230–300 words in the body. If the text overflows the page, cut words; don't shrink the type below the minimums.

## Section structure (JD page)

Keep this order and these exact headings, each with a trailing colon:

1. **Intro paragraph** (2–4 sentences): what the role builds or runs, why it matters, and the scale. Then one short attitude line.
2. **What you will do:**
3. **What you need to bring:**
4. **What you get:**
5. **How to apply:** the link or QR instruction, then "Any questions? Write to **email**".

If a role needs a different section, such as "Where you'll start:", keep the "What you…" pattern and stay at five sections or fewer.

## Design system

**Canvas:** 1080×1350 px, rendered at deviceScaleFactor 2. Nothing may scroll or clip.

**Colour tokens** (no others):

| Token | Hex | Use |
|---|---|---|
| brand | `#4A35FF` | cover background, header band, QR caption, CTA pill text |
| fg | `#1A1C1C` | body text and bullet dots |
| muted | `#777589` | secondary text, used sparingly |
| success | `#00AA44` | single accent in a line illustration (e.g. a green signal light) only |
| white | `#FFFFFF` | page background, text on blue |
| white at 58–92% | `rgba(255,255,255,.58–.92)` | secondary text on blue |

**Type:**
- Headings and display: **Montserrat** 600/700.
- Body: **Geist** 400/500/600, with italic 500 for the header hook.
- Both come from Google Fonts; the templates already link them.

| Element | Font | Size | Weight | Notes |
|---|---|---|---|---|
| Cover headline | Montserrat | 104px | 700 | line-height 1.04, letter-spacing −0.04em; first line at 58% white |
| Cover role line | Montserrat | 30px | 600 | 80% white |
| Cover body line | Montserrat | 34px | 600 | 86% white |
| JD title (header) | Montserrat | 70–74px | 700 | letter-spacing −0.03em |
| JD role line | Montserrat | 25px | 600 | 80% white |
| JD hook | Geist italic | 28–29px | 500 | 2 lines max |
| Section heading | Montserrat | 23–24px | 700 | ends with ":" |
| Body and bullets | Geist | 21.5–23px | 400 | line-height 1.4–1.5; **minimum 21px** |

**Layout (JD page):**
- Blue header band 300–312px tall, padded 54–56px top and 72px sides.
- On the right of the header: the logo (34px tall) with the location under it.
- Body padding is 72px at the sides.
- Bullets are 7px round dots, not default list markers.
- QR block (optional): 236px square, bottom-right at 72px/56px, with the caption "Scan to apply" in brand colour. When there's a QR code, keep the "What you get" and "How to apply" text within a 650px-wide column so it clears the QR.

**Layout (cover):**
- Full brand blue, with a soft radial glow at the top-right.
- Top row: the logo (40px) on the left; a "WE’RE HIRING" pill on the right (outline, 0.2em tracking).
- The hero sits at the bottom: role line, then the two-line headline, then the outcome line, then the support line.
- Footer: a white pill reading "Details and how to apply →" on the left, and the location on the right, above a 2px rule at 22% white.
- Optional line illustration: white strokes 4px, at most one green fill accent, top-right. Keep it simple and literal to the role (the SATARK one is a traffic signal).

**Logo:** use `assets/cfi_logo_white_t.png` (white, transparent) only on blue. Don't recolour, stretch or add effects to it.

## Rendering

The render script needs Node 18+ and Playwright (`npm i -D playwright && npx playwright install chromium`), plus internet access for Google Fonts.

```
node scripts/render.js <folder> jd_page.html [cover.html]
```

It writes `<name>.png` and `<name>.pdf` for each HTML page, plus a combined `JD.pdf` when `pdf-lib` is installed (`npm i pdf-lib`). It prints a warning if the body content runs past the page bottom.

If Playwright isn't available, use Chrome: `google-chrome --headless --screenshot=out.png --window-size=1080,1350 --force-device-scale-factor=2 jd_page.html`. For the PDF, print from Chrome with the margins set to none.

**QR code (optional):** generate it as PNG or SVG from the application link, for example with `npx qrcode -o apply_qr.png "<link>"` or Python `qrcode`. Use black on white with the default error correction. Always scan-test it with a phone before sharing.

## QA checklist

Run all of these before handing over:

- [ ] Nothing clips or overflows; the body ends at least 30px above the page bottom (or above the QR code).
- [ ] Fonts rendered as Montserrat and Geist, not the system fallback. Check the "g" and the "y".
- [ ] Only the brand colour tokens are used.
- [ ] Headings are in the exact structure order, each ending with a colon.
- [ ] Every bullet starts with a verb (in "do") or names evidence (in "bring"), and none wraps to three lines.
- [ ] No banned words, exclamation marks or salary figures.
- [ ] Every fact (cities, numbers, partners) was given by the user. Nothing is invented.
- [ ] The apply method works: the link opens and the QR code scans.
- [ ] The cover and JD page use the same role title and location.
