// Hero study for the upgrade round: frame-by-frame + code level (the way DevTools shows it).
// usage: node hero-study.cjs <name> <url>   -> evidence/hero-study/<name>/{f*.jpg, sheet.jpg, code.json}
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const [name, url, extra] = process.argv.slice(2); const EXTRA = +(extra || 0); const OUT = path.join(__dirname, 'hero-study', name); fs.mkdirSync(OUT, { recursive: true });
(async () => {
  const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36' });
  const p = await ctx.newPage(); const cdp = await ctx.newCDPSession(p); const T0 = Date.now(); const scripts = [];
  p.on('response', async r => { try { const u = r.url(); if (/\.m?js(\?|$)/.test(u) || /javascript/.test(r.headers()['content-type'] || '')) scripts.push(u.slice(0, 160)); } catch (e) {} });
  await p.addInitScript(() => { window.__gl = []; const o = HTMLCanvasElement.prototype.getContext; HTMLCanvasElement.prototype.getContext = function (t, ...a) { window.__gl.push(t); return o.call(this, t, ...a); }; });
  const shot = async f => { const { data } = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 55 }); fs.writeFileSync(path.join(OUT, f), Buffer.from(data, 'base64')); };
  try { await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 }); } catch (e) { console.log('goto', e.message.slice(0, 80)); }
  const wall = /just a moment|verify you are human|captcha/i.test(await p.title()); if (wall) { console.log('BOT WALL, not bypassed'); fs.writeFileSync(path.join(OUT, 'code.json'), JSON.stringify({ url, botWall: true })); await b.close(); return; }
  if (process.env.CLICK) { while (Date.now() - T0 < +process.env.CLICK) await p.waitForTimeout(100); await p.mouse.click(720, 450); }
  // frame by frame: the hero over time, untouched (EXTRA waits out intro loaders)
  for (const t of [600, 1600, 3200, 6500]) { while (Date.now() - T0 < t + 2500 + EXTRA) await p.waitForTimeout(100); await shot('f-t' + t + '.jpg'); }
  // cursor sweep across the hero: does the surface react where the cursor moves?
  const pts = [[220, 260], [520, 420], [760, 300], [1020, 560], [1260, 380]]; let k = 0;
  for (const [x, y] of pts) { await p.mouse.move(x, y, { steps: 14 }); await p.waitForTimeout(140); await shot('f-cursor' + (++k) + '.jpg'); }
  // code level
  const code = await p.evaluate(() => {
    const vis = e => { const r = e.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight && r.width > 4 && r.height > 4; };
    const first = [...document.querySelectorAll('body *')].filter(vis);
    const tags = {}; first.forEach(e => tags[e.tagName] = (tags[e.tagName] || 0) + 1);
    const anims = document.getAnimations().slice(0, 40).map(a => { const t = a.effect && a.effect.getTiming ? a.effect.getTiming() : {}; const tgt = a.effect && a.effect.target; return { type: a.constructor.name, name: a.animationName || a.transitionProperty || a.id || '', dur: t.duration, easing: t.easing, iter: t.iterations, target: tgt ? (tgt.tagName + '.' + String(tgt.className && tgt.className.baseVal !== undefined ? tgt.className.baseVal : tgt.className).slice(0, 40)) : '' }; });
    const g = {}; ['gsap', 'ScrollTrigger', 'Lenis', 'lenis', 'THREE', 'barba', 'Swiper', 'anime', 'Splitting', 'SplitText', 'Flip', 'PIXI', 'Matter', 'Rive', 'lottie', 'Webflow', 'Shopify', 'next', '__NEXT_DATA__', '__NUXT__', 'Vue', 'React', 'wp'].forEach(k => { if (window[k]) g[k] = typeof window[k]; });
    const btn = [...document.querySelectorAll('a,button')].filter(vis).filter(e => (e.innerText || '').trim().length > 2 && (e.innerText || '').trim().length < 30).slice(0, 4).map(e => { const s = getComputedStyle(e); return { text: e.innerText.trim(), tag: e.tagName, transition: s.transition.slice(0, 120), radius: s.borderRadius, bg: s.backgroundColor, shadow: s.boxShadow.slice(0, 80), children: e.children.length, inner: e.innerHTML.replace(/\s+/g, ' ').slice(0, 220) }; });
    const fixed = first.filter(e => { const s = getComputedStyle(e); return s.position === 'fixed' && s.pointerEvents === 'none'; }).slice(0, 6).map(e => e.tagName + '.' + String(e.className).slice(0, 40));
    const willChange = first.filter(e => { const s = getComputedStyle(e); return s.willChange !== 'auto' || (s.transform !== 'none' && s.transform.indexOf('matrix3d') === 0); }).slice(0, 12).map(e => e.tagName + '.' + String(e.className && e.className.baseVal !== undefined ? e.className.baseVal : e.className).slice(0, 40) + ' ' + getComputedStyle(e).transform.slice(0, 50));
    const hero = (document.querySelector('main section, main > div, section, [class*=hero], header + *') || document.body);
    return { title: document.title, tags, canvases: document.querySelectorAll('canvas').length, videos: document.querySelectorAll('video').length, svgs: document.querySelectorAll('svg').length, gl: window.__gl, anims, globals: g, buttons: btn, cursorFollowers: fixed, transformed: willChange, heroOuter: hero.outerHTML.replace(/\s+/g, ' ').slice(0, 1600), htmlClass: document.documentElement.className.slice(0, 120), bodyClass: document.body.className.slice(0, 120) };
  });
  // event listeners on window / document, as DevTools lists them
  const ls = {}; for (const expr of ['window', 'document', 'document.body']) { try { const { result } = await cdp.send('Runtime.evaluate', { expression: expr }); const { listeners } = await cdp.send('DOMDebugger.getEventListeners', { objectId: result.objectId }); ls[expr] = [...new Set(listeners.map(l => l.type))]; } catch (e) { ls[expr] = 'n/a'; } }
  // hover state of the first button: what changes?
  let hover = null; try { const h = await p.evaluate(() => { const e = [...document.querySelectorAll('a,button')].find(e => { const r = e.getBoundingClientRect(); return r.top > 60 && r.bottom < innerHeight && r.width > 60 && (e.innerText || '').trim().length > 2 && (e.innerText || '').trim().length < 30; }); if (!e) return null; e.dataset.__h = 1; const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return { text: e.innerText.trim(), x: r.x + r.width / 2, y: r.y + r.height / 2, before: { bg: s.backgroundColor, color: s.color, transform: s.transform, shadow: s.boxShadow.slice(0, 60) } }; });
    if (h) { await p.mouse.move(h.x, h.y, { steps: 6 }); await p.waitForTimeout(700); await shot('f-btn-hover.jpg'); h.after = await p.evaluate(() => { const e = document.querySelector('[data-__h]'); const s = getComputedStyle(e); const kids = [...e.querySelectorAll('*')].slice(0, 6).map(k => getComputedStyle(k).transform); return { bg: s.backgroundColor, color: s.color, transform: s.transform, shadow: s.boxShadow.slice(0, 60), childTransforms: kids }; }); hover = h; } } catch (e) {}
  fs.writeFileSync(path.join(OUT, 'code.json'), JSON.stringify({ url, ...code, listeners: ls, hover, scripts: scripts.slice(0, 40) }, null, 1));
  await b.close();
  // contact sheet
  const { execSync } = require('child_process');
  execSync(`python3 -c "
from PIL import Image,ImageDraw
import glob,os
fs=sorted(glob.glob('${OUT}/f-*.jpg'))
W=480;H=300;cols=4;rows=(len(fs)+cols-1)//cols
s=Image.new('RGB',(W*cols,H*rows),'white')
for i,f in enumerate(fs):
  im=Image.open(f).resize((W,H)); ImageDraw.Draw(im).text((6,6),os.path.basename(f),fill=(255,0,0)); s.paste(im,((i%cols)*W,(i//cols)*H))
s.save('${OUT}/sheet.jpg',quality=70)"`);
  console.log(name, 'done', Math.round((Date.now() - T0) / 1000) + 's');
})();
