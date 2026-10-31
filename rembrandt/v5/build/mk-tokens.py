# R6 rebrand (REBRAND DIRECTIVE): the colour system is computed, never picked by eye (better-colors S0071 "Hold the hue
# across the ramp ... build it with a color library"; color-system S1418 "full tonal scales"). One accent ramp and one
# tinted neutral ramp, Tailwind 50-950 steps, in OKLCH: hue held constant end to end, chroma a fixed share of what sRGB
# allows at each lightness (peaks mid-ramp, near-neutral at both ends), light end stepped finer (0.035-0.05 in L).
# Prints the ramps as hex with their OKLCH coordinates and the measured WCAG 2 pairs. Run: python3 -I build/mk-tokens.py
import math, sys
HUE = 192        # verdigris / patina teal: the hue band the site's photographs leave empty (see PROGRESS.md, R6 brand sheet)
L_ACC = {50: .975, 100: .942, 200: .893, 300: .826, 400: .735, 500: .64, 600: .545, 700: .47, 800: .395, 900: .325, 950: .255}
L_NEU = {50: .984, 100: .958, 200: .918, 300: .862, 400: .72, 500: .6, 600: .5, 700: .42, 800: .335, 900: .265, 950: .2}
SHARE = .78      # share of the sRGB chroma ceiling the accent uses (eye comfort: never the gamut edge)
def to_lin(c): return c / 12.92 if c <= .04045 else ((c + .055) / 1.055) ** 2.4
def to_srgb(c): return 12.92 * c if c <= .0031308 else 1.055 * c ** (1 / 2.4) - .055
def oklch_to_rgb(L, C, H):
    a, b = C * math.cos(math.radians(H)), C * math.sin(math.radians(H))
    l_, m_, s_ = L + .3963377774 * a + .2158037573 * b, L - .1055613458 * a - .0638541728 * b, L - .0894841775 * a - 1.291485548 * b
    l, m, s = l_ ** 3, m_ ** 3, s_ ** 3
    return [to_srgb(4.0767416621 * l - 3.3077115913 * m + .2309699292 * s), to_srgb(-1.2684380046 * l + 2.6097574011 * m - .3413193965 * s), to_srgb(-.0041960863 * l - .7034186147 * m + 1.707614701 * s)]
def in_gamut(rgb): return all(-1e-6 <= c <= 1 + 1e-6 for c in rgb)
def cmax(L, H):
    lo, hi = 0, .4
    for _ in range(40):
        mid = (lo + hi) / 2; lo, hi = (mid, hi) if in_gamut(oklch_to_rgb(L, mid, H)) else (lo, mid)
    return lo
def hexof(rgb): return '#' + ''.join(f'{round(max(0, min(1, c)) * 255):02x}' for c in rgb)
def lum(h): r, g, b = (int(h[i:i + 2], 16) / 255 for i in (1, 3, 5)); return .2126 * to_lin(r) + .7152 * to_lin(g) + .0722 * to_lin(b)
def cr(a, b): x, y = lum(a), lum(b); return (max(x, y) + .05) / (min(x, y) + .05)
def ramp(Ls, H, chroma):
    out = {}
    for k, L in Ls.items():
        C = chroma(k, L); out[k] = (hexof(oklch_to_rgb(L, C, H)), L, C)
    return out
# accent chroma: a share of the ceiling, tapered toward both ends so the 50 does not glow and the 950 is not ink (S0071)
taper = {50: .3, 100: .4, 200: .55, 300: .72, 400: .88, 500: 1, 600: 1, 700: .95, 800: .85, 900: .75, 950: .65}
ACC = ramp(L_ACC, HUE, lambda k, L: min(.11, cmax(L, HUE) * SHARE) * taper[k])
# neutral: tinted toward the accent hue, chroma 0.004-0.012 (S0071 "enough to measure, not enough to name")
NEU = ramp(L_NEU, HUE, lambda k, L: {50: .004, 100: .005, 200: .006, 300: .008, 400: .010, 500: .011, 600: .012, 700: .012, 800: .012, 900: .011, 950: .010}[k])
if __name__ == '__main__':
    for name, R in (('teal', ACC), ('neutral', NEU)):
        for k, (h, L, C) in R.items(): print(f'--{name}-{k}: {h};  /* oklch({L:.3f} {C:.3f} {HUE}) */')
    W, N50 = '#ffffff', NEU[50][0]
    print('\nmeasured WCAG 2 pairs (ratio : 1)')
    for k in (500, 600, 700, 800): print(f'white on teal-{k}: {cr(W, ACC[k][0]):.2f}   teal-{k} on neutral-50: {cr(ACC[k][0], N50):.2f}')
    for k in (500, 600, 700, 800, 900, 950): print(f'neutral-{k} on neutral-50: {cr(NEU[k][0], N50):.2f}   on white: {cr(NEU[k][0], W):.2f}   on neutral-100: {cr(NEU[k][0], NEU[100][0]):.2f}')
