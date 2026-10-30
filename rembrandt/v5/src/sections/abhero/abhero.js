// ABOUT PAGE HEAD (R5): five versions. Shares the services head motion; v4 traces the outline of the drawn 1995 once
// (.9s, stroke-dashoffset), v5's three faces rise 80ms apart.
import { gsap } from 'gsap';
import { EASE } from '../../js/fx.js';
import { head } from '../sphero/sphero.js';

function year(root, c) {
  head(root, c); if (!c.motion) return;
  const t = root.querySelector('.ah4-yr text'); gsap.fromTo(t, { strokeDasharray: 1400, strokeDashoffset: 1400 }, { strokeDashoffset: 0, duration: 0.9, ease: EASE, delay: 0.2 });
}
export default { 1: (r, c) => head(r, c), 2: (r, c) => head(r, c, '.ah2-pan'), 3: (r, c) => head(r, c, '.ah3-ph'), 4: year, 5: (r, c) => head(r, c, '.ah5-row li') };
