# SATARK Pod Lead — Screening Method & Rubric

**Note on data location:** the actual candidate-level screening (names, rolls, flags, rationale, LinkedIn results) lives in Google Drive — *"SATARK Pod Lead - Candidate Screening (89 bios reviewed) - 24 Sep 2026"* — NOT in this repository. The source data comes from UPSC PRATIBHA Setu under an internal-review-only restriction, so candidate PII is deliberately kept out of git/GitHub. This file documents only the method, so the next screening pass is repeatable.

## Sources used
1. Gajju's sheet "UPSC 2024 Candidate Project Hiring – Sample of 100" (84 usable rows in export).
2. The bio-PDF folder Gajju uploaded (89 individual PRATIBHA Setu biodata PDFs). **Critical:** the sheet's Leadership / Sports / Extracurricular / Awards columns are empty — that data exists only in the PDFs, and it is exactly what the Pod Lead profile screens on. Every candidate's full bio was read.
3. Web/LinkedIn lookup for the top tier (method in `../tools/linkedin_lookup.py`).

Reconciliation: 89 bios vs 84 sheet rows — 6 candidates exist only as bios (flagged in the Drive sheet), 1 sheet row (Aayush G Patel) is malformed and has no bio (data gap; re-pull from portal).

## Rubric (from Deepanshu's Pod Lead note + Akhtar's criteria)
Screen for, in order of weight:
1. **Agency/ownership** — has run something of their own: founder, self-employed practice, fest head-coordinator with real scale, campaign organiser. Failure counts as a plus.
2. **Public-service intent beyond the exam** — sustained volunteering (years, not events), NSS/NCC depth, service-track choices (CDS/state services attempted), community organising.
3. **Personality/persuasion** — debate/moot wins, dramatics, anchoring, stand-up, sports captaincy, MUN/TEDx organising. The "can sell without smelling of sales" proxy.
4. **Diligence with government material** — law background, work inside government, reading-heavy roles.
5. **Gettability** — current employment (serving officers in other services = low), comp anchor, location, likely CSE-2027 attempt.

## Flags
- **GREEN** — wave-1 outreach now (16 candidates).
- **ORANGE+** — wave-2 / strong second-BD-seat candidates (15).
- **ORANGE** — real signals but a gap on agency, persuasion, or gettability (34).
- **RED** — insufficient signal *for this role* from bio + sheet (23). Not a merit judgment; several carry notes like "state volunteer network candidate." Enrich via LinkedIn before final discard if the funnel runs dry.
- **DATA GAP** — 1.

## Known limits
- Bios are self-reported to UPSC; nothing is verified. Claims (founder roles especially) must be probed at Gate 1 and verified on LinkedIn.
- "No employment" rows often mean full-time preparation, not low agency — the extracurricular record carries the burden for them.
- Serving-officer gettability calls are assumptions, not facts; one honest phone call beats the flag.
