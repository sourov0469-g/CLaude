/* SIDING PAGE · 4 Warranty and time on site. As published on the homepage: 30-year James Hardie non-prorated warranty;
   lifetime workmanship warranty on labor; 1–2 weeks on site, including paint; replaced by the full wall or the whole
   house, no patch repairs; the install order: old material off, new boards up, then trim and paint; final walk-through.
   A — two certificates (Scout Motors: heritage paper, plainly set). The two warranties as two certificates with seals,
       and the time on site underneath.
   B — year by year (Graza: the custom-animation bar). One slider from the day the job ends to 40 years on; both warranties
       read out for that year.
   C — in order, on site (Quiet Cubes: calm). The job as a strip of steps in order (not to scale), the 1–2 weeks above it
       and the two warranties starting at the end. */
window.PSd4 = (function () {
  const B = () => window.PB;
  const SEAL = (t) => `<svg class="seal2" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="44"/><circle cx="50" cy="50" r="34" class="i"/><text x="50" y="47">${t}</text><text x="50" y="62" class="s">WARRANTY</text></svg>`;

  /* ---------- A ---------- */
  const A = () => `<section class="sec sd4A" id="siding-warranty" aria-labelledby="sd4A-h">
    <div class="hd"><h2 class="sec-h" id="sd4A-h" data-split>Two warranties on every siding job.</h2><p class="sec-p">One from James Hardie for the board, one from us for the work.</p></div>
    <div class="certs"><article class="cert">${SEAL('30 YR')}<p class="pkick">James Hardie</p><h3>30-year non-prorated warranty</h3><p>On the siding, installed by a James Hardie Elite Preferred contractor.</p></article>
      <article class="cert alt2">${SEAL('LIFE')}<p class="pkick">Austin Pro</p><h3>Lifetime workmanship warranty</h3><p>On our labor.</p></article></div>
    <ul class="tm2"><li><b>1–2 weeks</b> on site, including paint</li><li><b>Full wall or whole house</b>, no patch repairs</li></ul></section>`;

  /* ---------- B ---------- */
  const Bv = () => `<section class="sec sd4B" id="siding-warranty" aria-labelledby="sd4B-h">
    <div class="hd"><h2 class="sec-h" id="sd4B-h" data-split>Year by year.</h2><p class="sec-p">Move the year and read what still covers the siding. Non-prorated means the James Hardie cover does not shrink as the years go by.</p></div>
    <div class="yr"><label class="vh6" for="sd4B-r">Years after the job</label><input id="sd4B-r" type="range" min="0" max="40" value="12" aria-valuetext="Year 12">
      <div class="rul" aria-hidden="true">${[0, 10, 20, 30, 40].map((v) => `<span style="left:${(v / 40) * 100}%">${v ? 'Year ' + v : 'Job done'}</span>`).join('')}<i class="hw"></i><i class="lw"></i></div>
      <div class="out2" aria-live="polite"><div class="o1"><small>James Hardie siding</small><b></b><span></span></div><div class="o2"><small>Our workmanship, on labor</small><b>Covered</b><span>Lifetime warranty</span></div></div></div>
    <p class="ft6">Before all of that: <b>1–2 weeks</b> on site, including paint, by the full wall or the whole house.</p></section>`;

  /* ---------- C ---------- */
  const STEPS = ['Old siding off', 'New boards up', 'Trim', 'Paint', 'Walk-through'];
  const C = () => `<section class="sec sd4C" id="siding-warranty" aria-labelledby="sd4C-h">
    <div class="hd"><h2 class="sec-h" id="sd4C-h" data-split>On site, in order.</h2><p class="sec-p">By the full wall or the whole house; no patch repairs.</p></div>
    <div class="run"><p class="span2"><b>1–2 weeks</b> on site, including paint</p>
      <ol class="stps">${STEPS.map((t, i) => `<li style="--i:${i}"><i>${i + 1}</i><span>${t}</span></li>`).join('')}</ol><p class="ns">Order, not to scale.</p></div>
    <div class="then"><p class="pkick">Then, from the last day</p><div class="ws"><p><b>30-year</b> James Hardie non-prorated warranty</p><p><b>Lifetime</b> workmanship warranty on labor</p></div></div>
    <div class="pacts">${B().book()}${B().call()}</div></section>`;

  function wireB(root) { const s = root.querySelector('.sd4B'); if (!s) return; const r = s.querySelector('input'), b = s.querySelector('.o1 b'), sp = s.querySelector('.o1 span');
    const upd = () => { const y = +r.value; r.setAttribute('aria-valuetext', y ? `Year ${y}` : 'The day the job is done'); s.style.setProperty('--y', (y / 40) * 100 + '%');
      if (y <= 30) { b.textContent = 'Covered'; sp.textContent = y ? `Year ${y} of 30, non-prorated` : 'The 30 years start'; s.classList.remove('past'); } else { b.textContent = 'Past 30 years'; sp.textContent = 'The James Hardie warranty runs 30 years'; s.classList.add('past'); } };
    r.addEventListener('input', upd); upd(); }
  function wireC(root) { const s = root.querySelector('.sd4C'); if (!s) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { s.classList.add('go'); return; }
    new IntersectionObserver((es, io) => es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); s.classList.add('go'); } }), { threshold: 0.35 }).observe(s.querySelector('.run')); }
  return { A, B: Bv, C, wire(root) { wireB(root); wireC(root); } };
})();
