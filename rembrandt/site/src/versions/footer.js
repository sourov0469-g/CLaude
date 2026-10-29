import { def, d, $, $$, calm } from './registry.js';
const RR = window.RR;
// ---------- S15 V2 "Porch light": light on in office hours, off after 5 and at weekends; two layers crossfade 300ms (none in calm)
def('footer', 2, {
  init(sec) {
    const porch = $('[data-porch]', sec), line = $('[data-porch-line]', sec);
    const upd = () => { const o = RR.office(); porch.classList.toggle('lit', o.open); line.innerHTML = o.open ? 'We\'re in. Call <a class="phone" href="tel:+19377467377">(937) 746-7377</a>.' : 'Leave a message or text. We call back in the morning.'; };
    upd(); setInterval(() => sec.isConnected && upd(), 60000);
  }
});
def('footer', 3, { init() {} });
