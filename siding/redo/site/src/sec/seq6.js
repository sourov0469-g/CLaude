/* TRY THE JOB K — "Flash the window" (new-versions addendum; Dropbox Brand: subtraction, one action at a time).
   An ordering game (game-like mechanics live in this section only). Four pieces go onto a window opening: sill flashing,
   the window, side flashing, head flashing. Each placed piece lands on top of the earlier ones, so the drawing shows the
   laps you made. "Run the rain" then tests it: if every piece laps over the one below, the water sheds outside; if not,
   an amber path runs behind the first bad lap and one sentence says why. General water-management practice, worded as
   such; the firm's own facts close it. */
window.Seq6 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  // the right order, bottom to top: each piece laps over the one before it
  const P = [
    ['sill', 'Sill flashing', 'Under the opening, ends turned up', '<path class="fs" d="M132 286H348V300H132Z M132 256H146V300H132Z M334 256H348V300H334Z"/>'],
    ['win', 'The window', 'Set in the opening, flange on the wall', '<rect class="fw" x="142" y="84" width="196" height="214" rx="3"/><rect class="fg" x="160" y="102" width="160" height="178"/><rect class="fw" x="160" y="186" width="160" height="9"/><path class="fl" d="M160 102h160v40H160z"/>'],
    ['side', 'Side flashing', 'Up both sides, over the flange', '<path class="fs2" d="M128 78H150V300H128Z M330 78H352V300H330Z"/>'],
    ['head', 'Head flashing', 'Across the top, over the sides', '<path class="fh" d="M118 62H362V82H118Z"/><path class="fh2" d="M118 82H362L356 90H124Z"/>']];
  const NAME = Object.fromEntries(P.map(([k, n]) => [k, n.toLowerCase()]));
  // where each wrong lap leaks: [lower piece, upper piece] -> spot and the leak path
  const LEAK = {
    'sill>win': [240, 300, 'M240 286C240 300 236 316 230 334', 'The window went on before the sill flashing, so the flashing can’t sit under it. Water that finds the sill runs into the wall.'],
    'win>side': [140, 190, 'M128 150C140 175 150 205 158 240', 'The side flashing went on before the window, so the window’s flange sits over it. Water running down the flashing goes behind the flange.'],
    'side>head': [140, 80, 'M128 70C134 90 142 110 150 140', 'The head flashing went on before the side flashing, so the sides sit over it. Water off the head runs behind the side strips.']};
  const lapsWrong = (order) => { for (let i = 0; i < P.length - 1; i++) { const lo = P[i][0], hi = P[i + 1][0]; if (order.indexOf(lo) > order.indexOf(hi)) return `${lo}>${hi}`; } return ''; };

  const K = () => `<section class="sec tyK" id="try" aria-labelledby="tyK-h">
    <div class="hd"><p class="kk">Try the job · windows</p><h2 class="sec-h" id="tyK-h" data-split>Flash the window. Then run the rain.</h2>
      <p class="sec-p">Four pieces go round a new window. Put them on in the order you think is right, then test it. The rule the trade works to: every piece laps over the one below it, like shingles, so water always runs out and down.</p></div>
    <div class="ply">
      <div class="stg7"><svg class="op7" viewBox="0 0 480 400" role="img" aria-label="A window opening in a wrapped wall. Placed pieces appear in the order you chose.">
        <rect width="480" height="400" class="wr"/>${Array.from({ length: 9 }, (_, i) => `<path class="wl" d="M0 ${30 + i * 44}H480"/>`).join('')}
        <rect class="ho" x="150" y="92" width="180" height="200"/><text class="hl" x="240" y="198" text-anchor="middle">opening</text>
        <g class="pcs"></g><g class="rain" aria-hidden="true"></g><g class="lk" aria-hidden="true"></g></svg>
        <ol class="ord" aria-label="Your order so far"></ol></div>
      <div class="ctl7">
        <p class="tl7" id="tyK-tl">Put on next:</p>
        <div class="tray" role="group" aria-labelledby="tyK-tl">${[2, 0, 3, 1].map((i) => `<button type="button" class="trp" data-k="${P[i][0]}"><b>${P[i][1]}</b><small>${P[i][2]}</small></button>`).join('')}</div>
        <div class="acts7"><button type="button" class="run" disabled>Run the rain</button><button type="button" class="ag">Start again</button><button type="button" class="sm7">Show me</button></div>
        <p class="res" aria-live="polite">Choose the first piece.</p>
        <div class="fx7"><p>Windows are measured, built to order, then set and sealed. Most window-only jobs take 2 days.</p><p><b>388</b> documented window jobs.</p>
          <p class="gpr">General practice, shown simply. At your house the crew follows the window maker’s instructions.</p>
          <a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a></div></div></div></section>`;

  function wire(root) {
    const s = root.querySelector('.tyK'); if (!s) return;
    const pcs = s.querySelector('.pcs'), rain = s.querySelector('.rain'), lk = s.querySelector('.lk'), ord = s.querySelector('.ord'), res = s.querySelector('.res'), run = s.querySelector('.run'), tray = [...s.querySelectorAll('.trp')];
    let order = [], tm = [];
    const clearT = () => { tm.forEach(clearTimeout); tm = []; };
    function place(k) {
      if (order.includes(k)) return; order.push(k); const p = P.find((x) => x[0] === k);
      pcs.insertAdjacentHTML('beforeend', `<g class="fpc${RM ? '' : ' drop'}" data-k="${k}">${p[3]}</g>`);
      const b = tray.find((x) => x.dataset.k === k), had = document.activeElement === b; b.disabled = true; b.classList.add('used');
      ord.insertAdjacentHTML('beforeend', `<li>${p[1]}</li>`);
      run.disabled = order.length < P.length;
      const left = tray.filter((x) => !x.disabled); if (had) (left[0] || run).focus();
      res.textContent = order.length < P.length ? `${p[1]} is on. ${P.length - order.length} to go.` : 'All four are on. Run the rain to test your laps.';
    }
    function reset() { clearT(); order = []; pcs.innerHTML = ''; rain.innerHTML = ''; lk.innerHTML = ''; ord.innerHTML = ''; s.classList.remove('dry', 'wet'); tray.forEach((b) => { b.disabled = false; b.classList.remove('used'); }); run.disabled = true; res.textContent = 'Choose the first piece.'; }
    function test() {
      clearT(); rain.innerHTML = ''; lk.innerHTML = ''; s.classList.remove('dry', 'wet'); const bad = lapsWrong(order);
      // three passes of rain; drops over the head flashing slide off its ends, the rest fall past
      let h = ''; for (let i = 0; i < 18; i++) { const x = 20 + (i * 449) % 440, over = x > 118 && x < 362, d = (i % 6) * 0.2;
        h += `<circle class="drp${over ? ' ov' : ''}" cx="${x}" cy="-8" r="4" style="--d:${d}s;--sx:${over ? (x < 240 ? 118 - x - 8 : 362 - x + 8) : 0}px"/>`; }
      rain.innerHTML = h; s.classList.add('raining');
      const done = () => { s.classList.remove('raining');
        if (!bad) { s.classList.add('dry'); res.textContent = 'Dry inside. Every piece laps over the one below it, so the water runs out and down.'; return; }
        const [x, y, path, why] = LEAK[bad]; s.classList.add('wet');
        lk.innerHTML = `<path class="lp${RM ? '' : ' draw'}" d="${path}" pathLength="1"/><circle class="lt" cx="${x}" cy="${y}" r="9"/><text class="ltx" x="${x + 16}" y="${y + 5}">water gets in</text>`;
        res.textContent = `Leak. ${why} Start again and try another order.`; };
      if (RM) done(); else tm.push(setTimeout(done, 1500));
    }
    tray.forEach((b) => b.addEventListener('click', () => place(b.dataset.k)));
    run.addEventListener('click', test);
    s.querySelector('.ag').addEventListener('click', () => { reset(); tray[0].focus(); });
    s.querySelector('.sm7').addEventListener('click', () => { reset(); P.forEach(([k], i) => (RM ? place(k) : tm.push(setTimeout(() => place(k), i * 380)))); if (RM) test(); else tm.push(setTimeout(test, P.length * 380 + 200)); });
  }
  return { K, wire, P, lapsWrong };
})();
