# cfi-jd-design (Claude skill)

Design and language system for Crashfree India JDs, matching the SATARK "Builder" JD. You bring the role; the skill handles the look, the voice, rendering and QA.

## Install
- **Claude (claude.ai / desktop app):** upload `cfi-jd-design.zip` as a custom skill. The skills setting is under Settings → Capabilities; the exact menu may vary by plan.
- **Claude Code:** unzip into `~/.claude/skills/cfi-jd-design/` (personal) or `.claude/skills/cfi-jd-design/` inside a repo.

## Use
Ask Claude something like: "Use cfi-jd-design to make a JD for <role>. Here are my notes: …". It will ask for anything missing, write the copy in the house voice, fill the templates and render PNG + PDF.

## Contents
- `SKILL.md`: the rules (voice, structure, design tokens, QA checklist)
- `templates/cover.html`, `templates/jd_page.html`: 1080×1350 layouts with `{{PLACEHOLDERS}}`
- `assets/cfi_logo_white_t.png`: the white logo for blue backgrounds
- `scripts/render.js`: Playwright render to PNG (2×) and PDF
- `examples/`: the SATARK Builder cover and JD page, as the reference look
