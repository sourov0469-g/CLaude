import numpy as np
# photo 41 (1400x1050), Maple Run, Nov 2024. One hand-traced outer polygon for the lit lap-siding face
# (corner board included); the colour rule then drops white trim, glass, grey gutter/porch roof, sky, leaves.
W_OUT=[(126,24),(164,28),(164,88),(300,116),(500,172),(700,232),(1092,336),(1099,386),
       (770,306),(540,420),(487,450),(546,456),(546,752),(112,828),(112,600)]
def rule(a):
    r,g,b=a[...,0],a[...,1],a[...,2]
    Y=0.2126*r+0.7152*g+0.0722*b
    return (r-b>=18)&(g-b>=8)&(r>=g-4)&(Y>=85)
GROUPS=[('W',W_OUT,[],rule)]
# shaded strips the main rule misses (Y 80-85): top of the corner board, and wall under the porch-roof corner
def rule_shade(a):
    r,g,b=a[...,0],a[...,1],a[...,2]
    Y=0.2126*r+0.7152*g+0.0722*b
    return (r-b>=25)&(g-b>=10)&(r>=g-4)&(Y>=55)
GROUPS += [('CB',[(128,24),(162,28),(162,100),(128,100)],[],rule_shade),
           ('RS',[(500,440),(546,452),(546,600),(500,600)],[],rule_shade)]
# rim fix: grow 3 px into yellow-tinted pixels (kills the 2-4 px unrecoloured halo at window casings), staying inside the wall polygon
def POST(final,a,dilate,erode):
    from vlib import poly_mask
    r,g,b=a[...,0],a[...,1],a[...,2]
    Y=0.2126*r+0.7152*g+0.0722*b
    pm=poly_mask((a.shape[1],a.shape[0]),W_OUT,[])
    grow=dilate(final,3)&pm&(r-b>=9)&(Y>=50)
    return final|grow
