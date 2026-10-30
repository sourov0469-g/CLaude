// AUDIT-PACK-01 facts lock (Part A.7, C.2, C.3, C.14, F10): run over every visible version AND every backup slot.
// Licence: each block that prints CBC1265280 must read exactly "Licensed, bonded & insured · CBC1265280" or carry the
// long form "Florida Certified Building Contractor, licence CBC1265280" inside a sentence. No 52 / 30+ claims.
// One photographed-project figure, equal to the Work data. Every consult version carries phone, hours, office and the
// full privacy sentence. Town counts 34 / 31 / 39 = 104.
const { chromium } = require('playwright');
const fs = require('fs');
const FILE = process.env.FILE || 'file:///home/user/CLaude/remodeling/site/elbaz-homepage.html';
const OUT = process.env.OUT || '/home/user/CLaude/remodeling/qa/facts.txt';
const LOCK = 'Licensed, bonded & insured · CBC1265280';
const LONG = 'Florida Certified Building Contractor, licence CBC1265280';
const PRIV = 'We use your details only to respond to this enquiry. No lists, no resale.';
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(FILE);
  await p.waitForTimeout(1200);
  const slots = await p.evaluate(() => {
    const out = {};
    document.querySelectorAll('section[data-section]').forEach(s => { out[s.id] = [...s.querySelectorAll(':scope > .ver, :scope > .sec__body > .ver')].map(v => v.dataset.v); });
    return out;
  });
  const out = [], fail = [];
  const log = (k, v) => out.push(k + ': ' + v);
  const licBad = [], fig = {}, claims = [];
  let consultBad = [];
  for (const id of Object.keys(slots)) {
    for (const v of slots[id]) {
      await p.evaluate(([id, v]) => EZ.activate(id, v), [id, v]);
      await p.waitForTimeout(250);
      const r = await p.evaluate(([id, v, LOCK, LONG, PRIV]) => {
        const ver = document.querySelector('#' + id + ' .ver[data-v="' + v + '"]');
        const txt = n => n.textContent.replace(/\s+/g, ' ').trim();
        const bad = [];
        // every element whose own text holds the licence number: judge its nearest block-level carrier
        const w = document.createTreeWalker(ver, NodeFilter.SHOW_TEXT);
        let n; const seen = new Set();
        while ((n = w.nextNode())) {
          if (!/CBC1265280/.test(n.nodeValue)) continue;
          let c = n.parentElement;
          while (c && c !== ver && getComputedStyle(c).display === 'inline') c = c.parentElement;
          // a value span that holds only the number belongs to the label beside it: judge the pair
          while (c && c !== ver && txt(c) === 'CBC1265280') c = c.parentElement;
          if (seen.has(c)) continue; seen.add(c);
          const t = txt(c);
          const ok = t === LOCK || t.endsWith(LOCK) && t.length - LOCK.length < 20 || (t.includes(LONG) && /[.]$/.test(t));
          if (!ok) bad.push(t.slice(0, 90));
        }
        // aria-labels too
        ver.querySelectorAll('[aria-label*="CBC1265280"]').forEach(e => { const t = e.getAttribute('aria-label'); if (t !== LOCK && !t.includes(LONG)) bad.push('aria: ' + t.slice(0, 80)); });
        const all = txt(ver) + ' ' + [...ver.querySelectorAll('[aria-label]')].map(e => e.getAttribute('aria-label')).join(' ');
        const claims = [];
        if (/\b52\b/.test(all.replace(/CBC1265280/g, ''))) claims.push('52');
        if (/30\s*\+|30 years|thirty/i.test(all)) claims.push('30+');
        if (/Sean|Raz\b/.test(all)) claims.push('owner names');
        const proj = (all.match(/(\d+)\s+(?:photographed projects|projects photographed)/gi) || []).map(x => parseInt(x));
        let consult = null;
        if (id === 'consult') consult = { tel: !!ver.querySelector('a[href="tel:+17542360675"]'), hours: /Sun.Fri 7am.7pm/.test(all) && /Saturday closed/.test(all), office: /19 W Flagler St #310, Miami, FL 33130/.test(all), priv: all.includes(PRIV) };
        return { bad, claims, proj, consult };
      }, [id, v, LOCK, LONG, PRIV]);
      r.bad.forEach(x => licBad.push(id + v + ': ' + x));
      r.claims.forEach(x => claims.push(id + v + ': ' + x));
      r.proj.forEach(x => { fig[x] = (fig[x] || []).concat(id + v); });
      if (r.consult && !(r.consult.tel && r.consult.hours && r.consult.office && r.consult.priv)) consultBad.push(id + v + ' ' + JSON.stringify(r.consult));
    }
  }
  // chrome (header, footer, sheet, meta)
  const chrome = await p.evaluate(([LOCK, LONG]) => {
    const bad = [];
    document.querySelectorAll('header, footer, .sheet, .mbar').forEach(z => z.querySelectorAll('*').forEach(e => {
      if (e.children.length) return;
      const t = e.textContent.replace(/\s+/g, ' ').trim();
      if (/CBC1265280/.test(t) && t !== LOCK && !(t.includes(LONG) && /[.]$/.test(t))) bad.push(t);
    }));
    document.querySelectorAll('meta[content*="CBC1265280"]').forEach(m => { if (!m.content.includes(LOCK)) bad.push('meta: ' + m.content.slice(0, 80)); });
    return bad;
  }, [LOCK, LONG]);
  chrome.forEach(x => licBad.push('chrome: ' + x));
  const work = JSON.parse(fs.readFileSync('/home/user/CLaude/remodeling/src/data/projects.json', 'utf8')).length;
  const towns = JSON.parse(fs.readFileSync('/home/user/CLaude/remodeling/src/data/southfl.json', 'utf8'));
  log('slots checked', Object.keys(slots).map(k => k + '[' + slots[k].join(',') + ']').join(' '));
  log('licence presentations off-lock', licBad.length ? '\n  ' + licBad.join('\n  ') : 0); if (licBad.length) fail.push('licence');
  log('unlocked claims (52 / 30+ / owner names)', claims.length ? claims.join(', ') : 0); if (claims.length) fail.push('claims');
  const figs = Object.keys(fig);
  log('photographed-project figures printed', figs.length ? figs.map(f => f + ' (' + fig[f].join(' ') + ')').join('; ') : 'none') ;
  log('Work data projects', work);
  if (figs.some(f => +f !== work)) fail.push('project figure != work data');
  log('consult versions missing phone/hours/office/privacy', consultBad.length ? consultBad.join('; ') : 0); if (consultBad.length) fail.push('consult facts');
  try {
    const counts = {}; let total = 0; const names = new Set();
    Object.keys(towns.towns).forEach(c => { counts[c] = towns.towns[c].length; total += counts[c]; towns.towns[c].forEach(t => names.add(t[0])); });
    log('town counts by county (data)', JSON.stringify(counts) + ' total ' + total + ', unique names ' + names.size);
    if (counts['Miami-Dade'] !== 34 || counts['Broward'] !== 31 || counts['Palm Beach'] !== 39 || total !== 104 || names.size !== 104) fail.push('town counts');
  } catch (e) { log('town counts', 'not read: ' + e.message); }
  out.push('', 'FACTS FAILS: ' + (fail.length ? fail.join(' | ') : 0));
  fs.writeFileSync(OUT, out.join('\n') + '\n');
  console.log(out.join('\n'));
  await b.close();
})();
