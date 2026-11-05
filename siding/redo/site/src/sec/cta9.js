/* BOOKING N — "The open door" (upgrade plan B-A). Reference: Dropbox Brand, the closing by subtraction: one sentence, one action,
   nothing else on the stage. The close of the page: the firm's own sentence as the heading, the one filled Book button, the phone,
   the hours (the sign needs them), and a hanging OPEN / CLOSED sign that follows the office in Austin time. State-driven only: the
   visitor cannot set it. No form, no field, nothing sent or saved: booking happens on the firm's own scheduling page or by phone.
   Address and email stay in the footer only (Muse's consult reply); "4.9", counts and bands are not repeated here. */
window.Cta9 = (function () {
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  const TEL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>';
  // [first weekday, last weekday, opens, closes]: Mon–Fri 8–8, Sat 8–6, Sun 12–5 (Austin time)
  const HOURS = [[1, 5, 8, 20], [6, 6, 8, 18], [0, 0, 12, 17]];
  const fmt = (x) => (x > 12 ? x - 12 + ' pm' : x === 12 ? '12 pm' : x + ' am');
  function status() {
    const f = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date());
    const wd = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(f.find((p) => p.type === 'weekday').value), h = +f.find((p) => p.type === 'hour').value % 24 + +f.find((p) => p.type === 'minute').value / 60;
    const row = HOURS.find((r) => wd >= r[0] && wd <= r[1]);
    return h >= row[2] && h < row[3] ? { open: true, t: `Open now, until ${fmt(row[3])} Austin time` } : { open: false, t: `Closed now. ${h < row[2] ? `Opens ${fmt(row[2])} today` : 'Opens tomorrow'} (Austin time)` };
  }

  const N = () => `<section class="sec drN" id="booking" aria-labelledby="drN-h">
    <div class="drstage">
      <div class="drtxt">
        <h2 class="drh" id="drN-h">One free inspection covers every trade on the house.</h2>
        <div class="dract"><a class="btn key drbook" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a><a class="drtel" href="tel:+15125500000">${TEL}<span>(512) 550-0000</span></a></div>
        <p class="drhrs">Mon–Fri 8–8, Sat 8–6, Sun 12–5</p>
        <p class="drnote">Booking happens on our scheduling page.</p>
      </div>
      <div class="drside">
        <div class="drsignwrap" aria-hidden="true"><i class="drnail"></i>
          <div class="drswinger" data-s="?"><svg class="drcord" viewBox="0 0 320 70" preserveAspectRatio="none"><path d="M160 4L58 66M160 4L262 66" fill="none" stroke="#0E3B2C" stroke-width="3" stroke-linecap="round"/></svg>
            <div class="drsign"><div class="drflip"><div class="drface drf-open"><small>Austin Pro</small><b>OPEN</b></div><div class="drface drf-closed"><small>Austin Pro</small><b>CLOSED</b></div></div></div></div></div>
        <p class="drst"></p>
      </div>
    </div></section>`;

  function wire(root) {
    const s = root.querySelector('.drN'); if (!s || s.dataset.w) return; s.dataset.w = 1;
    const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sw = s.querySelector('.drswinger'), sign = s.querySelector('.drsign'), line = s.querySelector('.drst');
    let last = null;
    const paint = () => { const st = status(); if (last === st.open) { line.textContent = st.t; return; }
      const first = last === null; last = st.open; sw.dataset.s = st.open ? 'open' : 'closed'; line.textContent = st.t; line.classList.toggle('open', st.open);
      return first; };
    paint();
    // the office keeps its own clock: re-read it every 30 s while the section is on the page
    const tick = setInterval(() => { if (!s.isConnected) { clearInterval(tick); return; } if (!document.hidden) paint(); }, 30000);
    // the sign swings once from its nail the first time it is seen
    if (!RM && 'IntersectionObserver' in window) { const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { sw.classList.add('drswing'); io.disconnect(); } }, { threshold: .5 }); io.observe(sw); }
  }
  return { N, wire, status, HOURS };
})();
