// Stage 1 reconnaissance for one reference: node recon.js <slug> <url> [scrollSteps]
// Hooks getContext and requestAnimationFrame before the page's own scripts run, so it can say what renders, how, and whether
// it animates at rest. Records loaded scripts (by URL and size), known globals, fonts, fixed/sticky elements, a custom cursor if any,
// and a frame sequence down the page. Output: siding/redo/evidence/<slug>/recon.json + frames/*.png
const {chromium} = require('playwright'); const fs = require('fs'); const path = require('path');
const [slug, url, stepsArg] = process.argv.slice(2); const STEPS = +(stepsArg || 14);
const OUT = path.join(__dirname, '..', 'evidence', slug); fs.mkdirSync(path.join(OUT, 'frames'), {recursive: true});
(async () => {
  const b = await chromium.launch({args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required']});
  const ctx = await b.newContext({viewport: {width: 1440, height: 900}, userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'});
  const p = await ctx.newPage(); const net = []; const errs = [];
  p.on('response', async r => { try { const h = r.headers(); net.push({u: r.url().slice(0, 160), s: r.status(), t: r.request().resourceType(), n: +(h['content-length'] || 0)}); } catch (e) {} });
  p.on('pageerror', e => errs.push(e.message.slice(0, 120)));
  await p.addInitScript(() => {
    window.__rec = {ctx: [], raf: 0};
    const gc = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (t, ...a) { const r = gc.call(this, t, ...a); try { window.__rec.ctx.push({t, w: this.width, h: this.height, ok: !!r}); } catch (e) {} return r; };
    const raf = window.requestAnimationFrame.bind(window);
    window.requestAnimationFrame = f => { window.__rec.raf++; return raf(f); };
  });
  let status = 'ERR';
  try { const r = await p.goto(url, {waitUntil: 'domcontentloaded', timeout: 60000}); status = r ? r.status() : 'none'; } catch (e) { status = 'ERR ' + e.message.slice(0, 80); }
  await p.waitForTimeout(9000);
  await p.screenshot({path: path.join(OUT, 'frames', '00-load.png')});
  // animation at rest: rAF calls per second with no input, and canvas pixel change over 2 s
  const rest = await p.evaluate(async () => {
    const r0 = window.__rec.raf; await new Promise(r => setTimeout(r, 2000)); const rate = (window.__rec.raf - r0) / 2;
    return {rafPerSecAtRest: rate};
  });
  const shotA = await p.screenshot(); await p.waitForTimeout(1500); const shotB = await p.screenshot();
  const restChanged = Buffer.compare(shotA, shotB) !== 0;
  // pointer: move across the page, see which fixed elements follow (custom cursor) and whether the view changes
  await p.mouse.move(300, 300); await p.waitForTimeout(600);
  const before = await p.evaluate(() => [...document.querySelectorAll('body *')].filter(e => { const s = getComputedStyle(e); return s.position === 'fixed' && s.pointerEvents === 'none'; }).slice(0, 30).map(e => ({tag: e.tagName, cls: (typeof e.className === 'string' ? e.className : '').slice(0, 60), tr: getComputedStyle(e).transform, l: e.getBoundingClientRect().left, t: e.getBoundingClientRect().top})));
  const s1 = await p.screenshot(); await p.mouse.move(900, 500, {steps: 20}); await p.waitForTimeout(80); const s2 = await p.screenshot(); await p.waitForTimeout(800);
  const after = await p.evaluate(() => [...document.querySelectorAll('body *')].filter(e => { const s = getComputedStyle(e); return s.position === 'fixed' && s.pointerEvents === 'none'; }).slice(0, 30).map(e => ({tag: e.tagName, cls: (typeof e.className === 'string' ? e.className : '').slice(0, 60), tr: getComputedStyle(e).transform, l: e.getBoundingClientRect().left, t: e.getBoundingClientRect().top})));
  const followers = after.filter((a, i) => before[i] && (Math.abs(a.l - before[i].l) > 50 || a.tr !== before[i].tr)).map(a => a.cls || a.tag);
  const pointerChangesView = Buffer.compare(s1, s2) !== 0;
  await p.screenshot({path: path.join(OUT, 'frames', '01-pointer.png')});
  const info = await p.evaluate(() => {
    const g = n => { try { return typeof window[n] !== 'undefined'; } catch (e) { return false; } };
    const libs = ['THREE', 'gsap', 'ScrollTrigger', 'Lenis', 'lenis', 'LocomotiveScroll', 'barba', 'Swup', 'Webflow', 'PIXI', 'Matter', 'Splitting', 'SplitType', 'Lottie', 'lottie', 'bodymovin', 'Vue', '__NUXT__', '__NEXT_DATA__', 'React', 'Shopify', 'OGL', 'p5', 'anime', 'Motion', 'Framer', 'Swiper', 'Flickity', 'Rive', 'rive', 'Spline', 'ScrollSmoother'].filter(g);
    const html = document.documentElement;
    const sticky = [...document.querySelectorAll('body *')].filter(e => getComputedStyle(e).position === 'sticky').slice(0, 20).map(e => (e.tagName + '.' + (typeof e.className === 'string' ? e.className : '')).slice(0, 70));
    const pinSpacers = document.querySelectorAll('.pin-spacer').length;
    const fonts = [...new Set([...document.querySelectorAll('h1,h2,h3,p,a,button')].slice(0, 200).map(e => getComputedStyle(e).fontFamily.split(',')[0].trim()))].slice(0, 8);
    const canv = [...document.querySelectorAll('canvas')].map(c => ({w: c.width, h: c.height, cw: c.clientWidth, ch: c.clientHeight, pos: getComputedStyle(c).position, z: getComputedStyle(c).zIndex, cls: (c.className || '').toString().slice(0, 50)}));
    const vids = document.querySelectorAll('video').length;
    return {title: document.title, libs, htmlClass: html.className.slice(0, 160), bodyClass: document.body.className.slice(0, 160), scrollH: document.documentElement.scrollHeight, overflowY: getComputedStyle(document.body).overflowY, sticky, pinSpacers, fonts, canvases: canv, videos: vids, ctx: window.__rec.ctx.slice(0, 10), h1: [...document.querySelectorAll('h1,h2')].slice(0, 8).map(h => h.textContent.trim().replace(/\s+/g, ' ').slice(0, 80))};
  });
  // frame sequence: wheel-scroll down in viewport steps (wheel, so smooth-scroll libraries respond as they would to a person)
  const seq = [];
  for (let i = 1; i <= STEPS; i++) {
    await p.mouse.wheel(0, 650); await p.waitForTimeout(1100);
    const y = await p.evaluate(() => Math.round(window.scrollY || document.documentElement.scrollTop || (window.lenis && window.lenis.scroll) || 0));
    await p.screenshot({path: path.join(OUT, 'frames', `${String(i + 1).padStart(2, '0')}-scroll.png`)}); seq.push(y);
  }
  const scripts = net.filter(n => n.t === 'script').map(n => n.u);
  const bytes = net.reduce((a, n) => a + n.n, 0);
  const out = {slug, url, status, loadedAt: new Date().toISOString(), rest: {...rest, pixelsChangeAtRest: restChanged}, pointer: {followers, pointerChangesView}, ...info, scrollYSeq: seq,
    network: {requests: net.length, bytesDeclared: bytes, scripts, media: net.filter(n => ['image', 'media', 'font'].includes(n.t)).length, fetch: net.filter(n => ['fetch', 'xhr'].includes(n.t)).map(n => n.u).slice(0, 25)}, errors: errs.slice(0, 8)};
  fs.writeFileSync(path.join(OUT, 'recon.json'), JSON.stringify(out, null, 1));
  console.log(slug, status, '| libs', info.libs.join(','), '| ctx', JSON.stringify(info.ctx.map(c => c.t)), '| rAF/s at rest', rest.rafPerSecAtRest, '| pixels move at rest', restChanged, '| cursor followers', followers.length, '| pointer changes view', pointerChangesView, '| canvases', info.canvases.length, '| pins', info.pinSpacers, 'sticky', info.sticky.length, '| scripts', scripts.length, '| scrollY', seq.join(','));
  await b.close();
})();
