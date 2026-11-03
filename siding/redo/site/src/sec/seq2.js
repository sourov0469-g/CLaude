/* TRY THE JOB, new versions for upgrade Round 4. Same four small jobs and the same game code as A/B (Seq.games); neither
   new version moves sideways (the correction: Services and Try the job must not repeat one sideways rhythm).
   C — the workbench (Graza: the custom-animation quality bar). All four jobs on one bench, in a grid, with a tally that
       fills as each is done; every job also has a "do it for me" button and a keyboard path.
   D — the dive (the owner's one idea, Lusion-type, built in this one version only). An empty white section with one small
       window at its bottom-right corner; as the section pins, the view moves to that corner and goes in through the
       window, and the toolbox opens from inside it, on the room's own colour. */
window.Seq2 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  const book = `<a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a>`;
  const TICK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const G = () => (window.Seq ? Seq.G : []);
  const ICON = { board: '<path d="M3 6h18M3 12h18M3 18h18"/><path d="M9 6v12" opacity=".5"/>', caulk: '<path d="M3 9h11v6H3zM14 11h5l2 1-2 1h-5M7 15v4h4"/>',
    gutter: '<path d="M3 7v4a3 3 0 003 3h12a3 3 0 003-3V7M18 14v6"/>', paint: '<path d="M4 4h12v6H4zM10 10v3M8 13h4v8H8z"/>' };
  const ico = (k) => `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${ICON[k]}</svg>`;

  /* ---------- C ---------- */
  const C = () => `<section class="sec sqC" id="try" aria-labelledby="sqC-h">
    <div class="hd"><div><h2 class="sec-h" id="sqC-h" data-split>Four small jobs, one bench.</h2><p class="sec-p">Try each one by hand, or press the button and watch it done.</p></div>
      <div class="tally" aria-label="Jobs done">${G().map((g) => `<span class="tl" data-t="${g.k}"><i></i>${ico(g.k)}<b>${g.t}</b></span>`).join('')}</div></div>
    <div class="bench">${G().map((g, i) => Seq.panel(g, i)).join('')}</div>
    <div class="sft"><p class="score" aria-live="polite">0 of 4 done.</p><p class="sm">That was the small part. The whole house is one free inspection away.</p>${book}</div></section>`;

  function wireC(root) { const s = root.querySelector('.sqC'); if (!s || !window.Seq) return; Seq.games(root, s);
    if (!RM) new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in'); }), { threshold: 0.25 }).observe(s.querySelector('.bench')); else s.querySelector('.bench').classList.add('in'); }

  /* ---------- D ---------- */
  const D = () => `<section class="sec sqD" id="try" aria-labelledby="sqD-h">
    <div class="dive" aria-hidden="true"><div class="dst"><div class="dscene">
      <div class="portal"><div class="room"><i class="lampg"></i><i class="shelf"></i><i class="pane"></i></div><i class="glass"></i><i class="fr"></i><i class="sill"></i></div>
      <span class="lbl">Step inside <svg viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
    </div></div></div>
    <div class="inside"><div class="hd"><h2 class="sec-h" id="sqD-h" data-split>Try the job yourself.</h2><p class="sec-p">Four small jobs from our trades. Pick a tool.</p></div>
      <div class="box"><div class="rail" role="tablist" aria-label="Tools" aria-orientation="vertical">${G().map((g, i) => `<button type="button" role="tab" class="tl" data-t="${g.k}" id="sqD-t${i}" aria-selected="${!i}" aria-controls="sqD-p${i}" tabindex="${i ? -1 : 0}">${ico(g.k)}<span>${g.t}</span><i></i></button>`).join('')}
          <p class="score" aria-live="polite">0 of 4 done.</p></div>
        <div class="bench">${G().map((g, i) => Seq.panel(g, i).replace('<article class="gm"', `<article class="gm" role="tabpanel" id="sqD-p${i}" ${i ? 'hidden' : ''}`)).join('')}</div></div>
      <div class="sft">${book}</div></div></section>`;

  function wireD(root) {
    const s = root.querySelector('.sqD'); if (!s || !window.Seq) return; Seq.games(root, s);
    const tabs = [...s.querySelectorAll('.rail [role=tab]')], pans = [...s.querySelectorAll('.bench .gm')];
    const pick = (i, f) => { tabs.forEach((t, k) => { t.setAttribute('aria-selected', k === i); t.tabIndex = k === i ? 0 : -1; pans[k].hidden = k !== i; }); if (f) tabs[i].focus(); pans[i].classList.remove('show'); void pans[i].offsetWidth; pans[i].classList.add('show'); };
    tabs.forEach((t, i) => { t.addEventListener('click', () => pick(i)); t.addEventListener('keydown', (e) => { const d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key]; if (d) { e.preventDefault(); pick((i + d + tabs.length) % tabs.length, true); } }); });
    // the dive: the view travels to the window in the corner and goes in through it
    const dive = s.querySelector('.dive'), scene = s.querySelector('.dscene'), room = s.querySelector('.room .pane');   // the dive goes in through one pane, clear of the glazing bars
    if (RM) { dive.hidden = true; return; }
    const sm = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
    let R = null, raf = 0;
    const measure = () => { scene.style.transform = 'none'; const r = room.getBoundingClientRect(), sr = scene.getBoundingClientRect(); R = { x: r.left - sr.left + r.width / 2, y: r.top - sr.top + r.height / 2, w: r.width, h: r.height, W: sr.width, H: sr.height }; };
    function upd() { raf = 0; if (!R) measure(); const r = dive.getBoundingClientRect(), tot = dive.offsetHeight - innerHeight, p = Math.max(0, Math.min(1, -r.top / Math.max(1, tot)));
      const S = Math.max(R.W / R.w, R.H / R.h) * 1.3, e = sm(0.06, 0.92, p), sc = Math.pow(S, e), m = sm(0, 0.72, p);
      scene.style.transformOrigin = `${R.x}px ${R.y}px`; scene.style.transform = `translate(${((R.W / 2 - R.x) * m).toFixed(1)}px,${((R.H / 2 - R.y) * m).toFixed(1)}px) scale(${sc.toFixed(4)})`;
      s.style.setProperty('--g', (1 - sm(0.3, 0.62, p)).toFixed(3)); s.style.setProperty('--l', (1 - sm(0.02, 0.16, p)).toFixed(3)); s.style.setProperty('--dv', p.toFixed(3)); }
    addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(upd); }, { passive: true }); addEventListener('resize', () => { R = null; upd(); }); upd();
  }
  return { C, D, wire(root) { wireC(root); wireD(root); } };
})();
