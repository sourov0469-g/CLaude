#!/usr/bin/env python3
"""Elbaz Construction logo, REBRAND DIRECTIVE (2026-10-31). The name is unchanged; the mark is new, drawn from scratch.

THE MARK, "the open course" [S1422 law of closure]: two cues and nothing else.
  1. A bracket: the spine of an E with its top and bottom arms. Its right side is left open; the eye closes it into a
     square (a room in plan, a block on site) without the line being drawn.
  2. A tile: a solid block sitting where the E's middle arm would be, but NOT joined to the spine. The eye completes the
     arm across the gap and reads the E; the block reads as a clay tile laid in its course.
  No container, no roof, no outline: every line that the eye can supply is left out. Two shapes, two colours at most.
Colour: bracket in text colour (sand-950), tile in the accent (clay-600). Single-colour versions (black, white, accent)
keep the same two shapes; the gap does the separating, so nothing is lost without the second colour.
Wordmark: Poppins Bold 'Elbaz' over Poppins Medium 'Construction' (the standing type list), outlined to paths.
Writes the full set into this folder and favicon.svg (adapts to a dark browser tab with its own media query)."""
import os, sys
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from ramps import build
RAMP = build()
FONTS = os.path.join(HERE, '..', '..', 'src', 'fonts')
INK, SECOND, CLAY, WHITE, BLACK = RAMP['sand-950'], RAMP['sand-700'], RAMP['clay-600'], '#FFFFFF', '#000000'

# geometry on a 48-unit grid; stroke 7, butt caps, mitred corners: built, square, no rounding
SW = 7
def mark(x=0, y=0, k=1.0, bracket=INK, tile=CLAY):
    P = lambda a, b: '%g %g' % (round(x + a * k, 2), round(y + b * k, 2))
    br = '<path d="M%s H%g V%g H%g" fill="none" stroke="%s" stroke-width="%g" stroke-linejoin="miter" stroke-linecap="butt"/>' % (
        P(38, 7.5), round(x + 10 * k, 2), round(y + 40.5 * k, 2), round(x + 38 * k, 2), bracket, SW * k)
    tl = '<rect x="%g" y="%g" width="%g" height="%g" fill="%s"/>' % (round(x + 18 * k, 2), round(y + 20.5 * k, 2), round(13 * k, 2), round(7 * k, 2), tile)
    return br + tl

def text_path(font_file, text, size, x0, baseline, tracking=0.0):
    f = TTFont(os.path.join(FONTS, font_file))
    gs, cmap, hmtx, upm = f.getGlyphSet(), f.getBestCmap(), f['hmtx'], f['head'].unitsPerEm
    s, pen, x = size / upm, SVGPathPen(f.getGlyphSet()), x0
    for ch in text:
        g = cmap[ord(ch)]
        gs[g].draw(TransformPen(pen, (s, 0, 0, -s, x, baseline)))
        x += hmtx[g][0] * s + tracking * size
    return pen.getCommands(), x - tracking * size

def svg(name, w, h, body, extra=''):
    with open(os.path.join(HERE, name), 'w') as f:
        f.write('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %g %g" width="%g" height="%g" role="img" aria-label="Elbaz Construction">'
                '<title>Elbaz Construction</title>%s%s</svg>\n' % (w, h, w, h, extra, body))

# marks: full colour + the three single-colour versions the directive requires
svg('elbaz-mark.svg', 48, 48, mark())
svg('elbaz-mark-black.svg', 48, 48, mark(bracket=BLACK, tile=BLACK))
svg('elbaz-mark-white.svg', 48, 48, mark(bracket=WHITE, tile=WHITE))
svg('elbaz-mark-accent.svg', 48, 48, mark(bracket=CLAY, tile=CLAY))

# horizontal lockup: mark at 48 tall (k=1), gap 14, two lines of type; cap height of 'Elbaz' aligns with the bracket top
e, ex = text_path('poppins-latin-700-normal.woff2', 'Elbaz', 27, 62, 26, -0.01)
c, cx = text_path('poppins-latin-500-normal.woff2', 'Construction', 12.2, 62.6, 41, 0.012)
LW = round(max(ex, cx) + 1)
def lockup(name, bracket, tile, t1, t2):
    svg(name, LW, 48, mark(bracket=bracket, tile=tile) + '<path d="%s" fill="%s"/><path d="%s" fill="%s"/>' % (e, t1, c, t2))
lockup('elbaz-logo.svg', INK, CLAY, INK, SECOND)
lockup('elbaz-logo-black.svg', BLACK, BLACK, BLACK, BLACK)
lockup('elbaz-logo-white.svg', WHITE, WHITE, WHITE, WHITE)
lockup('elbaz-logo-accent.svg', CLAY, CLAY, CLAY, CLAY)

# stacked lockup (square spaces)
e2, ex2 = text_path('poppins-latin-700-normal.woff2', 'Elbaz', 27, 0, 82, -0.01)
c2, cx2 = text_path('poppins-latin-500-normal.woff2', 'Construction', 12.2, 0.6, 98, 0.012)
SWD = round(max(ex2, cx2) + 1)
svg('elbaz-logo-stacked.svg', SWD, 104, mark((SWD - 48) / 2, 0) + '<path d="%s" fill="%s"/><path d="%s" fill="%s"/>' % (e2, INK, c2, SECOND))

# favicon: the mark alone; on a dark browser tab the bracket turns white, the tile stays clay
fav = mark(bracket=INK, tile=CLAY).replace('stroke="%s"' % INK, 'class="k" stroke="%s"' % INK, 1)
svg('favicon.svg', 48, 48, fav, '<style>@media (prefers-color-scheme: dark){.k{stroke:#FFFFFF}}</style>')
print('lockup', LW, 'x 48; stacked', SWD, 'x 104')
