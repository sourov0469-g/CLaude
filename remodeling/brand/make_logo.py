#!/usr/bin/env python3
"""Elbaz Construction brand logo (OWNER REDESIGN DIRECTIVE). The name is unchanged; the mark and lockup are new.

Mark: the 'roof E'. A rounded orange block holding one continuous white stroke: the right roof slope climbs to the apex,
the left slope comes down and turns into the spine of an E, which carries a middle bar and a bottom bar. The house is the
letter; the letter is the house. Wordmark: Poppins Bold 'Elbaz' over Poppins Medium 'Construction', outlined to paths so
the files render the same everywhere. Writes elbaz-mark.svg, elbaz-logo.svg (horizontal lockup) and elbaz-logo-stacked.svg.
"""
import os
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

HERE = os.path.dirname(os.path.abspath(__file__))
FONTS = os.path.join(HERE, '..', 'src', 'fonts')
ORANGE, BLACK, WHITE = '#FF5F00', '#121212', '#FFFFFF'

def text_path(font_file, text, size, x0, baseline, tracking=0.0):
    f = TTFont(os.path.join(FONTS, font_file))
    gs, cmap, hmtx, upm = f.getGlyphSet(), f.getBestCmap(), f['hmtx'], f['head'].unitsPerEm
    s = size / upm
    pen = SVGPathPen(gs)
    x = x0
    for ch in text:
        g = cmap[ord(ch)]
        gs[g].draw(TransformPen(pen, (s, 0, 0, -s, x, baseline)))
        x += hmtx[g][0] * s + tracking * size
    return pen.getCommands(), x - tracking * size

# the mark on a 100 grid: block, then the roof-E as one stroke path plus the middle bar
def mark(x=0, y=0, k=1.0):
    t = lambda px, py: '%g %g' % (round(x + px * k, 2), round(y + py * k, 2))
    X = lambda px: round(x + px * k, 2)
    sw = 10 * k
    return ('<rect x="%g" y="%g" width="%g" height="%g" rx="%g" fill="%s"/>' % (x, y, 100 * k, 100 * k, 20 * k, ORANGE) +
            '<path d="M%s L%s L%s V%g H%g" fill="none" stroke="%s" stroke-width="%g" stroke-linejoin="miter" stroke-linecap="butt"/>' %
            (t(80, 47), t(50, 21), t(25, 42), round(y + 80 * k, 2), X(76), WHITE, sw) +
            '<path d="M%s H%g" stroke="%s" stroke-width="%g"/>' % (t(25, 61), X(66), WHITE, sw))

def write(name, w, h, body, title):
    with open(os.path.join(HERE, name), 'w') as f:
        f.write('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %g %g" width="%g" height="%g" role="img" aria-label="%s">'
                '<title>%s</title>%s</svg>\n' % (w, h, w, h, title, title, body))

write('elbaz-mark.svg', 100, 100, mark(), 'Elbaz Construction')

# horizontal lockup: mark 100, gap 22, two lines of type
e, ex = text_path('poppins-latin-700-normal.woff2', 'Elbaz', 58, 122, 52, -0.01)
c, cx = text_path('poppins-latin-500-normal.woff2', 'Construction', 25, 124, 88, 0.01)
W = round(max(ex, cx) + 2)
write('elbaz-logo.svg', W, 100, mark() + '<path d="%s" fill="%s"/><path d="%s" fill="%s"/>' % (e, BLACK, c, BLACK), 'Elbaz Construction')

# stacked lockup (footer, square spaces)
e2, ex2 = text_path('poppins-latin-700-normal.woff2', 'Elbaz', 58, 0, 160, -0.01)
c2, cx2 = text_path('poppins-latin-500-normal.woff2', 'Construction', 25, 0, 196, 0.01)
W2 = round(max(ex2, cx2) + 2)
write('elbaz-logo-stacked.svg', W2, 206, mark((W2 - 100) / 2, 0) + '<path d="%s" fill="%s"/><path d="%s" fill="%s"/>' % (e2, BLACK, c2, BLACK), 'Elbaz Construction')
print('lockup width', W, 'stacked width', W2)
