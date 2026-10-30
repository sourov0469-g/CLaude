// Backups B1-B5 of the abhero section (R5): the whole-page about layouts as they stood at cbe610a; verbatim except the prefix ab -> eab and the import paths. Never edit.
// ABOUT PAGE (R4): five layouts over one fact list (build/gen-pages.py). Reveal-level motion only (F17).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASE, beats } from '../../../js/fx.js';

// R4 Phase 6: the header's roofline draws out from the ridge (.8s) as the header arrives
const hero = (root, c) => { if (!c.motion) return; beats(root, [root.querySelector('.eab-hero, .eab5-head')], { now: true }); gsap.fromTo(root.querySelectorAll('.pg-ridge path'), { drawSVG: '50% 50%' }, { drawSVG: '0% 100%', duration: 0.8, ease: EASE, delay: 0.15 }); };
const rows = (root, sel, c) => { if (c.motion) beats(root, [...root.querySelectorAll(sel)].map(x => [x])); };

// v1 [BANK] Q22 Monolith: team cards rise 80ms apart, then the record strip
function people(root, c) { hero(root, c); if (c.motion) beats(root, [root.querySelectorAll('.eab1-card')], { stagger: 0.08 }); rows(root, '.eab1-proof, .sp-close', c); }
// v2 ⟦S1325⟧ scroll-progress timeline: the ridge fills (DrawSVG, scrubbed) as the stops cross the middle of the screen
function years(root, c) {
  hero(root, c);
  if (c.motion) {
    gsap.fromTo(root.querySelector('.eab2-ridge-fg'), { drawSVG: '0%' }, { drawSVG: '100%', ease: 'none', scrollTrigger: { trigger: root.querySelector('.eab2-line'), start: 'top 80%', end: 'bottom 40%', scrub: true } });
    beats(root, [root.querySelectorAll('.eab2-stop')], { stagger: 0.08 });
  }
  rows(root, '.eab2-pair, .eab2-proof, .sp-close', c);
}
// v3 ⟦S0603⟧ fact sheet: stillness by default; rows arrive once, 40ms apart
function glance(root, c) {
  hero(root, c);
  if (c.motion) gsap.fromTo(root.querySelectorAll('.eab3-row'), { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.25, ease: EASE, stagger: 0.04, scrollTrigger: { trigger: root.querySelector('.eab3-dl'), start: 'top 85%', once: true } });
  rows(root, '.sp-close', c);
}
// v4 ⟦S0441⟧ one sticky photo; each chapter crossing the middle of the screen shows its photo (.3s crossfade in CSS)
function story(root, c) {
  hero(root, c);
  const imgs = [...root.querySelectorAll('.eab4-img')];
  const sts = [...root.querySelectorAll('.eab4-ch')].map(ch => ScrollTrigger.create({ trigger: ch, start: 'top 55%', end: 'bottom 55%', onToggle: s => { if (s.isActive) imgs.forEach(im => im.classList.toggle('is-on', im.dataset.i === ch.dataset.ph)); } }));
  rows(root, '.eab4-ch, .sp-close', c);
  return () => sts.forEach(s => s.kill());
}
// v5 ⟦S1354⟧ the panoramic image settles once from 1.06 to 1
function magazine(root, c) {
  hero(root, c);
  if (c.motion) gsap.fromTo(root.querySelector('.eab5-pan img'), { scale: 1.06 }, { scale: 1, duration: 1.2, ease: EASE, scrollTrigger: { trigger: root.querySelector('.eab5-pan'), start: 'top 85%', once: true } });
  rows(root, '.eab5-grid, .eab5-two, .sp-close', c);
}
export default { 1: people, 2: years, 3: glance, 4: story, 5: magazine };
