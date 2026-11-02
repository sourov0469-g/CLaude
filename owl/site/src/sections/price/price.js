/* Price My Roof: footprint x pitch factor / 100 = squares. It measures; it never shows a price. The Text button carries the
   visitor's own numbers to Owl (sms body), so the hand-off is real. */
(function () {
  var b = document.querySelector('.price-bg'); b && Owl.bg.lawn(b, { sweep: false });
  document.querySelectorAll('[data-pm]').forEach(function (form) {
    var box = form.parentNode, area = form.querySelector('input[inputmode=numeric]'), pitch = form.querySelector('input[type=range]');
    var field = area.closest('.field'), pv = form.querySelector('.pm-pitchv'), f = form.querySelector('.pm-formula'), sq = form.querySelector('.pm-sq'), text = form.querySelector('.pm-text');
    var gable = box.querySelector('.pm-gable'), courses = box.querySelector('.pm-courses');
    var fmt = function (n) { return n.toLocaleString('en-US'); };
    function update() {
      var a = parseInt(String(area.value).replace(/[^0-9]/g, ''), 10), r = +pitch.value, k = Math.sqrt(1 + Math.pow(r / 12, 2));
      var ok = a >= 300 && a <= 10000;
      field.toggleAttribute('data-invalid', !ok && area.value !== ''); area.setAttribute('aria-invalid', String(!ok));
      pv.textContent = r + '/12'; pitch.setAttribute('aria-valuetext', r + ' in 12');
      // the drawing: ridge height follows the pitch (rise over half-span), courses re-space with it
      var H = 150, ridge = 160 - Math.round(H * r / 12), dC = ''; // true geometry: rise = half-span x pitch/12
      for (var i = 1; i <= 4; i++) { var y = 160 - (160 - ridge) * i / 5, half = H * (1 - i / 5); dC += 'M' + (200 - half + 10).toFixed(0) + ' ' + y.toFixed(1) + ' H' + (200 + half - 10).toFixed(0) + ' '; }
      gable.style.d = 'path("M' + (200 - H) + ' 160 L200 ' + ridge + ' L' + (200 + H) + ' 160 Z")'; courses.style.d = 'path("' + dC.trim() + '")';
      if (!ok) { sq.textContent = '–'; f.textContent = 'footprint × ' + k.toFixed(3) + ' ÷ 100'; text.setAttribute('href', 'sms:+16519776027'); return; }
      var s = Math.round(a * k / 100);
      f.textContent = fmt(a) + ' × ' + k.toFixed(3) + ' ÷ 100'; sq.textContent = s;
      var svc = (form.querySelector('input[type=radio]:checked') || {}).value || 'Roof work';
      text.setAttribute('href', 'sms:+16519776027?&body=' + encodeURIComponent('Hi Owl Roofing, I would like a free estimate. ' + svc + ': house footprint about ' + fmt(a) + ' sq ft, ' + r + '/12 pitch (about ' + s + ' squares).'));
    }
    form.addEventListener('input', update); form.addEventListener('submit', function (e) { e.preventDefault(); });
    update();
  });
})();
