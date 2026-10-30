// Backups B4-B8 of the about section (R4 directive Phase 5): the pre-redesign versions from 2ee2693, verbatim except the prefix ab -> cab and the helper import paths. Never edit.
// ABOUT PAGE (R4): five layouts over one fact list (build/gen-pages.py). Reveal-level motion only (F17).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASE, beats } from '../../../js/frozen/fx2.js';

const hero = (root, c) => { if (c.motion) beats(root, [root.querySelector('.cab-hero, .cab5-head')], { now: true }); };
const rows = (root, sel, c) => { if (c.motion) beats(root, [...root.querySelectorAll(sel)].map(x => [x])); };

// v1 [BANK] Q22 Monolith: team cards rise 80ms apart, then the record strip
function people(root, c) { hero(root, c); if (c.motion) beats(root, [root.querySelectorAll('.cab1-card')], { stagger: 0.08 }); rows(root, '.cab1-proof, .sp-close', c); }
// v2 ⟦S1325⟧ scroll-progress timeline: the ridge fills (DrawSVG, scrubbed) as the stops cross the middle of the screen
function years(root, c) {
  hero(root, c);
  if (c.motion) {
    gsap.fromTo(root.querySelector('.cab2-ridge-fg'), { drawSVG: '0%' }, { drawSVG: '100%', ease: 'none', scrollTrigger: { trigger: root.querySelector('.cab2-line'), start: 'top 80%', end: 'bottom 40%', scrub: true } });
    beats(root, [root.querySelectorAll('.cab2-stop')], { stagger: 0.08 });
  }
  rows(root, '.cab2-pair, .cab2-proof, .sp-close', c);
}
// v3 ⟦S0603⟧ fact sheet: stillness by default; rows arrive once, 40ms apart
function glance(root, c) {
  hero(root, c);
  if (c.motion) gsap.fromTo(root.querySelectorAll('.cab3-row'), { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.25, ease: EASE, stagger: 0.04, scrollTrigger: { trigger: root.querySelector('.cab3-dl'), start: 'top 85%', once: true } });
  rows(root, '.sp-close', c);
}
// v4 ⟦S0441⟧ one sticky photo; each chapter crossing the middle of the screen shows its photo (.3s crossfade in CSS)
function story(root, c) {
  hero(root, c);
  const imgs = [...root.querySelectorAll('.cab4-img')];
  const sts = [...root.querySelectorAll('.cab4-ch')].map(ch => ScrollTrigger.create({ trigger: ch, start: 'top 55%', end: 'bottom 55%', onToggle: s => { if (s.isActive) imgs.forEach(im => im.classList.toggle('is-on', im.dataset.i === ch.dataset.ph)); } }));
  rows(root, '.cab4-ch, .sp-close', c);
  return () => sts.forEach(s => s.kill());
}
// v5 ⟦S1354⟧ the panoramic image settles once from 1.06 to 1
function magazine(root, c) {
  hero(root, c);
  if (c.motion) gsap.fromTo(root.querySelector('.cab5-pan img'), { scale: 1.06 }, { scale: 1, duration: 1.2, ease: EASE, scrollTrigger: { trigger: root.querySelector('.cab5-pan'), start: 'top 85%', once: true } });
  rows(root, '.cab5-grid, .cab5-two, .sp-close', c);
}
export default { 4: people, 5: years, 6: glance, 7: story, 8: magazine };
