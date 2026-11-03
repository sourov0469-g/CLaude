/* PROCESS G and H (overnight ladder, Round 21). The firm's four steps (Proc.CH), its hours and FACTS.md figures
   (Proc2.FIGS); the shared step drawings (Proc2.DR).
   G — stamp the card (Cowboy: warmth). A job card with four stamp spots, one per step; choosing a step presses its stamp
       (a short ink press) and shows what happens; the steps already passed stay stamped.
   H — the whole job, in one paragraph (Dropbox Brand: subtraction). The four steps written as one plain paragraph; each
       step name is a button that brings its drawing and figures up beside the text. */
window.Proc4 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  const book = `<a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a>`;
  const CH = () => (window.Proc ? Proc.CH : []);
  const P2 = () => window.Proc2 || { DR: () => '', FIGS: [] };
  const figs = (i) => `<dl class="pf">${(P2().FIGS[i] || []).map(([b, s]) => `<div><dt>${b}</dt><dd>${s}</dd></div>`).join('')}</dl>`;
  const SEAL = (n) => `<svg class="seal" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="52"/><circle cx="60" cy="60" r="40" class="in2"/><path d="M40 62l13 13 28-30" class="tk"/><text x="60" y="104">${n}</text></svg>`;

  /* ---------- G ---------- */
  const G = () => `<section class="sec pcG" id="process" aria-labelledby="pcG-h">
    <div class="hd"><h2 class="sec-h" id="pcG-h" data-split>Stamp the card.</h2><p class="sec-p">Every job runs on the same four steps. Choose one to stamp it.</p></div>
    <div class="wrap"><div class="card4" data-solid><div class="ch4"><b>Austin Pro</b><span>Job card · Siding, Windows &amp; Roofing</span></div>
        <ol class="spots">${CH().map((c, i) => `<li><button type="button" data-i="${i}" aria-pressed="${!i}"><span class="ring">${SEAL(c.n)}</span><span class="nm"><b>${c.n}</b>${c.t}</span></button></li>`).join('')}</ol>
        <p class="hrs">Inspections: Mon–Fri 8–8 · Sat 8–6 · Sun 12–5</p></div>
      <div class="side" aria-live="polite">${CH().map((c, i) => `<div class="pg" data-i="${i}" ${i ? 'hidden' : ''}><p class="k">Step ${c.n}</p><h3>${c.t}</h3><p class="p">${c.p}</p>${figs(i)}</div>`).join('')}${book}</div></div></section>`;

  function wireG(root) {
    const s = root.querySelector('.pcG'); if (!s) return; const bs = [...s.querySelectorAll('.spots button')], pgs = [...s.querySelectorAll('.pg')];
    const go = (i) => { bs.forEach((b, k) => { b.setAttribute('aria-pressed', k === i); b.classList.toggle('done', k <= i); b.classList.remove('press'); }); if (!RM) { void bs[i].offsetWidth; bs[i].classList.add('press'); }
      pgs.forEach((p, k) => { p.hidden = k !== i; if (k === i) { p.classList.remove('in'); void p.offsetWidth; p.classList.add('in'); } }); };
    bs.forEach((b, i) => { b.addEventListener('click', () => go(i)); b.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (d) { e.preventDefault(); const n = (i + d + bs.length) % bs.length; bs[n].focus(); go(n); } }); });
    go(0);
  }

  /* ---------- H ---------- */
  const H = () => { const c = CH(); const b = (i, t) => `<button type="button" class="sw" data-i="${i}" aria-pressed="${!i}">${t}</button>`;
    return `<section class="sec pcH" id="process" aria-labelledby="pcH-h">
      <div class="wrap"><div class="txt"><h2 class="sec-h" id="pcH-h" data-split>The whole job, in one paragraph.</h2>
        <p class="para">It starts with a ${b(0, 'free inspection')}: a project manager walks every side of the house, and one visit covers every trade. Then a ${b(1, 'detailed proposal')}, an itemised price for the work you want and nothing else. Then the ${b(2, 'expert install')}: old material off, new boards up, trim and paint; windows measured, built to order, set and sealed. And last, the ${b(3, 'final check')}: we walk it with you, clear the punch list, leave the site clean, and the warranties start.</p>
        <p class="hrs">Book the inspection any day: Mon–Fri 8–8, Sat 8–6, Sun 12–5. Or call <a href="tel:+15125500000">(512) 550-0000</a>.</p>${book}</div>
      <aside class="aside" data-solid aria-live="polite">${c.map((x, i) => `<div class="ap" data-i="${i}" ${i ? 'hidden' : ''}><div class="dw in">${P2().DR(i)}</div><p class="k">Step ${x.n} · ${x.t}</p>${figs(i)}</div>`).join('')}</aside></div></section>`; };

  function wireH(root) {
    const s = root.querySelector('.pcH'); if (!s) return; const bs = [...s.querySelectorAll('.sw')], aps = [...s.querySelectorAll('.ap')];
    const go = (i) => { bs.forEach((b, k) => b.setAttribute('aria-pressed', k === i)); aps.forEach((a, k) => { a.hidden = k !== i; const d = a.querySelector('.dw'); d.classList.remove('in'); if (k === i) { void d.offsetWidth; d.classList.add('in'); } }); };
    bs.forEach((b, i) => { b.addEventListener('click', () => go(i)); b.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') go(i); }); b.addEventListener('focus', () => go(i)); });
    go(0);
  }
  return { G, H, wire(root) { wireG(root); wireH(root); } };
})();
