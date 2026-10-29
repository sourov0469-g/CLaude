import { def, d, $, $$, E, calm, small, clamp, kick, once, sub, fine } from './registry.js';
const RR = window.RR;

// ---------- S1 V2 "Condition report": real date + report number, ZIP first, plate light opens then chalk circles draw (800ms ink, path x200ms)
def('hero', 2, {
  on() { d.documentElement.classList.add('hero-light'); },
  off() { d.documentElement.classList.remove('hero-light'); },
  init(sec) {
    const now = new Date(), ny = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
    $('[data-report-no]', sec).textContent = 'CR-' + ny.replace(/-/g, '').slice(2);
    $('[data-report-date]', sec).textContent = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', month: 'long', day: 'numeric', year: 'numeric' }).format(now);
    const t = $('[data-live-time]', sec); if (t) t.textContent = RR.NYT.format(now).toLowerCase();
    const form = $('[data-report-zip]', sec), inp = $('#rz-in', sec), out = $('[data-rz-out]', sec);
    if (RR.est.zip) inp.value = RR.est.zip;
    const check = async () => { const a = await RR.zipAnswer(inp.value.trim()); out.textContent = a ? a.text : 'Please enter a 5-digit ZIP.'; out.classList.toggle('out', !!a && !a.ok); if (a) { RR.est.zip = inp.value.trim(); RR.est.inArea = a.ok; RR.est.town = a.town || ''; RR.saveEst(); } };
    form.addEventListener('submit', e => { e.preventDefault(); check(); });
    inp.addEventListener('input', () => { inp.value = inp.value.replace(/\D/g, '').slice(0, 5); if (inp.value.length === 5) check(); else out.textContent = ''; });
    const frame = $('[data-report-frame]', sec), img = $('img', frame), marks = $$('[data-mark]', sec).filter(m => !(small() && m.classList.contains('m3')));
    marks.forEach(m => { const L = m.getTotalLength(); m.style.strokeDasharray = L; m.style.strokeDashoffset = calm() ? 0 : L; });
    if (calm()) return;
    once(frame, () => {
      frame.animate([{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0 0 0)' }], { duration: 800, easing: E.light, fill: 'backwards' });
      img.animate([{ transform: 'scale(1.06)' }, { transform: 'none' }], { duration: 1100, easing: E.light });
      marks.forEach((m, i) => m.animate([{ strokeDashoffset: m.style.strokeDashoffset }, { strokeDashoffset: 0 }], { duration: 800, delay: 800 + i * 200, easing: E.ink, fill: 'forwards' }));
    }, { threshold: 0.3 });
  }
});

// ---------- S1 V3 "Raking light, live": a low lamp over the macro; each headline letter gains fill, weight and width as the light passes
def('hero', 3, {
  init(sec) {
    const box = $('[data-rake]', sec), dim = $('[data-rake-dim]', sec), h1 = $('[data-rake-h1]', sec), hint = $('[data-rake-hint]', sec);
    const t = $('[data-live-time]', sec); if (t) t.textContent = RR.NYT.format(new Date()).toLowerCase();
    // letters: real text stays for assistive tech, the lit letters are decoration
    const text = h1.textContent.trim(); h1.textContent = '';
    const vis = d.createElement('span'); vis.setAttribute('aria-hidden', 'true'); vis.className = 'rk';
    const letters = [];
    text.split(' ').forEach((w, wi) => { const ws = d.createElement('span'); ws.className = 'rk-w'; [...w].forEach(ch => { const s = d.createElement('span'); s.className = 'rk-l'; s.textContent = ch; ws.append(s); letters.push({ el: s, v: 0, x: 0, y: 0, w: -1 }); }); vis.append(ws); if (wi < text.split(' ').length - 1) vis.append(' '); });
    const sr = d.createElement('span'); sr.className = 'sr-only'; sr.textContent = text; h1.append(sr, vis);
    const lamp = { x: 0.62, y: 0.4, tx: 0.62, ty: 0.4 };
    const measure = () => { const hb = box.getBoundingClientRect(); letters.forEach(L => { const r = L.el.getBoundingClientRect(); L.x = r.left + r.width / 2 - hb.left; L.y = r.top + r.height / 2 - hb.top; }); this.fs = parseFloat(getComputedStyle(h1).fontSize); };
    requestAnimationFrame(measure); addEventListener('resize', () => sec.isConnected && measure());
    const apply = () => {
      const hb = box.getBoundingClientRect(), lx = lamp.x * hb.width, ly = lamp.y * hb.height;
      dim.style.transform = `translate3d(${((lamp.x - 0.5) * 33.333).toFixed(3)}%,${((lamp.y - 0.5) * 33.333).toFixed(3)}%,0)`;
      return { lx, ly };
    };
    if (calm()) { apply(); letters.forEach(L => { L.el.style.color = 'rgb(236 233 228)'; }); hint.textContent = 'The light rests on the damage.'; return; }
    let auto = !fine, autoT = 0, lastDt = 16, settled = 0;
    const r = () => this.fs || 100;
    if (fine) box.parentElement.addEventListener('pointermove', e => { const hb = box.getBoundingClientRect(); lamp.tx = (e.clientX - hb.left) / hb.width; lamp.ty = (e.clientY - hb.top) / hb.height; hint.style.opacity = 0; kick(); });
    sec.addEventListener('pointerdown', e => { if (e.pointerType === 'touch') { auto = false; const hb = box.getBoundingClientRect(); lamp.tx = (e.clientX - hb.left) / hb.width; lamp.ty = (e.clientY - hb.top) / hb.height; kick(); } });
    sec.addEventListener('pointermove', e => { if (e.pointerType === 'touch') { auto = false; const hb = box.getBoundingClientRect(); lamp.tx = (e.clientX - hb.left) / hb.width; lamp.ty = (e.clientY - hb.top) / hb.height; kick(); } }, { passive: true });
    const E2 = Math.exp(-2);
    sub(sec, (dt) => {
      lastDt = dt;
      if (auto) { autoT += dt / 1000; lamp.tx = 0.5 + 0.36 * Math.sin(autoT * 0.37 * 2.2); lamp.ty = 0.5 + 0.22 * Math.sin(autoT * 0.61 * 2.2 + 0.9); if (autoT > 6) { auto = false; hint.textContent = 'Move the light across the roof.'; } }
      const k = 1 - Math.pow(1 - 0.08, dt / 16.7);
      lamp.x += (lamp.tx - lamp.x) * k; lamp.y += (lamp.ty - lamp.y) * k;
      const { lx, ly } = apply(); const R0 = r(); const sm = 1 - Math.exp(-dt / 80);
      let moving = Math.abs(lamp.tx - lamp.x) + Math.abs(lamp.ty - lamp.y) > 0.0008 || auto;
      letters.forEach(L => {
        const dd = Math.hypot(L.x - lx, L.y - ly), f = dd >= R0 ? 0 : (Math.exp(-2 * (dd / R0) ** 2) - E2) / (1 - E2);
        L.v += (f - L.v) * sm; if (Math.abs(f - L.v) > 0.01) moving = true;
        const q = Math.round(L.v * 40) / 40; if (q === L.w) return; L.w = q; // write-cache per letter
        L.el.style.fontWeight = Math.round(420 + 230 * q); L.el.style.fontStretch = (100 + 18 * q).toFixed(1) + '%'; L.el.style.color = `rgb(236 233 228 / ${(0.3 + 0.7 * q).toFixed(2)})`;
      });
      return moving;
    }, '0px');
  }
});
