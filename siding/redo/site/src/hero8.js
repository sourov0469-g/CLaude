/* HERO O (upgrade plan H-A): the one live unit. On a fine pointer the photo drifts a few pixels against the pointer while the
   headline card and the homeowner's card tilt a few degrees on a second depth, and a soft light band crosses the photo once
   on load and then follows the pointer faintly. Transform and opacity only, one rAF at a time. Touch and coarse pointers:
   the one-time light sweep only. Reduced motion: nothing moves. */
window.Hero8 = (function () {
  function wire() {
    const h = document.querySelector('.slot[data-slot="hero"] .hzv'); if (!h || h.dataset.w) return; h.dataset.w = 1;
    const RM = matchMedia('(prefers-reduced-motion: reduce)').matches, FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (RM) return;
    h.classList.add('hzsweep');
    if (!FINE) return;
    const fr = h.querySelector('.hzframe'), ph = h.querySelector('.hzphoto'), cards = [...h.querySelectorAll('.hzcard,.hzquote')], gl = h.querySelector('.hzglint');
    let raf = 0, nx = 0, ny = 0, tx = 0, ty = 0, on = false;
    const apply = () => { raf = 0;
      tx += (nx - tx) * .14; ty += (ny - ty) * .14;
      ph.style.setProperty('--hx', (-tx * 8).toFixed(2) + 'px'); ph.style.setProperty('--hy', (-ty * 6).toFixed(2) + 'px');
      cards.forEach((c) => { c.style.setProperty('--ry', (tx * 3).toFixed(2) + 'deg'); c.style.setProperty('--rx', (-ty * 2).toFixed(2) + 'deg'); });
      if (on) { gl.style.opacity = '.55'; gl.style.setProperty('--gx', (100 + tx * 120).toFixed(1) + '%'); }
      if (Math.abs(nx - tx) > .002 || Math.abs(ny - ty) > .002) raf = requestAnimationFrame(apply); };
    const kick = () => { if (!raf) raf = requestAnimationFrame(apply); };
    h.addEventListener('pointermove', (e) => { if (e.pointerType !== 'mouse') return; const r = fr.getBoundingClientRect(); if (r.width < 700) return;
      nx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - .5) * 2)); ny = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - .5) * 2));
      if (!on) { on = true; gl.style.animation = 'none'; } kick(); });
    h.addEventListener('pointerleave', () => { nx = 0; ny = 0; if (gl) gl.style.opacity = '0'; on = false; kick(); });
    // a hidden tab or a blur must not leave the cards tilted
    addEventListener('blur', () => { nx = 0; ny = 0; on = false; if (gl) gl.style.opacity = '0'; kick(); });
  }
  return { wire };
})();
