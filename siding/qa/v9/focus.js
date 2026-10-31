// REBRAND QA round 2, focus indicators (S0248 design-token-contrast, S1497 contrast: UI components and focus rings
// >= 3:1 against adjacent surfaces): every focusable element, in every visible version and the chrome, is focused
// from the keyboard and its rendered indicator measured: the outline colour against the surface the outline sits on
// (the nearest painted ancestor, since outline-offset puts it outside the element) and, when an inner halo is drawn,
// that too. An element passes if the outline (or a ring box-shadow) reaches 3:1 against that surface.
// NODE_PATH=$(npm root -g) node qa/v9/focus.js [pages]
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
const PAGES = (process.argv[2] || 'index,siding,windows,roofing,outdoor,projects,financing,about,contact').split(',');
const BASE = process.env.QBASE || 'http://127.0.0.1:8765/';
const MEASURE = () => {
  const L = c => { const m = c && c.match(/[\d.]+/g); if (!m) return null; let [r, g, b2, a = 1] = m.map(Number); if (c.startsWith('color(')) { r *= 255; g *= 255; b2 *= 255; } if (a < 0.5) return null; const f = x => { x /= 255; return x <= .04045 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4; }; return .2126 * f(r) + .7152 * f(g) + .0722 * f(b2); };
  const bgOf = el => { for (let e = el; e; e = e.parentElement) { const c = getComputedStyle(e); if (/url\(|gradient/.test(c.backgroundImage) && !e.matches('button, a')) return null; const y = L(c.backgroundColor); if (y !== null) return y; } return 1; };
  const cr = (a, b) => (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
  const SEL = 'a[href], button, input:not([type=hidden]), select, textarea, summary, [tabindex="0"], [role="slider"]';
  const els = [...document.querySelectorAll(SEL)].filter(e => !e.closest('template, [hidden], [inert], .sec[data-bk], .pal, .cur') && e.checkVisibility({ opacityProperty: true, visibilityProperty: true }) && e.tabIndex >= 0);
  const rows = [];
  for (const el of els) {
    el.focus({ preventScroll: true });
    if (document.activeElement !== el || !el.matches(':focus-visible')) continue;
    // the indicator may be drawn on the element or on a visible proxy (a styled sibling span for native inputs)
    let tgt = el, c = getComputedStyle(el);
    if ((c.outlineStyle === 'none' || parseFloat(c.outlineWidth) === 0) && c.boxShadow === 'none' && el.matches('input') && el.nextElementSibling) { tgt = el.nextElementSibling; c = getComputedStyle(tgt); }
    if (el.closest('label') && c.outlineStyle === 'none') { const lb = el.closest('label'); const lc = getComputedStyle(lb); if (lc.outlineStyle !== 'none') { tgt = lb; c = lc; } }
    const behind = bgOf(tgt.parentElement), own = bgOf(tgt);
    const ow = c.outlineStyle !== 'none' ? parseFloat(c.outlineWidth) : 0, oc = L(c.outlineColor);
    const rings = (c.boxShadow.match(/rgba?\([^)]*\)[^,]*/g) || []).map(x => ({ y: L(x.match(/rgba?\([^)]*\)/)[0]), sp: parseFloat(x.replace(/rgba?\([^)]*\)/, '').trim().split(/\s+/)[3] || 0), off: x.replace(/rgba?\([^)]*\)/, '').trim().split(/\s+/)[1], inset: /inset/.test(x) })).filter(x => x.y !== null && (x.sp >= 2 || Math.abs(parseFloat(x.off) || 0) >= 2));
    const off = parseFloat(c.outlineOffset) || 0;
    const against = off >= 0 ? behind : own;
    const outlineCr = ow >= 2 && oc !== null && against !== null ? cr(oc, against) : 0;
    const ringCr = Math.max(0, ...rings.map(r => r.inset ? (own !== null ? cr(r.y, own) : 0) : (behind !== null ? cr(r.y, behind) : 0)));
    const best = Math.max(outlineCr, ringCr);
    const desc = el.tagName.toLowerCase() + (typeof el.className === 'string' && el.className ? '.' + el.className.trim().split(/\s+/)[0] : '') + ' "' + (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 22) + '" @' + ((el.closest('.sec') || el.closest('header, footer, .picks, .vsw') || { id: 'page' }).id || (el.closest('header') ? 'header' : el.closest('footer') ? 'footer' : el.closest('.picks') ? 'picks' : 'chrome'));
    rows.push({ desc, best: +best.toFixed(2), outline: +outlineCr.toFixed(2), ring: +ringCr.toFixed(2), photo: against === null });
  }
  return rows;
};
(async () => {
  const b = await chromium.launch(); const out = []; let n = 0, bad = 0, photo = 0; const seen = new Set();
  for (const pg of PAGES) {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
    await p.goto(BASE + 'site/' + pg + '.html'); await p.waitForFunction(() => document.documentElement.dataset.apReady === '1', null, { timeout: 30000 });
    await p.keyboard.press('Tab');
    const secs = await p.evaluate(() => [...document.querySelectorAll('.sec:not([data-bk])')].map(s => ({ id: s.id, n: s.querySelectorAll('.vsw-b').length })));
    const vmax = Math.max(1, ...secs.map(s => s.n));
    for (let v = 1; v <= vmax; v++) {
      await p.evaluate(([secs, v]) => secs.forEach(s => { const t = document.querySelector(`#${s.id} .vsw-b[data-v="${Math.min(v, s.n)}"]`); if (t) t.click(); }), [secs, v]);
      await p.waitForTimeout(300); await p.keyboard.press('Shift');
      const rows = await p.evaluate(MEASURE);
      for (const r of rows) {
        const key = pg + r.desc + r.best; if (seen.has(key)) continue; seen.add(key); n++;
        if (r.photo) { photo++; continue; }
        if (r.best < 3) { bad++; out.push(`FAIL ${pg} v${v} ${r.desc}: best indicator ${r.best}:1 (outline ${r.outline}, ring ${r.ring})`); }
      }
    }
    await p.close();
  }
  out.unshift(`focus indicators measured: ${n} distinct; on photographs (not measurable as a flat pair): ${photo}; under 3:1: ${bad}`);
  console.log(out.slice(0, 60).join('\n')); fs.writeFileSync(path.join(__dirname, 'focus.txt'), out.join('\n') + '\n'); await b.close();
})();
