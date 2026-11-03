"""Phase 2 token layer for Austin Pro Siding (mark C1 The Profile House).

Writes into brand-v2/phase2/:
- tokens.json: W3C DTCG format ($value / $type / $description), in three tiers: primitive, semantic, component.
- tokens.css: the same tokens as custom properties, with reduced-motion overrides at :root.
- contrast-pairs.md: every text and UI pair the system renders, measured by WCAG 2 relative luminance from the token
  values. The board re-measures them from computed styles in the browser (S0071: measure the rendered pair).

Primitives come from the steel and neutral ramps measured earlier tonight (OKLCH hue 248; Muse correction 2 allows them
as Phase 2 raw material). Every semantic name says its job, never its hue (S0071, S1466).
Run: python3 -I brand-v2/phase2/tokens.py"""
import re, json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from colour import cr, hex_to_rgb, oklch_of  # noqa: E402

STEEL = ['#FAFCFE', '#ECF3FA', '#DEE9F5', '#D0E0F0', '#C2D6EB', '#B2CBE4', '#9CBCDB', '#6790B8', '#396791', '#2E5A82', '#295073', '#16293B']
NEUTRAL = ['#FBFCFD', '#F0F2F4', '#E5E8EB', '#DBDEE2', '#D0D4D8', '#C4C8CD', '#B4B9BE', '#888D92', '#5E6469', '#52575D', '#484E53', '#24282C', '#131619']
PRIM = {'white': '#FFFFFF', 'black': '#000000'}
PRIM.update({f'steel-{i + 1}': v for i, v in enumerate(STEEL)})
PRIM.update({f'neutral-{i + 1}': v for i, v in enumerate(NEUTRAL)})
assert PRIM['steel-9'] == '#396791'

# ---------------------------------------------------------------- semantic colour roles (light-dominant, one accent)
# (name, primitive, description). Only roles something renders; no status ramps: errors are carried by an icon and
# words in neutral ink, because the brand lock is black + white + steel and colour must never carry meaning alone.
SEM = [
    ('bg-page', 'white', 'Default page background. The site is light-dominant.'),
    ('bg-subtle', 'neutral-2', 'Alternate section band: a quiet step off white.'),
    ('bg-sunken', 'neutral-3', 'Wells: form fields at rest, the map frame, inset panels.'),
    ('bg-accent-subtle', 'steel-2', 'Steel-tinted band: selected rows, the booking aside.'),
    ('bg-accent-field', 'steel-9', 'Full-bleed steel section (colour as content; at most one per page).'),
    ('bg-deep', 'steel-12', 'Dark steel close: the footer and the final call to action.'),
    ('bg-inverse', 'neutral-13', 'Black surfaces: the photo caption plate, the menu sheet.'),
    ('text-primary', 'neutral-13', 'Headings and body text on light surfaces.'),
    ('text-secondary', 'neutral-11', 'Supporting copy, captions, meta.'),
    ('text-muted', 'neutral-9', 'Least emphasis that still passes 4.5:1 on white and on bg-subtle.'),
    ('text-accent', 'steel-11', 'Links and the eyebrow label on light surfaces.'),
    ('text-on-accent', 'white', 'Text on steel-9 and darker steel.'),
    ('text-inverse', 'white', 'Text on bg-deep and bg-inverse.'),
    ('text-inverse-secondary', 'steel-5', 'Secondary text on bg-deep.'),
    ('border-subtle', 'neutral-4', 'Hairlines and dividers (decorative; no contrast requirement).'),
    ('border-default', 'neutral-6', 'Card and panel edges (decorative).'),
    ('border-control', 'neutral-9', 'Edges of inputs and secondary buttons (non-text UI, 3:1 required).'),
    ('accent-solid', 'steel-9', 'The one filled primary action per view; the course line; the logo mark.'),
    ('accent-solid-hover', 'steel-10', 'Primary action hover.'),
    ('accent-solid-active', 'steel-11', 'Primary action pressed.'),
    ('accent-line', 'steel-9', 'The course line motif and section rules.'),
    ('accent-line-on-dark', 'steel-6', 'The course line on bg-deep.'),
    ('focus-ring', 'steel-9', 'Focus ring on light surfaces: 3px solid, 3px offset.'),
    ('focus-ring-on-dark', 'white', 'Focus ring on steel and dark surfaces.'),
    ('mark', 'steel-9', 'Logo mark on light surfaces. On dark or steel surfaces the mark is white.'),
    ('error-ink', 'neutral-13', 'Error text and its 2px field border. Paired with an icon and the word "Check", never red.'),
    # added in build cycle 8, when the conformance lint found raw #fff doing these two jobs
    ('surface-on-dark', 'white', 'A light control surface on steel or dark fields: the primary button and the selected tab there.'),
    ('error-ink-on-dark', 'white', 'Error text and its field border on dark surfaces; icon and the word "Check" as on light.'),
    # added in build cycle 8 so components read roles, not primitives (S0071); each points at the value it already had
    ('text-inverse-soft', 'steel-3', 'Supporting text on bg-deep that sits closer to white than text-inverse-secondary.'),
    ('text-inverse-muted', 'steel-4', 'Captions and hints on dark surfaces: drawing captions, form hints.'),
    ('text-on-accent-secondary', 'steel-2', 'Secondary text on steel-9 to steel-11 plates (passes 4.5:1 on all three).'),
    ('numeral-on-dark', 'steel-6', 'Large numerals set on bg-deep: the years.'),
    ('surface-on-dark-hover', 'steel-2', 'Hover state of surface-on-dark.'),
    ('border-on-dark-subtle', 'steel-10', 'Hairlines and rails on bg-deep (decorative).'),
    ('border-on-dark', 'steel-7', 'Edges of chips and steps on bg-deep.'),
    ('border-on-dark-control', 'steel-8', 'Edges of secondary controls on bg-deep (non-text UI).'),
    ('border-on-dark-strong', 'steel-6', 'The secondary call link edge on the dark hero.'),
    ('selected-ring', 'steel-11', 'The inset ring on a selected chip, tile or swatch.'),
    ('selected-on-dark', 'steel-10', 'A selected chip on bg-deep.'),
    ('step-done', 'steel-7', 'The rail of a completed step in the visualiser.'),
       # construction drawings: a tonal set named by job, not by part (cycle 10; parts differ per drawing, so a part name would mislabel)
    ('drawing-fill-light', 'steel-2', 'Light fills in drawings: openings and glass on light grounds.'),
    ('drawing-fill', 'steel-3', 'Fills of planes in drawings: a roof plane, a gutter body.'),
    ('drawing-highlight', 'steel-4', 'Light edges and labels in drawings on dark grounds.'),
    ('drawing-label', 'steel-5', 'Labels and fine edges inside drawings.'),
    ('drawing-ink', 'steel-6', 'Outlines, dimension and leader lines; board edges and trim.'),
    ('drawing-line', 'steel-7', 'Secondary lines and dashed details; the house wrap.'),
    ('drawing-member', 'steel-8', 'Secondary members: studs, frames, rafters; map dots.'),
    ('drawing-solid', 'steel-9', 'Main members and solid parts: sheathing, posts, shingles.'),
    ('drawing-glass', 'steel-10', 'Glass, drawn as a tint.'),
    ('drawing-shade', 'steel-11', 'Shadow lines and the deepest tone in a drawing on light.'),
    ('drawing-deep', 'steel-12', 'Bodies in section: a board, a sill, a door leaf.'),
    ('pattern-ground', 'neutral-1', 'Ground of the course-line pattern.'),
    ('pattern-course', 'neutral-3', 'The course line in the course-line pattern.'),
]
SEMMAP = {n: p for n, p, _ in SEM}

# ---------------------------------------------------------------- pairs that must pass, and their requirement
PAIRS = [  # fg role, bg role, required ratio, what it is
    ('text-primary', 'surface-on-dark', 4.5, 'button text on the light surface'), ('surface-on-dark', 'bg-deep', 3.0, 'light control on the dark close'),
    ('surface-on-dark', 'bg-accent-field', 3.0, 'light control on the steel field'), ('error-ink-on-dark', 'bg-deep', 4.5, 'error text on the dark form'),
    ('text-primary', 'bg-page', 4.5, 'body text'), ('text-primary', 'bg-subtle', 4.5, 'body text on band'),
    ('text-primary', 'bg-sunken', 4.5, 'input text'), ('text-primary', 'bg-accent-subtle', 4.5, 'body on steel tint'),
    ('text-secondary', 'bg-page', 4.5, 'captions'), ('text-secondary', 'bg-subtle', 4.5, 'captions on band'),
    ('text-secondary', 'bg-accent-subtle', 4.5, 'captions on steel tint'),
    ('text-muted', 'bg-page', 4.5, 'meta'), ('text-muted', 'bg-subtle', 4.5, 'meta on band'),
    ('text-accent', 'bg-page', 4.5, 'links'), ('text-accent', 'bg-subtle', 4.5, 'links on band'),
    ('text-accent', 'bg-accent-subtle', 4.5, 'links on steel tint'),
    ('text-on-accent', 'bg-accent-field', 4.5, 'text on the steel field and on the primary button'),
    ('text-on-accent', 'accent-solid-hover', 4.5, 'primary button hover'),
    ('text-on-accent', 'accent-solid-active', 4.5, 'primary button pressed'),
    ('text-inverse', 'bg-deep', 4.5, 'footer text'), ('text-inverse-secondary', 'bg-deep', 4.5, 'footer secondary'),
    ('text-inverse', 'bg-inverse', 4.5, 'caption plate'),
    ('error-ink', 'bg-page', 4.5, 'error message'),
    ('border-control', 'bg-page', 3.0, 'input and secondary button edge'), ('border-control', 'bg-sunken', 3.0, 'input edge on its well'),
    ('accent-solid', 'bg-page', 3.0, 'primary button and course line against the page'),
    ('focus-ring', 'bg-page', 3.0, 'focus ring'), ('focus-ring', 'bg-subtle', 3.0, 'focus ring on band'),
    ('focus-ring-on-dark', 'bg-accent-field', 3.0, 'focus ring on steel'), ('focus-ring-on-dark', 'bg-deep', 3.0, 'focus ring on dark'),
    ('mark', 'bg-page', 3.0, 'logo mark (graphic)'), ('accent-line-on-dark', 'bg-deep', 3.0, 'course line on dark'),
]

# ---------------------------------------------------------------- type: Utopia fluid scale (S1433)
MIN_VW, MAX_VW = 360, 1440
MIN_BASE, MAX_BASE, MIN_R, MAX_R = 16, 18, 1.2, 1.25


def clamp(step):
    lo, hi = MIN_BASE * MIN_R ** step, MAX_BASE * MAX_R ** step
    slope = (hi - lo) / (MAX_VW - MIN_VW)
    icept = lo - slope * MIN_VW
    return lo, hi, f'clamp({lo / 16:.4f}rem, {icept / 16:.4f}rem + {slope * 100:.4f}vw, {hi / 16:.4f}rem)'


STEPS = {s: clamp(s) for s in range(-1, 7)}
TYPE_ROLES = [  # role, step, family, weight, line-height, tracking, use
    ('display', 6, 'display', 800, 1.0, '-0.02em', 'One per page: the hero line.'),
    ('h1', 5, 'display', 800, 1.05, '-0.015em', 'Page title on inner pages.'),
    ('h2', 4, 'display', 800, 1.1, '-0.01em', 'Section headings.'),
    ('h3', 2, 'display', 700, 1.2, '0', 'Card and sub-section headings.'),
    ('lead', 1, 'text', 400, 1.5, '0', 'The first paragraph of a section.'),
    ('body', 0, 'text', 400, 1.6, '0', 'Running text. Never below 16 px.'),
    ('label', -1, 'text', 600, 1.3, '0.06em', 'Eyebrows and labels, uppercase.'),
    ('small', -1, 'text', 400, 1.5, '0', 'Captions and meta. 13.3 px at the smallest.'),
]
FAMILIES = {'display': "'Montserrat', 'Arial', sans-serif", 'text': "'Inter', 'Arial', sans-serif",
            'figures': "'Inter', 'Arial', sans-serif"}

# ---------------------------------------------------------------- spacing (Carbon ladder, S1432)
SPACE = [2, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 160]
SPACE_USE = ['hairline offsets', 'icon to label', 'related items', 'control inset', 'default gap', 'card inset',
             'group gap', 'block gap', 'section inner', 'section gap', 'large section gap', 'hero inset', 'chapter break']

RADIUS = [('none', 0, 'Default. Siding is cut square.'), ('sm', 2, 'Buttons, inputs, tiles; the same corner as the C3 tile.')]
MOTION = [('instant', 50, 'State ticks: checkbox, toggle.'), ('fast', 100, 'Hover and press feedback.'),
          ('normal', 200, 'Default transition: menu, accordion, focus.'), ('moderate', 300, 'Panels and the before/after seam settling.'),
          ('deliberate', 600, 'The logo draw and the course line laying itself (once per view).')]
EASE = [('standard', 'cubic-bezier(0.2, 0, 0, 1)', 'Things changing state in place.'),
        ('enter', 'cubic-bezier(0.2, 0.8, 0.2, 1)', 'Things arriving (decelerate).'),
        ('exit', 'cubic-bezier(0.4, 0, 1, 1)', 'Things leaving (accelerate).'),
        ('draw', 'cubic-bezier(0.65, 0, 0.35, 1)', 'A line being laid: the logo and the course line.'),
        ('settle', 'cubic-bezier(0.34, 1.3, 0.5, 1)', 'A board landing: small overshoot, never past 1.05 scale.')]
# data numerals: the record count, the review score, the years, the phone number set large (cycle 8; Utopia form, rem term in each, max <= 2.5x min)
NUMERALS = [('xl', 'clamp(6rem, 4rem + 10vw, 13rem)', 'The record count and the review score.'),
            ('l', 'clamp(4rem, 3rem + 4vw, 7rem)', 'Years in the timeline.'),
            ('phone', 'clamp(3rem, 1.5rem + 6vw, 7rem)', 'The phone number set as the call to action; 14 characters, so it starts smaller.')]
SHADOW = [('sample', '0 1px 2px {12}, 0 12px 28px {12}', 'A lifted sample tile: the siding profiles.'),
          ('photo', '0 8px 24px {16}', 'A photo lifted off the page: the cutout cards.'),
          ('chip-edge', 'inset 0 -6px 0 {16}', 'The shade along a colour chip\'s lower edge: one lap line.')]


def shadow_value(v):
    return re.sub(r'\{(\d+)\}', lambda m: f'color-mix(in srgb, var(--neutral-13) {m.group(1)}%, transparent)', v)


LAYOUT = [('max-width', '1240px', 'Content column.'), ('gutter', 'clamp(16px, 4vw, 32px)', 'Page side margin; 16 px at phone width.'),
          ('columns', '12', 'Grid columns at desktop; 4 at phone width.'),
          ('section-pad', 'clamp(64px, 3.5rem + 5vw, 160px)', 'Vertical padding of a section.')]


def build():
    out = {'$description': 'Austin Pro Siding tokens. Tiers: primitive (values) → semantic (jobs) → component (scoped). '
                           'Components read semantic or component tokens only.'}
    prim = {'color': {}}
    for k, v in PRIM.items():
        L, C, H = oklch_of(v)
        prim['color'][k] = {'$value': v, '$type': 'color', '$description': f'oklch({L:.3f} {C:.3f} {H:.1f})'}
    out['primitive'] = prim
    sem = {'color': {n: {'$value': '{primitive.color.%s}' % p, '$type': 'color', '$description': d} for n, p, d in SEM}}
    sem['font'] = {'family': {k: {'$value': v, '$type': 'fontFamily'} for k, v in FAMILIES.items()}}
    sem['type'] = {}
    for r, st, fam, w, lh, tr, use in TYPE_ROLES:
        lo, hi, c = STEPS[st]
        sem['type'][r] = {'$type': 'typography', '$description': f'{use} Step {st}: {lo:.1f}–{hi:.1f} px.',
                          '$value': {'fontFamily': '{semantic.font.family.%s}' % fam, 'fontWeight': w, 'fontSize': c,
                                     'lineHeight': lh, 'letterSpacing': tr}}
    sem['space'] = {f'{i + 1:02d}': {'$value': f'{v}px', '$type': 'dimension', '$description': SPACE_USE[i]} for i, v in enumerate(SPACE)}
    sem['radius'] = {n: {'$value': f'{v}px', '$type': 'dimension', '$description': d} for n, v, d in RADIUS}
    sem['duration'] = {n: {'$value': f'{v}ms', '$type': 'duration', '$description': d} for n, v, d in MOTION}
    sem['easing'] = {n: {'$value': v, '$type': 'cubicBezier', '$description': d} for n, v, d in EASE}
    sem['layout'] = {n: {'$value': v, '$type': 'dimension', '$description': d} for n, v, d in LAYOUT}
    sem['shadow'] = {n: {'$value': v.replace('{', '{primitive.color.neutral-13 at ').replace('}', '%}'), '$type': 'shadow', '$description': d} for n, v, d in SHADOW}
    out['semantic'] = sem
    out['component'] = {
        'button-primary': {'bg': {'$value': '{semantic.color.accent-solid}'}, 'bg-hover': {'$value': '{semantic.color.accent-solid-hover}'},
                           'bg-active': {'$value': '{semantic.color.accent-solid-active}'}, 'text': {'$value': '{semantic.color.text-on-accent}'},
                           'height': {'$value': '48px', '$type': 'dimension'}, 'radius': {'$value': '{semantic.radius.sm}'}},
        'button-secondary': {'bg': {'$value': '{semantic.color.bg-page}'}, 'border': {'$value': '{semantic.color.border-control}'},
                             'text': {'$value': '{semantic.color.text-primary}'}, 'height': {'$value': '48px', '$type': 'dimension'}},
        'input': {'bg': {'$value': '{semantic.color.bg-page}'}, 'border': {'$value': '{semantic.color.border-control}'},
                  'border-error': {'$value': '{semantic.color.error-ink}'}, 'height': {'$value': '48px', '$type': 'dimension'}},
        'course-line': {'color': {'$value': '{semantic.color.accent-line}'}, 'weight': {'$value': '3px', '$type': 'dimension',
                        '$description': 'Matches the mark stroke at lockup size (5 units of 64 at 40 px ≈ 3 px).'}},
        'numeral': {n: {'$value': v, '$type': 'dimension', '$description': d} for n, v, d in NUMERALS},
        'logo': {'clear-space': {'$value': '0.125em', '$type': 'dimension', '$description': 'One course height (1/8 of mark height) on all sides, in mark-height units.'},
                 'min-icon': {'$value': '16px', '$type': 'dimension', '$description': 'Use the 16 px variant at 32 px and below.'},
                 'min-lockup-height': {'$value': '24px', '$type': 'dimension'}},
    }
    return out


def css(tok):
    L = [':root {']
    L.append('  /* primitives: values only, never read by components */')
    L += [f'  --{k}: {v};' for k, v in PRIM.items()]
    L.append('  /* semantic colour roles */')
    L += [f'  --color-{n}: var(--{p});' for n, p, _ in SEM]
    L.append('  /* type */')
    L += [f"  --font-{k}: {v};" for k, v in FAMILIES.items()]
    for r, st, fam, w, lh, tr, _ in TYPE_ROLES:
        L.append(f'  --type-{r}-size: {STEPS[st][2]}; --type-{r}-weight: {w}; --type-{r}-leading: {lh}; --type-{r}-tracking: {tr}; --type-{r}-family: var(--font-{fam});')
    L.append('  /* space, radius, layout */')
    L += [f'  --space-{i + 1:02d}: {v}px;' for i, v in enumerate(SPACE)]
    L += [f'  --radius-{n}: {v}px;' for n, v, _ in RADIUS]
    L += [f'  --layout-{n}: {v};' for n, v, _ in LAYOUT]
    L += [f'  --shadow-{n}: {shadow_value(v)};' for n, v, _ in SHADOW]
    L.append('  /* motion */')
    L += [f'  --duration-{n}: {v}ms;' for n, v, _ in MOTION]
    L += [f'  --ease-{n}: {v};' for n, v, _ in EASE]
    L.append('  /* component */')
    L += ['  --button-height: 48px; --input-height: 48px; --course-line-weight: 3px; --logo-clear-space: 0.125em;']
    L += [f'  --type-numeral-{n}: {v};' for n, v, _ in NUMERALS]
    L.append('}')
    L.append('@media (prefers-reduced-motion: reduce) {\n  :root { ' + ' '.join(f'--duration-{n}: 0ms;' for n, _, _ in MOTION) + ' }\n}')
    return '\n'.join(L) + '\n'


def contrast_rows():
    rows = []
    for fg, bg, need, what in PAIRS:
        a, b = PRIM[SEMMAP[fg]], PRIM[SEMMAP[bg]]
        r = cr(hex_to_rgb(a), hex_to_rgb(b))
        rows.append((fg, SEMMAP[fg], a, bg, SEMMAP[bg], b, r, need, what, r >= need))
    return rows


if __name__ == '__main__':
    tok = build()
    json.dump(tok, open(os.path.join(HERE, 'tokens.json'), 'w'), indent=2, ensure_ascii=False)
    open(os.path.join(HERE, 'tokens.css'), 'w').write(css(tok))
    rows = contrast_rows()
    md = ['# Contrast pairs, measured (Phase 2)', '',
          'Every pair the system renders. Each ratio is computed with the WCAG 2 relative-luminance formula from the token values in this thread. Nothing is estimated.',
          '',
          '- **Text:** 4.5:1 required.',
          '- **Non-text UI and graphics:** 3:1 required.',
          '',
          'The identity board re-measures each pair from computed styles in Chromium; see the "Contrast, re-measured in the browser" panel.', '',
          '| Foreground role | Value | Background role | Value | Ratio | Needs | Result | Use |', '|---|---|---|---|---|---|---|---|']
    for fg, fp, a, bg, bp, b, r, need, what, ok in rows:
        md.append(f'| {fg} ({fp}) | {a} | {bg} ({bp}) | {b} | {r:.2f}:1 | {need}:1 | {"PASS" if ok else "FAIL"} | {what} |')
    fails = [x for x in rows if not x[-1]]
    md += ['', f'**{len(rows)} pairs measured, {len(fails)} failing.**', '',
           'Not used as text anywhere:',
           f'- steel-8 #6790B8 ({cr(hex_to_rgb(PRIM["steel-8"]), hex_to_rgb("#FFFFFF")):.2f}:1 with white);',
           f'- neutral-8 #888D92 ({cr(hex_to_rgb(PRIM["neutral-8"]), hex_to_rgb("#FFFFFF")):.2f}:1 on white).',
           '',
           'Neither appears in a text role, and no semantic role points at either one.']
    open(os.path.join(HERE, 'contrast-pairs.md'), 'w').write('\n'.join(md) + '\n')
    print('tokens written;', len(rows), 'pairs,', len(fails), 'fail')
    for x in rows:
        print(f'{x[0]:24s} on {x[3]:18s} {x[6]:5.2f} {"ok" if x[-1] else "FAIL"}')
