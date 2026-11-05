// Process (section 7) test: facts verbatim, columns, thread, keyboard/pointer/touch, auto-advance, pause, reduced motion, contrast, fonts, layout at 4 sizes.
// Usage: node tools/proc_test.js [path-to-built-html]   (default out/final-procfoot.html)
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const F = 'file://' + path.resolve(process.argv[2] || path.join(__dirname, '..', 'out', 'final-procfoot.html'));
const WORK = path.join(__dirname, '..', '..', '..', 'work', 'data');
const faq = JSON.parse(fs.readFileSync(path.join(WORK, 'faq.json'), 'utf8')); const FAQ = Object.values(faq).flat().map(x => x[1]).join(' ').replace(/’/g, "'");
const ck = []; const ok = (n, c, d) => ck.push([c ? 'PASS' : 'FAIL', n, d === undefined ? '' : d]);
const lum = (c) => { const [r, g, b] = c.map(v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }); return .2126 * r + .7152 * g + .0722 * b; };
const cr = (a, b) => { const x = lum(a), y = lum(b); return +((Math.max(x, y) + .05) / (Math.min(x, y) + .05)).toFixed(2); };
const P = (s) => s.match(/[\d.]+/g).slice(0, 3).map(Number); const mixc = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
(async () => {
  const b = await chromium.launch();
  async function open(w = 1440, h = 900, extra = {}, scroll = true) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, ...extra }); const p = await ctx.newPage(); p.errs = []; p.on('pageerror', e => p.errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') p.errs.push(m.text()); }); p.ctx = ctx;
    await p.goto(F, { waitUntil: 'load' }); await p.addStyleTag({ content: 'html{scroll-behavior:auto!important}' });
    if (scroll) { await p.evaluate(() => scrollTo({ top: scrollY + document.querySelector('.pr').getBoundingClientRect().top - 40, behavior: 'instant' })); await p.waitForTimeout(500); } return p;
  }
  const S = (p) => p.evaluate(() => __proc.S());
  let p = await open();
  // ---- facts
  const D = await p.evaluate(() => { const s = document.querySelector('.pr'); const q = (x) => [...s.querySelectorAll(x)].map(e => e.textContent.replace(/\s+/g, ' ').trim());
    return { h2: s.querySelector('h2').textContent, titles: q('.pr-t'), nums: q('.pr-n'), ps: q('.pr-tx p'), figs: [...s.querySelectorAll('.pr-pf > div')].map(e => e.querySelector('dt').textContent + ' ' + e.querySelector('dd').textContent), chips: [...s.querySelectorAll('.pr-chips')].map(c => [...c.querySelectorAll('button')].map(x => x.textContent.trim())),
      links: [...s.querySelectorAll('a')].map(a => a.getAttribute('href')), ids: document.querySelectorAll('#process').length, txt: s.textContent, hrefsAll: [...s.querySelectorAll('[href],[src],[action]')].map(e => e.getAttribute('href') || e.getAttribute('src') || e.getAttribute('action')) }; });
  ok('heading is the published one, "Four steps. Nothing hidden."', D.h2 === 'Four steps. Nothing hidden.', D.h2);
  ok('four steps in order: 01 Free inspection, 02 Detailed proposal, 03 Expert install, 04 Final check', D.titles.join('|') === 'Free inspection|Detailed proposal|Expert install|Final check' && D.nums.join('|') === '01|02|03|04', D.titles.join('|') + D.nums.join('|'));
  const SENT = ['A project manager walks every side of the house: siding, trim, windows, roof and gutters. One visit covers every trade.', 'An itemised price for the work you want, nothing else. Here is where our documented jobs actually landed.',
    'Old material off, new boards up, then trim and paint. Windows are measured, built to order, then set and sealed.', 'We walk the finished job with you, clear the punch list and leave the site clean. Then the warranties start.'];
  ok('the four sentences are the firm\'s own text, verbatim', SENT.every((t, i) => D.ps[i] === t), D.ps.length);
  ok('the figures are the published ones (One visit / Mon–Fri 8–8 · Sat 8–6 · Sun 12–5 · $10k–$15k, 415 priced siding jobs · Itemised · 1–2 weeks · 2 days · Lifetime · 30 years)',
    D.figs.join('|') === 'One visit covers every trade on the house|Mon–Fri 8–8 Sat 8–6 · Sun 12–5|$10k–$15k median band, 415 priced siding jobs|Itemised only the work you asked for|1–2 weeks a siding job on site, paint included|2 days most window-only jobs|Lifetime workmanship warranty on labor|30 years James Hardie siding, non-prorated', D.figs.join('|'));
  ok('the firm\'s FAQ carries the facts behind those figures (1 to 2 weeks incl. painting; two days; lifetime workmanship warranty; 30-year non-prorated; 415 siding jobs; $10,000–$15,000)',
    ['A siding replacement typically takes 1 to 2 weeks, including the painting process.', 'Most of the window-only jobs in our files took two days on site.', 'Austin Pro adds a lifetime workmanship warranty on labor.', 'James Hardie siding carries a 30-year non-prorated warranty', '415 siding jobs', 'median fell in the $10,000–$15,000 band'].every(t => FAQ.includes(t)));
  ok('chip labels are fragments of the sentences (art 1: Siding Trim Windows Roof Gutters; art 2: Work you want, Itemised price, Nothing else; art 3: Old material off, New boards up, Trim and paint, Windows set and sealed; art 4: Walk the job, Punch list, Site clean, Warranties)',
    D.chips.map(c => c.join(',')).join('|') === 'Siding,Trim,Windows,Roof,Gutters|Work you want,Itemised price,Nothing else|Old material off,New boards up,Trim and paint,Windows set and sealed|Walk the job,Punch list,Site clean,Warranties');
  ok('no sums or invented numbers (no 241 / 330 / 497 / 361 / 178 / 101 / 74)', !/\b(241|330|497|361|178|101|74)\b/.test(D.txt));
  ok('only internal links: the Book button goes to #booking; one #process', D.links.length === 1 && D.links[0] === '#booking' && D.ids === 1 && !D.hrefsAll.some(h => /^https?:/i.test(h)), JSON.stringify(D.links));
  // ---- initial state, click, keys
  const i0 = await p.evaluate(() => [...document.querySelectorAll('.pr-ch button')].map(b => b.getAttribute('aria-expanded') + ':' + (getComputedStyle(b.closest('.pr-item').querySelector('.pr-bd')).visibility)));
  ok('start: step 1 open, the other three closed and hidden from the tab order', i0.join('|') === 'true:visible|false:hidden|false:hidden|false:hidden', i0.join('|'));
  await p.click('#pr-b2'); await p.waitForTimeout(500); let s = await S(p);
  const st2 = await p.evaluate(() => ({ ex: [...document.querySelectorAll('.pr-ch button')].map(b => b.getAttribute('aria-expanded')).join(), live: document.querySelector('.pr-live').textContent, cnt: document.querySelector('.pr-count').textContent.replace(/\s+/g, ' ').trim(), done: [...document.querySelectorAll('.pr-item')].map(i => i.classList.contains('done') ? 'd' : i.classList.contains('on') ? 'c' : '-').join(''), nd: __proc.S().nodes }));
  ok('click opens step 3: one expanded; live region says "Step 3 of 4: Expert install"; counter follows; thread: two done, one current', st2.ex === 'false,false,true,false' && st2.live === 'Step 3 of 4: Expert install' && st2.cnt === 'Step 3 of 4 Expert install' && st2.done === 'ddc-', JSON.stringify(st2));
  ok('the background route lights up to the current step (3 nodes)', st2.nd === 3, st2.nd);
  await p.focus('#pr-b2'); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(300); const k1 = await p.evaluate(() => ({ f: document.activeElement.id, cur: __proc.S().cur }));
  await p.keyboard.press('Home'); await p.waitForTimeout(200); const k2 = await p.evaluate(() => ({ f: document.activeElement.id, cur: __proc.S().cur })); await p.keyboard.press('End'); await p.waitForTimeout(200); const k3 = await p.evaluate(() => __proc.S().cur);
  await p.keyboard.press('ArrowLeft'); await p.waitForTimeout(200); const k4 = await p.evaluate(() => __proc.S().cur);
  ok('keyboard: ArrowRight, Home, End, ArrowLeft move the focus and open the step (3 > 4 > 1 > 4 > 3)', k1.f === 'pr-b3' && k1.cur === 3 && k2.f === 'pr-b0' && k2.cur === 0 && k3 === 3 && k4 === 2, JSON.stringify([k1, k2, k3, k4]));
  const fr = await p.evaluate(() => { document.querySelector('#pr-b1').focus(); const b = document.querySelector('#pr-b1'); const cs = getComputedStyle(b); return [cs.outlineStyle, cs.outlineWidth]; });
  ok('visible 3 px focus ring on a column button', fr[0] === 'solid' && parseFloat(fr[1]) >= 3, fr.join(' '));
  await p.evaluate(() => __proc.open(0, true)); await p.waitForTimeout(900);
  // pointer: hover opens after a short dwell
  const bx = await (await p.$('.i3 .pr-col')).boundingBox(); await p.mouse.move(bx.x + bx.width / 2, bx.y + 200); await p.waitForTimeout(450); const hv = await S(p);
  ok('hover (mouse) opens a column after a short dwell, and stops any auto-advance', hv.cur === 3 && hv.mode === 'manual', JSON.stringify(hv));
  await p.mouse.move(5, 5); await p.evaluate(() => __proc.open(0, true)); await p.waitForTimeout(900);
  // art 1: pointer carries the lens, chips follow
  const pb = await (await p.$('.i0 .pr-panel')).boundingBox(); const sv = await (await p.$('.i0 .pr-art')).boundingBox();
  const vb = await p.evaluate(() => { const v = document.querySelector('.i0 .pr-art').viewBox.baseVal; return [v.x, v.y, v.width, v.height]; });
  const at = (x, y) => [sv.x + (x - vb[0]) / vb[2] * sv.width, sv.y + (y - vb[1]) / vb[3] * sv.height];
  const zones = {}; for (const [z, xy] of Object.entries({ Windows: [210, 145], Siding: [118, 190], Roof: [120, 76], Gutters: [236, 112], Trim: [72, 168] })) { const [x, y] = at(...xy); await p.mouse.move(x, y, { steps: 4 }); await p.waitForTimeout(600); zones[z] = await p.evaluate(() => [...document.querySelectorAll('.i0 .pr-chip.on')].map(c => c.textContent.trim()).join() + '/' + [...document.querySelectorAll('.i0 [data-z].hot')].map(g => g.dataset.z).join()); }
  ok('art 1: with the pointer over the house the lens names the part under it (chip on + the part drawn bolder)', Object.entries(zones).every(([z, v]) => v === z + '/' + z.toLowerCase()), JSON.stringify(zones));
  const lensPos = await p.evaluate(() => { const l = __proc.arts[0].lens; return [l.x, l.y, l.tx, l.ty]; }); ok('art 1: the lens follows the pointer (settled at the pointer)', Math.abs(lensPos[0] - lensPos[2]) < 1.5 && Math.abs(lensPos[0] - 72) < 6, JSON.stringify(lensPos));
  await p.mouse.move(5, 5);
  // art 3 scrub
  await p.evaluate(() => __proc.open(2, true)); await p.waitForTimeout(1200); const sb = await (await p.$('.i2 .pr-art')).boundingBox();
  await p.mouse.move(sb.x + sb.width * .3, sb.y + sb.height / 2, { steps: 3 }); await p.waitForTimeout(900); const t1 = (await S(p)).t; await p.mouse.move(sb.x + sb.width * .9, sb.y + sb.height / 2, { steps: 3 }); await p.waitForTimeout(900); const t2 = (await S(p)).t;
  ok('art 3: moving across the drawing scrubs it (t follows the pointer: left < right)', t1 < .45 && t2 > .75 && t2 - t1 > .3, t1.toFixed(2) + ' -> ' + t2.toFixed(2));
  const chipOn = await p.evaluate(() => document.querySelector('.i2 .pr-chip.on')?.textContent); ok('art 3: the chip for the part on screen is lit', /Windows set and sealed|Trim and paint/.test(chipOn), chipOn);
  await p.mouse.move(5, 5);
  // chip jump + replayable
  await p.click('.i2 .pr-chip[data-j="0"]'); await p.waitForTimeout(1500); const cj = await S(p); const cOn = await p.evaluate(() => document.querySelector('.i2 .pr-chip.on')?.textContent);
  ok('a chip jumps the drawing to the end of that part and holds (Old material off, held just before its end)', Math.abs(cj.t - .268) < .02 && cj.hold && cOn === 'Old material off', JSON.stringify(cj) + cOn);
  // render is a pure function: the old boards are gone at .28 and the new ones are absent
  const olds = await p.evaluate(() => [...document.querySelectorAll('.i2 .old')].map(r => parseFloat(r.closest('[data-k]').style.opacity || 1)).filter(o => o > .05).length); ok('art 3 after Old material off: all 12 old boards have left', olds === 0, olds);
  await p.click('.i2 .pr-chip[data-j="3"]'); await p.waitForTimeout(1500); const fin = await p.evaluate(() => ({ t: __proc.S().t, win: getComputedStyle(document.querySelector('.i2 .bead')).visibility, offs: document.querySelector('.i2 .bead').style.strokeDashoffset })); ok('art 3 at the end: the sealing bead is fully drawn', fin.t > .98 && Number(fin.offs) === 0, JSON.stringify(fin));
  // pause
  await p.evaluate(() => __proc.open(1, true)); await p.waitForTimeout(500); await p.click('.pr-pp'); const ps0 = (await S(p)).t; await p.waitForTimeout(700); const ps1 = (await S(p)).t; const lab = await p.evaluate(() => [document.querySelector('.pr-pp span').textContent, document.querySelector('.pr-pp').getAttribute('aria-label')]);
  ok('Pause freezes the drawing and the button becomes Play', ps1 === ps0 && lab[0] === 'Play' && /Play/.test(lab[1]), ps0.toFixed(3) + '/' + ps1.toFixed(3) + lab.join());
  await p.click('.pr-pp'); await p.waitForTimeout(700); const ps2 = await S(p); ok('Play resumes (t moves on, Pause label back)', ps2.t > ps1 + .03 || ps2.t === 1, ps2.t.toFixed(3));
  // art 2 first line draws; final state fully drawn
  await p.evaluate(() => { __proc.open(1, true); }); await p.waitForTimeout(8000); const sheet = await p.evaluate(() => ({ t: __proc.S().t, loop: __proc.S().loop, stamp: [...document.querySelectorAll('.i1 .stt')].map(x => x.textContent).join(), ck: [...document.querySelectorAll('.i1 .ck')].every(x => Number(x.style.strokeDashoffset) === 0) }));
  ok('art 2 plays to the end by itself (5 ticks drawn, the ITEMISED stamp), then the loop stops (nothing runs when nothing changes)', sheet.t === 1 && sheet.stamp === 'ITEMISED' && sheet.ck && !sheet.loop, JSON.stringify(sheet));
  ok('page errors 0 (desktop run)', p.errs.length === 0, p.errs.join('|')); await p.ctx.close();

  // ---- auto-advance: starts when the section is on screen, walks the steps, stops on interaction
  p = await open(1440, 900, {}, false); await p.evaluate(() => scrollTo({ top: scrollY + document.querySelector('.pr').getBoundingClientRect().top - 40, behavior: 'instant' })); await p.waitForTimeout(600);
  const a0 = await S(p); await p.waitForTimeout(11200); const a1 = await S(p); const fillMid = await p.evaluate(() => document.querySelector('.i1 .pr-seg').style.getPropertyValue('--f') || document.querySelector('.i0 .pr-seg').style.getPropertyValue('--f'));
  ok('auto: starts in auto mode when on screen; after about 10 s (7.6 s drawing + 2.4 s hold) step 2 opens by itself', a0.mode === 'auto' && a0.cur === 0 && a1.cur === 1 && a1.mode === 'auto', JSON.stringify([a0.cur, a0.mode, a1.cur, a1.mode]));
  ok('auto: the thread segment of the current step is filling (timer on the thread)', parseFloat(fillMid) > 0 && parseFloat(fillMid) < 1, fillMid);
  await p.mouse.move(700, 600); await p.waitForTimeout(300); const a2 = await S(p); await p.waitForTimeout(9500); const a3 = await S(p);
  ok('auto stops for good on the first interaction (pointer over the columns): no further change after 9.5 s', a2.mode === 'manual' && a3.cur === a2.cur, JSON.stringify([a2.cur, a2.mode, a3.cur]));
  await p.ctx.close();
  // keyboard focus also stops auto
  p = await open(); await p.waitForTimeout(300); await p.focus('#pr-b3'); await p.waitForTimeout(200); ok('auto stops when a column button takes focus', (await S(p)).mode === 'manual'); await p.ctx.close();

  // ---- reduced motion
  p = await open(1440, 900, { reducedMotion: 'reduce' }); await p.waitForTimeout(12000); const rm = await p.evaluate(() => ({ s: __proc.S(), ts: __proc.arts.map(a => a.t).join(), pp: document.querySelector('.pr-pp').offsetParent === null, tr: getComputedStyle(document.querySelector('.pr-item')).transitionDuration, an: getComputedStyle(document.querySelector('.pr-node')).animationName }));
  ok('reduced motion: no auto-advance (still step 1 after 12 s), every drawing shown finished (t = 1), no pause button, no loop', rm.s.cur === 0 && rm.s.mode === 'manual' && rm.ts === '1,1,1,1' && rm.pp && !rm.s.loop, JSON.stringify(rm));
  ok('reduced motion: column transitions are off', /^0s(, 0s)*$/.test(rm.tr), rm.tr);
  await p.click('.i0 .pr-chip[data-j="1"]'); await p.waitForTimeout(100); const rc = await p.evaluate(() => ({ t: __proc.arts[0].t, on: document.querySelector('.i0 .pr-chip.on')?.textContent }));
  ok('reduced motion: chips still work (jump at once)', Math.abs(rc.t - .464) < .02 && rc.on === 'Trim', JSON.stringify(rc));
  await p.click('#pr-b2'); await p.waitForTimeout(100); ok('reduced motion: columns still open by click', (await S(p)).cur === 2); ok('reduced motion: 0 errors', p.errs.length === 0, p.errs.join('|')); await p.ctx.close();

  // ---- touch (phone): rows, tap, no hover dependence, no auto
  p = await open(390, 844, { hasTouch: true, isMobile: true }); await p.waitForTimeout(600); const t0 = await S(p);
  await p.tap('#pr-b2'); await p.waitForTimeout(900); const t1b = await S(p); const vis = await p.evaluate(() => [...document.querySelectorAll('.pr-item')].map(i => getComputedStyle(i.querySelector('.pr-bd')).visibility).join());
  ok('touch (390): rows; tap opens a row; nothing advances by itself on a phone; hidden rows are out of the tab order', t0.mode === 'manual' && t1b.cur === 2 && vis === 'hidden,hidden,visible,hidden', JSON.stringify([t0.mode, t1b.cur, vis]));
  await p.waitForTimeout(9000); ok('touch: still on the tapped row after 9 s', (await S(p)).cur === 2);
  const pa = await p.evaluate(() => ({ pa: getComputedStyle(document.querySelector('.i2 .pr-panel')).touchAction, ov: document.documentElement.scrollWidth - innerWidth })); ok('touch: the drawing does not block vertical scroll (touch-action not none)', pa.pa !== 'none', pa.pa);
  await p.tap('.i2 .pr-chip[data-j="1"]'); await p.waitForTimeout(1500); ok('touch: a chip works by tap', Math.abs((await S(p)).t - .548) < .03, (await S(p)).t); await p.ctx.close();

  // ---- contrast, fonts, targets, layout at 4 sizes
  p = await open(1440, 900); const cols = [];
  for (let i = 0; i < 4; i++) { await p.evaluate((i) => __proc.open(i, true), i); await p.waitForTimeout(1100);
    cols.push(await p.evaluate((i) => { const it = document.querySelectorAll('.pr-item')[i], col = it.querySelector('.pr-col'), c = (sel, el = it) => { const e = el.querySelector(sel), s = getComputedStyle(e); return s.color; }; const cs = getComputedStyle(col);
      const chipOff = [...it.querySelectorAll('.pr-chip:not(.on) span')][0], chipOn = it.querySelector('.pr-chip.on span'); return { bg: cs.getPropertyValue('--bg').trim() || cs.backgroundColor, fg: cs.getPropertyValue('--fg').trim(), mu: cs.getPropertyValue('--mu').trim(), bgc: cs.backgroundColor, title: c('.pr-t'), num: c('.pr-n'), p: c('.pr-tx p'), dt: c('.pr-pf dt'), dd: c('.pr-pf dd'), hint: c('.pr-hint'), chipOffC: getComputedStyle(chipOff).color, chipOnC: chipOn ? getComputedStyle(chipOn).color : null, chipOnB: chipOn ? getComputedStyle(chipOn).backgroundColor : null }; }, i)); }
  const H = (h) => h.startsWith('#') ? [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)) : P(h); const worst = []; cols.forEach((c, i) => { const bg = P(c.bgc), fg = H(c.fg), mu = H(c.mu);
    const chipBg = mixc(bg, fg, .10); worst.push(['t' + i, cr(P(c.title), bg)], ['n' + i, cr(P(c.num), bg)], ['p' + i, cr(P(c.p), bg)], ['dt' + i, cr(P(c.dt), bg)], ['dd' + i, cr(P(c.dd), bg)], ['hint' + i, cr(P(c.hint), P(c.bgc))], ['chip' + i, cr(P(c.chipOffC), chipBg)], ['chipOn' + i, c.chipOnC ? cr(P(c.chipOnC), P(c.chipOnB)) : 21]); });
  const lowest = Math.min(...worst.map(w => w[1])); ok('contrast: every text in every column is at least 4.5:1 (lowest ' + lowest + ')', lowest >= 4.5, JSON.stringify(worst.filter(w => w[1] < 4.5)));
  const hc = await p.evaluate(() => { const gs = (q) => getComputedStyle(document.querySelector(q)).color; return { h: gs('.pr-h'), cnt: gs('.pr-count'), pp: gs('.pr-pp') }; }); const gb = [238, 243, 238];
  ok('contrast: heading, counter and the Pause button on the ground are at least 4.5:1', cr(P(hc.h), gb) >= 4.5 && cr(P(hc.cnt), gb) >= 4.5 && cr(P(hc.pp), gb) >= 4.5, JSON.stringify([cr(P(hc.h), gb), cr(P(hc.cnt), gb), cr(P(hc.pp), gb)]));
  ok('fonts: Montserrat and Inter only', await p.evaluate(() => [...new Set([...document.querySelectorAll('.pr *')].map(e => getComputedStyle(e).fontFamily.split(',')[0].replace(/["']/g, '')))].filter(f => !/^(Inter|Montserrat)$/.test(f)).length === 0));
  ok('page errors 0', p.errs.length === 0, p.errs.join('|')); await p.ctx.close();
  for (const [w, h] of [[1440, 900], [1024, 768], [768, 1024], [390, 844]]) {
    const q = await open(w, h); const outs = []; for (let i = 0; i < 4; i++) { await q.evaluate((i) => __proc.open(i, true), i); await q.waitForTimeout(1000);
      outs.push(await q.evaluate(() => { const s = document.querySelector('.pr'), sr = s.getBoundingClientRect(); const bad = []; s.querySelectorAll('button,a').forEach(e => { if (getComputedStyle(e).visibility === 'hidden' || e.offsetParent === null) return; const r = e.getBoundingClientRect(); if (r.width < 43.5 || r.height < 43.5) bad.push(e.className + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); });
        const over = []; s.querySelectorAll('.pr-in *').forEach(e => { if (!(e instanceof HTMLElement)) return; if (e.closest('.pr-bd') && getComputedStyle(e.closest('.pr-bd')).visibility === 'hidden') return; const r = e.getBoundingClientRect(); if (r.width && r.right > innerWidth + 1.5) over.push(e.className.baseVal ?? e.className); });
        const cut = [...s.querySelectorAll('.pr-item.on .pr-bi *')].filter(e => { if (!(e instanceof HTMLElement)) return false; const r = e.getBoundingClientRect(), cr = e.closest('.pr-col').getBoundingClientRect(); return r.width && (r.bottom > cr.bottom + 1.5 || r.right > cr.right + 1.5); }).length;
        return { bad, over: over.slice(0, 3), docOver: document.documentElement.scrollWidth - innerWidth, cut }; })); }
    const bad = outs.flatMap(o => o.bad), over = outs.flatMap(o => o.over), docOver = Math.max(...outs.map(o => o.docOver)), cut = Math.max(...outs.map(o => o.cut));
    ok(`${w}: each step open in turn: no horizontal overflow, nothing cut off in the open column, every target ≥ 44 px, 0 errors`, bad.length === 0 && over.length === 0 && docOver <= 2 && cut === 0 && q.errs.length === 0, JSON.stringify({ bad: bad.slice(0, 3), over: over.slice(0, 3), docOver, cut, e: q.errs.length })); await q.ctx.close(); }
  for (const c of ck) console.log(c.join(' | ')); console.log('FAILS', ck.filter(c => c[0] === 'FAIL').length, 'of', ck.length); await b.close();
})();
