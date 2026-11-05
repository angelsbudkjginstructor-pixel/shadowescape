(()=>{var om=Object.create;var Qc=Object.defineProperty;var am=Object.getOwnPropertyDescriptor;var cm=Object.getOwnPropertyNames;var lm=Object.getPrototypeOf,hm=Object.prototype.hasOwnProperty;var um=n=>{throw TypeError(n)};var dm=(n,e)=>()=>{try{return e||n((e={exports:{}}).exports,e),e.exports}catch(t){throw e=0,t}},vo=(n,e)=>{for(var t in e)Qc(n,t,{get:e[t],enumerable:!0})},fm=(n,e,t,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of cm(e))!hm.call(n,s)&&s!==t&&Qc(n,s,{get:()=>e[s],enumerable:!(i=am(e,s))||i.enumerable});return n};var id=(n,e,t)=>(t=n!=null?om(lm(n)):{},fm(e||!n||!n.__esModule?Qc(t,"default",{value:n,enumerable:!0}):t,n));var ir=(n,e,t)=>e.has(n)?um("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(n):e.set(n,t);var nu=dm((T1,tu)=>{"use strict";var re={};re.generateIdentifier=function(){return Math.random().toString(36).substring(2,12)};re.localCName=re.generateIdentifier();re.splitLines=function(n){return n.trim().split(`
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
`),e.headerExtensions&&e.headerExtensions.forEach(s=>{t+=re.writeExtmap(s)}),t};re.parseRtpEncodingParameters=function(n){let e=[],t=re.parseRtpParameters(n),i=t.fecMechanisms.indexOf("RED")!==-1,s=t.fecMechanisms.indexOf("ULPFEC")!==-1,r=re.matchPrefix(n,"a=ssrc:").map(h=>re.parseSsrcMedia(h)).filter(h=>h.attribute==="cname"),o=r.length>0&&r[0].ssrc,a,c=re.matchPrefix(n,"a=ssrc-group:FID").map(h=>h.substring(17).split(" ").map(p=>parseInt(p,10)));c.length>0&&c[0].length>1&&c[0][0]===o&&(a=c[0][1]),t.codecs.forEach(h=>{if(h.name.toUpperCase()==="RTX"&&h.parameters.apt){let d={ssrc:o,codecPayloadType:parseInt(h.parameters.apt,10)};o&&a&&(d.rtx={ssrc:a}),e.push(d),i&&(d=JSON.parse(JSON.stringify(d)),d.fec={ssrc:o,mechanism:s?"red+ulpfec":"red"},e.push(d))}}),e.length===0&&o&&e.push({ssrc:o});let l=re.matchPrefix(n,"b=");return l.length&&(l[0].indexOf("b=TIAS:")===0?l=parseInt(l[0].substring(7),10):l[0].indexOf("b=AS:")===0?l=parseInt(l[0].substring(5),10)*1e3*.95-2e3*8:l=void 0,e.forEach(h=>{h.maxBitrate=l})),e};re.parseRtcpParameters=function(n){let e={},t=re.matchPrefix(n,"a=ssrc:").map(r=>re.parseSsrcMedia(r)).filter(r=>r.attribute==="cname")[0];t&&(e.cname=t.value,e.ssrc=t.ssrc);let i=re.matchPrefix(n,"a=rtcp-rsize");e.reducedSize=i.length>0,e.compound=i.length===0;let s=re.matchPrefix(n,"a=rtcp-mux");return e.mux=s.length>0,e};re.writeRtcpParameters=function(n){let e="";return n.reducedSize&&(e+=`a=rtcp-rsize\r
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
`};re.getDirection=function(n,e){let t=re.splitLines(n);for(let i=0;i<t.length;i++)switch(t[i]){case"a=sendrecv":case"a=sendonly":case"a=recvonly":case"a=inactive":return t[i].substring(2);default:}return e?re.getDirection(e):"sendrecv"};re.getKind=function(n){return re.splitLines(n)[0].split(" ")[0].substring(2)};re.isRejected=function(n){return n.split(" ",2)[1]==="0"};re.parseMLine=function(n){let t=re.splitLines(n)[0].substring(2).split(" ");return{kind:t[0],port:parseInt(t[1],10),protocol:t[2],fmt:t.slice(3).join(" ")}};re.parseOLine=function(n){let t=re.matchPrefix(n,"o=")[0].substring(2).split(" ");return{username:t[0],sessionId:t[1],sessionVersion:parseInt(t[2],10),netType:t[3],addressType:t[4],address:t[5]}};re.isValidSDP=function(n){if(typeof n!="string"||n.length===0)return!1;let e=re.splitLines(n);for(let t=0;t<e.length;t++)if(e[t].length<2||e[t].charAt(1)!=="=")return!1;return!0};typeof tu=="object"&&(tu.exports=re)});var Ld=0,Dl=1,Dd=2;var Zi=1,Nd=2,zs=3,Di=0,on=1,En=2,Ji=0,Gs=1,Ni=2,Nl=3,Ul=4,Ud=5;var $i=100,Od=101,kd=102,Fd=103,Bd=104,zd=200,Gd=201,Hd=202,Vd=203,Ol=204,kl=205,Wd=206,Xd=207,qd=208,Yd=209,Zd=210,Jd=211,$d=212,jd=213,Kd=214,Zo=0,Jo=1,$o=2,Cs=3,jo=4,Ko=5,Qo=6,ea=7,Ta=0,Qd=1,ef=2,Zn=0,Fl=1,Bl=2,zl=3,Gl=4,Hl=5,Vl=6,Wl=7;var Xl=300,ji=301,Hs=302,Ea=303,wa=304,Rs=1e3,Vn=1001,ta=1002,Ht=1003,tf=1004;var Fr=1005;var nn=1006,Aa=1007;var di=1008;var hn=1009,ql=1010,Yl=1011,Vs=1012,Ca=1013,Un=1014,On=1015,kn=1016,Ra=1017,Pa=1018,Ki=1020,Zl=35902,Jl=35899,$l=1021,jl=1022,Fn=1023,ai=1026,fi=1027,Kl=1028,Ia=1029,Ui=1030,La=1031;var Da=1033,Br=33776,zr=33777,Gr=33778,Hr=33779,Na=35840,Ua=35841,Oa=35842,ka=35843,Fa=36196,Ba=37492,za=37496,Ga=37488,Ha=37489,Vr=37490,Va=37491,Wa=37808,Xa=37809,qa=37810,Ya=37811,Za=37812,Ja=37813,$a=37814,ja=37815,Ka=37816,Qa=37817,ec=37818,tc=37819,nc=37820,ic=37821,sc=36492,rc=36494,oc=36495,ac=36283,cc=36284,Wr=36285,lc=36286;var dr=2300,na=2301,qo=2302,Ml=2303,Tl=2400,El=2401,wl=2402;var nf=3200;var hc=0,sf=1,pi="",wt="srgb",fr="srgb-linear",pr="linear",at="srgb";var Yo=7680;var rf=519,of=512,af=513,cf=514,Ql=515,lf=516,hf=517,eh=518,th=519,nh=35044;var ih="300 es",Mn=2e3,Ps=2001;function pm(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function mm(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function mr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function uf(){let n=mr("canvas");return n.style.display="block",n}var sd={},Is=null;function gr(...n){let e="THREE."+n.shift();Is?Is("log",e,...n):console.log(e,...n)}function df(n){let e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function ke(...n){n=df(n);let e="THREE."+n.shift();if(Is)Is("warn",e,...n);else{let t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Fe(...n){n=df(n);let e="THREE."+n.shift();if(Is)Is("error",e,...n);else{let t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function ur(...n){let e=n.join(" ");e in sd||(sd[e]=!0,ke(...n))}function ff(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}var pf={[Zo]:Zo,[$o]:Qo,[jo]:jo,[Cs]:Ko,[Jo]:Jo,[Qo]:$o,[ea]:ea,[Ko]:Cs},Wn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let s=i[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},Jt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var el=Math.PI/180,xr=180/Math.PI;function Qi(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Jt[n&255]+Jt[n>>8&255]+Jt[n>>16&255]+Jt[n>>24&255]+"-"+Jt[e&255]+Jt[e>>8&255]+"-"+Jt[e>>16&15|64]+Jt[e>>24&255]+"-"+Jt[t&63|128]+Jt[t>>8&255]+"-"+Jt[t>>16&255]+Jt[t>>24&255]+Jt[i&255]+Jt[i>>8&255]+Jt[i>>16&255]+Jt[i>>24&255]).toLowerCase()}function tt(n,e,t){return Math.max(e,Math.min(t,n))}function gm(n,e){return(n%e+e)%e}function tl(n,e,t){return(1-t)*n+t*e}function mf(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function uc(n){switch(n.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function gf(n,e){if(e.constructor===Float32Array)return n;let t=uc(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(n/t,-1)}function xf(n,e){if(e.constructor===Float32Array)return n;let t=uc(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(n*t)}var ch=class ch{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=tt(this.x,e.x,t.x),this.y=tt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=tt(this.x,e,t),this.y=tt(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(tt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(tt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*i-o*s+e.x,this.y=r*s+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};ch.prototype.isVector2=!0;var Be=ch,Xn=class{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,o,a){let c=i[s+0],l=i[s+1],h=i[s+2],d=i[s+3],p=r[o+0],g=r[o+1],x=r[o+2],y=r[o+3];if(d!==y||c!==p||l!==g||h!==x){let f=c*p+l*g+h*x+d*y;f<0&&(p=-p,g=-g,x=-x,y=-y,f=-f);let m=1-a;if(f<.9995){let v=Math.acos(f),E=Math.sin(v);m=Math.sin(m*v)/E,a=Math.sin(a*v)/E,c=c*m+p*a,l=l*m+g*a,h=h*m+x*a,d=d*m+y*a}else{c=c*m+p*a,l=l*m+g*a,h=h*m+x*a,d=d*m+y*a;let v=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=v,l*=v,h*=v,d*=v}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,s,r,o){let a=i[s],c=i[s+1],l=i[s+2],h=i[s+3],d=r[o],p=r[o+1],g=r[o+2],x=r[o+3];return e[t]=a*x+h*d+c*g-l*p,e[t+1]=c*x+h*p+l*d-a*g,e[t+2]=l*x+h*g+a*p-c*d,e[t+3]=h*x-a*d-c*p-l*g,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(i/2),h=a(s/2),d=a(r/2),p=c(i/2),g=c(s/2),x=c(r/2);switch(o){case"XYZ":this._x=p*h*d+l*g*x,this._y=l*g*d-p*h*x,this._z=l*h*x+p*g*d,this._w=l*h*d-p*g*x;break;case"YXZ":this._x=p*h*d+l*g*x,this._y=l*g*d-p*h*x,this._z=l*h*x-p*g*d,this._w=l*h*d+p*g*x;break;case"ZXY":this._x=p*h*d-l*g*x,this._y=l*g*d+p*h*x,this._z=l*h*x+p*g*d,this._w=l*h*d-p*g*x;break;case"ZYX":this._x=p*h*d-l*g*x,this._y=l*g*d+p*h*x,this._z=l*h*x-p*g*d,this._w=l*h*d+p*g*x;break;case"YZX":this._x=p*h*d+l*g*x,this._y=l*g*d+p*h*x,this._z=l*h*x-p*g*d,this._w=l*h*d-p*g*x;break;case"XZY":this._x=p*h*d-l*g*x,this._y=l*g*d-p*h*x,this._z=l*h*x+p*g*d,this._w=l*h*d+p*g*x;break;default:ke("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],d=t[10],p=i+a+d;if(p>0){let g=.5/Math.sqrt(p+1);this._w=.25/g,this._x=(h-c)*g,this._y=(r-l)*g,this._z=(o-s)*g}else if(i>a&&i>d){let g=2*Math.sqrt(1+i-a-d);this._w=(h-c)/g,this._x=.25*g,this._y=(s+o)/g,this._z=(r+l)/g}else if(a>d){let g=2*Math.sqrt(1+a-i-d);this._w=(r-l)/g,this._x=(s+o)/g,this._y=.25*g,this._z=(c+h)/g}else{let g=2*Math.sqrt(1+d-i-a);this._w=(o-s)/g,this._x=(r+l)/g,this._y=(c+h)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(tt(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=i*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-i*l,this._z=r*h+o*l+i*c-s*a,this._w=o*h-i*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,o=e._w,a=this.dot(e);a<0&&(i=-i,s=-s,r=-r,o=-o,a=-a);let c=1-t;if(a<.9995){let l=Math.acos(a),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+i*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+o*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+o*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},lh=class lh{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(rd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(rd.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,i=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*i),h=2*(a*t-r*s),d=2*(r*i-o*t);return this.x=t+c*l+o*d-a*h,this.y=i+c*h+a*l-r*d,this.z=s+c*d+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=tt(this.x,e.x,t.x),this.y=tt(this.y,e.y,t.y),this.z=tt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=tt(this.x,e,t),this.y=tt(this.y,e,t),this.z=tt(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(tt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-i*c,this.z=i*a-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return nl.copy(this).projectOnVector(e),this.sub(nl)}reflect(e){return this.sub(nl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(tt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};lh.prototype.isVector3=!0;var V=lh,nl=new V,rd=new Xn,hh=class hh{constructor(e,t,i,s,r,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,c,l)}set(e,t,i,s,r,o,a,c,l){let h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=c,h[6]=i,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],h=i[4],d=i[7],p=i[2],g=i[5],x=i[8],y=s[0],f=s[3],m=s[6],v=s[1],E=s[4],M=s[7],w=s[2],A=s[5],_=s[8];return r[0]=o*y+a*v+c*w,r[3]=o*f+a*E+c*A,r[6]=o*m+a*M+c*_,r[1]=l*y+h*v+d*w,r[4]=l*f+h*E+d*A,r[7]=l*m+h*M+d*_,r[2]=p*y+g*v+x*w,r[5]=p*f+g*E+x*A,r[8]=p*m+g*M+x*_,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-i*r*h+i*a*c+s*r*l-s*o*c}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],d=h*o-a*l,p=a*c-h*r,g=l*r-o*c,x=t*d+i*p+s*g;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/x;return e[0]=d*y,e[1]=(s*l-h*i)*y,e[2]=(a*i-s*o)*y,e[3]=p*y,e[4]=(h*t-s*c)*y,e[5]=(s*r-a*t)*y,e[6]=g*y,e[7]=(i*c-l*t)*y,e[8]=(o*t-i*r)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return ur("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(il.makeScale(e,t)),this}rotate(e){return ur("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(il.makeRotation(-e)),this}translate(e,t){return ur("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(il.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};hh.prototype.isMatrix3=!0;var Ge=hh,il=new Ge,od=new Ge().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ad=new Ge().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function xm(){let n={enabled:!0,workingColorSpace:fr,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===at&&(s.r=oi(s.r),s.g=oi(s.g),s.b=oi(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===at&&(s.r=As(s.r),s.g=As(s.g),s.b=As(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===pi?pr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[o].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[fr]:{primaries:e,whitePoint:i,transfer:pr,toXYZ:od,fromXYZ:ad,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:wt},outputColorSpaceConfig:{drawingBufferColorSpace:wt}},[wt]:{primaries:e,whitePoint:i,transfer:at,toXYZ:od,fromXYZ:ad,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:wt}}}),n}var et=xm();function oi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function As(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var hs,ia=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{hs===void 0&&(hs=mr("canvas")),hs.width=e.width,hs.height=e.height;let s=hs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=hs}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=mr("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=oi(r[o]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(oi(t[i]/255)*255):t[i]=oi(t[i]);return{data:t,width:e.width,height:e.height}}else return ke("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},_m=0,Ls=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:_m++}),this.uuid=Qi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(sl(s[o].image)):r.push(sl(s[o]))}else r=sl(s);i.url=r}return t||(e.images[this.uuid]=i),i}};function sl(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?ia.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(ke("Texture: Unable to serialize Texture."),{})}var ym=0,rl=new V,sn=class n extends Wn{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=Vn,s=Vn,r=nn,o=di,a=Fn,c=hn,l=n.DEFAULT_ANISOTROPY,h=pi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ym++}),this.uuid=Qi(),this.name="",this.source=new Ls(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Be(0,0),this.repeat=new Be(1,1),this.center=new Be(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ge,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(rl).x}get height(){return this.source.getSize(rl).y}get depth(){return this.source.getSize(rl).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){ke(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){ke(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Xl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Rs:e.x=e.x-Math.floor(e.x);break;case Vn:e.x=e.x<0?0:1;break;case ta:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Rs:e.y=e.y-Math.floor(e.y);break;case Vn:e.y=e.y<0?0:1;break;case ta:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};sn.DEFAULT_IMAGE=null;sn.DEFAULT_MAPPING=Xl;sn.DEFAULT_ANISOTROPY=1;var uh=class uh{constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*i+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r,c=e.elements,l=c[0],h=c[4],d=c[8],p=c[1],g=c[5],x=c[9],y=c[2],f=c[6],m=c[10];if(Math.abs(h-p)<.01&&Math.abs(d-y)<.01&&Math.abs(x-f)<.01){if(Math.abs(h+p)<.1&&Math.abs(d+y)<.1&&Math.abs(x+f)<.1&&Math.abs(l+g+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let E=(l+1)/2,M=(g+1)/2,w=(m+1)/2,A=(h+p)/4,_=(d+y)/4,T=(x+f)/4;return E>M&&E>w?E<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(E),s=A/i,r=_/i):M>w?M<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),i=A/s,r=T/s):w<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),i=_/r,s=T/r),this.set(i,s,r,t),this}let v=Math.sqrt((f-x)*(f-x)+(d-y)*(d-y)+(p-h)*(p-h));return Math.abs(v)<.001&&(v=1),this.x=(f-x)/v,this.y=(d-y)/v,this.z=(p-h)/v,this.w=Math.acos((l+g+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=tt(this.x,e.x,t.x),this.y=tt(this.y,e.y,t.y),this.z=tt(this.z,e.z,t.z),this.w=tt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=tt(this.x,e,t),this.y=tt(this.y,e,t),this.z=tt(this.z,e,t),this.w=tt(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(tt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};uh.prototype.isVector4=!0;var yt=uh,sa=class extends Wn{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:nn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new yt(0,0,e,t),this.scissorTest=!1,this.viewport=new yt(0,0,e,t),this.textures=[];let s=i.count;for(let r=0;r<s;r++)this.textures[r]=new sn({width:e,height:t,depth:i.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:nn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Ls(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},mn=class extends sa{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},_r=class extends sn{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Ht,this.minFilter=Ht,this.wrapR=Vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var ra=class extends sn{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Ht,this.minFilter=Ht,this.wrapR=Vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var Ma=class Ma{constructor(e,t,i,s,r,o,a,c,l,h,d,p,g,x,y,f){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,c,l,h,d,p,g,x,y,f)}set(e,t,i,s,r,o,a,c,l,h,d,p,g,x,y,f){let m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=s,m[1]=r,m[5]=o,m[9]=a,m[13]=c,m[2]=l,m[6]=h,m[10]=d,m[14]=p,m[3]=g,m[7]=x,m[11]=y,m[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ma().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,i=e.elements,s=1/us.setFromMatrixColumn(e,0).length(),r=1/us.setFromMatrixColumn(e,1).length(),o=1/us.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,s=e.y,r=e.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let p=o*h,g=o*d,x=a*h,y=a*d;t[0]=c*h,t[4]=-c*d,t[8]=l,t[1]=g+x*l,t[5]=p-y*l,t[9]=-a*c,t[2]=y-p*l,t[6]=x+g*l,t[10]=o*c}else if(e.order==="YXZ"){let p=c*h,g=c*d,x=l*h,y=l*d;t[0]=p+y*a,t[4]=x*a-g,t[8]=o*l,t[1]=o*d,t[5]=o*h,t[9]=-a,t[2]=g*a-x,t[6]=y+p*a,t[10]=o*c}else if(e.order==="ZXY"){let p=c*h,g=c*d,x=l*h,y=l*d;t[0]=p-y*a,t[4]=-o*d,t[8]=x+g*a,t[1]=g+x*a,t[5]=o*h,t[9]=y-p*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let p=o*h,g=o*d,x=a*h,y=a*d;t[0]=c*h,t[4]=x*l-g,t[8]=p*l+y,t[1]=c*d,t[5]=y*l+p,t[9]=g*l-x,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let p=o*c,g=o*l,x=a*c,y=a*l;t[0]=c*h,t[4]=y-p*d,t[8]=x*d+g,t[1]=d,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=g*d+x,t[10]=p-y*d}else if(e.order==="XZY"){let p=o*c,g=o*l,x=a*c,y=a*l;t[0]=c*h,t[4]=-d,t[8]=l*h,t[1]=p*d+y,t[5]=o*h,t[9]=g*d-x,t[2]=x*d-g,t[6]=a*h,t[10]=y*d+p}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(vm,e,Sm)}lookAt(e,t,i){let s=this.elements;return dn.subVectors(e,t),dn.lengthSq()===0&&(dn.z=1),dn.normalize(),vi.crossVectors(i,dn),vi.lengthSq()===0&&(Math.abs(i.z)===1?dn.x+=1e-4:dn.z+=1e-4,dn.normalize(),vi.crossVectors(i,dn)),vi.normalize(),So.crossVectors(dn,vi),s[0]=vi.x,s[4]=So.x,s[8]=dn.x,s[1]=vi.y,s[5]=So.y,s[9]=dn.y,s[2]=vi.z,s[6]=So.z,s[10]=dn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],h=i[1],d=i[5],p=i[9],g=i[13],x=i[2],y=i[6],f=i[10],m=i[14],v=i[3],E=i[7],M=i[11],w=i[15],A=s[0],_=s[4],T=s[8],O=s[12],I=s[1],B=s[5],H=s[9],Z=s[13],N=s[2],$=s[6],R=s[10],P=s[14],U=s[3],F=s[7],G=s[11],te=s[15];return r[0]=o*A+a*I+c*N+l*U,r[4]=o*_+a*B+c*$+l*F,r[8]=o*T+a*H+c*R+l*G,r[12]=o*O+a*Z+c*P+l*te,r[1]=h*A+d*I+p*N+g*U,r[5]=h*_+d*B+p*$+g*F,r[9]=h*T+d*H+p*R+g*G,r[13]=h*O+d*Z+p*P+g*te,r[2]=x*A+y*I+f*N+m*U,r[6]=x*_+y*B+f*$+m*F,r[10]=x*T+y*H+f*R+m*G,r[14]=x*O+y*Z+f*P+m*te,r[3]=v*A+E*I+M*N+w*U,r[7]=v*_+E*B+M*$+w*F,r[11]=v*T+E*H+M*R+w*G,r[15]=v*O+E*Z+M*P+w*te,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],d=e[6],p=e[10],g=e[14],x=e[3],y=e[7],f=e[11],m=e[15],v=c*g-l*p,E=a*g-l*d,M=a*p-c*d,w=o*g-l*h,A=o*p-c*h,_=o*d-a*h;return t*(y*v-f*E+m*M)-i*(x*v-f*w+m*A)+s*(x*E-y*w+m*_)-r*(x*M-y*A+f*_)}determinantAffine(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],o=e[5],a=e[9],c=e[2],l=e[6],h=e[10];return t*(o*h-a*l)-i*(r*h-a*c)+s*(r*l-o*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],d=e[9],p=e[10],g=e[11],x=e[12],y=e[13],f=e[14],m=e[15],v=t*a-i*o,E=t*c-s*o,M=t*l-r*o,w=i*c-s*a,A=i*l-r*a,_=s*l-r*c,T=h*y-d*x,O=h*f-p*x,I=h*m-g*x,B=d*f-p*y,H=d*m-g*y,Z=p*m-g*f,N=v*Z-E*H+M*B+w*I-A*O+_*T;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let $=1/N;return e[0]=(a*Z-c*H+l*B)*$,e[1]=(s*H-i*Z-r*B)*$,e[2]=(y*_-f*A+m*w)*$,e[3]=(p*A-d*_-g*w)*$,e[4]=(c*I-o*Z-l*O)*$,e[5]=(t*Z-s*I+r*O)*$,e[6]=(f*M-x*_-m*E)*$,e[7]=(h*_-p*M+g*E)*$,e[8]=(o*H-a*I+l*T)*$,e[9]=(i*I-t*H-r*T)*$,e[10]=(x*A-y*M+m*v)*$,e[11]=(d*M-h*A-g*v)*$,e[12]=(a*O-o*B-c*T)*$,e[13]=(t*B-i*O+s*T)*$,e[14]=(y*E-x*w-f*v)*$,e[15]=(h*w-d*E+p*v)*$,this}scale(e){let t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),s=Math.sin(t),r=1-i,o=e.x,a=e.y,c=e.z,l=r*o,h=r*a;return this.set(l*o+i,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+i,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,o){return this.set(1,i,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){let s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,h=o+o,d=a+a,p=r*l,g=r*h,x=r*d,y=o*h,f=o*d,m=a*d,v=c*l,E=c*h,M=c*d,w=i.x,A=i.y,_=i.z;return s[0]=(1-(y+m))*w,s[1]=(g+M)*w,s[2]=(x-E)*w,s[3]=0,s[4]=(g-M)*A,s[5]=(1-(p+m))*A,s[6]=(f+v)*A,s[7]=0,s[8]=(x+E)*_,s[9]=(f-v)*_,s[10]=(1-(p+y))*_,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let o=us.set(s[0],s[1],s[2]).length(),a=us.set(s[4],s[5],s[6]).length(),c=us.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Cn.copy(this);let l=1/o,h=1/a,d=1/c;return Cn.elements[0]*=l,Cn.elements[1]*=l,Cn.elements[2]*=l,Cn.elements[4]*=h,Cn.elements[5]*=h,Cn.elements[6]*=h,Cn.elements[8]*=d,Cn.elements[9]*=d,Cn.elements[10]*=d,t.setFromRotationMatrix(Cn),i.x=o,i.y=a,i.z=c,this}makePerspective(e,t,i,s,r,o,a=Mn,c=!1){let l=this.elements,h=2*r/(t-e),d=2*r/(i-s),p=(t+e)/(t-e),g=(i+s)/(i-s),x,y;if(c)x=r/(o-r),y=o*r/(o-r);else if(a===Mn)x=-(o+r)/(o-r),y=-2*o*r/(o-r);else if(a===Ps)x=-o/(o-r),y=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=p,l[12]=0,l[1]=0,l[5]=d,l[9]=g,l[13]=0,l[2]=0,l[6]=0,l[10]=x,l[14]=y,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,s,r,o,a=Mn,c=!1){let l=this.elements,h=2/(t-e),d=2/(i-s),p=-(t+e)/(t-e),g=-(i+s)/(i-s),x,y;if(c)x=1/(o-r),y=o/(o-r);else if(a===Mn)x=-2/(o-r),y=-(o+r)/(o-r);else if(a===Ps)x=-1/(o-r),y=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=p,l[1]=0,l[5]=d,l[9]=0,l[13]=g,l[2]=0,l[6]=0,l[10]=x,l[14]=y,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};Ma.prototype.isMatrix4=!0;var mt=Ma,us=new V,Cn=new mt,vm=new V(0,0,0),Sm=new V(1,1,1),vi=new V,So=new V,dn=new V,cd=new mt,ld=new Xn,ci=class n{constructor(e=0,t=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],d=s[2],p=s[6],g=s[10];switch(t){case"XYZ":this._y=Math.asin(tt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,g),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(p,l),this._z=0);break;case"YXZ":this._x=Math.asin(-tt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,g),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(tt(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-d,g),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-tt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(p,g),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(tt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,g));break;case"XZY":this._z=Math.asin(-tt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(p,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,g),this._y=0);break;default:ke("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return cd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(cd,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ld.setFromEuler(this),this.setFromQuaternion(ld,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ci.DEFAULT_ORDER="XYZ";var yr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},bm=0,hd=new V,ds=new Xn,ei=new mt,bo=new V,sr=new V,Mm=new V,Tm=new Xn,ud=new V(1,0,0),dd=new V(0,1,0),fd=new V(0,0,1),pd={type:"added"},Em={type:"removed"},fs={type:"childadded",child:null},ol={type:"childremoved",child:null},Pt=class n extends Wn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:bm++}),this.uuid=Qi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new V,t=new ci,i=new Xn,s=new V(1,1,1);function r(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new mt},normalMatrix:{value:new Ge}}),this.matrix=new mt,this.matrixWorld=new mt,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new yr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ds.setFromAxisAngle(e,t),this.quaternion.multiply(ds),this}rotateOnWorldAxis(e,t){return ds.setFromAxisAngle(e,t),this.quaternion.premultiply(ds),this}rotateX(e){return this.rotateOnAxis(ud,e)}rotateY(e){return this.rotateOnAxis(dd,e)}rotateZ(e){return this.rotateOnAxis(fd,e)}translateOnAxis(e,t){return hd.copy(e).applyQuaternion(this.quaternion),this.position.add(hd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ud,e)}translateY(e){return this.translateOnAxis(dd,e)}translateZ(e){return this.translateOnAxis(fd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ei.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?bo.copy(e):bo.set(e,t,i);let s=this.parent;this.updateWorldMatrix(!0,!1),sr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ei.lookAt(sr,bo,this.up):ei.lookAt(bo,sr,this.up),this.quaternion.setFromRotationMatrix(ei),s&&(ei.extractRotation(s.matrixWorld),ds.setFromRotationMatrix(ei),this.quaternion.premultiply(ds.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Fe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(pd),fs.child=e,this.dispatchEvent(fs),fs.child=null):Fe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Em),ol.child=e,this.dispatchEvent(ol),ol.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ei.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ei.multiply(e.parent.matrixWorld)),e.applyMatrix4(ei),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(pd),fs.child=e,this.dispatchEvent(fs),fs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){let o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(sr,e,Mm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(sr,Tm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,i)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let d=c[l];r(e.shapes,d)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){let a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),d=o(e.shapes),p=o(e.skeletons),g=o(e.animations),x=o(e.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),p.length>0&&(i.skeletons=p),g.length>0&&(i.animations=g),x.length>0&&(i.nodes=x)}return i.object=s,i;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let s=e.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Pt.DEFAULT_UP=new V(0,1,0);Pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var pn=class extends Pt{constructor(){super(),this.isGroup=!0,this.type="Group"}},wm={type:"move"},Ds=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new pn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new pn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new pn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let y of e.hand.values()){let f=t.getJointPose(y,i),m=this._getHandJoint(l,y);f!==null&&(m.matrix.fromArray(f.transform.matrix),m.matrix.decompose(m.position,m.quaternion,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=f.radius),m.visible=f!==null}let h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],p=h.position.distanceTo(d.position),g=.02,x=.005;l.inputState.pinching&&p>g+x?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&p<=g-x&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.quaternion,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.quaternion,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(wm)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new pn;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},_f={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Si={h:0,s:0,l:0},Mo={h:0,s:0,l:0};function al(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var Xe=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=wt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,et.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=et.workingColorSpace){return this.r=e,this.g=t,this.b=i,et.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=et.workingColorSpace){if(e=gm(e,1),t=tt(t,0,1),i=tt(i,0,1),t===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+t):i+t-i*t,o=2*i-r;this.r=al(o,r,e+1/3),this.g=al(o,r,e),this.b=al(o,r,e-1/3)}return et.colorSpaceToWorking(this,s),this}setStyle(e,t=wt){function i(r){r!==void 0&&parseFloat(r)<1&&ke("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,t);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:ke("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);ke("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=wt){let i=_f[e.toLowerCase()];return i!==void 0?this.setHex(i,t):ke("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=oi(e.r),this.g=oi(e.g),this.b=oi(e.b),this}copyLinearToSRGB(e){return this.r=As(e.r),this.g=As(e.g),this.b=As(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=wt){return et.workingToColorSpace($t.copy(this),e),Math.round(tt($t.r*255,0,255))*65536+Math.round(tt($t.g*255,0,255))*256+Math.round(tt($t.b*255,0,255))}getHexString(e=wt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=et.workingColorSpace){et.workingToColorSpace($t.copy(this),t);let i=$t.r,s=$t.g,r=$t.b,o=Math.max(i,s,r),a=Math.min(i,s,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let d=o-a;switch(l=h<=.5?d/(o+a):d/(2-o-a),o){case i:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-i)/d+2;break;case r:c=(i-s)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=et.workingColorSpace){return et.workingToColorSpace($t.copy(this),t),e.r=$t.r,e.g=$t.g,e.b=$t.b,e}getStyle(e=wt){et.workingToColorSpace($t.copy(this),e);let t=$t.r,i=$t.g,s=$t.b;return e!==wt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Si),this.setHSL(Si.h+e,Si.s+t,Si.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Si),e.getHSL(Mo);let i=tl(Si.h,Mo.h,t),s=tl(Si.s,Mo.s,t),r=tl(Si.l,Mo.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},$t=new Xe;Xe.NAMES=_f;var vr=class n{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Xe(e),this.density=t}clone(){return new n(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var Sr=class extends Pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ci,this.environmentIntensity=1,this.environmentRotation=new ci,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Rn=new V,ti=new V,cl=new V,ni=new V,ps=new V,ms=new V,md=new V,ll=new V,hl=new V,ul=new V,dl=new yt,fl=new yt,pl=new yt,ri=class n{constructor(e=new V,t=new V,i=new V){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Rn.subVectors(e,t),s.cross(Rn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Rn.subVectors(s,t),ti.subVectors(i,t),cl.subVectors(e,t);let o=Rn.dot(Rn),a=Rn.dot(ti),c=Rn.dot(cl),l=ti.dot(ti),h=ti.dot(cl),d=o*l-a*a;if(d===0)return r.set(0,0,0),null;let p=1/d,g=(l*c-a*h)*p,x=(o*h-a*c)*p;return r.set(1-g-x,x,g)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,ni)===null?!1:ni.x>=0&&ni.y>=0&&ni.x+ni.y<=1}static getInterpolation(e,t,i,s,r,o,a,c){return this.getBarycoord(e,t,i,s,ni)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,ni.x),c.addScaledVector(o,ni.y),c.addScaledVector(a,ni.z),c)}static getInterpolatedAttribute(e,t,i,s,r,o){return dl.setScalar(0),fl.setScalar(0),pl.setScalar(0),dl.fromBufferAttribute(e,t),fl.fromBufferAttribute(e,i),pl.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(dl,r.x),o.addScaledVector(fl,r.y),o.addScaledVector(pl,r.z),o}static isFrontFacing(e,t,i,s){return Rn.subVectors(i,t),ti.subVectors(e,t),Rn.cross(ti).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Rn.subVectors(this.c,this.b),ti.subVectors(this.a,this.b),Rn.cross(ti).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return n.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,s=this.b,r=this.c,o,a;ps.subVectors(s,i),ms.subVectors(r,i),ll.subVectors(e,i);let c=ps.dot(ll),l=ms.dot(ll);if(c<=0&&l<=0)return t.copy(i);hl.subVectors(e,s);let h=ps.dot(hl),d=ms.dot(hl);if(h>=0&&d<=h)return t.copy(s);let p=c*d-h*l;if(p<=0&&c>=0&&h<=0&&c-h>0)return o=c/(c-h),t.copy(i).addScaledVector(ps,o);ul.subVectors(e,r);let g=ps.dot(ul),x=ms.dot(ul);if(x>=0&&g<=x)return t.copy(r);let y=g*l-c*x;if(y<=0&&l>=0&&x<=0)return a=l/(l-x),t.copy(i).addScaledVector(ms,a);let f=h*x-g*d;if(f<=0&&d-h>=0&&g-x>=0)return md.subVectors(r,s),a=(d-h)/(d-h+(g-x)),t.copy(s).addScaledVector(md,a);let m=1/(f+y+p);return o=y*m,a=p*m,t.copy(i).addScaledVector(ps,o).addScaledVector(ms,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Ei=class{constructor(e=new V(1/0,1/0,1/0),t=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Pn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Pn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=Pn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Pn):Pn.fromBufferAttribute(r,o),Pn.applyMatrix4(e.matrixWorld),this.expandByPoint(Pn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),To.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),To.copy(i.boundingBox)),To.applyMatrix4(e.matrixWorld),this.union(To)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Pn),Pn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(rr),Eo.subVectors(this.max,rr),gs.subVectors(e.a,rr),xs.subVectors(e.b,rr),_s.subVectors(e.c,rr),bi.subVectors(xs,gs),Mi.subVectors(_s,xs),Hi.subVectors(gs,_s);let t=[0,-bi.z,bi.y,0,-Mi.z,Mi.y,0,-Hi.z,Hi.y,bi.z,0,-bi.x,Mi.z,0,-Mi.x,Hi.z,0,-Hi.x,-bi.y,bi.x,0,-Mi.y,Mi.x,0,-Hi.y,Hi.x,0];return!ml(t,gs,xs,_s,Eo)||(t=[1,0,0,0,1,0,0,0,1],!ml(t,gs,xs,_s,Eo))?!1:(wo.crossVectors(bi,Mi),t=[wo.x,wo.y,wo.z],ml(t,gs,xs,_s,Eo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Pn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Pn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ii[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ii[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ii[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ii[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ii[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ii[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ii[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ii[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ii),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},ii=[new V,new V,new V,new V,new V,new V,new V,new V],Pn=new V,To=new Ei,gs=new V,xs=new V,_s=new V,bi=new V,Mi=new V,Hi=new V,rr=new V,Eo=new V,wo=new V,Vi=new V;function ml(n,e,t,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){Vi.fromArray(n,r);let a=s.x*Math.abs(Vi.x)+s.y*Math.abs(Vi.y)+s.z*Math.abs(Vi.z),c=e.dot(Vi),l=t.dot(Vi),h=i.dot(Vi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var Rt=new V,Ao=new Be,Am=0,Gt=class extends Wn{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Am++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=nh,this.updateRanges=[],this.gpuType=On,this.version=0,this._normalizationScale=e!==void 0?uc(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Ao.fromBufferAttribute(this,t),Ao.applyMatrix3(e),this.setXY(t,Ao.x,Ao.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix3(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix4(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Rt.fromBufferAttribute(this,t),Rt.applyNormalMatrix(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Rt.fromBufferAttribute(this,t),Rt.transformDirection(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=this._denormalize(i)),i}setComponent(e,t,i){return this.normalized&&(i=this._normalize(i)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),i=this._normalize(i)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),i=this._normalize(i),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),i=this._normalize(i),s=this._normalize(s),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):gf(e,this.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):xf(e,this.array)}};var br=class extends Gt{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var Mr=class extends Gt{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var rt=class extends Gt{constructor(e,t,i){super(new Float32Array(e),t,i)}},Cm=new Ei,or=new V,gl=new V,qi=class{constructor(e=new V,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):Cm.setFromPoints(e).getCenter(i);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;or.subVectors(e,this.center);let t=or.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(or,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(gl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(or.copy(e.center).add(gl)),this.expandByPoint(or.copy(e.center).sub(gl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Rm=0,bn=new mt,xl=new Pt,ys=new V,fn=new Ei,ar=new Ei,zt=new V,At=class n extends Wn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Rm++}),this.uuid=Qi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(pm(e)?Mr:br)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new Ge().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return bn.makeRotationFromQuaternion(e),this.applyMatrix4(bn),this}rotateX(e){return bn.makeRotationX(e),this.applyMatrix4(bn),this}rotateY(e){return bn.makeRotationY(e),this.applyMatrix4(bn),this}rotateZ(e){return bn.makeRotationZ(e),this.applyMatrix4(bn),this}translate(e,t,i){return bn.makeTranslation(e,t,i),this.applyMatrix4(bn),this}scale(e,t,i){return bn.makeScale(e,t,i),this.applyMatrix4(bn),this}lookAt(e){return xl.lookAt(e),xl.updateMatrix(),this.applyMatrix4(xl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ys).negate(),this.translate(ys.x,ys.y,ys.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new rt(i,3))}else{let i=Math.min(e.length,t.count);for(let s=0;s<i;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&ke("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ei);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Fe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){let r=t[i];fn.setFromBufferAttribute(r),this.morphTargetsRelative?(zt.addVectors(this.boundingBox.min,fn.min),this.boundingBox.expandByPoint(zt),zt.addVectors(this.boundingBox.max,fn.max),this.boundingBox.expandByPoint(zt)):(this.boundingBox.expandByPoint(fn.min),this.boundingBox.expandByPoint(fn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Fe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new qi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Fe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(e){let i=this.boundingSphere.center;if(fn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];ar.setFromBufferAttribute(a),this.morphTargetsRelative?(zt.addVectors(fn.min,ar.min),fn.expandByPoint(zt),zt.addVectors(fn.max,ar.max),fn.expandByPoint(zt)):(fn.expandByPoint(ar.min),fn.expandByPoint(ar.max))}fn.getCenter(i);let s=0;for(let r=0,o=e.count;r<o;r++)zt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(zt));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)zt.fromBufferAttribute(a,l),c&&(ys.fromBufferAttribute(e,l),zt.add(ys)),s=Math.max(s,i.distanceToSquared(zt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Fe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Fe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,s=t.normal,r=t.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==i.count)&&(o=new Gt(new Float32Array(4*i.count),4),this.setAttribute("tangent",o));let a=[],c=[],l=new Uint8Array(i.count);for(let O=0;O<i.count;O++)a[O]=new V,c[O]=new V;let h=new V,d=new V,p=new V,g=new Be,x=new Be,y=new Be,f=new V,m=new V;function v(O,I,B){l[O]=l[I]=l[B]=1,h.fromBufferAttribute(i,O),d.fromBufferAttribute(i,I),p.fromBufferAttribute(i,B),g.fromBufferAttribute(r,O),x.fromBufferAttribute(r,I),y.fromBufferAttribute(r,B),d.sub(h),p.sub(h),x.sub(g),y.sub(g);let H=1/(x.x*y.y-y.x*x.y);isFinite(H)&&(f.copy(d).multiplyScalar(y.y).addScaledVector(p,-x.y).multiplyScalar(H),m.copy(p).multiplyScalar(x.x).addScaledVector(d,-y.x).multiplyScalar(H),a[O].add(f),a[I].add(f),a[B].add(f),c[O].add(m),c[I].add(m),c[B].add(m))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let O=0,I=E.length;O<I;++O){let B=E[O],H=B.start,Z=B.count;for(let N=H,$=H+Z;N<$;N+=3)v(e.getX(N+0),e.getX(N+1),e.getX(N+2))}let M=new V,w=new V,A=new V,_=new V;function T(O){A.fromBufferAttribute(s,O),_.copy(A);let I=a[O];M.copy(I),M.sub(A.multiplyScalar(A.dot(I))).normalize(),w.crossVectors(_,I);let H=w.dot(c[O])<0?-1:1;o.setXYZW(O,M.x,M.y,M.z,H)}for(let O=0,I=i.count;O<I;++O)l[O]&&T(O);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Gt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let p=0,g=i.count;p<g;p++)i.setXYZ(p,0,0,0);let s=new V,r=new V,o=new V,a=new V,c=new V,l=new V,h=new V,d=new V;if(e)for(let p=0,g=e.count;p<g;p+=3){let x=e.getX(p+0),y=e.getX(p+1),f=e.getX(p+2);s.fromBufferAttribute(t,x),r.fromBufferAttribute(t,y),o.fromBufferAttribute(t,f),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),a.fromBufferAttribute(i,x),c.fromBufferAttribute(i,y),l.fromBufferAttribute(i,f),a.add(h),c.add(h),l.add(h),i.setXYZ(x,a.x,a.y,a.z),i.setXYZ(y,c.x,c.y,c.z),i.setXYZ(f,l.x,l.y,l.z)}else for(let p=0,g=t.count;p<g;p+=3)s.fromBufferAttribute(t,p+0),r.fromBufferAttribute(t,p+1),o.fromBufferAttribute(t,p+2),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),i.setXYZ(p+0,h.x,h.y,h.z),i.setXYZ(p+1,h.x,h.y,h.z),i.setXYZ(p+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)zt.fromBufferAttribute(e,t),zt.normalize(),e.setXYZ(t,zt.x,zt.y,zt.z)}toNonIndexed(){function e(a,c){let l=a.array,h=a.itemSize,d=a.normalized,p=new l.constructor(c.length*h),g=0,x=0;for(let y=0,f=c.length;y<f;y++){a.isInterleavedBufferAttribute?g=c[y]*a.data.stride+a.offset:g=c[y]*h;for(let m=0;m<h;m++)p[x++]=l[g++]}return new Gt(p,h,d)}if(this.index===null)return ke("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=e(c,i);t.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,d=l.length;h<d;h++){let p=l[h],g=e(p,i);c.push(g)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let c in i){let l=i[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let d=0,p=l.length;d<p;d++){let g=l[d];h.push(g.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let s=e.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],d=r[l];for(let p=0,g=d.length;p<g;p++)h.push(d[p].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,h=o.length;l<h;l++){let d=o[l];this.addGroup(d.start,d.count,d.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Tr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=nh,this.updateRanges=[],this.version=0,this.uuid=Qi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=gd(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=this.array.slice(0).buffer);let i=new this.array.constructor(e.arrayBuffers[t]),s=new this.constructor(i,this.stride);return s.setUsage(this.usage),s}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=gd(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=Array.from(new Uint32Array(this.array.slice(0).buffer)));let i={uuid:this.uuid,buffer:t,type:this.array.constructor.name,stride:this.stride};return i.usage=this.usage,i}};function gd(n){return n.buffer._uuid===void 0&&(n.buffer._uuid=Qi()),n.byteOffset===0&&n.byteLength===n.buffer.byteLength?n.buffer._uuid:n.buffer._uuid+":"+n.byteOffset+":"+n.byteLength}var tn=new V,Ns=class n{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s,this._normalizationScale=e!==void 0?uc(e.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)tn.fromBufferAttribute(this,t),tn.applyMatrix4(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)tn.fromBufferAttribute(this,t),tn.applyNormalMatrix(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)tn.fromBufferAttribute(this,t),tn.transformDirection(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=this._denormalize(i)),i}setComponent(e,t,i){return this.normalized&&(i=this._normalize(i)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=this._denormalize(t)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=this._denormalize(t)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=this._denormalize(t)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=this._denormalize(t)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),i=this._normalize(i)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),i=this._normalize(i),s=this._normalize(s)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),i=this._normalize(i),s=this._normalize(s),r=this._normalize(r)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){gr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Gt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new n(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){gr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):gf(e,this.data.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):xf(e,this.data.array)}},_l=new V,Pm=new V,Im=new Ge,In=class{constructor(e=new V(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let s=_l.subVectors(i,t).cross(Pm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let s=e.delta(_l),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(s,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||Im.getNormalMatrix(e),s=this.coplanarPoint(_l).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Lm=0,qn=class extends Wn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Lm++}),this.uuid=Qi(),this.name="",this.type="Material",this.blending=Gs,this.side=Di,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ol,this.blendDst=kl,this.blendEquation=$i,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Xe(0,0,0),this.blendAlpha=0,this.depthFunc=Cs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=rf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Yo,this.stencilZFail=Yo,this.stencilZPass=Yo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){ke(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){ke(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(i.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(i.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(i.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(i.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Xe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new In().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Be().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Be().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},li=class extends qn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Xe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},vs,cr=new V,Ss=new V,bs=new V,Ms=new Be,lr=new Be,yf=new mt,Co=new V,hr=new V,Ro=new V,xd=new Be,yl=new Be,_d=new Be,wi=class extends Pt{constructor(e=new li){if(super(),this.isSprite=!0,this.type="Sprite",vs===void 0){vs=new At;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new Tr(t,5);vs.setIndex([0,1,2,0,2,3]),vs.setAttribute("position",new Ns(i,3,0,!1)),vs.setAttribute("uv",new Ns(i,2,3,!1))}this.geometry=vs,this.material=e,this.center=new Be(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&Fe('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ss.setFromMatrixScale(this.matrixWorld),yf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),bs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ss.multiplyScalar(-bs.z);let i=this.material.rotation,s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));let o=this.center;Po(Co.set(-.5,-.5,0),bs,o,Ss,s,r),Po(hr.set(.5,-.5,0),bs,o,Ss,s,r),Po(Ro.set(.5,.5,0),bs,o,Ss,s,r),xd.set(0,0),yl.set(1,0),_d.set(1,1);let a=e.ray.intersectTriangle(Co,hr,Ro,!1,cr);if(a===null&&(Po(hr.set(-.5,.5,0),bs,o,Ss,s,r),yl.set(0,1),a=e.ray.intersectTriangle(Co,Ro,hr,!1,cr),a===null))return;let c=e.ray.origin.distanceTo(cr);c<e.near||c>e.far||t.push({distance:c,point:cr.clone(),uv:ri.getInterpolation(cr,Co,hr,Ro,xd,yl,_d,new Be),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}toJSON(e){let t=super.toJSON(e);return t.object.center=this.center.toArray(),t}};function Po(n,e,t,i,s,r){Ms.subVectors(n,t).addScalar(.5).multiply(i),s!==void 0?(lr.x=r*Ms.x-s*Ms.y,lr.y=s*Ms.x+r*Ms.y):lr.copy(Ms),n.copy(e),n.x+=lr.x,n.y+=lr.y,n.applyMatrix4(yf)}var si=new V,vl=new V,Io=new V,Lo=new V,Er=class{constructor(e=new V,t=new V(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,si)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=si.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(si.copy(this.origin).addScaledVector(this.direction,t),si.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){vl.copy(e).add(t).multiplyScalar(.5),Io.copy(t).sub(e).normalize(),Lo.copy(this.origin).sub(vl);let r=e.distanceTo(t)*.5,o=-this.direction.dot(Io),a=Lo.dot(this.direction),c=-Lo.dot(Io),l=Lo.lengthSq(),h=Math.abs(1-o*o),d,p,g,x;if(h>0)if(d=o*c-a,p=o*a-c,x=r*h,d>=0)if(p>=-x)if(p<=x){let y=1/h;d*=y,p*=y,g=d*(d+o*p+2*a)+p*(o*d+p+2*c)+l}else p=r,d=Math.max(0,-(o*p+a)),g=-d*d+p*(p+2*c)+l;else p=-r,d=Math.max(0,-(o*p+a)),g=-d*d+p*(p+2*c)+l;else p<=-x?(d=Math.max(0,-(-o*r+a)),p=d>0?-r:Math.min(Math.max(-r,-c),r),g=-d*d+p*(p+2*c)+l):p<=x?(d=0,p=Math.min(Math.max(-r,-c),r),g=p*(p+2*c)+l):(d=Math.max(0,-(o*r+a)),p=d>0?r:Math.min(Math.max(-r,-c),r),g=-d*d+p*(p+2*c)+l);else p=o>0?-r:r,d=Math.max(0,-(o*p+a)),g=-d*d+p*(p+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(vl).addScaledVector(Io,p),g}intersectSphere(e,t){if(e.radius<0)return null;si.subVectors(e.center,this.origin);let i=si.dot(this.direction),s=si.dot(si)-i*i,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,p=this.origin;return l>=0?(i=(e.min.x-p.x)*l,s=(e.max.x-p.x)*l):(i=(e.max.x-p.x)*l,s=(e.min.x-p.x)*l),h>=0?(r=(e.min.y-p.y)*h,o=(e.max.y-p.y)*h):(r=(e.max.y-p.y)*h,o=(e.min.y-p.y)*h),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(e.min.z-p.z)*d,c=(e.max.z-p.z)*d):(a=(e.max.z-p.z)*d,c=(e.min.z-p.z)*d),i>c||a>s)||((a>i||i!==i)&&(i=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,si)!==null}intersectTriangle(e,t,i,s,r){let o=this.origin,a=this.direction,c=a.x,l=a.y,h=a.z,d=e.x-o.x,p=e.y-o.y,g=e.z-o.z,x=t.x-o.x,y=t.y-o.y,f=t.z-o.z,m=i.x-o.x,v=i.y-o.y,E=i.z-o.z,M=Math.abs(c),w=Math.abs(l),A=Math.abs(h),_,T,O,I,B,H,Z,N,$,R,P,U;if(M>=w&&M>=A?(O=c,H=d,$=x,U=m,c>=0?(_=l,T=h,I=p,B=g,Z=y,N=f,R=v,P=E):(_=h,T=l,I=g,B=p,Z=f,N=y,R=E,P=v)):w>=A?(O=l,H=p,$=y,U=v,l>=0?(_=h,T=c,I=g,B=d,Z=f,N=x,R=E,P=m):(_=c,T=h,I=d,B=g,Z=x,N=f,R=m,P=E)):(O=h,H=g,$=f,U=E,h>=0?(_=c,T=l,I=d,B=p,Z=x,N=y,R=m,P=v):(_=l,T=c,I=p,B=d,Z=y,N=x,R=v,P=m)),O===0)return null;let F=_/O,G=T/O,te=1/O,ce=I-F*H,Ae=B-G*H,j=Z-F*$,le=N-G*$,ve=R-F*U,Ee=P-G*U,ue=ve*le-Ee*j,ze=ce*Ee-Ae*ve,ot=j*Ae-le*ce;if(s){if(ue<0||ze<0||ot<0)return null}else if((ue<0||ze<0||ot<0)&&(ue>0||ze>0||ot>0))return null;let Oe=ue+ze+ot;if(Oe===0)return null;let ct=te*(ue*H+ze*$+ot*U);return(Oe>0?ct<0:ct>0)?null:this.at(ct/Oe,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Vt=class extends qn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ci,this.combine=Ta,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},yd=new mt,Wi=new Er,Do=new qi,vd=new V,No=new V,Uo=new V,Oo=new V,Sl=new V,ko=new V,Sd=new V,Fo=new V,nt=class extends Pt{constructor(e=new At,t=new Vt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(s,e);let a=this.morphTargetInfluences;if(r&&a){ko.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],d=r[c];h!==0&&(Sl.fromBufferAttribute(d,e),o?ko.addScaledVector(Sl,h):ko.addScaledVector(Sl.sub(t),h))}t.add(ko)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Do.copy(i.boundingSphere),Do.applyMatrix4(r),Wi.copy(e.ray).recast(e.near),!(Do.containsPoint(Wi.origin)===!1&&(Wi.intersectSphere(Do,vd)===null||Wi.origin.distanceToSquared(vd)>(e.far-e.near)**2))&&(yd.copy(r).invert(),Wi.copy(e.ray).applyMatrix4(yd),!(i.boundingBox!==null&&Wi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Wi)))}_computeIntersections(e,t,i){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,p=r.groups,g=r.drawRange;if(a!==null)if(Array.isArray(o))for(let x=0,y=p.length;x<y;x++){let f=p[x],m=o[f.materialIndex],v=Math.max(f.start,g.start),E=Math.min(a.count,Math.min(f.start+f.count,g.start+g.count));for(let M=v,w=E;M<w;M+=3){let A=a.getX(M),_=a.getX(M+1),T=a.getX(M+2);s=Bo(this,m,e,i,l,h,d,A,_,T),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=f.materialIndex,t.push(s))}}else{let x=Math.max(0,g.start),y=Math.min(a.count,g.start+g.count);for(let f=x,m=y;f<m;f+=3){let v=a.getX(f),E=a.getX(f+1),M=a.getX(f+2);s=Bo(this,o,e,i,l,h,d,v,E,M),s&&(s.faceIndex=Math.floor(f/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let x=0,y=p.length;x<y;x++){let f=p[x],m=o[f.materialIndex],v=Math.max(f.start,g.start),E=Math.min(c.count,Math.min(f.start+f.count,g.start+g.count));for(let M=v,w=E;M<w;M+=3){let A=M,_=M+1,T=M+2;s=Bo(this,m,e,i,l,h,d,A,_,T),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=f.materialIndex,t.push(s))}}else{let x=Math.max(0,g.start),y=Math.min(c.count,g.start+g.count);for(let f=x,m=y;f<m;f+=3){let v=f,E=f+1,M=f+2;s=Bo(this,o,e,i,l,h,d,v,E,M),s&&(s.faceIndex=Math.floor(f/3),t.push(s))}}}};function Dm(n,e,t,i,s,r,o,a){let c;if(e.side===on?c=i.intersectTriangle(o,r,s,!0,a):c=i.intersectTriangle(s,r,o,e.side===Di,a),c===null)return null;Fo.copy(a),Fo.applyMatrix4(n.matrixWorld);let l=t.ray.origin.distanceTo(Fo);return l<t.near||l>t.far?null:{distance:l,point:Fo.clone(),object:n}}function Bo(n,e,t,i,s,r,o,a,c,l){n.getVertexPosition(a,No),n.getVertexPosition(c,Uo),n.getVertexPosition(l,Oo);let h=Dm(n,e,t,i,No,Uo,Oo,Sd);if(h){let d=new V;ri.getBarycoord(Sd,No,Uo,Oo,d),s&&(h.uv=ri.getInterpolatedAttribute(s,a,c,l,d,new Be)),r&&(h.uv1=ri.getInterpolatedAttribute(r,a,c,l,d,new Be)),o&&(h.normal=ri.getInterpolatedAttribute(o,a,c,l,d,new V),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let p={a,b:c,c:l,normal:new V,materialIndex:0};ri.getNormal(No,Uo,Oo,p.normal),h.face=p,h.barycoord=d}return h}var oa=class extends sn{constructor(e=null,t=1,i=1,s,r,o,a,c,l=Ht,h=Ht,d,p){super(null,o,a,c,l,h,s,r,d,p),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Xi=new qi,Nm=new Be(.5,.5),zo=new V,Ai=class{constructor(e=new In,t=new In,i=new In,s=new In,r=new In,o=new In){this.planes=[e,t,i,s,r,o]}set(e,t,i,s,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Mn,i=!1){let s=this.planes,r=e.elements,o=r[0],a=r[1],c=r[2],l=r[3],h=r[4],d=r[5],p=r[6],g=r[7],x=r[8],y=r[9],f=r[10],m=r[11],v=r[12],E=r[13],M=r[14],w=r[15];if(s[0].setComponents(l-o,g-h,m-x,w-v).normalize(),s[1].setComponents(l+o,g+h,m+x,w+v).normalize(),s[2].setComponents(l+a,g+d,m+y,w+E).normalize(),s[3].setComponents(l-a,g-d,m-y,w-E).normalize(),i)s[4].setComponents(c,p,f,M).normalize(),s[5].setComponents(l-c,g-p,m-f,w-M).normalize();else if(s[4].setComponents(l-c,g-p,m-f,w-M).normalize(),t===Mn)s[5].setComponents(l+c,g+p,m+f,w+M).normalize();else if(t===Ps)s[5].setComponents(c,p,f,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Xi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Xi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Xi)}intersectsSprite(e){Xi.center.set(0,0,0);let t=Nm.distanceTo(e.center);return Xi.radius=.7071067811865476+t,Xi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Xi)}intersectsSphere(e){let t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let s=t[i];if(zo.x=s.normal.x>0?e.max.x:e.min.x,zo.y=s.normal.y>0?e.max.y:e.min.y,zo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(zo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},bd=new mt,aa=class n{constructor(){this.coordinateSystem=Mn,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,i=this._frustums;for(let s=0;s<t.length;s++){let r=t[s];bd.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),i[s]===void 0&&(i[s]=new Ai),i[s].setFromProjectionMatrix(bd,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,i=e._frustums;for(let s=0;s<e._count;s++)t[s]===void 0&&(t[s]=new Ai),t[s].copy(i[s]);return this._count=e._count,this}clone(){return new n().copy(this)}};var Yi=class extends qn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Xe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Md=new mt,Al=new Er,Go=new qi,Ho=new V,Us=class extends Pt{constructor(e=new At,t=new Yi){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Go.copy(i.boundingSphere),Go.applyMatrix4(s),Go.radius+=r,e.ray.intersectsSphere(Go)===!1)return;Md.copy(s).invert(),Al.copy(e.ray).applyMatrix4(Md);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=i.index,d=i.attributes.position;if(l!==null){let p=Math.max(0,o.start),g=Math.min(l.count,o.start+o.count);for(let x=p,y=g;x<y;x++){let f=l.getX(x);Ho.fromBufferAttribute(d,f),Td(Ho,f,c,s,e,t,this)}}else{let p=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let x=p,y=g;x<y;x++)Ho.fromBufferAttribute(d,x),Td(Ho,x,c,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Td(n,e,t,i,s,r,o){let a=Al.distanceSqToPoint(n);if(a<t){let c=new V;Al.closestPointToPoint(n,c),c.applyMatrix4(i);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var wr=class extends sn{constructor(e=[],t=ji,i,s,r,o,a,c,l,h){super(e,t,i,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Ln=class extends sn{constructor(e,t,i,s,r,o,a,c,l){super(e,t,i,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var hi=class extends sn{constructor(e,t,i=Un,s,r,o,a=Ht,c=Ht,l,h=ai,d=1){if(h!==ai&&h!==fi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let p={width:e,height:t,depth:d};super(p,s,r,o,a,c,h,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ls(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Ar=class extends hi{constructor(e,t=Un,i=ji,s,r,o=Ht,a=Ht,c,l=ai){let h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,i,s,r,o,a,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Cr=class extends sn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},ln=class n extends At{constructor(e=1,t=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],d=[],p=0,g=0;x("z","y","x",-1,-1,i,t,e,o,r,0),x("z","y","x",1,-1,i,t,-e,o,r,1),x("x","z","y",1,1,e,i,t,s,o,2),x("x","z","y",1,-1,e,i,-t,s,o,3),x("x","y","z",1,-1,e,t,i,s,r,4),x("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new rt(l,3)),this.setAttribute("normal",new rt(h,3)),this.setAttribute("uv",new rt(d,2));function x(y,f,m,v,E,M,w,A,_,T,O){let I=M/_,B=w/T,H=M/2,Z=w/2,N=A/2,$=_+1,R=T+1,P=0,U=0,F=new V;for(let G=0;G<R;G++){let te=G*B-Z;for(let ce=0;ce<$;ce++){let Ae=ce*I-H;F[y]=Ae*v,F[f]=te*E,F[m]=N,l.push(F.x,F.y,F.z),F[y]=0,F[f]=0,F[m]=A>0?1:-1,h.push(F.x,F.y,F.z),d.push(ce/_),d.push(1-G/T),P+=1}}for(let G=0;G<T;G++)for(let te=0;te<_;te++){let ce=p+te+$*G,Ae=p+te+$*(G+1),j=p+(te+1)+$*(G+1),le=p+(te+1)+$*G;c.push(ce,Ae,le),c.push(Ae,j,le),U+=6}a.addGroup(g,U,O),g+=U,p+=P}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}},rn=class n extends At{constructor(e=1,t=1,i=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:i,radialSegments:s,heightSegments:r},t=Math.max(0,t),i=Math.max(1,Math.floor(i)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));let o=[],a=[],c=[],l=[],h=t/2,d=Math.PI/2*e,p=t,g=2*d+p,x=i*2+r,y=s+1,f=new V,m=new V;for(let v=0;v<=x;v++){let E=0,M=0,w=0,A=0;if(v<=i){let O=v/i,I=O*Math.PI/2;M=-h-e*Math.cos(I),w=e*Math.sin(I),A=-e*Math.cos(I),E=O*d}else if(v<=i+r){let O=(v-i)/r;M=-h+O*t,w=e,A=0,E=d+O*p}else{let O=(v-i-r)/i,I=O*Math.PI/2;M=h+e*Math.sin(I),w=e*Math.cos(I),A=e*Math.sin(I),E=d+p+O*d}let _=Math.max(0,Math.min(1,E/g)),T=0;v===0?T=.5/s:v===x&&(T=-.5/s);for(let O=0;O<=s;O++){let I=O/s,B=I*Math.PI*2,H=Math.sin(B),Z=Math.cos(B);m.x=-w*Z,m.y=M,m.z=w*H,a.push(m.x,m.y,m.z),f.set(-w*Z,A,w*H),f.normalize(),c.push(f.x,f.y,f.z),l.push(I+T,_)}if(v>0){let O=(v-1)*y;for(let I=0;I<s;I++){let B=O+I,H=O+I+1,Z=v*y+I,N=v*y+I+1;o.push(B,H,Z),o.push(H,N,Z)}}}this.setIndex(o),this.setAttribute("position",new rt(a,3)),this.setAttribute("normal",new rt(c,3)),this.setAttribute("uv",new rt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},Rr=class n extends At{constructor(e=1,t=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:s},t=Math.max(3,t);let r=[],o=[],a=[],c=[],l=new V,h=new Be;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let d=0,p=3;d<=t;d++,p+=3){let g=i+d/t*s;l.x=e*Math.cos(g),l.y=e*Math.sin(g),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[p]/e+1)/2,h.y=(o[p+1]/e+1)/2,c.push(h.x,h.y)}for(let d=1;d<=t;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new rt(o,3)),this.setAttribute("normal",new rt(a,3)),this.setAttribute("uv",new rt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Dn=class n extends At{constructor(e=1,t=1,i=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],d=[],p=[],g=[],x=0,y=[],f=i/2,m=0;v(),o===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new rt(d,3)),this.setAttribute("normal",new rt(p,3)),this.setAttribute("uv",new rt(g,2));function v(){let M=new V,w=new V,A=0,_=(t-e)/i;for(let T=0;T<=r;T++){let O=[],I=T/r,B=I*(t-e)+e;for(let H=0;H<=s;H++){let Z=H/s,N=Z*c+a,$=Math.sin(N),R=Math.cos(N);w.x=B*$,w.y=-I*i+f,w.z=B*R,d.push(w.x,w.y,w.z),M.set($,_,R).normalize(),p.push(M.x,M.y,M.z),g.push(Z,1-I),O.push(x++)}y.push(O)}for(let T=0;T<s;T++)for(let O=0;O<r;O++){let I=y[O][T],B=y[O+1][T],H=y[O+1][T+1],Z=y[O][T+1];(e>0||O!==0)&&(h.push(I,B,Z),A+=3),(t>0||O!==r-1)&&(h.push(B,H,Z),A+=3)}l.addGroup(m,A,0),m+=A}function E(M){let w=x,A=new Be,_=new V,T=0,O=M===!0?e:t,I=M===!0?1:-1;for(let H=1;H<=s;H++)d.push(0,f*I,0),p.push(0,I,0),g.push(.5,.5),x++;let B=x;for(let H=0;H<=s;H++){let N=H/s*c+a,$=Math.cos(N),R=Math.sin(N);_.x=O*R,_.y=f*I,_.z=O*$,d.push(_.x,_.y,_.z),p.push(0,I,0),A.x=$*.5+.5,A.y=R*.5*I+.5,g.push(A.x,A.y),x++}for(let H=0;H<s;H++){let Z=w+H,N=B+H;M===!0?h.push(N,N+1,Z):h.push(N+1,N,Z),T+=3}l.addGroup(m,T,M===!0?1:2),m+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Os=class n extends Dn{constructor(e=1,t=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,i,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new n(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},ca=class n extends At{constructor(e=[],t=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:s};let r=[],o=[];a(s),l(i),h(),this.setAttribute("position",new rt(r,3)),this.setAttribute("normal",new rt(r.slice(),3)),this.setAttribute("uv",new rt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(v){let E=new V,M=new V,w=new V;for(let A=0;A<t.length;A+=3)g(t[A+0],E),g(t[A+1],M),g(t[A+2],w),c(E,M,w,v)}function c(v,E,M,w){let A=w+1,_=[];for(let T=0;T<=A;T++){_[T]=[];let O=v.clone().lerp(M,T/A),I=E.clone().lerp(M,T/A),B=A-T;for(let H=0;H<=B;H++)H===0&&T===A?_[T][H]=O:_[T][H]=O.clone().lerp(I,H/B)}for(let T=0;T<A;T++)for(let O=0;O<2*(A-T)-1;O++){let I=Math.floor(O/2);O%2===0?(p(_[T][I+1]),p(_[T+1][I]),p(_[T][I])):(p(_[T][I+1]),p(_[T+1][I+1]),p(_[T+1][I]))}}function l(v){let E=new V;for(let M=0;M<r.length;M+=3)E.x=r[M+0],E.y=r[M+1],E.z=r[M+2],E.normalize().multiplyScalar(v),r[M+0]=E.x,r[M+1]=E.y,r[M+2]=E.z}function h(){let v=new V;for(let E=0;E<r.length;E+=3){v.x=r[E+0],v.y=r[E+1],v.z=r[E+2];let M=f(v)/2/Math.PI+.5,w=m(v)/Math.PI+.5;o.push(M,1-w)}x(),d()}function d(){for(let v=0;v<o.length;v+=6){let E=o[v+0],M=o[v+2],w=o[v+4],A=Math.max(E,M,w),_=Math.min(E,M,w);A>.9&&_<.1&&(E<.2&&(o[v+0]+=1),M<.2&&(o[v+2]+=1),w<.2&&(o[v+4]+=1))}}function p(v){r.push(v.x,v.y,v.z)}function g(v,E){let M=v*3;E.x=e[M+0],E.y=e[M+1],E.z=e[M+2]}function x(){let v=new V,E=new V,M=new V,w=new V,A=new Be,_=new Be,T=new Be;for(let O=0,I=0;O<r.length;O+=9,I+=6){v.set(r[O+0],r[O+1],r[O+2]),E.set(r[O+3],r[O+4],r[O+5]),M.set(r[O+6],r[O+7],r[O+8]),A.set(o[I+0],o[I+1]),_.set(o[I+2],o[I+3]),T.set(o[I+4],o[I+5]),w.copy(v).add(E).add(M).divideScalar(3);let B=f(w);y(A,I+0,v,B),y(_,I+2,E,B),y(T,I+4,M,B)}}function y(v,E,M,w){w<0&&v.x===1&&(o[E]=v.x-1),M.x===0&&M.z===0&&(o[E]=w/2/Math.PI+.5)}function f(v){return Math.atan2(v.z,-v.x)}function m(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.vertices,e.indices,e.radius,e.detail)}};var Pr=class n extends ca{constructor(e=1,t=0){let i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new n(e.radius,e.detail)}},Ci=class n extends At{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};let r=e/2,o=t/2,a=Math.floor(i),c=Math.floor(s),l=a+1,h=c+1,d=e/a,p=t/c,g=[],x=[],y=[],f=[];for(let m=0;m<h;m++){let v=m*p-o;for(let E=0;E<l;E++){let M=E*d-r;x.push(M,-v,0),y.push(0,0,1),f.push(E/a),f.push(1-m/c)}}for(let m=0;m<c;m++)for(let v=0;v<a;v++){let E=v+l*m,M=v+l*(m+1),w=v+1+l*(m+1),A=v+1+l*m;g.push(E,M,A),g.push(M,w,A)}this.setIndex(g),this.setAttribute("position",new rt(x,3)),this.setAttribute("normal",new rt(y,3)),this.setAttribute("uv",new rt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}};var Tn=class n extends At{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let c=Math.min(o+a,Math.PI),l=0,h=[],d=new V,p=new V,g=[],x=[],y=[],f=[];for(let m=0;m<=i;m++){let v=[],E=m/i,M=o+E*a,w=e*Math.cos(M),A=Math.sqrt(e*e-w*w),_=0;m===0&&o===0?_=.5/t:m===i&&c===Math.PI&&(_=-.5/t);for(let T=0;T<=t;T++){let O=T/t,I=s+O*r;d.x=-A*Math.cos(I),d.y=w,d.z=A*Math.sin(I),x.push(d.x,d.y,d.z),p.copy(d).normalize(),y.push(p.x,p.y,p.z),f.push(O+_,1-E),v.push(l++)}h.push(v)}for(let m=0;m<i;m++)for(let v=0;v<t;v++){let E=h[m][v+1],M=h[m][v],w=h[m+1][v],A=h[m+1][v+1];(m!==0||o>0)&&g.push(E,M,A),(m!==i-1||c<Math.PI)&&g.push(M,w,A)}this.setIndex(g),this.setAttribute("position",new rt(x,3)),this.setAttribute("normal",new rt(y,3)),this.setAttribute("uv",new rt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var ui=class n extends At{constructor(e=1,t=.4,i=12,s=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:r,thetaStart:o,thetaLength:a},i=Math.floor(i),s=Math.floor(s);let c=[],l=[],h=[],d=[],p=new V,g=new V,x=new V;for(let y=0;y<=i;y++){let f=o+y/i*a;for(let m=0;m<=s;m++){let v=m/s*r;g.x=(e+t*Math.cos(f))*Math.cos(v),g.y=(e+t*Math.cos(f))*Math.sin(v),g.z=t*Math.sin(f),l.push(g.x,g.y,g.z),p.x=e*Math.cos(v),p.y=e*Math.sin(v),x.subVectors(g,p).normalize(),h.push(x.x,x.y,x.z),d.push(m/s),d.push(y/i)}}for(let y=1;y<=i;y++)for(let f=1;f<=s;f++){let m=(s+1)*y+f-1,v=(s+1)*(y-1)+f-1,E=(s+1)*(y-1)+f,M=(s+1)*y+f;c.push(m,v,M),c.push(v,E,M)}this.setIndex(c),this.setAttribute("position",new rt(l,3)),this.setAttribute("normal",new rt(h,3)),this.setAttribute("uv",new rt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}};function es(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let s=n[t][i];if(Ed(s))s.isRenderTargetTexture?(ke("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(Ed(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function jt(n){let e={};for(let t=0;t<n.length;t++){let i=es(n[t]);for(let s in i)e[s]=i[s]}return e}function Ed(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Um(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function sh(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:et.workingColorSpace}var vf={clone:es,merge:jt},Om=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,km=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Yn=class extends qn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Om,this.fragmentShader=km,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=es(e.uniforms),this.uniformsGroups=Um(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let i in e.uniforms){let s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new Xe().setHex(s.value);break;case"v2":this.uniforms[i].value=new Be().fromArray(s.value);break;case"v3":this.uniforms[i].value=new V().fromArray(s.value);break;case"v4":this.uniforms[i].value=new yt().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Ge().fromArray(s.value);break;case"m4":this.uniforms[i].value=new mt().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},la=class extends Yn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var Nn=class extends qn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=hc,this.normalScale=new Be(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ci,this.combine=Ta,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},ha=class extends qn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=nf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},ua=class extends qn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Ts(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function Vo(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}var Ri=class{constructor(e,t,i,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,s=t[i],r=t[i-1];n:{e:{let o;t:{i:if(!(e<s)){for(let a=i+2;;){if(s===void 0){if(e<r)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(r=s,s=t[++i],e<s)break e}o=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(i=2,r=a);for(let c=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(s=r,r=t[--i-1],e>=r)break e}o=i,i=0;break t}break n}for(;i<o;){let a=i+o>>>1;e<t[a]?o=a:i=a+1}if(s=t[i],r=t[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=i[r+o];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},da=class extends Ri{constructor(e,t,i,s){super(e,t,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Tl,endingEnd:Tl}}intervalChanged_(e,t,i){let s=this.parameterPositions,r=e-2,o=e+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case El:r=e,a=2*t-i;break;case wl:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=i}if(c===void 0)switch(this.getSettings_().endingEnd){case El:o=e,c=2*i-t;break;case wl:o=1,c=i+s[1]-s[0];break;default:o=e-1,c=t}let l=(i-t)*.5,h=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-i),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this._offsetPrev,d=this._offsetNext,p=this._weightPrev,g=this._weightNext,x=(i-t)/(s-t),y=x*x,f=y*x,m=-p*f+2*p*y-p*x,v=(1+p)*f+(-1.5-2*p)*y+(-.5+p)*x+1,E=(-1-g)*f+(1.5+g)*y+.5*x,M=g*f-g*y;for(let w=0;w!==a;++w)r[w]=m*o[h+w]+v*o[l+w]+E*o[c+w]+M*o[d+w];return r}},fa=class extends Ri{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=(i-t)/(s-t),d=1-h;for(let p=0;p!==a;++p)r[p]=o[l+p]*d+o[c+p]*h;return r}},pa=class extends Ri{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e){return this.copySampleValue_(e-1)}},ma=class extends Ri{interpolate_(e,t,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this.inTangents,d=this.outTangents;if(!h||!d){let x=(i-t)/(s-t),y=1-x;for(let f=0;f!==a;++f)r[f]=o[l+f]*y+o[c+f]*x;return r}let p=a*2,g=e-1;for(let x=0;x!==a;++x){let y=o[l+x],f=o[c+x],m=g*p+x*2,v=d[m],E=d[m+1],M=e*p+x*2,w=h[M],A=h[M+1],_=Bm(i,t,v,w,s);r[x]=Sf(_,y,E,A,f)}return r}};function Sf(n,e,t,i,s){let r=1-n;return r*r*r*e+3*r*r*n*t+3*r*n*n*i+n*n*n*s}function Fm(n,e,t,i,s){let r=1-n;return 3*r*r*(t-e)+6*r*n*(i-t)+3*n*n*(s-i)}function Bm(n,e,t,i,s){let r=(n-e)/(s-e);for(let o=0;o<8;o++){let a=Sf(r,e,t,i,s)-n;if(Math.abs(a)<1e-10)break;let c=Fm(r,e,t,i,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-a/c))}return r}var gn=class{constructor(e,t,i,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ts(t,this.TimeBufferType),this.values=Ts(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:Ts(e.times,Array),values:Ts(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(i.interpolation=s),Vo(e.settings)&&(i.settings={inTangents:Ts(e.settings.inTangents,Array),outTangents:Ts(e.settings.outTangents,Array)})}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new pa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new fa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new da(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new ma(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case dr:t=this.InterpolantFactoryMethodDiscrete;break;case na:t=this.InterpolantFactoryMethodLinear;break;case qo:t=this.InterpolantFactoryMethodSmooth;break;case Ml:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return ke("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return dr;case this.InterpolantFactoryMethodLinear:return na;case this.InterpolantFactoryMethodSmooth:return qo;case this.InterpolantFactoryMethodBezier:return Ml}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]+=e;Vo(this.settings)&&(wd(this.settings.inTangents,e),wd(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]*=e;Vo(this.settings)&&(Ad(this.settings.inTangents,e),Ad(this.settings.outTangents,e))}return this}trim(e,t){let i=this.times,s=i.length,r=0,o=s-1;for(;r!==s&&i[r]<e;)++r;for(;o!==-1&&i[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=i.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Fe("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,s=this.values,r=i.length;r===0&&(Fe("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let c=i[a];if(typeof c=="number"&&isNaN(c)){Fe("KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){Fe("KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(s!==void 0&&mm(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){Fe("KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===qo,r=e.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=e[a],h=e[a+1];if(l!==h&&(a!==1||l!==e[0]))if(s)c=!0;else{let d=a*i,p=d-i,g=d+i;for(let x=0;x!==i;++x){let y=t[d+x];if(y!==t[p+x]||y!==t[g+x]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let d=a*i,p=o*i;for(let g=0;g!==i;++g)t[p+g]=t[d+g]}++o}}if(r>0){e[o]=e[r];for(let a=r*i,c=o*i,l=0;l!==i;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,s=new i(this.name,e,t);return s.createInterpolant=this.createInterpolant,Vo(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function wd(n,e){for(let t=0,i=n.length;t!==i;t+=2)n[t]+=e}function Ad(n,e){for(let t=0,i=n.length;t!==i;t+=2)n[t]*=e}gn.prototype.ValueTypeName="";gn.prototype.TimeBufferType=Float32Array;gn.prototype.ValueBufferType=Float32Array;gn.prototype.DefaultInterpolation=na;var Pi=class extends gn{constructor(e,t,i){super(e,t,i)}};Pi.prototype.ValueTypeName="bool";Pi.prototype.ValueBufferType=Array;Pi.prototype.DefaultInterpolation=dr;Pi.prototype.InterpolantFactoryMethodLinear=void 0;Pi.prototype.InterpolantFactoryMethodSmooth=void 0;var ga=class extends gn{constructor(e,t,i,s){super(e,t,i,s)}};ga.prototype.ValueTypeName="color";var xa=class extends gn{constructor(e,t,i,s){super(e,t,i,s)}};xa.prototype.ValueTypeName="number";var _a=class extends Ri{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(i-t)/(s-t),l=e*a;for(let h=l+a;l!==h;l+=4)Xn.slerpFlat(r,0,o,l-a,o,l,c);return r}},Ir=class extends gn{constructor(e,t,i,s){super(e,t,i,s)}InterpolantFactoryMethodLinear(e){return new _a(this.times,this.values,this.getValueSize(),e)}};Ir.prototype.ValueTypeName="quaternion";Ir.prototype.InterpolantFactoryMethodSmooth=void 0;var Ii=class extends gn{constructor(e,t,i){super(e,t,i)}};Ii.prototype.ValueTypeName="string";Ii.prototype.ValueBufferType=Array;Ii.prototype.DefaultInterpolation=dr;Ii.prototype.InterpolantFactoryMethodLinear=void 0;Ii.prototype.InterpolantFactoryMethodSmooth=void 0;var ya=class extends gn{constructor(e,t,i,s){super(e,t,i,s)}};ya.prototype.ValueTypeName="vector";var va=class{constructor(e,t,i){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,d){return l.push(h,d),this},this.removeHandler=function(h){let d=l.indexOf(h);return d!==-1&&l.splice(d,2),this},this.getHandler=function(h){for(let d=0,p=l.length;d<p;d+=2){let g=l[d],x=l[d+1];if(g.global&&(g.lastIndex=0),g.test(h))return x}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},bf=new va,Sa=class{constructor(e){this.manager=e!==void 0?e:bf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}};Sa.DEFAULT_MATERIAL_NAME="__DEFAULT";var Li=class extends Pt{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Xe(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Lr=class extends Li{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Xe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},bl=new mt,Cd=new V,Rd=new V,ks=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Be(512,512),this.mapType=hn,this.map=null,this.mapPass=null,this.matrix=new mt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ai,this._frameExtents=new Be(1,1),this._viewportCount=1,this._viewports=[new yt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Cd.setFromMatrixPosition(e.matrixWorld),t.position.copy(Cd),Rd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Rd),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,s){bl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(bl,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;e.coordinateSystem===Ps||e.reversedDepth?t.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,1,0,0,0,0,1):t.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,.5,.5,0,0,0,1),t.multiply(bl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Wo=new V,Xo=new Xn,Hn=new V,Dr=class extends Pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new mt,this.projectionMatrix=new mt,this.projectionMatrixInverse=new mt,this.coordinateSystem=Mn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Wo,Xo,Hn),Hn.x===1&&Hn.y===1&&Hn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Wo,Xo,Hn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Wo,Xo,Hn),Hn.x===1&&Hn.y===1&&Hn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Wo,Xo,Hn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Ti=new V,Pd=new Be,Id=new Be,qt=class extends Dr{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=xr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(el*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return xr*2*Math.atan(Math.tan(el*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Ti.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ti.x,Ti.y).multiplyScalar(-e/Ti.z),Ti.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ti.x,Ti.y).multiplyScalar(-e/Ti.z)}getViewSize(e,t){return this.getViewBounds(e,Pd,Id),t.subVectors(Id,Pd)}setViewOffset(e,t,i,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(el*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*i/l,s*=o.width/c,i*=o.height/l}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Cl=class extends ks{constructor(){super(new qt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,i=xr*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(i!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=i,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},Nr=class extends Li{constructor(e,t,i=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.target=new Pt,this.distance=i,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Cl}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},Rl=class extends ks{constructor(){super(new qt(90,1,.5,500)),this.isPointLightShadow=!0}},Fs=class extends Li{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new Rl}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Ur=class extends Dr{constructor(e=-1,t=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-e,o=i+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Pl=class extends ks{constructor(){super(new Ur(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Or=class extends Li{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.target=new Pt,this.shadow=new Pl}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},kr=class extends Li{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var Es=-90,ws=1,Bs=class extends Pt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new qt(Es,ws,e,t);s.layers=this.layers,this.add(s);let r=new qt(Es,ws,e,t);r.layers=this.layers,this.add(r);let o=new qt(Es,ws,e,t);o.layers=this.layers,this.add(o);let a=new qt(Es,ws,e,t);a.layers=this.layers,this.add(a);let c=new qt(Es,ws,e,t);c.layers=this.layers,this.add(c);let l=new qt(Es,ws,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,s,r,o,a,c]=t;for(let l of t)this.remove(l);if(e===Mn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ps)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,d=e.getRenderTarget(),p=e.getActiveCubeFace(),g=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;let y=i.texture.mipmapsAutoUpdate;i.texture.mipmapsAutoUpdate=!1;let f=!1;e.isWebGLRenderer===!0?f=e.state.buffers.depth.getReversed():f=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,2,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,3,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,4,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.mipmapsAutoUpdate=y,e.setRenderTarget(i,5,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,p,g),e.xr.enabled=x,i.texture.needsPMREMUpdate=!0}},ba=class extends qt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}};var rh="\\[\\]\\.:\\/",zm=new RegExp("["+rh+"]","g"),oh="[^"+rh+"]",Gm="[^"+rh.replace("\\.","")+"]",Hm=/((?:WC+[\/:])*)/.source.replace("WC",oh),Vm=/(WCOD+)?/.source.replace("WCOD",Gm),Wm=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",oh),Xm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",oh),qm=new RegExp("^"+Hm+Vm+Wm+Xm+"$"),Ym=["material","materials","bones","map"],Il=class{constructor(e,t,i){let s=i||gt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},gt=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(zm,"")}static parseTrackName(e){let t=qm.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);Ym.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let c=i(a.children);if(c)return c}return null},s=i(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)e[t++]=i[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){ke("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let l=t.objectIndex;switch(i){case"materials":if(!e.material){Fe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Fe("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Fe("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Fe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Fe("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){Fe("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(l!==void 0){if(e[l]===void 0){Fe("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let o=e[s];if(o===void 0){let l=t.nodeName;Fe("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Fe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Fe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};gt.Composite=Il;gt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};gt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};gt.prototype.GetterByBindingType=[gt.prototype._getValue_direct,gt.prototype._getValue_array,gt.prototype._getValue_arrayElement,gt.prototype._getValue_toArray];gt.prototype.SetterByBindingTypeAndVersioning=[[gt.prototype._setValue_direct,gt.prototype._setValue_direct_setNeedsUpdate,gt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[gt.prototype._setValue_array,gt.prototype._setValue_array_setNeedsUpdate,gt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[gt.prototype._setValue_arrayElement,gt.prototype._setValue_arrayElement_setNeedsUpdate,gt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[gt.prototype._setValue_fromArray,gt.prototype._setValue_fromArray_setNeedsUpdate,gt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var eS=new Float32Array(1);var dh=class dh{constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}};dh.prototype.isMatrix2=!0;var Ll=dh;function ah(n,e,t,i){let s=Zm(i);switch(t){case $l:return n*e;case Kl:return n*e/s.components*s.byteLength;case Ia:return n*e/s.components*s.byteLength;case Ui:return n*e*2/s.components*s.byteLength;case La:return n*e*2/s.components*s.byteLength;case jl:return n*e*3/s.components*s.byteLength;case Fn:return n*e*4/s.components*s.byteLength;case Da:return n*e*4/s.components*s.byteLength;case Br:case zr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Gr:case Hr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ua:case ka:return Math.max(n,16)*Math.max(e,8)/4;case Na:case Oa:return Math.max(n,8)*Math.max(e,8)/2;case Fa:case Ba:case Ga:case Ha:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case za:case Vr:case Va:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Wa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Xa:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case qa:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Ya:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Za:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Ja:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case $a:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case ja:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Ka:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Qa:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case ec:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case tc:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case nc:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case ic:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case sc:case rc:case oc:return Math.ceil(n/4)*Math.ceil(e/4)*16;case ac:case cc:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Wr:case lc:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Zm(n){switch(n){case hn:case ql:return{byteLength:1,components:1};case Vs:case Yl:case kn:return{byteLength:2,components:1};case Ra:case Pa:return{byteLength:2,components:4};case Un:case Ca:case On:return{byteLength:4,components:1};case Zl:case Jl:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?ke("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function Wf(){let n=null,e=!1,t=null,i=null;function s(r,o){i=n.requestAnimationFrame(s),t(r,o)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function t0(n){let e=new WeakMap;function t(a,c){let l=a.array,h=a.usage,d=l.byteLength,p=n.createBuffer();n.bindBuffer(c,p),n.bufferData(c,l,h),a.onUploadCallback();let g;if(l instanceof Float32Array)g=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)g=n.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?g=n.HALF_FLOAT:g=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)g=n.SHORT;else if(l instanceof Uint32Array)g=n.UNSIGNED_INT;else if(l instanceof Int32Array)g=n.INT;else if(l instanceof Int8Array)g=n.BYTE;else if(l instanceof Uint8Array)g=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)g=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:p,type:g,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,c,l){let h=c.array,d=c.updateRanges;if(n.bindBuffer(l,a),d.length===0)n.bufferSubData(l,0,h);else{d.sort((g,x)=>g.start-x.start);let p=0;for(let g=1;g<d.length;g++){let x=d[p],y=d[g];y.start<=x.start+x.count+1?x.count=Math.max(x.count,y.start+y.count-x.start):(++p,d[p]=y)}d.length=p+1;for(let g=0,x=d.length;g<x;g++){let y=d[g];n.bufferSubData(l,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(n.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var n0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,i0=`#ifdef USE_ALPHAHASH
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
#endif`,s0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,r0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,o0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,a0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,c0=`#ifdef USE_AOMAP
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
#endif`,l0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,h0=`#ifdef USE_BATCHING
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
#endif`,u0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,d0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,f0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,p0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,m0=`#ifdef USE_IRIDESCENCE
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
#endif`,g0=`#ifdef USE_BUMPMAP
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
#endif`,x0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,_0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,y0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,v0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,S0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,b0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,M0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,T0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,E0=`#define PI 3.141592653589793
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
} // validated`,w0=`vec3 transformedNormal = objectNormal;
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
#endif`,A0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,C0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,R0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,P0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,I0="gl_FragColor = linearToOutputTexel( gl_FragColor );",L0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,D0=`#ifdef USE_ENVMAP
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
#endif`,N0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,U0=`#ifdef USE_ENVMAP
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
#endif`,O0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,k0=`#ifdef USE_ENVMAP
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
#endif`,F0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,B0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,z0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,G0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,H0=`#ifdef USE_GRADIENTMAP
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
}`,V0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,W0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,X0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,q0=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Y0=`#ifdef USE_ENVMAP
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
#endif`,Z0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,J0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,$0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,j0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,K0=`PhysicalMaterial material;
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
#endif`,Q0=`uniform sampler2D dfgLUT;
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
}`,eg=`
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
#endif`,tg=`#if defined( RE_IndirectDiffuse )
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
#endif`,ng=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ig=`#if NUM_LIGHT_PROBE_GRIDS > 0
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
#endif`,sg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,rg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,og=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ag=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,cg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,lg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,hg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,ug=`#if defined( USE_POINTS_UV )
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
#endif`,dg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,fg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,pg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,mg=`#if defined( USE_MORPHCOLORS )
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
#endif`,gg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xg=`#ifdef USE_MORPHTARGETS
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
#endif`,_g=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,yg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,vg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Sg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Mg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Tg=`#ifdef USE_NORMALMAP
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
#endif`,Eg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,wg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ag=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Cg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Rg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Pg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Ig=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Lg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Dg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ng=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ug=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Og=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,kg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Fg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Bg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,zg=`float getShadowMask() {
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
}`,Gg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Hg=`#ifdef USE_SKINNING
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
#endif`,Vg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Wg=`#ifdef USE_SKINNING
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
#endif`,Xg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,qg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Yg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Zg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Jg=`#ifdef USE_TRANSMISSION
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
#endif`,$g=`#ifdef USE_TRANSMISSION
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
#endif`,jg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Kg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Qg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ex=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,tx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,nx=`uniform sampler2D t2D;
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
}`,ix=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,sx=`uniform float backgroundBlurriness;
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
}`,rx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ox=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ax=`#include <common>
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
}`,cx=`#if DEPTH_PACKING == 3200
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
}`,lx=`#define DISTANCE
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
}`,hx=`#define DISTANCE
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
}`,ux=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,dx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fx=`uniform float scale;
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
}`,px=`uniform vec3 diffuse;
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
}`,mx=`#include <common>
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
}`,gx=`uniform vec3 diffuse;
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
}`,xx=`#define LAMBERT
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
}`,_x=`#define LAMBERT
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
}`,yx=`#define MATCAP
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
}`,vx=`#define MATCAP
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
}`,Sx=`#define NORMAL
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
}`,bx=`#define NORMAL
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
}`,Mx=`#define PHONG
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
}`,Tx=`#define PHONG
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
}`,Ex=`#define STANDARD
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
}`,wx=`#define STANDARD
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
}`,Ax=`#define TOON
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
}`,Cx=`#define TOON
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
}`,Rx=`uniform float size;
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
}`,Px=`uniform vec3 diffuse;
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
}`,Ix=`#include <common>
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
}`,Lx=`uniform vec3 color;
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
}`,Dx=`uniform float rotation;
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
}`,Nx=`uniform vec3 diffuse;
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
}`,$e={alphahash_fragment:n0,alphahash_pars_fragment:i0,alphamap_fragment:s0,alphamap_pars_fragment:r0,alphatest_fragment:o0,alphatest_pars_fragment:a0,aomap_fragment:c0,aomap_pars_fragment:l0,batching_pars_vertex:h0,batching_vertex:u0,begin_vertex:d0,beginnormal_vertex:f0,bsdfs:p0,iridescence_fragment:m0,bumpmap_pars_fragment:g0,clipping_planes_fragment:x0,clipping_planes_pars_fragment:_0,clipping_planes_pars_vertex:y0,clipping_planes_vertex:v0,color_fragment:S0,color_pars_fragment:b0,color_pars_vertex:M0,color_vertex:T0,common:E0,defaultnormal_vertex:w0,displacementmap_pars_vertex:A0,displacementmap_vertex:C0,emissivemap_fragment:R0,emissivemap_pars_fragment:P0,colorspace_fragment:I0,colorspace_pars_fragment:L0,envmap_fragment:D0,envmap_common_pars_fragment:N0,envmap_pars_fragment:U0,envmap_pars_vertex:O0,envmap_physical_pars_fragment:Y0,envmap_vertex:k0,fog_vertex:F0,fog_pars_vertex:B0,fog_fragment:z0,fog_pars_fragment:G0,gradientmap_pars_fragment:H0,lightmap_pars_fragment:V0,lights_lambert_fragment:W0,lights_lambert_pars_fragment:X0,lights_pars_begin:q0,lights_toon_fragment:Z0,lights_toon_pars_fragment:J0,lights_phong_fragment:$0,lights_phong_pars_fragment:j0,lights_physical_fragment:K0,lights_physical_pars_fragment:Q0,lights_fragment_begin:eg,lights_fragment_maps:tg,lights_fragment_end:ng,lightprobes_pars_fragment:ig,logdepthbuf_fragment:sg,logdepthbuf_pars_fragment:rg,logdepthbuf_pars_vertex:og,logdepthbuf_vertex:ag,map_fragment:cg,map_pars_fragment:lg,map_particle_fragment:hg,map_particle_pars_fragment:ug,metalnessmap_fragment:dg,metalnessmap_pars_fragment:fg,morphinstance_vertex:pg,morphcolor_vertex:mg,morphnormal_vertex:gg,morphtarget_pars_vertex:xg,morphtarget_vertex:_g,normal_fragment_begin:yg,normal_fragment_maps:vg,normal_pars_fragment:Sg,normal_pars_vertex:bg,normal_vertex:Mg,normalmap_pars_fragment:Tg,clearcoat_normal_fragment_begin:Eg,clearcoat_normal_fragment_maps:wg,clearcoat_pars_fragment:Ag,iridescence_pars_fragment:Cg,opaque_fragment:Rg,packing:Pg,premultiplied_alpha_fragment:Ig,project_vertex:Lg,dithering_fragment:Dg,dithering_pars_fragment:Ng,roughnessmap_fragment:Ug,roughnessmap_pars_fragment:Og,shadowmap_pars_fragment:kg,shadowmap_pars_vertex:Fg,shadowmap_vertex:Bg,shadowmask_pars_fragment:zg,skinbase_vertex:Gg,skinning_pars_vertex:Hg,skinning_vertex:Vg,skinnormal_vertex:Wg,specularmap_fragment:Xg,specularmap_pars_fragment:qg,tonemapping_fragment:Yg,tonemapping_pars_fragment:Zg,transmission_fragment:Jg,transmission_pars_fragment:$g,uv_pars_fragment:jg,uv_pars_vertex:Kg,uv_vertex:Qg,worldpos_vertex:ex,background_vert:tx,background_frag:nx,backgroundCube_vert:ix,backgroundCube_frag:sx,cube_vert:rx,cube_frag:ox,depth_vert:ax,depth_frag:cx,distance_vert:lx,distance_frag:hx,equirect_vert:ux,equirect_frag:dx,linedashed_vert:fx,linedashed_frag:px,meshbasic_vert:mx,meshbasic_frag:gx,meshlambert_vert:xx,meshlambert_frag:_x,meshmatcap_vert:yx,meshmatcap_frag:vx,meshnormal_vert:Sx,meshnormal_frag:bx,meshphong_vert:Mx,meshphong_frag:Tx,meshphysical_vert:Ex,meshphysical_frag:wx,meshtoon_vert:Ax,meshtoon_frag:Cx,points_vert:Rx,points_frag:Px,shadow_vert:Ix,shadow_frag:Lx,sprite_vert:Dx,sprite_frag:Nx},be={common:{diffuse:{value:new Xe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ge}},envmap:{envMap:{value:null},envMapRotation:{value:new Ge},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ge}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ge}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ge},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ge},normalScale:{value:new Be(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ge},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ge}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ge}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ge}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Xe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0},uvTransform:{value:new Ge}},sprite:{diffuse:{value:new Xe(16777215)},opacity:{value:1},center:{value:new Be(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}}},$n={basic:{uniforms:jt([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.fog]),vertexShader:$e.meshbasic_vert,fragmentShader:$e.meshbasic_frag},lambert:{uniforms:jt([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new Xe(0)},envMapIntensity:{value:1}}]),vertexShader:$e.meshlambert_vert,fragmentShader:$e.meshlambert_frag},phong:{uniforms:jt([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new Xe(0)},specular:{value:new Xe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:$e.meshphong_vert,fragmentShader:$e.meshphong_frag},standard:{uniforms:jt([be.common,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.roughnessmap,be.metalnessmap,be.fog,be.lights,{emissive:{value:new Xe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$e.meshphysical_vert,fragmentShader:$e.meshphysical_frag},toon:{uniforms:jt([be.common,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.gradientmap,be.fog,be.lights,{emissive:{value:new Xe(0)}}]),vertexShader:$e.meshtoon_vert,fragmentShader:$e.meshtoon_frag},matcap:{uniforms:jt([be.common,be.bumpmap,be.normalmap,be.displacementmap,be.fog,{matcap:{value:null}}]),vertexShader:$e.meshmatcap_vert,fragmentShader:$e.meshmatcap_frag},points:{uniforms:jt([be.points,be.fog]),vertexShader:$e.points_vert,fragmentShader:$e.points_frag},dashed:{uniforms:jt([be.common,be.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$e.linedashed_vert,fragmentShader:$e.linedashed_frag},depth:{uniforms:jt([be.common,be.displacementmap]),vertexShader:$e.depth_vert,fragmentShader:$e.depth_frag},normal:{uniforms:jt([be.common,be.bumpmap,be.normalmap,be.displacementmap,{opacity:{value:1}}]),vertexShader:$e.meshnormal_vert,fragmentShader:$e.meshnormal_frag},sprite:{uniforms:jt([be.sprite,be.fog]),vertexShader:$e.sprite_vert,fragmentShader:$e.sprite_frag},background:{uniforms:{uvTransform:{value:new Ge},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$e.background_vert,fragmentShader:$e.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ge}},vertexShader:$e.backgroundCube_vert,fragmentShader:$e.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$e.cube_vert,fragmentShader:$e.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$e.equirect_vert,fragmentShader:$e.equirect_frag},distance:{uniforms:jt([be.common,be.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$e.distance_vert,fragmentShader:$e.distance_frag},shadow:{uniforms:jt([be.lights,be.fog,{color:{value:new Xe(0)},opacity:{value:1}}]),vertexShader:$e.shadow_vert,fragmentShader:$e.shadow_frag}};$n.physical={uniforms:jt([$n.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ge},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ge},clearcoatNormalScale:{value:new Be(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ge},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Ge},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ge},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ge},sheen:{value:0},sheenColor:{value:new Xe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ge},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ge},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ge},transmissionSamplerSize:{value:new Be},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ge},attenuationDistance:{value:0},attenuationColor:{value:new Xe(0)},specularColor:{value:new Xe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ge},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ge},anisotropyVector:{value:new Be},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ge}}]),vertexShader:$e.meshphysical_vert,fragmentShader:$e.meshphysical_frag};var dc={r:0,b:0,g:0},Ux=new mt,Xf=new Ge;Xf.set(-1,0,0,0,1,0,0,0,1);function Ox(n,e,t,i,s,r){let o=new Xe(0),a=s===!0?0:1,c,l,h=null,d=0,p=null;function g(v){let E=v.isScene===!0?v.background:null;if(E&&E.isTexture){let M=v.backgroundBlurriness>0;E=e.get(E,M)}return E}function x(v){let E=!1,M=g(v);M===null?f(o,a):M&&M.isColor&&(f(M,1),E=!0);let w=n.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||E)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function y(v,E){let M=g(E);M&&M.isCubeTexture?(l===void 0&&(l=new nt(new ln(1,1,1),new Yn({name:"BackgroundCubeMaterial",uniforms:es($n.backgroundCube.uniforms),vertexShader:$n.backgroundCube.vertexShader,fragmentShader:$n.backgroundCube.fragmentShader,side:on,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(w,A,_){this.matrixWorld.copyPosition(_.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=M,l.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Ux.makeRotationFromEuler(E.backgroundRotation)).transpose(),M.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Xf),l.material.toneMapped=et.getTransfer(M.colorSpace)!==at,(h!==M||d!==M.version||p!==n.toneMapping)&&(l.material.needsUpdate=!0,h=M,d=M.version,p=n.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new nt(new Ci(2,2),new Yn({name:"BackgroundMaterial",uniforms:es($n.background.uniforms),vertexShader:$n.background.vertexShader,fragmentShader:$n.background.fragmentShader,side:Di,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.toneMapped=et.getTransfer(M.colorSpace)!==at,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||d!==M.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,h=M,d=M.version,p=n.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function f(v,E){v.getRGB(dc,sh(n)),t.buffers.color.setClear(dc.r,dc.g,dc.b,E,r)}function m(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(v,E=1){o.set(v),a=E,f(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(v){a=v,f(o,a)},render:x,addToRenderList:y,dispose:m}}function kx(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=p(null),r=s,o=!1;function a(B,H,Z,N,$){let R=!1,P=d(B,N,Z,H);r!==P&&(r=P,l(r.object)),R=g(B,N,Z,$),R&&x(B,N,Z,$),$!==null&&e.update($,n.ELEMENT_ARRAY_BUFFER),(R||o)&&(o=!1,M(B,H,Z,N),$!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get($).buffer))}function c(){return n.createVertexArray()}function l(B){return n.bindVertexArray(B)}function h(B){return n.deleteVertexArray(B)}function d(B,H,Z,N){let $=N.wireframe===!0,R=i[H.id];R===void 0&&(R={},i[H.id]=R);let P=B.isInstancedMesh===!0?B.id:0,U=R[P];U===void 0&&(U={},R[P]=U);let F=U[Z.id];F===void 0&&(F={},U[Z.id]=F);let G=F[$];return G===void 0&&(G=p(c()),F[$]=G),G}function p(B){let H=[],Z=[],N=[];for(let $=0;$<t;$++)H[$]=0,Z[$]=0,N[$]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:H,enabledAttributes:Z,attributeDivisors:N,object:B,attributes:{},index:null}}function g(B,H,Z,N){let $=r.attributes,R=H.attributes,P=0,U=Z.getAttributes();for(let F in U)if(U[F].location>=0){let te=$[F],ce=R[F];if(ce===void 0&&(F==="instanceMatrix"&&B.instanceMatrix&&(ce=B.instanceMatrix),F==="instanceColor"&&B.instanceColor&&(ce=B.instanceColor)),te===void 0||te.attribute!==ce||ce&&te.data!==ce.data)return!0;P++}return r.attributesNum!==P||r.index!==N}function x(B,H,Z,N){let $={},R=H.attributes,P=0,U=Z.getAttributes();for(let F in U)if(U[F].location>=0){let te=R[F];te===void 0&&(F==="instanceMatrix"&&B.instanceMatrix&&(te=B.instanceMatrix),F==="instanceColor"&&B.instanceColor&&(te=B.instanceColor));let ce={};ce.attribute=te,te&&te.data&&(ce.data=te.data),$[F]=ce,P++}r.attributes=$,r.attributesNum=P,r.index=N}function y(){let B=r.newAttributes;for(let H=0,Z=B.length;H<Z;H++)B[H]=0}function f(B){m(B,0)}function m(B,H){let Z=r.newAttributes,N=r.enabledAttributes,$=r.attributeDivisors;Z[B]=1,N[B]===0&&(n.enableVertexAttribArray(B),N[B]=1),$[B]!==H&&(n.vertexAttribDivisor(B,H),$[B]=H)}function v(){let B=r.newAttributes,H=r.enabledAttributes;for(let Z=0,N=H.length;Z<N;Z++)H[Z]!==B[Z]&&(n.disableVertexAttribArray(Z),H[Z]=0)}function E(B,H,Z,N,$,R,P){P===!0?n.vertexAttribIPointer(B,H,Z,$,R):n.vertexAttribPointer(B,H,Z,N,$,R)}function M(B,H,Z,N){y();let $=N.attributes,R=Z.getAttributes(),P=H.defaultAttributeValues;for(let U in R){let F=R[U];if(F.location>=0){let G=$[U];if(G===void 0&&(U==="instanceMatrix"&&B.instanceMatrix&&(G=B.instanceMatrix),U==="instanceColor"&&B.instanceColor&&(G=B.instanceColor)),G!==void 0){let te=G.normalized,ce=G.itemSize,Ae=e.get(G);if(Ae===void 0)continue;let j=Ae.buffer,le=Ae.type,ve=Ae.bytesPerElement,Ee=le===n.INT||le===n.UNSIGNED_INT||G.gpuType===Ca;if(G.isInterleavedBufferAttribute){let ue=G.data,ze=ue.isInterleavedBuffer===!0?ue.stride:ue.itemSize,ot=G.offset;if(ue.isInstancedInterleavedBuffer||ue.isInstancedBufferAttribute){for(let Oe=0;Oe<F.locationSize;Oe++)m(F.location+Oe,ue.meshPerAttribute);B.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let Oe=0;Oe<F.locationSize;Oe++)f(F.location+Oe);n.bindBuffer(n.ARRAY_BUFFER,j);for(let Oe=0;Oe<F.locationSize;Oe++)E(F.location+Oe,ce/F.locationSize,le,te,ze*ve,(ot+ce/F.locationSize*Oe)*ve,Ee)}else{if(G.isInstancedBufferAttribute){for(let ue=0;ue<F.locationSize;ue++)m(F.location+ue,G.meshPerAttribute);B.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=G.meshPerAttribute*G.count)}else for(let ue=0;ue<F.locationSize;ue++)f(F.location+ue);n.bindBuffer(n.ARRAY_BUFFER,j);for(let ue=0;ue<F.locationSize;ue++)E(F.location+ue,ce/F.locationSize,le,te,ce*ve,ce/F.locationSize*ue*ve,Ee)}}else if(P!==void 0){let te=P[U];if(te!==void 0)switch(te.length){case 2:n.vertexAttrib2fv(F.location,te);break;case 3:n.vertexAttrib3fv(F.location,te);break;case 4:n.vertexAttrib4fv(F.location,te);break;default:n.vertexAttrib1fv(F.location,te)}}}}v()}function w(){O();for(let B in i){let H=i[B];for(let Z in H){let N=H[Z];for(let $ in N){let R=N[$];for(let P in R)h(R[P].object),delete R[P];delete N[$]}}delete i[B]}}function A(B){if(i[B.id]===void 0)return;let H=i[B.id];for(let Z in H){let N=H[Z];for(let $ in N){let R=N[$];for(let P in R)h(R[P].object),delete R[P];delete N[$]}}delete i[B.id]}function _(B){for(let H in i){let Z=i[H];for(let N in Z){let $=Z[N];if($[B.id]===void 0)continue;let R=$[B.id];for(let P in R)h(R[P].object),delete R[P];delete $[B.id]}}}function T(B){for(let H in i){let Z=i[H],N=B.isInstancedMesh===!0?B.id:0,$=Z[N];if($!==void 0){for(let R in $){let P=$[R];for(let U in P)h(P[U].object),delete P[U];delete $[R]}delete Z[N],Object.keys(Z).length===0&&delete i[H]}}}function O(){I(),o=!0,r!==s&&(r=s,l(r.object))}function I(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:O,resetDefaultState:I,dispose:w,releaseStatesOfGeometry:A,releaseStatesOfObject:T,releaseStatesOfProgram:_,initAttributes:y,enableAttribute:f,disableUnusedAttributes:v}}function Fx(n,e,t){let i;function s(c){i=c}function r(c,l){n.drawArrays(i,c,l),t.update(l,i,1)}function o(c,l,h){h!==0&&(n.drawArraysInstanced(i,c,l,h),t.update(l,i,h))}function a(c,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,h);let p=0;for(let g=0;g<h;g++)p+=l[g];t.update(p,i,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function Bx(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let _=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(_.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(_){return!(_!==Fn&&i.convert(_)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(_){let T=_===kn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(_!==hn&&_!==On&&!T&&i.convert(_)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function c(_){if(_==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";_="mediump"}return _==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",h=c(l);h!==l&&(ke("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),p=t.logarithmicDepthBuffer===!0&&d===!1;t.reversedDepthBuffer===!0&&d===!1&&ke("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&d===!0&&ke("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let g=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=n.getParameter(n.MAX_TEXTURE_SIZE),f=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),v=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),E=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=n.getParameter(n.MAX_SAMPLES),A=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:p,reversedDepthBuffer:d,maxTextures:g,maxVertexTextures:x,maxTextureSize:y,maxCubemapSize:f,maxAttributes:m,maxVertexUniforms:v,maxVaryings:E,maxFragmentUniforms:M,maxSamples:w,samples:A}}function zx(n){let e=this,t=null,i=0,s=!1,r=!1,o=new In,a=new Ge,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,p){let g=d.length!==0||p||i!==0||s;return s=p,i=d.length,g},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,p){t=h(d,p,0)},this.setState=function(d,p,g){let x=d.clippingPlanes,y=d.clipIntersection,f=d.clipShadows,m=n.get(d);if(!s||x===null||x.length===0||r&&!f)r?h(null):l();else{let v=r?0:i,E=v*4,M=m.clippingState||null;c.value=M,M=h(x,p,E,g);for(let w=0;w!==E;++w)M[w]=t[w];m.clippingState=M,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(d,p,g,x){let y=d!==null?d.length:0,f=null;if(y!==0){if(f=c.value,x!==!0||f===null){let m=g+y*4,v=p.matrixWorldInverse;a.getNormalMatrix(v),(f===null||f.length<m)&&(f=new Float32Array(m));for(let E=0,M=g;E!==y;++E,M+=4)o.copy(d[E]).applyMatrix4(v,a),o.normal.toArray(f,M),f[M+3]=o.constant}c.value=f,c.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,f}}var Yr=class extends mn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new wr(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new ln(5,5,5),r=new Yn({name:"CubemapFromEquirect",uniforms:es(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:on,blending:Ji});r.uniforms.tEquirect.value=t;let o=new nt(s,r),a=t.minFilter;return t.minFilter===di&&(t.minFilter=nn),new Bs(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,s);e.setRenderTarget(r)}},Mf=256,Gx=3,Hx=20,qf=256,Yf=16,Vx=3,Wx=new V,Xx=new Xe,pc=class n{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Bs(1,10,null),this._boxMesh=new nt(new ln(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){let{size:o=256,position:a=Wx}=r,c=this._renderer;this._setSize(o);let l=this._allocateTarget(),h=this._getSourceTarget(!0);t>0&&(h.texture.mipmapsAutoUpdate=!1);let d=c.autoClear,p=c.autoClearColor,g=c.autoClearDepth,x=c.autoClearStencil,y=e.background;c.autoClear=!0,c.autoClearColor=!0,c.autoClearDepth=!0,c.autoClearStencil=!0,y===null&&(e.background=c.getClearColor(Xx));let f=new Bs(i,s,h);return f.position.copy(a),f.update(c,e),c.autoClear=d,c.autoClearColor=p,c.autoClearDepth=g,c.autoClearStencil=x,e.background=y,t>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(l,t)),this._applyPMREM(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=wf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ef(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(Mf,mf(e))}_fromTexture(e,t){e.mapping===ji||e.mapping===Hs?this._setSize(e.image.length===0?Mf:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let i=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(i),i}_allocateTarget(){let e=this._cubeSize,t=Tf(e,!1,!1),i=Math.log2(e)-Gx;for(let s=0;s<=i;s++)t.texture.mipmaps.push({width:e>>s,height:e>>s});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,i=this._sourceTarget;return(i===null||i.width!==t||e&&i.depthBuffer===!1)&&(i!==null&&i.dispose(),this._sourceTarget=Tf(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,i){let s=this._boxMesh,r=this._cubeCamera;s.material=i,r.renderTarget=e,r.activeMipmapLevel=t;let o=e.width>>t;e.viewport.set(0,0,o,o),r.update(this._renderer,s),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===ji||e.mapping===Hs?(this._cubemapMaterial===null&&(this._cubemapMaterial=wf()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Ef()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=qx(),this._integrationMaterial=Yx());let t=this._cubeSize,i=e.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(t/Yf);for(let o=0;o<=i;o++){let a=n.lodToRoughness(o,i);if(o>i-Vx)r.roughness.value=a,this._renderCube(e,o,this._integrationMaterial);else{let c=a>0?Math.log2(t)+.5*Math.log2(6/(qf*Math.pow(a,4)))+.5:0;s.roughness.value=a,s.lodBias.value=c,this._renderCube(e,o,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=Zx());let i=this._blurMaterial,s=i.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(e,0,i),s.envMap.value=e.texture,this._renderCube(r,0,i)}};function Tf(n,e,t){return new Yr(n,{minFilter:di,generateMipmaps:e,type:kn,colorSpace:fr,depthBuffer:t})}function Zr(n,e,t){return new Yn({name:n,uniforms:e,vertexShader:$e.cube_vert,fragmentShader:t,side:on,blending:Ji,depthTest:!1,depthWrite:!1})}function qx(){return Zr("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${qf}u

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
	`)}function Yx(){return Zr("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Yf}},`

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
	`)}function Zx(){return Zr("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${Hx}
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
	`)}function Ef(){return Zr("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

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
	`)}function wf(){return Zr("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function Jx(n){let e=new WeakMap,t=new WeakMap,i=null;function s(p,g=!1){return p==null?null:g?o(p):r(p)}function r(p){if(p&&p.isTexture){let g=p.mapping;if(g===Ea||g===wa)if(e.has(p)){let x=e.get(p).texture;return a(x,p.mapping)}else{let x=p.image;if(x&&x.height>0){let y=new Yr(x.height);return y.fromEquirectangularTexture(n,p),e.set(p,y),p.addEventListener("dispose",l),a(y.texture,p.mapping)}else return null}}return p}function o(p){if(p&&p.isTexture&&p.isPMREMTexture!==!0){let g=p.mapping,x=g===Ea||g===wa,y=g===ji||g===Hs;if(x||y){let f=t.get(p),m=f!==void 0?f.texture.pmremVersion:0;if(p.isRenderTargetTexture&&p.pmremVersion!==m)return i===null&&(i=new pc(n)),f=x?i.fromEquirectangular(p,f):i.fromCubemap(p,f),f.texture.pmremVersion=p.pmremVersion,t.set(p,f),f.texture;if(f!==void 0)return f.texture;{let v=p.image;return x&&v&&v.height>0||y&&v&&c(v)?(i===null&&(i=new pc(n)),f=x?i.fromEquirectangular(p):i.fromCubemap(p),f.texture.pmremVersion=p.pmremVersion,t.set(p,f),p.addEventListener("dispose",h),f.texture):null}}}return p}function a(p,g){return g===Ea?p.mapping=ji:g===wa&&(p.mapping=Hs),p}function c(p){let g=0,x=6;for(let y=0;y<x;y++)p[y]!==void 0&&g++;return g===x}function l(p){let g=p.target;g.removeEventListener("dispose",l);let x=e.get(g);x!==void 0&&(e.delete(g),x.dispose())}function h(p){let g=p.target;g.removeEventListener("dispose",h);let x=t.get(g);x!==void 0&&(t.delete(g),x.dispose())}function d(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:d}}function $x(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let s=t(i);return s===null&&ur("WebGLRenderer: "+i+" extension not supported."),s}}}function jx(n,e,t,i){let s={},r=new WeakMap,o=new FinalizationRegistry(x=>delete s[x]);function a(x){c(x.target)}function c(x){x.index!==null&&e.remove(x.index);for(let f in x.attributes)e.remove(x.attributes[f]);x.removeEventListener("dispose",a),delete s[x.id],o.unregister(x);let y=r.get(x);y&&(e.remove(y),r.delete(x)),i.releaseStatesOfGeometry(x),x.isInstancedBufferGeometry===!0&&delete x._maxInstanceCount,t.memory.geometries--}function l(x,y){return s[y.id]!==void 0||(y.addEventListener("dispose",a),s[y.id]=new WeakRef(y),o.register(y,y.id,y),t.memory.geometries++),y}function h(x){let y=x.attributes;for(let f in y)e.update(y[f],n.ARRAY_BUFFER)}function d(x){let y=x.index,f=x.attributes.position,m=0;if(f===void 0)return;let v=y!==null?y.array.length:f.array.length/3-1,E=f.count>=65535?Mr:br,M=new E(Math.ceil(v/3)*6,1),w=M.array;if(y!==null){let _=y.array;m=y.version;for(let T=0,O=0;T<v;T+=3){let I=_[T+0],B=_[T+1],H=_[T+2];w[O++]=I,w[O++]=B,w[O++]=B,w[O++]=H,w[O++]=H,w[O++]=I}}else{m=f.version;for(let _=0,T=0;_<v;_+=3){let O=_+0,I=_+1,B=_+2;w[T++]=O,w[T++]=I,w[T++]=I,w[T++]=B,w[T++]=B,w[T++]=O}}M.version=m;let A=r.get(x);A&&e.remove(A),r.set(x,M)}function p(x){let y=r.get(x);if(y){let f=x.index;f!==null&&y.version<f.version&&d(x)}else d(x);return r.get(x)}function g(){for(let x in s){let y=s[x].deref();y!==void 0&&c(y)}}return{get:l,update:h,getWireframeAttribute:p,dispose:g}}function Kx(n,e,t){let i;function s(d){i=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function c(d,p){n.drawElements(i,p,r,d*o),t.update(p,i,1)}function l(d,p,g){g!==0&&(n.drawElementsInstanced(i,p,r,d*o,g),t.update(p,i,g))}function h(d,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,r,d,0,g);let y=0;for(let f=0;f<g;f++)y+=p[f];t.update(y,i,1)}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function Qx(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(r/3);break;case n.LINES:t.lines+=a*(r/2);break;case n.LINE_STRIP:t.lines+=a*(r-1);break;case n.LINE_LOOP:t.lines+=a*r;break;case n.POINTS:t.points+=a*r;break;default:Fe("WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function e_(n,e,t){let i=new WeakMap,s=new yt;function r(o,a,c){let l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0,p=i.get(a);if(p===void 0||p.count!==d){let O=function(){_.dispose(),i.delete(a),a.removeEventListener("dispose",O)};p!==void 0&&p.texture.dispose();let g=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,y=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],v=a.morphAttributes.color||[],E=0;g===!0&&(E=1),x===!0&&(E=2),y===!0&&(E=3);let M=a.attributes.position.count*E,w=1;M>e.maxTextureSize&&(w=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);let A=new Float32Array(M*w*4*d),_=new _r(A,M,w,d);_.type=On,_.needsUpdate=!0;let T=E*4;for(let I=0;I<d;I++){let B=f[I],H=m[I],Z=v[I],N=M*w*4*I;for(let $=0;$<B.count;$++){let R=$*T;g===!0&&(s.fromBufferAttribute(B,$),A[N+R+0]=s.x,A[N+R+1]=s.y,A[N+R+2]=s.z,A[N+R+3]=0),x===!0&&(s.fromBufferAttribute(H,$),A[N+R+4]=s.x,A[N+R+5]=s.y,A[N+R+6]=s.z,A[N+R+7]=0),y===!0&&(s.fromBufferAttribute(Z,$),A[N+R+8]=s.x,A[N+R+9]=s.y,A[N+R+10]=s.z,A[N+R+11]=Z.itemSize===4?s.w:1)}}p={count:d,texture:_,size:new Be(M,w)},i.set(a,p),a.addEventListener("dispose",O)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let g=0;for(let y=0;y<l.length;y++)g+=l[y];let x=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(n,"morphTargetBaseInfluence",x),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",p.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",p.size)}return{update:r}}function t_(n,e,t,i,s){let r=new WeakMap;function o(l){let h=s.render.frame,d=l.geometry,p=e.get(l,d);if(r.get(p)!==h&&(e.update(p),r.set(p,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){let g=l.skeleton;r.get(g)!==h&&(g.update(),r.set(g,h))}return p}function a(){r=new WeakMap}function c(l){let h=l.target;h.removeEventListener("dispose",c),i.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:o,dispose:a}}var n_={[Fl]:"LINEAR_TONE_MAPPING",[Bl]:"REINHARD_TONE_MAPPING",[zl]:"CINEON_TONE_MAPPING",[Gl]:"ACES_FILMIC_TONE_MAPPING",[Vl]:"AGX_TONE_MAPPING",[Wl]:"NEUTRAL_TONE_MAPPING",[Hl]:"CUSTOM_TONE_MAPPING"};function i_(n,e,t,i,s,r){let o=new mn(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,c=null,l=null,h=new At;h.setAttribute("position",new rt([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new rt([0,2,0,0,2,0],2));let d=new la({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),p=new nt(h,d),g=new Ur(-1,1,1,-1,0,1),x=null,y=null,f=!1,m,v=null,E=[],M=!1;this.setSize=function(w,A){o.setSize(w,A),a!==null&&a.setSize(w,A),c!==null&&c.setSize(w,A);for(let _=0;_<E.length;_++){let T=E[_];T.setSize&&T.setSize(w,A)}},this.setEffects=function(w){E=w,M=E.length>0&&E[0].isRenderPass===!0;let A=o.width,_=o.height;E.length>0&&a===null&&(a=new mn(A,_,{type:kn,depthBuffer:!1,stencilBuffer:!1}),c=new mn(A,_,{type:kn,depthBuffer:!1,stencilBuffer:!1}));let T=s===!0&&E.some(O=>O.needsDepthTexture===!0);T!==(o.depthTexture!==null)&&(T===!0&&l===null&&(l=new hi(A,_),r===!0&&(l.format=fi,l.type=Ki)),o.dispose(),o.depthTexture=T?l:null,o.resolveDepthBuffer=T,o.storeMultisampledDepthBuffer=T);for(let O=0;O<E.length;O++){let I=E[O];I.setSize&&I.setSize(A,_),T&&I.needsDepthTexture===!0&&I.setDepthTexture&&I.setDepthTexture(l)}},this.begin=function(w,A){if(f||w.toneMapping===Zn&&E.length===0)return!1;if(v=A,A!==null){let _=A.width,T=A.height;(o.width!==_||o.height!==T)&&this.setSize(_,T)}return M===!1&&w.setRenderTarget(o),m=w.toneMapping,w.toneMapping=Zn,!0},this.hasRenderPass=function(){return M},this.end=function(w,A){w.toneMapping=m,f=!0;let _=o,T=a;for(let O=0;O<E.length;O++){let I=E[O];I.enabled!==!1&&(I.render(w,T,_,A),I.needsSwap!==!1&&(_=T,T=T===a?c:a))}if(x!==w.outputColorSpace||y!==w.toneMapping){x=w.outputColorSpace,y=w.toneMapping,d.defines={},et.getTransfer(x)===at&&(d.defines.SRGB_TRANSFER="");let O=n_[y];O&&(d.defines[O]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=_.texture,w.setRenderTarget(v),w.render(p,g),v=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),c!==null&&c.dispose(),h.dispose(),d.dispose()}}var Zf=new sn,Jf=new hi(1,1),$f=new Ar(1),jf=new _r,Kf=new ra,Qf=new wr,Af=[],Cf=[],Rf=new Float32Array(16),Pf=new Float32Array(9),If=new Float32Array(4);function Xs(n,e,t){let i=n[0];if(i<=0||i>0)return n;let s=e*t,r=Af[s];if(r===void 0&&(r=new Float32Array(s),Af[s]=r),e!==0){i.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(r,a)}return r}function Ut(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Ot(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function gc(n,e){let t=Cf[e];t===void 0&&(t=new Int32Array(e),Cf[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function s_(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function r_(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;n.uniform2fv(this.addr,e),Ot(t,e)}}function o_(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ut(t,e))return;n.uniform3fv(this.addr,e),Ot(t,e)}}function a_(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;n.uniform4fv(this.addr,e),Ot(t,e)}}function c_(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Ut(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Ot(t,e)}else{if(Ut(t,i))return;If.set(i),n.uniformMatrix2fv(this.addr,!1,If),Ot(t,i)}}function l_(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Ut(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Ot(t,e)}else{if(Ut(t,i))return;Pf.set(i),n.uniformMatrix3fv(this.addr,!1,Pf),Ot(t,i)}}function h_(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Ut(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Ot(t,e)}else{if(Ut(t,i))return;Rf.set(i),n.uniformMatrix4fv(this.addr,!1,Rf),Ot(t,i)}}function u_(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function d_(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;n.uniform2iv(this.addr,e),Ot(t,e)}}function f_(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ut(t,e))return;n.uniform3iv(this.addr,e),Ot(t,e)}}function p_(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;n.uniform4iv(this.addr,e),Ot(t,e)}}function m_(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function g_(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;n.uniform2uiv(this.addr,e),Ot(t,e)}}function x_(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ut(t,e))return;n.uniform3uiv(this.addr,e),Ot(t,e)}}function __(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;n.uniform4uiv(this.addr,e),Ot(t,e)}}function xc(n){return n.version===0&&(n.compareFunction=th,n.needsUpdate=!0),n}function y_(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?r=xc(Jf):r=Zf,t.setTexture2D(e||r,s)}function v_(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||Kf,s)}function S_(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_CUBE_SHADOW?r=xc($f):r=Qf,t.setTextureCube(e||r,s)}function b_(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||jf,s)}function M_(n){switch(n){case 5126:return s_;case 35664:return r_;case 35665:return o_;case 35666:return a_;case 35674:return c_;case 35675:return l_;case 35676:return h_;case 5124:case 35670:return u_;case 35667:case 35671:return d_;case 35668:case 35672:return f_;case 35669:case 35673:return p_;case 5125:return m_;case 36294:return g_;case 36295:return x_;case 36296:return __;case 35678:case 36198:case 36298:case 36306:case 35682:return y_;case 35679:case 36299:case 36307:return v_;case 35680:case 36300:case 36308:case 36293:return S_;case 36289:case 36303:case 36311:case 36292:return b_}}function T_(n,e){n.uniform1fv(this.addr,e)}function E_(n,e){let t=Xs(e,this.size,2);n.uniform2fv(this.addr,t)}function w_(n,e){let t=Xs(e,this.size,3);n.uniform3fv(this.addr,t)}function A_(n,e){let t=Xs(e,this.size,4);n.uniform4fv(this.addr,t)}function C_(n,e){let t=Xs(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function R_(n,e){let t=Xs(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function P_(n,e){let t=Xs(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function I_(n,e){n.uniform1iv(this.addr,e)}function L_(n,e){n.uniform2iv(this.addr,e)}function D_(n,e){n.uniform3iv(this.addr,e)}function N_(n,e){n.uniform4iv(this.addr,e)}function U_(n,e){n.uniform1uiv(this.addr,e)}function O_(n,e){n.uniform2uiv(this.addr,e)}function k_(n,e){n.uniform3uiv(this.addr,e)}function F_(n,e){n.uniform4uiv(this.addr,e)}function B_(n,e,t){let i=this.cache,s=e.length,r=gc(t,s);Ut(i,r)||(n.uniform1iv(this.addr,r),Ot(i,r));let o;this.type===n.SAMPLER_2D_SHADOW?o=xc(Jf):o=Zf;for(let a=0;a!==s;++a)t.setTexture2D(e[a]||o,r[a])}function z_(n,e,t){let i=this.cache,s=e.length,r=gc(t,s);Ut(i,r)||(n.uniform1iv(this.addr,r),Ot(i,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Kf,r[o])}function G_(n,e,t){let i=this.cache,s=e.length,r=gc(t,s);Ut(i,r)||(n.uniform1iv(this.addr,r),Ot(i,r));let o;this.type===n.SAMPLER_CUBE_SHADOW?o=xc($f):o=Qf;for(let a=0;a!==s;++a)t.setTextureCube(e[a]||o,r[a])}function H_(n,e,t){let i=this.cache,s=e.length,r=gc(t,s);Ut(i,r)||(n.uniform1iv(this.addr,r),Ot(i,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||jf,r[o])}function V_(n){switch(n){case 5126:return T_;case 35664:return E_;case 35665:return w_;case 35666:return A_;case 35674:return C_;case 35675:return R_;case 35676:return P_;case 5124:case 35670:return I_;case 35667:case 35671:return L_;case 35668:case 35672:return D_;case 35669:case 35673:return N_;case 5125:return U_;case 36294:return O_;case 36295:return k_;case 36296:return F_;case 35678:case 36198:case 36298:case 36306:case 35682:return B_;case 35679:case 36299:case 36307:return z_;case 35680:case 36300:case 36308:case 36293:return G_;case 36289:case 36303:case 36311:case 36292:return H_}}var mh=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=M_(t.type)}},gh=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=V_(t.type)}},xh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(e,t[a.id],i)}}},fh=/(\w+)(\])?(\[|\.)?/g;function Lf(n,e){n.seq.push(e),n.map[e.id]=e}function W_(n,e,t){let i=n.name,s=i.length;for(fh.lastIndex=0;;){let r=fh.exec(i),o=fh.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Lf(t,l===void 0?new mh(a,n,e):new gh(a,n,e));break}else{let d=t.map[a];d===void 0&&(d=new xh(a),Lf(t,d)),t=d}}}var Ws=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){let a=e.getActiveUniform(t,o),c=e.getUniformLocation(t,a.name);W_(a,c,this)}let s=[],r=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){let r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){let s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,o=t.length;r!==o;++r){let a=t[r],c=i[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){let i=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&i.push(o)}return i}};function Df(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var X_=37297,q_=0;function Y_(n,e){let t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}var Nf=new Ge;function Z_(n){et._getMatrix(Nf,et.workingColorSpace,n);let e=`mat3( ${Nf.elements.map(t=>t.toFixed(4))} )`;switch(et.getTransfer(n)){case pr:return[e,"LinearTransferOETF"];case at:return[e,"sRGBTransferOETF"];default:return ke("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Uf(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+Y_(n.getShaderSource(e),a)}else return r}function J_(n,e){let t=Z_(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var $_={[Fl]:"Linear",[Bl]:"Reinhard",[zl]:"Cineon",[Gl]:"ACESFilmic",[Vl]:"AgX",[Wl]:"Neutral",[Hl]:"Custom"};function j_(n,e){let t=$_[e];return t===void 0?(ke("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var fc=new V;function K_(){et.getLuminanceCoefficients(fc);let n=fc.x.toFixed(4),e=fc.y.toFixed(4),t=fc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Q_(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(qr).join(`
`)}function ey(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function ty(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(e,s),o=r.name,a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function qr(n){return n!==""}function Of(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function kf(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var ny=/^[ \t]*#include +<([\w\d./]+)>/gm;function _h(n){return n.replace(ny,iy)}function iy(n,e){let t=$e[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return _h(t)}var sy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ff(n){return n.replace(sy,ry)}function ry(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Bf(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}var oy={[Zi]:"SHADOWMAP_TYPE_PCF",[zs]:"SHADOWMAP_TYPE_VSM"};function ay(n){return oy[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var cy={[Hs]:"ENVMAP_MODE_REFRACTION"};function ly(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":cy[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var hy={[Ta]:"ENVMAP_BLENDING_MULTIPLY",[Qd]:"ENVMAP_BLENDING_MIX",[ef]:"ENVMAP_BLENDING_ADD"};function uy(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":hy[n.combine]||"ENVMAP_BLENDING_NONE"}function dy(n,e,t,i){let s=n.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,c=ay(t),l=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=ly(t),d=uy(t),p=Q_(t),g=ey(r),x=s.createProgram(),y,f,m=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(y=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(qr).join(`
`),y.length>0&&(y+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(qr).join(`
`),f.length>0&&(f+=`
`)):(y=[Bf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(qr).join(`
`),f=[Bf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Zn?"#define TONE_MAPPING":"",t.toneMapping!==Zn?$e.tonemapping_pars_fragment:"",t.toneMapping!==Zn?j_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",$e.colorspace_pars_fragment,J_("linearToOutputTexel",t.outputColorSpace),K_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(qr).join(`
`)),o=_h(o),o=Of(o,t),o=kf(o,t),a=_h(a),a=Of(a,t),a=kf(a,t),o=Ff(o),a=Ff(a),t.isRawShaderMaterial!==!0&&(m=`#version 300 es
`,y=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,f=["#define varying in",t.glslVersion===ih?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ih?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let v=m+y+o,E=m+f+a,M=Df(s,s.VERTEX_SHADER,v),w=Df(s,s.FRAGMENT_SHADER,E);s.attachShader(x,M),s.attachShader(x,w),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function A(I){if(n.debug.checkShaderErrors){let B=s.getProgramInfoLog(x)||"",H=s.getShaderInfoLog(M)||"",Z=s.getShaderInfoLog(w)||"",N=B.trim(),$=H.trim(),R=Z.trim(),P=!0,U=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(P=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,x,M,w);else{let F=Uf(s,M,"vertex"),G=Uf(s,w,"fragment");Fe("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+N+`
`+F+`
`+G)}else N!==""?ke("WebGLProgram: Program Info Log:",N):($===""||R==="")&&(U=!1);U&&(I.diagnostics={runnable:P,programLog:N,vertexShader:{log:$,prefix:y},fragmentShader:{log:R,prefix:f}})}s.deleteShader(M),s.deleteShader(w),_=new Ws(s,x),T=ty(s,x)}let _;this.getUniforms=function(){return _===void 0&&A(this),_};let T;this.getAttributes=function(){return T===void 0&&A(this),T};let O=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return O===!1&&(O=s.getProgramParameter(x,X_)),O},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=q_++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=M,this.fragmentShader=w,this}var fy=0,yh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new vh(e),t.set(e,i)),i}},vh=class{constructor(e){this.id=fy++,this.code=e,this.usedTimes=0}};function py(n){return n===Ui||n===Vr||n===Wr}function my(n,e,t,i,s,r){let o=new yr,a=new yh,c=new Set,l=[],h=new Map,d=i.logarithmicDepthBuffer,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(_){return c.add(_),_===0?"uv":`uv${_}`}function x(_,T,O,I,B,H){let Z=I.fog,N=B.geometry,$=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?I.environment:null,R=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,P=e.get(_.envMap||$,R),U=p[_.type],F=i.precision;_.precision!==null&&(F=i.getMaxPrecision(_.precision),F!==_.precision&&ke("WebGLProgram.getParameters:",_.precision,"not supported, using",F,"instead."));let G=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,te=G!==void 0?G.length:0,ce=0;N.morphAttributes.position!==void 0&&(ce=1),N.morphAttributes.normal!==void 0&&(ce=2),N.morphAttributes.color!==void 0&&(ce=3);let Ae,j,le,ve;if(U){let Se=$n[U];Ae=Se.vertexShader,j=Se.fragmentShader}else{Ae=_.vertexShader,j=_.fragmentShader;let Se=a.getVertexShaderStage(_),lt=a.getFragmentShaderStage(_);a.update(_,Se,lt),le=Se.id,ve=lt.id}let Ee=n.getRenderTarget(),ue=n.state.buffers.depth.getReversed(),ze=B.isInstancedMesh===!0,ot=B.isBatchedMesh===!0,Oe=!!_.map,ct=!!_.matcap,ut=!!P,je=ut&&P.isPMREMTexture===!0,Wt=!!_.aoMap,Dt=!!_.lightMap,cn=!!_.bumpMap&&_.wireframe===!1,St=!!_.normalMap,Gn=!!_.displacementMap,kt=!!_.emissiveMap,_n=!!_.metalnessMap,yn=!!_.roughnessMap,vn=_.anisotropy>0,z=_.clearcoat>0,Sn=_.diffuseRoughness>0,xt=_.dispersion>0,_t=_.retroreflectivity>0,ye=_.iridescence>0,Nt=_.sheen>0,Ue=_.transmission>0,Ve=vn&&!!_.anisotropyMap,C=z&&!!_.clearcoatMap,S=z&&!!_.clearcoatNormalMap,q=z&&!!_.clearcoatRoughnessMap,oe=Sn&&!!_.diffuseRoughnessMap,se=ye&&!!_.iridescenceMap,de=ye&&!!_.iridescenceThicknessMap,xe=Nt&&!!_.sheenColorMap,ee=Nt&&!!_.sheenRoughnessMap,ne=!!_.specularMap,pe=!!_.specularColorMap,D=!!_.specularIntensityMap,ie=Ue&&!!_.transmissionMap,K=Ue&&!!_.thicknessMap,me=!!_.gradientMap,he=!!_.alphaMap,fe=_.alphaTest>0,De=!!_.alphaHash,Je=!!_.extensions,ae=Zn;_.toneMapped&&(Ee===null||Ee.isXRRenderTarget===!0)&&(ae=n.toneMapping);let Ne=je?P.isCompressedCubeTexture?P.image[0].mipmaps:P.mipmaps:null,Ze={shaderID:U,shaderType:_.type,shaderName:_.name,vertexShader:Ae,fragmentShader:j,defines:_.defines,customVertexShaderID:le,customFragmentShaderID:ve,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:F,batching:ot,batchingColor:ot&&B._colorsTexture!==null,instancing:ze,instancingColor:ze&&B.instanceColor!==null,instancingMorph:ze&&B.morphTexture!==null,outputColorSpace:Ee===null?n.outputColorSpace:Ee.isXRRenderTarget===!0?Ee.texture.colorSpace:et.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:Oe,matcap:ct,envMap:ut,envMapMode:ut&&P.mapping,envMapPMREM:je,envMapMaxLod:je?Ne.length-1:null,envMapSize:je?Ne[0].width:null,aoMap:Wt,lightMap:Dt,bumpMap:cn,normalMap:St,displacementMap:Gn,emissiveMap:kt,normalMapObjectSpace:St&&_.normalMapType===sf,normalMapTangentSpace:St&&_.normalMapType===hc,packedNormalMap:St&&_.normalMapType===hc&&py(_.normalMap.format),metalnessMap:_n,roughnessMap:yn,anisotropy:vn,anisotropyMap:Ve,clearcoat:z,clearcoatMap:C,clearcoatNormalMap:S,clearcoatRoughnessMap:q,diffuseRoughness:Sn,diffuseRoughnessMap:oe,dispersion:xt,retroreflection:_t,iridescence:ye,iridescenceMap:se,iridescenceThicknessMap:de,sheen:Nt,sheenColorMap:xe,sheenRoughnessMap:ee,specularMap:ne,specularColorMap:pe,specularIntensityMap:D,transmission:Ue,transmissionMap:ie,thicknessMap:K,gradientMap:me,opaque:_.transparent===!1&&_.blending===Gs&&_.alphaToCoverage===!1,alphaMap:he,alphaTest:fe,alphaHash:De,combine:_.combine,mapUv:Oe&&g(_.map.channel),aoMapUv:Wt&&g(_.aoMap.channel),lightMapUv:Dt&&g(_.lightMap.channel),bumpMapUv:cn&&g(_.bumpMap.channel),normalMapUv:St&&g(_.normalMap.channel),displacementMapUv:Gn&&g(_.displacementMap.channel),emissiveMapUv:kt&&g(_.emissiveMap.channel),metalnessMapUv:_n&&g(_.metalnessMap.channel),roughnessMapUv:yn&&g(_.roughnessMap.channel),anisotropyMapUv:Ve&&g(_.anisotropyMap.channel),clearcoatMapUv:C&&g(_.clearcoatMap.channel),clearcoatNormalMapUv:S&&g(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:q&&g(_.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:oe&&g(_.diffuseRoughnessMap.channel),iridescenceMapUv:se&&g(_.iridescenceMap.channel),iridescenceThicknessMapUv:de&&g(_.iridescenceThicknessMap.channel),sheenColorMapUv:xe&&g(_.sheenColorMap.channel),sheenRoughnessMapUv:ee&&g(_.sheenRoughnessMap.channel),specularMapUv:ne&&g(_.specularMap.channel),specularColorMapUv:pe&&g(_.specularColorMap.channel),specularIntensityMapUv:D&&g(_.specularIntensityMap.channel),transmissionMapUv:ie&&g(_.transmissionMap.channel),thicknessMapUv:K&&g(_.thicknessMap.channel),alphaMapUv:he&&g(_.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(St||vn),vertexNormals:!!N.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!N.attributes.uv&&(Oe||he),fog:!!Z,useFog:_.fog===!0,fogExp2:!!Z&&Z.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||N.attributes.normal===void 0&&St===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ue,skinning:B.isSkinnedMesh===!0,hasPositionAttribute:N.attributes.position!==void 0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:te,morphTextureStride:ce,numSunLights:T.sun.length,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numSunLightShadows:T.sunShadowMap.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:H.filter(Se=>Se.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:n.shadowMap.enabled&&O.length>0,shadowMapType:n.shadowMap.type,toneMapping:ae,decodeVideoTexture:Oe&&_.map.isVideoTexture===!0&&et.getTransfer(_.map.colorSpace)===at,decodeVideoTextureEmissive:kt&&_.emissiveMap.isVideoTexture===!0&&et.getTransfer(_.emissiveMap.colorSpace)===at,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===En,flipSided:_.side===on,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:Je&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Je&&_.extensions.multiDraw===!0||ot)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Ze.vertexUv1s=c.has(1),Ze.vertexUv2s=c.has(2),Ze.vertexUv3s=c.has(3),c.clear(),Ze}function y(_){let T=[];if(_.shaderID?T.push(_.shaderID):(T.push(_.customVertexShaderID),T.push(_.customFragmentShaderID)),_.defines!==void 0)for(let O in _.defines)T.push(O),T.push(_.defines[O]);return _.isRawShaderMaterial===!1&&(f(T,_),m(T,_),T.push(n.outputColorSpace)),T.push(_.customProgramCacheKey),T.join()}function f(_,T){_.push(T.precision),_.push(T.outputColorSpace),_.push(T.envMapMode),_.push(T.envMapPMREM),_.push(T.envMapMaxLod),_.push(T.envMapSize),_.push(T.mapUv),_.push(T.alphaMapUv),_.push(T.lightMapUv),_.push(T.aoMapUv),_.push(T.bumpMapUv),_.push(T.normalMapUv),_.push(T.displacementMapUv),_.push(T.emissiveMapUv),_.push(T.metalnessMapUv),_.push(T.roughnessMapUv),_.push(T.anisotropyMapUv),_.push(T.clearcoatMapUv),_.push(T.clearcoatNormalMapUv),_.push(T.clearcoatRoughnessMapUv),_.push(T.diffuseRoughnessMapUv),_.push(T.iridescenceMapUv),_.push(T.iridescenceThicknessMapUv),_.push(T.sheenColorMapUv),_.push(T.sheenRoughnessMapUv),_.push(T.specularMapUv),_.push(T.specularColorMapUv),_.push(T.specularIntensityMapUv),_.push(T.transmissionMapUv),_.push(T.thicknessMapUv),_.push(T.combine),_.push(T.fogExp2),_.push(T.sizeAttenuation),_.push(T.morphTargetsCount),_.push(T.numSunLights),_.push(T.numDirLights),_.push(T.numPointLights),_.push(T.numSpotLights),_.push(T.numSpotLightMaps),_.push(T.numHemiLights),_.push(T.numRectAreaLights),_.push(T.numSunLightShadows),_.push(T.numDirLightShadows),_.push(T.numPointLightShadows),_.push(T.numSpotLightShadows),_.push(T.numSpotLightShadowsWithMaps),_.push(T.numLightProbes),_.push(T.numLightProbeGrids),_.push(T.shadowMapType),_.push(T.toneMapping),_.push(T.numClippingPlanes),_.push(T.numClipIntersection),_.push(T.depthPacking)}function m(_,T){o.disableAll(),T.instancing&&o.enable(0),T.instancingColor&&o.enable(1),T.instancingMorph&&o.enable(2),T.matcap&&o.enable(3),T.envMap&&o.enable(4),T.normalMapObjectSpace&&o.enable(5),T.normalMapTangentSpace&&o.enable(6),T.clearcoat&&o.enable(7),T.iridescence&&o.enable(8),T.alphaTest&&o.enable(9),T.vertexColors&&o.enable(10),T.vertexAlphas&&o.enable(11),T.vertexUv1s&&o.enable(12),T.vertexUv2s&&o.enable(13),T.vertexUv3s&&o.enable(14),T.vertexTangents&&o.enable(15),T.anisotropy&&o.enable(16),T.alphaHash&&o.enable(17),T.batching&&o.enable(18),T.dispersion&&o.enable(19),T.retroreflection&&o.enable(24),T.diffuseRoughness&&o.enable(25),T.batchingColor&&o.enable(20),T.gradientMap&&o.enable(21),T.packedNormalMap&&o.enable(22),T.vertexNormals&&o.enable(23),_.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.reversedDepthBuffer&&o.enable(4),T.skinning&&o.enable(5),T.morphTargets&&o.enable(6),T.morphNormals&&o.enable(7),T.morphColors&&o.enable(8),T.premultipliedAlpha&&o.enable(9),T.shadowMapEnabled&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.transmission&&o.enable(15),T.sheen&&o.enable(16),T.opaque&&o.enable(17),T.pointsUvs&&o.enable(18),T.decodeVideoTexture&&o.enable(19),T.decodeVideoTextureEmissive&&o.enable(20),T.alphaToCoverage&&o.enable(21),T.numLightProbeGrids>0&&o.enable(22),T.hasPositionAttribute&&o.enable(23),_.push(o.mask)}function v(_){let T=p[_.type],O;if(T){let I=$n[T];O=vf.clone(I.uniforms)}else O=_.uniforms;return O}function E(_,T){let O=h.get(T);return O!==void 0?++O.usedTimes:(O=new dy(n,T,_,s),l.push(O),h.set(T,O)),O}function M(_){if(--_.usedTimes===0){let T=l.indexOf(_);l[T]=l[l.length-1],l.pop(),h.delete(_.cacheKey),_.destroy()}}function w(_){a.remove(_)}function A(){a.dispose()}return{getParameters:x,getProgramCacheKey:y,getUniforms:v,acquireProgram:E,releaseProgram:M,releaseShaderCache:w,programs:l,dispose:A}}function gy(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,c){n.get(o)[a]=c}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function xy(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function zf(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Gf(){let n=[],e=0,t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function o(p){let g=0;return p.isInstancedMesh&&(g+=2),p.isSkinnedMesh&&(g+=1),g}function a(p,g,x,y,f,m){let v=n[e];return v===void 0?(v={id:p.id,object:p,geometry:g,material:x,materialVariant:o(p),groupOrder:y,renderOrder:p.renderOrder,z:f,group:m},n[e]=v):(v.id=p.id,v.object=p,v.geometry=g,v.material=x,v.materialVariant=o(p),v.groupOrder=y,v.renderOrder=p.renderOrder,v.z=f,v.group=m),e++,v}function c(p,g,x,y,f,m,v){v.reversedDepth===!0&&(f=-f);let E=a(p,g,x,y,f,m);x.transmission>0?i.push(E):x.transparent===!0?s.push(E):t.push(E)}function l(p,g,x,y,f,m){let v=a(p,g,x,y,f,m);x.transmission>0?i.unshift(v):x.transparent===!0?s.unshift(v):t.unshift(v)}function h(p,g){t.length>1&&t.sort(p||xy),i.length>1&&i.sort(g||zf),s.length>1&&s.sort(g||zf)}function d(){for(let p=e,g=n.length;p<g;p++){let x=n[p];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:c,unshift:l,finish:d,sort:h}}function _y(){let n=new WeakMap;function e(i,s){let r=n.get(i),o;return r===void 0?(o=new Gf,n.set(i,[o])):s>=r.length?(o=new Gf,r.push(o)):o=r[s],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function yy(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new V,color:new Xe};break;case"SpotLight":t={position:new V,direction:new V,color:new Xe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new V,color:new Xe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new V,skyColor:new Xe,groundColor:new Xe};break;case"RectAreaLight":t={color:new Xe,position:new V,halfWidth:new V,halfHeight:new V};break}return n[e.id]=t,t}}}function vy(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Be};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Be};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Be,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var Sy=0;function by(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function My(n){let e=new yy,t=vy(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new V);let s=new V,r=new mt,o=new mt;function a(l){let h=0,d=0,p=0;for(let H=0;H<9;H++)i.probe[H].set(0,0,0);let g=0,x=0,y=0,f=0,m=0,v=0,E=0,M=0,w=0,A=0,_=0,T=0,O=0,I=0;l.sort(by);for(let H=0,Z=l.length;H<Z;H++){let N=l[H],$=N.color,R=N.intensity,P=N.distance,U=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===Ui?U=N.shadow.map.texture:U=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)h+=$.r*R,d+=$.g*R,p+=$.b*R;else if(N.isLightProbe){for(let F=0;F<9;F++)i.probe[F].addScaledVector(N.sh.coefficients[F],R);I++}else if(N.isSunLight){let F=e.get(N);if(F.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let G=N.shadow,te=t.get(N);te.shadowIntensity=G.intensity,te.shadowBias=G.bias,te.shadowNormalBias=G.normalBias,te.shadowRadius=G.radius,te.shadowMapSize.copy(G.mapSize).multiply(G.getFrameExtents()),i.sunShadow[x]=te,i.sunShadowMap[x]=U;let ce=G.getViewportCount();for(let Ae=0;Ae<ce;Ae++)i.sunShadowMatrix[y+Ae]=G.getMatrix(Ae),i.sunShadowCascade[y+Ae]=G._cascadeData[Ae];y+=ce,x++}i.sun[g]=F,g++}else if(N.isDirectionalLight){let F=e.get(N);if(F.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let G=N.shadow,te=t.get(N);te.shadowIntensity=G.intensity,te.shadowBias=G.bias,te.shadowNormalBias=G.normalBias,te.shadowRadius=G.radius,te.shadowMapSize=G.mapSize,i.directionalShadow[f]=te,i.directionalShadowMap[f]=U,i.directionalShadowMatrix[f]=N.shadow.matrix,w++}i.directional[f]=F,f++}else if(N.isSpotLight){let F=e.get(N);F.position.setFromMatrixPosition(N.matrixWorld),F.color.copy($).multiplyScalar(R),F.distance=P,F.coneCos=Math.cos(N.angle),F.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),F.decay=N.decay,i.spot[v]=F;let G=N.shadow;if(N.map&&(i.spotLightMap[T]=N.map,T++,G.updateMatrices(N),N.castShadow&&O++),i.spotLightMatrix[v]=G.matrix,N.castShadow){let te=t.get(N);te.shadowIntensity=G.intensity,te.shadowBias=G.bias,te.shadowNormalBias=G.normalBias,te.shadowRadius=G.radius,te.shadowMapSize=G.mapSize,i.spotShadow[v]=te,i.spotShadowMap[v]=U,_++}v++}else if(N.isRectAreaLight){let F=e.get(N);F.color.copy($).multiplyScalar(R),F.halfWidth.set(N.width*.5,0,0),F.halfHeight.set(0,N.height*.5,0),i.rectArea[E]=F,E++}else if(N.isPointLight){let F=e.get(N);if(F.color.copy(N.color).multiplyScalar(N.intensity),F.distance=N.distance,F.decay=N.decay,N.castShadow){let G=N.shadow,te=t.get(N);te.shadowIntensity=G.intensity,te.shadowBias=G.bias,te.shadowNormalBias=G.normalBias,te.shadowRadius=G.radius,te.shadowMapSize=G.mapSize,te.shadowCameraNear=G.camera.near,te.shadowCameraFar=G.camera.far,i.pointShadow[m]=te,i.pointShadowMap[m]=U,i.pointShadowMatrix[m]=N.shadow.matrix,A++}i.point[m]=F,m++}else if(N.isHemisphereLight){let F=e.get(N);F.skyColor.copy(N.color).multiplyScalar(R),F.groundColor.copy(N.groundColor).multiplyScalar(R),i.hemi[M]=F,M++}}E>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=be.LTC_FLOAT_1,i.rectAreaLTC2=be.LTC_FLOAT_2):(i.rectAreaLTC1=be.LTC_HALF_1,i.rectAreaLTC2=be.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=p;let B=i.hash;(B.sunLength!==g||B.directionalLength!==f||B.pointLength!==m||B.spotLength!==v||B.rectAreaLength!==E||B.hemiLength!==M||B.numSunShadows!==x||B.numDirectionalShadows!==w||B.numPointShadows!==A||B.numSpotShadows!==_||B.numSpotMaps!==T||B.numLightProbes!==I)&&(i.sun.length=g,i.directional.length=f,i.spot.length=v,i.rectArea.length=E,i.point.length=m,i.hemi.length=M,i.sunShadow.length=x,i.sunShadowMap.length=x,i.sunShadowMatrix.length=y,i.sunShadowCascade.length=y,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.directionalShadowMatrix.length=w,i.pointShadow.length=A,i.pointShadowMap.length=A,i.pointShadowMatrix.length=A,i.spotShadow.length=_,i.spotShadowMap.length=_,i.spotLightMatrix.length=_+T-O,i.spotLightMap.length=T,i.numSpotLightShadowsWithMaps=O,i.numLightProbes=I,B.sunLength=g,B.directionalLength=f,B.pointLength=m,B.spotLength=v,B.rectAreaLength=E,B.hemiLength=M,B.numSunShadows=x,B.numDirectionalShadows=w,B.numPointShadows=A,B.numSpotShadows=_,B.numSpotMaps=T,B.numLightProbes=I,i.version=Sy++)}function c(l,h){let d=0,p=0,g=0,x=0,y=0,f=0,m=h.matrixWorldInverse;for(let v=0,E=l.length;v<E;v++){let M=l[v];if(M.isSunLight){let w=i.sun[d];w.direction.setFromMatrixPosition(M.matrixWorld),w.direction.transformDirection(m),d++}else if(M.isDirectionalLight){let w=i.directional[p];w.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(m),p++}else if(M.isSpotLight){let w=i.spot[x];w.position.setFromMatrixPosition(M.matrixWorld),w.position.applyMatrix4(m),w.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(m),x++}else if(M.isRectAreaLight){let w=i.rectArea[y];w.position.setFromMatrixPosition(M.matrixWorld),w.position.applyMatrix4(m),o.identity(),r.copy(M.matrixWorld),r.premultiply(m),o.extractRotation(r),w.halfWidth.set(M.width*.5,0,0),w.halfHeight.set(0,M.height*.5,0),w.halfWidth.applyMatrix4(o),w.halfHeight.applyMatrix4(o),y++}else if(M.isPointLight){let w=i.point[g];w.position.setFromMatrixPosition(M.matrixWorld),w.position.applyMatrix4(m),g++}else if(M.isHemisphereLight){let w=i.hemi[f];w.direction.setFromMatrixPosition(M.matrixWorld),w.direction.transformDirection(m),f++}}}return{setup:a,setupView:c,state:i}}function Hf(n){let e=new My(n),t=[],i=[],s=[];function r(d){h.camera=d,t.length=0,i.length=0,s.length=0}function o(d){d.isLightProbeGrid?s.push(d):t.push(d)}function a(d){i.push(d)}function c(){e.setup(t),s.sort((d,p)=>d.priority-p.priority||d.id-p.id)}function l(d){e.setupView(t,d)}let h={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function Ty(n){let e=new WeakMap;function t(s,r=0){let o=e.get(s),a;return o===void 0?(a=new Hf(n),e.set(s,[a])):r>=o.length?(a=new Hf(n),o.push(a)):a=o[r],a}function i(){e=new WeakMap}return{get:t,dispose:i}}var Ey=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,wy=`uniform sampler2D shadow_pass;
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
}`,Ay=[new V(1,0,0),new V(-1,0,0),new V(0,1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1)],Cy=[new V(0,-1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1),new V(0,-1,0),new V(0,-1,0)],Vf=new mt,Xr=new V,ph=new V;function Ry(n,e,t){let i=new Ai,s=new Be,r=new Be,o=new yt,a=new ha,c=new ua,l={},h=t.maxTextureSize,d={[Di]:on,[on]:Di,[En]:En},p=new Yn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Be},radius:{value:4}},vertexShader:Ey,fragmentShader:wy}),g=p.clone();g.defines.HORIZONTAL_PASS=1;let x=new At;x.setAttribute("position",new Gt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new nt(x,p),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Zi;let m=this.type;this.render=function(A,_,T){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||A.length===0)return;this.type===Nd&&(ke("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Zi);let O=n.getRenderTarget(),I=n.getActiveCubeFace(),B=n.getActiveMipmapLevel(),H=n.state;H.setBlending(Ji),H.buffers.depth.getReversed()===!0?H.buffers.color.setClear(0,0,0,0):H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);let Z=m!==this.type;Z&&_.traverse(function(N){N.material&&(Array.isArray(N.material)?N.material.forEach($=>$.needsUpdate=!0):N.material.needsUpdate=!0)});for(let N=0,$=A.length;N<$;N++){let R=A[N],P=R.shadow;if(P===void 0){ke("WebGLShadowMap:",R,"has no shadow.");continue}if(P.autoUpdate===!1&&P.needsUpdate===!1)continue;s.copy(P.mapSize);let U=P.getFrameExtents();s.multiply(U),r.copy(P.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/U.x),s.x=r.x*U.x,P.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/U.y),s.y=r.y*U.y,P.mapSize.y=r.y));let F=n.state.buffers.depth.getReversed();if(P.camera._reversedDepth=F,P.map===null||Z===!0){if(P.map!==null&&(P.map.depthTexture!==null&&(P.map.depthTexture.dispose(),P.map.depthTexture=null),P.map.dispose()),this.type===zs){if(R.isPointLight){ke("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}P.map=new mn(s.x,s.y,{format:Ui,type:kn,minFilter:nn,magFilter:nn,generateMipmaps:!1}),P.map.texture.name=R.name+".shadowMap",P.map.depthTexture=new hi(s.x,s.y,On),P.map.depthTexture.name=R.name+".shadowMapDepth",P.map.depthTexture.format=ai,P.map.depthTexture.compareFunction=null,P.map.depthTexture.minFilter=Ht,P.map.depthTexture.magFilter=Ht}else R.isPointLight?(P.map=new Yr(s.x),P.map.depthTexture=new Ar(s.x,Un)):(P.map=new mn(s.x,s.y),P.map.depthTexture=new hi(s.x,s.y,Un)),P.map.depthTexture.name=R.name+".shadowMap",P.map.depthTexture.format=ai,this.type===Zi?(P.map.depthTexture.compareFunction=F?eh:Ql,P.map.depthTexture.minFilter=nn,P.map.depthTexture.magFilter=nn):(P.map.depthTexture.compareFunction=null,P.map.depthTexture.minFilter=Ht,P.map.depthTexture.magFilter=Ht);P.camera.updateProjectionMatrix()}P.map.isWebGLCubeRenderTarget!==!0&&(P.map.width!==s.x||P.map.height!==s.y)&&P.map.setSize(s.x,s.y);let G=P.map.isWebGLCubeRenderTarget?6:P.getViewportCount();R.isPointLight!==!0&&P.updateMatrices(R,T);let te=(P.camera.layers.mask&4294967294)!==0?P.camera.layers:T.layers;for(let ce=0;ce<G;ce++){let Ae=P.getCamera(ce);if(R.isPointLight){let j=P.camera,le=P.matrix,ve=R.distance||j.far;ve!==j.far&&(j.far=ve,j.updateProjectionMatrix()),Xr.setFromMatrixPosition(R.matrixWorld),j.position.copy(Xr),ph.copy(j.position),ph.add(Ay[ce]),j.up.copy(Cy[ce]),j.lookAt(ph),j.updateMatrixWorld(),le.makeTranslation(-Xr.x,-Xr.y,-Xr.z),Vf.multiplyMatrices(j.projectionMatrix,j.matrixWorldInverse),P._frustum.setFromProjectionMatrix(Vf,j.coordinateSystem,j.reversedDepth)}if(P.map.isWebGLCubeRenderTarget)n.setRenderTarget(P.map,ce),n.clear();else{ce===0&&(n.setRenderTarget(P.map),n.clear());let j=P.getViewport(ce);o.set(r.x*j.x,r.y*j.y,r.x*j.z,r.y*j.w),H.viewport(o)}i=P.getFrustum(ce),M(_,T,Ae,R,te,this.type)}P.isPointLightShadow!==!0&&this.type===zs&&v(P,T),P.needsUpdate=!1}m=this.type,f.needsUpdate=!1,n.setRenderTarget(O,I,B)};function v(A,_){let T=e.update(y);p.defines.VSM_SAMPLES!==A.blurSamples&&(p.defines.VSM_SAMPLES=A.blurSamples,g.defines.VSM_SAMPLES=A.blurSamples,p.needsUpdate=!0,g.needsUpdate=!0),A.mapPass===null?A.mapPass=new mn(s.x,s.y,{format:Ui,type:kn}):(A.mapPass.width!==A.map.width||A.mapPass.height!==A.map.height)&&A.mapPass.setSize(A.map.width,A.map.height),p.uniforms.shadow_pass.value=A.map.depthTexture,p.uniforms.resolution.value.set(A.map.width,A.map.height),p.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(_,null,T,p,y,null),g.uniforms.shadow_pass.value=A.mapPass.texture,g.uniforms.resolution.value.set(A.map.width,A.map.height),g.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(_,null,T,g,y,null)}function E(A,_,T,O){let I=null,B=T.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(B!==void 0)I=B;else if(I=T.isPointLight===!0?c:a,n.localClippingEnabled&&_.clipShadows===!0&&Array.isArray(_.clippingPlanes)&&_.clippingPlanes.length!==0||_.displacementMap&&_.displacementScale!==0||_.alphaMap&&_.alphaTest>0||_.map&&_.alphaTest>0||_.alphaToCoverage===!0){let H=I.uuid,Z=_.uuid,N=l[H];N===void 0&&(N={},l[H]=N);let $=N[Z];$===void 0&&($=I.clone(),N[Z]=$,_.addEventListener("dispose",w)),I=$}if(I.visible=_.visible,I.wireframe=_.wireframe,O===zs?I.side=_.shadowSide!==null?_.shadowSide:_.side:I.side=_.shadowSide!==null?_.shadowSide:d[_.side],I.alphaMap=_.alphaMap,I.alphaTest=_.alphaToCoverage===!0?.5:_.alphaTest,I.map=_.map,I.clipShadows=_.clipShadows,I.clippingPlanes=_.clippingPlanes,I.clipIntersection=_.clipIntersection,I.displacementMap=_.displacementMap,I.displacementScale=_.displacementScale,I.displacementBias=_.displacementBias,I.wireframeLinewidth=_.wireframeLinewidth,I.linewidth=_.linewidth,T.isPointLight===!0&&I.isMeshDistanceMaterial===!0){let H=n.properties.get(I);H.light=T}return I}function M(A,_,T,O,I,B){if(A.visible===!1)return;if(A.layers.test(I)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&B===zs)&&(!A.frustumCulled||A.intersectsFrustum(i))){A.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,A.matrixWorld);let N=e.update(A),$=A.material;if(Array.isArray($)){let R=N.groups;for(let P=0,U=R.length;P<U;P++){let F=R[P],G=$[F.materialIndex];if(G&&G.visible){let te=E(A,G,O,B);A.onBeforeShadow(n,A,_,T,N,te,F),n.renderBufferDirect(T,null,N,te,A,F),A.onAfterShadow(n,A,_,T,N,te,F)}}}else if($.visible){let R=E(A,$,O,B);A.onBeforeShadow(n,A,_,T,N,R,null),n.renderBufferDirect(T,null,N,R,A,null),A.onAfterShadow(n,A,_,T,N,R,null)}}let Z=A.children;for(let N=0,$=Z.length;N<$;N++)M(Z[N],_,T,O,I,B)}function w(A){A.target.removeEventListener("dispose",w);for(let T in l){let O=l[T],I=A.target.uuid;I in O&&(O[I].dispose(),delete O[I])}}}function Py(n,e){function t(){let D=!1,ie=new yt,K=null,me=new yt(0,0,0,0);return{setMask:function(he){K!==he&&!D&&(n.colorMask(he,he,he,he),K=he)},setLocked:function(he){D=he},setClear:function(he,fe,De,Je,ae){ae===!0&&(he*=Je,fe*=Je,De*=Je),ie.set(he,fe,De,Je),me.equals(ie)===!1&&(n.clearColor(he,fe,De,Je),me.copy(ie))},reset:function(){D=!1,K=null,me.set(-1,0,0,0)}}}function i(){let D=!1,ie=!1,K=null,me=null,he=null;return{setReversed:function(fe){if(ie!==fe){let De=e.get("EXT_clip_control");fe?De.clipControlEXT(De.LOWER_LEFT_EXT,De.ZERO_TO_ONE_EXT):De.clipControlEXT(De.LOWER_LEFT_EXT,De.NEGATIVE_ONE_TO_ONE_EXT),ie=fe;let Je=he;he=null,this.setClear(Je)}},getReversed:function(){return ie},setTest:function(fe){fe?ue(n.DEPTH_TEST):ze(n.DEPTH_TEST)},setMask:function(fe){K!==fe&&!D&&(n.depthMask(fe),K=fe)},setFunc:function(fe){if(ie&&(fe=pf[fe]),me!==fe){switch(fe){case Zo:n.depthFunc(n.NEVER);break;case Jo:n.depthFunc(n.ALWAYS);break;case $o:n.depthFunc(n.LESS);break;case Cs:n.depthFunc(n.LEQUAL);break;case jo:n.depthFunc(n.EQUAL);break;case Ko:n.depthFunc(n.GEQUAL);break;case Qo:n.depthFunc(n.GREATER);break;case ea:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}me=fe}},setLocked:function(fe){D=fe},setClear:function(fe){he!==fe&&(he=fe,ie&&(fe=1-fe),n.clearDepth(fe))},reset:function(){D=!1,K=null,me=null,he=null,ie=!1}}}function s(){let D=!1,ie=null,K=null,me=null,he=null,fe=null,De=null,Je=null,ae=null;return{setTest:function(Ne){D||(Ne?ue(n.STENCIL_TEST):ze(n.STENCIL_TEST))},setMask:function(Ne){ie!==Ne&&!D&&(n.stencilMask(Ne),ie=Ne)},setFunc:function(Ne,Ze,Se){(K!==Ne||me!==Ze||he!==Se)&&(n.stencilFunc(Ne,Ze,Se),K=Ne,me=Ze,he=Se)},setOp:function(Ne,Ze,Se){(fe!==Ne||De!==Ze||Je!==Se)&&(n.stencilOp(Ne,Ze,Se),fe=Ne,De=Ze,Je=Se)},setLocked:function(Ne){D=Ne},setClear:function(Ne){ae!==Ne&&(n.clearStencil(Ne),ae=Ne)},reset:function(){D=!1,ie=null,K=null,me=null,he=null,fe=null,De=null,Je=null,ae=null}}}let r=new t,o=new i,a=new s,c={},l=new WeakMap,h={},d={},p={},g=new WeakMap,x=[],y=null,f=!1,m=null,v=null,E=null,M=null,w=null,A=null,_=null,T=new Xe(0,0,0),O=0,I=!1,B=null,H=null,Z=null,N=null,$=null,R=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),P=!1,U=0,F=n.getParameter(n.VERSION);F.indexOf("WebGL")!==-1?(U=parseFloat(/^WebGL (\d)/.exec(F)[1]),P=U>=1):F.indexOf("OpenGL ES")!==-1&&(U=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),P=U>=2);let G=null,te={},ce=n.getParameter(n.SCISSOR_BOX),Ae=n.getParameter(n.VIEWPORT),j=new yt().fromArray(ce),le=new yt().fromArray(Ae);function ve(D,ie,K,me){let he=new Uint8Array(4),fe=n.createTexture();n.bindTexture(D,fe),n.texParameteri(D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(D,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let De=0;De<K;De++)D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY?n.texImage3D(ie,0,n.RGBA,1,1,me,0,n.RGBA,n.UNSIGNED_BYTE,he):n.texImage2D(ie+De,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,he);return fe}let Ee={};Ee[n.TEXTURE_2D]=ve(n.TEXTURE_2D,n.TEXTURE_2D,1),Ee[n.TEXTURE_CUBE_MAP]=ve(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ee[n.TEXTURE_2D_ARRAY]=ve(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Ee[n.TEXTURE_3D]=ve(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ue(n.DEPTH_TEST),o.setFunc(Cs),cn(!1),St(Dl),ue(n.CULL_FACE),Wt(Ji);function ue(D){h[D]!==!0&&(n.enable(D),h[D]=!0)}function ze(D){h[D]!==!1&&(n.disable(D),h[D]=!1)}function ot(D,ie){return p[D]!==ie?(n.bindFramebuffer(D,ie),p[D]=ie,D===n.DRAW_FRAMEBUFFER&&(p[n.FRAMEBUFFER]=ie),D===n.FRAMEBUFFER&&(p[n.DRAW_FRAMEBUFFER]=ie),!0):!1}function Oe(D,ie){let K=x,me=!1;if(D){K=g.get(ie),K===void 0&&(K=[],g.set(ie,K));let he=D.textures;if(K.length!==he.length||K[0]!==n.COLOR_ATTACHMENT0){for(let fe=0,De=he.length;fe<De;fe++)K[fe]=n.COLOR_ATTACHMENT0+fe;K.length=he.length,me=!0}}else K[0]!==n.BACK&&(K[0]=n.BACK,me=!0);me&&n.drawBuffers(K)}function ct(D){return y!==D?(n.useProgram(D),y=D,!0):!1}let ut={[$i]:n.FUNC_ADD,[Od]:n.FUNC_SUBTRACT,[kd]:n.FUNC_REVERSE_SUBTRACT};ut[Fd]=n.MIN,ut[Bd]=n.MAX;let je={[zd]:n.ZERO,[Gd]:n.ONE,[Hd]:n.SRC_COLOR,[Ol]:n.SRC_ALPHA,[Zd]:n.SRC_ALPHA_SATURATE,[qd]:n.DST_COLOR,[Wd]:n.DST_ALPHA,[Vd]:n.ONE_MINUS_SRC_COLOR,[kl]:n.ONE_MINUS_SRC_ALPHA,[Yd]:n.ONE_MINUS_DST_COLOR,[Xd]:n.ONE_MINUS_DST_ALPHA,[Jd]:n.CONSTANT_COLOR,[$d]:n.ONE_MINUS_CONSTANT_COLOR,[jd]:n.CONSTANT_ALPHA,[Kd]:n.ONE_MINUS_CONSTANT_ALPHA};function Wt(D,ie,K,me,he,fe,De,Je,ae,Ne){if(D===Ji){f===!0&&(ze(n.BLEND),f=!1);return}if(f===!1&&(ue(n.BLEND),f=!0),D!==Ud){if(D!==m||Ne!==I){if((v!==$i||w!==$i)&&(n.blendEquation(n.FUNC_ADD),v=$i,w=$i),Ne)switch(D){case Gs:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ni:n.blendFunc(n.ONE,n.ONE);break;case Nl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ul:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Fe("WebGLState: Invalid blending: ",D);break}else switch(D){case Gs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ni:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Nl:Fe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ul:Fe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Fe("WebGLState: Invalid blending: ",D);break}E=null,M=null,A=null,_=null,T.set(0,0,0),O=0,m=D,I=Ne}return}he=he||ie,fe=fe||K,De=De||me,(ie!==v||he!==w)&&(n.blendEquationSeparate(ut[ie],ut[he]),v=ie,w=he),(K!==E||me!==M||fe!==A||De!==_)&&(n.blendFuncSeparate(je[K],je[me],je[fe],je[De]),E=K,M=me,A=fe,_=De),(Je.equals(T)===!1||ae!==O)&&(n.blendColor(Je.r,Je.g,Je.b,ae),T.copy(Je),O=ae),m=D,I=!1}function Dt(D,ie){D.side===En?ze(n.CULL_FACE):ue(n.CULL_FACE);let K=D.side===on;ie&&(K=!K),cn(K),D.blending===Gs&&D.transparent===!1?Wt(Ji):Wt(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),r.setMask(D.colorWrite);let me=D.stencilWrite;a.setTest(me),me&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),kt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?ue(n.SAMPLE_ALPHA_TO_COVERAGE):ze(n.SAMPLE_ALPHA_TO_COVERAGE)}function cn(D){B!==D&&(D?n.frontFace(n.CW):n.frontFace(n.CCW),B=D)}function St(D){D!==Ld?(ue(n.CULL_FACE),D!==H&&(D===Dl?n.cullFace(n.BACK):D===Dd?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ze(n.CULL_FACE),H=D}function Gn(D){D!==Z&&(P&&n.lineWidth(D),Z=D)}function kt(D,ie,K){D?(ue(n.POLYGON_OFFSET_FILL),(N!==ie||$!==K)&&(N=ie,$=K,o.getReversed()&&(ie=-ie,K=-K),n.polygonOffset(ie,K))):ze(n.POLYGON_OFFSET_FILL)}function _n(D){D?ue(n.SCISSOR_TEST):ze(n.SCISSOR_TEST)}function yn(D){D===void 0&&(D=n.TEXTURE0+R-1),G!==D&&(n.activeTexture(D),G=D)}function vn(D,ie,K){K===void 0&&(G===null?K=n.TEXTURE0+R-1:K=G);let me=te[K];me===void 0&&(me={type:void 0,texture:void 0},te[K]=me),(me.type!==D||me.texture!==ie)&&(G!==K&&(n.activeTexture(K),G=K),n.bindTexture(D,ie||Ee[D]),me.type=D,me.texture=ie)}function z(){let D=te[G];D!==void 0&&D.type!==void 0&&(n.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function Sn(){try{n.compressedTexImage2D(...arguments)}catch(D){Fe("WebGLState:",D)}}function xt(){try{n.compressedTexImage3D(...arguments)}catch(D){Fe("WebGLState:",D)}}function _t(){try{n.texSubImage2D(...arguments)}catch(D){Fe("WebGLState:",D)}}function ye(){try{n.texSubImage3D(...arguments)}catch(D){Fe("WebGLState:",D)}}function Nt(){try{n.compressedTexSubImage2D(...arguments)}catch(D){Fe("WebGLState:",D)}}function Ue(){try{n.compressedTexSubImage3D(...arguments)}catch(D){Fe("WebGLState:",D)}}function Ve(){try{n.texStorage2D(...arguments)}catch(D){Fe("WebGLState:",D)}}function C(){try{n.texStorage3D(...arguments)}catch(D){Fe("WebGLState:",D)}}function S(){try{n.texImage2D(...arguments)}catch(D){Fe("WebGLState:",D)}}function q(){try{n.texImage3D(...arguments)}catch(D){Fe("WebGLState:",D)}}function oe(D){return d[D]!==void 0?d[D]:n.getParameter(D)}function se(D,ie){d[D]!==ie&&(n.pixelStorei(D,ie),d[D]=ie)}function de(D){j.equals(D)===!1&&(n.scissor(D.x,D.y,D.z,D.w),j.copy(D))}function xe(D){le.equals(D)===!1&&(n.viewport(D.x,D.y,D.z,D.w),le.copy(D))}function ee(D,ie){let K=l.get(ie);K===void 0&&(K=new WeakMap,l.set(ie,K));let me=K.get(D);me===void 0&&(me=n.getUniformBlockIndex(ie,D.name),n.uniformBlockBinding(ie,me,me),K.set(D,me))}function ne(D,ie,K){let he=l.get(ie).get(D);c[he]!==K&&(n.bindBufferBase(n.UNIFORM_BUFFER,he,K),c[he]=K)}function pe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),h={},d={},G=null,te={},p={},c={},g=new WeakMap,x=[],y=null,f=!1,m=null,v=null,E=null,M=null,w=null,A=null,_=null,T=new Xe(0,0,0),O=0,I=!1,B=null,H=null,Z=null,N=null,$=null,j.set(0,0,n.canvas.width,n.canvas.height),le.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ue,disable:ze,bindFramebuffer:ot,drawBuffers:Oe,useProgram:ct,setBlending:Wt,setMaterial:Dt,setFlipSided:cn,setCullFace:St,setLineWidth:Gn,setPolygonOffset:kt,setScissorTest:_n,activeTexture:yn,bindTexture:vn,unbindTexture:z,compressedTexImage2D:Sn,compressedTexImage3D:xt,texImage2D:S,texImage3D:q,pixelStorei:se,getParameter:oe,updateUBOMapping:ee,uniformBlockBinding:ne,texStorage2D:Ve,texStorage3D:C,texSubImage2D:_t,texSubImage3D:ye,compressedTexSubImage2D:Nt,compressedTexSubImage3D:Ue,scissor:de,viewport:xe,reset:pe}}function Iy(n,e,t,i,s,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Be,h=new WeakMap,d=new Set,p,g=new WeakMap,x=new Set,y=new FinalizationRegistry(C=>x.delete(C)),f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(C,S){return f?new OffscreenCanvas(C,S):mr("canvas")}function v(C,S,q){let oe=1,se=Ve(C);if((se.width>q||se.height>q)&&(oe=q/Math.max(se.width,se.height)),oe<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let de=Math.floor(oe*se.width),xe=Math.floor(oe*se.height);p===void 0&&(p=m(de,xe));let ee=S?m(de,xe):p;return ee.width=de,ee.height=xe,ee.getContext("2d").drawImage(C,0,0,de,xe),ke("WebGLRenderer: Texture has been resized from ("+se.width+"x"+se.height+") to ("+de+"x"+xe+")."),ee}else return"data"in C&&ke("WebGLRenderer: Image in DataTexture is too big ("+se.width+"x"+se.height+")."),C;return C}function E(C){return C.generateMipmaps}function M(C){n.generateMipmap(C)}function w(C){return C.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?n.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function A(C,S,q,oe,se,de=!1){if(C!==null){if(n[C]!==void 0)return n[C];ke("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let xe;oe&&(xe=e.get("EXT_texture_norm16"),xe||ke("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ee=S;if(S===n.RED&&(q===n.FLOAT&&(ee=n.R32F),q===n.HALF_FLOAT&&(ee=n.R16F),q===n.UNSIGNED_BYTE&&(ee=n.R8),q===n.UNSIGNED_SHORT&&xe&&(ee=xe.R16_EXT),q===n.SHORT&&xe&&(ee=xe.R16_SNORM_EXT)),S===n.RED_INTEGER&&(q===n.UNSIGNED_BYTE&&(ee=n.R8UI),q===n.UNSIGNED_SHORT&&(ee=n.R16UI),q===n.UNSIGNED_INT&&(ee=n.R32UI),q===n.BYTE&&(ee=n.R8I),q===n.SHORT&&(ee=n.R16I),q===n.INT&&(ee=n.R32I)),S===n.RG&&(q===n.FLOAT&&(ee=n.RG32F),q===n.HALF_FLOAT&&(ee=n.RG16F),q===n.UNSIGNED_BYTE&&(ee=n.RG8),q===n.UNSIGNED_SHORT&&xe&&(ee=xe.RG16_EXT),q===n.SHORT&&xe&&(ee=xe.RG16_SNORM_EXT)),S===n.RG_INTEGER&&(q===n.UNSIGNED_BYTE&&(ee=n.RG8UI),q===n.UNSIGNED_SHORT&&(ee=n.RG16UI),q===n.UNSIGNED_INT&&(ee=n.RG32UI),q===n.BYTE&&(ee=n.RG8I),q===n.SHORT&&(ee=n.RG16I),q===n.INT&&(ee=n.RG32I)),S===n.RGB_INTEGER&&(q===n.UNSIGNED_BYTE&&(ee=n.RGB8UI),q===n.UNSIGNED_SHORT&&(ee=n.RGB16UI),q===n.UNSIGNED_INT&&(ee=n.RGB32UI),q===n.BYTE&&(ee=n.RGB8I),q===n.SHORT&&(ee=n.RGB16I),q===n.INT&&(ee=n.RGB32I)),S===n.RGBA_INTEGER&&(q===n.UNSIGNED_BYTE&&(ee=n.RGBA8UI),q===n.UNSIGNED_SHORT&&(ee=n.RGBA16UI),q===n.UNSIGNED_INT&&(ee=n.RGBA32UI),q===n.BYTE&&(ee=n.RGBA8I),q===n.SHORT&&(ee=n.RGBA16I),q===n.INT&&(ee=n.RGBA32I)),S===n.RGB&&(q===n.UNSIGNED_SHORT&&xe&&(ee=xe.RGB16_EXT),q===n.SHORT&&xe&&(ee=xe.RGB16_SNORM_EXT),q===n.UNSIGNED_INT_5_9_9_9_REV&&(ee=n.RGB9_E5),q===n.UNSIGNED_INT_10F_11F_11F_REV&&(ee=n.R11F_G11F_B10F)),S===n.RGBA){let ne=de?pr:et.getTransfer(se);q===n.FLOAT&&(ee=n.RGBA32F),q===n.HALF_FLOAT&&(ee=n.RGBA16F),q===n.UNSIGNED_BYTE&&(ee=ne===at?n.SRGB8_ALPHA8:n.RGBA8),q===n.UNSIGNED_SHORT&&xe&&(ee=xe.RGBA16_EXT),q===n.SHORT&&xe&&(ee=xe.RGBA16_SNORM_EXT),q===n.UNSIGNED_SHORT_4_4_4_4&&(ee=n.RGBA4),q===n.UNSIGNED_SHORT_5_5_5_1&&(ee=n.RGB5_A1)}return(ee===n.R16F||ee===n.R32F||ee===n.RG16F||ee===n.RG32F||ee===n.RGBA16F||ee===n.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function _(C,S){let q;return C?S===null||S===Un||S===Ki?q=n.DEPTH24_STENCIL8:S===On?q=n.DEPTH32F_STENCIL8:S===Vs&&(q=n.DEPTH24_STENCIL8,ke("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Un||S===Ki?q=n.DEPTH_COMPONENT24:S===On?q=n.DEPTH_COMPONENT32F:S===Vs&&(q=n.DEPTH_COMPONENT16),q}function T(C,S){return E(C)===!0||C.isFramebufferTexture&&C.minFilter!==Ht&&C.minFilter!==nn?Math.log2(Math.max(S.width,S.height))+1:C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?S.mipmaps.length:1}function O(C){let S=new WeakRef(C);i.get(C).__ref=S,x.add(S),y.register(C,S,S)}function I(C){let S=i.get(C).__ref;S!==void 0&&(x.delete(S),y.unregister(S))}function B(C){Z(C.target)}function H(C){N(C.target)}function Z(C){C.removeEventListener("dispose",B),I(C),R(C),C.isVideoTexture&&h.delete(C),C.isHTMLTexture&&d.delete(C)}function N(C){C.removeEventListener("dispose",H),I(C),U(C)}function $(){for(let C of x){let S=C.deref();S!==void 0&&(S.isRenderTarget===!0?N(S):Z(S))}x.clear(),d.clear()}function R(C){let S=i.get(C);if(S.__webglInit===void 0)return;let q=C.source,oe=g.get(q);if(oe){let se=oe[S.__cacheKey];se.usedTimes--,se.usedTimes===0&&P(C),Object.keys(oe).length===0&&g.delete(q)}i.remove(C)}function P(C){let S=i.get(C);n.deleteTexture(S.__webglTexture);let q=C.source,oe=g.get(q);delete oe[S.__cacheKey],o.memory.textures--}function U(C){let S=i.get(C);S.__depthDisposeCallback&&S.__depthDisposeCallback();let q=C.depthTexture;if(q&&q.renderTarget===C&&Z(q),C.isWebGLCubeRenderTarget)for(let se=0;se<6;se++){if(Array.isArray(S.__webglFramebuffer[se]))for(let de=0;de<S.__webglFramebuffer[se].length;de++)n.deleteFramebuffer(S.__webglFramebuffer[se][de]);else n.deleteFramebuffer(S.__webglFramebuffer[se]);S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer[se])}else{if(Array.isArray(S.__webglFramebuffer))for(let se=0;se<S.__webglFramebuffer.length;se++)n.deleteFramebuffer(S.__webglFramebuffer[se]);else n.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&n.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let se=0;se<S.__webglColorRenderbuffer.length;se++)S.__webglColorRenderbuffer[se]&&n.deleteRenderbuffer(S.__webglColorRenderbuffer[se]);S.__webglDepthRenderbuffer&&n.deleteRenderbuffer(S.__webglDepthRenderbuffer)}let oe=C.textures;for(let se=0,de=oe.length;se<de;se++){let xe=i.get(oe[se]);xe.__webglTexture&&(n.deleteTexture(xe.__webglTexture),o.memory.textures--),i.remove(oe[se])}i.remove(C)}let F=0;function G(){F=0}function te(){return F}function ce(C){F=C}function Ae(){let C=F;return C>=s.maxTextures&&ke("WebGLTextures: Trying to use "+(C+1)+" texture units while this GPU supports only "+s.maxTextures),F+=1,C}function j(C){let S=[];return S.push(C.wrapS),S.push(C.wrapT),S.push(C.wrapR||0),S.push(C.magFilter),S.push(C.minFilter),S.push(C.anisotropy),S.push(C.internalFormat),S.push(C.format),S.push(C.type),S.push(C.generateMipmaps),S.push(C.mipmapsAutoUpdate),S.push(C.premultiplyAlpha),S.push(C.flipY),S.push(C.unpackAlignment),S.push(C.colorSpace),S.join()}function le(C,S){let q=i.get(C);if(C.isVideoTexture&&Nt(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&q.__version!==C.version){let oe=C.image;if(oe===null)ke("WebGLRenderer: Texture marked for update but no image data found.");else if(oe.complete===!1)ke("WebGLRenderer: Texture marked for update but image is incomplete");else{Dt(q,C,S);return}}else C.isExternalTexture&&(q.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,q.__webglTexture,n.TEXTURE0+S)}function ve(C,S){let q=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&q.__version!==C.version){Dt(q,C,S);return}else C.isExternalTexture&&(q.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,q.__webglTexture,n.TEXTURE0+S)}function Ee(C,S){let q=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&q.__version!==C.version){Dt(q,C,S);return}t.bindTexture(n.TEXTURE_3D,q.__webglTexture,n.TEXTURE0+S)}function ue(C,S){let q=i.get(C);if(C.version>0&&q.__version!==C.version){cn(q,C,S);return}t.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture,n.TEXTURE0+S)}let ze={[Rs]:n.REPEAT,[Vn]:n.CLAMP_TO_EDGE,[ta]:n.MIRRORED_REPEAT},ot={[Ht]:n.NEAREST,[tf]:n.NEAREST_MIPMAP_NEAREST,[Fr]:n.NEAREST_MIPMAP_LINEAR,[nn]:n.LINEAR,[Aa]:n.LINEAR_MIPMAP_NEAREST,[di]:n.LINEAR_MIPMAP_LINEAR},Oe={[of]:n.NEVER,[th]:n.ALWAYS,[af]:n.LESS,[Ql]:n.LEQUAL,[cf]:n.EQUAL,[eh]:n.GEQUAL,[lf]:n.GREATER,[hf]:n.NOTEQUAL};function ct(C,S){if(S.type===On&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===nn||S.magFilter===Aa||S.magFilter===Fr||S.magFilter===di||S.minFilter===nn||S.minFilter===Aa||S.minFilter===Fr||S.minFilter===di)&&ke("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(C,n.TEXTURE_WRAP_S,ze[S.wrapS]),n.texParameteri(C,n.TEXTURE_WRAP_T,ze[S.wrapT]),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,ze[S.wrapR]),n.texParameteri(C,n.TEXTURE_MAG_FILTER,ot[S.magFilter]),n.texParameteri(C,n.TEXTURE_MIN_FILTER,ot[S.minFilter]),S.compareFunction&&(n.texParameteri(C,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(C,n.TEXTURE_COMPARE_FUNC,Oe[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Ht||S.minFilter!==Fr&&S.minFilter!==di||S.type===On&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||i.get(S).__currentAnisotropy){let q=e.get("EXT_texture_filter_anisotropic");n.texParameterf(C,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy}}}function ut(C,S){let q=!1;C.__webglInit===void 0&&(C.__webglInit=!0,S.addEventListener("dispose",B),O(S));let oe=S.source,se=g.get(oe);se===void 0&&(se={},g.set(oe,se));let de=j(S);if(de!==C.__cacheKey){se[de]===void 0&&(se[de]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,q=!0),se[de].usedTimes++;let xe=se[C.__cacheKey];xe!==void 0&&(se[C.__cacheKey].usedTimes--,xe.usedTimes===0&&P(S)),C.__cacheKey=de,C.__webglTexture=se[de].texture}return q}function je(C,S,q){return Math.floor(Math.floor(C/q)/S)}function Wt(C,S,q,oe){let de=C.updateRanges;if(de.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,S.width,S.height,q,oe,S.data);else{de.sort((D,ie)=>D.start-ie.start);let xe=0;for(let D=1;D<de.length;D++){let ie=de[xe],K=de[D],me=ie.start+ie.count,he=je(K.start,S.width,4),fe=je(ie.start,S.width,4);K.start<=me+1&&he===fe&&je(K.start+K.count-1,S.width,4)===he?ie.count=Math.max(ie.count,K.start+K.count-ie.start):(++xe,de[xe]=K)}de.length=xe+1;let ee=t.getParameter(n.UNPACK_ROW_LENGTH),ne=t.getParameter(n.UNPACK_SKIP_PIXELS),pe=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,S.width);for(let D=0,ie=de.length;D<ie;D++){let K=de[D],me=Math.floor(K.start/4),he=Math.ceil(K.count/4),fe=me%S.width,De=Math.floor(me/S.width),Je=he,ae=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,fe),t.pixelStorei(n.UNPACK_SKIP_ROWS,De),t.texSubImage2D(n.TEXTURE_2D,0,fe,De,Je,ae,q,oe,S.data)}C.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,ee),t.pixelStorei(n.UNPACK_SKIP_PIXELS,ne),t.pixelStorei(n.UNPACK_SKIP_ROWS,pe)}}function Dt(C,S,q){let oe=n.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(oe=n.TEXTURE_2D_ARRAY),S.isData3DTexture&&(oe=n.TEXTURE_3D);let se=ut(C,S),de=S.source;t.bindTexture(oe,C.__webglTexture,n.TEXTURE0+q);let xe=i.get(de);if(de.version!==xe.__version||se===!0){if(t.activeTexture(n.TEXTURE0+q),(typeof ImageBitmap<"u"&&S.image instanceof ImageBitmap)===!1){let ae=et.getPrimaries(et.workingColorSpace),Ne=S.colorSpace===pi?null:et.getPrimaries(S.colorSpace),Ze=S.colorSpace===pi||ae===Ne?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ze)}t.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment);let ne=v(S.image,!1,s.maxTextureSize);ne=Ue(S,ne);let pe=r.convert(S.format,S.colorSpace),D=r.convert(S.type),ie=A(S.internalFormat,pe,D,S.normalized,S.colorSpace,S.isVideoTexture);ct(oe,S);let K,me=S.mipmaps,he=S.isVideoTexture!==!0,fe=xe.__version===void 0||se===!0,De=de.dataReady,Je=T(S,ne);if(S.isDepthTexture)ie=_(S.format===fi,S.type),fe&&(he?t.texStorage2D(n.TEXTURE_2D,1,ie,ne.width,ne.height):t.texImage2D(n.TEXTURE_2D,0,ie,ne.width,ne.height,0,pe,D,null));else if(S.isDataTexture)if(me.length>0){he&&fe&&t.texStorage2D(n.TEXTURE_2D,Je,ie,me[0].width,me[0].height);for(let ae=0,Ne=me.length;ae<Ne;ae++)K=me[ae],he?De&&t.texSubImage2D(n.TEXTURE_2D,ae,0,0,K.width,K.height,pe,D,K.data):t.texImage2D(n.TEXTURE_2D,ae,ie,K.width,K.height,0,pe,D,K.data);S.generateMipmaps=!1}else he?(fe&&t.texStorage2D(n.TEXTURE_2D,Je,ie,ne.width,ne.height),De&&Wt(S,ne,pe,D)):t.texImage2D(n.TEXTURE_2D,0,ie,ne.width,ne.height,0,pe,D,ne.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){he&&fe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Je,ie,me[0].width,me[0].height,ne.depth);for(let ae=0,Ne=me.length;ae<Ne;ae++)if(K=me[ae],S.format!==Fn)if(pe!==null)if(he){if(De)if(S.layerUpdates.size>0){let Ze=ah(K.width,K.height,S.format,S.type);for(let Se of S.layerUpdates){let lt=K.data.subarray(Se*Ze/K.data.BYTES_PER_ELEMENT,(Se+1)*Ze/K.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ae,0,0,Se,K.width,K.height,1,pe,lt)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ae,0,0,0,K.width,K.height,ne.depth,pe,K.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ae,ie,K.width,K.height,ne.depth,0,K.data,0,0);else ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else he?De&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ae,0,0,0,K.width,K.height,ne.depth,pe,D,K.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ae,ie,K.width,K.height,ne.depth,0,pe,D,K.data);S.layerUpdates.size>0&&S.clearLayerUpdates()}else{he&&fe&&t.texStorage2D(n.TEXTURE_2D,Je,ie,me[0].width,me[0].height);for(let ae=0,Ne=me.length;ae<Ne;ae++)K=me[ae],S.format!==Fn?pe!==null?he?De&&t.compressedTexSubImage2D(n.TEXTURE_2D,ae,0,0,K.width,K.height,pe,K.data):t.compressedTexImage2D(n.TEXTURE_2D,ae,ie,K.width,K.height,0,K.data):ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):he?De&&t.texSubImage2D(n.TEXTURE_2D,ae,0,0,K.width,K.height,pe,D,K.data):t.texImage2D(n.TEXTURE_2D,ae,ie,K.width,K.height,0,pe,D,K.data)}else if(S.isDataArrayTexture)if(he){if(fe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Je,ie,ne.width,ne.height,ne.depth),De)if(S.layerUpdates.size>0){let ae=ah(ne.width,ne.height,S.format,S.type);for(let Ne of S.layerUpdates){let Ze=ne.data.subarray(Ne*ae/ne.data.BYTES_PER_ELEMENT,(Ne+1)*ae/ne.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Ne,ne.width,ne.height,1,pe,D,Ze)}S.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,pe,D,ne.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,ie,ne.width,ne.height,ne.depth,0,pe,D,ne.data);else if(S.isData3DTexture)he?(fe&&t.texStorage3D(n.TEXTURE_3D,Je,ie,ne.width,ne.height,ne.depth),De&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,pe,D,ne.data)):t.texImage3D(n.TEXTURE_3D,0,ie,ne.width,ne.height,ne.depth,0,pe,D,ne.data);else if(S.isFramebufferTexture){if(fe)if(he)t.texStorage2D(n.TEXTURE_2D,Je,ie,ne.width,ne.height);else{let ae=ne.width,Ne=ne.height;for(let Ze=0;Ze<Je;Ze++)t.texImage2D(n.TEXTURE_2D,Ze,ie,ae,Ne,0,pe,D,null),ae>>=1,Ne>>=1}}else if(S.isHTMLTexture){if("texElementImage2D"in n){let ae=n.canvas;if(ae.hasAttribute("layoutsubtree")||ae.setAttribute("layoutsubtree","true"),ne.parentNode!==ae){ae.appendChild(ne),d.add(S),ae.onpaint=Ne=>{let Ze=Ne.changedElements;for(let Se of d)Ze.includes(Se.image)&&(Se.needsUpdate=!0)},ae.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,ne);else{let Ze=n.RGBA,Se=n.RGBA,lt=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Ze,Se,lt,ne)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(me.length>0){if(he&&fe){let ae=Ve(me[0]);t.texStorage2D(n.TEXTURE_2D,Je,ie,ae.width,ae.height)}for(let ae=0,Ne=me.length;ae<Ne;ae++)K=me[ae],he?De&&t.texSubImage2D(n.TEXTURE_2D,ae,0,0,pe,D,K):t.texImage2D(n.TEXTURE_2D,ae,ie,pe,D,K);S.generateMipmaps=!1}else if(he){if(fe){let ae=Ve(ne);t.texStorage2D(n.TEXTURE_2D,Je,ie,ae.width,ae.height)}De&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,pe,D,ne)}else t.texImage2D(n.TEXTURE_2D,0,ie,pe,D,ne);E(S)&&S.mipmapsAutoUpdate===!0&&M(oe),xe.__version=de.version,S.onUpdate&&S.onUpdate(S)}C.__version=S.version}function cn(C,S,q){if(S.image.length!==6)return;let oe=ut(C,S),se=S.source;t.bindTexture(n.TEXTURE_CUBE_MAP,C.__webglTexture,n.TEXTURE0+q);let de=i.get(se);if(se.version!==de.__version||oe===!0){t.activeTexture(n.TEXTURE0+q);let xe=et.getPrimaries(et.workingColorSpace),ee=S.colorSpace===pi?null:et.getPrimaries(S.colorSpace),ne=S.colorSpace===pi||xe===ee?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ne);let pe=S.isCompressedTexture||S.image[0].isCompressedTexture,D=S.image[0]&&S.image[0].isDataTexture,ie=[];for(let Se=0;Se<6;Se++)!pe&&!D?ie[Se]=v(S.image[Se],!0,s.maxCubemapSize):ie[Se]=D?S.image[Se].image:S.image[Se],ie[Se]=Ue(S,ie[Se]);let K=ie[0],me=r.convert(S.format,S.colorSpace),he=r.convert(S.type),fe=A(S.internalFormat,me,he,S.normalized,S.colorSpace),De=S.isVideoTexture!==!0,Je=de.__version===void 0||oe===!0,ae=se.dataReady,Ne=T(S,K);ct(n.TEXTURE_CUBE_MAP,S);let Ze;if(S.isDepthTexture){if(fe=_(S.format===fi,S.type),Je)if(De)t.texStorage2D(n.TEXTURE_CUBE_MAP,1,fe,K.width,K.height);else for(let Se=0;Se<6;Se++)t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,fe,K.width,K.height,0,me,he,null)}else if(pe){De&&Je&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Ne,fe,K.width,K.height);for(let Se=0;Se<6;Se++){Ze=ie[Se].mipmaps;for(let lt=0;lt<Ze.length;lt++){let Ft=Ze[lt];S.format!==Fn?me!==null?De?ae&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Se,lt,0,0,Ft.width,Ft.height,me,Ft.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Se,lt,fe,Ft.width,Ft.height,0,Ft.data):ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):De?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Se,lt,0,0,Ft.width,Ft.height,me,he,Ft.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Se,lt,fe,Ft.width,Ft.height,0,me,he,Ft.data)}}}else{if(Ze=S.mipmaps,De&&Je){Ze.length>0&&Ne++;let Se=Ve(ie[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Ne,fe,Se.width,Se.height)}for(let Se=0;Se<6;Se++)if(D){De?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,0,0,ie[Se].width,ie[Se].height,me,he,ie[Se].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,fe,ie[Se].width,ie[Se].height,0,me,he,ie[Se].data);for(let lt=0;lt<Ze.length;lt++){let _i=Ze[lt].image[Se].image;De?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Se,lt+1,0,0,_i.width,_i.height,me,he,_i.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Se,lt+1,fe,_i.width,_i.height,0,me,he,_i.data)}}else{De?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,0,0,me,he,ie[Se]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,fe,me,he,ie[Se]);for(let lt=0;lt<Ze.length;lt++){let Ft=Ze[lt];De?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Se,lt+1,0,0,me,he,Ft.image[Se]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Se,lt+1,fe,me,he,Ft.image[Se])}}}E(S)&&S.mipmapsAutoUpdate===!0&&M(n.TEXTURE_CUBE_MAP),de.__version=se.version,S.onUpdate&&S.onUpdate(S)}C.__version=S.version}function St(C,S,q,oe,se,de){let xe=r.convert(q.format,q.colorSpace),ee=r.convert(q.type),ne=A(q.internalFormat,xe,ee,q.normalized,q.colorSpace),pe=i.get(S),D=i.get(q);if(D.__renderTarget=S,!pe.__hasExternalTextures){let ie=Math.max(1,S.width>>de),K=Math.max(1,S.height>>de);se===n.TEXTURE_3D||se===n.TEXTURE_2D_ARRAY?t.texImage3D(se,de,ne,ie,K,S.depth,0,xe,ee,null):t.texImage2D(se,de,ne,ie,K,0,xe,ee,null)}t.bindFramebuffer(n.FRAMEBUFFER,C),ye(S)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,oe,se,D.__webglTexture,0,_t(S)):(se===n.TEXTURE_2D||se>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&se<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,oe,se,D.__webglTexture,de),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Gn(C,S,q){if(n.bindRenderbuffer(n.RENDERBUFFER,C),S.depthBuffer){let oe=S.depthTexture,se=oe&&oe.isDepthTexture?oe.type:null,de=_(S.stencilBuffer,se),xe=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;ye(S)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,_t(S),de,S.width,S.height):q?n.renderbufferStorageMultisample(n.RENDERBUFFER,_t(S),de,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,de,S.width,S.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,xe,n.RENDERBUFFER,C)}else{let oe=S.textures;for(let se=0;se<oe.length;se++){let de=oe[se],xe=r.convert(de.format,de.colorSpace),ee=r.convert(de.type),ne=A(de.internalFormat,xe,ee,de.normalized,de.colorSpace);ye(S)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,_t(S),ne,S.width,S.height):q?n.renderbufferStorageMultisample(n.RENDERBUFFER,_t(S),ne,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,ne,S.width,S.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function kt(C,S,q){let oe=S.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,C),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let se=i.get(S.depthTexture);se.__renderTarget=S;let de=oe?S.depthTexture.image[0]:S.depthTexture.image;(!se.__webglTexture||de.width!==S.width||de.height!==S.height)&&(de.width=S.width,de.height=S.height,S.depthTexture.needsUpdate=!0),oe?ue(S.depthTexture,0):le(S.depthTexture,0);let xe=se.__webglTexture,ee=_t(S),ne=oe?n.TEXTURE_CUBE_MAP_POSITIVE_X+q:n.TEXTURE_2D,pe=S.depthTexture.format===fi?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(S.depthTexture.format===ai)ye(S)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,pe,ne,xe,0,ee):n.framebufferTexture2D(n.FRAMEBUFFER,pe,ne,xe,0);else if(S.depthTexture.format===fi)ye(S)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,pe,ne,xe,0,ee):n.framebufferTexture2D(n.FRAMEBUFFER,pe,ne,xe,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function _n(C){let S=i.get(C),q=C.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==C.depthTexture){let oe=C.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),oe){let se=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,oe.removeEventListener("dispose",se)};oe.addEventListener("dispose",se),S.__depthDisposeCallback=se}S.__boundDepthTexture=oe}if(C.depthTexture&&!S.__autoAllocateDepthBuffer)if(q)for(let oe=0;oe<6;oe++)kt(S.__webglFramebuffer[oe],C,oe);else C.texture.mipmaps.length>0?kt(S.__webglFramebuffer[0],C,0):kt(S.__webglFramebuffer,C,0);else if(q){S.__webglDepthbuffer=[];for(let oe=0;oe<6;oe++)if(t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer[oe]),S.__webglDepthbuffer[oe]===void 0)S.__webglDepthbuffer[oe]=n.createRenderbuffer(),Gn(S.__webglDepthbuffer[oe],C,!1);else{let se=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,de=S.__webglDepthbuffer[oe];n.bindRenderbuffer(n.RENDERBUFFER,de),n.framebufferRenderbuffer(n.FRAMEBUFFER,se,n.RENDERBUFFER,de)}}else if(C.texture.mipmaps.length>0?t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=n.createRenderbuffer(),Gn(S.__webglDepthbuffer,C,!1);else{let se=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,de=S.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,de),n.framebufferRenderbuffer(n.FRAMEBUFFER,se,n.RENDERBUFFER,de)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function yn(C,S,q){let oe=i.get(C);S!==void 0&&St(oe.__webglFramebuffer,C,C.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),q!==void 0&&_n(C)}function vn(C){let S=C.texture,q=i.get(C),oe=i.get(S);C.addEventListener("dispose",H),O(C);let se=C.textures,de=C.isWebGLCubeRenderTarget===!0,xe=se.length>1;if(xe||(oe.__webglTexture===void 0&&(oe.__webglTexture=n.createTexture()),oe.__version=S.version,o.memory.textures++),de){q.__webglFramebuffer=[];for(let ee=0;ee<6;ee++)if(S.mipmaps.length>0){q.__webglFramebuffer[ee]=[];for(let ne=0;ne<S.mipmaps.length;ne++)q.__webglFramebuffer[ee][ne]=n.createFramebuffer()}else q.__webglFramebuffer[ee]=n.createFramebuffer()}else{if(S.mipmaps.length>0){q.__webglFramebuffer=[];for(let ee=0;ee<S.mipmaps.length;ee++)q.__webglFramebuffer[ee]=n.createFramebuffer()}else q.__webglFramebuffer=n.createFramebuffer();if(xe)for(let ee=0,ne=se.length;ee<ne;ee++){let pe=i.get(se[ee]);pe.__webglTexture===void 0&&(pe.__webglTexture=n.createTexture(),o.memory.textures++)}if(C.samples>0&&ye(C)===!1){q.__webglMultisampledFramebuffer=n.createFramebuffer(),q.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let ee=0;ee<se.length;ee++){let ne=se[ee];q.__webglColorRenderbuffer[ee]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,q.__webglColorRenderbuffer[ee]);let pe=r.convert(ne.format,ne.colorSpace),D=r.convert(ne.type),ie=A(ne.internalFormat,pe,D,ne.normalized,ne.colorSpace,C.isXRRenderTarget===!0),K=_t(C);n.renderbufferStorageMultisample(n.RENDERBUFFER,K,ie,C.width,C.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ee,n.RENDERBUFFER,q.__webglColorRenderbuffer[ee])}n.bindRenderbuffer(n.RENDERBUFFER,null),C.depthBuffer&&(q.__webglDepthRenderbuffer=n.createRenderbuffer(),Gn(q.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(de){t.bindTexture(n.TEXTURE_CUBE_MAP,oe.__webglTexture),ct(n.TEXTURE_CUBE_MAP,S);for(let ee=0;ee<6;ee++)if(S.mipmaps.length>0)for(let ne=0;ne<S.mipmaps.length;ne++)St(q.__webglFramebuffer[ee][ne],C,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ne);else St(q.__webglFramebuffer[ee],C,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0);E(S)?M(n.TEXTURE_CUBE_MAP):S.mipmaps.length>0&&n.texParameteri(n.TEXTURE_CUBE_MAP,n.TEXTURE_MAX_LEVEL,S.mipmaps.length-1),t.unbindTexture()}else if(xe){for(let ee=0,ne=se.length;ee<ne;ee++){let pe=se[ee],D=i.get(pe),ie=n.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ie=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ie,D.__webglTexture),ct(ie,pe),St(q.__webglFramebuffer,C,pe,n.COLOR_ATTACHMENT0+ee,ie,0),E(pe)&&M(ie)}t.unbindTexture()}else{let ee=n.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ee=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ee,oe.__webglTexture),ct(ee,S),S.mipmaps.length>0)for(let ne=0;ne<S.mipmaps.length;ne++)St(q.__webglFramebuffer[ne],C,S,n.COLOR_ATTACHMENT0,ee,ne);else St(q.__webglFramebuffer,C,S,n.COLOR_ATTACHMENT0,ee,0);E(S)?M(ee):S.mipmaps.length>0&&n.texParameteri(ee,n.TEXTURE_MAX_LEVEL,S.mipmaps.length-1),t.unbindTexture()}C.depthBuffer&&_n(C)}function z(C){let S=C.textures;for(let q=0,oe=S.length;q<oe;q++){let se=S[q];if(E(se)&&se.mipmapsAutoUpdate===!0){let de=w(C),xe=i.get(se).__webglTexture;t.bindTexture(de,xe),M(de),t.unbindTexture()}}}let Sn=[];function xt(C){if(C.samples>0){if(ye(C)===!1){let S=C.textures,q=C.width,oe=C.height,se=n.COLOR_BUFFER_BIT,de=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,xe=i.get(C),ee=S.length>1;if(ee)for(let pe=0;pe<S.length;pe++)t.bindFramebuffer(n.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,xe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,xe.__webglMultisampledFramebuffer),C.texture.mipmaps.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,xe.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,xe.__webglFramebuffer);for(let pe=0;pe<S.length;pe++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(se|=n.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(se|=n.STENCIL_BUFFER_BIT)),ee){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,xe.__webglColorRenderbuffer[pe]);let D=i.get(S[pe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,D,0)}n.blitFramebuffer(0,0,q,oe,0,0,q,oe,se,n.NEAREST),c===!0&&(Sn.length=0,Sn.push(n.COLOR_ATTACHMENT0+pe),C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&Sn.push(de),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Sn))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ee)for(let pe=0;pe<S.length;pe++){t.bindFramebuffer(n.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.RENDERBUFFER,xe.__webglColorRenderbuffer[pe]);let D=i.get(S[pe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,xe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.TEXTURE_2D,D,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,xe.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&c){let S=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[S])}}}function _t(C){return Math.min(s.maxSamples,C.samples)}function ye(C){let S=i.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function Nt(C){let S=o.render.frame;h.get(C)!==S&&(h.set(C,S),C.update())}function Ue(C,S){let q=C.colorSpace,oe=C.format,se=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||q!==fr&&q!==pi&&(et.getTransfer(q)===at?(oe!==Fn||se!==hn)&&ke("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Fe("WebGLTextures: Unsupported texture color space:",q)),S}function Ve(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=Ae,this.resetTextureUnits=G,this.getTextureUnits=te,this.setTextureUnits=ce,this.setTexture2D=le,this.setTexture2DArray=ve,this.setTexture3D=Ee,this.setTextureCube=ue,this.rebindTextures=yn,this.setupRenderTarget=vn,this.updateRenderTargetMipmap=z,this.updateMultisampleRenderTarget=xt,this.setupDepthRenderbuffer=_n,this.setupFrameBufferTexture=St,this.useMultisampledRTT=ye,this.dispose=$}function Ly(n,e){function t(i,s=pi){let r,o=et.getTransfer(s);if(i===hn)return n.UNSIGNED_BYTE;if(i===Ra)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Pa)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Zl)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Jl)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===ql)return n.BYTE;if(i===Yl)return n.SHORT;if(i===Vs)return n.UNSIGNED_SHORT;if(i===Ca)return n.INT;if(i===Un)return n.UNSIGNED_INT;if(i===On)return n.FLOAT;if(i===kn)return n.HALF_FLOAT;if(i===$l)return n.ALPHA;if(i===jl)return n.RGB;if(i===Fn)return n.RGBA;if(i===ai)return n.DEPTH_COMPONENT;if(i===fi)return n.DEPTH_STENCIL;if(i===Kl)return n.RED;if(i===Ia)return n.RED_INTEGER;if(i===Ui)return n.RG;if(i===La)return n.RG_INTEGER;if(i===Da)return n.RGBA_INTEGER;if(i===Br||i===zr||i===Gr||i===Hr)if(o===at)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Br)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===zr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Gr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Hr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Br)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===zr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Gr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Hr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Na||i===Ua||i===Oa||i===ka)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Na)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ua)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Oa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ka)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Fa||i===Ba||i===za||i===Ga||i===Ha||i===Vr||i===Va)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Fa||i===Ba)return o===at?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===za)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Ga)return r.COMPRESSED_R11_EAC;if(i===Ha)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Vr)return r.COMPRESSED_RG11_EAC;if(i===Va)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Wa||i===Xa||i===qa||i===Ya||i===Za||i===Ja||i===$a||i===ja||i===Ka||i===Qa||i===ec||i===tc||i===nc||i===ic)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Wa)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Xa)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===qa)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ya)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Za)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ja)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===$a)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===ja)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ka)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Qa)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ec)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===tc)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===nc)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ic)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===sc||i===rc||i===oc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===sc)return o===at?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===rc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===oc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===ac||i===cc||i===Wr||i===lc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===ac)return r.COMPRESSED_RED_RGTC1_EXT;if(i===cc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Wr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===lc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ki?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var Dy=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ny=`
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

}`,Sh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new Cr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new Yn({vertexShader:Dy,fragmentShader:Ny,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new nt(new Ci(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},bh=class extends Wn{constructor(e,t){super();let i=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,d=null,p=null,g=null,x=null,y=typeof XRWebGLBinding<"u",f=new Sh,m={},v=t.getContextAttributes(),E=null,M=null,w=[],A=[],_=new Be,T=null,O=null,I=new qt;I.viewport=new yt;let B=new qt;B.viewport=new yt;let H=[I,B],Z=new ba,N=null,$=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let le=w[j];return le===void 0&&(le=new Ds,w[j]=le),le.getTargetRaySpace()},this.getControllerGrip=function(j){let le=w[j];return le===void 0&&(le=new Ds,w[j]=le),le.getGripSpace()},this.getHand=function(j){let le=w[j];return le===void 0&&(le=new Ds,w[j]=le),le.getHandSpace()};function R(j){let le=A.indexOf(j.inputSource);if(le===-1)return;let ve=w[le];ve!==void 0&&(ve.update(j.inputSource,j.frame,l||o),ve.dispatchEvent({type:j.type,data:j.inputSource}))}function P(){s.removeEventListener("select",R),s.removeEventListener("selectstart",R),s.removeEventListener("selectend",R),s.removeEventListener("squeeze",R),s.removeEventListener("squeezestart",R),s.removeEventListener("squeezeend",R),s.removeEventListener("end",P),s.removeEventListener("inputsourceschange",U);for(let j=0;j<w.length;j++){let le=A[j];le!==null&&(A[j]=null,w[j].disconnect(le))}N=null,$=null,f.reset();for(let j in m)delete m[j];if(e.setRenderTarget(E),g=null,p=null,d=null,s=null,M=null,Ae.stop(),i.isPresenting=!1,e.setPixelRatio(T),e.setSize(_.width,_.height,!1),O!==null){let j=O.camera;j.fov=O.fov,j.zoom=O.zoom,j.updateProjectionMatrix(),O=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,i.isPresenting===!0&&ke("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,i.isPresenting===!0&&ke("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(j){l=j},this.getBaseLayer=function(){return p!==null?p:g},this.getBinding=function(){return d===null&&y&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(E=e.getRenderTarget(),s.addEventListener("select",R),s.addEventListener("selectstart",R),s.addEventListener("selectend",R),s.addEventListener("squeeze",R),s.addEventListener("squeezestart",R),s.addEventListener("squeezeend",R),s.addEventListener("end",P),s.addEventListener("inputsourceschange",U),v.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(_),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let ve=null,Ee=null,ue=null;v.depth&&(ue=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ve=v.stencil?fi:ai,Ee=v.stencil?Ki:Un);let ze={colorFormat:t.RGBA8,depthFormat:ue,scaleFactor:r};d=this.getBinding(),p=d.createProjectionLayer(ze),s.updateRenderState({layers:[p]}),e.setPixelRatio(1),e.setSize(p.textureWidth,p.textureHeight,!1),M=new mn(p.textureWidth,p.textureHeight,{format:Fn,type:hn,depthTexture:new hi(p.textureWidth,p.textureHeight,Ee,void 0,void 0,void 0,void 0,void 0,void 0,ve),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}else{let ve={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};g=new XRWebGLLayer(s,t,ve),s.updateRenderState({baseLayer:g}),e.setPixelRatio(1),e.setSize(g.framebufferWidth,g.framebufferHeight,!1),M=new mn(g.framebufferWidth,g.framebufferHeight,{format:Fn,type:hn,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1,storeMultisampledDepthBuffer:g.ignoreDepthValues===!1,storeMultisampledStencilBuffer:g.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Ae.setContext(s),Ae.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};function U(j){for(let le=0;le<j.removed.length;le++){let ve=j.removed[le],Ee=A.indexOf(ve);Ee>=0&&(A[Ee]=null,w[Ee].disconnect(ve))}for(let le=0;le<j.added.length;le++){let ve=j.added[le],Ee=A.indexOf(ve);if(Ee===-1){for(let ze=0;ze<w.length;ze++)if(ze>=A.length){A.push(ve),Ee=ze;break}else if(A[ze]===null){A[ze]=ve,Ee=ze;break}if(Ee===-1)break}let ue=w[Ee];ue&&ue.connect(ve)}}function F(j,le){le===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(le.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let le=j.near,ve=j.far;f.texture!==null&&(f.depthNear>0&&(le=f.depthNear),f.depthFar>0&&(ve=f.depthFar)),Z.near=B.near=I.near=le,Z.far=B.far=I.far=ve,(N!==Z.near||$!==Z.far)&&(s.updateRenderState({depthNear:Z.near,depthFar:Z.far}),N=Z.near,$=Z.far),Z.layers.mask=j.layers.mask|6,I.layers.mask=Z.layers.mask&-5,B.layers.mask=Z.layers.mask&-3;let Ee=j.parent,ue=Z.cameras;F(Z,Ee);for(let ze=0;ze<ue.length;ze++)F(ue[ze],Ee);Z.projectionMatrix.copy(I.projectionMatrix),Z.projectionMatrixInverse.copy(I.projectionMatrixInverse),O===null&&j.isPerspectiveCamera&&(O={camera:j,fov:j.fov,zoom:j.zoom}),G(j,Z,Ee)};function G(j,le,ve){ve===null?j.matrix.copy(le.matrixWorld):(j.matrix.copy(ve.matrixWorld),j.matrix.invert(),j.matrix.multiply(le.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(le.projectionMatrix),j.projectionMatrixInverse.copy(le.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=xr*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return Z},this.getFoveation=function(){if(!(p===null&&g===null))return c},this.setFoveation=function(j){c=j,p!==null&&(p.fixedFoveation=j),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=j)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(Z)},this.getCameraTexture=function(j){return m[j]};let te=null;function ce(j,le){if(h=le.getViewerPose(l||o),x=le,h!==null){let ve=h.views;g!==null&&(e.setRenderTargetFramebuffer(M,g.framebuffer),e.setRenderTarget(M));let Ee=!1;ve.length!==Z.cameras.length&&(Z.cameras.length=0,Ee=!0);for(let Oe=0;Oe<ve.length;Oe++){let ct=ve[Oe],ut=null;if(g!==null)ut=g.getViewport(ct);else{let Wt=d.getViewSubImage(p,ct);ut=Wt.viewport,Oe===0&&(e.setRenderTargetTextures(M,Wt.colorTexture,Wt.depthStencilTexture),e.setRenderTarget(M))}let je=H[Oe];je===void 0&&(je=new qt,je.layers.enable(Oe),je.viewport=new yt,H[Oe]=je),je.matrix.fromArray(ct.transform.matrix),je.matrix.decompose(je.position,je.quaternion,je.scale),je.projectionMatrix.fromArray(ct.projectionMatrix),je.projectionMatrixInverse.copy(je.projectionMatrix).invert(),je.viewport.set(ut.x,ut.y,ut.width,ut.height),Oe===0&&(Z.matrix.copy(je.matrix),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale)),Ee===!0&&Z.cameras.push(je)}let ue=s.enabledFeatures;if(ue&&ue.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&y){d=i.getBinding();let Oe=d.getDepthInformation(ve[0]);Oe&&Oe.isValid&&Oe.texture&&f.init(Oe,s.renderState)}if(ue&&ue.includes("camera-access")&&y){e.state.unbindTexture(),d=i.getBinding();for(let Oe=0;Oe<ve.length;Oe++){let ct=ve[Oe].camera;if(ct){let ut=m[ct];ut||(ut=new Cr,m[ct]=ut);let je=d.getCameraImage(ct);ut.sourceTexture=je}}}}for(let ve=0;ve<w.length;ve++){let Ee=A[ve],ue=w[ve];Ee!==null&&ue!==void 0&&ue.update(Ee,le,l||o)}te&&te(j,le),le.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:le}),x=null}let Ae=new Wf;Ae.setAnimationLoop(ce),this.setAnimationLoop=function(j){te=j},this.dispose=function(){}}},Uy=new mt,ep=new Ge;ep.set(-1,0,0,0,1,0,0,0,1);function Oy(n,e){function t(f,m){f.matrixAutoUpdate===!0&&f.updateMatrix(),m.value.copy(f.matrix)}function i(f,m){m.color.getRGB(f.fogColor.value,sh(n)),m.isFog?(f.fogNear.value=m.near,f.fogFar.value=m.far):m.isFogExp2&&(f.fogDensity.value=m.density)}function s(f,m,v,E,M){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(f,m):m.isMeshLambertMaterial?(r(f,m),m.envMap&&(f.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(f,m),d(f,m)):m.isMeshPhongMaterial?(r(f,m),h(f,m),m.envMap&&(f.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(f,m),p(f,m),m.isMeshPhysicalMaterial&&g(f,m,M)):m.isMeshMatcapMaterial?(r(f,m),x(f,m)):m.isMeshDepthMaterial?r(f,m):m.isMeshDistanceMaterial?(r(f,m),y(f,m)):m.isMeshNormalMaterial?r(f,m):m.isLineBasicMaterial?(o(f,m),m.isLineDashedMaterial&&a(f,m)):m.isPointsMaterial?c(f,m,v,E):m.isSpriteMaterial?l(f,m):m.isShadowMaterial?(f.color.value.copy(m.color),f.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(f,m){f.opacity.value=m.opacity,m.color&&f.diffuse.value.copy(m.color),m.emissive&&f.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(f.map.value=m.map,t(m.map,f.mapTransform)),m.alphaMap&&(f.alphaMap.value=m.alphaMap,t(m.alphaMap,f.alphaMapTransform)),m.bumpMap&&(f.bumpMap.value=m.bumpMap,t(m.bumpMap,f.bumpMapTransform),f.bumpScale.value=m.bumpScale,m.side===on&&(f.bumpScale.value*=-1)),m.normalMap&&(f.normalMap.value=m.normalMap,t(m.normalMap,f.normalMapTransform),f.normalScale.value.copy(m.normalScale),m.side===on&&f.normalScale.value.negate()),m.displacementMap&&(f.displacementMap.value=m.displacementMap,t(m.displacementMap,f.displacementMapTransform),f.displacementScale.value=m.displacementScale,f.displacementBias.value=m.displacementBias),m.emissiveMap&&(f.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,f.emissiveMapTransform)),m.specularMap&&(f.specularMap.value=m.specularMap,t(m.specularMap,f.specularMapTransform)),m.alphaTest>0&&(f.alphaTest.value=m.alphaTest);let v=e.get(m),E=v.envMap,M=v.envMapRotation;E&&(f.envMap.value=E,f.envMapRotation.value.setFromMatrix4(Uy.makeRotationFromEuler(M)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&f.envMapRotation.value.premultiply(ep),f.reflectivity.value=m.reflectivity,f.ior.value=m.ior,f.refractionRatio.value=m.refractionRatio),m.lightMap&&(f.lightMap.value=m.lightMap,f.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,f.lightMapTransform)),m.aoMap&&(f.aoMap.value=m.aoMap,f.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,f.aoMapTransform))}function o(f,m){f.diffuse.value.copy(m.color),f.opacity.value=m.opacity,m.map&&(f.map.value=m.map,t(m.map,f.mapTransform))}function a(f,m){f.dashSize.value=m.dashSize,f.totalSize.value=m.dashSize+m.gapSize,f.scale.value=m.scale}function c(f,m,v,E){f.diffuse.value.copy(m.color),f.opacity.value=m.opacity,f.size.value=m.size*v,f.scale.value=E*.5,m.map&&(f.map.value=m.map,t(m.map,f.uvTransform)),m.alphaMap&&(f.alphaMap.value=m.alphaMap,t(m.alphaMap,f.alphaMapTransform)),m.alphaTest>0&&(f.alphaTest.value=m.alphaTest)}function l(f,m){f.diffuse.value.copy(m.color),f.opacity.value=m.opacity,f.rotation.value=m.rotation,m.map&&(f.map.value=m.map,t(m.map,f.mapTransform)),m.alphaMap&&(f.alphaMap.value=m.alphaMap,t(m.alphaMap,f.alphaMapTransform)),m.alphaTest>0&&(f.alphaTest.value=m.alphaTest)}function h(f,m){f.specular.value.copy(m.specular),f.shininess.value=Math.max(m.shininess,1e-4)}function d(f,m){m.gradientMap&&(f.gradientMap.value=m.gradientMap)}function p(f,m){f.metalness.value=m.metalness,m.metalnessMap&&(f.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,f.metalnessMapTransform)),f.roughness.value=m.roughness,m.roughnessMap&&(f.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,f.roughnessMapTransform)),m.envMap&&(f.envMapIntensity.value=m.envMapIntensity)}function g(f,m,v){f.ior.value=m.ior,m.diffuseRoughness>0&&(f.diffuseRoughness.value=m.diffuseRoughness,m.diffuseRoughnessMap&&(f.diffuseRoughnessMap.value=m.diffuseRoughnessMap,t(m.diffuseRoughnessMap,f.diffuseRoughnessMapTransform))),m.sheen>0&&(f.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),f.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(f.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,f.sheenColorMapTransform)),m.sheenRoughnessMap&&(f.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,f.sheenRoughnessMapTransform))),m.clearcoat>0&&(f.clearcoat.value=m.clearcoat,f.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(f.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,f.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(f.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===on&&f.clearcoatNormalScale.value.negate())),m.dispersion>0&&(f.dispersion.value=m.dispersion),m.retroreflectivity>0&&(f.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(f.iridescence.value=m.iridescence,f.iridescenceIOR.value=m.iridescenceIOR,f.iridescenceThicknessMinimum.value=m.iridescenceThicknessMinimum,f.iridescenceThicknessMaximum.value=m.iridescenceThicknessMaximum,m.iridescenceMap&&(f.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,f.iridescenceMapTransform)),m.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),m.transmission>0&&(f.transmission.value=m.transmission,f.transmissionSamplerMap.value=v.texture,f.transmissionSamplerSize.value.set(v.width,v.height),m.transmissionMap&&(f.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,f.transmissionMapTransform)),f.thickness.value=m.thickness,m.thicknessMap&&(f.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=m.attenuationDistance,f.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(f.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(f.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=m.specularIntensity,f.specularColor.value.copy(m.specularColor),m.specularColorMap&&(f.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,f.specularColorMapTransform)),m.specularIntensityMap&&(f.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,f.specularIntensityMapTransform))}function x(f,m){m.matcap&&(f.matcap.value=m.matcap)}function y(f,m){let v=e.get(m).light;f.referencePosition.value.setFromMatrixPosition(v.matrixWorld),f.nearDistance.value=v.shadow.camera.near,f.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function ky(n,e,t,i){let s={},r={};function o(v,E){let M=E.program;i.uniformBlockBinding(v,M,s[v.id])}function a(v,E){let M=s[v.id];M===void 0&&(x(v),M=c(v),s[v.id]=M,v.addEventListener("dispose",f));let w=E.program;i.updateUBOMapping(v,w);let A=e.render.frame;r[v.id]!==A&&(l(v),r[v.id]=A)}function c(v){let E=n.createBuffer(),M=v.__size,w=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,M,w),n.bindBuffer(n.UNIFORM_BUFFER,null),E}function l(v){let E=s[v.id],M=v.uniforms,w=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,E);for(let A=0,_=M.length;A<_;A++){let T=M[A];if(Array.isArray(T))for(let O=0,I=T.length;O<I;O++)h(T[O],A,O,w);else h(T,A,0,w)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function h(v,E,M,w){if(p(v,E,M,w)===!0){let A=v.__offset,_=v.value;if(Array.isArray(_)){let T=0;for(let O=0;O<_.length;O++){let I=_[O],B=y(I,!0);d(I,v.__data,T),T+=B.storage/Float32Array.BYTES_PER_ELEMENT}}else d(_,v.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,A,v.__data)}}function d(v,E,M){typeof v=="number"||typeof v=="boolean"?E[M]=v:v.isMatrix3?(E[M]=v.elements[0],E[M+1]=v.elements[1],E[M+2]=v.elements[2],E[M+3]=0,E[M+4]=v.elements[3],E[M+5]=v.elements[4],E[M+6]=v.elements[5],E[M+7]=0,E[M+8]=v.elements[6],E[M+9]=v.elements[7],E[M+10]=v.elements[8],E[M+11]=0):ArrayBuffer.isView(v)?E.set(v.subarray(0,E.length-M),M):v.toArray(E,M)}function p(v,E,M,w){let A=v.value,_=E+"_"+M;if(Array.isArray(A)){w[_]===void 0&&(w[_]=[]);let T=w[_],O=!1;for(let I=0;I<A.length;I++)g(A[I],T,I)===!0&&(O=!0);return O}return g(A,w,_)}function g(v,E,M){if(E[M]===void 0)return typeof v=="number"||typeof v=="boolean"?E[M]=v:ArrayBuffer.isView(v)?E[M]=v.slice():E[M]=v.clone(),!0;{let w=E[M];if(typeof v=="number"||typeof v=="boolean"){if(w!==v)return E[M]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(w.equals(v)===!1)return w.copy(v),!0}}return!1}function x(v){let E=v.uniforms,M=0,w=16;for(let _=0,T=E.length;_<T;_++){let O=Array.isArray(E[_])?E[_]:[E[_]];for(let I=0,B=O.length;I<B;I++){let H=O[I],Z=Array.isArray(H.value)?H.value:[H.value],N=Array.isArray(E[_])||Array.isArray(H.value),$=M;for(let P=0,U=Z.length;P<U;P++){let F=Z[P],G=y(F,N),te=M%w,ce=te%G.boundary,Ae=te+ce;M+=ce,Ae!==0&&w-Ae<G.storage&&(M+=w-Ae),P===0&&($=M),M+=G.storage}let R=H.type==="int"?Int32Array:H.type==="uint"?Uint32Array:Float32Array;H.__data=new R((M-$)/Float32Array.BYTES_PER_ELEMENT),H.__offset=$}}let A=M%w;return A>0&&(M+=w-A),v.__size=M,v.__cache={},this}function y(v,E){let M={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(M.boundary=4,M.storage=4):v.isVector2?(M.boundary=8,M.storage=8):v.isVector3||v.isColor?(M.boundary=16,M.storage=12):v.isVector4?(M.boundary=16,M.storage=16):v.isMatrix3?(M.boundary=16,M.storage=48):v.isMatrix4?(M.boundary=16,M.storage=64):v.isTexture?ke("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(M.boundary=16,M.storage=v.byteLength):ke("WebGLRenderer: Unsupported uniform value type.",v),E===!0&&(M.boundary=16,M.storage=Math.ceil(M.storage/16)*16),M}function f(v){let E=v.target;E.removeEventListener("dispose",f),n.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function m(){for(let v in s)n.deleteBuffer(s[v]);s={},r={}}return{bind:o,update:a,dispose:m}}var Fy=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Jn=null;function By(){return Jn===null&&(Jn=new oa(Fy,16,16,Ui,kn),Jn.name="DFG_LUT",Jn.minFilter=nn,Jn.magFilter=nn,Jn.wrapS=Vn,Jn.wrapT=Vn,Jn.generateMipmaps=!1,Jn.needsUpdate=!0),Jn}var mc=class{constructor(e={}){let{canvas:t=uf(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:p=!1,outputBufferType:g=hn}=e;this.isWebGLRenderer=!0;let x;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=i.getContextAttributes().alpha}else x=o;let y=g,f=new Set([Da,La,Ia]),m=new Set([hn,Un,Vs,Ki,Ra,Pa]),v=new Uint32Array(4),E=new Int32Array(4),M={textures:[],min:[],max:[],resolution:[]},w=null,A=null,_=[],T=[],O=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Zn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,B=!1,H=null,Z=null,N=null,$=null;this._outputColorSpace=wt;let R=0,P=0,U=null,F=-1,G=null,te=new yt,ce=new yt,Ae=null,j=new Xe(0),le=0,ve=t.width,Ee=t.height,ue=1,ze=null,ot=null,Oe=new yt(0,0,ve,Ee),ct=new yt(0,0,ve,Ee),ut=!1,je=new Ai,Wt=new aa,Dt=!1,cn=!1,St=new mt,Gn=new V,kt=new yt,_n={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},yn=!1;function vn(){return U===null?ue:1}let z=i;function Sn(b,k){return t.getContext(b,k)}let xt,_t,ye,Nt,Ue,Ve,C,S,q,oe,se,de,xe,ee,ne,pe,D,ie,K,me,he,fe,De;try{let b={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"187"}`),t.addEventListener("webglcontextlost",Ne,!1),t.addEventListener("webglcontextrestored",Ze,!1),t.addEventListener("webglcontextcreationerror",Se,!1),z===null){let k="webgl2";if(z=Sn(k,b),z===null)throw Sn(k)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Je()}catch(b){throw t.removeEventListener("webglcontextlost",Ne,!1),t.removeEventListener("webglcontextrestored",Ze,!1),t.removeEventListener("webglcontextcreationerror",Se,!1),Fe("WebGLRenderer: "+b.message),b}function Je(){xt=new $x(z),xt.init(),he=new Ly(z,xt),_t=new Bx(z,xt,e,he),ye=new Py(z,xt),_t.reversedDepthBuffer&&p&&ye.buffers.depth.setReversed(!0),Z=z.createFramebuffer(),N=z.createFramebuffer(),$=z.createFramebuffer(),Nt=new Qx(z),Ue=new gy,Ve=new Iy(z,xt,ye,Ue,_t,he,Nt),C=new Jx(I),S=new t0(z),fe=new kx(z,S),q=new jx(z,S,Nt,fe),oe=new t_(z,q,S,fe,Nt),ie=new e_(z,_t,Ve),ne=new zx(Ue),se=new my(I,C,xt,_t,fe,ne),de=new Oy(I,Ue),xe=new _y,ee=new Ty(xt),D=new Ox(I,C,ye,oe,x,c),pe=new Ry(I,oe,_t),De=new ky(z,Nt,_t,ye),K=new Fx(z,xt,Nt),me=new Kx(z,xt,Nt),Nt.programs=se.programs,I.capabilities=_t,I.extensions=xt,I.properties=Ue,I.renderLists=xe,I.shadowMap=pe,I.state=ye,I.info=Nt}y!==hn&&(O=new i_(y,t.width,t.height,a,s,r));let ae=new bh(I,z);this.xr=ae,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){let b=xt.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=xt.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return ue},this.setPixelRatio=function(b){b!==void 0&&(ue=b,this.setSize(ve,Ee,!1))},this.getSize=function(b){return b.set(ve,Ee)},this.setSize=function(b,k,J=!0){if(ae.isPresenting){ke("WebGLRenderer: Can't change size while VR device is presenting.");return}ve=b,Ee=k,t.width=Math.floor(b*ue),t.height=Math.floor(k*ue),J===!0&&(t.style.width=b+"px",t.style.height=k+"px"),O!==null&&O.setSize(t.width,t.height),this.setViewport(0,0,b,k)},this.getDrawingBufferSize=function(b){return b.set(ve*ue,Ee*ue).floor()},this.setDrawingBufferSize=function(b,k,J){ve=b,Ee=k,ue=J,t.width=Math.floor(b*J),t.height=Math.floor(k*J),this.setViewport(0,0,b,k)},this.setEffects=function(b){if(y===hn){Fe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let k=0;k<b.length;k++)if(b[k].isOutputPass===!0){ke("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}O.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(te)},this.getViewport=function(b){return b.copy(Oe)},this.setViewport=function(b,k,J,X){b.isVector4?Oe.set(b.x,b.y,b.z,b.w):Oe.set(b,k,J,X),ye.viewport(te.copy(Oe).multiplyScalar(vn()).round())},this.getScissor=function(b){return b.copy(ct)},this.setScissor=function(b,k,J,X){b.isVector4?ct.set(b.x,b.y,b.z,b.w):ct.set(b,k,J,X),ye.scissor(ce.copy(ct).multiplyScalar(vn()).round())},this.getScissorTest=function(){return ut},this.setScissorTest=function(b){ye.setScissorTest(ut=b)},this.setOpaqueSort=function(b){ze=b},this.setTransparentSort=function(b){ot=b},this.getClearColor=function(b){return b.copy(D.getClearColor())},this.setClearColor=function(){D.setClearColor(...arguments)},this.getClearAlpha=function(){return D.getClearAlpha()},this.setClearAlpha=function(){D.setClearAlpha(...arguments)},this.clear=function(b=!0,k=!0,J=!0){let X=0;if(b){let Y=!1;if(U!==null){let _e=U.texture.format;Y=f.has(_e)}if(Y){let _e=U.texture.type,we=m.has(_e),ge=D.getClearColor(),Me=D.getClearAlpha(),Ie=ge.r,We=ge.g,Ke=ge.b;we?(v[0]=Ie,v[1]=We,v[2]=Ke,v[3]=Me,z.clearBufferuiv(z.COLOR,0,v)):(E[0]=Ie,E[1]=We,E[2]=Ke,E[3]=Me,z.clearBufferiv(z.COLOR,0,E))}else X|=z.COLOR_BUFFER_BIT}k&&(X|=z.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),J&&(X|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),X!==0&&z.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),H=b},this.dispose=function(){t.removeEventListener("webglcontextlost",Ne,!1),t.removeEventListener("webglcontextrestored",Ze,!1),t.removeEventListener("webglcontextcreationerror",Se,!1),D.dispose(),xe.dispose(),ee.dispose(),Ve.dispose(),Ue.dispose(),C.dispose(),oe.dispose(),q.dispose(),fe.dispose(),De.dispose(),se.dispose(),ae.dispose(),ae.removeEventListener("sessionstart",Yu),ae.removeEventListener("sessionend",Zu),Bi.stop()};function Ne(b){b.preventDefault(),gr("WebGLRenderer: Context Lost."),B=!0}function Ze(){gr("WebGLRenderer: Context Restored."),B=!1;let b=Nt.autoReset,k=pe.enabled,J=pe.autoUpdate,X=pe.needsUpdate,Y=pe.type;Je(),Nt.autoReset=b,pe.enabled=k,pe.autoUpdate=J,pe.needsUpdate=X,pe.type=Y}function Se(b){Fe("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function lt(b){let k=b.target;k.removeEventListener("dispose",lt),Ft(k)}function Ft(b){_i(b),Ue.remove(b)}function _i(b){let k=Ue.get(b).programs;k!==void 0&&(k.forEach(function(J){se.releaseProgram(J)}),b.isShaderMaterial&&se.releaseShaderCache(b))}this.renderBufferDirect=function(b,k,J,X,Y,_e){k===null&&(k=_n);let we=Y.isMesh&&Y.matrixWorld.determinantAffine()<0,ge=im(b,k,J,X,Y);ye.setMaterial(X,we);let Me=J.index,Ie=1;if(X.wireframe===!0){if(Me=q.getWireframeAttribute(J),Me===void 0)return;Ie=2}let We=J.drawRange,Ke=J.attributes.position,Ce=We.start*Ie,Qe=(We.start+We.count)*Ie;_e!==null&&(Ce=Math.max(Ce,_e.start*Ie),Qe=Math.min(Qe,(_e.start+_e.count)*Ie)),Me!==null?(Ce=Math.max(Ce,0),Qe=Math.min(Qe,Me.count)):Ke!=null&&(Ce=Math.max(Ce,0),Qe=Math.min(Qe,Ke.count));let Ct=Qe-Ce;if(Ct<0||Ct===1/0)return;fe.setup(Y,X,ge,J,Me);let pt,dt=K;if(Me!==null&&(pt=S.get(Me),dt=me,dt.setIndex(pt)),Y.isMesh)X.wireframe===!0?(ye.setLineWidth(X.wireframeLinewidth*vn()),dt.setMode(z.LINES)):dt.setMode(z.TRIANGLES);else if(Y.isLine){let Yt=X.linewidth;Yt===void 0&&(Yt=1),ye.setLineWidth(Yt*vn()),Y.isLineSegments?dt.setMode(z.LINES):Y.isLineLoop?dt.setMode(z.LINE_LOOP):dt.setMode(z.LINE_STRIP)}else Y.isPoints?dt.setMode(z.POINTS):Y.isSprite&&dt.setMode(z.TRIANGLES);if(Y.isBatchedMesh)if(xt.get("WEBGL_multi_draw"))dt.renderMultiDraw(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount);else{let Yt=Y._multiDrawStarts,Re=Y._multiDrawCounts,en=Y._multiDrawCount,st=Me?S.get(Me).bytesPerElement:1,zi=Ue.get(X).currentProgram.getUniforms();for(let Zt=0;Zt<en;Zt++)zi.setValue(z,"_gl_DrawID",Zt),dt.render(Yt[Zt]/st,Re[Zt])}else if(Y.isInstancedMesh)dt.renderInstances(Ce,Ct,Y.count);else if(J.isInstancedBufferGeometry){let Yt=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,Re=Math.min(J.instanceCount,Yt);dt.renderInstances(Ce,Ct,Re)}else dt.render(Ce,Ct)};function qu(b,k,J,X){H!==null&&b.isNodeMaterial&&H.setObject(X,b),Dt===!0&&ne.setState(b,J,!1),b.transparent===!0&&b.side===En&&b.forceSinglePass===!1?(b.side=on,b.needsUpdate=!0,nr(b,k,X),b.side=Di,b.needsUpdate=!0,nr(b,k,X),b.side=En):nr(b,k,X)}this.compile=function(b,k,J=null){J===null&&(J=b),H!==null&&H.renderStart(b,k,J),A=ee.get(J),A.init(k),T.push(A),J.traverseVisible(function(Y){Y.isLight&&Y.layers.test(k.layers)&&(A.pushLight(Y),Y.castShadow&&A.pushShadow(Y))}),b!==J&&b.traverseVisible(function(Y){Y.isLight&&Y.layers.test(k.layers)&&(A.pushLight(Y),Y.castShadow&&A.pushShadow(Y))}),A.setupLights(),H!==null&&H.updateLights(A.state.lightsArray),cn=this.localClippingEnabled,Dt=ne.init(this.clippingPlanes,cn),Dt===!0&&ne.setGlobalState(this.clippingPlanes,k),H!==null&&pe.render(A.state.shadowsArray,J,k);let X=new Set;return b.traverse(function(Y){if(!(Y.isMesh||Y.isPoints||Y.isLine||Y.isSprite))return;let _e=Y.material;if(_e)if(Array.isArray(_e))for(let we=0;we<_e.length;we++){let ge=_e[we];qu(ge,J,k,Y),X.add(ge)}else qu(_e,J,k,Y),X.add(_e)}),A=T.pop(),H!==null&&H.renderEnd(),X},this.compileAsync=function(b,k,J=null){let X=this.compile(b,k,J);return new Promise(Y=>{function _e(){if(X.forEach(function(we){let Me=Ue.get(we).currentProgram;(Me===void 0||Me.isReady())&&X.delete(we)}),X.size===0){Y(b);return}setTimeout(_e,10)}xt.get("KHR_parallel_shader_compile")!==null?_e():setTimeout(_e,10)})};let jc=null;function tm(b){jc&&jc(b)}function Yu(){Bi.stop()}function Zu(){Bi.start()}let Bi=new Wf;Bi.setAnimationLoop(tm),typeof self<"u"&&Bi.setContext(self),this.setAnimationLoop=function(b){jc=b,ae.setAnimationLoop(b),b===null?Bi.stop():Bi.start()},ae.addEventListener("sessionstart",Yu),ae.addEventListener("sessionend",Zu),this.render=function(b,k){if(k!==void 0&&k.isCamera!==!0){Fe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(B===!0)return;H!==null&&H.renderStart(b,k);let J=ae.enabled===!0&&ae.isPresenting===!0,X=O!==null&&(U===null||J)&&O.begin(I,U);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),ae.enabled===!0&&ae.isPresenting===!0&&(O===null||O.isCompositing()===!1)&&(ae.cameraAutoUpdate===!0&&ae.updateCamera(k),k=ae.getCamera()),b.isScene===!0&&b.onBeforeRender(I,b,k,U),A=ee.get(b,T.length),A.init(k),A.state.textureUnits=Ve.getTextureUnits(),T.push(A),St.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),k.isArrayCamera?Wt.setFromArrayCamera(k):je.setFromProjectionMatrix(St,Mn,k.reversedDepth),cn=this.localClippingEnabled,Dt=ne.init(this.clippingPlanes,cn),w=xe.get(b,_.length),w.init(),_.push(w),this.info.render.frame++,ae.enabled===!0&&ae.isPresenting===!0){let we=I.xr.getDepthSensingMesh();we!==null&&Kc(we,k,-1/0,I.sortObjects)}Kc(b,k,0,I.sortObjects),w.finish(),H!==null&&H.updateLights(A.state.lightsArray),I.sortObjects===!0&&w.sort(ze,ot),yn=ae.enabled===!1||ae.isPresenting===!1||ae.hasDepthSensing()===!1,yn&&D.addToRenderList(w,b),this.info.autoReset===!0&&this.info.reset(),Dt===!0&&ne.beginShadows();let Y=A.state.shadowsArray;if(pe.render(Y,b,k),Dt===!0&&ne.endShadows(),(X&&O.hasRenderPass())===!1){let we=w.opaque,ge=w.transmissive;if(A.setupLights(),k.isArrayCamera){let Me=k.cameras;if(ge.length>0)for(let Ie=0,We=Me.length;Ie<We;Ie++){let Ke=Me[Ie];$u(we,ge,b,Ke)}yn&&D.render(b);for(let Ie=0,We=Me.length;Ie<We;Ie++){let Ke=Me[Ie];Ju(w,b,Ke,Ke.viewport)}}else ge.length>0&&$u(we,ge,b,k),yn&&D.render(b),Ju(w,b,k)}U!==null&&P===0&&(Ve.updateMultisampleRenderTarget(U),Ve.updateRenderTargetMipmap(U)),X&&O.end(I),b.isScene===!0&&b.onAfterRender(I,b,k),fe.resetDefaultState(),F=-1,G=null,T.pop(),T.length>0?(A=T[T.length-1],Ve.setTextureUnits(A.state.textureUnits),Dt===!0&&ne.setGlobalState(I.clippingPlanes,A.state.camera)):A=null,_.pop(),_.length>0?w=_[_.length-1]:w=null,H!==null&&H.renderEnd()};function Kc(b,k,J,X){if(b.visible===!1)return;if(b.layers.test(k.layers)){if(b.isGroup)J=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(k);else if(b.isLight)A.pushLight(b),b.castShadow&&A.pushShadow(b);else if(b.isSprite){let we=k.isArrayCamera?Wt:je;if(!b.frustumCulled||b.intersectsFrustum(we)){X&&kt.setFromMatrixPosition(b.matrixWorld).applyMatrix4(St);let ge=oe.update(b),Me=b.material;Me.visible&&w.push(b,ge,Me,J,kt.z,null,k)}}else if(b.isMesh||b.isLine||b.isPoints){let we=k.isArrayCamera?Wt:je;if(!b.frustumCulled||b.intersectsFrustum(we)){let ge=oe.update(b),Me=b.material;if(X&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),kt.copy(b.boundingSphere.center)):(ge.boundingSphere===null&&ge.computeBoundingSphere(),kt.copy(ge.boundingSphere.center)),kt.applyMatrix4(b.matrixWorld).applyMatrix4(St)),Array.isArray(Me)){let Ie=ge.groups;for(let We=0,Ke=Ie.length;We<Ke;We++){let Ce=Ie[We],Qe=Me[Ce.materialIndex];Qe&&Qe.visible&&w.push(b,ge,Qe,J,kt.z,Ce,k)}}else Me.visible&&w.push(b,ge,Me,J,kt.z,null,k)}}}let _e=b.children;for(let we=0,ge=_e.length;we<ge;we++)Kc(_e[we],k,J,X)}function Ju(b,k,J,X){let{opaque:Y,transmissive:_e,transparent:we}=b;A.setupLightsView(J),Dt===!0&&ne.setGlobalState(I.clippingPlanes,J),X&&ye.viewport(te.copy(X)),Y.length>0&&_o(Y,k,J),_e.length>0&&_o(_e,k,J),we.length>0&&_o(we,k,J),ye.buffers.depth.setTest(!0),ye.buffers.depth.setMask(!0),ye.buffers.color.setMask(!0),ye.setPolygonOffset(!1)}function $u(b,k,J,X){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[X.id]===void 0){let Ce=xt.has("EXT_color_buffer_half_float")||xt.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[X.id]=new mn(1,1,{generateMipmaps:!0,type:Ce?kn:hn,minFilter:di,samples:Math.max(4,_t.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:et.workingColorSpace})}let _e=A.state.transmissionRenderTarget[X.id],we=X.viewport||te;_e.setSize(we.z*I.transmissionResolutionScale,we.w*I.transmissionResolutionScale);let ge=I.getRenderTarget(),Me=I.getActiveCubeFace(),Ie=I.getActiveMipmapLevel();I.setRenderTarget(_e),I.getClearColor(j),le=I.getClearAlpha(),le<1&&I.setClearColor(16777215,.5),I.clear(),yn&&D.render(J);let We=I.toneMapping;I.toneMapping=Zn;let Ke=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),A.setupLightsView(X),Dt===!0&&ne.setGlobalState(I.clippingPlanes,X),_o(b,J,X),Ve.updateMultisampleRenderTarget(_e),Ve.updateRenderTargetMipmap(_e),xt.has("WEBGL_multisampled_render_to_texture")===!1){let Ce=!1;for(let Qe=0,Ct=k.length;Qe<Ct;Qe++){let pt=k[Qe],{object:dt,geometry:Yt,material:Re,group:en}=pt;if(Re.side===En&&dt.layers.test(X.layers)){let st=Re.side;Re.side=on,Re.needsUpdate=!0,ju(dt,J,X,Yt,Re,en),Re.side=st,Re.needsUpdate=!0,Ce=!0}}Ce===!0&&(Ve.updateMultisampleRenderTarget(_e),Ve.updateRenderTargetMipmap(_e))}I.setRenderTarget(ge,Me,Ie),I.setClearColor(j,le),Ke!==void 0&&(X.viewport=Ke),I.toneMapping=We}function _o(b,k,J){let X=k.isScene===!0?k.overrideMaterial:null;for(let Y=0,_e=b.length;Y<_e;Y++){let we=b[Y],{object:ge,geometry:Me,group:Ie}=we,We=we.material;We.allowOverride===!0&&X!==null&&(We=X),ge.layers.test(J.layers)&&ju(ge,k,J,Me,We,Ie)}}function ju(b,k,J,X,Y,_e){H!==null&&Y.isNodeMaterial&&H.setObject(b,Y),b.onBeforeRender(I,k,J,X,Y,_e),b.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),Y.onBeforeRender(I,k,J,X,b,_e),Y.transparent===!0&&Y.side===En&&Y.forceSinglePass===!1?(Y.side=on,Y.needsUpdate=!0,I.renderBufferDirect(J,k,X,Y,b,_e),Y.side=Di,Y.needsUpdate=!0,I.renderBufferDirect(J,k,X,Y,b,_e),Y.side=En):I.renderBufferDirect(J,k,X,Y,b,_e),b.onAfterRender(I,k,J,X,Y,_e)}function Ku(b){let k=0;for(let J of b)J.texture!==null&&k++;return k}function nr(b,k,J){k.isScene!==!0&&(k=_n);let X=Ue.get(b),Y=A.state.lights,_e=A.state.shadowsArray,we=Y.state.version,ge=se.getParameters(b,Y.state,_e,k,J,A.state.lightProbeGridArray),Me=se.getProgramCacheKey(ge),Ie=X.programs;X.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?k.environment:null,X.fog=k.fog;let We=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;X.envMap=C.get(b.envMap||X.environment,We),X.envMapRotation=X.environment!==null&&b.envMap===null?k.environmentRotation:b.envMapRotation,Ie===void 0&&(b.addEventListener("dispose",lt),Ie=new Map,X.programs=Ie,X.programVariants=new Map);let Ke=Ie.get(Me);if(Ke!==void 0){if(X.currentProgram===Ke&&X.lightsStateVersion===we)return ed(b,ge),Ke}else ge.uniforms=se.getUniforms(b),H!==null&&b.isNodeMaterial&&H.build(b,J,ge),b.onBeforeCompile(ge,I),Ke=se.acquireProgram(ge,Me),Ie.set(Me,Ke),X.uniforms=ge.uniforms;let Ce=X.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Ce.clippingPlanes=ne.uniform),ed(b,ge),X.needsLights=rm(b),X.lightsStateVersion=we,X.needsLights&&(Ce.ambientLightColor.value=Y.state.ambient,Ce.lightProbe.value=Y.state.probe,Ce.sunLights.value=Y.state.sun,Ce.sunLightShadows.value=Y.state.sunShadow,Ce.directionalLights.value=Y.state.directional,Ce.directionalLightShadows.value=Y.state.directionalShadow,Ce.spotLights.value=Y.state.spot,Ce.spotLightShadows.value=Y.state.spotShadow,Ce.rectAreaLights.value=Y.state.rectArea,Ce.ltc_1.value=Y.state.rectAreaLTC1,Ce.ltc_2.value=Y.state.rectAreaLTC2,Ce.pointLights.value=Y.state.point,Ce.pointLightShadows.value=Y.state.pointShadow,Ce.hemisphereLights.value=Y.state.hemi,Ce.sunShadowMatrix.value=Y.state.sunShadowMatrix,Ce.sunShadowCascade.value=Y.state.sunShadowCascade,Ce.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,Ce.spotLightMatrix.value=Y.state.spotLightMatrix,Ce.spotLightMap.value=Y.state.spotLightMap,Ce.pointShadowMatrix.value=Y.state.pointShadowMatrix),X.numLightProbeGrids=Ku(A.state.lightProbeGridArray),X.currentProgram=Ke,X.uniformsList=null,Ke}function nm(b,k,J,X,Y){let _e=Ue.get(b),we=_e.currentProgram.id+","+X+","+Y,ge=_e.programVariants.get(we);return ge===void 0?(ge=nr(b,k,J),_e.programVariants.set(we,ge)):(_e.currentProgram=ge,_e.uniformsList=null,_e.outputColorSpace=X,_e.toneMapping=Y),ge}function Qu(b){if(b.uniformsList===null){let k=b.currentProgram.getUniforms();b.uniformsList=Ws.seqWithValue(k.seq,b.uniforms)}return b.uniformsList}function ed(b,k){let J=Ue.get(b);J.outputColorSpace=k.outputColorSpace,J.batching=k.batching,J.batchingColor=k.batchingColor,J.instancing=k.instancing,J.instancingColor=k.instancingColor,J.instancingMorph=k.instancingMorph,J.skinning=k.skinning,J.morphTargets=k.morphTargets,J.morphNormals=k.morphNormals,J.morphColors=k.morphColors,J.morphTargetsCount=k.morphTargetsCount,J.numClippingPlanes=k.numClippingPlanes,J.numIntersection=k.numClipIntersection,J.vertexAlphas=k.vertexAlphas,J.vertexTangents=k.vertexTangents,J.toneMapping=k.toneMapping}function im(b,k,J,X,Y){k.isScene!==!0&&(k=_n),Ve.resetTextureUnits();let _e=k.fog,we=X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial?k.environment:null,ge=U===null?I.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:et.workingColorSpace,Me=X.isMeshStandardMaterial||X.isMeshLambertMaterial&&!X.envMap||X.isMeshPhongMaterial&&!X.envMap,Ie=C.get(X.envMap||we,Me),We=X.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,Ke=!!J.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Ce=!!J.morphAttributes.position,Qe=!!J.morphAttributes.normal,Ct=!!J.morphAttributes.color,pt=Zn;X.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(pt=I.toneMapping);let dt=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,Yt=dt!==void 0?dt.length:0,Re=Ue.get(X),en=A.state.lights;if(Dt===!0&&(cn===!0||b!==G)){let bt=b===G&&X.id===F;ne.setState(X,b,bt)}let st=!1,zi=!1;X.version===Re.__version?Re.needsLights&&Re.lightsStateVersion!==en.state.version||Y.isBatchedMesh&&Re.batching===!1||!Y.isBatchedMesh&&Re.batching===!0||Y.isBatchedMesh&&Re.batchingColor===!0&&Y._colorsTexture===null||Y.isBatchedMesh&&Re.batchingColor===!1&&Y._colorsTexture!==null||Y.isInstancedMesh&&Re.instancing===!1||!Y.isInstancedMesh&&Re.instancing===!0||Y.isSkinnedMesh&&Re.skinning===!1||!Y.isSkinnedMesh&&Re.skinning===!0||Y.isInstancedMesh&&Re.instancingColor===!0&&Y.instanceColor===null||Y.isInstancedMesh&&Re.instancingColor===!1&&Y.instanceColor!==null||Y.isInstancedMesh&&Re.instancingMorph===!0&&Y.morphTexture===null||Y.isInstancedMesh&&Re.instancingMorph===!1&&Y.morphTexture!==null||Re.envMap!==Ie||X.fog===!0&&Re.fog!==_e||Re.numClippingPlanes!==void 0&&(Re.numClippingPlanes!==ne.numPlanes||Re.numIntersection!==ne.numIntersection)||Re.vertexAlphas!==We||Re.vertexTangents!==Ke||Re.morphTargets!==Ce||Re.morphNormals!==Qe||Re.morphColors!==Ct||Re.morphTargetsCount!==Yt||Re.numLightProbeGrids!==Ku(A.state.lightProbeGridArray)?st=!0:(Re.outputColorSpace!==ge||Re.toneMapping!==pt)&&(zi=!0):(st=!0,Re.__version=X.version);let Zt=Re.currentProgram;(st===!0||zi===!0)&&(Zt=zi===!0?nm(X,k,Y,ge,pt):nr(X,k,Y),H&&X.isNodeMaterial&&H.onUpdateProgram(X,Zt,Re));let yo=!1,yi=!1,Gi=!1,it=Zt.getUniforms(),Xt=Re.uniforms;if(ye.useProgram(Zt.program)&&(yo=!0,yi=!0,Gi=!0),X.id!==F&&(F=X.id,yi=!0),yo||G!==b){ye.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),it.setValue(z,"projectionMatrix",b.projectionMatrix),it.setValue(z,"viewMatrix",b.matrixWorldInverse);let Bt=it.map.cameraPosition;Bt!==void 0&&Bt.setValue(z,Gn.setFromMatrixPosition(b.matrixWorld)),_t.logarithmicDepthBuffer&&it.setValue(z,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&it.setValue(z,"isOrthographic",b.isOrthographicCamera===!0),G!==b&&(G=b,yi=!0,Gi=!0)}if(Re.needsLights&&(en.state.sunShadowMap.length>0&&it.setValue(z,"sunShadowMap",en.state.sunShadowMap,Ve),en.state.directionalShadowMap.length>0&&it.setValue(z,"directionalShadowMap",en.state.directionalShadowMap,Ve),en.state.spotShadowMap.length>0&&it.setValue(z,"spotShadowMap",en.state.spotShadowMap,Ve),en.state.pointShadowMap.length>0&&it.setValue(z,"pointShadowMap",en.state.pointShadowMap,Ve)),Y.isSkinnedMesh){it.setOptional(z,Y,"bindMatrix"),it.setOptional(z,Y,"bindMatrixInverse");let bt=Y.skeleton;bt&&(bt.boneTexture===null&&bt.computeBoneTexture(),it.setValue(z,"boneTexture",bt.boneTexture,Ve))}Y.isBatchedMesh&&(it.setOptional(z,Y,"batchingTexture"),it.setValue(z,"batchingTexture",Y._matricesTexture,Ve),it.setOptional(z,Y,"batchingIdTexture"),it.setValue(z,"batchingIdTexture",Y._indirectTexture,Ve),it.setOptional(z,Y,"batchingColorTexture"),Y._colorsTexture!==null&&it.setValue(z,"batchingColorTexture",Y._colorsTexture,Ve));let An=J.morphAttributes;if((An.position!==void 0||An.normal!==void 0||An.color!==void 0)&&ie.update(Y,J,Zt),(yi||Re.receiveShadow!==Y.receiveShadow)&&(Re.receiveShadow=Y.receiveShadow,it.setValue(z,"receiveShadow",Y.receiveShadow)),(X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial)&&X.envMap===null&&k.environment!==null&&(Xt.envMapIntensity.value=k.environmentIntensity),Xt.dfgLUT!==void 0&&(Xt.dfgLUT.value=By()),yi){if(it.setValue(z,"toneMappingExposure",I.toneMappingExposure),Re.needsLights&&sm(Xt,Gi),_e&&X.fog===!0&&de.refreshFogUniforms(Xt,_e),de.refreshMaterialUniforms(Xt,X,ue,Ee,A.state.transmissionRenderTarget[b.id]),Re.needsLights&&Re.numLightProbeGrids>0){let bt=M,Bt=0;for(let Qn of A.state.lightProbeGridArray)Qn.texture!==null&&(bt.textures[Bt]=Qn.texture,bt.min[Bt]=Qn.boundingBox.min,bt.max[Bt]=Qn.boundingBox.max,bt.resolution[Bt]=Qn.resolution,Bt++);for(let Qn in bt)bt[Qn].length=Bt;Xt.probesSH.value=bt.textures,Xt.probesMin.value=bt.min,Xt.probesMax.value=bt.max,Xt.probesResolution.value=bt.resolution}Ws.upload(z,Qu(Re),Xt,Ve)}if(X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(Ws.upload(z,Qu(Re),Xt,Ve),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&it.setValue(z,"center",Y.center),it.setValue(z,"modelViewMatrix",Y.modelViewMatrix),it.setValue(z,"normalMatrix",Y.normalMatrix),it.setValue(z,"modelMatrix",Y.matrixWorld),X.uniformsGroups!==void 0){let bt=X.uniformsGroups;for(let Bt=0,Qn=bt.length;Bt<Qn;Bt++){let nd=bt[Bt];De.update(nd,Zt),De.bind(nd,Zt)}}return Zt}function sm(b,k){b.ambientLightColor.needsUpdate=k,b.lightProbe.needsUpdate=k,b.sunLights.needsUpdate=k,b.sunLightShadows.needsUpdate=k,b.directionalLights.needsUpdate=k,b.directionalLightShadows.needsUpdate=k,b.pointLights.needsUpdate=k,b.pointLightShadows.needsUpdate=k,b.spotLights.needsUpdate=k,b.spotLightShadows.needsUpdate=k,b.rectAreaLights.needsUpdate=k,b.hemisphereLights.needsUpdate=k}function rm(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(b,k,J){let X=Ue.get(b);X.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,X.__autoAllocateDepthBuffer===!1&&(X.__useRenderToTexture=!1),Ue.get(b.texture).__webglTexture=k,Ue.get(b.depthTexture).__webglTexture=X.__autoAllocateDepthBuffer?void 0:J,X.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,k){let J=Ue.get(b);J.__webglFramebuffer=k,J.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(b,k=0,J=0){U=b,R=k,P=J;let X=null,Y=!1,_e=!1;if(b){let ge=Ue.get(b);if(ge.__useDefaultFramebuffer!==void 0){ye.bindFramebuffer(z.FRAMEBUFFER,ge.__webglFramebuffer),te.copy(b.viewport),ce.copy(b.scissor),Ae=b.scissorTest,ye.viewport(te),ye.scissor(ce),ye.setScissorTest(Ae),F=-1;return}else if(ge.__webglFramebuffer===void 0)Ve.setupRenderTarget(b);else if(ge.__hasExternalTextures)Ve.rebindTextures(b,Ue.get(b.texture).__webglTexture,Ue.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){let We=b.depthTexture;if(ge.__boundDepthTexture!==We){if(We!==null&&Ue.has(We)&&(b.width!==We.image.width||b.height!==We.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Ve.setupDepthRenderbuffer(b)}}let Me=b.texture;(Me.isData3DTexture||Me.isDataArrayTexture||Me.isCompressedArrayTexture)&&(_e=!0);let Ie=Ue.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Ie[k])?X=Ie[k][J]:X=Ie[k],Y=!0):b.samples>0&&Ve.useMultisampledRTT(b)===!1?X=Ue.get(b).__webglMultisampledFramebuffer:Array.isArray(Ie)?X=Ie[J]:X=Ie,te.copy(b.viewport),ce.copy(b.scissor),Ae=b.scissorTest}else te.copy(Oe).multiplyScalar(ue).floor(),ce.copy(ct).multiplyScalar(ue).floor(),Ae=ut;if(J!==0&&(X=Z),ye.bindFramebuffer(z.FRAMEBUFFER,X)&&ye.drawBuffers(b,X),ye.viewport(te),ye.scissor(ce),ye.setScissorTest(Ae),Y){let ge=Ue.get(b.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+k,ge.__webglTexture,J)}else if(_e){let ge=k;for(let Me=0;Me<b.textures.length;Me++){let Ie=Ue.get(b.textures[Me]);z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0+Me,Ie.__webglTexture,J,ge)}}else if(b!==null&&J!==0){let ge=Ue.get(b.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,ge.__webglTexture,J)}F=-1};function td(b){let k=Ue.get(b);return(k.__readFormat!==b.format||k.__readType!==b.type)&&(k.__readFormat=b.format,k.__readType=b.type,k.__formatReadable=_t.textureFormatReadable(b.format),k.__typeReadable=_t.textureTypeReadable(b.type)),k}this.readRenderTargetPixels=function(b,k,J,X,Y,_e,we,ge=0){if(!(b&&b.isWebGLRenderTarget)){Fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Me=Ue.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&we!==void 0&&(Me=Me[we],Array.isArray(Me)&&(Me=Me[0])),Me){ye.bindFramebuffer(z.FRAMEBUFFER,Me);try{let Ie=b.textures[ge],We=Ie.format,Ke=Ie.type;b.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+ge);let Ce=td(Ie);if(Ce.__formatReadable===!1){Fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ce.__typeReadable===!1){Fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=b.width-X&&J>=0&&J<=b.height-Y&&z.readPixels(k,J,X,Y,he.convert(We),he.convert(Ke),_e)}finally{let Ie=U!==null?Ue.get(U).__webglFramebuffer:null;ye.bindFramebuffer(z.FRAMEBUFFER,Ie)}}},this.readRenderTargetPixelsAsync=async function(b,k,J,X,Y,_e,we,ge=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Me=Ue.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&we!==void 0&&(Me=Me[we],Array.isArray(Me)&&(Me=Me[0])),Me)if(k>=0&&k<=b.width-X&&J>=0&&J<=b.height-Y){ye.bindFramebuffer(z.FRAMEBUFFER,Me);let Ie=b.textures[ge],We=Ie.format,Ke=Ie.type;b.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+ge);let Ce=td(Ie);if(Ce.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ce.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Qe=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,Qe),z.bufferData(z.PIXEL_PACK_BUFFER,_e.byteLength,z.STREAM_READ),z.readPixels(k,J,X,Y,he.convert(We),he.convert(Ke),0),z.bindBuffer(z.PIXEL_PACK_BUFFER,null);let Ct=U!==null?Ue.get(U).__webglFramebuffer:null;ye.bindFramebuffer(z.FRAMEBUFFER,Ct);let pt=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await ff(z,pt,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,Qe),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,_e),z.bindBuffer(z.PIXEL_PACK_BUFFER,null),z.deleteBuffer(Qe),z.deleteSync(pt),_e}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,k=null,J=0){let X=Math.pow(2,-J),Y=Math.floor(b.image.width*X),_e=Math.floor(b.image.height*X),we=k!==null?k.x:0,ge=k!==null?k.y:0;Ve.setTexture2D(b,0),z.copyTexSubImage2D(z.TEXTURE_2D,J,0,0,we,ge,Y,_e),ye.unbindTexture()},this.copyTextureToTexture=function(b,k,J=null,X=null,Y=0,_e=0){let we,ge,Me,Ie,We,Ke,Ce,Qe,Ct,pt=b.isCompressedTexture?b.mipmaps[_e]:b.image;if(J!==null)we=J.max.x-J.min.x,ge=J.max.y-J.min.y,Me=J.isBox3?J.max.z-J.min.z:1,Ie=J.min.x,We=J.min.y,Ke=J.isBox3?J.min.z:0;else{let it=Math.pow(2,-Y);we=Math.floor(pt.width*it),ge=Math.floor(pt.height*it),b.isDataArrayTexture?Me=pt.depth:b.isData3DTexture?Me=Math.floor(pt.depth*it):Me=1,Ie=0,We=0,Ke=0}X!==null?(Ce=X.x,Qe=X.y,Ct=X.z):(Ce=0,Qe=0,Ct=0);let dt=he.convert(k.format),Yt=he.convert(k.type),Re;k.isData3DTexture?(Ve.setTexture3D(k,0),Re=z.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(Ve.setTexture2DArray(k,0),Re=z.TEXTURE_2D_ARRAY):(Ve.setTexture2D(k,0),Re=z.TEXTURE_2D),ye.activeTexture(z.TEXTURE0),ye.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,k.flipY),ye.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),ye.pixelStorei(z.UNPACK_ALIGNMENT,k.unpackAlignment);let en=ye.getParameter(z.UNPACK_ROW_LENGTH),st=ye.getParameter(z.UNPACK_IMAGE_HEIGHT),zi=ye.getParameter(z.UNPACK_SKIP_PIXELS),Zt=ye.getParameter(z.UNPACK_SKIP_ROWS),yo=ye.getParameter(z.UNPACK_SKIP_IMAGES);ye.pixelStorei(z.UNPACK_ROW_LENGTH,pt.width),ye.pixelStorei(z.UNPACK_IMAGE_HEIGHT,pt.height),ye.pixelStorei(z.UNPACK_SKIP_PIXELS,Ie),ye.pixelStorei(z.UNPACK_SKIP_ROWS,We),ye.pixelStorei(z.UNPACK_SKIP_IMAGES,Ke);let yi=b.isDataArrayTexture||b.isData3DTexture,Gi=k.isDataArrayTexture||k.isData3DTexture;if(b.isDepthTexture){let it=Ue.get(b),Xt=Ue.get(k),An=Ue.get(it.__renderTarget),bt=Ue.get(Xt.__renderTarget);ye.bindFramebuffer(z.READ_FRAMEBUFFER,An.__webglFramebuffer),ye.bindFramebuffer(z.DRAW_FRAMEBUFFER,bt.__webglFramebuffer);for(let Bt=0;Bt<Me;Bt++)yi&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Ue.get(b).__webglTexture,Y,Ke+Bt),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Ue.get(k).__webglTexture,_e,Ct+Bt)),z.blitFramebuffer(Ie,We,Ie+we,We+ge,Ce,Qe,Ce+we,Qe+ge,z.DEPTH_BUFFER_BIT,z.NEAREST);ye.bindFramebuffer(z.READ_FRAMEBUFFER,null),ye.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if(Y!==0||b.isRenderTargetTexture||Ue.has(b)){let it=Ue.get(b),Xt=Ue.get(k);ye.bindFramebuffer(z.READ_FRAMEBUFFER,N),ye.bindFramebuffer(z.DRAW_FRAMEBUFFER,$);for(let An=0;An<Me;An++)yi?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,it.__webglTexture,Y,Ke+An):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,it.__webglTexture,Y),Gi?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Xt.__webglTexture,_e,Ct+An):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Xt.__webglTexture,_e),Y!==0?z.blitFramebuffer(Ie,We,Ie+we,We+ge,Ce,Qe,Ce+we,Qe+ge,z.COLOR_BUFFER_BIT,z.NEAREST):Gi?z.copyTexSubImage3D(Re,_e,Ce,Qe,Ct+An,Ie,We,we,ge):z.copyTexSubImage2D(Re,_e,Ce,Qe,Ie,We,we,ge);ye.bindFramebuffer(z.READ_FRAMEBUFFER,null),ye.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else Gi?b.isDataTexture||b.isData3DTexture?z.texSubImage3D(Re,_e,Ce,Qe,Ct,we,ge,Me,dt,Yt,pt.data):k.isCompressedArrayTexture?z.compressedTexSubImage3D(Re,_e,Ce,Qe,Ct,we,ge,Me,dt,pt.data):z.texSubImage3D(Re,_e,Ce,Qe,Ct,we,ge,Me,dt,Yt,pt):b.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,_e,Ce,Qe,we,ge,dt,Yt,pt.data):b.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,_e,Ce,Qe,pt.width,pt.height,dt,pt.data):z.texSubImage2D(z.TEXTURE_2D,_e,Ce,Qe,we,ge,dt,Yt,pt);ye.pixelStorei(z.UNPACK_ROW_LENGTH,en),ye.pixelStorei(z.UNPACK_IMAGE_HEIGHT,st),ye.pixelStorei(z.UNPACK_SKIP_PIXELS,zi),ye.pixelStorei(z.UNPACK_SKIP_ROWS,Zt),ye.pixelStorei(z.UNPACK_SKIP_IMAGES,yo),_e===0&&k.generateMipmaps===!0&&k.mipmapsAutoUpdate===!0&&z.generateMipmap(Re),ye.unbindTexture()},this.initRenderTarget=function(b){Ue.get(b).__webglFramebuffer===void 0&&Ve.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?Ve.setTextureCube(b,0):b.isData3DTexture?Ve.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?Ve.setTexture2DArray(b,0):Ve.setTexture2D(b,0),ye.unbindTexture()},this.resetState=function(){R=0,P=0,U=null,ye.reset(),fe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Mn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=et._getDrawingBufferColorSpace(e),t.unpackColorSpace=et._getUnpackColorSpace()}};function wn(n,e=!1){let t=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},o={},a=n[0].morphTargetsRelative,c=new At;c.morphTargetsRelative=a;let l=0;for(let h=0;h<n.length;++h){let d=n[h],p=0,g=0;if(t!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let x in d.attributes){if(!i.has(x))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+x+'" attribute exists among all geometries, or in none of them.'),null;r[x]===void 0&&(r[x]=[]),r[x].push(d.attributes[x]),p++}if(p!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let x in d.morphAttributes){if(!s.has(x))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;if(d.morphAttributes[x].length!==n[0].morphAttributes[x].length)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have the same number of morph targets for the "'+x+'" morph attribute.'),null;o[x]===void 0&&(o[x]=[]),o[x].push(d.morphAttributes[x]),g++}if(g!==s.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of morph attributes."),null;if(e){let x;if(t)x=d.index.count;else if(d.attributes.position!==void 0)x=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,x,h),l+=x}}if(t){let h=0,d=[];for(let p=0;p<n.length;++p){let g=n[p].index;for(let x=0;x<g.count;++x)d.push(g.getX(x)+h);h+=n[p].attributes.position.count}c.setIndex(d)}for(let h in r){let d=np(r[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,d)}for(let h in o){let d=o[h][0].length;if(d!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let p=0;p<d;++p){let g=[];for(let y=0;y<o[h].length;++y)g.push(o[h][y][p]);let x=np(g);if(!x)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(x)}}}return c}function np(n){let e,t,i,s=-1,r=0;for(let l=0;l<n.length;++l){let h=n[l];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=h.normalized),i!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}let o=new e(r),a=new Gt(o,t,i),c=0;for(let l=0;l<n.length;++l){let h=n[l];if(h.isInterleavedBufferAttribute){let d=c/t;for(let p=0,g=h.count;p<g;p++)for(let x=0;x<t;x++){let y=h.getComponent(p,x);a.setComponent(p+d,x,y)}}else o.set(h.array,c);c+=h.count*t}return s!==void 0&&(a.gpuType=s),a}var Mh=class{constructor(){this.encoder=new TextEncoder,this._pieces=[],this._parts=[]}append_buffer(e){this.flush(),this._parts.push(e)}append(e){this._pieces.push(e)}flush(){if(this._pieces.length>0){let e=new Uint8Array(this._pieces);this._parts.push(e),this._pieces=[]}}toArrayBuffer(){let e=[];for(let t of this._parts)e.push(t);return zy(e).buffer}};function zy(n){let e=0;for(let s of n)e+=s.byteLength;let t=new Uint8Array(e),i=0;for(let s of n){let r=new Uint8Array(s.buffer,s.byteOffset,s.byteLength);t.set(r,i),i+=s.byteLength}return t}function wh(n){return new Th(n).unpack()}function Ah(n){let e=new Eh,t=e.pack(n);return t instanceof Promise?t.then(()=>e.getBuffer()):e.getBuffer()}var Th=class{constructor(e){this.index=0,this.dataBuffer=e,this.dataView=new Uint8Array(this.dataBuffer),this.length=this.dataBuffer.byteLength}unpack(){let e=this.unpack_uint8();if(e<128)return e;if((e^224)<32)return(e^224)-32;let t;if((t=e^160)<=15)return this.unpack_raw(t);if((t=e^176)<=15)return this.unpack_string(t);if((t=e^144)<=15)return this.unpack_array(t);if((t=e^128)<=15)return this.unpack_map(t);switch(e){case 192:return null;case 193:return;case 194:return!1;case 195:return!0;case 202:return this.unpack_float();case 203:return this.unpack_double();case 204:return this.unpack_uint8();case 205:return this.unpack_uint16();case 206:return this.unpack_uint32();case 207:return this.unpack_uint64();case 208:return this.unpack_int8();case 209:return this.unpack_int16();case 210:return this.unpack_int32();case 211:return this.unpack_int64();case 212:return;case 213:return;case 214:return;case 215:return;case 216:return t=this.unpack_uint16(),this.unpack_string(t);case 217:return t=this.unpack_uint32(),this.unpack_string(t);case 218:return t=this.unpack_uint16(),this.unpack_raw(t);case 219:return t=this.unpack_uint32(),this.unpack_raw(t);case 220:return t=this.unpack_uint16(),this.unpack_array(t);case 221:return t=this.unpack_uint32(),this.unpack_array(t);case 222:return t=this.unpack_uint16(),this.unpack_map(t);case 223:return t=this.unpack_uint32(),this.unpack_map(t)}}unpack_uint8(){let e=this.dataView[this.index]&255;return this.index++,e}unpack_uint16(){let e=this.read(2),t=(e[0]&255)*256+(e[1]&255);return this.index+=2,t}unpack_uint32(){let e=this.read(4),t=((e[0]*256+e[1])*256+e[2])*256+e[3];return this.index+=4,t}unpack_uint64(){let e=this.read(8),t=((((((e[0]*256+e[1])*256+e[2])*256+e[3])*256+e[4])*256+e[5])*256+e[6])*256+e[7];return this.index+=8,t}unpack_int8(){let e=this.unpack_uint8();return e<128?e:e-256}unpack_int16(){let e=this.unpack_uint16();return e<32768?e:e-65536}unpack_int32(){let e=this.unpack_uint32();return e<2**31?e:e-2**32}unpack_int64(){let e=this.unpack_uint64();return e<2**63?e:e-2**64}unpack_raw(e){if(this.length<this.index+e)throw new Error(`BinaryPackFailure: index is out of range ${this.index} ${e} ${this.length}`);let t=this.dataBuffer.slice(this.index,this.index+e);return this.index+=e,t}unpack_string(e){let t=this.read(e),i=0,s="",r,o;for(;i<e;)r=t[i],r<160?(o=r,i++):(r^192)<32?(o=(r&31)<<6|t[i+1]&63,i+=2):(r^224)<16?(o=(r&15)<<12|(t[i+1]&63)<<6|t[i+2]&63,i+=3):(o=(r&7)<<18|(t[i+1]&63)<<12|(t[i+2]&63)<<6|t[i+3]&63,i+=4),s+=String.fromCodePoint(o);return this.index+=e,s}unpack_array(e){let t=new Array(e);for(let i=0;i<e;i++)t[i]=this.unpack();return t}unpack_map(e){let t={};for(let i=0;i<e;i++){let s=this.unpack();t[s]=this.unpack()}return t}unpack_float(){let e=this.unpack_uint32(),t=e>>31,i=(e>>23&255)-127,s=e&8388607|8388608;return(t===0?1:-1)*s*2**(i-23)}unpack_double(){let e=this.unpack_uint32(),t=this.unpack_uint32(),i=e>>31,s=(e>>20&2047)-1023,o=(e&1048575|1048576)*2**(s-20)+t*2**(s-52);return(i===0?1:-1)*o}read(e){let t=this.index;if(t+e<=this.length)return this.dataView.subarray(t,t+e);throw new Error("BinaryPackFailure: read index out of range")}},Eh=class{getBuffer(){return this._bufferBuilder.toArrayBuffer()}pack(e){if(typeof e=="string")this.pack_string(e);else if(typeof e=="number")Math.floor(e)===e?this.pack_integer(e):this.pack_double(e);else if(typeof e=="boolean")e===!0?this._bufferBuilder.append(195):e===!1&&this._bufferBuilder.append(194);else if(e===void 0)this._bufferBuilder.append(192);else if(typeof e=="object")if(e===null)this._bufferBuilder.append(192);else{let t=e.constructor;if(e instanceof Array){let i=this.pack_array(e);if(i instanceof Promise)return i.then(()=>this._bufferBuilder.flush())}else if(e instanceof ArrayBuffer)this.pack_bin(new Uint8Array(e));else if("BYTES_PER_ELEMENT"in e){let i=e;this.pack_bin(new Uint8Array(i.buffer,i.byteOffset,i.byteLength))}else if(e instanceof Date)this.pack_string(e.toString());else{if(e instanceof Blob)return e.arrayBuffer().then(i=>{this.pack_bin(new Uint8Array(i)),this._bufferBuilder.flush()});if(t==Object||t.toString().startsWith("class")){let i=this.pack_object(e);if(i instanceof Promise)return i.then(()=>this._bufferBuilder.flush())}else throw new Error(`Type "${t.toString()}" not yet supported`)}}else throw new Error(`Type "${typeof e}" not yet supported`);this._bufferBuilder.flush()}pack_bin(e){let t=e.length;if(t<=15)this.pack_uint8(160+t);else if(t<=65535)this._bufferBuilder.append(218),this.pack_uint16(t);else if(t<=4294967295)this._bufferBuilder.append(219),this.pack_uint32(t);else throw new Error("Invalid length");this._bufferBuilder.append_buffer(e)}pack_string(e){let t=this._textEncoder.encode(e),i=t.length;if(i<=15)this.pack_uint8(176+i);else if(i<=65535)this._bufferBuilder.append(216),this.pack_uint16(i);else if(i<=4294967295)this._bufferBuilder.append(217),this.pack_uint32(i);else throw new Error("Invalid length");this._bufferBuilder.append_buffer(t)}pack_array(e){let t=e.length;if(t<=15)this.pack_uint8(144+t);else if(t<=65535)this._bufferBuilder.append(220),this.pack_uint16(t);else if(t<=4294967295)this._bufferBuilder.append(221),this.pack_uint32(t);else throw new Error("Invalid length");let i=s=>{if(s<t){let r=this.pack(e[s]);return r instanceof Promise?r.then(()=>i(s+1)):i(s+1)}};return i(0)}pack_integer(e){if(e>=-32&&e<=127)this._bufferBuilder.append(e&255);else if(e>=0&&e<=255)this._bufferBuilder.append(204),this.pack_uint8(e);else if(e>=-128&&e<=127)this._bufferBuilder.append(208),this.pack_int8(e);else if(e>=0&&e<=65535)this._bufferBuilder.append(205),this.pack_uint16(e);else if(e>=-32768&&e<=32767)this._bufferBuilder.append(209),this.pack_int16(e);else if(e>=0&&e<=4294967295)this._bufferBuilder.append(206),this.pack_uint32(e);else if(e>=-2147483648&&e<=2147483647)this._bufferBuilder.append(210),this.pack_int32(e);else if(e>=-9223372036854776e3&&e<=9223372036854776e3)this._bufferBuilder.append(211),this.pack_int64(e);else if(e>=0&&e<=18446744073709552e3)this._bufferBuilder.append(207),this.pack_uint64(e);else throw new Error("Invalid integer")}pack_double(e){let t=0;e<0&&(t=1,e=-e);let i=Math.floor(Math.log(e)/Math.LN2),s=e/2**i-1,r=Math.floor(s*2**52),o=2**32,a=t<<31|i+1023<<20|r/o&1048575,c=r%o;this._bufferBuilder.append(203),this.pack_int32(a),this.pack_int32(c)}pack_object(e){let t=Object.keys(e),i=t.length;if(i<=15)this.pack_uint8(128+i);else if(i<=65535)this._bufferBuilder.append(222),this.pack_uint16(i);else if(i<=4294967295)this._bufferBuilder.append(223),this.pack_uint32(i);else throw new Error("Invalid length");let s=r=>{if(r<t.length){let o=t[r];if(e.hasOwnProperty(o)){this.pack(o);let a=this.pack(e[o]);if(a instanceof Promise)return a.then(()=>s(r+1))}return s(r+1)}};return s(0)}pack_uint8(e){this._bufferBuilder.append(e)}pack_uint16(e){this._bufferBuilder.append(e>>8),this._bufferBuilder.append(e&255)}pack_uint32(e){let t=e&4294967295;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255)}pack_uint64(e){let t=e/4294967296,i=e%2**32;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255),this._bufferBuilder.append((i&4278190080)>>>24),this._bufferBuilder.append((i&16711680)>>>16),this._bufferBuilder.append((i&65280)>>>8),this._bufferBuilder.append(i&255)}pack_int8(e){this._bufferBuilder.append(e&255)}pack_int16(e){this._bufferBuilder.append((e&65280)>>8),this._bufferBuilder.append(e&255)}pack_int32(e){this._bufferBuilder.append(e>>>24&255),this._bufferBuilder.append((e&16711680)>>>16),this._bufferBuilder.append((e&65280)>>>8),this._bufferBuilder.append(e&255)}pack_int64(e){let t=Math.floor(e/4294967296),i=e%2**32;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255),this._bufferBuilder.append((i&4278190080)>>>24),this._bufferBuilder.append((i&16711680)>>>16),this._bufferBuilder.append((i&65280)>>>8),this._bufferBuilder.append(i&255)}constructor(){this._bufferBuilder=new Mh,this._textEncoder=new TextEncoder}};var sp=!0,rp=!0;function qs(n,e,t){let i=n.match(e);return i&&i.length>=t&&parseFloat(i[t],10)}function jn(n,e,t){if(!n.RTCPeerConnection)return;if(!Object.getOwnPropertyDescriptor(EventTarget.prototype,"addEventListener").writable){Jr("Unable to polyfill events");return}let s=n.RTCPeerConnection.prototype,r=s.addEventListener;s.addEventListener=function(a,c){if(a!==e)return r.apply(this,arguments);let l=h=>{let d=t(h);d&&(c.handleEvent?c.handleEvent(d):c(d))};return this._eventMap=this._eventMap||{},this._eventMap[e]||(this._eventMap[e]=new Map),this._eventMap[e].set(c,l),r.apply(this,[a,l])};let o=s.removeEventListener;s.removeEventListener=function(a,c){if(a!==e||!this._eventMap||!this._eventMap[e])return o.apply(this,arguments);if(!this._eventMap[e].has(c))return o.apply(this,arguments);let l=this._eventMap[e].get(c);return this._eventMap[e].delete(c),this._eventMap[e].size===0&&delete this._eventMap[e],Object.keys(this._eventMap).length===0&&delete this._eventMap,o.apply(this,[a,l])},Object.defineProperty(s,"on"+e,{get(){return this["_on"+e]},set(a){this["_on"+e]&&(this.removeEventListener(e,this["_on"+e]),delete this["_on"+e]),a&&this.addEventListener(e,this["_on"+e]=a)},enumerable:!0,configurable:!0})}function op(n){return typeof n!="boolean"?new Error("Argument type: "+typeof n+". Please use a boolean."):(sp=n,n?"adapter.js logging disabled":"adapter.js logging enabled")}function ap(n){return typeof n!="boolean"?new Error("Argument type: "+typeof n+". Please use a boolean."):(rp=!n,"adapter.js deprecation warnings "+(n?"disabled":"enabled"))}function Jr(){if(typeof window=="object"){if(sp)return;typeof console<"u"&&typeof console.log=="function"&&console.log.apply(console,arguments)}}function Ys(n,e){rp&&console.warn(n+" is deprecated, please use "+e+" instead.")}function cp(n){let e={browser:null,version:null};if(typeof n>"u"||!n.navigator||!n.navigator.userAgent)return e.browser="Not a browser.",e;let{navigator:t}=n;if(t.userAgentData&&t.userAgentData.brands){let i=t.userAgentData.brands.find(s=>s.brand==="Chromium");if(i){let s=parseInt(i.version,10);if(s>=90)return{browser:"chrome",version:s}}}if(t.mozGetUserMedia)e.browser="firefox",e.version=parseInt(qs(t.userAgent,/Firefox\/(\d+)\./,1));else if(t.webkitGetUserMedia||n.isSecureContext===!1&&n.webkitRTCPeerConnection)e.browser="chrome",e.version=parseInt(qs(t.userAgent,/Chrom(e|ium)\/(\d+)\./,2))||null;else if(n.RTCPeerConnection&&t.userAgent.match(/AppleWebKit\/(\d+)\./))e.browser="safari",e.version=parseInt(qs(t.userAgent,/AppleWebKit\/(\d+)\./,1)),e.supportsUnifiedPlan=n.RTCRtpTransceiver&&"currentDirection"in n.RTCRtpTransceiver.prototype,e._safariVersion=qs(t.userAgent,/Version\/(\d+(\.?\d+))/,1);else return e.browser="Not a supported browser.",e;return e}function ip(n){return Object.prototype.toString.call(n)==="[object Object]"}function Rh(n){return ip(n)?Object.keys(n).reduce(function(e,t){let i=ip(n[t]),s=i?Rh(n[t]):n[t],r=i&&!Object.keys(s).length;return s===void 0||r?e:Object.assign(e,{[t]:s})},{}):n}function Ch(n,e,t){!e||t.has(e.id)||(t.set(e.id,e),Object.keys(e).forEach(i=>{i.endsWith("Id")?Ch(n,n.get(e[i]),t):i.endsWith("Ids")&&e[i].forEach(s=>{Ch(n,n.get(s),t)})}))}function Ph(n,e,t){let i=t?"outbound-rtp":"inbound-rtp",s=new Map;if(e===null)return s;let r=[];return n.forEach(o=>{o.type==="track"&&o.trackIdentifier===e.id&&r.push(o)}),r.forEach(o=>{n.forEach(a=>{a.type===i&&a.trackId===o.id&&Ch(n,a,s)})}),s}var vc={};vo(vc,{fixNegotiationNeeded:()=>Oh,shimAddTrackRemoveTrack:()=>Uh,shimAddTrackRemoveTrackWithNative:()=>hp,shimGetSendersWithDtmf:()=>Dh,shimGetUserMedia:()=>_c,shimMediaStream:()=>Ih,shimOnTrack:()=>Lh,shimPeerConnection:()=>yc,shimSenderReceiverGetStats:()=>Nh});var lp=Jr;function _c(n,e){if(e.version>=64)return;let t=n&&n.navigator;if(!t.mediaDevices)return;let i=function(a){if(typeof a!="object"||a.mandatory||a.optional)return a;let c={};return Object.keys(a).forEach(l=>{if(l==="require"||l==="advanced"||l==="mediaSource")return;let h=typeof a[l]=="object"?a[l]:{ideal:a[l]};h.exact!==void 0&&typeof h.exact=="number"&&(h.min=h.max=h.exact);let d=function(p,g){return p?p+g.charAt(0).toUpperCase()+g.slice(1):g==="deviceId"?"sourceId":g};if(h.ideal!==void 0){c.optional=c.optional||[];let p={};typeof h.ideal=="number"?(p[d("min",l)]=h.ideal,c.optional.push(p),p={},p[d("max",l)]=h.ideal,c.optional.push(p)):(p[d("",l)]=h.ideal,c.optional.push(p))}h.exact!==void 0&&typeof h.exact!="number"?(c.mandatory=c.mandatory||{},c.mandatory[d("",l)]=h.exact):["min","max"].forEach(p=>{h[p]!==void 0&&(c.mandatory=c.mandatory||{},c.mandatory[d(p,l)]=h[p])})}),a.advanced&&(c.optional=(c.optional||[]).concat(a.advanced)),c},s=function(a,c){if(e.version>=61)return c(a);if(a=JSON.parse(JSON.stringify(a)),a&&typeof a.audio=="object"){let l=function(h,d,p){d in h&&!(p in h)&&(h[p]=h[d],delete h[d])};a=JSON.parse(JSON.stringify(a)),l(a.audio,"autoGainControl","googAutoGainControl"),l(a.audio,"noiseSuppression","googNoiseSuppression"),a.audio=i(a.audio)}if(a&&typeof a.video=="object"){let l=a.video.facingMode;l=l&&(typeof l=="object"?l:{ideal:l});let h=e.version<66;if(l&&(l.exact==="user"||l.exact==="environment"||l.ideal==="user"||l.ideal==="environment")&&!(t.mediaDevices.getSupportedConstraints&&t.mediaDevices.getSupportedConstraints().facingMode&&!h)){delete a.video.facingMode;let d;if(l.exact==="environment"||l.ideal==="environment"?d=["back","rear"]:(l.exact==="user"||l.ideal==="user")&&(d=["front"]),d)return t.mediaDevices.enumerateDevices().then(p=>{p=p.filter(x=>x.kind==="videoinput");let g=p.find(x=>d.some(y=>x.label.toLowerCase().includes(y)));return!g&&p.length&&d.includes("back")&&(g=p[p.length-1]),g&&(a.video.deviceId=l.exact?{exact:g.deviceId}:{ideal:g.deviceId}),a.video=i(a.video),lp("chrome: "+JSON.stringify(a)),c(a)})}a.video=i(a.video)}return lp("chrome: "+JSON.stringify(a)),c(a)},r=function(a){return e.version>=64?a:{name:{PermissionDeniedError:"NotAllowedError",PermissionDismissedError:"NotAllowedError",InvalidStateError:"NotAllowedError",DevicesNotFoundError:"NotFoundError",ConstraintNotSatisfiedError:"OverconstrainedError",TrackStartError:"NotReadableError",MediaDeviceFailedDueToShutdown:"NotAllowedError",MediaDeviceKillSwitchOn:"NotAllowedError",TabCaptureError:"AbortError",ScreenCaptureError:"AbortError",DeviceCaptureError:"AbortError"}[a.name]||a.name,message:a.message,constraint:a.constraint||a.constraintName,toString(){return this.name+(this.message&&": ")+this.message}}},o=function(a,c,l){s(a,h=>{t.webkitGetUserMedia(h,c,d=>{l&&l(r(d))})})};if(t.getUserMedia=o.bind(t),t.mediaDevices.getUserMedia){let a=t.mediaDevices.getUserMedia.bind(t.mediaDevices);t.mediaDevices.getUserMedia=function(c){return s(c,l=>a(l).then(h=>{if(l.audio&&!h.getAudioTracks().length||l.video&&!h.getVideoTracks().length)throw h.getTracks().forEach(d=>{d.stop()}),new DOMException("","NotFoundError");return h},h=>Promise.reject(r(h))))}}}function Ih(n){n.MediaStream=n.MediaStream||n.webkitMediaStream}function Lh(n,e){if(!(e.version>102))if(typeof n=="object"&&n.RTCPeerConnection&&!("ontrack"in n.RTCPeerConnection.prototype)){Object.defineProperty(n.RTCPeerConnection.prototype,"ontrack",{get(){return this._ontrack},set(i){this._ontrack&&this.removeEventListener("track",this._ontrack),this.addEventListener("track",this._ontrack=i)},enumerable:!0,configurable:!0});let t=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(){return this._ontrackpoly||(this._ontrackpoly=s=>{s.stream.addEventListener("addtrack",r=>{let o;n.RTCPeerConnection.prototype.getReceivers?o=this.getReceivers().find(c=>c.track&&c.track.id===r.track.id):o={track:r.track};let a=new Event("track");a.track=r.track,a.receiver=o,a.transceiver={receiver:o},a.streams=[s.stream],this.dispatchEvent(a)}),s.stream.getTracks().forEach(r=>{let o;n.RTCPeerConnection.prototype.getReceivers?o=this.getReceivers().find(c=>c.track&&c.track.id===r.id):o={track:r};let a=new Event("track");a.track=r,a.receiver=o,a.transceiver={receiver:o},a.streams=[s.stream],this.dispatchEvent(a)})},this.addEventListener("addstream",this._ontrackpoly)),t.apply(this,arguments)}}else jn(n,"track",t=>(t.transceiver||Object.defineProperty(t,"transceiver",{value:{receiver:t.receiver}}),t))}function Dh(n){if(typeof n=="object"&&n.RTCPeerConnection&&!("getSenders"in n.RTCPeerConnection.prototype)&&"createDTMFSender"in n.RTCPeerConnection.prototype){let e=function(s,r){return{track:r,get dtmf(){return this._dtmf===void 0&&(r.kind==="audio"?this._dtmf=s.createDTMFSender(r):this._dtmf=null),this._dtmf},_pc:s}};if(!n.RTCPeerConnection.prototype.getSenders){n.RTCPeerConnection.prototype.getSenders=function(){return this._senders=this._senders||[],this._senders.slice()};let s=n.RTCPeerConnection.prototype.addTrack;n.RTCPeerConnection.prototype.addTrack=function(a,c){let l=s.apply(this,arguments);return l||(l=e(this,a),this._senders.push(l)),l};let r=n.RTCPeerConnection.prototype.removeTrack;n.RTCPeerConnection.prototype.removeTrack=function(a){r.apply(this,arguments);let c=this._senders.indexOf(a);c!==-1&&this._senders.splice(c,1)}}let t=n.RTCPeerConnection.prototype.addStream;n.RTCPeerConnection.prototype.addStream=function(r){this._senders=this._senders||[],t.apply(this,[r]),r.getTracks().forEach(o=>{this._senders.push(e(this,o))})};let i=n.RTCPeerConnection.prototype.removeStream;n.RTCPeerConnection.prototype.removeStream=function(r){this._senders=this._senders||[],i.apply(this,[r]),r.getTracks().forEach(o=>{let a=this._senders.find(c=>c.track===o);a&&this._senders.splice(this._senders.indexOf(a),1)})}}else if(typeof n=="object"&&n.RTCPeerConnection&&"getSenders"in n.RTCPeerConnection.prototype&&"createDTMFSender"in n.RTCPeerConnection.prototype&&n.RTCRtpSender&&!("dtmf"in n.RTCRtpSender.prototype)){let e=n.RTCPeerConnection.prototype.getSenders;n.RTCPeerConnection.prototype.getSenders=function(){let i=e.apply(this,[]);return i.forEach(s=>s._pc=this),i},Object.defineProperty(n.RTCRtpSender.prototype,"dtmf",{get(){return this._dtmf===void 0&&(this.track.kind==="audio"?this._dtmf=this._pc.createDTMFSender(this.track):this._dtmf=null),this._dtmf}})}}function Nh(n,e){if(e.version>=67||!(typeof n=="object"&&n.RTCPeerConnection&&n.RTCRtpSender&&n.RTCRtpReceiver))return;if(!("getStats"in n.RTCRtpSender.prototype)){let i=n.RTCPeerConnection.prototype.getSenders;i&&(n.RTCPeerConnection.prototype.getSenders=function(){let o=i.apply(this,[]);return o.forEach(a=>a._pc=this),o});let s=n.RTCPeerConnection.prototype.addTrack;s&&(n.RTCPeerConnection.prototype.addTrack=function(){let o=s.apply(this,arguments);return o._pc=this,o}),n.RTCRtpSender.prototype.getStats=function(){let o=this;return this._pc.getStats().then(a=>Ph(a,o.track,!0))}}if(!("getStats"in n.RTCRtpReceiver.prototype)){let i=n.RTCPeerConnection.prototype.getReceivers;i&&(n.RTCPeerConnection.prototype.getReceivers=function(){let r=i.apply(this,[]);return r.forEach(o=>o._pc=this),r}),jn(n,"track",s=>(s.receiver._pc=s.srcElement,s)),n.RTCRtpReceiver.prototype.getStats=function(){let r=this;return this._pc.getStats().then(o=>Ph(o,r.track,!1))}}if(!("getStats"in n.RTCRtpSender.prototype&&"getStats"in n.RTCRtpReceiver.prototype))return;let t=n.RTCPeerConnection.prototype.getStats;n.RTCPeerConnection.prototype.getStats=function(){if(arguments.length>0&&arguments[0]instanceof n.MediaStreamTrack){let s=arguments[0],r,o,a;return this.getSenders().forEach(c=>{c.track===s&&(r?a=!0:r=c)}),this.getReceivers().forEach(c=>(c.track===s&&(o?a=!0:o=c),c.track===s)),a||r&&o?Promise.reject(new DOMException("There are more than one sender or receiver for the track.","InvalidAccessError")):r?r.getStats():o?o.getStats():Promise.reject(new DOMException("There is no sender or receiver for the track.","InvalidAccessError"))}return t.apply(this,arguments)}}function hp(n){n.RTCPeerConnection.prototype.getLocalStreams=function(){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},Object.keys(this._shimmedLocalStreams).map(o=>this._shimmedLocalStreams[o][0])};let e=n.RTCPeerConnection.prototype.addTrack;n.RTCPeerConnection.prototype.addTrack=function(o,a){if(!a)return e.apply(this,arguments);this._shimmedLocalStreams=this._shimmedLocalStreams||{};let c=e.apply(this,arguments);return this._shimmedLocalStreams[a.id]?this._shimmedLocalStreams[a.id].indexOf(c)===-1&&this._shimmedLocalStreams[a.id].push(c):this._shimmedLocalStreams[a.id]=[a,c],c};let t=n.RTCPeerConnection.prototype.addStream;n.RTCPeerConnection.prototype.addStream=function(o){this._shimmedLocalStreams=this._shimmedLocalStreams||{},o.getTracks().forEach(l=>{if(this.getSenders().find(d=>d.track===l))throw new DOMException("Track already exists.","InvalidAccessError")});let a=this.getSenders();t.apply(this,arguments);let c=this.getSenders().filter(l=>a.indexOf(l)===-1);this._shimmedLocalStreams[o.id]=[o].concat(c)};let i=n.RTCPeerConnection.prototype.removeStream;n.RTCPeerConnection.prototype.removeStream=function(o){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},delete this._shimmedLocalStreams[o.id],i.apply(this,arguments)};let s=n.RTCPeerConnection.prototype.removeTrack;n.RTCPeerConnection.prototype.removeTrack=function(o){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},o&&Object.keys(this._shimmedLocalStreams).forEach(a=>{let c=this._shimmedLocalStreams[a].indexOf(o);c!==-1&&this._shimmedLocalStreams[a].splice(c,1),this._shimmedLocalStreams[a].length===1&&delete this._shimmedLocalStreams[a]}),s.apply(this,arguments)}}function Uh(n,e){if(!n.RTCPeerConnection)return;if(n.RTCPeerConnection.prototype.addTrack&&e.version>=65)return hp(n);let t=n.RTCPeerConnection.prototype.getLocalStreams;n.RTCPeerConnection.prototype.getLocalStreams=function(){let h=t.apply(this);return this._reverseStreams=this._reverseStreams||{},h.map(d=>this._reverseStreams[d.id])};let i=n.RTCPeerConnection.prototype.addStream;n.RTCPeerConnection.prototype.addStream=function(h){if(this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{},h.getTracks().forEach(d=>{if(this.getSenders().find(g=>g.track===d))throw new DOMException("Track already exists.","InvalidAccessError")}),!this._reverseStreams[h.id]){let d=new n.MediaStream(h.getTracks());this._streams[h.id]=d,this._reverseStreams[d.id]=h,h=d}i.apply(this,[h])};let s=n.RTCPeerConnection.prototype.removeStream;n.RTCPeerConnection.prototype.removeStream=function(h){this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{},s.apply(this,[this._streams[h.id]||h]),delete this._reverseStreams[this._streams[h.id]?this._streams[h.id].id:h.id],delete this._streams[h.id]},n.RTCPeerConnection.prototype.addTrack=function(h,d){if(this.signalingState==="closed")throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");let p=[].slice.call(arguments,1);if(p.length!==1||!p[0].getTracks().find(y=>y===h))throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.","NotSupportedError");if(this.getSenders().find(y=>y.track===h))throw new DOMException("Track already exists.","InvalidAccessError");this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{};let x=this._streams[d.id];if(x)x.addTrack(h),Promise.resolve().then(()=>{this.dispatchEvent(new Event("negotiationneeded"))});else{let y=new n.MediaStream([h]);this._streams[d.id]=y,this._reverseStreams[y.id]=d,this.addStream(y)}return this.getSenders().find(y=>y.track===h)};function r(l,h){let d=h.sdp;return Object.keys(l._reverseStreams||[]).forEach(p=>{let g=l._reverseStreams[p],x=l._streams[g.id];d=d.replace(new RegExp(x.id,"g"),g.id)}),new RTCSessionDescription({type:h.type,sdp:d})}function o(l,h){let d=h.sdp;return Object.keys(l._reverseStreams||[]).forEach(p=>{let g=l._reverseStreams[p],x=l._streams[g.id];d=d.replace(new RegExp(g.id,"g"),x.id)}),new RTCSessionDescription({type:h.type,sdp:d})}["createOffer","createAnswer"].forEach(function(l){let h=n.RTCPeerConnection.prototype[l],d={[l](){let p=arguments;return arguments.length&&typeof arguments[0]=="function"?h.apply(this,[x=>{let y=r(this,x);p[0].apply(null,[y])},x=>{p[1]&&p[1].apply(null,x)},arguments[2]]):h.apply(this,arguments).then(x=>r(this,x))}};n.RTCPeerConnection.prototype[l]=d[l]});let a=n.RTCPeerConnection.prototype.setLocalDescription;n.RTCPeerConnection.prototype.setLocalDescription=function(){return!arguments.length||!arguments[0].type?a.apply(this,arguments):(arguments[0]=o(this,arguments[0]),a.apply(this,arguments))};let c=Object.getOwnPropertyDescriptor(n.RTCPeerConnection.prototype,"localDescription");Object.defineProperty(n.RTCPeerConnection.prototype,"localDescription",{get(){let l=c.get.apply(this);return l.type===""?l:r(this,l)}}),n.RTCPeerConnection.prototype.removeTrack=function(h){if(this.signalingState==="closed")throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");if(!h._pc)throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.","TypeError");if(!(h._pc===this))throw new DOMException("Sender was not created by this connection.","InvalidAccessError");this._streams=this._streams||{};let p;Object.keys(this._streams).forEach(g=>{this._streams[g].getTracks().find(y=>h.track===y)&&(p=this._streams[g])}),p&&(p.getTracks().length===1?this.removeStream(this._reverseStreams[p.id]):p.removeTrack(h.track),this.dispatchEvent(new Event("negotiationneeded")))}}function yc(n,e){!n.RTCPeerConnection&&n.webkitRTCPeerConnection&&(n.RTCPeerConnection=n.webkitRTCPeerConnection),n.RTCPeerConnection&&e.version<53&&["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(t){let i=n.RTCPeerConnection.prototype[t],s={[t](){return arguments[0]=new(t==="addIceCandidate"?n.RTCIceCandidate:n.RTCSessionDescription)(arguments[0]),i.apply(this,arguments)}};n.RTCPeerConnection.prototype[t]=s[t]})}function Oh(n,e){e.version>102||jn(n,"negotiationneeded",t=>{let i=t.target;if(!((e.version<72||i.getConfiguration&&i.getConfiguration().sdpSemantics==="plan-b")&&i.signalingState!=="stable"))return t})}var Mc={};vo(Mc,{shimAddTransceiver:()=>Vh,shimCreateAnswer:()=>qh,shimCreateOffer:()=>Xh,shimGetDisplayMedia:()=>up,shimGetParameters:()=>Wh,shimGetStats:()=>Fh,shimGetUserMedia:()=>Sc,shimOnTrack:()=>kh,shimPeerConnection:()=>bc,shimRTCDataChannel:()=>Hh,shimReceiverGetStats:()=>zh,shimRemoveStream:()=>Gh,shimSenderGetStats:()=>Bh});function Sc(n,e){let t=n&&n.navigator;if(!t.mediaDevices)return;let i=n&&n.MediaStreamTrack;if(t.getUserMedia=function(s,r,o){Ys("navigator.getUserMedia","navigator.mediaDevices.getUserMedia"),t.mediaDevices.getUserMedia(s).then(r,o)},!(e.version>55&&"autoGainControl"in t.mediaDevices.getSupportedConstraints())){let s=function(o,a,c){a in o&&!(c in o)&&(o[c]=o[a],delete o[a])},r=t.mediaDevices.getUserMedia.bind(t.mediaDevices);if(t.mediaDevices.getUserMedia=function(o){return typeof o=="object"&&typeof o.audio=="object"&&(o=JSON.parse(JSON.stringify(o)),s(o.audio,"autoGainControl","mozAutoGainControl"),s(o.audio,"noiseSuppression","mozNoiseSuppression")),r(o)},i&&i.prototype.getSettings){let o=i.prototype.getSettings;i.prototype.getSettings=function(){let a=o.apply(this,arguments);return s(a,"mozAutoGainControl","autoGainControl"),s(a,"mozNoiseSuppression","noiseSuppression"),a}}if(i&&i.prototype.applyConstraints){let o=i.prototype.applyConstraints;i.prototype.applyConstraints=function(a){return this.kind==="audio"&&typeof a=="object"&&(a=JSON.parse(JSON.stringify(a)),s(a,"autoGainControl","mozAutoGainControl"),s(a,"noiseSuppression","mozNoiseSuppression")),o.apply(this,[a])}}}}function up(n,e){n.navigator.mediaDevices&&(n.navigator.mediaDevices&&"getDisplayMedia"in n.navigator.mediaDevices||(n.navigator.mediaDevices.getDisplayMedia=function(i){if(!(i&&i.video)){let s=new DOMException("getDisplayMedia without video constraints is undefined");return s.name="NotFoundError",s.code=8,Promise.reject(s)}return i.video===!0?i.video={mediaSource:e}:i.video.mediaSource=e,n.navigator.mediaDevices.getUserMedia(i)}))}function kh(n){typeof n=="object"&&n.RTCTrackEvent&&"receiver"in n.RTCTrackEvent.prototype&&!("transceiver"in n.RTCTrackEvent.prototype)&&Object.defineProperty(n.RTCTrackEvent.prototype,"transceiver",{get(){return{receiver:this.receiver}}})}function bc(n,e){typeof n!="object"||!(n.RTCPeerConnection||n.mozRTCPeerConnection)||(!n.RTCPeerConnection&&n.mozRTCPeerConnection&&(n.RTCPeerConnection=n.mozRTCPeerConnection),e.version<53&&["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(t){let i=n.RTCPeerConnection.prototype[t],s={[t](){return arguments[0]=new(t==="addIceCandidate"?n.RTCIceCandidate:n.RTCSessionDescription)(arguments[0]),i.apply(this,arguments)}};n.RTCPeerConnection.prototype[t]=s[t]}))}function Fh(n,e){if(typeof n!="object"||!(n.RTCPeerConnection||n.mozRTCPeerConnection)||e.version>=151)return;let t={inboundrtp:"inbound-rtp",outboundrtp:"outbound-rtp",candidatepair:"candidate-pair",localcandidate:"local-candidate",remotecandidate:"remote-candidate"},i=n.RTCPeerConnection.prototype.getStats;n.RTCPeerConnection.prototype.getStats=function(){let[r,o,a]=arguments;return this.signalingState==="closed"?Promise.resolve(new Map):i.apply(this,[r||null]).then(c=>{if(e.version<53&&!o)try{c.forEach(l=>{l.type=t[l.type]||l.type})}catch(l){if(l.name!=="TypeError")throw l;c.forEach((h,d)=>{c.set(d,Object.assign({},h,{type:t[h.type]||h.type}))})}return c}).then(o,a)}}function Bh(n){if(!(typeof n=="object"&&n.RTCPeerConnection&&n.RTCRtpSender)||n.RTCRtpSender&&"getStats"in n.RTCRtpSender.prototype)return;let e=n.RTCPeerConnection.prototype.getSenders;e&&(n.RTCPeerConnection.prototype.getSenders=function(){let s=e.apply(this,[]);return s.forEach(r=>r._pc=this),s});let t=n.RTCPeerConnection.prototype.addTrack;t&&(n.RTCPeerConnection.prototype.addTrack=function(){let s=t.apply(this,arguments);return s._pc=this,s}),n.RTCRtpSender.prototype.getStats=function(){return this.track?this._pc.getStats(this.track):Promise.resolve(new Map)}}function zh(n){if(!(typeof n=="object"&&n.RTCPeerConnection&&n.RTCRtpSender)||n.RTCRtpSender&&"getStats"in n.RTCRtpReceiver.prototype)return;let e=n.RTCPeerConnection.prototype.getReceivers;e&&(n.RTCPeerConnection.prototype.getReceivers=function(){let i=e.apply(this,[]);return i.forEach(s=>s._pc=this),i}),jn(n,"track",t=>(t.receiver._pc=t.srcElement,t)),n.RTCRtpReceiver.prototype.getStats=function(){return this._pc.getStats(this.track)}}function Gh(n){!n.RTCPeerConnection||"removeStream"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.removeStream=function(t){Ys("removeStream","removeTrack"),this.getSenders().forEach(i=>{i.track&&t.getTracks().includes(i.track)&&this.removeTrack(i)})})}function Hh(n){n.DataChannel&&!n.RTCDataChannel&&(n.RTCDataChannel=n.DataChannel)}function Vh(n,e){if(!(typeof n=="object"&&n.RTCPeerConnection)||e.version>=110)return;let t=n.RTCPeerConnection.prototype.addTransceiver;t&&(n.RTCPeerConnection.prototype.addTransceiver=function(){this.setParametersPromises=[];let s=arguments[1]&&arguments[1].sendEncodings;s===void 0&&(s=[]),s=[...s];let r=s.length>0;r&&s.forEach(a=>{if("rid"in a&&!/^[a-z0-9]{0,16}$/i.test(a.rid))throw new TypeError("Invalid RID value provided.");if("scaleResolutionDownBy"in a&&!(parseFloat(a.scaleResolutionDownBy)>=1))throw new RangeError("scale_resolution_down_by must be >= 1.0");if("maxFramerate"in a&&!(parseFloat(a.maxFramerate)>=0))throw new RangeError("max_framerate must be >= 0.0")});let o=t.apply(this,arguments);if(r){let{sender:a}=o,c=a.getParameters();(!("encodings"in c)||c.encodings.length===1&&Object.keys(c.encodings[0]).length===0)&&(c.encodings=s,a.sendEncodings=s,this.setParametersPromises.push(a.setParameters(c).then(()=>{delete a.sendEncodings}).catch(()=>{delete a.sendEncodings})))}return o})}function Wh(n,e){if(!(typeof n=="object"&&n.RTCRtpSender)||e.version>=110)return;let t=n.RTCRtpSender.prototype.getParameters;t&&(n.RTCRtpSender.prototype.getParameters=function(){let s=t.apply(this,arguments);return"encodings"in s||(s.encodings=[].concat(this.sendEncodings||[{}])),s})}function Xh(n,e){if(!(typeof n=="object"&&n.RTCPeerConnection)||e.version>=110)return;let t=n.RTCPeerConnection.prototype.createOffer;n.RTCPeerConnection.prototype.createOffer=function(){return this.setParametersPromises&&this.setParametersPromises.length?Promise.all(this.setParametersPromises).then(()=>t.apply(this,arguments)).finally(()=>{this.setParametersPromises=[]}):t.apply(this,arguments)}}function qh(n,e){if(!(typeof n=="object"&&n.RTCPeerConnection)||e.version>=110)return;let t=n.RTCPeerConnection.prototype.createAnswer;n.RTCPeerConnection.prototype.createAnswer=function(){return this.setParametersPromises&&this.setParametersPromises.length?Promise.all(this.setParametersPromises).then(()=>t.apply(this,arguments)).finally(()=>{this.setParametersPromises=[]}):t.apply(this,arguments)}}var Tc={};vo(Tc,{shimAudioContext:()=>eu,shimCallbacksAPI:()=>Jh,shimConstraints:()=>dp,shimCreateOfferLegacy:()=>Qh,shimGetUserMedia:()=>$h,shimLocalStreamsAPI:()=>Yh,shimRTCIceServerUrls:()=>jh,shimRemoteStreamsAPI:()=>Zh,shimTrackEventTransceiver:()=>Kh});function Yh(n){if(!(typeof n!="object"||!n.RTCPeerConnection)){if("getLocalStreams"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.getLocalStreams=function(){return this._localStreams||(this._localStreams=[]),this._localStreams}),!("addStream"in n.RTCPeerConnection.prototype)){let e=n.RTCPeerConnection.prototype.addTrack;n.RTCPeerConnection.prototype.addStream=function(i){this._localStreams||(this._localStreams=[]),this._localStreams.includes(i)||this._localStreams.push(i),i.getAudioTracks().forEach(s=>e.call(this,s,i)),i.getVideoTracks().forEach(s=>e.call(this,s,i))},n.RTCPeerConnection.prototype.addTrack=function(i,...s){return s&&s.forEach(r=>{this._localStreams?this._localStreams.includes(r)||this._localStreams.push(r):this._localStreams=[r]}),e.apply(this,arguments)}}"removeStream"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.removeStream=function(t){this._localStreams||(this._localStreams=[]);let i=this._localStreams.indexOf(t);if(i===-1)return;this._localStreams.splice(i,1);let s=t.getTracks();this.getSenders().forEach(r=>{s.includes(r.track)&&this.removeTrack(r)})})}}function Zh(n){if(!(typeof n!="object"||!n.RTCPeerConnection)&&("getRemoteStreams"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.getRemoteStreams=function(){return this._remoteStreams?this._remoteStreams:[]}),!("onaddstream"in n.RTCPeerConnection.prototype))){Object.defineProperty(n.RTCPeerConnection.prototype,"onaddstream",{get(){return this._onaddstream},set(t){this._onaddstream&&(this.removeEventListener("addstream",this._onaddstream),this.removeEventListener("track",this._onaddstreampoly)),this.addEventListener("addstream",this._onaddstream=t),this.addEventListener("track",this._onaddstreampoly=i=>{i.streams.forEach(s=>{if(this._remoteStreams||(this._remoteStreams=[]),this._remoteStreams.includes(s))return;this._remoteStreams.push(s);let r=new Event("addstream");r.stream=s,this.dispatchEvent(r)})})}});let e=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(){let i=this;return this._onaddstreampoly||this.addEventListener("track",this._onaddstreampoly=function(s){s.streams.forEach(r=>{if(i._remoteStreams||(i._remoteStreams=[]),i._remoteStreams.indexOf(r)>=0)return;i._remoteStreams.push(r);let o=new Event("addstream");o.stream=r,i.dispatchEvent(o)})}),e.apply(i,arguments)}}}function Jh(n){if(typeof n!="object"||!n.RTCPeerConnection)return;let e=n.RTCPeerConnection.prototype,t=e.createOffer,i=e.createAnswer,s=e.setLocalDescription,r=e.setRemoteDescription,o=e.addIceCandidate;e.createOffer=function(l,h){let d=arguments.length>=2?arguments[2]:arguments[0],p=t.apply(this,[d]);return h?(p.then(l,h),Promise.resolve()):p},e.createAnswer=function(l,h){let d=arguments.length>=2?arguments[2]:arguments[0],p=i.apply(this,[d]);return h?(p.then(l,h),Promise.resolve()):p};let a=function(c,l,h){let d=s.apply(this,[c]);return h?(d.then(l,h),Promise.resolve()):d};e.setLocalDescription=a,a=function(c,l,h){let d=r.apply(this,[c]);return h?(d.then(l,h),Promise.resolve()):d},e.setRemoteDescription=a,a=function(c,l,h){let d=o.apply(this,[c]);return h?(d.then(l,h),Promise.resolve()):d},e.addIceCandidate=a}function $h(n){let e=n&&n.navigator;if(e.mediaDevices&&e.mediaDevices.getUserMedia){let t=e.mediaDevices,i=t.getUserMedia.bind(t);e.mediaDevices.getUserMedia=s=>i(dp(s))}!e.getUserMedia&&e.mediaDevices&&e.mediaDevices.getUserMedia&&(e.getUserMedia=function(i,s,r){e.mediaDevices.getUserMedia(i).then(s,r)}.bind(e))}function dp(n){return n&&n.video!==void 0?Object.assign({},n,{video:Rh(n.video)}):n}function jh(n){if(!n.RTCPeerConnection)return;let e=n.RTCPeerConnection;n.RTCPeerConnection=function(i,s){if(i&&i.iceServers){let r=[];for(let o=0;o<i.iceServers.length;o++){let a=i.iceServers[o];a.urls===void 0&&a.url?(Ys("RTCIceServer.url","RTCIceServer.urls"),a=JSON.parse(JSON.stringify(a)),a.urls=a.url,delete a.url,r.push(a)):r.push(i.iceServers[o])}i.iceServers=r}return new e(i,s)},n.RTCPeerConnection.prototype=e.prototype,"generateCertificate"in e&&Object.defineProperty(n.RTCPeerConnection,"generateCertificate",{get(){return e.generateCertificate}})}function Kh(n){typeof n=="object"&&n.RTCTrackEvent&&"receiver"in n.RTCTrackEvent.prototype&&!("transceiver"in n.RTCTrackEvent.prototype)&&Object.defineProperty(n.RTCTrackEvent.prototype,"transceiver",{get(){return{receiver:this.receiver}}})}function Qh(n){let e=n.RTCPeerConnection.prototype.createOffer;n.RTCPeerConnection.prototype.createOffer=function(i){if(i){typeof i.offerToReceiveAudio<"u"&&(i.offerToReceiveAudio=!!i.offerToReceiveAudio);let s=this.getTransceivers().find(o=>o.receiver.track.kind==="audio");i.offerToReceiveAudio===!1&&s?s.direction==="sendrecv"?s.setDirection?s.setDirection("sendonly"):s.direction="sendonly":s.direction==="recvonly"&&(s.setDirection?s.setDirection("inactive"):s.direction="inactive"):i.offerToReceiveAudio===!0&&!s&&this.addTransceiver("audio",{direction:"recvonly"}),typeof i.offerToReceiveVideo<"u"&&(i.offerToReceiveVideo=!!i.offerToReceiveVideo);let r=this.getTransceivers().find(o=>o.receiver.track.kind==="video");i.offerToReceiveVideo===!1&&r?r.direction==="sendrecv"?r.setDirection?r.setDirection("sendonly"):r.direction="sendonly":r.direction==="recvonly"&&(r.setDirection?r.setDirection("inactive"):r.direction="inactive"):i.offerToReceiveVideo===!0&&!r&&this.addTransceiver("video",{direction:"recvonly"})}return e.apply(this,arguments)}}function eu(n){typeof n!="object"||n.AudioContext||(n.AudioContext=n.webkitAudioContext)}var iu={};vo(iu,{removeExtmapAllowMixed:()=>Ac,shimAddIceCandidateNullOrEmpty:()=>Qr,shimConnectionState:()=>wc,shimMaxMessageSize:()=>jr,shimParameterlessSetLocalDescription:()=>eo,shimRTCIceCandidate:()=>$r,shimRTCIceCandidateRelayProtocol:()=>Ec,shimSendThrowTypeError:()=>Kr});var Zs=id(nu());function $r(n){if(!n.RTCIceCandidate||n.RTCIceCandidate&&"foundation"in n.RTCIceCandidate.prototype)return;let e=n.RTCIceCandidate;n.RTCIceCandidate=function(i){if(typeof i=="object"&&i.candidate&&i.candidate.indexOf("a=")===0&&(i=JSON.parse(JSON.stringify(i)),i.candidate=i.candidate.substring(2)),i.candidate&&i.candidate.length){let s=new e(i),r=Zs.default.parseCandidate(i.candidate);for(let o in r)o in s||Object.defineProperty(s,o,{value:r[o]});return s.toJSON=function(){return{candidate:s.candidate,sdpMid:s.sdpMid,sdpMLineIndex:s.sdpMLineIndex,usernameFragment:s.usernameFragment}},s}return new e(i)},n.RTCIceCandidate.prototype=e.prototype,jn(n,"icecandidate",t=>(t.candidate&&Object.defineProperty(t,"candidate",{value:new n.RTCIceCandidate(t.candidate),writable:"false"}),t))}function Ec(n){!n.RTCIceCandidate||n.RTCIceCandidate&&"relayProtocol"in n.RTCIceCandidate.prototype||jn(n,"icecandidate",e=>{if(e.candidate){let t=Zs.default.parseCandidate(e.candidate.candidate);t.type==="relay"&&(e.candidate.relayProtocol={0:"tls",1:"tcp",2:"udp"}[t.priority>>24])}return e})}function jr(n,e){if(!n.RTCPeerConnection||e.browser==="chrome"&&e.version>102||e.browser==="firefox"&&e.version>=113)return;"sctp"in n.RTCPeerConnection.prototype||Object.defineProperty(n.RTCPeerConnection.prototype,"sctp",{get(){return typeof this._sctp>"u"?null:this._sctp}});let t=function(a){if(!a||!a.sdp)return!1;let c=Zs.default.splitSections(a.sdp);return c.shift(),c.some(l=>{let h=Zs.default.parseMLine(l);return h&&h.kind==="application"&&h.protocol.indexOf("SCTP")!==-1})},i=function(a){let c=a.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);if(c===null||c.length<2)return-1;let l=parseInt(c[1],10);return l!==l?-1:l},s=function(a){let c=65536;return e.browser==="firefox"&&(e.version<57?a===-1?c=16384:c=2147483637:e.version<60?c=e.version===57?65535:65536:c=2147483637),c},r=function(a,c){let l=65536;e.browser==="firefox"&&e.version===57&&(l=65535);let h=Zs.default.matchPrefix(a.sdp,"a=max-message-size:");return h.length>0?l=parseInt(h[0].substring(19),10):e.browser==="firefox"&&c!==-1&&(l=2147483637),l},o=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(){if(this._sctp=null,e.browser==="chrome"&&e.version>=76){let{sdpSemantics:c}=this.getConfiguration();c==="plan-b"&&Object.defineProperty(this,"sctp",{get(){return typeof this._sctp>"u"?null:this._sctp},enumerable:!0,configurable:!0})}if(t(arguments[0])){let c=i(arguments[0]),l=s(c),h=r(arguments[0],c),d;l===0&&h===0?d=Number.POSITIVE_INFINITY:l===0||h===0?d=Math.max(l,h):d=Math.min(l,h);let p={};Object.defineProperty(p,"maxMessageSize",{get(){return d}}),this._sctp=p}return o.apply(this,arguments)}}function Kr(n,e){if(!(n.RTCPeerConnection&&"createDataChannel"in n.RTCPeerConnection.prototype)||e.browser==="chrome"&&e.version>=149||e.browser==="firefox"&&e.version>60)return;function t(s,r){let o=s.send;s.send=function(){let c=arguments[0],l=c.length||c.size||c.byteLength;if(s.readyState==="open"&&r.sctp&&l>r.sctp.maxMessageSize)throw new TypeError("Message too large (can send a maximum of "+r.sctp.maxMessageSize+" bytes)");return o.apply(s,arguments)}}let i=n.RTCPeerConnection.prototype.createDataChannel;n.RTCPeerConnection.prototype.createDataChannel=function(){let r=i.apply(this,arguments);return t(r,this),r},jn(n,"datachannel",s=>(t(s.channel,s.target),s))}function wc(n){if(!n.RTCPeerConnection||"connectionState"in n.RTCPeerConnection.prototype)return;let e=n.RTCPeerConnection.prototype;Object.defineProperty(e,"connectionState",{get(){return{completed:"connected",checking:"connecting"}[this.iceConnectionState]||this.iceConnectionState},enumerable:!0,configurable:!0}),Object.defineProperty(e,"onconnectionstatechange",{get(){return this._onconnectionstatechange||null},set(t){this._onconnectionstatechange&&(this.removeEventListener("connectionstatechange",this._onconnectionstatechange),delete this._onconnectionstatechange),t&&this.addEventListener("connectionstatechange",this._onconnectionstatechange=t)},enumerable:!0,configurable:!0}),["setLocalDescription","setRemoteDescription"].forEach(t=>{let i=e[t];e[t]=function(){return this._connectionstatechangepoly||(this._connectionstatechangepoly=s=>{let r=s.target;if(r._lastConnectionState!==r.connectionState){r._lastConnectionState=r.connectionState;let o=new Event("connectionstatechange",s);r.dispatchEvent(o)}return s},this.addEventListener("iceconnectionstatechange",this._connectionstatechangepoly)),i.apply(this,arguments)}})}function Ac(n,e){if(!n.RTCPeerConnection||e.browser==="chrome"&&e.version>=71||e.browser==="safari"&&e._safariVersion>=13.1)return;let t=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(s){if(s&&s.sdp&&s.sdp.indexOf(`
a=extmap-allow-mixed`)!==-1){let r=s.sdp.split(`
`).filter(o=>o.trim()!=="a=extmap-allow-mixed").join(`
`);n.RTCSessionDescription&&s instanceof n.RTCSessionDescription?arguments[0]=new n.RTCSessionDescription({type:s.type,sdp:r}):s.sdp=r}return t.apply(this,arguments)}}function Qr(n,e){if(!(n.RTCPeerConnection&&n.RTCPeerConnection.prototype))return;let t=n.RTCPeerConnection.prototype.addIceCandidate;!t||t.length===0||(n.RTCPeerConnection.prototype.addIceCandidate=function(){return arguments[0]?(e.browser==="chrome"&&e.version<78||e.browser==="firefox"&&e.version<68||e.browser==="safari")&&arguments[0]&&arguments[0].candidate===""?Promise.resolve():t.apply(this,arguments):(arguments[1]&&arguments[1].apply(null),Promise.resolve())})}function eo(n,e){if(!(n.RTCPeerConnection&&n.RTCPeerConnection.prototype))return;let t=n.RTCPeerConnection.prototype.setLocalDescription;!t||t.length===0||(n.RTCPeerConnection.prototype.setLocalDescription=function(){let s=arguments[0]||{};if(typeof s!="object"||s.type&&s.sdp)return t.apply(this,arguments);if(s={type:s.type,sdp:s.sdp},!s.type)switch(this.signalingState){case"stable":case"have-local-offer":case"have-remote-pranswer":s.type="offer";break;default:s.type="answer";break}return s.sdp||s.type!=="offer"&&s.type!=="answer"?t.apply(this,[s]):(s.type==="offer"?this.createOffer:this.createAnswer).apply(this).then(o=>t.apply(this,[o]))})}var Gy=id(nu());function fp({window:n}={},e={shimChrome:!0,shimFirefox:!0,shimSafari:!0}){let t=Jr,i=cp(n),s={browserDetails:i,commonShim:iu,extractVersion:qs,disableLog:op,disableWarnings:ap,sdp:Gy};switch(i.browser){case"chrome":if(!vc||!yc||!e.shimChrome)return t("Chrome shim is not included in this adapter release."),s;if(i.version===null)return t("Chrome shim can not determine version, not shimming."),s;t("adapter.js shimming chrome."),s.browserShim=vc,Qr(n,i),eo(n,i),_c(n,i),Ih(n,i),yc(n,i),Lh(n,i),Uh(n,i),Dh(n,i),Nh(n,i),Oh(n,i),$r(n,i),Ec(n,i),wc(n,i),jr(n,i),Kr(n,i),Ac(n,i);break;case"firefox":if(!Mc||!bc||!e.shimFirefox)return t("Firefox shim is not included in this adapter release."),s;t("adapter.js shimming firefox."),s.browserShim=Mc,Qr(n,i),eo(n,i),Sc(n,i),bc(n,i),Fh(n,i),kh(n,i),Gh(n,i),Bh(n,i),zh(n,i),Hh(n,i),Vh(n,i),Wh(n,i),Xh(n,i),qh(n,i),$r(n,i),wc(n,i),jr(n,i),Kr(n,i);break;case"safari":if(!Tc||!e.shimSafari)return t("Safari shim is not included in this adapter release."),s;t("adapter.js shimming safari."),s.browserShim=Tc,Qr(n,i),eo(n,i),jh(n,i),Qh(n,i),Jh(n,i),Yh(n,i),Zh(n,i),Kh(n,i),$h(n,i),eu(n,i),$r(n,i),Ec(n,i),jr(n,i),Kr(n,i),Ac(n,i);break;default:t("Unsupported browser!");break}return s}var Hy=fp({window:typeof window>"u"?void 0:window}),su=Hy;function is(n,e,t,i){Object.defineProperty(n,e,{get:t,set:i,enumerable:!0,configurable:!0})}var Rc=class{constructor(){this.chunkedMTU=16300,this._dataCount=1,this.chunk=e=>{let t=[],i=e.byteLength,s=Math.ceil(i/this.chunkedMTU),r=0,o=0;for(;o<i;){let a=Math.min(i,o+this.chunkedMTU),c=e.slice(o,a),l={__peerData:this._dataCount,n:r,data:c,total:s};t.push(l),o=a,r++}return this._dataCount++,t}}};function Vy(n){let e=0;for(let s of n)e+=s.byteLength;let t=new Uint8Array(e),i=0;for(let s of n)t.set(s,i),i+=s.byteLength;return t}var ru=su.default||su,to=new class{isWebRTCSupported(){return typeof RTCPeerConnection<"u"}isBrowserSupported(){let n=this.getBrowser(),e=this.getVersion();return this.supportedBrowsers.includes(n)?n==="chrome"?e>=this.minChromeVersion:n==="firefox"?e>=this.minFirefoxVersion:n==="safari"?!this.isIOS&&e>=this.minSafariVersion:!1:!1}getBrowser(){return ru.browserDetails.browser}getVersion(){return ru.browserDetails.version||0}isUnifiedPlanSupported(){let n=this.getBrowser(),e=ru.browserDetails.version||0;if(n==="chrome"&&e<this.minChromeVersion)return!1;if(n==="firefox"&&e>=this.minFirefoxVersion)return!0;if(!window.RTCRtpTransceiver||!("currentDirection"in RTCRtpTransceiver.prototype))return!1;let t,i=!1;try{t=new RTCPeerConnection,t.addTransceiver("audio"),i=!0}catch{}finally{t&&t.close()}return i}toString(){return`Supports:
    browser:${this.getBrowser()}
    version:${this.getVersion()}
    isIOS:${this.isIOS}
    isWebRTCSupported:${this.isWebRTCSupported()}
    isBrowserSupported:${this.isBrowserSupported()}
    isUnifiedPlanSupported:${this.isUnifiedPlanSupported()}`}constructor(){this.isIOS=typeof navigator<"u"?["iPad","iPhone","iPod"].includes(navigator.platform):!1,this.supportedBrowsers=["firefox","chrome","safari"],this.minFirefoxVersion=59,this.minChromeVersion=72,this.minSafariVersion=605}},Wy=n=>!n||/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(n),mp=()=>Math.random().toString(36).slice(2),pp={iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:["turn:eu-0.turn.peerjs.com:3478","turn:us-0.turn.peerjs.com:3478"],username:"peerjs",credential:"peerjsp"}],sdpSemantics:"unified-plan"},ou=class extends Rc{noop(){}blobToArrayBuffer(e,t){let i=new FileReader;return i.onload=function(s){s.target&&t(s.target.result)},i.readAsArrayBuffer(e),i}binaryStringToArrayBuffer(e){let t=new Uint8Array(e.length);for(let i=0;i<e.length;i++)t[i]=e.charCodeAt(i)&255;return t.buffer}isSecure(){return location.protocol==="https:"}constructor(...e){super(...e),this.CLOUD_HOST="0.peerjs.com",this.CLOUD_PORT=443,this.chunkedBrowsers={Chrome:1,chrome:1},this.defaultConfig=pp,this.browser=to.getBrowser(),this.browserVersion=to.getVersion(),this.pack=Ah,this.unpack=wh,this.supports=(function(){let t={browser:to.isBrowserSupported(),webRTC:to.isWebRTCSupported(),audioVideo:!1,data:!1,binaryBlob:!1,reliable:!1};if(!t.webRTC)return t;let i;try{i=new RTCPeerConnection(pp),t.audioVideo=!0;let s;try{s=i.createDataChannel("_PEERJSTEST",{ordered:!0}),t.data=!0,t.reliable=!!s.ordered;try{s.binaryType="blob",t.binaryBlob=!to.isIOS}catch{}}catch{}finally{s&&s.close()}}catch{}finally{i&&i.close()}return t})(),this.validateId=Wy,this.randomToken=mp}},un=new ou,Xy="PeerJS: ";var au=class{get logLevel(){return this._logLevel}set logLevel(e){this._logLevel=e}log(...e){this._logLevel>=3&&this._print(3,...e)}warn(...e){this._logLevel>=2&&this._print(2,...e)}error(...e){this._logLevel>=1&&this._print(1,...e)}setLogFunction(e){this._print=e}_print(e,...t){let i=[Xy,...t];for(let s in i)i[s]instanceof Error&&(i[s]="("+i[s].name+") "+i[s].message);e>=3?console.log(...i):e>=2?console.warn("WARNING",...i):e>=1&&console.error("ERROR",...i)}constructor(){this._logLevel=0}},Pe=new au,yu={},qy=Object.prototype.hasOwnProperty,an="~";function ro(){}Object.create&&(ro.prototype=Object.create(null),new ro().__proto__||(an=!1));function Yy(n,e,t){this.fn=n,this.context=e,this.once=t||!1}function gp(n,e,t,i,s){if(typeof t!="function")throw new TypeError("The listener must be a function");var r=new Yy(t,i||n,s),o=an?an+e:e;return n._events[o]?n._events[o].fn?n._events[o]=[n._events[o],r]:n._events[o].push(r):(n._events[o]=r,n._eventsCount++),n}function Cc(n,e){--n._eventsCount===0?n._events=new ro:delete n._events[e]}function Qt(){this._events=new ro,this._eventsCount=0}Qt.prototype.eventNames=function(){var e=[],t,i;if(this._eventsCount===0)return e;for(i in t=this._events)qy.call(t,i)&&e.push(an?i.slice(1):i);return Object.getOwnPropertySymbols?e.concat(Object.getOwnPropertySymbols(t)):e};Qt.prototype.listeners=function(e){var t=an?an+e:e,i=this._events[t];if(!i)return[];if(i.fn)return[i.fn];for(var s=0,r=i.length,o=new Array(r);s<r;s++)o[s]=i[s].fn;return o};Qt.prototype.listenerCount=function(e){var t=an?an+e:e,i=this._events[t];return i?i.fn?1:i.length:0};Qt.prototype.emit=function(e,t,i,s,r,o){var a=an?an+e:e;if(!this._events[a])return!1;var c=this._events[a],l=arguments.length,h,d;if(c.fn){switch(c.once&&this.removeListener(e,c.fn,void 0,!0),l){case 1:return c.fn.call(c.context),!0;case 2:return c.fn.call(c.context,t),!0;case 3:return c.fn.call(c.context,t,i),!0;case 4:return c.fn.call(c.context,t,i,s),!0;case 5:return c.fn.call(c.context,t,i,s,r),!0;case 6:return c.fn.call(c.context,t,i,s,r,o),!0}for(d=1,h=new Array(l-1);d<l;d++)h[d-1]=arguments[d];c.fn.apply(c.context,h)}else{var p=c.length,g;for(d=0;d<p;d++)switch(c[d].once&&this.removeListener(e,c[d].fn,void 0,!0),l){case 1:c[d].fn.call(c[d].context);break;case 2:c[d].fn.call(c[d].context,t);break;case 3:c[d].fn.call(c[d].context,t,i);break;case 4:c[d].fn.call(c[d].context,t,i,s);break;default:if(!h)for(g=1,h=new Array(l-1);g<l;g++)h[g-1]=arguments[g];c[d].fn.apply(c[d].context,h)}}return!0};Qt.prototype.on=function(e,t,i){return gp(this,e,t,i,!1)};Qt.prototype.once=function(e,t,i){return gp(this,e,t,i,!0)};Qt.prototype.removeListener=function(e,t,i,s){var r=an?an+e:e;if(!this._events[r])return this;if(!t)return Cc(this,r),this;var o=this._events[r];if(o.fn)o.fn===t&&(!s||o.once)&&(!i||o.context===i)&&Cc(this,r);else{for(var a=0,c=[],l=o.length;a<l;a++)(o[a].fn!==t||s&&!o[a].once||i&&o[a].context!==i)&&c.push(o[a]);c.length?this._events[r]=c.length===1?c[0]:c:Cc(this,r)}return this};Qt.prototype.removeAllListeners=function(e){var t;return e?(t=an?an+e:e,this._events[t]&&Cc(this,t)):(this._events=new ro,this._eventsCount=0),this};Qt.prototype.off=Qt.prototype.removeListener;Qt.prototype.addListener=Qt.prototype.on;Qt.prefixed=an;Qt.EventEmitter=Qt;yu=Qt;var ss={};is(ss,"ConnectionType",()=>ki);is(ss,"PeerErrorType",()=>It);is(ss,"BaseConnectionErrorType",()=>cu);is(ss,"DataConnectionErrorType",()=>vu);is(ss,"SerializationType",()=>Uc);is(ss,"SocketEventType",()=>Oi);is(ss,"ServerMessageType",()=>Kt);var ki=(function(n){return n.Data="data",n.Media="media",n})({}),It=(function(n){return n.BrowserIncompatible="browser-incompatible",n.Disconnected="disconnected",n.InvalidID="invalid-id",n.InvalidKey="invalid-key",n.Network="network",n.PeerUnavailable="peer-unavailable",n.SslUnavailable="ssl-unavailable",n.ServerError="server-error",n.SocketError="socket-error",n.SocketClosed="socket-closed",n.UnavailableID="unavailable-id",n.WebRTC="webrtc",n})({}),cu=(function(n){return n.NegotiationFailed="negotiation-failed",n.ConnectionClosed="connection-closed",n})({}),vu=(function(n){return n.NotOpenYet="not-open-yet",n.MessageToBig="message-too-big",n})({}),Uc=(function(n){return n.Binary="binary",n.BinaryUTF8="binary-utf8",n.JSON="json",n.None="raw",n})({}),Oi=(function(n){return n.Message="message",n.Disconnected="disconnected",n.Error="error",n.Close="close",n})({}),Kt=(function(n){return n.Heartbeat="HEARTBEAT",n.Candidate="CANDIDATE",n.Offer="OFFER",n.Answer="ANSWER",n.Open="OPEN",n.Error="ERROR",n.IdTaken="ID-TAKEN",n.InvalidKey="INVALID-KEY",n.Leave="LEAVE",n.Expire="EXPIRE",n})({}),xp="1.5.5",lu=class extends yu.EventEmitter{constructor(e,t,i,s,r,o=5e3){super(),this.pingInterval=o,this._disconnected=!0,this._messagesQueue=[];let a=e?"wss://":"ws://";this._baseUrl=a+t+":"+i+s+"peerjs?key="+r}start(e,t){this._id=e;let i=`${this._baseUrl}&id=${e}&token=${t}`;this._socket||!this._disconnected||(this._socket=new WebSocket(i+"&version="+xp),this._disconnected=!1,this._socket.onmessage=s=>{let r;try{r=JSON.parse(s.data),Pe.log("Server message received:",r)}catch{Pe.log("Invalid server message",s.data);return}this.emit(Oi.Message,r)},this._socket.onclose=s=>{this._disconnected||(Pe.log("Socket closed.",s),this._cleanup(),this._disconnected=!0,this.emit(Oi.Disconnected))},this._socket.onopen=()=>{this._disconnected||(this._sendQueuedMessages(),Pe.log("Socket open"),this._scheduleHeartbeat())})}_scheduleHeartbeat(){this._wsPingTimer=setTimeout(()=>{this._sendHeartbeat()},this.pingInterval)}_sendHeartbeat(){if(!this._wsOpen()){Pe.log("Cannot send heartbeat, because socket closed");return}let e=JSON.stringify({type:Kt.Heartbeat});this._socket.send(e),this._scheduleHeartbeat()}_wsOpen(){return!!this._socket&&this._socket.readyState===1}_sendQueuedMessages(){let e=[...this._messagesQueue];this._messagesQueue=[];for(let t of e)this.send(t)}send(e){if(this._disconnected)return;if(!this._id){this._messagesQueue.push(e);return}if(!e.type){this.emit(Oi.Error,"Invalid message");return}if(!this._wsOpen())return;let t=JSON.stringify(e);this._socket.send(t)}close(){this._disconnected||(this._cleanup(),this._disconnected=!0)}_cleanup(){this._socket&&(this._socket.onopen=this._socket.onmessage=this._socket.onclose=null,this._socket.close(),this._socket=void 0),clearTimeout(this._wsPingTimer)}},Pc=class{constructor(e){this.connection=e}startConnection(e){let t=this._startPeerConnection();if(this.connection.peerConnection=t,this.connection.type===ki.Media&&e._stream&&this._addTracksToConnection(e._stream,t),e.originator){let i=this.connection,s={ordered:!!e.reliable},r=t.createDataChannel(i.label,s);i._initializeDataChannel(r),this._makeOffer()}else this.handleSDP("OFFER",e.sdp)}_startPeerConnection(){Pe.log("Creating RTCPeerConnection.");let e=new RTCPeerConnection(this.connection.provider.options.config);return this._setupListeners(e),e}_setupListeners(e){let t=this.connection.peer,i=this.connection.connectionId,s=this.connection.type,r=this.connection.provider;Pe.log("Listening for ICE candidates."),e.onicecandidate=o=>{!o.candidate||!o.candidate.candidate||(Pe.log(`Received ICE candidates for ${t}:`,o.candidate),r.socket.send({type:Kt.Candidate,payload:{candidate:o.candidate,type:s,connectionId:i},dst:t}))},e.oniceconnectionstatechange=()=>{switch(e.iceConnectionState){case"failed":Pe.log("iceConnectionState is failed, closing connections to "+t),this.connection.emitError(cu.NegotiationFailed,"Negotiation of connection to "+t+" failed."),this.connection.close();break;case"closed":Pe.log("iceConnectionState is closed, closing connections to "+t),this.connection.emitError(cu.ConnectionClosed,"Connection to "+t+" closed."),this.connection.close();break;case"disconnected":Pe.log("iceConnectionState changed to disconnected on the connection with "+t);break;case"completed":e.onicecandidate=()=>{};break}this.connection.emit("iceStateChanged",e.iceConnectionState)},Pe.log("Listening for data channel"),e.ondatachannel=o=>{Pe.log("Received data channel");let a=o.channel;r.getConnection(t,i)._initializeDataChannel(a)},Pe.log("Listening for remote stream"),e.ontrack=o=>{Pe.log("Received remote stream");let a=o.streams[0],c=r.getConnection(t,i);if(c.type===ki.Media){let l=c;this._addStreamToMediaConnection(a,l)}}}cleanup(){Pe.log("Cleaning up PeerConnection to "+this.connection.peer);let e=this.connection.peerConnection;if(!e)return;this.connection.peerConnection=null,e.onicecandidate=e.oniceconnectionstatechange=e.ondatachannel=e.ontrack=()=>{};let t=e.signalingState!=="closed",i=!1,s=this.connection.dataChannel;s&&(i=!!s.readyState&&s.readyState!=="closed"),(t||i)&&e.close()}async _makeOffer(){let e=this.connection.peerConnection,t=this.connection.provider;try{let i=await e.createOffer(this.connection.options.constraints);Pe.log("Created offer."),this.connection.options.sdpTransform&&typeof this.connection.options.sdpTransform=="function"&&(i.sdp=this.connection.options.sdpTransform(i.sdp)||i.sdp);try{await e.setLocalDescription(i),Pe.log("Set localDescription:",i,`for:${this.connection.peer}`);let s={sdp:i,type:this.connection.type,connectionId:this.connection.connectionId,metadata:this.connection.metadata};if(this.connection.type===ki.Data){let r=this.connection;s={...s,label:r.label,reliable:r.reliable,serialization:r.serialization}}t.socket.send({type:Kt.Offer,payload:s,dst:this.connection.peer})}catch(s){s!="OperationError: Failed to set local offer sdp: Called in wrong state: kHaveRemoteOffer"&&(t.emitError(It.WebRTC,s),Pe.log("Failed to setLocalDescription, ",s))}}catch(i){t.emitError(It.WebRTC,i),Pe.log("Failed to createOffer, ",i)}}async _makeAnswer(){let e=this.connection.peerConnection,t=this.connection.provider;try{let i=await e.createAnswer();Pe.log("Created answer."),this.connection.options.sdpTransform&&typeof this.connection.options.sdpTransform=="function"&&(i.sdp=this.connection.options.sdpTransform(i.sdp)||i.sdp);try{await e.setLocalDescription(i),Pe.log("Set localDescription:",i,`for:${this.connection.peer}`),t.socket.send({type:Kt.Answer,payload:{sdp:i,type:this.connection.type,connectionId:this.connection.connectionId},dst:this.connection.peer})}catch(s){t.emitError(It.WebRTC,s),Pe.log("Failed to setLocalDescription, ",s)}}catch(i){t.emitError(It.WebRTC,i),Pe.log("Failed to create answer, ",i)}}async handleSDP(e,t){t=new RTCSessionDescription(t);let i=this.connection.peerConnection,s=this.connection.provider;Pe.log("Setting remote description",t);let r=this;try{await i.setRemoteDescription(t),Pe.log(`Set remoteDescription:${e} for:${this.connection.peer}`),e==="OFFER"&&await r._makeAnswer()}catch(o){s.emitError(It.WebRTC,o),Pe.log("Failed to setRemoteDescription, ",o)}}async handleCandidate(e){Pe.log("handleCandidate:",e);try{await this.connection.peerConnection.addIceCandidate(e),Pe.log(`Added ICE candidate for:${this.connection.peer}`)}catch(t){this.connection.provider.emitError(It.WebRTC,t),Pe.log("Failed to handleCandidate, ",t)}}_addTracksToConnection(e,t){if(Pe.log(`add tracks from stream ${e.id} to peer connection`),!t.addTrack)return Pe.error("Your browser does't support RTCPeerConnection#addTrack. Ignored.");e.getTracks().forEach(i=>{t.addTrack(i,e)})}_addStreamToMediaConnection(e,t){Pe.log(`add stream ${e.id} to media connection ${t.connectionId}`),t.addStream(e)}},Ic=class extends yu.EventEmitter{emitError(e,t){Pe.error("Error:",t),this.emit("error",new hu(`${e}`,t))}},hu=class extends Error{constructor(e,t){typeof t=="string"?super(t):(super(),Object.assign(this,t)),this.type=e}},Lc=class extends Ic{get open(){return this._open}constructor(e,t,i){super(),this.peer=e,this.provider=t,this.options=i,this._open=!1,this.metadata=i.metadata}},mu,io=class io extends Lc{get type(){return ki.Media}get localStream(){return this._localStream}get remoteStream(){return this._remoteStream}constructor(e,t,i){super(e,t,i),this._localStream=this.options._stream,this.connectionId=this.options.connectionId||io.ID_PREFIX+un.randomToken(),this._negotiator=new Pc(this),this._localStream&&this._negotiator.startConnection({_stream:this._localStream,originator:!0})}_initializeDataChannel(e){this.dataChannel=e,this.dataChannel.onopen=()=>{Pe.log(`DC#${this.connectionId} dc connection success`),this.emit("willCloseOnRemote")},this.dataChannel.onclose=()=>{Pe.log(`DC#${this.connectionId} dc closed for:`,this.peer),this.close()}}addStream(e){Pe.log("Receiving stream",e),this._remoteStream=e,super.emit("stream",e)}handleMessage(e){let t=e.type,i=e.payload;switch(e.type){case Kt.Answer:this._negotiator.handleSDP(t,i.sdp),this._open=!0;break;case Kt.Candidate:this._negotiator.handleCandidate(i.candidate);break;default:Pe.warn(`Unrecognized message type:${t} from peer:${this.peer}`);break}}answer(e,t={}){if(this._localStream){Pe.warn("Local stream already exists on this MediaConnection. Are you answering a call twice?");return}this._localStream=e,t&&t.sdpTransform&&(this.options.sdpTransform=t.sdpTransform),this._negotiator.startConnection({...this.options._payload,_stream:e});let i=this.provider._getMessages(this.connectionId);for(let s of i)this.handleMessage(s);this._open=!0}close(){this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this._localStream=null,this._remoteStream=null,this.provider&&(this.provider._removeConnection(this),this.provider=null),this.options&&this.options._stream&&(this.options._stream=null),this.open&&(this._open=!1,super.emit("close"))}};mu=new WeakMap,ir(io,mu,io.ID_PREFIX="mc_");var Dc=io,uu=class{constructor(e){this._options=e}_buildRequest(e){let t=this._options.secure?"https":"http",{host:i,port:s,path:r,key:o}=this._options,a=new URL(`${t}://${i}:${s}${r}${o}/${e}`);return a.searchParams.set("ts",`${Date.now()}${Math.random()}`),a.searchParams.set("version",xp),fetch(a.href,{referrerPolicy:this._options.referrerPolicy})}async retrieveId(){try{let e=await this._buildRequest("id");if(e.status!==200)throw new Error(`Error. Status:${e.status}`);return e.text()}catch(e){Pe.error("Error retrieving ID",e);let t="";throw this._options.path==="/"&&this._options.host!==un.CLOUD_HOST&&(t=" If you passed in a `path` to your self-hosted PeerServer, you'll also need to pass in that same path when creating a new Peer."),new Error("Could not get an ID from the server."+t)}}async listAllPeers(){try{let e=await this._buildRequest("peers");if(e.status!==200){if(e.status===401){let t="";throw this._options.host===un.CLOUD_HOST?t="It looks like you're using the cloud server. You can email team@peerjs.com to enable peer listing for your API key.":t="You need to enable `allow_discovery` on your self-hosted PeerServer to use this feature.",new Error("It doesn't look like you have permission to list peers IDs. "+t)}throw new Error(`Error. Status:${e.status}`)}return e.json()}catch(e){throw Pe.error("Error retrieving list peers",e),new Error("Could not get list peers from the server."+e)}}},gu,xu,ns=class ns extends Lc{get type(){return ki.Data}constructor(e,t,i){super(e,t,i),this.connectionId=this.options.connectionId||ns.ID_PREFIX+mp(),this.label=this.options.label||this.connectionId,this.reliable=!!this.options.reliable,this._negotiator=new Pc(this),this._negotiator.startConnection(this.options._payload||{originator:!0,reliable:this.reliable})}_initializeDataChannel(e){this.dataChannel=e,this.dataChannel.onopen=()=>{Pe.log(`DC#${this.connectionId} dc connection success`),this._open=!0,this.emit("open")},this.dataChannel.onmessage=t=>{Pe.log(`DC#${this.connectionId} dc onmessage:`,t.data)},this.dataChannel.onclose=()=>{Pe.log(`DC#${this.connectionId} dc closed for:`,this.peer),this.close()}}close(e){if(e?.flush){this.send({__peerData:{type:"close"}});return}this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this.provider&&(this.provider._removeConnection(this),this.provider=null),this.dataChannel&&(this.dataChannel.onopen=null,this.dataChannel.onmessage=null,this.dataChannel.onclose=null,this.dataChannel=null),this.open&&(this._open=!1,super.emit("close"))}send(e,t=!1){if(!this.open){this.emitError(vu.NotOpenYet,"Connection is not open. You should listen for the `open` event before sending messages.");return}return this._send(e,t)}async handleMessage(e){let t=e.payload;switch(e.type){case Kt.Answer:await this._negotiator.handleSDP(e.type,t.sdp);break;case Kt.Candidate:await this._negotiator.handleCandidate(t.candidate);break;default:Pe.warn("Unrecognized message type:",e.type,"from peer:",this.peer);break}}};gu=new WeakMap,xu=new WeakMap,ir(ns,gu,ns.ID_PREFIX="dc_"),ir(ns,xu,ns.MAX_BUFFERED_AMOUNT=8388608);var Nc=ns,oo=class extends Nc{get bufferSize(){return this._bufferSize}_initializeDataChannel(e){super._initializeDataChannel(e),this.dataChannel.binaryType="arraybuffer",this.dataChannel.addEventListener("message",t=>this._handleDataMessage(t))}_bufferedSend(e){(this._buffering||!this._trySend(e))&&(this._buffer.push(e),this._bufferSize=this._buffer.length)}_trySend(e){if(!this.open)return!1;if(this.dataChannel.bufferedAmount>Nc.MAX_BUFFERED_AMOUNT)return this._buffering=!0,setTimeout(()=>{this._buffering=!1,this._tryBuffer()},50),!1;try{this.dataChannel.send(e)}catch(t){return Pe.error(`DC#:${this.connectionId} Error when sending:`,t),this._buffering=!0,this.close(),!1}return!0}_tryBuffer(){if(!this.open||this._buffer.length===0)return;let e=this._buffer[0];this._trySend(e)&&(this._buffer.shift(),this._bufferSize=this._buffer.length,this._tryBuffer())}close(e){if(e?.flush){this.send({__peerData:{type:"close"}});return}this._buffer=[],this._bufferSize=0,super.close()}constructor(...e){super(...e),this._buffer=[],this._bufferSize=0,this._buffering=!1}},no=class extends oo{close(e){super.close(e),this._chunkedData={}}constructor(e,t,i){super(e,t,i),this.chunker=new Rc,this.serialization=Uc.Binary,this._chunkedData={}}_handleDataMessage({data:e}){let t=wh(e),i=t.__peerData;if(i){if(i.type==="close"){this.close();return}this._handleChunk(t);return}this.emit("data",t)}_handleChunk(e){let t=e.__peerData,i=this._chunkedData[t]||{data:[],count:0,total:e.total};if(i.data[e.n]=new Uint8Array(e.data),i.count++,this._chunkedData[t]=i,i.total===i.count){delete this._chunkedData[t];let s=Vy(i.data);this._handleDataMessage({data:s})}}_send(e,t){let i=Ah(e);if(i instanceof Promise)return this._send_blob(i);if(!t&&i.byteLength>this.chunker.chunkedMTU){this._sendChunks(i);return}this._bufferedSend(i)}async _send_blob(e){let t=await e;if(t.byteLength>this.chunker.chunkedMTU){this._sendChunks(t);return}this._bufferedSend(t)}_sendChunks(e){let t=this.chunker.chunk(e);Pe.log(`DC#${this.connectionId} Try to send ${t.length} chunks...`);for(let i of t)this.send(i,!0)}},du=class extends oo{_handleDataMessage({data:e}){super.emit("data",e)}_send(e,t){this._bufferedSend(e)}constructor(...e){super(...e),this.serialization=Uc.None}},fu=class extends oo{_handleDataMessage({data:e}){let t=this.parse(this.decoder.decode(e)),i=t.__peerData;if(i&&i.type==="close"){this.close();return}this.emit("data",t)}_send(e,t){let i=this.encoder.encode(this.stringify(e));if(i.byteLength>=un.chunkedMTU){this.emitError(vu.MessageToBig,"Message too big for JSON channel");return}this._bufferedSend(i)}constructor(...e){super(...e),this.serialization=Uc.JSON,this.encoder=new TextEncoder,this.decoder=new TextDecoder,this.stringify=JSON.stringify,this.parse=JSON.parse}};var _u,so=class so extends Ic{get id(){return this._id}get options(){return this._options}get open(){return this._open}get socket(){return this._socket}get connections(){let e=Object.create(null);for(let[t,i]of this._connections)e[t]=i;return e}get destroyed(){return this._destroyed}get disconnected(){return this._disconnected}constructor(e,t){super(),this._serializers={raw:du,json:fu,binary:no,"binary-utf8":no,default:no},this._id=null,this._lastServerId=null,this._destroyed=!1,this._disconnected=!1,this._open=!1,this._connections=new Map,this._lostMessages=new Map;let i;if(e&&e.constructor==Object?t=e:e&&(i=e.toString()),t={debug:0,host:un.CLOUD_HOST,port:un.CLOUD_PORT,path:"/",key:so.DEFAULT_KEY,token:un.randomToken(),config:un.defaultConfig,referrerPolicy:"strict-origin-when-cross-origin",serializers:{},...t},this._options=t,this._serializers={...this._serializers,...this.options.serializers},this._options.host==="/"&&(this._options.host=window.location.hostname),this._options.path&&(this._options.path[0]!=="/"&&(this._options.path="/"+this._options.path),this._options.path[this._options.path.length-1]!=="/"&&(this._options.path+="/")),this._options.secure===void 0&&this._options.host!==un.CLOUD_HOST?this._options.secure=un.isSecure():this._options.host==un.CLOUD_HOST&&(this._options.secure=!0),this._options.logFunction&&Pe.setLogFunction(this._options.logFunction),Pe.logLevel=this._options.debug||0,this._api=new uu(t),this._socket=this._createServerConnection(),!un.supports.audioVideo&&!un.supports.data){this._delayedAbort(It.BrowserIncompatible,"The current browser does not support WebRTC");return}if(i&&!un.validateId(i)){this._delayedAbort(It.InvalidID,`ID "${i}" is invalid`);return}i?this._initialize(i):this._api.retrieveId().then(s=>this._initialize(s)).catch(s=>this._abort(It.ServerError,s))}_createServerConnection(){let e=new lu(this._options.secure,this._options.host,this._options.port,this._options.path,this._options.key,this._options.pingInterval);return e.on(Oi.Message,t=>{this._handleMessage(t)}),e.on(Oi.Error,t=>{this._abort(It.SocketError,t)}),e.on(Oi.Disconnected,()=>{this.disconnected||(this.emitError(It.Network,"Lost connection to server."),this.disconnect())}),e.on(Oi.Close,()=>{this.disconnected||this._abort(It.SocketClosed,"Underlying socket is already closed.")}),e}_initialize(e){this._id=e,this.socket.start(e,this._options.token)}_handleMessage(e){let t=e.type,i=e.payload,s=e.src;switch(t){case Kt.Open:this._lastServerId=this.id,this._open=!0,this.emit("open",this.id);break;case Kt.Error:this._abort(It.ServerError,i.msg);break;case Kt.IdTaken:this._abort(It.UnavailableID,`ID "${this.id}" is taken`);break;case Kt.InvalidKey:this._abort(It.InvalidKey,`API KEY "${this._options.key}" is invalid`);break;case Kt.Leave:Pe.log(`Received leave message from ${s}`),this._cleanupPeer(s),this._connections.delete(s);break;case Kt.Expire:this.emitError(It.PeerUnavailable,`Could not connect to peer ${s}`);break;case Kt.Offer:{let r=i.connectionId,o=this.getConnection(s,r);if(o&&(o.close(),Pe.warn(`Offer received for existing Connection ID:${r}`)),i.type===ki.Media){let c=new Dc(s,this,{connectionId:r,_payload:i,metadata:i.metadata});o=c,this._addConnection(s,o),this.emit("call",c)}else if(i.type===ki.Data){let c=new this._serializers[i.serialization](s,this,{connectionId:r,_payload:i,metadata:i.metadata,label:i.label,serialization:i.serialization,reliable:i.reliable});o=c,this._addConnection(s,o),this.emit("connection",c)}else{Pe.warn(`Received malformed connection type:${i.type}`);return}let a=this._getMessages(r);for(let c of a)o.handleMessage(c);break}default:{if(!i){Pe.warn(`You received a malformed message from ${s} of type ${t}`);return}let r=i.connectionId,o=this.getConnection(s,r);o&&o.peerConnection?o.handleMessage(e):r?this._storeMessage(r,e):Pe.warn("You received an unrecognized message:",e);break}}}_storeMessage(e,t){this._lostMessages.has(e)||this._lostMessages.set(e,[]),this._lostMessages.get(e).push(t)}_getMessages(e){let t=this._lostMessages.get(e);return t?(this._lostMessages.delete(e),t):[]}connect(e,t={}){if(t={serialization:"default",...t},this.disconnected){Pe.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect, or call reconnect on this peer if you believe its ID to still be available."),this.emitError(It.Disconnected,"Cannot connect to new Peer after disconnecting from server.");return}let i=new this._serializers[t.serialization](e,this,t);return this._addConnection(e,i),i}call(e,t,i={}){if(this.disconnected){Pe.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect."),this.emitError(It.Disconnected,"Cannot connect to new Peer after disconnecting from server.");return}if(!t){Pe.error("To call a peer, you must provide a stream from your browser's `getUserMedia`.");return}let s=new Dc(e,this,{...i,_stream:t});return this._addConnection(e,s),s}_addConnection(e,t){Pe.log(`add connection ${t.type}:${t.connectionId} to peerId:${e}`),this._connections.has(e)||this._connections.set(e,[]),this._connections.get(e).push(t)}_removeConnection(e){let t=this._connections.get(e.peer);if(t){let i=t.indexOf(e);i!==-1&&t.splice(i,1)}this._lostMessages.delete(e.connectionId)}getConnection(e,t){let i=this._connections.get(e);if(!i)return null;for(let s of i)if(s.connectionId===t)return s;return null}_delayedAbort(e,t){setTimeout(()=>{this._abort(e,t)},0)}_abort(e,t){Pe.error("Aborting!"),this.emitError(e,t),this._lastServerId?this.disconnect():this.destroy()}destroy(){this.destroyed||(Pe.log(`Destroy peer with ID:${this.id}`),this.disconnect(),this._cleanup(),this._destroyed=!0,this.emit("close"))}_cleanup(){for(let e of this._connections.keys())this._cleanupPeer(e),this._connections.delete(e);this.socket.removeAllListeners()}_cleanupPeer(e){let t=this._connections.get(e);if(t)for(let i of t)i.close()}disconnect(){if(this.disconnected)return;let e=this.id;Pe.log(`Disconnect peer with ID:${e}`),this._disconnected=!0,this._open=!1,this.socket.close(),this._lastServerId=e,this._id=null,this.emit("disconnected",e)}reconnect(){if(this.disconnected&&!this.destroyed)Pe.log(`Attempting reconnection to server with ID ${this._lastServerId}`),this._disconnected=!1,this._initialize(this._lastServerId);else{if(this.destroyed)throw new Error("This peer cannot reconnect to the server. It has already been destroyed.");if(!this.disconnected&&!this.open)Pe.error("In a hurry? We're still trying to make the initial connection!");else throw new Error(`Peer ${this.id} cannot reconnect because it is not disconnected from the server!`)}}listAllPeers(e=t=>{}){this._api.listAllPeers().then(t=>e(t)).catch(t=>this._abort(It.ServerError,t))}};_u=new WeakMap,ir(so,_u,so.DEFAULT_KEY="peerjs");var pu=so;var _p=pu;var ao=[{id:"chef",name:"Chef",emoji:"\u{1F468}\u200D\u{1F373}",tag:"kitchen",color:15921906,ab:"hint",abName:"Secret Recipe",abDesc:"Remove 2 wrong answers on a question (2 times).",charges:2},{id:"doctor",name:"Doctor",emoji:"\u{1FA7A}",tag:"clinic",color:4171680,ab:"revive",abName:"Revive",abDesc:"Bring back a caught teammate. Stand next to their body and press Q (once).",charges:1},{id:"librarian",name:"Librarian",emoji:"\u{1F4DA}",tag:"library",color:8081312,ab:"clue",abName:"Book of Secrets",abDesc:"Reveal one extra clue about the killer (once). Press Q.",charges:1},{id:"scientist",name:"Scientist",emoji:"\u{1F52C}",tag:"lab",color:15263976,ab:"danger",abName:"Danger Sense",abDesc:"Your screen pulses red when the killer is close (automatic).",charges:0},{id:"engineer",name:"Engineer",emoji:"\u{1F527}",tag:"workshop",color:15902976,ab:"second",abName:"Second Chance",abDesc:"A wrong answer will NOT power up the killer (2 times, automatic).",charges:2},{id:"detective",name:"Detective",emoji:"\u{1F575}\uFE0F",tag:"office",color:7031342,ab:"xray",abName:"X-Ray Eyes",abDesc:"See everyone through walls for 5 seconds. Press Q (45s recharge).",cd:45,dur:5},{id:"explorer",name:"Explorer",emoji:"\u{1F9ED}",tag:"outdoor",color:3967548,ab:"sprint",abName:"Super Sprint",abDesc:"Run much faster for 4 seconds. Press Q (25s recharge).",cd:25,dur:4},{id:"artist",name:"Artist",emoji:"\u{1F3A8}",tag:"art",color:14174826,ab:"lamp",abName:"Glow Lamp",abDesc:"Drop a bright lamp that glows for 40 seconds. Press Q (30s recharge).",cd:30,dur:40},{id:"dog",name:"Dog Handler",emoji:"\u{1F415}",tag:"outdoor",color:9067051,ab:"sniff",abName:"Sniff",abDesc:"Your dog sniffs out the nearest unfinished task. An arrow points the way for 8 seconds. Press Q (20s recharge).",cd:20,dur:8},{id:"magician",name:"Magician",emoji:"\u{1F9D9}",tag:"art",color:4927370,ab:"swap",abName:"Magic Swap",abDesc:"Swap places with the nearest teammate (within 14 steps). Great for escaping! Press Q (35s recharge).",cd:35},{id:"firefighter",name:"Firefighter",emoji:"\u{1F9D1}\u200D\u{1F692}",tag:"workshop",color:13712174,ab:"axe",abName:"Axe",abDesc:"Break open the nearest locked door, no question needed (2 times). Press Q.",charges:2},{id:"guard",name:"Guard",emoji:"\u{1F6E1}\uFE0F",tag:"office",color:3104691,ab:"shield",abName:"Shield",abDesc:"A shield protects you and teammates nearby from being caught for 5 seconds. Press Q (40s recharge).",cd:40,dur:5},{id:"musician",name:"Musician",emoji:"\u{1F3B5}",tag:"library",color:2072202,ab:"lullaby",abName:"Lullaby",abDesc:"Play a calm tune. The killer slows down for 6 seconds if close. Press Q (35s recharge).",cd:35,dur:6},{id:"radio",name:"Radio Operator",emoji:"\u{1F4E1}",tag:"lab",color:5925690,ab:"scan",abName:"Scan",abDesc:"Your radio shows where everyone is on the map for 5 seconds. Press Q (40s recharge).",cd:40,dur:5}],xn=n=>ao.find(e=>e.id===n)||ao[0],Zy={kitchen:"Stove",clinic:"Hospital Bed",library:"Bookshelf",lab:"Lab Bench",workshop:"Workbench",office:"Desk",outdoor:"Supply Crates",art:"Easel"},Oc={school:{name:"Haunted School",emoji:"\u{1F3EB}",seed:11,indoor:!0,H:3.8,bg:263432,fog:.085,hemi:[4871288,1709330,.6],floor:[4867646,4209717],wall:7301467,ceil:2828839,trim:3814701,bulb:16770728,blood:6949900,pc:[8018490,6112816,4087658],props:["table","locker","shelf","crate","table"],hub:"Main Hall",exit:"Front Gate",rooms:{"0,0":["library","Library"],"1,0":["lab","Science Lab"],"2,0":["art","Art Room"],"0,1":["kitchen","Canteen"],"2,1":["clinic","Sick Bay"],"0,2":["workshop","Workshop"],"1,2":["outdoor","Gym"],"2,2":["office","Principal's Office"]},links:["11-10","11-01","11-21*","11-12","00-10","00-01*","20-10","02-01","22-21","22-12*"]},hospital:{name:"Abandoned Hospital",emoji:"\u{1F3E5}",seed:23,indoor:!0,H:3.6,bg:198408,fog:.09,hemi:[5933702,1055256,.6],floor:[8227462,7306360],wall:10334378,ceil:5201242,trim:6255213,bulb:13172720,blood:7343373,pc:[14212828,11057332,7177600],props:["bed","bed","locker","crate","table"],hub:"Reception",exit:"Ambulance Bay",rooms:{"0,0":["clinic","Patient Ward"],"1,0":["lab","Laboratory"],"2,0":["library","Records Room"],"0,1":["kitchen","Cafeteria"],"2,1":["workshop","Boiler Room"],"0,2":["art","Therapy Room"],"1,2":["office","Admin Office"],"2,2":["outdoor","Courtyard"]},links:["11-10","11-01*","11-21","11-12","00-10","00-01","10-20","20-21","02-12","02-01*","22-12","22-21*"]},mansion:{name:"Creepy Mansion",emoji:"\u{1F3DA}\uFE0F",seed:37,indoor:!0,H:5,bg:459526,fog:.075,hemi:[6963810,1838606,.6],floor:[5908014,4857638],wall:7030326,ceil:2758674,trim:10123818,bulb:16757594,blood:4851206,pc:[3810328,5913130,8006186],props:["couch","table","pillar","coffin","shelf"],hub:"Grand Hall",exit:"Front Door",rooms:{"0,0":["kitchen","Old Kitchen"],"1,0":["library","Grand Library"],"2,0":["art","Portrait Gallery"],"0,1":["workshop","Cellar Workshop"],"2,1":["lab","Alchemist's Study"],"0,2":["clinic","Sick Room"],"1,2":["office","Butler's Office"],"2,2":["outdoor","Conservatory"]},links:["11-10","11-01","11-21","11-12*","00-10","00-01","20-10*","20-21","02-01","22-12","22-21*","02-12"]},cabin:{name:"Dark Forest Cabin",emoji:"\u{1F332}",seed:53,indoor:!1,H:4.4,bg:132362,fog:.065,hemi:[4873882,1451546,.75],floor:[3428394,2835491],wall:1853992,ceil:0,trim:2759178,bulb:16751168,blood:5376008,pc:[3811866,4863522,2833186],props:["tree","log","tree","grave","crate"],hub:"Cabin Clearing",exit:"Forest Road",rooms:{"0,0":["workshop","Woodcutter's Shed"],"1,0":["outdoor","Old Graveyard"],"2,0":["library","Witch's Library"],"0,1":["kitchen","Campfire Kitchen"],"2,1":["clinic","Healer's Hut"],"0,2":["lab","Swamp Lab"],"1,2":["office","Ranger Station"],"2,2":["art","Painter's Cabin"]},links:["11-10*","11-01","11-21","11-12","00-10","20-21","02-01","22-12","22-21","10-20*","00-01*"]},asylum:{name:"Abandoned Asylum",emoji:"\u{1F9E0}",seed:71,indoor:!0,H:3.7,bg:197892,fog:.1,hemi:[6982258,1186324,.62],floor:[5925468,5135440],wall:9149062,ceil:2765356,trim:3884605,bulb:13625520,blood:5900296,pc:[10135706,7306352,5134928],props:["bed","locker","crate","table","pillar"],hub:"Central Ward",exit:"Main Gate",rooms:{"0,0":["clinic","Patient Cells"],"1,0":["lab","Treatment Room"],"2,0":["library","Records Archive"],"0,1":["kitchen","Mess Hall"],"2,1":["office","Director's Office"],"0,2":["workshop","Boiler Basement"],"1,2":["art","Therapy Room"],"2,2":["outdoor","Padded Block"]},links:["11-10","11-01*","11-21","11-12","00-10","00-01","20-10*","20-21","02-01","22-12*","22-21","02-12"],sn:{kitchen:"Rusty Stove",clinic:"Padded Bed",library:"Patient Files",lab:"Treatment Table",workshop:"Fuse Box",office:"Director's Desk",outdoor:"Supply Crates",art:"Drawing Wall"},story:"The patients are gone... but something is still walking the halls. Find the fuses before the lights die.",hazard:"blackout",hatch:["0,0","2,2"]},hotel:{name:"Haunted Hotel",emoji:"\u{1F3E8}",seed:83,indoor:!0,H:3.4,bg:328709,fog:.08,hemi:[6969928,1577488,.6],floor:[3099210,2506302],wall:10259050,ceil:2825240,trim:13214282,bulb:16765834,blood:3802373,pc:[6965808,9075290,3099210],props:["couch","table","pillar","shelf","bed"],hub:"Grand Lobby",exit:"Hotel Entrance",rooms:{"0,0":["clinic","Room 13"],"1,0":["library","Reading Lounge"],"2,0":["lab","Pool Pump Room"],"0,1":["kitchen","Hotel Kitchen"],"2,1":["office","Front Office"],"0,2":["workshop","Maintenance"],"1,2":["art","Ballroom"],"2,2":["outdoor","Luggage Store"]},links:["11-10","11-01","11-21*","11-12","00-10*","10-20","00-01","20-21","02-01*","02-12","22-12","22-21"],sn:{kitchen:"Hotel Stove",clinic:"Guest Bed",library:"Guest Book",lab:"Pool Chemicals",workshop:"Maintenance Bench",office:"Front Desk",outdoor:"Luggage Pile",art:"Painting Wall"},story:"Check-out time was 100 years ago. The doors here slam shut on their own... Keep moving.",hazard:"slam",hatch:["2,0","0,2"]},bunker:{name:"Underground Bunker",emoji:"\u{1F6A8}",seed:97,indoor:!0,H:3,bg:262915,fog:.09,hemi:[8010296,1312776,.5],floor:[5593694,4869971],wall:6975606,ceil:2895667,trim:9054762,bulb:16743002,blood:3801088,pc:[4870232,6975606,5913136],props:["crate","locker","shelf","table","pillar"],hub:"Command Hall",exit:"Blast Door",rooms:{"0,0":["lab","Reactor Lab"],"1,0":["clinic","Medical Bay"],"2,0":["library","Archive Vault"],"0,1":["kitchen","Ration Hall"],"2,1":["office","Radio Room"],"0,2":["workshop","Generator Room"],"1,2":["outdoor","Supply Depot"],"2,2":["art","Barracks"]},links:["11-10","11-01*","11-21","11-12*","00-10","10-20*","00-01","20-21","02-01","22-21*","02-12","22-12"],sn:{kitchen:"Ration Stove",clinic:"Medical Bunk",library:"Archive Terminal",lab:"Reactor Console",workshop:"Generator",office:"Radio Desk",outdoor:"Supply Lockers",art:"Wall Map"},story:"Deep underground, the air is bad and the siren will not stop. Avoid the green gas clouds!",hazard:"gas",hatch:["0,0","2,1"],gas:["1,0","0,1","1,2"]},carnival:{name:"Creepy Carnival",emoji:"\u{1F3AA}",seed:109,indoor:!0,H:6.2,bg:459530,fog:.07,hemi:[8014474,1706528,.65],floor:[6957658,4857928],wall:10107450,ceil:2756656,trim:14725168,bulb:16765183,blood:5245450,pc:[14725168,11553354,4864650],props:["crate","table","pillar","log","couch"],hub:"Midway Square",exit:"Main Gate",rooms:{"0,0":["library","Ticket Office"],"1,0":["lab","Mirror Maze"],"2,0":["kitchen","Candy Stall"],"0,1":["clinic","Fortune Teller Tent"],"2,1":["office","Ringmaster's Wagon"],"0,2":["workshop","Ride Repair Shed"],"1,2":["art","Clown Tent"],"2,2":["outdoor","Prize Crates"]},links:["11-10","11-01","11-21","11-12","00-10*","10-20","00-01*","20-21","02-01","22-21*","02-12*","22-12"],sn:{kitchen:"Popcorn Machine",clinic:"Fortune Teller's Table",library:"Ticket Booth",lab:"Mirror Panel",workshop:"Ride Control Box",office:"Ringmaster's Desk",outdoor:"Prize Crates",art:"Face-Paint Stand"},story:"The show never ended... and the clown is still laughing. The funhouse mirrors play tricks on your map!",hazard:"mirror",hatch:["2,0","0,2"]}},D1=Object.keys(Oc).map(n=>({id:n,name:Oc[n].name,emoji:Oc[n].emoji}));function Jy(n){let e=n>>>0;return()=>{e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function mi(n,e){let t=Math.min(255,Math.round((n>>16&255)*e)),i=Math.min(255,Math.round((n>>8&255)*e)),s=Math.min(255,Math.round((n&255)*e));return t<<16|i<<8|s}var $y={table:{w:1.8,h:.8,d:1},couch:{w:2.2,h:.8,d:.9},crate:{w:1,h:1,d:1},bed:{w:2,h:.55,d:.95},coffin:{w:.9,h:.7,d:2},log:{w:2.4,h:.5,d:.55},grave:{w:.8,h:1.1,d:.25},pillar:{w:.7,h:-1,d:.7},tree:{w:.5,h:3.2,d:.5},shelf:{w:.6,h:2.1,d:2.2,wall:!0},locker:{w:.6,h:2,d:1.6,wall:!0}};function yp(n,e){let t=Oc[n],i=!!(e&&e.lockAll),s=Jy(t.seed),r=t.H,o=[],a=[],c=[],l=[],h=[],d=[],p=[],g=[],x=(R,P,U,F,G,te,ce,Ae,j,le)=>R.push({s:P,x:U,y:F+ce/2,z:G,w:te,h:ce,d:Ae,c:j,f:le||0}),y=(R,P,U,F,G,te,ce)=>x(o,"b",R,P,U,F,G,te,ce),f=(R,P,U,F,G,te,ce,Ae)=>x(a,"b",R,P,U,F,G,te,ce,Ae),m=(R,P,U,F)=>c.push({x0:R,z0:P,x1:U,z1:F}),v=[];for(let R=0;R<3;R++)for(let P=0;P<3;P++)v.push([P,R]);v.push([1,3]);let E=(R,P)=>R>=0&&R<3&&P>=0&&P<3||R===1&&P===3,M=(R,P)=>R<P?R+"-"+P:P+"-"+R,w=new Map;for(let R of t.links)w.set(M(R.slice(0,2),R.slice(3,5)),{locked:R.endsWith("*")||i});w.set(M("12","13"),{gate:!0});for(let[R,P]of v){let U=R*16,F=P*16,G="hub",te=t.hub,ce="hub";if(R===1&&P===3)G="exit",te=t.exit,ce="exit";else if(!(R===1&&P===1)){let Ae=t.rooms[R+","+P];G=Ae[0],te=Ae[1],ce="room"}h.push({cell:""+R+P,c:R,r:P,tag:G,name:te,kind:ce,x0:U,z0:F,x1:U+16,z1:F+16,cx:U+16/2,cz:F+16/2})}let A=(t.hatch||[]).map((R,P)=>{let U=h.find(F=>F.c+","+F.r===R);return{id:P,room:h.indexOf(U),x:U.x1-2.4,z:U.z0+2.4,ox:U.x1-4.6,oz:U.z0+4.6}}),_=(t.gas||[]).map(R=>{let P=h.find(U=>U.c+","+U.r===R);return{x:P.cx,z:P.cz,r:2.8}});for(let R of h){let P=t.floor[(R.c+R.r)%2];if(R.kind==="hub"&&(P=mi(P,1.25)),R.kind==="exit"&&(P=2050602),y(R.cx,-.3,R.cz,16,.3,16,P),t.indoor)y(R.cx,r,R.cz,16,.3,16,t.ceil),f(R.cx,r-.1,R.cz,.9,.1,.9,R.kind==="exit"?6750105:t.bulb,1),g.push({x:R.cx,y:r-.15,z:R.cz,c:R.kind==="exit"?3407752:t.bulb,r:5.8});else{let U=R.cx+(s()<.5?-1:1)*2.5,F=R.cz+(s()<.5?-1:1)*2.5;y(U,0,F,.14,2.4,.14,t.trim),f(U,2.4,F,.32,.32,.32,R.kind==="exit"?6750105:t.bulb,1),g.push({x:U,y:2.55,z:F,c:R.kind==="exit"?3407752:t.bulb,r:4.6}),m(U-.1,F-.1,U+.1,F+.1)}}function T(R,P,U,F,G){let te=G==null?[[U,F]]:[[U,G-1.7],[G+1.7,F]];for(let[ce,Ae]of te){let j=Ae-ce;if(j<.02)continue;let le=(ce+Ae)/2,ve=mi(t.wall,.86+.28*s());if(R==="v"?(y(P,0,le,.4,r,j+.4,ve),y(P,0,le,.4+.08,.3,j+.4,t.trim),m(P-.4/2,ce-.4/2,P+.4/2,Ae+.4/2)):(y(le,0,P,j+.4,r,.4,ve),y(le,0,P,j+.4,.3,.4+.08,t.trim),m(ce-.4/2,P-.4/2,Ae+.4/2,P+.4/2)),!t.indoor)for(let Ee=ce+.8;Ee<Ae;Ee+=2.3){let ue=o.length;x(o,"k",R==="v"?P:Ee,r-.4,R==="v"?Ee:P,2.8,3.4,2.8,mi(t.wall,.8+.5*s()))}}if(G!=null){t.indoor&&(R==="v"?y(P,3,G,.4,r-3,3.4,mi(t.wall,.9)):y(G,3,P,3.4,r-3,.4,mi(t.wall,.9)));for(let ce of[-1,1]){let Ae=G+ce*1.7;R==="v"?y(P,0,Ae,.4+.14,3,.16,t.trim):y(Ae,0,P,.16,3,.4+.14,t.trim)}}}function O(R,P,U,F){let G={id:l.length,kind:R.gate?"gate":"lock",o:P,cx:U,cz:F};G.col=P==="v"?{x0:U-.2,z0:F-3.4/2,x1:U+.2,z1:F+3.4/2}:{x0:U-3.4/2,z0:F-.2,x1:U+3.4/2,z1:F+.2},l.push(G),G.kind==="lock"&&(P==="v"?(p.push({door:G.id,x:U-.34,z:F+3.4/2+.4,o:P}),p.push({door:G.id,x:U+.34,z:F-3.4/2-.4,o:P})):(p.push({door:G.id,x:U+3.4/2+.4,z:F-.34,o:P}),p.push({door:G.id,x:U-3.4/2-.4,z:F+.34,o:P})))}for(let[R,P]of v){let U=R*16,F=P*16;if(E(R+1,P)){let G=w.get(M(""+R+P,""+(R+1)+P));T("v",U+16,F,F+16,G?F+16/2:null),G&&(G.locked||G.gate)&&O(G,"v",U+16,F+16/2)}else T("v",U+16,F,F+16,null);if(E(R,P+1)){let G=w.get(M(""+R+P,""+R+(P+1)));T("h",F+16,U,U+16,G?U+16/2:null),G&&(G.locked||G.gate)&&O(G,"h",U+16/2,F+16)}else T("h",F+16,U,U+16,null);E(R-1,P)||T("v",U,F,F+16,null),E(R,P-1)||T("h",F,U,U+16,null)}function I(R,P,U){let F=[12595248,3170496,3186768,13672480];switch(R){case"kitchen":y(P,0,U,1.5,.9,.9,4870230),f(P-.3,.9,U,.45,.05,.45,16742938,1),y(P+.35,.9,U,.4,.35,.4,10066329),m(P-.8,U-.5,P+.8,U+.5);break;case"clinic":y(P,.3,U,2,.25,.95,14474460),y(P-.7,.55,U,.4,.15,.6,16777215),y(P+1.3,0,U+.4,.05,1.7,.05,11184810),f(P+1.3,1.3,U+.4,.14,.3,.1,6737151,0),m(P-1,U-.5,P+1,U+.5);break;case"library":y(P,0,U,1.8,2.1,.55,5913122);for(let G=0;G<4;G++)y(P-.6+G*.4,.9,U+.3,.15,.4,.1,F[G]);m(P-.95,U-.3,P+.95,U+.3);break;case"lab":y(P,0,U,1.9,.9,.8,13620182),f(P-.45,.9,U,.2,.35,.2,4259728,1),y(P+.5,.9,U,.25,.4,.2,2236962),m(P-1,U-.45,P+1,U+.45);break;case"workshop":y(P,0,U,1.9,.95,.85,7031338),y(P+.6,.95,U,.2,.3,.3,3355443),y(P-.4,.95,U,.5,.15,.3,8947848),m(P-1,U-.45,P+1,U+.45);break;case"office":y(P,0,U,1.9,.8,.95,4861984),f(P-.6,.8,U,.15,.35,.15,16769162,1),y(P+.4,.8,U,.5,.05,.4,15658734),m(P-1,U-.5,P+1,U+.5);break;case"outdoor":y(P,0,U,1.1,1.1,1.1,9071162),y(P+.9,0,U+.2,.9,.9,.9,8018474),y(P+.2,1.1,U,.8,.7,.8,10123850),m(P-.6,U-.6,P+1.4,U+.7);break;case"art":y(P-.5,0,U,.07,1.7,.07,6965802),y(P+.5,0,U,.07,1.7,.07,6965802),y(P,.6,U,1.1,1.1,.07,16117984),y(P-.2,1,U+.05,.3,.3,.02,F[0]),y(P+.2,.8,U+.05,.3,.3,.02,F[1]),m(P-.6,U-.2,P+.6,U+.2);break}}h.forEach((R,P)=>{if(R.kind!=="room")return;[[R.x0+3.4,R.z0+3.4],[R.x1-3.4,R.z1-3.4]].forEach(([F,G],te)=>{d.push({id:d.length,room:P,tag:R.tag,x:F,z:G,name:t.sn&&t.sn[R.tag]||Zy[R.tag]}),I(R.tag,F,G)})});let B=R=>{let P=[];for(let[U,F]of[[R.x0,R.cz],[R.x1,R.cz],[R.cx,R.z0],[R.cx,R.z1]])P.push({x0:U-3.2,x1:U+3.2,z0:F-3.2,z1:F+3.2});for(let U of d)U.room===h.indexOf(R)&&P.push({x0:U.x-2.4,x1:U.x+2.4,z0:U.z-2.4,z1:U.z+2.4});for(let U of A)U.room===h.indexOf(R)&&P.push({x0:U.x-2.6,x1:U.x+2.6,z0:U.z-2.6,z1:U.z+2.6});return P},H=(R,P,U=0)=>R.x0<P.x1+U&&R.x1>P.x0-U&&R.z0<P.z1+U&&R.z1>P.z0-U;for(let R of h){if(R.kind==="exit"){f(R.cx,2.2,R.z1-.5,4,.7,.1,3211104,0);for(let G of[-5,5])y(R.cx+G,0,R.cz,.6,r,.6,t.trim),f(R.cx+G,.2,R.cz,.15,r-.4,.15,3211104,0),m(R.cx+G-.3,R.cz-.3,R.cx+G+.3,R.cz+.3);continue}if(R.kind==="hub"){g.push({x:R.cx,y:1,z:R.cz,c:16724016,r:3.4}),y(R.cx,0,R.cz,1.3,.9,1.3,2763310),f(R.cx,.9,R.cz,.5,.12,.5,16719904,0),m(R.cx-.65,R.cz-.65,R.cx+.65,R.cz+.65);for(let[G,te]of[[-6,-6],[6,-6],[-6,6],[6,6]])y(R.cx+G,0,R.cz+te,.8,r,.8,t.trim),m(R.cx+G-.4,R.cz+te-.4,R.cx+G+.4,R.cz+te+.4);y(R.cx,0,R.cz,7,.03,7,mi(t.floor[0],.7));continue}for(let G of A)if(G.room===h.indexOf(R)){y(G.x,0,G.z,2.2,.05,2.2,659220);for(let te of[-1,1])f(G.x+te*1.05,.05,G.z,.1,.05,2.2,3199231,1),f(G.x,.05,G.z+te*1.05,2.2,.05,.1,3199231,1);f(G.x,.05,G.z,.3,1.7,.3,3199231,0)}let P=B(R),U=[],F=5+Math.floor(s()*3);for(let G=0;G<F;G++){let te=t.props[Math.floor(s()*t.props.length)],ce=$y[te];for(let Ae=0;Ae<25;Ae++){let j=ce.w,le=ce.d,ve,Ee;if(ce.wall){let ot=Math.floor(s()*4);ot<2?(j=ce.d,le=ce.w,ve=R.x0+2.5+s()*11,Ee=ot===0?R.z0+.4/2+le/2+.05:R.z1-.4/2-le/2-.05):(ve=ot===2?R.x0+.4/2+j/2+.05:R.x1-.4/2-j/2-.05,Ee=R.z0+2.5+s()*11)}else ve=R.x0+1.8+s()*(16-3.6),Ee=R.z0+1.8+s()*(16-3.6);let ue={x0:ve-j/2,x1:ve+j/2,z0:Ee-le/2,z1:Ee+le/2};if(P.some(ot=>H(ue,ot))||U.some(ot=>H(ue,ot,.7)))continue;U.push(ue);let ze=mi(t.pc[Math.floor(s()*t.pc.length)],.8+.4*s());if(te==="tree")y(ve,0,Ee,.5,2.2,.5,3811864),x(o,"k",ve,1.6,Ee,2.6,3.4,2.6,mi(t.wall,.7+.4*s())),m(ue.x0,ue.z0,ue.x1,ue.z1);else{let ot=ce.h<0?r:ce.h;y(ve,0,Ee,j,ot,le,ze),m(ue.x0,ue.z0,ue.x1,ue.z1),te==="table"&&y(ve,0,Ee,j*.8,.05,le*.8,mi(ze,.6))}break}}for(let G=0;G<2;G++){let te=.8+s()*.8,ce=.6+s()*.8;y(R.x0+2+s()*12,0,R.z0+2+s()*12,te,.02,ce,t.blood)}}let Z=h.find(R=>R.kind==="hub"),N=h.find(R=>R.kind==="exit"),$=[];for(let R=0;R<12;R++){let P=R/12*Math.PI*2,U=Z.cx+Math.cos(P)*4.6,F=Z.cz+Math.sin(P)*4.6;$.push({x:U,z:F,yaw:Math.atan2(-(Z.cx-U),-(Z.cz-F))})}return{id:n,name:t.name,emoji:t.emoji,D:t,S:16,H:r,indoor:t.indoor,hazard:t.hazard||"",story:t.story||"",hatches:A,gas:_,rooms:h,doors:l,panels:p,stations:d,parts:o,glow:a,lamps:g,cols:c,spawn:$,button:{x:Z.cx,z:Z.cz},exit:{x0:N.x0+.6,z0:N.z0+.6,x1:N.x1-.6,z1:N.z1-.6},bounds:{x0:0,z0:0,x1:48,z1:64}}}var qe=null,Bn=null,Fc=null,Tt=null,Mu=.8,Su=2,bu=null,co=null,Fi={},kc={},jy=["scream","jumpscare","step","run","door_open","creak","correct","wrong","hint","revive","lamp","heartbeat","killer_power","alarm","body_found","exit_open","time_warning","escape","win","lose"],Ky={cabin:"school",hospital:"school",mansion:"school",school:"hospital",asylum:"hospital",hotel:"mansion",bunker:"school",carnival:"mansion"};function vp(){if(qe){qe.state==="suspended"&&qe.resume();return}let n=window.AudioContext||window.webkitAudioContext;if(!n)return;qe=new n,Bn=qe.createGain(),Bn.gain.value=Mu,Bn.connect(qe.destination),Fc=qe.createBuffer(1,qe.sampleRate*2,qe.sampleRate);let e=Fc.getChannelData(0);for(let t=0;t<e.length;t++)e[t]=Math.random()*2-1;jy.forEach(Bc)}function Bc(n){return kc[n]||(kc[n]=fetch(n+".mp3").then(e=>{if(!e.ok||!(e.headers.get("content-type")||"").includes("audio"))throw new Error("missing");return e.arrayBuffer()}).then(e=>qe.decodeAudioData(e)).then(e=>(Fi[n]=e,e)).catch(()=>null)),kc[n]}var Sp=n=>!!Fi[n],bp=()=>({loaded:Object.keys(Fi),music:!!(Tt&&Tt.music),escape:!!(Tt&&Tt.escape),ducked:!!(Tt&&Tt.ducked),state:qe&&qe.state}),Mp=!1;function zc(n){Mu=n,Bn&&!Mp&&(Bn.gain.value=n)}function Tp(n){Mp=n,Bn&&(Bn.gain.value=n?0:Mu)}function lo(n){Su=n}function Qy(n){if(!qe.createStereoPanner)return null;let e=qe.createStereoPanner();return e.pan.value=Math.max(-1,Math.min(1,n||0)),e}function Tu(n,e){let t=Qy(e);t?(n.connect(t),t.connect(Bn)):n.connect(Bn)}function vt(n,e,t,i,s,r,o){if(!qe)return;let a=qe.currentTime+(o||0),c=qe.createOscillator(),l=qe.createGain();c.type=n,c.frequency.setValueAtTime(e,a),c.frequency.exponentialRampToValueAtTime(Math.max(1,t),a+i),l.gain.setValueAtTime(1e-4,a),l.gain.exponentialRampToValueAtTime(s,a+Math.min(.03,i/4)),l.gain.exponentialRampToValueAtTime(1e-4,a+i),c.connect(l),Tu(l,r),c.start(a),c.stop(a+i+.05)}function rs(n,e,t,i,s,r,o,a){if(!qe)return;let c=qe.currentTime+(o||0),l=qe.createBufferSource();l.buffer=Fc,l.loop=!0;let h=qe.createBiquadFilter();h.type=e,h.Q.value=a||1,h.frequency.setValueAtTime(t,c),h.frequency.exponentialRampToValueAtTime(Math.max(20,i),c+n);let d=qe.createGain();d.gain.setValueAtTime(1e-4,c),d.gain.exponentialRampToValueAtTime(s,c+Math.min(.04,n/3)),d.gain.exponentialRampToValueAtTime(1e-4,c+n),l.connect(h),h.connect(d),Tu(d,r),l.start(c,Math.random()),l.stop(c+n+.05)}function Mt(n,e,t){t=t||{};let i=Fi[n];if(!i||!qe)return null;let s=qe.createBufferSource();s.buffer=i,s.loop=!!t.loop,t.rate&&(s.playbackRate.value=t.rate);let r=qe.createGain(),o=qe.currentTime;return t.dur!=null?(r.gain.setValueAtTime(0,o),r.gain.linearRampToValueAtTime(e,o+.02),r.gain.setValueAtTime(e,o+Math.max(.03,t.dur-.05)),r.gain.linearRampToValueAtTime(0,o+t.dur)):r.gain.value=e,s.connect(r),Tu(r,t.pan),t.dur!=null?s.start(0,t.offset||0,t.dur):s.start(0,t.offset||0),{s,gn:r}}var Te={step(n,e){let t=n??1;if(Fi.step){Mt("step",.7*t,{offset:Math.random()*Math.max(.1,Fi.step.duration-.5),dur:.4,pan:e,rate:.92+Math.random()*.16});return}rs(.09,"bandpass",380,160,.05*t,e)},run(){Mt("run",.8)||vt("sine",400,700,.3,.1)},door(){Mt("door_open",.8)||(vt("sawtooth",90,45,.7,.12),rs(.7,"lowpass",500,120,.15))},correct(){Mt("correct",.9)||Te.chime()},wrong(){Mt("wrong",.9)||Te.buzz()},hint(){Mt("hint",.9)||Te.chime()},revive(){Mt("revive",1)||Te.chime()},lamp(){Mt("lamp",.8)||Te.chime()},bark(){vt("sawtooth",520,200,.14,.12),vt("sawtooth",540,210,.14,.12,0,.22)},chime(){vt("sine",660,660,.35,.12),vt("sine",880,880,.5,.12,0,.12),vt("sine",1320,1320,.6,.1,0,.24)},buzz(){vt("square",140,110,.45,.14),vt("square",100,80,.45,.1,0,.05)},click(){vt("sine",520,400,.06,.06)},creak(){if(Fi.creak){Mt("creak",.5,{rate:.85+Math.random()*.3,pan:Math.random()*2-1});return}rs(1.2+Math.random(),"bandpass",300+Math.random()*300,900+Math.random()*500,.05,Math.random()*2-1,0,14)},thud(){vt("sine",70,35,.35,.2,Math.random()*2-1)},whisper(){for(let n=0;n<4;n++)rs(.35,"bandpass",1500+Math.random()*1500,2500,.05,Math.random()*2-1,n*.3,4)},killerNear(){Mt("killer_power",.7)||Te.whisper()},heart(){vt("sine",62,38,.18,.28),vt("sine",58,36,.2,.22,0,.2)},heartLoop(n){if(!n){if(co){try{co.s.stop()}catch{}co=null}return}!co&&Fi.heartbeat&&(co=Mt("heartbeat",.9,{loop:!0}))},alarm(){if(!Mt("alarm",.8))for(let n=0;n<6;n++)vt("square",n%2?520:760,n%2?520:760,.3,.07,0,n*.3)},bodyFound(){Mt("body_found",.9)||(Te.alarm(),Te.gong())},exitAlarm(){Mt("exit_open",.8)||Te.alarm()},warn(){Mt("time_warning",.9)||Te.gong()},gong(){vt("sine",110,100,2.2,.25),vt("sine",220,200,1.8,.1),rs(1.5,"bandpass",500,200,.08)},sting(){Mt("jumpscare",1)||(vt("sawtooth",880,700,.9,.22),vt("sawtooth",933,740,.9,.22),vt("sawtooth",1250,1e3,.9,.18),rs(.9,"highpass",1500,4e3,.3))},scream(n){let e=n??1;if(!Mt("scream",e)){for(let t=0;t<3;t++)vt("sawtooth",700+t*90,1500+t*120,1.3,.16*e,0,t*.02),vt("sawtooth",1100+t*50,900,1.1,.08*e,0,.25+t*.03);rs(1.3,"bandpass",2200,3200,.25*e,0,0,2),vt("sine",120,60,1.4,.3*e)}},escape(){Mt("escape",1)||Te.win()},win(){Mt("win",.9)||[523,659,784,1046].forEach((n,e)=>vt("triangle",n,n,.5,.15,0,e*.16))},lose(){Mt("lose",.9)||[392,330,262,196].forEach((n,e)=>vt("sawtooth",n,n*.98,.7,.12,0,e*.3))}};async function ev(n){let e="music_"+n;return await Bc(e)?e:(e="music_"+(Ky[n]||"school"),await Bc(e)?e:null)}var Ep=.5;function Eu(n){if(ho(),!qe)return;let e=[],t=qe.createGain();t.gain.value=1e-4,t.gain.exponentialRampToValueAtTime(.09,qe.currentTime+4),t.connect(Bn);let i=qe.createBiquadFilter();i.type="lowpass",i.frequency.value=220,i.connect(t);for(let g of[55,55.7,82.4]){let x=qe.createOscillator();x.type="sawtooth",x.frequency.value=g,x.connect(i),x.start(),e.push(x)}let s=qe.createOscillator(),r=qe.createGain();s.frequency.value=.12,r.gain.value=70,s.connect(r),r.connect(i.frequency),s.start(),e.push(s);let o=qe.createBufferSource();o.buffer=Fc,o.loop=!0;let a=qe.createBiquadFilter();a.type="bandpass",a.frequency.value=400,a.Q.value=.8;let c=qe.createGain();c.gain.value=.03;let l=qe.createOscillator(),h=qe.createGain();l.frequency.value=.07,h.gain.value=250,l.connect(h),h.connect(a.frequency),l.start(),o.connect(a),a.connect(c),c.connect(Bn),o.start(),e.push(o,l);let d={nodes:e,g:t,music:null,escape:null,ducked:!1};Tt=d,ev(n).then(g=>{Tt!==d||!g||(d.music=Mt(g,1e-4,{loop:!0}),d.music&&(d.music.gn.gain.setTargetAtTime(d.ducked?.12:Ep,qe.currentTime,1.5),t.gain.setTargetAtTime(.03,qe.currentTime,2)))});let p=()=>{if(Tt===d){if(Su>=1){let g=Math.random();g<.4?Te.creak():g<.7?Te.thud():Su>=2&&Te.whisper()}bu=setTimeout(p,6e3+Math.random()*12e3)}};bu=setTimeout(p,4e3)}function wu(n){Tt&&(Tt.ducked=n,Tt.music&&Tt.music.gn.gain.setTargetAtTime(n?.12:Tt.escape?.1:Ep,qe.currentTime,.4))}async function wp(){let n=Tt;!n||n.escape||!await Bc("music_escape")||Tt!==n||(n.escape=Mt("music_escape",1e-4,{loop:!0}),n.escape&&n.escape.gn.gain.setTargetAtTime(.55,qe.currentTime,1),n.music&&n.music.gn.gain.setTargetAtTime(.08,qe.currentTime,1))}function ho(){if(clearTimeout(bu),Te.heartLoop(!1),!!Tt){for(let n of Tt.nodes)try{n.stop()}catch{}try{Tt.g.disconnect()}catch{}for(let n of[Tt.music,Tt.escape])if(n)try{n.s.stop()}catch{}Tt=null}}var Le=128,He=1,Kn=!1;function os(){let n=document.createElement("canvas");return n.width=n.height=Le,n}function as(n){let e=n>>>0;return()=>{e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function Js(n,e,t,i,s,r){t=Math.round(t*He*He);for(let o=0;o<t;o++){let a=(1+e()*s)*He;n.fillStyle=(r&&e()<.4?"rgba(255,255,255,":"rgba(0,0,0,")+(e()*i).toFixed(3)+")",n.fillRect(e()*Le,e()*Le,a,a)}}function $s(n,e,t){if(Kn){for(let i=0;i<7;i++){let s=e()*Le,r=(2+e()*5)*He,o=n.createLinearGradient(0,0,0,Le*(.4+e()*.6));o.addColorStop(0,"rgba(0,0,0,"+(.1*t).toFixed(3)+")"),o.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=o,n.fillRect(s,0,r,Le)}for(let i=0;i<4;i++){let s=e()*Le,r=e()*Le,o=n.createRadialGradient(s,r,1,s,r,(14+e()*26)*He);o.addColorStop(0,"rgba(0,0,0,"+(.16*t).toFixed(3)+")"),o.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=o,n.fillRect(0,0,Le,Le)}n.strokeStyle="rgba(0,0,0,"+(.13*t).toFixed(3)+")",n.lineWidth=He;for(let i=0;i<10;i++){let s=e()*Le,r=e()*Le;n.beginPath(),n.moveTo(s,r),n.lineTo(s+(6+e()*14)*He,r+(e()-.5)*8*He),n.stroke()}}}function cs(n){let e=new Ln(n);return e.wrapS=e.wrapT=Rs,e.colorSpace=wt,e.anisotropy=Kn?4:2,e}function Gc(n){let e=as(n),t=os(),i=t.getContext("2d");i.fillStyle="#e9e9e9",i.fillRect(0,0,Le,Le);for(let o=0;o<5;o++){let a=i.createRadialGradient(e()*Le,e()*Le,2*He,e()*Le,e()*Le,(30+e()*30)*He);a.addColorStop(0,"rgba(0,0,0,.10)"),a.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=a,i.fillRect(0,0,Le,Le)}Js(i,e,700,.1,2,!0),i.strokeStyle="rgba(0,0,0,.28)",i.lineWidth=He,i.beginPath();let s=(20+e()*80)*He,r=0;for(i.moveTo(s,r);r<Le;)s+=(e()-.5)*12*He,r+=(6+e()*8)*He,i.lineTo(s,r);return i.stroke(),$s(i,e,1),cs(t)}function Au(n,e){let t=as(n),i=os(),s=i.getContext("2d"),r=Le/e;s.fillStyle="#efefef",s.fillRect(0,0,Le,Le);for(let o=0;o<e;o++)for(let a=0;a<e;a++)s.fillStyle="rgba(0,0,0,"+(t()*(Kn?.11:.07)).toFixed(3)+")",s.fillRect(o*r,a*r,r,r),Kn&&(s.fillStyle="rgba(255,255,255,.35)",s.fillRect(o*r+2*He,a*r+2*He,r-5*He,2*He));s.fillStyle="rgba(30,30,30,.55)";for(let o=0;o<e;o++)s.fillRect(o*r,0,2*He,Le),s.fillRect(0,o*r,Le,2*He);return Js(s,t,500,.12,2,!1),$s(s,t,1.2),cs(i)}function tv(n){let e=as(n),t=os(),i=t.getContext("2d");i.fillStyle="#e4e4e4",i.fillRect(0,0,Le,Le);for(let s=0;s<8;s++)i.fillStyle="rgba(0,0,0,.13)",i.fillRect(s*16*He,0,8*He,Le);i.fillStyle="rgba(0,0,0,.28)";for(let s=0;s<4;s++)for(let r=0;r<4;r++){let o=(s*32+16)*He,a=(r*32+16)*He;i.beginPath(),i.moveTo(o,a-5*He),i.lineTo(o+4*He,a),i.lineTo(o,a+5*He),i.lineTo(o-4*He,a),i.closePath(),i.fill(),Kn&&(i.fillStyle="rgba(255,255,255,.22)",i.beginPath(),i.arc(o,a,1.6*He,0,7),i.fill(),i.fillStyle="rgba(0,0,0,.28)")}return Js(i,e,400,.1,2,!1),$s(i,e,1.1),cs(t)}function nv(n){let e=as(n),t=os(),i=t.getContext("2d"),s=Le/4;for(let r=0;r<4;r++){let o=e()*Le;i.fillStyle="rgba("+(205+e()*40|0)+","+(205+e()*40|0)+","+(205+e()*40|0)+",1)",i.fillRect(0,r*s,Le,s);for(let a=0;a<14*(Kn?2:1);a++){i.strokeStyle="rgba(0,0,0,"+(.06+e()*.1).toFixed(2)+")",i.beginPath();let c=r*s+e()*s;i.moveTo(0,c),i.lineTo(Le,c+(e()-.5)*3*He),i.stroke()}i.fillStyle="rgba(20,20,20,.6)",i.fillRect(o%Le,r*s,2*He,s),i.fillRect(0,r*s,Le,2*He)}return $s(i,e,1),cs(t)}function Ap(n){let e=as(n),t=os(),i=t.getContext("2d");i.fillStyle="#d6d6d6",i.fillRect(0,0,Le,Le),Js(i,e,1400,.28,4,!0),i.strokeStyle="rgba(0,0,0,.22)",i.lineWidth=He;for(let s=0;s<140*He;s++){let r=e()*Le,o=e()*Le;i.beginPath(),i.moveTo(r,o),i.lineTo(r+(e()-.5)*5*He,o-(3+e()*5)*He),i.stroke()}if(Kn)for(let s=0;s<6;s++){let r=e()*Le,o=e()*Le,a=i.createRadialGradient(r,o,1,r,o,(10+e()*18)*He);a.addColorStop(0,"rgba(60,40,20,.28)"),a.addColorStop(1,"rgba(60,40,20,0)"),i.fillStyle=a,i.fillRect(0,0,Le,Le)}return cs(t)}function Cp(n){let e=as(n),t=os(),i=t.getContext("2d");return i.fillStyle="#e2e2e2",i.fillRect(0,0,Le,Le),Js(i,e,900,.16,1,!1),i.fillStyle="rgba(0,0,0,.45)",i.fillRect(0,0,Le,2*He),i.fillRect(0,0,2*He,Le),i.fillRect(0,Le/2,Le,He),i.fillRect(Le/2,0,He,Le),$s(i,e,1.4),cs(t)}function Cu(n){let e=as(n),t=os(),i=t.getContext("2d");i.fillStyle="#dcdcdc",i.fillRect(0,0,Le,Le);for(let s=0;s<46*(Kn?2:1);s++){i.strokeStyle="rgba(0,0,0,"+(.05+e()*.14).toFixed(2)+")",i.lineWidth=(1+e()*2)*He;let r=e()*Le;i.beginPath(),i.moveTo(r,0),i.bezierCurveTo(r+(e()-.5)*14*He,Le*.3,r+(e()-.5)*14*He,Le*.7,r+(e()-.5)*8*He,Le),i.stroke()}return Js(i,e,150,.12,2,!1),$s(i,e,.8),cs(t)}function Rp(n,e){switch(Kn=!!e,Le=Kn?256:128,He=Le/128,n){case"hospital":return{w:Au(11,4),f:Au(12,4),c:Cp(13),p:Gc(14)};case"mansion":return{w:tv(21),f:nv(22),c:Gc(23),p:Cu(24)};case"cabin":return{w:Ap(31),f:Ap(32),c:Gc(33),p:Cu(34)};default:return{w:Gc(41),f:Au(42,2),c:Cp(43),p:Cu(44)}}}function Pp(n){let t=document.createElement("canvas");t.width=512,t.height=80*n.length;let i=t.getContext("2d");n.forEach((r,o)=>{let a=o*80;i.fillStyle="#17202a",i.fillRect(0,a,512,80),i.strokeStyle="#d8c070",i.lineWidth=5,i.strokeRect(4,a+4,504,72),i.fillStyle="#f4efe0",i.font="bold 40px Inter, DejaVu Sans, sans-serif",i.textAlign="center",i.textBaseline="middle",i.fillText(r.toUpperCase(),256,a+80/2+2,480)});let s=new Ln(t);return s.colorSpace=wt,s.anisotropy=4,{tex:s,rows:n.length}}function Ip(){let n=document.createElement("canvas");n.width=n.height=128;let e=n.getContext("2d"),t=e.createRadialGradient(64,64,2,64,64,64);t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.35,"rgba(255,255,255,.45)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,128,128);let i=new Ln(n);return i.colorSpace=wt,i}function Lp(){let n=document.createElement("canvas");n.width=64,n.height=128;let e=n.getContext("2d"),t=e.createRadialGradient(32,50,2,32,60,56);t.addColorStop(0,"rgba(200,225,255,.9)"),t.addColorStop(.5,"rgba(160,200,255,.35)"),t.addColorStop(1,"rgba(160,200,255,0)"),e.fillStyle=t,e.beginPath(),e.ellipse(32,62,30,60,0,0,7),e.fill(),e.fillStyle="rgba(0,0,30,.6)",e.beginPath(),e.ellipse(24,40,4,7,0,0,7),e.ellipse(40,40,4,7,0,0,7),e.fill();let i=new Ln(n);return i.colorSpace=wt,i}var W=n=>document.getElementById(n),go=new URLSearchParams(location.search),iv=!!go.get("debug"),ht=n=>String(n).replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e]),Ks=(n,e,t)=>Math.max(e,Math.min(t,n));function sv(){let n=go.get("pjs");if(n){let[e,t]=n.split(":");return{host:e,port:+t,path:"/",secure:!1,debug:0}}return{debug:0}}var xo=1.6,Dp=.35,Np=4,u={name:"",code:"",job:"chef",q:1,id:0,role:"crew",phase:"join",lobby:[],map:null,mapId:"",players:new Map,doors:[],bodies:[],tasks:[],prog:[0,0],clues:[],alive:!0,escaped:!1,ghost:!1,charges:{},rage:0,kcd:0,cdTotal:25,scare:2,myScare:2,paused:!1,qbox:null,meeting:null,exitOpen:!1,xcode:[],xn:0,warnLeft:3,warnCd:0,hatchCd:0,blackout:0,mirror:0,inGas:!1,gasT:0,hatchSeen:new Set,xray:0,sprint:0,abilCd:0,danger:!1,flick:0,dark:0,frozenUntil:0,pos:{x:0,y:xo,z:0},yaw:0,pitch:0,pings:[],lamps:[],waitingQ:!1,emergLeft:1,jump:0,appT:60,stepT:0,onBreak:!1,tl:null,w2:!1,w30:!1,smooth:!1,fps:0,showFps:!1,dangerOn:!1,mode:"classic",aliveN:0,escN:0,auto:!1,forceClassic:!1,autoClassic:!1},L={},Lt={},js=null,zn=null,Xc=!1,qc=0;function ft(n,e){W(n).style.display=e?"flex":"none"}function Ye(n,e,t){let i=document.createElement("div");i.className="tst "+(t||""),i.innerHTML=n,W("toast").appendChild(i),setTimeout(()=>i.classList.add("out"),(e||3500)-400),setTimeout(()=>i.remove(),e||3500)}function gi(n,e){let t=W("flash");t.style.background=n,t.style.opacity=.55,setTimeout(()=>t.style.opacity=0,e||250)}var xi=()=>Math.min(u.scare,u.myScare),rv=new Set(["ask","kill","report","emerg","ability","code","warn","hatch"]);function Et(n){if(rv.has(n.t)&&(n.px=+u.pos.x.toFixed(2),n.pz=+u.pos.z.toFixed(2)),zn&&zn.open)try{zn.send(n)}catch{}}W("code").value=(go.get("room")||"").toUpperCase();W("btnJoin").onclick=()=>{let n=W("nm").value.trim(),e=W("code").value.trim().toUpperCase();if(!n)return W("jmsg").textContent="Please type your name.";if(e.length<4)return W("jmsg").textContent="Please type the 4-letter room code.";u.name=n,u.code=e;{let t=W("gfx").value;if(u.auto=t==="a",u.smooth=t==="s",u.q=t==="s"?0:t==="a"?1:+t,u.autoClassic=!1,u.auto)try{u.autoClassic=localStorage.getItem("se_fb")==="1"}catch{}}u.showFps=!!go.get("fps"),vp(),zp()};W("nm").addEventListener("keydown",n=>{n.key==="Enter"&&W("btnJoin").click()});W("code").addEventListener("keydown",n=>{n.key==="Enter"&&W("btnJoin").click()});function zp(){W("jmsg").textContent="Connecting\u2026",Xc=!1;try{js&&js.destroy()}catch{}js=new _p(sv());let n=setTimeout(()=>{Xc||(W("jmsg").textContent="Cannot reach the room. Check the code and the Wi-Fi, and make sure the teacher page is open.")},12e3);js.on("open",()=>{zn=js.connect("shadowesc-"+u.code,{reliable:!0,serialization:"json"}),zn.on("open",()=>{qc=0,zn.send({t:"join",name:u.name,job:u.job})}),zn.on("data",e=>{try{av(e)}catch(t){console.error(t)}}),zn.on("close",()=>{clearTimeout(n),ov()}),zn.on("error",()=>{})}),js.on("error",e=>{clearTimeout(n),e.type==="peer-unavailable"?W("jmsg").textContent='Room "'+u.code+'" not found. Check the code with your teacher.':Xc||(W("jmsg").textContent="Connection problem ("+e.type+").")})}function Gp(n){if(u.off=!!n,W("offbox").style.display=n?"flex":"none",n){u.paused=!0,document.exitPointerLock&&document.exitPointerLock();for(let e in Lt)Lt[e]=!1;document.activeElement&&document.activeElement.blur&&document.activeElement.blur()}Tp(!!n)}function ov(){u.phase!=="join"&&(u.off&&Gp(!1),W("lost").style.display="flex",W("lostMsg").textContent="Connection lost\u2026 trying to reconnect ("+(qc+1)+")",document.exitPointerLock&&document.exitPointerLock(),qc++<30?setTimeout(zp,2500):W("lostMsg").textContent="The teacher closed the game or the connection is gone. Reload the page to join again.")}function Uu(){let n=u.lobby.find(e=>e.id===u.id);n&&(u.job=n.job),W("lobPlayers").innerHTML=u.lobby.map(e=>'<span class="chip'+(e.id===u.id?" me":"")+'">'+xn(e.job).emoji+" "+ht(e.name)+"</span>").join(""),W("jobGrid").innerHTML=ao.map(e=>{let t=u.lobby.find(i=>i.job===e.id&&i.id!==u.id);return'<div class="job'+(e.id===u.job?" sel":"")+(t?" taken":"")+'" data-j="'+e.id+'"><div class="je">'+e.emoji+"</div><b>"+e.name+"</b><small>\u2B50 "+e.abName+'</small><small class="jd">'+e.abDesc+"</small>"+(t?"<em>"+ht(t.name)+"</em>":"")+"</div>"}).join(""),W("jobGrid").querySelectorAll(".job").forEach(e=>e.addEventListener("click",()=>{e.classList.contains("taken")||(u.job=e.dataset.j,Et({t:"pick",job:u.job}),Uu(),Te.click())}))}function av(n){switch(n.t){case"joined":Xc=!0,u.id=n.id,W("lost").style.display="none",u.phase==="join"&&(u.phase="lobby",ft("join",!1),ft("lobby",!0));break;case"reject":W("jmsg").textContent=n.why,qc=99,u.phase="join";break;case"lobby":u.lobby=n.players,u.phase==="lobby"&&Uu();break;case"start":Rv(n);break;case"s":Iv(n);break;case"q":kv(n);break;case"deny":u.waitingQ=!1,Ye(ht(n.why),n.alarm?4500:2500,"bad"),n.alarm?(Te.alarm(),gi("#c00",500)):Te.wrong();break;case"digit":u.xcode[n.i]=n.d,u.xn=n.n,Ye("\u{1F522} <b>Exit code digit "+(n.i+1)+" of "+n.n+": "+n.d+"</b> (saved in your notebook [C])",4500,"clue"),Te.hint();break;case"alarm":u.pings.push({x:n.x,z:n.z,t:9}),Ye("\u{1F6A8} <b>Exit alarm!</b> A student is at the keypad in the "+ht(n.room)+"!",5e3,"bad"),Te.alarm();break;case"warned":u.pings.push({x:n.x,z:n.z,t:9}),Ye("\u{1F4E3} <b>"+ht(n.name)+"</b> warns: the killer is in the <b>"+ht(n.room)+"</b>!",5e3,"bad"),Te.hint();break;case"warnok":u.warnLeft=n.left,Ye("\u{1F4E3} Warning sent! ("+n.left+" left)",2e3,"good");break;case"hint":Gv(n);break;case"res":Hv(n);break;case"door":ku(n.id,n.open,!0);break;case"clue":u.clues.push(n.text),Ye("\u{1F50E} <b>NEW CLUE:</b> "+ht(n.text),6e3,"clue"),Te.hint();break;case"dead":Lv(n);break;case"revive":Dv(n);break;case"escaped":Nv(n);break;case"flick":u.flick=1.4,xi()>=1&&(u.dark=xi()>=2?.5:0,Te.killerNear());break;case"rage":u.rage=n.n,u.pings.push({x:n.x,z:n.z,t:9}),Ye("\u{1F608} A wrong answer in the <b>"+ht(n.room)+"</b>! You feel stronger. (Power "+n.n+")",5e3,"bad");break;case"killok":u.kcd=n.cd;break;case"meet":Vv(n);break;case"voted":u.meeting&&(u.meeting.voted=n.voted,mo());break;case"ready":u.meeting&&(u.meeting.ready=n.ready,mo());break;case"tp":u.pos.x=n.x,u.pos.z=n.z,u.pos.y=u.ghost?2:xo,u.yaw=n.yaw,n.swap&&(gi("#a040ff",500),Te.chime(),Ye("\u2728 <b>Magic swap!</b> You changed places!",2200,"good")),n.hatch&&(u.hatchCd=25,gi("#000",450),Te.door(),Ye("\u{1F573}\uFE0F You slipped through the secret passage!",2500,"good"));break;case"hz":Bv(n);break;case"abok":u.abilCd=n.cd||0,n.charges&&(u.charges=n.charges),n.what==="axe"?(Te.thud(),gi("#fff",160)):n.what==="shield"?Te.revive():n.what==="lullaby"&&Te.chime();break;case"shield":for(let e of n.ids)if(e===u.id)u.shield=n.dur,Ye("\u{1F6E1}\uFE0F <b>Shield up!</b> You cannot be caught for "+n.dur+" seconds.",2500,"good");else{let t=u.players.get(e);t&&(t.shield=n.dur)}break;case"slow":u.slowT=n.dur,Ye("\u{1F3B5} A sleepy lullaby slows you down\u2026",3e3,"bad"),Te.whisper();break;case"note":n.id!==u.id&&Te.chime();break;case"tst":Ye(ht(n.msg),2500,n.k||"good");break;case"meetend":Wv(n);break;case"exitopen":Uv(n);break;case"end":Ov(n);break;case"off":Gp(n.on);break;case"paused":u.paused=n.on,W("pausebox").style.display=n.on?"flex":"none",n.on&&document.exitPointerLock&&document.exitPointerLock();break;case"cfg":u.scare=n.scare,u.forceClassic=n.look==="classic",lo(xi()),tr();break;case"danger":u.danger=n.on;break;case"lamp":Wp(n.x,n.z);break;case"gone":{let e=u.players.get(n.id);e&&(e.st=1),n.id===u.id&&(u.alive=!1,u.ghost=!0);break}case"abused":u.charges=n.charges;break;case"tolobby":cv();break;case"caughtnote":er("\u{1F480} "+ht(n.name).toUpperCase()+" WAS CAUGHT!",n.left>0?"\u{1F3C3} "+n.left+(n.left===1?" student is":" students are")+" still running!":"Nobody is left\u2026",3800),Te.bodyFound();break}}function cv(){u.dangerOn=!1,ho(),W("bodyBanner").style.display="none",u.phase="lobby",u.meeting=null,u.qbox=null;for(let n of["hud","qbox","meet","end","role","pausebox","jump","cluebox","menu","breakbox"])ft(n,!1);W("btnBreak").style.display="none",u.onBreak=!1,ft("lobby",!0),document.exitPointerLock&&document.exitPointerLock(),W("app").classList.remove("playing"),Uu()}var lv={w:2.4,f:2,c:2,p:1.2};function hv(n,e){if(n.s!=="b")return"p";let t=n.y+n.h/2,i=n.y-n.h/2,s=Math.min(n.w,n.d);return t<=.05?"f":i>=e-.05?"c":s<=.8&&(n.h>=2.4||n.h<=.32&&i<.05&&s<=.5)?"w":"p"}function Zc(n,e,t){let i=n.attributes.position,s=i.count,r=new Float32Array(s*3),o=new Xe(e);for(let a=0;a<s;a++){let c=t?t(i.getX(a),i.getY(a),i.getZ(a)):1;r[a*3]=o.r*c,r[a*3+1]=o.g*c,r[a*3+2]=o.b*c}n.setAttribute("color",new Gt(r,3))}function uv(n,e,t){let i;n.s==="b"?i=new ln(n.w,n.h,n.d):n.s==="k"?i=new Os(n.w/2,n.h,7):i=new Dn(n.w/2,n.w/2,n.h,8),i.translate(n.x,n.y,n.z);let s=i.attributes.position,r=i.attributes.normal,o=i.attributes.uv,a=lv[e||"p"];for(let c=0;c<s.count;c++){let l=Math.abs(r.getX(c)),h=Math.abs(r.getY(c)),d=Math.abs(r.getZ(c)),p=s.getX(c),g=s.getY(c),x=s.getZ(c);h>=l&&h>=d?o.setXY(c,p/a,x/a):l>=d?o.setXY(c,x/a,g/a):o.setXY(c,p/a,g/a)}return Zc(i,n.c,t),i}function Hc(n,e,t){if(!n.length)return null;let i=n.map(r=>uv(r,e,t)),s=wn(i,!1);return i.forEach(r=>r.dispose()),s}function dv(n,e,t,i,s){let r=document.createElement("canvas");r.width=e,r.height=t;let o=r.getContext("2d");o.font=i,o.textAlign="center",o.textBaseline="middle",o.lineWidth=6,o.strokeStyle="rgba(0,0,0,.85)",o.strokeText(n,e/2,t/2),o.fillStyle=s||"#fff",o.fillText(n,e/2,t/2);let a=new Ln(r);return a.colorSpace=wt,a}function fv(){if(L.renderer)return;let n=u.q;L.renderer=new mc({canvas:W("gl"),antialias:n>=2,powerPreference:"high-performance"}),L.prBase=[.55,.8,Math.min(window.devicePixelRatio||1,1.25)][n],L.pr=L.prBase,L.renderer.setPixelRatio(L.pr),L.renderer.shadowMap.enabled=!0,L.renderer.shadowMap.type=Zi,L.renderer.setSize(innerWidth,innerHeight,!1),L.camera=new qt(72,innerWidth/innerHeight,.08,70),L.camera.rotation.order="YXZ",addEventListener("resize",()=>{L.renderer.setSize(innerWidth,innerHeight,!1),L.camera.aspect=innerWidth/innerHeight,L.camera.updateProjectionMatrix()})}function pv(){let n=u.map,e=n.D,t=L.scene=new Sr;if(t.background=new Xe(e.bg),t.fog=new vr(e.bg,e.fog),L.camera.clear(),t.add(L.camera),L.look=null,L.staticGroup=null,Hp(Du()),L.glowTex=L.glowTex||Ip(),L.pools=L.halos=null,n.lamps.length){let o=[],a=new Float32Array(n.lamps.length*3),c=new Float32Array(n.lamps.length*3);n.lamps.forEach((h,d)=>{let p=new Ci(h.r*2,h.r*2);p.rotateX(-Math.PI/2),p.translate(h.x,.05,h.z),Zc(p,h.c),o.push(p);let g=new Xe(h.c);a.set([h.x,h.y,h.z],d*3),c.set([g.r,g.g,g.b],d*3)}),L.pools=new nt(wn(o,!1),new Vt({map:L.glowTex,vertexColors:!0,transparent:!0,opacity:.5,blending:Ni,depthWrite:!1})),L.poolBase=n.indoor?.5:.75,t.add(L.pools);let l=new At;l.setAttribute("position",new Gt(a,3)),l.setAttribute("color",new Gt(c,3)),L.halos=new Us(l,new Yi({map:L.glowTex,size:2.8,sizeAttenuation:!0,vertexColors:!0,transparent:!0,opacity:.7,blending:Ni,depthWrite:!1})),L.halos.frustumCulled=!1,t.add(L.halos)}L.dustN=110,L.dustP=new Float32Array(L.dustN*3);for(let o=0;o<L.dustN;o++)L.dustP[o*3]=(Math.random()-.5)*16,L.dustP[o*3+1]=Math.random()*3.6,L.dustP[o*3+2]=(Math.random()-.5)*16;let i=new At;L.dustAttr=new Gt(L.dustP,3),i.setAttribute("position",L.dustAttr),L.dust=new Us(i,new Yi({map:L.glowTex,color:n.indoor?13619151:16770442,size:n.indoor?.12:.16,transparent:!0,opacity:n.indoor?.35:.8,depthWrite:!1})),L.dust.frustumCulled=!1,t.add(L.dust),L.wispTex=L.wispTex||Lp(),L.wisps=[];for(let o=0;o<3;o++){let a=new wi(new li({map:L.wispTex,transparent:!0,opacity:0,depthWrite:!1,blending:Ni}));a.scale.set(1.7,3.4,1),a.userData.ph=o*2.1,t.add(a),L.wisps.push(a)}L.gasS=[];for(let o of n.gas||[])for(let a=0;a<4;a++){let c=new wi(new li({map:L.glowTex,color:7012170,transparent:!0,opacity:.32,depthWrite:!1,blending:Ni}));c.scale.set(5.2,3.2,1),c.userData={x:o.x,z:o.z,ph:a*1.7,r:o.r*.6,y:.6+a*.35},t.add(c),L.gasS.push(c)}if(L.hemi=new Lr(e.hemi[0],e.hemi[1],e.hemi[2]),t.add(L.hemi),L.hemiBase=e.hemi[2]*1.3,!e.indoor){let o=new Or(7309e3,.55);o.position.set(-20,40,10),t.add(o)}L.flash=new Nr(16773328,60,28,.55,.55,1.5),L.flash.position.set(.15,-.1,0),L.flash.target.position.set(0,0,-6),L.camera.add(L.flash),L.camera.add(L.flash.target),L.flash.shadow.mapSize.set(512,512),L.flash.shadow.camera.near=.3,L.flash.shadow.camera.far=28,L.flash.shadow.bias=-8e-4,L.lantern=new Fs(16769712,7,7,1.6),L.camera.add(L.lantern),L.doors=[],L.doorLight=[];let s=new Nn({color:2238513});for(let o of n.doors){let a=o.o==="v"?new ln(.3,3,3.4):new ln(3.4,3,.3),c=o.kind==="gate"?new Nn({color:10099740,emissive:3343364}):new Nn({color:5913122}),l=new nt(a,c);l.position.set(o.cx,3/2,o.cz),t.add(l),L.doors[o.id]={mesh:l,open:!1,t:0},L.doorLight[o.id]=new Vt({color:16719904})}for(let o of n.panels){let a=new nt(new ln(o.o==="v"?.14:.55,.8,o.o==="v"?.55:.14),s);a.position.set(o.x,1.25,o.z),t.add(a);let c=new nt(new ln(.22,.22,.22),L.doorLight[o.door]);c.position.set(o.x,1.45,o.z),t.add(c)}L.markers=new Map;for(let o of u.tasks)o.done||Sv(o.sid);let r=n.exit;L.exitBeam=new nt(new Dn(.8,.8,4,12,1,!0),new Vt({color:4259712,transparent:!0,opacity:.25,depthWrite:!1})),L.exitBeam.position.set((r.x0+r.x1)/2,2,(r.z0+r.z1)/2+3),L.exitBeam.visible=!1,t.add(L.exitBeam),L.bodies=[],L.lamps=[],L.xrayMat=new Vt({color:6741503,transparent:!0,opacity:.4,depthTest:!1}),L.xrayGeo=new rn(.28,1.1,2,6),Ou()}var Du=()=>u.forceClassic||u.smooth||u.q===0||u.autoClassic?"classic":"rich";function mv(n){n.traverse(e=>{e.geometry&&e.geometry.dispose(),e.material&&(e.material.map&&e.material.map.dispose(),e.material.dispose())})}function gv(n){let e=n.D,t=[],i=[];if(!e.indoor)return{deco:t,glass:i};let s=e.seed*7919>>>0,r=()=>{s=s+1831565813|0;let h=Math.imul(s^s>>>15,1|s);return h=h+Math.imul(h^h>>>7,61|h)^h,((h^h>>>14)>>>0)/4294967296},o=(h,d,p,g,x,y,f,m)=>h.push({s:"b",x:d,y:p+y/2,z:g,w:x,h:y,d:f,c:m}),a=[12597547,3049153,13937677,2600544,9323693,15105570],c=.23,l=e.bg===198408?5209996:3428474;for(let h of n.rooms){for(let p=0;p<2;p++){let g=Math.floor(r()*4),x=r()<.5?-1:1,y=3.6+r()*3,f=a[Math.floor(r()*a.length)],m=g<2,v=m?h.cx+x*y:g===2?h.x0+c:h.x1-c,E=m?g===0?h.z0+c:h.z1-c:h.cz+x*y,M=m?.85:.03,w=m?.03:.85,A=m?.7:.05,_=m?.05:.7;o(t,v,1.25,E,M,1.15,w,15262415),o(t,v,1.95,E,A,.32,_,f);for(let T=0;T<3;T++)o(t,v,1.7-T*.17,E,m?.6:.045,.045,m?.045:.6,5591112)}let d=[];if(h.c===0&&d.push("W"),h.c===2&&d.push("E"),h.r===0&&d.push("N"),h.kind==="exit"&&d.push("W","E"),h.kind!=="hub")for(let p of d){let g=p==="N",x=p==="N"?h.cx:p==="W"?h.x0+c:h.x1-c,y=p==="N"?h.z0+c:h.cz,f=g?2.1:.1,m=g?.1:2.1,v=g?1.85:.07,E=g?.07:1.85,M=2759956,w=g;o(i,x,1.3,y,v,1.3,E,l),i[i.length-1].f=0,o(t,x,1.15,y,w?2.1:.12,.12,w?.12:2.1,M),o(t,x,2.65,y,w?2.1:.12,.12,w?.12:2.1,M),o(t,w?x-1:x,1.15,w?y:y-1,.12,1.6,.12,M),o(t,w?x+1:x,1.15,w?y:y+1,.12,1.6,.12,M),o(t,x,1.3,y,w?.07:.14,1.3,w?.14:.07,M),o(t,x,1.9,y,w?1.85:.14,.06,w?.14:1.85,M)}}return{deco:t,glass:i}}function Hp(n){let e=L.scene,t=u.map,i=n==="rich",s=t.H;L.staticGroup&&(e.remove(L.staticGroup),mv(L.staticGroup));let r=L.staticGroup=new pn;e.add(r),L.look=n,L.tex=Rp(u.mapId,i);let o={w:[],f:[],c:[],p:[]};for(let p of t.parts)o[hv(p,s)].push(p);let a=p=>i&&(p==="w"||p==="p")?(g,x)=>(x<.9?.7+.3*(x/.9):1)*(s-x<.8?.84+.16*((s-x)/.8):1):null;for(let p of["w","f","c","p"]){let g=Hc(o[p],p,a(p));if(!g)continue;let x=new nt(g,new Nn({vertexColors:!0,map:L.tex[p]}));x.receiveShadow=i,x.castShadow=i&&(p==="w"||p==="p"),r.add(x)}let c=i?gv(t):{deco:[],glass:[]},l=Hc(c.deco,"p");l&&r.add(new nt(l,new Nn({vertexColors:!0})));let h=Hc(t.glow.filter(p=>!p.f).concat(c.glass)),d=Hc(t.glow.filter(p=>p.f));if(h&&r.add(new nt(h,new Vt({vertexColors:!0}))),L.flickMat=new Vt({vertexColors:!0}),d&&r.add(new nt(d,L.flickMat)),i&&t.indoor){let p=t.rooms.map(f=>f.name),g=Pp(p),x=p.length,y=[];t.rooms.forEach((f,m)=>{let v=new Ci(3.2,.62),E=v.attributes.uv,M=1-(m+1)/x;for(let w=0;w<E.count;w++)E.setY(w,M+E.getY(w)/x);v.translate(f.cx+5.4,2.8,f.z0+.2+.025),Zc(v,16777215),y.push(v)}),r.add(new nt(wn(y,!1),new Nn({vertexColors:!0,map:g.tex})))}}var xv=new Dn(.35,.35,3.4,10,1,!0),_v=new Vt({color:16765770,transparent:!0,opacity:.2,depthWrite:!1}),yv=new Pr(.28),vv=new Vt({color:16765770});function Sv(n){if(L.markers.has(n))return;let e=u.map.stations[n],t=new pn,i=new nt(xv,_v);i.position.y=1.7,t.add(i);let s=new nt(yv,vv);s.position.y=2.3,t.add(s),t.position.set(e.x,0,e.z),L.scene.add(t),L.markers.set(n,{g:t,gem:s})}function bv(n){let e=L.markers.get(n);e&&(L.scene.remove(e.g),L.markers.delete(n))}function Ou(){u.colList=u.map.cols.slice(),u.map.doors.forEach(n=>{u.doors[n.id]||u.colList.push(n.col)})}function Up(n,e){let t=Dp*Dp,i=u.colList;for(let s=0;s<i.length;s++){let r=i[s],o=n<r.x0?r.x0:n>r.x1?r.x1:n,a=e<r.z0?r.z0:e>r.z1?r.z1:e,c=n-o,l=e-a;if(c*c+l*l<t)return!0}return!1}function ku(n,e,t){if(u.doors[n]===e)return;u.doors[n]=e,Ou();let i=L.doors&&L.doors[n];i&&(i.open=e),L.doorLight&&L.doorLight[n]&&L.doorLight[n].color.setHex(e?3211104:16719904),t&&Te.door()}var Yc=new Nn({vertexColors:!0});function Q(n,e,t,i,s,r,o,a,c){o!=null&&e.scale(o,a??o,c??o),e.translate(i,s,r),Zc(e,t),n.push(e)}var Ru=new Map;function Mv(n){if(Ru.has(n.id))return Ru.get(n.id);let e=[],t=y=>new Tn(y,12,9),i=(y,f,m)=>new ln(y,f,m),s=(y,f)=>new Dn(y,y,f,12),r=n.color,o=14922895;Q(e,new rn(.22,.4,3,10),r,0,1.02,0,1,1,.82),Q(e,t(.21),o,0,1.62,0,1,1.05,1);for(let y of[-1,1])Q(e,t(.058),16777215,y*.08,1.645,.19,1,1,.6),Q(e,t(.03),1118481,y*.08,1.645,.215),Q(e,i(.1,.02,.02),3811874,y*.08,1.735,.18);Q(e,i(.09,.02,.02),9058874,0,1.54,.2),Q(e,t(.032),13803644,0,1.6,.215);for(let y of[-1,1])Q(e,t(.05),o,y*.205,1.62,0,.6,1,1);switch(Q(e,new Dn(.07,.08,.14,8),o,0,1.44,0),Q(e,new Tn(.22,12,6,0,Math.PI*2,0,Math.PI/2),2759958,0,1.69,-.045,1,.9,1),n.id){case"chef":Q(e,s(.2,.26),16777215,0,1.88,0),Q(e,t(.25),16777215,0,2.06,0,1,.8,1);break;case"doctor":Q(e,s(.22,.06),16777215,0,1.76,0),Q(e,s(.06,.02),13621468,0,1.8,.2),Q(e,i(.22,.06,.02),16722474,0,1.08,.19),Q(e,i(.06,.22,.02),16722474,0,1.08,.19);break;case"librarian":Q(e,i(.1,.07,.02),2236962,-.075,1.65,.205),Q(e,i(.1,.07,.02),2236962,.075,1.65,.205),Q(e,i(.05,.015,.02),2236962,0,1.65,.205),Q(e,i(.2,.28,.06),8934860,.3,.85,.12);break;case"scientist":Q(e,i(.44,.09,.06),3394798,0,1.76,.17),Q(e,new rn(.235,.3,3,10),16053492,0,.82,0,1,1,.85);break;case"engineer":Q(e,new Tn(.24,12,8,0,Math.PI*2,0,Math.PI/2),16763904,0,1.68,0),Q(e,i(.5,.04,.34),16763904,0,1.68,.06);break;case"detective":Q(e,s(.34,.04),4862752,0,1.78,0),Q(e,s(.2,.2),4862752,0,1.9,0),Q(e,s(.205,.05),1381653,0,1.83,0);break;case"explorer":Q(e,s(.38,.04),13152368,0,1.78,0),Q(e,s(.2,.18),13152368,0,1.88,0),Q(e,i(.36,.5,.18),3103279,0,1.08,-.27);break;case"artist":Q(e,t(.28),13378099,.05,1.82,0,1,.38,1),Q(e,s(.03,.08),13378099,.05,1.93,0),Q(e,i(.2,.14,.03),14596231,.3,.85,.1);break}let a=[],c=[],l=(y,f,m,v)=>(f&&y.rotateX(f),m&&y.rotateY(m),v&&y.rotateZ(v),y),h=(y,f,m,v,E,M,w)=>Q(y,l(s(f,m),Math.PI/2,0,0),v,E,M,w+m/2),d=(y,f,m)=>Q(e,new Tn(y,12,8,0,Math.PI*2,0,Math.PI/2),f,0,m,0);switch(n.id){case"chef":Q(e,i(.34,.4,.03),16777215,0,.95,.195),Q(e,s(.11,.05),13639712,0,1.38,0),h(a,.014,.3,10119738,0,-.52,.02),Q(a,t(.05),10119738,0,-.52,.36,1,.45,1);break;case"doctor":Q(e,l(new ui(.14,.014,6,14,Math.PI),0,0,Math.PI),3355443,0,1.32,.15),Q(e,t(.038),13621468,0,1.17,.2),Q(a,i(.03,.2,.15),9067051,.02,-.5,.1),Q(a,i(.02,.17,.12),16777215,.036,-.5,.1);break;case"librarian":Q(e,t(.045),13378099,-.055,1.37,.17,1.3,.8,.6),Q(e,t(.045),13378099,.055,1.37,.17,1.3,.8,.6),Q(e,t(.025),10031394,0,1.37,.18),Q(a,i(.04,.2,.15),7027242,0,-.52,.1),Q(a,i(.035,.18,.13),16050896,.008,-.52,.1);break;case"scientist":Q(a,t(.06),5627272,0,-.52,.1),Q(a,s(.022,.09),13625599,0,-.44,.1),Q(e,i(.05,.12,.02),2787914,.12,1,.2);break;case"engineer":Q(e,s(.25,.07),5913118,0,.72,0,1,1,.86),Q(e,i(.08,.1,.06),9071162,.2,.7,.1),h(a,.018,.34,11184810,0,-.52,.02),Q(a,new ui(.045,.018,6,10,Math.PI*1.6),11184810,0,-.52,.39);break;case"detective":Q(e,i(.05,.2,.02),9050650,0,1.2,.185),h(a,.012,.18,4862752,0,-.52,.02),Q(a,new ui(.075,.012,6,14),13938487,0,-.52,.28),Q(a,l(s(.07,.006),Math.PI/2,0,0),12577023,0,-.52,.28);break;case"explorer":Q(e,l(s(.035,.12),Math.PI/2,0,0),2236962,-.05,1.2,.2),Q(e,l(s(.035,.12),Math.PI/2,0,0),2236962,.05,1.2,.2),Q(a,s(.035,.24),15259816,0,-.52,.08),Q(a,s(.037,.03),13382451,0,-.42,.08);break;case"artist":Q(e,t(.035),4040191,-.1,1.1,.185,1,1,.4),Q(e,t(.03),16765770,.08,.95,.19,1,1,.4),Q(e,t(.03),4508774,-.04,.82,.19,1,1,.4),h(a,.012,.3,9067051,0,-.52,.02),Q(a,t(.03),16724821,0,-.52,.34,1,1,1.6);break;case"dog":d(.22,3112250,1.68),Q(e,i(.3,.03,.2),3112250,0,1.7,.2),Q(e,s(.235,.12),16747039,0,1.12,0,1,1,.84),Q(e,i(.02,.14,.01),2236962,0,1.3,.19),Q(e,l(s(.025,.06),0,0,Math.PI/2),16765770,0,1.22,.2),Q(a,t(.05),14152250,0,-.56,.08);break;case"magician":Q(e,s(.2,.3),1380380,0,1.9,0),Q(e,s(.31,.03),1380380,0,1.76,0),Q(e,s(.205,.05),9059032,0,1.81,0),Q(e,t(.03),16769882,0,1.9,.2,1,1,.4),Q(e,i(.54,.82,.04),5974696,0,1,-.2),Q(e,i(.5,.78,.02),2757712,0,1,-.17),Q(e,t(.04),13378099,-.05,1.37,.17,1.3,.8,.6),Q(e,t(.04),13378099,.05,1.37,.17,1.3,.8,.6),h(a,.012,.36,1118481,0,-.52,.02),h(a,.014,.05,16777215,0,-.52,.38),Q(a,t(.028),16773754,0,-.52,.45);break;case"firefighter":d(.25,13378082,1.68),Q(e,i(.5,.04,.14),13378082,0,1.69,-.2),Q(e,i(.14,.1,.02),15777840,0,1.8,.24),Q(e,s(.235,.05),16770138,0,.9,0,1,1,.84),Q(e,s(.235,.05),16770138,0,1.08,0,1,1,.84),Q(e,s(.075,.36),9082014,0,1.05,-.27),Q(a,s(.016,.42),8014370,0,-.5,.05),Q(a,i(.03,.1,.16),11581632,0,-.3,.1);break;case"guard":d(.22,2052003,1.68),Q(e,i(.3,.03,.2),1389422,0,1.7,.2),Q(e,t(.03),15777840,0,1.78,.2,1,1,.4),Q(e,t(.04),15777840,.1,1.18,.2,1,1,.4),Q(e,s(.235,.05),1381653,0,.72,0,1,1,.84),Q(e,i(.12,.03,.12),15777840,-.24,1.3,0),Q(e,i(.12,.03,.12),15777840,.24,1.3,0),Q(c,i(.04,.4,.3),2052003,-.07,-.35,.12),Q(c,i(.05,.12,.12),15777840,-.09,-.35,.12);break;case"musician":Q(e,new ui(.235,.022,6,14,Math.PI),2236962,0,1.62,0),Q(e,l(s(.075,.07),0,0,Math.PI/2),14692474,-.235,1.62,0),Q(e,l(s(.075,.07),0,0,Math.PI/2),14692474,.235,1.62,0),Q(e,t(.17),11887901,0,.92,-.27,1,1.15,.3),Q(e,t(.12),11887901,0,1.2,-.27,1,1,.3),Q(e,i(.045,.45,.03),3810324,0,1.6,-.27),Q(e,i(.07,.1,.03),3810324,0,1.88,-.27),Q(e,l(s(.045,.01),Math.PI/2,0,0),1710618,0,1,-.29);break;case"radio":Q(e,new ui(.235,.015,6,14,Math.PI),2236962,0,1.62,0),Q(e,l(s(.07,.06),0,0,Math.PI/2),2236962,-.235,1.62,0),Q(e,i(.14,.015,.015),2236962,-.15,1.54,.2),Q(e,t(.022),16724016,-.08,1.54,.2),Q(e,i(.3,.38,.14),5925690,0,1.05,-.25),Q(e,s(.01,.75),10066329,.1,1.6,-.28),Q(e,t(.03),16724016,.1,1.98,-.28),Q(e,s(.008,.5),10066329,-.1,1.5,-.28),Q(a,i(.05,.14,.03),2236962,0,-.56,.06),Q(a,s(.008,.1),7829367,.015,-.46,.06);break}let p=[];Q(p,new rn(.09,.4,3,6),2830138,0,-.3,0),Q(p,i(.17,.08,.28),1381653,0,-.6,.04);let g=y=>{let f=[];return Q(f,new rn(.075,.36,3,6),r,0,-.25,0),Q(f,t(.07),o,0,-.52,0),wn(f.concat(y),!1)},x={body:wn(e,!1),leg:wn(p,!1),arm:g([]),armR:a.length?g(a):null,armL:c.length?g(c):null};return x.armR=x.armR||x.arm,x.armL=x.armL||x.arm,Ru.set(n.id,x),x}function Fu(n){let e=Mv(xn(n)),t=new pn;t.add(new nt(e.body,Yc));let i=(s,r,o)=>{let a=new nt(s,Yc);return a.position.set(r,o,0),t.add(a),a};return t.children.forEach(s=>{s.castShadow=!0}),t.userData={legL:i(e.leg,-.12,.78),legR:i(e.leg,.12,.78),armL:i(e.armL,-.32,1.3),armR:i(e.armR,.32,1.3)},t}var uo={};function Tv(n){if(uo[n])return uo[n];let e=[],t=[],i=[],s=c=>new Tn(c,10,8),r=(c,l,h)=>new ln(c,l,h),o=(c,l)=>new Dn(c,c,l,8),a=c=>(c.rotateX(Math.PI/2),c);if(n==="dog"){Q(e,a(new rn(.1,.3,3,8)),13208139,0,.32,0),Q(e,s(.105),13208139,0,.43,.3),Q(e,r(.08,.06,.1),15255968,0,.39,.4),Q(e,s(.022),1118481,0,.41,.455);for(let l of[-1,1]){let h=r(.05,.12,.04);h.rotateZ(l*.3),Q(e,h,8014370,l*.1,.43,.27),Q(e,s(.016),1118481,l*.05,.46,.375)}Q(e,o(.108,.035),13639712,0,.37,.2),Q(e,s(.02),15777840,0,.33,.3);for(let l of[-1,1])for(let h of[-1,1])Q(e,o(.032,.2),12089918,l*.065,.1,h*.15);let c=new rn(.02,.16,2,6);c.rotateX(-.8),Q(t,c,12089918,0,.07,-.072),uo[n]={body:wn(e,!1),tail:wn(t,!1),eyes:null,tailAt:[0,.38,-.25]}}else{Q(e,a(new rn(.07,.22,3,8)),1842210,0,.24,0),Q(e,s(.075),1842210,0,.33,.2);for(let h of[-1,1])Q(e,new Os(.03,.07,4),1842210,h*.05,.4,.19),Q(i,s(.015),10354506,h*.03,.34,.268);Q(e,o(.078,.025),9059032,0,.28,.14);for(let h of[-1,1])for(let d of[-1,1])Q(e,o(.022,.14),1842210,h*.045,.07,d*.1);let c=new rn(.016,.18,2,6);c.rotateX(-.5),Q(t,c,1842210,0,.08,-.045);let l=new rn(.016,.14,2,6);Q(t,l,1842210,0,.26,-.16),uo[n]={body:wn(e,!1),tail:wn(t,!1),eyes:wn(i,!1),tailAt:[0,.2,-.2]}}return uo[n]}var Ev=new Vt({vertexColors:!0});function Bu(n){let e=Tv(n),t=new pn;t.add(new nt(e.body,Yc));let i=new nt(e.tail,Yc);return i.position.set(e.tailAt[0],e.tailAt[1],e.tailAt[2]),t.add(i),e.eyes&&t.add(new nt(e.eyes,Ev)),t.visible=!1,L.scene.add(t),{g:t,tail:i,kind:n,init:!1,x:0,z:0,yaw:0,tr:[],ph:Math.random()*6}}function Op(n,e,t,i,s,r,o,a){if(n.g.visible=i,!i){n.init=!1;return}let c,l;if(o)c=e+Math.cos(a)*1-Math.sin(a)*.15,l=t-Math.sin(a)*1-Math.cos(a)*.15;else{let y=n.tr,f=y[y.length-1];(!f||Math.hypot(e-f.x,t-f.z)>.35)&&(y.push({x:e,z:t}),y.length>4&&y.shift()),c=y[0].x,l=y[0].z}(!n.init||Math.hypot(n.x-e,n.z-t)>7)&&(n.x=c,n.z=l,n.init=!0,n.tr=[{x:e,z:t}]);let h=Math.min(1,s*6),d=c-n.x,p=l-n.z,g=Math.hypot(d,p);n.x+=d*h,n.z+=p*h;let x=g>.25;if(x){let y=Math.atan2(d,p)-n.yaw;y=Math.atan2(Math.sin(y),Math.cos(y)),n.yaw+=y*Math.min(1,s*9)}n.g.position.set(n.x,x?Math.abs(Math.sin(r*14+n.ph))*.04:0,n.z),n.g.rotation.y=n.yaw,n.tail.rotation.y=Math.sin(r*(x?18:7)+n.ph)*.55}function wv(){let n=new pn,e=new Vt({color:10475263,transparent:!0,opacity:.45,depthWrite:!1}),t=new nt(new rn(.26,1,2,8),e);t.position.y=1,n.add(t);let i=new nt(new Tn(.22,8,8),e);return i.position.y=1.75,n.add(i),n}function Av(n){let e=Fu(n.job),t=wv(),i=new nt(L.xrayGeo,L.xrayMat);i.position.y=1,i.renderOrder=999,i.visible=!1,e.add(i);let s=new wi(new li({map:dv(n.name,256,64,"bold 34px sans-serif"),transparent:!0}));s.scale.set(1.6,.4,1),s.position.y=2.35,e.add(s);let r=s.clone();t.add(r),r.position.y=2.3,L.scene.add(e),L.scene.add(t),e.visible=!1,t.visible=!1,L.shieldGeo=L.shieldGeo||new Tn(1.1,14,10),L.shieldMat=L.shieldMat||new Vt({color:4892927,transparent:!0,opacity:.3,depthWrite:!1,side:En});let o=new nt(L.shieldGeo,L.shieldMat);o.position.y=1,o.visible=!1,e.add(o),n.sh=o,n.shield=0,(n.job==="dog"||n.job==="magician")&&(n.pet=Bu(n.job==="dog"?"dog":"cat")),n.av=e,n.gh=t,n.xr=i,n.cx=n.tx=0,n.cz=n.tz=0,n.cy=n.ty=0,n.cyaw=n.tyaw=0,n.new=!0,n.moving=0,n.stepT=0}function Vp(n,e,t){let i=u.players.get(n),s=Fu(i?i.job:"chef");s.rotation.order="YXZ",s.rotation.x=-Math.PI/2,s.rotation.y=Math.random()*6,s.position.set(e,.25,t);let r=new nt(new Rr(.9,14),new Vt({color:6948872}));return r.rotation.x=-Math.PI/2,r.position.set(e,.03,t),L.scene.add(s),L.scene.add(r),{id:n,x:e,z:t,a:s,pool:r}}function Cv(){for(let n of L.bodies)L.scene.remove(n.a),L.scene.remove(n.pool);L.bodies=[],u.bodies=[]}function Wp(n,e){let t=new nt(new Tn(.22,10,8),new Vt({color:16771488}));t.position.set(n,.3,e),L.scene.add(t);let i=null;if(u.q>=1&&(i=new Fs(16771504,22,14,1.4),i.position.set(n,1.2,e),L.scene.add(i)),L.lamps.push({m:t,light:i,t:40}),L.lamps.length>4){let s=L.lamps.shift();L.scene.remove(s.m),s.light&&L.scene.remove(s.light)}}function Rv(n){fv(),u.mode=n.mode||"classic",u.aliveN=0,u.escN=0,u.mapId=n.map,u.map=yp(n.map,{lockAll:u.mode==="survival"}),u.role=n.role,u.id=n.id,u.tasks=n.tasks,u.doors=n.doors.split("").map(e=>e==="1"),u.prog=n.prog,u.clues=n.clues.slice(),u.exitOpen=n.exitOpen,u.hatchCd=u.blackout=u.mirror=0,u.inGas=!1,u.hatchSeen=new Set,u.xcode=(n.xcode||[]).slice(),u.xn=n.xn||0,u.warnLeft=n.warnLeft==null?3:n.warnLeft,u.warnCd=0,u.charges=n.charges,u.alive=n.alive,u.escaped=n.escaped,u.ghost=!n.alive||n.escaped,u.rage=n.rage,u.paused=n.paused,u.scare=n.scare,u.forceClassic=n.look==="classic",u.cdTotal=n.cd,u.kcd=0,u.xray=u.sprint=u.abilCd=0,u.danger=!1,u.pings=[],u.qbox=null,u.meeting=null,u.emergLeft=1,u.waitingQ=!1,u.appT=50+Math.random()*40,u.tl=n.tl,u.w2=n.tl!=null&&n.tl<=120,u.w30=n.tl!=null&&n.tl<=30,u.onBreak=!1,ft("breakbox",!1),W("btnBreak").style.display="block",lo(xi()),pv(),tr(),W("fps").style.display=u.showFps?"block":"none",W("chkFps").checked=u.showFps,u.players=new Map(n.players.map(e=>[e.id,Object.assign({},e,{st:0})]));for(let[e,t]of n.status)u.players.has(e)&&(u.players.get(e).st=t);for(let e of u.players.values())e.id!==u.id&&Av(e);L.myPet=u.job==="dog"||u.job==="magician"?Bu(u.job==="dog"?"dog":"cat"):null,u.sniff=u.scan=u.slowT=u.shield=0,u.doors.forEach((e,t)=>{L.doors[t]&&(L.doors[t].open=e,L.doors[t].t=e?1:0,L.doors[t].mesh.visible=!e,e&&L.doorLight[t].color.setHex(3211104))}),Ou();for(let e of n.bodies)L.bodies.push(Vp(e.id,e.x,e.z));(n.exitOpen||u.mode==="survival")&&(L.exitBeam.visible=!0),u.pos={x:n.spawn.x,y:u.ghost?2:xo,z:n.spawn.z},u.yaw=n.spawn.yaw,u.pitch=0,u.phase=n.phase==="meeting"?"meeting":"play";for(let e of["join","lobby","end","lost","qbox"])ft(e,!1);ft("hud",!0),W("app").classList.add("playing"),W("pausebox").style.display=n.paused?"flex":"none",W("hudRole").textContent=xn(u.job).emoji+" "+xn(u.job).name,W("hudRole").className="crew",W("hudMap").textContent=u.map.emoji+" "+u.map.name+(u.mode==="survival"?" \xB7 SURVIVAL":""),W("killbtn").style.display="none",Eu(u.mapId),n.resume?Ye("Reconnected!",2500):Pv(),n.brk&&$c(!0),Qp()}function Pv(){let n=u.role==="killer";W("roleBig").textContent=n?"YOU ARE THE KILLER":"YOU ARE CREW",W("roleBig").className=n?"k":"c",W("roleSub").innerHTML=n?u.mode==="survival"?"SURVIVAL MODE! Nobody knows it is you. Catch EVERYONE before they escape!<br>The doors are locked until the crew open them. Press <b>F</b> or <b>click</b> next to a student to catch them.":"Nobody knows it is you. Catch the crew one by one, but don't get caught!<br>You still get questions to look busy. Press <b>F</b> or <b>click</b> next to a student to catch them.":u.mode==="survival"?"SURVIVAL MODE! One of your friends is the killer, but you will not know who!<br>Every door is locked: answer questions to open them. Finish your tasks, open the exit and RUN. If you are caught you become a ghost.<br>Survive!":"One of your friends is the killer! Do your tasks (answer questions) to open the exit, find clues, and vote out the killer.<br>Stay together and watch out!",ft("role",!0),W("roleTapBox").style.display="flex",W("roleShow").style.display="none",u.frozenUntil=performance.now()+3e4,clearTimeout(u.roleT),u.roleT=setTimeout(Xp,15e3)}function Xp(){W("roleShow").style.display!=="block"&&(clearTimeout(u.roleT),W("roleTapBox").style.display="none",W("roleShow").style.display="block",Te.gong(),setTimeout(()=>{ft("role",!1),u.frozenUntil=performance.now(),u.phase==="play"&&(W("lockhint").style.display="flex"),u.map&&u.map.story&&er("\u{1F4CD} "+ht(u.map.name),ht(u.map.story),7e3)},3500))}W("btnRoleTap").addEventListener("click",Xp);function Iv(n){if(u.map){for(let[e,t,i,s,r,o]of n.p){let a=u.players.get(e);a&&(a.st=o,e!==u.id&&(a.tx=t,a.ty=i,a.tz=s,a.tyaw=r,a.new&&a.av&&(a.cx=t,a.cy=i,a.cz=s,a.cyaw=r,a.new=!1)))}u.prog[0]=n.pr,n.al!=null&&(u.aliveN=n.al,u.escN=n.es),n.tl!=null&&(u.tl=n.tl,n.tl>130&&(u.w2=!1),n.tl>40&&(u.w30=!1),n.tl<=120&&!u.w2&&(u.w2=!0,Ye("\u23F0 <b>2 minutes left!</b> Finish the tasks and escape!",5e3,"bad"),Te.warn()),n.tl<=30&&!u.w30&&(u.w30=!0,Ye("\u23F0 <b>30 seconds left!</b>",5e3,"bad"),Te.warn())),n.d.split("").forEach((e,t)=>ku(t,e==="1",!0)),n.kc!=null&&(u.kcd=n.kc),n.rg!=null&&(u.rage=n.rg)}}function Lv(n){let e=u.players.get(n.id);e&&(e.st=1),L.bodies.push(Vp(n.id,n.x,n.z)),u.bodies.push({id:n.id,x:n.x,z:n.z});let t=Math.hypot(u.pos.x-n.x,u.pos.z-n.z);n.you?(u.alive=!1,u.ghost=!0,u.jump=1.7,u.qbox=null,ft("qbox",!1),ft("kpbox",!1),Te.scream(1),Te.sting(),gi("#a00",500),xi()>=2?Xv():(W("jump").style.display="flex",qv()),W("jump").style.display="flex",setTimeout(()=>{W("jump").style.display="none",Ye("\u{1F480} <b>You were caught!</b> You are a ghost now. You can fly around and still do your tasks to help your team!",8e3,"bad")},1800),document.exitPointerLock&&document.exitPointerLock()):t<45&&(Te.scream(Math.max(.2,1-t/45)),xi()>=2&&t<18&&gi("#800",300),Ye("\u{1F631} Someone screamed!",3e3,"bad"))}function Dv(n){let e=u.players.get(n.id);e&&(e.st=0);let t=L.bodies.findIndex(i=>i.id===n.id);t>=0&&(L.scene.remove(L.bodies[t].a),L.scene.remove(L.bodies[t].pool),L.bodies.splice(t,1)),u.bodies=u.bodies.filter(i=>i.id!==n.id),Te.revive(),n.id===u.id?(u.alive=!0,u.ghost=!1,u.pos.x=n.x,u.pos.z=n.z,u.pos.y=xo,Ye("\u{1F49A} You were revived by the Doctor!",5e3,"good")):Ye("\u{1F49A} "+ht(e?e.name:"Someone")+" was revived!",3500,"good")}function Nv(n){let e=u.players.get(n.id);e&&(e.st=2),n.id===u.id?(u.escaped=!0,u.ghost=!0,Ye(u.mode==="survival"?"\u{1F3C3} <b>YOU ESCAPED!</b> You are safe. Now you are a HELPER \u2013 press <b>V</b> to warn the others where the killer is!":"\u{1F3C3} <b>YOU ESCAPED!</b> You are safe. You can watch the others.",9e3,"good"),Te.escape()):Ye("\u{1F3C3} "+ht(e?e.name:"Someone")+" escaped!",3500,"good")}function Uv(){u.exitOpen=!0,L.exitBeam&&(L.exitBeam.visible=!0);let n=u.map.doors.findIndex(e=>e.kind==="gate");n>=0&&ku(n,!0,!0),Te.exitAlarm(),wp(),Ye("\u{1F6AA} <b>ALL TASKS DONE!</b> The EXIT is open. RUN to the green light!",9e3,"good"),u.flick=2}function Ov(n){u.phase="ended",u.dangerOn=!1,ho(),W("bodyBanner").style.display="none",document.exitPointerLock&&document.exitPointerLock();for(let s of["hud","qbox","meet","pausebox","jump","cluebox","menu","role","lockhint","breakbox"])ft(s,!1);W("btnBreak").style.display="none",u.onBreak=!1,W("lockhint").style.display="none";let e=n.winner==="crew",t=u.role==="killer",i=e!==t;W("endTitle").textContent=e?"\u{1F389} THE CREW WINS!":"\u{1F52A} THE KILLER WINS!",W("endTitle").className=e?"c":"k",W("endSub").innerHTML=(n.reason==="time"?"\u23F0 <b>Time is up!</b><br>":"")+"The killer was <b>"+xn(n.killer.job).emoji+" "+ht(n.killer.name)+"</b>.<br>"+(i?"You won! \u{1F3C6}":"Better luck next time!")+(n.mode==="survival"?'<br><span style="color:#ffd34a">\u{1F3C3} Escape Champion: <b>'+ht(n.champ||"\u2014")+"</b> &nbsp;\xB7&nbsp; \u2B50 Top Scorer: <b>"+ht(n.top||"\u2014")+"</b></span>":""),W("endTable").innerHTML="<tr><th>Name</th><th>Job</th><th>Tasks</th><th>\u2713</th><th>\u2717</th><th>Result</th>"+(n.mode==="survival"?"<th>\u2B50 Points</th>":"")+"</tr>"+(n.mode==="survival"?n.stats.slice().sort((s,r)=>r.score-s.score):n.stats).map(s=>'<tr class="'+(s.role==="killer"?"kr":"")+'"><td>'+ht(s.name)+(s.role==="killer"?" \u{1F52A}":"")+"</td><td>"+xn(s.job).emoji+"</td><td>"+s.done+"/"+s.total+"</td><td>"+s.correct+"</td><td>"+s.wrong+"</td><td>"+(n.mode==="survival"&&s.order&&s.order<=3?["\u{1F947}","\u{1F948}","\u{1F949}"][s.order-1]+" ":"")+s.status+"</td>"+(n.mode==="survival"?"<td><b>"+s.score+"</b></td>":"")+"</tr>").join(""),ft("end",!0),(i?Te.win:Te.lose)()}function kv(n){if(u.waitingQ=!1,u.phase!=="play")return;u.qbox={qid:n.qid,kind:n.kind,id:n.id,locked:!1,hint:n.hint,hinted:!1,n:n.opts.length},ft("kpbox",!1),W("qTitle").textContent=n.kind==="boss"?"\u{1F6AA} EXIT QUESTION \u2013 answer to open the door!":n.kind==="lock"?"\u{1F512} Unlock the door":"\u{1F4DD} Task: "+zu(n.id),W("qText").textContent=n.text;let e=["#e84b4b","#3b82f6","#2fb36b","#e0a81c"];W("qOpts").innerHTML=n.opts.map((i,s)=>'<button class="opt" data-i="'+s+'" style="--c:'+e[s%4]+'"><span class="ol">'+"ABCD"[s]+"</span> "+ht(i)+"</button>").join(""),W("qOpts").querySelectorAll(".opt").forEach(i=>i.addEventListener("click",()=>Gu(+i.dataset.i)));let t=W("qHint");t.style.display=n.hint>0&&n.opts.length>=3?"inline-block":"none",t.textContent="\u{1F4A1} "+xn(u.job).abName+" ("+n.hint+")",W("qMsg").textContent="",W("qMsg").className="",ft("qbox",!0),document.exitPointerLock&&document.exitPointerLock(),W("lockhint").style.display="none"}function Fv(){let n=u.tasks.filter(e=>e.done).length;if(n<u.tasks.length){Ye("\u{1F6AA} Finish ALL your tasks first ("+n+"/"+u.tasks.length+").",2500,"bad");return}u.qbox={kp:!0,locked:!1,n:0},W("kpCode").textContent=u.xcode.join(" "),W("kpIn").value="",W("kpIn").maxLength=u.xn||10,W("kpIn").placeholder=Array(u.xn||4).fill("\u2022").join(" "),ft("kpbox",!0),document.exitPointerLock&&document.exitPointerLock(),W("lockhint").style.display="none",setTimeout(()=>W("kpIn").focus(),50)}function qp(){let n=W("kpIn").value.replace(/\D/g,"");n&&(Et({t:"code",c:n}),W("kpIn").value="",Te.click())}W("kpOk").addEventListener("click",qp);W("kpIn").addEventListener("keydown",n=>{n.key==="Enter"?qp():n.key==="Escape"&&Jc()});W("kpClose").addEventListener("click",Jc);document.querySelectorAll("#kpPad button").forEach(n=>n.addEventListener("click",()=>{let e=W("kpIn"),t=n.dataset.k;t==="C"?e.value="":e.value.length<e.maxLength&&(e.value+=t),e.focus(),Te.click()}));function Yp(){if(!(!u.escaped||u.mode!=="survival"||u.phase!=="play")){if(u.warnLeft<=0){Ye("No warnings left.",1500);return}if(u.warnCd>0){Ye("\u23F3 Wait "+Math.ceil(u.warnCd)+"s\u2026",1200);return}u.warnCd=15,Et({t:"warn"})}}W("btnWarn").addEventListener("click",Yp);function Bv(n){let e=xi();n.k==="blackout"?(u.blackout=n.secs,u.flick=1,Ye("\u{1F526} <b>BLACKOUT!</b> The lights died \u2013 use your flashlight!",4500,"bad"),Te.creak()):n.k==="mirror"?(u.mirror=n.secs,Ye("\u{1F921} <b>FUNHOUSE MIRRORS!</b> Your map is flipped for "+n.secs+" seconds.",4500,"bad"),Te.whisper()):n.k==="axe"?(Ye("\u{1FA93} <b>CRASH!</b> A door was chopped open!",3500,"good"),Te.thud()):n.k==="slam"&&(u.flick=.7,Ye("\u{1F6AA} <b>SLAM!</b> A door locked itself again!",4e3,"bad"),Te.thud())}function zv(){let n=u.map&&u.map.gas;if(!n||!n.length)return!1;for(let e of n)if(Math.hypot(u.pos.x-e.x,u.pos.z-e.z)<e.r)return!0;return!1}function zu(n){let e=u.map.stations[n];return u.map.rooms[e.room].name+" \u2013 "+e.name}function Gu(n){let e=u.qbox;!e||e.locked||(e.locked=!0,Et({t:"ans",qid:e.qid,i:n}),Te.click(),W("qOpts").querySelectorAll(".opt").forEach(t=>{t.disabled=!0,+t.dataset.i===n&&t.classList.add("pick")}))}W("qHint").addEventListener("click",()=>{let n=u.qbox;n&&!n.hinted&&!n.locked&&Et({t:"hint",qid:n.qid})});W("qClose").addEventListener("click",Jc);function Jc(){u.qbox&&!u.qbox.locked&&Et({t:"cancelq"}),u.qbox=null,ft("qbox",!1),ft("kpbox",!1),u.phase==="play"&&(W("lockhint").style.display="flex")}function Gv(n){let e=u.qbox;if(!(!e||e.qid!==n.qid)){e.hinted=!0,W("qHint").style.display="none",u.charges.hint=n.left;for(let t of n.remove){let i=W("qOpts").querySelector('[data-i="'+t+'"]');i&&(i.disabled=!0,i.classList.add("gone"))}Te.hint()}}function Hv(n){let e=u.qbox;if(!e||e.qid!==n.qid)return;let t=W("qMsg");if(n.ok){if(t.textContent=e.kind==="boss"?"\u2705 Correct! The exit door opens \u2013 RUN!":e.kind==="lock"?"\u2705 Correct! The door unlocks!":"\u2705 Correct! Task complete!",t.className="good",Te.correct(),W("qOpts").querySelectorAll(".opt").forEach(i=>{i.classList.contains("pick")&&i.classList.add("right")}),e.kind==="task"){let i=u.tasks.find(s=>s.sid===e.id);i&&(i.done=!0,bv(e.id))}setTimeout(()=>{u.qbox===e&&(u.qbox=null,ft("qbox",!1),u.phase==="play"&&(W("lockhint").style.display="flex"))},1100)}else{Te.wrong(),gi("#c00",300);let i=n.right!=null?W("qOpts").querySelector('[data-i="'+n.right+'"]'):null;i&&i.classList.add("right"),W("qOpts").querySelectorAll(".opt").forEach(s=>{s.classList.contains("pick")&&s.classList.add("wrong")}),t.className="bad",u.role==="killer"||u.ghost?t.textContent="\u274C Not quite. The right answer is shown in green.":e.kind==="boss"?t.textContent="\u274C Wrong! Enter your code again at the exit door.":t.textContent=n.saved?"\u274C Wrong! But your Second Chance protected the team ("+n.left+" left).":"\u274C Wrong! The killer heard you and grew stronger\u2026 Try again!",setTimeout(()=>{u.qbox===e&&(u.qbox=null,ft("qbox",!1),u.phase==="play"&&(W("lockhint").style.display="flex"))},2600)}}function er(n,e,t){let i=W("bodyBanner");W("bbT").innerHTML=n,W("bbS").innerHTML=e,i.style.display="block",i.classList.remove("pop"),i.offsetWidth,i.classList.add("pop"),clearTimeout(er.t),er.t=setTimeout(()=>{i.style.display="none"},t||3800)}function Vv(n){if(n.stage==="discuss"){u.phase="meeting",u.qbox=null,ft("qbox",!1),W("lockhint").style.display="none",document.exitPointerLock&&document.exitPointerLock(),u.meeting={stage:"discuss",by:n.by,why:n.why,victim:n.victim,end:performance.now()+n.secs*1e3,cand:n.cand,voted:[],my:void 0,ready:n.ready||[],myReady:!1},gi("#fff",300),wu(!0);let e=t=>{let i=[...u.players.values()].find(s=>s.name===t);return(i?xn(i.job).emoji+" ":"")+"<b>"+ht(t)+"</b>"};n.why==="body"?(er("\u{1F480} BODY FOUND!",e(n.by)+" found "+e(n.victim)+"'s body!<br><small>"+e(n.victim)+" was caught by the killer.</small>",4500),Te.bodyFound()):(er("\u{1F6A8} EMERGENCY MEETING","Called by "+e(n.by),3200),Te.alarm())}else u.meeting&&(u.meeting.stage=n.stage,u.meeting.end=performance.now()+n.secs*1e3,u.meeting.cand=n.cand,u.meeting.voted=n.voted,n.stage==="result"&&(u.meeting.res=n,n.ejected&&Te.gong()));ft("meet",!0),mo()}function mo(){let n=u.meeting;if(!n)return;let e=W("meetTitle"),t=n.stage==="vote"&&n.cand.includes(u.id)&&n.my===void 0;e.innerHTML=n.why==="body"?"\u{1F480} <b>"+ht(n.by)+"</b> found <b>"+ht(n.victim)+"</b>'s body!":"\u{1F6A8} <b>"+ht(n.by)+"</b> called an emergency meeting!",W("meetStage").textContent=n.stage==="discuss"?"DISCUSS \u2013 talk to each other! Who is the killer?":n.stage==="vote"?"VOTE \u2013 who do you think is the killer?":"RESULT";let i=n.res;W("meetGrid").innerHTML=[...u.players.values()].map(a=>{let c=a.st===1||n.stage!=="result"&&!n.cand.includes(a.id),l=n.voted.includes(a.id),h=i?(i.tally.find(d=>d[0]===a.id)||[0,0])[1]:0;return'<div class="vc'+(c?" dead":"")+(n.my===a.id?" sel":"")+(t&&!c?" can":"")+'" data-id="'+a.id+'"><div class="ve">'+xn(a.job).emoji+"</div><b>"+ht(a.name)+(a.id===u.id?" (you)":"")+"</b>"+(c?"<small>\u274C out</small>":"")+(l&&n.stage==="vote"?'<span class="vt">\u2714 voted</span>':"")+(i&&h?'<span class="vn">'+h+" vote"+(h>1?"s":"")+"</span>":"")+"</div>"}).join(""),W("meetGrid").querySelectorAll(".vc.can").forEach(a=>a.addEventListener("click",()=>Zp(+a.dataset.id))),W("btnSkip").style.display=t?"inline-block":"none";let s=n.cand.length,r=n.cand.includes(u.id);W("btnReady").style.display=n.stage==="discuss"&&r?"inline-block":"none",W("btnReady").disabled=!!n.myReady,W("btnReady").textContent=n.myReady?"\u2714 Ready - waiting for the others ("+n.ready.length+" of "+s+")":"\u2705 I'm ready to vote ("+n.ready.length+" of "+s+" ready)",W("meetWait").textContent=n.stage==="vote"?r?n.my!==void 0?"\u2714 You voted - "+n.voted.length+" of "+s+" have voted":"Tap who you think is the killer  ("+n.voted.length+" of "+s+" voted)":"You are out - watch the vote.":n.stage==="discuss"?r?"":"You are out - listen to the others.":"",W("meetClues").innerHTML=u.clues.length?"<b>\u{1F4D3} Clues so far:</b><ul>"+u.clues.map(a=>"<li>"+ht(a)+"</li>").join("")+"</ul>":"<i>No clues yet.</i>";let o=W("meetRes");i?(o.style.display="block",o.innerHTML=i.ejected?'<div class="big">'+ht(i.ejected.name)+' was voted out\u2026</div><div class="'+(i.ejected.killer?"good":"bad")+' big2">'+(i.ejected.killer?"and they WERE the killer! \u{1F389}":"and they were NOT the killer. \u{1F628}")+"</div>":'<div class="big">Nobody was voted out.</div>'):o.style.display="none"}function Zp(n){let e=u.meeting;!e||e.my!==void 0||(e.my=n,Et({t:"vote",target:n}),Te.click(),mo())}W("btnSkip").addEventListener("click",()=>Zp(0));W("btnReady").addEventListener("click",()=>{let n=u.meeting;!n||n.myReady||(n.myReady=!0,Et({t:"ready"}),Te.click(),mo())});setInterval(()=>{let n=u.meeting;!n||u.paused||(W("meetTime").textContent=n.stage==="result"?"":Math.max(0,Math.ceil((n.end-performance.now())/1e3))+"s")},250);function Wv(n){u.meeting=null,u.phase="play",ft("meet",!1),W("lockhint").style.display="flex",wu(!1),Cv();for(let[e,t]of n.status){let i=u.players.get(e);i&&(i.st=t),e===u.id&&(u.alive=t===0,u.ghost=t!==0)}L.camera&&(u.flick=1)}function Xv(){let n=W("jumpc"),e=n.getContext("2d");n.width=640,n.height=480,e.fillStyle="#000",e.fillRect(0,0,640,480);let t=e.createRadialGradient(320,230,20,320,240,260);t.addColorStop(0,"#d9d4c4"),t.addColorStop(1,"#2a2620"),e.fillStyle=t,e.beginPath(),e.ellipse(320,250,170,220,0,0,7),e.fill(),e.fillStyle="#000",e.beginPath(),e.ellipse(250,200,48,70,-.2,0,7),e.ellipse(390,200,48,70,.2,0,7),e.fill(),e.fillStyle="#fff",e.beginPath(),e.arc(252,215,9,0,7),e.arc(388,215,9,0,7),e.fill(),e.fillStyle="#300",e.beginPath(),e.moveTo(230,320);for(let i=0;i<=10;i++)e.lineTo(230+i*18,320+(i%2?90:20));for(let i=10;i>=0;i--)e.lineTo(230+i*18,400+(i%2?-10:40));e.closePath(),e.fill(),e.strokeStyle="#a00",e.lineWidth=5;for(let i=0;i<9;i++)e.beginPath(),e.moveTo(200+Math.random()*240,330),e.lineTo(200+Math.random()*240,470),e.stroke();e.fillStyle="rgba(160,0,0,.25)",e.fillRect(0,0,640,480),W("jump").classList.remove("calm")}function qv(){let n=W("jumpc"),e=n.getContext("2d");n.width=640,n.height=240,e.fillStyle="#220",e.fillRect(0,0,640,240),e.fillStyle="#fff",e.font="48px sans-serif",e.textAlign="center",e.fillText("You were caught\u2026",320,130),W("jump").classList.add("calm")}function Yv(){let n=document.createElement("canvas");n.width=128,n.height=256;let e=n.getContext("2d");e.fillStyle="rgba(0,0,0,.92)",e.beginPath(),e.moveTo(30,250),e.lineTo(40,110),e.quadraticCurveTo(64,20,88,110),e.lineTo(98,250),e.closePath(),e.fill(),e.beginPath(),e.arc(64,62,30,0,7),e.fill(),e.fillStyle="#fff",e.beginPath(),e.ellipse(52,60,6,10,0,0,7),e.ellipse(76,60,6,10,0,0,7),e.fill();let t=new Ln(n);return t.colorSpace=wt,t}addEventListener("keydown",n=>{if(u.off){n.preventDefault();return}if(u.phase==="join"||u.phase==="lobby")return;let e=n.key.toLowerCase();if(!(n.target&&(n.target.tagName==="INPUT"||n.target.tagName==="SELECT"))){if(e==="h"&&(u.phase==="play"||u.phase==="meeting")){$c(!u.onBreak);return}if(!u.onBreak){if(u.qbox){let t="1234".indexOf(e)>=0?"1234".indexOf(e):"abcd".indexOf(e);if(t>=0&&t<u.qbox.n){let i=W("qOpts").querySelector('[data-i="'+t+'"]');i&&!i.disabled&&Gu(t)}e==="escape"&&Jc();return}Lt[e]=!0,["arrowup","arrowdown","arrowleft","arrowright"," "].includes(e)&&n.preventDefault(),!(u.phase!=="play"||u.paused)&&(e==="e"||e==="r"?$p():e==="f"?jp():e==="q"?Kp():e==="c"?Vu():e==="v"&&Yp())}}});addEventListener("keyup",n=>{Lt[n.key.toLowerCase()]=!1});addEventListener("blur",()=>{for(let n in Lt)Lt[n]=!1});document.addEventListener("mousemove",n=>{u.phase!=="play"||u.qbox||u.paused||(document.pointerLockElement===W("gl")||Hu)&&(u.yaw-=(n.movementX||0)*.0022,u.pitch=Ks(u.pitch-(n.movementY||0)*.0022,-1.45,1.45))});var Hu=!1;W("gl").addEventListener("mousedown",()=>{Hu=!0,u.phase==="play"&&document.pointerLockElement!==W("gl")?Jp():jp()});addEventListener("mouseup",()=>{Hu=!1});function Jp(){if(!(u.qbox||u.paused||u.phase!=="play"))try{let n=W("gl").requestPointerLock();n&&n.catch&&n.catch(()=>{})}catch{}}W("lockhint").addEventListener("click",()=>{W("lockhint").style.display="none",Jp()});document.addEventListener("pointerlockchange",()=>{document.pointerLockElement===W("gl")?W("lockhint").style.display="none":u.phase==="play"&&!u.qbox&&!u.paused&&!u.onBreak&&!W("menu").style.display.includes("flex")&&performance.now()>u.frozenUntil&&(W("lockhint").style.display="flex")});W("btnMenu").addEventListener("click",()=>{ft("menu",!0),document.exitPointerLock&&document.exitPointerLock(),W("lockhint").style.display="none"});W("btnResume").addEventListener("click",()=>{ft("menu",!1),W("lockhint").style.display="flex"});W("btnClues").addEventListener("click",Vu);W("btnCluesClose").addEventListener("click",Vu);function Vu(){let n=W("cluebox").style.display!=="flex";if(n){let e=u.mode==="survival"?'<li style="list-style:none;font-size:26px;color:#7fe3ff">\u{1F522} Your EXIT CODE: <b>'+u.xcode.join(" ")+" "+"_ ".repeat(Math.max(0,(u.xn||u.tasks.length)-u.xcode.length))+"</b></li>":"";W("clueList").innerHTML=e+(u.clues.length?u.clues.map(t=>"<li>"+ht(t)+"</li>").join(""):"<li><i>No clues yet. Unlock doors to find clues about the killer!</i></li>"),document.exitPointerLock&&document.exitPointerLock(),W("lockhint").style.display="none"}else W("lockhint").style.display="flex";ft("cluebox",n)}W("myGfx").addEventListener("change",()=>{let n=W("myGfx").value;u.smooth=n==="s",u.autoClassic=!1,n!=="s"&&(u.q=+n),tr()});W("chkFps").addEventListener("change",()=>{u.showFps=W("chkFps").checked,W("fps").style.display=u.showFps?"block":"none"});W("vol").addEventListener("input",()=>zc(+W("vol").value/100));W("myScare").addEventListener("change",()=>{u.myScare=+W("myScare").value,lo(xi())});function Wu(){if(!u.map||u.escaped)return null;let n=u.pos,e=u.map,t=null,i=s=>{(!t||s.d<t.d)&&(t=s)};if(!u.ghost&&u.mode!=="survival"){for(let r of u.bodies){let o=Math.hypot(n.x-r.x,n.z-r.z);o<3.4&&i({kind:"report",d:o-3,text:"\u{1F6A8} Press <b>E</b> \u2013 REPORT the body!"})}let s=Math.hypot(n.x-e.button.x,n.z-e.button.z);s<2.8&&u.emergLeft>0&&i({kind:"emerg",d:s,text:"\u{1F534} Press <b>E</b> \u2013 Emergency meeting"})}for(let s of u.tasks)if(!s.done){let r=e.stations[s.sid],o=Math.hypot(n.x-r.x,n.z-r.z);o<3&&i({kind:"task",id:s.sid,d:o,text:"\u{1F4DD} Press <b>E</b> \u2013 Do task: "+zu(s.sid)})}if(!u.ghost&&u.role!=="killer"&&e.hatches)for(let s of e.hatches){let r=Math.hypot(n.x-s.x,n.z-s.z);r<2.3&&i({kind:"hatch",id:s.id,d:r-.5,text:u.hatchCd>0?"\u{1F573}\uFE0F Secret passage recharging\u2026 "+Math.ceil(u.hatchCd)+"s":"\u{1F573}\uFE0F Press <b>E</b> \u2013 SECRET PASSAGE (crew only) \u2013 jump to the other side!"})}if(u.mode==="survival"&&!u.ghost){let s=e.doors.find(r=>r.kind==="gate");if(s){let r=Math.hypot(n.x-s.cx,n.z-s.cz);if(r<4.4){let o=u.tasks.filter(a=>a.done).length;i({kind:"keypad",d:r-1,text:o>=u.tasks.length?"\u{1F522} Press <b>E</b> \u2013 Enter your EXIT CODE":"\u{1F6AA} Exit door \u2013 finish your tasks first ("+o+"/"+u.tasks.length+")"})}}}if(u.role!=="killer")for(let s of e.panels){if(u.doors[s.door])continue;let r=Math.hypot(n.x-s.x,n.z-s.z);r<2.6&&i({kind:"lock",id:s.door,d:r,text:"\u{1F512} Press <b>E</b> \u2013 Answer to unlock this door"})}return t}function $p(){if(u.qbox||u.waitingQ)return;let n=Wu();n&&(n.kind==="report"?Et({t:"report"}):n.kind==="emerg"?(u.emergLeft--,Et({t:"emerg"})):n.kind==="keypad"?Fv():n.kind==="hatch"?u.hatchCd>0?Ye("\u23F3 Passage recharging ("+Math.ceil(u.hatchCd)+" s)",1500):Et({t:"hatch",id:n.id}):(u.waitingQ=!0,Et({t:"ask",kind:n.kind,id:n.id}),setTimeout(()=>u.waitingQ=!1,3e3)))}function Nu(){if(u.role!=="killer"||!u.alive)return null;let n=null,e=2.7;for(let t of u.players.values()){if(t.id===u.id||t.st!==0||t.new)continue;let i=Math.hypot(u.pos.x-t.tx,u.pos.z-t.tz);i<e&&(e=i,n=t)}return n}function jp(){if(u.role!=="killer"||u.phase!=="play"||u.qbox||u.paused)return;let n=Nu();if(n){if(u.kcd>0){Ye("\u23F3 Wait "+Math.ceil(u.kcd)+"s\u2026",1200);return}Et({t:"kill",target:n.id}),u.kcd=99}}function Kp(){let n=xn(u.job);if(!u.ghost)if(n.ab==="revive"&&u.role==="crew")u.charges.revive>0?Et({t:"ability",what:"revive"}):Ye("No revives left.",1500);else if(n.ab==="clue"&&u.role==="crew")u.charges.clue>0?(Et({t:"ability",what:"clue"}),u.charges.clue--):Ye("Already used.",1500);else if(n.ab==="xray"&&u.abilCd<=0)u.xray=n.dur,u.abilCd=n.cd,Te.whisper();else if(n.ab==="sprint"&&u.abilCd<=0)u.sprint=n.dur,u.abilCd=n.cd,Te.run();else if(n.ab==="lamp"&&u.abilCd<=0)u.abilCd=n.cd,Wp(u.pos.x,u.pos.z),Et({t:"ability",what:"lamp"}),Te.lamp();else if(n.ab==="axe"&&u.role==="crew"){let e=Zv();u.charges.axe>0?e?Et({t:"ability",what:"axe",id:e.id}):Ye("\u{1FA93} Stand next to a locked door first.",1800):Ye("No axe swings left.",1500)}else["shield","lullaby","swap"].includes(n.ab)&&u.role==="crew"?u.abilCd>0?Ye("Recharging\u2026 "+Math.ceil(u.abilCd)+"s",1200):Et({t:"ability",what:n.ab}):n.ab==="sniff"&&u.role==="crew"&&u.abilCd<=0?Xu()?(u.sniff=n.dur,u.abilCd=n.cd,Te.bark(),Ye("\u{1F415} Woof! Follow the arrow!",2e3,"good")):Ye("Nothing to sniff \u2013 find the exit!",2e3):n.ab==="scan"&&u.role==="crew"&&u.abilCd<=0?(u.scan=n.dur,u.abilCd=n.cd,Te.whisper(),Ye("\u{1F4E1} Scanning\u2026 watch the map!",2e3,"good")):u.abilCd>0&&Ye("Recharging\u2026 "+Math.ceil(u.abilCd)+"s",1200)}function Zv(){let n=null,e=4.6;for(let t of u.map.doors){if(t.kind!=="lock"||u.doors[t.id])continue;let i=Math.hypot(u.pos.x-t.cx,u.pos.z-t.cz);i<e&&(e=i,n=t)}return n}function Xu(){let n=null,e=1e9;for(let t of u.tasks)if(!t.done){let i=u.map.stations[t.sid],s=Math.hypot(u.pos.x-i.x,u.pos.z-i.z);s<e&&(e=s,n={x:i.x,z:i.z})}if(!n){let t=u.map.doors.find(i=>i.kind==="gate");t&&(n={x:t.cx,z:t.cz})}return n}function Qp(){if(!u.map||u.phase==="join")return;let n=u.mode==="survival",e=u.tasks.filter(d=>d.done).length,t=n?e:u.prog[0],i=n?u.tasks.length:u.prog[1];W("progBar").style.width=(i?100*t/i:0)+"%";let s=u.tl!=null?"  \xB7  \u23F1 "+Math.floor(u.tl/60)+":"+String(u.tl%60).padStart(2,"0"):"";W("progTxt").textContent=(n?e>=u.tasks.length?"\u{1F522} All tasks done \u2013 go to the EXIT door!":"\u{1F4DD} My tasks "+e+" / "+u.tasks.length+"  \xB7  \u{1F522} "+u.xcode.join("")+"_".repeat(Math.max(0,(u.xn||u.tasks.length)-u.xcode.length)):u.exitOpen?"EXIT OPEN \u2013 RUN!":"Escape progress "+t+" / "+i)+(u.mode==="survival"?"  \xB7  \u{1F3C3} "+u.aliveN+" running"+(u.escN?"  \xB7  \u{1F6AA} "+u.escN+" escaped":""):"")+s;let r=W("btnWarn");r.style.display=n&&u.escaped&&u.phase==="play"?"block":"none",r.textContent="\u{1F4E3} Warn others [V] ("+u.warnLeft+" left)",W("progTxt").className=u.tl!=null&&u.tl<=60?"low":"";let o=u.tasks.filter(d=>d.done).length;W("taskList").innerHTML="<b>Your tasks "+o+"/"+u.tasks.length+"</b>"+u.tasks.map(d=>'<div class="'+(d.done?"td":"")+'">'+(d.done?"\u2705 ":"\u2B1C ")+ht(zu(d.sid))+"</div>").join("")+(u.ghost&&!u.escaped?'<div class="gh">\u{1F47B} You are a ghost \u2013 keep doing tasks!</div>':"");let a=xn(u.job),c='<span class="ai">'+a.emoji+"</span><b>"+a.abName+"</b>";if(a.ab==="hint"?c+="<small>in questions \xB7 "+(u.charges.hint||0)+" left</small>":a.ab==="second"?c+="<small>automatic \xB7 "+(u.charges.second||0)+" left</small>":a.ab==="danger"?c+="<small>automatic</small>":a.ab==="revive"?c+="<small>Q \xB7 "+(u.charges.revive||0)+" left</small>":a.ab==="clue"?c+="<small>Q \xB7 "+(u.charges.clue||0)+" left</small>":a.ab==="axe"?c+="<small>Q \xB7 "+(u.charges.axe||0)+" left</small>":c+="<small>Q \xB7 "+(u.abilCd>0?Math.ceil(u.abilCd)+"s":"ready")+"</small>",W("abil").innerHTML=c,u.role==="killer"){let d=Nu();W("killbtn").innerHTML="<b>\u{1F52A} "+(u.kcd>.05?Math.ceil(u.kcd)+"s":d?"CATCH "+ht(d.name)+"! (F)":"ready")+"</b><small>Power "+u.rage+"/10 \u{1F608}</small>",W("killbtn").className=u.kcd<=.05&&d?"hot":"",W("killbtn").style.display=d?"flex":"none"}W("clueN").textContent=u.clues.length;let l=Wu(),h=W("prompt");if(u.phase==="play"&&!u.qbox&&!u.paused){let d=l?l.text:"";!d&&u.role==="killer"&&Nu()&&(d=u.kcd>.05?"":"\u{1F52A} Press <b>F</b> or click to CATCH"),!d&&xn(u.job).ab==="revive"&&u.charges.revive>0&&!u.ghost&&u.bodies.some(p=>Math.hypot(u.pos.x-p.x,u.pos.z-p.z)<4.5)&&(d="\u{1F49A} Press <b>Q</b> to REVIVE"),h.innerHTML=d,h.style.display=d?"block":"none"}else h.style.display="none";$v()}setInterval(Qp,100);var ls=W("mini"),Jv=ls.getContext("2d");function $v(){if(!u.map)return;let n=ls.width/48,e=Jv;e.clearRect(0,0,ls.width,ls.height),e.fillStyle="rgba(8,10,16,.72)",e.fillRect(0,0,ls.width,ls.height),e.save(),u.mirror>0&&(e.translate(ls.width,0),e.scale(-1,1)),e.font="8px sans-serif",e.textAlign="center";for(let t of u.map.rooms)e.strokeStyle=t.kind==="exit"?"#35c46a":"#445066",e.lineWidth=1,e.strokeRect(t.x0*n+.5,t.z0*n+.5,16*n,16*n),e.fillStyle=t.kind==="exit"?"#35c46a":"#6b778c",e.fillText(t.name.length>14?t.name.slice(0,13)+".":t.name,t.cx*n,t.cz*n+3);for(let t of u.map.doors)u.doors[t.id]||(e.fillStyle=t.kind==="gate"?"#ff5050":"#ffb347",t.o==="v"?e.fillRect(t.cx*n-1.5,(t.cz-3.4/2)*n,3,3.4*n):e.fillRect((t.cx-3.4/2)*n,t.cz*n-1.5,3.4*n,3));for(let t of u.tasks)if(!t.done){let i=u.map.stations[t.sid];e.fillStyle="#ffd34a",e.fillRect(i.x*n-3,i.z*n-3,6,6)}for(let t of u.pings)e.strokeStyle="rgba(255,60,60,"+Math.min(1,t.t/4)+")",e.lineWidth=2,e.beginPath(),e.arc(t.x*n,t.z*n,4+(9-t.t)*1.6,0,7),e.stroke();for(let t of u.map.gas||[])e.fillStyle="rgba(120,255,80,.3)",e.beginPath(),e.arc(t.x*n,t.z*n,t.r*n,0,7),e.fill();if(u.role!=="killer")for(let t of u.map.hatches||[])u.hatchSeen.has(t.id)&&(e.fillStyle="#30d0ff",e.fillRect(t.x*n-3,t.z*n-3,6,6));if(u.sniff>0){let t=Xu();t&&(e.strokeStyle="#7dff7d",e.lineWidth=2,e.beginPath(),e.arc(t.x*n,t.z*n,6+Math.sin(performance.now()/150)*2,0,7),e.stroke())}if(u.scan>0)for(let t of u.players.values())t.id!==u.id&&t.st===0&&!t.new&&(e.fillStyle="#7dd3ff",e.beginPath(),e.arc(t.tx*n,t.tz*n,3.2,0,7),e.fill());for(let t of u.bodies)e.fillStyle="#ff3030",e.fillText("\u2716",t.x*n,t.z*n+3);e.save(),e.translate(u.pos.x*n,u.pos.z*n),e.rotate(-u.yaw),e.fillStyle="#fff",e.beginPath(),e.moveTo(0,-5),e.lineTo(4,4),e.lineTo(-4,4),e.closePath(),e.fill(),e.restore(),e.restore()}var Pu=performance.now(),Vc=0,Iu=0,Wc=0,Lu=0,kp=0,Fp=0;function tr(){if(!L.renderer)return;let n=u.smooth;L.prBase=[.55,.8,Math.min(window.devicePixelRatio||1,1.25)][u.q],L.pr=n?Math.min(L.prBase,.5):L.prBase,L.renderer.setPixelRatio(L.pr),L.renderer.setSize(innerWidth,innerHeight,!1),L.camera.far=n?38:70,L.camera.updateProjectionMatrix(),L.scene&&u.map&&(L.scene.fog.density=u.map.D.fog*(n?1.35:1)),L.flash&&(L.flash.distance=n?20:28),L.dust&&(L.dust.visible=!n),L.halos&&(L.halos.visible=!n),L.pools&&(L.pools.visible=!n);for(let t of L.wisps||[])t.visible=!n;L.scene&&u.map&&L.look!==Du()&&Hp(Du());let e=u.q>=2&&!n&&L.look==="rich";L.flash&&L.flash.castShadow!==e&&(L.flash.castShadow=e,L.scene.traverse(t=>{t.material&&(t.material.needsUpdate=!0)})),W("myGfx")&&(W("myGfx").value=n?"s":String(u.q))}function Bp(){try{localStorage.setItem("se_fb","1")}catch{}}function em(n){if(requestAnimationFrame(em),!L.renderer||!u.map||u.phase!=="play"&&u.phase!=="meeting"){Pu=n;return}let e=n-Pu;if(u.smooth&&e<31)return;let t=Math.min(.06,e/1e3);Pu=n,jv(t,n/1e3),L.renderer.render(L.scene,L.camera);let i=Math.min(e,250)/1e3;if(Vc+=i,Iu++,Wc+=i,Lu++,Vc>=1&&(u.fps=Math.round(Iu/Vc),Vc=0,Iu=0,u.showFps&&(W("fps").textContent=u.fps+" FPS \xB7 "+L.renderer.info.render.calls+" draws \xB7 "+(u.smooth?"Smooth":["Low","Medium","High"][u.q]))),Wc>3&&!go.get("nogov")){let s=Wc/Lu;Wc=0,Lu=0,L.look==="rich"&&s>.036?(u.autoClassic=!0,tr(),Ye("\u26A1 Switched to the simple look to keep the game fast",3500),Bp()):s>.042&&!u.smooth?(u.smooth=!0,tr(),Ye("\u26A1 Smooth mode turned on to keep the game fast",3500),Bp()):s>.055&&L.pr>.42&&(L.pr*=.85,L.renderer.setPixelRatio(L.pr),L.renderer.setSize(innerWidth,innerHeight,!1))}}requestAnimationFrame(em);setInterval(()=>{u.fps&&(u.phase==="play"||u.phase==="meeting")&&Et({t:"fps",v:u.fps,q:u.smooth?"Smooth":["Low","Medium","High"][u.q]})},5e3);function jv(n,e){let t=u.map,i=u.pos,s=u.phase==="play"&&!u.paused&&!u.qbox&&!u.onBreak&&performance.now()>u.frozenUntil&&!u.jump;if(u.warnCd=Math.max(0,u.warnCd-n),u.abilCd=Math.max(0,u.abilCd-n),u.xray=Math.max(0,u.xray-n),u.sprint=Math.max(0,u.sprint-n),u.paused||(u.sniff=Math.max(0,u.sniff-n),u.scan=Math.max(0,u.scan-n),u.slowT=Math.max(0,u.slowT-n),u.shield=Math.max(0,u.shield-n)),!u.paused){u.hatchCd=Math.max(0,u.hatchCd-n),u.blackout=Math.max(0,u.blackout-n),u.mirror=Math.max(0,u.mirror-n),u.kcd=Math.max(0,u.kcd-n),u.flick=Math.max(0,u.flick-n),u.dark=Math.max(0,u.dark-n),u.jump=Math.max(0,u.jump-n);for(let f of u.pings)f.t-=n;u.pings=u.pings.filter(f=>f.t>0)}let r=!u.ghost&&zv();if(r&&!u.inGas&&u.phase==="play"&&performance.now()>u.gasT&&(u.gasT=performance.now()+6e3,Ye("\u2623\uFE0F <b>Toxic gas!</b> You move slowly \u2013 get out!",2500,"bad")),u.inGas=r,u.map.hatches)for(let f of u.map.hatches)!u.hatchSeen.has(f.id)&&Math.hypot(i.x-f.x,i.z-f.z)<9&&u.hatchSeen.add(f.id);let o=!1,a=Np;if(s){let f=0,m=0;(Lt.w||Lt.arrowup)&&(m+=1),(Lt.s||Lt.arrowdown)&&(m-=1),Lt.a&&(f-=1),Lt.d&&(f+=1),Lt.arrowleft&&(u.yaw+=n*1.9),Lt.arrowright&&(u.yaw-=n*1.9);let v=Math.hypot(f,m);if(v>0){f/=v,m/=v,o=!0,u.role==="killer"&&(a*=1+Math.min(.2,.02*u.rage)),u.sprint>0&&(a*=1.9),u.slowT>0&&(a*=.55),u.ghost?a*=1.25:u.inGas&&(a*=.55);let E=-Math.sin(u.yaw),M=-Math.cos(u.yaw),w=Math.cos(u.yaw),A=-Math.sin(u.yaw),_=(E*m+w*f)*a*n,T=(M*m+A*f)*a*n;u.ghost?(i.x=Ks(i.x+_,.5,48-.5),i.z=Ks(i.z+T,.5,64-.5),i.y=Ks(i.y+Math.sin(u.pitch)*m*a*n,.6,t.H-.5)):(Up(i.x+_,i.z)||(i.x+=_),Up(i.x,i.z+T)||(i.z+=T)),u.ghost||(u.stepT+=n*(a/Np),u.stepT>.48&&(u.stepT=0,Te.step(.6)))}Lt[" "]&&u.ghost&&(i.y=Math.min(t.H-.5,i.y+n*2.5))}u.ghost&&s&&Lt.shift&&(i.y=Math.max(.6,i.y-n*2.5)),u.ghost||(Fp+=o?n*9:0,i.y=xo+(o?Math.sin(Fp)*.035:0));for(let f of L.gasS||[]){let m=f.userData;f.position.set(m.x+Math.cos(e*.3+m.ph)*m.r,m.y+Math.sin(e*.5+m.ph)*.15,m.z+Math.sin(e*.27+m.ph)*m.r)}let c=performance.now();c-kp>100&&u.phase==="play"&&!u.paused&&(kp=c,Et({t:"pos",x:+i.x.toFixed(2),y:+i.y.toFixed(2),z:+i.z.toFixed(2),yaw:+u.yaw.toFixed(2)}));let l=L.camera,h=u.jump>0?(Math.random()-.5)*.08:0;l.position.set(i.x,i.y,i.z),l.rotation.set(u.pitch+h,u.yaw+h,0);let d=xi(),p=1;u.flick>0&&d>=1?p=Math.random()<.5?.15:1:d>=1&&Math.random()<.004&&(u.flick=.3),u.dark>0&&(p=0);let g=u.blackout>0?d>=1?.12:.55:1;L.hemi.intensity=L.hemiBase*(u.ghost?1.5:1)*(p===0?.25:1)*g,L.flash.intensity=u.ghost?25:60*(p<1?.2+.8*p:1)*(u.dark>0?0:1),L.lantern.intensity=u.ghost?12:7*(u.dark>0?0:1);let x=(p===1?.8+.2*Math.sin(e*2.3):p)*(g<1?g*.5:1);if(L.flickMat.color.setScalar((p===1?.75+.25*Math.sin(e*2.3):p)*(g<1?g:1)),L.pools&&(L.pools.material.opacity=L.poolBase*x,L.halos.material.opacity=.7*x),!u.smooth){L.dust.position.set(i.x,0,i.z);let f=L.dustP,m=L.dustN;for(let E=0;E<m;E++){let M=E*3;f[M]+=Math.sin(E*1.3+e*.3)*.12*n,f[M+1]-=(.04+E%5*.01)*n,f[M+2]+=Math.cos(E*.7+e*.25)*.12*n,f[M+1]<0&&(f[M+1]=3.6),f[M]>8?f[M]=-8:f[M]<-8&&(f[M]=8),f[M+2]>8?f[M+2]=-8:f[M+2]<-8&&(f[M+2]=8)}L.dustAttr.needsUpdate=!0;let v=d>=1&&u.phase==="play";for(let E of L.wisps){let M=E.userData.ph;E.position.set(24+Math.sin(e*.11+M)*20,1.8+Math.sin(e*.7+M)*.3,32+Math.cos(e*.083+M*1.3)*26);let w=Math.hypot(E.position.x-i.x,E.position.z-i.z);E.material.opacity=v?Ks((w-4)/6,0,1)*(d>=2?.26:.14):0}}for(let f of L.doors)if(f){let m=f.open?1:0;f.t+=(m-f.t)*Math.min(1,n*4),f.mesh.position.y=3/2-f.t*(3+.2),f.mesh.visible=f.t<.97}for(let[,f]of L.markers)f.gem.rotation.y+=n*2,f.gem.position.y=2.3+Math.sin(e*2)*.1;for(let f of u.players.values()){if(f.id===u.id||!f.av)continue;let m=Math.min(1,n*10),v=f.cx,E=f.cz;f.cx+=(f.tx-f.cx)*m,f.cy+=(f.ty-f.cy)*m,f.cz+=(f.tz-f.cz)*m;let M=f.tyaw-f.cyaw;M=Math.atan2(Math.sin(M),Math.cos(M)),f.cyaw+=M*m;let w=Math.hypot(f.cx-v,f.cz-E)/Math.max(n,.001);if(f.moving+=((w>.6?1:0)-f.moving)*Math.min(1,n*8),f.av.visible=f.st===0,f.gh.visible=f.st===1&&u.ghost,f.xr.visible=f.st===0&&(u.xray>0||u.ghost||u.role==="killer"&&u.exitOpen),f.av.visible){f.av.position.set(f.cx,0,f.cz),f.av.rotation.y=f.cyaw+Math.PI;let A=f.av.userData,_=Math.sin(e*9)*.6*f.moving;if(A.legL.rotation.x=_,A.legR.rotation.x=-_,A.armL.rotation.x=-_,A.armR.rotation.x=_,f.moving>.5&&w>.6&&(f.stepT+=n,f.stepT>.5)){f.stepT=0;let T=Math.hypot(f.cx-i.x,f.cz-i.z);T<14&&Te.step(.5*(1-T/14),Ks(Math.sin(Math.atan2(f.cx-i.x,i.z-f.cz)+u.yaw)*.8,-1,1))}}f.gh.visible&&f.gh.position.set(f.cx,.2+Math.sin(e*2+f.id)*.15+(f.cy>1.5?f.cy-1.6:0),f.cz)}L.myPet&&Op(L.myPet,i.x,i.z,!u.ghost,n,e,!0,u.yaw);for(let f of u.players.values())f.id===u.id||!f.av||(f.pet&&Op(f.pet,f.cx,f.cz,f.av.visible,n,e,!1),f.sh&&(f.shield=Math.max(0,(f.shield||0)-n),f.sh.visible=f.shield>0&&f.av.visible,f.sh.visible&&f.sh.scale.setScalar(1+Math.sin(e*6)*.03)));W("shieldfx").style.display=u.shield>0?"block":"none";let y=W("sniffArrow");if(u.sniff>0&&!u.ghost){let f=Xu();if(f){let m=f.x-i.x,v=f.z-i.z,E=Math.atan2(m*Math.cos(u.yaw)-v*Math.sin(u.yaw),-m*Math.sin(u.yaw)-v*Math.cos(u.yaw));y.style.display="block",y.querySelector("span").style.transform="rotate("+E+"rad)",y.querySelector("small").textContent=Math.round(Math.hypot(m,v))+" m"}else y.style.display="none"}else y.style.display="none";for(let f of L.bodies)f.a.visible=!0;for(let f of L.lamps)f.t-=n,f.t<0&&(L.scene.remove(f.m),f.light&&L.scene.remove(f.light),f.dead=!0);if(L.lamps=L.lamps.filter(f=>!f.dead),u.appT-=n,u.appT<=0&&u.phase==="play"&&d>=2&&!u.ghost&&(Kv(),u.appT=55+Math.random()*60),L.app){L.app.t-=n;let f=new V;l.getWorldDirection(f);let m=L.app.s.position.clone().sub(l.position).normalize();f.dot(m)>.93&&L.app.t<1.3&&(Te.sting(),gi("#fff",120),L.app.t=0),L.app.t<=0&&(L.scene.remove(L.app.s),L.app=null)}W("danger").style.opacity=u.danger?.25+.2*Math.sin(e*8):0,u.danger!==u.dangerOn&&(u.dangerOn=u.danger,Te.heartLoop(u.danger)),u.danger&&!Sp("heartbeat")&&Math.floor(e*1.6)!==Math.floor((e-n)*1.6)&&Te.heart()}function Kv(){L.appTex||(L.appTex=Yv());let n=u.yaw+(Math.random()<.5?-1:1)*(.6+Math.random()*.5),e=9,t=new wi(new li({map:L.appTex,transparent:!0,fog:!1}));t.scale.set(1.7,3.4,1),t.position.set(u.pos.x-Math.sin(n)*e,1.7,u.pos.z-Math.cos(n)*e),L.scene.add(t),L.app={s:t,t:2.2},u.flick=.5,Te.creak(),Te.thud()}function $c(n){u.onBreak===n||u.phase!=="play"&&u.phase!=="meeting"||(u.onBreak=n,ft("breakbox",n),Et({t:"break",on:n}),n?(document.exitPointerLock&&document.exitPointerLock(),zc(.12),ho(),u.myScare=0,W("myScare").value="0",lo(0),u.flick=0,u.dark=0,W("danger").style.opacity=0,W("lockhint").style.display="none",Lt.w=Lt.a=Lt.s=Lt.d=!1):(zc(+W("vol").value/100),Eu(u.mapId),W("lockhint").style.display=u.phase==="play"?"flex":"none"))}W("btnBreak").addEventListener("click",()=>$c(!0));W("btnBreakEnd").addEventListener("click",()=>$c(!1));iv&&(window.__se={ST:u,V:L,send:Et,drop(){zn&&zn.close()},setSmooth(n){u.smooth=n,tr()},audioInfo:bp,tp(n,e){u.pos.x=n,u.pos.z=e},nearest:Wu,interact:$p,answer:Gu,toast:Ye,useAbility:Kp,showcase(n,e){let t=ao.slice(n,e);L.scene.add(new kr(16777215,2.6)),u.pitch=-.05,t.forEach((i,s)=>{let r=Fu(i.id),o=(s-(t.length-1)/2)*1.15,a=u.pos.x+Math.cos(u.yaw)*o-Math.sin(u.yaw)*3.6,c=u.pos.z-Math.sin(u.yaw)*o-Math.cos(u.yaw)*3.6;if(r.position.set(a,0,c),r.rotation.y=u.yaw,L.scene.add(r),i.id==="dog"||i.id==="magician"){let l=Bu(i.id==="dog"?"dog":"cat");l.g.visible=!0,l.g.position.set(a+Math.cos(u.yaw)*.55,0,c-Math.sin(u.yaw)*.55+.4),l.g.rotation.y=u.yaw+.5}})},sees:()=>[...u.players.values()].map(n=>[n.id,n.name,n.st,+(n.cx||0).toFixed(1),+(n.cz||0).toFixed(1)])});})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
