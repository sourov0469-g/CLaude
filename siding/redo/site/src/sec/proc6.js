/* PROCESS K — "Handed along" (new-versions addendum; Quiet Cubes: the service as a staffed design service).
   The four real steps (Proc.CH) as stations on one rail, each staffed by the people homeowners name at that step in their
   published reviews (window.__REV). Quotes are exact substrings (the build throws otherwise); names exactly as written; no
   job titles claimed. A lime baton is handed along the rail; the tab panel shows the step's own line and the quotes. */
window.Proc6 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  const ARR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const REV = () => window.__REV || [];
  // [step, names shown on the rail, quotes: [review index, exact excerpt, the name as written inside it]]
  const ST = [
    [0, ['Paul Hale'], [[17, 'Paul Hale came out and explained the process, the windows and the costs', 'Paul Hale'], [20, 'Paul Hale arrived and was able to get an in-person inspection of the roof', 'Paul Hale']]],
    [1, ['Jake', 'Tracy', 'Taylor'], [[26, 'Jake handled our initial bid and was incredibly thorough', 'Jake'], [29, 'Tracy provided us with a great, no pressure estimate', 'Tracy'], [10, 'Special shout out to Taylor. This was a big project and he was so patient with sending over multiple quotes', 'Taylor']]],
    [2, ['Kevin', 'Paul Schantz'], [[26, 'Kevin made the scheduling side of things a breeze', 'Kevin'], [17, "Paul Schantz's sent a crew that was polite, timely, knowledgeable and respectful", 'Paul Schantz']]],
    [3, ['Garrett'], [[1, 'Garret did a good job on the punch out', 'Garret'], [13, 'Garrett was extremely thorough with punch out', 'Garrett'], [10, 'Garrett who finished up and also swept the pollen off my deck', 'Garrett']]]];
  const CH = () => (window.Proc ? Proc.CH : []);
  const line = (k) => { const p = (CH()[k] || {}).p || ''; return k === 1 ? p.split('. Here is')[0] + '.' : p; };

  function quote(i, t, nm) {
    const r = REV()[i]; if (!r || !r.text.includes(t)) throw new Error('not verbatim: ' + t);
    let h = esc(t); if (nm) h = h.replace(esc(nm), `<mark>${esc(nm)}</mark>`);
    return `<figure class="pq6"><blockquote><p>“${/^[a-z]/.test(t) ? '…' : ''}${h}${/[.!?]$/.test(t) ? '' : '…'}”</p></blockquote><figcaption>${esc(r.name.trim())} · Google review</figcaption></figure>`;
  }
  const panel = (k) => { const [s, , qs] = ST[k], c = CH()[s] || {};
    return `<div class="pn6"><p class="pk6">Step ${c.n} · ${c.t}</p><p class="pl6">${esc(line(s))}</p>
      <button type="button" class="nx6">${k < ST.length - 1 ? `Hand it on: ${CH()[k + 1].t}` : 'Start over'}${ARR}</button></div>
      <div class="qs6">${qs.map(([i, t, nm]) => quote(i, t, nm)).join('')}</div>`; };

  const K = () => `<section class="sec prK" id="process" aria-labelledby="prK-h">
    <div class="hd"><p class="kk">How a job runs · who you'll meet</p><h2 class="sec-h" id="prK-h" data-split>Four steps. Named people at each one.</h2>
      <p class="sec-p">From the free inspection to the final walk-through: the people homeowners name in their published reviews, at the step where they met them. Names as they wrote them.</p></div>
    <div class="rl6"><div class="tl6" role="tablist" aria-label="The four steps">${ST.map(([s, nms], k) => `<button type="button" role="tab" class="st6" id="prK-t${k}" aria-controls="prK-p" aria-selected="${!k}" tabindex="${k ? -1 : 0}">
        <span class="sn6">${(CH()[s] || {}).n} · ${(CH()[s] || {}).t}</span><span class="nm6">${nms.map((n) => `<b>${esc(n)}</b>`).join('')}</span><i class="dt6" aria-hidden="true"></i></button>`).join('')}</div>
      <i class="tr6" aria-hidden="true"></i><i class="bt6" aria-hidden="true"></i></div>
    <div class="pnl6" id="prK-p" role="tabpanel" aria-labelledby="prK-t0" tabindex="0">${panel(0)}</div>
    <div class="ft6"><p>One visit covers every trade on the house. Mon–Fri 8–8, Sat 8–6, Sun 12–5.</p><a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a></div></section>`;

  function wire(root) {
    const s = root.querySelector('.prK'); if (!s) return;
    const tabs = [...s.querySelectorAll('.st6')], pnl = s.querySelector('.pnl6'), bt = s.querySelector('.bt6'), rl = s.querySelector('.rl6'), tl = s.querySelector('.tl6');
    let cur = 0;
    const place = (smooth) => { const t = tabs[cur], d = t.querySelector('.dt6'), a = rl.getBoundingClientRect(), b = d.getBoundingClientRect();
      bt.style.transition = smooth && !RM ? 'transform .7s cubic-bezier(.34,1.45,.5,1)' : 'none'; bt.style.transform = `translate(${b.left - a.left + b.width / 2}px, ${b.top - a.top + b.height / 2}px)`; };
    function go(k, focus) {
      k = (k + ST.length) % ST.length; if (k === cur && !focus) return; cur = k;
      tabs.forEach((t, i) => { t.setAttribute('aria-selected', i === k); t.tabIndex = i === k ? 0 : -1; t.classList.toggle('past', i < k); });
      pnl.setAttribute('aria-labelledby', tabs[k].id); pnl.innerHTML = panel(k); pnl.classList.remove('in6'); void pnl.offsetWidth; pnl.classList.add('in6');
      if (focus) tabs[k].focus({ preventScroll: true });
      tabs[k].scrollIntoView({ block: 'nearest', inline: 'center', behavior: RM ? 'auto' : 'smooth' });
      place(true); setTimeout(() => place(false), 450);
    }
    tabs.forEach((t, i) => { t.addEventListener('click', () => go(i));
      t.addEventListener('keydown', (e) => { const n = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: ST.length - 1 }[e.key]; if (n === undefined) return; e.preventDefault(); go(n, true); }); });
    pnl.addEventListener('click', (e) => { if (e.target.closest('.nx6')) go(cur + 1, true); });
    tl.addEventListener('scroll', () => place(false), { passive: true });
    addEventListener('resize', () => place(false));
    requestAnimationFrame(() => place(false));
  }
  return { K, wire, ST };
})();
