// Version registry + small helpers shared by every alternate version.
export const V = {};
export const def = (key, n, impl) => { (V[key] || (V[key] = {}))[n] = impl; };
const RR = window.RR;
export const { d, H, $, $$, P, clamp, lerp, calm, small, E, R, kick, track } = RR;
export const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
// a per-frame subscriber that stops for good once its element leaves the document, and runs only while visible
export function sub(el, fn, margin = '10% 0px') {
  const s = { vis: false, el };
  new IntersectionObserver(e => { s.vis = e[e.length - 1].isIntersecting; if (s.vis) kick(); }, { rootMargin: margin }).observe(el);
  const f = (dt, t) => (s.vis && el.isConnected) ? fn(dt, t) : false;
  RR.subs.push(f); return s;
}
// progress through a sticky stage: 0 at its top, 1 when its bottom meets the viewport bottom
export const stageP = el => { const r = R(el); return clamp(-r.top / Math.max(1, r.height - innerHeight), 0, 1); };
export const once = (el, cb, opts = {}) => { const io = new IntersectionObserver(e => { if (e[e.length - 1].isIntersecting) { io.disconnect(); cb(); } }, opts); io.observe(el); };
export const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
// client-side stub of the estimate endpoint (A5), shared by the S5 alternates: ?submit=error | fail-once ; offline -> error
let tries = 0;
export async function sendEstimate() {
  tries++; await new Promise(r => setTimeout(r, 1200));
  const mode = P.get('submit');
  if (!navigator.onLine || mode === 'error' || (mode === 'fail-once' && tries === 1)) { track('estimate_error', { kind: 'send', attempt: tries }); return { ok: false, attempt: tries }; }
  const o = RR.office(); const when = o.open && o.beforeFour ? 'today by 5 pm' : RR.nextOpenPhrase(o);
  const ref = 'RR-' + Date.now().toString(36).slice(-6).toUpperCase(); tries = 0;
  track('estimate_submit', { inArea: !!RR.est.inArea });
  try { localStorage.setItem('rr-sent', JSON.stringify({ ref, when, t: Date.now() })); } catch (e) {}
  return { ok: true, ref, when };
}
