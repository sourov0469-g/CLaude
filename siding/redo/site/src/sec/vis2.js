/* VISUALISER, new versions for upgrade Round 2. Colours are the firm's published values (FACTS.md): James Hardie ColorPlus,
   the 17 colours offered for Austin (Arctic White trim), or painted on site (the 12 Sherwin-Williams samples it publishes).
   C — colour fields (Cash App Brand Guidelines: colour as content): a deck of colour bands; the chosen colour fills the
       preview as a field with the house drawn into it; pin a second colour to compare them side by side.
   D — the instrument (Rimowa UNIQUE: a designed four-step instrument, profile → colour → trim → preview): radio tiles,
       a colour dial you turn, and a small 3D-feel corner of wall that answers every setting; the last step saves a plain
       spec file to the visitor's own device. Nothing is sent anywhere. */
window.Vis2 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  const CP = [['Arctic White', '#E0E0D8'], ['Cobble Stone', '#C6BEB0'], ['Navajo Beige', '#D5C9B2'], ['Khaki Brown', '#A28F7D'], ['Timber Bark', '#7B7064'], ['Rich Espresso', '#5F5A55'],
    ['Mountain Sage', '#706F5E'], ['Light Mist', '#B6BAB5'], ['Pearl Gray', '#B2AEA9'], ['Gray Slate', '#898A87'], ['Boothbay Blue', '#778184'], ['Evening Blue', '#5F696D'],
    ['Deep Ocean', '#49545C'], ['Aged Pewter', '#7D7974'], ['Night Gray', '#6A6D6F'], ['Iron Gray', '#575B59'], ['Countrylane Red', '#714D47']];
  const SW = [['Pure White SW 7005', '#EDECE6'], ['Alabaster SW 7008', '#EDEAE0'], ['Agreeable Gray SW 7029', '#D1CBC1'], ['Repose Gray SW 7015', '#CCC9C0'], ['Accessible Beige SW 7036', '#D1C7B8'],
    ['Dovetail SW 7018', '#908A83'], ['Gauntlet Gray SW 7019', '#78736E'], ['Urbane Bronze SW 7048', '#54504A'], ['Iron Ore SW 7069', '#434341'], ['Tricorn Black SW 6258', '#2F2F30'],
    ['In the Navy SW 9178', '#283849'], ['Hunt Club SW 6468', '#2A4F43']];
  const lum = (h) => { const c = [1, 3, 5].map((i) => parseInt(h.substr(i, 2), 16) / 255).map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4)); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
  const ink = (h) => (lum(h) > 0.28 ? '#16191D' : '#FFFFFF');
  const book = `<a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a>`;

  /* ---------- C: colour fields ---------- */
  const houseLines = () => { let l = ''; for (let y = 236; y < 420; y += 13) l += `<path d="M150 ${y}H450"/>`;
    return `<svg class="hl" viewBox="0 0 600 440" aria-hidden="true"><g class="ln">${l}</g><path class="ol" d="M150 420V230L300 120L450 230V420Z"/><path class="ol" d="M128 238L300 112L472 238"/>
      <rect class="tr" x="185" y="268" width="66" height="84"/><rect class="tr" x="349" y="268" width="66" height="84"/><rect class="tr" x="274" y="320" width="52" height="100"/><path class="ol" d="M110 420H490"/></svg>`; };
  const bands = (L, set) => L.map(([n, h], i) => `<button type="button" class="band" role="radio" aria-checked="${i === 15 && set === 'cp'}" data-i="${i}" style="--c:${h};--t:${ink(h)}"><b>${n}</b><span>${h}</span></button>`).join('');
  const C = () => `<section class="sec viC" id="colours" aria-labelledby="viC-h">
    <div class="lft"><h2 class="sec-h" id="viC-h" data-split>Colour fills the wall.</h2>
      <p class="sec-p">Each colour fills the whole wall. Pick one to keep it, then pin a second to compare.</p>
      <div class="seg" role="group" aria-label="Finish"><button type="button" aria-pressed="true" data-set="cp">ColorPlus, 17 for Austin</button><button type="button" aria-pressed="false" data-set="sw">Painted on site</button></div>
      <div class="deck" role="radiogroup" aria-label="Colours" data-set="cp">${bands(CP, 'cp')}</div>
      <div class="deck" role="radiogroup" aria-label="Colours" data-set="sw" hidden>${bands(SW, 'sw')}</div></div>
    <div class="rgt"><div class="fields" data-solid>
        <div class="fd a" style="--c:#575B59;--t:#fff">${houseLines()}<div class="nm"><b>Iron Gray</b><span>ColorPlus · #575B59</span></div></div>
        <div class="fd b" style="--c:#E0E0D8;--t:#16191D">${houseLines()}<div class="nm"><b>Arctic White</b><span>ColorPlus · #E0E0D8</span></div></div></div>
      <div class="act"><button type="button" class="btn light" data-cmp aria-pressed="false">Compare two</button>${book}</div>
      <p class="note">ColorPlus is baked on at the factory; painted finishes come from 1,700+ Sherwin-Williams colours. Screens show colour a little differently.</p></div></section>`;

  function wireC(root) {
    const s = root.querySelector('.viC'); if (!s) return; const A = s.querySelector('.fd.a'), Bf = s.querySelector('.fd.b'), fields = s.querySelector('.fields'), cmp = s.querySelector('[data-cmp]');
    let set = 'cp', pick = { a: ['Iron Gray', '#575B59', 'ColorPlus'], b: ['Arctic White', '#E0E0D8', 'ColorPlus'] }, compare = false, slot = 'b';
    const paint = (el, [n, h, f]) => { el.style.setProperty('--c', h); el.style.setProperty('--t', ink(h)); el.querySelector('.nm b').textContent = n; el.querySelector('.nm span').textContent = `${f} · ${h}`; };
    const list = () => (set === 'cp' ? CP : SW), fin = () => (set === 'cp' ? 'ColorPlus' : 'Painted');
    s.querySelectorAll('.seg button').forEach((b) => b.addEventListener('click', () => { set = b.dataset.set; s.querySelectorAll('.seg button').forEach((x) => x.setAttribute('aria-pressed', x === b)); s.querySelectorAll('.deck').forEach((d) => (d.hidden = d.dataset.set !== set)); }));
    s.querySelectorAll('.deck').forEach((deck) => { const bs = [...deck.querySelectorAll('.band')];
      bs.forEach((b, i) => {
        b.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') paint(compare ? (slot === 'a' ? A : Bf) : A, [...list()[i], fin()]); });
        b.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') { paint(A, pick.a); paint(Bf, pick.b); } });
        b.addEventListener('click', () => { const v = [...list()[i], fin()]; if (compare) { pick[slot] = v; slot = slot === 'a' ? 'b' : 'a'; } else pick.a = v; paint(A, pick.a); paint(Bf, pick.b);
          s.querySelectorAll('.band').forEach((x) => x.setAttribute('aria-checked', 'false')); b.setAttribute('aria-checked', 'true'); });
        b.addEventListener('keydown', (e) => { const d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key]; if (d) { e.preventDefault(); const n = bs[(i + d + bs.length) % bs.length]; n.focus(); n.click(); } });
        b.tabIndex = b.getAttribute('aria-checked') === 'true' ? 0 : -1; }); });
    s.querySelectorAll('.deck[data-set=sw] .band')[0].tabIndex = 0;
    cmp.addEventListener('click', () => { compare = !compare; cmp.setAttribute('aria-pressed', compare); cmp.textContent = compare ? 'Show one' : 'Compare two'; fields.classList.toggle('two', compare); slot = 'b'; });
  }

  /* ---------- D: the instrument ---------- */
  const STEPS = ['Profile', 'Colour', 'Trim', 'Preview'];
  const TRIMS = [['arctic', 'Arctic White', 'the ColorPlus trim colour', '#E0E0D8'], ['match', 'Match the body', 'one colour, quieter', null], ['dark', 'Tricorn Black', 'painted, SW 6258', '#2F2F30']];
  const mini = (k) => k === 'lap' ? `<svg viewBox="0 0 80 56" aria-hidden="true">${[8, 20, 32, 44].map((y, i) => `<path d="M6 ${y}H74" style="--d:${i * 0.1}s"/>`).join('')}</svg>`
    : `<svg viewBox="0 0 80 56" aria-hidden="true">${[16, 32, 48, 64].map((x, i) => `<path d="M${x} 4V52" style="--d:${i * 0.1}s"/>`).join('')}</svg>`;
  const dial = () => { const n = CP.length, R = 120, r = 78; let seg = '';
    CP.forEach(([nm, h], i) => { const a0 = (i / n) * 2 * Math.PI - Math.PI / 2, a1 = ((i + 1) / n) * 2 * Math.PI - Math.PI / 2, g = 0.012;
      const p = (a, rad) => [150 + rad * Math.cos(a), 150 + rad * Math.sin(a)].map((v) => v.toFixed(1)).join(' ');
      seg += `<path class="sg" data-i="${i}" d="M${p(a0 + g, R)}A${R} ${R} 0 0 1 ${p(a1 - g, R)}L${p(a1 - g, r)}A${r} ${r} 0 0 0 ${p(a0 + g, r)}Z" fill="${h}"/>`; });
    return `<svg class="dial" viewBox="0 0 300 300" aria-hidden="true">${seg}<g class="knob"><circle cx="150" cy="150" r="64" fill="#fff"/><circle cx="150" cy="150" r="64" fill="none" stroke="#E3E7E4" stroke-width="2"/>
      ${Array.from({ length: 34 }, (_, i) => `<path d="M150 92v6" transform="rotate(${i * 360 / 34} 150 150)" stroke="#C9D2CC" stroke-width="2"/>`).join('')}<path class="ptr" d="M150 84l7 14h-14z" fill="#0E3B2C"/></g></svg>`; };
  const D = () => `<section class="sec viD" id="colours" aria-labelledby="viD-h" style="--c:#575B59;--tr:#E0E0D8">
    <div class="hd"><h2 class="sec-h" id="viD-h" data-split>Profile, colour, trim. Then preview.</h2>
      <ol class="stp">${STEPS.map((t, i) => `<li><button type="button" data-s="${i}" ${i ? '' : 'aria-current="step"'}><i>${i + 1}</i>${t}</button></li>`).join('')}<span class="pl" aria-hidden="true"><i></i></span></ol></div>
    <div class="ins" data-solid>
      <div class="panel">
        <fieldset data-p="0"><legend>Profile</legend><div class="tiles">
          <label class="tile"><input type="radio" name="viD-p" value="lap" checked>${mini('lap')}<b>Lap, 8.25 in</b><small>301 of 415 priced jobs</small></label>
          <label class="tile"><input type="radio" name="viD-p" value="bnb">${mini('bnb')}<b>Board &amp; batten</b><small>27 of 415</small></label></div></fieldset>
        <fieldset data-p="1" hidden><legend>Colour</legend><div class="dialwrap"><div class="dbox" role="slider" tabindex="0" aria-label="ColorPlus colour" aria-valuemin="1" aria-valuemax="17" aria-valuenow="16" aria-valuetext="Iron Gray">${dial()}<div class="cn"><b>Iron Gray</b><span>16 of 17</span></div></div>
          <p class="hint3">Turn the dial, or use the arrow keys.</p></div></fieldset>
        <fieldset data-p="2" hidden><legend>Trim</legend><div class="tiles three">${TRIMS.map(([v, n, d, h], i) => `<label class="tile"><input type="radio" name="viD-t" value="${v}" ${i ? '' : 'checked'}><span class="sw" style="background:${h || 'var(--c)'}"></span><b>${n}</b><small>${d}</small></label>`).join('')}</div></fieldset>
        <fieldset data-p="3" hidden><legend>Preview</legend><dl class="spec"></dl>
          <div class="acts"><button type="button" class="btn light" data-save>Save my spec</button>${book}</div><p class="note">The spec saves as a small text file on your own device. Nothing is sent from this page.</p></fieldset>
        <div class="nav"><button type="button" class="btn light" data-n="-1">Back</button><button type="button" class="btn" data-n="1">Next</button></div></div>
      <div class="view" aria-hidden="true"><div class="corner"><div class="face l"><i class="win"></i></div><div class="face r"></div><i class="cb"></i><i class="fascia"></i></div><span class="vl"></span></div>
    </div></section>`;

  function wireD(root) {
    const s = root.querySelector('.viD'); if (!s) return; const st = { step: 0, profile: 'lap', colour: 15, trim: 'arctic' };
    const fs = [...s.querySelectorAll('fieldset')], sb = [...s.querySelectorAll('.stp button')], view = s.querySelector('.view'), corner = s.querySelector('.corner'), vl = s.querySelector('.vl');
    const dbox = s.querySelector('.dbox'), knob = s.querySelector('.knob'), segs = [...s.querySelectorAll('.sg')];
    const trimHex = () => (st.trim === 'arctic' ? '#E0E0D8' : st.trim === 'match' ? CP[st.colour][1] : '#2F2F30');
    function render() {
      fs.forEach((f, i) => (f.hidden = i !== st.step)); sb.forEach((b, i) => { b.toggleAttribute('aria-current', i === st.step); if (i === st.step) b.setAttribute('aria-current', 'step'); b.classList.toggle('done', i < st.step); });
      s.querySelector('.pl i').style.transform = `scaleX(${st.step / 3})`;
      const [n, h] = CP[st.colour]; s.style.setProperty('--c', h); s.style.setProperty('--tr', trimHex()); corner.dataset.p = st.profile;
      knob.style.transform = `rotate(${(st.colour + 0.5) / CP.length * 360}deg)`; segs.forEach((g, i) => g.classList.toggle('on', i === st.colour));
      dbox.setAttribute('aria-valuenow', st.colour + 1); dbox.setAttribute('aria-valuetext', n); s.querySelector('.cn b').textContent = n; s.querySelector('.cn span').textContent = `${st.colour + 1} of 17`;
      vl.textContent = `${st.profile === 'lap' ? 'Lap 8.25 in' : 'Board & batten'} · ${n} · ${TRIMS.find((t) => t[0] === st.trim)[1]} trim`;
      s.querySelector('.spec').innerHTML = [['Profile', st.profile === 'lap' ? 'Lap, 8.25 in (301 of 415 priced jobs)' : 'Board & batten (27 of 415)'], ['Colour', `${n} (ColorPlus, ${h})`], ['Trim', TRIMS.find((t) => t[0] === st.trim)[1]]].map(([a, b]) => `<div><dt>${a}</dt><dd>${b}</dd></div>`).join('');
      const nx = s.querySelector('[data-n="1"]'); nx.hidden = st.step === 3; s.querySelector('[data-n="-1"]').style.visibility = st.step ? 'visible' : 'hidden';
    }
    s.querySelectorAll('input[name=viD-p]').forEach((r) => r.addEventListener('change', () => { st.profile = r.value; render(); }));
    s.querySelectorAll('input[name=viD-t]').forEach((r) => r.addEventListener('change', () => { st.trim = r.value; render(); }));
    s.querySelectorAll('[data-n]').forEach((b) => b.addEventListener('click', () => { st.step = Math.max(0, Math.min(3, st.step + +b.dataset.n)); render(); fs[st.step].querySelector('legend').focus?.(); }));
    sb.forEach((b, i) => b.addEventListener('click', () => { st.step = i; render(); }));
    // the dial: drag around it, click a segment, or use the keys
    const fromPointer = (e) => { const r = dbox.getBoundingClientRect(), a = Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) + Math.PI / 2;
      st.colour = Math.floor(((a / (2 * Math.PI) + 1) % 1) * CP.length) % CP.length; render(); };
    let drag = false; dbox.addEventListener('pointerdown', (e) => { drag = true; dbox.setPointerCapture(e.pointerId); fromPointer(e); }); dbox.addEventListener('pointermove', (e) => { if (drag) fromPointer(e); });
    dbox.addEventListener('pointerup', () => (drag = false)); dbox.addEventListener('pointercancel', () => (drag = false));
    dbox.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[e.key]; if (d) { e.preventDefault(); st.colour = (st.colour + d + CP.length) % CP.length; render(); } if (e.key === 'Home') { st.colour = 0; render(); } if (e.key === 'End') { st.colour = CP.length - 1; render(); } });
    // the corner leans toward the pointer (S1330 damping)
    const t = { x: 0, y: 0, tx: 0, ty: 0 }; let raf = 0, t0 = 0;
    const f = (now) => { raf = 0; const dt = Math.min(1 / 30, t0 ? (now - t0) / 1000 : 1 / 60); t0 = now; const a = RM ? 1 : 1 - Math.pow(1 - 0.055, dt * 60); t.x += (t.tx - t.x) * a; t.y += (t.ty - t.y) * a;
      corner.style.setProperty('--ry', (t.x * 14).toFixed(2) + 'deg'); corner.style.setProperty('--rx', (-t.y * 8).toFixed(2) + 'deg'); if (Math.abs(t.tx - t.x) + Math.abs(t.ty - t.y) > 0.001) raf = requestAnimationFrame(f); else t0 = 0; };
    view.addEventListener('pointermove', (e) => { if (e.pointerType !== 'mouse') return; const r = view.getBoundingClientRect(); t.tx = ((e.clientX - r.left) / r.width) * 2 - 1; t.ty = ((e.clientY - r.top) / r.height) * 2 - 1; if (!raf) raf = requestAnimationFrame(f); });
    view.addEventListener('pointerleave', () => { t.tx = t.ty = 0; if (!raf) raf = requestAnimationFrame(f); });
    // save the spec as a plain text file on the visitor's own device
    s.querySelector('[data-save]').addEventListener('click', () => { const [n, h] = CP[st.colour];
      const txt = `Austin Pro Siding, Windows & Roofing: my siding spec\n\nProfile: ${st.profile === 'lap' ? 'Lap, 8.25 in' : 'Board and batten'}\nColour: ${n} (James Hardie ColorPlus, ${h})\nTrim: ${TRIMS.find((x) => x[0] === st.trim)[1]}\n\nBring this to your free inspection. Book at ${BOOK} or call (512) 550-0000.\n`;
      const u = URL.createObjectURL(new Blob([txt], { type: 'text/plain' })), a = document.createElement('a'); a.href = u; a.download = 'austin-pro-siding-spec.txt'; document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(u), 2000); });
    render();
  }
  return { C, D, wire(root) { wireC(root); wireD(root); } };
})();
