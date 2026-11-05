import numpy as np
from PIL import Image
_A=np.asarray(Image.open('/home/user/CLaude/siding/work/dl/photo36-1400.webp').convert('RGB')).astype(float)
_Y=0.2126*_A[...,0]+0.7152*_A[...,1]+0.0722*_A[...,2]
def fit(rect,pad=10,thr=64,frac=0.55,grow=1):
    """snap a rough window rectangle to the dark frame: outermost columns/rows (within rect+-pad) that are >=frac dark."""
    x0,y0,x1,y1=rect; X0,Y0,X1,Y1=x0-pad,y0-pad,x1+pad,y1+pad
    d=_Y[Y0:Y1,X0:X1]<thr
    cols=np.nonzero(d.mean(0)>frac)[0]; rows=np.nonzero(d.mean(1)>frac)[0]
    a,b=X0+cols.min()-grow,X0+cols.max()+1+grow; c,e=Y0+rows.min()-grow,Y0+rows.max()+1+grow
    return [(a,c),(b,c),(b,e),(a,e)]

LW=[(155,626),(652,632),(638,940),(122,944)]
LW_H=[fit((469,624,625,777))]
RS=[(713,655),(748,655),(748,872),(713,872)]
CH=[(752,382),(888,382),(888,885),(752,885)]
CH_H=[[(788,677),(810,677),(810,716),(788,716)]]
RW=[(890,654),(1328,654),(1328,872),(890,872)]
RW_H=[fit((901,653,1000,820)),fit((1077,660,1250,790),pad=8)]
def rule(a):
    r,g,b=a[...,0],a[...,1],a[...,2]
    Y=0.2126*r+0.7152*g+0.0722*b
    return (r>=g-3)&(g>=b+5)&(Y>=42)
def rule_soft(a):
    r,g,b=a[...,0],a[...,1],a[...,2]
    Y=0.2126*r+0.7152*g+0.0722*b
    return (r>=g)&(g>=b+4)&(Y>=60)
GROUPS=[('LW',LW,LW_H,rule),('RS',RS,[],rule_soft),('CH',CH,CH_H,rule),('RW',RW,RW_H,rule)]
