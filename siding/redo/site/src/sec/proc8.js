/* PROCESS M (new-versions addendum, pass 3) — "Your job, in order". Reference: Ever, verified craft only (the apartment
   selection and filtering presentation: filters above, the result set re-flowing beneath, each item gliding to its new
   place, a live count). Pick the job (siding, windows, or both) and the step cards re-sequence into that job's published
   order. Every line is the firm's own wording: the homepage process steps (Proc.CH) and the siding and windows FAQs.
   No per-step duration is invented; only the published totals appear. Nothing game-like; nothing is configured. */
window.Proc8 = (function () {
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  // every step: [id, title, published text, which trade it belongs to ('' = every job), source]
  const S = {
    insp: ['Free inspection', 'A project manager walks every side of the house: siding, trim, windows, roof and gutters. One visit covers every trade.', '', 'Our process'],
    prop: ['Detailed proposal', 'An itemised price for the work you want, nothing else.', '', 'Our process'],
    order: ['Windows built to order', 'The windows themselves are built to order for your openings, so the order comes first; we’ll give you the schedule at your inspection.', 'Windows', 'Windows FAQ'],
    win: ['Windows set and sealed', 'Windows are measured, built to order, then set and sealed. Most of the window-only jobs in our files took two days on site.', 'Windows', 'Our process · Windows FAQ'],
    first: ['Windows go in first', 'When we do both, the windows usually go in first, so the new siding and trim seal cleanly around each opening.', 'Both', 'Windows FAQ'],
    side: ['Old siding off, new boards up', 'Old material off, new boards up, then trim and paint. Most often that’s HardiePlank lap in the 8.25-inch Select Cedar Mill profile, with board and batten as an accent.', 'Siding', 'Our process · Siding FAQ'],
    soffit: ['Soffit and fascia', 'We replace soffit and fascia, which protect your roof’s edges and your home’s ventilation, usually in the same job as the siding.', 'Siding', 'Siding FAQ'],
    paint: ['Paint', 'After the siding goes up we paint it with one of more than 1,700 Sherwin-Williams colors, with free color matching. James Hardie’s ColorPlus siding comes with a factory-baked finish instead.', 'Siding', 'Siding FAQ'],
    final: ['Final check', 'We walk the finished job with you, clear the punch list and leave the site clean. Then the warranties start.', '', 'Our process'] };
  const JOBS = [
    { k: 'siding', t: 'Siding', seq: ['insp', 'prop', 'side', 'soffit', 'paint', 'final'],
      time: ['Time on site', 'A siding replacement typically takes 1 to 2 weeks, including the painting process.'],
      band: ['Price', '$10k–$15k median band (415 priced)'],
      war: ['Warranty', '30-year James Hardie non-prorated warranty, plus our lifetime workmanship warranty on labor.'],
      live: 'Siding: 6 steps, 1 to 2 weeks including paint.' },
    { k: 'windows', t: 'Windows', seq: ['insp', 'prop', 'order', 'win', 'final'],
      time: ['Time on site', 'Most of the window-only jobs in our files took two days on site.'],
      band: ['Price', 'Median band $10,000–$15,000 (376 priced window jobs)'],
      war: ['Warranty', 'Each brand carries its own manufacturer warranty; we add a lifetime workmanship warranty on labor.'],
      live: 'Windows: 5 steps; the order comes first, then most window-only jobs take two days on site.' },
    { k: 'both', t: 'Siding and windows', seq: ['insp', 'prop', 'order', 'first', 'side', 'soffit', 'paint', 'final'],
      time: ['Order of work', 'The windows usually go in first, so the new siding and trim seal cleanly around each opening.'],
      band: ['Price', 'Siding: $10k–$15k median band (415 priced). Windows: median band $10,000–$15,000 (376 priced).'],
      war: ['Warranty', '30-year James Hardie non-prorated warranty on the siding, each window brand’s own warranty, and our lifetime workmanship warranty on labor.'],
      live: 'Siding and windows: 8 steps. The windows are ordered first and go in first.' }];
  const tag = (t) => (t ? `<span class="pmt pmt-${t.toLowerCase()}">${t === 'Both' ? 'Siding and windows' : t}</span>` : '<span class="pmt">Every job</span>');
  const card = (id) => { const s = S[id]; return `<li class="pmc" data-id="${id}"><span class="pmn" aria-hidden="true"></span><div class="pmb">${tag(s[2])}<h3>${s[0]}</h3><p>${s[1]}</p><small>${s[3]}</small></div></li>`; };
  const rail = (j) => [j.time, j.band, j.war, ['Book any day', 'Mon–Fri 8–8 · Sat 8–6 · Sun 12–5']].map((r) => `<div class="pmr"><dt>${r[0]}</dt><dd>${r[1]}</dd></div>`).join('');

  const M = () => { const j = JOBS[0];
    return `<section class="sec prM" id="process" aria-labelledby="prM-h">
    <div class="pmhd"><h2 class="sec-h" id="prM-h" data-split>Your job, in order.</h2>
      <p class="sec-p">Pick the job. The steps re-order themselves into what happens at your house, in our own published words.</p></div>
    <div class="pmf" role="radiogroup" aria-label="Your job">${JOBS.map((x, i) => `<button type="button" role="radio" class="pmj" data-i="${i}" aria-checked="${!i}" tabindex="${i ? -1 : 0}">${x.t}</button>`).join('')}
      <p class="pmcount" aria-hidden="true"><b>${j.seq.length}</b> steps</p></div>
    <div class="pmgrid">
      <ol class="pml">${j.seq.map(card).join('')}</ol>
      <aside class="pmside"><dl class="pmdl">${rail(j)}</dl>
        <a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a></aside>
    </div>
    <p class="pmlive" aria-live="polite"></p></section>`; };

  function wire(root) {
    const s = root.querySelector('.prM'); if (!s || s.dataset.w) return; s.dataset.w = 1;
    const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const list = s.querySelector('.pml'), chips = [...s.querySelectorAll('.pmj')], dl = s.querySelector('.pmdl'), cnt = s.querySelector('.pmcount b'), live = s.querySelector('.pmlive');
    let cur = 0;
    const tpl = document.createElement('template');
    const make = (id) => { tpl.innerHTML = card(id); return tpl.content.firstElementChild; };
    const renum = () => [...list.children].forEach((li, n) => { if (!li.classList.contains('pmgone')) li.querySelector('.pmn').textContent = String(n + 1).padStart(2, '0'); });
    // FLIP: measure, re-order the DOM, measure again, then animate each shared card from its old box to its new one
    const show = (i, say) => { if (i === cur) return; cur = i; const j = JOBS[i];
      chips.forEach((b, n) => { b.setAttribute('aria-checked', n === i); b.tabIndex = n === i ? 0 : -1; });
      dl.innerHTML = rail(j); cnt.textContent = j.seq.length; if (say) live.textContent = j.live;
      [...list.querySelectorAll('.pmgone')].forEach((x) => x.remove());
      const old = new Map([...list.children].map((li) => [li.dataset.id, li.getBoundingClientRect()]));
      const keep = new Map([...list.children].map((li) => [li.dataset.id, li]));
      const leaving = [...list.children].filter((li) => !j.seq.includes(li.dataset.id));
      const next = j.seq.map((id) => keep.get(id) || make(id));
      if (RM) { list.replaceChildren(...next); renum(); return; }
      // leaving cards are lifted out of flow at their old place and fade
      const lb = list.getBoundingClientRect();
      leaving.forEach((li) => { const r = old.get(li.dataset.id); li.classList.add('pmgone');
        Object.assign(li.style, { position: 'absolute', left: r.left - lb.left + 'px', top: r.top - lb.top + 'px', width: r.width + 'px', height: r.height + 'px' }); });
      list.replaceChildren(...next, ...leaving); renum();
      next.forEach((li, n) => { const a = old.get(li.dataset.id), r = li.getBoundingClientRect();
        if (a) { const dx = a.left - r.left, dy = a.top - r.top;
          if (dx || dy) li.animate([{ transform: `translate(${dx}px,${dy}px)` }, { transform: 'none' }], { duration: 700, easing: 'cubic-bezier(.22,1,.36,1)' }); }
        else li.animate([{ opacity: 0, transform: 'translateY(18px) scale(.97)' }, { opacity: 1, transform: 'none' }], { duration: 520, delay: 160 + n * 60, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' }); });
      leaving.forEach((li) => { const a = li.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'scale(.94)' }], { duration: 320, easing: 'ease-in', fill: 'forwards' });
        a.onfinish = () => li.remove(); }); };
    chips.forEach((b, i) => { b.addEventListener('click', () => show(i, true));
      b.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; let n = -1;
        if (d) n = (i + d + chips.length) % chips.length; else if (e.key === 'Home') n = 0; else if (e.key === 'End') n = chips.length - 1;
        if (n >= 0) { e.preventDefault(); show(n, true); chips[n].focus(); } }); });
    renum();
  }
  return { M, wire, S, JOBS };
})();
