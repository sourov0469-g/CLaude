import { def, d, $, $$, E, calm, small, clamp, lerp, sub, stageP, once } from './registry.js';
const RR = window.RR;

// ---------- S3 V2 "Street view, roof view": 30 slits (16 on phones) scrubbed open, stagger .02, scrub 2.0 desktop / 1.0 mobile
def('inspect', 2, {
  init(sec) {
    const stage = $('[data-blind-stage]', sec), box = $('[data-slits]', sec), label = $('[data-blind-label]', sec);
    const N = small() ? 16 : 30; const slits = [];
    for (let i = 0; i < N; i++) { const s = d.createElement('i'); s.style.top = (i / N * 100) + '%'; s.style.height = (100 / N + 0.15) + '%'; box.append(s); slits.push(s); }
    // each slit shows its own band of one image laid out like object-fit: cover over the whole view
    const setBg = () => { const r = box.getBoundingClientRect(), A = 1600 / 1108; let bw = r.width, bh = r.width / A; if (bh < r.height) { bh = r.height; bw = r.height * A; }
      const ox = (r.width - bw) / 2, oy = (r.height - bh) / 2; slits.forEach((s, i) => { s.style.backgroundSize = `${bw.toFixed(1)}px ${bh.toFixed(1)}px`; s.style.backgroundPosition = `${ox.toFixed(1)}px ${(oy - i / N * r.height).toFixed(1)}px`; }); };
    const img = new Image(); img.src = 'assets/img/macro-1600.webp'; img.decode().catch(() => {}).then(() => { slits.forEach(s => s.style.backgroundImage = `url(${img.src})`); setBg(); });
    addEventListener('resize', () => sec.isConnected && setBg());
    let shown = 0, cur = 0; const lag = small() ? 0.12 : 0.06; // scrub 1.0 mobile / 2.0 desktop: more lag on desktop
    const render = v => { slits.forEach((s, i) => { const k = clamp((v * (1 + N * 0.02) - i * 0.02) / 1, 0, 1); s.style.transform = `scaleY(${k.toFixed(3)})`; }); const on = v > 0.5; if (on !== shown) { shown = on; label.textContent = on ? 'From the roof, at 7am' : 'From the street'; } };
    if (calm()) { sec.classList.add('blind-calm'); render(1); return; }
    render(0);
    sub(stage, dt => { const t = clamp((stageP(stage) - 0.1) / 0.75, 0, 1); cur = lerp(cur, t, 1 - Math.pow(1 - lag, dt / 16.7)); render(cur); return Math.abs(t - cur) > 0.002; });
  }
});

// ---------- S3 V3 "Ask the roof": five photo questions, each "yes" lights a zone (lamp-400 at 30%, 240ms); result panel 400ms
def('inspect', 3, {
  init(sec) {
    const qs = $$('[data-ask] li', sec), out = $('[data-ask-result]', sec), ans = {};
    const zone = z => $(`[data-z="${z}"]`, sec);
    const update = () => {
      qs.forEach(li => { const z = li.dataset.zone; zone(z).classList.toggle('on', ans[z] === true); });
      const done = Object.keys(ans).length, yes = Object.values(ans).filter(Boolean).length;
      if (done < 5) { out.innerHTML = `<p>${done} of 5 answered.${yes ? ` ${yes} worth a look so far.` : ''}</p>`; return; }
      const html = yes ? `<h3>Worth a look</h3><p>You saw ${yes} of 5 signs. That doesn't always mean a new roof. We'll come out, look in low light, photograph what we find and tell you, in writing.</p>`
        : `<h3>Probably fine, but here's what to watch</h3><p>None of the five signs. Check your gutters after the next big storm, and look up at the ceilings near outside walls once a season.</p>`;
      out.innerHTML = html; if (!calm()) out.animate([{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }], { duration: 400, easing: E.surface });
      RR.est.notes = `Self-check: ${yes} of 5`; if (!RR.est.situation) RR.est.situation = ans.ceiling ? 'leak' : 'check'; RR.saveEst();
    };
    qs.forEach(li => {
      const y = $('[data-yes]', li), n = $('[data-no]', li), z = li.dataset.zone;
      const press = b => !calm() && b.animate([{ transform: 'scale(.97)' }, { transform: 'none' }], { duration: 140, easing: E.out });
      y.addEventListener('click', () => { ans[z] = true; y.setAttribute('aria-pressed', 'true'); n.setAttribute('aria-pressed', 'false'); li.classList.add('yes'); li.classList.remove('no'); press(y); update(); });
      n.addEventListener('click', () => { ans[z] = false; n.setAttribute('aria-pressed', 'true'); y.setAttribute('aria-pressed', 'false'); li.classList.add('no'); li.classList.remove('yes'); press(n); update(); });
    });
  }
});
