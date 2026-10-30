// node idle.js <fileurl>  — F17 evidence: what keeps moving with NO input. Per version: load, park the pointer off the
// page, wait 2.5 s, then over 2 s count requestAnimationFrame callbacks, running infinite CSS animations and active
// repeating GSAP tweens. A version is QUIET when none run; anything else is listed by name.
const { chromium } = require('playwright');
const SECS = ['hero', 'proof', 'services', 'work', 'built', 'colour', 'near', 'reviews', 'money', 'book'];
const URL = process.argv[2];
(async () => { const b = await chromium.launch(); const out = [];
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript(() => { const raf = window.requestAnimationFrame.bind(window); window.__raf = 0; window.__rafSrc = {}; window.requestAnimationFrame = cb => { window.__raf++; const k = (new Error().stack.split('\n')[2] || '').trim().slice(0, 90); window.__rafSrc[k] = (window.__rafSrc[k] || 0) + 1; return raf(cb); }; });
  const p = await ctx.newPage();
  for (const s of SECS) for (const v of [1, 2, 3]) {
    await p.goto(`${URL}?v=${SECS.map(x => x === s ? v : 1).join('')}`, { waitUntil: 'load' });
    await p.evaluate(s => { const el = document.getElementById(s); window.scrollTo(0, el.getBoundingClientRect().top + scrollY - 70); }, s);
    await p.mouse.move(1439, 899); await p.waitForTimeout(2500);
    const r = await p.evaluate(async () => {
      window.__raf = 0; window.__rafSrc = {}; await new Promise(r => setTimeout(r, 2000));
      const css = document.getAnimations().filter(a => a.playState === 'running' && a.effect && a.effect.getTiming().iterations === Infinity).map(a => (a.animationName || a.constructor.name) + '@' + (a.effect.target && (a.effect.target.className.baseVal ?? a.effect.target.className) || '').toString().split(' ')[0]);
      const gs = window.gsap ? gsap.globalTimeline.getChildren(true, true, false).filter(t => t.isActive() && t.repeat && t.repeat() === -1).map(t => { const tg = t.targets ? t.targets()[0] : null; return 'gsap-loop@' + (tg && tg.getAttribute ? (tg.getAttribute('class') || tg.tagName) : '?'); }) : [];
      const src = Object.entries(window.__rafSrc).sort((a, b) => b[1] - a[1]).slice(0, 2).map(([k, n]) => `${n}x ${k.replace(/^at /, '').replace(/file:\/\/\S+?:(\d+):\d+/, 'L$1')}`);
      return { raf: window.__raf, css: [...new Set(css)], gs: [...new Set(gs)], src };
    });
    const quiet = r.raf < 6 && !r.css.length && !r.gs.length;
    out.push(`${quiet ? 'QUIET' : 'MOVING'} ${s}${v}: raf ${r.raf}/2s${r.css.length ? ' css ' + r.css.join(',') : ''}${r.gs.length ? ' ' + r.gs.join(',') : ''}${r.raf >= 6 ? ' [' + r.src.join(' ; ') + ']' : ''}`);
  }
  console.log(out.join('\n')); await b.close(); })();
