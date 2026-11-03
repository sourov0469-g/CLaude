/* ABOUT PAGE · 2 The story. Only locked lines, as on the homepage: since 2009 · "Working on Austin homes, one house at a
   time." · merged with Sanders Roofing & Exteriors in 2018 · one free inspection covers every trade on the house · 886
   documented projects since 2018: 312 on the map with photos + 574 more counted · 4.9 from 474 Google reviews · the office
   at 7801 N Lamar Blvd Suite C70, Austin TX 78752. No person is named as the author; nothing between the dates is invented.
   A — a letter from the office (Cowboy: warm, first person plural). The facts written as a short letter on paper.
   B — three cards (Apple AirPods Pro: one moment at a time). 2009, 2018 and today as three tall cards that stack as you
       scroll (sticky), each with its locked line.
   C — plain questions (Erie Home, note only: FAQ grammar). The questions people ask about a firm, answered with the locks. */
window.PAb2 = (function () {
  const B = () => window.PB;
  const LOCK = '886 documented projects since 2018: 312 on the map with photos + 574 more counted.';

  const A = () => `<section class="sec ab2A" id="about-story" aria-labelledby="ab2A-h">
    <div class="ltr" data-solid><p class="hd2">Austin Pro Siding, Windows &amp; Roofing<br>7801 N Lamar Blvd Suite C70, Austin TX 78752</p>
      <h2 class="sec-h" id="ab2A-h">Our story, briefly.</h2>
      <p>We have been working on Austin homes since 2009, one house at a time.</p>
      <p>In 2018 we merged with Sanders Roofing &amp; Exteriors.</p>
      <p>Today one free inspection covers every trade on the house, and we keep a record of the work: ${LOCK}</p>
      <p>Homeowners rate us 4.9 from 474 Google reviews.</p>
      <p class="sg2">Austin Pro</p></div></section>`;

  const CARDS = [['2009', 'Austin Pro begins.', 'Working on Austin homes, one house at a time.'], ['2018', 'Merged with Sanders Roofing & Exteriors.', 'Siding, windows and roofing for Austin homes.'], ['Today', 'One free inspection covers every trade on the house.', `${LOCK} 4.9 from 474 Google reviews.`]];
  const Bv = () => `<section class="sec ab2B" id="about-story" aria-labelledby="ab2B-h">
    <div class="hd"><h2 class="sec-h" id="ab2B-h" data-split>Three dates.</h2></div>
    <ol class="stk3">${CARDS.map(([y, a, b], i) => `<li style="--i:${i}"><p class="yr2">${y}</p><div><h3>${B().esc(a)}</h3><p>${B().esc(b)}</p></div></li>`).join('')}</ol></section>`;

  const QS = [['How long have you been around?', 'Since 2009.'], ['Who is Sanders Roofing & Exteriors?', 'We merged with Sanders Roofing & Exteriors in 2018.'],
    ['Where are you?', '7801 N Lamar Blvd Suite C70, Austin TX 78752. Open Mon–Fri 8–8, Sat 8–6, Sun 12–5.'], ['How much work have you done?', LOCK], ['What do homeowners say?', '4.9 from 474 Google reviews.'], ['What does it take to start?', 'One free inspection. It covers every trade on the house.']];
  const C = () => `<section class="sec ab2C" id="about-story" aria-labelledby="ab2C-h">
    <div class="hd"><h2 class="sec-h" id="ab2C-h" data-split>About us, in plain questions.</h2></div>
    <dl class="qa2">${QS.map(([q, a]) => `<div><dt>${B().esc(q)}</dt><dd>${B().esc(a)}</dd></div>`).join('')}</dl></section>`;

  return { A, B: Bv, C, wire() {} };
})();
