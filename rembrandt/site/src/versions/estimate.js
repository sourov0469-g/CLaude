import { def, d, $, $$, E, calm, small, clamp, lerp, sub, sendEstimate, esc } from './registry.js';
const RR = window.RR;
const SIT = { storm: 'A storm came through', leak: 'It\'s leaking', old: 'It\'s getting old', claim: 'Insurance claim', check: 'Just check it' };
const SVC = { roof: 'Roof', gutters: 'Gutters', siding: 'Siding', skylights: 'Skylights', attic: 'Attic ventilation or insulation', other: 'Something else' };

// the same send flow as the paper (A5 stub): pending, then success with a reference, or 2s/4s/8s retries and a copyable reference
async function sendFlow(btn, result, onOk) {
  btn.disabled = true; btn.classList.add('is-pending'); const label = btn.textContent; btn.textContent = 'Sending…';
  const r = await sendEstimate();
  btn.disabled = false; btn.classList.remove('is-pending');
  result.hidden = false;
  if (r.ok) { btn.textContent = 'Sent'; result.innerHTML = `<p><strong>Received.</strong> Rachel will call ${esc(RR.est.phone)} ${esc(r.when)}. Your reference is <strong>${r.ref}</strong>.</p>`; onOk && onOk(r); try { localStorage.removeItem('rr-estimate'); } catch (e) {} return; }
  btn.textContent = label;
  const w = [2, 4, 8][r.attempt - 1];
  if (w) { let left = w; result.innerHTML = `<div class="err-box"><p>We couldn't send that. Your answers are saved. Trying again in <span data-left>${left}</span> s, or call <a class="phone" href="tel:+19377467377">(937) 746-7377</a>.</p></div>`;
    const iv = setInterval(() => { left--; const s = $('[data-left]', result); if (s) s.textContent = left; if (left <= 0) { clearInterval(iv); sendFlow(btn, result, onOk); } }, 1000); return; }
  const ref = 'RR-' + Date.now().toString(36).slice(-6).toUpperCase();
  result.innerHTML = `<div class="err-box"><p>We still couldn't send it. Your answers are saved on this device. Please call <a class="phone" href="tel:+19377467377">(937) 746-7377</a> and give this reference: <strong>${ref}</strong> <button type="button" class="btn btn-line" data-copy style="min-height:36px;margin-left:8px">Copy</button></p></div>`;
  $('[data-copy]', result).onclick = e => { navigator.clipboard && navigator.clipboard.writeText(ref); e.target.textContent = 'Copied'; };
}
const okPhone = v => v.replace(/\D/g, '').length >= 10, okZip = v => /^\d{5}$/.test(v), okName = v => v.trim().length > 1;

// ---------- S5 V2 "Read the estimate": words go grey -> ink with scroll (start top 70%, end bottom 60%, scrub .6); notes open on the key lines
def('estimate', 2, {
  init(sec) {
    const body = $('[data-reveal]', sec), words = [];
    const tw = d.createTreeWalker(body, NodeFilter.SHOW_TEXT, { acceptNode: n => n.parentElement.closest('.note,.note-btn') || !n.textContent.trim() ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
    const nodes = []; while (tw.nextNode()) nodes.push(tw.currentNode);
    nodes.forEach(n => { const f = d.createDocumentFragment(); n.textContent.split(/(\s+)/).forEach(p => { if (!p) return; if (/^\s+$/.test(p)) { f.append(p); return; } const s = d.createElement('span'); s.className = 'rw'; s.textContent = p; f.append(s); words.push(s); }); n.replaceWith(f); });
    $$('[data-note]', sec).forEach(b => b.addEventListener('click', () => { const n = d.getElementById(b.dataset.note), open = n.hidden; n.hidden = !open; b.setAttribute('aria-expanded', String(open)); if (open && !calm()) n.animate([{ opacity: 0, transform: 'translateY(-4px)' }, { opacity: 1, transform: 'none' }], { duration: 240, easing: E.out }); RR.refresh(); }));
    if (calm()) words.forEach(w => w.classList.add('in'));
    else { let shown = 0, v = 0; const N = words.length;
      sub(body, dt => { const r = RR.R(body), vh = innerHeight; const t = clamp((vh * 0.7 - r.top) / Math.max(1, r.height - vh * 0.1), 0, 1); v = lerp(v, t, 1 - Math.pow(1 - 0.2, dt / 16.7));
        const k = Math.round(v * N); if (k !== shown) { const [a, b] = k > shown ? [shown, k] : [k, shown]; for (let i = a; i < b; i++) words[i].classList.toggle('in', i < k); shown = k; } return Math.abs(t - v) > 0.001; }, '20% 0px'); }
    // the short form
    const form = $('[data-short]', sec), f = {}; $$('[data-f]', form).forEach(i => { f[i.dataset.f] = i; if (RR.est[i.dataset.f]) i.value = RR.est[i.dataset.f]; });
    const zipOut = $('[data-sf-zip]', form), err = $('[data-sf-err]', form);
    f.zip.addEventListener('input', async () => { f.zip.value = f.zip.value.replace(/\D/g, '').slice(0, 5); if (f.zip.value.length === 5) { const a = await RR.zipAnswer(f.zip.value); zipOut.textContent = a ? a.text : ''; zipOut.classList.toggle('out', !!a && !a.ok); if (a) { RR.est.inArea = a.ok; RR.est.town = a.town || ''; } } else zipOut.textContent = ''; });
    Object.values(f).forEach(i => i.addEventListener('input', () => { RR.est[i.dataset.f] = i.value; RR.saveEst(); }));
    let started = false; form.addEventListener('input', () => { if (!started) { started = true; RR.track('estimate_start', { where: 'S5 V2' }); } }, { once: false });
    form.addEventListener('submit', e => {
      e.preventDefault();
      const bad = [['name', okName, 'your name'], ['zip', okZip, 'a 5-digit ZIP'], ['phone', okPhone, 'a phone number with area code']].filter(([k, fn]) => !fn(f[k].value));
      Object.keys(f).forEach(k => f[k].setAttribute('aria-invalid', String(bad.some(b => b[0] === k))));
      if (bad.length) { err.textContent = 'Please add ' + bad.map(b => b[2]).join(', ') + '.'; f[bad[0][0]].focus(); RR.track('estimate_error', { kind: 'validation' }); return; }
      err.textContent = ''; Object.keys(f).forEach(k => RR.est[k] = f[k].value); RR.saveEst();
      sendFlow($('[data-sf-send]', form), $('[data-sf-result]', form));
    });
  }
});

// ---------- S5 V3 "Build your request": one question per screen, panel slide 400ms (x 24px + opacity), counter digits roll (stagger .07)
def('estimate', 3, {
  init(sec) {
    const form = $('[data-builder]', sec), steps = $$('.b-step', form), back = $('[data-b-back]', form), next = $('[data-b-next]', form), send = $('[data-b-send]', form), err = $('[data-b-err]', form), live = $('[data-b-live]', form), roll = $('[data-roll]', form);
    const zip = $('[data-b-zip]', form), ans = $('[data-b-ans]', form), nm = $('[data-b-name]', form), ph = $('[data-b-phone]', form), tm = $('[data-b-time]', form), em = $('[data-b-email]', form);
    const E1 = RR.est; let cur = 1;
    // restore
    if (E1.situation) { const r = $(`input[name=b-sit][value="${E1.situation}"]`, form); if (r) r.checked = true; }
    (E1.services || []).forEach(v => { const c = $(`input[name=b-svc][value="${v}"]`, form); if (c) c.checked = true; });
    if (E1.zip) zip.value = E1.zip; if (E1.name) nm.value = E1.name; if (E1.phone) ph.value = E1.phone; if (E1.bestTime) tm.value = E1.bestTime; if (E1.email) em.value = E1.email;
    const sync = () => { const s = $('input[name=b-sit]:checked', form); if (s) E1.situation = s.value; E1.services = $$('input[name=b-svc]:checked', form).map(c => c.value); E1.zip = zip.value; E1.name = nm.value; E1.phone = ph.value; E1.bestTime = tm.value; if (em.value) E1.email = em.value; RR.saveEst(); };
    form.addEventListener('change', sync); form.addEventListener('input', sync);
    let started = false; form.addEventListener('input', () => { if (!started) { started = true; RR.track('estimate_start', { where: 'S5 V3' }); } });
    zip.addEventListener('input', async () => { zip.value = zip.value.replace(/\D/g, '').slice(0, 5); if (zip.value.length === 5) { const a = await RR.zipAnswer(zip.value); ans.textContent = a ? a.text : ''; ans.classList.toggle('out', !!a && !a.ok); if (a) { E1.inArea = a.ok; E1.town = a.town || ''; RR.saveEst(); } } else ans.textContent = ''; });
    const setRoll = n => {
      const txt = String(Math.min(n, 4)).padStart(2, '0'), old = roll.firstElementChild; if (old.textContent === txt) return;
      const nu = old.cloneNode(); nu.textContent = txt; roll.append(nu);
      if (calm()) { old.remove(); return; }
      old.animate([{ transform: 'none' }, { transform: 'translateY(-1.2em)' }], { duration: 400, easing: E.surface, fill: 'forwards' }).onfinish = () => old.remove();
      nu.animate([{ transform: 'translateY(1.2em)' }, { transform: 'none' }], { duration: 400, delay: 70, easing: E.surface, fill: 'backwards' });
    };
    const summary = () => {
      const s = $('input[name=b-sit]:checked', form);
      const rows = [['Prepared for', nm.value], ['Property ZIP', zip.value + (E1.town ? ` (${E1.town})` : '')], ['What\'s going on', s ? SIT[s.value] : 'Not said'], ['Look at', (E1.services || []).map(v => SVC[v]).join(', ') || 'The roof'], ['Best number', ph.value], ['Best time', tm.value]];
      $('[data-b-sum]', form).innerHTML = rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('');
    };
    const valid = n => {
      if (n === 1 && !$('input[name=b-sit]:checked', form)) return 'Pick the one that fits best.';
      if (n === 3 && !okZip(zip.value)) return 'A 5-digit ZIP, please. It tells us if you are in our area.';
      if (n === 4) { if (!okName(nm.value)) return 'Please add your name, so Rachel knows who to ask for.'; if (!okPhone(ph.value)) return 'A phone number with area code, please.'; }
      return '';
    };
    const go = (n, dir) => {
      const from = steps[cur - 1], to = steps[n - 1]; cur = n;
      steps.forEach(s => s.hidden = s !== to);
      if (!calm()) to.animate([{ opacity: 0, transform: `translateX(${dir * 24}px)` }, { opacity: 1, transform: 'none' }], { duration: 400, easing: E.surface });
      back.hidden = n === 1; next.hidden = n === 5; send.hidden = n !== 5;
      setRoll(n); live.textContent = n === 5 ? 'Summary. Check it and sign.' : `Step ${n} of 4`;
      if (n === 5) summary(); RR.track(n === 5 ? 'estimate_summary' : 'estimate_step_' + n);
      const first = $('input,select', to); if (first && dir) first.focus({ preventScroll: true });
    };
    next.addEventListener('click', () => { const m = valid(cur); err.textContent = m; if (m) return; go(cur + 1, 1); });
    back.addEventListener('click', () => { err.textContent = ''; go(cur - 1, -1); });
    form.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.matches('input') && cur < 5) { e.preventDefault(); next.click(); } });
    form.addEventListener('submit', e => { e.preventDefault(); sync(); sendFlow(send, $('[data-b-result]', form), () => form.classList.add('sent')); });
  }
});
