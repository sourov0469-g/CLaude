// Backups B4-B8 of the storm section (R4 directive Phase 5): the pre-redesign versions from 2ee2693, verbatim except the prefix st -> cst and the helper import paths. Never edit.
// STORM AND INSURANCE (R4, AUDIT-R4.md, TRACEABILITY.md "R4 Storm and Insurance"). Every version says, in plain words,
// that the insurance company decides the claim (⟦S1013⟧ visible, specific disclaimer on a money matter). No version
// promises approval, an amount, a response time or round-the-clock availability.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASE, beats } from '../../../js/frozen/fx2.js';

// v1 ⟦S1013⟧ + ⟦S1291⟧ + [BANK] Checklist 14 (a claim printed with its caveat): a split with a seam. The seam draws in
// .4s, the four things the firm does tick in 60ms apart, the insurer's column follows. Once.
function split(root, c) {
  if (!c.motion) return;
  beats(root, [root.querySelector('.cst1-head')]);
  const tl = gsap.timeline({ paused: true });
  tl.fromTo(root.querySelector('.cst1-seam path'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.4, ease: 'power2.out' })
    .fromTo(root.querySelectorAll('.cst1-us li'), { x: -12, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.3, ease: EASE, stagger: 0.06 }, 0)
    .fromTo(root.querySelectorAll('.cst1-tick path'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.25, ease: 'power2.out', stagger: 0.06 }, 0.1)
    .fromTo(root.querySelector('.cst1-them'), { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.3, ease: EASE }, 0.25);
  const cst = ScrollTrigger.create({ trigger: root.querySelector('.cst1-split'), start: 'top 75%', once: true, onEnter: () => tl.play() });
  beats(root, [root.querySelector('.cst1-act')]);
  return () => { cst.kill(); tl.kill(); };
}

// v2 ⟦S0603⟧ (evidence geometry matched to the question: when does roof weather happen?) + ⟦S0614⟧ calendar heatmap
// form. A real table (months x seasons). This month (the visitor's clock) is outlined and tagged; the bands fill once.
function year(root, c) {
  const m = new Date().getMonth(), head = root.querySelectorAll('.cst2-t thead th')[m + 1];
  head.classList.add('is-now'); head.insertAdjacentHTML('beforeend', '<span class="cst2-now-tag">Now</span>');
  root.querySelectorAll('.cst2-t tbody tr').forEach(tr => tr.children[m + 1].classList.add('is-now'));
  if (!c.motion) return;
  beats(root, [root.querySelector('.cst2-head')]);
  gsap.fromTo(root.querySelectorAll('.cst2-t td.on'), { scaleX: 0, transformOrigin: '0 50%' }, { scaleX: 1, duration: 0.3, ease: EASE, stagger: 0.03, scrollTrigger: { trigger: root.querySelector('.cst2-t'), start: 'top 80%', once: true } });
  beats(root, [root.querySelector('.cst2-src'), root.querySelector('.cst2-act')]);
}

// v3 ⟦S1013⟧ + Checklist 14 + ⟦S1448⟧ one purposeful sequence: the promise other firms make is drawn through (DrawSVG
// .45s, once at 60% in view), then the true sentence rises .3s. The struck line is real <s> text with a spoken note.
function honest(root, c) {
  if (!c.motion) return;
  const strike = root.querySelector('.cst3-strike path'), truth = root.querySelectorAll('.cst3-true,.cst3-do'), act = root.querySelector('.cst3-act');
  gsap.set(strike, { drawSVG: '0%' }); gsap.set([...truth, act], { autoAlpha: 0, y: 14 });
  const tl = gsap.timeline({ paused: true })
    .to(strike, { drawSVG: '100%', duration: 0.45, ease: 'power2.inOut' })
    .to(truth, { autoAlpha: 1, y: 0, duration: 0.3, ease: EASE, stagger: 0.1 }, '+=0.1')
    .to(act, { autoAlpha: 1, y: 0, duration: 0.3, ease: EASE }, '-=0.15');
  const cst = ScrollTrigger.create({ trigger: root.querySelector('.cst3-false'), start: 'top 60%', once: true, onEnter: () => tl.play() });
  return () => { cst.kill(); tl.kill(); };
}

// v4 [BANK] Checklist 11 (every photo real, say so) + ⟦S1314⟧ product truth: the firm's two storm photos as exhibits.
function evidence(root, c) {
  if (!c.motion) return;
  beats(root, [root.querySelector('.cst4-head'), root.querySelectorAll('.cst4-ex'), root.querySelector('.cst4-act')], { stagger: 0.12 });
}

// v5 ⟦S1341⟧ threejs-weather, ported to SVG at reveal dose: 40 streaks of rain fall while the section enters; as it
// reaches the middle of the screen the rain thins to nothing and the glass clears (scrubbed). The rain only moves
// while it is on screen and stops for good once cleared (⟦S1314 §8⟧, no perpetual motion).
function rainy(root, c) {
  const g = root.querySelector('.cst5-rain'), clear = root.querySelector('.cst5-clear');
  if (!c.motion) return;
  const NS = 'http://www.w3.org/2000/svg', drops = [];
  for (let i = 0; i < 40; i++) { const l = document.createElementNS(NS, 'line'); const x = (i * 97) % 600, len = 14 + (i % 5) * 4; l.setAttribute('x1', x); l.setAttribute('x2', x - 4); l.setAttribute('y1', 0); l.setAttribute('y2', len); g.append(l); drops.push({ l, x, y: (i * 53) % 420, v: 5 + (i % 4) }); }
  const s = { amt: 1 }; let raf = 0, on = false;
  const tick = () => { for (const d of drops) { d.y = (d.y + d.v * (0.4 + s.amt)) % 440; d.l.setAttribute('transform', `translate(0 ${d.y.toFixed(1)})`); } g.style.opacity = s.amt.toFixed(3); raf = on && s.amt > 0.02 ? requestAnimationFrame(tick) : 0; };
  const go = v => { on = v; if (on && !raf && s.amt > 0.02) raf = requestAnimationFrame(tick); };
  const vis = ScrollTrigger.create({ trigger: root, start: 'top bottom', end: 'bottom top', onToggle: t => go(t.isActive) });
  const tw = gsap.to(s, { amt: 0, ease: 'none', scrollTrigger: { trigger: root, start: 'top 85%', end: 'top 25%', scrub: true }, onUpdate: () => { clear.style.opacity = ((1 - s.amt) * 0.85).toFixed(3); if (s.amt <= 0.02) g.style.opacity = '0'; else go(on); } });
  beats(root, [root.querySelector('.cst5-sill')]);
  return () => { cancelAnimationFrame(raf); vis.kill(); tw.kill(); };
}

export default { 4: split, 5: year, 6: honest, 7: evidence, 8: rainy };
