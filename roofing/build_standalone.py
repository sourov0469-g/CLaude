import base64, re, os, sys

SRC = 'index.html'
OUT = 'ridgewell-roofing.html'
IMG = 'assets/img'
FNT = 'assets/fonts'

s = open(SRC, encoding='utf-8').read()

def b64(path):
    return base64.b64encode(open(path,'rb').read()).decode('ascii')

# ---------------------------------------------------------------- 1. FONTS
for name in ['playfair-latin','playfair-latin-ext','sourcesans3-latin',
             'sourcesans3-latin-ext','inter-latin','inter-latin-ext']:
    url = f'url(assets/fonts/{name}.woff2) format("woff2")'
    assert url in s, 'font url missing: '+name
    s = s.replace(url, f'url(data:font/woff2;base64,{b64(f"{FNT}/{name}.woff2")}) format("woff2")')

# ------------------------------------------------- 3. photos -> data URIs
MIME = {'jpg':'image/jpeg','webp':'image/webp','png':'image/png'}
for m in sorted(set(re.findall(r'assets/img/([\w\-.]+\.(?:jpg|webp|png))', s))):
    path = os.path.join(IMG, m)
    assert os.path.exists(path), 'missing asset: '+path
    s = s.replace('assets/img/'+m, f'data:{MIME[m.rsplit(".",1)[1]]};base64,'+b64(path))

leftover = re.findall(r'assets/(?:img|fonts)/[\w\-.]+', s)
assert not leftover, 'unreplaced asset refs: '+str(set(leftover))

open(OUT,'w',encoding='utf-8').write(s)
print(f'{OUT}  {os.path.getsize(OUT)/1024/1024:.2f} MB')
