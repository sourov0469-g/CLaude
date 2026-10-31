#!/usr/bin/env python3
"""REBRAND QA round 1 fixes [S1497 palette coherence + semantic use, S1435 isolation inflation, S0071 one filled action]:
non-interactive surfaces that inherited the action fill go neutral or to the subtle accent; large drawing areas go to the
wash; text on them returns to the text colour. Each edit names one presented rule by its exact selector."""
import sys, re
sys.path.insert(0, 'tools'); import rebrand as rb
SOLID = 'var(--color-accent-solid)'; ONACC = 'color: var(--color-text-on-accent)'
E = [  # (section, exact selector, [(old, new), ...])
 ('hero', '.hpx__name::before', [(SOLID, 'var(--color-art-line-soft)')]),
 ('hero', '.hst__mid path', [('var(--color-art-accent-soft)', 'var(--color-art-wash)')]),
 ('proof', '.psx__t::before', [(SOLID, 'var(--color-art-line-soft)')]),
 ('proof', '.ppw__pair .ln', [(SOLID, 'var(--color-border-strong)')]),
 ('proof', '.phh__art .shell', [('var(--color-art-accent)', 'var(--color-art-wash)')]),
 ('services', '.slx__stage', [(SOLID, 'var(--color-bg-subtle)'), (ONACC, 'color: var(--color-text)')]),
 ('services', '.s2x__frame', [(SOLID, 'var(--color-bg-muted)'), (ONACC, 'color: var(--color-text)')]),
 ('services', '.s2x__tb', [(SOLID, 'var(--color-surface)'), (ONACC, 'color: var(--color-text)')]),
 ('services', '.s3x__row::before', [(SOLID, 'var(--color-art-line-soft)')]),
 ('services', '.s3x__tags span::before', [(SOLID, 'var(--color-art-line-soft)')]),
 ('services', '.sfn__pin', [(SOLID, 'var(--color-art-accent)')]),
 ('services', '.stc__chest', [(SOLID, 'var(--color-bg-muted)'), (ONACC, 'color: var(--color-text)')]),
 ('services', '.sdb__bar', [(SOLID, 'var(--color-bg-muted)'), (ONACC, 'color: var(--color-text)')]),
 ('services', '.s3x__board .hb', [('var(--color-art-accent-soft)', 'var(--color-art-wash)')]),
 ('services', '.shc__art .roof', [('var(--color-art-accent)', 'var(--color-art-wash)')]),
 ('services', '.m-pipe .t', [('var(--color-art-accent-soft)', 'var(--color-art-wash)')]),
 ('services', '.m-stud .t', [('var(--color-art-accent-soft)', 'var(--color-art-wash)')]),
 ('services', '.m-frame .t', [('var(--color-art-accent-soft)', 'var(--color-art-wash)')]),
 ('ba', '.bsx__tag--a', [(SOLID, 'var(--color-accent-subtle)'), (ONACC, 'color: var(--color-text)')]),
 ('ba', '.bsx__tape', [(SOLID, 'var(--color-bg-muted)'), (ONACC, 'color: var(--color-text)')]),
 ('ba', '.b3x__state.is-after', [(SOLID, 'var(--color-accent-subtle)'), (ONACC, 'color: var(--color-text)')]),
 ('ba', '.bbl__rail', [(SOLID, 'var(--color-bg-muted)'), (ONACC, 'color: var(--color-text)')]),
 ('process', '.p3x__art', [('var(--color-art-accent)', 'var(--color-bg-muted)')]),
 ('process', '.p3x__art .f', [('var(--color-art-accent)', 'var(--color-art-wash)')]),
 ('process', '.pdl__svg .face', [('var(--color-art-accent)', 'var(--color-art-wash)')]),
 ('process', '.p2x__svg .soil rect', [('var(--color-art-accent-soft)', 'var(--color-art-fill)')]),
 ('financing', '.frx__l::before', [(SOLID, 'var(--color-art-line-soft)')]),
 ('financing', '.frd__base', [(SOLID, 'var(--color-bg-muted)'), (ONACC, 'color: var(--color-text)')]),
 ('work', '.wfb__tab', [(SOLID, 'var(--color-surface)'), (ONACC, 'color: var(--color-text)')]),
 ('reviews', '.rsf__board', [(SOLID, 'var(--color-bg-muted)'), (ONACC, 'color: var(--color-text)')]),
 ('reviews', '.rtg__face--a', [(SOLID, 'var(--color-accent-subtle)'), (ONACC, 'color: var(--color-text)')]),
 ('reviews', '.r3x__svg .bezel', [('var(--color-art-accent)', 'var(--color-art-fill)')]),
 ('reviews', '.rpr__svg .paint', [('var(--color-art-accent)', 'var(--color-art-wash)')]),
 ('towns', '.tns__p.is-cty .tns__plate', [(SOLID, 'var(--color-bg-muted)'), (ONACC, 'color: var(--color-text)')]),
 ('towns', '.tlb__board .wood', [('var(--color-art-accent-soft)', 'var(--color-art-wash)')]),
 ('consult', '.c-done', [(SOLID, 'var(--color-accent-subtle)'), (ONACC, 'color: var(--color-text)')]),
 ('kitchen-intro', '.ki3__door::after', [(SOLID, 'var(--color-art-line-soft)')]),
 ('kitchen-scope', '.ks2__out', [(SOLID, 'var(--color-bg-subtle)'), (ONACC, 'color: var(--color-text)')]),
 ('kitchen-scope', '.ks3__wont li::before', [(SOLID, 'var(--color-art-line-soft)')]),
 ('kitchen-scope', '.ks5__front i', [(SOLID, 'var(--color-art-line-soft)')]),
 ('bath-intro', '.bi5__b', [(SOLID, 'var(--color-surface)'), (ONACC, 'color: var(--color-text)')]),
 ('bath-build', '.bb2__permits li', [(SOLID, 'var(--color-bg-muted)'), (ONACC, 'color: var(--color-text)')]),
 ('reno-intro', '.ri4__n', [(SOLID, 'var(--color-surface)'), (ONACC, 'color: var(--color-text)')]),
 ('contact-visit', '.vs5__sw', [(SOLID, 'var(--color-art-accent)')]),
 ('contact-area', '.sa5__set > span + span::before', [(SOLID, 'var(--color-art-line-soft)')]),
]
done = 0
for sec, selx, reps in E:
    vis, bk = rb.prefixes(sec)
    if sec in rb.INNER: bk = {p + 'r' for p in vis}
    p = 'css/sections/%s.css' % sec; t = rb.R(p); hit = 0
    for sel, a, b, k, m in sorted(rb.css_rules(t), key=lambda x: -x[1]):
        if k != 'rule' or sel.strip() != selx or rb.rule_owner(sel, bk) != 'presented': continue
        body = t[a:b]; nb = body
        for o, n in reps: nb = nb.replace(o, n)
        if nb != body: t = t[:a] + nb + t[b:]; hit += 1
    rb.W(p, t); done += hit
    if not hit: print('NO MATCH', sec, selx)
print('rules edited', done)
