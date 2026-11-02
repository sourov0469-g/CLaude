/* FINALIZE · Contact 3 · Service area. The 104 municipalities from the map data (the firm's published lists). The rows
   drift with CSS (each county its own pace, the middle one the other way); pointer or focus or the pause control holds
   them; reduced motion lays them out still. Typing switches to "search": all 104 laid out at once, matches highlighted,
   and an answer naming the county, or honestly that a town is not on the published list. */
(function () {
  var ORDER = ['Miami-Dade', 'Broward', 'Palm Beach'];
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function norm(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim(); }
  EZ.section('contact-area', { 1: { init: function (root, k) {
    var D = (window.__DATA || {}).southfl, rows = root.querySelector('.ca__rows'), inp = root.querySelector('.ca__in'), ans = root.querySelector('.ca__ans'), hold = root.querySelector('.ca__hold');
    var T = [];
    rows.innerHTML = ORDER.map(function (c, ci) {
      var names = D.towns[c].map(function (t) { return t[0]; }).sort();
      names.forEach(function (n) { T.push({ n: n, c: c, k: norm(n) }); });
      var set = function (aria) { return '<div class="ca__set"' + (aria ? '' : ' aria-hidden="true"') + '>' + names.map(function (n) { return '<span class="ca__t" data-k="' + norm(n) + '">' + esc(n) + '</span>'; }).join('') + '</div>'; };
      return '<div class="ca__row"><p class="ca__cn">' + c.replace('-', '&#8209;') + '<span><span class="nums">' + names.length + '</span> municipalities</span></p><div class="ca__vp"><div class="ca__track" style="--dur:' + (110 + ci * 25) + 's">' + set(true) + set(false) + '</div></div></div>';
    }).join('');
    var spans = Array.prototype.slice.call(rows.querySelectorAll('.ca__set:first-child .ca__t'));
    if (!k.motion) { root.classList.add('is-still'); hold.hidden = true; }
    k.on(hold, 'click', function () { var on = hold.getAttribute('aria-pressed') !== 'true'; hold.setAttribute('aria-pressed', on ? 'true' : 'false'); hold.firstChild.textContent = on ? 'Run the rows' : 'Pause the rows'; root.classList.toggle('is-held', on); });
    k.on(inp, 'input', function () {
      var q = norm(inp.value);
      root.classList.toggle('is-search', !!q);
      spans.forEach(function (s) { s.classList.toggle('is-hit', !!q && s.dataset.k.indexOf(q) === 0); });
      if (!q) { ans.textContent = ''; return; }
      var hit = T.filter(function (t) { return t.k.indexOf(q) === 0; }), exact = T.filter(function (t) { return t.k === q; })[0];
      if (exact) ans.innerHTML = '<b>Yes, ' + esc(exact.n) + '.</b> It is in ' + esc(exact.c) + ', one of our three counties.';
      else if (hit.length) ans.innerHTML = '<b>Highlighted below:</b> ' + hit.slice(0, 4).map(function (t) { return esc(t.n) + ' (' + esc(t.c) + ')'; }).join(', ') + (hit.length > 4 ? ', and more' : '') + '.';   // names, never a count (numbers lock)
      else ans.innerHTML = '<b>Not on our published list.</b> Call us and you will get a real answer.';
    });
    k.add(function () { rows.innerHTML = ''; inp.value = ''; ans.textContent = ''; root.classList.remove('is-search', 'is-held', 'is-still'); hold.hidden = false; });
    EZ.reveal(k, root.querySelectorAll('.ca__head > *'));
  } } });
})();
