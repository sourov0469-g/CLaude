/* Area. B2 Rings on both versions. V2's town search (remediated to S1453): prefix and word matches; typo tolerance
   (edit distance 1 for short queries, 2 for longer); a count; zero results echo the query and point forward; a clear
   button once there is a query (focus returns to the field); Escape clears. Updates on each keystroke (S1438). */
(function () {
  document.querySelectorAll('.area-bg').forEach(function (s) { Owl.bg.rings(s); });
  var r = document.querySelector('.area-v2'); if (!r) return;
  var q = r.querySelector('#ar2-q'), out = r.querySelector('#ar2-out'), clr = r.querySelector('.ar2-clear'), lis = [].slice.call(r.querySelectorAll('.ar2-list li'));
  var names = lis.map(function (li) { return li.textContent.trim(); });
  var norm = function (s) { return s.toLowerCase().replace(/^st\.?\s+/, 'saint ').replace(/[^a-z ]/g, '').replace(/\s+/g, ' ').trim(); };
  function dist(a, b) { var m = a.length, n = b.length, d = [], i, j; for (i = 0; i <= m; i++) d[i] = [i]; for (j = 1; j <= n; j++) d[0][j] = j;
    for (i = 1; i <= m; i++) for (j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); return d[m][n]; }
  function run() {
    var raw = q.value, v = norm(raw), exact = [], typo = []; clr.hidden = raw === '';
    names.forEach(function (n, i) {
      var t = norm(n), at = t.indexOf(v), word = !!v && (at === 0 || t.indexOf(' ' + v) > -1 || (v.length > 2 && at > -1));
      var tol = v.length < 5 ? 1 : 2, fuzzy = !word && v.length > 2 && (dist(v, t) <= tol || dist(v, t.slice(0, v.length)) <= tol);
      if (word) exact.push(n); else if (fuzzy) typo.push(n);
      lis[i].classList.toggle('is-hit', !!v && (word || fuzzy)); lis[i].classList.toggle('is-dim', !!v && !word && !fuzzy);
    });
    var hits = exact.concat(typo), said = '"' + raw.trim() + '"';
    if (!v) out.textContent = 'Owl works in 29 towns around Shoreview.';
    else if (exact.length === 1 && norm(exact[0]) === v) out.textContent = 'Yes: Owl works in ' + exact[0] + '.';
    else if (!exact.length && typo.length) out.textContent = 'No town called ' + said + '. Did you mean ' + typo.slice(0, 2).join(' or ') + '? Owl works there.';
    else if (hits.length) out.textContent = hits.length + (hits.length === 1 ? ' town matches ' : ' towns match ') + said + ': ' + hits.slice(0, 4).join(', ') + (hits.length > 4 ? '…' : '.');
    else out.textContent = 'No town matches ' + said + '. Owl also works in surrounding Minnesota communities: call or text and ask.';
  }
  q.addEventListener('input', run);
  clr.addEventListener('click', function () { q.value = ''; run(); q.focus(); });
  q.addEventListener('keydown', function (e) { if (e.key === 'Escape' && q.value) { e.preventDefault(); q.value = ''; run(); } });
  run();
})();
