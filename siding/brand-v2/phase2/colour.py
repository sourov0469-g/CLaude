"""colour maths for the rebrand: OKLCH <-> sRGB, WCAG 2 contrast, gamut fit (better-colors S0071 method)"""
import math
def srgb_to_lin(c): return c/12.92 if c <= 0.04045 else ((c+0.055)/1.055)**2.4
def lin_to_srgb(c): return 12.92*c if c <= 0.0031308 else 1.055*c**(1/2.4)-0.055
def oklab_to_rgb(L,a,b):
    l_=L+0.3963377774*a+0.2158037573*b; m_=L-0.1055613458*a-0.0638541728*b; s_=L-0.0894841775*a-1.291485548*b
    l,m,s=l_**3,m_**3,s_**3
    return [lin_to_srgb(4.0767416621*l-3.3077115913*m+0.2309699292*s), lin_to_srgb(-1.2684380046*l+2.6097574011*m-0.3413193965*s), lin_to_srgb(-0.0041960863*l-0.7034186147*m+1.707614701*s)]
def rgb_to_oklab(r,g,b):
    R,G,B=srgb_to_lin(r),srgb_to_lin(g),srgb_to_lin(b)
    l=math.cbrt(0.4122214708*R+0.5363325363*G+0.0514459929*B); m=math.cbrt(0.2119034982*R+0.6806995451*G+0.1073969566*B); s=math.cbrt(0.0883024619*R+0.2817188376*G+0.6299787005*B)
    return [0.2104542553*l+0.793617785*m-0.0040720468*s, 1.9779984951*l-2.428592205*m+0.4505937099*s, 0.0259040371*l+0.7827717662*m-0.808675766*s]
def oklch_to_rgb(L,C,H): return oklab_to_rgb(L, C*math.cos(math.radians(H)), C*math.sin(math.radians(H)))
def in_gamut(rgb, eps=1e-4): return all(-eps <= x <= 1+eps for x in rgb)
def fit(L,C,H):
    """reduce chroma, holding hue and lightness, until the colour is inside sRGB (S0071 gamut rule)"""
    while C > 0 and not in_gamut(oklch_to_rgb(L,C,H)): C -= 0.001
    return round(max(C,0),3)
def hexs(rgb): return '#' + ''.join(f'{round(min(1,max(0,x))*255):02X}' for x in rgb)
def hex_to_rgb(h): return [int(h[i:i+2],16)/255 for i in (1,3,5)]
def lum(rgb): return 0.2126*srgb_to_lin(rgb[0])+0.7152*srgb_to_lin(rgb[1])+0.0722*srgb_to_lin(rgb[2])
def cr(a,b):
    la,lb=lum(a),lum(b); hi,lo=max(la,lb),min(la,lb); return (hi+0.05)/(lo+0.05)
def oklch_of(hexv):
    L,a,b=rgb_to_oklab(*hex_to_rgb(hexv)); return L, math.hypot(a,b), (math.degrees(math.atan2(b,a))+360)%360
