/* UAV Aerial Solutions — site behaviour (vanilla, no dependencies). */
(function () {
  'use strict';
  var doc = document, html = doc.documentElement, body = doc.body;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var desktop = window.matchMedia('(min-width: 1024px)');
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  var EMAIL = 'terry.snape@uavaerialsolutions.co.uk';

  html.classList.add('js');
  if (!reduce.matches) html.classList.add('js-reveal');

  function qs(s, r) { return (r || doc).querySelector(s); }
  function qsa(s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); }
  function visible(el) { return !!(el.getClientRects().length) && getComputedStyle(el).visibility !== 'hidden'; }
  function focusables(root) {
    return qsa('a[href],button:not([disabled]),input:not([disabled]):not([type=hidden]),textarea,select,[tabindex]:not([tabindex="-1"])', root).filter(visible);
  }

  var header = qs('[data-header]');
  var menu = qs('[data-m-menu]');
  var burger = qs('.burger');
  var megaWrap = qs('[data-mega]');
  var megaBtn = megaWrap && qs('.mega-btn', megaWrap);
  var megaPanel = megaWrap && qs('[data-mega-panel]', megaWrap);

  /* ---------- active navigation ---------- */
  function norm(p) { p = (p || '/').split('#')[0].split('?')[0]; if (p.charAt(p.length - 1) !== '/' && p.indexOf('.') < 0) p += '/'; return p.replace(/index\.html$/, ''); }
  function markActive(path) {
    path = norm(path);
    qsa('[data-nav]').forEach(function (a) {
      if (norm(a.getAttribute('data-nav')) === path) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    var inServices = path.indexOf('/services/') === 0;
    if (megaWrap) megaWrap.classList.toggle('is-current', inServices);
    var sb = qs('.m-sub-btn'); if (sb) { sb.classList.toggle('is-current', inServices); }
  }

  /* ---------- sticky header shadow ---------- */
  function onScroll() { if (header) header.classList.toggle('is-stuck', window.scrollY > 6); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- mega menu ---------- */
  var openT, closeT, hoverOpened = false;
  function megaOpen() { if (!megaBtn) return; clearTimeout(closeT); megaBtn.setAttribute('aria-expanded', 'true'); megaPanel.classList.add('is-open'); }
  function megaClose(returnFocus) {
    if (!megaBtn) return; clearTimeout(openT); hoverOpened = false;
    megaBtn.setAttribute('aria-expanded', 'false'); megaPanel.classList.remove('is-open');
    if (returnFocus) megaBtn.focus();
  }
  function megaIsOpen() { return megaBtn && megaBtn.getAttribute('aria-expanded') === 'true'; }
  if (megaBtn) {
    megaBtn.addEventListener('click', function () {
      if (megaIsOpen() && hoverOpened) { hoverOpened = false; return; }
      if (megaIsOpen()) megaClose(); else megaOpen();
    });
    megaWrap.addEventListener('pointerenter', function (e) {
      if (e.pointerType !== 'mouse' || !finePointer.matches || !desktop.matches) return;
      clearTimeout(closeT); if (megaIsOpen()) return;
      openT = setTimeout(function () { hoverOpened = true; megaOpen(); }, 90);
    });
    megaWrap.addEventListener('pointerleave', function (e) {
      if (e.pointerType !== 'mouse' || !finePointer.matches) return;
      clearTimeout(openT);
      if (megaIsOpen() && !megaWrap.contains(doc.activeElement)) closeT = setTimeout(function () { megaClose(); }, 260);
    });
    megaWrap.addEventListener('focusout', function (e) {
      var to = e.relatedTarget;
      if (to && !megaWrap.contains(to)) megaClose();
    });
    megaBtn.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); megaOpen(); var f = qs('.mega-item', megaPanel); if (f) setTimeout(function () { f.focus(); }, 30); }
    });
    megaPanel.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== 'Home' && e.key !== 'End') return;
      var list = focusables(megaPanel), i = list.indexOf(doc.activeElement); if (i < 0) return;
      e.preventDefault();
      if (e.key === 'ArrowDown') i = (i + 1) % list.length; else if (e.key === 'ArrowUp') i = (i - 1 + list.length) % list.length; else if (e.key === 'Home') i = 0; else i = list.length - 1;
      list[i].focus();
    });
    doc.addEventListener('pointerdown', function (e) { if (megaIsOpen() && !megaWrap.contains(e.target)) megaClose(); });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && megaIsOpen()) { var inside = megaWrap.contains(doc.activeElement); megaClose(inside); }
    });
    megaPanel.addEventListener('click', function (e) { if (e.target.closest('a')) megaClose(); });
  }

  /* ---------- mobile menu ---------- */
  var lastFocus = null, lockY = 0;
  function lockScroll() {
    lockY = window.scrollY;
    html.style.scrollBehavior = 'auto';
    body.style.top = (-lockY) + 'px'; body.classList.add('is-locked');
    body.style.position = 'fixed'; body.style.left = '0'; body.style.right = '0'; body.style.width = '100%';
  }
  function unlockScroll() {
    body.classList.remove('is-locked'); body.style.position = ''; body.style.left = ''; body.style.right = ''; body.style.width = ''; body.style.top = '';
    window.scrollTo(0, lockY); html.style.scrollBehavior = '';
  }
  function setInert(on) { qsa('[data-inertable]').forEach(function (el) { if (on) el.setAttribute('inert', ''); else el.removeAttribute('inert'); }); }
  function menuOpen() {
    if (!menu || menu.classList.contains('is-open')) return;
    megaClose();
    lastFocus = doc.activeElement; lockScroll();
    menu.classList.add('is-open'); setInert(true);
    burger.setAttribute('aria-expanded', 'true'); burger.setAttribute('aria-label', 'Close menu');
    setTimeout(function () { var c = qs('.m-close', menu); if (c) c.focus(); }, 60);
  }
  function menuClose(restoreFocus) {
    if (!menu || !menu.classList.contains('is-open')) return;
    menu.classList.remove('is-open'); setInert(false); unlockScroll();
    burger.setAttribute('aria-expanded', 'false'); burger.setAttribute('aria-label', 'Open menu');
    if (restoreFocus !== false) (lastFocus && lastFocus.focus ? lastFocus : burger).focus();
  }
  if (burger && menu) {
    burger.addEventListener('click', function () { menu.classList.contains('is-open') ? menuClose() : menuOpen(); });
    qs('.m-close', menu).addEventListener('click', function () { menuClose(); });
    menu.addEventListener('click', function (e) { var a = e.target.closest('a'); if (a) menuClose(false); });
    menu.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.preventDefault(); menuClose(); return; }
      if (e.key !== 'Tab') return;
      var list = focusables(menu); if (!list.length) return;
      var first = list[0], last = list[list.length - 1];
      if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    var sub = qs('.m-sub-btn', menu), subBox = qs('.m-sub', menu);
    if (sub) sub.addEventListener('click', function () {
      var open = sub.getAttribute('aria-expanded') === 'true';
      sub.setAttribute('aria-expanded', open ? 'false' : 'true'); subBox.classList.toggle('is-open', !open);
    });
    desktop.addEventListener ? desktop.addEventListener('change', function (e) { if (e.matches) { menuClose(false); megaClose(); } }) : desktop.addListener(function (e) { if (e.matches) menuClose(false); });
  }
  function closeMenus() { menuClose(false); megaClose(); }

  /* ---------- reveal on scroll ---------- */
  var io = null;
  function initReveal(root) {
    var els = qsa('[data-reveal]:not(.is-in)', root);
    if (!els.length) return;
    if (!html.classList.contains('js-reveal') || !('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('is-in'); }); return; }
    if (!io) io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- FAQ accordions ---------- */
  function initFaq(root) {
    qsa('[data-faq]', root).forEach(function (box) {
      if (box._faq) return; box._faq = true;
      box.addEventListener('click', function (e) {
        var b = e.target.closest('.faq-btn'); if (!b || !box.contains(b)) return;
        var open = b.getAttribute('aria-expanded') === 'true';
        b.setAttribute('aria-expanded', open ? 'false' : 'true');
        qs('#' + b.getAttribute('aria-controls'), box).classList.toggle('is-open', !open);
      });
    });
  }

  /* ---------- image viewers (tabs + slides) ---------- */
  function initViewers(root) {
    qsa('[data-viewer]', root).forEach(function (v) {
      if (v._v) return; v._v = true;
      var tabs = qsa('[role="tab"]', v), slides = qsa('.slide', v), count = qs('.stage-count', v), live = qs('.viewer-live', v), stage = qs('.stage', v);
      var idx = Math.max(0, tabs.findIndex(function (t) { return t.getAttribute('aria-selected') === 'true'; }));
      function pad(n) { return (n < 10 ? '0' : '') + n; }
      function select(i, focus) {
        idx = (i + tabs.length) % tabs.length;
        tabs.forEach(function (t, k) {
          var on = k === idx; t.setAttribute('aria-selected', on ? 'true' : 'false'); t.tabIndex = on ? 0 : -1; t.classList.toggle('is-done', k < idx);
        });
        slides.forEach(function (s, k) { s.classList.toggle('is-active', k === idx); });
        if (count) count.textContent = pad(idx + 1) + ' / ' + pad(tabs.length);
        if (live) { var c = qs('.slide-cap', slides[idx]); live.textContent = c ? c.textContent.replace(/\s+/g, ' ').trim() : ''; }
        if (focus) tabs[idx].focus();
      }
      tabs.forEach(function (t, k) {
        t.addEventListener('click', function () { select(k); });
        t.addEventListener('keydown', function (e) {
          var k2 = null;
          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') k2 = idx + 1;
          else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') k2 = idx - 1;
          else if (e.key === 'Home') k2 = 0; else if (e.key === 'End') k2 = tabs.length - 1;
          if (k2 !== null) { e.preventDefault(); select(k2, true); }
        });
      });
      var prev = qs('[data-prev]', v), next = qs('[data-next]', v);
      if (prev) prev.addEventListener('click', function () { select(idx - 1); });
      if (next) next.addEventListener('click', function () { select(idx + 1); });
      if (stage) {
        var x0 = null, y0 = null;
        stage.addEventListener('pointerdown', function (e) { if (e.target.closest('button')) return; x0 = e.clientX; y0 = e.clientY; });
        stage.addEventListener('pointerup', function (e) {
          if (x0 === null) return; var dx = e.clientX - x0, dy = e.clientY - y0; x0 = null;
          if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy) * 1.4) select(idx + (dx < 0 ? 1 : -1));
        });
        stage.addEventListener('pointercancel', function () { x0 = null; });
      }
      select(idx);
    });
  }

  /* ---------- 3D mesh reveal ---------- */
  function initMesh(root) {
    qsa('[data-mesh]', root).forEach(function (m) {
      if (m._m) return; m._m = true;
      var r = qs('input[type="range"]', m);
      function set() { m.style.setProperty('--p', r.value); r.setAttribute('aria-valuetext', r.value + ' per cent of the photo shows the 3D mesh'); }
      r.addEventListener('input', set); set();
    });
  }

  /* ---------- contact form (opens the visitor's email app; nothing is sent from this page) ---------- */
  function initForms(root) {
    qsa('form[data-contact]', root).forEach(function (form) {
      if (form._f) return; form._f = true;
      var status = qs('.form-status', form), btn = qs('button[type="submit"]', form), lastKey = '', lastAt = 0;
      var loaded = Date.now();
      var q = (window.UAV && window.UAV.query) || window.location.search || '';
      var key = (new URLSearchParams(q.charAt(0) === '?' ? q : '?' + q)).get('service');
      if (key) {
        var map = { 'roof-inspection': 'Roof inspection', 'roof-inspections': 'Roof inspection', 'rtk-mapping': 'RTK / 2D mapping', '3d-modelling': '3D modelling / aerial survey', 'aerial-monitoring': 'Aerial monitoring', 'aerial-photography-videography': 'Aerial photography / video' };
        var want = map[key.replace(/\/+$/, '')];
        if (want) qsa('input[name="service"]', form).forEach(function (r) { r.checked = r.value === want; });
      }
      function field(name) { return form.elements[name]; }
      function clearErrors() {
        qsa('.field-err', form).forEach(function (n) { n.remove(); });
        qsa('[aria-invalid]', form).forEach(function (n) { n.removeAttribute('aria-invalid'); });
      }
      function bad(el, msg, list) {
        el.setAttribute('aria-invalid', 'true');
        var id = el.id + '-err', p = doc.createElement('p'); p.className = 'field-err'; p.id = id; p.textContent = msg;
        var d = (el.getAttribute('aria-describedby') || '').split(' ').filter(Boolean); if (d.indexOf(id) < 0) d.push(id); el.setAttribute('aria-describedby', d.join(' '));
        el.closest('.field').appendChild(p); list.push(el);
      }
      function say(state, html) { status.dataset.state = state; status.innerHTML = html; status.hidden = false; }
      function validate() {
        clearErrors(); var errs = [];
        var name = field('name'), email = field('email'), phone = field('phone'), msg = field('message');
        if (!name.value.trim()) bad(name, 'Please tell us your name.', errs);
        var e = email.value.trim(), p = phone.value.trim();
        var eOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e), pOk = p.replace(/\D/g, '').length >= 7;
        if (e && !eOk) bad(email, 'That email address does not look right.', errs);
        else if (p && !pOk) bad(phone, 'Please enter a phone number with at least 7 digits.', errs);
        else if (!e && !p) { bad(email, 'Please add an email address or a phone number so we can reply.', errs); phone.setAttribute('aria-invalid', 'true'); }
        if (!msg.value.trim()) bad(msg, 'Please tell us a little about the site and what you need.', errs);
        return errs[0] || null;
      }
      function compose() {
        var svc = (qs('input[name="service"]:checked', form) || {}).value || 'Not sure yet';
        var lines = [
          'Hello UAV Aerial Solutions,', '',
          'Name: ' + field('name').value.trim(),
          field('email').value.trim() ? 'Email: ' + field('email').value.trim() : '',
          field('phone').value.trim() ? 'Phone: ' + field('phone').value.trim() : '',
          field('location').value.trim() ? 'Site location: ' + field('location').value.trim() : '',
          'Service: ' + svc, '', field('message').value.trim()
        ].filter(function (l, i, a) { return l !== '' || (i > 0 && a[i - 1] !== ''); });
        return { subject: 'Website enquiry: ' + svc + ' (' + field('name').value.trim() + ')', body: lines.join('\n') };
      }
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var first = validate();
        if (first) { say('error', 'Please check the highlighted fields.'); first.focus(); return; }
        if (field('company_website').value) return;
        var c = compose(), k = c.subject + c.body, now = Date.now();
        if (k === lastKey && now - lastAt < 60000) { say('ok', 'Your email app was already opened with this enquiry. If it did not appear, use the buttons below.'); }
        lastKey = k; lastAt = now;
        var href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(c.subject) + '&body=' + encodeURIComponent(c.body);
        btn.disabled = true; setTimeout(function () { btn.disabled = false; }, 2500);
        say('ok', '<strong>Almost done.</strong> Your email app should now open with this enquiry ready to send. <strong>Nothing has been sent yet:</strong> press Send in your email app. If nothing opens, copy the enquiry and email it to <a href="mailto:' + EMAIL + '">' + EMAIL + '</a>, or call ' + (window.UAV_PHONE || '07780 947875') + '.<br><button type="button" class="btn btn--ghost" data-copy>Copy enquiry</button>');
        var cb = qs('[data-copy]', status);
        cb.addEventListener('click', function () {
          var text = 'To: ' + EMAIL + '\nSubject: ' + c.subject + '\n\n' + c.body;
          function done() { cb.textContent = 'Copied to clipboard'; }
          if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fallback); else fallback();
          function fallback() { var t = doc.createElement('textarea'); t.value = text; t.setAttribute('readonly', ''); t.style.cssText = 'position:fixed;left:-9999px'; doc.body.appendChild(t); t.select(); try { doc.execCommand('copy'); done(); } catch (x) { cb.textContent = 'Press Ctrl/Cmd+C to copy'; } t.remove(); }
        });
        window.UAV.openMail(href);
      });
      form.addEventListener('input', function (e) {
        var t = e.target; if (t.getAttribute && t.getAttribute('aria-invalid')) { t.removeAttribute('aria-invalid'); var er = qs('#' + t.id + '-err', form); if (er) er.remove(); }
      });
    });
  }

  /* ---------- per-page init ---------- */
  function initPage(root) {
    root = root || doc;
    initReveal(root); initFaq(root); initViewers(root); initMesh(root); initForms(root);
  }

  window.UAV = window.UAV || {};
  window.UAV.openMail = window.UAV.openMail || function (href) { window.location.href = href; };
  window.UAV.initPage = initPage; window.UAV.markActive = markActive; window.UAV.closeMenus = closeMenus;

  markActive(window.UAV.single ? '/' : window.location.pathname);
  initPage(doc);
})();
