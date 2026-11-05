/* The cursor companion (one ring + one vial). Created only for a fine pointer with hover and no reduced-motion preference. The ring follows with a short ease; the vial trails on a
   spring and its bubble slides opposite to the acceleration, like a real spirit level. States come from the element under the pointer: link (buttons, links, controls), drag
   (data-cur="drag", or the window / recolour stages), native (form fields: the system cursor takes over), plain. Press shrinks it. Everything stops when the pointer leaves the window, the tab hides, or the window blurs. */
window.FCursor = (function () {
  function init() {
    if (window.__cu) return; if (!matchMedia('(hover: hover) and (pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ring = document.createElement('div'), vial = document.createElement('div'); ring.className = 'cu-ring'; vial.className = 'cu-vial'; ring.setAttribute('aria-hidden', 'true'); vial.setAttribute('aria-hidden', 'true');
    ring.innerHTML = '<i></i><b></b>'; vial.innerHTML = '<i></i>'; document.body.append(ring, vial); const bub = vial.firstChild, root = document.documentElement;
    window.__cu = { ring, vial };
    let x = -100, y = -100, rx = x, ry = y, vx = x + 26, vy = y + 24, vvx = 0, vvy = 0, bx = 0, by = 0, bvx = 0, bvy = 0, raf = 0, last = 0, on = false, down = false, kind = '', px = x, py = y;
    const LINK = 'a[href],button,[role="button"],[role="radio"],summary,label,select,[data-cur="link"],.tag,.vz-sw,.wn-k,.wn-c';
    const DRAG = '[data-cur="drag"],.wn-hit,.vz-cv';
    function classify(t) { if (!t || !t.closest) return ''; if (t.closest('input,textarea,select,[contenteditable="true"]')) return 'native'; if (t.closest(DRAG)) return 'drag'; if (t.closest(LINK)) return 'link'; return ''; }
    function set(k) { if (k === kind) return; ring.classList.remove('link', 'drag'); if (k === 'link' || k === 'drag') ring.classList.add(k); ring.classList.toggle('hide', k === 'native'); vial.classList.toggle('hide', k === 'native'); root.classList.toggle('cu-field', k === 'native'); kind = k; }
    function show(v) { on = v; root.classList.toggle('cu-on', v); if (v) kick(); }
    function frame(ts) { raf = 0; const dt = Math.min(.04, (ts - (last || ts)) / 1000 || .016); last = ts;
      rx += (x - rx) * (1 - Math.pow(.0001, dt)); ry += (y - ry) * (1 - Math.pow(.0001, dt));
      // the vial: a spring toward the pointer (offset below and right), the bubble answers its acceleration
      const tx = x + 26, ty = y + 24, ax = (tx - vx) * 150 - vvx * 17, ay = (ty - vy) * 150 - vvy * 17; vvx += ax * dt; vvy += ay * dt; vx += vvx * dt; vy += vvy * dt;
      const tilt = Math.max(-18, Math.min(18, vvx * .018)); bvx += (-(bx) * 120 - bvx * 11 - ax * .0016 * 38) * dt; bx += bvx * dt; bx = Math.max(-11, Math.min(11, bx));
      ring.style.transform = `translate3d(${rx.toFixed(1)}px,${ry.toFixed(1)}px,0)`; vial.style.transform = `translate3d(${vx.toFixed(1)}px,${vy.toFixed(1)}px,0) rotate(${tilt.toFixed(1)}deg)`; bub.style.transform = `translateX(${bx.toFixed(1)}px)`;
      const still = Math.abs(x - rx) < .1 && Math.abs(y - ry) < .1 && Math.abs(tx - vx) < .1 && Math.abs(ty - vy) < .1 && Math.abs(vvx) < .5 && Math.abs(vvy) < .5 && Math.abs(bx) < .05 && Math.abs(bvx) < .2;
      if (on && !still) raf = requestAnimationFrame(frame); else last = 0; }
    const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };
    addEventListener('pointermove', (e) => { if (e.pointerType !== 'mouse') { show(false); return; } x = e.clientX; y = e.clientY; if (!on) { rx = x; ry = y; vx = x + 26; vy = y + 24; vvx = vvy = 0; show(true); } set(classify(e.target)); kick(); }, { passive: true });
    addEventListener('pointerdown', (e) => { if (e.pointerType === 'mouse') { down = true; ring.classList.add('down'); } }, true);
    addEventListener('pointerup', () => { down = false; ring.classList.remove('down'); }, true); addEventListener('pointercancel', () => { down = false; ring.classList.remove('down'); }, true);
    document.documentElement.addEventListener('pointerleave', () => show(false)); document.addEventListener('mouseleave', () => show(false));
    addEventListener('blur', () => show(false)); document.addEventListener('visibilitychange', () => { if (document.hidden) show(false); });
    addEventListener('pointerdown', (e) => { if (e.pointerType === 'touch' || e.pointerType === 'pen') show(false); }, true);
  }
  return { init };
})();
