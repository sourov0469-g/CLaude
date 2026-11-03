/* Trade scenes: markup builders + behaviour. Data are the firm's records (FACTS.md). */
window.Scenes = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const siding = () => `<div class="scene sd" data-scene="sd">
    <div class="floor"></div><div class="flying lap grain" style="--c:#E7E0CF"></div>
    <button class="board" type="button" aria-pressed="false" aria-label="Board and batten sample. Show the record.">
      <span class="face bnb grain" style="--c:#EDE6D6"><span class="tagl">Board &amp; batten</span></span>
      <span class="back"><b>27</b><span>of 415 priced siding jobs went board and batten: 4 ft HardiePanel, 2.5 in battens.</span></span></button>
    <button class="board" type="button" aria-pressed="false" aria-label="Lap siding sample. Show the record.">
      <span class="face lap grain" style="--c:#8E9590"><span class="tagl">HardiePlank lap 8.25 in</span></span>
      <span class="back"><b>301</b><span>of 415 priced siding jobs used the 8.25 in HardiePlank lap board, 7 in exposure.</span></span></button>
    <button class="board" type="button" aria-pressed="false" aria-label="Select Cedarmill texture sample. Show the record.">
      <span class="face lap grain" style="--c:#56605B"><span class="tagl">Select Cedarmill</span></span>
      <span class="back"><b>286</b><span>of 415 chose the Select Cedarmill texture; 36 went smooth.</span></span></button>
    <span class="hint" aria-hidden="true">Tap a board to turn it over</span></div>`;
  const windows = () => `<div class="scene wn" data-scene="wn" role="button" tabindex="0" aria-pressed="false" aria-label="Open the two windows: a casement swings out and a double-hung sash lifts.">
    <div class="beam a"></div><div class="beam b"></div>
    <div class="op a"><div class="inside"></div><div class="frame"></div><div class="sash"></div></div><div class="sill a"></div>
    <div class="op b"><div class="inside"></div><div class="frame"></div><div class="hung top"></div><div class="hung low"></div></div><div class="sill b"></div></div>`;
  const roofing = () => {
    const rows = 9, cols = 13; let s = 21; const r = () => ((s = (s * 16807) % 2147483647) / 2147483647);
    let h = '';
    for (let i = rows - 1; i >= 0; i--) {
      h += `<div class="row" style="top:${i * (100 / rows)}%;height:${100 / rows + 4}%;left:${i % 2 ? -2 : 0}%;right:${i % 2 ? 0 : -2}%">`;
      for (let j = 0; j < cols; j++) { const l = 22 + r() * 12; h += `<i class="tab" style="--t:hsl(${200 + r() * 20},${6 + r() * 6}%,${l}%);--d:${((rows - 1 - i) * 0.07 + j * 0.018).toFixed(3)}s"></i>`; }
      h += '</div>';
    }
    return `<div class="scene rf" data-scene="rf" role="img" aria-label="A shingle roof laid course by course; moving across it runs a wave through the shingles."><div class="plane"><div class="ridge"></div>${h}</div></div>`;
  };

  function wire(root) {
    // entrance: once, when the scene is half in view
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target);
      if (e.target.matches('.rf')) setTimeout(() => e.target.classList.add('settled'), 1700); } }), { threshold: 0.35 });
    root.querySelectorAll('.scene').forEach((sc) => { if (RM) { sc.classList.add('in', 'settled'); } else io.observe(sc); });
    // siding: each board flips to its record
    root.querySelectorAll('.sd .board').forEach((b) => b.addEventListener('click', () => { const on = b.classList.toggle('flip'); b.setAttribute('aria-pressed', on); }));
    // windows: open while pointed at (or tapped), close when left
    root.querySelectorAll('.wn').forEach((w) => {
      const set = (on) => { w.classList.toggle('open', on); w.setAttribute('aria-pressed', on); };
      w.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') set(true); });
      w.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') set(false); });
      // a mouse click never closes what the hover opened; a tap or a key toggles
      w.addEventListener('click', (e) => set(e.pointerType === 'mouse' ? true : !w.classList.contains('open')));
      w.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); set(!w.classList.contains('open')); } });
    });
    // roofing: a wave through the tabs around the pointer; it lies back down when the pointer leaves
    root.querySelectorAll('.rf').forEach((rf) => {
      // tab centres are measured once per visit (relative to the scene), not every frame
      const tabs = [...rf.querySelectorAll('.tab')]; let raf = 0, px = -1e4, py = -1e4, ctr = null, o = null;
      const measure = () => { o = rf.getBoundingClientRect(); ctr = tabs.map((t) => { const b = t.getBoundingClientRect(); return [b.left + b.width / 2 - o.left, b.top + b.height / 2 - o.top]; }); };
      const apply = () => { raf = 0; if (!rf.classList.contains('settled')) return; if (!ctr) measure(); const r = rf.getBoundingClientRect(), dx = r.left - o.left, dy = r.top - o.top;
        tabs.forEach((t, i) => { const d = Math.hypot(ctr[i][0] + o.left + dx - px, ctr[i][1] + o.top + dy - py); const w = d < 170 ? (Math.cos(d / 170 * Math.PI / 2) * 48).toFixed(1) : 0;
          if (t._w !== w) { t._w = w; t.style.setProperty('--w', w); } }); };
      rf.addEventListener('pointerenter', () => { ctr = null; });
      addEventListener('resize', () => { ctr = null; });
      rf.addEventListener('pointermove', (e) => { px = e.clientX; py = e.clientY; if (!raf) raf = requestAnimationFrame(apply); });
      rf.addEventListener('pointerleave', () => { px = py = -1e4; if (!raf) raf = requestAnimationFrame(apply); });
      rf.addEventListener('click', (e) => { px = e.clientX; py = e.clientY; apply(); setTimeout(() => { px = py = -1e4; apply(); }, 700); });
    });
  }
  return { siding, windows, roofing, wire };
})();
