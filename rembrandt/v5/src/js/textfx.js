// Headings answer the cursor (owner: "headings and text shift/respond as it passes").
// Characters near the pointer lift and grow a little, by proximity; transform only (S0019 perf), rects read once on
// enter and on scroll, never per pointer move (S1330). Movement stays under 16px (S1321 directional hover).

const prepared = new WeakSet();
export function prepText(root) { // split [data-cursor=text] into words and characters, keeping one accessible name
  root.querySelectorAll('[data-cursor="text"]').forEach(h => {
    if (prepared.has(h)) return; prepared.add(h);
    h.setAttribute('aria-label', h.textContent.replace(/\s+/g, ' ').trim());
    const walk = document.createTreeWalker(h, NodeFilter.SHOW_TEXT), nodes = [];
    while (walk.nextNode()) nodes.push(walk.currentNode);
    for (const n of nodes) {
      const frag = document.createDocumentFragment();
      for (const part of n.textContent.split(/(\s+)/)) {
        if (!part) continue;
        if (/^\s+$/.test(part)) { frag.append(part); continue; }
        const w = document.createElement('span'); w.className = 'wd'; w.setAttribute('aria-hidden', 'true');
        for (const ch of part) { const c = document.createElement('span'); c.className = 'ch'; c.textContent = ch; w.append(c); }
        frag.append(w);
      }
      n.replaceWith(frag);
    }
  });
}

// One damped loop for the hovered heading (S0183: a pointer follower writes transforms directly, no tween per char).
let active = null, raf = 0, last = 0; // active = { h, chars: [{el, x, y, cy, cs, ty, ts}], R, lift }
function measure(a) {
  const sx = scrollX, sy = scrollY;
  a.chars.forEach(c => { const r = c.el.getBoundingClientRect(); c.x = r.left + r.width / 2 + sx; c.y = r.top + r.height / 2 + sy; });
}
function tick(t) {
  raf = 0;
  const dt = Math.min((t - (last || t)) / 1000, 1 / 30); last = t;
  const a = 1 - Math.pow(1 - 0.16, dt * 60); // S1330 frame-rate independent damping
  let moving = false;
  for (const set of [active, leaving]) if (set) for (const c of set.chars) {
    c.cy += (c.ty - c.cy) * a; c.cs += (c.ts - c.cs) * a;
    if (Math.abs(c.ty - c.cy) > 0.02 || Math.abs(c.ts - c.cs) > 0.0005) moving = true; else { c.cy = c.ty; c.cs = c.ts; }
    c.el.style.transform = c.cy || c.cs !== 1 ? `translate3d(0,${c.cy.toFixed(2)}px,0) scale(${c.cs.toFixed(4)})` : '';
  }
  if (moving) raf = requestAnimationFrame(tick); else { last = 0; if (leaving) leaving = null; }
}
const wake = () => { if (!raf) raf = requestAnimationFrame(tick); };
let leaving = null;
const state = new WeakMap(); // keep each char's current offset across enters
export function textEnter(h) {
  if (active && active.h === h) return;
  textLeave();
  const fs = parseFloat(getComputedStyle(h).fontSize) || 48;
  const chars = [...h.querySelectorAll('.ch')].map(el => { let c = state.get(el); if (!c) { c = { el, cy: 0, cs: 1, ty: 0, ts: 1 }; state.set(el, c); } return c; });
  active = { h, chars, R: Math.max(110, fs * 1.5), lift: Math.min(14, fs * 0.11) };
  measure(active);
}
export function textMove(x, y) {
  if (!active) return;
  const px = x + scrollX, py = y + scrollY, { R, lift } = active;
  for (const c of active.chars) { const d = Math.hypot(c.x - px, c.y - py), f = d < R ? (1 - d / R) ** 2 : 0; c.ty = -lift * f; c.ts = 1 + 0.08 * f; }
  wake();
}
export function textScroll() { if (active) measure(active); }
export function textLeave() {
  if (!active) return;
  active.chars.forEach(c => { c.ty = 0; c.ts = 1; });
  leaving = leaving ? { chars: leaving.chars.concat(active.chars) } : active; active = null; wake();
}
