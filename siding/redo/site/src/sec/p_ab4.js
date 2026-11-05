/* ABOUT PAGE · 4 How we work. The firm's own wording from the homepage: one free inspection covers every trade on the house;
   a project manager walks every side of the house (siding, trim, windows, roof and gutters); the four steps (Proc.CH);
   an itemised price for the work you want, nothing else; replaced by the full wall or the whole house, no patch repairs;
   we walk the finished job with you, clear the punch list and leave the site clean; then the warranties start; the hours.
   A — one visit, every trade (Cash App Brand Guidelines: one idea, shown). One inspection card ticking the five things
       walked, beside the four steps in a row.
   B — the four steps, down a rail (Apple AirPods Pro: one step at a time). A vertical rail; each step lights as it reaches
       the middle of the screen; the hours sit at the top of the rail.
   C — house rules (Dropbox Brand: a short list, set large). The practices we state on the site, one rule per line. */
window.PAb4 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const B = () => window.PB;
  const CH = () => (window.Proc ? Proc.CH : []).map((c) => ({ ...c, p: c.p.replace(/ Here is where our documented jobs actually landed\./, '') })); // that line points at a homepage chart
  const WALK = ['Siding', 'Trim', 'Windows', 'Roof', 'Gutters'];

  const A = () => `<section class="sec ab4A" id="about-how" aria-labelledby="ab4A-h">
    <div class="hd"><h2 class="sec-h" id="ab4A-h" data-split>One visit, every trade.</h2><p class="sec-p">The free inspection: a project manager walks every side of the house. One visit covers every trade.</p></div>
    <div class="wrap"><div class="ic3"><p class="pkick">The inspection walks</p><ul>${WALK.map((w) => `<li><i aria-hidden="true"></i>${w}</li>`).join('')}</ul><p class="hr2">Book any day: Mon–Fri 8–8 · Sat 8–6 · Sun 12–5</p></div>
      <ol class="sp5">${CH().map((c) => `<li><b>${c.n}</b><h3>${c.t}</h3><p>${c.p}</p></li>`).join('')}</ol></div></section>`;

  const Bv = () => `<section class="sec ab4B" id="about-how" aria-labelledby="ab4B-h">
    <div class="hd"><h2 class="sec-h" id="ab4B-h" data-split>How every job runs.</h2></div>
    <div class="rail2"><p class="top2">Inspections: Mon–Fri 8–8 · Sat 8–6 · Sun 12–5</p><i class="tr2" aria-hidden="true"><i class="fl2"></i></i>
      <ol>${CH().map((c, i) => `<li data-i="${i}"><span class="dot"><b>${c.n}</b></span><div><h3>${c.t}</h3><p>${c.p}</p></div></li>`).join('')}</ol></div></section>`;

  const RULES = [['One visit covers every trade.', 'A project manager walks every side of the house: siding, trim, windows, roof and gutters.'], ['An itemised price for the work you want, nothing else.', 'That is the detailed proposal.'],
    ['The full wall or the whole house.', 'No patch repairs.'], ['We walk the finished job with you.', 'We clear the punch list and leave the site clean.'], ['Then the warranties start.', 'A lifetime workmanship warranty on labor, plus the maker’s.']];
  const C = () => `<section class="sec ab4C" id="about-how" aria-labelledby="ab4C-h">
    <div class="hd"><h2 class="sec-h" id="ab4C-h" data-split>House rules.</h2><p class="sec-p">What we say we do, on every job.</p></div>
    <ol class="rules">${RULES.map(([a, b], i) => `<li><span class="n5">${i + 1}</span><div><p class="r7">${a}</p><p class="r8">${b}</p></div></li>`).join('')}</ol></section>`;

  function wireB(root) { const s = root.querySelector('.ab4B'); if (!s) return; const li = [...s.querySelectorAll('.rail2 li')], fl = s.querySelector('.fl2'); s.classList.add('js');
    if (RM) { li.forEach((l) => l.classList.add('on')); fl.style.height = '100%'; return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('on'); const n = li.filter((l) => l.classList.contains('on')).length; fl.style.height = (n / li.length * 100) + '%'; } }), { rootMargin: '-45% 0px -45% 0px' });
    li.forEach((l) => io.observe(l)); }
  return { A, B: Bv, C, wire(root) { wireB(root); } };
})();
