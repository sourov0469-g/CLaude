/* Price My Roof (Contact): footprint x pitch factor / 100 = squares; never a price. The Text button carries the visitor's
   own numbers (sms body). Validation runs on blur (and when Next or Text is pressed), never while typing (S1442):
   while typing, a valid number updates the result at once; an invalid one just shows "–" with no error yet. */
(function () {
  var fmt = function (n) { return n.toLocaleString('en-US'); };
  document.querySelectorAll('[data-kp]').forEach(function (form) {
    var area = form.querySelector('.kp-area'), pitch = form.querySelector('.kp-pitch'), field = area.closest('.field');
    var pv = form.querySelector('.kp-pitchv'), f = form.querySelector('.kp-formula'), sq = form.querySelector('.kp-sq'), text = form.querySelector('.kp-text');
    var gable = form.querySelector('.kp-gable'), courses = form.querySelector('.kp-courses');
    function value() { var a = parseInt(String(area.value).replace(/[^0-9]/g, ''), 10); return a >= 300 && a <= 10000 ? a : null; }
    function check() { var ok = value() !== null; field.toggleAttribute('data-invalid', !ok); area.setAttribute('aria-invalid', String(!ok)); return ok; }
    function update() {
      var a = value(), r = +pitch.value, k = Math.sqrt(1 + Math.pow(r / 12, 2));
      if (a !== null && field.hasAttribute('data-invalid')) check(); // clear a shown error as soon as the input is fixed
      pv.textContent = r + '/12'; pitch.setAttribute('aria-valuetext', r + ' in 12');
      var H = 150, ridge = 160 - Math.round(H * r / 12), dC = '';
      for (var i = 1; i <= 4; i++) { var y = 160 - (160 - ridge) * i / 5, half = H * (1 - i / 5); dC += 'M' + (200 - half + 10).toFixed(0) + ' ' + y.toFixed(1) + ' H' + (200 + half - 10).toFixed(0) + ' '; }
      gable.style.d = 'path("M' + (200 - H) + ' 160 L200 ' + ridge + ' L' + (200 + H) + ' 160 Z")'; courses.style.d = 'path("' + dC.trim() + '")';
      if (a === null) { sq.textContent = '–'; f.textContent = 'footprint × ' + k.toFixed(3) + ' ÷ 100'; text.setAttribute('href', 'sms:+16519776027'); return; }
      var s = Math.round(a * k / 100); f.textContent = fmt(a) + ' × ' + k.toFixed(3) + ' ÷ 100'; sq.textContent = s;
      var svc = (form.querySelector('input[type=radio]:checked') || {}).value || 'Roof work';
      text.setAttribute('href', 'sms:+16519776027?&body=' + encodeURIComponent('Hi Owl Roofing, I would like a free estimate. ' + svc + ': house footprint about ' + fmt(a) + ' sq ft, ' + r + '/12 pitch (about ' + s + ' squares).'));
    }
    area.addEventListener('blur', check);
    text.addEventListener('click', function (e) { if (!check()) { e.preventDefault(); area.focus(); } });
    form.addEventListener('input', update); form.addEventListener('submit', function (e) { e.preventDefault(); });
    update();
    if (!form.hasAttribute('data-steps')) return;
    var panes = [].slice.call(form.querySelectorAll('.kp2-pane')), back = form.querySelector('.kp2-back'), next = form.querySelector('.kp2-next'), lab = form.querySelector('.kp2-step'), bar = form.querySelector('.kp2-bar i'), cur = 0;
    function show(n, focus) {
      cur = n; panes.forEach(function (p, i) { p.hidden = i !== n; });
      back.hidden = n === 0; next.hidden = n === panes.length - 1; text.hidden = n !== panes.length - 1;
      lab.textContent = 'Step ' + (n + 1) + ' of ' + panes.length; bar.style.width = ((n + 1) / panes.length * 100) + '%';
      if (focus) { var t = panes[n].querySelector('input:checked, input'); t && t.focus(); }
    }
    next.addEventListener('click', function () { if (cur === 1 && !check()) { area.focus(); return; } show(cur + 1, true); });
    back.addEventListener('click', function () { show(cur - 1, true); });
    area.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); next.click(); } });
    show(0);
  });
})();
