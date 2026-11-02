(function () {
  document.querySelectorAll('.area-bg').forEach(function (s) { Owl.bg.rings(s); });
  var r = document.querySelector('.area-v2'); if (!r) return;
  var q = r.querySelector('#ar2-q'), out = r.querySelector('#ar2-out'), lis = [].slice.call(r.querySelectorAll('.ar2-list li'));
  var norm = function (s) { return s.toLowerCase().replace(/^st\.?\s/, 'saint ').replace(/[^a-z ]/g, '').trim(); };
  q.addEventListener('input', function () {
    var v = norm(q.value), hits = [];
    lis.forEach(function (li) { var t = norm(li.textContent), hit = v && t.indexOf(v) === 0 || (v.length > 2 && t.indexOf(v) > -1); li.classList.toggle('is-hit', !!(v && hit)); li.classList.toggle('is-dim', !!(v && !hit)); if (v && hit) hits.push(li.textContent.trim()); });
    if (!v) out.textContent = 'Owl works in 29 towns around Shoreview.';
    else if (hits.length === 1 && norm(hits[0]) === v) out.textContent = 'Yes: Owl works in ' + hits[0] + '.';
    else if (hits.length) out.textContent = hits.length === 1 ? 'Did you mean ' + hits[0] + '? Owl works there.' : hits.length + ' towns match: ' + hits.slice(0, 4).join(', ') + (hits.length > 4 ? '…' : '.');
    else out.textContent = 'Not on the list, but Owl also works in surrounding Minnesota communities. Call or text and ask.';
  });
})();
