/* CONTACT — the desk. Ink on paper: labels, placeholders and what you type are drawn as ink (a transparent real input sits over a mirror that sets each word at its own angle and each
   letter at its own weight and baseline; Inter only). The send button NEVER opens an email app and there is no mailto path: the form is intercepted and the thank-you is shown in the page.
   >>> FORM_ENDPOINT is EMPTY ON PURPOSE. Set it to your own form-handling URL at real launch. While it is empty NOTHING IS TRANSMITTED anywhere (the in-page thank-you is shown, as ruled);
   once set, the note is sent as JSON with fetch() and the thank-you waits for the server's OK. No third-party form service is used or invented here. <<< */
window.FPContact = (function () {
  const FORM_ENDPOINT = ''; // <<< CONFIGURABLE ENDPOINT: set at real launch (your own URL). Empty = nothing is sent.
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const rnd = (n) => { const x = Math.sin(n * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); };
  const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  /* ---- ink: words at an angle, letters at their own weight */
  function ink(str, seed) {
    let out = '', i = seed || 0;
    str.split(/(\s+)/).forEach((tok) => {
      if (!tok) return; if (/^\s+$/.test(tok)) { out += esc(tok); i += tok.length; return; }
      const r = ((rnd(i * 3.1 + tok.charCodeAt(0)) - .5) * 3.2).toFixed(2), y = ((rnd(i * 1.7 + 5) - .5) * 2.4).toFixed(2);
      let w = `<span class="w" style="--r:${r}deg;--y:${y}px">`;
      for (const c of tok) { i++; const o = (.84 + rnd(i * 5.7 + c.charCodeAt(0)) * .16).toFixed(2), t = ((rnd(i * 2.3 + c.charCodeAt(0)) - .5) * 1.8).toFixed(2); w += `<i style="--o:${o};--t:${t}px">${esc(c)}</i>`; }
      out += w + '</span>';
    });
    return out;
  }
  const hours = [[1, 5, 8, 20], [6, 6, 8, 18], [0, 0, 12, 17]]; // [from weekday, to weekday, open h, close h]
  const rowFor = (wd) => hours.find((r) => wd >= r[0] && wd <= r[1]);
  function austin() { const f = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date());
    return { wd: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(f.find((p) => p.type === 'weekday').value), h: +f.find((p) => p.type === 'hour').value % 24 + +f.find((p) => p.type === 'minute').value / 60 }; }
  const fmt = (x) => (x > 12 ? x - 12 + ' pm' : x === 12 ? '12 pm' : x + ' am'), DN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], DL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  function status() { const { wd, h } = austin(), r = rowFor(wd);
    if (h >= r[2] && h < r[3]) return { open: true, t: 'We’re open now, until ' + fmt(r[3]) + ' Austin time.', next: 'Open now, until ' + fmt(r[3]) + ' today (Austin time).' };
    let d = wd, n = h < r[2] ? 0 : 1; d = (wd + n) % 7; const nr = rowFor(d), when = n === 0 ? 'today' : n === 1 ? 'tomorrow' : DL[d];
    return { open: false, t: 'We’re closed right now. We open ' + fmt(nr[2]) + ' ' + when + '.', next: 'Closed now. Next opening: ' + (n === 0 ? 'today' : DL[d]) + ' at ' + fmt(nr[2]) + ' (Austin time).' }; }

  function wire(root) {
    const pg = root.querySelector('#pg-contact'); if (!pg || pg.dataset.w) return; pg.dataset.w = 1;
    const pad = pg.querySelector('[data-pad]'), form = pg.querySelector('.pc-form'), done = pg.querySelector('.pc-done'), fail = pg.querySelector('.pc-fail'), send = pg.querySelector('.pc-send');
    form.dataset.endpointSet = String(!!FORM_ENDPOINT);
    // static ink: labels, ticks, the greeting
    pg.querySelectorAll('[data-ink]').forEach((el, k) => { el.innerHTML = ink(el.dataset.ink, k * 13 + 3); });
    const dt = new Date(); pg.querySelector('[data-date]').innerHTML = ink(dt.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'America/Chicago' }), 91);
    const PH = { name: 'First and last', phone: '(512) …', email: 'you@home.com', town: 'Austin, Round Rock …', msg: 'The walls, the windows, the roof, anything you want us to see …' };
    const fields = [...pg.querySelectorAll('.pc-f')].filter((f) => f.querySelector('input,textarea'));
    function paint(f) { const inp = f.querySelector('input,textarea'), v = f.querySelector('.pc-val'), ph = f.querySelector('.pc-ph'), key = inp.id.replace('pc-', '');
      v.innerHTML = ink(inp.value, 40); ph.innerHTML = inp.value ? '' : ink(PH[key] || '', 7); sync(f); }
    function sync(f) { const inp = f.querySelector('input,textarea'), v = f.querySelector('.pc-val'), ph = f.querySelector('.pc-ph'); const x = -inp.scrollLeft, y = -inp.scrollTop; v.style.transform = `translate(${x}px,${y}px)`; ph.style.transform = v.style.transform; }
    fields.forEach((f) => { const inp = f.querySelector('input,textarea'); paint(f);
      inp.addEventListener('input', () => { paint(f); f.classList.remove('bad'); inp.removeAttribute('aria-invalid'); const e = f.querySelector('.pc-err'); e.hidden = true; pad.classList.add('typing'); clearTimeout(pad._t); pad._t = setTimeout(() => pad.classList.remove('typing'), 700); });
      inp.addEventListener('scroll', () => sync(f)); inp.addEventListener('focus', () => pad.classList.add('typing')); inp.addEventListener('blur', () => pad.classList.remove('typing')); });
    pg.querySelectorAll('.pc-lab').forEach((l) => l.addEventListener('click', () => {}));
    /* ---- send */
    const val = () => { const d = new FormData(form), g = (k) => String(d.get(k) || '').trim(), errs = [];
      const name = g('name'), phone = g('phone'), email = g('email'), reach = g('reach'), msg = g('message'), trades = d.getAll('trade');
      const okPhone = phone.replace(/\D/g, '').length >= 7, okMail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
      if (name.length < 2) errs.push(['name', 'Please write your name.']);
      if (phone && !okPhone) errs.push(['phone', 'That phone number looks short.']); if (email && !okMail) errs.push(['email', 'That email address does not look right.']);
      if (!errs.some((e) => e[0] === 'phone' || e[0] === 'email')) { if (reach === 'call' && !okPhone) errs.push(['phone', 'Add a phone number so we can call.']); else if (reach === 'email' && !okMail) errs.push(['email', 'Add an email address so we can write.']); else if (!okPhone && !okMail) errs.push(['phone', 'Add a phone number or an email address.']); }
      if (!msg && !trades.length) errs.push(['msg', 'Tick what needs doing, or write a few lines.']);
      return { errs, payload: { name, phone, email, town: g('town'), trades, reach, message: msg, page: 'contact', sent: new Date().toISOString() }, hp: g('website') }; };
    const show = (errs) => { fields.forEach((f) => { const k = f.querySelector('input,textarea').id.replace('pc-', ''), e = errs.find((x) => x[0] === k), p = f.querySelector('.pc-err'); f.classList.toggle('bad', !!e); const inp = f.querySelector('input,textarea'); if (e) { p.textContent = e[1]; p.hidden = false; inp.setAttribute('aria-invalid', 'true'); } else { p.hidden = true; inp.removeAttribute('aria-invalid'); } });
      const first = errs[0]; if (first) { const el = pg.querySelector('#pc-' + first[0]); if (el) el.focus(); } };
    form.addEventListener('submit', async (ev) => { ev.preventDefault(); fail.hidden = true; const { errs, payload, hp } = val(); show(errs); if (errs.length) return;
      if (hp) { thanks(payload); return; } // a bot filled the hidden field: show the same page, send nothing
      send.disabled = true;
      if (FORM_ENDPOINT) { try { const r = await fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); if (!r.ok) throw new Error('status ' + r.status); }
        catch (_) { send.disabled = false; fail.textContent = 'We could not send that just now. Please call ' + '(512) 550-0000' + ' and we will take it by phone.'; fail.hidden = false; return; } }
      else if (window.console) console.info('[contact] FORM_ENDPOINT is empty: nothing was transmitted. Set it in src/page_contact.js at real launch.');
      thanks(payload); });
    function thanks(p) { send.disabled = false; pad.classList.add('sent'); done.hidden = false; void done.offsetWidth; done.classList.add('on');
      const bits = [p.name.split(' ')[0] ? 'For ' + p.name.split(' ')[0] + '.' : '', p.trades.length ? p.trades.slice(0, 4).join(', ') + (p.trades.length > 4 ? ' and more' : '') + '.' : ''].filter(Boolean).join(' '); done.querySelector('[data-sum]').innerHTML = ink(bits, 120);
      done.focus({ preventScroll: true }); done.scrollIntoView({ block: 'center', behavior: RM ? 'instant' : 'smooth' }); }
    pg.querySelector('.pc-again').addEventListener('click', () => { form.reset(); fields.forEach(paint); show([]); pad.classList.remove('sent'); done.classList.remove('on'); done.hidden = true; pg.querySelector('#pc-name').focus(); });
    /* ---- status, copy, week chart */
    const sts = pg.querySelector('.pc-sts'), nextEl = pg.querySelector('[data-next]');
    const rows = pg.querySelector('.pc-rows'), axis = pg.querySelector('.pc-axis'), T0 = 7, T1 = 21, span = T1 - T0;
    for (let h = T0; h <= T1; h += 2) { const b = document.createElement('b'); b.style.left = ((h - T0) / span * 100) + '%'; b.textContent = h === 12 ? 'Noon' : fmt(h).replace(' ', ''); axis.append(b); }
    axis.style.margin = '0 0 6px 0';
    [1, 2, 3, 4, 5, 6, 0].forEach((wd, i) => { const r = rowFor(wd), row = document.createElement('div'); row.className = 'pc-row'; row.tabIndex = 0; row.dataset.wd = wd; row.setAttribute('aria-label', DL[wd] + ': ' + fmt(r[2]) + ' to ' + fmt(r[3]));
      row.innerHTML = `<b>${DN[wd]}</b><div class="pc-track"><div class="pc-bar" style="left:${(r[2] - T0) / span * 100}%;width:${(r[3] - r[2]) / span * 100}%;--i:${i}"><span>${fmt(r[2])} to ${fmt(r[3])}</span></div></div>`; rows.append(row); });
    const track0 = () => rows.querySelector('.pc-track');
    function refresh() { const s = status(); sts.textContent = s.t; sts.classList.toggle('open', s.open); nextEl.textContent = s.next; const { wd, h } = austin();
      rows.querySelectorAll('.pc-row').forEach((r) => r.classList.toggle('today', +r.dataset.wd === wd)); rows.querySelectorAll('.pc-now').forEach((n) => n.remove());
      if (h >= T0 && h <= T1) { const tr = rows.querySelector(`.pc-row[data-wd="${wd}"] .pc-track`); const n = document.createElement('i'); n.className = 'pc-now'; n.style.left = ((h - T0) / span * 100) + '%'; tr.append(n); } }
    refresh(); setInterval(refresh, 60000);
    const chart = pg.querySelector('.pc-week'); new IntersectionObserver((es, io) => es.forEach((e) => { if (e.isIntersecting) { chart.classList.add('seen'); io.disconnect(); } }), { threshold: .25 }).observe(chart); if (RM) chart.classList.add('seen');
    pg.querySelector('.pc-copy').addEventListener('click', async (e) => { const b = e.currentTarget, m = pg.querySelector('.pc-copied'); let ok = false; try { await navigator.clipboard.writeText(b.dataset.copy); ok = true; } catch (_) { try { const t = document.createElement('textarea'); t.value = b.dataset.copy; t.style.cssText = 'position:fixed;opacity:0'; document.body.append(t); t.select(); ok = document.execCommand('copy'); t.remove(); } catch (__) {} }
      m.textContent = ok ? 'Copied: ' + b.dataset.copy : 'Press and hold the address to copy it.'; clearTimeout(b._t); b._t = setTimeout(() => (m.textContent = ''), 2600); });
    // parallax art
    if (!RM) { const bg = pg.querySelector('.pc-bg'), far = bg.querySelector('.pc-far'), near = bg.querySelector('.pc-near'); let tick = false; addEventListener('scroll', () => { if (!tick && !pg.hidden) { tick = true; requestAnimationFrame(() => { tick = false; const p = clamp(scrollY / 900, 0, 1); far.style.setProperty('--py', (p * -20).toFixed(1) + 'px'); near.style.setProperty('--py', (p * -50).toFixed(1) + 'px'); }); } }, { passive: true }); }
    document.addEventListener('fpage', (e) => { if (e.detail === 'contact') { sync && fields.forEach(sync); refresh(); } });
  }
  return { wire };
})();
