"""Photo #36 window-frame (trim) mask: the dark-brown frames around the three windows, traced as the ring between the outer
frame edge (the same fitted rectangles the siding mask uses as holes) and the white sash inside. Writes mask-photo36-trim.json."""
import json, numpy as np
from PIL import Image
from vlib import *
import spec36
S='/tmp/claude-0/-home-user-CLaude/a0d00027-7873-5f85-99e1-904cc4a5c13d/scratchpad/'
img=np.asarray(Image.open('/home/user/CLaude/siding/work/dl/photo36-1400.webp').convert('RGB')).astype(int); H,W=img.shape[:2]
r,g,b=img[...,0],img[...,1],img[...,2]; Y=0.2126*r+0.7152*g+0.0722*b
bright=(Y>175)&(abs(r-b)<45); dark=Y<88
outers=[spec36.LW_H[0],spec36.RW_H[0],spec36.RW_H[1]]
SASH=[(484,636,613,762),(910,663,993,811),(1085,667,1241,783)]; SASH_DONE=[]  # the white sash outline inside each frame, read off the photo
m=np.zeros((H,W),bool)
for o in outers:
    pm=poly_mask((W,H),o,[]); xs=[p[0] for p in o]; ys=[p[1] for p in o]
    x0,x1,y0,y1=int(min(xs)),int(max(xs)),int(min(ys)),int(max(ys))
    a,c,b2,d=SASH[len(SASH_DONE)]; SASH_DONE.append(1)
    print('outer',(x0,y0,x1,y1),'sash',(a,c,b2,d))
    ring=pm&dark; ring[c:d,a:b2]=False
    m|=ring
m=erode(dilate(m,1),1); m=components(m,120)
polys=mask_to_polys(m,eps=0.9,minarea=40)
js=json.dumps({'w':W,'h':H,'photo':36,'fill':'evenodd','polys':polys},separators=(',',':')); open('mask-photo36-trim.json','w').write(js)
print('px',int(m.sum()),'polys',len(polys),'bytes',len(js)); np.save(S+'trim36.npy',m)
o=img.copy().astype(float); o[m]=o[m]*0.3+np.array([255,0,255])*0.7
for (x0,y0,x1,y1) in [(440,600,660,800),(880,640,1020,840),(1050,640,1270,810)]:
    pass
Image.fromarray(o.astype(np.uint8)).save(S+'w/trimov36.png')
Image.fromarray(o.astype(np.uint8)).crop((440,600,1280,840)).save(S+'w/trimov36c.png')
