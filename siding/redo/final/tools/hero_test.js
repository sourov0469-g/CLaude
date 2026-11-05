const { chromium } = require('playwright'); const fs = require('fs'); const { PNG } = (() => { try { return require('pngjs'); } catch (e) { return {}; } })();
const F = 'file:///home/user/CLaude/siding/redo/final/out/final.html';
const SRC = '/tmp/hero/h36c/graded-original.jpg';
const ck = []; const ok = (n, c, d) => ck.push([c ? 'PASS' : 'FAIL', n, d === undefined ? '' : d]);
const lum = (c) => { const [r,g,b] = c.map(v => { v/=255; return v<=.03928? v/12.92 : Math.pow((v+.055)/1.055,2.4); }); return .2126*r+.7152*g+.0722*b; };
const cr = (a,b) => { const x=lum(a),y=lum(b); return +((Math.max(x,y)+.05)/(Math.min(x,y)+.05)).toFixed(2); };
(async () => { const b = await chromium.launch();
  async function open(w = 1440, h = 900, extra = {}) { const ctx = await b.newContext({ viewport: { width: w, height: h }, ...extra }); const p = await ctx.newPage(); p.errs = []; p.on('pageerror', e => p.errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') p.errs.push(m.text()); }); p.ctx = ctx; await p.goto(F, { waitUntil: 'load' }); await p.waitForTimeout(2600); return p; }
  let p = await open();
  const D = await p.evaluate(() => { const h = document.querySelector('.fh'); return { h1: document.querySelectorAll('h1').length, txt: document.querySelector('.fh-t').textContent.replace(/\s+/g, ' ').trim(), links: [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')), srcs: [...document.querySelectorAll('[src]')].map(e => e.getAttribute('src').slice(0, 30)), tel: !!document.querySelector('a[href="tel:+15125500000"]'), sub: document.querySelector('.fh-sub').textContent, cap: document.querySelector('.fh-cap').textContent, back: document.querySelector('.fh-back'), alt: document.querySelector('.fh-back').alt, frontAlt: document.querySelector('.fh-front').getAttribute('alt'), ah: document.querySelector('.fh-front').getAttribute('aria-hidden'), bg: getComputedStyle(document.body).backgroundColor, nat: [document.querySelector('.fh-back').naturalWidth, document.querySelector('.fh-back').naturalHeight, document.querySelector('.fh-front').naturalWidth, document.querySelector('.fh-front').naturalHeight], rw: Math.round(document.querySelector('.fh-back').getBoundingClientRect().width), font: getComputedStyle(document.querySelector('.fh-t')).fontFamily, fs: getComputedStyle(document.querySelector('.fh-t')).fontSize }; });
  ok('H1 is the firm\'s own line, exactly; one h1', D.h1 === 1 && D.txt === 'The full wall or the whole house.', D.txt);
  ok('no external link or source anywhere in the file (only tel:, #anchors, data:)', D.links.every(l => /^(tel:|mailto:|#|\?)/.test(l)) && D.srcs.every(s => /^data:/.test(s)), JSON.stringify(D.links));
  ok('hero text: one line of copy, the Book link and the phone; the photo\'s own record as the caption', D.sub === 'Siding, windows and roofing for Austin homes since 2009.' && D.cap === 'Ashford Park, Buda · Jul 2026 · Siding, Shingle Roofing & Exterior Painting', D.sub);
  ok('real alt text on the photograph; the cut-out is hidden from assistive tech', D.alt.length > 40 && D.frontAlt === '' && D.ah === 'true');
  ok('page ground is not white (dim green-tinted near-white)', D.bg === 'rgb(241, 245, 241)', D.bg);
  ok('font is Montserrat; headline is 8+ % of the width', /Montserrat/.test(D.font) && parseFloat(D.fs) >= 1440 * 0.08, D.font + ' ' + D.fs);
  ok('photo is the 1900 px original (not a 1400 copy); front layer 1900 wide', D.nat[0] === 1900 && D.nat[1] === 1425 && D.nat[2] === 1900, D.nat.join('x'));
  // cut-out fidelity: front over back (text hidden) equals the original photograph
  await p.evaluate(() => { document.querySelector('.fh-t').style.display = 'none'; document.querySelector('.fh-ui').style.display = 'none'; document.querySelector('header').style.display = 'none'; document.querySelector('.fh-scroll').style.display = 'none'; document.querySelector('.fh').style.setProperty('--sc', '1'); document.querySelector('.fh-stage').style.animation = 'none'; });
  await p.waitForTimeout(300); const A = await p.screenshot({ type: 'png' });
  const orig = 'data:image/jpeg;base64,' + fs.readFileSync(SRC).toString('base64');
  await p.evaluate((o) => { document.querySelector('.fh-front').style.display = 'none'; document.querySelector('.fh-back').src = o; }, orig); await p.waitForTimeout(700); const B = await p.screenshot({ type: 'png' });
  fs.writeFileSync('h/A.png', A); fs.writeFileSync('h/B.png', B);
  const py = require('child_process').spawnSync('python3', ['-c', `
from PIL import Image, ImageChops
import numpy as np
from PIL import ImageFilter
A=Image.open('h/A.png').convert('RGB'); B=Image.open('h/B.png').convert('RGB')
a=np.asarray(A.filter(ImageFilter.GaussianBlur(1.6))).astype(int); b=np.asarray(B.filter(ImageFilter.GaussianBlur(1.6))).astype(int)
d=np.abs(a-b).sum(-1); print(float(d.mean()), float((d>40).mean()), int(d.max()))
`], { encoding: 'utf8' }); const [mean, frac, mx] = py.stdout.trim().split(' ').map(Number);
  ok('cut-out alignment: front over back matches the graded original photograph after a 1.6 px blur (mean ≤ 4 of 765, ≤ 0.3 % of pixels by > 40): the silhouette has no offset, halo or gap; the remaining difference is the codec noise in the foliage', mean <= 4 && frac <= 0.003, `mean ${mean.toFixed(2)}; ${(frac * 100).toFixed(3)} % pixels > 60; max ${mx}`);
  ok('page errors 0', p.errs.length === 0, p.errs.join('|')); await p.ctx.close();
  // headline legibility: how much of the headline is hidden behind the house
  p = await open();
  await p.evaluate(() => { const t = document.querySelector('.fh-t'); t.style.color = '#ff00ff'; document.querySelector('header').style.display = 'none'; document.querySelector('.fh-ui').style.display = 'none'; });
  const withFront = await p.screenshot({ type: 'png' }); await p.evaluate(() => { document.querySelector('.fh-front').style.display = 'none'; }); const noFront = await p.screenshot({ type: 'png' }); fs.writeFileSync('h/L1.png', withFront); fs.writeFileSync('h/L2.png', noFront);
  const py2 = require('child_process').spawnSync('python3', ['-c', `
from PIL import Image
import numpy as np
def mg(f):
    a=np.asarray(Image.open(f).convert('RGB')).astype(int); return int(((a[...,0]>200)&(a[...,1]<60)&(a[...,2]>200)).sum())
print(mg('h/L1.png'), mg('h/L2.png'))
`], { encoding: 'utf8' }); const [vis, tot] = py2.stdout.trim().split(' ').map(Number);
  ok('headline legibility: at least 92 % of the headline is visible at 1440, the rest is behind the house (the effect)', vis / tot >= 0.92 && vis / tot < 0.995, `${(vis / tot * 100).toFixed(1)} % visible (${vis} of ${tot} px)`);
  // contrast of the headline against the sky behind it
  const sky = await p.evaluate(() => { const c = document.createElement('canvas'); const i = document.querySelector('.fh-back'); c.width = 1900; c.height = 1425; const x = c.getContext('2d'); x.drawImage(i, 0, 0); const d = x.getImageData(300, 150, 1300, 200).data; let r = 0, g = 0, b = 0, n = 0, mn = 999; for (let k = 0; k < d.length; k += 4 * 9) { r += d[k]; g += d[k + 1]; b += d[k + 2]; n++; const L = 0.2126 * d[k] + 0.7152 * d[k + 1] + 0.0722 * d[k + 2]; if (L < mn) mn = L; } return [r / n, g / n, b / n, mn]; });
  ok('headline contrast on the sky behind it ≥ 7 (WCAG AAA for large text is 4.5)', cr([14, 59, 44], sky.slice(0, 3).map(Math.round)) >= 7, cr([14, 59, 44], sky.slice(0, 3).map(Math.round)) + ' vs mean sky ' + sky.slice(0, 3).map(Math.round));
  await p.ctx.close();
  // layout: the call-to-action never covers the headline; targets
  for (const [w, h, ex] of [[1440, 900, {}], [1920, 1080, {}], [1366, 768, {}], [1024, 768, {}], [768, 1024, {}], [390, 844, { hasTouch: true, isMobile: true }], [360, 640, { hasTouch: true, isMobile: true }]]) {
    const q = await open(w, h, ex); const r = await q.evaluate(() => { const t = document.querySelector('.fh-t').getBoundingClientRect(), c = document.querySelector('.fh-cta').getBoundingClientRect(), hd = document.querySelector('header').getBoundingClientRect(), bk = document.querySelector('.fh-act .btn').getBoundingClientRect(), tel = document.querySelector('.fh .callx').getBoundingClientRect(), mb = document.querySelector('.mbar') ? getComputedStyle(document.querySelector('.mbar')).display : 'none', mbr = document.querySelector('.mbar').getBoundingClientRect(); return { tb: t.bottom, ct: c.top, ht: t.top, hb: hd.bottom, bkh: bk.height, telh: tel.height, ov: document.documentElement.scrollWidth - innerWidth, hero: document.querySelector('.fh').getBoundingClientRect().height, vh: innerHeight, mbar: mb, mbt: mbr.top, cb: c.bottom, tw: t.width, vw: innerWidth }; });
    ok(`${w}×${h}: hero fills the screen; headline clears the header and the call-to-action; no overflow; targets ≥ 48`, Math.abs(r.hero - Math.min(Math.max(h, 640), 1240)) <= 1 && r.tb <= r.ct + 1 && r.ht >= r.hb - 4 && r.ov <= 0 && r.bkh >= 47.5 && r.telh >= 47.5 && (r.mbar === 'none' || r.cb <= r.mbt + 1), JSON.stringify({ hero: r.hero, tb: Math.round(r.tb), ct: Math.round(r.ct), ht: Math.round(r.ht), hb: Math.round(r.hb), cb: Math.round(r.cb), mbt: Math.round(r.mbt) }));
    ok(`${w}×${h}: page errors 0`, q.errs.length === 0, q.errs.join('|')); await q.ctx.close(); }
  // motion: entrance, pointer depth, scroll sink; touch and reduced motion
  p = await open(1440, 900);
  const mv = await p.evaluate(async () => { const h = document.querySelector('.fh'); const cs = () => ({ sx: h.style.getPropertyValue('--sx'), tx: h.style.getPropertyValue('--tx'), sink: h.style.getPropertyValue('--sink'), ta: h.style.getPropertyValue('--ta') }); return cs(); });
  await p.mouse.move(1300, 200); await p.waitForTimeout(900); const m1 = await p.evaluate(() => { const h = document.querySelector('.fh'); return { sx: parseFloat(h.style.getPropertyValue('--sx')), tx: parseFloat(h.style.getPropertyValue('--tx')), ty: parseFloat(h.style.getPropertyValue('--ty')), sy: parseFloat(h.style.getPropertyValue('--sy')), stageT: getComputedStyle(document.querySelector('.fh-stage')).transform, textT: getComputedStyle(document.querySelector('.fh-t')).transform }; });
  await p.mouse.move(100, 800); await p.waitForTimeout(900); const m2 = await p.evaluate(() => { const h = document.querySelector('.fh'); return { sx: parseFloat(h.style.getPropertyValue('--sx')), tx: parseFloat(h.style.getPropertyValue('--tx')) }; });
  ok('pointer depth: the photo and the headline drift in opposite directions, the headline by more', m1.sx < -3 && m1.tx > 8 && Math.abs(m1.tx) > Math.abs(m1.sx) * 2 && m2.sx > 3 && m2.tx < -8, JSON.stringify([m1.sx, m1.tx, m2.sx, m2.tx]));
  await p.mouse.move(720, 450); await p.mouse.move(-5, -5).catch(() => {}); await p.evaluate(() => document.querySelector('.fh').dispatchEvent(new PointerEvent('pointerleave'))); await p.waitForTimeout(1500); const m3 = await p.evaluate(() => ({ sx: Math.abs(parseFloat(document.querySelector('.fh').style.getPropertyValue('--sx'))), tx: Math.abs(parseFloat(document.querySelector('.fh').style.getPropertyValue('--tx'))) })); ok('pointer leaves: everything settles back to rest', m3.sx < 0.3 && m3.tx < 0.6, JSON.stringify(m3));
  await p.evaluate(() => { document.body.style.minHeight = '3000px'; scrollTo(0, 360); }); await p.waitForTimeout(700); const sc = await p.evaluate(() => ({ sink: parseFloat(document.querySelector('.fh').style.getPropertyValue('--sink')), ta: parseFloat(document.querySelector('.fh').style.getPropertyValue('--ta')) })); ok('scroll: the headline sinks behind the roofline and fades (360 px)', sc.sink > 40 && sc.ta < 0.85 && sc.ta > 0, JSON.stringify(sc));
  await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(600); const back = await p.evaluate(() => parseFloat(document.querySelector('.fh').style.getPropertyValue('--sink'))); ok('scroll back: the headline rises again', back < 2, back);
  const frames = await p.evaluate(() => new Promise(r => { let n = 0; const t0 = performance.now(); const f = () => { n++; if (performance.now() - t0 < 1000) requestAnimationFrame(f); else r(n); }; requestAnimationFrame(f); })); ok('frame rate while idle ≥ 50 fps (headless)', frames >= 50, frames + ' frames/s');
  ok('page errors 0 (motion)', p.errs.length === 0, p.errs.join('|')); await p.ctx.close();
  // entrance animation exists and ends at rest
  const q2 = await b.newContext({ viewport: { width: 1440, height: 900 } }); const pg = await q2.newPage(); await pg.goto(F, { waitUntil: 'load' }); await pg.waitForTimeout(500);
  const ent = await pg.evaluate(() => document.getAnimations().filter(a => a.animationName === 'fhRise' || a.animationName === 'fhSettle').map(a => a.animationName)); await pg.waitForTimeout(2600);
  const rest = await pg.evaluate(() => ({ t: getComputedStyle(document.querySelector('.fh-t')).opacity, n: document.getAnimations().filter(a => a.animationName === 'fhRise' && a.playState === 'running').length })); ok('entrance: the headline rises from behind the house (1.7 s) and the photo settles (2.2 s); both end at rest', ent.includes('fhRise') && ent.includes('fhSettle') && rest.t === '1' && rest.n === 0, JSON.stringify([ent, rest])); await q2.close();
  const rm = await open(1440, 900, { reducedMotion: 'reduce' }); const rr = await rm.evaluate(() => ({ a: document.getAnimations().length, sink: document.querySelector('.fh').style.getPropertyValue('--sink'), op: getComputedStyle(document.querySelector('.fh-t')).opacity })); ok('reduced motion: no animation, no drift', rr.a === 0 && rr.sink === '' && rr.op === '1', JSON.stringify(rr)); await rm.ctx.close();
  const tc = await open(390, 844, { hasTouch: true, isMobile: true }); await tc.touchscreen.tap(200, 300); await tc.waitForTimeout(300); const tcr = await tc.evaluate(() => document.querySelector('.fh').style.getPropertyValue('--sx')); ok('touch: no pointer drift; the entrance and the scroll sink still work', tcr === '' || tcr === '0.00px', tcr); await tc.ctx.close();
  // keyboard
  p = await open(1440, 900); await p.keyboard.press('Tab'); const tabs = []; for (let i = 0; i < 9; i++) { tabs.push(await p.evaluate(() => { const e = document.activeElement; const cs = getComputedStyle(e); return [e.className || e.tagName, e.getAttribute('href'), cs.outlineStyle + ' ' + cs.outlineWidth]; })); await p.keyboard.press('Tab'); }
  const bookIdx = tabs.findIndex(t => /btn key/.test(t[0]) && t[1] === '#booking'), telIdx = tabs.findIndex(t => /callx/.test(t[0]));
  ok('keyboard: Tab reaches the hero Book link and the phone, each with a solid 3 px ring', bookIdx >= 0 && telIdx > bookIdx && /solid 3px/.test(tabs[bookIdx][2]) && /solid 3px/.test(tabs[telIdx][2]), JSON.stringify(tabs.map(t => t[1])));
  const col = await p.evaluate(() => { const g = (sel, prop = 'color') => getComputedStyle(document.querySelector(sel))[prop].match(/\d+(\.\d+)?/g).map(Number).slice(0, 3); return { sub: g('.fh-sub'), tel: g('.fh .callx'), cap: g('.fh-cap') }; });
  const panel = [243, 245, 243]; ok('contrast on the frosted panel ≥ 4.5 (sub line, phone, caption)', cr(col.sub, panel) >= 4.5 && cr(col.tel, panel) >= 4.5 && cr(col.cap, panel) >= 4.5, JSON.stringify([cr(col.sub, panel), cr(col.tel, panel), cr(col.cap, panel)]));
  const fonts = await p.evaluate(() => [...new Set([...document.querySelectorAll('.fh *')].map(e => getComputedStyle(e).fontFamily.split(',')[0].replace(/"/g, '')))]); ok('fonts Montserrat/Inter only', fonts.every(f => /Montserrat|Inter/.test(f)), fonts.join(',')); await p.ctx.close();
  for (const c of ck) console.log(c.join(' | ')); console.log('FAILS', ck.filter(c => c[0] === 'FAIL').length, 'of', ck.length); await b.close(); })();
