// SERVICES PAGE CLOSE (R5): five versions of the one action, the phone. Reveal-level motion only: the block rises once;
// v4's message slip settles onto its tilt (.3s).
import { gsap } from 'gsap';
import { beats } from '../../js/fx.js';

export function close(root, c) {
  if (!c.motion) return;
  beats(root, [root.firstElementChild ? [...root.children] : []], { stagger: 0.08 });
  const slip = root.querySelector('[class$="4-slip"]'); if (slip) gsap.from(slip, { rotate: -6, duration: 0.3, ease: 'power3.out', scrollTrigger: { trigger: slip, start: 'top 85%', once: true } });
}
export default { 1: close, 2: close, 3: close, 4: close, 5: close };
