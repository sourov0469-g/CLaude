/* PROCESS N markup, build time only (prerender; never shipped to the page): the four drawn SVG scenes and the section. */
(function () {
  const P = window.Proc9, S = P.S, PH = P.PH;
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  const TEL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6.6 3h3l1.6 4.2-2 1.4a12 12 0 0 0 6.2 6.2l1.4-2 4.2 1.6v3a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 4.6 5.2 2 2 0 0 1 6.6 3z"/></svg>';
  const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const REV = () => globalThis.__REV || [];
  const pad = (i) => String(i + 1).padStart(2, '0');

  // ---------- the four drawn scenes (SVG, 640 × 420) ----------
  const COURSES = P.COURSES, CY = (i) => 40 + i * 20;   // install wall: 16 courses of 20, top first
  const sc1 = () => {
    const tag = (cls, dx, dy, x, y, w, t) => `<g class="pntag ${cls}"><line x1="${dx}" y1="${dy}" x2="${x}" y2="${y}" stroke="#0E3B2C" stroke-width="1.5" stroke-dasharray="2 3"/><circle cx="${dx}" cy="${dy}" r="4.5" fill="#B5DB6E" stroke="#0E3B2C" stroke-width="1.5"/>
      <g transform="translate(${x} ${y})"><g class="pnpill"><rect x="${-w / 2}" y="-15" width="${w}" height="30" rx="15" fill="#0E3B2C"/><text x="0" y="5" text-anchor="middle" fill="#FFFFFF" font-size="14" font-weight="700">${t}</text></g></g></g>`;
    return `<rect width="640" height="420" fill="#F1F5F2"/><rect x="436" y="300" width="80" height="120" fill="#E1E7E2"/>
      <g fill="#DCE5DF"><circle cx="96" cy="370" r="22"/><circle cx="560" cy="380" r="18"/><circle cx="84" cy="60" r="16"/></g>
      <path d="M182 122H438V308H182Z" fill="#E9ECEA"/><path d="M190 130H430L370 215H250Z" fill="#4E565B"/><path d="M190 300H430L370 215H250Z" fill="#3B4246"/><path d="M190 130L250 215L190 300Z" fill="#454C51"/><path d="M430 130L370 215L430 300Z" fill="#41484C"/>
      <path d="M250 215H370" stroke="#6E787D" stroke-width="3"/><path d="M190 130L250 215M430 130L370 215M190 300L250 215M430 300L370 215" stroke="#5E676C" stroke-width="2"/>
      <path d="M430 190H520V300H430Z" fill="#454D51"/><path d="M430 245H520" stroke="#6B757A" stroke-width="3"/>
      <path d="M186 126H434V194H524V304H186Z" fill="none" stroke="#EDEFEC" stroke-width="5" stroke-linejoin="round"/>
      <path class="pnpath" d="M170 330H535a20 20 0 0 0 20-20V105a20 20 0 0 0-20-20H170a20 20 0 0 0-20 20V310a20 20 0 0 0 20 20Z" fill="none" stroke="#8FA79A" stroke-width="2.5" stroke-dasharray="1 9" stroke-linecap="round"/>
      ${tag('t0', 300, 302, 300, 372, 82, 'Siding')}${tag('t1', 432, 302, 492, 372, 70, 'Trim')}${tag('t2', 522, 238, 592, 196, 84, 'Windows')}${tag('t3', 310, 215, 310, 50, 66, 'Roof')}${tag('t4', 188, 218, 98, 250, 92, 'Gutters')}
      <g class="pnmk"><circle r="20" fill="#B5DB6E" opacity=".45" class="pnring"/><circle r="13" fill="#0E3B2C" stroke="#FFFFFF" stroke-width="3"/><rect x="-4.5" y="-6" width="9" height="12" rx="1.5" fill="#FFFFFF"/><rect x="-2.5" y="-7.5" width="5" height="3" rx="1" fill="#B5DB6E"/></g>
      <g class="pnend"><rect x="186" y="190" width="268" height="40" rx="20" fill="#FFFFFF" stroke="#0E3B2C" stroke-width="2"/><text x="320" y="216" text-anchor="middle" font-size="15" font-weight="700" fill="#0E3B2C">One visit covers every trade.</text></g>`; };
  const ROWS = [['Siding', 1], ['Trim', 1], ['Windows', 1], ['Roof', 0], ['Gutters', 0]];
  const sc2 = () => `<rect width="640" height="420" fill="#F1F5F2"/><defs><clipPath id="pnSlot"><rect x="0" y="52" width="640" height="368"/></clipPath></defs>
      <g clip-path="url(#pnSlot)"><g class="pnsheet"><rect x="198" y="68" width="260" height="330" rx="6" fill="#0E3B2C" opacity=".08"/><rect x="190" y="60" width="260" height="330" rx="6" fill="#FFFFFF" stroke="#DCE5DF"/>
        <text x="214" y="100" font-size="20" font-weight="800" fill="#16201B">Proposal</text><text x="214" y="121" font-size="12.5" fill="#6B7A72">Itemised</text><path d="M214 134H426" stroke="#16201B" stroke-width="2"/>
        ${ROWS.map(([n, on], i) => `<g class="pnrow r${i}${on ? ' on' : ''}" transform="translate(0 ${160 + i * 40})"><rect x="214" y="-13" width="18" height="18" rx="4" fill="#FFFFFF" stroke="#0E3B2C" stroke-width="2"/>${on ? '<path class="pntk" d="M218 -4l4 4 7-8" fill="none" stroke="#0E3B2C" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" pathLength="1"/>' : ''}
          <text x="244" y="1" font-size="15" font-weight="600" fill="#16201B">${n}</text><path d="M318 0H384" stroke="#B9C4BE" stroke-width="2" stroke-dasharray="1 5" stroke-linecap="round"/><rect class="pnbar" x="392" y="-7" width="34" height="10" rx="5" fill="#DCE5DF"/></g>`).join('')}
        <text class="pnfoot" x="214" y="372" font-size="12.5" font-style="italic" fill="#3D4A43">the work you want, nothing else</text></g></g>
      <rect x="160" y="40" width="320" height="22" rx="11" fill="#0E3B2C"/><rect x="176" y="49" width="288" height="4" rx="2" fill="#06231A"/>`;
  // one course drawn once (#pnC) and reused 48 times; each use takes its colour from its class (fill, --ln)
  const sc3 = () => { const rows = (cls) => Array.from({ length: COURSES }, (_, i) => `<use href="#pnC" y="${CY(i) - 40}" class="${cls}"/>`).join('');
    return `<rect width="640" height="420" fill="#F1F5F2"/><defs><clipPath id="pnPaint"><rect class="pnpc" x="60" y="40" width="0" height="320"/></clipPath><g id="pnC"><rect x="60" y="40" width="520" height="20"/><rect x="60" y="57" width="520" height="3" style="fill:var(--ln)"/></g></defs>
      <rect x="60" y="40" width="520" height="320" fill="#CDB98F"/><g stroke="#B9A57B" stroke-width="2"><path d="M190 40V360M320 40V360M450 40V360M60 200H580"/></g>
      ${rows('pnold')}${rows('pnnew')}<g clip-path="url(#pnPaint)">${rows('pnpt')}</g>
      <rect x="270" y="125" width="100" height="120" fill="#A9C0C8"/><path d="M318 125V245M270 183H370" stroke="#F3F1EB" stroke-width="5"/>
      <rect class="pntrim" x="262" y="117" width="116" height="136" fill="none" stroke="#F3F1EB" stroke-width="10" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"/>
      <rect class="pncb l" x="60" y="40" width="12" height="320" fill="#F3F1EB"/><rect class="pncb r" x="568" y="40" width="12" height="320" fill="#F3F1EB"/>
      <rect x="40" y="360" width="560" height="14" rx="4" fill="#E1E7E2"/>
      <g class="pnroll"><path d="M9 62 L34 104 L34 150" fill="none" stroke="#16201B" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><rect x="-9" y="-12" width="22" height="78" rx="8" fill="#4F5F68" stroke="#16201B" stroke-width="2.5"/></g>`; };
  const POLLEN = Array.from({ length: 24 }, (_, i) => [40 + ((i * 97) % 560), 336 + ((i * 53) % 70), 2.5 + (i % 3)]);
  const sc4 = () => {
    const li = (y, a, b, i) => `<g class="pnli l${i}"><rect x="100" y="${y - 14}" width="20" height="20" rx="5" fill="#FFFFFF" stroke="#0E3B2C" stroke-width="2"/><path class="pntk" d="M104.5 ${y - 4}l4.5 4.5 8-9" fill="none" stroke="#0E3B2C" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" pathLength="1"/>
      <text x="130" y="${y}" font-size="13" font-weight="600" fill="#16201B">${a}${b ? `<tspan x="130" dy="17">${b}</tspan>` : ''}</text></g>`;
    return `<rect width="640" height="420" fill="#F1F5F2"/><rect x="0" y="322" width="640" height="98" fill="#C9A57E"/><g stroke="#A8865F" stroke-width="2">${[340, 358, 376, 394, 412].map((y) => `<path d="M0 ${y}H640"/>`).join('')}</g>
      <g class="pnpol">${POLLEN.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#D9D26A"/>`).join('')}</g>
      <rect x="70" y="40" width="220" height="262" rx="14" fill="#B68E5E"/><rect x="86" y="66" width="188" height="222" rx="4" fill="#FFFFFF"/><rect x="140" y="30" width="80" height="26" rx="8" fill="#0E3B2C"/>
      ${li(112, 'We walk the finished job', 'with you', 0)}${li(186, 'clear the punch list', '', 1)}${li(236, 'leave the site clean', '', 2)}
      <g class="pncard"><g transform="rotate(-4 465 160)"><rect x="350" y="78" width="234" height="164" rx="12" fill="#FFFFFF" stroke="#DCE5DF" stroke-width="2"/>
        <text x="370" y="114" font-size="16" font-weight="800" fill="#0E3B2C">Then the warranties start.</text><path d="M370 128H564" stroke="#E1E9E3" stroke-width="2"/>
        <text x="370" y="156" font-size="12.5" fill="#3D4A43">30-year James Hardie<tspan x="370" dy="16">non-prorated warranty</tspan><tspan x="370" dy="24">Lifetime workmanship</tspan><tspan x="370" dy="16">warranty on labor</tspan></text></g>
        <g transform="translate(548 214)"><g class="pnstamp"><circle r="26" fill="#B5DB6E" stroke="#0E3B2C" stroke-width="3"/><path d="M-11 0l7 7 14-15" fill="none" stroke="#0E3B2C" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></g></g></g>
      <g class="pnbroom"><path d="M0 -150 L28 0" stroke="#7A5A36" stroke-width="7" stroke-linecap="round"/><path d="M6 -6 H52 L62 26 H-6 Z" fill="#D8B45C" stroke="#7A5A36" stroke-width="3" stroke-linejoin="round"/><path d="M8 4V24M20 4V24M32 4V24M44 4V24" stroke="#A8862F" stroke-width="2"/></g>`; };
  const SCENES = [sc1, sc2, sc3, sc4];

  const N = () => `<section class="sec pnN" id="process" aria-labelledby="pnN-h">
    <div class="pnhd"><h2 class="sec-h" id="pnN-h" data-split>Watch it happen.</h2>
      <p class="sec-p">The four steps of every job, as they happen at your house. Pick a step to play it.</p></div>
    <div class="pnstage">
      <div class="pntabs" role="tablist" aria-label="The four steps">${S.map((s, i) => `<button type="button" role="tab" class="pntb" id="pnN-t${i}" aria-selected="${!i}" aria-controls="pnN-p" tabindex="${i ? -1 : 0}"><b>${pad(i)}</b><span>${s[0]}</span></button>`).join('')}</div>
      <div class="pnpanel" id="pnN-p" role="tabpanel" aria-labelledby="pnN-t0">
        <div class="pnscene">${S.map((s, i) => `<svg class="pnsc" data-s="${i}" viewBox="0 0 640 420" role="img" aria-label="${s[4]}"${i ? ' hidden' : ''} font-family="Inter,system-ui,sans-serif">${SCENES[i]()}</svg>`).join('')}
          <div class="pnscrub" hidden><div class="pnsl" role="slider" tabindex="0" aria-label="Scrub the install" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100" aria-valuetext="Paint"><i class="pnfill"></i><i class="pnthumb"></i></div>
            <ol class="pnph" aria-hidden="true">${PH.map((p, i) => `<li data-p="${i}">${p}</li>`).join('')}</ol></div>
          <button type="button" class="pnplay"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg><span>Play again</span></button></div>
        <div class="pntext">${S.map((s, i) => { const r = REV()[s[3][0]] || {};
          return `<div class="pntx" data-s="${i}"${i ? ' hidden' : ''}><p class="pnk">Step ${i + 1} of 4</p><h3 class="pnq">${s[0]}</h3><p class="pns">${esc(s[1])}</p>
            <dl class="pnfacts">${s[2].map((f) => `<div><dt>${esc(f[0])}</dt>${f[1] ? `<dd>${esc(f[1])}</dd>` : ''}</div>`).join('')}</dl>
            <blockquote class="pnrev"><p>“${esc(s[3][1])}”</p><footer>${esc(r.name || '')} · ${esc(r.source || '')}</footer></blockquote></div>`; }).join('')}</div>
      </div>
    </div>
    <div class="pnbar"><div class="pncta"><a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a><a class="pntel" href="tel:+15125500000">${TEL}<span>(512) 550-0000</span></a></div>
      <p>The scenes are drawn illustrations of our published steps, not photographs of a real job. Every sentence is ours as published; review words are unedited.</p></div>
    <p class="pnlive" aria-live="polite"></p></section>`;

  P.N = N;
})();
