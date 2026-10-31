// R7 rule check: lime is a light colour, so lime fills carry deep-green (or black) text, NEVER white. For every visible
// text-bearing element (HTML and SVG text) in every visible version of all four pages, the paint under its centre is found
// with elementsFromPoint (background-color or SVG fill, lime-200..400 = lime); white or near-white text there fails, and so
// does any text on lime under 4.5:1.
import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const PAGES = [['rembrandt-homepage.html', ['hero', 'proof', 'svc', 'work', 'family', 'how', 'storm', 'area', 'call'], 8], ['services.html', ['sphero', 'svcp', 'spclose'], 5], ['about.html', ['abhero', 'about', 'abclose'], 5], ['contact.html', ['cthero', 'contact'], 5]];
const b = await chromium.launch(); let bad = 0, onLime = 0; const fails = [];
for (const [file, ids, n] of PAGES) for (let v = 1; v <= n; v++) {
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })).newPage();
  await p.goto(`file:///home/user/CLaude/rembrandt/v5/${file}?v=${ids.map(i => i + v).join(',')}`); await p.waitForTimeout(800);
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 800) {
    await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(150);
    const r = await p.evaluate(() => {
      const rgb = s => { const m = (s || '').match(/[\d.]+/g); return m ? m.map(Number) : null; };
      const cs0 = getComputedStyle(document.documentElement), hx = n => cs0.getPropertyValue(n).trim().toLowerCase();
      const lime = new Set(['--lime-200', '--lime-300', '--lime-400'].map(hx));
      const toHex = a => '#' + a.slice(0, 3).map(x => (x | 0).toString(16).padStart(2, '0')).join('');
      const lin = c => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }, L = a => .2126 * lin(a[0]) + .7152 * lin(a[1]) + .0722 * lin(a[2]);
      const out = [];
      for (const e of document.querySelectorAll('h1,h2,h3,p,li,a,button,span,b,strong,em,label,dt,dd,figcaption,text,tspan,td,th')) {
        if (e.closest('.sec.on-bk,.sec.on-rec,.cmp,[aria-hidden="true"]') && !(e instanceof SVGElement)) continue;
        if (e.closest('.sec.on-bk,.sec.on-rec,.cmp')) continue;
        const own = [...e.childNodes].some(t => t.nodeType === 3 && t.textContent.trim()); if (!own) continue;
        const R = e.getBoundingClientRect(); if (!R.width || R.bottom < 0 || R.top > innerHeight) continue;
        const c = getComputedStyle(e); if (c.visibility === 'hidden' || +c.opacity < .05) continue;
        const fg = rgb(e instanceof SVGElement ? c.fill : c.color); if (!fg || (fg[3] !== undefined && fg[3] < .5)) continue;
        const x = R.left + R.width / 2, y = R.top + R.height / 2; let ground = null;
        for (const u of document.elementsFromPoint(x, y)) { if (u === e || e.contains(u)) { const bc = rgb(getComputedStyle(u).backgroundColor); if (u !== e || !bc || bc[3] === 0) continue; }
          const uc = getComputedStyle(u); const paint = u instanceof SVGElement && !(u instanceof SVGSVGElement) ? uc.fill : uc.backgroundColor; const a = rgb(paint);
          if (a && (a.length < 4 || a[3] > .5) && paint !== 'none') { ground = a; break; } }
        if (!ground || !lime.has(toHex(ground))) continue;
        const ratio = (Math.max(L(fg), L(ground)) + .05) / (Math.min(L(fg), L(ground)) + .05), white = L(fg) > .8;
        out.push({ t: (e.textContent || '').trim().slice(0, 24), cls: (e.getAttribute('class') || e.tagName).split(' ')[0], fg: toHex(fg), g: toHex(ground), ratio: +ratio.toFixed(2), bad: white || ratio < 4.5 });
      }
      return out;
    });
    for (const x of r) { onLime++; if (x.bad) { bad++; fails.push(`${file} v${v} y${y}: ${x.cls} "${x.t}" ${x.fg} on ${x.g} ${x.ratio}`); } }
  }
  await p.context().close();
}
console.log(`text on lime checked: ${onLime}; white or under 4.5: ${bad}`); for (const f of [...new Set(fails)].slice(0, 40)) console.log('  ' + f);
await b.close();
