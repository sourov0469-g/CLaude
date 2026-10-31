// R4/R5 FINAL GATE (browser part): every visible version switches and mounts; light check (no black or near-black
// ground, no large dark panel, deep-green uses listed); logo in header and footer; favicon; errors. Runs WITH motion
// (the R5 lesson: a custom property named like a token blanked a button only when motion ran), and checks that every
// visible .btn keeps a painted ground once the section has been scrolled through.
import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const HOME = ['hero', 'proof', 'svc', 'work', 'family', 'how', 'storm', 'area', 'call'];
const PAGES = [['rembrandt-homepage.html', HOME, 8], ['services.html', ['sphero', 'svcp', 'spclose'], 5], ['about.html', ['abhero', 'about', 'abclose'], 5], ['contact.html', ['cthero', 'contact'], 5]]; // R5: inner pages per section
const b = await chromium.launch(); let bad = 0; const dark = [], green = [], fail = [];
for (const [file, ids, n] of PAGES) {
  for (let v = 1; v <= n; v++) {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); const errs = []; p.on('pageerror', e => errs.push(e.message));
    await p.goto(`file:///home/user/CLaude/rembrandt/v5/${file}?v=${ids.map(i => i + v).join(',')}`); await p.waitForTimeout(1500);
    const r = await p.evaluate(ids => {
      const rgb = s => (s.match(/[\d.]+/g) || []).map(Number), lum = ([r, g, b]) => { const f = c => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
      const hue = ([r, g, b]) => { const mx = Math.max(r, g, b), mn = Math.min(r, g, b); if (mx === mn) return -1; const d = mx - mn; let h = mx === r ? (g - b) / d : mx === g ? 2 + (b - r) / d : 4 + (r - g) / d; return (h * 60 + 360) % 360; };
      const ground = el => { for (let e = el; e; e = e.parentElement) { const c = getComputedStyle(e).backgroundColor, a = rgb(c); if (a.length === 3 || (a.length === 4 && a[3] > 0.5)) return a.slice(0, 3); } return [255, 255, 255]; };
      return ids.map(id => { const s = document.getElementById(id), root = s.querySelector('.stage').firstElementChild, R = s.getBoundingClientRect();
        const g = ground(root), big = [...root.querySelectorAll('*')].filter(e => { const q = e.getBoundingClientRect(); return q.width * q.height > 0.3 * R.width * R.height && getComputedStyle(e).backgroundImage === 'none'; })
          .map(e => [e.className && e.className.baseVal === undefined ? e.className : '', rgb(getComputedStyle(e).backgroundColor)]).filter(([, a]) => (a.length === 3 || a[3] > 0.5) && lum(a.slice(0, 3)) < 0.05);
        // R7: a large deep-GREEN panel (HSL hue 150-200, saturation >= 0.4: green-900 is hue 160 / 0.62, where a near-black
        // neutral is ~0.15) is a declared deep band, listed and counted toward the cap; any other dark panel fails
        const sat = ([r, g, b]) => { const mx = Math.max(r, g, b) / 255, mn = Math.min(r, g, b) / 255, l = (mx + mn) / 2; return mx === mn ? 0 : (mx - mn) / (1 - Math.abs(2 * l - 1)); };
        const isDeepGreen = a => { const h = hue(a.slice(0, 3)); return h >= 150 && h <= 200 && sat(a.slice(0, 3)) >= 0.4; };
        const deepBig = big.filter(([, a]) => isDeepGreen(a)), darkBig = big.filter(([, a]) => !isDeepGreen(a));
        return { id, v: s.dataset.v, kids: root.childElementCount, g, L: +lum(g).toFixed(3), hue: Math.round(hue(g)), gsat: +sat(g).toFixed(2), big: darkBig.map(x => x[0]).slice(0, 2), deepBig: deepBig.map(x => x[0]).slice(0, 2) }; });
    }, ids);
    const H = await p.evaluate(() => document.documentElement.scrollHeight); for (let y = 0; y < H; y += 600) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(120); } await p.waitForTimeout(600);
    // R6: a secondary call is transparent by design (outline ring), so a button fails only with no fill, no ring and no border
    const nobg = await p.evaluate(() => [...document.querySelectorAll('section .btn')].filter(a => { const c = getComputedStyle(a); return a.getBoundingClientRect().width && c.backgroundColor === 'rgba(0, 0, 0, 0)' && c.boxShadow === 'none' && !(parseFloat(c.borderTopWidth) > 0 && c.borderTopColor !== 'rgba(0, 0, 0, 0)') && !a.closest('[aria-hidden="true"]'); }).map(a => a.closest('section').id + ':' + a.className));
    if (nobg.length) { bad++; fail.push(`${file} v${v}: buttons without a ground: ${nobg.join(', ')}`); }
    const logo = await p.evaluate(() => [document.querySelectorAll('.nav svg.logo, header svg.logo').length, document.querySelectorAll('footer svg.logo, .ftr svg.logo').length, (document.querySelector('link[rel="icon"]')?.getAttribute('href') || '').slice(0, 15)]);
    let deepN = 0;
    for (const x of r) {
      if (x.v !== String(v) || !x.kids) { bad++; fail.push(`${file} ${x.id}${v}: v=${x.v} kids=${x.kids}`); }
      // R6/R7: the deep ground (R7 green-900 #0e3b2c, L 0.034, HSL hue 160) is listed and capped at two sections per page; anything else under
      // L 0.05, or a large near-black panel, fails
      if (x.deepBig.length) { green.push(`${file.split('.')[0].replace('rembrandt-homepage', 'home')} ${x.id}${v} panel ${x.deepBig[0].split(' ').pop()}`); deepN++; }
      if (x.L < 0.12 && x.hue >= 150 && x.hue <= 200 && x.gsat >= 0.4 && !x.big.length) { green.push(`${file.split('.')[0].replace('rembrandt-homepage', 'home')} ${x.id}${v} L=${x.L} sat=${x.gsat}`); deepN++; }
      else if (x.L < 0.05 || x.big.length) { dark.push(`${x.id}${v} L=${x.L} ${x.big.join(',')}`); bad++; }
    }
    if (deepN > 2) { bad++; fail.push(`${file} v${v}: ${deepN} deep-accent sections (cap 2)`); }
    if (v === 1) console.log(file, 'logo header', logo[0], 'footer', logo[1], 'favicon', logo[2]);
    if (errs.length) { bad++; fail.push(`${file} v${v}: ${errs.join(' | ').slice(0, 160)}`); }
    console.log(file, 'v' + v, r.map(x => `${x.id}:${x.v === String(v) ? 'ok' : 'BAD'}(L${x.L})`).join(' '));
    await p.close();
  }
}
console.log('dark grounds or panels:', dark.length ? dark : 'none'); console.log('deep-accent grounds (cap 2 per page view):', green.length ? green : 'none');
console.log('switch/mount failures:', fail.length ? fail : 'none'); console.log('bad', bad); await b.close();
