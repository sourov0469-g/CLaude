// SERVICES PAGE (R4): five whole-page layouts over the same fact list (build/gen-pages.py). Motion stays at reveal
// level (F17): group rises once, the index lights by position, tabs switch with a .2s fade.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASE, beats } from '../../js/fx.js';

// R4 Phase 6: the header's roofline draws out from the ridge (.8s) as the header arrives
const hero = (root, c) => { if (!c.motion) return; beats(root, [root.querySelector('.sp-hero')], { now: true }); gsap.fromTo(root.querySelectorAll('.pg-ridge path'), { drawSVG: '50% 50%' }, { drawSVG: '0% 100%', duration: 0.8, ease: EASE, delay: 0.15 }); };
const rows = (root, sel, c) => { if (c.motion) beats(root, [...root.querySelectorAll(sel)].map(x => [x])); };

// v1 [BANK] Q153 (the rail item of the chapter in view lights) + Q571 numbered index; CSS sticky, no pin
function index(root, c) {
  hero(root, c);
  const links = [...root.querySelectorAll('.sp1-idx a[data-i]')];
  const sts = [...root.querySelectorAll('.sp1-ch')].map((ch, i) => ScrollTrigger.create({ trigger: ch, start: 'top 45%', end: 'bottom 45%', onToggle: s => { if (s.isActive) links.forEach((a, k) => a.classList.toggle('is-on', k === i)); } }));
  links[0].classList.add('is-on');
  rows(root, '.sp1-ch, .sp1-more, .sp-close', c);
  return () => sts.forEach(s => s.kill());
}
// v2 [BANK] Anatomy §7 + ⟦S1375⟧ chapters: each row and the band rise once as they enter
function chapters(root, c) { hero(root, c); rows(root, '.sp2-row, .sp2-band, .sp2-foot, .sp-close', c); }
// v3 ⟦S0931⟧ tabs: roles, roving tabindex, arrows / Home / End, the panel fades in .2s
function tabs(root, c) {
  hero(root, c);
  const ts = [...root.querySelectorAll('[role=tab]')], ps = [...root.querySelectorAll('[role=tabpanel]')];
  const pick = (i, focus) => {
    ts.forEach((t, k) => { t.setAttribute('aria-selected', String(k === i)); t.tabIndex = k === i ? 0 : -1; });
    ps.forEach((p, k) => { p.hidden = k !== i; }); if (focus) ts[i].focus();
    if (c.motion) gsap.fromTo(ps[i], { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.2, ease: EASE });
  };
  const onClick = e => { const t = e.target.closest('[role=tab]'); if (t) pick(ts.indexOf(t)); };
  const onKey = e => { const t = e.target.closest('[role=tab]'); if (!t) return; const i = ts.indexOf(t), n = ts.length;
    const j = { ArrowRight: (i + 1) % n, ArrowDown: (i + 1) % n, ArrowLeft: (i - 1 + n) % n, ArrowUp: (i - 1 + n) % n, Home: 0, End: n - 1 }[e.key];
    if (j === undefined) return; e.preventDefault(); pick(j, true); };
  root.addEventListener('click', onClick); root.addEventListener('keydown', onKey);
  rows(root, '.sp3-foot, .sp-close', c);
  return () => { root.removeEventListener('click', onClick); root.removeEventListener('keydown', onKey); };
}
// v4 ⟦S1499⟧ three groups: each band's columns rise 60ms apart
function groups(root, c) { hero(root, c); if (c.motion) beats(root, [...root.querySelectorAll('.sp4-g')].map(g => g.querySelectorAll('.sp4-gh, .sp4-s')), { stagger: 0.06 }); rows(root, '.sp-close', c); }
// v5 the menu board: lines enter 40ms apart once
function board(root, c) {
  hero(root, c);
  if (c.motion) gsap.fromTo(root.querySelectorAll('.sp5-li'), { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.3, ease: EASE, stagger: 0.04, scrollTrigger: { trigger: root.querySelector('.sp5-board'), start: 'top 85%', once: true } });
  rows(root, '.sp-close', c);
}
export default { 1: index, 2: chapters, 3: tabs, 4: groups, 5: board };
