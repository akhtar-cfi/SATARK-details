# SATARK Pod Lead Hiring — Context Dossier

**Prepared:** 24 Sep 2026 · Compiled from Slack (#project-protect), Gmail (akhtar@crashfreeindia.org), Google Drive, the two briefing PDFs, and secondary web research.
**Purpose:** Single source of context for the SATARK Pod Lead hire. All numbers below are as reported in internal documents/Slack as of Sep 2026 (marked where they conflict).

---

## 1. What SATARK is

- **SATARK** = *Smart ANPR-based Targeting & Alert for Real-time Kaaryavahi (Action)*. Hindi for "alert / vigilant / on-guard."
- An indigenously developed, AI-powered traffic-violation enforcement suite built by **Crashfree India (CFI) × Cars24**. One ANPR camera becomes an "enforcement co-pilot":
  1. ANPR camera reads plates 24×7
  2. Live VAHAN check per scan (challans, insurance, PUCC, fitness, RC, stolen/blacklisted)
  3. Rule-engine verification against **police-set** thresholds
  4. Violations flagged on officer app + public billboard in real time (~10–11 s scan-to-flag)
  5. Interception recorded with full audit trail
- **Two components:** the public **Challan Billboard** (awareness — plate + dues on a big screen, owner identity always masked) and **SATARK proper** (enforcement — control room, officer app, one-tap actions). DPDP-compliant; targets the vehicle's record, not the person.
- Built on India's digital stack (ULIP / VAHAN).

## 2. Origin story — the Challan Billboard campaign

- **Sep 2025, Bengaluru (Trinity Circle):** India's first AI challan billboard, launched with Bengaluru Traffic Police. Display-only, went viral; covered as a first-of-its-kind DOOH/AI intervention (Media4Growth, MediaBrief, Deccan Herald "Big boss watching" etc.). Compliant vehicles were also acknowledged on-screen.
- **Apr–May 2026:** Billboard evolved into a platform — live records, police-set rules, officer app, control room.
- **Jun 2026, Jaipur (Rambagh Circle):** First full deployment; police interception begins. Went viral (156+ organic posts in week one). IG Jaipur later asked for AI billboards at toll booths.
- **Jul 2026, Gurugram (Sohna Chowk):** First *owned* billboard — Cars24 CSR-funded, police-owned. Trended on X before it was even formally inaugurated.
- **Aug 2026:** Installation underway in Pune, Rajkot, Gandhinagar (+ Trivandrum). **Supreme Court describes SATARK's exact mechanism** (see §4).
- Internal framing (Founder Brief): *"A billboard became a platform. Now we take it to 100 districts."*

## 3. Where SATARK stands (Sep 2026)

Numbers differ slightly by doc date; latest Slack update (Yuvraj, 22 Sep) in bold:

| Metric | Briefing deck (mid-Sep) | **Slack 22 Sep** |
|---|---|---|
| Vehicles scanned | 5,44,661+ | **678,720+** |
| Vehicles with pending challans | 1,03,806+ | **2.5 lakh+** (likely counts differently — verify) |
| Pending dues identified | ₹53.15 Cr+ | **₹65 Cr+** |
| Police interceptions | 600+ | **700+** |
| PUCC-expired vehicles | 39,085+ | **43,085** |
| Insurance-expired vehicles | 16,534+ | **18,635** |

- **Live (billboard + SATARK):** Jaipur, Bengaluru, Gurugram. Only **Jaipur is actively intercepting**; Bengaluru & Gurugram are billboard-first, interception "soon."
- **Installation WIP:** Pune (billboard installed; challan-data integration delayed by "One Nation One Challan" migration with NIC), Rajkot (MoU signed in **9 days** — fastest ever), Gandhinagar, Thiruvananthapuram (Kerala Transport Minister personally supportive).
- **Ahmedabad:** Police NOC received, municipal permission pending. **Hyderabad: deliberately on hold** — ongoing challan-data litigation against us there; team decided not to open another challan conversation in the South until 5–6 southern cities are closed.
- **Pipeline meetings:** Vizag, Chennai, Bhubaneswar, Kolkata, Delhi, Guwahati, Thane, Surat, Faridabad, Ghaziabad. Tamil Nadu being pursued top-down (CM's Road Safety Mission, ~₹500 Cr/yr announced). Delhi: letter sent to Commissioner "on behalf of Gadkari sir"; Vikram met Delhi CM (early Sep).
- Showcase case: one vehicle scanned with **92 challans / ₹13.27 lakh pending**; Jaipur repeat offender with 32 overspeeding challans; scan-to-interception in ~1 minute.

## 4. The mandate (why now)

- **Supreme Court, 4 Aug 2026** — *National Insurance Co. v. Thungala Dhana Laxmi*, 2026 INSC 793:
  - On record: **56% of registered vehicles uninsured** (16.54 Cr of 30.48 Cr); **22% of crashes involve an uninsured vehicle**.
  - Two binding directions (through MoRTH & IRDA): (1) ANPR cameras linked to VAHAN + Insurance Information Bureau issuing automatic e-challans to uninsured vehicles; (2) every state police force to get handheld devices/apps with live VAHAN + insurance data.
  - Internal read (Deepanshu): *"The Court described a solution we deployed in June 2026."* Bench on 19 Aug: "The pilot project may be started from Delhi." Only ~7 states have begun e-detection.
- Broader problem framing: ~1.7–1.75 lakh road deaths/yr; **64% of e-challan value since 2015 unpaid (₹42,000 Cr+)**; case studies of ignored prior violations ending in mass-fatality crashes (Jaipur Sikar Rd dumper 14 dead; Kurnool NH-44 bus fire 19 dead; Jhansi Creta 2 dead).
- Second thread: Motor Vehicle Accident Fund (Sec 164B MVA, never operationalised) push for victims of uninsured vehicles — CFI's Post-Crash Justice work; "prevention and justice, one position."

## 5. The 2027 plan (from the Founder Brief, Sep 2026)

- **Vision: all 100 high-fatality districts (MoRTH's own Top-100 list) live by Dec 2027.**
- Milestones: **Mar 2027** — 25 districts connected, 15 intercepting, 8 states signed, 25 billboards, 2,500 interceptions. **Dec 2027** — 100 districts connected, 60+ intercepting, 60 billboards, first 100-district report to MoRTH. **Mar 2028** — 500 monitoring points, 100 billboards ("the stake in the ground" — Vikram's repeated 500/100 ask in Slack).
- **The pod:** standalone pod inside CFI + Cars24 with its own targets, pipeline, weekly rhythm. 3 full-time BD people — Yuvraj + **2 hires, in seat by mid-Oct**. Engineering stays with Aquib's cell, installations with Vipul's team, comms in-house. **Pod Lead works closely with Pushkal (Cars24).**
- **Channel strategy — batches, not door-to-door:** MoRTH advisory naming its own districts + state MoUs (5 states hold 67 of the 100 districts); CM/Minister/Governor doors via Vikram, Ruchit, Gajju, Dhoni; police-to-police referrals (proven: Rajkot 9 days); transport departments (Kerala came this way); district administration (Collectors/DRSCs, Smart City control rooms, toll plazas); partner NGOs & CSR partners.
- **Deployment modes (A–F):** enforcement rides state cameras (A, zero capex) or our camera ~₹2 lakh (B); billboard owned (C, ₹30–33 lakh + ₹9–11.5 lakh/yr maintenance), donated slot (D), co-funded (E), rented bridge (F, ₹2–3 lakh/mo — Bengaluru today). Computing opex ₹2–5 lakh/city/yr ≈ ₹5 Cr/yr at 100 districts. Billboard permission never gates enforcement go-live.
- **Four operating shifts:** (1) one full-time owner end-to-end (this hire); (2) new talent pool — public-service-minded ex-UPSC founders; (3) CSR partners share capex+opex (adopt-a-district); (4) volunteer ground force per state seeded from Rakshak alumni.
- **Four learnings that shaped it:** virality opens doors but interception changes roads; once police see it work they pull us in; warm beats cold every time (cold letters to 20 cities in March produced ~nothing); "installed" ≠ "enforcing."
- **Key constraint named repeatedly:** not demand — *boots on the ground*. Yashvardhan: deployment = ~4 permission sets × 3–4 visits each; scaling stalls because the same 2–3 people travel. Vikram pushing hard for an explicit, aggressive goal to work backwards from ("500/100", "goal has to feel impossible").
- Funding questions still open: Ruchit (22 Sep email) asked how much funding 100 districts needs and how to diversify sources (OEM/insurer CSR). Insurance-company CSR flagged by Deepanshu as a strong bet post-SC order. Economics pitch to govts: <0.7% of identified recoveries (~₹1.06 Cr) runs SATARK for a year; department keeps 100% of recoveries; zero cost to department (asks: approvals, locations, an officer POC + thresholds).

## 6. The hire — SATARK Pod Lead

**Source doc:** "SATARK Pod Lead – the person we are looking for" (Deepanshu, internal note, Sep 2026).

- One person to lead the SATARK pod, **treating SATARK as their own startup** — founder mindset, not an assigned project.
- **The job:** take SATARK to more districts — meet police officers, transport officials, ministries; convince them to adopt; stay until it goes live. Looks like BD on paper, but *isn't*: officials disengage if they feel sold to; they must see genuine intent to reduce road deaths, subject command, and persistence.
- **Looking for:** high agency + ownership (has run something of their own — a failed startup is a plus); public-service mindset (UPSC background "would make me happy," but mindset > exam); sharp/diligent/sincere (reads court orders, notifications, police procedures; follows up for months unprompted); above all mission-driven.
- **Not looking for:** a typical corporate/sales hire who treats government as a client to close, or someone needing a weekly plan handed to them. Must handle both speeds: Rajkot 9 days, Pune 5 months, Chennai still stuck.
- **Practicals:** based Gurugram, heavy travel, join by mid-October. Referrals direct to Deepanshu.
- **User's added criteria (Akhtar, this session):** exploring **UPSC final-stage non-recommended candidates** — did well in UPSC but with solid extracurriculars; personality, ability to sell/convince; explicitly *not* "nerdy" toppers.
- **Process status (as of 22–24 Sep):** interview process has begun (Gajju's email, 22 Sep). Deepanshu + Gajju to work with Pushkal to find the person. Gajju shared a Google Sheet **24 Sep**: *"UPSC 2024 Candidate Project Hiring – Sample of 100"* — 100 CSE (Main) 2024 candidates from **UPSC PRATIBHA Setu** with percentile (~99.8+), optional subject, education, employment/compensation history, contact details, "Project-Fit Tags", all currently **Unreviewed**; note says "Candidate-provided contact; review before outreach."
  - Sheet: https://docs.google.com/spreadsheets/d/19FlMGdoHcPLSUP0k5_5_4tQrjeO-iZfEULu1rdoBRN0
  - **PRATIBHA Setu** (verified via web): UPSC's official portal (ex-Public Disclosure Scheme) giving registered employers biodata of *non-recommended* candidates who cleared all exam stages but missed the final merit list; 10,000+ candidates listed. Exactly the "final-stage rejects" pool Akhtar described.

## 7. Who's who (for the hiring loop and pod context)

| Person | Org / role (as seen in comms) | Relevance |
|---|---|---|
| Deepanshu Gupta | CFI (deepanshu@crashfreeindia.org; also cars24 IRSC id) | Wrote the Pod Lead note; SATARK strategy lead; hiring owner |
| Gajendra "Gajju" Jangid | Cars24 co-founder/CMO | Hiring co-owner; shared UPSC-100 sheet; pushes positioning beyond "challan" |
| Pushkal Arora | Cars24 | Pod Lead will work closely with him; hiring loop member |
| Vikram (Chopra) | Cars24 founder/CEO | Goal-setter (500/100), political doors, wants aggressive backward-planning |
| Ruchit Agarwal | Cars24 co-founder/CFO | Funding questions, mainstreaming/product ideas, political doors |
| Yashvardhan Verma | Cars24 | On-ground BD (Kerala minister, Rajkot MoU, Ahmedabad); 100-district charter author |
| Yuvraj Yadav | CFI | SATARK ops/BD workhorse — city updates, police trainings; stays in pod as BD |
| Vipul Setia | Cars24 | Channel creator; installations team; weekly Project Protect tracker |
| Akshay Manchanda | Cars24 | MoRTH open-letter, policy support |
| Aquib Usmani | Cars24 | Engineering cell |
| Mohit Yadav, Pooja Jena, Mohammed Ahamed, Prachi Sharma | Cars24 | Ground execution (Gurgaon/Pune installs, Bengaluru fixes, city relationships) |
| Akhtar Hussain | CFI (user) | Running this hiring workstream; IIT Delhi 2020 alum |
| Shubham Kumar, Aastha Shreeharsh | CFI | Ops/partnerships; Aastha flagged ITS India Congress (7–8 Oct, Bharat Mandapam) for Yuvraj |

Slack: **#project-protect** (private, C09AR438E21, created Aug 2025 by Vipul). Master tracker sheet + live dashboard (setiavipul-78.github.io/project-protect-dashboard) exist.

## 8. Hiring-relevant tensions & signals (my read)

1. **JD vs. pool tension:** the note asks for *founder energy + selling ability*; PRATIBHA Setu guarantees exam-proven diligence and public-service signalling but **not** agency/sales. The screen must filter hard for "ran something of their own" + extracurricular leadership — exactly Akhtar's "not nerdy, can convince" bar. The sheet has "Leadership Evidence / Sports-NCC / Interests" columns for this.
2. **Timeline is tight:** in seat by **mid-October** — ~3 weeks from today. Process design must be fast (the org already moves fast: Narayan's Jaipur Sr. Associate loop went assignment → final interview in 24h).
3. **Two hires, not one:** the plan says Yuvraj + *two* hires (Pod Lead + one more BD?) — worth confirming scope: is this loop for one Pod Lead only?
4. **Comp benchmark reality:** sample candidates include a Visa Senior PM at ₹4.4L/month and a CAM associate — the pool spans ₹56k–₹4.4L/month current comp. CFI nonprofit comp vs. mission trade-off will be a live negotiation issue.
5. **What the role actually needs day 1:** MoRTH advisory push, 5-state MoU math, Pune unblock, Bengaluru/Gurugram interception start, TN/Delhi top-down plays — i.e., government navigation stamina more than classic BD.
6. **Cultural bar:** Vikram wants an "impossible-feeling" goal and backward-working; Deepanshu wants patience through 5-month cycles. The candidate must survive both.
7. **Outreach compliance:** sheet marks contacts "review before outreach" — outreach messaging should respect PRATIBHA Setu's employer norms and be mission-led (these candidates get generic govt/PSU spam; a road-deaths mission note from a founder will stand out).

## 9. Secondary research pointers (external)

- Bengaluru campaign coverage: [Media4Growth showcase](https://www.media4growth.com/showcase/campaigns/bengalurus-ai-billboard-by-cars24-puts-traffic-violations-on-the-big-screen-79885), [Media4Growth brand insight](https://www.media4growth.com/brands-markets/brand-insights/when-ai-met-the-streets-how-cars24s-bengaluru-billboard-turned-technology-into-accountability-80419), [MediaInfoline](https://www.mediainfoline.com/ooh/indias-first-ai-billboard-by-cars24-puts-traffic-violations-on-the-big-screen), [MediaBrief](https://mediabrief.com/cars24-puts-traffic-violations-on-the-big-screen/), [AckoDrive](https://ackodrive.com/news/ai-powered-billboard-in-bengaluru-names-and-shames-drivers-with-pending-challans/), [Daily Jagran](https://www.thedailyjagran.com/auto/bengaluru-traffic-police-initiates-pilot-program-to-shame-violators-with-pending-fines-complete-details-inside-10269489)
- Jaipur: [YouTube short — "Jaipur's Most Unexpected Billboard"](https://www.youtube.com/shorts/jNVGkEs0yHI); Jaipur is also scaling AI-ITMS citywide after a Rambagh Circle trial ([Pinkcity Post](https://www.pinkcitypost.com/jaipur-to-roll-out-ai-traffic-signals-at-253-intersections-after-successful-rambagh-circle-trial/)) — a complementary govt push worth citing in Rajasthan conversations.
- PRATIBHA Setu: [UPSC portal](https://upsconline.gov.in/miscellaneous/pdoiac/), [Deccan Herald](https://www.deccanherald.com/business/jobs-and-careers/upsc-launches-pratibha-setu-to-connect-top-talent-with-employers-including-private-sector-2-3705451), [The Secretariat](https://thesecretariat.in/article/upsc-pratibha-setu-2nd-chance-for-talent-helping-hand-for-recruiters)

## 10. Key internal artifacts (links)

- Pod Lead note (live doc, edited 23 Sep): https://docs.google.com/document/d/1Fi9fc9mcbA4L9aX2IpgYNXc5dlmuOT5Wz3tCtiqMkgw
- SATARK Founder Brief — Option A (the vision/operating plan): https://docs.google.com/presentation/d/1DUF8AGY_Z56ExuE7Z6cqoDAfhCwIW1c6e8oje9dKyrs
- SATARK Briefing Deck (city-pitch version): https://docs.google.com/presentation/d/1tJr1hGch5MqoDlNKeGbEvc6p8XOjNsUcfl0pmzyAMKA
- SATARK – Sep common (Yuvraj, 23 Sep): https://docs.google.com/presentation/d/1yGFrn53C8Tmewt0ZVv76GGYyCzCLxbXsvNOM7LTeSEo
- NRSTC 2026 jury deck: https://docs.google.com/presentation/d/1V9ecWTeINncc27HjwOKxIH8xTluf7j5-SdEnRT2QljE
- UPSC-100 candidate sheet: https://docs.google.com/spreadsheets/d/19FlMGdoHcPLSUP0k5_5_4tQrjeO-iZfEULu1rdoBRN0
- Gajju's async update email thread: "Re: Satark<>Operating Plan" (22 Sep)
- Project Protect master tracker: https://docs.google.com/spreadsheets/d/1xWP7qiEIYX4VQPqE0-pqhN4IeETvMoqm6yNRAmd9YxM

---

*Caveats: figures are as internally reported and not independently audited; the scanned/challan-count discrepancy between the deck and the 22-Sep Slack update should be reconciled before external use. Slack history read covers #project-protect from 18 Jun 2026 to 22 Sep 2026 in full; earlier messages exist beyond that page.*
