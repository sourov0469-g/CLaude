/* WINDOWS L (new-versions addendum, pass 2) — "Lift the sash". Reference: MERSI (its seam, the annex's source for any
   before/after centrepiece), turned into a window's meeting rail. Markup is built in Python (winL in build_site.py)
   from the four published window pairs; this module only wires it. Each window is a toggle button (aria-pressed):
   lifting it raises the after photo from the sill while the rail rides the seam (CSS, one registered property).
   "Lift every sash" raises all four, 140 ms apart. Not a game, not a configurator. */
window.Win7 = (function () {
  function wire(root) {
    const s = root.querySelector('.wnL'); if (!s || s.dataset.w) return; s.dataset.w = 1;
    const fs = [...s.querySelectorAll('.wlf')], all = s.querySelector('.wlall'), timers = [];
    const set = (b, on) => { b.setAttribute('aria-pressed', on); b.setAttribute('aria-label', b.getAttribute('aria-label').replace(/: (show the new|show the old) windows$/, on ? ': show the old windows' : ': show the new windows')); };
    const label = (on) => { all.setAttribute('aria-pressed', on); const t = on ? 'Lower every sash' : 'Lift every sash';
      all.textContent = t; delete all.dataset.bxr; if (window.Bx && Bx.roll) Bx.roll(all); };
    const sync = () => label(fs.every((b) => b.getAttribute('aria-pressed') === 'true'));
    fs.forEach((b) => b.addEventListener('click', () => { set(b, b.getAttribute('aria-pressed') !== 'true'); sync(); }));
    all.addEventListener('click', () => { timers.forEach(clearTimeout); timers.length = 0; const on = all.getAttribute('aria-pressed') !== 'true';
      fs.forEach((b, i) => timers.push(setTimeout(() => set(b, on), i * 140))); label(on); });
  }
  return { wire };
})();
