// SERVICES PAGE HEAD (R5): five versions over the one fact list (build/gen-pages.py). Reveal-level motion: the head
// rises, the roofline draws out from the ridge (.8s); v2's photos rise 60ms apart; v5's icons 40ms apart.
import { gsap } from 'gsap';
import { EASE, beats } from '../../js/fx.js';

export function head(root, c, extra) {
  if (!c.motion) return;
  beats(root, [root.querySelector('header')], { now: true });
  gsap.fromTo(root.querySelectorAll('.pg-ridge path'), { drawSVG: '50% 50%' }, { drawSVG: '0% 100%', duration: 0.8, ease: EASE, delay: 0.15 });
  if (extra) gsap.fromTo(root.querySelectorAll(extra), { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.3, ease: 'expo.out', stagger: 0.05, delay: 0.2, clearProps: 'transform' });
}
export default { 1: (r, c) => head(r, c), 2: (r, c) => head(r, c, '.sh2-strip img'), 3: (r, c) => head(r, c, '.sh3-ev li'), 4: (r, c) => head(r, c, '.sh4-ph'), 5: (r, c) => head(r, c, '.sh5-list li') };
