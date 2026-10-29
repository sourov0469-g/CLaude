// Shared entrance vocabulary: the S1321 line and group reveals (kept byte-identical for the Constellation) and the G1 house entrance.
// Hidden start states exist only inside these tweens, which only run with motion allowed (content visible by default).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const EASE = 'power4.out';      // ≈ cubic-bezier(0.23,1,0.32,1), --ease-out
// masked line rise: yPercent 100 -> 0, blur 8 -> 0, stagger 0.11, 1.0s (S1321 [data-motion-text="lines"])
export const lines = (el, o = {}) => gsap.fromTo(el.querySelectorAll('.ln > span'), { yPercent: 100, autoAlpha: 0, filter: 'blur(8px)' }, { yPercent: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 1, ease: EASE, stagger: 0.11, ...o });
// group rise: 16px, 0.6s, stagger 0.1 between semantic chunks (S0075 staged entrance)
export const rise = (els, o = {}, from = {}) => gsap.fromTo(els, { y: 16, autoAlpha: 0, ...from }, { y: 0, x: 0, autoAlpha: 1, duration: 0.6, ease: EASE, stagger: 0.1, ...o });
// once-on-entry trigger (S1321 start "top 82%", once)
export const onEnter = (trigger, o = {}) => ({ trigger, start: 'top 82%', once: true, ...o });

// G1 house entrance (PLAN-FULL.md §G1): [BANK] Q40 direction-aware reveals (GreenSock pen pojzxwZ, CROWN) at the F17
// dose, over Builder Brief R5's role groups (eyebrow > title > body > media). Each group has its own trigger: entering
// while scrolling down it rises from +40px, entering while scrolling up it drops from -40px (±20px under 640px, Q40's
// own halving on phones); autoAlpha 0 -> 1 in 0.3s expo.out (Q40: 1.25s expo, compressed to F17), groups 0.08s apart,
// overwrite "auto" so a reversal mid-flight retargets instead of stacking; on leaving, a group resets hidden so the next
// entry again comes from the direction of travel. o.now plays once immediately (heroes, version swaps).
// Hidden start states exist only inside this function, which runs only with motion allowed.
export function beats(trigger, groups, o = {}) {
  const gs = groups.map(g => gsap.utils.toArray(g)).filter(a => a.length);
  const travel = () => (innerWidth < 640 ? 20 : 40);
  const show = (els, dir, i) => gsap.fromTo(els, { y: dir * travel(), autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.3, ease: 'expo.out', stagger: o.stagger ?? 0.05, delay: (o.delay || 0) + i * 0.08, overwrite: 'auto', clearProps: 'transform' });
  if (o.now) { gs.forEach((els, i) => show(els, 1, i)); return; }
  return gs.map((els, i) => {
    gsap.set(els, { autoAlpha: 0 });
    const hide = () => gsap.set(els, { autoAlpha: 0, overwrite: 'auto' });
    return ScrollTrigger.create({ trigger: els[0], endTrigger: els[els.length - 1], start: o.start || 'top 94%', end: 'bottom 6%',
      onEnter: () => show(els, 1, i), onEnterBack: () => show(els, -1, i), onLeave: hide, onLeaveBack: hide });
  });
}
