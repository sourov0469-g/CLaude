// usage: node probe.cjs <name> <url> <outdir> [maxFrames]
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const [name, url, out, maxF = '48', LIGHT] = process.argv.slice(2); const T0 = Date.now(); const stamp = (s) => console.log(name, '+' + Math.round((Date.now() - T0) / 1000) + 's', s); fs.mkdirSync(path.join(out, 'frames'), { recursive: true });
const log = (...a) => console.log(name, ...a);
(async () => {
  const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36' });
  const p = await ctx.newPage(); p.setDefaultTimeout(120000); const scripts = []; let cdp = null;
  const shot = async (o = {}) => { cdp = cdp || await ctx.newCDPSession(p); const { data } = await cdp.send('Page.captureScreenshot', { format: o.type === 'png' ? 'png' : 'jpeg', quality: o.type === 'png' ? undefined : (o.quality || 50) }); const buf = Buffer.from(data, 'base64'); if (o.path) fs.writeFileSync(o.path, buf); return buf; }; const consoleMsgs = [];
  p.on('response', async r => { try { const ct = r.headers()['content-type'] || ''; if (/javascript/.test(ct) || /\.m?js(\?|$)/.test(r.url())) { const t = await r.text(); scripts.push({ url: r.url(), size: t.length, text: t }); } } catch (e) {} });
  p.on('console', m => consoleMsgs.push(m.text().slice(0, 200)));
  await p.addInitScript(() => { window.__gl = 0; const o = HTMLCanvasElement.prototype.getContext; HTMLCanvasElement.prototype.getContext = function (t, ...a) { if (/webgl|webgpu/.test(t)) window.__gl++; return o.call(this, t, ...a); }; });
  try { await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 }); } catch (e) { log('goto', e.message.slice(0, 100)); }
  await p.waitForTimeout(9000);
  const title = await p.title(); const challenge = /just a moment|attention required|verify you are human|captcha/i.test(title + (await p.evaluate(() => document.body ? document.body.innerText.slice(0, 400) : '')));
  if (challenge) { log('BOT WALL: stopping, not bypassed'); fs.writeFileSync(path.join(out, 'digest.json'), JSON.stringify({ url, title, botWall: true }, null, 1)); await b.close(); return; }
  await shot({ path: path.join(out, 'frames', 'f000-load.jpg'), type: 'jpeg', quality: 55 });
  stamp('loaded');
  // ---- cursor probe at the first screen
  const cursorProbe = LIGHT ? await (async () => { await p.mouse.move(200, 200); await p.waitForTimeout(800); await shot({ path: path.join(out, 'frames', 'f001a-mouse-left.jpg') }); await p.mouse.move(1240, 700, { steps: 12 }); await p.waitForTimeout(800); await shot({ path: path.join(out, 'frames', 'f001b-mouse-right.jpg') }); return { light: true }; })() : await (async () => {
    const fixedBefore = await p.evaluate(() => [...document.querySelectorAll('body *')].filter(e => { const s = getComputedStyle(e); return (s.position === 'fixed' || s.position === 'absolute') && e.getBoundingClientRect().width < 160 && e.getBoundingClientRect().width > 2 && s.pointerEvents === 'none'; }).slice(0, 40).map((e, i) => { e.dataset.__p = i; const r = e.getBoundingClientRect(); return [i, r.x, r.y]; }));
    await p.mouse.move(200, 200); await p.waitForTimeout(600);
    const shotA = await shot({ type: 'png' });
    const pos1 = await p.evaluate(() => [...document.querySelectorAll('[data-__p]')].map(e => { const r = e.getBoundingClientRect(); return [+e.dataset.__p, Math.round(r.x + r.width / 2), Math.round(r.y + r.height / 2)]; }));
    await p.mouse.move(1100, 650, { steps: 2 }); const t0 = Date.now(); const trail = [];
    for (let i = 0; i < 40; i++) { trail.push([Date.now() - t0, await p.evaluate(() => [...document.querySelectorAll('[data-__p]')].map(e => { const r = e.getBoundingClientRect(); return [Math.round(r.x + r.width / 2), Math.round(r.y + r.height / 2)]; }))]); await p.waitForTimeout(16); }
    const shotB = await shot({ type: 'png' });
    await shot({ path: path.join(out, 'frames', 'f001-cursor-moved.jpg'), type: 'jpeg', quality: 55 });
    // which tracked elements followed the mouse?
    const followers = pos1.map(([id, x, y], k) => { const end = trail[trail.length - 1][1][k]; const moved = Math.hypot(end[0] - x, end[1] - y); const near = Math.hypot(end[0] - 1100, end[1] - 650) < 120; const t90 = trail.findIndex(([t, a]) => Math.hypot(a[k][0] - 1100, a[k][1] - 650) < 0.1 * Math.hypot(1100 - x, 650 - y)); return { id, moved: Math.round(moved), followsMouse: near && moved > 300, msTo90pct: t90 >= 0 ? trail[t90][0] : null }; }).filter(f => f.followsMouse);
    const diff = (A, B) => { let n = 0, t = 0; for (let i = 0; i < Math.min(A.length, B.length); i += 4000) { t++; if (A[i] !== B[i]) n++; } return +(n / t * 100).toFixed(1); };
    const cursorCss = await p.evaluate(() => [...new Set([...document.querySelectorAll('body, body *')].slice(0, 4000).map(e => getComputedStyle(e).cursor))]);
    return { followers, pixelChangePctAfterMouseMove: diff(shotA, shotB), cursorValuesSeen: cursorCss };
  })().catch(e => ({ error: e.message.slice(0, 120) }));
  log('cursor', JSON.stringify(cursorProbe).slice(0, 300));
  stamp('cursor done');
  const hover = LIGHT ? [] : await (async () => { const res = []; const els = await p.$$('a:visible, button:visible'); for (const el of els.slice(0, 8)) { try { const bb = await el.boundingBox(); if (!bb || bb.y > 880) continue;
    const before = await el.evaluate(e => { const s = getComputedStyle(e); return { t: s.transform, c: s.color, bg: s.backgroundColor, o: s.opacity, tr: s.transition.slice(0, 120), txt: e.innerText.trim().slice(0, 30) }; });
    await el.hover({ timeout: 2000 }); await p.waitForTimeout(500);
    const after = await el.evaluate(e => { const s = getComputedStyle(e); return { t: s.transform, c: s.color, bg: s.backgroundColor, o: s.opacity }; });
    const changed = Object.keys(after).filter(k => after[k] !== before[k]); res.push({ txt: before.txt, transition: before.tr, changed }); } catch (e) {} } return res; })();
  await p.mouse.move(720, 450);
  // ---- smoothing: one wheel tick, sample scroll position per frame
  const smooth = await (async () => { await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(800); await p.mouse.wheel(0, 300); const s = []; const t0 = Date.now(); for (let i = 0; i < 70; i++) { s.push([Date.now() - t0, await p.evaluate(() => Math.round(window.scrollY || (document.scrollingElement || {}).scrollTop || 0))]); await p.waitForTimeout(16); } return s; })();
  const fin = smooth[smooth.length - 1][1]; const t50 = (smooth.find(([t, y]) => y >= fin * 0.5) || [])[0], t95 = (smooth.find(([t, y]) => y >= fin * 0.95) || [])[0];
  log('smooth', 'final', fin, 't50', t50, 't95', t95);
  // ---- frame by frame scroll with real wheel input
  await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(1200);
  const steps = []; let lastY = -1, still = 0;
  for (let i = 0; i < +maxF; i++) {
    await p.mouse.wheel(0, 450); await p.waitForTimeout(700);
    const st = LIGHT ? await p.evaluate(() => ({ y: Math.round(window.scrollY), H: document.documentElement.scrollHeight, text: [...document.querySelectorAll('h1,h2,h3')].filter(e => { const r = e.getBoundingClientRect(); return r.top > 0 && r.top < innerHeight; }).slice(0, 2).map(e => e.innerText.trim().slice(0, 60)) })) : await p.evaluate(() => { const fx = [...document.querySelectorAll('body *')].filter(e => { const s = getComputedStyle(e); return (s.position === 'fixed' || s.position === 'sticky') && e.getBoundingClientRect().height > 200; }).length;
      const vids = [...document.querySelectorAll('video')].filter(v => { const r = v.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight; }).length;
      const cv = [...document.querySelectorAll('canvas')].filter(c => { const r = c.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight && r.width > 200; }).length;
      const h = [...document.querySelectorAll('h1,h2,h3,p')].filter(e => { const r = e.getBoundingClientRect(); return r.top > 0 && r.top < innerHeight && e.innerText.trim().length > 3; }).slice(0, 2).map(e => e.innerText.trim().slice(0, 60));
      return { y: Math.round(window.scrollY), H: document.documentElement.scrollHeight, bigFixedOrSticky: fx, videosInView: vids, bigCanvasInView: cv, text: h }; });
    st.i = i + 1; steps.push(st);
    await shot({ path: path.join(out, 'frames', `f${String(i + 2).padStart(3, '0')}.jpg`), type: 'jpeg', quality: 50 });
    if (st.y === lastY) { if (++still >= 3) break; } else still = 0; lastY = st.y;
  }
  stamp('frames done');
  // ---- code digest
  const g = await p.evaluate((LIGHT) => ({ gsap: !!window.gsap && (window.gsap.version || true), ScrollTrigger: !!window.ScrollTrigger, lenis: !!(window.lenis || window.Lenis || document.documentElement.classList.contains('lenis')), three: !!(window.THREE || window.__THREE__), threeRev: window.__THREE__ || null, webglContexts: window.__gl, canvases: document.querySelectorAll('canvas').length, videos: [...document.querySelectorAll('video')].map(v => (v.currentSrc || v.querySelector('source')?.src || '').split('/').pop().slice(0, 60)), clipPathEls: LIGHT ? null : [...document.querySelectorAll('*')].filter(e => getComputedStyle(e).clipPath !== 'none').length, sticky: LIGHT ? null : [...document.querySelectorAll('*')].filter(e => getComputedStyle(e).position === 'sticky').length, fixed: LIGHT ? null : [...document.querySelectorAll('*')].filter(e => getComputedStyle(e).position === 'fixed').length, fonts: [...new Set([...document.fonts].map(f => f.family.replace(/"/g, '')))].slice(0, 10) }), !!LIGHT);
  const all = scripts.map(s => s.text).join('\n');
  const pat = { lerp: /lerp\s*:\s*[\d.]+/g, duration: /duration\s*:\s*[\d.]+/g, ease: /ease\s*:\s*["'][\w.()]+["']/g, scrub: /scrub\s*:\s*[\w.]+/g, pin: /pin\s*:\s*(!0|true|[\w."#-]+)/g, wheelMultiplier: /wheelMultiplier\s*:\s*[\d.]+/g, smoothWheel: /smoothWheel\s*:\s*\w+/g, PerspectiveCamera: /PerspectiveCamera\([^)]{0,40}\)/g, fov: /fov\s*:\s*[\d.]+/g, raycaster: /Raycaster/g, mouse: /(mousemove|pointermove)/g, MeshPhysicalMaterial: /MeshPhysicalMaterial/g, ShaderMaterial: /ShaderMaterial|RawShaderMaterial/g, gltf: /GLTFLoader|\.glb/g, draco: /DRACOLoader|draco/gi, ktx2: /KTX2Loader|\.ktx2?/g, postprocessing: /EffectComposer|UnrealBloomPass|postprocessing/g, physics: /rapier|cannon|ammo\.js|oimo/gi, audio: /howler|AudioContext/gi, rive: /@rive-app|rive\.wasm/g, lottie: /lottie/gi, swiper: /swiper/gi, barba: /barba|taxi\.js|swup/gi, splittext: /SplitText|splitType|SplitType/g, scrollTrigger: /ScrollTrigger/g, lenisLib: /lenis/gi, webflow: /webflow/gi, nuxt: /__NUXT__|nuxt/g, astro: /astro/gi, react: /react-dom|__NEXT_DATA__|createRoot/g, svelte: /svelte/gi, vue: /\bVue\b|createApp/g };
  const codes = {}; for (const [k, re] of Object.entries(pat)) { const m = all.match(re) || []; const uniq = [...new Set(m)]; codes[k] = { count: m.length, examples: uniq.slice(0, 8) }; }
  const digest = { url, title, challenge: false, globals: g, scripts: scripts.map(s => ({ url: s.url.slice(0, 140), kb: Math.round(s.size / 1024) })).slice(0, 40), totalScriptKB: Math.round(scripts.reduce((a, s) => a + s.size, 0) / 1024), code: codes, cursor: cursorProbe, hover, smoothing: { samples: smooth.filter((_, i) => i % 3 === 0), finalY: fin, msTo50pct: t50, msTo95pct: t95 }, scrollSteps: steps, console: consoleMsgs.slice(0, 15) };
  fs.writeFileSync(path.join(out, 'digest.json'), JSON.stringify(digest, null, 1));
  fs.writeFileSync(path.join(out, 'bundle-index.txt'), scripts.map(s => s.url + '  ' + Math.round(s.size / 1024) + 'KB').join('\n'));
  // keep the largest bundles for code reading (scratch only)
  scripts.sort((a, b) => b.size - a.size).slice(0, 4).forEach((s, i) => fs.writeFileSync(path.join(out, `bundle${i}.js.txt`), s.text));
  log('frames', steps.length, 'H', steps.length ? steps[steps.length - 1].H : 0, 'libs', JSON.stringify(g).slice(0, 250));
  await b.close();
})().catch(e => { console.log(name, 'ERR', e.message.slice(0, 200)); process.exit(1); });
