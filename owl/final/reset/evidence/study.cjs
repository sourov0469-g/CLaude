// Live mechanism study: frames at fixed scroll positions + code facts (sticky, scroll-linked transforms, video scrubbing, libraries)
// usage: node study.cjs <name> <url> [positions,...] [waitMs]
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const [name, url, posArg, waitArg] = process.argv.slice(2);
const OUT = path.join(__dirname, name); fs.mkdirSync(OUT, { recursive: true });
const POS = (posArg || '0,0.08,0.16,0.24,0.32,0.4,0.5,0.6,0.75,0.9').split(',').map(Number);
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const log = [];
  try { await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 }); } catch (e) { log.push('goto: ' + e.message.split('\n')[0]); }
  await p.waitForTimeout(+(waitArg || 6000));
  const facts = await p.evaluate(() => { const all = [...document.querySelectorAll('*')]; const cs = e => getComputedStyle(e);
    return { title: document.title, height: document.documentElement.scrollHeight,
      sticky: all.filter(e => cs(e).position === 'sticky').length, fixed: all.filter(e => cs(e).position === 'fixed').length,
      videos: document.querySelectorAll('video').length, canvases: document.querySelectorAll('canvas').length,
      clip: all.filter(e => cs(e).clipPath && cs(e).clipPath !== 'none').length,
      libs: { gsap: !!window.gsap, ScrollTrigger: !!window.ScrollTrigger, Lenis: !!(window.Lenis || window.lenis || document.documentElement.classList.contains('lenis')), three: !!window.THREE, swiper: !!window.Swiper },
      scripts: [...document.scripts].map(s => s.src).filter(Boolean).map(s => s.split('/').slice(-1)[0]).slice(0, 25) }; });
  const snap = () => p.evaluate(() => { const out = []; document.querySelectorAll('body *').forEach((e, i) => { if (i > 6000) return; const s = getComputedStyle(e); const r = e.getBoundingClientRect(); if (r.width < 40 || r.height < 40) return; out.push([i, s.transform, s.opacity, s.clipPath, Math.round(r.top)]); }); const v = [...document.querySelectorAll('video')].map(x => +x.currentTime.toFixed(2)); return { out, v, y: scrollY }; });
  const states = [];
  for (const f of POS) {
    const y = await p.evaluate(f => { const h = document.documentElement.scrollHeight - innerHeight; window.scrollTo(0, Math.round(h * f)); return Math.round(h * f); }, f);
    await p.waitForTimeout(1300);
    const s = await snap(); states.push({ f, y: s.y, v: s.v, n: s.out.length, map: Object.fromEntries(s.out.map(o => [o[0], o.slice(1, 4).join('|')])), tops: Object.fromEntries(s.out.map(o => [o[0], o[4]])) });
    await p.screenshot({ path: path.join(OUT, `${name}-${String(Math.round(f * 100)).padStart(3, '0')}.jpg`), type: 'jpeg', quality: 60 });
  }
  // scroll-linked = element whose transform/opacity/clip changed between consecutive scroll states while staying on screen
  let linked = 0, pinnedLike = 0; for (let i = 1; i < states.length; i++) { const a = states[i - 1], c = states[i]; for (const k in c.map) { if (a.map[k] && a.map[k] !== c.map[k]) linked++; if (a.tops[k] !== undefined && Math.abs(a.tops[k] - c.tops[k]) < 2 && Math.abs(c.y - a.y) > 200 && c.tops[k] > -50 && c.tops[k] < 900) pinnedLike++; } }
  const vids = states.map(s => s.v.join(','));
  const res = { name, url, facts, scrollLinkedChanges: linked, pinnedLikeHolds: pinnedLike, videoTimesByState: vids, log };
  fs.writeFileSync(path.join(OUT, 'facts.json'), JSON.stringify(res, null, 1));
  console.log(JSON.stringify({ name, h: facts.height, sticky: facts.sticky, fixed: facts.fixed, videos: facts.videos, canvases: facts.canvases, clip: facts.clip, libs: facts.libs, linked, pinnedLike, vids: vids.slice(0, 6), log }));
  await b.close(); })();
