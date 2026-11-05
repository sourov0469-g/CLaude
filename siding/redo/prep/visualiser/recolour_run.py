import sys, json, numpy as np
from PIL import Image
from vlib import *
S='/tmp/claude-0/-home-user-CLaude/a0d00027-7873-5f85-99e1-904cc4a5c13d/scratchpad/'
n=sys.argv[1]; lref_group=sys.argv[2] if len(sys.argv)>2 else None
img=np.asarray(Image.open(f'/home/user/CLaude/siding/work/dl/photo{n}-1400.webp').convert('RGB')); H,W=img.shape[:2]
m=np.load(S+f'mask{n}.npy')
polys=mask_to_polys(m, eps=0.9, minarea=80)
js=json.dumps({'w':W,'h':H,'photo':int(n),'fill':'evenodd','polys':polys},separators=(',',':'))
open(f'mask-photo{n}.json','w').write(js); print('json bytes',len(js),'polys',len(polys),'pts',sum(len(p) for p in polys))
m2=polys_to_mask((W,H),polys); print('raster-vs-poly mismatch px',int((m2^m).sum()),'of',int(m.sum()))
Y=0.2126*img[...,0]+0.7152*img[...,1]+0.0722*img[...,2]
lref=float(np.percentile(Y[m2],60)) if lref_group is None else float(np.percentile(Y[np.load(S+f'maskref{n}.npy')],60))
print('Lref',lref)
CP={'Arctic White':'#E0E0D8','Khaki Brown':'#A28F7D','Boothbay Blue':'#778184','Deep Ocean':'#49545C'}
for name,hx in CP.items():
    out=recolour(img,m2,hx,lref,hi=0.5,feather=1)
    pair=Image.new('RGB',(1400,525)); pair.paste(Image.fromarray(img).resize((700,525),Image.LANCZOS),(0,0)); pair.paste(Image.fromarray(out).resize((700,525),Image.LANCZOS),(700,0))
    pair.save(f'preview-photo{n}-'+name.lower().replace(' ','-')+'.png')
    Image.fromarray(out).save(S+f'w/full{n}-'+name.lower().replace(' ','-')+'.png')
