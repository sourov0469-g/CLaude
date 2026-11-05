# WCAG 2.x contrast for every text/UI pair of the four muted palettes (the roles the reset page uses)
import json
def lum(h):
    h=h.lstrip('#'); c=[int(h[i:i+2],16)/255 for i in (0,2,4)]
    c=[x/12.92 if x<=.03928 else ((x+.055)/1.055)**2.4 for x in c]; return .2126*c[0]+.7152*c[1]+.0722*c[2]
def cr(a,b):
    la,lb=sorted([lum(a),lum(b)],reverse=True); return (la+.05)/(lb+.05)
P={
 'shingle':dict(name='Shingle Slate',ground='#F4F4F1',surface='#FBFBF9',wash='#E7EAEB',ink='#22282E',ink70='#4F5861',ink50='#7D858C',acc='#43586A',onacc='#FFFFFF',call='#96622F',oncall='#FFFFFF',deep='#1E252C',ondeep='#F1F2EF',ondeep70='#B8C0C7',accdeep='#D2A77D'),
 'navy':dict(name='North Navy',ground='#F1F3F5',surface='#FAFBFC',wash='#E2E7EC',ink='#17263E',ink70='#46546A',ink50='#7A8698',acc='#1E3A5F',onacc='#FFFFFF',call='#8C5A2E',oncall='#FFFFFF',deep='#132036',ondeep='#EEF1F5',ondeep70='#B3BDCB',accdeep='#D6AB82'),
 'hearth':dict(name='Hearth Charcoal',ground='#F5F1EA',surface='#FBF9F5',wash='#E9E2D6',ink='#2A251F',ink70='#5A5249',ink50='#8A8178',acc='#4A4239',onacc='#FFFFFF',call='#7C5A24',oncall='#FFFFFF',deep='#24201B',ondeep='#F4EFE7',ondeep70='#C4BAAD',accdeep='#D2B07A'),
 'stone':dict(name='Storm Stone',ground='#F3F1EC',surface='#FAF9F6',wash='#E5E0D6',ink='#26282B',ink70='#55575B',ink50='#86878A',acc='#47617C',onacc='#FFFFFF',call='#47617C',oncall='#FFFFFF',deep='#222529',ondeep='#F2F1ED',ondeep70='#BCBEC1',accdeep='#A9BED3'),
}
pairs=[('ink','ground','body text'),('ink','surface','text on cards'),('ink','wash','text on wash panels'),('ink70','ground','secondary text'),('ink70','surface','secondary text on cards'),('acc','ground','accent text / links'),('onacc','acc','text on primary buttons'),('oncall','call','text on the call button'),('call','ground','call colour as text'),('ondeep','deep','text on dark bands'),('ondeep70','deep','secondary text on dark bands'),('accdeep','deep','accent words on dark bands'),('ink50','ground','UI lines/markers (3:1)')]
out={}
for k,p in P.items():
    rows=[]
    for a,b,role in pairs:
        r=cr(p[a],p[b]); need=3 if '3:1' in role else 4.5; rows.append((role,p[a],p[b],round(r,2),'PASS' if r>=need else 'FAIL'))
    out[k]=rows
    print('==',p['name']); [print('  %-30s %s on %s  %5.2f:1  %s'%r) for r in rows]
json.dump({'palettes':P,'pairs':out},open('palettes.json','w'),indent=1)
