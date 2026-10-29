// §12 items 6-7 reduced-motion pass: under prefers-reduced-motion, in each of the 21 versions (scrolled into view and
// pointed at), nothing loops: no infinite CSS/WAAPI animation running, no infinitely repeating GSAP tween active, no
// smooth-scroll engine, companion off; overflow 0 and errors 0.
import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const FILE = 'file:///home/user/CLaude/rembrandt/v5/rembrandt-homepage.html';
const SECS = ['hero', 'proof', 'work', 'family', 'how', 'area', 'call'];
const b = await chromium.launch(); const out = []; let fails = 0;
for (const [w, h] of [[1440, 900], [375, 812]]) {
  const p = await (await b.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce' })).newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  for (const s of SECS) for (const v of [1, 2, 3]) {
    await p.goto(FILE + '?v=' + s + v); await p.waitForTimeout(700);
    await p.evaluate(s => document.getElementById(s).scrollIntoView({ block: 'start' }), s); await p.waitForTimeout(800);
    await p.mouse.move(w / 2, h / 2, { steps: 4 }); await p.waitForTimeout(1500);
    const r = await p.evaluate(() => {
      const css = document.getAnimations().filter(a => a.playState === 'running' && a.effect && a.effect.getTiming().iterations === Infinity).map(a => (a.animationName || a.id || 'waapi') + '@' + (a.effect.target && (a.effect.target.getAttribute('class') || a.effect.target.tagName)));
      const g = window.gsap ? gsap.globalTimeline.getChildren(true, true, false).filter(t => t.repeat && t.repeat() === -1 && t.isActive()).map(t => (t.targets && t.targets()[0] && (t.targets()[0].getAttribute && t.targets()[0].getAttribute('class'))) || 'tl') : [];
      return { css, g, lenis: document.documentElement.classList.contains('lenis'), cmp: document.documentElement.classList.contains('cmp-on'), ov: document.documentElement.scrollWidth - innerWidth };
    });
    const ok = !r.css.length && !r.g.length && !r.lenis && !r.cmp && r.ov <= 0;
    if (!ok) fails++;
    out.push(`${ok ? 'PASS' : 'FAIL'} ${s}${v}@${w}: infinite CSS ${r.css.length ? r.css.join(',') : 0}, infinite GSAP ${r.g.length ? r.g.join(',') : 0}, lenis ${r.lenis}, companion ${r.cmp}, overflow ${r.ov}`);
  }
  out.push(`errors @${w}: ${errs.length ? errs.join(' | ') : 0}`); if (errs.length) fails++;
}
out.push('FAILS: ' + fails); console.log(out.join('\n')); await b.close();
