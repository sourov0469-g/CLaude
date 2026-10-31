# R7 colour change (owner decision, supersedes the R6 teal): the system is rebuilt around the owner's approved Figma colours,
# deep green #0e3b2c (primary: solid actions, brand surfaces) and lime #b5db6e (highlight accent: the one pop per view).
# Still computed, never picked by eye (better-colors S0071 "hold the hue across the ramp"; color-system S1418 "full tonal
# scales"): each ramp holds its anchor's OKLCH hue end to end, chroma a fixed share of what sRGB allows at each lightness
# (the share is the anchor's own, so the ramp keeps the anchor's character), tapered at both ends. Each anchor is placed at
# the step its lightness falls on and kept exact (green-900 = #0e3b2c, lime-300 = #b5db6e). One tinted neutral ramp,
# re-tinted to the green's hue. Prints the ramps and the measured WCAG 2 pairs. Run: python3 -I build/mk-tokens.py
import math, sys
G_HEX, G_STEP = '#0e3b2c', 900     # deep green, the primary
Y_HEX, Y_STEP = '#b5db6e', 300     # lime, the highlight accent
L_ACC = {50: .975, 100: .942, 200: .893, 300: .826, 400: .735, 500: .64, 600: .545, 700: .47, 800: .395, 900: .325, 950: .255}
L_NEU = {50: .984, 100: .958, 200: .918, 300: .862, 400: .72, 500: .6, 600: .5, 700: .42, 800: .335, 900: .265, 950: .2}
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
def lch_of(h):
    r, g, b = (to_lin(int(h[i:i + 2], 16) / 255) for i in (1, 3, 5))
    l, m, q = (.4122214708 * r + .5363137098 * g + .0514459929 * b) ** (1 / 3), (.2119034982 * r + .6806995451 * g + .1073969566 * b) ** (1 / 3), (.0883024619 * r + .2817188376 * g + .6299787005 * b) ** (1 / 3)
    L, A, B = .2104542553 * l + .793617785 * m - .0040720468 * q, 1.9779984951 * l - 2.428592205 * m + .4505937099 * q, .0259040371 * l + .7827717662 * m - .808675766 * q
    return L, math.hypot(A, B), math.degrees(math.atan2(B, A)) % 360
# chroma taper toward both ends so the 50 does not glow and the 950 is not ink (S0071)
taper = {50: .3, 100: .4, 200: .55, 300: .72, 400: .88, 500: 1, 600: 1, 700: .95, 800: .85, 900: .75, 950: .65}
def anchored(hexa, step, cap):
    L0, C0, H = lch_of(hexa); Ls = dict(L_ACC); Ls[step] = L0
    share = C0 / (cmax(L0, H) * taper[step])          # the anchor's own share of the ceiling, held along the ramp
    R = ramp(Ls, H, lambda k, L: min(cmax(L, H) * .98, cmax(L, H) * share, cap) * taper[k])
    R[step] = (hexa, L0, C0); return R, H
# the green is the calm, structural colour: chroma capped at 0.095 so its middle never turns mint (eye comfort; the pop is
# lime's job, S1435). Lime keeps its own character up to the anchor's chroma.
GREEN, HG = anchored(G_HEX, G_STEP, .095)
LIME, HY = anchored(Y_HEX, Y_STEP, .2)
HUE = HG
# neutral: tinted toward the green's hue, chroma 0.004-0.012 (S0071 "enough to measure, not enough to name")
NEU = ramp(L_NEU, HUE, lambda k, L: {50: .004, 100: .005, 200: .006, 300: .008, 400: .010, 500: .011, 600: .012, 700: .012, 800: .012, 900: .011, 950: .010}[k])
if __name__ == '__main__':
    for name, R, H in (('green', GREEN, HG), ('lime', LIME, HY), ('neutral', NEU, HUE)):
        print('  ' + ' '.join(f'--{name}-{k}:{h};' for k, (h, L, C) in R.items()))
        for k, (h, L, C) in R.items(): print(f'    {name}-{k} {h} oklch({L:.3f} {C:.3f} {H:.0f})')
    W, N50, N100 = '#ffffff', NEU[50][0], NEU[100][0]
    print('\nmeasured WCAG 2 pairs (ratio : 1)')
    for k in (500, 600, 700, 800, 900, 950): print(f'white on green-{k}: {cr(W, GREEN[k][0]):.2f}   green-{k} on neutral-50: {cr(GREEN[k][0], N50):.2f}  on neutral-100: {cr(GREEN[k][0], N100):.2f}')
    for k in (100, 200, 300, 400, 500): print(f'green-900 on lime-{k}: {cr(GREEN[900][0], LIME[k][0]):.2f}   black on lime-{k}: {cr("#000000", LIME[k][0]):.2f}   white on lime-{k}: {cr(W, LIME[k][0]):.2f}   lime-{k} on green-900: {cr(LIME[k][0], GREEN[900][0]):.2f}   lime-{k} on white: {cr(LIME[k][0], W):.2f}')
    for k in (100, 200): print(f'green-{k} on green-900: {cr(GREEN[k][0], GREEN[900][0]):.2f}')
    for k in (500, 600, 700, 800, 900, 950): print(f'neutral-{k} on neutral-50: {cr(NEU[k][0], N50):.2f}   on white: {cr(NEU[k][0], W):.2f}   on neutral-100: {cr(NEU[k][0], N100):.2f}')
