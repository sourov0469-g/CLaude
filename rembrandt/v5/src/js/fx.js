// Shared entrance vocabulary (S1321 text and image reveals; S0060 clip reveal; tokens from PLAN §3).
// Hidden start states exist only inside these tweens, which only run with motion allowed (content visible by default).
import { gsap } from 'gsap';

export const EASE = 'power4.out';      // ≈ cubic-bezier(0.23,1,0.32,1), --ease-out
export const MOVE = 'power3.inOut';    // ≈ cubic-bezier(0.77,0,0.175,1), --ease-in-out
// masked line rise: yPercent 100 -> 0, blur 8 -> 0, stagger 0.11, 1.0s (S1321 [data-motion-text="lines"])
export const lines = (el, o = {}) => gsap.fromTo(el.querySelectorAll('.ln > span'), { yPercent: 100, autoAlpha: 0, filter: 'blur(8px)' }, { yPercent: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 1, ease: EASE, stagger: 0.11, ...o });
// clip image reveal: figure inset(0 0 100% 0) -> 0 in 1.1s, image scale 1.08 -> 1 in 1.2s (S1321 initImageReveals)
export function clipIn(fig, o = {}) {
  const tl = gsap.timeline(o);
  tl.fromTo(fig, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: EASE });
  const im = fig.querySelector('img'); if (im) tl.fromTo(im, { scale: 1.08 }, { scale: 1, duration: 1.2, ease: EASE }, 0);
  return tl;
}
// group rise: 16px, 0.6s, stagger 0.1 between semantic chunks (S0075 staged entrance)
export const rise = (els, o = {}, from = {}) => gsap.fromTo(els, { y: 16, autoAlpha: 0, ...from }, { y: 0, x: 0, autoAlpha: 1, duration: 0.6, ease: EASE, stagger: 0.1, ...o });
// once-on-entry trigger (S1321 start "top 82%", once)
export const onEnter = (trigger, o = {}) => ({ trigger, start: 'top 82%', once: true, ...o });
