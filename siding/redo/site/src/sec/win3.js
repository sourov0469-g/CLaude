/* WINDOWS E and F (overnight ladder, Round 14). Figures: FACTS.md (376 priced window jobs: NT Windows 238, Simonton 54,
   Andersen 38, Pella 31; the remaining 15 other makers or not recorded; median band $10k–$15k; most window-only jobs 2 days).
   E — 376 priced jobs, by maker (Apple AirPods Pro: numbers as events). A unit chart: one small drawn window per priced
       window job, coloured by maker, filling in as it arrives; choose a maker to bring its windows forward.
   F — how each window opens (Graza: the custom-animation bar). Five common window types as line drawings; each shows its
       movement when pointed at, focused or tapped. The types are general; no claim is made about which maker or job. */
window.Win3 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  const book = `<a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a>`;
  const M = [['nt', 'NT Windows', 238], ['si', 'Simonton', 54], ['an', 'Andersen', 38], ['pe', 'Pella', 31], ['ot', 'Other or not recorded', 15]];

  /* ---------- E ---------- */
  const E = () => { let g = '', k = 0; M.forEach(([id, , n]) => { for (let i = 0; i < n; i++, k++) g += `<i class="u ${id}" style="--k:${k}"></i>`; });
    return `<section class="sec wnE" id="windows" aria-labelledby="wnE-h">
      <div class="hd"><h2 class="sec-h" id="wnE-h" data-split>376 priced window jobs, by maker.</h2><p class="sec-p">Each small window is one priced job from our records.</p></div>
      <div class="wrap"><div class="side"><div class="mk" role="group" aria-label="Show a maker">${M.map(([id, n, c]) => `<button type="button" data-m="${id}" aria-pressed="false"><i class="sw ${id}" aria-hidden="true"></i><span>${n}</span><b>${c}</b></button>`).join('')}</div>
          <dl class="fx"><div><dt>$10k–$15k</dt><dd>median band across 376 priced jobs</dd></div><div><dt>2 days</dt><dd>most window-only jobs</dd></div><div><dt>388</dt><dd>documented window jobs in all</dd></div></dl>${book}</div>
        <div class="units" role="img" aria-label="A chart of 376 small windows: 238 NT Windows, 54 Simonton, 38 Andersen, 31 Pella, 15 other makers or not recorded.">${g}</div></div></section>`; };

  function wireE(root) {
    const s = root.querySelector('.wnE'); if (!s) return; const units = s.querySelector('.units'), bs = [...s.querySelectorAll('.mk button')];
    const set = (m) => { units.dataset.m = m || ''; bs.forEach((b) => b.setAttribute('aria-pressed', b.dataset.m === m)); };
    let held = '';
    bs.forEach((b) => { b.addEventListener('click', () => { held = held === b.dataset.m ? '' : b.dataset.m; set(held); }); b.addEventListener('pointerenter', () => set(b.dataset.m)); b.addEventListener('pointerleave', () => set(held)); b.addEventListener('focus', () => set(b.dataset.m)); b.addEventListener('blur', () => set(held)); });
    if (RM) s.classList.add('in'); else new IntersectionObserver((es, io) => es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); s.classList.add('in'); } }), { threshold: 0.3 }).observe(units);
  }

  /* ---------- F ---------- */
  const TYPES = [['single', 'Single-hung', 'The lower sash slides up; the upper stays put.'], ['double', 'Double-hung', 'Both sashes slide, up and down.'],
    ['case', 'Casement', 'Hinged at the side; swings out like a door.'], ['slide', 'Slider', 'One sash glides sideways past the other.'], ['pic', 'Picture', 'Fixed glass: it does not open, it frames the view.']];
  const draw = (k) => { const fr = '<rect class="fr" x="10" y="10" width="140" height="190" rx="2"/>';
    if (k === 'single') return `${fr}<rect class="sa fx" x="20" y="20" width="120" height="86"/><g class="mv up"><rect class="sa" x="20" y="104" width="120" height="86"/><path class="hd" d="M66 104h28"/></g>`;
    if (k === 'double') return `${fr}<g class="mv dn"><rect class="sa" x="20" y="20" width="120" height="86"/></g><g class="mv up"><rect class="sa" x="20" y="104" width="120" height="86"/><path class="hd" d="M66 104h28"/></g>`;
    if (k === 'case') return `${fr}<g class="mv sw"><rect class="sa" x="20" y="20" width="120" height="170"/><path class="hd" d="M128 98v14"/></g><path class="hg" d="M20 40v6M20 160v6"/>`;
    if (k === 'slide') return `${fr}<rect class="sa fx" x="20" y="20" width="66" height="170"/><g class="mv rt"><rect class="sa" x="74" y="20" width="66" height="170"/><path class="hd" d="M86 98v14"/></g>`;
    return `${fr}<rect class="sa fx" x="20" y="20" width="120" height="170"/><path class="gl" d="M40 60l30-30M40 110l70-70"/>`; };
  const F = () => `<section class="sec wnF" id="windows" aria-labelledby="wnF-h">
    <div class="hd"><h2 class="sec-h" id="wnF-h" data-split>How each window opens.</h2><p class="sec-p">Five common types. Point at one, or tap it, to see it move.</p></div>
    <ul class="ty">${TYPES.map(([k, n, d]) => `<li><button type="button" class="tp" data-k="${k}" aria-pressed="false"><svg viewBox="0 0 160 210" aria-hidden="true">${draw(k)}</svg><b>${n}</b><span>${d}</span></button></li>`).join('')}</ul>
    <div class="sfoot"><p>Not sure which suits a room? We measure every opening at the free inspection. Most window-only jobs take <b>2 days</b>.</p>${book}</div></section>`;

  function wireF(root) {
    const s = root.querySelector('.wnF'); if (!s) return; const tps = [...s.querySelectorAll('.tp')];
    tps.forEach((t) => { t.addEventListener('click', () => { const on = t.getAttribute('aria-pressed') !== 'true'; t.setAttribute('aria-pressed', on); });
      t.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') t.classList.add('mv-on'); }); t.addEventListener('pointerleave', () => t.classList.remove('mv-on')); });
    // on arrival each one opens once, in turn, then closes: the motion is shown, not looped
    if (!RM) new IntersectionObserver((es, io) => es.forEach((e) => { if (!e.isIntersecting) return; io.disconnect(); tps.forEach((t, i) => { setTimeout(() => t.classList.add('mv-on'), 300 + i * 260); setTimeout(() => t.classList.remove('mv-on'), 1500 + i * 260); }); }), { threshold: 0.4 }).observe(s.querySelector('.ty'));
  }
  return { E, F, wire(root) { wireE(root); wireF(root); } };
})();
