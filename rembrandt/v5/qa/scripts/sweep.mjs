// overflow gate + per-version section screenshots at a width; usage: node sweep.mjs <width> <height> [reduce] [shots]
import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
import fs from 'node:fs'; import { execFileSync } from 'node:child_process';
const [W, H, rm = '', shots = ''] = process.argv.slice(2);
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: +W, height: +H }, reducedMotion: rm === 'reduce' ? 'reduce' : 'no-preference', hasTouch: +W < 500, isMobile: +W < 500 });
const ids = ['hero', 'proof', 'svc', 'work', 'family', 'how', 'storm', 'area', 'call'], out = [], files = [];
fs.mkdirSync('sw', { recursive: true });
for (const v of [1, 2, 3, 4, 5]) {
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto('file:///home/user/CLaude/rembrandt/v5/rembrandt-homepage.html?v=' + ids.map(i => i + v).join(','));
  await p.waitForTimeout(600);
  const total = await p.evaluate(() => document.documentElement.scrollHeight);
  let worst = 0;
  for (let y = 0; y < total; y += +H * 0.7) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(120); const o = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth); worst = Math.max(worst, o); }
  // which elements stick out past the viewport (for a failing gate)
  const wide = worst > 0 ? await p.evaluate(() => [...document.querySelectorAll('body *')].filter(e => { const r = e.getBoundingClientRect(); return r.right > innerWidth + 1 && getComputedStyle(e).position !== 'fixed'; }).slice(0, 6).map(e => e.className.baseVal ?? e.className)) : [];
  out.push(`${W} ${rm || 'motion'} v${v}: overflow ${worst} ${wide.join(' | ')} errors: ${errs.join(' | ') || 'none'}`);
  if (shots) for (const id of ids) {
    await p.evaluate(id => { const s = document.getElementById(id); scrollTo(0, s.getBoundingClientRect().top + scrollY); }, id); await p.waitForTimeout(1000);
    const f = `sw/${id}${v}-${W}${rm ? '-rm' : ''}.jpg`; await p.screenshot({ path: f, type: 'jpeg', quality: 60 }); files.push(f);
  }
  await p.close();
}
console.log(out.join('\n'));
if (shots) execFileSync('python3', ['-c', `
from PIL import Image
fs=${JSON.stringify(files)}; ims=[Image.open(f) for f in fs]; w,h=ims[0].size
s=min(1, 2600/(w*7)); tw,th=int(w*s),int(h*s); cols=7; rows=(len(fs)+cols-1)//cols
S=Image.new('RGB',(cols*tw+(cols-1)*6, rows*th+(rows-1)*6),'white')
for i,im in enumerate(ims): S.paste(im.resize((tw,th)),((i%cols)*(tw+6),(i//cols)*(th+6)))
S.save('sweep-${W}${rm ? '-rm' : ''}.jpg',quality=80)`]);
await b.close();
