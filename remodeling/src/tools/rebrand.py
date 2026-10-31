#!/usr/bin/env python3
"""REBRAND DIRECTIVE: the engine that moves PRESENTED code onto the semantic colour tokens and never touches a backup's own
material (its HTML block, its JS definition, every CSS rule that names its prefix).

Presented = chrome (base.html, tokens/chrome/systems CSS, core + systems JS) and, per section, the visible versions:
their HTML blocks, their JS definitions, the section's shared helpers, and every CSS rule that names no backup-only prefix.
usage: python3 tools/rebrand.py report            -> what would change, per file
       python3 tools/rebrand.py apply             -> rewrite presented code in place
"""
import re, os, sys, json
HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def R(p): return open(os.path.join(HERE, p), encoding='utf-8').read()
def W(p, s): open(os.path.join(HERE, p), 'w', encoding='utf-8').write(s)

HOME = 'hero proof services ba process financing work reviews towns consult'.split()
INNER = ('kitchen-intro kitchen-scope kitchen-work bath-intro bath-build bath-work reno-intro reno-services reno-permits '
         'contact-form contact-visit contact-area').split()

# ---------------------------------------------------------------- CSS parsing with spans
def css_rules(text, base=0):
    """yield (sel, body_start, body_end, kind) for leaf rules; kind 'rule' | 'keyframes'; recurses into @media/@supports.
    Spans index into the original text. Comments are skipped but kept."""
    i, n = 0, len(text)
    out = []
    while i < n:
        # skip whitespace and comments
        m = re.compile(r'\s+|/\*.*?\*/', re.S).match(text, i)
        if m and m.end() > i: i = m.end(); continue
        j = text.find('{', i)
        if j < 0: break
        sel = text[i:j]
        d, k = 0, j
        while k < n:
            c = text[k]
            if c == '/' and text.startswith('/*', k):
                q = text.find('*/', k + 2); k = (q + 2) if q > 0 else n; continue
            if c == '{': d += 1
            elif c == '}':
                d -= 1
                if d == 0: break
            elif c == '"' or c == "'":
                q = text.find(c, k + 1); k = q if q > 0 else k
            k += 1
        s = sel.strip()
        if s.startswith('@media') or s.startswith('@supports') or s.startswith('@container'):
            out += [(sl, base + a, base + b, kd, s) for sl, a, b, kd, _ in css_rules(text[j + 1:k], j + 1)]
        elif s.startswith('@keyframes') or s.startswith('@-webkit-keyframes'):
            out.append((s, base + j + 1, base + k, 'keyframes', None))
        elif s.startswith('@font-face') or s.startswith('@'):
            out.append((s, base + j + 1, base + k, 'at', None))
        else:
            out.append((s, base + j + 1, base + k, 'rule', None))
        i = k + 1
    return out

# ---------------------------------------------------------------- what is a backup
def html_blocks(h):
    """[(prefix, slot, start, end)] for every .ver block"""
    out = []
    for m in re.finditer(r'<div class="ver ([\w-]+)[^"]*" data-v="(b?\d+)"[^>]*>', h):
        i, d = m.start(), 0
        for t in re.finditer(r'<div\b|</div>', h[i:]):
            d += 1 if t.group(0) == '<div' else -1
            if d == 0: out.append((m.group(1), m.group(2), i, i + t.end())); break
    return out

def prefixes(sec):
    h = R('sections/%s.html' % sec)
    vis, bk = set(), set()
    for p, v, a, b in html_blocks(h): (bk if v.startswith('b') else vis).add(p)
    return vis, bk - vis

NAME = re.compile(r'\.([a-zA-Z][\w-]*?)(?:__[\w-]+|--[\w-]+)?(?=[\s.:,\[>+~)#*]|$)')
def rule_owner(sel, bk, vis=()):
    """'record' when every comma part names a backup-only prefix or a backup slot; 'presented' when none does;
    'mixed' when the list joins both."""
    kinds = set()
    for part in [p for p in sel.split(',') if p.strip()]:
        names = set(NAME.findall(part))
        is_b = bool(names & bk) or 'data-v="b' in part or "data-v='b" in part
        kinds.add('record' if is_b else 'presented')
    if kinds == {'record'}: return 'record'
    if kinds == {'presented'}: return 'presented'
    return 'mixed'

def js_defs(s):
    """[(key, start, end)] for each version definition in an EZ.section map"""
    out = []
    for m in re.finditer(r'\n    (b?\d+): \{ init: function', s):
        nxt = re.search(r'\n    (?:/\*.*?\*/\s*)*[0-9a-z]+: \{ init: function|\n  \}\);', s[m.end():], re.S)
        out.append((m.group(1), m.start(), m.end() + nxt.start()))
    return out

# ---------------------------------------------------------------- the mapping (legacy token -> semantic role)
STATE = re.compile(r'aria-(pressed|checked|selected|expanded|current)="?(true|page)|:checked|\.is-(on|open|today|named|active|sel|cur|picked)\b|\[open\]|:hover|:focus|:active|\.on\b|\.active\b|--on\b|\.cur\b')
BG_PROPS = ('background', 'background-color', 'background-image')
def classify_prop(prop):
    p = prop.strip().lower()
    if p in BG_PROPS: return 'bg'
    if p in ('color', '-webkit-text-fill-color', 'caret-color'): return 'text'
    if p == 'fill': return 'fill'
    if p in ('stroke',): return 'stroke'
    if p.startswith('box-shadow') or p.startswith('border') or p.startswith('outline') or p in ('column-rule', 'column-rule-color', 'text-decoration', 'text-decoration-color', 'text-shadow', 'filter', 'scrollbar-color'):
        return 'line'
    if p == 'accent-color': return 'accentcolor'
    if p.startswith('--'): return 'custom'
    if p in ('stop-color', 'flood-color', 'lighting-color'): return 'fill'
    return 'other'

def map_token(tok, kind, sel, prop, ctx):
    """legacy token -> semantic token name (without var()). ctx: {'svg': bool, 'accent_bg': bool}"""
    st = bool(STATE.search(sel))
    svg = ctx.get('svg')
    if kind in ('fill', 'stroke') or (svg and kind == 'bg'):
        k = kind if kind != 'bg' else 'fill'
        if tok in ('ink', 'field-ink', 'accent-ink'): return 'color-art-line'
        if tok in ('ink-2', 'muted', 'field-muted', 'grey', 'old'): return 'color-art-line-soft'
        if tok in ('white', 'paper', 'surface', 'bg'): return 'color-surface'
        if tok in ('surface-2', 'field', 'line-soft'): return 'color-art-fill' if k == 'fill' else 'color-border-subtle'
        if tok in ('a-50', 'a-100'): return 'color-art-fill'
        if tok in ('a-200', 'a-300'): return 'color-art-accent-soft'
        if tok in ('a-500', 'a-600', 'a-700', 'a-800', 'accent', 'accent-text', 'field-accent', 'line'): return 'color-art-accent'
        if tok in ('err', 'err-field', 'err-paper'): return 'color-danger-text'
    if kind == 'bg':
        if tok in ('bg', 'paper'): return 'color-bg'
        if tok in ('surface', 'white'): return 'color-surface'
        if tok in ('surface-2', 'field', 'a-50'): return 'color-bg-subtle'
        if tok == 'a-100': return 'color-accent-subtle' if st else 'color-bg-subtle'
        if tok in ('a-200', 'a-300'): return 'color-accent-subtle-hover' if st else 'color-bg-muted'
        if tok in ('a-500', 'a-600', 'accent', 'line'): return 'color-accent-solid'
        if tok in ('a-700', 'a-800', 'accent-text', 'field-accent'): return 'color-accent-solid-hover'
        if tok in ('ink', 'field-ink', 'accent-ink', 'ink-2'): return 'color-accent-solid' if st else 'color-bg-inverse'
        if tok in ('grey', 'line-soft', 'old'): return 'color-bg-muted'
        if tok in ('muted', 'field-muted'): return 'color-border-strong'
        if tok in ('err', 'err-field', 'err-paper'): return 'color-danger-text'
        if tok == 'scrim': return 'color-overlay'
    if kind == 'text':
        if tok in ('ink', 'field-ink'): return 'color-text-on-accent' if ctx.get('accent_bg') else ('color-text-inverse' if ctx.get('inverse_bg') else 'color-text')
        if tok == 'accent-ink': return 'color-text-on-accent'
        if tok in ('ink-2', 'muted', 'field-muted', 'grey', 'old'): return 'color-text-secondary'
        if tok in ('white', 'paper', 'surface', 'bg'): return 'color-text-on-accent' if ctx.get('accent_bg') else 'color-text-inverse'
        if tok in ('a-500', 'a-600', 'a-700', 'a-800', 'accent', 'accent-text', 'field-accent', 'line'): return 'color-accent-text' if st else 'color-text-secondary'
        if tok in ('a-50', 'a-100', 'a-200', 'a-300'): return 'color-text-inverse'
        if tok in ('err', 'err-field', 'err-paper'): return 'color-danger-text'
    if kind == 'custom':
        if 'tint' in prop: return 'color-accent-solid'
        if 'acc' in prop: return 'color-accent-border'
    if kind == 'text' and tok == 'line-soft': return 'color-text-secondary'
    if kind in ('line', 'custom', 'other', 'accentcolor'):
        if kind == 'accentcolor': return 'color-accent-solid'
        if prop.strip().startswith('outline'): return 'color-focus-ring'
        if tok in ('ink', 'field-ink', 'accent-ink', 'ink-2'): return 'color-border-strong'
        if tok in ('muted', 'field-muted', 'grey', 'old'): return 'color-border'
        if tok in ('line-soft', 'surface-2', 'field'): return 'color-border-subtle'
        if tok in ('white', 'paper', 'surface', 'bg'): return 'color-surface'
        if tok in ('a-50', 'a-100', 'a-200', 'a-300'): return 'color-accent-subtle-hover' if st else 'color-border-subtle'
        if tok in ('a-500', 'a-600', 'a-700', 'a-800', 'accent', 'accent-text', 'field-accent', 'line'): return 'color-accent-border' if st else 'color-border-strong'
        if tok in ('err', 'err-field', 'err-paper'): return 'color-danger-text'
        if tok == 'scrim': return 'color-overlay'
        if tok == 'shadow': return 'shadow-card'
    return None

LEG = r'(a-\d+|ink-2|ink|paper|white|grey|line-soft|line|muted|field-ink|field-muted|field-accent|field|surface-2|surface|bg|accent-text|accent-ink|accent|err-field|err-paper|err|old|scrim|shadow)'
VAR = re.compile(r'var\(--' + LEG + r'\)')

def decls(body):
    """[(prop, vstart, vend)] spans of each declaration value inside a rule body"""
    out, i = [], 0
    for m in re.finditer(r'([\w-]+)\s*:', body):
        pass
    # simple scanner that respects parentheses and quotes
    i, n = 0, len(body)
    while i < n:
        m = re.compile(r'\s*([-\w]+)\s*:').match(body, i)
        if not m:
            j = body.find(';', i)
            if j < 0: break
            i = j + 1; continue
        prop, v0 = m.group(1), m.end()
        k, d, q = v0, 0, None
        while k < n:
            c = body[k]
            if q:
                if c == q: q = None
            elif c in '"\'': q = c
            elif c == '(': d += 1
            elif c == ')': d -= 1
            elif c == ';' and d == 0: break
            k += 1
        out.append((prop, v0, k))
        i = k + 1
    return out

def rewrite_body(body, sel, svg_hint=False, log=None):
    ds = decls(body)
    props = {p.lower(): body[a:b] for p, a, b in ds}
    bgv = ' '.join(v for p, v in props.items() if p in BG_PROPS)
    accent_bg = bool(re.search(r'var\(--(a-500|a-600|a-700|a-800|accent|accent-text|line)\)', bgv))
    inverse_bg = bool(re.search(r'var\(--(ink|ink-2|field-ink)\)', bgv)) and not STATE.search(sel)
    if inverse_bg and STATE.search(sel): accent_bg = True
    svg = svg_hint or bool(re.search(r'(^|[\s>,])(svg|path|rect|circle|line|polyline|polygon|ellipse|text|g|use|tspan)\b|\.rg-|__(svg|map|ico|icon|tick|lamp|dial|rule|house|plan|art|draw)', sel))
    ctx = {'svg': svg, 'accent_bg': accent_bg or bool(re.search(r'var\(--(ink|field-ink)\)', bgv)) and bool(STATE.search(sel)), 'inverse_bg': inverse_bg}
    out, last = [], 0
    for p, a, b in ds:
        val = body[a:b]
        kind = classify_prop(p)
        def rep(m):
            t = map_token(m.group(1), kind, sel, p, ctx)
            if log is not None: log.append((sel[:60], p, m.group(1), t))
            return 'var(--%s)' % t if t else m.group(0)
        nv = VAR.sub(rep, val)
        out.append(body[last:a]); out.append(nv); last = b
    out.append(body[last:])
    nb = ''.join(out)
    # an accent fill whose text colour is inherited gets the on-accent text explicitly
    if re.search(r'var\(--color-accent-solid(-hover)?\)', ' '.join(nb[a:b] for p, a, b in decls(nb) if p.lower() in BG_PROPS)) and 'color' not in [p.lower() for p, a, b in decls(nb)]:
        nb = nb.rstrip().rstrip(';') + '; color: var(--color-text-on-accent); '
    return nb

def rewrite_css(text, bk, log):
    rules = css_rules(text)
    edits = []
    stats = {'presented': 0, 'record': 0, 'mixed': 0}
    for sel, a, b, kind, media in rules:
        if kind == 'at': continue
        owner = 'presented' if kind == 'keyframes' and not (set(re.findall(r'[\w-]+', sel)) & bk) else ('record' if kind == 'keyframes' else rule_owner(sel, bk))
        stats[owner] += 1
        if owner == 'record': continue
        body = text[a:b]
        if owner == 'mixed':
            log.append(('MIXED', sel[:80], '', ''))
            continue
        nb = rewrite_body(body, sel, log=log)
        if nb != body: edits.append((a, b, nb))
    for a, b, nb in sorted(edits, reverse=True): text = text[:a] + nb + text[b:]
    return text, stats

ROOF = '<svg class="eyebrow__roof" viewBox="0 0 20 12" aria-hidden="true" focusable="false"><path d="M2 11 L10 3 L18 11"/></svg>'
MARK = '<svg class="eyebrow__mark" viewBox="0 0 48 48" aria-hidden="true" focusable="false"><path d="M38 7.5 H10 V40.5 H38"/></svg>'
def rewrite_html(h):
    blocks = [(a, b) for p, v, a, b in html_blocks(h) if not v.startswith('b')]
    n = 0
    for a, b in sorted(blocks, reverse=True):
        seg = h[a:b]; n += seg.count(ROOF)
        h = h[:a] + seg.replace(ROOF, MARK) + h[b:]
    return h, n

if __name__ == '__main__':
    mode = sys.argv[1] if len(sys.argv) > 1 else 'report'
    total = {}
    for sec in HOME + INNER:
        vis, bk = prefixes(sec)
        if sec in INNER: bk = {p + 'r' for p in vis}
        log = []
        css = R('css/sections/%s.css' % sec)
        new, st = rewrite_css(css, bk, log)
        mixed = [l for l in log if l[0] == 'MIXED']
        print('%-14s rules presented %3d record %3d mixed %2d  token rewrites %4d' % (sec, st['presented'], st['record'], st['mixed'], len([l for l in log if l[0] != 'MIXED'])))
        for m in mixed: print('   MIXED', m[1])
        h, nroof = rewrite_html(R('sections/%s.html' % sec))
        if mode == 'apply':
            W('css/sections/%s.css' % sec, new); W('sections/%s.html' % sec, h)
    for f in ('css/chrome.css', 'css/systems.css'):
        log = []
        new, st = rewrite_css(R(f), set(), log)
        print('%-14s rules presented %3d record %3d  token rewrites %4d' % (f, st['presented'], st['record'], len(log)))
        if mode == 'apply': W(f, new)
