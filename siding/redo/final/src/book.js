/* SECTION 10 — Booking. C: the left column keeps the phone, the email, the address and the hours in reach (with copy buttons and a live open/closed line); the right column is
   a film gate that holds a frame, then pulls the next as you scroll: 2009, 2018, 886 (a dot for every project: 312 on the map, 574 counted), the credentials, 4.9, your house.
   J: the receipt prints out (stepped, like a till) and carries one button, to this site's own Contact Us page. Reduced motion / phones: frames stacked, receipt shown at once. */
window.FBook = (function () {
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const HOURS = [[1, 5, 8, 20], [6, 6, 8, 18], [0, 0, 12, 17]];
  function austin() { const f = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date());
    return { wd: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(f.find((p) => p.type === 'weekday').value), h: +f.find((p) => p.type === 'hour').value % 24 + +f.find((p) => p.type === 'minute').value / 60 }; }
  function status() { const { wd, h } = austin(), row = HOURS.find((r) => wd >= r[0] && wd <= r[1]), fmt = (x) => (x > 12 ? x - 12 + ' pm' : x === 12 ? '12 pm' : x + ' am');
    return h >= row[2] && h < row[3] ? { open: true, t: 'Open now, until ' + fmt(row[3]) + ' Austin time' } : { open: false, t: 'Closed now. ' + (h < row[2] ? 'Opens ' + fmt(row[2]) + ' today' : 'Opens tomorrow') + ' (Austin time)' }; }
  function parallax(sec, bg) { if (RM) return; const far = bg.querySelector('.bk-far'), near = bg.querySelector('.bk-near'); let tick = false;
    const upd = () => { tick = false; const r = sec.getBoundingClientRect(), p = clamp((r.top + r.height / 2 - innerHeight / 2) / (innerHeight * 1.4), -1, 1); far.style.setProperty('--py', (p * -24).toFixed(1) + 'px'); near.style.setProperty('--py', (p * -56).toFixed(1) + 'px'); };
    addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(upd); } }, { passive: true }); upd(); }
  function wireC(root) {
    const s = root.querySelector('.bk'); if (!s || s.dataset.w) return; s.dataset.w = 1;
    const sts = s.querySelector('.bk-sts'), msg = s.querySelector('.bk-msg');
    const refresh = () => { const st = status(); sts.textContent = st.t; sts.classList.toggle('open', st.open); const wd = austin().wd; s.querySelectorAll('.bk-hours li').forEach((li) => li.classList.toggle('now', li.dataset.d.split(',').map(Number).includes(wd))); }; refresh(); setInterval(refresh, 60000);
    // copy buttons, with a plain in-page confirmation
    s.querySelectorAll('.bk-copy').forEach((b) => b.addEventListener('click', async () => { const v = b.dataset.copy; let done = false;
      try { await navigator.clipboard.writeText(v); done = true; } catch (_) { try { const t = document.createElement('textarea'); t.value = v; t.setAttribute('readonly', ''); t.style.cssText = 'position:fixed;opacity:0'; document.body.append(t); t.select(); done = document.execCommand('copy'); t.remove(); } catch (__) {} }
      const kind = /@/.test(v) ? 'email address' : 'phone number'; msg.textContent = done ? 'Copied the ' + kind + ': ' + v : 'Press and hold the ' + kind + ' to copy it.';
      if (done) { const old = b.textContent; b.textContent = 'Copied'; b.classList.add('ok'); clearTimeout(b._t); b._t = setTimeout(() => { b.textContent = old; b.classList.remove('ok'); msg.textContent = ''; }, 2200); } }));
    // the 886 dots: 312 on the map, 574 counted
    const dots = s.querySelector('.bk-dots'); if (dots) { let h = ''; for (let i = 0; i < 886; i++) { const x = 6 + (i % 38) * 10, y = 6 + ((i / 38) | 0) * 10, m = i < 312; h += `<circle class="${m ? 'm' : 'c'}" cx="${x}" cy="${y}" r="3.2"${m ? ` style="--d:${Math.round(i * 1.3)}"` : ''}/>`; } dots.innerHTML = h; }
    parallax(s, s.querySelector('.bk-bg'));
    new IntersectionObserver((es) => es.forEach((e) => s.classList.toggle('live', e.isIntersecting && !RM)), { threshold: .05 }).observe(s);
    const strip = s.querySelector('.bk-strip'), frs = [...strip.children], cn = s.querySelector('.bk-cn b'), gate = s.querySelector('.bk-gate');
    const flow = () => innerWidth <= 860 || RM; let raf = 0, lastY = 0, lastT = 0, blur = 0;
    function upd(now) { raf = 0; if (flow()) { s.classList.add('flow'); strip.style.transform = ''; frs.forEach((x) => x.classList.add('on')); return; } s.classList.remove('flow');
      const r = s.getBoundingClientRect(), tot = s.offsetHeight - innerHeight, p = clamp(-r.top / Math.max(1, tot)), m = frs.length - 1;
      const raw = p * m, k = Math.min(m - 1, Math.floor(raw)), t = clamp((raw - k - .35) / .3), f = k + t * t * (3 - 2 * t), fh = frs[0].offsetHeight + 18;
      strip.style.transform = `translate3d(0,${(-f * fh).toFixed(1)}px,0)`; gate.style.setProperty('--sp', (-f * fh * .5).toFixed(1) + 'px');
      const v = Math.abs(f * fh - lastY) / Math.max(8, (now || performance.now()) - lastT); lastY = f * fh; lastT = now || performance.now(); blur += (Math.min(5, v * 2) - blur) * .5; gate.style.setProperty('--b', blur.toFixed(2) + 'px');
      const c = Math.round(f); frs.forEach((x, i) => x.classList.toggle('on', i === c)); cn.textContent = String(c + 1).padStart(2, '0'); if (blur > .05) raf = requestAnimationFrame(upd); }
    addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(upd); }, { passive: true }); addEventListener('resize', () => upd()); upd();
  }
  function wireJ(root) {
    const s = root.querySelector('.bkr'); if (!s || s.dataset.w) return; s.dataset.w = 1; if (RM) return; s.classList.add('js');
    const go = () => { s.classList.remove('pr2'); void s.offsetWidth; s.classList.add('pr2'); };
    new IntersectionObserver((es, io) => es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); go(); } }), { threshold: .3 }).observe(s.querySelector('.bkr-print'));
    s.querySelector('.bkr-again').addEventListener('click', go);
  }
  return { wire(root) { wireC(root); wireJ(root); } };
})();
