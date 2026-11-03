// Phase 10 · the brief's LOCKS ("these outrank everything above"), measured on the final build: every page, with each
// version set, every visible text run and every link. Usage: node locks.js [outfile]
//  facts    rating 4.8 only; review count 343 only; licence line character-exact wherever CBC1265280 appears (or the long
//           form inside a sentence); one phone number in text and in every tel: link; the office address; the hours;
//           every mailto to Sales@elbazconstruction.com; no copy claiming a form was sent; 34/31/39 = 104 towns, all shown;
//           before/after pairs drawn only from the 4 genuine pairs
//  numbers  every number in visible text that is neither in the fact lock nor anywhere in FACTS.md (the firm's published
//           figures), listed with its context for review
//  brand    the first family of every text run is Poppins or Roboto
//  network  the page makes no request beyond its own file and inline data
const { chromium } = require('playwright');
const fs = require('fs');
const SITE = 'file:///home/user/CLaude/remodeling/site/';
const PAGES = { home: 'elbaz-homepage.html', kitchens: 'kitchens.html', bathrooms: 'bathrooms.html', renovation: 'renovation.html', contact: 'contact.html' };
const OUT = process.argv[2] || '/home/user/CLaude/qa/finalize/phase10/locks.json';
const FACTS = fs.readFileSync('/home/user/CLaude/remodeling/FACTS.md', 'utf8');
const PUBLISHED = new Set((FACTS.match(/\d+(?:\.\d+)?/g) || []).map(n => String(+n)));
const LOCKNUM = new Set(['4.8', '343', '754', '236', '675', '19', '310', '33130', '1265280', '104', '34', '31', '39', '7']);

function grab() {
  const vis = e => { const r = e.getBoundingClientRect(); if (r.width === 0 || r.height === 0) return false; if (e.closest('[hidden], [aria-hidden="true"]')) return false; const s = getComputedStyle(e); return s.visibility !== 'hidden' && s.display !== 'none'; };
  const runs = [];
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode: n => n.nodeValue.trim() && n.parentElement && !n.parentElement.closest('script, style, noscript') ? 1 : 2 });
  // Phase 10: every text node counts, shown or not (a closed menu, a collapsed answer, the other version): no backups ship, so all of it is shipped text
  while (w.nextNode()) { const e = w.currentNode.parentElement; const shown = vis(e);
    const blk = e.closest('p, li, dd, dt, h1, h2, h3, h4, figcaption, td, th, label, button, a, div') || e;   // the whole line, not an inner span
    runs.push({ t: w.currentNode.nodeValue.replace(/\s+/g, ' ').trim(), blk: (blk.innerText || blk.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 220), font: shown ? getComputedStyle(e).fontFamily.split(',')[0].replace(/["']/g, '').trim() : null, sec: (e.closest('section[id]') || { id: 'chrome' }).id, svg: !!e.closest('svg') }); }
  const tel = [...document.querySelectorAll('a[href^="tel:"]')].map(a => a.getAttribute('href'));
  const mail = [...document.querySelectorAll('a[href^="mailto:"]')].map(a => a.getAttribute('href').split('?')[0]);
  const ba = [...new Set([...document.querySelectorAll('img[data-img^="ba-"]')].map(i => i.dataset.img.replace(/-(before|after)$/, '')))];
  const towns = { tw: document.querySelectorAll('.tw__t').length, ca: document.querySelectorAll('.ca__set:first-child .ca__t').length };
  return { runs, tel, mail, ba, towns };
}

(async () => {
  const b = await chromium.launch(); const R = { pages: {}, fails: [], numbers: [], fonts: {}, requests: [] };
  const fail = (pg, what) => R.fails.push(pg + ': ' + what);
  const baAll = new Set();
  for (const [name, file] of Object.entries(PAGES)) {
    for (const v of [1, 2]) {
      const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
      p.on('request', r => { const u = r.url(); if (!u.startsWith('file:') && !u.startsWith('data:') && !u.startsWith('blob:')) R.requests.push(name + ' ' + u); });
      await p.goto(SITE + file); await p.waitForTimeout(1000);
      if (v === 2) await p.evaluate(() => [...document.querySelectorAll('section.sec[id]')].forEach(s => { if (s.querySelectorAll(':scope .ver[data-v]').length > 1) EZ.activate(s.id, 2); }));
      // reveal everything once (reduced motion settles every state)
      const H = await p.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < H; y += 800) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(60); }
      const g = await p.evaluate(grab); await p.close();
      const key = name + ' v' + v; R.pages[key] = { runs: g.runs.length, tel: [...new Set(g.tel)], mail: [...new Set(g.mail)], ba: g.ba, towns: g.towns };
      g.ba.forEach(x => baAll.add(x));
      const all = g.runs.map(r => r.t).join(' \n ');
      // ---- facts
      (all.match(/\b\d\.\d\b/g) || []).forEach(x => { if (x !== '4.8' && !/\d\.\d\s*(m|%)/.test(x)) R.numbers.push({ page: key, n: x, ctx: 'decimal (rating?)' }); });
      g.tel.forEach(h => { if (h !== 'tel:+17542360675') fail(key, 'tel link ' + h); });
      g.mail.forEach(h => { if (h.toLowerCase() !== 'mailto:sales@elbazconstruction.com') fail(key, 'mailto ' + h); });
      g.runs.forEach(r => {
        const t = r.t.replace(/[   ]/g, ' ').replace(/‑/g, '-');
        if (/\(\d{3}\) ?\d{3}-\d{4}/.test(t) && !/\(754\) ?236-0675/.test(t)) fail(key, 'phone text "' + t + '"');
        if (/\bCBC\d+/.test(r.blk)) { const bl = r.blk.replace(/[ ]/g, ' '); if (!bl.includes('Licensed, bonded & insured · CBC1265280') && !bl.includes('Florida Certified Building Contractor, licence CBC1265280')) fail(key, 'licence block "' + bl + '"'); if (/CBC(?!1265280)\d+/.test(bl)) fail(key, 'wrong licence number "' + bl + '"'); }
        if (/\d+\s*\w*\s*Flagler/.test(t) && !/19 W Flagler St( #310)?/.test(t)) fail(key, 'address "' + t + '"');
        if (/\bSat(urday)?\b/.test(t) && !/closed/i.test(r.blk)) fail(key, 'Saturday without closed: "' + r.blk + '"');
        if (/\b(we (have )?received|has been sent|was sent|message sent|request sent|submitted successfully|thank you for (your )?submission)\b/i.test(t)) fail(key, 'claims sent: "' + t + '"');
        if (/\b(\d\.\d) stars?\b/i.test(t) && !/4\.8/.test(t)) fail(key, 'rating "' + t + '"');
        if (/\b(\d{2,4}) (Google )?reviews\b/i.test(t) && !/\b343\b/.test(t)) fail(key, 'review count "' + t + '"');
        // ---- numbers lock
        (t.match(/(?<![\w.])\d+(?:[.,]\d+)?(?![\w])/g) || []).forEach(n => { const k = String(+n.replace(',', '')); if (!PUBLISHED.has(k) && !LOCKNUM.has(k)) R.numbers.push({ page: key, sec: r.sec, n, ctx: r.blk.slice(0, 120) }); });
        if (r.font) R.fonts[r.font] = (R.fonts[r.font] || 0) + 1;
        if (/~[a-z]+\/[a-z]+|\bundefined\b|\bNaN\b|\[object|\{\{|\}\}|\bnull\b/.test(t)) fail(key, 'broken text "' + t.slice(0, 80) + '" in ' + r.sec);
      });
      if (name === 'home' && g.towns.tw !== 104) fail(key, 'Towns shows ' + g.towns.tw + ' towns, not 104');
    }
  }
  if (baAll.size > 4) R.fails.push('before/after pairs on the site: ' + baAll.size + ' (' + [...baAll].join(', ') + '), more than the 4 genuine pairs');
  R.baPairs = [...baAll];
  // every embedded face must be byte-identical to a Poppins or Roboto file; an alias (the size-adjusted 'Elbaz Display') passes only that way
  const crypto = require('crypto'), H = x => crypto.createHash('sha256').update(x).digest('hex');
  const ok = {}; ['poppins-latin-500-normal.woff2', 'poppins-latin-600-normal.woff2', 'roboto-latin-wght-normal.woff2'].forEach(n => { ok[H(fs.readFileSync('/home/user/CLaude/remodeling/src/fonts/' + n))] = n; });
  R.faces = {};
  for (const file of Object.values(PAGES)) {
    const html = fs.readFileSync('/home/user/CLaude/remodeling/site/' + file, 'utf8');
    for (const m of html.matchAll(/@font-face\{font-family:'([^']+)';src:url\(data:font\/woff2;base64,([A-Za-z0-9+/=]+)\)/g)) {
      const src = ok[H(Buffer.from(m[2], 'base64'))]; R.faces[m[1] + ' (' + file + ')'] = src || 'NOT POPPINS OR ROBOTO';
      if (!src) R.fails.push('embedded face ' + m[1] + ' in ' + file + ' is not Poppins or Roboto');
    }
  }
  const aliasOk = Object.entries(R.faces).filter(([k, v]) => k.startsWith('Elbaz Display') && /^poppins/.test(v)).length > 0;
  Object.keys(R.fonts).forEach(f => { if (!/^(Poppins|Roboto)$/.test(f) && !(f === 'Elbaz Display' && aliasOk)) R.fails.push('font family in use: ' + f + ' (' + R.fonts[f] + ' runs)'); });
  // de-duplicate the number list by (n, ctx)
  const seen = new Set(); R.numbers = R.numbers.filter(x => { const k = x.n + '|' + x.ctx; if (seen.has(k)) return false; seen.add(k); return true; });
  R.requests = [...new Set(R.requests)];
  await b.close();
  fs.mkdirSync(require('path').dirname(OUT), { recursive: true }); fs.writeFileSync(OUT, JSON.stringify(R, null, 1));
  console.log('fails:', R.fails.length); R.fails.forEach(f => console.log('  FAIL', f));
  console.log('fonts:', JSON.stringify(R.fonts)); console.log('embedded faces:', JSON.stringify([...new Set(Object.values(R.faces))]), Object.keys(R.faces).length + ' faces across 5 pages');
  console.log('before/after pairs:', R.baPairs.join(', '));
  console.log('network requests beyond the file:', R.requests.length); R.requests.slice(0, 10).forEach(u => console.log('  ', u));
  console.log('numbers outside the lock and FACTS.md:', R.numbers.length);
  R.numbers.forEach(x => console.log('  ', x.page, x.sec || '', '"' + x.n + '"', '|', x.ctx));
  for (const [k, v] of Object.entries(R.pages)) console.log(k, 'runs', v.runs, 'tel', v.tel.join(' '), 'mail', v.mail.join(' '), 'towns', JSON.stringify(v.towns));
})();
