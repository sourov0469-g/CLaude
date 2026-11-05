import numpy as np, cv2, sys
from PIL import Image
def sky_matte(path, y_limit=None, t0=24., t1=70.):
    img=np.asarray(Image.open(path).convert('RGB')).astype(np.float32); H,W=img.shape[:2]
    Y=0.2126*img[...,0]+0.7152*img[...,1]+0.0722*img[...,2]
    # 1) confident sky: bright, low local texture, connected to the top edge
    blur=cv2.GaussianBlur(Y,(0,0),2); gx=cv2.Sobel(blur,cv2.CV_32F,1,0); gy=cv2.Sobel(blur,cv2.CV_32F,0,1); g=np.hypot(gx,gy)
    cand=((Y>150)&(g<14)).astype(np.uint8)
    n,lab=cv2.connectedComponents(cand,connectivity=4)
    top=set(np.unique(lab[0:3,:]))-{0}; sky=np.isin(lab,list(top))
    sky=cv2.erode(sky.astype(np.uint8),np.ones((5,5),np.uint8)).astype(bool)
    # 2) local sky colour by normalised convolution
    w=sky.astype(np.float32); S=np.zeros_like(img)
    for c in range(3): S[...,c]=cv2.GaussianBlur(img[...,c]*w,(0,0),60)/np.maximum(cv2.GaussianBlur(w,(0,0),60),1e-3)
    # where there is no sky nearby the estimate is unreliable: fall back to global median
    cover=cv2.GaussianBlur(w,(0,0),60); med=np.median(img[sky],axis=0); S=np.where(cover[...,None]>0.02,S,med)
    d=np.sqrt(((img-S)**2).sum(-1))
    a=np.clip((d-t0)/(t1-t0),0,1)
    return img,sky,S,d,a
if __name__=='__main__':
    p=sys.argv[1]; img,sky,S,d,a=sky_matte(p)
    Image.fromarray((a*255).astype(np.uint8)).save(sys.argv[2]); print(a.mean())
