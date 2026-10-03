// Inline icons. All drawn on a 32 grid (UI glyphs use 24) with currentColor strokes.
const wrap = (inner, vb = '0 0 32 32', cls = 'ico') =>
  `<svg class="${cls}" viewBox="${vb}" aria-hidden="true" focusable="false">${inner}</svg>`;

export const icon = {
  roof: (c) => wrap('<path d="M3 16 16 6l13 10"/><path d="M7 14v12h18V14"/><path d="M11 20h10M11 23.5h6" opacity=".55"/>', undefined, c),
  map: (c) => wrap('<rect x="4" y="6" width="24" height="20" rx="1"/><path d="M4 13h24M4 19h24M12 6v20M20 6v20" opacity=".45"/><circle cx="20" cy="13" r="2.6" fill="currentColor" stroke="none"/>', undefined, c),
  cube: (c) => wrap('<path d="M16 4 28 10.5v11L16 28 4 21.5v-11z"/><path d="M4 10.5 16 17l12-6.5M16 17v11"/>', undefined, c),
  layers: (c) => wrap('<path d="M4 22l12-6 12 6-12 6z"/><path d="M4 16l12-6 12 6" opacity=".6"/><path d="M4 10l12-6 12 6" opacity=".32"/>', undefined, c),
  camera: (c) => wrap('<rect x="3" y="9" width="26" height="17" rx="2"/><circle cx="16" cy="17.5" r="4.6"/><path d="M11 9l1.6-3h6.8L21 9"/>', undefined, c),
  help: (c) => wrap('<circle cx="16" cy="16" r="12"/><path d="M12.4 12.6a3.8 3.8 0 1 1 5.6 3.3c-1.2.7-2 1.4-2 2.8"/><circle cx="16" cy="23" r=".9" fill="currentColor"/>', undefined, c),
  video: (c) => wrap('<rect x="3" y="7" width="26" height="18" rx="2"/><path d="m13.5 12 7 4-7 4z"/>', undefined, c),
  eye: (c) => wrap('<path d="M2.5 16S8 7 16 7s13.5 9 13.5 9S24 25 16 25 2.5 16 2.5 16z"/><circle cx="16" cy="16" r="4"/>', undefined, c),
  ruler: (c) => wrap('<rect x="3" y="11" width="26" height="10" rx="1"/><path d="M8 11v4M13 11v6M18 11v4M23 11v6"/>', undefined, c),
  file: (c) => wrap('<path d="M8 3h11l6 6v20H8z"/><path d="M19 3v6h6M12 16h9M12 21h9" opacity=".7"/>', undefined, c),
  users: (c) => wrap('<circle cx="12" cy="11" r="4.2"/><path d="M3.5 27c.6-5 4-8 8.5-8s7.9 3 8.5 8"/><circle cx="23.5" cy="12.5" r="3.2"/><path d="M24 19.4c2.6.5 4.4 2.7 4.8 6.1" opacity=".7"/>', undefined, c),
  shield: (c) => wrap('<path d="M16 3 5.5 7v8.4c0 6.4 4.4 11 10.5 13.6 6.1-2.6 10.5-7.2 10.5-13.6V7z"/><path d="m11.5 15.5 3.3 3.3 6-6.4"/>', undefined, c),
  clock: (c) => wrap('<circle cx="16" cy="16" r="12"/><path d="M16 9v7.5l5 3"/>', undefined, c),
  build: (c) => wrap('<path d="M4 28h24M7 28V12l9-6 9 6v16"/><path d="M12 28v-7h8v7M12 15h2M18 15h2" opacity=".7"/>', undefined, c),
  check: (c) => wrap('<circle cx="16" cy="16" r="12"/><path d="m10.5 16.5 3.8 3.8 7.4-8"/>', undefined, c),
  arrow: '<span class="arr" aria-hidden="true">→</span>',
  chev: '<svg class="chev" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="m2 4.2 4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  phone: (c = 'ico') => wrap('<path d="M7 3h4l2 6-3 2a15 15 0 0 0 8 8l2-3 6 2v4a3 3 0 0 1-3 3A22 22 0 0 1 4 6a3 3 0 0 1 3-3z"/>', '0 0 32 32', c),
  mail: (c = 'ico') => wrap('<rect x="3" y="6" width="26" height="20" rx="2"/><path d="m4 8 12 9 12-9"/>', '0 0 32 32', c),
  pin: (c = 'ico') => wrap('<path d="M16 29s9-8.2 9-15a9 9 0 0 0-18 0c0 6.8 9 15 9 15z"/><circle cx="16" cy="14" r="3.2"/>', '0 0 32 32', c),
  prev: '<svg viewBox="0 0 18 18" aria-hidden="true" focusable="false"><path d="M11 3 5 9l6 6"/></svg>',
  next: '<svg viewBox="0 0 18 18" aria-hidden="true" focusable="false"><path d="m7 3 6 6-6 6"/></svg>',
  close: '<svg viewBox="0 0 26 26" aria-hidden="true" focusable="false"><path d="M5 5l16 16M21 5 5 21"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="17.3" cy="6.7" r="1.15"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.7V3.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.4H7.7V13h2.7v8z"/></svg>'
};
