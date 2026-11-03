"""Conformance lint for site.html (the brief's "token/raw-value counts"). Run: python3 -I lint.py [--list]
Reads the CSS of the live file (backup templates carry no CSS) and reports:
  - spacing: every px number inside padding / margin / gap that is not on the Carbon ladder (Phase 2 lock);
  - colour: raw hex / rgb() / hsl() values outside the token block (:root);
  - type: raw px font sizes, and the distinct font sizes declared (SVG drawing text and the review switch are exempt);
  - radius: border-radius values that are not a token or 0.
The token block itself (:root{...}) is the one place raw values belong, so it is skipped."""
import re, sys, collections

LADDER = {0, 2, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 160}
# SVG <text> sizes are drawing units that scale with the viewBox, not page type; .rv is the review switch (tooling, hidden by ?clean)
TYPE_EXEMPT = {'.wm', '.hd-t', '.w-lab text', '.wn-t', '.rf-t', '.gt-t', '.mp-hqt', '.rv'}
SITE = '/home/user/CLaude/siding/brand-v2/site.html'


def rules(css):
    """yield (selector, declarations) for every rule, media blocks flattened; :root blocks skipped"""
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
    css = re.sub(r'@font-face\{[^}]*\}', '', css)
    for sel, body in re.findall(r'([^{}]+)\{([^{}]*)\}', css):
        sel = sel.strip()
        if sel.startswith('@media') or sel.endswith(':root') or sel == ':root' or sel.startswith('@keyframes'):
            continue
        yield sel.split('}')[-1].strip(), body


def decls(body):
    for d in body.split(';'):
        if ':' in d:
            k, v = d.split(':', 1)
            yield k.strip().lower(), v.strip()


def main():
    s = open(SITE, encoding='utf-8').read()
    css = ''.join(re.findall(r'<style>(.*?)</style>', s, re.S))
    # keyframe bodies hold percentages and transforms, not layout; drop them whole
    css = re.sub(r'@keyframes[^{]*\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}', '', css)
    off, colours, fsz, radius = [], [], [], []
    sizes = collections.Counter()
    for sel, body in rules(css):
        for k, v in decls(body):
            if re.match(r'(padding|margin|gap|row-gap|column-gap)(-|$)', k):
                for n in re.findall(r'(-?\d*\.?\d+)px', v):
                    if abs(float(n)) not in LADDER:
                        off.append((sel, f'{k}:{v}'))
                        break
            if not k.startswith('--'):
                for c in re.findall(r'#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)', v):
                    if 'var(' not in c:
                        colours.append((sel, f'{k}:{v}'))
                        break
            if (k == 'font-size' or (k == 'font' and re.search(r'\d', v))) and sel not in TYPE_EXEMPT:
                m = re.search(r'(\d*\.?\d+(px|rem)|var\(--type-[a-z0-9-]+\)|clamp\([^)]*\))', v)
                if m:
                    sizes[m.group(1)] += 1
                    if m.group(2):
                        fsz.append((sel, f'{k}:{v}'))
            if k == 'border-radius' and not re.fullmatch(r'(0|var\(--radius-[a-z]+\)|50%)', v):
                radius.append((sel, f'{k}:{v}'))
    # primitives read directly by components (S0071: semantic roles are the only tier components reference)
    comp = re.sub(r':root\s*\{[^}]*\}', '', css)
    prim = re.findall(r'var\(--((?:steel|neutral)-\d+|white|black)\)', comp)
    # the live markup (backups excluded): inline style attributes and SVG paint attributes
    live = re.sub(r'<template class="bk".*?</template>', '', s, flags=re.S)
    live = re.sub(r'<(style|script)>.*?</\1>', '', live, flags=re.S)
    live = re.sub(r'data:[^"\')]+', '', live)
    swatch = len(re.findall(r'data-swatch style="', live))   # the steel ramp shown as the content itself (colour as content): exempt
    styles = re.findall(r'(?<!data-swatch )style="([^"]*)"', live)
    live_nomask = re.sub(r'<mask\b.*?</mask>', '', live, flags=re.S)   # mask paint is luminance (white = show), not colour
    st_prim = [x for x in styles if re.search(r'var\(--((?:steel|neutral)-\d+|white|black)\)', x)]
    st_raw = [x for x in styles if re.search(r'#[0-9a-fA-F]{3,8}\b|rgba?\(|\d+px', x)]
    paint = re.findall(r'(?:fill|stroke|stop-color)="(#[0-9a-fA-F]{3,8}|rgba?\([^)]*\))"', live_nomask)
    draw_prim = re.findall(r'(?:fill|stroke|stop-color)="var\(--((?:steel|neutral)-\d+)\)"', live_nomask)
    print(f'spacing off the ladder: {len(off)} | raw colours: {len(colours)} | raw font sizes: {len(fsz)} | '
          f'distinct font sizes declared: {len(sizes)} | radius off token: {len(radius)}')
    print(f'primitive refs in component CSS: {len(prim)} | inline styles with a primitive: {len(st_prim)} | inline styles with a raw value: {len(st_raw)} | '
          f'raw SVG paint attributes: {len(paint)}')
    print(f'swatch styles exempt (colour as content): {swatch} | primitive paint attributes in drawings: {len(draw_prim)} {dict(collections.Counter(draw_prim).most_common())}')
    if '--list' in sys.argv:
        for name, rows in (('SPACING', off), ('COLOUR', colours), ('FONT SIZE', fsz), ('RADIUS', radius)):
            print(f'--- {name}')
            for sel, d in rows:
                print(f'  {sel[:60]:60} {d[:110]}')
        print('--- sizes', dict(sizes.most_common()))
        print('--- inline style samples', sorted(set(st_prim + st_raw))[:12])
        print('--- raw SVG paint', collections.Counter(paint).most_common(12))


main()
