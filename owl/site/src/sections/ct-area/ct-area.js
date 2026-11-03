/* Town search (S1453): prefix and word matches first; then typo tolerance (edit distance up to 1 for short queries, 2 for
   longer); the matched text is highlighted; a count is given; zero results echo the query and point forward; a clear
   button appears once there is a query and returns focus to the field. Results update on each keystroke (<1ms; S1438). */
(function () {
  var r = document.querySelector('.ka-v1'); if (!r) return;
  var q = r.querySelector('#ka-q'), out = r.querySelector('#ka-out'), clr = r.querySelector('.ka-clear'), lis = [].slice.call(r.querySelectorAll('.ka-list li'));
  var names = lis.map(function (li) { return li.textContent.trim(); });
  var norm = function (s) { return s.toLowerCase().replace(/^st\.?\s+/, 'saint ').replace(/[^a-z ]/g, '').replace(/\s+/g, ' ').trim(); };
  function dist(a, b) { var m = a.length, n = b.length, d = []; for (var i = 0; i <= m; i++) { d[i] = [i]; } for (var j = 1; j <= n; j++) d[0][j] = j;
    for (i = 1; i <= m; i++) for (j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); return d[m][n]; }
  function esc(s) { return s.replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; }); }
  function paint(li, name, hit, at, len) {
    var pin = li.querySelector('svg'); li.textContent = ''; if (pin) li.appendChild(pin);
    var span = document.createElement('span');
    span.innerHTML = hit && at > -1 ? esc(name.slice(0, at)) + '<mark>' + esc(name.slice(at, at + len)) + '</mark>' + esc(name.slice(at + len)) : esc(name);
    li.appendChild(span);
  }
  function run() {
    var raw = q.value, v = norm(raw); clr.hidden = raw === '';
    var exact = [], typo = [];
    names.forEach(function (n, i) {
      var t = norm(n), at = t.indexOf(v), word = v && (at === 0 || t.indexOf(' ' + v) > -1 || (v.length > 2 && at > -1));
      var tol = v.length < 5 ? 1 : 2, fuzzy = !word && v.length > 2 && (dist(v, t) <= tol || dist(v, t.slice(0, v.length)) <= tol);
      if (word) exact.push(i); else if (fuzzy) typo.push(i);
      lis[i].classList.toggle('is-hit', !!(v && (word || fuzzy))); lis[i].classList.toggle('is-dim', !!(v && !word && !fuzzy));
      paint(lis[i], n, word, word ? (t.indexOf(v) === 0 ? 0 : t.indexOf(v)) : -1, v.length);
    });
    var hits = exact.concat(typo).map(function (i) { return names[i]; });
    if (!v) out.textContent = 'Owl works in 29 towns around Shoreview.';
    else if (exact.length === 1 && norm(names[exact[0]]) === v) out.textContent = 'Yes: Owl works in ' + names[exact[0]] + '.';
    else if (!exact.length && typo.length) out.textContent = 'No town called "' + raw.trim() + '". Did you mean ' + hits.slice(0, 2).join(' or ') + '? Owl works there.';
    else if (hits.length) out.textContent = hits.length + (hits.length === 1 ? ' town matches' : ' towns match') + ' "' + raw.trim() + '": ' + hits.slice(0, 4).join(', ') + (hits.length > 4 ? '…' : '.');
    else out.textContent = 'No town matches "' + raw.trim() + '". Owl also works in surrounding Minnesota communities: call or text and ask.';
  }
  q.addEventListener('input', run);
  clr.addEventListener('click', function () { q.value = ''; run(); q.focus(); });
  q.addEventListener('keydown', function (e) { if (e.key === 'Escape' && q.value) { e.preventDefault(); q.value = ''; run(); } });
  run();
})();
