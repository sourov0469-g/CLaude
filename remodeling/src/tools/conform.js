// Phase 7 conformance: the brief's binding numbers, measured on the built pages (FINALIZE-ELBAZ.md
// "CONVERSION FLOOR", "SYSTEM NUMBERS", "AUDIT STANDARD" vetoes). Usage: node conform.js [outfile]
//  copy      hero <= 40 words; section headline <= 8 words + support <= 35 words
//  call      the phone reachable at every scroll position; on phones a visible tel: link at all times
//  trust     licence line present on every page; proof (4.8 / 343 / licence) in the same section as each CTA
//  contrast  WCAG AA on every visible text run (4.5, or 3 for large text), composited through opacity
//  pins      a wheel scroll from top reaches the footer on a phone (no pin traps scrolling)
//  icons     small SVG icons: effective stroke vs Carbon (1.5px at 24, 1px at 16, i.e. size / 16)
const { chromium } = require('playwright');
const fs = require('fs');
const SITE = 'file:///home/user/CLaude/remodeling/site/';
const PAGES = { home: 'elbaz-homepage.html', kitchens: 'kitchens.html', bathrooms: 'bathrooms.html', renovation: 'renovation.html', contact: 'contact.html' };
const FIRM = (fs.readFileSync('/home/user/CLaude/remodeling/FACTS.md', 'utf8').match(/"[^"]{8,}"/g) || []).map(q => q.slice(1, -1).replace(/[‘’]/g, "'").replace(/\u00a0/g, ' '));
const OUT = process.argv[2] || '/home/user/CLaude/qa/finalize/phase7/conform.json';

function measure(FIRM) {
  const LOCK = '.nums, a[href^="tel:"], [class*="proof"], .vouch, [class*="lic"], .kch, nav, form label, form .c-consent, form .c-note, .fm3__letter, .fm3__to, .fm5__st, [class*="hours"], .hm__name, .ri3__a, .ri3__b';
  const words = s => (s.trim().match(/[A-Za-z0-9’'&$.,%-]+/g) || []).filter(w => /[A-Za-z0-9]/.test(w)).length;
  const vis = el => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none' && !el.closest('[hidden], [aria-hidden="true"], .sr-only, .visually-hidden'); };
  const txt = el => { let s = ''; const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, { acceptNode: n => { const p = n.parentElement; return p && !p.closest('script, style, [hidden], [aria-hidden="true"], .sr-only, .visually-hidden') && vis(p) ? 1 : 2; } }); while (w.nextNode()) s += ' ' + w.currentNode.nodeValue; return s; };
  const secs = [...document.querySelectorAll('main section.sec[id], body > section.sec[id], section.sec[id]')].filter((s, i, a) => a.indexOf(s) === i && !s.parentElement.closest('section.sec'));
  const copy = secs.map((s, i) => {
    const h = s.querySelector('h1, h2');
    let sup = '';
    if (h) { let n = h.nextElementSibling, k = 0; while (n && k < 3) { if (n.matches('p') && vis(n)) { sup += ' ' + txt(n); k++; } else if (k) break; n = n.nextElementSibling; } }
    if (h && !sup) { const l = s.querySelector('.t-lead, [class*="__lead"]'); if (l && vis(l)) sup = txt(l); }
    let authored = 0, locked = 0; const split = [];
    if (i === 0) { const tw = document.createTreeWalker(s, NodeFilter.SHOW_TEXT, { acceptNode: n => { const p = n.parentElement; return n.nodeValue.trim() && p && !p.closest('script, style, [hidden], [aria-hidden="true"], .sr-only, .visually-hidden') && vis(p) ? 1 : 2; } });
      while (tw.nextNode()) { const t = tw.currentNode.nodeValue.trim().replace(/\s+/g, ' ').replace(/[‘’]/g, "'"), p = tw.currentNode.parentElement, n = words(t);
        const isL = p.closest(LOCK) || (t.length >= 24 && FIRM.some(q => q.includes(t))); if (isL) locked += n; else authored += n; split.push((isL ? 'L ' : 'A ') + n + ' ' + t.slice(0, 60)); } }
    return { id: s.id, first: i === 0, authored, locked, split, head: h ? txt(h).trim().replace(/\s+/g, ' ') : null, headWords: h ? words(txt(h)) : 0, supWords: words(sup), allWords: words(txt(s)) };
  });
  const body = document.body.innerText;
  const licence = body.includes('Licensed, bonded & insured · CBC1265280');
  const ctas = [...document.querySelectorAll('a.btn[href]:not([href^="tel:"]), button.btn[type="submit"]')].filter(b => vis(b) && !b.classList.contains('btn--ghost') && !b.closest('nav, header, footer, .nav, .foot'))
    .map(b => { const s = b.closest('section.sec'); const t = s ? s.innerText : ''; return { sec: s ? s.id : '?', label: txt(b).trim().replace(/\s+/g, ' '), proof: /4\.8|343|CBC1265280/.test(t) }; });
  return { copy, licence, ctas, sections: secs.map(s => s.id) };
}

function contrast(secId) {
  const lin = c => { c /= 255; return c <= .03928 ? c / 12.92 : Math.pow((c + .055) / 1.055, 2.4); };
  const L = c => .2126 * lin(c[0]) + .7152 * lin(c[1]) + .0722 * lin(c[2]);
  const parse = s => { const m = s.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number); return [p[0], p[1], p[2], p.length > 3 ? p[3] : 1]; };
  const over = (top, bot) => { const a = top[3]; return [top[0] * a + bot[0] * (1 - a), top[1] * a + bot[1] * (1 - a), top[2] * a + bot[2] * (1 - a), 1]; };
  const root = document.getElementById(secId); const out = [];
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: n => n.nodeValue.trim() && n.parentElement && !n.parentElement.closest('script, style, [hidden], [aria-hidden="true"], .sr-only, .visually-hidden') ? 1 : 2 });
  const seen = new Set();
  while (w.nextNode()) {
    const el = w.currentNode.parentElement; if (seen.has(el)) continue; seen.add(el);
    const r = el.getBoundingClientRect(); if (r.width < 1 || r.height < 1) continue;
    if (r.bottom < 0 || r.top > innerHeight) continue; // only what is on screen now (sections are measured in view)
    const cs = getComputedStyle(el); if (cs.visibility === 'hidden') continue;
    const svg = el.closest('svg');
    let fg = parse(svg ? (cs.fill && cs.fill.startsWith('rgb') ? cs.fill : cs.color) : cs.color); if (!fg) continue;
    let op = 1; for (let a = el; a; a = a.parentElement) op *= +getComputedStyle(a).opacity;
    if (op < .15) continue; // mid-reveal or deliberately absent; not a reading state
    // background: first painted ancestor; an image/gradient ground under the text is reported as "image"
    let bg = null, image = false; const stack = [];
    for (let a = el; a; a = a.parentElement) { const s = getComputedStyle(a); if (s.backgroundImage !== 'none' && !/^linear-gradient\(rgba?\([^)]*0\)/.test(s.backgroundImage)) image = true; const c = parse(s.backgroundColor); if (c && c[3] > 0) { stack.push(c); if (c[3] >= .99) break; } }
    bg = [255, 255, 255, 1]; for (let i = stack.length - 1; i >= 0; i--) bg = over(stack[i], bg);
    const f = over([fg[0], fg[1], fg[2], fg[3] * op], bg);
    const l1 = L(f), l2 = L(bg); const ratio = (Math.max(l1, l2) + .05) / (Math.min(l1, l2) + .05);
    const px = parseFloat(cs.fontSize) * (svg ? (svg.getBoundingClientRect().width / (svg.viewBox && svg.viewBox.baseVal && svg.viewBox.baseVal.width || svg.getBoundingClientRect().width)) : 1);
    const large = px >= 24 || (px >= 18.66 && +cs.fontWeight >= 700);
    const need = large ? 3 : 4.5;
    if (ratio < need) out.push({ sec: secId, cls: (el.getAttribute('class') || el.tagName.toLowerCase()).slice(0, 40), text: w.currentNode.nodeValue.trim().slice(0, 40), ratio: +ratio.toFixed(2), need, px: +px.toFixed(1), image, op: +op.toFixed(2) });
  }
  return out;
}

function icons() {
  const out = [];
  document.querySelectorAll('svg').forEach(s => {
    const r = s.getBoundingClientRect(); if (r.width < 8 || r.width > 32 || r.height > 32 || r.height < 8) return;
    if (s.closest('.cmp, .companion, [class*="cursor"], .logo, [class*="logo"], .brand') || s.classList.contains('eyebrow__mark') || s.closest('.ptip')) return; // the logo bracket as ornament: brand mark, not an icon
    const vb = s.viewBox && s.viewBox.baseVal && s.viewBox.baseVal.width ? s.viewBox.baseVal.width : r.width;
    const k = r.width / vb; let sw = null;
    s.querySelectorAll('path, line, polyline, circle, rect, polygon, ellipse').forEach(p => { const cs = getComputedStyle(p); if (cs.stroke !== 'none' && parseFloat(cs.strokeWidth) > 0) { const e = parseFloat(cs.strokeWidth) * (cs.vectorEffect === 'non-scaling-stroke' ? 1 : k); sw = Math.max(sw || 0, e); } });
    if (sw === null) return;
    const want = r.width / 16; // Carbon: 1.5 at 24, 1 at 16
    const host = s.closest('[class]'); out.push({ host: host ? host.getAttribute('class').split(' ')[0] : '?', size: Math.round(r.width), stroke: +sw.toFixed(2), want: +want.toFixed(2), ok: Math.abs(sw - want) <= .26 });
  });
  return out;
}

(async () => {
  const b = await chromium.launch();
  const R = {};
  for (const [name, file] of Object.entries(PAGES)) {
    R[name] = {};
    for (const w of [1440, 390]) {
      const p = await b.newPage({ viewport: { width: w, height: w > 500 ? 900 : 844 }, reducedMotion: 'reduce' });
      const errs = []; p.on('pageerror', e => errs.push(String(e)));
      await p.goto(SITE + file); await p.waitForTimeout(1200);
      const m = await p.evaluate(measure, FIRM);
      // contrast: each section in view, under reduced motion so reveals are settled
      let low = [];
      for (const id of m.sections) {
        const top = await p.evaluate(id => document.getElementById(id).getBoundingClientRect().top + scrollY, id);
        const h = await p.evaluate(id => document.getElementById(id).offsetHeight, id);
        for (let y = top; y < top + h; y += (w > 500 ? 800 : 740)) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(250); low = low.concat(await p.evaluate(contrast, id)); }
      }
      const uniq = {}; low.forEach(c => { uniq[c.sec + c.cls + c.text] = c; }); low = Object.values(uniq);
      // the phone: visible tel: link at sampled positions (sticky tap-to-call)
      let call = [];
      const H = await p.evaluate(() => document.documentElement.scrollHeight);
      for (let f = 0; f <= 1.0001; f += .1) { await p.evaluate(y => scrollTo(0, y), Math.round((H - 900) * f)); await p.waitForTimeout(120);
        call.push(await p.evaluate(() => [...document.querySelectorAll('a[href^="tel:"]')].some(a => { const r = a.getBoundingClientRect(); const cs = getComputedStyle(a); return r.width > 0 && r.top >= 0 && r.bottom <= innerHeight && cs.visibility !== 'hidden' && +cs.opacity > .5; }))); }
      // pins: a wheel scroll from the top must reach the end on a phone
      let reached = null;
      if (w === 390) {
        await p.goto(SITE + file, { waitUntil: 'load' }); await p.close();
        const q = await b.newPage({ viewport: { width: 390, height: 844 }, hasTouch: false });
        await q.goto(SITE + file); await q.waitForTimeout(1200); await q.mouse.move(195, 500);
        let last = -1, still = 0, n = 0;
        while (n < 900 && still < 12) { await q.mouse.wheel(0, 400); await q.waitForTimeout(40); const y = await q.evaluate(() => scrollY); still = y === last ? still + 1 : 0; last = y; n++; }
        reached = await q.evaluate(() => Math.ceil(scrollY + innerHeight) >= document.documentElement.scrollHeight - 2);
        R[name][w] = { ...m, contrast: low, call, reached, wheelSteps: n, icons: await q.evaluate(icons), errors: errs };
        await q.close(); continue;
      }
      R[name][w] = { ...m, contrast: low, call, reached, icons: await p.evaluate(icons), errors: errs };
      await p.close();
    }
  }
  await b.close();
  fs.mkdirSync(require('path').dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(R, null, 1));
  // summary
  for (const [name, by] of Object.entries(R)) for (const [w, m] of Object.entries(by)) {
    const over = m.copy.filter(c => c.headWords > 8 || c.supWords > 35); const hero = m.copy[0];
    console.log(`${name} ${w}: licence ${m.licence} | call visible ${m.call.filter(Boolean).length}/${m.call.length} | reached end ${m.reached} | contrast fails ${m.contrast.length} | ctas w/o proof ${m.ctas.filter(c => !c.proof).length}/${m.ctas.length} | icons off-Carbon ${m.icons.filter(i => !i.ok).length}/${m.icons.length} | hero ${hero.allWords} words (authored ${hero.authored}, locked ${hero.locked}) | headline/support over budget ${over.map(c => c.id + ':' + c.headWords + '/' + c.supWords).join(',') || 0} | errors ${m.errors.length}`);
  }
})();
