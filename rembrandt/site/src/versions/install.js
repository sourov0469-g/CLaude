import { def, d, $, $$, E, calm, small, clamp, lerp, sub, stageP } from './registry.js';

// ---------- S6 V2 "One day, time-lapse": frames on ONE <img>, src swapped when the index changes, index eased .12/frame, frames decoded on idle
const FRAMES = [['install-1', 520, 'Tarps down over the beds. The old roof starts coming off.'], ['install-2', 677, 'Old roof off. Underlayment going on.'], ['install-4', 770, 'The new roof is on and the lawn is cleared.']];
const fmt = m => { const t = Math.round(m), h = Math.floor(t / 60), mm = String(t % 60).padStart(2, '0'); return `${(h + 11) % 12 + 1}:${mm} ${h < 12 ? 'am' : 'pm'}`; }; // round whole minutes first: never 4:60
def('install', 2, {
  init(sec) {
    const stage = $('[data-lapse-stage]', sec), img = $('[data-lapse-img]', sec), time = $('[data-lapse-time]', sec), cap = $('[data-lapse-cap]', sec), bar = $('[data-lapse-bar]', sec);
    const w = innerWidth > 1100 ? 1600 : 1080, srcs = FRAMES.map(f => `assets/img/${f[0]}-${w}.webp`);
    (window.requestIdleCallback || setTimeout)(() => srcs.forEach(s => { const i = new Image(); i.src = s; i.decode && i.decode().catch(() => {}); }));
    let idx = 0, shown = 0;
    const show = f => {
      const i = clamp(Math.round(f), 0, FRAMES.length - 1);
      if (i !== shown) { shown = i; img.removeAttribute('srcset'); img.src = srcs[i]; cap.textContent = FRAMES[i][2]; }
      const a = Math.floor(clamp(f, 0, FRAMES.length - 1.0001)), t = lerp(FRAMES[a][1], FRAMES[Math.min(a + 1, FRAMES.length - 1)][1], f - a);
      time.textContent = fmt(t); bar.style.transform = `scaleX(${(f / (FRAMES.length - 1)).toFixed(3)})`;
    };
    if (calm()) { sec.classList.add('lapse-calm'); show(0); return; }
    sub(stage, dt => { const target = stageP(stage) * (FRAMES.length - 1); idx += (target - idx) * (1 - Math.pow(1 - 0.12, dt / 16.7)); show(idx); return Math.abs(target - idx) > 0.002; });
  }
});

// ---------- S6 V3 "Install day on the clock": hands driven by scroll through the day (7:30 to 5:00), scrub .6; the current step swaps (240ms)
def('install', 3, {
  init(sec) {
    const stage = $('[data-clock-stage]', sec), face = $('[data-clockface]', sec), hh = $('[data-hand-h]', sec), mh = $('[data-hand-m]', sec), tEl = $('[data-clock-time]', sec), sEl = $('[data-clock-step]', sec), items = $$('[data-clock-list] li', sec);
    const nums = $('.nums', face); for (let n = 1; n <= 12; n++) { const a = n / 12 * Math.PI * 2; nums.insertAdjacentHTML('beforeend', `<text x="${(Math.sin(a) * 86).toFixed(1)}" y="${(-Math.cos(a) * 86 + 5).toFixed(1)}" text-anchor="middle">${n}</text>`); }
    const STEPS = ['The crew arrives, covers the beds and lays plywood where trucks meet the driveway.', 'Tear-off begins. The old roof comes off down to the boards.', 'Every deck board checked; soft ones shown to you first. The roof is dried in.', 'The magnet sweep: lawn, beds and driveway, for nails.', 'The walkthrough, with the progress photos, before anyone asks you to sign.'];
    let cur = -1, v = 0;
    const set = m => {
      m = Math.round(m); // one minute value for the hands, the label and the step, so 5:00 always lights the walkthrough
      const hr = (m / 60) % 12, mn = m % 60;
      hh.setAttribute('transform', `rotate(${(hr * 30).toFixed(2)})`); mh.setAttribute('transform', `rotate(${(mn * 6).toFixed(2)})`);
      tEl.textContent = fmt(m);
      let i = 0; items.forEach((li, k) => { if (m >= +li.dataset.t) i = k; });
      if (i !== cur) { cur = i; items.forEach((li, k) => li.classList.toggle('on', k === i)); sEl.textContent = STEPS[i]; if (!calm()) sEl.animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], { duration: 240, easing: E.out }); }
    };
    if (calm()) { sec.classList.add('clock-calm'); set(720); items.forEach(li => li.classList.add('on')); return; }
    set(450);
    sub(stage, dt => { const t = lerp(450, 1020, stageP(stage)); v = v ? v + (t - v) * (1 - Math.pow(1 - 0.18, dt / 16.7)) : t; set(v); return Math.abs(t - v) > 0.3; });
  }
});
