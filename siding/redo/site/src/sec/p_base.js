/* SUBPAGES — shared helpers. Locks verbatim; job photos are the firm's own documented projects (window.__JOBS, the same
   eight as On your street A), loaded once and placed by index so no version duplicates an image. */
window.PB = (function () {
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  const PH = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>';
  const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const book = (t = 'Book a free inspection') => `<a class="btn key" href="${BOOK}">${t}<span class="tab">${CAL}</span></a>`;
  const call = (cls = 'pcall') => `<a class="${cls}" href="tel:+15125500000">${PH}<span>(512) 550-0000</span></a>`;
  const J = () => window.__JOBS || [];
  // an <img> for firm job i (src filled at wire time from the one embedded copy)
  const img = (i, cls = '') => { const j = J()[i] || {}; return `<img class="${cls}" data-job="${i}" alt="${esc(j.alt || '')}" decoding="async">`; };
  const cap = (i) => { const j = J()[i] || {}; return `${esc(j.place || '')} · ${esc(j.when || '')} · ${esc(j.trades || '')}`; };
  const fill = (root) => root.querySelectorAll('img[data-job]').forEach((m) => { const j = J()[+m.dataset.job]; if (j && j.src && !m.src) m.src = j.src; });
  const LOCK = { phone: '(512) 550-0000', mail: 'info@austinprosiding.com', addr: '7801 N Lamar Blvd Suite C70, Austin TX 78752', hours: 'Mon–Fri 8–8, Sat 8–6, Sun 12–5', rating: '4.9 from 474 Google reviews', area: '312 on the map with photos + 574 more counted' };
  return { BOOK, CAL, PH, esc, book, call, img, cap, fill, LOCK, wire(root) { fill(root); } };
})();
