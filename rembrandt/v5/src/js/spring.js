// A small damped spring (S0340 "every motion comes from a physical model"). Name the model in words where it is used.
// spring(freqHz, zeta, mass) -> { k, c, m }; step() integrates one body semi-implicitly, substepped for stability.
export const spring = (f, z, m = 1) => { const k = m * (2 * Math.PI * f) ** 2; return { k, c: 2 * z * Math.sqrt(k * m), m }; };
export function step(s, b, target, dt) { // b = { p, v }
  const n = Math.max(1, Math.ceil(dt / (1 / 240))), h = dt / n;
  for (let i = 0; i < n; i++) { const a = (-s.k * (b.p - target) - s.c * b.v) / s.m; b.v += a * h; b.p += b.v * h; }
  return b;
}
