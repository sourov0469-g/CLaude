"""Photo #3 trim mask (white casings, fascia, rake, soffit edge, corner details): near-white and low-saturation, not sky or cloud, not siding. Writes mask-photo3-trim.json (1400 px space)."""
import numpy as np, cv2, json, sys
from PIL import Image
from vlib import *
img=np.asarray(Image.open('/home/user/CLaude/siding/work/dl/photo3-1400.webp').convert('RGB')).astype(int); H,W=img.shape[:2]
Y=0.2126*img[...,0]+0.7152*img[...,1]+0.0722*img[...,2]; mn=img.min(-1); mx=img.max(-1)
sid=polys_to_mask((W,H),json.load(open('mask-photo3.json'))['polys'])
white=(mn>196)&((mx-mn)<34)&(Y>208)
blue=(img[...,2]>img[...,0]+22); bl=cv2.dilate(blue.astype(np.uint8),np.ones((31,31),np.uint8)).astype(bool)
# window casings: rough rectangles read off the photo (1000 px view coordinates), snapped to the real white casing by pixel test
SC=1.4
WINS=[(33,305,66,382),(128,250,175,355),(213,212,260,355),(362,128,433,318),(758,246,808,358),(836,368,886,432),(50,468,90,586),(205,462,250,595),(288,442,402,644),(733,480,766,552),(838,466,887,578)]
whiteW=(mn>165)&((mx-mn)<48)&(Y>178)
ring=np.zeros((H,W),bool)
for (x0,y0,x1,y1) in WINS:
    X0,Y0,X1,Y1=[int(v*SC) for v in (x0,y0,x1,y1)]; pad=int(11*SC); inset=int(max(4,0.09*min(X1-X0,Y1-Y0)))
    outer=np.zeros((H,W),bool); outer[max(0,Y0-pad):Y1+pad,max(0,X0-pad):X1+pad]=True
    inner=np.zeros((H,W),bool); inner[Y0+inset:Y1-inset,X0+inset:X1-inset]=True
    ring|=outer&~inner
cand=whiteW&ring
cand|=(white&~dilate(sid,2))&(np.arange(H)[:,None]<int(0.62*H))&((np.arange(W)[None,:]>int(0.44*W))&(np.arange(W)[None,:]<int(0.50*W)))   # corner board
n,lab,st,_=cv2.connectedComponentsWithStats(cand.astype(np.uint8),connectivity=8)
keep=np.zeros(n,bool)
for k in range(1,n):
    x,y,w,h,a=st[k]
    if a<70: continue
    comp=(lab==k); frac=(comp&bl).sum()/a
    if frac<0.35: keep[k]=True
m=keep[lab]
m=erode(dilate(m,1),1)
# trim must touch the house: near the siding mask (within 14 px) or a window casing
near=dilate(sid,14)
n2,lab2,st2,_=cv2.connectedComponentsWithStats(m.astype(np.uint8),connectivity=8)
out=np.zeros_like(m)
for k in range(1,n2):
    comp=lab2==k
    out|=comp
out=erode(dilate(out,1),1)
sid2=sid&~dilate(out,1)
sid2=components(sid2,120)
sp=mask_to_polys(sid2,eps=0.9,minarea=80)
open('mask-photo3-siding2.json','w').write(json.dumps({'w':W,'h':H,'photo':3,'fill':'evenodd','polys':sp},separators=(',',':')))
print('siding2 polys',len(sp))
polys=mask_to_polys(out,eps=0.9,minarea=40)
js=json.dumps({'w':W,'h':H,'photo':3,'fill':'evenodd','polys':polys},separators=(',',':')); open('mask-photo3-trim.json','w').write(js)
print('trim px',int(out.sum()),'polys',len(polys),'bytes',len(js))
o=img.copy().astype(float); o[out]=o[out]*0.2+np.array([255,0,255])*0.8
Image.fromarray(o.astype(np.uint8)).resize((1000,750)).save('/tmp/trim3.png')
