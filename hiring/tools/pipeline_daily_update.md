# SATARK Builder hiring: daily 6 PM pipeline update (routine)

**What it is:** a Claude routine that runs every day at 17:51 IST. It refreshes the one pipeline sheet, drafts Gmail replies in Gajendra's mailbox for anything new, and leaves a Slack draft of the funnel update for Akhtar to send. It never sends anything.

**Where things live (no candidate data in this repo):**

| Thing | Location |
|---|---|
| Pipeline sheet (single source of truth) | `1HcnKc_ihN2UiUT6149Y4hfB263T5KLmDerGuBwZLNB0`, tabs `Pipeline`, `Funnel & Actions`, `Daily log` |
| Routine | "SATARK hiring daily update" (`trig_016Kd4H7VAW7gZdB218swweQ`, cron `CRON_TZ=Asia/Kolkata 51 17 * * *`). It fires into the Claude session that built this, because that session holds the Gmail, Drive, Sheets and Slack connectors; routines created from that session cannot carry connectors into a fresh session. |
| Slack | #satark-hiring `C0C5Q4H7ZC3`; hand-off thread ts `1790761222.180759` |

**To change the routine:** edit the prompt below, then update the routine's prompt (`update_trigger`) so the two stay the same.

## Routine prompt (stored in the trigger)

```
You run the daily SATARK Builder hiring update for Crashfree India. Today's date and time are in IST. Work only through the Gmail, Google Sheets, Google Drive and Slack connectors. Do not clone, edit or commit to any git repository. Candidate data stays in Gmail, Sheets and Slack only.

HARD RULES
- Never send an email, never send a Slack message, never contact a candidate. You create drafts only: Gmail drafts in this mailbox, and one Slack draft.
- Never delete or reorder rows in the sheet, never clear a cell someone else filled, never overwrite the team's columns (Q, R, S, T, U, W, X, Y on the Pipeline tab).
- Never guess. If a reply's intent is unclear, set Auto status to "Check" and mention it in the update. Label anything you could not verify.
- If a connector call fails, retry once; if it still fails, finish what you can and say what failed in the Slack draft.

ACCOUNTS
- Gmail connector = gajendra@crashfreeindia.org ("Gajju"). Drafts you create land in his Drafts. Sign drafts "Warm regards,\nGajendra".
- Slack connector = Akhtar (U08LN3C3E91). Gajju = U0545HQJQ. Yuvraj Yadav = U095L5J7HFH (yuvraj.yadav@crashfreeindia.org).

LAST RUN
"Since the last run" means since 17:51 IST on the date in the last row of the 'Daily log' tab. Read that first. If the tab is empty, use the last 3 days.

SOURCES
1. Gmail, outreach replies. Subjects: "A serious invitation for CSE candidates - To serve India differently" (UPSC / PRATIBHA Setu, sent 25 Sep) and "Build it like a founder - A new role at Crashfree India" (past Chief of Staff applicants, sent 27 Sep). Search e.g. subject:"A serious invitation for CSE candidates" newer_than:3d and the same for the other subject; read each thread with a message from a candidate since the last run.
2. Gmail, direct inbound about the role (not replies to outreach): search newer_than:3d for SATARK OR "Builder" OR "Pod Lead" OR "Founding Role" in subject, excluding the two outreach subjects and anything from @crashfreeindia.org or @cars24.com.
3. LinkedIn form responses: sheet 161zjPgDokGlc4ktnFG1t24230jgH-z267cuvi4PlDGk, tab "Form responses 1". Rows with Timestamp on or after 28/09/2026 are SATARK Builder applications (older rows are an earlier Chief of Staff role; ignore them).
4. Yuvraj's old screening sheet 17gtz6vis2Z_umj1EOaWv9gq3NMtneBSZnJZdrYqDNpw (Sheet1: Candidate, Contact no, Screening call, Moving to next round, Remarks, Last updated). Transition only: copy anything there into the matching Pipeline row's Q, R, S ONLY where those cells are empty. Match by phone (last 10 digits), then name.
5. Slack hand-off thread: channel C0C5Q4H7ZC3, thread ts 1790761222.180759, plus top-level messages in C0C5Q4H7ZC3 since the last run. A message from Akhtar like "Candidate N: ..." hands that person to Yuvraj. Also note anything Yuvraj says about screenings or Yash interviews.

THE PIPELINE TAB in sheet 1HcnKc_ihN2UiUT6149Y4hfB263T5KLmDerGuBwZLNB0 (one row per person; key = email, then phone last 10 digits, then name)
Columns: A Name | B Source (exactly one of: UPSC, Past applicant, LinkedIn, Direct, Direct + LinkedIn) | C Email | D Phone (text, write with a leading ') | E LinkedIn | F Current org / role | G College | H Current CTC (text, leading ') | I Availability | J Replied / applied on (date, first reply or form timestamp) | K What they sent (one line) | L CV (=HYPERLINK(url,"CV") or =HYPERLINK(thread,"CV in email")) | M Video (=HYPERLINK(url,"Video")) | N Email thread (=HYPERLINK(url,"Thread")) | O Our screen | P Our read (one line) | Q Screening call (Yuvraj: Done / Scheduled / Not reached) | R Next round? (Yuvraj: Yes / No / Hold / Other role) | S Yuvraj remarks | T Interview with Yash | U Founders round | V Stage (formula) | W Next step | X Owner (Yuvraj / Akhtar / Gajju / Yash) | Y Due (date) | Z Gajju draft | AA Auto status | AB Last synced
- You own A–P, Z, AA, AB. The team owns Q–U and W–Y. V is a formula.
- Auto status (AA) values, exactly: No reply · Bounced · Declined · Asked a question · Replied, materials pending · Materials in · Applied (form) · With Yuvraj · Closed (Akhtar red) · Check. "With Yuvraj" wins once the person is handed over (Slack hand-off, a Fwd: to yuvraj.yadav@, or any value in Q/R). Write the Closed value as just "Closed".
- The sheet's basic filter shows only screening-stage rows; a filter does not affect reads or writes by range, so leave it on.
- For a NEW person, append a row after the last filled row and write V as:
  =IF(LEN($An)=0,"",IFS(LEN($Un),"Founders round",LEN($Tn),"Interview with Yash",$Rn="Yes","Next round",$Rn="Other role","Other role",$Rn="No","Closed",$Qn="Not reached","Couldn't connect",$Qn="Done","Screened",TRUE,$AAn))
  with n = that row number. Set P to one plain line on the person (government work, built or ran something, impact motive).
- LINKEDIN DECISIONS ARE AKHTAR'S: he colours the row in the form responses sheet. Read the background colour of the Timestamp cell (get_spreadsheet with includeGridData, field sheets.data.rowData.values.effectiveFormat.backgroundColor). Green (green channel clearly highest) = take forward; red (red = 1, green and blue about 0) = not taken forward; white/none = not reviewed yet. Write O as "Akhtar: GREEN (take forward)", "Akhtar: RED" or "Awaiting Akhtar's review". For an existing row whose O changed from "Awaiting…": GREEN -> forward to Yuvraj (below); RED -> AA = "Closed", W = "Send close (draft ready)", X = Gajju, plus a close draft. Never decide green/red yourself.
- FORWARD TO YUVRAJ: any email candidate with CV and/or video in (AA = "Materials in") and any LinkedIn applicant marked green, who is not yet with Yuvraj, is forwarded: AA = "With Yuvraj", W = "Screening call", X = Yuvraj, Y = today+3 (only fill W/X/Y if empty), and a "Yuvraj will call" draft. Exception: if they said they can't join for months, do not forward; write W = "Not forwarded: <reason>" and name them in the update.
- For an EXISTING person, refresh only A–P, Z, AA, AB when something changed. Write AB as text: '<d Mon yyyy, HH:MM> IST.
- Write with the Sheets connector's update_values (it parses like typing: formulas start with =, keep text with a leading ').

GMAIL DRAFTS (only for things that are new since the last run)
Before creating any draft, call list_drafts for that recipient (query to:<email>) and skip if a draft to them already exists. Also skip if Gajendra already replied after their latest message.
- Reply to a candidate's email: create_draft with replyToMessageId = their latest message id, to = their email, and subject = "Re: <thread subject>" (always pass the subject; it is blank otherwise).
- Form applicant with no email thread: new email, subject "Your application: Builder at Crashfree India".
Templates (keep them this short; adapt one clause to what they actually sent):
- Received / reviewing: "Thanks for applying for the Builder role at Crashfree India. We've received your application and are reviewing it now. We'll be in touch on next steps within the week."
- Handed to Yuvraj, not called: "Thanks for <what they sent>. Yuvraj from our team will call you this week for a short first conversation."
- Couldn't connect (Q = Not reached): "Yuvraj from our team tried calling but couldn't get through. Could you reply with two or three times over the next few days that suit you for a 20-minute call?"
- Next round (R newly Yes): "Thank you for <materials> and the conversation with Yuvraj. We'd like to take you to the next round: a longer conversation with our team. Yuvraj will be in touch to set a time."
- Close (R newly No): "Thank you for the time you gave us: <materials, the conversation with Yuvraj>. We won't be taking your application forward for this role. I appreciate the thought you put into it, and I wish you the best with what comes next."
- Other role (R newly Other role): say SATARK isn't the fit and ask if they're open to a conversation about the other role Yuvraj named. Mark Z "(confirm first)".
- Not taken forward (Akhtar red): "Thank you for applying for the Builder role at Crashfree India. We've reviewed your application and won't be taking it forward for this role. I appreciate the interest, and I wish you the best."
- Declined: one or two warm lines of thanks, specific to what they said.
- Materials pending: "Just checking in: we haven't received your CV and video yet. If you're still interested, please share them on this thread in the next few days."
- A question you can't answer from the role brief (comp, timing, part-time): acknowledge and say it's covered in the first conversation; do not invent answers. Compensation is discussed in the first conversation.
- A bounce: no draft.
After each draft, write Z = "Draft created <d Mon>: <kind>" (add "(confirm first)" for Other role or anything that promises something new).

DAILY LOG + FUNNEL
- Read 'Funnel & Actions'!A4:C33 (live formula counts) and the last row of 'Daily log'.
- Append one row to 'Daily log' (A..P): date (yyyy-mm-dd), Reached by email, Engaged, Handed to Yuvraj (rows with AA = With Yuvraj or any value in Q/R), Screening done (Q = Done), Next round, Interview with Yash, Founders round, Other role, Closed, Declined, Bounced, No reply, Rows in Pipeline, Drafts created this run, Notes (one line: anything odd). If a row for today already exists, update it instead of adding another.
- Deltas = today's row minus the previous row.

YUVRAJ'S ACTIONS (from the sheet)
- Stage "With Yuvraj" and Q empty -> call.
- Stage "Couldn't connect" -> re-try.
- Stage "Next round" with T empty -> add Yash interview date + outcome in column T.
- Any row with X = Yuvraj and Y before today -> overdue.

SLACK DRAFT (crisp: Gajju's overview, then Yuvraj's actions; nothing else)
Create ONE draft with slack_send_message_draft in channel C0C5Q4H7ZC3 (top level). If it fails with draft_already_exists (an earlier draft is still unsent), create it in Akhtar's own DM (channel_id U08LN3C3E91) instead. Use exactly this shape, numbers from 'Funnel & Actions', omit any empty line:

**SATARK Builder hiring: <d Mon>**
Reached <n> by email · <n> engaged (<n> email replies, <n> LinkedIn applications)
With Yuvraj: <n> in screening. <n> in next round (<names>), <n> couldn't connect, <n> to call
Closed <n> · Declined <n> · No reply <n>   (add "· Since <last log date>: +<n> replies, +<n> applications, +<n> screened" when there is a previous log row)
<@U0545HQJQ>: <n> new reply drafts in your Gmail Drafts to review and send. <One line only for a decision that is his, e.g. a "(confirm first)" draft or a founders round.>

**<@U095L5J7HFH>, actions**
1. Call: <names> (details, CVs, videos in the sheet)
2. Re-try: <names>
3. Add Yash interview date + outcome for <names> (column T)
4. Overdue: <names>
Sheet: https://docs.google.com/spreadsheets/d/1HcnKc_ihN2UiUT6149Y4hfB263T5KLmDerGuBwZLNB0/edit

FINISH
End with a 3-line summary: rows added/updated, drafts created (names), where the Slack draft is. Nothing else.
```

## Notes
- The routine fires into the original build session each day (see the table above for why). It drafts, it never sends: Akhtar sends the Slack update and Gajju sends the emails.
- Slack allows one attached draft per channel. If yesterday's draft is left unsent, today's goes to Akhtar's DM instead.
- Yash interview outcomes and founders-round decisions only reach the sheet when someone writes them in columns T and U.
