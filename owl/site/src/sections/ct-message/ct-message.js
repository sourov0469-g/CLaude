/* Send a message: nothing is posted anywhere. On send, the visitor's own email (mailto) or text app (sms) opens with
   the message filled in. Fields validate on blur; Send validates all and focuses the first invalid field. */
(function () {
  var rules = {
    name: function (v) { return v.trim().length > 0; },
    msg: function (v) { return v.trim().length > 0; },
    tel: function (v) { var d = v.replace(/\D/g, ''); return !d || d.length === 10 || (d.length === 11 && d[0] === '1'); },
    zip: function (v) { return !v.trim() || /^\d{5}$/.test(v.trim()); }
  };
  document.querySelectorAll('[data-km]').forEach(function (form) {
    var inputs = [].slice.call(form.querySelectorAll('input, textarea')), status = form.querySelector('.km-status'), pre = form.parentNode.querySelector('.km2-pre');
    function check(el) { var ok = rules[el.name](el.value); el.closest('.field').toggleAttribute('data-invalid', !ok); el.setAttribute('aria-invalid', String(!ok)); return ok; }
    function body() { var g = function (n) { return form.querySelector('[name=' + n + ']').value.trim(); };
      return 'Hi Owl Roofing,\n\n' + (g('msg') || '(your message)') + '\n\n– ' + (g('name') || '(your name)') + (g('tel') ? '\nPhone: ' + g('tel') : '') + (g('zip') ? '\nZIP: ' + g('zip') : ''); }
    inputs.forEach(function (el) {
      el.addEventListener('blur', function () { if (el.value !== '' || el.required) check(el); });
      el.addEventListener('input', function () { if (el.closest('.field').hasAttribute('data-invalid') && rules[el.name](el.value)) check(el); if (pre) pre.textContent = body(); });
    });
    var via = 'email';
    form.querySelectorAll('[data-via]').forEach(function (b) { b.addEventListener('click', function () { via = b.dataset.via; }); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var bad = inputs.filter(function (el) { return !check(el); });
      if (bad.length) { status.textContent = bad.length === 1 ? 'One field needs a fix before sending.' : bad.length + ' fields need a fix before sending.'; bad[0].focus(); return; }
      var b = body();
      status.textContent = via === 'sms' ? 'Your text app is opening with your message to (651) 977-6027.' : 'Your email app is opening with your message to info@owlroofing.com.';
      location.href = via === 'sms' ? 'sms:+16519776027?&body=' + encodeURIComponent(b) : 'mailto:info@owlroofing.com?subject=' + encodeURIComponent('Roof question from ' + form.querySelector('[name=name]').value.trim()) + '&body=' + encodeURIComponent(b);
    });
    if (pre) pre.textContent = body();
  });
})();
