"""Closed icon set, drawn in this thread for Austin Pro Siding (S1463 icon-system).

Grid: 24 x 24 units, a 2-unit live-area margin, 2-unit stroke, butt caps, miter joins. Square corners carry the mark's
cut-square character (C1 is drawn with miter joins). No fills except the star (a rating mark, solid when earned).
Names follow icon-[category]-[name]. Each icon is used with a text label or aria-hidden; touch targets are 44 px.
Sizes: 16 (inline in small text), 20, 24 (default), 32, 48."""
import math


def _star():
    pts = []
    for i in range(10):
        r = 9.5 if i % 2 == 0 else 4.2
        a = math.radians(-90 + i * 36)
        pts.append(f'{12 + r * math.cos(a):.2f} {12.6 + r * math.sin(a):.2f}')
    return 'M' + 'L'.join(pts) + 'Z'


ICONS = {
    # action
    'action-arrow-right': 'M3 12H20M14 6L20 12L14 18',
    'action-arrow-up-right': 'M6 18L18 6M8 6H18V16',
    'action-plus': 'M12 4V20M4 12H20',
    'action-minus': 'M4 12H20',
    'action-check': 'M4 12.5L9.5 18L20 6.5',
    'action-close': 'M5.5 5.5L18.5 18.5M18.5 5.5L5.5 18.5',
    'action-menu': 'M3 8.5H21M3 15.5H21',
    'action-chevron-down': 'M5 9L12 16L19 9',
    'action-play': 'M7 4.5V19.5L19.5 12Z',
    'action-pause': 'M8 4.5V19.5M16 4.5V19.5',
    # communication
    'communication-phone': 'M5 3H9L11 8L8.5 9.5C9.5 11.8 12.2 14.5 14.5 15.5L16 13L21 15V19C21 20.1 20.1 21 19 21C10.2 21 3 13.8 3 5C3 3.9 3.9 3 5 3Z',
    'communication-mail': 'M3 5.5H21V18.5H3ZM3 5.5L12 12.5L21 5.5',
    # navigation and status
    'navigation-location': 'M12 21.5C12 21.5 4.5 15 4.5 9.5A7.5 7.5 0 0 1 19.5 9.5C19.5 15 12 21.5 12 21.5ZM14.5 9.5A2.5 2.5 0 1 1 9.5 9.5A2.5 2.5 0 1 1 14.5 9.5Z',
    'status-clock': 'M21 12A9 9 0 1 1 3 12A9 9 0 1 1 21 12ZM12 6.5V12L16 14.5',
    'navigation-calendar': 'M3.5 5.5H20.5V20.5H3.5ZM3.5 10H20.5M8 2.5V7.5M16 2.5V7.5',
    'content-camera': 'M2.5 7.5H7L9 4.5H15L17 7.5H21.5V19.5H2.5ZM15.5 13A3.5 3.5 0 1 1 8.5 13A3.5 3.5 0 1 1 15.5 13Z',
    'content-map': 'M2.5 5.5L8.5 3.5L15.5 5.5L21.5 3.5V18.5L15.5 20.5L8.5 18.5L2.5 20.5ZM8.5 3.5V18.5M15.5 5.5V20.5',
    'status-star': _star(),
    'status-credential': 'M12 2.5L20 5.5V12C20 16.5 16.5 19.8 12 21.5C7.5 19.8 4 16.5 4 12V5.5ZM8.5 12L11 14.5L15.5 9.5',
    # trade (the firm's own services)
    'trade-siding': 'M6.5 3H21V9H3.5ZM6.5 9H21V15H3.5ZM6.5 15H21V21H3.5Z',
    'trade-window': 'M5 3H19V19H5ZM5 11H19M12 3V19M3 21H21',
    'trade-door': 'M6 3H18V21H6ZM3 21H21M14.5 12V14',
    'trade-roof': 'M1.5 19.5L12 4.5L22.5 19.5ZM7.5 14H16.5',
    'trade-gutter': 'M3 6.5V11H21V6.5M17.5 11V21M13 21H17.5',
    'trade-patio-cover': 'M2 5.5H22M2 9.5H22M5 9.5V21M19 9.5V21M7.5 5.5V9.5M12 5.5V9.5M16.5 5.5V9.5',
    'trade-paint': 'M4 3.5H17V9H4ZM17 6H20.5V12.5H11V15M9.5 15H12.5V21H9.5Z',
    'trade-seam': 'M12 2V22M8 8.5L4.5 12L8 15.5M16 8.5L19.5 12L16 15.5',
}
FILLED = {'status-star', 'action-play'}


def icon(name, size=24, color='currentColor', label=None, sw=2):
    d = ICONS[name]
    a = f' role="img" aria-label="{label}"' if label else ' aria-hidden="true"'
    if name in FILLED:
        body = f'<path d="{d}" fill="{color}" stroke="{color}" stroke-width="{sw}" stroke-linejoin="miter"/>'
    else:
        body = f'<path d="{d}" fill="none" stroke="{color}" stroke-width="{sw}" stroke-linecap="butt" stroke-linejoin="miter"/>'
    return f'<svg class="ic" viewBox="0 0 24 24" width="{size}" height="{size}"{a} focusable="false">{body}</svg>'
