"""Austin redo, Stage 2: the three logo concepts as SVG.

Every mark is drawn on a 100 x 100 grid, in one ink colour, and returned as an SVG fragment (no <svg> wrapper), so the
board builder can place, colour and scale it. Each concept also has a small-size variant for 16-32 px.

C1 Plan Corner  - the outside corner of a sided wall seen from above (two walls, their lapped skins, the corner post),
                  turned 45 degrees so the corner reads as a roof peak with the post at its tip.
C2 Grade Stamp  - a lumber mill's grade stamp: a stadium-ended frame holding AP and the lap profile in section.
C3 Whole House  - a house corner seen from the street: the corner post and two sided walls running away in
                  perspective. The firm's own rule: "We replace by the full wall or the whole house. No patch repairs."
"""


def c1_mark(ink='currentColor', post=None):
    """Plan Corner. Drawn in plan (from above): an outside corner where two walls meet. Each wall is its core, a
    wrap gap, and the siding skin outside. The corner post covers the skins' ends. The whole plan is turned 45 degrees,
    so the outside corner points up and reads as a roof peak with the post at its tip."""
    post = post or ink
    return f'''
<g transform="rotate(45 50 50)" fill="{ink}">
  <rect x="44" y="35" width="40" height="6"/>
  <rect x="35" y="44" width="6" height="40"/>
  <rect x="47" y="44" width="37" height="11"/>
  <rect x="44" y="47" width="11" height="37"/>
  <rect x="30" y="30" width="16" height="16" fill="{post}"/>
</g>'''


def c1_small(ink='currentColor', post=None):
    """16-32 px: the wrap gap closes at this size, so the walls are one solid chevron; the post keeps a clear gap."""
    post = post or ink
    return f'''
<path d="M50 34 L12 72 L12 88 L50 50 L88 88 L88 72 Z" fill="{ink}"/>
<rect x="40" y="6" width="20" height="20" transform="rotate(45 50 16)" fill="{post}"/>'''


def c2_mark(ink='currentColor', paper='#fff', text_font="Poppins"):
    """Grade Stamp. A stadium frame (rounded ends like a mill stamp), AP set left, a divider, the lap profile right:
    three wedges in section, thin at the top, thick at the butt, each lapped over the one below."""
    return f'''
<rect x="3" y="20" width="94" height="60" rx="30" fill="none" stroke="{ink}" stroke-width="5.5"/>
<text x="36" y="61" text-anchor="middle" font-family="{text_font}" font-weight="700" font-size="30" letter-spacing="-1" fill="{ink}">AP</text>
<rect x="64" y="27" width="3" height="46" fill="{ink}"/>
<g fill="{ink}">
  <path d="M68 28 L69.5 28 L76 41 L76 44 L68 44 Z"/>
  <path d="M68 42 L69.5 42 L76 55 L76 58 L68 58 Z"/>
  <path d="M68 56 L69.5 56 L76 69 L76 72 L68 72 Z"/>
</g>'''


def c2_small(ink='currentColor', text_font="Poppins", knock='#fff'):
    """16-32 px: the stadium filled, AP knocked out, the profile dropped."""
    return f'''
<rect x="2" y="22" width="96" height="56" rx="28" fill="{ink}"/>
<text x="50" y="64" text-anchor="middle" font-family="{text_font}" font-weight="700" font-size="34" letter-spacing="-1" fill="{knock}">AP</text>'''


def c3_mark(ink='currentColor', post=None, shadow=None, paper='#fff'):
    """Whole House. A house corner seen from the street: the corner post in the middle and two sided walls running
    away from it in perspective, each with five lap courses whose thin shadow lines converge toward its vanishing
    point. Two walls meeting at a corner is the firm's rule drawn: "the full wall or the whole house"."""
    post = post or ink
    def face(x_post, x_far, vp_x, vp_y=52, top=14, bottom=90, n=5, gap=1.9):
        out = []
        def y_at(yp, x):
            return yp + (vp_y - yp) * ((x - x_post) / (vp_x - x_post))
        h = (bottom - top) / n
        for i in range(n):
            y0, y1 = top + i * h, top + (i + 1) * h - gap
            pts = [(x_post, y0), (x_far, y_at(y0, x_far)), (x_far, y_at(y1, x_far)), (x_post, y1)]
            out.append('<path d="M' + ' L'.join(f'{x:.2f} {y:.2f}' for x, y in pts) + ' Z" fill="' + ink + '"/>')
        return ''.join(out)
    return f'''
{face(44, 6, -70)}
{face(56, 94, 170)}
<rect x="43" y="8" width="14" height="86" fill="{post}" stroke="{paper}" stroke-width="2.4"/>'''


def c3_small(ink='currentColor', paper='#fff'):
    """16-32 px: three courses per face, the post kept with a wider knock-out edge."""
    def face(x_post, x_far, vp_x, vp_y=52, top=10, bottom=92, n=3, gap=5):
        out = []
        y_at = lambda yp, x: yp + (vp_y - yp) * ((x - x_post) / (vp_x - x_post))
        h = (bottom - top) / n
        for i in range(n):
            y0, y1 = top + i * h, top + (i + 1) * h - gap
            pts = [(x_post, y0), (x_far, y_at(y0, x_far)), (x_far, y_at(y1, x_far)), (x_post, y1)]
            out.append('<path d="M' + ' L'.join(f'{x:.1f} {y:.1f}' for x, y in pts) + ' Z" fill="' + ink + '"/>')
        return ''.join(out)
    return f'''
{face(42, 2, -60)}
{face(58, 98, 160)}
<rect x="40" y="4" width="20" height="92" fill="{ink}" stroke="{paper}" stroke-width="5"/>'''


def svg(fragment, size=100, view='0 0 100 100', extra=''):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{view}" width="{size}" height="{size}" {extra}>{fragment}</svg>'
