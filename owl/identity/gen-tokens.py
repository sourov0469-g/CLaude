#!/usr/bin/env python3
"""Owl Roofing identity tokens, generated from Owl's ten live colours (owl/GATE-PHASE-1a.md).
Writes tokens.json (DTCG), tokens.css (primitives -> semantic -> component, alias chains kept),
contrast-pairs.csv (measured) and type-scale.csv (Utopia clamps). Run: python3 -I gen-tokens.py"""
import json, colorsys, csv

# ---- primitives: Owl's live colours (hex as measured) + derived steps, each with the role that needs it
LIVE = {
  'paper-50':  ('#FCFBF5', 'live: page ground'),
  'cream-100': ('#F1EFE6', 'live: alternate light surface'),
  'olive-500': ('#666B53', 'live: brand primary (82 uses)'),
  'olive-700': ('#36402D', 'live: deep surface'),
  'olive-900': ('#282F21', 'live: night surface'),
  'ink-900':   ('#17121D', 'live: text + logo ink'),
  'amber-400': ('#EAA222', 'live: the one accent (logo eyes, CTA fill)'),
  'bark-800':  ('#3F3130', 'live: warm deep surface'),
  'tan-500':   ('#987861', 'live: large text and graphics only'),
  'white':     ('#FFFFFF', 'live: raised surface'),
}
def hx(h): h=h.lstrip('#'); return tuple(int(h[i:i+2],16)/255 for i in (0,2,4))
def tohex(c): return '#'+''.join(f'{round(max(0,min(1,v))*255):02X}' for v in c)
def lum(h):
  f=lambda v: v/12.92 if v<=0.03928 else ((v+0.055)/1.055)**2.4
  r,g,b=map(f,hx(h)); return 0.2126*r+0.7152*g+0.0722*b
def cr(a,b):
  la,lb=sorted((lum(a),lum(b)),reverse=True); return (la+0.05)/(lb+0.05)
def mix(a,b,t): return tohex(tuple(x*(1-t)+y*t for x,y in zip(hx(a),hx(b))))
def darken_to(h, ground, target):
  r,g,b=hx(h); H,L,S=colorsys.rgb_to_hls(r,g,b)
  while L>0:
    c=tohex(colorsys.hls_to_rgb(H,L,S))
    if cr(c,ground)>=target: return c
    L-=0.004
derived = {
  # amber held in hue, lightness lowered until it reads as TEXT on the darker light ground (cream) at >=4.6:1
  'amber-700': (darken_to(LIVE['amber-400'][0], LIVE['cream-100'][0], 4.6), 'derived: accent as TEXT on light (links, small labels); hue held'),
  'cream-200': (mix(LIVE['cream-100'][0], LIVE['olive-500'][0], 0.14), 'derived: hairline dividers on paper/cream (decorative, not a control border)'),
  'olive-300': (mix(LIVE['olive-500'][0], LIVE['cream-100'][0], 0.45), 'derived: muted text and lines on deep olive'),
}
# removed at the Phase 2 audit: olive-100 ("moss"). Measured and rendered, it could not be told apart from cream-100,
# and any darker mix pushed olive-500 text under 4.5:1. A step without a distinct role does not stay.
PRIM = {**LIVE, **derived}
P = {k:v[0] for k,v in PRIM.items()}

# ---- semantic aliases (components reference these only)
SEM = {
  'surface-page':'paper-50','surface-alt':'cream-100','surface-raised':'white',
  'surface-deep':'olive-700','surface-night':'olive-900','surface-bark':'bark-800','surface-ink':'ink-900',
  'text-primary':'ink-900','text-muted':'olive-500','text-on-deep':'cream-100','text-on-deep-muted':'olive-300',
  'accent-fill':'amber-400','accent-on-fill':'ink-900','accent-text':'amber-700','accent-text-on-deep':'amber-400',
  'line-hairline':'cream-200','line-control':'olive-500','line-on-deep':'olive-300',
  'focus-ring':'ink-900','focus-ring-on-deep':'amber-400','graphic-warm':'tan-500',
}
# ---- component tokens (reference semantic tokens)
COMP = {
  'button-primary-bg':'accent-fill','button-primary-fg':'accent-on-fill','button-primary-border':'text-primary',
  'button-secondary-bg':'surface-page','button-secondary-fg':'text-primary','button-secondary-border':'text-primary',
  'button-on-deep-bg':'accent-fill','button-on-deep-fg':'accent-on-fill',
  'link-fg':'accent-text','link-on-deep-fg':'accent-text-on-deep',
  'field-bg':'surface-raised','field-border':'line-control','field-fg':'text-primary','field-error':'surface-bark',
  'sweep-line':'accent-fill','sweep-line-idle':'line-control','nail':'text-primary','treeline':'surface-deep',
  'callbar-bg':'surface-ink','callbar-fg':'text-on-deep','callbar-action':'accent-fill',
}

# ---- measured pairs: every text/ground pair the identity allows
PAIRS = [
  # fg, bg, minimum, use
  ('ink-900','paper-50',4.5,'body text'),('ink-900','cream-100',4.5,'body text'),('ink-900','white',4.5,'body text'),
  ('olive-500','paper-50',4.5,'muted body text'),('olive-500','cream-100',4.5,'muted body text'),('olive-500','white',4.5,'muted body text'),
  ('amber-700','paper-50',4.5,'accent text / links'),('amber-700','cream-100',4.5,'accent text / links'),('amber-700','white',4.5,'accent text / links'),
  ('ink-900','amber-400',4.5,'button label on amber'),
  ('cream-100','olive-700',4.5,'body on deep'),('cream-100','olive-900',4.5,'body on night'),('cream-100','bark-800',4.5,'body on bark'),('cream-100','ink-900',4.5,'body on ink'),('white','olive-500',4.5,'label on olive'),('cream-100','olive-500',4.5,'label on olive'),
  ('olive-300','olive-700',3.0,'muted LARGE text / lines on deep'),('olive-300','olive-900',4.5,'muted text on night'),
  ('amber-400','olive-700',4.5,'accent text on deep'),('amber-400','olive-900',4.5,'accent text on night'),('amber-400','bark-800',4.5,'accent text on bark'),('amber-400','ink-900',4.5,'accent text on ink'),
  ('tan-500','paper-50',3.0,'LARGE text / graphics only'),('tan-500','cream-100',3.0,'LARGE text / graphics only'),
  ('olive-500','paper-50',3.0,'control border (UI 3:1)'),('olive-500','white',3.0,'control border (UI 3:1)'),
  ('ink-900','paper-50',3.0,'focus ring on light'),('amber-400','olive-700',3.0,'focus ring on deep'),
  # banned pairs, measured so the ban is evidence, not argument
  ('amber-400','paper-50',4.5,'BANNED: amber text on light'),('amber-400','cream-100',4.5,'BANNED: amber text on light'),('white','amber-400',4.5,'BANNED: white on amber'),('tan-500','paper-50',4.5,'BANNED: tan body text'),
]

# ---- type: Utopia method, poles 360/1240, base 18->20, ratio 1.2->1.25, rem term in every clamp
MINV,MAXV=360,1240
def clamp(mn,mx):
  slope=(mx-mn)/(MAXV-MINV); icpt=mn-slope*MINV
  return f"clamp({mn/16:.4f}rem, {icpt/16:.4f}rem + {slope*100:.4f}vw, {mx/16:.4f}rem)"
STEPS={}
for s in range(-1,6):
  mn=18*1.2**s; mx=20*1.25**s; STEPS[s]=(mn,mx)
TYPE = {  # role: step, family, weight, line-height, tracking
  'display':(5,'display',800,1.1,'-0.02em'),'title':(4,'display',800,1.1,'-0.015em'),'heading':(3,'display',700,1.2,'-0.01em'),
  'subheading':(1,'display',700,1.3,'0'),'body':(0,'body',400,1.55,'0'),'small':(-1,'body',400,1.5,'0'),
  'label':(-1,'display',700,1.2,'0.08em'),
}
SPACE=[2,4,8,12,16,24,32,40,48,64,80,96,160]
RHYTHM={'section-minor':(48,64),'section-default':(64,96),'section-hero':(96,144)}
MOTION={
 'duration':{'instant':80,'fast':160,'normal':240,'slow':480,'story':900},
 'easing':{'out':'cubic-bezier(0.23, 1, 0.32, 1)','travel':'cubic-bezier(0.77, 0, 0.175, 1)','in':'cubic-bezier(0.55, 0, 1, 0.45)','linear':'linear'},
 'stagger':40,
 'blink':{'close':110,'hold':40,'open':190,'scaleY':0.08},'glance':{'glide':480,'hold':1200,'max-px':1},
 'press':{'scale':0.97,'in':100,'out':220},
}
RADIUS={'none':0,'s':6,'m':10,'pill':999}
SHADOW={'raised':'0 2px 5px 0 rgb(23 18 29 / 0.15)','lifted':'0 12px 28px -12px rgb(23 18 29 / 0.28)'}
FONTS={'display':'"Montserrat", system-ui, sans-serif','body':'"Lato", system-ui, sans-serif'}

# ================= write files
rows=[]
for fg,bg,mn,use in PAIRS:
  r=cr(P[fg],P[bg]); banned=use.startswith('BANNED')
  ok = (r>=mn)
  verdict = ('confirmed banned' if not ok else 'PASSES - ban is a design choice') if banned else ('pass' if ok else 'FAIL')
  rows.append((f'{fg} on {bg}',P[fg],P[bg],f'{r:.2f}',mn,verdict,use))
with open('contrast-pairs.csv','w',newline='') as f:
  w=csv.writer(f); w.writerow(['pair','fg','bg','measured_ratio','minimum','result','use']); w.writerows(rows)

with open('type-scale.csv','w',newline='') as f:
  w=csv.writer(f); w.writerow(['role','step','min_px@360','max_px@1240','clamp','family','weight','line_height','tracking'])
  for role,(s,fam,wt,lh,tr) in TYPE.items():
    mn,mx=STEPS[s]; w.writerow([role,s,f'{mn:.1f}',f'{mx:.1f}',clamp(mn,mx),fam,wt,lh,tr])

dtcg={'$description':'Owl Roofing identity tokens. DTCG format, dialect: W3C Design Tokens Community Group draft 2025.10 (values in object form for color and dimension). Generated by gen-tokens.py from Owl\'s live colours.',
 'color':{'primitive':{k:{'$type':'color','$value':{'colorSpace':'srgb','hex':v[0]},'$description':v[1]} for k,v in PRIM.items()},
          'semantic':{k:{'$type':'color','$value':'{color.primitive.'+v+'}'} for k,v in SEM.items()},
          'component':{k:{'$type':'color','$value':'{color.semantic.'+v+'}'} for k,v in COMP.items()}},
 'space':{str(v):{'$type':'dimension','$value':{'value':v,'unit':'px'}} for v in SPACE},
 'rhythm':{k:{'$type':'dimension','$value':{'min':{'value':a,'unit':'px'},'max':{'value':b,'unit':'px'}},'$description':'fluid 360->1240'} for k,(a,b) in RHYTHM.items()},
 'font':{'family':{k:{'$type':'fontFamily','$value':v} for k,v in FONTS.items()},
         'role':{role:{'$type':'typography','$value':{'fontFamily':'{font.family.'+fam+'}','fontWeight':wt,'lineHeight':lh,'letterSpacing':tr,
                 'fontSize':{'min':{'value':round(STEPS[s][0],2),'unit':'px'},'max':{'value':round(STEPS[s][1],2),'unit':'px'}}}} for role,(s,fam,wt,lh,tr) in TYPE.items()}},
 'radius':{k:{'$type':'dimension','$value':{'value':v,'unit':'px'}} for k,v in RADIUS.items()},
 'shadow':{k:{'$type':'shadow','$value':v} for k,v in SHADOW.items()},
 'motion':{'duration':{k:{'$type':'duration','$value':{'value':v,'unit':'ms'}} for k,v in MOTION['duration'].items()},
           'easing':{k:{'$type':'cubicBezier' if k!='linear' else 'string','$value':v} for k,v in MOTION['easing'].items()},
           'stagger':{'$type':'duration','$value':{'value':MOTION['stagger'],'unit':'ms'}},
           'blink':{'$type':'object','$value':MOTION['blink']},'glance':{'$type':'object','$value':MOTION['glance']},'press':{'$type':'object','$value':MOTION['press']}},
}
json.dump(dtcg,open('tokens.json','w'),indent=2)

L=['/* Owl Roofing identity tokens. GENERATED by gen-tokens.py, do not hand-edit.',
   '   Tiers: primitives (named by hue) -> semantic (named by role) -> component. Components use semantic tokens only. */',
   ':root{','  /* primitives: Owl\'s live colours + derived steps (see tokens.json for each step\'s reason) */']
L+= [f'  --owl-{k}: {v[0]};' for k,v in PRIM.items()]
L+= ['  /* semantic */']+[f'  --{k}: var(--owl-{v});' for k,v in SEM.items()]
L+= ['  /* component */']+[f'  --{k}: var(--{v});' for k,v in COMP.items()]
L+= ['  /* type */']+[f'  --font-{k}: {v};' for k,v in FONTS.items()]
L+= [f'  --step-{s if s>=0 else "m"+str(-s)}: {clamp(*STEPS[s])};' for s in STEPS]
for role,(s,fam,wt,lh,tr) in TYPE.items():
  st=f'var(--step-{s if s>=0 else "m"+str(-s)})'
  L.append(f'  --type-{role}: {wt} {st}/{lh} var(--font-{fam}); --track-{role}: {tr};')
L+= ['  /* space: Carbon ladder (px). Off-ladder values are defects. */']+[f'  --space-{v}: {v/16:g}rem;' for v in SPACE]
L+= [f'  --{k}: {clamp(a,b)};' for k,(a,b) in RHYTHM.items()]
L+= ['  --measure: 66ch;  --container: 75rem;  --gutter: var(--space-16);']
L+= ['  /* radius + shadow (from Owl\'s live CSS: 6/10px radii, 50px pills, one soft shadow) */']+[f'  --radius-{k}: {v}px;' for k,v in RADIUS.items()]+[f'  --shadow-{k}: {v};' for k,v in SHADOW.items()]
L+= ['  /* motion */']+[f'  --dur-{k}: {v}ms;' for k,v in MOTION['duration'].items()]+[f'  --ease-{k}: {v};' for k,v in MOTION['easing'].items()]
L+= [f'  --stagger: {MOTION["stagger"]}ms;',f'  --blink-close: {MOTION["blink"]["close"]}ms; --blink-hold: {MOTION["blink"]["hold"]}ms; --blink-open: {MOTION["blink"]["open"]}ms;',
     f'  --press-scale: {MOTION["press"]["scale"]}; --press-in: {MOTION["press"]["in"]}ms; --press-out: {MOTION["press"]["out"]}ms;','}',
     '@media (prefers-reduced-motion: reduce){:root{--dur-fast:0ms;--dur-normal:0ms;--dur-slow:0ms;--dur-story:0ms;--stagger:0ms}}']
open('tokens.css','w').write('\n'.join(L)+'\n')

print('derived:',{k:v[0] for k,v in derived.items()})
for r in rows: print(f'{r[0]:28} {r[3]:>6} min {r[4]}  {r[5]}')
for role,(s,*_ ) in TYPE.items(): print(role, f'{STEPS[s][0]:.1f}->{STEPS[s][1]:.1f}px', f'ratio {STEPS[s][1]/STEPS[s][0]:.2f}')
