# R6 rebrand migration: every VISIBLE version and shared component moves from the R4 legacy aliases (--a50..--a800,
# --sun, --ink, --paper, --cream, --blue, --muted...) to the role tokens of the new system (better-colors S0071: components
# reference only the semantic tier). Property-aware: the same old token means a different role in color:, background:,
# stroke:/border:, fill: and box-shadow:. Selector-aware for the accent (S0071 "fill exactly one action per view" +
# von-restorff S1435): buttons and selected states get the solid fill; deep bands get the inverse ground; data marks and
# drawings get the illustration accent; everything else rests in neutrals. Hidden backups (bk/) are never touched.
# Literal shadows rgb(20 20 20 / a) become color-mix() of --color-shadow. Idempotent. Run: python3 -I build/mk-rebrand.py
import re, glob, os
SRC = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'src')
os.chdir(SRC)
FILES = ['base.css'] + sorted(f for f in glob.glob('sections/*/*.css') if '/bk/' not in f)
PROP = {}
for p in ('color', 'caret-color', '-webkit-text-stroke', 'text-decoration-color', '--fw', '--fb'): PROP[p] = 'TEXT'
for p in ('background', 'background-color', 'background-image', '--vbg'): PROP[p] = 'BG'
for p in ('stroke', 'border', 'border-color', 'border-top', 'border-bottom', 'border-left', 'border-right', 'border-left-color', 'border-top-color', 'outline', 'outline-color', 'column-rule', 'text-decoration'): PROP[p] = 'LINE'
for p in ('fill', 'stop-color', 'flood-color', '--fa'): PROP[p] = 'FILL'
for p in ('box-shadow', 'text-shadow', 'filter', '-webkit-mask-image', 'mask-image'): PROP[p] = 'SHADOW'
PROP['accent-color'] = 'ACCENTC'
# legacy token -> {property class: semantic token}
T = 'text'; S = lambda x: '--color-' + x
M = {
 'ink':     {'TEXT': S('text'), 'BG': S('bg-inverse'), 'LINE': S('border-strong'), 'FILL': S('illustration-line'), 'SHADOW': S('border-strong')},
 'black':   {'TEXT': S('text'), 'BG': S('bg-inverse'), 'LINE': S('border-strong'), 'FILL': S('illustration-line'), 'SHADOW': S('border-strong')},
 'ink-2':   {'TEXT': S('text'), 'BG': S('bg-inverse'), 'LINE': S('border-strong'), 'FILL': S('illustration-line'), 'SHADOW': S('border-strong')},
 'paper':   {'TEXT': S('text-inverse'), 'BG': S('bg-surface'), 'LINE': S('bg-surface'), 'FILL': S('illustration-paper'), 'SHADOW': S('bg-surface')},
 'white':   {'TEXT': S('text-inverse'), 'BG': S('bg-surface'), 'LINE': S('bg-surface'), 'FILL': S('illustration-paper'), 'SHADOW': S('bg-surface')},
 'sky':     {'TEXT': S('text-inverse'), 'BG': S('bg'), 'LINE': S('bg-surface'), 'FILL': S('illustration-paper'), 'SHADOW': S('bg-surface')},
 'cream':   {'TEXT': S('text-inverse'), 'BG': S('bg-subtle'), 'LINE': S('border-subtle'), 'FILL': S('illustration-fill'), 'SHADOW': S('border-subtle')},
 'a50':     {'TEXT': S('text-inverse'), 'BG': S('bg-subtle'), 'LINE': S('border-subtle'), 'FILL': S('illustration-fill'), 'SHADOW': S('border-subtle')},
 'a100':    {'TEXT': S('text-inverse'), 'BG': S('bg-subtle'), 'LINE': S('border-subtle'), 'FILL': S('illustration-fill'), 'SHADOW': S('border-subtle')},
 'a200':    {'TEXT': S('text-secondary'), 'BG': S('bg-sunken'), 'LINE': S('border'), 'FILL': S('illustration-accent-soft'), 'SHADOW': S('border')},
 'a300':    {'TEXT': S('accent-text'), 'BG': S('accent-subtle-hover'), 'LINE': S('accent-border'), 'FILL': S('illustration-accent-soft'), 'SHADOW': S('accent-border')},
 'chalk':   {'TEXT': S('accent-text'), 'BG': S('accent-subtle-hover'), 'LINE': S('accent-border'), 'FILL': S('illustration-accent-soft'), 'SHADOW': S('accent-border')},
 'a400':    {'TEXT': S('accent-text'), 'BG': S('illustration-accent'), 'LINE': S('border-focus'), 'FILL': S('illustration-accent'), 'SHADOW': S('accent-border')},
 'a500':    {'TEXT': S('accent-text'), 'BG': S('illustration-accent'), 'LINE': S('accent-solid'), 'FILL': S('illustration-accent'), 'SHADOW': S('accent-border'), 'ACCENTC': S('accent-solid')},
 'sun':     {'TEXT': S('accent-text'), 'BG': S('illustration-accent'), 'LINE': S('accent-solid'), 'FILL': S('illustration-accent'), 'SHADOW': S('accent-border'), 'ACCENTC': S('accent-solid')},
 'accent':  {'TEXT': S('accent-text'), 'BG': S('illustration-accent'), 'LINE': S('accent-solid'), 'FILL': S('illustration-accent'), 'SHADOW': S('accent-border'), 'ACCENTC': S('accent-solid')},
 'sun-hi':  {'TEXT': S('accent-text'), 'BG': S('accent-solid-hover'), 'LINE': S('accent-solid-hover'), 'FILL': S('illustration-accent'), 'SHADOW': S('accent-border')},
 'a600':    {'TEXT': S('accent-text'), 'BG': S('accent-solid-hover'), 'LINE': S('accent-solid'), 'FILL': S('illustration-accent'), 'SHADOW': S('accent-border')},
 'blue-hi': {'TEXT': S('accent-text'), 'BG': S('accent-solid-hover'), 'LINE': S('accent-solid'), 'FILL': S('illustration-accent'), 'SHADOW': S('accent-border')},
 'a700':    {'TEXT': S('accent-text'), 'BG': S('accent-solid'), 'LINE': S('accent-solid'), 'FILL': S('illustration-accent-deep'), 'SHADOW': S('accent-border')},
 'blue':    {'TEXT': S('accent-text'), 'BG': S('accent-solid'), 'LINE': S('accent-solid'), 'FILL': S('illustration-accent-deep'), 'SHADOW': S('accent-border')},
 'a800':    {'TEXT': S('accent-text'), 'BG': S('accent-solid-hover'), 'LINE': S('accent-text'), 'FILL': S('illustration-accent-deep'), 'SHADOW': S('accent-border')},
 'shingle': {'TEXT': S('text'), 'BG': S('illustration-accent-deep'), 'LINE': S('illustration-line'), 'FILL': S('illustration-accent-deep'), 'SHADOW': S('border-strong')},
 'wood':    {'TEXT': S('text-secondary'), 'BG': S('illustration-fill'), 'LINE': S('border'), 'FILL': S('illustration-fill'), 'SHADOW': S('border')},
 'muted':   {'TEXT': S('text-secondary'), 'BG': S('bg-sunken'), 'LINE': S('border-control'), 'FILL': S('illustration-fill-strong'), 'SHADOW': S('border')},
 'on-dark-2': {'TEXT': S('text-secondary'), 'BG': S('bg-sunken'), 'LINE': S('border-control'), 'FILL': S('illustration-fill-strong'), 'SHADOW': S('border')},
 'on-blue-muted': {'TEXT': S('text-secondary'), 'BG': S('bg-sunken'), 'LINE': S('border'), 'FILL': S('illustration-fill-strong'), 'SHADOW': S('border')},
 'mist':    {'TEXT': S('text-tertiary'), 'BG': S('bg-subtle'), 'LINE': S('border-subtle'), 'FILL': S('illustration-fill'), 'SHADOW': S('border-subtle')},
 'line':    {'TEXT': S('text-tertiary'), 'BG': S('bg-subtle'), 'LINE': S('border-subtle'), 'FILL': S('illustration-fill'), 'SHADOW': S('border-subtle')},
 'n300':    {'TEXT': S('text-disabled'), 'BG': S('bg-sunken'), 'LINE': S('border'), 'FILL': S('illustration-fill'), 'SHADOW': S('border')},
 'n500':    {'TEXT': S('text-tertiary'), 'BG': S('bg-sunken'), 'LINE': S('border-control'), 'FILL': S('illustration-fill-strong'), 'SHADOW': S('border-control')},
 'steel':   {'TEXT': S('text-tertiary'), 'BG': S('bg-sunken'), 'LINE': S('border-control'), 'FILL': S('illustration-fill-strong'), 'SHADOW': S('border-control')},
 'n700':    {'TEXT': S('text-secondary'), 'BG': S('bg-sunken'), 'LINE': S('border-control'), 'FILL': S('illustration-fill-strong'), 'SHADOW': S('border-control')},
}
# selectors: the accent's solid fill is earned only by actions and states (S0071, S1435)
PRIMARY = re.compile(r'\.btn--sun|\.(?:hw2|fm1|fm2|fm4)-call\b|\.wv6-next|\.cl4-go|\.pick-ind|\.st7-spot|\.cl4-caret|\.sv5-w\.is-front')
STATE = re.compile(r'aria-pressed="true"|aria-selected="true"|aria-expanded="true"|:checked|\.is-today|\.is-on\b')
HILITE = re.compile(r'\.tw5-home|\.tw8-s--home|\.hw8-s:nth-child\(3\)|\.fm7-hello|\.sc4-k|\.ac4-k|::selection')
DEEP = re.compile(r'(^|[\s,])\.(cl[1-57]|sc2-band|ac2-band|kt4-panel|kt2-back)(?![\w-])')
SKIP = re.compile(r'on-bk|on-rec|^:root')
def decl_class(prop): return PROP.get(prop.strip(), None)
def remap_value(prop, val, sel):
    cls = decl_class(prop)
    def rep(m):
        tok = m.group(1)
        if tok not in M: return m.group(0)
        c = cls or 'FILL'
        if c == 'BG' and tok in ('a500', 'sun', 'accent', 'a400', 'a700', 'blue'):
            if DEEP.search(sel) and prop.strip() in ('background', 'background-color', '--vbg'): return 'var(--color-bg-inverse)'
            if PRIMARY.search(sel) or STATE.search(sel): return 'var(--color-accent-solid)'
            if HILITE.search(sel): return 'var(--color-accent-subtle)' if '::selection' not in sel else 'var(--color-accent-subtle-hover)'
        if c == 'BG' and prop.strip() == '--vbg' and tok in ('paper', 'white', 'sky'): return 'var(--color-bg)'
        return 'var(' + M[tok].get(c, M[tok]['FILL']) + ')'
    return re.sub(r'var\(--([a-z0-9-]+)\)', rep, val)
def shadow_literals(val):
    return re.sub(r'rgb\(20 20 20 / ([\d.]+)\)', lambda m: f'color-mix(in oklab,var(--color-shadow) {round(float(m.group(1)) * 100)}%,transparent)', val)
def migrate_block(sel, body):
    out = []
    decls = re.split(r'(;)', body)
    # decide text colour for rules whose ground becomes the solid accent (white label, S0071 "put the colour on the background")
    newbody = ''
    for part in re.finditer(r'([^;]*)(;?)', body):
        d, semi = part.group(1), part.group(2)
        if not d and not semi: continue
        m = re.match(r'(\s*)([-a-zA-Z]+)(\s*:\s*)(.*)$', d, re.S)
        if m and 'var(--' in m.group(4) or (m and 'rgb(20 20 20' in m.group(4)):
            v = shadow_literals(remap_value(m.group(2), m.group(4), sel))
            d = m.group(1) + m.group(2) + m.group(3) + v
        elif m and 'rgb(20 20 20' in d: d = shadow_literals(d)
        newbody += d + semi
    if re.search(r'background(-color)?\s*:\s*var\(--color-accent-solid\)', newbody):
        newbody = re.sub(r'(?<![-\w])color\s*:\s*var\(--color-text\)', 'color:var(--color-text-on-accent)', newbody)
        if not re.search(r'(?<![-\w])color\s*:', newbody): newbody = newbody.rstrip(';') + ';color:var(--color-text-on-accent)'
    return newbody
total = 0
for f in FILES:
    s = open(f).read(); orig = s
    # skip the :root token block and the backup palette blocks
    def blk(m):
        sel, body = m.group(1), m.group(2)
        if SKIP.search(sel.strip().split('\n')[-1].strip()) or ':root' in sel: return m.group(0)
        return sel + '{' + migrate_block(sel.strip().split('\n')[-1], body) + '}'
    s = re.sub(r'([^{}]*)\{([^{}]*)\}', blk, s)
    if s != orig:
        open(f, 'w').write(s); n = sum(1 for a, b in zip(orig.split('var(--'), s.split('var(--')) if a != b); total += 1; print('migrated', f)
print('files changed', total)
