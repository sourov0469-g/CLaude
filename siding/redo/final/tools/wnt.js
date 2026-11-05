const { chromium } = require('playwright'); const fs = require('fs');
const F = 'file:///home/user/CLaude/siding/redo/final/out/final.html'; const COL = JSON.parse(fs.readFileSync('/home/user/CLaude/siding/work/data/window_colours.json'));
const ck = []; const ok = (n, c, d) => ck.push([c ? 'PASS' : 'FAIL', n, d === undefined ? '' : d]);
const lum = (c) => { const [r,g,b] = c.map(v => { v/=255; return v<=.03928? v/12.92 : Math.pow((v+.055)/1.055,2.4); }); return .2126*r+.7152*g+.0722*b; };
const cr = (a,b) => { const x=lum(a),y=lum(b); return +((Math.max(x,y)+.05)/(Math.min(x,y)+.05)).toFixed(2); };
const H = (h) => [1,3,5].map(i => parseInt(h.slice(i,i+2),16)); const mix = (a,b,t) => { const A=H(a),B=H(b); return A.map((v,i)=>v+(B[i]-v)*t); };
(async () => { const b = await chromium.launch();
  async function open(w = 1440, h = 900, extra = {}) { const ctx = await b.newContext({ viewport: { width: w, height: h }, ...extra }); const p = await ctx.newPage(); p.errs = []; p.on('pageerror', e => p.errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') p.errs.push(m.text()); }); p.ctx = ctx; await p.goto(F, { waitUntil: 'load' }); await p.evaluate(() => scrollTo({ top: scrollY + document.querySelector('.wn').getBoundingClientRect().top, behavior: 'instant' })); await p.waitForTimeout(900); return p; }
  const st = (p) => p.evaluate(() => { const W = window.__win; return { k: W.S.kind, lo: W.P.lo.t, up: W.P.up.t, ang: W.P.ang.t, sl: W.P.sl.t, tilt: W.P.tilt.t, lock: W.S.locked, lox: W.P.lo.x }; });
  let p = await open();
  const D = await p.evaluate(() => { const s = document.querySelector('.wn'); return { h2: s.querySelector('h2').textContent, kinds: [...s.querySelectorAll('.wn-k b')].map(x => x.textContent), brands: [...s.querySelectorAll('.wn-b')].map(x => x.textContent), facts: [...s.querySelectorAll('.wn-fact')].map(x => x.textContent), links: [...s.querySelectorAll('a[href]')].map(a => a.getAttribute('href')), id: document.querySelectorAll('#windows').length, txt: s.innerText }; });
  ok('the five kinds, in the ruled order', D.kinds.join('|') === 'Single hung|Double hung|Casement|Slider|Picture', D.kinds.join('|'));
  ok('the four makers with the published counts 238 / 54 / 38 / 31', D.brands.join('|').replace(/\s+/g,' ') === 'NT Windows238|Simonton54|Andersen38|Pella31', D.brands.join('|'));
  ok('published facts verbatim (388 / 376 split; vinyl sentence; two days)', D.facts[0] === '388 documented window jobs. Of 376 priced: NT Windows 238, Simonton 54, Andersen 38, Pella 31.' && D.facts[1] === "Mostly vinyl. 214 of our 376 priced window jobs were vinyl, 64 were NT's Twinsulator aluminum and 33 were Andersen's Fibrex composite." && D.facts[2] === 'Most of the window-only jobs in our files took two days on site.');
  ok('no sum anywhere (241, 330, 497, 361, 1,1) and the general-description note is shown', !/\b(241|330|497|361)\b/.test(D.txt) && /general description/.test(D.txt));
  ok('only the internal booking link; one #windows', D.links.length === 1 && D.links[0] === '#booking' && D.id === 1, JSON.stringify(D.links) + D.id);
  // colours
  let good = true, det = [];
  for (const br of Object.keys(COL)) { await p.click(`.wn-b[data-b="${br}"]`); const cs = await p.evaluate(() => [...document.querySelectorAll('.wn-c')].map(b => [b.getAttribute('aria-label'), getComputedStyle(b).getPropertyValue('--c').trim().toLowerCase()])); const exp = COL[br].map(([n, h]) => [n, h.toLowerCase()]); if (JSON.stringify(cs) !== JSON.stringify(exp)) { good = false; det.push(br); } }
  ok('every maker lists exactly its published colours (NT 19, Simonton 10, Andersen 5, Pella 5)', good, det.join());
  await p.click('.wn-b[data-b="NT Windows"]'); await p.click('.wn-c[data-i="3"]');
  const fr = await p.evaluate(() => [...document.querySelectorAll('.wn-st polygon')].map(x => x.getAttribute('fill')).filter(f => /^#/.test(f)));
  const want = mix('#16140C', '#ffffff', .03).map(Math.round); ok('choosing NT Bronze paints the frame in Bronze (left-face shade)', fr.some(f => { const c = H(f); return Math.abs(c[0]-want[0]) < 6 && Math.abs(c[1]-want[1]) < 6 && Math.abs(c[2]-want[2]) < 6; }), want.join());
  await p.click('.wn-c[data-i="0"]');
  // locked behaviour
  let s0 = await st(p); ok('start: single hung, locked, closed', s0.k === 'single' && s0.lock && s0.lo === 0);
  await p.evaluate(() => document.querySelector('.wn-stage').scrollIntoView({ block: 'center', behavior: 'instant' })); await p.waitForTimeout(200); let box = await (await p.$('.wn-hit')).boundingBox(); const cx = box.x + box.width / 2, ly = box.y + box.height * .75;
  await p.mouse.move(cx, ly); await p.mouse.down(); await p.mouse.move(cx, ly - 80, { steps: 6 }); await p.mouse.up(); await p.waitForTimeout(150);
  let s1 = await st(p); const shk = await p.evaluate(() => document.querySelector('.wn-lock').classList.contains('shake') || document.querySelector('.wn-inset').classList.contains('shake'));
  ok('dragging a LOCKED sash does nothing and the lock shakes', s1.lo === 0 && shk, JSON.stringify(s1));
  await p.click('.wn-lock'); await p.waitForTimeout(400); await p.evaluate(() => document.querySelector('.wn-stage').scrollIntoView({ block: 'center', behavior: 'instant' })); await p.waitForTimeout(200); box = await (await p.$('.wn-hit')).boundingBox(); const cx2 = box.x + box.width / 2, ly2 = box.y + box.height * .75;
  await p.mouse.move(cx2, ly2); await p.mouse.down(); await p.mouse.move(cx2, ly2 - 120, { steps: 8 }); await p.mouse.up(); await p.waitForTimeout(500);
  let s2 = await st(p); ok('unlocked: dragging the lower sash up raises it', s2.lo > .25 && !s2.lock, JSON.stringify(s2));
  box = await (await p.$('.wn-hit')).boundingBox(); await p.mouse.move(cx2, box.y + box.height * .2); await p.mouse.down(); await p.mouse.move(cx2, box.y + box.height * .2 + 60, { steps: 5 }); await p.mouse.up(); await p.waitForTimeout(200);
  ok('single hung: the upper sash is fixed (dragging it changes nothing)', (await st(p)).up === 0);
  await p.click('.wn-open'); await p.waitForTimeout(1000); const s3 = await st(p); ok('Close closes it and locks it again', s3.lo === 0 && s3.lock && (await p.locator('.wn-open').innerText()) === 'Open', JSON.stringify(s3));
  await p.click('.wn-open'); await p.waitForTimeout(1200); const s4 = await st(p); ok('Open unlocks first, then raises the sash', s4.lo > .4 && !s4.lock, JSON.stringify(s4));
  await p.click('.wn-open'); await p.waitForTimeout(1100);
  // keyboard
  await p.focus('.wn-r[data-r="lo"] input'); await p.keyboard.press('ArrowRight'); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(250); const s5 = await st(p); ok('keyboard: the Sash range works (and unlocks)', s5.lo > 0 && !s5.lock, JSON.stringify(s5));
  await p.click('.wn-open'); await p.waitForTimeout(1100);
  // tilt
  await p.click('.wn-lock'); await p.waitForTimeout(300); const dis = await p.locator('.wn-tilt').isDisabled(); await p.click('.wn-tilt'); await p.waitForTimeout(700); const s6 = await st(p);
  ok('tilt-in works only when closed and unlocked', !dis && s6.tilt === 1, JSON.stringify(s6) + dis);
  await p.click('.wn-tilt');
  // kinds
  const dbl = async () => { await p.click('.wn-k[data-k="double"]'); await p.waitForTimeout(500); await p.click('.wn-lock'); await p.waitForTimeout(400); const bx = await (await p.$('.wn-hit')).boundingBox(); const x = bx.x + bx.width / 2; await p.mouse.move(x, bx.y + bx.height * .22); await p.mouse.down(); await p.mouse.move(x, bx.y + bx.height * .22 + 70, { steps: 6 }); await p.mouse.up(); await p.waitForTimeout(400); return st(p); };
  const d1 = await dbl(); ok('double hung: the upper sash slides down', d1.up > .15, JSON.stringify(d1));
  await p.click('.wn-k[data-k="casement"]'); await p.waitForTimeout(500); await p.click('.wn-lock'); await p.waitForTimeout(400); let bx = await (await p.$('.wn-hit')).boundingBox();
  await p.mouse.move(bx.x + bx.width * .78, bx.y + bx.height * .5); await p.mouse.down(); await p.mouse.move(bx.x + bx.width * .4, bx.y + bx.height * .5, { steps: 8 }); await p.mouse.up(); await p.waitForTimeout(500); const c1 = await st(p);
  ok('casement: dragging the free edge swings the sash (angle follows the pointer)', c1.ang > .3, JSON.stringify(c1));
  await p.click('.wn-k[data-k="slider"]'); await p.waitForTimeout(500); await p.click('.wn-lock'); await p.waitForTimeout(400); bx = await (await p.$('.wn-hit')).boundingBox();
  await p.mouse.move(bx.x + bx.width * .7, bx.y + bx.height * .5); await p.mouse.down(); await p.mouse.move(bx.x + bx.width * .45, bx.y + bx.height * .5, { steps: 8 }); await p.mouse.up(); await p.waitForTimeout(500); const l1 = await st(p);
  ok('slider: dragging the sash slides it sideways', l1.sl > .25, JSON.stringify(l1));
  await p.click('.wn-k[data-k="picture"]'); await p.waitForTimeout(500); const pic = await p.evaluate(() => ({ open: document.querySelector('.wn-open').offsetParent !== null, fixed: document.querySelector('.wn-fixed').offsetParent !== null, hit: getComputedStyle(document.querySelector('.wn-hit')).display }));
  ok('picture: no Open, no lock; says it is fixed glass; no drag area', !pic.open && pic.fixed && pic.hit === 'none', JSON.stringify(pic));
  // switching kind resets state
  await p.click('.wn-k[data-k="single"]'); await p.waitForTimeout(400); const r0 = await st(p); ok('switching kind returns a closed, locked window', r0.lo === 0 && r0.lock);
  // light / glass / screen / grille
  const cnt = (sel) => p.evaluate((s) => document.querySelectorAll(s).length, sel);
  await p.evaluate(() => { const t = document.querySelector('.wn-time'); t.value = 13; t.dispatchEvent(new Event('input')); }); await p.waitForTimeout(200);
  const lowOn = await p.evaluate(() => !!document.querySelector('.wn-dy rect[fill="#78C3B1"]')); await p.click('.wn-lowe'); const lowOff = await p.evaluate(() => !!document.querySelector('.wn-dy rect[fill="#78C3B1"]')); await p.click('.wn-lowe');
  ok('Low-E toggle changes the glass (tint layer on/off)', lowOn && !lowOff);
  const m0 = await cnt('.wn-dy rect[fill="url(#wnMesh)"]'); await p.click('.wn-scr'); const m1 = await cnt('.wn-dy rect[fill="url(#wnMesh)"]'); await p.click('.wn-scr'); ok('Insect screen adds the mesh', m0 === 0 && m1 === 1, m0 + ',' + m1);
  const g0 = await cnt('.wn-dy path[stroke-width="6.4"]'); await p.click('.wn-g[data-g="colonial"]'); const g1 = await cnt('.wn-dy path[stroke-width="6.4"]'); await p.click('.wn-g[data-g="prairie"]'); const g2 = await cnt('.wn-dy path[stroke-width="6.4"]'); await p.click('.wn-g[data-g="none"]'); ok('Colonial and Prairie grilles draw bars; none draws none', g0 === 0 && g1 > 0 && g2 > 0, [g0, g1, g2].join());
  await p.evaluate(() => { const t = document.querySelector('.wn-time'); t.value = 22; t.dispatchEvent(new Event('input')); }); await p.waitForTimeout(150);
  const night = await p.evaluate(() => ({ lamp: !!document.querySelector('.wn-dy circle[fill="url(#wnGlow)"]'), lab: document.querySelector('.wn-tl').textContent })); ok('11 pm-side: the lamp glows and the label says the time', night.lamp && night.lab === '10:00 pm', JSON.stringify(night));
  await p.evaluate(() => { const t = document.querySelector('.wn-time'); t.value = 13; t.dispatchEvent(new Event('input')); }); await p.waitForTimeout(150);
  const noon = await p.evaluate(() => !!document.querySelector('.wn-dy circle[fill="url(#wnGlow)"]')); ok('noon: no lamp glow', !noon);
  await p.click('.wn-reset'); await p.waitForTimeout(300); const rs = await p.evaluate(() => ({ b: document.querySelector('.wn-b[aria-checked=true]').dataset.b, t: document.querySelector('.wn-time').value, g: document.querySelector('.wn-g[aria-checked=true]').dataset.g })); ok('Reset returns the defaults', rs.b === 'NT Windows' && rs.t === '13' && rs.g === 'none', JSON.stringify(rs));
  // keyboard on radios
  await p.focus('.wn-k[data-k="single"]'); await p.keyboard.press('ArrowDown'); await p.waitForTimeout(500); ok('arrow keys move through the kinds', (await st(p)).k === 'double');
  // a11y / contrast
  const col = await p.evaluate(() => { const cs = (q) => { const e = document.querySelector(q), s = getComputedStyle(e); return [s.color, s.backgroundColor]; }; return { h: cs('.wn-h'), fact: cs('.wn-fact'), note: cs('.wn-note'), how: cs('.wn-how'), kn: cs('.wn-kn'), kActive: cs('.wn-k[aria-checked=true]'), kSmall: getComputedStyle(document.querySelector('.wn-k[aria-checked=true] small')).color, open: cs('.wn-open') }; });
  const P = (s) => s.match(/[\d.]+/g).slice(0, 3).map(Number); const bgAt = [232, 239, 233];
  const crs = { fact: cr(P(col.fact[0]), bgAt), note: cr(P(col.note[0]), bgAt), how: cr(P(col.how[0]), [245, 249, 245]), ksm: cr(P(col.kSmall), [14, 59, 44]), open: cr(P(col.open[0]), P(col.open[1])) };
  ok('contrast ≥ 4.5', Object.values(crs).every(v => v >= 4.5), JSON.stringify(crs));
  ok('fonts Montserrat/Inter only', await p.evaluate(() => [...new Set([...document.querySelectorAll('.wn *')].map(e => getComputedStyle(e).fontFamily.split(',')[0].replace(/["']/g, '')))].filter(f => !/Inter|Montserrat/.test(f)).length === 0));
  ok('page errors 0', p.errs.length === 0, p.errs.join('|')); await p.ctx.close();
  // reduced motion
  p = await open(1440, 900, { reducedMotion: 'reduce' }); await p.click('.wn-open'); await p.waitForTimeout(500); const rm = await p.evaluate(() => ({ x: window.__win.P.lo.x, t: window.__win.P.lo.t })); ok('reduced motion: the sash snaps to its target (no spring)', rm.x === rm.t && rm.t > .4, JSON.stringify(rm));
  ok('reduced motion: no errors', p.errs.length === 0); await p.ctx.close();
  // layouts
  for (const [w, h] of [[1440, 900], [1024, 768], [768, 1024], [390, 844]]) { const q = await open(w, h); const r = await q.evaluate(() => { const bad = []; document.querySelectorAll('.wn button,.wn a,.wn input').forEach(e => { if (e.offsetParent === null) return; const r = e.getBoundingClientRect(); if (r.width < 43.5 || r.height < 43.5) bad.push((e.className || e.tagName) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); }); const sec = document.querySelector('.wn').getBoundingClientRect(); let over = 0; document.querySelectorAll('.wn, .wn *').forEach(e => { const r = e.getBoundingClientRect(); if (r.width && !e.closest('.wn-bg') && !e.closest('.wn-kinds') && r.right - document.documentElement.clientWidth > over) over = Math.round(r.right - document.documentElement.clientWidth); }); return { over, bad: bad.slice(0, 5), h: Math.round(sec.height / innerHeight * 100) / 100, stageW: Math.round(document.querySelector('.wn-stage').getBoundingClientRect().width) }; });
    ok(`${w}: no overflow, targets ≥ 44 px, 0 errors`, r.over <= 2 && r.bad.length === 0 && q.errs.length === 0, JSON.stringify(r)); await q.ctx.close(); }
  // touch
  const t = await open(390, 844, { hasTouch: true }); await t.addStyleTag({ content: 'html{scroll-behavior:auto!important}' }); const ta = await t.evaluate(() => ({ hit: getComputedStyle(document.querySelector('.wn-hit')).touchAction, svg: getComputedStyle(document.querySelector('.wn-svg')).touchAction })); await t.evaluate(() => document.querySelector('.wn-open').scrollIntoView({ block: 'center', behavior: 'instant' })); await t.waitForTimeout(300); { const r = await t.evaluate(() => { const b = document.querySelector('.wn-open').getBoundingClientRect(); return [b.x + b.width / 2, b.y + b.height / 2]; }); await t.touchscreen.tap(r[0], r[1]); } await t.waitForTimeout(900); const ts = await t.evaluate(() => window.__win.P.lo.t);
  ok('touch: the drag area blocks scroll only over the window; Open by tap works', ta.hit === 'none' && ta.svg !== 'none' && ts > .4, JSON.stringify(ta) + ts); await t.ctx.close();
  // frame time while dragging
  p = await open(); await p.click('.wn-lock'); await p.waitForTimeout(300); const bb = await (await p.$('.wn-hit')).boundingBox();
  const ft = await p.evaluate(() => new Promise(res => { const a = []; let l = performance.now(), n = 0; const f = (t) => { a.push(t - l); l = t; if (++n < 90) requestAnimationFrame(f); else { a.sort((x, y) => x - y); res(a[Math.floor(a.length * .5)]); } }; requestAnimationFrame(f); }));
  await p.mouse.move(bb.x + bb.width / 2, bb.y + bb.height * .75); await p.mouse.down(); const t0 = Date.now(); for (let i = 0; i < 40; i++) await p.mouse.move(bb.x + bb.width / 2, bb.y + bb.height * (.75 - i * .006)); await p.mouse.up();
  const ft2 = await p.evaluate(() => new Promise(res => { const a = []; let l = performance.now(), n = 0; const f = (t) => { a.push(t - l); l = t; if (++n < 60) requestAnimationFrame(f); else { a.sort((x, y) => x - y); res(a[Math.floor(a.length * .5)]); } }; requestAnimationFrame(f); }));
  ok('idle frame time ≤ 20 ms (nothing runs when nothing moves)', ft <= 20, ft.toFixed(1)); await p.ctx.close();
  for (const c of ck) console.log(c.join(' | ')); console.log('FAILS', ck.filter(c => c[0] === 'FAIL').length, 'of', ck.length); await b.close(); })();
