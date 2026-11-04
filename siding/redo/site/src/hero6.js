/* HERO M — "A house built from our jobs" (Quiet Cubes: modular, calm, tactile). The 43 published project photos stand
   as blocks of a house (markup in build_site.py, heroM). On arrival the house is set course by course from the ground
   up; pointing at or focusing a block lifts it and the plate reads its record; three chips light one part of the
   house. One tab stop for the whole house, arrow keys between blocks, Enter opens the project page. */
window.Hero6 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const NAME = { roof: 'the roof', wall: 'the walls', ground: 'ground level' };
  function m(h) {
    if (h.dataset.w) return; h.dataset.w = '1';
    const house = h.querySelector('.mhouse'), bs = [...h.querySelectorAll('.mhb')], plate = h.querySelector('.mplate'), chips = [...h.querySelectorAll('.mpc')];
    const def = plate.innerHTML;
    const pos = bs.map((b) => { const a = b.style.gridArea.split('/').map((x) => parseInt(x, 10)); return { r: a[0], c: a[1] }; });
    const show = (b) => { bs.forEach((x) => x.classList.toggle('on', x === b));
      plate.innerHTML = b ? `<b>${esc(b.dataset.pl)}</b><span>${esc(b.dataset.wh)} · ${esc(b.dataset.tr)}</span><small>${esc(NAME[b.dataset.part])}</small>` : def; };
    bs.forEach((b, i) => {
      b.addEventListener('pointerenter', () => show(b));
      b.addEventListener('focus', () => show(b));
      b.addEventListener('keydown', (e) => {
        const p = pos[i]; let j = -1;
        if (e.key === 'ArrowRight') j = Math.min(bs.length - 1, i + 1);
        else if (e.key === 'ArrowLeft') j = Math.max(0, i - 1);
        else if (e.key === 'Home') j = 0; else if (e.key === 'End') j = bs.length - 1;
        else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {      // the nearest block in the course above or below
          const rows = [...new Set(pos.map((q) => q.r))].sort((a, b) => a - b), k = rows.indexOf(p.r) + (e.key === 'ArrowUp' ? -1 : 1);
          if (k >= 0 && k < rows.length) { let best = 1e9; pos.forEach((q, n) => { if (q.r === rows[k] && Math.abs(q.c - p.c) < best) { best = Math.abs(q.c - p.c); j = n; } }); }
        }
        if (j < 0) return; e.preventDefault(); bs[i].tabIndex = -1; bs[j].tabIndex = 0; bs[j].focus();
      });
    });
    house.addEventListener('pointerleave', () => { if (!house.contains(document.activeElement)) show(null); });
    house.addEventListener('focusout', (e) => { if (!house.contains(e.relatedTarget)) show(null); });
    chips.forEach((c) => c.addEventListener('click', () => {
      const on = c.getAttribute('aria-pressed') !== 'true';
      chips.forEach((x) => x.setAttribute('aria-pressed', String(on && x === c)));
      if (on) house.dataset.lit = c.dataset.part; else delete house.dataset.lit;
    }));
    // arrival: once, courses set from the ground up (the order is in each block's --d)
    if (RM) { h.classList.add('mgo', 'mdone'); return; }
    requestAnimationFrame(() => requestAnimationFrame(() => { h.classList.add('mgo'); setTimeout(() => h.classList.add('mdone'), 47 * 30 + 700); }));
  }
  function wire() { const h = document.querySelector('.slot[data-slot=hero] .hero'); if (h && h.matches('.hmv')) m(h); }
  return { wire };
})();
