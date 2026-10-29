import { def, d, $, $$, E, calm, small, clamp, lerp, sub, stageP, once } from './registry.js';
const RR = window.RR;
const MONTH = () => +new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', month: 'numeric' }).format(new Date()) - 1;
const THREAT = ['ice', 'ice', 'freeze', 'hail', 'hail', 'hail', 'hail', 'wind', 'wind', 'wind', 'freeze', 'freeze'];

// ---------- S2 V2 "The year in one roof": 12 months scrubbed horizontally in a 300vh sticky stage; the sun rides an arc; ARIA tabs for Ohio's four threats
def('storm', 2, {
  init(sec) {
    const m = MONTH(), items = $$('[data-m]', sec), list = $('[data-months]', sec), stage = $('[data-year-stage]', sec);
    const here = items[m]; here.classList.add('here'); const tag = d.createElement('em'); tag.className = 'you'; tag.textContent = 'You are here'; here.prepend(tag);
    // tabs: roving tabindex, aria-selected, 240ms swap
    const tabs = $$('[role=tab]', sec);
    const select = (t, focus) => {
      tabs.forEach(x => { const on = x === t; x.setAttribute('aria-selected', String(on)); x.tabIndex = on ? 0 : -1; const p = d.getElementById(x.getAttribute('aria-controls')); p.hidden = !on; if (on && !calm()) p.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 240, easing: E.out }); });
      if (focus) t.focus();
    };
    tabs.forEach((t, i) => { t.addEventListener('click', () => select(t)); t.addEventListener('keydown', e => { const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key]; if (k) { e.preventDefault(); select(tabs[(i + k + tabs.length) % tabs.length], true); } else if (e.key === 'Home') { e.preventDefault(); select(tabs[0], true); } else if (e.key === 'End') { e.preventDefault(); select(tabs[tabs.length - 1], true); } }); });
    select(tabs.find(t => t.dataset.threat === THREAT[m]));
    // the current month's lamp underline draws on entry (ink grammar)
    once(here, () => here.classList.add('drawn'), { threshold: 0.6 });
    const path = $('[data-sunpath]', sec), sun = $('[data-sun]', sec), L = path.getTotalLength();
    const place = p => { const pt = path.getPointAtLength(p * L); sun.setAttribute('cx', pt.x.toFixed(1)); sun.setAttribute('cy', pt.y.toFixed(1)); };
    const scrubbed = () => !calm() && innerWidth >= 768;
    if (!scrubbed()) { place(m / 11); sec.classList.add('year-native'); list.tabIndex = 0; list.setAttribute('aria-label', 'Twelve months, scroll sideways'); return; }
    let x = 0;
    sub(stage, dt => {
      if (!scrubbed()) return false;
      const p = stageP(stage), maxX = list.scrollWidth - list.clientWidth, tx = p * maxX;
      x = lerp(x, tx, 1 - Math.pow(1 - 0.18, dt / 16.7)); // scrub .6 feel
      list.style.transform = `translate3d(${(-x).toFixed(1)}px,0,0)`; place(maxX ? x / maxX : 0);
      return Math.abs(tx - x) > 0.5;
    });
  }
});

// ---------- S2 V3 "Twenty years in twenty seconds": 5 plates crossfaded by scroll in a 240vh sticky stage (mobile 200vh); the year field jumps the stage
const NOTES = [['New', 'Granules intact, every tab sealed flat.'], ['About 5 years', 'Tabs still sealed. The first loose granules wash into the gutters.'], ['About 10 years', 'Edges can start to lift where the seal strip has let go.'], ['About 15 years', 'Cracks and bare spots show, most of all on the sunny side.'], ['About 20 years', 'Curling, buckling and bare mat. Past the 20-year mark a roof starts costing money in energy loss and leak risk.']];
def('storm', 3, {
  init(sec) {
    const stage = $('[data-age-stage]', sec), plates = $$('[data-age-plate]', sec), yr = $('[data-age-yr]', sec), note = $('[data-age-note]', sec), ticks = $$('[data-tick]', sec);
    let shown = -1;
    const show = (f) => {
      plates.forEach((pl, i) => { pl.style.opacity = String(clamp(1 - Math.abs(f - i), 0, 1)); });
      const i = Math.round(f); if (i !== shown) { shown = i; yr.textContent = NOTES[i][0]; note.textContent = NOTES[i][1]; ticks.forEach((t, k) => t.classList.toggle('on', k === i)); }
    };
    show(0);
    const form = $('[data-age-form]', sec), inp = $('#age-in', sec), now = new Date().getFullYear();
    if (RR.est.roofAge) inp.value = RR.est.roofAge;
    form.addEventListener('submit', e => {
      e.preventDefault(); const y = parseInt(inp.value, 10); if (!(y > 1950 && y <= now)) { note.textContent = 'A year like 2008, please.'; return; }
      RR.est.roofAge = y; RR.saveEst();
      const f = clamp((now - y) / 20, 0, 1);
      if (calm()) { show(f * 4); return; }
      const r = stage.getBoundingClientRect(), top = scrollY + r.top, target = top + f * (r.height - innerHeight) + 1, from = scrollY, t0 = performance.now();
      const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; // close to --ease-move
      const step = now2 => { const k = clamp((now2 - t0) / 600, 0, 1); scrollTo(0, from + (target - from) * ease(k)); if (k < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    });
    if (calm()) { sec.classList.add('age-calm'); return; }
    sub(stage, () => { show(stageP(stage) * 4); return false; });
  }
});
