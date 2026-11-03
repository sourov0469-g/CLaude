// QA pass 3 · Composition (ELBAZ-QA-FINALIZE-BRIEF): every section on every page at 1440 and 390: spacing, type, imagery,
// empty fields, anything flat or unfinished. Measured here (the rest is judged by eye from the section frames):
//  edge      an element cut by the page edge (body clips sideways overflow, so the page never scrolls and nothing warns)
//  image     distorted (rendered aspect more than 3% off the photo's own, with object-fit fill) or upscaled past its pixels
//  widow     a one-word last line in a section heading
//  measure   body copy lines longer than 85 characters
//  frames    each section, each version, full height, saved for review (reduced motion: every composition settled)
// Usage: node qa_compose.js <page> <width> <round>
const { chromium } = require('playwright');
const fs = require('fs');
const PAGES = { home: 'elbaz-homepage.html', kitchens: 'kitchens.html', bathrooms: 'bathrooms.html', renovation: 'renovation.html', contact: 'contact.html' };
const [page, wArg, round] = process.argv.slice(2); const W = +wArg;
const OUT = `/home/user/CLaude/qa/finalize/qa${round}/compose`; fs.mkdirSync(OUT, { recursive: true });

function measure() {
  const W = document.documentElement.clientWidth, out = { edge: [], image: [], widow: [], measure: [] };
  const vis = e => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && !e.closest('[hidden], [aria-hidden="true"], .sr-only'); };
  const tag = e => ((e.closest('section[id]') || { id: e.closest('.foot') ? 'footer' : 'chrome' }).id) + ' ' + e.tagName.toLowerCase() + '.' + String(e.className && e.className.baseVal !== undefined ? e.className.baseVal : e.className).split(' ')[0];
  document.querySelectorAll('main *, .foot *').forEach(e => {
    if (!vis(e) || e.closest('svg') && e.tagName !== 'svg') return;
    const r = e.getBoundingClientRect(); if (r.right <= W + 2 && r.left >= -2) return;
    // only the page edge counts: an intentional clip (a marquee row, a stage) between the element and body is fine
    for (let a = e.parentElement; a && a !== document.body && a !== document.documentElement; a = a.parentElement) { const s = getComputedStyle(a); if (s.overflowX !== 'visible' || s.clipPath !== 'none' || s.position === 'fixed') return; }
    if (getComputedStyle(e).position === 'fixed') return;
    out.edge.push(tag(e) + ' spans ' + Math.round(r.left) + ' to ' + Math.round(r.right) + ' on a ' + W + ' page');
  });
  document.querySelectorAll('main img, .foot img').forEach(i => {
    if (!vis(i) || !i.naturalWidth || /^data:image\/svg|\.svg(\?|$)/.test(i.currentSrc || i.src)) return; const r = i.getBoundingClientRect(); const s = getComputedStyle(i);   // vectors scale freely
    if (s.objectFit === 'fill' || s.objectFit === '') { const a = r.width / r.height, n = i.naturalWidth / i.naturalHeight; if (Math.abs(a / n - 1) > .03) out.image.push(tag(i) + ' distorted: shown ' + a.toFixed(2) + ' vs photo ' + n.toFixed(2)); }
    const cover = s.objectFit === 'cover' ? Math.max(r.width / i.naturalWidth, r.height / i.naturalHeight) : r.width / i.naturalWidth;
    if (cover * devicePixelRatio > 1.25) out.image.push(tag(i) + ' upscaled ' + (cover * devicePixelRatio).toFixed(2) + 'x (' + i.naturalWidth + 'px shown at ' + Math.round(r.width) + 'px)');
  });
  document.querySelectorAll('main h1, main h2').forEach(h => {
    if (!vis(h)) return; const rg = document.createRange(); rg.selectNodeContents(h); const lines = {};
    // the words of the last line: walk text nodes word by word and group by line top
    const w = document.createTreeWalker(h, NodeFilter.SHOW_TEXT); while (w.nextNode()) { const n = w.currentNode; const re = /\S+/g; let m;
      while ((m = re.exec(n.nodeValue))) { const q = document.createRange(); q.setStart(n, m.index); q.setEnd(n, m.index + m[0].length); const rr = q.getBoundingClientRect(); if (!rr.width) continue; const k = Math.round(rr.top / 4); (lines[k] = lines[k] || []).push(m[0]); } }
    const keys = Object.keys(lines).map(Number).sort((a, b) => a - b); if (keys.length > 1 && lines[keys[keys.length - 1]].length === 1) out.widow.push(tag(h) + ' last line "' + lines[keys[keys.length - 1]][0] + '" of "' + h.textContent.trim().replace(/\s+/g, ' ').slice(0, 50) + '"');
  });
  document.querySelectorAll('main p').forEach(p => {
    if (!vis(p) || p.textContent.trim().length < 120) return; const cs = getComputedStyle(p); const ch = parseFloat(cs.fontSize) * .5; const cpl = p.getBoundingClientRect().width / ch;
    if (cpl > 85 * 1.05) out.measure.push(tag(p) + ' about ' + Math.round(cpl) + ' characters a line');
  });
  for (const k in out) out[k] = [...new Set(out[k])];
  return out;
}

(async () => {
  const b = await chromium.launch(); const R = { page, W, runs: {} };
  for (const v of [1, 2]) {
    const p = await b.newPage({ viewport: { width: W, height: W > 500 ? 900 : 844 }, reducedMotion: 'reduce' });
    const errs = []; p.on('pageerror', e => errs.push(String(e).slice(0, 160)));
    await p.goto('file:///home/user/CLaude/remodeling/site/' + PAGES[page]); await p.waitForTimeout(1100);
    const two = await p.evaluate(() => [...document.querySelectorAll('section.sec[id]')].filter(s => s.querySelectorAll(':scope .ver[data-v]').length > 1).map(s => s.id));
    if (v === 2) { if (!two.length) { await p.close(); continue; } await p.evaluate(ids => ids.forEach(id => EZ.activate(id, 2)), two); }
    const H = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < H; y += 600) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(30); }
    await p.waitForTimeout(400);
    const m = await p.evaluate(measure); m.errors = errs; R.runs['v' + v] = m;
    // frames: each section (in v2 only the two-version ones), full height
    const ids = await p.evaluate(() => [...document.querySelectorAll('section.sec[id]')].filter(s => !s.parentElement.closest('section.sec')).map(s => s.id));
    for (const id of ids) {
      if (v === 2 && !two.includes(id)) continue;
      const el = await p.$('#' + id); await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(250);
      await el.screenshot({ path: `${OUT}/${page}-${W}-${id}-v${v}.png`, animations: 'disabled' }).catch(() => {});
    }
    await p.close();
  }
  await b.close();
  fs.writeFileSync(`${OUT}/${page}-${W}.json`, JSON.stringify(R, null, 1));
  for (const [v, m] of Object.entries(R.runs)) {
    const n = m.edge.length + m.image.length + m.widow.length + m.measure.length;
    console.log(`${page} ${W} ${v}: edge ${m.edge.length} | image ${m.image.length} | widow ${m.widow.length} | measure ${m.measure.length} | errors ${m.errors.length}`);
    ['edge', 'image', 'widow', 'measure'].forEach(k => m[k].slice(0, 12).forEach(x => console.log('   ' + k + ': ' + x)));
  }
})();
