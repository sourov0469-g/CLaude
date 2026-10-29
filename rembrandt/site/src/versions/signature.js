import { def, d, $, $$, E, calm, small, once } from './registry.js';

// ---------- S7 V2 "The terms, plainly": rows present; the active row gets the chalk-blue left rule (CSS, 160ms)
def('signature', 2, { init() {} });

// ---------- S7 V3 "Fifty years": SVG ticks drawn once; the "today" marker drops in (y -12 -> 0, 400ms); native horizontal scroll with snap on phones
def('signature', 3, {
  init(sec) {
    const svg = $('[data-ruler]', sec), box = $('[data-ruler-scroll]', sec), y0 = +new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', year: 'numeric' }).format(new Date());
    $('[data-y0]', sec).textContent = String(y0); $('[data-y20]', sec).textContent = String(y0 + 20); $('[data-y50]', sec).textContent = String(y0 + 50);
    // desktop: the fifty years fit the measure, so the end of the coverage is on screen; phones keep 34px a year and scroll natively
    const draw = () => {
      const cs = getComputedStyle(box), inner = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight), fit = innerWidth >= 900;
      const step = fit ? Math.max(18, (inner - 120) / 50) : 34, W = step * 50 + 120, H = 190, x = i => 60 + i * step;
      let s = `<line class="base" x1="40" x2="${W - 40}" y1="120" y2="120"/>`;
      for (let i = 0; i <= 50; i++) { const big = i % 10 === 0, mid = i % 5 === 0; s += `<line class="tk" x1="${x(i)}" x2="${x(i)}" y1="120" y2="${120 - (big ? 34 : mid ? 22 : 12)}"/>`; if (mid) s += `<text class="yr" x="${x(i)}" y="146" text-anchor="middle">${y0 + i}</text>`; }
      s += `<rect class="cover" x="${x(0)}" y="112" width="${x(50) - x(0)}" height="8"/>`;
      s += `<g class="mk today" data-today><line x1="${x(0)}" x2="${x(0)}" y1="30" y2="120"/><text x="${x(0) + 8}" y="40">Today: you sign off</text></g>`;
      s += `<g class="mk twenty"><line x1="${x(20)}" x2="${x(20)}" y1="52" y2="120"/><text x="${x(20) + 8}" y="62">The 20-year mark</text></g>`;
      s += `<g class="mk end"><line x1="${x(50)}" x2="${x(50)}" y1="30" y2="120"/><text x="${x(50) - 8}" y="40" text-anchor="end">Material coverage ends</text></g>`;
      svg.setAttribute('viewBox', `0 0 ${W} ${H}`); svg.setAttribute('width', W); svg.setAttribute('height', H); svg.innerHTML = s;
      if (fit) box.removeAttribute('tabindex'); else box.tabIndex = 0; // a tab stop only while it actually scrolls
    };
    draw(); let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => sec.isConnected && draw(), 150); });
    if (calm()) return;
    once(svg, () => $('[data-today]', svg).animate([{ transform: 'translateY(-12px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 400, easing: E.out, fill: 'backwards' }), { threshold: 0.3 });
  }
});
