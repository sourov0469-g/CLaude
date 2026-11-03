/* ABOUT PAGE · 3 Credentials. The locked list: GAF Master Elite · James Hardie Elite Preferred + President's Club 2025 ·
   Andersen Certified Premier ("Andersen Certified Contractor, Premier") · BBB A+. No badge artwork or logos (none are in the
   file, and they are the makers' marks): text-only drawn seals. Where a credential touches published work, only homepage
   figures are used (431 documented siding jobs, all priced siding jobs James Hardie fiber cement; 210 shingle roofs; 38
   priced Andersen jobs).
   A — four seals (Scout Motors: heritage, plainly drawn). Four text-only round seals, each with its name.
   B — the plaque (Cowboy: an award board on the office wall). One plaque with four engraved plates.
   C — where each one shows up (Cash App Brand Guidelines: one clear connection each). Each credential joined to the work
       it covers on our record. */
window.PAb3 = (function () {
  const B = () => window.PB;
  const CR = [['GAF', 'Master Elite', 'GAF Master Elite', 'Our shingle roofs: 210 documented.'], ['James Hardie', 'Elite Preferred', 'James Hardie Elite Preferred', 'Our siding: 431 documented siding jobs, every priced one James Hardie fiber cement.'],
    ['James Hardie', 'President’s Club 2025', 'James Hardie President’s Club 2025', 'A James Hardie award, for 2025.'], ['Andersen', 'Certified Premier', 'Andersen Certified Contractor, Premier', 'Our Andersen windows: 38 priced jobs, median band $20k–$25k.'], ['BBB', 'A+', 'BBB A+', 'The whole business.']];
  const seal = (a, b) => `<svg viewBox="0 0 160 160" aria-hidden="true"><circle cx="80" cy="80" r="72" class="o"/><circle cx="80" cy="80" r="60" class="i"/><text x="80" y="72" class="t1">${a.toUpperCase()}</text><text x="80" y="96" class="t2">${b}</text></svg>`;

  const A = () => `<section class="sec ab3A" id="about-creds" aria-labelledby="ab3A-h">
    <div class="hd"><h2 class="sec-h" id="ab3A-h" data-split>Certified, accredited, awarded.</h2><p class="sec-p">Drawn by us as plain seals; the makers' own badges are theirs.</p></div>
    <ul class="seals">${CR.map(([a, b, full], i) => `<li style="--r:${[-6, 4, -3, 5, -4][i]}deg">${seal(a, b)}<p>${B().esc(full)}</p></li>`).join('')}</ul></section>`;

  const Bv = () => `<section class="sec ab3B" id="about-creds" aria-labelledby="ab3B-h">
    <div class="plq" data-solid><h2 class="sec-h" id="ab3B-h">Credentials</h2><p class="sbp">Austin Pro Siding, Windows &amp; Roofing · since 2009</p>
      <ul>${CR.map(([, , full]) => `<li><span>${B().esc(full)}</span></li>`).join('')}</ul></div></section>`;

  const C = () => `<section class="sec ab3C" id="about-creds" aria-labelledby="ab3C-h">
    <div class="hd"><h2 class="sec-h" id="ab3C-h" data-split>Where each credential shows up.</h2><p class="sec-p">Each one joined to the work it covers on our record.</p></div>
    <ul class="links2">${CR.map(([, , full, w]) => `<li><b>${B().esc(full)}</b><i aria-hidden="true"></i><span>${B().esc(w)}</span></li>`).join('')}</ul></section>`;

  return { A, B: Bv, C, wire() {} };
})();
