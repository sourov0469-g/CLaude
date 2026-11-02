"""Builds siding/brand-v2/site.html: the single-file site, six pages, two versions per section.
Run: python3 -I brand-v2/build/build_site.py"""
import os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from shell import FACES, TOKENS_CSS, header, footer, section, esc  # noqa: E402
from shell_assets import BASE_CSS, BASE_JS  # noqa: E402
import sec_home  # noqa: E402

PAGES = [('home', 'Austin Pro Siding: siding, windows, roofing and painting in Austin', sec_home.HOME),
         ('siding', 'Siding & painting · Austin Pro Siding', []), ('windows', 'Windows & doors · Austin Pro Siding', []),
         ('roofing', 'Roofing, gutters & patio covers · Austin Pro Siding', []), ('work', 'Our work · Austin Pro Siding', []),
         ('about', 'About & booking · Austin Pro Siding', [])]


def build():
    css, js, body = [], [], []
    for pid, title, secs in PAGES:
        parts = []
        for i, fn in enumerate(secs):
            t, v1, v2, c, j = fn()
            parts.append(section(pid, i + 1, t, v1, v2))
            css.append(c)
            js.append(j)
        if not secs:   # pages not yet built say so plainly
            parts.append(f'<section class="sec sec-pad"><div class="wrap"><h1 class="h1">{esc(title.split(" · ")[0])}</h1>'
                         f'<p class="lead">This page is next in the build.</p></div></section>')
        body.append(f'<div class="page" id="page-{pid}" data-page="{pid}" data-title="{esc(title)}">{"".join(parts)}</div>')
    return (f'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
            f'<title>{esc(PAGES[0][1])}</title><meta name="description" content="Austin Pro Siding: siding, windows, roofing and painting in Austin. Since 2009.">'
            f'<script>document.documentElement.classList.add("js")</script><style>{FACES}{TOKENS_CSS}{BASE_CSS}{"".join(css)}</style></head><body>'
            f'<a class="sr skip" href="#main">Skip to content</a>{header()}<main id="main">{"".join(body)}</main>{footer()}'
            f'<p id="live" class="sr" aria-live="polite"></p><script>{BASE_JS}{"".join(js)}</script></body></html>')


if __name__ == '__main__':
    out = build()
    p = os.path.join(os.path.dirname(HERE), 'site.html')
    open(p, 'w', encoding='utf-8').write(out)
    print('wrote site.html', len(out) // 1024, 'KB')
