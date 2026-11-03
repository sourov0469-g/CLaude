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
  // QA-2: clipping-aware. A block's rect is cut by every ancestor that clips (a closed answer at 0px has no visible area),
  // and a pair counts only if, at the centre of their overlap, nothing opaque and unrelated sits above both of them.
  const clipRect = e => { let r = e.getBoundingClientRect(); r = { l: r.left, t: r.top, r: r.right, b: r.bottom };
    for (let a = e.parentElement; a && a !== document.body; a = a.parentElement) { const s = getComputedStyle(a);
      if (/(hidden|clip|auto|scroll)/.test(s.overflow + s.overflowX + s.overflowY)) { const q = a.getBoundingClientRect(); r = { l: Math.max(r.l, q.left), t: Math.max(r.t, q.top), r: Math.min(r.r, q.right), b: Math.min(r.b, q.bottom) }; } }
    return r; };
  const vis = e => { const r = clipRect(e); if (r.r - r.l < 4 || r.b - r.t < 4 || r.b < 60 || r.t > innerHeight) return false; let op = 1; for (let a = e; a; a = a.parentElement) { const s = getComputedStyle(a); if (s.visibility === 'hidden' || s.display === 'none') return false; op *= +s.opacity; } return op > .25; };
  const opaque = e => { if (/^(IMG|CANVAS|VIDEO|svg)$/.test(e.tagName)) return true; const c = getComputedStyle(e).backgroundColor.match(/[\d.]+/g); return !!c && (c.length < 4 ? true : +c[3] > .9) && c.length >= 3 && !(c.length === 4 && +c[3] === 0); };
  const skip = e => e.closest('.buddy, .ptip, .mbar, header, nav');
  const blocks = [...document.querySelectorAll('main h1, main h2, main h3, main p, main li, main figcaption, main .btn, main dt, main dd, main label')]
    .filter(e => vis(e) && [...e.childNodes].some(n => n.nodeType === 3 && n.nodeValue.trim()) && !e.closest('svg, .ca__rows, [aria-hidden="true"]'));
  const rects = new Map(blocks.map(b => [b, clipRect(b)]));
  const out = [];
  for (let i = 0; i < blocks.length; i++) for (let j = i + 1; j < blocks.length; j++) {
    const a = blocks[i], b = blocks[j]; if (a.contains(b) || b.contains(a)) continue;
    const p = rects.get(a), q = rects.get(b);
    const w = Math.min(p.r, q.r) - Math.max(p.l, q.l), h = Math.min(p.b, q.b) - Math.max(p.t, q.t);
    if (w <= 2 || h <= 2) continue; const ar = w * h, sm = Math.min((p.r - p.l) * (p.b - p.t), (q.r - q.l) * (q.b - q.t));
    if (ar / sm <= .3) continue;
    const cx = (Math.max(p.l, q.l) + Math.min(p.r, q.r)) / 2, cy = (Math.max(p.t, q.t) + Math.min(p.b, q.b)) / 2;
    // walk the paint order from the top: the pair is a visible collision only if the second block is reached before
    // anything opaque (an unrelated cover, or the first block's own opaque sheet) hides it
    let found = null, real = false;
    for (const e of document.elementsFromPoint(cx, cy)) { if (skip(e)) continue;
      const inA = a === e || a.contains(e), inB = b === e || b.contains(e);
      if (inA || inB) { const w = inA ? 'a' : 'b'; if (!found) found = w; else if (found !== w) { real = true; break; } continue; }
      if (opaque(e)) break; }
    if (!real) continue;
    const t = e => ((e.closest('section[id]') || { id: 'chrome' }).id) + ' ' + e.tagName.toLowerCase() + '.' + String(e.className).split(' ')[0] + ' "' + e.textContent.trim().replace(/\s+/g, ' ').slice(0, 26) + '"'; out.push(t(a) + ' x ' + t(b));
  }
  // QA-2: labels inside drawings (the detector above skips svg): text on text within the same drawing, as painted now
  const op = e => { let o = 1; for (let x = e; x && x !== document.body; x = x.parentElement || x.parentNode) { if (!(x instanceof Element)) break; const s = getComputedStyle(x); if (s.visibility === 'hidden' || s.display === 'none') return 0; o *= +s.opacity * (x.tagName === 'text' || x.tagName === 'tspan' ? +(s.fillOpacity || 1) : 1); } return o; };
  document.querySelectorAll('main svg').forEach(svg => {
    const r0 = svg.getBoundingClientRect(); if (r0.bottom < 60 || r0.top > innerHeight || r0.width < 20) return;
    const ts = [...svg.querySelectorAll('text')].filter(t => t.textContent.trim() && op(t) > .25).map(t => [t, t.getBoundingClientRect()]).filter(([, r]) => r.width > 2 && r.height > 2 && r.bottom > 60 && r.top < innerHeight);
    for (let i = 0; i < ts.length; i++) for (let j = i + 1; j < ts.length; j++) {
      const [a, p] = ts[i], [b, q] = ts[j]; if (a.contains(b) || b.contains(a)) continue;
      const w = Math.min(p.right, q.right) - Math.max(p.left, q.left), h = Math.min(p.bottom, q.bottom) - Math.max(p.top, q.top);
      if (w > 2 && h > 2 && w * h / Math.min(p.width * p.height, q.width * q.height) > .15)
        out.push(((svg.closest('section[id]') || { id: 'chrome' }).id) + ' svg "' + a.textContent.trim().slice(0, 24) + '" x "' + b.textContent.trim().slice(0, 24) + '"');
    }
  });
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
