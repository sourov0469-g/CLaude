import sys, json, importlib, numpy as np
from PIL import Image, ImageDraw
from vlib import *
n=sys.argv[1]; spec=importlib.import_module('spec'+n)
S='/tmp/claude-0/-home-user-CLaude/a0d00027-7873-5f85-99e1-904cc4a5c13d/scratchpad/'
img=np.asarray(Image.open(f'/home/user/CLaude/siding/work/dl/photo{n}-1400.webp').convert('RGB')); H,W=img.shape[:2]
final=np.zeros((H,W),bool); per={}
for name,out,holes,rule in spec.GROUPS:
    pm=poly_mask((W,H),out,holes); m=pm&rule(img.astype(int))
    m=erode(dilate(m,2),2)          # close thin dark board lines / specks
    m=erode(m,1)&pm                  # 1px inset: no edge halo
    m=components(m,150)
    per[name]=m; final|=m
if hasattr(spec,'POST'): final=spec.POST(final,img.astype(int),dilate,erode)
np.save(S+f'mask{n}.npy',final)
print(n,'mask px',final.sum(),'pct',round(100*final.mean(),1),{k:int(v.sum()) for k,v in per.items()})
ov=Image.fromarray(img).convert('RGB'); a=np.asarray(ov).astype(float)
edge=final&~erode(final,1); a[edge]=[255,0,0]; a[final&~edge]=a[final&~edge]*0.75+np.array([0,60,60])*0.25
Image.fromarray(a.astype(np.uint8)).save(S+f'w/ov{n}.png')
