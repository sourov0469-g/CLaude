(()=>{var Ar="150";var So=0,kr=1,wo=2;var to=1,To=2,pi=3,on=0,At=1,sn=2;var an=0,Wn=1,Vr=2,Hr=3,Gr=4,Eo=5,Vn=100,Ao=101,Co=102,Wr=103,qr=104,Ro=200,Lo=201,Po=202,Do=203,no=204,io=205,Io=206,Fo=207,No=208,Oo=209,zo=210,Uo=0,Bo=1,ko=2,Ks=3,Vo=4,Ho=5,Go=6,Wo=7,so=0,qo=1,Xo=2,$t=0,Yo=1,Zo=2,Jo=3,$o=4,Ko=5,ro=300,Zn=301,Jn=302,js=303,Qs=304,us=306,vi=1e3,_t=1001,_i=1002,Ge=1003,Xr=1004;var _s=1005;var it=1006,jo=1007;var yi=1008;var bn=1009,Qo=1010,el=1011,ao=1012,tl=1013,yn=1014,Jt=1015,ln=1016,nl=1017,il=1018,qn=1020,sl=1021,xt=1023,rl=1024,al=1025,Mn=1026,$n=1027,Cr=1028,ol=1029,Rr=1030,ll=1031,cl=1033,ys=33776,Ms=33777,bs=33778,Ss=33779,Yr=35840,Zr=35841,Jr=35842,$r=35843,hl=36196,Kr=37492,jr=37496,Qr=37808,ea=37809,ta=37810,na=37811,ia=37812,sa=37813,ra=37814,aa=37815,oa=37816,la=37817,ca=37818,ha=37819,ua=37820,da=37821,ws=36492,ul=36283,fa=36284,pa=36285,ma=36286;var $i=2300,Ki=2301,Ts=2302,ga=2400,xa=2401,va=2402;var Sn=3e3,Be=3001,dl=3200,fl=3201,pl=0,ml=1;var kt="srgb",Mi="srgb-linear",oo="display-p3";var Es=7680;var gl=519,_a=35044;var ya="300 es",er=1035,cn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let i=this._listeners[e];if(i!==void 0){let s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}},rt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var As=Math.PI/180,Ma=180/Math.PI;function Ti(){let r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(rt[r&255]+rt[r>>8&255]+rt[r>>16&255]+rt[r>>24&255]+"-"+rt[e&255]+rt[e>>8&255]+"-"+rt[e>>16&15|64]+rt[e>>24&255]+"-"+rt[t&63|128]+rt[t>>8&255]+"-"+rt[t>>16&255]+rt[t>>24&255]+rt[n&255]+rt[n>>8&255]+rt[n>>16&255]+rt[n>>24&255]).toLowerCase()}function Et(r,e,t){return Math.max(e,Math.min(t,r))}function xl(r,e){return(r%e+e)%e}function Cs(r,e,t){return(1-t)*r+t*e}function ba(r){return(r&r-1)===0&&r!==0}function vl(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Li(r,e){switch(e.constructor){case Float32Array:return r;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function St(r,e){switch(e.constructor){case Float32Array:return r;case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}var Ee=class r{constructor(e=0,t=0){r.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},vt=class r{constructor(){r.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1]}set(e,t,n,i,s,o,a,l,c){let h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],p=n[7],u=n[2],m=n[5],x=n[8],f=i[0],d=i[3],M=i[6],w=i[1],_=i[4],T=i[7],S=i[2],R=i[5],D=i[8];return s[0]=o*f+a*w+l*S,s[3]=o*d+a*_+l*R,s[6]=o*M+a*T+l*D,s[1]=c*f+h*w+p*S,s[4]=c*d+h*_+p*R,s[7]=c*M+h*T+p*D,s[2]=u*f+m*w+x*S,s[5]=u*d+m*_+x*R,s[8]=u*M+m*T+x*D,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*s*h+n*a*l+i*s*c-i*o*l}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],p=h*o-a*c,u=a*l-h*s,m=c*s-o*l,x=t*p+n*u+i*m;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);let f=1/x;return e[0]=p*f,e[1]=(i*c-h*n)*f,e[2]=(a*n-i*o)*f,e[3]=u*f,e[4]=(h*t-i*l)*f,e[5]=(i*s-a*t)*f,e[6]=m*f,e[7]=(n*l-c*t)*f,e[8]=(o*t-n*s)*f,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,a){let l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Rs.makeScale(e,t)),this}rotate(e){return this.premultiply(Rs.makeRotation(-e)),this}translate(e,t){return this.premultiply(Rs.makeTranslation(e,t)),this}makeTranslation(e,t){return this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Rs=new vt;function lo(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function ji(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}var hn=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],p=n[i+3],u=s[o+0],m=s[o+1],x=s[o+2],f=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=p;return}if(a===1){e[t+0]=u,e[t+1]=m,e[t+2]=x,e[t+3]=f;return}if(p!==f||l!==u||c!==m||h!==x){let d=1-a,M=l*u+c*m+h*x+p*f,w=M>=0?1:-1,_=1-M*M;if(_>Number.EPSILON){let S=Math.sqrt(_),R=Math.atan2(S,M*w);d=Math.sin(d*R)/S,a=Math.sin(a*R)/S}let T=a*w;if(l=l*d+u*T,c=c*d+m*T,h=h*d+x*T,p=p*d+f*T,d===1-a){let S=1/Math.sqrt(l*l+c*c+h*h+p*p);l*=S,c*=S,h*=S,p*=S}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=p}static multiplyQuaternionsFlat(e,t,n,i,s,o){let a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],p=s[o],u=s[o+1],m=s[o+2],x=s[o+3];return e[t]=a*x+h*p+l*m-c*u,e[t+1]=l*x+h*u+c*p-a*m,e[t+2]=c*x+h*m+a*u-l*p,e[t+3]=h*x-a*p-l*u-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t){let n=e._x,i=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),p=a(s/2),u=l(n/2),m=l(i/2),x=l(s/2);switch(o){case"XYZ":this._x=u*h*p+c*m*x,this._y=c*m*p-u*h*x,this._z=c*h*x+u*m*p,this._w=c*h*p-u*m*x;break;case"YXZ":this._x=u*h*p+c*m*x,this._y=c*m*p-u*h*x,this._z=c*h*x-u*m*p,this._w=c*h*p+u*m*x;break;case"ZXY":this._x=u*h*p-c*m*x,this._y=c*m*p+u*h*x,this._z=c*h*x+u*m*p,this._w=c*h*p-u*m*x;break;case"ZYX":this._x=u*h*p-c*m*x,this._y=c*m*p+u*h*x,this._z=c*h*x-u*m*p,this._w=c*h*p+u*m*x;break;case"YZX":this._x=u*h*p+c*m*x,this._y=c*m*p+u*h*x,this._z=c*h*x-u*m*p,this._w=c*h*p-u*m*x;break;case"XZY":this._x=u*h*p-c*m*x,this._y=c*m*p-u*h*x,this._z=c*h*x+u*m*p,this._w=c*h*p+u*m*x;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],p=t[10],u=n+a+p;if(u>0){let m=.5/Math.sqrt(u+1);this._w=.25/m,this._x=(h-l)*m,this._y=(s-c)*m,this._z=(o-i)*m}else if(n>a&&n>p){let m=2*Math.sqrt(1+n-a-p);this._w=(h-l)/m,this._x=.25*m,this._y=(i+o)/m,this._z=(s+c)/m}else if(a>p){let m=2*Math.sqrt(1+a-n-p);this._w=(s-c)/m,this._x=(i+o)/m,this._y=.25*m,this._z=(l+h)/m}else{let m=2*Math.sqrt(1+p-n-a);this._w=(o-i)/m,this._x=(s+c)/m,this._y=(l+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Et(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+i*c-s*l,this._y=i*h+o*l+s*a-n*c,this._z=s*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,s=this._z,o=this._w,a=o*e._w+n*e._x+i*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;let l=1-a*a;if(l<=Number.EPSILON){let m=1-t;return this._w=m*o+t*this._w,this._x=m*n+t*this._x,this._y=m*i+t*this._y,this._z=m*s+t*this._z,this.normalize(),this._onChangeCallback(),this}let c=Math.sqrt(l),h=Math.atan2(c,a),p=Math.sin((1-t)*h)/c,u=Math.sin(t*h)/c;return this._w=o*p+this._w*u,this._x=n*p+this._x*u,this._y=i*p+this._y*u,this._z=s*p+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),i=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(i),n*Math.sin(s),n*Math.cos(s),t*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},O=class r{constructor(e=0,t=0,n=0){r.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Sa.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Sa.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=l*t+o*i-a*n,h=l*n+a*t-s*i,p=l*i+s*n-o*t,u=-s*t-o*n-a*i;return this.x=c*l+u*-s+h*-a-p*-o,this.y=h*l+u*-o+p*-s-c*-a,this.z=p*l+u*-a+c*-o-h*-s,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ls.copy(this).projectOnVector(e),this.sub(Ls)}reflect(e){return this.sub(Ls.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Et(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ls=new O,Sa=new hn;function Xn(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Ps(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}var _l=new vt().fromArray([.8224621,.0331941,.0170827,.177538,.9668058,.0723974,-1e-7,1e-7,.9105199]),yl=new vt().fromArray([1.2249401,-.0420569,-.0196376,-.2249404,1.0420571,-.0786361,1e-7,0,1.0982735]),rn=new O;function Ml(r){return r.convertSRGBToLinear(),rn.set(r.r,r.g,r.b).applyMatrix3(yl),r.setRGB(rn.x,rn.y,rn.z)}function bl(r){return rn.set(r.r,r.g,r.b).applyMatrix3(_l),r.setRGB(rn.x,rn.y,rn.z).convertLinearToSRGB()}var Sl={[Mi]:r=>r,[kt]:r=>r.convertSRGBToLinear(),[oo]:Ml},wl={[Mi]:r=>r,[kt]:r=>r.convertLinearToSRGB(),[oo]:bl},pt={enabled:!1,get legacyMode(){return console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),!this.enabled},set legacyMode(r){console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),this.enabled=!r},get workingColorSpace(){return Mi},set workingColorSpace(r){console.warn("THREE.ColorManagement: .workingColorSpace is readonly.")},convert:function(r,e,t){if(this.enabled===!1||e===t||!e||!t)return r;let n=Sl[e],i=wl[t];if(n===void 0||i===void 0)throw new Error(`Unsupported color space conversion, "${e}" to "${t}".`);return i(n(r))},fromWorkingColorSpace:function(r,e){return this.convert(r,this.workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this.workingColorSpace)}},Cn,Qi=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement=="undefined")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Cn===void 0&&(Cn=ji("canvas")),Cn.width=e.width,Cn.height=e.height;let n=Cn.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Cn}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement!="undefined"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&e instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&e instanceof ImageBitmap){let t=ji("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=Xn(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Xn(t[n]/255)*255):t[n]=Xn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},es=class{constructor(e=null){this.isSource=!0,this.uuid=Ti(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(Ds(i[o].image)):s.push(Ds(i[o]))}else s=Ds(i);n.url=s}return t||(e.images[this.uuid]=n),n}};function Ds(r){return typeof HTMLImageElement!="undefined"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&r instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&r instanceof ImageBitmap?Qi.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Tl=0,yt=class r extends cn{constructor(e=r.DEFAULT_IMAGE,t=r.DEFAULT_MAPPING,n=_t,i=_t,s=it,o=yi,a=xt,l=bn,c=r.DEFAULT_ANISOTROPY,h=Sn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Tl++}),this.uuid=Ti(),this.name="",this.source=new es(e),this.mipmaps=[],this.mapping=t,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ee(0,0),this.repeat=new Ee(1,1),this.center=new Ee(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new vt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.encoding=e.encoding,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,encoding:this.encoding,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ro)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case vi:e.x=e.x-Math.floor(e.x);break;case _t:e.x=e.x<0?0:1;break;case _i:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case vi:e.y=e.y-Math.floor(e.y);break;case _t:e.y=e.y<0?0:1;break;case _i:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}};yt.DEFAULT_IMAGE=null;yt.DEFAULT_MAPPING=ro;yt.DEFAULT_ANISOTROPY=1;var st=class r{constructor(e=0,t=0,n=0,i=1){r.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s,l=e.elements,c=l[0],h=l[4],p=l[8],u=l[1],m=l[5],x=l[9],f=l[2],d=l[6],M=l[10];if(Math.abs(h-u)<.01&&Math.abs(p-f)<.01&&Math.abs(x-d)<.01){if(Math.abs(h+u)<.1&&Math.abs(p+f)<.1&&Math.abs(x+d)<.1&&Math.abs(c+m+M-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let _=(c+1)/2,T=(m+1)/2,S=(M+1)/2,R=(h+u)/4,D=(p+f)/4,v=(x+d)/4;return _>T&&_>S?_<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(_),i=R/n,s=D/n):T>S?T<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(T),n=R/i,s=v/i):S<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(S),n=D/s,i=v/s),this.set(n,i,s,t),this}let w=Math.sqrt((d-x)*(d-x)+(p-f)*(p-f)+(u-h)*(u-h));return Math.abs(w)<.001&&(w=1),this.x=(d-x)/w,this.y=(p-f)/w,this.z=(u-h)/w,this.w=Math.acos((c+m+M-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},ct=class extends cn{constructor(e=1,t=1,n={}){super(),this.isWebGLRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new st(0,0,e,t),this.scissorTest=!1,this.viewport=new st(0,0,e,t);let i={width:e,height:t,depth:1};this.texture=new yt(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.encoding),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.internalFormat=n.internalFormat!==void 0?n.internalFormat:null,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:it,this.depthBuffer=n.depthBuffer!==void 0?n.depthBuffer:!0,this.stencilBuffer=n.stencilBuffer!==void 0?n.stencilBuffer:!1,this.depthTexture=n.depthTexture!==void 0?n.depthTexture:null,this.samples=n.samples!==void 0?n.samples:0}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new es(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},ts=class extends yt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Ge,this.minFilter=Ge,this.wrapR=_t,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var tr=class extends yt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Ge,this.minFilter=Ge,this.wrapR=_t,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var wn=class{constructor(e=new O(1/0,1/0,1/0),t=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){let t=1/0,n=1/0,i=1/0,s=-1/0,o=-1/0,a=-1/0;for(let l=0,c=e.length;l<c;l+=3){let h=e[l],p=e[l+1],u=e[l+2];h<t&&(t=h),p<n&&(n=p),u<i&&(i=u),h>s&&(s=h),p>o&&(o=p),u>a&&(a=u)}return this.min.set(t,n,i),this.max.set(s,o,a),this}setFromBufferAttribute(e){let t=1/0,n=1/0,i=1/0,s=-1/0,o=-1/0,a=-1/0;for(let l=0,c=e.count;l<c;l++){let h=e.getX(l),p=e.getY(l),u=e.getZ(l);h<t&&(t=h),p<n&&(n=p),u<i&&(i=u),h>s&&(s=h),p>o&&(o=p),u>a&&(a=u)}return this.min.set(t,n,i),this.max.set(s,o,a),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=mn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0)if(t&&n.attributes!=null&&n.attributes.position!==void 0){let s=n.attributes.position;for(let o=0,a=s.count;o<a;o++)mn.fromBufferAttribute(s,o).applyMatrix4(e.matrixWorld),this.expandByPoint(mn)}else n.boundingBox===null&&n.computeBoundingBox(),Is.copy(n.boundingBox),Is.applyMatrix4(e.matrixWorld),this.union(Is);let i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,mn),mn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(oi),Pi.subVectors(this.max,oi),Rn.subVectors(e.a,oi),Ln.subVectors(e.b,oi),Pn.subVectors(e.c,oi),jt.subVectors(Ln,Rn),Qt.subVectors(Pn,Ln),gn.subVectors(Rn,Pn);let t=[0,-jt.z,jt.y,0,-Qt.z,Qt.y,0,-gn.z,gn.y,jt.z,0,-jt.x,Qt.z,0,-Qt.x,gn.z,0,-gn.x,-jt.y,jt.x,0,-Qt.y,Qt.x,0,-gn.y,gn.x,0];return!Fs(t,Rn,Ln,Pn,Pi)||(t=[1,0,0,0,1,0,0,0,1],!Fs(t,Rn,Ln,Pn,Pi))?!1:(Di.crossVectors(jt,Qt),t=[Di.x,Di.y,Di.z],Fs(t,Rn,Ln,Pn,Pi))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,mn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(mn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Gt[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Gt[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Gt[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Gt[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Gt[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Gt[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Gt[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Gt[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Gt),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Gt=[new O,new O,new O,new O,new O,new O,new O,new O],mn=new O,Is=new wn,Rn=new O,Ln=new O,Pn=new O,jt=new O,Qt=new O,gn=new O,oi=new O,Pi=new O,Di=new O,xn=new O;function Fs(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){xn.fromArray(r,s);let a=i.x*Math.abs(xn.x)+i.y*Math.abs(xn.y)+i.z*Math.abs(xn.z),l=e.dot(xn),c=t.dot(xn),h=n.dot(xn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var El=new wn,li=new O,Ns=new O,bi=class{constructor(e=new O,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):El.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;li.subVectors(e,this.center);let t=li.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(li,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ns.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(li.copy(e.center).add(Ns)),this.expandByPoint(li.copy(e.center).sub(Ns))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},Wt=new O,Os=new O,Ii=new O,en=new O,zs=new O,Fi=new O,Us=new O,nr=class{constructor(e=new O,t=new O(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Wt)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Wt.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Wt.copy(this.origin).addScaledVector(this.direction,t),Wt.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Os.copy(e).add(t).multiplyScalar(.5),Ii.copy(t).sub(e).normalize(),en.copy(this.origin).sub(Os);let s=e.distanceTo(t)*.5,o=-this.direction.dot(Ii),a=en.dot(this.direction),l=-en.dot(Ii),c=en.lengthSq(),h=Math.abs(1-o*o),p,u,m,x;if(h>0)if(p=o*l-a,u=o*a-l,x=s*h,p>=0)if(u>=-x)if(u<=x){let f=1/h;p*=f,u*=f,m=p*(p+o*u+2*a)+u*(o*p+u+2*l)+c}else u=s,p=Math.max(0,-(o*u+a)),m=-p*p+u*(u+2*l)+c;else u=-s,p=Math.max(0,-(o*u+a)),m=-p*p+u*(u+2*l)+c;else u<=-x?(p=Math.max(0,-(-o*s+a)),u=p>0?-s:Math.min(Math.max(-s,-l),s),m=-p*p+u*(u+2*l)+c):u<=x?(p=0,u=Math.min(Math.max(-s,-l),s),m=u*(u+2*l)+c):(p=Math.max(0,-(o*s+a)),u=p>0?s:Math.min(Math.max(-s,-l),s),m=-p*p+u*(u+2*l)+c);else u=o>0?-s:s,p=Math.max(0,-(o*u+a)),m=-p*p+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,p),i&&i.copy(Os).addScaledVector(Ii,u),m}intersectSphere(e,t){Wt.subVectors(e.center,this.origin);let n=Wt.dot(this.direction),i=Wt.dot(Wt)-n*n,s=e.radius*e.radius;if(i>s)return null;let o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,a,l,c=1/this.direction.x,h=1/this.direction.y,p=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,i=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,i=(e.min.x-u.x)*c),h>=0?(s=(e.min.y-u.y)*h,o=(e.max.y-u.y)*h):(s=(e.max.y-u.y)*h,o=(e.min.y-u.y)*h),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),p>=0?(a=(e.min.z-u.z)*p,l=(e.max.z-u.z)*p):(a=(e.max.z-u.z)*p,l=(e.min.z-u.z)*p),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Wt)!==null}intersectTriangle(e,t,n,i,s){zs.subVectors(t,e),Fi.subVectors(n,e),Us.crossVectors(zs,Fi);let o=this.direction.dot(Us),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;en.subVectors(this.origin,e);let l=a*this.direction.dot(Fi.crossVectors(en,Fi));if(l<0)return null;let c=a*this.direction.dot(zs.cross(en));if(c<0||l+c>o)return null;let h=-a*en.dot(Us);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},lt=class r{constructor(){r.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}set(e,t,n,i,s,o,a,l,c,h,p,u,m,x,f,d){let M=this.elements;return M[0]=e,M[4]=t,M[8]=n,M[12]=i,M[1]=s,M[5]=o,M[9]=a,M[13]=l,M[2]=c,M[6]=h,M[10]=p,M[14]=u,M[3]=m,M[7]=x,M[11]=f,M[15]=d,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new r().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/Dn.setFromMatrixColumn(e,0).length(),s=1/Dn.setFromMatrixColumn(e,1).length(),o=1/Dn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),p=Math.sin(s);if(e.order==="XYZ"){let u=o*h,m=o*p,x=a*h,f=a*p;t[0]=l*h,t[4]=-l*p,t[8]=c,t[1]=m+x*c,t[5]=u-f*c,t[9]=-a*l,t[2]=f-u*c,t[6]=x+m*c,t[10]=o*l}else if(e.order==="YXZ"){let u=l*h,m=l*p,x=c*h,f=c*p;t[0]=u+f*a,t[4]=x*a-m,t[8]=o*c,t[1]=o*p,t[5]=o*h,t[9]=-a,t[2]=m*a-x,t[6]=f+u*a,t[10]=o*l}else if(e.order==="ZXY"){let u=l*h,m=l*p,x=c*h,f=c*p;t[0]=u-f*a,t[4]=-o*p,t[8]=x+m*a,t[1]=m+x*a,t[5]=o*h,t[9]=f-u*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){let u=o*h,m=o*p,x=a*h,f=a*p;t[0]=l*h,t[4]=x*c-m,t[8]=u*c+f,t[1]=l*p,t[5]=f*c+u,t[9]=m*c-x,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){let u=o*l,m=o*c,x=a*l,f=a*c;t[0]=l*h,t[4]=f-u*p,t[8]=x*p+m,t[1]=p,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=m*p+x,t[10]=u-f*p}else if(e.order==="XZY"){let u=o*l,m=o*c,x=a*l,f=a*c;t[0]=l*h,t[4]=-p,t[8]=c*h,t[1]=u*p+f,t[5]=o*h,t[9]=m*p-x,t[2]=x*p-m,t[6]=a*h,t[10]=f*p+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Al,e,Cl)}lookAt(e,t,n){let i=this.elements;return wt.subVectors(e,t),wt.lengthSq()===0&&(wt.z=1),wt.normalize(),tn.crossVectors(n,wt),tn.lengthSq()===0&&(Math.abs(n.z)===1?wt.x+=1e-4:wt.z+=1e-4,wt.normalize(),tn.crossVectors(n,wt)),tn.normalize(),Ni.crossVectors(wt,tn),i[0]=tn.x,i[4]=Ni.x,i[8]=wt.x,i[1]=tn.y,i[5]=Ni.y,i[9]=wt.y,i[2]=tn.z,i[6]=Ni.z,i[10]=wt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],p=n[5],u=n[9],m=n[13],x=n[2],f=n[6],d=n[10],M=n[14],w=n[3],_=n[7],T=n[11],S=n[15],R=i[0],D=i[4],v=i[8],E=i[12],I=i[1],U=i[5],K=i[9],z=i[13],L=i[2],k=i[6],$=i[10],ee=i[14],B=i[3],X=i[7],Y=i[11],ne=i[15];return s[0]=o*R+a*I+l*L+c*B,s[4]=o*D+a*U+l*k+c*X,s[8]=o*v+a*K+l*$+c*Y,s[12]=o*E+a*z+l*ee+c*ne,s[1]=h*R+p*I+u*L+m*B,s[5]=h*D+p*U+u*k+m*X,s[9]=h*v+p*K+u*$+m*Y,s[13]=h*E+p*z+u*ee+m*ne,s[2]=x*R+f*I+d*L+M*B,s[6]=x*D+f*U+d*k+M*X,s[10]=x*v+f*K+d*$+M*Y,s[14]=x*E+f*z+d*ee+M*ne,s[3]=w*R+_*I+T*L+S*B,s[7]=w*D+_*U+T*k+S*X,s[11]=w*v+_*K+T*$+S*Y,s[15]=w*E+_*z+T*ee+S*ne,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],p=e[6],u=e[10],m=e[14],x=e[3],f=e[7],d=e[11],M=e[15];return x*(+s*l*p-i*c*p-s*a*u+n*c*u+i*a*m-n*l*m)+f*(+t*l*m-t*c*u+s*o*u-i*o*m+i*c*h-s*l*h)+d*(+t*c*p-t*a*m-s*o*p+n*o*m+s*a*h-n*c*h)+M*(-i*a*h-t*l*p+t*a*u+i*o*p-n*o*u+n*l*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],p=e[9],u=e[10],m=e[11],x=e[12],f=e[13],d=e[14],M=e[15],w=p*d*c-f*u*c+f*l*m-a*d*m-p*l*M+a*u*M,_=x*u*c-h*d*c-x*l*m+o*d*m+h*l*M-o*u*M,T=h*f*c-x*p*c+x*a*m-o*f*m-h*a*M+o*p*M,S=x*p*l-h*f*l-x*a*u+o*f*u+h*a*d-o*p*d,R=t*w+n*_+i*T+s*S;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let D=1/R;return e[0]=w*D,e[1]=(f*u*s-p*d*s-f*i*m+n*d*m+p*i*M-n*u*M)*D,e[2]=(a*d*s-f*l*s+f*i*c-n*d*c-a*i*M+n*l*M)*D,e[3]=(p*l*s-a*u*s-p*i*c+n*u*c+a*i*m-n*l*m)*D,e[4]=_*D,e[5]=(h*d*s-x*u*s+x*i*m-t*d*m-h*i*M+t*u*M)*D,e[6]=(x*l*s-o*d*s-x*i*c+t*d*c+o*i*M-t*l*M)*D,e[7]=(o*u*s-h*l*s+h*i*c-t*u*c-o*i*m+t*l*m)*D,e[8]=T*D,e[9]=(x*p*s-h*f*s-x*n*m+t*f*m+h*n*M-t*p*M)*D,e[10]=(o*f*s-x*a*s+x*n*c-t*f*c-o*n*M+t*a*M)*D,e[11]=(h*a*s-o*p*s-h*n*c+t*p*c+o*n*m-t*a*m)*D,e[12]=S*D,e[13]=(h*f*i-x*p*i+x*n*u-t*f*u-h*n*d+t*p*d)*D,e[14]=(x*a*i-o*f*i-x*n*l+t*f*l+o*n*d-t*a*d)*D,e[15]=(o*p*i-h*a*i+h*n*l-t*p*l-o*n*u+t*a*u)*D,this}scale(e){let t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,h=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,h=o+o,p=a+a,u=s*c,m=s*h,x=s*p,f=o*h,d=o*p,M=a*p,w=l*c,_=l*h,T=l*p,S=n.x,R=n.y,D=n.z;return i[0]=(1-(f+M))*S,i[1]=(m+T)*S,i[2]=(x-_)*S,i[3]=0,i[4]=(m-T)*R,i[5]=(1-(u+M))*R,i[6]=(d+w)*R,i[7]=0,i[8]=(x+_)*D,i[9]=(d-w)*D,i[10]=(1-(u+f))*D,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,s=Dn.set(i[0],i[1],i[2]).length(),o=Dn.set(i[4],i[5],i[6]).length(),a=Dn.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],Pt.copy(this);let c=1/s,h=1/o,p=1/a;return Pt.elements[0]*=c,Pt.elements[1]*=c,Pt.elements[2]*=c,Pt.elements[4]*=h,Pt.elements[5]*=h,Pt.elements[6]*=h,Pt.elements[8]*=p,Pt.elements[9]*=p,Pt.elements[10]*=p,t.setFromRotationMatrix(Pt),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,i,s,o){let a=this.elements,l=2*s/(t-e),c=2*s/(n-i),h=(t+e)/(t-e),p=(n+i)/(n-i),u=-(o+s)/(o-s),m=-2*o*s/(o-s);return a[0]=l,a[4]=0,a[8]=h,a[12]=0,a[1]=0,a[5]=c,a[9]=p,a[13]=0,a[2]=0,a[6]=0,a[10]=u,a[14]=m,a[3]=0,a[7]=0,a[11]=-1,a[15]=0,this}makeOrthographic(e,t,n,i,s,o){let a=this.elements,l=1/(t-e),c=1/(n-i),h=1/(o-s),p=(t+e)*l,u=(n+i)*c,m=(o+s)*h;return a[0]=2*l,a[4]=0,a[8]=0,a[12]=-p,a[1]=0,a[5]=2*c,a[9]=0,a[13]=-u,a[2]=0,a[6]=0,a[10]=-2*h,a[14]=-m,a[3]=0,a[7]=0,a[11]=0,a[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Dn=new O,Pt=new lt,Al=new O(0,0,0),Cl=new O(1,1,1),tn=new O,Ni=new O,wt=new O,wa=new lt,Ta=new hn,ns=class r{constructor(e=0,t=0,n=0,i=r.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],p=i[2],u=i[6],m=i[10];switch(t){case"XYZ":this._y=Math.asin(Et(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Et(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-p,s),this._z=0);break;case"ZXY":this._x=Math.asin(Et(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-p,m),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Et(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(u,m),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Et(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-p,s)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-Et(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return wa.makeRotationFromQuaternion(e),this.setFromRotationMatrix(wa,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ta.setFromEuler(this),this.setFromQuaternion(Ta,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ns.DEFAULT_ORDER="XYZ";var is=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Rl=0,Ea=new O,In=new hn,qt=new lt,Oi=new O,ci=new O,Ll=new O,Pl=new hn,Aa=new O(1,0,0),Ca=new O(0,1,0),Ra=new O(0,0,1),Dl={type:"added"},La={type:"removed"},Ft=class r extends cn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Rl++}),this.uuid=Ti(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=r.DEFAULT_UP.clone();let e=new O,t=new ns,n=new hn,i=new O(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new lt},normalMatrix:{value:new vt}}),this.matrix=new lt,this.matrixWorld=new lt,this.matrixAutoUpdate=r.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=r.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.layers=new is,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return In.setFromAxisAngle(e,t),this.quaternion.multiply(In),this}rotateOnWorldAxis(e,t){return In.setFromAxisAngle(e,t),this.quaternion.premultiply(In),this}rotateX(e){return this.rotateOnAxis(Aa,e)}rotateY(e){return this.rotateOnAxis(Ca,e)}rotateZ(e){return this.rotateOnAxis(Ra,e)}translateOnAxis(e,t){return Ea.copy(e).applyQuaternion(this.quaternion),this.position.add(Ea.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Aa,e)}translateY(e){return this.translateOnAxis(Ca,e)}translateZ(e){return this.translateOnAxis(Ra,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(qt.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Oi.copy(e):Oi.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),ci.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?qt.lookAt(ci,Oi,this.up):qt.lookAt(Oi,ci,this.up),this.quaternion.setFromRotationMatrix(qt),i&&(qt.extractRotation(i.matrixWorld),In.setFromRotationMatrix(qt),this.quaternion.premultiply(In.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Dl)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(La)),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){for(let e=0;e<this.children.length;e++){let t=this.children[e];t.parent=null,t.dispatchEvent(La)}return this.children.length=0,this}attach(e){return this.updateWorldMatrix(!0,!1),qt.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),qt.multiply(e.parent.matrixWorld)),e.applyMatrix4(qt),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t){let n=[];this[e]===t&&n.push(this);for(let i=0,s=this.children.length;i<s;i++){let o=this.children[i].getObjectsByProperty(e,t);o.length>0&&(n=n.concat(o))}return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ci,e,Ll),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ci,Pl,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++){let s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){let i=this.children;for(let s=0,o=i.length;s<o;s++){let a=i[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let p=l[c];s(e.shapes,p)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];i.animations.push(s(e.animations,l))}}if(t){let a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),p=o(e.shapes),u=o(e.skeletons),m=o(e.animations),x=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),p.length>0&&(n.shapes=p),u.length>0&&(n.skeletons=u),m.length>0&&(n.animations=m),x.length>0&&(n.nodes=x)}return n.object=i,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};Ft.DEFAULT_UP=new O(0,1,0);Ft.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ft.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Dt=new O,Xt=new O,Bs=new O,Yt=new O,Fn=new O,Nn=new O,Pa=new O,ks=new O,Vs=new O,Hs=new O,gi=class r{constructor(e=new O,t=new O,n=new O){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Dt.subVectors(e,t),i.cross(Dt);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){Dt.subVectors(i,t),Xt.subVectors(n,t),Bs.subVectors(e,t);let o=Dt.dot(Dt),a=Dt.dot(Xt),l=Dt.dot(Bs),c=Xt.dot(Xt),h=Xt.dot(Bs),p=o*c-a*a;if(p===0)return s.set(-2,-1,-1);let u=1/p,m=(c*l-a*h)*u,x=(o*h-a*l)*u;return s.set(1-m-x,x,m)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Yt),Yt.x>=0&&Yt.y>=0&&Yt.x+Yt.y<=1}static getUV(e,t,n,i,s,o,a,l){return this.getBarycoord(e,t,n,i,Yt),l.set(0,0),l.addScaledVector(s,Yt.x),l.addScaledVector(o,Yt.y),l.addScaledVector(a,Yt.z),l}static isFrontFacing(e,t,n,i){return Dt.subVectors(n,t),Xt.subVectors(e,t),Dt.cross(Xt).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Dt.subVectors(this.c,this.b),Xt.subVectors(this.a,this.b),Dt.cross(Xt).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return r.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return r.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,i,s){return r.getUV(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return r.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return r.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,s=this.c,o,a;Fn.subVectors(i,n),Nn.subVectors(s,n),ks.subVectors(e,n);let l=Fn.dot(ks),c=Nn.dot(ks);if(l<=0&&c<=0)return t.copy(n);Vs.subVectors(e,i);let h=Fn.dot(Vs),p=Nn.dot(Vs);if(h>=0&&p<=h)return t.copy(i);let u=l*p-h*c;if(u<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(Fn,o);Hs.subVectors(e,s);let m=Fn.dot(Hs),x=Nn.dot(Hs);if(x>=0&&m<=x)return t.copy(s);let f=m*c-l*x;if(f<=0&&c>=0&&x<=0)return a=c/(c-x),t.copy(n).addScaledVector(Nn,a);let d=h*x-m*p;if(d<=0&&p-h>=0&&m-x>=0)return Pa.subVectors(s,i),a=(p-h)/(p-h+(m-x)),t.copy(i).addScaledVector(Pa,a);let M=1/(d+f+u);return o=f*M,a=u*M,t.copy(n).addScaledVector(Fn,o).addScaledVector(Nn,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Il=0,Kn=class extends cn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Il++}),this.uuid=Ti(),this.name="",this.type="Material",this.blending=Wn,this.side=on,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=no,this.blendDst=io,this.blendEquation=Vn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=Ks,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=gl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Es,this.stencilZFail=Es,this.stencilZPass=Es,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn("THREE.Material: '"+t+"' parameter is undefined.");continue}let i=this[t];if(i===void 0){console.warn("THREE."+this.type+": '"+t+"' is not a property of this material.");continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Wn&&(n.blending=this.blending),this.side!==on&&(n.side=this.side),this.vertexColors&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=this.transparent),n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.stencilWrite=this.stencilWrite,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaToCoverage===!0&&(n.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=this.premultipliedAlpha),this.forceSinglePass===!0&&(n.forceSinglePass=this.forceSinglePass),this.wireframe===!0&&(n.wireframe=this.wireframe),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=this.flatShading),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){let o=[];for(let a in s){let l=s[a];delete l.metadata,o.push(l)}return o}if(t){let s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},co={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},It={h:0,s:0,l:0},zi={h:0,s:0,l:0};function Gs(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}var Ue=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,t===void 0&&n===void 0?this.set(e):this.setRGB(e,t,n)}set(e){return e&&e.isColor?this.copy(e):typeof e=="number"?this.setHex(e):typeof e=="string"&&this.setStyle(e),this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=kt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,pt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=pt.workingColorSpace){return this.r=e,this.g=t,this.b=n,pt.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=pt.workingColorSpace){if(e=xl(e,1),t=Et(t,0,1),n=Et(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=Gs(o,s,e+1/3),this.g=Gs(o,s,e),this.b=Gs(o,s,e-1/3)}return pt.toWorkingColorSpace(this,i),this}setStyle(e,t=kt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return this.r=Math.min(255,parseInt(s[1],10))/255,this.g=Math.min(255,parseInt(s[2],10))/255,this.b=Math.min(255,parseInt(s[3],10))/255,pt.toWorkingColorSpace(this,t),n(s[4]),this;if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return this.r=Math.min(100,parseInt(s[1],10))/100,this.g=Math.min(100,parseInt(s[2],10))/100,this.b=Math.min(100,parseInt(s[3],10))/100,pt.toWorkingColorSpace(this,t),n(s[4]),this;break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a)){let l=parseFloat(s[1])/360,c=parseFloat(s[2])/100,h=parseFloat(s[3])/100;return n(s[4]),this.setHSL(l,c,h,t)}break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=i[1],o=s.length;if(o===3)return this.r=parseInt(s.charAt(0)+s.charAt(0),16)/255,this.g=parseInt(s.charAt(1)+s.charAt(1),16)/255,this.b=parseInt(s.charAt(2)+s.charAt(2),16)/255,pt.toWorkingColorSpace(this,t),this;if(o===6)return this.r=parseInt(s.charAt(0)+s.charAt(1),16)/255,this.g=parseInt(s.charAt(2)+s.charAt(3),16)/255,this.b=parseInt(s.charAt(4)+s.charAt(5),16)/255,pt.toWorkingColorSpace(this,t),this;console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=kt){let n=co[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Xn(e.r),this.g=Xn(e.g),this.b=Xn(e.b),this}copyLinearToSRGB(e){return this.r=Ps(e.r),this.g=Ps(e.g),this.b=Ps(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=kt){return pt.fromWorkingColorSpace(at.copy(this),e),Et(at.r*255,0,255)<<16^Et(at.g*255,0,255)<<8^Et(at.b*255,0,255)<<0}getHexString(e=kt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=pt.workingColorSpace){pt.fromWorkingColorSpace(at.copy(this),t);let n=at.r,i=at.g,s=at.b,o=Math.max(n,i,s),a=Math.min(n,i,s),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let p=o-a;switch(c=h<=.5?p/(o+a):p/(2-o-a),o){case n:l=(i-s)/p+(i<s?6:0);break;case i:l=(s-n)/p+2;break;case s:l=(n-i)/p+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=pt.workingColorSpace){return pt.fromWorkingColorSpace(at.copy(this),t),e.r=at.r,e.g=at.g,e.b=at.b,e}getStyle(e=kt){pt.fromWorkingColorSpace(at.copy(this),e);let t=at.r,n=at.g,i=at.b;return e!==kt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${t*255|0},${n*255|0},${i*255|0})`}offsetHSL(e,t,n){return this.getHSL(It),It.h+=e,It.s+=t,It.l+=n,this.setHSL(It.h,It.s,It.l),this}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(It),e.getHSL(zi);let n=Cs(It.h,zi.h,t),i=Cs(It.s,zi.s,t),s=Cs(It.l,zi.l,t);return this.setHSL(n,i,s),this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},at=new Ue;Ue.NAMES=co;var ss=class extends Kn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=so,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},$e=new O,Ui=new Ee,Ye=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=_a,this.updateRange={offset:0,count:-1},this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ui.fromBufferAttribute(this,t),Ui.applyMatrix3(e),this.setXY(t,Ui.x,Ui.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)$e.fromBufferAttribute(this,t),$e.applyMatrix3(e),this.setXYZ(t,$e.x,$e.y,$e.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)$e.fromBufferAttribute(this,t),$e.applyMatrix4(e),this.setXYZ(t,$e.x,$e.y,$e.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)$e.fromBufferAttribute(this,t),$e.applyNormalMatrix(e),this.setXYZ(t,$e.x,$e.y,$e.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)$e.fromBufferAttribute(this,t),$e.transformDirection(e),this.setXYZ(t,$e.x,$e.y,$e.z);return this}set(e,t=0){return this.array.set(e,t),this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Li(t,this.array)),t}setX(e,t){return this.normalized&&(t=St(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Li(t,this.array)),t}setY(e,t){return this.normalized&&(t=St(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Li(t,this.array)),t}setZ(e,t){return this.normalized&&(t=St(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Li(t,this.array)),t}setW(e,t){return this.normalized&&(t=St(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=St(t,this.array),n=St(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=St(t,this.array),n=St(n,this.array),i=St(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=St(t,this.array),n=St(n,this.array),i=St(i,this.array),s=St(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==_a&&(e.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(e.updateRange=this.updateRange),e}copyColorsArray(){console.error("THREE.BufferAttribute: copyColorsArray() was removed in r144.")}copyVector2sArray(){console.error("THREE.BufferAttribute: copyVector2sArray() was removed in r144.")}copyVector3sArray(){console.error("THREE.BufferAttribute: copyVector3sArray() was removed in r144.")}copyVector4sArray(){console.error("THREE.BufferAttribute: copyVector4sArray() was removed in r144.")}};var rs=class extends Ye{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var as=class extends Ye{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Kt=class extends Ye{constructor(e,t,n){super(new Float32Array(e),t,n)}};var Fl=0,Rt=new lt,Ws=new Ft,On=new O,Tt=new wn,hi=new wn,nt=new O,Nt=class r extends cn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Fl++}),this.uuid=Ti(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(lo(e)?as:rs)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new vt().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Rt.makeRotationFromQuaternion(e),this.applyMatrix4(Rt),this}rotateX(e){return Rt.makeRotationX(e),this.applyMatrix4(Rt),this}rotateY(e){return Rt.makeRotationY(e),this.applyMatrix4(Rt),this}rotateZ(e){return Rt.makeRotationZ(e),this.applyMatrix4(Rt),this}translate(e,t,n){return Rt.makeTranslation(e,t,n),this.applyMatrix4(Rt),this}scale(e,t,n){return Rt.makeScale(e,t,n),this.applyMatrix4(Rt),this}lookAt(e){return Ws.lookAt(e),Ws.updateMatrix(),this.applyMatrix4(Ws.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(On).negate(),this.translate(On.x,On.y,On.z),this}setFromPoints(e){let t=[];for(let n=0,i=e.length;n<i;n++){let s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Kt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new wn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let s=t[n];Tt.setFromBufferAttribute(s),this.morphTargetsRelative?(nt.addVectors(this.boundingBox.min,Tt.min),this.boundingBox.expandByPoint(nt),nt.addVectors(this.boundingBox.max,Tt.max),this.boundingBox.expandByPoint(nt)):(this.boundingBox.expandByPoint(Tt.min),this.boundingBox.expandByPoint(Tt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new bi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new O,1/0);return}if(e){let n=this.boundingSphere.center;if(Tt.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){let a=t[s];hi.setFromBufferAttribute(a),this.morphTargetsRelative?(nt.addVectors(Tt.min,hi.min),Tt.expandByPoint(nt),nt.addVectors(Tt.max,hi.max),Tt.expandByPoint(nt)):(Tt.expandByPoint(hi.min),Tt.expandByPoint(hi.max))}Tt.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)nt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(nt));if(t)for(let s=0,o=t.length;s<o;s++){let a=t[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)nt.fromBufferAttribute(a,c),l&&(On.fromBufferAttribute(e,c),nt.add(On)),i=Math.max(i,n.distanceToSquared(nt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.array,i=t.position.array,s=t.normal.array,o=t.uv.array,a=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ye(new Float32Array(4*a),4));let l=this.getAttribute("tangent").array,c=[],h=[];for(let I=0;I<a;I++)c[I]=new O,h[I]=new O;let p=new O,u=new O,m=new O,x=new Ee,f=new Ee,d=new Ee,M=new O,w=new O;function _(I,U,K){p.fromArray(i,I*3),u.fromArray(i,U*3),m.fromArray(i,K*3),x.fromArray(o,I*2),f.fromArray(o,U*2),d.fromArray(o,K*2),u.sub(p),m.sub(p),f.sub(x),d.sub(x);let z=1/(f.x*d.y-d.x*f.y);isFinite(z)&&(M.copy(u).multiplyScalar(d.y).addScaledVector(m,-f.y).multiplyScalar(z),w.copy(m).multiplyScalar(f.x).addScaledVector(u,-d.x).multiplyScalar(z),c[I].add(M),c[U].add(M),c[K].add(M),h[I].add(w),h[U].add(w),h[K].add(w))}let T=this.groups;T.length===0&&(T=[{start:0,count:n.length}]);for(let I=0,U=T.length;I<U;++I){let K=T[I],z=K.start,L=K.count;for(let k=z,$=z+L;k<$;k+=3)_(n[k+0],n[k+1],n[k+2])}let S=new O,R=new O,D=new O,v=new O;function E(I){D.fromArray(s,I*3),v.copy(D);let U=c[I];S.copy(U),S.sub(D.multiplyScalar(D.dot(U))).normalize(),R.crossVectors(v,U);let z=R.dot(h[I])<0?-1:1;l[I*4]=S.x,l[I*4+1]=S.y,l[I*4+2]=S.z,l[I*4+3]=z}for(let I=0,U=T.length;I<U;++I){let K=T[I],z=K.start,L=K.count;for(let k=z,$=z+L;k<$;k+=3)E(n[k+0]),E(n[k+1]),E(n[k+2])}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ye(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,m=n.count;u<m;u++)n.setXYZ(u,0,0,0);let i=new O,s=new O,o=new O,a=new O,l=new O,c=new O,h=new O,p=new O;if(e)for(let u=0,m=e.count;u<m;u+=3){let x=e.getX(u+0),f=e.getX(u+1),d=e.getX(u+2);i.fromBufferAttribute(t,x),s.fromBufferAttribute(t,f),o.fromBufferAttribute(t,d),h.subVectors(o,s),p.subVectors(i,s),h.cross(p),a.fromBufferAttribute(n,x),l.fromBufferAttribute(n,f),c.fromBufferAttribute(n,d),a.add(h),l.add(h),c.add(h),n.setXYZ(x,a.x,a.y,a.z),n.setXYZ(f,l.x,l.y,l.z),n.setXYZ(d,c.x,c.y,c.z)}else for(let u=0,m=t.count;u<m;u+=3)i.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),o.fromBufferAttribute(t,u+2),h.subVectors(o,s),p.subVectors(i,s),h.cross(p),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}merge(){return console.error("THREE.BufferGeometry.merge() has been removed. Use THREE.BufferGeometryUtils.mergeBufferGeometries() instead."),this}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)nt.fromBufferAttribute(e,t),nt.normalize(),e.setXYZ(t,nt.x,nt.y,nt.z)}toNonIndexed(){function e(a,l){let c=a.array,h=a.itemSize,p=a.normalized,u=new c.constructor(l.length*h),m=0,x=0;for(let f=0,d=l.length;f<d;f++){a.isInterleavedBufferAttribute?m=l[f]*a.data.stride+a.offset:m=l[f]*h;for(let M=0;M<h;M++)u[x++]=c[m++]}return new Ye(u,h,p)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new r,n=this.index.array,i=this.attributes;for(let a in i){let l=i[a],c=e(l,n);t.setAttribute(a,c)}let s=this.morphAttributes;for(let a in s){let l=[],c=s[a];for(let h=0,p=c.length;h<p;h++){let u=c[h],m=e(u,n);l.push(m)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let i={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let p=0,u=c.length;p<u;p++){let m=c[p];h.push(m.toJSON(e.data))}h.length>0&&(i[l]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let i=e.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(t))}let s=e.morphAttributes;for(let c in s){let h=[],p=s[c];for(let u=0,m=p.length;u<m;u++)h.push(p[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,h=o.length;c<h;c++){let p=o[c];this.addGroup(p.start,p.count,p.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Da=new lt,Bt=new nr,Bi=new bi,Ia=new O,ui=new O,di=new O,fi=new O,qs=new O,ki=new O,Vi=new Ee,Hi=new Ee,Gi=new Ee,Xs=new O,Wi=new O,ot=class extends Ft{constructor(e=new Nt,t=new ss){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){let a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let a=this.morphTargetInfluences;if(s&&a){ki.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let h=a[l],p=s[l];h!==0&&(qs.fromBufferAttribute(p,e),o?ki.addScaledVector(qs,h):ki.addScaledVector(qs.sub(t),h))}t.add(ki)}return this.isSkinnedMesh&&this.boneTransform(e,t),t}raycast(e,t){let n=this.geometry,i=this.material,s=this.matrixWorld;if(i===void 0||(n.boundingSphere===null&&n.computeBoundingSphere(),Bi.copy(n.boundingSphere),Bi.applyMatrix4(s),Bt.copy(e.ray).recast(e.near),Bi.containsPoint(Bt.origin)===!1&&(Bt.intersectSphere(Bi,Ia)===null||Bt.origin.distanceToSquared(Ia)>(e.far-e.near)**2))||(Da.copy(s).invert(),Bt.copy(e.ray).applyMatrix4(Da),n.boundingBox!==null&&Bt.intersectsBox(n.boundingBox)===!1))return;let o,a=n.index,l=n.attributes.position,c=n.attributes.uv,h=n.attributes.uv2,p=n.groups,u=n.drawRange;if(a!==null)if(Array.isArray(i))for(let m=0,x=p.length;m<x;m++){let f=p[m],d=i[f.materialIndex],M=Math.max(f.start,u.start),w=Math.min(a.count,Math.min(f.start+f.count,u.start+u.count));for(let _=M,T=w;_<T;_+=3){let S=a.getX(_),R=a.getX(_+1),D=a.getX(_+2);o=qi(this,d,e,Bt,c,h,S,R,D),o&&(o.faceIndex=Math.floor(_/3),o.face.materialIndex=f.materialIndex,t.push(o))}}else{let m=Math.max(0,u.start),x=Math.min(a.count,u.start+u.count);for(let f=m,d=x;f<d;f+=3){let M=a.getX(f),w=a.getX(f+1),_=a.getX(f+2);o=qi(this,i,e,Bt,c,h,M,w,_),o&&(o.faceIndex=Math.floor(f/3),t.push(o))}}else if(l!==void 0)if(Array.isArray(i))for(let m=0,x=p.length;m<x;m++){let f=p[m],d=i[f.materialIndex],M=Math.max(f.start,u.start),w=Math.min(l.count,Math.min(f.start+f.count,u.start+u.count));for(let _=M,T=w;_<T;_+=3){let S=_,R=_+1,D=_+2;o=qi(this,d,e,Bt,c,h,S,R,D),o&&(o.faceIndex=Math.floor(_/3),o.face.materialIndex=f.materialIndex,t.push(o))}}else{let m=Math.max(0,u.start),x=Math.min(l.count,u.start+u.count);for(let f=m,d=x;f<d;f+=3){let M=f,w=f+1,_=f+2;o=qi(this,i,e,Bt,c,h,M,w,_),o&&(o.faceIndex=Math.floor(f/3),t.push(o))}}}};function Nl(r,e,t,n,i,s,o,a){let l;if(e.side===At?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,e.side===on,a),l===null)return null;Wi.copy(a),Wi.applyMatrix4(r.matrixWorld);let c=t.ray.origin.distanceTo(Wi);return c<t.near||c>t.far?null:{distance:c,point:Wi.clone(),object:r}}function qi(r,e,t,n,i,s,o,a,l){r.getVertexPosition(o,ui),r.getVertexPosition(a,di),r.getVertexPosition(l,fi);let c=Nl(r,e,t,n,ui,di,fi,Xs);if(c){i&&(Vi.fromBufferAttribute(i,o),Hi.fromBufferAttribute(i,a),Gi.fromBufferAttribute(i,l),c.uv=gi.getUV(Xs,ui,di,fi,Vi,Hi,Gi,new Ee)),s&&(Vi.fromBufferAttribute(s,o),Hi.fromBufferAttribute(s,a),Gi.fromBufferAttribute(s,l),c.uv2=gi.getUV(Xs,ui,di,fi,Vi,Hi,Gi,new Ee));let h={a:o,b:a,c:l,normal:new O,materialIndex:0};gi.getNormal(ui,di,fi,h.normal),c.face=h}return c}var Si=class r extends Nt{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};let a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);let l=[],c=[],h=[],p=[],u=0,m=0;x("z","y","x",-1,-1,n,t,e,o,s,0),x("z","y","x",1,-1,n,t,-e,o,s,1),x("x","z","y",1,1,e,n,t,i,o,2),x("x","z","y",1,-1,e,n,-t,i,o,3),x("x","y","z",1,-1,e,t,n,i,s,4),x("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new Kt(c,3)),this.setAttribute("normal",new Kt(h,3)),this.setAttribute("uv",new Kt(p,2));function x(f,d,M,w,_,T,S,R,D,v,E){let I=T/D,U=S/v,K=T/2,z=S/2,L=R/2,k=D+1,$=v+1,ee=0,B=0,X=new O;for(let Y=0;Y<$;Y++){let ne=Y*U-z;for(let N=0;N<k;N++){let J=N*I-K;X[f]=J*w,X[d]=ne*_,X[M]=L,c.push(X.x,X.y,X.z),X[f]=0,X[d]=0,X[M]=R>0?1:-1,h.push(X.x,X.y,X.z),p.push(N/D),p.push(1-Y/v),ee+=1}}for(let Y=0;Y<v;Y++)for(let ne=0;ne<D;ne++){let N=u+ne+k*Y,J=u+ne+k*(Y+1),re=u+(ne+1)+k*(Y+1),A=u+(ne+1)+k*Y;l.push(N,J,A),l.push(J,re,A),B+=6}a.addGroup(m,B,E),m+=B,u+=ee}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function jn(r){let e={};for(let t in r){e[t]={};for(let n in r[t]){let i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function mt(r){let e={};for(let t=0;t<r.length;t++){let n=jn(r[t]);for(let i in n)e[i]=n[i]}return e}function Ol(r){let e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function ho(r){return r.getRenderTarget()===null&&r.outputEncoding===Be?kt:Mi}var zl={clone:jn,merge:mt},Ul=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Bl=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Lt=class extends Kn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ul,this.fragmentShader=Bl,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=jn(e.uniforms),this.uniformsGroups=Ol(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Tn=class extends Ft{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new lt,this.projectionMatrix=new lt,this.projectionMatrixInverse=new lt}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(-t[8],-t[9],-t[10]).normalize()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},gt=class extends Tn{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Ma*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(As*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ma*2*Math.atan(Math.tan(As*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(As*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},zn=-90,Un=1,ir=class extends Ft{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n;let i=new gt(zn,Un,e,t);i.layers=this.layers,i.up.set(0,1,0),i.lookAt(1,0,0),this.add(i);let s=new gt(zn,Un,e,t);s.layers=this.layers,s.up.set(0,1,0),s.lookAt(-1,0,0),this.add(s);let o=new gt(zn,Un,e,t);o.layers=this.layers,o.up.set(0,0,-1),o.lookAt(0,1,0),this.add(o);let a=new gt(zn,Un,e,t);a.layers=this.layers,a.up.set(0,0,1),a.lookAt(0,-1,0),this.add(a);let l=new gt(zn,Un,e,t);l.layers=this.layers,l.up.set(0,1,0),l.lookAt(0,0,1),this.add(l);let c=new gt(zn,Un,e,t);c.layers=this.layers,c.up.set(0,1,0),c.lookAt(0,0,-1),this.add(c)}update(e,t){this.parent===null&&this.updateMatrixWorld();let n=this.renderTarget,[i,s,o,a,l,c]=this.children,h=e.getRenderTarget(),p=e.toneMapping,u=e.xr.enabled;e.toneMapping=$t,e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0),e.render(t,i),e.setRenderTarget(n,1),e.render(t,s),e.setRenderTarget(n,2),e.render(t,o),e.setRenderTarget(n,3),e.render(t,a),e.setRenderTarget(n,4),e.render(t,l),n.texture.generateMipmaps=m,e.setRenderTarget(n,5),e.render(t,c),e.setRenderTarget(h),e.toneMapping=p,e.xr.enabled=u,n.texture.needsPMREMUpdate=!0}},os=class extends yt{constructor(e,t,n,i,s,o,a,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:Zn,super(e,t,n,i,s,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},sr=class extends ct{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new os(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.encoding),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:it}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.encoding=t.encoding,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Si(5,5,5),s=new Lt({name:"CubemapFromEquirect",uniforms:jn(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:At,blending:an});s.uniforms.tEquirect.value=t;let o=new ot(i,s),a=t.minFilter;return t.minFilter===yi&&(t.minFilter=it),new ir(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){let s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}},Ys=new O,kl=new O,Vl=new vt,Zt=class{constructor(e=new O(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=Ys.subVectors(n,t).cross(kl.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Ys),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Vl.getNormalMatrix(e),i=this.coplanarPoint(Ys).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Bn=new bi,Xi=new O,ls=class{constructor(e=new Zt,t=new Zt,n=new Zt,i=new Zt,s=new Zt,o=new Zt){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e){let t=this.planes,n=e.elements,i=n[0],s=n[1],o=n[2],a=n[3],l=n[4],c=n[5],h=n[6],p=n[7],u=n[8],m=n[9],x=n[10],f=n[11],d=n[12],M=n[13],w=n[14],_=n[15];return t[0].setComponents(a-i,p-l,f-u,_-d).normalize(),t[1].setComponents(a+i,p+l,f+u,_+d).normalize(),t[2].setComponents(a+s,p+c,f+m,_+M).normalize(),t[3].setComponents(a-s,p-c,f-m,_-M).normalize(),t[4].setComponents(a-o,p-h,f-x,_-w).normalize(),t[5].setComponents(a+o,p+h,f+x,_+w).normalize(),this}intersectsObject(e){let t=e.geometry;return t.boundingSphere===null&&t.computeBoundingSphere(),Bn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld),this.intersectsSphere(Bn)}intersectsSprite(e){return Bn.center.set(0,0,0),Bn.radius=.7071067811865476,Bn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Bn)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(Xi.x=i.normal.x>0?e.max.x:e.min.x,Xi.y=i.normal.y>0?e.max.y:e.min.y,Xi.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Xi)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function uo(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function Hl(r,e){let t=e.isWebGL2,n=new WeakMap;function i(c,h){let p=c.array,u=c.usage,m=r.createBuffer();r.bindBuffer(h,m),r.bufferData(h,p,u),c.onUploadCallback();let x;if(p instanceof Float32Array)x=5126;else if(p instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)x=5131;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else x=5123;else if(p instanceof Int16Array)x=5122;else if(p instanceof Uint32Array)x=5125;else if(p instanceof Int32Array)x=5124;else if(p instanceof Int8Array)x=5120;else if(p instanceof Uint8Array)x=5121;else if(p instanceof Uint8ClampedArray)x=5121;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:m,type:x,bytesPerElement:p.BYTES_PER_ELEMENT,version:c.version}}function s(c,h,p){let u=h.array,m=h.updateRange;r.bindBuffer(p,c),m.count===-1?r.bufferSubData(p,0,u):(t?r.bufferSubData(p,m.offset*u.BYTES_PER_ELEMENT,u,m.offset,m.count):r.bufferSubData(p,m.offset*u.BYTES_PER_ELEMENT,u.subarray(m.offset,m.offset+m.count)),m.count=-1),h.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);let h=n.get(c);h&&(r.deleteBuffer(h.buffer),n.delete(c))}function l(c,h){if(c.isGLBufferAttribute){let u=n.get(c);(!u||u.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);let p=n.get(c);p===void 0?n.set(c,i(c,h)):p.version<c.version&&(s(p.buffer,c,h),p.version=c.version)}return{get:o,remove:a,update:l}}var rr=class r extends Nt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,p=e/a,u=t/l,m=[],x=[],f=[],d=[];for(let M=0;M<h;M++){let w=M*u-o;for(let _=0;_<c;_++){let T=_*p-s;x.push(T,-w,0),f.push(0,0,1),d.push(_/a),d.push(1-M/l)}}for(let M=0;M<l;M++)for(let w=0;w<a;w++){let _=w+c*M,T=w+c*(M+1),S=w+1+c*(M+1),R=w+1+c*M;m.push(_,T,R),m.push(T,S,R)}this.setIndex(m),this.setAttribute("position",new Kt(x,3)),this.setAttribute("normal",new Kt(f,3)),this.setAttribute("uv",new Kt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.widthSegments,e.heightSegments)}},Gl=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vUv ).g;
#endif`,Wl=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ql=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Xl=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Yl=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Zl=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Jl="vec3 transformed = vec3( position );",$l=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Kl=`vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float roughness ) {
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
	float D = D_GGX( alpha, dotNH );
	return F * ( V * D );
}
#ifdef USE_IRIDESCENCE
	vec3 BRDF_GGX_Iridescence( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float iridescence, const in vec3 iridescenceFresnel, const in float roughness ) {
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = mix( F_Schlick( f0, f90, dotVH ), iridescenceFresnel, iridescence );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif`,jl=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			 return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float R21 = R12;
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Ql=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vUv );
		vec2 dSTdy = dFdy( vUv );
		float Hll = bumpScale * texture2D( bumpMap, vUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = dFdx( surf_pos.xyz );
		vec3 vSigmaY = dFdy( surf_pos.xyz );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,ec=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,tc=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,nc=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ic=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,sc=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,rc=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ac=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,oc=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,lc=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal;
#endif
};
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}`,cc=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,hc=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,uc=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,dc=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );
#endif`,fc=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,pc=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,mc="gl_FragColor = linearToOutputTexel( gl_FragColor );",gc=`vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,xc=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,vc=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,_c=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,yc=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Mc=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,bc=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Sc=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,wc=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Tc=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ec=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Ac=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vUv2 );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Cc=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Rc=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Lc=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Pc=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometry.position;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometry.position;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Dc=`#if defined( USE_ENVMAP )
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
#endif`,Ic=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Fc=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Nc=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Oc=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,zc=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULARINTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vUv ).a;
		#endif
		#ifdef USE_SPECULARCOLORMAP
			specularColorFactor *= texture2D( specularColorMap, vUv ).rgb;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEENCOLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEENROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vUv ).a;
	#endif
#endif`,Uc=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
};
vec3 clearcoatSpecular = vec3( 0.0 );
vec3 sheenSpecular = vec3( 0.0 );
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecular += ccIrradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.clearcoatNormal, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometry.viewDir, geometry.normal, material.sheenColor, material.sheenRoughness );
	#endif
	#ifdef USE_IRIDESCENCE
		reflectedLight.directSpecular += irradiance * BRDF_GGX_Iridescence( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness );
	#else
		reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.roughness );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometry.clearcoatNormal, geometry.viewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * material.sheenColor * IBLSheenBRDF( geometry.normal, geometry.viewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Bc=`
GeometricContext geometry;
geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
#ifdef USE_CLEARCOAT
	geometry.clearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometry.viewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometry, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,kc=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometry.normal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	radiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Vc=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`,Hc=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Gc=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Wc=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,qc=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Xc=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Yc=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Zc=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Jc=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	uniform mat3 uvTransform;
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,$c=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Kc=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,jc=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Qc=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,eh=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,th=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,nh=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	#ifdef USE_TANGENT
		vec3 tangent = normalize( vTangent );
		vec3 bitangent = normalize( vBitangent );
		#ifdef DOUBLE_SIDED
			tangent = tangent * faceDirection;
			bitangent = bitangent * faceDirection;
		#endif
		#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )
			mat3 vTBN = mat3( tangent, bitangent, normal );
		#endif
	#endif
#endif
vec3 geometryNormal = normal;`,ih=`#ifdef OBJECTSPACE_NORMALMAP
	normal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( TANGENTSPACE_NORMALMAP )
	vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	#ifdef USE_TANGENT
		normal = normalize( vTBN * mapN );
	#else
		normal = perturbNormal2Arb( - vViewPosition, normal, mapN, faceDirection );
	#endif
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,sh=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rh=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ah=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,oh=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef OBJECTSPACE_NORMALMAP
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )
	vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( vUv.st );
		vec2 st1 = dFdy( vUv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );
		return normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );
	}
#endif`,lh=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`,ch=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	#ifdef USE_TANGENT
		clearcoatNormal = normalize( vTBN * clearcoatMapN );
	#else
		clearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );
	#endif
#endif`,hh=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif`,uh=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,dh=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha + 0.1;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,fh=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {
	return linearClipZ * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * invClipZ - far );
}`,ph=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,mh=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,gh=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,xh=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,vh=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vUv );
	roughnessFactor *= texelRoughness.g;
#endif`,_h=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,yh=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Mh=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,bh=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Sh=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,wh=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Th=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	uniform int boneTextureSize;
	mat4 getBoneMatrix( const in float i ) {
		float j = i * 4.0;
		float x = mod( j, float( boneTextureSize ) );
		float y = floor( j / float( boneTextureSize ) );
		float dx = 1.0 / float( boneTextureSize );
		float dy = 1.0 / float( boneTextureSize );
		y = dy * ( y + 0.5 );
		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
		mat4 bone = mat4( v1, v2, v3, v4 );
		return bone;
	}
#endif`,Eh=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ah=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Ch=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Rh=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Lh=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ph=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return toneMappingExposure * color;
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Dh=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmission = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmission.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmission.rgb, material.transmission );
#endif`,Ih=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, vec2 fullSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		
		vec2 lodFudge = pow( 1.95, lod ) / fullSize;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec2 fullSize = vec2( textureSize( sampler, 0 ) );
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), fullSize, floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), fullSize, ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return radiance;
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance * radiance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		return vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );
	}
#endif`,Fh=`#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )
	varying vec2 vUv;
#endif`,Nh=`#ifdef USE_UV
	#ifdef UVS_VERTEX_ONLY
		vec2 vUv;
	#else
		varying vec2 vUv;
	#endif
	uniform mat3 uvTransform;
#endif`,Oh=`#ifdef USE_UV
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
#endif`,zh=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	varying vec2 vUv2;
#endif`,Uh=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	attribute vec2 uv2;
	varying vec2 vUv2;
	uniform mat3 uv2Transform;
#endif`,Bh=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;
#endif`,kh=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Vh=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Hh=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Gh=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Wh=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,qh=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Xh=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Yh=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Zh=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Jh=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,$h=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Kh=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,jh=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Qh=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,eu=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,tu=`#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,nu=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,iu=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,su=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ru=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,au=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ou=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	vViewPosition = - mvPosition.xyz;
#endif
}`,lu=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,cu=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hu=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,uu=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,du=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULARINTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
	#ifdef USE_SPECULARCOLORMAP
		uniform sampler2D specularColorMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEENCOLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEENROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <bsdfs>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;
	#endif
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fu=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,pu=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mu=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,gu=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,xu=`#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vu=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,_u=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,yu=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,Ae={alphamap_fragment:Gl,alphamap_pars_fragment:Wl,alphatest_fragment:ql,alphatest_pars_fragment:Xl,aomap_fragment:Yl,aomap_pars_fragment:Zl,begin_vertex:Jl,beginnormal_vertex:$l,bsdfs:Kl,iridescence_fragment:jl,bumpmap_pars_fragment:Ql,clipping_planes_fragment:ec,clipping_planes_pars_fragment:tc,clipping_planes_pars_vertex:nc,clipping_planes_vertex:ic,color_fragment:sc,color_pars_fragment:rc,color_pars_vertex:ac,color_vertex:oc,common:lc,cube_uv_reflection_fragment:cc,defaultnormal_vertex:hc,displacementmap_pars_vertex:uc,displacementmap_vertex:dc,emissivemap_fragment:fc,emissivemap_pars_fragment:pc,encodings_fragment:mc,encodings_pars_fragment:gc,envmap_fragment:xc,envmap_common_pars_fragment:vc,envmap_pars_fragment:_c,envmap_pars_vertex:yc,envmap_physical_pars_fragment:Dc,envmap_vertex:Mc,fog_vertex:bc,fog_pars_vertex:Sc,fog_fragment:wc,fog_pars_fragment:Tc,gradientmap_pars_fragment:Ec,lightmap_fragment:Ac,lightmap_pars_fragment:Cc,lights_lambert_fragment:Rc,lights_lambert_pars_fragment:Lc,lights_pars_begin:Pc,lights_toon_fragment:Ic,lights_toon_pars_fragment:Fc,lights_phong_fragment:Nc,lights_phong_pars_fragment:Oc,lights_physical_fragment:zc,lights_physical_pars_fragment:Uc,lights_fragment_begin:Bc,lights_fragment_maps:kc,lights_fragment_end:Vc,logdepthbuf_fragment:Hc,logdepthbuf_pars_fragment:Gc,logdepthbuf_pars_vertex:Wc,logdepthbuf_vertex:qc,map_fragment:Xc,map_pars_fragment:Yc,map_particle_fragment:Zc,map_particle_pars_fragment:Jc,metalnessmap_fragment:$c,metalnessmap_pars_fragment:Kc,morphcolor_vertex:jc,morphnormal_vertex:Qc,morphtarget_pars_vertex:eh,morphtarget_vertex:th,normal_fragment_begin:nh,normal_fragment_maps:ih,normal_pars_fragment:sh,normal_pars_vertex:rh,normal_vertex:ah,normalmap_pars_fragment:oh,clearcoat_normal_fragment_begin:lh,clearcoat_normal_fragment_maps:ch,clearcoat_pars_fragment:hh,iridescence_pars_fragment:uh,output_fragment:dh,packing:fh,premultiplied_alpha_fragment:ph,project_vertex:mh,dithering_fragment:gh,dithering_pars_fragment:xh,roughnessmap_fragment:vh,roughnessmap_pars_fragment:_h,shadowmap_pars_fragment:yh,shadowmap_pars_vertex:Mh,shadowmap_vertex:bh,shadowmask_pars_fragment:Sh,skinbase_vertex:wh,skinning_pars_vertex:Th,skinning_vertex:Eh,skinnormal_vertex:Ah,specularmap_fragment:Ch,specularmap_pars_fragment:Rh,tonemapping_fragment:Lh,tonemapping_pars_fragment:Ph,transmission_fragment:Dh,transmission_pars_fragment:Ih,uv_pars_fragment:Fh,uv_pars_vertex:Nh,uv_vertex:Oh,uv2_pars_fragment:zh,uv2_pars_vertex:Uh,uv2_vertex:Bh,worldpos_vertex:kh,background_vert:Vh,background_frag:Hh,backgroundCube_vert:Gh,backgroundCube_frag:Wh,cube_vert:qh,cube_frag:Xh,depth_vert:Yh,depth_frag:Zh,distanceRGBA_vert:Jh,distanceRGBA_frag:$h,equirect_vert:Kh,equirect_frag:jh,linedashed_vert:Qh,linedashed_frag:eu,meshbasic_vert:tu,meshbasic_frag:nu,meshlambert_vert:iu,meshlambert_frag:su,meshmatcap_vert:ru,meshmatcap_frag:au,meshnormal_vert:ou,meshnormal_frag:lu,meshphong_vert:cu,meshphong_frag:hu,meshphysical_vert:uu,meshphysical_frag:du,meshtoon_vert:fu,meshtoon_frag:pu,points_vert:mu,points_frag:gu,shadow_vert:xu,shadow_frag:vu,sprite_vert:_u,sprite_frag:yu},ae={common:{diffuse:{value:new Ue(16777215)},opacity:{value:1},map:{value:null},uvTransform:{value:new vt},uv2Transform:{value:new vt},alphaMap:{value:null},alphaTest:{value:0}},specularmap:{specularMap:{value:null}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1}},emissivemap:{emissiveMap:{value:null}},bumpmap:{bumpMap:{value:null},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalScale:{value:new Ee(1,1)}},displacementmap:{displacementMap:{value:null},displacementScale:{value:1},displacementBias:{value:0}},roughnessmap:{roughnessMap:{value:null}},metalnessmap:{metalnessMap:{value:null}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ue(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ue(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new vt}},sprite:{diffuse:{value:new Ue(16777215)},opacity:{value:1},center:{value:new Ee(.5,.5)},rotation:{value:0},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new vt}}},Vt={basic:{uniforms:mt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.fog]),vertexShader:Ae.meshbasic_vert,fragmentShader:Ae.meshbasic_frag},lambert:{uniforms:mt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new Ue(0)}}]),vertexShader:Ae.meshlambert_vert,fragmentShader:Ae.meshlambert_frag},phong:{uniforms:mt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new Ue(0)},specular:{value:new Ue(1118481)},shininess:{value:30}}]),vertexShader:Ae.meshphong_vert,fragmentShader:Ae.meshphong_frag},standard:{uniforms:mt([ae.common,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.roughnessmap,ae.metalnessmap,ae.fog,ae.lights,{emissive:{value:new Ue(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ae.meshphysical_vert,fragmentShader:Ae.meshphysical_frag},toon:{uniforms:mt([ae.common,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.gradientmap,ae.fog,ae.lights,{emissive:{value:new Ue(0)}}]),vertexShader:Ae.meshtoon_vert,fragmentShader:Ae.meshtoon_frag},matcap:{uniforms:mt([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,{matcap:{value:null}}]),vertexShader:Ae.meshmatcap_vert,fragmentShader:Ae.meshmatcap_frag},points:{uniforms:mt([ae.points,ae.fog]),vertexShader:Ae.points_vert,fragmentShader:Ae.points_frag},dashed:{uniforms:mt([ae.common,ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ae.linedashed_vert,fragmentShader:Ae.linedashed_frag},depth:{uniforms:mt([ae.common,ae.displacementmap]),vertexShader:Ae.depth_vert,fragmentShader:Ae.depth_frag},normal:{uniforms:mt([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,{opacity:{value:1}}]),vertexShader:Ae.meshnormal_vert,fragmentShader:Ae.meshnormal_frag},sprite:{uniforms:mt([ae.sprite,ae.fog]),vertexShader:Ae.sprite_vert,fragmentShader:Ae.sprite_frag},background:{uniforms:{uvTransform:{value:new vt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ae.background_vert,fragmentShader:Ae.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ae.backgroundCube_vert,fragmentShader:Ae.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ae.cube_vert,fragmentShader:Ae.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ae.equirect_vert,fragmentShader:Ae.equirect_frag},distanceRGBA:{uniforms:mt([ae.common,ae.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ae.distanceRGBA_vert,fragmentShader:Ae.distanceRGBA_frag},shadow:{uniforms:mt([ae.lights,ae.fog,{color:{value:new Ue(0)},opacity:{value:1}}]),vertexShader:Ae.shadow_vert,fragmentShader:Ae.shadow_frag}};Vt.physical={uniforms:mt([Vt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatNormalScale:{value:new Ee(1,1)},clearcoatNormalMap:{value:null},iridescence:{value:0},iridescenceMap:{value:null},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},sheen:{value:0},sheenColor:{value:new Ue(0)},sheenColorMap:{value:null},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},transmission:{value:0},transmissionMap:{value:null},transmissionSamplerSize:{value:new Ee},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},attenuationDistance:{value:0},attenuationColor:{value:new Ue(0)},specularIntensity:{value:1},specularIntensityMap:{value:null},specularColor:{value:new Ue(1,1,1)},specularColorMap:{value:null}}]),vertexShader:Ae.meshphysical_vert,fragmentShader:Ae.meshphysical_frag};var Yi={r:0,b:0,g:0};function Mu(r,e,t,n,i,s,o){let a=new Ue(0),l=s===!0?0:1,c,h,p=null,u=0,m=null;function x(d,M){let w=!1,_=M.isScene===!0?M.background:null;_&&_.isTexture&&(_=(M.backgroundBlurriness>0?t:e).get(_));let T=r.xr,S=T.getSession&&T.getSession();S&&S.environmentBlendMode==="additive"&&(_=null),_===null?f(a,l):_&&_.isColor&&(f(_,1),w=!0),(r.autoClear||w)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),_&&(_.isCubeTexture||_.mapping===us)?(h===void 0&&(h=new ot(new Si(1,1,1),new Lt({name:"BackgroundCubeMaterial",uniforms:jn(Vt.backgroundCube.uniforms),vertexShader:Vt.backgroundCube.vertexShader,fragmentShader:Vt.backgroundCube.fragmentShader,side:At,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,D,v){this.matrixWorld.copyPosition(v.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),h.material.uniforms.envMap.value=_,h.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,h.material.toneMapped=_.encoding!==Be,(p!==_||u!==_.version||m!==r.toneMapping)&&(h.material.needsUpdate=!0,p=_,u=_.version,m=r.toneMapping),h.layers.enableAll(),d.unshift(h,h.geometry,h.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new ot(new rr(2,2),new Lt({name:"BackgroundMaterial",uniforms:jn(Vt.background.uniforms),vertexShader:Vt.background.vertexShader,fragmentShader:Vt.background.fragmentShader,side:on,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=_.encoding!==Be,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(p!==_||u!==_.version||m!==r.toneMapping)&&(c.material.needsUpdate=!0,p=_,u=_.version,m=r.toneMapping),c.layers.enableAll(),d.unshift(c,c.geometry,c.material,0,0,null))}function f(d,M){d.getRGB(Yi,ho(r)),n.buffers.color.setClear(Yi.r,Yi.g,Yi.b,M,o)}return{getClearColor:function(){return a},setClearColor:function(d,M=1){a.set(d),l=M,f(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(d){l=d,f(a,l)},render:x}}function bu(r,e,t,n){let i=r.getParameter(34921),s=n.isWebGL2?null:e.get("OES_vertex_array_object"),o=n.isWebGL2||s!==null,a={},l=d(null),c=l,h=!1;function p(L,k,$,ee,B){let X=!1;if(o){let Y=f(ee,$,k);c!==Y&&(c=Y,m(c.object)),X=M(L,ee,$,B),X&&w(L,ee,$,B)}else{let Y=k.wireframe===!0;(c.geometry!==ee.id||c.program!==$.id||c.wireframe!==Y)&&(c.geometry=ee.id,c.program=$.id,c.wireframe=Y,X=!0)}B!==null&&t.update(B,34963),(X||h)&&(h=!1,v(L,k,$,ee),B!==null&&r.bindBuffer(34963,t.get(B).buffer))}function u(){return n.isWebGL2?r.createVertexArray():s.createVertexArrayOES()}function m(L){return n.isWebGL2?r.bindVertexArray(L):s.bindVertexArrayOES(L)}function x(L){return n.isWebGL2?r.deleteVertexArray(L):s.deleteVertexArrayOES(L)}function f(L,k,$){let ee=$.wireframe===!0,B=a[L.id];B===void 0&&(B={},a[L.id]=B);let X=B[k.id];X===void 0&&(X={},B[k.id]=X);let Y=X[ee];return Y===void 0&&(Y=d(u()),X[ee]=Y),Y}function d(L){let k=[],$=[],ee=[];for(let B=0;B<i;B++)k[B]=0,$[B]=0,ee[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:$,attributeDivisors:ee,object:L,attributes:{},index:null}}function M(L,k,$,ee){let B=c.attributes,X=k.attributes,Y=0,ne=$.getAttributes();for(let N in ne)if(ne[N].location>=0){let re=B[N],A=X[N];if(A===void 0&&(N==="instanceMatrix"&&L.instanceMatrix&&(A=L.instanceMatrix),N==="instanceColor"&&L.instanceColor&&(A=L.instanceColor)),re===void 0||re.attribute!==A||A&&re.data!==A.data)return!0;Y++}return c.attributesNum!==Y||c.index!==ee}function w(L,k,$,ee){let B={},X=k.attributes,Y=0,ne=$.getAttributes();for(let N in ne)if(ne[N].location>=0){let re=X[N];re===void 0&&(N==="instanceMatrix"&&L.instanceMatrix&&(re=L.instanceMatrix),N==="instanceColor"&&L.instanceColor&&(re=L.instanceColor));let A={};A.attribute=re,re&&re.data&&(A.data=re.data),B[N]=A,Y++}c.attributes=B,c.attributesNum=Y,c.index=ee}function _(){let L=c.newAttributes;for(let k=0,$=L.length;k<$;k++)L[k]=0}function T(L){S(L,0)}function S(L,k){let $=c.newAttributes,ee=c.enabledAttributes,B=c.attributeDivisors;$[L]=1,ee[L]===0&&(r.enableVertexAttribArray(L),ee[L]=1),B[L]!==k&&((n.isWebGL2?r:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](L,k),B[L]=k)}function R(){let L=c.newAttributes,k=c.enabledAttributes;for(let $=0,ee=k.length;$<ee;$++)k[$]!==L[$]&&(r.disableVertexAttribArray($),k[$]=0)}function D(L,k,$,ee,B,X){n.isWebGL2===!0&&($===5124||$===5125)?r.vertexAttribIPointer(L,k,$,B,X):r.vertexAttribPointer(L,k,$,ee,B,X)}function v(L,k,$,ee){if(n.isWebGL2===!1&&(L.isInstancedMesh||ee.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;_();let B=ee.attributes,X=$.getAttributes(),Y=k.defaultAttributeValues;for(let ne in X){let N=X[ne];if(N.location>=0){let J=B[ne];if(J===void 0&&(ne==="instanceMatrix"&&L.instanceMatrix&&(J=L.instanceMatrix),ne==="instanceColor"&&L.instanceColor&&(J=L.instanceColor)),J!==void 0){let re=J.normalized,A=J.itemSize,Z=t.get(J);if(Z===void 0)continue;let ie=Z.buffer,le=Z.type,oe=Z.bytesPerElement;if(J.isInterleavedBufferAttribute){let te=J.data,xe=te.stride,me=J.offset;if(te.isInstancedInterleavedBuffer){for(let be=0;be<N.locationSize;be++)S(N.location+be,te.meshPerAttribute);L.isInstancedMesh!==!0&&ee._maxInstanceCount===void 0&&(ee._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let be=0;be<N.locationSize;be++)T(N.location+be);r.bindBuffer(34962,ie);for(let be=0;be<N.locationSize;be++)D(N.location+be,A/N.locationSize,le,re,xe*oe,(me+A/N.locationSize*be)*oe)}else{if(J.isInstancedBufferAttribute){for(let te=0;te<N.locationSize;te++)S(N.location+te,J.meshPerAttribute);L.isInstancedMesh!==!0&&ee._maxInstanceCount===void 0&&(ee._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let te=0;te<N.locationSize;te++)T(N.location+te);r.bindBuffer(34962,ie);for(let te=0;te<N.locationSize;te++)D(N.location+te,A/N.locationSize,le,re,A*oe,A/N.locationSize*te*oe)}}else if(Y!==void 0){let re=Y[ne];if(re!==void 0)switch(re.length){case 2:r.vertexAttrib2fv(N.location,re);break;case 3:r.vertexAttrib3fv(N.location,re);break;case 4:r.vertexAttrib4fv(N.location,re);break;default:r.vertexAttrib1fv(N.location,re)}}}}R()}function E(){K();for(let L in a){let k=a[L];for(let $ in k){let ee=k[$];for(let B in ee)x(ee[B].object),delete ee[B];delete k[$]}delete a[L]}}function I(L){if(a[L.id]===void 0)return;let k=a[L.id];for(let $ in k){let ee=k[$];for(let B in ee)x(ee[B].object),delete ee[B];delete k[$]}delete a[L.id]}function U(L){for(let k in a){let $=a[k];if($[L.id]===void 0)continue;let ee=$[L.id];for(let B in ee)x(ee[B].object),delete ee[B];delete $[L.id]}}function K(){z(),h=!0,c!==l&&(c=l,m(c.object))}function z(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:p,reset:K,resetDefaultState:z,dispose:E,releaseStatesOfGeometry:I,releaseStatesOfProgram:U,initAttributes:_,enableAttribute:T,disableUnusedAttributes:R}}function Su(r,e,t,n){let i=n.isWebGL2,s;function o(c){s=c}function a(c,h){r.drawArrays(s,c,h),t.update(h,s,1)}function l(c,h,p){if(p===0)return;let u,m;if(i)u=r,m="drawArraysInstanced";else if(u=e.get("ANGLE_instanced_arrays"),m="drawArraysInstancedANGLE",u===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}u[m](s,c,h,p),t.update(h,s,p)}this.setMode=o,this.render=a,this.renderInstances=l}function wu(r,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){let D=e.get("EXT_texture_filter_anisotropic");n=r.getParameter(D.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(D){if(D==="highp"){if(r.getShaderPrecisionFormat(35633,36338).precision>0&&r.getShaderPrecisionFormat(35632,36338).precision>0)return"highp";D="mediump"}return D==="mediump"&&r.getShaderPrecisionFormat(35633,36337).precision>0&&r.getShaderPrecisionFormat(35632,36337).precision>0?"mediump":"lowp"}let o=typeof WebGL2RenderingContext!="undefined"&&r instanceof WebGL2RenderingContext,a=t.precision!==void 0?t.precision:"highp",l=s(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);let c=o||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,p=r.getParameter(34930),u=r.getParameter(35660),m=r.getParameter(3379),x=r.getParameter(34076),f=r.getParameter(34921),d=r.getParameter(36347),M=r.getParameter(36348),w=r.getParameter(36349),_=u>0,T=o||e.has("OES_texture_float"),S=_&&T,R=o?r.getParameter(36183):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:i,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:h,maxTextures:p,maxVertexTextures:u,maxTextureSize:m,maxCubemapSize:x,maxAttributes:f,maxVertexUniforms:d,maxVaryings:M,maxFragmentUniforms:w,vertexTextures:_,floatFragmentTextures:T,floatVertexTextures:S,maxSamples:R}}function Tu(r){let e=this,t=null,n=0,i=!1,s=!1,o=new Zt,a=new vt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(p,u){let m=p.length!==0||u||n!==0||i;return i=u,n=p.length,m},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(p,u){t=h(p,u,0)},this.setState=function(p,u,m){let x=p.clippingPlanes,f=p.clipIntersection,d=p.clipShadows,M=r.get(p);if(!i||x===null||x.length===0||s&&!d)s?h(null):c();else{let w=s?0:n,_=w*4,T=M.clippingState||null;l.value=T,T=h(x,u,_,m);for(let S=0;S!==_;++S)T[S]=t[S];M.clippingState=T,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(p,u,m,x){let f=p!==null?p.length:0,d=null;if(f!==0){if(d=l.value,x!==!0||d===null){let M=m+f*4,w=u.matrixWorldInverse;a.getNormalMatrix(w),(d===null||d.length<M)&&(d=new Float32Array(M));for(let _=0,T=m;_!==f;++_,T+=4)o.copy(p[_]).applyMatrix4(w,a),o.normal.toArray(d,T),d[T+3]=o.constant}l.value=d,l.needsUpdate=!0}return e.numPlanes=f,e.numIntersection=0,d}}function Eu(r){let e=new WeakMap;function t(o,a){return a===js?o.mapping=Zn:a===Qs&&(o.mapping=Jn),o}function n(o){if(o&&o.isTexture&&o.isRenderTargetTexture===!1){let a=o.mapping;if(a===js||a===Qs)if(e.has(o)){let l=e.get(o).texture;return t(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new sr(l.height/2);return c.fromEquirectangularTexture(r,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){let a=o.target;a.removeEventListener("dispose",i);let l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}var ar=class extends Tn{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Hn=4,Fa=[.125,.215,.35,.446,.526,.582],_n=20,Zs=new ar,Na=new Ue,Js=null,vn=(1+Math.sqrt(5))/2,kn=1/vn,Oa=[new O(1,1,1),new O(-1,1,1),new O(1,1,-1),new O(-1,1,-1),new O(0,vn,kn),new O(0,vn,-kn),new O(kn,0,vn),new O(-kn,0,vn),new O(vn,kn,0),new O(-vn,kn,0)],cs=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){Js=this._renderer.getRenderTarget(),this._setSize(256);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ba(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ua(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Js),e.scissorTest=!1,Zi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Zn||e.mapping===Jn?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Js=this._renderer.getRenderTarget();let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:it,minFilter:it,generateMipmaps:!1,type:ln,format:xt,encoding:Sn,depthBuffer:!1},i=za(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=za(e,t,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Au(s)),this._blurMaterial=Cu(s,e,t)}return i}_compileMaterial(e){let t=new ot(this._lodPlanes[0],e);this._renderer.compile(t,Zs)}_sceneToCubeUV(e,t,n,i){let a=new gt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,p=h.autoClear,u=h.toneMapping;h.getClearColor(Na),h.toneMapping=$t,h.autoClear=!1;let m=new ss({name:"PMREM.Background",side:At,depthWrite:!1,depthTest:!1}),x=new ot(new Si,m),f=!1,d=e.background;d?d.isColor&&(m.color.copy(d),e.background=null,f=!0):(m.color.copy(Na),f=!0);for(let M=0;M<6;M++){let w=M%3;w===0?(a.up.set(0,l[M],0),a.lookAt(c[M],0,0)):w===1?(a.up.set(0,0,l[M]),a.lookAt(0,c[M],0)):(a.up.set(0,l[M],0),a.lookAt(0,0,c[M]));let _=this._cubeSize;Zi(i,w*_,M>2?_:0,_,_),h.setRenderTarget(i),f&&h.render(x,a),h.render(e,a)}x.geometry.dispose(),x.material.dispose(),h.toneMapping=u,h.autoClear=p,e.background=d}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===Zn||e.mapping===Jn;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ba()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ua());let s=i?this._cubemapMaterial:this._equirectMaterial,o=new ot(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;let l=this._cubeSize;Zi(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Zs)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){let s=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),o=Oa[(i-1)%Oa.length];this._blur(e,i-1,i,s,o)}t.autoClear=n}_blur(e,t,n,i,s){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,p=new ot(this._lodPlanes[i],c),u=c.uniforms,m=this._sizeLods[n]-1,x=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*_n-1),f=s/x,d=isFinite(s)?1+Math.floor(h*f):_n;d>_n&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${d} samples when the maximum is set to ${_n}`);let M=[],w=0;for(let D=0;D<_n;++D){let v=D/f,E=Math.exp(-v*v/2);M.push(E),D===0?w+=E:D<d&&(w+=2*E)}for(let D=0;D<M.length;D++)M[D]=M[D]/w;u.envMap.value=e.texture,u.samples.value=d,u.weights.value=M,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);let{_lodMax:_}=this;u.dTheta.value=x,u.mipInt.value=_-n;let T=this._sizeLods[i],S=3*T*(i>_-Hn?i-_+Hn:0),R=4*(this._cubeSize-T);Zi(t,S,R,3*T,2*T),l.setRenderTarget(t),l.render(p,Zs)}};function Au(r){let e=[],t=[],n=[],i=r,s=r-Hn+1+Fa.length;for(let o=0;o<s;o++){let a=Math.pow(2,i);t.push(a);let l=1/a;o>r-Hn?l=Fa[o-r+Hn-1]:o===0&&(l=0),n.push(l);let c=1/(a-2),h=-c,p=1+c,u=[h,h,p,h,p,p,h,h,p,p,h,p],m=6,x=6,f=3,d=2,M=1,w=new Float32Array(f*x*m),_=new Float32Array(d*x*m),T=new Float32Array(M*x*m);for(let R=0;R<m;R++){let D=R%3*2/3-1,v=R>2?0:-1,E=[D,v,0,D+2/3,v,0,D+2/3,v+1,0,D,v,0,D+2/3,v+1,0,D,v+1,0];w.set(E,f*x*R),_.set(u,d*x*R);let I=[R,R,R,R,R,R];T.set(I,M*x*R)}let S=new Nt;S.setAttribute("position",new Ye(w,f)),S.setAttribute("uv",new Ye(_,d)),S.setAttribute("faceIndex",new Ye(T,M)),e.push(S),i>Hn&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function za(r,e,t){let n=new ct(r,e,t);return n.texture.mapping=us,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Zi(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function Cu(r,e,t){let n=new Float32Array(_n),i=new O(0,1,0);return new Lt({name:"SphericalGaussianBlur",defines:{n:_n,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Lr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:an,depthTest:!1,depthWrite:!1})}function Ua(){return new Lt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Lr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:an,depthTest:!1,depthWrite:!1})}function Ba(){return new Lt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Lr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:an,depthTest:!1,depthWrite:!1})}function Lr(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Ru(r){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let l=a.mapping,c=l===js||l===Qs,h=l===Zn||l===Jn;if(c||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let p=e.get(a);return t===null&&(t=new cs(r)),p=c?t.fromEquirectangular(a,p):t.fromCubemap(a,p),e.set(a,p),p.texture}else{if(e.has(a))return e.get(a).texture;{let p=a.image;if(c&&p&&p.height>0||h&&p&&i(p)){t===null&&(t=new cs(r));let u=c?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,u),a.addEventListener("dispose",s),u.texture}else return null}}}return a}function i(a){let l=0,c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function s(a){let l=a.target;l.removeEventListener("dispose",s);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Lu(r){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?t("EXT_color_buffer_float"):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){let i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Pu(r,e,t,n){let i={},s=new WeakMap;function o(p){let u=p.target;u.index!==null&&e.remove(u.index);for(let x in u.attributes)e.remove(u.attributes[x]);u.removeEventListener("dispose",o),delete i[u.id];let m=s.get(u);m&&(e.remove(m),s.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function a(p,u){return i[u.id]===!0||(u.addEventListener("dispose",o),i[u.id]=!0,t.memory.geometries++),u}function l(p){let u=p.attributes;for(let x in u)e.update(u[x],34962);let m=p.morphAttributes;for(let x in m){let f=m[x];for(let d=0,M=f.length;d<M;d++)e.update(f[d],34962)}}function c(p){let u=[],m=p.index,x=p.attributes.position,f=0;if(m!==null){let w=m.array;f=m.version;for(let _=0,T=w.length;_<T;_+=3){let S=w[_+0],R=w[_+1],D=w[_+2];u.push(S,R,R,D,D,S)}}else{let w=x.array;f=x.version;for(let _=0,T=w.length/3-1;_<T;_+=3){let S=_+0,R=_+1,D=_+2;u.push(S,R,R,D,D,S)}}let d=new(lo(u)?as:rs)(u,1);d.version=f;let M=s.get(p);M&&e.remove(M),s.set(p,d)}function h(p){let u=s.get(p);if(u){let m=p.index;m!==null&&u.version<m.version&&c(p)}else c(p);return s.get(p)}return{get:a,update:l,getWireframeAttribute:h}}function Du(r,e,t,n){let i=n.isWebGL2,s;function o(u){s=u}let a,l;function c(u){a=u.type,l=u.bytesPerElement}function h(u,m){r.drawElements(s,m,a,u*l),t.update(m,s,1)}function p(u,m,x){if(x===0)return;let f,d;if(i)f=r,d="drawElementsInstanced";else if(f=e.get("ANGLE_instanced_arrays"),d="drawElementsInstancedANGLE",f===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[d](s,m,a,u*l,x),t.update(m,s,x)}this.setMode=o,this.setIndex=c,this.render=h,this.renderInstances=p}function Iu(r){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case 4:t.triangles+=a*(s/3);break;case 1:t.lines+=a*(s/2);break;case 3:t.lines+=a*(s-1);break;case 2:t.lines+=a*s;break;case 0:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.frame++,t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Fu(r,e){return r[0]-e[0]}function Nu(r,e){return Math.abs(e[1])-Math.abs(r[1])}function Ou(r,e,t){let n={},i=new Float32Array(8),s=new WeakMap,o=new st,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,h,p){let u=c.morphTargetInfluences;if(e.isWebGL2===!0){let m=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,x=m!==void 0?m.length:0,f=s.get(h);if(f===void 0||f.count!==x){let L=function(){K.dispose(),s.delete(h),h.removeEventListener("dispose",L)};f!==void 0&&f.texture.dispose();let w=h.morphAttributes.position!==void 0,_=h.morphAttributes.normal!==void 0,T=h.morphAttributes.color!==void 0,S=h.morphAttributes.position||[],R=h.morphAttributes.normal||[],D=h.morphAttributes.color||[],v=0;w===!0&&(v=1),_===!0&&(v=2),T===!0&&(v=3);let E=h.attributes.position.count*v,I=1;E>e.maxTextureSize&&(I=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);let U=new Float32Array(E*I*4*x),K=new ts(U,E,I,x);K.type=Jt,K.needsUpdate=!0;let z=v*4;for(let k=0;k<x;k++){let $=S[k],ee=R[k],B=D[k],X=E*I*4*k;for(let Y=0;Y<$.count;Y++){let ne=Y*z;w===!0&&(o.fromBufferAttribute($,Y),U[X+ne+0]=o.x,U[X+ne+1]=o.y,U[X+ne+2]=o.z,U[X+ne+3]=0),_===!0&&(o.fromBufferAttribute(ee,Y),U[X+ne+4]=o.x,U[X+ne+5]=o.y,U[X+ne+6]=o.z,U[X+ne+7]=0),T===!0&&(o.fromBufferAttribute(B,Y),U[X+ne+8]=o.x,U[X+ne+9]=o.y,U[X+ne+10]=o.z,U[X+ne+11]=B.itemSize===4?o.w:1)}}f={count:x,texture:K,size:new Ee(E,I)},s.set(h,f),h.addEventListener("dispose",L)}let d=0;for(let w=0;w<u.length;w++)d+=u[w];let M=h.morphTargetsRelative?1:1-d;p.getUniforms().setValue(r,"morphTargetBaseInfluence",M),p.getUniforms().setValue(r,"morphTargetInfluences",u),p.getUniforms().setValue(r,"morphTargetsTexture",f.texture,t),p.getUniforms().setValue(r,"morphTargetsTextureSize",f.size)}else{let m=u===void 0?0:u.length,x=n[h.id];if(x===void 0||x.length!==m){x=[];for(let _=0;_<m;_++)x[_]=[_,0];n[h.id]=x}for(let _=0;_<m;_++){let T=x[_];T[0]=_,T[1]=u[_]}x.sort(Nu);for(let _=0;_<8;_++)_<m&&x[_][1]?(a[_][0]=x[_][0],a[_][1]=x[_][1]):(a[_][0]=Number.MAX_SAFE_INTEGER,a[_][1]=0);a.sort(Fu);let f=h.morphAttributes.position,d=h.morphAttributes.normal,M=0;for(let _=0;_<8;_++){let T=a[_],S=T[0],R=T[1];S!==Number.MAX_SAFE_INTEGER&&R?(f&&h.getAttribute("morphTarget"+_)!==f[S]&&h.setAttribute("morphTarget"+_,f[S]),d&&h.getAttribute("morphNormal"+_)!==d[S]&&h.setAttribute("morphNormal"+_,d[S]),i[_]=R,M+=R):(f&&h.hasAttribute("morphTarget"+_)===!0&&h.deleteAttribute("morphTarget"+_),d&&h.hasAttribute("morphNormal"+_)===!0&&h.deleteAttribute("morphNormal"+_),i[_]=0)}let w=h.morphTargetsRelative?1:1-M;p.getUniforms().setValue(r,"morphTargetBaseInfluence",w),p.getUniforms().setValue(r,"morphTargetInfluences",i)}}return{update:l}}function zu(r,e,t,n){let i=new WeakMap;function s(l){let c=n.render.frame,h=l.geometry,p=e.get(l,h);return i.get(p)!==c&&(e.update(p),i.set(p,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),t.update(l.instanceMatrix,34962),l.instanceColor!==null&&t.update(l.instanceColor,34962)),p}function o(){i=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}var fo=new yt,po=new ts,mo=new tr,go=new os,ka=[],Va=[],Ha=new Float32Array(16),Ga=new Float32Array(9),Wa=new Float32Array(4);function ni(r,e,t){let n=r[0];if(n<=0||n>0)return r;let i=e*t,s=ka[i];if(s===void 0&&(s=new Float32Array(i),ka[i]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,r[o].toArray(s,a)}return s}function Ke(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function je(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function ds(r,e){let t=Va[e];t===void 0&&(t=new Int32Array(e),Va[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function Uu(r,e){let t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function Bu(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ke(t,e))return;r.uniform2fv(this.addr,e),je(t,e)}}function ku(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ke(t,e))return;r.uniform3fv(this.addr,e),je(t,e)}}function Vu(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ke(t,e))return;r.uniform4fv(this.addr,e),je(t,e)}}function Hu(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ke(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),je(t,e)}else{if(Ke(t,n))return;Wa.set(n),r.uniformMatrix2fv(this.addr,!1,Wa),je(t,n)}}function Gu(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ke(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),je(t,e)}else{if(Ke(t,n))return;Ga.set(n),r.uniformMatrix3fv(this.addr,!1,Ga),je(t,n)}}function Wu(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ke(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),je(t,e)}else{if(Ke(t,n))return;Ha.set(n),r.uniformMatrix4fv(this.addr,!1,Ha),je(t,n)}}function qu(r,e){let t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function Xu(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ke(t,e))return;r.uniform2iv(this.addr,e),je(t,e)}}function Yu(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ke(t,e))return;r.uniform3iv(this.addr,e),je(t,e)}}function Zu(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ke(t,e))return;r.uniform4iv(this.addr,e),je(t,e)}}function Ju(r,e){let t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function $u(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ke(t,e))return;r.uniform2uiv(this.addr,e),je(t,e)}}function Ku(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ke(t,e))return;r.uniform3uiv(this.addr,e),je(t,e)}}function ju(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ke(t,e))return;r.uniform4uiv(this.addr,e),je(t,e)}}function Qu(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2D(e||fo,i)}function ed(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||mo,i)}function td(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||go,i)}function nd(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||po,i)}function id(r){switch(r){case 5126:return Uu;case 35664:return Bu;case 35665:return ku;case 35666:return Vu;case 35674:return Hu;case 35675:return Gu;case 35676:return Wu;case 5124:case 35670:return qu;case 35667:case 35671:return Xu;case 35668:case 35672:return Yu;case 35669:case 35673:return Zu;case 5125:return Ju;case 36294:return $u;case 36295:return Ku;case 36296:return ju;case 35678:case 36198:case 36298:case 36306:case 35682:return Qu;case 35679:case 36299:case 36307:return ed;case 35680:case 36300:case 36308:case 36293:return td;case 36289:case 36303:case 36311:case 36292:return nd}}function sd(r,e){r.uniform1fv(this.addr,e)}function rd(r,e){let t=ni(e,this.size,2);r.uniform2fv(this.addr,t)}function ad(r,e){let t=ni(e,this.size,3);r.uniform3fv(this.addr,t)}function od(r,e){let t=ni(e,this.size,4);r.uniform4fv(this.addr,t)}function ld(r,e){let t=ni(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function cd(r,e){let t=ni(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function hd(r,e){let t=ni(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function ud(r,e){r.uniform1iv(this.addr,e)}function dd(r,e){r.uniform2iv(this.addr,e)}function fd(r,e){r.uniform3iv(this.addr,e)}function pd(r,e){r.uniform4iv(this.addr,e)}function md(r,e){r.uniform1uiv(this.addr,e)}function gd(r,e){r.uniform2uiv(this.addr,e)}function xd(r,e){r.uniform3uiv(this.addr,e)}function vd(r,e){r.uniform4uiv(this.addr,e)}function _d(r,e,t){let n=this.cache,i=e.length,s=ds(t,i);Ke(n,s)||(r.uniform1iv(this.addr,s),je(n,s));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||fo,s[o])}function yd(r,e,t){let n=this.cache,i=e.length,s=ds(t,i);Ke(n,s)||(r.uniform1iv(this.addr,s),je(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||mo,s[o])}function Md(r,e,t){let n=this.cache,i=e.length,s=ds(t,i);Ke(n,s)||(r.uniform1iv(this.addr,s),je(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||go,s[o])}function bd(r,e,t){let n=this.cache,i=e.length,s=ds(t,i);Ke(n,s)||(r.uniform1iv(this.addr,s),je(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||po,s[o])}function Sd(r){switch(r){case 5126:return sd;case 35664:return rd;case 35665:return ad;case 35666:return od;case 35674:return ld;case 35675:return cd;case 35676:return hd;case 5124:case 35670:return ud;case 35667:case 35671:return dd;case 35668:case 35672:return fd;case 35669:case 35673:return pd;case 5125:return md;case 36294:return gd;case 36295:return xd;case 36296:return vd;case 35678:case 36198:case 36298:case 36306:case 35682:return _d;case 35679:case 36299:case 36307:return yd;case 35680:case 36300:case 36308:case 36293:return Md;case 36289:case 36303:case 36311:case 36292:return bd}}var or=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.setValue=id(t.type)}},lr=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.size=t.size,this.setValue=Sd(t.type)}},cr=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let s=0,o=i.length;s!==o;++s){let a=i[s];a.setValue(e,t[a.id],n)}}},$s=/(\w+)(\])?(\[|\.)?/g;function qa(r,e){r.seq.push(e),r.map[e.id]=e}function wd(r,e,t){let n=r.name,i=n.length;for($s.lastIndex=0;;){let s=$s.exec(n),o=$s.lastIndex,a=s[1],l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){qa(t,c===void 0?new or(a,r,e):new lr(a,r,e));break}else{let p=t.map[a];p===void 0&&(p=new cr(a),qa(t,p)),t=p}}}var Yn=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,35718);for(let i=0;i<n;++i){let s=e.getActiveUniform(t,i),o=e.getUniformLocation(t,s.name);wd(s,o,this)}}setValue(e,t,n,i){let s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){let a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,s=e.length;i!==s;++i){let o=e[i];o.id in t&&n.push(o)}return n}};function Xa(r,e,t){let n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}var Td=0;function Ed(r,e){let t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function Ad(r){switch(r){case Sn:return["Linear","( value )"];case Be:return["sRGB","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported encoding:",r),["Linear","( value )"]}}function Ya(r,e,t){let n=r.getShaderParameter(e,35713),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";let s=/ERROR: 0:(\d+)/.exec(i);if(s){let o=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+Ed(r.getShaderSource(e),o)}else return i}function Cd(r,e){let t=Ad(e);return"vec4 "+r+"( vec4 value ) { return LinearTo"+t[0]+t[1]+"; }"}function Rd(r,e){let t;switch(e){case Yo:t="Linear";break;case Zo:t="Reinhard";break;case Jo:t="OptimizedCineon";break;case $o:t="ACESFilmic";break;case Ko:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Ld(r){return[r.extensionDerivatives||r.envMapCubeUVHeight||r.bumpMap||r.tangentSpaceNormalMap||r.clearcoatNormalMap||r.flatShading||r.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(r.extensionFragDepth||r.logarithmicDepthBuffer)&&r.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",r.extensionDrawBuffers&&r.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(r.extensionShaderTextureLOD||r.envMap||r.transmission)&&r.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(mi).join(`
`)}function Pd(r){let e=[];for(let t in r){let n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Dd(r,e){let t={},n=r.getProgramParameter(e,35721);for(let i=0;i<n;i++){let s=r.getActiveAttrib(e,i),o=s.name,a=1;s.type===35674&&(a=2),s.type===35675&&(a=3),s.type===35676&&(a=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:a}}return t}function mi(r){return r!==""}function Za(r,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ja(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Id=/^[ \t]*#include +<([\w\d./]+)>/gm;function hr(r){return r.replace(Id,Fd)}function Fd(r,e){let t=Ae[e];if(t===void 0)throw new Error("Can not resolve #include <"+e+">");return hr(t)}var Nd=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function $a(r){return r.replace(Nd,Od)}function Od(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Ka(r){let e="precision "+r.precision+` float;
precision `+r.precision+" int;";return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function zd(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===to?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===To?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===pi&&(e="SHADOWMAP_TYPE_VSM"),e}function Ud(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Zn:case Jn:e="ENVMAP_TYPE_CUBE";break;case us:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Bd(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Jn:e="ENVMAP_MODE_REFRACTION";break}return e}function kd(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case so:e="ENVMAP_BLENDING_MULTIPLY";break;case qo:e="ENVMAP_BLENDING_MIX";break;case Xo:e="ENVMAP_BLENDING_ADD";break}return e}function Vd(r){let e=r.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Hd(r,e,t,n){let i=r.getContext(),s=t.defines,o=t.vertexShader,a=t.fragmentShader,l=zd(t),c=Ud(t),h=Bd(t),p=kd(t),u=Vd(t),m=t.isWebGL2?"":Ld(t),x=Pd(s),f=i.createProgram(),d,M,w=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(d=[x].filter(mi).join(`
`),d.length>0&&(d+=`
`),M=[m,x].filter(mi).join(`
`),M.length>0&&(M+=`
`)):(d=[Ka(t),"#define SHADER_NAME "+t.shaderName,x,t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.supportsVertexTextures?"#define VERTEX_TEXTURES":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMap&&t.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",t.normalMap&&t.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.displacementMap&&t.supportsVertexTextures?"#define USE_DISPLACEMENTMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",t.specularColorMap?"#define USE_SPECULARCOLORMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEENCOLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs?"#define USE_UV":"",t.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(mi).join(`
`),M=[m,Ka(t),"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+p:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMap&&t.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",t.normalMap&&t.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",t.specularColorMap?"#define USE_SPECULARCOLORMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEENCOLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs?"#define USE_UV":"",t.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==$t?"#define TONE_MAPPING":"",t.toneMapping!==$t?Ae.tonemapping_pars_fragment:"",t.toneMapping!==$t?Rd("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ae.encodings_pars_fragment,Cd("linearToOutputTexel",t.outputEncoding),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(mi).join(`
`)),o=hr(o),o=Za(o,t),o=Ja(o,t),a=hr(a),a=Za(a,t),a=Ja(a,t),o=$a(o),a=$a(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,d=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,M=["#define varying in",t.glslVersion===ya?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ya?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+M);let _=w+d+o,T=w+M+a,S=Xa(i,35633,_),R=Xa(i,35632,T);if(i.attachShader(f,S),i.attachShader(f,R),t.index0AttributeName!==void 0?i.bindAttribLocation(f,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(f,0,"position"),i.linkProgram(f),r.debug.checkShaderErrors){let E=i.getProgramInfoLog(f).trim(),I=i.getShaderInfoLog(S).trim(),U=i.getShaderInfoLog(R).trim(),K=!0,z=!0;if(i.getProgramParameter(f,35714)===!1){K=!1;let L=Ya(i,S,"vertex"),k=Ya(i,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(f,35715)+`

Program Info Log: `+E+`
`+L+`
`+k)}else E!==""?console.warn("THREE.WebGLProgram: Program Info Log:",E):(I===""||U==="")&&(z=!1);z&&(this.diagnostics={runnable:K,programLog:E,vertexShader:{log:I,prefix:d},fragmentShader:{log:U,prefix:M}})}i.deleteShader(S),i.deleteShader(R);let D;this.getUniforms=function(){return D===void 0&&(D=new Yn(i,f)),D};let v;return this.getAttributes=function(){return v===void 0&&(v=Dd(i,f)),v},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(f),this.program=void 0},this.name=t.shaderName,this.id=Td++,this.cacheKey=e,this.usedTimes=1,this.program=f,this.vertexShader=S,this.fragmentShader=R,this}var Gd=0,ur=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new dr(e),t.set(e,n)),n}},dr=class{constructor(e){this.id=Gd++,this.code=e,this.usedTimes=0}};function Wd(r,e,t,n,i,s,o){let a=new is,l=new ur,c=[],h=i.isWebGL2,p=i.logarithmicDepthBuffer,u=i.vertexTextures,m=i.precision,x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function f(v,E,I,U,K){let z=U.fog,L=K.geometry,k=v.isMeshStandardMaterial?U.environment:null,$=(v.isMeshStandardMaterial?t:e).get(v.envMap||k),ee=$&&$.mapping===us?$.image.height:null,B=x[v.type];v.precision!==null&&(m=i.getMaxPrecision(v.precision),m!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",m,"instead."));let X=L.morphAttributes.position||L.morphAttributes.normal||L.morphAttributes.color,Y=X!==void 0?X.length:0,ne=0;L.morphAttributes.position!==void 0&&(ne=1),L.morphAttributes.normal!==void 0&&(ne=2),L.morphAttributes.color!==void 0&&(ne=3);let N,J,re,A;if(B){let xe=Vt[B];N=xe.vertexShader,J=xe.fragmentShader}else N=v.vertexShader,J=v.fragmentShader,l.update(v),re=l.getVertexShaderID(v),A=l.getFragmentShaderID(v);let Z=r.getRenderTarget(),ie=v.alphaTest>0,le=v.clearcoat>0,oe=v.iridescence>0;return{isWebGL2:h,shaderID:B,shaderName:v.type,vertexShader:N,fragmentShader:J,defines:v.defines,customVertexShaderID:re,customFragmentShaderID:A,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:m,instancing:K.isInstancedMesh===!0,instancingColor:K.isInstancedMesh===!0&&K.instanceColor!==null,supportsVertexTextures:u,outputEncoding:Z===null?r.outputEncoding:Z.isXRRenderTarget===!0?Z.texture.encoding:Sn,map:!!v.map,matcap:!!v.matcap,envMap:!!$,envMapMode:$&&$.mapping,envMapCubeUVHeight:ee,lightMap:!!v.lightMap,aoMap:!!v.aoMap,emissiveMap:!!v.emissiveMap,bumpMap:!!v.bumpMap,normalMap:!!v.normalMap,objectSpaceNormalMap:v.normalMapType===ml,tangentSpaceNormalMap:v.normalMapType===pl,decodeVideoTexture:!!v.map&&v.map.isVideoTexture===!0&&v.map.encoding===Be,clearcoat:le,clearcoatMap:le&&!!v.clearcoatMap,clearcoatRoughnessMap:le&&!!v.clearcoatRoughnessMap,clearcoatNormalMap:le&&!!v.clearcoatNormalMap,iridescence:oe,iridescenceMap:oe&&!!v.iridescenceMap,iridescenceThicknessMap:oe&&!!v.iridescenceThicknessMap,displacementMap:!!v.displacementMap,roughnessMap:!!v.roughnessMap,metalnessMap:!!v.metalnessMap,specularMap:!!v.specularMap,specularIntensityMap:!!v.specularIntensityMap,specularColorMap:!!v.specularColorMap,opaque:v.transparent===!1&&v.blending===Wn,alphaMap:!!v.alphaMap,alphaTest:ie,gradientMap:!!v.gradientMap,sheen:v.sheen>0,sheenColorMap:!!v.sheenColorMap,sheenRoughnessMap:!!v.sheenRoughnessMap,transmission:v.transmission>0,transmissionMap:!!v.transmissionMap,thicknessMap:!!v.thicknessMap,combine:v.combine,vertexTangents:!!v.normalMap&&!!L.attributes.tangent,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!L.attributes.color&&L.attributes.color.itemSize===4,vertexUvs:!!v.map||!!v.bumpMap||!!v.normalMap||!!v.specularMap||!!v.alphaMap||!!v.emissiveMap||!!v.roughnessMap||!!v.metalnessMap||!!v.clearcoatMap||!!v.clearcoatRoughnessMap||!!v.clearcoatNormalMap||!!v.iridescenceMap||!!v.iridescenceThicknessMap||!!v.displacementMap||!!v.transmissionMap||!!v.thicknessMap||!!v.specularIntensityMap||!!v.specularColorMap||!!v.sheenColorMap||!!v.sheenRoughnessMap,uvsVertexOnly:!(v.map||v.bumpMap||v.normalMap||v.specularMap||v.alphaMap||v.emissiveMap||v.roughnessMap||v.metalnessMap||v.clearcoatNormalMap||v.iridescenceMap||v.iridescenceThicknessMap||v.transmission>0||v.transmissionMap||v.thicknessMap||v.specularIntensityMap||v.specularColorMap||v.sheen>0||v.sheenColorMap||v.sheenRoughnessMap)&&!!v.displacementMap,fog:!!z,useFog:v.fog===!0,fogExp2:z&&z.isFogExp2,flatShading:!!v.flatShading,sizeAttenuation:v.sizeAttenuation,logarithmicDepthBuffer:p,skinning:K.isSkinnedMesh===!0,morphTargets:L.morphAttributes.position!==void 0,morphNormals:L.morphAttributes.normal!==void 0,morphColors:L.morphAttributes.color!==void 0,morphTargetsCount:Y,morphTextureStride:ne,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:v.dithering,shadowMapEnabled:r.shadowMap.enabled&&I.length>0,shadowMapType:r.shadowMap.type,toneMapping:v.toneMapped?r.toneMapping:$t,useLegacyLights:r.useLegacyLights,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===sn,flipSided:v.side===At,useDepthPacking:!!v.depthPacking,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionDerivatives:v.extensions&&v.extensions.derivatives,extensionFragDepth:v.extensions&&v.extensions.fragDepth,extensionDrawBuffers:v.extensions&&v.extensions.drawBuffers,extensionShaderTextureLOD:v.extensions&&v.extensions.shaderTextureLOD,rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),customProgramCacheKey:v.customProgramCacheKey()}}function d(v){let E=[];if(v.shaderID?E.push(v.shaderID):(E.push(v.customVertexShaderID),E.push(v.customFragmentShaderID)),v.defines!==void 0)for(let I in v.defines)E.push(I),E.push(v.defines[I]);return v.isRawShaderMaterial===!1&&(M(E,v),w(E,v),E.push(r.outputEncoding)),E.push(v.customProgramCacheKey),E.join()}function M(v,E){v.push(E.precision),v.push(E.outputEncoding),v.push(E.envMapMode),v.push(E.envMapCubeUVHeight),v.push(E.combine),v.push(E.vertexUvs),v.push(E.fogExp2),v.push(E.sizeAttenuation),v.push(E.morphTargetsCount),v.push(E.morphAttributeCount),v.push(E.numDirLights),v.push(E.numPointLights),v.push(E.numSpotLights),v.push(E.numSpotLightMaps),v.push(E.numHemiLights),v.push(E.numRectAreaLights),v.push(E.numDirLightShadows),v.push(E.numPointLightShadows),v.push(E.numSpotLightShadows),v.push(E.numSpotLightShadowsWithMaps),v.push(E.shadowMapType),v.push(E.toneMapping),v.push(E.numClippingPlanes),v.push(E.numClipIntersection),v.push(E.depthPacking)}function w(v,E){a.disableAll(),E.isWebGL2&&a.enable(0),E.supportsVertexTextures&&a.enable(1),E.instancing&&a.enable(2),E.instancingColor&&a.enable(3),E.map&&a.enable(4),E.matcap&&a.enable(5),E.envMap&&a.enable(6),E.lightMap&&a.enable(7),E.aoMap&&a.enable(8),E.emissiveMap&&a.enable(9),E.bumpMap&&a.enable(10),E.normalMap&&a.enable(11),E.objectSpaceNormalMap&&a.enable(12),E.tangentSpaceNormalMap&&a.enable(13),E.clearcoat&&a.enable(14),E.clearcoatMap&&a.enable(15),E.clearcoatRoughnessMap&&a.enable(16),E.clearcoatNormalMap&&a.enable(17),E.iridescence&&a.enable(18),E.iridescenceMap&&a.enable(19),E.iridescenceThicknessMap&&a.enable(20),E.displacementMap&&a.enable(21),E.specularMap&&a.enable(22),E.roughnessMap&&a.enable(23),E.metalnessMap&&a.enable(24),E.gradientMap&&a.enable(25),E.alphaMap&&a.enable(26),E.alphaTest&&a.enable(27),E.vertexColors&&a.enable(28),E.vertexAlphas&&a.enable(29),E.vertexUvs&&a.enable(30),E.vertexTangents&&a.enable(31),E.uvsVertexOnly&&a.enable(32),v.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.skinning&&a.enable(4),E.morphTargets&&a.enable(5),E.morphNormals&&a.enable(6),E.morphColors&&a.enable(7),E.premultipliedAlpha&&a.enable(8),E.shadowMapEnabled&&a.enable(9),E.useLegacyLights&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.specularIntensityMap&&a.enable(15),E.specularColorMap&&a.enable(16),E.transmission&&a.enable(17),E.transmissionMap&&a.enable(18),E.thicknessMap&&a.enable(19),E.sheen&&a.enable(20),E.sheenColorMap&&a.enable(21),E.sheenRoughnessMap&&a.enable(22),E.decodeVideoTexture&&a.enable(23),E.opaque&&a.enable(24),v.push(a.mask)}function _(v){let E=x[v.type],I;if(E){let U=Vt[E];I=zl.clone(U.uniforms)}else I=v.uniforms;return I}function T(v,E){let I;for(let U=0,K=c.length;U<K;U++){let z=c[U];if(z.cacheKey===E){I=z,++I.usedTimes;break}}return I===void 0&&(I=new Hd(r,E,v,s),c.push(I)),I}function S(v){if(--v.usedTimes===0){let E=c.indexOf(v);c[E]=c[c.length-1],c.pop(),v.destroy()}}function R(v){l.remove(v)}function D(){l.dispose()}return{getParameters:f,getProgramCacheKey:d,getUniforms:_,acquireProgram:T,releaseProgram:S,releaseShaderCache:R,programs:c,dispose:D}}function qd(){let r=new WeakMap;function e(s){let o=r.get(s);return o===void 0&&(o={},r.set(s,o)),o}function t(s){r.delete(s)}function n(s,o,a){r.get(s)[o]=a}function i(){r=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function Xd(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function ja(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Qa(){let r=[],e=0,t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(p,u,m,x,f,d){let M=r[e];return M===void 0?(M={id:p.id,object:p,geometry:u,material:m,groupOrder:x,renderOrder:p.renderOrder,z:f,group:d},r[e]=M):(M.id=p.id,M.object=p,M.geometry=u,M.material=m,M.groupOrder=x,M.renderOrder=p.renderOrder,M.z=f,M.group=d),e++,M}function a(p,u,m,x,f,d){let M=o(p,u,m,x,f,d);m.transmission>0?n.push(M):m.transparent===!0?i.push(M):t.push(M)}function l(p,u,m,x,f,d){let M=o(p,u,m,x,f,d);m.transmission>0?n.unshift(M):m.transparent===!0?i.unshift(M):t.unshift(M)}function c(p,u){t.length>1&&t.sort(p||Xd),n.length>1&&n.sort(u||ja),i.length>1&&i.sort(u||ja)}function h(){for(let p=e,u=r.length;p<u;p++){let m=r[p];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:h,sort:c}}function Yd(){let r=new WeakMap;function e(n,i){let s=r.get(n),o;return s===void 0?(o=new Qa,r.set(n,[o])):i>=s.length?(o=new Qa,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function Zd(){let r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new O,color:new Ue};break;case"SpotLight":t={position:new O,direction:new O,color:new Ue,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new O,color:new Ue,distance:0,decay:0};break;case"HemisphereLight":t={direction:new O,skyColor:new Ue,groundColor:new Ue};break;case"RectAreaLight":t={color:new Ue,position:new O,halfWidth:new O,halfHeight:new O};break}return r[e.id]=t,t}}}function Jd(){let r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}var $d=0;function Kd(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function jd(r,e){let t=new Zd,n=Jd(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0};for(let h=0;h<9;h++)i.probe.push(new O);let s=new O,o=new lt,a=new lt;function l(h,p){let u=0,m=0,x=0;for(let U=0;U<9;U++)i.probe[U].set(0,0,0);let f=0,d=0,M=0,w=0,_=0,T=0,S=0,R=0,D=0,v=0;h.sort(Kd);let E=p===!0?Math.PI:1;for(let U=0,K=h.length;U<K;U++){let z=h[U],L=z.color,k=z.intensity,$=z.distance,ee=z.shadow&&z.shadow.map?z.shadow.map.texture:null;if(z.isAmbientLight)u+=L.r*k*E,m+=L.g*k*E,x+=L.b*k*E;else if(z.isLightProbe)for(let B=0;B<9;B++)i.probe[B].addScaledVector(z.sh.coefficients[B],k);else if(z.isDirectionalLight){let B=t.get(z);if(B.color.copy(z.color).multiplyScalar(z.intensity*E),z.castShadow){let X=z.shadow,Y=n.get(z);Y.shadowBias=X.bias,Y.shadowNormalBias=X.normalBias,Y.shadowRadius=X.radius,Y.shadowMapSize=X.mapSize,i.directionalShadow[f]=Y,i.directionalShadowMap[f]=ee,i.directionalShadowMatrix[f]=z.shadow.matrix,T++}i.directional[f]=B,f++}else if(z.isSpotLight){let B=t.get(z);B.position.setFromMatrixPosition(z.matrixWorld),B.color.copy(L).multiplyScalar(k*E),B.distance=$,B.coneCos=Math.cos(z.angle),B.penumbraCos=Math.cos(z.angle*(1-z.penumbra)),B.decay=z.decay,i.spot[M]=B;let X=z.shadow;if(z.map&&(i.spotLightMap[D]=z.map,D++,X.updateMatrices(z),z.castShadow&&v++),i.spotLightMatrix[M]=X.matrix,z.castShadow){let Y=n.get(z);Y.shadowBias=X.bias,Y.shadowNormalBias=X.normalBias,Y.shadowRadius=X.radius,Y.shadowMapSize=X.mapSize,i.spotShadow[M]=Y,i.spotShadowMap[M]=ee,R++}M++}else if(z.isRectAreaLight){let B=t.get(z);B.color.copy(L).multiplyScalar(k),B.halfWidth.set(z.width*.5,0,0),B.halfHeight.set(0,z.height*.5,0),i.rectArea[w]=B,w++}else if(z.isPointLight){let B=t.get(z);if(B.color.copy(z.color).multiplyScalar(z.intensity*E),B.distance=z.distance,B.decay=z.decay,z.castShadow){let X=z.shadow,Y=n.get(z);Y.shadowBias=X.bias,Y.shadowNormalBias=X.normalBias,Y.shadowRadius=X.radius,Y.shadowMapSize=X.mapSize,Y.shadowCameraNear=X.camera.near,Y.shadowCameraFar=X.camera.far,i.pointShadow[d]=Y,i.pointShadowMap[d]=ee,i.pointShadowMatrix[d]=z.shadow.matrix,S++}i.point[d]=B,d++}else if(z.isHemisphereLight){let B=t.get(z);B.skyColor.copy(z.color).multiplyScalar(k*E),B.groundColor.copy(z.groundColor).multiplyScalar(k*E),i.hemi[_]=B,_++}}w>0&&(e.isWebGL2||r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ae.LTC_FLOAT_1,i.rectAreaLTC2=ae.LTC_FLOAT_2):r.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=ae.LTC_HALF_1,i.rectAreaLTC2=ae.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=u,i.ambient[1]=m,i.ambient[2]=x;let I=i.hash;(I.directionalLength!==f||I.pointLength!==d||I.spotLength!==M||I.rectAreaLength!==w||I.hemiLength!==_||I.numDirectionalShadows!==T||I.numPointShadows!==S||I.numSpotShadows!==R||I.numSpotMaps!==D)&&(i.directional.length=f,i.spot.length=M,i.rectArea.length=w,i.point.length=d,i.hemi.length=_,i.directionalShadow.length=T,i.directionalShadowMap.length=T,i.pointShadow.length=S,i.pointShadowMap.length=S,i.spotShadow.length=R,i.spotShadowMap.length=R,i.directionalShadowMatrix.length=T,i.pointShadowMatrix.length=S,i.spotLightMatrix.length=R+D-v,i.spotLightMap.length=D,i.numSpotLightShadowsWithMaps=v,I.directionalLength=f,I.pointLength=d,I.spotLength=M,I.rectAreaLength=w,I.hemiLength=_,I.numDirectionalShadows=T,I.numPointShadows=S,I.numSpotShadows=R,I.numSpotMaps=D,i.version=$d++)}function c(h,p){let u=0,m=0,x=0,f=0,d=0,M=p.matrixWorldInverse;for(let w=0,_=h.length;w<_;w++){let T=h[w];if(T.isDirectionalLight){let S=i.directional[u];S.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(M),u++}else if(T.isSpotLight){let S=i.spot[x];S.position.setFromMatrixPosition(T.matrixWorld),S.position.applyMatrix4(M),S.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(M),x++}else if(T.isRectAreaLight){let S=i.rectArea[f];S.position.setFromMatrixPosition(T.matrixWorld),S.position.applyMatrix4(M),a.identity(),o.copy(T.matrixWorld),o.premultiply(M),a.extractRotation(o),S.halfWidth.set(T.width*.5,0,0),S.halfHeight.set(0,T.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),f++}else if(T.isPointLight){let S=i.point[m];S.position.setFromMatrixPosition(T.matrixWorld),S.position.applyMatrix4(M),m++}else if(T.isHemisphereLight){let S=i.hemi[d];S.direction.setFromMatrixPosition(T.matrixWorld),S.direction.transformDirection(M),d++}}}return{setup:l,setupView:c,state:i}}function eo(r,e){let t=new jd(r,e),n=[],i=[];function s(){n.length=0,i.length=0}function o(p){n.push(p)}function a(p){i.push(p)}function l(p){t.setup(n,p)}function c(p){t.setupView(n,p)}return{init:s,state:{lightsArray:n,shadowsArray:i,lights:t},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function Qd(r,e){let t=new WeakMap;function n(s,o=0){let a=t.get(s),l;return a===void 0?(l=new eo(r,e),t.set(s,[l])):o>=a.length?(l=new eo(r,e),a.push(l)):l=a[o],l}function i(){t=new WeakMap}return{get:n,dispose:i}}var fr=class extends Kn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=dl,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},pr=class extends Kn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.referencePosition=new O,this.nearDistance=1,this.farDistance=1e3,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.referencePosition.copy(e.referencePosition),this.nearDistance=e.nearDistance,this.farDistance=e.farDistance,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},ef=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,tf=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function nf(r,e,t){let n=new ls,i=new Ee,s=new Ee,o=new st,a=new fr({depthPacking:fl}),l=new pr,c={},h=t.maxTextureSize,p={[on]:At,[At]:on,[sn]:sn},u=new Lt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ee},radius:{value:4}},vertexShader:ef,fragmentShader:tf}),m=u.clone();m.defines.HORIZONTAL_PASS=1;let x=new Nt;x.setAttribute("position",new Ye(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let f=new ot(x,u),d=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=to,this.render=function(T,S,R){if(d.enabled===!1||d.autoUpdate===!1&&d.needsUpdate===!1||T.length===0)return;let D=r.getRenderTarget(),v=r.getActiveCubeFace(),E=r.getActiveMipmapLevel(),I=r.state;I.setBlending(an),I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);for(let U=0,K=T.length;U<K;U++){let z=T[U],L=z.shadow;if(L===void 0){console.warn("THREE.WebGLShadowMap:",z,"has no shadow.");continue}if(L.autoUpdate===!1&&L.needsUpdate===!1)continue;i.copy(L.mapSize);let k=L.getFrameExtents();if(i.multiply(k),s.copy(L.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/k.x),i.x=s.x*k.x,L.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/k.y),i.y=s.y*k.y,L.mapSize.y=s.y)),L.map===null){let ee=this.type!==pi?{minFilter:Ge,magFilter:Ge}:{};L.map=new ct(i.x,i.y,ee),L.map.texture.name=z.name+".shadowMap",L.camera.updateProjectionMatrix()}r.setRenderTarget(L.map),r.clear();let $=L.getViewportCount();for(let ee=0;ee<$;ee++){let B=L.getViewport(ee);o.set(s.x*B.x,s.y*B.y,s.x*B.z,s.y*B.w),I.viewport(o),L.updateMatrices(z,ee),n=L.getFrustum(),_(S,R,L.camera,z,this.type)}L.isPointLightShadow!==!0&&this.type===pi&&M(L,R),L.needsUpdate=!1}d.needsUpdate=!1,r.setRenderTarget(D,v,E)};function M(T,S){let R=e.update(f);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,m.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,m.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new ct(i.x,i.y)),u.uniforms.shadow_pass.value=T.map.texture,u.uniforms.resolution.value=T.mapSize,u.uniforms.radius.value=T.radius,r.setRenderTarget(T.mapPass),r.clear(),r.renderBufferDirect(S,null,R,u,f,null),m.uniforms.shadow_pass.value=T.mapPass.texture,m.uniforms.resolution.value=T.mapSize,m.uniforms.radius.value=T.radius,r.setRenderTarget(T.map),r.clear(),r.renderBufferDirect(S,null,R,m,f,null)}function w(T,S,R,D,v,E){let I=null,U=R.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(U!==void 0)I=U;else if(I=R.isPointLight===!0?l:a,r.localClippingEnabled&&S.clipShadows===!0&&Array.isArray(S.clippingPlanes)&&S.clippingPlanes.length!==0||S.displacementMap&&S.displacementScale!==0||S.alphaMap&&S.alphaTest>0||S.map&&S.alphaTest>0){let K=I.uuid,z=S.uuid,L=c[K];L===void 0&&(L={},c[K]=L);let k=L[z];k===void 0&&(k=I.clone(),L[z]=k),I=k}return I.visible=S.visible,I.wireframe=S.wireframe,E===pi?I.side=S.shadowSide!==null?S.shadowSide:S.side:I.side=S.shadowSide!==null?S.shadowSide:p[S.side],I.alphaMap=S.alphaMap,I.alphaTest=S.alphaTest,I.map=S.map,I.clipShadows=S.clipShadows,I.clippingPlanes=S.clippingPlanes,I.clipIntersection=S.clipIntersection,I.displacementMap=S.displacementMap,I.displacementScale=S.displacementScale,I.displacementBias=S.displacementBias,I.wireframeLinewidth=S.wireframeLinewidth,I.linewidth=S.linewidth,R.isPointLight===!0&&I.isMeshDistanceMaterial===!0&&(I.referencePosition.setFromMatrixPosition(R.matrixWorld),I.nearDistance=D,I.farDistance=v),I}function _(T,S,R,D,v){if(T.visible===!1)return;if(T.layers.test(S.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&v===pi)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,T.matrixWorld);let U=e.update(T),K=T.material;if(Array.isArray(K)){let z=U.groups;for(let L=0,k=z.length;L<k;L++){let $=z[L],ee=K[$.materialIndex];if(ee&&ee.visible){let B=w(T,ee,D,R.near,R.far,v);r.renderBufferDirect(R,null,U,B,T,$)}}}else if(K.visible){let z=w(T,K,D,R.near,R.far,v);r.renderBufferDirect(R,null,U,z,T,null)}}let I=T.children;for(let U=0,K=I.length;U<K;U++)_(I[U],S,R,D,v)}}function sf(r,e,t){let n=t.isWebGL2;function i(){let C=!1,G=new st,j=null,de=new st(0,0,0,0);return{setMask:function(fe){j!==fe&&!C&&(r.colorMask(fe,fe,fe,fe),j=fe)},setLocked:function(fe){C=fe},setClear:function(fe,ke,et,dt,zt){zt===!0&&(fe*=dt,ke*=dt,et*=dt),G.set(fe,ke,et,dt),de.equals(G)===!1&&(r.clearColor(fe,ke,et,dt),de.copy(G))},reset:function(){C=!1,j=null,de.set(-1,0,0,0)}}}function s(){let C=!1,G=null,j=null,de=null;return{setTest:function(fe){fe?ie(2929):le(2929)},setMask:function(fe){G!==fe&&!C&&(r.depthMask(fe),G=fe)},setFunc:function(fe){if(j!==fe){switch(fe){case Uo:r.depthFunc(512);break;case Bo:r.depthFunc(519);break;case ko:r.depthFunc(513);break;case Ks:r.depthFunc(515);break;case Vo:r.depthFunc(514);break;case Ho:r.depthFunc(518);break;case Go:r.depthFunc(516);break;case Wo:r.depthFunc(517);break;default:r.depthFunc(515)}j=fe}},setLocked:function(fe){C=fe},setClear:function(fe){de!==fe&&(r.clearDepth(fe),de=fe)},reset:function(){C=!1,G=null,j=null,de=null}}}function o(){let C=!1,G=null,j=null,de=null,fe=null,ke=null,et=null,dt=null,zt=null;return{setTest:function(Xe){C||(Xe?ie(2960):le(2960))},setMask:function(Xe){G!==Xe&&!C&&(r.stencilMask(Xe),G=Xe)},setFunc:function(Xe,Ct,Ut){(j!==Xe||de!==Ct||fe!==Ut)&&(r.stencilFunc(Xe,Ct,Ut),j=Xe,de=Ct,fe=Ut)},setOp:function(Xe,Ct,Ut){(ke!==Xe||et!==Ct||dt!==Ut)&&(r.stencilOp(Xe,Ct,Ut),ke=Xe,et=Ct,dt=Ut)},setLocked:function(Xe){C=Xe},setClear:function(Xe){zt!==Xe&&(r.clearStencil(Xe),zt=Xe)},reset:function(){C=!1,G=null,j=null,de=null,fe=null,ke=null,et=null,dt=null,zt=null}}}let a=new i,l=new s,c=new o,h=new WeakMap,p=new WeakMap,u={},m={},x=new WeakMap,f=[],d=null,M=!1,w=null,_=null,T=null,S=null,R=null,D=null,v=null,E=!1,I=null,U=null,K=null,z=null,L=null,k=r.getParameter(35661),$=!1,ee=0,B=r.getParameter(7938);B.indexOf("WebGL")!==-1?(ee=parseFloat(/^WebGL (\d)/.exec(B)[1]),$=ee>=1):B.indexOf("OpenGL ES")!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(B)[1]),$=ee>=2);let X=null,Y={},ne=r.getParameter(3088),N=r.getParameter(2978),J=new st().fromArray(ne),re=new st().fromArray(N);function A(C,G,j){let de=new Uint8Array(4),fe=r.createTexture();r.bindTexture(C,fe),r.texParameteri(C,10241,9728),r.texParameteri(C,10240,9728);for(let ke=0;ke<j;ke++)r.texImage2D(G+ke,0,6408,1,1,0,6408,5121,de);return fe}let Z={};Z[3553]=A(3553,3553,1),Z[34067]=A(34067,34069,6),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),ie(2929),l.setFunc(Ks),Oe(!1),Fe(kr),ie(2884),Ve(an);function ie(C){u[C]!==!0&&(r.enable(C),u[C]=!0)}function le(C){u[C]!==!1&&(r.disable(C),u[C]=!1)}function oe(C,G){return m[C]!==G?(r.bindFramebuffer(C,G),m[C]=G,n&&(C===36009&&(m[36160]=G),C===36160&&(m[36009]=G)),!0):!1}function te(C,G){let j=f,de=!1;if(C)if(j=x.get(G),j===void 0&&(j=[],x.set(G,j)),C.isWebGLMultipleRenderTargets){let fe=C.texture;if(j.length!==fe.length||j[0]!==36064){for(let ke=0,et=fe.length;ke<et;ke++)j[ke]=36064+ke;j.length=fe.length,de=!0}}else j[0]!==36064&&(j[0]=36064,de=!0);else j[0]!==1029&&(j[0]=1029,de=!0);de&&(t.isWebGL2?r.drawBuffers(j):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(j))}function xe(C){return d!==C?(r.useProgram(C),d=C,!0):!1}let me={[Vn]:32774,[Ao]:32778,[Co]:32779};if(n)me[Wr]=32775,me[qr]=32776;else{let C=e.get("EXT_blend_minmax");C!==null&&(me[Wr]=C.MIN_EXT,me[qr]=C.MAX_EXT)}let be={[Ro]:0,[Lo]:1,[Po]:768,[no]:770,[zo]:776,[No]:774,[Io]:772,[Do]:769,[io]:771,[Oo]:775,[Fo]:773};function Ve(C,G,j,de,fe,ke,et,dt){if(C===an){M===!0&&(le(3042),M=!1);return}if(M===!1&&(ie(3042),M=!0),C!==Eo){if(C!==w||dt!==E){if((_!==Vn||R!==Vn)&&(r.blendEquation(32774),_=Vn,R=Vn),dt)switch(C){case Wn:r.blendFuncSeparate(1,771,1,771);break;case Vr:r.blendFunc(1,1);break;case Hr:r.blendFuncSeparate(0,769,0,1);break;case Gr:r.blendFuncSeparate(0,768,0,770);break;default:console.error("THREE.WebGLState: Invalid blending: ",C);break}else switch(C){case Wn:r.blendFuncSeparate(770,771,1,771);break;case Vr:r.blendFunc(770,1);break;case Hr:r.blendFuncSeparate(0,769,0,1);break;case Gr:r.blendFunc(0,768);break;default:console.error("THREE.WebGLState: Invalid blending: ",C);break}T=null,S=null,D=null,v=null,w=C,E=dt}return}fe=fe||G,ke=ke||j,et=et||de,(G!==_||fe!==R)&&(r.blendEquationSeparate(me[G],me[fe]),_=G,R=fe),(j!==T||de!==S||ke!==D||et!==v)&&(r.blendFuncSeparate(be[j],be[de],be[ke],be[et]),T=j,S=de,D=ke,v=et),w=C,E=!1}function ze(C,G){C.side===sn?le(2884):ie(2884);let j=C.side===At;G&&(j=!j),Oe(j),C.blending===Wn&&C.transparent===!1?Ve(an):Ve(C.blending,C.blendEquation,C.blendSrc,C.blendDst,C.blendEquationAlpha,C.blendSrcAlpha,C.blendDstAlpha,C.premultipliedAlpha),l.setFunc(C.depthFunc),l.setTest(C.depthTest),l.setMask(C.depthWrite),a.setMask(C.colorWrite);let de=C.stencilWrite;c.setTest(de),de&&(c.setMask(C.stencilWriteMask),c.setFunc(C.stencilFunc,C.stencilRef,C.stencilFuncMask),c.setOp(C.stencilFail,C.stencilZFail,C.stencilZPass)),Te(C.polygonOffset,C.polygonOffsetFactor,C.polygonOffsetUnits),C.alphaToCoverage===!0?ie(32926):le(32926)}function Oe(C){I!==C&&(C?r.frontFace(2304):r.frontFace(2305),I=C)}function Fe(C){C!==So?(ie(2884),C!==U&&(C===kr?r.cullFace(1029):C===wo?r.cullFace(1028):r.cullFace(1032))):le(2884),U=C}function Le(C){C!==K&&($&&r.lineWidth(C),K=C)}function Te(C,G,j){C?(ie(32823),(z!==G||L!==j)&&(r.polygonOffset(G,j),z=G,L=j)):le(32823)}function ht(C){C?ie(3089):le(3089)}function ut(C){C===void 0&&(C=33984+k-1),X!==C&&(r.activeTexture(C),X=C)}function b(C,G,j){j===void 0&&(X===null?j=33984+k-1:j=X);let de=Y[j];de===void 0&&(de={type:void 0,texture:void 0},Y[j]=de),(de.type!==C||de.texture!==G)&&(X!==j&&(r.activeTexture(j),X=j),r.bindTexture(C,G||Z[C]),de.type=C,de.texture=G)}function g(){let C=Y[X];C!==void 0&&C.type!==void 0&&(r.bindTexture(C.type,null),C.type=void 0,C.texture=void 0)}function V(){try{r.compressedTexImage2D.apply(r,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Q(){try{r.compressedTexImage3D.apply(r,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function se(){try{r.texSubImage2D.apply(r,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function he(){try{r.texSubImage3D.apply(r,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function ye(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function ce(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function W(){try{r.texStorage2D.apply(r,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function ve(){try{r.texStorage3D.apply(r,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function ue(){try{r.texImage2D.apply(r,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function _e(){try{r.texImage3D.apply(r,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function ge(C){J.equals(C)===!1&&(r.scissor(C.x,C.y,C.z,C.w),J.copy(C))}function pe(C){re.equals(C)===!1&&(r.viewport(C.x,C.y,C.z,C.w),re.copy(C))}function we(C,G){let j=p.get(G);j===void 0&&(j=new WeakMap,p.set(G,j));let de=j.get(C);de===void 0&&(de=r.getUniformBlockIndex(G,C.name),j.set(C,de))}function We(C,G){let de=p.get(G).get(C);h.get(G)!==de&&(r.uniformBlockBinding(G,de,C.__bindingPointIndex),h.set(G,de))}function Qe(){r.disable(3042),r.disable(2884),r.disable(2929),r.disable(32823),r.disable(3089),r.disable(2960),r.disable(32926),r.blendEquation(32774),r.blendFunc(1,0),r.blendFuncSeparate(1,0,1,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(513),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(519,0,4294967295),r.stencilOp(7680,7680,7680),r.clearStencil(0),r.cullFace(1029),r.frontFace(2305),r.polygonOffset(0,0),r.activeTexture(33984),r.bindFramebuffer(36160,null),n===!0&&(r.bindFramebuffer(36009,null),r.bindFramebuffer(36008,null)),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),u={},X=null,Y={},m={},x=new WeakMap,f=[],d=null,M=!1,w=null,_=null,T=null,S=null,R=null,D=null,v=null,E=!1,I=null,U=null,K=null,z=null,L=null,J.set(0,0,r.canvas.width,r.canvas.height),re.set(0,0,r.canvas.width,r.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:ie,disable:le,bindFramebuffer:oe,drawBuffers:te,useProgram:xe,setBlending:Ve,setMaterial:ze,setFlipSided:Oe,setCullFace:Fe,setLineWidth:Le,setPolygonOffset:Te,setScissorTest:ht,activeTexture:ut,bindTexture:b,unbindTexture:g,compressedTexImage2D:V,compressedTexImage3D:Q,texImage2D:ue,texImage3D:_e,updateUBOMapping:we,uniformBlockBinding:We,texStorage2D:W,texStorage3D:ve,texSubImage2D:se,texSubImage3D:he,compressedTexSubImage2D:ye,compressedTexSubImage3D:ce,scissor:ge,viewport:pe,reset:Qe}}function rf(r,e,t,n,i,s,o){let a=i.isWebGL2,l=i.maxTextures,c=i.maxCubemapSize,h=i.maxTextureSize,p=i.maxSamples,u=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),x=new WeakMap,f,d=new WeakMap,M=!1;try{M=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function w(b,g){return M?new OffscreenCanvas(b,g):ji("canvas")}function _(b,g,V,Q){let se=1;if((b.width>Q||b.height>Q)&&(se=Q/Math.max(b.width,b.height)),se<1||g===!0)if(typeof HTMLImageElement!="undefined"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&b instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&b instanceof ImageBitmap){let he=g?vl:Math.floor,ye=he(se*b.width),ce=he(se*b.height);f===void 0&&(f=w(ye,ce));let W=V?w(ye,ce):f;return W.width=ye,W.height=ce,W.getContext("2d").drawImage(b,0,0,ye,ce),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+b.width+"x"+b.height+") to ("+ye+"x"+ce+")."),W}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+b.width+"x"+b.height+")."),b;return b}function T(b){return ba(b.width)&&ba(b.height)}function S(b){return a?!1:b.wrapS!==_t||b.wrapT!==_t||b.minFilter!==Ge&&b.minFilter!==it}function R(b,g){return b.generateMipmaps&&g&&b.minFilter!==Ge&&b.minFilter!==it}function D(b){r.generateMipmap(b)}function v(b,g,V,Q,se=!1){if(a===!1)return g;if(b!==null){if(r[b]!==void 0)return r[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let he=g;return g===6403&&(V===5126&&(he=33326),V===5131&&(he=33325),V===5121&&(he=33321)),g===33319&&(V===5126&&(he=33328),V===5131&&(he=33327),V===5121&&(he=33323)),g===6408&&(V===5126&&(he=34836),V===5131&&(he=34842),V===5121&&(he=Q===Be&&se===!1?35907:32856),V===32819&&(he=32854),V===32820&&(he=32855)),(he===33325||he===33326||he===33327||he===33328||he===34842||he===34836)&&e.get("EXT_color_buffer_float"),he}function E(b,g,V){return R(b,V)===!0||b.isFramebufferTexture&&b.minFilter!==Ge&&b.minFilter!==it?Math.log2(Math.max(g.width,g.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?g.mipmaps.length:1}function I(b){return b===Ge||b===Xr||b===_s?9728:9729}function U(b){let g=b.target;g.removeEventListener("dispose",U),z(g),g.isVideoTexture&&x.delete(g)}function K(b){let g=b.target;g.removeEventListener("dispose",K),k(g)}function z(b){let g=n.get(b);if(g.__webglInit===void 0)return;let V=b.source,Q=d.get(V);if(Q){let se=Q[g.__cacheKey];se.usedTimes--,se.usedTimes===0&&L(b),Object.keys(Q).length===0&&d.delete(V)}n.remove(b)}function L(b){let g=n.get(b);r.deleteTexture(g.__webglTexture);let V=b.source,Q=d.get(V);delete Q[g.__cacheKey],o.memory.textures--}function k(b){let g=b.texture,V=n.get(b),Q=n.get(g);if(Q.__webglTexture!==void 0&&(r.deleteTexture(Q.__webglTexture),o.memory.textures--),b.depthTexture&&b.depthTexture.dispose(),b.isWebGLCubeRenderTarget)for(let se=0;se<6;se++)r.deleteFramebuffer(V.__webglFramebuffer[se]),V.__webglDepthbuffer&&r.deleteRenderbuffer(V.__webglDepthbuffer[se]);else{if(r.deleteFramebuffer(V.__webglFramebuffer),V.__webglDepthbuffer&&r.deleteRenderbuffer(V.__webglDepthbuffer),V.__webglMultisampledFramebuffer&&r.deleteFramebuffer(V.__webglMultisampledFramebuffer),V.__webglColorRenderbuffer)for(let se=0;se<V.__webglColorRenderbuffer.length;se++)V.__webglColorRenderbuffer[se]&&r.deleteRenderbuffer(V.__webglColorRenderbuffer[se]);V.__webglDepthRenderbuffer&&r.deleteRenderbuffer(V.__webglDepthRenderbuffer)}if(b.isWebGLMultipleRenderTargets)for(let se=0,he=g.length;se<he;se++){let ye=n.get(g[se]);ye.__webglTexture&&(r.deleteTexture(ye.__webglTexture),o.memory.textures--),n.remove(g[se])}n.remove(g),n.remove(b)}let $=0;function ee(){$=0}function B(){let b=$;return b>=l&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+l),$+=1,b}function X(b){let g=[];return g.push(b.wrapS),g.push(b.wrapT),g.push(b.wrapR||0),g.push(b.magFilter),g.push(b.minFilter),g.push(b.anisotropy),g.push(b.internalFormat),g.push(b.format),g.push(b.type),g.push(b.generateMipmaps),g.push(b.premultiplyAlpha),g.push(b.flipY),g.push(b.unpackAlignment),g.push(b.encoding),g.join()}function Y(b,g){let V=n.get(b);if(b.isVideoTexture&&ht(b),b.isRenderTargetTexture===!1&&b.version>0&&V.__version!==b.version){let Q=b.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{le(V,b,g);return}}t.bindTexture(3553,V.__webglTexture,33984+g)}function ne(b,g){let V=n.get(b);if(b.version>0&&V.__version!==b.version){le(V,b,g);return}t.bindTexture(35866,V.__webglTexture,33984+g)}function N(b,g){let V=n.get(b);if(b.version>0&&V.__version!==b.version){le(V,b,g);return}t.bindTexture(32879,V.__webglTexture,33984+g)}function J(b,g){let V=n.get(b);if(b.version>0&&V.__version!==b.version){oe(V,b,g);return}t.bindTexture(34067,V.__webglTexture,33984+g)}let re={[vi]:10497,[_t]:33071,[_i]:33648},A={[Ge]:9728,[Xr]:9984,[_s]:9986,[it]:9729,[jo]:9985,[yi]:9987};function Z(b,g,V){if(V?(r.texParameteri(b,10242,re[g.wrapS]),r.texParameteri(b,10243,re[g.wrapT]),(b===32879||b===35866)&&r.texParameteri(b,32882,re[g.wrapR]),r.texParameteri(b,10240,A[g.magFilter]),r.texParameteri(b,10241,A[g.minFilter])):(r.texParameteri(b,10242,33071),r.texParameteri(b,10243,33071),(b===32879||b===35866)&&r.texParameteri(b,32882,33071),(g.wrapS!==_t||g.wrapT!==_t)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),r.texParameteri(b,10240,I(g.magFilter)),r.texParameteri(b,10241,I(g.minFilter)),g.minFilter!==Ge&&g.minFilter!==it&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),e.has("EXT_texture_filter_anisotropic")===!0){let Q=e.get("EXT_texture_filter_anisotropic");if(g.magFilter===Ge||g.minFilter!==_s&&g.minFilter!==yi||g.type===Jt&&e.has("OES_texture_float_linear")===!1||a===!1&&g.type===ln&&e.has("OES_texture_half_float_linear")===!1)return;(g.anisotropy>1||n.get(g).__currentAnisotropy)&&(r.texParameterf(b,Q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,i.getMaxAnisotropy())),n.get(g).__currentAnisotropy=g.anisotropy)}}function ie(b,g){let V=!1;b.__webglInit===void 0&&(b.__webglInit=!0,g.addEventListener("dispose",U));let Q=g.source,se=d.get(Q);se===void 0&&(se={},d.set(Q,se));let he=X(g);if(he!==b.__cacheKey){se[he]===void 0&&(se[he]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,V=!0),se[he].usedTimes++;let ye=se[b.__cacheKey];ye!==void 0&&(se[b.__cacheKey].usedTimes--,ye.usedTimes===0&&L(g)),b.__cacheKey=he,b.__webglTexture=se[he].texture}return V}function le(b,g,V){let Q=3553;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(Q=35866),g.isData3DTexture&&(Q=32879);let se=ie(b,g),he=g.source;t.bindTexture(Q,b.__webglTexture,33984+V);let ye=n.get(he);if(he.version!==ye.__version||se===!0){t.activeTexture(33984+V),r.pixelStorei(37440,g.flipY),r.pixelStorei(37441,g.premultiplyAlpha),r.pixelStorei(3317,g.unpackAlignment),r.pixelStorei(37443,0);let ce=S(g)&&T(g.image)===!1,W=_(g.image,ce,!1,h);W=ut(g,W);let ve=T(W)||a,ue=s.convert(g.format,g.encoding),_e=s.convert(g.type),ge=v(g.internalFormat,ue,_e,g.encoding,g.isVideoTexture);Z(Q,g,ve);let pe,we=g.mipmaps,We=a&&g.isVideoTexture!==!0,Qe=ye.__version===void 0||se===!0,C=E(g,W,ve);if(g.isDepthTexture)ge=6402,a?g.type===Jt?ge=36012:g.type===yn?ge=33190:g.type===qn?ge=35056:ge=33189:g.type===Jt&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),g.format===Mn&&ge===6402&&g.type!==ao&&g.type!==yn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),g.type=yn,_e=s.convert(g.type)),g.format===$n&&ge===6402&&(ge=34041,g.type!==qn&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),g.type=qn,_e=s.convert(g.type))),Qe&&(We?t.texStorage2D(3553,1,ge,W.width,W.height):t.texImage2D(3553,0,ge,W.width,W.height,0,ue,_e,null));else if(g.isDataTexture)if(we.length>0&&ve){We&&Qe&&t.texStorage2D(3553,C,ge,we[0].width,we[0].height);for(let G=0,j=we.length;G<j;G++)pe=we[G],We?t.texSubImage2D(3553,G,0,0,pe.width,pe.height,ue,_e,pe.data):t.texImage2D(3553,G,ge,pe.width,pe.height,0,ue,_e,pe.data);g.generateMipmaps=!1}else We?(Qe&&t.texStorage2D(3553,C,ge,W.width,W.height),t.texSubImage2D(3553,0,0,0,W.width,W.height,ue,_e,W.data)):t.texImage2D(3553,0,ge,W.width,W.height,0,ue,_e,W.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){We&&Qe&&t.texStorage3D(35866,C,ge,we[0].width,we[0].height,W.depth);for(let G=0,j=we.length;G<j;G++)pe=we[G],g.format!==xt?ue!==null?We?t.compressedTexSubImage3D(35866,G,0,0,0,pe.width,pe.height,W.depth,ue,pe.data,0,0):t.compressedTexImage3D(35866,G,ge,pe.width,pe.height,W.depth,0,pe.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):We?t.texSubImage3D(35866,G,0,0,0,pe.width,pe.height,W.depth,ue,_e,pe.data):t.texImage3D(35866,G,ge,pe.width,pe.height,W.depth,0,ue,_e,pe.data)}else{We&&Qe&&t.texStorage2D(3553,C,ge,we[0].width,we[0].height);for(let G=0,j=we.length;G<j;G++)pe=we[G],g.format!==xt?ue!==null?We?t.compressedTexSubImage2D(3553,G,0,0,pe.width,pe.height,ue,pe.data):t.compressedTexImage2D(3553,G,ge,pe.width,pe.height,0,pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):We?t.texSubImage2D(3553,G,0,0,pe.width,pe.height,ue,_e,pe.data):t.texImage2D(3553,G,ge,pe.width,pe.height,0,ue,_e,pe.data)}else if(g.isDataArrayTexture)We?(Qe&&t.texStorage3D(35866,C,ge,W.width,W.height,W.depth),t.texSubImage3D(35866,0,0,0,0,W.width,W.height,W.depth,ue,_e,W.data)):t.texImage3D(35866,0,ge,W.width,W.height,W.depth,0,ue,_e,W.data);else if(g.isData3DTexture)We?(Qe&&t.texStorage3D(32879,C,ge,W.width,W.height,W.depth),t.texSubImage3D(32879,0,0,0,0,W.width,W.height,W.depth,ue,_e,W.data)):t.texImage3D(32879,0,ge,W.width,W.height,W.depth,0,ue,_e,W.data);else if(g.isFramebufferTexture){if(Qe)if(We)t.texStorage2D(3553,C,ge,W.width,W.height);else{let G=W.width,j=W.height;for(let de=0;de<C;de++)t.texImage2D(3553,de,ge,G,j,0,ue,_e,null),G>>=1,j>>=1}}else if(we.length>0&&ve){We&&Qe&&t.texStorage2D(3553,C,ge,we[0].width,we[0].height);for(let G=0,j=we.length;G<j;G++)pe=we[G],We?t.texSubImage2D(3553,G,0,0,ue,_e,pe):t.texImage2D(3553,G,ge,ue,_e,pe);g.generateMipmaps=!1}else We?(Qe&&t.texStorage2D(3553,C,ge,W.width,W.height),t.texSubImage2D(3553,0,0,0,ue,_e,W)):t.texImage2D(3553,0,ge,ue,_e,W);R(g,ve)&&D(Q),ye.__version=he.version,g.onUpdate&&g.onUpdate(g)}b.__version=g.version}function oe(b,g,V){if(g.image.length!==6)return;let Q=ie(b,g),se=g.source;t.bindTexture(34067,b.__webglTexture,33984+V);let he=n.get(se);if(se.version!==he.__version||Q===!0){t.activeTexture(33984+V),r.pixelStorei(37440,g.flipY),r.pixelStorei(37441,g.premultiplyAlpha),r.pixelStorei(3317,g.unpackAlignment),r.pixelStorei(37443,0);let ye=g.isCompressedTexture||g.image[0].isCompressedTexture,ce=g.image[0]&&g.image[0].isDataTexture,W=[];for(let G=0;G<6;G++)!ye&&!ce?W[G]=_(g.image[G],!1,!0,c):W[G]=ce?g.image[G].image:g.image[G],W[G]=ut(g,W[G]);let ve=W[0],ue=T(ve)||a,_e=s.convert(g.format,g.encoding),ge=s.convert(g.type),pe=v(g.internalFormat,_e,ge,g.encoding),we=a&&g.isVideoTexture!==!0,We=he.__version===void 0||Q===!0,Qe=E(g,ve,ue);Z(34067,g,ue);let C;if(ye){we&&We&&t.texStorage2D(34067,Qe,pe,ve.width,ve.height);for(let G=0;G<6;G++){C=W[G].mipmaps;for(let j=0;j<C.length;j++){let de=C[j];g.format!==xt?_e!==null?we?t.compressedTexSubImage2D(34069+G,j,0,0,de.width,de.height,_e,de.data):t.compressedTexImage2D(34069+G,j,pe,de.width,de.height,0,de.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):we?t.texSubImage2D(34069+G,j,0,0,de.width,de.height,_e,ge,de.data):t.texImage2D(34069+G,j,pe,de.width,de.height,0,_e,ge,de.data)}}}else{C=g.mipmaps,we&&We&&(C.length>0&&Qe++,t.texStorage2D(34067,Qe,pe,W[0].width,W[0].height));for(let G=0;G<6;G++)if(ce){we?t.texSubImage2D(34069+G,0,0,0,W[G].width,W[G].height,_e,ge,W[G].data):t.texImage2D(34069+G,0,pe,W[G].width,W[G].height,0,_e,ge,W[G].data);for(let j=0;j<C.length;j++){let fe=C[j].image[G].image;we?t.texSubImage2D(34069+G,j+1,0,0,fe.width,fe.height,_e,ge,fe.data):t.texImage2D(34069+G,j+1,pe,fe.width,fe.height,0,_e,ge,fe.data)}}else{we?t.texSubImage2D(34069+G,0,0,0,_e,ge,W[G]):t.texImage2D(34069+G,0,pe,_e,ge,W[G]);for(let j=0;j<C.length;j++){let de=C[j];we?t.texSubImage2D(34069+G,j+1,0,0,_e,ge,de.image[G]):t.texImage2D(34069+G,j+1,pe,_e,ge,de.image[G])}}}R(g,ue)&&D(34067),he.__version=se.version,g.onUpdate&&g.onUpdate(g)}b.__version=g.version}function te(b,g,V,Q,se){let he=s.convert(V.format,V.encoding),ye=s.convert(V.type),ce=v(V.internalFormat,he,ye,V.encoding);n.get(g).__hasExternalTextures||(se===32879||se===35866?t.texImage3D(se,0,ce,g.width,g.height,g.depth,0,he,ye,null):t.texImage2D(se,0,ce,g.width,g.height,0,he,ye,null)),t.bindFramebuffer(36160,b),Te(g)?u.framebufferTexture2DMultisampleEXT(36160,Q,se,n.get(V).__webglTexture,0,Le(g)):(se===3553||se>=34069&&se<=34074)&&r.framebufferTexture2D(36160,Q,se,n.get(V).__webglTexture,0),t.bindFramebuffer(36160,null)}function xe(b,g,V){if(r.bindRenderbuffer(36161,b),g.depthBuffer&&!g.stencilBuffer){let Q=33189;if(V||Te(g)){let se=g.depthTexture;se&&se.isDepthTexture&&(se.type===Jt?Q=36012:se.type===yn&&(Q=33190));let he=Le(g);Te(g)?u.renderbufferStorageMultisampleEXT(36161,he,Q,g.width,g.height):r.renderbufferStorageMultisample(36161,he,Q,g.width,g.height)}else r.renderbufferStorage(36161,Q,g.width,g.height);r.framebufferRenderbuffer(36160,36096,36161,b)}else if(g.depthBuffer&&g.stencilBuffer){let Q=Le(g);V&&Te(g)===!1?r.renderbufferStorageMultisample(36161,Q,35056,g.width,g.height):Te(g)?u.renderbufferStorageMultisampleEXT(36161,Q,35056,g.width,g.height):r.renderbufferStorage(36161,34041,g.width,g.height),r.framebufferRenderbuffer(36160,33306,36161,b)}else{let Q=g.isWebGLMultipleRenderTargets===!0?g.texture:[g.texture];for(let se=0;se<Q.length;se++){let he=Q[se],ye=s.convert(he.format,he.encoding),ce=s.convert(he.type),W=v(he.internalFormat,ye,ce,he.encoding),ve=Le(g);V&&Te(g)===!1?r.renderbufferStorageMultisample(36161,ve,W,g.width,g.height):Te(g)?u.renderbufferStorageMultisampleEXT(36161,ve,W,g.width,g.height):r.renderbufferStorage(36161,W,g.width,g.height)}}r.bindRenderbuffer(36161,null)}function me(b,g){if(g&&g.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(36160,b),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(g.depthTexture).__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),Y(g.depthTexture,0);let Q=n.get(g.depthTexture).__webglTexture,se=Le(g);if(g.depthTexture.format===Mn)Te(g)?u.framebufferTexture2DMultisampleEXT(36160,36096,3553,Q,0,se):r.framebufferTexture2D(36160,36096,3553,Q,0);else if(g.depthTexture.format===$n)Te(g)?u.framebufferTexture2DMultisampleEXT(36160,33306,3553,Q,0,se):r.framebufferTexture2D(36160,33306,3553,Q,0);else throw new Error("Unknown depthTexture format")}function be(b){let g=n.get(b),V=b.isWebGLCubeRenderTarget===!0;if(b.depthTexture&&!g.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");me(g.__webglFramebuffer,b)}else if(V){g.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)t.bindFramebuffer(36160,g.__webglFramebuffer[Q]),g.__webglDepthbuffer[Q]=r.createRenderbuffer(),xe(g.__webglDepthbuffer[Q],b,!1)}else t.bindFramebuffer(36160,g.__webglFramebuffer),g.__webglDepthbuffer=r.createRenderbuffer(),xe(g.__webglDepthbuffer,b,!1);t.bindFramebuffer(36160,null)}function Ve(b,g,V){let Q=n.get(b);g!==void 0&&te(Q.__webglFramebuffer,b,b.texture,36064,3553),V!==void 0&&be(b)}function ze(b){let g=b.texture,V=n.get(b),Q=n.get(g);b.addEventListener("dispose",K),b.isWebGLMultipleRenderTargets!==!0&&(Q.__webglTexture===void 0&&(Q.__webglTexture=r.createTexture()),Q.__version=g.version,o.memory.textures++);let se=b.isWebGLCubeRenderTarget===!0,he=b.isWebGLMultipleRenderTargets===!0,ye=T(b)||a;if(se){V.__webglFramebuffer=[];for(let ce=0;ce<6;ce++)V.__webglFramebuffer[ce]=r.createFramebuffer()}else{if(V.__webglFramebuffer=r.createFramebuffer(),he)if(i.drawBuffers){let ce=b.texture;for(let W=0,ve=ce.length;W<ve;W++){let ue=n.get(ce[W]);ue.__webglTexture===void 0&&(ue.__webglTexture=r.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&b.samples>0&&Te(b)===!1){let ce=he?g:[g];V.__webglMultisampledFramebuffer=r.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(36160,V.__webglMultisampledFramebuffer);for(let W=0;W<ce.length;W++){let ve=ce[W];V.__webglColorRenderbuffer[W]=r.createRenderbuffer(),r.bindRenderbuffer(36161,V.__webglColorRenderbuffer[W]);let ue=s.convert(ve.format,ve.encoding),_e=s.convert(ve.type),ge=v(ve.internalFormat,ue,_e,ve.encoding,b.isXRRenderTarget===!0),pe=Le(b);r.renderbufferStorageMultisample(36161,pe,ge,b.width,b.height),r.framebufferRenderbuffer(36160,36064+W,36161,V.__webglColorRenderbuffer[W])}r.bindRenderbuffer(36161,null),b.depthBuffer&&(V.__webglDepthRenderbuffer=r.createRenderbuffer(),xe(V.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(36160,null)}}if(se){t.bindTexture(34067,Q.__webglTexture),Z(34067,g,ye);for(let ce=0;ce<6;ce++)te(V.__webglFramebuffer[ce],b,g,36064,34069+ce);R(g,ye)&&D(34067),t.unbindTexture()}else if(he){let ce=b.texture;for(let W=0,ve=ce.length;W<ve;W++){let ue=ce[W],_e=n.get(ue);t.bindTexture(3553,_e.__webglTexture),Z(3553,ue,ye),te(V.__webglFramebuffer,b,ue,36064+W,3553),R(ue,ye)&&D(3553)}t.unbindTexture()}else{let ce=3553;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(a?ce=b.isWebGL3DRenderTarget?32879:35866:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ce,Q.__webglTexture),Z(ce,g,ye),te(V.__webglFramebuffer,b,g,36064,ce),R(g,ye)&&D(ce),t.unbindTexture()}b.depthBuffer&&be(b)}function Oe(b){let g=T(b)||a,V=b.isWebGLMultipleRenderTargets===!0?b.texture:[b.texture];for(let Q=0,se=V.length;Q<se;Q++){let he=V[Q];if(R(he,g)){let ye=b.isWebGLCubeRenderTarget?34067:3553,ce=n.get(he).__webglTexture;t.bindTexture(ye,ce),D(ye),t.unbindTexture()}}}function Fe(b){if(a&&b.samples>0&&Te(b)===!1){let g=b.isWebGLMultipleRenderTargets?b.texture:[b.texture],V=b.width,Q=b.height,se=16384,he=[],ye=b.stencilBuffer?33306:36096,ce=n.get(b),W=b.isWebGLMultipleRenderTargets===!0;if(W)for(let ve=0;ve<g.length;ve++)t.bindFramebuffer(36160,ce.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(36160,36064+ve,36161,null),t.bindFramebuffer(36160,ce.__webglFramebuffer),r.framebufferTexture2D(36009,36064+ve,3553,null,0);t.bindFramebuffer(36008,ce.__webglMultisampledFramebuffer),t.bindFramebuffer(36009,ce.__webglFramebuffer);for(let ve=0;ve<g.length;ve++){he.push(36064+ve),b.depthBuffer&&he.push(ye);let ue=ce.__ignoreDepthValues!==void 0?ce.__ignoreDepthValues:!1;if(ue===!1&&(b.depthBuffer&&(se|=256),b.stencilBuffer&&(se|=1024)),W&&r.framebufferRenderbuffer(36008,36064,36161,ce.__webglColorRenderbuffer[ve]),ue===!0&&(r.invalidateFramebuffer(36008,[ye]),r.invalidateFramebuffer(36009,[ye])),W){let _e=n.get(g[ve]).__webglTexture;r.framebufferTexture2D(36009,36064,3553,_e,0)}r.blitFramebuffer(0,0,V,Q,0,0,V,Q,se,9728),m&&r.invalidateFramebuffer(36008,he)}if(t.bindFramebuffer(36008,null),t.bindFramebuffer(36009,null),W)for(let ve=0;ve<g.length;ve++){t.bindFramebuffer(36160,ce.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(36160,36064+ve,36161,ce.__webglColorRenderbuffer[ve]);let ue=n.get(g[ve]).__webglTexture;t.bindFramebuffer(36160,ce.__webglFramebuffer),r.framebufferTexture2D(36009,36064+ve,3553,ue,0)}t.bindFramebuffer(36009,ce.__webglMultisampledFramebuffer)}}function Le(b){return Math.min(p,b.samples)}function Te(b){let g=n.get(b);return a&&b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function ht(b){let g=o.render.frame;x.get(b)!==g&&(x.set(b,g),b.update())}function ut(b,g){let V=b.encoding,Q=b.format,se=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||b.format===er||V!==Sn&&(V===Be?a===!1?e.has("EXT_sRGB")===!0&&Q===xt?(b.format=er,b.minFilter=it,b.generateMipmaps=!1):g=Qi.sRGBToLinear(g):(Q!==xt||se!==bn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture encoding:",V)),g}this.allocateTextureUnit=B,this.resetTextureUnits=ee,this.setTexture2D=Y,this.setTexture2DArray=ne,this.setTexture3D=N,this.setTextureCube=J,this.rebindTextures=Ve,this.setupRenderTarget=ze,this.updateRenderTargetMipmap=Oe,this.updateMultisampleRenderTarget=Fe,this.setupDepthRenderbuffer=be,this.setupFrameBufferTexture=te,this.useMultisampledRTT=Te}function af(r,e,t){let n=t.isWebGL2;function i(s,o=null){let a;if(s===bn)return 5121;if(s===nl)return 32819;if(s===il)return 32820;if(s===Qo)return 5120;if(s===el)return 5122;if(s===ao)return 5123;if(s===tl)return 5124;if(s===yn)return 5125;if(s===Jt)return 5126;if(s===ln)return n?5131:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===sl)return 6406;if(s===xt)return 6408;if(s===rl)return 6409;if(s===al)return 6410;if(s===Mn)return 6402;if(s===$n)return 34041;if(s===er)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===Cr)return 6403;if(s===ol)return 36244;if(s===Rr)return 33319;if(s===ll)return 33320;if(s===cl)return 36249;if(s===ys||s===Ms||s===bs||s===Ss)if(o===Be)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===ys)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Ms)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===bs)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Ss)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===ys)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Ms)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===bs)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Ss)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Yr||s===Zr||s===Jr||s===$r)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===Yr)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Zr)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Jr)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===$r)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===hl)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Kr||s===jr)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(s===Kr)return o===Be?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===jr)return o===Be?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Qr||s===ea||s===ta||s===na||s===ia||s===sa||s===ra||s===aa||s===oa||s===la||s===ca||s===ha||s===ua||s===da)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(s===Qr)return o===Be?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===ea)return o===Be?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===ta)return o===Be?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===na)return o===Be?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===ia)return o===Be?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===sa)return o===Be?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===ra)return o===Be?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===aa)return o===Be?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===oa)return o===Be?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===la)return o===Be?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===ca)return o===Be?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===ha)return o===Be?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===ua)return o===Be?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===da)return o===Be?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===ws)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(s===ws)return o===Be?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT}else return null;if(s===ul||s===fa||s===pa||s===ma)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(s===ws)return a.COMPRESSED_RED_RGTC1_EXT;if(s===fa)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===pa)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===ma)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===qn?n?34042:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):r[s]!==void 0?r[s]:null}return{convert:i}}var mr=class extends gt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},Gn=class extends Ft{constructor(){super(),this.isGroup=!0,this.type="Group"}},of={type:"move"},xi=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Gn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Gn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Gn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let f of e.hand.values()){let d=t.getJointPose(f,n),M=this._getHandJoint(c,f);d!==null&&(M.matrix.fromArray(d.transform.matrix),M.matrix.decompose(M.position,M.rotation,M.scale),M.jointRadius=d.radius),M.visible=d!==null}let h=c.joints["index-finger-tip"],p=c.joints["thumb-tip"],u=h.position.distanceTo(p.position),m=.02,x=.005;c.inputState.pinching&&u>m+x?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=m-x&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(of)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Gn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},gr=class extends yt{constructor(e,t,n,i,s,o,a,l,c,h){if(h=h!==void 0?h:Mn,h!==Mn&&h!==$n)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Mn&&(n=yn),n===void 0&&h===$n&&(n=qn),super(null,i,s,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Ge,this.minFilter=l!==void 0?l:Ge,this.flipY=!1,this.generateMipmaps=!1}},xr=class extends cn{constructor(e,t){super();let n=this,i=null,s=1,o=null,a="local-floor",l=1,c=null,h=null,p=null,u=null,m=null,x=null,f=t.getContextAttributes(),d=null,M=null,w=[],_=[],T=new Set,S=new Map,R=new gt;R.layers.enable(1),R.viewport=new st;let D=new gt;D.layers.enable(2),D.viewport=new st;let v=[R,D],E=new mr;E.layers.enable(1),E.layers.enable(2);let I=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(N){let J=w[N];return J===void 0&&(J=new xi,w[N]=J),J.getTargetRaySpace()},this.getControllerGrip=function(N){let J=w[N];return J===void 0&&(J=new xi,w[N]=J),J.getGripSpace()},this.getHand=function(N){let J=w[N];return J===void 0&&(J=new xi,w[N]=J),J.getHandSpace()};function K(N){let J=_.indexOf(N.inputSource);if(J===-1)return;let re=w[J];re!==void 0&&re.dispatchEvent({type:N.type,data:N.inputSource})}function z(){i.removeEventListener("select",K),i.removeEventListener("selectstart",K),i.removeEventListener("selectend",K),i.removeEventListener("squeeze",K),i.removeEventListener("squeezestart",K),i.removeEventListener("squeezeend",K),i.removeEventListener("end",z),i.removeEventListener("inputsourceschange",L);for(let N=0;N<w.length;N++){let J=_[N];J!==null&&(_[N]=null,w[N].disconnect(J))}I=null,U=null,e.setRenderTarget(d),m=null,u=null,p=null,i=null,M=null,ne.stop(),n.isPresenting=!1,n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(N){s=N,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(N){a=N,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(N){c=N},this.getBaseLayer=function(){return u!==null?u:m},this.getBinding=function(){return p},this.getFrame=function(){return x},this.getSession=function(){return i},this.setSession=async function(N){if(i=N,i!==null){if(d=e.getRenderTarget(),i.addEventListener("select",K),i.addEventListener("selectstart",K),i.addEventListener("selectend",K),i.addEventListener("squeeze",K),i.addEventListener("squeezestart",K),i.addEventListener("squeezeend",K),i.addEventListener("end",z),i.addEventListener("inputsourceschange",L),f.xrCompatible!==!0&&await t.makeXRCompatible(),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){let J={antialias:i.renderState.layers===void 0?f.antialias:!0,alpha:f.alpha,depth:f.depth,stencil:f.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(i,t,J),i.updateRenderState({baseLayer:m}),M=new ct(m.framebufferWidth,m.framebufferHeight,{format:xt,type:bn,encoding:e.outputEncoding,stencilBuffer:f.stencil})}else{let J=null,re=null,A=null;f.depth&&(A=f.stencil?35056:33190,J=f.stencil?$n:Mn,re=f.stencil?qn:yn);let Z={colorFormat:32856,depthFormat:A,scaleFactor:s};p=new XRWebGLBinding(i,t),u=p.createProjectionLayer(Z),i.updateRenderState({layers:[u]}),M=new ct(u.textureWidth,u.textureHeight,{format:xt,type:bn,depthTexture:new gr(u.textureWidth,u.textureHeight,re,void 0,void 0,void 0,void 0,void 0,void 0,J),stencilBuffer:f.stencil,encoding:e.outputEncoding,samples:f.antialias?4:0});let ie=e.properties.get(M);ie.__ignoreDepthValues=u.ignoreDepthValues}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),ne.setContext(i),ne.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}};function L(N){for(let J=0;J<N.removed.length;J++){let re=N.removed[J],A=_.indexOf(re);A>=0&&(_[A]=null,w[A].disconnect(re))}for(let J=0;J<N.added.length;J++){let re=N.added[J],A=_.indexOf(re);if(A===-1){for(let ie=0;ie<w.length;ie++)if(ie>=_.length){_.push(re),A=ie;break}else if(_[ie]===null){_[ie]=re,A=ie;break}if(A===-1)break}let Z=w[A];Z&&Z.connect(re)}}let k=new O,$=new O;function ee(N,J,re){k.setFromMatrixPosition(J.matrixWorld),$.setFromMatrixPosition(re.matrixWorld);let A=k.distanceTo($),Z=J.projectionMatrix.elements,ie=re.projectionMatrix.elements,le=Z[14]/(Z[10]-1),oe=Z[14]/(Z[10]+1),te=(Z[9]+1)/Z[5],xe=(Z[9]-1)/Z[5],me=(Z[8]-1)/Z[0],be=(ie[8]+1)/ie[0],Ve=le*me,ze=le*be,Oe=A/(-me+be),Fe=Oe*-me;J.matrixWorld.decompose(N.position,N.quaternion,N.scale),N.translateX(Fe),N.translateZ(Oe),N.matrixWorld.compose(N.position,N.quaternion,N.scale),N.matrixWorldInverse.copy(N.matrixWorld).invert();let Le=le+Oe,Te=oe+Oe,ht=Ve-Fe,ut=ze+(A-Fe),b=te*oe/Te*Le,g=xe*oe/Te*Le;N.projectionMatrix.makePerspective(ht,ut,b,g,Le,Te)}function B(N,J){J===null?N.matrixWorld.copy(N.matrix):N.matrixWorld.multiplyMatrices(J.matrixWorld,N.matrix),N.matrixWorldInverse.copy(N.matrixWorld).invert()}this.updateCamera=function(N){if(i===null)return;E.near=D.near=R.near=N.near,E.far=D.far=R.far=N.far,(I!==E.near||U!==E.far)&&(i.updateRenderState({depthNear:E.near,depthFar:E.far}),I=E.near,U=E.far);let J=N.parent,re=E.cameras;B(E,J);for(let Z=0;Z<re.length;Z++)B(re[Z],J);E.matrixWorld.decompose(E.position,E.quaternion,E.scale),N.matrix.copy(E.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale);let A=N.children;for(let Z=0,ie=A.length;Z<ie;Z++)A[Z].updateMatrixWorld(!0);re.length===2?ee(E,R,D):E.projectionMatrix.copy(R.projectionMatrix)},this.getCamera=function(){return E},this.getFoveation=function(){if(!(u===null&&m===null))return l},this.setFoveation=function(N){l=N,u!==null&&(u.fixedFoveation=N),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=N)},this.getPlanes=function(){return T};let X=null;function Y(N,J){if(h=J.getViewerPose(c||o),x=J,h!==null){let re=h.views;m!==null&&(e.setRenderTargetFramebuffer(M,m.framebuffer),e.setRenderTarget(M));let A=!1;re.length!==E.cameras.length&&(E.cameras.length=0,A=!0);for(let Z=0;Z<re.length;Z++){let ie=re[Z],le=null;if(m!==null)le=m.getViewport(ie);else{let te=p.getViewSubImage(u,ie);le=te.viewport,Z===0&&(e.setRenderTargetTextures(M,te.colorTexture,u.ignoreDepthValues?void 0:te.depthStencilTexture),e.setRenderTarget(M))}let oe=v[Z];oe===void 0&&(oe=new gt,oe.layers.enable(Z),oe.viewport=new st,v[Z]=oe),oe.matrix.fromArray(ie.transform.matrix),oe.projectionMatrix.fromArray(ie.projectionMatrix),oe.viewport.set(le.x,le.y,le.width,le.height),Z===0&&E.matrix.copy(oe.matrix),A===!0&&E.cameras.push(oe)}}for(let re=0;re<w.length;re++){let A=_[re],Z=w[re];A!==null&&Z!==void 0&&Z.update(A,J,c||o)}if(X&&X(N,J),J.detectedPlanes){n.dispatchEvent({type:"planesdetected",data:J.detectedPlanes});let re=null;for(let A of T)J.detectedPlanes.has(A)||(re===null&&(re=[]),re.push(A));if(re!==null)for(let A of re)T.delete(A),S.delete(A),n.dispatchEvent({type:"planeremoved",data:A});for(let A of J.detectedPlanes)if(!T.has(A))T.add(A),S.set(A,J.lastChangedTime),n.dispatchEvent({type:"planeadded",data:A});else{let Z=S.get(A);A.lastChangedTime>Z&&(S.set(A,A.lastChangedTime),n.dispatchEvent({type:"planechanged",data:A}))}}x=null}let ne=new uo;ne.setAnimationLoop(Y),this.setAnimationLoop=function(N){X=N},this.dispose=function(){}}};function lf(r,e){function t(f,d){d.color.getRGB(f.fogColor.value,ho(r)),d.isFog?(f.fogNear.value=d.near,f.fogFar.value=d.far):d.isFogExp2&&(f.fogDensity.value=d.density)}function n(f,d,M,w,_){d.isMeshBasicMaterial||d.isMeshLambertMaterial?i(f,d):d.isMeshToonMaterial?(i(f,d),h(f,d)):d.isMeshPhongMaterial?(i(f,d),c(f,d)):d.isMeshStandardMaterial?(i(f,d),p(f,d),d.isMeshPhysicalMaterial&&u(f,d,_)):d.isMeshMatcapMaterial?(i(f,d),m(f,d)):d.isMeshDepthMaterial?i(f,d):d.isMeshDistanceMaterial?(i(f,d),x(f,d)):d.isMeshNormalMaterial?i(f,d):d.isLineBasicMaterial?(s(f,d),d.isLineDashedMaterial&&o(f,d)):d.isPointsMaterial?a(f,d,M,w):d.isSpriteMaterial?l(f,d):d.isShadowMaterial?(f.color.value.copy(d.color),f.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function i(f,d){f.opacity.value=d.opacity,d.color&&f.diffuse.value.copy(d.color),d.emissive&&f.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(f.map.value=d.map),d.alphaMap&&(f.alphaMap.value=d.alphaMap),d.bumpMap&&(f.bumpMap.value=d.bumpMap,f.bumpScale.value=d.bumpScale,d.side===At&&(f.bumpScale.value*=-1)),d.displacementMap&&(f.displacementMap.value=d.displacementMap,f.displacementScale.value=d.displacementScale,f.displacementBias.value=d.displacementBias),d.emissiveMap&&(f.emissiveMap.value=d.emissiveMap),d.normalMap&&(f.normalMap.value=d.normalMap,f.normalScale.value.copy(d.normalScale),d.side===At&&f.normalScale.value.negate()),d.specularMap&&(f.specularMap.value=d.specularMap),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest);let M=e.get(d).envMap;if(M&&(f.envMap.value=M,f.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,f.reflectivity.value=d.reflectivity,f.ior.value=d.ior,f.refractionRatio.value=d.refractionRatio),d.lightMap){f.lightMap.value=d.lightMap;let T=r.useLegacyLights===!0?Math.PI:1;f.lightMapIntensity.value=d.lightMapIntensity*T}d.aoMap&&(f.aoMap.value=d.aoMap,f.aoMapIntensity.value=d.aoMapIntensity);let w;d.map?w=d.map:d.specularMap?w=d.specularMap:d.displacementMap?w=d.displacementMap:d.normalMap?w=d.normalMap:d.bumpMap?w=d.bumpMap:d.roughnessMap?w=d.roughnessMap:d.metalnessMap?w=d.metalnessMap:d.alphaMap?w=d.alphaMap:d.emissiveMap?w=d.emissiveMap:d.clearcoatMap?w=d.clearcoatMap:d.clearcoatNormalMap?w=d.clearcoatNormalMap:d.clearcoatRoughnessMap?w=d.clearcoatRoughnessMap:d.iridescenceMap?w=d.iridescenceMap:d.iridescenceThicknessMap?w=d.iridescenceThicknessMap:d.specularIntensityMap?w=d.specularIntensityMap:d.specularColorMap?w=d.specularColorMap:d.transmissionMap?w=d.transmissionMap:d.thicknessMap?w=d.thicknessMap:d.sheenColorMap?w=d.sheenColorMap:d.sheenRoughnessMap&&(w=d.sheenRoughnessMap),w!==void 0&&(w.isWebGLRenderTarget&&(w=w.texture),w.matrixAutoUpdate===!0&&w.updateMatrix(),f.uvTransform.value.copy(w.matrix));let _;d.aoMap?_=d.aoMap:d.lightMap&&(_=d.lightMap),_!==void 0&&(_.isWebGLRenderTarget&&(_=_.texture),_.matrixAutoUpdate===!0&&_.updateMatrix(),f.uv2Transform.value.copy(_.matrix))}function s(f,d){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity}function o(f,d){f.dashSize.value=d.dashSize,f.totalSize.value=d.dashSize+d.gapSize,f.scale.value=d.scale}function a(f,d,M,w){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,f.size.value=d.size*M,f.scale.value=w*.5,d.map&&(f.map.value=d.map),d.alphaMap&&(f.alphaMap.value=d.alphaMap),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest);let _;d.map?_=d.map:d.alphaMap&&(_=d.alphaMap),_!==void 0&&(_.matrixAutoUpdate===!0&&_.updateMatrix(),f.uvTransform.value.copy(_.matrix))}function l(f,d){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,f.rotation.value=d.rotation,d.map&&(f.map.value=d.map),d.alphaMap&&(f.alphaMap.value=d.alphaMap),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest);let M;d.map?M=d.map:d.alphaMap&&(M=d.alphaMap),M!==void 0&&(M.matrixAutoUpdate===!0&&M.updateMatrix(),f.uvTransform.value.copy(M.matrix))}function c(f,d){f.specular.value.copy(d.specular),f.shininess.value=Math.max(d.shininess,1e-4)}function h(f,d){d.gradientMap&&(f.gradientMap.value=d.gradientMap)}function p(f,d){f.roughness.value=d.roughness,f.metalness.value=d.metalness,d.roughnessMap&&(f.roughnessMap.value=d.roughnessMap),d.metalnessMap&&(f.metalnessMap.value=d.metalnessMap),e.get(d).envMap&&(f.envMapIntensity.value=d.envMapIntensity)}function u(f,d,M){f.ior.value=d.ior,d.sheen>0&&(f.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),f.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(f.sheenColorMap.value=d.sheenColorMap),d.sheenRoughnessMap&&(f.sheenRoughnessMap.value=d.sheenRoughnessMap)),d.clearcoat>0&&(f.clearcoat.value=d.clearcoat,f.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(f.clearcoatMap.value=d.clearcoatMap),d.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap),d.clearcoatNormalMap&&(f.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),f.clearcoatNormalMap.value=d.clearcoatNormalMap,d.side===At&&f.clearcoatNormalScale.value.negate())),d.iridescence>0&&(f.iridescence.value=d.iridescence,f.iridescenceIOR.value=d.iridescenceIOR,f.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(f.iridescenceMap.value=d.iridescenceMap),d.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=d.iridescenceThicknessMap)),d.transmission>0&&(f.transmission.value=d.transmission,f.transmissionSamplerMap.value=M.texture,f.transmissionSamplerSize.value.set(M.width,M.height),d.transmissionMap&&(f.transmissionMap.value=d.transmissionMap),f.thickness.value=d.thickness,d.thicknessMap&&(f.thicknessMap.value=d.thicknessMap),f.attenuationDistance.value=d.attenuationDistance,f.attenuationColor.value.copy(d.attenuationColor)),f.specularIntensity.value=d.specularIntensity,f.specularColor.value.copy(d.specularColor),d.specularIntensityMap&&(f.specularIntensityMap.value=d.specularIntensityMap),d.specularColorMap&&(f.specularColorMap.value=d.specularColorMap)}function m(f,d){d.matcap&&(f.matcap.value=d.matcap)}function x(f,d){f.referencePosition.value.copy(d.referencePosition),f.nearDistance.value=d.nearDistance,f.farDistance.value=d.farDistance}return{refreshFogUniforms:t,refreshMaterialUniforms:n}}function cf(r,e,t,n){let i={},s={},o=[],a=t.isWebGL2?r.getParameter(35375):0;function l(w,_){let T=_.program;n.uniformBlockBinding(w,T)}function c(w,_){let T=i[w.id];T===void 0&&(x(w),T=h(w),i[w.id]=T,w.addEventListener("dispose",d));let S=_.program;n.updateUBOMapping(w,S);let R=e.render.frame;s[w.id]!==R&&(u(w),s[w.id]=R)}function h(w){let _=p();w.__bindingPointIndex=_;let T=r.createBuffer(),S=w.__size,R=w.usage;return r.bindBuffer(35345,T),r.bufferData(35345,S,R),r.bindBuffer(35345,null),r.bindBufferBase(35345,_,T),T}function p(){for(let w=0;w<a;w++)if(o.indexOf(w)===-1)return o.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(w){let _=i[w.id],T=w.uniforms,S=w.__cache;r.bindBuffer(35345,_);for(let R=0,D=T.length;R<D;R++){let v=T[R];if(m(v,R,S)===!0){let E=v.__offset,I=Array.isArray(v.value)?v.value:[v.value],U=0;for(let K=0;K<I.length;K++){let z=I[K],L=f(z);typeof z=="number"?(v.__data[0]=z,r.bufferSubData(35345,E+U,v.__data)):z.isMatrix3?(v.__data[0]=z.elements[0],v.__data[1]=z.elements[1],v.__data[2]=z.elements[2],v.__data[3]=z.elements[0],v.__data[4]=z.elements[3],v.__data[5]=z.elements[4],v.__data[6]=z.elements[5],v.__data[7]=z.elements[0],v.__data[8]=z.elements[6],v.__data[9]=z.elements[7],v.__data[10]=z.elements[8],v.__data[11]=z.elements[0]):(z.toArray(v.__data,U),U+=L.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(35345,E,v.__data)}}r.bindBuffer(35345,null)}function m(w,_,T){let S=w.value;if(T[_]===void 0){if(typeof S=="number")T[_]=S;else{let R=Array.isArray(S)?S:[S],D=[];for(let v=0;v<R.length;v++)D.push(R[v].clone());T[_]=D}return!0}else if(typeof S=="number"){if(T[_]!==S)return T[_]=S,!0}else{let R=Array.isArray(T[_])?T[_]:[T[_]],D=Array.isArray(S)?S:[S];for(let v=0;v<R.length;v++){let E=R[v];if(E.equals(D[v])===!1)return E.copy(D[v]),!0}}return!1}function x(w){let _=w.uniforms,T=0,S=16,R=0;for(let D=0,v=_.length;D<v;D++){let E=_[D],I={boundary:0,storage:0},U=Array.isArray(E.value)?E.value:[E.value];for(let K=0,z=U.length;K<z;K++){let L=U[K],k=f(L);I.boundary+=k.boundary,I.storage+=k.storage}if(E.__data=new Float32Array(I.storage/Float32Array.BYTES_PER_ELEMENT),E.__offset=T,D>0){R=T%S;let K=S-R;R!==0&&K-I.boundary<0&&(T+=S-R,E.__offset=T)}T+=I.storage}return R=T%S,R>0&&(T+=S-R),w.__size=T,w.__cache={},this}function f(w){let _={boundary:0,storage:0};return typeof w=="number"?(_.boundary=4,_.storage=4):w.isVector2?(_.boundary=8,_.storage=8):w.isVector3||w.isColor?(_.boundary=16,_.storage=12):w.isVector4?(_.boundary=16,_.storage=16):w.isMatrix3?(_.boundary=48,_.storage=48):w.isMatrix4?(_.boundary=64,_.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),_}function d(w){let _=w.target;_.removeEventListener("dispose",d);let T=o.indexOf(_.__bindingPointIndex);o.splice(T,1),r.deleteBuffer(i[_.id]),delete i[_.id],delete s[_.id]}function M(){for(let w in i)r.deleteBuffer(i[w]);o=[],i={},s={}}return{bind:l,update:c,dispose:M}}function hf(){let r=ji("canvas");return r.style.display="block",r}function fs(r={}){this.isWebGLRenderer=!0;let e=r.canvas!==void 0?r.canvas:hf(),t=r.context!==void 0?r.context:null,n=r.depth!==void 0?r.depth:!0,i=r.stencil!==void 0?r.stencil:!0,s=r.antialias!==void 0?r.antialias:!1,o=r.premultipliedAlpha!==void 0?r.premultipliedAlpha:!0,a=r.preserveDrawingBuffer!==void 0?r.preserveDrawingBuffer:!1,l=r.powerPreference!==void 0?r.powerPreference:"default",c=r.failIfMajorPerformanceCaveat!==void 0?r.failIfMajorPerformanceCaveat:!1,h;t!==null?h=t.getContextAttributes().alpha:h=r.alpha!==void 0?r.alpha:!1;let p=null,u=null,m=[],x=[];this.domElement=e,this.debug={checkShaderErrors:!0},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.outputEncoding=Sn,this.useLegacyLights=!0,this.toneMapping=$t,this.toneMappingExposure=1;let f=this,d=!1,M=0,w=0,_=null,T=-1,S=null,R=new st,D=new st,v=null,E=e.width,I=e.height,U=1,K=null,z=null,L=new st(0,0,E,I),k=new st(0,0,E,I),$=!1,ee=new ls,B=!1,X=!1,Y=null,ne=new lt,N=new O,J={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function re(){return _===null?U:1}let A=t;function Z(y,F){for(let H=0;H<y.length;H++){let P=y[H],q=e.getContext(P,F);if(q!==null)return q}return null}try{let y={alpha:!0,depth:n,stencil:i,antialias:s,premultipliedAlpha:o,preserveDrawingBuffer:a,powerPreference:l,failIfMajorPerformanceCaveat:c};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Ar}`),e.addEventListener("webglcontextlost",_e,!1),e.addEventListener("webglcontextrestored",ge,!1),e.addEventListener("webglcontextcreationerror",pe,!1),A===null){let F=["webgl2","webgl","experimental-webgl"];if(f.isWebGL1Renderer===!0&&F.shift(),A=Z(F,y),A===null)throw Z(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}A.getShaderPrecisionFormat===void 0&&(A.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let ie,le,oe,te,xe,me,be,Ve,ze,Oe,Fe,Le,Te,ht,ut,b,g,V,Q,se,he,ye,ce,W;function ve(){ie=new Lu(A),le=new wu(A,ie,r),ie.init(le),ye=new af(A,ie,le),oe=new sf(A,ie,le),te=new Iu,xe=new qd,me=new rf(A,ie,oe,xe,le,ye,te),be=new Eu(f),Ve=new Ru(f),ze=new Hl(A,le),ce=new bu(A,ie,ze,le),Oe=new Pu(A,ze,te,ce),Fe=new zu(A,Oe,ze,te),Q=new Ou(A,le,me),b=new Tu(xe),Le=new Wd(f,be,Ve,ie,le,ce,b),Te=new lf(f,xe),ht=new Yd,ut=new Qd(ie,le),V=new Mu(f,be,Ve,oe,Fe,h,o),g=new nf(f,Fe,le),W=new cf(A,te,le,oe),se=new Su(A,ie,te,le),he=new Du(A,ie,te,le),te.programs=Le.programs,f.capabilities=le,f.extensions=ie,f.properties=xe,f.renderLists=ht,f.shadowMap=g,f.state=oe,f.info=te}ve();let ue=new xr(f,A);this.xr=ue,this.getContext=function(){return A},this.getContextAttributes=function(){return A.getContextAttributes()},this.forceContextLoss=function(){let y=ie.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){let y=ie.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return U},this.setPixelRatio=function(y){y!==void 0&&(U=y,this.setSize(E,I,!1))},this.getSize=function(y){return y.set(E,I)},this.setSize=function(y,F,H=!0){if(ue.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}E=y,I=F,e.width=Math.floor(y*U),e.height=Math.floor(F*U),H===!0&&(e.style.width=y+"px",e.style.height=F+"px"),this.setViewport(0,0,y,F)},this.getDrawingBufferSize=function(y){return y.set(E*U,I*U).floor()},this.setDrawingBufferSize=function(y,F,H){E=y,I=F,U=H,e.width=Math.floor(y*H),e.height=Math.floor(F*H),this.setViewport(0,0,y,F)},this.getCurrentViewport=function(y){return y.copy(R)},this.getViewport=function(y){return y.copy(L)},this.setViewport=function(y,F,H,P){y.isVector4?L.set(y.x,y.y,y.z,y.w):L.set(y,F,H,P),oe.viewport(R.copy(L).multiplyScalar(U).floor())},this.getScissor=function(y){return y.copy(k)},this.setScissor=function(y,F,H,P){y.isVector4?k.set(y.x,y.y,y.z,y.w):k.set(y,F,H,P),oe.scissor(D.copy(k).multiplyScalar(U).floor())},this.getScissorTest=function(){return $},this.setScissorTest=function(y){oe.setScissorTest($=y)},this.setOpaqueSort=function(y){K=y},this.setTransparentSort=function(y){z=y},this.getClearColor=function(y){return y.copy(V.getClearColor())},this.setClearColor=function(){V.setClearColor.apply(V,arguments)},this.getClearAlpha=function(){return V.getClearAlpha()},this.setClearAlpha=function(){V.setClearAlpha.apply(V,arguments)},this.clear=function(y=!0,F=!0,H=!0){let P=0;y&&(P|=16384),F&&(P|=256),H&&(P|=1024),A.clear(P)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",_e,!1),e.removeEventListener("webglcontextrestored",ge,!1),e.removeEventListener("webglcontextcreationerror",pe,!1),ht.dispose(),ut.dispose(),xe.dispose(),be.dispose(),Ve.dispose(),Fe.dispose(),ce.dispose(),W.dispose(),Le.dispose(),ue.dispose(),ue.removeEventListener("sessionstart",j),ue.removeEventListener("sessionend",de),Y&&(Y.dispose(),Y=null),fe.stop()};function _e(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),d=!0}function ge(){console.log("THREE.WebGLRenderer: Context Restored."),d=!1;let y=te.autoReset,F=g.enabled,H=g.autoUpdate,P=g.needsUpdate,q=g.type;ve(),te.autoReset=y,g.enabled=F,g.autoUpdate=H,g.needsUpdate=P,g.type=q}function pe(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function we(y){let F=y.target;F.removeEventListener("dispose",we),We(F)}function We(y){Qe(y),xe.remove(y)}function Qe(y){let F=xe.get(y).programs;F!==void 0&&(F.forEach(function(H){Le.releaseProgram(H)}),y.isShaderMaterial&&Le.releaseShaderCache(y))}this.renderBufferDirect=function(y,F,H,P,q,Me){F===null&&(F=J);let Se=q.isMesh&&q.matrixWorld.determinant()<0,Ce=_o(y,F,H,P,q);oe.setMaterial(P,Se);let Re=H.index,Ne=1;P.wireframe===!0&&(Re=Oe.getWireframeAttribute(H),Ne=2);let Pe=H.drawRange,De=H.attributes.position,Ze=Pe.start*Ne,Mt=(Pe.start+Pe.count)*Ne;Me!==null&&(Ze=Math.max(Ze,Me.start*Ne),Mt=Math.min(Mt,(Me.start+Me.count)*Ne)),Re!==null?(Ze=Math.max(Ze,0),Mt=Math.min(Mt,Re.count)):De!=null&&(Ze=Math.max(Ze,0),Mt=Math.min(Mt,De.count));let Ht=Mt-Ze;if(Ht<0||Ht===1/0)return;ce.setup(q,P,Ce,H,Re);let dn,Je=se;if(Re!==null&&(dn=ze.get(Re),Je=he,Je.setIndex(dn)),q.isMesh)P.wireframe===!0?(oe.setLineWidth(P.wireframeLinewidth*re()),Je.setMode(1)):Je.setMode(4);else if(q.isLine){let Ie=P.linewidth;Ie===void 0&&(Ie=1),oe.setLineWidth(Ie*re()),q.isLineSegments?Je.setMode(1):q.isLineLoop?Je.setMode(2):Je.setMode(3)}else q.isPoints?Je.setMode(0):q.isSprite&&Je.setMode(4);if(q.isInstancedMesh)Je.renderInstances(Ze,Ht,q.count);else if(H.isInstancedBufferGeometry){let Ie=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,ms=Math.min(H.instanceCount,Ie);Je.renderInstances(Ze,Ht,ms)}else Je.render(Ze,Ht)},this.compile=function(y,F){function H(P,q,Me){P.transparent===!0&&P.side===sn&&P.forceSinglePass===!1?(P.side=At,P.needsUpdate=!0,Ct(P,q,Me),P.side=on,P.needsUpdate=!0,Ct(P,q,Me),P.side=sn):Ct(P,q,Me)}u=ut.get(y),u.init(),x.push(u),y.traverseVisible(function(P){P.isLight&&P.layers.test(F.layers)&&(u.pushLight(P),P.castShadow&&u.pushShadow(P))}),u.setupLights(f.useLegacyLights),y.traverse(function(P){let q=P.material;if(q)if(Array.isArray(q))for(let Me=0;Me<q.length;Me++){let Se=q[Me];H(Se,y,P)}else H(q,y,P)}),x.pop(),u=null};let C=null;function G(y){C&&C(y)}function j(){fe.stop()}function de(){fe.start()}let fe=new uo;fe.setAnimationLoop(G),typeof self!="undefined"&&fe.setContext(self),this.setAnimationLoop=function(y){C=y,ue.setAnimationLoop(y),y===null?fe.stop():fe.start()},ue.addEventListener("sessionstart",j),ue.addEventListener("sessionend",de),this.render=function(y,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(d===!0)return;y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),ue.enabled===!0&&ue.isPresenting===!0&&(ue.cameraAutoUpdate===!0&&ue.updateCamera(F),F=ue.getCamera()),y.isScene===!0&&y.onBeforeRender(f,y,F,_),u=ut.get(y,x.length),u.init(),x.push(u),ne.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),ee.setFromProjectionMatrix(ne),X=this.localClippingEnabled,B=b.init(this.clippingPlanes,X),p=ht.get(y,m.length),p.init(),m.push(p),ke(y,F,0,f.sortObjects),p.finish(),f.sortObjects===!0&&p.sort(K,z),B===!0&&b.beginShadows();let H=u.state.shadowsArray;if(g.render(H,y,F),B===!0&&b.endShadows(),this.info.autoReset===!0&&this.info.reset(),V.render(p,y),u.setupLights(f.useLegacyLights),F.isArrayCamera){let P=F.cameras;for(let q=0,Me=P.length;q<Me;q++){let Se=P[q];et(p,y,Se,Se.viewport)}}else et(p,y,F);_!==null&&(me.updateMultisampleRenderTarget(_),me.updateRenderTargetMipmap(_)),y.isScene===!0&&y.onAfterRender(f,y,F),ce.resetDefaultState(),T=-1,S=null,x.pop(),x.length>0?u=x[x.length-1]:u=null,m.pop(),m.length>0?p=m[m.length-1]:p=null};function ke(y,F,H,P){if(y.visible===!1)return;if(y.layers.test(F.layers)){if(y.isGroup)H=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(F);else if(y.isLight)u.pushLight(y),y.castShadow&&u.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||ee.intersectsSprite(y)){P&&N.setFromMatrixPosition(y.matrixWorld).applyMatrix4(ne);let Se=Fe.update(y),Ce=y.material;Ce.visible&&p.push(y,Se,Ce,H,N.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(y.isSkinnedMesh&&y.skeleton.frame!==te.render.frame&&(y.skeleton.update(),y.skeleton.frame=te.render.frame),!y.frustumCulled||ee.intersectsObject(y))){P&&N.setFromMatrixPosition(y.matrixWorld).applyMatrix4(ne);let Se=Fe.update(y),Ce=y.material;if(Array.isArray(Ce)){let Re=Se.groups;for(let Ne=0,Pe=Re.length;Ne<Pe;Ne++){let De=Re[Ne],Ze=Ce[De.materialIndex];Ze&&Ze.visible&&p.push(y,Se,Ze,H,N.z,De)}}else Ce.visible&&p.push(y,Se,Ce,H,N.z,null)}}let Me=y.children;for(let Se=0,Ce=Me.length;Se<Ce;Se++)ke(Me[Se],F,H,P)}function et(y,F,H,P){let q=y.opaque,Me=y.transmissive,Se=y.transparent;u.setupLightsView(H),B===!0&&b.setGlobalState(f.clippingPlanes,H),Me.length>0&&dt(q,F,H),P&&oe.viewport(R.copy(P)),q.length>0&&zt(q,F,H),Me.length>0&&zt(Me,F,H),Se.length>0&&zt(Se,F,H),oe.buffers.depth.setTest(!0),oe.buffers.depth.setMask(!0),oe.buffers.color.setMask(!0),oe.setPolygonOffset(!1)}function dt(y,F,H){let P=le.isWebGL2;Y===null&&(Y=new ct(1024,1024,{generateMipmaps:!0,type:ie.has("EXT_color_buffer_half_float")?ln:bn,minFilter:yi,samples:P&&s===!0?4:0}));let q=f.getRenderTarget();f.setRenderTarget(Y),f.clear();let Me=f.toneMapping;f.toneMapping=$t,zt(y,F,H),f.toneMapping=Me,me.updateMultisampleRenderTarget(Y),me.updateRenderTargetMipmap(Y),f.setRenderTarget(q)}function zt(y,F,H){let P=F.isScene===!0?F.overrideMaterial:null;for(let q=0,Me=y.length;q<Me;q++){let Se=y[q],Ce=Se.object,Re=Se.geometry,Ne=P===null?Se.material:P,Pe=Se.group;Ce.layers.test(H.layers)&&Xe(Ce,F,H,Re,Ne,Pe)}}function Xe(y,F,H,P,q,Me){y.onBeforeRender(f,F,H,P,q,Me),y.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),q.onBeforeRender(f,F,H,P,y,Me),q.transparent===!0&&q.side===sn&&q.forceSinglePass===!1?(q.side=At,q.needsUpdate=!0,f.renderBufferDirect(H,F,P,q,y,Me),q.side=on,q.needsUpdate=!0,f.renderBufferDirect(H,F,P,q,y,Me),q.side=sn):f.renderBufferDirect(H,F,P,q,y,Me),y.onAfterRender(f,F,H,P,q,Me)}function Ct(y,F,H){F.isScene!==!0&&(F=J);let P=xe.get(y),q=u.state.lights,Me=u.state.shadowsArray,Se=q.state.version,Ce=Le.getParameters(y,q.state,Me,F,H),Re=Le.getProgramCacheKey(Ce),Ne=P.programs;P.environment=y.isMeshStandardMaterial?F.environment:null,P.fog=F.fog,P.envMap=(y.isMeshStandardMaterial?Ve:be).get(y.envMap||P.environment),Ne===void 0&&(y.addEventListener("dispose",we),Ne=new Map,P.programs=Ne);let Pe=Ne.get(Re);if(Pe!==void 0){if(P.currentProgram===Pe&&P.lightsStateVersion===Se)return Ut(y,Ce),Pe}else Ce.uniforms=Le.getUniforms(y),y.onBuild(H,Ce,f),y.onBeforeCompile(Ce,f),Pe=Le.acquireProgram(Ce,Re),Ne.set(Re,Pe),P.uniforms=Ce.uniforms;let De=P.uniforms;(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(De.clippingPlanes=b.uniform),Ut(y,Ce),P.needsLights=Mo(y),P.lightsStateVersion=Se,P.needsLights&&(De.ambientLightColor.value=q.state.ambient,De.lightProbe.value=q.state.probe,De.directionalLights.value=q.state.directional,De.directionalLightShadows.value=q.state.directionalShadow,De.spotLights.value=q.state.spot,De.spotLightShadows.value=q.state.spotShadow,De.rectAreaLights.value=q.state.rectArea,De.ltc_1.value=q.state.rectAreaLTC1,De.ltc_2.value=q.state.rectAreaLTC2,De.pointLights.value=q.state.point,De.pointLightShadows.value=q.state.pointShadow,De.hemisphereLights.value=q.state.hemi,De.directionalShadowMap.value=q.state.directionalShadowMap,De.directionalShadowMatrix.value=q.state.directionalShadowMatrix,De.spotShadowMap.value=q.state.spotShadowMap,De.spotLightMatrix.value=q.state.spotLightMatrix,De.spotLightMap.value=q.state.spotLightMap,De.pointShadowMap.value=q.state.pointShadowMap,De.pointShadowMatrix.value=q.state.pointShadowMatrix);let Ze=Pe.getUniforms(),Mt=Yn.seqWithValue(Ze.seq,De);return P.currentProgram=Pe,P.uniformsList=Mt,Pe}function Ut(y,F){let H=xe.get(y);H.outputEncoding=F.outputEncoding,H.instancing=F.instancing,H.skinning=F.skinning,H.morphTargets=F.morphTargets,H.morphNormals=F.morphNormals,H.morphColors=F.morphColors,H.morphTargetsCount=F.morphTargetsCount,H.numClippingPlanes=F.numClippingPlanes,H.numIntersection=F.numClipIntersection,H.vertexAlphas=F.vertexAlphas,H.vertexTangents=F.vertexTangents,H.toneMapping=F.toneMapping}function _o(y,F,H,P,q){F.isScene!==!0&&(F=J),me.resetTextureUnits();let Me=F.fog,Se=P.isMeshStandardMaterial?F.environment:null,Ce=_===null?f.outputEncoding:_.isXRRenderTarget===!0?_.texture.encoding:Sn,Re=(P.isMeshStandardMaterial?Ve:be).get(P.envMap||Se),Ne=P.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,Pe=!!P.normalMap&&!!H.attributes.tangent,De=!!H.morphAttributes.position,Ze=!!H.morphAttributes.normal,Mt=!!H.morphAttributes.color,Ht=P.toneMapped?f.toneMapping:$t,dn=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,Je=dn!==void 0?dn.length:0,Ie=xe.get(P),ms=u.state.lights;if(B===!0&&(X===!0||y!==S)){let bt=y===S&&P.id===T;b.setState(P,y,bt)}let tt=!1;P.version===Ie.__version?(Ie.needsLights&&Ie.lightsStateVersion!==ms.state.version||Ie.outputEncoding!==Ce||q.isInstancedMesh&&Ie.instancing===!1||!q.isInstancedMesh&&Ie.instancing===!0||q.isSkinnedMesh&&Ie.skinning===!1||!q.isSkinnedMesh&&Ie.skinning===!0||Ie.envMap!==Re||P.fog===!0&&Ie.fog!==Me||Ie.numClippingPlanes!==void 0&&(Ie.numClippingPlanes!==b.numPlanes||Ie.numIntersection!==b.numIntersection)||Ie.vertexAlphas!==Ne||Ie.vertexTangents!==Pe||Ie.morphTargets!==De||Ie.morphNormals!==Ze||Ie.morphColors!==Mt||Ie.toneMapping!==Ht||le.isWebGL2===!0&&Ie.morphTargetsCount!==Je)&&(tt=!0):(tt=!0,Ie.__version=P.version);let fn=Ie.currentProgram;tt===!0&&(fn=Ct(P,F,q));let Ur=!1,ai=!1,gs=!1,ft=fn.getUniforms(),pn=Ie.uniforms;if(oe.useProgram(fn.program)&&(Ur=!0,ai=!0,gs=!0),P.id!==T&&(T=P.id,ai=!0),Ur||S!==y){if(ft.setValue(A,"projectionMatrix",y.projectionMatrix),le.logarithmicDepthBuffer&&ft.setValue(A,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),S!==y&&(S=y,ai=!0,gs=!0),P.isShaderMaterial||P.isMeshPhongMaterial||P.isMeshToonMaterial||P.isMeshStandardMaterial||P.envMap){let bt=ft.map.cameraPosition;bt!==void 0&&bt.setValue(A,N.setFromMatrixPosition(y.matrixWorld))}(P.isMeshPhongMaterial||P.isMeshToonMaterial||P.isMeshLambertMaterial||P.isMeshBasicMaterial||P.isMeshStandardMaterial||P.isShaderMaterial)&&ft.setValue(A,"isOrthographic",y.isOrthographicCamera===!0),(P.isMeshPhongMaterial||P.isMeshToonMaterial||P.isMeshLambertMaterial||P.isMeshBasicMaterial||P.isMeshStandardMaterial||P.isShaderMaterial||P.isShadowMaterial||q.isSkinnedMesh)&&ft.setValue(A,"viewMatrix",y.matrixWorldInverse)}if(q.isSkinnedMesh){ft.setOptional(A,q,"bindMatrix"),ft.setOptional(A,q,"bindMatrixInverse");let bt=q.skeleton;bt&&(le.floatVertexTextures?(bt.boneTexture===null&&bt.computeBoneTexture(),ft.setValue(A,"boneTexture",bt.boneTexture,me),ft.setValue(A,"boneTextureSize",bt.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}let xs=H.morphAttributes;if((xs.position!==void 0||xs.normal!==void 0||xs.color!==void 0&&le.isWebGL2===!0)&&Q.update(q,H,fn),(ai||Ie.receiveShadow!==q.receiveShadow)&&(Ie.receiveShadow=q.receiveShadow,ft.setValue(A,"receiveShadow",q.receiveShadow)),P.isMeshGouraudMaterial&&P.envMap!==null&&(pn.envMap.value=Re,pn.flipEnvMap.value=Re.isCubeTexture&&Re.isRenderTargetTexture===!1?-1:1),ai&&(ft.setValue(A,"toneMappingExposure",f.toneMappingExposure),Ie.needsLights&&yo(pn,gs),Me&&P.fog===!0&&Te.refreshFogUniforms(pn,Me),Te.refreshMaterialUniforms(pn,P,U,I,Y),Yn.upload(A,Ie.uniformsList,pn,me)),P.isShaderMaterial&&P.uniformsNeedUpdate===!0&&(Yn.upload(A,Ie.uniformsList,pn,me),P.uniformsNeedUpdate=!1),P.isSpriteMaterial&&ft.setValue(A,"center",q.center),ft.setValue(A,"modelViewMatrix",q.modelViewMatrix),ft.setValue(A,"normalMatrix",q.normalMatrix),ft.setValue(A,"modelMatrix",q.matrixWorld),P.isShaderMaterial||P.isRawShaderMaterial){let bt=P.uniformsGroups;for(let vs=0,bo=bt.length;vs<bo;vs++)if(le.isWebGL2){let Br=bt[vs];W.update(Br,fn),W.bind(Br,fn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return fn}function yo(y,F){y.ambientLightColor.needsUpdate=F,y.lightProbe.needsUpdate=F,y.directionalLights.needsUpdate=F,y.directionalLightShadows.needsUpdate=F,y.pointLights.needsUpdate=F,y.pointLightShadows.needsUpdate=F,y.spotLights.needsUpdate=F,y.spotLightShadows.needsUpdate=F,y.rectAreaLights.needsUpdate=F,y.hemisphereLights.needsUpdate=F}function Mo(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return M},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return _},this.setRenderTargetTextures=function(y,F,H){xe.get(y.texture).__webglTexture=F,xe.get(y.depthTexture).__webglTexture=H;let P=xe.get(y);P.__hasExternalTextures=!0,P.__hasExternalTextures&&(P.__autoAllocateDepthBuffer=H===void 0,P.__autoAllocateDepthBuffer||ie.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),P.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(y,F){let H=xe.get(y);H.__webglFramebuffer=F,H.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(y,F=0,H=0){_=y,M=F,w=H;let P=!0,q=null,Me=!1,Se=!1;if(y){let Re=xe.get(y);Re.__useDefaultFramebuffer!==void 0?(oe.bindFramebuffer(36160,null),P=!1):Re.__webglFramebuffer===void 0?me.setupRenderTarget(y):Re.__hasExternalTextures&&me.rebindTextures(y,xe.get(y.texture).__webglTexture,xe.get(y.depthTexture).__webglTexture);let Ne=y.texture;(Ne.isData3DTexture||Ne.isDataArrayTexture||Ne.isCompressedArrayTexture)&&(Se=!0);let Pe=xe.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(q=Pe[F],Me=!0):le.isWebGL2&&y.samples>0&&me.useMultisampledRTT(y)===!1?q=xe.get(y).__webglMultisampledFramebuffer:q=Pe,R.copy(y.viewport),D.copy(y.scissor),v=y.scissorTest}else R.copy(L).multiplyScalar(U).floor(),D.copy(k).multiplyScalar(U).floor(),v=$;if(oe.bindFramebuffer(36160,q)&&le.drawBuffers&&P&&oe.drawBuffers(y,q),oe.viewport(R),oe.scissor(D),oe.setScissorTest(v),Me){let Re=xe.get(y.texture);A.framebufferTexture2D(36160,36064,34069+F,Re.__webglTexture,H)}else if(Se){let Re=xe.get(y.texture),Ne=F||0;A.framebufferTextureLayer(36160,36064,Re.__webglTexture,H||0,Ne)}T=-1},this.readRenderTargetPixels=function(y,F,H,P,q,Me,Se){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ce=xe.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&Se!==void 0&&(Ce=Ce[Se]),Ce){oe.bindFramebuffer(36160,Ce);try{let Re=y.texture,Ne=Re.format,Pe=Re.type;if(Ne!==xt&&ye.convert(Ne)!==A.getParameter(35739)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let De=Pe===ln&&(ie.has("EXT_color_buffer_half_float")||le.isWebGL2&&ie.has("EXT_color_buffer_float"));if(Pe!==bn&&ye.convert(Pe)!==A.getParameter(35738)&&!(Pe===Jt&&(le.isWebGL2||ie.has("OES_texture_float")||ie.has("WEBGL_color_buffer_float")))&&!De){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=y.width-P&&H>=0&&H<=y.height-q&&A.readPixels(F,H,P,q,ye.convert(Ne),ye.convert(Pe),Me)}finally{let Re=_!==null?xe.get(_).__webglFramebuffer:null;oe.bindFramebuffer(36160,Re)}}},this.copyFramebufferToTexture=function(y,F,H=0){let P=Math.pow(2,-H),q=Math.floor(F.image.width*P),Me=Math.floor(F.image.height*P);me.setTexture2D(F,0),A.copyTexSubImage2D(3553,H,0,0,y.x,y.y,q,Me),oe.unbindTexture()},this.copyTextureToTexture=function(y,F,H,P=0){let q=F.image.width,Me=F.image.height,Se=ye.convert(H.format),Ce=ye.convert(H.type);me.setTexture2D(H,0),A.pixelStorei(37440,H.flipY),A.pixelStorei(37441,H.premultiplyAlpha),A.pixelStorei(3317,H.unpackAlignment),F.isDataTexture?A.texSubImage2D(3553,P,y.x,y.y,q,Me,Se,Ce,F.image.data):F.isCompressedTexture?A.compressedTexSubImage2D(3553,P,y.x,y.y,F.mipmaps[0].width,F.mipmaps[0].height,Se,F.mipmaps[0].data):A.texSubImage2D(3553,P,y.x,y.y,Se,Ce,F.image),P===0&&H.generateMipmaps&&A.generateMipmap(3553),oe.unbindTexture()},this.copyTextureToTexture3D=function(y,F,H,P,q=0){if(f.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let Me=y.max.x-y.min.x+1,Se=y.max.y-y.min.y+1,Ce=y.max.z-y.min.z+1,Re=ye.convert(P.format),Ne=ye.convert(P.type),Pe;if(P.isData3DTexture)me.setTexture3D(P,0),Pe=32879;else if(P.isDataArrayTexture)me.setTexture2DArray(P,0),Pe=35866;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}A.pixelStorei(37440,P.flipY),A.pixelStorei(37441,P.premultiplyAlpha),A.pixelStorei(3317,P.unpackAlignment);let De=A.getParameter(3314),Ze=A.getParameter(32878),Mt=A.getParameter(3316),Ht=A.getParameter(3315),dn=A.getParameter(32877),Je=H.isCompressedTexture?H.mipmaps[0]:H.image;A.pixelStorei(3314,Je.width),A.pixelStorei(32878,Je.height),A.pixelStorei(3316,y.min.x),A.pixelStorei(3315,y.min.y),A.pixelStorei(32877,y.min.z),H.isDataTexture||H.isData3DTexture?A.texSubImage3D(Pe,q,F.x,F.y,F.z,Me,Se,Ce,Re,Ne,Je.data):H.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),A.compressedTexSubImage3D(Pe,q,F.x,F.y,F.z,Me,Se,Ce,Re,Je.data)):A.texSubImage3D(Pe,q,F.x,F.y,F.z,Me,Se,Ce,Re,Ne,Je),A.pixelStorei(3314,De),A.pixelStorei(32878,Ze),A.pixelStorei(3316,Mt),A.pixelStorei(3315,Ht),A.pixelStorei(32877,dn),q===0&&P.generateMipmaps&&A.generateMipmap(Pe),oe.unbindTexture()},this.initTexture=function(y){y.isCubeTexture?me.setTextureCube(y,0):y.isData3DTexture?me.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?me.setTexture2DArray(y,0):me.setTexture2D(y,0),oe.unbindTexture()},this.resetState=function(){M=0,w=0,_=null,oe.reset(),ce.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}Object.defineProperties(fs.prototype,{physicallyCorrectLights:{get:function(){return console.warn("THREE.WebGLRenderer: the property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),!this.useLegacyLights},set:function(r){console.warn("THREE.WebGLRenderer: the property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),this.useLegacyLights=!r}}});var vr=class extends fs{};vr.prototype.isWebGL1Renderer=!0;var Qn=class extends Ft{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}get autoUpdate(){return console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate}set autoUpdate(e){console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate=e}};var hs=class extends yt{constructor(e=null,t=1,n=1,i,s,o,a,l,c=Ge,h=Ge,p,u){super(null,o,a,l,c,h,i,s,p,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ei=class extends Lt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};function nn(r,e,t){return xo(r)?new r.constructor(r.subarray(e,t!==void 0?t:r.length)):r.slice(e,t)}function Ji(r,e,t){return!r||!t&&r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function xo(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}var ti=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=s)){let a=t[1];e<a&&(n=2,s=a);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break e}o=n,n=0;break t}break n}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let o=0;o!==i;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},_r=class extends ti{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ga,endingEnd:ga}}intervalChanged_(e,t,n){let i=this.parameterPositions,s=e-2,o=e+1,a=i[s],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case xa:s=e,a=2*t-n;break;case va:s=i.length-2,a=t+i[s]-i[s+1];break;default:s=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case xa:o=e,l=2*n-t;break;case va:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=o*h}interpolate_(e,t,n,i){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,p=this._offsetNext,u=this._weightPrev,m=this._weightNext,x=(n-t)/(i-t),f=x*x,d=f*x,M=-u*d+2*u*f-u*x,w=(1+u)*d+(-1.5-2*u)*f+(-.5+u)*x+1,_=(-1-m)*d+(1.5+m)*f+.5*x,T=m*d-m*f;for(let S=0;S!==a;++S)s[S]=M*o[h+S]+w*o[c+S]+_*o[l+S]+T*o[p+S];return s}},yr=class extends ti{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(i-t),p=1-h;for(let u=0;u!==a;++u)s[u]=o[c+u]*p+o[l+u]*h;return s}},Mr=class extends ti{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Ot=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ji(t,this.TimeBufferType),this.values=Ji(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ji(e.times,Array),values:Ji(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Mr(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new yr(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new _r(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case $i:t=this.InterpolantFactoryMethodDiscrete;break;case Ki:t=this.InterpolantFactoryMethodLinear;break;case Ts:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return $i;case this.InterpolantFactoryMethodLinear:return Ki;case this.InterpolantFactoryMethodSmooth:return Ts}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,s=0,o=i-1;for(;s!==i&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);let a=this.getValueSize();this.times=nn(n,s,o),this.values=nn(this.values,s*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&xo(i))for(let a=0,l=i.length;a!==l;++a){let c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=nn(this.times),t=nn(this.values),n=this.getValueSize(),i=this.getInterpolation()===Ts,s=e.length-1,o=1;for(let a=1;a<s;++a){let l=!1,c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(i)l=!0;else{let p=a*n,u=p-n,m=p+n;for(let x=0;x!==n;++x){let f=t[p+x];if(f!==t[u+x]||f!==t[m+x]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];let p=a*n,u=o*n;for(let m=0;m!==n;++m)t[u+m]=t[p+m]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=nn(e,0,o),this.values=nn(t,0,o*n)):(this.times=e,this.values=t),this}clone(){let e=nn(this.times,0),t=nn(this.values,0),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}};Ot.prototype.TimeBufferType=Float32Array;Ot.prototype.ValueBufferType=Float32Array;Ot.prototype.DefaultInterpolation=Ki;var En=class extends Ot{};En.prototype.ValueTypeName="bool";En.prototype.ValueBufferType=Array;En.prototype.DefaultInterpolation=$i;En.prototype.InterpolantFactoryMethodLinear=void 0;En.prototype.InterpolantFactoryMethodSmooth=void 0;var br=class extends Ot{};br.prototype.ValueTypeName="color";var Sr=class extends Ot{};Sr.prototype.ValueTypeName="number";var wr=class extends ti{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t),c=e*a;for(let h=c+a;c!==h;c+=4)hn.slerpFlat(s,0,o,c-a,o,c,l);return s}},wi=class extends Ot{InterpolantFactoryMethodLinear(e){return new wr(this.times,this.values,this.getValueSize(),e)}};wi.prototype.ValueTypeName="quaternion";wi.prototype.DefaultInterpolation=Ki;wi.prototype.InterpolantFactoryMethodSmooth=void 0;var An=class extends Ot{};An.prototype.ValueTypeName="string";An.prototype.ValueBufferType=Array;An.prototype.DefaultInterpolation=$i;An.prototype.InterpolantFactoryMethodLinear=void 0;An.prototype.InterpolantFactoryMethodSmooth=void 0;var Tr=class extends Ot{};Tr.prototype.ValueTypeName="vector";var Pr="\\[\\]\\.:\\/",uf=new RegExp("["+Pr+"]","g"),Dr="[^"+Pr+"]",df="[^"+Pr.replace("\\.","")+"]",ff=/((?:WC+[\/:])*)/.source.replace("WC",Dr),pf=/(WCOD+)?/.source.replace("WCOD",df),mf=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Dr),gf=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Dr),xf=new RegExp("^"+ff+pf+mf+gf+"$"),vf=["material","materials","bones","map"],Er=class{constructor(e,t,n){let i=n||He.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},He=class r{constructor(e,t,n){this.path=t,this.parsedPath=n||r.parseTrackName(t),this.node=r.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new r.Composite(e,t,n):new r(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(uf,"")}static parseTrackName(e){let t=xf.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);vf.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let o=0;o<s.length;o++){let a=s[o];if(a.name===t||a.uuid===t)return a;let l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,s=t.propertyIndex;if(e||(e=r.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.error("THREE.PropertyBinding: Trying to update node for track: "+this.path+" but it wasn't found.");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let o=e[i];if(o===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};He.Composite=Er;He.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};He.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};He.prototype.GetterByBindingType=[He.prototype._getValue_direct,He.prototype._getValue_array,He.prototype._getValue_arrayElement,He.prototype._getValue_toArray];He.prototype.SetterByBindingTypeAndVersioning=[[He.prototype._setValue_direct,He.prototype._setValue_direct_setNeedsUpdate,He.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[He.prototype._setValue_array,He.prototype._setValue_array_setNeedsUpdate,He.prototype._setValue_array_setMatrixWorldNeedsUpdate],[He.prototype._setValue_arrayElement,He.prototype._setValue_arrayElement_setNeedsUpdate,He.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[He.prototype._setValue_fromArray,He.prototype._setValue_fromArray_setNeedsUpdate,He.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Vf=new Float32Array(1);typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ar}}));typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ar);var Ei=9.995,yf=1.33,Ai={renderer:{clearColor:"#ffffff"},composer:{bloom:{enabled:!0,strength:2.2,radius:.15,threshold:.38,smoothWidth:.5}},relief:{scroll:{speed:.25},flowmap:{mouseEase:.4,dissipation:.953,falloff:.38,alpha:1},extrude:{textureStrength:1,gradientStrength:.17},camera:{fov:30,distance:15,fastModeZoom:.6,slowModeZoom:1,near:5,far:20},scrollExtrude:{noiseSize:7.77,speed:2,mask:{min:-1,max:1},strength:1.02},chromaticMask:{fresnelSharpness:35,fresnelOpacity:.98,shadowRange:{min:.2,max:.42},shadowOpacity:.25},fluidEffect:{amplitude:.57,shadowStrength:.3,baseColor:{r:122,g:191,b:197},baseThreshold:1,fluidMagnitude:.15,fluidRedCoef:2,fluidGreenCoef:1,fluidBlueCoef:1.5,linesSpeed:2,linesScale:4,linesStrength:0,linesWaveLength:.15,hueShift:-.52,colorRange:2}},scroll:{fastMode:{fastTrigger:.99,fastOffsetSpeed:.05,fastFactorSlowDown:.3,fastFactorSpeedUp:.6},slowMode:{slowTrigger:.75,slowOffsetSpeed:.025,slowFactorSlowDown:.3,slowFactorSpeedUp:.9}},fluidFlowmap:{densityDissipation:.95,velocityDissipation:.8891,pressureDissipation:.925,velocityRange:{min:5,max:78},curlStrength:.1,radius:.7}},un=(r,e,t)=>r+(e-r)*t,zr=(r,e,t)=>Math.min(t,Math.max(e,r)),Mf=(r,[e,t],[n,i])=>zr(n+(i-n)*((r-e)/(t-e)),Math.min(n,i),Math.max(n,i)),ps={"power2.out":r=>1-(1-r)*(1-r),"power1.out":r=>1-(1-r),"sine.out":r=>Math.sin(r*Math.PI/2),"sine.inOut":r=>-(Math.cos(Math.PI*r)-1)/2,none:r=>r};function vo({strength:r,points:e,template:t}){let n=ps[t]||ps.none,i=[[0,0]];for(let s=1;s<e;s++){let o=s/e,a=n(o)+(Math.random()-.5)*r*.4/Math.max(1,e/12);i.push([o,zr(a,0,1)])}return i.push([1,1]),s=>{for(let o=1;o<i.length;o++)if(s<=i[o][0]){let[a,l]=i[o-1],[c,h]=i[o];return l+(h-l)*((s-a)/(c-a))}return 1}}var Ci=new Set;function Ir(r,e,t,n,i="none",s){let o={obj:r,key:e,a:s!=null?s:r[e],b:t,t:0,dur:Math.max(.001,n),e:typeof i=="function"?i:ps[i]||ps.none};return[...Ci].forEach(a=>{a.obj===r&&a.key===e&&Ci.delete(a)}),Ci.add(o),o}function bf(r){Ci.forEach(e=>{e.t=Math.min(1,e.t+r/e.dur),e.obj[e.key]=un(e.a,e.b,e.e(e.t)),e.t>=1&&Ci.delete(e)})}var Ri=class extends Nt{constructor(){super(),this.setAttribute("position",new Ye(new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),3)),this.setAttribute("uv",new Ye(new Float32Array([0,0,2,0,0,2]),2))}},Fr=class{constructor(e){this.normalFlip=new Ee(-1,-1),this.velocity=new Ee,this.last=new Ee(-1,-1);let t=n=>{if(!e&&n.pointerType&&n.pointerType!=="mouse")return;let i=n.clientX,s=n.clientY;if(n.changedTouches&&n.changedTouches.length){if(!e)return;i=n.changedTouches[0].clientX,s=n.changedTouches[0].clientY}this.normalFlip.set(i/innerWidth,1-s/innerHeight)};addEventListener("pointerdown",t),addEventListener("pointermove",t),addEventListener("touchmove",t,{passive:!0})}tick(e){this.last.x===-1&&this.last.copy(this.normalFlip);let t=this.normalFlip.x-this.last.x,n=this.normalFlip.y-this.last.y;this.last.copy(this.normalFlip);let i=Math.min(32,e)/16;this.velocity.set(t*i,n*i)}},Sf=`precision highp float;
#define GLSLIFY 1
uniform sampler2D tMap;uniform float uFalloff;uniform float uAlpha;uniform float uDissipation;uniform float uDeltaMult;uniform float uOffset;uniform float uAspect;uniform vec2 uMouse;uniform vec2 uVelocity;uniform vec2 uMouse2;uniform vec2 uVelocity2;uniform sampler2D tNoise;uniform float uTime;varying vec2 vUv;vec4 getStamp(vec2 velocity,vec2 mouse){vec2 cursor=vUv-mouse;cursor.x*=uAspect;velocity*=50.0;float magnitude=1.0-pow(1.0-min(1.0,length(velocity)),2.0);vec4 stamp=vec4(velocity,magnitude,1.0);float falloff=smoothstep(uFalloff,0.0,length(cursor))*uAlpha;return stamp*falloff;}void main(){vec2 uv=vUv;uv.y+=uOffset;vec4 data=texture2D(tMap,uv);float friction=(1.0/uDissipation)-1.0;float dissipation=1.0/(1.0+(uDeltaMult*friction));data*=dissipation;float noise=0.00+1.00*smoothstep(0.4,1.0,texture2D(tNoise,(vUv*vec2(uAspect,1.0))*0.35+vec2(0.01,0.01)*uTime).g);float noise2=0.15+0.85*smoothstep(0.4,1.0,texture2D(tNoise,(vUv*vec2(uAspect,1.0))*0.8+vec2(0.01,0.01)*uTime).g);vec4 stamp=getStamp(uVelocity,uMouse);data+=stamp*noise2*uDeltaMult;vec4 stamp2=getStamp(uVelocity2,uMouse2)*3.;stamp2.a=stamp2.b;stamp2.rg*=0.0;data+=stamp2*noise*uDeltaMult;data=min(data,vec4(1));data.rgb=max(data.rgb,vec3(-1));gl_FragColor=data;}`,wf=`#define GLSLIFY 1
attribute vec2 uv;attribute vec3 position;varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,1);}`,Nr=class{constructor(e,{size:t=256,falloff:n=.5,alpha:i=.3,dissipation:s=.98,tNoise:o,uTime:a}){this.renderer=e,this.camera=new Tn,this.scene=new Qn,this.uniform={value:null};let l={type:/(iPad|iPhone|iPod)/g.test(navigator.userAgent)?ln:Jt,depthBuffer:!1};this.mask={read:new ct(t,t,l),write:new ct(t,t,l)},this.mask.swap=()=>{let h=this.mask.read;this.mask.read=this.mask.write,this.mask.write=h,this.uniform.value=this.mask.read.texture},this.mask.swap(),this.aspect=1,this.mouse=new Ee,this.velocity=new Ee,this.mouse2=new Ee,this.velocity2=new Ee;let c=new ei({vertexShader:wf,fragmentShader:Sf,depthTest:!1,uniforms:{tMap:this.uniform,uFalloff:{value:n*.5},uAlpha:{value:i},uDissipation:{value:s},uDeltaMult:{value:1},tNoise:o,uTime:a,uAspect:{value:1},uMouse:{value:this.mouse},uVelocity:{value:this.velocity},uMouse2:{value:this.mouse2},uVelocity2:{value:this.velocity2},uOffset:{value:0}}});this.mesh=new ot(new Ri,c),this.mesh.frustumCulled=!1,this.scene.add(this.mesh)}setFalloff(e){this.mesh.material.uniforms.uFalloff.value=e*.5}setDissipation(e){this.mesh.material.uniforms.uDissipation.value=e}setAlpha(e){this.mesh.material.uniforms.uAlpha.value=e}update(e=0){let t=this.mesh.material.uniforms;t.uAspect.value=this.aspect,t.uOffset.value=e;let n=this.renderer.getRenderTarget();this.renderer.setRenderTarget(this.mask.write),this.renderer.render(this.scene,this.camera),this.renderer.setRenderTarget(n),this.mask.swap()}tick(e){this.mesh.material.uniforms.uDeltaMult.value=Math.min(e,32)/16}},Tf=`
precision highp float;
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform vec2 texelSize;
void main () {
	vUv = uv;
	vL = vUv - vec2(texelSize.x, 0.0);
	vR = vUv + vec2(texelSize.x, 0.0);
	vT = vUv + vec2(0.0, texelSize.y);
	vB = vUv - vec2(0.0, texelSize.y);
	gl_Position = vec4(position, 0, 1);
}
`,Ef=`
precision mediump float;
precision mediump sampler2D;
varying highp vec2 vUv;
uniform sampler2D uTexture;
uniform float value;
void main () {
	gl_FragColor = value * texture2D(uTexture, vUv);
}
`,Af=`
precision highp float;
precision highp sampler2D;
varying vec2 vUv;
uniform sampler2D uTarget;
uniform float aspectRatio;
uniform vec3 color;
uniform vec2 point;
uniform float radius;
void main () {
	vec2 p = vUv - point.xy;
	p.x *= aspectRatio;
	vec3 splat = exp(-dot(p, p) / radius) * color;
	vec3 base = texture2D(uTarget, vUv).xyz;
	gl_FragColor = vec4(base + splat, 1.0);
}
`,Cf=`
precision highp float;
precision highp sampler2D;
varying vec2 vUv;
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 texelSize;
uniform float dt;
uniform float dissipation;
void main () {
	vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
	gl_FragColor = dissipation * texture2D(uSource, coord);
	gl_FragColor.a = 1.0;
}
`,Rf=`
precision mediump float;
precision mediump sampler2D;
varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D uVelocity;
void main () {
	float L = texture2D(uVelocity, vL).x;
	float R = texture2D(uVelocity, vR).x;
	float T = texture2D(uVelocity, vT).y;
	float B = texture2D(uVelocity, vB).y;
	vec2 C = texture2D(uVelocity, vUv).xy;
	if (vL.x < 0.0) { L = -C.x; }
	if (vR.x > 1.0) { R = -C.x; }
	if (vT.y > 1.0) { T = -C.y; }
	if (vB.y < 0.0) { B = -C.y; }
	float div = 0.5 * (R - L + T - B);
	gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
}
`,Lf=`
precision mediump float;
precision mediump sampler2D;
varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D uVelocity;
void main () {
	float L = texture2D(uVelocity, vL).y;
	float R = texture2D(uVelocity, vR).y;
	float T = texture2D(uVelocity, vT).x;
	float B = texture2D(uVelocity, vB).x;
	float vorticity = R - L - T + B;
	gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
}
`,Pf=`
precision highp float;
precision highp sampler2D;
varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform sampler2D uVelocity;
uniform sampler2D uCurl;
uniform float curl;
uniform float dt;
void main () {
	float L = texture2D(uCurl, vL).x;
	float R = texture2D(uCurl, vR).x;
	float T = texture2D(uCurl, vT).x;
	float B = texture2D(uCurl, vB).x;
	float C = texture2D(uCurl, vUv).x;
	vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
	force /= length(force) + 0.0001;
	force *= curl * C;
	force.y *= -1.0;
	vec2 vel = texture2D(uVelocity, vUv).xy;
	gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);
}
`,Df=`
precision mediump float;
precision mediump sampler2D;
varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D uPressure;
uniform sampler2D uDivergence;
void main () {
	float L = texture2D(uPressure, vL).x;
	float R = texture2D(uPressure, vR).x;
	float T = texture2D(uPressure, vT).x;
	float B = texture2D(uPressure, vB).x;
	float C = texture2D(uPressure, vUv).x;
	float divergence = texture2D(uDivergence, vUv).x;
	float pressure = (L + R + B + T - divergence) * 0.25;
	gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
}
`,If=`
precision mediump float;
precision mediump sampler2D;
varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D uPressure;
uniform sampler2D uVelocity;
void main () {
	float L = texture2D(uPressure, vL).x;
	float R = texture2D(uPressure, vR).x;
	float T = texture2D(uPressure, vT).x;
	float B = texture2D(uPressure, vB).x;
	vec2 velocity = texture2D(uVelocity, vUv).xy;
	velocity.xy -= vec2(R - L, T - B);
	gl_FragColor = vec4(velocity, 0.0, 1.0);
}
`,Or=class{constructor(e,t){let n=new Tn,i=new Ue(1,1,1);this.uniform={value:null},this.queue=[];let s=(B,X,Y)=>{let ne={read:new ct(B,X,Y),write:new ct(B,X,Y)};return ne.swap=()=>{let N=ne.read;ne.read=ne.write,ne.write=N},ne},o=128,a=512,l=3,c={value:new Ee(1/o,1/o)},h=e.capabilities.isWebGL2,p=xt,u=h?Rr:xt,m=h?Cr:xt,x={type:ln,depthBuffer:!1},f=s(a,a,{...x,format:p,minFilter:it,magFilter:it}),d=s(o,o,{...x,format:u,minFilter:it,magFilter:it}),M=s(o,o,{...x,format:m,minFilter:Ge,magFilter:Ge}),w=new ct(o,o,{...x,format:m,minFilter:Ge,magFilter:Ge}),_=new ct(o,o,{...x,format:m,minFilter:Ge,magFilter:Ge}),T=new Ri,S=(B,X)=>{let Y=new ot(T,new ei({vertexShader:Tf,fragmentShader:B,uniforms:{texelSize:c,...X},depthTest:!1,depthWrite:!1}));return Y.scene=new Qn,Y.scene.add(Y),Y.frustumCulled=!1,Y},R=S(Ef,{uTexture:{value:null},value:{value:1}}),D=S(Af,{uTarget:{value:null},aspectRatio:{value:1},color:{value:new O},point:{value:new Ee},radius:{value:1}}),v=S(Cf,{dyeTexelSize:{value:new Ee(1/a,1/a)},uVelocity:{value:null},uSource:{value:null},dt:{value:.016},dissipation:{value:1}}),E=S(Rf,{uVelocity:{value:null}}),I=S(Lf,{uVelocity:{value:null}}),U=S(Pf,{uVelocity:{value:null},uCurl:{value:null},curl:{value:5},dt:{value:.016}}),K=S(Df,{uPressure:{value:null},uDivergence:{value:null}}),z=S(If,{uPressure:{value:null},uVelocity:{value:null}}),L=new Ee,k=!1,$=B=>{let X=B.getCoalescedEvents&&B.getCoalescedEvents();if(X&&X.length>1){X.forEach($);return}let Y=B.clientX,ne=B.clientY;k||(k=!0,L.set(Y,ne));let N=Y-L.x,J=ne-L.y,re=20;N&&(N/=Math.max(1,Math.abs(N)/re)),J&&(J/=Math.max(1,Math.abs(J)/re)),L.set(Y,ne),(Math.abs(N)||Math.abs(J))&&this.queue.push({x:Y/innerWidth,y:1-ne/innerHeight,dx:N*5,dy:J*-5})};addEventListener("pointermove",$,!1);let ee=({x:B,y:X,dx:Y,dy:ne})=>{D.material.uniforms.uTarget.value=d.read.texture,D.material.uniforms.aspectRatio.value=innerWidth/innerHeight,D.material.uniforms.point.value.set(B,X),D.material.uniforms.color.value.set(Y,ne,1);let N=Mf(Math.sqrt(Y*Y+ne*ne),[t.velocityRange.min,t.velocityRange.max],[0,2]);D.material.uniforms.radius.value=t.radius/100*Math.max(N,0),e.setRenderTarget(d.write),e.render(D.scene,n),d.swap(),D.material.uniforms.uTarget.value=f.read.texture,e.setRenderTarget(f.write),e.render(D.scene,n),f.swap()};this.tick=()=>{let B=e.autoClear,X=new Ue;e.getClearColor(X);let Y=e.getClearAlpha();e.setClearColor(i,1),e.autoClear=!1;for(let ne=this.queue.length-1;ne>=0;ne--)ee(this.queue.splice(ne,1)[0]);I.material.uniforms.uVelocity.value=d.read.texture,e.setRenderTarget(_),e.render(I.scene,n),U.material.uniforms.uVelocity.value=d.read.texture,U.material.uniforms.uCurl.value=_.texture,U.material.uniforms.curl.value=t.curlStrength,e.setRenderTarget(d.write),e.render(U.scene,n),d.swap(),E.material.uniforms.uVelocity.value=d.read.texture,e.setRenderTarget(w),e.render(E.scene,n),R.material.uniforms.uTexture.value=M.read.texture,R.material.uniforms.value.value=t.pressureDissipation,e.setRenderTarget(M.write),e.render(R.scene,n),M.swap(),K.material.uniforms.uDivergence.value=w.texture;for(let ne=0;ne<l;ne++)K.material.uniforms.uPressure.value=M.read.texture,e.setRenderTarget(M.write),e.render(K.scene,n),M.swap();z.material.uniforms.uPressure.value=M.read.texture,z.material.uniforms.uVelocity.value=d.read.texture,e.setRenderTarget(d.write),e.render(z.scene,n),d.swap(),v.material.uniforms.dyeTexelSize.value.set(1/o,1/o),v.material.uniforms.uVelocity.value=d.read.texture,v.material.uniforms.uSource.value=d.read.texture,v.material.uniforms.dissipation.value=t.velocityDissipation,e.setRenderTarget(d.write),e.render(v.scene,n),d.swap(),v.material.uniforms.dyeTexelSize.value.set(1/a,1/a),v.material.uniforms.uVelocity.value=d.read.texture,v.material.uniforms.uSource.value=f.read.texture,v.material.uniforms.dissipation.value=t.densityDissipation,e.setRenderTarget(f.write),e.render(v.scene,n),f.swap(),this.uniform.value=f.read.texture,e.autoClear=B,e.setClearColor(X,Y),e.setRenderTarget(null)}}},Ff=`precision highp float;
#define GLSLIFY 1
uniform float uTime;uniform vec2 uResolution;uniform sampler2D tMaskNoise;uniform sampler2D tFlow;uniform sampler2D tBake1;uniform sampler2D tBake2;uniform sampler2D tPlaster;uniform float uScreenScroll;uniform float uTextureStrength;uniform float uGradientStrength;uniform float uOpacity;uniform float uSwitchColorTransition;uniform float uSwitchColorFastScroll;uniform float uFastScroll;uniform sampler2D tFluidFlowmap;uniform float uBrightnessFactor;uniform float uBrightnessOffset;varying vec2 vUv;varying vec3 vNormal;varying vec3 vPos;varying vec3 vEye;vec4 sRGBTransferOETF(in vec4 value){
#ifdef AUSTIN_LINEAR_BAKE
return value;
#else
return vec4(mix(pow(value.rgb,vec3(0.41666))*1.055-vec3(0.055),value.rgb*12.92,vec3(lessThanEqual(value.rgb,vec3(0.0031308)))),value.a);
#endif
}float circularIn(float t){return 1.0-sqrt(1.0-t*t);}vec2 getFastScrollNoise(float time,vec2 screenUv,sampler2D noiseTexture,vec4 params){float speed=params.x;float noiseSize=params.y;vec2 mask=params.zw;float t=time*speed;vec2 uvFastScrollNoise=screenUv/noiseSize+t*0.007;vec2 uvFastScrollNoise2=screenUv/noiseSize-t*0.007;vec3 fastScrollNoise=texture2D(noiseTexture,uvFastScrollNoise).rgb;vec3 fastScrollNoise2=texture2D(noiseTexture,uvFastScrollNoise2).rgb;fastScrollNoise=(fastScrollNoise+fastScrollNoise2)/2.;vec3 colorDot=vec3(sin(vec3(t,t+1.047,t+2.094)));float colorAvg=(abs(colorDot.r)+abs(colorDot.g)+abs(colorDot.b))/3.;colorDot/=colorAvg;vec3 colorDot2=vec3(sin(vec3(t+1.047,t+2.094,t)));float colorAvg2=(abs(colorDot2.r)+abs(colorDot2.g)+abs(colorDot2.b))/3.;colorDot2/=colorAvg2;float fastScrollExtrude=smoothstep(mask.x,mask.y,dot(normalize(fastScrollNoise-0.5),colorDot));float fastScrollExtrude2=smoothstep(mask.x,mask.y,dot(normalize(fastScrollNoise-0.5),colorDot2));return vec2(circularIn(fastScrollExtrude),circularIn(fastScrollExtrude2));}struct FluidEffectConfig{float amplitude;float shadowStrength;float fluidMagnitude;float fluidRedCoef;float fluidGreenCoef;float fluidBlueCoef;float linesSpeed;float linesScale;float linesStrength;float linesWaveLength;vec3 baseColor;float baseThreshold;float hueShift;float colorRange;};float cremap(float value,float start1,float stop1,float start2,float stop2){float r=start2+(stop2-start2)*((value-start1)/(stop1-start1));return clamp(r,min(start2,stop2),max(start2,stop2));}vec3 hsv2rgb(vec3 c){vec4 K=vec4(1.0,2.0/3.0,1.0/3.0,3.0);vec3 p=abs(fract(c.xxx+K.xyz)*6.0-K.www);return c.z*mix(K.xxx,clamp(p-K.xxx,0.0,1.0),c.y);}vec3 rgb2hsv(vec3 c){vec4 K=vec4(0.0,-1.0/3.0,2.0/3.0,-1.0);vec4 p=mix(vec4(c.bg,K.wz),vec4(c.gb,K.xy),step(c.b,c.g));vec4 q=mix(vec4(p.xyw,c.r),vec4(c.r,p.yzx),step(p.x,c.r));float d=q.x-min(q.w,q.y);float e=1.0e-10;return vec3(abs(q.z+(q.w-q.y)/(6.0*d+e)),d/(q.x+e),q.x);}vec3 applyFluidEffect(FluidEffectConfig config,vec3 color,vec4 fluid,vec2 uv,float time,float mask,vec3 normal){float rgbVel=(fluid.r+fluid.g)*0.005*4.;vec3 rgbCoef=vec3(config.fluidRedCoef,config.fluidGreenCoef,config.fluidBlueCoef);vec3 aberrationColor=vec3(sin(rgbVel*rgbCoef));float fluidEdges=smoothstep(0.0,1.0,fluid.b*config.fluidMagnitude);vec2 uvLines=uv+time*0.01*config.linesSpeed;uvLines.x=uvLines.x*1000.0/config.linesScale;uvLines.y=sin(uvLines.y*50.0*config.linesWaveLength)*20.0/config.linesScale;float lines=smoothstep(-1.0,0.5,sin(uvLines.x+uvLines.y));lines=mix(1.0,lines,config.linesStrength);vec3 normalVector=normal;normalVector.z*=config.colorRange;normalVector=normalize(normalVector);vec3 normalColor=(normalVector+1.)/2.;normalColor=rgb2hsv(normalColor);normalColor.r=fract(normalColor.r+config.hueShift);normalColor=hsv2rgb(normalColor);vec3 effectColor=normalColor;color=mix(color,effectColor,mask*fluidEdges*lines*config.amplitude);
#if SHOW_EFFECT_FLUID
color=vec3(fluidEdges);
#endif
#if SHOW_EFFECT_COLORS
color=mix(vec3(1.),effectColor,fluidEdges*config.amplitude);
#endif
#if SHOW_EFFECT_LINES
color=vec3(lines);
#endif
return color;}const FluidEffectConfig effectConfig=FluidEffectConfig(EFFECT_AMPLITUDE,EFFECT_SHADOW_STRENGTH,EFFECT_FLUID_MAGNITUDE,EFFECT_FLUID_RED_COEF,EFFECT_FLUID_GREEN_COEF,EFFECT_FLUID_BLUE_COEF,EFFECT_LINES_SPEED,EFFECT_LINES_SCALE,EFFECT_LINES_STRENGTH,EFFECT_LINES_WAVE_LENGTH,EFFECT_BASE_COLOR,EFFECT_BASE_THRESHOLD,EFFECT_HUE_SHIFT,EFFECT_COLOR_RANGE);vec3 ContrastSaturationBrightness(vec3 color,float brt,float sat,float con){const float AvgLumR=0.5;const float AvgLumG=0.5;const float AvgLumB=0.5;const vec3 LumCoeff=vec3(0.2125,0.7154,0.0721);vec3 AvgLumin=vec3(AvgLumR,AvgLumG,AvgLumB);vec3 brtColor=color*brt;vec3 intensity=vec3(dot(brtColor,LumCoeff));vec3 satColor=mix(intensity,brtColor,sat);vec3 conColor=mix(AvgLumin,satColor,con);return conColor;}void main(){vec3 color=vec3(0);float alpha=1.0;vec2 uvScreen=gl_FragCoord.xy/uResolution;vec4 flow=texture2D(tFlow,uvScreen)*2.;float extrude=mix(flow.b,flow.a,0.5);vec2 fastScrollNoise=getFastScrollNoise(uTime,uvScreen+vec2(0.,-uScreenScroll),tMaskNoise,vec4(SCROLL_EXTRUDE_SPEED,SCROLL_EXTRUDE_NOISE_SIZE,SCROLL_EXTRUDE_MASK));float fastScrollExtrude=fastScrollNoise.r*SCROLL_EXTRUDE_STRENGTH;extrude=mix(extrude,fastScrollExtrude,uFastScroll)*uOpacity;float gradient=mix(1.0,0.5,length(uvScreen-vec2(0.0,0.8)));vec3 bake1=sRGBTransferOETF(texture2D(tBake1,vUv)).rgb;vec3 bake2=sRGBTransferOETF(texture2D(tBake2,vUv)).rgb;float level0=bake2.b;float level1=bake2.g;float level2=bake2.r;float level3=bake1.b;float level4=bake1.g;float level5=bake1.r;float o=level0;o=0.54504;o=mix(o,level1,smoothstep(0.0,0.2,extrude));o=mix(o,level2,smoothstep(0.2,0.4,extrude));o=mix(o,level3,smoothstep(0.4,0.6,extrude));o=mix(o,level4,smoothstep(0.6,0.8,extrude));o=mix(o,level5,smoothstep(0.8,1.0,extrude));color+=vec3(o);vec2 uvPlaster=vPos.xy/10.0;float plaster=texture2D(tPlaster,uvPlaster).g;
#ifdef AUSTIN_WHITE
float rel=clamp(abs(o-0.54504)*6.0,0.0,1.0);color=mix(color,color*plaster,uTextureStrength*rel);color+=(gradient-1.0)*0.7*uGradientStrength*rel;color=color*uBrightnessFactor+(1.0-0.54504*uBrightnessFactor);
#else
color=mix(color,color*plaster,uTextureStrength);color+=gradient*0.7*uGradientStrength;color=color*uBrightnessFactor+uBrightnessOffset;
#endif
vec3 dFdxPos=dFdx(vEye);vec3 dFdyPos=dFdy(vEye);vec3 normal=normalize(cross(dFdxPos,dFdyPos));float fresnelFactor=abs(dot(normal,vec3(0.,0.,1.)));float inversefresnelFactor=1.0-fresnelFactor;inversefresnelFactor=1.-pow(inversefresnelFactor,CHROMATIC_FRESNEL_SHARPNESS);float waveMask=max(smoothstep(1.,0.1,mix(inversefresnelFactor,1.,1.-CHROMATIC_FRESNEL_OPACITY)),smoothstep(CHROMATIC_SHADOW_RANGE.y,CHROMATIC_SHADOW_RANGE.x,level5)*CHROMATIC_SHADOW_OPACITY)*uOpacity;vec4 fluid=texture2D(tFluidFlowmap,uvScreen);fluid+=mix(0.,fastScrollNoise.g*2.,uFastScroll);color=applyFluidEffect(effectConfig,color,fluid,vUv,uTime,waveMask,normal);vec3 fastModeColor=ContrastSaturationBrightness(color,2.,1.,0.08);fastModeColor+=0.3;
#ifdef AUSTIN_WHITE
fastModeColor=color;
#endif
vec3 whiteRender=mix(color,fastModeColor,uFastScroll);float blackFluidR=pow(o*(length(fluid)*0.0003)+o,5.5);float blackFluidG=pow(o*(length(fluid)*0.0003)+o,5.5);float blackFluidB=pow(o*(length(fluid)*0.0003)+o,5.5);vec3 blackRender=vec3(blackFluidR,blackFluidG,blackFluidB);color=mix(whiteRender,blackRender,uSwitchColorTransition);gl_FragColor.rgb=color;gl_FragColor.a=alpha;}`,Nf=`#define GLSLIFY 1
uniform sampler2D tFlow;uniform sampler2D tMaskNoise;uniform float uTime;uniform float uAspect;uniform float uScreenScroll;uniform float uScrollSpeed;uniform float uFastScroll;uniform float uOpacity;varying vec2 vUv;varying vec3 vNormal;varying vec3 vPos;varying vec3 vEye;float circularIn(float t){return 1.0-sqrt(1.0-t*t);}vec2 getFastScrollNoise(float time,vec2 screenUv,sampler2D noiseTexture,vec4 params){float speed=params.x;float noiseSize=params.y;vec2 mask=params.zw;float t=time*speed;vec2 uvFastScrollNoise=screenUv/noiseSize+t*0.007;vec2 uvFastScrollNoise2=screenUv/noiseSize-t*0.007;vec3 fastScrollNoise=texture2D(noiseTexture,uvFastScrollNoise).rgb;vec3 fastScrollNoise2=texture2D(noiseTexture,uvFastScrollNoise2).rgb;fastScrollNoise=(fastScrollNoise+fastScrollNoise2)/2.;vec3 colorDot=vec3(sin(vec3(t,t+1.047,t+2.094)));float colorAvg=(abs(colorDot.r)+abs(colorDot.g)+abs(colorDot.b))/3.;colorDot/=colorAvg;vec3 colorDot2=vec3(sin(vec3(t+1.047,t+2.094,t)));float colorAvg2=(abs(colorDot2.r)+abs(colorDot2.g)+abs(colorDot2.b))/3.;colorDot2/=colorAvg2;float fastScrollExtrude=smoothstep(mask.x,mask.y,dot(normalize(fastScrollNoise-0.5),colorDot));float fastScrollExtrude2=smoothstep(mask.x,mask.y,dot(normalize(fastScrollNoise-0.5),colorDot2));return vec2(circularIn(fastScrollExtrude),circularIn(fastScrollExtrude2));}vec2 rotate2d(vec2 v,float a){float c=cos(a);float s=sin(a);return mat2(c,-s,s,c)*v;}void main(){vUv=uv;vPos=position;vNormal=normalize(normalMatrix*normal);vec4 pos=vec4(position,1.0);vec4 ndc=projectionMatrix*modelViewMatrix*pos;vec2 uvScreen=(ndc.xy/ndc.w+1.0)/2.0;vec4 flow=texture2D(tFlow,uvScreen);float extrude=mix(flow.b,flow.a,0.5);vec2 fastScrollNoise=getFastScrollNoise(uTime,uvScreen+vec2(0.,-uScreenScroll),tMaskNoise,vec4(SCROLL_EXTRUDE_SPEED,SCROLL_EXTRUDE_NOISE_SIZE,SCROLL_EXTRUDE_MASK));float fastScrollExtrude=fastScrollNoise.r*SCROLL_EXTRUDE_STRENGTH;extrude=mix(extrude,fastScrollExtrude,uFastScroll)*uOpacity;pos.z*=mix(0.05,1.0,extrude);pos.xy*=1.004;vec4 mPos=modelMatrix*pos;vec3 center=vec3(0);float deformStrength=5.5*min(1.0,abs(uScrollSpeed));vec2 deformDiff=mPos.xy-center.xy;vec3 deformOrigin=center+vec3(0.0,0.0,0.0);mPos.xyz-=deformOrigin;float deformY=max(-1.0,min(1.0,deformDiff.x*deformStrength));mPos.xyz+=deformOrigin;vec4 mvPos=viewMatrix*mPos;vEye=(modelMatrix*vec4(position,1.)).xyz-cameraPosition;gl_Position=projectionMatrix*mvPos;}`,Of=`precision highp float;
#define GLSLIFY 1
#define PI 3.141592653589793
varying vec2 vUv;uniform float uGradientStrength;uniform sampler2D tPlaster;uniform float uTextureStrength;highp float rand(const in vec2 uv){const highp float a=12.9898,b=78.233,c=43758.5453;highp float dt=dot(uv.xy,vec2(a,b)),sn=mod(dt,PI);return fract(sin(sn)*c);}void main(){vec3 color=vec3(0);float alpha=1.0;
#ifdef AUSTIN_WHITE
gl_FragColor=vec4(1.0);return;
#endif
color+=vec3(0.54504);vec2 uvPlaster=vUv/1.0;float plaster=texture2D(tPlaster,uvPlaster).g;color=mix(color,color*plaster,uTextureStrength);vec2 uv=vUv+rand(vUv)*0.01;float gradient=mix(1.0,0.5,length(uv-vec2(0.0,0.8)));color+=gradient*0.7*uGradientStrength;color=color*0.6+0.4;gl_FragColor.rgb=color;gl_FragColor.a=alpha;}`,zf=`#define GLSLIFY 1
attribute vec2 uv;attribute vec3 position;varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,1);}`,ii=r=>{let e=String(+r);return/[.e]/.test(e)?e:e+".0"},qe=r=>typeof r=="number"?ii(r):"r"in r?`vec3(${ii(r.r/255)},${ii(r.g/255)},${ii(r.b/255)})`:`vec2(${ii(r.min)},${ii(r.max)})`,Uf=r=>{let e=atob(r),t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t},si=(r,e)=>new Promise((t,n)=>{let i=new Image;i.onload=()=>t(i),i.onerror=n,i.src=`data:${e};base64,${r}`});async function Bf(r){let e=new Blob([Uf(r)]).stream().pipeThrough(new DecompressionStream("gzip"));return new Uint8Array(await new Response(e).arrayBuffer())}function ri(r,{srgb:e=!1,wrap:t=vi,flipY:n=!1}={}){let i=new yt(r);return i.wrapS=i.wrapT=t,i.flipY=n,e&&(i.encoding=Be),i.needsUpdate=!0,i}async function kf(r){if(matchMedia("(prefers-reduced-motion: reduce)").matches)return null;let t=matchMedia("(pointer: coarse)").matches&&!matchMedia("(pointer: fine)").matches,n=r.kind==="ig",i=document.createElement("canvas");i.className="world world2",i.setAttribute("aria-hidden","true"),document.body.prepend(i);let s;try{s=new fs({canvas:i,antialias:!1,alpha:!1,powerPreference:"high-performance"})}catch{return i.remove(),null}let o=Math.min(devicePixelRatio||1,2);s.setPixelRatio(o),s.setClearColor(Ai.renderer.clearColor,1);let a=Ai.relief,l={uResolution:{value:new Ee},uAspect:{value:1},uDPR:{value:o},uTime:{value:0},uScroll:{value:0},uScreenScroll:{value:0},uScrollSpeed:{value:0},uTransition:{value:0},uTextureStrength:{value:a.extrude.textureStrength},uGradientStrength:{value:a.extrude.gradientStrength},uFastScroll:{value:0},uSwitchColorFastScroll:{value:0},uOpacity:{value:1},uSwitchColorTransition:{value:0}},[c,h,p]=await Promise.all([si(r.plaster[0],r.plaster[1]),si(r.maskNoise[0],r.maskNoise[1]),si(r.att[0],r.att[1])]),u={value:ri(c)},m={value:ri(h)},x={value:ri(p,{wrap:_i})},f=new Nr(s,{tNoise:m,uTime:l.uTime});f.setDissipation(a.flowmap.dissipation),f.setFalloff(a.flowmap.falloff),f.setAlpha(a.flowmap.alpha);let d=n&&!t,M=d?new Or(s,Ai.fluidFlowmap):null,w=new hs(new Uint8Array([0,0,0,255]),1,1);w.needsUpdate=!0;let _={value:w},T=new Qn,S=new gt(a.camera.fov,1,a.camera.near,a.camera.far);S.position.z=a.camera.distance;{let A=new ot(new Ri,new ei({vertexShader:zf,fragmentShader:Of,uniforms:{uGradientStrength:l.uGradientStrength,tPlaster:u,uTextureStrength:l.uTextureStrength},depthWrite:!1,depthTest:!1}));n||(A.material.defines={AUSTIN_WHITE:1}),A.frustumCulled=!1,A.renderOrder=-1,T.add(A)}let R={SHOW_EFFECT_FLUID:0,SHOW_EFFECT_COLORS:0,SHOW_EFFECT_LINES:0,EFFECT_AMPLITUDE:qe(d?a.fluidEffect.amplitude:0),EFFECT_SHADOW_STRENGTH:qe(a.fluidEffect.shadowStrength),EFFECT_FLUID_MAGNITUDE:qe(a.fluidEffect.fluidMagnitude),EFFECT_FLUID_RED_COEF:qe(a.fluidEffect.fluidRedCoef),EFFECT_FLUID_GREEN_COEF:qe(a.fluidEffect.fluidGreenCoef),EFFECT_FLUID_BLUE_COEF:qe(a.fluidEffect.fluidBlueCoef),EFFECT_LINES_SPEED:qe(a.fluidEffect.linesSpeed),EFFECT_LINES_SCALE:qe(a.fluidEffect.linesScale),EFFECT_LINES_STRENGTH:qe(a.fluidEffect.linesStrength),EFFECT_LINES_WAVE_LENGTH:qe(a.fluidEffect.linesWaveLength),EFFECT_BASE_COLOR:qe(a.fluidEffect.baseColor),EFFECT_BASE_THRESHOLD:qe(a.fluidEffect.baseThreshold),EFFECT_HUE_SHIFT:qe(a.fluidEffect.hueShift),EFFECT_COLOR_RANGE:qe(a.fluidEffect.colorRange),CHROMATIC_FRESNEL_SHARPNESS:qe(a.chromaticMask.fresnelSharpness),CHROMATIC_FRESNEL_OPACITY:qe(a.chromaticMask.fresnelOpacity),CHROMATIC_SHADOW_RANGE:qe(a.chromaticMask.shadowRange),CHROMATIC_SHADOW_OPACITY:qe(a.chromaticMask.shadowOpacity),SCROLL_EXTRUDE_NOISE_SIZE:qe(a.scrollExtrude.noiseSize),SCROLL_EXTRUDE_SPEED:qe(a.scrollExtrude.speed),SCROLL_EXTRUDE_MASK:qe(a.scrollExtrude.mask),SCROLL_EXTRUDE_STRENGTH:qe(a.scrollExtrude.strength)};n||(R.AUSTIN_LINEAR_BAKE=1,R.AUSTIN_WHITE=1);let D=(A,Z)=>new Lt({vertexShader:Nf,fragmentShader:Ff,defines:{...R},extensions:{derivatives:!0},uniforms:{...l,tMaskNoise:x,tFlow:f.uniform,tPlaster:u,tFluidFlowmap:_,uBrightnessFactor:{value:n?t?.5:.6:.75},uBrightnessOffset:{value:t?.6:.4},tBake1:{value:A},tBake2:{value:Z}}}),v=[],E=1;if(n){let A=await Bf(r.geo),Z=r.meta,le=(await Promise.all(r.tex.map(te=>si(te,"image/webp")))).map(te=>ri(te,{srgb:!0})),oe=[];Z.meshes.forEach(te=>{let xe=new Nt,me=new Uint16Array(A.buffer,te.o,te.n*3),be=new Uint16Array(A.buffer,te.o2,te.n*2),Ve=new Float32Array(te.n*3),ze=new Float32Array(te.n*2);for(let Le=0;Le<te.n;Le++)for(let Te=0;Te<3;Te++)Ve[Le*3+Te]=te.min[Te]+me[Le*3+Te]/65535*(te.max[Te]-te.min[Te]);for(let Le=0;Le<te.n;Le++)for(let Te=0;Te<2;Te++)ze[Le*2+Te]=te.uvmin[Te]+be[Le*2+Te]/65535*(te.uvmax[Te]-te.uvmin[Te]);xe.setAttribute("position",new Ye(Ve,3)),xe.setAttribute("uv",new Ye(ze,2)),xe.setIndex(new Ye(te.i32?new Uint32Array(A.buffer,te.o3,te.tri*3):new Uint16Array(A.buffer,te.o3,te.tri*3),1));let Oe=new ot(xe,D(le[Z.textures[te.map]],le[Z.textures[te.emis]]));Oe.position.set(...te.t),Oe.frustumCulled=!1;let Fe=Math.round(te.t[1]);oe.includes(Fe)||oe.push(Fe),Oe.renderOrder=oe.indexOf(Fe),v.push(Oe),T.add(Oe)})}else{let A=r.mx,Z=r.my,ie=13.2,le=Ei,oe=document.createElement("canvas"),te=oe.getContext("2d",{willReadFrequently:!0}),xe=(ze,Oe,Fe)=>(oe.width=Oe,oe.height=Fe,te.drawImage(ze,0,0,Oe,Fe),te.getImageData(0,0,Oe,Fe).data),me=new Uint16Array((A-1)*(Z-1)*6),be=0;for(let ze=0;ze<Z-1;ze++)for(let Oe=0;Oe<A-1;Oe++){let Fe=ze*A+Oe;me[be++]=Fe,me[be++]=Fe+A,me[be++]=Fe+1,me[be++]=Fe+1,me[be++]=Fe+A,me[be++]=Fe+A+1}let Ve=new Ye(me,1);for(let ze=0;ze<r.panels.length;ze++){let Oe=r.panels[ze],[Fe,...Le]=await Promise.all([si(Oe.h,"image/webp"),...Oe.l.map(W=>si(W,"image/webp"))]),Te=xe(Fe,A,Z),ht=new Float32Array(A*Z*3),ut=new Float32Array(A*Z*2);for(let W=0;W<Z;W++)for(let ve=0;ve<A;ve++){let ue=W*A+ve,_e=ve/(A-1),ge=W/(Z-1);ht[ue*3]=(_e-.5)*ie,ht[ue*3+1]=(.5-ge)*le,ht[ue*3+2]=Te[ue*4]/255*r.depth,ut[ue*2]=_e,ut[ue*2+1]=ge}let b=new Nt;b.setAttribute("position",new Ye(ht,3)),b.setAttribute("uv",new Ye(ut,2)),b.setIndex(Ve);let g=Le[0].naturalWidth,V=Le[0].naturalHeight,Q=[Fe,...Le].map(W=>xe(W,g,V)),se=(W,ve,ue)=>{let _e=document.createElement("canvas");_e.width=g,_e.height=V;let ge=_e.getContext("2d"),pe=ge.createImageData(g,V);for(let we=0;we<g*V;we++)pe.data[we*4]=W[we*4],pe.data[we*4+1]=ve[we*4],pe.data[we*4+2]=ue[we*4],pe.data[we*4+3]=255;return ge.putImageData(pe,0,0),_e},he=ri(se(Q[5],Q[4],Q[3]),{wrap:_t}),ye=ri(se(Q[2],Q[1],Q[0]),{wrap:_t}),ce=new ot(b,D(he,ye));ce.position.set(0,-ze*Ei,0),ce.frustumCulled=!1,ce.renderOrder=ze,v.push(ce),T.add(ce)}}let I=new Fr(n),U={frames:0,cameraZoom:1,viewportH:1,scrollLast:0,fast:!1,fastProgress:0,lastY:scrollY,smoothY:scrollY},K=()=>{let A=innerWidth,Z=innerHeight;s.setSize(A,Z,!1),l.uResolution.value.set(A*o,Z*o),l.uAspect.value=A/Z,f.aspect=A/Z,S.aspect=A/Z;let ie=yf*(Ei-.1)/l.uAspect.value,le=a.camera.distance;S.fov=Math.min(a.camera.fov,2*Math.atan(ie/(2*le))*180/Math.PI),S.updateProjectionMatrix(),U.viewportH=2*Math.tan(S.fov*Math.PI/360)*a.camera.distance};K(),addEventListener("resize",K);let z=A=>{let Z=A||new Ee((Math.random()-.5)*2,(Math.random()-.5)*2),ie=Z.angle()+(Math.random()-.5)*2*Math.PI*.8,le=un(.7,.9,Math.random());return{start:Z,end:new Ee(Math.cos(ie)*le,Math.sin(ie)*le)}},L=[],k=0,$=()=>{f.velocity2.set(1,1);let A=Math.floor(Math.random()*3)+1,Z=null,ie=0;L=[];for(let le=0;le<A;le++){let oe=le!==A-1&&Math.random()<.7,te=oe?un(.8,1,Math.random()):un(.7,.8,Math.random()),xe=z(Z),me=vo({strength:oe?3:2,points:Math.floor(te*12),template:oe?"power2.out":"none"}),be=vo({strength:oe?3:2,points:Math.floor(te*12),template:oe?"power2.out":"none"});L.push({t0:ie,dur:te,d:xe,ex:me,ey:be}),ie+=te,Z=xe.end}L.end=ie,L.rest=un(1,3,Math.random()),k=0};$();let ee=A=>{k+=A;let Z=L.find(ie=>k>=ie.t0&&k<ie.t0+ie.dur);if(Z){let ie=(k-Z.t0)/Z.dur;f.mouse2.set(un(Z.d.start.x/2+.5,Z.d.end.x/2+.5,Z.ex(ie)),un(Z.d.start.y/2+.5,Z.d.end.y/2+.5,Z.ey(ie)))}else k>=L.end&&(f.mouse2.set(-1,-1),k>=L.end+L.rest&&$())},B=document.querySelector("footer");n&&B&&"IntersectionObserver"in window&&new IntersectionObserver(A=>A.forEach(Z=>Ir(l.uSwitchColorTransition,"value",Z.isIntersecting?1:0,1.2,"sine.inOut"))).observe(B);let X=()=>2.5/innerHeight,Y=new URLSearchParams(location.search).has("bgfixed"),ne=performance.now(),N=!document.hidden,J=0;document.addEventListener("visibilitychange",()=>{N=!document.hidden,N&&!J&&(ne=performance.now(),J=requestAnimationFrame(re))});function re(A){if(J=0,!N)return;if(window.__BG2HOLD){ne=A,J=requestAnimationFrame(re);return}let Z=Y?1e3/60:Math.min(100,A-ne);ne=A;let ie=Z/1e3;U.frames++,I.tick(Z),f.tick(Z),bf(ie),ee(ie),U.smoothY+=(scrollY-U.smoothY)*Math.min(1,.12*Z/16);let le=Math.abs(scrollY-U.lastY)*X()*(16/Math.max(1,Z));if(U.lastY=scrollY,!t){let me=Ai.scroll.fastMode,be=Ai.scroll.slowMode,Ve=le-me.fastOffsetSpeed;Ve*=Ve<0?me.fastFactorSlowDown:me.fastFactorSpeedUp;let ze=le-be.slowOffsetSpeed;ze*=ze<0?be.slowFactorSlowDown:be.slowFactorSpeedUp,U.fastProgress=scrollY>0?zr(U.fastProgress+(U.fast?ze:Ve),0,1):0,U.fastProgress>=me.fastTrigger&&!U.fast&&(U.fast=!0,Ir(l.uFastScroll,"value",1,1.25,"power2.out")),U.fastProgress<=be.slowTrigger&&U.fast&&(U.fast=!1,Ir(l.uFastScroll,"value",0,1,"sine.out"))}l.uTime.value+=ie,l.uScroll.value=-U.smoothY/(innerHeight*o)*a.scroll.speed,T.position.y=l.uScroll.value*-Ei,l.uScreenScroll.value=T.position.y*a.camera.fastModeZoom/U.viewportH;let oe=v.length/E*Ei,te=oe*.5;v.forEach(me=>{let be=me.position.y+T.position.y;be<-te&&(me.position.y+=oe),be>te&&(me.position.y-=oe)});let xe=l.uScreenScroll.value-U.scrollLast;xe=Math.min(.2,Math.abs(xe))*Math.sign(xe),U.scrollLast=l.uScreenScroll.value,f.mouse.lerp(I.normalFlip,a.flowmap.mouseEase),f.velocity.lerp(I.velocity,I.velocity.length()?.1:.04),f.update(-xe),l.uScrollSpeed.value+=(xe*5-l.uScrollSpeed.value)*.04,S.zoom=un(a.camera.slowModeZoom,a.camera.fastModeZoom,l.uFastScroll.value)*U.cameraZoom,S.updateProjectionMatrix(),M&&(M.tick(),_.value=M.uniform.value||w),s.render(T,S),J=requestAnimationFrame(re)}return J=requestAnimationFrame(re),{renderer:s,flowmap:f,uniforms:l,state:U,canvas:i,scene:T,camera:S,sections:v}}window.BG2={start:kf};})();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2023 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
