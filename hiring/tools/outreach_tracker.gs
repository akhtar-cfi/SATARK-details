/**
 * SATARK Outreach Tracker — keeps the "Tracker" tab of this Google Sheet in
 * sync with Gmail, and maintains a "Dashboard" tab with live counts.
 *
 * One-time setup (about 3 minutes):
 *   1. Open the tracker sheet → Extensions → Apps Script.
 *   2. Delete any code there, paste this whole file, click Save.
 *   3. Choose `setup` in the function dropdown → Run → Allow.
 * Setup builds the Dashboard, runs a first sync, then re-syncs every 30 minutes
 * (use the "SATARK Tracker → Sync now" menu for an instant refresh).
 *
 * Install it while logged in to the mailbox that receives replies.
 * gajendra@crashfreeindia.org sees every reply; an inbox that was only CC'd
 * sees replies where the candidate chose "Reply all".
 *
 * The sync only writes the auto columns (Emailed On … Thread). Anything you
 * type in other columns — Video Score, Decision, Notes — is never touched.
 */

const CONFIG = {
  SENDER: 'gajendra@crashfreeindia.org',
  CAMPAIGN_SUBJECT: 'serious invitation for CSE candidates',
  CAMPAIGN_START: '2026/09/24',                 // Gmail search format, day before sending
  ACK_DEADLINE: '2026-09-26T23:59:59+05:30',
  VIDEO_DEADLINE: '2026-09-28T23:59:59+05:30',
  SYNC_EVERY_MINUTES: 30,                       // allowed: 1, 5, 10, 15, 30
  TRACKER: 'Tracker',
  DASHBOARD: 'Dashboard',
  TEAM_DOMAINS: ['crashfreeindia.org', 'cars24.com'],
  // Links in our own email and signatures; never counted as a submission.
  IGNORE_LINK_DOMAINS: ['cars24.com', 'crashfreeindia.org', 'deccanherald.com',
                        'media4growth.com', 'linkedin.com'],
  OUR_ATTACHMENTS: ['satark_pod_lead_brief.pdf'],
};

const AUTO_HEADERS = ['Emailed On', 'Replied On', 'Ack On Time', 'CV', 'Video On',
                      'Video Link', 'Video On Time', 'Status', 'Last Reply', 'Thread'];
const ALL_HEADERS = ['Priority', 'Name', 'Email', 'Flag', 'Wave'].concat(AUTO_HEADERS)
                      .concat(['Video Score (/25)', 'Decision', 'Notes']);

const VIDEO_HOSTS = ['youtube.com', 'youtu.be', 'vimeo.com', 'loom.com', 'instagram.com'];
const FILE_HOSTS = ['drive.google.com', 'docs.google.com', 'dropbox.com', 'onedrive.live.com',
                    '1drv.ms', 'sharepoint.com', 'wetransfer.com', 'we.tl', 'box.com', 'icloud.com'];
const DECLINE_RE = /(respectfully decline|\bdecline\b|not interested|no,? thanks|happily employed|not looking for (a )?(change|job|role|opportunit)|pass on this|not in a position to (join|take|pursue|consider|accept)|withdraw my)/i;
const EXTENSION_RE = /(extension|more time|extend the deadline|few more days|additional time)/i;
const CV_WORDS_RE = /\b(cv|resume|résumé|curriculum vitae)\b/i;
const VIDEO_WORDS_RE = /\b(video|pitch|recording|clip)\b/i;


// ---------------------------------------------------------------- setup / menu

function onOpen() {
  SpreadsheetApp.getUi().createMenu('SATARK Tracker')
    .addItem('Sync now', 'syncTracker')
    .addItem('Re-run setup', 'setup')
    .addToUi();
}

function setup() {
  const ss = SpreadsheetApp.getActive();
  let tr = ss.getSheetByName(CONFIG.TRACKER);
  if (!tr) { tr = ss.getSheets()[0]; tr.setName(CONFIG.TRACKER); }
  ensureHeaders_(tr);
  formatTracker_(tr);
  buildDashboard_(ss, tr);

  ScriptApp.getProjectTriggers()
    .filter(t => t.getHandlerFunction() === 'syncTracker')
    .forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('syncTracker').timeBased().everyMinutes(CONFIG.SYNC_EVERY_MINUTES).create();

  syncTracker();
  ss.toast('Tracker is live. It re-syncs every ' + CONFIG.SYNC_EVERY_MINUTES + ' minutes.', 'SATARK', 8);
}


// ---------------------------------------------------------------- sync

function syncTracker() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(30000)) return;
  try {
    const ss = SpreadsheetApp.getActive();
    const tr = ss.getSheetByName(CONFIG.TRACKER);
    const values = tr.getDataRange().getValues();
    const header = values[0].map(String);
    const col = name => {
      const i = header.indexOf(name);
      if (i < 0) throw new Error('Tracker is missing the column "' + name + '". Re-run setup.');
      return i;
    };

    const rowByEmail = {};
    for (let r = 1; r < values.length; r++) {
      const e = normEmail_(values[r][col('Email')]);
      if (e) rowByEmail[e] = r;
    }

    const recs = {};
    const rec = e => recs[e] || (recs[e] = { emailedOn: null, threadUrl: '', msgs: {}, bounced: false, name: '' });
    const after = ' after:' + CONFIG.CAMPAIGN_START;

    // 1. Campaign threads: who was emailed, plus every non-team message in the thread
    //    (catches replies even when a candidate answers from a different address).
    searchAll_('from:' + CONFIG.SENDER + ' subject:"' + CONFIG.CAMPAIGN_SUBJECT + '"' + after).forEach(t => {
      const msgs = t.getMessages();
      const first = msgs[0];
      if (normEmail_(firstEmail_(first.getFrom())) !== CONFIG.SENDER) return;
      const toList = allEmails_(first.getTo());
      toList.forEach(e => {
        const r = rec(e);
        if (!r.emailedOn || first.getDate() < r.emailedOn) {
          r.emailedOn = first.getDate();
          r.threadUrl = t.getPermalink();
          r.name = displayName_(first.getTo(), e);
        }
      });
      if (toList.length !== 1) return;
      const cand = toList[0];
      msgs.slice(1).forEach(m => {
        if (!isTeam_(firstEmail_(m.getFrom()))) recs[cand].msgs[m.getId()] = m;
      });
    });

    // 2. Candidate mail in new threads (e.g. a fresh "Application" email).
    const candidates = Object.keys(Object.assign({}, rowByEmail, recs));
    chunk_(candidates, 20).forEach(group => {
      searchAll_('from:(' + group.join(' OR ') + ')' + after).forEach(t => {
        t.getMessages().forEach(m => {
          const from = normEmail_(firstEmail_(m.getFrom()));
          if (group.indexOf(from) >= 0) rec(from).msgs[m.getId()] = m;
        });
      });
    });

    // 3. Bounces (only visible in the sender's mailbox).
    searchAll_('from:(mailer-daemon OR postmaster)' + after).forEach(t => {
      t.getMessages().forEach(m => {
        const body = (m.getPlainBody() || '').toLowerCase();
        candidates.forEach(e => { if (body.indexOf(e) >= 0) rec(e).bounced = true; });
      });
    });

    // Append anyone emailed who isn't on the roster yet.
    const width = header.length;
    Object.keys(recs).forEach(e => {
      if (e in rowByEmail || !recs[e].emailedOn) return;
      const row = new Array(width).fill('');
      row[col('Name')] = recs[e].name || e;
      row[col('Email')] = e;
      row[col('Flag')] = '(not in master)';
      tr.appendRow(row);
      values.push(row);
      rowByEmail[e] = values.length - 1;
    });

    // Build the auto columns for every row, then write each column in one call.
    const now = new Date();
    const out = {};
    AUTO_HEADERS.forEach(h => { out[h] = []; });
    for (let r = 1; r < values.length; r++) {
      const e = normEmail_(values[r][col('Email')]);
      const v = summarise_(e ? recs[e] : null, now);
      AUTO_HEADERS.forEach(h => out[h].push([v[h]]));
    }
    if (values.length > 1) {
      AUTO_HEADERS.forEach(h => tr.getRange(2, col(h) + 1, values.length - 1, 1).setValues(out[h]));
    }
    const dash = ss.getSheetByName(CONFIG.DASHBOARD);
    if (dash) dash.getRange('B2').setValue(now);
  } finally {
    lock.releaseLock();
  }
}

function summarise_(r, now) {
  const blank = {};
  AUTO_HEADERS.forEach(h => { blank[h] = ''; });
  if (!r || !r.emailedOn) { blank['Status'] = 'Not emailed'; return blank; }

  const ack = new Date(CONFIG.ACK_DEADLINE), vd = new Date(CONFIG.VIDEO_DEADLINE);
  const msgs = Object.keys(r.msgs).map(id => r.msgs[id]).sort((a, b) => a.getDate() - b.getDate());
  let repliedOn = null, cv = false, videoLink = '', videoOn = null, declined = false, extension = false, last = '';

  msgs.forEach(m => {
    const text = stripQuoted(m.getPlainBody() || '');
    const atts = m.getAttachments({ includeInlineImages: false })
                  .map(a => ({ name: a.getName(), type: a.getContentType() }));
    const c = classify(text, atts);
    if (!repliedOn) repliedOn = m.getDate();
    if (c.cv) cv = true;
    if (c.videoLink && !videoLink) { videoLink = c.videoLink; videoOn = m.getDate(); }
    if (c.declined) declined = true;
    if (c.extension) extension = true;
    const snippet = text.replace(/\s+/g, ' ').trim();
    if (snippet) last = snippet.slice(0, 200);
  });

  let status;
  if (r.bounced) status = 'Bounced';
  else if (cv && videoLink) status = 'Complete';
  else if (declined && !cv && !videoLink) status = 'Declined? (check)';
  else if (videoLink) status = 'Video in — CV pending';
  else if (cv) status = now > vd ? 'CV in — video overdue' : 'CV in — video pending';
  else if (repliedOn) status = extension ? 'Acknowledged — asked for more time'
                             : (now > vd ? 'Acknowledged — video overdue' : 'Acknowledged');
  else status = now > ack ? 'No reply — overdue' : 'Awaiting reply';

  return {
    'Emailed On': r.emailedOn,
    'Replied On': repliedOn || '',
    'Ack On Time': repliedOn ? (repliedOn <= ack ? 'Yes' : 'Late') : '',
    'CV': cv ? 'Yes' : '',
    'Video On': videoOn || '',
    'Video Link': videoLink,
    'Video On Time': videoOn ? (videoOn <= vd ? 'Yes' : 'Late') : '',
    'Status': status,
    'Last Reply': last,
    'Thread': r.threadUrl ? '=HYPERLINK("' + r.threadUrl + '","Open")' : '',
  };
}


// ---------------------------------------------------------------- pure helpers
// (no Google services used below this line)

/** Removes the quoted original email from a reply's plain-text body. */
function stripQuoted(body) {
  let t = '\n' + String(body || '').replace(/\r\n/g, '\n');
  const cuts = [
    /\n[ \t]*On [\s\S]{5,300}?wrote:[ \t]*\n/,
    /\n[ \t]*-{2,}[ \t]*(Original Message|Forwarded message)[ \t]*-*/i,
    /\n[ \t]*From:[^\n]*\n[ \t]*(Sent|Date):/i,
    /\n[ \t]*_{8,}/,
  ];
  cuts.forEach(re => {
    const m = t.match(re);
    if (m) t = t.slice(0, m.index);
  });
  return t.split('\n').filter(l => !/^\s*>/.test(l)).join('\n').trim();
}

/** Decides what a single candidate message contains. */
function classify(text, attachments) {
  const out = { cv: false, videoLink: '', declined: false, extension: false };
  (attachments || []).forEach(a => {
    const name = String(a.name || '').toLowerCase();
    const type = String(a.type || '').toLowerCase();
    if (CONFIG.OUR_ATTACHMENTS.indexOf(name) >= 0) return;
    if (/\.(pdf|docx?|rtf|odt|pages)$/.test(name) || /pdf|msword|wordprocessing/.test(type)) out.cv = true;
    if (/\.(mp4|mov|m4v|avi|mkv|webm|3gp)$/.test(name) || type.indexOf('video/') === 0) {
      out.videoLink = out.videoLink || '(attached to email)';
    }
  });

  const lines = String(text || '').split('\n');
  lines.forEach((line, i) => {
    (line.match(/https?:\/\/[^\s<>()"']+/gi) || []).forEach(url => {
      const host = hostOf(url);
      if (!host || hostIn(host, CONFIG.IGNORE_LINK_DOMAINS)) return;
      if (hostIn(host, VIDEO_HOSTS)) {
        out.videoLink = out.videoLink || url;
      } else if (hostIn(host, FILE_HOSTS)) {
        // A shared-drive link could be either; the label on its own line decides first,
        // then a label on the line above (if that line isn't itself a link), then the whole message.
        const own = line.replace(/https?:\/\/[^\s<>()"']+/gi, ' ');
        const prev = lines[i - 1] && !/https?:\/\//i.test(lines[i - 1]) ? lines[i - 1] : '';
        const asVideo = () => { out.videoLink = out.videoLink || url; };
        if (VIDEO_WORDS_RE.test(own)) asVideo();
        else if (CV_WORDS_RE.test(own)) out.cv = true;
        else if (VIDEO_WORDS_RE.test(prev)) asVideo();
        else if (CV_WORDS_RE.test(prev)) out.cv = true;
        else if (VIDEO_WORDS_RE.test(text)) asVideo();
        else if (CV_WORDS_RE.test(text)) out.cv = true;
        else out.videoLink = out.videoLink || url + ' (check)';
      }
    });
  });

  out.declined = DECLINE_RE.test(text || '');
  out.extension = EXTENSION_RE.test(text || '');
  return out;
}

function hostOf(url) {
  const m = String(url).match(/^https?:\/\/([^\/?#:]+)/i);
  return m ? m[1].toLowerCase().replace(/^www\./, '') : '';
}

function hostIn(host, list) {
  return list.some(d => host === d || host.slice(-(d.length + 1)) === '.' + d);
}

function normEmail_(s) {
  return String(s || '').trim().toLowerCase().replace(/^<|>$/g, '');
}

function allEmails_(header) {
  return (String(header || '').match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) || []).map(normEmail_);
}

function firstEmail_(header) {
  return allEmails_(header)[0] || '';
}

function displayName_(header, email) {
  const parts = String(header || '').split(',');
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].toLowerCase().indexOf(email) >= 0) {
      const m = parts[i].match(/^\s*"?([^"<]+?)"?\s*</);
      if (m) return m[1].trim();
    }
  }
  return '';
}

function isTeam_(email) {
  const e = normEmail_(email);
  return CONFIG.TEAM_DOMAINS.some(d => e.slice(-(d.length + 1)) === '@' + d);
}

function chunk_(arr, n) {
  const out = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}


// ---------------------------------------------------------------- Google helpers

function searchAll_(query) {
  const out = [];
  for (let start = 0; ; start += 100) {
    const batch = GmailApp.search(query, start, 100);
    out.push.apply(out, batch);
    if (batch.length < 100) return out;
  }
}

function colLetter_(n) {
  let s = '';
  while (n > 0) { const m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = Math.floor((n - 1) / 26); }
  return s;
}

function ensureHeaders_(sh) {
  const lastCol = Math.max(sh.getLastColumn(), 1);
  const header = sh.getRange(1, 1, 1, lastCol).getValues()[0].map(String);
  ALL_HEADERS.forEach(h => {
    if (header.indexOf(h) < 0) {
      header.push(h);
      sh.getRange(1, header.length).setValue(h);
    }
  });
}

function formatTracker_(sh) {
  const header = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0].map(String);
  const c = name => header.indexOf(name) + 1;
  const rows = Math.max(sh.getMaxRows() - 1, 1);

  sh.setFrozenRows(1);
  sh.setFrozenColumns(c('Name'));
  sh.getRange(1, 1, 1, header.length).setFontWeight('bold').setBackground('#F1F3F4');
  ['Emailed On', 'Replied On', 'Video On'].forEach(h =>
    sh.getRange(2, c(h), rows, 1).setNumberFormat('dd-mmm hh:mm'));
  sh.setColumnWidth(c('Name'), 190);
  sh.setColumnWidth(c('Email'), 220);
  sh.setColumnWidth(c('Status'), 230);
  sh.setColumnWidth(c('Last Reply'), 320);
  sh.setColumnWidth(c('Video Link'), 220);
  sh.setColumnWidth(c('Notes'), 260);

  const status = sh.getRange(2, c('Status'), rows, 1);
  const rule = (text, color) => SpreadsheetApp.newConditionalFormatRule()
    .whenTextStartsWith(text).setBackground(color).setRanges([status]).build();
  sh.setConditionalFormatRules([
    rule('Complete', '#D9EAD3'),
    rule('Video in', '#D9EAD3'),
    rule('CV in', '#FFF2CC'),
    rule('Acknowledged', '#FFF2CC'),
    rule('No reply', '#F4CCCC'),
    rule('Declined', '#E0E0E0'),
    rule('Bounced', '#E0E0E0'),
  ]);

  if (!sh.getFilter()) sh.getRange(1, 1, sh.getMaxRows(), header.length).createFilter();
}

function buildDashboard_(ss, tr) {
  const header = tr.getRange(1, 1, 1, tr.getLastColumn()).getValues()[0].map(String);
  const L = name => colLetter_(header.indexOf(name) + 1);
  const rng = name => "'" + CONFIG.TRACKER + "'!" + L(name) + '2:' + L(name);

  let d = ss.getSheetByName(CONFIG.DASHBOARD);
  if (!d) d = ss.insertSheet(CONFIG.DASHBOARD, 0);
  d.clear();
  d.getCharts().forEach(ch => d.removeChart(ch));

  d.getRange('A1').setValue('SATARK Outreach — Live Dashboard').setFontSize(14).setFontWeight('bold');
  d.getRange('A2').setValue('Last synced');
  d.getRange('B2').setNumberFormat('dd-mmm-yyyy hh:mm');
  d.getRange('A3').setValue('Acknowledge by 26 Sep EOD · Video by 28 Sep EOD').setFontColor('#666666');

  const funnel = [
    ['Funnel', 'Count', '% of emailed'],
    ['Candidates in pool', '=COUNTA(' + rng('Email') + ')', ''],
    ['Emailed', '=COUNTIF(' + rng('Emailed On') + ',"<>")', ''],
    ['Replied (any)', '=COUNTIF(' + rng('Replied On') + ',"<>")', '=IFERROR(B8/$B$7,0)'],
    ['Acknowledged by 26 Sep', '=COUNTIF(' + rng('Ack On Time') + ',"Yes")', '=IFERROR(B9/$B$7,0)'],
    ['CV received', '=COUNTIF(' + rng('CV') + ',"Yes")', '=IFERROR(B10/$B$7,0)'],
    ['Video received', '=COUNTIF(' + rng('Video On') + ',"<>")', '=IFERROR(B11/$B$7,0)'],
    ['Complete (CV + video)', '=COUNTIF(' + rng('Status') + ',"Complete")', '=IFERROR(B12/$B$7,0)'],
    ['Declined (check)', '=COUNTIF(' + rng('Status') + ',"Declined*")', '=IFERROR(B13/$B$7,0)'],
    ['No reply yet', '=COUNTIF(' + rng('Status') + ',"Awaiting reply")+COUNTIF(' + rng('Status') + ',"No reply*")', '=IFERROR(B14/$B$7,0)'],
    ['Bounced', '=COUNTIF(' + rng('Status') + ',"Bounced")', '=IFERROR(B15/$B$7,0)'],
  ];
  d.getRange(5, 1, funnel.length, 3).setValues(funnel);
  d.getRange('A5:C5').setFontWeight('bold').setBackground('#F1F3F4');
  d.getRange('C8:C15').setNumberFormat('0%');

  const flags = ['GREEN', 'ORANGE+', 'ORANGE', 'RED'];
  const byFlag = [['By flag', 'Emailed', 'Replied', 'CV', 'Video', 'Complete', 'Declined']];
  flags.forEach((f, i) => {
    const r = 18 + i;
    const cond = rng('Flag') + ',$A' + r;
    byFlag.push([f,
      '=COUNTIFS(' + cond + ',' + rng('Emailed On') + ',"<>")',
      '=COUNTIFS(' + cond + ',' + rng('Replied On') + ',"<>")',
      '=COUNTIFS(' + cond + ',' + rng('CV') + ',"Yes")',
      '=COUNTIFS(' + cond + ',' + rng('Video On') + ',"<>")',
      '=COUNTIFS(' + cond + ',' + rng('Status') + ',"Complete")',
      '=COUNTIFS(' + cond + ',' + rng('Status') + ',"Declined*")']);
  });
  d.getRange(17, 1, byFlag.length, 7).setValues(byFlag);
  d.getRange('A17:G17').setFontWeight('bold').setBackground('#F1F3F4');

  d.getRange('A24').setValue('Ready to review — CV + video in').setFontWeight('bold');
  d.getRange('A25').setFormula('=IFERROR(FILTER({' + rng('Name') + ',' + rng('Flag') + ',' + rng('Video Link') +
                               '},' + rng('Status') + '="Complete"),"None yet")');
  d.getRange('E24').setValue('Needs a nudge — acknowledged, nothing sent').setFontWeight('bold');
  d.getRange('E25').setFormula('=IFERROR(FILTER({' + rng('Name') + ',' + rng('Flag') + ',' + rng('Replied On') +
                               '},REGEXMATCH(' + rng('Status') + ',"^Acknowledged")),"None")');
  d.getRange('G25:G').setNumberFormat('dd-mmm hh:mm');

  d.setColumnWidth(1, 230);
  [2, 3, 4, 5, 6, 7].forEach(c => d.setColumnWidth(c, 110));

  try {
    const chart = d.newChart().setChartType(Charts.ChartType.BAR)
      .addRange(d.getRange('A7:B12'))
      .setOption('title', 'Funnel').setOption('legend', { position: 'none' })
      .setPosition(5, 9, 0, 0).build();
    d.insertChart(chart);
  } catch (e) { /* the chart is optional */ }
}
