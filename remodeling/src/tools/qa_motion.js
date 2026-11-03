// QA pass 2 · Motion (ELBAZ-QA-FINALIZE-BRIEF): every animation and scroll sequence, frame by frame: entrances, pinned
// moments, transitions between sections and pages. Per page at a width:
//  frames    a steady wheel scroll through the page with every animation frame's duration recorded (stutter: frames over
//            50 ms, and long tasks), sampled at intervals
//  overlap   at every sampled position, text blocks that overlap other text blocks (late arrivals, collisions mid-move)
//  strips    each section, six frames across its whole travel (entering at the bottom to leaving at the top), for review
// Usage: node qa_motion.js <page> <width> <round>        (the page transition: node qa_motion.js transition 1440 <round>)
const { chromium } = require('playwright');
const fs = require('fs');
const { execFileSync } = require('child_process');
const PAGES = { home: 'elbaz-homepage.html', kitchens: 'kitchens.html', bathrooms: 'bathrooms.html', renovation: 'renovation.html', contact: 'contact.html' };
const [page, wArg, round] = process.argv.slice(2); const W = +wArg, VH = W > 500 ? 900 : 844;
const OUT = `/home/user/CLaude/qa/finalize/qa${round}/motion`; fs.mkdirSync(OUT, { recursive: true });

function overlaps() {
  const vis = e => { const r = e.getBoundingClientRect(); if (r.width < 4 || r.height < 4 || r.bottom < 60 || r.top > innerHeight) return false; let op = 1; for (let a = e; a; a = a.parentElement) { const s = getComputedStyle(a); if (s.visibility === 'hidden' || s.display === 'none') return false; op *= +s.opacity; } return op > .25; };
  const blocks = [...document.querySelectorAll('main h1, main h2, main h3, main p, main li, main figcaption, main .btn, main dt, main dd, main label')]
    .filter(e => vis(e) && [...e.childNodes].some(n => n.nodeType === 3 && n.nodeValue.trim()) && !e.closest('svg, .ca__rows, [aria-hidden="true"]'));
  const out = [];
  for (let i = 0; i < blocks.length; i++) for (let j = i + 1; j < blocks.length; j++) {
    const a = blocks[i], b = blocks[j]; if (a.contains(b) || b.contains(a)) continue;
    const p = a.getBoundingClientRect(), q = b.getBoundingClientRect();
    const w = Math.min(p.right, q.right) - Math.max(p.left, q.left), h = Math.min(p.bottom, q.bottom) - Math.max(p.top, q.top);
    if (w <= 2 || h <= 2) continue; const ar = w * h, sm = Math.min(p.width * p.height, q.width * q.height);
    if (ar / sm > .3) { const t = e => ((e.closest('section[id]') || { id: 'chrome' }).id) + ' ' + e.tagName.toLowerCase() + '.' + String(e.className).split(' ')[0] + ' "' + e.textContent.trim().replace(/\s+/g, ' ').slice(0, 26) + '"'; out.push(t(a) + ' x ' + t(b)); }
  }
  return out;
}

(async () => {
  const b = await chromium.launch();
  if (page === 'transition') {
    // the single file: Home to Kitchens through the logo's page switch, frame by frame
    const p = await b.newPage({ viewport: { width: W, height: VH } });
    await p.goto('file:///home/user/CLaude/remodeling/site/elbaz-construction.html'); await p.waitForTimeout(2500);
    const f = p.frames().find(x => x !== p.mainFrame()) || p.mainFrame();
    await f.evaluate(() => { const a = [...document.querySelectorAll('a')].find(a => /kitchens/i.test(a.getAttribute('href') || '') && a.getBoundingClientRect().width > 0); a.click(); });
    for (let i = 0; i < 14; i++) { await p.screenshot({ path: `${OUT}/transition-${W}-${String(i).padStart(2, '0')}.png` }); await p.waitForTimeout(70); }
    execFileSync('python3', ['-c', `
from PIL import Image
import glob
fs=sorted(glob.glob('${OUT}/transition-${W}-*.png')); ims=[Image.open(f).resize((360, int(360*${VH}/${W}))) for f in fs]
cols=7; rows=(len(ims)+cols-1)//cols; w,h=ims[0].size
s=Image.new('RGB',(cols*(w+6),rows*(h+6)),'white')
for i,im in enumerate(ims): s.paste(im,((i%cols)*(w+6),(i//cols)*(h+6)))
s.save('${OUT}/transition-${W}.png')
import os
for f in fs: os.remove(f)`]);
    console.log('transition strip saved'); await b.close(); return;
  }
  const p = await b.newPage({ viewport: { width: W, height: VH } });
  const errs = []; p.on('pageerror', e => errs.push(String(e).slice(0, 160)));
  await p.goto('file:///home/user/CLaude/remodeling/site/' + PAGES[page]); await p.waitForTimeout(1300);
  await p.evaluate(() => { window.__fd = []; let last = performance.now(); (function tick(t) { window.__fd.push(t - last); last = t; requestAnimationFrame(tick); })(performance.now());
    window.__lt = 0; try { new PerformanceObserver(l => { window.__lt += l.getEntries().length; }).observe({ entryTypes: ['longtask'] }); } catch (e) {} });
  await p.mouse.move(W - 3, VH / 2);
  const H = await p.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  const ov = new Set(); let steps = 0;
  while (true) {
    await p.mouse.wheel(0, 60); await p.waitForTimeout(16); steps++;
    if (steps % 12 === 0) { (await p.evaluate(overlaps)).forEach(x => ov.add(x)); }
    const y = await p.evaluate(() => scrollY); if (y >= H - 2 || steps > 3000) break;
  }
  const fd = await p.evaluate(() => { const d = window.__fd.slice(5).sort((a, b) => a - b); return { n: d.length, p50: d[Math.floor(d.length * .5)], p95: d[Math.floor(d.length * .95)], over50: d.filter(x => x > 50).length, lt: window.__lt }; });
  // strips: each section, six frames across its whole travel
  const secs = await p.evaluate(() => [...document.querySelectorAll('section.sec[id]')].filter(s => !s.parentElement.closest('section.sec')).map(s => { const sp = s.parentElement.classList.contains('pin-spacer') ? s.parentElement : s; return { id: s.id, top: Math.round(sp.getBoundingClientRect().top + scrollY), h: sp.offsetHeight }; }));
  for (const s of secs) {
    const from = Math.max(0, s.top - VH), to = Math.min(H, s.top + s.h), names = [];
    let cur = await p.evaluate(() => scrollY);
    // approach from above so scrubbed and once-only entrances play in order
    if (cur > from) { await p.evaluate(y => scrollTo(0, y), Math.max(0, from - VH)); await p.waitForTimeout(300); cur = Math.max(0, from - VH); }
    for (let k = 0; k < 6; k++) {
      const y = Math.round(from + (to - from) * k / 5);
      while (cur < y) { cur = Math.min(y, cur + 160); await p.evaluate(v => scrollTo(0, v), cur); await p.waitForTimeout(24); }
      await p.waitForTimeout(700); const n = `${OUT}/${page}-${W}-${s.id}-${k}.png`; await p.screenshot({ path: n }); names.push(n);
    }
    execFileSync('python3', ['-c', `
from PIL import Image
import os
names=${JSON.stringify(names)}
ims=[Image.open(n) for n in names]; tw=${W > 500 ? 360 : 180}; th=int(tw*${VH}/${W})
ims=[i.resize((tw,th)) for i in ims]
s=Image.new('RGB',(6*(tw+6),th),'red')
for i,im in enumerate(ims): s.paste(im,(i*(tw+6),0))
s.save('${OUT}/${page}-${W}-${s.id}.png')
for n in names: os.remove(n)`]);
  }
  const R = { page, W, frames: fd, overlaps: [...ov], errors: errs };
  fs.writeFileSync(`${OUT}/${page}-${W}.json`, JSON.stringify(R, null, 1));
  console.log(`${page} ${W}: frames ${fd.n} | p50 ${fd.p50 && fd.p50.toFixed(1)}ms p95 ${fd.p95 && fd.p95.toFixed(1)}ms | over 50ms ${fd.over50} | long tasks ${fd.lt} | overlaps ${R.overlaps.length} | errors ${errs.length}`);
  R.overlaps.slice(0, 15).forEach(x => console.log('   overlap: ' + x));
  await b.close();
})();
