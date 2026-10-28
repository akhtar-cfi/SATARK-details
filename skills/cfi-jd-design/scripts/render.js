// Render CFI JD pages (1080x1350 @2x) to PNG + a combined PDF.
// Usage: node scripts/render.js <folder> jd_page.html [cover.html]
// Pages are rendered in the order given; cover first if you want it first in the PDF.
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

(async () => {
  const [dir, ...pages] = process.argv.slice(2);
  if (!dir || pages.length === 0) {
    console.error('Usage: node render.js <folder> page1.html [page2.html ...]');
    process.exit(1);
  }
  const abs = path.resolve(dir);
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 2 });
  const pdfParts = [];
  for (const file of pages) {
    const page = await ctx.newPage();
    await page.goto('file://' + path.join(abs, file), { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const fonts = await page.evaluate(() => [...document.fonts].filter(f => f.status === 'loaded').map(f => f.family));
    if (!fonts.some(f => /Geist/.test(f)) || !fonts.some(f => /Montserrat/.test(f))) {
      console.warn(`WARN ${file}: Geist/Montserrat did not load (no internet?). Output will use fallback fonts.`);
    }
    const left = await page.evaluate(() => {
      const m = document.querySelector('main');
      if (!m) return null;
      const last = [...m.querySelectorAll('*')].reduce((b, el) => Math.max(b, el.getBoundingClientRect().bottom), 0);
      return 1350 - last;
    });
    if (left !== null) console.log(`${file}: ${Math.round(left)}px free below body${left < 30 ? '  <-- too tight, cut copy' : ''}`);
    const base = file.replace(/\.html$/, '');
    await page.screenshot({ path: path.join(abs, base + '.png') });
    const pdfPath = path.join(abs, base + '.pdf');
    await page.pdf({ path: pdfPath, width: '1080px', height: '1350px', printBackground: true });
    pdfParts.push(pdfPath);
    await page.close();
  }
  await browser.close();
  // Merge into JD.pdf if pdf-lib is available; otherwise keep per-page PDFs.
  try {
    const { PDFDocument } = require('pdf-lib');
    const out = await PDFDocument.create();
    for (const p of pdfParts) {
      const doc = await PDFDocument.load(fs.readFileSync(p));
      (await out.copyPages(doc, doc.getPageIndices())).forEach(pg => out.addPage(pg));
    }
    fs.writeFileSync(path.join(abs, 'JD.pdf'), await out.save());
    console.log('Wrote JD.pdf');
  } catch (e) {
    console.log('pdf-lib not installed: kept one PDF per page (npm i pdf-lib to get a combined JD.pdf).');
  }
})();
