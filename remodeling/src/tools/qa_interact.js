// QA pass 1 · Interaction (ELBAZ-QA-FINALIZE-BRIEF): every hover effect, every cursor state and reaction, every
// clickable element, on every page, frame by frame. Desktop pointer (1440), each version set. For each element:
//  hit      the element is what the pointer actually hits at its centre (not covered by another layer)
//  cursor   the companion reacts (.buddy[data-state] is the right kind for the element) and the tip sits on the pointer
//  hover    the element shows its own hover change, or the companion reaction carries it (dead = neither)
//  jump     nothing else in the section moves when the element is hovered
// Flagged elements get a 4-frame strip (0, 80, 160, 320 ms) for the gate. Usage: node qa_interact.js <page> <v> <round>
const { chromium } = require('playwright');
const fs = require('fs');
const { execFileSync } = require('child_process');
const PAGES = { home: 'elbaz-homepage.html', kitchens: 'kitchens.html', bathrooms: 'bathrooms.html', renovation: 'renovation.html', contact: 'contact.html' };
const [page, vArg, round] = process.argv.slice(2); const V = +vArg;
const OUT = `/home/user/CLaude/qa/finalize/qa${round}/interact`; fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = []; p.on('pageerror', e => errs.push(String(e).slice(0, 160)));
  await p.goto('file:///home/user/CLaude/remodeling/site/' + PAGES[page]); await p.waitForTimeout(1200);
  if (V === 2) await p.evaluate(() => [...document.querySelectorAll('section.sec[id]')].forEach(s => { if (s.querySelectorAll(':scope .ver[data-v]').length > 1) EZ.activate(s.id, 2); }));
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 500) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(35); }
  await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(400);
  await p.mouse.move(720, 450);
  const n = await p.evaluate(() => {
    const els = [...document.querySelectorAll('a[href], button, [role="button"], [role="tab"], [role="slider"], input:not([type="hidden"]), select, textarea, summary, [data-buddy], [tabindex="0"]')]
      .filter(e => !e.closest('[hidden], [inert], .sheet, .settings__panel, [aria-hidden="true"]') && !e.matches('input[type="checkbox"], input[type="radio"]') && !(e.matches('[tabindex="0"]') && !e.matches('a, button, input, select, textarea, [role]')));   // a focusable reading region is not a control
    const groups = {}; els.forEach(e => { const k = ((e.closest('section[id]') || {}).id || 'chrome') + '|' + e.tagName + '|' + String(e.className && e.className.baseVal !== undefined ? e.className.baseVal : e.className).split(' ')[0]; (groups[k] = groups[k] || []).push(e); });
    const keep = new Set(); Object.values(groups).forEach(g => (g.length > 10 ? g.slice(0, 8).concat(g.slice(-2)) : g).forEach(e => keep.add(e)));
    const pick = els.filter(e => keep.has(e)); pick.forEach((e, i) => e.setAttribute('data-qi', i)); window.__qiSampled = els.length - pick.length;
    window.__snapH = e => { const P = ['outlineStyle', 'boxShadow', 'borderTopColor', 'borderBottomColor', 'backgroundColor', 'color', 'stroke', 'fill', 'opacity', 'transform', 'textDecorationLine', 'filter', 'scale', 'translate', 'rotate'];
      const take = (x, ps) => { const c = getComputedStyle(x, ps); return P.map(k => c[k]).join('|'); };
      const list = [e, ...[...e.querySelectorAll('*')].slice(0, 40)]; if (e.parentElement) list.push(e.parentElement);
      return list.map(x => take(x) + '#' + take(x, '::before') + '#' + take(x, '::after')).join('\n'); };
    window.__expect = t => { // the companion's own classification (buddy.js classify), restated
      if (t.closest('[data-buddy]')) return t.closest('[data-buddy]').dataset.buddy;
      if (t.closest('[data-buddy-watch]')) return 'watch';
      if (t.closest('[disabled], [aria-disabled="true"]')) return 'disabled';
      const f = t.closest('input, textarea, select, [contenteditable="true"]'); if (f) return f.type === 'range' ? 'drag' : (f.type === 'radio' || f.type === 'checkbox' ? 'choice' : 'type');
      if (t.closest('a[href^="tel:"]')) return 'phone';
      const bt = t.closest('button, .btn, [role="button"], [role="radio"], [role="tab"], summary'); if (bt) return bt.matches('.btn:not(.btn--ghost), .nav__book') ? 'cta' : 'button';
      if (t.closest('[role="slider"], [draggable="true"], [data-drag]')) return 'drag';
      if (t.closest('a[href]')) return 'link';
      if (t.closest('img, picture, figure, [data-img], [data-bg-img]')) return 'image';
      return 'none'; };
    return pick.length; });
  const R = { page, V, items: [], issues: [], sampledOut: await p.evaluate(() => window.__qiSampled) };
  for (let i = 0; i < n; i++) {
    const pre = await p.evaluate(i => { const e = document.querySelector('[data-qi="' + i + '"]'); if (!e) return null;
      e.scrollIntoView({ block: 'center', inline: 'center' }); const r = e.getBoundingClientRect(); const s = getComputedStyle(e);
      if (r.width < 2 || r.height < 2 || s.visibility === 'hidden' || +s.opacity < .05) return null;
      const sec = e.closest('section[id]') || document.querySelector('.nav') || document.body;
      return { sec: (e.closest('section[id]') || { id: e.closest('.foot') ? 'footer' : 'chrome' }).id, label: e.tagName.toLowerCase() + '.' + String(e.className && e.className.baseVal !== undefined ? e.className.baseVal : e.className).split(' ')[0] + ' "' + (e.getAttribute('aria-label') || e.textContent || e.value || '').trim().replace(/\s+/g, ' ').slice(0, 34) + '"' }; }, i);
    if (!pre) continue;
    await p.waitForTimeout(260);
    // park the pointer off the element (on the page margin) and let the section settle (a zoom or a lens releases), then
    // measure where the element now is, take the resting state, and glide in
    const pre0 = await p.evaluate(i => { const r = document.querySelector('[data-qi="' + i + '"]').getBoundingClientRect(); return r.left + r.width / 2; }, i);
    await p.mouse.move(pre0 < 720 ? 1436 : 4, 450, { steps: 2 }); await p.waitForTimeout(650);
    const box = await p.evaluate(i => { const r = document.querySelector('[data-qi="' + i + '"]').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, l: r.left, t: r.top, w: r.width, h: r.height }; }, i);
    if (box.x < 0 || box.y < 0 || box.x > 1440 || box.y > 900) continue;
    const rest = await p.evaluate(i => { const e = document.querySelector('[data-qi="' + i + '"]'); const sec = e.closest('section[id]') || e.closest('nav, header, footer') || document.body;
      const others = [...sec.querySelectorAll('h1, h2, h3, p, img, .btn, a, button, figure')].filter(x => x !== e && !e.contains(x) && !x.contains(e)).slice(0, 60).map(x => { const r = x.getBoundingClientRect(); return [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)]; });
      return { snap: window.__snapH(e), others }; }, i);
    await p.mouse.move(box.x, box.y, { steps: 6 });
    const frames = [];
    for (const t of [0, 80, 160, 320]) { if (t) await p.waitForTimeout(t - (frames.length ? [0, 80, 160, 320][frames.length - 1] : 0)); frames.push(t); }
    const got = await p.evaluate(([i, x, y]) => { const e = document.querySelector('[data-qi="' + i + '"]'); const hit = document.elementFromPoint(x, y);
      const ok = hit && (hit === e || e.contains(hit) || (e.labels && [...e.labels].some(l => l.contains(hit))) || (hit.closest('label') && hit.closest('label').control === e));
      const bud = document.querySelector('.buddy'); const tip = document.querySelector('.ptip'); const tr = tip ? tip.getBoundingClientRect() : null;
      const sec = e.closest('section[id]') || e.closest('nav, header, footer') || document.body;
      const others = [...sec.querySelectorAll('h1, h2, h3, p, img, .btn, a, button, figure')].filter(x => x !== e && !e.contains(x) && !x.contains(e)).slice(0, 60).map(x => { const r = x.getBoundingClientRect(); return [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)]; });
      return { hit: ok, hitBy: ok ? null : (hit ? hit.tagName.toLowerCase() + '.' + String(hit.className && hit.className.baseVal !== undefined ? hit.className.baseVal : hit.className).split(' ')[0] : 'nothing'),
        state: bud ? bud.dataset.state : null, expect: window.__expect(hit && ok ? hit : e), tip: tr ? [Math.round(tr.left), Math.round(tr.top)] : null, snap: window.__snapH(e), others }; }, [i, box.x, box.y]);
    const item = { sec: pre.sec, label: pre.label, hit: got.hit, hitBy: got.hitBy, state: got.state, expect: got.expect, ownHover: got.snap !== rest.snap };
    // the tip's arrow point sits at the pointer: its svg viewBox starts at -4, so the point is 4px inside the box (scaled 28/28)
    item.tipOff = got.tip ? Math.round(Math.hypot(got.tip[0] + 4 - box.x, got.tip[1] + 4 - box.y)) : null;
    let moved = 0; rest.others.forEach((r, k) => { const q = got.others[k]; if (q && (Math.abs(q[0] - r[0]) > 1 || Math.abs(q[1] - r[1]) > 1 || Math.abs(q[2] - r[2]) > 1 || Math.abs(q[3] - r[3]) > 1)) moved++; });
    item.moved = moved;
    const why = [];
    if (!item.hit) why.push('covered by ' + item.hitBy);
    if (item.state === 'none' && item.expect !== 'none') why.push('companion did not react (expected ' + item.expect + ')');
    else if (item.state && item.expect && item.state !== item.expect && !(item.expect === 'image' && item.state === 'link')) why.push('companion reacted as ' + item.state + ', expected ' + item.expect);
    if (item.tipOff !== null && item.tipOff > 3) why.push('pointer tip ' + item.tipOff + 'px off the pointer');
    if (!item.ownHover && (item.state === 'none' || !item.state)) why.push('dead: no hover change and no companion reaction');
    if (moved) why.push(moved + ' other element(s) in the section moved on hover');
    item.why = why; R.items.push(item);
    if (why.length) {
      R.issues.push(item.sec + ' ' + item.label + ': ' + why.join('; '));
      // frame strip for the evidence: rest, then 0 / 80 / 160 / 320 ms after arrival
      const cl = { x: Math.max(0, box.l - 60), y: Math.max(0, box.t - 50), width: Math.min(1440 - Math.max(0, box.l - 60), box.w + 120), height: Math.min(900 - Math.max(0, box.t - 50), box.h + 100) };
      const fn = `${OUT}/${page}-v${V}-${i}`; await p.mouse.move(box.x < 720 ? 1436 : 4, box.y); await p.waitForTimeout(300); await p.screenshot({ path: fn + '-a.png', clip: cl });
      await p.mouse.move(box.x, box.y, { steps: 6 }); await p.screenshot({ path: fn + '-b.png', clip: cl }); await p.waitForTimeout(80); await p.screenshot({ path: fn + '-c.png', clip: cl });
      await p.waitForTimeout(80); await p.screenshot({ path: fn + '-d.png', clip: cl }); await p.waitForTimeout(160); await p.screenshot({ path: fn + '-e.png', clip: cl });
      execFileSync('python3', ['-c', `
from PIL import Image
ims=[Image.open('${fn}-'+k+'.png') for k in 'abcde']
w=sum(i.width for i in ims)+40; h=max(i.height for i in ims)
s=Image.new('RGB',(w,h),'red'); x=0
for im in ims: s.paste(im,(x,0)); x+=im.width+10
s.save('${fn}.png')
import os
for k in 'abcde': os.remove('${fn}-'+k+'.png')`]);
    }
  }
  R.errors = errs;
  fs.writeFileSync(`${OUT}/${page}-v${V}.json`, JSON.stringify(R, null, 1));
  const kinds = {}; R.items.forEach(x => { kinds[x.state] = (kinds[x.state] || 0) + 1; });
  console.log(`${page} v${V}: hovered ${R.items.length} (sampled out ${R.sampledOut}) | companion states ${JSON.stringify(kinds)} | own hover change ${R.items.filter(x => x.ownHover).length} | issues ${R.issues.length} | page errors ${errs.length}`);
  R.issues.forEach(x => console.log('   ' + x));
  await b.close();
})();
