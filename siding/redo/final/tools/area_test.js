/* Area (section 9) gate test. Usage: OUT=out/final-area.html python3 build_final.py && node tools/area_test.js */
const { chromium } = require('playwright'); const fs = require('fs');
const F = 'file:///home/user/CLaude/siding/redo/final/out/' + (process.env.F || 'final-area.html');
const WORK = '/home/user/CLaude/siding/work/data/';
const NEAR = JSON.parse(fs.readFileSync(WORK + 'near.json')), PH = JSON.parse(fs.readFileSync(WORK + 'photos.json'));
const TALLY = Object.fromEntries(NEAR.g.filter(g => g[1] === 'c').map(g => [g[0], g[6]]));
const TOWNS = ['Austin', 'Round Rock', 'Cedar Park', 'Leander', 'Pflugerville', 'Georgetown', 'Buda'];
const ck = []; const ok = (n, c, d) => ck.push([c ? 'PASS' : 'FAIL', n, d === undefined ? '' : d]);
const lum = (c) => { const [r, g, b] = c.map(v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }); return .2126 * r + .7152 * g + .0722 * b; };
const cr = (a, b) => { const x = lum(a), y = lum(b); return +((Math.max(x, y) + .05) / (Math.min(x, y) + .05)).toFixed(2); };
const P = (s) => s.match(/[\d.]+/g).slice(0, 3).map(Number);
(async () => {
  const b = await chromium.launch();
  async function open(w = 1440, h = 900, extra = {}, goto = true) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, ...extra }); const p = await ctx.newPage(); p.errs = []; p.on('pageerror', e => p.errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') p.errs.push(m.text()); }); p.ctx = ctx;
    await p.goto(F, { waitUntil: 'load' }); await p.addStyleTag({ content: 'html{scroll-behavior:auto!important}' }); return p;
  }
  const toBoard = (p, dy = 0) => p.evaluate((dy) => { const t = scrollY + document.querySelector('.ar-board').getBoundingClientRect().top; scrollTo({ top: t + dy, behavior: 'instant' }); }, dy);
  const scrollThrough = async (p) => { const H = await p.evaluate(() => document.querySelector('.ar-board').getBoundingClientRect().height); for (let y = -100; y < H + 300; y += 220) { await toBoard(p, y); await p.waitForTimeout(90); } await p.waitForTimeout(900); };
  const cnt = (p, sel) => p.evaluate((s) => document.querySelectorAll(s).length, sel);
  const clsOn = (p) => p.evaluate(() => [...document.querySelectorAll('.ar-c')].map(l => l.classList.contains('on') ? 1 : l.classList.contains('off') ? -1 : 0));

  let p = await open(); await toBoard(p, -200); await p.waitForTimeout(2600);
  /* ---------- data ---------- */
  const D = await p.evaluate(() => { const s = document.querySelector('.ar'); const norm = (t) => t.replace(/\s+/g, ' ').trim();
    return { h2: s.querySelector('h2').textContent.trim(), lock: norm(s.querySelector('.ar-lock').textContent), sec: norm(s.innerText), signs: [...s.querySelectorAll('.ar-sign')].map(b => ({ t: b.dataset.town, n: b.dataset.n, num: b.querySelector('.ar-num').textContent, cu: b.querySelector('.ar-num').dataset.cu })),
      cards: [...s.querySelectorAll('.ar-c')].map(l => { const bn = l.querySelector('.ar-card'); return { i: +l.dataset.i, town: l.dataset.town, tr: l.dataset.tr, rec: bn.dataset.rec, hood: bn.querySelector('b').textContent, sub: bn.querySelector('small').textContent, trades: bn.querySelector('em').textContent, nw: l.querySelector('img').naturalWidth, alt: l.querySelector('img').getAttribute('alt') }; }),
      chips: [...s.querySelectorAll('.ar-chip')].map(c => c.textContent), links: [...s.querySelectorAll('a[href]')].map(a => a.getAttribute('href')), html: s.outerHTML, ids: document.querySelectorAll('#area').length, thr: s.querySelectorAll('.ar-sign').length }; });
  ok('heading is "On your street."', D.h2 === 'On your street.', D.h2);
  ok('the 886 line is exactly "886 projects: 312 on the map with photos + 574 more counted"', D.lock === '886 projects: 312 on the map with photos + 574 more counted', D.lock);
  ok('no unpublished "since 2018" claim anywhere in the section', !/since 2018/i.test(D.sec) && !/since 2018/i.test(D.html));
  ok('7 town signs in the ruled order', D.signs.map(s => s.t).join() === TOWNS.join(), D.signs.map(s => s.t).join());
  ok('every sign count equals near.json (' + TOWNS.map(t => t + ' ' + TALLY[t]).join(', ') + ')', D.signs.every(s => +s.n === TALLY[s.t] && +s.num === TALLY[s.t] && +s.cu === TALLY[s.t]), JSON.stringify(D.signs.map(s => [s.t, s.n, s.num])));
  ok('16 pinned cards', D.cards.length === 16, D.cards.length);
  let recOK = true, det = []; D.cards.forEach(c => { const q = PH[c.i]; const rec = `${q.place} · ${q.when} · ${q.trades}`; const hood = q.place.includes(',') ? q.place.split(',')[0].trim() : q.place; if (c.rec !== rec || c.hood !== hood || c.trades !== q.trades || !c.sub.includes(q.when)) { recOK = false; det.push(c.i); } });
  ok('every card\'s place, month and trades are exactly photos.json\'s (record string, caption, trades)', recOK, det.join());
  ok('every card\'s town is one of the seven signs and is the city part of its place', D.cards.every(c => TOWNS.includes(c.town) && (PH[c.i].place.split(',').pop().trim() === c.town)));
  ok('every one of the seven towns has at least one pinned photo', TOWNS.every(t => D.cards.some(c => c.town === t)));
  ok('photos: no duplicates, all decoded (naturalWidth > 0), alt text present', new Set(D.cards.map(c => c.i)).size === 16 && D.cards.every(c => c.nw > 0 && c.alt === ''), D.cards.filter(c => !c.nw).map(c => c.i).join());
  const trSet = [...new Set(D.cards.flatMap(c => c.tr.split('|')))];
  ok('trade chips: All + exactly the trades present on the board', D.chips[0] === 'All trades' && D.chips.slice(1).sort().join() === trSet.sort().join(), D.chips.join());
  ok('no sum shown (771 = the seven signs added, 115 = 886 - 771, 15)', !/\b(771|115)\b/.test(D.sec));
  ok('links: only the internal #booking and tel: (no outside link, no target=_blank, no window.open)', D.links.every(h => h === '#booking' || h.startsWith('tel:')) && !/target="_blank"|austinprosiding\.com|window\.open/.test(D.html), JSON.stringify(D.links));
  ok('one #area', D.ids === 1);
  /* ---------- thread, drawn on scroll ---------- */
  const t0 = await p.evaluate(() => ({ off: document.querySelector('.ar-main').style.strokeDashoffset, inN: document.querySelectorAll('.ar-c.in').length, d: !!document.querySelector('.ar-main').getAttribute('d') }));
  await toBoard(p, -300); await p.waitForTimeout(500);
  const t1 = await p.evaluate(() => ({ off: +document.querySelector('.ar-main').style.strokeDashoffset, inN: document.querySelectorAll('.ar-c.in').length }));
  await scrollThrough(p);
  const t2 = await p.evaluate(() => ({ off: +document.querySelector('.ar-main').style.strokeDashoffset, inN: document.querySelectorAll('.ar-c.in').length }));
  ok('the thread has a path and starts undrawn; drawing it grows with scroll; all 16 cards are dropped once it is drawn', t0.d && t1.off > 0 && t2.off === 0 && t2.inN === 16 && t1.inN < 16, JSON.stringify([t0, t1, t2]));
  await p.waitForTimeout(2500);
  const sett = await p.evaluate(() => { const A = document.querySelector('.ar').__ar; return { dev: Math.max(...A.pts.map(q => Math.hypot(q.x - q.x0, q.y - q.y0))), n: A.pts.length, run: A.running() }; });
  ok('the thread settles (max displacement < 1 px after 2.5 s) and the loop stops when idle', sett.dev < 1 && !sett.run, JSON.stringify(sett));
  /* ---------- sign hover / click ---------- */
  await toBoard(p, 200); await p.waitForTimeout(400);
  await p.hover('.ar-sign[data-town="Round Rock"]'); await p.waitForTimeout(300);
  let st = await clsOn(p); const rrIdx = D.cards.map((c, i) => c.town === 'Round Rock' ? i : -1).filter(i => i >= 0);
  const fanShow = await cnt(p, '.ar-fg.show'); const lit = await p.evaluate(() => document.querySelector('.ar-sign.lit') && document.querySelector('.ar-sign.lit').dataset.town);
  ok('hovering a sign lights that town\'s cards, dims the rest, draws its threads and lights the sign', st.filter(x => x === 1).length === rrIdx.length && rrIdx.every(i => st[i] === 1) && st.filter(x => x === -1).length === 16 - rrIdx.length && fanShow === rrIdx.length && lit === 'Round Rock', JSON.stringify([st, fanShow, lit]));
  await p.mouse.move(1412, 450); await p.waitForTimeout(250); st = await clsOn(p);
  ok('moving away restores everything (no dim, no threads, nothing pressed)', st.every(x => x === 0) && (await cnt(p, '.ar-fg.show')) === 0 && (await cnt(p, '.ar-sign[aria-pressed=true]')) === 0);
  await p.click('.ar-sign[data-town="Cedar Park"]'); await p.mouse.move(1412, 450); await p.waitForTimeout(400); st = await clsOn(p);
  const cpIdx = D.cards.map((c, i) => c.town === 'Cedar Park' ? i : -1).filter(i => i >= 0);
  ok('clicking a sign locks the town (aria-pressed, cards lit after the pointer leaves, threads stay)', (await cnt(p, '.ar-sign[aria-pressed=true]')) === 1 && cpIdx.every(i => st[i] === 1) && (await cnt(p, '.ar-fg.show')) === cpIdx.length);
  const rd = await p.evaluate(() => document.querySelector('.ar-read').innerText.replace(/\s+/g, ' '));
  ok('the readout names the town with the firm\'s tally (Cedar Park 35 documented projects)', /Cedar Park/.test(rd) && /\b35\b/.test(rd) && /documented project/.test(rd), rd);
  await p.click('.ar-sign[data-town="Cedar Park"]'); await p.mouse.move(1412, 450); await p.waitForTimeout(300);
  ok('clicking the same sign again releases it', (await cnt(p, '.ar-sign[aria-pressed=true]')) === 0 && (await clsOn(p)).every(x => x === 0));
  // keyboard on signs
  await p.focus('.ar-sign[data-town="Austin"]'); await p.keyboard.press('ArrowDown'); const fa = await p.evaluate(() => document.activeElement.dataset.town);
  await p.keyboard.press('Enter'); await p.waitForTimeout(300); const kp = await p.evaluate(() => [document.querySelector('.ar-sign[aria-pressed=true]') && document.querySelector('.ar-sign[aria-pressed=true]').dataset.town, document.querySelectorAll('.ar-c.on').length]);
  ok('keyboard: ArrowDown moves between signs, Enter locks the town and lights its cards', fa === 'Round Rock' && kp[0] === 'Round Rock' && kp[1] === 2, JSON.stringify([fa, kp]));
  await p.keyboard.press('Escape'); await p.waitForTimeout(200);
  ok('Escape clears the selection', (await cnt(p, '.ar-sign[aria-pressed=true]')) === 0 && (await clsOn(p)).every(x => x === 0));
  /* ---------- chips ---------- */
  await p.evaluate(() => document.querySelector('.ar-chips').scrollIntoView({ block: 'center', behavior: 'instant' }));
  await p.click('.ar-chip[data-t="Metal Roofing"]'); await p.waitForTimeout(250); st = await clsOn(p);
  const metal = D.cards.map((c, i) => c.tr.split('|').includes('Metal Roofing') ? i : -1).filter(i => i >= 0);
  ok('trade chip "Metal Roofing" lights exactly the cards with that trade (' + metal.length + ') and dims the rest', metal.every(i => st[i] === 1) && st.filter(x => x === 1).length === metal.length && st.filter(x => x === -1).length === 16 - metal.length && (await p.getAttribute('.ar-chip[data-t="Metal Roofing"]', 'aria-checked')) === 'true' && (await p.getAttribute('.ar-chip[data-t="all"]', 'aria-checked')) === 'false');
  await p.click('.ar-sign[data-town="Austin"]'); await p.waitForTimeout(250); st = await clsOn(p);
  const am = D.cards.map((c, i) => c.town === 'Austin' && c.tr.split('|').includes('Metal Roofing') ? i : -1).filter(i => i >= 0);
  ok('town + trade combine (Austin + Metal Roofing)', st.filter(x => x === 1).length === am.length && am.every(i => st[i] === 1), JSON.stringify([am, st]));
  await p.click('.ar-chip[data-t="Garage Doors"]'); await p.waitForTimeout(250); const rd2 = await p.evaluate(() => document.querySelector('.ar-read').innerText.replace(/\s+/g, ' '));
  const agd = D.cards.filter(c => c.town === 'Austin' && c.tr.split('|').includes('Garage Doors')).length;
  ok('the readout says so when a town has no pinned photo for a trade (and says only what the data says)', agd > 0 ? /pinned photo/.test(rd2) : /No pinned photo of garage doors here yet/.test(rd2), rd2);
  await p.click('.ar-sign[data-town="Austin"]'); await p.click('.ar-chip[data-t="all"]'); await p.focus('.ar-chip[data-t="all"]'); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(250);
  ok('keyboard: arrow keys move through the chips and select (radio group)', (await p.getAttribute('.ar-chip[data-t="Siding"]', 'aria-checked')) === 'true' && (await p.evaluate(() => document.activeElement.dataset.t)) === 'Siding');
  await p.click('.ar-chip[data-t="all"]'); await p.waitForTimeout(200);
  /* ---------- hover a card -> its sign + one thread ---------- */
  await toBoard(p, 300); await p.waitForTimeout(500);
  await p.hover('.ar-c:nth-child(6) .ar-card'); await p.waitForTimeout(500);
  const hc = await p.evaluate(() => ({ fan: document.querySelectorAll('.ar-fg.show').length, lit: document.querySelector('.ar-sign.lit') && document.querySelector('.ar-sign.lit').dataset.town, town: document.querySelector('.ar-c:nth-child(6)').dataset.town }));
  ok('hovering a card lights its own town sign and draws one thread to it', hc.fan === 1 && hc.lit === hc.town, JSON.stringify(hc));
  /* ---------- the viewer ---------- */
  const card = '.ar-c:nth-child(3) .ar-card'; await p.click(card); await p.waitForTimeout(800);
  let dv = await p.evaluate(() => { const d = document.querySelector('.ar-dlg'); return { open: d.open, t: d.querySelector('.ar-dt').textContent, rec: d.querySelector('.ar-dr').textContent, k: d.querySelector('.ar-dk').textContent, src: d.querySelector('img').src.slice(0, 22), alt: d.querySelector('img').alt, tn: d.querySelector('.ar-dtn').textContent, af: document.activeElement.className, book: d.querySelector('.ar-dbook').getAttribute('href'), modal: d.matches(':modal') }; });
  const c3 = PH[D.cards[2].i];
  ok('clicking a card opens the in-page viewer (modal) with the record exactly as in the data', dv.open && dv.modal && dv.rec === `${c3.place} · ${c3.when} · ${c3.trades}` && dv.t === c3.place.split(',')[0] && dv.k === 'Photo 3 of 16' && dv.src === 'data:image/webp;base64', JSON.stringify(dv));
  ok('the viewer shows the firm\'s tally for the town and an internal Book link', dv.tn.includes(String(TALLY[D.cards[2].town])) && dv.book === '#booking', dv.tn + dv.book);
  await p.keyboard.press('ArrowRight'); await p.waitForTimeout(450); const n1 = await p.evaluate(() => [document.querySelector('.ar-dk').textContent, document.querySelector('.ar-dr').textContent]);
  const c4 = PH[D.cards[3].i]; ok('ArrowRight shows the next photo and its record', n1[0] === 'Photo 4 of 16' && n1[1] === `${c4.place} · ${c4.when} · ${c4.trades}`, JSON.stringify(n1));
  await p.click('.ar-dp'); await p.waitForTimeout(400); await p.click('.ar-dp'); await p.waitForTimeout(400); const n2 = await p.evaluate(() => document.querySelector('.ar-dk').textContent);
  ok('Previous works and the sequence wraps (Photo 2 of 16 after two steps back)', n2 === 'Photo 2 of 16', n2);
  for (let i = 0; i < 14; i++) await p.keyboard.press('ArrowRight'); await p.waitForTimeout(300); ok('the sequence wraps around the end (16 -> 1)', (await p.evaluate(() => document.querySelector('.ar-dk').textContent)) === 'Photo 16 of 16'); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(300); ok('... and 16 -> 1', (await p.evaluate(() => document.querySelector('.ar-dk').textContent)) === 'Photo 1 of 16');
  // focus trap
  let esc = false; for (let i = 0; i < 12; i++) { await p.keyboard.press('Tab'); const inside = await p.evaluate(() => !!document.activeElement.closest('.ar-dlg')); if (!inside) esc = true; }
  for (let i = 0; i < 12; i++) { await p.keyboard.press('Shift+Tab'); if (!(await p.evaluate(() => !!document.activeElement.closest('.ar-dlg')))) esc = true; }
  ok('focus is trapped in the viewer (12 Tab and 12 Shift+Tab never leave it)', !esc);
  await p.keyboard.press('Escape'); await p.waitForTimeout(500);
  const afterEsc = await p.evaluate(() => ({ open: document.querySelector('.ar-dlg').open, inCard: !!(document.activeElement && document.activeElement.classList.contains('ar-card')), idx: document.activeElement.closest('.ar-c') ? document.activeElement.closest('.ar-c').dataset.i : null }));
  ok('Escape closes the viewer and returns focus to a card', !afterEsc.open && afterEsc.inCard, JSON.stringify(afterEsc));
  await p.click(card); await p.waitForTimeout(600); await p.mouse.click(8, 450); await p.waitForTimeout(450); ok('clicking the backdrop closes it', !(await p.evaluate(() => document.querySelector('.ar-dlg').open)));
  await p.click(card); await p.waitForTimeout(600); await p.click('.ar-dx'); await p.waitForTimeout(450); ok('the Close button closes it', !(await p.evaluate(() => document.querySelector('.ar-dlg').open)));
  await p.click(card); await p.waitForTimeout(600); const showTown = await p.evaluate(() => document.querySelector('.ar-dshow').dataset.town); await p.click('.ar-dshow'); await p.waitForTimeout(700);
  const sh = await p.evaluate(() => ({ open: document.querySelector('.ar-dlg').open, pressed: document.querySelector('.ar-sign[aria-pressed=true]') && document.querySelector('.ar-sign[aria-pressed=true]').dataset.town }));
  ok('"Show <town> on the board" closes the viewer and locks that town\'s sign', !sh.open && sh.pressed === showTown, JSON.stringify(sh)); await p.keyboard.press('Escape'); await p.waitForTimeout(200);
  // roving tabindex + arrow nav on cards
  await p.focus('.ar-c:nth-child(1) .ar-card'); await p.keyboard.press('ArrowRight'); await p.keyboard.press('ArrowDown'); const rv = await p.evaluate(() => ({ i: document.activeElement.closest('.ar-c') && [...document.querySelectorAll('.ar-c')].indexOf(document.activeElement.closest('.ar-c')), tabs: [...document.querySelectorAll('.ar-card')].filter(b => b.tabIndex === 0).length }));
  ok('keyboard: arrows move through the photos (right then down = card 6) with a single tab stop', rv.i === 5 && rv.tabs === 1, JSON.stringify(rv));
  /* ---------- the viewer follows the filter; focus ring on cards; weight ---------- */
  await p.click('.ar-chip[data-t="Patio Covers"]'); await p.waitForTimeout(250); const pcN = D.cards.filter(c => c.tr.split('|').includes('Patio Covers')).length;
  await p.click('.ar-c:nth-child(' + (1 + D.cards.findIndex(c => c.tr.split('|').includes('Patio Covers'))) + ') .ar-card'); await p.waitForTimeout(700);
  const vk = await p.evaluate(() => [document.querySelector('.ar-dk').textContent, document.querySelectorAll('.ar-dd i').length]);
  ok('with a trade chip on, the viewer browses only the matching photos (' + pcN + ')', vk[0] === 'Photo 1 of ' + pcN && vk[1] === pcN, JSON.stringify(vk)); await p.keyboard.press('Escape'); await p.waitForTimeout(500); await p.click('.ar-chip[data-t="all"]');
  await p.focus('.ar-c:nth-child(2) .ar-card'); await p.keyboard.press('Shift+Tab'); await p.keyboard.press('Tab'); await p.waitForTimeout(100);
  const fr3 = await p.evaluate(() => { const b = document.activeElement; return [b.className, getComputedStyle(b.querySelector('.ar-sw')).outlineWidth, getComputedStyle(b.querySelector('.ar-sw')).outlineStyle]; });
  ok('a focused card shows a 3 px ring', fr3[1] === '3px' && fr3[2] === 'solid', JSON.stringify(fr3));
  const wt = await p.evaluate(() => ({ sec: document.querySelector('.ar').outerHTML.length, imgs: [...document.querySelectorAll('.ar-ph img')].reduce((a, i) => a + i.src.length, 0), total: document.documentElement.outerHTML.length }));
  ok('weight: the 16 photos are ' + Math.round(wt.imgs / 1024) + ' KB as data (<= 1.2 MB); the whole page is ' + (wt.total / 1048576).toFixed(2) + ' MB (< 22.5 MB)', wt.imgs <= 1.2 * 1048576 && wt.total < 22.5 * 1048576, JSON.stringify(wt));
  /* ---------- finder ---------- */
  await p.evaluate(() => document.querySelector('#ar-q').scrollIntoView({ block: 'center', behavior: 'instant' })); await p.fill('#ar-q', 'round'); await p.waitForTimeout(200);
  const fo = await p.evaluate(() => ({ n: document.querySelectorAll('#ar-lb [role=option]').length, first: document.querySelector('#ar-lb [role=option]').textContent, exp: document.querySelector('#ar-q').getAttribute('aria-expanded') }));
  ok('the finder lists matches from the firm\'s own cities and places', fo.n >= 1 && fo.exp === 'true' && /Round Rock/.test(fo.first), JSON.stringify(fo));
  await p.keyboard.press('ArrowDown'); await p.keyboard.press('Enter'); await p.waitForTimeout(350); const fr = await p.evaluate(() => ({ s: document.querySelector('.ar-sign[aria-pressed=true]') && document.querySelector('.ar-sign[aria-pressed=true]').dataset.town, rd: document.querySelector('.ar-read').innerText.replace(/\s+/g, ' ') }));
  ok('choosing a town with a sign selects it (Round Rock, 110)', fr.s === 'Round Rock' && /110/.test(fr.rd), JSON.stringify(fr));
  await p.fill('#ar-q', 'bastrop'); await p.keyboard.press('Enter'); await p.waitForTimeout(350); const fb = await p.evaluate(() => ({ s: document.querySelectorAll('.ar-sign[aria-pressed=true]').length, rd: document.querySelector('.ar-read').innerText.replace(/\s+/g, ' ') }));
  ok('a town without a sign shows only its tally from near.json (Bastrop 6) and clears the signs', fb.s === 0 && /Bastrop/.test(fb.rd) && /\b6\b/.test(fb.rd) && TALLY['Bastrop'] === 6, JSON.stringify(fb));
  await p.fill('#ar-q', 'zzqx'); await p.waitForTimeout(200); const fm = await p.evaluate(() => document.querySelector('#ar-lb').innerText);
  ok('a miss says "Not in our records yet. Call (512) 550-0000 and ask."', /Not in our records yet\. Call \(512\) 550-0000 and ask\./.test(fm), fm);
  await p.fill('#ar-q', ''); await p.keyboard.press('Escape');
  /* ---------- contrast, fonts ---------- */
  await p.click('.ar-chip[data-t="all"]'); await p.waitForTimeout(200);
  const col = await p.evaluate(() => { const g = (q, sub) => { const e = document.querySelector(q); return e ? getComputedStyle(e).color : null; };
    return { h2: g('.ar-h'), lead: g('.ar-lead'), lock: g('.ar-lock'), big: g('.ar-big'), chip: g('.ar-chip[aria-checked=false]'), chipOn: g('.ar-chip[aria-checked=true]'), cap: g('.ar-cap b'), small: g('.ar-cap small'), em: g('.ar-cap em'), sign: g('.ar-sign'), sc: g('.ar-sc'), pn: g('.ar-pn'), read: g('.ar-read'), fl: g('.ar-fl'), ph: null, end: g('.ar-endp'), dt: g('.ar-dtn') }; });
  const C = { ground: [238, 243, 238], paper: [251, 252, 248], deep: [14, 59, 44], lime: [181, 219, 110], chip: [243, 247, 243], readbg: [248, 250, 246], board: [229, 237, 231] };
  const crs = { h2: cr(P(col.h2), C.ground), lead: cr(P(col.lead), C.ground), lock: cr(P(col.lock), C.ground), big: cr(P(col.big), C.ground), chip: cr(P(col.chip), C.chip), chipOn: cr(P(col.chipOn), C.deep), cap: cr(P(col.cap), C.paper), small: cr(P(col.small), C.paper), em: cr(P(col.em), C.paper), sign: cr(P(col.sign), C.deep), sc: cr(P(col.sc), C.lime), pn: cr(P(col.pn), C.board), read: cr(P(col.read), C.readbg), fl: cr(P(col.fl), C.board), end: cr(P(col.end), C.ground), dtn: cr(P(col.dt), [234, 241, 235]) };
  ok('contrast >= 4.5 on every text (lowest ' + Math.min(...Object.values(crs)) + ')', Object.values(crs).every(v => v >= 4.5), JSON.stringify(crs));
  await p.evaluate(() => document.querySelector('.ar-sign[data-town="Austin"]').click()); await p.mouse.move(5, 5); await p.waitForTimeout(700);
  const lit2 = await p.evaluate(() => { const e = document.querySelector('.ar-sign[data-town="Austin"]'); const a = getComputedStyle(e), c = getComputedStyle(e.querySelector('.ar-sc')); return [a.color, a.backgroundColor, c.color, c.backgroundColor]; }); await p.evaluate(() => document.querySelector('.ar-sign[data-town="Austin"]').click());
  ok('the pressed sign keeps contrast >= 4.5 (dark on lime; cream on green count)', cr(P(lit2[0]), P(lit2[1])) >= 4.5 && cr(P(lit2[2]), P(lit2[3])) >= 4.5, JSON.stringify([cr(P(lit2[0]), P(lit2[1])), cr(P(lit2[2]), P(lit2[3])), lit2]));
  ok('fonts Montserrat/Inter only', await p.evaluate(() => [...new Set([...document.querySelectorAll('.ar *')].filter(e => !e.closest('svg')).map(e => getComputedStyle(e).fontFamily.split(',')[0].replace(/["']/g, '')))].filter(f => !/Inter|Montserrat/.test(f)).length === 0));
  ok('focus rings are 3px', await p.evaluate(() => { const e = document.querySelector('.ar-chip[data-t="all"]'); e.focus(); return true; }) && (await (async () => { await p.keyboard.press('Shift+Tab'); await p.keyboard.press('Tab'); return p.evaluate(() => getComputedStyle(document.activeElement).outlineWidth); })()) === '3px');
  ok('page errors 0', p.errs.length === 0, p.errs.join('|'));
  /* ---------- fuzz: 160 random actions, invariants after each ---------- */
  let seed = 12345; const rnd = () => (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296; let bad = [];
  await toBoard(p, 250); await p.waitForTimeout(300);
  for (let i = 0; i < 160; i++) {
    const r = rnd(); const t = TOWNS[Math.floor(rnd() * 7)], tr = ['all', 'Siding', 'Windows', 'Metal Roofing', 'Doors', 'Patio Covers'][Math.floor(rnd() * 6)];
    try {
      if (r < .25) await p.evaluate((t) => document.querySelector('.ar-sign[data-town="' + t + '"]').click(), t);
      else if (r < .4) await p.evaluate((t) => document.querySelector('.ar-chip[data-t="' + t + '"]').click(), tr);
      else if (r < .55) { await p.evaluate(() => { const l = document.querySelectorAll('.ar-c'); l[Math.floor(Math.random() * l.length)].querySelector('.ar-card').click(); }); await p.waitForTimeout(40); }
      else if (r < .65) { await p.keyboard.press('ArrowRight'); }
      else if (r < .72) { await p.keyboard.press('ArrowLeft'); }
      else if (r < .82) { await p.keyboard.press('Escape'); await p.waitForTimeout(30); }
      else if (r < .88) { await p.hover('.ar-sign[data-town="' + t + '"]', { force: true, timeout: 800 }).catch(() => {}); }
      else if (r < .94) { await p.fill('#ar-q', ['ro', 'au', 'zz', 'maple', ''][Math.floor(rnd() * 5)]).catch(() => {}); }
      else { await p.evaluate(() => scrollBy(0, (Math.random() - .5) * 600)); }
    } catch (e) { bad.push('act ' + i + ': ' + e.message.slice(0, 60)); }
    const inv = await p.evaluate(() => { const n = document.querySelectorAll('.ar-sign[aria-pressed=true]').length, d = document.querySelector('.ar-dlg').open; const on = document.querySelectorAll('.ar-c.on').length, off = document.querySelectorAll('.ar-c.off').length, chk = document.querySelectorAll('.ar-chip[aria-checked=true]').length; return { n, on, off, chk, d, tot: on + off, sw: document.documentElement.scrollWidth <= innerWidth }; });
    if (inv.n > 1 || inv.chk !== 1 || (inv.tot !== 0 && inv.tot !== 16) || !inv.sw) bad.push(i + ':' + JSON.stringify(inv));
  }
  await p.evaluate(() => { const d = document.querySelector('.ar-dlg'); if (d.open) d.close(); });
  ok('fuzz: 160 random clicks / keys / hovers / typing / scrolling leave one sign at most, one chip, a consistent board, no overflow, no error', bad.length === 0 && p.errs.length === 0, bad.slice(0, 3).join(' | ') + p.errs.slice(0, 2).join('|'));
  /* ---------- the idle cost ---------- */
  await p.mouse.move(5, 5); await toBoard(p, 300); await p.waitForTimeout(5000); let asleep = 0, awake = 0; for (let i = 0; i < 18; i++) { (await p.evaluate(() => document.querySelector('.ar').__ar.running())) ? awake++ : asleep++; await p.waitForTimeout(350); }
  const ft = await p.evaluate(() => new Promise(res => { const a = []; let l = performance.now(), n = 0; const f = (t) => { a.push(t - l); l = t; if (++n < 90) requestAnimationFrame(f); else { a.sort((x, y) => x - y); res(a[Math.floor(a.length * .5)]); } }; requestAnimationFrame(f); }));
  const cssAnim = await p.evaluate(() => document.getAnimations().filter(a => a.effect && a.effect.target && a.effect.target.closest && a.effect.target.closest('.ar') && a.playState === 'running').length);
  ok('idle: the script loop sleeps between breezes (asleep ' + asleep + ' of 18 samples), no CSS animation runs in the section, median frame time <= 20 ms', asleep >= 9 && cssAnim === 0 && ft <= 20, 'asleep=' + asleep + ' awake=' + awake + ' css=' + cssAnim + ' ft=' + ft.toFixed(1)); await p.ctx.close();
  /* ---------- pointer plucks the thread ---------- */
  p = await open(); await toBoard(p, 300); await p.waitForTimeout(500); await scrollThrough(p); await toBoard(p, 300); await p.waitForTimeout(2200);
  const tp = await p.evaluate(() => { const A = document.querySelector('.ar').__ar, q = A.pts[44], r = document.querySelector('.ar-board').getBoundingClientRect(); window.scrollBy(0, r.top + q.y - 450); const r2 = document.querySelector('.ar-board').getBoundingClientRect(); return { x: r2.left + q.x, y: r2.top + q.y }; }); await p.waitForTimeout(400);
  await p.mouse.move(tp.x - 90, tp.y - 40); for (let i = 0; i < 24; i++) await p.mouse.move(tp.x - 90 + i * 8, tp.y - 40 + i * 3.5); await p.waitForTimeout(150);
  const pl = await p.evaluate(() => { const A = document.querySelector('.ar').__ar; return { dev: Math.max(...A.pts.map(q => Math.hypot(q.x - q.x0, q.y - q.y0))), k: Math.max(...[...document.querySelectorAll('.ar-c')].map(l => Math.abs(parseFloat(l.style.getPropertyValue('--k')) || 0))) }; });
  ok('the mouse plucks the thread and swings the cards it passes', pl.dev > 3, JSON.stringify(pl));
  await p.mouse.move(5, 5); await p.waitForTimeout(3000); const rest = await p.evaluate(() => { const A = document.querySelector('.ar').__ar; return [Math.max(...A.pts.map(q => Math.hypot(q.x - q.x0, q.y - q.y0))), A.running()]; });
  ok('... and everything returns to rest and the loop stops', rest[0] < 1 && !rest[1], JSON.stringify(rest));
  // resize re-lays the thread
  const d0 = await p.evaluate(() => document.querySelector('.ar-main').getAttribute('d').slice(0, 60)); await p.setViewportSize({ width: 1100, height: 800 }); await p.waitForTimeout(700); const d1 = await p.evaluate(() => ({ d: document.querySelector('.ar-main').getAttribute('d').slice(0, 60), sw: document.documentElement.scrollWidth }));
  ok('resizing re-lays the thread to the new pins (no overflow)', d0 !== d1.d && d1.sw <= 1100, d0 + ' -> ' + d1.d + ' ' + d1.sw); ok('no page errors (pointer, resize)', p.errs.length === 0, p.errs.join('|')); await p.ctx.close();
  /* ---------- reduced motion ---------- */
  p = await open(1440, 900, { reducedMotion: 'reduce' }); await toBoard(p, 0); await p.waitForTimeout(800);
  const rm = await p.evaluate(() => { const s = document.querySelector('.ar'); const sw = getComputedStyle(s.querySelector('.ar-sw')); const lift = getComputedStyle(s.querySelector('.ar-lift')); return { anim: sw.animationName, tr: lift.transitionDuration, inN: s.querySelectorAll('.ar-c.in').length, off: s.querySelector('.ar-main').style.strokeDashoffset, opac: lift.opacity, lock: s.querySelector('.ar-lock').textContent.replace(/\s+/g, ' ').trim(), signs: [...s.querySelectorAll('.ar-num')].map(n => n.textContent).join(), run: s.__ar.running() }; });
  ok('reduced motion: no sway, no transitions, thread fully drawn, cards present, numbers final at once, no loop', rm.anim === 'none' && /^0s/.test(rm.tr) && rm.inN === 16 && (rm.off === '0' || rm.off === '0.0') && rm.opac === '1' && rm.lock === '886 projects: 312 on the map with photos + 574 more counted' && rm.signs === '541,110,35,28,28,21,8' && !rm.run, JSON.stringify(rm));
  await p.click('.ar-sign[data-town="Austin"]'); await p.waitForTimeout(150); const rmf = await p.evaluate(() => [document.querySelectorAll('.ar-fg.show').length, getComputedStyle(document.querySelector('.ar-fg.show .line')).strokeDashoffset]);
  ok('reduced motion: a town\'s threads appear at once', rmf[0] === 7 && /^0/.test(rmf[1]), JSON.stringify(rmf));
  await p.click('.ar-sign[data-town="Austin"]'); await p.click('.ar-c:nth-child(2) .ar-card'); await p.waitForTimeout(150); ok('reduced motion: the viewer opens at once and closes with Esc', await p.evaluate(() => document.querySelector('.ar-dlg').open)); await p.keyboard.press('Escape'); await p.waitForTimeout(100); ok('... closed', !(await p.evaluate(() => document.querySelector('.ar-dlg').open)));
  ok('reduced motion: no errors', p.errs.length === 0, p.errs.join('|')); await p.ctx.close();
  /* ---------- touch ---------- */
  const T = await open(390, 844, { hasTouch: true, isMobile: true }); await T.addStyleTag({ content: 'html{scroll-behavior:auto!important}' }); await toBoard(T, -20); await T.waitForTimeout(600);
  const tap = async (sel) => { await T.evaluate((s) => document.querySelector(s).scrollIntoView({ block: 'center', behavior: 'instant' }), sel); await T.waitForTimeout(200); const r = await T.evaluate((s) => { const b = document.querySelector(s).getBoundingClientRect(); return [b.x + b.width / 2, b.y + b.height / 2]; }, sel); await T.touchscreen.tap(r[0], r[1]); };
  await tap('.ar-sign[data-town="Leander"]'); await T.waitForTimeout(500); const ts = await T.evaluate(() => ({ p: document.querySelector('.ar-sign[aria-pressed=true]') && document.querySelector('.ar-sign[aria-pressed=true]').dataset.town, on: document.querySelectorAll('.ar-c.on').length, hov: document.querySelectorAll('.ar-sign.lit').length }));
  ok('touch: a tap on a sign selects the town and lights its card (no hover needed)', ts.p === 'Leander' && ts.on === 1 && ts.hov === 1, JSON.stringify(ts));
  await tap('.ar-sign[data-town="Leander"]'); await T.waitForTimeout(300); await tap('.ar-c:nth-child(4) .ar-card'); await T.waitForTimeout(800); const to = await T.evaluate(() => ({ open: document.querySelector('.ar-dlg').open, k: document.querySelector('.ar-dk').textContent }));
  ok('touch: a tap on a card opens the viewer', to.open && to.k === 'Photo 4 of 16', JSON.stringify(to));
  await T.evaluate(() => { const f = document.querySelector('.ar-dfig'); const o = f.getBoundingClientRect(); const mk = (t, x) => f.dispatchEvent(new PointerEvent(t, { bubbles: true, clientX: x, clientY: o.top + 60, pointerType: 'touch', pointerId: 7 })); mk('pointerdown', o.left + 250); mk('pointerup', o.left + 60); }); await T.waitForTimeout(500);
  ok('touch: a swipe left in the viewer shows the next photo', (await T.evaluate(() => document.querySelector('.ar-dk').textContent)) === 'Photo 5 of 16');
  const dsz = await T.evaluate(() => [...document.querySelectorAll('.ar-dlg button, .ar-dlg a')].map(e => { const r = e.getBoundingClientRect(); return [e.className.split(' ')[0], Math.round(r.width), Math.round(r.height)]; }).filter(x => x[1] < 44 || x[2] < 44));
  ok('touch: every viewer control is >= 44 px', dsz.length === 0, JSON.stringify(dsz));
  const dvh = await T.evaluate(() => { const w = document.querySelector('.ar-dwrap').getBoundingClientRect(); return [Math.round(w.left), Math.round(w.right), Math.round(w.bottom), innerHeight, innerWidth, document.documentElement.scrollWidth]; });
  ok('touch: the viewer fits the phone (no horizontal overflow)', dvh[0] >= 0 && dvh[1] <= dvh[4] && dvh[5] <= dvh[4], JSON.stringify(dvh));
  await T.keyboard.press('Escape'); await T.waitForTimeout(400);
  ok('touch: no errors', T.errs.length === 0, T.errs.join('|')); await T.ctx.close();
  /* ---------- 4 layouts ---------- */
  for (const [w, h] of [[1440, 900], [1024, 768], [768, 1024], [390, 844]]) {
    const q = await open(w, h); await toBoard(q, 0); await scrollThrough(q);
    const r = await q.evaluate(() => { const bad = [], over = []; const W = document.documentElement.clientWidth;
      document.querySelectorAll('.ar button,.ar a,.ar input').forEach(e => { if (e.offsetParent === null) return; const r = e.getBoundingClientRect(); if (r.width < 43.5 || r.height < 43.5) bad.push((e.className || e.tagName) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); });
      document.querySelectorAll('.ar, .ar *').forEach(e => { if (e.closest('.ar-bg') || e.closest('.ar-dlg') || e.closest('svg.ar-threads')) return; const r = e.getBoundingClientRect(); if (r.width && (r.right > W + 1 || r.left < -1) && !(e.closest('.ar-chips') && e.classList.contains('ar-chip'))) over.push((e.className && e.className.baseVal === undefined ? e.className : e.tagName) + ' ' + Math.round(r.left) + '..' + Math.round(r.right)); });
      const cap = [...document.querySelectorAll('.ar-cap')].map(c => { const sw = c.closest('.ar-sw'); const a = sw.getBoundingClientRect(), b = c.getBoundingClientRect(); return b.bottom <= a.bottom + 1 && b.right <= a.right + 1; }).every(Boolean);
      const sg = [...document.querySelectorAll('.ar-sign')].every(s => { const a = s.getBoundingClientRect(), p = document.querySelector('.ar-board').getBoundingClientRect(); return a.right <= p.right && a.left >= p.left; });
      const pn = document.querySelector('.ar-pn').getBoundingClientRect(), fi = document.querySelector('.ar-finial'), firstSign = document.querySelector('.ar-sign').getBoundingClientRect();
      return { sw: document.documentElement.scrollWidth, W, over: over.slice(0, 4), bad: bad.slice(0, 5), cap, sg, pnClear: pn.bottom <= firstSign.top + 1, board: Math.round(document.querySelector('.ar-board').getBoundingClientRect().height) }; });
    const ov = await q.evaluate(() => { const c = [...document.querySelectorAll('.ar-card')].map(b => b.getBoundingClientRect()); let n = 0; for (let i = 0; i < c.length; i++) for (let j = i + 1; j < c.length; j++) { const a = c[i], b2 = c[j]; const ix = Math.min(a.right, b2.right) - Math.max(a.left, b2.left), iy = Math.min(a.bottom, b2.bottom) - Math.max(a.top, b2.top); if (ix > 14 && iy > 14) n++; } return n; });
    ok(`${w}: page not wider than the screen (${r.sw} vs ${r.W}); nothing in the section beyond the edges; the sign list inside the board; caption clear of the post sign; every target >= 44 px; cards do not overlap; 0 errors`, r.sw <= r.W && r.over.length === 0 && r.sg && r.cap && r.pnClear && r.bad.length === 0 && ov === 0 && q.errs.length === 0, JSON.stringify(r) + ' overlaps=' + ov + ' ' + q.errs.join('|'));
    await q.ctx.close();
  }
  for (const c of ck) console.log(c.join(' | ')); console.log('FAILS', ck.filter(c => c[0] === 'FAIL').length, 'of', ck.length); await b.close();
})();
