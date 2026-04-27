import{r as ie,j as dn,s as Oh,d as Pg}from"./chunk-react-CHYD3jVH.js";import{bg as Ug,bh as Kr,bi as $d,bj as Dg,bk as Lg,bl as Fg,bm as Og,bn as Ng,bo as Si,bp as jd,bq as fo,br as Bg,bs as kg,bt as zg,bu as Gg,bv as Vg,bw as Hg}from"./chunk-vendor-By63Marc.js";/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ds="170",ir={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},rr={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Jd=0,au=1,Kd=2,Wg=3,Qd=0,bl=1,Os=2,Hn=3,Mi=0,gn=1,Cn=2,xi=0,fr=1,Fa=2,lu=3,cu=4,ep=5,Oi=100,tp=101,np=102,ip=103,rp=104,sp=200,op=201,ap=202,lp=203,Oa=204,Na=205,cp=206,up=207,hp=208,fp=209,dp=210,pp=211,mp=212,gp=213,vp=214,Ba=0,ka=1,za=2,xr=3,Ga=4,Va=5,Ha=6,Wa=7,po=0,_p=1,xp=2,ti=0,yp=1,Sp=2,Mp=3,Iu=4,bp=5,wp=6,Ep=7,uu="attached",Tp="detached",wl=300,si=301,Bi=302,as=303,Ys=304,ps=306,Zs=1e3,Nn=1001,$s=1002,tn=1003,Pu=1004,Xg=1004,Qr=1005,qg=1005,Ut=1006,Ns=1007,Yg=1007,Qn=1008,Zg=1008,Xn=1009,Uu=1010,Du=1011,ls=1012,El=1013,bi=1014,Wt=1015,mn=1016,Tl=1017,Al=1018,yr=1020,Lu=35902,Fu=1021,Ou=1022,en=1023,Nu=1024,Bu=1025,dr=1026,Sr=1027,mo=1028,go=1029,ku=1030,Cl=1031,$g=1032,Rl=1033,Bs=33776,ks=33777,zs=33778,Gs=33779,Xa=35840,qa=35841,Ya=35842,Za=35843,$a=36196,ja=37492,Ja=37496,Ka=37808,Qa=37809,el=37810,tl=37811,nl=37812,il=37813,rl=37814,sl=37815,ol=37816,al=37817,ll=37818,cl=37819,ul=37820,hl=37821,Vs=36492,fl=36494,dl=36495,zu=36283,pl=36284,ml=36285,gl=36286,Ap=2200,Cp=2201,Rp=2202,js=2300,vl=2301,Pa=2302,ar=2400,lr=2401,Js=2402,Il=2500,Gu=2501,jg=0,Jg=1,Kg=2,Ip=3200,Vu=3201,Qg=3202,ev=3203,zi=0,Pp=1,gi="",Sn="srgb",wr="srgb-linear",vo="linear",Et="srgb",tv=0,sr=7680,nv=7681,iv=7682,rv=7683,sv=34055,ov=34056,av=5386,lv=512,cv=513,uv=514,hv=515,fv=516,dv=517,pv=518,hu=519,Up=512,Dp=513,Lp=514,Hu=515,Fp=516,Op=517,Np=518,Bp=519,Ks=35044,mv=35048,gv=35040,vv=35045,_v=35049,xv=35041,yv=35046,Sv=35050,Mv=35042,bv="100",fu="300 es",ei=2e3,Qs=2001;let oi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,e);e.target=null}}};const sn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Nh=1234567;const pr=Math.PI/180,cs=180/Math.PI;function In(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(sn[s&255]+sn[s>>8&255]+sn[s>>16&255]+sn[s>>24&255]+"-"+sn[e&255]+sn[e>>8&255]+"-"+sn[e>>16&15|64]+sn[e>>24&255]+"-"+sn[t&63|128]+sn[t>>8&255]+"-"+sn[t>>16&255]+sn[t>>24&255]+sn[n&255]+sn[n>>8&255]+sn[n>>16&255]+sn[n>>24&255]).toLowerCase()}function kt(s,e,t){return Math.max(e,Math.min(t,s))}function Wu(s,e){return(s%e+e)%e}function wv(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function Ev(s,e,t){return s!==e?(t-s)/(e-s):0}function Hs(s,e,t){return(1-t)*s+t*e}function Tv(s,e,t,n){return Hs(s,e,1-Math.exp(-t*n))}function Av(s,e=1){return e-Math.abs(Wu(s,e*2)-e)}function Cv(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Rv(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function Iv(s,e){return s+Math.floor(Math.random()*(e-s+1))}function Pv(s,e){return s+Math.random()*(e-s)}function Uv(s){return s*(.5-Math.random())}function Dv(s){s!==void 0&&(Nh=s);let e=Nh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Lv(s){return s*pr}function Fv(s){return s*cs}function Ov(s){return(s&s-1)===0&&s!==0}function Nv(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Bv(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function kv(s,e,t,n,i){const r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),u=o((e+n)/2),h=r((e-n)/2),f=o((e-n)/2),d=r((n-e)/2),p=o((n-e)/2);switch(i){case"XYX":s.set(a*u,l*h,l*f,a*c);break;case"YZY":s.set(l*f,a*u,l*h,a*c);break;case"ZXZ":s.set(l*h,l*f,a*u,a*c);break;case"XZX":s.set(a*u,l*p,l*d,a*c);break;case"YXY":s.set(l*d,a*u,l*p,a*c);break;case"ZYZ":s.set(l*p,l*d,a*u,a*c);break;default:}}function pn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function ft(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const Xu={DEG2RAD:pr,RAD2DEG:cs,generateUUID:In,clamp:kt,euclideanModulo:Wu,mapLinear:wv,inverseLerp:Ev,lerp:Hs,damp:Tv,pingpong:Av,smoothstep:Cv,smootherstep:Rv,randInt:Iv,randFloat:Pv,randFloatSpread:Uv,seededRandom:Dv,degToRad:Lv,radToDeg:Fv,isPowerOfTwo:Ov,ceilPowerOfTwo:Nv,floorPowerOfTwo:Bv,setQuaternionFromProperEuler:kv,normalize:ft,denormalize:pn};class pe{constructor(e=0,t=0){pe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(kt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*i+e.x,this.y=r*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ct{constructor(e,t,n,i,r,o,a,l,c){ct.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c)}set(e,t,n,i,r,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=a,u[3]=t,u[4]=r,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],h=n[7],f=n[2],d=n[5],p=n[8],v=i[0],g=i[3],m=i[6],x=i[1],_=i[4],y=i[7],A=i[2],b=i[5],T=i[8];return r[0]=o*v+a*x+l*A,r[3]=o*g+a*_+l*b,r[6]=o*m+a*y+l*T,r[1]=c*v+u*x+h*A,r[4]=c*g+u*_+h*b,r[7]=c*m+u*y+h*T,r[2]=f*v+d*x+p*A,r[5]=f*g+d*_+p*b,r[8]=f*m+d*y+p*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*r*u+n*a*l+i*r*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=u*o-a*c,f=a*l-u*r,d=c*r-o*l,p=t*h+n*f+i*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/p;return e[0]=h*v,e[1]=(i*c-u*n)*v,e[2]=(a*n-i*o)*v,e[3]=f*v,e[4]=(u*t-i*l)*v,e[5]=(i*r-a*t)*v,e[6]=d*v,e[7]=(n*l-c*t)*v,e[8]=(o*t-n*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(rc.makeScale(e,t)),this}rotate(e){return this.premultiply(rc.makeRotation(-e)),this}translate(e,t){return this.premultiply(rc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const rc=new ct;function kp(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}const zv={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array};function es(s,e){return new zv[s](e)}function eo(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function zp(){const s=eo("canvas");return s.style.display="block",s}const Bh={};function Ds(s){s in Bh||(Bh[s]=!0)}function Gv(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function Vv(s){const e=s.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Hv(s){const e=s.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const _t={enabled:!0,workingColorSpace:wr,spaces:{},convert:function(s,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===Et&&(s.r=yi(s.r),s.g=yi(s.g),s.b=yi(s.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(s.applyMatrix3(this.spaces[e].toXYZ),s.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===Et&&(s.r=ss(s.r),s.g=ss(s.g),s.b=ss(s.b))),s},fromWorkingColorSpace:function(s,e){return this.convert(s,this.workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===gi?vo:this.spaces[s].transfer},getLuminanceCoefficients:function(s,e=this.workingColorSpace){return s.fromArray(this.spaces[e].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,e,t){return s.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function yi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function ss(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const kh=[.64,.33,.3,.6,.15,.06],zh=[.2126,.7152,.0722],Gh=[.3127,.329],Vh=new ct().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Hh=new ct().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);_t.define({[wr]:{primaries:kh,whitePoint:Gh,transfer:vo,toXYZ:Vh,fromXYZ:Hh,luminanceCoefficients:zh,workingColorSpaceConfig:{unpackColorSpace:Sn},outputColorSpaceConfig:{drawingBufferColorSpace:Sn}},[Sn]:{primaries:kh,whitePoint:Gh,transfer:Et,toXYZ:Vh,fromXYZ:Hh,luminanceCoefficients:zh,outputColorSpaceConfig:{drawingBufferColorSpace:Sn}}});let Rr;class Gp{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Rr===void 0&&(Rr=eo("canvas")),Rr.width=e.width,Rr.height=e.height;const n=Rr.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Rr}return t.width>2048||t.height>2048?t.toDataURL("image/jpeg",.6):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=eo("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=yi(r[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(yi(t[n]/255)*255):t[n]=yi(t[n]);return{data:t,width:e.width,height:e.height}}else return e}}let Wv=0;class cr{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Wv++}),this.uuid=In(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(sc(i[o].image)):r.push(sc(i[o]))}else r=sc(i);n.url=r}return t||(e.images[this.uuid]=n),n}}function sc(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Gp.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:{}}let Xv=0;class Ft extends oi{constructor(e=Ft.DEFAULT_IMAGE,t=Ft.DEFAULT_MAPPING,n=Nn,i=Nn,r=Ut,o=Qn,a=en,l=Xn,c=Ft.DEFAULT_ANISOTROPY,u=gi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Xv++}),this.uuid=In(),this.name="",this.source=new cr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new pe(0,0),this.repeat=new pe(1,1),this.center=new pe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ct,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==wl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Zs:e.x=e.x-Math.floor(e.x);break;case Nn:e.x=e.x<0?0:1;break;case $s:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Zs:e.y=e.y-Math.floor(e.y);break;case Nn:e.y=e.y<0?0:1;break;case $s:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ft.DEFAULT_IMAGE=null;Ft.DEFAULT_MAPPING=wl;Ft.DEFAULT_ANISOTROPY=1;class dt{constructor(e=0,t=0,n=0,i=1){dt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const l=e.elements,c=l[0],u=l[4],h=l[8],f=l[1],d=l[5],p=l[9],v=l[2],g=l[6],m=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-v)<.01&&Math.abs(p-g)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+v)<.1&&Math.abs(p+g)<.1&&Math.abs(c+d+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const _=(c+1)/2,y=(d+1)/2,A=(m+1)/2,b=(u+f)/4,T=(h+v)/4,w=(p+g)/4;return _>y&&_>A?_<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(_),i=b/n,r=T/n):y>A?y<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(y),n=b/i,r=w/i):A<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(A),n=T/r,i=w/r),this.set(n,i,r,t),this}let x=Math.sqrt((g-p)*(g-p)+(h-v)*(h-v)+(f-u)*(f-u));return Math.abs(x)<.001&&(x=1),this.x=(g-p)/x,this.y=(h-v)/x,this.z=(f-u)/x,this.w=Math.acos((c+d+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Vp extends oi{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new dt(0,0,e,t),this.scissorTest=!1,this.viewport=new dt(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ut,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Ft(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new cr(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Pn extends Vp{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Pl extends Ft{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=tn,this.minFilter=tn,this.wrapR=Nn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class qv extends Pn{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGLArrayRenderTarget=!0,this.depth=n,this.texture=new Pl(null,e,t,n),this.texture.isRenderTargetTexture=!0}}class qu extends Ft{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=tn,this.minFilter=tn,this.wrapR=Nn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Yv extends Pn{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGL3DRenderTarget=!0,this.depth=n,this.texture=new qu(null,e,t,n),this.texture.isRenderTargetTexture=!0}}class ln{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,o,a){let l=n[i+0],c=n[i+1],u=n[i+2],h=n[i+3];const f=r[o+0],d=r[o+1],p=r[o+2],v=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=f,e[t+1]=d,e[t+2]=p,e[t+3]=v;return}if(h!==v||l!==f||c!==d||u!==p){let g=1-a;const m=l*f+c*d+u*p+h*v,x=m>=0?1:-1,_=1-m*m;if(_>Number.EPSILON){const A=Math.sqrt(_),b=Math.atan2(A,m*x);g=Math.sin(g*b)/A,a=Math.sin(a*b)/A}const y=a*x;if(l=l*g+f*y,c=c*g+d*y,u=u*g+p*y,h=h*g+v*y,g===1-a){const A=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=A,c*=A,u*=A,h*=A}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,r,o){const a=n[i],l=n[i+1],c=n[i+2],u=n[i+3],h=r[o],f=r[o+1],d=r[o+2],p=r[o+3];return e[t]=a*p+u*h+l*d-c*f,e[t+1]=l*p+u*f+c*h-a*d,e[t+2]=c*p+u*d+a*f-l*h,e[t+3]=u*p-a*h-l*f-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(i/2),h=a(r/2),f=l(n/2),d=l(i/2),p=l(r/2);switch(o){case"XYZ":this._x=f*u*h+c*d*p,this._y=c*d*h-f*u*p,this._z=c*u*p+f*d*h,this._w=c*u*h-f*d*p;break;case"YXZ":this._x=f*u*h+c*d*p,this._y=c*d*h-f*u*p,this._z=c*u*p-f*d*h,this._w=c*u*h+f*d*p;break;case"ZXY":this._x=f*u*h-c*d*p,this._y=c*d*h+f*u*p,this._z=c*u*p+f*d*h,this._w=c*u*h-f*d*p;break;case"ZYX":this._x=f*u*h-c*d*p,this._y=c*d*h+f*u*p,this._z=c*u*p-f*d*h,this._w=c*u*h+f*d*p;break;case"YZX":this._x=f*u*h+c*d*p,this._y=c*d*h+f*u*p,this._z=c*u*p-f*d*h,this._w=c*u*h-f*d*p;break;case"XZY":this._x=f*u*h-c*d*p,this._y=c*d*h-f*u*p,this._z=c*u*p+f*d*h,this._w=c*u*h+f*d*p;break;default:}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],h=t[10],f=n+a+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-l)*d,this._y=(r-c)*d,this._z=(o-i)*d}else if(n>a&&n>h){const d=2*Math.sqrt(1+n-a-h);this._w=(u-l)/d,this._x=.25*d,this._y=(i+o)/d,this._z=(r+c)/d}else if(a>h){const d=2*Math.sqrt(1+a-n-h);this._w=(r-c)/d,this._x=(i+o)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+h-n-a);this._w=(o-i)/d,this._x=(r+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(kt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+i*c-r*l,this._y=i*u+o*l+r*a-n*c,this._z=r*u+o*c+n*l-i*a,this._w=o*u-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-t;return this._w=d*o+t*this._w,this._x=d*n+t*this._x,this._y=d*i+t*this._y,this._z=d*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=o*h+this._w*f,this._x=n*h+this._x*f,this._y=i*h+this._y*f,this._z=r*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(e=0,t=0,n=0){L.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Wh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Wh.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),u=2*(a*t-r*i),h=2*(r*n-o*t);return this.x=t+l*c+o*h-a*u,this.y=n+l*u+a*c-r*h,this.z=i+l*h+r*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return oc.copy(this).projectOnVector(e),this.sub(oc)}reflect(e){return this.sub(oc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(kt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const oc=new L,Wh=new ln;class Xt{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(kn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(kn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=kn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,kn):kn.fromBufferAttribute(r,o),kn.applyMatrix4(e.matrixWorld),this.expandByPoint(kn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Po.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Po.copy(n.boundingBox)),Po.applyMatrix4(e.matrixWorld),this.union(Po)}const i=e.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,kn),kn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(vs),Uo.subVectors(this.max,vs),Ir.subVectors(e.a,vs),Pr.subVectors(e.b,vs),Ur.subVectors(e.c,vs),Ai.subVectors(Pr,Ir),Ci.subVectors(Ur,Pr),Hi.subVectors(Ir,Ur);let t=[0,-Ai.z,Ai.y,0,-Ci.z,Ci.y,0,-Hi.z,Hi.y,Ai.z,0,-Ai.x,Ci.z,0,-Ci.x,Hi.z,0,-Hi.x,-Ai.y,Ai.x,0,-Ci.y,Ci.x,0,-Hi.y,Hi.x,0];return!ac(t,Ir,Pr,Ur,Uo)||(t=[1,0,0,0,1,0,0,0,1],!ac(t,Ir,Pr,Ur,Uo))?!1:(Do.crossVectors(Ai,Ci),t=[Do.x,Do.y,Do.z],ac(t,Ir,Pr,Ur,Uo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,kn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(kn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ci[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ci[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ci[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ci[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ci[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ci[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ci[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ci[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ci),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const ci=[new L,new L,new L,new L,new L,new L,new L,new L],kn=new L,Po=new Xt,Ir=new L,Pr=new L,Ur=new L,Ai=new L,Ci=new L,Hi=new L,vs=new L,Uo=new L,Do=new L,Wi=new L;function ac(s,e,t,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){Wi.fromArray(s,r);const a=i.x*Math.abs(Wi.x)+i.y*Math.abs(Wi.y)+i.z*Math.abs(Wi.z),l=e.dot(Wi),c=t.dot(Wi),u=n.dot(Wi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Zv=new Xt,_s=new L,lc=new L;class qt{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Zv.setFromPoints(e).getCenter(n);let i=0;for(let r=0,o=e.length;r<o;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;_s.subVectors(e,this.center);const t=_s.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(_s,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(lc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(_s.copy(e.center).add(lc)),this.expandByPoint(_s.copy(e.center).sub(lc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ui=new L,cc=new L,Lo=new L,Ri=new L,uc=new L,Fo=new L,hc=new L;class Er{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ui)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ui.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ui.copy(this.origin).addScaledVector(this.direction,t),ui.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){cc.copy(e).add(t).multiplyScalar(.5),Lo.copy(t).sub(e).normalize(),Ri.copy(this.origin).sub(cc);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Lo),a=Ri.dot(this.direction),l=-Ri.dot(Lo),c=Ri.lengthSq(),u=Math.abs(1-o*o);let h,f,d,p;if(u>0)if(h=o*l-a,f=o*a-l,p=r*u,h>=0)if(f>=-p)if(f<=p){const v=1/u;h*=v,f*=v,d=h*(h+o*f+2*a)+f*(o*h+f+2*l)+c}else f=r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f=-r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f<=-p?(h=Math.max(0,-(-o*r+a)),f=h>0?-r:Math.min(Math.max(-r,-l),r),d=-h*h+f*(f+2*l)+c):f<=p?(h=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(h=Math.max(0,-(o*r+a)),f=h>0?r:Math.min(Math.max(-r,-l),r),d=-h*h+f*(f+2*l)+c);else f=o>0?-r:r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(cc).addScaledVector(Lo,f),d}intersectSphere(e,t){ui.subVectors(e.center,this.origin);const n=ui.dot(this.direction),i=ui.dot(ui)-n*n,r=e.radius*e.radius;if(i>r)return null;const o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,i=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,i=(e.min.x-f.x)*c),u>=0?(r=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(r=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),h>=0?(a=(e.min.z-f.z)*h,l=(e.max.z-f.z)*h):(a=(e.max.z-f.z)*h,l=(e.min.z-f.z)*h),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,ui)!==null}intersectTriangle(e,t,n,i,r){uc.subVectors(t,e),Fo.subVectors(n,e),hc.crossVectors(uc,Fo);let o=this.direction.dot(hc),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ri.subVectors(this.origin,e);const l=a*this.direction.dot(Fo.crossVectors(Ri,Fo));if(l<0)return null;const c=a*this.direction.dot(uc.cross(Ri));if(c<0||l+c>o)return null;const u=-a*Ri.dot(hc);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class rt{constructor(e,t,n,i,r,o,a,l,c,u,h,f,d,p,v,g){rt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c,u,h,f,d,p,v,g)}set(e,t,n,i,r,o,a,l,c,u,h,f,d,p,v,g){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=r,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=u,m[10]=h,m[14]=f,m[3]=d,m[7]=p,m[11]=v,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new rt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Dr.setFromMatrixColumn(e,0).length(),r=1/Dr.setFromMatrixColumn(e,1).length(),o=1/Dr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const f=o*u,d=o*h,p=a*u,v=a*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=d+p*c,t[5]=f-v*c,t[9]=-a*l,t[2]=v-f*c,t[6]=p+d*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*u,d=l*h,p=c*u,v=c*h;t[0]=f+v*a,t[4]=p*a-d,t[8]=o*c,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=d*a-p,t[6]=v+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*u,d=l*h,p=c*u,v=c*h;t[0]=f-v*a,t[4]=-o*h,t[8]=p+d*a,t[1]=d+p*a,t[5]=o*u,t[9]=v-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*u,d=o*h,p=a*u,v=a*h;t[0]=l*u,t[4]=p*c-d,t[8]=f*c+v,t[1]=l*h,t[5]=v*c+f,t[9]=d*c-p,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,d=o*c,p=a*l,v=a*c;t[0]=l*u,t[4]=v-f*h,t[8]=p*h+d,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=d*h+p,t[10]=f-v*h}else if(e.order==="XZY"){const f=o*l,d=o*c,p=a*l,v=a*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=f*h+v,t[5]=o*u,t[9]=d*h-p,t[2]=p*h-d,t[6]=a*u,t[10]=v*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose($v,e,jv)}lookAt(e,t,n){const i=this.elements;return Tn.subVectors(e,t),Tn.lengthSq()===0&&(Tn.z=1),Tn.normalize(),Ii.crossVectors(n,Tn),Ii.lengthSq()===0&&(Math.abs(n.z)===1?Tn.x+=1e-4:Tn.z+=1e-4,Tn.normalize(),Ii.crossVectors(n,Tn)),Ii.normalize(),Oo.crossVectors(Tn,Ii),i[0]=Ii.x,i[4]=Oo.x,i[8]=Tn.x,i[1]=Ii.y,i[5]=Oo.y,i[9]=Tn.y,i[2]=Ii.z,i[6]=Oo.z,i[10]=Tn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],h=n[5],f=n[9],d=n[13],p=n[2],v=n[6],g=n[10],m=n[14],x=n[3],_=n[7],y=n[11],A=n[15],b=i[0],T=i[4],w=i[8],M=i[12],S=i[1],R=i[5],P=i[9],F=i[13],U=i[2],G=i[6],B=i[10],K=i[14],Y=i[3],le=i[7],J=i[11],Z=i[15];return r[0]=o*b+a*S+l*U+c*Y,r[4]=o*T+a*R+l*G+c*le,r[8]=o*w+a*P+l*B+c*J,r[12]=o*M+a*F+l*K+c*Z,r[1]=u*b+h*S+f*U+d*Y,r[5]=u*T+h*R+f*G+d*le,r[9]=u*w+h*P+f*B+d*J,r[13]=u*M+h*F+f*K+d*Z,r[2]=p*b+v*S+g*U+m*Y,r[6]=p*T+v*R+g*G+m*le,r[10]=p*w+v*P+g*B+m*J,r[14]=p*M+v*F+g*K+m*Z,r[3]=x*b+_*S+y*U+A*Y,r[7]=x*T+_*R+y*G+A*le,r[11]=x*w+_*P+y*B+A*J,r[15]=x*M+_*F+y*K+A*Z,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],h=e[6],f=e[10],d=e[14],p=e[3],v=e[7],g=e[11],m=e[15];return p*(+r*l*h-i*c*h-r*a*f+n*c*f+i*a*d-n*l*d)+v*(+t*l*d-t*c*f+r*o*f-i*o*d+i*c*u-r*l*u)+g*(+t*c*h-t*a*d-r*o*h+n*o*d+r*a*u-n*c*u)+m*(-i*a*u-t*l*h+t*a*f+i*o*h-n*o*f+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=e[9],f=e[10],d=e[11],p=e[12],v=e[13],g=e[14],m=e[15],x=h*g*c-v*f*c+v*l*d-a*g*d-h*l*m+a*f*m,_=p*f*c-u*g*c-p*l*d+o*g*d+u*l*m-o*f*m,y=u*v*c-p*h*c+p*a*d-o*v*d-u*a*m+o*h*m,A=p*h*l-u*v*l-p*a*f+o*v*f+u*a*g-o*h*g,b=t*x+n*_+i*y+r*A;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/b;return e[0]=x*T,e[1]=(v*f*r-h*g*r-v*i*d+n*g*d+h*i*m-n*f*m)*T,e[2]=(a*g*r-v*l*r+v*i*c-n*g*c-a*i*m+n*l*m)*T,e[3]=(h*l*r-a*f*r-h*i*c+n*f*c+a*i*d-n*l*d)*T,e[4]=_*T,e[5]=(u*g*r-p*f*r+p*i*d-t*g*d-u*i*m+t*f*m)*T,e[6]=(p*l*r-o*g*r-p*i*c+t*g*c+o*i*m-t*l*m)*T,e[7]=(o*f*r-u*l*r+u*i*c-t*f*c-o*i*d+t*l*d)*T,e[8]=y*T,e[9]=(p*h*r-u*v*r-p*n*d+t*v*d+u*n*m-t*h*m)*T,e[10]=(o*v*r-p*a*r+p*n*c-t*v*c-o*n*m+t*a*m)*T,e[11]=(u*a*r-o*h*r-u*n*c+t*h*c+o*n*d-t*a*d)*T,e[12]=A*T,e[13]=(u*v*i-p*h*i+p*n*f-t*v*f-u*n*g+t*h*g)*T,e[14]=(p*a*i-o*v*i-p*n*l+t*v*l+o*n*g-t*a*g)*T,e[15]=(o*h*i-u*a*i+u*n*l-t*h*l-o*n*f+t*a*f)*T,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,u=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,u*a+n,u*l-i*o,0,c*l-i*a,u*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,o){return this.set(1,n,r,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,u=o+o,h=a+a,f=r*c,d=r*u,p=r*h,v=o*u,g=o*h,m=a*h,x=l*c,_=l*u,y=l*h,A=n.x,b=n.y,T=n.z;return i[0]=(1-(v+m))*A,i[1]=(d+y)*A,i[2]=(p-_)*A,i[3]=0,i[4]=(d-y)*b,i[5]=(1-(f+m))*b,i[6]=(g+x)*b,i[7]=0,i[8]=(p+_)*T,i[9]=(g-x)*T,i[10]=(1-(f+v))*T,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let r=Dr.set(i[0],i[1],i[2]).length();const o=Dr.set(i[4],i[5],i[6]).length(),a=Dr.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],zn.copy(this);const c=1/r,u=1/o,h=1/a;return zn.elements[0]*=c,zn.elements[1]*=c,zn.elements[2]*=c,zn.elements[4]*=u,zn.elements[5]*=u,zn.elements[6]*=u,zn.elements[8]*=h,zn.elements[9]*=h,zn.elements[10]*=h,t.setFromRotationMatrix(zn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,i,r,o,a=ei){const l=this.elements,c=2*r/(t-e),u=2*r/(n-i),h=(t+e)/(t-e),f=(n+i)/(n-i);let d,p;if(a===ei)d=-(o+r)/(o-r),p=-2*o*r/(o-r);else if(a===Qs)d=-o/(o-r),p=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=p,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,r,o,a=ei){const l=this.elements,c=1/(t-e),u=1/(n-i),h=1/(o-r),f=(t+e)*c,d=(n+i)*u;let p,v;if(a===ei)p=(o+r)*h,v=-2*h;else if(a===Qs)p=r*h,v=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=v,l[14]=-p,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Dr=new L,zn=new rt,$v=new L(0,0,0),jv=new L(1,1,1),Ii=new L,Oo=new L,Tn=new L,Xh=new rt,qh=new ln;class Un{constructor(e=0,t=0,n=0,i=Un.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],u=i[9],h=i[2],f=i[6],d=i[10];switch(t){case"XYZ":this._y=Math.asin(kt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-kt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(kt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-kt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(kt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-kt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Xh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Xh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return qh.setFromEuler(this),this.setFromQuaternion(qh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Un.DEFAULT_ORDER="XYZ";class mr{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Jv=0;const Yh=new L,Lr=new ln,hi=new rt,No=new L,xs=new L,Kv=new L,Qv=new ln,Zh=new L(1,0,0),$h=new L(0,1,0),jh=new L(0,0,1),Jh={type:"added"},e0={type:"removed"},Fr={type:"childadded",child:null},fc={type:"childremoved",child:null};class xt extends oi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Jv++}),this.uuid=In(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=xt.DEFAULT_UP.clone();const e=new L,t=new Un,n=new ln,i=new L(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new rt},normalMatrix:{value:new ct}}),this.matrix=new rt,this.matrixWorld=new rt,this.matrixAutoUpdate=xt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new mr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Lr.setFromAxisAngle(e,t),this.quaternion.multiply(Lr),this}rotateOnWorldAxis(e,t){return Lr.setFromAxisAngle(e,t),this.quaternion.premultiply(Lr),this}rotateX(e){return this.rotateOnAxis(Zh,e)}rotateY(e){return this.rotateOnAxis($h,e)}rotateZ(e){return this.rotateOnAxis(jh,e)}translateOnAxis(e,t){return Yh.copy(e).applyQuaternion(this.quaternion),this.position.add(Yh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Zh,e)}translateY(e){return this.translateOnAxis($h,e)}translateZ(e){return this.translateOnAxis(jh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(hi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?No.copy(e):No.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),xs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?hi.lookAt(xs,No,this.up):hi.lookAt(No,xs,this.up),this.quaternion.setFromRotationMatrix(hi),i&&(hi.extractRotation(i.matrixWorld),Lr.setFromRotationMatrix(hi),this.quaternion.premultiply(Lr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?this:(e&&e.isObject3D&&(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Jh),Fr.child=e,this.dispatchEvent(Fr),Fr.child=null),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(e0),fc.child=e,this.dispatchEvent(fc),fc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),hi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),hi.multiply(e.parent.matrixWorld)),e.applyMatrix4(hi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Jh),Fr.child=e,this.dispatchEvent(Fr),Fr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xs,e,Kv),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xs,Qv,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),h=o(e.shapes),f=o(e.skeletons),d=o(e.animations),p=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),p.length>0&&(n.nodes=p)}return n.object=i,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}xt.DEFAULT_UP=new L(0,1,0);xt.DEFAULT_MATRIX_AUTO_UPDATE=!0;xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Gn=new L,fi=new L,dc=new L,di=new L,Or=new L,Nr=new L,Kh=new L,pc=new L,mc=new L,gc=new L,vc=new dt,_c=new dt,xc=new dt;class Mn{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Gn.subVectors(e,t),i.cross(Gn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){Gn.subVectors(i,t),fi.subVectors(n,t),dc.subVectors(e,t);const o=Gn.dot(Gn),a=Gn.dot(fi),l=Gn.dot(dc),c=fi.dot(fi),u=fi.dot(dc),h=o*c-a*a;if(h===0)return r.set(0,0,0),null;const f=1/h,d=(c*l-a*u)*f,p=(o*u-a*l)*f;return r.set(1-d-p,p,d)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,di)===null?!1:di.x>=0&&di.y>=0&&di.x+di.y<=1}static getInterpolation(e,t,n,i,r,o,a,l){return this.getBarycoord(e,t,n,i,di)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,di.x),l.addScaledVector(o,di.y),l.addScaledVector(a,di.z),l)}static getInterpolatedAttribute(e,t,n,i,r,o){return vc.setScalar(0),_c.setScalar(0),xc.setScalar(0),vc.fromBufferAttribute(e,t),_c.fromBufferAttribute(e,n),xc.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(vc,r.x),o.addScaledVector(_c,r.y),o.addScaledVector(xc,r.z),o}static isFrontFacing(e,t,n,i){return Gn.subVectors(n,t),fi.subVectors(e,t),Gn.cross(fi).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Gn.subVectors(this.c,this.b),fi.subVectors(this.a,this.b),Gn.cross(fi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Mn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Mn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return Mn.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return Mn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Mn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,r=this.c;let o,a;Or.subVectors(i,n),Nr.subVectors(r,n),pc.subVectors(e,n);const l=Or.dot(pc),c=Nr.dot(pc);if(l<=0&&c<=0)return t.copy(n);mc.subVectors(e,i);const u=Or.dot(mc),h=Nr.dot(mc);if(u>=0&&h<=u)return t.copy(i);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(Or,o);gc.subVectors(e,r);const d=Or.dot(gc),p=Nr.dot(gc);if(p>=0&&d<=p)return t.copy(r);const v=d*c-l*p;if(v<=0&&c>=0&&p<=0)return a=c/(c-p),t.copy(n).addScaledVector(Nr,a);const g=u*p-d*h;if(g<=0&&h-u>=0&&d-p>=0)return Kh.subVectors(r,i),a=(h-u)/(h-u+(d-p)),t.copy(i).addScaledVector(Kh,a);const m=1/(g+v+f);return o=v*m,a=f*m,t.copy(n).addScaledVector(Or,o).addScaledVector(Nr,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Hp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Pi={h:0,s:0,l:0},Bo={h:0,s:0,l:0};function yc(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class We{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Sn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,_t.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=_t.workingColorSpace){return this.r=e,this.g=t,this.b=n,_t.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=_t.workingColorSpace){if(e=Wu(e,1),t=kt(t,0,1),n=kt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=yc(o,r,e+1/3),this.g=yc(o,r,e),this.b=yc(o,r,e-1/3)}return _t.toWorkingColorSpace(this,i),this}setStyle(e,t=Sn){function n(r){r!==void 0&&parseFloat(r)<1}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Sn){const n=Hp[e.toLowerCase()];return n!==void 0&&this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=yi(e.r),this.g=yi(e.g),this.b=yi(e.b),this}copyLinearToSRGB(e){return this.r=ss(e.r),this.g=ss(e.g),this.b=ss(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Sn){return _t.fromWorkingColorSpace(on.copy(this),e),Math.round(kt(on.r*255,0,255))*65536+Math.round(kt(on.g*255,0,255))*256+Math.round(kt(on.b*255,0,255))}getHexString(e=Sn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=_t.workingColorSpace){_t.fromWorkingColorSpace(on.copy(this),t);const n=on.r,i=on.g,r=on.b,o=Math.max(n,i,r),a=Math.min(n,i,r);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case n:l=(i-r)/h+(i<r?6:0);break;case i:l=(r-n)/h+2;break;case r:l=(n-i)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=_t.workingColorSpace){return _t.fromWorkingColorSpace(on.copy(this),t),e.r=on.r,e.g=on.g,e.b=on.b,e}getStyle(e=Sn){_t.fromWorkingColorSpace(on.copy(this),e);const t=on.r,n=on.g,i=on.b;return e!==Sn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Pi),this.setHSL(Pi.h+e,Pi.s+t,Pi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Pi),e.getHSL(Bo);const n=Hs(Pi.h,Bo.h,t),i=Hs(Pi.s,Bo.s,t),r=Hs(Pi.l,Bo.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const on=new We;We.NAMES=Hp;let t0=0;class un extends oi{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:t0++}),this.uuid=In(),this.name="",this.blending=fr,this.side=Mi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Oa,this.blendDst=Na,this.blendEquation=Oi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new We(0,0,0),this.blendAlpha=0,this.depthFunc=xr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=hu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=sr,this.stencilZFail=sr,this.stencilZPass=sr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0)continue;const i=this[t];i!==void 0&&(i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n)}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==fr&&(n.blending=this.blending),this.side!==Mi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Oa&&(n.blendSrc=this.blendSrc),this.blendDst!==Na&&(n.blendDst=this.blendDst),this.blendEquation!==Oi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==xr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==hu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==sr&&(n.stencilFail=this.stencilFail),this.stencilZFail!==sr&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==sr&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=i(e.textures),o=i(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){}}class Ei extends un{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new We(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Un,this.combine=po,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const vi=n0();function n0(){const s=new ArrayBuffer(4),e=new Float32Array(s),t=new Uint32Array(s),n=new Uint32Array(512),i=new Uint32Array(512);for(let l=0;l<256;++l){const c=l-127;c<-27?(n[l]=0,n[l|256]=32768,i[l]=24,i[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,i[l]=-c-1,i[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,i[l]=13,i[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,i[l]=24,i[l|256]=24):(n[l]=31744,n[l|256]=64512,i[l]=13,i[l|256]=13)}const r=new Uint32Array(2048),o=new Uint32Array(64),a=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,u=0;for(;!(c&8388608);)c<<=1,u-=8388608;c&=-8388609,u+=947912704,r[l]=c|u}for(let l=1024;l<2048;++l)r[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)o[l]=l<<23;o[31]=1199570944,o[32]=2147483648;for(let l=33;l<63;++l)o[l]=2147483648+(l-32<<23);o[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(a[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:r,exponentTable:o,offsetTable:a}}function yn(s){Math.abs(s)>65504,s=kt(s,-65504,65504),vi.floatView[0]=s;const e=vi.uint32View[0],t=e>>23&511;return vi.baseTable[t]+((e&8388607)>>vi.shiftTable[t])}function Ls(s){const e=s>>10;return vi.uint32View[0]=vi.mantissaTable[vi.offsetTable[e]+(s&1023)]+vi.exponentTable[e],vi.floatView[0]}const ur={toHalfFloat:yn,fromHalfFloat:Ls},Vt=new L,ko=new pe;class Tt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ks,this.updateRanges=[],this.gpuType=Wt,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ko.fromBufferAttribute(this,t),ko.applyMatrix3(e),this.setXY(t,ko.x,ko.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.applyMatrix3(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.applyMatrix4(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.applyNormalMatrix(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.transformDirection(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=pn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ft(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=pn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=pn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=pn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=pn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array),i=ft(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array),i=ft(i,this.array),r=ft(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ks&&(e.usage=this.usage),e}}class i0 extends Tt{constructor(e,t,n){super(new Int8Array(e),t,n)}}class r0 extends Tt{constructor(e,t,n){super(new Uint8Array(e),t,n)}}class s0 extends Tt{constructor(e,t,n){super(new Uint8ClampedArray(e),t,n)}}class o0 extends Tt{constructor(e,t,n){super(new Int16Array(e),t,n)}}class Yu extends Tt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class a0 extends Tt{constructor(e,t,n){super(new Int32Array(e),t,n)}}class Zu extends Tt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class l0 extends Tt{constructor(e,t,n){super(new Uint16Array(e),t,n),this.isFloat16BufferAttribute=!0}getX(e){let t=Ls(this.array[e*this.itemSize]);return this.normalized&&(t=pn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize]=yn(t),this}getY(e){let t=Ls(this.array[e*this.itemSize+1]);return this.normalized&&(t=pn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize+1]=yn(t),this}getZ(e){let t=Ls(this.array[e*this.itemSize+2]);return this.normalized&&(t=pn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize+2]=yn(t),this}getW(e){let t=Ls(this.array[e*this.itemSize+3]);return this.normalized&&(t=pn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize+3]=yn(t),this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array)),this.array[e+0]=yn(t),this.array[e+1]=yn(n),this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array),i=ft(i,this.array)),this.array[e+0]=yn(t),this.array[e+1]=yn(n),this.array[e+2]=yn(i),this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array),i=ft(i,this.array),r=ft(r,this.array)),this.array[e+0]=yn(t),this.array[e+1]=yn(n),this.array[e+2]=yn(i),this.array[e+3]=yn(r),this}}class je extends Tt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let c0=0;const Fn=new rt,Sc=new xt,Br=new L,An=new Xt,ys=new Xt,$t=new L;class pt extends oi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:c0++}),this.uuid=In(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(kp(e)?Zu:Yu)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new ct().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Fn.makeRotationFromQuaternion(e),this.applyMatrix4(Fn),this}rotateX(e){return Fn.makeRotationX(e),this.applyMatrix4(Fn),this}rotateY(e){return Fn.makeRotationY(e),this.applyMatrix4(Fn),this}rotateZ(e){return Fn.makeRotationZ(e),this.applyMatrix4(Fn),this}translate(e,t,n){return Fn.makeTranslation(e,t,n),this.applyMatrix4(Fn),this}scale(e,t,n){return Fn.makeScale(e,t,n),this.applyMatrix4(Fn),this}lookAt(e){return Sc.lookAt(e),Sc.updateMatrix(),this.applyMatrix4(Sc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Br).negate(),this.translate(Br.x,Br.y,Br.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,r=e.length;i<r;i++){const o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new je(n,3))}else{for(let n=0,i=t.count;n<i;n++){const r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count,t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Xt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];An.setFromBufferAttribute(r),this.morphTargetsRelative?($t.addVectors(this.boundingBox.min,An.min),this.boundingBox.expandByPoint($t),$t.addVectors(this.boundingBox.max,An.max),this.boundingBox.expandByPoint($t)):(this.boundingBox.expandByPoint(An.min),this.boundingBox.expandByPoint(An.max))}}else this.boundingBox.makeEmpty();isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new qt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){this.boundingSphere.set(new L,1/0);return}if(e){const n=this.boundingSphere.center;if(An.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];ys.setFromBufferAttribute(a),this.morphTargetsRelative?($t.addVectors(An.min,ys.min),An.expandByPoint($t),$t.addVectors(An.max,ys.max),An.expandByPoint($t)):(An.expandByPoint(ys.min),An.expandByPoint(ys.max))}An.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)$t.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared($t));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)$t.fromBufferAttribute(a,c),l&&(Br.fromBufferAttribute(e,c),$t.add(Br)),i=Math.max(i,n.distanceToSquared($t))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return;const n=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Tt(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let w=0;w<n.count;w++)a[w]=new L,l[w]=new L;const c=new L,u=new L,h=new L,f=new pe,d=new pe,p=new pe,v=new L,g=new L;function m(w,M,S){c.fromBufferAttribute(n,w),u.fromBufferAttribute(n,M),h.fromBufferAttribute(n,S),f.fromBufferAttribute(r,w),d.fromBufferAttribute(r,M),p.fromBufferAttribute(r,S),u.sub(c),h.sub(c),d.sub(f),p.sub(f);const R=1/(d.x*p.y-p.x*d.y);isFinite(R)&&(v.copy(u).multiplyScalar(p.y).addScaledVector(h,-d.y).multiplyScalar(R),g.copy(h).multiplyScalar(d.x).addScaledVector(u,-p.x).multiplyScalar(R),a[w].add(v),a[M].add(v),a[S].add(v),l[w].add(g),l[M].add(g),l[S].add(g))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let w=0,M=x.length;w<M;++w){const S=x[w],R=S.start,P=S.count;for(let F=R,U=R+P;F<U;F+=3)m(e.getX(F+0),e.getX(F+1),e.getX(F+2))}const _=new L,y=new L,A=new L,b=new L;function T(w){A.fromBufferAttribute(i,w),b.copy(A);const M=a[w];_.copy(M),_.sub(A.multiplyScalar(A.dot(M))).normalize(),y.crossVectors(b,M);const R=y.dot(l[w])<0?-1:1;o.setXYZW(w,_.x,_.y,_.z,R)}for(let w=0,M=x.length;w<M;++w){const S=x[w],R=S.start,P=S.count;for(let F=R,U=R+P;F<U;F+=3)T(e.getX(F+0)),T(e.getX(F+1)),T(e.getX(F+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Tt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const i=new L,r=new L,o=new L,a=new L,l=new L,c=new L,u=new L,h=new L;if(e)for(let f=0,d=e.count;f<d;f+=3){const p=e.getX(f+0),v=e.getX(f+1),g=e.getX(f+2);i.fromBufferAttribute(t,p),r.fromBufferAttribute(t,v),o.fromBufferAttribute(t,g),u.subVectors(o,r),h.subVectors(i,r),u.cross(h),a.fromBufferAttribute(n,p),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,g),a.add(u),l.add(u),c.add(u),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let f=0,d=t.count;f<d;f+=3)i.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,r),h.subVectors(i,r),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)$t.fromBufferAttribute(e,t),$t.normalize(),e.setXYZ(t,$t.x,$t.y,$t.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,h=a.normalized,f=new c.constructor(l.length*u);let d=0,p=0;for(let v=0,g=l.length;v<g;v++){a.isInterleavedBufferAttribute?d=l[v]*a.data.stride+a.offset:d=l[v]*u;for(let m=0;m<u;m++)f[p++]=c[d++]}return new Tt(f,u,h)}if(this.index===null)return this;const t=new pt,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let u=0,h=c.length;u<h;u++){const f=c[u],d=e(f,n);l.push(d)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const d=c[h];u.push(d.toJSON(e.data))}u.length>0&&(i[l]=u,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(t))}const r=e.morphAttributes;for(const c in r){const u=[],h=r[c];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Qh=new rt,Xi=new Er,zo=new qt,ef=new L,Go=new L,Vo=new L,Ho=new L,Mc=new L,Wo=new L,tf=new L,Xo=new L;class Rt extends xt{constructor(e=new pt,t=new Ei){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(r&&a){Wo.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=a[l],h=r[l];u!==0&&(Mc.fromBufferAttribute(h,e),o?Wo.addScaledVector(Mc,u):Wo.addScaledVector(Mc.sub(t),u))}t.add(Wo)}return t}raycast(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),zo.copy(n.boundingSphere),zo.applyMatrix4(r),Xi.copy(e.ray).recast(e.near),!(zo.containsPoint(Xi.origin)===!1&&(Xi.intersectSphere(zo,ef)===null||Xi.origin.distanceToSquared(ef)>(e.far-e.near)**2))&&(Qh.copy(r).invert(),Xi.copy(e.ray).applyMatrix4(Qh),!(n.boundingBox!==null&&Xi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Xi)))}_computeIntersections(e,t,n){let i;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,v=f.length;p<v;p++){const g=f[p],m=o[g.materialIndex],x=Math.max(g.start,d.start),_=Math.min(a.count,Math.min(g.start+g.count,d.start+d.count));for(let y=x,A=_;y<A;y+=3){const b=a.getX(y),T=a.getX(y+1),w=a.getX(y+2);i=qo(this,m,e,n,c,u,h,b,T,w),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const p=Math.max(0,d.start),v=Math.min(a.count,d.start+d.count);for(let g=p,m=v;g<m;g+=3){const x=a.getX(g),_=a.getX(g+1),y=a.getX(g+2);i=qo(this,o,e,n,c,u,h,x,_,y),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let p=0,v=f.length;p<v;p++){const g=f[p],m=o[g.materialIndex],x=Math.max(g.start,d.start),_=Math.min(l.count,Math.min(g.start+g.count,d.start+d.count));for(let y=x,A=_;y<A;y+=3){const b=y,T=y+1,w=y+2;i=qo(this,m,e,n,c,u,h,b,T,w),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const p=Math.max(0,d.start),v=Math.min(l.count,d.start+d.count);for(let g=p,m=v;g<m;g+=3){const x=g,_=g+1,y=g+2;i=qo(this,o,e,n,c,u,h,x,_,y),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}}function u0(s,e,t,n,i,r,o,a){let l;if(e.side===gn?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,e.side===Mi,a),l===null)return null;Xo.copy(a),Xo.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(Xo);return c<t.near||c>t.far?null:{distance:c,point:Xo.clone(),object:s}}function qo(s,e,t,n,i,r,o,a,l,c){s.getVertexPosition(a,Go),s.getVertexPosition(l,Vo),s.getVertexPosition(c,Ho);const u=u0(s,e,t,n,Go,Vo,Ho,tf);if(u){const h=new L;Mn.getBarycoord(tf,Go,Vo,Ho,h),i&&(u.uv=Mn.getInterpolatedAttribute(i,a,l,c,h,new pe)),r&&(u.uv1=Mn.getInterpolatedAttribute(r,a,l,c,h,new pe)),o&&(u.normal=Mn.getInterpolatedAttribute(o,a,l,c,h,new L),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new L,materialIndex:0};Mn.getNormal(Go,Vo,Ho,f.normal),u.face=f,u.barycoord=h}return u}class Tr extends pt{constructor(e=1,t=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};const a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],u=[],h=[];let f=0,d=0;p("z","y","x",-1,-1,n,t,e,o,r,0),p("z","y","x",1,-1,n,t,-e,o,r,1),p("x","z","y",1,1,e,n,t,i,o,2),p("x","z","y",1,-1,e,n,-t,i,o,3),p("x","y","z",1,-1,e,t,n,i,r,4),p("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new je(c,3)),this.setAttribute("normal",new je(u,3)),this.setAttribute("uv",new je(h,2));function p(v,g,m,x,_,y,A,b,T,w,M){const S=y/T,R=A/w,P=y/2,F=A/2,U=b/2,G=T+1,B=w+1;let K=0,Y=0;const le=new L;for(let J=0;J<B;J++){const Z=J*R-F;for(let re=0;re<G;re++){const ne=re*S-P;le[v]=ne*x,le[g]=Z*_,le[m]=U,c.push(le.x,le.y,le.z),le[v]=0,le[g]=0,le[m]=b>0?1:-1,u.push(le.x,le.y,le.z),h.push(re/T),h.push(1-J/w),K+=1}}for(let J=0;J<w;J++)for(let Z=0;Z<T;Z++){const re=f+Z+G*J,ne=f+Z+G*(J+1),$=f+(Z+1)+G*(J+1),se=f+(Z+1)+G*J;l.push(re,ne,se),l.push(ne,$,se),Y+=6}a.addGroup(d,Y,M),d+=Y,f+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Tr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function us(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?e[t][n]=null:e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function fn(s){const e={};for(let t=0;t<s.length;t++){const n=us(s[t]);for(const i in n)e[i]=n[i]}return e}function h0(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Wp(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:_t.workingColorSpace}const to={clone:us,merge:fn};var f0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,d0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class cn extends un{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=f0,this.fragmentShader=d0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=us(e.uniforms),this.uniformsGroups=h0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class _o extends xt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new rt,this.projectionMatrix=new rt,this.projectionMatrixInverse=new rt,this.coordinateSystem=ei}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ui=new L,nf=new pe,rf=new pe;class Dt extends _o{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=cs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(pr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return cs*2*Math.atan(Math.tan(pr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ui.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ui.x,Ui.y).multiplyScalar(-e/Ui.z),Ui.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ui.x,Ui.y).multiplyScalar(-e/Ui.z)}getViewSize(e,t){return this.getViewBounds(e,nf,rf),t.subVectors(rf,nf)}setViewOffset(e,t,n,i,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(pr*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const kr=-90,zr=1;class Xp extends xt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Dt(kr,zr,e,t);i.layers=this.layers,this.add(i);const r=new Dt(kr,zr,e,t);r.layers=this.layers,this.add(r);const o=new Dt(kr,zr,e,t);o.layers=this.layers,this.add(o);const a=new Dt(kr,zr,e,t);a.layers=this.layers,this.add(a);const l=new Dt(kr,zr,e,t);l.layers=this.layers,this.add(l);const c=new Dt(kr,zr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===ei)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Qs)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,i),e.render(t,u),e.setRenderTarget(h,f,d),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class xo extends Ft{constructor(e,t,n,i,r,o,a,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:si,super(e,t,n,i,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class $u extends Pn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new xo(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Ut}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Tr(5,5,5),r=new cn({name:"CubemapFromEquirect",uniforms:us(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:gn,blending:xi});r.uniforms.tEquirect.value=t;const o=new Rt(i,r),a=t.minFilter;return t.minFilter===Qn&&(t.minFilter=Ut),new Xp(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(r)}}const bc=new L,p0=new L,m0=new ct;class mi{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=bc.subVectors(n,t).cross(p0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(bc),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||m0.getNormalMatrix(e),i=this.coplanarPoint(bc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const qi=new qt,Yo=new L;class yo{constructor(e=new mi,t=new mi,n=new mi,i=new mi,r=new mi,o=new mi){this.planes=[e,t,n,i,r,o]}set(e,t,n,i,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ei){const n=this.planes,i=e.elements,r=i[0],o=i[1],a=i[2],l=i[3],c=i[4],u=i[5],h=i[6],f=i[7],d=i[8],p=i[9],v=i[10],g=i[11],m=i[12],x=i[13],_=i[14],y=i[15];if(n[0].setComponents(l-r,f-c,g-d,y-m).normalize(),n[1].setComponents(l+r,f+c,g+d,y+m).normalize(),n[2].setComponents(l+o,f+u,g+p,y+x).normalize(),n[3].setComponents(l-o,f-u,g-p,y-x).normalize(),n[4].setComponents(l-a,f-h,g-v,y-_).normalize(),t===ei)n[5].setComponents(l+a,f+h,g+v,y+_).normalize();else if(t===Qs)n[5].setComponents(a,h,v,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),qi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),qi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(qi)}intersectsSprite(e){return qi.center.set(0,0,0),qi.radius=.7071067811865476,qi.applyMatrix4(e.matrixWorld),this.intersectsSphere(qi)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Yo.x=i.normal.x>0?e.max.x:e.min.x,Yo.y=i.normal.y>0?e.max.y:e.min.y,Yo.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Yo)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function qp(){let s=null,e=!1,t=null,n=null;function i(r,o){t(r,o),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function g0(s){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,h=c.byteLength,f=s.createBuffer();s.bindBuffer(l,f),s.bufferData(l,c,u),a.onUploadCallback();let d;if(c instanceof Float32Array)d=s.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=s.HALF_FLOAT:d=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=s.SHORT;else if(c instanceof Uint32Array)d=s.UNSIGNED_INT;else if(c instanceof Int32Array)d=s.INT;else if(c instanceof Int8Array)d=s.BYTE;else if(c instanceof Uint8Array)d=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,l,c){const u=l.array,h=l.updateRanges;if(s.bindBuffer(c,a),h.length===0)s.bufferSubData(c,0,u);else{h.sort((d,p)=>d.start-p.start);let f=0;for(let d=1;d<h.length;d++){const p=h[f],v=h[d];v.start<=p.start+p.count+1?p.count=Math.max(p.count,v.start+v.count-p.start):(++f,h[f]=v)}h.length=f+1;for(let d=0,p=h.length;d<p;d++){const v=h[d];s.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(s.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}class ai extends pt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,u=l+1,h=e/a,f=t/l,d=[],p=[],v=[],g=[];for(let m=0;m<u;m++){const x=m*f-o;for(let _=0;_<c;_++){const y=_*h-r;p.push(y,-x,0),v.push(0,0,1),g.push(_/a),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let x=0;x<a;x++){const _=x+c*m,y=x+c*(m+1),A=x+1+c*(m+1),b=x+1+c*m;d.push(_,y,b),d.push(y,A,b)}this.setIndex(d),this.setAttribute("position",new je(p,3)),this.setAttribute("normal",new je(v,3)),this.setAttribute("uv",new je(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ai(e.width,e.height,e.widthSegments,e.heightSegments)}}var v0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,_0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,x0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,y0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,S0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,M0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,b0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,w0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,E0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,T0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,A0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,C0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,R0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,I0=`#ifdef USE_IRIDESCENCE
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
#endif`,P0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,U0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
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
	#endif
#endif`,D0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,L0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,F0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,O0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,N0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,B0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,k0=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,z0=`#define PI 3.141592653589793
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
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
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
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,G0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
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
#endif`,V0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,H0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,W0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,X0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,q0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Y0="gl_FragColor = linearToOutputTexel( gl_FragColor );",Z0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,$0=`#ifdef USE_ENVMAP
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
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
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
#endif`,j0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,J0=`#ifdef USE_ENVMAP
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
#endif`,K0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Q0=`#ifdef USE_ENVMAP
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
#endif`,e_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,t_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,n_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,i_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,r_=`#ifdef USE_GRADIENTMAP
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
}`,s_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,o_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,a_=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,l_=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
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
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
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
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
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
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
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
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
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
#endif`,c_=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,u_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,h_=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,f_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,d_=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,p_=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
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
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,m_=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
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
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
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
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
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
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
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
#endif
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
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
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
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
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
}`,g_=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
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
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
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
		getSpotLightInfo( spotLight, geometryPosition, directLight );
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
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
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,v_=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,__=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,x_=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,y_=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,S_=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,M_=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,b_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,w_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,E_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,T_=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,A_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,C_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,R_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,I_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,P_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,U_=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,D_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,L_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,F_=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,O_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,N_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,B_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,k_=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,z_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,G_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,V_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,H_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,W_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,X_=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,q_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Y_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Z_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,$_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,j_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,J_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,K_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
			float shadowIntensity;
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
			float shadowIntensity;
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
			float shadowIntensity;
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
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
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
		return mix( 1.0, shadow, shadowIntensity );
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
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
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
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Q_=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
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
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,ex=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,tx=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,nx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ix=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,rx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,sx=`#ifdef USE_SKINNING
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
#endif`,ox=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ax=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,lx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,cx=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
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
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,ux=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,hx=`#ifdef USE_TRANSMISSION
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
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
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
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
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
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,fx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,dx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,px=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,mx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const gx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,vx=`uniform sampler2D t2D;
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
	#include <colorspace_fragment>
}`,_x=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xx=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Sx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
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
}`,bx=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,wx=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
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
}`,Ex=`#define DISTANCE
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
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Tx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ax=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cx=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Rx=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ix=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
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
}`,Px=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ux=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
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
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
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
}`,Dx=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
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
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lx=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
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
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
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
}`,Fx=`#define MATCAP
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
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
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
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ox=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
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
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Nx=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
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
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Bx=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
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
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
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
}`,kx=`#define PHONG
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
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
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
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zx=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
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
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
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
}`,Gx=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
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
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
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
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vx=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
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
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
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
}`,Hx=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wx=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
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
}`,Xx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,qx=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
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
}`,Yx=`uniform vec3 color;
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
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Zx=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
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
}`,$x=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ht={alphahash_fragment:v0,alphahash_pars_fragment:_0,alphamap_fragment:x0,alphamap_pars_fragment:y0,alphatest_fragment:S0,alphatest_pars_fragment:M0,aomap_fragment:b0,aomap_pars_fragment:w0,batching_pars_vertex:E0,batching_vertex:T0,begin_vertex:A0,beginnormal_vertex:C0,bsdfs:R0,iridescence_fragment:I0,bumpmap_pars_fragment:P0,clipping_planes_fragment:U0,clipping_planes_pars_fragment:D0,clipping_planes_pars_vertex:L0,clipping_planes_vertex:F0,color_fragment:O0,color_pars_fragment:N0,color_pars_vertex:B0,color_vertex:k0,common:z0,cube_uv_reflection_fragment:G0,defaultnormal_vertex:V0,displacementmap_pars_vertex:H0,displacementmap_vertex:W0,emissivemap_fragment:X0,emissivemap_pars_fragment:q0,colorspace_fragment:Y0,colorspace_pars_fragment:Z0,envmap_fragment:$0,envmap_common_pars_fragment:j0,envmap_pars_fragment:J0,envmap_pars_vertex:K0,envmap_physical_pars_fragment:c_,envmap_vertex:Q0,fog_vertex:e_,fog_pars_vertex:t_,fog_fragment:n_,fog_pars_fragment:i_,gradientmap_pars_fragment:r_,lightmap_pars_fragment:s_,lights_lambert_fragment:o_,lights_lambert_pars_fragment:a_,lights_pars_begin:l_,lights_toon_fragment:u_,lights_toon_pars_fragment:h_,lights_phong_fragment:f_,lights_phong_pars_fragment:d_,lights_physical_fragment:p_,lights_physical_pars_fragment:m_,lights_fragment_begin:g_,lights_fragment_maps:v_,lights_fragment_end:__,logdepthbuf_fragment:x_,logdepthbuf_pars_fragment:y_,logdepthbuf_pars_vertex:S_,logdepthbuf_vertex:M_,map_fragment:b_,map_pars_fragment:w_,map_particle_fragment:E_,map_particle_pars_fragment:T_,metalnessmap_fragment:A_,metalnessmap_pars_fragment:C_,morphinstance_vertex:R_,morphcolor_vertex:I_,morphnormal_vertex:P_,morphtarget_pars_vertex:U_,morphtarget_vertex:D_,normal_fragment_begin:L_,normal_fragment_maps:F_,normal_pars_fragment:O_,normal_pars_vertex:N_,normal_vertex:B_,normalmap_pars_fragment:k_,clearcoat_normal_fragment_begin:z_,clearcoat_normal_fragment_maps:G_,clearcoat_pars_fragment:V_,iridescence_pars_fragment:H_,opaque_fragment:W_,packing:X_,premultiplied_alpha_fragment:q_,project_vertex:Y_,dithering_fragment:Z_,dithering_pars_fragment:$_,roughnessmap_fragment:j_,roughnessmap_pars_fragment:J_,shadowmap_pars_fragment:K_,shadowmap_pars_vertex:Q_,shadowmap_vertex:ex,shadowmask_pars_fragment:tx,skinbase_vertex:nx,skinning_pars_vertex:ix,skinning_vertex:rx,skinnormal_vertex:sx,specularmap_fragment:ox,specularmap_pars_fragment:ax,tonemapping_fragment:lx,tonemapping_pars_fragment:cx,transmission_fragment:ux,transmission_pars_fragment:hx,uv_pars_fragment:fx,uv_pars_vertex:dx,uv_vertex:px,worldpos_vertex:mx,background_vert:gx,background_frag:vx,backgroundCube_vert:_x,backgroundCube_frag:xx,cube_vert:yx,cube_frag:Sx,depth_vert:Mx,depth_frag:bx,distanceRGBA_vert:wx,distanceRGBA_frag:Ex,equirect_vert:Tx,equirect_frag:Ax,linedashed_vert:Cx,linedashed_frag:Rx,meshbasic_vert:Ix,meshbasic_frag:Px,meshlambert_vert:Ux,meshlambert_frag:Dx,meshmatcap_vert:Lx,meshmatcap_frag:Fx,meshnormal_vert:Ox,meshnormal_frag:Nx,meshphong_vert:Bx,meshphong_frag:kx,meshphysical_vert:zx,meshphysical_frag:Gx,meshtoon_vert:Vx,meshtoon_frag:Hx,points_vert:Wx,points_frag:Xx,shadow_vert:qx,shadow_frag:Yx,sprite_vert:Zx,sprite_frag:$x},He={common:{diffuse:{value:new We(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ct},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ct}},envmap:{envMap:{value:null},envMapRotation:{value:new ct},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ct}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ct}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ct},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ct},normalScale:{value:new pe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ct},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ct}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ct}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ct}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new We(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new We(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0},uvTransform:{value:new ct}},sprite:{diffuse:{value:new We(16777215)},opacity:{value:1},center:{value:new pe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ct},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0}}},Wn={basic:{uniforms:fn([He.common,He.specularmap,He.envmap,He.aomap,He.lightmap,He.fog]),vertexShader:ht.meshbasic_vert,fragmentShader:ht.meshbasic_frag},lambert:{uniforms:fn([He.common,He.specularmap,He.envmap,He.aomap,He.lightmap,He.emissivemap,He.bumpmap,He.normalmap,He.displacementmap,He.fog,He.lights,{emissive:{value:new We(0)}}]),vertexShader:ht.meshlambert_vert,fragmentShader:ht.meshlambert_frag},phong:{uniforms:fn([He.common,He.specularmap,He.envmap,He.aomap,He.lightmap,He.emissivemap,He.bumpmap,He.normalmap,He.displacementmap,He.fog,He.lights,{emissive:{value:new We(0)},specular:{value:new We(1118481)},shininess:{value:30}}]),vertexShader:ht.meshphong_vert,fragmentShader:ht.meshphong_frag},standard:{uniforms:fn([He.common,He.envmap,He.aomap,He.lightmap,He.emissivemap,He.bumpmap,He.normalmap,He.displacementmap,He.roughnessmap,He.metalnessmap,He.fog,He.lights,{emissive:{value:new We(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag},toon:{uniforms:fn([He.common,He.aomap,He.lightmap,He.emissivemap,He.bumpmap,He.normalmap,He.displacementmap,He.gradientmap,He.fog,He.lights,{emissive:{value:new We(0)}}]),vertexShader:ht.meshtoon_vert,fragmentShader:ht.meshtoon_frag},matcap:{uniforms:fn([He.common,He.bumpmap,He.normalmap,He.displacementmap,He.fog,{matcap:{value:null}}]),vertexShader:ht.meshmatcap_vert,fragmentShader:ht.meshmatcap_frag},points:{uniforms:fn([He.points,He.fog]),vertexShader:ht.points_vert,fragmentShader:ht.points_frag},dashed:{uniforms:fn([He.common,He.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ht.linedashed_vert,fragmentShader:ht.linedashed_frag},depth:{uniforms:fn([He.common,He.displacementmap]),vertexShader:ht.depth_vert,fragmentShader:ht.depth_frag},normal:{uniforms:fn([He.common,He.bumpmap,He.normalmap,He.displacementmap,{opacity:{value:1}}]),vertexShader:ht.meshnormal_vert,fragmentShader:ht.meshnormal_frag},sprite:{uniforms:fn([He.sprite,He.fog]),vertexShader:ht.sprite_vert,fragmentShader:ht.sprite_frag},background:{uniforms:{uvTransform:{value:new ct},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ht.background_vert,fragmentShader:ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ct}},vertexShader:ht.backgroundCube_vert,fragmentShader:ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ht.cube_vert,fragmentShader:ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ht.equirect_vert,fragmentShader:ht.equirect_frag},distanceRGBA:{uniforms:fn([He.common,He.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ht.distanceRGBA_vert,fragmentShader:ht.distanceRGBA_frag},shadow:{uniforms:fn([He.lights,He.fog,{color:{value:new We(0)},opacity:{value:1}}]),vertexShader:ht.shadow_vert,fragmentShader:ht.shadow_frag}};Wn.physical={uniforms:fn([Wn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ct},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ct},clearcoatNormalScale:{value:new pe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ct},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ct},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ct},sheen:{value:0},sheenColor:{value:new We(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ct},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ct},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ct},transmissionSamplerSize:{value:new pe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ct},attenuationDistance:{value:0},attenuationColor:{value:new We(0)},specularColor:{value:new We(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ct},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ct},anisotropyVector:{value:new pe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ct}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag};const Zo={r:0,b:0,g:0},Yi=new Un,jx=new rt;function Jx(s,e,t,n,i,r,o){const a=new We(0);let l=r===!0?0:1,c,u,h=null,f=0,d=null;function p(x){let _=x.isScene===!0?x.background:null;return _&&_.isTexture&&(_=(x.backgroundBlurriness>0?t:e).get(_)),_}function v(x){let _=!1;const y=p(x);y===null?m(a,l):y&&y.isColor&&(m(y,1),_=!0);const A=s.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function g(x,_){const y=p(_);y&&(y.isCubeTexture||y.mapping===ps)?(u===void 0&&(u=new Rt(new Tr(1,1,1),new cn({name:"BackgroundCubeMaterial",uniforms:us(Wn.backgroundCube.uniforms),vertexShader:Wn.backgroundCube.vertexShader,fragmentShader:Wn.backgroundCube.fragmentShader,side:gn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(A,b,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),Yi.copy(_.backgroundRotation),Yi.x*=-1,Yi.y*=-1,Yi.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Yi.y*=-1,Yi.z*=-1),u.material.uniforms.envMap.value=y,u.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(jx.makeRotationFromEuler(Yi)),u.material.toneMapped=_t.getTransfer(y.colorSpace)!==Et,(h!==y||f!==y.version||d!==s.toneMapping)&&(u.material.needsUpdate=!0,h=y,f=y.version,d=s.toneMapping),u.layers.enableAll(),x.unshift(u,u.geometry,u.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new Rt(new ai(2,2),new cn({name:"BackgroundMaterial",uniforms:us(Wn.background.uniforms),vertexShader:Wn.background.vertexShader,fragmentShader:Wn.background.fragmentShader,side:Mi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=_t.getTransfer(y.colorSpace)!==Et,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||f!==y.version||d!==s.toneMapping)&&(c.material.needsUpdate=!0,h=y,f=y.version,d=s.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function m(x,_){x.getRGB(Zo,Wp(s)),n.buffers.color.setClear(Zo.r,Zo.g,Zo.b,_,o)}return{getClearColor:function(){return a},setClearColor:function(x,_=1){a.set(x),l=_,m(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,m(a,l)},render:v,addToRenderList:g}}function Kx(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=f(null);let r=i,o=!1;function a(S,R,P,F,U){let G=!1;const B=h(F,P,R);r!==B&&(r=B,c(r.object)),G=d(S,F,P,U),G&&p(S,F,P,U),U!==null&&e.update(U,s.ELEMENT_ARRAY_BUFFER),(G||o)&&(o=!1,y(S,R,P,F),U!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(U).buffer))}function l(){return s.createVertexArray()}function c(S){return s.bindVertexArray(S)}function u(S){return s.deleteVertexArray(S)}function h(S,R,P){const F=P.wireframe===!0;let U=n[S.id];U===void 0&&(U={},n[S.id]=U);let G=U[R.id];G===void 0&&(G={},U[R.id]=G);let B=G[F];return B===void 0&&(B=f(l()),G[F]=B),B}function f(S){const R=[],P=[],F=[];for(let U=0;U<t;U++)R[U]=0,P[U]=0,F[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:P,attributeDivisors:F,object:S,attributes:{},index:null}}function d(S,R,P,F){const U=r.attributes,G=R.attributes;let B=0;const K=P.getAttributes();for(const Y in K)if(K[Y].location>=0){const J=U[Y];let Z=G[Y];if(Z===void 0&&(Y==="instanceMatrix"&&S.instanceMatrix&&(Z=S.instanceMatrix),Y==="instanceColor"&&S.instanceColor&&(Z=S.instanceColor)),J===void 0||J.attribute!==Z||Z&&J.data!==Z.data)return!0;B++}return r.attributesNum!==B||r.index!==F}function p(S,R,P,F){const U={},G=R.attributes;let B=0;const K=P.getAttributes();for(const Y in K)if(K[Y].location>=0){let J=G[Y];J===void 0&&(Y==="instanceMatrix"&&S.instanceMatrix&&(J=S.instanceMatrix),Y==="instanceColor"&&S.instanceColor&&(J=S.instanceColor));const Z={};Z.attribute=J,J&&J.data&&(Z.data=J.data),U[Y]=Z,B++}r.attributes=U,r.attributesNum=B,r.index=F}function v(){const S=r.newAttributes;for(let R=0,P=S.length;R<P;R++)S[R]=0}function g(S){m(S,0)}function m(S,R){const P=r.newAttributes,F=r.enabledAttributes,U=r.attributeDivisors;P[S]=1,F[S]===0&&(s.enableVertexAttribArray(S),F[S]=1),U[S]!==R&&(s.vertexAttribDivisor(S,R),U[S]=R)}function x(){const S=r.newAttributes,R=r.enabledAttributes;for(let P=0,F=R.length;P<F;P++)R[P]!==S[P]&&(s.disableVertexAttribArray(P),R[P]=0)}function _(S,R,P,F,U,G,B){B===!0?s.vertexAttribIPointer(S,R,P,U,G):s.vertexAttribPointer(S,R,P,F,U,G)}function y(S,R,P,F){v();const U=F.attributes,G=P.getAttributes(),B=R.defaultAttributeValues;for(const K in G){const Y=G[K];if(Y.location>=0){let le=U[K];if(le===void 0&&(K==="instanceMatrix"&&S.instanceMatrix&&(le=S.instanceMatrix),K==="instanceColor"&&S.instanceColor&&(le=S.instanceColor)),le!==void 0){const J=le.normalized,Z=le.itemSize,re=e.get(le);if(re===void 0)continue;const ne=re.buffer,$=re.type,se=re.bytesPerElement,fe=$===s.INT||$===s.UNSIGNED_INT||le.gpuType===El;if(le.isInterleavedBufferAttribute){const me=le.data,Te=me.stride,qe=le.offset;if(me.isInstancedInterleavedBuffer){for(let Fe=0;Fe<Y.locationSize;Fe++)m(Y.location+Fe,me.meshPerAttribute);S.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=me.meshPerAttribute*me.count)}else for(let Fe=0;Fe<Y.locationSize;Fe++)g(Y.location+Fe);s.bindBuffer(s.ARRAY_BUFFER,ne);for(let Fe=0;Fe<Y.locationSize;Fe++)_(Y.location+Fe,Z/Y.locationSize,$,J,Te*se,(qe+Z/Y.locationSize*Fe)*se,fe)}else{if(le.isInstancedBufferAttribute){for(let me=0;me<Y.locationSize;me++)m(Y.location+me,le.meshPerAttribute);S.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let me=0;me<Y.locationSize;me++)g(Y.location+me);s.bindBuffer(s.ARRAY_BUFFER,ne);for(let me=0;me<Y.locationSize;me++)_(Y.location+me,Z/Y.locationSize,$,J,Z*se,Z/Y.locationSize*me*se,fe)}}else if(B!==void 0){const J=B[K];if(J!==void 0)switch(J.length){case 2:s.vertexAttrib2fv(Y.location,J);break;case 3:s.vertexAttrib3fv(Y.location,J);break;case 4:s.vertexAttrib4fv(Y.location,J);break;default:s.vertexAttrib1fv(Y.location,J)}}}}x()}function A(){w();for(const S in n){const R=n[S];for(const P in R){const F=R[P];for(const U in F)u(F[U].object),delete F[U];delete R[P]}delete n[S]}}function b(S){if(n[S.id]===void 0)return;const R=n[S.id];for(const P in R){const F=R[P];for(const U in F)u(F[U].object),delete F[U];delete R[P]}delete n[S.id]}function T(S){for(const R in n){const P=n[R];if(P[S.id]===void 0)continue;const F=P[S.id];for(const U in F)u(F[U].object),delete F[U];delete P[S.id]}}function w(){M(),o=!0,r!==i&&(r=i,c(r.object))}function M(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:w,resetDefaultState:M,dispose:A,releaseStatesOfGeometry:b,releaseStatesOfProgram:T,initAttributes:v,enableAttribute:g,disableUnusedAttributes:x}}function Qx(s,e,t){let n;function i(c){n=c}function r(c,u){s.drawArrays(n,c,u),t.update(u,n,1)}function o(c,u,h){h!==0&&(s.drawArraysInstanced(n,c,u,h),t.update(u,n,h))}function a(c,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,h);let d=0;for(let p=0;p<h;p++)d+=u[p];t.update(d,n,1)}function l(c,u,h,f){if(h===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let p=0;p<c.length;p++)o(c[p],u[p],f[p]);else{d.multiDrawArraysInstancedWEBGL(n,c,0,u,0,f,0,h);let p=0;for(let v=0;v<h;v++)p+=u[v]*f[v];t.update(p,n,1)}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function ey(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(T){return!(T!==en&&n.convert(T)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(T){const w=T===mn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==Xn&&n.convert(T)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==Wt&&!w)}function l(T){if(T==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(c=u);const h=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),m=s.getParameter(s.MAX_VERTEX_ATTRIBS),x=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),_=s.getParameter(s.MAX_VARYING_VECTORS),y=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),A=p>0,b=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:p,maxTextureSize:v,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:x,maxVaryings:_,maxFragmentUniforms:y,vertexTextures:A,maxSamples:b}}function ty(s){const e=this;let t=null,n=0,i=!1,r=!1;const o=new mi,a=new ct,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const d=h.length!==0||f||n!==0||i;return i=f,n=h.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,d){const p=h.clippingPlanes,v=h.clipIntersection,g=h.clipShadows,m=s.get(h);if(!i||p===null||p.length===0||r&&!g)r?u(null):c();else{const x=r?0:n,_=x*4;let y=m.clippingState||null;l.value=y,y=u(p,f,_,d);for(let A=0;A!==_;++A)y[A]=t[A];m.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,f,d,p){const v=h!==null?h.length:0;let g=null;if(v!==0){if(g=l.value,p!==!0||g===null){const m=d+v*4,x=f.matrixWorldInverse;a.getNormalMatrix(x),(g===null||g.length<m)&&(g=new Float32Array(m));for(let _=0,y=d;_!==v;++_,y+=4)o.copy(h[_]).applyMatrix4(x,a),o.normal.toArray(g,y),g[y+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,g}}function ny(s){let e=new WeakMap;function t(o,a){return a===as?o.mapping=si:a===Ys&&(o.mapping=Bi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===as||a===Ys)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new $u(l.height);return c.fromEquirectangularTexture(s,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class ni extends _o{constructor(e=-1,t=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const ts=4,sf=[.125,.215,.35,.446,.526,.582],ns=20,wc=new ni,of=new We;let Ec=null,Tc=0,Ac=0,Cc=!1;const or=(1+Math.sqrt(5))/2,Gr=1/or,af=[new L(-or,Gr,0),new L(or,Gr,0),new L(-Gr,0,or),new L(Gr,0,or),new L(0,or,-Gr),new L(0,or,Gr),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)];class du{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){Ec=this._renderer.getRenderTarget(),Tc=this._renderer.getActiveCubeFace(),Ac=this._renderer.getActiveMipmapLevel(),Cc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=uf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=cf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ec,Tc,Ac),this._renderer.xr.enabled=Cc,e.scissorTest=!1,$o(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===si||e.mapping===Bi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ec=this._renderer.getRenderTarget(),Tc=this._renderer.getActiveCubeFace(),Ac=this._renderer.getActiveMipmapLevel(),Cc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Ut,minFilter:Ut,generateMipmaps:!1,type:mn,format:en,colorSpace:wr,depthBuffer:!1},i=lf(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=lf(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=iy(r)),this._blurMaterial=ry(r,e,t)}return i}_compileMaterial(e){const t=new Rt(this._lodPlanes[0],e);this._renderer.compile(t,wc)}_sceneToCubeUV(e,t,n,i){const a=new Dt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(of),u.toneMapping=ti,u.autoClear=!1;const d=new Ei({name:"PMREM.Background",side:gn,depthWrite:!1,depthTest:!1}),p=new Rt(new Tr,d);let v=!1;const g=e.background;g?g.isColor&&(d.color.copy(g),e.background=null,v=!0):(d.color.copy(of),v=!0);for(let m=0;m<6;m++){const x=m%3;x===0?(a.up.set(0,l[m],0),a.lookAt(c[m],0,0)):x===1?(a.up.set(0,0,l[m]),a.lookAt(0,c[m],0)):(a.up.set(0,l[m],0),a.lookAt(0,0,c[m]));const _=this._cubeSize;$o(i,x*_,m>2?_:0,_,_),u.setRenderTarget(i),v&&u.render(p,a),u.render(e,a)}p.geometry.dispose(),p.material.dispose(),u.toneMapping=f,u.autoClear=h,e.background=g}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===si||e.mapping===Bi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=uf()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=cf());const r=i?this._cubemapMaterial:this._equirectMaterial,o=new Rt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;$o(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,wc)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=af[(i-r-1)%af.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,i,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",r),this._halfBlur(o,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,o,a){const l=this._renderer,c=this._blurMaterial,u=3,h=new Rt(this._lodPlanes[i],c),f=c.uniforms,d=this._sizeLods[n]-1,p=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*ns-1),v=r/p,g=isFinite(r)?1+Math.floor(u*v):ns;g>ns;const m=[];let x=0;for(let T=0;T<ns;++T){const w=T/v,M=Math.exp(-w*w/2);m.push(M),T===0?x+=M:T<g&&(x+=2*M)}for(let T=0;T<m.length;T++)m[T]=m[T]/x;f.envMap.value=e.texture,f.samples.value=g,f.weights.value=m,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:_}=this;f.dTheta.value=p,f.mipInt.value=_-n;const y=this._sizeLods[i],A=3*y*(i>_-ts?i-_+ts:0),b=4*(this._cubeSize-y);$o(t,A,b,3*y,2*y),l.setRenderTarget(t),l.render(h,wc)}}function iy(s){const e=[],t=[],n=[];let i=s;const r=s-ts+1+sf.length;for(let o=0;o<r;o++){const a=Math.pow(2,i);t.push(a);let l=1/a;o>s-ts?l=sf[o-s+ts-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,p=6,v=3,g=2,m=1,x=new Float32Array(v*p*d),_=new Float32Array(g*p*d),y=new Float32Array(m*p*d);for(let b=0;b<d;b++){const T=b%3*2/3-1,w=b>2?0:-1,M=[T,w,0,T+2/3,w,0,T+2/3,w+1,0,T,w,0,T+2/3,w+1,0,T,w+1,0];x.set(M,v*p*b),_.set(f,g*p*b);const S=[b,b,b,b,b,b];y.set(S,m*p*b)}const A=new pt;A.setAttribute("position",new Tt(x,v)),A.setAttribute("uv",new Tt(_,g)),A.setAttribute("faceIndex",new Tt(y,m)),e.push(A),i>ts&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function lf(s,e,t){const n=new Pn(s,e,t);return n.texture.mapping=ps,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function $o(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function ry(s,e,t){const n=new Float32Array(ns),i=new L(0,1,0);return new cn({name:"SphericalGaussianBlur",defines:{n:ns,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:ju(),fragmentShader:`

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
		`,blending:xi,depthTest:!1,depthWrite:!1})}function cf(){return new cn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ju(),fragmentShader:`

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
		`,blending:xi,depthTest:!1,depthWrite:!1})}function uf(){return new cn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ju(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:xi,depthTest:!1,depthWrite:!1})}function ju(){return`

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
	`}function sy(s){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===as||l===Ys,u=l===si||l===Bi;if(c||u){let h=e.get(a);const f=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new du(s)),h=c?t.fromEquirectangular(a,h):t.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{const d=a.image;return c&&d&&d.height>0||u&&d&&i(d)?(t===null&&(t=new du(s)),h=c?t.fromEquirectangular(a):t.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",r),h.texture):null}}}return a}function i(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function oy(s){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&Ds("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function ay(s,e,t,n){const i={},r=new WeakMap;function o(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const p in f.attributes)e.remove(f.attributes[p]);for(const p in f.morphAttributes){const v=f.morphAttributes[p];for(let g=0,m=v.length;g<m;g++)e.remove(v[g])}f.removeEventListener("dispose",o),delete i[f.id];const d=r.get(f);d&&(e.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(h,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,t.memory.geometries++),f}function l(h){const f=h.attributes;for(const p in f)e.update(f[p],s.ARRAY_BUFFER);const d=h.morphAttributes;for(const p in d){const v=d[p];for(let g=0,m=v.length;g<m;g++)e.update(v[g],s.ARRAY_BUFFER)}}function c(h){const f=[],d=h.index,p=h.attributes.position;let v=0;if(d!==null){const x=d.array;v=d.version;for(let _=0,y=x.length;_<y;_+=3){const A=x[_+0],b=x[_+1],T=x[_+2];f.push(A,b,b,T,T,A)}}else if(p!==void 0){const x=p.array;v=p.version;for(let _=0,y=x.length/3-1;_<y;_+=3){const A=_+0,b=_+1,T=_+2;f.push(A,b,b,T,T,A)}}else return;const g=new(kp(f)?Zu:Yu)(f,1);g.version=v;const m=r.get(h);m&&e.remove(m),r.set(h,g)}function u(h){const f=r.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&c(h)}else c(h);return r.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function ly(s,e,t){let n;function i(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function l(f,d){s.drawElements(n,d,r,f*o),t.update(d,n,1)}function c(f,d,p){p!==0&&(s.drawElementsInstanced(n,d,r,f*o,p),t.update(d,n,p))}function u(f,d,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,p);let g=0;for(let m=0;m<p;m++)g+=d[m];t.update(g,n,1)}function h(f,d,p,v){if(p===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<f.length;m++)c(f[m]/o,d[m],v[m]);else{g.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,v,0,p);let m=0;for(let x=0;x<p;x++)m+=d[x]*v[x];t.update(m,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function cy(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function uy(s,e,t){const n=new WeakMap,i=new dt;function r(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let f=n.get(a);if(f===void 0||f.count!==h){let M=function(){T.dispose(),n.delete(a),a.removeEventListener("dispose",M)};f!==void 0&&f.texture.dispose();const d=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let _=0;d===!0&&(_=1),p===!0&&(_=2),v===!0&&(_=3);let y=a.attributes.position.count*_,A=1;y>e.maxTextureSize&&(A=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const b=new Float32Array(y*A*4*h),T=new Pl(b,y,A,h);T.type=Wt,T.needsUpdate=!0;const w=_*4;for(let S=0;S<h;S++){const R=g[S],P=m[S],F=x[S],U=y*A*4*S;for(let G=0;G<R.count;G++){const B=G*w;d===!0&&(i.fromBufferAttribute(R,G),b[U+B+0]=i.x,b[U+B+1]=i.y,b[U+B+2]=i.z,b[U+B+3]=0),p===!0&&(i.fromBufferAttribute(P,G),b[U+B+4]=i.x,b[U+B+5]=i.y,b[U+B+6]=i.z,b[U+B+7]=0),v===!0&&(i.fromBufferAttribute(F,G),b[U+B+8]=i.x,b[U+B+9]=i.y,b[U+B+10]=i.z,b[U+B+11]=F.itemSize===4?i.w:1)}}f={count:h,texture:T,size:new pe(y,A)},n.set(a,f),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,t);else{let d=0;for(let v=0;v<c.length;v++)d+=c[v];const p=a.morphTargetsRelative?1:1-d;l.getUniforms().setValue(s,"morphTargetBaseInfluence",p),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",f.size)}return{update:r}}function hy(s,e,t,n){let i=new WeakMap;function r(l){const c=n.render.frame,u=l.geometry,h=e.get(l,u);if(i.get(h)!==c&&(e.update(h),i.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;i.get(f)!==c&&(f.update(),i.set(f,c))}return h}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}class Ju extends Ft{constructor(e,t,n,i,r,o,a,l,c,u=dr){if(u!==dr&&u!==Sr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===dr&&(n=bi),n===void 0&&u===Sr&&(n=yr),super(null,i,r,o,a,l,u,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:tn,this.minFilter=l!==void 0?l:tn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Yp=new Ft,hf=new Ju(1,1),Zp=new Pl,$p=new qu,jp=new xo,ff=[],df=[],pf=new Float32Array(16),mf=new Float32Array(9),gf=new Float32Array(4);function ms(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let r=ff[i];if(r===void 0&&(r=new Float32Array(i),ff[i]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function Yt(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Zt(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function Ul(s,e){let t=df[e];t===void 0&&(t=new Int32Array(e),df[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function fy(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function dy(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;s.uniform2fv(this.addr,e),Zt(t,e)}}function py(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Yt(t,e))return;s.uniform3fv(this.addr,e),Zt(t,e)}}function my(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;s.uniform4fv(this.addr,e),Zt(t,e)}}function gy(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Yt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Zt(t,e)}else{if(Yt(t,n))return;gf.set(n),s.uniformMatrix2fv(this.addr,!1,gf),Zt(t,n)}}function vy(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Yt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Zt(t,e)}else{if(Yt(t,n))return;mf.set(n),s.uniformMatrix3fv(this.addr,!1,mf),Zt(t,n)}}function _y(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Yt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Zt(t,e)}else{if(Yt(t,n))return;pf.set(n),s.uniformMatrix4fv(this.addr,!1,pf),Zt(t,n)}}function xy(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function yy(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;s.uniform2iv(this.addr,e),Zt(t,e)}}function Sy(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Yt(t,e))return;s.uniform3iv(this.addr,e),Zt(t,e)}}function My(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;s.uniform4iv(this.addr,e),Zt(t,e)}}function by(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function wy(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;s.uniform2uiv(this.addr,e),Zt(t,e)}}function Ey(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Yt(t,e))return;s.uniform3uiv(this.addr,e),Zt(t,e)}}function Ty(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;s.uniform4uiv(this.addr,e),Zt(t,e)}}function Ay(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(hf.compareFunction=Hu,r=hf):r=Yp,t.setTexture2D(e||r,i)}function Cy(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||$p,i)}function Ry(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||jp,i)}function Iy(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Zp,i)}function Py(s){switch(s){case 5126:return fy;case 35664:return dy;case 35665:return py;case 35666:return my;case 35674:return gy;case 35675:return vy;case 35676:return _y;case 5124:case 35670:return xy;case 35667:case 35671:return yy;case 35668:case 35672:return Sy;case 35669:case 35673:return My;case 5125:return by;case 36294:return wy;case 36295:return Ey;case 36296:return Ty;case 35678:case 36198:case 36298:case 36306:case 35682:return Ay;case 35679:case 36299:case 36307:return Cy;case 35680:case 36300:case 36308:case 36293:return Ry;case 36289:case 36303:case 36311:case 36292:return Iy}}function Uy(s,e){s.uniform1fv(this.addr,e)}function Dy(s,e){const t=ms(e,this.size,2);s.uniform2fv(this.addr,t)}function Ly(s,e){const t=ms(e,this.size,3);s.uniform3fv(this.addr,t)}function Fy(s,e){const t=ms(e,this.size,4);s.uniform4fv(this.addr,t)}function Oy(s,e){const t=ms(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function Ny(s,e){const t=ms(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function By(s,e){const t=ms(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function ky(s,e){s.uniform1iv(this.addr,e)}function zy(s,e){s.uniform2iv(this.addr,e)}function Gy(s,e){s.uniform3iv(this.addr,e)}function Vy(s,e){s.uniform4iv(this.addr,e)}function Hy(s,e){s.uniform1uiv(this.addr,e)}function Wy(s,e){s.uniform2uiv(this.addr,e)}function Xy(s,e){s.uniform3uiv(this.addr,e)}function qy(s,e){s.uniform4uiv(this.addr,e)}function Yy(s,e,t){const n=this.cache,i=e.length,r=Ul(t,i);Yt(n,r)||(s.uniform1iv(this.addr,r),Zt(n,r));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||Yp,r[o])}function Zy(s,e,t){const n=this.cache,i=e.length,r=Ul(t,i);Yt(n,r)||(s.uniform1iv(this.addr,r),Zt(n,r));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||$p,r[o])}function $y(s,e,t){const n=this.cache,i=e.length,r=Ul(t,i);Yt(n,r)||(s.uniform1iv(this.addr,r),Zt(n,r));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||jp,r[o])}function jy(s,e,t){const n=this.cache,i=e.length,r=Ul(t,i);Yt(n,r)||(s.uniform1iv(this.addr,r),Zt(n,r));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||Zp,r[o])}function Jy(s){switch(s){case 5126:return Uy;case 35664:return Dy;case 35665:return Ly;case 35666:return Fy;case 35674:return Oy;case 35675:return Ny;case 35676:return By;case 5124:case 35670:return ky;case 35667:case 35671:return zy;case 35668:case 35672:return Gy;case 35669:case 35673:return Vy;case 5125:return Hy;case 36294:return Wy;case 36295:return Xy;case 36296:return qy;case 35678:case 36198:case 36298:case 36306:case 35682:return Yy;case 35679:case 36299:case 36307:return Zy;case 35680:case 36300:case 36308:case 36293:return $y;case 36289:case 36303:case 36311:case 36292:return jy}}class Ky{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Py(t.type)}}class Qy{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Jy(t.type)}}class eS{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let r=0,o=i.length;r!==o;++r){const a=i[r];a.setValue(e,t[a.id],n)}}}const Rc=/(\w+)(\])?(\[|\.)?/g;function vf(s,e){s.seq.push(e),s.map[e.id]=e}function tS(s,e,t){const n=s.name,i=n.length;for(Rc.lastIndex=0;;){const r=Rc.exec(n),o=Rc.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){vf(t,c===void 0?new Ky(a,s,e):new Qy(a,s,e));break}else{let h=t.map[a];h===void 0&&(h=new eS(a),vf(t,h)),t=h}}}class Ua{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=e.getActiveUniform(t,i),o=e.getUniformLocation(t,r.name);tS(r,o,this)}}setValue(e,t,n,i){const r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,r=e.length;i!==r;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function _f(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}const nS=37297;let iS=0;function rS(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=i;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const xf=new ct;function sS(s){_t._getMatrix(xf,_t.workingColorSpace,s);const e=`mat3( ${xf.elements.map(t=>t.toFixed(4))} )`;switch(_t.getTransfer(s)){case vo:return[e,"LinearTransferOETF"];case Et:return[e,"sRGBTransferOETF"];default:return[e,"LinearTransferOETF"]}}function yf(s,e,t){const n=s.getShaderParameter(e,s.COMPILE_STATUS),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+i+`

`+rS(s.getShaderSource(e),o)}else return i}function oS(s,e){const t=sS(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function aS(s,e){let t;switch(e){case yp:t="Linear";break;case Sp:t="Reinhard";break;case Mp:t="Cineon";break;case Iu:t="ACESFilmic";break;case wp:t="AgX";break;case Ep:t="Neutral";break;case bp:t="Custom";break;default:t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const jo=new L;function lS(){_t.getLuminanceCoefficients(jo);const s=jo.x.toFixed(4),e=jo.y.toFixed(4),t=jo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function cS(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Fs).join(`
`)}function uS(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function hS(s,e){const t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(e,i),o=r.name;let a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function Fs(s){return s!==""}function Sf(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Mf(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const fS=/^[ \t]*#include +<([\w\d./]+)>/gm;function pu(s){return s.replace(fS,pS)}const dS=new Map;function pS(s,e){let t=ht[e];if(t===void 0){const n=dS.get(e);if(n!==void 0)t=ht[n];else throw new Error("Can not resolve #include <"+e+">")}return pu(t)}const mS=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function bf(s){return s.replace(mS,gS)}function gS(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function wf(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function vS(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===bl?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===Os?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Hn&&(e="SHADOWMAP_TYPE_VSM"),e}function _S(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case si:case Bi:e="ENVMAP_TYPE_CUBE";break;case ps:e="ENVMAP_TYPE_CUBE_UV";break}return e}function xS(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Bi:e="ENVMAP_MODE_REFRACTION";break}return e}function yS(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case po:e="ENVMAP_BLENDING_MULTIPLY";break;case _p:e="ENVMAP_BLENDING_MIX";break;case xp:e="ENVMAP_BLENDING_ADD";break}return e}function SS(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function MS(s,e,t,n){const i=s.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=vS(t),c=_S(t),u=xS(t),h=yS(t),f=SS(t),d=cS(t),p=uS(r),v=i.createProgram();let g,m,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Fs).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Fs).join(`
`),m.length>0&&(m+=`
`)):(g=[wf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Fs).join(`
`),m=[wf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ti?"#define TONE_MAPPING":"",t.toneMapping!==ti?ht.tonemapping_pars_fragment:"",t.toneMapping!==ti?aS("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ht.colorspace_pars_fragment,oS("linearToOutputTexel",t.outputColorSpace),lS(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Fs).join(`
`)),o=pu(o),o=Sf(o,t),o=Mf(o,t),a=pu(a),a=Sf(a,t),a=Mf(a,t),o=bf(o),a=bf(a),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===fu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===fu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const _=x+g+o,y=x+m+a,A=_f(i,i.VERTEX_SHADER,_),b=_f(i,i.FRAGMENT_SHADER,y);i.attachShader(v,A),i.attachShader(v,b),t.index0AttributeName!==void 0?i.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v);function T(R){if(s.debug.checkShaderErrors){const P=i.getProgramInfoLog(v).trim(),F=i.getShaderInfoLog(A).trim(),U=i.getShaderInfoLog(b).trim();let G=!0,B=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(G=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,v,A,b);else{const K=yf(i,A,"vertex"),Y=yf(i,b,"fragment")}else P!==""||(F===""||U==="")&&(B=!1);B&&(R.diagnostics={runnable:G,programLog:P,vertexShader:{log:F,prefix:g},fragmentShader:{log:U,prefix:m}})}i.deleteShader(A),i.deleteShader(b),w=new Ua(i,v),M=hS(i,v)}let w;this.getUniforms=function(){return w===void 0&&T(this),w};let M;this.getAttributes=function(){return M===void 0&&T(this),M};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=i.getProgramParameter(v,nS)),S},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=iS++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=A,this.fragmentShader=b,this}let bS=0;class wS{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new ES(e),t.set(e,n)),n}}class ES{constructor(e){this.id=bS++,this.code=e,this.usedTimes=0}}function TS(s,e,t,n,i,r,o){const a=new mr,l=new wS,c=new Set,u=[],h=i.logarithmicDepthBuffer,f=i.vertexTextures;let d=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(M){return c.add(M),M===0?"uv":`uv${M}`}function g(M,S,R,P,F){const U=P.fog,G=F.geometry,B=M.isMeshStandardMaterial?P.environment:null,K=(M.isMeshStandardMaterial?t:e).get(M.envMap||B),Y=K&&K.mapping===ps?K.image.height:null,le=p[M.type];M.precision!==null&&(d=i.getMaxPrecision(M.precision),M.precision);const J=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Z=J!==void 0?J.length:0;let re=0;G.morphAttributes.position!==void 0&&(re=1),G.morphAttributes.normal!==void 0&&(re=2),G.morphAttributes.color!==void 0&&(re=3);let ne,$,se,fe;if(le){const et=Wn[le];ne=et.vertexShader,$=et.fragmentShader}else ne=M.vertexShader,$=M.fragmentShader,l.update(M),se=l.getVertexShaderID(M),fe=l.getFragmentShaderID(M);const me=s.getRenderTarget(),Te=s.state.buffers.depth.getReversed(),qe=F.isInstancedMesh===!0,Fe=F.isBatchedMesh===!0,Se=!!M.map,ue=!!M.matcap,xe=!!K,N=!!M.aoMap,Be=!!M.lightMap,ye=!!M.bumpMap,Le=!!M.normalMap,Oe=!!M.displacementMap,$e=!!M.emissiveMap,Ne=!!M.metalnessMap,O=!!M.roughnessMap,I=M.anisotropy>0,Q=M.clearcoat>0,he=M.dispersion>0,ve=M.iridescence>0,ge=M.sheen>0,Ee=M.transmission>0,Re=I&&!!M.anisotropyMap,Ie=Q&&!!M.clearcoatMap,Je=Q&&!!M.clearcoatNormalMap,be=Q&&!!M.clearcoatRoughnessMap,Ge=ve&&!!M.iridescenceMap,ke=ve&&!!M.iridescenceThicknessMap,Xe=ge&&!!M.sheenColorMap,Ce=ge&&!!M.sheenRoughnessMap,H=!!M.specularMap,ae=!!M.specularColorMap,Ae=!!M.specularIntensityMap,X=Ee&&!!M.transmissionMap,j=Ee&&!!M.thicknessMap,ee=!!M.gradientMap,_e=!!M.alphaMap,Pe=M.alphaTest>0,we=!!M.alphaHash,Ye=!!M.extensions;let ot=ti;M.toneMapped&&(me===null||me.isXRRenderTarget===!0)&&(ot=s.toneMapping);const Qe={shaderID:le,shaderType:M.type,shaderName:M.name,vertexShader:ne,fragmentShader:$,defines:M.defines,customVertexShaderID:se,customFragmentShaderID:fe,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:d,batching:Fe,batchingColor:Fe&&F._colorsTexture!==null,instancing:qe,instancingColor:qe&&F.instanceColor!==null,instancingMorph:qe&&F.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:me===null?s.outputColorSpace:me.isXRRenderTarget===!0?me.texture.colorSpace:wr,alphaToCoverage:!!M.alphaToCoverage,map:Se,matcap:ue,envMap:xe,envMapMode:xe&&K.mapping,envMapCubeUVHeight:Y,aoMap:N,lightMap:Be,bumpMap:ye,normalMap:Le,displacementMap:f&&Oe,emissiveMap:$e,normalMapObjectSpace:Le&&M.normalMapType===Pp,normalMapTangentSpace:Le&&M.normalMapType===zi,metalnessMap:Ne,roughnessMap:O,anisotropy:I,anisotropyMap:Re,clearcoat:Q,clearcoatMap:Ie,clearcoatNormalMap:Je,clearcoatRoughnessMap:be,dispersion:he,iridescence:ve,iridescenceMap:Ge,iridescenceThicknessMap:ke,sheen:ge,sheenColorMap:Xe,sheenRoughnessMap:Ce,specularMap:H,specularColorMap:ae,specularIntensityMap:Ae,transmission:Ee,transmissionMap:X,thicknessMap:j,gradientMap:ee,opaque:M.transparent===!1&&M.blending===fr&&M.alphaToCoverage===!1,alphaMap:_e,alphaTest:Pe,alphaHash:we,combine:M.combine,mapUv:Se&&v(M.map.channel),aoMapUv:N&&v(M.aoMap.channel),lightMapUv:Be&&v(M.lightMap.channel),bumpMapUv:ye&&v(M.bumpMap.channel),normalMapUv:Le&&v(M.normalMap.channel),displacementMapUv:Oe&&v(M.displacementMap.channel),emissiveMapUv:$e&&v(M.emissiveMap.channel),metalnessMapUv:Ne&&v(M.metalnessMap.channel),roughnessMapUv:O&&v(M.roughnessMap.channel),anisotropyMapUv:Re&&v(M.anisotropyMap.channel),clearcoatMapUv:Ie&&v(M.clearcoatMap.channel),clearcoatNormalMapUv:Je&&v(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:be&&v(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Ge&&v(M.iridescenceMap.channel),iridescenceThicknessMapUv:ke&&v(M.iridescenceThicknessMap.channel),sheenColorMapUv:Xe&&v(M.sheenColorMap.channel),sheenRoughnessMapUv:Ce&&v(M.sheenRoughnessMap.channel),specularMapUv:H&&v(M.specularMap.channel),specularColorMapUv:ae&&v(M.specularColorMap.channel),specularIntensityMapUv:Ae&&v(M.specularIntensityMap.channel),transmissionMapUv:X&&v(M.transmissionMap.channel),thicknessMapUv:j&&v(M.thicknessMap.channel),alphaMapUv:_e&&v(M.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(Le||I),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!G.attributes.uv&&(Se||_e),fog:!!U,useFog:M.fog===!0,fogExp2:!!U&&U.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:Te,skinning:F.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:Z,morphTextureStride:re,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:s.shadowMap.enabled&&R.length>0,shadowMapType:s.shadowMap.type,toneMapping:ot,decodeVideoTexture:Se&&M.map.isVideoTexture===!0&&_t.getTransfer(M.map.colorSpace)===Et,decodeVideoTextureEmissive:$e&&M.emissiveMap.isVideoTexture===!0&&_t.getTransfer(M.emissiveMap.colorSpace)===Et,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Cn,flipSided:M.side===gn,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Ye&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ye&&M.extensions.multiDraw===!0||Fe)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return Qe.vertexUv1s=c.has(1),Qe.vertexUv2s=c.has(2),Qe.vertexUv3s=c.has(3),c.clear(),Qe}function m(M){const S=[];if(M.shaderID?S.push(M.shaderID):(S.push(M.customVertexShaderID),S.push(M.customFragmentShaderID)),M.defines!==void 0)for(const R in M.defines)S.push(R),S.push(M.defines[R]);return M.isRawShaderMaterial===!1&&(x(S,M),_(S,M),S.push(s.outputColorSpace)),S.push(M.customProgramCacheKey),S.join()}function x(M,S){M.push(S.precision),M.push(S.outputColorSpace),M.push(S.envMapMode),M.push(S.envMapCubeUVHeight),M.push(S.mapUv),M.push(S.alphaMapUv),M.push(S.lightMapUv),M.push(S.aoMapUv),M.push(S.bumpMapUv),M.push(S.normalMapUv),M.push(S.displacementMapUv),M.push(S.emissiveMapUv),M.push(S.metalnessMapUv),M.push(S.roughnessMapUv),M.push(S.anisotropyMapUv),M.push(S.clearcoatMapUv),M.push(S.clearcoatNormalMapUv),M.push(S.clearcoatRoughnessMapUv),M.push(S.iridescenceMapUv),M.push(S.iridescenceThicknessMapUv),M.push(S.sheenColorMapUv),M.push(S.sheenRoughnessMapUv),M.push(S.specularMapUv),M.push(S.specularColorMapUv),M.push(S.specularIntensityMapUv),M.push(S.transmissionMapUv),M.push(S.thicknessMapUv),M.push(S.combine),M.push(S.fogExp2),M.push(S.sizeAttenuation),M.push(S.morphTargetsCount),M.push(S.morphAttributeCount),M.push(S.numDirLights),M.push(S.numPointLights),M.push(S.numSpotLights),M.push(S.numSpotLightMaps),M.push(S.numHemiLights),M.push(S.numRectAreaLights),M.push(S.numDirLightShadows),M.push(S.numPointLightShadows),M.push(S.numSpotLightShadows),M.push(S.numSpotLightShadowsWithMaps),M.push(S.numLightProbes),M.push(S.shadowMapType),M.push(S.toneMapping),M.push(S.numClippingPlanes),M.push(S.numClipIntersection),M.push(S.depthPacking)}function _(M,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),M.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reverseDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),M.push(a.mask)}function y(M){const S=p[M.type];let R;if(S){const P=Wn[S];R=to.clone(P.uniforms)}else R=M.uniforms;return R}function A(M,S){let R;for(let P=0,F=u.length;P<F;P++){const U=u[P];if(U.cacheKey===S){R=U,++R.usedTimes;break}}return R===void 0&&(R=new MS(s,S,M,r),u.push(R)),R}function b(M){if(--M.usedTimes===0){const S=u.indexOf(M);u[S]=u[u.length-1],u.pop(),M.destroy()}}function T(M){l.remove(M)}function w(){l.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:y,acquireProgram:A,releaseProgram:b,releaseShaderCache:T,programs:u,dispose:w}}function AS(){let s=new WeakMap;function e(o){return s.has(o)}function t(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,l){s.get(o)[a]=l}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function CS(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Ef(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Tf(){const s=[];let e=0;const t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function o(h,f,d,p,v,g){let m=s[e];return m===void 0?(m={id:h.id,object:h,geometry:f,material:d,groupOrder:p,renderOrder:h.renderOrder,z:v,group:g},s[e]=m):(m.id=h.id,m.object=h,m.geometry=f,m.material=d,m.groupOrder=p,m.renderOrder=h.renderOrder,m.z=v,m.group=g),e++,m}function a(h,f,d,p,v,g){const m=o(h,f,d,p,v,g);d.transmission>0?n.push(m):d.transparent===!0?i.push(m):t.push(m)}function l(h,f,d,p,v,g){const m=o(h,f,d,p,v,g);d.transmission>0?n.unshift(m):d.transparent===!0?i.unshift(m):t.unshift(m)}function c(h,f){t.length>1&&t.sort(h||CS),n.length>1&&n.sort(f||Ef),i.length>1&&i.sort(f||Ef)}function u(){for(let h=e,f=s.length;h<f;h++){const d=s[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:a,unshift:l,finish:u,sort:c}}function RS(){let s=new WeakMap;function e(n,i){const r=s.get(n);let o;return r===void 0?(o=new Tf,s.set(n,[o])):i>=r.length?(o=new Tf,r.push(o)):o=r[i],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function IS(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new We};break;case"SpotLight":t={position:new L,direction:new L,color:new We,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new We,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new We,groundColor:new We};break;case"RectAreaLight":t={color:new We,position:new L,halfWidth:new L,halfHeight:new L};break}return s[e.id]=t,t}}}function PS(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pe,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let US=0;function DS(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function LS(s){const e=new IS,t=PS(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new L);const i=new L,r=new rt,o=new rt;function a(c){let u=0,h=0,f=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let d=0,p=0,v=0,g=0,m=0,x=0,_=0,y=0,A=0,b=0,T=0;c.sort(DS);for(let M=0,S=c.length;M<S;M++){const R=c[M],P=R.color,F=R.intensity,U=R.distance,G=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)u+=P.r*F,h+=P.g*F,f+=P.b*F;else if(R.isLightProbe){for(let B=0;B<9;B++)n.probe[B].addScaledVector(R.sh.coefficients[B],F);T++}else if(R.isDirectionalLight){const B=e.get(R);if(B.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const K=R.shadow,Y=t.get(R);Y.shadowIntensity=K.intensity,Y.shadowBias=K.bias,Y.shadowNormalBias=K.normalBias,Y.shadowRadius=K.radius,Y.shadowMapSize=K.mapSize,n.directionalShadow[d]=Y,n.directionalShadowMap[d]=G,n.directionalShadowMatrix[d]=R.shadow.matrix,x++}n.directional[d]=B,d++}else if(R.isSpotLight){const B=e.get(R);B.position.setFromMatrixPosition(R.matrixWorld),B.color.copy(P).multiplyScalar(F),B.distance=U,B.coneCos=Math.cos(R.angle),B.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),B.decay=R.decay,n.spot[v]=B;const K=R.shadow;if(R.map&&(n.spotLightMap[A]=R.map,A++,K.updateMatrices(R),R.castShadow&&b++),n.spotLightMatrix[v]=K.matrix,R.castShadow){const Y=t.get(R);Y.shadowIntensity=K.intensity,Y.shadowBias=K.bias,Y.shadowNormalBias=K.normalBias,Y.shadowRadius=K.radius,Y.shadowMapSize=K.mapSize,n.spotShadow[v]=Y,n.spotShadowMap[v]=G,y++}v++}else if(R.isRectAreaLight){const B=e.get(R);B.color.copy(P).multiplyScalar(F),B.halfWidth.set(R.width*.5,0,0),B.halfHeight.set(0,R.height*.5,0),n.rectArea[g]=B,g++}else if(R.isPointLight){const B=e.get(R);if(B.color.copy(R.color).multiplyScalar(R.intensity),B.distance=R.distance,B.decay=R.decay,R.castShadow){const K=R.shadow,Y=t.get(R);Y.shadowIntensity=K.intensity,Y.shadowBias=K.bias,Y.shadowNormalBias=K.normalBias,Y.shadowRadius=K.radius,Y.shadowMapSize=K.mapSize,Y.shadowCameraNear=K.camera.near,Y.shadowCameraFar=K.camera.far,n.pointShadow[p]=Y,n.pointShadowMap[p]=G,n.pointShadowMatrix[p]=R.shadow.matrix,_++}n.point[p]=B,p++}else if(R.isHemisphereLight){const B=e.get(R);B.skyColor.copy(R.color).multiplyScalar(F),B.groundColor.copy(R.groundColor).multiplyScalar(F),n.hemi[m]=B,m++}}g>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=He.LTC_FLOAT_1,n.rectAreaLTC2=He.LTC_FLOAT_2):(n.rectAreaLTC1=He.LTC_HALF_1,n.rectAreaLTC2=He.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=f;const w=n.hash;(w.directionalLength!==d||w.pointLength!==p||w.spotLength!==v||w.rectAreaLength!==g||w.hemiLength!==m||w.numDirectionalShadows!==x||w.numPointShadows!==_||w.numSpotShadows!==y||w.numSpotMaps!==A||w.numLightProbes!==T)&&(n.directional.length=d,n.spot.length=v,n.rectArea.length=g,n.point.length=p,n.hemi.length=m,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=_,n.pointShadowMap.length=_,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=_,n.spotLightMatrix.length=y+A-b,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=b,n.numLightProbes=T,w.directionalLength=d,w.pointLength=p,w.spotLength=v,w.rectAreaLength=g,w.hemiLength=m,w.numDirectionalShadows=x,w.numPointShadows=_,w.numSpotShadows=y,w.numSpotMaps=A,w.numLightProbes=T,n.version=US++)}function l(c,u){let h=0,f=0,d=0,p=0,v=0;const g=u.matrixWorldInverse;for(let m=0,x=c.length;m<x;m++){const _=c[m];if(_.isDirectionalLight){const y=n.directional[h];y.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),h++}else if(_.isSpotLight){const y=n.spot[d];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),d++}else if(_.isRectAreaLight){const y=n.rectArea[p];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(g),o.identity(),r.copy(_.matrixWorld),r.premultiply(g),o.extractRotation(r),y.halfWidth.set(_.width*.5,0,0),y.halfHeight.set(0,_.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),p++}else if(_.isPointLight){const y=n.point[f];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(g),f++}else if(_.isHemisphereLight){const y=n.hemi[v];y.direction.setFromMatrixPosition(_.matrixWorld),y.direction.transformDirection(g),v++}}}return{setup:a,setupView:l,state:n}}function Af(s){const e=new LS(s),t=[],n=[];function i(u){c.camera=u,t.length=0,n.length=0}function r(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function FS(s){let e=new WeakMap;function t(i,r=0){const o=e.get(i);let a;return o===void 0?(a=new Af(s),e.set(i,[a])):r>=o.length?(a=new Af(s),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}class So extends un{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Ip,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Dl extends un{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const OS=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,NS=`uniform sampler2D shadow_pass;
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
}`;function BS(s,e,t){let n=new yo;const i=new pe,r=new pe,o=new dt,a=new So({depthPacking:Vu}),l=new Dl,c={},u=t.maxTextureSize,h={[Mi]:gn,[gn]:Mi,[Cn]:Cn},f=new cn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new pe},radius:{value:4}},vertexShader:OS,fragmentShader:NS}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const p=new pt;p.setAttribute("position",new Tt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Rt(p,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=bl;let m=this.type;this.render=function(b,T,w){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||b.length===0)return;const M=s.getRenderTarget(),S=s.getActiveCubeFace(),R=s.getActiveMipmapLevel(),P=s.state;P.setBlending(xi),P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);const F=m!==Hn&&this.type===Hn,U=m===Hn&&this.type!==Hn;for(let G=0,B=b.length;G<B;G++){const K=b[G],Y=K.shadow;if(Y===void 0||Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;i.copy(Y.mapSize);const le=Y.getFrameExtents();if(i.multiply(le),r.copy(Y.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(r.x=Math.floor(u/le.x),i.x=r.x*le.x,Y.mapSize.x=r.x),i.y>u&&(r.y=Math.floor(u/le.y),i.y=r.y*le.y,Y.mapSize.y=r.y)),Y.map===null||F===!0||U===!0){const Z=this.type!==Hn?{minFilter:tn,magFilter:tn}:{};Y.map!==null&&Y.map.dispose(),Y.map=new Pn(i.x,i.y,Z),Y.map.texture.name=K.name+".shadowMap",Y.camera.updateProjectionMatrix()}s.setRenderTarget(Y.map),s.clear();const J=Y.getViewportCount();for(let Z=0;Z<J;Z++){const re=Y.getViewport(Z);o.set(r.x*re.x,r.y*re.y,r.x*re.z,r.y*re.w),P.viewport(o),Y.updateMatrices(K,Z),n=Y.getFrustum(),y(T,w,Y.camera,K,this.type)}Y.isPointLightShadow!==!0&&this.type===Hn&&x(Y,w),Y.needsUpdate=!1}m=this.type,g.needsUpdate=!1,s.setRenderTarget(M,S,R)};function x(b,T){const w=e.update(v);f.defines.VSM_SAMPLES!==b.blurSamples&&(f.defines.VSM_SAMPLES=b.blurSamples,d.defines.VSM_SAMPLES=b.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new Pn(i.x,i.y)),f.uniforms.shadow_pass.value=b.map.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,s.setRenderTarget(b.mapPass),s.clear(),s.renderBufferDirect(T,null,w,f,v,null),d.uniforms.shadow_pass.value=b.mapPass.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,s.setRenderTarget(b.map),s.clear(),s.renderBufferDirect(T,null,w,d,v,null)}function _(b,T,w,M){let S=null;const R=w.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(R!==void 0)S=R;else if(S=w.isPointLight===!0?l:a,s.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const P=S.uuid,F=T.uuid;let U=c[P];U===void 0&&(U={},c[P]=U);let G=U[F];G===void 0&&(G=S.clone(),U[F]=G,T.addEventListener("dispose",A)),S=G}if(S.visible=T.visible,S.wireframe=T.wireframe,M===Hn?S.side=T.shadowSide!==null?T.shadowSide:T.side:S.side=T.shadowSide!==null?T.shadowSide:h[T.side],S.alphaMap=T.alphaMap,S.alphaTest=T.alphaTest,S.map=T.map,S.clipShadows=T.clipShadows,S.clippingPlanes=T.clippingPlanes,S.clipIntersection=T.clipIntersection,S.displacementMap=T.displacementMap,S.displacementScale=T.displacementScale,S.displacementBias=T.displacementBias,S.wireframeLinewidth=T.wireframeLinewidth,S.linewidth=T.linewidth,w.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const P=s.properties.get(S);P.light=w}return S}function y(b,T,w,M,S){if(b.visible===!1)return;if(b.layers.test(T.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&S===Hn)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(w.matrixWorldInverse,b.matrixWorld);const F=e.update(b),U=b.material;if(Array.isArray(U)){const G=F.groups;for(let B=0,K=G.length;B<K;B++){const Y=G[B],le=U[Y.materialIndex];if(le&&le.visible){const J=_(b,le,M,S);b.onBeforeShadow(s,b,T,w,F,J,Y),s.renderBufferDirect(w,null,F,J,b,Y),b.onAfterShadow(s,b,T,w,F,J,Y)}}}else if(U.visible){const G=_(b,U,M,S);b.onBeforeShadow(s,b,T,w,F,G,null),s.renderBufferDirect(w,null,F,G,b,null),b.onAfterShadow(s,b,T,w,F,G,null)}}const P=b.children;for(let F=0,U=P.length;F<U;F++)y(P[F],T,w,M,S)}function A(b){b.target.removeEventListener("dispose",A);for(const w in c){const M=c[w],S=b.target.uuid;S in M&&(M[S].dispose(),delete M[S])}}}const kS={[Ba]:ka,[za]:Ha,[Ga]:Wa,[xr]:Va,[ka]:Ba,[Ha]:za,[Wa]:Ga,[Va]:xr};function zS(s,e){function t(){let X=!1;const j=new dt;let ee=null;const _e=new dt(0,0,0,0);return{setMask:function(Pe){ee!==Pe&&!X&&(s.colorMask(Pe,Pe,Pe,Pe),ee=Pe)},setLocked:function(Pe){X=Pe},setClear:function(Pe,we,Ye,ot,Qe){Qe===!0&&(Pe*=ot,we*=ot,Ye*=ot),j.set(Pe,we,Ye,ot),_e.equals(j)===!1&&(s.clearColor(Pe,we,Ye,ot),_e.copy(j))},reset:function(){X=!1,ee=null,_e.set(-1,0,0,0)}}}function n(){let X=!1,j=!1,ee=null,_e=null,Pe=null;return{setReversed:function(we){if(j!==we){const Ye=e.get("EXT_clip_control");j?Ye.clipControlEXT(Ye.LOWER_LEFT_EXT,Ye.ZERO_TO_ONE_EXT):Ye.clipControlEXT(Ye.LOWER_LEFT_EXT,Ye.NEGATIVE_ONE_TO_ONE_EXT);const ot=Pe;Pe=null,this.setClear(ot)}j=we},getReversed:function(){return j},setTest:function(we){we?me(s.DEPTH_TEST):Te(s.DEPTH_TEST)},setMask:function(we){ee!==we&&!X&&(s.depthMask(we),ee=we)},setFunc:function(we){if(j&&(we=kS[we]),_e!==we){switch(we){case Ba:s.depthFunc(s.NEVER);break;case ka:s.depthFunc(s.ALWAYS);break;case za:s.depthFunc(s.LESS);break;case xr:s.depthFunc(s.LEQUAL);break;case Ga:s.depthFunc(s.EQUAL);break;case Va:s.depthFunc(s.GEQUAL);break;case Ha:s.depthFunc(s.GREATER);break;case Wa:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}_e=we}},setLocked:function(we){X=we},setClear:function(we){Pe!==we&&(j&&(we=1-we),s.clearDepth(we),Pe=we)},reset:function(){X=!1,ee=null,_e=null,Pe=null,j=!1}}}function i(){let X=!1,j=null,ee=null,_e=null,Pe=null,we=null,Ye=null,ot=null,Qe=null;return{setTest:function(et){X||(et?me(s.STENCIL_TEST):Te(s.STENCIL_TEST))},setMask:function(et){j!==et&&!X&&(s.stencilMask(et),j=et)},setFunc:function(et,Mt,bt){(ee!==et||_e!==Mt||Pe!==bt)&&(s.stencilFunc(et,Mt,bt),ee=et,_e=Mt,Pe=bt)},setOp:function(et,Mt,bt){(we!==et||Ye!==Mt||ot!==bt)&&(s.stencilOp(et,Mt,bt),we=et,Ye=Mt,ot=bt)},setLocked:function(et){X=et},setClear:function(et){Qe!==et&&(s.clearStencil(et),Qe=et)},reset:function(){X=!1,j=null,ee=null,_e=null,Pe=null,we=null,Ye=null,ot=null,Qe=null}}}const r=new t,o=new n,a=new i,l=new WeakMap,c=new WeakMap;let u={},h={},f=new WeakMap,d=[],p=null,v=!1,g=null,m=null,x=null,_=null,y=null,A=null,b=null,T=new We(0,0,0),w=0,M=!1,S=null,R=null,P=null,F=null,U=null;const G=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let B=!1,K=0;const Y=s.getParameter(s.VERSION);Y.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(Y)[1]),B=K>=1):Y.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),B=K>=2);let le=null,J={};const Z=s.getParameter(s.SCISSOR_BOX),re=s.getParameter(s.VIEWPORT),ne=new dt().fromArray(Z),$=new dt().fromArray(re);function se(X,j,ee,_e){const Pe=new Uint8Array(4),we=s.createTexture();s.bindTexture(X,we),s.texParameteri(X,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(X,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Ye=0;Ye<ee;Ye++)X===s.TEXTURE_3D||X===s.TEXTURE_2D_ARRAY?s.texImage3D(j,0,s.RGBA,1,1,_e,0,s.RGBA,s.UNSIGNED_BYTE,Pe):s.texImage2D(j+Ye,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Pe);return we}const fe={};fe[s.TEXTURE_2D]=se(s.TEXTURE_2D,s.TEXTURE_2D,1),fe[s.TEXTURE_CUBE_MAP]=se(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),fe[s.TEXTURE_2D_ARRAY]=se(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),fe[s.TEXTURE_3D]=se(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),me(s.DEPTH_TEST),o.setFunc(xr),ye(!1),Le(au),me(s.CULL_FACE),N(xi);function me(X){u[X]!==!0&&(s.enable(X),u[X]=!0)}function Te(X){u[X]!==!1&&(s.disable(X),u[X]=!1)}function qe(X,j){return h[X]!==j?(s.bindFramebuffer(X,j),h[X]=j,X===s.DRAW_FRAMEBUFFER&&(h[s.FRAMEBUFFER]=j),X===s.FRAMEBUFFER&&(h[s.DRAW_FRAMEBUFFER]=j),!0):!1}function Fe(X,j){let ee=d,_e=!1;if(X){ee=f.get(j),ee===void 0&&(ee=[],f.set(j,ee));const Pe=X.textures;if(ee.length!==Pe.length||ee[0]!==s.COLOR_ATTACHMENT0){for(let we=0,Ye=Pe.length;we<Ye;we++)ee[we]=s.COLOR_ATTACHMENT0+we;ee.length=Pe.length,_e=!0}}else ee[0]!==s.BACK&&(ee[0]=s.BACK,_e=!0);_e&&s.drawBuffers(ee)}function Se(X){return p!==X?(s.useProgram(X),p=X,!0):!1}const ue={[Oi]:s.FUNC_ADD,[tp]:s.FUNC_SUBTRACT,[np]:s.FUNC_REVERSE_SUBTRACT};ue[ip]=s.MIN,ue[rp]=s.MAX;const xe={[sp]:s.ZERO,[op]:s.ONE,[ap]:s.SRC_COLOR,[Oa]:s.SRC_ALPHA,[dp]:s.SRC_ALPHA_SATURATE,[hp]:s.DST_COLOR,[cp]:s.DST_ALPHA,[lp]:s.ONE_MINUS_SRC_COLOR,[Na]:s.ONE_MINUS_SRC_ALPHA,[fp]:s.ONE_MINUS_DST_COLOR,[up]:s.ONE_MINUS_DST_ALPHA,[pp]:s.CONSTANT_COLOR,[mp]:s.ONE_MINUS_CONSTANT_COLOR,[gp]:s.CONSTANT_ALPHA,[vp]:s.ONE_MINUS_CONSTANT_ALPHA};function N(X,j,ee,_e,Pe,we,Ye,ot,Qe,et){if(X===xi){v===!0&&(Te(s.BLEND),v=!1);return}if(v===!1&&(me(s.BLEND),v=!0),X!==ep){if(X!==g||et!==M){if((m!==Oi||y!==Oi)&&(s.blendEquation(s.FUNC_ADD),m=Oi,y=Oi),et)switch(X){case fr:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Fa:s.blendFunc(s.ONE,s.ONE);break;case lu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case cu:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:break}else switch(X){case fr:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Fa:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case lu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case cu:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:break}x=null,_=null,A=null,b=null,T.set(0,0,0),w=0,g=X,M=et}return}Pe=Pe||j,we=we||ee,Ye=Ye||_e,(j!==m||Pe!==y)&&(s.blendEquationSeparate(ue[j],ue[Pe]),m=j,y=Pe),(ee!==x||_e!==_||we!==A||Ye!==b)&&(s.blendFuncSeparate(xe[ee],xe[_e],xe[we],xe[Ye]),x=ee,_=_e,A=we,b=Ye),(ot.equals(T)===!1||Qe!==w)&&(s.blendColor(ot.r,ot.g,ot.b,Qe),T.copy(ot),w=Qe),g=X,M=!1}function Be(X,j){X.side===Cn?Te(s.CULL_FACE):me(s.CULL_FACE);let ee=X.side===gn;j&&(ee=!ee),ye(ee),X.blending===fr&&X.transparent===!1?N(xi):N(X.blending,X.blendEquation,X.blendSrc,X.blendDst,X.blendEquationAlpha,X.blendSrcAlpha,X.blendDstAlpha,X.blendColor,X.blendAlpha,X.premultipliedAlpha),o.setFunc(X.depthFunc),o.setTest(X.depthTest),o.setMask(X.depthWrite),r.setMask(X.colorWrite);const _e=X.stencilWrite;a.setTest(_e),_e&&(a.setMask(X.stencilWriteMask),a.setFunc(X.stencilFunc,X.stencilRef,X.stencilFuncMask),a.setOp(X.stencilFail,X.stencilZFail,X.stencilZPass)),$e(X.polygonOffset,X.polygonOffsetFactor,X.polygonOffsetUnits),X.alphaToCoverage===!0?me(s.SAMPLE_ALPHA_TO_COVERAGE):Te(s.SAMPLE_ALPHA_TO_COVERAGE)}function ye(X){S!==X&&(X?s.frontFace(s.CW):s.frontFace(s.CCW),S=X)}function Le(X){X!==Jd?(me(s.CULL_FACE),X!==R&&(X===au?s.cullFace(s.BACK):X===Kd?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Te(s.CULL_FACE),R=X}function Oe(X){X!==P&&(B&&s.lineWidth(X),P=X)}function $e(X,j,ee){X?(me(s.POLYGON_OFFSET_FILL),(F!==j||U!==ee)&&(s.polygonOffset(j,ee),F=j,U=ee)):Te(s.POLYGON_OFFSET_FILL)}function Ne(X){X?me(s.SCISSOR_TEST):Te(s.SCISSOR_TEST)}function O(X){X===void 0&&(X=s.TEXTURE0+G-1),le!==X&&(s.activeTexture(X),le=X)}function I(X,j,ee){ee===void 0&&(le===null?ee=s.TEXTURE0+G-1:ee=le);let _e=J[ee];_e===void 0&&(_e={type:void 0,texture:void 0},J[ee]=_e),(_e.type!==X||_e.texture!==j)&&(le!==ee&&(s.activeTexture(ee),le=ee),s.bindTexture(X,j||fe[X]),_e.type=X,_e.texture=j)}function Q(){const X=J[le];X!==void 0&&X.type!==void 0&&(s.bindTexture(X.type,null),X.type=void 0,X.texture=void 0)}function he(){try{s.compressedTexImage2D.apply(s,arguments)}catch{}}function ve(){try{s.compressedTexImage3D.apply(s,arguments)}catch{}}function ge(){try{s.texSubImage2D.apply(s,arguments)}catch{}}function Ee(){try{s.texSubImage3D.apply(s,arguments)}catch{}}function Re(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch{}}function Ie(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch{}}function Je(){try{s.texStorage2D.apply(s,arguments)}catch{}}function be(){try{s.texStorage3D.apply(s,arguments)}catch{}}function Ge(){try{s.texImage2D.apply(s,arguments)}catch{}}function ke(){try{s.texImage3D.apply(s,arguments)}catch{}}function Xe(X){ne.equals(X)===!1&&(s.scissor(X.x,X.y,X.z,X.w),ne.copy(X))}function Ce(X){$.equals(X)===!1&&(s.viewport(X.x,X.y,X.z,X.w),$.copy(X))}function H(X,j){let ee=c.get(j);ee===void 0&&(ee=new WeakMap,c.set(j,ee));let _e=ee.get(X);_e===void 0&&(_e=s.getUniformBlockIndex(j,X.name),ee.set(X,_e))}function ae(X,j){const _e=c.get(j).get(X);l.get(j)!==_e&&(s.uniformBlockBinding(j,_e,X.__bindingPointIndex),l.set(j,_e))}function Ae(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),u={},le=null,J={},h={},f=new WeakMap,d=[],p=null,v=!1,g=null,m=null,x=null,_=null,y=null,A=null,b=null,T=new We(0,0,0),w=0,M=!1,S=null,R=null,P=null,F=null,U=null,ne.set(0,0,s.canvas.width,s.canvas.height),$.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:me,disable:Te,bindFramebuffer:qe,drawBuffers:Fe,useProgram:Se,setBlending:N,setMaterial:Be,setFlipSided:ye,setCullFace:Le,setLineWidth:Oe,setPolygonOffset:$e,setScissorTest:Ne,activeTexture:O,bindTexture:I,unbindTexture:Q,compressedTexImage2D:he,compressedTexImage3D:ve,texImage2D:Ge,texImage3D:ke,updateUBOMapping:H,uniformBlockBinding:ae,texStorage2D:Je,texStorage3D:be,texSubImage2D:ge,texSubImage3D:Ee,compressedTexSubImage2D:Re,compressedTexSubImage3D:Ie,scissor:Xe,viewport:Ce,reset:Ae}}function GS(s,e){const t=s.image&&s.image.width?s.image.width/s.image.height:1;return t>e?(s.repeat.x=1,s.repeat.y=t/e,s.offset.x=0,s.offset.y=(1-s.repeat.y)/2):(s.repeat.x=e/t,s.repeat.y=1,s.offset.x=(1-s.repeat.x)/2,s.offset.y=0),s}function VS(s,e){const t=s.image&&s.image.width?s.image.width/s.image.height:1;return t>e?(s.repeat.x=e/t,s.repeat.y=1,s.offset.x=(1-s.repeat.x)/2,s.offset.y=0):(s.repeat.x=1,s.repeat.y=t/e,s.offset.x=0,s.offset.y=(1-s.repeat.y)/2),s}function HS(s){return s.repeat.x=1,s.repeat.y=1,s.offset.x=0,s.offset.y=0,s}function mu(s,e,t,n){const i=WS(n);switch(t){case Fu:return s*e;case Nu:return s*e;case Bu:return s*e*2;case mo:return s*e/i.components*i.byteLength;case go:return s*e/i.components*i.byteLength;case ku:return s*e*2/i.components*i.byteLength;case Cl:return s*e*2/i.components*i.byteLength;case Ou:return s*e*3/i.components*i.byteLength;case en:return s*e*4/i.components*i.byteLength;case Rl:return s*e*4/i.components*i.byteLength;case Bs:case ks:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case zs:case Gs:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case qa:case Za:return Math.max(s,16)*Math.max(e,8)/4;case Xa:case Ya:return Math.max(s,8)*Math.max(e,8)/2;case $a:case ja:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Ja:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Ka:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Qa:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case el:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case tl:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case nl:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case il:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case rl:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case sl:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case ol:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case al:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case ll:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case cl:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case ul:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case hl:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case Vs:case fl:case dl:return Math.ceil(s/4)*Math.ceil(e/4)*16;case zu:case pl:return Math.ceil(s/4)*Math.ceil(e/4)*8;case ml:case gl:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function WS(s){switch(s){case Xn:case Uu:return{byteLength:1,components:1};case ls:case Du:case mn:return{byteLength:2,components:1};case Tl:case Al:return{byteLength:2,components:4};case bi:case El:case Wt:return{byteLength:4,components:1};case Lu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}const XS={contain:GS,cover:VS,fill:HS,getByteLength:mu};function qS(s,e,t,n,i,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new pe,u=new WeakMap;let h;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(O,I){return d?new OffscreenCanvas(O,I):eo("canvas")}function v(O,I,Q){let he=1;const ve=Ne(O);if((ve.width>Q||ve.height>Q)&&(he=Q/Math.max(ve.width,ve.height)),he<1)if(typeof HTMLImageElement<"u"&&O instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&O instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&O instanceof ImageBitmap||typeof VideoFrame<"u"&&O instanceof VideoFrame){const ge=Math.floor(he*ve.width),Ee=Math.floor(he*ve.height);h===void 0&&(h=p(ge,Ee));const Re=I?p(ge,Ee):h;return Re.width=ge,Re.height=Ee,Re.getContext("2d").drawImage(O,0,0,ge,Ee),Re}else return"data"in O,O;return O}function g(O){return O.generateMipmaps}function m(O){s.generateMipmap(O)}function x(O){return O.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:O.isWebGL3DRenderTarget?s.TEXTURE_3D:O.isWebGLArrayRenderTarget||O.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function _(O,I,Q,he,ve=!1){if(O!==null&&s[O]!==void 0)return s[O];let ge=I;if(I===s.RED&&(Q===s.FLOAT&&(ge=s.R32F),Q===s.HALF_FLOAT&&(ge=s.R16F),Q===s.UNSIGNED_BYTE&&(ge=s.R8)),I===s.RED_INTEGER&&(Q===s.UNSIGNED_BYTE&&(ge=s.R8UI),Q===s.UNSIGNED_SHORT&&(ge=s.R16UI),Q===s.UNSIGNED_INT&&(ge=s.R32UI),Q===s.BYTE&&(ge=s.R8I),Q===s.SHORT&&(ge=s.R16I),Q===s.INT&&(ge=s.R32I)),I===s.RG&&(Q===s.FLOAT&&(ge=s.RG32F),Q===s.HALF_FLOAT&&(ge=s.RG16F),Q===s.UNSIGNED_BYTE&&(ge=s.RG8)),I===s.RG_INTEGER&&(Q===s.UNSIGNED_BYTE&&(ge=s.RG8UI),Q===s.UNSIGNED_SHORT&&(ge=s.RG16UI),Q===s.UNSIGNED_INT&&(ge=s.RG32UI),Q===s.BYTE&&(ge=s.RG8I),Q===s.SHORT&&(ge=s.RG16I),Q===s.INT&&(ge=s.RG32I)),I===s.RGB_INTEGER&&(Q===s.UNSIGNED_BYTE&&(ge=s.RGB8UI),Q===s.UNSIGNED_SHORT&&(ge=s.RGB16UI),Q===s.UNSIGNED_INT&&(ge=s.RGB32UI),Q===s.BYTE&&(ge=s.RGB8I),Q===s.SHORT&&(ge=s.RGB16I),Q===s.INT&&(ge=s.RGB32I)),I===s.RGBA_INTEGER&&(Q===s.UNSIGNED_BYTE&&(ge=s.RGBA8UI),Q===s.UNSIGNED_SHORT&&(ge=s.RGBA16UI),Q===s.UNSIGNED_INT&&(ge=s.RGBA32UI),Q===s.BYTE&&(ge=s.RGBA8I),Q===s.SHORT&&(ge=s.RGBA16I),Q===s.INT&&(ge=s.RGBA32I)),I===s.RGB&&Q===s.UNSIGNED_INT_5_9_9_9_REV&&(ge=s.RGB9_E5),I===s.RGBA){const Ee=ve?vo:_t.getTransfer(he);Q===s.FLOAT&&(ge=s.RGBA32F),Q===s.HALF_FLOAT&&(ge=s.RGBA16F),Q===s.UNSIGNED_BYTE&&(ge=Ee===Et?s.SRGB8_ALPHA8:s.RGBA8),Q===s.UNSIGNED_SHORT_4_4_4_4&&(ge=s.RGBA4),Q===s.UNSIGNED_SHORT_5_5_5_1&&(ge=s.RGB5_A1)}return(ge===s.R16F||ge===s.R32F||ge===s.RG16F||ge===s.RG32F||ge===s.RGBA16F||ge===s.RGBA32F)&&e.get("EXT_color_buffer_float"),ge}function y(O,I){let Q;return O?I===null||I===bi||I===yr?Q=s.DEPTH24_STENCIL8:I===Wt?Q=s.DEPTH32F_STENCIL8:I===ls&&(Q=s.DEPTH24_STENCIL8):I===null||I===bi||I===yr?Q=s.DEPTH_COMPONENT24:I===Wt?Q=s.DEPTH_COMPONENT32F:I===ls&&(Q=s.DEPTH_COMPONENT16),Q}function A(O,I){return g(O)===!0||O.isFramebufferTexture&&O.minFilter!==tn&&O.minFilter!==Ut?Math.log2(Math.max(I.width,I.height))+1:O.mipmaps!==void 0&&O.mipmaps.length>0?O.mipmaps.length:O.isCompressedTexture&&Array.isArray(O.image)?I.mipmaps.length:1}function b(O){const I=O.target;I.removeEventListener("dispose",b),w(I),I.isVideoTexture&&u.delete(I)}function T(O){const I=O.target;I.removeEventListener("dispose",T),S(I)}function w(O){const I=n.get(O);if(I.__webglInit===void 0)return;const Q=O.source,he=f.get(Q);if(he){const ve=he[I.__cacheKey];ve.usedTimes--,ve.usedTimes===0&&M(O),Object.keys(he).length===0&&f.delete(Q)}n.remove(O)}function M(O){const I=n.get(O);s.deleteTexture(I.__webglTexture);const Q=O.source,he=f.get(Q);delete he[I.__cacheKey],o.memory.textures--}function S(O){const I=n.get(O);if(O.depthTexture&&(O.depthTexture.dispose(),n.remove(O.depthTexture)),O.isWebGLCubeRenderTarget)for(let he=0;he<6;he++){if(Array.isArray(I.__webglFramebuffer[he]))for(let ve=0;ve<I.__webglFramebuffer[he].length;ve++)s.deleteFramebuffer(I.__webglFramebuffer[he][ve]);else s.deleteFramebuffer(I.__webglFramebuffer[he]);I.__webglDepthbuffer&&s.deleteRenderbuffer(I.__webglDepthbuffer[he])}else{if(Array.isArray(I.__webglFramebuffer))for(let he=0;he<I.__webglFramebuffer.length;he++)s.deleteFramebuffer(I.__webglFramebuffer[he]);else s.deleteFramebuffer(I.__webglFramebuffer);if(I.__webglDepthbuffer&&s.deleteRenderbuffer(I.__webglDepthbuffer),I.__webglMultisampledFramebuffer&&s.deleteFramebuffer(I.__webglMultisampledFramebuffer),I.__webglColorRenderbuffer)for(let he=0;he<I.__webglColorRenderbuffer.length;he++)I.__webglColorRenderbuffer[he]&&s.deleteRenderbuffer(I.__webglColorRenderbuffer[he]);I.__webglDepthRenderbuffer&&s.deleteRenderbuffer(I.__webglDepthRenderbuffer)}const Q=O.textures;for(let he=0,ve=Q.length;he<ve;he++){const ge=n.get(Q[he]);ge.__webglTexture&&(s.deleteTexture(ge.__webglTexture),o.memory.textures--),n.remove(Q[he])}n.remove(O)}let R=0;function P(){R=0}function F(){const O=R;return O>=i.maxTextures,R+=1,O}function U(O){const I=[];return I.push(O.wrapS),I.push(O.wrapT),I.push(O.wrapR||0),I.push(O.magFilter),I.push(O.minFilter),I.push(O.anisotropy),I.push(O.internalFormat),I.push(O.format),I.push(O.type),I.push(O.generateMipmaps),I.push(O.premultiplyAlpha),I.push(O.flipY),I.push(O.unpackAlignment),I.push(O.colorSpace),I.join()}function G(O,I){const Q=n.get(O);if(O.isVideoTexture&&Oe(O),O.isRenderTargetTexture===!1&&O.version>0&&Q.__version!==O.version){const he=O.image;if(he!==null){if(he.complete!==!1){$(Q,O,I);return}}}t.bindTexture(s.TEXTURE_2D,Q.__webglTexture,s.TEXTURE0+I)}function B(O,I){const Q=n.get(O);if(O.version>0&&Q.__version!==O.version){$(Q,O,I);return}t.bindTexture(s.TEXTURE_2D_ARRAY,Q.__webglTexture,s.TEXTURE0+I)}function K(O,I){const Q=n.get(O);if(O.version>0&&Q.__version!==O.version){$(Q,O,I);return}t.bindTexture(s.TEXTURE_3D,Q.__webglTexture,s.TEXTURE0+I)}function Y(O,I){const Q=n.get(O);if(O.version>0&&Q.__version!==O.version){se(Q,O,I);return}t.bindTexture(s.TEXTURE_CUBE_MAP,Q.__webglTexture,s.TEXTURE0+I)}const le={[Zs]:s.REPEAT,[Nn]:s.CLAMP_TO_EDGE,[$s]:s.MIRRORED_REPEAT},J={[tn]:s.NEAREST,[Pu]:s.NEAREST_MIPMAP_NEAREST,[Qr]:s.NEAREST_MIPMAP_LINEAR,[Ut]:s.LINEAR,[Ns]:s.LINEAR_MIPMAP_NEAREST,[Qn]:s.LINEAR_MIPMAP_LINEAR},Z={[Up]:s.NEVER,[Bp]:s.ALWAYS,[Dp]:s.LESS,[Hu]:s.LEQUAL,[Lp]:s.EQUAL,[Np]:s.GEQUAL,[Fp]:s.GREATER,[Op]:s.NOTEQUAL};function re(O,I){if(I.type===Wt&&e.has("OES_texture_float_linear")===!1&&(I.magFilter===Ut||I.magFilter===Ns||I.magFilter===Qr||I.magFilter===Qn||I.minFilter===Ut||I.minFilter===Ns||I.minFilter===Qr||I.minFilter),s.texParameteri(O,s.TEXTURE_WRAP_S,le[I.wrapS]),s.texParameteri(O,s.TEXTURE_WRAP_T,le[I.wrapT]),(O===s.TEXTURE_3D||O===s.TEXTURE_2D_ARRAY)&&s.texParameteri(O,s.TEXTURE_WRAP_R,le[I.wrapR]),s.texParameteri(O,s.TEXTURE_MAG_FILTER,J[I.magFilter]),s.texParameteri(O,s.TEXTURE_MIN_FILTER,J[I.minFilter]),I.compareFunction&&(s.texParameteri(O,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(O,s.TEXTURE_COMPARE_FUNC,Z[I.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(I.magFilter===tn||I.minFilter!==Qr&&I.minFilter!==Qn||I.type===Wt&&e.has("OES_texture_float_linear")===!1)return;if(I.anisotropy>1||n.get(I).__currentAnisotropy){const Q=e.get("EXT_texture_filter_anisotropic");s.texParameterf(O,Q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(I.anisotropy,i.getMaxAnisotropy())),n.get(I).__currentAnisotropy=I.anisotropy}}}function ne(O,I){let Q=!1;O.__webglInit===void 0&&(O.__webglInit=!0,I.addEventListener("dispose",b));const he=I.source;let ve=f.get(he);ve===void 0&&(ve={},f.set(he,ve));const ge=U(I);if(ge!==O.__cacheKey){ve[ge]===void 0&&(ve[ge]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,Q=!0),ve[ge].usedTimes++;const Ee=ve[O.__cacheKey];Ee!==void 0&&(ve[O.__cacheKey].usedTimes--,Ee.usedTimes===0&&M(I)),O.__cacheKey=ge,O.__webglTexture=ve[ge].texture}return Q}function $(O,I,Q){let he=s.TEXTURE_2D;(I.isDataArrayTexture||I.isCompressedArrayTexture)&&(he=s.TEXTURE_2D_ARRAY),I.isData3DTexture&&(he=s.TEXTURE_3D);const ve=ne(O,I),ge=I.source;t.bindTexture(he,O.__webglTexture,s.TEXTURE0+Q);const Ee=n.get(ge);if(ge.version!==Ee.__version||ve===!0){t.activeTexture(s.TEXTURE0+Q);const Re=_t.getPrimaries(_t.workingColorSpace),Ie=I.colorSpace===gi?null:_t.getPrimaries(I.colorSpace),Je=I.colorSpace===gi||Re===Ie?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,I.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,I.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Je);let be=v(I.image,!1,i.maxTextureSize);be=$e(I,be);const Ge=r.convert(I.format,I.colorSpace),ke=r.convert(I.type);let Xe=_(I.internalFormat,Ge,ke,I.colorSpace,I.isVideoTexture);re(he,I);let Ce;const H=I.mipmaps,ae=I.isVideoTexture!==!0,Ae=Ee.__version===void 0||ve===!0,X=ge.dataReady,j=A(I,be);if(I.isDepthTexture)Xe=y(I.format===Sr,I.type),Ae&&(ae?t.texStorage2D(s.TEXTURE_2D,1,Xe,be.width,be.height):t.texImage2D(s.TEXTURE_2D,0,Xe,be.width,be.height,0,Ge,ke,null));else if(I.isDataTexture)if(H.length>0){ae&&Ae&&t.texStorage2D(s.TEXTURE_2D,j,Xe,H[0].width,H[0].height);for(let ee=0,_e=H.length;ee<_e;ee++)Ce=H[ee],ae?X&&t.texSubImage2D(s.TEXTURE_2D,ee,0,0,Ce.width,Ce.height,Ge,ke,Ce.data):t.texImage2D(s.TEXTURE_2D,ee,Xe,Ce.width,Ce.height,0,Ge,ke,Ce.data);I.generateMipmaps=!1}else ae?(Ae&&t.texStorage2D(s.TEXTURE_2D,j,Xe,be.width,be.height),X&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,be.width,be.height,Ge,ke,be.data)):t.texImage2D(s.TEXTURE_2D,0,Xe,be.width,be.height,0,Ge,ke,be.data);else if(I.isCompressedTexture)if(I.isCompressedArrayTexture){ae&&Ae&&t.texStorage3D(s.TEXTURE_2D_ARRAY,j,Xe,H[0].width,H[0].height,be.depth);for(let ee=0,_e=H.length;ee<_e;ee++)if(Ce=H[ee],I.format!==en){if(Ge!==null)if(ae){if(X)if(I.layerUpdates.size>0){const Pe=mu(Ce.width,Ce.height,I.format,I.type);for(const we of I.layerUpdates){const Ye=Ce.data.subarray(we*Pe/Ce.data.BYTES_PER_ELEMENT,(we+1)*Pe/Ce.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ee,0,0,we,Ce.width,Ce.height,1,Ge,Ye)}I.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ee,0,0,0,Ce.width,Ce.height,be.depth,Ge,Ce.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,ee,Xe,Ce.width,Ce.height,be.depth,0,Ce.data,0,0)}else ae?X&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,ee,0,0,0,Ce.width,Ce.height,be.depth,Ge,ke,Ce.data):t.texImage3D(s.TEXTURE_2D_ARRAY,ee,Xe,Ce.width,Ce.height,be.depth,0,Ge,ke,Ce.data)}else{ae&&Ae&&t.texStorage2D(s.TEXTURE_2D,j,Xe,H[0].width,H[0].height);for(let ee=0,_e=H.length;ee<_e;ee++)Ce=H[ee],I.format!==en?Ge!==null&&(ae?X&&t.compressedTexSubImage2D(s.TEXTURE_2D,ee,0,0,Ce.width,Ce.height,Ge,Ce.data):t.compressedTexImage2D(s.TEXTURE_2D,ee,Xe,Ce.width,Ce.height,0,Ce.data)):ae?X&&t.texSubImage2D(s.TEXTURE_2D,ee,0,0,Ce.width,Ce.height,Ge,ke,Ce.data):t.texImage2D(s.TEXTURE_2D,ee,Xe,Ce.width,Ce.height,0,Ge,ke,Ce.data)}else if(I.isDataArrayTexture)if(ae){if(Ae&&t.texStorage3D(s.TEXTURE_2D_ARRAY,j,Xe,be.width,be.height,be.depth),X)if(I.layerUpdates.size>0){const ee=mu(be.width,be.height,I.format,I.type);for(const _e of I.layerUpdates){const Pe=be.data.subarray(_e*ee/be.data.BYTES_PER_ELEMENT,(_e+1)*ee/be.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,_e,be.width,be.height,1,Ge,ke,Pe)}I.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,be.width,be.height,be.depth,Ge,ke,be.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,Xe,be.width,be.height,be.depth,0,Ge,ke,be.data);else if(I.isData3DTexture)ae?(Ae&&t.texStorage3D(s.TEXTURE_3D,j,Xe,be.width,be.height,be.depth),X&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,be.width,be.height,be.depth,Ge,ke,be.data)):t.texImage3D(s.TEXTURE_3D,0,Xe,be.width,be.height,be.depth,0,Ge,ke,be.data);else if(I.isFramebufferTexture){if(Ae)if(ae)t.texStorage2D(s.TEXTURE_2D,j,Xe,be.width,be.height);else{let ee=be.width,_e=be.height;for(let Pe=0;Pe<j;Pe++)t.texImage2D(s.TEXTURE_2D,Pe,Xe,ee,_e,0,Ge,ke,null),ee>>=1,_e>>=1}}else if(H.length>0){if(ae&&Ae){const ee=Ne(H[0]);t.texStorage2D(s.TEXTURE_2D,j,Xe,ee.width,ee.height)}for(let ee=0,_e=H.length;ee<_e;ee++)Ce=H[ee],ae?X&&t.texSubImage2D(s.TEXTURE_2D,ee,0,0,Ge,ke,Ce):t.texImage2D(s.TEXTURE_2D,ee,Xe,Ge,ke,Ce);I.generateMipmaps=!1}else if(ae){if(Ae){const ee=Ne(be);t.texStorage2D(s.TEXTURE_2D,j,Xe,ee.width,ee.height)}X&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,Ge,ke,be)}else t.texImage2D(s.TEXTURE_2D,0,Xe,Ge,ke,be);g(I)&&m(he),Ee.__version=ge.version,I.onUpdate&&I.onUpdate(I)}O.__version=I.version}function se(O,I,Q){if(I.image.length!==6)return;const he=ne(O,I),ve=I.source;t.bindTexture(s.TEXTURE_CUBE_MAP,O.__webglTexture,s.TEXTURE0+Q);const ge=n.get(ve);if(ve.version!==ge.__version||he===!0){t.activeTexture(s.TEXTURE0+Q);const Ee=_t.getPrimaries(_t.workingColorSpace),Re=I.colorSpace===gi?null:_t.getPrimaries(I.colorSpace),Ie=I.colorSpace===gi||Ee===Re?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,I.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,I.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ie);const Je=I.isCompressedTexture||I.image[0].isCompressedTexture,be=I.image[0]&&I.image[0].isDataTexture,Ge=[];for(let _e=0;_e<6;_e++)!Je&&!be?Ge[_e]=v(I.image[_e],!0,i.maxCubemapSize):Ge[_e]=be?I.image[_e].image:I.image[_e],Ge[_e]=$e(I,Ge[_e]);const ke=Ge[0],Xe=r.convert(I.format,I.colorSpace),Ce=r.convert(I.type),H=_(I.internalFormat,Xe,Ce,I.colorSpace),ae=I.isVideoTexture!==!0,Ae=ge.__version===void 0||he===!0,X=ve.dataReady;let j=A(I,ke);re(s.TEXTURE_CUBE_MAP,I);let ee;if(Je){ae&&Ae&&t.texStorage2D(s.TEXTURE_CUBE_MAP,j,H,ke.width,ke.height);for(let _e=0;_e<6;_e++){ee=Ge[_e].mipmaps;for(let Pe=0;Pe<ee.length;Pe++){const we=ee[Pe];I.format!==en?Xe!==null&&(ae?X&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Pe,0,0,we.width,we.height,Xe,we.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Pe,H,we.width,we.height,0,we.data)):ae?X&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Pe,0,0,we.width,we.height,Xe,Ce,we.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Pe,H,we.width,we.height,0,Xe,Ce,we.data)}}}else{if(ee=I.mipmaps,ae&&Ae){ee.length>0&&j++;const _e=Ne(Ge[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,j,H,_e.width,_e.height)}for(let _e=0;_e<6;_e++)if(be){ae?X&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,0,0,Ge[_e].width,Ge[_e].height,Xe,Ce,Ge[_e].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,H,Ge[_e].width,Ge[_e].height,0,Xe,Ce,Ge[_e].data);for(let Pe=0;Pe<ee.length;Pe++){const Ye=ee[Pe].image[_e].image;ae?X&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Pe+1,0,0,Ye.width,Ye.height,Xe,Ce,Ye.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Pe+1,H,Ye.width,Ye.height,0,Xe,Ce,Ye.data)}}else{ae?X&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,0,0,Xe,Ce,Ge[_e]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,H,Xe,Ce,Ge[_e]);for(let Pe=0;Pe<ee.length;Pe++){const we=ee[Pe];ae?X&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Pe+1,0,0,Xe,Ce,we.image[_e]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Pe+1,H,Xe,Ce,we.image[_e])}}}g(I)&&m(s.TEXTURE_CUBE_MAP),ge.__version=ve.version,I.onUpdate&&I.onUpdate(I)}O.__version=I.version}function fe(O,I,Q,he,ve,ge){const Ee=r.convert(Q.format,Q.colorSpace),Re=r.convert(Q.type),Ie=_(Q.internalFormat,Ee,Re,Q.colorSpace),Je=n.get(I),be=n.get(Q);if(be.__renderTarget=I,!Je.__hasExternalTextures){const Ge=Math.max(1,I.width>>ge),ke=Math.max(1,I.height>>ge);ve===s.TEXTURE_3D||ve===s.TEXTURE_2D_ARRAY?t.texImage3D(ve,ge,Ie,Ge,ke,I.depth,0,Ee,Re,null):t.texImage2D(ve,ge,Ie,Ge,ke,0,Ee,Re,null)}t.bindFramebuffer(s.FRAMEBUFFER,O),Le(I)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,he,ve,be.__webglTexture,0,ye(I)):(ve===s.TEXTURE_2D||ve>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&ve<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,he,ve,be.__webglTexture,ge),t.bindFramebuffer(s.FRAMEBUFFER,null)}function me(O,I,Q){if(s.bindRenderbuffer(s.RENDERBUFFER,O),I.depthBuffer){const he=I.depthTexture,ve=he&&he.isDepthTexture?he.type:null,ge=y(I.stencilBuffer,ve),Ee=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Re=ye(I);Le(I)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Re,ge,I.width,I.height):Q?s.renderbufferStorageMultisample(s.RENDERBUFFER,Re,ge,I.width,I.height):s.renderbufferStorage(s.RENDERBUFFER,ge,I.width,I.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Ee,s.RENDERBUFFER,O)}else{const he=I.textures;for(let ve=0;ve<he.length;ve++){const ge=he[ve],Ee=r.convert(ge.format,ge.colorSpace),Re=r.convert(ge.type),Ie=_(ge.internalFormat,Ee,Re,ge.colorSpace),Je=ye(I);Q&&Le(I)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Je,Ie,I.width,I.height):Le(I)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Je,Ie,I.width,I.height):s.renderbufferStorage(s.RENDERBUFFER,Ie,I.width,I.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Te(O,I){if(I&&I.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,O),!(I.depthTexture&&I.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const he=n.get(I.depthTexture);he.__renderTarget=I,(!he.__webglTexture||I.depthTexture.image.width!==I.width||I.depthTexture.image.height!==I.height)&&(I.depthTexture.image.width=I.width,I.depthTexture.image.height=I.height,I.depthTexture.needsUpdate=!0),G(I.depthTexture,0);const ve=he.__webglTexture,ge=ye(I);if(I.depthTexture.format===dr)Le(I)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ve,0,ge):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ve,0);else if(I.depthTexture.format===Sr)Le(I)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ve,0,ge):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ve,0);else throw new Error("Unknown depthTexture format")}function qe(O){const I=n.get(O),Q=O.isWebGLCubeRenderTarget===!0;if(I.__boundDepthTexture!==O.depthTexture){const he=O.depthTexture;if(I.__depthDisposeCallback&&I.__depthDisposeCallback(),he){const ve=()=>{delete I.__boundDepthTexture,delete I.__depthDisposeCallback,he.removeEventListener("dispose",ve)};he.addEventListener("dispose",ve),I.__depthDisposeCallback=ve}I.__boundDepthTexture=he}if(O.depthTexture&&!I.__autoAllocateDepthBuffer){if(Q)throw new Error("target.depthTexture not supported in Cube render targets");Te(I.__webglFramebuffer,O)}else if(Q){I.__webglDepthbuffer=[];for(let he=0;he<6;he++)if(t.bindFramebuffer(s.FRAMEBUFFER,I.__webglFramebuffer[he]),I.__webglDepthbuffer[he]===void 0)I.__webglDepthbuffer[he]=s.createRenderbuffer(),me(I.__webglDepthbuffer[he],O,!1);else{const ve=O.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ge=I.__webglDepthbuffer[he];s.bindRenderbuffer(s.RENDERBUFFER,ge),s.framebufferRenderbuffer(s.FRAMEBUFFER,ve,s.RENDERBUFFER,ge)}}else if(t.bindFramebuffer(s.FRAMEBUFFER,I.__webglFramebuffer),I.__webglDepthbuffer===void 0)I.__webglDepthbuffer=s.createRenderbuffer(),me(I.__webglDepthbuffer,O,!1);else{const he=O.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ve=I.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,ve),s.framebufferRenderbuffer(s.FRAMEBUFFER,he,s.RENDERBUFFER,ve)}t.bindFramebuffer(s.FRAMEBUFFER,null)}function Fe(O,I,Q){const he=n.get(O);I!==void 0&&fe(he.__webglFramebuffer,O,O.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),Q!==void 0&&qe(O)}function Se(O){const I=O.texture,Q=n.get(O),he=n.get(I);O.addEventListener("dispose",T);const ve=O.textures,ge=O.isWebGLCubeRenderTarget===!0,Ee=ve.length>1;if(Ee||(he.__webglTexture===void 0&&(he.__webglTexture=s.createTexture()),he.__version=I.version,o.memory.textures++),ge){Q.__webglFramebuffer=[];for(let Re=0;Re<6;Re++)if(I.mipmaps&&I.mipmaps.length>0){Q.__webglFramebuffer[Re]=[];for(let Ie=0;Ie<I.mipmaps.length;Ie++)Q.__webglFramebuffer[Re][Ie]=s.createFramebuffer()}else Q.__webglFramebuffer[Re]=s.createFramebuffer()}else{if(I.mipmaps&&I.mipmaps.length>0){Q.__webglFramebuffer=[];for(let Re=0;Re<I.mipmaps.length;Re++)Q.__webglFramebuffer[Re]=s.createFramebuffer()}else Q.__webglFramebuffer=s.createFramebuffer();if(Ee)for(let Re=0,Ie=ve.length;Re<Ie;Re++){const Je=n.get(ve[Re]);Je.__webglTexture===void 0&&(Je.__webglTexture=s.createTexture(),o.memory.textures++)}if(O.samples>0&&Le(O)===!1){Q.__webglMultisampledFramebuffer=s.createFramebuffer(),Q.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,Q.__webglMultisampledFramebuffer);for(let Re=0;Re<ve.length;Re++){const Ie=ve[Re];Q.__webglColorRenderbuffer[Re]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,Q.__webglColorRenderbuffer[Re]);const Je=r.convert(Ie.format,Ie.colorSpace),be=r.convert(Ie.type),Ge=_(Ie.internalFormat,Je,be,Ie.colorSpace,O.isXRRenderTarget===!0),ke=ye(O);s.renderbufferStorageMultisample(s.RENDERBUFFER,ke,Ge,O.width,O.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Re,s.RENDERBUFFER,Q.__webglColorRenderbuffer[Re])}s.bindRenderbuffer(s.RENDERBUFFER,null),O.depthBuffer&&(Q.__webglDepthRenderbuffer=s.createRenderbuffer(),me(Q.__webglDepthRenderbuffer,O,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ge){t.bindTexture(s.TEXTURE_CUBE_MAP,he.__webglTexture),re(s.TEXTURE_CUBE_MAP,I);for(let Re=0;Re<6;Re++)if(I.mipmaps&&I.mipmaps.length>0)for(let Ie=0;Ie<I.mipmaps.length;Ie++)fe(Q.__webglFramebuffer[Re][Ie],O,I,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Re,Ie);else fe(Q.__webglFramebuffer[Re],O,I,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0);g(I)&&m(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ee){for(let Re=0,Ie=ve.length;Re<Ie;Re++){const Je=ve[Re],be=n.get(Je);t.bindTexture(s.TEXTURE_2D,be.__webglTexture),re(s.TEXTURE_2D,Je),fe(Q.__webglFramebuffer,O,Je,s.COLOR_ATTACHMENT0+Re,s.TEXTURE_2D,0),g(Je)&&m(s.TEXTURE_2D)}t.unbindTexture()}else{let Re=s.TEXTURE_2D;if((O.isWebGL3DRenderTarget||O.isWebGLArrayRenderTarget)&&(Re=O.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(Re,he.__webglTexture),re(Re,I),I.mipmaps&&I.mipmaps.length>0)for(let Ie=0;Ie<I.mipmaps.length;Ie++)fe(Q.__webglFramebuffer[Ie],O,I,s.COLOR_ATTACHMENT0,Re,Ie);else fe(Q.__webglFramebuffer,O,I,s.COLOR_ATTACHMENT0,Re,0);g(I)&&m(Re),t.unbindTexture()}O.depthBuffer&&qe(O)}function ue(O){const I=O.textures;for(let Q=0,he=I.length;Q<he;Q++){const ve=I[Q];if(g(ve)){const ge=x(O),Ee=n.get(ve).__webglTexture;t.bindTexture(ge,Ee),m(ge),t.unbindTexture()}}}const xe=[],N=[];function Be(O){if(O.samples>0){if(Le(O)===!1){const I=O.textures,Q=O.width,he=O.height;let ve=s.COLOR_BUFFER_BIT;const ge=O.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ee=n.get(O),Re=I.length>1;if(Re)for(let Ie=0;Ie<I.length;Ie++)t.bindFramebuffer(s.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ie,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Ee.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ie,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer);for(let Ie=0;Ie<I.length;Ie++){if(O.resolveDepthBuffer&&(O.depthBuffer&&(ve|=s.DEPTH_BUFFER_BIT),O.stencilBuffer&&O.resolveStencilBuffer&&(ve|=s.STENCIL_BUFFER_BIT)),Re){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Ee.__webglColorRenderbuffer[Ie]);const Je=n.get(I[Ie]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Je,0)}s.blitFramebuffer(0,0,Q,he,0,0,Q,he,ve,s.NEAREST),l===!0&&(xe.length=0,N.length=0,xe.push(s.COLOR_ATTACHMENT0+Ie),O.depthBuffer&&O.resolveDepthBuffer===!1&&(xe.push(ge),N.push(ge),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,N)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,xe))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Re)for(let Ie=0;Ie<I.length;Ie++){t.bindFramebuffer(s.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ie,s.RENDERBUFFER,Ee.__webglColorRenderbuffer[Ie]);const Je=n.get(I[Ie]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Ee.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ie,s.TEXTURE_2D,Je,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer)}else if(O.depthBuffer&&O.resolveDepthBuffer===!1&&l){const I=O.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[I])}}}function ye(O){return Math.min(i.maxSamples,O.samples)}function Le(O){const I=n.get(O);return O.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&I.__useRenderToTexture!==!1}function Oe(O){const I=o.render.frame;u.get(O)!==I&&(u.set(O,I),O.update())}function $e(O,I){const Q=O.colorSpace,he=O.format,ve=O.type;return O.isCompressedTexture===!0||O.isVideoTexture===!0||Q!==wr&&Q!==gi&&_t.getTransfer(Q),I}function Ne(O){return typeof HTMLImageElement<"u"&&O instanceof HTMLImageElement?(c.width=O.naturalWidth||O.width,c.height=O.naturalHeight||O.height):typeof VideoFrame<"u"&&O instanceof VideoFrame?(c.width=O.displayWidth,c.height=O.displayHeight):(c.width=O.width,c.height=O.height),c}this.allocateTextureUnit=F,this.resetTextureUnits=P,this.setTexture2D=G,this.setTexture2DArray=B,this.setTexture3D=K,this.setTextureCube=Y,this.rebindTextures=Fe,this.setupRenderTarget=Se,this.updateRenderTargetMipmap=ue,this.updateMultisampleRenderTarget=Be,this.setupDepthRenderbuffer=qe,this.setupFrameBufferTexture=fe,this.useMultisampledRTT=Le}function Jp(s,e){function t(n,i=gi){let r;const o=_t.getTransfer(i);if(n===Xn)return s.UNSIGNED_BYTE;if(n===Tl)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Al)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Lu)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Uu)return s.BYTE;if(n===Du)return s.SHORT;if(n===ls)return s.UNSIGNED_SHORT;if(n===El)return s.INT;if(n===bi)return s.UNSIGNED_INT;if(n===Wt)return s.FLOAT;if(n===mn)return s.HALF_FLOAT;if(n===Fu)return s.ALPHA;if(n===Ou)return s.RGB;if(n===en)return s.RGBA;if(n===Nu)return s.LUMINANCE;if(n===Bu)return s.LUMINANCE_ALPHA;if(n===dr)return s.DEPTH_COMPONENT;if(n===Sr)return s.DEPTH_STENCIL;if(n===mo)return s.RED;if(n===go)return s.RED_INTEGER;if(n===ku)return s.RG;if(n===Cl)return s.RG_INTEGER;if(n===Rl)return s.RGBA_INTEGER;if(n===Bs||n===ks||n===zs||n===Gs)if(o===Et)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Bs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ks)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===zs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Gs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Bs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ks)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===zs)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Gs)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Xa||n===qa||n===Ya||n===Za)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Xa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===qa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ya)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Za)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===$a||n===ja||n===Ja)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===$a||n===ja)return o===Et?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ja)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ka||n===Qa||n===el||n===tl||n===nl||n===il||n===rl||n===sl||n===ol||n===al||n===ll||n===cl||n===ul||n===hl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ka)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Qa)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===el)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===tl)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===nl)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===il)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===rl)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===sl)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ol)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===al)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ll)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===cl)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ul)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===hl)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Vs||n===fl||n===dl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Vs)return o===Et?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===fl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===dl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===zu||n===pl||n===ml||n===gl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Vs)return r.COMPRESSED_RED_RGTC1_EXT;if(n===pl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ml)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===gl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===yr?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}class Kp extends Dt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class is extends xt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const YS={type:"move"};class Ic{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new is,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new is,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new is,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const v of e.hand.values()){const g=t.getJointPose(v,n),m=this._getHandJoint(c,v);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,p=.005;c.inputState.pinching&&f>d+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=d-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(YS)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new is;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const ZS=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,$S=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class jS{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new Ft,r=e.properties.get(i);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new cn({vertexShader:ZS,fragmentShader:$S,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Rt(new ai(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class JS extends oi{constructor(e,t){super();const n=this;let i=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,f=null,d=null,p=null;const v=new jS,g=t.getContextAttributes();let m=null,x=null;const _=[],y=[],A=new pe;let b=null;const T=new Dt;T.viewport=new dt;const w=new Dt;w.viewport=new dt;const M=[T,w],S=new Kp;let R=null,P=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let se=_[$];return se===void 0&&(se=new Ic,_[$]=se),se.getTargetRaySpace()},this.getControllerGrip=function($){let se=_[$];return se===void 0&&(se=new Ic,_[$]=se),se.getGripSpace()},this.getHand=function($){let se=_[$];return se===void 0&&(se=new Ic,_[$]=se),se.getHandSpace()};function F($){const se=y.indexOf($.inputSource);if(se===-1)return;const fe=_[se];fe!==void 0&&(fe.update($.inputSource,$.frame,c||o),fe.dispatchEvent({type:$.type,data:$.inputSource}))}function U(){i.removeEventListener("select",F),i.removeEventListener("selectstart",F),i.removeEventListener("selectend",F),i.removeEventListener("squeeze",F),i.removeEventListener("squeezestart",F),i.removeEventListener("squeezeend",F),i.removeEventListener("end",U),i.removeEventListener("inputsourceschange",G);for(let $=0;$<_.length;$++){const se=y[$];se!==null&&(y[$]=null,_[$].disconnect(se))}R=null,P=null,v.reset(),e.setRenderTarget(m),d=null,f=null,h=null,i=null,x=null,ne.stop(),n.isPresenting=!1,e.setPixelRatio(b),e.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting},this.setReferenceSpaceType=function($){a=$,n.isPresenting},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function($){if(i=$,i!==null){if(m=e.getRenderTarget(),i.addEventListener("select",F),i.addEventListener("selectstart",F),i.addEventListener("selectend",F),i.addEventListener("squeeze",F),i.addEventListener("squeezestart",F),i.addEventListener("squeezeend",F),i.addEventListener("end",U),i.addEventListener("inputsourceschange",G),g.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(A),i.renderState.layers===void 0){const se={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(i,t,se),i.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),x=new Pn(d.framebufferWidth,d.framebufferHeight,{format:en,type:Xn,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let se=null,fe=null,me=null;g.depth&&(me=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,se=g.stencil?Sr:dr,fe=g.stencil?yr:bi);const Te={colorFormat:t.RGBA8,depthFormat:me,scaleFactor:r};h=new XRWebGLBinding(i,t),f=h.createProjectionLayer(Te),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),x=new Pn(f.textureWidth,f.textureHeight,{format:en,type:Xn,depthTexture:new Ju(f.textureWidth,f.textureHeight,fe,void 0,void 0,void 0,void 0,void 0,void 0,se),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),ne.setContext(i),ne.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function G($){for(let se=0;se<$.removed.length;se++){const fe=$.removed[se],me=y.indexOf(fe);me>=0&&(y[me]=null,_[me].disconnect(fe))}for(let se=0;se<$.added.length;se++){const fe=$.added[se];let me=y.indexOf(fe);if(me===-1){for(let qe=0;qe<_.length;qe++)if(qe>=y.length){y.push(fe),me=qe;break}else if(y[qe]===null){y[qe]=fe,me=qe;break}if(me===-1)break}const Te=_[me];Te&&Te.connect(fe)}}const B=new L,K=new L;function Y($,se,fe){B.setFromMatrixPosition(se.matrixWorld),K.setFromMatrixPosition(fe.matrixWorld);const me=B.distanceTo(K),Te=se.projectionMatrix.elements,qe=fe.projectionMatrix.elements,Fe=Te[14]/(Te[10]-1),Se=Te[14]/(Te[10]+1),ue=(Te[9]+1)/Te[5],xe=(Te[9]-1)/Te[5],N=(Te[8]-1)/Te[0],Be=(qe[8]+1)/qe[0],ye=Fe*N,Le=Fe*Be,Oe=me/(-N+Be),$e=Oe*-N;if(se.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX($e),$.translateZ(Oe),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Te[10]===-1)$.projectionMatrix.copy(se.projectionMatrix),$.projectionMatrixInverse.copy(se.projectionMatrixInverse);else{const Ne=Fe+Oe,O=Se+Oe,I=ye-$e,Q=Le+(me-$e),he=ue*Se/O*Ne,ve=xe*Se/O*Ne;$.projectionMatrix.makePerspective(I,Q,he,ve,Ne,O),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function le($,se){se===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(se.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(i===null)return;let se=$.near,fe=$.far;v.texture!==null&&(v.depthNear>0&&(se=v.depthNear),v.depthFar>0&&(fe=v.depthFar)),S.near=w.near=T.near=se,S.far=w.far=T.far=fe,(R!==S.near||P!==S.far)&&(i.updateRenderState({depthNear:S.near,depthFar:S.far}),R=S.near,P=S.far),T.layers.mask=$.layers.mask|2,w.layers.mask=$.layers.mask|4,S.layers.mask=T.layers.mask|w.layers.mask;const me=$.parent,Te=S.cameras;le(S,me);for(let qe=0;qe<Te.length;qe++)le(Te[qe],me);Te.length===2?Y(S,T,w):S.projectionMatrix.copy(T.projectionMatrix),J($,S,me)};function J($,se,fe){fe===null?$.matrix.copy(se.matrixWorld):($.matrix.copy(fe.matrixWorld),$.matrix.invert(),$.matrix.multiply(se.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(se.projectionMatrix),$.projectionMatrixInverse.copy(se.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=cs*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function($){l=$,f!==null&&(f.fixedFoveation=$),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=$)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(S)};let Z=null;function re($,se){if(u=se.getViewerPose(c||o),p=se,u!==null){const fe=u.views;d!==null&&(e.setRenderTargetFramebuffer(x,d.framebuffer),e.setRenderTarget(x));let me=!1;fe.length!==S.cameras.length&&(S.cameras.length=0,me=!0);for(let qe=0;qe<fe.length;qe++){const Fe=fe[qe];let Se=null;if(d!==null)Se=d.getViewport(Fe);else{const xe=h.getViewSubImage(f,Fe);Se=xe.viewport,qe===0&&(e.setRenderTargetTextures(x,xe.colorTexture,f.ignoreDepthValues?void 0:xe.depthStencilTexture),e.setRenderTarget(x))}let ue=M[qe];ue===void 0&&(ue=new Dt,ue.layers.enable(qe),ue.viewport=new dt,M[qe]=ue),ue.matrix.fromArray(Fe.transform.matrix),ue.matrix.decompose(ue.position,ue.quaternion,ue.scale),ue.projectionMatrix.fromArray(Fe.projectionMatrix),ue.projectionMatrixInverse.copy(ue.projectionMatrix).invert(),ue.viewport.set(Se.x,Se.y,Se.width,Se.height),qe===0&&(S.matrix.copy(ue.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),me===!0&&S.cameras.push(ue)}const Te=i.enabledFeatures;if(Te&&Te.includes("depth-sensing")){const qe=h.getDepthInformation(fe[0]);qe&&qe.isValid&&qe.texture&&v.init(e,qe,i.renderState)}}for(let fe=0;fe<_.length;fe++){const me=y[fe],Te=_[fe];me!==null&&Te!==void 0&&Te.update(me,se,c||o)}Z&&Z($,se),se.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:se}),p=null}const ne=new qp;ne.setAnimationLoop(re),this.setAnimationLoop=function($){Z=$},this.dispose=function(){}}}const Zi=new Un,KS=new rt;function QS(s,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,Wp(s)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function i(g,m,x,_,y){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(g,m):m.isMeshToonMaterial?(r(g,m),h(g,m)):m.isMeshPhongMaterial?(r(g,m),u(g,m)):m.isMeshStandardMaterial?(r(g,m),f(g,m),m.isMeshPhysicalMaterial&&d(g,m,y)):m.isMeshMatcapMaterial?(r(g,m),p(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),v(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(o(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?l(g,m,x,_):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===gn&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===gn&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const x=e.get(m),_=x.envMap,y=x.envMapRotation;_&&(g.envMap.value=_,Zi.copy(y),Zi.x*=-1,Zi.y*=-1,Zi.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Zi.y*=-1,Zi.z*=-1),g.envMapRotation.value.setFromMatrix4(KS.makeRotationFromEuler(Zi)),g.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function o(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,x,_){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*x,g.scale.value=_*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function u(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function h(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function f(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function d(g,m,x){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===gn&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=x.texture,g.transmissionSamplerSize.value.set(x.width,x.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function v(g,m){const x=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(x.matrixWorld),g.nearDistance.value=x.shadow.camera.near,g.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function eM(s,e,t,n){let i={},r={},o=[];const a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,_){const y=_.program;n.uniformBlockBinding(x,y)}function c(x,_){let y=i[x.id];y===void 0&&(p(x),y=u(x),i[x.id]=y,x.addEventListener("dispose",g));const A=_.program;n.updateUBOMapping(x,A);const b=e.render.frame;r[x.id]!==b&&(f(x),r[x.id]=b)}function u(x){const _=h();x.__bindingPointIndex=_;const y=s.createBuffer(),A=x.__size,b=x.usage;return s.bindBuffer(s.UNIFORM_BUFFER,y),s.bufferData(s.UNIFORM_BUFFER,A,b),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,_,y),y}function h(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return 0}function f(x){const _=i[x.id],y=x.uniforms,A=x.__cache;s.bindBuffer(s.UNIFORM_BUFFER,_);for(let b=0,T=y.length;b<T;b++){const w=Array.isArray(y[b])?y[b]:[y[b]];for(let M=0,S=w.length;M<S;M++){const R=w[M];if(d(R,b,M,A)===!0){const P=R.__offset,F=Array.isArray(R.value)?R.value:[R.value];let U=0;for(let G=0;G<F.length;G++){const B=F[G],K=v(B);typeof B=="number"||typeof B=="boolean"?(R.__data[0]=B,s.bufferSubData(s.UNIFORM_BUFFER,P+U,R.__data)):B.isMatrix3?(R.__data[0]=B.elements[0],R.__data[1]=B.elements[1],R.__data[2]=B.elements[2],R.__data[3]=0,R.__data[4]=B.elements[3],R.__data[5]=B.elements[4],R.__data[6]=B.elements[5],R.__data[7]=0,R.__data[8]=B.elements[6],R.__data[9]=B.elements[7],R.__data[10]=B.elements[8],R.__data[11]=0):(B.toArray(R.__data,U),U+=K.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,P,R.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function d(x,_,y,A){const b=x.value,T=_+"_"+y;if(A[T]===void 0)return typeof b=="number"||typeof b=="boolean"?A[T]=b:A[T]=b.clone(),!0;{const w=A[T];if(typeof b=="number"||typeof b=="boolean"){if(w!==b)return A[T]=b,!0}else if(w.equals(b)===!1)return w.copy(b),!0}return!1}function p(x){const _=x.uniforms;let y=0;const A=16;for(let T=0,w=_.length;T<w;T++){const M=Array.isArray(_[T])?_[T]:[_[T]];for(let S=0,R=M.length;S<R;S++){const P=M[S],F=Array.isArray(P.value)?P.value:[P.value];for(let U=0,G=F.length;U<G;U++){const B=F[U],K=v(B),Y=y%A,le=Y%K.boundary,J=Y+le;y+=le,J!==0&&A-J<K.storage&&(y+=A-J),P.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=y,y+=K.storage}}}const b=y%A;return b>0&&(y+=A-b),x.__size=y,x.__cache={},this}function v(x){const _={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(_.boundary=4,_.storage=4):x.isVector2?(_.boundary=8,_.storage=8):x.isVector3||x.isColor?(_.boundary=16,_.storage=12):x.isVector4?(_.boundary=16,_.storage=16):x.isMatrix3?(_.boundary=48,_.storage=48):x.isMatrix4?(_.boundary=64,_.storage=64):x.isTexture,_}function g(x){const _=x.target;_.removeEventListener("dispose",g);const y=o.indexOf(_.__bindingPointIndex);o.splice(y,1),s.deleteBuffer(i[_.id]),delete i[_.id],delete r[_.id]}function m(){for(const x in i)s.deleteBuffer(i[x]);o=[],i={},r={}}return{bind:l,update:c,dispose:m}}class Qp{constructor(e={}){const{canvas:t=zp(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const p=new Uint32Array(4),v=new Int32Array(4);let g=null,m=null;const x=[],_=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Sn,this.toneMapping=ti,this.toneMappingExposure=1;const y=this;let A=!1,b=0,T=0,w=null,M=-1,S=null;const R=new dt,P=new dt;let F=null;const U=new We(0);let G=0,B=t.width,K=t.height,Y=1,le=null,J=null;const Z=new dt(0,0,B,K),re=new dt(0,0,B,K);let ne=!1;const $=new yo;let se=!1,fe=!1;const me=new rt,Te=new rt,qe=new L,Fe=new dt,Se={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ue=!1;function xe(){return w===null?Y:1}let N=n;function Be(E,k){return t.getContext(E,k)}try{const E={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ds}`),t.addEventListener("webglcontextlost",_e,!1),t.addEventListener("webglcontextrestored",Pe,!1),t.addEventListener("webglcontextcreationerror",we,!1),N===null){const k="webgl2";if(N=Be(k,E),N===null)throw Be(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw E}let ye,Le,Oe,$e,Ne,O,I,Q,he,ve,ge,Ee,Re,Ie,Je,be,Ge,ke,Xe,Ce,H,ae,Ae,X;function j(){ye=new oy(N),ye.init(),ae=new Jp(N,ye),Le=new ey(N,ye,e,ae),Oe=new zS(N,ye),Le.reverseDepthBuffer&&f&&Oe.buffers.depth.setReversed(!0),$e=new cy(N),Ne=new AS,O=new qS(N,ye,Oe,Ne,Le,ae,$e),I=new ny(y),Q=new sy(y),he=new g0(N),Ae=new Kx(N,he),ve=new ay(N,he,$e,Ae),ge=new hy(N,ve,he,$e),Xe=new uy(N,Le,O),be=new ty(Ne),Ee=new TS(y,I,Q,ye,Le,Ae,be),Re=new QS(y,Ne),Ie=new RS,Je=new FS(ye),ke=new Jx(y,I,Q,Oe,ge,d,l),Ge=new BS(y,ge,Le),X=new eM(N,$e,Le,Oe),Ce=new Qx(N,ye,$e),H=new ly(N,ye,$e),$e.programs=Ee.programs,y.capabilities=Le,y.extensions=ye,y.properties=Ne,y.renderLists=Ie,y.shadowMap=Ge,y.state=Oe,y.info=$e}j();const ee=new JS(y,N);this.xr=ee,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const E=ye.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=ye.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(E){E!==void 0&&(Y=E,this.setSize(B,K,!1))},this.getSize=function(E){return E.set(B,K)},this.setSize=function(E,k,V=!0){ee.isPresenting||(B=E,K=k,t.width=Math.floor(E*Y),t.height=Math.floor(k*Y),V===!0&&(t.style.width=E+"px",t.style.height=k+"px"),this.setViewport(0,0,E,k))},this.getDrawingBufferSize=function(E){return E.set(B*Y,K*Y).floor()},this.setDrawingBufferSize=function(E,k,V){B=E,K=k,Y=V,t.width=Math.floor(E*V),t.height=Math.floor(k*V),this.setViewport(0,0,E,k)},this.getCurrentViewport=function(E){return E.copy(R)},this.getViewport=function(E){return E.copy(Z)},this.setViewport=function(E,k,V,W){E.isVector4?Z.set(E.x,E.y,E.z,E.w):Z.set(E,k,V,W),Oe.viewport(R.copy(Z).multiplyScalar(Y).round())},this.getScissor=function(E){return E.copy(re)},this.setScissor=function(E,k,V,W){E.isVector4?re.set(E.x,E.y,E.z,E.w):re.set(E,k,V,W),Oe.scissor(P.copy(re).multiplyScalar(Y).round())},this.getScissorTest=function(){return ne},this.setScissorTest=function(E){Oe.setScissorTest(ne=E)},this.setOpaqueSort=function(E){le=E},this.setTransparentSort=function(E){J=E},this.getClearColor=function(E){return E.copy(ke.getClearColor())},this.setClearColor=function(){ke.setClearColor.apply(ke,arguments)},this.getClearAlpha=function(){return ke.getClearAlpha()},this.setClearAlpha=function(){ke.setClearAlpha.apply(ke,arguments)},this.clear=function(E=!0,k=!0,V=!0){let W=0;if(E){let z=!1;if(w!==null){const te=w.texture.format;z=te===Rl||te===Cl||te===go}if(z){const te=w.texture.type,oe=te===Xn||te===bi||te===ls||te===yr||te===Tl||te===Al,Ve=ke.getClearColor(),Me=ke.getClearAlpha(),Ue=Ve.r,ze=Ve.g,De=Ve.b;oe?(p[0]=Ue,p[1]=ze,p[2]=De,p[3]=Me,N.clearBufferuiv(N.COLOR,0,p)):(v[0]=Ue,v[1]=ze,v[2]=De,v[3]=Me,N.clearBufferiv(N.COLOR,0,v))}else W|=N.COLOR_BUFFER_BIT}k&&(W|=N.DEPTH_BUFFER_BIT),V&&(W|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",_e,!1),t.removeEventListener("webglcontextrestored",Pe,!1),t.removeEventListener("webglcontextcreationerror",we,!1),Ie.dispose(),Je.dispose(),Ne.dispose(),I.dispose(),Q.dispose(),ge.dispose(),Ae.dispose(),X.dispose(),Ee.dispose(),ee.dispose(),ee.removeEventListener("sessionstart",Ot),ee.removeEventListener("sessionend",Dn),nn.stop()};function _e(E){E.preventDefault(),A=!0}function Pe(){A=!1;const E=$e.autoReset,k=Ge.enabled,V=Ge.autoUpdate,W=Ge.needsUpdate,z=Ge.type;j(),$e.autoReset=E,Ge.enabled=k,Ge.autoUpdate=V,Ge.needsUpdate=W,Ge.type=z}function we(E){}function Ye(E){const k=E.target;k.removeEventListener("dispose",Ye),ot(k)}function ot(E){Qe(E),Ne.remove(E)}function Qe(E){const k=Ne.get(E).programs;k!==void 0&&(k.forEach(function(V){Ee.releaseProgram(V)}),E.isShaderMaterial&&Ee.releaseShaderCache(E))}this.renderBufferDirect=function(E,k,V,W,z,te){k===null&&(k=Se);const oe=z.isMesh&&z.matrixWorld.determinant()<0,Ve=q(E,k,V,W,z);Oe.setMaterial(W,oe);let Me=V.index,Ue=1;if(W.wireframe===!0){if(Me=ve.getWireframeAttribute(V),Me===void 0)return;Ue=2}const ze=V.drawRange,De=V.attributes.position;let Ke=ze.start*Ue,nt=(ze.start+ze.count)*Ue;te!==null&&(Ke=Math.max(Ke,te.start*Ue),nt=Math.min(nt,(te.start+te.count)*Ue)),Me!==null?(Ke=Math.max(Ke,0),nt=Math.min(nt,Me.count)):De!=null&&(Ke=Math.max(Ke,0),nt=Math.min(nt,De.count));const lt=nt-Ke;if(lt<0||lt===1/0)return;Ae.setup(z,W,Ve,V,Me);let wt,tt=Ce;if(Me!==null&&(wt=he.get(Me),tt=H,tt.setIndex(wt)),z.isMesh)W.wireframe===!0?(Oe.setLineWidth(W.wireframeLinewidth*xe()),tt.setMode(N.LINES)):tt.setMode(N.TRIANGLES);else if(z.isLine){let Ze=W.linewidth;Ze===void 0&&(Ze=1),Oe.setLineWidth(Ze*xe()),z.isLineSegments?tt.setMode(N.LINES):z.isLineLoop?tt.setMode(N.LINE_LOOP):tt.setMode(N.LINE_STRIP)}else z.isPoints?tt.setMode(N.POINTS):z.isSprite&&tt.setMode(N.TRIANGLES);if(z.isBatchedMesh)if(z._multiDrawInstances!==null)tt.renderMultiDrawInstances(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount,z._multiDrawInstances);else if(ye.get("WEBGL_multi_draw"))tt.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const Ze=z._multiDrawStarts,mt=z._multiDrawCounts,st=z._multiDrawCount,zt=Me?he.get(Me).bytesPerElement:1,Ln=Ne.get(W).currentProgram.getUniforms();for(let At=0;At<st;At++)Ln.setValue(N,"_gl_DrawID",At),tt.render(Ze[At]/zt,mt[At])}else if(z.isInstancedMesh)tt.renderInstances(Ke,lt,z.count);else if(V.isInstancedBufferGeometry){const Ze=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,mt=Math.min(V.instanceCount,Ze);tt.renderInstances(Ke,lt,mt)}else tt.render(Ke,lt)};function et(E,k,V){E.transparent===!0&&E.side===Cn&&E.forceSinglePass===!1?(E.side=gn,E.needsUpdate=!0,$n(E,k,V),E.side=Mi,E.needsUpdate=!0,$n(E,k,V),E.side=Cn):$n(E,k,V)}this.compile=function(E,k,V=null){V===null&&(V=E),m=Je.get(V),m.init(k),_.push(m),V.traverseVisible(function(z){z.isLight&&z.layers.test(k.layers)&&(m.pushLight(z),z.castShadow&&m.pushShadow(z))}),E!==V&&E.traverseVisible(function(z){z.isLight&&z.layers.test(k.layers)&&(m.pushLight(z),z.castShadow&&m.pushShadow(z))}),m.setupLights();const W=new Set;return E.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const te=z.material;if(te)if(Array.isArray(te))for(let oe=0;oe<te.length;oe++){const Ve=te[oe];et(Ve,V,z),W.add(Ve)}else et(te,V,z),W.add(te)}),_.pop(),m=null,W},this.compileAsync=function(E,k,V=null){const W=this.compile(E,k,V);return new Promise(z=>{function te(){if(W.forEach(function(oe){Ne.get(oe).currentProgram.isReady()&&W.delete(oe)}),W.size===0){z(E);return}setTimeout(te,10)}ye.get("KHR_parallel_shader_compile")!==null?te():setTimeout(te,10)})};let Mt=null;function bt(E){Mt&&Mt(E)}function Ot(){nn.stop()}function Dn(){nn.start()}const nn=new qp;nn.setAnimationLoop(bt),typeof self<"u"&&nn.setContext(self),this.setAnimationLoop=function(E){Mt=E,ee.setAnimationLoop(E),E===null?nn.stop():nn.start()},ee.addEventListener("sessionstart",Ot),ee.addEventListener("sessionend",Dn),this.render=function(E,k){if(k!==void 0&&k.isCamera!==!0||A===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),ee.enabled===!0&&ee.isPresenting===!0&&(ee.cameraAutoUpdate===!0&&ee.updateCamera(k),k=ee.getCamera()),E.isScene===!0&&E.onBeforeRender(y,E,k,w),m=Je.get(E,_.length),m.init(k),_.push(m),Te.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),$.setFromProjectionMatrix(Te),fe=this.localClippingEnabled,se=be.init(this.clippingPlanes,fe),g=Ie.get(E,x.length),g.init(),x.push(g),ee.enabled===!0&&ee.isPresenting===!0){const te=y.xr.getDepthSensingMesh();te!==null&&Zn(te,k,-1/0,y.sortObjects)}Zn(E,k,0,y.sortObjects),g.finish(),y.sortObjects===!0&&g.sort(le,J),ue=ee.enabled===!1||ee.isPresenting===!1||ee.hasDepthSensing()===!1,ue&&ke.addToRenderList(g,E),this.info.render.frame++,se===!0&&be.beginShadows();const V=m.state.shadowsArray;Ge.render(V,E,k),se===!0&&be.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=g.opaque,z=g.transmissive;if(m.setupLights(),k.isArrayCamera){const te=k.cameras;if(z.length>0)for(let oe=0,Ve=te.length;oe<Ve;oe++){const Me=te[oe];En(W,z,E,Me)}ue&&ke.render(E);for(let oe=0,Ve=te.length;oe<Ve;oe++){const Me=te[oe];wn(g,E,Me,Me.viewport)}}else z.length>0&&En(W,z,E,k),ue&&ke.render(E),wn(g,E,k);w!==null&&(O.updateMultisampleRenderTarget(w),O.updateRenderTargetMipmap(w)),E.isScene===!0&&E.onAfterRender(y,E,k),Ae.resetDefaultState(),M=-1,S=null,_.pop(),_.length>0?(m=_[_.length-1],se===!0&&be.setGlobalState(y.clippingPlanes,m.state.camera)):m=null,x.pop(),x.length>0?g=x[x.length-1]:g=null};function Zn(E,k,V,W){if(E.visible===!1)return;if(E.layers.test(k.layers)){if(E.isGroup)V=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(k);else if(E.isLight)m.pushLight(E),E.castShadow&&m.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||$.intersectsSprite(E)){W&&Fe.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Te);const oe=ge.update(E),Ve=E.material;Ve.visible&&g.push(E,oe,Ve,V,Fe.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||$.intersectsObject(E))){const oe=ge.update(E),Ve=E.material;if(W&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Fe.copy(E.boundingSphere.center)):(oe.boundingSphere===null&&oe.computeBoundingSphere(),Fe.copy(oe.boundingSphere.center)),Fe.applyMatrix4(E.matrixWorld).applyMatrix4(Te)),Array.isArray(Ve)){const Me=oe.groups;for(let Ue=0,ze=Me.length;Ue<ze;Ue++){const De=Me[Ue],Ke=Ve[De.materialIndex];Ke&&Ke.visible&&g.push(E,oe,Ke,V,Fe.z,De)}}else Ve.visible&&g.push(E,oe,Ve,V,Fe.z,null)}}const te=E.children;for(let oe=0,Ve=te.length;oe<Ve;oe++)Zn(te[oe],k,V,W)}function wn(E,k,V,W){const z=E.opaque,te=E.transmissive,oe=E.transparent;m.setupLightsView(V),se===!0&&be.setGlobalState(y.clippingPlanes,V),W&&Oe.viewport(R.copy(W)),z.length>0&&at(z,k,V),te.length>0&&at(te,k,V),oe.length>0&&at(oe,k,V),Oe.buffers.depth.setTest(!0),Oe.buffers.depth.setMask(!0),Oe.buffers.color.setMask(!0),Oe.setPolygonOffset(!1)}function En(E,k,V,W){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[W.id]===void 0&&(m.state.transmissionRenderTarget[W.id]=new Pn(1,1,{generateMipmaps:!0,type:ye.has("EXT_color_buffer_half_float")||ye.has("EXT_color_buffer_float")?mn:Xn,minFilter:Qn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:_t.workingColorSpace}));const te=m.state.transmissionRenderTarget[W.id],oe=W.viewport||R;te.setSize(oe.z,oe.w);const Ve=y.getRenderTarget();y.setRenderTarget(te),y.getClearColor(U),G=y.getClearAlpha(),G<1&&y.setClearColor(16777215,.5),y.clear(),ue&&ke.render(V);const Me=y.toneMapping;y.toneMapping=ti;const Ue=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),m.setupLightsView(W),se===!0&&be.setGlobalState(y.clippingPlanes,W),at(E,V,W),O.updateMultisampleRenderTarget(te),O.updateRenderTargetMipmap(te),ye.has("WEBGL_multisampled_render_to_texture")===!1){let ze=!1;for(let De=0,Ke=k.length;De<Ke;De++){const nt=k[De],lt=nt.object,wt=nt.geometry,tt=nt.material,Ze=nt.group;if(tt.side===Cn&&lt.layers.test(W.layers)){const mt=tt.side;tt.side=gn,tt.needsUpdate=!0,_n(lt,V,W,wt,tt,Ze),tt.side=mt,tt.needsUpdate=!0,ze=!0}}ze===!0&&(O.updateMultisampleRenderTarget(te),O.updateRenderTargetMipmap(te))}y.setRenderTarget(Ve),y.setClearColor(U,G),Ue!==void 0&&(W.viewport=Ue),y.toneMapping=Me}function at(E,k,V){const W=k.isScene===!0?k.overrideMaterial:null;for(let z=0,te=E.length;z<te;z++){const oe=E[z],Ve=oe.object,Me=oe.geometry,Ue=W===null?oe.material:W,ze=oe.group;Ve.layers.test(V.layers)&&_n(Ve,k,V,Me,Ue,ze)}}function _n(E,k,V,W,z,te){E.onBeforeRender(y,k,V,W,z,te),E.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),z.onBeforeRender(y,k,V,W,E,te),z.transparent===!0&&z.side===Cn&&z.forceSinglePass===!1?(z.side=gn,z.needsUpdate=!0,y.renderBufferDirect(V,k,W,z,E,te),z.side=Mi,z.needsUpdate=!0,y.renderBufferDirect(V,k,W,z,E,te),z.side=Cn):y.renderBufferDirect(V,k,W,z,E,te),E.onAfterRender(y,k,V,W,z,te)}function $n(E,k,V){k.isScene!==!0&&(k=Se);const W=Ne.get(E),z=m.state.lights,te=m.state.shadowsArray,oe=z.state.version,Ve=Ee.getParameters(E,z.state,te,k,V),Me=Ee.getProgramCacheKey(Ve);let Ue=W.programs;W.environment=E.isMeshStandardMaterial?k.environment:null,W.fog=k.fog,W.envMap=(E.isMeshStandardMaterial?Q:I).get(E.envMap||W.environment),W.envMapRotation=W.environment!==null&&E.envMap===null?k.environmentRotation:E.envMapRotation,Ue===void 0&&(E.addEventListener("dispose",Ye),Ue=new Map,W.programs=Ue);let ze=Ue.get(Me);if(ze!==void 0){if(W.currentProgram===ze&&W.lightsStateVersion===oe)return D(E,Ve),ze}else Ve.uniforms=Ee.getUniforms(E),E.onBeforeCompile(Ve,y),ze=Ee.acquireProgram(Ve,Me),Ue.set(Me,ze),W.uniforms=Ve.uniforms;const De=W.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(De.clippingPlanes=be.uniform),D(E,Ve),W.needsLights=de(E),W.lightsStateVersion=oe,W.needsLights&&(De.ambientLightColor.value=z.state.ambient,De.lightProbe.value=z.state.probe,De.directionalLights.value=z.state.directional,De.directionalLightShadows.value=z.state.directionalShadow,De.spotLights.value=z.state.spot,De.spotLightShadows.value=z.state.spotShadow,De.rectAreaLights.value=z.state.rectArea,De.ltc_1.value=z.state.rectAreaLTC1,De.ltc_2.value=z.state.rectAreaLTC2,De.pointLights.value=z.state.point,De.pointLightShadows.value=z.state.pointShadow,De.hemisphereLights.value=z.state.hemi,De.directionalShadowMap.value=z.state.directionalShadowMap,De.directionalShadowMatrix.value=z.state.directionalShadowMatrix,De.spotShadowMap.value=z.state.spotShadowMap,De.spotLightMatrix.value=z.state.spotLightMatrix,De.spotLightMap.value=z.state.spotLightMap,De.pointShadowMap.value=z.state.pointShadowMap,De.pointShadowMatrix.value=z.state.pointShadowMatrix),W.currentProgram=ze,W.uniformsList=null,ze}function C(E){if(E.uniformsList===null){const k=E.currentProgram.getUniforms();E.uniformsList=Ua.seqWithValue(k.seq,E.uniforms)}return E.uniformsList}function D(E,k){const V=Ne.get(E);V.outputColorSpace=k.outputColorSpace,V.batching=k.batching,V.batchingColor=k.batchingColor,V.instancing=k.instancing,V.instancingColor=k.instancingColor,V.instancingMorph=k.instancingMorph,V.skinning=k.skinning,V.morphTargets=k.morphTargets,V.morphNormals=k.morphNormals,V.morphColors=k.morphColors,V.morphTargetsCount=k.morphTargetsCount,V.numClippingPlanes=k.numClippingPlanes,V.numIntersection=k.numClipIntersection,V.vertexAlphas=k.vertexAlphas,V.vertexTangents=k.vertexTangents,V.toneMapping=k.toneMapping}function q(E,k,V,W,z){k.isScene!==!0&&(k=Se),O.resetTextureUnits();const te=k.fog,oe=W.isMeshStandardMaterial?k.environment:null,Ve=w===null?y.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:wr,Me=(W.isMeshStandardMaterial?Q:I).get(W.envMap||oe),Ue=W.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,ze=!!V.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),De=!!V.morphAttributes.position,Ke=!!V.morphAttributes.normal,nt=!!V.morphAttributes.color;let lt=ti;W.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(lt=y.toneMapping);const wt=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,tt=wt!==void 0?wt.length:0,Ze=Ne.get(W),mt=m.state.lights;if(se===!0&&(fe===!0||E!==S)){const It=E===S&&W.id===M;be.setState(W,E,It)}let st=!1;W.version===Ze.__version?(Ze.needsLights&&Ze.lightsStateVersion!==mt.state.version||Ze.outputColorSpace!==Ve||z.isBatchedMesh&&Ze.batching===!1||!z.isBatchedMesh&&Ze.batching===!0||z.isBatchedMesh&&Ze.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&Ze.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&Ze.instancing===!1||!z.isInstancedMesh&&Ze.instancing===!0||z.isSkinnedMesh&&Ze.skinning===!1||!z.isSkinnedMesh&&Ze.skinning===!0||z.isInstancedMesh&&Ze.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&Ze.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&Ze.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&Ze.instancingMorph===!1&&z.morphTexture!==null||Ze.envMap!==Me||W.fog===!0&&Ze.fog!==te||Ze.numClippingPlanes!==void 0&&(Ze.numClippingPlanes!==be.numPlanes||Ze.numIntersection!==be.numIntersection)||Ze.vertexAlphas!==Ue||Ze.vertexTangents!==ze||Ze.morphTargets!==De||Ze.morphNormals!==Ke||Ze.morphColors!==nt||Ze.toneMapping!==lt||Ze.morphTargetsCount!==tt)&&(st=!0):(st=!0,Ze.__version=W.version);let zt=Ze.currentProgram;st===!0&&(zt=$n(W,k,z));let Ln=!1,At=!1,yt=!1;const ut=zt.getUniforms(),gt=Ze.uniforms;if(Oe.useProgram(zt.program)&&(Ln=!0,At=!0,yt=!0),W.id!==M&&(M=W.id,At=!0),Ln||S!==E){Oe.buffers.depth.getReversed()?(me.copy(E.projectionMatrix),Vv(me),Hv(me),ut.setValue(N,"projectionMatrix",me)):ut.setValue(N,"projectionMatrix",E.projectionMatrix),ut.setValue(N,"viewMatrix",E.matrixWorldInverse);const rn=ut.map.cameraPosition;rn!==void 0&&rn.setValue(N,qe.setFromMatrixPosition(E.matrixWorld)),Le.logarithmicDepthBuffer&&ut.setValue(N,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&ut.setValue(N,"isOrthographic",E.isOrthographicCamera===!0),S!==E&&(S=E,At=!0,yt=!0)}if(z.isSkinnedMesh){ut.setOptional(N,z,"bindMatrix"),ut.setOptional(N,z,"bindMatrixInverse");const It=z.skeleton;It&&(It.boneTexture===null&&It.computeBoneTexture(),ut.setValue(N,"boneTexture",It.boneTexture,O))}z.isBatchedMesh&&(ut.setOptional(N,z,"batchingTexture"),ut.setValue(N,"batchingTexture",z._matricesTexture,O),ut.setOptional(N,z,"batchingIdTexture"),ut.setValue(N,"batchingIdTexture",z._indirectTexture,O),ut.setOptional(N,z,"batchingColorTexture"),z._colorsTexture!==null&&ut.setValue(N,"batchingColorTexture",z._colorsTexture,O));const vt=V.morphAttributes;if((vt.position!==void 0||vt.normal!==void 0||vt.color!==void 0)&&Xe.update(z,V,zt),(At||Ze.receiveShadow!==z.receiveShadow)&&(Ze.receiveShadow=z.receiveShadow,ut.setValue(N,"receiveShadow",z.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(gt.envMap.value=Me,gt.flipEnvMap.value=Me.isCubeTexture&&Me.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&k.environment!==null&&(gt.envMapIntensity.value=k.environmentIntensity),At&&(ut.setValue(N,"toneMappingExposure",y.toneMappingExposure),Ze.needsLights&&ce(gt,yt),te&&W.fog===!0&&Re.refreshFogUniforms(gt,te),Re.refreshMaterialUniforms(gt,W,Y,K,m.state.transmissionRenderTarget[E.id]),Ua.upload(N,C(Ze),gt,O)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Ua.upload(N,C(Ze),gt,O),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&ut.setValue(N,"center",z.center),ut.setValue(N,"modelViewMatrix",z.modelViewMatrix),ut.setValue(N,"normalMatrix",z.normalMatrix),ut.setValue(N,"modelMatrix",z.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const It=W.uniformsGroups;for(let rn=0,Nt=It.length;rn<Nt;rn++){const Bn=It[rn];X.update(Bn,zt),X.bind(Bn,zt)}}return zt}function ce(E,k){E.ambientLightColor.needsUpdate=k,E.lightProbe.needsUpdate=k,E.directionalLights.needsUpdate=k,E.directionalLightShadows.needsUpdate=k,E.pointLights.needsUpdate=k,E.pointLightShadows.needsUpdate=k,E.spotLights.needsUpdate=k,E.spotLightShadows.needsUpdate=k,E.rectAreaLights.needsUpdate=k,E.hemisphereLights.needsUpdate=k}function de(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(E,k,V){Ne.get(E.texture).__webglTexture=k,Ne.get(E.depthTexture).__webglTexture=V;const W=Ne.get(E);W.__hasExternalTextures=!0,W.__autoAllocateDepthBuffer=V===void 0,W.__autoAllocateDepthBuffer||ye.has("WEBGL_multisampled_render_to_texture")===!0&&(W.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,k){const V=Ne.get(E);V.__webglFramebuffer=k,V.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(E,k=0,V=0){w=E,b=k,T=V;let W=!0,z=null,te=!1,oe=!1;if(E){const Me=Ne.get(E);if(Me.__useDefaultFramebuffer!==void 0)Oe.bindFramebuffer(N.FRAMEBUFFER,null),W=!1;else if(Me.__webglFramebuffer===void 0)O.setupRenderTarget(E);else if(Me.__hasExternalTextures)O.rebindTextures(E,Ne.get(E.texture).__webglTexture,Ne.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const De=E.depthTexture;if(Me.__boundDepthTexture!==De){if(De!==null&&Ne.has(De)&&(E.width!==De.image.width||E.height!==De.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");O.setupDepthRenderbuffer(E)}}const Ue=E.texture;(Ue.isData3DTexture||Ue.isDataArrayTexture||Ue.isCompressedArrayTexture)&&(oe=!0);const ze=Ne.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(ze[k])?z=ze[k][V]:z=ze[k],te=!0):E.samples>0&&O.useMultisampledRTT(E)===!1?z=Ne.get(E).__webglMultisampledFramebuffer:Array.isArray(ze)?z=ze[V]:z=ze,R.copy(E.viewport),P.copy(E.scissor),F=E.scissorTest}else R.copy(Z).multiplyScalar(Y).floor(),P.copy(re).multiplyScalar(Y).floor(),F=ne;if(Oe.bindFramebuffer(N.FRAMEBUFFER,z)&&W&&Oe.drawBuffers(E,z),Oe.viewport(R),Oe.scissor(P),Oe.setScissorTest(F),te){const Me=Ne.get(E.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+k,Me.__webglTexture,V)}else if(oe){const Me=Ne.get(E.texture),Ue=k||0;N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,Me.__webglTexture,V||0,Ue)}M=-1},this.readRenderTargetPixels=function(E,k,V,W,z,te,oe){if(!(E&&E.isWebGLRenderTarget))return;let Ve=Ne.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&oe!==void 0&&(Ve=Ve[oe]),Ve){Oe.bindFramebuffer(N.FRAMEBUFFER,Ve);try{const Me=E.texture,Ue=Me.format,ze=Me.type;if(!Le.textureFormatReadable(Ue)||!Le.textureTypeReadable(ze))return;k>=0&&k<=E.width-W&&V>=0&&V<=E.height-z&&N.readPixels(k,V,W,z,ae.convert(Ue),ae.convert(ze),te)}finally{const Me=w!==null?Ne.get(w).__webglFramebuffer:null;Oe.bindFramebuffer(N.FRAMEBUFFER,Me)}}},this.readRenderTargetPixelsAsync=async function(E,k,V,W,z,te,oe){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ve=Ne.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&oe!==void 0&&(Ve=Ve[oe]),Ve){const Me=E.texture,Ue=Me.format,ze=Me.type;if(!Le.textureFormatReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Le.textureTypeReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(k>=0&&k<=E.width-W&&V>=0&&V<=E.height-z){Oe.bindFramebuffer(N.FRAMEBUFFER,Ve);const De=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,De),N.bufferData(N.PIXEL_PACK_BUFFER,te.byteLength,N.STREAM_READ),N.readPixels(k,V,W,z,ae.convert(Ue),ae.convert(ze),0);const Ke=w!==null?Ne.get(w).__webglFramebuffer:null;Oe.bindFramebuffer(N.FRAMEBUFFER,Ke);const nt=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Gv(N,nt,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,De),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,te),N.deleteBuffer(De),N.deleteSync(nt),te}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,k=null,V=0){E.isTexture!==!0&&(Ds("WebGLRenderer: copyFramebufferToTexture function signature has changed."),k=arguments[0]||null,E=arguments[1]);const W=Math.pow(2,-V),z=Math.floor(E.image.width*W),te=Math.floor(E.image.height*W),oe=k!==null?k.x:0,Ve=k!==null?k.y:0;O.setTexture2D(E,0),N.copyTexSubImage2D(N.TEXTURE_2D,V,0,0,oe,Ve,z,te),Oe.unbindTexture()},this.copyTextureToTexture=function(E,k,V=null,W=null,z=0){E.isTexture!==!0&&(Ds("WebGLRenderer: copyTextureToTexture function signature has changed."),W=arguments[0]||null,E=arguments[1],k=arguments[2],z=arguments[3]||0,V=null);let te,oe,Ve,Me,Ue,ze,De,Ke,nt;const lt=E.isCompressedTexture?E.mipmaps[z]:E.image;V!==null?(te=V.max.x-V.min.x,oe=V.max.y-V.min.y,Ve=V.isBox3?V.max.z-V.min.z:1,Me=V.min.x,Ue=V.min.y,ze=V.isBox3?V.min.z:0):(te=lt.width,oe=lt.height,Ve=lt.depth||1,Me=0,Ue=0,ze=0),W!==null?(De=W.x,Ke=W.y,nt=W.z):(De=0,Ke=0,nt=0);const wt=ae.convert(k.format),tt=ae.convert(k.type);let Ze;k.isData3DTexture?(O.setTexture3D(k,0),Ze=N.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(O.setTexture2DArray(k,0),Ze=N.TEXTURE_2D_ARRAY):(O.setTexture2D(k,0),Ze=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,k.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,k.unpackAlignment);const mt=N.getParameter(N.UNPACK_ROW_LENGTH),st=N.getParameter(N.UNPACK_IMAGE_HEIGHT),zt=N.getParameter(N.UNPACK_SKIP_PIXELS),Ln=N.getParameter(N.UNPACK_SKIP_ROWS),At=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,lt.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,lt.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Me),N.pixelStorei(N.UNPACK_SKIP_ROWS,Ue),N.pixelStorei(N.UNPACK_SKIP_IMAGES,ze);const yt=E.isDataArrayTexture||E.isData3DTexture,ut=k.isDataArrayTexture||k.isData3DTexture;if(E.isRenderTargetTexture||E.isDepthTexture){const gt=Ne.get(E),vt=Ne.get(k),It=Ne.get(gt.__renderTarget),rn=Ne.get(vt.__renderTarget);Oe.bindFramebuffer(N.READ_FRAMEBUFFER,It.__webglFramebuffer),Oe.bindFramebuffer(N.DRAW_FRAMEBUFFER,rn.__webglFramebuffer);for(let Nt=0;Nt<Ve;Nt++)yt&&N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ne.get(E).__webglTexture,z,ze+Nt),E.isDepthTexture?(ut&&N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ne.get(k).__webglTexture,z,nt+Nt),N.blitFramebuffer(Me,Ue,te,oe,De,Ke,te,oe,N.DEPTH_BUFFER_BIT,N.NEAREST)):ut?N.copyTexSubImage3D(Ze,z,De,Ke,nt+Nt,Me,Ue,te,oe):N.copyTexSubImage2D(Ze,z,De,Ke,nt+Nt,Me,Ue,te,oe);Oe.bindFramebuffer(N.READ_FRAMEBUFFER,null),Oe.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else ut?E.isDataTexture||E.isData3DTexture?N.texSubImage3D(Ze,z,De,Ke,nt,te,oe,Ve,wt,tt,lt.data):k.isCompressedArrayTexture?N.compressedTexSubImage3D(Ze,z,De,Ke,nt,te,oe,Ve,wt,lt.data):N.texSubImage3D(Ze,z,De,Ke,nt,te,oe,Ve,wt,tt,lt):E.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,z,De,Ke,te,oe,wt,tt,lt.data):E.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,z,De,Ke,lt.width,lt.height,wt,lt.data):N.texSubImage2D(N.TEXTURE_2D,z,De,Ke,te,oe,wt,tt,lt);N.pixelStorei(N.UNPACK_ROW_LENGTH,mt),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,st),N.pixelStorei(N.UNPACK_SKIP_PIXELS,zt),N.pixelStorei(N.UNPACK_SKIP_ROWS,Ln),N.pixelStorei(N.UNPACK_SKIP_IMAGES,At),z===0&&k.generateMipmaps&&N.generateMipmap(Ze),Oe.unbindTexture()},this.copyTextureToTexture3D=function(E,k,V=null,W=null,z=0){return E.isTexture!==!0&&(Ds("WebGLRenderer: copyTextureToTexture3D function signature has changed."),V=arguments[0]||null,W=arguments[1]||null,E=arguments[2],k=arguments[3],z=arguments[4]||0),Ds('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(E,k,V,W,z)},this.initRenderTarget=function(E){Ne.get(E).__webglFramebuffer===void 0&&O.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?O.setTextureCube(E,0):E.isData3DTexture?O.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?O.setTexture2DArray(E,0):O.setTexture2D(E,0),Oe.unbindTexture()},this.resetState=function(){b=0,T=0,w=null,Oe.reset(),Ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ei}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=_t._getDrawingBufferColorSpace(e),t.unpackColorSpace=_t._getUnpackColorSpace()}}class Ll{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new We(e),this.density=t}clone(){return new Ll(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Fl{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new We(e),this.near=t,this.far=n}clone(){return new Fl(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Ol extends xt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Un,this.environmentIntensity=1,this.environmentRotation=new Un,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Nl{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Ks,this.updateRanges=[],this.version=0,this.uuid=In()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=In()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=In()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const hn=new L;class Rn{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)hn.fromBufferAttribute(this,t),hn.applyMatrix4(e),this.setXYZ(t,hn.x,hn.y,hn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)hn.fromBufferAttribute(this,t),hn.applyNormalMatrix(e),this.setXYZ(t,hn.x,hn.y,hn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)hn.fromBufferAttribute(this,t),hn.transformDirection(e),this.setXYZ(t,hn.x,hn.y,hn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=pn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ft(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ft(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ft(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ft(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ft(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=pn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=pn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=pn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=pn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array),i=ft(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array),i=ft(i,this.array),r=ft(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new Tt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Rn(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Ku extends un{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new We(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Vr;const Ss=new L,Hr=new L,Wr=new L,Xr=new pe,Ms=new pe,em=new rt,Jo=new L,bs=new L,Ko=new L,Cf=new pe,Pc=new pe,Rf=new pe;class tm extends xt{constructor(e=new Ku){if(super(),this.isSprite=!0,this.type="Sprite",Vr===void 0){Vr=new pt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Nl(t,5);Vr.setIndex([0,1,2,0,2,3]),Vr.setAttribute("position",new Rn(n,3,0,!1)),Vr.setAttribute("uv",new Rn(n,2,3,!1))}this.geometry=Vr,this.material=e,this.center=new pe(.5,.5)}raycast(e,t){e.camera,Hr.setFromMatrixScale(this.matrixWorld),em.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Wr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Hr.multiplyScalar(-Wr.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const o=this.center;Qo(Jo.set(-.5,-.5,0),Wr,o,Hr,i,r),Qo(bs.set(.5,-.5,0),Wr,o,Hr,i,r),Qo(Ko.set(.5,.5,0),Wr,o,Hr,i,r),Cf.set(0,0),Pc.set(1,0),Rf.set(1,1);let a=e.ray.intersectTriangle(Jo,bs,Ko,!1,Ss);if(a===null&&(Qo(bs.set(-.5,.5,0),Wr,o,Hr,i,r),Pc.set(0,1),a=e.ray.intersectTriangle(Jo,Ko,bs,!1,Ss),a===null))return;const l=e.ray.origin.distanceTo(Ss);l<e.near||l>e.far||t.push({distance:l,point:Ss.clone(),uv:Mn.getInterpolation(Ss,Jo,bs,Ko,Cf,Pc,Rf,new pe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Qo(s,e,t,n,i,r){Xr.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(Ms.x=r*Xr.x-i*Xr.y,Ms.y=i*Xr.x+r*Xr.y):Ms.copy(Xr),s.copy(e),s.x+=Ms.x,s.y+=Ms.y,s.applyMatrix4(em)}const ea=new L,If=new L;class nm extends xt{constructor(){super(),this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]},isLOD:{value:!0}}),this.autoUpdate=!0}copy(e){super.copy(e,!1);const t=e.levels;for(let n=0,i=t.length;n<i;n++){const r=t[n];this.addLevel(r.object.clone(),r.distance,r.hysteresis)}return this.autoUpdate=e.autoUpdate,this}addLevel(e,t=0,n=0){t=Math.abs(t);const i=this.levels;let r;for(r=0;r<i.length&&!(t<i[r].distance);r++);return i.splice(r,0,{distance:t,hysteresis:n,object:e}),this.add(e),this}removeLevel(e){const t=this.levels;for(let n=0;n<t.length;n++)if(t[n].distance===e){const i=t.splice(n,1);return this.remove(i[0].object),!0}return!1}getCurrentLevel(){return this._currentLevel}getObjectForDistance(e){const t=this.levels;if(t.length>0){let n,i;for(n=1,i=t.length;n<i;n++){let r=t[n].distance;if(t[n].object.visible&&(r-=r*t[n].hysteresis),e<r)break}return t[n-1].object}return null}raycast(e,t){if(this.levels.length>0){ea.setFromMatrixPosition(this.matrixWorld);const i=e.ray.origin.distanceTo(ea);this.getObjectForDistance(i).raycast(e,t)}}update(e){const t=this.levels;if(t.length>1){ea.setFromMatrixPosition(e.matrixWorld),If.setFromMatrixPosition(this.matrixWorld);const n=ea.distanceTo(If)/e.zoom;t[0].object.visible=!0;let i,r;for(i=1,r=t.length;i<r;i++){let o=t[i].distance;if(t[i].object.visible&&(o-=o*t[i].hysteresis),n>=o)t[i-1].object.visible=!1,t[i].object.visible=!0;else break}for(this._currentLevel=i-1;i<r;i++)t[i].object.visible=!1}}toJSON(e){const t=super.toJSON(e);this.autoUpdate===!1&&(t.object.autoUpdate=!1),t.object.levels=[];const n=this.levels;for(let i=0,r=n.length;i<r;i++){const o=n[i];t.object.levels.push({object:o.object.uuid,distance:o.distance,hysteresis:o.hysteresis})}return t}}const Pf=new L,Uf=new dt,Df=new dt,tM=new L,Lf=new rt,ta=new L,Uc=new qt,Ff=new rt,Dc=new Er;class im extends Rt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=uu,this.bindMatrix=new rt,this.bindMatrixInverse=new rt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Xt),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ta),this.boundingBox.expandByPoint(ta)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new qt),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ta),this.boundingSphere.expandByPoint(ta)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Uc.copy(this.boundingSphere),Uc.applyMatrix4(i),e.ray.intersectsSphere(Uc)!==!1&&(Ff.copy(i).invert(),Dc.copy(e.ray).applyMatrix4(Ff),!(this.boundingBox!==null&&Dc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Dc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new dt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===uu?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Tp&&this.bindMatrixInverse.copy(this.bindMatrix).invert()}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Uf.fromBufferAttribute(i.attributes.skinIndex,e),Df.fromBufferAttribute(i.attributes.skinWeight,e),Pf.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const o=Df.getComponent(r);if(o!==0){const a=Uf.getComponent(r);Lf.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(tM.copy(Pf).applyMatrix4(Lf),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Qu extends xt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class ii extends Ft{constructor(e=null,t=1,n=1,i,r,o,a,l,c=tn,u=tn,h,f){super(null,o,a,l,c,u,i,r,h,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Of=new rt,nM=new rt;class Bl{constructor(e=[],t=[]){this.uuid=In(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new rt)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new rt;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,o=e.length;r<o;r++){const a=e[r]?e[r].matrixWorld:nM;Of.multiplyMatrices(a,t[r]),Of.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Bl(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new ii(t,e,e,en,Wt);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const r=e.bones[n];let o=t[r];o===void 0&&(o=new Qu),this.bones.push(o),this.boneInverses.push(new rt().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class Mr extends Tt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const qr=new rt,Nf=new rt,na=[],Bf=new Xt,iM=new rt,ws=new Rt,Es=new qt;class rm extends Rt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Mr(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,iM)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Xt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,qr),Bf.copy(e.boundingBox).applyMatrix4(qr),this.boundingBox.union(Bf)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new qt),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,qr),Es.copy(e.boundingSphere).applyMatrix4(qr),this.boundingSphere.union(Es)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(ws.geometry=this.geometry,ws.material=this.material,ws.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Es.copy(this.boundingSphere),Es.applyMatrix4(n),e.ray.intersectsSphere(Es)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,qr),Nf.multiplyMatrices(n,qr),ws.matrixWorld=Nf,ws.raycast(e,na);for(let o=0,a=na.length;o<a;o++){const l=na[o];l.instanceId=r,l.object=this,t.push(l)}na.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Mr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new ii(new Float32Array(i*this.count),i,this.count,mo,Wt));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=i*e;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}function Lc(s,e){return s-e}function rM(s,e){return s.z-e.z}function sM(s,e){return e.z-s.z}class oM{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,i){const r=this.pool,o=this.list;this.index>=r.length&&r.push({start:-1,count:-1,z:-1,index:-1});const a=r[this.index];o.push(a),this.index++,a.start=e,a.count=t,a.z=n,a.index=i}reset(){this.list.length=0,this.index=0}}const xn=new rt,aM=new We(1,1,1),Fc=new yo,ia=new Xt,$i=new qt,Ts=new L,kf=new L,lM=new L,Oc=new oM,an=new Rt,ra=[];function cM(s,e,t=0){const n=e.itemSize;if(s.isInterleavedBufferAttribute||s.array.constructor!==e.array.constructor){const i=s.count;for(let r=0;r<i;r++)for(let o=0;o<n;o++)e.setComponent(r+t,o,s.getComponent(r,o))}else e.array.set(s.array,t*n);e.needsUpdate=!0}function ji(s,e){if(s.constructor!==e.constructor){const t=Math.min(s.length,e.length);for(let n=0;n<t;n++)e[n]=s[n]}else{const t=Math.min(s.length,e.length);e.set(new s.constructor(s.buffer,0,t))}}class sm extends Rt{get maxInstanceCount(){return this._maxInstanceCount}get instanceCount(){return this._instanceInfo.length-this._availableInstanceIds.length}get unusedVertexCount(){return this._maxVertexCount-this._nextVertexStart}get unusedIndexCount(){return this._maxIndexCount-this._nextIndexStart}constructor(e,t,n=t*2,i){super(new pt,i),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._instanceInfo=[],this._geometryInfo=[],this._availableInstanceIds=[],this._availableGeometryIds=[],this._nextIndexStart=0,this._nextVertexStart=0,this._geometryCount=0,this._visibilityChanged=!0,this._geometryInitialized=!1,this._maxInstanceCount=e,this._maxVertexCount=t,this._maxIndexCount=n,this._multiDrawCounts=new Int32Array(e),this._multiDrawStarts=new Int32Array(e),this._multiDrawCount=0,this._multiDrawInstances=null,this._matricesTexture=null,this._indirectTexture=null,this._colorsTexture=null,this._initMatricesTexture(),this._initIndirectTexture()}_initMatricesTexture(){let e=Math.sqrt(this._maxInstanceCount*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4),n=new ii(t,e,e,en,Wt);this._matricesTexture=n}_initIndirectTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);const t=new Uint32Array(e*e),n=new ii(t,e,e,go,bi);this._indirectTexture=n}_initColorsTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);const t=new Float32Array(e*e*4).fill(1),n=new ii(t,e,e,en,Wt);n.colorSpace=_t.workingColorSpace,this._colorsTexture=n}_initializeGeometry(e){const t=this.geometry,n=this._maxVertexCount,i=this._maxIndexCount;if(this._geometryInitialized===!1){for(const r in e.attributes){const o=e.getAttribute(r),{array:a,itemSize:l,normalized:c}=o,u=new a.constructor(n*l),h=new Tt(u,l,c);t.setAttribute(r,h)}if(e.getIndex()!==null){const r=n>65535?new Uint32Array(i):new Uint16Array(i);t.setIndex(new Tt(r,1))}this._geometryInitialized=!0}}_validateGeometry(e){const t=this.geometry;if(!!e.getIndex()!=!!t.getIndex())throw new Error('BatchedMesh: All geometries must consistently have "index".');for(const n in t.attributes){if(!e.hasAttribute(n))throw new Error(`BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);const i=e.getAttribute(n),r=t.getAttribute(n);if(i.itemSize!==r.itemSize||i.normalized!==r.normalized)throw new Error("BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}setCustomSort(e){return this.customSort=e,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Xt);const e=this.boundingBox,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;const r=t[n].geometryIndex;this.getMatrixAt(n,xn),this.getBoundingBoxAt(r,ia).applyMatrix4(xn),e.union(ia)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new qt);const e=this.boundingSphere,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;const r=t[n].geometryIndex;this.getMatrixAt(n,xn),this.getBoundingSphereAt(r,$i).applyMatrix4(xn),e.union($i)}}addInstance(e){if(this._instanceInfo.length>=this.maxInstanceCount&&this._availableInstanceIds.length===0)throw new Error("BatchedMesh: Maximum item count reached.");const n={visible:!0,active:!0,geometryIndex:e};let i=null;this._availableInstanceIds.length>0?(this._availableInstanceIds.sort(Lc),i=this._availableInstanceIds.shift(),this._instanceInfo[i]=n):(i=this._instanceInfo.length,this._instanceInfo.push(n));const r=this._matricesTexture;xn.identity().toArray(r.image.data,i*16),r.needsUpdate=!0;const o=this._colorsTexture;return o&&(aM.toArray(o.image.data,i*4),o.needsUpdate=!0),this._visibilityChanged=!0,i}addGeometry(e,t=-1,n=-1){this._initializeGeometry(e),this._validateGeometry(e);const i={vertexStart:-1,vertexCount:-1,reservedVertexCount:-1,indexStart:-1,indexCount:-1,reservedIndexCount:-1,start:-1,count:-1,boundingBox:null,boundingSphere:null,active:!0},r=this._geometryInfo;i.vertexStart=this._nextVertexStart,i.reservedVertexCount=t===-1?e.getAttribute("position").count:t;const o=e.getIndex();if(o!==null&&(i.indexStart=this._nextIndexStart,i.reservedIndexCount=n===-1?o.count:n),i.indexStart!==-1&&i.indexStart+i.reservedIndexCount>this._maxIndexCount||i.vertexStart+i.reservedVertexCount>this._maxVertexCount)throw new Error("BatchedMesh: Reserved space request exceeds the maximum buffer size.");let l;return this._availableGeometryIds.length>0?(this._availableGeometryIds.sort(Lc),l=this._availableGeometryIds.shift(),r[l]=i):(l=this._geometryCount,this._geometryCount++,r.push(i)),this.setGeometryAt(l,e),this._nextIndexStart=i.indexStart+i.reservedIndexCount,this._nextVertexStart=i.vertexStart+i.reservedVertexCount,l}setGeometryAt(e,t){if(e>=this._geometryCount)throw new Error("BatchedMesh: Maximum geometry count reached.");this._validateGeometry(t);const n=this.geometry,i=n.getIndex()!==null,r=n.getIndex(),o=t.getIndex(),a=this._geometryInfo[e];if(i&&o.count>a.reservedIndexCount||t.attributes.position.count>a.reservedVertexCount)throw new Error("BatchedMesh: Reserved space not large enough for provided geometry.");const l=a.vertexStart,c=a.reservedVertexCount;a.vertexCount=t.getAttribute("position").count;for(const u in n.attributes){const h=t.getAttribute(u),f=n.getAttribute(u);cM(h,f,l);const d=h.itemSize;for(let p=h.count,v=c;p<v;p++){const g=l+p;for(let m=0;m<d;m++)f.setComponent(g,m,0)}f.needsUpdate=!0,f.addUpdateRange(l*d,c*d)}if(i){const u=a.indexStart,h=a.reservedIndexCount;a.indexCount=t.getIndex().count;for(let f=0;f<o.count;f++)r.setX(u+f,l+o.getX(f));for(let f=o.count,d=h;f<d;f++)r.setX(u+f,l);r.needsUpdate=!0,r.addUpdateRange(u,a.reservedIndexCount)}return a.start=i?a.indexStart:a.vertexStart,a.count=i?a.indexCount:a.vertexCount,a.boundingBox=null,t.boundingBox!==null&&(a.boundingBox=t.boundingBox.clone()),a.boundingSphere=null,t.boundingSphere!==null&&(a.boundingSphere=t.boundingSphere.clone()),this._visibilityChanged=!0,e}deleteGeometry(e){const t=this._geometryInfo;if(e>=t.length||t[e].active===!1)return this;const n=this._instanceInfo;for(let i=0,r=n.length;i<r;i++)n[i].geometryIndex===e&&this.deleteInstance(i);return t[e].active=!1,this._availableGeometryIds.push(e),this._visibilityChanged=!0,this}deleteInstance(e){const t=this._instanceInfo;return e>=t.length||t[e].active===!1?this:(t[e].active=!1,this._availableInstanceIds.push(e),this._visibilityChanged=!0,this)}optimize(){let e=0,t=0;const n=this._geometryInfo,i=n.map((o,a)=>a).sort((o,a)=>n[o].vertexStart-n[a].vertexStart),r=this.geometry;for(let o=0,a=n.length;o<a;o++){const l=i[o],c=n[l];if(c.active!==!1){if(r.index!==null){if(c.indexStart!==t){const{indexStart:u,vertexStart:h,reservedIndexCount:f}=c,d=r.index,p=d.array,v=e-h;for(let g=u;g<u+f;g++)p[g]=p[g]+v;d.array.copyWithin(t,u,u+f),d.addUpdateRange(t,f),c.indexStart=t}t+=c.reservedIndexCount}if(c.vertexStart!==e){const{vertexStart:u,reservedVertexCount:h}=c,f=r.attributes;for(const d in f){const p=f[d],{array:v,itemSize:g}=p;v.copyWithin(e*g,u*g,(u+h)*g),p.addUpdateRange(e*g,h*g)}c.vertexStart=e}e+=c.reservedVertexCount,c.start=r.index?c.indexStart:c.vertexStart,this._nextIndexStart=r.index?c.indexStart+c.reservedIndexCount:0,this._nextVertexStart=c.vertexStart+c.reservedVertexCount}}return this}getBoundingBoxAt(e,t){if(e>=this._geometryCount)return null;const n=this.geometry,i=this._geometryInfo[e];if(i.boundingBox===null){const r=new Xt,o=n.index,a=n.attributes.position;for(let l=i.start,c=i.start+i.count;l<c;l++){let u=l;o&&(u=o.getX(u)),r.expandByPoint(Ts.fromBufferAttribute(a,u))}i.boundingBox=r}return t.copy(i.boundingBox),t}getBoundingSphereAt(e,t){if(e>=this._geometryCount)return null;const n=this.geometry,i=this._geometryInfo[e];if(i.boundingSphere===null){const r=new qt;this.getBoundingBoxAt(e,ia),ia.getCenter(r.center);const o=n.index,a=n.attributes.position;let l=0;for(let c=i.start,u=i.start+i.count;c<u;c++){let h=c;o&&(h=o.getX(h)),Ts.fromBufferAttribute(a,h),l=Math.max(l,r.center.distanceToSquared(Ts))}r.radius=Math.sqrt(l),i.boundingSphere=r}return t.copy(i.boundingSphere),t}setMatrixAt(e,t){const n=this._instanceInfo,i=this._matricesTexture,r=this._matricesTexture.image.data;return e>=n.length||n[e].active===!1?this:(t.toArray(r,e*16),i.needsUpdate=!0,this)}getMatrixAt(e,t){const n=this._instanceInfo,i=this._matricesTexture.image.data;return e>=n.length||n[e].active===!1?null:t.fromArray(i,e*16)}setColorAt(e,t){this._colorsTexture===null&&this._initColorsTexture();const n=this._colorsTexture,i=this._colorsTexture.image.data,r=this._instanceInfo;return e>=r.length||r[e].active===!1?this:(t.toArray(i,e*4),n.needsUpdate=!0,this)}getColorAt(e,t){const n=this._colorsTexture.image.data,i=this._instanceInfo;return e>=i.length||i[e].active===!1?null:t.fromArray(n,e*4)}setVisibleAt(e,t){const n=this._instanceInfo;return e>=n.length||n[e].active===!1||n[e].visible===t?this:(n[e].visible=t,this._visibilityChanged=!0,this)}getVisibleAt(e){const t=this._instanceInfo;return e>=t.length||t[e].active===!1?!1:t[e].visible}setGeometryIdAt(e,t){const n=this._instanceInfo,i=this._geometryInfo;return e>=n.length||n[e].active===!1||t>=i.length||i[t].active===!1?null:(n[e].geometryIndex=t,this)}getGeometryIdAt(e){const t=this._instanceInfo;return e>=t.length||t[e].active===!1?-1:t[e].geometryIndex}getGeometryRangeAt(e,t={}){if(e<0||e>=this._geometryCount)return null;const n=this._geometryInfo[e];return t.vertexStart=n.vertexStart,t.vertexCount=n.vertexCount,t.reservedVertexCount=n.reservedVertexCount,t.indexStart=n.indexStart,t.indexCount=n.indexCount,t.reservedIndexCount=n.reservedIndexCount,t.start=n.start,t.count=n.count,t}setInstanceCount(e){const t=this._availableInstanceIds,n=this._instanceInfo;for(t.sort(Lc);t[t.length-1]===n.length;)n.pop(),t.pop();if(e<n.length)throw new Error(`BatchedMesh: Instance ids outside the range ${e} are being used. Cannot shrink instance count.`);const i=new Int32Array(e),r=new Int32Array(e);ji(this._multiDrawCounts,i),ji(this._multiDrawStarts,r),this._multiDrawCounts=i,this._multiDrawStarts=r,this._maxInstanceCount=e;const o=this._indirectTexture,a=this._matricesTexture,l=this._colorsTexture;o.dispose(),this._initIndirectTexture(),ji(o.image.data,this._indirectTexture.image.data),a.dispose(),this._initMatricesTexture(),ji(a.image.data,this._matricesTexture.image.data),l&&(l.dispose(),this._initColorsTexture(),ji(l.image.data,this._colorsTexture.image.data))}setGeometrySize(e,t){const n=[...this._geometryInfo].filter(a=>a.active);if(Math.max(...n.map(a=>a.vertexStart+a.reservedVertexCount))>e)throw new Error(`BatchedMesh: Geometry vertex values are being used outside the range ${t}. Cannot shrink further.`);if(this.geometry.index&&Math.max(...n.map(l=>l.indexStart+l.reservedIndexCount))>t)throw new Error(`BatchedMesh: Geometry index values are being used outside the range ${t}. Cannot shrink further.`);const r=this.geometry;r.dispose(),this._maxVertexCount=e,this._maxIndexCount=t,this._geometryInitialized&&(this._geometryInitialized=!1,this.geometry=new pt,this._initializeGeometry(r));const o=this.geometry;r.index&&ji(r.index.array,o.index.array);for(const a in r.attributes)ji(r.attributes[a].array,o.attributes[a].array)}raycast(e,t){const n=this._instanceInfo,i=this._geometryInfo,r=this.matrixWorld,o=this.geometry;an.material=this.material,an.geometry.index=o.index,an.geometry.attributes=o.attributes,an.geometry.boundingBox===null&&(an.geometry.boundingBox=new Xt),an.geometry.boundingSphere===null&&(an.geometry.boundingSphere=new qt);for(let a=0,l=n.length;a<l;a++){if(!n[a].visible||!n[a].active)continue;const c=n[a].geometryIndex,u=i[c];an.geometry.setDrawRange(u.start,u.count),this.getMatrixAt(a,an.matrixWorld).premultiply(r),this.getBoundingBoxAt(c,an.geometry.boundingBox),this.getBoundingSphereAt(c,an.geometry.boundingSphere),an.raycast(e,ra);for(let h=0,f=ra.length;h<f;h++){const d=ra[h];d.object=this,d.batchId=a,t.push(d)}ra.length=0}an.material=null,an.geometry.index=null,an.geometry.attributes={},an.geometry.setDrawRange(0,1/0)}copy(e){return super.copy(e),this.geometry=e.geometry.clone(),this.perObjectFrustumCulled=e.perObjectFrustumCulled,this.sortObjects=e.sortObjects,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this._geometryInfo=e._geometryInfo.map(t=>({...t,boundingBox:t.boundingBox!==null?t.boundingBox.clone():null,boundingSphere:t.boundingSphere!==null?t.boundingSphere.clone():null})),this._instanceInfo=e._instanceInfo.map(t=>({...t})),this._maxInstanceCount=e._maxInstanceCount,this._maxVertexCount=e._maxVertexCount,this._maxIndexCount=e._maxIndexCount,this._geometryInitialized=e._geometryInitialized,this._geometryCount=e._geometryCount,this._multiDrawCounts=e._multiDrawCounts.slice(),this._multiDrawStarts=e._multiDrawStarts.slice(),this._matricesTexture=e._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.data.slice(),this._colorsTexture!==null&&(this._colorsTexture=e._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.data.slice()),this}dispose(){return this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this._indirectTexture.dispose(),this._indirectTexture=null,this._colorsTexture!==null&&(this._colorsTexture.dispose(),this._colorsTexture=null),this}onBeforeRender(e,t,n,i,r){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;const o=i.getIndex(),a=o===null?1:o.array.BYTES_PER_ELEMENT,l=this._instanceInfo,c=this._multiDrawStarts,u=this._multiDrawCounts,h=this._geometryInfo,f=this.perObjectFrustumCulled,d=this._indirectTexture,p=d.image.data;f&&(xn.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse).multiply(this.matrixWorld),Fc.setFromProjectionMatrix(xn,e.coordinateSystem));let v=0;if(this.sortObjects){xn.copy(this.matrixWorld).invert(),Ts.setFromMatrixPosition(n.matrixWorld).applyMatrix4(xn),kf.set(0,0,-1).transformDirection(n.matrixWorld).transformDirection(xn);for(let x=0,_=l.length;x<_;x++)if(l[x].visible&&l[x].active){const y=l[x].geometryIndex;this.getMatrixAt(x,xn),this.getBoundingSphereAt(y,$i).applyMatrix4(xn);let A=!1;if(f&&(A=!Fc.intersectsSphere($i)),!A){const b=h[y],T=lM.subVectors($i.center,Ts).dot(kf);Oc.push(b.start,b.count,T,x)}}const g=Oc.list,m=this.customSort;m===null?g.sort(r.transparent?sM:rM):m.call(this,g,n);for(let x=0,_=g.length;x<_;x++){const y=g[x];c[v]=y.start*a,u[v]=y.count,p[v]=y.index,v++}Oc.reset()}else for(let g=0,m=l.length;g<m;g++)if(l[g].visible&&l[g].active){const x=l[g].geometryIndex;let _=!1;if(f&&(this.getMatrixAt(g,xn),this.getBoundingSphereAt(x,$i).applyMatrix4(xn),_=!Fc.intersectsSphere($i)),!_){const y=h[x];c[v]=y.start*a,u[v]=y.count,p[v]=g,v++}}d.needsUpdate=!0,this._multiDrawCount=v,this._visibilityChanged=!1}onBeforeShadow(e,t,n,i,r,o){this.onBeforeRender(e,null,i,r,o)}}class vn extends un{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new We(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const _l=new L,xl=new L,zf=new rt,As=new Er,sa=new qt,Nc=new L,Gf=new L;let ki=class extends xt{constructor(e=new pt,t=new vn){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)_l.fromBufferAttribute(t,i-1),xl.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=_l.distanceTo(xl);e.setAttribute("lineDistance",new je(n,1))}return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),sa.copy(n.boundingSphere),sa.applyMatrix4(i),sa.radius+=r,e.ray.intersectsSphere(sa)===!1)return;zf.copy(i).invert(),As.copy(e.ray).applyMatrix4(zf);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){const d=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let v=d,g=p-1;v<g;v+=c){const m=u.getX(v),x=u.getX(v+1),_=oa(this,e,As,l,m,x);_&&t.push(_)}if(this.isLineLoop){const v=u.getX(p-1),g=u.getX(d),m=oa(this,e,As,l,v,g);m&&t.push(m)}}else{const d=Math.max(0,o.start),p=Math.min(f.count,o.start+o.count);for(let v=d,g=p-1;v<g;v+=c){const m=oa(this,e,As,l,v,v+1);m&&t.push(m)}if(this.isLineLoop){const v=oa(this,e,As,l,p-1,d);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function oa(s,e,t,n,i,r){const o=s.geometry.attributes.position;if(_l.fromBufferAttribute(o,i),xl.fromBufferAttribute(o,r),t.distanceSqToSegment(_l,xl,Nc,Gf)>n)return;Nc.applyMatrix4(s.matrixWorld);const l=e.ray.origin.distanceTo(Nc);if(!(l<e.near||l>e.far))return{distance:l,point:Gf.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:s}}const Vf=new L,Hf=new L;class li extends ki{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Vf.fromBufferAttribute(t,i),Hf.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Vf.distanceTo(Hf);e.setAttribute("lineDistance",new je(n,1))}return this}}class om extends ki{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class eh extends un{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new We(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Wf=new rt,gu=new Er,aa=new qt,la=new L;class am extends xt{constructor(e=new pt,t=new eh){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),aa.copy(n.boundingSphere),aa.applyMatrix4(i),aa.radius+=r,e.ray.intersectsSphere(aa)===!1)return;Wf.copy(i).invert(),gu.copy(e.ray).applyMatrix4(Wf);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,h=n.attributes.position;if(c!==null){const f=Math.max(0,o.start),d=Math.min(c.count,o.start+o.count);for(let p=f,v=d;p<v;p++){const g=c.getX(p);la.fromBufferAttribute(h,g),Xf(la,g,l,i,e,t,this)}}else{const f=Math.max(0,o.start),d=Math.min(h.count,o.start+o.count);for(let p=f,v=d;p<v;p++)la.fromBufferAttribute(h,p),Xf(la,p,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Xf(s,e,t,n,i,r,o){const a=gu.distanceSqToPoint(s);if(a<t){const l=new L;gu.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class uM extends Ft{constructor(e,t,n,i,r,o,a,l,c){super(e,t,n,i,r,o,a,l,c),this.isVideoTexture=!0,this.minFilter=o!==void 0?o:Ut,this.magFilter=r!==void 0?r:Ut,this.generateMipmaps=!1;const u=this;function h(){u.needsUpdate=!0,e.requestVideoFrameCallback(h)}"requestVideoFrameCallback"in e&&e.requestVideoFrameCallback(h)}clone(){return new this.constructor(this.image).copy(this)}update(){const e=this.image;"requestVideoFrameCallback"in e===!1&&e.readyState>=e.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}}class hM extends Ft{constructor(e,t){super({width:e,height:t}),this.isFramebufferTexture=!0,this.magFilter=tn,this.minFilter=tn,this.generateMipmaps=!1,this.needsUpdate=!0}}class kl extends Ft{constructor(e,t,n,i,r,o,a,l,c,u,h,f){super(null,o,a,l,c,u,i,r,h,f),this.isCompressedTexture=!0,this.image={width:t,height:n},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}}class fM extends kl{constructor(e,t,n,i,r,o){super(e,t,n,r,o),this.isCompressedArrayTexture=!0,this.image.depth=i,this.wrapR=Nn,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class dM extends kl{constructor(e,t,n){super(void 0,e[0].width,e[0].height,t,n,si),this.isCompressedCubeTexture=!0,this.isCubeTexture=!0,this.image=e}}class pM extends Ft{constructor(e,t,n,i,r,o,a,l,c){super(e,t,n,i,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class qn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let i=0;const r=n.length;let o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(r-1);const u=n[i],f=n[i+1]-u,d=(o-u)/f;return(i+d)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);const o=this.getPoint(i),a=this.getPoint(r),l=t||(o.isVector2?new pe:new L);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new L,i=[],r=[],o=[],a=new L,l=new rt;for(let d=0;d<=e;d++){const p=d/e;i[d]=this.getTangentAt(p,new L)}r[0]=new L,o[0]=new L;let c=Number.MAX_VALUE;const u=Math.abs(i[0].x),h=Math.abs(i[0].y),f=Math.abs(i[0].z);u<=c&&(c=u,n.set(1,0,0)),h<=c&&(c=h,n.set(0,1,0)),f<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let d=1;d<=e;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(i[d-1],i[d]),a.length()>Number.EPSILON){a.normalize();const p=Math.acos(kt(i[d-1].dot(i[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(a,p))}o[d].crossVectors(i[d],r[d])}if(t===!0){let d=Math.acos(kt(r[0].dot(r[e]),-1,1));d/=e,i[0].dot(a.crossVectors(r[0],r[e]))>0&&(d=-d);for(let p=1;p<=e;p++)r[p].applyMatrix4(l.makeRotationAxis(i[p],d*p)),o[p].crossVectors(i[p],r[p])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class zl extends qn{constructor(e=0,t=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new pe){const n=t,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);const a=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*u-d*h+this.aX,c=f*h+d*u+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class lm extends zl{constructor(e,t,n,i,r,o){super(e,t,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function th(){let s=0,e=0,t=0,n=0;function i(r,o,a,l){s=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){i(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,u,h){let f=(o-r)/c-(a-r)/(c+u)+(a-o)/u,d=(a-o)/u-(l-o)/(u+h)+(l-a)/h;f*=u,d*=u,i(o,a,f,d)},calc:function(r){const o=r*r,a=o*r;return s+e*r+t*o+n*a}}}const ca=new L,Bc=new th,kc=new th,zc=new th;class cm extends qn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new L){const n=t,i=this.points,r=i.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,u;this.closed||a>0?c=i[(a-1)%r]:(ca.subVectors(i[0],i[1]).add(i[0]),c=ca);const h=i[a%r],f=i[(a+1)%r];if(this.closed||a+2<r?u=i[(a+2)%r]:(ca.subVectors(i[r-1],i[r-2]).add(i[r-1]),u=ca),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let p=Math.pow(c.distanceToSquared(h),d),v=Math.pow(h.distanceToSquared(f),d),g=Math.pow(f.distanceToSquared(u),d);v<1e-4&&(v=1),p<1e-4&&(p=v),g<1e-4&&(g=v),Bc.initNonuniformCatmullRom(c.x,h.x,f.x,u.x,p,v,g),kc.initNonuniformCatmullRom(c.y,h.y,f.y,u.y,p,v,g),zc.initNonuniformCatmullRom(c.z,h.z,f.z,u.z,p,v,g)}else this.curveType==="catmullrom"&&(Bc.initCatmullRom(c.x,h.x,f.x,u.x,this.tension),kc.initCatmullRom(c.y,h.y,f.y,u.y,this.tension),zc.initCatmullRom(c.z,h.z,f.z,u.z,this.tension));return n.set(Bc.calc(l),kc.calc(l),zc.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new L().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function qf(s,e,t,n,i){const r=(n-e)*.5,o=(i-t)*.5,a=s*s,l=s*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*s+t}function mM(s,e){const t=1-s;return t*t*e}function gM(s,e){return 2*(1-s)*s*e}function vM(s,e){return s*s*e}function Ws(s,e,t,n){return mM(s,e)+gM(s,t)+vM(s,n)}function _M(s,e){const t=1-s;return t*t*t*e}function xM(s,e){const t=1-s;return 3*t*t*s*e}function yM(s,e){return 3*(1-s)*s*s*e}function SM(s,e){return s*s*s*e}function Xs(s,e,t,n,i){return _M(s,e)+xM(s,t)+yM(s,n)+SM(s,i)}class nh extends qn{constructor(e=new pe,t=new pe,n=new pe,i=new pe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new pe){const n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Xs(e,i.x,r.x,o.x,a.x),Xs(e,i.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class um extends qn{constructor(e=new L,t=new L,n=new L,i=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new L){const n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Xs(e,i.x,r.x,o.x,a.x),Xs(e,i.y,r.y,o.y,a.y),Xs(e,i.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class ih extends qn{constructor(e=new pe,t=new pe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new pe){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new pe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class hm extends qn{constructor(e=new L,t=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new L){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new L){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class rh extends qn{constructor(e=new pe,t=new pe,n=new pe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new pe){const n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(Ws(e,i.x,r.x,o.x),Ws(e,i.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class sh extends qn{constructor(e=new L,t=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new L){const n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(Ws(e,i.x,r.x,o.x),Ws(e,i.y,r.y,o.y),Ws(e,i.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class oh extends qn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new pe){const n=t,i=this.points,r=(i.length-1)*e,o=Math.floor(r),a=r-o,l=i[o===0?o:o-1],c=i[o],u=i[o>i.length-2?i.length-1:o+1],h=i[o>i.length-3?i.length-1:o+2];return n.set(qf(a,l.x,c.x,u.x,h.x),qf(a,l.y,c.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new pe().fromArray(i))}return this}}var yl=Object.freeze({__proto__:null,ArcCurve:lm,CatmullRomCurve3:cm,CubicBezierCurve:nh,CubicBezierCurve3:um,EllipseCurve:zl,LineCurve:ih,LineCurve3:hm,QuadraticBezierCurve:rh,QuadraticBezierCurve3:sh,SplineCurve:oh});class fm extends qn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new yl[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const o=i[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const o=r[i],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const u=l[c];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new yl[i.type]().fromJSON(i))}return this}}class no extends fm{constructor(e){super(),this.type="Path",this.currentPoint=new pe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new ih(this.currentPoint.clone(),new pe(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const r=new rh(this.currentPoint.clone(),new pe(e,t),new pe(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,o){const a=new nh(this.currentPoint.clone(),new pe(e,t),new pe(n,i),new pe(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new oh(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,i,r,o),this}absarc(e,t,n,i,r,o){return this.absellipse(e,t,n,n,i,r,o),this}ellipse(e,t,n,i,r,o,a,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,n,i,r,o,a,l),this}absellipse(e,t,n,i,r,o,a,l){const c=new zl(e,t,n,i,r,o,a,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Mo extends pt{constructor(e=[new pe(0,-.5),new pe(.5,0),new pe(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=kt(i,0,Math.PI*2);const r=[],o=[],a=[],l=[],c=[],u=1/t,h=new L,f=new pe,d=new L,p=new L,v=new L;let g=0,m=0;for(let x=0;x<=e.length-1;x++)switch(x){case 0:g=e[x+1].x-e[x].x,m=e[x+1].y-e[x].y,d.x=m*1,d.y=-g,d.z=m*0,v.copy(d),d.normalize(),l.push(d.x,d.y,d.z);break;case e.length-1:l.push(v.x,v.y,v.z);break;default:g=e[x+1].x-e[x].x,m=e[x+1].y-e[x].y,d.x=m*1,d.y=-g,d.z=m*0,p.copy(d),d.x+=v.x,d.y+=v.y,d.z+=v.z,d.normalize(),l.push(d.x,d.y,d.z),v.copy(p)}for(let x=0;x<=t;x++){const _=n+x*u*i,y=Math.sin(_),A=Math.cos(_);for(let b=0;b<=e.length-1;b++){h.x=e[b].x*y,h.y=e[b].y,h.z=e[b].x*A,o.push(h.x,h.y,h.z),f.x=x/t,f.y=b/(e.length-1),a.push(f.x,f.y);const T=l[3*b+0]*y,w=l[3*b+1],M=l[3*b+0]*A;c.push(T,w,M)}}for(let x=0;x<t;x++)for(let _=0;_<e.length-1;_++){const y=_+x*e.length,A=y,b=y+e.length,T=y+e.length+1,w=y+1;r.push(A,b,w),r.push(T,w,b)}this.setIndex(r),this.setAttribute("position",new je(o,3)),this.setAttribute("uv",new je(a,2)),this.setAttribute("normal",new je(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mo(e.points,e.segments,e.phiStart,e.phiLength)}}class Gl extends Mo{constructor(e=1,t=1,n=4,i=8){const r=new no;r.absarc(0,-t/2,e,Math.PI*1.5,0),r.absarc(0,t/2,e,0,Math.PI*.5),super(r.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:n,radialSegments:i}}static fromJSON(e){return new Gl(e.radius,e.length,e.capSegments,e.radialSegments)}}class Vl extends pt{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const r=[],o=[],a=[],l=[],c=new L,u=new pe;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let h=0,f=3;h<=t;h++,f+=3){const d=n+h/t*i;c.x=e*Math.cos(d),c.y=e*Math.sin(d),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[f]/e+1)/2,u.y=(o[f+1]/e+1)/2,l.push(u.x,u.y)}for(let h=1;h<=t;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new je(o,3)),this.setAttribute("normal",new je(a,3)),this.setAttribute("uv",new je(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vl(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class gs extends pt{constructor(e=1,t=1,n=1,i=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const u=[],h=[],f=[],d=[];let p=0;const v=[],g=n/2;let m=0;x(),o===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(u),this.setAttribute("position",new je(h,3)),this.setAttribute("normal",new je(f,3)),this.setAttribute("uv",new je(d,2));function x(){const y=new L,A=new L;let b=0;const T=(t-e)/n;for(let w=0;w<=r;w++){const M=[],S=w/r,R=S*(t-e)+e;for(let P=0;P<=i;P++){const F=P/i,U=F*l+a,G=Math.sin(U),B=Math.cos(U);A.x=R*G,A.y=-S*n+g,A.z=R*B,h.push(A.x,A.y,A.z),y.set(G,T,B).normalize(),f.push(y.x,y.y,y.z),d.push(F,1-S),M.push(p++)}v.push(M)}for(let w=0;w<i;w++)for(let M=0;M<r;M++){const S=v[M][w],R=v[M+1][w],P=v[M+1][w+1],F=v[M][w+1];(e>0||M!==0)&&(u.push(S,R,F),b+=3),(t>0||M!==r-1)&&(u.push(R,P,F),b+=3)}c.addGroup(m,b,0),m+=b}function _(y){const A=p,b=new pe,T=new L;let w=0;const M=y===!0?e:t,S=y===!0?1:-1;for(let P=1;P<=i;P++)h.push(0,g*S,0),f.push(0,S,0),d.push(.5,.5),p++;const R=p;for(let P=0;P<=i;P++){const U=P/i*l+a,G=Math.cos(U),B=Math.sin(U);T.x=M*B,T.y=g*S,T.z=M*G,h.push(T.x,T.y,T.z),f.push(0,S,0),b.x=G*.5+.5,b.y=B*.5*S+.5,d.push(b.x,b.y),p++}for(let P=0;P<i;P++){const F=A+P,U=R+P;y===!0?u.push(U,U+1,F):u.push(U+1,U,F),w+=3}c.addGroup(m,w,y===!0?1:2),m+=w}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gs(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Hl extends gs{constructor(e=1,t=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Hl(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Gi extends pt{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const r=[],o=[];a(i),c(n),u(),this.setAttribute("position",new je(r,3)),this.setAttribute("normal",new je(r.slice(),3)),this.setAttribute("uv",new je(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(x){const _=new L,y=new L,A=new L;for(let b=0;b<t.length;b+=3)d(t[b+0],_),d(t[b+1],y),d(t[b+2],A),l(_,y,A,x)}function l(x,_,y,A){const b=A+1,T=[];for(let w=0;w<=b;w++){T[w]=[];const M=x.clone().lerp(y,w/b),S=_.clone().lerp(y,w/b),R=b-w;for(let P=0;P<=R;P++)P===0&&w===b?T[w][P]=M:T[w][P]=M.clone().lerp(S,P/R)}for(let w=0;w<b;w++)for(let M=0;M<2*(b-w)-1;M++){const S=Math.floor(M/2);M%2===0?(f(T[w][S+1]),f(T[w+1][S]),f(T[w][S])):(f(T[w][S+1]),f(T[w+1][S+1]),f(T[w+1][S]))}}function c(x){const _=new L;for(let y=0;y<r.length;y+=3)_.x=r[y+0],_.y=r[y+1],_.z=r[y+2],_.normalize().multiplyScalar(x),r[y+0]=_.x,r[y+1]=_.y,r[y+2]=_.z}function u(){const x=new L;for(let _=0;_<r.length;_+=3){x.x=r[_+0],x.y=r[_+1],x.z=r[_+2];const y=g(x)/2/Math.PI+.5,A=m(x)/Math.PI+.5;o.push(y,1-A)}p(),h()}function h(){for(let x=0;x<o.length;x+=6){const _=o[x+0],y=o[x+2],A=o[x+4],b=Math.max(_,y,A),T=Math.min(_,y,A);b>.9&&T<.1&&(_<.2&&(o[x+0]+=1),y<.2&&(o[x+2]+=1),A<.2&&(o[x+4]+=1))}}function f(x){r.push(x.x,x.y,x.z)}function d(x,_){const y=x*3;_.x=e[y+0],_.y=e[y+1],_.z=e[y+2]}function p(){const x=new L,_=new L,y=new L,A=new L,b=new pe,T=new pe,w=new pe;for(let M=0,S=0;M<r.length;M+=9,S+=6){x.set(r[M+0],r[M+1],r[M+2]),_.set(r[M+3],r[M+4],r[M+5]),y.set(r[M+6],r[M+7],r[M+8]),b.set(o[S+0],o[S+1]),T.set(o[S+2],o[S+3]),w.set(o[S+4],o[S+5]),A.copy(x).add(_).add(y).divideScalar(3);const R=g(A);v(b,S+0,x,R),v(T,S+2,_,R),v(w,S+4,y,R)}}function v(x,_,y,A){A<0&&x.x===1&&(o[_]=x.x-1),y.x===0&&y.z===0&&(o[_]=A/2/Math.PI+.5)}function g(x){return Math.atan2(x.z,-x.x)}function m(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gi(e.vertices,e.indices,e.radius,e.details)}}class Wl extends Gi{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Wl(e.radius,e.detail)}}const ua=new L,ha=new L,Gc=new L,fa=new Mn;class dm extends pt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const i=Math.pow(10,4),r=Math.cos(pr*t),o=e.getIndex(),a=e.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],u=["a","b","c"],h=new Array(3),f={},d=[];for(let p=0;p<l;p+=3){o?(c[0]=o.getX(p),c[1]=o.getX(p+1),c[2]=o.getX(p+2)):(c[0]=p,c[1]=p+1,c[2]=p+2);const{a:v,b:g,c:m}=fa;if(v.fromBufferAttribute(a,c[0]),g.fromBufferAttribute(a,c[1]),m.fromBufferAttribute(a,c[2]),fa.getNormal(Gc),h[0]=`${Math.round(v.x*i)},${Math.round(v.y*i)},${Math.round(v.z*i)}`,h[1]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,h[2]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let x=0;x<3;x++){const _=(x+1)%3,y=h[x],A=h[_],b=fa[u[x]],T=fa[u[_]],w=`${y}_${A}`,M=`${A}_${y}`;M in f&&f[M]?(Gc.dot(f[M].normal)<=r&&(d.push(b.x,b.y,b.z),d.push(T.x,T.y,T.z)),f[M]=null):w in f||(f[w]={index0:c[x],index1:c[_],normal:Gc.clone()})}}for(const p in f)if(f[p]){const{index0:v,index1:g}=f[p];ua.fromBufferAttribute(a,v),ha.fromBufferAttribute(a,g),d.push(ua.x,ua.y,ua.z),d.push(ha.x,ha.y,ha.z)}this.setAttribute("position",new je(d,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class gr extends no{constructor(e){super(e),this.uuid=In(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(new no().fromJSON(i))}return this}}const MM={triangulate:function(s,e,t=2){const n=e&&e.length,i=n?e[0]*t:s.length;let r=pm(s,0,i,t,!0);const o=[];if(!r||r.next===r.prev)return o;let a,l,c,u,h,f,d;if(n&&(r=AM(s,e,r,t)),s.length>80*t){a=c=s[0],l=u=s[1];for(let p=t;p<i;p+=t)h=s[p],f=s[p+1],h<a&&(a=h),f<l&&(l=f),h>c&&(c=h),f>u&&(u=f);d=Math.max(c-a,u-l),d=d!==0?32767/d:0}return io(r,o,t,a,l,d,0),o}};function pm(s,e,t,n,i){let r,o;if(i===BM(s,e,t,n)>0)for(r=e;r<t;r+=n)o=Yf(r,s[r],s[r+1],o);else for(r=t-n;r>=e;r-=n)o=Yf(r,s[r],s[r+1],o);return o&&Xl(o,o.next)&&(so(o),o=o.next),o}function br(s,e){if(!s)return s;e||(e=s);let t=s,n;do if(n=!1,!t.steiner&&(Xl(t,t.next)||Lt(t.prev,t,t.next)===0)){if(so(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function io(s,e,t,n,i,r,o){if(!s)return;!o&&r&&UM(s,n,i,r);let a=s,l,c;for(;s.prev!==s.next;){if(l=s.prev,c=s.next,r?wM(s,n,i,r):bM(s)){e.push(l.i/t|0),e.push(s.i/t|0),e.push(c.i/t|0),so(s),s=c.next,a=c.next;continue}if(s=c,s===a){o?o===1?(s=EM(br(s),e,t),io(s,e,t,n,i,r,2)):o===2&&TM(s,e,t,n,i,r):io(br(s),e,t,n,i,r,1);break}}}function bM(s){const e=s.prev,t=s,n=s.next;if(Lt(e,t,n)>=0)return!1;const i=e.x,r=t.x,o=n.x,a=e.y,l=t.y,c=n.y,u=i<r?i<o?i:o:r<o?r:o,h=a<l?a<c?a:c:l<c?l:c,f=i>r?i>o?i:o:r>o?r:o,d=a>l?a>c?a:c:l>c?l:c;let p=n.next;for(;p!==e;){if(p.x>=u&&p.x<=f&&p.y>=h&&p.y<=d&&rs(i,a,r,l,o,c,p.x,p.y)&&Lt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function wM(s,e,t,n){const i=s.prev,r=s,o=s.next;if(Lt(i,r,o)>=0)return!1;const a=i.x,l=r.x,c=o.x,u=i.y,h=r.y,f=o.y,d=a<l?a<c?a:c:l<c?l:c,p=u<h?u<f?u:f:h<f?h:f,v=a>l?a>c?a:c:l>c?l:c,g=u>h?u>f?u:f:h>f?h:f,m=vu(d,p,e,t,n),x=vu(v,g,e,t,n);let _=s.prevZ,y=s.nextZ;for(;_&&_.z>=m&&y&&y.z<=x;){if(_.x>=d&&_.x<=v&&_.y>=p&&_.y<=g&&_!==i&&_!==o&&rs(a,u,l,h,c,f,_.x,_.y)&&Lt(_.prev,_,_.next)>=0||(_=_.prevZ,y.x>=d&&y.x<=v&&y.y>=p&&y.y<=g&&y!==i&&y!==o&&rs(a,u,l,h,c,f,y.x,y.y)&&Lt(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;_&&_.z>=m;){if(_.x>=d&&_.x<=v&&_.y>=p&&_.y<=g&&_!==i&&_!==o&&rs(a,u,l,h,c,f,_.x,_.y)&&Lt(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;y&&y.z<=x;){if(y.x>=d&&y.x<=v&&y.y>=p&&y.y<=g&&y!==i&&y!==o&&rs(a,u,l,h,c,f,y.x,y.y)&&Lt(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function EM(s,e,t){let n=s;do{const i=n.prev,r=n.next.next;!Xl(i,r)&&mm(i,n,n.next,r)&&ro(i,r)&&ro(r,i)&&(e.push(i.i/t|0),e.push(n.i/t|0),e.push(r.i/t|0),so(n),so(n.next),n=s=r),n=n.next}while(n!==s);return br(n)}function TM(s,e,t,n,i,r){let o=s;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&FM(o,a)){let l=gm(o,a);o=br(o,o.next),l=br(l,l.next),io(o,e,t,n,i,r,0),io(l,e,t,n,i,r,0);return}a=a.next}o=o.next}while(o!==s)}function AM(s,e,t,n){const i=[];let r,o,a,l,c;for(r=0,o=e.length;r<o;r++)a=e[r]*n,l=r<o-1?e[r+1]*n:s.length,c=pm(s,a,l,n,!1),c===c.next&&(c.steiner=!0),i.push(LM(c));for(i.sort(CM),r=0;r<i.length;r++)t=RM(i[r],t);return t}function CM(s,e){return s.x-e.x}function RM(s,e){const t=IM(s,e);if(!t)return e;const n=gm(t,s);return br(n,n.next),br(t,t.next)}function IM(s,e){let t=e,n=-1/0,i;const r=s.x,o=s.y;do{if(o<=t.y&&o>=t.next.y&&t.next.y!==t.y){const f=t.x+(o-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=r&&f>n&&(n=f,i=t.x<t.next.x?t:t.next,f===r))return i}t=t.next}while(t!==e);if(!i)return null;const a=i,l=i.x,c=i.y;let u=1/0,h;t=i;do r>=t.x&&t.x>=l&&r!==t.x&&rs(o<c?r:n,o,l,c,o<c?n:r,o,t.x,t.y)&&(h=Math.abs(o-t.y)/(r-t.x),ro(t,s)&&(h<u||h===u&&(t.x>i.x||t.x===i.x&&PM(i,t)))&&(i=t,u=h)),t=t.next;while(t!==a);return i}function PM(s,e){return Lt(s.prev,s,e.prev)<0&&Lt(e.next,s,s.next)<0}function UM(s,e,t,n){let i=s;do i.z===0&&(i.z=vu(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,DM(i)}function DM(s){let e,t,n,i,r,o,a,l,c=1;do{for(t=s,s=null,r=null,o=0;t;){for(o++,n=t,a=0,e=0;e<c&&(a++,n=n.nextZ,!!n);e++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||t.z<=n.z)?(i=t,t=t.nextZ,a--):(i=n,n=n.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;t=n}r.nextZ=null,c*=2}while(o>1);return s}function vu(s,e,t,n,i){return s=(s-t)*i|0,e=(e-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function LM(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function rs(s,e,t,n,i,r,o,a){return(i-o)*(e-a)>=(s-o)*(r-a)&&(s-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(i-o)*(n-a)}function FM(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!OM(s,e)&&(ro(s,e)&&ro(e,s)&&NM(s,e)&&(Lt(s.prev,s,e.prev)||Lt(s,e.prev,e))||Xl(s,e)&&Lt(s.prev,s,s.next)>0&&Lt(e.prev,e,e.next)>0)}function Lt(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function Xl(s,e){return s.x===e.x&&s.y===e.y}function mm(s,e,t,n){const i=pa(Lt(s,e,t)),r=pa(Lt(s,e,n)),o=pa(Lt(t,n,s)),a=pa(Lt(t,n,e));return!!(i!==r&&o!==a||i===0&&da(s,t,e)||r===0&&da(s,n,e)||o===0&&da(t,s,n)||a===0&&da(t,e,n))}function da(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function pa(s){return s>0?1:s<0?-1:0}function OM(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&mm(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function ro(s,e){return Lt(s.prev,s,s.next)<0?Lt(s,e,s.next)>=0&&Lt(s,s.prev,e)>=0:Lt(s,e,s.prev)<0||Lt(s,s.next,e)<0}function NM(s,e){let t=s,n=!1;const i=(s.x+e.x)/2,r=(s.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&i<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==s);return n}function gm(s,e){const t=new _u(s.i,s.x,s.y),n=new _u(e.i,e.x,e.y),i=s.next,r=e.prev;return s.next=e,e.prev=s,t.next=i,i.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Yf(s,e,t,n){const i=new _u(s,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function so(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function _u(s,e,t){this.i=s,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function BM(s,e,t,n){let i=0;for(let r=e,o=t-n;r<t;r+=n)i+=(s[o]-s[r])*(s[r+1]+s[o+1]),o=r;return i}class ri{static area(e){const t=e.length;let n=0;for(let i=t-1,r=0;r<t;i=r++)n+=e[i].x*e[r].y-e[r].x*e[i].y;return n*.5}static isClockWise(e){return ri.area(e)<0}static triangulateShape(e,t){const n=[],i=[],r=[];Zf(e),$f(n,e);let o=e.length;t.forEach(Zf);for(let l=0;l<t.length;l++)i.push(o),o+=t[l].length,$f(n,t[l]);const a=MM.triangulate(n,i);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}}function Zf(s){const e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function $f(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}class ql extends pt{constructor(e=new gr([new pe(.5,.5),new pe(-.5,.5),new pe(-.5,-.5),new pe(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,i=[],r=[];for(let a=0,l=e.length;a<l;a++){const c=e[a];o(c)}this.setAttribute("position",new je(i,3)),this.setAttribute("uv",new je(r,2)),this.computeVertexNormals();function o(a){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,h=t.depth!==void 0?t.depth:1;let f=t.bevelEnabled!==void 0?t.bevelEnabled:!0,d=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:d-.1,v=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3;const m=t.extrudePath,x=t.UVGenerator!==void 0?t.UVGenerator:kM;let _,y=!1,A,b,T,w;m&&(_=m.getSpacedPoints(u),y=!0,f=!1,A=m.computeFrenetFrames(u,!1),b=new L,T=new L,w=new L),f||(g=0,d=0,p=0,v=0);const M=a.extractPoints(c);let S=M.shape;const R=M.holes;if(!ri.isClockWise(S)){S=S.reverse();for(let ue=0,xe=R.length;ue<xe;ue++){const N=R[ue];ri.isClockWise(N)&&(R[ue]=N.reverse())}}const F=ri.triangulateShape(S,R),U=S;for(let ue=0,xe=R.length;ue<xe;ue++){const N=R[ue];S=S.concat(N)}function G(ue,xe,N){return ue.clone().addScaledVector(xe,N)}const B=S.length,K=F.length;function Y(ue,xe,N){let Be,ye,Le;const Oe=ue.x-xe.x,$e=ue.y-xe.y,Ne=N.x-ue.x,O=N.y-ue.y,I=Oe*Oe+$e*$e,Q=Oe*O-$e*Ne;if(Math.abs(Q)>Number.EPSILON){const he=Math.sqrt(I),ve=Math.sqrt(Ne*Ne+O*O),ge=xe.x-$e/he,Ee=xe.y+Oe/he,Re=N.x-O/ve,Ie=N.y+Ne/ve,Je=((Re-ge)*O-(Ie-Ee)*Ne)/(Oe*O-$e*Ne);Be=ge+Oe*Je-ue.x,ye=Ee+$e*Je-ue.y;const be=Be*Be+ye*ye;if(be<=2)return new pe(Be,ye);Le=Math.sqrt(be/2)}else{let he=!1;Oe>Number.EPSILON?Ne>Number.EPSILON&&(he=!0):Oe<-Number.EPSILON?Ne<-Number.EPSILON&&(he=!0):Math.sign($e)===Math.sign(O)&&(he=!0),he?(Be=-$e,ye=Oe,Le=Math.sqrt(I)):(Be=Oe,ye=$e,Le=Math.sqrt(I/2))}return new pe(Be/Le,ye/Le)}const le=[];for(let ue=0,xe=U.length,N=xe-1,Be=ue+1;ue<xe;ue++,N++,Be++)N===xe&&(N=0),Be===xe&&(Be=0),le[ue]=Y(U[ue],U[N],U[Be]);const J=[];let Z,re=le.concat();for(let ue=0,xe=R.length;ue<xe;ue++){const N=R[ue];Z=[];for(let Be=0,ye=N.length,Le=ye-1,Oe=Be+1;Be<ye;Be++,Le++,Oe++)Le===ye&&(Le=0),Oe===ye&&(Oe=0),Z[Be]=Y(N[Be],N[Le],N[Oe]);J.push(Z),re=re.concat(Z)}for(let ue=0;ue<g;ue++){const xe=ue/g,N=d*Math.cos(xe*Math.PI/2),Be=p*Math.sin(xe*Math.PI/2)+v;for(let ye=0,Le=U.length;ye<Le;ye++){const Oe=G(U[ye],le[ye],Be);me(Oe.x,Oe.y,-N)}for(let ye=0,Le=R.length;ye<Le;ye++){const Oe=R[ye];Z=J[ye];for(let $e=0,Ne=Oe.length;$e<Ne;$e++){const O=G(Oe[$e],Z[$e],Be);me(O.x,O.y,-N)}}}const ne=p+v;for(let ue=0;ue<B;ue++){const xe=f?G(S[ue],re[ue],ne):S[ue];y?(T.copy(A.normals[0]).multiplyScalar(xe.x),b.copy(A.binormals[0]).multiplyScalar(xe.y),w.copy(_[0]).add(T).add(b),me(w.x,w.y,w.z)):me(xe.x,xe.y,0)}for(let ue=1;ue<=u;ue++)for(let xe=0;xe<B;xe++){const N=f?G(S[xe],re[xe],ne):S[xe];y?(T.copy(A.normals[ue]).multiplyScalar(N.x),b.copy(A.binormals[ue]).multiplyScalar(N.y),w.copy(_[ue]).add(T).add(b),me(w.x,w.y,w.z)):me(N.x,N.y,h/u*ue)}for(let ue=g-1;ue>=0;ue--){const xe=ue/g,N=d*Math.cos(xe*Math.PI/2),Be=p*Math.sin(xe*Math.PI/2)+v;for(let ye=0,Le=U.length;ye<Le;ye++){const Oe=G(U[ye],le[ye],Be);me(Oe.x,Oe.y,h+N)}for(let ye=0,Le=R.length;ye<Le;ye++){const Oe=R[ye];Z=J[ye];for(let $e=0,Ne=Oe.length;$e<Ne;$e++){const O=G(Oe[$e],Z[$e],Be);y?me(O.x,O.y+_[u-1].y,_[u-1].x+N):me(O.x,O.y,h+N)}}}$(),se();function $(){const ue=i.length/3;if(f){let xe=0,N=B*xe;for(let Be=0;Be<K;Be++){const ye=F[Be];Te(ye[2]+N,ye[1]+N,ye[0]+N)}xe=u+g*2,N=B*xe;for(let Be=0;Be<K;Be++){const ye=F[Be];Te(ye[0]+N,ye[1]+N,ye[2]+N)}}else{for(let xe=0;xe<K;xe++){const N=F[xe];Te(N[2],N[1],N[0])}for(let xe=0;xe<K;xe++){const N=F[xe];Te(N[0]+B*u,N[1]+B*u,N[2]+B*u)}}n.addGroup(ue,i.length/3-ue,0)}function se(){const ue=i.length/3;let xe=0;fe(U,xe),xe+=U.length;for(let N=0,Be=R.length;N<Be;N++){const ye=R[N];fe(ye,xe),xe+=ye.length}n.addGroup(ue,i.length/3-ue,1)}function fe(ue,xe){let N=ue.length;for(;--N>=0;){const Be=N;let ye=N-1;ye<0&&(ye=ue.length-1);for(let Le=0,Oe=u+g*2;Le<Oe;Le++){const $e=B*Le,Ne=B*(Le+1),O=xe+Be+$e,I=xe+ye+$e,Q=xe+ye+Ne,he=xe+Be+Ne;qe(O,I,Q,he)}}}function me(ue,xe,N){l.push(ue),l.push(xe),l.push(N)}function Te(ue,xe,N){Fe(ue),Fe(xe),Fe(N);const Be=i.length/3,ye=x.generateTopUV(n,i,Be-3,Be-2,Be-1);Se(ye[0]),Se(ye[1]),Se(ye[2])}function qe(ue,xe,N,Be){Fe(ue),Fe(xe),Fe(Be),Fe(xe),Fe(N),Fe(Be);const ye=i.length/3,Le=x.generateSideWallUV(n,i,ye-6,ye-3,ye-2,ye-1);Se(Le[0]),Se(Le[1]),Se(Le[3]),Se(Le[1]),Se(Le[2]),Se(Le[3])}function Fe(ue){i.push(l[ue*3+0]),i.push(l[ue*3+1]),i.push(l[ue*3+2])}function Se(ue){r.push(ue.x),r.push(ue.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return zM(t,n,e)}static fromJSON(e,t){const n=[];for(let r=0,o=e.shapes.length;r<o;r++){const a=t[e.shapes[r]];n.push(a)}const i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new yl[i.type]().fromJSON(i)),new ql(n,e.options)}}const kM={generateTopUV:function(s,e,t,n,i){const r=e[t*3],o=e[t*3+1],a=e[n*3],l=e[n*3+1],c=e[i*3],u=e[i*3+1];return[new pe(r,o),new pe(a,l),new pe(c,u)]},generateSideWallUV:function(s,e,t,n,i,r){const o=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[n*3],u=e[n*3+1],h=e[n*3+2],f=e[i*3],d=e[i*3+1],p=e[i*3+2],v=e[r*3],g=e[r*3+1],m=e[r*3+2];return Math.abs(a-u)<Math.abs(o-c)?[new pe(o,1-l),new pe(c,1-h),new pe(f,1-p),new pe(v,1-m)]:[new pe(a,1-l),new pe(u,1-h),new pe(d,1-p),new pe(g,1-m)]}};function zM(s,e,t){if(t.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){const r=s[n];t.shapes.push(r.uuid)}else t.shapes.push(s.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class bo extends Gi{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new bo(e.radius,e.detail)}}class wo extends Gi{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new wo(e.radius,e.detail)}}class Yl extends pt{constructor(e=.5,t=1,n=32,i=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);const a=[],l=[],c=[],u=[];let h=e;const f=(t-e)/i,d=new L,p=new pe;for(let v=0;v<=i;v++){for(let g=0;g<=n;g++){const m=r+g/n*o;d.x=h*Math.cos(m),d.y=h*Math.sin(m),l.push(d.x,d.y,d.z),c.push(0,0,1),p.x=(d.x/t+1)/2,p.y=(d.y/t+1)/2,u.push(p.x,p.y)}h+=f}for(let v=0;v<i;v++){const g=v*(n+1);for(let m=0;m<n;m++){const x=m+g,_=x,y=x+n+1,A=x+n+2,b=x+1;a.push(_,y,b),a.push(y,A,b)}}this.setIndex(a),this.setAttribute("position",new je(l,3)),this.setAttribute("normal",new je(c,3)),this.setAttribute("uv",new je(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yl(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Zl extends pt{constructor(e=new gr([new pe(0,.5),new pe(-.5,-.5),new pe(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],i=[],r=[],o=[];let a=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let u=0;u<e.length;u++)c(e[u]),this.addGroup(a,l,u),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new je(i,3)),this.setAttribute("normal",new je(r,3)),this.setAttribute("uv",new je(o,2));function c(u){const h=i.length/3,f=u.extractPoints(t);let d=f.shape;const p=f.holes;ri.isClockWise(d)===!1&&(d=d.reverse());for(let g=0,m=p.length;g<m;g++){const x=p[g];ri.isClockWise(x)===!0&&(p[g]=x.reverse())}const v=ri.triangulateShape(d,p);for(let g=0,m=p.length;g<m;g++){const x=p[g];d=d.concat(x)}for(let g=0,m=d.length;g<m;g++){const x=d[g];i.push(x.x,x.y,0),r.push(0,0,1),o.push(x.x,x.y)}for(let g=0,m=v.length;g<m;g++){const x=v[g],_=x[0]+h,y=x[1]+h,A=x[2]+h;n.push(_,y,A),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return GM(t,e)}static fromJSON(e,t){const n=[];for(let i=0,r=e.shapes.length;i<r;i++){const o=t[e.shapes[i]];n.push(o)}return new Zl(n,e.curveSegments)}}function GM(s,e){if(e.shapes=[],Array.isArray(s))for(let t=0,n=s.length;t<n;t++){const i=s[t];e.shapes.push(i.uuid)}else e.shapes.push(s.uuid);return e}class Eo extends pt{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const u=[],h=new L,f=new L,d=[],p=[],v=[],g=[];for(let m=0;m<=n;m++){const x=[],_=m/n;let y=0;m===0&&o===0?y=.5/t:m===n&&l===Math.PI&&(y=-.5/t);for(let A=0;A<=t;A++){const b=A/t;h.x=-e*Math.cos(i+b*r)*Math.sin(o+_*a),h.y=e*Math.cos(o+_*a),h.z=e*Math.sin(i+b*r)*Math.sin(o+_*a),p.push(h.x,h.y,h.z),f.copy(h).normalize(),v.push(f.x,f.y,f.z),g.push(b+y,1-_),x.push(c++)}u.push(x)}for(let m=0;m<n;m++)for(let x=0;x<t;x++){const _=u[m][x+1],y=u[m][x],A=u[m+1][x],b=u[m+1][x+1];(m!==0||o>0)&&d.push(_,y,b),(m!==n-1||l<Math.PI)&&d.push(y,A,b)}this.setIndex(d),this.setAttribute("position",new je(p,3)),this.setAttribute("normal",new je(v,3)),this.setAttribute("uv",new je(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Eo(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class $l extends Gi{constructor(e=1,t=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],i=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,i,e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new $l(e.radius,e.detail)}}class jl extends pt{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],l=[],c=[],u=new L,h=new L,f=new L;for(let d=0;d<=n;d++)for(let p=0;p<=i;p++){const v=p/i*r,g=d/n*Math.PI*2;h.x=(e+t*Math.cos(g))*Math.cos(v),h.y=(e+t*Math.cos(g))*Math.sin(v),h.z=t*Math.sin(g),a.push(h.x,h.y,h.z),u.x=e*Math.cos(v),u.y=e*Math.sin(v),f.subVectors(h,u).normalize(),l.push(f.x,f.y,f.z),c.push(p/i),c.push(d/n)}for(let d=1;d<=n;d++)for(let p=1;p<=i;p++){const v=(i+1)*d+p-1,g=(i+1)*(d-1)+p-1,m=(i+1)*(d-1)+p,x=(i+1)*d+p;o.push(v,g,x),o.push(g,m,x)}this.setIndex(o),this.setAttribute("position",new je(a,3)),this.setAttribute("normal",new je(l,3)),this.setAttribute("uv",new je(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jl(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Jl extends pt{constructor(e=1,t=.4,n=64,i=8,r=2,o=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:r,q:o},n=Math.floor(n),i=Math.floor(i);const a=[],l=[],c=[],u=[],h=new L,f=new L,d=new L,p=new L,v=new L,g=new L,m=new L;for(let _=0;_<=n;++_){const y=_/n*r*Math.PI*2;x(y,r,o,e,d),x(y+.01,r,o,e,p),g.subVectors(p,d),m.addVectors(p,d),v.crossVectors(g,m),m.crossVectors(v,g),v.normalize(),m.normalize();for(let A=0;A<=i;++A){const b=A/i*Math.PI*2,T=-t*Math.cos(b),w=t*Math.sin(b);h.x=d.x+(T*m.x+w*v.x),h.y=d.y+(T*m.y+w*v.y),h.z=d.z+(T*m.z+w*v.z),l.push(h.x,h.y,h.z),f.subVectors(h,d).normalize(),c.push(f.x,f.y,f.z),u.push(_/n),u.push(A/i)}}for(let _=1;_<=n;_++)for(let y=1;y<=i;y++){const A=(i+1)*(_-1)+(y-1),b=(i+1)*_+(y-1),T=(i+1)*_+y,w=(i+1)*(_-1)+y;a.push(A,b,w),a.push(b,T,w)}this.setIndex(a),this.setAttribute("position",new je(l,3)),this.setAttribute("normal",new je(c,3)),this.setAttribute("uv",new je(u,2));function x(_,y,A,b,T){const w=Math.cos(_),M=Math.sin(_),S=A/y*_,R=Math.cos(S);T.x=b*(2+R)*.5*w,T.y=b*(2+R)*M*.5,T.z=b*Math.sin(S)*.5}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jl(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}}class Kl extends pt{constructor(e=new sh(new L(-1,-1,0),new L(-1,1,0),new L(1,1,0)),t=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:r};const o=e.computeFrenetFrames(t,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new L,l=new L,c=new pe;let u=new L;const h=[],f=[],d=[],p=[];v(),this.setIndex(p),this.setAttribute("position",new je(h,3)),this.setAttribute("normal",new je(f,3)),this.setAttribute("uv",new je(d,2));function v(){for(let _=0;_<t;_++)g(_);g(r===!1?t:0),x(),m()}function g(_){u=e.getPointAt(_/t,u);const y=o.normals[_],A=o.binormals[_];for(let b=0;b<=i;b++){const T=b/i*Math.PI*2,w=Math.sin(T),M=-Math.cos(T);l.x=M*y.x+w*A.x,l.y=M*y.y+w*A.y,l.z=M*y.z+w*A.z,l.normalize(),f.push(l.x,l.y,l.z),a.x=u.x+n*l.x,a.y=u.y+n*l.y,a.z=u.z+n*l.z,h.push(a.x,a.y,a.z)}}function m(){for(let _=1;_<=t;_++)for(let y=1;y<=i;y++){const A=(i+1)*(_-1)+(y-1),b=(i+1)*_+(y-1),T=(i+1)*_+y,w=(i+1)*(_-1)+y;p.push(A,b,w),p.push(b,T,w)}}function x(){for(let _=0;_<=t;_++)for(let y=0;y<=i;y++)c.x=_/t,c.y=y/i,d.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Kl(new yl[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class ah extends pt{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){const t=[],n=new Set,i=new L,r=new L;if(e.index!==null){const o=e.attributes.position,a=e.index;let l=e.groups;l.length===0&&(l=[{start:0,count:a.count,materialIndex:0}]);for(let c=0,u=l.length;c<u;++c){const h=l[c],f=h.start,d=h.count;for(let p=f,v=f+d;p<v;p+=3)for(let g=0;g<3;g++){const m=a.getX(p+g),x=a.getX(p+(g+1)%3);i.fromBufferAttribute(o,m),r.fromBufferAttribute(o,x),jf(i,r,n)===!0&&(t.push(i.x,i.y,i.z),t.push(r.x,r.y,r.z))}}}else{const o=e.attributes.position;for(let a=0,l=o.count/3;a<l;a++)for(let c=0;c<3;c++){const u=3*a+c,h=3*a+(c+1)%3;i.fromBufferAttribute(o,u),r.fromBufferAttribute(o,h),jf(i,r,n)===!0&&(t.push(i.x,i.y,i.z),t.push(r.x,r.y,r.z))}}this.setAttribute("position",new je(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}function jf(s,e,t){const n=`${s.x},${s.y},${s.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${s.x},${s.y},${s.z}`;return t.has(n)===!0||t.has(i)===!0?!1:(t.add(n),t.add(i),!0)}var Jf=Object.freeze({__proto__:null,BoxGeometry:Tr,CapsuleGeometry:Gl,CircleGeometry:Vl,ConeGeometry:Hl,CylinderGeometry:gs,DodecahedronGeometry:Wl,EdgesGeometry:dm,ExtrudeGeometry:ql,IcosahedronGeometry:bo,LatheGeometry:Mo,OctahedronGeometry:wo,PlaneGeometry:ai,PolyhedronGeometry:Gi,RingGeometry:Yl,ShapeGeometry:Zl,SphereGeometry:Eo,TetrahedronGeometry:$l,TorusGeometry:jl,TorusKnotGeometry:Jl,TubeGeometry:Kl,WireframeGeometry:ah});class vm extends un{static get type(){return"ShadowMaterial"}constructor(e){super(),this.isShadowMaterial=!0,this.color=new We(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}}class _m extends cn{static get type(){return"RawShaderMaterial"}constructor(e){super(e),this.isRawShaderMaterial=!0}}class lh extends un{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new We(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new We(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=zi,this.normalScale=new pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Un,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ch extends lh{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new pe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return kt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new We(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new We(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new We(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class xm extends un{static get type(){return"MeshPhongMaterial"}constructor(e){super(),this.isMeshPhongMaterial=!0,this.color=new We(16777215),this.specular=new We(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new We(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=zi,this.normalScale=new pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Un,this.combine=po,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ym extends un{static get type(){return"MeshToonMaterial"}constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.color=new We(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new We(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=zi,this.normalScale=new pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}class Sm extends un{static get type(){return"MeshNormalMaterial"}constructor(e){super(),this.isMeshNormalMaterial=!0,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=zi,this.normalScale=new pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}}class Mm extends un{static get type(){return"MeshLambertMaterial"}constructor(e){super(),this.isMeshLambertMaterial=!0,this.color=new We(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new We(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=zi,this.normalScale=new pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Un,this.combine=po,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class bm extends un{static get type(){return"MeshMatcapMaterial"}constructor(e){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.color=new We(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=zi,this.normalScale=new pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={MATCAP:""},this.color.copy(e.color),this.matcap=e.matcap,this.map=e.map,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.flatShading=e.flatShading,this.fog=e.fog,this}}class wm extends vn{static get type(){return"LineDashedMaterial"}constructor(e){super(),this.isLineDashedMaterial=!0,this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}function hr(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function Em(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Tm(s){function e(i,r){return s[i]-s[r]}const t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function xu(s,e,t){const n=s.length,i=new s.constructor(n);for(let r=0,o=0;o!==n;++r){const a=t[r]*e;for(let l=0;l!==e;++l)i[o++]=s[a+l]}return i}function uh(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=s[i++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=s[i++];while(r!==void 0)}function VM(s,e,t,n,i=30){const r=s.clone();r.name=e;const o=[];for(let l=0;l<r.tracks.length;++l){const c=r.tracks[l],u=c.getValueSize(),h=[],f=[];for(let d=0;d<c.times.length;++d){const p=c.times[d]*i;if(!(p<t||p>=n)){h.push(c.times[d]);for(let v=0;v<u;++v)f.push(c.values[d*u+v])}}h.length!==0&&(c.times=hr(h,c.times.constructor),c.values=hr(f,c.values.constructor),o.push(c))}r.tracks=o;let a=1/0;for(let l=0;l<r.tracks.length;++l)a>r.tracks[l].times[0]&&(a=r.tracks[l].times[0]);for(let l=0;l<r.tracks.length;++l)r.tracks[l].shift(-1*a);return r.resetDuration(),r}function HM(s,e=0,t=s,n=30){n<=0&&(n=30);const i=t.tracks.length,r=e/n;for(let o=0;o<i;++o){const a=t.tracks[o],l=a.ValueTypeName;if(l==="bool"||l==="string")continue;const c=s.tracks.find(function(m){return m.name===a.name&&m.ValueTypeName===l});if(c===void 0)continue;let u=0;const h=a.getValueSize();a.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(u=h/3);let f=0;const d=c.getValueSize();c.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(f=d/3);const p=a.times.length-1;let v;if(r<=a.times[0]){const m=u,x=h-u;v=a.values.slice(m,x)}else if(r>=a.times[p]){const m=p*h+u,x=m+h-u;v=a.values.slice(m,x)}else{const m=a.createInterpolant(),x=u,_=h-u;m.evaluate(r),v=m.resultBuffer.slice(x,_)}l==="quaternion"&&new ln().fromArray(v).normalize().conjugate().toArray(v);const g=c.times.length;for(let m=0;m<g;++m){const x=m*d+f;if(l==="quaternion")ln.multiplyQuaternionsFlat(c.values,x,v,0,c.values,x);else{const _=d-f*2;for(let y=0;y<_;++y)c.values[x+y]-=v[y]}}}return s.blendMode=Gu,s}const WM={convertArray:hr,isTypedArray:Em,getKeyframeOrder:Tm,sortedArray:xu,flattenJSON:uh,subclip:VM,makeClipAdditive:HM};class To{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],r=t[n-1];e:{t:{let o;n:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=t[++n],e<i)break t}o=t.length;break n}if(!(e>=r)){const a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break t}o=n,n=0;break n}break e}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let o=0;o!==i;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Am extends To{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ar,endingEnd:ar}}intervalChanged_(e,t,n){const i=this.parameterPositions;let r=e-2,o=e+1,a=i[r],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case lr:r=e,a=2*t-n;break;case Js:r=i.length-2,a=t+i[r]-i[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case lr:o=e,l=2*n-t;break;case Js:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}const c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,h=this._offsetNext,f=this._weightPrev,d=this._weightNext,p=(n-t)/(i-t),v=p*p,g=v*p,m=-f*g+2*f*v-f*p,x=(1+f)*g+(-1.5-2*f)*v+(-.5+f)*p+1,_=(-1-d)*g+(1.5+d)*v+.5*p,y=d*g-d*v;for(let A=0;A!==a;++A)r[A]=m*o[u+A]+x*o[c+A]+_*o[l+A]+y*o[h+A];return r}}class hh extends To{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(n-t)/(i-t),h=1-u;for(let f=0;f!==a;++f)r[f]=o[c+f]*h+o[l+f]*u;return r}}class Cm extends To{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Yn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=hr(t,this.TimeBufferType),this.values=hr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:hr(e.times,Array),values:hr(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Cm(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new hh(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Am(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case js:t=this.InterpolantFactoryMethodDiscrete;break;case vl:t=this.InterpolantFactoryMethodLinear;break;case Pa:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return js;case this.InterpolantFactoryMethodLinear:return vl;case this.InterpolantFactoryMethodSmooth:return Pa}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let r=0,o=i-1;for(;r!==i&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(e=!1);const n=this.times,i=this.values,r=n.length;r===0&&(e=!1);let o=null;for(let a=0;a!==r;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){e=!1;break}if(o!==null&&o>l){e=!1;break}o=l}if(i!==void 0&&Em(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Pa,r=e.length-1;let o=1;for(let a=1;a<r;++a){let l=!1;const c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(i)l=!0;else{const h=a*n,f=h-n,d=h+n;for(let p=0;p!==n;++p){const v=t[h+p];if(v!==t[f+p]||v!==t[d+p]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const h=a*n,f=o*n;for(let d=0;d!==n;++d)t[f+d]=t[h+d]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Yn.prototype.TimeBufferType=Float32Array;Yn.prototype.ValueBufferType=Float32Array;Yn.prototype.DefaultInterpolation=vl;class Ar extends Yn{constructor(e,t,n){super(e,t,n)}}Ar.prototype.ValueTypeName="bool";Ar.prototype.ValueBufferType=Array;Ar.prototype.DefaultInterpolation=js;Ar.prototype.InterpolantFactoryMethodLinear=void 0;Ar.prototype.InterpolantFactoryMethodSmooth=void 0;class fh extends Yn{}fh.prototype.ValueTypeName="color";class oo extends Yn{}oo.prototype.ValueTypeName="number";class Rm extends To{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let c=e*a;for(let u=c+a;c!==u;c+=4)ln.slerpFlat(r,0,o,c-a,o,c,l);return r}}class Ao extends Yn{InterpolantFactoryMethodLinear(e){return new Rm(this.times,this.values,this.getValueSize(),e)}}Ao.prototype.ValueTypeName="quaternion";Ao.prototype.InterpolantFactoryMethodSmooth=void 0;class Cr extends Yn{constructor(e,t,n){super(e,t,n)}}Cr.prototype.ValueTypeName="string";Cr.prototype.ValueBufferType=Array;Cr.prototype.DefaultInterpolation=js;Cr.prototype.InterpolantFactoryMethodLinear=void 0;Cr.prototype.InterpolantFactoryMethodSmooth=void 0;class ao extends Yn{}ao.prototype.ValueTypeName="vector";class lo{constructor(e="",t=-1,n=[],i=Il){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=In(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(qM(n[o]).scale(i));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=n.length;r!==o;++r)t.push(Yn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const r=t.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);const u=Tm(l);l=xu(l,1,u),c=xu(c,1,u),!i&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new oo(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],u=c.name.match(r);if(u&&u.length>1){const h=u[1];let f=i[h];f||(i[h]=f=[]),f.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(!e)return null;const n=function(h,f,d,p,v){if(d.length!==0){const g=[],m=[];uh(d,g,m,p),g.length!==0&&v.push(new h(f,g,m))}},i=[],r=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let h=0;h<c.length;h++){const f=c[h].keys;if(!(!f||f.length===0))if(f[0].morphTargets){const d={};let p;for(p=0;p<f.length;p++)if(f[p].morphTargets)for(let v=0;v<f[p].morphTargets.length;v++)d[f[p].morphTargets[v]]=-1;for(const v in d){const g=[],m=[];for(let x=0;x!==f[p].morphTargets.length;++x){const _=f[p];g.push(_.time),m.push(_.morphTarget===v?1:0)}i.push(new oo(".morphTargetInfluence["+v+"]",g,m))}l=d.length*o}else{const d=".bones["+t[h].name+"]";n(ao,d+".position",f,"pos",i),n(Ao,d+".quaternion",f,"rot",i),n(ao,d+".scale",f,"scl",i)}}return i.length===0?null:new this(r,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function XM(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return oo;case"vector":case"vector2":case"vector3":case"vector4":return ao;case"color":return fh;case"quaternion":return Ao;case"bool":case"boolean":return Ar;case"string":return Cr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function qM(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=XM(s.type);if(s.times===void 0){const t=[],n=[];uh(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}const _i={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class dh{constructor(e,t,n){const i=this;let r=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){a++,r===!1&&i.onStart!==void 0&&i.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,i.onProgress!==void 0&&i.onProgress(u,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=c.length;h<f;h+=2){const d=c[h],p=c[h+1];if(d.global&&(d.lastIndex=0),d.test(u))return p}return null}}}const Im=new dh;class bn{constructor(e){this.manager=e!==void 0?e:Im,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}bn.DEFAULT_MATERIAL_NAME="__DEFAULT";const pi={};class YM extends Error{constructor(e,t){super(e),this.response=t}}class wi extends bn{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=_i.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(pi[e]!==void 0){pi[e].push({onLoad:t,onProgress:n,onError:i});return}pi[e]=[],pi[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status,typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=pi[e],h=c.body.getReader(),f=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),d=f?parseInt(f):0,p=d!==0;let v=0;const g=new ReadableStream({start(m){x();function x(){h.read().then(({done:_,value:y})=>{if(_)m.close();else{v+=y.byteLength;const A=new ProgressEvent("progress",{lengthComputable:p,loaded:v,total:d});for(let b=0,T=u.length;b<T;b++){const w=u[b];w.onProgress&&w.onProgress(A)}m.enqueue(y),x()}},_=>{m.error(_)})}}});return new Response(g)}else throw new YM(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return c.json();default:if(a===void 0)return c.text();{const h=/charset="?([^;"\s]*)"?/i.exec(a),f=h&&h[1]?h[1].toLowerCase():void 0,d=new TextDecoder(f);return c.arrayBuffer().then(p=>d.decode(p))}}}).then(c=>{_i.add(e,c);const u=pi[e];delete pi[e];for(let h=0,f=u.length;h<f;h++){const d=u[h];d.onLoad&&d.onLoad(c)}}).catch(c=>{const u=pi[e];if(u===void 0)throw this.manager.itemError(e),c;delete pi[e];for(let h=0,f=u.length;h<f;h++){const d=u[h];d.onError&&d.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class ZM extends bn{constructor(e){super(e)}load(e,t,n,i){const r=this,o=new wi(this.manager);o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(a){try{t(r.parse(JSON.parse(a)))}catch(l){i&&i(l),r.manager.itemError(e)}},n,i)}parse(e){const t=[];for(let n=0;n<e.length;n++){const i=lo.parse(e[n]);t.push(i)}return t}}class $M extends bn{constructor(e){super(e)}load(e,t,n,i){const r=this,o=[],a=new kl,l=new wi(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(r.withCredentials);let c=0;function u(h){l.load(e[h],function(f){const d=r.parse(f,!0);o[h]={width:d.width,height:d.height,format:d.format,mipmaps:d.mipmaps},c+=1,c===6&&(d.mipmapCount===1&&(a.minFilter=Ut),a.image=o,a.format=d.format,a.needsUpdate=!0,t&&t(a))},n,i)}if(Array.isArray(e))for(let h=0,f=e.length;h<f;++h)u(h);else l.load(e,function(h){const f=r.parse(h,!0);if(f.isCubemap){const d=f.mipmaps.length/f.mipmapCount;for(let p=0;p<d;p++){o[p]={mipmaps:[]};for(let v=0;v<f.mipmapCount;v++)o[p].mipmaps.push(f.mipmaps[p*f.mipmapCount+v]),o[p].format=f.format,o[p].width=f.width,o[p].height=f.height}a.image=o}else a.image.width=f.width,a.image.height=f.height,a.mipmaps=f.mipmaps;f.mipmapCount===1&&(a.minFilter=Ut),a.format=f.format,a.needsUpdate=!0,t&&t(a)},n,i);return a}}class co extends bn{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=_i.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;const a=eo("img");function l(){u(),_i.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(h){u(),i&&i(h),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}}class Pm extends bn{constructor(e){super(e)}load(e,t,n,i){const r=new xo;r.colorSpace=Sn;const o=new co(this.manager);o.setCrossOrigin(this.crossOrigin),o.setPath(this.path);let a=0;function l(c){o.load(e[c],function(u){r.images[c]=u,a++,a===6&&(r.needsUpdate=!0,t&&t(r))},void 0,i)}for(let c=0;c<e.length;++c)l(c);return r}}class ph extends bn{constructor(e){super(e)}load(e,t,n,i){const r=this,o=new ii,a=new wi(this.manager);return a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(r.withCredentials),a.load(e,function(l){let c;try{c=r.parse(l)}catch(u){if(i!==void 0)i(u);else return}c.image!==void 0?o.image=c.image:c.data!==void 0&&(o.image.width=c.width,o.image.height=c.height,o.image.data=c.data),o.wrapS=c.wrapS!==void 0?c.wrapS:Nn,o.wrapT=c.wrapT!==void 0?c.wrapT:Nn,o.magFilter=c.magFilter!==void 0?c.magFilter:Ut,o.minFilter=c.minFilter!==void 0?c.minFilter:Ut,o.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.colorSpace!==void 0&&(o.colorSpace=c.colorSpace),c.flipY!==void 0&&(o.flipY=c.flipY),c.format!==void 0&&(o.format=c.format),c.type!==void 0&&(o.type=c.type),c.mipmaps!==void 0&&(o.mipmaps=c.mipmaps,o.minFilter=Qn),c.mipmapCount===1&&(o.minFilter=Ut),c.generateMipmaps!==void 0&&(o.generateMipmaps=c.generateMipmaps),o.needsUpdate=!0,t&&t(o,c)},n,i),o}}class jM extends bn{constructor(e){super(e)}load(e,t,n,i){const r=new Ft,o=new co(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}}class Vi extends xt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new We(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Um extends Vi{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(xt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new We(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Vc=new rt,Kf=new L,Qf=new L;class mh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new pe(512,512),this.map=null,this.mapPass=null,this.matrix=new rt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new yo,this._frameExtents=new pe(1,1),this._viewportCount=1,this._viewports=[new dt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Kf.setFromMatrixPosition(e.matrixWorld),t.position.copy(Kf),Qf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Qf),t.updateMatrixWorld(),Vc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Vc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Vc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class JM extends mh{constructor(){super(new Dt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=cs*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Dm extends Vi{constructor(e,t,n=0,i=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(xt.DEFAULT_UP),this.updateMatrix(),this.target=new xt,this.distance=n,this.angle=i,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new JM}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const ed=new rt,Cs=new L,Hc=new L;class KM extends mh{constructor(){super(new Dt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new pe(4,2),this._viewportCount=6,this._viewports=[new dt(2,1,1,1),new dt(0,1,1,1),new dt(3,1,1,1),new dt(1,1,1,1),new dt(3,0,1,1),new dt(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Cs.setFromMatrixPosition(e.matrixWorld),n.position.copy(Cs),Hc.copy(n.position),Hc.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Hc),n.updateMatrixWorld(),i.makeTranslation(-Cs.x,-Cs.y,-Cs.z),ed.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ed)}}class Lm extends Vi{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new KM}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class QM extends mh{constructor(){super(new ni(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Fm extends Vi{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(xt.DEFAULT_UP),this.updateMatrix(),this.target=new xt,this.shadow=new QM}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Om extends Vi{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Nm extends Vi{constructor(e,t,n=10,i=10){super(e,t),this.isRectAreaLight=!0,this.type="RectAreaLight",this.width=n,this.height=i}get power(){return this.intensity*this.width*this.height*Math.PI}set power(e){this.intensity=e/(this.width*this.height*Math.PI)}copy(e){return super.copy(e),this.width=e.width,this.height=e.height,this}toJSON(e){const t=super.toJSON(e);return t.object.width=this.width,t.object.height=this.height,t}}class Bm{constructor(){this.isSphericalHarmonics3=!0,this.coefficients=[];for(let e=0;e<9;e++)this.coefficients.push(new L)}set(e){for(let t=0;t<9;t++)this.coefficients[t].copy(e[t]);return this}zero(){for(let e=0;e<9;e++)this.coefficients[e].set(0,0,0);return this}getAt(e,t){const n=e.x,i=e.y,r=e.z,o=this.coefficients;return t.copy(o[0]).multiplyScalar(.282095),t.addScaledVector(o[1],.488603*i),t.addScaledVector(o[2],.488603*r),t.addScaledVector(o[3],.488603*n),t.addScaledVector(o[4],1.092548*(n*i)),t.addScaledVector(o[5],1.092548*(i*r)),t.addScaledVector(o[6],.315392*(3*r*r-1)),t.addScaledVector(o[7],1.092548*(n*r)),t.addScaledVector(o[8],.546274*(n*n-i*i)),t}getIrradianceAt(e,t){const n=e.x,i=e.y,r=e.z,o=this.coefficients;return t.copy(o[0]).multiplyScalar(.886227),t.addScaledVector(o[1],2*.511664*i),t.addScaledVector(o[2],2*.511664*r),t.addScaledVector(o[3],2*.511664*n),t.addScaledVector(o[4],2*.429043*n*i),t.addScaledVector(o[5],2*.429043*i*r),t.addScaledVector(o[6],.743125*r*r-.247708),t.addScaledVector(o[7],2*.429043*n*r),t.addScaledVector(o[8],.429043*(n*n-i*i)),t}add(e){for(let t=0;t<9;t++)this.coefficients[t].add(e.coefficients[t]);return this}addScaledSH(e,t){for(let n=0;n<9;n++)this.coefficients[n].addScaledVector(e.coefficients[n],t);return this}scale(e){for(let t=0;t<9;t++)this.coefficients[t].multiplyScalar(e);return this}lerp(e,t){for(let n=0;n<9;n++)this.coefficients[n].lerp(e.coefficients[n],t);return this}equals(e){for(let t=0;t<9;t++)if(!this.coefficients[t].equals(e.coefficients[t]))return!1;return!0}copy(e){return this.set(e.coefficients)}clone(){return new this.constructor().copy(this)}fromArray(e,t=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].fromArray(e,t+i*3);return this}toArray(e=[],t=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].toArray(e,t+i*3);return e}static getBasisAt(e,t){const n=e.x,i=e.y,r=e.z;t[0]=.282095,t[1]=.488603*i,t[2]=.488603*r,t[3]=.488603*n,t[4]=1.092548*n*i,t[5]=1.092548*i*r,t[6]=.315392*(3*r*r-1),t[7]=1.092548*n*r,t[8]=.546274*(n*n-i*i)}}class km extends Vi{constructor(e=new Bm,t=1){super(void 0,t),this.isLightProbe=!0,this.sh=e}copy(e){return super.copy(e),this.sh.copy(e.sh),this}fromJSON(e){return this.intensity=e.intensity,this.sh.fromArray(e.sh),this}toJSON(e){const t=super.toJSON(e);return t.object.sh=this.sh.toArray(),t}}class Ql extends bn{constructor(e){super(e),this.textures={}}load(e,t,n,i){const r=this,o=new wi(r.manager);o.setPath(r.path),o.setRequestHeader(r.requestHeader),o.setWithCredentials(r.withCredentials),o.load(e,function(a){try{t(r.parse(JSON.parse(a)))}catch(l){i&&i(l),r.manager.itemError(e)}},n,i)}parse(e){const t=this.textures;function n(r){return t[r],t[r]}const i=this.createMaterialFromType(e.type);if(e.uuid!==void 0&&(i.uuid=e.uuid),e.name!==void 0&&(i.name=e.name),e.color!==void 0&&i.color!==void 0&&i.color.setHex(e.color),e.roughness!==void 0&&(i.roughness=e.roughness),e.metalness!==void 0&&(i.metalness=e.metalness),e.sheen!==void 0&&(i.sheen=e.sheen),e.sheenColor!==void 0&&(i.sheenColor=new We().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(i.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&i.emissive!==void 0&&i.emissive.setHex(e.emissive),e.specular!==void 0&&i.specular!==void 0&&i.specular.setHex(e.specular),e.specularIntensity!==void 0&&(i.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&i.specularColor!==void 0&&i.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(i.shininess=e.shininess),e.clearcoat!==void 0&&(i.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(i.dispersion=e.dispersion),e.iridescence!==void 0&&(i.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(i.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(i.transmission=e.transmission),e.thickness!==void 0&&(i.thickness=e.thickness),e.attenuationDistance!==void 0&&(i.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&i.attenuationColor!==void 0&&i.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(i.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(i.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(i.fog=e.fog),e.flatShading!==void 0&&(i.flatShading=e.flatShading),e.blending!==void 0&&(i.blending=e.blending),e.combine!==void 0&&(i.combine=e.combine),e.side!==void 0&&(i.side=e.side),e.shadowSide!==void 0&&(i.shadowSide=e.shadowSide),e.opacity!==void 0&&(i.opacity=e.opacity),e.transparent!==void 0&&(i.transparent=e.transparent),e.alphaTest!==void 0&&(i.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(i.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(i.depthFunc=e.depthFunc),e.depthTest!==void 0&&(i.depthTest=e.depthTest),e.depthWrite!==void 0&&(i.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(i.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(i.blendSrc=e.blendSrc),e.blendDst!==void 0&&(i.blendDst=e.blendDst),e.blendEquation!==void 0&&(i.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(i.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(i.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(i.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&i.blendColor!==void 0&&i.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(i.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(i.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(i.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(i.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(i.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(i.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(i.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(i.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(i.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(i.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(i.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(i.rotation=e.rotation),e.linewidth!==void 0&&(i.linewidth=e.linewidth),e.dashSize!==void 0&&(i.dashSize=e.dashSize),e.gapSize!==void 0&&(i.gapSize=e.gapSize),e.scale!==void 0&&(i.scale=e.scale),e.polygonOffset!==void 0&&(i.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(i.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(i.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(i.dithering=e.dithering),e.alphaToCoverage!==void 0&&(i.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(i.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(i.forceSinglePass=e.forceSinglePass),e.visible!==void 0&&(i.visible=e.visible),e.toneMapped!==void 0&&(i.toneMapped=e.toneMapped),e.userData!==void 0&&(i.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?i.vertexColors=e.vertexColors>0:i.vertexColors=e.vertexColors),e.uniforms!==void 0)for(const r in e.uniforms){const o=e.uniforms[r];switch(i.uniforms[r]={},o.type){case"t":i.uniforms[r].value=n(o.value);break;case"c":i.uniforms[r].value=new We().setHex(o.value);break;case"v2":i.uniforms[r].value=new pe().fromArray(o.value);break;case"v3":i.uniforms[r].value=new L().fromArray(o.value);break;case"v4":i.uniforms[r].value=new dt().fromArray(o.value);break;case"m3":i.uniforms[r].value=new ct().fromArray(o.value);break;case"m4":i.uniforms[r].value=new rt().fromArray(o.value);break;default:i.uniforms[r].value=o.value}}if(e.defines!==void 0&&(i.defines=e.defines),e.vertexShader!==void 0&&(i.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(i.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(i.glslVersion=e.glslVersion),e.extensions!==void 0)for(const r in e.extensions)i.extensions[r]=e.extensions[r];if(e.lights!==void 0&&(i.lights=e.lights),e.clipping!==void 0&&(i.clipping=e.clipping),e.size!==void 0&&(i.size=e.size),e.sizeAttenuation!==void 0&&(i.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(i.map=n(e.map)),e.matcap!==void 0&&(i.matcap=n(e.matcap)),e.alphaMap!==void 0&&(i.alphaMap=n(e.alphaMap)),e.bumpMap!==void 0&&(i.bumpMap=n(e.bumpMap)),e.bumpScale!==void 0&&(i.bumpScale=e.bumpScale),e.normalMap!==void 0&&(i.normalMap=n(e.normalMap)),e.normalMapType!==void 0&&(i.normalMapType=e.normalMapType),e.normalScale!==void 0){let r=e.normalScale;Array.isArray(r)===!1&&(r=[r,r]),i.normalScale=new pe().fromArray(r)}return e.displacementMap!==void 0&&(i.displacementMap=n(e.displacementMap)),e.displacementScale!==void 0&&(i.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(i.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(i.roughnessMap=n(e.roughnessMap)),e.metalnessMap!==void 0&&(i.metalnessMap=n(e.metalnessMap)),e.emissiveMap!==void 0&&(i.emissiveMap=n(e.emissiveMap)),e.emissiveIntensity!==void 0&&(i.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(i.specularMap=n(e.specularMap)),e.specularIntensityMap!==void 0&&(i.specularIntensityMap=n(e.specularIntensityMap)),e.specularColorMap!==void 0&&(i.specularColorMap=n(e.specularColorMap)),e.envMap!==void 0&&(i.envMap=n(e.envMap)),e.envMapRotation!==void 0&&i.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(i.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(i.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(i.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(i.lightMap=n(e.lightMap)),e.lightMapIntensity!==void 0&&(i.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(i.aoMap=n(e.aoMap)),e.aoMapIntensity!==void 0&&(i.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(i.gradientMap=n(e.gradientMap)),e.clearcoatMap!==void 0&&(i.clearcoatMap=n(e.clearcoatMap)),e.clearcoatRoughnessMap!==void 0&&(i.clearcoatRoughnessMap=n(e.clearcoatRoughnessMap)),e.clearcoatNormalMap!==void 0&&(i.clearcoatNormalMap=n(e.clearcoatNormalMap)),e.clearcoatNormalScale!==void 0&&(i.clearcoatNormalScale=new pe().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(i.iridescenceMap=n(e.iridescenceMap)),e.iridescenceThicknessMap!==void 0&&(i.iridescenceThicknessMap=n(e.iridescenceThicknessMap)),e.transmissionMap!==void 0&&(i.transmissionMap=n(e.transmissionMap)),e.thicknessMap!==void 0&&(i.thicknessMap=n(e.thicknessMap)),e.anisotropyMap!==void 0&&(i.anisotropyMap=n(e.anisotropyMap)),e.sheenColorMap!==void 0&&(i.sheenColorMap=n(e.sheenColorMap)),e.sheenRoughnessMap!==void 0&&(i.sheenRoughnessMap=n(e.sheenRoughnessMap)),i}setTextures(e){return this.textures=e,this}createMaterialFromType(e){return Ql.createMaterialFromType(e)}static createMaterialFromType(e){const t={ShadowMaterial:vm,SpriteMaterial:Ku,RawShaderMaterial:_m,ShaderMaterial:cn,PointsMaterial:eh,MeshPhysicalMaterial:ch,MeshStandardMaterial:lh,MeshPhongMaterial:xm,MeshToonMaterial:ym,MeshNormalMaterial:Sm,MeshLambertMaterial:Mm,MeshDepthMaterial:So,MeshDistanceMaterial:Dl,MeshBasicMaterial:Ei,MeshMatcapMaterial:bm,LineDashedMaterial:wm,LineBasicMaterial:vn,Material:un};return new t[e]}}class yu{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class ec extends pt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}class zm extends bn{constructor(e){super(e)}load(e,t,n,i){const r=this,o=new wi(r.manager);o.setPath(r.path),o.setRequestHeader(r.requestHeader),o.setWithCredentials(r.withCredentials),o.load(e,function(a){try{t(r.parse(JSON.parse(a)))}catch(l){i&&i(l),r.manager.itemError(e)}},n,i)}parse(e){const t={},n={};function i(d,p){if(t[p]!==void 0)return t[p];const g=d.interleavedBuffers[p],m=r(d,g.buffer),x=es(g.type,m),_=new Nl(x,g.stride);return _.uuid=g.uuid,t[p]=_,_}function r(d,p){if(n[p]!==void 0)return n[p];const g=d.arrayBuffers[p],m=new Uint32Array(g).buffer;return n[p]=m,m}const o=e.isInstancedBufferGeometry?new ec:new pt,a=e.data.index;if(a!==void 0){const d=es(a.type,a.array);o.setIndex(new Tt(d,1))}const l=e.data.attributes;for(const d in l){const p=l[d];let v;if(p.isInterleavedBufferAttribute){const g=i(e.data,p.data);v=new Rn(g,p.itemSize,p.offset,p.normalized)}else{const g=es(p.type,p.array),m=p.isInstancedBufferAttribute?Mr:Tt;v=new m(g,p.itemSize,p.normalized)}p.name!==void 0&&(v.name=p.name),p.usage!==void 0&&v.setUsage(p.usage),o.setAttribute(d,v)}const c=e.data.morphAttributes;if(c)for(const d in c){const p=c[d],v=[];for(let g=0,m=p.length;g<m;g++){const x=p[g];let _;if(x.isInterleavedBufferAttribute){const y=i(e.data,x.data);_=new Rn(y,x.itemSize,x.offset,x.normalized)}else{const y=es(x.type,x.array);_=new Tt(y,x.itemSize,x.normalized)}x.name!==void 0&&(_.name=x.name),v.push(_)}o.morphAttributes[d]=v}e.data.morphTargetsRelative&&(o.morphTargetsRelative=!0);const h=e.data.groups||e.data.drawcalls||e.data.offsets;if(h!==void 0)for(let d=0,p=h.length;d!==p;++d){const v=h[d];o.addGroup(v.start,v.count,v.materialIndex)}const f=e.data.boundingSphere;if(f!==void 0){const d=new L;f.center!==void 0&&d.fromArray(f.center),o.boundingSphere=new qt(d,f.radius)}return e.name&&(o.name=e.name),e.userData&&(o.userData=e.userData),o}}class eb extends bn{constructor(e){super(e)}load(e,t,n,i){const r=this,o=this.path===""?yu.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||o;const a=new wi(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(l){let c=null;try{c=JSON.parse(l)}catch(h){i!==void 0&&i(h);return}const u=c.metadata;if(u===void 0||u.type===void 0||u.type.toLowerCase()==="geometry"){i!==void 0&&i(new Error("THREE.ObjectLoader: Can't load "+e));return}r.parse(c,t)},n,i)}async loadAsync(e,t){const n=this,i=this.path===""?yu.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||i;const r=new wi(this.manager);r.setPath(this.path),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials);const o=await r.loadAsync(e,t),a=JSON.parse(o),l=a.metadata;if(l===void 0||l.type===void 0||l.type.toLowerCase()==="geometry")throw new Error("THREE.ObjectLoader: Can't load "+e);return await n.parseAsync(a)}parse(e,t){const n=this.parseAnimations(e.animations),i=this.parseShapes(e.shapes),r=this.parseGeometries(e.geometries,i),o=this.parseImages(e.images,function(){t!==void 0&&t(c)}),a=this.parseTextures(e.textures,o),l=this.parseMaterials(e.materials,a),c=this.parseObject(e.object,r,l,a,n),u=this.parseSkeletons(e.skeletons,c);if(this.bindSkeletons(c,u),this.bindLightTargets(c),t!==void 0){let h=!1;for(const f in o)if(o[f].data instanceof HTMLImageElement){h=!0;break}h===!1&&t(c)}return c}async parseAsync(e){const t=this.parseAnimations(e.animations),n=this.parseShapes(e.shapes),i=this.parseGeometries(e.geometries,n),r=await this.parseImagesAsync(e.images),o=this.parseTextures(e.textures,r),a=this.parseMaterials(e.materials,o),l=this.parseObject(e.object,i,a,o,t),c=this.parseSkeletons(e.skeletons,l);return this.bindSkeletons(l,c),this.bindLightTargets(l),l}parseShapes(e){const t={};if(e!==void 0)for(let n=0,i=e.length;n<i;n++){const r=new gr().fromJSON(e[n]);t[r.uuid]=r}return t}parseSkeletons(e,t){const n={},i={};if(t.traverse(function(r){r.isBone&&(i[r.uuid]=r)}),e!==void 0)for(let r=0,o=e.length;r<o;r++){const a=new Bl().fromJSON(e[r],i);n[a.uuid]=a}return n}parseGeometries(e,t){const n={};if(e!==void 0){const i=new zm;for(let r=0,o=e.length;r<o;r++){let a;const l=e[r];switch(l.type){case"BufferGeometry":case"InstancedBufferGeometry":a=i.parse(l);break;default:l.type in Jf&&(a=Jf[l.type].fromJSON(l,t))}a.uuid=l.uuid,l.name!==void 0&&(a.name=l.name),l.userData!==void 0&&(a.userData=l.userData),n[l.uuid]=a}}return n}parseMaterials(e,t){const n={},i={};if(e!==void 0){const r=new Ql;r.setTextures(t);for(let o=0,a=e.length;o<a;o++){const l=e[o];n[l.uuid]===void 0&&(n[l.uuid]=r.parse(l)),i[l.uuid]=n[l.uuid]}}return i}parseAnimations(e){const t={};if(e!==void 0)for(let n=0;n<e.length;n++){const i=e[n],r=lo.parse(i);t[r.uuid]=r}return t}parseImages(e,t){const n=this,i={};let r;function o(l){return n.manager.itemStart(l),r.load(l,function(){n.manager.itemEnd(l)},void 0,function(){n.manager.itemError(l),n.manager.itemEnd(l)})}function a(l){if(typeof l=="string"){const c=l,u=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(c)?c:n.resourcePath+c;return o(u)}else return l.data?{data:es(l.type,l.data),width:l.width,height:l.height}:null}if(e!==void 0&&e.length>0){const l=new dh(t);r=new co(l),r.setCrossOrigin(this.crossOrigin);for(let c=0,u=e.length;c<u;c++){const h=e[c],f=h.url;if(Array.isArray(f)){const d=[];for(let p=0,v=f.length;p<v;p++){const g=f[p],m=a(g);m!==null&&(m instanceof HTMLImageElement?d.push(m):d.push(new ii(m.data,m.width,m.height)))}i[h.uuid]=new cr(d)}else{const d=a(h.url);i[h.uuid]=new cr(d)}}}return i}async parseImagesAsync(e){const t=this,n={};let i;async function r(o){if(typeof o=="string"){const a=o,l=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(a)?a:t.resourcePath+a;return await i.loadAsync(l)}else return o.data?{data:es(o.type,o.data),width:o.width,height:o.height}:null}if(e!==void 0&&e.length>0){i=new co(this.manager),i.setCrossOrigin(this.crossOrigin);for(let o=0,a=e.length;o<a;o++){const l=e[o],c=l.url;if(Array.isArray(c)){const u=[];for(let h=0,f=c.length;h<f;h++){const d=c[h],p=await r(d);p!==null&&(p instanceof HTMLImageElement?u.push(p):u.push(new ii(p.data,p.width,p.height)))}n[l.uuid]=new cr(u)}else{const u=await r(l.url);n[l.uuid]=new cr(u)}}}return n}parseTextures(e,t){function n(r,o){return typeof r=="number"?r:o[r]}const i={};if(e!==void 0)for(let r=0,o=e.length;r<o;r++){const a=e[r];a.image,t[a.image];const l=t[a.image],c=l.data;let u;Array.isArray(c)?(u=new xo,c.length===6&&(u.needsUpdate=!0)):(c&&c.data?u=new ii:u=new Ft,c&&(u.needsUpdate=!0)),u.source=l,u.uuid=a.uuid,a.name!==void 0&&(u.name=a.name),a.mapping!==void 0&&(u.mapping=n(a.mapping,tb)),a.channel!==void 0&&(u.channel=a.channel),a.offset!==void 0&&u.offset.fromArray(a.offset),a.repeat!==void 0&&u.repeat.fromArray(a.repeat),a.center!==void 0&&u.center.fromArray(a.center),a.rotation!==void 0&&(u.rotation=a.rotation),a.wrap!==void 0&&(u.wrapS=n(a.wrap[0],td),u.wrapT=n(a.wrap[1],td)),a.format!==void 0&&(u.format=a.format),a.internalFormat!==void 0&&(u.internalFormat=a.internalFormat),a.type!==void 0&&(u.type=a.type),a.colorSpace!==void 0&&(u.colorSpace=a.colorSpace),a.minFilter!==void 0&&(u.minFilter=n(a.minFilter,nd)),a.magFilter!==void 0&&(u.magFilter=n(a.magFilter,nd)),a.anisotropy!==void 0&&(u.anisotropy=a.anisotropy),a.flipY!==void 0&&(u.flipY=a.flipY),a.generateMipmaps!==void 0&&(u.generateMipmaps=a.generateMipmaps),a.premultiplyAlpha!==void 0&&(u.premultiplyAlpha=a.premultiplyAlpha),a.unpackAlignment!==void 0&&(u.unpackAlignment=a.unpackAlignment),a.compareFunction!==void 0&&(u.compareFunction=a.compareFunction),a.userData!==void 0&&(u.userData=a.userData),i[a.uuid]=u}return i}parseObject(e,t,n,i,r){let o;function a(f){return t[f],t[f]}function l(f){if(f!==void 0){if(Array.isArray(f)){const d=[];for(let p=0,v=f.length;p<v;p++){const g=f[p];n[g],d.push(n[g])}return d}return n[f],n[f]}}function c(f){return i[f],i[f]}let u,h;switch(e.type){case"Scene":o=new Ol,e.background!==void 0&&(Number.isInteger(e.background)?o.background=new We(e.background):o.background=c(e.background)),e.environment!==void 0&&(o.environment=c(e.environment)),e.fog!==void 0&&(e.fog.type==="Fog"?o.fog=new Fl(e.fog.color,e.fog.near,e.fog.far):e.fog.type==="FogExp2"&&(o.fog=new Ll(e.fog.color,e.fog.density)),e.fog.name!==""&&(o.fog.name=e.fog.name)),e.backgroundBlurriness!==void 0&&(o.backgroundBlurriness=e.backgroundBlurriness),e.backgroundIntensity!==void 0&&(o.backgroundIntensity=e.backgroundIntensity),e.backgroundRotation!==void 0&&o.backgroundRotation.fromArray(e.backgroundRotation),e.environmentIntensity!==void 0&&(o.environmentIntensity=e.environmentIntensity),e.environmentRotation!==void 0&&o.environmentRotation.fromArray(e.environmentRotation);break;case"PerspectiveCamera":o=new Dt(e.fov,e.aspect,e.near,e.far),e.focus!==void 0&&(o.focus=e.focus),e.zoom!==void 0&&(o.zoom=e.zoom),e.filmGauge!==void 0&&(o.filmGauge=e.filmGauge),e.filmOffset!==void 0&&(o.filmOffset=e.filmOffset),e.view!==void 0&&(o.view=Object.assign({},e.view));break;case"OrthographicCamera":o=new ni(e.left,e.right,e.top,e.bottom,e.near,e.far),e.zoom!==void 0&&(o.zoom=e.zoom),e.view!==void 0&&(o.view=Object.assign({},e.view));break;case"AmbientLight":o=new Om(e.color,e.intensity);break;case"DirectionalLight":o=new Fm(e.color,e.intensity),o.target=e.target||"";break;case"PointLight":o=new Lm(e.color,e.intensity,e.distance,e.decay);break;case"RectAreaLight":o=new Nm(e.color,e.intensity,e.width,e.height);break;case"SpotLight":o=new Dm(e.color,e.intensity,e.distance,e.angle,e.penumbra,e.decay),o.target=e.target||"";break;case"HemisphereLight":o=new Um(e.color,e.groundColor,e.intensity);break;case"LightProbe":o=new km().fromJSON(e);break;case"SkinnedMesh":u=a(e.geometry),h=l(e.material),o=new im(u,h),e.bindMode!==void 0&&(o.bindMode=e.bindMode),e.bindMatrix!==void 0&&o.bindMatrix.fromArray(e.bindMatrix),e.skeleton!==void 0&&(o.skeleton=e.skeleton);break;case"Mesh":u=a(e.geometry),h=l(e.material),o=new Rt(u,h);break;case"InstancedMesh":u=a(e.geometry),h=l(e.material);const f=e.count,d=e.instanceMatrix,p=e.instanceColor;o=new rm(u,h,f),o.instanceMatrix=new Mr(new Float32Array(d.array),16),p!==void 0&&(o.instanceColor=new Mr(new Float32Array(p.array),p.itemSize));break;case"BatchedMesh":u=a(e.geometry),h=l(e.material),o=new sm(e.maxInstanceCount,e.maxVertexCount,e.maxIndexCount,h),o.geometry=u,o.perObjectFrustumCulled=e.perObjectFrustumCulled,o.sortObjects=e.sortObjects,o._drawRanges=e.drawRanges,o._reservedRanges=e.reservedRanges,o._visibility=e.visibility,o._active=e.active,o._bounds=e.bounds.map(v=>{const g=new Xt;g.min.fromArray(v.boxMin),g.max.fromArray(v.boxMax);const m=new qt;return m.radius=v.sphereRadius,m.center.fromArray(v.sphereCenter),{boxInitialized:v.boxInitialized,box:g,sphereInitialized:v.sphereInitialized,sphere:m}}),o._maxInstanceCount=e.maxInstanceCount,o._maxVertexCount=e.maxVertexCount,o._maxIndexCount=e.maxIndexCount,o._geometryInitialized=e.geometryInitialized,o._geometryCount=e.geometryCount,o._matricesTexture=c(e.matricesTexture.uuid),e.colorsTexture!==void 0&&(o._colorsTexture=c(e.colorsTexture.uuid));break;case"LOD":o=new nm;break;case"Line":o=new ki(a(e.geometry),l(e.material));break;case"LineLoop":o=new om(a(e.geometry),l(e.material));break;case"LineSegments":o=new li(a(e.geometry),l(e.material));break;case"PointCloud":case"Points":o=new am(a(e.geometry),l(e.material));break;case"Sprite":o=new tm(l(e.material));break;case"Group":o=new is;break;case"Bone":o=new Qu;break;default:o=new xt}if(o.uuid=e.uuid,e.name!==void 0&&(o.name=e.name),e.matrix!==void 0?(o.matrix.fromArray(e.matrix),e.matrixAutoUpdate!==void 0&&(o.matrixAutoUpdate=e.matrixAutoUpdate),o.matrixAutoUpdate&&o.matrix.decompose(o.position,o.quaternion,o.scale)):(e.position!==void 0&&o.position.fromArray(e.position),e.rotation!==void 0&&o.rotation.fromArray(e.rotation),e.quaternion!==void 0&&o.quaternion.fromArray(e.quaternion),e.scale!==void 0&&o.scale.fromArray(e.scale)),e.up!==void 0&&o.up.fromArray(e.up),e.castShadow!==void 0&&(o.castShadow=e.castShadow),e.receiveShadow!==void 0&&(o.receiveShadow=e.receiveShadow),e.shadow&&(e.shadow.intensity!==void 0&&(o.shadow.intensity=e.shadow.intensity),e.shadow.bias!==void 0&&(o.shadow.bias=e.shadow.bias),e.shadow.normalBias!==void 0&&(o.shadow.normalBias=e.shadow.normalBias),e.shadow.radius!==void 0&&(o.shadow.radius=e.shadow.radius),e.shadow.mapSize!==void 0&&o.shadow.mapSize.fromArray(e.shadow.mapSize),e.shadow.camera!==void 0&&(o.shadow.camera=this.parseObject(e.shadow.camera))),e.visible!==void 0&&(o.visible=e.visible),e.frustumCulled!==void 0&&(o.frustumCulled=e.frustumCulled),e.renderOrder!==void 0&&(o.renderOrder=e.renderOrder),e.userData!==void 0&&(o.userData=e.userData),e.layers!==void 0&&(o.layers.mask=e.layers),e.children!==void 0){const f=e.children;for(let d=0;d<f.length;d++)o.add(this.parseObject(f[d],t,n,i,r))}if(e.animations!==void 0){const f=e.animations;for(let d=0;d<f.length;d++){const p=f[d];o.animations.push(r[p])}}if(e.type==="LOD"){e.autoUpdate!==void 0&&(o.autoUpdate=e.autoUpdate);const f=e.levels;for(let d=0;d<f.length;d++){const p=f[d],v=o.getObjectByProperty("uuid",p.object);v!==void 0&&o.addLevel(v,p.distance,p.hysteresis)}}return o}bindSkeletons(e,t){Object.keys(t).length!==0&&e.traverse(function(n){if(n.isSkinnedMesh===!0&&n.skeleton!==void 0){const i=t[n.skeleton];i===void 0||n.bind(i,n.bindMatrix)}})}bindLightTargets(e){e.traverse(function(t){if(t.isDirectionalLight||t.isSpotLight){const n=t.target,i=e.getObjectByProperty("uuid",n);i!==void 0?t.target=i:t.target=new xt}})}}const tb={UVMapping:wl,CubeReflectionMapping:si,CubeRefractionMapping:Bi,EquirectangularReflectionMapping:as,EquirectangularRefractionMapping:Ys,CubeUVReflectionMapping:ps},td={RepeatWrapping:Zs,ClampToEdgeWrapping:Nn,MirroredRepeatWrapping:$s},nd={NearestFilter:tn,NearestMipmapNearestFilter:Pu,NearestMipmapLinearFilter:Qr,LinearFilter:Ut,LinearMipmapNearestFilter:Ns,LinearMipmapLinearFilter:Qn};class nb extends bn{constructor(e){super(e),this.isImageBitmapLoader=!0,this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=_i.get(e);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(c=>{t&&t(c),r.manager.itemEnd(e)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return _i.add(e,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){i&&i(c),_i.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});_i.add(e,l),r.manager.itemStart(e)}}let ma;class gh{static getContext(){return ma===void 0&&(ma=new(window.AudioContext||window.webkitAudioContext)),ma}static setContext(e){ma=e}}class ib extends bn{constructor(e){super(e)}load(e,t,n,i){const r=this,o=new wi(this.manager);o.setResponseType("arraybuffer"),o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(l){try{const c=l.slice(0);gh.getContext().decodeAudioData(c,function(h){t(h)}).catch(a)}catch(c){a(c)}},n,i);function a(l){i&&i(l),r.manager.itemError(e)}}}const id=new rt,rd=new rt,Ji=new rt;class rb{constructor(){this.type="StereoCamera",this.aspect=1,this.eyeSep=.064,this.cameraL=new Dt,this.cameraL.layers.enable(1),this.cameraL.matrixAutoUpdate=!1,this.cameraR=new Dt,this.cameraR.layers.enable(2),this.cameraR.matrixAutoUpdate=!1,this._cache={focus:null,fov:null,aspect:null,near:null,far:null,zoom:null,eyeSep:null}}update(e){const t=this._cache;if(t.focus!==e.focus||t.fov!==e.fov||t.aspect!==e.aspect*this.aspect||t.near!==e.near||t.far!==e.far||t.zoom!==e.zoom||t.eyeSep!==this.eyeSep){t.focus=e.focus,t.fov=e.fov,t.aspect=e.aspect*this.aspect,t.near=e.near,t.far=e.far,t.zoom=e.zoom,t.eyeSep=this.eyeSep,Ji.copy(e.projectionMatrix);const i=t.eyeSep/2,r=i*t.near/t.focus,o=t.near*Math.tan(pr*t.fov*.5)/t.zoom;let a,l;rd.elements[12]=-i,id.elements[12]=i,a=-o*t.aspect+r,l=o*t.aspect+r,Ji.elements[0]=2*t.near/(l-a),Ji.elements[8]=(l+a)/(l-a),this.cameraL.projectionMatrix.copy(Ji),a=-o*t.aspect-r,l=o*t.aspect-r,Ji.elements[0]=2*t.near/(l-a),Ji.elements[8]=(l+a)/(l-a),this.cameraR.projectionMatrix.copy(Ji)}this.cameraL.matrixWorld.copy(e.matrixWorld).multiply(rd),this.cameraR.matrixWorld.copy(e.matrixWorld).multiply(id)}}class vh{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=sd(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=sd();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function sd(){return performance.now()}const Ki=new L,od=new ln,sb=new L,Qi=new L;class ob extends xt{constructor(){super(),this.type="AudioListener",this.context=gh.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._clock=new vh}getInput(){return this.gain}removeFilter(){return this.filter!==null&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this}getFilter(){return this.filter}setFilter(e){return this.filter!==null?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=e,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}updateMatrixWorld(e){super.updateMatrixWorld(e);const t=this.context.listener,n=this.up;if(this.timeDelta=this._clock.getDelta(),this.matrixWorld.decompose(Ki,od,sb),Qi.set(0,0,-1).applyQuaternion(od),t.positionX){const i=this.context.currentTime+this.timeDelta;t.positionX.linearRampToValueAtTime(Ki.x,i),t.positionY.linearRampToValueAtTime(Ki.y,i),t.positionZ.linearRampToValueAtTime(Ki.z,i),t.forwardX.linearRampToValueAtTime(Qi.x,i),t.forwardY.linearRampToValueAtTime(Qi.y,i),t.forwardZ.linearRampToValueAtTime(Qi.z,i),t.upX.linearRampToValueAtTime(n.x,i),t.upY.linearRampToValueAtTime(n.y,i),t.upZ.linearRampToValueAtTime(n.z,i)}else t.setPosition(Ki.x,Ki.y,Ki.z),t.setOrientation(Qi.x,Qi.y,Qi.z,n.x,n.y,n.z)}}class Gm extends xt{constructor(e){super(),this.type="Audio",this.listener=e,this.context=e.context,this.gain=this.context.createGain(),this.gain.connect(e.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(e){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=e,this.connect(),this}setMediaElementSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(e),this.connect(),this}setMediaStreamSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(e),this.connect(),this}setBuffer(e){return this.buffer=e,this.sourceType="buffer",this.autoplay&&this.play(),this}play(e=0){if(this.isPlaying===!0||this.hasPlaybackControl===!1)return;this._startedAt=this.context.currentTime+e;const t=this.context.createBufferSource();return t.buffer=this.buffer,t.loop=this.loop,t.loopStart=this.loopStart,t.loopEnd=this.loopEnd,t.onended=this.onEnded.bind(this),t.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=t,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(this.hasPlaybackControl!==!1)return this.isPlaying===!0&&(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,this.loop===!0&&(this._progress=this._progress%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this}stop(e=0){if(this.hasPlaybackControl!==!1)return this._progress=0,this.source!==null&&(this.source.stop(this.context.currentTime+e),this.source.onended=null),this.isPlaying=!1,this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].connect(this.filters[e]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this._connected!==!1){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].disconnect(this.filters[e]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}}getFilters(){return this.filters}setFilters(e){return e||(e=[]),this._connected===!0?(this.disconnect(),this.filters=e.slice(),this.connect()):this.filters=e.slice(),this}setDetune(e){return this.detune=e,this.isPlaying===!0&&this.source.detune!==void 0&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(e){return this.setFilters(e?[e]:[])}setPlaybackRate(e){if(this.hasPlaybackControl!==!1)return this.playbackRate=e,this.isPlaying===!0&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1}getLoop(){return this.hasPlaybackControl===!1?!1:this.loop}setLoop(e){if(this.hasPlaybackControl!==!1)return this.loop=e,this.isPlaying===!0&&(this.source.loop=this.loop),this}setLoopStart(e){return this.loopStart=e,this}setLoopEnd(e){return this.loopEnd=e,this}getVolume(){return this.gain.gain.value}setVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}}const er=new L,ad=new ln,ab=new L,tr=new L;class lb extends Gm{constructor(e){super(e),this.panner=this.context.createPanner(),this.panner.panningModel="HRTF",this.panner.connect(this.gain)}connect(){super.connect(),this.panner.connect(this.gain)}disconnect(){super.disconnect(),this.panner.disconnect(this.gain)}getOutput(){return this.panner}getRefDistance(){return this.panner.refDistance}setRefDistance(e){return this.panner.refDistance=e,this}getRolloffFactor(){return this.panner.rolloffFactor}setRolloffFactor(e){return this.panner.rolloffFactor=e,this}getDistanceModel(){return this.panner.distanceModel}setDistanceModel(e){return this.panner.distanceModel=e,this}getMaxDistance(){return this.panner.maxDistance}setMaxDistance(e){return this.panner.maxDistance=e,this}setDirectionalCone(e,t,n){return this.panner.coneInnerAngle=e,this.panner.coneOuterAngle=t,this.panner.coneOuterGain=n,this}updateMatrixWorld(e){if(super.updateMatrixWorld(e),this.hasPlaybackControl===!0&&this.isPlaying===!1)return;this.matrixWorld.decompose(er,ad,ab),tr.set(0,0,1).applyQuaternion(ad);const t=this.panner;if(t.positionX){const n=this.context.currentTime+this.listener.timeDelta;t.positionX.linearRampToValueAtTime(er.x,n),t.positionY.linearRampToValueAtTime(er.y,n),t.positionZ.linearRampToValueAtTime(er.z,n),t.orientationX.linearRampToValueAtTime(tr.x,n),t.orientationY.linearRampToValueAtTime(tr.y,n),t.orientationZ.linearRampToValueAtTime(tr.z,n)}else t.setPosition(er.x,er.y,er.z),t.setOrientation(tr.x,tr.y,tr.z)}}class cb{constructor(e,t=2048){this.analyser=e.context.createAnalyser(),this.analyser.fftSize=t,this.data=new Uint8Array(this.analyser.frequencyBinCount),e.getOutput().connect(this.analyser)}getFrequencyData(){return this.analyser.getByteFrequencyData(this.data),this.data}getAverageFrequency(){let e=0;const t=this.getFrequencyData();for(let n=0;n<t.length;n++)e+=t[n];return e/t.length}}class Vm{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,r,o;switch(t){case"quaternion":i=this._slerp,r=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,r=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,r=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=r,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,i=this.valueSize,r=e*i+i;let o=this.cumulativeWeight;if(o===0){for(let a=0;a!==i;++a)n[r+a]=n[a];o=t}else{o+=t;const a=t/o;this._mixBufferRegion(n,r,0,a,i)}this.cumulativeWeight=o}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,i=e*t+t,r=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){const l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-r,t)}o>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){a.setValue(n,i);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let r=n,o=i;r!==o;++r)t[r]=t[i+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,r){if(i>=.5)for(let o=0;o!==r;++o)e[t+o]=e[n+o]}_slerp(e,t,n,i){ln.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,r){const o=this._workIndex*r;ln.multiplyQuaternionsFlat(e,o,e,t,e,n),ln.slerpFlat(e,t,e,t,e,o,i)}_lerp(e,t,n,i,r){const o=1-i;for(let a=0;a!==r;++a){const l=t+a;e[l]=e[l]*o+e[n+a]*i}}_lerpAdditive(e,t,n,i,r){for(let o=0;o!==r;++o){const a=t+o;e[a]=e[a]+e[n+o]*i}}}const _h="\\[\\]\\.:\\/",ub=new RegExp("["+_h+"]","g"),xh="[^"+_h+"]",hb="[^"+_h.replace("\\.","")+"]",fb=/((?:WC+[\/:])*)/.source.replace("WC",xh),db=/(WCOD+)?/.source.replace("WCOD",hb),pb=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",xh),mb=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",xh),gb=new RegExp("^"+fb+db+pb+mb+"$"),vb=["material","materials","bones","map"];class _b{constructor(e,t,n){const i=n||St.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class St{constructor(e,t,n){this.path=t,this.parsedPath=n||St.parseTrackName(t),this.node=St.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new St.Composite(e,t,n):new St(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(ub,"")}static parseTrackName(e){const t=gb.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);vb.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let r=t.propertyIndex;if(e||(e=St.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e)return;if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material||!e.material.materials)return;e=e.material.materials;break;case"bones":if(!e.skeleton)return;e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material||!e.material.map)return;e=e.material.map;break;default:if(e[n]===void 0)return;e=e[n]}if(c!==void 0){if(e[c]===void 0)return;e=e[c]}}const o=e[i];if(o===void 0){const c=t.nodeName;return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry||!e.geometry.morphAttributes)return;e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}St.Composite=_b;St.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};St.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};St.prototype.GetterByBindingType=[St.prototype._getValue_direct,St.prototype._getValue_array,St.prototype._getValue_arrayElement,St.prototype._getValue_toArray];St.prototype.SetterByBindingTypeAndVersioning=[[St.prototype._setValue_direct,St.prototype._setValue_direct_setNeedsUpdate,St.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[St.prototype._setValue_array,St.prototype._setValue_array_setNeedsUpdate,St.prototype._setValue_array_setMatrixWorldNeedsUpdate],[St.prototype._setValue_arrayElement,St.prototype._setValue_arrayElement_setNeedsUpdate,St.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[St.prototype._setValue_fromArray,St.prototype._setValue_fromArray_setNeedsUpdate,St.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class xb{constructor(){this.isAnimationObjectGroup=!0,this.uuid=In(),this._objects=Array.prototype.slice.call(arguments),this.nCachedObjects_=0;const e={};this._indicesByUUID=e;for(let n=0,i=arguments.length;n!==i;++n)e[arguments[n].uuid]=n;this._paths=[],this._parsedPaths=[],this._bindings=[],this._bindingsIndicesByPath={};const t=this;this.stats={objects:{get total(){return t._objects.length},get inUse(){return this.total-t.nCachedObjects_}},get bindingsPerObject(){return t._bindings.length}}}add(){const e=this._objects,t=this._indicesByUUID,n=this._paths,i=this._parsedPaths,r=this._bindings,o=r.length;let a,l=e.length,c=this.nCachedObjects_;for(let u=0,h=arguments.length;u!==h;++u){const f=arguments[u],d=f.uuid;let p=t[d];if(p===void 0){p=l++,t[d]=p,e.push(f);for(let v=0,g=o;v!==g;++v)r[v].push(new St(f,n[v],i[v]))}else if(p<c){a=e[p];const v=--c,g=e[v];t[g.uuid]=p,e[p]=g,t[d]=v,e[v]=f;for(let m=0,x=o;m!==x;++m){const _=r[m],y=_[v];let A=_[p];_[p]=y,A===void 0&&(A=new St(f,n[m],i[m])),_[v]=A}}else e[p]}this.nCachedObjects_=c}remove(){const e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length;let r=this.nCachedObjects_;for(let o=0,a=arguments.length;o!==a;++o){const l=arguments[o],c=l.uuid,u=t[c];if(u!==void 0&&u>=r){const h=r++,f=e[h];t[f.uuid]=u,e[u]=f,t[c]=h,e[h]=l;for(let d=0,p=i;d!==p;++d){const v=n[d],g=v[h],m=v[u];v[u]=g,v[h]=m}}}this.nCachedObjects_=r}uncache(){const e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length;let r=this.nCachedObjects_,o=e.length;for(let a=0,l=arguments.length;a!==l;++a){const c=arguments[a],u=c.uuid,h=t[u];if(h!==void 0)if(delete t[u],h<r){const f=--r,d=e[f],p=--o,v=e[p];t[d.uuid]=h,e[h]=d,t[v.uuid]=f,e[f]=v,e.pop();for(let g=0,m=i;g!==m;++g){const x=n[g],_=x[f],y=x[p];x[h]=_,x[f]=y,x.pop()}}else{const f=--o,d=e[f];f>0&&(t[d.uuid]=h),e[h]=d,e.pop();for(let p=0,v=i;p!==v;++p){const g=n[p];g[h]=g[f],g.pop()}}}this.nCachedObjects_=r}subscribe_(e,t){const n=this._bindingsIndicesByPath;let i=n[e];const r=this._bindings;if(i!==void 0)return r[i];const o=this._paths,a=this._parsedPaths,l=this._objects,c=l.length,u=this.nCachedObjects_,h=new Array(c);i=r.length,n[e]=i,o.push(e),a.push(t),r.push(h);for(let f=u,d=l.length;f!==d;++f){const p=l[f];h[f]=new St(p,e,t)}return h}unsubscribe_(e){const t=this._bindingsIndicesByPath,n=t[e];if(n!==void 0){const i=this._paths,r=this._parsedPaths,o=this._bindings,a=o.length-1,l=o[a],c=e[a];t[c]=n,o[n]=l,o.pop(),r[n]=r[a],r.pop(),i[n]=i[a],i.pop()}}}class Hm{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;const r=t.tracks,o=r.length,a=new Array(o),l={endingStart:ar,endingEnd:ar};for(let c=0;c!==o;++c){const u=r[c].createInterpolant(null);a[c]=u,u.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Cp,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){const i=this._clip.duration,r=e._clip.duration,o=r/i,a=i/r;e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,r=i.time,o=this.timeScale;let a=this._timeScaleInterpolant;a===null&&(a=i._lendControlInterpolant(),this._timeScaleInterpolant=a);const l=a.parameterPositions,c=a.sampleValues;return l[0]=r,l[1]=r+n,c[0]=e/o,c[1]=t/o,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const r=this._startTime;if(r!==null){const l=(e-r)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);const o=this._updateTime(t),a=this._updateWeight(e);if(a>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Gu:for(let u=0,h=l.length;u!==h;++u)l[u].evaluate(o),c[u].accumulateAdditive(a);break;case Il:default:for(let u=0,h=l.length;u!==h;++u)l[u].evaluate(o),c[u].accumulate(i,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,r=this._loopCount;const o=n===Rp;if(e===0)return r===-1?i:o&&(r&1)===1?t-i:i;if(n===Ap){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),i>=t||i<0){const a=Math.floor(i/t);i-=t*a,r+=Math.abs(a);const l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const c=e<0;this._setEndings(c,!c,o)}else this._setEndings(!1,!1,o);this._loopCount=r,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=i;if(o&&(r&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=lr,i.endingEnd=lr):(e?i.endingStart=this.zeroSlopeAtStart?lr:ar:i.endingStart=Js,t?i.endingEnd=this.zeroSlopeAtEnd?lr:ar:i.endingEnd=Js)}_scheduleFading(e,t,n){const i=this._mixer,r=i.time;let o=this._weightInterpolant;o===null&&(o=i._lendControlInterpolant(),this._weightInterpolant=o);const a=o.parameterPositions,l=o.sampleValues;return a[0]=r,l[0]=t,a[1]=r+e,l[1]=n,this}}const yb=new Float32Array(1);class Sb extends oi{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,r=i.length,o=e._propertyBindings,a=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let u=c[l];u===void 0&&(u={},c[l]=u);for(let h=0;h!==r;++h){const f=i[h],d=f.name;let p=u[d];if(p!==void 0)++p.referenceCount,o[h]=p;else{if(p=o[h],p!==void 0){p._cacheIndex===null&&(++p.referenceCount,this._addInactiveBinding(p,l,d));continue}const v=t&&t._propertyBindings[h].binding.parsedPath;p=new Vm(St.create(n,d,v),f.ValueTypeName,f.getValueSize()),++p.referenceCount,this._addInactiveBinding(p,l,d),o[h]=p}a[h].resultBuffer=p.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,r=this._actionsByClip[i];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const i=this._actions,r=this._actionsByClip;let o=r[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=o;else{const a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=i.length,i.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const r=e._clip.uuid,o=this._actionsByClip,a=o[r],l=a.knownActions,c=l[l.length-1],u=e._byClipCacheIndex;c._byClipCacheIndex=u,l[u]=c,l.pop(),e._byClipCacheIndex=null;const h=a.actionByRoot,f=(e._localRoot||this._root).uuid;delete h[f],l.length===0&&delete o[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){const i=this._bindingsByRootAndName,r=this._bindings;let o=i[t];o===void 0&&(o={},i[t]=o),o[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,r=n.path,o=this._bindingsByRootAndName,a=o[i],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete a[r],Object.keys(a).length===0&&delete o[i]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new hh(new Float32Array(2),new Float32Array(2),1,yb),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,r=t[i];e.__cacheIndex=i,t[i]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){const i=t||this._root,r=i.uuid;let o=typeof e=="string"?lo.findByName(i,e):e;const a=o!==null?o.uuid:e,l=this._actionsByClip[a];let c=null;if(n===void 0&&(o!==null?n=o.blendMode:n=Il),l!==void 0){const h=l.actionByRoot[r];if(h!==void 0&&h.blendMode===n)return h;c=l.knownActions[0],o===null&&(o=c._clip)}if(o===null)return null;const u=new Hm(this,o,t,n);return this._bindAction(u,c),this._addInactiveAction(u,a,r),u}existingAction(e,t){const n=t||this._root,i=n.uuid,r=typeof e=="string"?lo.findByName(n,e):e,o=r?r.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[i]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,r=Math.sign(e),o=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,r,o);const a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,r=i[n];if(r!==void 0){const o=r.knownActions;for(let a=0,l=o.length;a!==l;++a){const c=o[a];this._deactivateAction(c);const u=c._cacheIndex,h=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,h._cacheIndex=u,t[u]=h,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const o in n){const a=n[o].actionByRoot,l=a[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const i=this._bindingsByRootAndName,r=i[t];if(r!==void 0)for(const o in r){const a=r[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}class yh{constructor(e){this.value=e}clone(){return new yh(this.value.clone===void 0?this.value:this.value.clone())}}let Mb=0;class bb extends oi{constructor(){super(),this.isUniformsGroup=!0,Object.defineProperty(this,"id",{value:Mb++}),this.name="",this.usage=Ks,this.uniforms=[]}add(e){return this.uniforms.push(e),this}remove(e){const t=this.uniforms.indexOf(e);return t!==-1&&this.uniforms.splice(t,1),this}setName(e){return this.name=e,this}setUsage(e){return this.usage=e,this}dispose(){return this.dispatchEvent({type:"dispose"}),this}copy(e){this.name=e.name,this.usage=e.usage;const t=e.uniforms;this.uniforms.length=0;for(let n=0,i=t.length;n<i;n++){const r=Array.isArray(t[n])?t[n]:[t[n]];for(let o=0;o<r.length;o++)this.uniforms.push(r[o].clone())}return this}clone(){return new this.constructor().copy(this)}}class Sl extends Nl{constructor(e,t,n=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){const t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){const t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}}class wb{constructor(e,t,n,i,r){this.isGLBufferAttribute=!0,this.name="",this.buffer=e,this.type=t,this.itemSize=n,this.elementSize=i,this.count=r,this.version=0}set needsUpdate(e){e===!0&&this.version++}setBuffer(e){return this.buffer=e,this}setType(e,t){return this.type=e,this.elementSize=t,this}setItemSize(e){return this.itemSize=e,this}setCount(e){return this.count=e,this}}const ld=new rt;class Sh{constructor(e,t,n=0,i=1/0){this.ray=new Er(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new mr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera&&(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t)}setFromXRController(e){return ld.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ld),this}intersectObject(e,t=!0,n=[]){return Su(e,this,n,t),n.sort(cd),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)Su(e[i],this,n,t);return n.sort(cd),n}}function cd(s,e){return s.distance-e.distance}function Su(s,e,t,n){let i=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){const r=s.children;for(let o=0,a=r.length;o<a;o++)Su(r[o],e,t,!0)}}class Ml{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(kt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Eb{constructor(e=1,t=0,n=0){return this.radius=e,this.theta=t,this.y=n,this}set(e,t,n){return this.radius=e,this.theta=t,this.y=n,this}copy(e){return this.radius=e.radius,this.theta=e.theta,this.y=e.y,this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+n*n),this.theta=Math.atan2(e,n),this.y=t,this}clone(){return new this.constructor().copy(this)}}class Mh{constructor(e,t,n,i){Mh.prototype.isMatrix2=!0,this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){const r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=i,this}}const ud=new pe;class Tb{constructor(e=new pe(1/0,1/0),t=new pe(-1/0,-1/0)){this.isBox2=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=ud.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ud).distanceTo(e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const hd=new L,ga=new L;class Wm{constructor(e=new L,t=new L){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){hd.subVectors(e,this.start),ga.subVectors(this.end,this.start);const n=ga.dot(ga);let r=ga.dot(hd)/n;return t&&(r=kt(r,0,1)),r}closestPointToPoint(e,t,n){const i=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(i).add(this.start)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}const fd=new L;class Ab extends xt{constructor(e,t){super(),this.light=e,this.matrixAutoUpdate=!1,this.color=t,this.type="SpotLightHelper";const n=new pt,i=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1];for(let o=0,a=1,l=32;o<l;o++,a++){const c=o/l*Math.PI*2,u=a/l*Math.PI*2;i.push(Math.cos(c),Math.sin(c),1,Math.cos(u),Math.sin(u),1)}n.setAttribute("position",new je(i,3));const r=new vn({fog:!1,toneMapped:!1});this.cone=new li(n,r),this.add(this.cone),this.update()}dispose(){this.cone.geometry.dispose(),this.cone.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),this.parent?(this.parent.updateWorldMatrix(!0),this.matrix.copy(this.parent.matrixWorld).invert().multiply(this.light.matrixWorld)):this.matrix.copy(this.light.matrixWorld),this.matrixWorld.copy(this.light.matrixWorld);const e=this.light.distance?this.light.distance:1e3,t=e*Math.tan(this.light.angle);this.cone.scale.set(t,t,e),fd.setFromMatrixPosition(this.light.target.matrixWorld),this.cone.lookAt(fd),this.color!==void 0?this.cone.material.color.set(this.color):this.cone.material.color.copy(this.light.color)}}const Di=new L,va=new rt,Wc=new rt;class Cb extends li{constructor(e){const t=Xm(e),n=new pt,i=[],r=[],o=new We(0,0,1),a=new We(0,1,0);for(let c=0;c<t.length;c++){const u=t[c];u.parent&&u.parent.isBone&&(i.push(0,0,0),i.push(0,0,0),r.push(o.r,o.g,o.b),r.push(a.r,a.g,a.b))}n.setAttribute("position",new je(i,3)),n.setAttribute("color",new je(r,3));const l=new vn({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,transparent:!0});super(n,l),this.isSkeletonHelper=!0,this.type="SkeletonHelper",this.root=e,this.bones=t,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1}updateMatrixWorld(e){const t=this.bones,n=this.geometry,i=n.getAttribute("position");Wc.copy(this.root.matrixWorld).invert();for(let r=0,o=0;r<t.length;r++){const a=t[r];a.parent&&a.parent.isBone&&(va.multiplyMatrices(Wc,a.matrixWorld),Di.setFromMatrixPosition(va),i.setXYZ(o,Di.x,Di.y,Di.z),va.multiplyMatrices(Wc,a.parent.matrixWorld),Di.setFromMatrixPosition(va),i.setXYZ(o+1,Di.x,Di.y,Di.z),o+=2)}n.getAttribute("position").needsUpdate=!0,super.updateMatrixWorld(e)}dispose(){this.geometry.dispose(),this.material.dispose()}}function Xm(s){const e=[];s.isBone===!0&&e.push(s);for(let t=0;t<s.children.length;t++)e.push.apply(e,Xm(s.children[t]));return e}class Rb extends Rt{constructor(e,t,n){const i=new Eo(t,4,2),r=new Ei({wireframe:!0,fog:!1,toneMapped:!1});super(i,r),this.light=e,this.color=n,this.type="PointLightHelper",this.matrix=this.light.matrixWorld,this.matrixAutoUpdate=!1,this.update()}dispose(){this.geometry.dispose(),this.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.color!==void 0?this.material.color.set(this.color):this.material.color.copy(this.light.color)}}const Ib=new L,dd=new We,pd=new We;class Pb extends xt{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="HemisphereLightHelper";const i=new wo(t);i.rotateY(Math.PI*.5),this.material=new Ei({wireframe:!0,fog:!1,toneMapped:!1}),this.color===void 0&&(this.material.vertexColors=!0);const r=i.getAttribute("position"),o=new Float32Array(r.count*3);i.setAttribute("color",new Tt(o,3)),this.add(new Rt(i,this.material)),this.update()}dispose(){this.children[0].geometry.dispose(),this.children[0].material.dispose()}update(){const e=this.children[0];if(this.color!==void 0)this.material.color.set(this.color);else{const t=e.geometry.getAttribute("color");dd.copy(this.light.color),pd.copy(this.light.groundColor);for(let n=0,i=t.count;n<i;n++){const r=n<i/2?dd:pd;t.setXYZ(n,r.r,r.g,r.b)}t.needsUpdate=!0}this.light.updateWorldMatrix(!0,!1),e.lookAt(Ib.setFromMatrixPosition(this.light.matrixWorld).negate())}}class Ub extends li{constructor(e=10,t=10,n=4473924,i=8947848){n=new We(n),i=new We(i);const r=t/2,o=e/t,a=e/2,l=[],c=[];for(let f=0,d=0,p=-a;f<=t;f++,p+=o){l.push(-a,0,p,a,0,p),l.push(p,0,-a,p,0,a);const v=f===r?n:i;v.toArray(c,d),d+=3,v.toArray(c,d),d+=3,v.toArray(c,d),d+=3,v.toArray(c,d),d+=3}const u=new pt;u.setAttribute("position",new je(l,3)),u.setAttribute("color",new je(c,3));const h=new vn({vertexColors:!0,toneMapped:!1});super(u,h),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class Db extends li{constructor(e=10,t=16,n=8,i=64,r=4473924,o=8947848){r=new We(r),o=new We(o);const a=[],l=[];if(t>1)for(let h=0;h<t;h++){const f=h/t*(Math.PI*2),d=Math.sin(f)*e,p=Math.cos(f)*e;a.push(0,0,0),a.push(d,0,p);const v=h&1?r:o;l.push(v.r,v.g,v.b),l.push(v.r,v.g,v.b)}for(let h=0;h<n;h++){const f=h&1?r:o,d=e-e/n*h;for(let p=0;p<i;p++){let v=p/i*(Math.PI*2),g=Math.sin(v)*d,m=Math.cos(v)*d;a.push(g,0,m),l.push(f.r,f.g,f.b),v=(p+1)/i*(Math.PI*2),g=Math.sin(v)*d,m=Math.cos(v)*d,a.push(g,0,m),l.push(f.r,f.g,f.b)}}const c=new pt;c.setAttribute("position",new je(a,3)),c.setAttribute("color",new je(l,3));const u=new vn({vertexColors:!0,toneMapped:!1});super(c,u),this.type="PolarGridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}const md=new L,_a=new L,gd=new L;class Lb extends xt{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="DirectionalLightHelper",t===void 0&&(t=1);let i=new pt;i.setAttribute("position",new je([-t,t,0,t,t,0,t,-t,0,-t,-t,0,-t,t,0],3));const r=new vn({fog:!1,toneMapped:!1});this.lightPlane=new ki(i,r),this.add(this.lightPlane),i=new pt,i.setAttribute("position",new je([0,0,0,0,0,1],3)),this.targetLine=new ki(i,r),this.add(this.targetLine),this.update()}dispose(){this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.geometry.dispose(),this.targetLine.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),md.setFromMatrixPosition(this.light.matrixWorld),_a.setFromMatrixPosition(this.light.target.matrixWorld),gd.subVectors(_a,md),this.lightPlane.lookAt(_a),this.color!==void 0?(this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color)):(this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color)),this.targetLine.lookAt(_a),this.targetLine.scale.z=gd.length()}}const xa=new L,Bt=new _o;class Fb extends li{constructor(e){const t=new pt,n=new vn({color:16777215,vertexColors:!0,toneMapped:!1}),i=[],r=[],o={};a("n1","n2"),a("n2","n4"),a("n4","n3"),a("n3","n1"),a("f1","f2"),a("f2","f4"),a("f4","f3"),a("f3","f1"),a("n1","f1"),a("n2","f2"),a("n3","f3"),a("n4","f4"),a("p","n1"),a("p","n2"),a("p","n3"),a("p","n4"),a("u1","u2"),a("u2","u3"),a("u3","u1"),a("c","t"),a("p","c"),a("cn1","cn2"),a("cn3","cn4"),a("cf1","cf2"),a("cf3","cf4");function a(p,v){l(p),l(v)}function l(p){i.push(0,0,0),r.push(0,0,0),o[p]===void 0&&(o[p]=[]),o[p].push(i.length/3-1)}t.setAttribute("position",new je(i,3)),t.setAttribute("color",new je(r,3)),super(t,n),this.type="CameraHelper",this.camera=e,this.camera.updateProjectionMatrix&&this.camera.updateProjectionMatrix(),this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=o,this.update();const c=new We(16755200),u=new We(16711680),h=new We(43775),f=new We(16777215),d=new We(3355443);this.setColors(c,u,h,f,d)}setColors(e,t,n,i,r){const a=this.geometry.getAttribute("color");a.setXYZ(0,e.r,e.g,e.b),a.setXYZ(1,e.r,e.g,e.b),a.setXYZ(2,e.r,e.g,e.b),a.setXYZ(3,e.r,e.g,e.b),a.setXYZ(4,e.r,e.g,e.b),a.setXYZ(5,e.r,e.g,e.b),a.setXYZ(6,e.r,e.g,e.b),a.setXYZ(7,e.r,e.g,e.b),a.setXYZ(8,e.r,e.g,e.b),a.setXYZ(9,e.r,e.g,e.b),a.setXYZ(10,e.r,e.g,e.b),a.setXYZ(11,e.r,e.g,e.b),a.setXYZ(12,e.r,e.g,e.b),a.setXYZ(13,e.r,e.g,e.b),a.setXYZ(14,e.r,e.g,e.b),a.setXYZ(15,e.r,e.g,e.b),a.setXYZ(16,e.r,e.g,e.b),a.setXYZ(17,e.r,e.g,e.b),a.setXYZ(18,e.r,e.g,e.b),a.setXYZ(19,e.r,e.g,e.b),a.setXYZ(20,e.r,e.g,e.b),a.setXYZ(21,e.r,e.g,e.b),a.setXYZ(22,e.r,e.g,e.b),a.setXYZ(23,e.r,e.g,e.b),a.setXYZ(24,t.r,t.g,t.b),a.setXYZ(25,t.r,t.g,t.b),a.setXYZ(26,t.r,t.g,t.b),a.setXYZ(27,t.r,t.g,t.b),a.setXYZ(28,t.r,t.g,t.b),a.setXYZ(29,t.r,t.g,t.b),a.setXYZ(30,t.r,t.g,t.b),a.setXYZ(31,t.r,t.g,t.b),a.setXYZ(32,n.r,n.g,n.b),a.setXYZ(33,n.r,n.g,n.b),a.setXYZ(34,n.r,n.g,n.b),a.setXYZ(35,n.r,n.g,n.b),a.setXYZ(36,n.r,n.g,n.b),a.setXYZ(37,n.r,n.g,n.b),a.setXYZ(38,i.r,i.g,i.b),a.setXYZ(39,i.r,i.g,i.b),a.setXYZ(40,r.r,r.g,r.b),a.setXYZ(41,r.r,r.g,r.b),a.setXYZ(42,r.r,r.g,r.b),a.setXYZ(43,r.r,r.g,r.b),a.setXYZ(44,r.r,r.g,r.b),a.setXYZ(45,r.r,r.g,r.b),a.setXYZ(46,r.r,r.g,r.b),a.setXYZ(47,r.r,r.g,r.b),a.setXYZ(48,r.r,r.g,r.b),a.setXYZ(49,r.r,r.g,r.b),a.needsUpdate=!0}update(){const e=this.geometry,t=this.pointMap,n=1,i=1;Bt.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),Gt("c",t,e,Bt,0,0,-1),Gt("t",t,e,Bt,0,0,1),Gt("n1",t,e,Bt,-n,-i,-1),Gt("n2",t,e,Bt,n,-i,-1),Gt("n3",t,e,Bt,-n,i,-1),Gt("n4",t,e,Bt,n,i,-1),Gt("f1",t,e,Bt,-n,-i,1),Gt("f2",t,e,Bt,n,-i,1),Gt("f3",t,e,Bt,-n,i,1),Gt("f4",t,e,Bt,n,i,1),Gt("u1",t,e,Bt,n*.7,i*1.1,-1),Gt("u2",t,e,Bt,-n*.7,i*1.1,-1),Gt("u3",t,e,Bt,0,i*2,-1),Gt("cf1",t,e,Bt,-n,0,1),Gt("cf2",t,e,Bt,n,0,1),Gt("cf3",t,e,Bt,0,-i,1),Gt("cf4",t,e,Bt,0,i,1),Gt("cn1",t,e,Bt,-n,0,-1),Gt("cn2",t,e,Bt,n,0,-1),Gt("cn3",t,e,Bt,0,-i,-1),Gt("cn4",t,e,Bt,0,i,-1),e.getAttribute("position").needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose()}}function Gt(s,e,t,n,i,r,o){xa.set(i,r,o).unproject(n);const a=e[s];if(a!==void 0){const l=t.getAttribute("position");for(let c=0,u=a.length;c<u;c++)l.setXYZ(a[c],xa.x,xa.y,xa.z)}}const ya=new Xt;class Ob extends li{constructor(e,t=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=new Float32Array(8*3),r=new pt;r.setIndex(new Tt(n,1)),r.setAttribute("position",new Tt(i,3)),super(r,new vn({color:t,toneMapped:!1})),this.object=e,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(e){if(this.object!==void 0&&ya.setFromObject(this.object),ya.isEmpty())return;const t=ya.min,n=ya.max,i=this.geometry.attributes.position,r=i.array;r[0]=n.x,r[1]=n.y,r[2]=n.z,r[3]=t.x,r[4]=n.y,r[5]=n.z,r[6]=t.x,r[7]=t.y,r[8]=n.z,r[9]=n.x,r[10]=t.y,r[11]=n.z,r[12]=n.x,r[13]=n.y,r[14]=t.z,r[15]=t.x,r[16]=n.y,r[17]=t.z,r[18]=t.x,r[19]=t.y,r[20]=t.z,r[21]=n.x,r[22]=t.y,r[23]=t.z,i.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(e){return this.object=e,this.update(),this}copy(e,t){return super.copy(e,t),this.object=e.object,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class Nb extends li{constructor(e,t=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],r=new pt;r.setIndex(new Tt(n,1)),r.setAttribute("position",new je(i,3)),super(r,new vn({color:t,toneMapped:!1})),this.box=e,this.type="Box3Helper",this.geometry.computeBoundingSphere()}updateMatrixWorld(e){const t=this.box;t.isEmpty()||(t.getCenter(this.position),t.getSize(this.scale),this.scale.multiplyScalar(.5),super.updateMatrixWorld(e))}dispose(){this.geometry.dispose(),this.material.dispose()}}class Bb extends ki{constructor(e,t=1,n=16776960){const i=n,r=[1,-1,0,-1,1,0,-1,-1,0,1,1,0,-1,1,0,-1,-1,0,1,-1,0,1,1,0],o=new pt;o.setAttribute("position",new je(r,3)),o.computeBoundingSphere(),super(o,new vn({color:i,toneMapped:!1})),this.type="PlaneHelper",this.plane=e,this.size=t;const a=[1,1,0,-1,1,0,-1,-1,0,1,1,0,-1,-1,0,1,-1,0],l=new pt;l.setAttribute("position",new je(a,3)),l.computeBoundingSphere(),this.add(new Rt(l,new Ei({color:i,opacity:.2,transparent:!0,depthWrite:!1,toneMapped:!1})))}updateMatrixWorld(e){this.position.set(0,0,0),this.scale.set(.5*this.size,.5*this.size,1),this.lookAt(this.plane.normal),this.translateZ(-this.plane.constant),super.updateMatrixWorld(e)}dispose(){this.geometry.dispose(),this.material.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose()}}const vd=new L;let Sa,Xc;class kb extends xt{constructor(e=new L(0,0,1),t=new L(0,0,0),n=1,i=16776960,r=n*.2,o=r*.2){super(),this.type="ArrowHelper",Sa===void 0&&(Sa=new pt,Sa.setAttribute("position",new je([0,0,0,0,1,0],3)),Xc=new gs(0,.5,1,5,1),Xc.translate(0,-.5,0)),this.position.copy(t),this.line=new ki(Sa,new vn({color:i,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new Rt(Xc,new Ei({color:i,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(n,r,o)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{vd.set(e.z,0,-e.x).normalize();const t=Math.acos(e.y);this.quaternion.setFromAxisAngle(vd,t)}}setLength(e,t=e*.2,n=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(n,t,n),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class zb extends li{constructor(e=1){const t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new pt;i.setAttribute("position",new je(t,3)),i.setAttribute("color",new je(n,3));const r=new vn({vertexColors:!0,toneMapped:!1});super(i,r),this.type="AxesHelper"}setColors(e,t,n){const i=new We,r=this.geometry.attributes.color.array;return i.set(e),i.toArray(r,0),i.toArray(r,3),i.set(t),i.toArray(r,6),i.toArray(r,9),i.set(n),i.toArray(r,12),i.toArray(r,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class Gb{constructor(){this.type="ShapePath",this.color=new We,this.subPaths=[],this.currentPath=null}moveTo(e,t){return this.currentPath=new no,this.subPaths.push(this.currentPath),this.currentPath.moveTo(e,t),this}lineTo(e,t){return this.currentPath.lineTo(e,t),this}quadraticCurveTo(e,t,n,i){return this.currentPath.quadraticCurveTo(e,t,n,i),this}bezierCurveTo(e,t,n,i,r,o){return this.currentPath.bezierCurveTo(e,t,n,i,r,o),this}splineThru(e){return this.currentPath.splineThru(e),this}toShapes(e){function t(m){const x=[];for(let _=0,y=m.length;_<y;_++){const A=m[_],b=new gr;b.curves=A.curves,x.push(b)}return x}function n(m,x){const _=x.length;let y=!1;for(let A=_-1,b=0;b<_;A=b++){let T=x[A],w=x[b],M=w.x-T.x,S=w.y-T.y;if(Math.abs(S)>Number.EPSILON){if(S<0&&(T=x[b],M=-M,w=x[A],S=-S),m.y<T.y||m.y>w.y)continue;if(m.y===T.y){if(m.x===T.x)return!0}else{const R=S*(m.x-T.x)-M*(m.y-T.y);if(R===0)return!0;if(R<0)continue;y=!y}}else{if(m.y!==T.y)continue;if(w.x<=m.x&&m.x<=T.x||T.x<=m.x&&m.x<=w.x)return!0}}return y}const i=ri.isClockWise,r=this.subPaths;if(r.length===0)return[];let o,a,l;const c=[];if(r.length===1)return a=r[0],l=new gr,l.curves=a.curves,c.push(l),c;let u=!i(r[0].getPoints());u=e?!u:u;const h=[],f=[];let d=[],p=0,v;f[p]=void 0,d[p]=[];for(let m=0,x=r.length;m<x;m++)a=r[m],v=a.getPoints(),o=i(v),o=e?!o:o,o?(!u&&f[p]&&p++,f[p]={s:new gr,p:v},f[p].s.curves=a.curves,u&&p++,d[p]=[]):d[p].push({h:a,p:v[0]});if(!f[0])return t(r);if(f.length>1){let m=!1,x=0;for(let _=0,y=f.length;_<y;_++)h[_]=[];for(let _=0,y=f.length;_<y;_++){const A=d[_];for(let b=0;b<A.length;b++){const T=A[b];let w=!0;for(let M=0;M<f.length;M++)n(T.p,f[M].p)&&(_!==M&&x++,w?(w=!1,h[M].push(T)):m=!0);w&&h[_].push(T)}}x>0&&m===!1&&(d=h)}let g;for(let m=0,x=f.length;m<x;m++){l=f[m].s,c.push(l),g=d[m];for(let _=0,y=g.length;_<y;_++)l.holes.push(g[_].h)}return c}}class Vb extends oi{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}class Hb extends Pn{constructor(e=1,t=1,n=1,i={}){super(e,t,{...i,count:n}),this.isWebGLMultipleRenderTargets=!0}get texture(){return this.textures}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ds}}));typeof window<"u"&&(window.__THREE__||(window.__THREE__=ds));const Wb=Object.freeze(Object.defineProperty({__proto__:null,ACESFilmicToneMapping:Iu,AddEquation:Oi,AddOperation:xp,AdditiveAnimationBlendMode:Gu,AdditiveBlending:Fa,AgXToneMapping:wp,AlphaFormat:Fu,AlwaysCompare:Bp,AlwaysDepth:ka,AlwaysStencilFunc:hu,AmbientLight:Om,AnimationAction:Hm,AnimationClip:lo,AnimationLoader:ZM,AnimationMixer:Sb,AnimationObjectGroup:xb,AnimationUtils:WM,ArcCurve:lm,ArrayCamera:Kp,ArrowHelper:kb,AttachedBindMode:uu,Audio:Gm,AudioAnalyser:cb,AudioContext:gh,AudioListener:ob,AudioLoader:ib,AxesHelper:zb,BackSide:gn,BasicDepthPacking:Ip,BasicShadowMap:Qd,BatchedMesh:sm,Bone:Qu,BooleanKeyframeTrack:Ar,Box2:Tb,Box3:Xt,Box3Helper:Nb,BoxGeometry:Tr,BoxHelper:Ob,BufferAttribute:Tt,BufferGeometry:pt,BufferGeometryLoader:zm,ByteType:Uu,Cache:_i,Camera:_o,CameraHelper:Fb,CanvasTexture:pM,CapsuleGeometry:Gl,CatmullRomCurve3:cm,CineonToneMapping:Mp,CircleGeometry:Vl,ClampToEdgeWrapping:Nn,Clock:vh,Color:We,ColorKeyframeTrack:fh,ColorManagement:_t,CompressedArrayTexture:fM,CompressedCubeTexture:dM,CompressedTexture:kl,CompressedTextureLoader:$M,ConeGeometry:Hl,ConstantAlphaFactor:gp,ConstantColorFactor:pp,Controls:Vb,CubeCamera:Xp,CubeReflectionMapping:si,CubeRefractionMapping:Bi,CubeTexture:xo,CubeTextureLoader:Pm,CubeUVReflectionMapping:ps,CubicBezierCurve:nh,CubicBezierCurve3:um,CubicInterpolant:Am,CullFaceBack:au,CullFaceFront:Kd,CullFaceFrontBack:Wg,CullFaceNone:Jd,Curve:qn,CurvePath:fm,CustomBlending:ep,CustomToneMapping:bp,CylinderGeometry:gs,Cylindrical:Eb,Data3DTexture:qu,DataArrayTexture:Pl,DataTexture:ii,DataTextureLoader:ph,DataUtils:ur,DecrementStencilOp:rv,DecrementWrapStencilOp:ov,DefaultLoadingManager:Im,DepthFormat:dr,DepthStencilFormat:Sr,DepthTexture:Ju,DetachedBindMode:Tp,DirectionalLight:Fm,DirectionalLightHelper:Lb,DiscreteInterpolant:Cm,DodecahedronGeometry:Wl,DoubleSide:Cn,DstAlphaFactor:cp,DstColorFactor:hp,DynamicCopyUsage:Sv,DynamicDrawUsage:mv,DynamicReadUsage:_v,EdgesGeometry:dm,EllipseCurve:zl,EqualCompare:Lp,EqualDepth:Ga,EqualStencilFunc:uv,EquirectangularReflectionMapping:as,EquirectangularRefractionMapping:Ys,Euler:Un,EventDispatcher:oi,ExtrudeGeometry:ql,FileLoader:wi,Float16BufferAttribute:l0,Float32BufferAttribute:je,FloatType:Wt,Fog:Fl,FogExp2:Ll,FramebufferTexture:hM,FrontSide:Mi,Frustum:yo,GLBufferAttribute:wb,GLSL1:bv,GLSL3:fu,GreaterCompare:Fp,GreaterDepth:Ha,GreaterEqualCompare:Np,GreaterEqualDepth:Va,GreaterEqualStencilFunc:pv,GreaterStencilFunc:fv,GridHelper:Ub,Group:is,HalfFloatType:mn,HemisphereLight:Um,HemisphereLightHelper:Pb,IcosahedronGeometry:bo,ImageBitmapLoader:nb,ImageLoader:co,ImageUtils:Gp,IncrementStencilOp:iv,IncrementWrapStencilOp:sv,InstancedBufferAttribute:Mr,InstancedBufferGeometry:ec,InstancedInterleavedBuffer:Sl,InstancedMesh:rm,Int16BufferAttribute:o0,Int32BufferAttribute:a0,Int8BufferAttribute:i0,IntType:El,InterleavedBuffer:Nl,InterleavedBufferAttribute:Rn,Interpolant:To,InterpolateDiscrete:js,InterpolateLinear:vl,InterpolateSmooth:Pa,InvertStencilOp:av,KeepStencilOp:sr,KeyframeTrack:Yn,LOD:nm,LatheGeometry:Mo,Layers:mr,LessCompare:Dp,LessDepth:za,LessEqualCompare:Hu,LessEqualDepth:xr,LessEqualStencilFunc:hv,LessStencilFunc:cv,Light:Vi,LightProbe:km,Line:ki,Line3:Wm,LineBasicMaterial:vn,LineCurve:ih,LineCurve3:hm,LineDashedMaterial:wm,LineLoop:om,LineSegments:li,LinearFilter:Ut,LinearInterpolant:hh,LinearMipMapLinearFilter:Zg,LinearMipMapNearestFilter:Yg,LinearMipmapLinearFilter:Qn,LinearMipmapNearestFilter:Ns,LinearSRGBColorSpace:wr,LinearToneMapping:yp,LinearTransfer:vo,Loader:bn,LoaderUtils:yu,LoadingManager:dh,LoopOnce:Ap,LoopPingPong:Rp,LoopRepeat:Cp,LuminanceAlphaFormat:Bu,LuminanceFormat:Nu,MOUSE:ir,Material:un,MaterialLoader:Ql,MathUtils:Xu,Matrix2:Mh,Matrix3:ct,Matrix4:rt,MaxEquation:rp,Mesh:Rt,MeshBasicMaterial:Ei,MeshDepthMaterial:So,MeshDistanceMaterial:Dl,MeshLambertMaterial:Mm,MeshMatcapMaterial:bm,MeshNormalMaterial:Sm,MeshPhongMaterial:xm,MeshPhysicalMaterial:ch,MeshStandardMaterial:lh,MeshToonMaterial:ym,MinEquation:ip,MirroredRepeatWrapping:$s,MixOperation:_p,MultiplyBlending:cu,MultiplyOperation:po,NearestFilter:tn,NearestMipMapLinearFilter:qg,NearestMipMapNearestFilter:Xg,NearestMipmapLinearFilter:Qr,NearestMipmapNearestFilter:Pu,NeutralToneMapping:Ep,NeverCompare:Up,NeverDepth:Ba,NeverStencilFunc:lv,NoBlending:xi,NoColorSpace:gi,NoToneMapping:ti,NormalAnimationBlendMode:Il,NormalBlending:fr,NotEqualCompare:Op,NotEqualDepth:Wa,NotEqualStencilFunc:dv,NumberKeyframeTrack:oo,Object3D:xt,ObjectLoader:eb,ObjectSpaceNormalMap:Pp,OctahedronGeometry:wo,OneFactor:op,OneMinusConstantAlphaFactor:vp,OneMinusConstantColorFactor:mp,OneMinusDstAlphaFactor:up,OneMinusDstColorFactor:fp,OneMinusSrcAlphaFactor:Na,OneMinusSrcColorFactor:lp,OrthographicCamera:ni,PCFShadowMap:bl,PCFSoftShadowMap:Os,PMREMGenerator:du,Path:no,PerspectiveCamera:Dt,Plane:mi,PlaneGeometry:ai,PlaneHelper:Bb,PointLight:Lm,PointLightHelper:Rb,Points:am,PointsMaterial:eh,PolarGridHelper:Db,PolyhedronGeometry:Gi,PositionalAudio:lb,PropertyBinding:St,PropertyMixer:Vm,QuadraticBezierCurve:rh,QuadraticBezierCurve3:sh,Quaternion:ln,QuaternionKeyframeTrack:Ao,QuaternionLinearInterpolant:Rm,RED_GREEN_RGTC2_Format:ml,RED_RGTC1_Format:zu,REVISION:ds,RGBADepthPacking:Vu,RGBAFormat:en,RGBAIntegerFormat:Rl,RGBA_ASTC_10x10_Format:cl,RGBA_ASTC_10x5_Format:ol,RGBA_ASTC_10x6_Format:al,RGBA_ASTC_10x8_Format:ll,RGBA_ASTC_12x10_Format:ul,RGBA_ASTC_12x12_Format:hl,RGBA_ASTC_4x4_Format:Ka,RGBA_ASTC_5x4_Format:Qa,RGBA_ASTC_5x5_Format:el,RGBA_ASTC_6x5_Format:tl,RGBA_ASTC_6x6_Format:nl,RGBA_ASTC_8x5_Format:il,RGBA_ASTC_8x6_Format:rl,RGBA_ASTC_8x8_Format:sl,RGBA_BPTC_Format:Vs,RGBA_ETC2_EAC_Format:Ja,RGBA_PVRTC_2BPPV1_Format:Za,RGBA_PVRTC_4BPPV1_Format:Ya,RGBA_S3TC_DXT1_Format:ks,RGBA_S3TC_DXT3_Format:zs,RGBA_S3TC_DXT5_Format:Gs,RGBDepthPacking:Qg,RGBFormat:Ou,RGBIntegerFormat:$g,RGB_BPTC_SIGNED_Format:fl,RGB_BPTC_UNSIGNED_Format:dl,RGB_ETC1_Format:$a,RGB_ETC2_Format:ja,RGB_PVRTC_2BPPV1_Format:qa,RGB_PVRTC_4BPPV1_Format:Xa,RGB_S3TC_DXT1_Format:Bs,RGDepthPacking:ev,RGFormat:ku,RGIntegerFormat:Cl,RawShaderMaterial:_m,Ray:Er,Raycaster:Sh,RectAreaLight:Nm,RedFormat:mo,RedIntegerFormat:go,ReinhardToneMapping:Sp,RenderTarget:Vp,RepeatWrapping:Zs,ReplaceStencilOp:nv,ReverseSubtractEquation:np,RingGeometry:Yl,SIGNED_RED_GREEN_RGTC2_Format:gl,SIGNED_RED_RGTC1_Format:pl,SRGBColorSpace:Sn,SRGBTransfer:Et,Scene:Ol,ShaderChunk:ht,ShaderLib:Wn,ShaderMaterial:cn,ShadowMaterial:vm,Shape:gr,ShapeGeometry:Zl,ShapePath:Gb,ShapeUtils:ri,ShortType:Du,Skeleton:Bl,SkeletonHelper:Cb,SkinnedMesh:im,Source:cr,Sphere:qt,SphereGeometry:Eo,Spherical:Ml,SphericalHarmonics3:Bm,SplineCurve:oh,SpotLight:Dm,SpotLightHelper:Ab,Sprite:tm,SpriteMaterial:Ku,SrcAlphaFactor:Oa,SrcAlphaSaturateFactor:dp,SrcColorFactor:ap,StaticCopyUsage:yv,StaticDrawUsage:Ks,StaticReadUsage:vv,StereoCamera:rb,StreamCopyUsage:Mv,StreamDrawUsage:gv,StreamReadUsage:xv,StringKeyframeTrack:Cr,SubtractEquation:tp,SubtractiveBlending:lu,TOUCH:rr,TangentSpaceNormalMap:zi,TetrahedronGeometry:$l,Texture:Ft,TextureLoader:jM,TextureUtils:XS,TorusGeometry:jl,TorusKnotGeometry:Jl,Triangle:Mn,TriangleFanDrawMode:Kg,TriangleStripDrawMode:Jg,TrianglesDrawMode:jg,TubeGeometry:Kl,UVMapping:wl,Uint16BufferAttribute:Yu,Uint32BufferAttribute:Zu,Uint8BufferAttribute:r0,Uint8ClampedBufferAttribute:s0,Uniform:yh,UniformsGroup:bb,UniformsLib:He,UniformsUtils:to,UnsignedByteType:Xn,UnsignedInt248Type:yr,UnsignedInt5999Type:Lu,UnsignedIntType:bi,UnsignedShort4444Type:Tl,UnsignedShort5551Type:Al,UnsignedShortType:ls,VSMShadowMap:Hn,Vector2:pe,Vector3:L,Vector4:dt,VectorKeyframeTrack:ao,VideoTexture:uM,WebGL3DRenderTarget:Yv,WebGLArrayRenderTarget:qv,WebGLCoordinateSystem:ei,WebGLCubeRenderTarget:$u,WebGLMultipleRenderTargets:Hb,WebGLRenderTarget:Pn,WebGLRenderer:Qp,WebGLUtils:Jp,WebGPUCoordinateSystem:Qs,WireframeGeometry:ah,WrapAroundEnding:Js,ZeroCurvatureEnding:ar,ZeroFactor:sp,ZeroSlopeEnding:lr,ZeroStencilOp:tv,createCanvasElement:zp},Symbol.toStringTag,{value:"Module"}));function Xb(s){let e;const t=new Set,n=(c,u)=>{const h=typeof c=="function"?c(e):c;if(h!==e){const f=e;e=u?h:Object.assign({},e,h),t.forEach(d=>d(e,f))}},i=()=>e,r=(c,u=i,h=Object.is)=>{let f=u(e);function d(){const p=u(e);if(!h(f,p)){const v=f;c(f=p,v)}}return t.add(d),()=>t.delete(d)},l={setState:n,getState:i,subscribe:(c,u,h)=>u||h?r(c,u,h):(t.add(c),()=>t.delete(c)),destroy:()=>t.clear()};return e=s(n,i,l),l}const qb=typeof window>"u"||!window.navigator||/ServerSideRendering|^Deno\//.test(window.navigator.userAgent),_d=qb?ie.useEffect:ie.useLayoutEffect;function qm(s){const e=typeof s=="function"?Xb(s):s,t=(n=e.getState,i=Object.is)=>{const[,r]=ie.useReducer(g=>g+1,0),o=e.getState(),a=ie.useRef(o),l=ie.useRef(n),c=ie.useRef(i),u=ie.useRef(!1),h=ie.useRef();h.current===void 0&&(h.current=n(o));let f,d=!1;(a.current!==o||l.current!==n||c.current!==i||u.current)&&(f=n(o),d=!i(h.current,f)),_d(()=>{d&&(h.current=f),a.current=o,l.current=n,c.current=i,u.current=!1});const p=ie.useRef(o);_d(()=>{const g=()=>{try{const x=e.getState(),_=l.current(x);c.current(h.current,_)||(a.current=x,h.current=_,r())}catch{u.current=!0,r()}},m=e.subscribe(g);return e.getState()!==p.current&&g(),m},[]);const v=d?f:h.current;return ie.useDebugValue(v),v};return Object.assign(t,e),t[Symbol.iterator]=function(){const n=[t,e];return{next(){const i=n.length<=0;return{value:n.shift(),done:i}}}},t}const bh={},Ym=s=>void Object.assign(bh,s);function Yb(s,e){function t(u,{args:h=[],attach:f,...d},p){let v=`${u[0].toUpperCase()}${u.slice(1)}`,g;if(u==="primitive"){if(d.object===void 0)throw new Error("R3F: Primitives without 'object' are invalid!");const m=d.object;g=$r(m,{type:u,root:p,attach:f,primitive:!0})}else{const m=bh[v];if(!m)throw new Error(`R3F: ${v} is not part of the THREE namespace! Did you forget to extend? See: https://docs.pmnd.rs/react-three-fiber/api/objects#using-3rd-party-objects-declaratively`);if(!Array.isArray(h))throw new Error("R3F: The args prop must be an array!");g=$r(new m(...h),{type:u,root:p,attach:f,memoizedProps:{args:h}})}return g.__r3f.attach===void 0&&(g.isBufferGeometry?g.__r3f.attach="geometry":g.isMaterial&&(g.__r3f.attach="material")),v!=="inject"&&Zc(g,d),g}function n(u,h){let f=!1;if(h){var d,p;(d=h.__r3f)!=null&&d.attach?Yc(u,h,h.__r3f.attach):h.isObject3D&&u.isObject3D&&(u.add(h),f=!0),f||(p=u.__r3f)==null||p.objects.push(h),h.__r3f||$r(h,{}),h.__r3f.parent=u,bu(h),jr(h)}}function i(u,h,f){let d=!1;if(h){var p,v;if((p=h.__r3f)!=null&&p.attach)Yc(u,h,h.__r3f.attach);else if(h.isObject3D&&u.isObject3D){h.parent=u,h.dispatchEvent({type:"added"}),u.dispatchEvent({type:"childadded",child:h});const g=u.children.filter(x=>x!==h),m=g.indexOf(f);u.children=[...g.slice(0,m),h,...g.slice(m)],d=!0}d||(v=u.__r3f)==null||v.objects.push(h),h.__r3f||$r(h,{}),h.__r3f.parent=u,bu(h),jr(h)}}function r(u,h,f=!1){u&&[...u].forEach(d=>o(h,d,f))}function o(u,h,f){if(h){var d,p,v;if(h.__r3f&&(h.__r3f.parent=null),(d=u.__r3f)!=null&&d.objects&&(u.__r3f.objects=u.__r3f.objects.filter(y=>y!==h)),(p=h.__r3f)!=null&&p.attach)bd(u,h,h.__r3f.attach);else if(h.isObject3D&&u.isObject3D){var g;u.remove(h),(g=h.__r3f)!=null&&g.root&&t1(Da(h),h)}const x=(v=h.__r3f)==null?void 0:v.primitive,_=!x&&(f===void 0?h.dispose!==null:f);if(!x){var m;r((m=h.__r3f)==null?void 0:m.objects,h,_),r(h.children,h,_)}if(delete h.__r3f,_&&h.dispose&&h.type!=="Scene"){const y=()=>{try{h.dispose()}catch{}};typeof IS_REACT_ACT_ENVIRONMENT>"u"?Oh.unstable_scheduleCallback(Oh.unstable_IdlePriority,y):y()}jr(u)}}function a(u,h,f,d){var p;const v=(p=u.__r3f)==null?void 0:p.parent;if(!v)return;const g=t(h,f,u.__r3f.root);if(u.children){for(const m of u.children)m.__r3f&&n(g,m);u.children=u.children.filter(m=>!m.__r3f)}u.__r3f.objects.forEach(m=>n(g,m)),u.__r3f.objects=[],u.__r3f.autoRemovedBeforeAppend||o(v,u),g.parent&&(g.__r3f.autoRemovedBeforeAppend=!0),n(v,g),g.raycast&&g.__r3f.eventCount&&Da(g).getState().internal.interaction.push(g),[d,d.alternate].forEach(m=>{m!==null&&(m.stateNode=g,m.ref&&(typeof m.ref=="function"?m.ref(g):m.ref.current=g))})}const l=()=>{};return{reconciler:Ug({createInstance:t,removeChild:o,appendChild:n,appendInitialChild:n,insertBefore:i,supportsMutation:!0,isPrimaryRenderer:!1,supportsPersistence:!1,supportsHydration:!1,noTimeout:-1,appendChildToContainer:(u,h)=>{if(!h)return;const f=u.getState().scene;f.__r3f&&(f.__r3f.root=u,n(f,h))},removeChildFromContainer:(u,h)=>{h&&o(u.getState().scene,h)},insertInContainerBefore:(u,h,f)=>{if(!h||!f)return;const d=u.getState().scene;d.__r3f&&i(d,h,f)},getRootHostContext:()=>null,getChildHostContext:u=>u,finalizeInitialChildren(u){var h;return!!((h=u?.__r3f)!=null?h:{}).handlers},prepareUpdate(u,h,f,d){var p;if(((p=u?.__r3f)!=null?p:{}).primitive&&d.object&&d.object!==u)return[!0];{const{args:g=[],children:m,...x}=d,{args:_=[],children:y,...A}=f;if(!Array.isArray(g))throw new Error("R3F: the args prop must be an array!");if(g.some((T,w)=>T!==_[w]))return[!0];const b=eg(u,x,A,!0);return b.changes.length?[!1,b]:null}},commitUpdate(u,[h,f],d,p,v,g){h?a(u,d,v,g):Zc(u,f)},commitMount(u,h,f,d){var p;const v=(p=u.__r3f)!=null?p:{};u.raycast&&v.handlers&&v.eventCount&&Da(u).getState().internal.interaction.push(u)},getPublicInstance:u=>u,prepareForCommit:()=>null,preparePortalMount:u=>$r(u.getState().scene),resetAfterCommit:()=>{},shouldSetTextContent:()=>!1,clearContainer:()=>!1,hideInstance(u){var h;const{attach:f,parent:d}=(h=u.__r3f)!=null?h:{};f&&d&&bd(d,u,f),u.isObject3D&&(u.visible=!1),jr(u)},unhideInstance(u,h){var f;const{attach:d,parent:p}=(f=u.__r3f)!=null?f:{};d&&p&&Yc(p,u,d),(u.isObject3D&&h.visible==null||h.visible)&&(u.visible=!0),jr(u)},createTextInstance:l,hideTextInstance:l,unhideTextInstance:l,getCurrentEventPriority:()=>e?e():Kr.DefaultEventPriority,beforeActiveInstanceBlur:()=>{},afterActiveInstanceBlur:()=>{},detachDeletedInstance:()=>{},now:typeof performance<"u"&&Ct.fun(performance.now)?performance.now:Ct.fun(Date.now)?Date.now:()=>0,scheduleTimeout:Ct.fun(setTimeout)?setTimeout:void 0,cancelTimeout:Ct.fun(clearTimeout)?clearTimeout:void 0}),applyProps:Zc}}var xd,yd;const qc=s=>"colorSpace"in s||"outputColorSpace"in s,Zm=()=>{var s;return(s=bh.ColorManagement)!=null?s:null},$m=s=>s&&s.isOrthographicCamera,Zb=s=>s&&s.hasOwnProperty("current"),Co=typeof window<"u"&&((xd=window.document)!=null&&xd.createElement||((yd=window.navigator)==null?void 0:yd.product)==="ReactNative")?ie.useLayoutEffect:ie.useEffect;function jm(s){const e=ie.useRef(s);return Co(()=>void(e.current=s),[s]),e}function $b({set:s}){return Co(()=>(s(new Promise(()=>null)),()=>s(!1)),[s]),null}class Jm extends ie.Component{constructor(...e){super(...e),this.state={error:!1}}componentDidCatch(e){this.props.set(e)}render(){return this.state.error?null:this.props.children}}Jm.getDerivedStateFromError=()=>({error:!0});const Km="__default",Sd=new Map,jb=s=>s&&!!s.memoized&&!!s.changes;function Qm(s){var e;const t=typeof window<"u"?(e=window.devicePixelRatio)!=null?e:2:1;return Array.isArray(s)?Math.min(Math.max(s[0],t),s[1]):s}const Rs=s=>{var e;return(e=s.__r3f)==null?void 0:e.root.getState()};function Da(s){let e=s.__r3f.root;for(;e.getState().previousRoot;)e=e.getState().previousRoot;return e}const Ct={obj:s=>s===Object(s)&&!Ct.arr(s)&&typeof s!="function",fun:s=>typeof s=="function",str:s=>typeof s=="string",num:s=>typeof s=="number",boo:s=>typeof s=="boolean",und:s=>s===void 0,arr:s=>Array.isArray(s),equ(s,e,{arrays:t="shallow",objects:n="reference",strict:i=!0}={}){if(typeof s!=typeof e||!!s!=!!e)return!1;if(Ct.str(s)||Ct.num(s)||Ct.boo(s))return s===e;const r=Ct.obj(s);if(r&&n==="reference")return s===e;const o=Ct.arr(s);if(o&&t==="reference")return s===e;if((o||r)&&s===e)return!0;let a;for(a in s)if(!(a in e))return!1;if(r&&t==="shallow"&&n==="shallow"){for(a in i?e:s)if(!Ct.equ(s[a],e[a],{strict:i,objects:"reference"}))return!1}else for(a in i?e:s)if(s[a]!==e[a])return!1;if(Ct.und(a)){if(o&&s.length===0&&e.length===0||r&&Object.keys(s).length===0&&Object.keys(e).length===0)return!0;if(s!==e)return!1}return!0}};function Jb(s){const e={nodes:{},materials:{}};return s&&s.traverse(t=>{t.name&&(e.nodes[t.name]=t),t.material&&!e.materials[t.material.name]&&(e.materials[t.material.name]=t.material)}),e}function Kb(s){s.dispose&&s.type!=="Scene"&&s.dispose();for(const e in s)e.dispose==null||e.dispose(),delete s[e]}function $r(s,e){const t=s;return t.__r3f={type:"",root:null,previousAttach:null,memoizedProps:{},eventCount:0,handlers:{},objects:[],parent:null,...e},s}function Mu(s,e){let t=s;if(e.includes("-")){const n=e.split("-"),i=n.pop();return t=n.reduce((r,o)=>r[o],s),{target:t,key:i}}else return{target:t,key:e}}const Md=/-\d+$/;function Yc(s,e,t){if(Ct.str(t)){if(Md.test(t)){const r=t.replace(Md,""),{target:o,key:a}=Mu(s,r);Array.isArray(o[a])||(o[a]=[])}const{target:n,key:i}=Mu(s,t);e.__r3f.previousAttach=n[i],n[i]=e}else e.__r3f.previousAttach=t(s,e)}function bd(s,e,t){var n,i;if(Ct.str(t)){const{target:r,key:o}=Mu(s,t),a=e.__r3f.previousAttach;a===void 0?delete r[o]:r[o]=a}else(n=e.__r3f)==null||n.previousAttach==null||n.previousAttach(s,e);(i=e.__r3f)==null||delete i.previousAttach}function eg(s,{children:e,key:t,ref:n,...i},{children:r,key:o,ref:a,...l}={},c=!1){const u=s.__r3f,h=Object.entries(i),f=[];if(c){const p=Object.keys(l);for(let v=0;v<p.length;v++)i.hasOwnProperty(p[v])||h.unshift([p[v],Km+"remove"])}h.forEach(([p,v])=>{var g;if((g=s.__r3f)!=null&&g.primitive&&p==="object"||Ct.equ(v,l[p]))return;if(/^on(Pointer|Click|DoubleClick|ContextMenu|Wheel)/.test(p))return f.push([p,v,!0,[]]);let m=[];p.includes("-")&&(m=p.split("-")),f.push([p,v,!1,m]);for(const x in i){const _=i[x];x.startsWith(`${p}-`)&&f.push([x,_,!1,x.split("-")])}});const d={...i};return u!=null&&u.memoizedProps&&u!=null&&u.memoizedProps.args&&(d.args=u.memoizedProps.args),u!=null&&u.memoizedProps&&u!=null&&u.memoizedProps.attach&&(d.attach=u.memoizedProps.attach),{memoized:d,changes:f}}const Qb=typeof process<"u"&&!1;function Zc(s,e){var t;const n=s.__r3f,i=n?.root,r=i==null||i.getState==null?void 0:i.getState(),{memoized:o,changes:a}=jb(e)?e:eg(s,e),l=n?.eventCount;s.__r3f&&(s.__r3f.memoizedProps=o);for(let f=0;f<a.length;f++){let[d,p,v,g]=a[f];if(qc(s)){const y="srgb",A="srgb-linear";d==="encoding"?(d="colorSpace",p=p===3001?y:A):d==="outputEncoding"&&(d="outputColorSpace",p=p===3001?y:A)}let m=s,x=m[d];if(g.length&&(x=g.reduce((_,y)=>_[y],s),!(x&&x.set))){const[_,...y]=g.reverse();m=y.reverse().reduce((A,b)=>A[b],s),d=_}if(p===Km+"remove")if(m.constructor){let _=Sd.get(m.constructor);_||(_=new m.constructor,Sd.set(m.constructor,_)),p=_[d]}else p=0;if(v&&n)p?n.handlers[d]=p:delete n.handlers[d],n.eventCount=Object.keys(n.handlers).length;else if(x&&x.set&&(x.copy||x instanceof mr)){if(Array.isArray(p))x.fromArray?x.fromArray(p):x.set(...p);else if(x.copy&&p&&p.constructor&&(Qb?x.constructor.name===p.constructor.name:x.constructor===p.constructor))x.copy(p);else if(p!==void 0){var c;const _=(c=x)==null?void 0:c.isColor;!_&&x.setScalar?x.setScalar(p):x instanceof mr&&p instanceof mr?x.mask=p.mask:x.set(p),!Zm()&&r&&!r.linear&&_&&x.convertSRGBToLinear()}}else{var u;if(m[d]=p,(u=m[d])!=null&&u.isTexture&&m[d].format===en&&m[d].type===Xn&&r){const _=m[d];qc(_)&&qc(r.gl)?_.colorSpace=r.gl.outputColorSpace:_.encoding=r.gl.outputEncoding}}jr(s)}if(n&&n.parent&&s.raycast&&l!==n.eventCount){const f=Da(s).getState().internal,d=f.interaction.indexOf(s);d>-1&&f.interaction.splice(d,1),n.eventCount&&f.interaction.push(s)}return!(a.length===1&&a[0][0]==="onUpdate")&&a.length&&(t=s.__r3f)!=null&&t.parent&&bu(s),s}function jr(s){var e,t;const n=(e=s.__r3f)==null||(t=e.root)==null||t.getState==null?void 0:t.getState();n&&n.internal.frames===0&&n.invalidate()}function bu(s){s.onUpdate==null||s.onUpdate(s)}function tg(s,e){s.manual||($m(s)?(s.left=e.width/-2,s.right=e.width/2,s.top=e.height/2,s.bottom=e.height/-2):s.aspect=e.width/e.height,s.updateProjectionMatrix(),s.updateMatrixWorld())}function Ma(s){return(s.eventObject||s.object).uuid+"/"+s.index+s.instanceId}function e1(){var s;const e=typeof self<"u"&&self||typeof window<"u"&&window;if(!e)return Kr.DefaultEventPriority;switch((s=e.event)==null?void 0:s.type){case"click":case"contextmenu":case"dblclick":case"pointercancel":case"pointerdown":case"pointerup":return Kr.DiscreteEventPriority;case"pointermove":case"pointerout":case"pointerover":case"pointerenter":case"pointerleave":case"wheel":return Kr.ContinuousEventPriority;default:return Kr.DefaultEventPriority}}function ng(s,e,t,n){const i=t.get(e);i&&(t.delete(e),t.size===0&&(s.delete(n),i.target.releasePointerCapture(n)))}function t1(s,e){const{internal:t}=s.getState();t.interaction=t.interaction.filter(n=>n!==e),t.initialHits=t.initialHits.filter(n=>n!==e),t.hovered.forEach((n,i)=>{(n.eventObject===e||n.object===e)&&t.hovered.delete(i)}),t.capturedMap.forEach((n,i)=>{ng(t.capturedMap,e,n,i)})}function n1(s){function e(l){const{internal:c}=s.getState(),u=l.offsetX-c.initialClick[0],h=l.offsetY-c.initialClick[1];return Math.round(Math.sqrt(u*u+h*h))}function t(l){return l.filter(c=>["Move","Over","Enter","Out","Leave"].some(u=>{var h;return(h=c.__r3f)==null?void 0:h.handlers["onPointer"+u]}))}function n(l,c){const u=s.getState(),h=new Set,f=[],d=c?c(u.internal.interaction):u.internal.interaction;for(let m=0;m<d.length;m++){const x=Rs(d[m]);x&&(x.raycaster.camera=void 0)}u.previousRoot||u.events.compute==null||u.events.compute(l,u);function p(m){const x=Rs(m);if(!x||!x.events.enabled||x.raycaster.camera===null)return[];if(x.raycaster.camera===void 0){var _;x.events.compute==null||x.events.compute(l,x,(_=x.previousRoot)==null?void 0:_.getState()),x.raycaster.camera===void 0&&(x.raycaster.camera=null)}return x.raycaster.camera?x.raycaster.intersectObject(m,!0):[]}let v=d.flatMap(p).sort((m,x)=>{const _=Rs(m.object),y=Rs(x.object);return!_||!y?m.distance-x.distance:y.events.priority-_.events.priority||m.distance-x.distance}).filter(m=>{const x=Ma(m);return h.has(x)?!1:(h.add(x),!0)});u.events.filter&&(v=u.events.filter(v,u));for(const m of v){let x=m.object;for(;x;){var g;(g=x.__r3f)!=null&&g.eventCount&&f.push({...m,eventObject:x}),x=x.parent}}if("pointerId"in l&&u.internal.capturedMap.has(l.pointerId))for(let m of u.internal.capturedMap.get(l.pointerId).values())h.has(Ma(m.intersection))||f.push(m.intersection);return f}function i(l,c,u,h){const f=s.getState();if(l.length){const d={stopped:!1};for(const p of l){const v=Rs(p.object)||f,{raycaster:g,pointer:m,camera:x,internal:_}=v,y=new L(m.x,m.y,0).unproject(x),A=S=>{var R,P;return(R=(P=_.capturedMap.get(S))==null?void 0:P.has(p.eventObject))!=null?R:!1},b=S=>{const R={intersection:p,target:c.target};_.capturedMap.has(S)?_.capturedMap.get(S).set(p.eventObject,R):_.capturedMap.set(S,new Map([[p.eventObject,R]])),c.target.setPointerCapture(S)},T=S=>{const R=_.capturedMap.get(S);R&&ng(_.capturedMap,p.eventObject,R,S)};let w={};for(let S in c){let R=c[S];typeof R!="function"&&(w[S]=R)}let M={...p,...w,pointer:m,intersections:l,stopped:d.stopped,delta:u,unprojectedPoint:y,ray:g.ray,camera:x,stopPropagation(){const S="pointerId"in c&&_.capturedMap.get(c.pointerId);if((!S||S.has(p.eventObject))&&(M.stopped=d.stopped=!0,_.hovered.size&&Array.from(_.hovered.values()).find(R=>R.eventObject===p.eventObject))){const R=l.slice(0,l.indexOf(p));r([...R,p])}},target:{hasPointerCapture:A,setPointerCapture:b,releasePointerCapture:T},currentTarget:{hasPointerCapture:A,setPointerCapture:b,releasePointerCapture:T},nativeEvent:c};if(h(M),d.stopped===!0)break}}return l}function r(l){const{internal:c}=s.getState();for(const u of c.hovered.values())if(!l.length||!l.find(h=>h.object===u.object&&h.index===u.index&&h.instanceId===u.instanceId)){const f=u.eventObject.__r3f,d=f?.handlers;if(c.hovered.delete(Ma(u)),f!=null&&f.eventCount){const p={...u,intersections:l};d.onPointerOut==null||d.onPointerOut(p),d.onPointerLeave==null||d.onPointerLeave(p)}}}function o(l,c){for(let u=0;u<c.length;u++){const h=c[u].__r3f;h==null||h.handlers.onPointerMissed==null||h.handlers.onPointerMissed(l)}}function a(l){switch(l){case"onPointerLeave":case"onPointerCancel":return()=>r([]);case"onLostPointerCapture":return c=>{const{internal:u}=s.getState();"pointerId"in c&&u.capturedMap.has(c.pointerId)&&requestAnimationFrame(()=>{u.capturedMap.has(c.pointerId)&&(u.capturedMap.delete(c.pointerId),r([]))})}}return function(u){const{onPointerMissed:h,internal:f}=s.getState();f.lastEvent.current=u;const d=l==="onPointerMove",p=l==="onClick"||l==="onContextMenu"||l==="onDoubleClick",g=n(u,d?t:void 0),m=p?e(u):0;l==="onPointerDown"&&(f.initialClick=[u.offsetX,u.offsetY],f.initialHits=g.map(_=>_.eventObject)),p&&!g.length&&m<=2&&(o(u,f.interaction),h&&h(u)),d&&r(g);function x(_){const y=_.eventObject,A=y.__r3f,b=A?.handlers;if(A!=null&&A.eventCount)if(d){if(b.onPointerOver||b.onPointerEnter||b.onPointerOut||b.onPointerLeave){const T=Ma(_),w=f.hovered.get(T);w?w.stopped&&_.stopPropagation():(f.hovered.set(T,_),b.onPointerOver==null||b.onPointerOver(_),b.onPointerEnter==null||b.onPointerEnter(_))}b.onPointerMove==null||b.onPointerMove(_)}else{const T=b[l];T?(!p||f.initialHits.includes(y))&&(o(u,f.interaction.filter(w=>!f.initialHits.includes(w))),T(_)):p&&f.initialHits.includes(y)&&o(u,f.interaction.filter(w=>!f.initialHits.includes(w)))}}i(g,u,m,x)}}return{handlePointer:a}}const i1=["set","get","setSize","setFrameloop","setDpr","events","invalidate","advance","size","viewport"],ig=s=>!!(s!=null&&s.render),wh=ie.createContext(null),r1=(s,e)=>{const t=qm((a,l)=>{const c=new L,u=new L,h=new L;function f(m=l().camera,x=u,_=l().size){const{width:y,height:A,top:b,left:T}=_,w=y/A;x.isVector3?h.copy(x):h.set(...x);const M=m.getWorldPosition(c).distanceTo(h);if($m(m))return{width:y/m.zoom,height:A/m.zoom,top:b,left:T,factor:1,distance:M,aspect:w};{const S=m.fov*Math.PI/180,R=2*Math.tan(S/2)*M,P=R*(y/A);return{width:P,height:R,top:b,left:T,factor:y/P,distance:M,aspect:w}}}let d;const p=m=>a(x=>({performance:{...x.performance,current:m}})),v=new pe;return{set:a,get:l,gl:null,camera:null,raycaster:null,events:{priority:1,enabled:!0,connected:!1},xr:null,scene:null,invalidate:(m=1)=>s(l(),m),advance:(m,x)=>e(m,x,l()),legacy:!1,linear:!1,flat:!1,controls:null,clock:new vh,pointer:v,mouse:v,frameloop:"always",onPointerMissed:void 0,performance:{current:1,min:.5,max:1,debounce:200,regress:()=>{const m=l();d&&clearTimeout(d),m.performance.current!==m.performance.min&&p(m.performance.min),d=setTimeout(()=>p(l().performance.max),m.performance.debounce)}},size:{width:0,height:0,top:0,left:0,updateStyle:!1},viewport:{initialDpr:0,dpr:0,width:0,height:0,top:0,left:0,aspect:0,distance:0,factor:0,getCurrentViewport:f},setEvents:m=>a(x=>({...x,events:{...x.events,...m}})),setSize:(m,x,_,y,A)=>{const b=l().camera,T={width:m,height:x,top:y||0,left:A||0,updateStyle:_};a(w=>({size:T,viewport:{...w.viewport,...f(b,u,T)}}))},setDpr:m=>a(x=>{const _=Qm(m);return{viewport:{...x.viewport,dpr:_,initialDpr:x.viewport.initialDpr||_}}}),setFrameloop:(m="always")=>{const x=l().clock;x.stop(),x.elapsedTime=0,m!=="never"&&(x.start(),x.elapsedTime=0),a(()=>({frameloop:m}))},previousRoot:void 0,internal:{active:!1,priority:0,frames:0,lastEvent:ie.createRef(),interaction:[],hovered:new Map,subscribers:[],initialClick:[0,0],initialHits:[],capturedMap:new Map,subscribe:(m,x,_)=>{const y=l().internal;return y.priority=y.priority+(x>0?1:0),y.subscribers.push({ref:m,priority:x,store:_}),y.subscribers=y.subscribers.sort((A,b)=>A.priority-b.priority),()=>{const A=l().internal;A!=null&&A.subscribers&&(A.priority=A.priority-(x>0?1:0),A.subscribers=A.subscribers.filter(b=>b.ref!==m))}}}}}),n=t.getState();let i=n.size,r=n.viewport.dpr,o=n.camera;return t.subscribe(()=>{const{camera:a,size:l,viewport:c,gl:u,set:h}=t.getState();if(l.width!==i.width||l.height!==i.height||c.dpr!==r){var f;i=l,r=c.dpr,tg(a,l),u.setPixelRatio(c.dpr);const d=(f=l.updateStyle)!=null?f:typeof HTMLCanvasElement<"u"&&u.domElement instanceof HTMLCanvasElement;u.setSize(l.width,l.height,d)}a!==o&&(o=a,h(d=>({viewport:{...d.viewport,...d.viewport.getCurrentViewport(a)}})))}),t.subscribe(a=>s(a)),t};let ba,s1=new Set,o1=new Set,a1=new Set;function $c(s,e){if(s.size)for(const{callback:t}of s.values())t(e)}function Is(s,e){switch(s){case"before":return $c(s1,e);case"after":return $c(o1,e);case"tail":return $c(a1,e)}}let jc,Jc;function Kc(s,e,t){let n=e.clock.getDelta();for(e.frameloop==="never"&&typeof s=="number"&&(n=s-e.clock.elapsedTime,e.clock.oldTime=e.clock.elapsedTime,e.clock.elapsedTime=s),jc=e.internal.subscribers,ba=0;ba<jc.length;ba++)Jc=jc[ba],Jc.ref.current(Jc.store.getState(),n,t);return!e.internal.priority&&e.gl.render&&e.gl.render(e.scene,e.camera),e.internal.frames=Math.max(0,e.internal.frames-1),e.frameloop==="always"?1:e.internal.frames}function l1(s){let e=!1,t=!1,n,i,r;function o(c){i=requestAnimationFrame(o),e=!0,n=0,Is("before",c),t=!0;for(const h of s.values()){var u;r=h.store.getState(),r.internal.active&&(r.frameloop==="always"||r.internal.frames>0)&&!((u=r.gl.xr)!=null&&u.isPresenting)&&(n+=Kc(c,r))}if(t=!1,Is("after",c),n===0)return Is("tail",c),e=!1,cancelAnimationFrame(i)}function a(c,u=1){var h;if(!c)return s.forEach(f=>a(f.store.getState(),u));(h=c.gl.xr)!=null&&h.isPresenting||!c.internal.active||c.frameloop==="never"||(u>1?c.internal.frames=Math.min(60,c.internal.frames+u):t?c.internal.frames=2:c.internal.frames=1,e||(e=!0,requestAnimationFrame(o)))}function l(c,u=!0,h,f){if(u&&Is("before",c),h)Kc(c,h,f);else for(const d of s.values())Kc(c,d.store.getState());u&&Is("after",c)}return{loop:o,invalidate:a,advance:l}}function Eh(){const s=ie.useContext(wh);if(!s)throw new Error("R3F: Hooks can only be used within the Canvas component!");return s}function Ht(s=t=>t,e){return Eh()(s,e)}function Ti(s,e=0){const t=Eh(),n=t.getState().internal.subscribe,i=jm(s);return Co(()=>n(i,e,t),[e,n,t]),null}const wd=new WeakMap;function rg(s,e){return function(t,...n){let i=wd.get(t);return i||(i=new t,wd.set(t,i)),s&&s(i),Promise.all(n.map(r=>new Promise((o,a)=>i.load(r,l=>{l.scene&&Object.assign(l,Jb(l.scene)),o(l)},e,l=>a(new Error(`Could not load ${r}: ${l?.message}`))))))}}function hs(s,e,t,n){const i=Array.isArray(e)?e:[e],r=$d(rg(t,n),[s,...i],{equal:Ct.equ});return Array.isArray(e)?r:r[0]}hs.preload=function(s,e,t){const n=Array.isArray(e)?e:[e];return Dg(rg(t),[s,...n])};hs.clear=function(s,e){const t=Array.isArray(e)?e:[e];return Lg([s,...t])};const fs=new Map,{invalidate:Ed,advance:Td}=l1(fs),{reconciler:uo,applyProps:Fi}=Yb(fs,e1),Yr={objects:"shallow",strict:!1},c1=(s,e)=>{const t=typeof s=="function"?s(e):s;return ig(t)?t:new Qp({powerPreference:"high-performance",canvas:e,antialias:!0,alpha:!0,...s})};function u1(s,e){const t=typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement;if(e){const{width:n,height:i,top:r,left:o,updateStyle:a=t}=e;return{width:n,height:i,top:r,left:o,updateStyle:a}}else if(typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement&&s.parentElement){const{width:n,height:i,top:r,left:o}=s.parentElement.getBoundingClientRect();return{width:n,height:i,top:r,left:o,updateStyle:t}}else if(typeof OffscreenCanvas<"u"&&s instanceof OffscreenCanvas)return{width:s.width,height:s.height,top:0,left:0,updateStyle:t};return{width:0,height:0,top:0,left:0}}function h1(s){const e=fs.get(s),t=e?.fiber,n=e?.store,i=typeof reportError=="function"?reportError:console.error,r=n||r1(Ed,Td),o=t||uo.createContainer(r,Kr.ConcurrentRoot,null,!1,null,"",i,null);e||fs.set(s,{fiber:o,store:r});let a,l=!1,c;return{configure(u={}){let{gl:h,size:f,scene:d,events:p,onCreated:v,shadows:g=!1,linear:m=!1,flat:x=!1,legacy:_=!1,orthographic:y=!1,frameloop:A="always",dpr:b=[1,2],performance:T,raycaster:w,camera:M,onPointerMissed:S}=u,R=r.getState(),P=R.gl;R.gl||R.set({gl:P=c1(h,s)});let F=R.raycaster;F||R.set({raycaster:F=new Sh});const{params:U,...G}=w||{};if(Ct.equ(G,F,Yr)||Fi(F,{...G}),Ct.equ(U,F.params,Yr)||Fi(F,{params:{...F.params,...U}}),!R.camera||R.camera===c&&!Ct.equ(c,M,Yr)){c=M;const J=M instanceof _o,Z=J?M:y?new ni(0,0,0,0,.1,1e3):new Dt(75,0,.1,1e3);J||(Z.position.z=5,M&&(Fi(Z,M),("aspect"in M||"left"in M||"right"in M||"bottom"in M||"top"in M)&&(Z.manual=!0,Z.updateProjectionMatrix())),!R.camera&&!(M!=null&&M.rotation)&&Z.lookAt(0,0,0)),R.set({camera:Z}),F.camera=Z}if(!R.scene){let J;d!=null&&d.isScene?J=d:(J=new Ol,d&&Fi(J,d)),R.set({scene:$r(J)})}if(!R.xr){var B;const J=(ne,$)=>{const se=r.getState();se.frameloop!=="never"&&Td(ne,!0,se,$)},Z=()=>{const ne=r.getState();ne.gl.xr.enabled=ne.gl.xr.isPresenting,ne.gl.xr.setAnimationLoop(ne.gl.xr.isPresenting?J:null),ne.gl.xr.isPresenting||Ed(ne)},re={connect(){const ne=r.getState().gl;ne.xr.addEventListener("sessionstart",Z),ne.xr.addEventListener("sessionend",Z)},disconnect(){const ne=r.getState().gl;ne.xr.removeEventListener("sessionstart",Z),ne.xr.removeEventListener("sessionend",Z)}};typeof((B=P.xr)==null?void 0:B.addEventListener)=="function"&&re.connect(),R.set({xr:re})}if(P.shadowMap){const J=P.shadowMap.enabled,Z=P.shadowMap.type;if(P.shadowMap.enabled=!!g,Ct.boo(g))P.shadowMap.type=Os;else if(Ct.str(g)){var K;const re={basic:Qd,percentage:bl,soft:Os,variance:Hn};P.shadowMap.type=(K=re[g])!=null?K:Os}else Ct.obj(g)&&Object.assign(P.shadowMap,g);(J!==P.shadowMap.enabled||Z!==P.shadowMap.type)&&(P.shadowMap.needsUpdate=!0)}const Y=Zm();Y&&("enabled"in Y?Y.enabled=!_:"legacyMode"in Y&&(Y.legacyMode=_)),l||Fi(P,{outputEncoding:m?3e3:3001,toneMapping:x?ti:Iu}),R.legacy!==_&&R.set(()=>({legacy:_})),R.linear!==m&&R.set(()=>({linear:m})),R.flat!==x&&R.set(()=>({flat:x})),h&&!Ct.fun(h)&&!ig(h)&&!Ct.equ(h,P,Yr)&&Fi(P,h),p&&!R.events.handlers&&R.set({events:p(r)});const le=u1(s,f);return Ct.equ(le,R.size,Yr)||R.setSize(le.width,le.height,le.updateStyle,le.top,le.left),b&&R.viewport.dpr!==Qm(b)&&R.setDpr(b),R.frameloop!==A&&R.setFrameloop(A),R.onPointerMissed||R.set({onPointerMissed:S}),T&&!Ct.equ(T,R.performance,Yr)&&R.set(J=>({performance:{...J.performance,...T}})),a=v,l=!0,this},render(u){return l||this.configure(),uo.updateContainer(dn.jsx(f1,{store:r,children:u,onCreated:a,rootElement:s}),o,null,()=>{}),r},unmount(){sg(s)}}}function f1({store:s,children:e,onCreated:t,rootElement:n}){return Co(()=>{const i=s.getState();i.set(r=>({internal:{...r.internal,active:!0}})),t&&t(i),s.getState().events.connected||i.events.connect==null||i.events.connect(n)},[]),dn.jsx(wh.Provider,{value:s,children:e})}function sg(s,e){const t=fs.get(s),n=t?.fiber;if(n){const i=t?.store.getState();i&&(i.internal.active=!1),uo.updateContainer(null,n,null,()=>{i&&setTimeout(()=>{try{var r,o,a,l;i.events.disconnect==null||i.events.disconnect(),(r=i.gl)==null||(o=r.renderLists)==null||o.dispose==null||o.dispose(),(a=i.gl)==null||a.forceContextLoss==null||a.forceContextLoss(),(l=i.gl)!=null&&l.xr&&i.xr.disconnect(),Kb(i),fs.delete(s)}catch{}},500)})}}function og(s,e,t){return dn.jsx(d1,{children:s,container:e,state:t},e.uuid)}function d1({state:s={},children:e,container:t}){const{events:n,size:i,...r}=s,o=Eh(),[a]=ie.useState(()=>new Sh),[l]=ie.useState(()=>new pe),c=ie.useCallback((h,f)=>{const d={...h};Object.keys(h).forEach(v=>{(i1.includes(v)||h[v]!==f[v]&&f[v])&&delete d[v]});let p;if(f&&i){const v=f.camera;p=h.viewport.getCurrentViewport(v,new L,i),v!==h.camera&&tg(v,i)}return{...d,scene:t,raycaster:a,pointer:l,mouse:l,previousRoot:o,events:{...h.events,...f?.events,...n},size:{...h.size,...i},viewport:{...h.viewport,...p},...r}},[s]),[u]=ie.useState(()=>{const h=o.getState();return qm((d,p)=>({...h,scene:t,raycaster:a,pointer:l,mouse:l,previousRoot:o,events:{...h.events,...n},size:{...h.size,...i},...r,set:d,get:p,setEvents:v=>d(g=>({...g,events:{...g.events,...v}}))}))});return ie.useEffect(()=>{const h=o.subscribe(f=>u.setState(d=>c(f,d)));return()=>{h()}},[c]),ie.useEffect(()=>{u.setState(h=>c(o.getState(),h))},[c]),ie.useEffect(()=>()=>{u.destroy()},[]),dn.jsx(dn.Fragment,{children:uo.createPortal(dn.jsx(wh.Provider,{value:u,children:e}),u,null)})}uo.injectIntoDevTools({bundleType:0,rendererPackageName:"@react-three/fiber",version:ie.version});const Qc={onClick:["click",!1],onContextMenu:["contextmenu",!1],onDoubleClick:["dblclick",!1],onWheel:["wheel",!0],onPointerDown:["pointerdown",!0],onPointerUp:["pointerup",!0],onPointerLeave:["pointerleave",!0],onPointerMove:["pointermove",!0],onPointerCancel:["pointercancel",!0],onLostPointerCapture:["lostpointercapture",!0]};function p1(s){const{handlePointer:e}=n1(s);return{priority:1,enabled:!0,compute(t,n,i){n.pointer.set(t.offsetX/n.size.width*2-1,-(t.offsetY/n.size.height)*2+1),n.raycaster.setFromCamera(n.pointer,n.camera)},connected:void 0,handlers:Object.keys(Qc).reduce((t,n)=>({...t,[n]:e(n)}),{}),update:()=>{var t;const{events:n,internal:i}=s.getState();(t=i.lastEvent)!=null&&t.current&&n.handlers&&n.handlers.onPointerMove(i.lastEvent.current)},connect:t=>{var n;const{set:i,events:r}=s.getState();r.disconnect==null||r.disconnect(),i(o=>({events:{...o.events,connected:t}})),Object.entries((n=r.handlers)!=null?n:[]).forEach(([o,a])=>{const[l,c]=Qc[o];t.addEventListener(l,a,{passive:c})})},disconnect:()=>{const{set:t,events:n}=s.getState();if(n.connected){var i;Object.entries((i=n.handlers)!=null?i:[]).forEach(([r,o])=>{if(n&&n.connected instanceof HTMLElement){const[a]=Qc[r];n.connected.removeEventListener(a,o)}}),t(r=>({events:{...r.events,connected:void 0}}))}}}}const m1=ie.forwardRef(function({children:e,fallback:t,resize:n,style:i,gl:r,events:o=p1,eventSource:a,eventPrefix:l,shadows:c,linear:u,flat:h,legacy:f,orthographic:d,frameloop:p,dpr:v,performance:g,raycaster:m,camera:x,scene:_,onPointerMissed:y,onCreated:A,...b},T){ie.useMemo(()=>Ym(Wb),[]);const w=Og(),[M,S]=Ng({scroll:!0,debounce:{scroll:50,resize:0},...n}),R=ie.useRef(null),P=ie.useRef(null);ie.useImperativeHandle(T,()=>R.current);const F=jm(y),[U,G]=ie.useState(!1),[B,K]=ie.useState(!1);if(U)throw U;if(B)throw B;const Y=ie.useRef(null);Co(()=>{const J=R.current;S.width>0&&S.height>0&&J&&(Y.current||(Y.current=h1(J)),Y.current.configure({gl:r,events:o,shadows:c,linear:u,flat:h,legacy:f,orthographic:d,frameloop:p,dpr:v,performance:g,raycaster:m,camera:x,scene:_,size:S,onPointerMissed:(...Z)=>F.current==null?void 0:F.current(...Z),onCreated:Z=>{Z.events.connect==null||Z.events.connect(a?Zb(a)?a.current:a:P.current),l&&Z.setEvents({compute:(re,ne)=>{const $=re[l+"X"],se=re[l+"Y"];ne.pointer.set($/ne.size.width*2-1,-(se/ne.size.height)*2+1),ne.raycaster.setFromCamera(ne.pointer,ne.camera)}}),A?.(Z)}}),Y.current.render(dn.jsx(w,{children:dn.jsx(Jm,{set:K,children:dn.jsx(ie.Suspense,{fallback:dn.jsx($b,{set:G}),children:e??null})})})))}),ie.useEffect(()=>{const J=R.current;if(J)return()=>sg(J)},[]);const le=a?"none":"auto";return dn.jsx("div",{ref:P,style:{position:"relative",width:"100%",height:"100%",overflow:"hidden",pointerEvents:le,...i},...b,children:dn.jsx("div",{ref:M,style:{width:"100%",height:"100%"},children:dn.jsx("canvas",{ref:R,style:{display:"block"},children:t})})})}),lE=ie.forwardRef(function(e,t){return dn.jsx(Fg,{children:dn.jsx(m1,{...e,ref:t})})}),Ro=new L,Th=new L,g1=new L,Ad=new pe;function v1(s,e,t){const n=Ro.setFromMatrixPosition(s.matrixWorld);n.project(e);const i=t.width/2,r=t.height/2;return[n.x*i+i,-(n.y*r)+r]}function _1(s,e){const t=Ro.setFromMatrixPosition(s.matrixWorld),n=Th.setFromMatrixPosition(e.matrixWorld),i=t.sub(n),r=e.getWorldDirection(g1);return i.angleTo(r)>Math.PI/2}function x1(s,e,t,n){const i=Ro.setFromMatrixPosition(s.matrixWorld),r=i.clone();r.project(e),Ad.set(r.x,r.y),t.setFromCamera(Ad,e);const o=t.intersectObjects(n,!0);if(o.length){const a=o[0].distance;return i.distanceTo(t.ray.origin)<a}return!0}function y1(s,e){if(e instanceof ni)return e.zoom;if(e instanceof Dt){const t=Ro.setFromMatrixPosition(s.matrixWorld),n=Th.setFromMatrixPosition(e.matrixWorld),i=e.fov*Math.PI/180,r=t.distanceTo(n);return 1/(2*Math.tan(i/2)*r)}else return 1}function S1(s,e,t){if(e instanceof Dt||e instanceof ni){const n=Ro.setFromMatrixPosition(s.matrixWorld),i=Th.setFromMatrixPosition(e.matrixWorld),r=n.distanceTo(i),o=(t[1]-t[0])/(e.far-e.near),a=t[1]-o*e.far;return Math.round(o*r+a)}}const wu=s=>Math.abs(s)<1e-10?0:s;function ag(s,e,t=""){let n="matrix3d(";for(let i=0;i!==16;i++)n+=wu(e[i]*s.elements[i])+(i!==15?",":")");return t+n}const M1=(s=>e=>ag(e,s))([1,-1,1,1,1,-1,1,1,1,-1,1,1,1,-1,1,1]),b1=(s=>(e,t)=>ag(e,s(t),"translate(-50%,-50%)"))(s=>[1/s,1/s,1/s,1,-1/s,-1/s,-1/s,-1,1/s,1/s,1/s,1,1,1,1,1]);function w1(s){return s&&typeof s=="object"&&"current"in s}const cE=ie.forwardRef(({children:s,eps:e=.001,style:t,className:n,prepend:i,center:r,fullscreen:o,portal:a,distanceFactor:l,sprite:c=!1,transform:u=!1,occlude:h,onOcclude:f,castShadow:d,receiveShadow:p,material:v,geometry:g,zIndexRange:m=[16777271,0],calculatePosition:x=v1,as:_="div",wrapperClass:y,pointerEvents:A="auto",...b},T)=>{const{gl:w,camera:M,scene:S,size:R,raycaster:P,events:F,viewport:U}=Ht(),[G]=ie.useState(()=>document.createElement(_)),B=ie.useRef(),K=ie.useRef(null),Y=ie.useRef(0),le=ie.useRef([0,0]),J=ie.useRef(null),Z=ie.useRef(null),re=a?.current||F.connected||w.domElement.parentNode,ne=ie.useRef(null),$=ie.useRef(!1),se=ie.useMemo(()=>h&&h!=="blending"||Array.isArray(h)&&h.length&&w1(h[0]),[h]);ie.useLayoutEffect(()=>{const Fe=w.domElement;h&&h==="blending"?(Fe.style.zIndex=`${Math.floor(m[0]/2)}`,Fe.style.position="absolute",Fe.style.pointerEvents="none"):(Fe.style.zIndex=null,Fe.style.position=null,Fe.style.pointerEvents=null)},[h]),ie.useLayoutEffect(()=>{if(K.current){const Fe=B.current=Pg(G);if(S.updateMatrixWorld(),u)G.style.cssText="position:absolute;top:0;left:0;pointer-events:none;overflow:hidden;";else{const Se=x(K.current,M,R);G.style.cssText=`position:absolute;top:0;left:0;transform:translate3d(${Se[0]}px,${Se[1]}px,0);transform-origin:0 0;`}return re&&(i?re.prepend(G):re.appendChild(G)),()=>{re&&re.removeChild(G),Fe.unmount()}}},[re,u]),ie.useLayoutEffect(()=>{y&&(G.className=y)},[y]);const fe=ie.useMemo(()=>u?{position:"absolute",top:0,left:0,width:R.width,height:R.height,transformStyle:"preserve-3d",pointerEvents:"none"}:{position:"absolute",transform:r?"translate3d(-50%,-50%,0)":"none",...o&&{top:-R.height/2,left:-R.width/2,width:R.width,height:R.height},...t},[t,r,o,R,u]),me=ie.useMemo(()=>({position:"absolute",pointerEvents:A}),[A]);ie.useLayoutEffect(()=>{if($.current=!1,u){var Fe;(Fe=B.current)==null||Fe.render(ie.createElement("div",{ref:J,style:fe},ie.createElement("div",{ref:Z,style:me},ie.createElement("div",{ref:T,className:n,style:t,children:s}))))}else{var Se;(Se=B.current)==null||Se.render(ie.createElement("div",{ref:T,style:fe,className:n,children:s}))}});const Te=ie.useRef(!0);Ti(Fe=>{if(K.current){M.updateMatrixWorld(),K.current.updateWorldMatrix(!0,!1);const Se=u?le.current:x(K.current,M,R);if(u||Math.abs(Y.current-M.zoom)>e||Math.abs(le.current[0]-Se[0])>e||Math.abs(le.current[1]-Se[1])>e){const ue=_1(K.current,M);let xe=!1;se&&(Array.isArray(h)?xe=h.map(Le=>Le.current):h!=="blending"&&(xe=[S]));const N=Te.current;if(xe){const Le=x1(K.current,M,P,xe);Te.current=Le&&!ue}else Te.current=!ue;N!==Te.current&&(f?f(!Te.current):G.style.display=Te.current?"block":"none");const Be=Math.floor(m[0]/2),ye=h?se?[m[0],Be]:[Be-1,0]:m;if(G.style.zIndex=`${S1(K.current,M,ye)}`,u){const[Le,Oe]=[R.width/2,R.height/2],$e=M.projectionMatrix.elements[5]*Oe,{isOrthographicCamera:Ne,top:O,left:I,bottom:Q,right:he}=M,ve=M1(M.matrixWorldInverse),ge=Ne?`scale(${$e})translate(${wu(-(he+I)/2)}px,${wu((O+Q)/2)}px)`:`translateZ(${$e}px)`;let Ee=K.current.matrixWorld;c&&(Ee=M.matrixWorldInverse.clone().transpose().copyPosition(Ee).scale(K.current.scale),Ee.elements[3]=Ee.elements[7]=Ee.elements[11]=0,Ee.elements[15]=1),G.style.width=R.width+"px",G.style.height=R.height+"px",G.style.perspective=Ne?"":`${$e}px`,J.current&&Z.current&&(J.current.style.transform=`${ge}${ve}translate(${Le}px,${Oe}px)`,Z.current.style.transform=b1(Ee,1/((l||10)/400)))}else{const Le=l===void 0?1:y1(K.current,M)*l;G.style.transform=`translate3d(${Se[0]}px,${Se[1]}px,0) scale(${Le})`}le.current=Se,Y.current=M.zoom}}if(!se&&ne.current&&!$.current)if(u){if(J.current){const Se=J.current.children[0];if(Se!=null&&Se.clientWidth&&Se!=null&&Se.clientHeight){const{isOrthographicCamera:ue}=M;if(ue||g)b.scale&&(Array.isArray(b.scale)?b.scale instanceof L?ne.current.scale.copy(b.scale.clone().divideScalar(1)):ne.current.scale.set(1/b.scale[0],1/b.scale[1],1/b.scale[2]):ne.current.scale.setScalar(1/b.scale));else{const xe=(l||10)/400,N=Se.clientWidth*xe,Be=Se.clientHeight*xe;ne.current.scale.set(N,Be,1)}$.current=!0}}}else{const Se=G.children[0];if(Se!=null&&Se.clientWidth&&Se!=null&&Se.clientHeight){const ue=1/U.factor,xe=Se.clientWidth*ue,N=Se.clientHeight*ue;ne.current.scale.set(xe,N,1),$.current=!0}ne.current.lookAt(Fe.camera.position)}});const qe=ie.useMemo(()=>({vertexShader:u?void 0:`
          /*
            This shader is from the THREE's SpriteMaterial.
            We need to turn the backing plane into a Sprite
            (make it always face the camera) if "transfrom"
            is false.
          */
          #include <common>

          void main() {
            vec2 center = vec2(0., 1.);
            float rotation = 0.0;

            // This is somewhat arbitrary, but it seems to work well
            // Need to figure out how to derive this dynamically if it even matters
            float size = 0.03;

            vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
            vec2 scale;
            scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
            scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

            bool isPerspective = isPerspectiveMatrix( projectionMatrix );
            if ( isPerspective ) scale *= - mvPosition.z;

            vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale * size;
            vec2 rotatedPosition;
            rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
            rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
            mvPosition.xy += rotatedPosition;

            gl_Position = projectionMatrix * mvPosition;
          }
      `,fragmentShader:`
        void main() {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        }
      `}),[u]);return ie.createElement("group",Si({},b,{ref:K}),h&&!se&&ie.createElement("mesh",{castShadow:d,receiveShadow:p,ref:ne},g||ie.createElement("planeGeometry",null),v||ie.createElement("shaderMaterial",{side:Cn,vertexShader:qe.vertexShader,fragmentShader:qe.fragmentShader})))}),tc=parseInt(ds.replace(/\D+/g,"")),lg=tc>=125?"uv1":"uv2";var On=Uint8Array,Ni=Uint16Array,Eu=Uint32Array,cg=new On([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),ug=new On([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),E1=new On([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),hg=function(s,e){for(var t=new Ni(31),n=0;n<31;++n)t[n]=e+=1<<s[n-1];for(var i=new Eu(t[30]),n=1;n<30;++n)for(var r=t[n];r<t[n+1];++r)i[r]=r-t[n]<<5|n;return[t,i]},fg=hg(cg,2),dg=fg[0],T1=fg[1];dg[28]=258,T1[258]=28;var A1=hg(ug,0),C1=A1[0],Tu=new Ni(32768);for(var Pt=0;Pt<32768;++Pt){var Li=(Pt&43690)>>>1|(Pt&21845)<<1;Li=(Li&52428)>>>2|(Li&13107)<<2,Li=(Li&61680)>>>4|(Li&3855)<<4,Tu[Pt]=((Li&65280)>>>8|(Li&255)<<8)>>>1}var qs=function(s,e,t){for(var n=s.length,i=0,r=new Ni(e);i<n;++i)++r[s[i]-1];var o=new Ni(e);for(i=0;i<e;++i)o[i]=o[i-1]+r[i-1]<<1;var a;if(t){a=new Ni(1<<e);var l=15-e;for(i=0;i<n;++i)if(s[i])for(var c=i<<4|s[i],u=e-s[i],h=o[s[i]-1]++<<u,f=h|(1<<u)-1;h<=f;++h)a[Tu[h]>>>l]=c}else for(a=new Ni(n),i=0;i<n;++i)s[i]&&(a[i]=Tu[o[s[i]-1]++]>>>15-s[i]);return a},Io=new On(288);for(var Pt=0;Pt<144;++Pt)Io[Pt]=8;for(var Pt=144;Pt<256;++Pt)Io[Pt]=9;for(var Pt=256;Pt<280;++Pt)Io[Pt]=7;for(var Pt=280;Pt<288;++Pt)Io[Pt]=8;var pg=new On(32);for(var Pt=0;Pt<32;++Pt)pg[Pt]=5;var R1=qs(Io,9,1),I1=qs(pg,5,1),eu=function(s){for(var e=s[0],t=1;t<s.length;++t)s[t]>e&&(e=s[t]);return e},Vn=function(s,e,t){var n=e/8|0;return(s[n]|s[n+1]<<8)>>(e&7)&t},tu=function(s,e){var t=e/8|0;return(s[t]|s[t+1]<<8|s[t+2]<<16)>>(e&7)},P1=function(s){return(s/8|0)+(s&7&&1)},U1=function(s,e,t){(t==null||t>s.length)&&(t=s.length);var n=new(s instanceof Ni?Ni:s instanceof Eu?Eu:On)(t-e);return n.set(s.subarray(e,t)),n},D1=function(s,e,t){var n=s.length;if(!n||t&&!t.l&&n<5)return e||new On(0);var i=!e||t,r=!t||t.i;t||(t={}),e||(e=new On(n*3));var o=function(fe){var me=e.length;if(fe>me){var Te=new On(Math.max(me*2,fe));Te.set(e),e=Te}},a=t.f||0,l=t.p||0,c=t.b||0,u=t.l,h=t.d,f=t.m,d=t.n,p=n*8;do{if(!u){t.f=a=Vn(s,l,1);var v=Vn(s,l+1,3);if(l+=3,v)if(v==1)u=R1,h=I1,f=9,d=5;else if(v==2){var _=Vn(s,l,31)+257,y=Vn(s,l+10,15)+4,A=_+Vn(s,l+5,31)+1;l+=14;for(var b=new On(A),T=new On(19),w=0;w<y;++w)T[E1[w]]=Vn(s,l+w*3,7);l+=y*3;for(var M=eu(T),S=(1<<M)-1,R=qs(T,M,1),w=0;w<A;){var P=R[Vn(s,l,S)];l+=P&15;var g=P>>>4;if(g<16)b[w++]=g;else{var F=0,U=0;for(g==16?(U=3+Vn(s,l,3),l+=2,F=b[w-1]):g==17?(U=3+Vn(s,l,7),l+=3):g==18&&(U=11+Vn(s,l,127),l+=7);U--;)b[w++]=F}}var G=b.subarray(0,_),B=b.subarray(_);f=eu(G),d=eu(B),u=qs(G,f,1),h=qs(B,d,1)}else throw"invalid block type";else{var g=P1(l)+4,m=s[g-4]|s[g-3]<<8,x=g+m;if(x>n){if(r)throw"unexpected EOF";break}i&&o(c+m),e.set(s.subarray(g,x),c),t.b=c+=m,t.p=l=x*8;continue}if(l>p){if(r)throw"unexpected EOF";break}}i&&o(c+131072);for(var K=(1<<f)-1,Y=(1<<d)-1,le=l;;le=l){var F=u[tu(s,l)&K],J=F>>>4;if(l+=F&15,l>p){if(r)throw"unexpected EOF";break}if(!F)throw"invalid length/literal";if(J<256)e[c++]=J;else if(J==256){le=l,u=null;break}else{var Z=J-254;if(J>264){var w=J-257,re=cg[w];Z=Vn(s,l,(1<<re)-1)+dg[w],l+=re}var ne=h[tu(s,l)&Y],$=ne>>>4;if(!ne)throw"invalid distance";l+=ne&15;var B=C1[$];if($>3){var re=ug[$];B+=tu(s,l)&(1<<re)-1,l+=re}if(l>p){if(r)throw"unexpected EOF";break}i&&o(c+131072);for(var se=c+Z;c<se;c+=4)e[c]=e[c-B],e[c+1]=e[c+1-B],e[c+2]=e[c+2-B],e[c+3]=e[c+3-B];c=se}}t.l=u,t.p=le,t.b=c,u&&(a=1,t.m=f,t.d=h,t.n=d)}while(!a);return c==e.length?e:U1(e,0,c)},L1=new On(0),F1=function(s){if((s[0]&15)!=8||s[0]>>>4>7||(s[0]<<8|s[1])%31)throw"invalid zlib data";if(s[1]&32)throw"invalid zlib data: preset dictionaries not supported"};function wa(s,e){return D1((F1(s),s.subarray(2,-4)),e)}var O1=typeof TextDecoder<"u"&&new TextDecoder,N1=0;try{O1.decode(L1,{stream:!0}),N1=1}catch{}const B1=s=>s&&s.isCubeTexture;class k1 extends Rt{constructor(e,t){var n,i;const r=B1(e),a=((i=r?(n=e.image[0])==null?void 0:n.width:e.image.width)!=null?i:1024)/4,l=Math.floor(Math.log2(a)),c=Math.pow(2,l),u=3*Math.max(c,16*7),h=4*c,f=[r?"#define ENVMAP_TYPE_CUBE":"",`#define CUBEUV_TEXEL_WIDTH ${1/u}`,`#define CUBEUV_TEXEL_HEIGHT ${1/h}`,`#define CUBEUV_MAX_MIP ${l}.0`],d=`
        varying vec3 vWorldPosition;
        void main() 
        {
            vec4 worldPosition = ( modelMatrix * vec4( position, 1.0 ) );
            vWorldPosition = worldPosition.xyz;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
        `,p=f.join(`
`)+`
        #define ENVMAP_TYPE_CUBE_UV
        varying vec3 vWorldPosition;
        uniform float radius;
        uniform float height;
        uniform float angle;
        #ifdef ENVMAP_TYPE_CUBE
            uniform samplerCube map;
        #else
            uniform sampler2D map;
        #endif
        // From: https://www.shadertoy.com/view/4tsBD7
        float diskIntersectWithBackFaceCulling( vec3 ro, vec3 rd, vec3 c, vec3 n, float r ) 
        {
            float d = dot ( rd, n );
            
            if( d > 0.0 ) { return 1e6; }
            
            vec3  o = ro - c;
            float t = - dot( n, o ) / d;
            vec3  q = o + rd * t;
            
            return ( dot( q, q ) < r * r ) ? t : 1e6;
        }
        // From: https://www.iquilezles.org/www/articles/intersectors/intersectors.htm
        float sphereIntersect( vec3 ro, vec3 rd, vec3 ce, float ra ) 
        {
            vec3 oc = ro - ce;
            float b = dot( oc, rd );
            float c = dot( oc, oc ) - ra * ra;
            float h = b * b - c;
            
            if( h < 0.0 ) { return -1.0; }
            
            h = sqrt( h );
            
            return - b + h;
        }
        vec3 project() 
        {
            vec3 p = normalize( vWorldPosition );
            vec3 camPos = cameraPosition;
            camPos.y -= height;
            float intersection = sphereIntersect( camPos, p, vec3( 0.0 ), radius );
            if( intersection > 0.0 ) {
                
                vec3 h = vec3( 0.0, - height, 0.0 );
                float intersection2 = diskIntersectWithBackFaceCulling( camPos, p, h, vec3( 0.0, 1.0, 0.0 ), radius );
                p = ( camPos + min( intersection, intersection2 ) * p ) / radius;
            } else {
                p = vec3( 0.0, 1.0, 0.0 );
            }
            return p;
        }
        #include <common>
        #include <cube_uv_reflection_fragment>
        void main() 
        {
            vec3 projectedWorldPosition = project();
            
            #ifdef ENVMAP_TYPE_CUBE
                vec3 outcolor = textureCube( map, projectedWorldPosition ).rgb;
            #else
                vec3 direction = normalize( projectedWorldPosition );
                vec2 uv = equirectUv( direction );
                vec3 outcolor = texture2D( map, uv ).rgb;
            #endif
            gl_FragColor = vec4( outcolor, 1.0 );
            #include <tonemapping_fragment>
            #include <${tc>=154?"colorspace_fragment":"encodings_fragment"}>
        }
        `,v={map:{value:e},height:{value:t?.height||15},radius:{value:t?.radius||100}},g=new bo(1,16),m=new cn({uniforms:v,fragmentShader:p,vertexShader:d,side:Cn});super(g,m)}set radius(e){this.material.uniforms.radius.value=e}get radius(){return this.material.uniforms.radius.value}set height(e){this.material.uniforms.height.value=e}get height(){return this.material.uniforms.height.value}}var z1=Object.defineProperty,G1=(s,e,t)=>e in s?z1(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t,V1=(s,e,t)=>(G1(s,e+"",t),t);class H1{constructor(){V1(this,"_listeners")}addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,e);e.target=null}}}var W1=Object.defineProperty,X1=(s,e,t)=>e in s?W1(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t,it=(s,e,t)=>(X1(s,typeof e!="symbol"?e+"":e,t),t);const Ea=new Er,Cd=new mi,q1=Math.cos(70*(Math.PI/180)),Rd=(s,e)=>(s%e+e)%e;let Y1=class extends H1{constructor(e,t){super(),it(this,"object"),it(this,"domElement"),it(this,"enabled",!0),it(this,"target",new L),it(this,"minDistance",0),it(this,"maxDistance",1/0),it(this,"minZoom",0),it(this,"maxZoom",1/0),it(this,"minPolarAngle",0),it(this,"maxPolarAngle",Math.PI),it(this,"minAzimuthAngle",-1/0),it(this,"maxAzimuthAngle",1/0),it(this,"enableDamping",!1),it(this,"dampingFactor",.05),it(this,"enableZoom",!0),it(this,"zoomSpeed",1),it(this,"enableRotate",!0),it(this,"rotateSpeed",1),it(this,"enablePan",!0),it(this,"panSpeed",1),it(this,"screenSpacePanning",!0),it(this,"keyPanSpeed",7),it(this,"zoomToCursor",!1),it(this,"autoRotate",!1),it(this,"autoRotateSpeed",2),it(this,"reverseOrbit",!1),it(this,"reverseHorizontalOrbit",!1),it(this,"reverseVerticalOrbit",!1),it(this,"keys",{LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"}),it(this,"mouseButtons",{LEFT:ir.ROTATE,MIDDLE:ir.DOLLY,RIGHT:ir.PAN}),it(this,"touches",{ONE:rr.ROTATE,TWO:rr.DOLLY_PAN}),it(this,"target0"),it(this,"position0"),it(this,"zoom0"),it(this,"_domElementKeyEvents",null),it(this,"getPolarAngle"),it(this,"getAzimuthalAngle"),it(this,"setPolarAngle"),it(this,"setAzimuthalAngle"),it(this,"getDistance"),it(this,"getZoomScale"),it(this,"listenToKeyEvents"),it(this,"stopListenToKeyEvents"),it(this,"saveState"),it(this,"reset"),it(this,"update"),it(this,"connect"),it(this,"dispose"),it(this,"dollyIn"),it(this,"dollyOut"),it(this,"getScale"),it(this,"setScale"),this.object=e,this.domElement=t,this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this.getPolarAngle=()=>u.phi,this.getAzimuthalAngle=()=>u.theta,this.setPolarAngle=H=>{let ae=Rd(H,2*Math.PI),Ae=u.phi;Ae<0&&(Ae+=2*Math.PI),ae<0&&(ae+=2*Math.PI);let X=Math.abs(ae-Ae);2*Math.PI-X<X&&(ae<Ae?ae+=2*Math.PI:Ae+=2*Math.PI),h.phi=ae-Ae,n.update()},this.setAzimuthalAngle=H=>{let ae=Rd(H,2*Math.PI),Ae=u.theta;Ae<0&&(Ae+=2*Math.PI),ae<0&&(ae+=2*Math.PI);let X=Math.abs(ae-Ae);2*Math.PI-X<X&&(ae<Ae?ae+=2*Math.PI:Ae+=2*Math.PI),h.theta=ae-Ae,n.update()},this.getDistance=()=>n.object.position.distanceTo(n.target),this.listenToKeyEvents=H=>{H.addEventListener("keydown",Re),this._domElementKeyEvents=H},this.stopListenToKeyEvents=()=>{this._domElementKeyEvents.removeEventListener("keydown",Re),this._domElementKeyEvents=null},this.saveState=()=>{n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=()=>{n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(i),n.update(),l=a.NONE},this.update=(()=>{const H=new L,ae=new L(0,1,0),Ae=new ln().setFromUnitVectors(e.up,ae),X=Ae.clone().invert(),j=new L,ee=new ln,_e=2*Math.PI;return function(){const we=n.object.position;Ae.setFromUnitVectors(e.up,ae),X.copy(Ae).invert(),H.copy(we).sub(n.target),H.applyQuaternion(Ae),u.setFromVector3(H),n.autoRotate&&l===a.NONE&&U(P()),n.enableDamping?(u.theta+=h.theta*n.dampingFactor,u.phi+=h.phi*n.dampingFactor):(u.theta+=h.theta,u.phi+=h.phi);let Ye=n.minAzimuthAngle,ot=n.maxAzimuthAngle;isFinite(Ye)&&isFinite(ot)&&(Ye<-Math.PI?Ye+=_e:Ye>Math.PI&&(Ye-=_e),ot<-Math.PI?ot+=_e:ot>Math.PI&&(ot-=_e),Ye<=ot?u.theta=Math.max(Ye,Math.min(ot,u.theta)):u.theta=u.theta>(Ye+ot)/2?Math.max(Ye,u.theta):Math.min(ot,u.theta)),u.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,u.phi)),u.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(d,n.dampingFactor):n.target.add(d),n.zoomToCursor&&M||n.object.isOrthographicCamera?u.radius=ne(u.radius):u.radius=ne(u.radius*f),H.setFromSpherical(u),H.applyQuaternion(X),we.copy(n.target).add(H),n.object.matrixAutoUpdate||n.object.updateMatrix(),n.object.lookAt(n.target),n.enableDamping===!0?(h.theta*=1-n.dampingFactor,h.phi*=1-n.dampingFactor,d.multiplyScalar(1-n.dampingFactor)):(h.set(0,0,0),d.set(0,0,0));let Qe=!1;if(n.zoomToCursor&&M){let et=null;if(n.object instanceof Dt&&n.object.isPerspectiveCamera){const Mt=H.length();et=ne(Mt*f);const bt=Mt-et;n.object.position.addScaledVector(T,bt),n.object.updateMatrixWorld()}else if(n.object.isOrthographicCamera){const Mt=new L(w.x,w.y,0);Mt.unproject(n.object),n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/f)),n.object.updateProjectionMatrix(),Qe=!0;const bt=new L(w.x,w.y,0);bt.unproject(n.object),n.object.position.sub(bt).add(Mt),n.object.updateMatrixWorld(),et=H.length()}else n.zoomToCursor=!1;et!==null&&(n.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(et).add(n.object.position):(Ea.origin.copy(n.object.position),Ea.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(Ea.direction))<q1?e.lookAt(n.target):(Cd.setFromNormalAndCoplanarPoint(n.object.up,n.target),Ea.intersectPlane(Cd,n.target))))}else n.object instanceof ni&&n.object.isOrthographicCamera&&(Qe=f!==1,Qe&&(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/f)),n.object.updateProjectionMatrix()));return f=1,M=!1,Qe||j.distanceToSquared(n.object.position)>c||8*(1-ee.dot(n.object.quaternion))>c?(n.dispatchEvent(i),j.copy(n.object.position),ee.copy(n.object.quaternion),Qe=!1,!0):!1}})(),this.connect=H=>{n.domElement=H,n.domElement.style.touchAction="none",n.domElement.addEventListener("contextmenu",be),n.domElement.addEventListener("pointerdown",I),n.domElement.addEventListener("pointercancel",he),n.domElement.addEventListener("wheel",Ee)},this.dispose=()=>{var H,ae,Ae,X,j,ee;n.domElement&&(n.domElement.style.touchAction="auto"),(H=n.domElement)==null||H.removeEventListener("contextmenu",be),(ae=n.domElement)==null||ae.removeEventListener("pointerdown",I),(Ae=n.domElement)==null||Ae.removeEventListener("pointercancel",he),(X=n.domElement)==null||X.removeEventListener("wheel",Ee),(j=n.domElement)==null||j.ownerDocument.removeEventListener("pointermove",Q),(ee=n.domElement)==null||ee.ownerDocument.removeEventListener("pointerup",he),n._domElementKeyEvents!==null&&n._domElementKeyEvents.removeEventListener("keydown",Re)};const n=this,i={type:"change"},r={type:"start"},o={type:"end"},a={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let l=a.NONE;const c=1e-6,u=new Ml,h=new Ml;let f=1;const d=new L,p=new pe,v=new pe,g=new pe,m=new pe,x=new pe,_=new pe,y=new pe,A=new pe,b=new pe,T=new L,w=new pe;let M=!1;const S=[],R={};function P(){return 2*Math.PI/60/60*n.autoRotateSpeed}function F(){return Math.pow(.95,n.zoomSpeed)}function U(H){n.reverseOrbit||n.reverseHorizontalOrbit?h.theta+=H:h.theta-=H}function G(H){n.reverseOrbit||n.reverseVerticalOrbit?h.phi+=H:h.phi-=H}const B=(()=>{const H=new L;return function(Ae,X){H.setFromMatrixColumn(X,0),H.multiplyScalar(-Ae),d.add(H)}})(),K=(()=>{const H=new L;return function(Ae,X){n.screenSpacePanning===!0?H.setFromMatrixColumn(X,1):(H.setFromMatrixColumn(X,0),H.crossVectors(n.object.up,H)),H.multiplyScalar(Ae),d.add(H)}})(),Y=(()=>{const H=new L;return function(Ae,X){const j=n.domElement;if(j&&n.object instanceof Dt&&n.object.isPerspectiveCamera){const ee=n.object.position;H.copy(ee).sub(n.target);let _e=H.length();_e*=Math.tan(n.object.fov/2*Math.PI/180),B(2*Ae*_e/j.clientHeight,n.object.matrix),K(2*X*_e/j.clientHeight,n.object.matrix)}else j&&n.object instanceof ni&&n.object.isOrthographicCamera?(B(Ae*(n.object.right-n.object.left)/n.object.zoom/j.clientWidth,n.object.matrix),K(X*(n.object.top-n.object.bottom)/n.object.zoom/j.clientHeight,n.object.matrix)):n.enablePan=!1}})();function le(H){n.object instanceof Dt&&n.object.isPerspectiveCamera||n.object instanceof ni&&n.object.isOrthographicCamera?f=H:n.enableZoom=!1}function J(H){le(f/H)}function Z(H){le(f*H)}function re(H){if(!n.zoomToCursor||!n.domElement)return;M=!0;const ae=n.domElement.getBoundingClientRect(),Ae=H.clientX-ae.left,X=H.clientY-ae.top,j=ae.width,ee=ae.height;w.x=Ae/j*2-1,w.y=-(X/ee)*2+1,T.set(w.x,w.y,1).unproject(n.object).sub(n.object.position).normalize()}function ne(H){return Math.max(n.minDistance,Math.min(n.maxDistance,H))}function $(H){p.set(H.clientX,H.clientY)}function se(H){re(H),y.set(H.clientX,H.clientY)}function fe(H){m.set(H.clientX,H.clientY)}function me(H){v.set(H.clientX,H.clientY),g.subVectors(v,p).multiplyScalar(n.rotateSpeed);const ae=n.domElement;ae&&(U(2*Math.PI*g.x/ae.clientHeight),G(2*Math.PI*g.y/ae.clientHeight)),p.copy(v),n.update()}function Te(H){A.set(H.clientX,H.clientY),b.subVectors(A,y),b.y>0?J(F()):b.y<0&&Z(F()),y.copy(A),n.update()}function qe(H){x.set(H.clientX,H.clientY),_.subVectors(x,m).multiplyScalar(n.panSpeed),Y(_.x,_.y),m.copy(x),n.update()}function Fe(H){re(H),H.deltaY<0?Z(F()):H.deltaY>0&&J(F()),n.update()}function Se(H){let ae=!1;switch(H.code){case n.keys.UP:Y(0,n.keyPanSpeed),ae=!0;break;case n.keys.BOTTOM:Y(0,-n.keyPanSpeed),ae=!0;break;case n.keys.LEFT:Y(n.keyPanSpeed,0),ae=!0;break;case n.keys.RIGHT:Y(-n.keyPanSpeed,0),ae=!0;break}ae&&(H.preventDefault(),n.update())}function ue(){if(S.length==1)p.set(S[0].pageX,S[0].pageY);else{const H=.5*(S[0].pageX+S[1].pageX),ae=.5*(S[0].pageY+S[1].pageY);p.set(H,ae)}}function xe(){if(S.length==1)m.set(S[0].pageX,S[0].pageY);else{const H=.5*(S[0].pageX+S[1].pageX),ae=.5*(S[0].pageY+S[1].pageY);m.set(H,ae)}}function N(){const H=S[0].pageX-S[1].pageX,ae=S[0].pageY-S[1].pageY,Ae=Math.sqrt(H*H+ae*ae);y.set(0,Ae)}function Be(){n.enableZoom&&N(),n.enablePan&&xe()}function ye(){n.enableZoom&&N(),n.enableRotate&&ue()}function Le(H){if(S.length==1)v.set(H.pageX,H.pageY);else{const Ae=Ce(H),X=.5*(H.pageX+Ae.x),j=.5*(H.pageY+Ae.y);v.set(X,j)}g.subVectors(v,p).multiplyScalar(n.rotateSpeed);const ae=n.domElement;ae&&(U(2*Math.PI*g.x/ae.clientHeight),G(2*Math.PI*g.y/ae.clientHeight)),p.copy(v)}function Oe(H){if(S.length==1)x.set(H.pageX,H.pageY);else{const ae=Ce(H),Ae=.5*(H.pageX+ae.x),X=.5*(H.pageY+ae.y);x.set(Ae,X)}_.subVectors(x,m).multiplyScalar(n.panSpeed),Y(_.x,_.y),m.copy(x)}function $e(H){const ae=Ce(H),Ae=H.pageX-ae.x,X=H.pageY-ae.y,j=Math.sqrt(Ae*Ae+X*X);A.set(0,j),b.set(0,Math.pow(A.y/y.y,n.zoomSpeed)),J(b.y),y.copy(A)}function Ne(H){n.enableZoom&&$e(H),n.enablePan&&Oe(H)}function O(H){n.enableZoom&&$e(H),n.enableRotate&&Le(H)}function I(H){var ae,Ae;n.enabled!==!1&&(S.length===0&&((ae=n.domElement)==null||ae.ownerDocument.addEventListener("pointermove",Q),(Ae=n.domElement)==null||Ae.ownerDocument.addEventListener("pointerup",he)),Ge(H),H.pointerType==="touch"?Ie(H):ve(H))}function Q(H){n.enabled!==!1&&(H.pointerType==="touch"?Je(H):ge(H))}function he(H){var ae,Ae,X;ke(H),S.length===0&&((ae=n.domElement)==null||ae.releasePointerCapture(H.pointerId),(Ae=n.domElement)==null||Ae.ownerDocument.removeEventListener("pointermove",Q),(X=n.domElement)==null||X.ownerDocument.removeEventListener("pointerup",he)),n.dispatchEvent(o),l=a.NONE}function ve(H){let ae;switch(H.button){case 0:ae=n.mouseButtons.LEFT;break;case 1:ae=n.mouseButtons.MIDDLE;break;case 2:ae=n.mouseButtons.RIGHT;break;default:ae=-1}switch(ae){case ir.DOLLY:if(n.enableZoom===!1)return;se(H),l=a.DOLLY;break;case ir.ROTATE:if(H.ctrlKey||H.metaKey||H.shiftKey){if(n.enablePan===!1)return;fe(H),l=a.PAN}else{if(n.enableRotate===!1)return;$(H),l=a.ROTATE}break;case ir.PAN:if(H.ctrlKey||H.metaKey||H.shiftKey){if(n.enableRotate===!1)return;$(H),l=a.ROTATE}else{if(n.enablePan===!1)return;fe(H),l=a.PAN}break;default:l=a.NONE}l!==a.NONE&&n.dispatchEvent(r)}function ge(H){if(n.enabled!==!1)switch(l){case a.ROTATE:if(n.enableRotate===!1)return;me(H);break;case a.DOLLY:if(n.enableZoom===!1)return;Te(H);break;case a.PAN:if(n.enablePan===!1)return;qe(H);break}}function Ee(H){n.enabled===!1||n.enableZoom===!1||l!==a.NONE&&l!==a.ROTATE||(H.preventDefault(),n.dispatchEvent(r),Fe(H),n.dispatchEvent(o))}function Re(H){n.enabled===!1||n.enablePan===!1||Se(H)}function Ie(H){switch(Xe(H),S.length){case 1:switch(n.touches.ONE){case rr.ROTATE:if(n.enableRotate===!1)return;ue(),l=a.TOUCH_ROTATE;break;case rr.PAN:if(n.enablePan===!1)return;xe(),l=a.TOUCH_PAN;break;default:l=a.NONE}break;case 2:switch(n.touches.TWO){case rr.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;Be(),l=a.TOUCH_DOLLY_PAN;break;case rr.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;ye(),l=a.TOUCH_DOLLY_ROTATE;break;default:l=a.NONE}break;default:l=a.NONE}l!==a.NONE&&n.dispatchEvent(r)}function Je(H){switch(Xe(H),l){case a.TOUCH_ROTATE:if(n.enableRotate===!1)return;Le(H),n.update();break;case a.TOUCH_PAN:if(n.enablePan===!1)return;Oe(H),n.update();break;case a.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;Ne(H),n.update();break;case a.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;O(H),n.update();break;default:l=a.NONE}}function be(H){n.enabled!==!1&&H.preventDefault()}function Ge(H){S.push(H)}function ke(H){delete R[H.pointerId];for(let ae=0;ae<S.length;ae++)if(S[ae].pointerId==H.pointerId){S.splice(ae,1);return}}function Xe(H){let ae=R[H.pointerId];ae===void 0&&(ae=new pe,R[H.pointerId]=ae),ae.set(H.pageX,H.pageY)}function Ce(H){const ae=H.pointerId===S[0].pointerId?S[1]:S[0];return R[ae.pointerId]}this.dollyIn=(H=F())=>{Z(H),n.update()},this.dollyOut=(H=F())=>{J(H),n.update()},this.getScale=()=>f,this.setScale=H=>{le(H),n.update()},this.getZoomScale=()=>F(),t!==void 0&&this.connect(t),this.update()}};const Z1={uniforms:{tDiffuse:{value:null},h:{value:1/512}},vertexShader:`
      varying vec2 vUv;

      void main() {

        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

      }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float h;

    varying vec2 vUv;

    void main() {

    	vec4 sum = vec4( 0.0 );

    	sum += texture2D( tDiffuse, vec2( vUv.x - 4.0 * h, vUv.y ) ) * 0.051;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 3.0 * h, vUv.y ) ) * 0.0918;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 2.0 * h, vUv.y ) ) * 0.12245;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 1.0 * h, vUv.y ) ) * 0.1531;
    	sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 1.0 * h, vUv.y ) ) * 0.1531;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 2.0 * h, vUv.y ) ) * 0.12245;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 3.0 * h, vUv.y ) ) * 0.0918;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 4.0 * h, vUv.y ) ) * 0.051;

    	gl_FragColor = sum;

    }
  `},$1={uniforms:{tDiffuse:{value:null},v:{value:1/512}},vertexShader:`
    varying vec2 vUv;

    void main() {

      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    }
  `,fragmentShader:`

  uniform sampler2D tDiffuse;
  uniform float v;

  varying vec2 vUv;

  void main() {

    vec4 sum = vec4( 0.0 );

    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 4.0 * v ) ) * 0.051;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 3.0 * v ) ) * 0.0918;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 2.0 * v ) ) * 0.12245;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 1.0 * v ) ) * 0.1531;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 1.0 * v ) ) * 0.1531;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 2.0 * v ) ) * 0.12245;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 3.0 * v ) ) * 0.0918;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 4.0 * v ) ) * 0.051;

    gl_FragColor = sum;

  }
  `};class j1 extends ph{constructor(e){super(e),this.type=mn}parse(e){const o=function(w,M){switch(w){case 1:throw new Error("THREE.RGBELoader: Read Error: "+(M||""));case 2:throw new Error("THREE.RGBELoader: Write Error: "+(M||""));case 3:throw new Error("THREE.RGBELoader: Bad File Format: "+(M||""));default:case 4:throw new Error("THREE.RGBELoader: Memory Error: "+(M||""))}},u=`
`,h=function(w,M,S){M=M||1024;let P=w.pos,F=-1,U=0,G="",B=String.fromCharCode.apply(null,new Uint16Array(w.subarray(P,P+128)));for(;0>(F=B.indexOf(u))&&U<M&&P<w.byteLength;)G+=B,U+=B.length,P+=128,B+=String.fromCharCode.apply(null,new Uint16Array(w.subarray(P,P+128)));return-1<F?(w.pos+=U+F+1,G+B.slice(0,F)):!1},f=function(w){const M=/^#\?(\S+)/,S=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,R=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,P=/^\s*FORMAT=(\S+)\s*$/,F=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,U={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};let G,B;for((w.pos>=w.byteLength||!(G=h(w)))&&o(1,"no header found"),(B=G.match(M))||o(3,"bad initial token"),U.valid|=1,U.programtype=B[1],U.string+=G+`
`;G=h(w),G!==!1;){if(U.string+=G+`
`,G.charAt(0)==="#"){U.comments+=G+`
`;continue}if((B=G.match(S))&&(U.gamma=parseFloat(B[1])),(B=G.match(R))&&(U.exposure=parseFloat(B[1])),(B=G.match(P))&&(U.valid|=2,U.format=B[1]),(B=G.match(F))&&(U.valid|=4,U.height=parseInt(B[1],10),U.width=parseInt(B[2],10)),U.valid&2&&U.valid&4)break}return U.valid&2||o(3,"missing format specifier"),U.valid&4||o(3,"missing image size specifier"),U},d=function(w,M,S){const R=M;if(R<8||R>32767||w[0]!==2||w[1]!==2||w[2]&128)return new Uint8Array(w);R!==(w[2]<<8|w[3])&&o(3,"wrong scanline width");const P=new Uint8Array(4*M*S);P.length||o(4,"unable to allocate buffer space");let F=0,U=0;const G=4*R,B=new Uint8Array(4),K=new Uint8Array(G);let Y=S;for(;Y>0&&U<w.byteLength;){U+4>w.byteLength&&o(1),B[0]=w[U++],B[1]=w[U++],B[2]=w[U++],B[3]=w[U++],(B[0]!=2||B[1]!=2||(B[2]<<8|B[3])!=R)&&o(3,"bad rgbe scanline format");let le=0,J;for(;le<G&&U<w.byteLength;){J=w[U++];const re=J>128;if(re&&(J-=128),(J===0||le+J>G)&&o(3,"bad scanline data"),re){const ne=w[U++];for(let $=0;$<J;$++)K[le++]=ne}else K.set(w.subarray(U,U+J),le),le+=J,U+=J}const Z=R;for(let re=0;re<Z;re++){let ne=0;P[F]=K[re+ne],ne+=R,P[F+1]=K[re+ne],ne+=R,P[F+2]=K[re+ne],ne+=R,P[F+3]=K[re+ne],F+=4}Y--}return P},p=function(w,M,S,R){const P=w[M+3],F=Math.pow(2,P-128)/255;S[R+0]=w[M+0]*F,S[R+1]=w[M+1]*F,S[R+2]=w[M+2]*F,S[R+3]=1},v=function(w,M,S,R){const P=w[M+3],F=Math.pow(2,P-128)/255;S[R+0]=ur.toHalfFloat(Math.min(w[M+0]*F,65504)),S[R+1]=ur.toHalfFloat(Math.min(w[M+1]*F,65504)),S[R+2]=ur.toHalfFloat(Math.min(w[M+2]*F,65504)),S[R+3]=ur.toHalfFloat(1)},g=new Uint8Array(e);g.pos=0;const m=f(g),x=m.width,_=m.height,y=d(g.subarray(g.pos),x,_);let A,b,T;switch(this.type){case Wt:T=y.length/4;const w=new Float32Array(T*4);for(let S=0;S<T;S++)p(y,S*4,w,S*4);A=w,b=Wt;break;case mn:T=y.length/4;const M=new Uint16Array(T*4);for(let S=0;S<T;S++)v(y,S*4,M,S*4);A=M,b=mn;break;default:throw new Error("THREE.RGBELoader: Unsupported type: "+this.type)}return{width:x,height:_,data:A,header:m.string,gamma:m.gamma,exposure:m.exposure,type:b}}setDataType(e){return this.type=e,this}load(e,t,n,i){function r(o,a){switch(o.type){case Wt:case mn:"colorSpace"in o?o.colorSpace="srgb-linear":o.encoding=3e3,o.minFilter=Ut,o.magFilter=Ut,o.generateMipmaps=!1,o.flipY=!0;break}t&&t(o,a)}return super.load(e,r,n,i)}}const Ps=tc>=152;class J1 extends ph{constructor(e){super(e),this.type=mn}parse(e){const M=Math.pow(2.7182818,2.2);function S(C,D){for(var q=0,ce=0;ce<65536;++ce)(ce==0||C[ce>>3]&1<<(ce&7))&&(D[q++]=ce);for(var de=q-1;q<65536;)D[q++]=0;return de}function R(C){for(var D=0;D<16384;D++)C[D]={},C[D].len=0,C[D].lit=0,C[D].p=null}const P={l:0,c:0,lc:0};function F(C,D,q,ce,de){for(;q<C;)D=D<<8|Ce(ce,de),q+=8;q-=C,P.l=D>>q&(1<<C)-1,P.c=D,P.lc=q}const U=new Array(59);function G(C){for(var D=0;D<=58;++D)U[D]=0;for(var D=0;D<65537;++D)U[C[D]]+=1;for(var q=0,D=58;D>0;--D){var ce=q+U[D]>>1;U[D]=q,q=ce}for(var D=0;D<65537;++D){var de=C[D];de>0&&(C[D]=de|U[de]++<<6)}}function B(C,D,q,ce,de,E,k){for(var V=q,W=0,z=0;de<=E;de++){if(V.value-q.value>ce)return!1;F(6,W,z,C,V);var te=P.l;if(W=P.c,z=P.lc,k[de]=te,te==63){if(V.value-q.value>ce)throw"Something wrong with hufUnpackEncTable";F(8,W,z,C,V);var oe=P.l+6;if(W=P.c,z=P.lc,de+oe>E+1)throw"Something wrong with hufUnpackEncTable";for(;oe--;)k[de++]=0;de--}else if(te>=59){var oe=te-59+2;if(de+oe>E+1)throw"Something wrong with hufUnpackEncTable";for(;oe--;)k[de++]=0;de--}}G(k)}function K(C){return C&63}function Y(C){return C>>6}function le(C,D,q,ce){for(;D<=q;D++){var de=Y(C[D]),E=K(C[D]);if(de>>E)throw"Invalid table entry";if(E>14){var k=ce[de>>E-14];if(k.len)throw"Invalid table entry";if(k.lit++,k.p){var V=k.p;k.p=new Array(k.lit);for(var W=0;W<k.lit-1;++W)k.p[W]=V[W]}else k.p=new Array(1);k.p[k.lit-1]=D}else if(E)for(var z=0,W=1<<14-E;W>0;W--){var k=ce[(de<<14-E)+z];if(k.len||k.p)throw"Invalid table entry";k.len=E,k.lit=D,z++}}return!0}const J={c:0,lc:0};function Z(C,D,q,ce){C=C<<8|Ce(q,ce),D+=8,J.c=C,J.lc=D}const re={c:0,lc:0};function ne(C,D,q,ce,de,E,k,V,W,z){if(C==D){ce<8&&(Z(q,ce,de,k),q=J.c,ce=J.lc),ce-=8;var te=q>>ce,te=new Uint8Array([te])[0];if(W.value+te>z)return!1;for(var oe=V[W.value-1];te-- >0;)V[W.value++]=oe}else if(W.value<z)V[W.value++]=C;else return!1;re.c=q,re.lc=ce}function $(C){return C&65535}function se(C){var D=$(C);return D>32767?D-65536:D}const fe={a:0,b:0};function me(C,D){var q=se(C),ce=se(D),de=ce,E=q+(de&1)+(de>>1),k=E,V=E-de;fe.a=k,fe.b=V}function Te(C,D){var q=$(C),ce=$(D),de=q-(ce>>1)&65535,E=ce+de-32768&65535;fe.a=E,fe.b=de}function qe(C,D,q,ce,de,E,k){for(var V=k<16384,W=q>de?de:q,z=1,te;z<=W;)z<<=1;for(z>>=1,te=z,z>>=1;z>=1;){for(var oe=0,Ve=oe+E*(de-te),Me=E*z,Ue=E*te,ze=ce*z,De=ce*te,Ke,nt,lt,wt;oe<=Ve;oe+=Ue){for(var tt=oe,Ze=oe+ce*(q-te);tt<=Ze;tt+=De){var mt=tt+ze,st=tt+Me,zt=st+ze;V?(me(C[tt+D],C[st+D]),Ke=fe.a,lt=fe.b,me(C[mt+D],C[zt+D]),nt=fe.a,wt=fe.b,me(Ke,nt),C[tt+D]=fe.a,C[mt+D]=fe.b,me(lt,wt),C[st+D]=fe.a,C[zt+D]=fe.b):(Te(C[tt+D],C[st+D]),Ke=fe.a,lt=fe.b,Te(C[mt+D],C[zt+D]),nt=fe.a,wt=fe.b,Te(Ke,nt),C[tt+D]=fe.a,C[mt+D]=fe.b,Te(lt,wt),C[st+D]=fe.a,C[zt+D]=fe.b)}if(q&z){var st=tt+Me;V?me(C[tt+D],C[st+D]):Te(C[tt+D],C[st+D]),Ke=fe.a,C[st+D]=fe.b,C[tt+D]=Ke}}if(de&z)for(var tt=oe,Ze=oe+ce*(q-te);tt<=Ze;tt+=De){var mt=tt+ze;V?me(C[tt+D],C[mt+D]):Te(C[tt+D],C[mt+D]),Ke=fe.a,C[mt+D]=fe.b,C[tt+D]=Ke}te=z,z>>=1}return oe}function Fe(C,D,q,ce,de,E,k,V,W,z){for(var te=0,oe=0,Ve=V,Me=Math.trunc(de.value+(E+7)/8);de.value<Me;)for(Z(te,oe,q,de),te=J.c,oe=J.lc;oe>=14;){var Ue=te>>oe-14&16383,ze=D[Ue];if(ze.len)oe-=ze.len,ne(ze.lit,k,te,oe,q,ce,de,W,z,Ve),te=re.c,oe=re.lc;else{if(!ze.p)throw"hufDecode issues";var De;for(De=0;De<ze.lit;De++){for(var Ke=K(C[ze.p[De]]);oe<Ke&&de.value<Me;)Z(te,oe,q,de),te=J.c,oe=J.lc;if(oe>=Ke&&Y(C[ze.p[De]])==(te>>oe-Ke&(1<<Ke)-1)){oe-=Ke,ne(ze.p[De],k,te,oe,q,ce,de,W,z,Ve),te=re.c,oe=re.lc;break}}if(De==ze.lit)throw"hufDecode issues"}}var nt=8-E&7;for(te>>=nt,oe-=nt;oe>0;){var ze=D[te<<14-oe&16383];if(ze.len)oe-=ze.len,ne(ze.lit,k,te,oe,q,ce,de,W,z,Ve),te=re.c,oe=re.lc;else throw"hufDecode issues"}return!0}function Se(C,D,q,ce,de,E){var k={value:0},V=q.value,W=Xe(D,q),z=Xe(D,q);q.value+=4;var te=Xe(D,q);if(q.value+=4,W<0||W>=65537||z<0||z>=65537)throw"Something wrong with HUF_ENCSIZE";var oe=new Array(65537),Ve=new Array(16384);R(Ve);var Me=ce-(q.value-V);if(B(C,D,q,Me,W,z,oe),te>8*(ce-(q.value-V)))throw"Something wrong with hufUncompress";le(oe,W,z,Ve),Fe(oe,Ve,C,D,q,te,z,E,de,k)}function ue(C,D,q){for(var ce=0;ce<q;++ce)D[ce]=C[D[ce]]}function xe(C){for(var D=1;D<C.length;D++){var q=C[D-1]+C[D]-128;C[D]=q}}function N(C,D){for(var q=0,ce=Math.floor((C.length+1)/2),de=0,E=C.length-1;!(de>E||(D[de++]=C[q++],de>E));)D[de++]=C[ce++]}function Be(C){for(var D=C.byteLength,q=new Array,ce=0,de=new DataView(C);D>0;){var E=de.getInt8(ce++);if(E<0){var k=-E;D-=k+1;for(var V=0;V<k;V++)q.push(de.getUint8(ce++))}else{var k=E;D-=2;for(var W=de.getUint8(ce++),V=0;V<k+1;V++)q.push(W)}}return q}function ye(C,D,q,ce,de,E){var mt=new DataView(E.buffer),k=q[C.idx[0]].width,V=q[C.idx[0]].height,W=3,z=Math.floor(k/8),te=Math.ceil(k/8),oe=Math.ceil(V/8),Ve=k-(te-1)*8,Me=V-(oe-1)*8,Ue={value:0},ze=new Array(W),De=new Array(W),Ke=new Array(W),nt=new Array(W),lt=new Array(W);for(let yt=0;yt<W;++yt)lt[yt]=D[C.idx[yt]],ze[yt]=yt<1?0:ze[yt-1]+te*oe,De[yt]=new Float32Array(64),Ke[yt]=new Uint16Array(64),nt[yt]=new Uint16Array(te*64);for(let yt=0;yt<oe;++yt){var wt=8;yt==oe-1&&(wt=Me);var tt=8;for(let gt=0;gt<te;++gt){gt==te-1&&(tt=Ve);for(let vt=0;vt<W;++vt)Ke[vt].fill(0),Ke[vt][0]=de[ze[vt]++],Le(Ue,ce,Ke[vt]),Oe(Ke[vt],De[vt]),$e(De[vt]);Ne(De);for(let vt=0;vt<W;++vt)O(De[vt],nt[vt],gt*64)}let ut=0;for(let gt=0;gt<W;++gt){const vt=q[C.idx[gt]].type;for(let It=8*yt;It<8*yt+wt;++It){ut=lt[gt][It];for(let rn=0;rn<z;++rn){const Nt=rn*64+(It&7)*8;mt.setUint16(ut+0*2*vt,nt[gt][Nt+0],!0),mt.setUint16(ut+1*2*vt,nt[gt][Nt+1],!0),mt.setUint16(ut+2*2*vt,nt[gt][Nt+2],!0),mt.setUint16(ut+3*2*vt,nt[gt][Nt+3],!0),mt.setUint16(ut+4*2*vt,nt[gt][Nt+4],!0),mt.setUint16(ut+5*2*vt,nt[gt][Nt+5],!0),mt.setUint16(ut+6*2*vt,nt[gt][Nt+6],!0),mt.setUint16(ut+7*2*vt,nt[gt][Nt+7],!0),ut+=8*2*vt}}if(z!=te)for(let It=8*yt;It<8*yt+wt;++It){const rn=lt[gt][It]+8*z*2*vt,Nt=z*64+(It&7)*8;for(let Bn=0;Bn<tt;++Bn)mt.setUint16(rn+Bn*2*vt,nt[gt][Nt+Bn],!0)}}}for(var Ze=new Uint16Array(k),mt=new DataView(E.buffer),st=0;st<W;++st){q[C.idx[st]].decoded=!0;var zt=q[C.idx[st]].type;if(q[st].type==2)for(var Ln=0;Ln<V;++Ln){const yt=lt[st][Ln];for(var At=0;At<k;++At)Ze[At]=mt.getUint16(yt+At*2*zt,!0);for(var At=0;At<k;++At)mt.setFloat32(yt+At*2*zt,j(Ze[At]),!0)}}}function Le(C,D,q){for(var ce,de=1;de<64;)ce=D[C.value],ce==65280?de=64:ce>>8==255?de+=ce&255:(q[de]=ce,de++),C.value++}function Oe(C,D){D[0]=j(C[0]),D[1]=j(C[1]),D[2]=j(C[5]),D[3]=j(C[6]),D[4]=j(C[14]),D[5]=j(C[15]),D[6]=j(C[27]),D[7]=j(C[28]),D[8]=j(C[2]),D[9]=j(C[4]),D[10]=j(C[7]),D[11]=j(C[13]),D[12]=j(C[16]),D[13]=j(C[26]),D[14]=j(C[29]),D[15]=j(C[42]),D[16]=j(C[3]),D[17]=j(C[8]),D[18]=j(C[12]),D[19]=j(C[17]),D[20]=j(C[25]),D[21]=j(C[30]),D[22]=j(C[41]),D[23]=j(C[43]),D[24]=j(C[9]),D[25]=j(C[11]),D[26]=j(C[18]),D[27]=j(C[24]),D[28]=j(C[31]),D[29]=j(C[40]),D[30]=j(C[44]),D[31]=j(C[53]),D[32]=j(C[10]),D[33]=j(C[19]),D[34]=j(C[23]),D[35]=j(C[32]),D[36]=j(C[39]),D[37]=j(C[45]),D[38]=j(C[52]),D[39]=j(C[54]),D[40]=j(C[20]),D[41]=j(C[22]),D[42]=j(C[33]),D[43]=j(C[38]),D[44]=j(C[46]),D[45]=j(C[51]),D[46]=j(C[55]),D[47]=j(C[60]),D[48]=j(C[21]),D[49]=j(C[34]),D[50]=j(C[37]),D[51]=j(C[47]),D[52]=j(C[50]),D[53]=j(C[56]),D[54]=j(C[59]),D[55]=j(C[61]),D[56]=j(C[35]),D[57]=j(C[36]),D[58]=j(C[48]),D[59]=j(C[49]),D[60]=j(C[57]),D[61]=j(C[58]),D[62]=j(C[62]),D[63]=j(C[63])}function $e(C){const D=.5*Math.cos(.7853975),q=.5*Math.cos(3.14159/16),ce=.5*Math.cos(3.14159/8),de=.5*Math.cos(3*3.14159/16),E=.5*Math.cos(5*3.14159/16),k=.5*Math.cos(3*3.14159/8),V=.5*Math.cos(7*3.14159/16);for(var W=new Array(4),z=new Array(4),te=new Array(4),oe=new Array(4),Ve=0;Ve<8;++Ve){var Me=Ve*8;W[0]=ce*C[Me+2],W[1]=k*C[Me+2],W[2]=ce*C[Me+6],W[3]=k*C[Me+6],z[0]=q*C[Me+1]+de*C[Me+3]+E*C[Me+5]+V*C[Me+7],z[1]=de*C[Me+1]-V*C[Me+3]-q*C[Me+5]-E*C[Me+7],z[2]=E*C[Me+1]-q*C[Me+3]+V*C[Me+5]+de*C[Me+7],z[3]=V*C[Me+1]-E*C[Me+3]+de*C[Me+5]-q*C[Me+7],te[0]=D*(C[Me+0]+C[Me+4]),te[3]=D*(C[Me+0]-C[Me+4]),te[1]=W[0]+W[3],te[2]=W[1]-W[2],oe[0]=te[0]+te[1],oe[1]=te[3]+te[2],oe[2]=te[3]-te[2],oe[3]=te[0]-te[1],C[Me+0]=oe[0]+z[0],C[Me+1]=oe[1]+z[1],C[Me+2]=oe[2]+z[2],C[Me+3]=oe[3]+z[3],C[Me+4]=oe[3]-z[3],C[Me+5]=oe[2]-z[2],C[Me+6]=oe[1]-z[1],C[Me+7]=oe[0]-z[0]}for(var Ue=0;Ue<8;++Ue)W[0]=ce*C[16+Ue],W[1]=k*C[16+Ue],W[2]=ce*C[48+Ue],W[3]=k*C[48+Ue],z[0]=q*C[8+Ue]+de*C[24+Ue]+E*C[40+Ue]+V*C[56+Ue],z[1]=de*C[8+Ue]-V*C[24+Ue]-q*C[40+Ue]-E*C[56+Ue],z[2]=E*C[8+Ue]-q*C[24+Ue]+V*C[40+Ue]+de*C[56+Ue],z[3]=V*C[8+Ue]-E*C[24+Ue]+de*C[40+Ue]-q*C[56+Ue],te[0]=D*(C[Ue]+C[32+Ue]),te[3]=D*(C[Ue]-C[32+Ue]),te[1]=W[0]+W[3],te[2]=W[1]-W[2],oe[0]=te[0]+te[1],oe[1]=te[3]+te[2],oe[2]=te[3]-te[2],oe[3]=te[0]-te[1],C[0+Ue]=oe[0]+z[0],C[8+Ue]=oe[1]+z[1],C[16+Ue]=oe[2]+z[2],C[24+Ue]=oe[3]+z[3],C[32+Ue]=oe[3]-z[3],C[40+Ue]=oe[2]-z[2],C[48+Ue]=oe[1]-z[1],C[56+Ue]=oe[0]-z[0]}function Ne(C){for(var D=0;D<64;++D){var q=C[0][D],ce=C[1][D],de=C[2][D];C[0][D]=q+1.5747*de,C[1][D]=q-.1873*ce-.4682*de,C[2][D]=q+1.8556*ce}}function O(C,D,q){for(var ce=0;ce<64;++ce)D[q+ce]=ur.toHalfFloat(I(C[ce]))}function I(C){return C<=1?Math.sign(C)*Math.pow(Math.abs(C),2.2):Math.sign(C)*Math.pow(M,Math.abs(C)-1)}function Q(C){return new DataView(C.array.buffer,C.offset.value,C.size)}function he(C){var D=C.viewer.buffer.slice(C.offset.value,C.offset.value+C.size),q=new Uint8Array(Be(D)),ce=new Uint8Array(q.length);return xe(q),N(q,ce),new DataView(ce.buffer)}function ve(C){var D=C.array.slice(C.offset.value,C.offset.value+C.size),q=wa(D),ce=new Uint8Array(q.length);return xe(q),N(q,ce),new DataView(ce.buffer)}function ge(C){for(var D=C.viewer,q={value:C.offset.value},ce=new Uint16Array(C.width*C.scanlineBlockSize*(C.channels*C.type)),de=new Uint8Array(8192),E=0,k=new Array(C.channels),V=0;V<C.channels;V++)k[V]={},k[V].start=E,k[V].end=k[V].start,k[V].nx=C.width,k[V].ny=C.lines,k[V].size=C.type,E+=k[V].nx*k[V].ny*k[V].size;var W=ee(D,q),z=ee(D,q);if(z>=8192)throw"Something is wrong with PIZ_COMPRESSION BITMAP_SIZE";if(W<=z)for(var V=0;V<z-W+1;V++)de[V+W]=H(D,q);var te=new Uint16Array(65536),oe=S(de,te),Ve=Xe(D,q);Se(C.array,D,q,Ve,ce,E);for(var V=0;V<C.channels;++V)for(var Me=k[V],Ue=0;Ue<k[V].size;++Ue)qe(ce,Me.start+Ue,Me.nx,Me.size,Me.ny,Me.nx*Me.size,oe);ue(te,ce,E);for(var ze=0,De=new Uint8Array(ce.buffer.byteLength),Ke=0;Ke<C.lines;Ke++)for(var nt=0;nt<C.channels;nt++){var Me=k[nt],lt=Me.nx*Me.size,wt=new Uint8Array(ce.buffer,Me.end*2,lt*2);De.set(wt,ze),ze+=lt*2,Me.end+=lt}return new DataView(De.buffer)}function Ee(C){var D=C.array.slice(C.offset.value,C.offset.value+C.size),q=wa(D);const ce=C.lines*C.channels*C.width,de=C.type==1?new Uint16Array(ce):new Uint32Array(ce);let E=0,k=0;const V=new Array(4);for(let W=0;W<C.lines;W++)for(let z=0;z<C.channels;z++){let te=0;switch(C.type){case 1:V[0]=E,V[1]=V[0]+C.width,E=V[1]+C.width;for(let oe=0;oe<C.width;++oe){const Ve=q[V[0]++]<<8|q[V[1]++];te+=Ve,de[k]=te,k++}break;case 2:V[0]=E,V[1]=V[0]+C.width,V[2]=V[1]+C.width,E=V[2]+C.width;for(let oe=0;oe<C.width;++oe){const Ve=q[V[0]++]<<24|q[V[1]++]<<16|q[V[2]++]<<8;te+=Ve,de[k]=te,k++}break}}return new DataView(de.buffer)}function Re(C){var D=C.viewer,q={value:C.offset.value},ce=new Uint8Array(C.width*C.lines*(C.channels*C.type*2)),de={version:ae(D,q),unknownUncompressedSize:ae(D,q),unknownCompressedSize:ae(D,q),acCompressedSize:ae(D,q),dcCompressedSize:ae(D,q),rleCompressedSize:ae(D,q),rleUncompressedSize:ae(D,q),rleRawSize:ae(D,q),totalAcUncompressedCount:ae(D,q),totalDcUncompressedCount:ae(D,q),acCompression:ae(D,q)};if(de.version<2)throw"EXRLoader.parse: "+En.compression+" version "+de.version+" is unsupported";for(var E=new Array,k=ee(D,q)-2;k>0;){var V=Ie(D.buffer,q),W=H(D,q),z=W>>2&3,te=(W>>4)-1,oe=new Int8Array([te])[0],Ve=H(D,q);E.push({name:V,index:oe,type:Ve,compression:z}),k-=V.length+3}for(var Me=En.channels,Ue=new Array(C.channels),ze=0;ze<C.channels;++ze){var De=Ue[ze]={},Ke=Me[ze];De.name=Ke.name,De.compression=0,De.decoded=!1,De.type=Ke.pixelType,De.pLinear=Ke.pLinear,De.width=C.width,De.height=C.lines}for(var nt={idx:new Array(3)},lt=0;lt<C.channels;++lt)for(var De=Ue[lt],ze=0;ze<E.length;++ze){var wt=E[ze];De.name==wt.name&&(De.compression=wt.compression,wt.index>=0&&(nt.idx[wt.index]=lt),De.offset=lt)}if(de.acCompressedSize>0)switch(de.acCompression){case 0:var mt=new Uint16Array(de.totalAcUncompressedCount);Se(C.array,D,q,de.acCompressedSize,mt,de.totalAcUncompressedCount);break;case 1:var tt=C.array.slice(q.value,q.value+de.totalAcUncompressedCount),Ze=wa(tt),mt=new Uint16Array(Ze.buffer);q.value+=de.totalAcUncompressedCount;break}if(de.dcCompressedSize>0){var st={array:C.array,offset:q,size:de.dcCompressedSize},zt=new Uint16Array(ve(st).buffer);q.value+=de.dcCompressedSize}if(de.rleRawSize>0){var tt=C.array.slice(q.value,q.value+de.rleCompressedSize),Ze=wa(tt),Ln=Be(Ze.buffer);q.value+=de.rleCompressedSize}for(var At=0,yt=new Array(Ue.length),ze=0;ze<yt.length;++ze)yt[ze]=new Array;for(var ut=0;ut<C.lines;++ut)for(var gt=0;gt<Ue.length;++gt)yt[gt].push(At),At+=Ue[gt].width*C.type*2;ye(nt,yt,Ue,mt,zt,ce);for(var ze=0;ze<Ue.length;++ze){var De=Ue[ze];if(!De.decoded)switch(De.compression){case 2:for(var vt=0,It=0,ut=0;ut<C.lines;++ut){for(var rn=yt[ze][vt],Nt=0;Nt<De.width;++Nt){for(var Bn=0;Bn<2*De.type;++Bn)ce[rn++]=Ln[It+Bn*De.width*De.height];It++}vt++}break;case 1:default:throw"EXRLoader.parse: unsupported channel compression"}}return new DataView(ce.buffer)}function Ie(C,D){for(var q=new Uint8Array(C),ce=0;q[D.value+ce]!=0;)ce+=1;var de=new TextDecoder().decode(q.slice(D.value,D.value+ce));return D.value=D.value+ce+1,de}function Je(C,D,q){var ce=new TextDecoder().decode(new Uint8Array(C).slice(D.value,D.value+q));return D.value=D.value+q,ce}function be(C,D){var q=ke(C,D),ce=Xe(C,D);return[q,ce]}function Ge(C,D){var q=Xe(C,D),ce=Xe(C,D);return[q,ce]}function ke(C,D){var q=C.getInt32(D.value,!0);return D.value=D.value+4,q}function Xe(C,D){var q=C.getUint32(D.value,!0);return D.value=D.value+4,q}function Ce(C,D){var q=C[D.value];return D.value=D.value+1,q}function H(C,D){var q=C.getUint8(D.value);return D.value=D.value+1,q}const ae=function(C,D){let q;return"getBigInt64"in DataView.prototype?q=Number(C.getBigInt64(D.value,!0)):q=C.getUint32(D.value+4,!0)+Number(C.getUint32(D.value,!0)<<32),D.value+=8,q};function Ae(C,D){var q=C.getFloat32(D.value,!0);return D.value+=4,q}function X(C,D){return ur.toHalfFloat(Ae(C,D))}function j(C){var D=(C&31744)>>10,q=C&1023;return(C>>15?-1:1)*(D?D===31?q?NaN:1/0:Math.pow(2,D-15)*(1+q/1024):6103515625e-14*(q/1024))}function ee(C,D){var q=C.getUint16(D.value,!0);return D.value+=2,q}function _e(C,D){return j(ee(C,D))}function Pe(C,D,q,ce){for(var de=q.value,E=[];q.value<de+ce-1;){var k=Ie(D,q),V=ke(C,q),W=H(C,q);q.value+=3;var z=ke(C,q),te=ke(C,q);E.push({name:k,pixelType:V,pLinear:W,xSampling:z,ySampling:te})}return q.value+=1,E}function we(C,D){var q=Ae(C,D),ce=Ae(C,D),de=Ae(C,D),E=Ae(C,D),k=Ae(C,D),V=Ae(C,D),W=Ae(C,D),z=Ae(C,D);return{redX:q,redY:ce,greenX:de,greenY:E,blueX:k,blueY:V,whiteX:W,whiteY:z}}function Ye(C,D){var q=["NO_COMPRESSION","RLE_COMPRESSION","ZIPS_COMPRESSION","ZIP_COMPRESSION","PIZ_COMPRESSION","PXR24_COMPRESSION","B44_COMPRESSION","B44A_COMPRESSION","DWAA_COMPRESSION","DWAB_COMPRESSION"],ce=H(C,D);return q[ce]}function ot(C,D){var q=Xe(C,D),ce=Xe(C,D),de=Xe(C,D),E=Xe(C,D);return{xMin:q,yMin:ce,xMax:de,yMax:E}}function Qe(C,D){var q=["INCREASING_Y"],ce=H(C,D);return q[ce]}function et(C,D){var q=Ae(C,D),ce=Ae(C,D);return[q,ce]}function Mt(C,D){var q=Ae(C,D),ce=Ae(C,D),de=Ae(C,D);return[q,ce,de]}function bt(C,D,q,ce,de){if(ce==="string"||ce==="stringvector"||ce==="iccProfile")return Je(D,q,de);if(ce==="chlist")return Pe(C,D,q,de);if(ce==="chromaticities")return we(C,q);if(ce==="compression")return Ye(C,q);if(ce==="box2i")return ot(C,q);if(ce==="lineOrder")return Qe(C,q);if(ce==="float")return Ae(C,q);if(ce==="v2f")return et(C,q);if(ce==="v3f")return Mt(C,q);if(ce==="int")return ke(C,q);if(ce==="rational")return be(C,q);if(ce==="timecode")return Ge(C,q);if(ce==="preview")return q.value+=de,"skipped";q.value+=de}function Ot(C,D,q){const ce={};if(C.getUint32(0,!0)!=20000630)throw"THREE.EXRLoader: provided file doesn't appear to be in OpenEXR format.";ce.version=C.getUint8(4);const de=C.getUint8(5);ce.spec={singleTile:!!(de&2),longName:!!(de&4),deepFormat:!!(de&8),multiPart:!!(de&16)},q.value=8;for(var E=!0;E;){var k=Ie(D,q);if(k==0)E=!1;else{var V=Ie(D,q),W=Xe(C,q),z=bt(C,D,q,V,W);z===void 0||(ce[k]=z)}}if(de&-5)throw"THREE.EXRLoader: provided file is currently unsupported.";return ce}function Dn(C,D,q,ce,de){const E={size:0,viewer:D,array:q,offset:ce,width:C.dataWindow.xMax-C.dataWindow.xMin+1,height:C.dataWindow.yMax-C.dataWindow.yMin+1,channels:C.channels.length,bytesPerLine:null,lines:null,inputSize:null,type:C.channels[0].pixelType,uncompress:null,getter:null,format:null,[Ps?"colorSpace":"encoding"]:null};switch(C.compression){case"NO_COMPRESSION":E.lines=1,E.uncompress=Q;break;case"RLE_COMPRESSION":E.lines=1,E.uncompress=he;break;case"ZIPS_COMPRESSION":E.lines=1,E.uncompress=ve;break;case"ZIP_COMPRESSION":E.lines=16,E.uncompress=ve;break;case"PIZ_COMPRESSION":E.lines=32,E.uncompress=ge;break;case"PXR24_COMPRESSION":E.lines=16,E.uncompress=Ee;break;case"DWAA_COMPRESSION":E.lines=32,E.uncompress=Re;break;case"DWAB_COMPRESSION":E.lines=256,E.uncompress=Re;break;default:throw"EXRLoader.parse: "+C.compression+" is unsupported"}if(E.scanlineBlockSize=E.lines,E.type==1)switch(de){case Wt:E.getter=_e,E.inputSize=2;break;case mn:E.getter=ee,E.inputSize=2;break}else if(E.type==2)switch(de){case Wt:E.getter=Ae,E.inputSize=4;break;case mn:E.getter=X,E.inputSize=4}else throw"EXRLoader.parse: unsupported pixelType "+E.type+" for "+C.compression+".";E.blockCount=(C.dataWindow.yMax+1)/E.scanlineBlockSize;for(var k=0;k<E.blockCount;k++)ae(D,ce);E.outputChannels=E.channels==3?4:E.channels;const V=E.width*E.height*E.outputChannels;switch(de){case Wt:E.byteArray=new Float32Array(V),E.channels<E.outputChannels&&E.byteArray.fill(1,0,V);break;case mn:E.byteArray=new Uint16Array(V),E.channels<E.outputChannels&&E.byteArray.fill(15360,0,V);break;default:break}return E.bytesPerLine=E.width*E.inputSize*E.channels,E.outputChannels==4?E.format=en:E.format=mo,Ps?E.colorSpace="srgb-linear":E.encoding=3e3,E}const nn=new DataView(e),Zn=new Uint8Array(e),wn={value:0},En=Ot(nn,e,wn),at=Dn(En,nn,Zn,wn,this.type),_n={value:0},$n={R:0,G:1,B:2,A:3,Y:0};for(let C=0;C<at.height/at.scanlineBlockSize;C++){const D=Xe(nn,wn);at.size=Xe(nn,wn),at.lines=D+at.scanlineBlockSize>at.height?at.height-D:at.scanlineBlockSize;const ce=at.size<at.lines*at.bytesPerLine?at.uncompress(at):Q(at);wn.value+=at.size;for(let de=0;de<at.scanlineBlockSize;de++){const E=de+C*at.scanlineBlockSize;if(E>=at.height)break;for(let k=0;k<at.channels;k++){const V=$n[En.channels[k].name];for(let W=0;W<at.width;W++){_n.value=(de*(at.channels*at.width)+k*at.width+W)*at.inputSize;const z=(at.height-1-E)*(at.width*at.outputChannels)+W*at.outputChannels+V;at.byteArray[z]=at.getter(ce,_n)}}}}return{header:En,width:at.width,height:at.height,data:at.byteArray,format:at.format,[Ps?"colorSpace":"encoding"]:at[Ps?"colorSpace":"encoding"],type:this.type}}setDataType(e){return this.type=e,this}load(e,t,n,i){function r(o,a){Ps?o.colorSpace=a.colorSpace:o.encoding=a.encoding,o.minFilter=Ut,o.magFilter=Ut,o.generateMipmaps=!1,o.flipY=!1,t&&t(o,a)}return super.load(e,r,n,i)}}const Id=new Xt,Ta=new L;class Ah extends ec{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new je(e,3)),this.setAttribute("uv",new je(t,2))}applyMatrix4(e){const t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const n=new Sl(t,6,1);return this.setAttribute("instanceStart",new Rn(n,3,0)),this.setAttribute("instanceEnd",new Rn(n,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let n;e instanceof Float32Array?n=e:Array.isArray(e)&&(n=new Float32Array(e));const i=new Sl(n,t*2,1);return this.setAttribute("instanceColorStart",new Rn(i,t,0)),this.setAttribute("instanceColorEnd",new Rn(i,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new ah(e.geometry)),this}fromLineSegments(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Xt);const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),Id.setFromBufferAttribute(t),this.boundingBox.union(Id))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new qt),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){const n=this.boundingSphere.center;this.boundingBox.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)Ta.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Ta)),Ta.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Ta));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)}}toJSON(){}applyMatrix(e){return this.applyMatrix4(e)}}class mg extends Ah{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){const t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setPositions(n),this}setColors(e,t=3){const n=e.length-t,i=new Float32Array(2*n);if(t===3)for(let r=0;r<n;r+=t)i[2*r]=e[r],i[2*r+1]=e[r+1],i[2*r+2]=e[r+2],i[2*r+3]=e[r+3],i[2*r+4]=e[r+4],i[2*r+5]=e[r+5];else for(let r=0;r<n;r+=t)i[2*r]=e[r],i[2*r+1]=e[r+1],i[2*r+2]=e[r+2],i[2*r+3]=e[r+3],i[2*r+4]=e[r+4],i[2*r+5]=e[r+5],i[2*r+6]=e[r+6],i[2*r+7]=e[r+7];return super.setColors(i,t),this}fromLine(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class Ch extends cn{constructor(e){super({type:"LineMaterial",uniforms:to.clone(to.merge([He.common,He.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new pe(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${tc>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(t){this.uniforms.diffuse.value=t}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(t){t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(t){this.uniforms.linewidth.value=t}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(t){!!t!="USE_DASH"in this.defines&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(t){this.uniforms.dashScale.value=t}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(t){this.uniforms.dashSize.value=t}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(t){this.uniforms.dashOffset.value=t}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(t){this.uniforms.gapSize.value=t}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(t){this.uniforms.opacity.value=t}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(t){this.uniforms.resolution.value.copy(t)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(t){!!t!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),t===!0?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}const nu=new dt,Pd=new L,Ud=new L,jt=new dt,Jt=new dt,jn=new dt,iu=new L,ru=new rt,Qt=new Wm,Dd=new L,Aa=new Xt,Ca=new qt,Jn=new dt;let Kn,vr;function Ld(s,e,t){return Jn.set(0,0,-e,1).applyMatrix4(s.projectionMatrix),Jn.multiplyScalar(1/Jn.w),Jn.x=vr/t.width,Jn.y=vr/t.height,Jn.applyMatrix4(s.projectionMatrixInverse),Jn.multiplyScalar(1/Jn.w),Math.abs(Math.max(Jn.x,Jn.y))}function K1(s,e){const t=s.matrixWorld,n=s.geometry,i=n.attributes.instanceStart,r=n.attributes.instanceEnd,o=Math.min(n.instanceCount,i.count);for(let a=0,l=o;a<l;a++){Qt.start.fromBufferAttribute(i,a),Qt.end.fromBufferAttribute(r,a),Qt.applyMatrix4(t);const c=new L,u=new L;Kn.distanceSqToSegment(Qt.start,Qt.end,u,c),u.distanceTo(c)<vr*.5&&e.push({point:u,pointOnLine:c,distance:Kn.origin.distanceTo(u),object:s,face:null,faceIndex:a,uv:null,[lg]:null})}}function Q1(s,e,t){const n=e.projectionMatrix,r=s.material.resolution,o=s.matrixWorld,a=s.geometry,l=a.attributes.instanceStart,c=a.attributes.instanceEnd,u=Math.min(a.instanceCount,l.count),h=-e.near;Kn.at(1,jn),jn.w=1,jn.applyMatrix4(e.matrixWorldInverse),jn.applyMatrix4(n),jn.multiplyScalar(1/jn.w),jn.x*=r.x/2,jn.y*=r.y/2,jn.z=0,iu.copy(jn),ru.multiplyMatrices(e.matrixWorldInverse,o);for(let f=0,d=u;f<d;f++){if(jt.fromBufferAttribute(l,f),Jt.fromBufferAttribute(c,f),jt.w=1,Jt.w=1,jt.applyMatrix4(ru),Jt.applyMatrix4(ru),jt.z>h&&Jt.z>h)continue;if(jt.z>h){const _=jt.z-Jt.z,y=(jt.z-h)/_;jt.lerp(Jt,y)}else if(Jt.z>h){const _=Jt.z-jt.z,y=(Jt.z-h)/_;Jt.lerp(jt,y)}jt.applyMatrix4(n),Jt.applyMatrix4(n),jt.multiplyScalar(1/jt.w),Jt.multiplyScalar(1/Jt.w),jt.x*=r.x/2,jt.y*=r.y/2,Jt.x*=r.x/2,Jt.y*=r.y/2,Qt.start.copy(jt),Qt.start.z=0,Qt.end.copy(Jt),Qt.end.z=0;const v=Qt.closestPointToPointParameter(iu,!0);Qt.at(v,Dd);const g=Xu.lerp(jt.z,Jt.z,v),m=g>=-1&&g<=1,x=iu.distanceTo(Dd)<vr*.5;if(m&&x){Qt.start.fromBufferAttribute(l,f),Qt.end.fromBufferAttribute(c,f),Qt.start.applyMatrix4(o),Qt.end.applyMatrix4(o);const _=new L,y=new L;Kn.distanceSqToSegment(Qt.start,Qt.end,y,_),t.push({point:y,pointOnLine:_,distance:Kn.origin.distanceTo(y),object:s,face:null,faceIndex:f,uv:null,[lg]:null})}}}class gg extends Rt{constructor(e=new Ah,t=new Ch({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,i=new Float32Array(2*t.count);for(let o=0,a=0,l=t.count;o<l;o++,a+=2)Pd.fromBufferAttribute(t,o),Ud.fromBufferAttribute(n,o),i[a]=a===0?0:i[a-1],i[a+1]=i[a]+Pd.distanceTo(Ud);const r=new Sl(i,2,1);return e.setAttribute("instanceDistanceStart",new Rn(r,1,0)),e.setAttribute("instanceDistanceEnd",new Rn(r,1,1)),this}raycast(e,t){const n=this.material.worldUnits,i=e.camera,r=e.params.Line2!==void 0&&e.params.Line2.threshold||0;Kn=e.ray;const o=this.matrixWorld,a=this.geometry,l=this.material;vr=l.linewidth+r,a.boundingSphere===null&&a.computeBoundingSphere(),Ca.copy(a.boundingSphere).applyMatrix4(o);let c;if(n)c=vr*.5;else{const h=Math.max(i.near,Ca.distanceToPoint(Kn.origin));c=Ld(i,h,l.resolution)}if(Ca.radius+=c,Kn.intersectsSphere(Ca)===!1)return;a.boundingBox===null&&a.computeBoundingBox(),Aa.copy(a.boundingBox).applyMatrix4(o);let u;if(n)u=vr*.5;else{const h=Math.max(i.near,Aa.distanceToPoint(Kn.origin));u=Ld(i,h,l.resolution)}Aa.expandByScalar(u),Kn.intersectsBox(Aa)!==!1&&(n?K1(this,t):Q1(this,i,t))}onBeforeRender(e){const t=this.material.uniforms;t&&t.resolution&&(e.getViewport(nu),this.material.uniforms.resolution.value.set(nu.z,nu.w))}}class ew extends gg{constructor(e=new mg,t=new Ch({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type="Line2"}}const hE=ie.forwardRef(function({points:e,color:t=16777215,vertexColors:n,linewidth:i,lineWidth:r,segments:o,dashed:a,...l},c){var u,h;const f=Ht(m=>m.size),d=ie.useMemo(()=>o?new gg:new ew,[o]),[p]=ie.useState(()=>new Ch),v=(n==null||(u=n[0])==null?void 0:u.length)===4?4:3,g=ie.useMemo(()=>{const m=o?new Ah:new mg,x=e.map(_=>{const y=Array.isArray(_);return _ instanceof L||_ instanceof dt?[_.x,_.y,_.z]:_ instanceof pe?[_.x,_.y,0]:y&&_.length===3?[_[0],_[1],_[2]]:y&&_.length===2?[_[0],_[1],0]:_});if(m.setPositions(x.flat()),n){t=16777215;const _=n.map(y=>y instanceof We?y.toArray():y);m.setColors(_.flat(),v)}return m},[e,o,n,v]);return ie.useLayoutEffect(()=>{d.computeLineDistances()},[e,d]),ie.useLayoutEffect(()=>{a?p.defines.USE_DASH="":delete p.defines.USE_DASH,p.needsUpdate=!0},[a,p]),ie.useEffect(()=>()=>{g.dispose(),p.dispose()},[g]),ie.createElement("primitive",Si({object:d,ref:c},l),ie.createElement("primitive",{object:g,attach:"geometry"}),ie.createElement("primitive",Si({object:p,attach:"material",color:t,vertexColors:!!n,resolution:[f.width,f.height],linewidth:(h=i??r)!==null&&h!==void 0?h:1,dashed:a,transparent:v===4},l)))}),vg=/\bvoid\s+main\s*\(\s*\)\s*{/g;function Au(s){const e=/^[ \t]*#include +<([\w\d./]+)>/gm;function t(n,i){let r=ht[i];return r?Au(r):n}return s.replace(e,t)}const Kt=[];for(let s=0;s<256;s++)Kt[s]=(s<16?"0":"")+s.toString(16);function tw(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Kt[s&255]+Kt[s>>8&255]+Kt[s>>16&255]+Kt[s>>24&255]+"-"+Kt[e&255]+Kt[e>>8&255]+"-"+Kt[e>>16&15|64]+Kt[e>>24&255]+"-"+Kt[t&63|128]+Kt[t>>8&255]+"-"+Kt[t>>16&255]+Kt[t>>24&255]+Kt[n&255]+Kt[n>>8&255]+Kt[n>>16&255]+Kt[n>>24&255]).toUpperCase()}const nr=Object.assign||function(){let s=arguments[0];for(let e=1,t=arguments.length;e<t;e++){let n=arguments[e];if(n)for(let i in n)Object.prototype.hasOwnProperty.call(n,i)&&(s[i]=n[i])}return s},nw=Date.now(),Fd=new WeakMap,Od=new Map;let iw=1e10;function Cu(s,e){const t=aw(e);let n=Fd.get(s);if(n||Fd.set(s,n=Object.create(null)),n[t])return new n[t];const i=`_onBeforeCompile${t}`,r=function(c,u){s.onBeforeCompile.call(this,c,u);const h=this.customProgramCacheKey()+"|"+c.vertexShader+"|"+c.fragmentShader;let f=Od[h];if(!f){const d=rw(this,c,e,t);f=Od[h]=d}c.vertexShader=f.vertexShader,c.fragmentShader=f.fragmentShader,nr(c.uniforms,this.uniforms),e.timeUniform&&(c.uniforms[e.timeUniform]={get value(){return Date.now()-nw}}),this[i]&&this[i](c)},o=function(){return a(e.chained?s:s.clone())},a=function(c){const u=Object.create(c,l);return Object.defineProperty(u,"baseMaterial",{value:s}),Object.defineProperty(u,"id",{value:iw++}),u.uuid=tw(),u.uniforms=nr({},c.uniforms,e.uniforms),u.defines=nr({},c.defines,e.defines),u.defines[`TROIKA_DERIVED_MATERIAL_${t}`]="",u.extensions=nr({},c.extensions,e.extensions),u._listeners=void 0,u},l={constructor:{value:o},isDerivedMaterial:{value:!0},type:{get:()=>s.type,set:c=>{s.type=c}},isDerivedFrom:{writable:!0,configurable:!0,value:function(c){const u=this.baseMaterial;return c===u||u.isDerivedMaterial&&u.isDerivedFrom(c)||!1}},customProgramCacheKey:{writable:!0,configurable:!0,value:function(){return s.customProgramCacheKey()+"|"+t}},onBeforeCompile:{get(){return r},set(c){this[i]=c}},copy:{writable:!0,configurable:!0,value:function(c){return s.copy.call(this,c),!s.isShaderMaterial&&!s.isDerivedMaterial&&(nr(this.extensions,c.extensions),nr(this.defines,c.defines),nr(this.uniforms,to.clone(c.uniforms))),this}},clone:{writable:!0,configurable:!0,value:function(){const c=new s.constructor;return a(c).copy(this)}},getDepthMaterial:{writable:!0,configurable:!0,value:function(){let c=this._depthMaterial;return c||(c=this._depthMaterial=Cu(s.isDerivedMaterial?s.getDepthMaterial():new So({depthPacking:Vu}),e),c.defines.IS_DEPTH_MATERIAL="",c.uniforms=this.uniforms),c}},getDistanceMaterial:{writable:!0,configurable:!0,value:function(){let c=this._distanceMaterial;return c||(c=this._distanceMaterial=Cu(s.isDerivedMaterial?s.getDistanceMaterial():new Dl,e),c.defines.IS_DISTANCE_MATERIAL="",c.uniforms=this.uniforms),c}},dispose:{writable:!0,configurable:!0,value(){const{_depthMaterial:c,_distanceMaterial:u}=this;c&&c.dispose(),u&&u.dispose(),s.dispose.call(this)}}};return n[t]=o,new o}function rw(s,{vertexShader:e,fragmentShader:t},n,i){let{vertexDefs:r,vertexMainIntro:o,vertexMainOutro:a,vertexTransform:l,fragmentDefs:c,fragmentMainIntro:u,fragmentMainOutro:h,fragmentColorTransform:f,customRewriter:d,timeUniform:p}=n;if(r=r||"",o=o||"",a=a||"",c=c||"",u=u||"",h=h||"",(l||d)&&(e=Au(e)),(f||d)&&(t=t.replace(/^[ \t]*#include <((?:tonemapping|encodings|colorspace|fog|premultiplied_alpha|dithering)_fragment)>/gm,`
//!BEGIN_POST_CHUNK $1
$&
//!END_POST_CHUNK
`),t=Au(t)),d){let v=d({vertexShader:e,fragmentShader:t});e=v.vertexShader,t=v.fragmentShader}if(f){let v=[];t=t.replace(/^\/\/!BEGIN_POST_CHUNK[^]+?^\/\/!END_POST_CHUNK/gm,g=>(v.push(g),"")),h=`${f}
${v.join(`
`)}
${h}`}if(p){const v=`
uniform float ${p};
`;r=v+r,c=v+c}return l&&(e=`vec3 troika_position_${i};
vec3 troika_normal_${i};
vec2 troika_uv_${i};
${e}
`,r=`${r}
void troikaVertexTransform${i}(inout vec3 position, inout vec3 normal, inout vec2 uv) {
  ${l}
}
`,o=`
troika_position_${i} = vec3(position);
troika_normal_${i} = vec3(normal);
troika_uv_${i} = vec2(uv);
troikaVertexTransform${i}(troika_position_${i}, troika_normal_${i}, troika_uv_${i});
${o}
`,e=e.replace(/\b(position|normal|uv)\b/g,(v,g,m,x)=>/\battribute\s+vec[23]\s+$/.test(x.substr(0,m))?g:`troika_${g}_${i}`),s.map&&s.map.channel>0||(e=e.replace(/\bMAP_UV\b/g,`troika_uv_${i}`))),e=Nd(e,i,r,o,a),t=Nd(t,i,c,u,h),{vertexShader:e,fragmentShader:t}}function Nd(s,e,t,n,i){return(n||i||t)&&(s=s.replace(vg,`
${t}
void troikaOrigMain${e}() {`),s+=`
void main() {
  ${n}
  troikaOrigMain${e}();
  ${i}
}`),s}function sw(s,e){return s==="uniforms"?void 0:typeof e=="function"?e.toString():e}let ow=0;const Bd=new Map;function aw(s){const e=JSON.stringify(s,sw);let t=Bd.get(e);return t==null&&Bd.set(e,t=++ow),t}/*!
Custom build of Typr.ts (https://github.com/fredli74/Typr.ts) for use in Troika text rendering.
Original MIT license applies: https://github.com/fredli74/Typr.ts/blob/master/LICENSE
*/function lw(){return typeof window>"u"&&(self.window=self),function(s){var e={parse:function(i){var r=e._bin,o=new Uint8Array(i);if(r.readASCII(o,0,4)=="ttcf"){var a=4;r.readUshort(o,a),a+=2,r.readUshort(o,a),a+=2;var l=r.readUint(o,a);a+=4;for(var c=[],u=0;u<l;u++){var h=r.readUint(o,a);a+=4,c.push(e._readFont(o,h))}return c}return[e._readFont(o,0)]},_readFont:function(i,r){var o=e._bin,a=r;o.readFixed(i,r),r+=4;var l=o.readUshort(i,r);r+=2,o.readUshort(i,r),r+=2,o.readUshort(i,r),r+=2,o.readUshort(i,r),r+=2;for(var c=["cmap","head","hhea","maxp","hmtx","name","OS/2","post","loca","glyf","kern","CFF ","GDEF","GPOS","GSUB","SVG "],u={_data:i,_offset:a},h={},f=0;f<l;f++){var d=o.readASCII(i,r,4);r+=4,o.readUint(i,r),r+=4;var p=o.readUint(i,r);r+=4;var v=o.readUint(i,r);r+=4,h[d]={offset:p,length:v}}for(f=0;f<c.length;f++){var g=c[f];h[g]&&(u[g.trim()]=e[g.trim()].parse(i,h[g].offset,h[g].length,u))}return u},_tabOffset:function(i,r,o){for(var a=e._bin,l=a.readUshort(i,o+4),c=o+12,u=0;u<l;u++){var h=a.readASCII(i,c,4);c+=4,a.readUint(i,c),c+=4;var f=a.readUint(i,c);if(c+=4,a.readUint(i,c),c+=4,h==r)return f}return 0}};e._bin={readFixed:function(i,r){return(i[r]<<8|i[r+1])+(i[r+2]<<8|i[r+3])/65540},readF2dot14:function(i,r){return e._bin.readShort(i,r)/16384},readInt:function(i,r){return e._bin._view(i).getInt32(r)},readInt8:function(i,r){return e._bin._view(i).getInt8(r)},readShort:function(i,r){return e._bin._view(i).getInt16(r)},readUshort:function(i,r){return e._bin._view(i).getUint16(r)},readUshorts:function(i,r,o){for(var a=[],l=0;l<o;l++)a.push(e._bin.readUshort(i,r+2*l));return a},readUint:function(i,r){return e._bin._view(i).getUint32(r)},readUint64:function(i,r){return 4294967296*e._bin.readUint(i,r)+e._bin.readUint(i,r+4)},readASCII:function(i,r,o){for(var a="",l=0;l<o;l++)a+=String.fromCharCode(i[r+l]);return a},readUnicode:function(i,r,o){for(var a="",l=0;l<o;l++){var c=i[r++]<<8|i[r++];a+=String.fromCharCode(c)}return a},_tdec:typeof window<"u"&&window.TextDecoder?new window.TextDecoder:null,readUTF8:function(i,r,o){var a=e._bin._tdec;return a&&r==0&&o==i.length?a.decode(i):e._bin.readASCII(i,r,o)},readBytes:function(i,r,o){for(var a=[],l=0;l<o;l++)a.push(i[r+l]);return a},readASCIIArray:function(i,r,o){for(var a=[],l=0;l<o;l++)a.push(String.fromCharCode(i[r+l]));return a},_view:function(i){return i._dataView||(i._dataView=i.buffer?new DataView(i.buffer,i.byteOffset,i.byteLength):new DataView(new Uint8Array(i).buffer))}},e._lctf={},e._lctf.parse=function(i,r,o,a,l){var c=e._bin,u={},h=r;c.readFixed(i,r),r+=4;var f=c.readUshort(i,r);r+=2;var d=c.readUshort(i,r);r+=2;var p=c.readUshort(i,r);return r+=2,u.scriptList=e._lctf.readScriptList(i,h+f),u.featureList=e._lctf.readFeatureList(i,h+d),u.lookupList=e._lctf.readLookupList(i,h+p,l),u},e._lctf.readLookupList=function(i,r,o){var a=e._bin,l=r,c=[],u=a.readUshort(i,r);r+=2;for(var h=0;h<u;h++){var f=a.readUshort(i,r);r+=2;var d=e._lctf.readLookupTable(i,l+f,o);c.push(d)}return c},e._lctf.readLookupTable=function(i,r,o){var a=e._bin,l=r,c={tabs:[]};c.ltype=a.readUshort(i,r),r+=2,c.flag=a.readUshort(i,r),r+=2;var u=a.readUshort(i,r);r+=2;for(var h=c.ltype,f=0;f<u;f++){var d=a.readUshort(i,r);r+=2;var p=o(i,h,l+d,c);c.tabs.push(p)}return c},e._lctf.numOfOnes=function(i){for(var r=0,o=0;o<32;o++)i>>>o&1&&r++;return r},e._lctf.readClassDef=function(i,r){var o=e._bin,a=[],l=o.readUshort(i,r);if(r+=2,l==1){var c=o.readUshort(i,r);r+=2;var u=o.readUshort(i,r);r+=2;for(var h=0;h<u;h++)a.push(c+h),a.push(c+h),a.push(o.readUshort(i,r)),r+=2}if(l==2){var f=o.readUshort(i,r);for(r+=2,h=0;h<f;h++)a.push(o.readUshort(i,r)),r+=2,a.push(o.readUshort(i,r)),r+=2,a.push(o.readUshort(i,r)),r+=2}return a},e._lctf.getInterval=function(i,r){for(var o=0;o<i.length;o+=3){var a=i[o],l=i[o+1];if(i[o+2],a<=r&&r<=l)return o}return-1},e._lctf.readCoverage=function(i,r){var o=e._bin,a={};a.fmt=o.readUshort(i,r),r+=2;var l=o.readUshort(i,r);return r+=2,a.fmt==1&&(a.tab=o.readUshorts(i,r,l)),a.fmt==2&&(a.tab=o.readUshorts(i,r,3*l)),a},e._lctf.coverageIndex=function(i,r){var o=i.tab;if(i.fmt==1)return o.indexOf(r);if(i.fmt==2){var a=e._lctf.getInterval(o,r);if(a!=-1)return o[a+2]+(r-o[a])}return-1},e._lctf.readFeatureList=function(i,r){var o=e._bin,a=r,l=[],c=o.readUshort(i,r);r+=2;for(var u=0;u<c;u++){var h=o.readASCII(i,r,4);r+=4;var f=o.readUshort(i,r);r+=2;var d=e._lctf.readFeatureTable(i,a+f);d.tag=h.trim(),l.push(d)}return l},e._lctf.readFeatureTable=function(i,r){var o=e._bin,a=r,l={},c=o.readUshort(i,r);r+=2,c>0&&(l.featureParams=a+c);var u=o.readUshort(i,r);r+=2,l.tab=[];for(var h=0;h<u;h++)l.tab.push(o.readUshort(i,r+2*h));return l},e._lctf.readScriptList=function(i,r){var o=e._bin,a=r,l={},c=o.readUshort(i,r);r+=2;for(var u=0;u<c;u++){var h=o.readASCII(i,r,4);r+=4;var f=o.readUshort(i,r);r+=2,l[h.trim()]=e._lctf.readScriptTable(i,a+f)}return l},e._lctf.readScriptTable=function(i,r){var o=e._bin,a=r,l={},c=o.readUshort(i,r);r+=2,c>0&&(l.default=e._lctf.readLangSysTable(i,a+c));var u=o.readUshort(i,r);r+=2;for(var h=0;h<u;h++){var f=o.readASCII(i,r,4);r+=4;var d=o.readUshort(i,r);r+=2,l[f.trim()]=e._lctf.readLangSysTable(i,a+d)}return l},e._lctf.readLangSysTable=function(i,r){var o=e._bin,a={};o.readUshort(i,r),r+=2,a.reqFeature=o.readUshort(i,r),r+=2;var l=o.readUshort(i,r);return r+=2,a.features=o.readUshorts(i,r,l),a},e.CFF={},e.CFF.parse=function(i,r,o){var a=e._bin;(i=new Uint8Array(i.buffer,r,o))[r=0],i[++r],i[++r],i[++r],r++;var l=[];r=e.CFF.readIndex(i,r,l);for(var c=[],u=0;u<l.length-1;u++)c.push(a.readASCII(i,r+l[u],l[u+1]-l[u]));r+=l[l.length-1];var h=[];r=e.CFF.readIndex(i,r,h);var f=[];for(u=0;u<h.length-1;u++)f.push(e.CFF.readDict(i,r+h[u],r+h[u+1]));r+=h[h.length-1];var d=f[0],p=[];r=e.CFF.readIndex(i,r,p);var v=[];for(u=0;u<p.length-1;u++)v.push(a.readASCII(i,r+p[u],p[u+1]-p[u]));if(r+=p[p.length-1],e.CFF.readSubrs(i,r,d),d.CharStrings){r=d.CharStrings,p=[],r=e.CFF.readIndex(i,r,p);var g=[];for(u=0;u<p.length-1;u++)g.push(a.readBytes(i,r+p[u],p[u+1]-p[u]));d.CharStrings=g}if(d.ROS){r=d.FDArray;var m=[];for(r=e.CFF.readIndex(i,r,m),d.FDArray=[],u=0;u<m.length-1;u++){var x=e.CFF.readDict(i,r+m[u],r+m[u+1]);e.CFF._readFDict(i,x,v),d.FDArray.push(x)}r+=m[m.length-1],r=d.FDSelect,d.FDSelect=[];var _=i[r];if(r++,_!=3)throw _;var y=a.readUshort(i,r);for(r+=2,u=0;u<y+1;u++)d.FDSelect.push(a.readUshort(i,r),i[r+2]),r+=3}return d.Encoding&&(d.Encoding=e.CFF.readEncoding(i,d.Encoding,d.CharStrings.length)),d.charset&&(d.charset=e.CFF.readCharset(i,d.charset,d.CharStrings.length)),e.CFF._readFDict(i,d,v),d},e.CFF._readFDict=function(i,r,o){var a;for(var l in r.Private&&(a=r.Private[1],r.Private=e.CFF.readDict(i,a,a+r.Private[0]),r.Private.Subrs&&e.CFF.readSubrs(i,a+r.Private.Subrs,r.Private)),r)["FamilyName","FontName","FullName","Notice","version","Copyright"].indexOf(l)!=-1&&(r[l]=o[r[l]-426+35])},e.CFF.readSubrs=function(i,r,o){var a=e._bin,l=[];r=e.CFF.readIndex(i,r,l);var c,u=l.length;c=u<1240?107:u<33900?1131:32768,o.Bias=c,o.Subrs=[];for(var h=0;h<l.length-1;h++)o.Subrs.push(a.readBytes(i,r+l[h],l[h+1]-l[h]))},e.CFF.tableSE=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,0,111,112,113,114,0,115,116,117,118,119,120,121,122,0,123,0,124,125,126,127,128,129,130,131,0,132,133,0,134,135,136,137,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,138,0,139,0,0,0,0,140,141,142,143,0,0,0,0,0,144,0,0,0,145,0,0,146,147,148,149,0,0,0,0],e.CFF.glyphByUnicode=function(i,r){for(var o=0;o<i.charset.length;o++)if(i.charset[o]==r)return o;return-1},e.CFF.glyphBySE=function(i,r){return r<0||r>255?-1:e.CFF.glyphByUnicode(i,e.CFF.tableSE[r])},e.CFF.readEncoding=function(i,r,o){e._bin;var a=[".notdef"],l=i[r];if(r++,l!=0)throw"error: unknown encoding format: "+l;var c=i[r];r++;for(var u=0;u<c;u++)a.push(i[r+u]);return a},e.CFF.readCharset=function(i,r,o){var a=e._bin,l=[".notdef"],c=i[r];if(r++,c==0)for(var u=0;u<o;u++){var h=a.readUshort(i,r);r+=2,l.push(h)}else{if(c!=1&&c!=2)throw"error: format: "+c;for(;l.length<o;){h=a.readUshort(i,r),r+=2;var f=0;for(c==1?(f=i[r],r++):(f=a.readUshort(i,r),r+=2),u=0;u<=f;u++)l.push(h),h++}}return l},e.CFF.readIndex=function(i,r,o){var a=e._bin,l=a.readUshort(i,r)+1,c=i[r+=2];if(r++,c==1)for(var u=0;u<l;u++)o.push(i[r+u]);else if(c==2)for(u=0;u<l;u++)o.push(a.readUshort(i,r+2*u));else if(c==3)for(u=0;u<l;u++)o.push(16777215&a.readUint(i,r+3*u-1));else if(l!=1)throw"unsupported offset size: "+c+", count: "+l;return(r+=l*c)-1},e.CFF.getCharString=function(i,r,o){var a=e._bin,l=i[r],c=i[r+1];i[r+2],i[r+3],i[r+4];var u=1,h=null,f=null;l<=20&&(h=l,u=1),l==12&&(h=100*l+c,u=2),21<=l&&l<=27&&(h=l,u=1),l==28&&(f=a.readShort(i,r+1),u=3),29<=l&&l<=31&&(h=l,u=1),32<=l&&l<=246&&(f=l-139,u=1),247<=l&&l<=250&&(f=256*(l-247)+c+108,u=2),251<=l&&l<=254&&(f=256*-(l-251)-c-108,u=2),l==255&&(f=a.readInt(i,r+1)/65535,u=5),o.val=f??"o"+h,o.size=u},e.CFF.readCharString=function(i,r,o){for(var a=r+o,l=e._bin,c=[];r<a;){var u=i[r],h=i[r+1];i[r+2],i[r+3],i[r+4];var f=1,d=null,p=null;u<=20&&(d=u,f=1),u==12&&(d=100*u+h,f=2),u!=19&&u!=20||(d=u,f=2),21<=u&&u<=27&&(d=u,f=1),u==28&&(p=l.readShort(i,r+1),f=3),29<=u&&u<=31&&(d=u,f=1),32<=u&&u<=246&&(p=u-139,f=1),247<=u&&u<=250&&(p=256*(u-247)+h+108,f=2),251<=u&&u<=254&&(p=256*-(u-251)-h-108,f=2),u==255&&(p=l.readInt(i,r+1)/65535,f=5),c.push(p??"o"+d),r+=f}return c},e.CFF.readDict=function(i,r,o){for(var a=e._bin,l={},c=[];r<o;){var u=i[r],h=i[r+1];i[r+2],i[r+3],i[r+4];var f=1,d=null,p=null;if(u==28&&(p=a.readShort(i,r+1),f=3),u==29&&(p=a.readInt(i,r+1),f=5),32<=u&&u<=246&&(p=u-139,f=1),247<=u&&u<=250&&(p=256*(u-247)+h+108,f=2),251<=u&&u<=254&&(p=256*-(u-251)-h-108,f=2),u==255)throw p=a.readInt(i,r+1)/65535,f=5,"unknown number";if(u==30){var v=[];for(f=1;;){var g=i[r+f];f++;var m=g>>4,x=15&g;if(m!=15&&v.push(m),x!=15&&v.push(x),x==15)break}for(var _="",y=[0,1,2,3,4,5,6,7,8,9,".","e","e-","reserved","-","endOfNumber"],A=0;A<v.length;A++)_+=y[v[A]];p=parseFloat(_)}u<=21&&(d=["version","Notice","FullName","FamilyName","Weight","FontBBox","BlueValues","OtherBlues","FamilyBlues","FamilyOtherBlues","StdHW","StdVW","escape","UniqueID","XUID","charset","Encoding","CharStrings","Private","Subrs","defaultWidthX","nominalWidthX"][u],f=1,u==12&&(d=["Copyright","isFixedPitch","ItalicAngle","UnderlinePosition","UnderlineThickness","PaintType","CharstringType","FontMatrix","StrokeWidth","BlueScale","BlueShift","BlueFuzz","StemSnapH","StemSnapV","ForceBold",0,0,"LanguageGroup","ExpansionFactor","initialRandomSeed","SyntheticBase","PostScript","BaseFontName","BaseFontBlend",0,0,0,0,0,0,"ROS","CIDFontVersion","CIDFontRevision","CIDFontType","CIDCount","UIDBase","FDArray","FDSelect","FontName"][h],f=2)),d!=null?(l[d]=c.length==1?c[0]:c,c=[]):c.push(p),r+=f}return l},e.cmap={},e.cmap.parse=function(i,r,o){i=new Uint8Array(i.buffer,r,o),r=0;var a=e._bin,l={};a.readUshort(i,r),r+=2;var c=a.readUshort(i,r);r+=2;var u=[];l.tables=[];for(var h=0;h<c;h++){var f=a.readUshort(i,r);r+=2;var d=a.readUshort(i,r);r+=2;var p=a.readUint(i,r);r+=4;var v="p"+f+"e"+d,g=u.indexOf(p);if(g==-1){var m;g=l.tables.length,u.push(p);var x=a.readUshort(i,p);x==0?m=e.cmap.parse0(i,p):x==4?m=e.cmap.parse4(i,p):x==6?m=e.cmap.parse6(i,p):x==12&&(m=e.cmap.parse12(i,p)),l.tables.push(m)}if(l[v]!=null)throw"multiple tables for one platform+encoding";l[v]=g}return l},e.cmap.parse0=function(i,r){var o=e._bin,a={};a.format=o.readUshort(i,r),r+=2;var l=o.readUshort(i,r);r+=2,o.readUshort(i,r),r+=2,a.map=[];for(var c=0;c<l-6;c++)a.map.push(i[r+c]);return a},e.cmap.parse4=function(i,r){var o=e._bin,a=r,l={};l.format=o.readUshort(i,r),r+=2;var c=o.readUshort(i,r);r+=2,o.readUshort(i,r),r+=2;var u=o.readUshort(i,r);r+=2;var h=u/2;l.searchRange=o.readUshort(i,r),r+=2,l.entrySelector=o.readUshort(i,r),r+=2,l.rangeShift=o.readUshort(i,r),r+=2,l.endCount=o.readUshorts(i,r,h),r+=2*h,r+=2,l.startCount=o.readUshorts(i,r,h),r+=2*h,l.idDelta=[];for(var f=0;f<h;f++)l.idDelta.push(o.readShort(i,r)),r+=2;for(l.idRangeOffset=o.readUshorts(i,r,h),r+=2*h,l.glyphIdArray=[];r<a+c;)l.glyphIdArray.push(o.readUshort(i,r)),r+=2;return l},e.cmap.parse6=function(i,r){var o=e._bin,a={};a.format=o.readUshort(i,r),r+=2,o.readUshort(i,r),r+=2,o.readUshort(i,r),r+=2,a.firstCode=o.readUshort(i,r),r+=2;var l=o.readUshort(i,r);r+=2,a.glyphIdArray=[];for(var c=0;c<l;c++)a.glyphIdArray.push(o.readUshort(i,r)),r+=2;return a},e.cmap.parse12=function(i,r){var o=e._bin,a={};a.format=o.readUshort(i,r),r+=2,r+=2,o.readUint(i,r),r+=4,o.readUint(i,r),r+=4;var l=o.readUint(i,r);r+=4,a.groups=[];for(var c=0;c<l;c++){var u=r+12*c,h=o.readUint(i,u+0),f=o.readUint(i,u+4),d=o.readUint(i,u+8);a.groups.push([h,f,d])}return a},e.glyf={},e.glyf.parse=function(i,r,o,a){for(var l=[],c=0;c<a.maxp.numGlyphs;c++)l.push(null);return l},e.glyf._parseGlyf=function(i,r){var o=e._bin,a=i._data,l=e._tabOffset(a,"glyf",i._offset)+i.loca[r];if(i.loca[r]==i.loca[r+1])return null;var c={};if(c.noc=o.readShort(a,l),l+=2,c.xMin=o.readShort(a,l),l+=2,c.yMin=o.readShort(a,l),l+=2,c.xMax=o.readShort(a,l),l+=2,c.yMax=o.readShort(a,l),l+=2,c.xMin>=c.xMax||c.yMin>=c.yMax)return null;if(c.noc>0){c.endPts=[];for(var u=0;u<c.noc;u++)c.endPts.push(o.readUshort(a,l)),l+=2;var h=o.readUshort(a,l);if(l+=2,a.length-l<h)return null;c.instructions=o.readBytes(a,l,h),l+=h;var f=c.endPts[c.noc-1]+1;for(c.flags=[],u=0;u<f;u++){var d=a[l];if(l++,c.flags.push(d),(8&d)!=0){var p=a[l];l++;for(var v=0;v<p;v++)c.flags.push(d),u++}}for(c.xs=[],u=0;u<f;u++){var g=(2&c.flags[u])!=0,m=(16&c.flags[u])!=0;g?(c.xs.push(m?a[l]:-a[l]),l++):m?c.xs.push(0):(c.xs.push(o.readShort(a,l)),l+=2)}for(c.ys=[],u=0;u<f;u++)g=(4&c.flags[u])!=0,m=(32&c.flags[u])!=0,g?(c.ys.push(m?a[l]:-a[l]),l++):m?c.ys.push(0):(c.ys.push(o.readShort(a,l)),l+=2);var x=0,_=0;for(u=0;u<f;u++)x+=c.xs[u],_+=c.ys[u],c.xs[u]=x,c.ys[u]=_}else{var y;c.parts=[];do{y=o.readUshort(a,l),l+=2;var A={m:{a:1,b:0,c:0,d:1,tx:0,ty:0},p1:-1,p2:-1};if(c.parts.push(A),A.glyphIndex=o.readUshort(a,l),l+=2,1&y){var b=o.readShort(a,l);l+=2;var T=o.readShort(a,l);l+=2}else b=o.readInt8(a,l),l++,T=o.readInt8(a,l),l++;2&y?(A.m.tx=b,A.m.ty=T):(A.p1=b,A.p2=T),8&y?(A.m.a=A.m.d=o.readF2dot14(a,l),l+=2):64&y?(A.m.a=o.readF2dot14(a,l),l+=2,A.m.d=o.readF2dot14(a,l),l+=2):128&y&&(A.m.a=o.readF2dot14(a,l),l+=2,A.m.b=o.readF2dot14(a,l),l+=2,A.m.c=o.readF2dot14(a,l),l+=2,A.m.d=o.readF2dot14(a,l),l+=2)}while(32&y);if(256&y){var w=o.readUshort(a,l);for(l+=2,c.instr=[],u=0;u<w;u++)c.instr.push(a[l]),l++}}return c},e.GDEF={},e.GDEF.parse=function(i,r,o,a){var l=r;r+=4;var c=e._bin.readUshort(i,r);return{glyphClassDef:c===0?null:e._lctf.readClassDef(i,l+c)}},e.GPOS={},e.GPOS.parse=function(i,r,o,a){return e._lctf.parse(i,r,o,a,e.GPOS.subt)},e.GPOS.subt=function(i,r,o,a){var l=e._bin,c=o,u={};if(u.fmt=l.readUshort(i,o),o+=2,r==1||r==2||r==3||r==7||r==8&&u.fmt<=2){var h=l.readUshort(i,o);o+=2,u.coverage=e._lctf.readCoverage(i,h+c)}if(r==1&&u.fmt==1){var f=l.readUshort(i,o);o+=2,f!=0&&(u.pos=e.GPOS.readValueRecord(i,o,f))}else if(r==2&&u.fmt>=1&&u.fmt<=2){f=l.readUshort(i,o),o+=2;var d=l.readUshort(i,o);o+=2;var p=e._lctf.numOfOnes(f),v=e._lctf.numOfOnes(d);if(u.fmt==1){u.pairsets=[];var g=l.readUshort(i,o);o+=2;for(var m=0;m<g;m++){var x=c+l.readUshort(i,o);o+=2;var _=l.readUshort(i,x);x+=2;for(var y=[],A=0;A<_;A++){var b=l.readUshort(i,x);x+=2,f!=0&&(P=e.GPOS.readValueRecord(i,x,f),x+=2*p),d!=0&&(F=e.GPOS.readValueRecord(i,x,d),x+=2*v),y.push({gid2:b,val1:P,val2:F})}u.pairsets.push(y)}}if(u.fmt==2){var T=l.readUshort(i,o);o+=2;var w=l.readUshort(i,o);o+=2;var M=l.readUshort(i,o);o+=2;var S=l.readUshort(i,o);for(o+=2,u.classDef1=e._lctf.readClassDef(i,c+T),u.classDef2=e._lctf.readClassDef(i,c+w),u.matrix=[],m=0;m<M;m++){var R=[];for(A=0;A<S;A++){var P=null,F=null;f!=0&&(P=e.GPOS.readValueRecord(i,o,f),o+=2*p),d!=0&&(F=e.GPOS.readValueRecord(i,o,d),o+=2*v),R.push({val1:P,val2:F})}u.matrix.push(R)}}}else if(r==4&&u.fmt==1)u.markCoverage=e._lctf.readCoverage(i,l.readUshort(i,o)+c),u.baseCoverage=e._lctf.readCoverage(i,l.readUshort(i,o+2)+c),u.markClassCount=l.readUshort(i,o+4),u.markArray=e.GPOS.readMarkArray(i,l.readUshort(i,o+6)+c),u.baseArray=e.GPOS.readBaseArray(i,l.readUshort(i,o+8)+c,u.markClassCount);else if(r==6&&u.fmt==1)u.mark1Coverage=e._lctf.readCoverage(i,l.readUshort(i,o)+c),u.mark2Coverage=e._lctf.readCoverage(i,l.readUshort(i,o+2)+c),u.markClassCount=l.readUshort(i,o+4),u.mark1Array=e.GPOS.readMarkArray(i,l.readUshort(i,o+6)+c),u.mark2Array=e.GPOS.readBaseArray(i,l.readUshort(i,o+8)+c,u.markClassCount);else if(r==9&&u.fmt==1){var U=l.readUshort(i,o);o+=2;var G=l.readUint(i,o);if(o+=4,a.ltype==9)a.ltype=U;else if(a.ltype!=U)throw"invalid extension substitution";return e.GPOS.subt(i,a.ltype,c+G)}return u},e.GPOS.readValueRecord=function(i,r,o){var a=e._bin,l=[];return l.push(1&o?a.readShort(i,r):0),r+=1&o?2:0,l.push(2&o?a.readShort(i,r):0),r+=2&o?2:0,l.push(4&o?a.readShort(i,r):0),r+=4&o?2:0,l.push(8&o?a.readShort(i,r):0),r+=8&o?2:0,l},e.GPOS.readBaseArray=function(i,r,o){var a=e._bin,l=[],c=r,u=a.readUshort(i,r);r+=2;for(var h=0;h<u;h++){for(var f=[],d=0;d<o;d++)f.push(e.GPOS.readAnchorRecord(i,c+a.readUshort(i,r))),r+=2;l.push(f)}return l},e.GPOS.readMarkArray=function(i,r){var o=e._bin,a=[],l=r,c=o.readUshort(i,r);r+=2;for(var u=0;u<c;u++){var h=e.GPOS.readAnchorRecord(i,o.readUshort(i,r+2)+l);h.markClass=o.readUshort(i,r),a.push(h),r+=4}return a},e.GPOS.readAnchorRecord=function(i,r){var o=e._bin,a={};return a.fmt=o.readUshort(i,r),a.x=o.readShort(i,r+2),a.y=o.readShort(i,r+4),a},e.GSUB={},e.GSUB.parse=function(i,r,o,a){return e._lctf.parse(i,r,o,a,e.GSUB.subt)},e.GSUB.subt=function(i,r,o,a){var l=e._bin,c=o,u={};if(u.fmt=l.readUshort(i,o),o+=2,r!=1&&r!=2&&r!=4&&r!=5&&r!=6)return null;if(r==1||r==2||r==4||r==5&&u.fmt<=2||r==6&&u.fmt<=2){var h=l.readUshort(i,o);o+=2,u.coverage=e._lctf.readCoverage(i,c+h)}if(r==1&&u.fmt>=1&&u.fmt<=2){if(u.fmt==1)u.delta=l.readShort(i,o),o+=2;else if(u.fmt==2){var f=l.readUshort(i,o);o+=2,u.newg=l.readUshorts(i,o,f),o+=2*u.newg.length}}else if(r==2&&u.fmt==1){f=l.readUshort(i,o),o+=2,u.seqs=[];for(var d=0;d<f;d++){var p=l.readUshort(i,o)+c;o+=2;var v=l.readUshort(i,p);u.seqs.push(l.readUshorts(i,p+2,v))}}else if(r==4)for(u.vals=[],f=l.readUshort(i,o),o+=2,d=0;d<f;d++){var g=l.readUshort(i,o);o+=2,u.vals.push(e.GSUB.readLigatureSet(i,c+g))}else if(r==5&&u.fmt==2){if(u.fmt==2){var m=l.readUshort(i,o);o+=2,u.cDef=e._lctf.readClassDef(i,c+m),u.scset=[];var x=l.readUshort(i,o);for(o+=2,d=0;d<x;d++){var _=l.readUshort(i,o);o+=2,u.scset.push(_==0?null:e.GSUB.readSubClassSet(i,c+_))}}}else if(r==6&&u.fmt==3){if(u.fmt==3){for(d=0;d<3;d++){f=l.readUshort(i,o),o+=2;for(var y=[],A=0;A<f;A++)y.push(e._lctf.readCoverage(i,c+l.readUshort(i,o+2*A)));o+=2*f,d==0&&(u.backCvg=y),d==1&&(u.inptCvg=y),d==2&&(u.ahedCvg=y)}f=l.readUshort(i,o),o+=2,u.lookupRec=e.GSUB.readSubstLookupRecords(i,o,f)}}else if(r==7&&u.fmt==1){var b=l.readUshort(i,o);o+=2;var T=l.readUint(i,o);if(o+=4,a.ltype==9)a.ltype=b;else if(a.ltype!=b)throw"invalid extension substitution";return e.GSUB.subt(i,a.ltype,c+T)}return u},e.GSUB.readSubClassSet=function(i,r){var o=e._bin.readUshort,a=r,l=[],c=o(i,r);r+=2;for(var u=0;u<c;u++){var h=o(i,r);r+=2,l.push(e.GSUB.readSubClassRule(i,a+h))}return l},e.GSUB.readSubClassRule=function(i,r){var o=e._bin.readUshort,a={},l=o(i,r),c=o(i,r+=2);r+=2,a.input=[];for(var u=0;u<l-1;u++)a.input.push(o(i,r)),r+=2;return a.substLookupRecords=e.GSUB.readSubstLookupRecords(i,r,c),a},e.GSUB.readSubstLookupRecords=function(i,r,o){for(var a=e._bin.readUshort,l=[],c=0;c<o;c++)l.push(a(i,r),a(i,r+2)),r+=4;return l},e.GSUB.readChainSubClassSet=function(i,r){var o=e._bin,a=r,l=[],c=o.readUshort(i,r);r+=2;for(var u=0;u<c;u++){var h=o.readUshort(i,r);r+=2,l.push(e.GSUB.readChainSubClassRule(i,a+h))}return l},e.GSUB.readChainSubClassRule=function(i,r){for(var o=e._bin,a={},l=["backtrack","input","lookahead"],c=0;c<l.length;c++){var u=o.readUshort(i,r);r+=2,c==1&&u--,a[l[c]]=o.readUshorts(i,r,u),r+=2*a[l[c]].length}return u=o.readUshort(i,r),r+=2,a.subst=o.readUshorts(i,r,2*u),r+=2*a.subst.length,a},e.GSUB.readLigatureSet=function(i,r){var o=e._bin,a=r,l=[],c=o.readUshort(i,r);r+=2;for(var u=0;u<c;u++){var h=o.readUshort(i,r);r+=2,l.push(e.GSUB.readLigature(i,a+h))}return l},e.GSUB.readLigature=function(i,r){var o=e._bin,a={chain:[]};a.nglyph=o.readUshort(i,r),r+=2;var l=o.readUshort(i,r);r+=2;for(var c=0;c<l-1;c++)a.chain.push(o.readUshort(i,r)),r+=2;return a},e.head={},e.head.parse=function(i,r,o){var a=e._bin,l={};return a.readFixed(i,r),r+=4,l.fontRevision=a.readFixed(i,r),r+=4,a.readUint(i,r),r+=4,a.readUint(i,r),r+=4,l.flags=a.readUshort(i,r),r+=2,l.unitsPerEm=a.readUshort(i,r),r+=2,l.created=a.readUint64(i,r),r+=8,l.modified=a.readUint64(i,r),r+=8,l.xMin=a.readShort(i,r),r+=2,l.yMin=a.readShort(i,r),r+=2,l.xMax=a.readShort(i,r),r+=2,l.yMax=a.readShort(i,r),r+=2,l.macStyle=a.readUshort(i,r),r+=2,l.lowestRecPPEM=a.readUshort(i,r),r+=2,l.fontDirectionHint=a.readShort(i,r),r+=2,l.indexToLocFormat=a.readShort(i,r),r+=2,l.glyphDataFormat=a.readShort(i,r),r+=2,l},e.hhea={},e.hhea.parse=function(i,r,o){var a=e._bin,l={};return a.readFixed(i,r),r+=4,l.ascender=a.readShort(i,r),r+=2,l.descender=a.readShort(i,r),r+=2,l.lineGap=a.readShort(i,r),r+=2,l.advanceWidthMax=a.readUshort(i,r),r+=2,l.minLeftSideBearing=a.readShort(i,r),r+=2,l.minRightSideBearing=a.readShort(i,r),r+=2,l.xMaxExtent=a.readShort(i,r),r+=2,l.caretSlopeRise=a.readShort(i,r),r+=2,l.caretSlopeRun=a.readShort(i,r),r+=2,l.caretOffset=a.readShort(i,r),r+=2,r+=8,l.metricDataFormat=a.readShort(i,r),r+=2,l.numberOfHMetrics=a.readUshort(i,r),r+=2,l},e.hmtx={},e.hmtx.parse=function(i,r,o,a){for(var l=e._bin,c={aWidth:[],lsBearing:[]},u=0,h=0,f=0;f<a.maxp.numGlyphs;f++)f<a.hhea.numberOfHMetrics&&(u=l.readUshort(i,r),r+=2,h=l.readShort(i,r),r+=2),c.aWidth.push(u),c.lsBearing.push(h);return c},e.kern={},e.kern.parse=function(i,r,o,a){var l=e._bin,c=l.readUshort(i,r);if(r+=2,c==1)return e.kern.parseV1(i,r-2,o,a);var u=l.readUshort(i,r);r+=2;for(var h={glyph1:[],rval:[]},f=0;f<u;f++){r+=2,o=l.readUshort(i,r),r+=2;var d=l.readUshort(i,r);r+=2;var p=d>>>8;if((p&=15)!=0)throw"unknown kern table format: "+p;r=e.kern.readFormat0(i,r,h)}return h},e.kern.parseV1=function(i,r,o,a){var l=e._bin;l.readFixed(i,r),r+=4;var c=l.readUint(i,r);r+=4;for(var u={glyph1:[],rval:[]},h=0;h<c;h++){l.readUint(i,r),r+=4;var f=l.readUshort(i,r);r+=2,l.readUshort(i,r),r+=2;var d=f>>>8;if((d&=15)!=0)throw"unknown kern table format: "+d;r=e.kern.readFormat0(i,r,u)}return u},e.kern.readFormat0=function(i,r,o){var a=e._bin,l=-1,c=a.readUshort(i,r);r+=2,a.readUshort(i,r),r+=2,a.readUshort(i,r),r+=2,a.readUshort(i,r),r+=2;for(var u=0;u<c;u++){var h=a.readUshort(i,r);r+=2;var f=a.readUshort(i,r);r+=2;var d=a.readShort(i,r);r+=2,h!=l&&(o.glyph1.push(h),o.rval.push({glyph2:[],vals:[]}));var p=o.rval[o.rval.length-1];p.glyph2.push(f),p.vals.push(d),l=h}return r},e.loca={},e.loca.parse=function(i,r,o,a){var l=e._bin,c=[],u=a.head.indexToLocFormat,h=a.maxp.numGlyphs+1;if(u==0)for(var f=0;f<h;f++)c.push(l.readUshort(i,r+(f<<1))<<1);if(u==1)for(f=0;f<h;f++)c.push(l.readUint(i,r+(f<<2)));return c},e.maxp={},e.maxp.parse=function(i,r,o){var a=e._bin,l={},c=a.readUint(i,r);return r+=4,l.numGlyphs=a.readUshort(i,r),r+=2,c==65536&&(l.maxPoints=a.readUshort(i,r),r+=2,l.maxContours=a.readUshort(i,r),r+=2,l.maxCompositePoints=a.readUshort(i,r),r+=2,l.maxCompositeContours=a.readUshort(i,r),r+=2,l.maxZones=a.readUshort(i,r),r+=2,l.maxTwilightPoints=a.readUshort(i,r),r+=2,l.maxStorage=a.readUshort(i,r),r+=2,l.maxFunctionDefs=a.readUshort(i,r),r+=2,l.maxInstructionDefs=a.readUshort(i,r),r+=2,l.maxStackElements=a.readUshort(i,r),r+=2,l.maxSizeOfInstructions=a.readUshort(i,r),r+=2,l.maxComponentElements=a.readUshort(i,r),r+=2,l.maxComponentDepth=a.readUshort(i,r),r+=2),l},e.name={},e.name.parse=function(i,r,o){var a=e._bin,l={};a.readUshort(i,r),r+=2;var c=a.readUshort(i,r);r+=2,a.readUshort(i,r);for(var u,h=["copyright","fontFamily","fontSubfamily","ID","fullName","version","postScriptName","trademark","manufacturer","designer","description","urlVendor","urlDesigner","licence","licenceURL","---","typoFamilyName","typoSubfamilyName","compatibleFull","sampleText","postScriptCID","wwsFamilyName","wwsSubfamilyName","lightPalette","darkPalette"],f=r+=2,d=0;d<c;d++){var p=a.readUshort(i,r);r+=2;var v=a.readUshort(i,r);r+=2;var g=a.readUshort(i,r);r+=2;var m=a.readUshort(i,r);r+=2;var x=a.readUshort(i,r);r+=2;var _=a.readUshort(i,r);r+=2;var y,A=h[m],b=f+12*c+_;if(p==0)y=a.readUnicode(i,b,x/2);else if(p==3&&v==0)y=a.readUnicode(i,b,x/2);else if(v==0)y=a.readASCII(i,b,x);else if(v==1)y=a.readUnicode(i,b,x/2);else if(v==3)y=a.readUnicode(i,b,x/2);else{if(p!=1)throw"unknown encoding "+v+", platformID: "+p;y=a.readASCII(i,b,x)}var T="p"+p+","+g.toString(16);l[T]==null&&(l[T]={}),l[T][A!==void 0?A:m]=y,l[T]._lang=g}for(var w in l)if(l[w].postScriptName!=null&&l[w]._lang==1033)return l[w];for(var w in l)if(l[w].postScriptName!=null&&l[w]._lang==0)return l[w];for(var w in l)if(l[w].postScriptName!=null&&l[w]._lang==3084)return l[w];for(var w in l)if(l[w].postScriptName!=null)return l[w];for(var w in l){u=w;break}return l[u]},e["OS/2"]={},e["OS/2"].parse=function(i,r,o){var a=e._bin.readUshort(i,r);r+=2;var l={};if(a==0)e["OS/2"].version0(i,r,l);else if(a==1)e["OS/2"].version1(i,r,l);else if(a==2||a==3||a==4)e["OS/2"].version2(i,r,l);else{if(a!=5)throw"unknown OS/2 table version: "+a;e["OS/2"].version5(i,r,l)}return l},e["OS/2"].version0=function(i,r,o){var a=e._bin;return o.xAvgCharWidth=a.readShort(i,r),r+=2,o.usWeightClass=a.readUshort(i,r),r+=2,o.usWidthClass=a.readUshort(i,r),r+=2,o.fsType=a.readUshort(i,r),r+=2,o.ySubscriptXSize=a.readShort(i,r),r+=2,o.ySubscriptYSize=a.readShort(i,r),r+=2,o.ySubscriptXOffset=a.readShort(i,r),r+=2,o.ySubscriptYOffset=a.readShort(i,r),r+=2,o.ySuperscriptXSize=a.readShort(i,r),r+=2,o.ySuperscriptYSize=a.readShort(i,r),r+=2,o.ySuperscriptXOffset=a.readShort(i,r),r+=2,o.ySuperscriptYOffset=a.readShort(i,r),r+=2,o.yStrikeoutSize=a.readShort(i,r),r+=2,o.yStrikeoutPosition=a.readShort(i,r),r+=2,o.sFamilyClass=a.readShort(i,r),r+=2,o.panose=a.readBytes(i,r,10),r+=10,o.ulUnicodeRange1=a.readUint(i,r),r+=4,o.ulUnicodeRange2=a.readUint(i,r),r+=4,o.ulUnicodeRange3=a.readUint(i,r),r+=4,o.ulUnicodeRange4=a.readUint(i,r),r+=4,o.achVendID=[a.readInt8(i,r),a.readInt8(i,r+1),a.readInt8(i,r+2),a.readInt8(i,r+3)],r+=4,o.fsSelection=a.readUshort(i,r),r+=2,o.usFirstCharIndex=a.readUshort(i,r),r+=2,o.usLastCharIndex=a.readUshort(i,r),r+=2,o.sTypoAscender=a.readShort(i,r),r+=2,o.sTypoDescender=a.readShort(i,r),r+=2,o.sTypoLineGap=a.readShort(i,r),r+=2,o.usWinAscent=a.readUshort(i,r),r+=2,o.usWinDescent=a.readUshort(i,r),r+=2},e["OS/2"].version1=function(i,r,o){var a=e._bin;return r=e["OS/2"].version0(i,r,o),o.ulCodePageRange1=a.readUint(i,r),r+=4,o.ulCodePageRange2=a.readUint(i,r),r+=4},e["OS/2"].version2=function(i,r,o){var a=e._bin;return r=e["OS/2"].version1(i,r,o),o.sxHeight=a.readShort(i,r),r+=2,o.sCapHeight=a.readShort(i,r),r+=2,o.usDefault=a.readUshort(i,r),r+=2,o.usBreak=a.readUshort(i,r),r+=2,o.usMaxContext=a.readUshort(i,r),r+=2},e["OS/2"].version5=function(i,r,o){var a=e._bin;return r=e["OS/2"].version2(i,r,o),o.usLowerOpticalPointSize=a.readUshort(i,r),r+=2,o.usUpperOpticalPointSize=a.readUshort(i,r),r+=2},e.post={},e.post.parse=function(i,r,o){var a=e._bin,l={};return l.version=a.readFixed(i,r),r+=4,l.italicAngle=a.readFixed(i,r),r+=4,l.underlinePosition=a.readShort(i,r),r+=2,l.underlineThickness=a.readShort(i,r),r+=2,l},e==null&&(e={}),e.U==null&&(e.U={}),e.U.codeToGlyph=function(i,r){var o=i.cmap,a=-1;if(o.p0e4!=null?a=o.p0e4:o.p3e1!=null?a=o.p3e1:o.p1e0!=null?a=o.p1e0:o.p0e3!=null&&(a=o.p0e3),a==-1)throw"no familiar platform and encoding!";var l=o.tables[a];if(l.format==0)return r>=l.map.length?0:l.map[r];if(l.format==4){for(var c=-1,u=0;u<l.endCount.length;u++)if(r<=l.endCount[u]){c=u;break}return c==-1||l.startCount[c]>r?0:65535&(l.idRangeOffset[c]!=0?l.glyphIdArray[r-l.startCount[c]+(l.idRangeOffset[c]>>1)-(l.idRangeOffset.length-c)]:r+l.idDelta[c])}if(l.format==12){if(r>l.groups[l.groups.length-1][1])return 0;for(u=0;u<l.groups.length;u++){var h=l.groups[u];if(h[0]<=r&&r<=h[1])return h[2]+(r-h[0])}return 0}throw"unknown cmap table format "+l.format},e.U.glyphToPath=function(i,r){var o={cmds:[],crds:[]};if(i.SVG&&i.SVG.entries[r]){var a=i.SVG.entries[r];return a==null?o:(typeof a=="string"&&(a=e.SVG.toPath(a),i.SVG.entries[r]=a),a)}if(i.CFF){var l={x:0,y:0,stack:[],nStems:0,haveWidth:!1,width:i.CFF.Private?i.CFF.Private.defaultWidthX:0,open:!1},c=i.CFF,u=i.CFF.Private;if(c.ROS){for(var h=0;c.FDSelect[h+2]<=r;)h+=2;u=c.FDArray[c.FDSelect[h+1]].Private}e.U._drawCFF(i.CFF.CharStrings[r],l,c,u,o)}else i.glyf&&e.U._drawGlyf(r,i,o);return o},e.U._drawGlyf=function(i,r,o){var a=r.glyf[i];a==null&&(a=r.glyf[i]=e.glyf._parseGlyf(r,i)),a!=null&&(a.noc>-1?e.U._simpleGlyph(a,o):e.U._compoGlyph(a,r,o))},e.U._simpleGlyph=function(i,r){for(var o=0;o<i.noc;o++){for(var a=o==0?0:i.endPts[o-1]+1,l=i.endPts[o],c=a;c<=l;c++){var u=c==a?l:c-1,h=c==l?a:c+1,f=1&i.flags[c],d=1&i.flags[u],p=1&i.flags[h],v=i.xs[c],g=i.ys[c];if(c==a)if(f){if(!d){e.U.P.moveTo(r,v,g);continue}e.U.P.moveTo(r,i.xs[u],i.ys[u])}else d?e.U.P.moveTo(r,i.xs[u],i.ys[u]):e.U.P.moveTo(r,(i.xs[u]+v)/2,(i.ys[u]+g)/2);f?d&&e.U.P.lineTo(r,v,g):p?e.U.P.qcurveTo(r,v,g,i.xs[h],i.ys[h]):e.U.P.qcurveTo(r,v,g,(v+i.xs[h])/2,(g+i.ys[h])/2)}e.U.P.closePath(r)}},e.U._compoGlyph=function(i,r,o){for(var a=0;a<i.parts.length;a++){var l={cmds:[],crds:[]},c=i.parts[a];e.U._drawGlyf(c.glyphIndex,r,l);for(var u=c.m,h=0;h<l.crds.length;h+=2){var f=l.crds[h],d=l.crds[h+1];o.crds.push(f*u.a+d*u.b+u.tx),o.crds.push(f*u.c+d*u.d+u.ty)}for(h=0;h<l.cmds.length;h++)o.cmds.push(l.cmds[h])}},e.U._getGlyphClass=function(i,r){var o=e._lctf.getInterval(r,i);return o==-1?0:r[o+2]},e.U._applySubs=function(i,r,o,a){for(var l=i.length-r-1,c=0;c<o.tabs.length;c++)if(o.tabs[c]!=null){var u,h=o.tabs[c];if(!h.coverage||(u=e._lctf.coverageIndex(h.coverage,i[r]))!=-1){if(o.ltype==1)i[r],h.fmt==1?i[r]=i[r]+h.delta:i[r]=h.newg[u];else if(o.ltype==4)for(var f=h.vals[u],d=0;d<f.length;d++){var p=f[d],v=p.chain.length;if(!(v>l)){for(var g=!0,m=0,x=0;x<v;x++){for(;i[r+m+(1+x)]==-1;)m++;p.chain[x]!=i[r+m+(1+x)]&&(g=!1)}if(g){for(i[r]=p.nglyph,x=0;x<v+m;x++)i[r+x+1]=-1;break}}}else if(o.ltype==5&&h.fmt==2)for(var _=e._lctf.getInterval(h.cDef,i[r]),y=h.cDef[_+2],A=h.scset[y],b=0;b<A.length;b++){var T=A[b],w=T.input;if(!(w.length>l)){for(g=!0,x=0;x<w.length;x++){var M=e._lctf.getInterval(h.cDef,i[r+1+x]);if(_==-1&&h.cDef[M+2]!=w[x]){g=!1;break}}if(g){var S=T.substLookupRecords;for(d=0;d<S.length;d+=2)S[d],S[d+1]}}}else if(o.ltype==6&&h.fmt==3){if(!e.U._glsCovered(i,h.backCvg,r-h.backCvg.length)||!e.U._glsCovered(i,h.inptCvg,r)||!e.U._glsCovered(i,h.ahedCvg,r+h.inptCvg.length))continue;var R=h.lookupRec;for(b=0;b<R.length;b+=2){_=R[b];var P=a[R[b+1]];e.U._applySubs(i,r+_,P,a)}}}}},e.U._glsCovered=function(i,r,o){for(var a=0;a<r.length;a++)if(e._lctf.coverageIndex(r[a],i[o+a])==-1)return!1;return!0},e.U.glyphsToPath=function(i,r,o){for(var a={cmds:[],crds:[]},l=0,c=0;c<r.length;c++){var u=r[c];if(u!=-1){for(var h=c<r.length-1&&r[c+1]!=-1?r[c+1]:0,f=e.U.glyphToPath(i,u),d=0;d<f.crds.length;d+=2)a.crds.push(f.crds[d]+l),a.crds.push(f.crds[d+1]);for(o&&a.cmds.push(o),d=0;d<f.cmds.length;d++)a.cmds.push(f.cmds[d]);o&&a.cmds.push("X"),l+=i.hmtx.aWidth[u],c<r.length-1&&(l+=e.U.getPairAdjustment(i,u,h))}}return a},e.U.P={},e.U.P.moveTo=function(i,r,o){i.cmds.push("M"),i.crds.push(r,o)},e.U.P.lineTo=function(i,r,o){i.cmds.push("L"),i.crds.push(r,o)},e.U.P.curveTo=function(i,r,o,a,l,c,u){i.cmds.push("C"),i.crds.push(r,o,a,l,c,u)},e.U.P.qcurveTo=function(i,r,o,a,l){i.cmds.push("Q"),i.crds.push(r,o,a,l)},e.U.P.closePath=function(i){i.cmds.push("Z")},e.U._drawCFF=function(i,r,o,a,l){for(var c=r.stack,u=r.nStems,h=r.haveWidth,f=r.width,d=r.open,p=0,v=r.x,g=r.y,m=0,x=0,_=0,y=0,A=0,b=0,T=0,w=0,M=0,S=0,R={val:0,size:0};p<i.length;){e.CFF.getCharString(i,p,R);var P=R.val;if(p+=R.size,P=="o1"||P=="o18")c.length%2!=0&&!h&&(f=c.shift()+a.nominalWidthX),u+=c.length>>1,c.length=0,h=!0;else if(P=="o3"||P=="o23")c.length%2!=0&&!h&&(f=c.shift()+a.nominalWidthX),u+=c.length>>1,c.length=0,h=!0;else if(P=="o4")c.length>1&&!h&&(f=c.shift()+a.nominalWidthX,h=!0),d&&e.U.P.closePath(l),g+=c.pop(),e.U.P.moveTo(l,v,g),d=!0;else if(P=="o5")for(;c.length>0;)v+=c.shift(),g+=c.shift(),e.U.P.lineTo(l,v,g);else if(P=="o6"||P=="o7")for(var F=c.length,U=P=="o6",G=0;G<F;G++){var B=c.shift();U?v+=B:g+=B,U=!U,e.U.P.lineTo(l,v,g)}else if(P=="o8"||P=="o24"){F=c.length;for(var K=0;K+6<=F;)m=v+c.shift(),x=g+c.shift(),_=m+c.shift(),y=x+c.shift(),v=_+c.shift(),g=y+c.shift(),e.U.P.curveTo(l,m,x,_,y,v,g),K+=6;P=="o24"&&(v+=c.shift(),g+=c.shift(),e.U.P.lineTo(l,v,g))}else{if(P=="o11")break;if(P=="o1234"||P=="o1235"||P=="o1236"||P=="o1237")P=="o1234"&&(x=g,_=(m=v+c.shift())+c.shift(),S=y=x+c.shift(),b=y,w=g,v=(T=(A=(M=_+c.shift())+c.shift())+c.shift())+c.shift(),e.U.P.curveTo(l,m,x,_,y,M,S),e.U.P.curveTo(l,A,b,T,w,v,g)),P=="o1235"&&(m=v+c.shift(),x=g+c.shift(),_=m+c.shift(),y=x+c.shift(),M=_+c.shift(),S=y+c.shift(),A=M+c.shift(),b=S+c.shift(),T=A+c.shift(),w=b+c.shift(),v=T+c.shift(),g=w+c.shift(),c.shift(),e.U.P.curveTo(l,m,x,_,y,M,S),e.U.P.curveTo(l,A,b,T,w,v,g)),P=="o1236"&&(m=v+c.shift(),x=g+c.shift(),_=m+c.shift(),S=y=x+c.shift(),b=y,T=(A=(M=_+c.shift())+c.shift())+c.shift(),w=b+c.shift(),v=T+c.shift(),e.U.P.curveTo(l,m,x,_,y,M,S),e.U.P.curveTo(l,A,b,T,w,v,g)),P=="o1237"&&(m=v+c.shift(),x=g+c.shift(),_=m+c.shift(),y=x+c.shift(),M=_+c.shift(),S=y+c.shift(),A=M+c.shift(),b=S+c.shift(),T=A+c.shift(),w=b+c.shift(),Math.abs(T-v)>Math.abs(w-g)?v=T+c.shift():g=w+c.shift(),e.U.P.curveTo(l,m,x,_,y,M,S),e.U.P.curveTo(l,A,b,T,w,v,g));else if(P=="o14"){if(c.length>0&&!h&&(f=c.shift()+o.nominalWidthX,h=!0),c.length==4){var Y=c.shift(),le=c.shift(),J=c.shift(),Z=c.shift(),re=e.CFF.glyphBySE(o,J),ne=e.CFF.glyphBySE(o,Z);e.U._drawCFF(o.CharStrings[re],r,o,a,l),r.x=Y,r.y=le,e.U._drawCFF(o.CharStrings[ne],r,o,a,l)}d&&(e.U.P.closePath(l),d=!1)}else if(P=="o19"||P=="o20")c.length%2!=0&&!h&&(f=c.shift()+a.nominalWidthX),u+=c.length>>1,c.length=0,h=!0,p+=u+7>>3;else if(P=="o21")c.length>2&&!h&&(f=c.shift()+a.nominalWidthX,h=!0),g+=c.pop(),v+=c.pop(),d&&e.U.P.closePath(l),e.U.P.moveTo(l,v,g),d=!0;else if(P=="o22")c.length>1&&!h&&(f=c.shift()+a.nominalWidthX,h=!0),v+=c.pop(),d&&e.U.P.closePath(l),e.U.P.moveTo(l,v,g),d=!0;else if(P=="o25"){for(;c.length>6;)v+=c.shift(),g+=c.shift(),e.U.P.lineTo(l,v,g);m=v+c.shift(),x=g+c.shift(),_=m+c.shift(),y=x+c.shift(),v=_+c.shift(),g=y+c.shift(),e.U.P.curveTo(l,m,x,_,y,v,g)}else if(P=="o26")for(c.length%2&&(v+=c.shift());c.length>0;)m=v,x=g+c.shift(),v=_=m+c.shift(),g=(y=x+c.shift())+c.shift(),e.U.P.curveTo(l,m,x,_,y,v,g);else if(P=="o27")for(c.length%2&&(g+=c.shift());c.length>0;)x=g,_=(m=v+c.shift())+c.shift(),y=x+c.shift(),v=_+c.shift(),g=y,e.U.P.curveTo(l,m,x,_,y,v,g);else if(P=="o10"||P=="o29"){var $=P=="o10"?a:o;if(c.length!=0){var se=c.pop(),fe=$.Subrs[se+$.Bias];r.x=v,r.y=g,r.nStems=u,r.haveWidth=h,r.width=f,r.open=d,e.U._drawCFF(fe,r,o,a,l),v=r.x,g=r.y,u=r.nStems,h=r.haveWidth,f=r.width,d=r.open}}else if(P=="o30"||P=="o31"){var me=c.length,Te=(K=0,P=="o31");for(K+=me-(F=-3&me);K<F;)Te?(x=g,_=(m=v+c.shift())+c.shift(),g=(y=x+c.shift())+c.shift(),F-K==5?(v=_+c.shift(),K++):v=_,Te=!1):(m=v,x=g+c.shift(),_=m+c.shift(),y=x+c.shift(),v=_+c.shift(),F-K==5?(g=y+c.shift(),K++):g=y,Te=!0),e.U.P.curveTo(l,m,x,_,y,v,g),K+=4}else{if((P+"").charAt(0)=="o")throw P;c.push(P)}}}r.x=v,r.y=g,r.nStems=u,r.haveWidth=h,r.width=f,r.open=d};var t=e,n={Typr:t};return s.Typr=t,s.default=n,Object.defineProperty(s,"__esModule",{value:!0}),s}({}).Typr}/*!
Custom bundle of woff2otf (https://github.com/arty-name/woff2otf) with fflate
(https://github.com/101arrowz/fflate) for use in Troika text rendering. 
Original licenses apply: 
- fflate: https://github.com/101arrowz/fflate/blob/master/LICENSE (MIT)
- woff2otf.js: https://github.com/arty-name/woff2otf/blob/master/woff2otf.js (Apache2)
*/function cw(){return function(s){var e=Uint8Array,t=Uint16Array,n=Uint32Array,i=new e([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),r=new e([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),o=new e([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),a=function(P,F){for(var U=new t(31),G=0;G<31;++G)U[G]=F+=1<<P[G-1];var B=new n(U[30]);for(G=1;G<30;++G)for(var K=U[G];K<U[G+1];++K)B[K]=K-U[G]<<5|G;return[U,B]},l=a(i,2),c=l[0],u=l[1];c[28]=258,u[258]=28;for(var h=a(r,0)[0],f=new t(32768),d=0;d<32768;++d){var p=(43690&d)>>>1|(21845&d)<<1;p=(61680&(p=(52428&p)>>>2|(13107&p)<<2))>>>4|(3855&p)<<4,f[d]=((65280&p)>>>8|(255&p)<<8)>>>1}var v=function(P,F,U){for(var G=P.length,B=0,K=new t(F);B<G;++B)++K[P[B]-1];var Y,le=new t(F);for(B=0;B<F;++B)le[B]=le[B-1]+K[B-1]<<1;{Y=new t(1<<F);var J=15-F;for(B=0;B<G;++B)if(P[B])for(var Z=B<<4|P[B],re=F-P[B],ne=le[P[B]-1]++<<re,$=ne|(1<<re)-1;ne<=$;++ne)Y[f[ne]>>>J]=Z}return Y},g=new e(288);for(d=0;d<144;++d)g[d]=8;for(d=144;d<256;++d)g[d]=9;for(d=256;d<280;++d)g[d]=7;for(d=280;d<288;++d)g[d]=8;var m=new e(32);for(d=0;d<32;++d)m[d]=5;var x=v(g,9),_=v(m,5),y=function(P){for(var F=P[0],U=1;U<P.length;++U)P[U]>F&&(F=P[U]);return F},A=function(P,F,U){var G=F/8|0;return(P[G]|P[G+1]<<8)>>(7&F)&U},b=function(P,F){var U=F/8|0;return(P[U]|P[U+1]<<8|P[U+2]<<16)>>(7&F)},T=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],w=function(P,F,U){var G=new Error(F||T[P]);if(G.code=P,Error.captureStackTrace&&Error.captureStackTrace(G,w),!U)throw G;return G},M=function(P,F,U){var G=P.length;if(!G||U&&!U.l&&G<5)return F||new e(0);var B=!F||U,K=!U||U.i;U||(U={}),F||(F=new e(3*G));var Y,le=function(Ce){var H=F.length;if(Ce>H){var ae=new e(Math.max(2*H,Ce));ae.set(F),F=ae}},J=U.f||0,Z=U.p||0,re=U.b||0,ne=U.l,$=U.d,se=U.m,fe=U.n,me=8*G;do{if(!ne){U.f=J=A(P,Z,1);var Te=A(P,Z+1,3);if(Z+=3,!Te){var qe=P[(Ne=((Y=Z)/8|0)+(7&Y&&1)+4)-4]|P[Ne-3]<<8,Fe=Ne+qe;if(Fe>G){K&&w(0);break}B&&le(re+qe),F.set(P.subarray(Ne,Fe),re),U.b=re+=qe,U.p=Z=8*Fe;continue}if(Te==1)ne=x,$=_,se=9,fe=5;else if(Te==2){var Se=A(P,Z,31)+257,ue=A(P,Z+10,15)+4,xe=Se+A(P,Z+5,31)+1;Z+=14;for(var N=new e(xe),Be=new e(19),ye=0;ye<ue;++ye)Be[o[ye]]=A(P,Z+3*ye,7);Z+=3*ue;var Le=y(Be),Oe=(1<<Le)-1,$e=v(Be,Le);for(ye=0;ye<xe;){var Ne,O=$e[A(P,Z,Oe)];if(Z+=15&O,(Ne=O>>>4)<16)N[ye++]=Ne;else{var I=0,Q=0;for(Ne==16?(Q=3+A(P,Z,3),Z+=2,I=N[ye-1]):Ne==17?(Q=3+A(P,Z,7),Z+=3):Ne==18&&(Q=11+A(P,Z,127),Z+=7);Q--;)N[ye++]=I}}var he=N.subarray(0,Se),ve=N.subarray(Se);se=y(he),fe=y(ve),ne=v(he,se),$=v(ve,fe)}else w(1);if(Z>me){K&&w(0);break}}B&&le(re+131072);for(var ge=(1<<se)-1,Ee=(1<<fe)-1,Re=Z;;Re=Z){var Ie=(I=ne[b(P,Z)&ge])>>>4;if((Z+=15&I)>me){K&&w(0);break}if(I||w(2),Ie<256)F[re++]=Ie;else{if(Ie==256){Re=Z,ne=null;break}var Je=Ie-254;if(Ie>264){var be=i[ye=Ie-257];Je=A(P,Z,(1<<be)-1)+c[ye],Z+=be}var Ge=$[b(P,Z)&Ee],ke=Ge>>>4;if(Ge||w(3),Z+=15&Ge,ve=h[ke],ke>3&&(be=r[ke],ve+=b(P,Z)&(1<<be)-1,Z+=be),Z>me){K&&w(0);break}B&&le(re+131072);for(var Xe=re+Je;re<Xe;re+=4)F[re]=F[re-ve],F[re+1]=F[re+1-ve],F[re+2]=F[re+2-ve],F[re+3]=F[re+3-ve];re=Xe}}U.l=ne,U.p=Re,U.b=re,ne&&(J=1,U.m=se,U.d=$,U.n=fe)}while(!J);return re==F.length?F:function(Ce,H,ae){(ae==null||ae>Ce.length)&&(ae=Ce.length);var Ae=new(Ce instanceof t?t:Ce instanceof n?n:e)(ae-H);return Ae.set(Ce.subarray(H,ae)),Ae}(F,0,re)},S=new e(0),R=typeof TextDecoder<"u"&&new TextDecoder;try{R.decode(S,{stream:!0})}catch{}return s.convert_streams=function(P){var F=new DataView(P),U=0;function G(){var Se=F.getUint16(U);return U+=2,Se}function B(){var Se=F.getUint32(U);return U+=4,Se}function K(Se){qe.setUint16(Fe,Se),Fe+=2}function Y(Se){qe.setUint32(Fe,Se),Fe+=4}for(var le={signature:B(),flavor:B(),length:B(),numTables:G(),reserved:G(),totalSfntSize:B(),majorVersion:G(),minorVersion:G(),metaOffset:B(),metaLength:B(),metaOrigLength:B(),privOffset:B(),privLength:B()},J=0;Math.pow(2,J)<=le.numTables;)J++;J--;for(var Z=16*Math.pow(2,J),re=16*le.numTables-Z,ne=12,$=[],se=0;se<le.numTables;se++)$.push({tag:B(),offset:B(),compLength:B(),origLength:B(),origChecksum:B()}),ne+=16;var fe,me=new Uint8Array(12+16*$.length+$.reduce(function(Se,ue){return Se+ue.origLength+4},0)),Te=me.buffer,qe=new DataView(Te),Fe=0;return Y(le.flavor),K(le.numTables),K(Z),K(J),K(re),$.forEach(function(Se){Y(Se.tag),Y(Se.origChecksum),Y(ne),Y(Se.origLength),Se.outOffset=ne,(ne+=Se.origLength)%4!=0&&(ne+=4-ne%4)}),$.forEach(function(Se){var ue,xe=P.slice(Se.offset,Se.offset+Se.compLength);if(Se.compLength!=Se.origLength){var N=new Uint8Array(Se.origLength);ue=new Uint8Array(xe,2),M(ue,N)}else N=new Uint8Array(xe);me.set(N,Se.outOffset);var Be=0;(ne=Se.outOffset+Se.origLength)%4!=0&&(Be=4-ne%4),me.set(new Uint8Array(Be).buffer,Se.outOffset+Se.origLength),fe=ne+Be}),Te.slice(0,fe)},Object.defineProperty(s,"__esModule",{value:!0}),s}({}).convert_streams}function uw(s,e){const t={M:2,L:2,Q:4,C:6,Z:0},n={C:"18g,ca,368,1kz",D:"17k,6,2,2+4,5+c,2+6,2+1,10+1,9+f,j+11,2+1,a,2,2+1,15+2,3,j+2,6+3,2+8,2,2,2+1,w+a,4+e,3+3,2,3+2,3+5,23+w,2f+4,3,2+9,2,b,2+3,3,1k+9,6+1,3+1,2+2,2+d,30g,p+y,1,1+1g,f+x,2,sd2+1d,jf3+4,f+3,2+4,2+2,b+3,42,2,4+2,2+1,2,3,t+1,9f+w,2,el+2,2+g,d+2,2l,2+1,5,3+1,2+1,2,3,6,16wm+1v",R:"17m+3,2,2,6+3,m,15+2,2+2,h+h,13,3+8,2,2,3+1,2,p+1,x,5+4,5,a,2,2,3,u,c+2,g+1,5,2+1,4+1,5j,6+1,2,b,2+2,f,2+1,1s+2,2,3+1,7,1ez0,2,2+1,4+4,b,4,3,b,42,2+2,4,3,2+1,2,o+3,ae,ep,x,2o+2,3+1,3,5+1,6",L:"x9u,jff,a,fd,jv",T:"4t,gj+33,7o+4,1+1,7c+18,2,2+1,2+1,2,21+a,2,1b+k,h,2u+6,3+5,3+1,2+3,y,2,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,3,7,6+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+d,1,1+1,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,ek,3+1,r+4,1e+4,6+5,2p+c,1+3,1,1+2,1+b,2db+2,3y,2p+v,ff+3,30+1,n9x,1+2,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,5s,6y+2,ea,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+9,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2,2b+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,470+8,at4+4,1o+6,t5,1s+3,2a,f5l+1,2+3,43o+2,a+7,1+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,1,gzau,v+2n,3l+6n"},i=1,r=2,o=4,a=8,l=16,c=32;let u;function h(T){if(!u){const w={R:r,L:i,D:o,C:l,U:c,T:a};u=new Map;for(let M in n){let S=0;n[M].split(",").forEach(R=>{let[P,F]=R.split("+");P=parseInt(P,36),F=F?parseInt(F,36):0,u.set(S+=P,w[M]);for(let U=F;U--;)u.set(++S,w[M])})}}return u.get(T)||c}const f=1,d=2,p=3,v=4,g=[null,"isol","init","fina","medi"];function m(T){const w=new Uint8Array(T.length);let M=c,S=f,R=-1;for(let P=0;P<T.length;P++){const F=T.codePointAt(P);let U=h(F)|0,G=f;U&a||(M&(i|o|l)?U&(r|o|l)?(G=p,(S===f||S===p)&&w[R]++):U&(i|c)&&(S===d||S===v)&&w[R]--:M&(r|c)&&(S===d||S===v)&&w[R]--,S=w[P]=G,M=U,R=P,F>65535&&P++)}return w}function x(T,w){const M=[];for(let R=0;R<w.length;R++){const P=w.codePointAt(R);P>65535&&R++,M.push(s.U.codeToGlyph(T,P))}const S=T.GSUB;if(S){const{lookupList:R,featureList:P}=S;let F;const U=/^(rlig|liga|mset|isol|init|fina|medi|half|pres|blws|ccmp)$/,G=[];P.forEach(B=>{if(U.test(B.tag))for(let K=0;K<B.tab.length;K++){if(G[B.tab[K]])continue;G[B.tab[K]]=!0;const Y=R[B.tab[K]],le=/^(isol|init|fina|medi)$/.test(B.tag);le&&!F&&(F=m(w));for(let J=0;J<M.length;J++)(!F||!le||g[F[J]]===B.tag)&&s.U._applySubs(M,J,Y,R)}})}return M}function _(T,w){const M=new Int16Array(w.length*3);let S=0;for(;S<w.length;S++){const U=w[S];if(U===-1)continue;M[S*3+2]=T.hmtx.aWidth[U];const G=T.GPOS;if(G){const B=G.lookupList;for(let K=0;K<B.length;K++){const Y=B[K];for(let le=0;le<Y.tabs.length;le++){const J=Y.tabs[le];if(Y.ltype===1){if(s._lctf.coverageIndex(J.coverage,U)!==-1&&J.pos){F(J.pos,S);break}}else if(Y.ltype===2){let Z=null,re=R();if(re!==-1){const ne=s._lctf.coverageIndex(J.coverage,w[re]);if(ne!==-1){if(J.fmt===1){const $=J.pairsets[ne];for(let se=0;se<$.length;se++)$[se].gid2===U&&(Z=$[se])}else if(J.fmt===2){const $=s.U._getGlyphClass(w[re],J.classDef1),se=s.U._getGlyphClass(U,J.classDef2);Z=J.matrix[$][se]}if(Z){Z.val1&&F(Z.val1,re),Z.val2&&F(Z.val2,S);break}}}}else if(Y.ltype===4){const Z=s._lctf.coverageIndex(J.markCoverage,U);if(Z!==-1){const re=R(P),ne=re===-1?-1:s._lctf.coverageIndex(J.baseCoverage,w[re]);if(ne!==-1){const $=J.markArray[Z],se=J.baseArray[ne][$.markClass];M[S*3]=se.x-$.x+M[re*3]-M[re*3+2],M[S*3+1]=se.y-$.y+M[re*3+1];break}}}else if(Y.ltype===6){const Z=s._lctf.coverageIndex(J.mark1Coverage,U);if(Z!==-1){const re=R();if(re!==-1){const ne=w[re];if(y(T,ne)===3){const $=s._lctf.coverageIndex(J.mark2Coverage,ne);if($!==-1){const se=J.mark1Array[Z],fe=J.mark2Array[$][se.markClass];M[S*3]=fe.x-se.x+M[re*3]-M[re*3+2],M[S*3+1]=fe.y-se.y+M[re*3+1];break}}}}}}}}else if(T.kern&&!T.cff){const B=R();if(B!==-1){const K=T.kern.glyph1.indexOf(w[B]);if(K!==-1){const Y=T.kern.rval[K].glyph2.indexOf(U);Y!==-1&&(M[B*3+2]+=T.kern.rval[K].vals[Y])}}}}return M;function R(U){for(let G=S-1;G>=0;G--)if(w[G]!==-1&&(!U||U(w[G])))return G;return-1}function P(U){return y(T,U)===1}function F(U,G){for(let B=0;B<3;B++)M[G*3+B]+=U[B]||0}}function y(T,w){const M=T.GDEF&&T.GDEF.glyphClassDef;return M?s.U._getGlyphClass(w,M):0}function A(...T){for(let w=0;w<T.length;w++)if(typeof T[w]=="number")return T[w]}function b(T){const w=Object.create(null),M=T["OS/2"],S=T.hhea,R=T.head.unitsPerEm,P=A(M&&M.sTypoAscender,S&&S.ascender,R),F={unitsPerEm:R,ascender:P,descender:A(M&&M.sTypoDescender,S&&S.descender,0),capHeight:A(M&&M.sCapHeight,P),xHeight:A(M&&M.sxHeight,P),lineGap:A(M&&M.sTypoLineGap,S&&S.lineGap),supportsCodePoint(U){return s.U.codeToGlyph(T,U)>0},forEachGlyph(U,G,B,K){let Y=0;const le=1/F.unitsPerEm*G,J=x(T,U);let Z=0;const re=_(T,J);return J.forEach((ne,$)=>{if(ne!==-1){let se=w[ne];if(!se){const{cmds:fe,crds:me}=s.U.glyphToPath(T,ne);let Te="",qe=0;for(let N=0,Be=fe.length;N<Be;N++){const ye=t[fe[N]];Te+=fe[N];for(let Le=1;Le<=ye;Le++)Te+=(Le>1?",":"")+me[qe++]}let Fe,Se,ue,xe;if(me.length){Fe=Se=1/0,ue=xe=-1/0;for(let N=0,Be=me.length;N<Be;N+=2){let ye=me[N],Le=me[N+1];ye<Fe&&(Fe=ye),Le<Se&&(Se=Le),ye>ue&&(ue=ye),Le>xe&&(xe=Le)}}else Fe=ue=Se=xe=0;se=w[ne]={index:ne,advanceWidth:T.hmtx.aWidth[ne],xMin:Fe,yMin:Se,xMax:ue,yMax:xe,path:Te}}K.call(null,se,Y+re[$*3]*le,re[$*3+1]*le,Z),Y+=re[$*3+2]*le,B&&(Y+=B*G)}Z+=U.codePointAt(Z)>65535?2:1}),Y}};return F}return function(w){const M=new Uint8Array(w,0,4),S=s._bin.readASCII(M,0,4);if(S==="wOFF")w=e(w);else if(S==="wOF2")throw new Error("woff2 fonts not supported");return b(s.parse(w)[0])}}const hw=fo({name:"Typr Font Parser",dependencies:[lw,cw,uw],init(s,e,t){const n=s(),i=e();return t(n,i)}});/*!
Custom bundle of @unicode-font-resolver/client v1.0.2 (https://github.com/lojjic/unicode-font-resolver)
for use in Troika text rendering. 
Original MIT license applies
*/function fw(){return function(s){var e=function(){this.buckets=new Map};e.prototype.add=function(_){var y=_>>5;this.buckets.set(y,(this.buckets.get(y)||0)|1<<(31&_))},e.prototype.has=function(_){var y=this.buckets.get(_>>5);return y!==void 0&&(y&1<<(31&_))!=0},e.prototype.serialize=function(){var _=[];return this.buckets.forEach(function(y,A){_.push((+A).toString(36)+":"+y.toString(36))}),_.join(",")},e.prototype.deserialize=function(_){var y=this;this.buckets.clear(),_.split(",").forEach(function(A){var b=A.split(":");y.buckets.set(parseInt(b[0],36),parseInt(b[1],36))})};var t=Math.pow(2,8),n=t-1,i=~n;function r(_){var y=function(b){return b&i}(_).toString(16),A=function(b){return(b&i)+t-1}(_).toString(16);return"codepoint-index/plane"+(_>>16)+"/"+y+"-"+A+".json"}function o(_,y){var A=_&n,b=y.codePointAt(A/6|0);return((b=(b||48)-48)&1<<A%6)!=0}function a(_,y){var A;(A=_,A.replace(/U\+/gi,"").replace(/^,+|,+$/g,"").split(/,+/).map(function(b){return b.split("-").map(function(T){return parseInt(T.trim(),16)})})).forEach(function(b){var T=b[0],w=b[1];w===void 0&&(w=T),y(T,w)})}function l(_,y){a(_,function(A,b){for(var T=A;T<=b;T++)y(T)})}var c={},u={},h=new WeakMap,f="https://cdn.jsdelivr.net/gh/lojjic/unicode-font-resolver@v1.0.1/packages/data";function d(_){var y=h.get(_);return y||(y=new e,l(_.ranges,function(A){return y.add(A)}),h.set(_,y)),y}var p,v=new Map;function g(_,y,A){return _[y]?y:_[A]?A:function(b){for(var T in b)return T}(_)}function m(_,y){var A=y;if(!_.includes(A)){A=1/0;for(var b=0;b<_.length;b++)Math.abs(_[b]-y)<Math.abs(A-y)&&(A=_[b])}return A}function x(_){return p||(p=new Set,l("9-D,20,85,A0,1680,2000-200A,2028-202F,205F,3000",function(y){p.add(y)})),p.has(_)}return s.CodePointSet=e,s.clearCache=function(){c={},u={}},s.getFontsForString=function(_,y){y===void 0&&(y={});var A,b=y.lang;b===void 0&&(b=new RegExp("\\p{Script=Hangul}","u").test(A=_)?"ko":new RegExp("\\p{Script=Hiragana}|\\p{Script=Katakana}","u").test(A)?"ja":"en");var T=y.category;T===void 0&&(T="sans-serif");var w=y.style;w===void 0&&(w="normal");var M=y.weight;M===void 0&&(M=400);var S=(y.dataUrl||f).replace(/\/$/g,""),R=new Map,P=new Uint8Array(_.length),F={},U={},G=new Array(_.length),B=new Map,K=!1;function Y(Z){var re=v.get(Z);return re||(re=fetch(S+"/"+Z).then(function(ne){if(!ne.ok)throw new Error(ne.statusText);return ne.json().then(function($){if(!Array.isArray($)||$[0]!==1)throw new Error("Incorrect schema version; need 1, got "+$[0]);return $[1]})}).catch(function(ne){if(S!==f)return K||(K=!0),S=f,v.delete(Z),Y(Z);throw ne}),v.set(Z,re)),re}for(var le=function(Z){var re=_.codePointAt(Z),ne=r(re);G[Z]=ne,c[ne]||B.has(ne)||B.set(ne,Y(ne).then(function($){c[ne]=$})),re>65535&&(Z++,J=Z)},J=0;J<_.length;J++)le(J);return Promise.all(B.values()).then(function(){B.clear();for(var Z=function(ne){var $=_.codePointAt(ne),se=null,fe=c[G[ne]],me=void 0;for(var Te in fe){var qe=U[Te];if(qe===void 0&&(qe=U[Te]=new RegExp(Te).test(b||"en")),qe){for(var Fe in me=Te,fe[Te])if(o($,fe[Te][Fe])){se=Fe;break}break}}if(!se){e:for(var Se in fe)if(Se!==me){for(var ue in fe[Se])if(o($,fe[Se][ue])){se=ue;break e}}}se||(se="latin"),G[ne]=se,u[se]||B.has(se)||B.set(se,Y("font-meta/"+se+".json").then(function(xe){u[se]=xe})),$>65535&&(ne++,re=ne)},re=0;re<_.length;re++)Z(re);return Promise.all(B.values())}).then(function(){for(var Z,re=null,ne=0;ne<_.length;ne++){var $=_.codePointAt(ne);if(re&&(x($)||d(re).has($)))P[ne]=P[ne-1];else{re=u[G[ne]];var se=F[re.id];if(!se){var fe=re.typeforms,me=g(fe,T,"sans-serif"),Te=g(fe[me],w,"normal"),qe=m((Z=fe[me])===null||Z===void 0?void 0:Z[Te],M);se=F[re.id]=S+"/font-files/"+re.id+"/"+me+"."+Te+"."+qe+".woff"}var Fe=R.get(se);Fe==null&&(Fe=R.size,R.set(se,Fe)),P[ne]=Fe}$>65535&&(ne++,P[ne]=P[ne-1])}return{fontUrls:Array.from(R.keys()),chars:P}})},Object.defineProperty(s,"__esModule",{value:!0}),s}({})}function dw(s,e){const t=Object.create(null),n=Object.create(null);function i(o,a){const l=c=>{};try{const c=new XMLHttpRequest;c.open("get",o,!0),c.responseType="arraybuffer",c.onload=function(){if(c.status>=400)l(new Error(c.statusText));else if(c.status>0)try{const u=s(c.response);u.src=o,a(u)}catch(u){l(u)}},c.onerror=l,c.send()}catch(c){l(c)}}function r(o,a){let l=t[o];l?a(l):n[o]?n[o].push(a):(n[o]=[a],i(o,c=>{c.src=o,t[o]=c,n[o].forEach(u=>u(c)),delete n[o]}))}return function(o,a,{lang:l,fonts:c=[],style:u="normal",weight:h="normal",unicodeFontsURL:f}={}){const d=new Uint8Array(o.length),p=[];o.length||x();const v=new Map,g=[];if(u!=="italic"&&(u="normal"),typeof h!="number"&&(h=h==="bold"?700:400),c&&!Array.isArray(c)&&(c=[c]),c=c.slice().filter(y=>!y.lang||y.lang.test(l)).reverse(),c.length){let T=0;(function w(M=0){for(let S=M,R=o.length;S<R;S++){const P=o.codePointAt(S);if(T===1&&p[d[S-1]].supportsCodePoint(P)||S>0&&/\s/.test(o[S]))d[S]=d[S-1],T===2&&(g[g.length-1][1]=S);else for(let F=d[S],U=c.length;F<=U;F++)if(F===U){const G=T===2?g[g.length-1]:g[g.length]=[S,S];G[1]=S,T=2}else{d[S]=F;const{src:G,unicodeRange:B}=c[F];if(!B||_(P,B)){const K=t[G];if(!K){r(G,()=>{w(S)});return}if(K.supportsCodePoint(P)){let Y=v.get(K);typeof Y!="number"&&(Y=p.length,p.push(K),v.set(K,Y)),d[S]=Y,T=1;break}}}P>65535&&S+1<R&&(d[S+1]=d[S],S++,T===2&&(g[g.length-1][1]=S))}m()})()}else g.push([0,o.length-1]),m();function m(){if(g.length){const y=g.map(A=>o.substring(A[0],A[1]+1)).join(`
`);e.getFontsForString(y,{lang:l||void 0,style:u,weight:h,dataUrl:f}).then(({fontUrls:A,chars:b})=>{const T=p.length;let w=0;g.forEach(S=>{for(let R=0,P=S[1]-S[0];R<=P;R++)d[S[0]+R]=b[w++]+T;w++});let M=0;A.forEach((S,R)=>{r(S,P=>{p[R+T]=P,++M===A.length&&x()})})})}else x()}function x(){a({chars:d,fonts:p})}function _(y,A){for(let b=0;b<A.length;b++){const[T,w=T]=A[b];if(T<=y&&y<=w)return!0}return!1}}}const pw=fo({name:"FontResolver",dependencies:[dw,hw,fw],init(s,e,t){return s(e,t())}});function mw(s,e){const n=/[\u00AD\u034F\u061C\u115F-\u1160\u17B4-\u17B5\u180B-\u180E\u200B-\u200F\u202A-\u202E\u2060-\u206F\u3164\uFE00-\uFE0F\uFEFF\uFFA0\uFFF0-\uFFF8]/,i="[^\\S\\u00A0]",r=new RegExp(`${i}|[\\-\\u007C\\u00AD\\u2010\\u2012-\\u2014\\u2027\\u2056\\u2E17\\u2E40]`);function o({text:p,lang:v,fonts:g,style:m,weight:x,preResolvedFonts:_,unicodeFontsURL:y},A){const b=({chars:T,fonts:w})=>{let M,S;const R=[];for(let P=0;P<T.length;P++)T[P]!==S?(S=T[P],R.push(M={start:P,end:P,fontObj:w[T[P]]})):M.end=P;A(R)};_?b(_):s(p,b,{lang:v,fonts:g,style:m,weight:x,unicodeFontsURL:y})}function a({text:p="",font:v,lang:g,sdfGlyphSize:m=64,fontSize:x=400,fontWeight:_=1,fontStyle:y="normal",letterSpacing:A=0,lineHeight:b="normal",maxWidth:T=1/0,direction:w,textAlign:M="left",textIndent:S=0,whiteSpace:R="normal",overflowWrap:P="normal",anchorX:F=0,anchorY:U=0,metricsOnly:G=!1,unicodeFontsURL:B,preResolvedFonts:K=null,includeCaretPositions:Y=!1,chunkedBoundsSize:le=8192,colorRanges:J=null},Z){const re=h(),ne={fontLoad:0,typesetting:0};p.indexOf("\r")>-1&&(p=p.replace(/\r\n/g,`
`).replace(/\r/g,`
`)),x=+x,A=+A,T=+T,b=b||"normal",S=+S,o({text:p,lang:g,style:y,weight:_,fonts:typeof v=="string"?[{src:v}]:v,unicodeFontsURL:B,preResolvedFonts:K},$=>{ne.fontLoad=h()-re;const se=isFinite(T);let fe=null,me=null,Te=null,qe=null,Fe=null,Se=null,ue=null,xe=null,N=0,Be=0,ye=R!=="nowrap";const Le=new Map,Oe=h();let $e=S,Ne=0,O=new f;const I=[O];$.forEach(Ee=>{const{fontObj:Re}=Ee,{ascender:Ie,descender:Je,unitsPerEm:be,lineGap:Ge,capHeight:ke,xHeight:Xe}=Re;let Ce=Le.get(Re);if(!Ce){const j=x/be,ee=b==="normal"?(Ie-Je+Ge)*j:b*x,_e=(ee-(Ie-Je)*j)/2,Pe=Math.min(ee,(Ie-Je)*j),we=(Ie+Je)/2*j+Pe/2;Ce={index:Le.size,src:Re.src,fontObj:Re,fontSizeMult:j,unitsPerEm:be,ascender:Ie*j,descender:Je*j,capHeight:ke*j,xHeight:Xe*j,lineHeight:ee,baseline:-_e-Ie*j,caretTop:we,caretBottom:we-Pe},Le.set(Re,Ce)}const{fontSizeMult:H}=Ce,ae=p.slice(Ee.start,Ee.end+1);let Ae,X;Re.forEachGlyph(ae,x,A,(j,ee,_e,Pe)=>{ee+=Ne,Pe+=Ee.start,Ae=ee,X=j;const we=p.charAt(Pe),Ye=j.advanceWidth*H,ot=O.count;let Qe;if("isEmpty"in j||(j.isWhitespace=!!we&&new RegExp(i).test(we),j.canBreakAfter=!!we&&r.test(we),j.isEmpty=j.xMin===j.xMax||j.yMin===j.yMax||n.test(we)),!j.isWhitespace&&!j.isEmpty&&Be++,ye&&se&&!j.isWhitespace&&ee+Ye+$e>T&&ot){if(O.glyphAt(ot-1).glyphObj.canBreakAfter)Qe=new f,$e=-ee;else for(let Mt=ot;Mt--;)if(Mt===0&&P==="break-word"){Qe=new f,$e=-ee;break}else if(O.glyphAt(Mt).glyphObj.canBreakAfter){Qe=O.splitAt(Mt+1);const bt=Qe.glyphAt(0).x;$e-=bt;for(let Ot=Qe.count;Ot--;)Qe.glyphAt(Ot).x-=bt;break}Qe&&(O.isSoftWrapped=!0,O=Qe,I.push(O),N=T)}let et=O.glyphAt(O.count);et.glyphObj=j,et.x=ee+$e,et.y=_e,et.width=Ye,et.charIndex=Pe,et.fontData=Ce,we===`
`&&(O=new f,I.push(O),$e=-(ee+Ye+A*x)+S)}),Ne=Ae+X.advanceWidth*H+A*x});let Q=0;I.forEach(Ee=>{let Re=!0;for(let Ie=Ee.count;Ie--;){const Je=Ee.glyphAt(Ie);Re&&!Je.glyphObj.isWhitespace&&(Ee.width=Je.x+Je.width,Ee.width>N&&(N=Ee.width),Re=!1);let{lineHeight:be,capHeight:Ge,xHeight:ke,baseline:Xe}=Je.fontData;be>Ee.lineHeight&&(Ee.lineHeight=be);const Ce=Xe-Ee.baseline;Ce<0&&(Ee.baseline+=Ce,Ee.cap+=Ce,Ee.ex+=Ce),Ee.cap=Math.max(Ee.cap,Ee.baseline+Ge),Ee.ex=Math.max(Ee.ex,Ee.baseline+ke)}Ee.baseline-=Q,Ee.cap-=Q,Ee.ex-=Q,Q+=Ee.lineHeight});let he=0,ve=0;if(F&&(typeof F=="number"?he=-F:typeof F=="string"&&(he=-N*(F==="left"?0:F==="center"?.5:F==="right"?1:c(F)))),U&&(typeof U=="number"?ve=-U:typeof U=="string"&&(ve=U==="top"?0:U==="top-baseline"?-I[0].baseline:U==="top-cap"?-I[0].cap:U==="top-ex"?-I[0].ex:U==="middle"?Q/2:U==="bottom"?Q:U==="bottom-baseline"?-I[I.length-1].baseline:c(U)*Q)),!G){const Ee=e.getEmbeddingLevels(p,w);fe=new Uint16Array(Be),me=new Uint8Array(Be),Te=new Float32Array(Be*2),qe={},ue=[1/0,1/0,-1/0,-1/0],xe=[],Y&&(Se=new Float32Array(p.length*4)),J&&(Fe=new Uint8Array(Be*3));let Re=0,Ie=-1,Je=-1,be,Ge;if(I.forEach((ke,Xe)=>{let{count:Ce,width:H}=ke;if(Ce>0){let ae=0;for(let Pe=Ce;Pe--&&ke.glyphAt(Pe).glyphObj.isWhitespace;)ae++;let Ae=0,X=0;if(M==="center")Ae=(N-H)/2;else if(M==="right")Ae=N-H;else if(M==="justify"&&ke.isSoftWrapped){let Pe=0;for(let we=Ce-ae;we--;)ke.glyphAt(we).glyphObj.isWhitespace&&Pe++;X=(N-H)/Pe}if(X||Ae){let Pe=0;for(let we=0;we<Ce;we++){let Ye=ke.glyphAt(we);const ot=Ye.glyphObj;Ye.x+=Ae+Pe,X!==0&&ot.isWhitespace&&we<Ce-ae&&(Pe+=X,Ye.width+=X)}}const j=e.getReorderSegments(p,Ee,ke.glyphAt(0).charIndex,ke.glyphAt(ke.count-1).charIndex);for(let Pe=0;Pe<j.length;Pe++){const[we,Ye]=j[Pe];let ot=1/0,Qe=-1/0;for(let et=0;et<Ce;et++)if(ke.glyphAt(et).charIndex>=we){let Mt=et,bt=et;for(;bt<Ce;bt++){let Ot=ke.glyphAt(bt);if(Ot.charIndex>Ye)break;bt<Ce-ae&&(ot=Math.min(ot,Ot.x),Qe=Math.max(Qe,Ot.x+Ot.width))}for(let Ot=Mt;Ot<bt;Ot++){const Dn=ke.glyphAt(Ot);Dn.x=Qe-(Dn.x+Dn.width-ot)}break}}let ee;const _e=Pe=>ee=Pe;for(let Pe=0;Pe<Ce;Pe++){const we=ke.glyphAt(Pe);ee=we.glyphObj;const Ye=ee.index,ot=Ee.levels[we.charIndex]&1;if(ot){const Qe=e.getMirroredCharacter(p[we.charIndex]);Qe&&we.fontData.fontObj.forEachGlyph(Qe,0,0,_e)}if(Y){const{charIndex:Qe,fontData:et}=we,Mt=we.x+he,bt=we.x+we.width+he;Se[Qe*4]=ot?bt:Mt,Se[Qe*4+1]=ot?Mt:bt,Se[Qe*4+2]=ke.baseline+et.caretBottom+ve,Se[Qe*4+3]=ke.baseline+et.caretTop+ve;const Ot=Qe-Ie;Ot>1&&u(Se,Ie,Ot),Ie=Qe}if(J){const{charIndex:Qe}=we;for(;Qe>Je;)Je++,J.hasOwnProperty(Je)&&(Ge=J[Je])}if(!ee.isWhitespace&&!ee.isEmpty){const Qe=Re++,{fontSizeMult:et,src:Mt,index:bt}=we.fontData,Ot=qe[Mt]||(qe[Mt]={});Ot[Ye]||(Ot[Ye]={path:ee.path,pathBounds:[ee.xMin,ee.yMin,ee.xMax,ee.yMax]});const Dn=we.x+he,nn=we.y+ke.baseline+ve;Te[Qe*2]=Dn,Te[Qe*2+1]=nn;const Zn=Dn+ee.xMin*et,wn=nn+ee.yMin*et,En=Dn+ee.xMax*et,at=nn+ee.yMax*et;Zn<ue[0]&&(ue[0]=Zn),wn<ue[1]&&(ue[1]=wn),En>ue[2]&&(ue[2]=En),at>ue[3]&&(ue[3]=at),Qe%le===0&&(be={start:Qe,end:Qe,rect:[1/0,1/0,-1/0,-1/0]},xe.push(be)),be.end++;const _n=be.rect;if(Zn<_n[0]&&(_n[0]=Zn),wn<_n[1]&&(_n[1]=wn),En>_n[2]&&(_n[2]=En),at>_n[3]&&(_n[3]=at),fe[Qe]=Ye,me[Qe]=bt,J){const $n=Qe*3;Fe[$n]=Ge>>16&255,Fe[$n+1]=Ge>>8&255,Fe[$n+2]=Ge&255}}}}}),Se){const ke=p.length-Ie;ke>1&&u(Se,Ie,ke)}}const ge=[];Le.forEach(({index:Ee,src:Re,unitsPerEm:Ie,ascender:Je,descender:be,lineHeight:Ge,capHeight:ke,xHeight:Xe})=>{ge[Ee]={src:Re,unitsPerEm:Ie,ascender:Je,descender:be,lineHeight:Ge,capHeight:ke,xHeight:Xe}}),ne.typesetting=h()-Oe,Z({glyphIds:fe,glyphFontIndices:me,glyphPositions:Te,glyphData:qe,fontData:ge,caretPositions:Se,glyphColors:Fe,chunkedBounds:xe,fontSize:x,topBaseline:ve+I[0].baseline,blockBounds:[he,ve-Q,he+N,ve],visibleBounds:ue,timings:ne})})}function l(p,v){a({...p,metricsOnly:!0},g=>{const[m,x,_,y]=g.blockBounds;v({width:_-m,height:y-x})})}function c(p){let v=p.match(/^([\d.]+)%$/),g=v?parseFloat(v[1]):NaN;return isNaN(g)?0:g/100}function u(p,v,g){const m=p[v*4],x=p[v*4+1],_=p[v*4+2],y=p[v*4+3],A=(x-m)/g;for(let b=0;b<g;b++){const T=(v+b)*4;p[T]=m+A*b,p[T+1]=m+A*(b+1),p[T+2]=_,p[T+3]=y}}function h(){return(self.performance||Date).now()}function f(){this.data=[]}const d=["glyphObj","x","y","width","charIndex","fontData"];return f.prototype={width:0,lineHeight:0,baseline:0,cap:0,ex:0,isSoftWrapped:!1,get count(){return Math.ceil(this.data.length/d.length)},glyphAt(p){let v=f.flyweight;return v.data=this.data,v.index=p,v},splitAt(p){let v=new f;return v.data=this.data.splice(p*d.length),v}},f.flyweight=d.reduce((p,v,g,m)=>(Object.defineProperty(p,v,{get(){return this.data[this.index*d.length+g]},set(x){this.data[this.index*d.length+g]=x}}),p),{data:null,index:0}),{typeset:a,measure:l}}const _r=()=>(self.performance||Date).now(),nc=jd();let kd;function gw(s,e,t,n,i,r,o,a,l,c,u=!0){return u?_w(s,e,t,n,i,r,o,a,l,c).then(null,h=>(kd||(kd=!0),Gd(s,e,t,n,i,r,o,a,l,c))):Gd(s,e,t,n,i,r,o,a,l,c)}const La=[],vw=5;let Ru=0;function _g(){const s=_r();for(;La.length&&_r()-s<vw;)La.shift()();Ru=La.length?setTimeout(_g,0):0}const _w=(...s)=>new Promise((e,t)=>{La.push(()=>{const n=_r();try{nc.webgl.generateIntoCanvas(...s),e({timing:_r()-n})}catch(i){t(i)}}),Ru||(Ru=setTimeout(_g,0))}),xw=4,yw=2e3,zd={};let Sw=0;function Gd(s,e,t,n,i,r,o,a,l,c){const u="TroikaTextSDFGenerator_JS_"+Sw++%xw;let h=zd[u];return h||(h=zd[u]={workerModule:fo({name:u,workerId:u,dependencies:[jd,_r],init(f,d){const p=f().javascript.generate;return function(...v){const g=d();return{textureData:p(...v),timing:d()-g}}},getTransferables(f){return[f.textureData.buffer]}}),requests:0,idleTimer:null}),h.requests++,clearTimeout(h.idleTimer),h.workerModule(s,e,t,n,i,r).then(({textureData:f,timing:d})=>{const p=_r(),v=new Uint8Array(f.length*4);for(let g=0;g<f.length;g++)v[g*4+c]=f[g];return nc.webglUtils.renderImageData(o,v,a,l,s,e,1<<3-c),d+=_r()-p,--h.requests===0&&(h.idleTimer=setTimeout(()=>{Bg(u)},yw)),{timing:d}})}function Mw(s){s._warm||(nc.webgl.isSupported(s),s._warm=!0)}const bw=nc.webglUtils.resizeWebGLCanvasWithoutClearing,Jr={defaultFontURL:null,unicodeFontsURL:null,sdfGlyphSize:64,sdfMargin:1/16,sdfExponent:9,textureWidth:2048,useWorker:!0},ww=new We;function Zr(){return(self.performance||Date).now()}const Vd=Object.create(null);function xg(s,e){s=Aw({},s);const t=Zr(),{defaultFontURL:n}=Jr,i=[];if(n&&i.push({label:"default",src:Hd(n)}),s.font&&i.push({label:"user",src:Hd(s.font)}),s.font=i,s.text=""+s.text,s.sdfGlyphSize=s.sdfGlyphSize||Jr.sdfGlyphSize,s.unicodeFontsURL=s.unicodeFontsURL||Jr.unicodeFontsURL,s.colorRanges!=null){let d={};for(let p in s.colorRanges)if(s.colorRanges.hasOwnProperty(p)){let v=s.colorRanges[p];typeof v!="number"&&(v=ww.set(v).getHex()),d[p]=v}s.colorRanges=d}Object.freeze(s);const{textureWidth:r,sdfExponent:o}=Jr,{sdfGlyphSize:a}=s,l=r/a*4;let c=Vd[a];if(!c){const d=document.createElement("canvas");d.width=r,d.height=a*256/l,c=Vd[a]={glyphCount:0,sdfGlyphSize:a,sdfCanvas:d,sdfTexture:new Ft(d,void 0,void 0,void 0,Ut,Ut),contextLost:!1,glyphsByFont:new Map},c.sdfTexture.generateMipmaps=!1,Ew(c)}const{sdfTexture:u,sdfCanvas:h}=c;Mg(s).then(d=>{const{glyphIds:p,glyphFontIndices:v,fontData:g,glyphPositions:m,fontSize:x,timings:_}=d,y=[],A=new Float32Array(p.length*4);let b=0,T=0;const w=Zr(),M=g.map(U=>{let G=c.glyphsByFont.get(U.src);return G||c.glyphsByFont.set(U.src,G=new Map),G});p.forEach((U,G)=>{const B=v[G],{src:K,unitsPerEm:Y}=g[B];let le=M[B].get(U);if(!le){const{path:$,pathBounds:se}=d.glyphData[K][U],fe=Math.max(se[2]-se[0],se[3]-se[1])/a*(Jr.sdfMargin*a+.5),me=c.glyphCount++,Te=[se[0]-fe,se[1]-fe,se[2]+fe,se[3]+fe];M[B].set(U,le={path:$,atlasIndex:me,sdfViewBox:Te}),y.push(le)}const{sdfViewBox:J}=le,Z=m[T++],re=m[T++],ne=x/Y;A[b++]=Z+J[0]*ne,A[b++]=re+J[1]*ne,A[b++]=Z+J[2]*ne,A[b++]=re+J[3]*ne,p[G]=le.atlasIndex}),_.quads=(_.quads||0)+(Zr()-w);const S=Zr();_.sdf={};const R=h.height,P=Math.ceil(c.glyphCount/l),F=Math.pow(2,Math.ceil(Math.log2(P*a)));F>R&&(bw(h,r,F),u.dispose()),Promise.all(y.map(U=>yg(U,c,s.gpuAccelerateSDF).then(({timing:G})=>{_.sdf[U.atlasIndex]=G}))).then(()=>{y.length&&!c.contextLost&&(Sg(c),u.needsUpdate=!0),_.sdfTotal=Zr()-S,_.total=Zr()-t,e(Object.freeze({parameters:s,sdfTexture:u,sdfGlyphSize:a,sdfExponent:o,glyphBounds:A,glyphAtlasIndices:p,glyphColors:d.glyphColors,caretPositions:d.caretPositions,chunkedBounds:d.chunkedBounds,ascender:d.ascender,descender:d.descender,lineHeight:d.lineHeight,capHeight:d.capHeight,xHeight:d.xHeight,topBaseline:d.topBaseline,blockBounds:d.blockBounds,visibleBounds:d.visibleBounds,timings:d.timings}))})}),Promise.resolve().then(()=>{c.contextLost||Mw(h)})}function yg({path:s,atlasIndex:e,sdfViewBox:t},{sdfGlyphSize:n,sdfCanvas:i,contextLost:r},o){if(r)return Promise.resolve({timing:-1});const{textureWidth:a,sdfExponent:l}=Jr,c=Math.max(t[2]-t[0],t[3]-t[1]),u=Math.floor(e/4),h=u%(a/n)*n,f=Math.floor(u/(a/n))*n,d=e%4;return gw(n,n,s,t,c,l,i,h,f,d,o)}function Ew(s){const e=s.sdfCanvas;e.addEventListener("webglcontextlost",t=>{t.preventDefault(),s.contextLost=!0}),e.addEventListener("webglcontextrestored",t=>{s.contextLost=!1;const n=[];s.glyphsByFont.forEach(i=>{i.forEach(r=>{n.push(yg(r,s,!0))})}),Promise.all(n).then(()=>{Sg(s),s.sdfTexture.needsUpdate=!0})})}function Tw({font:s,characters:e,sdfGlyphSize:t},n){let i=Array.isArray(e)?e.join(`
`):""+e;xg({font:s,sdfGlyphSize:t,text:i},n)}function Aw(s,e){for(let t in e)e.hasOwnProperty(t)&&(s[t]=e[t]);return s}let Ra;function Hd(s){return Ra||(Ra=typeof document>"u"?{}:document.createElement("a")),Ra.href=s,Ra.href}function Sg(s){if(typeof createImageBitmap!="function"){const{sdfCanvas:e,sdfTexture:t}=s,{width:n,height:i}=e,r=s.sdfCanvas.getContext("webgl");let o=t.image.data;(!o||o.length!==n*i*4)&&(o=new Uint8Array(n*i*4),t.image={width:n,height:i,data:o},t.flipY=!1,t.isDataTexture=!0),r.readPixels(0,0,n,i,r.RGBA,r.UNSIGNED_BYTE,o)}}const Cw=fo({name:"Typesetter",dependencies:[mw,pw,kg],init(s,e,t){return s(e,t())}}),Mg=fo({name:"Typesetter",dependencies:[Cw],init(s){return function(e){return new Promise(t=>{s.typeset(e,t)})}},getTransferables(s){const e=[];for(let t in s)s[t]&&s[t].buffer&&e.push(s[t].buffer);return e}});Mg.onMainThread;const Wd={};function Rw(s){let e=Wd[s];return e||(e=Wd[s]=new ai(1,1,s,s).translate(.5,.5,0)),e}const Iw="aTroikaGlyphBounds",Xd="aTroikaGlyphIndex",Pw="aTroikaGlyphColor";class Uw extends ec{constructor(){super(),this.detail=1,this.curveRadius=0,this.groups=[{start:0,count:1/0,materialIndex:0},{start:0,count:1/0,materialIndex:1}],this.boundingSphere=new qt,this.boundingBox=new Xt}computeBoundingSphere(){}computeBoundingBox(){}set detail(e){if(e!==this._detail){this._detail=e,(typeof e!="number"||e<1)&&(e=1);let t=Rw(e);["position","normal","uv"].forEach(n=>{this.attributes[n]=t.attributes[n].clone()}),this.setIndex(t.getIndex().clone())}}get detail(){return this._detail}set curveRadius(e){e!==this._curveRadius&&(this._curveRadius=e,this._updateBounds())}get curveRadius(){return this._curveRadius}updateGlyphs(e,t,n,i,r){this.updateAttributeData(Iw,e,4),this.updateAttributeData(Xd,t,1),this.updateAttributeData(Pw,r,3),this._blockBounds=n,this._chunkedBounds=i,this.instanceCount=t.length,this._updateBounds()}_updateBounds(){const e=this._blockBounds;if(e){const{curveRadius:t,boundingBox:n}=this;if(t){const{PI:i,floor:r,min:o,max:a,sin:l,cos:c}=Math,u=i/2,h=i*2,f=Math.abs(t),d=e[0]/f,p=e[2]/f,v=r((d+u)/h)!==r((p+u)/h)?-f:o(l(d)*f,l(p)*f),g=r((d-u)/h)!==r((p-u)/h)?f:a(l(d)*f,l(p)*f),m=r((d+i)/h)!==r((p+i)/h)?f*2:a(f-c(d)*f,f-c(p)*f);n.min.set(v,e[1],t<0?-m:0),n.max.set(g,e[3],t<0?0:m)}else n.min.set(e[0],e[1],0),n.max.set(e[2],e[3],0);n.getBoundingSphere(this.boundingSphere)}}applyClipRect(e){let t=this.getAttribute(Xd).count,n=this._chunkedBounds;if(n)for(let i=n.length;i--;){t=n[i].end;let r=n[i].rect;if(r[1]<e.w&&r[3]>e.y&&r[0]<e.z&&r[2]>e.x)break}this.instanceCount=t}updateAttributeData(e,t,n){const i=this.getAttribute(e);t?i&&i.array.length===t.length?(i.array.set(t),i.needsUpdate=!0):(this.setAttribute(e,new Mr(t,n)),delete this._maxInstanceCount,this.dispose()):i&&this.deleteAttribute(e)}}const Dw=`
uniform vec2 uTroikaSDFTextureSize;
uniform float uTroikaSDFGlyphSize;
uniform vec4 uTroikaTotalBounds;
uniform vec4 uTroikaClipRect;
uniform mat3 uTroikaOrient;
uniform bool uTroikaUseGlyphColors;
uniform float uTroikaEdgeOffset;
uniform float uTroikaBlurRadius;
uniform vec2 uTroikaPositionOffset;
uniform float uTroikaCurveRadius;
attribute vec4 aTroikaGlyphBounds;
attribute float aTroikaGlyphIndex;
attribute vec3 aTroikaGlyphColor;
varying vec2 vTroikaGlyphUV;
varying vec4 vTroikaTextureUVBounds;
varying float vTroikaTextureChannel;
varying vec3 vTroikaGlyphColor;
varying vec2 vTroikaGlyphDimensions;
`,Lw=`
vec4 bounds = aTroikaGlyphBounds;
bounds.xz += uTroikaPositionOffset.x;
bounds.yw -= uTroikaPositionOffset.y;

vec4 outlineBounds = vec4(
  bounds.xy - uTroikaEdgeOffset - uTroikaBlurRadius,
  bounds.zw + uTroikaEdgeOffset + uTroikaBlurRadius
);
vec4 clippedBounds = vec4(
  clamp(outlineBounds.xy, uTroikaClipRect.xy, uTroikaClipRect.zw),
  clamp(outlineBounds.zw, uTroikaClipRect.xy, uTroikaClipRect.zw)
);

vec2 clippedXY = (mix(clippedBounds.xy, clippedBounds.zw, position.xy) - bounds.xy) / (bounds.zw - bounds.xy);

position.xy = mix(bounds.xy, bounds.zw, clippedXY);

uv = (position.xy - uTroikaTotalBounds.xy) / (uTroikaTotalBounds.zw - uTroikaTotalBounds.xy);

float rad = uTroikaCurveRadius;
if (rad != 0.0) {
  float angle = position.x / rad;
  position.xz = vec2(sin(angle) * rad, rad - cos(angle) * rad);
  normal.xz = vec2(sin(angle), cos(angle));
}
  
position = uTroikaOrient * position;
normal = uTroikaOrient * normal;

vTroikaGlyphUV = clippedXY.xy;
vTroikaGlyphDimensions = vec2(bounds[2] - bounds[0], bounds[3] - bounds[1]);


float txCols = uTroikaSDFTextureSize.x / uTroikaSDFGlyphSize;
vec2 txUvPerSquare = uTroikaSDFGlyphSize / uTroikaSDFTextureSize;
vec2 txStartUV = txUvPerSquare * vec2(
  mod(floor(aTroikaGlyphIndex / 4.0), txCols),
  floor(floor(aTroikaGlyphIndex / 4.0) / txCols)
);
vTroikaTextureUVBounds = vec4(txStartUV, vec2(txStartUV) + txUvPerSquare);
vTroikaTextureChannel = mod(aTroikaGlyphIndex, 4.0);
`,Fw=`
uniform sampler2D uTroikaSDFTexture;
uniform vec2 uTroikaSDFTextureSize;
uniform float uTroikaSDFGlyphSize;
uniform float uTroikaSDFExponent;
uniform float uTroikaEdgeOffset;
uniform float uTroikaFillOpacity;
uniform float uTroikaBlurRadius;
uniform vec3 uTroikaStrokeColor;
uniform float uTroikaStrokeWidth;
uniform float uTroikaStrokeOpacity;
uniform bool uTroikaSDFDebug;
varying vec2 vTroikaGlyphUV;
varying vec4 vTroikaTextureUVBounds;
varying float vTroikaTextureChannel;
varying vec2 vTroikaGlyphDimensions;

float troikaSdfValueToSignedDistance(float alpha) {
  // Inverse of exponential encoding in webgl-sdf-generator
  
  float maxDimension = max(vTroikaGlyphDimensions.x, vTroikaGlyphDimensions.y);
  float absDist = (1.0 - pow(2.0 * (alpha > 0.5 ? 1.0 - alpha : alpha), 1.0 / uTroikaSDFExponent)) * maxDimension;
  float signedDist = absDist * (alpha > 0.5 ? -1.0 : 1.0);
  return signedDist;
}

float troikaGlyphUvToSdfValue(vec2 glyphUV) {
  vec2 textureUV = mix(vTroikaTextureUVBounds.xy, vTroikaTextureUVBounds.zw, glyphUV);
  vec4 rgba = texture2D(uTroikaSDFTexture, textureUV);
  float ch = floor(vTroikaTextureChannel + 0.5); //NOTE: can't use round() in WebGL1
  return ch == 0.0 ? rgba.r : ch == 1.0 ? rgba.g : ch == 2.0 ? rgba.b : rgba.a;
}

float troikaGlyphUvToDistance(vec2 uv) {
  return troikaSdfValueToSignedDistance(troikaGlyphUvToSdfValue(uv));
}

float troikaGetAADist() {
  
  #if defined(GL_OES_standard_derivatives) || __VERSION__ >= 300
  return length(fwidth(vTroikaGlyphUV * vTroikaGlyphDimensions)) * 0.5;
  #else
  return vTroikaGlyphDimensions.x / 64.0;
  #endif
}

float troikaGetFragDistValue() {
  vec2 clampedGlyphUV = clamp(vTroikaGlyphUV, 0.5 / uTroikaSDFGlyphSize, 1.0 - 0.5 / uTroikaSDFGlyphSize);
  float distance = troikaGlyphUvToDistance(clampedGlyphUV);
 
  // Extrapolate distance when outside bounds:
  distance += clampedGlyphUV == vTroikaGlyphUV ? 0.0 : 
    length((vTroikaGlyphUV - clampedGlyphUV) * vTroikaGlyphDimensions);

  

  return distance;
}

float troikaGetEdgeAlpha(float distance, float distanceOffset, float aaDist) {
  #if defined(IS_DEPTH_MATERIAL) || defined(IS_DISTANCE_MATERIAL)
  float alpha = step(-distanceOffset, -distance);
  #else

  float alpha = smoothstep(
    distanceOffset + aaDist,
    distanceOffset - aaDist,
    distance
  );
  #endif

  return alpha;
}
`,Ow=`
float aaDist = troikaGetAADist();
float fragDistance = troikaGetFragDistValue();
float edgeAlpha = uTroikaSDFDebug ?
  troikaGlyphUvToSdfValue(vTroikaGlyphUV) :
  troikaGetEdgeAlpha(fragDistance, uTroikaEdgeOffset, max(aaDist, uTroikaBlurRadius));

#if !defined(IS_DEPTH_MATERIAL) && !defined(IS_DISTANCE_MATERIAL)
vec4 fillRGBA = gl_FragColor;
fillRGBA.a *= uTroikaFillOpacity;
vec4 strokeRGBA = uTroikaStrokeWidth == 0.0 ? fillRGBA : vec4(uTroikaStrokeColor, uTroikaStrokeOpacity);
if (fillRGBA.a == 0.0) fillRGBA.rgb = strokeRGBA.rgb;
gl_FragColor = mix(fillRGBA, strokeRGBA, smoothstep(
  -uTroikaStrokeWidth - aaDist,
  -uTroikaStrokeWidth + aaDist,
  fragDistance
));
gl_FragColor.a *= edgeAlpha;
#endif

if (edgeAlpha == 0.0) {
  discard;
}
`;function Nw(s){const e=Cu(s,{chained:!0,extensions:{derivatives:!0},uniforms:{uTroikaSDFTexture:{value:null},uTroikaSDFTextureSize:{value:new pe},uTroikaSDFGlyphSize:{value:0},uTroikaSDFExponent:{value:0},uTroikaTotalBounds:{value:new dt(0,0,0,0)},uTroikaClipRect:{value:new dt(0,0,0,0)},uTroikaEdgeOffset:{value:0},uTroikaFillOpacity:{value:1},uTroikaPositionOffset:{value:new pe},uTroikaCurveRadius:{value:0},uTroikaBlurRadius:{value:0},uTroikaStrokeWidth:{value:0},uTroikaStrokeColor:{value:new We},uTroikaStrokeOpacity:{value:1},uTroikaOrient:{value:new ct},uTroikaUseGlyphColors:{value:!0},uTroikaSDFDebug:{value:!1}},vertexDefs:Dw,vertexTransform:Lw,fragmentDefs:Fw,fragmentColorTransform:Ow,customRewriter({vertexShader:t,fragmentShader:n}){let i=/\buniform\s+vec3\s+diffuse\b/;return i.test(n)&&(n=n.replace(i,"varying vec3 vTroikaGlyphColor").replace(/\bdiffuse\b/g,"vTroikaGlyphColor"),i.test(t)||(t=t.replace(vg,`uniform vec3 diffuse;
$&
vTroikaGlyphColor = uTroikaUseGlyphColors ? aTroikaGlyphColor / 255.0 : diffuse;
`))),{vertexShader:t,fragmentShader:n}}});return e.transparent=!0,e.forceSinglePass=!0,Object.defineProperties(e,{isTroikaTextMaterial:{value:!0},shadowSide:{get(){return this.side},set(){}}}),e}const Rh=new Ei({color:16777215,side:Cn,transparent:!0}),qd=8421504,Yd=new rt,Ia=new L,su=new L,Us=[],Bw=new L,ou="+x+y";function Zd(s){return Array.isArray(s)?s[0]:s}let bg=()=>{const s=new Rt(new ai(1,1),Rh);return bg=()=>s,s},wg=()=>{const s=new Rt(new ai(1,1,32,1),Rh);return wg=()=>s,s};const kw={type:"syncstart"},zw={type:"synccomplete"},Eg=["font","fontSize","fontStyle","fontWeight","lang","letterSpacing","lineHeight","maxWidth","overflowWrap","text","direction","textAlign","textIndent","whiteSpace","anchorX","anchorY","colorRanges","sdfGlyphSize"],Gw=Eg.concat("material","color","depthOffset","clipRect","curveRadius","orientation","glyphGeometryDetail");let Tg=class extends Rt{constructor(){const e=new Uw;super(e,null),this.text="",this.anchorX=0,this.anchorY=0,this.curveRadius=0,this.direction="auto",this.font=null,this.unicodeFontsURL=null,this.fontSize=.1,this.fontWeight="normal",this.fontStyle="normal",this.lang=null,this.letterSpacing=0,this.lineHeight="normal",this.maxWidth=1/0,this.overflowWrap="normal",this.textAlign="left",this.textIndent=0,this.whiteSpace="normal",this.material=null,this.color=null,this.colorRanges=null,this.outlineWidth=0,this.outlineColor=0,this.outlineOpacity=1,this.outlineBlur=0,this.outlineOffsetX=0,this.outlineOffsetY=0,this.strokeWidth=0,this.strokeColor=qd,this.strokeOpacity=1,this.fillOpacity=1,this.depthOffset=0,this.clipRect=null,this.orientation=ou,this.glyphGeometryDetail=1,this.sdfGlyphSize=null,this.gpuAccelerateSDF=!0,this.debugSDF=!1}sync(e){this._needsSync&&(this._needsSync=!1,this._isSyncing?(this._queuedSyncs||(this._queuedSyncs=[])).push(e):(this._isSyncing=!0,this.dispatchEvent(kw),xg({text:this.text,font:this.font,lang:this.lang,fontSize:this.fontSize||.1,fontWeight:this.fontWeight||"normal",fontStyle:this.fontStyle||"normal",letterSpacing:this.letterSpacing||0,lineHeight:this.lineHeight||"normal",maxWidth:this.maxWidth,direction:this.direction||"auto",textAlign:this.textAlign,textIndent:this.textIndent,whiteSpace:this.whiteSpace,overflowWrap:this.overflowWrap,anchorX:this.anchorX,anchorY:this.anchorY,colorRanges:this.colorRanges,includeCaretPositions:!0,sdfGlyphSize:this.sdfGlyphSize,gpuAccelerateSDF:this.gpuAccelerateSDF,unicodeFontsURL:this.unicodeFontsURL},t=>{this._isSyncing=!1,this._textRenderInfo=t,this.geometry.updateGlyphs(t.glyphBounds,t.glyphAtlasIndices,t.blockBounds,t.chunkedBounds,t.glyphColors);const n=this._queuedSyncs;n&&(this._queuedSyncs=null,this._needsSync=!0,this.sync(()=>{n.forEach(i=>i&&i())})),this.dispatchEvent(zw),e&&e()})))}onBeforeRender(e,t,n,i,r,o){this.sync(),r.isTroikaTextMaterial&&this._prepareForRender(r)}dispose(){this.geometry.dispose()}get textRenderInfo(){return this._textRenderInfo||null}createDerivedMaterial(e){return Nw(e)}get material(){let e=this._derivedMaterial;const t=this._baseMaterial||this._defaultMaterial||(this._defaultMaterial=Rh.clone());if((!e||!e.isDerivedFrom(t))&&(e=this._derivedMaterial=this.createDerivedMaterial(t),t.addEventListener("dispose",function n(){t.removeEventListener("dispose",n),e.dispose()})),this.hasOutline()){let n=e._outlineMtl;return n||(n=e._outlineMtl=Object.create(e,{id:{value:e.id+.1}}),n.isTextOutlineMaterial=!0,n.depthWrite=!1,n.map=null,e.addEventListener("dispose",function i(){e.removeEventListener("dispose",i),n.dispose()})),[n,e]}else return e}set material(e){e&&e.isTroikaTextMaterial?(this._derivedMaterial=e,this._baseMaterial=e.baseMaterial):this._baseMaterial=e}hasOutline(){return!!(this.outlineWidth||this.outlineBlur||this.outlineOffsetX||this.outlineOffsetY)}get glyphGeometryDetail(){return this.geometry.detail}set glyphGeometryDetail(e){this.geometry.detail=e}get curveRadius(){return this.geometry.curveRadius}set curveRadius(e){this.geometry.curveRadius=e}get customDepthMaterial(){return Zd(this.material).getDepthMaterial()}set customDepthMaterial(e){}get customDistanceMaterial(){return Zd(this.material).getDistanceMaterial()}set customDistanceMaterial(e){}_prepareForRender(e){const t=e.isTextOutlineMaterial,n=e.uniforms,i=this.textRenderInfo;if(i){const{sdfTexture:a,blockBounds:l}=i;n.uTroikaSDFTexture.value=a,n.uTroikaSDFTextureSize.value.set(a.image.width,a.image.height),n.uTroikaSDFGlyphSize.value=i.sdfGlyphSize,n.uTroikaSDFExponent.value=i.sdfExponent,n.uTroikaTotalBounds.value.fromArray(l),n.uTroikaUseGlyphColors.value=!t&&!!i.glyphColors;let c=0,u=0,h=0,f,d,p,v=0,g=0;if(t){let{outlineWidth:x,outlineOffsetX:_,outlineOffsetY:y,outlineBlur:A,outlineOpacity:b}=this;c=this._parsePercent(x)||0,u=Math.max(0,this._parsePercent(A)||0),f=b,v=this._parsePercent(_)||0,g=this._parsePercent(y)||0}else h=Math.max(0,this._parsePercent(this.strokeWidth)||0),h&&(p=this.strokeColor,n.uTroikaStrokeColor.value.set(p??qd),d=this.strokeOpacity,d==null&&(d=1)),f=this.fillOpacity;n.uTroikaEdgeOffset.value=c,n.uTroikaPositionOffset.value.set(v,g),n.uTroikaBlurRadius.value=u,n.uTroikaStrokeWidth.value=h,n.uTroikaStrokeOpacity.value=d,n.uTroikaFillOpacity.value=f??1,n.uTroikaCurveRadius.value=this.curveRadius||0;let m=this.clipRect;if(m&&Array.isArray(m)&&m.length===4)n.uTroikaClipRect.value.fromArray(m);else{const x=(this.fontSize||.1)*100;n.uTroikaClipRect.value.set(l[0]-x,l[1]-x,l[2]+x,l[3]+x)}this.geometry.applyClipRect(n.uTroikaClipRect.value)}n.uTroikaSDFDebug.value=!!this.debugSDF,e.polygonOffset=!!this.depthOffset,e.polygonOffsetFactor=e.polygonOffsetUnits=this.depthOffset||0;const r=t?this.outlineColor||0:this.color;if(r==null)delete e.color;else{const a=e.hasOwnProperty("color")?e.color:e.color=new We;(r!==a._input||typeof r=="object")&&a.set(a._input=r)}let o=this.orientation||ou;if(o!==e._orientation){let a=n.uTroikaOrient.value;o=o.replace(/[^-+xyz]/g,"");let l=o!==ou&&o.match(/^([-+])([xyz])([-+])([xyz])$/);if(l){let[,c,u,h,f]=l;Ia.set(0,0,0)[u]=c==="-"?1:-1,su.set(0,0,0)[f]=h==="-"?-1:1,Yd.lookAt(Bw,Ia.cross(su),su),a.setFromMatrix4(Yd)}else a.identity();e._orientation=o}}_parsePercent(e){if(typeof e=="string"){let t=e.match(/^(-?[\d.]+)%$/),n=t?parseFloat(t[1]):NaN;e=(isNaN(n)?0:n/100)*this.fontSize}return e}localPositionToTextCoords(e,t=new pe){t.copy(e);const n=this.curveRadius;return n&&(t.x=Math.atan2(e.x,Math.abs(n)-Math.abs(e.z))*Math.abs(n)),t}worldPositionToTextCoords(e,t=new pe){return Ia.copy(e),this.localPositionToTextCoords(this.worldToLocal(Ia),t)}raycast(e,t){const{textRenderInfo:n,curveRadius:i}=this;if(n){const r=n.blockBounds,o=i?wg():bg(),a=o.geometry,{position:l,uv:c}=a.attributes;for(let u=0;u<c.count;u++){let h=r[0]+c.getX(u)*(r[2]-r[0]);const f=r[1]+c.getY(u)*(r[3]-r[1]);let d=0;i&&(d=i-Math.cos(h/i)*i,h=Math.sin(h/i)*i),l.setXYZ(u,h,f,d)}a.boundingSphere=this.geometry.boundingSphere,a.boundingBox=this.geometry.boundingBox,o.matrixWorld=this.matrixWorld,o.material.side=this.material.side,Us.length=0,o.raycast(e,Us);for(let u=0;u<Us.length;u++)Us[u].object=this,t.push(Us[u])}}copy(e){const t=this.geometry;return super.copy(e),this.geometry=t,Gw.forEach(n=>{this[n]=e[n]}),this}clone(){return new this.constructor().copy(this)}};Eg.forEach(s=>{const e="_private_"+s;Object.defineProperty(Tg.prototype,s,{get(){return this[e]},set(t){t!==this[e]&&(this[e]=t,this._needsSync=!0)}})});new Xt;new We;const dE=ie.forwardRef(({sdfGlyphSize:s=64,anchorX:e="center",anchorY:t="middle",font:n,fontSize:i=1,children:r,characters:o,onSync:a,...l},c)=>{const u=Ht(({invalidate:p})=>p),[h]=ie.useState(()=>new Tg),[f,d]=ie.useMemo(()=>{const p=[];let v="";return ie.Children.forEach(r,g=>{typeof g=="string"||typeof g=="number"?v+=g:p.push(g)}),[p,v]},[r]);return $d(()=>new Promise(p=>Tw({font:n,characters:o},p)),["troika-text",n,o]),ie.useLayoutEffect(()=>void h.sync(()=>{u(),a&&a(h)})),ie.useEffect(()=>()=>h.dispose(),[h]),ie.createElement("primitive",Si({object:h,ref:c,font:n,text:d,anchorX:e,anchorY:t,fontSize:i,sdfGlyphSize:s},l),f)}),Vw=()=>parseInt(ds.replace(/\D+/g,"")),Hw=Vw(),Ag={width:.2,length:1,decay:1,local:!1,stride:0,interval:1},Ww=(s,e=1)=>(s.set(s.subarray(e)),s.fill(-1/0,-e),s);function Xw(s,e){const{length:t,local:n,decay:i,interval:r,stride:o}={...Ag,...e},a=ie.useRef(),[l]=ie.useState(()=>new L);ie.useLayoutEffect(()=>{s&&(a.current=Float32Array.from({length:t*10*3},(h,f)=>s.position.getComponent(f%3)))},[t,s]);const c=ie.useRef(new L),u=ie.useRef(0);return Ti(()=>{if(s&&a.current){if(u.current===0){let h;n?h=s.position:(s.getWorldPosition(l),h=l);const f=1*i;for(let d=0;d<f;d++)h.distanceTo(c.current)<o||(Ww(a.current,3),a.current.set(h.toArray(),a.current.length-3));c.current.copy(h)}u.current++,u.current=u.current%r}}),a}const pE=ie.forwardRef((s,e)=>{const{children:t}=s,{width:n,length:i,decay:r,local:o,stride:a,interval:l}={...Ag,...s},{color:c="hotpink",attenuation:u,target:h}=s,f=Ht(y=>y.size),d=Ht(y=>y.scene),p=ie.useRef(null),[v,g]=ie.useState(null),m=Xw(v,{length:i,decay:r,local:o,stride:a,interval:l});ie.useEffect(()=>{const y=h?.current||p.current.children.find(A=>A instanceof xt);y&&g(y)},[m,h]);const x=ie.useMemo(()=>new zg,[]),_=ie.useMemo(()=>{var y;const A=new Gg({lineWidth:.1*n,color:c,sizeAttenuation:1,resolution:new pe(f.width,f.height)});let b;if(t)if(Array.isArray(t))b=t.find(T=>{const w=T;return typeof w.type=="string"&&w.type==="meshLineMaterial"});else{const T=t;typeof T.type=="string"&&T.type==="meshLineMaterial"&&(b=T)}return typeof((y=b)==null?void 0:y.props)=="object"&&A.setValues(b.props),A},[n,c,f,t]);return ie.useEffect(()=>{_.uniforms.resolution.value.set(f.width,f.height)},[f]),Ti(()=>{m.current&&x.setPoints(m.current,u)}),ie.createElement("group",null,og(ie.createElement("mesh",{ref:e,geometry:x,material:_}),d),ie.createElement("group",{ref:p},t))}),mE=ie.forwardRef(({makeDefault:s,camera:e,regress:t,domElement:n,enableDamping:i=!0,keyEvents:r=!1,onChange:o,onStart:a,onEnd:l,...c},u)=>{const h=Ht(b=>b.invalidate),f=Ht(b=>b.camera),d=Ht(b=>b.gl),p=Ht(b=>b.events),v=Ht(b=>b.setEvents),g=Ht(b=>b.set),m=Ht(b=>b.get),x=Ht(b=>b.performance),_=e||f,y=n||p.connected||d.domElement,A=ie.useMemo(()=>new Y1(_),[_]);return Ti(()=>{A.enabled&&A.update()},-1),ie.useEffect(()=>(r&&A.connect(r===!0?y:r),A.connect(y),()=>void A.dispose()),[r,y,t,A,h]),ie.useEffect(()=>{const b=M=>{h(),t&&x.regress(),o&&o(M)},T=M=>{a&&a(M)},w=M=>{l&&l(M)};return A.addEventListener("change",b),A.addEventListener("start",T),A.addEventListener("end",w),()=>{A.removeEventListener("start",T),A.removeEventListener("end",w),A.removeEventListener("change",b)}},[o,a,l,A,h,v]),ie.useEffect(()=>{if(s){const b=m().controls;return g({controls:A}),()=>g({controls:b})}},[s,A]),ie.createElement("primitive",Si({ref:u,object:A,enableDamping:i},c))}),qw=3e3,Yw=3001;var Zw=`#define GLSLIFY 1
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}float snoise(vec3 v){const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;i=mod289(i);vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));}`;class $w extends ch{constructor(e={}){super(e),this.setValues(e),this._time={value:0},this._distort={value:.4},this._radius={value:1}}onBeforeCompile(e){e.uniforms.time=this._time,e.uniforms.radius=this._radius,e.uniforms.distort=this._distort,e.vertexShader=`
      uniform float time;
      uniform float radius;
      uniform float distort;
      ${Zw}
      ${e.vertexShader}
    `,e.vertexShader=e.vertexShader.replace("#include <begin_vertex>",`
        float updateTime = time / 50.0;
        float noise = snoise(vec3(position / 2.0 + updateTime * 5.0));
        vec3 transformed = vec3(position * (noise * pow(distort, 2.0) + radius));
        `)}get time(){return this._time.value}set time(e){this._time.value=e}get distort(){return this._distort.value}set distort(e){this._distort.value=e}get radius(){return this._radius.value}set radius(e){this._radius.value=e}}const gE=ie.forwardRef(({speed:s=1,...e},t)=>{const[n]=ie.useState(()=>new $w);return Ti(i=>n&&(n.time=i.clock.elapsedTime*s)),ie.createElement("primitive",Si({object:n,ref:t,attach:"material"},e))});function Cg(s,e){const t=s+"Geometry";return ie.forwardRef(({args:n,children:i,...r},o)=>{const a=ie.useRef(null);return ie.useImperativeHandle(o,()=>a.current),ie.useLayoutEffect(()=>void e?.(a.current)),ie.createElement("mesh",Si({ref:a},r),ie.createElement(t,{attach:"geometry",args:n}),i)})}const vE=Cg("cone"),_E=Cg("cylinder"),xE=ie.forwardRef(({children:s,enabled:e=!0,speed:t=1,rotationIntensity:n=1,floatIntensity:i=1,floatingRange:r=[-.1,.1],autoInvalidate:o=!1,...a},l)=>{const c=ie.useRef(null);ie.useImperativeHandle(l,()=>c.current,[]);const u=ie.useRef(Math.random()*1e4);return Ti(h=>{var f,d;if(!e||t===0)return;o&&h.invalidate();const p=u.current+h.clock.elapsedTime;c.current.rotation.x=Math.cos(p/4*t)/8*n,c.current.rotation.y=Math.sin(p/4*t)/8*n,c.current.rotation.z=Math.sin(p/4*t)/20*n;let v=Math.sin(p/4*t)/10;v=Xu.mapLinear(v,-.1,.1,(f=r?.[0])!==null&&f!==void 0?f:-.1,(d=r?.[1])!==null&&d!==void 0?d:.1),c.current.position.y=v*i,c.current.updateMatrix()}),ie.createElement("group",a,ie.createElement("group",{ref:c,matrixAutoUpdate:!1},s))}),ho={apartment:"lebombo_1k.hdr",city:"potsdamer_platz_1k.hdr",dawn:"kiara_1_dawn_1k.hdr",forest:"forest_slope_1k.hdr",lobby:"st_fagans_interior_1k.hdr",night:"dikhololo_night_1k.hdr",park:"rooitou_park_1k.hdr",studio:"studio_small_03_1k.hdr",sunset:"venice_sunset_1k.hdr",warehouse:"empty_warehouse_01_1k.hdr"},Rg="https://raw.githack.com/pmndrs/drei-assets/456060a26bbeb8fdf79326f224b6d99b8bcce736/hdri/",os=s=>Array.isArray(s),Ih=["/px.png","/nx.png","/py.png","/ny.png","/pz.png","/nz.png"];function ic({files:s=Ih,path:e="",preset:t=void 0,encoding:n=void 0,extensions:i}={}){let r=null,o=!1;t&&(Ph(t),s=ho[t],e=Rg),o=os(s);const{extension:a,isCubemap:l}=Uh(s);if(r=Dh(a),!r)throw new Error("useEnvironment: Unrecognized file extension: "+s);const c=Ht(d=>d.gl);ie.useLayoutEffect(()=>{if(a!=="webp"&&a!=="jpg"&&a!=="jpeg")return;function d(){hs.clear(r,o?[s]:s)}c.domElement.addEventListener("webglcontextlost",d,{once:!0})},[s,c.domElement]);const u=hs(r,o?[s]:s,d=>{(a==="webp"||a==="jpg"||a==="jpeg")&&d.setRenderer(c),d.setPath==null||d.setPath(e),i&&i(d)});let h=o?u[0]:u;if(a==="jpg"||a==="jpeg"||a==="webp"){var f;h=(f=h.renderTarget)==null?void 0:f.texture}return h.mapping=l?si:as,"colorSpace"in h?h.colorSpace=n??l?"srgb":"srgb-linear":h.encoding=n??l?Yw:qw,h}const jw={files:Ih,path:"",preset:void 0,extensions:void 0};ic.preload=s=>{const e={...jw,...s};let{files:t,path:n=""}=e;const{preset:i,extensions:r}=e;i&&(Ph(i),t=ho[i],n=Rg);const{extension:o}=Uh(t);if(o==="webp"||o==="jpg"||o==="jpeg")throw new Error("useEnvironment: Preloading gainmaps is not supported");const a=Dh(o);if(!a)throw new Error("useEnvironment: Unrecognized file extension: "+t);hs.preload(a,os(t)?[t]:t,l=>{l.setPath==null||l.setPath(n),r&&r(l)})};const Jw={files:Ih,preset:void 0};ic.clear=s=>{const e={...Jw,...s};let{files:t}=e;const{preset:n}=e;n&&(Ph(n),t=ho[n]);const{extension:i}=Uh(t),r=Dh(i);if(!r)throw new Error("useEnvironment: Unrecognized file extension: "+t);hs.clear(r,os(t)?[t]:t)};function Ph(s){if(!(s in ho))throw new Error("Preset must be one of: "+Object.keys(ho).join(", "))}function Uh(s){var e;const t=os(s)&&s.length===6,n=os(s)&&s.length===3&&s.some(o=>o.endsWith("json")),i=os(s)?s[0]:s;return{extension:t?"cube":n?"webp":i.startsWith("data:application/exr")?"exr":i.startsWith("data:application/hdr")?"hdr":i.startsWith("data:image/jpeg")?"jpg":(e=i.split(".").pop())==null||(e=e.split("?"))==null||(e=e.shift())==null?void 0:e.toLowerCase(),isCubemap:t,isGainmap:n}}function Dh(s){return s==="cube"?Pm:s==="hdr"?j1:s==="exr"?J1:s==="jpg"||s==="jpeg"?Vg:s==="webp"?Hg:null}const Kw=s=>s.current&&s.current.isScene,Qw=s=>Kw(s)?s.current:s;function Lh(s,e,t,n,i={}){var r,o,a,l;i={backgroundBlurriness:0,backgroundIntensity:1,backgroundRotation:[0,0,0],environmentIntensity:1,environmentRotation:[0,0,0],...i};const c=Qw(e||t),u=c.background,h=c.environment,f={backgroundBlurriness:c.backgroundBlurriness,backgroundIntensity:c.backgroundIntensity,backgroundRotation:(r=(o=c.backgroundRotation)==null||o.clone==null?void 0:o.clone())!==null&&r!==void 0?r:[0,0,0],environmentIntensity:c.environmentIntensity,environmentRotation:(a=(l=c.environmentRotation)==null||l.clone==null?void 0:l.clone())!==null&&a!==void 0?a:[0,0,0]};return s!=="only"&&(c.environment=n),s&&(c.background=n),Fi(c,i),()=>{s!=="only"&&(c.environment=h),s&&(c.background=u),Fi(c,f)}}function Fh({scene:s,background:e=!1,map:t,...n}){const i=Ht(r=>r.scene);return ie.useLayoutEffect(()=>{if(t)return Lh(e,s,i,t,n)}),null}function Ig({background:s=!1,scene:e,blur:t,backgroundBlurriness:n,backgroundIntensity:i,backgroundRotation:r,environmentIntensity:o,environmentRotation:a,...l}){const c=ic(l),u=Ht(h=>h.scene);return ie.useLayoutEffect(()=>Lh(s,e,u,c,{backgroundBlurriness:t??n,backgroundIntensity:i,backgroundRotation:r,environmentIntensity:o,environmentRotation:a})),ie.useEffect(()=>()=>{c.dispose()},[c]),null}function eE({children:s,near:e=.1,far:t=1e3,resolution:n=256,frames:i=1,map:r,background:o=!1,blur:a,backgroundBlurriness:l,backgroundIntensity:c,backgroundRotation:u,environmentIntensity:h,environmentRotation:f,scene:d,files:p,path:v,preset:g=void 0,extensions:m}){const x=Ht(w=>w.gl),_=Ht(w=>w.scene),y=ie.useRef(null),[A]=ie.useState(()=>new Ol),b=ie.useMemo(()=>{const w=new $u(n);return w.texture.type=mn,w},[n]);ie.useEffect(()=>()=>{b.dispose()},[b]),ie.useLayoutEffect(()=>{if(i===1){const w=x.autoClear;x.autoClear=!0,y.current.update(x,A),x.autoClear=w}return Lh(o,d,_,b.texture,{backgroundBlurriness:a??l,backgroundIntensity:c,backgroundRotation:u,environmentIntensity:h,environmentRotation:f})},[s,A,b.texture,d,_,o,i,x]);let T=1;return Ti(()=>{if(i===1/0||T<i){const w=x.autoClear;x.autoClear=!0,y.current.update(x,A),x.autoClear=w,T++}}),ie.createElement(ie.Fragment,null,og(ie.createElement(ie.Fragment,null,s,ie.createElement("cubeCamera",{ref:y,args:[e,t,b]}),p||g?ie.createElement(Ig,{background:!0,files:p,preset:g,path:v,extensions:m}):r?ie.createElement(Fh,{background:!0,map:r,extensions:m}):null),A))}function tE(s){var e,t,n,i;const r=ic(s),o=s.map||r;ie.useMemo(()=>Ym({GroundProjectedEnvImpl:k1}),[]),ie.useEffect(()=>()=>{r.dispose()},[r]);const a=ie.useMemo(()=>[o],[o]),l=(e=s.ground)==null?void 0:e.height,c=(t=s.ground)==null?void 0:t.radius,u=(n=(i=s.ground)==null?void 0:i.scale)!==null&&n!==void 0?n:1e3;return ie.createElement(ie.Fragment,null,ie.createElement(Fh,Si({},s,{map:o})),ie.createElement("groundProjectedEnvImpl",{args:a,scale:u,height:l,radius:c}))}function yE(s){return s.ground?ie.createElement(tE,s):s.map?ie.createElement(Fh,s):s.children?ie.createElement(eE,s):ie.createElement(Ig,s)}const SE=ie.forwardRef(({scale:s=10,frames:e=1/0,opacity:t=1,width:n=1,height:i=1,blur:r=1,near:o=0,far:a=10,resolution:l=512,smooth:c=!0,color:u="#000000",depthWrite:h=!1,renderOrder:f,...d},p)=>{const v=ie.useRef(null),g=Ht(U=>U.scene),m=Ht(U=>U.gl),x=ie.useRef(null);n=n*(Array.isArray(s)?s[0]:s||1),i=i*(Array.isArray(s)?s[1]:s||1);const[_,y,A,b,T,w,M]=ie.useMemo(()=>{const U=new Pn(l,l),G=new Pn(l,l);G.texture.generateMipmaps=U.texture.generateMipmaps=!1;const B=new ai(n,i).rotateX(Math.PI/2),K=new Rt(B),Y=new So;Y.depthTest=Y.depthWrite=!1,Y.onBeforeCompile=Z=>{Z.uniforms={...Z.uniforms,ucolor:{value:new We(u)}},Z.fragmentShader=Z.fragmentShader.replace("void main() {",`uniform vec3 ucolor;
           void main() {
          `),Z.fragmentShader=Z.fragmentShader.replace("vec4( vec3( 1.0 - fragCoordZ ), opacity );","vec4( ucolor * fragCoordZ * 2.0, ( 1.0 - fragCoordZ ) * 1.0 );")};const le=new cn(Z1),J=new cn($1);return J.depthTest=le.depthTest=!1,[U,B,Y,K,le,J,G]},[l,n,i,s,u]),S=U=>{b.visible=!0,b.material=T,T.uniforms.tDiffuse.value=_.texture,T.uniforms.h.value=U*1/256,m.setRenderTarget(M),m.render(b,x.current),b.material=w,w.uniforms.tDiffuse.value=M.texture,w.uniforms.v.value=U*1/256,m.setRenderTarget(_),m.render(b,x.current),b.visible=!1};let R=0,P,F;return Ti(()=>{x.current&&(e===1/0||R<e)&&(R++,P=g.background,F=g.overrideMaterial,v.current.visible=!1,g.background=null,g.overrideMaterial=A,m.setRenderTarget(_),m.render(g,x.current),S(r),c&&S(r*.4),m.setRenderTarget(null),v.current.visible=!0,g.overrideMaterial=F,g.background=P)}),ie.useImperativeHandle(p,()=>v.current,[]),ie.createElement("group",Si({"rotation-x":Math.PI/2},d,{ref:v}),ie.createElement("mesh",{renderOrder:f,geometry:y,scale:[1,-1,1],rotation:[-Math.PI/2,0,0]},ie.createElement("meshBasicMaterial",{transparent:!0,map:_.texture,opacity:t,depthWrite:h})),ie.createElement("orthographicCamera",{ref:x,args:[-n/2,n/2,i/2,-i/2,o,a]}))});class nE extends cn{constructor(){super({uniforms:{time:{value:0},fade:{value:1}},vertexShader:`
      uniform float time;
      attribute float size;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 0.5);
        gl_PointSize = size * (30.0 / -mvPosition.z) * (3.0 + sin(time + 100.0));
        gl_Position = projectionMatrix * mvPosition;
      }`,fragmentShader:`
      uniform sampler2D pointTexture;
      uniform float fade;
      varying vec3 vColor;
      void main() {
        float opacity = 1.0;
        if (fade == 1.0) {
          float d = distance(gl_PointCoord, vec2(0.5, 0.5));
          opacity = 1.0 / (1.0 + exp(16.0 * (d - 0.25)));
        }
        gl_FragColor = vec4(vColor, opacity);

        #include <tonemapping_fragment>
	      #include <${Hw>=154?"colorspace_fragment":"encodings_fragment"}>
      }`})}}const iE=s=>new L().setFromSpherical(new Ml(s,Math.acos(1-Math.random()*2),Math.random()*2*Math.PI)),ME=ie.forwardRef(({radius:s=100,depth:e=50,count:t=5e3,saturation:n=0,factor:i=4,fade:r=!1,speed:o=1},a)=>{const l=ie.useRef(),[c,u,h]=ie.useMemo(()=>{const d=[],p=[],v=Array.from({length:t},()=>(.5+.5*Math.random())*i),g=new We;let m=s+e;const x=e/t;for(let _=0;_<t;_++)m-=x*Math.random(),d.push(...iE(m).toArray()),g.setHSL(_/t,n,.9),p.push(g.r,g.g,g.b);return[new Float32Array(d),new Float32Array(p),new Float32Array(v)]},[t,e,i,s,n]);Ti(d=>l.current&&(l.current.uniforms.time.value=d.clock.elapsedTime*o));const[f]=ie.useState(()=>new nE);return ie.createElement("points",{ref:a},ie.createElement("bufferGeometry",null,ie.createElement("bufferAttribute",{attach:"attributes-position",args:[c,3]}),ie.createElement("bufferAttribute",{attach:"attributes-color",args:[u,3]}),ie.createElement("bufferAttribute",{attach:"attributes-size",args:[h,1]})),ie.createElement("primitive",{ref:l,object:f,attach:"material",blending:Fa,"uniforms-fade-value":r,depthWrite:!1,transparent:!0,vertexColors:!0}))});export{dE as A,pt as B,We as C,ii as D,yE as E,Wt as F,gE as G,mn as H,El as I,pE as J,_E as K,Ut as L,rt as M,xi as N,ni as O,ai as P,vE as Q,ds as R,cn as S,Ft as T,He as U,L as V,Pn as W,hE as X,Tt as a,pe as b,en as c,Nn as d,Ol as e,Rt as f,wl as g,Qp as h,wr as i,Du as j,Uu as k,bi as l,Xn as m,Ei as n,bn as o,dh as p,Zg as q,Sn as r,wi as s,cE as t,lE as u,SE as v,mE as w,ME as x,Ti as y,xE as z};
