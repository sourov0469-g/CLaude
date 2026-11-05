/* SECTION 11 — Footer. Live open/closed from the locked hours (Mon–Fri 8–8, Sat 8–6, Sun 12–5, America/Chicago, computed in the browser and refreshed each
   minute); copy buttons for the phone and the email with an in-page confirmation; a street roofline whose houses rise, light up and smoke near the pointer
   (a tap makes one hop on touch) with a sun by day and a moon with lit windows by night; the boards stand up when the footer arrives; back to top.
   Reduced motion: no reactions, no arrival, no loops. */
window.FFoot = (function () {
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const HRS = { 0: [12, 17], 1: [8, 20], 2: [8, 20], 3: [8, 20], 4: [8, 20], 5: [8, 20], 6: [8, 18] }, DN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const hlab = (h) => (h === 12 ? '12 pm' : h > 12 ? (h - 12) + ' pm' : h + ' am');
  function chicago(d) {
    const p = {}; new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }).formatToParts(d || new Date()).forEach((x) => { p[x.type] = x.value; });
    return { dow: DN.indexOf(p.weekday), h: +p.hour % 24, m: +p.minute };
  }
  /* the one function the hours sign rests on: open?, and the next change, from the locked hours */
  function status(now) {
    const { dow, h, m } = now, t = h + m / 60, [o, c] = HRS[dow];
    if (t >= o && t < c) return { open: true, line: 'Closes at ' + hlab(c) };
    if (t < o) return { open: false, line: 'Opens today at ' + hlab(o) };
    return { open: false, line: 'Opens tomorrow at ' + hlab(HRS[(dow + 1) % 7][0]) };   // every day has hours, so after closing the next opening is always tomorrow's
  }
  function wire(root) {
    const f = root.querySelector('.fo'); if (!f || f.dataset.w) return; f.dataset.w = 1;
    const RM = matchMedia('(prefers-reduced-motion: reduce)').matches, fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
    const live = f.querySelector('.fo-live'), say = (m) => { live.textContent = ''; setTimeout(() => { live.textContent = m; }, 30); };

    /* ---- the boards stand up ---- */
    if (!RM) { f.classList.add('fo-arm'); const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); f.classList.add('up'); } }), { threshold: .12 }); io.observe(f.querySelector('.fo-boards')); }

    /* ---- hours: the sign, the line, today's row, the sky ---- */
    const sign = f.querySelector('.fo-sign'), ptx = sign.querySelector('.ptx'), st = f.querySelector('[data-state]'), stB = st.querySelector('b'), stS = st.querySelector('span'), rows = [...f.querySelectorAll('.fo-hr')];
    const sun = f.querySelector('[data-sun]'), moon = f.querySelector('[data-moon]'); let wasOpen = null;
    function tick(first) {
      const now = chicago(), s = status(now);
      stB.textContent = s.open ? 'Open now' : 'Closed now'; stS.textContent = s.line; st.classList.toggle('shut', !s.open); sign.classList.toggle('shut', !s.open); ptx.textContent = s.open ? 'Open' : 'Closed';
      rows.forEach((r) => r.classList.toggle('today', r.dataset.d.includes(String(now.dow))));
      if (!first && wasOpen !== null && wasOpen !== s.open) say(s.open ? 'We are open now. ' + s.line + '.' : 'We are closed now. ' + s.line + '.');
      wasOpen = s.open;
      const hr = now.h + now.m / 60, night = hr < 6 || hr >= 20; f.dataset.phase = night ? 'night' : 'day';
      const u = night ? ((hr >= 20 ? hr - 20 : hr + 4) / 10) : (hr - 6) / 14, el = night ? moon : sun, W = 1400;
      el.setAttribute('transform', `translate(${(90 + u * (W - 180)).toFixed(0)} ${(76 - Math.sin(u * Math.PI) * 52).toFixed(0)})`);
    }
    tick(true); setInterval(() => { if (!document.hidden) tick(false); }, 30000); document.addEventListener('visibilitychange', () => { if (!document.hidden) tick(false); });
    window.__foot = { status, chicago, hlab };

    /* ---- copy ---- */
    async function copy(t) {
      try { await navigator.clipboard.writeText(t); return true; } catch (e) { /* fall through */ }
      try { const ta = document.createElement('textarea'); ta.value = t; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0'; document.body.appendChild(ta); ta.select(); const ok = document.execCommand('copy'); ta.remove(); return ok; } catch (e) { return false; }
    }
    f.querySelectorAll('.fo-copy').forEach((b) => {
      const lab = b.querySelector('.lab'); let to = 0;
      b.addEventListener('click', async () => {
        const ok = await copy(b.dataset.copy), w = b.dataset.what; clearTimeout(to);
        b.classList.toggle('ok', ok); lab.textContent = ok ? 'Copied' : 'Select the text'; say(ok ? w + ' copied' : 'Copy is not available here. Select the text and copy it.');
        to = setTimeout(() => { b.classList.remove('ok'); lab.textContent = 'Copy'; }, 2000);
      });
    });

    /* ---- the street ---- */
    const sky = f.querySelector('[data-sky]'), hs = [...sky.querySelectorAll('.fo-hs')]; let cx = [], mt = 0;
    const measure = () => { cx = hs.map((h) => { const r = h.getBoundingClientRect(); return r.left + r.width / 2; }); };
    const set = (x) => hs.forEach((h, i) => { const k = x == null ? 0 : clamp(1 - Math.abs(x - cx[i]) / 190); h.style.setProperty('--l', k.toFixed(2)); h.classList.toggle('near', k > .5); });
    if (!RM) {
      if (fine) { sky.addEventListener('pointerenter', measure); sky.addEventListener('pointermove', (e) => { if (e.pointerType !== 'mouse') return; if (!cx.length) measure(); set(e.clientX); }); sky.addEventListener('pointerleave', () => set(null)); addEventListener('resize', () => { cx = []; }); }
      sky.addEventListener('pointerdown', (e) => { if (e.pointerType === 'mouse') return; measure(); let b = 0, bd = 1e9; cx.forEach((c, i) => { const d = Math.abs(c - e.clientX); if (d < bd) { bd = d; b = i; } }); const h = hs[b]; h.classList.remove('hop'); void h.getBoundingClientRect(); h.classList.add('hop'); h.classList.add('near'); setTimeout(() => { h.classList.remove('hop', 'near'); }, 1500); });
    }

    /* ---- back to top: smooth, then the focus goes to the top of the page; the little house hops ---- */
    const up = f.querySelector('.fo-top2'), house = f.querySelector('[data-house]');
    up.addEventListener('click', (e) => { e.preventDefault(); scrollTo({ top: 0, behavior: RM ? 'instant' : 'smooth' }); const br = document.querySelector('.brand'); if (br) br.focus({ preventScroll: true }); if (!RM) { house.classList.remove('hop'); void house.offsetWidth; house.classList.add('hop'); setTimeout(() => house.classList.remove('hop'), 800); } });
    up.addEventListener('pointerenter', () => { if (RM) return; house.classList.remove('hop'); void house.offsetWidth; house.classList.add('hop'); setTimeout(() => house.classList.remove('hop'), 800); });
  }
  return { wire };
})();
