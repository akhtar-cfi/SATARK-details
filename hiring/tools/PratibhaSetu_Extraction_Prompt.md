# Prompt — PRATIBHA Setu batch extraction → Google Sheet (SATARK Pod Lead)

Give everything inside the fence to a browser-capable AI (e.g. Claude in Chrome / Cowork with Google Drive access).
Fill the three `[…]` placeholders first. No candidate data belongs in this repository — the output lives in Drive only.

```
ROLE
You are helping Crashfree India (a Cars24 road-safety commitment) screen UPSC candidates for one role: the SATARK Pod Lead ("Founding Role"). Crashfree India is a registered employer on UPSC's PRATIBHA Setu portal. Your job: pull the next batch of candidate profiles from PRATIBHA Setu, put them into a Google Sheet in exactly our existing format (plus more detailed columns), score them with our rubric, and report back. Accuracy beats speed.

INPUTS
- Portal: PRATIBHA Setu, open in my Chrome and already logged in as our employer account. If the session is logged out, STOP and ask me to log in — never type passwords or OTPs yourself.
- Batch to pull: [BATCH FILTER — e.g. "CSE 2024 interview-stage candidates not yet in our master sheet, first 100"]
- Batch label: [BATCH LABEL — e.g. "Batch 2 – 27 Sep"]
- Existing master sheet (format reference + dedup source): https://docs.google.com/spreadsheets/d/1wCWMMaAI901f1eVd4N2VeG65Rz5uDBMfMtvJSjZFTm0/edit — first tab = master list.
- Scoring rubric reference: https://docs.google.com/spreadsheets/d/1nGJl2IHnWE57ricU0V-2Kms1HG6ajPpJR4DHQj_kQx8/edit
- Drive hiring folder (for bio PDFs): https://drive.google.com/drive/folders/1B5WvK3x3aDOVA1Ak5UWTj7ndGDIxQzuG
- Optional notes on this batch: [ANY SPECIAL INSTRUCTIONS]

GUARDRAILS (non-negotiable)
1. Use only my logged-in session. Do not bypass logins, CAPTCHAs, rate limits or access controls. If the portal shows a warning, a CAPTCHA or blocks you, stop and tell me.
2. Go at a human pace (a few seconds between profiles). No parallel tabs hammering the portal.
3. Candidate data is for internal review only. Put it ONLY in the Google Sheet and Drive folder below. Never paste it into any other site, tool or chat, and never email, message or call a candidate.
4. Do NOT record: caste/category, religion, disability status, marital status, parents'/family details or income, photos, date of birth (age is enough), home address.
5. Never guess. If a field is not in the bio, write "Not in bio". If two sources disagree, keep both and note it in "Contradictions / Oddities". Never invent a LinkedIn URL.

STEP 1 — RECON (then pause)
- Explore how the portal lists candidates (filters, pagination, profile page, "view/download biodata"). If the portal offers an Excel/CSV export of the list, use it — it is faster and more accurate — and still open every biodata for the details the export lacks (leadership, activities, awards etc. usually live only in the biodata).
- Read the master sheet's first tab. Collect every Roll number already there. Those candidates are SKIPPED (no duplicates).
- Tell me: how many candidates match the batch filter, how many are new after dedup, and how the portal is structured. Then extract the first 3 new candidates fully (Step 2 + Step 3) and show me those 3 rows. WAIT for my OK before doing the rest.

STEP 2 — EXTRACT (every new candidate)
- Open the profile + biodata. Save the biodata PDF to a new Drive folder inside the hiring folder named "PRATIBHA Setu bios – [BATCH LABEL]", file name "<Roll> – <Name>.pdf". Link it in the sheet.
- Fill every column in the spec below from the bio (and export, if any). Keep a running count.

STEP 3 — SCORE (same model as the master sheet)
Five sub-scores, 1–5 each, from the full bio:
- Agency /5 (30%) — has run something of their own. 5 = founded/ran an independent entity with real stakes (startup, own legal practice, own platform). 4 = led a large operation end to end (fest overall/head coordinator at real scale, gen sec, founded a club or campaign). 3 = real but bounded leadership inside someone else's structure (secretary, team/project lead). 2 = participation-level (member roles, one-off events). 1 = academic record only. Failure counts as a plus.
- Persuasion /5 (25%) — can they hold a skeptical officer's room without sounding like sales. 5 = elite competitive persuasion or professional performing (Jessup-level moots, stand-up, championship debate). 4 = sustained stage/argument record (debate wins, dramatics, anchoring, editor-in-chief, MUN leadership). 3 = some public-facing signal (quizzing, teaching, convincing roles). 2 = faint. 1 = none.
- Mission /5 (20%) — public-service intent beyond the exam. 5 = years-long service record or service-track choices (NSS campaign leadership, CDS/state-service selections, disaster/COVID-response leadership). 4 = repeated multi-year volunteering or chose impact-sector work over corporate. 3 = regular but episodic. 2 = one-off. 1 = nothing beyond the exam attempt.
- Govt-Domain /5 (15%) — literacy with government material/process. 5 = worked inside government on transport/infrastructure. 4 = serving officer, practising lawyer, or policy work (NITI Aayog, ministries). 3 = govt internships; law/PubAd education with real engagement. 2 = exam-level exposure only. 1 = none.
- Execution /5 (10%) — professional delivery. 5 = 5+ years progressing in demanding roles. 4 = 3–5 solid years or high-responsibility delivery. 3 = 1–3 years real employment. 2 = internships/short stints. 1 = no employment record. (Lowest weight on purpose: "no employment" here usually means full-time preparation.)
- Willingness /5 (kept separate) — odds they'd take this seat now, inferred from employment status, comp and location. 5 = available, no anchor, this is a step up. 4 = available with a mild anchor (city, recent exit). 3 = employed in private/impact sector, poachable on mission + comp. 2 = permanent govt post or heavy comp anchor. 1 = serving civil/uniformed service, or ₹4L+/month comp.
Formulas (round to whole numbers):
- Fit /100 = (0.30×Agency + 0.25×Persuasion + 0.20×Mission + 0.15×Govt-Domain + 0.10×Execution) / 5 × 100
- Overall /100 = 0.7×Fit + 0.3×(Willingness×20)
- Priority = rank by Overall, highest = 1.
Flag (judgment, guided by the numbers; one-line reason goes in Key Signal / Concerns):
- GREEN ≈ Fit 65+ with Agency or Persuasion ≥4 and Mission ≥3 — reach out first.
- ORANGE+ ≈ Fit 55–70, strong on some axes with a clear gap.
- ORANGE ≈ Fit 40–60, real signals but a gap on agency, persuasion or gettability.
- RED ≈ Fit below ~42 or not enough signal FOR THIS ROLE (not a merit judgment).
- DATA GAP = biodata missing/unreadable.
Wave / Action (exact text):
- GREEN → "Wave 1 — email now" if Willingness ≥3, else "Wave 1 — call first (gettability)"
- ORANGE+ → "Wave 2"
- ORANGE → "Wave 3 / bench" if Willingness ≥4, else "Hold — serving / low gettability"
- RED → "Skip for this role"
- DATA GAP → "RE-PULL — roll <Roll>"

STEP 4 — LINKEDIN (GREEN and ORANGE+ only)
Search the web for "<Name> <institute> LinkedIn". Write "CONFIRMED — <handle>" only if at least two facts match the bio (institute + year, or employer). If plausible but unproven: "VERIFY — <url>". If nothing: "To be checked". Never guess a URL.

OUTPUT SHEET
- In the master sheet, add a NEW tab named "[BATCH LABEL]" placed AFTER the first tab (the first tab must stay first — an automatic outreach tracker reads it). Do not edit the first tab or any other existing tab.
- Row 1 = headers. One row per candidate. Sort by Overall, descending.
- Part A = columns A–AF, EXACTLY the first 32 columns of the master tab, same names, same order, same value style (so reviewed rows can later be pasted straight into the master tab):
  A Priority | B Flag | C Wave / Action | D Name | E Roll | F Gender (M/F) | G Age | H Degree (highest/most relevant, short) | I Institute | J Grad Year | K Stream (Engineering / Humanities / Law / Medical / Commerce & Account & Economic / Science) | L Optional Subject | M UPSC %ile | N Employment Status (Available / preparing · Employed (private/impact) · PSU/bank · Serving govt · Self-employed · Check in call) | O Current / Last Role ("Designation, Organisation" or "None") | P Last Comp (as in bio, e.g. "₹92,000/month"; several → "; ") | Q Location Anchor (city/state only if the bio shows a tie; else blank) | R Key Signal (from bio) (one line, the strongest evidence for this role) | S Concerns / Probe in Call (one line) | T Gettability (HIGH / MEDIUM / LOW-MED / LOW / VERY LOW, optional " - reason") | U Agency /5 | V Persuasion /5 | W Mission /5 | X Govt-Domain /5 | Y Execution /5 | Z Fit /100 | AA Willingness /5 | AB Overall /100 | AC Biodata PDF (=HYPERLINK(url,"Bio PDF")) | AD LinkedIn (=HYPERLINK(url,"CONFIRMED — handle") or "To be checked") | AE Email | AF Mobile
- Part B = detailed bifurcation, starting at column AG, in the same broad order (identity → education → exam → work → activities → meta):
  Identity: Home State · Current City · Languages
  Education: Class 10 Board · Class 10 % · Class 12 Board · Class 12 Stream · Class 12 % · UG Degree · UG Institute · UG Year · UG Score · PG Degree · PG Institute · PG Year · PG Score · Other Qualifications (NET/JRF, CA, CFA, certifications)
  Exam: Exam & Year · Stage Reached · Attempts (if shown) · Medium of Exam
  Work: Current Employer · Current Designation · Sector (Govt / PSU / Private / Impact-NGO / Self / None) · In Role Since (MM/YYYY) · Total Work Experience (yrs) · Previous Roles ("Org — Role — yrs" separated by " | ") · Govt / Public-Sector Exposure (what, where)
  Activities: Founded / Ran (entity, scale, outcome) · Leadership Positions · Debate / Moot / Stage / Anchoring · Sports (level) · NSS / NCC / Volunteering (cause, years) · Awards & Honours · Publications / Research · Road-Safety or Transport Signal (Y/N + detail) · Hobbies & Interests
  Meta: Bio Completeness (Full / Partial / Missing) · Contradictions / Oddities · Source (Export / Bio PDF / Both) · Extracted On (date)
- Formatting: bold header; freeze row 1 and columns A–D; filter on all columns; wrap text in R, S and all Part B text columns; sensible column widths; fill each row by Flag — GREEN #D9EAD3, ORANGE+ #FCE5CD, ORANGE #FFF2CC, RED #F4CCCC, DATA GAP #D9D9D9; scores centred.
- Below the table (leave 2 blank rows), a small reconciliation block: candidates matching filter · already in master (skipped) · new extracted · bios missing/unreadable (list rolls) · rows by Flag.

STEP 5 — CHECK, THEN REPORT
Before reporting: (a) reconcile by Roll number, not by counting rows — every new roll from the portal must appear exactly once; (b) spot-check 5 random rows against their bios; (c) confirm no roll from the master tab was re-added; (d) confirm formulas: Fit and Overall match the sub-scores.
Then reply with: the tab link; counts per Flag; the top 10 by Overall (Name, Flag, one-line reason); any gaps, blocks or oddities; and anything you were unsure about. Keep it short.
```

## Notes for Akhtar
- The AI pauses after the first 3 rows for your OK — remove that line from STEP 1 if you want it fully hands-off.
- The new tab goes *after* the master tab on purpose: the outreach tracker script reads the first tab that has Name + Email headers.
- Part A matches the master's first 32 columns exactly, so the best rows can be copy-pasted into the master tab later and the tracker will pick them up.
- I don't know PRATIBHA Setu's exact screens or whether it offers an export — STEP 1 makes the AI find out and report before extracting.
