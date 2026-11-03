// Phase 9 · "every animation tested repeatedly" (FINALIZE AUDIT STANDARD). Each page is scrolled down, up, down, up,
// down. At two anchors per section (its top, and the middle of its travel) the viewport is captured on the way up
// (pass u1, arriving from below) and on the second and third ways down (d2, d3, arriving from above).
//   d2 vs d3  repeatability: the same position must show the same state on every visit
//   u1 vs d3  reversibility: a scrubbed story must show the same state whichever way you arrive
// First-view intros (the seam's one sweep, "once" reveals) fire on pass 1 and are not compared. The first section of a page
// sits at scroll 0 and is always reached from below after load, so its reversibility is load state (d0) vs return (d3).
// Usage: node repeat.js <page> <width> <versions 1|2> <outdir>   (frames are JPEG; compare with repeat_diff.py)
const { chromium } = require('playwright');
const fs = require('fs');
const PAGES = { home: 'elbaz-homepage.html', kitchens: 'kitchens.html', bathrooms: 'bathrooms.html', renovation: 'renovation.html', contact: 'contact.html' };
const [page, wArg, vArg, out] = process.argv.slice(2);
const W = +wArg, H = W > 500 ? 900 : 844, V = +vArg;
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: W, height: H } });
  const errs = []; p.on('pageerror', e => errs.push(String(e).slice(0, 160)));
  await p.goto('file:///home/user/CLaude/remodeling/site/' + PAGES[page]); await p.waitForTimeout(1300);
  await p.mouse.move(W - 3, H - 3); // the pointer parked in a corner: the companion stays out of the frames
  const swapped = V === 2 ? await p.evaluate(() => [...document.querySelectorAll('section.sec[id]')].filter(s => s.querySelectorAll(':scope .ver[data-v]').length > 1).map(s => { EZ.activate(s.id, 2); return s.id; })) : [];
  await p.waitForTimeout(800);
  const anchors = await p.evaluate(vh => {
    const a = [];
    [...document.querySelectorAll('section.sec[id]')].filter(s => !s.parentElement.closest('section.sec')).forEach(s => {
      const top = Math.round(s.getBoundingClientRect().top + scrollY), h = s.offsetHeight;
      // a pinned story's travel lives in its pin-spacer; use the spacer's height when there is one
      const sp = s.parentElement && s.parentElement.classList.contains('pin-spacer') ? s.parentElement.offsetHeight : h;
      a.push({ id: s.id, k: 'top', y: top }); if (sp - vh > 200) a.push({ id: s.id, k: 'mid', y: top + Math.round((sp - vh) / 2) });
    });
    return a;
  }, H);
  const max = await p.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  async function glide(to, capture) {
    let y = await p.evaluate(() => scrollY); const dir = to > y ? 1 : -1;
    const list = anchors.filter(a => dir > 0 ? a.y >= y && a.y <= to : a.y <= y && a.y >= to).sort((m, n) => dir * (m.y - n.y));
    for (const a of list.concat([{ y: to }])) {
      while ((a.y - y) * dir > 0) { y = y + dir * Math.min(320, Math.abs(a.y - y)); await p.evaluate(v => scrollTo(0, v), y); await p.waitForTimeout(28); }
      if (capture && a.id) { await p.waitForTimeout(1100); await p.screenshot({ path: `${out}/${a.id}__${a.k}__${capture}.jpg`, type: 'jpeg', quality: 88 });
        // a second frame 500 ms later on the last pass: a section that differs from itself at rest is ambient motion (drifting rows)
        if (capture === 'd3') { await p.waitForTimeout(500); await p.screenshot({ path: `${out}/${a.id}__${a.k}__d3b.jpg`, type: 'jpeg', quality: 88 }); } }
    }
  }
  // the first section sits at scroll 0: capture it once at load, after its intro settles (d0), so its return state can be compared
  await p.waitForTimeout(2500);
  for (const t of anchors.filter(a => a.y <= 0)) await p.screenshot({ path: `${out}/${t.id}__${t.k}__d0.jpg`, type: 'jpeg', quality: 88 });
  await glide(max, null); await glide(0, 'u1'); await glide(max, 'd2'); await glide(0, null); await glide(max, 'd3');
  fs.writeFileSync(`${out}/run.json`, JSON.stringify({ page, W, V, swapped, anchors, errors: errs }, null, 1));
  console.log(page, W, 'v' + V, 'anchors', anchors.length, 'errors', errs.length, swapped.length ? 'swapped ' + swapped.join(',') : '');
  await b.close();
})();
