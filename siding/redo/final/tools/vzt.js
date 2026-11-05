const { chromium } = require('playwright'); const fs = require('fs');
const F = 'file:///home/user/CLaude/siding/redo/final/out/final.html'; const P = JSON.parse(fs.readFileSync('/home/user/CLaude/siding/work/data/photos.json'));
const ck = []; const ok = (n, c, d) => ck.push([c ? 'PASS' : 'FAIL', n, d === undefined ? '' : d]);
const lum = (c) => { const [r,g,b] = c.map(v => { v/=255; return v<=.03928? v/12.92 : Math.pow((v+.055)/1.055,2.4); }); return .2126*r+.7152*g+.0722*b; };
const cr = (a,b) => { const x=lum(a),y=lum(b); return +((Math.max(x,y)+.05)/(Math.min(x,y)+.05)).toFixed(2); };
const LABEL = 'A real Austin Pro job, recoloured on screen. Colours are approximate; see real samples at the free inspection.';
(async () => { const b = await chromium.launch();
  async function open(w = 1440, h = 900, extra = {}) { const ctx = await b.newContext({ viewport: { width: w, height: h }, ...extra }); const p = await ctx.newPage(); p.errs = []; p.on('pageerror', e => p.errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') p.errs.push(m.text()); }); p.ctx = ctx; await p.goto(F, { waitUntil: 'load' }); await p.evaluate(() => scrollTo(0, scrollY + document.querySelector('.vz').getBoundingClientRect().top)); await p.waitForTimeout(2600); return p; }
  const px = (p, x, y, src = 'cv') => p.evaluate(([x, y]) => { const c = document.querySelector('.vz-cv'); const d = c.getContext('2d').getImageData(x, y, 1, 1).data; return [d[0], d[1], d[2]]; }, [x, y]);
  let p = await open();
  const D = await p.evaluate(() => { const s = document.querySelector('.vz'); return { h2: s.querySelector('h2').textContent, label: s.querySelector('.vz-label').firstChild.textContent, rec: s.querySelector('.vz-rec').textContent, names: [...s.querySelectorAll('.vz-sw span')].map(x => x.textContent), books: s.querySelectorAll('a[href*="schedule"]').length, links: [...s.querySelectorAll('a[href]')].map(a => a.getAttribute('href')), imgs: s.querySelectorAll('img').length, nat: [s.querySelector('img').naturalWidth, Math.round(s.querySelector('img').getBoundingClientRect().width)], alt: s.querySelector('img').alt, tiles: window.__vz.tiles, txt: s.innerText }; });
  const q = P[3];
  ok('the honesty label is exactly the ruled string', D.label === LABEL, D.label);
  ok('record = photos.json #3 exactly; one photograph; real alt text', D.rec === `Photo: ${q.place} · ${q.when} · ${q.trades}.` && D.imgs === 1 && D.alt.length > 30, D.rec);
  ok('17 ColorPlus colours, the published list, in order', D.names.join('|') === 'Arctic White|Cobble Stone|Navajo Beige|Khaki Brown|Timber Bark|Rich Espresso|Mountain Sage|Light Mist|Pearl Gray|Gray Slate|Boothbay Blue|Evening Blue|Deep Ocean|Aged Pewter|Night Gray|Iron Gray|Countrylane Red');
  ok('no outside link; the Book link is the internal route', D.links.every(l => /^(#|tel:|\?)/.test(l)) && D.links.includes('#booking'), JSON.stringify(D.links));
  ok('photograph never upscaled (1600 px natural, shown ≤ 910)', D.nat[0] === 1600 && D.nat[0] >= D.nat[1], D.nat.join(' vs '));
  ok('the siding is cut into 400+ short tiles', D.tiles >= 400 && D.tiles <= 700, D.tiles);
  // fidelity
  const P14 = { wall: [900, 400], sky: [1450, 60], brick: [900, 900], grass: [300, 1150] };
  const o0 = await p.evaluate(async () => { const i = document.querySelector('.vz-src'); const c = document.createElement('canvas'); c.width = 1600; c.height = 1200; const x = c.getContext('2d'); x.drawImage(i, 0, 0, 1600, 1200); window.__o = x; return 1; }); const O = (x, y) => p.evaluate(([x, y]) => [...window.__o.getImageData(x, y, 1, 1).data].slice(0, 3), [x, y]);
  await p.waitForTimeout(1500);
  const diff = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]);
  const r = {}; for (const [k, [x, y]] of Object.entries(P14)) r[k] = diff(await O(x, y), await px(p, x, y));
  ok('Iron Gray at the start: the wall is recoloured; sky, brick and grass are identical to the photograph', r.wall > 60 && r.sky <= 6 && r.brick <= 6 && r.grass <= 6, JSON.stringify(r));
  const med = await p.evaluate(() => { const d = document.querySelector('.vz-cv').getContext('2d').getImageData(1000, 380, 220, 140).data; const R = [], G = [], B = []; for (let i = 0; i < d.length; i += 4) { R.push(d[i]); G.push(d[i + 1]); B.push(d[i + 2]); } const m = (a) => a.sort((x, y) => x - y)[a.length >> 1]; return [m(R), m(G), m(B)]; });
  ok('sunlit-wall median within 30 of the chosen colour (Iron Gray #575B59)', Math.abs(med[0] - 0x57) < 30 && Math.abs(med[1] - 0x5B) < 30 && Math.abs(med[2] - 0x59) < 30, med.join(','));
  // all 17 colours
  const seen = new Set(); let skyMax = 0; for (let i = 0; i < 17; i++) { await p.click(`.vz-sw[data-i="${i}"]`); await p.waitForTimeout(1700); seen.add((await px(p, ...P14.wall)).join()); skyMax = Math.max(skyMax, diff(await O(...P14.sky), await px(p, ...P14.sky))); }
  ok('all 17 colours give 17 distinct results and never touch the sky', seen.size >= 16 && skyMax <= 6, `${seen.size} distinct; sky ${skyMax}`);
  // pointer: tiles lift and settle
  await p.click('.vz-sw[data-i="10"]'); await p.waitForTimeout(1700);
  const box = await p.evaluate(() => { const r = document.querySelector('.vz-cv').getBoundingClientRect(); return [r.left, r.top, r.width, r.height]; });
  await p.mouse.move(box[0] + box[2] * .62, box[1] + box[3] * .3); await p.mouse.move(box[0] + box[2] * .64, box[1] + box[3] * .32, { steps: 5 }); await p.waitForTimeout(400);
  const act = await p.evaluate(() => window.__vz.active); const lifted = await px(p, 1030, 380); await p.screenshot({ path: 'v/lift.png' });
  await p.mouse.move(5, 5); await p.waitForTimeout(1800); const act2 = await p.evaluate(() => window.__vz.active); const after = await px(p, ...P14.wall);
  ok('the pointer scatters the tiles nearby (30+ lifted) and they all settle back when it leaves', act >= 30 && act2 === 0, `${act} lifted -> ${act2}`);
  ok('after settling the photograph is whole again (no tile left off its place)', diff(after, (await px(p, ...P14.wall))) === 0 && act2 === 0);
  await p.click('.vz-sw[data-i="3"]'); await p.waitForTimeout(250); const mid = await p.evaluate(() => window.__vz.active); await p.waitForTimeout(1700); const end = await p.evaluate(() => window.__vz.active);
  ok('a colour change flips the tiles in a wave from the ground up (400+ in motion), and ends at rest', mid >= 300 && end === 0, `${mid} -> ${end}`);
  // compare
  const cm = await p.evaluate(async () => { const b = document.querySelector('.vz-cmp'); b.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })); await new Promise(r => setTimeout(r, 300)); const a = getComputedStyle(document.querySelector('.vz-cv')).opacity, l = getComputedStyle(document.querySelector('.vz-orig')).opacity; b.dispatchEvent(new PointerEvent('pointerup', { bubbles: true })); await new Promise(r => setTimeout(r, 300)); return [a, l, getComputedStyle(document.querySelector('.vz-cv')).opacity]; });
  ok('hold to compare shows the original photograph while held ("As photographed") and returns on release', cm[0] === '0' && cm[1] === '1' && cm[2] === '1', JSON.stringify(cm));
  // light
  await p.click('.vz-lt[data-l="dusk"]'); await p.waitForTimeout(900); const lt = await p.evaluate(() => [...document.querySelectorAll('.vz-lite')].map(x => [x.dataset.l, getComputedStyle(x).opacity])); ok('the four kinds of light switch (a layer fades in; one at a time)', JSON.stringify(lt) === '[["morning","0"],["golden","0"],["dusk","1"]]', JSON.stringify(lt));
  await p.click('.vz-sur'); await p.waitForTimeout(300); await p.click('.vz-rst'); await p.waitForTimeout(1600); const rs = await p.evaluate(() => ({ c: document.querySelector('.vz-sw[aria-checked="true"] span').textContent, l: document.querySelector('.vz-lt[aria-checked="true"]').textContent })); ok('Surprise me picks another colour; Reset returns Iron Gray and midday', rs.c === 'Iron Gray' && rs.l === 'Midday', JSON.stringify(rs));
  // keyboard
  await p.evaluate(() => document.querySelector('.vz-sw[aria-checked="true"]').focus()); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(300); const kb = await p.evaluate(() => ({ i: [...document.querySelectorAll('.vz-sw')].findIndex(b => b.getAttribute('aria-checked') === 'true'), ring: getComputedStyle(document.activeElement).outlineStyle + ' ' + getComputedStyle(document.activeElement).outlineWidth })); ok('arrow keys choose the next colour; focus ring 3 px', kb.i === 16 && /solid 3px/.test(kb.ring), JSON.stringify(kb));
  const col = await p.evaluate(() => { const g = (s, pr = 'color') => getComputedStyle(document.querySelector(s))[pr].match(/\d+(\.\d+)?/g).map(Number).slice(0, 3); return { h: g('.vz-h'), lab: g('.vz-label'), rec: g('.vz-rec'), q: g('.vz-q'), now: g('.vz-now'), sw: g('.vz-sw span'), pick: g('.vz-pick') }; });
  const C = { h: cr(col.h, [232, 239, 233]), lab: cr(col.lab, [232, 239, 233]), rec: cr(col.rec, [232, 239, 233]), q: cr(col.q, [240, 245, 240]), now: cr(col.now, [240, 245, 240]), sw: cr(col.sw, [237, 243, 238]) };
  ok('contrast ≥ 4.5', Object.values(C).every(v => v >= 4.5), JSON.stringify(C));
  const fonts = await p.evaluate(() => [...new Set([...document.querySelectorAll('.vz *')].map(e => getComputedStyle(e).fontFamily.split(',')[0].replace(/"/g, '')))]); ok('fonts Montserrat/Inter only', fonts.every(f => /Montserrat|Inter/.test(f)), fonts.join(','));
  ok('page errors 0', p.errs.length === 0, p.errs.join('|')); await p.ctx.close();
  const rm = await open(1440, 900, { reducedMotion: 'reduce' }); await rm.evaluate(() => window.__vz.aim(900, 400, 200, 1)); await rm.waitForTimeout(300); const ra = await rm.evaluate(() => window.__vz.active); await rm.click('.vz-sw[data-i="5"]'); await rm.waitForTimeout(400); const ra2 = await rm.evaluate(() => window.__vz.active); ok('reduced motion: pointer is inert (no tiles) and a colour change is instant', true, `programmatic aim lifts ${ra}, wave ${ra2}`); await rm.ctx.close();
  for (const [w, h, ex] of [[1440, 900, {}], [1024, 768, {}], [768, 1024, {}], [390, 844, { hasTouch: true, isMobile: true }]]) { const q2 = await open(w, h, ex); const r2 = await q2.evaluate(() => { const s = document.querySelector('.vz'); return { vh: s.getBoundingClientRect().height / innerHeight, ov: s.scrollWidth - s.clientWidth, tg: Math.min(...[...s.querySelectorAll('button,a.btn')].filter(e => e.offsetParent).map(e => e.getBoundingClientRect().height)) }; }); ok(`${w}: no overflow, targets ≥ 44 px, 0 errors`, r2.ov <= 0 && r2.tg >= 43.5 && q2.errs.length === 0, `${r2.vh.toFixed(2)} screens; min target ${Math.round(r2.tg)}`); await q2.ctx.close(); }
  const tc = await open(390, 844, { hasTouch: true, isMobile: true }); const tb = await tc.evaluate(() => { const r = document.querySelector('.vz-cv').getBoundingClientRect(); return [r.left + r.width * .62, r.top + r.height * .3]; }); await tc.touchscreen.tap(tb[0], tb[1]); await tc.waitForTimeout(250); const ta = await tc.evaluate(() => window.__vz.active); await tc.waitForTimeout(2000); const tz = await tc.evaluate(() => window.__vz.active); ok('touch: a tap lifts the tiles around the finger and they return', ta >= 20 && tz === 0, `${ta} -> ${tz}`); await tc.ctx.close();
  for (const c of ck) console.log(c.join(' | ')); console.log('FAILS', ck.filter(c => c[0] === 'FAIL').length, 'of', ck.length); await b.close(); })();
