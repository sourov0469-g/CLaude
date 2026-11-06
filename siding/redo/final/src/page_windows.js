/* WINDOWS PAGE (#/windows). Seven pieces, all drawn from the firm's published window facts (data-pwd on .pw):
   1 a tape you pull across an opening (the window is then set)  2 a unit you pull apart, line by line  3 a Low-E glass picker with a sun you tilt
   4 the ordering timeline you walk  5 the 376-job price distribution you scrub  6 a before/after wipe of the four published pairs  7 warranties as two stacked layers.
   Everything draws from geometry in the browser; the page is hidden until routed to, so DOM is built in wire() and anything needing layout waits for the 'fpage' event.
   Reduced motion: no autoplay, no easing (values snap). Touch: drag areas use touch-action:pan-y so vertical scrolling is never blocked. */
window.FPWindows = (function () {
  const NS = 'http://www.w3.org/2000/svg';
  const RM = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v)), lerp = (a, b, t) => a + (b - a) * t, ease = (t) => 1 - Math.pow(1 - t, 3);
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  let ROOT, D, shown = false; const onShow = [];

  /* ---- small helpers ---- */
  function tween(o, k, to, ms, fn, done) {            // animate o[k] to `to`; returns cancel
    if (o['_c' + k]) o['_c' + k](); if (RM() || ms <= 0) { o[k] = to; fn(); done && done(); return () => {}; }
    const from = o[k], t0 = performance.now(); let id = 0, dead = false;
    const step = (now) => { if (dead) return; const t = clamp((now - t0) / ms, 0, 1); o[k] = lerp(from, to, ease(t)); fn(); if (t < 1) id = requestAnimationFrame(step); else { o['_c' + k] = null; done && done(); } };
    id = requestAnimationFrame(step); o['_c' + k] = () => { dead = true; cancelAnimationFrame(id); o['_c' + k] = null; }; return o['_c' + k];
  }
  function drag(node, onMove, onStart, onEnd, lazy) {   // drag with pointer capture; vertical scroll is left to the browser (touch-action: pan-y on the node). lazy: a press on a button only becomes a drag after 6 px, so a plain click still reaches the button
    let on = false, pend = null;
    const begin = (e) => { on = true; try { node.setPointerCapture(e.pointerId); } catch (_) {} onStart && onStart(e); };
    node.addEventListener('pointerdown', (e) => { if (e.button > 0) return; const b = e.target.closest('input,button,a'); if (b && !(lazy && b.tagName === 'BUTTON')) return; if (b) { pend = { x: e.clientX, y: e.clientY }; return; } begin(e); onMove(e); });
    node.addEventListener('pointermove', (e) => { if (pend && Math.abs(e.clientX - pend.x) > 6) { pend = null; begin(e); node._moved = true; } if (on) onMove(e); });
    const up = (e) => { pend = null; if (!on) return; on = false; onEnd && onEnd(e); if (node._moved) setTimeout(() => { node._moved = false; }, 60); };
    node.addEventListener('pointerup', up); node.addEventListener('pointercancel', up);
  }
  function radios(box, items, label, pick, start) {    // a radiogroup of buttons, roving tabindex, arrow keys
    let cur = start || 0; box.innerHTML = '';
    const btns = items.map((it, i) => { const b = document.createElement('button'); b.type = 'button'; b.setAttribute('role', 'radio'); b.innerHTML = label(it, i); b.addEventListener('click', () => set(i, true)); box.append(b); return b; });
    function set(i, user) { cur = i; btns.forEach((b, j) => { b.setAttribute('aria-checked', j === i ? 'true' : 'false'); b.tabIndex = j === i ? 0 : -1; }); pick(items[i], i, user); }
    box.addEventListener('keydown', (e) => { const k = e.key; let n = null; if (k === 'ArrowRight' || k === 'ArrowDown') n = (cur + 1) % items.length; else if (k === 'ArrowLeft' || k === 'ArrowUp') n = (cur + items.length - 1) % items.length; else if (k === 'Home') n = 0; else if (k === 'End') n = items.length - 1; if (n !== null) { e.preventDefault(); set(n, true); btns[n].focus(); } });
    set(cur, false); return { set, get: () => cur };
  }
  const $ = (s, r) => (r || ROOT).querySelector(s), $$ = (s, r) => Array.from((r || ROOT).querySelectorAll(s));
  const wall = (g, x, y, w, h, step) => { let s = ''; for (let yy = y + step; yy < y + h; yy += step) s += `M${x} ${yy}H${x + w}`; return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#E2EAE3"/><path d="${s}" stroke="#0E3B2C" stroke-opacity=".1" fill="none"/>`; };
  const tickPath = (x0, x1, y, h) => { let s = ''; for (let x = Math.min(x0, x1); x <= Math.max(x0, x1); x += 5) { const big = Math.round(x) % 30 === 0 ? h : (Math.round(x) % 15 === 0 ? h * .62 : h * .36); s += `M${x} ${y}v${big}`; } return s; };

  /* ================= 1. the opener: a tape across an opening ================= */
  function opener() {
    const fig = $('.pw-tape'), svg = $('.pw-tsvg', fig), hook = $('.pw-hook', fig), cap = $('.pw-capt', fig), again = $('.pw-again', fig);
    const X0 = 150, X1 = 410, HX = 440, TY = 424, S = { p: 0, u: 0 }; let touched = false, ran = false;
    svg.innerHTML = `<defs><linearGradient id="pwTg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#DCEBE6"/><stop offset="1" stop-color="#A9C7C0"/></linearGradient><linearGradient id="pwTf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#DDE5DE"/></linearGradient></defs>
${wall(0, 0, 0, 560, 500, 26)}
<rect x="${X0}" y="96" width="260" height="300" fill="#B7C8BC"/><rect x="${X0}" y="96" width="260" height="22" fill="#0E3B2C" opacity=".12"/><rect x="${X0 - 14}" y="396" width="288" height="14" rx="2" fill="#DCE5DD" stroke="#0E3B2C" stroke-opacity=".5"/>
<g class="pw-u"><g class="pw-ug"><rect x="${X0}" y="96" width="260" height="300" rx="3" fill="url(#pwTf)" stroke="#0E3B2C" stroke-width="2"/><rect x="${X0 + 18}" y="114" width="224" height="264" fill="#0E3B2C" opacity=".12"/>
<rect x="${X0 + 20}" y="116" width="220" height="125" fill="url(#pwTg)" stroke="#0E3B2C" stroke-opacity=".6"/><rect x="${X0 + 20}" y="253" width="220" height="123" fill="url(#pwTg)" stroke="#0E3B2C" stroke-opacity=".6"/><rect x="${X0 + 14}" y="241" width="232" height="12" fill="url(#pwTf)" stroke="#0E3B2C" stroke-opacity=".6"/>
<path d="M${X0 + 52} 238L${X0 + 120} 120H${X0 + 150}L${X0 + 84} 238Z M${X0 + 120} 372L${X0 + 176} 258H${X0 + 198}L${X0 + 146} 372Z" fill="#fff" opacity=".42"/></g></g>
<path class="pw-bead" d="M${X0 - 2} 96H${X0 + 262}V398H${X0 - 2}Z" fill="none" stroke="#7FA43E" stroke-width="4" stroke-linejoin="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>
<g class="pw-dim" opacity="0"><path d="M${X0} 62H${X1}M${X0} 54v16M${X1} 54v16" stroke="#0E3B2C" stroke-width="2"/><path d="M${X0 + 8} 58L${X0} 62L${X0 + 8} 66M${X1 - 8} 58L${X1} 62L${X1 - 8} 66" fill="none" stroke="#0E3B2C" stroke-width="2"/><text x="${(X0 + X1) / 2}" y="48" text-anchor="middle" font-size="15" font-weight="800" fill="#0E3B2C" font-family="Montserrat,sans-serif" letter-spacing=".04em">THIS OPENING</text>
<path d="M118 96V396M110 96h16M110 396h16" stroke="#0E3B2C" stroke-width="2"/><path d="M114 104L118 96L122 104M114 388L118 396L122 388" fill="none" stroke="#0E3B2C" stroke-width="2"/></g>
<g class="pw-tape-g"><rect class="pw-strip" x="${HX}" y="${TY}" width="0" height="15" fill="#F6F1C9" stroke="#0E3B2C" stroke-opacity=".5"/><path class="pw-ticks" d="" stroke="#0E3B2C" stroke-width="1.2" opacity=".75"/><g class="pw-hk"><path d="M0 -3V24H-9" fill="none" stroke="#0E3B2C" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M0 -3V24H-9" fill="none" stroke="#B5DB6E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g>
<rect x="${HX}" y="${TY - 18}" width="96" height="62" rx="16" fill="#B5DB6E" stroke="#0E3B2C" stroke-width="2.4"/><rect x="${HX + 12}" y="${TY - 8}" width="40" height="42" rx="9" fill="#F1F5F1" stroke="#0E3B2C" stroke-opacity=".5"/><circle cx="${HX + 72}" cy="${TY + 12}" r="9" fill="#0E3B2C"/><circle cx="${HX + 72}" cy="${TY + 12}" r="3.5" fill="#B5DB6E"/></g>`;
    const $s = (c) => svg.querySelector(c), unit = $s('.pw-u'), strip = $s('.pw-strip'), ticks = $s('.pw-ticks'), hk = $s('.pw-hk'), dim = $s('.pw-dim'), bead = $s('.pw-bead');
    function render() {
      const hx = lerp(HX, X0, S.p); strip.setAttribute('x', hx); strip.setAttribute('width', Math.max(0, HX - hx)); ticks.setAttribute('d', tickPath(hx + 3, HX - 2, TY, 15)); hk.setAttribute('transform', `translate(${hx} ${TY})`);
      hook.style.left = (hx / 560 * 100) + '%'; hook.style.top = ((TY + 8) / 500 * 100) + '%'; dim.setAttribute('opacity', clamp((S.p - .9) * 10, 0, 1));
      unit.setAttribute('transform', `translate(${lerp(230, 0, ease(S.u))} 0)`); unit.setAttribute('opacity', clamp(S.u * 4, 0, 1)); bead.setAttribute('stroke-dashoffset', 1 - clamp((S.u - .8) / .2, 0, 1));
      const pc = Math.round(S.p * 100); hook.setAttribute('aria-valuenow', pc); hook.setAttribute('aria-valuetext', pc >= 100 ? 'Tape across the opening: measured' : pc === 0 ? 'Tape not pulled yet' : 'Tape pulled ' + pc + ' percent of the way');
    }
    function settle() {
      const done = S.p >= .995;
      if (done && S.u < 1 && !S.setting) { S.setting = true; cap.textContent = 'Measured. Each opening is measured before anything is ordered; the window is then built to order for it and set.'; again.hidden = false; setTimeout(() => tween(S, 'u', 1, 1100, render, () => { S.setting = false; }), RM() ? 0 : 350); }
      if (!done && (S.u > 0 || S.setting)) { S.setting = false; tween(S, 'u', 0, 260, render); again.hidden = true; cap.textContent = S.p === 0 ? 'Pull the tape across the opening.' : 'Keep pulling to the far side of the opening.'; }
      if (!done && S.u === 0) cap.textContent = S.p === 0 ? 'Pull the tape across the opening.' : 'Keep pulling to the far side of the opening.';
    }
    const setP = (p) => { S.p = clamp(p, 0, 1); if (S.p > .985) S.p = 1; render(); settle(); };
    drag(fig, (e) => { const r = svg.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width * 560; setP((HX - x) / (HX - X0)); }, () => { touched = true; if (S._cp) S._cp(); });
    hook.addEventListener('keydown', (e) => { const k = e.key, d = { ArrowLeft: .1, ArrowRight: -.1, ArrowUp: .1, ArrowDown: -.1, PageUp: .25, PageDown: -.25 }[k]; if (k === 'Home') { e.preventDefault(); touched = true; setP(0); } else if (k === 'End') { e.preventDefault(); touched = true; setP(1); } else if (d) { e.preventDefault(); touched = true; setP(S.p + d); } });
    again.addEventListener('click', () => { touched = true; tween(S, 'u', 0, 200, render); S.setting = false; tween(S, 'p', 0, 500, render, settle); settle(); hook.focus(); });
    render(); onShow.push(() => { if (ran) return; ran = true; if (RM()) { S.p = 1; render(); settle(); S.u = 1; render(); return; } setTimeout(() => { if (!touched) { S._cp = tween(S, 'p', 1, 1700, render, () => { settle(); }); } }, 650); });
  }

  /* ================= 2. the unit you pull apart ================= */
  function parts() {
    const lines = D.lines, svg = $('.pw-xsvg'), range = $('#pw-pull'), out = $('.pw-out'), stage = $('.pw-stage'), list = $('.pw-plist'), swb = $('.pw-sw');
    const X = { t: 0, line: lines[0], sel: -1, col: null }; let layers = {};
    const GAP = [62, -40], FX = 70, FY = 150, FW = 216, FH = 246, TH = 22;
    function build() {
      const L = X.line, exe = L.k === 'nte', col = X.col || '#EDE9E0'; layers = {};
      const frame = `M${FX} ${FY}h${FW}v${FH}h${-FW}ZM${FX + TH} ${FY + TH}v${FH - 2 * TH}h${FW - 2 * TH}v${-(FH - 2 * TH)}Z`;
      const mitre = `M${FX} ${FY}L${FX + TH} ${FY + TH}M${FX + FW} ${FY}L${FX + FW - TH} ${FY + TH}M${FX} ${FY + FH}L${FX + TH} ${FY + FH - TH}M${FX + FW} ${FY + FH}L${FX + FW - TH} ${FY + FH - TH}`;
      const gx = FX + TH, gy = FY + TH, gw = FW - 2 * TH, gh = FH - 2 * TH;
      const pane = (id) => `<g data-l="${id}"><rect x="${gx}" y="${gy}" width="${gw}" height="${gh}" fill="url(#pwXg)" stroke="#0E3B2C" stroke-opacity=".7" stroke-width="1.5"/><path d="M${gx + 28} ${gy + gh - 8}L${gx + 98} ${gy + 8}H${gx + 126}L${gx + 56} ${gy + gh - 8}Z" fill="#fff" opacity=".34"/></g>`;
      const badge = (n, id) => `<g class="pw-bdg" data-b="${id}" data-n="${n}"><circle r="13" fill="#0E3B2C"/><text y="5" text-anchor="middle" font-size="13" font-weight="800" fill="#B5DB6E" font-family="Montserrat,sans-serif">${n}</text></g>`;
      svg.innerHTML = `<title id="pw-xt">Exploded view of the ${esc(L.maker)} ${esc(L.name)} unit</title><defs><linearGradient id="pwXg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#CFE5DF" stop-opacity=".9"/><stop offset="1" stop-color="#8FB5AE" stop-opacity=".8"/></linearGradient><linearGradient id="pwXf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".2"/></linearGradient></defs>
<g class="pw-sh"><ellipse cx="300" cy="466" rx="200" ry="8" fill="#000" opacity=".22"/></g>
${exe ? `<g class="pw-lay" data-l="sill"><path d="M${FX - 14} ${FY + FH}H${FX + FW + 14}L${FX + FW + 26} ${FY + FH + 24}H${FX - 26}Z" fill="#DCE3DD" stroke="#0E3B2C" stroke-width="1.6" stroke-linejoin="round"/><path d="M${FX - 14} ${FY + FH}H${FX + FW + 14}L${FX + FW + 18} ${FY + FH + 9}H${FX - 18}Z" fill="#fff" opacity=".6"/>${badge(3, 'sill')}</g>` : ''}
<g class="pw-lay" data-l="glassB">${exe ? pane('gb') : ''}${exe ? '' : ''}</g>
<g class="pw-lay" data-l="glass">${pane('gf')}${badge(2, 'glass')}</g>
<g class="pw-lay" data-l="frame"><path d="${frame}" fill="#B4C4B8" fill-rule="evenodd" stroke="#0E3B2C" stroke-width="1.8" stroke-linejoin="round"/><path d="${frame}" fill="url(#pwXf)" fill-rule="evenodd"/><path d="${mitre}" stroke="#0E3B2C" stroke-opacity=".5" fill="none"/>${badge(1, 'frame')}</g>
<g class="pw-lay" data-l="finish"><path d="${frame}" fill="${col}" fill-opacity=".93" fill-rule="evenodd" stroke="#0E3B2C" stroke-width="1.8" stroke-linejoin="round"/><path d="${frame}" fill="url(#pwXf)" fill-rule="evenodd"/><path d="${mitre}" stroke="#0E3B2C" stroke-opacity=".45" fill="none"/>${badge(exe ? 4 : 3, 'finish')}</g>`;
      ['sill', 'glassB', 'glass', 'frame', 'finish'].forEach((k) => { const g = svg.querySelector(`[data-l="${k}"]`); if (g) layers[k] = g; });
      layers.sh = svg.querySelector('.pw-sh');
      $$('.pw-lay', svg).forEach((g) => { g.addEventListener('click', () => pickPart(partIndexOf(g.dataset.l))); });
      pose();
    }
    const partOf = (id) => ({ frame: 'Frame', glass: 'Glass', glassB: 'Glass', sill: 'Sill', finish: 'Finish' }[id]);
    const partIndexOf = (id) => X.line.parts.findIndex((p) => p[0] === partOf(id));
    function pose() {
      const t = X.t, exe = X.line.k === 'nte';
      const o = { finish: 0, frame: 1, glass: 2, glassB: 3 };
      Object.keys(o).forEach((k) => { const g = layers[k]; if (!g) return; let i = o[k]; if (k === 'glass' && !exe) i = 2.4; const dx = GAP[0] * i * t, dy = GAP[1] * i * t; g.setAttribute('transform', `translate(${dx} ${dy})`); });
      if (layers.sill) layers.sill.setAttribute('transform', `translate(${GAP[0] * 1 * t} ${GAP[1] * 1 * t + 36 * t})`);
      layers.sh.setAttribute('opacity', .9 - .3 * t);
      $$('.pw-bdg', svg).forEach((b) => { const id = b.dataset.b; const g = b.closest('.pw-lay'); const w = id === 'glass' ? FW - 2 * TH : (id === 'sill' ? FW + 26 : FW); const x = id === 'glass' ? FX + TH + w : (id === 'sill' ? FX + FW + 26 : FX + FW), y = id === 'glass' ? FY + TH : (id === 'sill' ? FY + FH + 12 : FY); b.setAttribute('transform', `translate(${x + 2} ${y})`); b.setAttribute('opacity', clamp((t - .1) * 6, 0, 1)); });
      const sel = X.sel >= 0 ? X.line.parts[X.sel][0] : null;
      Object.keys(layers).forEach((k) => { if (k === 'sh') return; const on = !sel || partOf(k) === sel; layers[k].style.opacity = on ? 1 : .3; layers[k].classList.toggle('pw-hot', !!sel && partOf(k) === sel && t > .08); });
      out.textContent = t < .03 ? 'Together' : t > .97 ? 'Fully apart' : 'Pulling apart'; range.value = Math.round(t * 100); range.setAttribute('aria-valuetext', out.textContent);
    }
    function pickPart(i) { X.sel = X.sel === i ? -1 : i; if (X.sel >= 0 && X.t < .5) tween(X, 't', 1, 500, pose); fillList(); pose(); }
    function fillList() {
      list.innerHTML = ''; X.line.parts.forEach((p, i) => { const li = document.createElement('li'); const b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-pressed', X.sel === i ? 'true' : 'false');
        const exe = X.line.k === 'nte', n = p[0] === 'Frame' ? 1 : p[0] === 'Glass' ? 2 : p[0] === 'Sill' ? 3 : (exe ? 4 : 3);
        b.innerHTML = `<i>${n}</i><span><b>${esc(p[0])}</b><em>${esc(p[1])}</em></span>`; b.addEventListener('click', () => pickPart(i)); li.append(b); list.append(li); });
    }
    function fillSw() {
      swb.innerHTML = ''; const L = X.line; if (!L.cols.length || !L.cols[0][1]) { swb.hidden = !L.colnote; swb.innerHTML = L.colnote ? `<p class="pw-sm">${esc(L.colnote)}</p>` : ''; return; } swb.hidden = false;
      const lab = document.createElement('p'); lab.className = 'pw-sm'; lab.textContent = 'Published frame colors for ' + (L.k === 'nte' ? 'the Executive' : L.name) + ':'; swb.append(lab); const row = document.createElement('div'); row.className = 'pw-swr'; row.setAttribute('role', 'radiogroup'); row.setAttribute('aria-label', 'Frame color'); swb.append(row);
      const cn = document.createElement('p'); cn.className = 'pw-cn'; cn.textContent = L.cols[0][0];
      radios(row, L.cols, (c) => `<i style="background:${c[1]}"></i><span class="pw-vh">${esc(c[0])}</span>`, (c, i) => { X.col = c[1]; row.querySelectorAll('button').forEach((b, j) => { b.title = L.cols[j][0]; }); if (layers.finish) { const f = layers.finish.querySelector('path'); f.setAttribute('fill', c[1]); } cn.textContent = c[0]; }, 0);
      swb.append(cn);
    }
    const lineBox = $('.pw-lines');
    radios(lineBox, lines, (L) => `<small>${esc(L.maker)}</small><b>${esc(L.name)}</b><span>${esc(L.mat)} · ${esc(L.jobs)}</span>`, (L) => {
      X.line = L; X.sel = -1; X.col = L.cols.length && L.cols[0][1] ? L.cols[0][1] : null; $('.pw-linet').textContent = L.maker + ' ' + L.name; $('.pw-linem').textContent = L.mat.charAt(0).toUpperCase() + L.mat.slice(1) + ' · ' + L.jobs + ' among the 376 priced window jobs'; build(); fillList(); fillSw();
    }, 0);
    range.addEventListener('input', () => { if (X._ct) X._ct(); X.t = range.value / 100; pose(); });
    let t0 = 0, x0 = 0; drag(stage, (e) => { X.t = clamp(t0 + (e.clientX - x0) / (stage.clientWidth * .5), 0, 1); pose(); }, (e) => { t0 = X.t; x0 = e.clientX; if (X._ct) X._ct(); });
    // frame materials bar
    const fb = $('.pw-fbar'); const tot = D.frames.reduce((a, f) => a + f[1], 0); const cols = ['#0E3B2C', '#6FA05C', '#B5DB6E', '#9FB3A6', '#D5E1D7'];
    fb.innerHTML = D.frames.map((f, i) => `<div class="pw-fs" role="listitem" style="flex:${f[1]} 1 0;--c:${cols[i]}" tabindex="0" aria-label="${esc(f[0])}: ${f[1]} priced window jobs"><span class="pw-fn">${f[1]}</span><em>${esc(f[0])}</em></div>`).join('');
    onShow.push(() => { if (!X._seen) { X._seen = true; if (!RM()) setTimeout(() => tween(X, 't', .0, 0, pose), 0); } });
  }

  /* ================= 3. glass picker ================= */
  function glass() {
    const svg = $('.pw-gsvg'), sun = $('#pw-sun'), tg = $('.pw-tg'), G = D.glass; const S = { maker: 0, h: .62, on: true };
    const GX = 330, GT = 70, GB = 320;
    svg.innerHTML = `<title id="pw-gt">Sun on a Low-E double-pane unit</title><defs><linearGradient id="pwGs" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFE9A8" stop-opacity="0"/><stop offset="1" stop-color="#FFE9A8" stop-opacity=".95"/></linearGradient><radialGradient id="pwGr" cx="0" cy="50%" r="100%"><stop offset="0" stop-color="#FFD98A" stop-opacity=".9"/><stop offset="1" stop-color="#FFD98A" stop-opacity="0"/></radialGradient></defs>
<rect x="0" y="0" width="${GX - 12}" height="380" fill="#DCE9F0"/><rect x="${GX + 36}" y="0" width="${640 - GX - 36}" height="380" fill="#EFE7D6"/><rect class="pw-room" x="${GX + 36}" y="0" width="${640 - GX - 36}" height="380" fill="url(#pwGr)" opacity=".5"/>
<text x="20" y="360" font-size="13" font-weight="800" fill="#0E3B2C" font-family="Inter,sans-serif" letter-spacing=".08em">OUTSIDE</text><text x="${GX + 56}" y="360" font-size="13" font-weight="800" fill="#0E3B2C" font-family="Inter,sans-serif" letter-spacing=".08em">ROOM</text>
<g class="pw-rays"></g>
<rect x="${GX - 12}" y="${GT}" width="12" height="${GB - GT}" fill="#CFE5DF" stroke="#0E3B2C" stroke-width="1.6"/><rect x="${GX + 24}" y="${GT}" width="12" height="${GB - GT}" fill="#CFE5DF" stroke="#0E3B2C" stroke-width="1.6"/><rect x="${GX}" y="${GT - 6}" width="24" height="10" fill="#0E3B2C"/><rect x="${GX}" y="${GB - 4}" width="24" height="10" fill="#0E3B2C"/>
<path class="pw-coat" d="M${GX} ${GT}V${GB}" stroke="#B5DB6E" stroke-width="4"/><g class="pw-sun"><circle r="30" fill="url(#pwGr)"/><circle r="15" fill="#FFC857" stroke="#0E3B2C" stroke-width="2"/></g>
<text class="pw-ct" x="${GX + 12}" y="${GT - 18}" text-anchor="middle" font-size="12" font-weight="800" fill="#0E3B2C" font-family="Inter,sans-serif">Low-E coat</text>`;
    const rays = $('.pw-rays', svg), sunG = $('.pw-sun', svg), coat = $('.pw-coat', svg), room = $('.pw-room', svg), ct = $('.pw-ct', svg);
    function draw() {
      const sy = lerp(300, 60, S.h), sx = 70; sunG.setAttribute('transform', `translate(${sx} ${sy})`); let s = '';
      const T = S.on ? .3 : .92, R = S.on ? .85 : .12;
      for (let i = 0; i < 5; i++) {
        const hy = lerp(GT + 26, GB - 26, i / 4), dx = GX - 12 - sx, dy = hy - sy, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
        s += `<path d="M${sx + ux * 30} ${sy + uy * 30}L${GX - 12} ${hy}" stroke="#E8A317" stroke-width="2.4" opacity=".9" fill="none"/>`;
        s += `<path d="M${GX + 36} ${hy}l${ux * 230} ${uy * 230}" stroke="#E8A317" stroke-width="${S.on ? 1.6 : 2.8}" opacity="${T}" fill="none"/>`;
        s += `<path d="M${GX - 12} ${hy}l${-ux * 150} ${uy * 150}" stroke="#4E7F2B" stroke-width="${S.on ? 2.4 : 1.4}" stroke-dasharray="6 5" opacity="${R}" fill="none"/>`;
      }
      rays.innerHTML = s; coat.setAttribute('opacity', S.on ? 1 : 0); ct.setAttribute('opacity', S.on ? 1 : 0); room.setAttribute('opacity', S.on ? .25 : .85);
      sun.setAttribute('aria-valuetext', Math.round(S.h * 100) + ' percent'); tg.setAttribute('aria-checked', S.on); tg.querySelector('b').textContent = S.on ? 'On' : 'Off';
    }
    radios($('.pw-gtabs'), G, (g) => `<b>${esc(g[0])}</b><span>${esc(g[1])}</span>`, (g) => { $('.pw-gh').textContent = g[0] + ' · ' + g[1]; $('.pw-gp').textContent = g[2]; $('.pw-gq').textContent = g[3]; }, 0);
    sun.addEventListener('input', () => { S.h = sun.value / 100; draw(); }); tg.addEventListener('click', () => { S.on = !S.on; draw(); });
    drag($('.pw-gfig'), (e) => { const r = svg.getBoundingClientRect(); const y = (e.clientY - r.top) / r.height * 380; S.h = clamp((300 - y) / 240, 0, 1); sun.value = Math.round(S.h * 100); draw(); });
    draw();
  }

  /* ================= 4. the ordering timeline ================= */
  function order() {
    const steps = D.steps, svg = $('.pw-osvg'), mark = $('.pw-mark'), track = $('.pw-track'), nodes = $('.pw-nodes'), fill = $('.pw-fill'), card = { n: $('.pw-on'), h: $('.pw-oh'), p: $('.pw-op') };
    const S = { t: 0 }; let last = -1;
    nodes.innerHTML = steps.map((s, i) => `<li style="left:${i * 25}%"><button type="button" aria-label="Step ${i + 1}: ${esc(s[0])}"><i>${i + 1}</i><span>${esc(s[0])}</span></button></li>`).join('');
    $$('button', nodes).forEach((b, i) => b.addEventListener('click', () => { if (track._moved) return; go(i); }));
    const unit = (x, y, w, h, k) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="#F6F8F4" stroke="#0E3B2C" stroke-width="2"/><rect x="${x + 10}" y="${y + 10}" width="${w - 20}" height="${h / 2 - 12}" fill="url(#pwOg)" stroke="#0E3B2C" stroke-opacity=".6"/><rect x="${x + 10}" y="${y + h / 2 + 2}" width="${w - 20}" height="${h / 2 - 12}" fill="url(#pwOg)" stroke="#0E3B2C" stroke-opacity=".6"/>`;
    svg.innerHTML = `<title id="pw-ot">The job, step by step</title><defs><linearGradient id="pwOg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#DCEBE6"/><stop offset="1" stop-color="#A9C7C0"/></linearGradient></defs>
<rect width="640" height="400" fill="#DCE9F0"/><rect y="330" width="640" height="70" fill="#C9D8C4"/><g class="pw-sA">${wall(0, 0, 0, 640, 330, 24)}
<rect x="238" y="96" width="164" height="178" fill="#D3DAD4" stroke="#0E3B2C" stroke-width="2"/><rect x="250" y="108" width="140" height="154" fill="#9DB0AC" stroke="#0E3B2C" stroke-opacity=".6"/><path d="M320 108V262M250 185H390" stroke="#0E3B2C" stroke-opacity=".5" stroke-width="3"/>
<g transform="rotate(-6 500 230)"><rect x="440" y="140" width="116" height="156" rx="8" fill="#fff" stroke="#0E3B2C" stroke-width="2"/><rect x="480" y="132" width="36" height="16" rx="4" fill="#0E3B2C"/><path d="M458 176H538M458 198H538M458 220H520M458 242H500" stroke="#0E3B2C" stroke-opacity=".35" stroke-width="3" stroke-linecap="round"/><path d="M454 266l10 10 20-22" fill="none" stroke="#4E7F2B" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></g>
<g class="pw-mag"><circle cx="318" cy="186" r="58" fill="#fff" fill-opacity=".25" stroke="#0E3B2C" stroke-width="5"/><path d="M360 228l40 40" stroke="#0E3B2C" stroke-width="11" stroke-linecap="round"/><path d="M360 228l40 40" stroke="#B5DB6E" stroke-width="4" stroke-linecap="round"/></g></g>
<g class="pw-sB">${wall(0, 0, 0, 640, 330, 24)}<rect x="238" y="96" width="164" height="178" fill="#B7C8BC"/><rect x="238" y="274" width="180" height="10" fill="#DCE5DD" stroke="#0E3B2C" stroke-opacity=".5"/>
<rect class="pw-bst" x="402" y="296" width="0" height="12" fill="#F6F1C9" stroke="#0E3B2C" stroke-opacity=".5"/><path class="pw-btk" stroke="#0E3B2C" stroke-width="1" opacity=".7"/><path class="pw-bhk" d="M0 -3V20H-8" fill="none" stroke="#0E3B2C" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><rect x="402" y="284" width="82" height="48" rx="13" fill="#B5DB6E" stroke="#0E3B2C" stroke-width="2.2"/><circle cx="460" cy="308" r="8" fill="#0E3B2C"/>
<g class="pw-bdm" opacity="0"><path d="M238 76H402M238 68v16M402 68v16" stroke="#0E3B2C" stroke-width="2"/><text x="320" y="62" text-anchor="middle" font-size="14" font-weight="800" fill="#0E3B2C" font-family="Montserrat,sans-serif">MEASURED</text></g></g>
<g class="pw-sC"><rect x="0" y="250" width="640" height="150" fill="#D5DED6"/><path d="M40 250V150L110 190V150L180 190V150L250 190V150L320 190V250Z" fill="#C3D1C6" stroke="#0E3B2C" stroke-opacity=".6" stroke-width="2"/><rect x="60" y="200" width="22" height="30" fill="#EAF0EA" opacity=".8"/><rect x="130" y="200" width="22" height="30" fill="#EAF0EA" opacity=".8"/><rect x="200" y="200" width="22" height="30" fill="#EAF0EA" opacity=".8"/>
<rect x="190" y="318" width="330" height="16" rx="4" fill="#9DAFA2" stroke="#0E3B2C" stroke-width="2"/><path d="M214 334v46M496 334v46" stroke="#0E3B2C" stroke-width="8" stroke-linecap="round"/>
<g class="pw-cf"><rect class="pw-cfr" x="262" y="120" width="190" height="198" fill="none" stroke="#0E3B2C" stroke-width="12" stroke-linejoin="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/><rect class="pw-cfi" x="262" y="120" width="190" height="198" fill="none" stroke="#B5DB6E" stroke-width="3" stroke-linejoin="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>
<g class="pw-cg"><rect x="274" y="132" width="166" height="174" fill="url(#pwOg)" stroke="#0E3B2C" stroke-opacity=".6"/><path d="M296 296L340 140H362L318 296Z" fill="#fff" opacity=".4"/></g></g>
<g class="pw-ctag"><rect x="458" y="86" width="150" height="54" rx="10" fill="#0E3B2C"/><text x="533" y="109" text-anchor="middle" font-size="13" font-weight="800" fill="#B5DB6E" font-family="Montserrat,sans-serif">BUILT TO ORDER</text><text x="533" y="127" text-anchor="middle" font-size="11.5" font-weight="600" fill="#E4EAE5" font-family="Inter,sans-serif">for this opening</text></g></g>
<g class="pw-sD">${wall(0, 0, 0, 640, 330, 24)}<rect x="238" y="96" width="164" height="178" fill="#B7C8BC"/><rect x="226" y="274" width="188" height="12" fill="#DCE5DD" stroke="#0E3B2C" stroke-opacity=".5"/>
<g class="pw-dold">${unit(238, 96, 164, 178)}<rect x="238" y="96" width="164" height="178" fill="#8C8A80" opacity=".35"/></g><g class="pw-dnew">${unit(238, 96, 164, 178)}</g>
<path class="pw-dbd" d="M236 94H404V276H236Z" fill="none" stroke="#7FA43E" stroke-width="5" stroke-linejoin="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>
<g class="pw-dday"><rect x="420" y="96" width="196" height="64" rx="12" fill="#0E3B2C"/><text x="518" y="120" text-anchor="middle" font-size="12" font-weight="800" fill="#B5DB6E" font-family="Inter,sans-serif" letter-spacing=".06em">MOST WINDOW-ONLY JOBS</text><circle cx="470" cy="142" r="9" fill="#B5DB6E"/><circle cx="496" cy="142" r="9" fill="#B5DB6E"/><text x="524" y="147" font-size="14" font-weight="800" fill="#fff" font-family="Montserrat,sans-serif">2 days</text></g>
<text class="pw-dtx" x="130" y="330" font-size="13" font-weight="800" fill="#0E3B2C" font-family="Inter,sans-serif">Old unit hauled away</text></g>
<g class="pw-sE">${wall(0, 0, 0, 640, 330, 24)}${unit(238, 96, 164, 178)}<rect x="226" y="274" width="188" height="12" fill="#DCE5DD" stroke="#0E3B2C" stroke-opacity=".5"/><g class="pw-ok"><circle cx="500" cy="170" r="54" fill="#B5DB6E" stroke="#0E3B2C" stroke-width="3"/><path d="M474 172l18 18 34-40" fill="none" stroke="#0E3B2C" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/></g>
<g transform="rotate(5 130 240)"><rect x="82" y="168" width="108" height="140" rx="8" fill="#fff" stroke="#0E3B2C" stroke-width="2"/><rect x="120" y="160" width="32" height="15" rx="4" fill="#0E3B2C"/><text x="136" y="204" text-anchor="middle" font-size="12" font-weight="800" fill="#0E3B2C" font-family="Inter,sans-serif" letter-spacing=".05em">WARRANTY</text><path d="M98 222H174M98 240H174M98 258H150" stroke="#0E3B2C" stroke-opacity=".35" stroke-width="3" stroke-linecap="round"/></g></g>`;
    const g = (c) => svg.querySelector(c), sc = ['.pw-sA', '.pw-sB', '.pw-sC', '.pw-sD', '.pw-sE'].map(g);
    const bst = g('.pw-bst'), btk = g('.pw-btk'), bhk = g('.pw-bhk'), bdm = g('.pw-bdm'), cfr = g('.pw-cfr'), cfi = g('.pw-cfi'), cg = g('.pw-cg'), ctag = g('.pw-ctag'), dold = g('.pw-dold'), dnew = g('.pw-dnew'), dbd = g('.pw-dbd'), dday = g('.pw-dday'), dtx = g('.pw-dtx'), mag = g('.pw-mag'), ok = g('.pw-ok');
    function render() {
      const t = S.t; sc.forEach((s, i) => { const v = clamp(1 - Math.abs(t - i) * 1.5, 0, 1); s.setAttribute('opacity', v); s.style.display = v > 0 ? '' : 'none'; s.setAttribute('transform', `translate(${(i - t) * 28} 0)`); });
      mag.setAttribute('transform', `translate(${Math.sin(t * 5) * 6} ${Math.cos(t * 4) * 4})`);
      const pb = clamp(1 - Math.abs(t - 1) * 1.2, 0, 1), hx = lerp(402, 238, ease(clamp(pb * 1.25, 0, 1))); bst.setAttribute('x', hx); bst.setAttribute('width', 402 - hx); btk.setAttribute('d', tickPath(hx + 3, 400, 296, 12)); bhk.setAttribute('transform', `translate(${hx} 296)`); bdm.setAttribute('opacity', clamp((pb - .8) * 5, 0, 1));
      const pc = clamp(1 - Math.abs(t - 2) * 1.4, 0, 1); cfr.setAttribute('stroke-dashoffset', 1 - clamp(pc / .55, 0, 1)); cfi.setAttribute('stroke-dashoffset', 1 - clamp(pc / .55, 0, 1)); cg.setAttribute('transform', `translate(${(1 - clamp((pc - .5) / .5, 0, 1)) * 90} 0)`); cg.setAttribute('opacity', clamp((pc - .45) * 4, 0, 1)); ctag.setAttribute('opacity', clamp((pc - .7) * 4, 0, 1));
      const po = clamp((t - 2.45) / .55, 0, 1), pn = clamp((t - 2.7) / .55, 0, 1); dold.setAttribute('transform', `translate(${-ease(po) * 260} 0)`); dold.setAttribute('opacity', 1 - ease(po)); dnew.setAttribute('transform', `translate(${(1 - ease(pn)) * 260} 0)`); dnew.setAttribute('opacity', clamp(pn * 3, 0, 1)); dbd.setAttribute('stroke-dashoffset', 1 - clamp((t - 2.95) / .3, 0, 1)); dday.setAttribute('opacity', clamp((t - 2.7) * 3, 0, 1)); dtx.setAttribute('opacity', clamp(po * 2, 0, 1) * (1 - clamp(pn * 1.6, 0, 1)));
      ok.setAttribute('transform', `translate(0 ${(1 - ease(clamp(1 - Math.abs(t - 4) * 1.5, 0, 1))) * 14})`);
      const pos = t / 4 * 100; mark.style.left = pos + '%'; fill.style.width = pos + '%'; const k = clamp(Math.round(t), 0, 4); mark.setAttribute('aria-valuenow', k + 1); mark.setAttribute('aria-valuetext', 'Step ' + (k + 1) + ' of 5: ' + steps[k][0]);
      if (k !== last) { last = k; card.n.textContent = 'Step ' + (k + 1) + ' of 5'; card.h.textContent = steps[k][0]; card.p.textContent = steps[k][1]; $$('button', nodes).forEach((b, i) => { b.classList.toggle('on', i === k); b.classList.toggle('past', i < k); }); }
    }
    function go(i) { tween(S, 't', clamp(i, 0, 4), 650, render); }
    drag(track, (e) => { const r = track.getBoundingClientRect(); S.t = clamp((e.clientX - r.left) / r.width * 4, 0, 4); render(); }, () => { if (S._ct) S._ct(); }, () => go(Math.round(S.t)), true);
    mark.addEventListener('keydown', (e) => { const k = e.key; let n = null; const c = Math.round(S.t); if (k === 'ArrowRight' || k === 'ArrowUp') n = c + 1; else if (k === 'ArrowLeft' || k === 'ArrowDown') n = c - 1; else if (k === 'Home') n = 0; else if (k === 'End') n = 4; if (n !== null) { e.preventDefault(); go(clamp(n, 0, 4)); } });
    drag($('.pw-scene'), (e) => { const r = svg.getBoundingClientRect(); S.t = clamp(S.t0 + (e.clientX - S.x0) / r.width * -4, 0, 4); render(); }, (e) => { S.x0 = e.clientX; S.t0 = S.t; if (S._ct) S._ct(); }, () => go(Math.round(S.t)));
    render();
  }

  /* ================= 5. the price distribution ================= */
  function price() {
    const bars = $('.pw-bars'), read = $('.pw-read'), B = D.bands, max = Math.max(...B.map((b) => b[1])), MED = 3, COMMON = 2; const S = { i: MED, brand: 0 };
    const short = ['<2', '2–5', '5–10', '10–15', '15–20', '20–25', '25–30', '30–40', '40–50', '50–60', '75–100', '100+'];
    bars.innerHTML = `<div class="pw-mid"><span>Middle half of the jobs: $5k–$25k</span></div>` + B.map((b, i) => `<div class="pw-col" data-i="${i}"><span class="pw-n">${b[1]}</span><i class="pw-bar" style="--h:${(b[1] / max * 100).toFixed(1)}%"></i><em>${short[i]}</em></div>`).join('') + `<div class="pw-flags"></div>`;
    const cols = $$('.pw-col', bars), flags = $('.pw-flags', bars);
    function flagsDraw() {
      const f = [[MED, 'Median band', 'pw-f1'], [COMMON, 'Most common band', 'pw-f2']]; const br = D.brands[S.brand - 1]; if (S.brand) { const bi = B.findIndex((b) => b[0] === br[2]); f.push([bi, br[0] + ' median', 'pw-f3']); }
      flags.innerHTML = f.map((x) => `<span class="pw-flag ${x[2]}" style="left:${(x[0] + .5) / B.length * 100}%">${esc(x[1])}</span>`).join('');
      requestAnimationFrame(() => { $$('.pw-flag', flags).forEach((el, k) => { const n = cols[f[k][0]].querySelector('.pw-n'); const h = n.getBoundingClientRect().top - el.getBoundingClientRect().bottom - 4; if (h > 0) el.style.setProperty('--sh', h + 'px'); }); });
    }
    function pick(i, user) { S.i = clamp(i, 0, B.length - 1); cols.forEach((c, j) => c.classList.toggle('on', j === S.i)); const b = B[S.i]; const tags = (S.i === MED ? ' · the median band' : '') + (S.i === COMMON ? ' · the most common band' : '');
      read.innerHTML = `<b>${esc(b[0])}</b> · <b>${b[1]}</b> of 376 priced window jobs${tags}`; bars.setAttribute('aria-valuenow', S.i); bars.setAttribute('aria-valuetext', b[0] + ': ' + b[1] + ' of 376 priced window jobs' + tags); }
    bars.addEventListener('pointermove', (e) => { if (e.pointerType === 'touch') return; const c = e.target.closest('.pw-col'); if (c) pick(+c.dataset.i); });
    drag(bars, (e) => { const r = bars.getBoundingClientRect(); pick(Math.floor((e.clientX - r.left) / r.width * B.length)); });
    bars.addEventListener('keydown', (e) => { const k = e.key; let n = null; if (k === 'ArrowRight' || k === 'ArrowUp') n = S.i + 1; else if (k === 'ArrowLeft' || k === 'ArrowDown') n = S.i - 1; else if (k === 'Home') n = 0; else if (k === 'End') n = B.length - 1; if (n !== null) { e.preventDefault(); pick(n); } });
    const items = [['All 376 priced jobs']].concat(D.brands);
    radios($('.pw-chips'), items, (b, i) => i ? `<b>${esc(b[0])}</b><span>${b[1]} jobs · ${esc(b[2])}</span>` : `<b>${esc(b[0])}</b><span>No maker marked</span>`, (b, i) => { S.brand = i; flagsDraw(); }, 0);
    const cmax = Math.max(...D.cities.map((c) => c[1]));
    $('.pw-cities').innerHTML = D.cities.map((c) => `<div class="pw-crow"><span class="pw-cn">${esc(c[0])}</span><u><i style="--w:${(c[1] / cmax * 100).toFixed(1)}%"></i></u><b>${c[1]}</b><em>${esc(c[2])}</em></div>`).join('') + `<p class="pw-sm">Priced window jobs by city, with each city’s median band. Cities with fewer than five priced window jobs are left out.</p>`;
    $('.pw-srow').innerHTML = D.same.map((s) => `<div class="pw-sm1"><svg viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="18" fill="none" stroke="#D5E1D7" stroke-width="6"/><circle class="pw-ring" cx="22" cy="22" r="18" fill="none" stroke="#0E3B2C" stroke-width="6" stroke-linecap="round" pathLength="100" stroke-dasharray="${s[1]} 100" transform="rotate(-90 22 22)"/></svg><div><b>${s[1]}%</b><span>${esc(s[0])}</span><small>${s[2]} of 376</small></div></div>`).join('');
    pick(MED); flagsDraw(); onShow.push(flagsDraw); addEventListener('resize', () => shown && flagsDraw());
  }

  /* ================= 6. before/after wipe ================= */
  function pairs() {
    const P = D.pairs, st = $('.pw-wst'), line = $('.pw-wline'), cap = $('.pw-wcap'), pis = $$('.pw-pi', st); const S = { pos: 50, i: 0 };
    function setPos(p) { S.pos = clamp(p, 0, 100); pis.forEach((pi) => { pi.lastElementChild.style.clipPath = `inset(0 0 0 ${S.pos}%)`; }); line.style.left = S.pos + '%'; line.setAttribute('aria-valuenow', Math.round(S.pos)); $('.pw-wb').style.opacity = S.pos > 14 ? 1 : 0; $('.pw-wa').style.opacity = S.pos < 86 ? 1 : 0; }
    radios($('.pw-wtabs'), P, (p) => `<b>${esc(p.place.split(',')[0])}</b><span>${esc(p.when)}</span>`, (p, i, user) => { S.i = i; pis.forEach((pi, j) => { pi.hidden = j !== i; }); cap.innerHTML = `<b>${esc(p.place)}</b> · ${esc(p.when)} · Installed: ${esc(p.inst)} · ${esc(p.bl)}: <b>${esc(p.band)}</b>`; if (user) { setPos(50); } }, 0);
    drag(st, (e) => { const r = st.getBoundingClientRect(); setPos((e.clientX - r.left) / r.width * 100); }, () => { if (S._cpos) S._cpos(); });
    line.addEventListener('keydown', (e) => { if (S._cpos) S._cpos(); const k = e.key, d = { ArrowLeft: -5, ArrowRight: 5, PageUp: 20, PageDown: -20 }[k]; if (k === 'Home') { e.preventDefault(); setPos(0); } else if (k === 'End') { e.preventDefault(); setPos(100); } else if (d) { e.preventDefault(); setPos(S.pos + d); } });
    setPos(50); let ran = false; onShow.push(() => { if (ran || RM()) return; ran = true; });
    const io = 'IntersectionObserver' in window ? new IntersectionObserver((en) => { en.forEach((x) => { if (x.isIntersecting && !S.shown && shown) { S.shown = true; if (!RM()) { S.pos = 100; setPos(100); tween(S, 'pos', 50, 1500, () => setPos(S.pos)); } io.disconnect(); } }); }, { threshold: .5 }) : null; io && io.observe(st);
  }

  /* ================= 7. warranties ================= */
  function warr() {
    const W = D.warr, l1 = $('.pw-l1'), stack = $('.pw-stack');
    radios($('.pw-wrt'), W, (w) => `<b>${esc(w[0].split(' · ')[0])}</b><span>${esc(w[0].split(' · ')[1])}</span>`, (w, i, user) => { l1.querySelector('b').textContent = w[1]; l1.querySelector('span').textContent = w[2]; l1.querySelector('span').hidden = !w[2]; if (user && !RM()) { l1.classList.remove('in'); void l1.offsetWidth; l1.classList.add('in'); } }, 0);
  }

  /* ---- parallax of the section art, only while the page is shown ---- */
  function parallax() {
    const bgs = $$('.pw-bg'); let tick = 0;
    function run() { tick = 0; if (!shown || RM()) return; const vh = innerHeight; bgs.forEach((bg) => { const r = bg.parentNode.getBoundingClientRect(); if (r.bottom < -200 || r.top > vh + 200) return; const p = clamp((vh - r.top) / (vh + r.height), 0, 1); bg.style.setProperty('--p', p.toFixed(3)); }); }
    addEventListener('scroll', () => { if (!tick) tick = requestAnimationFrame(run); }, { passive: true }); addEventListener('resize', run); onShow.push(run);
  }

  function wire(root) {
    ROOT = root.querySelector ? (root.querySelector('.pw') || root) : root; if (!ROOT.dataset || !ROOT.dataset.pwd) return;
    D = JSON.parse(ROOT.dataset.pwd);
    opener(); parts(); glass(); order(); price(); pairs(); warr(); parallax();
    document.addEventListener('fpage', (e) => { shown = e.detail === 'windows'; if (shown) { onShow.forEach((f) => f()); } });
    const rv = $$('.pw-hd,.pw-xgrid,.pw-frames,.pw-gg,.pw-ogrid,.pw-q,.pw-pgrid,.pw-same,.pw-wgrid,.pw-wr,.pw-close'); rv.forEach((n) => n.classList.add('pw-rv'));
    if ('IntersectionObserver' in window && !RM()) { const io = new IntersectionObserver((en) => en.forEach((x) => { if (x.isIntersecting) { x.target.classList.add('pw-in-v'); io.unobserve(x.target); } }), { threshold: .12 }); rv.forEach((n) => io.observe(n)); } else rv.forEach((n) => n.classList.add('pw-in-v'));
  }
  return { wire };
})();
