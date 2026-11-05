"""V2: mask JSON + JPEG previews for photo N (default 41). Usage: python3 recolour_v2.py 41
Needs the .npy mask written by build.py N into the session scratchpad."""
import sys, json, numpy as np
from PIL import Image, ImageDraw
from vlib import *
S='/tmp/claude-0/-home-user-CLaude/a0d00027-7873-5f85-99e1-904cc4a5c13d/scratchpad/'
n=sys.argv[1] if len(sys.argv)>1 else '41'
img=np.asarray(Image.open(f'/home/user/CLaude/siding/work/dl/photo{n}-1400.webp').convert('RGB')); H,W=img.shape[:2]
m=np.load(S+f'mask{n}.npy')
polys=mask_to_polys(m, eps=0.9, minarea=80)
js=json.dumps({'w':W,'h':H,'photo':int(n),'fill':'evenodd','polys':polys},separators=(',',':'))
open(f'mask-photo{n}.json','w').write(js)
print('json bytes',len(js),'polys',len(polys),'pts',sum(len(p) for p in polys))
m2=polys_to_mask((W,H),polys); print('raster-vs-poly mismatch px',int((m2^m).sum()),'of',int(m.sum()))
Y=0.2126*img[...,0]+0.7152*img[...,1]+0.0722*img[...,2]
lref=float(np.percentile(Y[m2],60)); print('Lref',lref)
CP=[['Arctic White','#E0E0D8'],['Cobble Stone','#C6BEB0'],['Navajo Beige','#D5C9B2'],['Khaki Brown','#A28F7D'],['Timber Bark','#7B7064'],
['Rich Espresso','#5F5A55'],['Mountain Sage','#706F5E'],['Light Mist','#B6BAB5'],['Pearl Gray','#B2AEA9'],['Gray Slate','#898A87'],['Boothbay Blue','#778184'],
['Evening Blue','#5F696D'],['Deep Ocean','#49545C'],['Aged Pewter','#7D7974'],['Night Gray','#6A6D6F'],['Iron Gray','#575B59'],['Countrylane Red','#714D47']]
outs={}
for name,hx in CP: outs[name]=recolour(img,m2,hx,lref,hi=0.5,feather=1)
# sheet: original + 17 colours, 6 cols x 3 rows, 440x330 tiles
tw,th=440,330; cols=6; tiles=[('Original (as photographed)',img)]+[(f'{k}  {dict(CP)[k]}',v) for k,v in outs.items()]
rows=(len(tiles)+cols-1)//cols; sh=Image.new('RGB',(cols*tw,rows*th),(250,250,248))
for i,(lab,arr) in enumerate(tiles):
    t=Image.fromarray(arr).resize((tw,th),Image.LANCZOS); d=ImageDraw.Draw(t); d.rectangle([0,th-20,tw,th],fill=(20,20,20)); d.text((6,th-16),lab,fill=(255,255,255))
    sh.paste(t,((i%cols)*tw,(i//cols)*th))
sh.save(f'preview-photo{n}-all17.jpg',quality=72,optimize=True,progressive=True)
for name in ['Arctic White','Deep Ocean','Khaki Brown']:
    pair=Image.new('RGB',(1400,525)); pair.paste(Image.fromarray(img).resize((700,525),Image.LANCZOS),(0,0)); pair.paste(Image.fromarray(outs[name]).resize((700,525),Image.LANCZOS),(700,0))
    pair.save(f'preview-photo{n}-'+name.lower().replace(' ','-')+'.jpg',quality=78,optimize=True)
# 1:1 crops for QA (not shipped): Deep Ocean + Arctic White
for name in ['Deep Ocean','Arctic White','Countrylane Red']:
    Image.fromarray(outs[name]).save(S+f'w2/full{n}-'+name.lower().replace(' ','-')+'.png')
