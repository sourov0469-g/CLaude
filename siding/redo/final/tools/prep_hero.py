"""Hero photo prep (photo #36, 1900 x 1425 original from the firm's published job): sky matte, front cut-out layer and clean back plate.
front = the foreground (house, chimney, trees) with a true soft alpha, edge colours unmixed from the local sky; back = the photograph with
the sky filled in under the foreground edge, so front over back reproduces the original exactly while the headline sits between them."""
import numpy as np, cv2, sys, os
from PIL import Image, ImageEnhance, ImageFilter
from matte import sky_matte
SRC=sys.argv[1]; OUT=sys.argv[2]; BAND=float(sys.argv[3]); T0=float(sys.argv[4]); T1=float(sys.argv[5])
img,sky,S,d,a=sky_matte(SRC,t0=T0,t1=T1)
H,W=a.shape
fg=(a>0.5).astype(np.uint8)
n,lab,stats,_=cv2.connectedComponentsWithStats(fg,connectivity=8)
keep=np.zeros(n,bool)
for k in range(1,n):
    x,y,w,h,ar=stats[k]
    if ar>4000 or (y+h)>H*0.55: keep[k]=True
big=keep[lab]
near=cv2.dilate(big.astype(np.uint8),np.ones((7,7),np.uint8)).astype(bool)
a2=np.where(near,a,0.0)
solid=cv2.morphologyEx(big.astype(np.uint8),cv2.MORPH_CLOSE,np.ones((9,9),np.uint8))
n2,lab2=cv2.connectedComponents(1-solid,connectivity=4); sky_lab=set(np.unique(lab2[0:3,:]))
holes=~np.isin(lab2,list(sky_lab))&(solid==0); a2[holes]=1.0
a2=np.clip(a2,0,1)
# grade (gentle, real-photo): contrast, a touch of colour, light sharpening
def grade(arr):
    im=Image.fromarray(np.clip(arr,0,255).astype(np.uint8)); im=ImageEnhance.Contrast(im).enhance(1.07); im=ImageEnhance.Color(im).enhance(1.06)
    im=im.filter(ImageFilter.UnsharpMask(radius=1.4,percent=45,threshold=2)); return np.asarray(im).astype(np.float32)
al=np.clip(a2,0.02,1)[...,None]
F=np.clip((img-(1-al)*S)/al,0,255); F=np.where(a2[...,None]>0.97,img,F)
Fg=grade(F); Ig=grade(img); Sg=grade(S)
band=int(H*BAND)
plate=Ig.copy(); m=(a2>0.02)
plate[m]=Sg[m]; plate[band-24:]=Ig[band-24:]   # the plate is the original again just above the front's lower edge, so that edge is seamless
rgba=np.dstack([Fg,a2*255]).astype(np.uint8)[:band]
os.makedirs(OUT,exist_ok=True)
Image.fromarray(rgba,'RGBA').save(f'{OUT}/front.webp',quality=84,alpha_quality=100,method=6)
Image.fromarray(np.clip(plate,0,255).astype(np.uint8)).save(f'{OUT}/back.webp',quality=82,method=6)
Image.fromarray((a2*255).astype(np.uint8)).save(f'{OUT}/alpha.png')
Image.fromarray(np.clip(Ig,0,255).astype(np.uint8)).save(f'{OUT}/graded-original.jpg',quality=96)   # reference for the fidelity test (not shipped)
print({k:os.path.getsize(f'{OUT}/{k}') for k in ('front.webp','back.webp')}, (W,H), band)
