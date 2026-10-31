"""OKLCH <-> sRGB and WCAG 2 contrast, written out so every number in the brand sheet is computed, not estimated [S0071]."""
import math
def s2l(c): return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
def l2s(c): return 12.92 * c if c <= 0.0031308 else 1.055 * c ** (1 / 2.4) - 0.055
def hex2rgb(h): h = h.lstrip('#'); return tuple(int(h[i:i + 2], 16) / 255 for i in (0, 2, 4))
def rgb2hex(r): return '#' + ''.join('%02X' % round(min(1, max(0, x)) * 255) for x in r)
def rgb2oklab(rgb):
    R, G, B = (s2l(x) for x in rgb)
    l = (0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B) ** (1 / 3)
    m = (0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B) ** (1 / 3)
    s = (0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B) ** (1 / 3)
    return (0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s)
def oklab2rgb(L, a, b):
    l_, m_, s_ = L + 0.3963377774 * a + 0.2158037573 * b, L - 0.1055613458 * a - 0.0638541728 * b, L - 0.0894841775 * a - 1.291485548 * b
    l, m, s = l_ ** 3, m_ ** 3, s_ ** 3
    return (l2s(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s), l2s(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s), l2s(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s))
def oklch(h):
    L, a, b = rgb2oklab(hex2rgb(h)); return L, math.hypot(a, b), (math.degrees(math.atan2(b, a)) + 360) % 360
def from_oklch(L, C, H):
    """sRGB hex for an OKLCH colour; chroma is reduced (hue and lightness held) until it is inside sRGB [S0071 gamut]."""
    while True:
        r = oklab2rgb(L, C * math.cos(math.radians(H)), C * math.sin(math.radians(H)))
        if all(-1e-6 <= x <= 1 + 1e-6 for x in r) or C <= 0: return rgb2hex(r), C
        C = max(0, C - 0.002)
def lum(h): r, g, b = (s2l(x) for x in hex2rgb(h)); return 0.2126 * r + 0.7152 * g + 0.0722 * b
def ratio(a, b): x, y = sorted((lum(a), lum(b)), reverse=True); return (x + 0.05) / (y + 0.05)
