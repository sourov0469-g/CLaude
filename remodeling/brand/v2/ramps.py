"""The two ramps of the rebrand, generated in OKLCH with the hue held constant [S0071 palette-generation; S1418 tonal scales].
clay: the one accent ramp, H 36 (terracotta / fired clay), chroma peaking mid-ramp at 0.11 (fired-clay muted, never signal orange).
sand: the tinted neutral ramp, H 70 (stucco / sand), chroma 0.004-0.016: enough to measure, not enough to name [S0071 neutrals].
Light end steps 0.04-0.045 apart in L, mid-ramp 0.07-0.09 [S0071]. Both ends stop short of pure white and black."""
from colour import from_oklch, oklch
STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
CLAY_H = 36.0
CLAY = {50: (0.972, 0.012), 100: (0.932, 0.026), 200: (0.888, 0.044), 300: (0.815, 0.070), 400: (0.725, 0.095),
        500: (0.640, 0.110), 600: (0.540, 0.110), 700: (0.468, 0.098), 800: (0.398, 0.082), 900: (0.330, 0.062), 950: (0.262, 0.044)}
SAND_H = 70.0
SAND = {50: (0.982, 0.006), 100: (0.958, 0.010), 200: (0.920, 0.014), 300: (0.862, 0.016), 400: (0.760, 0.016),
        500: (0.640, 0.015), 600: (0.540, 0.014), 700: (0.450, 0.012), 800: (0.360, 0.010), 900: (0.280, 0.008), 950: (0.215, 0.006)}
DANGER = (0.505, 0.170, 18.0)   # status: form errors only; 18 deg from the clay hue [S0071 status >= 15 deg], always with a text message
def build():
    out = {}
    for name, spec, H in (('clay', CLAY, CLAY_H), ('sand', SAND, SAND_H)):
        for s in STEPS:
            L, C = spec[s]; hx, c = from_oklch(L, C, H); out['%s-%d' % (name, s)] = hx
    out['danger-600'] = from_oklch(*DANGER)[0]
    return out
if __name__ == '__main__':
    R = build()
    for k, v in R.items():
        L, C, H = oklch(v); print('%-11s %s  L %.3f C %.3f H %5.1f' % (k, v, L, C, H))
