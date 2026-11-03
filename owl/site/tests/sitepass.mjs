import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const F = process.argv[2]; const b = await chromium.launch({ args: ['--allow-file-access-from-files'] });
const pages = ['home', 'services', 'storm', 'nest', 'families', 'contact']; let fails = 0, runs = 0; const lines = [];
const probe = await (await b.newContext()).newPage(); await probe.goto('file://' + F, { waitUntil: 'load' });
const secs = await probe.evaluate(() => [...document.querySelectorAll('.sec')].map(s => s.dataset.sec));
const allV2 = '?v=' + secs.map(s => s + ':2').join(',');
const links = await probe.evaluate(() => { const ids = new Set([...document.querySelectorAll('[id]')].map(e => e.id)), pg = new Set([...document.querySelectorAll('.page')].map(p => p.dataset.page));
  return [...new Set([...document.querySelectorAll('a[href^="#/"]')].map(a => a.getAttribute('href')))].filter(h => { const [p, s] = h.slice(2).split('/'); return !pg.has(p) || (s && !ids.has('s-' + s)); }); });
lines.push(`internal links that point nowhere: ${links.length ? links.join(' ') : 'none'}`); if (links.length) fails++;
for (const [mode, q, rm] of [['defaults', '', 'no-preference'], ['all-V2', allV2, 'no-preference'], ['reduced', '', 'reduce']]) {
  for (const w of mode === 'reduced' ? [1440] : [1440, 768, 390]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 }, reducedMotion: rm, isMobile: w < 500, hasTouch: w < 500 }); const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
    for (const pg of pages) {
      runs++; await p.goto('file://' + F + q + '#/' + pg, { waitUntil: 'load' }); await p.waitForTimeout(150);
      const H = await p.evaluate(() => document.body.scrollHeight); let ov = 0;
      for (let y = 0; y < H; y += 800) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(25); ov = Math.max(ov, await p.evaluate(() => document.documentElement.scrollWidth - innerWidth)); }
      await p.waitForTimeout(250);
      const r = await p.evaluate((pg) => { const page = document.querySelector(`.page[data-page="${pg}"]`);
        return { h1: [...page.querySelectorAll('h1')].filter(x => x.offsetParent).length, img: [...page.querySelectorAll('.ver:not([hidden]) img')].filter(i => i.complete && i.naturalWidth === 0).map(i => i.getAttribute('src')),
          deep: [...page.querySelectorAll(':scope > .sec')].map(s => s.querySelector(':scope > .ver:not([hidden]) > section').classList.contains('on-deep')).map((d, i, a) => d === (i === a.length - 1)).every(Boolean) }; }, pg);
      const ok = ov <= 0 && r.h1 === 1 && !r.img.length && r.deep && !errs.length;
      if (!ok) { fails++; lines.push(`FAIL ${mode} ${w} ${pg}: overflow ${ov} h1 ${r.h1} brokenimg ${r.img.join(',')} deeplast ${r.deep} errors ${errs.join('|')}`); }
      errs.length = 0;
    }
    await ctx.close();
  }
}
lines.push(`${runs} page renders checked (6 pages × 3 widths × defaults and all-V2, + reduced motion at 1440); failures: ${fails}`);
console.log(lines.join('\n')); await b.close();
