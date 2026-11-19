(()=>{var Mm=Object.create;var tl=Object.defineProperty;var Tm=Object.getOwnPropertyDescriptor;var Em=Object.getOwnPropertyNames;var wm=Object.getPrototypeOf,Am=Object.prototype.hasOwnProperty;var Cm=n=>{throw TypeError(n)};var Rm=(n,e)=>()=>{try{return e||n((e={exports:{}}).exports,e),e.exports}catch(t){throw e=0,t}},Mo=(n,e)=>{for(var t in e)tl(n,t,{get:e[t],enumerable:!0})},Pm=(n,e,t,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Em(e))!Am.call(n,s)&&s!==t&&tl(n,s,{get:()=>e[s],enumerable:!(i=Tm(e,s))||i.enumerable});return n};var ud=(n,e,t)=>(t=n!=null?Mm(wm(n)):{},Pm(e||!n||!n.__esModule?tl(t,"default",{value:n,enumerable:!0}):t,n));var or=(n,e,t)=>e.has(n)?Cm("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(n):e.set(n,t);var su=Rm((q1,iu)=>{"use strict";var re={};re.generateIdentifier=function(){return Math.random().toString(36).substring(2,12)};re.localCName=re.generateIdentifier();re.splitLines=function(n){return n.trim().split(`
`).map(e=>e.trim())};re.splitSections=function(n){return n.split(`
m=`).map((t,i)=>(i>0?"m="+t:t).trim()+`\r
`)};re.getDescription=function(n){let e=re.splitSections(n);return e&&e[0]};re.getMediaSections=function(n){let e=re.splitSections(n);return e.shift(),e};re.matchPrefix=function(n,e){return re.splitLines(n).filter(t=>t.indexOf(e)===0)};re.parseCandidate=function(n){let e;n.indexOf("a=candidate:")===0?e=n.substring(12).split(" "):e=n.substring(10).split(" ");let t={foundation:e[0],component:{1:"rtp",2:"rtcp"}[e[1]]||e[1],protocol:e[2].toLowerCase(),priority:parseInt(e[3],10),ip:e[4],address:e[4],port:parseInt(e[5],10),type:e[7]};for(let i=8;i<e.length;i+=2)switch(e[i]){case"raddr":t.relatedAddress=e[i+1];break;case"rport":t.relatedPort=parseInt(e[i+1],10);break;case"tcptype":t.tcpType=e[i+1];break;case"ufrag":t.ufrag=e[i+1],t.usernameFragment=e[i+1];break;default:t[e[i]]===void 0&&(t[e[i]]=e[i+1]);break}return t};re.writeCandidate=function(n){let e=[];e.push(n.foundation);let t=n.component;t==="rtp"?e.push(1):t==="rtcp"?e.push(2):e.push(t),e.push(n.protocol.toUpperCase()),e.push(n.priority),e.push(n.address||n.ip),e.push(n.port);let i=n.type;return e.push("typ"),e.push(i),i!=="host"&&n.relatedAddress&&n.relatedPort!==void 0&&(e.push("raddr"),e.push(n.relatedAddress),e.push("rport"),e.push(n.relatedPort)),n.tcpType&&n.protocol.toLowerCase()==="tcp"&&(e.push("tcptype"),e.push(n.tcpType)),(n.usernameFragment||n.ufrag)&&(e.push("ufrag"),e.push(n.usernameFragment||n.ufrag)),"candidate:"+e.join(" ")};re.parseIceOptions=function(n){return n.substring(14).split(" ")};re.parseRtpMap=function(n){let e=n.substring(9).split(" "),t={payloadType:parseInt(e.shift(),10)};return e=e[0].split("/"),t.name=e[0],t.clockRate=parseInt(e[1],10),t.channels=e.length===3?parseInt(e[2],10):1,t.numChannels=t.channels,t};re.writeRtpMap=function(n){let e=n.payloadType;n.preferredPayloadType!==void 0&&(e=n.preferredPayloadType);let t=n.channels||n.numChannels||1;return"a=rtpmap:"+e+" "+n.name+"/"+n.clockRate+(t!==1?"/"+t:"")+`\r
`};re.parseExtmap=function(n){let e=n.substring(9).split(" ");return{id:parseInt(e[0],10),direction:e[0].indexOf("/")>0?e[0].split("/")[1]:"sendrecv",uri:e[1],attributes:e.slice(2).join(" ")}};re.writeExtmap=function(n){return"a=extmap:"+(n.id||n.preferredId)+(n.direction&&n.direction!=="sendrecv"?"/"+n.direction:"")+" "+n.uri+(n.attributes?" "+n.attributes:"")+`\r
`};re.parseFmtp=function(n){let e={},t,i=n.substring(n.indexOf(" ")+1).split(";");for(let s=0;s<i.length;s++)t=i[s].trim().split("="),e[t[0].trim()]=t[1];return e};re.writeFmtp=function(n){let e="",t=n.payloadType;if(n.preferredPayloadType!==void 0&&(t=n.preferredPayloadType),n.parameters&&Object.keys(n.parameters).length){let i=[];Object.keys(n.parameters).forEach(s=>{n.parameters[s]!==void 0?i.push(s+"="+n.parameters[s]):i.push(s)}),e+="a=fmtp:"+t+" "+i.join(";")+`\r
`}return e};re.parseRtcpFb=function(n){let e=n.substring(n.indexOf(" ")+1).split(" ");return{type:e.shift(),parameter:e.join(" ")}};re.writeRtcpFb=function(n){let e="",t=n.payloadType;return n.preferredPayloadType!==void 0&&(t=n.preferredPayloadType),n.rtcpFeedback&&n.rtcpFeedback.length&&n.rtcpFeedback.forEach(i=>{e+="a=rtcp-fb:"+t+" "+i.type+(i.parameter&&i.parameter.length?" "+i.parameter:"")+`\r
`}),e};re.parseSsrcMedia=function(n){let e=n.indexOf(" "),t={ssrc:parseInt(n.substring(7,e),10)},i=n.indexOf(":",e);return i>-1?(t.attribute=n.substring(e+1,i),t.value=n.substring(i+1)):t.attribute=n.substring(e+1),t};re.parseSsrcGroup=function(n){let e=n.substring(13).split(" ");return{semantics:e.shift(),ssrcs:e.map(t=>parseInt(t,10))}};re.getMid=function(n){let e=re.matchPrefix(n,"a=mid:")[0];if(e)return e.substring(6)};re.parseFingerprint=function(n){let e=n.substring(14).split(" ");return{algorithm:e[0].toLowerCase(),value:e[1].toUpperCase()}};re.getDtlsParameters=function(n,e){return{role:"auto",fingerprints:re.matchPrefix(n+e,"a=fingerprint:").map(re.parseFingerprint)}};re.writeDtlsParameters=function(n,e){let t="a=setup:"+e+`\r
`;return n.fingerprints.forEach(i=>{t+="a=fingerprint:"+i.algorithm+" "+i.value+`\r
`}),t};re.parseCryptoLine=function(n){let e=n.substring(9).split(" ");return{tag:parseInt(e[0],10),cryptoSuite:e[1],keyParams:e[2],sessionParams:e.slice(3)}};re.writeCryptoLine=function(n){return"a=crypto:"+n.tag+" "+n.cryptoSuite+" "+(typeof n.keyParams=="object"?re.writeCryptoKeyParams(n.keyParams):n.keyParams)+(n.sessionParams?" "+n.sessionParams.join(" "):"")+`\r
`};re.parseCryptoKeyParams=function(n){if(n.indexOf("inline:")!==0)return null;let e=n.substring(7).split("|");return{keyMethod:"inline",keySalt:e[0],lifeTime:e[1],mkiValue:e[2]?e[2].split(":")[0]:void 0,mkiLength:e[2]?e[2].split(":")[1]:void 0}};re.writeCryptoKeyParams=function(n){return n.keyMethod+":"+n.keySalt+(n.lifeTime?"|"+n.lifeTime:"")+(n.mkiValue&&n.mkiLength?"|"+n.mkiValue+":"+n.mkiLength:"")};re.getCryptoParameters=function(n,e){return re.matchPrefix(n+e,"a=crypto:").map(re.parseCryptoLine)};re.getIceParameters=function(n,e){let t=re.matchPrefix(n+e,"a=ice-ufrag:")[0],i=re.matchPrefix(n+e,"a=ice-pwd:")[0];return t&&i?{usernameFragment:t.substring(12),password:i.substring(10)}:null};re.writeIceParameters=function(n){let e="a=ice-ufrag:"+n.usernameFragment+`\r
a=ice-pwd:`+n.password+`\r
`;return n.iceLite&&(e+=`a=ice-lite\r
`),e};re.parseRtpParameters=function(n){let e={codecs:[],headerExtensions:[],fecMechanisms:[],rtcp:[]},i=re.splitLines(n)[0].split(" ");e.profile=i[2];for(let r=3;r<i.length;r++){let o=i[r],a=re.matchPrefix(n,"a=rtpmap:"+o+" ")[0];if(a){let c=re.parseRtpMap(a),l=re.matchPrefix(n,"a=fmtp:"+o+" ");switch(c.parameters=l.length?re.parseFmtp(l[0]):{},c.rtcpFeedback=re.matchPrefix(n,"a=rtcp-fb:"+o+" ").map(re.parseRtcpFb),e.codecs.push(c),c.name.toUpperCase()){case"RED":case"ULPFEC":e.fecMechanisms.push(c.name.toUpperCase());break;default:break}}}re.matchPrefix(n,"a=extmap:").forEach(r=>{e.headerExtensions.push(re.parseExtmap(r))});let s=re.matchPrefix(n,"a=rtcp-fb:* ").map(re.parseRtcpFb);return e.codecs.forEach(r=>{s.forEach(o=>{r.rtcpFeedback.find(c=>c.type===o.type&&c.parameter===o.parameter)||r.rtcpFeedback.push(o)})}),e};re.writeRtpDescription=function(n,e){let t="";t+="m="+n+" ",t+=e.codecs.length>0?"9":"0",t+=" "+(e.profile||"UDP/TLS/RTP/SAVPF")+" ",t+=e.codecs.map(s=>s.preferredPayloadType!==void 0?s.preferredPayloadType:s.payloadType).join(" ")+`\r
`,t+=`c=IN IP4 0.0.0.0\r
`,t+=`a=rtcp:9 IN IP4 0.0.0.0\r
`,e.codecs.forEach(s=>{t+=re.writeRtpMap(s),t+=re.writeFmtp(s),t+=re.writeRtcpFb(s)});let i=0;return e.codecs.forEach(s=>{s.maxptime>i&&(i=s.maxptime)}),i>0&&(t+="a=maxptime:"+i+`\r
`),e.headerExtensions&&e.headerExtensions.forEach(s=>{t+=re.writeExtmap(s)}),t};re.parseRtpEncodingParameters=function(n){let e=[],t=re.parseRtpParameters(n),i=t.fecMechanisms.indexOf("RED")!==-1,s=t.fecMechanisms.indexOf("ULPFEC")!==-1,r=re.matchPrefix(n,"a=ssrc:").map(u=>re.parseSsrcMedia(u)).filter(u=>u.attribute==="cname"),o=r.length>0&&r[0].ssrc,a,c=re.matchPrefix(n,"a=ssrc-group:FID").map(u=>u.substring(17).split(" ").map(d=>parseInt(d,10)));c.length>0&&c[0].length>1&&c[0][0]===o&&(a=c[0][1]),t.codecs.forEach(u=>{if(u.name.toUpperCase()==="RTX"&&u.parameters.apt){let f={ssrc:o,codecPayloadType:parseInt(u.parameters.apt,10)};o&&a&&(f.rtx={ssrc:a}),e.push(f),i&&(f=JSON.parse(JSON.stringify(f)),f.fec={ssrc:o,mechanism:s?"red+ulpfec":"red"},e.push(f))}}),e.length===0&&o&&e.push({ssrc:o});let l=re.matchPrefix(n,"b=");return l.length&&(l[0].indexOf("b=TIAS:")===0?l=parseInt(l[0].substring(7),10):l[0].indexOf("b=AS:")===0?l=parseInt(l[0].substring(5),10)*1e3*.95-2e3*8:l=void 0,e.forEach(u=>{u.maxBitrate=l})),e};re.parseRtcpParameters=function(n){let e={},t=re.matchPrefix(n,"a=ssrc:").map(r=>re.parseSsrcMedia(r)).filter(r=>r.attribute==="cname")[0];t&&(e.cname=t.value,e.ssrc=t.ssrc);let i=re.matchPrefix(n,"a=rtcp-rsize");e.reducedSize=i.length>0,e.compound=i.length===0;let s=re.matchPrefix(n,"a=rtcp-mux");return e.mux=s.length>0,e};re.writeRtcpParameters=function(n){let e="";return n.reducedSize&&(e+=`a=rtcp-rsize\r
`),n.mux&&(e+=`a=rtcp-mux\r
`),n.ssrc!==void 0&&n.cname&&(e+="a=ssrc:"+n.ssrc+" cname:"+n.cname+`\r
`),e};re.parseMsid=function(n){let e,t=re.matchPrefix(n,"a=msid:");if(t.length===1)return e=t[0].substring(7).split(" "),{stream:e[0],track:e[1]};let i=re.matchPrefix(n,"a=ssrc:").map(s=>re.parseSsrcMedia(s)).filter(s=>s.attribute==="msid");if(i.length>0)return e=i[0].value.split(" "),{stream:e[0],track:e[1]}};re.parseSctpDescription=function(n){let e=re.parseMLine(n),t=re.matchPrefix(n,"a=max-message-size:"),i;t.length>0&&(i=parseInt(t[0].substring(19),10)),isNaN(i)&&(i=65536);let s=re.matchPrefix(n,"a=sctp-port:");if(s.length>0)return{port:parseInt(s[0].substring(12),10),protocol:e.fmt,maxMessageSize:i};let r=re.matchPrefix(n,"a=sctpmap:");if(r.length>0){let o=r[0].substring(10).split(" ");return{port:parseInt(o[0],10),protocol:o[1],maxMessageSize:i}}};re.writeSctpDescription=function(n,e){let t=[];return n.protocol!=="DTLS/SCTP"?t=["m="+n.kind+" 9 "+n.protocol+" "+e.protocol+`\r
`,`c=IN IP4 0.0.0.0\r
`,"a=sctp-port:"+e.port+`\r
`]:t=["m="+n.kind+" 9 "+n.protocol+" "+e.port+`\r
`,`c=IN IP4 0.0.0.0\r
`,"a=sctpmap:"+e.port+" "+e.protocol+` 65535\r
`],e.maxMessageSize!==void 0&&t.push("a=max-message-size:"+e.maxMessageSize+`\r
`),t.join("")};re.generateSessionId=function(){return Math.random().toString().substr(2,22)};re.writeSessionBoilerplate=function(n,e,t){let i,s=e!==void 0?e:2;return n?i=n:i=re.generateSessionId(),`v=0\r
o=`+(t||"thisisadapterortc")+" "+i+" "+s+` IN IP4 127.0.0.1\r
s=-\r
t=0 0\r
`};re.getDirection=function(n,e){let t=re.splitLines(n);for(let i=0;i<t.length;i++)switch(t[i]){case"a=sendrecv":case"a=sendonly":case"a=recvonly":case"a=inactive":return t[i].substring(2);default:}return e?re.getDirection(e):"sendrecv"};re.getKind=function(n){return re.splitLines(n)[0].split(" ")[0].substring(2)};re.isRejected=function(n){return n.split(" ",2)[1]==="0"};re.parseMLine=function(n){let t=re.splitLines(n)[0].substring(2).split(" ");return{kind:t[0],port:parseInt(t[1],10),protocol:t[2],fmt:t.slice(3).join(" ")}};re.parseOLine=function(n){let t=re.matchPrefix(n,"o=")[0].substring(2).split(" ");return{username:t[0],sessionId:t[1],sessionVersion:parseInt(t[2],10),netType:t[3],addressType:t[4],address:t[5]}};re.isValidSDP=function(n){if(typeof n!="string"||n.length===0)return!1;let e=re.splitLines(n);for(let t=0;t<e.length;t++)if(e[t].length<2||e[t].charAt(1)!=="=")return!1;return!0};typeof iu=="object"&&(iu.exports=re)});var zd=0,Ul=1,Gd=2;var ji=1,Hd=2,Vs=3,Oi=0,on=1,En=2,Ki=0,Ws=1,Fi=2,kl=3,Ol=4,Vd=5;var Qi=100,Wd=101,Xd=102,qd=103,Yd=104,Zd=200,Jd=201,$d=202,jd=203,Fl=204,Bl=205,Kd=206,Qd=207,ef=208,tf=209,nf=210,sf=211,rf=212,of=213,af=214,jo=0,Ko=1,Qo=2,Is=3,ea=4,ta=5,na=6,ia=7,Aa=0,cf=1,lf=2,$n=0,zl=1,Gl=2,Hl=3,Vl=4,Wl=5,Xl=6,ql=7;var Yl=300,es=301,Xs=302,Ca=303,Ra=304,Ls=1e3,Xn=1001,sa=1002,Vt=1003,hf=1004;var Gr=1005;var nn=1006,Pa=1007;var mi=1008;var un=1009,Zl=1010,Jl=1011,qs=1012,Ia=1013,Un=1014,kn=1015,On=1016,La=1017,Da=1018,ts=1020,$l=35902,jl=35899,Kl=1021,Ql=1022,Fn=1023,hi=1026,gi=1027,eh=1028,Na=1029,Bi=1030,Ua=1031;var ka=1033,Hr=33776,Vr=33777,Wr=33778,Xr=33779,Oa=35840,Fa=35841,Ba=35842,za=35843,Ga=36196,Ha=37492,Va=37496,Wa=37488,Xa=37489,qr=37490,qa=37491,Ya=37808,Za=37809,Ja=37810,$a=37811,ja=37812,Ka=37813,Qa=37814,ec=37815,tc=37816,nc=37817,ic=37818,sc=37819,rc=37820,oc=37821,ac=36492,cc=36494,lc=36495,hc=36283,uc=36284,Yr=36285,dc=36286;var mr=2300,ra=2301,Jo=2302,El=2303,wl=2400,Al=2401,Cl=2402;var uf=3200;var fc=0,df=1,xi="",wt="srgb",gr="srgb-linear",xr="linear",lt="srgb";var $o=7680;var ff=519,pf=512,mf=513,gf=514,th=515,xf=516,_f=517,nh=518,ih=519,sh=35044;var rh="300 es",Mn=2e3,Ds=2001;function Im(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Lm(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function _r(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function yf(){let n=_r("canvas");return n.style.display="block",n}var dd={},Ns=null;function yr(...n){let e="THREE."+n.shift();Ns?Ns("log",e,...n):console.log(e,...n)}function vf(n){let e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Fe(...n){n=vf(n);let e="THREE."+n.shift();if(Ns)Ns("warn",e,...n);else{let t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Be(...n){n=vf(n);let e="THREE."+n.shift();if(Ns)Ns("error",e,...n);else{let t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function pr(...n){let e=n.join(" ");e in dd||(dd[e]=!0,Fe(...n))}function bf(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}var Sf={[jo]:jo,[Qo]:na,[ea]:ea,[Is]:ta,[Ko]:Ko,[na]:Qo,[ia]:ia,[ta]:Is},qn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let s=i[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},Jt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var nl=Math.PI/180,vr=180/Math.PI;function ns(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Jt[n&255]+Jt[n>>8&255]+Jt[n>>16&255]+Jt[n>>24&255]+"-"+Jt[e&255]+Jt[e>>8&255]+"-"+Jt[e>>16&15|64]+Jt[e>>24&255]+"-"+Jt[t&63|128]+Jt[t>>8&255]+"-"+Jt[t>>16&255]+Jt[t>>24&255]+Jt[i&255]+Jt[i>>8&255]+Jt[i>>16&255]+Jt[i>>24&255]).toLowerCase()}function nt(n,e,t){return Math.max(e,Math.min(t,n))}function Dm(n,e){return(n%e+e)%e}function il(n,e,t){return(1-t)*n+t*e}function Mf(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function pc(n){switch(n.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function Tf(n,e){if(e.constructor===Float32Array)return n;let t=pc(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(n/t,-1)}function Ef(n,e){if(e.constructor===Float32Array)return n;let t=pc(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(n*t)}var hh=class hh{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(nt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(nt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*i-o*s+e.x,this.y=r*s+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};hh.prototype.isVector2=!0;var ze=hh,Yn=class{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,o,a){let c=i[s+0],l=i[s+1],u=i[s+2],f=i[s+3],d=r[o+0],g=r[o+1],x=r[o+2],y=r[o+3];if(f!==y||c!==d||l!==g||u!==x){let p=c*d+l*g+u*x+f*y;p<0&&(d=-d,g=-g,x=-x,y=-y,p=-p);let m=1-a;if(p<.9995){let v=Math.acos(p),E=Math.sin(v);m=Math.sin(m*v)/E,a=Math.sin(a*v)/E,c=c*m+d*a,l=l*m+g*a,u=u*m+x*a,f=f*m+y*a}else{c=c*m+d*a,l=l*m+g*a,u=u*m+x*a,f=f*m+y*a;let v=1/Math.sqrt(c*c+l*l+u*u+f*f);c*=v,l*=v,u*=v,f*=v}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,s,r,o){let a=i[s],c=i[s+1],l=i[s+2],u=i[s+3],f=r[o],d=r[o+1],g=r[o+2],x=r[o+3];return e[t]=a*x+u*f+c*g-l*d,e[t+1]=c*x+u*d+l*f-a*g,e[t+2]=l*x+u*g+a*d-c*f,e[t+3]=u*x-a*f-c*d-l*g,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(i/2),u=a(s/2),f=a(r/2),d=c(i/2),g=c(s/2),x=c(r/2);switch(o){case"XYZ":this._x=d*u*f+l*g*x,this._y=l*g*f-d*u*x,this._z=l*u*x+d*g*f,this._w=l*u*f-d*g*x;break;case"YXZ":this._x=d*u*f+l*g*x,this._y=l*g*f-d*u*x,this._z=l*u*x-d*g*f,this._w=l*u*f+d*g*x;break;case"ZXY":this._x=d*u*f-l*g*x,this._y=l*g*f+d*u*x,this._z=l*u*x+d*g*f,this._w=l*u*f-d*g*x;break;case"ZYX":this._x=d*u*f-l*g*x,this._y=l*g*f+d*u*x,this._z=l*u*x-d*g*f,this._w=l*u*f+d*g*x;break;case"YZX":this._x=d*u*f+l*g*x,this._y=l*g*f+d*u*x,this._z=l*u*x-d*g*f,this._w=l*u*f-d*g*x;break;case"XZY":this._x=d*u*f-l*g*x,this._y=l*g*f-d*u*x,this._z=l*u*x+d*g*f,this._w=l*u*f+d*g*x;break;default:Fe("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],u=t[6],f=t[10],d=i+a+f;if(d>0){let g=.5/Math.sqrt(d+1);this._w=.25/g,this._x=(u-c)*g,this._y=(r-l)*g,this._z=(o-s)*g}else if(i>a&&i>f){let g=2*Math.sqrt(1+i-a-f);this._w=(u-c)/g,this._x=.25*g,this._y=(s+o)/g,this._z=(r+l)/g}else if(a>f){let g=2*Math.sqrt(1+a-i-f);this._w=(r-l)/g,this._x=(s+o)/g,this._y=.25*g,this._z=(c+u)/g}else{let g=2*Math.sqrt(1+f-i-a);this._w=(o-s)/g,this._x=(r+l)/g,this._y=(c+u)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(nt(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=i*u+o*a+s*l-r*c,this._y=s*u+o*c+r*a-i*l,this._z=r*u+o*l+i*c-s*a,this._w=o*u-i*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,o=e._w,a=this.dot(e);a<0&&(i=-i,s=-s,r=-r,o=-o,a=-a);let c=1-t;if(a<.9995){let l=Math.acos(a),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+i*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+o*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+o*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},uh=class uh{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(fd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(fd.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,i=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*i),u=2*(a*t-r*s),f=2*(r*i-o*t);return this.x=t+c*l+o*f-a*u,this.y=i+c*u+a*l-r*f,this.z=s+c*f+r*u-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this.z=nt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this.z=nt(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(nt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-i*c,this.z=i*a-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return sl.copy(this).projectOnVector(e),this.sub(sl)}reflect(e){return this.sub(sl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(nt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};uh.prototype.isVector3=!0;var W=uh,sl=new W,fd=new Yn,dh=class dh{constructor(e,t,i,s,r,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,c,l)}set(e,t,i,s,r,o,a,c,l){let u=this.elements;return u[0]=e,u[1]=s,u[2]=a,u[3]=t,u[4]=r,u[5]=c,u[6]=i,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],u=i[4],f=i[7],d=i[2],g=i[5],x=i[8],y=s[0],p=s[3],m=s[6],v=s[1],E=s[4],M=s[7],w=s[2],A=s[5],_=s[8];return r[0]=o*y+a*v+c*w,r[3]=o*p+a*E+c*A,r[6]=o*m+a*M+c*_,r[1]=l*y+u*v+f*w,r[4]=l*p+u*E+f*A,r[7]=l*m+u*M+f*_,r[2]=d*y+g*v+x*w,r[5]=d*p+g*E+x*A,r[8]=d*m+g*M+x*_,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*o*u-t*a*l-i*r*u+i*a*c+s*r*l-s*o*c}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],f=u*o-a*l,d=a*c-u*r,g=l*r-o*c,x=t*f+i*d+s*g;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/x;return e[0]=f*y,e[1]=(s*l-u*i)*y,e[2]=(a*i-s*o)*y,e[3]=d*y,e[4]=(u*t-s*c)*y,e[5]=(s*r-a*t)*y,e[6]=g*y,e[7]=(i*c-l*t)*y,e[8]=(o*t-i*r)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return pr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(rl.makeScale(e,t)),this}rotate(e){return pr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(rl.makeRotation(-e)),this}translate(e,t){return pr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(rl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};dh.prototype.isMatrix3=!0;var He=dh,rl=new He,pd=new He().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),md=new He().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Nm(){let n={enabled:!0,workingColorSpace:gr,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===lt&&(s.r=li(s.r),s.g=li(s.g),s.b=li(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===lt&&(s.r=Ps(s.r),s.g=Ps(s.g),s.b=Ps(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===xi?xr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[o].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[gr]:{primaries:e,whitePoint:i,transfer:xr,toXYZ:pd,fromXYZ:md,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:wt},outputColorSpaceConfig:{drawingBufferColorSpace:wt}},[wt]:{primaries:e,whitePoint:i,transfer:lt,toXYZ:pd,fromXYZ:md,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:wt}}}),n}var et=Nm();function li(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ps(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var fs,oa=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{fs===void 0&&(fs=_r("canvas")),fs.width=e.width,fs.height=e.height;let s=fs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=fs}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=_r("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=li(r[o]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(li(t[i]/255)*255):t[i]=li(t[i]);return{data:t,width:e.width,height:e.height}}else return Fe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Um=0,Us=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Um++}),this.uuid=ns(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(ol(s[o].image)):r.push(ol(s[o]))}else r=ol(s);i.url=r}return t||(e.images[this.uuid]=i),i}};function ol(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?oa.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Fe("Texture: Unable to serialize Texture."),{})}var km=0,al=new W,sn=class n extends qn{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=Xn,s=Xn,r=nn,o=mi,a=Fn,c=un,l=n.DEFAULT_ANISOTROPY,u=xi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:km++}),this.uuid=ns(),this.name="",this.source=new Us(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ze(0,0),this.repeat=new ze(1,1),this.center=new ze(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new He,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(al).x}get height(){return this.source.getSize(al).y}get depth(){return this.source.getSize(al).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){Fe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Fe(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Yl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ls:e.x=e.x-Math.floor(e.x);break;case Xn:e.x=e.x<0?0:1;break;case sa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ls:e.y=e.y-Math.floor(e.y);break;case Xn:e.y=e.y<0?0:1;break;case sa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};sn.DEFAULT_IMAGE=null;sn.DEFAULT_MAPPING=Yl;sn.DEFAULT_ANISOTROPY=1;var fh=class fh{constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*i+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r,c=e.elements,l=c[0],u=c[4],f=c[8],d=c[1],g=c[5],x=c[9],y=c[2],p=c[6],m=c[10];if(Math.abs(u-d)<.01&&Math.abs(f-y)<.01&&Math.abs(x-p)<.01){if(Math.abs(u+d)<.1&&Math.abs(f+y)<.1&&Math.abs(x+p)<.1&&Math.abs(l+g+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let E=(l+1)/2,M=(g+1)/2,w=(m+1)/2,A=(u+d)/4,_=(f+y)/4,T=(x+p)/4;return E>M&&E>w?E<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(E),s=A/i,r=_/i):M>w?M<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),i=A/s,r=T/s):w<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),i=_/r,s=T/r),this.set(i,s,r,t),this}let v=Math.sqrt((p-x)*(p-x)+(f-y)*(f-y)+(d-u)*(d-u));return Math.abs(v)<.001&&(v=1),this.x=(p-x)/v,this.y=(f-y)/v,this.z=(d-u)/v,this.w=Math.acos((l+g+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this.z=nt(this.z,e.z,t.z),this.w=nt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this.z=nt(this.z,e,t),this.w=nt(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(nt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};fh.prototype.isVector4=!0;var vt=fh,aa=class extends qn{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:nn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new vt(0,0,e,t),this.scissorTest=!1,this.viewport=new vt(0,0,e,t),this.textures=[];let s=i.count;for(let r=0;r<s;r++)this.textures[r]=new sn({width:e,height:t,depth:i.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:nn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Us(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},mn=class extends aa{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},br=class extends sn{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Vt,this.minFilter=Vt,this.wrapR=Xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var ca=class extends sn{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Vt,this.minFilter=Vt,this.wrapR=Xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var wa=class wa{constructor(e,t,i,s,r,o,a,c,l,u,f,d,g,x,y,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,c,l,u,f,d,g,x,y,p)}set(e,t,i,s,r,o,a,c,l,u,f,d,g,x,y,p){let m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=s,m[1]=r,m[5]=o,m[9]=a,m[13]=c,m[2]=l,m[6]=u,m[10]=f,m[14]=d,m[3]=g,m[7]=x,m[11]=y,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new wa().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,i=e.elements,s=1/ps.setFromMatrixColumn(e,0).length(),r=1/ps.setFromMatrixColumn(e,1).length(),o=1/ps.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,s=e.y,r=e.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){let d=o*u,g=o*f,x=a*u,y=a*f;t[0]=c*u,t[4]=-c*f,t[8]=l,t[1]=g+x*l,t[5]=d-y*l,t[9]=-a*c,t[2]=y-d*l,t[6]=x+g*l,t[10]=o*c}else if(e.order==="YXZ"){let d=c*u,g=c*f,x=l*u,y=l*f;t[0]=d+y*a,t[4]=x*a-g,t[8]=o*l,t[1]=o*f,t[5]=o*u,t[9]=-a,t[2]=g*a-x,t[6]=y+d*a,t[10]=o*c}else if(e.order==="ZXY"){let d=c*u,g=c*f,x=l*u,y=l*f;t[0]=d-y*a,t[4]=-o*f,t[8]=x+g*a,t[1]=g+x*a,t[5]=o*u,t[9]=y-d*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let d=o*u,g=o*f,x=a*u,y=a*f;t[0]=c*u,t[4]=x*l-g,t[8]=d*l+y,t[1]=c*f,t[5]=y*l+d,t[9]=g*l-x,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let d=o*c,g=o*l,x=a*c,y=a*l;t[0]=c*u,t[4]=y-d*f,t[8]=x*f+g,t[1]=f,t[5]=o*u,t[9]=-a*u,t[2]=-l*u,t[6]=g*f+x,t[10]=d-y*f}else if(e.order==="XZY"){let d=o*c,g=o*l,x=a*c,y=a*l;t[0]=c*u,t[4]=-f,t[8]=l*u,t[1]=d*f+y,t[5]=o*u,t[9]=g*f-x,t[2]=x*f-g,t[6]=a*u,t[10]=y*f+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Om,e,Fm)}lookAt(e,t,i){let s=this.elements;return fn.subVectors(e,t),fn.lengthSq()===0&&(fn.z=1),fn.normalize(),Ti.crossVectors(i,fn),Ti.lengthSq()===0&&(Math.abs(i.z)===1?fn.x+=1e-4:fn.z+=1e-4,fn.normalize(),Ti.crossVectors(i,fn)),Ti.normalize(),To.crossVectors(fn,Ti),s[0]=Ti.x,s[4]=To.x,s[8]=fn.x,s[1]=Ti.y,s[5]=To.y,s[9]=fn.y,s[2]=Ti.z,s[6]=To.z,s[10]=fn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],u=i[1],f=i[5],d=i[9],g=i[13],x=i[2],y=i[6],p=i[10],m=i[14],v=i[3],E=i[7],M=i[11],w=i[15],A=s[0],_=s[4],T=s[8],k=s[12],I=s[1],B=s[5],V=s[9],Z=s[13],N=s[2],$=s[6],R=s[10],P=s[14],U=s[3],F=s[7],G=s[11],te=s[15];return r[0]=o*A+a*I+c*N+l*U,r[4]=o*_+a*B+c*$+l*F,r[8]=o*T+a*V+c*R+l*G,r[12]=o*k+a*Z+c*P+l*te,r[1]=u*A+f*I+d*N+g*U,r[5]=u*_+f*B+d*$+g*F,r[9]=u*T+f*V+d*R+g*G,r[13]=u*k+f*Z+d*P+g*te,r[2]=x*A+y*I+p*N+m*U,r[6]=x*_+y*B+p*$+m*F,r[10]=x*T+y*V+p*R+m*G,r[14]=x*k+y*Z+p*P+m*te,r[3]=v*A+E*I+M*N+w*U,r[7]=v*_+E*B+M*$+w*F,r[11]=v*T+E*V+M*R+w*G,r[15]=v*k+E*Z+M*P+w*te,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],u=e[2],f=e[6],d=e[10],g=e[14],x=e[3],y=e[7],p=e[11],m=e[15],v=c*g-l*d,E=a*g-l*f,M=a*d-c*f,w=o*g-l*u,A=o*d-c*u,_=o*f-a*u;return t*(y*v-p*E+m*M)-i*(x*v-p*w+m*A)+s*(x*E-y*w+m*_)-r*(x*M-y*A+p*_)}determinantAffine(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],o=e[5],a=e[9],c=e[2],l=e[6],u=e[10];return t*(o*u-a*l)-i*(r*u-a*c)+s*(r*l-o*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],f=e[9],d=e[10],g=e[11],x=e[12],y=e[13],p=e[14],m=e[15],v=t*a-i*o,E=t*c-s*o,M=t*l-r*o,w=i*c-s*a,A=i*l-r*a,_=s*l-r*c,T=u*y-f*x,k=u*p-d*x,I=u*m-g*x,B=f*p-d*y,V=f*m-g*y,Z=d*m-g*p,N=v*Z-E*V+M*B+w*I-A*k+_*T;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let $=1/N;return e[0]=(a*Z-c*V+l*B)*$,e[1]=(s*V-i*Z-r*B)*$,e[2]=(y*_-p*A+m*w)*$,e[3]=(d*A-f*_-g*w)*$,e[4]=(c*I-o*Z-l*k)*$,e[5]=(t*Z-s*I+r*k)*$,e[6]=(p*M-x*_-m*E)*$,e[7]=(u*_-d*M+g*E)*$,e[8]=(o*V-a*I+l*T)*$,e[9]=(i*I-t*V-r*T)*$,e[10]=(x*A-y*M+m*v)*$,e[11]=(f*M-u*A-g*v)*$,e[12]=(a*k-o*B-c*T)*$,e[13]=(t*B-i*k+s*T)*$,e[14]=(y*E-x*w-p*v)*$,e[15]=(u*w-f*E+d*v)*$,this}scale(e){let t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),s=Math.sin(t),r=1-i,o=e.x,a=e.y,c=e.z,l=r*o,u=r*a;return this.set(l*o+i,l*a-s*c,l*c+s*a,0,l*a+s*c,u*a+i,u*c-s*o,0,l*c-s*a,u*c+s*o,r*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,o){return this.set(1,i,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){let s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,u=o+o,f=a+a,d=r*l,g=r*u,x=r*f,y=o*u,p=o*f,m=a*f,v=c*l,E=c*u,M=c*f,w=i.x,A=i.y,_=i.z;return s[0]=(1-(y+m))*w,s[1]=(g+M)*w,s[2]=(x-E)*w,s[3]=0,s[4]=(g-M)*A,s[5]=(1-(d+m))*A,s[6]=(p+v)*A,s[7]=0,s[8]=(x+E)*_,s[9]=(p-v)*_,s[10]=(1-(d+y))*_,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let o=ps.set(s[0],s[1],s[2]).length(),a=ps.set(s[4],s[5],s[6]).length(),c=ps.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Cn.copy(this);let l=1/o,u=1/a,f=1/c;return Cn.elements[0]*=l,Cn.elements[1]*=l,Cn.elements[2]*=l,Cn.elements[4]*=u,Cn.elements[5]*=u,Cn.elements[6]*=u,Cn.elements[8]*=f,Cn.elements[9]*=f,Cn.elements[10]*=f,t.setFromRotationMatrix(Cn),i.x=o,i.y=a,i.z=c,this}makePerspective(e,t,i,s,r,o,a=Mn,c=!1){let l=this.elements,u=2*r/(t-e),f=2*r/(i-s),d=(t+e)/(t-e),g=(i+s)/(i-s),x,y;if(c)x=r/(o-r),y=o*r/(o-r);else if(a===Mn)x=-(o+r)/(o-r),y=-2*o*r/(o-r);else if(a===Ds)x=-o/(o-r),y=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=f,l[9]=g,l[13]=0,l[2]=0,l[6]=0,l[10]=x,l[14]=y,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,s,r,o,a=Mn,c=!1){let l=this.elements,u=2/(t-e),f=2/(i-s),d=-(t+e)/(t-e),g=-(i+s)/(i-s),x,y;if(c)x=1/(o-r),y=o/(o-r);else if(a===Mn)x=-2/(o-r),y=-(o+r)/(o-r);else if(a===Ds)x=-1/(o-r),y=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=f,l[9]=0,l[13]=g,l[2]=0,l[6]=0,l[10]=x,l[14]=y,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};wa.prototype.isMatrix4=!0;var gt=wa,ps=new W,Cn=new gt,Om=new W(0,0,0),Fm=new W(1,1,1),Ti=new W,To=new W,fn=new W,gd=new gt,xd=new Yn,ui=class n{constructor(e=0,t=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],u=s[9],f=s[2],d=s[6],g=s[10];switch(t){case"XYZ":this._y=Math.asin(nt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,g),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-nt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,g),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(nt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,g),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-nt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,g),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(nt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(a,g));break;case"XZY":this._z=Math.asin(-nt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,g),this._y=0);break;default:Fe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return gd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(gd,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return xd.setFromEuler(this),this.setFromQuaternion(xd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ui.DEFAULT_ORDER="XYZ";var Sr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Bm=0,_d=new W,ms=new Yn,ii=new gt,Eo=new W,ar=new W,zm=new W,Gm=new Yn,yd=new W(1,0,0),vd=new W(0,1,0),bd=new W(0,0,1),Sd={type:"added"},Hm={type:"removed"},gs={type:"childadded",child:null},cl={type:"childremoved",child:null},Pt=class n extends qn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Bm++}),this.uuid=ns(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new W,t=new ui,i=new Yn,s=new W(1,1,1);function r(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new gt},normalMatrix:{value:new He}}),this.matrix=new gt,this.matrixWorld=new gt,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Sr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ms.setFromAxisAngle(e,t),this.quaternion.multiply(ms),this}rotateOnWorldAxis(e,t){return ms.setFromAxisAngle(e,t),this.quaternion.premultiply(ms),this}rotateX(e){return this.rotateOnAxis(yd,e)}rotateY(e){return this.rotateOnAxis(vd,e)}rotateZ(e){return this.rotateOnAxis(bd,e)}translateOnAxis(e,t){return _d.copy(e).applyQuaternion(this.quaternion),this.position.add(_d.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(yd,e)}translateY(e){return this.translateOnAxis(vd,e)}translateZ(e){return this.translateOnAxis(bd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ii.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Eo.copy(e):Eo.set(e,t,i);let s=this.parent;this.updateWorldMatrix(!0,!1),ar.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ii.lookAt(ar,Eo,this.up):ii.lookAt(Eo,ar,this.up),this.quaternion.setFromRotationMatrix(ii),s&&(ii.extractRotation(s.matrixWorld),ms.setFromRotationMatrix(ii),this.quaternion.premultiply(ms.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Be("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Sd),gs.child=e,this.dispatchEvent(gs),gs.child=null):Be("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Hm),cl.child=e,this.dispatchEvent(cl),cl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ii.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ii.multiply(e.parent.matrixWorld)),e.applyMatrix4(ii),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Sd),gs.child=e,this.dispatchEvent(gs),gs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){let o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ar,e,zm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ar,Gm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,i)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let f=c[l];r(e.shapes,f)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){let a=o(e.geometries),c=o(e.materials),l=o(e.textures),u=o(e.images),f=o(e.shapes),d=o(e.skeletons),g=o(e.animations),x=o(e.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),d.length>0&&(i.skeletons=d),g.length>0&&(i.animations=g),x.length>0&&(i.nodes=x)}return i.object=s,i;function o(a){let c=[];for(let l in a){let u=a[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let s=e.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Pt.DEFAULT_UP=new W(0,1,0);Pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var ln=class extends Pt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Vm={type:"move"},ks=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ln,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ln,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new W,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new W),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ln,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new W,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new W,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let y of e.hand.values()){let p=t.getJointPose(y,i),m=this._getHandJoint(l,y);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.quaternion,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}let u=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],d=u.position.distanceTo(f.position),g=.02,x=.005;l.inputState.pinching&&d>g+x?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=g-x&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.quaternion,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.quaternion,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Vm)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new ln;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},wf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ei={h:0,s:0,l:0},wo={h:0,s:0,l:0};function ll(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var Ye=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=wt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,et.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=et.workingColorSpace){return this.r=e,this.g=t,this.b=i,et.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=et.workingColorSpace){if(e=Dm(e,1),t=nt(t,0,1),i=nt(i,0,1),t===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+t):i+t-i*t,o=2*i-r;this.r=ll(o,r,e+1/3),this.g=ll(o,r,e),this.b=ll(o,r,e-1/3)}return et.colorSpaceToWorking(this,s),this}setStyle(e,t=wt){function i(r){r!==void 0&&parseFloat(r)<1&&Fe("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,t);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Fe("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);Fe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=wt){let i=wf[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Fe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=li(e.r),this.g=li(e.g),this.b=li(e.b),this}copyLinearToSRGB(e){return this.r=Ps(e.r),this.g=Ps(e.g),this.b=Ps(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=wt){return et.workingToColorSpace($t.copy(this),e),Math.round(nt($t.r*255,0,255))*65536+Math.round(nt($t.g*255,0,255))*256+Math.round(nt($t.b*255,0,255))}getHexString(e=wt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=et.workingColorSpace){et.workingToColorSpace($t.copy(this),t);let i=$t.r,s=$t.g,r=$t.b,o=Math.max(i,s,r),a=Math.min(i,s,r),c,l,u=(a+o)/2;if(a===o)c=0,l=0;else{let f=o-a;switch(l=u<=.5?f/(o+a):f/(2-o-a),o){case i:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-i)/f+2;break;case r:c=(i-s)/f+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=et.workingColorSpace){return et.workingToColorSpace($t.copy(this),t),e.r=$t.r,e.g=$t.g,e.b=$t.b,e}getStyle(e=wt){et.workingToColorSpace($t.copy(this),e);let t=$t.r,i=$t.g,s=$t.b;return e!==wt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Ei),this.setHSL(Ei.h+e,Ei.s+t,Ei.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Ei),e.getHSL(wo);let i=il(Ei.h,wo.h,t),s=il(Ei.s,wo.s,t),r=il(Ei.l,wo.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},$t=new Ye;Ye.NAMES=wf;var Mr=class n{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ye(e),this.density=t}clone(){return new n(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var Tr=class extends Pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ui,this.environmentIntensity=1,this.environmentRotation=new ui,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Rn=new W,si=new W,hl=new W,ri=new W,xs=new W,_s=new W,Md=new W,ul=new W,dl=new W,fl=new W,pl=new vt,ml=new vt,gl=new vt,ci=class n{constructor(e=new W,t=new W,i=new W){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Rn.subVectors(e,t),s.cross(Rn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Rn.subVectors(s,t),si.subVectors(i,t),hl.subVectors(e,t);let o=Rn.dot(Rn),a=Rn.dot(si),c=Rn.dot(hl),l=si.dot(si),u=si.dot(hl),f=o*l-a*a;if(f===0)return r.set(0,0,0),null;let d=1/f,g=(l*c-a*u)*d,x=(o*u-a*c)*d;return r.set(1-g-x,x,g)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,ri)===null?!1:ri.x>=0&&ri.y>=0&&ri.x+ri.y<=1}static getInterpolation(e,t,i,s,r,o,a,c){return this.getBarycoord(e,t,i,s,ri)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,ri.x),c.addScaledVector(o,ri.y),c.addScaledVector(a,ri.z),c)}static getInterpolatedAttribute(e,t,i,s,r,o){return pl.setScalar(0),ml.setScalar(0),gl.setScalar(0),pl.fromBufferAttribute(e,t),ml.fromBufferAttribute(e,i),gl.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(pl,r.x),o.addScaledVector(ml,r.y),o.addScaledVector(gl,r.z),o}static isFrontFacing(e,t,i,s){return Rn.subVectors(i,t),si.subVectors(e,t),Rn.cross(si).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Rn.subVectors(this.c,this.b),si.subVectors(this.a,this.b),Rn.cross(si).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return n.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,s=this.b,r=this.c,o,a;xs.subVectors(s,i),_s.subVectors(r,i),ul.subVectors(e,i);let c=xs.dot(ul),l=_s.dot(ul);if(c<=0&&l<=0)return t.copy(i);dl.subVectors(e,s);let u=xs.dot(dl),f=_s.dot(dl);if(u>=0&&f<=u)return t.copy(s);let d=c*f-u*l;if(d<=0&&c>=0&&u<=0&&c-u>0)return o=c/(c-u),t.copy(i).addScaledVector(xs,o);fl.subVectors(e,r);let g=xs.dot(fl),x=_s.dot(fl);if(x>=0&&g<=x)return t.copy(r);let y=g*l-c*x;if(y<=0&&l>=0&&x<=0)return a=l/(l-x),t.copy(i).addScaledVector(_s,a);let p=u*x-g*f;if(p<=0&&f-u>=0&&g-x>=0)return Md.subVectors(r,s),a=(f-u)/(f-u+(g-x)),t.copy(s).addScaledVector(Md,a);let m=1/(p+y+d);return o=y*m,a=d*m,t.copy(i).addScaledVector(xs,o).addScaledVector(_s,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Ri=class{constructor(e=new W(1/0,1/0,1/0),t=new W(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Pn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Pn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=Pn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Pn):Pn.fromBufferAttribute(r,o),Pn.applyMatrix4(e.matrixWorld),this.expandByPoint(Pn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ao.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ao.copy(i.boundingBox)),Ao.applyMatrix4(e.matrixWorld),this.union(Ao)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Pn),Pn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(cr),Co.subVectors(this.max,cr),ys.subVectors(e.a,cr),vs.subVectors(e.b,cr),bs.subVectors(e.c,cr),wi.subVectors(vs,ys),Ai.subVectors(bs,vs),Xi.subVectors(ys,bs);let t=[0,-wi.z,wi.y,0,-Ai.z,Ai.y,0,-Xi.z,Xi.y,wi.z,0,-wi.x,Ai.z,0,-Ai.x,Xi.z,0,-Xi.x,-wi.y,wi.x,0,-Ai.y,Ai.x,0,-Xi.y,Xi.x,0];return!xl(t,ys,vs,bs,Co)||(t=[1,0,0,0,1,0,0,0,1],!xl(t,ys,vs,bs,Co))?!1:(Ro.crossVectors(wi,Ai),t=[Ro.x,Ro.y,Ro.z],xl(t,ys,vs,bs,Co))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Pn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Pn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(oi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),oi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),oi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),oi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),oi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),oi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),oi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),oi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(oi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},oi=[new W,new W,new W,new W,new W,new W,new W,new W],Pn=new W,Ao=new Ri,ys=new W,vs=new W,bs=new W,wi=new W,Ai=new W,Xi=new W,cr=new W,Co=new W,Ro=new W,qi=new W;function xl(n,e,t,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){qi.fromArray(n,r);let a=s.x*Math.abs(qi.x)+s.y*Math.abs(qi.y)+s.z*Math.abs(qi.z),c=e.dot(qi),l=t.dot(qi),u=i.dot(qi);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}var Rt=new W,Po=new ze,Wm=0,Ht=class extends qn{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Wm++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=sh,this.updateRanges=[],this.gpuType=kn,this.version=0,this._normalizationScale=e!==void 0?pc(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Po.fromBufferAttribute(this,t),Po.applyMatrix3(e),this.setXY(t,Po.x,Po.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix3(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix4(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Rt.fromBufferAttribute(this,t),Rt.applyNormalMatrix(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Rt.fromBufferAttribute(this,t),Rt.transformDirection(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=this._denormalize(i)),i}setComponent(e,t,i){return this.normalized&&(i=this._normalize(i)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),i=this._normalize(i)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),i=this._normalize(i),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),i=this._normalize(i),s=this._normalize(s),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):Tf(e,this.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):Ef(e,this.array)}};var Er=class extends Ht{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var wr=class extends Ht{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var at=class extends Ht{constructor(e,t,i){super(new Float32Array(e),t,i)}},Xm=new Ri,lr=new W,_l=new W,Ji=class{constructor(e=new W,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):Xm.setFromPoints(e).getCenter(i);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;lr.subVectors(e,this.center);let t=lr.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(lr,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(_l.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(lr.copy(e.center).add(_l)),this.expandByPoint(lr.copy(e.center).sub(_l))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},qm=0,Sn=new gt,yl=new Pt,Ss=new W,pn=new Ri,hr=new Ri,Gt=new W,At=class n extends qn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:qm++}),this.uuid=ns(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Im(e)?wr:Er)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new He().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Sn.makeRotationFromQuaternion(e),this.applyMatrix4(Sn),this}rotateX(e){return Sn.makeRotationX(e),this.applyMatrix4(Sn),this}rotateY(e){return Sn.makeRotationY(e),this.applyMatrix4(Sn),this}rotateZ(e){return Sn.makeRotationZ(e),this.applyMatrix4(Sn),this}translate(e,t,i){return Sn.makeTranslation(e,t,i),this.applyMatrix4(Sn),this}scale(e,t,i){return Sn.makeScale(e,t,i),this.applyMatrix4(Sn),this}lookAt(e){return yl.lookAt(e),yl.updateMatrix(),this.applyMatrix4(yl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ss).negate(),this.translate(Ss.x,Ss.y,Ss.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new at(i,3))}else{let i=Math.min(e.length,t.count);for(let s=0;s<i;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Fe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ri);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Be("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new W(-1/0,-1/0,-1/0),new W(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){let r=t[i];pn.setFromBufferAttribute(r),this.morphTargetsRelative?(Gt.addVectors(this.boundingBox.min,pn.min),this.boundingBox.expandByPoint(Gt),Gt.addVectors(this.boundingBox.max,pn.max),this.boundingBox.expandByPoint(Gt)):(this.boundingBox.expandByPoint(pn.min),this.boundingBox.expandByPoint(pn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Be('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ji);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Be("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new W,1/0);return}if(e){let i=this.boundingSphere.center;if(pn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];hr.setFromBufferAttribute(a),this.morphTargetsRelative?(Gt.addVectors(pn.min,hr.min),pn.expandByPoint(Gt),Gt.addVectors(pn.max,hr.max),pn.expandByPoint(Gt)):(pn.expandByPoint(hr.min),pn.expandByPoint(hr.max))}pn.getCenter(i);let s=0;for(let r=0,o=e.count;r<o;r++)Gt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Gt));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)Gt.fromBufferAttribute(a,l),c&&(Ss.fromBufferAttribute(e,l),Gt.add(Ss)),s=Math.max(s,i.distanceToSquared(Gt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Be('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Be("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,s=t.normal,r=t.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==i.count)&&(o=new Ht(new Float32Array(4*i.count),4),this.setAttribute("tangent",o));let a=[],c=[],l=new Uint8Array(i.count);for(let k=0;k<i.count;k++)a[k]=new W,c[k]=new W;let u=new W,f=new W,d=new W,g=new ze,x=new ze,y=new ze,p=new W,m=new W;function v(k,I,B){l[k]=l[I]=l[B]=1,u.fromBufferAttribute(i,k),f.fromBufferAttribute(i,I),d.fromBufferAttribute(i,B),g.fromBufferAttribute(r,k),x.fromBufferAttribute(r,I),y.fromBufferAttribute(r,B),f.sub(u),d.sub(u),x.sub(g),y.sub(g);let V=1/(x.x*y.y-y.x*x.y);isFinite(V)&&(p.copy(f).multiplyScalar(y.y).addScaledVector(d,-x.y).multiplyScalar(V),m.copy(d).multiplyScalar(x.x).addScaledVector(f,-y.x).multiplyScalar(V),a[k].add(p),a[I].add(p),a[B].add(p),c[k].add(m),c[I].add(m),c[B].add(m))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let k=0,I=E.length;k<I;++k){let B=E[k],V=B.start,Z=B.count;for(let N=V,$=V+Z;N<$;N+=3)v(e.getX(N+0),e.getX(N+1),e.getX(N+2))}let M=new W,w=new W,A=new W,_=new W;function T(k){A.fromBufferAttribute(s,k),_.copy(A);let I=a[k];M.copy(I),M.sub(A.multiplyScalar(A.dot(I))).normalize(),w.crossVectors(_,I);let V=w.dot(c[k])<0?-1:1;o.setXYZW(k,M.x,M.y,M.z,V)}for(let k=0,I=i.count;k<I;++k)l[k]&&T(k);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Ht(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,g=i.count;d<g;d++)i.setXYZ(d,0,0,0);let s=new W,r=new W,o=new W,a=new W,c=new W,l=new W,u=new W,f=new W;if(e)for(let d=0,g=e.count;d<g;d+=3){let x=e.getX(d+0),y=e.getX(d+1),p=e.getX(d+2);s.fromBufferAttribute(t,x),r.fromBufferAttribute(t,y),o.fromBufferAttribute(t,p),u.subVectors(o,r),f.subVectors(s,r),u.cross(f),a.fromBufferAttribute(i,x),c.fromBufferAttribute(i,y),l.fromBufferAttribute(i,p),a.add(u),c.add(u),l.add(u),i.setXYZ(x,a.x,a.y,a.z),i.setXYZ(y,c.x,c.y,c.z),i.setXYZ(p,l.x,l.y,l.z)}else for(let d=0,g=t.count;d<g;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),u.subVectors(o,r),f.subVectors(s,r),u.cross(f),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Gt.fromBufferAttribute(e,t),Gt.normalize(),e.setXYZ(t,Gt.x,Gt.y,Gt.z)}toNonIndexed(){function e(a,c){let l=a.array,u=a.itemSize,f=a.normalized,d=new l.constructor(c.length*u),g=0,x=0;for(let y=0,p=c.length;y<p;y++){a.isInterleavedBufferAttribute?g=c[y]*a.data.stride+a.offset:g=c[y]*u;for(let m=0;m<u;m++)d[x++]=l[g++]}return new Ht(d,u,f)}if(this.index===null)return Fe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=e(c,i);t.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let u=0,f=l.length;u<f;u++){let d=l[u],g=e(d,i);c.push(g)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let c in i){let l=i[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let f=0,d=l.length;f<d;f++){let g=l[f];u.push(g.toJSON(e.data))}u.length>0&&(s[c]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let s=e.attributes;for(let l in s){let u=s[l];this.setAttribute(l,u.clone(t))}let r=e.morphAttributes;for(let l in r){let u=[],f=r[l];for(let d=0,g=f.length;d<g;d++)u.push(f[d].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,u=o.length;l<u;l++){let f=o[l];this.addGroup(f.start,f.count,f.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ar=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=sh,this.updateRanges=[],this.version=0,this.uuid=ns()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=Td(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=this.array.slice(0).buffer);let i=new this.array.constructor(e.arrayBuffers[t]),s=new this.constructor(i,this.stride);return s.setUsage(this.usage),s}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=Td(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=Array.from(new Uint32Array(this.array.slice(0).buffer)));let i={uuid:this.uuid,buffer:t,type:this.array.constructor.name,stride:this.stride};return i.usage=this.usage,i}};function Td(n){return n.buffer._uuid===void 0&&(n.buffer._uuid=ns()),n.byteOffset===0&&n.byteLength===n.buffer.byteLength?n.buffer._uuid:n.buffer._uuid+":"+n.byteOffset+":"+n.byteLength}var tn=new W,Os=class n{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s,this._normalizationScale=e!==void 0?pc(e.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)tn.fromBufferAttribute(this,t),tn.applyMatrix4(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)tn.fromBufferAttribute(this,t),tn.applyNormalMatrix(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)tn.fromBufferAttribute(this,t),tn.transformDirection(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=this._denormalize(i)),i}setComponent(e,t,i){return this.normalized&&(i=this._normalize(i)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=this._denormalize(t)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=this._denormalize(t)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=this._denormalize(t)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=this._denormalize(t)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),i=this._normalize(i)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),i=this._normalize(i),s=this._normalize(s)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),i=this._normalize(i),s=this._normalize(s),r=this._normalize(r)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){yr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Ht(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new n(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){yr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):Tf(e,this.data.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):Ef(e,this.data.array)}},vl=new W,Ym=new W,Zm=new He,In=class{constructor(e=new W(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let s=vl.subVectors(i,t).cross(Ym.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let s=e.delta(vl),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(s,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||Zm.getNormalMatrix(e),s=this.coplanarPoint(vl).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Jm=0,Zn=class extends qn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Jm++}),this.uuid=ns(),this.name="",this.type="Material",this.blending=Ws,this.side=Oi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Fl,this.blendDst=Bl,this.blendEquation=Qi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ye(0,0,0),this.blendAlpha=0,this.depthFunc=Is,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ff,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=$o,this.stencilZFail=$o,this.stencilZPass=$o,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){Fe(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Fe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(i.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(i.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(i.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(i.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ye().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new In().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new ze().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ze().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},di=class extends Zn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ye(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Ms,ur=new W,Ts=new W,Es=new W,ws=new ze,dr=new ze,Af=new gt,Io=new W,fr=new W,Lo=new W,Ed=new ze,bl=new ze,wd=new ze,Pi=class extends Pt{constructor(e=new di){if(super(),this.isSprite=!0,this.type="Sprite",Ms===void 0){Ms=new At;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new Ar(t,5);Ms.setIndex([0,1,2,0,2,3]),Ms.setAttribute("position",new Os(i,3,0,!1)),Ms.setAttribute("uv",new Os(i,2,3,!1))}this.geometry=Ms,this.material=e,this.center=new ze(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&Be('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ts.setFromMatrixScale(this.matrixWorld),Af.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Es.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ts.multiplyScalar(-Es.z);let i=this.material.rotation,s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));let o=this.center;Do(Io.set(-.5,-.5,0),Es,o,Ts,s,r),Do(fr.set(.5,-.5,0),Es,o,Ts,s,r),Do(Lo.set(.5,.5,0),Es,o,Ts,s,r),Ed.set(0,0),bl.set(1,0),wd.set(1,1);let a=e.ray.intersectTriangle(Io,fr,Lo,!1,ur);if(a===null&&(Do(fr.set(-.5,.5,0),Es,o,Ts,s,r),bl.set(0,1),a=e.ray.intersectTriangle(Io,Lo,fr,!1,ur),a===null))return;let c=e.ray.origin.distanceTo(ur);c<e.near||c>e.far||t.push({distance:c,point:ur.clone(),uv:ci.getInterpolation(ur,Io,fr,Lo,Ed,bl,wd,new ze),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}toJSON(e){let t=super.toJSON(e);return t.object.center=this.center.toArray(),t}};function Do(n,e,t,i,s,r){ws.subVectors(n,t).addScalar(.5).multiply(i),s!==void 0?(dr.x=r*ws.x-s*ws.y,dr.y=s*ws.x+r*ws.y):dr.copy(ws),n.copy(e),n.x+=dr.x,n.y+=dr.y,n.applyMatrix4(Af)}var ai=new W,Sl=new W,No=new W,Uo=new W,Cr=class{constructor(e=new W,t=new W(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ai)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ai.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ai.copy(this.origin).addScaledVector(this.direction,t),ai.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Sl.copy(e).add(t).multiplyScalar(.5),No.copy(t).sub(e).normalize(),Uo.copy(this.origin).sub(Sl);let r=e.distanceTo(t)*.5,o=-this.direction.dot(No),a=Uo.dot(this.direction),c=-Uo.dot(No),l=Uo.lengthSq(),u=Math.abs(1-o*o),f,d,g,x;if(u>0)if(f=o*c-a,d=o*a-c,x=r*u,f>=0)if(d>=-x)if(d<=x){let y=1/u;f*=y,d*=y,g=f*(f+o*d+2*a)+d*(o*f+d+2*c)+l}else d=r,f=Math.max(0,-(o*d+a)),g=-f*f+d*(d+2*c)+l;else d=-r,f=Math.max(0,-(o*d+a)),g=-f*f+d*(d+2*c)+l;else d<=-x?(f=Math.max(0,-(-o*r+a)),d=f>0?-r:Math.min(Math.max(-r,-c),r),g=-f*f+d*(d+2*c)+l):d<=x?(f=0,d=Math.min(Math.max(-r,-c),r),g=d*(d+2*c)+l):(f=Math.max(0,-(o*r+a)),d=f>0?r:Math.min(Math.max(-r,-c),r),g=-f*f+d*(d+2*c)+l);else d=o>0?-r:r,f=Math.max(0,-(o*d+a)),g=-f*f+d*(d+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Sl).addScaledVector(No,d),g}intersectSphere(e,t){if(e.radius<0)return null;ai.subVectors(e.center,this.origin);let i=ai.dot(this.direction),s=ai.dot(ai)-i*i,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,o,a,c,l=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,d=this.origin;return l>=0?(i=(e.min.x-d.x)*l,s=(e.max.x-d.x)*l):(i=(e.max.x-d.x)*l,s=(e.min.x-d.x)*l),u>=0?(r=(e.min.y-d.y)*u,o=(e.max.y-d.y)*u):(r=(e.max.y-d.y)*u,o=(e.min.y-d.y)*u),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),f>=0?(a=(e.min.z-d.z)*f,c=(e.max.z-d.z)*f):(a=(e.max.z-d.z)*f,c=(e.min.z-d.z)*f),i>c||a>s)||((a>i||i!==i)&&(i=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,ai)!==null}intersectTriangle(e,t,i,s,r){let o=this.origin,a=this.direction,c=a.x,l=a.y,u=a.z,f=e.x-o.x,d=e.y-o.y,g=e.z-o.z,x=t.x-o.x,y=t.y-o.y,p=t.z-o.z,m=i.x-o.x,v=i.y-o.y,E=i.z-o.z,M=Math.abs(c),w=Math.abs(l),A=Math.abs(u),_,T,k,I,B,V,Z,N,$,R,P,U;if(M>=w&&M>=A?(k=c,V=f,$=x,U=m,c>=0?(_=l,T=u,I=d,B=g,Z=y,N=p,R=v,P=E):(_=u,T=l,I=g,B=d,Z=p,N=y,R=E,P=v)):w>=A?(k=l,V=d,$=y,U=v,l>=0?(_=u,T=c,I=g,B=f,Z=p,N=x,R=E,P=m):(_=c,T=u,I=f,B=g,Z=x,N=p,R=m,P=E)):(k=u,V=g,$=p,U=E,u>=0?(_=c,T=l,I=f,B=d,Z=x,N=y,R=m,P=v):(_=l,T=c,I=d,B=f,Z=y,N=x,R=v,P=m)),k===0)return null;let F=_/k,G=T/k,te=1/k,ce=I-F*V,Ae=B-G*V,j=Z-F*$,le=N-G*$,ve=R-F*U,Ee=P-G*U,ue=ve*le-Ee*j,Ge=ce*Ee-Ae*ve,ct=j*Ae-le*ce;if(s){if(ue<0||Ge<0||ct<0)return null}else if((ue<0||Ge<0||ct<0)&&(ue>0||Ge>0||ct>0))return null;let Oe=ue+Ge+ct;if(Oe===0)return null;let ht=te*(ue*V+Ge*$+ct*U);return(Oe>0?ht<0:ht>0)?null:this.at(ht/Oe,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},It=class extends Zn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ui,this.combine=Aa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Ad=new gt,Yi=new Cr,ko=new Ji,Cd=new W,Oo=new W,Fo=new W,Bo=new W,Ml=new W,zo=new W,Rd=new W,Go=new W,tt=class extends Pt{constructor(e=new At,t=new It){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(s,e);let a=this.morphTargetInfluences;if(r&&a){zo.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let u=a[c],f=r[c];u!==0&&(Ml.fromBufferAttribute(f,e),o?zo.addScaledVector(Ml,u):zo.addScaledVector(Ml.sub(t),u))}t.add(zo)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ko.copy(i.boundingSphere),ko.applyMatrix4(r),Yi.copy(e.ray).recast(e.near),!(ko.containsPoint(Yi.origin)===!1&&(Yi.intersectSphere(ko,Cd)===null||Yi.origin.distanceToSquared(Cd)>(e.far-e.near)**2))&&(Ad.copy(r).invert(),Yi.copy(e.ray).applyMatrix4(Ad),!(i.boundingBox!==null&&Yi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Yi)))}_computeIntersections(e,t,i){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,d=r.groups,g=r.drawRange;if(a!==null)if(Array.isArray(o))for(let x=0,y=d.length;x<y;x++){let p=d[x],m=o[p.materialIndex],v=Math.max(p.start,g.start),E=Math.min(a.count,Math.min(p.start+p.count,g.start+g.count));for(let M=v,w=E;M<w;M+=3){let A=a.getX(M),_=a.getX(M+1),T=a.getX(M+2);s=Ho(this,m,e,i,l,u,f,A,_,T),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{let x=Math.max(0,g.start),y=Math.min(a.count,g.start+g.count);for(let p=x,m=y;p<m;p+=3){let v=a.getX(p),E=a.getX(p+1),M=a.getX(p+2);s=Ho(this,o,e,i,l,u,f,v,E,M),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let x=0,y=d.length;x<y;x++){let p=d[x],m=o[p.materialIndex],v=Math.max(p.start,g.start),E=Math.min(c.count,Math.min(p.start+p.count,g.start+g.count));for(let M=v,w=E;M<w;M+=3){let A=M,_=M+1,T=M+2;s=Ho(this,m,e,i,l,u,f,A,_,T),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{let x=Math.max(0,g.start),y=Math.min(c.count,g.start+g.count);for(let p=x,m=y;p<m;p+=3){let v=p,E=p+1,M=p+2;s=Ho(this,o,e,i,l,u,f,v,E,M),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}}};function $m(n,e,t,i,s,r,o,a){let c;if(e.side===on?c=i.intersectTriangle(o,r,s,!0,a):c=i.intersectTriangle(s,r,o,e.side===Oi,a),c===null)return null;Go.copy(a),Go.applyMatrix4(n.matrixWorld);let l=t.ray.origin.distanceTo(Go);return l<t.near||l>t.far?null:{distance:l,point:Go.clone(),object:n}}function Ho(n,e,t,i,s,r,o,a,c,l){n.getVertexPosition(a,Oo),n.getVertexPosition(c,Fo),n.getVertexPosition(l,Bo);let u=$m(n,e,t,i,Oo,Fo,Bo,Rd);if(u){let f=new W;ci.getBarycoord(Rd,Oo,Fo,Bo,f),s&&(u.uv=ci.getInterpolatedAttribute(s,a,c,l,f,new ze)),r&&(u.uv1=ci.getInterpolatedAttribute(r,a,c,l,f,new ze)),o&&(u.normal=ci.getInterpolatedAttribute(o,a,c,l,f,new W),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let d={a,b:c,c:l,normal:new W,materialIndex:0};ci.getNormal(Oo,Fo,Bo,d.normal),u.face=d,u.barycoord=f}return u}var la=class extends sn{constructor(e=null,t=1,i=1,s,r,o,a,c,l=Vt,u=Vt,f,d){super(null,o,a,c,l,u,s,r,f,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Zi=new Ji,jm=new ze(.5,.5),Vo=new W,Ii=class{constructor(e=new In,t=new In,i=new In,s=new In,r=new In,o=new In){this.planes=[e,t,i,s,r,o]}set(e,t,i,s,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Mn,i=!1){let s=this.planes,r=e.elements,o=r[0],a=r[1],c=r[2],l=r[3],u=r[4],f=r[5],d=r[6],g=r[7],x=r[8],y=r[9],p=r[10],m=r[11],v=r[12],E=r[13],M=r[14],w=r[15];if(s[0].setComponents(l-o,g-u,m-x,w-v).normalize(),s[1].setComponents(l+o,g+u,m+x,w+v).normalize(),s[2].setComponents(l+a,g+f,m+y,w+E).normalize(),s[3].setComponents(l-a,g-f,m-y,w-E).normalize(),i)s[4].setComponents(c,d,p,M).normalize(),s[5].setComponents(l-c,g-d,m-p,w-M).normalize();else if(s[4].setComponents(l-c,g-d,m-p,w-M).normalize(),t===Mn)s[5].setComponents(l+c,g+d,m+p,w+M).normalize();else if(t===Ds)s[5].setComponents(c,d,p,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Zi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Zi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Zi)}intersectsSprite(e){Zi.center.set(0,0,0);let t=jm.distanceTo(e.center);return Zi.radius=.7071067811865476+t,Zi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Zi)}intersectsSphere(e){let t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let s=t[i];if(Vo.x=s.normal.x>0?e.max.x:e.min.x,Vo.y=s.normal.y>0?e.max.y:e.min.y,Vo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Vo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Pd=new gt,ha=class n{constructor(){this.coordinateSystem=Mn,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,i=this._frustums;for(let s=0;s<t.length;s++){let r=t[s];Pd.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),i[s]===void 0&&(i[s]=new Ii),i[s].setFromProjectionMatrix(Pd,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,i=e._frustums;for(let s=0;s<e._count;s++)t[s]===void 0&&(t[s]=new Ii),t[s].copy(i[s]);return this._count=e._count,this}clone(){return new n().copy(this)}};var $i=class extends Zn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ye(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Id=new gt,Rl=new Cr,Wo=new Ji,Xo=new W,Fs=class extends Pt{constructor(e=new At,t=new $i){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Wo.copy(i.boundingSphere),Wo.applyMatrix4(s),Wo.radius+=r,e.ray.intersectsSphere(Wo)===!1)return;Id.copy(s).invert(),Rl.copy(e.ray).applyMatrix4(Id);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=i.index,f=i.attributes.position;if(l!==null){let d=Math.max(0,o.start),g=Math.min(l.count,o.start+o.count);for(let x=d,y=g;x<y;x++){let p=l.getX(x);Xo.fromBufferAttribute(f,p),Ld(Xo,p,c,s,e,t,this)}}else{let d=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let x=d,y=g;x<y;x++)Xo.fromBufferAttribute(f,x),Ld(Xo,x,c,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Ld(n,e,t,i,s,r,o){let a=Rl.distanceSqToPoint(n);if(a<t){let c=new W;Rl.closestPointToPoint(n,c),c.applyMatrix4(i);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var Rr=class extends sn{constructor(e=[],t=es,i,s,r,o,a,c,l,u){super(e,t,i,s,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Ln=class extends sn{constructor(e,t,i,s,r,o,a,c,l){super(e,t,i,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var fi=class extends sn{constructor(e,t,i=Un,s,r,o,a=Vt,c=Vt,l,u=hi,f=1){if(u!==hi&&u!==gi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:f};super(d,s,r,o,a,c,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Us(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Pr=class extends fi{constructor(e,t=Un,i=es,s,r,o=Vt,a=Vt,c,l=hi){let u={width:e,height:e,depth:1},f=[u,u,u,u,u,u];super(e,e,t,i,s,r,o,a,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Ir=class extends sn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},hn=class n extends At{constructor(e=1,t=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],u=[],f=[],d=0,g=0;x("z","y","x",-1,-1,i,t,e,o,r,0),x("z","y","x",1,-1,i,t,-e,o,r,1),x("x","z","y",1,1,e,i,t,s,o,2),x("x","z","y",1,-1,e,i,-t,s,o,3),x("x","y","z",1,-1,e,t,i,s,r,4),x("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new at(l,3)),this.setAttribute("normal",new at(u,3)),this.setAttribute("uv",new at(f,2));function x(y,p,m,v,E,M,w,A,_,T,k){let I=M/_,B=w/T,V=M/2,Z=w/2,N=A/2,$=_+1,R=T+1,P=0,U=0,F=new W;for(let G=0;G<R;G++){let te=G*B-Z;for(let ce=0;ce<$;ce++){let Ae=ce*I-V;F[y]=Ae*v,F[p]=te*E,F[m]=N,l.push(F.x,F.y,F.z),F[y]=0,F[p]=0,F[m]=A>0?1:-1,u.push(F.x,F.y,F.z),f.push(ce/_),f.push(1-G/T),P+=1}}for(let G=0;G<T;G++)for(let te=0;te<_;te++){let ce=d+te+$*G,Ae=d+te+$*(G+1),j=d+(te+1)+$*(G+1),le=d+(te+1)+$*G;c.push(ce,Ae,le),c.push(Ae,j,le),U+=6}a.addGroup(g,U,k),g+=U,d+=P}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}},rn=class n extends At{constructor(e=1,t=1,i=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:i,radialSegments:s,heightSegments:r},t=Math.max(0,t),i=Math.max(1,Math.floor(i)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));let o=[],a=[],c=[],l=[],u=t/2,f=Math.PI/2*e,d=t,g=2*f+d,x=i*2+r,y=s+1,p=new W,m=new W;for(let v=0;v<=x;v++){let E=0,M=0,w=0,A=0;if(v<=i){let k=v/i,I=k*Math.PI/2;M=-u-e*Math.cos(I),w=e*Math.sin(I),A=-e*Math.cos(I),E=k*f}else if(v<=i+r){let k=(v-i)/r;M=-u+k*t,w=e,A=0,E=f+k*d}else{let k=(v-i-r)/i,I=k*Math.PI/2;M=u+e*Math.sin(I),w=e*Math.cos(I),A=e*Math.sin(I),E=f+d+k*f}let _=Math.max(0,Math.min(1,E/g)),T=0;v===0?T=.5/s:v===x&&(T=-.5/s);for(let k=0;k<=s;k++){let I=k/s,B=I*Math.PI*2,V=Math.sin(B),Z=Math.cos(B);m.x=-w*Z,m.y=M,m.z=w*V,a.push(m.x,m.y,m.z),p.set(-w*Z,A,w*V),p.normalize(),c.push(p.x,p.y,p.z),l.push(I+T,_)}if(v>0){let k=(v-1)*y;for(let I=0;I<s;I++){let B=k+I,V=k+I+1,Z=v*y+I,N=v*y+I+1;o.push(B,V,Z),o.push(V,N,Z)}}}this.setIndex(o),this.setAttribute("position",new at(a,3)),this.setAttribute("normal",new at(c,3)),this.setAttribute("uv",new at(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},Lr=class n extends At{constructor(e=1,t=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:s},t=Math.max(3,t);let r=[],o=[],a=[],c=[],l=new W,u=new ze;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let f=0,d=3;f<=t;f++,d+=3){let g=i+f/t*s;l.x=e*Math.cos(g),l.y=e*Math.sin(g),o.push(l.x,l.y,l.z),a.push(0,0,1),u.x=(o[d]/e+1)/2,u.y=(o[d+1]/e+1)/2,c.push(u.x,u.y)}for(let f=1;f<=t;f++)r.push(f,f+1,0);this.setIndex(r),this.setAttribute("position",new at(o,3)),this.setAttribute("normal",new at(a,3)),this.setAttribute("uv",new at(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Dn=class n extends At{constructor(e=1,t=1,i=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let u=[],f=[],d=[],g=[],x=0,y=[],p=i/2,m=0;v(),o===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(u),this.setAttribute("position",new at(f,3)),this.setAttribute("normal",new at(d,3)),this.setAttribute("uv",new at(g,2));function v(){let M=new W,w=new W,A=0,_=(t-e)/i;for(let T=0;T<=r;T++){let k=[],I=T/r,B=I*(t-e)+e;for(let V=0;V<=s;V++){let Z=V/s,N=Z*c+a,$=Math.sin(N),R=Math.cos(N);w.x=B*$,w.y=-I*i+p,w.z=B*R,f.push(w.x,w.y,w.z),M.set($,_,R).normalize(),d.push(M.x,M.y,M.z),g.push(Z,1-I),k.push(x++)}y.push(k)}for(let T=0;T<s;T++)for(let k=0;k<r;k++){let I=y[k][T],B=y[k+1][T],V=y[k+1][T+1],Z=y[k][T+1];(e>0||k!==0)&&(u.push(I,B,Z),A+=3),(t>0||k!==r-1)&&(u.push(B,V,Z),A+=3)}l.addGroup(m,A,0),m+=A}function E(M){let w=x,A=new ze,_=new W,T=0,k=M===!0?e:t,I=M===!0?1:-1;for(let V=1;V<=s;V++)f.push(0,p*I,0),d.push(0,I,0),g.push(.5,.5),x++;let B=x;for(let V=0;V<=s;V++){let N=V/s*c+a,$=Math.cos(N),R=Math.sin(N);_.x=k*R,_.y=p*I,_.z=k*$,f.push(_.x,_.y,_.z),d.push(0,I,0),A.x=$*.5+.5,A.y=R*.5*I+.5,g.push(A.x,A.y),x++}for(let V=0;V<s;V++){let Z=w+V,N=B+V;M===!0?u.push(N,N+1,Z):u.push(N+1,N,Z),T+=3}l.addGroup(m,T,M===!0?1:2),m+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Bs=class n extends Dn{constructor(e=1,t=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,i,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new n(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},ua=class n extends At{constructor(e=[],t=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:s};let r=[],o=[];a(s),l(i),u(),this.setAttribute("position",new at(r,3)),this.setAttribute("normal",new at(r.slice(),3)),this.setAttribute("uv",new at(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(v){let E=new W,M=new W,w=new W;for(let A=0;A<t.length;A+=3)g(t[A+0],E),g(t[A+1],M),g(t[A+2],w),c(E,M,w,v)}function c(v,E,M,w){let A=w+1,_=[];for(let T=0;T<=A;T++){_[T]=[];let k=v.clone().lerp(M,T/A),I=E.clone().lerp(M,T/A),B=A-T;for(let V=0;V<=B;V++)V===0&&T===A?_[T][V]=k:_[T][V]=k.clone().lerp(I,V/B)}for(let T=0;T<A;T++)for(let k=0;k<2*(A-T)-1;k++){let I=Math.floor(k/2);k%2===0?(d(_[T][I+1]),d(_[T+1][I]),d(_[T][I])):(d(_[T][I+1]),d(_[T+1][I+1]),d(_[T+1][I]))}}function l(v){let E=new W;for(let M=0;M<r.length;M+=3)E.x=r[M+0],E.y=r[M+1],E.z=r[M+2],E.normalize().multiplyScalar(v),r[M+0]=E.x,r[M+1]=E.y,r[M+2]=E.z}function u(){let v=new W;for(let E=0;E<r.length;E+=3){v.x=r[E+0],v.y=r[E+1],v.z=r[E+2];let M=p(v)/2/Math.PI+.5,w=m(v)/Math.PI+.5;o.push(M,1-w)}x(),f()}function f(){for(let v=0;v<o.length;v+=6){let E=o[v+0],M=o[v+2],w=o[v+4],A=Math.max(E,M,w),_=Math.min(E,M,w);A>.9&&_<.1&&(E<.2&&(o[v+0]+=1),M<.2&&(o[v+2]+=1),w<.2&&(o[v+4]+=1))}}function d(v){r.push(v.x,v.y,v.z)}function g(v,E){let M=v*3;E.x=e[M+0],E.y=e[M+1],E.z=e[M+2]}function x(){let v=new W,E=new W,M=new W,w=new W,A=new ze,_=new ze,T=new ze;for(let k=0,I=0;k<r.length;k+=9,I+=6){v.set(r[k+0],r[k+1],r[k+2]),E.set(r[k+3],r[k+4],r[k+5]),M.set(r[k+6],r[k+7],r[k+8]),A.set(o[I+0],o[I+1]),_.set(o[I+2],o[I+3]),T.set(o[I+4],o[I+5]),w.copy(v).add(E).add(M).divideScalar(3);let B=p(w);y(A,I+0,v,B),y(_,I+2,E,B),y(T,I+4,M,B)}}function y(v,E,M,w){w<0&&v.x===1&&(o[E]=v.x-1),M.x===0&&M.z===0&&(o[E]=w/2/Math.PI+.5)}function p(v){return Math.atan2(v.z,-v.x)}function m(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.vertices,e.indices,e.radius,e.detail)}};var Dr=class n extends ua{constructor(e=1,t=0){let i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new n(e.radius,e.detail)}},Li=class n extends At{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};let r=e/2,o=t/2,a=Math.floor(i),c=Math.floor(s),l=a+1,u=c+1,f=e/a,d=t/c,g=[],x=[],y=[],p=[];for(let m=0;m<u;m++){let v=m*d-o;for(let E=0;E<l;E++){let M=E*f-r;x.push(M,-v,0),y.push(0,0,1),p.push(E/a),p.push(1-m/c)}}for(let m=0;m<c;m++)for(let v=0;v<a;v++){let E=v+l*m,M=v+l*(m+1),w=v+1+l*(m+1),A=v+1+l*m;g.push(E,M,A),g.push(M,w,A)}this.setIndex(g),this.setAttribute("position",new at(x,3)),this.setAttribute("normal",new at(y,3)),this.setAttribute("uv",new at(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}};var Tn=class n extends At{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let c=Math.min(o+a,Math.PI),l=0,u=[],f=new W,d=new W,g=[],x=[],y=[],p=[];for(let m=0;m<=i;m++){let v=[],E=m/i,M=o+E*a,w=e*Math.cos(M),A=Math.sqrt(e*e-w*w),_=0;m===0&&o===0?_=.5/t:m===i&&c===Math.PI&&(_=-.5/t);for(let T=0;T<=t;T++){let k=T/t,I=s+k*r;f.x=-A*Math.cos(I),f.y=w,f.z=A*Math.sin(I),x.push(f.x,f.y,f.z),d.copy(f).normalize(),y.push(d.x,d.y,d.z),p.push(k+_,1-E),v.push(l++)}u.push(v)}for(let m=0;m<i;m++)for(let v=0;v<t;v++){let E=u[m][v+1],M=u[m][v],w=u[m+1][v],A=u[m+1][v+1];(m!==0||o>0)&&g.push(E,M,A),(m!==i-1||c<Math.PI)&&g.push(M,w,A)}this.setIndex(g),this.setAttribute("position",new at(x,3)),this.setAttribute("normal",new at(y,3)),this.setAttribute("uv",new at(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var pi=class n extends At{constructor(e=1,t=.4,i=12,s=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:r,thetaStart:o,thetaLength:a},i=Math.floor(i),s=Math.floor(s);let c=[],l=[],u=[],f=[],d=new W,g=new W,x=new W;for(let y=0;y<=i;y++){let p=o+y/i*a;for(let m=0;m<=s;m++){let v=m/s*r;g.x=(e+t*Math.cos(p))*Math.cos(v),g.y=(e+t*Math.cos(p))*Math.sin(v),g.z=t*Math.sin(p),l.push(g.x,g.y,g.z),d.x=e*Math.cos(v),d.y=e*Math.sin(v),x.subVectors(g,d).normalize(),u.push(x.x,x.y,x.z),f.push(m/s),f.push(y/i)}}for(let y=1;y<=i;y++)for(let p=1;p<=s;p++){let m=(s+1)*y+p-1,v=(s+1)*(y-1)+p-1,E=(s+1)*(y-1)+p,M=(s+1)*y+p;c.push(m,v,M),c.push(v,E,M)}this.setIndex(c),this.setAttribute("position",new at(l,3)),this.setAttribute("normal",new at(u,3)),this.setAttribute("uv",new at(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}};function is(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let s=n[t][i];if(Dd(s))s.isRenderTargetTexture?(Fe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(Dd(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function jt(n){let e={};for(let t=0;t<n.length;t++){let i=is(n[t]);for(let s in i)e[s]=i[s]}return e}function Dd(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Km(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function oh(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:et.workingColorSpace}var Cf={clone:is,merge:jt},Qm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,e0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Jn=class extends Zn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Qm,this.fragmentShader=e0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=is(e.uniforms),this.uniformsGroups=Km(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let i in e.uniforms){let s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new Ye().setHex(s.value);break;case"v2":this.uniforms[i].value=new ze().fromArray(s.value);break;case"v3":this.uniforms[i].value=new W().fromArray(s.value);break;case"v4":this.uniforms[i].value=new vt().fromArray(s.value);break;case"m3":this.uniforms[i].value=new He().fromArray(s.value);break;case"m4":this.uniforms[i].value=new gt().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},da=class extends Jn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var Nn=class extends Zn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ye(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=fc,this.normalScale=new ze(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ui,this.combine=Aa,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},fa=class extends Zn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=uf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},pa=class extends Zn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function As(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function qo(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}var Di=class{constructor(e,t,i,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,s=t[i],r=t[i-1];n:{e:{let o;t:{i:if(!(e<s)){for(let a=i+2;;){if(s===void 0){if(e<r)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(r=s,s=t[++i],e<s)break e}o=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(i=2,r=a);for(let c=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(s=r,r=t[--i-1],e>=r)break e}o=i,i=0;break t}break n}for(;i<o;){let a=i+o>>>1;e<t[a]?o=a:i=a+1}if(s=t[i],r=t[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=i[r+o];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},ma=class extends Di{constructor(e,t,i,s){super(e,t,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:wl,endingEnd:wl}}intervalChanged_(e,t,i){let s=this.parameterPositions,r=e-2,o=e+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Al:r=e,a=2*t-i;break;case Cl:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=i}if(c===void 0)switch(this.getSettings_().endingEnd){case Al:o=e,c=2*i-t;break;case Cl:o=1,c=i+s[1]-s[0];break;default:o=e-1,c=t}let l=(i-t)*.5,u=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-i),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(e,t,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this._offsetPrev,f=this._offsetNext,d=this._weightPrev,g=this._weightNext,x=(i-t)/(s-t),y=x*x,p=y*x,m=-d*p+2*d*y-d*x,v=(1+d)*p+(-1.5-2*d)*y+(-.5+d)*x+1,E=(-1-g)*p+(1.5+g)*y+.5*x,M=g*p-g*y;for(let w=0;w!==a;++w)r[w]=m*o[u+w]+v*o[l+w]+E*o[c+w]+M*o[f+w];return r}},ga=class extends Di{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=(i-t)/(s-t),f=1-u;for(let d=0;d!==a;++d)r[d]=o[l+d]*f+o[c+d]*u;return r}},xa=class extends Di{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e){return this.copySampleValue_(e-1)}},_a=class extends Di{interpolate_(e,t,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this.inTangents,f=this.outTangents;if(!u||!f){let x=(i-t)/(s-t),y=1-x;for(let p=0;p!==a;++p)r[p]=o[l+p]*y+o[c+p]*x;return r}let d=a*2,g=e-1;for(let x=0;x!==a;++x){let y=o[l+x],p=o[c+x],m=g*d+x*2,v=f[m],E=f[m+1],M=e*d+x*2,w=u[M],A=u[M+1],_=n0(i,t,v,w,s);r[x]=Rf(_,y,E,A,p)}return r}};function Rf(n,e,t,i,s){let r=1-n;return r*r*r*e+3*r*r*n*t+3*r*n*n*i+n*n*n*s}function t0(n,e,t,i,s){let r=1-n;return 3*r*r*(t-e)+6*r*n*(i-t)+3*n*n*(s-i)}function n0(n,e,t,i,s){let r=(n-e)/(s-e);for(let o=0;o<8;o++){let a=Rf(r,e,t,i,s)-n;if(Math.abs(a)<1e-10)break;let c=t0(r,e,t,i,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-a/c))}return r}var gn=class{constructor(e,t,i,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=As(t,this.TimeBufferType),this.values=As(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:As(e.times,Array),values:As(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(i.interpolation=s),qo(e.settings)&&(i.settings={inTangents:As(e.settings.inTangents,Array),outTangents:As(e.settings.outTangents,Array)})}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new xa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ga(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ma(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new _a(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case mr:t=this.InterpolantFactoryMethodDiscrete;break;case ra:t=this.InterpolantFactoryMethodLinear;break;case Jo:t=this.InterpolantFactoryMethodSmooth;break;case El:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Fe("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return mr;case this.InterpolantFactoryMethodLinear:return ra;case this.InterpolantFactoryMethodSmooth:return Jo;case this.InterpolantFactoryMethodBezier:return El}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]+=e;qo(this.settings)&&(Nd(this.settings.inTangents,e),Nd(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]*=e;qo(this.settings)&&(Ud(this.settings.inTangents,e),Ud(this.settings.outTangents,e))}return this}trim(e,t){let i=this.times,s=i.length,r=0,o=s-1;for(;r!==s&&i[r]<e;)++r;for(;o!==-1&&i[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=i.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Be("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,s=this.values,r=i.length;r===0&&(Be("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let c=i[a];if(typeof c=="number"&&isNaN(c)){Be("KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){Be("KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(s!==void 0&&Lm(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){Be("KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Jo,r=e.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=e[a],u=e[a+1];if(l!==u&&(a!==1||l!==e[0]))if(s)c=!0;else{let f=a*i,d=f-i,g=f+i;for(let x=0;x!==i;++x){let y=t[f+x];if(y!==t[d+x]||y!==t[g+x]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let f=a*i,d=o*i;for(let g=0;g!==i;++g)t[d+g]=t[f+g]}++o}}if(r>0){e[o]=e[r];for(let a=r*i,c=o*i,l=0;l!==i;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,s=new i(this.name,e,t);return s.createInterpolant=this.createInterpolant,qo(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Nd(n,e){for(let t=0,i=n.length;t!==i;t+=2)n[t]+=e}function Ud(n,e){for(let t=0,i=n.length;t!==i;t+=2)n[t]*=e}gn.prototype.ValueTypeName="";gn.prototype.TimeBufferType=Float32Array;gn.prototype.ValueBufferType=Float32Array;gn.prototype.DefaultInterpolation=ra;var Ni=class extends gn{constructor(e,t,i){super(e,t,i)}};Ni.prototype.ValueTypeName="bool";Ni.prototype.ValueBufferType=Array;Ni.prototype.DefaultInterpolation=mr;Ni.prototype.InterpolantFactoryMethodLinear=void 0;Ni.prototype.InterpolantFactoryMethodSmooth=void 0;var ya=class extends gn{constructor(e,t,i,s){super(e,t,i,s)}};ya.prototype.ValueTypeName="color";var va=class extends gn{constructor(e,t,i,s){super(e,t,i,s)}};va.prototype.ValueTypeName="number";var ba=class extends Di{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(i-t)/(s-t),l=e*a;for(let u=l+a;l!==u;l+=4)Yn.slerpFlat(r,0,o,l-a,o,l,c);return r}},Nr=class extends gn{constructor(e,t,i,s){super(e,t,i,s)}InterpolantFactoryMethodLinear(e){return new ba(this.times,this.values,this.getValueSize(),e)}};Nr.prototype.ValueTypeName="quaternion";Nr.prototype.InterpolantFactoryMethodSmooth=void 0;var Ui=class extends gn{constructor(e,t,i){super(e,t,i)}};Ui.prototype.ValueTypeName="string";Ui.prototype.ValueBufferType=Array;Ui.prototype.DefaultInterpolation=mr;Ui.prototype.InterpolantFactoryMethodLinear=void 0;Ui.prototype.InterpolantFactoryMethodSmooth=void 0;var Sa=class extends gn{constructor(e,t,i,s){super(e,t,i,s)}};Sa.prototype.ValueTypeName="vector";var Ma=class{constructor(e,t,i){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(u){a++,r===!1&&s.onStart!==void 0&&s.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,s.onProgress!==void 0&&s.onProgress(u,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,f){return l.push(u,f),this},this.removeHandler=function(u){let f=l.indexOf(u);return f!==-1&&l.splice(f,2),this},this.getHandler=function(u){for(let f=0,d=l.length;f<d;f+=2){let g=l[f],x=l[f+1];if(g.global&&(g.lastIndex=0),g.test(u))return x}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Pf=new Ma,Ta=class{constructor(e){this.manager=e!==void 0?e:Pf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}};Ta.DEFAULT_MATERIAL_NAME="__DEFAULT";var ki=class extends Pt{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ye(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Ur=class extends ki{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ye(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Tl=new gt,kd=new W,Od=new W,zs=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ze(512,512),this.mapType=un,this.map=null,this.mapPass=null,this.matrix=new gt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ii,this._frameExtents=new ze(1,1),this._viewportCount=1,this._viewports=[new vt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;kd.setFromMatrixPosition(e.matrixWorld),t.position.copy(kd),Od.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Od),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,s){Tl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(Tl,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;e.coordinateSystem===Ds||e.reversedDepth?t.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,1,0,0,0,0,1):t.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,.5,.5,0,0,0,1),t.multiply(Tl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Yo=new W,Zo=new Yn,Wn=new W,kr=class extends Pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new gt,this.projectionMatrix=new gt,this.projectionMatrixInverse=new gt,this.coordinateSystem=Mn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Yo,Zo,Wn),Wn.x===1&&Wn.y===1&&Wn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Yo,Zo,Wn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Yo,Zo,Wn),Wn.x===1&&Wn.y===1&&Wn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Yo,Zo,Wn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Ci=new W,Fd=new ze,Bd=new ze,qt=class extends kr{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=vr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(nl*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return vr*2*Math.atan(Math.tan(nl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Ci.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ci.x,Ci.y).multiplyScalar(-e/Ci.z),Ci.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ci.x,Ci.y).multiplyScalar(-e/Ci.z)}getViewSize(e,t){return this.getViewBounds(e,Fd,Bd),t.subVectors(Bd,Fd)}setViewOffset(e,t,i,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(nl*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*i/l,s*=o.width/c,i*=o.height/l}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Pl=class extends zs{constructor(){super(new qt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,i=vr*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(i!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=i,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},Or=class extends ki{constructor(e,t,i=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.target=new Pt,this.distance=i,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Pl}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},Il=class extends zs{constructor(){super(new qt(90,1,.5,500)),this.isPointLightShadow=!0}},Gs=class extends ki{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new Il}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Fr=class extends kr{constructor(e=-1,t=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-e,o=i+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Ll=class extends zs{constructor(){super(new Fr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Br=class extends ki{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.target=new Pt,this.shadow=new Ll}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},zr=class extends ki{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var Cs=-90,Rs=1,Hs=class extends Pt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new qt(Cs,Rs,e,t);s.layers=this.layers,this.add(s);let r=new qt(Cs,Rs,e,t);r.layers=this.layers,this.add(r);let o=new qt(Cs,Rs,e,t);o.layers=this.layers,this.add(o);let a=new qt(Cs,Rs,e,t);a.layers=this.layers,this.add(a);let c=new qt(Cs,Rs,e,t);c.layers=this.layers,this.add(c);let l=new qt(Cs,Rs,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,s,r,o,a,c]=t;for(let l of t)this.remove(l);if(e===Mn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ds)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,u]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),g=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;let y=i.texture.mipmapsAutoUpdate;i.texture.mipmapsAutoUpdate=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,2,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,3,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,4,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.mipmapsAutoUpdate=y,e.setRenderTarget(i,5,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(f,d,g),e.xr.enabled=x,i.texture.needsPMREMUpdate=!0}},Ea=class extends qt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}};var ah="\\[\\]\\.:\\/",i0=new RegExp("["+ah+"]","g"),ch="[^"+ah+"]",s0="[^"+ah.replace("\\.","")+"]",r0=/((?:WC+[\/:])*)/.source.replace("WC",ch),o0=/(WCOD+)?/.source.replace("WCOD",s0),a0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ch),c0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ch),l0=new RegExp("^"+r0+o0+a0+c0+"$"),h0=["material","materials","bones","map"],Dl=class{constructor(e,t,i){let s=i||xt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},xt=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(i0,"")}static parseTrackName(e){let t=l0.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);h0.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let c=i(a.children);if(c)return c}return null},s=i(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)e[t++]=i[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Fe("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let l=t.objectIndex;switch(i){case"materials":if(!e.material){Be("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Be("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Be("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Be("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Be("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){Be("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(l!==void 0){if(e[l]===void 0){Be("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let o=e[s];if(o===void 0){let l=t.nodeName;Be("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Be("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Be("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};xt.Composite=Dl;xt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};xt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};xt.prototype.GetterByBindingType=[xt.prototype._getValue_direct,xt.prototype._getValue_array,xt.prototype._getValue_arrayElement,xt.prototype._getValue_toArray];xt.prototype.SetterByBindingTypeAndVersioning=[[xt.prototype._setValue_direct,xt.prototype._setValue_direct_setNeedsUpdate,xt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[xt.prototype._setValue_array,xt.prototype._setValue_array_setNeedsUpdate,xt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[xt.prototype._setValue_arrayElement,xt.prototype._setValue_arrayElement_setNeedsUpdate,xt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[xt.prototype._setValue_fromArray,xt.prototype._setValue_fromArray_setNeedsUpdate,xt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Sb=new Float32Array(1);var ph=class ph{constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}};ph.prototype.isMatrix2=!0;var Nl=ph;function lh(n,e,t,i){let s=u0(i);switch(t){case Kl:return n*e;case eh:return n*e/s.components*s.byteLength;case Na:return n*e/s.components*s.byteLength;case Bi:return n*e*2/s.components*s.byteLength;case Ua:return n*e*2/s.components*s.byteLength;case Ql:return n*e*3/s.components*s.byteLength;case Fn:return n*e*4/s.components*s.byteLength;case ka:return n*e*4/s.components*s.byteLength;case Hr:case Vr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Wr:case Xr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Fa:case za:return Math.max(n,16)*Math.max(e,8)/4;case Oa:case Ba:return Math.max(n,8)*Math.max(e,8)/2;case Ga:case Ha:case Wa:case Xa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Va:case qr:case qa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ya:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Za:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Ja:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case $a:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case ja:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Ka:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Qa:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case ec:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case tc:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case nc:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case ic:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case sc:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case rc:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case oc:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case ac:case cc:case lc:return Math.ceil(n/4)*Math.ceil(e/4)*16;case hc:case uc:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Yr:case dc:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function u0(n){switch(n){case un:case Zl:return{byteLength:1,components:1};case qs:case Jl:case On:return{byteLength:2,components:1};case La:case Da:return{byteLength:2,components:4};case Un:case Ia:case kn:return{byteLength:4,components:1};case $l:case jl:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Fe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function Kf(){let n=null,e=!1,t=null,i=null;function s(r,o){i=n.requestAnimationFrame(s),t(r,o)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function _0(n){let e=new WeakMap;function t(a,c){let l=a.array,u=a.usage,f=l.byteLength,d=n.createBuffer();n.bindBuffer(c,d),n.bufferData(c,l,u),a.onUploadCallback();let g;if(l instanceof Float32Array)g=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)g=n.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?g=n.HALF_FLOAT:g=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)g=n.SHORT;else if(l instanceof Uint32Array)g=n.UNSIGNED_INT;else if(l instanceof Int32Array)g=n.INT;else if(l instanceof Int8Array)g=n.BYTE;else if(l instanceof Uint8Array)g=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)g=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:g,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:f}}function i(a,c,l){let u=c.array,f=c.updateRanges;if(n.bindBuffer(l,a),f.length===0)n.bufferSubData(l,0,u);else{f.sort((g,x)=>g.start-x.start);let d=0;for(let g=1;g<f.length;g++){let x=f[d],y=f[g];y.start<=x.start+x.count+1?x.count=Math.max(x.count,y.start+y.count-x.start):(++d,f[d]=y)}f.length=d+1;for(let g=0,x=f.length;g<x;g++){let y=f[g];n.bufferSubData(l,y.start*u.BYTES_PER_ELEMENT,u,y.start,y.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(n.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var y0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,v0=`#ifdef USE_ALPHAHASH
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
#endif`,b0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,S0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,M0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,T0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,E0=`#ifdef USE_AOMAP
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
#endif`,A0=`#ifdef USE_BATCHING
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
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,C0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,R0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,P0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,I0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,L0=`#ifdef USE_IRIDESCENCE
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
#endif`,D0=`#ifdef USE_BUMPMAP
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
#endif`,N0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,U0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,k0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,O0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,F0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,B0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,z0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,G0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,H0=`#define PI 3.141592653589793
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
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
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
} // validated`,V0=`vec3 transformedNormal = objectNormal;
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
#endif`,W0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,X0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,q0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Y0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Z0="gl_FragColor = linearToOutputTexel( gl_FragColor );",J0=`vec4 LinearTransferOETF( in vec4 value ) {
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
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,j0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,K0=`#ifdef USE_ENVMAP
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
#endif`,Q0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,eg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,tg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ng=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ig=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,sg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,rg=`#ifdef USE_GRADIENTMAP
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
}`,og=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ag=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,cg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lg=`uniform bool receiveShadow;
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
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
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
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
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
#endif
#include <lightprobes_pars_fragment>`,hg=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,ug=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,dg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,fg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,pg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,mg=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
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
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
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
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
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
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
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
#endif`,gg=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
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
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
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
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
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
		return 0.5 / max( gv + gl, EPSILON );
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
		float roughness = max( material.clearcoatRoughness, 0.045 );
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
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
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
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
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
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
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
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
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
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
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
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,xg=`
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
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
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
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,_g=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,yg=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,vg=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,bg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Sg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Mg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Tg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Eg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,wg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ag=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Cg=`#if defined( USE_POINTS_UV )
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
#endif`,Rg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Pg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ig=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Lg=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Dg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ng=`#ifdef USE_MORPHTARGETS
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
#endif`,Ug=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,kg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
	#ifdef DOUBLE_SIDED
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
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Og=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Fg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,zg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Gg=`#ifdef USE_NORMALMAP
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
#endif`,Hg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Vg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Wg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Xg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,qg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Yg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Zg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Jg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,$g=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,jg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Kg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Qg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ex=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
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
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,tx=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
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
#endif`,nx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
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
#endif`,ix=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
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
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
}`,sx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,rx=`#ifdef USE_SKINNING
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
#endif`,ox=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ax=`#ifdef USE_SKINNING
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
#endif`,cx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,lx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,hx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ux=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,dx=`#ifdef USE_TRANSMISSION
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
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,fx=`#ifdef USE_TRANSMISSION
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
#endif`,px=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
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
#endif`,mx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
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
#endif`,gx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
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
#endif`,xx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,_x=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,yx=`uniform sampler2D t2D;
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
}`,vx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bx=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Mx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tx=`#include <common>
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
}`,Ex=`#if DEPTH_PACKING == 3200
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
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
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
}`,Ax=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Cx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Rx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Px=`uniform float scale;
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
}`,Ix=`uniform vec3 diffuse;
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
}`,Lx=`#include <common>
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
}`,Dx=`uniform vec3 diffuse;
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
}`,Nx=`#define LAMBERT
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
}`,Ux=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,kx=`#define MATCAP
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
}`,Ox=`#define MATCAP
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
}`,Fx=`#define NORMAL
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
}`,Bx=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
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
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,zx=`#define PHONG
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
}`,Gx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,Hx=`#define STANDARD
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
}`,Vx=`#define STANDARD
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
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
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
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
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
}`,Wx=`#define TOON
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
}`,Xx=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
}`,qx=`uniform float size;
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
}`,Yx=`uniform vec3 diffuse;
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
}`,Zx=`#include <common>
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
}`,Jx=`uniform vec3 color;
uniform float opacity;
#include <common>
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
	#include <premultiplied_alpha_fragment>
}`,$x=`uniform float rotation;
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
}`,jx=`uniform vec3 diffuse;
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
}`,$e={alphahash_fragment:y0,alphahash_pars_fragment:v0,alphamap_fragment:b0,alphamap_pars_fragment:S0,alphatest_fragment:M0,alphatest_pars_fragment:T0,aomap_fragment:E0,aomap_pars_fragment:w0,batching_pars_vertex:A0,batching_vertex:C0,begin_vertex:R0,beginnormal_vertex:P0,bsdfs:I0,iridescence_fragment:L0,bumpmap_pars_fragment:D0,clipping_planes_fragment:N0,clipping_planes_pars_fragment:U0,clipping_planes_pars_vertex:k0,clipping_planes_vertex:O0,color_fragment:F0,color_pars_fragment:B0,color_pars_vertex:z0,color_vertex:G0,common:H0,defaultnormal_vertex:V0,displacementmap_pars_vertex:W0,displacementmap_vertex:X0,emissivemap_fragment:q0,emissivemap_pars_fragment:Y0,colorspace_fragment:Z0,colorspace_pars_fragment:J0,envmap_fragment:$0,envmap_common_pars_fragment:j0,envmap_pars_fragment:K0,envmap_pars_vertex:Q0,envmap_physical_pars_fragment:hg,envmap_vertex:eg,fog_vertex:tg,fog_pars_vertex:ng,fog_fragment:ig,fog_pars_fragment:sg,gradientmap_pars_fragment:rg,lightmap_pars_fragment:og,lights_lambert_fragment:ag,lights_lambert_pars_fragment:cg,lights_pars_begin:lg,lights_toon_fragment:ug,lights_toon_pars_fragment:dg,lights_phong_fragment:fg,lights_phong_pars_fragment:pg,lights_physical_fragment:mg,lights_physical_pars_fragment:gg,lights_fragment_begin:xg,lights_fragment_maps:_g,lights_fragment_end:yg,lightprobes_pars_fragment:vg,logdepthbuf_fragment:bg,logdepthbuf_pars_fragment:Sg,logdepthbuf_pars_vertex:Mg,logdepthbuf_vertex:Tg,map_fragment:Eg,map_pars_fragment:wg,map_particle_fragment:Ag,map_particle_pars_fragment:Cg,metalnessmap_fragment:Rg,metalnessmap_pars_fragment:Pg,morphinstance_vertex:Ig,morphcolor_vertex:Lg,morphnormal_vertex:Dg,morphtarget_pars_vertex:Ng,morphtarget_vertex:Ug,normal_fragment_begin:kg,normal_fragment_maps:Og,normal_pars_fragment:Fg,normal_pars_vertex:Bg,normal_vertex:zg,normalmap_pars_fragment:Gg,clearcoat_normal_fragment_begin:Hg,clearcoat_normal_fragment_maps:Vg,clearcoat_pars_fragment:Wg,iridescence_pars_fragment:Xg,opaque_fragment:qg,packing:Yg,premultiplied_alpha_fragment:Zg,project_vertex:Jg,dithering_fragment:$g,dithering_pars_fragment:jg,roughnessmap_fragment:Kg,roughnessmap_pars_fragment:Qg,shadowmap_pars_fragment:ex,shadowmap_pars_vertex:tx,shadowmap_vertex:nx,shadowmask_pars_fragment:ix,skinbase_vertex:sx,skinning_pars_vertex:rx,skinning_vertex:ox,skinnormal_vertex:ax,specularmap_fragment:cx,specularmap_pars_fragment:lx,tonemapping_fragment:hx,tonemapping_pars_fragment:ux,transmission_fragment:dx,transmission_pars_fragment:fx,uv_pars_fragment:px,uv_pars_vertex:mx,uv_vertex:gx,worldpos_vertex:xx,background_vert:_x,background_frag:yx,backgroundCube_vert:vx,backgroundCube_frag:bx,cube_vert:Sx,cube_frag:Mx,depth_vert:Tx,depth_frag:Ex,distance_vert:wx,distance_frag:Ax,equirect_vert:Cx,equirect_frag:Rx,linedashed_vert:Px,linedashed_frag:Ix,meshbasic_vert:Lx,meshbasic_frag:Dx,meshlambert_vert:Nx,meshlambert_frag:Ux,meshmatcap_vert:kx,meshmatcap_frag:Ox,meshnormal_vert:Fx,meshnormal_frag:Bx,meshphong_vert:zx,meshphong_frag:Gx,meshphysical_vert:Hx,meshphysical_frag:Vx,meshtoon_vert:Wx,meshtoon_frag:Xx,points_vert:qx,points_frag:Yx,shadow_vert:Zx,shadow_frag:Jx,sprite_vert:$x,sprite_frag:jx},Se={common:{diffuse:{value:new Ye(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},envMapRotation:{value:new He},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new ze(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ye(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Ye(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new Ye(16777215)},opacity:{value:1},center:{value:new ze(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},Kn={basic:{uniforms:jt([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.fog]),vertexShader:$e.meshbasic_vert,fragmentShader:$e.meshbasic_frag},lambert:{uniforms:jt([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new Ye(0)},envMapIntensity:{value:1}}]),vertexShader:$e.meshlambert_vert,fragmentShader:$e.meshlambert_frag},phong:{uniforms:jt([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new Ye(0)},specular:{value:new Ye(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:$e.meshphong_vert,fragmentShader:$e.meshphong_frag},standard:{uniforms:jt([Se.common,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.roughnessmap,Se.metalnessmap,Se.fog,Se.lights,{emissive:{value:new Ye(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$e.meshphysical_vert,fragmentShader:$e.meshphysical_frag},toon:{uniforms:jt([Se.common,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.gradientmap,Se.fog,Se.lights,{emissive:{value:new Ye(0)}}]),vertexShader:$e.meshtoon_vert,fragmentShader:$e.meshtoon_frag},matcap:{uniforms:jt([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,{matcap:{value:null}}]),vertexShader:$e.meshmatcap_vert,fragmentShader:$e.meshmatcap_frag},points:{uniforms:jt([Se.points,Se.fog]),vertexShader:$e.points_vert,fragmentShader:$e.points_frag},dashed:{uniforms:jt([Se.common,Se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$e.linedashed_vert,fragmentShader:$e.linedashed_frag},depth:{uniforms:jt([Se.common,Se.displacementmap]),vertexShader:$e.depth_vert,fragmentShader:$e.depth_frag},normal:{uniforms:jt([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,{opacity:{value:1}}]),vertexShader:$e.meshnormal_vert,fragmentShader:$e.meshnormal_frag},sprite:{uniforms:jt([Se.sprite,Se.fog]),vertexShader:$e.sprite_vert,fragmentShader:$e.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$e.background_vert,fragmentShader:$e.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new He}},vertexShader:$e.backgroundCube_vert,fragmentShader:$e.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$e.cube_vert,fragmentShader:$e.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$e.equirect_vert,fragmentShader:$e.equirect_frag},distance:{uniforms:jt([Se.common,Se.displacementmap,{referencePosition:{value:new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$e.distance_vert,fragmentShader:$e.distance_frag},shadow:{uniforms:jt([Se.lights,Se.fog,{color:{value:new Ye(0)},opacity:{value:1}}]),vertexShader:$e.shadow_vert,fragmentShader:$e.shadow_frag}};Kn.physical={uniforms:jt([Kn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new ze(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new He},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new Ye(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new ze},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new Ye(0)},specularColor:{value:new Ye(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new ze},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:$e.meshphysical_vert,fragmentShader:$e.meshphysical_frag};var mc={r:0,b:0,g:0},Kx=new gt,Qf=new He;Qf.set(-1,0,0,0,1,0,0,0,1);function Qx(n,e,t,i,s,r){let o=new Ye(0),a=s===!0?0:1,c,l,u=null,f=0,d=null;function g(v){let E=v.isScene===!0?v.background:null;if(E&&E.isTexture){let M=v.backgroundBlurriness>0;E=e.get(E,M)}return E}function x(v){let E=!1,M=g(v);M===null?p(o,a):M&&M.isColor&&(p(M,1),E=!0);let w=n.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||E)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function y(v,E){let M=g(E);M&&M.isCubeTexture?(l===void 0&&(l=new tt(new hn(1,1,1),new Jn({name:"BackgroundCubeMaterial",uniforms:is(Kn.backgroundCube.uniforms),vertexShader:Kn.backgroundCube.vertexShader,fragmentShader:Kn.backgroundCube.fragmentShader,side:on,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(w,A,_){this.matrixWorld.copyPosition(_.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=M,l.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Kx.makeRotationFromEuler(E.backgroundRotation)).transpose(),M.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Qf),l.material.toneMapped=et.getTransfer(M.colorSpace)!==lt,(u!==M||f!==M.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,u=M,f=M.version,d=n.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new tt(new Li(2,2),new Jn({name:"BackgroundMaterial",uniforms:is(Kn.background.uniforms),vertexShader:Kn.background.vertexShader,fragmentShader:Kn.background.fragmentShader,side:Oi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.toneMapped=et.getTransfer(M.colorSpace)!==lt,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(u!==M||f!==M.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,u=M,f=M.version,d=n.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function p(v,E){v.getRGB(mc,oh(n)),t.buffers.color.setClear(mc.r,mc.g,mc.b,E,r)}function m(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(v,E=1){o.set(v),a=E,p(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(v){a=v,p(o,a)},render:x,addToRenderList:y,dispose:m}}function e_(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=d(null),r=s,o=!1;function a(B,V,Z,N,$){let R=!1,P=f(B,N,Z,V);r!==P&&(r=P,l(r.object)),R=g(B,N,Z,$),R&&x(B,N,Z,$),$!==null&&e.update($,n.ELEMENT_ARRAY_BUFFER),(R||o)&&(o=!1,M(B,V,Z,N),$!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get($).buffer))}function c(){return n.createVertexArray()}function l(B){return n.bindVertexArray(B)}function u(B){return n.deleteVertexArray(B)}function f(B,V,Z,N){let $=N.wireframe===!0,R=i[V.id];R===void 0&&(R={},i[V.id]=R);let P=B.isInstancedMesh===!0?B.id:0,U=R[P];U===void 0&&(U={},R[P]=U);let F=U[Z.id];F===void 0&&(F={},U[Z.id]=F);let G=F[$];return G===void 0&&(G=d(c()),F[$]=G),G}function d(B){let V=[],Z=[],N=[];for(let $=0;$<t;$++)V[$]=0,Z[$]=0,N[$]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:V,enabledAttributes:Z,attributeDivisors:N,object:B,attributes:{},index:null}}function g(B,V,Z,N){let $=r.attributes,R=V.attributes,P=0,U=Z.getAttributes();for(let F in U)if(U[F].location>=0){let te=$[F],ce=R[F];if(ce===void 0&&(F==="instanceMatrix"&&B.instanceMatrix&&(ce=B.instanceMatrix),F==="instanceColor"&&B.instanceColor&&(ce=B.instanceColor)),te===void 0||te.attribute!==ce||ce&&te.data!==ce.data)return!0;P++}return r.attributesNum!==P||r.index!==N}function x(B,V,Z,N){let $={},R=V.attributes,P=0,U=Z.getAttributes();for(let F in U)if(U[F].location>=0){let te=R[F];te===void 0&&(F==="instanceMatrix"&&B.instanceMatrix&&(te=B.instanceMatrix),F==="instanceColor"&&B.instanceColor&&(te=B.instanceColor));let ce={};ce.attribute=te,te&&te.data&&(ce.data=te.data),$[F]=ce,P++}r.attributes=$,r.attributesNum=P,r.index=N}function y(){let B=r.newAttributes;for(let V=0,Z=B.length;V<Z;V++)B[V]=0}function p(B){m(B,0)}function m(B,V){let Z=r.newAttributes,N=r.enabledAttributes,$=r.attributeDivisors;Z[B]=1,N[B]===0&&(n.enableVertexAttribArray(B),N[B]=1),$[B]!==V&&(n.vertexAttribDivisor(B,V),$[B]=V)}function v(){let B=r.newAttributes,V=r.enabledAttributes;for(let Z=0,N=V.length;Z<N;Z++)V[Z]!==B[Z]&&(n.disableVertexAttribArray(Z),V[Z]=0)}function E(B,V,Z,N,$,R,P){P===!0?n.vertexAttribIPointer(B,V,Z,$,R):n.vertexAttribPointer(B,V,Z,N,$,R)}function M(B,V,Z,N){y();let $=N.attributes,R=Z.getAttributes(),P=V.defaultAttributeValues;for(let U in R){let F=R[U];if(F.location>=0){let G=$[U];if(G===void 0&&(U==="instanceMatrix"&&B.instanceMatrix&&(G=B.instanceMatrix),U==="instanceColor"&&B.instanceColor&&(G=B.instanceColor)),G!==void 0){let te=G.normalized,ce=G.itemSize,Ae=e.get(G);if(Ae===void 0)continue;let j=Ae.buffer,le=Ae.type,ve=Ae.bytesPerElement,Ee=le===n.INT||le===n.UNSIGNED_INT||G.gpuType===Ia;if(G.isInterleavedBufferAttribute){let ue=G.data,Ge=ue.isInterleavedBuffer===!0?ue.stride:ue.itemSize,ct=G.offset;if(ue.isInstancedInterleavedBuffer||ue.isInstancedBufferAttribute){for(let Oe=0;Oe<F.locationSize;Oe++)m(F.location+Oe,ue.meshPerAttribute);B.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let Oe=0;Oe<F.locationSize;Oe++)p(F.location+Oe);n.bindBuffer(n.ARRAY_BUFFER,j);for(let Oe=0;Oe<F.locationSize;Oe++)E(F.location+Oe,ce/F.locationSize,le,te,Ge*ve,(ct+ce/F.locationSize*Oe)*ve,Ee)}else{if(G.isInstancedBufferAttribute){for(let ue=0;ue<F.locationSize;ue++)m(F.location+ue,G.meshPerAttribute);B.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=G.meshPerAttribute*G.count)}else for(let ue=0;ue<F.locationSize;ue++)p(F.location+ue);n.bindBuffer(n.ARRAY_BUFFER,j);for(let ue=0;ue<F.locationSize;ue++)E(F.location+ue,ce/F.locationSize,le,te,ce*ve,ce/F.locationSize*ue*ve,Ee)}}else if(P!==void 0){let te=P[U];if(te!==void 0)switch(te.length){case 2:n.vertexAttrib2fv(F.location,te);break;case 3:n.vertexAttrib3fv(F.location,te);break;case 4:n.vertexAttrib4fv(F.location,te);break;default:n.vertexAttrib1fv(F.location,te)}}}}v()}function w(){k();for(let B in i){let V=i[B];for(let Z in V){let N=V[Z];for(let $ in N){let R=N[$];for(let P in R)u(R[P].object),delete R[P];delete N[$]}}delete i[B]}}function A(B){if(i[B.id]===void 0)return;let V=i[B.id];for(let Z in V){let N=V[Z];for(let $ in N){let R=N[$];for(let P in R)u(R[P].object),delete R[P];delete N[$]}}delete i[B.id]}function _(B){for(let V in i){let Z=i[V];for(let N in Z){let $=Z[N];if($[B.id]===void 0)continue;let R=$[B.id];for(let P in R)u(R[P].object),delete R[P];delete $[B.id]}}}function T(B){for(let V in i){let Z=i[V],N=B.isInstancedMesh===!0?B.id:0,$=Z[N];if($!==void 0){for(let R in $){let P=$[R];for(let U in P)u(P[U].object),delete P[U];delete $[R]}delete Z[N],Object.keys(Z).length===0&&delete i[V]}}}function k(){I(),o=!0,r!==s&&(r=s,l(r.object))}function I(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:k,resetDefaultState:I,dispose:w,releaseStatesOfGeometry:A,releaseStatesOfObject:T,releaseStatesOfProgram:_,initAttributes:y,enableAttribute:p,disableUnusedAttributes:v}}function t_(n,e,t){let i;function s(c){i=c}function r(c,l){n.drawArrays(i,c,l),t.update(l,i,1)}function o(c,l,u){u!==0&&(n.drawArraysInstanced(i,c,l,u),t.update(l,i,u))}function a(c,l,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,u);let d=0;for(let g=0;g<u;g++)d+=l[g];t.update(d,i,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function n_(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let _=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(_.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(_){return!(_!==Fn&&i.convert(_)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(_){let T=_===On&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(_!==un&&_!==kn&&!T&&i.convert(_)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function c(_){if(_==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";_="mediump"}return _==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",u=c(l);u!==l&&(Fe("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),d=t.logarithmicDepthBuffer===!0&&f===!1;t.reversedDepthBuffer===!0&&f===!1&&Fe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&f===!0&&Fe("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let g=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),v=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),E=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=n.getParameter(n.MAX_SAMPLES),A=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:g,maxVertexTextures:x,maxTextureSize:y,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:v,maxVaryings:E,maxFragmentUniforms:M,maxSamples:w,samples:A}}function i_(n){let e=this,t=null,i=0,s=!1,r=!1,o=new In,a=new He,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){let g=f.length!==0||d||i!==0||s;return s=d,i=f.length,g},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,d){t=u(f,d,0)},this.setState=function(f,d,g){let x=f.clippingPlanes,y=f.clipIntersection,p=f.clipShadows,m=n.get(f);if(!s||x===null||x.length===0||r&&!p)r?u(null):l();else{let v=r?0:i,E=v*4,M=m.clippingState||null;c.value=M,M=u(x,d,E,g);for(let w=0;w!==E;++w)M[w]=t[w];m.clippingState=M,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,d,g,x){let y=f!==null?f.length:0,p=null;if(y!==0){if(p=c.value,x!==!0||p===null){let m=g+y*4,v=d.matrixWorldInverse;a.getNormalMatrix(v),(p===null||p.length<m)&&(p=new Float32Array(m));for(let E=0,M=g;E!==y;++E,M+=4)o.copy(f[E]).applyMatrix4(v,a),o.normal.toArray(p,M),p[M+3]=o.constant}c.value=p,c.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,p}}var $r=class extends mn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new Rr(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new hn(5,5,5),r=new Jn({name:"CubemapFromEquirect",uniforms:is(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:on,blending:Ki});r.uniforms.tEquirect.value=t;let o=new tt(s,r),a=t.minFilter;return t.minFilter===mi&&(t.minFilter=nn),new Hs(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,s);e.setRenderTarget(r)}},If=256,s_=3,r_=20,ep=256,tp=16,o_=3,a_=new W,c_=new Ye,xc=class n{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Hs(1,10,null),this._boxMesh=new tt(new hn(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){let{size:o=256,position:a=a_}=r,c=this._renderer;this._setSize(o);let l=this._allocateTarget(),u=this._getSourceTarget(!0);t>0&&(u.texture.mipmapsAutoUpdate=!1);let f=c.autoClear,d=c.autoClearColor,g=c.autoClearDepth,x=c.autoClearStencil,y=e.background;c.autoClear=!0,c.autoClearColor=!0,c.autoClearDepth=!0,c.autoClearStencil=!0,y===null&&(e.background=c.getClearColor(c_));let p=new Hs(i,s,u);return p.position.copy(a),p.update(c,e),c.autoClear=f,c.autoClearColor=d,c.autoClearDepth=g,c.autoClearStencil=x,e.background=y,t>0&&(u.texture.mipmapsAutoUpdate=!0,this._blur(l,t)),this._applyPMREM(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Nf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Df(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(If,Mf(e))}_fromTexture(e,t){e.mapping===es||e.mapping===Xs?this._setSize(e.image.length===0?If:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let i=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(i),i}_allocateTarget(){let e=this._cubeSize,t=Lf(e,!1,!1),i=Math.log2(e)-s_;for(let s=0;s<=i;s++)t.texture.mipmaps.push({width:e>>s,height:e>>s});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,i=this._sourceTarget;return(i===null||i.width!==t||e&&i.depthBuffer===!1)&&(i!==null&&i.dispose(),this._sourceTarget=Lf(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,i){let s=this._boxMesh,r=this._cubeCamera;s.material=i,r.renderTarget=e,r.activeMipmapLevel=t;let o=e.width>>t;e.viewport.set(0,0,o,o),r.update(this._renderer,s),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===es||e.mapping===Xs?(this._cubemapMaterial===null&&(this._cubemapMaterial=Nf()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Df()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=l_(),this._integrationMaterial=h_());let t=this._cubeSize,i=e.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(t/tp);for(let o=0;o<=i;o++){let a=n.lodToRoughness(o,i);if(o>i-o_)r.roughness.value=a,this._renderCube(e,o,this._integrationMaterial);else{let c=a>0?Math.log2(t)+.5*Math.log2(6/(ep*Math.pow(a,4)))+.5:0;s.roughness.value=a,s.lodBias.value=c,this._renderCube(e,o,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=u_());let i=this._blurMaterial,s=i.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(e,0,i),s.envMap.value=e.texture,this._renderCube(r,0,i)}};function Lf(n,e,t){return new $r(n,{minFilter:mi,generateMipmaps:e,type:On,colorSpace:gr,depthBuffer:t})}function jr(n,e,t){return new Jn({name:n,uniforms:e,vertexShader:$e.cube_vert,fragmentShader:t,side:on,blending:Ki,depthTest:!1,depthWrite:!1})}function l_(){return jr("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${ep}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function h_(){return jr("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:tp}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function u_(){return jr("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${r_}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function Df(){return jr("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function Nf(){return jr("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function d_(n){let e=new WeakMap,t=new WeakMap,i=null;function s(d,g=!1){return d==null?null:g?o(d):r(d)}function r(d){if(d&&d.isTexture){let g=d.mapping;if(g===Ca||g===Ra)if(e.has(d)){let x=e.get(d).texture;return a(x,d.mapping)}else{let x=d.image;if(x&&x.height>0){let y=new $r(x.height);return y.fromEquirectangularTexture(n,d),e.set(d,y),d.addEventListener("dispose",l),a(y.texture,d.mapping)}else return null}}return d}function o(d){if(d&&d.isTexture&&d.isPMREMTexture!==!0){let g=d.mapping,x=g===Ca||g===Ra,y=g===es||g===Xs;if(x||y){let p=t.get(d),m=p!==void 0?p.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==m)return i===null&&(i=new xc(n)),p=x?i.fromEquirectangular(d,p):i.fromCubemap(d,p),p.texture.pmremVersion=d.pmremVersion,t.set(d,p),p.texture;if(p!==void 0)return p.texture;{let v=d.image;return x&&v&&v.height>0||y&&v&&c(v)?(i===null&&(i=new xc(n)),p=x?i.fromEquirectangular(d):i.fromCubemap(d),p.texture.pmremVersion=d.pmremVersion,t.set(d,p),d.addEventListener("dispose",u),p.texture):null}}}return d}function a(d,g){return g===Ca?d.mapping=es:g===Ra&&(d.mapping=Xs),d}function c(d){let g=0,x=6;for(let y=0;y<x;y++)d[y]!==void 0&&g++;return g===x}function l(d){let g=d.target;g.removeEventListener("dispose",l);let x=e.get(g);x!==void 0&&(e.delete(g),x.dispose())}function u(d){let g=d.target;g.removeEventListener("dispose",u);let x=t.get(g);x!==void 0&&(t.delete(g),x.dispose())}function f(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:f}}function f_(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let s=t(i);return s===null&&pr("WebGLRenderer: "+i+" extension not supported."),s}}}function p_(n,e,t,i){let s={},r=new WeakMap,o=new FinalizationRegistry(x=>delete s[x]);function a(x){c(x.target)}function c(x){x.index!==null&&e.remove(x.index);for(let p in x.attributes)e.remove(x.attributes[p]);x.removeEventListener("dispose",a),delete s[x.id],o.unregister(x);let y=r.get(x);y&&(e.remove(y),r.delete(x)),i.releaseStatesOfGeometry(x),x.isInstancedBufferGeometry===!0&&delete x._maxInstanceCount,t.memory.geometries--}function l(x,y){return s[y.id]!==void 0||(y.addEventListener("dispose",a),s[y.id]=new WeakRef(y),o.register(y,y.id,y),t.memory.geometries++),y}function u(x){let y=x.attributes;for(let p in y)e.update(y[p],n.ARRAY_BUFFER)}function f(x){let y=x.index,p=x.attributes.position,m=0;if(p===void 0)return;let v=y!==null?y.array.length:p.array.length/3-1,E=p.count>=65535?wr:Er,M=new E(Math.ceil(v/3)*6,1),w=M.array;if(y!==null){let _=y.array;m=y.version;for(let T=0,k=0;T<v;T+=3){let I=_[T+0],B=_[T+1],V=_[T+2];w[k++]=I,w[k++]=B,w[k++]=B,w[k++]=V,w[k++]=V,w[k++]=I}}else{m=p.version;for(let _=0,T=0;_<v;_+=3){let k=_+0,I=_+1,B=_+2;w[T++]=k,w[T++]=I,w[T++]=I,w[T++]=B,w[T++]=B,w[T++]=k}}M.version=m;let A=r.get(x);A&&e.remove(A),r.set(x,M)}function d(x){let y=r.get(x);if(y){let p=x.index;p!==null&&y.version<p.version&&f(x)}else f(x);return r.get(x)}function g(){for(let x in s){let y=s[x].deref();y!==void 0&&c(y)}}return{get:l,update:u,getWireframeAttribute:d,dispose:g}}function m_(n,e,t){let i;function s(f){i=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,d){n.drawElements(i,d,r,f*o),t.update(d,i,1)}function l(f,d,g){g!==0&&(n.drawElementsInstanced(i,d,r,f*o,g),t.update(d,i,g))}function u(f,d,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,r,f,0,g);let y=0;for(let p=0;p<g;p++)y+=d[p];t.update(y,i,1)}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function g_(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(r/3);break;case n.LINES:t.lines+=a*(r/2);break;case n.LINE_STRIP:t.lines+=a*(r-1);break;case n.LINE_LOOP:t.lines+=a*r;break;case n.POINTS:t.points+=a*r;break;default:Be("WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function x_(n,e,t){let i=new WeakMap,s=new vt;function r(o,a,c){let l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=u!==void 0?u.length:0,d=i.get(a);if(d===void 0||d.count!==f){let k=function(){_.dispose(),i.delete(a),a.removeEventListener("dispose",k)};d!==void 0&&d.texture.dispose();let g=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,y=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],v=a.morphAttributes.color||[],E=0;g===!0&&(E=1),x===!0&&(E=2),y===!0&&(E=3);let M=a.attributes.position.count*E,w=1;M>e.maxTextureSize&&(w=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);let A=new Float32Array(M*w*4*f),_=new br(A,M,w,f);_.type=kn,_.needsUpdate=!0;let T=E*4;for(let I=0;I<f;I++){let B=p[I],V=m[I],Z=v[I],N=M*w*4*I;for(let $=0;$<B.count;$++){let R=$*T;g===!0&&(s.fromBufferAttribute(B,$),A[N+R+0]=s.x,A[N+R+1]=s.y,A[N+R+2]=s.z,A[N+R+3]=0),x===!0&&(s.fromBufferAttribute(V,$),A[N+R+4]=s.x,A[N+R+5]=s.y,A[N+R+6]=s.z,A[N+R+7]=0),y===!0&&(s.fromBufferAttribute(Z,$),A[N+R+8]=s.x,A[N+R+9]=s.y,A[N+R+10]=s.z,A[N+R+11]=Z.itemSize===4?s.w:1)}}d={count:f,texture:_,size:new ze(M,w)},i.set(a,d),a.addEventListener("dispose",k)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let g=0;for(let y=0;y<l.length;y++)g+=l[y];let x=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(n,"morphTargetBaseInfluence",x),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:r}}function __(n,e,t,i,s){let r=new WeakMap;function o(l){let u=s.render.frame,f=l.geometry,d=e.get(l,f);if(r.get(d)!==u&&(e.update(d),r.set(d,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==u&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){let g=l.skeleton;r.get(g)!==u&&(g.update(),r.set(g,u))}return d}function a(){r=new WeakMap}function c(l){let u=l.target;u.removeEventListener("dispose",c),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:o,dispose:a}}var y_={[zl]:"LINEAR_TONE_MAPPING",[Gl]:"REINHARD_TONE_MAPPING",[Hl]:"CINEON_TONE_MAPPING",[Vl]:"ACES_FILMIC_TONE_MAPPING",[Xl]:"AGX_TONE_MAPPING",[ql]:"NEUTRAL_TONE_MAPPING",[Wl]:"CUSTOM_TONE_MAPPING"};function v_(n,e,t,i,s,r){let o=new mn(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,c=null,l=null,u=new At;u.setAttribute("position",new at([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute("uv",new at([0,2,0,0,2,0],2));let f=new da({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new tt(u,f),g=new Fr(-1,1,1,-1,0,1),x=null,y=null,p=!1,m,v=null,E=[],M=!1;this.setSize=function(w,A){o.setSize(w,A),a!==null&&a.setSize(w,A),c!==null&&c.setSize(w,A);for(let _=0;_<E.length;_++){let T=E[_];T.setSize&&T.setSize(w,A)}},this.setEffects=function(w){E=w,M=E.length>0&&E[0].isRenderPass===!0;let A=o.width,_=o.height;E.length>0&&a===null&&(a=new mn(A,_,{type:On,depthBuffer:!1,stencilBuffer:!1}),c=new mn(A,_,{type:On,depthBuffer:!1,stencilBuffer:!1}));let T=s===!0&&E.some(k=>k.needsDepthTexture===!0);T!==(o.depthTexture!==null)&&(T===!0&&l===null&&(l=new fi(A,_),r===!0&&(l.format=gi,l.type=ts)),o.dispose(),o.depthTexture=T?l:null,o.resolveDepthBuffer=T,o.storeMultisampledDepthBuffer=T);for(let k=0;k<E.length;k++){let I=E[k];I.setSize&&I.setSize(A,_),T&&I.needsDepthTexture===!0&&I.setDepthTexture&&I.setDepthTexture(l)}},this.begin=function(w,A){if(p||w.toneMapping===$n&&E.length===0)return!1;if(v=A,A!==null){let _=A.width,T=A.height;(o.width!==_||o.height!==T)&&this.setSize(_,T)}return M===!1&&w.setRenderTarget(o),m=w.toneMapping,w.toneMapping=$n,!0},this.hasRenderPass=function(){return M},this.end=function(w,A){w.toneMapping=m,p=!0;let _=o,T=a;for(let k=0;k<E.length;k++){let I=E[k];I.enabled!==!1&&(I.render(w,T,_,A),I.needsSwap!==!1&&(_=T,T=T===a?c:a))}if(x!==w.outputColorSpace||y!==w.toneMapping){x=w.outputColorSpace,y=w.toneMapping,f.defines={},et.getTransfer(x)===lt&&(f.defines.SRGB_TRANSFER="");let k=y_[y];k&&(f.defines[k]=""),f.needsUpdate=!0}f.uniforms.tDiffuse.value=_.texture,w.setRenderTarget(v),w.render(d,g),v=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),c!==null&&c.dispose(),u.dispose(),f.dispose()}}var np=new sn,ip=new fi(1,1),sp=new Pr(1),rp=new br,op=new ca,ap=new Rr,Uf=[],kf=[],Of=new Float32Array(16),Ff=new Float32Array(9),Bf=new Float32Array(4);function Zs(n,e,t){let i=n[0];if(i<=0||i>0)return n;let s=e*t,r=Uf[s];if(r===void 0&&(r=new Float32Array(s),Uf[s]=r),e!==0){i.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(r,a)}return r}function kt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Ot(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function yc(n,e){let t=kf[e];t===void 0&&(t=new Int32Array(e),kf[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function b_(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function S_(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;n.uniform2fv(this.addr,e),Ot(t,e)}}function M_(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(kt(t,e))return;n.uniform3fv(this.addr,e),Ot(t,e)}}function T_(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;n.uniform4fv(this.addr,e),Ot(t,e)}}function E_(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(kt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Ot(t,e)}else{if(kt(t,i))return;Bf.set(i),n.uniformMatrix2fv(this.addr,!1,Bf),Ot(t,i)}}function w_(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(kt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Ot(t,e)}else{if(kt(t,i))return;Ff.set(i),n.uniformMatrix3fv(this.addr,!1,Ff),Ot(t,i)}}function A_(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(kt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Ot(t,e)}else{if(kt(t,i))return;Of.set(i),n.uniformMatrix4fv(this.addr,!1,Of),Ot(t,i)}}function C_(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function R_(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;n.uniform2iv(this.addr,e),Ot(t,e)}}function P_(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;n.uniform3iv(this.addr,e),Ot(t,e)}}function I_(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;n.uniform4iv(this.addr,e),Ot(t,e)}}function L_(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function D_(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;n.uniform2uiv(this.addr,e),Ot(t,e)}}function N_(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;n.uniform3uiv(this.addr,e),Ot(t,e)}}function U_(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;n.uniform4uiv(this.addr,e),Ot(t,e)}}function vc(n){return n.version===0&&(n.compareFunction=ih,n.needsUpdate=!0),n}function k_(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?r=vc(ip):r=np,t.setTexture2D(e||r,s)}function O_(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||op,s)}function F_(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_CUBE_SHADOW?r=vc(sp):r=ap,t.setTextureCube(e||r,s)}function B_(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||rp,s)}function z_(n){switch(n){case 5126:return b_;case 35664:return S_;case 35665:return M_;case 35666:return T_;case 35674:return E_;case 35675:return w_;case 35676:return A_;case 5124:case 35670:return C_;case 35667:case 35671:return R_;case 35668:case 35672:return P_;case 35669:case 35673:return I_;case 5125:return L_;case 36294:return D_;case 36295:return N_;case 36296:return U_;case 35678:case 36198:case 36298:case 36306:case 35682:return k_;case 35679:case 36299:case 36307:return O_;case 35680:case 36300:case 36308:case 36293:return F_;case 36289:case 36303:case 36311:case 36292:return B_}}function G_(n,e){n.uniform1fv(this.addr,e)}function H_(n,e){let t=Zs(e,this.size,2);n.uniform2fv(this.addr,t)}function V_(n,e){let t=Zs(e,this.size,3);n.uniform3fv(this.addr,t)}function W_(n,e){let t=Zs(e,this.size,4);n.uniform4fv(this.addr,t)}function X_(n,e){let t=Zs(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function q_(n,e){let t=Zs(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Y_(n,e){let t=Zs(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Z_(n,e){n.uniform1iv(this.addr,e)}function J_(n,e){n.uniform2iv(this.addr,e)}function $_(n,e){n.uniform3iv(this.addr,e)}function j_(n,e){n.uniform4iv(this.addr,e)}function K_(n,e){n.uniform1uiv(this.addr,e)}function Q_(n,e){n.uniform2uiv(this.addr,e)}function ey(n,e){n.uniform3uiv(this.addr,e)}function ty(n,e){n.uniform4uiv(this.addr,e)}function ny(n,e,t){let i=this.cache,s=e.length,r=yc(t,s);kt(i,r)||(n.uniform1iv(this.addr,r),Ot(i,r));let o;this.type===n.SAMPLER_2D_SHADOW?o=vc(ip):o=np;for(let a=0;a!==s;++a)t.setTexture2D(e[a]||o,r[a])}function iy(n,e,t){let i=this.cache,s=e.length,r=yc(t,s);kt(i,r)||(n.uniform1iv(this.addr,r),Ot(i,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||op,r[o])}function sy(n,e,t){let i=this.cache,s=e.length,r=yc(t,s);kt(i,r)||(n.uniform1iv(this.addr,r),Ot(i,r));let o;this.type===n.SAMPLER_CUBE_SHADOW?o=vc(sp):o=ap;for(let a=0;a!==s;++a)t.setTextureCube(e[a]||o,r[a])}function ry(n,e,t){let i=this.cache,s=e.length,r=yc(t,s);kt(i,r)||(n.uniform1iv(this.addr,r),Ot(i,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||rp,r[o])}function oy(n){switch(n){case 5126:return G_;case 35664:return H_;case 35665:return V_;case 35666:return W_;case 35674:return X_;case 35675:return q_;case 35676:return Y_;case 5124:case 35670:return Z_;case 35667:case 35671:return J_;case 35668:case 35672:return $_;case 35669:case 35673:return j_;case 5125:return K_;case 36294:return Q_;case 36295:return ey;case 36296:return ty;case 35678:case 36198:case 36298:case 36306:case 35682:return ny;case 35679:case 36299:case 36307:return iy;case 35680:case 36300:case 36308:case 36293:return sy;case 36289:case 36303:case 36311:case 36292:return ry}}var xh=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=z_(t.type)}},_h=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=oy(t.type)}},yh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(e,t[a.id],i)}}},mh=/(\w+)(\])?(\[|\.)?/g;function zf(n,e){n.seq.push(e),n.map[e.id]=e}function ay(n,e,t){let i=n.name,s=i.length;for(mh.lastIndex=0;;){let r=mh.exec(i),o=mh.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){zf(t,l===void 0?new xh(a,n,e):new _h(a,n,e));break}else{let f=t.map[a];f===void 0&&(f=new yh(a),zf(t,f)),t=f}}}var Ys=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){let a=e.getActiveUniform(t,o),c=e.getUniformLocation(t,a.name);ay(a,c,this)}let s=[],r=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){let r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){let s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,o=t.length;r!==o;++r){let a=t[r],c=i[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){let i=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&i.push(o)}return i}};function Gf(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var cy=37297,ly=0;function hy(n,e){let t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}var Hf=new He;function uy(n){et._getMatrix(Hf,et.workingColorSpace,n);let e=`mat3( ${Hf.elements.map(t=>t.toFixed(4))} )`;switch(et.getTransfer(n)){case xr:return[e,"LinearTransferOETF"];case lt:return[e,"sRGBTransferOETF"];default:return Fe("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Vf(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+hy(n.getShaderSource(e),a)}else return r}function dy(n,e){let t=uy(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var fy={[zl]:"Linear",[Gl]:"Reinhard",[Hl]:"Cineon",[Vl]:"ACESFilmic",[Xl]:"AgX",[ql]:"Neutral",[Wl]:"Custom"};function py(n,e){let t=fy[e];return t===void 0?(Fe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var gc=new W;function my(){et.getLuminanceCoefficients(gc);let n=gc.x.toFixed(4),e=gc.y.toFixed(4),t=gc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function gy(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Jr).join(`
`)}function xy(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function _y(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(e,s),o=r.name,a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Jr(n){return n!==""}function Wf(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function Xf(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var yy=/^[ \t]*#include +<([\w\d./]+)>/gm;function vh(n){return n.replace(yy,vy)}function vy(n,e){let t=$e[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return vh(t)}var by=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function qf(n){return n.replace(by,Sy)}function Sy(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Yf(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var My={[ji]:"SHADOWMAP_TYPE_PCF",[Vs]:"SHADOWMAP_TYPE_VSM"};function Ty(n){return My[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Ey={[Xs]:"ENVMAP_MODE_REFRACTION"};function wy(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":Ey[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Ay={[Aa]:"ENVMAP_BLENDING_MULTIPLY",[cf]:"ENVMAP_BLENDING_MIX",[lf]:"ENVMAP_BLENDING_ADD"};function Cy(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":Ay[n.combine]||"ENVMAP_BLENDING_NONE"}function Ry(n,e,t,i){let s=n.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,c=Ty(t),l=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",u=wy(t),f=Cy(t),d=gy(t),g=xy(r),x=s.createProgram(),y,p,m=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(y=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Jr).join(`
`),y.length>0&&(y+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Jr).join(`
`),p.length>0&&(p+=`
`)):(y=[Yf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Jr).join(`
`),p=[Yf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==$n?"#define TONE_MAPPING":"",t.toneMapping!==$n?$e.tonemapping_pars_fragment:"",t.toneMapping!==$n?py("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",$e.colorspace_pars_fragment,dy("linearToOutputTexel",t.outputColorSpace),my(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Jr).join(`
`)),o=vh(o),o=Wf(o,t),o=Xf(o,t),a=vh(a),a=Wf(a,t),a=Xf(a,t),o=qf(o),a=qf(a),t.isRawShaderMaterial!==!0&&(m=`#version 300 es
`,y=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,p=["#define varying in",t.glslVersion===rh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===rh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let v=m+y+o,E=m+p+a,M=Gf(s,s.VERTEX_SHADER,v),w=Gf(s,s.FRAGMENT_SHADER,E);s.attachShader(x,M),s.attachShader(x,w),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function A(I){if(n.debug.checkShaderErrors){let B=s.getProgramInfoLog(x)||"",V=s.getShaderInfoLog(M)||"",Z=s.getShaderInfoLog(w)||"",N=B.trim(),$=V.trim(),R=Z.trim(),P=!0,U=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(P=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,x,M,w);else{let F=Vf(s,M,"vertex"),G=Vf(s,w,"fragment");Be("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+N+`
`+F+`
`+G)}else N!==""?Fe("WebGLProgram: Program Info Log:",N):($===""||R==="")&&(U=!1);U&&(I.diagnostics={runnable:P,programLog:N,vertexShader:{log:$,prefix:y},fragmentShader:{log:R,prefix:p}})}s.deleteShader(M),s.deleteShader(w),_=new Ys(s,x),T=_y(s,x)}let _;this.getUniforms=function(){return _===void 0&&A(this),_};let T;this.getAttributes=function(){return T===void 0&&A(this),T};let k=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return k===!1&&(k=s.getProgramParameter(x,cy)),k},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=ly++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=M,this.fragmentShader=w,this}var Py=0,bh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new Sh(e),t.set(e,i)),i}},Sh=class{constructor(e){this.id=Py++,this.code=e,this.usedTimes=0}};function Iy(n){return n===Bi||n===qr||n===Yr}function Ly(n,e,t,i,s,r){let o=new Sr,a=new bh,c=new Set,l=[],u=new Map,f=i.logarithmicDepthBuffer,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(_){return c.add(_),_===0?"uv":`uv${_}`}function x(_,T,k,I,B,V){let Z=I.fog,N=B.geometry,$=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?I.environment:null,R=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,P=e.get(_.envMap||$,R),U=d[_.type],F=i.precision;_.precision!==null&&(F=i.getMaxPrecision(_.precision),F!==_.precision&&Fe("WebGLProgram.getParameters:",_.precision,"not supported, using",F,"instead."));let G=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,te=G!==void 0?G.length:0,ce=0;N.morphAttributes.position!==void 0&&(ce=1),N.morphAttributes.normal!==void 0&&(ce=2),N.morphAttributes.color!==void 0&&(ce=3);let Ae,j,le,ve;if(U){let be=Kn[U];Ae=be.vertexShader,j=be.fragmentShader}else{Ae=_.vertexShader,j=_.fragmentShader;let be=a.getVertexShaderStage(_),ut=a.getFragmentShaderStage(_);a.update(_,be,ut),le=be.id,ve=ut.id}let Ee=n.getRenderTarget(),ue=n.state.buffers.depth.getReversed(),Ge=B.isInstancedMesh===!0,ct=B.isBatchedMesh===!0,Oe=!!_.map,ht=!!_.matcap,dt=!!P,je=dt&&P.isPMREMTexture===!0,Wt=!!_.aoMap,Nt=!!_.lightMap,cn=!!_.bumpMap&&_.wireframe===!1,Mt=!!_.normalMap,Vn=!!_.displacementMap,Ft=!!_.emissiveMap,_n=!!_.metalnessMap,yn=!!_.roughnessMap,vn=_.anisotropy>0,z=_.clearcoat>0,bn=_.diffuseRoughness>0,_t=_.dispersion>0,yt=_.retroreflectivity>0,ye=_.iridescence>0,Ut=_.sheen>0,ke=_.transmission>0,Xe=vn&&!!_.anisotropyMap,C=z&&!!_.clearcoatMap,b=z&&!!_.clearcoatNormalMap,q=z&&!!_.clearcoatRoughnessMap,oe=bn&&!!_.diffuseRoughnessMap,se=ye&&!!_.iridescenceMap,de=ye&&!!_.iridescenceThicknessMap,xe=Ut&&!!_.sheenColorMap,ee=Ut&&!!_.sheenRoughnessMap,ne=!!_.specularMap,pe=!!_.specularColorMap,D=!!_.specularIntensityMap,ie=ke&&!!_.transmissionMap,K=ke&&!!_.thicknessMap,me=!!_.gradientMap,he=!!_.alphaMap,fe=_.alphaTest>0,De=!!_.alphaHash,Je=!!_.extensions,ae=$n;_.toneMapped&&(Ee===null||Ee.isXRRenderTarget===!0)&&(ae=n.toneMapping);let Ue=je?P.isCompressedCubeTexture?P.image[0].mipmaps:P.mipmaps:null,Ze={shaderID:U,shaderType:_.type,shaderName:_.name,vertexShader:Ae,fragmentShader:j,defines:_.defines,customVertexShaderID:le,customFragmentShaderID:ve,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:F,batching:ct,batchingColor:ct&&B._colorsTexture!==null,instancing:Ge,instancingColor:Ge&&B.instanceColor!==null,instancingMorph:Ge&&B.morphTexture!==null,outputColorSpace:Ee===null?n.outputColorSpace:Ee.isXRRenderTarget===!0?Ee.texture.colorSpace:et.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:Oe,matcap:ht,envMap:dt,envMapMode:dt&&P.mapping,envMapPMREM:je,envMapMaxLod:je?Ue.length-1:null,envMapSize:je?Ue[0].width:null,aoMap:Wt,lightMap:Nt,bumpMap:cn,normalMap:Mt,displacementMap:Vn,emissiveMap:Ft,normalMapObjectSpace:Mt&&_.normalMapType===df,normalMapTangentSpace:Mt&&_.normalMapType===fc,packedNormalMap:Mt&&_.normalMapType===fc&&Iy(_.normalMap.format),metalnessMap:_n,roughnessMap:yn,anisotropy:vn,anisotropyMap:Xe,clearcoat:z,clearcoatMap:C,clearcoatNormalMap:b,clearcoatRoughnessMap:q,diffuseRoughness:bn,diffuseRoughnessMap:oe,dispersion:_t,retroreflection:yt,iridescence:ye,iridescenceMap:se,iridescenceThicknessMap:de,sheen:Ut,sheenColorMap:xe,sheenRoughnessMap:ee,specularMap:ne,specularColorMap:pe,specularIntensityMap:D,transmission:ke,transmissionMap:ie,thicknessMap:K,gradientMap:me,opaque:_.transparent===!1&&_.blending===Ws&&_.alphaToCoverage===!1,alphaMap:he,alphaTest:fe,alphaHash:De,combine:_.combine,mapUv:Oe&&g(_.map.channel),aoMapUv:Wt&&g(_.aoMap.channel),lightMapUv:Nt&&g(_.lightMap.channel),bumpMapUv:cn&&g(_.bumpMap.channel),normalMapUv:Mt&&g(_.normalMap.channel),displacementMapUv:Vn&&g(_.displacementMap.channel),emissiveMapUv:Ft&&g(_.emissiveMap.channel),metalnessMapUv:_n&&g(_.metalnessMap.channel),roughnessMapUv:yn&&g(_.roughnessMap.channel),anisotropyMapUv:Xe&&g(_.anisotropyMap.channel),clearcoatMapUv:C&&g(_.clearcoatMap.channel),clearcoatNormalMapUv:b&&g(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:q&&g(_.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:oe&&g(_.diffuseRoughnessMap.channel),iridescenceMapUv:se&&g(_.iridescenceMap.channel),iridescenceThicknessMapUv:de&&g(_.iridescenceThicknessMap.channel),sheenColorMapUv:xe&&g(_.sheenColorMap.channel),sheenRoughnessMapUv:ee&&g(_.sheenRoughnessMap.channel),specularMapUv:ne&&g(_.specularMap.channel),specularColorMapUv:pe&&g(_.specularColorMap.channel),specularIntensityMapUv:D&&g(_.specularIntensityMap.channel),transmissionMapUv:ie&&g(_.transmissionMap.channel),thicknessMapUv:K&&g(_.thicknessMap.channel),alphaMapUv:he&&g(_.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(Mt||vn),vertexNormals:!!N.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!N.attributes.uv&&(Oe||he),fog:!!Z,useFog:_.fog===!0,fogExp2:!!Z&&Z.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||N.attributes.normal===void 0&&Mt===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:ue,skinning:B.isSkinnedMesh===!0,hasPositionAttribute:N.attributes.position!==void 0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:te,morphTextureStride:ce,numSunLights:T.sun.length,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numSunLightShadows:T.sunShadowMap.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:V.filter(be=>be.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:n.shadowMap.enabled&&k.length>0,shadowMapType:n.shadowMap.type,toneMapping:ae,decodeVideoTexture:Oe&&_.map.isVideoTexture===!0&&et.getTransfer(_.map.colorSpace)===lt,decodeVideoTextureEmissive:Ft&&_.emissiveMap.isVideoTexture===!0&&et.getTransfer(_.emissiveMap.colorSpace)===lt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===En,flipSided:_.side===on,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:Je&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Je&&_.extensions.multiDraw===!0||ct)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Ze.vertexUv1s=c.has(1),Ze.vertexUv2s=c.has(2),Ze.vertexUv3s=c.has(3),c.clear(),Ze}function y(_){let T=[];if(_.shaderID?T.push(_.shaderID):(T.push(_.customVertexShaderID),T.push(_.customFragmentShaderID)),_.defines!==void 0)for(let k in _.defines)T.push(k),T.push(_.defines[k]);return _.isRawShaderMaterial===!1&&(p(T,_),m(T,_),T.push(n.outputColorSpace)),T.push(_.customProgramCacheKey),T.join()}function p(_,T){_.push(T.precision),_.push(T.outputColorSpace),_.push(T.envMapMode),_.push(T.envMapPMREM),_.push(T.envMapMaxLod),_.push(T.envMapSize),_.push(T.mapUv),_.push(T.alphaMapUv),_.push(T.lightMapUv),_.push(T.aoMapUv),_.push(T.bumpMapUv),_.push(T.normalMapUv),_.push(T.displacementMapUv),_.push(T.emissiveMapUv),_.push(T.metalnessMapUv),_.push(T.roughnessMapUv),_.push(T.anisotropyMapUv),_.push(T.clearcoatMapUv),_.push(T.clearcoatNormalMapUv),_.push(T.clearcoatRoughnessMapUv),_.push(T.diffuseRoughnessMapUv),_.push(T.iridescenceMapUv),_.push(T.iridescenceThicknessMapUv),_.push(T.sheenColorMapUv),_.push(T.sheenRoughnessMapUv),_.push(T.specularMapUv),_.push(T.specularColorMapUv),_.push(T.specularIntensityMapUv),_.push(T.transmissionMapUv),_.push(T.thicknessMapUv),_.push(T.combine),_.push(T.fogExp2),_.push(T.sizeAttenuation),_.push(T.morphTargetsCount),_.push(T.numSunLights),_.push(T.numDirLights),_.push(T.numPointLights),_.push(T.numSpotLights),_.push(T.numSpotLightMaps),_.push(T.numHemiLights),_.push(T.numRectAreaLights),_.push(T.numSunLightShadows),_.push(T.numDirLightShadows),_.push(T.numPointLightShadows),_.push(T.numSpotLightShadows),_.push(T.numSpotLightShadowsWithMaps),_.push(T.numLightProbes),_.push(T.numLightProbeGrids),_.push(T.shadowMapType),_.push(T.toneMapping),_.push(T.numClippingPlanes),_.push(T.numClipIntersection),_.push(T.depthPacking)}function m(_,T){o.disableAll(),T.instancing&&o.enable(0),T.instancingColor&&o.enable(1),T.instancingMorph&&o.enable(2),T.matcap&&o.enable(3),T.envMap&&o.enable(4),T.normalMapObjectSpace&&o.enable(5),T.normalMapTangentSpace&&o.enable(6),T.clearcoat&&o.enable(7),T.iridescence&&o.enable(8),T.alphaTest&&o.enable(9),T.vertexColors&&o.enable(10),T.vertexAlphas&&o.enable(11),T.vertexUv1s&&o.enable(12),T.vertexUv2s&&o.enable(13),T.vertexUv3s&&o.enable(14),T.vertexTangents&&o.enable(15),T.anisotropy&&o.enable(16),T.alphaHash&&o.enable(17),T.batching&&o.enable(18),T.dispersion&&o.enable(19),T.retroreflection&&o.enable(24),T.diffuseRoughness&&o.enable(25),T.batchingColor&&o.enable(20),T.gradientMap&&o.enable(21),T.packedNormalMap&&o.enable(22),T.vertexNormals&&o.enable(23),_.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.reversedDepthBuffer&&o.enable(4),T.skinning&&o.enable(5),T.morphTargets&&o.enable(6),T.morphNormals&&o.enable(7),T.morphColors&&o.enable(8),T.premultipliedAlpha&&o.enable(9),T.shadowMapEnabled&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.transmission&&o.enable(15),T.sheen&&o.enable(16),T.opaque&&o.enable(17),T.pointsUvs&&o.enable(18),T.decodeVideoTexture&&o.enable(19),T.decodeVideoTextureEmissive&&o.enable(20),T.alphaToCoverage&&o.enable(21),T.numLightProbeGrids>0&&o.enable(22),T.hasPositionAttribute&&o.enable(23),_.push(o.mask)}function v(_){let T=d[_.type],k;if(T){let I=Kn[T];k=Cf.clone(I.uniforms)}else k=_.uniforms;return k}function E(_,T){let k=u.get(T);return k!==void 0?++k.usedTimes:(k=new Ry(n,T,_,s),l.push(k),u.set(T,k)),k}function M(_){if(--_.usedTimes===0){let T=l.indexOf(_);l[T]=l[l.length-1],l.pop(),u.delete(_.cacheKey),_.destroy()}}function w(_){a.remove(_)}function A(){a.dispose()}return{getParameters:x,getProgramCacheKey:y,getUniforms:v,acquireProgram:E,releaseProgram:M,releaseShaderCache:w,programs:l,dispose:A}}function Dy(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,c){n.get(o)[a]=c}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function Ny(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Zf(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Jf(){let n=[],e=0,t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function o(d){let g=0;return d.isInstancedMesh&&(g+=2),d.isSkinnedMesh&&(g+=1),g}function a(d,g,x,y,p,m){let v=n[e];return v===void 0?(v={id:d.id,object:d,geometry:g,material:x,materialVariant:o(d),groupOrder:y,renderOrder:d.renderOrder,z:p,group:m},n[e]=v):(v.id=d.id,v.object=d,v.geometry=g,v.material=x,v.materialVariant=o(d),v.groupOrder=y,v.renderOrder=d.renderOrder,v.z=p,v.group=m),e++,v}function c(d,g,x,y,p,m,v){v.reversedDepth===!0&&(p=-p);let E=a(d,g,x,y,p,m);x.transmission>0?i.push(E):x.transparent===!0?s.push(E):t.push(E)}function l(d,g,x,y,p,m){let v=a(d,g,x,y,p,m);x.transmission>0?i.unshift(v):x.transparent===!0?s.unshift(v):t.unshift(v)}function u(d,g){t.length>1&&t.sort(d||Ny),i.length>1&&i.sort(g||Zf),s.length>1&&s.sort(g||Zf)}function f(){for(let d=e,g=n.length;d<g;d++){let x=n[d];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:c,unshift:l,finish:f,sort:u}}function Uy(){let n=new WeakMap;function e(i,s){let r=n.get(i),o;return r===void 0?(o=new Jf,n.set(i,[o])):s>=r.length?(o=new Jf,r.push(o)):o=r[s],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function ky(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new W,color:new Ye};break;case"SpotLight":t={position:new W,direction:new W,color:new Ye,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new W,color:new Ye,distance:0,decay:0};break;case"HemisphereLight":t={direction:new W,skyColor:new Ye,groundColor:new Ye};break;case"RectAreaLight":t={color:new Ye,position:new W,halfWidth:new W,halfHeight:new W};break}return n[e.id]=t,t}}}function Oy(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var Fy=0;function By(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function zy(n){let e=new ky,t=Oy(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new W);let s=new W,r=new gt,o=new gt;function a(l){let u=0,f=0,d=0;for(let V=0;V<9;V++)i.probe[V].set(0,0,0);let g=0,x=0,y=0,p=0,m=0,v=0,E=0,M=0,w=0,A=0,_=0,T=0,k=0,I=0;l.sort(By);for(let V=0,Z=l.length;V<Z;V++){let N=l[V],$=N.color,R=N.intensity,P=N.distance,U=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===Bi?U=N.shadow.map.texture:U=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)u+=$.r*R,f+=$.g*R,d+=$.b*R;else if(N.isLightProbe){for(let F=0;F<9;F++)i.probe[F].addScaledVector(N.sh.coefficients[F],R);I++}else if(N.isSunLight){let F=e.get(N);if(F.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let G=N.shadow,te=t.get(N);te.shadowIntensity=G.intensity,te.shadowBias=G.bias,te.shadowNormalBias=G.normalBias,te.shadowRadius=G.radius,te.shadowMapSize.copy(G.mapSize).multiply(G.getFrameExtents()),i.sunShadow[x]=te,i.sunShadowMap[x]=U;let ce=G.getViewportCount();for(let Ae=0;Ae<ce;Ae++)i.sunShadowMatrix[y+Ae]=G.getMatrix(Ae),i.sunShadowCascade[y+Ae]=G._cascadeData[Ae];y+=ce,x++}i.sun[g]=F,g++}else if(N.isDirectionalLight){let F=e.get(N);if(F.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let G=N.shadow,te=t.get(N);te.shadowIntensity=G.intensity,te.shadowBias=G.bias,te.shadowNormalBias=G.normalBias,te.shadowRadius=G.radius,te.shadowMapSize=G.mapSize,i.directionalShadow[p]=te,i.directionalShadowMap[p]=U,i.directionalShadowMatrix[p]=N.shadow.matrix,w++}i.directional[p]=F,p++}else if(N.isSpotLight){let F=e.get(N);F.position.setFromMatrixPosition(N.matrixWorld),F.color.copy($).multiplyScalar(R),F.distance=P,F.coneCos=Math.cos(N.angle),F.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),F.decay=N.decay,i.spot[v]=F;let G=N.shadow;if(N.map&&(i.spotLightMap[T]=N.map,T++,G.updateMatrices(N),N.castShadow&&k++),i.spotLightMatrix[v]=G.matrix,N.castShadow){let te=t.get(N);te.shadowIntensity=G.intensity,te.shadowBias=G.bias,te.shadowNormalBias=G.normalBias,te.shadowRadius=G.radius,te.shadowMapSize=G.mapSize,i.spotShadow[v]=te,i.spotShadowMap[v]=U,_++}v++}else if(N.isRectAreaLight){let F=e.get(N);F.color.copy($).multiplyScalar(R),F.halfWidth.set(N.width*.5,0,0),F.halfHeight.set(0,N.height*.5,0),i.rectArea[E]=F,E++}else if(N.isPointLight){let F=e.get(N);if(F.color.copy(N.color).multiplyScalar(N.intensity),F.distance=N.distance,F.decay=N.decay,N.castShadow){let G=N.shadow,te=t.get(N);te.shadowIntensity=G.intensity,te.shadowBias=G.bias,te.shadowNormalBias=G.normalBias,te.shadowRadius=G.radius,te.shadowMapSize=G.mapSize,te.shadowCameraNear=G.camera.near,te.shadowCameraFar=G.camera.far,i.pointShadow[m]=te,i.pointShadowMap[m]=U,i.pointShadowMatrix[m]=N.shadow.matrix,A++}i.point[m]=F,m++}else if(N.isHemisphereLight){let F=e.get(N);F.skyColor.copy(N.color).multiplyScalar(R),F.groundColor.copy(N.groundColor).multiplyScalar(R),i.hemi[M]=F,M++}}E>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Se.LTC_FLOAT_1,i.rectAreaLTC2=Se.LTC_FLOAT_2):(i.rectAreaLTC1=Se.LTC_HALF_1,i.rectAreaLTC2=Se.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=d;let B=i.hash;(B.sunLength!==g||B.directionalLength!==p||B.pointLength!==m||B.spotLength!==v||B.rectAreaLength!==E||B.hemiLength!==M||B.numSunShadows!==x||B.numDirectionalShadows!==w||B.numPointShadows!==A||B.numSpotShadows!==_||B.numSpotMaps!==T||B.numLightProbes!==I)&&(i.sun.length=g,i.directional.length=p,i.spot.length=v,i.rectArea.length=E,i.point.length=m,i.hemi.length=M,i.sunShadow.length=x,i.sunShadowMap.length=x,i.sunShadowMatrix.length=y,i.sunShadowCascade.length=y,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.directionalShadowMatrix.length=w,i.pointShadow.length=A,i.pointShadowMap.length=A,i.pointShadowMatrix.length=A,i.spotShadow.length=_,i.spotShadowMap.length=_,i.spotLightMatrix.length=_+T-k,i.spotLightMap.length=T,i.numSpotLightShadowsWithMaps=k,i.numLightProbes=I,B.sunLength=g,B.directionalLength=p,B.pointLength=m,B.spotLength=v,B.rectAreaLength=E,B.hemiLength=M,B.numSunShadows=x,B.numDirectionalShadows=w,B.numPointShadows=A,B.numSpotShadows=_,B.numSpotMaps=T,B.numLightProbes=I,i.version=Fy++)}function c(l,u){let f=0,d=0,g=0,x=0,y=0,p=0,m=u.matrixWorldInverse;for(let v=0,E=l.length;v<E;v++){let M=l[v];if(M.isSunLight){let w=i.sun[f];w.direction.setFromMatrixPosition(M.matrixWorld),w.direction.transformDirection(m),f++}else if(M.isDirectionalLight){let w=i.directional[d];w.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(m),d++}else if(M.isSpotLight){let w=i.spot[x];w.position.setFromMatrixPosition(M.matrixWorld),w.position.applyMatrix4(m),w.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(m),x++}else if(M.isRectAreaLight){let w=i.rectArea[y];w.position.setFromMatrixPosition(M.matrixWorld),w.position.applyMatrix4(m),o.identity(),r.copy(M.matrixWorld),r.premultiply(m),o.extractRotation(r),w.halfWidth.set(M.width*.5,0,0),w.halfHeight.set(0,M.height*.5,0),w.halfWidth.applyMatrix4(o),w.halfHeight.applyMatrix4(o),y++}else if(M.isPointLight){let w=i.point[g];w.position.setFromMatrixPosition(M.matrixWorld),w.position.applyMatrix4(m),g++}else if(M.isHemisphereLight){let w=i.hemi[p];w.direction.setFromMatrixPosition(M.matrixWorld),w.direction.transformDirection(m),p++}}}return{setup:a,setupView:c,state:i}}function $f(n){let e=new zy(n),t=[],i=[],s=[];function r(f){u.camera=f,t.length=0,i.length=0,s.length=0}function o(f){f.isLightProbeGrid?s.push(f):t.push(f)}function a(f){i.push(f)}function c(){e.setup(t),s.sort((f,d)=>f.priority-d.priority||f.id-d.id)}function l(f){e.setupView(t,f)}let u={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function Gy(n){let e=new WeakMap;function t(s,r=0){let o=e.get(s),a;return o===void 0?(a=new $f(n),e.set(s,[a])):r>=o.length?(a=new $f(n),o.push(a)):a=o[r],a}function i(){e=new WeakMap}return{get:t,dispose:i}}var Hy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Vy=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Wy=[new W(1,0,0),new W(-1,0,0),new W(0,1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1)],Xy=[new W(0,-1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1),new W(0,-1,0),new W(0,-1,0)],jf=new gt,Zr=new W,gh=new W;function qy(n,e,t){let i=new Ii,s=new ze,r=new ze,o=new vt,a=new fa,c=new pa,l={},u=t.maxTextureSize,f={[Oi]:on,[on]:Oi,[En]:En},d=new Jn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ze},radius:{value:4}},vertexShader:Hy,fragmentShader:Vy}),g=d.clone();g.defines.HORIZONTAL_PASS=1;let x=new At;x.setAttribute("position",new Ht(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new tt(x,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ji;let m=this.type;this.render=function(A,_,T){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||A.length===0)return;this.type===Hd&&(Fe("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=ji);let k=n.getRenderTarget(),I=n.getActiveCubeFace(),B=n.getActiveMipmapLevel(),V=n.state;V.setBlending(Ki),V.buffers.depth.getReversed()===!0?V.buffers.color.setClear(0,0,0,0):V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);let Z=m!==this.type;Z&&_.traverse(function(N){N.material&&(Array.isArray(N.material)?N.material.forEach($=>$.needsUpdate=!0):N.material.needsUpdate=!0)});for(let N=0,$=A.length;N<$;N++){let R=A[N],P=R.shadow;if(P===void 0){Fe("WebGLShadowMap:",R,"has no shadow.");continue}if(P.autoUpdate===!1&&P.needsUpdate===!1)continue;s.copy(P.mapSize);let U=P.getFrameExtents();s.multiply(U),r.copy(P.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/U.x),s.x=r.x*U.x,P.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/U.y),s.y=r.y*U.y,P.mapSize.y=r.y));let F=n.state.buffers.depth.getReversed();if(P.camera._reversedDepth=F,P.map===null||Z===!0){if(P.map!==null&&(P.map.depthTexture!==null&&(P.map.depthTexture.dispose(),P.map.depthTexture=null),P.map.dispose()),this.type===Vs){if(R.isPointLight){Fe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}P.map=new mn(s.x,s.y,{format:Bi,type:On,minFilter:nn,magFilter:nn,generateMipmaps:!1}),P.map.texture.name=R.name+".shadowMap",P.map.depthTexture=new fi(s.x,s.y,kn),P.map.depthTexture.name=R.name+".shadowMapDepth",P.map.depthTexture.format=hi,P.map.depthTexture.compareFunction=null,P.map.depthTexture.minFilter=Vt,P.map.depthTexture.magFilter=Vt}else R.isPointLight?(P.map=new $r(s.x),P.map.depthTexture=new Pr(s.x,Un)):(P.map=new mn(s.x,s.y),P.map.depthTexture=new fi(s.x,s.y,Un)),P.map.depthTexture.name=R.name+".shadowMap",P.map.depthTexture.format=hi,this.type===ji?(P.map.depthTexture.compareFunction=F?nh:th,P.map.depthTexture.minFilter=nn,P.map.depthTexture.magFilter=nn):(P.map.depthTexture.compareFunction=null,P.map.depthTexture.minFilter=Vt,P.map.depthTexture.magFilter=Vt);P.camera.updateProjectionMatrix()}P.map.isWebGLCubeRenderTarget!==!0&&(P.map.width!==s.x||P.map.height!==s.y)&&P.map.setSize(s.x,s.y);let G=P.map.isWebGLCubeRenderTarget?6:P.getViewportCount();R.isPointLight!==!0&&P.updateMatrices(R,T);let te=(P.camera.layers.mask&4294967294)!==0?P.camera.layers:T.layers;for(let ce=0;ce<G;ce++){let Ae=P.getCamera(ce);if(R.isPointLight){let j=P.camera,le=P.matrix,ve=R.distance||j.far;ve!==j.far&&(j.far=ve,j.updateProjectionMatrix()),Zr.setFromMatrixPosition(R.matrixWorld),j.position.copy(Zr),gh.copy(j.position),gh.add(Wy[ce]),j.up.copy(Xy[ce]),j.lookAt(gh),j.updateMatrixWorld(),le.makeTranslation(-Zr.x,-Zr.y,-Zr.z),jf.multiplyMatrices(j.projectionMatrix,j.matrixWorldInverse),P._frustum.setFromProjectionMatrix(jf,j.coordinateSystem,j.reversedDepth)}if(P.map.isWebGLCubeRenderTarget)n.setRenderTarget(P.map,ce),n.clear();else{ce===0&&(n.setRenderTarget(P.map),n.clear());let j=P.getViewport(ce);o.set(r.x*j.x,r.y*j.y,r.x*j.z,r.y*j.w),V.viewport(o)}i=P.getFrustum(ce),M(_,T,Ae,R,te,this.type)}P.isPointLightShadow!==!0&&this.type===Vs&&v(P,T),P.needsUpdate=!1}m=this.type,p.needsUpdate=!1,n.setRenderTarget(k,I,B)};function v(A,_){let T=e.update(y);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,g.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,g.needsUpdate=!0),A.mapPass===null?A.mapPass=new mn(s.x,s.y,{format:Bi,type:On}):(A.mapPass.width!==A.map.width||A.mapPass.height!==A.map.height)&&A.mapPass.setSize(A.map.width,A.map.height),d.uniforms.shadow_pass.value=A.map.depthTexture,d.uniforms.resolution.value.set(A.map.width,A.map.height),d.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(_,null,T,d,y,null),g.uniforms.shadow_pass.value=A.mapPass.texture,g.uniforms.resolution.value.set(A.map.width,A.map.height),g.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(_,null,T,g,y,null)}function E(A,_,T,k){let I=null,B=T.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(B!==void 0)I=B;else if(I=T.isPointLight===!0?c:a,n.localClippingEnabled&&_.clipShadows===!0&&Array.isArray(_.clippingPlanes)&&_.clippingPlanes.length!==0||_.displacementMap&&_.displacementScale!==0||_.alphaMap&&_.alphaTest>0||_.map&&_.alphaTest>0||_.alphaToCoverage===!0){let V=I.uuid,Z=_.uuid,N=l[V];N===void 0&&(N={},l[V]=N);let $=N[Z];$===void 0&&($=I.clone(),N[Z]=$,_.addEventListener("dispose",w)),I=$}if(I.visible=_.visible,I.wireframe=_.wireframe,k===Vs?I.side=_.shadowSide!==null?_.shadowSide:_.side:I.side=_.shadowSide!==null?_.shadowSide:f[_.side],I.alphaMap=_.alphaMap,I.alphaTest=_.alphaToCoverage===!0?.5:_.alphaTest,I.map=_.map,I.clipShadows=_.clipShadows,I.clippingPlanes=_.clippingPlanes,I.clipIntersection=_.clipIntersection,I.displacementMap=_.displacementMap,I.displacementScale=_.displacementScale,I.displacementBias=_.displacementBias,I.wireframeLinewidth=_.wireframeLinewidth,I.linewidth=_.linewidth,T.isPointLight===!0&&I.isMeshDistanceMaterial===!0){let V=n.properties.get(I);V.light=T}return I}function M(A,_,T,k,I,B){if(A.visible===!1)return;if(A.layers.test(I)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&B===Vs)&&(!A.frustumCulled||A.intersectsFrustum(i))){A.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,A.matrixWorld);let N=e.update(A),$=A.material;if(Array.isArray($)){let R=N.groups;for(let P=0,U=R.length;P<U;P++){let F=R[P],G=$[F.materialIndex];if(G&&G.visible){let te=E(A,G,k,B);A.onBeforeShadow(n,A,_,T,N,te,F),n.renderBufferDirect(T,null,N,te,A,F),A.onAfterShadow(n,A,_,T,N,te,F)}}}else if($.visible){let R=E(A,$,k,B);A.onBeforeShadow(n,A,_,T,N,R,null),n.renderBufferDirect(T,null,N,R,A,null),A.onAfterShadow(n,A,_,T,N,R,null)}}let Z=A.children;for(let N=0,$=Z.length;N<$;N++)M(Z[N],_,T,k,I,B)}function w(A){A.target.removeEventListener("dispose",w);for(let T in l){let k=l[T],I=A.target.uuid;I in k&&(k[I].dispose(),delete k[I])}}}function Yy(n,e){function t(){let D=!1,ie=new vt,K=null,me=new vt(0,0,0,0);return{setMask:function(he){K!==he&&!D&&(n.colorMask(he,he,he,he),K=he)},setLocked:function(he){D=he},setClear:function(he,fe,De,Je,ae){ae===!0&&(he*=Je,fe*=Je,De*=Je),ie.set(he,fe,De,Je),me.equals(ie)===!1&&(n.clearColor(he,fe,De,Je),me.copy(ie))},reset:function(){D=!1,K=null,me.set(-1,0,0,0)}}}function i(){let D=!1,ie=!1,K=null,me=null,he=null;return{setReversed:function(fe){if(ie!==fe){let De=e.get("EXT_clip_control");fe?De.clipControlEXT(De.LOWER_LEFT_EXT,De.ZERO_TO_ONE_EXT):De.clipControlEXT(De.LOWER_LEFT_EXT,De.NEGATIVE_ONE_TO_ONE_EXT),ie=fe;let Je=he;he=null,this.setClear(Je)}},getReversed:function(){return ie},setTest:function(fe){fe?ue(n.DEPTH_TEST):Ge(n.DEPTH_TEST)},setMask:function(fe){K!==fe&&!D&&(n.depthMask(fe),K=fe)},setFunc:function(fe){if(ie&&(fe=Sf[fe]),me!==fe){switch(fe){case jo:n.depthFunc(n.NEVER);break;case Ko:n.depthFunc(n.ALWAYS);break;case Qo:n.depthFunc(n.LESS);break;case Is:n.depthFunc(n.LEQUAL);break;case ea:n.depthFunc(n.EQUAL);break;case ta:n.depthFunc(n.GEQUAL);break;case na:n.depthFunc(n.GREATER);break;case ia:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}me=fe}},setLocked:function(fe){D=fe},setClear:function(fe){he!==fe&&(he=fe,ie&&(fe=1-fe),n.clearDepth(fe))},reset:function(){D=!1,K=null,me=null,he=null,ie=!1}}}function s(){let D=!1,ie=null,K=null,me=null,he=null,fe=null,De=null,Je=null,ae=null;return{setTest:function(Ue){D||(Ue?ue(n.STENCIL_TEST):Ge(n.STENCIL_TEST))},setMask:function(Ue){ie!==Ue&&!D&&(n.stencilMask(Ue),ie=Ue)},setFunc:function(Ue,Ze,be){(K!==Ue||me!==Ze||he!==be)&&(n.stencilFunc(Ue,Ze,be),K=Ue,me=Ze,he=be)},setOp:function(Ue,Ze,be){(fe!==Ue||De!==Ze||Je!==be)&&(n.stencilOp(Ue,Ze,be),fe=Ue,De=Ze,Je=be)},setLocked:function(Ue){D=Ue},setClear:function(Ue){ae!==Ue&&(n.clearStencil(Ue),ae=Ue)},reset:function(){D=!1,ie=null,K=null,me=null,he=null,fe=null,De=null,Je=null,ae=null}}}let r=new t,o=new i,a=new s,c={},l=new WeakMap,u={},f={},d={},g=new WeakMap,x=[],y=null,p=!1,m=null,v=null,E=null,M=null,w=null,A=null,_=null,T=new Ye(0,0,0),k=0,I=!1,B=null,V=null,Z=null,N=null,$=null,R=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),P=!1,U=0,F=n.getParameter(n.VERSION);F.indexOf("WebGL")!==-1?(U=parseFloat(/^WebGL (\d)/.exec(F)[1]),P=U>=1):F.indexOf("OpenGL ES")!==-1&&(U=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),P=U>=2);let G=null,te={},ce=n.getParameter(n.SCISSOR_BOX),Ae=n.getParameter(n.VIEWPORT),j=new vt().fromArray(ce),le=new vt().fromArray(Ae);function ve(D,ie,K,me){let he=new Uint8Array(4),fe=n.createTexture();n.bindTexture(D,fe),n.texParameteri(D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(D,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let De=0;De<K;De++)D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY?n.texImage3D(ie,0,n.RGBA,1,1,me,0,n.RGBA,n.UNSIGNED_BYTE,he):n.texImage2D(ie+De,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,he);return fe}let Ee={};Ee[n.TEXTURE_2D]=ve(n.TEXTURE_2D,n.TEXTURE_2D,1),Ee[n.TEXTURE_CUBE_MAP]=ve(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ee[n.TEXTURE_2D_ARRAY]=ve(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Ee[n.TEXTURE_3D]=ve(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ue(n.DEPTH_TEST),o.setFunc(Is),cn(!1),Mt(Ul),ue(n.CULL_FACE),Wt(Ki);function ue(D){u[D]!==!0&&(n.enable(D),u[D]=!0)}function Ge(D){u[D]!==!1&&(n.disable(D),u[D]=!1)}function ct(D,ie){return d[D]!==ie?(n.bindFramebuffer(D,ie),d[D]=ie,D===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=ie),D===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=ie),!0):!1}function Oe(D,ie){let K=x,me=!1;if(D){K=g.get(ie),K===void 0&&(K=[],g.set(ie,K));let he=D.textures;if(K.length!==he.length||K[0]!==n.COLOR_ATTACHMENT0){for(let fe=0,De=he.length;fe<De;fe++)K[fe]=n.COLOR_ATTACHMENT0+fe;K.length=he.length,me=!0}}else K[0]!==n.BACK&&(K[0]=n.BACK,me=!0);me&&n.drawBuffers(K)}function ht(D){return y!==D?(n.useProgram(D),y=D,!0):!1}let dt={[Qi]:n.FUNC_ADD,[Wd]:n.FUNC_SUBTRACT,[Xd]:n.FUNC_REVERSE_SUBTRACT};dt[qd]=n.MIN,dt[Yd]=n.MAX;let je={[Zd]:n.ZERO,[Jd]:n.ONE,[$d]:n.SRC_COLOR,[Fl]:n.SRC_ALPHA,[nf]:n.SRC_ALPHA_SATURATE,[ef]:n.DST_COLOR,[Kd]:n.DST_ALPHA,[jd]:n.ONE_MINUS_SRC_COLOR,[Bl]:n.ONE_MINUS_SRC_ALPHA,[tf]:n.ONE_MINUS_DST_COLOR,[Qd]:n.ONE_MINUS_DST_ALPHA,[sf]:n.CONSTANT_COLOR,[rf]:n.ONE_MINUS_CONSTANT_COLOR,[of]:n.CONSTANT_ALPHA,[af]:n.ONE_MINUS_CONSTANT_ALPHA};function Wt(D,ie,K,me,he,fe,De,Je,ae,Ue){if(D===Ki){p===!0&&(Ge(n.BLEND),p=!1);return}if(p===!1&&(ue(n.BLEND),p=!0),D!==Vd){if(D!==m||Ue!==I){if((v!==Qi||w!==Qi)&&(n.blendEquation(n.FUNC_ADD),v=Qi,w=Qi),Ue)switch(D){case Ws:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Fi:n.blendFunc(n.ONE,n.ONE);break;case kl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ol:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Be("WebGLState: Invalid blending: ",D);break}else switch(D){case Ws:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Fi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case kl:Be("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ol:Be("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Be("WebGLState: Invalid blending: ",D);break}E=null,M=null,A=null,_=null,T.set(0,0,0),k=0,m=D,I=Ue}return}he=he||ie,fe=fe||K,De=De||me,(ie!==v||he!==w)&&(n.blendEquationSeparate(dt[ie],dt[he]),v=ie,w=he),(K!==E||me!==M||fe!==A||De!==_)&&(n.blendFuncSeparate(je[K],je[me],je[fe],je[De]),E=K,M=me,A=fe,_=De),(Je.equals(T)===!1||ae!==k)&&(n.blendColor(Je.r,Je.g,Je.b,ae),T.copy(Je),k=ae),m=D,I=!1}function Nt(D,ie){D.side===En?Ge(n.CULL_FACE):ue(n.CULL_FACE);let K=D.side===on;ie&&(K=!K),cn(K),D.blending===Ws&&D.transparent===!1?Wt(Ki):Wt(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),r.setMask(D.colorWrite);let me=D.stencilWrite;a.setTest(me),me&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Ft(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?ue(n.SAMPLE_ALPHA_TO_COVERAGE):Ge(n.SAMPLE_ALPHA_TO_COVERAGE)}function cn(D){B!==D&&(D?n.frontFace(n.CW):n.frontFace(n.CCW),B=D)}function Mt(D){D!==zd?(ue(n.CULL_FACE),D!==V&&(D===Ul?n.cullFace(n.BACK):D===Gd?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ge(n.CULL_FACE),V=D}function Vn(D){D!==Z&&(P&&n.lineWidth(D),Z=D)}function Ft(D,ie,K){D?(ue(n.POLYGON_OFFSET_FILL),(N!==ie||$!==K)&&(N=ie,$=K,o.getReversed()&&(ie=-ie,K=-K),n.polygonOffset(ie,K))):Ge(n.POLYGON_OFFSET_FILL)}function _n(D){D?ue(n.SCISSOR_TEST):Ge(n.SCISSOR_TEST)}function yn(D){D===void 0&&(D=n.TEXTURE0+R-1),G!==D&&(n.activeTexture(D),G=D)}function vn(D,ie,K){K===void 0&&(G===null?K=n.TEXTURE0+R-1:K=G);let me=te[K];me===void 0&&(me={type:void 0,texture:void 0},te[K]=me),(me.type!==D||me.texture!==ie)&&(G!==K&&(n.activeTexture(K),G=K),n.bindTexture(D,ie||Ee[D]),me.type=D,me.texture=ie)}function z(){let D=te[G];D!==void 0&&D.type!==void 0&&(n.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function bn(){try{n.compressedTexImage2D(...arguments)}catch(D){Be("WebGLState:",D)}}function _t(){try{n.compressedTexImage3D(...arguments)}catch(D){Be("WebGLState:",D)}}function yt(){try{n.texSubImage2D(...arguments)}catch(D){Be("WebGLState:",D)}}function ye(){try{n.texSubImage3D(...arguments)}catch(D){Be("WebGLState:",D)}}function Ut(){try{n.compressedTexSubImage2D(...arguments)}catch(D){Be("WebGLState:",D)}}function ke(){try{n.compressedTexSubImage3D(...arguments)}catch(D){Be("WebGLState:",D)}}function Xe(){try{n.texStorage2D(...arguments)}catch(D){Be("WebGLState:",D)}}function C(){try{n.texStorage3D(...arguments)}catch(D){Be("WebGLState:",D)}}function b(){try{n.texImage2D(...arguments)}catch(D){Be("WebGLState:",D)}}function q(){try{n.texImage3D(...arguments)}catch(D){Be("WebGLState:",D)}}function oe(D){return f[D]!==void 0?f[D]:n.getParameter(D)}function se(D,ie){f[D]!==ie&&(n.pixelStorei(D,ie),f[D]=ie)}function de(D){j.equals(D)===!1&&(n.scissor(D.x,D.y,D.z,D.w),j.copy(D))}function xe(D){le.equals(D)===!1&&(n.viewport(D.x,D.y,D.z,D.w),le.copy(D))}function ee(D,ie){let K=l.get(ie);K===void 0&&(K=new WeakMap,l.set(ie,K));let me=K.get(D);me===void 0&&(me=n.getUniformBlockIndex(ie,D.name),n.uniformBlockBinding(ie,me,me),K.set(D,me))}function ne(D,ie,K){let he=l.get(ie).get(D);c[he]!==K&&(n.bindBufferBase(n.UNIFORM_BUFFER,he,K),c[he]=K)}function pe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},f={},G=null,te={},d={},c={},g=new WeakMap,x=[],y=null,p=!1,m=null,v=null,E=null,M=null,w=null,A=null,_=null,T=new Ye(0,0,0),k=0,I=!1,B=null,V=null,Z=null,N=null,$=null,j.set(0,0,n.canvas.width,n.canvas.height),le.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ue,disable:Ge,bindFramebuffer:ct,drawBuffers:Oe,useProgram:ht,setBlending:Wt,setMaterial:Nt,setFlipSided:cn,setCullFace:Mt,setLineWidth:Vn,setPolygonOffset:Ft,setScissorTest:_n,activeTexture:yn,bindTexture:vn,unbindTexture:z,compressedTexImage2D:bn,compressedTexImage3D:_t,texImage2D:b,texImage3D:q,pixelStorei:se,getParameter:oe,updateUBOMapping:ee,uniformBlockBinding:ne,texStorage2D:Xe,texStorage3D:C,texSubImage2D:yt,texSubImage3D:ye,compressedTexSubImage2D:Ut,compressedTexSubImage3D:ke,scissor:de,viewport:xe,reset:pe}}function Zy(n,e,t,i,s,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ze,u=new WeakMap,f=new Set,d,g=new WeakMap,x=new Set,y=new FinalizationRegistry(C=>x.delete(C)),p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(C,b){return p?new OffscreenCanvas(C,b):_r("canvas")}function v(C,b,q){let oe=1,se=Xe(C);if((se.width>q||se.height>q)&&(oe=q/Math.max(se.width,se.height)),oe<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let de=Math.floor(oe*se.width),xe=Math.floor(oe*se.height);d===void 0&&(d=m(de,xe));let ee=b?m(de,xe):d;return ee.width=de,ee.height=xe,ee.getContext("2d").drawImage(C,0,0,de,xe),Fe("WebGLRenderer: Texture has been resized from ("+se.width+"x"+se.height+") to ("+de+"x"+xe+")."),ee}else return"data"in C&&Fe("WebGLRenderer: Image in DataTexture is too big ("+se.width+"x"+se.height+")."),C;return C}function E(C){return C.generateMipmaps}function M(C){n.generateMipmap(C)}function w(C){return C.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?n.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function A(C,b,q,oe,se,de=!1){if(C!==null){if(n[C]!==void 0)return n[C];Fe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let xe;oe&&(xe=e.get("EXT_texture_norm16"),xe||Fe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ee=b;if(b===n.RED&&(q===n.FLOAT&&(ee=n.R32F),q===n.HALF_FLOAT&&(ee=n.R16F),q===n.UNSIGNED_BYTE&&(ee=n.R8),q===n.UNSIGNED_SHORT&&xe&&(ee=xe.R16_EXT),q===n.SHORT&&xe&&(ee=xe.R16_SNORM_EXT)),b===n.RED_INTEGER&&(q===n.UNSIGNED_BYTE&&(ee=n.R8UI),q===n.UNSIGNED_SHORT&&(ee=n.R16UI),q===n.UNSIGNED_INT&&(ee=n.R32UI),q===n.BYTE&&(ee=n.R8I),q===n.SHORT&&(ee=n.R16I),q===n.INT&&(ee=n.R32I)),b===n.RG&&(q===n.FLOAT&&(ee=n.RG32F),q===n.HALF_FLOAT&&(ee=n.RG16F),q===n.UNSIGNED_BYTE&&(ee=n.RG8),q===n.UNSIGNED_SHORT&&xe&&(ee=xe.RG16_EXT),q===n.SHORT&&xe&&(ee=xe.RG16_SNORM_EXT)),b===n.RG_INTEGER&&(q===n.UNSIGNED_BYTE&&(ee=n.RG8UI),q===n.UNSIGNED_SHORT&&(ee=n.RG16UI),q===n.UNSIGNED_INT&&(ee=n.RG32UI),q===n.BYTE&&(ee=n.RG8I),q===n.SHORT&&(ee=n.RG16I),q===n.INT&&(ee=n.RG32I)),b===n.RGB_INTEGER&&(q===n.UNSIGNED_BYTE&&(ee=n.RGB8UI),q===n.UNSIGNED_SHORT&&(ee=n.RGB16UI),q===n.UNSIGNED_INT&&(ee=n.RGB32UI),q===n.BYTE&&(ee=n.RGB8I),q===n.SHORT&&(ee=n.RGB16I),q===n.INT&&(ee=n.RGB32I)),b===n.RGBA_INTEGER&&(q===n.UNSIGNED_BYTE&&(ee=n.RGBA8UI),q===n.UNSIGNED_SHORT&&(ee=n.RGBA16UI),q===n.UNSIGNED_INT&&(ee=n.RGBA32UI),q===n.BYTE&&(ee=n.RGBA8I),q===n.SHORT&&(ee=n.RGBA16I),q===n.INT&&(ee=n.RGBA32I)),b===n.RGB&&(q===n.UNSIGNED_SHORT&&xe&&(ee=xe.RGB16_EXT),q===n.SHORT&&xe&&(ee=xe.RGB16_SNORM_EXT),q===n.UNSIGNED_INT_5_9_9_9_REV&&(ee=n.RGB9_E5),q===n.UNSIGNED_INT_10F_11F_11F_REV&&(ee=n.R11F_G11F_B10F)),b===n.RGBA){let ne=de?xr:et.getTransfer(se);q===n.FLOAT&&(ee=n.RGBA32F),q===n.HALF_FLOAT&&(ee=n.RGBA16F),q===n.UNSIGNED_BYTE&&(ee=ne===lt?n.SRGB8_ALPHA8:n.RGBA8),q===n.UNSIGNED_SHORT&&xe&&(ee=xe.RGBA16_EXT),q===n.SHORT&&xe&&(ee=xe.RGBA16_SNORM_EXT),q===n.UNSIGNED_SHORT_4_4_4_4&&(ee=n.RGBA4),q===n.UNSIGNED_SHORT_5_5_5_1&&(ee=n.RGB5_A1)}return(ee===n.R16F||ee===n.R32F||ee===n.RG16F||ee===n.RG32F||ee===n.RGBA16F||ee===n.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function _(C,b){let q;return C?b===null||b===Un||b===ts?q=n.DEPTH24_STENCIL8:b===kn?q=n.DEPTH32F_STENCIL8:b===qs&&(q=n.DEPTH24_STENCIL8,Fe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Un||b===ts?q=n.DEPTH_COMPONENT24:b===kn?q=n.DEPTH_COMPONENT32F:b===qs&&(q=n.DEPTH_COMPONENT16),q}function T(C,b){return E(C)===!0||C.isFramebufferTexture&&C.minFilter!==Vt&&C.minFilter!==nn?Math.log2(Math.max(b.width,b.height))+1:C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?b.mipmaps.length:1}function k(C){let b=new WeakRef(C);i.get(C).__ref=b,x.add(b),y.register(C,b,b)}function I(C){let b=i.get(C).__ref;b!==void 0&&(x.delete(b),y.unregister(b))}function B(C){Z(C.target)}function V(C){N(C.target)}function Z(C){C.removeEventListener("dispose",B),I(C),R(C),C.isVideoTexture&&u.delete(C),C.isHTMLTexture&&f.delete(C)}function N(C){C.removeEventListener("dispose",V),I(C),U(C)}function $(){for(let C of x){let b=C.deref();b!==void 0&&(b.isRenderTarget===!0?N(b):Z(b))}x.clear(),f.clear()}function R(C){let b=i.get(C);if(b.__webglInit===void 0)return;let q=C.source,oe=g.get(q);if(oe){let se=oe[b.__cacheKey];se.usedTimes--,se.usedTimes===0&&P(C),Object.keys(oe).length===0&&g.delete(q)}i.remove(C)}function P(C){let b=i.get(C);n.deleteTexture(b.__webglTexture);let q=C.source,oe=g.get(q);delete oe[b.__cacheKey],o.memory.textures--}function U(C){let b=i.get(C);b.__depthDisposeCallback&&b.__depthDisposeCallback();let q=C.depthTexture;if(q&&q.renderTarget===C&&Z(q),C.isWebGLCubeRenderTarget)for(let se=0;se<6;se++){if(Array.isArray(b.__webglFramebuffer[se]))for(let de=0;de<b.__webglFramebuffer[se].length;de++)n.deleteFramebuffer(b.__webglFramebuffer[se][de]);else n.deleteFramebuffer(b.__webglFramebuffer[se]);b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer[se])}else{if(Array.isArray(b.__webglFramebuffer))for(let se=0;se<b.__webglFramebuffer.length;se++)n.deleteFramebuffer(b.__webglFramebuffer[se]);else n.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&n.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let se=0;se<b.__webglColorRenderbuffer.length;se++)b.__webglColorRenderbuffer[se]&&n.deleteRenderbuffer(b.__webglColorRenderbuffer[se]);b.__webglDepthRenderbuffer&&n.deleteRenderbuffer(b.__webglDepthRenderbuffer)}let oe=C.textures;for(let se=0,de=oe.length;se<de;se++){let xe=i.get(oe[se]);xe.__webglTexture&&(n.deleteTexture(xe.__webglTexture),o.memory.textures--),i.remove(oe[se])}i.remove(C)}let F=0;function G(){F=0}function te(){return F}function ce(C){F=C}function Ae(){let C=F;return C>=s.maxTextures&&Fe("WebGLTextures: Trying to use "+(C+1)+" texture units while this GPU supports only "+s.maxTextures),F+=1,C}function j(C){let b=[];return b.push(C.wrapS),b.push(C.wrapT),b.push(C.wrapR||0),b.push(C.magFilter),b.push(C.minFilter),b.push(C.anisotropy),b.push(C.internalFormat),b.push(C.format),b.push(C.type),b.push(C.generateMipmaps),b.push(C.mipmapsAutoUpdate),b.push(C.premultiplyAlpha),b.push(C.flipY),b.push(C.unpackAlignment),b.push(C.colorSpace),b.join()}function le(C,b){let q=i.get(C);if(C.isVideoTexture&&Ut(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&q.__version!==C.version){let oe=C.image;if(oe===null)Fe("WebGLRenderer: Texture marked for update but no image data found.");else if(oe.complete===!1)Fe("WebGLRenderer: Texture marked for update but image is incomplete");else{Nt(q,C,b);return}}else C.isExternalTexture&&(q.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,q.__webglTexture,n.TEXTURE0+b)}function ve(C,b){let q=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&q.__version!==C.version){Nt(q,C,b);return}else C.isExternalTexture&&(q.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,q.__webglTexture,n.TEXTURE0+b)}function Ee(C,b){let q=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&q.__version!==C.version){Nt(q,C,b);return}t.bindTexture(n.TEXTURE_3D,q.__webglTexture,n.TEXTURE0+b)}function ue(C,b){let q=i.get(C);if(C.version>0&&q.__version!==C.version){cn(q,C,b);return}t.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture,n.TEXTURE0+b)}let Ge={[Ls]:n.REPEAT,[Xn]:n.CLAMP_TO_EDGE,[sa]:n.MIRRORED_REPEAT},ct={[Vt]:n.NEAREST,[hf]:n.NEAREST_MIPMAP_NEAREST,[Gr]:n.NEAREST_MIPMAP_LINEAR,[nn]:n.LINEAR,[Pa]:n.LINEAR_MIPMAP_NEAREST,[mi]:n.LINEAR_MIPMAP_LINEAR},Oe={[pf]:n.NEVER,[ih]:n.ALWAYS,[mf]:n.LESS,[th]:n.LEQUAL,[gf]:n.EQUAL,[nh]:n.GEQUAL,[xf]:n.GREATER,[_f]:n.NOTEQUAL};function ht(C,b){if(b.type===kn&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===nn||b.magFilter===Pa||b.magFilter===Gr||b.magFilter===mi||b.minFilter===nn||b.minFilter===Pa||b.minFilter===Gr||b.minFilter===mi)&&Fe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(C,n.TEXTURE_WRAP_S,Ge[b.wrapS]),n.texParameteri(C,n.TEXTURE_WRAP_T,Ge[b.wrapT]),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,Ge[b.wrapR]),n.texParameteri(C,n.TEXTURE_MAG_FILTER,ct[b.magFilter]),n.texParameteri(C,n.TEXTURE_MIN_FILTER,ct[b.minFilter]),b.compareFunction&&(n.texParameteri(C,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(C,n.TEXTURE_COMPARE_FUNC,Oe[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Vt||b.minFilter!==Gr&&b.minFilter!==mi||b.type===kn&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||i.get(b).__currentAnisotropy){let q=e.get("EXT_texture_filter_anisotropic");n.texParameterf(C,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),i.get(b).__currentAnisotropy=b.anisotropy}}}function dt(C,b){let q=!1;C.__webglInit===void 0&&(C.__webglInit=!0,b.addEventListener("dispose",B),k(b));let oe=b.source,se=g.get(oe);se===void 0&&(se={},g.set(oe,se));let de=j(b);if(de!==C.__cacheKey){se[de]===void 0&&(se[de]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,q=!0),se[de].usedTimes++;let xe=se[C.__cacheKey];xe!==void 0&&(se[C.__cacheKey].usedTimes--,xe.usedTimes===0&&P(b)),C.__cacheKey=de,C.__webglTexture=se[de].texture}return q}function je(C,b,q){return Math.floor(Math.floor(C/q)/b)}function Wt(C,b,q,oe){let de=C.updateRanges;if(de.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,b.width,b.height,q,oe,b.data);else{de.sort((D,ie)=>D.start-ie.start);let xe=0;for(let D=1;D<de.length;D++){let ie=de[xe],K=de[D],me=ie.start+ie.count,he=je(K.start,b.width,4),fe=je(ie.start,b.width,4);K.start<=me+1&&he===fe&&je(K.start+K.count-1,b.width,4)===he?ie.count=Math.max(ie.count,K.start+K.count-ie.start):(++xe,de[xe]=K)}de.length=xe+1;let ee=t.getParameter(n.UNPACK_ROW_LENGTH),ne=t.getParameter(n.UNPACK_SKIP_PIXELS),pe=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,b.width);for(let D=0,ie=de.length;D<ie;D++){let K=de[D],me=Math.floor(K.start/4),he=Math.ceil(K.count/4),fe=me%b.width,De=Math.floor(me/b.width),Je=he,ae=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,fe),t.pixelStorei(n.UNPACK_SKIP_ROWS,De),t.texSubImage2D(n.TEXTURE_2D,0,fe,De,Je,ae,q,oe,b.data)}C.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,ee),t.pixelStorei(n.UNPACK_SKIP_PIXELS,ne),t.pixelStorei(n.UNPACK_SKIP_ROWS,pe)}}function Nt(C,b,q){let oe=n.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(oe=n.TEXTURE_2D_ARRAY),b.isData3DTexture&&(oe=n.TEXTURE_3D);let se=dt(C,b),de=b.source;t.bindTexture(oe,C.__webglTexture,n.TEXTURE0+q);let xe=i.get(de);if(de.version!==xe.__version||se===!0){if(t.activeTexture(n.TEXTURE0+q),(typeof ImageBitmap<"u"&&b.image instanceof ImageBitmap)===!1){let ae=et.getPrimaries(et.workingColorSpace),Ue=b.colorSpace===xi?null:et.getPrimaries(b.colorSpace),Ze=b.colorSpace===xi||ae===Ue?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ze)}t.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment);let ne=v(b.image,!1,s.maxTextureSize);ne=ke(b,ne);let pe=r.convert(b.format,b.colorSpace),D=r.convert(b.type),ie=A(b.internalFormat,pe,D,b.normalized,b.colorSpace,b.isVideoTexture);ht(oe,b);let K,me=b.mipmaps,he=b.isVideoTexture!==!0,fe=xe.__version===void 0||se===!0,De=de.dataReady,Je=T(b,ne);if(b.isDepthTexture)ie=_(b.format===gi,b.type),fe&&(he?t.texStorage2D(n.TEXTURE_2D,1,ie,ne.width,ne.height):t.texImage2D(n.TEXTURE_2D,0,ie,ne.width,ne.height,0,pe,D,null));else if(b.isDataTexture)if(me.length>0){he&&fe&&t.texStorage2D(n.TEXTURE_2D,Je,ie,me[0].width,me[0].height);for(let ae=0,Ue=me.length;ae<Ue;ae++)K=me[ae],he?De&&t.texSubImage2D(n.TEXTURE_2D,ae,0,0,K.width,K.height,pe,D,K.data):t.texImage2D(n.TEXTURE_2D,ae,ie,K.width,K.height,0,pe,D,K.data);b.generateMipmaps=!1}else he?(fe&&t.texStorage2D(n.TEXTURE_2D,Je,ie,ne.width,ne.height),De&&Wt(b,ne,pe,D)):t.texImage2D(n.TEXTURE_2D,0,ie,ne.width,ne.height,0,pe,D,ne.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){he&&fe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Je,ie,me[0].width,me[0].height,ne.depth);for(let ae=0,Ue=me.length;ae<Ue;ae++)if(K=me[ae],b.format!==Fn)if(pe!==null)if(he){if(De)if(b.layerUpdates.size>0){let Ze=lh(K.width,K.height,b.format,b.type);for(let be of b.layerUpdates){let ut=K.data.subarray(be*Ze/K.data.BYTES_PER_ELEMENT,(be+1)*Ze/K.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ae,0,0,be,K.width,K.height,1,pe,ut)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ae,0,0,0,K.width,K.height,ne.depth,pe,K.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ae,ie,K.width,K.height,ne.depth,0,K.data,0,0);else Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else he?De&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ae,0,0,0,K.width,K.height,ne.depth,pe,D,K.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ae,ie,K.width,K.height,ne.depth,0,pe,D,K.data);b.layerUpdates.size>0&&b.clearLayerUpdates()}else{he&&fe&&t.texStorage2D(n.TEXTURE_2D,Je,ie,me[0].width,me[0].height);for(let ae=0,Ue=me.length;ae<Ue;ae++)K=me[ae],b.format!==Fn?pe!==null?he?De&&t.compressedTexSubImage2D(n.TEXTURE_2D,ae,0,0,K.width,K.height,pe,K.data):t.compressedTexImage2D(n.TEXTURE_2D,ae,ie,K.width,K.height,0,K.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):he?De&&t.texSubImage2D(n.TEXTURE_2D,ae,0,0,K.width,K.height,pe,D,K.data):t.texImage2D(n.TEXTURE_2D,ae,ie,K.width,K.height,0,pe,D,K.data)}else if(b.isDataArrayTexture)if(he){if(fe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Je,ie,ne.width,ne.height,ne.depth),De)if(b.layerUpdates.size>0){let ae=lh(ne.width,ne.height,b.format,b.type);for(let Ue of b.layerUpdates){let Ze=ne.data.subarray(Ue*ae/ne.data.BYTES_PER_ELEMENT,(Ue+1)*ae/ne.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Ue,ne.width,ne.height,1,pe,D,Ze)}b.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,pe,D,ne.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,ie,ne.width,ne.height,ne.depth,0,pe,D,ne.data);else if(b.isData3DTexture)he?(fe&&t.texStorage3D(n.TEXTURE_3D,Je,ie,ne.width,ne.height,ne.depth),De&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,pe,D,ne.data)):t.texImage3D(n.TEXTURE_3D,0,ie,ne.width,ne.height,ne.depth,0,pe,D,ne.data);else if(b.isFramebufferTexture){if(fe)if(he)t.texStorage2D(n.TEXTURE_2D,Je,ie,ne.width,ne.height);else{let ae=ne.width,Ue=ne.height;for(let Ze=0;Ze<Je;Ze++)t.texImage2D(n.TEXTURE_2D,Ze,ie,ae,Ue,0,pe,D,null),ae>>=1,Ue>>=1}}else if(b.isHTMLTexture){if("texElementImage2D"in n){let ae=n.canvas;if(ae.hasAttribute("layoutsubtree")||ae.setAttribute("layoutsubtree","true"),ne.parentNode!==ae){ae.appendChild(ne),f.add(b),ae.onpaint=Ue=>{let Ze=Ue.changedElements;for(let be of f)Ze.includes(be.image)&&(be.needsUpdate=!0)},ae.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,ne);else{let Ze=n.RGBA,be=n.RGBA,ut=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Ze,be,ut,ne)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(me.length>0){if(he&&fe){let ae=Xe(me[0]);t.texStorage2D(n.TEXTURE_2D,Je,ie,ae.width,ae.height)}for(let ae=0,Ue=me.length;ae<Ue;ae++)K=me[ae],he?De&&t.texSubImage2D(n.TEXTURE_2D,ae,0,0,pe,D,K):t.texImage2D(n.TEXTURE_2D,ae,ie,pe,D,K);b.generateMipmaps=!1}else if(he){if(fe){let ae=Xe(ne);t.texStorage2D(n.TEXTURE_2D,Je,ie,ae.width,ae.height)}De&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,pe,D,ne)}else t.texImage2D(n.TEXTURE_2D,0,ie,pe,D,ne);E(b)&&b.mipmapsAutoUpdate===!0&&M(oe),xe.__version=de.version,b.onUpdate&&b.onUpdate(b)}C.__version=b.version}function cn(C,b,q){if(b.image.length!==6)return;let oe=dt(C,b),se=b.source;t.bindTexture(n.TEXTURE_CUBE_MAP,C.__webglTexture,n.TEXTURE0+q);let de=i.get(se);if(se.version!==de.__version||oe===!0){t.activeTexture(n.TEXTURE0+q);let xe=et.getPrimaries(et.workingColorSpace),ee=b.colorSpace===xi?null:et.getPrimaries(b.colorSpace),ne=b.colorSpace===xi||xe===ee?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ne);let pe=b.isCompressedTexture||b.image[0].isCompressedTexture,D=b.image[0]&&b.image[0].isDataTexture,ie=[];for(let be=0;be<6;be++)!pe&&!D?ie[be]=v(b.image[be],!0,s.maxCubemapSize):ie[be]=D?b.image[be].image:b.image[be],ie[be]=ke(b,ie[be]);let K=ie[0],me=r.convert(b.format,b.colorSpace),he=r.convert(b.type),fe=A(b.internalFormat,me,he,b.normalized,b.colorSpace),De=b.isVideoTexture!==!0,Je=de.__version===void 0||oe===!0,ae=se.dataReady,Ue=T(b,K);ht(n.TEXTURE_CUBE_MAP,b);let Ze;if(b.isDepthTexture){if(fe=_(b.format===gi,b.type),Je)if(De)t.texStorage2D(n.TEXTURE_CUBE_MAP,1,fe,K.width,K.height);else for(let be=0;be<6;be++)t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,fe,K.width,K.height,0,me,he,null)}else if(pe){De&&Je&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Ue,fe,K.width,K.height);for(let be=0;be<6;be++){Ze=ie[be].mipmaps;for(let ut=0;ut<Ze.length;ut++){let Bt=Ze[ut];b.format!==Fn?me!==null?De?ae&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,ut,0,0,Bt.width,Bt.height,me,Bt.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,ut,fe,Bt.width,Bt.height,0,Bt.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):De?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,ut,0,0,Bt.width,Bt.height,me,he,Bt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,ut,fe,Bt.width,Bt.height,0,me,he,Bt.data)}}}else{if(Ze=b.mipmaps,De&&Je){Ze.length>0&&Ue++;let be=Xe(ie[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Ue,fe,be.width,be.height)}for(let be=0;be<6;be++)if(D){De?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,0,0,ie[be].width,ie[be].height,me,he,ie[be].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,fe,ie[be].width,ie[be].height,0,me,he,ie[be].data);for(let ut=0;ut<Ze.length;ut++){let Si=Ze[ut].image[be].image;De?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,ut+1,0,0,Si.width,Si.height,me,he,Si.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,ut+1,fe,Si.width,Si.height,0,me,he,Si.data)}}else{De?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,0,0,me,he,ie[be]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,fe,me,he,ie[be]);for(let ut=0;ut<Ze.length;ut++){let Bt=Ze[ut];De?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,ut+1,0,0,me,he,Bt.image[be]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+be,ut+1,fe,me,he,Bt.image[be])}}}E(b)&&b.mipmapsAutoUpdate===!0&&M(n.TEXTURE_CUBE_MAP),de.__version=se.version,b.onUpdate&&b.onUpdate(b)}C.__version=b.version}function Mt(C,b,q,oe,se,de){let xe=r.convert(q.format,q.colorSpace),ee=r.convert(q.type),ne=A(q.internalFormat,xe,ee,q.normalized,q.colorSpace),pe=i.get(b),D=i.get(q);if(D.__renderTarget=b,!pe.__hasExternalTextures){let ie=Math.max(1,b.width>>de),K=Math.max(1,b.height>>de);se===n.TEXTURE_3D||se===n.TEXTURE_2D_ARRAY?t.texImage3D(se,de,ne,ie,K,b.depth,0,xe,ee,null):t.texImage2D(se,de,ne,ie,K,0,xe,ee,null)}t.bindFramebuffer(n.FRAMEBUFFER,C),ye(b)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,oe,se,D.__webglTexture,0,yt(b)):(se===n.TEXTURE_2D||se>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&se<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,oe,se,D.__webglTexture,de),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Vn(C,b,q){if(n.bindRenderbuffer(n.RENDERBUFFER,C),b.depthBuffer){let oe=b.depthTexture,se=oe&&oe.isDepthTexture?oe.type:null,de=_(b.stencilBuffer,se),xe=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;ye(b)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,yt(b),de,b.width,b.height):q?n.renderbufferStorageMultisample(n.RENDERBUFFER,yt(b),de,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,de,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,xe,n.RENDERBUFFER,C)}else{let oe=b.textures;for(let se=0;se<oe.length;se++){let de=oe[se],xe=r.convert(de.format,de.colorSpace),ee=r.convert(de.type),ne=A(de.internalFormat,xe,ee,de.normalized,de.colorSpace);ye(b)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,yt(b),ne,b.width,b.height):q?n.renderbufferStorageMultisample(n.RENDERBUFFER,yt(b),ne,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,ne,b.width,b.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ft(C,b,q){let oe=b.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,C),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let se=i.get(b.depthTexture);se.__renderTarget=b;let de=oe?b.depthTexture.image[0]:b.depthTexture.image;(!se.__webglTexture||de.width!==b.width||de.height!==b.height)&&(de.width=b.width,de.height=b.height,b.depthTexture.needsUpdate=!0),oe?ue(b.depthTexture,0):le(b.depthTexture,0);let xe=se.__webglTexture,ee=yt(b),ne=oe?n.TEXTURE_CUBE_MAP_POSITIVE_X+q:n.TEXTURE_2D,pe=b.depthTexture.format===gi?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(b.depthTexture.format===hi)ye(b)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,pe,ne,xe,0,ee):n.framebufferTexture2D(n.FRAMEBUFFER,pe,ne,xe,0);else if(b.depthTexture.format===gi)ye(b)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,pe,ne,xe,0,ee):n.framebufferTexture2D(n.FRAMEBUFFER,pe,ne,xe,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function _n(C){let b=i.get(C),q=C.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==C.depthTexture){let oe=C.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),oe){let se=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,oe.removeEventListener("dispose",se)};oe.addEventListener("dispose",se),b.__depthDisposeCallback=se}b.__boundDepthTexture=oe}if(C.depthTexture&&!b.__autoAllocateDepthBuffer)if(q)for(let oe=0;oe<6;oe++)Ft(b.__webglFramebuffer[oe],C,oe);else C.texture.mipmaps.length>0?Ft(b.__webglFramebuffer[0],C,0):Ft(b.__webglFramebuffer,C,0);else if(q){b.__webglDepthbuffer=[];for(let oe=0;oe<6;oe++)if(t.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[oe]),b.__webglDepthbuffer[oe]===void 0)b.__webglDepthbuffer[oe]=n.createRenderbuffer(),Vn(b.__webglDepthbuffer[oe],C,!1);else{let se=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,de=b.__webglDepthbuffer[oe];n.bindRenderbuffer(n.RENDERBUFFER,de),n.framebufferRenderbuffer(n.FRAMEBUFFER,se,n.RENDERBUFFER,de)}}else if(C.texture.mipmaps.length>0?t.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=n.createRenderbuffer(),Vn(b.__webglDepthbuffer,C,!1);else{let se=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,de=b.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,de),n.framebufferRenderbuffer(n.FRAMEBUFFER,se,n.RENDERBUFFER,de)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function yn(C,b,q){let oe=i.get(C);b!==void 0&&Mt(oe.__webglFramebuffer,C,C.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),q!==void 0&&_n(C)}function vn(C){let b=C.texture,q=i.get(C),oe=i.get(b);C.addEventListener("dispose",V),k(C);let se=C.textures,de=C.isWebGLCubeRenderTarget===!0,xe=se.length>1;if(xe||(oe.__webglTexture===void 0&&(oe.__webglTexture=n.createTexture()),oe.__version=b.version,o.memory.textures++),de){q.__webglFramebuffer=[];for(let ee=0;ee<6;ee++)if(b.mipmaps.length>0){q.__webglFramebuffer[ee]=[];for(let ne=0;ne<b.mipmaps.length;ne++)q.__webglFramebuffer[ee][ne]=n.createFramebuffer()}else q.__webglFramebuffer[ee]=n.createFramebuffer()}else{if(b.mipmaps.length>0){q.__webglFramebuffer=[];for(let ee=0;ee<b.mipmaps.length;ee++)q.__webglFramebuffer[ee]=n.createFramebuffer()}else q.__webglFramebuffer=n.createFramebuffer();if(xe)for(let ee=0,ne=se.length;ee<ne;ee++){let pe=i.get(se[ee]);pe.__webglTexture===void 0&&(pe.__webglTexture=n.createTexture(),o.memory.textures++)}if(C.samples>0&&ye(C)===!1){q.__webglMultisampledFramebuffer=n.createFramebuffer(),q.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let ee=0;ee<se.length;ee++){let ne=se[ee];q.__webglColorRenderbuffer[ee]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,q.__webglColorRenderbuffer[ee]);let pe=r.convert(ne.format,ne.colorSpace),D=r.convert(ne.type),ie=A(ne.internalFormat,pe,D,ne.normalized,ne.colorSpace,C.isXRRenderTarget===!0),K=yt(C);n.renderbufferStorageMultisample(n.RENDERBUFFER,K,ie,C.width,C.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ee,n.RENDERBUFFER,q.__webglColorRenderbuffer[ee])}n.bindRenderbuffer(n.RENDERBUFFER,null),C.depthBuffer&&(q.__webglDepthRenderbuffer=n.createRenderbuffer(),Vn(q.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(de){t.bindTexture(n.TEXTURE_CUBE_MAP,oe.__webglTexture),ht(n.TEXTURE_CUBE_MAP,b);for(let ee=0;ee<6;ee++)if(b.mipmaps.length>0)for(let ne=0;ne<b.mipmaps.length;ne++)Mt(q.__webglFramebuffer[ee][ne],C,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ne);else Mt(q.__webglFramebuffer[ee],C,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0);E(b)?M(n.TEXTURE_CUBE_MAP):b.mipmaps.length>0&&n.texParameteri(n.TEXTURE_CUBE_MAP,n.TEXTURE_MAX_LEVEL,b.mipmaps.length-1),t.unbindTexture()}else if(xe){for(let ee=0,ne=se.length;ee<ne;ee++){let pe=se[ee],D=i.get(pe),ie=n.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ie=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ie,D.__webglTexture),ht(ie,pe),Mt(q.__webglFramebuffer,C,pe,n.COLOR_ATTACHMENT0+ee,ie,0),E(pe)&&M(ie)}t.unbindTexture()}else{let ee=n.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ee=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ee,oe.__webglTexture),ht(ee,b),b.mipmaps.length>0)for(let ne=0;ne<b.mipmaps.length;ne++)Mt(q.__webglFramebuffer[ne],C,b,n.COLOR_ATTACHMENT0,ee,ne);else Mt(q.__webglFramebuffer,C,b,n.COLOR_ATTACHMENT0,ee,0);E(b)?M(ee):b.mipmaps.length>0&&n.texParameteri(ee,n.TEXTURE_MAX_LEVEL,b.mipmaps.length-1),t.unbindTexture()}C.depthBuffer&&_n(C)}function z(C){let b=C.textures;for(let q=0,oe=b.length;q<oe;q++){let se=b[q];if(E(se)&&se.mipmapsAutoUpdate===!0){let de=w(C),xe=i.get(se).__webglTexture;t.bindTexture(de,xe),M(de),t.unbindTexture()}}}let bn=[];function _t(C){if(C.samples>0){if(ye(C)===!1){let b=C.textures,q=C.width,oe=C.height,se=n.COLOR_BUFFER_BIT,de=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,xe=i.get(C),ee=b.length>1;if(ee)for(let pe=0;pe<b.length;pe++)t.bindFramebuffer(n.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,xe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,xe.__webglMultisampledFramebuffer),C.texture.mipmaps.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,xe.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,xe.__webglFramebuffer);for(let pe=0;pe<b.length;pe++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(se|=n.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(se|=n.STENCIL_BUFFER_BIT)),ee){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,xe.__webglColorRenderbuffer[pe]);let D=i.get(b[pe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,D,0)}n.blitFramebuffer(0,0,q,oe,0,0,q,oe,se,n.NEAREST),c===!0&&(bn.length=0,bn.push(n.COLOR_ATTACHMENT0+pe),C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&bn.push(de),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,bn))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ee)for(let pe=0;pe<b.length;pe++){t.bindFramebuffer(n.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.RENDERBUFFER,xe.__webglColorRenderbuffer[pe]);let D=i.get(b[pe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,xe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.TEXTURE_2D,D,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,xe.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&c){let b=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[b])}}}function yt(C){return Math.min(s.maxSamples,C.samples)}function ye(C){let b=i.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function Ut(C){let b=o.render.frame;u.get(C)!==b&&(u.set(C,b),C.update())}function ke(C,b){let q=C.colorSpace,oe=C.format,se=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||q!==gr&&q!==xi&&(et.getTransfer(q)===lt?(oe!==Fn||se!==un)&&Fe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Be("WebGLTextures: Unsupported texture color space:",q)),b}function Xe(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=Ae,this.resetTextureUnits=G,this.getTextureUnits=te,this.setTextureUnits=ce,this.setTexture2D=le,this.setTexture2DArray=ve,this.setTexture3D=Ee,this.setTextureCube=ue,this.rebindTextures=yn,this.setupRenderTarget=vn,this.updateRenderTargetMipmap=z,this.updateMultisampleRenderTarget=_t,this.setupDepthRenderbuffer=_n,this.setupFrameBufferTexture=Mt,this.useMultisampledRTT=ye,this.dispose=$}function Jy(n,e){function t(i,s=xi){let r,o=et.getTransfer(s);if(i===un)return n.UNSIGNED_BYTE;if(i===La)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Da)return n.UNSIGNED_SHORT_5_5_5_1;if(i===$l)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===jl)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Zl)return n.BYTE;if(i===Jl)return n.SHORT;if(i===qs)return n.UNSIGNED_SHORT;if(i===Ia)return n.INT;if(i===Un)return n.UNSIGNED_INT;if(i===kn)return n.FLOAT;if(i===On)return n.HALF_FLOAT;if(i===Kl)return n.ALPHA;if(i===Ql)return n.RGB;if(i===Fn)return n.RGBA;if(i===hi)return n.DEPTH_COMPONENT;if(i===gi)return n.DEPTH_STENCIL;if(i===eh)return n.RED;if(i===Na)return n.RED_INTEGER;if(i===Bi)return n.RG;if(i===Ua)return n.RG_INTEGER;if(i===ka)return n.RGBA_INTEGER;if(i===Hr||i===Vr||i===Wr||i===Xr)if(o===lt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Hr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Vr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Wr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Xr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Hr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Vr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Wr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Xr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Oa||i===Fa||i===Ba||i===za)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Oa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Fa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ba)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===za)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ga||i===Ha||i===Va||i===Wa||i===Xa||i===qr||i===qa)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Ga||i===Ha)return o===lt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Va)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Wa)return r.COMPRESSED_R11_EAC;if(i===Xa)return r.COMPRESSED_SIGNED_R11_EAC;if(i===qr)return r.COMPRESSED_RG11_EAC;if(i===qa)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Ya||i===Za||i===Ja||i===$a||i===ja||i===Ka||i===Qa||i===ec||i===tc||i===nc||i===ic||i===sc||i===rc||i===oc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Ya)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Za)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ja)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===$a)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===ja)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ka)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Qa)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===ec)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===tc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===nc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ic)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===sc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===rc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===oc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ac||i===cc||i===lc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===ac)return o===lt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===cc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===lc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===hc||i===uc||i===Yr||i===dc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===hc)return r.COMPRESSED_RED_RGTC1_EXT;if(i===uc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Yr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===dc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ts?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var $y=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,jy=`
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

}`,Mh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new Ir(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new Jn({vertexShader:$y,fragmentShader:jy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new tt(new Li(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Th=class extends qn{constructor(e,t){super();let i=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,f=null,d=null,g=null,x=null,y=typeof XRWebGLBinding<"u",p=new Mh,m={},v=t.getContextAttributes(),E=null,M=null,w=[],A=[],_=new ze,T=null,k=null,I=new qt;I.viewport=new vt;let B=new qt;B.viewport=new vt;let V=[I,B],Z=new Ea,N=null,$=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let le=w[j];return le===void 0&&(le=new ks,w[j]=le),le.getTargetRaySpace()},this.getControllerGrip=function(j){let le=w[j];return le===void 0&&(le=new ks,w[j]=le),le.getGripSpace()},this.getHand=function(j){let le=w[j];return le===void 0&&(le=new ks,w[j]=le),le.getHandSpace()};function R(j){let le=A.indexOf(j.inputSource);if(le===-1)return;let ve=w[le];ve!==void 0&&(ve.update(j.inputSource,j.frame,l||o),ve.dispatchEvent({type:j.type,data:j.inputSource}))}function P(){s.removeEventListener("select",R),s.removeEventListener("selectstart",R),s.removeEventListener("selectend",R),s.removeEventListener("squeeze",R),s.removeEventListener("squeezestart",R),s.removeEventListener("squeezeend",R),s.removeEventListener("end",P),s.removeEventListener("inputsourceschange",U);for(let j=0;j<w.length;j++){let le=A[j];le!==null&&(A[j]=null,w[j].disconnect(le))}N=null,$=null,p.reset();for(let j in m)delete m[j];if(e.setRenderTarget(E),g=null,d=null,f=null,s=null,M=null,Ae.stop(),i.isPresenting=!1,e.setPixelRatio(T),e.setSize(_.width,_.height,!1),k!==null){let j=k.camera;j.fov=k.fov,j.zoom=k.zoom,j.updateProjectionMatrix(),k=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,i.isPresenting===!0&&Fe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,i.isPresenting===!0&&Fe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(j){l=j},this.getBaseLayer=function(){return d!==null?d:g},this.getBinding=function(){return f===null&&y&&(f=new XRWebGLBinding(s,t)),f},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(E=e.getRenderTarget(),s.addEventListener("select",R),s.addEventListener("selectstart",R),s.addEventListener("selectend",R),s.addEventListener("squeeze",R),s.addEventListener("squeezestart",R),s.addEventListener("squeezeend",R),s.addEventListener("end",P),s.addEventListener("inputsourceschange",U),v.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(_),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let ve=null,Ee=null,ue=null;v.depth&&(ue=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ve=v.stencil?gi:hi,Ee=v.stencil?ts:Un);let Ge={colorFormat:t.RGBA8,depthFormat:ue,scaleFactor:r};f=this.getBinding(),d=f.createProjectionLayer(Ge),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),M=new mn(d.textureWidth,d.textureHeight,{format:Fn,type:un,depthTexture:new fi(d.textureWidth,d.textureHeight,Ee,void 0,void 0,void 0,void 0,void 0,void 0,ve),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let ve={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};g=new XRWebGLLayer(s,t,ve),s.updateRenderState({baseLayer:g}),e.setPixelRatio(1),e.setSize(g.framebufferWidth,g.framebufferHeight,!1),M=new mn(g.framebufferWidth,g.framebufferHeight,{format:Fn,type:un,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1,storeMultisampledDepthBuffer:g.ignoreDepthValues===!1,storeMultisampledStencilBuffer:g.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Ae.setContext(s),Ae.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function U(j){for(let le=0;le<j.removed.length;le++){let ve=j.removed[le],Ee=A.indexOf(ve);Ee>=0&&(A[Ee]=null,w[Ee].disconnect(ve))}for(let le=0;le<j.added.length;le++){let ve=j.added[le],Ee=A.indexOf(ve);if(Ee===-1){for(let Ge=0;Ge<w.length;Ge++)if(Ge>=A.length){A.push(ve),Ee=Ge;break}else if(A[Ge]===null){A[Ge]=ve,Ee=Ge;break}if(Ee===-1)break}let ue=w[Ee];ue&&ue.connect(ve)}}function F(j,le){le===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(le.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let le=j.near,ve=j.far;p.texture!==null&&(p.depthNear>0&&(le=p.depthNear),p.depthFar>0&&(ve=p.depthFar)),Z.near=B.near=I.near=le,Z.far=B.far=I.far=ve,(N!==Z.near||$!==Z.far)&&(s.updateRenderState({depthNear:Z.near,depthFar:Z.far}),N=Z.near,$=Z.far),Z.layers.mask=j.layers.mask|6,I.layers.mask=Z.layers.mask&-5,B.layers.mask=Z.layers.mask&-3;let Ee=j.parent,ue=Z.cameras;F(Z,Ee);for(let Ge=0;Ge<ue.length;Ge++)F(ue[Ge],Ee);Z.projectionMatrix.copy(I.projectionMatrix),Z.projectionMatrixInverse.copy(I.projectionMatrixInverse),k===null&&j.isPerspectiveCamera&&(k={camera:j,fov:j.fov,zoom:j.zoom}),G(j,Z,Ee)};function G(j,le,ve){ve===null?j.matrix.copy(le.matrixWorld):(j.matrix.copy(ve.matrixWorld),j.matrix.invert(),j.matrix.multiply(le.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(le.projectionMatrix),j.projectionMatrixInverse.copy(le.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=vr*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return Z},this.getFoveation=function(){if(!(d===null&&g===null))return c},this.setFoveation=function(j){c=j,d!==null&&(d.fixedFoveation=j),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=j)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(Z)},this.getCameraTexture=function(j){return m[j]};let te=null;function ce(j,le){if(u=le.getViewerPose(l||o),x=le,u!==null){let ve=u.views;g!==null&&(e.setRenderTargetFramebuffer(M,g.framebuffer),e.setRenderTarget(M));let Ee=!1;ve.length!==Z.cameras.length&&(Z.cameras.length=0,Ee=!0);for(let Oe=0;Oe<ve.length;Oe++){let ht=ve[Oe],dt=null;if(g!==null)dt=g.getViewport(ht);else{let Wt=f.getViewSubImage(d,ht);dt=Wt.viewport,Oe===0&&(e.setRenderTargetTextures(M,Wt.colorTexture,Wt.depthStencilTexture),e.setRenderTarget(M))}let je=V[Oe];je===void 0&&(je=new qt,je.layers.enable(Oe),je.viewport=new vt,V[Oe]=je),je.matrix.fromArray(ht.transform.matrix),je.matrix.decompose(je.position,je.quaternion,je.scale),je.projectionMatrix.fromArray(ht.projectionMatrix),je.projectionMatrixInverse.copy(je.projectionMatrix).invert(),je.viewport.set(dt.x,dt.y,dt.width,dt.height),Oe===0&&(Z.matrix.copy(je.matrix),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale)),Ee===!0&&Z.cameras.push(je)}let ue=s.enabledFeatures;if(ue&&ue.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&y){f=i.getBinding();let Oe=f.getDepthInformation(ve[0]);Oe&&Oe.isValid&&Oe.texture&&p.init(Oe,s.renderState)}if(ue&&ue.includes("camera-access")&&y){e.state.unbindTexture(),f=i.getBinding();for(let Oe=0;Oe<ve.length;Oe++){let ht=ve[Oe].camera;if(ht){let dt=m[ht];dt||(dt=new Ir,m[ht]=dt);let je=f.getCameraImage(ht);dt.sourceTexture=je}}}}for(let ve=0;ve<w.length;ve++){let Ee=A[ve],ue=w[ve];Ee!==null&&ue!==void 0&&ue.update(Ee,le,l||o)}te&&te(j,le),le.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:le}),x=null}let Ae=new Kf;Ae.setAnimationLoop(ce),this.setAnimationLoop=function(j){te=j},this.dispose=function(){}}},Ky=new gt,cp=new He;cp.set(-1,0,0,0,1,0,0,0,1);function Qy(n,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function i(p,m){m.color.getRGB(p.fogColor.value,oh(n)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function s(p,m,v,E,M){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(p,m):m.isMeshLambertMaterial?(r(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(p,m),f(p,m)):m.isMeshPhongMaterial?(r(p,m),u(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(p,m),d(p,m),m.isMeshPhysicalMaterial&&g(p,m,M)):m.isMeshMatcapMaterial?(r(p,m),x(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),y(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(o(p,m),m.isLineDashedMaterial&&a(p,m)):m.isPointsMaterial?c(p,m,v,E):m.isSpriteMaterial?l(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===on&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===on&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);let v=e.get(m),E=v.envMap,M=v.envMapRotation;E&&(p.envMap.value=E,p.envMapRotation.value.setFromMatrix4(Ky.makeRotationFromEuler(M)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(cp),p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function a(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function c(p,m,v,E){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*v,p.scale.value=E*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function l(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function u(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function f(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function d(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function g(p,m,v){p.ior.value=m.ior,m.diffuseRoughness>0&&(p.diffuseRoughness.value=m.diffuseRoughness,m.diffuseRoughnessMap&&(p.diffuseRoughnessMap.value=m.diffuseRoughnessMap,t(m.diffuseRoughnessMap,p.diffuseRoughnessMapTransform))),m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===on&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.retroreflectivity>0&&(p.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessMinimum,p.iridescenceThicknessMaximum.value=m.iridescenceThicknessMaximum,m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=v.texture,p.transmissionSamplerSize.value.set(v.width,v.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function x(p,m){m.matcap&&(p.matcap.value=m.matcap)}function y(p,m){let v=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(v.matrixWorld),p.nearDistance.value=v.shadow.camera.near,p.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function ev(n,e,t,i){let s={},r={};function o(v,E){let M=E.program;i.uniformBlockBinding(v,M,s[v.id])}function a(v,E){let M=s[v.id];M===void 0&&(x(v),M=c(v),s[v.id]=M,v.addEventListener("dispose",p));let w=E.program;i.updateUBOMapping(v,w);let A=e.render.frame;r[v.id]!==A&&(l(v),r[v.id]=A)}function c(v){let E=n.createBuffer(),M=v.__size,w=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,M,w),n.bindBuffer(n.UNIFORM_BUFFER,null),E}function l(v){let E=s[v.id],M=v.uniforms,w=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,E);for(let A=0,_=M.length;A<_;A++){let T=M[A];if(Array.isArray(T))for(let k=0,I=T.length;k<I;k++)u(T[k],A,k,w);else u(T,A,0,w)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function u(v,E,M,w){if(d(v,E,M,w)===!0){let A=v.__offset,_=v.value;if(Array.isArray(_)){let T=0;for(let k=0;k<_.length;k++){let I=_[k],B=y(I,!0);f(I,v.__data,T),T+=B.storage/Float32Array.BYTES_PER_ELEMENT}}else f(_,v.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,A,v.__data)}}function f(v,E,M){typeof v=="number"||typeof v=="boolean"?E[M]=v:v.isMatrix3?(E[M]=v.elements[0],E[M+1]=v.elements[1],E[M+2]=v.elements[2],E[M+3]=0,E[M+4]=v.elements[3],E[M+5]=v.elements[4],E[M+6]=v.elements[5],E[M+7]=0,E[M+8]=v.elements[6],E[M+9]=v.elements[7],E[M+10]=v.elements[8],E[M+11]=0):ArrayBuffer.isView(v)?E.set(v.subarray(0,E.length-M),M):v.toArray(E,M)}function d(v,E,M,w){let A=v.value,_=E+"_"+M;if(Array.isArray(A)){w[_]===void 0&&(w[_]=[]);let T=w[_],k=!1;for(let I=0;I<A.length;I++)g(A[I],T,I)===!0&&(k=!0);return k}return g(A,w,_)}function g(v,E,M){if(E[M]===void 0)return typeof v=="number"||typeof v=="boolean"?E[M]=v:ArrayBuffer.isView(v)?E[M]=v.slice():E[M]=v.clone(),!0;{let w=E[M];if(typeof v=="number"||typeof v=="boolean"){if(w!==v)return E[M]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(w.equals(v)===!1)return w.copy(v),!0}}return!1}function x(v){let E=v.uniforms,M=0,w=16;for(let _=0,T=E.length;_<T;_++){let k=Array.isArray(E[_])?E[_]:[E[_]];for(let I=0,B=k.length;I<B;I++){let V=k[I],Z=Array.isArray(V.value)?V.value:[V.value],N=Array.isArray(E[_])||Array.isArray(V.value),$=M;for(let P=0,U=Z.length;P<U;P++){let F=Z[P],G=y(F,N),te=M%w,ce=te%G.boundary,Ae=te+ce;M+=ce,Ae!==0&&w-Ae<G.storage&&(M+=w-Ae),P===0&&($=M),M+=G.storage}let R=V.type==="int"?Int32Array:V.type==="uint"?Uint32Array:Float32Array;V.__data=new R((M-$)/Float32Array.BYTES_PER_ELEMENT),V.__offset=$}}let A=M%w;return A>0&&(M+=w-A),v.__size=M,v.__cache={},this}function y(v,E){let M={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(M.boundary=4,M.storage=4):v.isVector2?(M.boundary=8,M.storage=8):v.isVector3||v.isColor?(M.boundary=16,M.storage=12):v.isVector4?(M.boundary=16,M.storage=16):v.isMatrix3?(M.boundary=16,M.storage=48):v.isMatrix4?(M.boundary=16,M.storage=64):v.isTexture?Fe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(M.boundary=16,M.storage=v.byteLength):Fe("WebGLRenderer: Unsupported uniform value type.",v),E===!0&&(M.boundary=16,M.storage=Math.ceil(M.storage/16)*16),M}function p(v){let E=v.target;E.removeEventListener("dispose",p),n.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function m(){for(let v in s)n.deleteBuffer(s[v]);s={},r={}}return{bind:o,update:a,dispose:m}}var tv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),jn=null;function nv(){return jn===null&&(jn=new la(tv,16,16,Bi,On),jn.name="DFG_LUT",jn.minFilter=nn,jn.magFilter=nn,jn.wrapS=Xn,jn.wrapT=Xn,jn.generateMipmaps=!1,jn.needsUpdate=!0),jn}var _c=class{constructor(e={}){let{canvas:t=yf(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:d=!1,outputBufferType:g=un}=e;this.isWebGLRenderer=!0;let x;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=i.getContextAttributes().alpha}else x=o;let y=g,p=new Set([ka,Ua,Na]),m=new Set([un,Un,qs,ts,La,Da]),v=new Uint32Array(4),E=new Int32Array(4),M={textures:[],min:[],max:[],resolution:[]},w=null,A=null,_=[],T=[],k=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=$n,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,B=!1,V=null,Z=null,N=null,$=null;this._outputColorSpace=wt;let R=0,P=0,U=null,F=-1,G=null,te=new vt,ce=new vt,Ae=null,j=new Ye(0),le=0,ve=t.width,Ee=t.height,ue=1,Ge=null,ct=null,Oe=new vt(0,0,ve,Ee),ht=new vt(0,0,ve,Ee),dt=!1,je=new Ii,Wt=new ha,Nt=!1,cn=!1,Mt=new gt,Vn=new W,Ft=new vt,_n={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},yn=!1;function vn(){return U===null?ue:1}let z=i;function bn(S,O){return t.getContext(S,O)}let _t,yt,ye,Ut,ke,Xe,C,b,q,oe,se,de,xe,ee,ne,pe,D,ie,K,me,he,fe,De;try{let S={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"187"}`),t.addEventListener("webglcontextlost",Ue,!1),t.addEventListener("webglcontextrestored",Ze,!1),t.addEventListener("webglcontextcreationerror",be,!1),z===null){let O="webgl2";if(z=bn(O,S),z===null)throw bn(O)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Je()}catch(S){throw t.removeEventListener("webglcontextlost",Ue,!1),t.removeEventListener("webglcontextrestored",Ze,!1),t.removeEventListener("webglcontextcreationerror",be,!1),Be("WebGLRenderer: "+S.message),S}function Je(){_t=new f_(z),_t.init(),he=new Jy(z,_t),yt=new n_(z,_t,e,he),ye=new Yy(z,_t),yt.reversedDepthBuffer&&d&&ye.buffers.depth.setReversed(!0),Z=z.createFramebuffer(),N=z.createFramebuffer(),$=z.createFramebuffer(),Ut=new g_(z),ke=new Dy,Xe=new Zy(z,_t,ye,ke,yt,he,Ut),C=new d_(I),b=new _0(z),fe=new e_(z,b),q=new p_(z,b,Ut,fe),oe=new __(z,q,b,fe,Ut),ie=new x_(z,yt,Xe),ne=new i_(ke),se=new Ly(I,C,_t,yt,fe,ne),de=new Qy(I,ke),xe=new Uy,ee=new Gy(_t),D=new Qx(I,C,ye,oe,x,c),pe=new qy(I,oe,yt),De=new ev(z,Ut,yt,ye),K=new t_(z,_t,Ut),me=new m_(z,_t,Ut),Ut.programs=se.programs,I.capabilities=yt,I.extensions=_t,I.properties=ke,I.renderLists=xe,I.shadowMap=pe,I.state=ye,I.info=Ut}y!==un&&(k=new v_(y,t.width,t.height,a,s,r));let ae=new Th(I,z);this.xr=ae,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){let S=_t.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){let S=_t.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return ue},this.setPixelRatio=function(S){S!==void 0&&(ue=S,this.setSize(ve,Ee,!1))},this.getSize=function(S){return S.set(ve,Ee)},this.setSize=function(S,O,J=!0){if(ae.isPresenting){Fe("WebGLRenderer: Can't change size while VR device is presenting.");return}ve=S,Ee=O,t.width=Math.floor(S*ue),t.height=Math.floor(O*ue),J===!0&&(t.style.width=S+"px",t.style.height=O+"px"),k!==null&&k.setSize(t.width,t.height),this.setViewport(0,0,S,O)},this.getDrawingBufferSize=function(S){return S.set(ve*ue,Ee*ue).floor()},this.setDrawingBufferSize=function(S,O,J){ve=S,Ee=O,ue=J,t.width=Math.floor(S*J),t.height=Math.floor(O*J),this.setViewport(0,0,S,O)},this.setEffects=function(S){if(y===un){Be("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let O=0;O<S.length;O++)if(S[O].isOutputPass===!0){Fe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}k.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(te)},this.getViewport=function(S){return S.copy(Oe)},this.setViewport=function(S,O,J,X){S.isVector4?Oe.set(S.x,S.y,S.z,S.w):Oe.set(S,O,J,X),ye.viewport(te.copy(Oe).multiplyScalar(vn()).round())},this.getScissor=function(S){return S.copy(ht)},this.setScissor=function(S,O,J,X){S.isVector4?ht.set(S.x,S.y,S.z,S.w):ht.set(S,O,J,X),ye.scissor(ce.copy(ht).multiplyScalar(vn()).round())},this.getScissorTest=function(){return dt},this.setScissorTest=function(S){ye.setScissorTest(dt=S)},this.setOpaqueSort=function(S){Ge=S},this.setTransparentSort=function(S){ct=S},this.getClearColor=function(S){return S.copy(D.getClearColor())},this.setClearColor=function(){D.setClearColor(...arguments)},this.getClearAlpha=function(){return D.getClearAlpha()},this.setClearAlpha=function(){D.setClearAlpha(...arguments)},this.clear=function(S=!0,O=!0,J=!0){let X=0;if(S){let Y=!1;if(U!==null){let _e=U.texture.format;Y=p.has(_e)}if(Y){let _e=U.texture.type,we=m.has(_e),ge=D.getClearColor(),Te=D.getClearAlpha(),Ie=ge.r,qe=ge.g,Ke=ge.b;we?(v[0]=Ie,v[1]=qe,v[2]=Ke,v[3]=Te,z.clearBufferuiv(z.COLOR,0,v)):(E[0]=Ie,E[1]=qe,E[2]=Ke,E[3]=Te,z.clearBufferiv(z.COLOR,0,E))}else X|=z.COLOR_BUFFER_BIT}O&&(X|=z.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),J&&(X|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),X!==0&&z.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),V=S},this.dispose=function(){t.removeEventListener("webglcontextlost",Ue,!1),t.removeEventListener("webglcontextrestored",Ze,!1),t.removeEventListener("webglcontextcreationerror",be,!1),D.dispose(),xe.dispose(),ee.dispose(),Xe.dispose(),ke.dispose(),C.dispose(),oe.dispose(),q.dispose(),fe.dispose(),De.dispose(),se.dispose(),ae.dispose(),ae.removeEventListener("sessionstart",td),ae.removeEventListener("sessionend",nd),Hi.stop()};function Ue(S){S.preventDefault(),yr("WebGLRenderer: Context Lost."),B=!0}function Ze(){yr("WebGLRenderer: Context Restored."),B=!1;let S=Ut.autoReset,O=pe.enabled,J=pe.autoUpdate,X=pe.needsUpdate,Y=pe.type;Je(),Ut.autoReset=S,pe.enabled=O,pe.autoUpdate=J,pe.needsUpdate=X,pe.type=Y}function be(S){Be("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function ut(S){let O=S.target;O.removeEventListener("dispose",ut),Bt(O)}function Bt(S){Si(S),ke.remove(S)}function Si(S){let O=ke.get(S).programs;O!==void 0&&(O.forEach(function(J){se.releaseProgram(J)}),S.isShaderMaterial&&se.releaseShaderCache(S))}this.renderBufferDirect=function(S,O,J,X,Y,_e){O===null&&(O=_n);let we=Y.isMesh&&Y.matrixWorld.determinantAffine()<0,ge=vm(S,O,J,X,Y);ye.setMaterial(X,we);let Te=J.index,Ie=1;if(X.wireframe===!0){if(Te=q.getWireframeAttribute(J),Te===void 0)return;Ie=2}let qe=J.drawRange,Ke=J.attributes.position,Ce=qe.start*Ie,Qe=(qe.start+qe.count)*Ie;_e!==null&&(Ce=Math.max(Ce,_e.start*Ie),Qe=Math.min(Qe,(_e.start+_e.count)*Ie)),Te!==null?(Ce=Math.max(Ce,0),Qe=Math.min(Qe,Te.count)):Ke!=null&&(Ce=Math.max(Ce,0),Qe=Math.min(Qe,Ke.count));let Ct=Qe-Ce;if(Ct<0||Ct===1/0)return;fe.setup(Y,X,ge,J,Te);let mt,ft=K;if(Te!==null&&(mt=b.get(Te),ft=me,ft.setIndex(mt)),Y.isMesh)X.wireframe===!0?(ye.setLineWidth(X.wireframeLinewidth*vn()),ft.setMode(z.LINES)):ft.setMode(z.TRIANGLES);else if(Y.isLine){let Yt=X.linewidth;Yt===void 0&&(Yt=1),ye.setLineWidth(Yt*vn()),Y.isLineSegments?ft.setMode(z.LINES):Y.isLineLoop?ft.setMode(z.LINE_LOOP):ft.setMode(z.LINE_STRIP)}else Y.isPoints?ft.setMode(z.POINTS):Y.isSprite&&ft.setMode(z.TRIANGLES);if(Y.isBatchedMesh)if(_t.get("WEBGL_multi_draw"))ft.renderMultiDraw(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount);else{let Yt=Y._multiDrawStarts,Re=Y._multiDrawCounts,en=Y._multiDrawCount,ot=Te?b.get(Te).bytesPerElement:1,Vi=ke.get(X).currentProgram.getUniforms();for(let Zt=0;Zt<en;Zt++)Vi.setValue(z,"_gl_DrawID",Zt),ft.render(Yt[Zt]/ot,Re[Zt])}else if(Y.isInstancedMesh)ft.renderInstances(Ce,Ct,Y.count);else if(J.isInstancedBufferGeometry){let Yt=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,Re=Math.min(J.instanceCount,Yt);ft.renderInstances(Ce,Ct,Re)}else ft.render(Ce,Ct)};function ed(S,O,J,X){V!==null&&S.isNodeMaterial&&V.setObject(X,S),Nt===!0&&ne.setState(S,J,!1),S.transparent===!0&&S.side===En&&S.forceSinglePass===!1?(S.side=on,S.needsUpdate=!0,rr(S,O,X),S.side=Oi,S.needsUpdate=!0,rr(S,O,X),S.side=En):rr(S,O,X)}this.compile=function(S,O,J=null){J===null&&(J=S),V!==null&&V.renderStart(S,O,J),A=ee.get(J),A.init(O),T.push(A),J.traverseVisible(function(Y){Y.isLight&&Y.layers.test(O.layers)&&(A.pushLight(Y),Y.castShadow&&A.pushShadow(Y))}),S!==J&&S.traverseVisible(function(Y){Y.isLight&&Y.layers.test(O.layers)&&(A.pushLight(Y),Y.castShadow&&A.pushShadow(Y))}),A.setupLights(),V!==null&&V.updateLights(A.state.lightsArray),cn=this.localClippingEnabled,Nt=ne.init(this.clippingPlanes,cn),Nt===!0&&ne.setGlobalState(this.clippingPlanes,O),V!==null&&pe.render(A.state.shadowsArray,J,O);let X=new Set;return S.traverse(function(Y){if(!(Y.isMesh||Y.isPoints||Y.isLine||Y.isSprite))return;let _e=Y.material;if(_e)if(Array.isArray(_e))for(let we=0;we<_e.length;we++){let ge=_e[we];ed(ge,J,O,Y),X.add(ge)}else ed(_e,J,O,Y),X.add(_e)}),A=T.pop(),V!==null&&V.renderEnd(),X},this.compileAsync=function(S,O,J=null){let X=this.compile(S,O,J);return new Promise(Y=>{function _e(){if(X.forEach(function(we){let Te=ke.get(we).currentProgram;(Te===void 0||Te.isReady())&&X.delete(we)}),X.size===0){Y(S);return}setTimeout(_e,10)}_t.get("KHR_parallel_shader_compile")!==null?_e():setTimeout(_e,10)})};let Qc=null;function _m(S){Qc&&Qc(S)}function td(){Hi.stop()}function nd(){Hi.start()}let Hi=new Kf;Hi.setAnimationLoop(_m),typeof self<"u"&&Hi.setContext(self),this.setAnimationLoop=function(S){Qc=S,ae.setAnimationLoop(S),S===null?Hi.stop():Hi.start()},ae.addEventListener("sessionstart",td),ae.addEventListener("sessionend",nd),this.render=function(S,O){if(O!==void 0&&O.isCamera!==!0){Be("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(B===!0)return;V!==null&&V.renderStart(S,O);let J=ae.enabled===!0&&ae.isPresenting===!0,X=k!==null&&(U===null||J)&&k.begin(I,U);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),ae.enabled===!0&&ae.isPresenting===!0&&(k===null||k.isCompositing()===!1)&&(ae.cameraAutoUpdate===!0&&ae.updateCamera(O),O=ae.getCamera()),S.isScene===!0&&S.onBeforeRender(I,S,O,U),A=ee.get(S,T.length),A.init(O),A.state.textureUnits=Xe.getTextureUnits(),T.push(A),Mt.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),O.isArrayCamera?Wt.setFromArrayCamera(O):je.setFromProjectionMatrix(Mt,Mn,O.reversedDepth),cn=this.localClippingEnabled,Nt=ne.init(this.clippingPlanes,cn),w=xe.get(S,_.length),w.init(),_.push(w),this.info.render.frame++,ae.enabled===!0&&ae.isPresenting===!0){let we=I.xr.getDepthSensingMesh();we!==null&&el(we,O,-1/0,I.sortObjects)}el(S,O,0,I.sortObjects),w.finish(),V!==null&&V.updateLights(A.state.lightsArray),I.sortObjects===!0&&w.sort(Ge,ct),yn=ae.enabled===!1||ae.isPresenting===!1||ae.hasDepthSensing()===!1,yn&&D.addToRenderList(w,S),this.info.autoReset===!0&&this.info.reset(),Nt===!0&&ne.beginShadows();let Y=A.state.shadowsArray;if(pe.render(Y,S,O),Nt===!0&&ne.endShadows(),(X&&k.hasRenderPass())===!1){let we=w.opaque,ge=w.transmissive;if(A.setupLights(),O.isArrayCamera){let Te=O.cameras;if(ge.length>0)for(let Ie=0,qe=Te.length;Ie<qe;Ie++){let Ke=Te[Ie];sd(we,ge,S,Ke)}yn&&D.render(S);for(let Ie=0,qe=Te.length;Ie<qe;Ie++){let Ke=Te[Ie];id(w,S,Ke,Ke.viewport)}}else ge.length>0&&sd(we,ge,S,O),yn&&D.render(S),id(w,S,O)}U!==null&&P===0&&(Xe.updateMultisampleRenderTarget(U),Xe.updateRenderTargetMipmap(U)),X&&k.end(I),S.isScene===!0&&S.onAfterRender(I,S,O),fe.resetDefaultState(),F=-1,G=null,T.pop(),T.length>0?(A=T[T.length-1],Xe.setTextureUnits(A.state.textureUnits),Nt===!0&&ne.setGlobalState(I.clippingPlanes,A.state.camera)):A=null,_.pop(),_.length>0?w=_[_.length-1]:w=null,V!==null&&V.renderEnd()};function el(S,O,J,X){if(S.visible===!1)return;if(S.layers.test(O.layers)){if(S.isGroup)J=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(O);else if(S.isLight)A.pushLight(S),S.castShadow&&A.pushShadow(S);else if(S.isSprite){let we=O.isArrayCamera?Wt:je;if(!S.frustumCulled||S.intersectsFrustum(we)){X&&Ft.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Mt);let ge=oe.update(S),Te=S.material;Te.visible&&w.push(S,ge,Te,J,Ft.z,null,O)}}else if(S.isMesh||S.isLine||S.isPoints){let we=O.isArrayCamera?Wt:je;if(!S.frustumCulled||S.intersectsFrustum(we)){let ge=oe.update(S),Te=S.material;if(X&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Ft.copy(S.boundingSphere.center)):(ge.boundingSphere===null&&ge.computeBoundingSphere(),Ft.copy(ge.boundingSphere.center)),Ft.applyMatrix4(S.matrixWorld).applyMatrix4(Mt)),Array.isArray(Te)){let Ie=ge.groups;for(let qe=0,Ke=Ie.length;qe<Ke;qe++){let Ce=Ie[qe],Qe=Te[Ce.materialIndex];Qe&&Qe.visible&&w.push(S,ge,Qe,J,Ft.z,Ce,O)}}else Te.visible&&w.push(S,ge,Te,J,Ft.z,null,O)}}}let _e=S.children;for(let we=0,ge=_e.length;we<ge;we++)el(_e[we],O,J,X)}function id(S,O,J,X){let{opaque:Y,transmissive:_e,transparent:we}=S;A.setupLightsView(J),Nt===!0&&ne.setGlobalState(I.clippingPlanes,J),X&&ye.viewport(te.copy(X)),Y.length>0&&bo(Y,O,J),_e.length>0&&bo(_e,O,J),we.length>0&&bo(we,O,J),ye.buffers.depth.setTest(!0),ye.buffers.depth.setMask(!0),ye.buffers.color.setMask(!0),ye.setPolygonOffset(!1)}function sd(S,O,J,X){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[X.id]===void 0){let Ce=_t.has("EXT_color_buffer_half_float")||_t.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[X.id]=new mn(1,1,{generateMipmaps:!0,type:Ce?On:un,minFilter:mi,samples:Math.max(4,yt.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:et.workingColorSpace})}let _e=A.state.transmissionRenderTarget[X.id],we=X.viewport||te;_e.setSize(we.z*I.transmissionResolutionScale,we.w*I.transmissionResolutionScale);let ge=I.getRenderTarget(),Te=I.getActiveCubeFace(),Ie=I.getActiveMipmapLevel();I.setRenderTarget(_e),I.getClearColor(j),le=I.getClearAlpha(),le<1&&I.setClearColor(16777215,.5),I.clear(),yn&&D.render(J);let qe=I.toneMapping;I.toneMapping=$n;let Ke=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),A.setupLightsView(X),Nt===!0&&ne.setGlobalState(I.clippingPlanes,X),bo(S,J,X),Xe.updateMultisampleRenderTarget(_e),Xe.updateRenderTargetMipmap(_e),_t.has("WEBGL_multisampled_render_to_texture")===!1){let Ce=!1;for(let Qe=0,Ct=O.length;Qe<Ct;Qe++){let mt=O[Qe],{object:ft,geometry:Yt,material:Re,group:en}=mt;if(Re.side===En&&ft.layers.test(X.layers)){let ot=Re.side;Re.side=on,Re.needsUpdate=!0,rd(ft,J,X,Yt,Re,en),Re.side=ot,Re.needsUpdate=!0,Ce=!0}}Ce===!0&&(Xe.updateMultisampleRenderTarget(_e),Xe.updateRenderTargetMipmap(_e))}I.setRenderTarget(ge,Te,Ie),I.setClearColor(j,le),Ke!==void 0&&(X.viewport=Ke),I.toneMapping=qe}function bo(S,O,J){let X=O.isScene===!0?O.overrideMaterial:null;for(let Y=0,_e=S.length;Y<_e;Y++){let we=S[Y],{object:ge,geometry:Te,group:Ie}=we,qe=we.material;qe.allowOverride===!0&&X!==null&&(qe=X),ge.layers.test(J.layers)&&rd(ge,O,J,Te,qe,Ie)}}function rd(S,O,J,X,Y,_e){V!==null&&Y.isNodeMaterial&&V.setObject(S,Y),S.onBeforeRender(I,O,J,X,Y,_e),S.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),Y.onBeforeRender(I,O,J,X,S,_e),Y.transparent===!0&&Y.side===En&&Y.forceSinglePass===!1?(Y.side=on,Y.needsUpdate=!0,I.renderBufferDirect(J,O,X,Y,S,_e),Y.side=Oi,Y.needsUpdate=!0,I.renderBufferDirect(J,O,X,Y,S,_e),Y.side=En):I.renderBufferDirect(J,O,X,Y,S,_e),S.onAfterRender(I,O,J,X,Y,_e)}function od(S){let O=0;for(let J of S)J.texture!==null&&O++;return O}function rr(S,O,J){O.isScene!==!0&&(O=_n);let X=ke.get(S),Y=A.state.lights,_e=A.state.shadowsArray,we=Y.state.version,ge=se.getParameters(S,Y.state,_e,O,J,A.state.lightProbeGridArray),Te=se.getProgramCacheKey(ge),Ie=X.programs;X.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?O.environment:null,X.fog=O.fog;let qe=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;X.envMap=C.get(S.envMap||X.environment,qe),X.envMapRotation=X.environment!==null&&S.envMap===null?O.environmentRotation:S.envMapRotation,Ie===void 0&&(S.addEventListener("dispose",ut),Ie=new Map,X.programs=Ie,X.programVariants=new Map);let Ke=Ie.get(Te);if(Ke!==void 0){if(X.currentProgram===Ke&&X.lightsStateVersion===we)return cd(S,ge),Ke}else ge.uniforms=se.getUniforms(S),V!==null&&S.isNodeMaterial&&V.build(S,J,ge),S.onBeforeCompile(ge,I),Ke=se.acquireProgram(ge,Te),Ie.set(Te,Ke),X.uniforms=ge.uniforms;let Ce=X.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Ce.clippingPlanes=ne.uniform),cd(S,ge),X.needsLights=Sm(S),X.lightsStateVersion=we,X.needsLights&&(Ce.ambientLightColor.value=Y.state.ambient,Ce.lightProbe.value=Y.state.probe,Ce.sunLights.value=Y.state.sun,Ce.sunLightShadows.value=Y.state.sunShadow,Ce.directionalLights.value=Y.state.directional,Ce.directionalLightShadows.value=Y.state.directionalShadow,Ce.spotLights.value=Y.state.spot,Ce.spotLightShadows.value=Y.state.spotShadow,Ce.rectAreaLights.value=Y.state.rectArea,Ce.ltc_1.value=Y.state.rectAreaLTC1,Ce.ltc_2.value=Y.state.rectAreaLTC2,Ce.pointLights.value=Y.state.point,Ce.pointLightShadows.value=Y.state.pointShadow,Ce.hemisphereLights.value=Y.state.hemi,Ce.sunShadowMatrix.value=Y.state.sunShadowMatrix,Ce.sunShadowCascade.value=Y.state.sunShadowCascade,Ce.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,Ce.spotLightMatrix.value=Y.state.spotLightMatrix,Ce.spotLightMap.value=Y.state.spotLightMap,Ce.pointShadowMatrix.value=Y.state.pointShadowMatrix),X.numLightProbeGrids=od(A.state.lightProbeGridArray),X.currentProgram=Ke,X.uniformsList=null,Ke}function ym(S,O,J,X,Y){let _e=ke.get(S),we=_e.currentProgram.id+","+X+","+Y,ge=_e.programVariants.get(we);return ge===void 0?(ge=rr(S,O,J),_e.programVariants.set(we,ge)):(_e.currentProgram=ge,_e.uniformsList=null,_e.outputColorSpace=X,_e.toneMapping=Y),ge}function ad(S){if(S.uniformsList===null){let O=S.currentProgram.getUniforms();S.uniformsList=Ys.seqWithValue(O.seq,S.uniforms)}return S.uniformsList}function cd(S,O){let J=ke.get(S);J.outputColorSpace=O.outputColorSpace,J.batching=O.batching,J.batchingColor=O.batchingColor,J.instancing=O.instancing,J.instancingColor=O.instancingColor,J.instancingMorph=O.instancingMorph,J.skinning=O.skinning,J.morphTargets=O.morphTargets,J.morphNormals=O.morphNormals,J.morphColors=O.morphColors,J.morphTargetsCount=O.morphTargetsCount,J.numClippingPlanes=O.numClippingPlanes,J.numIntersection=O.numClipIntersection,J.vertexAlphas=O.vertexAlphas,J.vertexTangents=O.vertexTangents,J.toneMapping=O.toneMapping}function vm(S,O,J,X,Y){O.isScene!==!0&&(O=_n),Xe.resetTextureUnits();let _e=O.fog,we=X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial?O.environment:null,ge=U===null?I.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:et.workingColorSpace,Te=X.isMeshStandardMaterial||X.isMeshLambertMaterial&&!X.envMap||X.isMeshPhongMaterial&&!X.envMap,Ie=C.get(X.envMap||we,Te),qe=X.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,Ke=!!J.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Ce=!!J.morphAttributes.position,Qe=!!J.morphAttributes.normal,Ct=!!J.morphAttributes.color,mt=$n;X.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(mt=I.toneMapping);let ft=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,Yt=ft!==void 0?ft.length:0,Re=ke.get(X),en=A.state.lights;if(Nt===!0&&(cn===!0||S!==G)){let Tt=S===G&&X.id===F;ne.setState(X,S,Tt)}let ot=!1,Vi=!1;X.version===Re.__version?Re.needsLights&&Re.lightsStateVersion!==en.state.version||Y.isBatchedMesh&&Re.batching===!1||!Y.isBatchedMesh&&Re.batching===!0||Y.isBatchedMesh&&Re.batchingColor===!0&&Y._colorsTexture===null||Y.isBatchedMesh&&Re.batchingColor===!1&&Y._colorsTexture!==null||Y.isInstancedMesh&&Re.instancing===!1||!Y.isInstancedMesh&&Re.instancing===!0||Y.isSkinnedMesh&&Re.skinning===!1||!Y.isSkinnedMesh&&Re.skinning===!0||Y.isInstancedMesh&&Re.instancingColor===!0&&Y.instanceColor===null||Y.isInstancedMesh&&Re.instancingColor===!1&&Y.instanceColor!==null||Y.isInstancedMesh&&Re.instancingMorph===!0&&Y.morphTexture===null||Y.isInstancedMesh&&Re.instancingMorph===!1&&Y.morphTexture!==null||Re.envMap!==Ie||X.fog===!0&&Re.fog!==_e||Re.numClippingPlanes!==void 0&&(Re.numClippingPlanes!==ne.numPlanes||Re.numIntersection!==ne.numIntersection)||Re.vertexAlphas!==qe||Re.vertexTangents!==Ke||Re.morphTargets!==Ce||Re.morphNormals!==Qe||Re.morphColors!==Ct||Re.morphTargetsCount!==Yt||Re.numLightProbeGrids!==od(A.state.lightProbeGridArray)?ot=!0:(Re.outputColorSpace!==ge||Re.toneMapping!==mt)&&(Vi=!0):(ot=!0,Re.__version=X.version);let Zt=Re.currentProgram;(ot===!0||Vi===!0)&&(Zt=Vi===!0?ym(X,O,Y,ge,mt):rr(X,O,Y),V&&X.isNodeMaterial&&V.onUpdateProgram(X,Zt,Re));let So=!1,Mi=!1,Wi=!1,rt=Zt.getUniforms(),Xt=Re.uniforms;if(ye.useProgram(Zt.program)&&(So=!0,Mi=!0,Wi=!0),X.id!==F&&(F=X.id,Mi=!0),So||G!==S){ye.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),rt.setValue(z,"projectionMatrix",S.projectionMatrix),rt.setValue(z,"viewMatrix",S.matrixWorldInverse);let zt=rt.map.cameraPosition;zt!==void 0&&zt.setValue(z,Vn.setFromMatrixPosition(S.matrixWorld)),yt.logarithmicDepthBuffer&&rt.setValue(z,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&rt.setValue(z,"isOrthographic",S.isOrthographicCamera===!0),G!==S&&(G=S,Mi=!0,Wi=!0)}if(Re.needsLights&&(en.state.sunShadowMap.length>0&&rt.setValue(z,"sunShadowMap",en.state.sunShadowMap,Xe),en.state.directionalShadowMap.length>0&&rt.setValue(z,"directionalShadowMap",en.state.directionalShadowMap,Xe),en.state.spotShadowMap.length>0&&rt.setValue(z,"spotShadowMap",en.state.spotShadowMap,Xe),en.state.pointShadowMap.length>0&&rt.setValue(z,"pointShadowMap",en.state.pointShadowMap,Xe)),Y.isSkinnedMesh){rt.setOptional(z,Y,"bindMatrix"),rt.setOptional(z,Y,"bindMatrixInverse");let Tt=Y.skeleton;Tt&&(Tt.boneTexture===null&&Tt.computeBoneTexture(),rt.setValue(z,"boneTexture",Tt.boneTexture,Xe))}Y.isBatchedMesh&&(rt.setOptional(z,Y,"batchingTexture"),rt.setValue(z,"batchingTexture",Y._matricesTexture,Xe),rt.setOptional(z,Y,"batchingIdTexture"),rt.setValue(z,"batchingIdTexture",Y._indirectTexture,Xe),rt.setOptional(z,Y,"batchingColorTexture"),Y._colorsTexture!==null&&rt.setValue(z,"batchingColorTexture",Y._colorsTexture,Xe));let An=J.morphAttributes;if((An.position!==void 0||An.normal!==void 0||An.color!==void 0)&&ie.update(Y,J,Zt),(Mi||Re.receiveShadow!==Y.receiveShadow)&&(Re.receiveShadow=Y.receiveShadow,rt.setValue(z,"receiveShadow",Y.receiveShadow)),(X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial)&&X.envMap===null&&O.environment!==null&&(Xt.envMapIntensity.value=O.environmentIntensity),Xt.dfgLUT!==void 0&&(Xt.dfgLUT.value=nv()),Mi){if(rt.setValue(z,"toneMappingExposure",I.toneMappingExposure),Re.needsLights&&bm(Xt,Wi),_e&&X.fog===!0&&de.refreshFogUniforms(Xt,_e),de.refreshMaterialUniforms(Xt,X,ue,Ee,A.state.transmissionRenderTarget[S.id]),Re.needsLights&&Re.numLightProbeGrids>0){let Tt=M,zt=0;for(let ni of A.state.lightProbeGridArray)ni.texture!==null&&(Tt.textures[zt]=ni.texture,Tt.min[zt]=ni.boundingBox.min,Tt.max[zt]=ni.boundingBox.max,Tt.resolution[zt]=ni.resolution,zt++);for(let ni in Tt)Tt[ni].length=zt;Xt.probesSH.value=Tt.textures,Xt.probesMin.value=Tt.min,Xt.probesMax.value=Tt.max,Xt.probesResolution.value=Tt.resolution}Ys.upload(z,ad(Re),Xt,Xe)}if(X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(Ys.upload(z,ad(Re),Xt,Xe),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&rt.setValue(z,"center",Y.center),rt.setValue(z,"modelViewMatrix",Y.modelViewMatrix),rt.setValue(z,"normalMatrix",Y.normalMatrix),rt.setValue(z,"modelMatrix",Y.matrixWorld),X.uniformsGroups!==void 0){let Tt=X.uniformsGroups;for(let zt=0,ni=Tt.length;zt<ni;zt++){let hd=Tt[zt];De.update(hd,Zt),De.bind(hd,Zt)}}return Zt}function bm(S,O){S.ambientLightColor.needsUpdate=O,S.lightProbe.needsUpdate=O,S.sunLights.needsUpdate=O,S.sunLightShadows.needsUpdate=O,S.directionalLights.needsUpdate=O,S.directionalLightShadows.needsUpdate=O,S.pointLights.needsUpdate=O,S.pointLightShadows.needsUpdate=O,S.spotLights.needsUpdate=O,S.spotLightShadows.needsUpdate=O,S.rectAreaLights.needsUpdate=O,S.hemisphereLights.needsUpdate=O}function Sm(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(S,O,J){let X=ke.get(S);X.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,X.__autoAllocateDepthBuffer===!1&&(X.__useRenderToTexture=!1),ke.get(S.texture).__webglTexture=O,ke.get(S.depthTexture).__webglTexture=X.__autoAllocateDepthBuffer?void 0:J,X.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,O){let J=ke.get(S);J.__webglFramebuffer=O,J.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(S,O=0,J=0){U=S,R=O,P=J;let X=null,Y=!1,_e=!1;if(S){let ge=ke.get(S);if(ge.__useDefaultFramebuffer!==void 0){ye.bindFramebuffer(z.FRAMEBUFFER,ge.__webglFramebuffer),te.copy(S.viewport),ce.copy(S.scissor),Ae=S.scissorTest,ye.viewport(te),ye.scissor(ce),ye.setScissorTest(Ae),F=-1;return}else if(ge.__webglFramebuffer===void 0)Xe.setupRenderTarget(S);else if(ge.__hasExternalTextures)Xe.rebindTextures(S,ke.get(S.texture).__webglTexture,ke.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){let qe=S.depthTexture;if(ge.__boundDepthTexture!==qe){if(qe!==null&&ke.has(qe)&&(S.width!==qe.image.width||S.height!==qe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Xe.setupDepthRenderbuffer(S)}}let Te=S.texture;(Te.isData3DTexture||Te.isDataArrayTexture||Te.isCompressedArrayTexture)&&(_e=!0);let Ie=ke.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Ie[O])?X=Ie[O][J]:X=Ie[O],Y=!0):S.samples>0&&Xe.useMultisampledRTT(S)===!1?X=ke.get(S).__webglMultisampledFramebuffer:Array.isArray(Ie)?X=Ie[J]:X=Ie,te.copy(S.viewport),ce.copy(S.scissor),Ae=S.scissorTest}else te.copy(Oe).multiplyScalar(ue).floor(),ce.copy(ht).multiplyScalar(ue).floor(),Ae=dt;if(J!==0&&(X=Z),ye.bindFramebuffer(z.FRAMEBUFFER,X)&&ye.drawBuffers(S,X),ye.viewport(te),ye.scissor(ce),ye.setScissorTest(Ae),Y){let ge=ke.get(S.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+O,ge.__webglTexture,J)}else if(_e){let ge=O;for(let Te=0;Te<S.textures.length;Te++){let Ie=ke.get(S.textures[Te]);z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0+Te,Ie.__webglTexture,J,ge)}}else if(S!==null&&J!==0){let ge=ke.get(S.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,ge.__webglTexture,J)}F=-1};function ld(S){let O=ke.get(S);return(O.__readFormat!==S.format||O.__readType!==S.type)&&(O.__readFormat=S.format,O.__readType=S.type,O.__formatReadable=yt.textureFormatReadable(S.format),O.__typeReadable=yt.textureTypeReadable(S.type)),O}this.readRenderTargetPixels=function(S,O,J,X,Y,_e,we,ge=0){if(!(S&&S.isWebGLRenderTarget)){Be("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=ke.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&we!==void 0&&(Te=Te[we],Array.isArray(Te)&&(Te=Te[0])),Te){ye.bindFramebuffer(z.FRAMEBUFFER,Te);try{let Ie=S.textures[ge],qe=Ie.format,Ke=Ie.type;S.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+ge);let Ce=ld(Ie);if(Ce.__formatReadable===!1){Be("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ce.__typeReadable===!1){Be("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=S.width-X&&J>=0&&J<=S.height-Y&&z.readPixels(O,J,X,Y,he.convert(qe),he.convert(Ke),_e)}finally{let Ie=U!==null?ke.get(U).__webglFramebuffer:null;ye.bindFramebuffer(z.FRAMEBUFFER,Ie)}}},this.readRenderTargetPixelsAsync=async function(S,O,J,X,Y,_e,we,ge=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=ke.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&we!==void 0&&(Te=Te[we],Array.isArray(Te)&&(Te=Te[0])),Te)if(O>=0&&O<=S.width-X&&J>=0&&J<=S.height-Y){ye.bindFramebuffer(z.FRAMEBUFFER,Te);let Ie=S.textures[ge],qe=Ie.format,Ke=Ie.type;S.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+ge);let Ce=ld(Ie);if(Ce.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ce.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Qe=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,Qe),z.bufferData(z.PIXEL_PACK_BUFFER,_e.byteLength,z.STREAM_READ),z.readPixels(O,J,X,Y,he.convert(qe),he.convert(Ke),0),z.bindBuffer(z.PIXEL_PACK_BUFFER,null);let Ct=U!==null?ke.get(U).__webglFramebuffer:null;ye.bindFramebuffer(z.FRAMEBUFFER,Ct);let mt=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await bf(z,mt,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,Qe),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,_e),z.bindBuffer(z.PIXEL_PACK_BUFFER,null),z.deleteBuffer(Qe),z.deleteSync(mt),_e}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,O=null,J=0){let X=Math.pow(2,-J),Y=Math.floor(S.image.width*X),_e=Math.floor(S.image.height*X),we=O!==null?O.x:0,ge=O!==null?O.y:0;Xe.setTexture2D(S,0),z.copyTexSubImage2D(z.TEXTURE_2D,J,0,0,we,ge,Y,_e),ye.unbindTexture()},this.copyTextureToTexture=function(S,O,J=null,X=null,Y=0,_e=0){let we,ge,Te,Ie,qe,Ke,Ce,Qe,Ct,mt=S.isCompressedTexture?S.mipmaps[_e]:S.image;if(J!==null)we=J.max.x-J.min.x,ge=J.max.y-J.min.y,Te=J.isBox3?J.max.z-J.min.z:1,Ie=J.min.x,qe=J.min.y,Ke=J.isBox3?J.min.z:0;else{let rt=Math.pow(2,-Y);we=Math.floor(mt.width*rt),ge=Math.floor(mt.height*rt),S.isDataArrayTexture?Te=mt.depth:S.isData3DTexture?Te=Math.floor(mt.depth*rt):Te=1,Ie=0,qe=0,Ke=0}X!==null?(Ce=X.x,Qe=X.y,Ct=X.z):(Ce=0,Qe=0,Ct=0);let ft=he.convert(O.format),Yt=he.convert(O.type),Re;O.isData3DTexture?(Xe.setTexture3D(O,0),Re=z.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(Xe.setTexture2DArray(O,0),Re=z.TEXTURE_2D_ARRAY):(Xe.setTexture2D(O,0),Re=z.TEXTURE_2D),ye.activeTexture(z.TEXTURE0),ye.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,O.flipY),ye.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),ye.pixelStorei(z.UNPACK_ALIGNMENT,O.unpackAlignment);let en=ye.getParameter(z.UNPACK_ROW_LENGTH),ot=ye.getParameter(z.UNPACK_IMAGE_HEIGHT),Vi=ye.getParameter(z.UNPACK_SKIP_PIXELS),Zt=ye.getParameter(z.UNPACK_SKIP_ROWS),So=ye.getParameter(z.UNPACK_SKIP_IMAGES);ye.pixelStorei(z.UNPACK_ROW_LENGTH,mt.width),ye.pixelStorei(z.UNPACK_IMAGE_HEIGHT,mt.height),ye.pixelStorei(z.UNPACK_SKIP_PIXELS,Ie),ye.pixelStorei(z.UNPACK_SKIP_ROWS,qe),ye.pixelStorei(z.UNPACK_SKIP_IMAGES,Ke);let Mi=S.isDataArrayTexture||S.isData3DTexture,Wi=O.isDataArrayTexture||O.isData3DTexture;if(S.isDepthTexture){let rt=ke.get(S),Xt=ke.get(O),An=ke.get(rt.__renderTarget),Tt=ke.get(Xt.__renderTarget);ye.bindFramebuffer(z.READ_FRAMEBUFFER,An.__webglFramebuffer),ye.bindFramebuffer(z.DRAW_FRAMEBUFFER,Tt.__webglFramebuffer);for(let zt=0;zt<Te;zt++)Mi&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,ke.get(S).__webglTexture,Y,Ke+zt),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,ke.get(O).__webglTexture,_e,Ct+zt)),z.blitFramebuffer(Ie,qe,Ie+we,qe+ge,Ce,Qe,Ce+we,Qe+ge,z.DEPTH_BUFFER_BIT,z.NEAREST);ye.bindFramebuffer(z.READ_FRAMEBUFFER,null),ye.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if(Y!==0||S.isRenderTargetTexture||ke.has(S)){let rt=ke.get(S),Xt=ke.get(O);ye.bindFramebuffer(z.READ_FRAMEBUFFER,N),ye.bindFramebuffer(z.DRAW_FRAMEBUFFER,$);for(let An=0;An<Te;An++)Mi?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,rt.__webglTexture,Y,Ke+An):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,rt.__webglTexture,Y),Wi?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Xt.__webglTexture,_e,Ct+An):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Xt.__webglTexture,_e),Y!==0?z.blitFramebuffer(Ie,qe,Ie+we,qe+ge,Ce,Qe,Ce+we,Qe+ge,z.COLOR_BUFFER_BIT,z.NEAREST):Wi?z.copyTexSubImage3D(Re,_e,Ce,Qe,Ct+An,Ie,qe,we,ge):z.copyTexSubImage2D(Re,_e,Ce,Qe,Ie,qe,we,ge);ye.bindFramebuffer(z.READ_FRAMEBUFFER,null),ye.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else Wi?S.isDataTexture||S.isData3DTexture?z.texSubImage3D(Re,_e,Ce,Qe,Ct,we,ge,Te,ft,Yt,mt.data):O.isCompressedArrayTexture?z.compressedTexSubImage3D(Re,_e,Ce,Qe,Ct,we,ge,Te,ft,mt.data):z.texSubImage3D(Re,_e,Ce,Qe,Ct,we,ge,Te,ft,Yt,mt):S.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,_e,Ce,Qe,we,ge,ft,Yt,mt.data):S.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,_e,Ce,Qe,mt.width,mt.height,ft,mt.data):z.texSubImage2D(z.TEXTURE_2D,_e,Ce,Qe,we,ge,ft,Yt,mt);ye.pixelStorei(z.UNPACK_ROW_LENGTH,en),ye.pixelStorei(z.UNPACK_IMAGE_HEIGHT,ot),ye.pixelStorei(z.UNPACK_SKIP_PIXELS,Vi),ye.pixelStorei(z.UNPACK_SKIP_ROWS,Zt),ye.pixelStorei(z.UNPACK_SKIP_IMAGES,So),_e===0&&O.generateMipmaps===!0&&O.mipmapsAutoUpdate===!0&&z.generateMipmap(Re),ye.unbindTexture()},this.initRenderTarget=function(S){ke.get(S).__webglFramebuffer===void 0&&Xe.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?Xe.setTextureCube(S,0):S.isData3DTexture?Xe.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?Xe.setTexture2DArray(S,0):Xe.setTexture2D(S,0),ye.unbindTexture()},this.resetState=function(){R=0,P=0,U=null,ye.reset(),fe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Mn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=et._getDrawingBufferColorSpace(e),t.unpackColorSpace=et._getUnpackColorSpace()}};function wn(n,e=!1){let t=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},o={},a=n[0].morphTargetsRelative,c=new At;c.morphTargetsRelative=a;let l=0;for(let u=0;u<n.length;++u){let f=n[u],d=0,g=0;if(t!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let x in f.attributes){if(!i.has(x))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+x+'" attribute exists among all geometries, or in none of them.'),null;r[x]===void 0&&(r[x]=[]),r[x].push(f.attributes[x]),d++}if(d!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let x in f.morphAttributes){if(!s.has(x))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;if(f.morphAttributes[x].length!==n[0].morphAttributes[x].length)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have the same number of morph targets for the "'+x+'" morph attribute.'),null;o[x]===void 0&&(o[x]=[]),o[x].push(f.morphAttributes[x]),g++}if(g!==s.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of morph attributes."),null;if(e){let x;if(t)x=f.index.count;else if(f.attributes.position!==void 0)x=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,x,u),l+=x}}if(t){let u=0,f=[];for(let d=0;d<n.length;++d){let g=n[d].index;for(let x=0;x<g.count;++x)f.push(g.getX(x)+u);u+=n[d].attributes.position.count}c.setIndex(f)}for(let u in r){let f=hp(r[u]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,f)}for(let u in o){let f=o[u][0].length;if(f!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let d=0;d<f;++d){let g=[];for(let y=0;y<o[u].length;++y)g.push(o[u][y][d]);let x=hp(g);if(!x)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(x)}}}return c}function hp(n){let e,t,i,s=-1,r=0;for(let l=0;l<n.length;++l){let u=n[l];if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=u.itemSize),t!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=u.normalized),i!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*t}let o=new e(r),a=new Ht(o,t,i),c=0;for(let l=0;l<n.length;++l){let u=n[l];if(u.isInterleavedBufferAttribute){let f=c/t;for(let d=0,g=u.count;d<g;d++)for(let x=0;x<t;x++){let y=u.getComponent(d,x);a.setComponent(d+f,x,y)}}else o.set(u.array,c);c+=u.count*t}return s!==void 0&&(a.gpuType=s),a}var Eh=class{constructor(){this.encoder=new TextEncoder,this._pieces=[],this._parts=[]}append_buffer(e){this.flush(),this._parts.push(e)}append(e){this._pieces.push(e)}flush(){if(this._pieces.length>0){let e=new Uint8Array(this._pieces);this._parts.push(e),this._pieces=[]}}toArrayBuffer(){let e=[];for(let t of this._parts)e.push(t);return iv(e).buffer}};function iv(n){let e=0;for(let s of n)e+=s.byteLength;let t=new Uint8Array(e),i=0;for(let s of n){let r=new Uint8Array(s.buffer,s.byteOffset,s.byteLength);t.set(r,i),i+=s.byteLength}return t}function Ch(n){return new wh(n).unpack()}function Rh(n){let e=new Ah,t=e.pack(n);return t instanceof Promise?t.then(()=>e.getBuffer()):e.getBuffer()}var wh=class{constructor(e){this.index=0,this.dataBuffer=e,this.dataView=new Uint8Array(this.dataBuffer),this.length=this.dataBuffer.byteLength}unpack(){let e=this.unpack_uint8();if(e<128)return e;if((e^224)<32)return(e^224)-32;let t;if((t=e^160)<=15)return this.unpack_raw(t);if((t=e^176)<=15)return this.unpack_string(t);if((t=e^144)<=15)return this.unpack_array(t);if((t=e^128)<=15)return this.unpack_map(t);switch(e){case 192:return null;case 193:return;case 194:return!1;case 195:return!0;case 202:return this.unpack_float();case 203:return this.unpack_double();case 204:return this.unpack_uint8();case 205:return this.unpack_uint16();case 206:return this.unpack_uint32();case 207:return this.unpack_uint64();case 208:return this.unpack_int8();case 209:return this.unpack_int16();case 210:return this.unpack_int32();case 211:return this.unpack_int64();case 212:return;case 213:return;case 214:return;case 215:return;case 216:return t=this.unpack_uint16(),this.unpack_string(t);case 217:return t=this.unpack_uint32(),this.unpack_string(t);case 218:return t=this.unpack_uint16(),this.unpack_raw(t);case 219:return t=this.unpack_uint32(),this.unpack_raw(t);case 220:return t=this.unpack_uint16(),this.unpack_array(t);case 221:return t=this.unpack_uint32(),this.unpack_array(t);case 222:return t=this.unpack_uint16(),this.unpack_map(t);case 223:return t=this.unpack_uint32(),this.unpack_map(t)}}unpack_uint8(){let e=this.dataView[this.index]&255;return this.index++,e}unpack_uint16(){let e=this.read(2),t=(e[0]&255)*256+(e[1]&255);return this.index+=2,t}unpack_uint32(){let e=this.read(4),t=((e[0]*256+e[1])*256+e[2])*256+e[3];return this.index+=4,t}unpack_uint64(){let e=this.read(8),t=((((((e[0]*256+e[1])*256+e[2])*256+e[3])*256+e[4])*256+e[5])*256+e[6])*256+e[7];return this.index+=8,t}unpack_int8(){let e=this.unpack_uint8();return e<128?e:e-256}unpack_int16(){let e=this.unpack_uint16();return e<32768?e:e-65536}unpack_int32(){let e=this.unpack_uint32();return e<2**31?e:e-2**32}unpack_int64(){let e=this.unpack_uint64();return e<2**63?e:e-2**64}unpack_raw(e){if(this.length<this.index+e)throw new Error(`BinaryPackFailure: index is out of range ${this.index} ${e} ${this.length}`);let t=this.dataBuffer.slice(this.index,this.index+e);return this.index+=e,t}unpack_string(e){let t=this.read(e),i=0,s="",r,o;for(;i<e;)r=t[i],r<160?(o=r,i++):(r^192)<32?(o=(r&31)<<6|t[i+1]&63,i+=2):(r^224)<16?(o=(r&15)<<12|(t[i+1]&63)<<6|t[i+2]&63,i+=3):(o=(r&7)<<18|(t[i+1]&63)<<12|(t[i+2]&63)<<6|t[i+3]&63,i+=4),s+=String.fromCodePoint(o);return this.index+=e,s}unpack_array(e){let t=new Array(e);for(let i=0;i<e;i++)t[i]=this.unpack();return t}unpack_map(e){let t={};for(let i=0;i<e;i++){let s=this.unpack();t[s]=this.unpack()}return t}unpack_float(){let e=this.unpack_uint32(),t=e>>31,i=(e>>23&255)-127,s=e&8388607|8388608;return(t===0?1:-1)*s*2**(i-23)}unpack_double(){let e=this.unpack_uint32(),t=this.unpack_uint32(),i=e>>31,s=(e>>20&2047)-1023,o=(e&1048575|1048576)*2**(s-20)+t*2**(s-52);return(i===0?1:-1)*o}read(e){let t=this.index;if(t+e<=this.length)return this.dataView.subarray(t,t+e);throw new Error("BinaryPackFailure: read index out of range")}},Ah=class{getBuffer(){return this._bufferBuilder.toArrayBuffer()}pack(e){if(typeof e=="string")this.pack_string(e);else if(typeof e=="number")Math.floor(e)===e?this.pack_integer(e):this.pack_double(e);else if(typeof e=="boolean")e===!0?this._bufferBuilder.append(195):e===!1&&this._bufferBuilder.append(194);else if(e===void 0)this._bufferBuilder.append(192);else if(typeof e=="object")if(e===null)this._bufferBuilder.append(192);else{let t=e.constructor;if(e instanceof Array){let i=this.pack_array(e);if(i instanceof Promise)return i.then(()=>this._bufferBuilder.flush())}else if(e instanceof ArrayBuffer)this.pack_bin(new Uint8Array(e));else if("BYTES_PER_ELEMENT"in e){let i=e;this.pack_bin(new Uint8Array(i.buffer,i.byteOffset,i.byteLength))}else if(e instanceof Date)this.pack_string(e.toString());else{if(e instanceof Blob)return e.arrayBuffer().then(i=>{this.pack_bin(new Uint8Array(i)),this._bufferBuilder.flush()});if(t==Object||t.toString().startsWith("class")){let i=this.pack_object(e);if(i instanceof Promise)return i.then(()=>this._bufferBuilder.flush())}else throw new Error(`Type "${t.toString()}" not yet supported`)}}else throw new Error(`Type "${typeof e}" not yet supported`);this._bufferBuilder.flush()}pack_bin(e){let t=e.length;if(t<=15)this.pack_uint8(160+t);else if(t<=65535)this._bufferBuilder.append(218),this.pack_uint16(t);else if(t<=4294967295)this._bufferBuilder.append(219),this.pack_uint32(t);else throw new Error("Invalid length");this._bufferBuilder.append_buffer(e)}pack_string(e){let t=this._textEncoder.encode(e),i=t.length;if(i<=15)this.pack_uint8(176+i);else if(i<=65535)this._bufferBuilder.append(216),this.pack_uint16(i);else if(i<=4294967295)this._bufferBuilder.append(217),this.pack_uint32(i);else throw new Error("Invalid length");this._bufferBuilder.append_buffer(t)}pack_array(e){let t=e.length;if(t<=15)this.pack_uint8(144+t);else if(t<=65535)this._bufferBuilder.append(220),this.pack_uint16(t);else if(t<=4294967295)this._bufferBuilder.append(221),this.pack_uint32(t);else throw new Error("Invalid length");let i=s=>{if(s<t){let r=this.pack(e[s]);return r instanceof Promise?r.then(()=>i(s+1)):i(s+1)}};return i(0)}pack_integer(e){if(e>=-32&&e<=127)this._bufferBuilder.append(e&255);else if(e>=0&&e<=255)this._bufferBuilder.append(204),this.pack_uint8(e);else if(e>=-128&&e<=127)this._bufferBuilder.append(208),this.pack_int8(e);else if(e>=0&&e<=65535)this._bufferBuilder.append(205),this.pack_uint16(e);else if(e>=-32768&&e<=32767)this._bufferBuilder.append(209),this.pack_int16(e);else if(e>=0&&e<=4294967295)this._bufferBuilder.append(206),this.pack_uint32(e);else if(e>=-2147483648&&e<=2147483647)this._bufferBuilder.append(210),this.pack_int32(e);else if(e>=-9223372036854776e3&&e<=9223372036854776e3)this._bufferBuilder.append(211),this.pack_int64(e);else if(e>=0&&e<=18446744073709552e3)this._bufferBuilder.append(207),this.pack_uint64(e);else throw new Error("Invalid integer")}pack_double(e){let t=0;e<0&&(t=1,e=-e);let i=Math.floor(Math.log(e)/Math.LN2),s=e/2**i-1,r=Math.floor(s*2**52),o=2**32,a=t<<31|i+1023<<20|r/o&1048575,c=r%o;this._bufferBuilder.append(203),this.pack_int32(a),this.pack_int32(c)}pack_object(e){let t=Object.keys(e),i=t.length;if(i<=15)this.pack_uint8(128+i);else if(i<=65535)this._bufferBuilder.append(222),this.pack_uint16(i);else if(i<=4294967295)this._bufferBuilder.append(223),this.pack_uint32(i);else throw new Error("Invalid length");let s=r=>{if(r<t.length){let o=t[r];if(e.hasOwnProperty(o)){this.pack(o);let a=this.pack(e[o]);if(a instanceof Promise)return a.then(()=>s(r+1))}return s(r+1)}};return s(0)}pack_uint8(e){this._bufferBuilder.append(e)}pack_uint16(e){this._bufferBuilder.append(e>>8),this._bufferBuilder.append(e&255)}pack_uint32(e){let t=e&4294967295;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255)}pack_uint64(e){let t=e/4294967296,i=e%2**32;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255),this._bufferBuilder.append((i&4278190080)>>>24),this._bufferBuilder.append((i&16711680)>>>16),this._bufferBuilder.append((i&65280)>>>8),this._bufferBuilder.append(i&255)}pack_int8(e){this._bufferBuilder.append(e&255)}pack_int16(e){this._bufferBuilder.append((e&65280)>>8),this._bufferBuilder.append(e&255)}pack_int32(e){this._bufferBuilder.append(e>>>24&255),this._bufferBuilder.append((e&16711680)>>>16),this._bufferBuilder.append((e&65280)>>>8),this._bufferBuilder.append(e&255)}pack_int64(e){let t=Math.floor(e/4294967296),i=e%2**32;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255),this._bufferBuilder.append((i&4278190080)>>>24),this._bufferBuilder.append((i&16711680)>>>16),this._bufferBuilder.append((i&65280)>>>8),this._bufferBuilder.append(i&255)}constructor(){this._bufferBuilder=new Eh,this._textEncoder=new TextEncoder}};var dp=!0,fp=!0;function Js(n,e,t){let i=n.match(e);return i&&i.length>=t&&parseFloat(i[t],10)}function Qn(n,e,t){if(!n.RTCPeerConnection)return;if(!Object.getOwnPropertyDescriptor(EventTarget.prototype,"addEventListener").writable){Kr("Unable to polyfill events");return}let s=n.RTCPeerConnection.prototype,r=s.addEventListener;s.addEventListener=function(a,c){if(a!==e)return r.apply(this,arguments);let l=u=>{let f=t(u);f&&(c.handleEvent?c.handleEvent(f):c(f))};return this._eventMap=this._eventMap||{},this._eventMap[e]||(this._eventMap[e]=new Map),this._eventMap[e].set(c,l),r.apply(this,[a,l])};let o=s.removeEventListener;s.removeEventListener=function(a,c){if(a!==e||!this._eventMap||!this._eventMap[e])return o.apply(this,arguments);if(!this._eventMap[e].has(c))return o.apply(this,arguments);let l=this._eventMap[e].get(c);return this._eventMap[e].delete(c),this._eventMap[e].size===0&&delete this._eventMap[e],Object.keys(this._eventMap).length===0&&delete this._eventMap,o.apply(this,[a,l])},Object.defineProperty(s,"on"+e,{get(){return this["_on"+e]},set(a){this["_on"+e]&&(this.removeEventListener(e,this["_on"+e]),delete this["_on"+e]),a&&this.addEventListener(e,this["_on"+e]=a)},enumerable:!0,configurable:!0})}function pp(n){return typeof n!="boolean"?new Error("Argument type: "+typeof n+". Please use a boolean."):(dp=n,n?"adapter.js logging disabled":"adapter.js logging enabled")}function mp(n){return typeof n!="boolean"?new Error("Argument type: "+typeof n+". Please use a boolean."):(fp=!n,"adapter.js deprecation warnings "+(n?"disabled":"enabled"))}function Kr(){if(typeof window=="object"){if(dp)return;typeof console<"u"&&typeof console.log=="function"&&console.log.apply(console,arguments)}}function $s(n,e){fp&&console.warn(n+" is deprecated, please use "+e+" instead.")}function gp(n){let e={browser:null,version:null};if(typeof n>"u"||!n.navigator||!n.navigator.userAgent)return e.browser="Not a browser.",e;let{navigator:t}=n;if(t.userAgentData&&t.userAgentData.brands){let i=t.userAgentData.brands.find(s=>s.brand==="Chromium");if(i){let s=parseInt(i.version,10);if(s>=90)return{browser:"chrome",version:s}}}if(t.mozGetUserMedia)e.browser="firefox",e.version=parseInt(Js(t.userAgent,/Firefox\/(\d+)\./,1));else if(t.webkitGetUserMedia||n.isSecureContext===!1&&n.webkitRTCPeerConnection)e.browser="chrome",e.version=parseInt(Js(t.userAgent,/Chrom(e|ium)\/(\d+)\./,2))||null;else if(n.RTCPeerConnection&&t.userAgent.match(/AppleWebKit\/(\d+)\./))e.browser="safari",e.version=parseInt(Js(t.userAgent,/AppleWebKit\/(\d+)\./,1)),e.supportsUnifiedPlan=n.RTCRtpTransceiver&&"currentDirection"in n.RTCRtpTransceiver.prototype,e._safariVersion=Js(t.userAgent,/Version\/(\d+(\.?\d+))/,1);else return e.browser="Not a supported browser.",e;return e}function up(n){return Object.prototype.toString.call(n)==="[object Object]"}function Ih(n){return up(n)?Object.keys(n).reduce(function(e,t){let i=up(n[t]),s=i?Ih(n[t]):n[t],r=i&&!Object.keys(s).length;return s===void 0||r?e:Object.assign(e,{[t]:s})},{}):n}function Ph(n,e,t){!e||t.has(e.id)||(t.set(e.id,e),Object.keys(e).forEach(i=>{i.endsWith("Id")?Ph(n,n.get(e[i]),t):i.endsWith("Ids")&&e[i].forEach(s=>{Ph(n,n.get(s),t)})}))}function Lh(n,e,t){let i=t?"outbound-rtp":"inbound-rtp",s=new Map;if(e===null)return s;let r=[];return n.forEach(o=>{o.type==="track"&&o.trackIdentifier===e.id&&r.push(o)}),r.forEach(o=>{n.forEach(a=>{a.type===i&&a.trackId===o.id&&Ph(n,a,s)})}),s}var Mc={};Mo(Mc,{fixNegotiationNeeded:()=>Fh,shimAddTrackRemoveTrack:()=>Oh,shimAddTrackRemoveTrackWithNative:()=>_p,shimGetSendersWithDtmf:()=>Uh,shimGetUserMedia:()=>bc,shimMediaStream:()=>Dh,shimOnTrack:()=>Nh,shimPeerConnection:()=>Sc,shimSenderReceiverGetStats:()=>kh});var xp=Kr;function bc(n,e){if(e.version>=64)return;let t=n&&n.navigator;if(!t.mediaDevices)return;let i=function(a){if(typeof a!="object"||a.mandatory||a.optional)return a;let c={};return Object.keys(a).forEach(l=>{if(l==="require"||l==="advanced"||l==="mediaSource")return;let u=typeof a[l]=="object"?a[l]:{ideal:a[l]};u.exact!==void 0&&typeof u.exact=="number"&&(u.min=u.max=u.exact);let f=function(d,g){return d?d+g.charAt(0).toUpperCase()+g.slice(1):g==="deviceId"?"sourceId":g};if(u.ideal!==void 0){c.optional=c.optional||[];let d={};typeof u.ideal=="number"?(d[f("min",l)]=u.ideal,c.optional.push(d),d={},d[f("max",l)]=u.ideal,c.optional.push(d)):(d[f("",l)]=u.ideal,c.optional.push(d))}u.exact!==void 0&&typeof u.exact!="number"?(c.mandatory=c.mandatory||{},c.mandatory[f("",l)]=u.exact):["min","max"].forEach(d=>{u[d]!==void 0&&(c.mandatory=c.mandatory||{},c.mandatory[f(d,l)]=u[d])})}),a.advanced&&(c.optional=(c.optional||[]).concat(a.advanced)),c},s=function(a,c){if(e.version>=61)return c(a);if(a=JSON.parse(JSON.stringify(a)),a&&typeof a.audio=="object"){let l=function(u,f,d){f in u&&!(d in u)&&(u[d]=u[f],delete u[f])};a=JSON.parse(JSON.stringify(a)),l(a.audio,"autoGainControl","googAutoGainControl"),l(a.audio,"noiseSuppression","googNoiseSuppression"),a.audio=i(a.audio)}if(a&&typeof a.video=="object"){let l=a.video.facingMode;l=l&&(typeof l=="object"?l:{ideal:l});let u=e.version<66;if(l&&(l.exact==="user"||l.exact==="environment"||l.ideal==="user"||l.ideal==="environment")&&!(t.mediaDevices.getSupportedConstraints&&t.mediaDevices.getSupportedConstraints().facingMode&&!u)){delete a.video.facingMode;let f;if(l.exact==="environment"||l.ideal==="environment"?f=["back","rear"]:(l.exact==="user"||l.ideal==="user")&&(f=["front"]),f)return t.mediaDevices.enumerateDevices().then(d=>{d=d.filter(x=>x.kind==="videoinput");let g=d.find(x=>f.some(y=>x.label.toLowerCase().includes(y)));return!g&&d.length&&f.includes("back")&&(g=d[d.length-1]),g&&(a.video.deviceId=l.exact?{exact:g.deviceId}:{ideal:g.deviceId}),a.video=i(a.video),xp("chrome: "+JSON.stringify(a)),c(a)})}a.video=i(a.video)}return xp("chrome: "+JSON.stringify(a)),c(a)},r=function(a){return e.version>=64?a:{name:{PermissionDeniedError:"NotAllowedError",PermissionDismissedError:"NotAllowedError",InvalidStateError:"NotAllowedError",DevicesNotFoundError:"NotFoundError",ConstraintNotSatisfiedError:"OverconstrainedError",TrackStartError:"NotReadableError",MediaDeviceFailedDueToShutdown:"NotAllowedError",MediaDeviceKillSwitchOn:"NotAllowedError",TabCaptureError:"AbortError",ScreenCaptureError:"AbortError",DeviceCaptureError:"AbortError"}[a.name]||a.name,message:a.message,constraint:a.constraint||a.constraintName,toString(){return this.name+(this.message&&": ")+this.message}}},o=function(a,c,l){s(a,u=>{t.webkitGetUserMedia(u,c,f=>{l&&l(r(f))})})};if(t.getUserMedia=o.bind(t),t.mediaDevices.getUserMedia){let a=t.mediaDevices.getUserMedia.bind(t.mediaDevices);t.mediaDevices.getUserMedia=function(c){return s(c,l=>a(l).then(u=>{if(l.audio&&!u.getAudioTracks().length||l.video&&!u.getVideoTracks().length)throw u.getTracks().forEach(f=>{f.stop()}),new DOMException("","NotFoundError");return u},u=>Promise.reject(r(u))))}}}function Dh(n){n.MediaStream=n.MediaStream||n.webkitMediaStream}function Nh(n,e){if(!(e.version>102))if(typeof n=="object"&&n.RTCPeerConnection&&!("ontrack"in n.RTCPeerConnection.prototype)){Object.defineProperty(n.RTCPeerConnection.prototype,"ontrack",{get(){return this._ontrack},set(i){this._ontrack&&this.removeEventListener("track",this._ontrack),this.addEventListener("track",this._ontrack=i)},enumerable:!0,configurable:!0});let t=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(){return this._ontrackpoly||(this._ontrackpoly=s=>{s.stream.addEventListener("addtrack",r=>{let o;n.RTCPeerConnection.prototype.getReceivers?o=this.getReceivers().find(c=>c.track&&c.track.id===r.track.id):o={track:r.track};let a=new Event("track");a.track=r.track,a.receiver=o,a.transceiver={receiver:o},a.streams=[s.stream],this.dispatchEvent(a)}),s.stream.getTracks().forEach(r=>{let o;n.RTCPeerConnection.prototype.getReceivers?o=this.getReceivers().find(c=>c.track&&c.track.id===r.id):o={track:r};let a=new Event("track");a.track=r,a.receiver=o,a.transceiver={receiver:o},a.streams=[s.stream],this.dispatchEvent(a)})},this.addEventListener("addstream",this._ontrackpoly)),t.apply(this,arguments)}}else Qn(n,"track",t=>(t.transceiver||Object.defineProperty(t,"transceiver",{value:{receiver:t.receiver}}),t))}function Uh(n){if(typeof n=="object"&&n.RTCPeerConnection&&!("getSenders"in n.RTCPeerConnection.prototype)&&"createDTMFSender"in n.RTCPeerConnection.prototype){let e=function(s,r){return{track:r,get dtmf(){return this._dtmf===void 0&&(r.kind==="audio"?this._dtmf=s.createDTMFSender(r):this._dtmf=null),this._dtmf},_pc:s}};if(!n.RTCPeerConnection.prototype.getSenders){n.RTCPeerConnection.prototype.getSenders=function(){return this._senders=this._senders||[],this._senders.slice()};let s=n.RTCPeerConnection.prototype.addTrack;n.RTCPeerConnection.prototype.addTrack=function(a,c){let l=s.apply(this,arguments);return l||(l=e(this,a),this._senders.push(l)),l};let r=n.RTCPeerConnection.prototype.removeTrack;n.RTCPeerConnection.prototype.removeTrack=function(a){r.apply(this,arguments);let c=this._senders.indexOf(a);c!==-1&&this._senders.splice(c,1)}}let t=n.RTCPeerConnection.prototype.addStream;n.RTCPeerConnection.prototype.addStream=function(r){this._senders=this._senders||[],t.apply(this,[r]),r.getTracks().forEach(o=>{this._senders.push(e(this,o))})};let i=n.RTCPeerConnection.prototype.removeStream;n.RTCPeerConnection.prototype.removeStream=function(r){this._senders=this._senders||[],i.apply(this,[r]),r.getTracks().forEach(o=>{let a=this._senders.find(c=>c.track===o);a&&this._senders.splice(this._senders.indexOf(a),1)})}}else if(typeof n=="object"&&n.RTCPeerConnection&&"getSenders"in n.RTCPeerConnection.prototype&&"createDTMFSender"in n.RTCPeerConnection.prototype&&n.RTCRtpSender&&!("dtmf"in n.RTCRtpSender.prototype)){let e=n.RTCPeerConnection.prototype.getSenders;n.RTCPeerConnection.prototype.getSenders=function(){let i=e.apply(this,[]);return i.forEach(s=>s._pc=this),i},Object.defineProperty(n.RTCRtpSender.prototype,"dtmf",{get(){return this._dtmf===void 0&&(this.track.kind==="audio"?this._dtmf=this._pc.createDTMFSender(this.track):this._dtmf=null),this._dtmf}})}}function kh(n,e){if(e.version>=67||!(typeof n=="object"&&n.RTCPeerConnection&&n.RTCRtpSender&&n.RTCRtpReceiver))return;if(!("getStats"in n.RTCRtpSender.prototype)){let i=n.RTCPeerConnection.prototype.getSenders;i&&(n.RTCPeerConnection.prototype.getSenders=function(){let o=i.apply(this,[]);return o.forEach(a=>a._pc=this),o});let s=n.RTCPeerConnection.prototype.addTrack;s&&(n.RTCPeerConnection.prototype.addTrack=function(){let o=s.apply(this,arguments);return o._pc=this,o}),n.RTCRtpSender.prototype.getStats=function(){let o=this;return this._pc.getStats().then(a=>Lh(a,o.track,!0))}}if(!("getStats"in n.RTCRtpReceiver.prototype)){let i=n.RTCPeerConnection.prototype.getReceivers;i&&(n.RTCPeerConnection.prototype.getReceivers=function(){let r=i.apply(this,[]);return r.forEach(o=>o._pc=this),r}),Qn(n,"track",s=>(s.receiver._pc=s.srcElement,s)),n.RTCRtpReceiver.prototype.getStats=function(){let r=this;return this._pc.getStats().then(o=>Lh(o,r.track,!1))}}if(!("getStats"in n.RTCRtpSender.prototype&&"getStats"in n.RTCRtpReceiver.prototype))return;let t=n.RTCPeerConnection.prototype.getStats;n.RTCPeerConnection.prototype.getStats=function(){if(arguments.length>0&&arguments[0]instanceof n.MediaStreamTrack){let s=arguments[0],r,o,a;return this.getSenders().forEach(c=>{c.track===s&&(r?a=!0:r=c)}),this.getReceivers().forEach(c=>(c.track===s&&(o?a=!0:o=c),c.track===s)),a||r&&o?Promise.reject(new DOMException("There are more than one sender or receiver for the track.","InvalidAccessError")):r?r.getStats():o?o.getStats():Promise.reject(new DOMException("There is no sender or receiver for the track.","InvalidAccessError"))}return t.apply(this,arguments)}}function _p(n){n.RTCPeerConnection.prototype.getLocalStreams=function(){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},Object.keys(this._shimmedLocalStreams).map(o=>this._shimmedLocalStreams[o][0])};let e=n.RTCPeerConnection.prototype.addTrack;n.RTCPeerConnection.prototype.addTrack=function(o,a){if(!a)return e.apply(this,arguments);this._shimmedLocalStreams=this._shimmedLocalStreams||{};let c=e.apply(this,arguments);return this._shimmedLocalStreams[a.id]?this._shimmedLocalStreams[a.id].indexOf(c)===-1&&this._shimmedLocalStreams[a.id].push(c):this._shimmedLocalStreams[a.id]=[a,c],c};let t=n.RTCPeerConnection.prototype.addStream;n.RTCPeerConnection.prototype.addStream=function(o){this._shimmedLocalStreams=this._shimmedLocalStreams||{},o.getTracks().forEach(l=>{if(this.getSenders().find(f=>f.track===l))throw new DOMException("Track already exists.","InvalidAccessError")});let a=this.getSenders();t.apply(this,arguments);let c=this.getSenders().filter(l=>a.indexOf(l)===-1);this._shimmedLocalStreams[o.id]=[o].concat(c)};let i=n.RTCPeerConnection.prototype.removeStream;n.RTCPeerConnection.prototype.removeStream=function(o){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},delete this._shimmedLocalStreams[o.id],i.apply(this,arguments)};let s=n.RTCPeerConnection.prototype.removeTrack;n.RTCPeerConnection.prototype.removeTrack=function(o){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},o&&Object.keys(this._shimmedLocalStreams).forEach(a=>{let c=this._shimmedLocalStreams[a].indexOf(o);c!==-1&&this._shimmedLocalStreams[a].splice(c,1),this._shimmedLocalStreams[a].length===1&&delete this._shimmedLocalStreams[a]}),s.apply(this,arguments)}}function Oh(n,e){if(!n.RTCPeerConnection)return;if(n.RTCPeerConnection.prototype.addTrack&&e.version>=65)return _p(n);let t=n.RTCPeerConnection.prototype.getLocalStreams;n.RTCPeerConnection.prototype.getLocalStreams=function(){let u=t.apply(this);return this._reverseStreams=this._reverseStreams||{},u.map(f=>this._reverseStreams[f.id])};let i=n.RTCPeerConnection.prototype.addStream;n.RTCPeerConnection.prototype.addStream=function(u){if(this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{},u.getTracks().forEach(f=>{if(this.getSenders().find(g=>g.track===f))throw new DOMException("Track already exists.","InvalidAccessError")}),!this._reverseStreams[u.id]){let f=new n.MediaStream(u.getTracks());this._streams[u.id]=f,this._reverseStreams[f.id]=u,u=f}i.apply(this,[u])};let s=n.RTCPeerConnection.prototype.removeStream;n.RTCPeerConnection.prototype.removeStream=function(u){this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{},s.apply(this,[this._streams[u.id]||u]),delete this._reverseStreams[this._streams[u.id]?this._streams[u.id].id:u.id],delete this._streams[u.id]},n.RTCPeerConnection.prototype.addTrack=function(u,f){if(this.signalingState==="closed")throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");let d=[].slice.call(arguments,1);if(d.length!==1||!d[0].getTracks().find(y=>y===u))throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.","NotSupportedError");if(this.getSenders().find(y=>y.track===u))throw new DOMException("Track already exists.","InvalidAccessError");this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{};let x=this._streams[f.id];if(x)x.addTrack(u),Promise.resolve().then(()=>{this.dispatchEvent(new Event("negotiationneeded"))});else{let y=new n.MediaStream([u]);this._streams[f.id]=y,this._reverseStreams[y.id]=f,this.addStream(y)}return this.getSenders().find(y=>y.track===u)};function r(l,u){let f=u.sdp;return Object.keys(l._reverseStreams||[]).forEach(d=>{let g=l._reverseStreams[d],x=l._streams[g.id];f=f.replace(new RegExp(x.id,"g"),g.id)}),new RTCSessionDescription({type:u.type,sdp:f})}function o(l,u){let f=u.sdp;return Object.keys(l._reverseStreams||[]).forEach(d=>{let g=l._reverseStreams[d],x=l._streams[g.id];f=f.replace(new RegExp(g.id,"g"),x.id)}),new RTCSessionDescription({type:u.type,sdp:f})}["createOffer","createAnswer"].forEach(function(l){let u=n.RTCPeerConnection.prototype[l],f={[l](){let d=arguments;return arguments.length&&typeof arguments[0]=="function"?u.apply(this,[x=>{let y=r(this,x);d[0].apply(null,[y])},x=>{d[1]&&d[1].apply(null,x)},arguments[2]]):u.apply(this,arguments).then(x=>r(this,x))}};n.RTCPeerConnection.prototype[l]=f[l]});let a=n.RTCPeerConnection.prototype.setLocalDescription;n.RTCPeerConnection.prototype.setLocalDescription=function(){return!arguments.length||!arguments[0].type?a.apply(this,arguments):(arguments[0]=o(this,arguments[0]),a.apply(this,arguments))};let c=Object.getOwnPropertyDescriptor(n.RTCPeerConnection.prototype,"localDescription");Object.defineProperty(n.RTCPeerConnection.prototype,"localDescription",{get(){let l=c.get.apply(this);return l.type===""?l:r(this,l)}}),n.RTCPeerConnection.prototype.removeTrack=function(u){if(this.signalingState==="closed")throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");if(!u._pc)throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.","TypeError");if(!(u._pc===this))throw new DOMException("Sender was not created by this connection.","InvalidAccessError");this._streams=this._streams||{};let d;Object.keys(this._streams).forEach(g=>{this._streams[g].getTracks().find(y=>u.track===y)&&(d=this._streams[g])}),d&&(d.getTracks().length===1?this.removeStream(this._reverseStreams[d.id]):d.removeTrack(u.track),this.dispatchEvent(new Event("negotiationneeded")))}}function Sc(n,e){!n.RTCPeerConnection&&n.webkitRTCPeerConnection&&(n.RTCPeerConnection=n.webkitRTCPeerConnection),n.RTCPeerConnection&&e.version<53&&["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(t){let i=n.RTCPeerConnection.prototype[t],s={[t](){return arguments[0]=new(t==="addIceCandidate"?n.RTCIceCandidate:n.RTCSessionDescription)(arguments[0]),i.apply(this,arguments)}};n.RTCPeerConnection.prototype[t]=s[t]})}function Fh(n,e){e.version>102||Qn(n,"negotiationneeded",t=>{let i=t.target;if(!((e.version<72||i.getConfiguration&&i.getConfiguration().sdpSemantics==="plan-b")&&i.signalingState!=="stable"))return t})}var wc={};Mo(wc,{shimAddTransceiver:()=>Xh,shimCreateAnswer:()=>Zh,shimCreateOffer:()=>Yh,shimGetDisplayMedia:()=>yp,shimGetParameters:()=>qh,shimGetStats:()=>zh,shimGetUserMedia:()=>Tc,shimOnTrack:()=>Bh,shimPeerConnection:()=>Ec,shimRTCDataChannel:()=>Wh,shimReceiverGetStats:()=>Hh,shimRemoveStream:()=>Vh,shimSenderGetStats:()=>Gh});function Tc(n,e){let t=n&&n.navigator;if(!t.mediaDevices)return;let i=n&&n.MediaStreamTrack;if(t.getUserMedia=function(s,r,o){$s("navigator.getUserMedia","navigator.mediaDevices.getUserMedia"),t.mediaDevices.getUserMedia(s).then(r,o)},!(e.version>55&&"autoGainControl"in t.mediaDevices.getSupportedConstraints())){let s=function(o,a,c){a in o&&!(c in o)&&(o[c]=o[a],delete o[a])},r=t.mediaDevices.getUserMedia.bind(t.mediaDevices);if(t.mediaDevices.getUserMedia=function(o){return typeof o=="object"&&typeof o.audio=="object"&&(o=JSON.parse(JSON.stringify(o)),s(o.audio,"autoGainControl","mozAutoGainControl"),s(o.audio,"noiseSuppression","mozNoiseSuppression")),r(o)},i&&i.prototype.getSettings){let o=i.prototype.getSettings;i.prototype.getSettings=function(){let a=o.apply(this,arguments);return s(a,"mozAutoGainControl","autoGainControl"),s(a,"mozNoiseSuppression","noiseSuppression"),a}}if(i&&i.prototype.applyConstraints){let o=i.prototype.applyConstraints;i.prototype.applyConstraints=function(a){return this.kind==="audio"&&typeof a=="object"&&(a=JSON.parse(JSON.stringify(a)),s(a,"autoGainControl","mozAutoGainControl"),s(a,"noiseSuppression","mozNoiseSuppression")),o.apply(this,[a])}}}}function yp(n,e){n.navigator.mediaDevices&&(n.navigator.mediaDevices&&"getDisplayMedia"in n.navigator.mediaDevices||(n.navigator.mediaDevices.getDisplayMedia=function(i){if(!(i&&i.video)){let s=new DOMException("getDisplayMedia without video constraints is undefined");return s.name="NotFoundError",s.code=8,Promise.reject(s)}return i.video===!0?i.video={mediaSource:e}:i.video.mediaSource=e,n.navigator.mediaDevices.getUserMedia(i)}))}function Bh(n){typeof n=="object"&&n.RTCTrackEvent&&"receiver"in n.RTCTrackEvent.prototype&&!("transceiver"in n.RTCTrackEvent.prototype)&&Object.defineProperty(n.RTCTrackEvent.prototype,"transceiver",{get(){return{receiver:this.receiver}}})}function Ec(n,e){typeof n!="object"||!(n.RTCPeerConnection||n.mozRTCPeerConnection)||(!n.RTCPeerConnection&&n.mozRTCPeerConnection&&(n.RTCPeerConnection=n.mozRTCPeerConnection),e.version<53&&["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(t){let i=n.RTCPeerConnection.prototype[t],s={[t](){return arguments[0]=new(t==="addIceCandidate"?n.RTCIceCandidate:n.RTCSessionDescription)(arguments[0]),i.apply(this,arguments)}};n.RTCPeerConnection.prototype[t]=s[t]}))}function zh(n,e){if(typeof n!="object"||!(n.RTCPeerConnection||n.mozRTCPeerConnection)||e.version>=151)return;let t={inboundrtp:"inbound-rtp",outboundrtp:"outbound-rtp",candidatepair:"candidate-pair",localcandidate:"local-candidate",remotecandidate:"remote-candidate"},i=n.RTCPeerConnection.prototype.getStats;n.RTCPeerConnection.prototype.getStats=function(){let[r,o,a]=arguments;return this.signalingState==="closed"?Promise.resolve(new Map):i.apply(this,[r||null]).then(c=>{if(e.version<53&&!o)try{c.forEach(l=>{l.type=t[l.type]||l.type})}catch(l){if(l.name!=="TypeError")throw l;c.forEach((u,f)=>{c.set(f,Object.assign({},u,{type:t[u.type]||u.type}))})}return c}).then(o,a)}}function Gh(n){if(!(typeof n=="object"&&n.RTCPeerConnection&&n.RTCRtpSender)||n.RTCRtpSender&&"getStats"in n.RTCRtpSender.prototype)return;let e=n.RTCPeerConnection.prototype.getSenders;e&&(n.RTCPeerConnection.prototype.getSenders=function(){let s=e.apply(this,[]);return s.forEach(r=>r._pc=this),s});let t=n.RTCPeerConnection.prototype.addTrack;t&&(n.RTCPeerConnection.prototype.addTrack=function(){let s=t.apply(this,arguments);return s._pc=this,s}),n.RTCRtpSender.prototype.getStats=function(){return this.track?this._pc.getStats(this.track):Promise.resolve(new Map)}}function Hh(n){if(!(typeof n=="object"&&n.RTCPeerConnection&&n.RTCRtpSender)||n.RTCRtpSender&&"getStats"in n.RTCRtpReceiver.prototype)return;let e=n.RTCPeerConnection.prototype.getReceivers;e&&(n.RTCPeerConnection.prototype.getReceivers=function(){let i=e.apply(this,[]);return i.forEach(s=>s._pc=this),i}),Qn(n,"track",t=>(t.receiver._pc=t.srcElement,t)),n.RTCRtpReceiver.prototype.getStats=function(){return this._pc.getStats(this.track)}}function Vh(n){!n.RTCPeerConnection||"removeStream"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.removeStream=function(t){$s("removeStream","removeTrack"),this.getSenders().forEach(i=>{i.track&&t.getTracks().includes(i.track)&&this.removeTrack(i)})})}function Wh(n){n.DataChannel&&!n.RTCDataChannel&&(n.RTCDataChannel=n.DataChannel)}function Xh(n,e){if(!(typeof n=="object"&&n.RTCPeerConnection)||e.version>=110)return;let t=n.RTCPeerConnection.prototype.addTransceiver;t&&(n.RTCPeerConnection.prototype.addTransceiver=function(){this.setParametersPromises=[];let s=arguments[1]&&arguments[1].sendEncodings;s===void 0&&(s=[]),s=[...s];let r=s.length>0;r&&s.forEach(a=>{if("rid"in a&&!/^[a-z0-9]{0,16}$/i.test(a.rid))throw new TypeError("Invalid RID value provided.");if("scaleResolutionDownBy"in a&&!(parseFloat(a.scaleResolutionDownBy)>=1))throw new RangeError("scale_resolution_down_by must be >= 1.0");if("maxFramerate"in a&&!(parseFloat(a.maxFramerate)>=0))throw new RangeError("max_framerate must be >= 0.0")});let o=t.apply(this,arguments);if(r){let{sender:a}=o,c=a.getParameters();(!("encodings"in c)||c.encodings.length===1&&Object.keys(c.encodings[0]).length===0)&&(c.encodings=s,a.sendEncodings=s,this.setParametersPromises.push(a.setParameters(c).then(()=>{delete a.sendEncodings}).catch(()=>{delete a.sendEncodings})))}return o})}function qh(n,e){if(!(typeof n=="object"&&n.RTCRtpSender)||e.version>=110)return;let t=n.RTCRtpSender.prototype.getParameters;t&&(n.RTCRtpSender.prototype.getParameters=function(){let s=t.apply(this,arguments);return"encodings"in s||(s.encodings=[].concat(this.sendEncodings||[{}])),s})}function Yh(n,e){if(!(typeof n=="object"&&n.RTCPeerConnection)||e.version>=110)return;let t=n.RTCPeerConnection.prototype.createOffer;n.RTCPeerConnection.prototype.createOffer=function(){return this.setParametersPromises&&this.setParametersPromises.length?Promise.all(this.setParametersPromises).then(()=>t.apply(this,arguments)).finally(()=>{this.setParametersPromises=[]}):t.apply(this,arguments)}}function Zh(n,e){if(!(typeof n=="object"&&n.RTCPeerConnection)||e.version>=110)return;let t=n.RTCPeerConnection.prototype.createAnswer;n.RTCPeerConnection.prototype.createAnswer=function(){return this.setParametersPromises&&this.setParametersPromises.length?Promise.all(this.setParametersPromises).then(()=>t.apply(this,arguments)).finally(()=>{this.setParametersPromises=[]}):t.apply(this,arguments)}}var Ac={};Mo(Ac,{shimAudioContext:()=>nu,shimCallbacksAPI:()=>jh,shimConstraints:()=>vp,shimCreateOfferLegacy:()=>tu,shimGetUserMedia:()=>Kh,shimLocalStreamsAPI:()=>Jh,shimRTCIceServerUrls:()=>Qh,shimRemoteStreamsAPI:()=>$h,shimTrackEventTransceiver:()=>eu});function Jh(n){if(!(typeof n!="object"||!n.RTCPeerConnection)){if("getLocalStreams"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.getLocalStreams=function(){return this._localStreams||(this._localStreams=[]),this._localStreams}),!("addStream"in n.RTCPeerConnection.prototype)){let e=n.RTCPeerConnection.prototype.addTrack;n.RTCPeerConnection.prototype.addStream=function(i){this._localStreams||(this._localStreams=[]),this._localStreams.includes(i)||this._localStreams.push(i),i.getAudioTracks().forEach(s=>e.call(this,s,i)),i.getVideoTracks().forEach(s=>e.call(this,s,i))},n.RTCPeerConnection.prototype.addTrack=function(i,...s){return s&&s.forEach(r=>{this._localStreams?this._localStreams.includes(r)||this._localStreams.push(r):this._localStreams=[r]}),e.apply(this,arguments)}}"removeStream"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.removeStream=function(t){this._localStreams||(this._localStreams=[]);let i=this._localStreams.indexOf(t);if(i===-1)return;this._localStreams.splice(i,1);let s=t.getTracks();this.getSenders().forEach(r=>{s.includes(r.track)&&this.removeTrack(r)})})}}function $h(n){if(!(typeof n!="object"||!n.RTCPeerConnection)&&("getRemoteStreams"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.getRemoteStreams=function(){return this._remoteStreams?this._remoteStreams:[]}),!("onaddstream"in n.RTCPeerConnection.prototype))){Object.defineProperty(n.RTCPeerConnection.prototype,"onaddstream",{get(){return this._onaddstream},set(t){this._onaddstream&&(this.removeEventListener("addstream",this._onaddstream),this.removeEventListener("track",this._onaddstreampoly)),this.addEventListener("addstream",this._onaddstream=t),this.addEventListener("track",this._onaddstreampoly=i=>{i.streams.forEach(s=>{if(this._remoteStreams||(this._remoteStreams=[]),this._remoteStreams.includes(s))return;this._remoteStreams.push(s);let r=new Event("addstream");r.stream=s,this.dispatchEvent(r)})})}});let e=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(){let i=this;return this._onaddstreampoly||this.addEventListener("track",this._onaddstreampoly=function(s){s.streams.forEach(r=>{if(i._remoteStreams||(i._remoteStreams=[]),i._remoteStreams.indexOf(r)>=0)return;i._remoteStreams.push(r);let o=new Event("addstream");o.stream=r,i.dispatchEvent(o)})}),e.apply(i,arguments)}}}function jh(n){if(typeof n!="object"||!n.RTCPeerConnection)return;let e=n.RTCPeerConnection.prototype,t=e.createOffer,i=e.createAnswer,s=e.setLocalDescription,r=e.setRemoteDescription,o=e.addIceCandidate;e.createOffer=function(l,u){let f=arguments.length>=2?arguments[2]:arguments[0],d=t.apply(this,[f]);return u?(d.then(l,u),Promise.resolve()):d},e.createAnswer=function(l,u){let f=arguments.length>=2?arguments[2]:arguments[0],d=i.apply(this,[f]);return u?(d.then(l,u),Promise.resolve()):d};let a=function(c,l,u){let f=s.apply(this,[c]);return u?(f.then(l,u),Promise.resolve()):f};e.setLocalDescription=a,a=function(c,l,u){let f=r.apply(this,[c]);return u?(f.then(l,u),Promise.resolve()):f},e.setRemoteDescription=a,a=function(c,l,u){let f=o.apply(this,[c]);return u?(f.then(l,u),Promise.resolve()):f},e.addIceCandidate=a}function Kh(n){let e=n&&n.navigator;if(e.mediaDevices&&e.mediaDevices.getUserMedia){let t=e.mediaDevices,i=t.getUserMedia.bind(t);e.mediaDevices.getUserMedia=s=>i(vp(s))}!e.getUserMedia&&e.mediaDevices&&e.mediaDevices.getUserMedia&&(e.getUserMedia=function(i,s,r){e.mediaDevices.getUserMedia(i).then(s,r)}.bind(e))}function vp(n){return n&&n.video!==void 0?Object.assign({},n,{video:Ih(n.video)}):n}function Qh(n){if(!n.RTCPeerConnection)return;let e=n.RTCPeerConnection;n.RTCPeerConnection=function(i,s){if(i&&i.iceServers){let r=[];for(let o=0;o<i.iceServers.length;o++){let a=i.iceServers[o];a.urls===void 0&&a.url?($s("RTCIceServer.url","RTCIceServer.urls"),a=JSON.parse(JSON.stringify(a)),a.urls=a.url,delete a.url,r.push(a)):r.push(i.iceServers[o])}i.iceServers=r}return new e(i,s)},n.RTCPeerConnection.prototype=e.prototype,"generateCertificate"in e&&Object.defineProperty(n.RTCPeerConnection,"generateCertificate",{get(){return e.generateCertificate}})}function eu(n){typeof n=="object"&&n.RTCTrackEvent&&"receiver"in n.RTCTrackEvent.prototype&&!("transceiver"in n.RTCTrackEvent.prototype)&&Object.defineProperty(n.RTCTrackEvent.prototype,"transceiver",{get(){return{receiver:this.receiver}}})}function tu(n){let e=n.RTCPeerConnection.prototype.createOffer;n.RTCPeerConnection.prototype.createOffer=function(i){if(i){typeof i.offerToReceiveAudio<"u"&&(i.offerToReceiveAudio=!!i.offerToReceiveAudio);let s=this.getTransceivers().find(o=>o.receiver.track.kind==="audio");i.offerToReceiveAudio===!1&&s?s.direction==="sendrecv"?s.setDirection?s.setDirection("sendonly"):s.direction="sendonly":s.direction==="recvonly"&&(s.setDirection?s.setDirection("inactive"):s.direction="inactive"):i.offerToReceiveAudio===!0&&!s&&this.addTransceiver("audio",{direction:"recvonly"}),typeof i.offerToReceiveVideo<"u"&&(i.offerToReceiveVideo=!!i.offerToReceiveVideo);let r=this.getTransceivers().find(o=>o.receiver.track.kind==="video");i.offerToReceiveVideo===!1&&r?r.direction==="sendrecv"?r.setDirection?r.setDirection("sendonly"):r.direction="sendonly":r.direction==="recvonly"&&(r.setDirection?r.setDirection("inactive"):r.direction="inactive"):i.offerToReceiveVideo===!0&&!r&&this.addTransceiver("video",{direction:"recvonly"})}return e.apply(this,arguments)}}function nu(n){typeof n!="object"||n.AudioContext||(n.AudioContext=n.webkitAudioContext)}var ru={};Mo(ru,{removeExtmapAllowMixed:()=>Pc,shimAddIceCandidateNullOrEmpty:()=>no,shimConnectionState:()=>Rc,shimMaxMessageSize:()=>eo,shimParameterlessSetLocalDescription:()=>io,shimRTCIceCandidate:()=>Qr,shimRTCIceCandidateRelayProtocol:()=>Cc,shimSendThrowTypeError:()=>to});var js=ud(su());function Qr(n){if(!n.RTCIceCandidate||n.RTCIceCandidate&&"foundation"in n.RTCIceCandidate.prototype)return;let e=n.RTCIceCandidate;n.RTCIceCandidate=function(i){if(typeof i=="object"&&i.candidate&&i.candidate.indexOf("a=")===0&&(i=JSON.parse(JSON.stringify(i)),i.candidate=i.candidate.substring(2)),i.candidate&&i.candidate.length){let s=new e(i),r=js.default.parseCandidate(i.candidate);for(let o in r)o in s||Object.defineProperty(s,o,{value:r[o]});return s.toJSON=function(){return{candidate:s.candidate,sdpMid:s.sdpMid,sdpMLineIndex:s.sdpMLineIndex,usernameFragment:s.usernameFragment}},s}return new e(i)},n.RTCIceCandidate.prototype=e.prototype,Qn(n,"icecandidate",t=>(t.candidate&&Object.defineProperty(t,"candidate",{value:new n.RTCIceCandidate(t.candidate),writable:"false"}),t))}function Cc(n){!n.RTCIceCandidate||n.RTCIceCandidate&&"relayProtocol"in n.RTCIceCandidate.prototype||Qn(n,"icecandidate",e=>{if(e.candidate){let t=js.default.parseCandidate(e.candidate.candidate);t.type==="relay"&&(e.candidate.relayProtocol={0:"tls",1:"tcp",2:"udp"}[t.priority>>24])}return e})}function eo(n,e){if(!n.RTCPeerConnection||e.browser==="chrome"&&e.version>102||e.browser==="firefox"&&e.version>=113)return;"sctp"in n.RTCPeerConnection.prototype||Object.defineProperty(n.RTCPeerConnection.prototype,"sctp",{get(){return typeof this._sctp>"u"?null:this._sctp}});let t=function(a){if(!a||!a.sdp)return!1;let c=js.default.splitSections(a.sdp);return c.shift(),c.some(l=>{let u=js.default.parseMLine(l);return u&&u.kind==="application"&&u.protocol.indexOf("SCTP")!==-1})},i=function(a){let c=a.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);if(c===null||c.length<2)return-1;let l=parseInt(c[1],10);return l!==l?-1:l},s=function(a){let c=65536;return e.browser==="firefox"&&(e.version<57?a===-1?c=16384:c=2147483637:e.version<60?c=e.version===57?65535:65536:c=2147483637),c},r=function(a,c){let l=65536;e.browser==="firefox"&&e.version===57&&(l=65535);let u=js.default.matchPrefix(a.sdp,"a=max-message-size:");return u.length>0?l=parseInt(u[0].substring(19),10):e.browser==="firefox"&&c!==-1&&(l=2147483637),l},o=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(){if(this._sctp=null,e.browser==="chrome"&&e.version>=76){let{sdpSemantics:c}=this.getConfiguration();c==="plan-b"&&Object.defineProperty(this,"sctp",{get(){return typeof this._sctp>"u"?null:this._sctp},enumerable:!0,configurable:!0})}if(t(arguments[0])){let c=i(arguments[0]),l=s(c),u=r(arguments[0],c),f;l===0&&u===0?f=Number.POSITIVE_INFINITY:l===0||u===0?f=Math.max(l,u):f=Math.min(l,u);let d={};Object.defineProperty(d,"maxMessageSize",{get(){return f}}),this._sctp=d}return o.apply(this,arguments)}}function to(n,e){if(!(n.RTCPeerConnection&&"createDataChannel"in n.RTCPeerConnection.prototype)||e.browser==="chrome"&&e.version>=149||e.browser==="firefox"&&e.version>60)return;function t(s,r){let o=s.send;s.send=function(){let c=arguments[0],l=c.length||c.size||c.byteLength;if(s.readyState==="open"&&r.sctp&&l>r.sctp.maxMessageSize)throw new TypeError("Message too large (can send a maximum of "+r.sctp.maxMessageSize+" bytes)");return o.apply(s,arguments)}}let i=n.RTCPeerConnection.prototype.createDataChannel;n.RTCPeerConnection.prototype.createDataChannel=function(){let r=i.apply(this,arguments);return t(r,this),r},Qn(n,"datachannel",s=>(t(s.channel,s.target),s))}function Rc(n){if(!n.RTCPeerConnection||"connectionState"in n.RTCPeerConnection.prototype)return;let e=n.RTCPeerConnection.prototype;Object.defineProperty(e,"connectionState",{get(){return{completed:"connected",checking:"connecting"}[this.iceConnectionState]||this.iceConnectionState},enumerable:!0,configurable:!0}),Object.defineProperty(e,"onconnectionstatechange",{get(){return this._onconnectionstatechange||null},set(t){this._onconnectionstatechange&&(this.removeEventListener("connectionstatechange",this._onconnectionstatechange),delete this._onconnectionstatechange),t&&this.addEventListener("connectionstatechange",this._onconnectionstatechange=t)},enumerable:!0,configurable:!0}),["setLocalDescription","setRemoteDescription"].forEach(t=>{let i=e[t];e[t]=function(){return this._connectionstatechangepoly||(this._connectionstatechangepoly=s=>{let r=s.target;if(r._lastConnectionState!==r.connectionState){r._lastConnectionState=r.connectionState;let o=new Event("connectionstatechange",s);r.dispatchEvent(o)}return s},this.addEventListener("iceconnectionstatechange",this._connectionstatechangepoly)),i.apply(this,arguments)}})}function Pc(n,e){if(!n.RTCPeerConnection||e.browser==="chrome"&&e.version>=71||e.browser==="safari"&&e._safariVersion>=13.1)return;let t=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(s){if(s&&s.sdp&&s.sdp.indexOf(`
a=extmap-allow-mixed`)!==-1){let r=s.sdp.split(`
`).filter(o=>o.trim()!=="a=extmap-allow-mixed").join(`
`);n.RTCSessionDescription&&s instanceof n.RTCSessionDescription?arguments[0]=new n.RTCSessionDescription({type:s.type,sdp:r}):s.sdp=r}return t.apply(this,arguments)}}function no(n,e){if(!(n.RTCPeerConnection&&n.RTCPeerConnection.prototype))return;let t=n.RTCPeerConnection.prototype.addIceCandidate;!t||t.length===0||(n.RTCPeerConnection.prototype.addIceCandidate=function(){return arguments[0]?(e.browser==="chrome"&&e.version<78||e.browser==="firefox"&&e.version<68||e.browser==="safari")&&arguments[0]&&arguments[0].candidate===""?Promise.resolve():t.apply(this,arguments):(arguments[1]&&arguments[1].apply(null),Promise.resolve())})}function io(n,e){if(!(n.RTCPeerConnection&&n.RTCPeerConnection.prototype))return;let t=n.RTCPeerConnection.prototype.setLocalDescription;!t||t.length===0||(n.RTCPeerConnection.prototype.setLocalDescription=function(){let s=arguments[0]||{};if(typeof s!="object"||s.type&&s.sdp)return t.apply(this,arguments);if(s={type:s.type,sdp:s.sdp},!s.type)switch(this.signalingState){case"stable":case"have-local-offer":case"have-remote-pranswer":s.type="offer";break;default:s.type="answer";break}return s.sdp||s.type!=="offer"&&s.type!=="answer"?t.apply(this,[s]):(s.type==="offer"?this.createOffer:this.createAnswer).apply(this).then(o=>t.apply(this,[o]))})}var sv=ud(su());function bp({window:n}={},e={shimChrome:!0,shimFirefox:!0,shimSafari:!0}){let t=Kr,i=gp(n),s={browserDetails:i,commonShim:ru,extractVersion:Js,disableLog:pp,disableWarnings:mp,sdp:sv};switch(i.browser){case"chrome":if(!Mc||!Sc||!e.shimChrome)return t("Chrome shim is not included in this adapter release."),s;if(i.version===null)return t("Chrome shim can not determine version, not shimming."),s;t("adapter.js shimming chrome."),s.browserShim=Mc,no(n,i),io(n,i),bc(n,i),Dh(n,i),Sc(n,i),Nh(n,i),Oh(n,i),Uh(n,i),kh(n,i),Fh(n,i),Qr(n,i),Cc(n,i),Rc(n,i),eo(n,i),to(n,i),Pc(n,i);break;case"firefox":if(!wc||!Ec||!e.shimFirefox)return t("Firefox shim is not included in this adapter release."),s;t("adapter.js shimming firefox."),s.browserShim=wc,no(n,i),io(n,i),Tc(n,i),Ec(n,i),zh(n,i),Bh(n,i),Vh(n,i),Gh(n,i),Hh(n,i),Wh(n,i),Xh(n,i),qh(n,i),Yh(n,i),Zh(n,i),Qr(n,i),Rc(n,i),eo(n,i),to(n,i);break;case"safari":if(!Ac||!e.shimSafari)return t("Safari shim is not included in this adapter release."),s;t("adapter.js shimming safari."),s.browserShim=Ac,no(n,i),io(n,i),Qh(n,i),tu(n,i),jh(n,i),Jh(n,i),$h(n,i),eu(n,i),Kh(n,i),nu(n,i),Qr(n,i),Cc(n,i),eo(n,i),to(n,i),Pc(n,i);break;default:t("Unsupported browser!");break}return s}var rv=bp({window:typeof window>"u"?void 0:window}),ou=rv;function os(n,e,t,i){Object.defineProperty(n,e,{get:t,set:i,enumerable:!0,configurable:!0})}var Lc=class{constructor(){this.chunkedMTU=16300,this._dataCount=1,this.chunk=e=>{let t=[],i=e.byteLength,s=Math.ceil(i/this.chunkedMTU),r=0,o=0;for(;o<i;){let a=Math.min(i,o+this.chunkedMTU),c=e.slice(o,a),l={__peerData:this._dataCount,n:r,data:c,total:s};t.push(l),o=a,r++}return this._dataCount++,t}}};function ov(n){let e=0;for(let s of n)e+=s.byteLength;let t=new Uint8Array(e),i=0;for(let s of n)t.set(s,i),i+=s.byteLength;return t}var au=ou.default||ou,so=new class{isWebRTCSupported(){return typeof RTCPeerConnection<"u"}isBrowserSupported(){let n=this.getBrowser(),e=this.getVersion();return this.supportedBrowsers.includes(n)?n==="chrome"?e>=this.minChromeVersion:n==="firefox"?e>=this.minFirefoxVersion:n==="safari"?!this.isIOS&&e>=this.minSafariVersion:!1:!1}getBrowser(){return au.browserDetails.browser}getVersion(){return au.browserDetails.version||0}isUnifiedPlanSupported(){let n=this.getBrowser(),e=au.browserDetails.version||0;if(n==="chrome"&&e<this.minChromeVersion)return!1;if(n==="firefox"&&e>=this.minFirefoxVersion)return!0;if(!window.RTCRtpTransceiver||!("currentDirection"in RTCRtpTransceiver.prototype))return!1;let t,i=!1;try{t=new RTCPeerConnection,t.addTransceiver("audio"),i=!0}catch{}finally{t&&t.close()}return i}toString(){return`Supports:
    browser:${this.getBrowser()}
    version:${this.getVersion()}
    isIOS:${this.isIOS}
    isWebRTCSupported:${this.isWebRTCSupported()}
    isBrowserSupported:${this.isBrowserSupported()}
    isUnifiedPlanSupported:${this.isUnifiedPlanSupported()}`}constructor(){this.isIOS=typeof navigator<"u"?["iPad","iPhone","iPod"].includes(navigator.platform):!1,this.supportedBrowsers=["firefox","chrome","safari"],this.minFirefoxVersion=59,this.minChromeVersion=72,this.minSafariVersion=605}},av=n=>!n||/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(n),Mp=()=>Math.random().toString(36).slice(2),Sp={iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:["turn:eu-0.turn.peerjs.com:3478","turn:us-0.turn.peerjs.com:3478"],username:"peerjs",credential:"peerjsp"}],sdpSemantics:"unified-plan"},cu=class extends Lc{noop(){}blobToArrayBuffer(e,t){let i=new FileReader;return i.onload=function(s){s.target&&t(s.target.result)},i.readAsArrayBuffer(e),i}binaryStringToArrayBuffer(e){let t=new Uint8Array(e.length);for(let i=0;i<e.length;i++)t[i]=e.charCodeAt(i)&255;return t.buffer}isSecure(){return location.protocol==="https:"}constructor(...e){super(...e),this.CLOUD_HOST="0.peerjs.com",this.CLOUD_PORT=443,this.chunkedBrowsers={Chrome:1,chrome:1},this.defaultConfig=Sp,this.browser=so.getBrowser(),this.browserVersion=so.getVersion(),this.pack=Rh,this.unpack=Ch,this.supports=(function(){let t={browser:so.isBrowserSupported(),webRTC:so.isWebRTCSupported(),audioVideo:!1,data:!1,binaryBlob:!1,reliable:!1};if(!t.webRTC)return t;let i;try{i=new RTCPeerConnection(Sp),t.audioVideo=!0;let s;try{s=i.createDataChannel("_PEERJSTEST",{ordered:!0}),t.data=!0,t.reliable=!!s.ordered;try{s.binaryType="blob",t.binaryBlob=!so.isIOS}catch{}}catch{}finally{s&&s.close()}}catch{}finally{i&&i.close()}return t})(),this.validateId=av,this.randomToken=Mp}},dn=new cu,cv="PeerJS: ";var lu=class{get logLevel(){return this._logLevel}set logLevel(e){this._logLevel=e}log(...e){this._logLevel>=3&&this._print(3,...e)}warn(...e){this._logLevel>=2&&this._print(2,...e)}error(...e){this._logLevel>=1&&this._print(1,...e)}setLogFunction(e){this._print=e}_print(e,...t){let i=[cv,...t];for(let s in i)i[s]instanceof Error&&(i[s]="("+i[s].name+") "+i[s].message);e>=3?console.log(...i):e>=2?console.warn("WARNING",...i):e>=1&&console.error("ERROR",...i)}constructor(){this._logLevel=0}},Pe=new lu,bu={},lv=Object.prototype.hasOwnProperty,an="~";function co(){}Object.create&&(co.prototype=Object.create(null),new co().__proto__||(an=!1));function hv(n,e,t){this.fn=n,this.context=e,this.once=t||!1}function Tp(n,e,t,i,s){if(typeof t!="function")throw new TypeError("The listener must be a function");var r=new hv(t,i||n,s),o=an?an+e:e;return n._events[o]?n._events[o].fn?n._events[o]=[n._events[o],r]:n._events[o].push(r):(n._events[o]=r,n._eventsCount++),n}function Ic(n,e){--n._eventsCount===0?n._events=new co:delete n._events[e]}function Qt(){this._events=new co,this._eventsCount=0}Qt.prototype.eventNames=function(){var e=[],t,i;if(this._eventsCount===0)return e;for(i in t=this._events)lv.call(t,i)&&e.push(an?i.slice(1):i);return Object.getOwnPropertySymbols?e.concat(Object.getOwnPropertySymbols(t)):e};Qt.prototype.listeners=function(e){var t=an?an+e:e,i=this._events[t];if(!i)return[];if(i.fn)return[i.fn];for(var s=0,r=i.length,o=new Array(r);s<r;s++)o[s]=i[s].fn;return o};Qt.prototype.listenerCount=function(e){var t=an?an+e:e,i=this._events[t];return i?i.fn?1:i.length:0};Qt.prototype.emit=function(e,t,i,s,r,o){var a=an?an+e:e;if(!this._events[a])return!1;var c=this._events[a],l=arguments.length,u,f;if(c.fn){switch(c.once&&this.removeListener(e,c.fn,void 0,!0),l){case 1:return c.fn.call(c.context),!0;case 2:return c.fn.call(c.context,t),!0;case 3:return c.fn.call(c.context,t,i),!0;case 4:return c.fn.call(c.context,t,i,s),!0;case 5:return c.fn.call(c.context,t,i,s,r),!0;case 6:return c.fn.call(c.context,t,i,s,r,o),!0}for(f=1,u=new Array(l-1);f<l;f++)u[f-1]=arguments[f];c.fn.apply(c.context,u)}else{var d=c.length,g;for(f=0;f<d;f++)switch(c[f].once&&this.removeListener(e,c[f].fn,void 0,!0),l){case 1:c[f].fn.call(c[f].context);break;case 2:c[f].fn.call(c[f].context,t);break;case 3:c[f].fn.call(c[f].context,t,i);break;case 4:c[f].fn.call(c[f].context,t,i,s);break;default:if(!u)for(g=1,u=new Array(l-1);g<l;g++)u[g-1]=arguments[g];c[f].fn.apply(c[f].context,u)}}return!0};Qt.prototype.on=function(e,t,i){return Tp(this,e,t,i,!1)};Qt.prototype.once=function(e,t,i){return Tp(this,e,t,i,!0)};Qt.prototype.removeListener=function(e,t,i,s){var r=an?an+e:e;if(!this._events[r])return this;if(!t)return Ic(this,r),this;var o=this._events[r];if(o.fn)o.fn===t&&(!s||o.once)&&(!i||o.context===i)&&Ic(this,r);else{for(var a=0,c=[],l=o.length;a<l;a++)(o[a].fn!==t||s&&!o[a].once||i&&o[a].context!==i)&&c.push(o[a]);c.length?this._events[r]=c.length===1?c[0]:c:Ic(this,r)}return this};Qt.prototype.removeAllListeners=function(e){var t;return e?(t=an?an+e:e,this._events[t]&&Ic(this,t)):(this._events=new co,this._eventsCount=0),this};Qt.prototype.off=Qt.prototype.removeListener;Qt.prototype.addListener=Qt.prototype.on;Qt.prefixed=an;Qt.EventEmitter=Qt;bu=Qt;var as={};os(as,"ConnectionType",()=>Gi);os(as,"PeerErrorType",()=>Lt);os(as,"BaseConnectionErrorType",()=>hu);os(as,"DataConnectionErrorType",()=>Su);os(as,"SerializationType",()=>Fc);os(as,"SocketEventType",()=>zi);os(as,"ServerMessageType",()=>Kt);var Gi=(function(n){return n.Data="data",n.Media="media",n})({}),Lt=(function(n){return n.BrowserIncompatible="browser-incompatible",n.Disconnected="disconnected",n.InvalidID="invalid-id",n.InvalidKey="invalid-key",n.Network="network",n.PeerUnavailable="peer-unavailable",n.SslUnavailable="ssl-unavailable",n.ServerError="server-error",n.SocketError="socket-error",n.SocketClosed="socket-closed",n.UnavailableID="unavailable-id",n.WebRTC="webrtc",n})({}),hu=(function(n){return n.NegotiationFailed="negotiation-failed",n.ConnectionClosed="connection-closed",n})({}),Su=(function(n){return n.NotOpenYet="not-open-yet",n.MessageToBig="message-too-big",n})({}),Fc=(function(n){return n.Binary="binary",n.BinaryUTF8="binary-utf8",n.JSON="json",n.None="raw",n})({}),zi=(function(n){return n.Message="message",n.Disconnected="disconnected",n.Error="error",n.Close="close",n})({}),Kt=(function(n){return n.Heartbeat="HEARTBEAT",n.Candidate="CANDIDATE",n.Offer="OFFER",n.Answer="ANSWER",n.Open="OPEN",n.Error="ERROR",n.IdTaken="ID-TAKEN",n.InvalidKey="INVALID-KEY",n.Leave="LEAVE",n.Expire="EXPIRE",n})({}),Ep="1.5.5",uu=class extends bu.EventEmitter{constructor(e,t,i,s,r,o=5e3){super(),this.pingInterval=o,this._disconnected=!0,this._messagesQueue=[];let a=e?"wss://":"ws://";this._baseUrl=a+t+":"+i+s+"peerjs?key="+r}start(e,t){this._id=e;let i=`${this._baseUrl}&id=${e}&token=${t}`;this._socket||!this._disconnected||(this._socket=new WebSocket(i+"&version="+Ep),this._disconnected=!1,this._socket.onmessage=s=>{let r;try{r=JSON.parse(s.data),Pe.log("Server message received:",r)}catch{Pe.log("Invalid server message",s.data);return}this.emit(zi.Message,r)},this._socket.onclose=s=>{this._disconnected||(Pe.log("Socket closed.",s),this._cleanup(),this._disconnected=!0,this.emit(zi.Disconnected))},this._socket.onopen=()=>{this._disconnected||(this._sendQueuedMessages(),Pe.log("Socket open"),this._scheduleHeartbeat())})}_scheduleHeartbeat(){this._wsPingTimer=setTimeout(()=>{this._sendHeartbeat()},this.pingInterval)}_sendHeartbeat(){if(!this._wsOpen()){Pe.log("Cannot send heartbeat, because socket closed");return}let e=JSON.stringify({type:Kt.Heartbeat});this._socket.send(e),this._scheduleHeartbeat()}_wsOpen(){return!!this._socket&&this._socket.readyState===1}_sendQueuedMessages(){let e=[...this._messagesQueue];this._messagesQueue=[];for(let t of e)this.send(t)}send(e){if(this._disconnected)return;if(!this._id){this._messagesQueue.push(e);return}if(!e.type){this.emit(zi.Error,"Invalid message");return}if(!this._wsOpen())return;let t=JSON.stringify(e);this._socket.send(t)}close(){this._disconnected||(this._cleanup(),this._disconnected=!0)}_cleanup(){this._socket&&(this._socket.onopen=this._socket.onmessage=this._socket.onclose=null,this._socket.close(),this._socket=void 0),clearTimeout(this._wsPingTimer)}},Dc=class{constructor(e){this.connection=e}startConnection(e){let t=this._startPeerConnection();if(this.connection.peerConnection=t,this.connection.type===Gi.Media&&e._stream&&this._addTracksToConnection(e._stream,t),e.originator){let i=this.connection,s={ordered:!!e.reliable},r=t.createDataChannel(i.label,s);i._initializeDataChannel(r),this._makeOffer()}else this.handleSDP("OFFER",e.sdp)}_startPeerConnection(){Pe.log("Creating RTCPeerConnection.");let e=new RTCPeerConnection(this.connection.provider.options.config);return this._setupListeners(e),e}_setupListeners(e){let t=this.connection.peer,i=this.connection.connectionId,s=this.connection.type,r=this.connection.provider;Pe.log("Listening for ICE candidates."),e.onicecandidate=o=>{!o.candidate||!o.candidate.candidate||(Pe.log(`Received ICE candidates for ${t}:`,o.candidate),r.socket.send({type:Kt.Candidate,payload:{candidate:o.candidate,type:s,connectionId:i},dst:t}))},e.oniceconnectionstatechange=()=>{switch(e.iceConnectionState){case"failed":Pe.log("iceConnectionState is failed, closing connections to "+t),this.connection.emitError(hu.NegotiationFailed,"Negotiation of connection to "+t+" failed."),this.connection.close();break;case"closed":Pe.log("iceConnectionState is closed, closing connections to "+t),this.connection.emitError(hu.ConnectionClosed,"Connection to "+t+" closed."),this.connection.close();break;case"disconnected":Pe.log("iceConnectionState changed to disconnected on the connection with "+t);break;case"completed":e.onicecandidate=()=>{};break}this.connection.emit("iceStateChanged",e.iceConnectionState)},Pe.log("Listening for data channel"),e.ondatachannel=o=>{Pe.log("Received data channel");let a=o.channel;r.getConnection(t,i)._initializeDataChannel(a)},Pe.log("Listening for remote stream"),e.ontrack=o=>{Pe.log("Received remote stream");let a=o.streams[0],c=r.getConnection(t,i);if(c.type===Gi.Media){let l=c;this._addStreamToMediaConnection(a,l)}}}cleanup(){Pe.log("Cleaning up PeerConnection to "+this.connection.peer);let e=this.connection.peerConnection;if(!e)return;this.connection.peerConnection=null,e.onicecandidate=e.oniceconnectionstatechange=e.ondatachannel=e.ontrack=()=>{};let t=e.signalingState!=="closed",i=!1,s=this.connection.dataChannel;s&&(i=!!s.readyState&&s.readyState!=="closed"),(t||i)&&e.close()}async _makeOffer(){let e=this.connection.peerConnection,t=this.connection.provider;try{let i=await e.createOffer(this.connection.options.constraints);Pe.log("Created offer."),this.connection.options.sdpTransform&&typeof this.connection.options.sdpTransform=="function"&&(i.sdp=this.connection.options.sdpTransform(i.sdp)||i.sdp);try{await e.setLocalDescription(i),Pe.log("Set localDescription:",i,`for:${this.connection.peer}`);let s={sdp:i,type:this.connection.type,connectionId:this.connection.connectionId,metadata:this.connection.metadata};if(this.connection.type===Gi.Data){let r=this.connection;s={...s,label:r.label,reliable:r.reliable,serialization:r.serialization}}t.socket.send({type:Kt.Offer,payload:s,dst:this.connection.peer})}catch(s){s!="OperationError: Failed to set local offer sdp: Called in wrong state: kHaveRemoteOffer"&&(t.emitError(Lt.WebRTC,s),Pe.log("Failed to setLocalDescription, ",s))}}catch(i){t.emitError(Lt.WebRTC,i),Pe.log("Failed to createOffer, ",i)}}async _makeAnswer(){let e=this.connection.peerConnection,t=this.connection.provider;try{let i=await e.createAnswer();Pe.log("Created answer."),this.connection.options.sdpTransform&&typeof this.connection.options.sdpTransform=="function"&&(i.sdp=this.connection.options.sdpTransform(i.sdp)||i.sdp);try{await e.setLocalDescription(i),Pe.log("Set localDescription:",i,`for:${this.connection.peer}`),t.socket.send({type:Kt.Answer,payload:{sdp:i,type:this.connection.type,connectionId:this.connection.connectionId},dst:this.connection.peer})}catch(s){t.emitError(Lt.WebRTC,s),Pe.log("Failed to setLocalDescription, ",s)}}catch(i){t.emitError(Lt.WebRTC,i),Pe.log("Failed to create answer, ",i)}}async handleSDP(e,t){t=new RTCSessionDescription(t);let i=this.connection.peerConnection,s=this.connection.provider;Pe.log("Setting remote description",t);let r=this;try{await i.setRemoteDescription(t),Pe.log(`Set remoteDescription:${e} for:${this.connection.peer}`),e==="OFFER"&&await r._makeAnswer()}catch(o){s.emitError(Lt.WebRTC,o),Pe.log("Failed to setRemoteDescription, ",o)}}async handleCandidate(e){Pe.log("handleCandidate:",e);try{await this.connection.peerConnection.addIceCandidate(e),Pe.log(`Added ICE candidate for:${this.connection.peer}`)}catch(t){this.connection.provider.emitError(Lt.WebRTC,t),Pe.log("Failed to handleCandidate, ",t)}}_addTracksToConnection(e,t){if(Pe.log(`add tracks from stream ${e.id} to peer connection`),!t.addTrack)return Pe.error("Your browser does't support RTCPeerConnection#addTrack. Ignored.");e.getTracks().forEach(i=>{t.addTrack(i,e)})}_addStreamToMediaConnection(e,t){Pe.log(`add stream ${e.id} to media connection ${t.connectionId}`),t.addStream(e)}},Nc=class extends bu.EventEmitter{emitError(e,t){Pe.error("Error:",t),this.emit("error",new du(`${e}`,t))}},du=class extends Error{constructor(e,t){typeof t=="string"?super(t):(super(),Object.assign(this,t)),this.type=e}},Uc=class extends Nc{get open(){return this._open}constructor(e,t,i){super(),this.peer=e,this.provider=t,this.options=i,this._open=!1,this.metadata=i.metadata}},xu,oo=class oo extends Uc{get type(){return Gi.Media}get localStream(){return this._localStream}get remoteStream(){return this._remoteStream}constructor(e,t,i){super(e,t,i),this._localStream=this.options._stream,this.connectionId=this.options.connectionId||oo.ID_PREFIX+dn.randomToken(),this._negotiator=new Dc(this),this._localStream&&this._negotiator.startConnection({_stream:this._localStream,originator:!0})}_initializeDataChannel(e){this.dataChannel=e,this.dataChannel.onopen=()=>{Pe.log(`DC#${this.connectionId} dc connection success`),this.emit("willCloseOnRemote")},this.dataChannel.onclose=()=>{Pe.log(`DC#${this.connectionId} dc closed for:`,this.peer),this.close()}}addStream(e){Pe.log("Receiving stream",e),this._remoteStream=e,super.emit("stream",e)}handleMessage(e){let t=e.type,i=e.payload;switch(e.type){case Kt.Answer:this._negotiator.handleSDP(t,i.sdp),this._open=!0;break;case Kt.Candidate:this._negotiator.handleCandidate(i.candidate);break;default:Pe.warn(`Unrecognized message type:${t} from peer:${this.peer}`);break}}answer(e,t={}){if(this._localStream){Pe.warn("Local stream already exists on this MediaConnection. Are you answering a call twice?");return}this._localStream=e,t&&t.sdpTransform&&(this.options.sdpTransform=t.sdpTransform),this._negotiator.startConnection({...this.options._payload,_stream:e});let i=this.provider._getMessages(this.connectionId);for(let s of i)this.handleMessage(s);this._open=!0}close(){this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this._localStream=null,this._remoteStream=null,this.provider&&(this.provider._removeConnection(this),this.provider=null),this.options&&this.options._stream&&(this.options._stream=null),this.open&&(this._open=!1,super.emit("close"))}};xu=new WeakMap,or(oo,xu,oo.ID_PREFIX="mc_");var kc=oo,fu=class{constructor(e){this._options=e}_buildRequest(e){let t=this._options.secure?"https":"http",{host:i,port:s,path:r,key:o}=this._options,a=new URL(`${t}://${i}:${s}${r}${o}/${e}`);return a.searchParams.set("ts",`${Date.now()}${Math.random()}`),a.searchParams.set("version",Ep),fetch(a.href,{referrerPolicy:this._options.referrerPolicy})}async retrieveId(){try{let e=await this._buildRequest("id");if(e.status!==200)throw new Error(`Error. Status:${e.status}`);return e.text()}catch(e){Pe.error("Error retrieving ID",e);let t="";throw this._options.path==="/"&&this._options.host!==dn.CLOUD_HOST&&(t=" If you passed in a `path` to your self-hosted PeerServer, you'll also need to pass in that same path when creating a new Peer."),new Error("Could not get an ID from the server."+t)}}async listAllPeers(){try{let e=await this._buildRequest("peers");if(e.status!==200){if(e.status===401){let t="";throw this._options.host===dn.CLOUD_HOST?t="It looks like you're using the cloud server. You can email team@peerjs.com to enable peer listing for your API key.":t="You need to enable `allow_discovery` on your self-hosted PeerServer to use this feature.",new Error("It doesn't look like you have permission to list peers IDs. "+t)}throw new Error(`Error. Status:${e.status}`)}return e.json()}catch(e){throw Pe.error("Error retrieving list peers",e),new Error("Could not get list peers from the server."+e)}}},_u,yu,rs=class rs extends Uc{get type(){return Gi.Data}constructor(e,t,i){super(e,t,i),this.connectionId=this.options.connectionId||rs.ID_PREFIX+Mp(),this.label=this.options.label||this.connectionId,this.reliable=!!this.options.reliable,this._negotiator=new Dc(this),this._negotiator.startConnection(this.options._payload||{originator:!0,reliable:this.reliable})}_initializeDataChannel(e){this.dataChannel=e,this.dataChannel.onopen=()=>{Pe.log(`DC#${this.connectionId} dc connection success`),this._open=!0,this.emit("open")},this.dataChannel.onmessage=t=>{Pe.log(`DC#${this.connectionId} dc onmessage:`,t.data)},this.dataChannel.onclose=()=>{Pe.log(`DC#${this.connectionId} dc closed for:`,this.peer),this.close()}}close(e){if(e?.flush){this.send({__peerData:{type:"close"}});return}this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this.provider&&(this.provider._removeConnection(this),this.provider=null),this.dataChannel&&(this.dataChannel.onopen=null,this.dataChannel.onmessage=null,this.dataChannel.onclose=null,this.dataChannel=null),this.open&&(this._open=!1,super.emit("close"))}send(e,t=!1){if(!this.open){this.emitError(Su.NotOpenYet,"Connection is not open. You should listen for the `open` event before sending messages.");return}return this._send(e,t)}async handleMessage(e){let t=e.payload;switch(e.type){case Kt.Answer:await this._negotiator.handleSDP(e.type,t.sdp);break;case Kt.Candidate:await this._negotiator.handleCandidate(t.candidate);break;default:Pe.warn("Unrecognized message type:",e.type,"from peer:",this.peer);break}}};_u=new WeakMap,yu=new WeakMap,or(rs,_u,rs.ID_PREFIX="dc_"),or(rs,yu,rs.MAX_BUFFERED_AMOUNT=8388608);var Oc=rs,lo=class extends Oc{get bufferSize(){return this._bufferSize}_initializeDataChannel(e){super._initializeDataChannel(e),this.dataChannel.binaryType="arraybuffer",this.dataChannel.addEventListener("message",t=>this._handleDataMessage(t))}_bufferedSend(e){(this._buffering||!this._trySend(e))&&(this._buffer.push(e),this._bufferSize=this._buffer.length)}_trySend(e){if(!this.open)return!1;if(this.dataChannel.bufferedAmount>Oc.MAX_BUFFERED_AMOUNT)return this._buffering=!0,setTimeout(()=>{this._buffering=!1,this._tryBuffer()},50),!1;try{this.dataChannel.send(e)}catch(t){return Pe.error(`DC#:${this.connectionId} Error when sending:`,t),this._buffering=!0,this.close(),!1}return!0}_tryBuffer(){if(!this.open||this._buffer.length===0)return;let e=this._buffer[0];this._trySend(e)&&(this._buffer.shift(),this._bufferSize=this._buffer.length,this._tryBuffer())}close(e){if(e?.flush){this.send({__peerData:{type:"close"}});return}this._buffer=[],this._bufferSize=0,super.close()}constructor(...e){super(...e),this._buffer=[],this._bufferSize=0,this._buffering=!1}},ro=class extends lo{close(e){super.close(e),this._chunkedData={}}constructor(e,t,i){super(e,t,i),this.chunker=new Lc,this.serialization=Fc.Binary,this._chunkedData={}}_handleDataMessage({data:e}){let t=Ch(e),i=t.__peerData;if(i){if(i.type==="close"){this.close();return}this._handleChunk(t);return}this.emit("data",t)}_handleChunk(e){let t=e.__peerData,i=this._chunkedData[t]||{data:[],count:0,total:e.total};if(i.data[e.n]=new Uint8Array(e.data),i.count++,this._chunkedData[t]=i,i.total===i.count){delete this._chunkedData[t];let s=ov(i.data);this._handleDataMessage({data:s})}}_send(e,t){let i=Rh(e);if(i instanceof Promise)return this._send_blob(i);if(!t&&i.byteLength>this.chunker.chunkedMTU){this._sendChunks(i);return}this._bufferedSend(i)}async _send_blob(e){let t=await e;if(t.byteLength>this.chunker.chunkedMTU){this._sendChunks(t);return}this._bufferedSend(t)}_sendChunks(e){let t=this.chunker.chunk(e);Pe.log(`DC#${this.connectionId} Try to send ${t.length} chunks...`);for(let i of t)this.send(i,!0)}},pu=class extends lo{_handleDataMessage({data:e}){super.emit("data",e)}_send(e,t){this._bufferedSend(e)}constructor(...e){super(...e),this.serialization=Fc.None}},mu=class extends lo{_handleDataMessage({data:e}){let t=this.parse(this.decoder.decode(e)),i=t.__peerData;if(i&&i.type==="close"){this.close();return}this.emit("data",t)}_send(e,t){let i=this.encoder.encode(this.stringify(e));if(i.byteLength>=dn.chunkedMTU){this.emitError(Su.MessageToBig,"Message too big for JSON channel");return}this._bufferedSend(i)}constructor(...e){super(...e),this.serialization=Fc.JSON,this.encoder=new TextEncoder,this.decoder=new TextDecoder,this.stringify=JSON.stringify,this.parse=JSON.parse}};var vu,ao=class ao extends Nc{get id(){return this._id}get options(){return this._options}get open(){return this._open}get socket(){return this._socket}get connections(){let e=Object.create(null);for(let[t,i]of this._connections)e[t]=i;return e}get destroyed(){return this._destroyed}get disconnected(){return this._disconnected}constructor(e,t){super(),this._serializers={raw:pu,json:mu,binary:ro,"binary-utf8":ro,default:ro},this._id=null,this._lastServerId=null,this._destroyed=!1,this._disconnected=!1,this._open=!1,this._connections=new Map,this._lostMessages=new Map;let i;if(e&&e.constructor==Object?t=e:e&&(i=e.toString()),t={debug:0,host:dn.CLOUD_HOST,port:dn.CLOUD_PORT,path:"/",key:ao.DEFAULT_KEY,token:dn.randomToken(),config:dn.defaultConfig,referrerPolicy:"strict-origin-when-cross-origin",serializers:{},...t},this._options=t,this._serializers={...this._serializers,...this.options.serializers},this._options.host==="/"&&(this._options.host=window.location.hostname),this._options.path&&(this._options.path[0]!=="/"&&(this._options.path="/"+this._options.path),this._options.path[this._options.path.length-1]!=="/"&&(this._options.path+="/")),this._options.secure===void 0&&this._options.host!==dn.CLOUD_HOST?this._options.secure=dn.isSecure():this._options.host==dn.CLOUD_HOST&&(this._options.secure=!0),this._options.logFunction&&Pe.setLogFunction(this._options.logFunction),Pe.logLevel=this._options.debug||0,this._api=new fu(t),this._socket=this._createServerConnection(),!dn.supports.audioVideo&&!dn.supports.data){this._delayedAbort(Lt.BrowserIncompatible,"The current browser does not support WebRTC");return}if(i&&!dn.validateId(i)){this._delayedAbort(Lt.InvalidID,`ID "${i}" is invalid`);return}i?this._initialize(i):this._api.retrieveId().then(s=>this._initialize(s)).catch(s=>this._abort(Lt.ServerError,s))}_createServerConnection(){let e=new uu(this._options.secure,this._options.host,this._options.port,this._options.path,this._options.key,this._options.pingInterval);return e.on(zi.Message,t=>{this._handleMessage(t)}),e.on(zi.Error,t=>{this._abort(Lt.SocketError,t)}),e.on(zi.Disconnected,()=>{this.disconnected||(this.emitError(Lt.Network,"Lost connection to server."),this.disconnect())}),e.on(zi.Close,()=>{this.disconnected||this._abort(Lt.SocketClosed,"Underlying socket is already closed.")}),e}_initialize(e){this._id=e,this.socket.start(e,this._options.token)}_handleMessage(e){let t=e.type,i=e.payload,s=e.src;switch(t){case Kt.Open:this._lastServerId=this.id,this._open=!0,this.emit("open",this.id);break;case Kt.Error:this._abort(Lt.ServerError,i.msg);break;case Kt.IdTaken:this._abort(Lt.UnavailableID,`ID "${this.id}" is taken`);break;case Kt.InvalidKey:this._abort(Lt.InvalidKey,`API KEY "${this._options.key}" is invalid`);break;case Kt.Leave:Pe.log(`Received leave message from ${s}`),this._cleanupPeer(s),this._connections.delete(s);break;case Kt.Expire:this.emitError(Lt.PeerUnavailable,`Could not connect to peer ${s}`);break;case Kt.Offer:{let r=i.connectionId,o=this.getConnection(s,r);if(o&&(o.close(),Pe.warn(`Offer received for existing Connection ID:${r}`)),i.type===Gi.Media){let c=new kc(s,this,{connectionId:r,_payload:i,metadata:i.metadata});o=c,this._addConnection(s,o),this.emit("call",c)}else if(i.type===Gi.Data){let c=new this._serializers[i.serialization](s,this,{connectionId:r,_payload:i,metadata:i.metadata,label:i.label,serialization:i.serialization,reliable:i.reliable});o=c,this._addConnection(s,o),this.emit("connection",c)}else{Pe.warn(`Received malformed connection type:${i.type}`);return}let a=this._getMessages(r);for(let c of a)o.handleMessage(c);break}default:{if(!i){Pe.warn(`You received a malformed message from ${s} of type ${t}`);return}let r=i.connectionId,o=this.getConnection(s,r);o&&o.peerConnection?o.handleMessage(e):r?this._storeMessage(r,e):Pe.warn("You received an unrecognized message:",e);break}}}_storeMessage(e,t){this._lostMessages.has(e)||this._lostMessages.set(e,[]),this._lostMessages.get(e).push(t)}_getMessages(e){let t=this._lostMessages.get(e);return t?(this._lostMessages.delete(e),t):[]}connect(e,t={}){if(t={serialization:"default",...t},this.disconnected){Pe.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect, or call reconnect on this peer if you believe its ID to still be available."),this.emitError(Lt.Disconnected,"Cannot connect to new Peer after disconnecting from server.");return}let i=new this._serializers[t.serialization](e,this,t);return this._addConnection(e,i),i}call(e,t,i={}){if(this.disconnected){Pe.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect."),this.emitError(Lt.Disconnected,"Cannot connect to new Peer after disconnecting from server.");return}if(!t){Pe.error("To call a peer, you must provide a stream from your browser's `getUserMedia`.");return}let s=new kc(e,this,{...i,_stream:t});return this._addConnection(e,s),s}_addConnection(e,t){Pe.log(`add connection ${t.type}:${t.connectionId} to peerId:${e}`),this._connections.has(e)||this._connections.set(e,[]),this._connections.get(e).push(t)}_removeConnection(e){let t=this._connections.get(e.peer);if(t){let i=t.indexOf(e);i!==-1&&t.splice(i,1)}this._lostMessages.delete(e.connectionId)}getConnection(e,t){let i=this._connections.get(e);if(!i)return null;for(let s of i)if(s.connectionId===t)return s;return null}_delayedAbort(e,t){setTimeout(()=>{this._abort(e,t)},0)}_abort(e,t){Pe.error("Aborting!"),this.emitError(e,t),this._lastServerId?this.disconnect():this.destroy()}destroy(){this.destroyed||(Pe.log(`Destroy peer with ID:${this.id}`),this.disconnect(),this._cleanup(),this._destroyed=!0,this.emit("close"))}_cleanup(){for(let e of this._connections.keys())this._cleanupPeer(e),this._connections.delete(e);this.socket.removeAllListeners()}_cleanupPeer(e){let t=this._connections.get(e);if(t)for(let i of t)i.close()}disconnect(){if(this.disconnected)return;let e=this.id;Pe.log(`Disconnect peer with ID:${e}`),this._disconnected=!0,this._open=!1,this.socket.close(),this._lastServerId=e,this._id=null,this.emit("disconnected",e)}reconnect(){if(this.disconnected&&!this.destroyed)Pe.log(`Attempting reconnection to server with ID ${this._lastServerId}`),this._disconnected=!1,this._initialize(this._lastServerId);else{if(this.destroyed)throw new Error("This peer cannot reconnect to the server. It has already been destroyed.");if(!this.disconnected&&!this.open)Pe.error("In a hurry? We're still trying to make the initial connection!");else throw new Error(`Peer ${this.id} cannot reconnect because it is not disconnected from the server!`)}}listAllPeers(e=t=>{}){this._api.listAllPeers().then(t=>e(t)).catch(t=>this._abort(Lt.ServerError,t))}};vu=new WeakMap,or(ao,vu,ao.DEFAULT_KEY="peerjs");var gu=ao;var wp=gu;var ho=[{id:"chef",name:"Chef",emoji:"\u{1F468}\u200D\u{1F373}",tag:"kitchen",color:15921906,ab:"hint",abName:"Secret Recipe",abDesc:"Remove 2 wrong answers on a question (2 times).",charges:2},{id:"doctor",name:"Doctor",emoji:"\u{1FA7A}",tag:"clinic",color:4171680,ab:"revive",abName:"Revive",abDesc:"Bring back a caught teammate. Stand next to their body and press Q (once).",charges:1},{id:"librarian",name:"Librarian",emoji:"\u{1F4DA}",tag:"library",color:8081312,ab:"clue",abName:"Book of Secrets",abDesc:"Reveal one extra clue about the killer (once). Press Q.",charges:1},{id:"scientist",name:"Scientist",emoji:"\u{1F52C}",tag:"lab",color:15263976,ab:"danger",abName:"Danger Sense",abDesc:"Your screen pulses red when the killer is close (automatic).",charges:0},{id:"engineer",name:"Engineer",emoji:"\u{1F527}",tag:"workshop",color:15902976,ab:"second",abName:"Second Chance",abDesc:"A wrong answer will NOT power up the killer (2 times, automatic).",charges:2},{id:"detective",name:"Detective",emoji:"\u{1F575}\uFE0F",tag:"office",color:7031342,ab:"xray",abName:"X-Ray Eyes",abDesc:"See everyone through walls for 5 seconds. Press Q (45s recharge).",cd:45,dur:5},{id:"explorer",name:"Explorer",emoji:"\u{1F9ED}",tag:"outdoor",color:3967548,ab:"sprint",abName:"Super Sprint",abDesc:"Run much faster for 4 seconds. Press Q (25s recharge).",cd:25,dur:4},{id:"artist",name:"Artist",emoji:"\u{1F3A8}",tag:"art",color:14174826,ab:"lamp",abName:"Glow Lamp",abDesc:"Drop a bright lamp that glows for 40 seconds. Press Q (30s recharge).",cd:30,dur:40},{id:"dog",name:"Dog Handler",emoji:"\u{1F415}",tag:"outdoor",color:9067051,ab:"sniff",abName:"Sniff",abDesc:"Your dog sniffs out the nearest unfinished task. An arrow points the way for 8 seconds. Press Q (20s recharge).",cd:20,dur:8},{id:"magician",name:"Magician",emoji:"\u{1F9D9}",tag:"art",color:4927370,ab:"swap",abName:"Magic Swap",abDesc:"Swap places with the nearest teammate (within 14 steps). Great for escaping! Press Q (35s recharge).",cd:35},{id:"firefighter",name:"Firefighter",emoji:"\u{1F9D1}\u200D\u{1F692}",tag:"workshop",color:13712174,ab:"axe",abName:"Axe",abDesc:"Break open the nearest locked door, no question needed (2 times). Press Q.",charges:2},{id:"guard",name:"Guard",emoji:"\u{1F6E1}\uFE0F",tag:"office",color:3104691,ab:"shield",abName:"Shield",abDesc:"A shield protects you and teammates nearby from being caught for 5 seconds. Press Q (40s recharge).",cd:40,dur:5},{id:"musician",name:"Musician",emoji:"\u{1F3B5}",tag:"library",color:2072202,ab:"lullaby",abName:"Lullaby",abDesc:"Play a calm tune. The killer slows down for 6 seconds if close. Press Q (35s recharge).",cd:35,dur:6},{id:"radio",name:"Radio Operator",emoji:"\u{1F4E1}",tag:"lab",color:5925690,ab:"scan",abName:"Scan",abDesc:"Your radio shows where everyone is on the map for 5 seconds. Press Q (40s recharge).",cd:40,dur:5}],xn=n=>ho.find(e=>e.id===n)||ho[0],uv={kitchen:"Stove",clinic:"Hospital Bed",library:"Bookshelf",lab:"Lab Bench",workshop:"Workbench",office:"Desk",outdoor:"Supply Crates",art:"Easel"},Bc={school:{name:"Haunted School",emoji:"\u{1F3EB}",seed:11,indoor:!0,H:3.8,bg:263432,fog:.085,hemi:[4871288,1709330,.6],floor:[4867646,4209717],wall:7301467,ceil:2828839,trim:3814701,bulb:16770728,blood:6949900,pc:[8018490,6112816,4087658],props:["table","locker","shelf","crate","table"],hub:"Main Hall",exit:"Front Gate",rooms:{"0,0":["library","Library"],"1,0":["lab","Science Lab"],"2,0":["art","Art Room"],"0,1":["kitchen","Canteen"],"2,1":["clinic","Sick Bay"],"0,2":["workshop","Workshop"],"1,2":["outdoor","Gym"],"2,2":["office","Principal's Office"]},links:["11-10","11-01","11-21*","11-12","00-10","00-01*","20-10","02-01","22-21","22-12*"]},hospital:{name:"Abandoned Hospital",emoji:"\u{1F3E5}",seed:23,indoor:!0,H:3.6,bg:198408,fog:.09,hemi:[5933702,1055256,.6],floor:[8227462,7306360],wall:10334378,ceil:5201242,trim:6255213,bulb:13172720,blood:7343373,pc:[14212828,11057332,7177600],props:["bed","bed","locker","crate","table"],hub:"Reception",exit:"Ambulance Bay",rooms:{"0,0":["clinic","Patient Ward"],"1,0":["lab","Laboratory"],"2,0":["library","Records Room"],"0,1":["kitchen","Cafeteria"],"2,1":["workshop","Boiler Room"],"0,2":["art","Therapy Room"],"1,2":["office","Admin Office"],"2,2":["outdoor","Courtyard"]},links:["11-10","11-01*","11-21","11-12","00-10","00-01","10-20","20-21","02-12","02-01*","22-12","22-21*"]},mansion:{name:"Creepy Mansion",emoji:"\u{1F3DA}\uFE0F",seed:37,indoor:!0,H:5,bg:459526,fog:.075,hemi:[6963810,1838606,.6],floor:[5908014,4857638],wall:7030326,ceil:2758674,trim:10123818,bulb:16757594,blood:4851206,pc:[3810328,5913130,8006186],props:["couch","table","pillar","coffin","shelf"],hub:"Grand Hall",exit:"Front Door",rooms:{"0,0":["kitchen","Old Kitchen"],"1,0":["library","Grand Library"],"2,0":["art","Portrait Gallery"],"0,1":["workshop","Cellar Workshop"],"2,1":["lab","Alchemist's Study"],"0,2":["clinic","Sick Room"],"1,2":["office","Butler's Office"],"2,2":["outdoor","Conservatory"]},links:["11-10","11-01","11-21","11-12*","00-10","00-01","20-10*","20-21","02-01","22-12","22-21*","02-12"]},cabin:{name:"Dark Forest Cabin",emoji:"\u{1F332}",seed:53,indoor:!1,H:4.4,bg:132362,fog:.065,hemi:[4873882,1451546,.75],floor:[3428394,2835491],wall:1853992,ceil:0,trim:2759178,bulb:16751168,blood:5376008,pc:[3811866,4863522,2833186],props:["tree","log","tree","grave","crate"],hub:"Cabin Clearing",exit:"Forest Road",rooms:{"0,0":["workshop","Woodcutter's Shed"],"1,0":["outdoor","Old Graveyard"],"2,0":["library","Witch's Library"],"0,1":["kitchen","Campfire Kitchen"],"2,1":["clinic","Healer's Hut"],"0,2":["lab","Swamp Lab"],"1,2":["office","Ranger Station"],"2,2":["art","Painter's Cabin"]},links:["11-10*","11-01","11-21","11-12","00-10","20-21","02-01","22-12","22-21","10-20*","00-01*"]},asylum:{name:"Abandoned Asylum",emoji:"\u{1F9E0}",seed:71,indoor:!0,H:3.7,bg:197892,fog:.1,hemi:[6982258,1186324,.62],floor:[5925468,5135440],wall:9149062,ceil:2765356,trim:3884605,bulb:13625520,blood:5900296,pc:[10135706,7306352,5134928],props:["bed","locker","crate","table","pillar"],hub:"Central Ward",exit:"Main Gate",rooms:{"0,0":["clinic","Patient Cells"],"1,0":["lab","Treatment Room"],"2,0":["library","Records Archive"],"0,1":["kitchen","Mess Hall"],"2,1":["office","Director's Office"],"0,2":["workshop","Boiler Basement"],"1,2":["art","Therapy Room"],"2,2":["outdoor","Padded Block"]},links:["11-10","11-01*","11-21","11-12","00-10","00-01","20-10*","20-21","02-01","22-12*","22-21","02-12"],sn:{kitchen:"Rusty Stove",clinic:"Padded Bed",library:"Patient Files",lab:"Treatment Table",workshop:"Fuse Box",office:"Director's Desk",outdoor:"Supply Crates",art:"Drawing Wall"},story:"The patients are gone... but something is still walking the halls. Find the fuses before the lights die.",hazard:"blackout",hatch:["0,0","2,2"]},hotel:{name:"Haunted Hotel",emoji:"\u{1F3E8}",seed:83,indoor:!0,H:3.4,bg:328709,fog:.08,hemi:[6969928,1577488,.6],floor:[3099210,2506302],wall:10259050,ceil:2825240,trim:13214282,bulb:16765834,blood:3802373,pc:[6965808,9075290,3099210],props:["couch","table","pillar","shelf","bed"],hub:"Grand Lobby",exit:"Hotel Entrance",rooms:{"0,0":["clinic","Room 13"],"1,0":["library","Reading Lounge"],"2,0":["lab","Pool Pump Room"],"0,1":["kitchen","Hotel Kitchen"],"2,1":["office","Front Office"],"0,2":["workshop","Maintenance"],"1,2":["art","Ballroom"],"2,2":["outdoor","Luggage Store"]},links:["11-10","11-01","11-21*","11-12","00-10*","10-20","00-01","20-21","02-01*","02-12","22-12","22-21"],sn:{kitchen:"Hotel Stove",clinic:"Guest Bed",library:"Guest Book",lab:"Pool Chemicals",workshop:"Maintenance Bench",office:"Front Desk",outdoor:"Luggage Pile",art:"Painting Wall"},story:"Check-out time was 100 years ago. The doors here slam shut on their own... Keep moving.",hazard:"slam",hatch:["2,0","0,2"]},bunker:{name:"Underground Bunker",emoji:"\u{1F6A8}",seed:97,indoor:!0,H:3,bg:262915,fog:.09,hemi:[8010296,1312776,.5],floor:[5593694,4869971],wall:6975606,ceil:2895667,trim:9054762,bulb:16743002,blood:3801088,pc:[4870232,6975606,5913136],props:["crate","locker","shelf","table","pillar"],hub:"Command Hall",exit:"Blast Door",rooms:{"0,0":["lab","Reactor Lab"],"1,0":["clinic","Medical Bay"],"2,0":["library","Archive Vault"],"0,1":["kitchen","Ration Hall"],"2,1":["office","Radio Room"],"0,2":["workshop","Generator Room"],"1,2":["outdoor","Supply Depot"],"2,2":["art","Barracks"]},links:["11-10","11-01*","11-21","11-12*","00-10","10-20*","00-01","20-21","02-01","22-21*","02-12","22-12"],sn:{kitchen:"Ration Stove",clinic:"Medical Bunk",library:"Archive Terminal",lab:"Reactor Console",workshop:"Generator",office:"Radio Desk",outdoor:"Supply Lockers",art:"Wall Map"},story:"Deep underground, the air is bad and the siren will not stop. Avoid the green gas clouds!",hazard:"gas",hatch:["0,0","2,1"],gas:["1,0","0,1","1,2"]},carnival:{name:"Creepy Carnival",emoji:"\u{1F3AA}",seed:109,indoor:!0,H:6.2,bg:459530,fog:.07,hemi:[8014474,1706528,.65],floor:[6957658,4857928],wall:10107450,ceil:2756656,trim:14725168,bulb:16765183,blood:5245450,pc:[14725168,11553354,4864650],props:["crate","table","pillar","log","couch"],hub:"Midway Square",exit:"Main Gate",rooms:{"0,0":["library","Ticket Office"],"1,0":["lab","Mirror Maze"],"2,0":["kitchen","Candy Stall"],"0,1":["clinic","Fortune Teller Tent"],"2,1":["office","Ringmaster's Wagon"],"0,2":["workshop","Ride Repair Shed"],"1,2":["art","Clown Tent"],"2,2":["outdoor","Prize Crates"]},links:["11-10","11-01","11-21","11-12","00-10*","10-20","00-01*","20-21","02-01","22-21*","02-12*","22-12"],sn:{kitchen:"Popcorn Machine",clinic:"Fortune Teller's Table",library:"Ticket Booth",lab:"Mirror Panel",workshop:"Ride Control Box",office:"Ringmaster's Desk",outdoor:"Prize Crates",art:"Face-Paint Stand"},story:"The show never ended... and the clown is still laughing. The funhouse mirrors play tricks on your map!",hazard:"mirror",hatch:["2,0","0,2"]},graveyard:{name:"Stormy Graveyard & Chapel",emoji:"\u26C8\uFE0F",seed:127,indoor:!1,H:4.2,bg:197900,fog:.07,hemi:[5925530,923168,.72],floor:[2897966,2437417],wall:3164220,ceil:0,trim:3816004,bulb:11061503,blood:4851720,pc:[5922662,3817286,4868666],props:["grave","grave","tree","coffin","crate","log"],hub:"Chapel Courtyard",exit:"Cemetery Gate",rooms:{"0,0":["workshop","Gravedigger's Hut"],"1,0":["library","Chapel Library"],"2,0":["art","Stained-Glass Hall"],"0,1":["clinic","Crypt"],"2,1":["lab","Bell Tower"],"0,2":["kitchen","Caretaker's Kitchen"],"1,2":["office","Vicar's Study"],"2,2":["outdoor","Old Graves"]},links:["11-10","11-01","11-21*","11-12","00-10*","10-20","00-01","20-21","02-01*","02-12","22-12","22-21*"],sn:{kitchen:"Cold Hearth",clinic:"Stone Coffin",library:"Burial Records",lab:"Bell Ropes",workshop:"Digger's Bench",office:"Vicar's Desk",outdoor:"Flower Crates",art:"Stained-Glass Panel"},story:"A storm is rolling over the old chapel... Lightning flashes, thunder cracks, and something is moving between the graves. Stay together... or not.",hazard:"storm",hatch:["0,0","2,1"]}},tT=Object.keys(Bc).map(n=>({id:n,name:Bc[n].name,emoji:Bc[n].emoji}));function dv(n){let e=n>>>0;return()=>{e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function _i(n,e){let t=Math.min(255,Math.round((n>>16&255)*e)),i=Math.min(255,Math.round((n>>8&255)*e)),s=Math.min(255,Math.round((n&255)*e));return t<<16|i<<8|s}var fv={table:{w:1.8,h:.8,d:1},couch:{w:2.2,h:.8,d:.9},crate:{w:1,h:1,d:1},bed:{w:2,h:.55,d:.95},coffin:{w:.9,h:.7,d:2},log:{w:2.4,h:.5,d:.55},grave:{w:.8,h:1.1,d:.25},pillar:{w:.7,h:-1,d:.7},tree:{w:.5,h:3.2,d:.5},shelf:{w:.6,h:2.1,d:2.2,wall:!0},locker:{w:.6,h:2,d:1.6,wall:!0}};function Ap(n,e){let t=Bc[n],i=!!(e&&e.lockAll),s=dv(t.seed),r=t.H,o=[],a=[],c=[],l=[],u=[],f=[],d=[],g=[],x=(R,P,U,F,G,te,ce,Ae,j,le)=>R.push({s:P,x:U,y:F+ce/2,z:G,w:te,h:ce,d:Ae,c:j,f:le||0}),y=(R,P,U,F,G,te,ce)=>x(o,"b",R,P,U,F,G,te,ce),p=(R,P,U,F,G,te,ce,Ae)=>x(a,"b",R,P,U,F,G,te,ce,Ae),m=(R,P,U,F)=>c.push({x0:R,z0:P,x1:U,z1:F}),v=[];for(let R=0;R<3;R++)for(let P=0;P<3;P++)v.push([P,R]);v.push([1,3]);let E=(R,P)=>R>=0&&R<3&&P>=0&&P<3||R===1&&P===3,M=(R,P)=>R<P?R+"-"+P:P+"-"+R,w=new Map;for(let R of t.links)w.set(M(R.slice(0,2),R.slice(3,5)),{locked:R.endsWith("*")||i});w.set(M("12","13"),{gate:!0});for(let[R,P]of v){let U=R*16,F=P*16,G="hub",te=t.hub,ce="hub";if(R===1&&P===3)G="exit",te=t.exit,ce="exit";else if(!(R===1&&P===1)){let Ae=t.rooms[R+","+P];G=Ae[0],te=Ae[1],ce="room"}u.push({cell:""+R+P,c:R,r:P,tag:G,name:te,kind:ce,x0:U,z0:F,x1:U+16,z1:F+16,cx:U+16/2,cz:F+16/2})}let A=(t.hatch||[]).map((R,P)=>{let U=u.find(F=>F.c+","+F.r===R);return{id:P,room:u.indexOf(U),x:U.x1-2.4,z:U.z0+2.4,ox:U.x1-4.6,oz:U.z0+4.6}}),_=(t.gas||[]).map(R=>{let P=u.find(U=>U.c+","+U.r===R);return{x:P.cx,z:P.cz,r:2.8}});for(let R of u){let P=t.floor[(R.c+R.r)%2];if(R.kind==="hub"&&(P=_i(P,1.25)),R.kind==="exit"&&(P=2050602),y(R.cx,-.3,R.cz,16,.3,16,P),t.indoor)y(R.cx,r,R.cz,16,.3,16,t.ceil),p(R.cx,r-.1,R.cz,.9,.1,.9,R.kind==="exit"?6750105:t.bulb,1),g.push({x:R.cx,y:r-.15,z:R.cz,c:R.kind==="exit"?3407752:t.bulb,r:5.8});else{let U=R.cx+(s()<.5?-1:1)*2.5,F=R.cz+(s()<.5?-1:1)*2.5;y(U,0,F,.14,2.4,.14,t.trim),p(U,2.4,F,.32,.32,.32,R.kind==="exit"?6750105:t.bulb,1),g.push({x:U,y:2.55,z:F,c:R.kind==="exit"?3407752:t.bulb,r:4.6}),m(U-.1,F-.1,U+.1,F+.1)}}function T(R,P,U,F,G){let te=G==null?[[U,F]]:[[U,G-1.7],[G+1.7,F]];for(let[ce,Ae]of te){let j=Ae-ce;if(j<.02)continue;let le=(ce+Ae)/2,ve=_i(t.wall,.86+.28*s());if(R==="v"?(y(P,0,le,.4,r,j+.4,ve),y(P,0,le,.4+.08,.3,j+.4,t.trim),m(P-.4/2,ce-.4/2,P+.4/2,Ae+.4/2)):(y(le,0,P,j+.4,r,.4,ve),y(le,0,P,j+.4,.3,.4+.08,t.trim),m(ce-.4/2,P-.4/2,Ae+.4/2,P+.4/2)),!t.indoor)for(let Ee=ce+.8;Ee<Ae;Ee+=2.3){let ue=o.length;x(o,"k",R==="v"?P:Ee,r-.4,R==="v"?Ee:P,2.8,3.4,2.8,_i(t.wall,.8+.5*s()))}}if(G!=null){t.indoor&&(R==="v"?y(P,3,G,.4,r-3,3.4,_i(t.wall,.9)):y(G,3,P,3.4,r-3,.4,_i(t.wall,.9)));for(let ce of[-1,1]){let Ae=G+ce*1.7;R==="v"?y(P,0,Ae,.4+.14,3,.16,t.trim):y(Ae,0,P,.16,3,.4+.14,t.trim)}}}function k(R,P,U,F){let G={id:l.length,kind:R.gate?"gate":"lock",o:P,cx:U,cz:F};G.col=P==="v"?{x0:U-.2,z0:F-3.4/2,x1:U+.2,z1:F+3.4/2}:{x0:U-3.4/2,z0:F-.2,x1:U+3.4/2,z1:F+.2},l.push(G),G.kind==="lock"&&(P==="v"?(d.push({door:G.id,x:U-.34,z:F+3.4/2+.4,o:P}),d.push({door:G.id,x:U+.34,z:F-3.4/2-.4,o:P})):(d.push({door:G.id,x:U+3.4/2+.4,z:F-.34,o:P}),d.push({door:G.id,x:U-3.4/2-.4,z:F+.34,o:P})))}for(let[R,P]of v){let U=R*16,F=P*16;if(E(R+1,P)){let G=w.get(M(""+R+P,""+(R+1)+P));T("v",U+16,F,F+16,G?F+16/2:null),G&&(G.locked||G.gate)&&k(G,"v",U+16,F+16/2)}else T("v",U+16,F,F+16,null);if(E(R,P+1)){let G=w.get(M(""+R+P,""+R+(P+1)));T("h",F+16,U,U+16,G?U+16/2:null),G&&(G.locked||G.gate)&&k(G,"h",U+16/2,F+16)}else T("h",F+16,U,U+16,null);E(R-1,P)||T("v",U,F,F+16,null),E(R,P-1)||T("h",F,U,U+16,null)}function I(R,P,U){let F=[12595248,3170496,3186768,13672480];switch(R){case"kitchen":y(P,0,U,1.5,.9,.9,4870230),p(P-.3,.9,U,.45,.05,.45,16742938,1),y(P+.35,.9,U,.4,.35,.4,10066329),m(P-.8,U-.5,P+.8,U+.5);break;case"clinic":y(P,.3,U,2,.25,.95,14474460),y(P-.7,.55,U,.4,.15,.6,16777215),y(P+1.3,0,U+.4,.05,1.7,.05,11184810),p(P+1.3,1.3,U+.4,.14,.3,.1,6737151,0),m(P-1,U-.5,P+1,U+.5);break;case"library":y(P,0,U,1.8,2.1,.55,5913122);for(let G=0;G<4;G++)y(P-.6+G*.4,.9,U+.3,.15,.4,.1,F[G]);m(P-.95,U-.3,P+.95,U+.3);break;case"lab":y(P,0,U,1.9,.9,.8,13620182),p(P-.45,.9,U,.2,.35,.2,4259728,1),y(P+.5,.9,U,.25,.4,.2,2236962),m(P-1,U-.45,P+1,U+.45);break;case"workshop":y(P,0,U,1.9,.95,.85,7031338),y(P+.6,.95,U,.2,.3,.3,3355443),y(P-.4,.95,U,.5,.15,.3,8947848),m(P-1,U-.45,P+1,U+.45);break;case"office":y(P,0,U,1.9,.8,.95,4861984),p(P-.6,.8,U,.15,.35,.15,16769162,1),y(P+.4,.8,U,.5,.05,.4,15658734),m(P-1,U-.5,P+1,U+.5);break;case"outdoor":y(P,0,U,1.1,1.1,1.1,9071162),y(P+.9,0,U+.2,.9,.9,.9,8018474),y(P+.2,1.1,U,.8,.7,.8,10123850),m(P-.6,U-.6,P+1.4,U+.7);break;case"art":y(P-.5,0,U,.07,1.7,.07,6965802),y(P+.5,0,U,.07,1.7,.07,6965802),y(P,.6,U,1.1,1.1,.07,16117984),y(P-.2,1,U+.05,.3,.3,.02,F[0]),y(P+.2,.8,U+.05,.3,.3,.02,F[1]),m(P-.6,U-.2,P+.6,U+.2);break}}u.forEach((R,P)=>{if(R.kind!=="room")return;[[R.x0+3.4,R.z0+3.4],[R.x1-3.4,R.z1-3.4]].forEach(([F,G],te)=>{f.push({id:f.length,room:P,tag:R.tag,x:F,z:G,name:t.sn&&t.sn[R.tag]||uv[R.tag]}),I(R.tag,F,G)})});let B=R=>{let P=[];for(let[U,F]of[[R.x0,R.cz],[R.x1,R.cz],[R.cx,R.z0],[R.cx,R.z1]])P.push({x0:U-3.2,x1:U+3.2,z0:F-3.2,z1:F+3.2});for(let U of f)U.room===u.indexOf(R)&&P.push({x0:U.x-2.4,x1:U.x+2.4,z0:U.z-2.4,z1:U.z+2.4});for(let U of A)U.room===u.indexOf(R)&&P.push({x0:U.x-2.6,x1:U.x+2.6,z0:U.z-2.6,z1:U.z+2.6});return P},V=(R,P,U=0)=>R.x0<P.x1+U&&R.x1>P.x0-U&&R.z0<P.z1+U&&R.z1>P.z0-U;for(let R of u){if(R.kind==="exit"){p(R.cx,2.2,R.z1-.5,4,.7,.1,3211104,0);for(let G of[-5,5])y(R.cx+G,0,R.cz,.6,r,.6,t.trim),p(R.cx+G,.2,R.cz,.15,r-.4,.15,3211104,0),m(R.cx+G-.3,R.cz-.3,R.cx+G+.3,R.cz+.3);continue}if(R.kind==="hub"){g.push({x:R.cx,y:1,z:R.cz,c:16724016,r:3.4}),y(R.cx,0,R.cz,1.3,.9,1.3,2763310),p(R.cx,.9,R.cz,.5,.12,.5,16719904,0),m(R.cx-.65,R.cz-.65,R.cx+.65,R.cz+.65);for(let[G,te]of[[-6,-6],[6,-6],[-6,6],[6,6]])y(R.cx+G,0,R.cz+te,.8,r,.8,t.trim),m(R.cx+G-.4,R.cz+te-.4,R.cx+G+.4,R.cz+te+.4);y(R.cx,0,R.cz,7,.03,7,_i(t.floor[0],.7));continue}for(let G of A)if(G.room===u.indexOf(R)){y(G.x,0,G.z,2.2,.05,2.2,659220);for(let te of[-1,1])p(G.x+te*1.05,.05,G.z,.1,.05,2.2,3199231,1),p(G.x,.05,G.z+te*1.05,2.2,.05,.1,3199231,1);p(G.x,.05,G.z,.3,1.7,.3,3199231,0)}let P=B(R),U=[],F=5+Math.floor(s()*3);for(let G=0;G<F;G++){let te=t.props[Math.floor(s()*t.props.length)],ce=fv[te];for(let Ae=0;Ae<25;Ae++){let j=ce.w,le=ce.d,ve,Ee;if(ce.wall){let ct=Math.floor(s()*4);ct<2?(j=ce.d,le=ce.w,ve=R.x0+2.5+s()*11,Ee=ct===0?R.z0+.4/2+le/2+.05:R.z1-.4/2-le/2-.05):(ve=ct===2?R.x0+.4/2+j/2+.05:R.x1-.4/2-j/2-.05,Ee=R.z0+2.5+s()*11)}else ve=R.x0+1.8+s()*(16-3.6),Ee=R.z0+1.8+s()*(16-3.6);let ue={x0:ve-j/2,x1:ve+j/2,z0:Ee-le/2,z1:Ee+le/2};if(P.some(ct=>V(ue,ct))||U.some(ct=>V(ue,ct,.7)))continue;U.push(ue);let Ge=_i(t.pc[Math.floor(s()*t.pc.length)],.8+.4*s());if(te==="tree")y(ve,0,Ee,.5,2.2,.5,3811864),x(o,"k",ve,1.6,Ee,2.6,3.4,2.6,_i(t.wall,.7+.4*s())),m(ue.x0,ue.z0,ue.x1,ue.z1);else{let ct=ce.h<0?r:ce.h;y(ve,0,Ee,j,ct,le,Ge),m(ue.x0,ue.z0,ue.x1,ue.z1),te==="table"&&y(ve,0,Ee,j*.8,.05,le*.8,_i(Ge,.6))}break}}for(let G=0;G<2;G++){let te=.8+s()*.8,ce=.6+s()*.8;y(R.x0+2+s()*12,0,R.z0+2+s()*12,te,.02,ce,t.blood)}}let Z=u.find(R=>R.kind==="hub"),N=u.find(R=>R.kind==="exit"),$=[];for(let R=0;R<12;R++){let P=R/12*Math.PI*2,U=Z.cx+Math.cos(P)*4.6,F=Z.cz+Math.sin(P)*4.6;$.push({x:U,z:F,yaw:Math.atan2(-(Z.cx-U),-(Z.cz-F))})}return{id:n,name:t.name,emoji:t.emoji,D:t,S:16,H:r,indoor:t.indoor,hazard:t.hazard||"",story:t.story||"",hatches:A,gas:_,rooms:u,doors:l,panels:d,stations:f,parts:o,glow:a,lamps:g,cols:c,spawn:$,button:{x:Z.cx,z:Z.cz},exit:{x0:N.x0+.6,z0:N.z0+.6,x1:N.x1-.6,z1:N.z1-.6},bounds:{x0:0,z0:0,x1:48,z1:64}}}var Ne=null,Bn=null,Gc=null,it=null,Cu=.8,Tu=2,Eu=null,uo=null,ei={},zc={},pv=["scream","jumpscare","step","run","door_open","creak","correct","wrong","hint","revive","lamp","heartbeat","killer_power","alarm","body_found","exit_open","time_warning","escape","win","lose"],Mu={graveyard:[[13.57,1],[17.48,.55],[86.38,.4],[105.97,.5],[109.41,.4],[113.79,.35],[133.72,.7],[136.94,.95],[157.64,.4],[163.07,.4],[202.65,.5],[208.9,.4],[282.34,.45],[345.99,.35],[379.41,.85],[383.33,.5],[386.48,.45],[390.07,.4],[427.77,.35],[431.04,.38]]},mv=1.78,yi=null,wu={};function Cp(n){yi=n}var gv={cabin:"school",hospital:"school",mansion:"school",school:"hospital",asylum:"hospital",hotel:"mansion",bunker:"school",carnival:"mansion"};function Rp(){if(Ne){Ne.state==="suspended"&&Ne.resume();return}let n=window.AudioContext||window.webkitAudioContext;if(!n)return;Ne=new n,Bn=Ne.createGain(),Bn.gain.value=Cu,Bn.connect(Ne.destination),Gc=Ne.createBuffer(1,Ne.sampleRate*2,Ne.sampleRate);let e=Gc.getChannelData(0);for(let t=0;t<e.length;t++)e[t]=Math.random()*2-1;pv.forEach(Ks)}function Ks(n){return zc[n]||(zc[n]=fetch(n+".mp3").then(e=>{if(!e.ok||!(e.headers.get("content-type")||"").includes("audio"))throw new Error("missing");return e.arrayBuffer()}).then(e=>Ne.decodeAudioData(e)).then(e=>(ei[n]=e,e)).catch(()=>null)),zc[n]}var Pp=n=>!!ei[n],Ip=()=>({loaded:Object.keys(ei),music:!!(it&&it.music),escape:!!(it&&it.escape),ducked:!!(it&&it.ducked),state:Ne&&Ne.state,ph:it&&it.t0!=null?(Ne.currentTime-it.t0)%it.dur:null,dur:it&&it.dur,thunder:!!(it&&it.thunder),lobby:!!vi,lat:Ne?Iu():0,late:it&&it.late,strike:wu}),Lp=!1;function Hc(n){Cu=n,Bn&&!Lp&&(Bn.gain.value=n)}function Dp(n){Lp=n,Bn&&(Bn.gain.value=n?0:Cu)}function fo(n){Tu=n}function xv(n){if(!Ne.createStereoPanner)return null;let e=Ne.createStereoPanner();return e.pan.value=Math.max(-1,Math.min(1,n||0)),e}function Ru(n,e){let t=xv(e);t?(n.connect(t),t.connect(Bn)):n.connect(Bn)}function bt(n,e,t,i,s,r,o){if(!Ne)return;let a=Ne.currentTime+(o||0),c=Ne.createOscillator(),l=Ne.createGain();c.type=n,c.frequency.setValueAtTime(e,a),c.frequency.exponentialRampToValueAtTime(Math.max(1,t),a+i),l.gain.setValueAtTime(1e-4,a),l.gain.exponentialRampToValueAtTime(s,a+Math.min(.03,i/4)),l.gain.exponentialRampToValueAtTime(1e-4,a+i),c.connect(l),Ru(l,r),c.start(a),c.stop(a+i+.05)}function cs(n,e,t,i,s,r,o,a){if(!Ne)return;let c=Ne.currentTime+(o||0),l=Ne.createBufferSource();l.buffer=Gc,l.loop=!0;let u=Ne.createBiquadFilter();u.type=e,u.Q.value=a||1,u.frequency.setValueAtTime(t,c),u.frequency.exponentialRampToValueAtTime(Math.max(20,i),c+n);let f=Ne.createGain();f.gain.setValueAtTime(1e-4,c),f.gain.exponentialRampToValueAtTime(s,c+Math.min(.04,n/3)),f.gain.exponentialRampToValueAtTime(1e-4,c+n),l.connect(u),u.connect(f),Ru(f,r),l.start(c,Math.random()),l.stop(c+n+.05)}function St(n,e,t){t=t||{};let i=ei[n];if(!i||!Ne)return null;let s=Ne.createBufferSource();s.buffer=i,s.loop=!!t.loop,t.rate&&(s.playbackRate.value=t.rate);let r=Ne.createGain(),o=Ne.currentTime;return t.dur!=null?(r.gain.setValueAtTime(0,o),r.gain.linearRampToValueAtTime(e,o+.02),r.gain.setValueAtTime(e,o+Math.max(.03,t.dur-.05)),r.gain.linearRampToValueAtTime(0,o+t.dur)):r.gain.value=e,s.connect(r),Ru(r,t.pan),t.dur!=null?s.start(0,t.offset||0,t.dur):s.start(0,t.offset||0),{s,gn:r}}var Me={step(n,e){let t=n??1;if(ei.step){St("step",.7*t,{offset:Math.random()*Math.max(.1,ei.step.duration-.5),dur:.4,pan:e,rate:.92+Math.random()*.16});return}cs(.09,"bandpass",380,160,.05*t,e)},run(){St("run",.8)||bt("sine",400,700,.3,.1)},door(){St("door_open",.8)||(bt("sawtooth",90,45,.7,.12),cs(.7,"lowpass",500,120,.15))},correct(){St("correct",.9)||Me.chime()},wrong(){St("wrong",.9)||Me.buzz()},hint(){St("hint",.9)||Me.chime()},revive(){St("revive",1)||Me.chime()},lamp(){St("lamp",.8)||Me.chime()},bark(){bt("sawtooth",520,200,.14,.12),bt("sawtooth",540,210,.14,.12,0,.22)},chime(){bt("sine",660,660,.35,.12),bt("sine",880,880,.5,.12,0,.12),bt("sine",1320,1320,.6,.1,0,.24)},buzz(){bt("square",140,110,.45,.14),bt("square",100,80,.45,.1,0,.05)},click(){bt("sine",520,400,.06,.06)},creak(){if(ei.creak){St("creak",.5,{rate:.85+Math.random()*.3,pan:Math.random()*2-1});return}cs(1.2+Math.random(),"bandpass",300+Math.random()*300,900+Math.random()*500,.05,Math.random()*2-1,0,14)},thud(){bt("sine",70,35,.35,.2,Math.random()*2-1)},whisper(){for(let n=0;n<4;n++)cs(.35,"bandpass",1500+Math.random()*1500,2500,.05,Math.random()*2-1,n*.3,4)},killerNear(){St("killer_power",.7)||Me.whisper()},heart(){bt("sine",62,38,.18,.28),bt("sine",58,36,.2,.22,0,.2)},heartLoop(n){if(!n){if(uo){try{uo.s.stop()}catch{}uo=null}return}!uo&&ei.heartbeat&&(uo=St("heartbeat",.9,{loop:!0}))},alarm(){if(!St("alarm",.8))for(let n=0;n<6;n++)bt("square",n%2?520:760,n%2?520:760,.3,.07,0,n*.3)},bodyFound(){St("body_found",.9)||(Me.alarm(),Me.gong())},exitAlarm(){St("exit_open",.8)||Me.alarm()},warn(){St("time_warning",.9)||Me.gong()},gong(){bt("sine",110,100,2.2,.25),bt("sine",220,200,1.8,.1),cs(1.5,"bandpass",500,200,.08)},sting(){St("jumpscare",1)||(bt("sawtooth",880,700,.9,.22),bt("sawtooth",933,740,.9,.22),bt("sawtooth",1250,1e3,.9,.18),cs(.9,"highpass",1500,4e3,.3))},scream(n){let e=n??1;if(!St("scream",e)){for(let t=0;t<3;t++)bt("sawtooth",700+t*90,1500+t*120,1.3,.16*e,0,t*.02),bt("sawtooth",1100+t*50,900,1.1,.08*e,0,.25+t*.03);cs(1.3,"bandpass",2200,3200,.25*e,0,0,2),bt("sine",120,60,1.4,.3*e)}},escape(){St("escape",1)||Me.win()},win(){St("win",.9)||[523,659,784,1046].forEach((n,e)=>bt("triangle",n,n,.5,.15,0,e*.16))},lose(){St("lose",.9)||[392,330,262,196].forEach((n,e)=>bt("sawtooth",n,n*.98,.7,.12,0,e*.3))}};async function _v(n){let e="music_"+n;return await Ks(e)?e:(e="music_"+(gv[n]||"school"),await Ks(e)?e:null)}var Np=.5;function Pu(n){if(yv(),po(),!Ne)return;let e=[],t=Ne.createGain();t.gain.value=1e-4,t.gain.exponentialRampToValueAtTime(.09,Ne.currentTime+4),t.connect(Bn);let i=Ne.createBiquadFilter();i.type="lowpass",i.frequency.value=220,i.connect(t);for(let g of[55,55.7,82.4]){let x=Ne.createOscillator();x.type="sawtooth",x.frequency.value=g,x.connect(i),x.start(),e.push(x)}let s=Ne.createOscillator(),r=Ne.createGain();s.frequency.value=.12,r.gain.value=70,s.connect(r),r.connect(i.frequency),s.start(),e.push(s);let o=Ne.createBufferSource();o.buffer=Gc,o.loop=!0;let a=Ne.createBiquadFilter();a.type="bandpass",a.frequency.value=400,a.Q.value=.8;let c=Ne.createGain();c.gain.value=.03;let l=Ne.createOscillator(),u=Ne.createGain();l.frequency.value=.07,u.gain.value=250,l.connect(u),u.connect(a.frequency),l.start(),o.connect(a),a.connect(c),c.connect(Bn),o.start(),e.push(o,l);let f={nodes:e,g:t,music:null,escape:null,ducked:!1};it=f,Mu[n]&&Ks("thunder_strike"),_v(n).then(g=>{it!==f||!g||(f.music=St(g,1e-4,{loop:!0}),f.music&&Mu[n]&&g==="music_"+n&&(f.t0=Ne.currentTime,f.dur=ei[g].duration,f.thunder=Mu[n],Up(f,!0)),f.music&&(f.music.gn.gain.setTargetAtTime(f.ducked?.12:Np,Ne.currentTime,1.5),t.gain.setTargetAtTime(.03,Ne.currentTime,2)))});let d=()=>{if(it===f){if(Tu>=1){let g=Math.random();g<.4?Me.creak():g<.7?Me.thud():Tu>=2&&Me.whisper()}Eu=setTimeout(d,6e3+Math.random()*12e3)}};Eu=setTimeout(d,4e3)}var Iu=()=>Math.min(.3,Ne&&(Ne.outputLatency||Ne.baseLatency)||0);function Up(n,e){if(it!==n||!n.thunder)return;let t=n.thunder,i=(Ne.currentTime-n.t0)%n.dur;e&&(n.idx=t.findIndex(c=>c[0]>i+.05),n.idx<0&&(n.idx=0));let s=t[n.idx][0]-i;s<-.5&&(s+=n.dur);let r=Iu(),o=t[n.idx][1];n.idx=(n.idx+1)%t.length,clearTimeout(n.thTimer);let a=Math.max(0,(s+r)*1e3-20);n.due=performance.now()+a,n.thTimer=setTimeout(()=>{it===n&&(n.late=Math.round(performance.now()-n.due),yi&&yi(o),Up(n,!1))},a)}function kp(){if(!Ne){yi&&yi(1);return}let n=Iu();if(!ei.thunder_strike){Me.thud(),setTimeout(()=>yi&&yi(.8),150);return}St("thunder_strike",.95);let e=Math.max(0,(mv+n)*1e3-20),t=performance.now()+e;wu.set=performance.now(),setTimeout(()=>{wu.late=Math.round(performance.now()-t),yi&&yi(1)},e)}var vi=null,Au=!1;async function Lu(){Au=!0,!(!Ne||vi)&&(!await Ks("music_lobby")||!Au||vi||(vi=St("music_lobby",1e-4,{loop:!0}),vi&&vi.gn.gain.setTargetAtTime(.4,Ne.currentTime,1.5)))}function yv(){if(Au=!1,!vi)return;let n=vi;vi=null,n.gn.gain.setTargetAtTime(1e-4,Ne.currentTime,.4),setTimeout(()=>{try{n.s.stop()}catch{}},1800)}function Du(n){it&&(it.ducked=n,it.music&&it.music.gn.gain.setTargetAtTime(n?.12:it.escape?.1:Np,Ne.currentTime,.4))}async function Op(){let n=it;!n||n.escape||!await Ks("music_escape")||it!==n||(n.escape=St("music_escape",1e-4,{loop:!0}),n.escape&&n.escape.gn.gain.setTargetAtTime(.55,Ne.currentTime,1),n.music&&n.music.gn.gain.setTargetAtTime(.08,Ne.currentTime,1))}function po(){if(clearTimeout(Eu),Me.heartLoop(!1),!!it){for(let n of it.nodes)try{n.stop()}catch{}try{it.g.disconnect()}catch{}clearTimeout(it.thTimer);for(let n of[it.music,it.escape])if(n)try{n.s.stop()}catch{}it=null}}var Le=128,Ve=1,ti=!1;function ls(){let n=document.createElement("canvas");return n.width=n.height=Le,n}function hs(n){let e=n>>>0;return()=>{e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function Qs(n,e,t,i,s,r){t=Math.round(t*Ve*Ve);for(let o=0;o<t;o++){let a=(1+e()*s)*Ve;n.fillStyle=(r&&e()<.4?"rgba(255,255,255,":"rgba(0,0,0,")+(e()*i).toFixed(3)+")",n.fillRect(e()*Le,e()*Le,a,a)}}function er(n,e,t){if(ti){for(let i=0;i<7;i++){let s=e()*Le,r=(2+e()*5)*Ve,o=n.createLinearGradient(0,0,0,Le*(.4+e()*.6));o.addColorStop(0,"rgba(0,0,0,"+(.1*t).toFixed(3)+")"),o.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=o,n.fillRect(s,0,r,Le)}for(let i=0;i<4;i++){let s=e()*Le,r=e()*Le,o=n.createRadialGradient(s,r,1,s,r,(14+e()*26)*Ve);o.addColorStop(0,"rgba(0,0,0,"+(.16*t).toFixed(3)+")"),o.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=o,n.fillRect(0,0,Le,Le)}n.strokeStyle="rgba(0,0,0,"+(.13*t).toFixed(3)+")",n.lineWidth=Ve;for(let i=0;i<10;i++){let s=e()*Le,r=e()*Le;n.beginPath(),n.moveTo(s,r),n.lineTo(s+(6+e()*14)*Ve,r+(e()-.5)*8*Ve),n.stroke()}}}function us(n){let e=new Ln(n);return e.wrapS=e.wrapT=Ls,e.colorSpace=wt,e.anisotropy=ti?4:2,e}function Vc(n){let e=hs(n),t=ls(),i=t.getContext("2d");i.fillStyle="#e9e9e9",i.fillRect(0,0,Le,Le);for(let o=0;o<5;o++){let a=i.createRadialGradient(e()*Le,e()*Le,2*Ve,e()*Le,e()*Le,(30+e()*30)*Ve);a.addColorStop(0,"rgba(0,0,0,.10)"),a.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=a,i.fillRect(0,0,Le,Le)}Qs(i,e,700,.1,2,!0),i.strokeStyle="rgba(0,0,0,.28)",i.lineWidth=Ve,i.beginPath();let s=(20+e()*80)*Ve,r=0;for(i.moveTo(s,r);r<Le;)s+=(e()-.5)*12*Ve,r+=(6+e()*8)*Ve,i.lineTo(s,r);return i.stroke(),er(i,e,1),us(t)}function Nu(n,e){let t=hs(n),i=ls(),s=i.getContext("2d"),r=Le/e;s.fillStyle="#efefef",s.fillRect(0,0,Le,Le);for(let o=0;o<e;o++)for(let a=0;a<e;a++)s.fillStyle="rgba(0,0,0,"+(t()*(ti?.11:.07)).toFixed(3)+")",s.fillRect(o*r,a*r,r,r),ti&&(s.fillStyle="rgba(255,255,255,.35)",s.fillRect(o*r+2*Ve,a*r+2*Ve,r-5*Ve,2*Ve));s.fillStyle="rgba(30,30,30,.55)";for(let o=0;o<e;o++)s.fillRect(o*r,0,2*Ve,Le),s.fillRect(0,o*r,Le,2*Ve);return Qs(s,t,500,.12,2,!1),er(s,t,1.2),us(i)}function vv(n){let e=hs(n),t=ls(),i=t.getContext("2d");i.fillStyle="#e4e4e4",i.fillRect(0,0,Le,Le);for(let s=0;s<8;s++)i.fillStyle="rgba(0,0,0,.13)",i.fillRect(s*16*Ve,0,8*Ve,Le);i.fillStyle="rgba(0,0,0,.28)";for(let s=0;s<4;s++)for(let r=0;r<4;r++){let o=(s*32+16)*Ve,a=(r*32+16)*Ve;i.beginPath(),i.moveTo(o,a-5*Ve),i.lineTo(o+4*Ve,a),i.lineTo(o,a+5*Ve),i.lineTo(o-4*Ve,a),i.closePath(),i.fill(),ti&&(i.fillStyle="rgba(255,255,255,.22)",i.beginPath(),i.arc(o,a,1.6*Ve,0,7),i.fill(),i.fillStyle="rgba(0,0,0,.28)")}return Qs(i,e,400,.1,2,!1),er(i,e,1.1),us(t)}function bv(n){let e=hs(n),t=ls(),i=t.getContext("2d"),s=Le/4;for(let r=0;r<4;r++){let o=e()*Le;i.fillStyle="rgba("+(205+e()*40|0)+","+(205+e()*40|0)+","+(205+e()*40|0)+",1)",i.fillRect(0,r*s,Le,s);for(let a=0;a<14*(ti?2:1);a++){i.strokeStyle="rgba(0,0,0,"+(.06+e()*.1).toFixed(2)+")",i.beginPath();let c=r*s+e()*s;i.moveTo(0,c),i.lineTo(Le,c+(e()-.5)*3*Ve),i.stroke()}i.fillStyle="rgba(20,20,20,.6)",i.fillRect(o%Le,r*s,2*Ve,s),i.fillRect(0,r*s,Le,2*Ve)}return er(i,e,1),us(t)}function Fp(n){let e=hs(n),t=ls(),i=t.getContext("2d");i.fillStyle="#d6d6d6",i.fillRect(0,0,Le,Le),Qs(i,e,1400,.28,4,!0),i.strokeStyle="rgba(0,0,0,.22)",i.lineWidth=Ve;for(let s=0;s<140*Ve;s++){let r=e()*Le,o=e()*Le;i.beginPath(),i.moveTo(r,o),i.lineTo(r+(e()-.5)*5*Ve,o-(3+e()*5)*Ve),i.stroke()}if(ti)for(let s=0;s<6;s++){let r=e()*Le,o=e()*Le,a=i.createRadialGradient(r,o,1,r,o,(10+e()*18)*Ve);a.addColorStop(0,"rgba(60,40,20,.28)"),a.addColorStop(1,"rgba(60,40,20,0)"),i.fillStyle=a,i.fillRect(0,0,Le,Le)}return us(t)}function Bp(n){let e=hs(n),t=ls(),i=t.getContext("2d");return i.fillStyle="#e2e2e2",i.fillRect(0,0,Le,Le),Qs(i,e,900,.16,1,!1),i.fillStyle="rgba(0,0,0,.45)",i.fillRect(0,0,Le,2*Ve),i.fillRect(0,0,2*Ve,Le),i.fillRect(0,Le/2,Le,Ve),i.fillRect(Le/2,0,Ve,Le),er(i,e,1.4),us(t)}function Uu(n){let e=hs(n),t=ls(),i=t.getContext("2d");i.fillStyle="#dcdcdc",i.fillRect(0,0,Le,Le);for(let s=0;s<46*(ti?2:1);s++){i.strokeStyle="rgba(0,0,0,"+(.05+e()*.14).toFixed(2)+")",i.lineWidth=(1+e()*2)*Ve;let r=e()*Le;i.beginPath(),i.moveTo(r,0),i.bezierCurveTo(r+(e()-.5)*14*Ve,Le*.3,r+(e()-.5)*14*Ve,Le*.7,r+(e()-.5)*8*Ve,Le),i.stroke()}return Qs(i,e,150,.12,2,!1),er(i,e,.8),us(t)}function zp(n,e){switch(ti=!!e,Le=ti?256:128,Ve=Le/128,n){case"hospital":return{w:Nu(11,4),f:Nu(12,4),c:Bp(13),p:Vc(14)};case"mansion":return{w:vv(21),f:bv(22),c:Vc(23),p:Uu(24)};case"cabin":return{w:Fp(31),f:Fp(32),c:Vc(33),p:Uu(34)};default:return{w:Vc(41),f:Nu(42,2),c:Bp(43),p:Uu(44)}}}function Gp(n){let t=document.createElement("canvas");t.width=512,t.height=80*n.length;let i=t.getContext("2d");n.forEach((r,o)=>{let a=o*80;i.fillStyle="#17202a",i.fillRect(0,a,512,80),i.strokeStyle="#d8c070",i.lineWidth=5,i.strokeRect(4,a+4,504,72),i.fillStyle="#f4efe0",i.font="bold 40px Inter, DejaVu Sans, sans-serif",i.textAlign="center",i.textBaseline="middle",i.fillText(r.toUpperCase(),256,a+80/2+2,480)});let s=new Ln(t);return s.colorSpace=wt,s.anisotropy=4,{tex:s,rows:n.length}}function Hp(){let n=document.createElement("canvas");n.width=n.height=128;let e=n.getContext("2d"),t=e.createRadialGradient(64,64,2,64,64,64);t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.35,"rgba(255,255,255,.45)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,128,128);let i=new Ln(n);return i.colorSpace=wt,i}function Vp(){let n=document.createElement("canvas");n.width=64,n.height=128;let e=n.getContext("2d"),t=e.createRadialGradient(32,50,2,32,60,56);t.addColorStop(0,"rgba(200,225,255,.9)"),t.addColorStop(.5,"rgba(160,200,255,.35)"),t.addColorStop(1,"rgba(160,200,255,0)"),e.fillStyle=t,e.beginPath(),e.ellipse(32,62,30,60,0,0,7),e.fill(),e.fillStyle="rgba(0,0,30,.6)",e.beginPath(),e.ellipse(24,40,4,7,0,0,7),e.ellipse(40,40,4,7,0,0,7),e.fill();let i=new Ln(n);return i.colorSpace=wt,i}var H=n=>document.getElementById(n),yo=new URLSearchParams(location.search),Sv=!!yo.get("debug"),st=n=>String(n).replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e]),nr=(n,e,t)=>Math.max(e,Math.min(t,n));function Mv(){let n=yo.get("pjs");if(n){let[e,t]=n.split(":");return{host:e,port:+t,path:"/",secure:!1,debug:0}}return{debug:0}}var vo=1.6,Wp=.35,Xp=4,h={name:"",code:"",job:"chef",q:1,id:0,role:"crew",phase:"join",lobby:[],map:null,mapId:"",players:new Map,doors:[],bodies:[],tasks:[],prog:[0,0],clues:[],alive:!0,escaped:!1,ghost:!1,charges:{},rage:0,kcd:0,cdTotal:25,scare:2,myScare:2,paused:!1,qbox:null,meeting:null,exitOpen:!1,xcode:[],xn:0,warnLeft:3,warnCd:0,hatchCd:0,blackout:0,mirror:0,inGas:!1,gasT:0,hatchSeen:new Set,xray:0,sprint:0,abilCd:0,danger:!1,flick:0,dark:0,frozenUntil:0,pos:{x:0,y:vo,z:0},yaw:0,pitch:0,pings:[],lamps:[],waitingQ:!1,emergLeft:1,jump:0,appT:60,stepT:0,onBreak:!1,tl:null,w2:!1,w30:!1,smooth:!1,fps:0,showFps:!1,dangerOn:!1,mode:"classic",aliveN:0,escN:0,auto:!1,forceClassic:!1,autoClassic:!1},L={},Dt={},tr=null,zn=null,Yc=!1,Zc=0;function pt(n,e){H(n).style.display=e?"flex":"none"}function We(n,e,t){let i=document.createElement("div");i.className="tst "+(t||""),i.innerHTML=n,H("toast").appendChild(i),setTimeout(()=>i.classList.add("out"),(e||3500)-400),setTimeout(()=>i.remove(),e||3500)}function Tv(n){let e=H("stormfx");if(!e)return;let t=Hn(),i=Math.min(.92,.3+.65*(n||1))*(t===0?.45:1),s=r=>{e.style.setProperty("--sa",(i*r).toFixed(2)),e.classList.remove("go"),e.offsetWidth,e.classList.add("go")};s(1),t>=1&&n>.6&&setTimeout(()=>s(.6),170),h.flick=Math.max(h.flick||0,.25)}Cp(Tv);function Gn(n,e){let t=H("flash");t.style.background=n,t.style.opacity=.55,setTimeout(()=>t.style.opacity=0,e||250)}var Hn=()=>Math.min(h.scare,h.myScare),Ev=new Set(["ask","kill","report","emerg","ability","code","warn","hatch"]);function Et(n){if(Ev.has(n.t)&&(n.px=+h.pos.x.toFixed(2),n.pz=+h.pos.z.toFixed(2)),zn&&zn.open)try{zn.send(n)}catch{}}H("code").value=(yo.get("room")||"").toUpperCase();H("btnJoin").onclick=()=>{let n=H("nm").value.trim(),e=H("code").value.trim().toUpperCase();if(!n)return H("jmsg").textContent="Please type your name.";if(e.length<4)return H("jmsg").textContent="Please type the 4-letter room code.";h.name=n,h.code=e;{let t=H("gfx").value;if(h.auto=t==="a",h.smooth=t==="s",h.q=t==="s"?0:t==="a"?1:+t,h.autoClassic=!1,h.auto)try{h.autoClassic=localStorage.getItem("se_fb")==="1"}catch{}}h.showFps=!!yo.get("fps"),Rp(),Qp()};H("nm").addEventListener("keydown",n=>{n.key==="Enter"&&H("btnJoin").click()});H("code").addEventListener("keydown",n=>{n.key==="Enter"&&H("btnJoin").click()});function Qp(){H("jmsg").textContent="Connecting\u2026",Yc=!1;try{tr&&tr.destroy()}catch{}tr=new wp(Mv());let n=setTimeout(()=>{Yc||(H("jmsg").textContent="Cannot reach the room. Check the code and the Wi-Fi, and make sure the teacher page is open.")},12e3);tr.on("open",()=>{zn=tr.connect("shadowesc-"+h.code,{reliable:!0,serialization:"json"}),zn.on("open",()=>{Zc=0,zn.send({t:"join",name:h.name,job:h.job})}),zn.on("data",e=>{try{Av(e)}catch(t){console.error(t)}}),zn.on("close",()=>{clearTimeout(n),wv()}),zn.on("error",()=>{})}),tr.on("error",e=>{clearTimeout(n),e.type==="peer-unavailable"?H("jmsg").textContent='Room "'+h.code+'" not found. Check the code with your teacher.':Yc||(H("jmsg").textContent="Connection problem ("+e.type+").")})}function em(n){if(h.off=!!n,H("offbox").style.display=n?"flex":"none",n){h.paused=!0,document.exitPointerLock&&document.exitPointerLock();for(let e in Dt)Dt[e]=!1;document.activeElement&&document.activeElement.blur&&document.activeElement.blur()}Dp(!!n)}function wv(){h.phase!=="join"&&(h.off&&em(!1),H("lost").style.display="flex",H("lostMsg").textContent="Connection lost\u2026 trying to reconnect ("+(Zc+1)+")",document.exitPointerLock&&document.exitPointerLock(),Zc++<30?setTimeout(Qp,2500):H("lostMsg").textContent="The teacher closed the game or the connection is gone. Reload the page to join again.")}function Hu(){let n=h.lobby.find(e=>e.id===h.id);n&&(h.job=n.job),H("lobPlayers").innerHTML=h.lobby.map(e=>'<span class="chip'+(e.id===h.id?" me":"")+'">'+xn(e.job).emoji+" "+st(e.name)+"</span>").join(""),H("jobGrid").innerHTML=ho.map(e=>{let t=h.lobby.find(i=>i.job===e.id&&i.id!==h.id);return'<div class="job'+(e.id===h.job?" sel":"")+(t?" taken":"")+'" data-j="'+e.id+'"><div class="je">'+e.emoji+"</div><b>"+e.name+"</b><small>\u2B50 "+e.abName+'</small><small class="jd">'+e.abDesc+"</small>"+(t?"<em>"+st(t.name)+"</em>":"")+"</div>"}).join(""),H("jobGrid").querySelectorAll(".job").forEach(e=>e.addEventListener("click",()=>{e.classList.contains("taken")||(h.job=e.dataset.j,Et({t:"pick",job:h.job}),Hu(),Me.click())}))}function Av(n){switch(n.t){case"joined":Yc=!0,h.id=n.id,H("lost").style.display="none",h.phase==="join"&&(h.phase="lobby",pt("join",!1),pt("lobby",!0),Lu());break;case"reject":H("jmsg").textContent=n.why,Zc=99,h.phase="join";break;case"lobby":h.lobby=n.players,h.phase==="lobby"&&Hu();break;case"start":$v(n);break;case"s":Kv(n);break;case"q":sb(n);break;case"deny":h.waitingQ=!1,We(st(n.why),n.alarm?4500:2500,"bad"),n.alarm?(Me.alarm(),Gn("#c00",500)):Me.wrong();break;case"digit":h.xcode[n.i]=n.d,h.xn=n.n,We("\u{1F522} <b>Exit code digit "+(n.i+1)+" of "+n.n+": "+n.d+"</b> (saved in your notebook [C])",4500,"clue"),Me.hint();break;case"alarm":h.pings.push({x:n.x,z:n.z,t:9}),We("\u{1F6A8} <b>Exit alarm!</b> A student is at the keypad in the "+st(n.room)+"!",5e3,"bad"),Me.alarm();break;case"warned":h.pings.push({x:n.x,z:n.z,t:9}),We("\u{1F4E3} <b>"+st(n.name)+"</b> warns: the killer is in the <b>"+st(n.room)+"</b>!",5e3,"bad"),Me.hint();break;case"warnok":h.warnLeft=n.left,We("\u{1F4E3} Warning sent! ("+n.left+" left)",2e3,"good");break;case"hint":cb(n);break;case"res":lb(n);break;case"door":Xu(n.id,n.open,!0);break;case"clue":h.clues.push(n.text),We("\u{1F50E} <b>NEW CLUE:</b> "+st(n.text),6e3,"clue"),Me.hint();break;case"dead":Qv(n);break;case"revive":eb(n);break;case"escaped":tb(n);break;case"flick":h.flick=1.4,Hn()>=1&&(h.dark=Hn()>=2?.5:0,Me.killerNear());break;case"rage":h.rage=n.n,h.pings.push({x:n.x,z:n.z,t:9}),We("\u{1F608} A wrong answer in the <b>"+st(n.room)+"</b>! You feel stronger. (Power "+n.n+")",5e3,"bad");break;case"killok":h.kcd=n.cd;break;case"meet":hb(n);break;case"voted":h.meeting&&(h.meeting.voted=n.voted,_o());break;case"ready":h.meeting&&(h.meeting.ready=n.ready,_o());break;case"tp":h.pos.x=n.x,h.pos.z=n.z,h.pos.y=h.ghost?2:vo,h.yaw=n.yaw,n.swap&&(Gn("#a040ff",500),Me.chime(),We("\u2728 <b>Magic swap!</b> You changed places!",2200,"good")),n.hatch&&(h.hatchCd=25,Gn("#000",450),Me.door(),We("\u{1F573}\uFE0F You slipped through the secret passage!",2500,"good"));break;case"hz":ob(n);break;case"dspawn":Gv(n);break;case"dprog":Hv(n);break;case"lights":Vv(n);break;case"abok":h.abilCd=n.cd||0,n.charges&&(h.charges=n.charges),n.what==="axe"?(Me.thud(),Gn("#fff",160)):n.what==="shield"?Me.revive():n.what==="lullaby"&&Me.chime();break;case"shield":for(let e of n.ids)if(e===h.id)h.shield=n.dur,We("\u{1F6E1}\uFE0F <b>Shield up!</b> You cannot be caught for "+n.dur+" seconds.",2500,"good");else{let t=h.players.get(e);t&&(t.shield=n.dur)}break;case"slow":h.slowT=n.dur,We("\u{1F3B5} A sleepy lullaby slows you down\u2026",3e3,"bad"),Me.whisper();break;case"note":n.id!==h.id&&Me.chime();break;case"tst":We(st(n.msg),2500,n.k||"good");break;case"meetend":ub(n);break;case"exitopen":nb(n);break;case"end":ib(n);break;case"off":em(n.on);break;case"paused":h.paused=n.on,H("pausebox").style.display=n.on?"flex":"none",n.on&&document.exitPointerLock&&document.exitPointerLock();break;case"cfg":h.scare=n.scare,h.forceClassic=n.look==="classic",fo(Hn()),sr();break;case"danger":h.danger=n.on;break;case"lamp":am(n.x,n.z);break;case"gone":{let e=h.players.get(n.id);e&&(e.st=1),n.id===h.id&&(h.alive=!1,h.ghost=!0);break}case"abused":h.charges=n.charges;break;case"tolobby":tm();break;case"caughtnote":bi("\u{1F480} "+st(n.name).toUpperCase()+" WAS CAUGHT!",n.left>0?"\u{1F3C3} "+n.left+(n.left===1?" student is":" students are")+" still running!":"Nobody is left\u2026",3800),Me.bodyFound();break}}function tm(){h.dangerOn=!1,po(),H("bodyBanner").style.display="none",h.phase="lobby",h.meeting=null,h.qbox=null;for(let n of["hud","qbox","meet","end","role","pausebox","jump","cluebox","menu","breakbox"])pt(n,!1);H("btnBreak").style.display="none",h.onBreak=!1,pt("lobby",!0),Lu(),document.exitPointerLock&&document.exitPointerLock(),H("app").classList.remove("playing"),Hu()}var Cv={w:2.4,f:2,c:2,p:1.2};function Rv(n,e){if(n.s!=="b")return"p";let t=n.y+n.h/2,i=n.y-n.h/2,s=Math.min(n.w,n.d);return t<=.05?"f":i>=e-.05?"c":s<=.8&&(n.h>=2.4||n.h<=.32&&i<.05&&s<=.5)?"w":"p"}function $c(n,e,t){let i=n.attributes.position,s=i.count,r=new Float32Array(s*3),o=new Ye(e);for(let a=0;a<s;a++){let c=t?t(i.getX(a),i.getY(a),i.getZ(a)):1;r[a*3]=o.r*c,r[a*3+1]=o.g*c,r[a*3+2]=o.b*c}n.setAttribute("color",new Ht(r,3))}function Pv(n,e,t){let i;n.s==="b"?i=new hn(n.w,n.h,n.d):n.s==="k"?i=new Bs(n.w/2,n.h,7):i=new Dn(n.w/2,n.w/2,n.h,8),i.translate(n.x,n.y,n.z);let s=i.attributes.position,r=i.attributes.normal,o=i.attributes.uv,a=Cv[e||"p"];for(let c=0;c<s.count;c++){let l=Math.abs(r.getX(c)),u=Math.abs(r.getY(c)),f=Math.abs(r.getZ(c)),d=s.getX(c),g=s.getY(c),x=s.getZ(c);u>=l&&u>=f?o.setXY(c,d/a,x/a):l>=f?o.setXY(c,x/a,g/a):o.setXY(c,d/a,g/a)}return $c(i,n.c,t),i}function Wc(n,e,t){if(!n.length)return null;let i=n.map(r=>Pv(r,e,t)),s=wn(i,!1);return i.forEach(r=>r.dispose()),s}function Iv(n,e,t,i,s){let r=document.createElement("canvas");r.width=e,r.height=t;let o=r.getContext("2d");o.font=i,o.textAlign="center",o.textBaseline="middle",o.lineWidth=6,o.strokeStyle="rgba(0,0,0,.85)",o.strokeText(n,e/2,t/2),o.fillStyle=s||"#fff",o.fillText(n,e/2,t/2);let a=new Ln(r);return a.colorSpace=wt,a}function Lv(){if(L.renderer)return;let n=h.q;L.renderer=new _c({canvas:H("gl"),antialias:n>=2,powerPreference:"high-performance"}),L.prBase=[.55,.8,Math.min(window.devicePixelRatio||1,1.25)][n],L.pr=L.prBase,L.renderer.setPixelRatio(L.pr),L.renderer.shadowMap.enabled=!0,L.renderer.shadowMap.type=ji,L.renderer.setSize(innerWidth,innerHeight,!1),L.camera=new qt(72,innerWidth/innerHeight,.08,70),L.camera.rotation.order="YXZ",addEventListener("resize",()=>{L.renderer.setSize(innerWidth,innerHeight,!1),L.camera.aspect=innerWidth/innerHeight,L.camera.updateProjectionMatrix()})}function Dv(){let n=h.map,e=n.D,t=L.scene=new Tr;if(t.background=new Ye(e.bg),t.fog=new Mr(e.bg,e.fog),L.camera.clear(),t.add(L.camera),L.look=null,L.staticGroup=null,nm(zu()),L.glowTex=L.glowTex||Hp(),L.pools=L.halos=null,n.lamps.length){let o=[],a=new Float32Array(n.lamps.length*3),c=new Float32Array(n.lamps.length*3);n.lamps.forEach((u,f)=>{let d=new Li(u.r*2,u.r*2);d.rotateX(-Math.PI/2),d.translate(u.x,.05,u.z),$c(d,u.c),o.push(d);let g=new Ye(u.c);a.set([u.x,u.y,u.z],f*3),c.set([g.r,g.g,g.b],f*3)}),L.pools=new tt(wn(o,!1),new It({map:L.glowTex,vertexColors:!0,transparent:!0,opacity:.5,blending:Fi,depthWrite:!1})),L.poolBase=n.indoor?.5:.75,t.add(L.pools);let l=new At;l.setAttribute("position",new Ht(a,3)),l.setAttribute("color",new Ht(c,3)),L.halos=new Fs(l,new $i({map:L.glowTex,size:2.8,sizeAttenuation:!0,vertexColors:!0,transparent:!0,opacity:.7,blending:Fi,depthWrite:!1})),L.halos.frustumCulled=!1,t.add(L.halos)}L.dustN=110,L.dustP=new Float32Array(L.dustN*3);for(let o=0;o<L.dustN;o++)L.dustP[o*3]=(Math.random()-.5)*16,L.dustP[o*3+1]=Math.random()*3.6,L.dustP[o*3+2]=(Math.random()-.5)*16;let i=new At;L.dustAttr=new Ht(L.dustP,3),i.setAttribute("position",L.dustAttr),L.dust=new Fs(i,new $i({map:L.glowTex,color:n.indoor?13619151:16770442,size:n.indoor?.12:.16,transparent:!0,opacity:n.indoor?.35:.8,depthWrite:!1})),L.dust.frustumCulled=!1,t.add(L.dust),L.wispTex=L.wispTex||Vp(),L.wisps=[];for(let o=0;o<3;o++){let a=new Pi(new di({map:L.wispTex,transparent:!0,opacity:0,depthWrite:!1,blending:Fi}));a.scale.set(1.7,3.4,1),a.userData.ph=o*2.1,t.add(a),L.wisps.push(a)}L.gasS=[];for(let o of n.gas||[])for(let a=0;a<4;a++){let c=new Pi(new di({map:L.glowTex,color:7012170,transparent:!0,opacity:.32,depthWrite:!1,blending:Fi}));c.scale.set(5.2,3.2,1),c.userData={x:o.x,z:o.z,ph:a*1.7,r:o.r*.6,y:.6+a*.35},t.add(c),L.gasS.push(c)}if(L.hemi=new Ur(e.hemi[0],e.hemi[1],e.hemi[2]),t.add(L.hemi),L.hemiBase=e.hemi[2]*1.3,!e.indoor){let o=new Br(7309e3,.55);o.position.set(-20,40,10),t.add(o)}L.flash=new Or(16773328,60,28,.55,.55,1.5),L.flash.position.set(.15,-.1,0),L.flash.target.position.set(0,0,-6),L.camera.add(L.flash),L.camera.add(L.flash.target),L.flash.shadow.mapSize.set(512,512),L.flash.shadow.camera.near=.3,L.flash.shadow.camera.far=28,L.flash.shadow.bias=-8e-4,L.lantern=new Gs(16769712,7,7,1.6),L.camera.add(L.lantern),L.doors=[],L.doorLight=[];let s=new Nn({color:2238513});for(let o of n.doors){let a=o.o==="v"?new hn(.3,3,3.4):new hn(3.4,3,.3),c=o.kind==="gate"?new Nn({color:10099740,emissive:3343364}):new Nn({color:5913122}),l=new tt(a,c);l.position.set(o.cx,3/2,o.cz),t.add(l),L.doors[o.id]={mesh:l,open:!1,t:0},L.doorLight[o.id]=new It({color:16719904})}for(let o of n.panels){let a=new tt(new hn(o.o==="v"?.14:.55,.8,o.o==="v"?.55:.14),s);a.position.set(o.x,1.25,o.z),t.add(a);let c=new tt(new hn(.22,.22,.22),L.doorLight[o.door]);c.position.set(o.x,1.45,o.z),t.add(c)}L.markers=new Map;for(let o of h.tasks)o.done||Fv(o.sid);let r=n.exit;L.exitBeam=new tt(new Dn(.8,.8,4,12,1,!0),new It({color:4259712,transparent:!0,opacity:.25,depthWrite:!1})),L.exitBeam.position.set((r.x0+r.x1)/2,2,(r.z0+r.z1)/2+3),L.exitBeam.visible=!1,t.add(L.exitBeam),L.bodies=[],L.lamps=[],L.xrayMat=new It({color:6741503,transparent:!0,opacity:.4,depthTest:!1}),L.xrayGeo=new rn(.28,1.1,2,6),Wu()}var zu=()=>h.forceClassic||h.smooth||h.q===0||h.autoClassic?"classic":"rich";function Nv(n){n.traverse(e=>{e.geometry&&e.geometry.dispose(),e.material&&(e.material.map&&e.material.map.dispose(),e.material.dispose())})}function Uv(n){let e=n.D,t=[],i=[];if(!e.indoor)return{deco:t,glass:i};let s=e.seed*7919>>>0,r=()=>{s=s+1831565813|0;let u=Math.imul(s^s>>>15,1|s);return u=u+Math.imul(u^u>>>7,61|u)^u,((u^u>>>14)>>>0)/4294967296},o=(u,f,d,g,x,y,p,m)=>u.push({s:"b",x:f,y:d+y/2,z:g,w:x,h:y,d:p,c:m}),a=[12597547,3049153,13937677,2600544,9323693,15105570],c=.23,l=e.bg===198408?5209996:3428474;for(let u of n.rooms){for(let d=0;d<2;d++){let g=Math.floor(r()*4),x=r()<.5?-1:1,y=3.6+r()*3,p=a[Math.floor(r()*a.length)],m=g<2,v=m?u.cx+x*y:g===2?u.x0+c:u.x1-c,E=m?g===0?u.z0+c:u.z1-c:u.cz+x*y,M=m?.85:.03,w=m?.03:.85,A=m?.7:.05,_=m?.05:.7;o(t,v,1.25,E,M,1.15,w,15262415),o(t,v,1.95,E,A,.32,_,p);for(let T=0;T<3;T++)o(t,v,1.7-T*.17,E,m?.6:.045,.045,m?.045:.6,5591112)}let f=[];if(u.c===0&&f.push("W"),u.c===2&&f.push("E"),u.r===0&&f.push("N"),u.kind==="exit"&&f.push("W","E"),u.kind!=="hub")for(let d of f){let g=d==="N",x=d==="N"?u.cx:d==="W"?u.x0+c:u.x1-c,y=d==="N"?u.z0+c:u.cz,p=g?2.1:.1,m=g?.1:2.1,v=g?1.85:.07,E=g?.07:1.85,M=2759956,w=g;o(i,x,1.3,y,v,1.3,E,l),i[i.length-1].f=0,o(t,x,1.15,y,w?2.1:.12,.12,w?.12:2.1,M),o(t,x,2.65,y,w?2.1:.12,.12,w?.12:2.1,M),o(t,w?x-1:x,1.15,w?y:y-1,.12,1.6,.12,M),o(t,w?x+1:x,1.15,w?y:y+1,.12,1.6,.12,M),o(t,x,1.3,y,w?.07:.14,1.3,w?.14:.07,M),o(t,x,1.9,y,w?1.85:.14,.06,w?.14:1.85,M)}}return{deco:t,glass:i}}function nm(n){let e=L.scene,t=h.map,i=n==="rich",s=t.H;L.staticGroup&&(e.remove(L.staticGroup),Nv(L.staticGroup));let r=L.staticGroup=new ln;e.add(r),L.look=n,L.tex=zp(h.mapId,i);let o={w:[],f:[],c:[],p:[]};for(let d of t.parts)o[Rv(d,s)].push(d);let a=d=>i&&(d==="w"||d==="p")?(g,x)=>(x<.9?.7+.3*(x/.9):1)*(s-x<.8?.84+.16*((s-x)/.8):1):null;for(let d of["w","f","c","p"]){let g=Wc(o[d],d,a(d));if(!g)continue;let x=new tt(g,new Nn({vertexColors:!0,map:L.tex[d]}));x.receiveShadow=i,x.castShadow=i&&(d==="w"||d==="p"),r.add(x)}let c=i?Uv(t):{deco:[],glass:[]},l=Wc(c.deco,"p");l&&r.add(new tt(l,new Nn({vertexColors:!0})));let u=Wc(t.glow.filter(d=>!d.f).concat(c.glass)),f=Wc(t.glow.filter(d=>d.f));if(u&&r.add(new tt(u,new It({vertexColors:!0}))),L.flickMat=new It({vertexColors:!0}),f&&r.add(new tt(f,L.flickMat)),i&&t.indoor){let d=t.rooms.map(p=>p.name),g=Gp(d),x=d.length,y=[];t.rooms.forEach((p,m)=>{let v=new Li(3.2,.62),E=v.attributes.uv,M=1-(m+1)/x;for(let w=0;w<E.count;w++)E.setY(w,M+E.getY(w)/x);v.translate(p.cx+5.4,2.8,p.z0+.2+.025),$c(v,16777215),y.push(v)}),r.add(new tt(wn(y,!1),new Nn({vertexColors:!0,map:g.tex})))}}var im=new Dn(.35,.35,3.4,10,1,!0),kv=new It({color:16765770,transparent:!0,opacity:.2,depthWrite:!1}),sm=new Dr(.28),Ov=new It({color:16765770});function Fv(n){if(L.markers.has(n))return;let e=h.map.stations[n],t=new ln,i=new tt(im,kv);i.position.y=1.7,t.add(i);let s=new tt(sm,Ov);s.position.y=2.3,t.add(s),t.position.set(e.x,0,e.z),L.scene.add(t),L.markers.set(n,{g:t,gem:s})}var Bv=new It({color:4905215,transparent:!0,opacity:.35,depthWrite:!1}),zv=new It({color:12580095});function Vu(n){if(rm("clue"),!n)return;let e=new ln,t=new tt(im,Bv);t.position.y=1.7,e.add(t);let i=new tt(sm,zv);i.scale.setScalar(1.5),i.position.y=2.3,e.add(i),e.position.set(n.x,0,n.z),L.scene.add(e),L.markers.set("clue",{g:e,gem:i})}function Gv(n){h.det&&(h.det.cur=n.cur,h.det.found=n.n-1,h.det.need=n.need,Vu(n.cur),h.phase!=="meeting"&&(bi("\u{1F50E} CLUE "+n.n+" of "+n.need+" FOUND!","It is in the <b>"+st(n.cur.room)+"</b> \u2013 go there and read it!<br><small>Look for the blue light.</small>",6e3),Me.alarm(),Gn("#4ad8ff",250)))}function Hv(n){h.det&&(h.det.cur=null,h.det.found=n.found,h.det.need=n.need,Vu(null),n.unlocked?(h.det.unlocked=!0,bi("\u{1F5F3}\uFE0F ENOUGH CLUES!","Everybody run to the <b>"+st(n.room)+"</b> and press the red button to VOTE!",8e3),Me.exitAlarm(),Gn("#ff4040",300)):We("\u{1F50E} <b>"+st(n.by)+"</b> read the clue ("+n.found+" / "+n.need+"). The next clue comes soon\u2026",3500,"good"))}function Vv(n){h.ghost&&h.escaped||Math.hypot(h.pos.x-n.x,h.pos.z-n.z)>24||(h.blackout=Math.max(h.blackout,n.secs),h.flick=Math.max(h.flick,.6),Hn()>=1&&(h.dark=Math.max(h.dark,n.secs)))}function rm(n){let e=L.markers.get(n);e&&(L.scene.remove(e.g),L.markers.delete(n))}function Wu(){h.colList=h.map.cols.slice(),h.map.doors.forEach(n=>{h.doors[n.id]||h.colList.push(n.col)})}function qp(n,e){let t=Wp*Wp,i=h.colList;for(let s=0;s<i.length;s++){let r=i[s],o=n<r.x0?r.x0:n>r.x1?r.x1:n,a=e<r.z0?r.z0:e>r.z1?r.z1:e,c=n-o,l=e-a;if(c*c+l*l<t)return!0}return!1}function Xu(n,e,t){if(h.doors[n]===e)return;h.doors[n]=e,Wu();let i=L.doors&&L.doors[n];i&&(i.open=e),L.doorLight&&L.doorLight[n]&&L.doorLight[n].color.setHex(e?3211104:16719904),t&&Me.door()}var Jc=new Nn({vertexColors:!0});function Q(n,e,t,i,s,r,o,a,c){o!=null&&e.scale(o,a??o,c??o),e.translate(i,s,r),$c(e,t),n.push(e)}var ku=new Map;function Wv(n){if(ku.has(n.id))return ku.get(n.id);let e=[],t=y=>new Tn(y,12,9),i=(y,p,m)=>new hn(y,p,m),s=(y,p)=>new Dn(y,y,p,12),r=n.color,o=14922895;Q(e,new rn(.22,.4,3,10),r,0,1.02,0,1,1,.82),Q(e,t(.21),o,0,1.62,0,1,1.05,1);for(let y of[-1,1])Q(e,t(.058),16777215,y*.08,1.645,.19,1,1,.6),Q(e,t(.03),1118481,y*.08,1.645,.215),Q(e,i(.1,.02,.02),3811874,y*.08,1.735,.18);Q(e,i(.09,.02,.02),9058874,0,1.54,.2),Q(e,t(.032),13803644,0,1.6,.215);for(let y of[-1,1])Q(e,t(.05),o,y*.205,1.62,0,.6,1,1);switch(Q(e,new Dn(.07,.08,.14,8),o,0,1.44,0),Q(e,new Tn(.22,12,6,0,Math.PI*2,0,Math.PI/2),2759958,0,1.69,-.045,1,.9,1),n.id){case"chef":Q(e,s(.2,.26),16777215,0,1.88,0),Q(e,t(.25),16777215,0,2.06,0,1,.8,1);break;case"doctor":Q(e,s(.22,.06),16777215,0,1.76,0),Q(e,s(.06,.02),13621468,0,1.8,.2),Q(e,i(.22,.06,.02),16722474,0,1.08,.19),Q(e,i(.06,.22,.02),16722474,0,1.08,.19);break;case"librarian":Q(e,i(.1,.07,.02),2236962,-.075,1.65,.205),Q(e,i(.1,.07,.02),2236962,.075,1.65,.205),Q(e,i(.05,.015,.02),2236962,0,1.65,.205),Q(e,i(.2,.28,.06),8934860,.3,.85,.12);break;case"scientist":Q(e,i(.44,.09,.06),3394798,0,1.76,.17),Q(e,new rn(.235,.3,3,10),16053492,0,.82,0,1,1,.85);break;case"engineer":Q(e,new Tn(.24,12,8,0,Math.PI*2,0,Math.PI/2),16763904,0,1.68,0),Q(e,i(.5,.04,.34),16763904,0,1.68,.06);break;case"detective":Q(e,s(.34,.04),4862752,0,1.78,0),Q(e,s(.2,.2),4862752,0,1.9,0),Q(e,s(.205,.05),1381653,0,1.83,0);break;case"explorer":Q(e,s(.38,.04),13152368,0,1.78,0),Q(e,s(.2,.18),13152368,0,1.88,0),Q(e,i(.36,.5,.18),3103279,0,1.08,-.27);break;case"artist":Q(e,t(.28),13378099,.05,1.82,0,1,.38,1),Q(e,s(.03,.08),13378099,.05,1.93,0),Q(e,i(.2,.14,.03),14596231,.3,.85,.1);break}let a=[],c=[],l=(y,p,m,v)=>(p&&y.rotateX(p),m&&y.rotateY(m),v&&y.rotateZ(v),y),u=(y,p,m,v,E,M,w)=>Q(y,l(s(p,m),Math.PI/2,0,0),v,E,M,w+m/2),f=(y,p,m)=>Q(e,new Tn(y,12,8,0,Math.PI*2,0,Math.PI/2),p,0,m,0);switch(n.id){case"chef":Q(e,i(.34,.4,.03),16777215,0,.95,.195),Q(e,s(.11,.05),13639712,0,1.38,0),u(a,.014,.3,10119738,0,-.52,.02),Q(a,t(.05),10119738,0,-.52,.36,1,.45,1);break;case"doctor":Q(e,l(new pi(.14,.014,6,14,Math.PI),0,0,Math.PI),3355443,0,1.32,.15),Q(e,t(.038),13621468,0,1.17,.2),Q(a,i(.03,.2,.15),9067051,.02,-.5,.1),Q(a,i(.02,.17,.12),16777215,.036,-.5,.1);break;case"librarian":Q(e,t(.045),13378099,-.055,1.37,.17,1.3,.8,.6),Q(e,t(.045),13378099,.055,1.37,.17,1.3,.8,.6),Q(e,t(.025),10031394,0,1.37,.18),Q(a,i(.04,.2,.15),7027242,0,-.52,.1),Q(a,i(.035,.18,.13),16050896,.008,-.52,.1);break;case"scientist":Q(a,t(.06),5627272,0,-.52,.1),Q(a,s(.022,.09),13625599,0,-.44,.1),Q(e,i(.05,.12,.02),2787914,.12,1,.2);break;case"engineer":Q(e,s(.25,.07),5913118,0,.72,0,1,1,.86),Q(e,i(.08,.1,.06),9071162,.2,.7,.1),u(a,.018,.34,11184810,0,-.52,.02),Q(a,new pi(.045,.018,6,10,Math.PI*1.6),11184810,0,-.52,.39);break;case"detective":Q(e,i(.05,.2,.02),9050650,0,1.2,.185),u(a,.012,.18,4862752,0,-.52,.02),Q(a,new pi(.075,.012,6,14),13938487,0,-.52,.28),Q(a,l(s(.07,.006),Math.PI/2,0,0),12577023,0,-.52,.28);break;case"explorer":Q(e,l(s(.035,.12),Math.PI/2,0,0),2236962,-.05,1.2,.2),Q(e,l(s(.035,.12),Math.PI/2,0,0),2236962,.05,1.2,.2),Q(a,s(.035,.24),15259816,0,-.52,.08),Q(a,s(.037,.03),13382451,0,-.42,.08);break;case"artist":Q(e,t(.035),4040191,-.1,1.1,.185,1,1,.4),Q(e,t(.03),16765770,.08,.95,.19,1,1,.4),Q(e,t(.03),4508774,-.04,.82,.19,1,1,.4),u(a,.012,.3,9067051,0,-.52,.02),Q(a,t(.03),16724821,0,-.52,.34,1,1,1.6);break;case"dog":f(.22,3112250,1.68),Q(e,i(.3,.03,.2),3112250,0,1.7,.2),Q(e,s(.235,.12),16747039,0,1.12,0,1,1,.84),Q(e,i(.02,.14,.01),2236962,0,1.3,.19),Q(e,l(s(.025,.06),0,0,Math.PI/2),16765770,0,1.22,.2),Q(a,t(.05),14152250,0,-.56,.08);break;case"magician":Q(e,s(.2,.3),1380380,0,1.9,0),Q(e,s(.31,.03),1380380,0,1.76,0),Q(e,s(.205,.05),9059032,0,1.81,0),Q(e,t(.03),16769882,0,1.9,.2,1,1,.4),Q(e,i(.54,.82,.04),5974696,0,1,-.2),Q(e,i(.5,.78,.02),2757712,0,1,-.17),Q(e,t(.04),13378099,-.05,1.37,.17,1.3,.8,.6),Q(e,t(.04),13378099,.05,1.37,.17,1.3,.8,.6),u(a,.012,.36,1118481,0,-.52,.02),u(a,.014,.05,16777215,0,-.52,.38),Q(a,t(.028),16773754,0,-.52,.45);break;case"firefighter":f(.25,13378082,1.68),Q(e,i(.5,.04,.14),13378082,0,1.69,-.2),Q(e,i(.14,.1,.02),15777840,0,1.8,.24),Q(e,s(.235,.05),16770138,0,.9,0,1,1,.84),Q(e,s(.235,.05),16770138,0,1.08,0,1,1,.84),Q(e,s(.075,.36),9082014,0,1.05,-.27),Q(a,s(.016,.42),8014370,0,-.5,.05),Q(a,i(.03,.1,.16),11581632,0,-.3,.1);break;case"guard":f(.22,2052003,1.68),Q(e,i(.3,.03,.2),1389422,0,1.7,.2),Q(e,t(.03),15777840,0,1.78,.2,1,1,.4),Q(e,t(.04),15777840,.1,1.18,.2,1,1,.4),Q(e,s(.235,.05),1381653,0,.72,0,1,1,.84),Q(e,i(.12,.03,.12),15777840,-.24,1.3,0),Q(e,i(.12,.03,.12),15777840,.24,1.3,0),Q(c,i(.04,.4,.3),2052003,-.07,-.35,.12),Q(c,i(.05,.12,.12),15777840,-.09,-.35,.12);break;case"musician":Q(e,new pi(.235,.022,6,14,Math.PI),2236962,0,1.62,0),Q(e,l(s(.075,.07),0,0,Math.PI/2),14692474,-.235,1.62,0),Q(e,l(s(.075,.07),0,0,Math.PI/2),14692474,.235,1.62,0),Q(e,t(.17),11887901,0,.92,-.27,1,1.15,.3),Q(e,t(.12),11887901,0,1.2,-.27,1,1,.3),Q(e,i(.045,.45,.03),3810324,0,1.6,-.27),Q(e,i(.07,.1,.03),3810324,0,1.88,-.27),Q(e,l(s(.045,.01),Math.PI/2,0,0),1710618,0,1,-.29);break;case"radio":Q(e,new pi(.235,.015,6,14,Math.PI),2236962,0,1.62,0),Q(e,l(s(.07,.06),0,0,Math.PI/2),2236962,-.235,1.62,0),Q(e,i(.14,.015,.015),2236962,-.15,1.54,.2),Q(e,t(.022),16724016,-.08,1.54,.2),Q(e,i(.3,.38,.14),5925690,0,1.05,-.25),Q(e,s(.01,.75),10066329,.1,1.6,-.28),Q(e,t(.03),16724016,.1,1.98,-.28),Q(e,s(.008,.5),10066329,-.1,1.5,-.28),Q(a,i(.05,.14,.03),2236962,0,-.56,.06),Q(a,s(.008,.1),7829367,.015,-.46,.06);break}let d=[];Q(d,new rn(.09,.4,3,6),2830138,0,-.3,0),Q(d,i(.17,.08,.28),1381653,0,-.6,.04);let g=y=>{let p=[];return Q(p,new rn(.075,.36,3,6),r,0,-.25,0),Q(p,t(.07),o,0,-.52,0),wn(p.concat(y),!1)},x={body:wn(e,!1),leg:wn(d,!1),arm:g([]),armR:a.length?g(a):null,armL:c.length?g(c):null};return x.armR=x.armR||x.arm,x.armL=x.armL||x.arm,ku.set(n.id,x),x}function qu(n){let e=Wv(xn(n)),t=new ln;t.add(new tt(e.body,Jc));let i=(s,r,o)=>{let a=new tt(s,Jc);return a.position.set(r,o,0),t.add(a),a};return t.children.forEach(s=>{s.castShadow=!0}),t.userData={legL:i(e.leg,-.12,.78),legR:i(e.leg,.12,.78),armL:i(e.armL,-.32,1.3),armR:i(e.armR,.32,1.3)},t}var mo={};function Xv(n){if(mo[n])return mo[n];let e=[],t=[],i=[],s=c=>new Tn(c,10,8),r=(c,l,u)=>new hn(c,l,u),o=(c,l)=>new Dn(c,c,l,8),a=c=>(c.rotateX(Math.PI/2),c);if(n==="dog"){Q(e,a(new rn(.1,.3,3,8)),13208139,0,.32,0),Q(e,s(.105),13208139,0,.43,.3),Q(e,r(.08,.06,.1),15255968,0,.39,.4),Q(e,s(.022),1118481,0,.41,.455);for(let l of[-1,1]){let u=r(.05,.12,.04);u.rotateZ(l*.3),Q(e,u,8014370,l*.1,.43,.27),Q(e,s(.016),1118481,l*.05,.46,.375)}Q(e,o(.108,.035),13639712,0,.37,.2),Q(e,s(.02),15777840,0,.33,.3);for(let l of[-1,1])for(let u of[-1,1])Q(e,o(.032,.2),12089918,l*.065,.1,u*.15);let c=new rn(.02,.16,2,6);c.rotateX(-.8),Q(t,c,12089918,0,.07,-.072),mo[n]={body:wn(e,!1),tail:wn(t,!1),eyes:null,tailAt:[0,.38,-.25]}}else{Q(e,a(new rn(.07,.22,3,8)),1842210,0,.24,0),Q(e,s(.075),1842210,0,.33,.2);for(let u of[-1,1])Q(e,new Bs(.03,.07,4),1842210,u*.05,.4,.19),Q(i,s(.015),10354506,u*.03,.34,.268);Q(e,o(.078,.025),9059032,0,.28,.14);for(let u of[-1,1])for(let f of[-1,1])Q(e,o(.022,.14),1842210,u*.045,.07,f*.1);let c=new rn(.016,.18,2,6);c.rotateX(-.5),Q(t,c,1842210,0,.08,-.045);let l=new rn(.016,.14,2,6);Q(t,l,1842210,0,.26,-.16),mo[n]={body:wn(e,!1),tail:wn(t,!1),eyes:wn(i,!1),tailAt:[0,.2,-.2]}}return mo[n]}var qv=new It({vertexColors:!0});function Yu(n){let e=Xv(n),t=new ln;t.add(new tt(e.body,Jc));let i=new tt(e.tail,Jc);return i.position.set(e.tailAt[0],e.tailAt[1],e.tailAt[2]),t.add(i),e.eyes&&t.add(new tt(e.eyes,qv)),t.visible=!1,L.scene.add(t),{g:t,tail:i,kind:n,init:!1,x:0,z:0,yaw:0,tr:[],ph:Math.random()*6}}function Yp(n,e,t,i,s,r,o,a){if(n.g.visible=i,!i){n.init=!1;return}let c,l;if(o)c=e+Math.cos(a)*1-Math.sin(a)*.15,l=t-Math.sin(a)*1-Math.cos(a)*.15;else{let y=n.tr,p=y[y.length-1];(!p||Math.hypot(e-p.x,t-p.z)>.35)&&(y.push({x:e,z:t}),y.length>4&&y.shift()),c=y[0].x,l=y[0].z}(!n.init||Math.hypot(n.x-e,n.z-t)>7)&&(n.x=c,n.z=l,n.init=!0,n.tr=[{x:e,z:t}]);let u=Math.min(1,s*6),f=c-n.x,d=l-n.z,g=Math.hypot(f,d);n.x+=f*u,n.z+=d*u;let x=g>.25;if(x){let y=Math.atan2(f,d)-n.yaw;y=Math.atan2(Math.sin(y),Math.cos(y)),n.yaw+=y*Math.min(1,s*9)}n.g.position.set(n.x,x?Math.abs(Math.sin(r*14+n.ph))*.04:0,n.z),n.g.rotation.y=n.yaw,n.tail.rotation.y=Math.sin(r*(x?18:7)+n.ph)*.55}function Yv(){let n=new ln,e=new It({color:10475263,transparent:!0,opacity:.45,depthWrite:!1}),t=new tt(new rn(.26,1,2,8),e);t.position.y=1,n.add(t);let i=new tt(new Tn(.22,8,8),e);return i.position.y=1.75,n.add(i),n}function Zv(n){let e=qu(n.job),t=Yv(),i=new tt(L.xrayGeo,L.xrayMat);i.position.y=1,i.renderOrder=999,i.visible=!1,e.add(i);let s=new Pi(new di({map:Iv(n.name,256,64,"bold 34px sans-serif"),transparent:!0}));s.scale.set(1.6,.4,1),s.position.y=2.35,e.add(s);let r=s.clone();t.add(r),r.position.y=2.3,L.scene.add(e),L.scene.add(t),e.visible=!1,t.visible=!1,L.shieldGeo=L.shieldGeo||new Tn(1.1,14,10),L.shieldMat=L.shieldMat||new It({color:4892927,transparent:!0,opacity:.3,depthWrite:!1,side:En});let o=new tt(L.shieldGeo,L.shieldMat);o.position.y=1,o.visible=!1,e.add(o),n.sh=o,n.shield=0,(n.job==="dog"||n.job==="magician")&&(n.pet=Yu(n.job==="dog"?"dog":"cat")),n.tag=s,n.av=e,n.gh=t,n.xr=i,n.cx=n.tx=0,n.cz=n.tz=0,n.cy=n.ty=0,n.cyaw=n.tyaw=0,n.new=!0,n.moving=0,n.stepT=0}function om(n,e,t){let i=h.players.get(n),s=qu(i?i.job:"chef");s.rotation.order="YXZ",s.rotation.x=-Math.PI/2,s.rotation.y=Math.random()*6,s.position.set(e,.25,t);let r=new tt(new Lr(.9,14),new It({color:6948872}));return r.rotation.x=-Math.PI/2,r.position.set(e,.03,t),L.scene.add(s),L.scene.add(r),{id:n,x:e,z:t,a:s,pool:r}}function Jv(){for(let n of L.bodies)L.scene.remove(n.a),L.scene.remove(n.pool);L.bodies=[],h.bodies=[]}function am(n,e){let t=new tt(new Tn(.22,10,8),new It({color:16771488}));t.position.set(n,.3,e),L.scene.add(t);let i=null;if(h.q>=1&&(i=new Gs(16771504,22,14,1.4),i.position.set(n,1.2,e),L.scene.add(i)),L.lamps.push({m:t,light:i,t:40}),L.lamps.length>4){let s=L.lamps.shift();L.scene.remove(s.m),s.light&&L.scene.remove(s.light)}}function $v(n){Lv(),h.mode=n.mode||"classic",h.aliveN=0,h.escN=0,h.mapId=n.map,h.map=Ap(n.map,{lockAll:h.mode==="survival"}),h.role=n.role,h.id=n.id,h.tasks=n.tasks,h.doors=n.doors.split("").map(e=>e==="1"),h.prog=n.prog,h.clues=n.clues.slice(),h.exitOpen=n.exitOpen,h.hatchCd=h.blackout=h.mirror=0,h.inGas=!1,h.hatchSeen=new Set,h.xcode=(n.xcode||[]).slice(),h.xn=n.xn||0,h.warnLeft=n.warnLeft==null?3:n.warnLeft,h.warnCd=0,h.charges=n.charges,h.alive=n.alive,h.escaped=n.escaped,h.ghost=!n.alive||n.escaped,h.rage=n.rage,h.paused=n.paused,h.scare=n.scare,h.forceClassic=n.look==="classic",h.cdTotal=n.cd,h.kcd=0,h.xray=h.sprint=h.abilCd=0,h.danger=!1,h.pings=[],h.qbox=null,h.meeting=null,h.emergLeft=1,h.waitingQ=!1,h.appT=50+Math.random()*40,h.tl=n.tl,h.w2=n.tl!=null&&n.tl<=120,h.w30=n.tl!=null&&n.tl<=30,h.onBreak=!1,pt("breakbox",!1),H("btnBreak").style.display="block",fo(Hn()),Dv(),sr(),h.det=n.det||null,h.det&&h.det.cur&&Vu(h.det.cur),H("fps").style.display=h.showFps?"block":"none",H("chkFps").checked=h.showFps,h.players=new Map(n.players.map(e=>[e.id,Object.assign({},e,{st:0})]));for(let[e,t]of n.status)h.players.has(e)&&(h.players.get(e).st=t);for(let e of h.players.values())e.id!==h.id&&Zv(e);L.myPet=h.job==="dog"||h.job==="magician"?Yu(h.job==="dog"?"dog":"cat"):null,h.sniff=h.scan=h.slowT=h.shield=0,h.doors.forEach((e,t)=>{L.doors[t]&&(L.doors[t].open=e,L.doors[t].t=e?1:0,L.doors[t].mesh.visible=!e,e&&L.doorLight[t].color.setHex(3211104))}),Wu();for(let e of n.bodies)L.bodies.push(om(e.id,e.x,e.z));(n.exitOpen||h.mode==="survival")&&(L.exitBeam.visible=!0),h.pos={x:n.spawn.x,y:h.ghost?2:vo,z:n.spawn.z},h.yaw=n.spawn.yaw,h.pitch=0,h.phase=n.phase==="meeting"?"meeting":"play";for(let e of["join","lobby","end","lost","qbox"])pt(e,!1);pt("hud",!0),H("app").classList.add("playing"),H("pausebox").style.display=n.paused?"flex":"none",H("hudRole").textContent=xn(h.job).emoji+" "+xn(h.job).name,H("hudRole").className="crew",H("hudMap").textContent=h.map.emoji+" "+h.map.name+(h.mode==="survival"?" \xB7 SURVIVAL":h.mode==="detective"?" \xB7 DETECTIVE":""),H("killbtn").style.display="none",Pu(h.mapId),n.resume?We("Reconnected!",2500):jv(),n.brk&&Kc(!0),gm()}function jv(){let n=h.role==="killer";H("roleBig").textContent=n?"YOU ARE THE KILLER":"YOU ARE CREW",H("roleBig").className=n?"k":"c",H("roleSub").innerHTML=n?h.mode==="detective"?"DETECTIVE MODE! Nobody knows it is you. Catch the crew before they find the clues and vote you out!<br>You cannot read clues, but you can join the vote. Press <b>F</b> or <b>click</b> next to a student to catch them.":h.mode==="survival"?"SURVIVAL MODE! Nobody knows it is you. Catch EVERYONE before they escape!<br>The doors are locked until the crew open them. Press <b>F</b> or <b>click</b> next to a student to catch them.":"Nobody knows it is you. Catch the crew one by one, but don't get caught!<br>You still get questions to look busy. Press <b>F</b> or <b>click</b> next to a student to catch them.":h.mode==="detective"?"DETECTIVE MODE! One of your friends is the killer!<br>Clues appear in the rooms. Run to each clue, answer the question to read it, then go to the red button in the main room and VOTE out the killer. Choose carefully \u2013 a wrong vote lets the killer win!":h.mode==="survival"?"SURVIVAL MODE! One of your friends is the killer, but you will not know who!<br>Every door is locked: answer questions to open them. Finish your tasks, open the exit and RUN. If you are caught you become a ghost.<br>Survive!":"One of your friends is the killer! Do your tasks (answer questions) to open the exit, find clues, and vote out the killer.<br>Stay together and watch out!",pt("role",!0),H("roleTapBox").style.display="flex",H("roleShow").style.display="none",h.frozenUntil=performance.now()+3e4,clearTimeout(h.roleT),h.roleT=setTimeout(cm,15e3)}function cm(){H("roleShow").style.display!=="block"&&(clearTimeout(h.roleT),H("roleTapBox").style.display="none",H("roleShow").style.display="block",Me.gong(),setTimeout(()=>{pt("role",!1),h.frozenUntil=performance.now(),h.phase==="play"&&(H("lockhint").style.display="flex"),h.map&&h.map.story&&bi("\u{1F4CD} "+st(h.map.name),st(h.map.story),7e3)},3500))}H("btnRoleTap").addEventListener("click",cm);function Kv(n){if(h.map){for(let[e,t,i,s,r,o]of n.p){let a=h.players.get(e);a&&(a.st=o,e!==h.id&&(a.tx=t,a.ty=i,a.tz=s,a.tyaw=r,a.new&&a.av&&(a.cx=t,a.cy=i,a.cz=s,a.cyaw=r,a.new=!1)))}h.prog[0]=n.pr,n.al!=null&&(h.aliveN=n.al,h.escN=n.es),n.tl!=null&&(h.tl=n.tl,n.tl>130&&(h.w2=!1),n.tl>40&&(h.w30=!1),n.tl<=120&&!h.w2&&(h.w2=!0,We("\u23F0 <b>2 minutes left!</b> Finish the tasks and escape!",5e3,"bad"),Me.warn()),n.tl<=30&&!h.w30&&(h.w30=!0,We("\u23F0 <b>30 seconds left!</b>",5e3,"bad"),Me.warn())),n.d.split("").forEach((e,t)=>Xu(t,e==="1",!0)),n.kc!=null&&(h.kcd=n.kc),n.rg!=null&&(h.rage=n.rg)}}function Qv(n){let e=h.players.get(n.id);e&&(e.st=1),L.bodies.push(om(n.id,n.x,n.z)),h.bodies.push({id:n.id,x:n.x,z:n.z});let t=Math.hypot(h.pos.x-n.x,h.pos.z-n.z);n.you?(h.alive=!1,h.ghost=!0,h.jump=1.7,h.qbox=null,pt("qbox",!1),pt("kpbox",!1),Me.scream(1),Me.sting(),Gn("#a00",500),Hn()>=2?fb():(H("jump").style.display="flex",pb()),H("jump").style.display="flex",setTimeout(()=>{H("jump").style.display="none",We("\u{1F480} <b>You were caught!</b> You are a ghost now. You can fly around and still do your tasks to help your team!",8e3,"bad")},1800),document.exitPointerLock&&document.exitPointerLock()):t<45&&(Me.scream(Math.max(.2,1-t/45)),Hn()>=2&&t<18&&Gn("#800",300),We("\u{1F631} Someone screamed!",3e3,"bad"))}function eb(n){let e=h.players.get(n.id);e&&(e.st=0);let t=L.bodies.findIndex(i=>i.id===n.id);t>=0&&(L.scene.remove(L.bodies[t].a),L.scene.remove(L.bodies[t].pool),L.bodies.splice(t,1)),h.bodies=h.bodies.filter(i=>i.id!==n.id),Me.revive(),n.id===h.id?(h.alive=!0,h.ghost=!1,h.pos.x=n.x,h.pos.z=n.z,h.pos.y=vo,We("\u{1F49A} You were revived by the Doctor!",5e3,"good")):We("\u{1F49A} "+st(e?e.name:"Someone")+" was revived!",3500,"good")}function tb(n){let e=h.players.get(n.id);e&&(e.st=2),n.id===h.id?(h.escaped=!0,h.ghost=!0,We(h.mode==="survival"?"\u{1F3C3} <b>YOU ESCAPED!</b> You are safe. Now you are a HELPER \u2013 press <b>V</b> to warn the others where the killer is!":"\u{1F3C3} <b>YOU ESCAPED!</b> You are safe. You can watch the others.",9e3,"good"),Me.escape()):We("\u{1F3C3} "+st(e?e.name:"Someone")+" escaped!",3500,"good")}function nb(){h.exitOpen=!0,L.exitBeam&&(L.exitBeam.visible=!0);let n=h.map.doors.findIndex(e=>e.kind==="gate");n>=0&&Xu(n,!0,!0),Me.exitAlarm(),Op(),We("\u{1F6AA} <b>ALL TASKS DONE!</b> The EXIT is open. RUN to the green light!",9e3,"good"),h.flick=2}function ib(n){h.phase="ended",h.dangerOn=!1,po(),H("bodyBanner").style.display="none",document.exitPointerLock&&document.exitPointerLock();for(let s of["hud","qbox","meet","pausebox","jump","cluebox","menu","role","lockhint","breakbox"])pt(s,!1);H("btnBreak").style.display="none",h.onBreak=!1,H("lockhint").style.display="none";let e=n.winner==="crew",t=h.role==="killer",i=e!==t;H("endTitle").textContent=e?"\u{1F389} THE CREW WINS!":"\u{1F52A} THE KILLER WINS!",H("endTitle").className=e?"c":"k",H("endSub").innerHTML=(n.reason==="time"?"\u23F0 <b>Time is up!</b><br>":n.reason==="wrongvote"?"\u{1F631} <b>The class voted out an innocent friend!</b><br>":n.mode==="detective"&&e?"\u{1F575}\uFE0F <b>The detectives found the killer!</b><br>":"")+"The killer was <b>"+xn(n.killer.job).emoji+" "+st(n.killer.name)+"</b>.<br>"+(i?"You won! \u{1F3C6}":"Better luck next time!")+(n.mode==="survival"?'<br><span style="color:#ffd34a">\u{1F3C3} Escape Champion: <b>'+st(n.champ||"\u2014")+"</b> &nbsp;\xB7&nbsp; \u2B50 Top Scorer: <b>"+st(n.top||"\u2014")+"</b></span>":""),H("endTable").innerHTML="<tr><th>Name</th><th>Job</th><th>Tasks</th><th>\u2713</th><th>\u2717</th><th>Result</th>"+(n.mode==="survival"?"<th>\u2B50 Points</th>":"")+"</tr>"+(n.mode==="survival"?n.stats.slice().sort((s,r)=>r.score-s.score):n.stats).map(s=>'<tr class="'+(s.role==="killer"?"kr":"")+'"><td>'+st(s.name)+(s.role==="killer"?" \u{1F52A}":"")+"</td><td>"+xn(s.job).emoji+"</td><td>"+s.done+"/"+s.total+"</td><td>"+s.correct+"</td><td>"+s.wrong+"</td><td>"+(n.mode==="survival"&&s.order&&s.order<=3?["\u{1F947}","\u{1F948}","\u{1F949}"][s.order-1]+" ":"")+s.status+"</td>"+(n.mode==="survival"?"<td><b>"+s.score+"</b></td>":"")+"</tr>").join(""),pt("end",!0),(i?Me.win:Me.lose)()}function sb(n){if(h.waitingQ=!1,h.phase!=="play")return;h.qbox={qid:n.qid,kind:n.kind,id:n.id,locked:!1,hint:n.hint,hinted:!1,n:n.opts.length},pt("kpbox",!1),H("qTitle").textContent=n.kind==="boss"?"\u{1F6AA} EXIT QUESTION \u2013 answer to open the door!":n.kind==="lock"?"\u{1F512} Unlock the door":n.kind==="clue"?"\u{1F50E} Read the clue \u2013 answer to reveal it!":"\u{1F4DD} Task: "+Zu(n.id),H("qText").textContent=n.text;let e=["#e84b4b","#3b82f6","#2fb36b","#e0a81c"];H("qOpts").innerHTML=n.opts.map((i,s)=>'<button class="opt" data-i="'+s+'" style="--c:'+e[s%4]+'"><span class="ol">'+"ABCD"[s]+"</span> "+st(i)+"</button>").join(""),H("qOpts").querySelectorAll(".opt").forEach(i=>i.addEventListener("click",()=>Ju(+i.dataset.i)));let t=H("qHint");t.style.display=n.hint>0&&n.opts.length>=3?"inline-block":"none",t.textContent="\u{1F4A1} "+xn(h.job).abName+" ("+n.hint+")",H("qMsg").textContent="",H("qMsg").className="",pt("qbox",!0),document.exitPointerLock&&document.exitPointerLock(),H("lockhint").style.display="none"}function rb(){let n=h.tasks.filter(e=>e.done).length;if(n<h.tasks.length){We("\u{1F6AA} Finish ALL your tasks first ("+n+"/"+h.tasks.length+").",2500,"bad");return}h.qbox={kp:!0,locked:!1,n:0},H("kpCode").textContent=h.xcode.join(" "),H("kpIn").value="",H("kpIn").maxLength=h.xn||10,H("kpIn").placeholder=Array(h.xn||4).fill("\u2022").join(" "),pt("kpbox",!0),document.exitPointerLock&&document.exitPointerLock(),H("lockhint").style.display="none",setTimeout(()=>H("kpIn").focus(),50)}function lm(){let n=H("kpIn").value.replace(/\D/g,"");n&&(Et({t:"code",c:n}),H("kpIn").value="",Me.click())}H("kpOk").addEventListener("click",lm);H("kpIn").addEventListener("keydown",n=>{n.key==="Enter"?lm():n.key==="Escape"&&jc()});H("kpClose").addEventListener("click",jc);document.querySelectorAll("#kpPad button").forEach(n=>n.addEventListener("click",()=>{let e=H("kpIn"),t=n.dataset.k;t==="C"?e.value="":e.value.length<e.maxLength&&(e.value+=t),e.focus(),Me.click()}));function hm(){if(!(!h.escaped||h.mode!=="survival"||h.phase!=="play")){if(h.warnLeft<=0){We("No warnings left.",1500);return}if(h.warnCd>0){We("\u23F3 Wait "+Math.ceil(h.warnCd)+"s\u2026",1200);return}h.warnCd=15,Et({t:"warn"})}}H("btnWarn").addEventListener("click",hm);function ob(n){let e=Hn();n.k==="blackout"?(h.blackout=n.secs,h.flick=1,We("\u{1F526} <b>BLACKOUT!</b> The lights died \u2013 use your flashlight!",4500,"bad"),Me.creak()):n.k==="mirror"?(h.mirror=n.secs,We("\u{1F921} <b>FUNHOUSE MIRRORS!</b> Your map is flipped for "+n.secs+" seconds.",4500,"bad"),Me.whisper()):n.k==="axe"?(We("\u{1FA93} <b>CRASH!</b> A door was chopped open!",3500,"good"),Me.thud()):n.k==="storm"?kp():n.k==="slam"&&(h.flick=.7,We("\u{1F6AA} <b>SLAM!</b> A door locked itself again!",4e3,"bad"),Me.thud())}function ab(){let n=h.map&&h.map.gas;if(!n||!n.length)return!1;for(let e of n)if(Math.hypot(h.pos.x-e.x,h.pos.z-e.z)<e.r)return!0;return!1}function Zu(n){let e=h.map.stations[n];return h.map.rooms[e.room].name+" \u2013 "+e.name}function Ju(n){let e=h.qbox;!e||e.locked||(e.locked=!0,Et({t:"ans",qid:e.qid,i:n}),Me.click(),H("qOpts").querySelectorAll(".opt").forEach(t=>{t.disabled=!0,+t.dataset.i===n&&t.classList.add("pick")}))}H("qHint").addEventListener("click",()=>{let n=h.qbox;n&&!n.hinted&&!n.locked&&Et({t:"hint",qid:n.qid})});H("qClose").addEventListener("click",jc);function jc(){h.qbox&&!h.qbox.locked&&Et({t:"cancelq"}),h.qbox=null,pt("qbox",!1),pt("kpbox",!1),h.phase==="play"&&(H("lockhint").style.display="flex")}function cb(n){let e=h.qbox;if(!(!e||e.qid!==n.qid)){e.hinted=!0,H("qHint").style.display="none",h.charges.hint=n.left;for(let t of n.remove){let i=H("qOpts").querySelector('[data-i="'+t+'"]');i&&(i.disabled=!0,i.classList.add("gone"))}Me.hint()}}function lb(n){let e=h.qbox;if(!e||e.qid!==n.qid)return;let t=H("qMsg");if(n.ok){if(t.textContent=e.kind==="boss"?"\u2705 Correct! The exit door opens \u2013 RUN!":e.kind==="lock"?"\u2705 Correct! The door unlocks!":e.kind==="clue"?"\u2705 Correct! The clue is revealed \u2013 check your clue list [C]!":"\u2705 Correct! Task complete!",t.className="good",Me.correct(),H("qOpts").querySelectorAll(".opt").forEach(i=>{i.classList.contains("pick")&&i.classList.add("right")}),e.kind==="task"){let i=h.tasks.find(s=>s.sid===e.id);i&&(i.done=!0,rm(e.id))}setTimeout(()=>{h.qbox===e&&(h.qbox=null,pt("qbox",!1),h.phase==="play"&&(H("lockhint").style.display="flex"))},1100)}else{Me.wrong(),Gn("#c00",300);let i=n.right!=null?H("qOpts").querySelector('[data-i="'+n.right+'"]'):null;i&&i.classList.add("right"),H("qOpts").querySelectorAll(".opt").forEach(s=>{s.classList.contains("pick")&&s.classList.add("wrong")}),t.className="bad",h.role==="killer"||h.ghost?t.textContent="\u274C Not quite. The right answer is shown in green.":e.kind==="boss"?t.textContent="\u274C Wrong! Enter your code again at the exit door.":t.textContent=n.saved?"\u274C Wrong! But your Second Chance protected the team ("+n.left+" left).":"\u274C Wrong! The killer heard you and grew stronger\u2026 Try again!",setTimeout(()=>{h.qbox===e&&(h.qbox=null,pt("qbox",!1),h.phase==="play"&&(H("lockhint").style.display="flex"))},2600)}}function bi(n,e,t){let i=H("bodyBanner");H("bbT").innerHTML=n,H("bbS").innerHTML=e,i.style.display="block",i.classList.remove("pop"),i.offsetWidth,i.classList.add("pop"),clearTimeout(bi.t),bi.t=setTimeout(()=>{i.style.display="none"},t||3800)}function hb(n){if(n.stage==="discuss"){h.phase="meeting",h.qbox=null,pt("qbox",!1),H("lockhint").style.display="none",document.exitPointerLock&&document.exitPointerLock(),h.meeting={stage:"discuss",by:n.by,why:n.why,victim:n.victim,end:performance.now()+n.secs*1e3,cand:n.cand,voted:[],my:void 0,ready:n.ready||[],myReady:!1},Gn("#fff",300),Du(!0);let e=t=>{let i=[...h.players.values()].find(s=>s.name===t);return(i?xn(i.job).emoji+" ":"")+"<b>"+st(t)+"</b>"};n.why==="body"?(bi("\u{1F480} BODY FOUND!",e(n.by)+" found "+e(n.victim)+"'s body!<br><small>"+e(n.victim)+" was caught by the killer.</small>",4500),Me.bodyFound()):n.why==="vote"?(bi("\u{1F5F3}\uFE0F TIME TO VOTE!","Called by "+e(n.by)+"<br><small>Talk it over, then vote. A wrong vote lets the killer win!</small>",4500),Me.alarm()):(bi("\u{1F6A8} EMERGENCY MEETING","Called by "+e(n.by),3200),Me.alarm())}else h.meeting&&(h.meeting.stage=n.stage,h.meeting.end=performance.now()+n.secs*1e3,h.meeting.cand=n.cand,h.meeting.voted=n.voted,n.stage==="result"&&(h.meeting.res=n,n.ejected&&Me.gong()));pt("meet",!0),_o()}function _o(){let n=h.meeting;if(!n)return;let e=H("meetTitle"),t=n.stage==="vote"&&n.cand.includes(h.id)&&n.my===void 0;e.innerHTML=n.why==="body"?"\u{1F480} <b>"+st(n.by)+"</b> found <b>"+st(n.victim)+"</b>'s body!":n.why==="vote"?"\u{1F5F3}\uFE0F <b>"+st(n.by)+"</b> called the FINAL VOTE!":"\u{1F6A8} <b>"+st(n.by)+"</b> called an emergency meeting!",H("meetStage").textContent=n.stage==="discuss"?"DISCUSS \u2013 talk to each other! Who is the killer?":n.stage==="vote"?"VOTE \u2013 who do you think is the killer?":"RESULT";let i=n.res;H("meetGrid").innerHTML=[...h.players.values()].map(a=>{let c=a.st===1||n.stage!=="result"&&!n.cand.includes(a.id),l=n.voted.includes(a.id),u=i?(i.tally.find(f=>f[0]===a.id)||[0,0])[1]:0;return'<div class="vc'+(c?" dead":"")+(n.my===a.id?" sel":"")+(t&&!c?" can":"")+'" data-id="'+a.id+'"><div class="ve">'+xn(a.job).emoji+"</div><b>"+st(a.name)+(a.id===h.id?" (you)":"")+"</b>"+(c?"<small>\u274C out</small>":"")+(l&&n.stage==="vote"?'<span class="vt">\u2714 voted</span>':"")+(i&&u?'<span class="vn">'+u+" vote"+(u>1?"s":"")+"</span>":"")+"</div>"}).join(""),H("meetGrid").querySelectorAll(".vc.can").forEach(a=>a.addEventListener("click",()=>um(+a.dataset.id))),H("btnSkip").style.display=t?"inline-block":"none";let s=n.cand.length,r=n.cand.includes(h.id);H("btnReady").style.display=n.stage==="discuss"&&r?"inline-block":"none",H("btnReady").disabled=!!n.myReady,H("btnReady").textContent=n.myReady?"\u2714 Ready - waiting for the others ("+n.ready.length+" of "+s+")":"\u2705 I'm ready to vote ("+n.ready.length+" of "+s+" ready)",H("meetWait").textContent=n.stage==="vote"?r?n.my!==void 0?"\u2714 You voted - "+n.voted.length+" of "+s+" have voted":"Tap who you think is the killer  ("+n.voted.length+" of "+s+" voted)":"You are out - watch the vote.":n.stage==="discuss"?r?"":"You are out - listen to the others.":"",H("meetClues").innerHTML=h.clues.length?"<b>\u{1F4D3} Clues so far:</b><ul>"+h.clues.map(a=>"<li>"+st(a)+"</li>").join("")+"</ul>":"<i>No clues yet.</i>";let o=H("meetRes");i?(o.style.display="block",o.innerHTML=i.ejected?'<div class="big">'+st(i.ejected.name)+' was voted out\u2026</div><div class="'+(i.ejected.killer?"good":"bad")+' big2">'+(i.ejected.killer?"and they WERE the killer! \u{1F389}":"and they were NOT the killer. \u{1F628}")+"</div>":'<div class="big">Nobody was voted out.</div>'):o.style.display="none"}function um(n){let e=h.meeting;!e||e.my!==void 0||(e.my=n,Et({t:"vote",target:n}),Me.click(),_o())}H("btnSkip").addEventListener("click",()=>um(0));H("btnReady").addEventListener("click",()=>{let n=h.meeting;!n||n.myReady||(n.myReady=!0,Et({t:"ready"}),Me.click(),_o())});setInterval(()=>{let n=h.meeting;!n||h.paused||(H("meetTime").textContent=n.stage==="result"?"":Math.max(0,Math.ceil((n.end-performance.now())/1e3))+"s")},250);function ub(n){h.meeting=null,h.phase="play",pt("meet",!1),H("lockhint").style.display="flex",Du(!1),Jv();for(let[e,t]of n.status){let i=h.players.get(e);i&&(i.st=t),e===h.id&&(h.alive=t===0,h.ghost=t!==0)}L.camera&&(h.flick=1)}var Zp=["scare_1.jpg","scare_2.jpg","scare_3.jpg"].map(n=>{let e=new Image;return e.src=n,e}),Jp=-1;function db(){let n=Zp.map((l,u)=>l.complete&&l.naturalWidth>0?u:-1).filter(l=>l>=0);if(!n.length)return!1;let e=n[Math.floor(Math.random()*n.length)];n.length>1&&e===Jp&&(e=n[(n.indexOf(e)+1)%n.length]),Jp=e;let t=Zp[e],i=H("jumpc"),s=i.getContext("2d");i.width=1280,i.height=Math.max(360,Math.min(1e3,Math.round(1280*innerHeight/Math.max(1,innerWidth))));let r=Math.max(i.width/t.naturalWidth,i.height/t.naturalHeight),o=t.naturalWidth*r,a=t.naturalHeight*r;s.drawImage(t,(i.width-o)/2,(i.height-a)/2,o,a),s.fillStyle="rgba(120,0,0,.18)",s.fillRect(0,0,i.width,i.height);let c=H("jump");return c.classList.remove("calm"),c.classList.remove("photo"),c.offsetWidth,c.classList.add("photo"),!0}function fb(){if(db())return;H("jump").classList.remove("photo");let n=H("jumpc"),e=n.getContext("2d");n.width=640,n.height=480,e.fillStyle="#000",e.fillRect(0,0,640,480);let t=e.createRadialGradient(320,230,20,320,240,260);t.addColorStop(0,"#d9d4c4"),t.addColorStop(1,"#2a2620"),e.fillStyle=t,e.beginPath(),e.ellipse(320,250,170,220,0,0,7),e.fill(),e.fillStyle="#000",e.beginPath(),e.ellipse(250,200,48,70,-.2,0,7),e.ellipse(390,200,48,70,.2,0,7),e.fill(),e.fillStyle="#fff",e.beginPath(),e.arc(252,215,9,0,7),e.arc(388,215,9,0,7),e.fill(),e.fillStyle="#300",e.beginPath(),e.moveTo(230,320);for(let i=0;i<=10;i++)e.lineTo(230+i*18,320+(i%2?90:20));for(let i=10;i>=0;i--)e.lineTo(230+i*18,400+(i%2?-10:40));e.closePath(),e.fill(),e.strokeStyle="#a00",e.lineWidth=5;for(let i=0;i<9;i++)e.beginPath(),e.moveTo(200+Math.random()*240,330),e.lineTo(200+Math.random()*240,470),e.stroke();e.fillStyle="rgba(160,0,0,.25)",e.fillRect(0,0,640,480),H("jump").classList.remove("calm")}function pb(){H("jump").classList.remove("photo");let n=H("jumpc"),e=n.getContext("2d");n.width=640,n.height=240,e.fillStyle="#220",e.fillRect(0,0,640,240),e.fillStyle="#fff",e.font="48px sans-serif",e.textAlign="center",e.fillText("You were caught\u2026",320,130),H("jump").classList.add("calm")}function mb(){let n=document.createElement("canvas");n.width=128,n.height=256;let e=n.getContext("2d");e.fillStyle="rgba(0,0,0,.92)",e.beginPath(),e.moveTo(30,250),e.lineTo(40,110),e.quadraticCurveTo(64,20,88,110),e.lineTo(98,250),e.closePath(),e.fill(),e.beginPath(),e.arc(64,62,30,0,7),e.fill(),e.fillStyle="#fff",e.beginPath(),e.ellipse(52,60,6,10,0,0,7),e.ellipse(76,60,6,10,0,0,7),e.fill();let t=new Ln(n);return t.colorSpace=wt,t}addEventListener("keydown",n=>{if(h.off){n.preventDefault();return}if(h.phase==="join"||h.phase==="lobby")return;let e=n.key.toLowerCase();if(!(n.target&&(n.target.tagName==="INPUT"||n.target.tagName==="SELECT"))){if(e==="h"&&(h.phase==="play"||h.phase==="meeting")){Kc(!h.onBreak);return}if(!h.onBreak){if(h.qbox){let t="1234".indexOf(e)>=0?"1234".indexOf(e):"abcd".indexOf(e);if(t>=0&&t<h.qbox.n){let i=H("qOpts").querySelector('[data-i="'+t+'"]');i&&!i.disabled&&Ju(t)}e==="escape"&&jc();return}Dt[e]=!0,["arrowup","arrowdown","arrowleft","arrowright"," "].includes(e)&&n.preventDefault(),!(h.phase!=="play"||h.paused)&&(e==="e"||e==="r"?fm():e==="f"?pm():e==="q"?mm():e==="c"?ju():e==="v"&&hm())}}});addEventListener("keyup",n=>{Dt[n.key.toLowerCase()]=!1});addEventListener("blur",()=>{for(let n in Dt)Dt[n]=!1});document.addEventListener("mousemove",n=>{h.phase!=="play"||h.qbox||h.paused||(document.pointerLockElement===H("gl")||$u)&&(h.yaw-=(n.movementX||0)*.0022,h.pitch=nr(h.pitch-(n.movementY||0)*.0022,-1.45,1.45))});var $u=!1;H("gl").addEventListener("mousedown",()=>{$u=!0,h.phase==="play"&&document.pointerLockElement!==H("gl")?dm():pm()});addEventListener("mouseup",()=>{$u=!1});function dm(){if(!(h.qbox||h.paused||h.phase!=="play"))try{let n=H("gl").requestPointerLock();n&&n.catch&&n.catch(()=>{})}catch{}}H("lockhint").addEventListener("click",()=>{H("lockhint").style.display="none",dm()});document.addEventListener("pointerlockchange",()=>{document.pointerLockElement===H("gl")?H("lockhint").style.display="none":h.phase==="play"&&!h.qbox&&!h.paused&&!h.onBreak&&!H("menu").style.display.includes("flex")&&performance.now()>h.frozenUntil&&(H("lockhint").style.display="flex")});H("btnMenu").addEventListener("click",()=>{pt("menu",!0),document.exitPointerLock&&document.exitPointerLock(),H("lockhint").style.display="none"});H("btnResume").addEventListener("click",()=>{pt("menu",!1),H("lockhint").style.display="flex"});H("btnClues").addEventListener("click",ju);H("btnCluesClose").addEventListener("click",ju);function ju(){let n=H("cluebox").style.display!=="flex";if(n){let e=h.mode==="survival"?'<li style="list-style:none;font-size:26px;color:#7fe3ff">\u{1F522} Your EXIT CODE: <b>'+h.xcode.join(" ")+" "+"_ ".repeat(Math.max(0,(h.xn||h.tasks.length)-h.xcode.length))+"</b></li>":"";H("clueList").innerHTML=e+(h.clues.length?h.clues.map(t=>"<li>"+st(t)+"</li>").join(""):"<li><i>No clues yet. Unlock doors to find clues about the killer!</i></li>"),document.exitPointerLock&&document.exitPointerLock(),H("lockhint").style.display="none"}else H("lockhint").style.display="flex";pt("cluebox",n)}H("myGfx").addEventListener("change",()=>{let n=H("myGfx").value;h.smooth=n==="s",h.autoClassic=!1,n!=="s"&&(h.q=+n),sr()});H("chkFps").addEventListener("change",()=>{h.showFps=H("chkFps").checked,H("fps").style.display=h.showFps?"block":"none"});H("vol").addEventListener("input",()=>Hc(+H("vol").value/100));H("myScare").addEventListener("change",()=>{h.myScare=+H("myScare").value,fo(Hn())});function Ku(){if(!h.map||h.escaped)return null;let n=h.pos,e=h.map,t=null,i=s=>{(!t||s.d<t.d)&&(t=s)};if(!h.ghost&&h.mode==="classic"){for(let r of h.bodies){let o=Math.hypot(n.x-r.x,n.z-r.z);o<3.4&&i({kind:"report",d:o-3,text:"\u{1F6A8} Press <b>E</b> \u2013 REPORT the body!"})}let s=Math.hypot(n.x-e.button.x,n.z-e.button.z);s<2.8&&h.emergLeft>0&&i({kind:"emerg",d:s,text:"\u{1F534} Press <b>E</b> \u2013 Emergency meeting"})}if(h.mode==="detective"&&h.det){let s=h.det.cur;if(s){let r=Math.hypot(n.x-s.x,n.z-s.z);r<3.2&&i({kind:"clue",id:s.sid,d:r,text:"\u{1F50E} Press <b>E</b> \u2013 Read the CLUE (answer a question)"})}if(!h.ghost){let r=Math.hypot(n.x-e.button.x,n.z-e.button.z);r<3.4&&i({kind:h.det.unlocked?"emerg":"locked",d:r,text:h.det.unlocked?"\u{1F534} Press <b>E</b> \u2013 CALL THE VOTE":"\u{1F512} Vote locked \u2013 find "+Math.max(0,h.det.need-h.det.found)+" more clue(s) first"})}}for(let s of h.tasks)if(!s.done){let r=e.stations[s.sid],o=Math.hypot(n.x-r.x,n.z-r.z);o<3&&i({kind:"task",id:s.sid,d:o,text:"\u{1F4DD} Press <b>E</b> \u2013 Do task: "+Zu(s.sid)})}if(!h.ghost&&h.role!=="killer"&&e.hatches)for(let s of e.hatches){let r=Math.hypot(n.x-s.x,n.z-s.z);r<2.3&&i({kind:"hatch",id:s.id,d:r-.5,text:h.hatchCd>0?"\u{1F573}\uFE0F Secret passage recharging\u2026 "+Math.ceil(h.hatchCd)+"s":"\u{1F573}\uFE0F Press <b>E</b> \u2013 SECRET PASSAGE (crew only) \u2013 jump to the other side!"})}if(h.mode==="survival"&&!h.ghost){let s=e.doors.find(r=>r.kind==="gate");if(s){let r=Math.hypot(n.x-s.cx,n.z-s.cz);if(r<4.4){let o=h.tasks.filter(a=>a.done).length;i({kind:"keypad",d:r-1,text:o>=h.tasks.length?"\u{1F522} Press <b>E</b> \u2013 Enter your EXIT CODE":"\u{1F6AA} Exit door \u2013 finish your tasks first ("+o+"/"+h.tasks.length+")"})}}}if(h.role!=="killer")for(let s of e.panels){if(h.doors[s.door])continue;let r=Math.hypot(n.x-s.x,n.z-s.z);r<2.6&&i({kind:"lock",id:s.door,d:r,text:"\u{1F512} Press <b>E</b> \u2013 Answer to unlock this door"})}return t}function fm(){if(h.qbox||h.waitingQ)return;let n=Ku();n&&(n.kind==="report"?Et({t:"report"}):n.kind==="emerg"?(h.mode!=="detective"&&h.emergLeft--,Et({t:"emerg"})):n.kind==="locked"?We("\u{1F512} The vote opens after "+h.det.need+" clues. Found: "+h.det.found+". Find the blue light!",2500,"bad"):n.kind==="keypad"?rb():n.kind==="hatch"?h.hatchCd>0?We("\u23F3 Passage recharging ("+Math.ceil(h.hatchCd)+" s)",1500):Et({t:"hatch",id:n.id}):(h.waitingQ=!0,Et({t:"ask",kind:n.kind,id:n.id}),setTimeout(()=>h.waitingQ=!1,3e3)))}function Gu(){if(h.role!=="killer"||!h.alive)return null;let n=null,e=2.7;for(let t of h.players.values()){if(t.id===h.id||t.st!==0||t.new)continue;let i=Math.hypot(h.pos.x-t.tx,h.pos.z-t.tz);i<e&&(e=i,n=t)}return n}function pm(){if(h.role!=="killer"||h.phase!=="play"||h.qbox||h.paused)return;let n=Gu();if(n){if(h.kcd>0){We("\u23F3 Wait "+Math.ceil(h.kcd)+"s\u2026",1200);return}Et({t:"kill",target:n.id}),h.kcd=99}}function mm(){let n=xn(h.job);if(!h.ghost)if(n.ab==="revive"&&h.role==="crew")h.charges.revive>0?Et({t:"ability",what:"revive"}):We("No revives left.",1500);else if(n.ab==="clue"&&h.role==="crew")h.charges.clue>0?(Et({t:"ability",what:"clue"}),h.charges.clue--):We("Already used.",1500);else if(n.ab==="xray"&&h.abilCd<=0)h.xray=n.dur,h.abilCd=n.cd,Me.whisper();else if(n.ab==="sprint"&&h.abilCd<=0)h.sprint=n.dur,h.abilCd=n.cd,Me.run();else if(n.ab==="lamp"&&h.abilCd<=0)h.abilCd=n.cd,am(h.pos.x,h.pos.z),Et({t:"ability",what:"lamp"}),Me.lamp();else if(n.ab==="axe"&&h.role==="crew"){let e=gb();h.charges.axe>0?e?Et({t:"ability",what:"axe",id:e.id}):We("\u{1FA93} Stand next to a locked door first.",1800):We("No axe swings left.",1500)}else["shield","lullaby","swap"].includes(n.ab)&&h.role==="crew"?h.abilCd>0?We("Recharging\u2026 "+Math.ceil(h.abilCd)+"s",1200):Et({t:"ability",what:n.ab}):n.ab==="sniff"&&h.role==="crew"&&h.abilCd<=0?Qu()?(h.sniff=n.dur,h.abilCd=n.cd,Me.bark(),We("\u{1F415} Woof! Follow the arrow!",2e3,"good")):We("Nothing to sniff \u2013 find the exit!",2e3):n.ab==="scan"&&h.role==="crew"&&h.abilCd<=0?(h.scan=n.dur,h.abilCd=n.cd,Me.whisper(),We("\u{1F4E1} Scanning\u2026 watch the map!",2e3,"good")):h.abilCd>0&&We("Recharging\u2026 "+Math.ceil(h.abilCd)+"s",1200)}function gb(){let n=null,e=4.6;for(let t of h.map.doors){if(t.kind!=="lock"||h.doors[t.id])continue;let i=Math.hypot(h.pos.x-t.cx,h.pos.z-t.cz);i<e&&(e=i,n=t)}return n}function Qu(){let n=null,e=1e9;for(let t of h.tasks)if(!t.done){let i=h.map.stations[t.sid],s=Math.hypot(h.pos.x-i.x,h.pos.z-i.z);s<e&&(e=s,n={x:i.x,z:i.z})}if(!n){let t=h.map.doors.find(i=>i.kind==="gate");t&&(n={x:t.cx,z:t.cz})}return n}function gm(){if(!h.map||h.phase==="join")return;let n=h.mode==="survival",e=h.tasks.filter(d=>d.done).length,t=h.mode==="detective"&&h.det,i=t?h.det.found:n?e:h.prog[0],s=t?h.det.need:n?h.tasks.length:h.prog[1];H("progBar").style.width=(s?100*i/s:0)+"%";let r=h.tl!=null?"  \xB7  \u23F1 "+Math.floor(h.tl/60)+":"+String(h.tl%60).padStart(2,"0"):"";H("progTxt").textContent=t?(h.det.unlocked?"\u{1F5F3}\uFE0F VOTE UNLOCKED \u2013 go to the "+h.det.btn.room+" and press the red button!":h.det.cur?"\u{1F50E} Clue "+(h.det.found+1)+" / "+h.det.need+" is in the "+h.det.cur.room+" \u2013 GO!":"\u{1F50E} Clues read "+h.det.found+" / "+h.det.need+" \u2013 the next one comes soon\u2026")+r:(n?e>=h.tasks.length?"\u{1F522} All tasks done \u2013 go to the EXIT door!":"\u{1F4DD} My tasks "+e+" / "+h.tasks.length+"  \xB7  \u{1F522} "+h.xcode.join("")+"_".repeat(Math.max(0,(h.xn||h.tasks.length)-h.xcode.length)):h.exitOpen?"EXIT OPEN \u2013 RUN!":"Escape progress "+i+" / "+s)+(h.mode==="survival"?"  \xB7  \u{1F3C3} "+h.aliveN+" running"+(h.escN?"  \xB7  \u{1F6AA} "+h.escN+" escaped":""):"")+r;let o=H("btnWarn");o.style.display=n&&h.escaped&&h.phase==="play"?"block":"none",o.textContent="\u{1F4E3} Warn others [V] ("+h.warnLeft+" left)",H("progTxt").className=h.tl!=null&&h.tl<=60?"low":"";let a=h.tasks.filter(d=>d.done).length;t?H("taskList").innerHTML="<b>\u{1F50E} Clues "+h.det.found+"/"+h.det.need+"</b>"+(h.det.unlocked?"<div>\u{1F5F3}\uFE0F Vote unlocked!</div>":h.det.cur?"<div>\u{1F4CD} "+st(h.det.cur.room)+"</div>":"<div>\u23F3 Next clue soon\u2026</div>")+(h.ghost?'<div class="gh">\u{1F47B} You are a ghost \u2013 you can still read clues and vote!</div>':""):H("taskList").innerHTML="<b>Your tasks "+a+"/"+h.tasks.length+"</b>"+h.tasks.map(d=>'<div class="'+(d.done?"td":"")+'">'+(d.done?"\u2705 ":"\u2B1C ")+st(Zu(d.sid))+"</div>").join("")+(h.ghost&&!h.escaped?'<div class="gh">\u{1F47B} You are a ghost \u2013 keep doing tasks!</div>':"");let c=xn(h.job),l='<span class="ai">'+c.emoji+"</span><b>"+c.abName+"</b>";if(c.ab==="hint"?l+="<small>in questions \xB7 "+(h.charges.hint||0)+" left</small>":c.ab==="second"?l+="<small>automatic \xB7 "+(h.charges.second||0)+" left</small>":c.ab==="danger"?l+="<small>automatic</small>":c.ab==="revive"?l+="<small>Q \xB7 "+(h.charges.revive||0)+" left</small>":c.ab==="clue"?l+="<small>Q \xB7 "+(h.charges.clue||0)+" left</small>":c.ab==="axe"?l+="<small>Q \xB7 "+(h.charges.axe||0)+" left</small>":l+="<small>Q \xB7 "+(h.abilCd>0?Math.ceil(h.abilCd)+"s":"ready")+"</small>",H("abil").innerHTML=l,h.role==="killer"){let d=Gu();H("killbtn").innerHTML="<b>\u{1F52A} "+(h.kcd>.05?Math.ceil(h.kcd)+"s":d?"CATCH "+st(d.name)+"! (F)":"ready")+"</b><small>Power "+h.rage+"/10 \u{1F608}</small>",H("killbtn").className=h.kcd<=.05&&d?"hot":"",H("killbtn").style.display=d?"flex":"none"}H("clueN").textContent=h.clues.length;let u=Ku(),f=H("prompt");if(h.phase==="play"&&!h.qbox&&!h.paused){let d=u?u.text:"";!d&&h.role==="killer"&&Gu()&&(d=h.kcd>.05?"":"\u{1F52A} Press <b>F</b> or click to CATCH"),!d&&xn(h.job).ab==="revive"&&h.charges.revive>0&&!h.ghost&&h.bodies.some(g=>Math.hypot(h.pos.x-g.x,h.pos.z-g.z)<4.5)&&(d="\u{1F49A} Press <b>Q</b> to REVIVE"),f.innerHTML=d,f.style.display=d?"block":"none"}else f.style.display="none";_b()}setInterval(gm,100);var ds=H("mini"),xb=ds.getContext("2d");function _b(){if(!h.map)return;let n=ds.width/48,e=xb;e.clearRect(0,0,ds.width,ds.height),e.fillStyle="rgba(8,10,16,.72)",e.fillRect(0,0,ds.width,ds.height),e.save(),h.mirror>0&&(e.translate(ds.width,0),e.scale(-1,1)),e.font="8px sans-serif",e.textAlign="center";for(let t of h.map.rooms)e.strokeStyle=t.kind==="exit"?"#35c46a":"#445066",e.lineWidth=1,e.strokeRect(t.x0*n+.5,t.z0*n+.5,16*n,16*n),e.fillStyle=t.kind==="exit"?"#35c46a":"#6b778c",e.fillText(t.name.length>14?t.name.slice(0,13)+".":t.name,t.cx*n,t.cz*n+3);for(let t of h.map.doors)h.doors[t.id]||(e.fillStyle=t.kind==="gate"?"#ff5050":"#ffb347",t.o==="v"?e.fillRect(t.cx*n-1.5,(t.cz-3.4/2)*n,3,3.4*n):e.fillRect((t.cx-3.4/2)*n,t.cz*n-1.5,3.4*n,3));for(let t of h.tasks)if(!t.done){let i=h.map.stations[t.sid];e.fillStyle="#ffd34a",e.fillRect(i.x*n-3,i.z*n-3,6,6)}if(h.mode==="detective"&&h.det){let t=4+Math.sin(performance.now()/220)*2;h.det.cur&&(e.strokeStyle="#4ad8ff",e.lineWidth=2,e.beginPath(),e.arc(h.det.cur.x*n,h.det.cur.z*n,5+t,0,7),e.stroke(),e.fillStyle="#bff4ff",e.fillText("?",h.det.cur.x*n,h.det.cur.z*n+3)),h.det.unlocked&&(e.strokeStyle="#ff4040",e.lineWidth=2,e.beginPath(),e.arc(h.map.button.x*n,h.map.button.z*n,5+t,0,7),e.stroke(),e.fillStyle="#ff6060",e.fillText("VOTE",h.map.button.x*n,h.map.button.z*n-9))}for(let t of h.pings)e.strokeStyle="rgba(255,60,60,"+Math.min(1,t.t/4)+")",e.lineWidth=2,e.beginPath(),e.arc(t.x*n,t.z*n,4+(9-t.t)*1.6,0,7),e.stroke();for(let t of h.map.gas||[])e.fillStyle="rgba(120,255,80,.3)",e.beginPath(),e.arc(t.x*n,t.z*n,t.r*n,0,7),e.fill();if(h.role!=="killer")for(let t of h.map.hatches||[])h.hatchSeen.has(t.id)&&(e.fillStyle="#30d0ff",e.fillRect(t.x*n-3,t.z*n-3,6,6));if(h.sniff>0){let t=Qu();t&&(e.strokeStyle="#7dff7d",e.lineWidth=2,e.beginPath(),e.arc(t.x*n,t.z*n,6+Math.sin(performance.now()/150)*2,0,7),e.stroke())}if(h.scan>0)for(let t of h.players.values())t.id!==h.id&&t.st===0&&!t.new&&(e.fillStyle="#7dd3ff",e.beginPath(),e.arc(t.tx*n,t.tz*n,3.2,0,7),e.fill());for(let t of h.bodies)e.fillStyle="#ff3030",e.fillText("\u2716",t.x*n,t.z*n+3);e.save(),e.translate(h.pos.x*n,h.pos.z*n),e.rotate(-h.yaw),e.fillStyle="#fff",e.beginPath(),e.moveTo(0,-5),e.lineTo(4,4),e.lineTo(-4,4),e.closePath(),e.fill(),e.restore(),e.restore()}var Ou=performance.now(),Xc=0,Fu=0,qc=0,Bu=0,$p=0,jp=0;function sr(){if(!L.renderer)return;let n=h.smooth;L.prBase=[.55,.8,Math.min(window.devicePixelRatio||1,1.25)][h.q],L.pr=n?Math.min(L.prBase,.5):L.prBase,L.renderer.setPixelRatio(L.pr),L.renderer.setSize(innerWidth,innerHeight,!1),L.camera.far=n?38:70,L.camera.updateProjectionMatrix(),L.scene&&h.map&&(L.scene.fog.density=h.map.D.fog*(n?1.35:1)),L.flash&&(L.flash.distance=n?20:28),L.dust&&(L.dust.visible=!n),L.halos&&(L.halos.visible=!n),L.pools&&(L.pools.visible=!n);for(let t of L.wisps||[])t.visible=!n;L.scene&&h.map&&L.look!==zu()&&nm(zu());let e=h.q>=2&&!n&&L.look==="rich";L.flash&&L.flash.castShadow!==e&&(L.flash.castShadow=e,L.scene.traverse(t=>{t.material&&(t.material.needsUpdate=!0)})),H("myGfx")&&(H("myGfx").value=n?"s":String(h.q))}function Kp(){try{localStorage.setItem("se_fb","1")}catch{}}function xm(n){if(requestAnimationFrame(xm),!L.renderer||!h.map||h.phase!=="play"&&h.phase!=="meeting"){Ou=n;return}let e=n-Ou;if(h.smooth&&e<31)return;let t=Math.min(.06,e/1e3);Ou=n,yb(t,n/1e3),L.renderer.render(L.scene,L.camera);let i=Math.min(e,250)/1e3;if(Xc+=i,Fu++,qc+=i,Bu++,Xc>=1&&(h.fps=Math.round(Fu/Xc),Xc=0,Fu=0,h.showFps&&(H("fps").textContent=h.fps+" FPS \xB7 "+L.renderer.info.render.calls+" draws \xB7 "+(h.smooth?"Smooth":["Low","Medium","High"][h.q]))),qc>3&&!yo.get("nogov")){let s=qc/Bu;qc=0,Bu=0,L.look==="rich"&&s>.036?(h.autoClassic=!0,sr(),We("\u26A1 Switched to the simple look to keep the game fast",3500),Kp()):s>.042&&!h.smooth?(h.smooth=!0,sr(),We("\u26A1 Smooth mode turned on to keep the game fast",3500),Kp()):s>.055&&L.pr>.42&&(L.pr*=.85,L.renderer.setPixelRatio(L.pr),L.renderer.setSize(innerWidth,innerHeight,!1))}}requestAnimationFrame(xm);setInterval(()=>{h.fps&&(h.phase==="play"||h.phase==="meeting")&&Et({t:"fps",v:h.fps,q:h.smooth?"Smooth":["Low","Medium","High"][h.q]})},5e3);function yb(n,e){let t=h.map,i=h.pos,s=h.phase==="play"&&!h.paused&&!h.qbox&&!h.onBreak&&performance.now()>h.frozenUntil&&!h.jump;if(h.warnCd=Math.max(0,h.warnCd-n),h.abilCd=Math.max(0,h.abilCd-n),h.xray=Math.max(0,h.xray-n),h.sprint=Math.max(0,h.sprint-n),h.paused||(h.sniff=Math.max(0,h.sniff-n),h.scan=Math.max(0,h.scan-n),h.slowT=Math.max(0,h.slowT-n),h.shield=Math.max(0,h.shield-n)),!h.paused){h.hatchCd=Math.max(0,h.hatchCd-n),h.blackout=Math.max(0,h.blackout-n),h.mirror=Math.max(0,h.mirror-n),h.kcd=Math.max(0,h.kcd-n),h.flick=Math.max(0,h.flick-n),h.dark=Math.max(0,h.dark-n),h.jump=Math.max(0,h.jump-n);for(let p of h.pings)p.t-=n;h.pings=h.pings.filter(p=>p.t>0)}let r=!h.ghost&&ab();if(r&&!h.inGas&&h.phase==="play"&&performance.now()>h.gasT&&(h.gasT=performance.now()+6e3,We("\u2623\uFE0F <b>Toxic gas!</b> You move slowly \u2013 get out!",2500,"bad")),h.inGas=r,h.map.hatches)for(let p of h.map.hatches)!h.hatchSeen.has(p.id)&&Math.hypot(i.x-p.x,i.z-p.z)<9&&h.hatchSeen.add(p.id);let o=!1,a=Xp;if(s){let p=0,m=0;(Dt.w||Dt.arrowup)&&(m+=1),(Dt.s||Dt.arrowdown)&&(m-=1),Dt.a&&(p-=1),Dt.d&&(p+=1),Dt.arrowleft&&(h.yaw+=n*1.9),Dt.arrowright&&(h.yaw-=n*1.9);let v=Math.hypot(p,m);if(v>0){p/=v,m/=v,o=!0,h.role==="killer"&&(a*=1+Math.min(.2,.02*h.rage)),h.sprint>0&&(a*=1.9),h.slowT>0&&(a*=.55),h.ghost?a*=1.25:h.inGas&&(a*=.55);let E=-Math.sin(h.yaw),M=-Math.cos(h.yaw),w=Math.cos(h.yaw),A=-Math.sin(h.yaw),_=(E*m+w*p)*a*n,T=(M*m+A*p)*a*n;h.ghost?(i.x=nr(i.x+_,.5,48-.5),i.z=nr(i.z+T,.5,64-.5),i.y=nr(i.y+Math.sin(h.pitch)*m*a*n,.6,t.H-.5)):(qp(i.x+_,i.z)||(i.x+=_),qp(i.x,i.z+T)||(i.z+=T)),h.ghost||(h.stepT+=n*(a/Xp),h.stepT>.48&&(h.stepT=0,Me.step(.6)))}Dt[" "]&&h.ghost&&(i.y=Math.min(t.H-.5,i.y+n*2.5))}h.ghost&&s&&Dt.shift&&(i.y=Math.max(.6,i.y-n*2.5)),h.ghost||(jp+=o?n*9:0,i.y=vo+(o?Math.sin(jp)*.035:0));for(let p of L.gasS||[]){let m=p.userData;p.position.set(m.x+Math.cos(e*.3+m.ph)*m.r,m.y+Math.sin(e*.5+m.ph)*.15,m.z+Math.sin(e*.27+m.ph)*m.r)}let c=performance.now();c-$p>100&&h.phase==="play"&&!h.paused&&($p=c,Et({t:"pos",x:+i.x.toFixed(2),y:+i.y.toFixed(2),z:+i.z.toFixed(2),yaw:+h.yaw.toFixed(2)}));let l=L.camera,u=h.jump>0?(Math.random()-.5)*.08:0;l.position.set(i.x,i.y,i.z),l.rotation.set(h.pitch+u,h.yaw+u,0);let f=Hn(),d=1;h.flick>0&&f>=1?d=Math.random()<.5?.15:1:f>=1&&Math.random()<.004&&(h.flick=.3),h.dark>0&&(d=0);let g=h.blackout>0?f>=1?.12:.55:1;L.hemi.intensity=L.hemiBase*(h.ghost?1.5:1)*(d===0?.25:1)*g,L.flash.intensity=h.ghost?25:60*(d<1?.2+.8*d:1)*(h.dark>0?0:1),L.lantern.intensity=h.ghost?12:7*(h.dark>0?0:1);let x=(d===1?.8+.2*Math.sin(e*2.3):d)*(g<1?g*.5:1);if(L.flickMat.color.setScalar((d===1?.75+.25*Math.sin(e*2.3):d)*(g<1?g:1)),L.pools&&(L.pools.material.opacity=L.poolBase*x,L.halos.material.opacity=.7*x),!h.smooth){L.dust.position.set(i.x,0,i.z);let p=L.dustP,m=L.dustN;for(let E=0;E<m;E++){let M=E*3;p[M]+=Math.sin(E*1.3+e*.3)*.12*n,p[M+1]-=(.04+E%5*.01)*n,p[M+2]+=Math.cos(E*.7+e*.25)*.12*n,p[M+1]<0&&(p[M+1]=3.6),p[M]>8?p[M]=-8:p[M]<-8&&(p[M]=8),p[M+2]>8?p[M+2]=-8:p[M+2]<-8&&(p[M+2]=8)}L.dustAttr.needsUpdate=!0;let v=f>=1&&h.phase==="play";for(let E of L.wisps){let M=E.userData.ph;E.position.set(24+Math.sin(e*.11+M)*20,1.8+Math.sin(e*.7+M)*.3,32+Math.cos(e*.083+M*1.3)*26);let w=Math.hypot(E.position.x-i.x,E.position.z-i.z);E.material.opacity=v?nr((w-4)/6,0,1)*(f>=2?.26:.14):0}}for(let p of L.doors)if(p){let m=p.open?1:0;p.t+=(m-p.t)*Math.min(1,n*4),p.mesh.position.y=3/2-p.t*(3+.2),p.mesh.visible=p.t<.97}for(let[,p]of L.markers)p.gem.rotation.y+=n*2,p.gem.position.y=2.3+Math.sin(e*2)*.1;for(let p of h.players.values()){if(p.id===h.id||!p.av)continue;let m=Math.min(1,n*10),v=p.cx,E=p.cz;p.cx+=(p.tx-p.cx)*m,p.cy+=(p.ty-p.cy)*m,p.cz+=(p.tz-p.cz)*m;let M=p.tyaw-p.cyaw;M=Math.atan2(Math.sin(M),Math.cos(M)),p.cyaw+=M*m;let w=Math.hypot(p.cx-v,p.cz-E)/Math.max(n,.001);if(p.moving+=((w>.6?1:0)-p.moving)*Math.min(1,n*8),p.av.visible=p.st===0,p.gh.visible=p.st===1&&h.ghost,p.tag.visible=!(h.dark>.05||h.blackout>.05),p.xr.visible=p.st===0&&(h.xray>0||h.ghost||h.role==="killer"&&h.exitOpen),p.av.visible){p.av.position.set(p.cx,0,p.cz),p.av.rotation.y=p.cyaw+Math.PI;let A=p.av.userData,_=Math.sin(e*9)*.6*p.moving;if(A.legL.rotation.x=_,A.legR.rotation.x=-_,A.armL.rotation.x=-_,A.armR.rotation.x=_,p.moving>.5&&w>.6&&(p.stepT+=n,p.stepT>.5)){p.stepT=0;let T=Math.hypot(p.cx-i.x,p.cz-i.z);T<14&&Me.step(.5*(1-T/14),nr(Math.sin(Math.atan2(p.cx-i.x,i.z-p.cz)+h.yaw)*.8,-1,1))}}p.gh.visible&&p.gh.position.set(p.cx,.2+Math.sin(e*2+p.id)*.15+(p.cy>1.5?p.cy-1.6:0),p.cz)}L.myPet&&Yp(L.myPet,i.x,i.z,!h.ghost,n,e,!0,h.yaw);for(let p of h.players.values())p.id===h.id||!p.av||(p.pet&&Yp(p.pet,p.cx,p.cz,p.av.visible,n,e,!1),p.sh&&(p.shield=Math.max(0,(p.shield||0)-n),p.sh.visible=p.shield>0&&p.av.visible,p.sh.visible&&p.sh.scale.setScalar(1+Math.sin(e*6)*.03)));H("shieldfx").style.display=h.shield>0?"block":"none";let y=H("sniffArrow");if(h.sniff>0&&!h.ghost){let p=Qu();if(p){let m=p.x-i.x,v=p.z-i.z,E=Math.atan2(m*Math.cos(h.yaw)-v*Math.sin(h.yaw),-m*Math.sin(h.yaw)-v*Math.cos(h.yaw));y.style.display="block",y.querySelector("span").style.transform="rotate("+E+"rad)",y.querySelector("small").textContent=Math.round(Math.hypot(m,v))+" m"}else y.style.display="none"}else y.style.display="none";for(let p of L.bodies)p.a.visible=!0;for(let p of L.lamps)p.t-=n,p.t<0&&(L.scene.remove(p.m),p.light&&L.scene.remove(p.light),p.dead=!0);if(L.lamps=L.lamps.filter(p=>!p.dead),h.appT-=n,h.appT<=0&&h.phase==="play"&&f>=2&&!h.ghost&&(vb(),h.appT=55+Math.random()*60),L.app){L.app.t-=n;let p=new W;l.getWorldDirection(p);let m=L.app.s.position.clone().sub(l.position).normalize();p.dot(m)>.93&&L.app.t<1.3&&(Me.sting(),Gn("#fff",120),L.app.t=0),L.app.t<=0&&(L.scene.remove(L.app.s),L.app=null)}H("danger").style.opacity=h.danger?.25+.2*Math.sin(e*8):0,h.danger!==h.dangerOn&&(h.dangerOn=h.danger,Me.heartLoop(h.danger)),h.danger&&!Pp("heartbeat")&&Math.floor(e*1.6)!==Math.floor((e-n)*1.6)&&Me.heart()}function vb(){L.appTex||(L.appTex=mb());let n=h.yaw+(Math.random()<.5?-1:1)*(.6+Math.random()*.5),e=9,t=new Pi(new di({map:L.appTex,transparent:!0,fog:!1}));t.scale.set(1.7,3.4,1),t.position.set(h.pos.x-Math.sin(n)*e,1.7,h.pos.z-Math.cos(n)*e),L.scene.add(t),L.app={s:t,t:2.2},h.flick=.5,Me.creak(),Me.thud()}function Kc(n){h.onBreak===n||h.phase!=="play"&&h.phase!=="meeting"||(h.onBreak=n,pt("breakbox",n),Et({t:"break",on:n}),n?(document.exitPointerLock&&document.exitPointerLock(),Hc(.12),po(),h.myScare=0,H("myScare").value="0",fo(0),h.flick=0,h.dark=0,H("danger").style.opacity=0,H("lockhint").style.display="none",Dt.w=Dt.a=Dt.s=Dt.d=!1):(Hc(+H("vol").value/100),Pu(h.mapId),H("lockhint").style.display=h.phase==="play"?"flex":"none"))}H("btnBreak").addEventListener("click",()=>Kc(!0));H("btnBreakEnd").addEventListener("click",()=>Kc(!1));Sv&&(window.__se={ST:h,V:L,backToLobby:tm,send:Et,drop(){zn&&zn.close()},setSmooth(n){h.smooth=n,sr()},audioInfo:Ip,tp(n,e){h.pos.x=n,h.pos.z=e},nearest:Ku,interact:fm,answer:Ju,toast:We,useAbility:mm,showcase(n,e){let t=ho.slice(n,e);L.scene.add(new zr(16777215,2.6)),h.pitch=-.05,t.forEach((i,s)=>{let r=qu(i.id),o=(s-(t.length-1)/2)*1.15,a=h.pos.x+Math.cos(h.yaw)*o-Math.sin(h.yaw)*3.6,c=h.pos.z-Math.sin(h.yaw)*o-Math.cos(h.yaw)*3.6;if(r.position.set(a,0,c),r.rotation.y=h.yaw,L.scene.add(r),i.id==="dog"||i.id==="magician"){let l=Yu(i.id==="dog"?"dog":"cat");l.g.visible=!0,l.g.position.set(a+Math.cos(h.yaw)*.55,0,c-Math.sin(h.yaw)*.55+.4),l.g.rotation.y=h.yaw+.5}})},sees:()=>[...h.players.values()].map(n=>[n.id,n.name,n.st,+(n.cx||0).toFixed(1),+(n.cz||0).toFixed(1)])});})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
