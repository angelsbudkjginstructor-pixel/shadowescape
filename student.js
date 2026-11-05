(()=>{var jp=Object.create;var Zc=Object.defineProperty;var Kp=Object.getOwnPropertyDescriptor;var Qp=Object.getOwnPropertyNames;var em=Object.getPrototypeOf,tm=Object.prototype.hasOwnProperty;var nm=n=>{throw TypeError(n)};var im=(n,e)=>()=>{try{return e||n((e={exports:{}}).exports,e),e.exports}catch(t){throw e=0,t}},go=(n,e)=>{for(var t in e)Zc(n,t,{get:e[t],enumerable:!0})},sm=(n,e,t,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Qp(e))!tm.call(n,s)&&s!==t&&Zc(n,s,{get:()=>e[s],enumerable:!(i=Kp(e,s))||i.enumerable});return n};var Ju=(n,e,t)=>(t=n!=null?jp(em(n)):{},sm(e||!n||!n.__esModule?Zc(t,"default",{value:n,enumerable:!0}):t,n));var Qs=(n,e,t)=>e.has(n)?nm("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(n):e.set(n,t);var jh=im((dT,$h)=>{"use strict";var se={};se.generateIdentifier=function(){return Math.random().toString(36).substring(2,12)};se.localCName=se.generateIdentifier();se.splitLines=function(n){return n.trim().split(`
`).map(e=>e.trim())};se.splitSections=function(n){return n.split(`
m=`).map((t,i)=>(i>0?"m="+t:t).trim()+`\r
`)};se.getDescription=function(n){let e=se.splitSections(n);return e&&e[0]};se.getMediaSections=function(n){let e=se.splitSections(n);return e.shift(),e};se.matchPrefix=function(n,e){return se.splitLines(n).filter(t=>t.indexOf(e)===0)};se.parseCandidate=function(n){let e;n.indexOf("a=candidate:")===0?e=n.substring(12).split(" "):e=n.substring(10).split(" ");let t={foundation:e[0],component:{1:"rtp",2:"rtcp"}[e[1]]||e[1],protocol:e[2].toLowerCase(),priority:parseInt(e[3],10),ip:e[4],address:e[4],port:parseInt(e[5],10),type:e[7]};for(let i=8;i<e.length;i+=2)switch(e[i]){case"raddr":t.relatedAddress=e[i+1];break;case"rport":t.relatedPort=parseInt(e[i+1],10);break;case"tcptype":t.tcpType=e[i+1];break;case"ufrag":t.ufrag=e[i+1],t.usernameFragment=e[i+1];break;default:t[e[i]]===void 0&&(t[e[i]]=e[i+1]);break}return t};se.writeCandidate=function(n){let e=[];e.push(n.foundation);let t=n.component;t==="rtp"?e.push(1):t==="rtcp"?e.push(2):e.push(t),e.push(n.protocol.toUpperCase()),e.push(n.priority),e.push(n.address||n.ip),e.push(n.port);let i=n.type;return e.push("typ"),e.push(i),i!=="host"&&n.relatedAddress&&n.relatedPort!==void 0&&(e.push("raddr"),e.push(n.relatedAddress),e.push("rport"),e.push(n.relatedPort)),n.tcpType&&n.protocol.toLowerCase()==="tcp"&&(e.push("tcptype"),e.push(n.tcpType)),(n.usernameFragment||n.ufrag)&&(e.push("ufrag"),e.push(n.usernameFragment||n.ufrag)),"candidate:"+e.join(" ")};se.parseIceOptions=function(n){return n.substring(14).split(" ")};se.parseRtpMap=function(n){let e=n.substring(9).split(" "),t={payloadType:parseInt(e.shift(),10)};return e=e[0].split("/"),t.name=e[0],t.clockRate=parseInt(e[1],10),t.channels=e.length===3?parseInt(e[2],10):1,t.numChannels=t.channels,t};se.writeRtpMap=function(n){let e=n.payloadType;n.preferredPayloadType!==void 0&&(e=n.preferredPayloadType);let t=n.channels||n.numChannels||1;return"a=rtpmap:"+e+" "+n.name+"/"+n.clockRate+(t!==1?"/"+t:"")+`\r
`};se.parseExtmap=function(n){let e=n.substring(9).split(" ");return{id:parseInt(e[0],10),direction:e[0].indexOf("/")>0?e[0].split("/")[1]:"sendrecv",uri:e[1],attributes:e.slice(2).join(" ")}};se.writeExtmap=function(n){return"a=extmap:"+(n.id||n.preferredId)+(n.direction&&n.direction!=="sendrecv"?"/"+n.direction:"")+" "+n.uri+(n.attributes?" "+n.attributes:"")+`\r
`};se.parseFmtp=function(n){let e={},t,i=n.substring(n.indexOf(" ")+1).split(";");for(let s=0;s<i.length;s++)t=i[s].trim().split("="),e[t[0].trim()]=t[1];return e};se.writeFmtp=function(n){let e="",t=n.payloadType;if(n.preferredPayloadType!==void 0&&(t=n.preferredPayloadType),n.parameters&&Object.keys(n.parameters).length){let i=[];Object.keys(n.parameters).forEach(s=>{n.parameters[s]!==void 0?i.push(s+"="+n.parameters[s]):i.push(s)}),e+="a=fmtp:"+t+" "+i.join(";")+`\r
`}return e};se.parseRtcpFb=function(n){let e=n.substring(n.indexOf(" ")+1).split(" ");return{type:e.shift(),parameter:e.join(" ")}};se.writeRtcpFb=function(n){let e="",t=n.payloadType;return n.preferredPayloadType!==void 0&&(t=n.preferredPayloadType),n.rtcpFeedback&&n.rtcpFeedback.length&&n.rtcpFeedback.forEach(i=>{e+="a=rtcp-fb:"+t+" "+i.type+(i.parameter&&i.parameter.length?" "+i.parameter:"")+`\r
`}),e};se.parseSsrcMedia=function(n){let e=n.indexOf(" "),t={ssrc:parseInt(n.substring(7,e),10)},i=n.indexOf(":",e);return i>-1?(t.attribute=n.substring(e+1,i),t.value=n.substring(i+1)):t.attribute=n.substring(e+1),t};se.parseSsrcGroup=function(n){let e=n.substring(13).split(" ");return{semantics:e.shift(),ssrcs:e.map(t=>parseInt(t,10))}};se.getMid=function(n){let e=se.matchPrefix(n,"a=mid:")[0];if(e)return e.substring(6)};se.parseFingerprint=function(n){let e=n.substring(14).split(" ");return{algorithm:e[0].toLowerCase(),value:e[1].toUpperCase()}};se.getDtlsParameters=function(n,e){return{role:"auto",fingerprints:se.matchPrefix(n+e,"a=fingerprint:").map(se.parseFingerprint)}};se.writeDtlsParameters=function(n,e){let t="a=setup:"+e+`\r
`;return n.fingerprints.forEach(i=>{t+="a=fingerprint:"+i.algorithm+" "+i.value+`\r
`}),t};se.parseCryptoLine=function(n){let e=n.substring(9).split(" ");return{tag:parseInt(e[0],10),cryptoSuite:e[1],keyParams:e[2],sessionParams:e.slice(3)}};se.writeCryptoLine=function(n){return"a=crypto:"+n.tag+" "+n.cryptoSuite+" "+(typeof n.keyParams=="object"?se.writeCryptoKeyParams(n.keyParams):n.keyParams)+(n.sessionParams?" "+n.sessionParams.join(" "):"")+`\r
`};se.parseCryptoKeyParams=function(n){if(n.indexOf("inline:")!==0)return null;let e=n.substring(7).split("|");return{keyMethod:"inline",keySalt:e[0],lifeTime:e[1],mkiValue:e[2]?e[2].split(":")[0]:void 0,mkiLength:e[2]?e[2].split(":")[1]:void 0}};se.writeCryptoKeyParams=function(n){return n.keyMethod+":"+n.keySalt+(n.lifeTime?"|"+n.lifeTime:"")+(n.mkiValue&&n.mkiLength?"|"+n.mkiValue+":"+n.mkiLength:"")};se.getCryptoParameters=function(n,e){return se.matchPrefix(n+e,"a=crypto:").map(se.parseCryptoLine)};se.getIceParameters=function(n,e){let t=se.matchPrefix(n+e,"a=ice-ufrag:")[0],i=se.matchPrefix(n+e,"a=ice-pwd:")[0];return t&&i?{usernameFragment:t.substring(12),password:i.substring(10)}:null};se.writeIceParameters=function(n){let e="a=ice-ufrag:"+n.usernameFragment+`\r
a=ice-pwd:`+n.password+`\r
`;return n.iceLite&&(e+=`a=ice-lite\r
`),e};se.parseRtpParameters=function(n){let e={codecs:[],headerExtensions:[],fecMechanisms:[],rtcp:[]},i=se.splitLines(n)[0].split(" ");e.profile=i[2];for(let r=3;r<i.length;r++){let o=i[r],a=se.matchPrefix(n,"a=rtpmap:"+o+" ")[0];if(a){let c=se.parseRtpMap(a),l=se.matchPrefix(n,"a=fmtp:"+o+" ");switch(c.parameters=l.length?se.parseFmtp(l[0]):{},c.rtcpFeedback=se.matchPrefix(n,"a=rtcp-fb:"+o+" ").map(se.parseRtcpFb),e.codecs.push(c),c.name.toUpperCase()){case"RED":case"ULPFEC":e.fecMechanisms.push(c.name.toUpperCase());break;default:break}}}se.matchPrefix(n,"a=extmap:").forEach(r=>{e.headerExtensions.push(se.parseExtmap(r))});let s=se.matchPrefix(n,"a=rtcp-fb:* ").map(se.parseRtcpFb);return e.codecs.forEach(r=>{s.forEach(o=>{r.rtcpFeedback.find(c=>c.type===o.type&&c.parameter===o.parameter)||r.rtcpFeedback.push(o)})}),e};se.writeRtpDescription=function(n,e){let t="";t+="m="+n+" ",t+=e.codecs.length>0?"9":"0",t+=" "+(e.profile||"UDP/TLS/RTP/SAVPF")+" ",t+=e.codecs.map(s=>s.preferredPayloadType!==void 0?s.preferredPayloadType:s.payloadType).join(" ")+`\r
`,t+=`c=IN IP4 0.0.0.0\r
`,t+=`a=rtcp:9 IN IP4 0.0.0.0\r
`,e.codecs.forEach(s=>{t+=se.writeRtpMap(s),t+=se.writeFmtp(s),t+=se.writeRtcpFb(s)});let i=0;return e.codecs.forEach(s=>{s.maxptime>i&&(i=s.maxptime)}),i>0&&(t+="a=maxptime:"+i+`\r
`),e.headerExtensions&&e.headerExtensions.forEach(s=>{t+=se.writeExtmap(s)}),t};se.parseRtpEncodingParameters=function(n){let e=[],t=se.parseRtpParameters(n),i=t.fecMechanisms.indexOf("RED")!==-1,s=t.fecMechanisms.indexOf("ULPFEC")!==-1,r=se.matchPrefix(n,"a=ssrc:").map(h=>se.parseSsrcMedia(h)).filter(h=>h.attribute==="cname"),o=r.length>0&&r[0].ssrc,a,c=se.matchPrefix(n,"a=ssrc-group:FID").map(h=>h.substring(17).split(" ").map(f=>parseInt(f,10)));c.length>0&&c[0].length>1&&c[0][0]===o&&(a=c[0][1]),t.codecs.forEach(h=>{if(h.name.toUpperCase()==="RTX"&&h.parameters.apt){let u={ssrc:o,codecPayloadType:parseInt(h.parameters.apt,10)};o&&a&&(u.rtx={ssrc:a}),e.push(u),i&&(u=JSON.parse(JSON.stringify(u)),u.fec={ssrc:o,mechanism:s?"red+ulpfec":"red"},e.push(u))}}),e.length===0&&o&&e.push({ssrc:o});let l=se.matchPrefix(n,"b=");return l.length&&(l[0].indexOf("b=TIAS:")===0?l=parseInt(l[0].substring(7),10):l[0].indexOf("b=AS:")===0?l=parseInt(l[0].substring(5),10)*1e3*.95-2e3*8:l=void 0,e.forEach(h=>{h.maxBitrate=l})),e};se.parseRtcpParameters=function(n){let e={},t=se.matchPrefix(n,"a=ssrc:").map(r=>se.parseSsrcMedia(r)).filter(r=>r.attribute==="cname")[0];t&&(e.cname=t.value,e.ssrc=t.ssrc);let i=se.matchPrefix(n,"a=rtcp-rsize");e.reducedSize=i.length>0,e.compound=i.length===0;let s=se.matchPrefix(n,"a=rtcp-mux");return e.mux=s.length>0,e};se.writeRtcpParameters=function(n){let e="";return n.reducedSize&&(e+=`a=rtcp-rsize\r
`),n.mux&&(e+=`a=rtcp-mux\r
`),n.ssrc!==void 0&&n.cname&&(e+="a=ssrc:"+n.ssrc+" cname:"+n.cname+`\r
`),e};se.parseMsid=function(n){let e,t=se.matchPrefix(n,"a=msid:");if(t.length===1)return e=t[0].substring(7).split(" "),{stream:e[0],track:e[1]};let i=se.matchPrefix(n,"a=ssrc:").map(s=>se.parseSsrcMedia(s)).filter(s=>s.attribute==="msid");if(i.length>0)return e=i[0].value.split(" "),{stream:e[0],track:e[1]}};se.parseSctpDescription=function(n){let e=se.parseMLine(n),t=se.matchPrefix(n,"a=max-message-size:"),i;t.length>0&&(i=parseInt(t[0].substring(19),10)),isNaN(i)&&(i=65536);let s=se.matchPrefix(n,"a=sctp-port:");if(s.length>0)return{port:parseInt(s[0].substring(12),10),protocol:e.fmt,maxMessageSize:i};let r=se.matchPrefix(n,"a=sctpmap:");if(r.length>0){let o=r[0].substring(10).split(" ");return{port:parseInt(o[0],10),protocol:o[1],maxMessageSize:i}}};se.writeSctpDescription=function(n,e){let t=[];return n.protocol!=="DTLS/SCTP"?t=["m="+n.kind+" 9 "+n.protocol+" "+e.protocol+`\r
`,`c=IN IP4 0.0.0.0\r
`,"a=sctp-port:"+e.port+`\r
`]:t=["m="+n.kind+" 9 "+n.protocol+" "+e.port+`\r
`,`c=IN IP4 0.0.0.0\r
`,"a=sctpmap:"+e.port+" "+e.protocol+` 65535\r
`],e.maxMessageSize!==void 0&&t.push("a=max-message-size:"+e.maxMessageSize+`\r
`),t.join("")};se.generateSessionId=function(){return Math.random().toString().substr(2,22)};se.writeSessionBoilerplate=function(n,e,t){let i,s=e!==void 0?e:2;return n?i=n:i=se.generateSessionId(),`v=0\r
o=`+(t||"thisisadapterortc")+" "+i+" "+s+` IN IP4 127.0.0.1\r
s=-\r
t=0 0\r
`};se.getDirection=function(n,e){let t=se.splitLines(n);for(let i=0;i<t.length;i++)switch(t[i]){case"a=sendrecv":case"a=sendonly":case"a=recvonly":case"a=inactive":return t[i].substring(2);default:}return e?se.getDirection(e):"sendrecv"};se.getKind=function(n){return se.splitLines(n)[0].split(" ")[0].substring(2)};se.isRejected=function(n){return n.split(" ",2)[1]==="0"};se.parseMLine=function(n){let t=se.splitLines(n)[0].substring(2).split(" ");return{kind:t[0],port:parseInt(t[1],10),protocol:t[2],fmt:t.slice(3).join(" ")}};se.parseOLine=function(n){let t=se.matchPrefix(n,"o=")[0].substring(2).split(" ");return{username:t[0],sessionId:t[1],sessionVersion:parseInt(t[2],10),netType:t[3],addressType:t[4],address:t[5]}};se.isValidSDP=function(n){if(typeof n!="string"||n.length===0)return!1;let e=se.splitLines(n);for(let t=0;t<e.length;t++)if(e[t].length<2||e[t].charAt(1)!=="=")return!1;return!0};typeof $h=="object"&&($h.exports=se)});var Td=0,Cl=1,Ed=2;var Wi=1,Ad=2,Os=3,wi=0,rn=1,Xn=2,Xi=0,Fs=1,qi=2,Rl=3,Pl=4,wd=5;var Yi=100,Cd=101,Rd=102,Pd=103,Id=104,Ld=200,Dd=201,Nd=202,Ud=203,Il=204,Ll=205,Od=206,Fd=207,kd=208,Bd=209,zd=210,Gd=211,Hd=212,Vd=213,Wd=214,Wo=0,Xo=1,qo=2,Es=3,Yo=4,Zo=5,Jo=6,$o=7,va=0,Xd=1,qd=2,qn=0,Dl=1,Nl=2,Ul=3,Ol=4,Fl=5,kl=6,Bl=7;var zl=300,Zi=301,ks=302,Sa=303,ba=304,As=1e3,kn=1001,jo=1002,Gt=1003,Yd=1004;var Nr=1005;var nn=1006,Ma=1007;var li=1008;var cn=1009,Gl=1010,Hl=1011,Bs=1012,Ta=1013,Pn=1014,In=1015,Ln=1016,Ea=1017,Aa=1018,Ji=1020,Vl=35902,Wl=35899,Xl=1021,ql=1022,Dn=1023,ri=1026,hi=1027,Yl=1028,wa=1029,Ci=1030,Ca=1031;var Ra=1033,Ur=33776,Or=33777,Fr=33778,kr=33779,Pa=35840,Ia=35841,La=35842,Da=35843,Na=36196,Ua=37492,Oa=37496,Fa=37488,ka=37489,Br=37490,Ba=37491,za=37808,Ga=37809,Ha=37810,Va=37811,Wa=37812,Xa=37813,qa=37814,Ya=37815,Za=37816,Ja=37817,$a=37818,ja=37819,Ka=37820,Qa=37821,ec=36492,tc=36494,nc=36495,ic=36283,sc=36284,zr=36285,rc=36286;var cr=2300,Ko=2301,Ho=2302,xl=2303,yl=2400,vl=2401,Sl=2402;var Zd=3200;var oc=0,Jd=1,ui="",bt="srgb",lr="srgb-linear",hr="linear",it="srgb";var Vo=7680;var $d=519,jd=512,Kd=513,Qd=514,Zl=515,ef=516,tf=517,Jl=518,$l=519,jl=35044;var Kl="300 es",Sn=2e3,ws=2001;function rm(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function om(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function ur(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function nf(){let n=ur("canvas");return n.style.display="block",n}var $u={},Cs=null;function dr(...n){let e="THREE."+n.shift();Cs?Cs("log",e,...n):console.log(e,...n)}function sf(n){let e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Oe(...n){n=sf(n);let e="THREE."+n.shift();if(Cs)Cs("warn",e,...n);else{let t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Fe(...n){n=sf(n);let e="THREE."+n.shift();if(Cs)Cs("error",e,...n);else{let t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function ar(...n){let e=n.join(" ");e in $u||($u[e]=!0,Oe(...n))}function rf(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}var of={[Wo]:Wo,[qo]:Jo,[Yo]:Yo,[Es]:Zo,[Xo]:Xo,[Jo]:qo,[$o]:$o,[Zo]:Es},Bn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let s=i[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},Zt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Jc=Math.PI/180,fr=180/Math.PI;function $i(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Zt[n&255]+Zt[n>>8&255]+Zt[n>>16&255]+Zt[n>>24&255]+"-"+Zt[e&255]+Zt[e>>8&255]+"-"+Zt[e>>16&15|64]+Zt[e>>24&255]+"-"+Zt[t&63|128]+Zt[t>>8&255]+"-"+Zt[t>>16&255]+Zt[t>>24&255]+Zt[i&255]+Zt[i>>8&255]+Zt[i>>16&255]+Zt[i>>24&255]).toLowerCase()}function et(n,e,t){return Math.max(e,Math.min(t,n))}function am(n,e){return(n%e+e)%e}function $c(n,e,t){return(1-t)*n+t*e}function af(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function ac(n){switch(n.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function cf(n,e){if(e.constructor===Float32Array)return n;let t=ac(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(n/t,-1)}function lf(n,e){if(e.constructor===Float32Array)return n;let t=ac(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(n*t)}var ih=class ih{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(et(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(et(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*i-o*s+e.x,this.y=r*s+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};ih.prototype.isVector2=!0;var ke=ih,zn=class{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,o,a){let c=i[s+0],l=i[s+1],h=i[s+2],u=i[s+3],f=r[o+0],d=r[o+1],g=r[o+2],y=r[o+3];if(u!==y||c!==f||l!==d||h!==g){let _=c*f+l*d+h*g+u*y;_<0&&(f=-f,d=-d,g=-g,y=-y,_=-_);let p=1-a;if(_<.9995){let S=Math.acos(_),w=Math.sin(S);p=Math.sin(p*S)/w,a=Math.sin(a*S)/w,c=c*p+f*a,l=l*p+d*a,h=h*p+g*a,u=u*p+y*a}else{c=c*p+f*a,l=l*p+d*a,h=h*p+g*a,u=u*p+y*a;let S=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=S,l*=S,h*=S,u*=S}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,s,r,o){let a=i[s],c=i[s+1],l=i[s+2],h=i[s+3],u=r[o],f=r[o+1],d=r[o+2],g=r[o+3];return e[t]=a*g+h*u+c*d-l*f,e[t+1]=c*g+h*f+l*u-a*d,e[t+2]=l*g+h*d+a*f-c*u,e[t+3]=h*g-a*u-c*f-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(i/2),h=a(s/2),u=a(r/2),f=c(i/2),d=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"YXZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"ZXY":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"ZYX":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"YZX":this._x=f*h*u+l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u-f*d*g;break;case"XZY":this._x=f*h*u-l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u+f*d*g;break;default:Oe("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],u=t[10],f=i+a+u;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(o-s)*d}else if(i>a&&i>u){let d=2*Math.sqrt(1+i-a-u);this._w=(h-c)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+l)/d}else if(a>u){let d=2*Math.sqrt(1+a-i-u);this._w=(r-l)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(c+h)/d}else{let d=2*Math.sqrt(1+u-i-a);this._w=(o-s)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(et(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=i*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-i*l,this._z=r*h+o*l+i*c-s*a,this._w=o*h-i*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,o=e._w,a=this.dot(e);a<0&&(i=-i,s=-s,r=-r,o=-o,a=-a);let c=1-t;if(a<.9995){let l=Math.acos(a),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+i*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+o*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+o*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},sh=class sh{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ju.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ju.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,i=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*i),h=2*(a*t-r*s),u=2*(r*i-o*t);return this.x=t+c*l+o*u-a*h,this.y=i+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this.z=et(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this.z=et(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(et(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-i*c,this.z=i*a-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return jc.copy(this).projectOnVector(e),this.sub(jc)}reflect(e){return this.sub(jc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(et(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};sh.prototype.isVector3=!0;var G=sh,jc=new G,ju=new zn,rh=class rh{constructor(e,t,i,s,r,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,c,l)}set(e,t,i,s,r,o,a,c,l){let h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=c,h[6]=i,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],h=i[4],u=i[7],f=i[2],d=i[5],g=i[8],y=s[0],_=s[3],p=s[6],S=s[1],w=s[4],T=s[7],A=s[2],C=s[5],x=s[8];return r[0]=o*y+a*S+c*A,r[3]=o*_+a*w+c*C,r[6]=o*p+a*T+c*x,r[1]=l*y+h*S+u*A,r[4]=l*_+h*w+u*C,r[7]=l*p+h*T+u*x,r[2]=f*y+d*S+g*A,r[5]=f*_+d*w+g*C,r[8]=f*p+d*T+g*x,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-i*r*h+i*a*c+s*r*l-s*o*c}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=h*o-a*l,f=a*c-h*r,d=l*r-o*c,g=t*u+i*f+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/g;return e[0]=u*y,e[1]=(s*l-h*i)*y,e[2]=(a*i-s*o)*y,e[3]=f*y,e[4]=(h*t-s*c)*y,e[5]=(s*r-a*t)*y,e[6]=d*y,e[7]=(i*c-l*t)*y,e[8]=(o*t-i*r)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return ar("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Kc.makeScale(e,t)),this}rotate(e){return ar("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Kc.makeRotation(-e)),this}translate(e,t){return ar("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Kc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};rh.prototype.isMatrix3=!0;var Be=rh,Kc=new Be,Ku=new Be().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Qu=new Be().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function cm(){let n={enabled:!0,workingColorSpace:lr,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===it&&(s.r=si(s.r),s.g=si(s.g),s.b=si(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===it&&(s.r=Ts(s.r),s.g=Ts(s.g),s.b=Ts(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ui?hr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[o].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[lr]:{primaries:e,whitePoint:i,transfer:hr,toXYZ:Ku,fromXYZ:Qu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:bt},outputColorSpaceConfig:{drawingBufferColorSpace:bt}},[bt]:{primaries:e,whitePoint:i,transfer:it,toXYZ:Ku,fromXYZ:Qu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:bt}}}),n}var Qe=cm();function si(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ts(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var as,Qo=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{as===void 0&&(as=ur("canvas")),as.width=e.width,as.height=e.height;let s=as.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=as}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=ur("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=si(r[o]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(si(t[i]/255)*255):t[i]=si(t[i]);return{data:t,width:e.width,height:e.height}}else return Oe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},lm=0,Rs=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:lm++}),this.uuid=$i(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Qc(s[o].image)):r.push(Qc(s[o]))}else r=Qc(s);i.url=r}return t||(e.images[this.uuid]=i),i}};function Qc(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Qo.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Oe("Texture: Unable to serialize Texture."),{})}var hm=0,el=new G,sn=class n extends Bn{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=kn,s=kn,r=nn,o=li,a=Dn,c=cn,l=n.DEFAULT_ANISOTROPY,h=ui){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:hm++}),this.uuid=$i(),this.name="",this.source=new Rs(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ke(0,0),this.repeat=new ke(1,1),this.center=new ke(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Be,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(el).x}get height(){return this.source.getSize(el).y}get depth(){return this.source.getSize(el).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){Oe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Oe(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==zl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case As:e.x=e.x-Math.floor(e.x);break;case kn:e.x=e.x<0?0:1;break;case jo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case As:e.y=e.y-Math.floor(e.y);break;case kn:e.y=e.y<0?0:1;break;case jo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};sn.DEFAULT_IMAGE=null;sn.DEFAULT_MAPPING=zl;sn.DEFAULT_ANISOTROPY=1;var oh=class oh{constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*i+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r,c=e.elements,l=c[0],h=c[4],u=c[8],f=c[1],d=c[5],g=c[9],y=c[2],_=c[6],p=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-y)<.01&&Math.abs(g-_)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+y)<.1&&Math.abs(g+_)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let w=(l+1)/2,T=(d+1)/2,A=(p+1)/2,C=(h+f)/4,x=(u+y)/4,E=(g+_)/4;return w>T&&w>A?w<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(w),s=C/i,r=x/i):T>A?T<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(T),i=C/s,r=E/s):A<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),i=x/r,s=E/r),this.set(i,s,r,t),this}let S=Math.sqrt((_-g)*(_-g)+(u-y)*(u-y)+(f-h)*(f-h));return Math.abs(S)<.001&&(S=1),this.x=(_-g)/S,this.y=(u-y)/S,this.z=(f-h)/S,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this.z=et(this.z,e.z,t.z),this.w=et(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this.z=et(this.z,e,t),this.w=et(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(et(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};oh.prototype.isVector4=!0;var mt=oh,ea=class extends Bn{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:nn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new mt(0,0,e,t),this.scissorTest=!1,this.viewport=new mt(0,0,e,t),this.textures=[];let s=i.count;for(let r=0;r<s;r++)this.textures[r]=new sn({width:e,height:t,depth:i.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:nn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Rs(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},dn=class extends ea{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},pr=class extends sn{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Gt,this.minFilter=Gt,this.wrapR=kn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var ta=class extends sn{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Gt,this.minFilter=Gt,this.wrapR=kn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var ya=class ya{constructor(e,t,i,s,r,o,a,c,l,h,u,f,d,g,y,_){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,c,l,h,u,f,d,g,y,_)}set(e,t,i,s,r,o,a,c,l,h,u,f,d,g,y,_){let p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=g,p[11]=y,p[15]=_,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ya().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,i=e.elements,s=1/cs.setFromMatrixColumn(e,0).length(),r=1/cs.setFromMatrixColumn(e,1).length(),o=1/cs.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,s=e.y,r=e.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let f=o*h,d=o*u,g=a*h,y=a*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=d+g*l,t[5]=f-y*l,t[9]=-a*c,t[2]=y-f*l,t[6]=g+d*l,t[10]=o*c}else if(e.order==="YXZ"){let f=c*h,d=c*u,g=l*h,y=l*u;t[0]=f+y*a,t[4]=g*a-d,t[8]=o*l,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=d*a-g,t[6]=y+f*a,t[10]=o*c}else if(e.order==="ZXY"){let f=c*h,d=c*u,g=l*h,y=l*u;t[0]=f-y*a,t[4]=-o*u,t[8]=g+d*a,t[1]=d+g*a,t[5]=o*h,t[9]=y-f*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let f=o*h,d=o*u,g=a*h,y=a*u;t[0]=c*h,t[4]=g*l-d,t[8]=f*l+y,t[1]=c*u,t[5]=y*l+f,t[9]=d*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let f=o*c,d=o*l,g=a*c,y=a*l;t[0]=c*h,t[4]=y-f*u,t[8]=g*u+d,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=d*u+g,t[10]=f-y*u}else if(e.order==="XZY"){let f=o*c,d=o*l,g=a*c,y=a*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=f*u+y,t[5]=o*h,t[9]=d*u-g,t[2]=g*u-d,t[6]=a*h,t[10]=y*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(um,e,dm)}lookAt(e,t,i){let s=this.elements;return hn.subVectors(e,t),hn.lengthSq()===0&&(hn.z=1),hn.normalize(),mi.crossVectors(i,hn),mi.lengthSq()===0&&(Math.abs(i.z)===1?hn.x+=1e-4:hn.z+=1e-4,hn.normalize(),mi.crossVectors(i,hn)),mi.normalize(),_o.crossVectors(hn,mi),s[0]=mi.x,s[4]=_o.x,s[8]=hn.x,s[1]=mi.y,s[5]=_o.y,s[9]=hn.y,s[2]=mi.z,s[6]=_o.z,s[10]=hn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],h=i[1],u=i[5],f=i[9],d=i[13],g=i[2],y=i[6],_=i[10],p=i[14],S=i[3],w=i[7],T=i[11],A=i[15],C=s[0],x=s[4],E=s[8],U=s[12],I=s[1],k=s[5],z=s[9],J=s[13],M=s[2],P=s[6],L=s[10],F=s[14],Y=s[3],q=s[7],$=s[11],ne=s[15];return r[0]=o*C+a*I+c*M+l*Y,r[4]=o*x+a*k+c*P+l*q,r[8]=o*E+a*z+c*L+l*$,r[12]=o*U+a*J+c*F+l*ne,r[1]=h*C+u*I+f*M+d*Y,r[5]=h*x+u*k+f*P+d*q,r[9]=h*E+u*z+f*L+d*$,r[13]=h*U+u*J+f*F+d*ne,r[2]=g*C+y*I+_*M+p*Y,r[6]=g*x+y*k+_*P+p*q,r[10]=g*E+y*z+_*L+p*$,r[14]=g*U+y*J+_*F+p*ne,r[3]=S*C+w*I+T*M+A*Y,r[7]=S*x+w*k+T*P+A*q,r[11]=S*E+w*z+T*L+A*$,r[15]=S*U+w*J+T*F+A*ne,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],u=e[6],f=e[10],d=e[14],g=e[3],y=e[7],_=e[11],p=e[15],S=c*d-l*f,w=a*d-l*u,T=a*f-c*u,A=o*d-l*h,C=o*f-c*h,x=o*u-a*h;return t*(y*S-_*w+p*T)-i*(g*S-_*A+p*C)+s*(g*w-y*A+p*x)-r*(g*T-y*C+_*x)}determinantAffine(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],o=e[5],a=e[9],c=e[2],l=e[6],h=e[10];return t*(o*h-a*l)-i*(r*h-a*c)+s*(r*l-o*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=e[9],f=e[10],d=e[11],g=e[12],y=e[13],_=e[14],p=e[15],S=t*a-i*o,w=t*c-s*o,T=t*l-r*o,A=i*c-s*a,C=i*l-r*a,x=s*l-r*c,E=h*y-u*g,U=h*_-f*g,I=h*p-d*g,k=u*_-f*y,z=u*p-d*y,J=f*p-d*_,M=S*J-w*z+T*k+A*I-C*U+x*E;if(M===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let P=1/M;return e[0]=(a*J-c*z+l*k)*P,e[1]=(s*z-i*J-r*k)*P,e[2]=(y*x-_*C+p*A)*P,e[3]=(f*C-u*x-d*A)*P,e[4]=(c*I-o*J-l*U)*P,e[5]=(t*J-s*I+r*U)*P,e[6]=(_*T-g*x-p*w)*P,e[7]=(h*x-f*T+d*w)*P,e[8]=(o*z-a*I+l*E)*P,e[9]=(i*I-t*z-r*E)*P,e[10]=(g*C-y*T+p*S)*P,e[11]=(u*T-h*C-d*S)*P,e[12]=(a*U-o*k-c*E)*P,e[13]=(t*k-i*U+s*E)*P,e[14]=(y*w-g*A-_*S)*P,e[15]=(h*A-u*w+f*S)*P,this}scale(e){let t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),s=Math.sin(t),r=1-i,o=e.x,a=e.y,c=e.z,l=r*o,h=r*a;return this.set(l*o+i,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+i,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,o){return this.set(1,i,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){let s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,h=o+o,u=a+a,f=r*l,d=r*h,g=r*u,y=o*h,_=o*u,p=a*u,S=c*l,w=c*h,T=c*u,A=i.x,C=i.y,x=i.z;return s[0]=(1-(y+p))*A,s[1]=(d+T)*A,s[2]=(g-w)*A,s[3]=0,s[4]=(d-T)*C,s[5]=(1-(f+p))*C,s[6]=(_+S)*C,s[7]=0,s[8]=(g+w)*x,s[9]=(_-S)*x,s[10]=(1-(f+y))*x,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let o=cs.set(s[0],s[1],s[2]).length(),a=cs.set(s[4],s[5],s[6]).length(),c=cs.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Tn.copy(this);let l=1/o,h=1/a,u=1/c;return Tn.elements[0]*=l,Tn.elements[1]*=l,Tn.elements[2]*=l,Tn.elements[4]*=h,Tn.elements[5]*=h,Tn.elements[6]*=h,Tn.elements[8]*=u,Tn.elements[9]*=u,Tn.elements[10]*=u,t.setFromRotationMatrix(Tn),i.x=o,i.y=a,i.z=c,this}makePerspective(e,t,i,s,r,o,a=Sn,c=!1){let l=this.elements,h=2*r/(t-e),u=2*r/(i-s),f=(t+e)/(t-e),d=(i+s)/(i-s),g,y;if(c)g=r/(o-r),y=o*r/(o-r);else if(a===Sn)g=-(o+r)/(o-r),y=-2*o*r/(o-r);else if(a===ws)g=-o/(o-r),y=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=y,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,s,r,o,a=Sn,c=!1){let l=this.elements,h=2/(t-e),u=2/(i-s),f=-(t+e)/(t-e),d=-(i+s)/(i-s),g,y;if(c)g=1/(o-r),y=o/(o-r);else if(a===Sn)g=-2/(o-r),y=-(o+r)/(o-r);else if(a===ws)g=-1/(o-r),y=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=u,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=g,l[14]=y,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};ya.prototype.isMatrix4=!0;var ut=ya,cs=new G,Tn=new ut,um=new G(0,0,0),dm=new G(1,1,1),mi=new G,_o=new G,hn=new G,ed=new ut,td=new zn,oi=class n{constructor(e=0,t=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(t){case"XYZ":this._y=Math.asin(et(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-et(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(et(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-et(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(et(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-et(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:Oe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return ed.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ed,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return td.setFromEuler(this),this.setFromQuaternion(td,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};oi.DEFAULT_ORDER="XYZ";var mr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},fm=0,nd=new G,ls=new zn,Kn=new ut,xo=new G,er=new G,pm=new G,mm=new zn,id=new G(1,0,0),sd=new G(0,1,0),rd=new G(0,0,1),od={type:"added"},gm={type:"removed"},hs={type:"childadded",child:null},tl={type:"childremoved",child:null},wt=class n extends Bn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:fm++}),this.uuid=$i(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new G,t=new oi,i=new zn,s=new G(1,1,1);function r(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ut},normalMatrix:{value:new Be}}),this.matrix=new ut,this.matrixWorld=new ut,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new mr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ls.setFromAxisAngle(e,t),this.quaternion.multiply(ls),this}rotateOnWorldAxis(e,t){return ls.setFromAxisAngle(e,t),this.quaternion.premultiply(ls),this}rotateX(e){return this.rotateOnAxis(id,e)}rotateY(e){return this.rotateOnAxis(sd,e)}rotateZ(e){return this.rotateOnAxis(rd,e)}translateOnAxis(e,t){return nd.copy(e).applyQuaternion(this.quaternion),this.position.add(nd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(id,e)}translateY(e){return this.translateOnAxis(sd,e)}translateZ(e){return this.translateOnAxis(rd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Kn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?xo.copy(e):xo.set(e,t,i);let s=this.parent;this.updateWorldMatrix(!0,!1),er.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Kn.lookAt(er,xo,this.up):Kn.lookAt(xo,er,this.up),this.quaternion.setFromRotationMatrix(Kn),s&&(Kn.extractRotation(s.matrixWorld),ls.setFromRotationMatrix(Kn),this.quaternion.premultiply(ls.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Fe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(od),hs.child=e,this.dispatchEvent(hs),hs.child=null):Fe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(gm),tl.child=e,this.dispatchEvent(tl),tl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Kn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Kn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Kn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(od),hs.child=e,this.dispatchEvent(hs),hs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){let o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(er,e,pm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(er,mm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,i)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){let a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),u=o(e.shapes),f=o(e.skeletons),d=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),f.length>0&&(i.skeletons=f),d.length>0&&(i.animations=d),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let s=e.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};wt.DEFAULT_UP=new G(0,1,0);wt.DEFAULT_MATRIX_AUTO_UPDATE=!0;wt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var bn=class extends wt{constructor(){super(),this.isGroup=!0,this.type="Group"}},_m={type:"move"},Ps=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new bn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new bn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new G,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new G),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new bn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new G,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new G,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let y of e.hand.values()){let _=t.getJointPose(y,i),p=this._getHandJoint(l,y);_!==null&&(p.matrix.fromArray(_.transform.matrix),p.matrix.decompose(p.position,p.quaternion,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=_.radius),p.visible=_!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,g=.005;l.inputState.pinching&&f>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.quaternion,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.quaternion,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(_m)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new bn;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},hf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},gi={h:0,s:0,l:0},yo={h:0,s:0,l:0};function nl(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var Ve=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=bt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Qe.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=Qe.workingColorSpace){return this.r=e,this.g=t,this.b=i,Qe.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=Qe.workingColorSpace){if(e=am(e,1),t=et(t,0,1),i=et(i,0,1),t===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+t):i+t-i*t,o=2*i-r;this.r=nl(o,r,e+1/3),this.g=nl(o,r,e),this.b=nl(o,r,e-1/3)}return Qe.colorSpaceToWorking(this,s),this}setStyle(e,t=bt){function i(r){r!==void 0&&parseFloat(r)<1&&Oe("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,t);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Oe("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);Oe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=bt){let i=hf[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Oe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=si(e.r),this.g=si(e.g),this.b=si(e.b),this}copyLinearToSRGB(e){return this.r=Ts(e.r),this.g=Ts(e.g),this.b=Ts(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=bt){return Qe.workingToColorSpace(Jt.copy(this),e),Math.round(et(Jt.r*255,0,255))*65536+Math.round(et(Jt.g*255,0,255))*256+Math.round(et(Jt.b*255,0,255))}getHexString(e=bt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Qe.workingColorSpace){Qe.workingToColorSpace(Jt.copy(this),t);let i=Jt.r,s=Jt.g,r=Jt.b,o=Math.max(i,s,r),a=Math.min(i,s,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case i:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-i)/u+2;break;case r:c=(i-s)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Qe.workingColorSpace){return Qe.workingToColorSpace(Jt.copy(this),t),e.r=Jt.r,e.g=Jt.g,e.b=Jt.b,e}getStyle(e=bt){Qe.workingToColorSpace(Jt.copy(this),e);let t=Jt.r,i=Jt.g,s=Jt.b;return e!==bt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(gi),this.setHSL(gi.h+e,gi.s+t,gi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(gi),e.getHSL(yo);let i=$c(gi.h,yo.h,t),s=$c(gi.s,yo.s,t),r=$c(gi.l,yo.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Jt=new Ve;Ve.NAMES=hf;var gr=class n{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ve(e),this.density=t}clone(){return new n(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var _r=class extends wt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new oi,this.environmentIntensity=1,this.environmentRotation=new oi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},En=new G,Qn=new G,il=new G,ei=new G,us=new G,ds=new G,ad=new G,sl=new G,rl=new G,ol=new G,al=new mt,cl=new mt,ll=new mt,ii=class n{constructor(e=new G,t=new G,i=new G){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),En.subVectors(e,t),s.cross(En);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){En.subVectors(s,t),Qn.subVectors(i,t),il.subVectors(e,t);let o=En.dot(En),a=En.dot(Qn),c=En.dot(il),l=Qn.dot(Qn),h=Qn.dot(il),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;let f=1/u,d=(l*c-a*h)*f,g=(o*h-a*c)*f;return r.set(1-d-g,g,d)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,ei)===null?!1:ei.x>=0&&ei.y>=0&&ei.x+ei.y<=1}static getInterpolation(e,t,i,s,r,o,a,c){return this.getBarycoord(e,t,i,s,ei)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,ei.x),c.addScaledVector(o,ei.y),c.addScaledVector(a,ei.z),c)}static getInterpolatedAttribute(e,t,i,s,r,o){return al.setScalar(0),cl.setScalar(0),ll.setScalar(0),al.fromBufferAttribute(e,t),cl.fromBufferAttribute(e,i),ll.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(al,r.x),o.addScaledVector(cl,r.y),o.addScaledVector(ll,r.z),o}static isFrontFacing(e,t,i,s){return En.subVectors(i,t),Qn.subVectors(e,t),En.cross(Qn).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return En.subVectors(this.c,this.b),Qn.subVectors(this.a,this.b),En.cross(Qn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return n.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,s=this.b,r=this.c,o,a;us.subVectors(s,i),ds.subVectors(r,i),sl.subVectors(e,i);let c=us.dot(sl),l=ds.dot(sl);if(c<=0&&l<=0)return t.copy(i);rl.subVectors(e,s);let h=us.dot(rl),u=ds.dot(rl);if(h>=0&&u<=h)return t.copy(s);let f=c*u-h*l;if(f<=0&&c>=0&&h<=0&&c-h>0)return o=c/(c-h),t.copy(i).addScaledVector(us,o);ol.subVectors(e,r);let d=us.dot(ol),g=ds.dot(ol);if(g>=0&&d<=g)return t.copy(r);let y=d*l-c*g;if(y<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(i).addScaledVector(ds,a);let _=h*g-d*u;if(_<=0&&u-h>=0&&d-g>=0)return ad.subVectors(r,s),a=(u-h)/(u-h+(d-g)),t.copy(s).addScaledVector(ad,a);let p=1/(_+y+f);return o=y*p,a=f*p,t.copy(i).addScaledVector(us,o).addScaledVector(ds,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},vi=class{constructor(e=new G(1/0,1/0,1/0),t=new G(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(An.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(An.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=An.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,An):An.fromBufferAttribute(r,o),An.applyMatrix4(e.matrixWorld),this.expandByPoint(An);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),vo.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),vo.copy(i.boundingBox)),vo.applyMatrix4(e.matrixWorld),this.union(vo)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,An),An.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(tr),So.subVectors(this.max,tr),fs.subVectors(e.a,tr),ps.subVectors(e.b,tr),ms.subVectors(e.c,tr),_i.subVectors(ps,fs),xi.subVectors(ms,ps),Oi.subVectors(fs,ms);let t=[0,-_i.z,_i.y,0,-xi.z,xi.y,0,-Oi.z,Oi.y,_i.z,0,-_i.x,xi.z,0,-xi.x,Oi.z,0,-Oi.x,-_i.y,_i.x,0,-xi.y,xi.x,0,-Oi.y,Oi.x,0];return!hl(t,fs,ps,ms,So)||(t=[1,0,0,0,1,0,0,0,1],!hl(t,fs,ps,ms,So))?!1:(bo.crossVectors(_i,xi),t=[bo.x,bo.y,bo.z],hl(t,fs,ps,ms,So))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,An).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(An).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ti[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ti[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ti[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ti[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ti[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ti[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ti[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ti[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ti),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},ti=[new G,new G,new G,new G,new G,new G,new G,new G],An=new G,vo=new vi,fs=new G,ps=new G,ms=new G,_i=new G,xi=new G,Oi=new G,tr=new G,So=new G,bo=new G,Fi=new G;function hl(n,e,t,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){Fi.fromArray(n,r);let a=s.x*Math.abs(Fi.x)+s.y*Math.abs(Fi.y)+s.z*Math.abs(Fi.z),c=e.dot(Fi),l=t.dot(Fi),h=i.dot(Fi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var At=new G,Mo=new ke,xm=0,zt=class extends Bn{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:xm++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=jl,this.updateRanges=[],this.gpuType=In,this.version=0,this._normalizationScale=e!==void 0?ac(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Mo.fromBufferAttribute(this,t),Mo.applyMatrix3(e),this.setXY(t,Mo.x,Mo.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.applyMatrix3(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.applyMatrix4(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.applyNormalMatrix(e),this.setXYZ(t,At.x,At.y,At.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.transformDirection(e),this.setXYZ(t,At.x,At.y,At.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=this._denormalize(i)),i}setComponent(e,t,i){return this.normalized&&(i=this._normalize(i)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),i=this._normalize(i)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),i=this._normalize(i),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),i=this._normalize(i),s=this._normalize(s),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):cf(e,this.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):lf(e,this.array)}};var xr=class extends zt{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var yr=class extends zt{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var at=class extends zt{constructor(e,t,i){super(new Float32Array(e),t,i)}},ym=new vi,nr=new G,ul=new G,zi=class{constructor(e=new G,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):ym.setFromPoints(e).getCenter(i);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;nr.subVectors(e,this.center);let t=nr.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(nr,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ul.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(nr.copy(e.center).add(ul)),this.expandByPoint(nr.copy(e.center).sub(ul))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},vm=0,vn=new ut,dl=new wt,gs=new G,un=new vi,ir=new vi,Bt=new G,Ct=class n extends Bn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:vm++}),this.uuid=$i(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(rm(e)?yr:xr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new Be().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return vn.makeRotationFromQuaternion(e),this.applyMatrix4(vn),this}rotateX(e){return vn.makeRotationX(e),this.applyMatrix4(vn),this}rotateY(e){return vn.makeRotationY(e),this.applyMatrix4(vn),this}rotateZ(e){return vn.makeRotationZ(e),this.applyMatrix4(vn),this}translate(e,t,i){return vn.makeTranslation(e,t,i),this.applyMatrix4(vn),this}scale(e,t,i){return vn.makeScale(e,t,i),this.applyMatrix4(vn),this}lookAt(e){return dl.lookAt(e),dl.updateMatrix(),this.applyMatrix4(dl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(gs).negate(),this.translate(gs.x,gs.y,gs.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new at(i,3))}else{let i=Math.min(e.length,t.count);for(let s=0;s<i;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Oe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new vi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Fe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new G(-1/0,-1/0,-1/0),new G(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){let r=t[i];un.setFromBufferAttribute(r),this.morphTargetsRelative?(Bt.addVectors(this.boundingBox.min,un.min),this.boundingBox.expandByPoint(Bt),Bt.addVectors(this.boundingBox.max,un.max),this.boundingBox.expandByPoint(Bt)):(this.boundingBox.expandByPoint(un.min),this.boundingBox.expandByPoint(un.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Fe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new zi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Fe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new G,1/0);return}if(e){let i=this.boundingSphere.center;if(un.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];ir.setFromBufferAttribute(a),this.morphTargetsRelative?(Bt.addVectors(un.min,ir.min),un.expandByPoint(Bt),Bt.addVectors(un.max,ir.max),un.expandByPoint(Bt)):(un.expandByPoint(ir.min),un.expandByPoint(ir.max))}un.getCenter(i);let s=0;for(let r=0,o=e.count;r<o;r++)Bt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Bt));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Bt.fromBufferAttribute(a,l),c&&(gs.fromBufferAttribute(e,l),Bt.add(gs)),s=Math.max(s,i.distanceToSquared(Bt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Fe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Fe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,s=t.normal,r=t.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==i.count)&&(o=new zt(new Float32Array(4*i.count),4),this.setAttribute("tangent",o));let a=[],c=[],l=new Uint8Array(i.count);for(let U=0;U<i.count;U++)a[U]=new G,c[U]=new G;let h=new G,u=new G,f=new G,d=new ke,g=new ke,y=new ke,_=new G,p=new G;function S(U,I,k){l[U]=l[I]=l[k]=1,h.fromBufferAttribute(i,U),u.fromBufferAttribute(i,I),f.fromBufferAttribute(i,k),d.fromBufferAttribute(r,U),g.fromBufferAttribute(r,I),y.fromBufferAttribute(r,k),u.sub(h),f.sub(h),g.sub(d),y.sub(d);let z=1/(g.x*y.y-y.x*g.y);isFinite(z)&&(_.copy(u).multiplyScalar(y.y).addScaledVector(f,-g.y).multiplyScalar(z),p.copy(f).multiplyScalar(g.x).addScaledVector(u,-y.x).multiplyScalar(z),a[U].add(_),a[I].add(_),a[k].add(_),c[U].add(p),c[I].add(p),c[k].add(p))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let U=0,I=w.length;U<I;++U){let k=w[U],z=k.start,J=k.count;for(let M=z,P=z+J;M<P;M+=3)S(e.getX(M+0),e.getX(M+1),e.getX(M+2))}let T=new G,A=new G,C=new G,x=new G;function E(U){C.fromBufferAttribute(s,U),x.copy(C);let I=a[U];T.copy(I),T.sub(C.multiplyScalar(C.dot(I))).normalize(),A.crossVectors(x,I);let z=A.dot(c[U])<0?-1:1;o.setXYZW(U,T.x,T.y,T.z,z)}for(let U=0,I=i.count;U<I;++U)l[U]&&E(U);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new zt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,d=i.count;f<d;f++)i.setXYZ(f,0,0,0);let s=new G,r=new G,o=new G,a=new G,c=new G,l=new G,h=new G,u=new G;if(e)for(let f=0,d=e.count;f<d;f+=3){let g=e.getX(f+0),y=e.getX(f+1),_=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,y),o.fromBufferAttribute(t,_),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(i,g),c.fromBufferAttribute(i,y),l.fromBufferAttribute(i,_),a.add(h),c.add(h),l.add(h),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(y,c.x,c.y,c.z),i.setXYZ(_,l.x,l.y,l.z)}else for(let f=0,d=t.count;f<d;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),i.setXYZ(f+0,h.x,h.y,h.z),i.setXYZ(f+1,h.x,h.y,h.z),i.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Bt.fromBufferAttribute(e,t),Bt.normalize(),e.setXYZ(t,Bt.x,Bt.y,Bt.z)}toNonIndexed(){function e(a,c){let l=a.array,h=a.itemSize,u=a.normalized,f=new l.constructor(c.length*h),d=0,g=0;for(let y=0,_=c.length;y<_;y++){a.isInterleavedBufferAttribute?d=c[y]*a.data.stride+a.offset:d=c[y]*h;for(let p=0;p<h;p++)f[g++]=l[d++]}return new zt(f,h,u)}if(this.index===null)return Oe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=e(c,i);t.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){let f=l[h],d=e(f,i);c.push(d)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let c in i){let l=i[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){let d=l[u];h.push(d.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let s=e.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],u=r[l];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,h=o.length;l<h;l++){let u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},vr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=jl,this.updateRanges=[],this.version=0,this.uuid=$i()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=cd(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=this.array.slice(0).buffer);let i=new this.array.constructor(e.arrayBuffers[t]),s=new this.constructor(i,this.stride);return s.setUsage(this.usage),s}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=cd(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=Array.from(new Uint32Array(this.array.slice(0).buffer)));let i={uuid:this.uuid,buffer:t,type:this.array.constructor.name,stride:this.stride};return i.usage=this.usage,i}};function cd(n){return n.buffer._uuid===void 0&&(n.buffer._uuid=$i()),n.byteOffset===0&&n.byteLength===n.buffer.byteLength?n.buffer._uuid:n.buffer._uuid+":"+n.byteOffset+":"+n.byteLength}var tn=new G,Is=class n{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s,this._normalizationScale=e!==void 0?ac(e.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)tn.fromBufferAttribute(this,t),tn.applyMatrix4(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)tn.fromBufferAttribute(this,t),tn.applyNormalMatrix(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)tn.fromBufferAttribute(this,t),tn.transformDirection(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=this._denormalize(i)),i}setComponent(e,t,i){return this.normalized&&(i=this._normalize(i)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=this._denormalize(t)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=this._denormalize(t)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=this._denormalize(t)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=this._denormalize(t)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),i=this._normalize(i)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),i=this._normalize(i),s=this._normalize(s)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),i=this._normalize(i),s=this._normalize(s),r=this._normalize(r)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){dr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new zt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new n(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){dr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):cf(e,this.data.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):lf(e,this.data.array)}},fl=new G,Sm=new G,bm=new Be,wn=class{constructor(e=new G(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let s=fl.subVectors(i,t).cross(Sm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let s=e.delta(fl),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(s,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||bm.getNormalMatrix(e),s=this.coplanarPoint(fl).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Mm=0,Gn=class extends Bn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Mm++}),this.uuid=$i(),this.name="",this.type="Material",this.blending=Fs,this.side=wi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Il,this.blendDst=Ll,this.blendEquation=Yi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ve(0,0,0),this.blendAlpha=0,this.depthFunc=Es,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=$d,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Vo,this.stencilZFail=Vo,this.stencilZPass=Vo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){Oe(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Oe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(i.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(i.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(i.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(i.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ve().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new wn().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new ke().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ke().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Si=class extends Gn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ve(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},_s,sr=new G,xs=new G,ys=new G,vs=new ke,rr=new ke,uf=new ut,To=new G,or=new G,Eo=new G,ld=new ke,pl=new ke,hd=new ke,Gi=class extends wt{constructor(e=new Si){if(super(),this.isSprite=!0,this.type="Sprite",_s===void 0){_s=new Ct;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new vr(t,5);_s.setIndex([0,1,2,0,2,3]),_s.setAttribute("position",new Is(i,3,0,!1)),_s.setAttribute("uv",new Is(i,2,3,!1))}this.geometry=_s,this.material=e,this.center=new ke(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&Fe('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),xs.setFromMatrixScale(this.matrixWorld),uf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ys.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&xs.multiplyScalar(-ys.z);let i=this.material.rotation,s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));let o=this.center;Ao(To.set(-.5,-.5,0),ys,o,xs,s,r),Ao(or.set(.5,-.5,0),ys,o,xs,s,r),Ao(Eo.set(.5,.5,0),ys,o,xs,s,r),ld.set(0,0),pl.set(1,0),hd.set(1,1);let a=e.ray.intersectTriangle(To,or,Eo,!1,sr);if(a===null&&(Ao(or.set(-.5,.5,0),ys,o,xs,s,r),pl.set(0,1),a=e.ray.intersectTriangle(To,Eo,or,!1,sr),a===null))return;let c=e.ray.origin.distanceTo(sr);c<e.near||c>e.far||t.push({distance:c,point:sr.clone(),uv:ii.getInterpolation(sr,To,or,Eo,ld,pl,hd,new ke),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}toJSON(e){let t=super.toJSON(e);return t.object.center=this.center.toArray(),t}};function Ao(n,e,t,i,s,r){vs.subVectors(n,t).addScalar(.5).multiply(i),s!==void 0?(rr.x=r*vs.x-s*vs.y,rr.y=s*vs.x+r*vs.y):rr.copy(vs),n.copy(e),n.x+=rr.x,n.y+=rr.y,n.applyMatrix4(uf)}var ni=new G,ml=new G,wo=new G,Co=new G,Sr=class{constructor(e=new G,t=new G(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ni)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ni.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ni.copy(this.origin).addScaledVector(this.direction,t),ni.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){ml.copy(e).add(t).multiplyScalar(.5),wo.copy(t).sub(e).normalize(),Co.copy(this.origin).sub(ml);let r=e.distanceTo(t)*.5,o=-this.direction.dot(wo),a=Co.dot(this.direction),c=-Co.dot(wo),l=Co.lengthSq(),h=Math.abs(1-o*o),u,f,d,g;if(h>0)if(u=o*c-a,f=o*a-c,g=r*h,u>=0)if(f>=-g)if(f<=g){let y=1/h;u*=y,f*=y,d=u*(u+o*f+2*a)+f*(o*u+f+2*c)+l}else f=r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f<=-g?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l):f<=g?(u=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(ml).addScaledVector(wo,f),d}intersectSphere(e,t){if(e.radius<0)return null;ni.subVectors(e.center,this.origin);let i=ni.dot(this.direction),s=ni.dot(ni)-i*i,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(i=(e.min.x-f.x)*l,s=(e.max.x-f.x)*l):(i=(e.max.x-f.x)*l,s=(e.min.x-f.x)*l),h>=0?(r=(e.min.y-f.y)*h,o=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,o=(e.min.y-f.y)*h),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-f.z)*u,c=(e.max.z-f.z)*u):(a=(e.max.z-f.z)*u,c=(e.min.z-f.z)*u),i>c||a>s)||((a>i||i!==i)&&(i=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,ni)!==null}intersectTriangle(e,t,i,s,r){let o=this.origin,a=this.direction,c=a.x,l=a.y,h=a.z,u=e.x-o.x,f=e.y-o.y,d=e.z-o.z,g=t.x-o.x,y=t.y-o.y,_=t.z-o.z,p=i.x-o.x,S=i.y-o.y,w=i.z-o.z,T=Math.abs(c),A=Math.abs(l),C=Math.abs(h),x,E,U,I,k,z,J,M,P,L,F,Y;if(T>=A&&T>=C?(U=c,z=u,P=g,Y=p,c>=0?(x=l,E=h,I=f,k=d,J=y,M=_,L=S,F=w):(x=h,E=l,I=d,k=f,J=_,M=y,L=w,F=S)):A>=C?(U=l,z=f,P=y,Y=S,l>=0?(x=h,E=c,I=d,k=u,J=_,M=g,L=w,F=p):(x=c,E=h,I=u,k=d,J=g,M=_,L=p,F=w)):(U=h,z=d,P=_,Y=w,h>=0?(x=c,E=l,I=u,k=f,J=g,M=y,L=p,F=S):(x=l,E=c,I=f,k=u,J=y,M=g,L=S,F=p)),U===0)return null;let q=x/U,$=E/U,ne=1/U,xe=I-q*z,Ce=k-$*z,j=J-q*P,ae=M-$*P,ye=L-q*Y,Ie=F-$*Y,ue=ye*ae-Ie*j,Xe=xe*Ie-Ce*ye,Tt=j*Ce-ae*xe;if(s){if(ue<0||Xe<0||Tt<0)return null}else if((ue<0||Xe<0||Tt<0)&&(ue>0||Xe>0||Tt>0))return null;let Ue=ue+Xe+Tt;if(Ue===0)return null;let rt=ne*(ue*z+Xe*P+Tt*Y);return(Ue>0?rt<0:rt>0)?null:this.at(rt/Ue,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},$t=class extends Gn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ve(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new oi,this.combine=va,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},ud=new ut,ki=new Sr,Ro=new zi,dd=new G,Po=new G,Io=new G,Lo=new G,gl=new G,Do=new G,fd=new G,No=new G,st=class extends wt{constructor(e=new Ct,t=new $t){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(s,e);let a=this.morphTargetInfluences;if(r&&a){Do.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],u=r[c];h!==0&&(gl.fromBufferAttribute(u,e),o?Do.addScaledVector(gl,h):Do.addScaledVector(gl.sub(t),h))}t.add(Do)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ro.copy(i.boundingSphere),Ro.applyMatrix4(r),ki.copy(e.ray).recast(e.near),!(Ro.containsPoint(ki.origin)===!1&&(ki.intersectSphere(Ro,dd)===null||ki.origin.distanceToSquared(dd)>(e.far-e.near)**2))&&(ud.copy(r).invert(),ki.copy(e.ray).applyMatrix4(ud),!(i.boundingBox!==null&&ki.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,ki)))}_computeIntersections(e,t,i){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,y=f.length;g<y;g++){let _=f[g],p=o[_.materialIndex],S=Math.max(_.start,d.start),w=Math.min(a.count,Math.min(_.start+_.count,d.start+d.count));for(let T=S,A=w;T<A;T+=3){let C=a.getX(T),x=a.getX(T+1),E=a.getX(T+2);s=Uo(this,p,e,i,l,h,u,C,x,E),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=_.materialIndex,t.push(s))}}else{let g=Math.max(0,d.start),y=Math.min(a.count,d.start+d.count);for(let _=g,p=y;_<p;_+=3){let S=a.getX(_),w=a.getX(_+1),T=a.getX(_+2);s=Uo(this,o,e,i,l,h,u,S,w,T),s&&(s.faceIndex=Math.floor(_/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,y=f.length;g<y;g++){let _=f[g],p=o[_.materialIndex],S=Math.max(_.start,d.start),w=Math.min(c.count,Math.min(_.start+_.count,d.start+d.count));for(let T=S,A=w;T<A;T+=3){let C=T,x=T+1,E=T+2;s=Uo(this,p,e,i,l,h,u,C,x,E),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=_.materialIndex,t.push(s))}}else{let g=Math.max(0,d.start),y=Math.min(c.count,d.start+d.count);for(let _=g,p=y;_<p;_+=3){let S=_,w=_+1,T=_+2;s=Uo(this,o,e,i,l,h,u,S,w,T),s&&(s.faceIndex=Math.floor(_/3),t.push(s))}}}};function Tm(n,e,t,i,s,r,o,a){let c;if(e.side===rn?c=i.intersectTriangle(o,r,s,!0,a):c=i.intersectTriangle(s,r,o,e.side===wi,a),c===null)return null;No.copy(a),No.applyMatrix4(n.matrixWorld);let l=t.ray.origin.distanceTo(No);return l<t.near||l>t.far?null:{distance:l,point:No.clone(),object:n}}function Uo(n,e,t,i,s,r,o,a,c,l){n.getVertexPosition(a,Po),n.getVertexPosition(c,Io),n.getVertexPosition(l,Lo);let h=Tm(n,e,t,i,Po,Io,Lo,fd);if(h){let u=new G;ii.getBarycoord(fd,Po,Io,Lo,u),s&&(h.uv=ii.getInterpolatedAttribute(s,a,c,l,u,new ke)),r&&(h.uv1=ii.getInterpolatedAttribute(r,a,c,l,u,new ke)),o&&(h.normal=ii.getInterpolatedAttribute(o,a,c,l,u,new G),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let f={a,b:c,c:l,normal:new G,materialIndex:0};ii.getNormal(Po,Io,Lo,f.normal),h.face=f,h.barycoord=u}return h}var na=class extends sn{constructor(e=null,t=1,i=1,s,r,o,a,c,l=Gt,h=Gt,u,f){super(null,o,a,c,l,h,s,r,u,f),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Bi=new zi,Em=new ke(.5,.5),Oo=new G,bi=class{constructor(e=new wn,t=new wn,i=new wn,s=new wn,r=new wn,o=new wn){this.planes=[e,t,i,s,r,o]}set(e,t,i,s,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Sn,i=!1){let s=this.planes,r=e.elements,o=r[0],a=r[1],c=r[2],l=r[3],h=r[4],u=r[5],f=r[6],d=r[7],g=r[8],y=r[9],_=r[10],p=r[11],S=r[12],w=r[13],T=r[14],A=r[15];if(s[0].setComponents(l-o,d-h,p-g,A-S).normalize(),s[1].setComponents(l+o,d+h,p+g,A+S).normalize(),s[2].setComponents(l+a,d+u,p+y,A+w).normalize(),s[3].setComponents(l-a,d-u,p-y,A-w).normalize(),i)s[4].setComponents(c,f,_,T).normalize(),s[5].setComponents(l-c,d-f,p-_,A-T).normalize();else if(s[4].setComponents(l-c,d-f,p-_,A-T).normalize(),t===Sn)s[5].setComponents(l+c,d+f,p+_,A+T).normalize();else if(t===ws)s[5].setComponents(c,f,_,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Bi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Bi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Bi)}intersectsSprite(e){Bi.center.set(0,0,0);let t=Em.distanceTo(e.center);return Bi.radius=.7071067811865476+t,Bi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Bi)}intersectsSphere(e){let t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let s=t[i];if(Oo.x=s.normal.x>0?e.max.x:e.min.x,Oo.y=s.normal.y>0?e.max.y:e.min.y,Oo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Oo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},pd=new ut,ia=class n{constructor(){this.coordinateSystem=Sn,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,i=this._frustums;for(let s=0;s<t.length;s++){let r=t[s];pd.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),i[s]===void 0&&(i[s]=new bi),i[s].setFromProjectionMatrix(pd,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,i=e._frustums;for(let s=0;s<e._count;s++)t[s]===void 0&&(t[s]=new bi),t[s].copy(i[s]);return this._count=e._count,this}clone(){return new n().copy(this)}};var Hi=class extends Gn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ve(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},md=new ut,bl=new Sr,Fo=new zi,ko=new G,Ls=class extends wt{constructor(e=new Ct,t=new Hi){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Fo.copy(i.boundingSphere),Fo.applyMatrix4(s),Fo.radius+=r,e.ray.intersectsSphere(Fo)===!1)return;md.copy(s).invert(),bl.copy(e.ray).applyMatrix4(md);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=i.index,u=i.attributes.position;if(l!==null){let f=Math.max(0,o.start),d=Math.min(l.count,o.start+o.count);for(let g=f,y=d;g<y;g++){let _=l.getX(g);ko.fromBufferAttribute(u,_),gd(ko,_,c,s,e,t,this)}}else{let f=Math.max(0,o.start),d=Math.min(u.count,o.start+o.count);for(let g=f,y=d;g<y;g++)ko.fromBufferAttribute(u,g),gd(ko,g,c,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function gd(n,e,t,i,s,r,o){let a=bl.distanceSqToPoint(n);if(a<t){let c=new G;bl.closestPointToPoint(n,c),c.applyMatrix4(i);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var br=class extends sn{constructor(e=[],t=Zi,i,s,r,o,a,c,l,h){super(e,t,i,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Cn=class extends sn{constructor(e,t,i,s,r,o,a,c,l){super(e,t,i,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var ai=class extends sn{constructor(e,t,i=Pn,s,r,o,a=Gt,c=Gt,l,h=ri,u=1){if(h!==ri&&h!==hi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:e,height:t,depth:u};super(f,s,r,o,a,c,h,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Rs(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Mr=class extends ai{constructor(e,t=Pn,i=Zi,s,r,o=Gt,a=Gt,c,l=ri){let h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,i,s,r,o,a,c,l),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Tr=class extends sn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},fn=class n extends Ct{constructor(e=1,t=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],u=[],f=0,d=0;g("z","y","x",-1,-1,i,t,e,o,r,0),g("z","y","x",1,-1,i,t,-e,o,r,1),g("x","z","y",1,1,e,i,t,s,o,2),g("x","z","y",1,-1,e,i,-t,s,o,3),g("x","y","z",1,-1,e,t,i,s,r,4),g("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new at(l,3)),this.setAttribute("normal",new at(h,3)),this.setAttribute("uv",new at(u,2));function g(y,_,p,S,w,T,A,C,x,E,U){let I=T/x,k=A/E,z=T/2,J=A/2,M=C/2,P=x+1,L=E+1,F=0,Y=0,q=new G;for(let $=0;$<L;$++){let ne=$*k-J;for(let xe=0;xe<P;xe++){let Ce=xe*I-z;q[y]=Ce*S,q[_]=ne*w,q[p]=M,l.push(q.x,q.y,q.z),q[y]=0,q[_]=0,q[p]=C>0?1:-1,h.push(q.x,q.y,q.z),u.push(xe/x),u.push(1-$/E),F+=1}}for(let $=0;$<E;$++)for(let ne=0;ne<x;ne++){let xe=f+ne+P*$,Ce=f+ne+P*($+1),j=f+(ne+1)+P*($+1),ae=f+(ne+1)+P*$;c.push(xe,Ce,ae),c.push(Ce,j,ae),Y+=6}a.addGroup(d,Y,U),d+=Y,f+=F}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}},Hn=class n extends Ct{constructor(e=1,t=1,i=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:i,radialSegments:s,heightSegments:r},t=Math.max(0,t),i=Math.max(1,Math.floor(i)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));let o=[],a=[],c=[],l=[],h=t/2,u=Math.PI/2*e,f=t,d=2*u+f,g=i*2+r,y=s+1,_=new G,p=new G;for(let S=0;S<=g;S++){let w=0,T=0,A=0,C=0;if(S<=i){let U=S/i,I=U*Math.PI/2;T=-h-e*Math.cos(I),A=e*Math.sin(I),C=-e*Math.cos(I),w=U*u}else if(S<=i+r){let U=(S-i)/r;T=-h+U*t,A=e,C=0,w=u+U*f}else{let U=(S-i-r)/i,I=U*Math.PI/2;T=h+e*Math.sin(I),A=e*Math.cos(I),C=e*Math.sin(I),w=u+f+U*u}let x=Math.max(0,Math.min(1,w/d)),E=0;S===0?E=.5/s:S===g&&(E=-.5/s);for(let U=0;U<=s;U++){let I=U/s,k=I*Math.PI*2,z=Math.sin(k),J=Math.cos(k);p.x=-A*J,p.y=T,p.z=A*z,a.push(p.x,p.y,p.z),_.set(-A*J,C,A*z),_.normalize(),c.push(_.x,_.y,_.z),l.push(I+E,x)}if(S>0){let U=(S-1)*y;for(let I=0;I<s;I++){let k=U+I,z=U+I+1,J=S*y+I,M=S*y+I+1;o.push(k,z,J),o.push(z,M,J)}}}this.setIndex(o),this.setAttribute("position",new at(a,3)),this.setAttribute("normal",new at(c,3)),this.setAttribute("uv",new at(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},Er=class n extends Ct{constructor(e=1,t=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:s},t=Math.max(3,t);let r=[],o=[],a=[],c=[],l=new G,h=new ke;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,f=3;u<=t;u++,f+=3){let d=i+u/t*s;l.x=e*Math.cos(d),l.y=e*Math.sin(d),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[f]/e+1)/2,h.y=(o[f+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new at(o,3)),this.setAttribute("normal",new at(a,3)),this.setAttribute("uv",new at(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Vn=class n extends Ct{constructor(e=1,t=1,i=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],f=[],d=[],g=0,y=[],_=i/2,p=0;S(),o===!1&&(e>0&&w(!0),t>0&&w(!1)),this.setIndex(h),this.setAttribute("position",new at(u,3)),this.setAttribute("normal",new at(f,3)),this.setAttribute("uv",new at(d,2));function S(){let T=new G,A=new G,C=0,x=(t-e)/i;for(let E=0;E<=r;E++){let U=[],I=E/r,k=I*(t-e)+e;for(let z=0;z<=s;z++){let J=z/s,M=J*c+a,P=Math.sin(M),L=Math.cos(M);A.x=k*P,A.y=-I*i+_,A.z=k*L,u.push(A.x,A.y,A.z),T.set(P,x,L).normalize(),f.push(T.x,T.y,T.z),d.push(J,1-I),U.push(g++)}y.push(U)}for(let E=0;E<s;E++)for(let U=0;U<r;U++){let I=y[U][E],k=y[U+1][E],z=y[U+1][E+1],J=y[U][E+1];(e>0||U!==0)&&(h.push(I,k,J),C+=3),(t>0||U!==r-1)&&(h.push(k,z,J),C+=3)}l.addGroup(p,C,0),p+=C}function w(T){let A=g,C=new ke,x=new G,E=0,U=T===!0?e:t,I=T===!0?1:-1;for(let z=1;z<=s;z++)u.push(0,_*I,0),f.push(0,I,0),d.push(.5,.5),g++;let k=g;for(let z=0;z<=s;z++){let M=z/s*c+a,P=Math.cos(M),L=Math.sin(M);x.x=U*L,x.y=_*I,x.z=U*P,u.push(x.x,x.y,x.z),f.push(0,I,0),C.x=P*.5+.5,C.y=L*.5*I+.5,d.push(C.x,C.y),g++}for(let z=0;z<s;z++){let J=A+z,M=k+z;T===!0?h.push(M,M+1,J):h.push(M+1,M,J),E+=3}l.addGroup(p,E,T===!0?1:2),p+=E}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Ar=class n extends Vn{constructor(e=1,t=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,i,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new n(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},sa=class n extends Ct{constructor(e=[],t=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:s};let r=[],o=[];a(s),l(i),h(),this.setAttribute("position",new at(r,3)),this.setAttribute("normal",new at(r.slice(),3)),this.setAttribute("uv",new at(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(S){let w=new G,T=new G,A=new G;for(let C=0;C<t.length;C+=3)d(t[C+0],w),d(t[C+1],T),d(t[C+2],A),c(w,T,A,S)}function c(S,w,T,A){let C=A+1,x=[];for(let E=0;E<=C;E++){x[E]=[];let U=S.clone().lerp(T,E/C),I=w.clone().lerp(T,E/C),k=C-E;for(let z=0;z<=k;z++)z===0&&E===C?x[E][z]=U:x[E][z]=U.clone().lerp(I,z/k)}for(let E=0;E<C;E++)for(let U=0;U<2*(C-E)-1;U++){let I=Math.floor(U/2);U%2===0?(f(x[E][I+1]),f(x[E+1][I]),f(x[E][I])):(f(x[E][I+1]),f(x[E+1][I+1]),f(x[E+1][I]))}}function l(S){let w=new G;for(let T=0;T<r.length;T+=3)w.x=r[T+0],w.y=r[T+1],w.z=r[T+2],w.normalize().multiplyScalar(S),r[T+0]=w.x,r[T+1]=w.y,r[T+2]=w.z}function h(){let S=new G;for(let w=0;w<r.length;w+=3){S.x=r[w+0],S.y=r[w+1],S.z=r[w+2];let T=_(S)/2/Math.PI+.5,A=p(S)/Math.PI+.5;o.push(T,1-A)}g(),u()}function u(){for(let S=0;S<o.length;S+=6){let w=o[S+0],T=o[S+2],A=o[S+4],C=Math.max(w,T,A),x=Math.min(w,T,A);C>.9&&x<.1&&(w<.2&&(o[S+0]+=1),T<.2&&(o[S+2]+=1),A<.2&&(o[S+4]+=1))}}function f(S){r.push(S.x,S.y,S.z)}function d(S,w){let T=S*3;w.x=e[T+0],w.y=e[T+1],w.z=e[T+2]}function g(){let S=new G,w=new G,T=new G,A=new G,C=new ke,x=new ke,E=new ke;for(let U=0,I=0;U<r.length;U+=9,I+=6){S.set(r[U+0],r[U+1],r[U+2]),w.set(r[U+3],r[U+4],r[U+5]),T.set(r[U+6],r[U+7],r[U+8]),C.set(o[I+0],o[I+1]),x.set(o[I+2],o[I+3]),E.set(o[I+4],o[I+5]),A.copy(S).add(w).add(T).divideScalar(3);let k=_(A);y(C,I+0,S,k),y(x,I+2,w,k),y(E,I+4,T,k)}}function y(S,w,T,A){A<0&&S.x===1&&(o[w]=S.x-1),T.x===0&&T.z===0&&(o[w]=A/2/Math.PI+.5)}function _(S){return Math.atan2(S.z,-S.x)}function p(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.vertices,e.indices,e.radius,e.detail)}};var wr=class n extends sa{constructor(e=1,t=0){let i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new n(e.radius,e.detail)}},Mi=class n extends Ct{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};let r=e/2,o=t/2,a=Math.floor(i),c=Math.floor(s),l=a+1,h=c+1,u=e/a,f=t/c,d=[],g=[],y=[],_=[];for(let p=0;p<h;p++){let S=p*f-o;for(let w=0;w<l;w++){let T=w*u-r;g.push(T,-S,0),y.push(0,0,1),_.push(w/a),_.push(1-p/c)}}for(let p=0;p<c;p++)for(let S=0;S<a;S++){let w=S+l*p,T=S+l*(p+1),A=S+1+l*(p+1),C=S+1+l*p;d.push(w,T,C),d.push(T,A,C)}this.setIndex(d),this.setAttribute("position",new at(g,3)),this.setAttribute("normal",new at(y,3)),this.setAttribute("uv",new at(_,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}};var ci=class n extends Ct{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let c=Math.min(o+a,Math.PI),l=0,h=[],u=new G,f=new G,d=[],g=[],y=[],_=[];for(let p=0;p<=i;p++){let S=[],w=p/i,T=o+w*a,A=e*Math.cos(T),C=Math.sqrt(e*e-A*A),x=0;p===0&&o===0?x=.5/t:p===i&&c===Math.PI&&(x=-.5/t);for(let E=0;E<=t;E++){let U=E/t,I=s+U*r;u.x=-C*Math.cos(I),u.y=A,u.z=C*Math.sin(I),g.push(u.x,u.y,u.z),f.copy(u).normalize(),y.push(f.x,f.y,f.z),_.push(U+x,1-w),S.push(l++)}h.push(S)}for(let p=0;p<i;p++)for(let S=0;S<t;S++){let w=h[p][S+1],T=h[p][S],A=h[p+1][S],C=h[p+1][S+1];(p!==0||o>0)&&d.push(w,T,C),(p!==i-1||c<Math.PI)&&d.push(T,A,C)}this.setIndex(d),this.setAttribute("position",new at(g,3)),this.setAttribute("normal",new at(y,3)),this.setAttribute("uv",new at(_,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};function ji(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let s=n[t][i];if(_d(s))s.isRenderTargetTexture?(Oe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(_d(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function jt(n){let e={};for(let t=0;t<n.length;t++){let i=ji(n[t]);for(let s in i)e[s]=i[s]}return e}function _d(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Am(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Ql(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Qe.workingColorSpace}var df={clone:ji,merge:jt},wm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Cm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Wn=class extends Gn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=wm,this.fragmentShader=Cm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ji(e.uniforms),this.uniformsGroups=Am(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let i in e.uniforms){let s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new Ve().setHex(s.value);break;case"v2":this.uniforms[i].value=new ke().fromArray(s.value);break;case"v3":this.uniforms[i].value=new G().fromArray(s.value);break;case"v4":this.uniforms[i].value=new mt().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Be().fromArray(s.value);break;case"m4":this.uniforms[i].value=new ut().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},ra=class extends Wn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var Rn=class extends Gn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ve(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ve(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=oc,this.normalScale=new ke(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new oi,this.combine=va,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},oa=class extends Gn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Zd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},aa=class extends Gn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Ss(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function Bo(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}var Ti=class{constructor(e,t,i,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,s=t[i],r=t[i-1];n:{e:{let o;t:{i:if(!(e<s)){for(let a=i+2;;){if(s===void 0){if(e<r)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(r=s,s=t[++i],e<s)break e}o=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(i=2,r=a);for(let c=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(s=r,r=t[--i-1],e>=r)break e}o=i,i=0;break t}break n}for(;i<o;){let a=i+o>>>1;e<t[a]?o=a:i=a+1}if(s=t[i],r=t[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=i[r+o];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},ca=class extends Ti{constructor(e,t,i,s){super(e,t,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:yl,endingEnd:yl}}intervalChanged_(e,t,i){let s=this.parameterPositions,r=e-2,o=e+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case vl:r=e,a=2*t-i;break;case Sl:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=i}if(c===void 0)switch(this.getSettings_().endingEnd){case vl:o=e,c=2*i-t;break;case Sl:o=1,c=i+s[1]-s[0];break;default:o=e-1,c=t}let l=(i-t)*.5,h=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-i),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,d=this._weightNext,g=(i-t)/(s-t),y=g*g,_=y*g,p=-f*_+2*f*y-f*g,S=(1+f)*_+(-1.5-2*f)*y+(-.5+f)*g+1,w=(-1-d)*_+(1.5+d)*y+.5*g,T=d*_-d*y;for(let A=0;A!==a;++A)r[A]=p*o[h+A]+S*o[l+A]+w*o[c+A]+T*o[u+A];return r}},la=class extends Ti{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=(i-t)/(s-t),u=1-h;for(let f=0;f!==a;++f)r[f]=o[l+f]*u+o[c+f]*h;return r}},ha=class extends Ti{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e){return this.copySampleValue_(e-1)}},ua=class extends Ti{interpolate_(e,t,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this.inTangents,u=this.outTangents;if(!h||!u){let g=(i-t)/(s-t),y=1-g;for(let _=0;_!==a;++_)r[_]=o[l+_]*y+o[c+_]*g;return r}let f=a*2,d=e-1;for(let g=0;g!==a;++g){let y=o[l+g],_=o[c+g],p=d*f+g*2,S=u[p],w=u[p+1],T=e*f+g*2,A=h[T],C=h[T+1],x=Pm(i,t,S,A,s);r[g]=ff(x,y,w,C,_)}return r}};function ff(n,e,t,i,s){let r=1-n;return r*r*r*e+3*r*r*n*t+3*r*n*n*i+n*n*n*s}function Rm(n,e,t,i,s){let r=1-n;return 3*r*r*(t-e)+6*r*n*(i-t)+3*n*n*(s-i)}function Pm(n,e,t,i,s){let r=(n-e)/(s-e);for(let o=0;o<8;o++){let a=ff(r,e,t,i,s)-n;if(Math.abs(a)<1e-10)break;let c=Rm(r,e,t,i,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-a/c))}return r}var pn=class{constructor(e,t,i,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ss(t,this.TimeBufferType),this.values=Ss(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:Ss(e.times,Array),values:Ss(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(i.interpolation=s),Bo(e.settings)&&(i.settings={inTangents:Ss(e.settings.inTangents,Array),outTangents:Ss(e.settings.outTangents,Array)})}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new ha(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new la(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ca(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new ua(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case cr:t=this.InterpolantFactoryMethodDiscrete;break;case Ko:t=this.InterpolantFactoryMethodLinear;break;case Ho:t=this.InterpolantFactoryMethodSmooth;break;case xl:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Oe("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return cr;case this.InterpolantFactoryMethodLinear:return Ko;case this.InterpolantFactoryMethodSmooth:return Ho;case this.InterpolantFactoryMethodBezier:return xl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]+=e;Bo(this.settings)&&(xd(this.settings.inTangents,e),xd(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]*=e;Bo(this.settings)&&(yd(this.settings.inTangents,e),yd(this.settings.outTangents,e))}return this}trim(e,t){let i=this.times,s=i.length,r=0,o=s-1;for(;r!==s&&i[r]<e;)++r;for(;o!==-1&&i[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=i.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Fe("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,s=this.values,r=i.length;r===0&&(Fe("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let c=i[a];if(typeof c=="number"&&isNaN(c)){Fe("KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){Fe("KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(s!==void 0&&om(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){Fe("KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Ho,r=e.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=e[a],h=e[a+1];if(l!==h&&(a!==1||l!==e[0]))if(s)c=!0;else{let u=a*i,f=u-i,d=u+i;for(let g=0;g!==i;++g){let y=t[u+g];if(y!==t[f+g]||y!==t[d+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let u=a*i,f=o*i;for(let d=0;d!==i;++d)t[f+d]=t[u+d]}++o}}if(r>0){e[o]=e[r];for(let a=r*i,c=o*i,l=0;l!==i;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,s=new i(this.name,e,t);return s.createInterpolant=this.createInterpolant,Bo(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function xd(n,e){for(let t=0,i=n.length;t!==i;t+=2)n[t]+=e}function yd(n,e){for(let t=0,i=n.length;t!==i;t+=2)n[t]*=e}pn.prototype.ValueTypeName="";pn.prototype.TimeBufferType=Float32Array;pn.prototype.ValueBufferType=Float32Array;pn.prototype.DefaultInterpolation=Ko;var Ei=class extends pn{constructor(e,t,i){super(e,t,i)}};Ei.prototype.ValueTypeName="bool";Ei.prototype.ValueBufferType=Array;Ei.prototype.DefaultInterpolation=cr;Ei.prototype.InterpolantFactoryMethodLinear=void 0;Ei.prototype.InterpolantFactoryMethodSmooth=void 0;var da=class extends pn{constructor(e,t,i,s){super(e,t,i,s)}};da.prototype.ValueTypeName="color";var fa=class extends pn{constructor(e,t,i,s){super(e,t,i,s)}};fa.prototype.ValueTypeName="number";var pa=class extends Ti{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(i-t)/(s-t),l=e*a;for(let h=l+a;l!==h;l+=4)zn.slerpFlat(r,0,o,l-a,o,l,c);return r}},Cr=class extends pn{constructor(e,t,i,s){super(e,t,i,s)}InterpolantFactoryMethodLinear(e){return new pa(this.times,this.values,this.getValueSize(),e)}};Cr.prototype.ValueTypeName="quaternion";Cr.prototype.InterpolantFactoryMethodSmooth=void 0;var Ai=class extends pn{constructor(e,t,i){super(e,t,i)}};Ai.prototype.ValueTypeName="string";Ai.prototype.ValueBufferType=Array;Ai.prototype.DefaultInterpolation=cr;Ai.prototype.InterpolantFactoryMethodLinear=void 0;Ai.prototype.InterpolantFactoryMethodSmooth=void 0;var ma=class extends pn{constructor(e,t,i,s){super(e,t,i,s)}};ma.prototype.ValueTypeName="vector";var ga=class{constructor(e,t,i){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=l.length;u<f;u+=2){let d=l[u],g=l[u+1];if(d.global&&(d.lastIndex=0),d.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},pf=new ga,_a=class{constructor(e){this.manager=e!==void 0?e:pf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}};_a.DEFAULT_MATERIAL_NAME="__DEFAULT";var Vi=class extends wt{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ve(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Rr=class extends Vi{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(wt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ve(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},_l=new ut,vd=new G,Sd=new G,Ds=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ke(512,512),this.mapType=cn,this.map=null,this.mapPass=null,this.matrix=new ut,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new bi,this._frameExtents=new ke(1,1),this._viewportCount=1,this._viewports=[new mt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;vd.setFromMatrixPosition(e.matrixWorld),t.position.copy(vd),Sd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Sd),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,s){_l.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(_l,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;e.coordinateSystem===ws||e.reversedDepth?t.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,1,0,0,0,0,1):t.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,.5,.5,0,0,0,1),t.multiply(_l)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},zo=new G,Go=new zn,Fn=new G,Pr=class extends wt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ut,this.projectionMatrix=new ut,this.projectionMatrixInverse=new ut,this.coordinateSystem=Sn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(zo,Go,Fn),Fn.x===1&&Fn.y===1&&Fn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(zo,Go,Fn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(zo,Go,Fn),Fn.x===1&&Fn.y===1&&Fn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(zo,Go,Fn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},yi=new G,bd=new ke,Md=new ke,Wt=class extends Pr{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=fr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Jc*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return fr*2*Math.atan(Math.tan(Jc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){yi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(yi.x,yi.y).multiplyScalar(-e/yi.z),yi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(yi.x,yi.y).multiplyScalar(-e/yi.z)}getViewSize(e,t){return this.getViewBounds(e,bd,Md),t.subVectors(Md,bd)}setViewOffset(e,t,i,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Jc*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*i/l,s*=o.width/c,i*=o.height/l}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Ml=class extends Ds{constructor(){super(new Wt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,i=fr*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(i!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=i,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},Ir=class extends Vi{constructor(e,t,i=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(wt.DEFAULT_UP),this.updateMatrix(),this.target=new wt,this.distance=i,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Ml}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},Tl=class extends Ds{constructor(){super(new Wt(90,1,.5,500)),this.isPointLightShadow=!0}},Ns=class extends Vi{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new Tl}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Lr=class extends Pr{constructor(e=-1,t=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-e,o=i+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},El=class extends Ds{constructor(){super(new Lr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Dr=class extends Vi{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(wt.DEFAULT_UP),this.updateMatrix(),this.target=new wt,this.shadow=new El}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var bs=-90,Ms=1,Us=class extends wt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Wt(bs,Ms,e,t);s.layers=this.layers,this.add(s);let r=new Wt(bs,Ms,e,t);r.layers=this.layers,this.add(r);let o=new Wt(bs,Ms,e,t);o.layers=this.layers,this.add(o);let a=new Wt(bs,Ms,e,t);a.layers=this.layers,this.add(a);let c=new Wt(bs,Ms,e,t);c.layers=this.layers,this.add(c);let l=new Wt(bs,Ms,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,s,r,o,a,c]=t;for(let l of t)this.remove(l);if(e===Sn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===ws)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let y=i.texture.mipmapsAutoUpdate;i.texture.mipmapsAutoUpdate=!1;let _=!1;e.isWebGLRenderer===!0?_=e.state.buffers.depth.getReversed():_=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),_&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),_&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,2,s),_&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,3,s),_&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,4,s),_&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.mipmapsAutoUpdate=y,e.setRenderTarget(i,5,s),_&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,f,d),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},xa=class extends Wt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}};var eh="\\[\\]\\.:\\/",Im=new RegExp("["+eh+"]","g"),th="[^"+eh+"]",Lm="[^"+eh.replace("\\.","")+"]",Dm=/((?:WC+[\/:])*)/.source.replace("WC",th),Nm=/(WCOD+)?/.source.replace("WCOD",Lm),Um=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",th),Om=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",th),Fm=new RegExp("^"+Dm+Nm+Um+Om+"$"),km=["material","materials","bones","map"],Al=class{constructor(e,t,i){let s=i||dt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},dt=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Im,"")}static parseTrackName(e){let t=Fm.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);km.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let c=i(a.children);if(c)return c}return null},s=i(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)e[t++]=i[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Oe("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let l=t.objectIndex;switch(i){case"materials":if(!e.material){Fe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Fe("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Fe("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Fe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Fe("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){Fe("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(l!==void 0){if(e[l]===void 0){Fe("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let o=e[s];if(o===void 0){let l=t.nodeName;Fe("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Fe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Fe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};dt.Composite=Al;dt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};dt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};dt.prototype.GetterByBindingType=[dt.prototype._getValue_direct,dt.prototype._getValue_array,dt.prototype._getValue_arrayElement,dt.prototype._getValue_toArray];dt.prototype.SetterByBindingTypeAndVersioning=[[dt.prototype._setValue_direct,dt.prototype._setValue_direct_setNeedsUpdate,dt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[dt.prototype._setValue_array,dt.prototype._setValue_array_setNeedsUpdate,dt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[dt.prototype._setValue_arrayElement,dt.prototype._setValue_arrayElement_setNeedsUpdate,dt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[dt.prototype._setValue_fromArray,dt.prototype._setValue_fromArray_setNeedsUpdate,dt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var zv=new Float32Array(1);var ah=class ah{constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}};ah.prototype.isMatrix2=!0;var wl=ah;function nh(n,e,t,i){let s=Bm(i);switch(t){case Xl:return n*e;case Yl:return n*e/s.components*s.byteLength;case wa:return n*e/s.components*s.byteLength;case Ci:return n*e*2/s.components*s.byteLength;case Ca:return n*e*2/s.components*s.byteLength;case ql:return n*e*3/s.components*s.byteLength;case Dn:return n*e*4/s.components*s.byteLength;case Ra:return n*e*4/s.components*s.byteLength;case Ur:case Or:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Fr:case kr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ia:case Da:return Math.max(n,16)*Math.max(e,8)/4;case Pa:case La:return Math.max(n,8)*Math.max(e,8)/2;case Na:case Ua:case Fa:case ka:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Oa:case Br:case Ba:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case za:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ga:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Ha:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Va:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Wa:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Xa:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case qa:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Ya:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Za:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Ja:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case $a:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case ja:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Ka:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Qa:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case ec:case tc:case nc:return Math.ceil(n/4)*Math.ceil(e/4)*16;case ic:case sc:return Math.ceil(n/4)*Math.ceil(e/4)*8;case zr:case rc:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Bm(n){switch(n){case cn:case Gl:return{byteLength:1,components:1};case Bs:case Hl:case Ln:return{byteLength:2,components:1};case Ea:case Aa:return{byteLength:2,components:4};case Pn:case Ta:case In:return{byteLength:4,components:1};case Vl:case Wl:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Oe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function Of(){let n=null,e=!1,t=null,i=null;function s(r,o){i=n.requestAnimationFrame(s),t(r,o)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function qm(n){let e=new WeakMap;function t(a,c){let l=a.array,h=a.usage,u=l.byteLength,f=n.createBuffer();n.bindBuffer(c,f),n.bufferData(c,l,h),a.onUploadCallback();let d;if(l instanceof Float32Array)d=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=n.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=n.SHORT;else if(l instanceof Uint32Array)d=n.UNSIGNED_INT;else if(l instanceof Int32Array)d=n.INT;else if(l instanceof Int8Array)d=n.BYTE;else if(l instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function i(a,c,l){let h=c.array,u=c.updateRanges;if(n.bindBuffer(l,a),u.length===0)n.bufferSubData(l,0,h);else{u.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<u.length;d++){let g=u[f],y=u[d];y.start<=g.start+g.count+1?g.count=Math.max(g.count,y.start+y.count-g.start):(++f,u[f]=y)}u.length=f+1;for(let d=0,g=u.length;d<g;d++){let y=u[d];n.bufferSubData(l,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(n.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var Ym=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Zm=`#ifdef USE_ALPHAHASH
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
#endif`,Jm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,$m=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,jm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Km=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Qm=`#ifdef USE_AOMAP
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
#endif`,e0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,t0=`#ifdef USE_BATCHING
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
#endif`,n0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,i0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,s0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,r0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,o0=`#ifdef USE_IRIDESCENCE
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
#endif`,a0=`#ifdef USE_BUMPMAP
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
#endif`,c0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,l0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,h0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,u0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,d0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,f0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,p0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,m0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,g0=`#define PI 3.141592653589793
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
} // validated`,_0=`vec3 transformedNormal = objectNormal;
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
#endif`,x0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,y0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,v0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,S0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,b0="gl_FragColor = linearToOutputTexel( gl_FragColor );",M0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,T0=`#ifdef USE_ENVMAP
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
#endif`,E0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,A0=`#ifdef USE_ENVMAP
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
#endif`,w0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,C0=`#ifdef USE_ENVMAP
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
#endif`,R0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,P0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,I0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,L0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,D0=`#ifdef USE_GRADIENTMAP
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
}`,N0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,U0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,O0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,F0=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,k0=`#ifdef USE_ENVMAP
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
#endif`,B0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,z0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,G0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,H0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,V0=`PhysicalMaterial material;
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
#endif`,W0=`uniform sampler2D dfgLUT;
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
}`,X0=`
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
#endif`,q0=`#if defined( RE_IndirectDiffuse )
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
#endif`,Y0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Z0=`#if NUM_LIGHT_PROBE_GRIDS > 0
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
#endif`,J0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,$0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,j0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,K0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Q0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,eg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,tg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,ng=`#if defined( USE_POINTS_UV )
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
#endif`,ig=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,sg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,rg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,og=`#if defined( USE_MORPHCOLORS )
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
#endif`,ag=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,cg=`#ifdef USE_MORPHTARGETS
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
#endif`,lg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,hg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,ug=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,dg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,fg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,mg=`#ifdef USE_NORMALMAP
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
#endif`,gg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,_g=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,xg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,yg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,vg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Sg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,bg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Mg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Tg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Eg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ag=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,wg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Cg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Rg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Pg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Ig=`float getShadowMask() {
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
}`,Lg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Dg=`#ifdef USE_SKINNING
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
#endif`,Ng=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ug=`#ifdef USE_SKINNING
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
#endif`,Og=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Fg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,kg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Bg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,zg=`#ifdef USE_TRANSMISSION
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
#endif`,Gg=`#ifdef USE_TRANSMISSION
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
#endif`,Hg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Vg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Wg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Xg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,qg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Yg=`uniform sampler2D t2D;
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
}`,Zg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Jg=`uniform float backgroundBlurriness;
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
}`,$g=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Kg=`#include <common>
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
}`,Qg=`#if DEPTH_PACKING == 3200
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
}`,e_=`#define DISTANCE
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
}`,t_=`#define DISTANCE
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
}`,n_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,i_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,s_=`uniform float scale;
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
}`,r_=`uniform vec3 diffuse;
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
}`,o_=`#include <common>
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
}`,a_=`uniform vec3 diffuse;
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
}`,c_=`#define LAMBERT
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
}`,l_=`#define LAMBERT
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
}`,h_=`#define MATCAP
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
}`,u_=`#define MATCAP
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
}`,d_=`#define NORMAL
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
}`,f_=`#define NORMAL
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
}`,p_=`#define PHONG
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
}`,m_=`#define PHONG
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
}`,g_=`#define STANDARD
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
}`,__=`#define STANDARD
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
}`,x_=`#define TOON
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
}`,y_=`#define TOON
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
}`,v_=`uniform float size;
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
}`,S_=`uniform vec3 diffuse;
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
}`,b_=`#include <common>
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
}`,M_=`uniform vec3 color;
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
}`,T_=`uniform float rotation;
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
}`,E_=`uniform vec3 diffuse;
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
}`,Ze={alphahash_fragment:Ym,alphahash_pars_fragment:Zm,alphamap_fragment:Jm,alphamap_pars_fragment:$m,alphatest_fragment:jm,alphatest_pars_fragment:Km,aomap_fragment:Qm,aomap_pars_fragment:e0,batching_pars_vertex:t0,batching_vertex:n0,begin_vertex:i0,beginnormal_vertex:s0,bsdfs:r0,iridescence_fragment:o0,bumpmap_pars_fragment:a0,clipping_planes_fragment:c0,clipping_planes_pars_fragment:l0,clipping_planes_pars_vertex:h0,clipping_planes_vertex:u0,color_fragment:d0,color_pars_fragment:f0,color_pars_vertex:p0,color_vertex:m0,common:g0,defaultnormal_vertex:_0,displacementmap_pars_vertex:x0,displacementmap_vertex:y0,emissivemap_fragment:v0,emissivemap_pars_fragment:S0,colorspace_fragment:b0,colorspace_pars_fragment:M0,envmap_fragment:T0,envmap_common_pars_fragment:E0,envmap_pars_fragment:A0,envmap_pars_vertex:w0,envmap_physical_pars_fragment:k0,envmap_vertex:C0,fog_vertex:R0,fog_pars_vertex:P0,fog_fragment:I0,fog_pars_fragment:L0,gradientmap_pars_fragment:D0,lightmap_pars_fragment:N0,lights_lambert_fragment:U0,lights_lambert_pars_fragment:O0,lights_pars_begin:F0,lights_toon_fragment:B0,lights_toon_pars_fragment:z0,lights_phong_fragment:G0,lights_phong_pars_fragment:H0,lights_physical_fragment:V0,lights_physical_pars_fragment:W0,lights_fragment_begin:X0,lights_fragment_maps:q0,lights_fragment_end:Y0,lightprobes_pars_fragment:Z0,logdepthbuf_fragment:J0,logdepthbuf_pars_fragment:$0,logdepthbuf_pars_vertex:j0,logdepthbuf_vertex:K0,map_fragment:Q0,map_pars_fragment:eg,map_particle_fragment:tg,map_particle_pars_fragment:ng,metalnessmap_fragment:ig,metalnessmap_pars_fragment:sg,morphinstance_vertex:rg,morphcolor_vertex:og,morphnormal_vertex:ag,morphtarget_pars_vertex:cg,morphtarget_vertex:lg,normal_fragment_begin:hg,normal_fragment_maps:ug,normal_pars_fragment:dg,normal_pars_vertex:fg,normal_vertex:pg,normalmap_pars_fragment:mg,clearcoat_normal_fragment_begin:gg,clearcoat_normal_fragment_maps:_g,clearcoat_pars_fragment:xg,iridescence_pars_fragment:yg,opaque_fragment:vg,packing:Sg,premultiplied_alpha_fragment:bg,project_vertex:Mg,dithering_fragment:Tg,dithering_pars_fragment:Eg,roughnessmap_fragment:Ag,roughnessmap_pars_fragment:wg,shadowmap_pars_fragment:Cg,shadowmap_pars_vertex:Rg,shadowmap_vertex:Pg,shadowmask_pars_fragment:Ig,skinbase_vertex:Lg,skinning_pars_vertex:Dg,skinning_vertex:Ng,skinnormal_vertex:Ug,specularmap_fragment:Og,specularmap_pars_fragment:Fg,tonemapping_fragment:kg,tonemapping_pars_fragment:Bg,transmission_fragment:zg,transmission_pars_fragment:Gg,uv_pars_fragment:Hg,uv_pars_vertex:Vg,uv_vertex:Wg,worldpos_vertex:Xg,background_vert:qg,background_frag:Yg,backgroundCube_vert:Zg,backgroundCube_frag:Jg,cube_vert:$g,cube_frag:jg,depth_vert:Kg,depth_frag:Qg,distance_vert:e_,distance_frag:t_,equirect_vert:n_,equirect_frag:i_,linedashed_vert:s_,linedashed_frag:r_,meshbasic_vert:o_,meshbasic_frag:a_,meshlambert_vert:c_,meshlambert_frag:l_,meshmatcap_vert:h_,meshmatcap_frag:u_,meshnormal_vert:d_,meshnormal_frag:f_,meshphong_vert:p_,meshphong_frag:m_,meshphysical_vert:g_,meshphysical_frag:__,meshtoon_vert:x_,meshtoon_frag:y_,points_vert:v_,points_frag:S_,shadow_vert:b_,shadow_frag:M_,sprite_vert:T_,sprite_frag:E_},Se={common:{diffuse:{value:new Ve(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Be}},envmap:{envMap:{value:null},envMapRotation:{value:new Be},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Be}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Be}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Be},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Be},normalScale:{value:new ke(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Be},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Be}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Be}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Be}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ve(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Ve(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0},uvTransform:{value:new Be}},sprite:{diffuse:{value:new Ve(16777215)},opacity:{value:1},center:{value:new ke(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}}},Zn={basic:{uniforms:jt([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.fog]),vertexShader:Ze.meshbasic_vert,fragmentShader:Ze.meshbasic_frag},lambert:{uniforms:jt([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new Ve(0)},envMapIntensity:{value:1}}]),vertexShader:Ze.meshlambert_vert,fragmentShader:Ze.meshlambert_frag},phong:{uniforms:jt([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new Ve(0)},specular:{value:new Ve(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphong_vert,fragmentShader:Ze.meshphong_frag},standard:{uniforms:jt([Se.common,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.roughnessmap,Se.metalnessmap,Se.fog,Se.lights,{emissive:{value:new Ve(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag},toon:{uniforms:jt([Se.common,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.gradientmap,Se.fog,Se.lights,{emissive:{value:new Ve(0)}}]),vertexShader:Ze.meshtoon_vert,fragmentShader:Ze.meshtoon_frag},matcap:{uniforms:jt([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,{matcap:{value:null}}]),vertexShader:Ze.meshmatcap_vert,fragmentShader:Ze.meshmatcap_frag},points:{uniforms:jt([Se.points,Se.fog]),vertexShader:Ze.points_vert,fragmentShader:Ze.points_frag},dashed:{uniforms:jt([Se.common,Se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ze.linedashed_vert,fragmentShader:Ze.linedashed_frag},depth:{uniforms:jt([Se.common,Se.displacementmap]),vertexShader:Ze.depth_vert,fragmentShader:Ze.depth_frag},normal:{uniforms:jt([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,{opacity:{value:1}}]),vertexShader:Ze.meshnormal_vert,fragmentShader:Ze.meshnormal_frag},sprite:{uniforms:jt([Se.sprite,Se.fog]),vertexShader:Ze.sprite_vert,fragmentShader:Ze.sprite_frag},background:{uniforms:{uvTransform:{value:new Be},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ze.background_vert,fragmentShader:Ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Be}},vertexShader:Ze.backgroundCube_vert,fragmentShader:Ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ze.cube_vert,fragmentShader:Ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ze.equirect_vert,fragmentShader:Ze.equirect_frag},distance:{uniforms:jt([Se.common,Se.displacementmap,{referencePosition:{value:new G},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ze.distance_vert,fragmentShader:Ze.distance_frag},shadow:{uniforms:jt([Se.lights,Se.fog,{color:{value:new Ve(0)},opacity:{value:1}}]),vertexShader:Ze.shadow_vert,fragmentShader:Ze.shadow_frag}};Zn.physical={uniforms:jt([Zn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Be},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Be},clearcoatNormalScale:{value:new ke(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Be},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Be},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Be},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Be},sheen:{value:0},sheenColor:{value:new Ve(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Be},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Be},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Be},transmissionSamplerSize:{value:new ke},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Be},attenuationDistance:{value:0},attenuationColor:{value:new Ve(0)},specularColor:{value:new Ve(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Be},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Be},anisotropyVector:{value:new ke},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Be}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag};var cc={r:0,b:0,g:0},A_=new ut,Ff=new Be;Ff.set(-1,0,0,0,1,0,0,0,1);function w_(n,e,t,i,s,r){let o=new Ve(0),a=s===!0?0:1,c,l,h=null,u=0,f=null;function d(S){let w=S.isScene===!0?S.background:null;if(w&&w.isTexture){let T=S.backgroundBlurriness>0;w=e.get(w,T)}return w}function g(S){let w=!1,T=d(S);T===null?_(o,a):T&&T.isColor&&(_(T,1),w=!0);let A=n.xr.getEnvironmentBlendMode();A==="additive"?t.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||w)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function y(S,w){let T=d(w);T&&T.isCubeTexture?(l===void 0&&(l=new st(new fn(1,1,1),new Wn({name:"BackgroundCubeMaterial",uniforms:ji(Zn.backgroundCube.uniforms),vertexShader:Zn.backgroundCube.vertexShader,fragmentShader:Zn.backgroundCube.fragmentShader,side:rn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(A,C,x){this.matrixWorld.copyPosition(x.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=T,l.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(A_.makeRotationFromEuler(w.backgroundRotation)).transpose(),T.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Ff),l.material.toneMapped=Qe.getTransfer(T.colorSpace)!==it,(h!==T||u!==T.version||f!==n.toneMapping)&&(l.material.needsUpdate=!0,h=T,u=T.version,f=n.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null)):T&&T.isTexture&&(c===void 0&&(c=new st(new Mi(2,2),new Wn({name:"BackgroundMaterial",uniforms:ji(Zn.background.uniforms),vertexShader:Zn.background.vertexShader,fragmentShader:Zn.background.fragmentShader,side:wi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=T,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.toneMapped=Qe.getTransfer(T.colorSpace)!==it,T.matrixAutoUpdate===!0&&T.updateMatrix(),c.material.uniforms.uvTransform.value.copy(T.matrix),(h!==T||u!==T.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,h=T,u=T.version,f=n.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function _(S,w){S.getRGB(cc,Ql(n)),t.buffers.color.setClear(cc.r,cc.g,cc.b,w,r)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(S,w=1){o.set(S),a=w,_(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(S){a=S,_(o,a)},render:g,addToRenderList:y,dispose:p}}function C_(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null),r=s,o=!1;function a(k,z,J,M,P){let L=!1,F=u(k,M,J,z);r!==F&&(r=F,l(r.object)),L=d(k,M,J,P),L&&g(k,M,J,P),P!==null&&e.update(P,n.ELEMENT_ARRAY_BUFFER),(L||o)&&(o=!1,T(k,z,J,M),P!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(P).buffer))}function c(){return n.createVertexArray()}function l(k){return n.bindVertexArray(k)}function h(k){return n.deleteVertexArray(k)}function u(k,z,J,M){let P=M.wireframe===!0,L=i[z.id];L===void 0&&(L={},i[z.id]=L);let F=k.isInstancedMesh===!0?k.id:0,Y=L[F];Y===void 0&&(Y={},L[F]=Y);let q=Y[J.id];q===void 0&&(q={},Y[J.id]=q);let $=q[P];return $===void 0&&($=f(c()),q[P]=$),$}function f(k){let z=[],J=[],M=[];for(let P=0;P<t;P++)z[P]=0,J[P]=0,M[P]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:J,attributeDivisors:M,object:k,attributes:{},index:null}}function d(k,z,J,M){let P=r.attributes,L=z.attributes,F=0,Y=J.getAttributes();for(let q in Y)if(Y[q].location>=0){let ne=P[q],xe=L[q];if(xe===void 0&&(q==="instanceMatrix"&&k.instanceMatrix&&(xe=k.instanceMatrix),q==="instanceColor"&&k.instanceColor&&(xe=k.instanceColor)),ne===void 0||ne.attribute!==xe||xe&&ne.data!==xe.data)return!0;F++}return r.attributesNum!==F||r.index!==M}function g(k,z,J,M){let P={},L=z.attributes,F=0,Y=J.getAttributes();for(let q in Y)if(Y[q].location>=0){let ne=L[q];ne===void 0&&(q==="instanceMatrix"&&k.instanceMatrix&&(ne=k.instanceMatrix),q==="instanceColor"&&k.instanceColor&&(ne=k.instanceColor));let xe={};xe.attribute=ne,ne&&ne.data&&(xe.data=ne.data),P[q]=xe,F++}r.attributes=P,r.attributesNum=F,r.index=M}function y(){let k=r.newAttributes;for(let z=0,J=k.length;z<J;z++)k[z]=0}function _(k){p(k,0)}function p(k,z){let J=r.newAttributes,M=r.enabledAttributes,P=r.attributeDivisors;J[k]=1,M[k]===0&&(n.enableVertexAttribArray(k),M[k]=1),P[k]!==z&&(n.vertexAttribDivisor(k,z),P[k]=z)}function S(){let k=r.newAttributes,z=r.enabledAttributes;for(let J=0,M=z.length;J<M;J++)z[J]!==k[J]&&(n.disableVertexAttribArray(J),z[J]=0)}function w(k,z,J,M,P,L,F){F===!0?n.vertexAttribIPointer(k,z,J,P,L):n.vertexAttribPointer(k,z,J,M,P,L)}function T(k,z,J,M){y();let P=M.attributes,L=J.getAttributes(),F=z.defaultAttributeValues;for(let Y in L){let q=L[Y];if(q.location>=0){let $=P[Y];if($===void 0&&(Y==="instanceMatrix"&&k.instanceMatrix&&($=k.instanceMatrix),Y==="instanceColor"&&k.instanceColor&&($=k.instanceColor)),$!==void 0){let ne=$.normalized,xe=$.itemSize,Ce=e.get($);if(Ce===void 0)continue;let j=Ce.buffer,ae=Ce.type,ye=Ce.bytesPerElement,Ie=ae===n.INT||ae===n.UNSIGNED_INT||$.gpuType===Ta;if($.isInterleavedBufferAttribute){let ue=$.data,Xe=ue.isInterleavedBuffer===!0?ue.stride:ue.itemSize,Tt=$.offset;if(ue.isInstancedInterleavedBuffer||ue.isInstancedBufferAttribute){for(let Ue=0;Ue<q.locationSize;Ue++)p(q.location+Ue,ue.meshPerAttribute);k.isInstancedMesh!==!0&&M._maxInstanceCount===void 0&&(M._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let Ue=0;Ue<q.locationSize;Ue++)_(q.location+Ue);n.bindBuffer(n.ARRAY_BUFFER,j);for(let Ue=0;Ue<q.locationSize;Ue++)w(q.location+Ue,xe/q.locationSize,ae,ne,Xe*ye,(Tt+xe/q.locationSize*Ue)*ye,Ie)}else{if($.isInstancedBufferAttribute){for(let ue=0;ue<q.locationSize;ue++)p(q.location+ue,$.meshPerAttribute);k.isInstancedMesh!==!0&&M._maxInstanceCount===void 0&&(M._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let ue=0;ue<q.locationSize;ue++)_(q.location+ue);n.bindBuffer(n.ARRAY_BUFFER,j);for(let ue=0;ue<q.locationSize;ue++)w(q.location+ue,xe/q.locationSize,ae,ne,xe*ye,xe/q.locationSize*ue*ye,Ie)}}else if(F!==void 0){let ne=F[Y];if(ne!==void 0)switch(ne.length){case 2:n.vertexAttrib2fv(q.location,ne);break;case 3:n.vertexAttrib3fv(q.location,ne);break;case 4:n.vertexAttrib4fv(q.location,ne);break;default:n.vertexAttrib1fv(q.location,ne)}}}}S()}function A(){U();for(let k in i){let z=i[k];for(let J in z){let M=z[J];for(let P in M){let L=M[P];for(let F in L)h(L[F].object),delete L[F];delete M[P]}}delete i[k]}}function C(k){if(i[k.id]===void 0)return;let z=i[k.id];for(let J in z){let M=z[J];for(let P in M){let L=M[P];for(let F in L)h(L[F].object),delete L[F];delete M[P]}}delete i[k.id]}function x(k){for(let z in i){let J=i[z];for(let M in J){let P=J[M];if(P[k.id]===void 0)continue;let L=P[k.id];for(let F in L)h(L[F].object),delete L[F];delete P[k.id]}}}function E(k){for(let z in i){let J=i[z],M=k.isInstancedMesh===!0?k.id:0,P=J[M];if(P!==void 0){for(let L in P){let F=P[L];for(let Y in F)h(F[Y].object),delete F[Y];delete P[L]}delete J[M],Object.keys(J).length===0&&delete i[z]}}}function U(){I(),o=!0,r!==s&&(r=s,l(r.object))}function I(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:U,resetDefaultState:I,dispose:A,releaseStatesOfGeometry:C,releaseStatesOfObject:E,releaseStatesOfProgram:x,initAttributes:y,enableAttribute:_,disableUnusedAttributes:S}}function R_(n,e,t){let i;function s(c){i=c}function r(c,l){n.drawArrays(i,c,l),t.update(l,i,1)}function o(c,l,h){h!==0&&(n.drawArraysInstanced(i,c,l,h),t.update(l,i,h))}function a(c,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,h);let f=0;for(let d=0;d<h;d++)f+=l[d];t.update(f,i,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function P_(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let x=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(x.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(x){return!(x!==Dn&&i.convert(x)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(x){let E=x===Ln&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(x!==cn&&x!==In&&!E&&i.convert(x)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function c(x){if(x==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";x="mediump"}return x==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",h=c(l);h!==l&&(Oe("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=t.logarithmicDepthBuffer===!0&&u===!1;t.reversedDepthBuffer===!0&&u===!1&&Oe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&u===!0&&Oe("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=n.getParameter(n.MAX_TEXTURE_SIZE),_=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),S=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),w=n.getParameter(n.MAX_VARYING_VECTORS),T=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),A=n.getParameter(n.MAX_SAMPLES),C=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:d,maxVertexTextures:g,maxTextureSize:y,maxCubemapSize:_,maxAttributes:p,maxVertexUniforms:S,maxVaryings:w,maxFragmentUniforms:T,maxSamples:A,samples:C}}function I_(n){let e=this,t=null,i=0,s=!1,r=!1,o=new wn,a=new Be,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let d=u.length!==0||f||i!==0||s;return s=f,i=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,d){let g=u.clippingPlanes,y=u.clipIntersection,_=u.clipShadows,p=n.get(u);if(!s||g===null||g.length===0||r&&!_)r?h(null):l();else{let S=r?0:i,w=S*4,T=p.clippingState||null;c.value=T,T=h(g,f,w,d);for(let A=0;A!==w;++A)T[A]=t[A];p.clippingState=T,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=S}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(u,f,d,g){let y=u!==null?u.length:0,_=null;if(y!==0){if(_=c.value,g!==!0||_===null){let p=d+y*4,S=f.matrixWorldInverse;a.getNormalMatrix(S),(_===null||_.length<p)&&(_=new Float32Array(p));for(let w=0,T=d;w!==y;++w,T+=4)o.copy(u[w]).applyMatrix4(S,a),o.normal.toArray(_,T),_[T+3]=o.constant}c.value=_,c.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,_}}var Vr=class extends dn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new br(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new fn(5,5,5),r=new Wn({name:"CubemapFromEquirect",uniforms:ji(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:rn,blending:Xi});r.uniforms.tEquirect.value=t;let o=new st(s,r),a=t.minFilter;return t.minFilter===li&&(t.minFilter=nn),new Us(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,s);e.setRenderTarget(r)}},mf=256,L_=3,D_=20,kf=256,Bf=16,N_=3,U_=new G,O_=new Ve,hc=class n{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Us(1,10,null),this._boxMesh=new st(new fn(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){let{size:o=256,position:a=U_}=r,c=this._renderer;this._setSize(o);let l=this._allocateTarget(),h=this._getSourceTarget(!0);t>0&&(h.texture.mipmapsAutoUpdate=!1);let u=c.autoClear,f=c.autoClearColor,d=c.autoClearDepth,g=c.autoClearStencil,y=e.background;c.autoClear=!0,c.autoClearColor=!0,c.autoClearDepth=!0,c.autoClearStencil=!0,y===null&&(e.background=c.getClearColor(O_));let _=new Us(i,s,h);return _.position.copy(a),_.update(c,e),c.autoClear=u,c.autoClearColor=f,c.autoClearDepth=d,c.autoClearStencil=g,e.background=y,t>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(l,t)),this._applyPMREM(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=xf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=_f(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(mf,af(e))}_fromTexture(e,t){e.mapping===Zi||e.mapping===ks?this._setSize(e.image.length===0?mf:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let i=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(i),i}_allocateTarget(){let e=this._cubeSize,t=gf(e,!1,!1),i=Math.log2(e)-L_;for(let s=0;s<=i;s++)t.texture.mipmaps.push({width:e>>s,height:e>>s});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,i=this._sourceTarget;return(i===null||i.width!==t||e&&i.depthBuffer===!1)&&(i!==null&&i.dispose(),this._sourceTarget=gf(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,i){let s=this._boxMesh,r=this._cubeCamera;s.material=i,r.renderTarget=e,r.activeMipmapLevel=t;let o=e.width>>t;e.viewport.set(0,0,o,o),r.update(this._renderer,s),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===Zi||e.mapping===ks?(this._cubemapMaterial===null&&(this._cubemapMaterial=xf()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=_f()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=F_(),this._integrationMaterial=k_());let t=this._cubeSize,i=e.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(t/Bf);for(let o=0;o<=i;o++){let a=n.lodToRoughness(o,i);if(o>i-N_)r.roughness.value=a,this._renderCube(e,o,this._integrationMaterial);else{let c=a>0?Math.log2(t)+.5*Math.log2(6/(kf*Math.pow(a,4)))+.5:0;s.roughness.value=a,s.lodBias.value=c,this._renderCube(e,o,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=B_());let i=this._blurMaterial,s=i.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(e,0,i),s.envMap.value=e.texture,this._renderCube(r,0,i)}};function gf(n,e,t){return new Vr(n,{minFilter:li,generateMipmaps:e,type:Ln,colorSpace:lr,depthBuffer:t})}function Wr(n,e,t){return new Wn({name:n,uniforms:e,vertexShader:Ze.cube_vert,fragmentShader:t,side:rn,blending:Xi,depthTest:!1,depthWrite:!1})}function F_(){return Wr("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${kf}u

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
	`)}function k_(){return Wr("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Bf}},`

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
	`)}function B_(){return Wr("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${D_}
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
	`)}function _f(){return Wr("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

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
	`)}function xf(){return Wr("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function z_(n){let e=new WeakMap,t=new WeakMap,i=null;function s(f,d=!1){return f==null?null:d?o(f):r(f)}function r(f){if(f&&f.isTexture){let d=f.mapping;if(d===Sa||d===ba)if(e.has(f)){let g=e.get(f).texture;return a(g,f.mapping)}else{let g=f.image;if(g&&g.height>0){let y=new Vr(g.height);return y.fromEquirectangularTexture(n,f),e.set(f,y),f.addEventListener("dispose",l),a(y.texture,f.mapping)}else return null}}return f}function o(f){if(f&&f.isTexture&&f.isPMREMTexture!==!0){let d=f.mapping,g=d===Sa||d===ba,y=d===Zi||d===ks;if(g||y){let _=t.get(f),p=_!==void 0?_.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==p)return i===null&&(i=new hc(n)),_=g?i.fromEquirectangular(f,_):i.fromCubemap(f,_),_.texture.pmremVersion=f.pmremVersion,t.set(f,_),_.texture;if(_!==void 0)return _.texture;{let S=f.image;return g&&S&&S.height>0||y&&S&&c(S)?(i===null&&(i=new hc(n)),_=g?i.fromEquirectangular(f):i.fromCubemap(f),_.texture.pmremVersion=f.pmremVersion,t.set(f,_),f.addEventListener("dispose",h),_.texture):null}}}return f}function a(f,d){return d===Sa?f.mapping=Zi:d===ba&&(f.mapping=ks),f}function c(f){let d=0,g=6;for(let y=0;y<g;y++)f[y]!==void 0&&d++;return d===g}function l(f){let d=f.target;d.removeEventListener("dispose",l);let g=e.get(d);g!==void 0&&(e.delete(d),g.dispose())}function h(f){let d=f.target;d.removeEventListener("dispose",h);let g=t.get(d);g!==void 0&&(t.delete(d),g.dispose())}function u(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:u}}function G_(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let s=t(i);return s===null&&ar("WebGLRenderer: "+i+" extension not supported."),s}}}function H_(n,e,t,i){let s={},r=new WeakMap,o=new FinalizationRegistry(g=>delete s[g]);function a(g){c(g.target)}function c(g){g.index!==null&&e.remove(g.index);for(let _ in g.attributes)e.remove(g.attributes[_]);g.removeEventListener("dispose",a),delete s[g.id],o.unregister(g);let y=r.get(g);y&&(e.remove(y),r.delete(g)),i.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,t.memory.geometries--}function l(g,y){return s[y.id]!==void 0||(y.addEventListener("dispose",a),s[y.id]=new WeakRef(y),o.register(y,y.id,y),t.memory.geometries++),y}function h(g){let y=g.attributes;for(let _ in y)e.update(y[_],n.ARRAY_BUFFER)}function u(g){let y=g.index,_=g.attributes.position,p=0;if(_===void 0)return;let S=y!==null?y.array.length:_.array.length/3-1,w=_.count>=65535?yr:xr,T=new w(Math.ceil(S/3)*6,1),A=T.array;if(y!==null){let x=y.array;p=y.version;for(let E=0,U=0;E<S;E+=3){let I=x[E+0],k=x[E+1],z=x[E+2];A[U++]=I,A[U++]=k,A[U++]=k,A[U++]=z,A[U++]=z,A[U++]=I}}else{p=_.version;for(let x=0,E=0;x<S;x+=3){let U=x+0,I=x+1,k=x+2;A[E++]=U,A[E++]=I,A[E++]=I,A[E++]=k,A[E++]=k,A[E++]=U}}T.version=p;let C=r.get(g);C&&e.remove(C),r.set(g,T)}function f(g){let y=r.get(g);if(y){let _=g.index;_!==null&&y.version<_.version&&u(g)}else u(g);return r.get(g)}function d(){for(let g in s){let y=s[g].deref();y!==void 0&&c(y)}}return{get:l,update:h,getWireframeAttribute:f,dispose:d}}function V_(n,e,t){let i;function s(u){i=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function c(u,f){n.drawElements(i,f,r,u*o),t.update(f,i,1)}function l(u,f,d){d!==0&&(n.drawElementsInstanced(i,f,r,u*o,d),t.update(f,i,d))}function h(u,f,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,u,0,d);let y=0;for(let _=0;_<d;_++)y+=f[_];t.update(y,i,1)}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function W_(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(r/3);break;case n.LINES:t.lines+=a*(r/2);break;case n.LINE_STRIP:t.lines+=a*(r-1);break;case n.LINE_LOOP:t.lines+=a*r;break;case n.POINTS:t.points+=a*r;break;default:Fe("WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function X_(n,e,t){let i=new WeakMap,s=new mt;function r(o,a,c){let l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,f=i.get(a);if(f===void 0||f.count!==u){let U=function(){x.dispose(),i.delete(a),a.removeEventListener("dispose",U)};f!==void 0&&f.texture.dispose();let d=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,y=a.morphAttributes.color!==void 0,_=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],S=a.morphAttributes.color||[],w=0;d===!0&&(w=1),g===!0&&(w=2),y===!0&&(w=3);let T=a.attributes.position.count*w,A=1;T>e.maxTextureSize&&(A=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);let C=new Float32Array(T*A*4*u),x=new pr(C,T,A,u);x.type=In,x.needsUpdate=!0;let E=w*4;for(let I=0;I<u;I++){let k=_[I],z=p[I],J=S[I],M=T*A*4*I;for(let P=0;P<k.count;P++){let L=P*E;d===!0&&(s.fromBufferAttribute(k,P),C[M+L+0]=s.x,C[M+L+1]=s.y,C[M+L+2]=s.z,C[M+L+3]=0),g===!0&&(s.fromBufferAttribute(z,P),C[M+L+4]=s.x,C[M+L+5]=s.y,C[M+L+6]=s.z,C[M+L+7]=0),y===!0&&(s.fromBufferAttribute(J,P),C[M+L+8]=s.x,C[M+L+9]=s.y,C[M+L+10]=s.z,C[M+L+11]=J.itemSize===4?s.w:1)}}f={count:u,texture:x,size:new ke(T,A)},i.set(a,f),a.addEventListener("dispose",U)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let d=0;for(let y=0;y<l.length;y++)d+=l[y];let g=a.morphTargetsRelative?1:1-d;c.getUniforms().setValue(n,"morphTargetBaseInfluence",g),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function q_(n,e,t,i,s){let r=new WeakMap;function o(l){let h=s.render.frame,u=l.geometry,f=e.get(l,u);if(r.get(f)!==h&&(e.update(f),r.set(f,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){let d=l.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return f}function a(){r=new WeakMap}function c(l){let h=l.target;h.removeEventListener("dispose",c),i.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:o,dispose:a}}var Y_={[Dl]:"LINEAR_TONE_MAPPING",[Nl]:"REINHARD_TONE_MAPPING",[Ul]:"CINEON_TONE_MAPPING",[Ol]:"ACES_FILMIC_TONE_MAPPING",[kl]:"AGX_TONE_MAPPING",[Bl]:"NEUTRAL_TONE_MAPPING",[Fl]:"CUSTOM_TONE_MAPPING"};function Z_(n,e,t,i,s,r){let o=new dn(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,c=null,l=null,h=new Ct;h.setAttribute("position",new at([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new at([0,2,0,0,2,0],2));let u=new ra({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new st(h,u),d=new Lr(-1,1,1,-1,0,1),g=null,y=null,_=!1,p,S=null,w=[],T=!1;this.setSize=function(A,C){o.setSize(A,C),a!==null&&a.setSize(A,C),c!==null&&c.setSize(A,C);for(let x=0;x<w.length;x++){let E=w[x];E.setSize&&E.setSize(A,C)}},this.setEffects=function(A){w=A,T=w.length>0&&w[0].isRenderPass===!0;let C=o.width,x=o.height;w.length>0&&a===null&&(a=new dn(C,x,{type:Ln,depthBuffer:!1,stencilBuffer:!1}),c=new dn(C,x,{type:Ln,depthBuffer:!1,stencilBuffer:!1}));let E=s===!0&&w.some(U=>U.needsDepthTexture===!0);E!==(o.depthTexture!==null)&&(E===!0&&l===null&&(l=new ai(C,x),r===!0&&(l.format=hi,l.type=Ji)),o.dispose(),o.depthTexture=E?l:null,o.resolveDepthBuffer=E,o.storeMultisampledDepthBuffer=E);for(let U=0;U<w.length;U++){let I=w[U];I.setSize&&I.setSize(C,x),E&&I.needsDepthTexture===!0&&I.setDepthTexture&&I.setDepthTexture(l)}},this.begin=function(A,C){if(_||A.toneMapping===qn&&w.length===0)return!1;if(S=C,C!==null){let x=C.width,E=C.height;(o.width!==x||o.height!==E)&&this.setSize(x,E)}return T===!1&&A.setRenderTarget(o),p=A.toneMapping,A.toneMapping=qn,!0},this.hasRenderPass=function(){return T},this.end=function(A,C){A.toneMapping=p,_=!0;let x=o,E=a;for(let U=0;U<w.length;U++){let I=w[U];I.enabled!==!1&&(I.render(A,E,x,C),I.needsSwap!==!1&&(x=E,E=E===a?c:a))}if(g!==A.outputColorSpace||y!==A.toneMapping){g=A.outputColorSpace,y=A.toneMapping,u.defines={},Qe.getTransfer(g)===it&&(u.defines.SRGB_TRANSFER="");let U=Y_[y];U&&(u.defines[U]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=x.texture,A.setRenderTarget(S),A.render(f,d),S=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),c!==null&&c.dispose(),h.dispose(),u.dispose()}}var zf=new sn,Gf=new ai(1,1),Hf=new Mr(1),Vf=new pr,Wf=new ta,Xf=new br,yf=[],vf=[],Sf=new Float32Array(16),bf=new Float32Array(9),Mf=new Float32Array(4);function Gs(n,e,t){let i=n[0];if(i<=0||i>0)return n;let s=e*t,r=yf[s];if(r===void 0&&(r=new Float32Array(s),yf[s]=r),e!==0){i.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(r,a)}return r}function Nt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Ut(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function dc(n,e){let t=vf[e];t===void 0&&(t=new Int32Array(e),vf[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function J_(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function $_(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;n.uniform2fv(this.addr,e),Ut(t,e)}}function j_(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Nt(t,e))return;n.uniform3fv(this.addr,e),Ut(t,e)}}function K_(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;n.uniform4fv(this.addr,e),Ut(t,e)}}function Q_(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Nt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Ut(t,e)}else{if(Nt(t,i))return;Mf.set(i),n.uniformMatrix2fv(this.addr,!1,Mf),Ut(t,i)}}function ex(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Nt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Ut(t,e)}else{if(Nt(t,i))return;bf.set(i),n.uniformMatrix3fv(this.addr,!1,bf),Ut(t,i)}}function tx(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Nt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Ut(t,e)}else{if(Nt(t,i))return;Sf.set(i),n.uniformMatrix4fv(this.addr,!1,Sf),Ut(t,i)}}function nx(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function ix(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;n.uniform2iv(this.addr,e),Ut(t,e)}}function sx(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;n.uniform3iv(this.addr,e),Ut(t,e)}}function rx(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;n.uniform4iv(this.addr,e),Ut(t,e)}}function ox(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function ax(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;n.uniform2uiv(this.addr,e),Ut(t,e)}}function cx(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;n.uniform3uiv(this.addr,e),Ut(t,e)}}function lx(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;n.uniform4uiv(this.addr,e),Ut(t,e)}}function fc(n){return n.version===0&&(n.compareFunction=$l,n.needsUpdate=!0),n}function hx(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?r=fc(Gf):r=zf,t.setTexture2D(e||r,s)}function ux(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||Wf,s)}function dx(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_CUBE_SHADOW?r=fc(Hf):r=Xf,t.setTextureCube(e||r,s)}function fx(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Vf,s)}function px(n){switch(n){case 5126:return J_;case 35664:return $_;case 35665:return j_;case 35666:return K_;case 35674:return Q_;case 35675:return ex;case 35676:return tx;case 5124:case 35670:return nx;case 35667:case 35671:return ix;case 35668:case 35672:return sx;case 35669:case 35673:return rx;case 5125:return ox;case 36294:return ax;case 36295:return cx;case 36296:return lx;case 35678:case 36198:case 36298:case 36306:case 35682:return hx;case 35679:case 36299:case 36307:return ux;case 35680:case 36300:case 36308:case 36293:return dx;case 36289:case 36303:case 36311:case 36292:return fx}}function mx(n,e){n.uniform1fv(this.addr,e)}function gx(n,e){let t=Gs(e,this.size,2);n.uniform2fv(this.addr,t)}function _x(n,e){let t=Gs(e,this.size,3);n.uniform3fv(this.addr,t)}function xx(n,e){let t=Gs(e,this.size,4);n.uniform4fv(this.addr,t)}function yx(n,e){let t=Gs(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function vx(n,e){let t=Gs(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Sx(n,e){let t=Gs(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function bx(n,e){n.uniform1iv(this.addr,e)}function Mx(n,e){n.uniform2iv(this.addr,e)}function Tx(n,e){n.uniform3iv(this.addr,e)}function Ex(n,e){n.uniform4iv(this.addr,e)}function Ax(n,e){n.uniform1uiv(this.addr,e)}function wx(n,e){n.uniform2uiv(this.addr,e)}function Cx(n,e){n.uniform3uiv(this.addr,e)}function Rx(n,e){n.uniform4uiv(this.addr,e)}function Px(n,e,t){let i=this.cache,s=e.length,r=dc(t,s);Nt(i,r)||(n.uniform1iv(this.addr,r),Ut(i,r));let o;this.type===n.SAMPLER_2D_SHADOW?o=fc(Gf):o=zf;for(let a=0;a!==s;++a)t.setTexture2D(e[a]||o,r[a])}function Ix(n,e,t){let i=this.cache,s=e.length,r=dc(t,s);Nt(i,r)||(n.uniform1iv(this.addr,r),Ut(i,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Wf,r[o])}function Lx(n,e,t){let i=this.cache,s=e.length,r=dc(t,s);Nt(i,r)||(n.uniform1iv(this.addr,r),Ut(i,r));let o;this.type===n.SAMPLER_CUBE_SHADOW?o=fc(Hf):o=Xf;for(let a=0;a!==s;++a)t.setTextureCube(e[a]||o,r[a])}function Dx(n,e,t){let i=this.cache,s=e.length,r=dc(t,s);Nt(i,r)||(n.uniform1iv(this.addr,r),Ut(i,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Vf,r[o])}function Nx(n){switch(n){case 5126:return mx;case 35664:return gx;case 35665:return _x;case 35666:return xx;case 35674:return yx;case 35675:return vx;case 35676:return Sx;case 5124:case 35670:return bx;case 35667:case 35671:return Mx;case 35668:case 35672:return Tx;case 35669:case 35673:return Ex;case 5125:return Ax;case 36294:return wx;case 36295:return Cx;case 36296:return Rx;case 35678:case 36198:case 36298:case 36306:case 35682:return Px;case 35679:case 36299:case 36307:return Ix;case 35680:case 36300:case 36308:case 36293:return Lx;case 36289:case 36303:case 36311:case 36292:return Dx}}var hh=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=px(t.type)}},uh=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Nx(t.type)}},dh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(e,t[a.id],i)}}},ch=/(\w+)(\])?(\[|\.)?/g;function Tf(n,e){n.seq.push(e),n.map[e.id]=e}function Ux(n,e,t){let i=n.name,s=i.length;for(ch.lastIndex=0;;){let r=ch.exec(i),o=ch.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Tf(t,l===void 0?new hh(a,n,e):new uh(a,n,e));break}else{let u=t.map[a];u===void 0&&(u=new dh(a),Tf(t,u)),t=u}}}var zs=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){let a=e.getActiveUniform(t,o),c=e.getUniformLocation(t,a.name);Ux(a,c,this)}let s=[],r=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){let r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){let s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,o=t.length;r!==o;++r){let a=t[r],c=i[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){let i=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&i.push(o)}return i}};function Ef(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var Ox=37297,Fx=0;function kx(n,e){let t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}var Af=new Be;function Bx(n){Qe._getMatrix(Af,Qe.workingColorSpace,n);let e=`mat3( ${Af.elements.map(t=>t.toFixed(4))} )`;switch(Qe.getTransfer(n)){case hr:return[e,"LinearTransferOETF"];case it:return[e,"sRGBTransferOETF"];default:return Oe("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function wf(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+kx(n.getShaderSource(e),a)}else return r}function zx(n,e){let t=Bx(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var Gx={[Dl]:"Linear",[Nl]:"Reinhard",[Ul]:"Cineon",[Ol]:"ACESFilmic",[kl]:"AgX",[Bl]:"Neutral",[Fl]:"Custom"};function Hx(n,e){let t=Gx[e];return t===void 0?(Oe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var lc=new G;function Vx(){Qe.getLuminanceCoefficients(lc);let n=lc.x.toFixed(4),e=lc.y.toFixed(4),t=lc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Wx(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Hr).join(`
`)}function Xx(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function qx(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(e,s),o=r.name,a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Hr(n){return n!==""}function Cf(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function Rf(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Yx=/^[ \t]*#include +<([\w\d./]+)>/gm;function fh(n){return n.replace(Yx,Zx)}function Zx(n,e){let t=Ze[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return fh(t)}var Jx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Pf(n){return n.replace(Jx,$x)}function $x(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function If(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}var jx={[Wi]:"SHADOWMAP_TYPE_PCF",[Os]:"SHADOWMAP_TYPE_VSM"};function Kx(n){return jx[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Qx={[ks]:"ENVMAP_MODE_REFRACTION"};function ey(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":Qx[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var ty={[va]:"ENVMAP_BLENDING_MULTIPLY",[Xd]:"ENVMAP_BLENDING_MIX",[qd]:"ENVMAP_BLENDING_ADD"};function ny(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":ty[n.combine]||"ENVMAP_BLENDING_NONE"}function iy(n,e,t,i){let s=n.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,c=Kx(t),l=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=ey(t),u=ny(t),f=Wx(t),d=Xx(r),g=s.createProgram(),y,_,p=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(y=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d].filter(Hr).join(`
`),y.length>0&&(y+=`
`),_=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d].filter(Hr).join(`
`),_.length>0&&(_+=`
`)):(y=[If(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Hr).join(`
`),_=[If(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==qn?"#define TONE_MAPPING":"",t.toneMapping!==qn?Ze.tonemapping_pars_fragment:"",t.toneMapping!==qn?Hx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ze.colorspace_pars_fragment,zx("linearToOutputTexel",t.outputColorSpace),Vx(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Hr).join(`
`)),o=fh(o),o=Cf(o,t),o=Rf(o,t),a=fh(a),a=Cf(a,t),a=Rf(a,t),o=Pf(o),a=Pf(a),t.isRawShaderMaterial!==!0&&(p=`#version 300 es
`,y=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,_=["#define varying in",t.glslVersion===Kl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Kl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);let S=p+y+o,w=p+_+a,T=Ef(s,s.VERTEX_SHADER,S),A=Ef(s,s.FRAGMENT_SHADER,w);s.attachShader(g,T),s.attachShader(g,A),t.index0AttributeName!==void 0?s.bindAttribLocation(g,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(g,0,"position"),s.linkProgram(g);function C(I){if(n.debug.checkShaderErrors){let k=s.getProgramInfoLog(g)||"",z=s.getShaderInfoLog(T)||"",J=s.getShaderInfoLog(A)||"",M=k.trim(),P=z.trim(),L=J.trim(),F=!0,Y=!0;if(s.getProgramParameter(g,s.LINK_STATUS)===!1)if(F=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,g,T,A);else{let q=wf(s,T,"vertex"),$=wf(s,A,"fragment");Fe("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(g,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+M+`
`+q+`
`+$)}else M!==""?Oe("WebGLProgram: Program Info Log:",M):(P===""||L==="")&&(Y=!1);Y&&(I.diagnostics={runnable:F,programLog:M,vertexShader:{log:P,prefix:y},fragmentShader:{log:L,prefix:_}})}s.deleteShader(T),s.deleteShader(A),x=new zs(s,g),E=qx(s,g)}let x;this.getUniforms=function(){return x===void 0&&C(this),x};let E;this.getAttributes=function(){return E===void 0&&C(this),E};let U=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return U===!1&&(U=s.getProgramParameter(g,Ox)),U},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Fx++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=T,this.fragmentShader=A,this}var sy=0,ph=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new mh(e),t.set(e,i)),i}},mh=class{constructor(e){this.id=sy++,this.code=e,this.usedTimes=0}};function ry(n){return n===Ci||n===Br||n===zr}function oy(n,e,t,i,s,r){let o=new mr,a=new ph,c=new Set,l=[],h=new Map,u=i.logarithmicDepthBuffer,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function d(x){return c.add(x),x===0?"uv":`uv${x}`}function g(x,E,U,I,k,z){let J=I.fog,M=k.geometry,P=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?I.environment:null,L=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,F=e.get(x.envMap||P,L),Y=f[x.type],q=i.precision;x.precision!==null&&(q=i.getMaxPrecision(x.precision),q!==x.precision&&Oe("WebGLProgram.getParameters:",x.precision,"not supported, using",q,"instead."));let $=M.morphAttributes.position||M.morphAttributes.normal||M.morphAttributes.color,ne=$!==void 0?$.length:0,xe=0;M.morphAttributes.position!==void 0&&(xe=1),M.morphAttributes.normal!==void 0&&(xe=2),M.morphAttributes.color!==void 0&&(xe=3);let Ce,j,ae,ye;if(Y){let ve=Zn[Y];Ce=ve.vertexShader,j=ve.fragmentShader}else{Ce=x.vertexShader,j=x.fragmentShader;let ve=a.getVertexShaderStage(x),ot=a.getFragmentShaderStage(x);a.update(x,ve,ot),ae=ve.id,ye=ot.id}let Ie=n.getRenderTarget(),ue=n.state.buffers.depth.getReversed(),Xe=k.isInstancedMesh===!0,Tt=k.isBatchedMesh===!0,Ue=!!x.map,rt=!!x.matcap,ct=!!F,$e=ct&&F.isPMREMTexture===!0,Ht=!!x.aoMap,Lt=!!x.lightMap,an=!!x.bumpMap&&x.wireframe===!1,gt=!!x.normalMap,On=!!x.displacementMap,Ot=!!x.emissiveMap,gn=!!x.metalnessMap,_n=!!x.roughnessMap,xn=x.anisotropy>0,B=x.clearcoat>0,yn=x.diffuseRoughness>0,ft=x.dispersion>0,pt=x.retroreflectivity>0,_e=x.iridescence>0,Dt=x.sheen>0,Ne=x.transmission>0,Ge=xn&&!!x.anisotropyMap,R=B&&!!x.clearcoatMap,v=B&&!!x.clearcoatNormalMap,V=B&&!!x.clearcoatRoughnessMap,re=yn&&!!x.diffuseRoughnessMap,ie=_e&&!!x.iridescenceMap,le=_e&&!!x.iridescenceThicknessMap,me=Dt&&!!x.sheenColorMap,Q=Dt&&!!x.sheenRoughnessMap,ee=!!x.specularMap,de=!!x.specularColorMap,D=!!x.specularIntensityMap,te=Ne&&!!x.transmissionMap,K=Ne&&!!x.thicknessMap,fe=!!x.gradientMap,ce=!!x.alphaMap,he=x.alphaTest>0,Pe=!!x.alphaHash,Ye=!!x.extensions,oe=qn;x.toneMapped&&(Ie===null||Ie.isXRRenderTarget===!0)&&(oe=n.toneMapping);let Le=$e?F.isCompressedCubeTexture?F.image[0].mipmaps:F.mipmaps:null,qe={shaderID:Y,shaderType:x.type,shaderName:x.name,vertexShader:Ce,fragmentShader:j,defines:x.defines,customVertexShaderID:ae,customFragmentShaderID:ye,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:q,batching:Tt,batchingColor:Tt&&k._colorsTexture!==null,instancing:Xe,instancingColor:Xe&&k.instanceColor!==null,instancingMorph:Xe&&k.morphTexture!==null,outputColorSpace:Ie===null?n.outputColorSpace:Ie.isXRRenderTarget===!0?Ie.texture.colorSpace:Qe.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Ue,matcap:rt,envMap:ct,envMapMode:ct&&F.mapping,envMapPMREM:$e,envMapMaxLod:$e?Le.length-1:null,envMapSize:$e?Le[0].width:null,aoMap:Ht,lightMap:Lt,bumpMap:an,normalMap:gt,displacementMap:On,emissiveMap:Ot,normalMapObjectSpace:gt&&x.normalMapType===Jd,normalMapTangentSpace:gt&&x.normalMapType===oc,packedNormalMap:gt&&x.normalMapType===oc&&ry(x.normalMap.format),metalnessMap:gn,roughnessMap:_n,anisotropy:xn,anisotropyMap:Ge,clearcoat:B,clearcoatMap:R,clearcoatNormalMap:v,clearcoatRoughnessMap:V,diffuseRoughness:yn,diffuseRoughnessMap:re,dispersion:ft,retroreflection:pt,iridescence:_e,iridescenceMap:ie,iridescenceThicknessMap:le,sheen:Dt,sheenColorMap:me,sheenRoughnessMap:Q,specularMap:ee,specularColorMap:de,specularIntensityMap:D,transmission:Ne,transmissionMap:te,thicknessMap:K,gradientMap:fe,opaque:x.transparent===!1&&x.blending===Fs&&x.alphaToCoverage===!1,alphaMap:ce,alphaTest:he,alphaHash:Pe,combine:x.combine,mapUv:Ue&&d(x.map.channel),aoMapUv:Ht&&d(x.aoMap.channel),lightMapUv:Lt&&d(x.lightMap.channel),bumpMapUv:an&&d(x.bumpMap.channel),normalMapUv:gt&&d(x.normalMap.channel),displacementMapUv:On&&d(x.displacementMap.channel),emissiveMapUv:Ot&&d(x.emissiveMap.channel),metalnessMapUv:gn&&d(x.metalnessMap.channel),roughnessMapUv:_n&&d(x.roughnessMap.channel),anisotropyMapUv:Ge&&d(x.anisotropyMap.channel),clearcoatMapUv:R&&d(x.clearcoatMap.channel),clearcoatNormalMapUv:v&&d(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:V&&d(x.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:re&&d(x.diffuseRoughnessMap.channel),iridescenceMapUv:ie&&d(x.iridescenceMap.channel),iridescenceThicknessMapUv:le&&d(x.iridescenceThicknessMap.channel),sheenColorMapUv:me&&d(x.sheenColorMap.channel),sheenRoughnessMapUv:Q&&d(x.sheenRoughnessMap.channel),specularMapUv:ee&&d(x.specularMap.channel),specularColorMapUv:de&&d(x.specularColorMap.channel),specularIntensityMapUv:D&&d(x.specularIntensityMap.channel),transmissionMapUv:te&&d(x.transmissionMap.channel),thicknessMapUv:K&&d(x.thicknessMap.channel),alphaMapUv:ce&&d(x.alphaMap.channel),vertexTangents:!!M.attributes.tangent&&(gt||xn),vertexNormals:!!M.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!M.attributes.color&&M.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!M.attributes.uv&&(Ue||ce),fog:!!J,useFog:x.fog===!0,fogExp2:!!J&&J.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||M.attributes.normal===void 0&&gt===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:ue,skinning:k.isSkinnedMesh===!0,hasPositionAttribute:M.attributes.position!==void 0,morphTargets:M.morphAttributes.position!==void 0,morphNormals:M.morphAttributes.normal!==void 0,morphColors:M.morphAttributes.color!==void 0,morphTargetsCount:ne,morphTextureStride:xe,numSunLights:E.sun.length,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numSunLightShadows:E.sunShadowMap.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:z.filter(ve=>ve.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:n.shadowMap.enabled&&U.length>0,shadowMapType:n.shadowMap.type,toneMapping:oe,decodeVideoTexture:Ue&&x.map.isVideoTexture===!0&&Qe.getTransfer(x.map.colorSpace)===it,decodeVideoTextureEmissive:Ot&&x.emissiveMap.isVideoTexture===!0&&Qe.getTransfer(x.emissiveMap.colorSpace)===it,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Xn,flipSided:x.side===rn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Ye&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ye&&x.extensions.multiDraw===!0||Tt)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return qe.vertexUv1s=c.has(1),qe.vertexUv2s=c.has(2),qe.vertexUv3s=c.has(3),c.clear(),qe}function y(x){let E=[];if(x.shaderID?E.push(x.shaderID):(E.push(x.customVertexShaderID),E.push(x.customFragmentShaderID)),x.defines!==void 0)for(let U in x.defines)E.push(U),E.push(x.defines[U]);return x.isRawShaderMaterial===!1&&(_(E,x),p(E,x),E.push(n.outputColorSpace)),E.push(x.customProgramCacheKey),E.join()}function _(x,E){x.push(E.precision),x.push(E.outputColorSpace),x.push(E.envMapMode),x.push(E.envMapPMREM),x.push(E.envMapMaxLod),x.push(E.envMapSize),x.push(E.mapUv),x.push(E.alphaMapUv),x.push(E.lightMapUv),x.push(E.aoMapUv),x.push(E.bumpMapUv),x.push(E.normalMapUv),x.push(E.displacementMapUv),x.push(E.emissiveMapUv),x.push(E.metalnessMapUv),x.push(E.roughnessMapUv),x.push(E.anisotropyMapUv),x.push(E.clearcoatMapUv),x.push(E.clearcoatNormalMapUv),x.push(E.clearcoatRoughnessMapUv),x.push(E.diffuseRoughnessMapUv),x.push(E.iridescenceMapUv),x.push(E.iridescenceThicknessMapUv),x.push(E.sheenColorMapUv),x.push(E.sheenRoughnessMapUv),x.push(E.specularMapUv),x.push(E.specularColorMapUv),x.push(E.specularIntensityMapUv),x.push(E.transmissionMapUv),x.push(E.thicknessMapUv),x.push(E.combine),x.push(E.fogExp2),x.push(E.sizeAttenuation),x.push(E.morphTargetsCount),x.push(E.numSunLights),x.push(E.numDirLights),x.push(E.numPointLights),x.push(E.numSpotLights),x.push(E.numSpotLightMaps),x.push(E.numHemiLights),x.push(E.numRectAreaLights),x.push(E.numSunLightShadows),x.push(E.numDirLightShadows),x.push(E.numPointLightShadows),x.push(E.numSpotLightShadows),x.push(E.numSpotLightShadowsWithMaps),x.push(E.numLightProbes),x.push(E.numLightProbeGrids),x.push(E.shadowMapType),x.push(E.toneMapping),x.push(E.numClippingPlanes),x.push(E.numClipIntersection),x.push(E.depthPacking)}function p(x,E){o.disableAll(),E.instancing&&o.enable(0),E.instancingColor&&o.enable(1),E.instancingMorph&&o.enable(2),E.matcap&&o.enable(3),E.envMap&&o.enable(4),E.normalMapObjectSpace&&o.enable(5),E.normalMapTangentSpace&&o.enable(6),E.clearcoat&&o.enable(7),E.iridescence&&o.enable(8),E.alphaTest&&o.enable(9),E.vertexColors&&o.enable(10),E.vertexAlphas&&o.enable(11),E.vertexUv1s&&o.enable(12),E.vertexUv2s&&o.enable(13),E.vertexUv3s&&o.enable(14),E.vertexTangents&&o.enable(15),E.anisotropy&&o.enable(16),E.alphaHash&&o.enable(17),E.batching&&o.enable(18),E.dispersion&&o.enable(19),E.retroreflection&&o.enable(24),E.diffuseRoughness&&o.enable(25),E.batchingColor&&o.enable(20),E.gradientMap&&o.enable(21),E.packedNormalMap&&o.enable(22),E.vertexNormals&&o.enable(23),x.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.reversedDepthBuffer&&o.enable(4),E.skinning&&o.enable(5),E.morphTargets&&o.enable(6),E.morphNormals&&o.enable(7),E.morphColors&&o.enable(8),E.premultipliedAlpha&&o.enable(9),E.shadowMapEnabled&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),E.decodeVideoTextureEmissive&&o.enable(20),E.alphaToCoverage&&o.enable(21),E.numLightProbeGrids>0&&o.enable(22),E.hasPositionAttribute&&o.enable(23),x.push(o.mask)}function S(x){let E=f[x.type],U;if(E){let I=Zn[E];U=df.clone(I.uniforms)}else U=x.uniforms;return U}function w(x,E){let U=h.get(E);return U!==void 0?++U.usedTimes:(U=new iy(n,E,x,s),l.push(U),h.set(E,U)),U}function T(x){if(--x.usedTimes===0){let E=l.indexOf(x);l[E]=l[l.length-1],l.pop(),h.delete(x.cacheKey),x.destroy()}}function A(x){a.remove(x)}function C(){a.dispose()}return{getParameters:g,getProgramCacheKey:y,getUniforms:S,acquireProgram:w,releaseProgram:T,releaseShaderCache:A,programs:l,dispose:C}}function ay(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,c){n.get(o)[a]=c}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function cy(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Lf(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Df(){let n=[],e=0,t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function o(f){let d=0;return f.isInstancedMesh&&(d+=2),f.isSkinnedMesh&&(d+=1),d}function a(f,d,g,y,_,p){let S=n[e];return S===void 0?(S={id:f.id,object:f,geometry:d,material:g,materialVariant:o(f),groupOrder:y,renderOrder:f.renderOrder,z:_,group:p},n[e]=S):(S.id=f.id,S.object=f,S.geometry=d,S.material=g,S.materialVariant=o(f),S.groupOrder=y,S.renderOrder=f.renderOrder,S.z=_,S.group=p),e++,S}function c(f,d,g,y,_,p,S){S.reversedDepth===!0&&(_=-_);let w=a(f,d,g,y,_,p);g.transmission>0?i.push(w):g.transparent===!0?s.push(w):t.push(w)}function l(f,d,g,y,_,p){let S=a(f,d,g,y,_,p);g.transmission>0?i.unshift(S):g.transparent===!0?s.unshift(S):t.unshift(S)}function h(f,d){t.length>1&&t.sort(f||cy),i.length>1&&i.sort(d||Lf),s.length>1&&s.sort(d||Lf)}function u(){for(let f=e,d=n.length;f<d;f++){let g=n[f];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:c,unshift:l,finish:u,sort:h}}function ly(){let n=new WeakMap;function e(i,s){let r=n.get(i),o;return r===void 0?(o=new Df,n.set(i,[o])):s>=r.length?(o=new Df,r.push(o)):o=r[s],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function hy(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new G,color:new Ve};break;case"SpotLight":t={position:new G,direction:new G,color:new Ve,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new G,color:new Ve,distance:0,decay:0};break;case"HemisphereLight":t={direction:new G,skyColor:new Ve,groundColor:new Ve};break;case"RectAreaLight":t={color:new Ve,position:new G,halfWidth:new G,halfHeight:new G};break}return n[e.id]=t,t}}}function uy(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ke};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ke};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ke,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var dy=0;function fy(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function py(n){let e=new hy,t=uy(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new G);let s=new G,r=new ut,o=new ut;function a(l){let h=0,u=0,f=0;for(let z=0;z<9;z++)i.probe[z].set(0,0,0);let d=0,g=0,y=0,_=0,p=0,S=0,w=0,T=0,A=0,C=0,x=0,E=0,U=0,I=0;l.sort(fy);for(let z=0,J=l.length;z<J;z++){let M=l[z],P=M.color,L=M.intensity,F=M.distance,Y=null;if(M.shadow&&M.shadow.map&&(M.shadow.map.texture.format===Ci?Y=M.shadow.map.texture:Y=M.shadow.map.depthTexture||M.shadow.map.texture),M.isAmbientLight)h+=P.r*L,u+=P.g*L,f+=P.b*L;else if(M.isLightProbe){for(let q=0;q<9;q++)i.probe[q].addScaledVector(M.sh.coefficients[q],L);I++}else if(M.isSunLight){let q=e.get(M);if(q.color.copy(M.color).multiplyScalar(M.intensity),M.castShadow){let $=M.shadow,ne=t.get(M);ne.shadowIntensity=$.intensity,ne.shadowBias=$.bias,ne.shadowNormalBias=$.normalBias,ne.shadowRadius=$.radius,ne.shadowMapSize.copy($.mapSize).multiply($.getFrameExtents()),i.sunShadow[g]=ne,i.sunShadowMap[g]=Y;let xe=$.getViewportCount();for(let Ce=0;Ce<xe;Ce++)i.sunShadowMatrix[y+Ce]=$.getMatrix(Ce),i.sunShadowCascade[y+Ce]=$._cascadeData[Ce];y+=xe,g++}i.sun[d]=q,d++}else if(M.isDirectionalLight){let q=e.get(M);if(q.color.copy(M.color).multiplyScalar(M.intensity),M.castShadow){let $=M.shadow,ne=t.get(M);ne.shadowIntensity=$.intensity,ne.shadowBias=$.bias,ne.shadowNormalBias=$.normalBias,ne.shadowRadius=$.radius,ne.shadowMapSize=$.mapSize,i.directionalShadow[_]=ne,i.directionalShadowMap[_]=Y,i.directionalShadowMatrix[_]=M.shadow.matrix,A++}i.directional[_]=q,_++}else if(M.isSpotLight){let q=e.get(M);q.position.setFromMatrixPosition(M.matrixWorld),q.color.copy(P).multiplyScalar(L),q.distance=F,q.coneCos=Math.cos(M.angle),q.penumbraCos=Math.cos(M.angle*(1-M.penumbra)),q.decay=M.decay,i.spot[S]=q;let $=M.shadow;if(M.map&&(i.spotLightMap[E]=M.map,E++,$.updateMatrices(M),M.castShadow&&U++),i.spotLightMatrix[S]=$.matrix,M.castShadow){let ne=t.get(M);ne.shadowIntensity=$.intensity,ne.shadowBias=$.bias,ne.shadowNormalBias=$.normalBias,ne.shadowRadius=$.radius,ne.shadowMapSize=$.mapSize,i.spotShadow[S]=ne,i.spotShadowMap[S]=Y,x++}S++}else if(M.isRectAreaLight){let q=e.get(M);q.color.copy(P).multiplyScalar(L),q.halfWidth.set(M.width*.5,0,0),q.halfHeight.set(0,M.height*.5,0),i.rectArea[w]=q,w++}else if(M.isPointLight){let q=e.get(M);if(q.color.copy(M.color).multiplyScalar(M.intensity),q.distance=M.distance,q.decay=M.decay,M.castShadow){let $=M.shadow,ne=t.get(M);ne.shadowIntensity=$.intensity,ne.shadowBias=$.bias,ne.shadowNormalBias=$.normalBias,ne.shadowRadius=$.radius,ne.shadowMapSize=$.mapSize,ne.shadowCameraNear=$.camera.near,ne.shadowCameraFar=$.camera.far,i.pointShadow[p]=ne,i.pointShadowMap[p]=Y,i.pointShadowMatrix[p]=M.shadow.matrix,C++}i.point[p]=q,p++}else if(M.isHemisphereLight){let q=e.get(M);q.skyColor.copy(M.color).multiplyScalar(L),q.groundColor.copy(M.groundColor).multiplyScalar(L),i.hemi[T]=q,T++}}w>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Se.LTC_FLOAT_1,i.rectAreaLTC2=Se.LTC_FLOAT_2):(i.rectAreaLTC1=Se.LTC_HALF_1,i.rectAreaLTC2=Se.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=f;let k=i.hash;(k.sunLength!==d||k.directionalLength!==_||k.pointLength!==p||k.spotLength!==S||k.rectAreaLength!==w||k.hemiLength!==T||k.numSunShadows!==g||k.numDirectionalShadows!==A||k.numPointShadows!==C||k.numSpotShadows!==x||k.numSpotMaps!==E||k.numLightProbes!==I)&&(i.sun.length=d,i.directional.length=_,i.spot.length=S,i.rectArea.length=w,i.point.length=p,i.hemi.length=T,i.sunShadow.length=g,i.sunShadowMap.length=g,i.sunShadowMatrix.length=y,i.sunShadowCascade.length=y,i.directionalShadow.length=A,i.directionalShadowMap.length=A,i.directionalShadowMatrix.length=A,i.pointShadow.length=C,i.pointShadowMap.length=C,i.pointShadowMatrix.length=C,i.spotShadow.length=x,i.spotShadowMap.length=x,i.spotLightMatrix.length=x+E-U,i.spotLightMap.length=E,i.numSpotLightShadowsWithMaps=U,i.numLightProbes=I,k.sunLength=d,k.directionalLength=_,k.pointLength=p,k.spotLength=S,k.rectAreaLength=w,k.hemiLength=T,k.numSunShadows=g,k.numDirectionalShadows=A,k.numPointShadows=C,k.numSpotShadows=x,k.numSpotMaps=E,k.numLightProbes=I,i.version=dy++)}function c(l,h){let u=0,f=0,d=0,g=0,y=0,_=0,p=h.matrixWorldInverse;for(let S=0,w=l.length;S<w;S++){let T=l[S];if(T.isSunLight){let A=i.sun[u];A.direction.setFromMatrixPosition(T.matrixWorld),A.direction.transformDirection(p),u++}else if(T.isDirectionalLight){let A=i.directional[f];A.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(p),f++}else if(T.isSpotLight){let A=i.spot[g];A.position.setFromMatrixPosition(T.matrixWorld),A.position.applyMatrix4(p),A.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(p),g++}else if(T.isRectAreaLight){let A=i.rectArea[y];A.position.setFromMatrixPosition(T.matrixWorld),A.position.applyMatrix4(p),o.identity(),r.copy(T.matrixWorld),r.premultiply(p),o.extractRotation(r),A.halfWidth.set(T.width*.5,0,0),A.halfHeight.set(0,T.height*.5,0),A.halfWidth.applyMatrix4(o),A.halfHeight.applyMatrix4(o),y++}else if(T.isPointLight){let A=i.point[d];A.position.setFromMatrixPosition(T.matrixWorld),A.position.applyMatrix4(p),d++}else if(T.isHemisphereLight){let A=i.hemi[_];A.direction.setFromMatrixPosition(T.matrixWorld),A.direction.transformDirection(p),_++}}}return{setup:a,setupView:c,state:i}}function Nf(n){let e=new py(n),t=[],i=[],s=[];function r(u){h.camera=u,t.length=0,i.length=0,s.length=0}function o(u){u.isLightProbeGrid?s.push(u):t.push(u)}function a(u){i.push(u)}function c(){e.setup(t),s.sort((u,f)=>u.priority-f.priority||u.id-f.id)}function l(u){e.setupView(t,u)}let h={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function my(n){let e=new WeakMap;function t(s,r=0){let o=e.get(s),a;return o===void 0?(a=new Nf(n),e.set(s,[a])):r>=o.length?(a=new Nf(n),o.push(a)):a=o[r],a}function i(){e=new WeakMap}return{get:t,dispose:i}}var gy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,_y=`uniform sampler2D shadow_pass;
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
}`,xy=[new G(1,0,0),new G(-1,0,0),new G(0,1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1)],yy=[new G(0,-1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1),new G(0,-1,0),new G(0,-1,0)],Uf=new ut,Gr=new G,lh=new G;function vy(n,e,t){let i=new bi,s=new ke,r=new ke,o=new mt,a=new oa,c=new aa,l={},h=t.maxTextureSize,u={[wi]:rn,[rn]:wi,[Xn]:Xn},f=new Wn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ke},radius:{value:4}},vertexShader:gy,fragmentShader:_y}),d=f.clone();d.defines.HORIZONTAL_PASS=1;let g=new Ct;g.setAttribute("position",new zt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new st(g,f),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Wi;let p=this.type;this.render=function(C,x,E){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||C.length===0)return;this.type===Ad&&(Oe("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Wi);let U=n.getRenderTarget(),I=n.getActiveCubeFace(),k=n.getActiveMipmapLevel(),z=n.state;z.setBlending(Xi),z.buffers.depth.getReversed()===!0?z.buffers.color.setClear(0,0,0,0):z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);let J=p!==this.type;J&&x.traverse(function(M){M.material&&(Array.isArray(M.material)?M.material.forEach(P=>P.needsUpdate=!0):M.material.needsUpdate=!0)});for(let M=0,P=C.length;M<P;M++){let L=C[M],F=L.shadow;if(F===void 0){Oe("WebGLShadowMap:",L,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;s.copy(F.mapSize);let Y=F.getFrameExtents();s.multiply(Y),r.copy(F.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/Y.x),s.x=r.x*Y.x,F.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/Y.y),s.y=r.y*Y.y,F.mapSize.y=r.y));let q=n.state.buffers.depth.getReversed();if(F.camera._reversedDepth=q,F.map===null||J===!0){if(F.map!==null&&(F.map.depthTexture!==null&&(F.map.depthTexture.dispose(),F.map.depthTexture=null),F.map.dispose()),this.type===Os){if(L.isPointLight){Oe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}F.map=new dn(s.x,s.y,{format:Ci,type:Ln,minFilter:nn,magFilter:nn,generateMipmaps:!1}),F.map.texture.name=L.name+".shadowMap",F.map.depthTexture=new ai(s.x,s.y,In),F.map.depthTexture.name=L.name+".shadowMapDepth",F.map.depthTexture.format=ri,F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=Gt,F.map.depthTexture.magFilter=Gt}else L.isPointLight?(F.map=new Vr(s.x),F.map.depthTexture=new Mr(s.x,Pn)):(F.map=new dn(s.x,s.y),F.map.depthTexture=new ai(s.x,s.y,Pn)),F.map.depthTexture.name=L.name+".shadowMap",F.map.depthTexture.format=ri,this.type===Wi?(F.map.depthTexture.compareFunction=q?Jl:Zl,F.map.depthTexture.minFilter=nn,F.map.depthTexture.magFilter=nn):(F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=Gt,F.map.depthTexture.magFilter=Gt);F.camera.updateProjectionMatrix()}F.map.isWebGLCubeRenderTarget!==!0&&(F.map.width!==s.x||F.map.height!==s.y)&&F.map.setSize(s.x,s.y);let $=F.map.isWebGLCubeRenderTarget?6:F.getViewportCount();L.isPointLight!==!0&&F.updateMatrices(L,E);let ne=(F.camera.layers.mask&4294967294)!==0?F.camera.layers:E.layers;for(let xe=0;xe<$;xe++){let Ce=F.getCamera(xe);if(L.isPointLight){let j=F.camera,ae=F.matrix,ye=L.distance||j.far;ye!==j.far&&(j.far=ye,j.updateProjectionMatrix()),Gr.setFromMatrixPosition(L.matrixWorld),j.position.copy(Gr),lh.copy(j.position),lh.add(xy[xe]),j.up.copy(yy[xe]),j.lookAt(lh),j.updateMatrixWorld(),ae.makeTranslation(-Gr.x,-Gr.y,-Gr.z),Uf.multiplyMatrices(j.projectionMatrix,j.matrixWorldInverse),F._frustum.setFromProjectionMatrix(Uf,j.coordinateSystem,j.reversedDepth)}if(F.map.isWebGLCubeRenderTarget)n.setRenderTarget(F.map,xe),n.clear();else{xe===0&&(n.setRenderTarget(F.map),n.clear());let j=F.getViewport(xe);o.set(r.x*j.x,r.y*j.y,r.x*j.z,r.y*j.w),z.viewport(o)}i=F.getFrustum(xe),T(x,E,Ce,L,ne,this.type)}F.isPointLightShadow!==!0&&this.type===Os&&S(F,E),F.needsUpdate=!1}p=this.type,_.needsUpdate=!1,n.setRenderTarget(U,I,k)};function S(C,x){let E=e.update(y);f.defines.VSM_SAMPLES!==C.blurSamples&&(f.defines.VSM_SAMPLES=C.blurSamples,d.defines.VSM_SAMPLES=C.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),C.mapPass===null?C.mapPass=new dn(s.x,s.y,{format:Ci,type:Ln}):(C.mapPass.width!==C.map.width||C.mapPass.height!==C.map.height)&&C.mapPass.setSize(C.map.width,C.map.height),f.uniforms.shadow_pass.value=C.map.depthTexture,f.uniforms.resolution.value.set(C.map.width,C.map.height),f.uniforms.radius.value=C.radius,n.setRenderTarget(C.mapPass),n.clear(),n.renderBufferDirect(x,null,E,f,y,null),d.uniforms.shadow_pass.value=C.mapPass.texture,d.uniforms.resolution.value.set(C.map.width,C.map.height),d.uniforms.radius.value=C.radius,n.setRenderTarget(C.map),n.clear(),n.renderBufferDirect(x,null,E,d,y,null)}function w(C,x,E,U){let I=null,k=E.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(k!==void 0)I=k;else if(I=E.isPointLight===!0?c:a,n.localClippingEnabled&&x.clipShadows===!0&&Array.isArray(x.clippingPlanes)&&x.clippingPlanes.length!==0||x.displacementMap&&x.displacementScale!==0||x.alphaMap&&x.alphaTest>0||x.map&&x.alphaTest>0||x.alphaToCoverage===!0){let z=I.uuid,J=x.uuid,M=l[z];M===void 0&&(M={},l[z]=M);let P=M[J];P===void 0&&(P=I.clone(),M[J]=P,x.addEventListener("dispose",A)),I=P}if(I.visible=x.visible,I.wireframe=x.wireframe,U===Os?I.side=x.shadowSide!==null?x.shadowSide:x.side:I.side=x.shadowSide!==null?x.shadowSide:u[x.side],I.alphaMap=x.alphaMap,I.alphaTest=x.alphaToCoverage===!0?.5:x.alphaTest,I.map=x.map,I.clipShadows=x.clipShadows,I.clippingPlanes=x.clippingPlanes,I.clipIntersection=x.clipIntersection,I.displacementMap=x.displacementMap,I.displacementScale=x.displacementScale,I.displacementBias=x.displacementBias,I.wireframeLinewidth=x.wireframeLinewidth,I.linewidth=x.linewidth,E.isPointLight===!0&&I.isMeshDistanceMaterial===!0){let z=n.properties.get(I);z.light=E}return I}function T(C,x,E,U,I,k){if(C.visible===!1)return;if(C.layers.test(I)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&k===Os)&&(!C.frustumCulled||C.intersectsFrustum(i))){C.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,C.matrixWorld);let M=e.update(C),P=C.material;if(Array.isArray(P)){let L=M.groups;for(let F=0,Y=L.length;F<Y;F++){let q=L[F],$=P[q.materialIndex];if($&&$.visible){let ne=w(C,$,U,k);C.onBeforeShadow(n,C,x,E,M,ne,q),n.renderBufferDirect(E,null,M,ne,C,q),C.onAfterShadow(n,C,x,E,M,ne,q)}}}else if(P.visible){let L=w(C,P,U,k);C.onBeforeShadow(n,C,x,E,M,L,null),n.renderBufferDirect(E,null,M,L,C,null),C.onAfterShadow(n,C,x,E,M,L,null)}}let J=C.children;for(let M=0,P=J.length;M<P;M++)T(J[M],x,E,U,I,k)}function A(C){C.target.removeEventListener("dispose",A);for(let E in l){let U=l[E],I=C.target.uuid;I in U&&(U[I].dispose(),delete U[I])}}}function Sy(n,e){function t(){let D=!1,te=new mt,K=null,fe=new mt(0,0,0,0);return{setMask:function(ce){K!==ce&&!D&&(n.colorMask(ce,ce,ce,ce),K=ce)},setLocked:function(ce){D=ce},setClear:function(ce,he,Pe,Ye,oe){oe===!0&&(ce*=Ye,he*=Ye,Pe*=Ye),te.set(ce,he,Pe,Ye),fe.equals(te)===!1&&(n.clearColor(ce,he,Pe,Ye),fe.copy(te))},reset:function(){D=!1,K=null,fe.set(-1,0,0,0)}}}function i(){let D=!1,te=!1,K=null,fe=null,ce=null;return{setReversed:function(he){if(te!==he){let Pe=e.get("EXT_clip_control");he?Pe.clipControlEXT(Pe.LOWER_LEFT_EXT,Pe.ZERO_TO_ONE_EXT):Pe.clipControlEXT(Pe.LOWER_LEFT_EXT,Pe.NEGATIVE_ONE_TO_ONE_EXT),te=he;let Ye=ce;ce=null,this.setClear(Ye)}},getReversed:function(){return te},setTest:function(he){he?ue(n.DEPTH_TEST):Xe(n.DEPTH_TEST)},setMask:function(he){K!==he&&!D&&(n.depthMask(he),K=he)},setFunc:function(he){if(te&&(he=of[he]),fe!==he){switch(he){case Wo:n.depthFunc(n.NEVER);break;case Xo:n.depthFunc(n.ALWAYS);break;case qo:n.depthFunc(n.LESS);break;case Es:n.depthFunc(n.LEQUAL);break;case Yo:n.depthFunc(n.EQUAL);break;case Zo:n.depthFunc(n.GEQUAL);break;case Jo:n.depthFunc(n.GREATER);break;case $o:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}fe=he}},setLocked:function(he){D=he},setClear:function(he){ce!==he&&(ce=he,te&&(he=1-he),n.clearDepth(he))},reset:function(){D=!1,K=null,fe=null,ce=null,te=!1}}}function s(){let D=!1,te=null,K=null,fe=null,ce=null,he=null,Pe=null,Ye=null,oe=null;return{setTest:function(Le){D||(Le?ue(n.STENCIL_TEST):Xe(n.STENCIL_TEST))},setMask:function(Le){te!==Le&&!D&&(n.stencilMask(Le),te=Le)},setFunc:function(Le,qe,ve){(K!==Le||fe!==qe||ce!==ve)&&(n.stencilFunc(Le,qe,ve),K=Le,fe=qe,ce=ve)},setOp:function(Le,qe,ve){(he!==Le||Pe!==qe||Ye!==ve)&&(n.stencilOp(Le,qe,ve),he=Le,Pe=qe,Ye=ve)},setLocked:function(Le){D=Le},setClear:function(Le){oe!==Le&&(n.clearStencil(Le),oe=Le)},reset:function(){D=!1,te=null,K=null,fe=null,ce=null,he=null,Pe=null,Ye=null,oe=null}}}let r=new t,o=new i,a=new s,c={},l=new WeakMap,h={},u={},f={},d=new WeakMap,g=[],y=null,_=!1,p=null,S=null,w=null,T=null,A=null,C=null,x=null,E=new Ve(0,0,0),U=0,I=!1,k=null,z=null,J=null,M=null,P=null,L=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),F=!1,Y=0,q=n.getParameter(n.VERSION);q.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(q)[1]),F=Y>=1):q.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),F=Y>=2);let $=null,ne={},xe=n.getParameter(n.SCISSOR_BOX),Ce=n.getParameter(n.VIEWPORT),j=new mt().fromArray(xe),ae=new mt().fromArray(Ce);function ye(D,te,K,fe){let ce=new Uint8Array(4),he=n.createTexture();n.bindTexture(D,he),n.texParameteri(D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(D,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Pe=0;Pe<K;Pe++)D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY?n.texImage3D(te,0,n.RGBA,1,1,fe,0,n.RGBA,n.UNSIGNED_BYTE,ce):n.texImage2D(te+Pe,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ce);return he}let Ie={};Ie[n.TEXTURE_2D]=ye(n.TEXTURE_2D,n.TEXTURE_2D,1),Ie[n.TEXTURE_CUBE_MAP]=ye(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ie[n.TEXTURE_2D_ARRAY]=ye(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Ie[n.TEXTURE_3D]=ye(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ue(n.DEPTH_TEST),o.setFunc(Es),an(!1),gt(Cl),ue(n.CULL_FACE),Ht(Xi);function ue(D){h[D]!==!0&&(n.enable(D),h[D]=!0)}function Xe(D){h[D]!==!1&&(n.disable(D),h[D]=!1)}function Tt(D,te){return f[D]!==te?(n.bindFramebuffer(D,te),f[D]=te,D===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=te),D===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=te),!0):!1}function Ue(D,te){let K=g,fe=!1;if(D){K=d.get(te),K===void 0&&(K=[],d.set(te,K));let ce=D.textures;if(K.length!==ce.length||K[0]!==n.COLOR_ATTACHMENT0){for(let he=0,Pe=ce.length;he<Pe;he++)K[he]=n.COLOR_ATTACHMENT0+he;K.length=ce.length,fe=!0}}else K[0]!==n.BACK&&(K[0]=n.BACK,fe=!0);fe&&n.drawBuffers(K)}function rt(D){return y!==D?(n.useProgram(D),y=D,!0):!1}let ct={[Yi]:n.FUNC_ADD,[Cd]:n.FUNC_SUBTRACT,[Rd]:n.FUNC_REVERSE_SUBTRACT};ct[Pd]=n.MIN,ct[Id]=n.MAX;let $e={[Ld]:n.ZERO,[Dd]:n.ONE,[Nd]:n.SRC_COLOR,[Il]:n.SRC_ALPHA,[zd]:n.SRC_ALPHA_SATURATE,[kd]:n.DST_COLOR,[Od]:n.DST_ALPHA,[Ud]:n.ONE_MINUS_SRC_COLOR,[Ll]:n.ONE_MINUS_SRC_ALPHA,[Bd]:n.ONE_MINUS_DST_COLOR,[Fd]:n.ONE_MINUS_DST_ALPHA,[Gd]:n.CONSTANT_COLOR,[Hd]:n.ONE_MINUS_CONSTANT_COLOR,[Vd]:n.CONSTANT_ALPHA,[Wd]:n.ONE_MINUS_CONSTANT_ALPHA};function Ht(D,te,K,fe,ce,he,Pe,Ye,oe,Le){if(D===Xi){_===!0&&(Xe(n.BLEND),_=!1);return}if(_===!1&&(ue(n.BLEND),_=!0),D!==wd){if(D!==p||Le!==I){if((S!==Yi||A!==Yi)&&(n.blendEquation(n.FUNC_ADD),S=Yi,A=Yi),Le)switch(D){case Fs:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case qi:n.blendFunc(n.ONE,n.ONE);break;case Rl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Pl:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Fe("WebGLState: Invalid blending: ",D);break}else switch(D){case Fs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case qi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Rl:Fe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Pl:Fe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Fe("WebGLState: Invalid blending: ",D);break}w=null,T=null,C=null,x=null,E.set(0,0,0),U=0,p=D,I=Le}return}ce=ce||te,he=he||K,Pe=Pe||fe,(te!==S||ce!==A)&&(n.blendEquationSeparate(ct[te],ct[ce]),S=te,A=ce),(K!==w||fe!==T||he!==C||Pe!==x)&&(n.blendFuncSeparate($e[K],$e[fe],$e[he],$e[Pe]),w=K,T=fe,C=he,x=Pe),(Ye.equals(E)===!1||oe!==U)&&(n.blendColor(Ye.r,Ye.g,Ye.b,oe),E.copy(Ye),U=oe),p=D,I=!1}function Lt(D,te){D.side===Xn?Xe(n.CULL_FACE):ue(n.CULL_FACE);let K=D.side===rn;te&&(K=!K),an(K),D.blending===Fs&&D.transparent===!1?Ht(Xi):Ht(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),r.setMask(D.colorWrite);let fe=D.stencilWrite;a.setTest(fe),fe&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Ot(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?ue(n.SAMPLE_ALPHA_TO_COVERAGE):Xe(n.SAMPLE_ALPHA_TO_COVERAGE)}function an(D){k!==D&&(D?n.frontFace(n.CW):n.frontFace(n.CCW),k=D)}function gt(D){D!==Td?(ue(n.CULL_FACE),D!==z&&(D===Cl?n.cullFace(n.BACK):D===Ed?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Xe(n.CULL_FACE),z=D}function On(D){D!==J&&(F&&n.lineWidth(D),J=D)}function Ot(D,te,K){D?(ue(n.POLYGON_OFFSET_FILL),(M!==te||P!==K)&&(M=te,P=K,o.getReversed()&&(te=-te,K=-K),n.polygonOffset(te,K))):Xe(n.POLYGON_OFFSET_FILL)}function gn(D){D?ue(n.SCISSOR_TEST):Xe(n.SCISSOR_TEST)}function _n(D){D===void 0&&(D=n.TEXTURE0+L-1),$!==D&&(n.activeTexture(D),$=D)}function xn(D,te,K){K===void 0&&($===null?K=n.TEXTURE0+L-1:K=$);let fe=ne[K];fe===void 0&&(fe={type:void 0,texture:void 0},ne[K]=fe),(fe.type!==D||fe.texture!==te)&&($!==K&&(n.activeTexture(K),$=K),n.bindTexture(D,te||Ie[D]),fe.type=D,fe.texture=te)}function B(){let D=ne[$];D!==void 0&&D.type!==void 0&&(n.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function yn(){try{n.compressedTexImage2D(...arguments)}catch(D){Fe("WebGLState:",D)}}function ft(){try{n.compressedTexImage3D(...arguments)}catch(D){Fe("WebGLState:",D)}}function pt(){try{n.texSubImage2D(...arguments)}catch(D){Fe("WebGLState:",D)}}function _e(){try{n.texSubImage3D(...arguments)}catch(D){Fe("WebGLState:",D)}}function Dt(){try{n.compressedTexSubImage2D(...arguments)}catch(D){Fe("WebGLState:",D)}}function Ne(){try{n.compressedTexSubImage3D(...arguments)}catch(D){Fe("WebGLState:",D)}}function Ge(){try{n.texStorage2D(...arguments)}catch(D){Fe("WebGLState:",D)}}function R(){try{n.texStorage3D(...arguments)}catch(D){Fe("WebGLState:",D)}}function v(){try{n.texImage2D(...arguments)}catch(D){Fe("WebGLState:",D)}}function V(){try{n.texImage3D(...arguments)}catch(D){Fe("WebGLState:",D)}}function re(D){return u[D]!==void 0?u[D]:n.getParameter(D)}function ie(D,te){u[D]!==te&&(n.pixelStorei(D,te),u[D]=te)}function le(D){j.equals(D)===!1&&(n.scissor(D.x,D.y,D.z,D.w),j.copy(D))}function me(D){ae.equals(D)===!1&&(n.viewport(D.x,D.y,D.z,D.w),ae.copy(D))}function Q(D,te){let K=l.get(te);K===void 0&&(K=new WeakMap,l.set(te,K));let fe=K.get(D);fe===void 0&&(fe=n.getUniformBlockIndex(te,D.name),n.uniformBlockBinding(te,fe,fe),K.set(D,fe))}function ee(D,te,K){let ce=l.get(te).get(D);c[ce]!==K&&(n.bindBufferBase(n.UNIFORM_BUFFER,ce,K),c[ce]=K)}function de(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),h={},u={},$=null,ne={},f={},c={},d=new WeakMap,g=[],y=null,_=!1,p=null,S=null,w=null,T=null,A=null,C=null,x=null,E=new Ve(0,0,0),U=0,I=!1,k=null,z=null,J=null,M=null,P=null,j.set(0,0,n.canvas.width,n.canvas.height),ae.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ue,disable:Xe,bindFramebuffer:Tt,drawBuffers:Ue,useProgram:rt,setBlending:Ht,setMaterial:Lt,setFlipSided:an,setCullFace:gt,setLineWidth:On,setPolygonOffset:Ot,setScissorTest:gn,activeTexture:_n,bindTexture:xn,unbindTexture:B,compressedTexImage2D:yn,compressedTexImage3D:ft,texImage2D:v,texImage3D:V,pixelStorei:ie,getParameter:re,updateUBOMapping:Q,uniformBlockBinding:ee,texStorage2D:Ge,texStorage3D:R,texSubImage2D:pt,texSubImage3D:_e,compressedTexSubImage2D:Dt,compressedTexSubImage3D:Ne,scissor:le,viewport:me,reset:de}}function by(n,e,t,i,s,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ke,h=new WeakMap,u=new Set,f,d=new WeakMap,g=new Set,y=new FinalizationRegistry(R=>g.delete(R)),_=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(R,v){return _?new OffscreenCanvas(R,v):ur("canvas")}function S(R,v,V){let re=1,ie=Ge(R);if((ie.width>V||ie.height>V)&&(re=V/Math.max(ie.width,ie.height)),re<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){let le=Math.floor(re*ie.width),me=Math.floor(re*ie.height);f===void 0&&(f=p(le,me));let Q=v?p(le,me):f;return Q.width=le,Q.height=me,Q.getContext("2d").drawImage(R,0,0,le,me),Oe("WebGLRenderer: Texture has been resized from ("+ie.width+"x"+ie.height+") to ("+le+"x"+me+")."),Q}else return"data"in R&&Oe("WebGLRenderer: Image in DataTexture is too big ("+ie.width+"x"+ie.height+")."),R;return R}function w(R){return R.generateMipmaps}function T(R){n.generateMipmap(R)}function A(R){return R.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?n.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function C(R,v,V,re,ie,le=!1){if(R!==null){if(n[R]!==void 0)return n[R];Oe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let me;re&&(me=e.get("EXT_texture_norm16"),me||Oe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=v;if(v===n.RED&&(V===n.FLOAT&&(Q=n.R32F),V===n.HALF_FLOAT&&(Q=n.R16F),V===n.UNSIGNED_BYTE&&(Q=n.R8),V===n.UNSIGNED_SHORT&&me&&(Q=me.R16_EXT),V===n.SHORT&&me&&(Q=me.R16_SNORM_EXT)),v===n.RED_INTEGER&&(V===n.UNSIGNED_BYTE&&(Q=n.R8UI),V===n.UNSIGNED_SHORT&&(Q=n.R16UI),V===n.UNSIGNED_INT&&(Q=n.R32UI),V===n.BYTE&&(Q=n.R8I),V===n.SHORT&&(Q=n.R16I),V===n.INT&&(Q=n.R32I)),v===n.RG&&(V===n.FLOAT&&(Q=n.RG32F),V===n.HALF_FLOAT&&(Q=n.RG16F),V===n.UNSIGNED_BYTE&&(Q=n.RG8),V===n.UNSIGNED_SHORT&&me&&(Q=me.RG16_EXT),V===n.SHORT&&me&&(Q=me.RG16_SNORM_EXT)),v===n.RG_INTEGER&&(V===n.UNSIGNED_BYTE&&(Q=n.RG8UI),V===n.UNSIGNED_SHORT&&(Q=n.RG16UI),V===n.UNSIGNED_INT&&(Q=n.RG32UI),V===n.BYTE&&(Q=n.RG8I),V===n.SHORT&&(Q=n.RG16I),V===n.INT&&(Q=n.RG32I)),v===n.RGB_INTEGER&&(V===n.UNSIGNED_BYTE&&(Q=n.RGB8UI),V===n.UNSIGNED_SHORT&&(Q=n.RGB16UI),V===n.UNSIGNED_INT&&(Q=n.RGB32UI),V===n.BYTE&&(Q=n.RGB8I),V===n.SHORT&&(Q=n.RGB16I),V===n.INT&&(Q=n.RGB32I)),v===n.RGBA_INTEGER&&(V===n.UNSIGNED_BYTE&&(Q=n.RGBA8UI),V===n.UNSIGNED_SHORT&&(Q=n.RGBA16UI),V===n.UNSIGNED_INT&&(Q=n.RGBA32UI),V===n.BYTE&&(Q=n.RGBA8I),V===n.SHORT&&(Q=n.RGBA16I),V===n.INT&&(Q=n.RGBA32I)),v===n.RGB&&(V===n.UNSIGNED_SHORT&&me&&(Q=me.RGB16_EXT),V===n.SHORT&&me&&(Q=me.RGB16_SNORM_EXT),V===n.UNSIGNED_INT_5_9_9_9_REV&&(Q=n.RGB9_E5),V===n.UNSIGNED_INT_10F_11F_11F_REV&&(Q=n.R11F_G11F_B10F)),v===n.RGBA){let ee=le?hr:Qe.getTransfer(ie);V===n.FLOAT&&(Q=n.RGBA32F),V===n.HALF_FLOAT&&(Q=n.RGBA16F),V===n.UNSIGNED_BYTE&&(Q=ee===it?n.SRGB8_ALPHA8:n.RGBA8),V===n.UNSIGNED_SHORT&&me&&(Q=me.RGBA16_EXT),V===n.SHORT&&me&&(Q=me.RGBA16_SNORM_EXT),V===n.UNSIGNED_SHORT_4_4_4_4&&(Q=n.RGBA4),V===n.UNSIGNED_SHORT_5_5_5_1&&(Q=n.RGB5_A1)}return(Q===n.R16F||Q===n.R32F||Q===n.RG16F||Q===n.RG32F||Q===n.RGBA16F||Q===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function x(R,v){let V;return R?v===null||v===Pn||v===Ji?V=n.DEPTH24_STENCIL8:v===In?V=n.DEPTH32F_STENCIL8:v===Bs&&(V=n.DEPTH24_STENCIL8,Oe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Pn||v===Ji?V=n.DEPTH_COMPONENT24:v===In?V=n.DEPTH_COMPONENT32F:v===Bs&&(V=n.DEPTH_COMPONENT16),V}function E(R,v){return w(R)===!0||R.isFramebufferTexture&&R.minFilter!==Gt&&R.minFilter!==nn?Math.log2(Math.max(v.width,v.height))+1:R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?v.mipmaps.length:1}function U(R){let v=new WeakRef(R);i.get(R).__ref=v,g.add(v),y.register(R,v,v)}function I(R){let v=i.get(R).__ref;v!==void 0&&(g.delete(v),y.unregister(v))}function k(R){J(R.target)}function z(R){M(R.target)}function J(R){R.removeEventListener("dispose",k),I(R),L(R),R.isVideoTexture&&h.delete(R),R.isHTMLTexture&&u.delete(R)}function M(R){R.removeEventListener("dispose",z),I(R),Y(R)}function P(){for(let R of g){let v=R.deref();v!==void 0&&(v.isRenderTarget===!0?M(v):J(v))}g.clear(),u.clear()}function L(R){let v=i.get(R);if(v.__webglInit===void 0)return;let V=R.source,re=d.get(V);if(re){let ie=re[v.__cacheKey];ie.usedTimes--,ie.usedTimes===0&&F(R),Object.keys(re).length===0&&d.delete(V)}i.remove(R)}function F(R){let v=i.get(R);n.deleteTexture(v.__webglTexture);let V=R.source,re=d.get(V);delete re[v.__cacheKey],o.memory.textures--}function Y(R){let v=i.get(R);v.__depthDisposeCallback&&v.__depthDisposeCallback();let V=R.depthTexture;if(V&&V.renderTarget===R&&J(V),R.isWebGLCubeRenderTarget)for(let ie=0;ie<6;ie++){if(Array.isArray(v.__webglFramebuffer[ie]))for(let le=0;le<v.__webglFramebuffer[ie].length;le++)n.deleteFramebuffer(v.__webglFramebuffer[ie][le]);else n.deleteFramebuffer(v.__webglFramebuffer[ie]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[ie])}else{if(Array.isArray(v.__webglFramebuffer))for(let ie=0;ie<v.__webglFramebuffer.length;ie++)n.deleteFramebuffer(v.__webglFramebuffer[ie]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let ie=0;ie<v.__webglColorRenderbuffer.length;ie++)v.__webglColorRenderbuffer[ie]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[ie]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let re=R.textures;for(let ie=0,le=re.length;ie<le;ie++){let me=i.get(re[ie]);me.__webglTexture&&(n.deleteTexture(me.__webglTexture),o.memory.textures--),i.remove(re[ie])}i.remove(R)}let q=0;function $(){q=0}function ne(){return q}function xe(R){q=R}function Ce(){let R=q;return R>=s.maxTextures&&Oe("WebGLTextures: Trying to use "+(R+1)+" texture units while this GPU supports only "+s.maxTextures),q+=1,R}function j(R){let v=[];return v.push(R.wrapS),v.push(R.wrapT),v.push(R.wrapR||0),v.push(R.magFilter),v.push(R.minFilter),v.push(R.anisotropy),v.push(R.internalFormat),v.push(R.format),v.push(R.type),v.push(R.generateMipmaps),v.push(R.mipmapsAutoUpdate),v.push(R.premultiplyAlpha),v.push(R.flipY),v.push(R.unpackAlignment),v.push(R.colorSpace),v.join()}function ae(R,v){let V=i.get(R);if(R.isVideoTexture&&Dt(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&V.__version!==R.version){let re=R.image;if(re===null)Oe("WebGLRenderer: Texture marked for update but no image data found.");else if(re.complete===!1)Oe("WebGLRenderer: Texture marked for update but image is incomplete");else{Lt(V,R,v);return}}else R.isExternalTexture&&(V.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,V.__webglTexture,n.TEXTURE0+v)}function ye(R,v){let V=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&V.__version!==R.version){Lt(V,R,v);return}else R.isExternalTexture&&(V.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,V.__webglTexture,n.TEXTURE0+v)}function Ie(R,v){let V=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&V.__version!==R.version){Lt(V,R,v);return}t.bindTexture(n.TEXTURE_3D,V.__webglTexture,n.TEXTURE0+v)}function ue(R,v){let V=i.get(R);if(R.version>0&&V.__version!==R.version){an(V,R,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture,n.TEXTURE0+v)}let Xe={[As]:n.REPEAT,[kn]:n.CLAMP_TO_EDGE,[jo]:n.MIRRORED_REPEAT},Tt={[Gt]:n.NEAREST,[Yd]:n.NEAREST_MIPMAP_NEAREST,[Nr]:n.NEAREST_MIPMAP_LINEAR,[nn]:n.LINEAR,[Ma]:n.LINEAR_MIPMAP_NEAREST,[li]:n.LINEAR_MIPMAP_LINEAR},Ue={[jd]:n.NEVER,[$l]:n.ALWAYS,[Kd]:n.LESS,[Zl]:n.LEQUAL,[Qd]:n.EQUAL,[Jl]:n.GEQUAL,[ef]:n.GREATER,[tf]:n.NOTEQUAL};function rt(R,v){if(v.type===In&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===nn||v.magFilter===Ma||v.magFilter===Nr||v.magFilter===li||v.minFilter===nn||v.minFilter===Ma||v.minFilter===Nr||v.minFilter===li)&&Oe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(R,n.TEXTURE_WRAP_S,Xe[v.wrapS]),n.texParameteri(R,n.TEXTURE_WRAP_T,Xe[v.wrapT]),(R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY)&&n.texParameteri(R,n.TEXTURE_WRAP_R,Xe[v.wrapR]),n.texParameteri(R,n.TEXTURE_MAG_FILTER,Tt[v.magFilter]),n.texParameteri(R,n.TEXTURE_MIN_FILTER,Tt[v.minFilter]),v.compareFunction&&(n.texParameteri(R,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(R,n.TEXTURE_COMPARE_FUNC,Ue[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Gt||v.minFilter!==Nr&&v.minFilter!==li||v.type===In&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){let V=e.get("EXT_texture_filter_anisotropic");n.texParameterf(R,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function ct(R,v){let V=!1;R.__webglInit===void 0&&(R.__webglInit=!0,v.addEventListener("dispose",k),U(v));let re=v.source,ie=d.get(re);ie===void 0&&(ie={},d.set(re,ie));let le=j(v);if(le!==R.__cacheKey){ie[le]===void 0&&(ie[le]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,V=!0),ie[le].usedTimes++;let me=ie[R.__cacheKey];me!==void 0&&(ie[R.__cacheKey].usedTimes--,me.usedTimes===0&&F(v)),R.__cacheKey=le,R.__webglTexture=ie[le].texture}return V}function $e(R,v,V){return Math.floor(Math.floor(R/V)/v)}function Ht(R,v,V,re){let le=R.updateRanges;if(le.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,v.width,v.height,V,re,v.data);else{le.sort((D,te)=>D.start-te.start);let me=0;for(let D=1;D<le.length;D++){let te=le[me],K=le[D],fe=te.start+te.count,ce=$e(K.start,v.width,4),he=$e(te.start,v.width,4);K.start<=fe+1&&ce===he&&$e(K.start+K.count-1,v.width,4)===ce?te.count=Math.max(te.count,K.start+K.count-te.start):(++me,le[me]=K)}le.length=me+1;let Q=t.getParameter(n.UNPACK_ROW_LENGTH),ee=t.getParameter(n.UNPACK_SKIP_PIXELS),de=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,v.width);for(let D=0,te=le.length;D<te;D++){let K=le[D],fe=Math.floor(K.start/4),ce=Math.ceil(K.count/4),he=fe%v.width,Pe=Math.floor(fe/v.width),Ye=ce,oe=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,he),t.pixelStorei(n.UNPACK_SKIP_ROWS,Pe),t.texSubImage2D(n.TEXTURE_2D,0,he,Pe,Ye,oe,V,re,v.data)}R.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,Q),t.pixelStorei(n.UNPACK_SKIP_PIXELS,ee),t.pixelStorei(n.UNPACK_SKIP_ROWS,de)}}function Lt(R,v,V){let re=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(re=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(re=n.TEXTURE_3D);let ie=ct(R,v),le=v.source;t.bindTexture(re,R.__webglTexture,n.TEXTURE0+V);let me=i.get(le);if(le.version!==me.__version||ie===!0){if(t.activeTexture(n.TEXTURE0+V),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){let oe=Qe.getPrimaries(Qe.workingColorSpace),Le=v.colorSpace===ui?null:Qe.getPrimaries(v.colorSpace),qe=v.colorSpace===ui||oe===Le?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,qe)}t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment);let ee=S(v.image,!1,s.maxTextureSize);ee=Ne(v,ee);let de=r.convert(v.format,v.colorSpace),D=r.convert(v.type),te=C(v.internalFormat,de,D,v.normalized,v.colorSpace,v.isVideoTexture);rt(re,v);let K,fe=v.mipmaps,ce=v.isVideoTexture!==!0,he=me.__version===void 0||ie===!0,Pe=le.dataReady,Ye=E(v,ee);if(v.isDepthTexture)te=x(v.format===hi,v.type),he&&(ce?t.texStorage2D(n.TEXTURE_2D,1,te,ee.width,ee.height):t.texImage2D(n.TEXTURE_2D,0,te,ee.width,ee.height,0,de,D,null));else if(v.isDataTexture)if(fe.length>0){ce&&he&&t.texStorage2D(n.TEXTURE_2D,Ye,te,fe[0].width,fe[0].height);for(let oe=0,Le=fe.length;oe<Le;oe++)K=fe[oe],ce?Pe&&t.texSubImage2D(n.TEXTURE_2D,oe,0,0,K.width,K.height,de,D,K.data):t.texImage2D(n.TEXTURE_2D,oe,te,K.width,K.height,0,de,D,K.data);v.generateMipmaps=!1}else ce?(he&&t.texStorage2D(n.TEXTURE_2D,Ye,te,ee.width,ee.height),Pe&&Ht(v,ee,de,D)):t.texImage2D(n.TEXTURE_2D,0,te,ee.width,ee.height,0,de,D,ee.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){ce&&he&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ye,te,fe[0].width,fe[0].height,ee.depth);for(let oe=0,Le=fe.length;oe<Le;oe++)if(K=fe[oe],v.format!==Dn)if(de!==null)if(ce){if(Pe)if(v.layerUpdates.size>0){let qe=nh(K.width,K.height,v.format,v.type);for(let ve of v.layerUpdates){let ot=K.data.subarray(ve*qe/K.data.BYTES_PER_ELEMENT,(ve+1)*qe/K.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,oe,0,0,ve,K.width,K.height,1,de,ot)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,oe,0,0,0,K.width,K.height,ee.depth,de,K.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,oe,te,K.width,K.height,ee.depth,0,K.data,0,0);else Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ce?Pe&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,oe,0,0,0,K.width,K.height,ee.depth,de,D,K.data):t.texImage3D(n.TEXTURE_2D_ARRAY,oe,te,K.width,K.height,ee.depth,0,de,D,K.data);v.layerUpdates.size>0&&v.clearLayerUpdates()}else{ce&&he&&t.texStorage2D(n.TEXTURE_2D,Ye,te,fe[0].width,fe[0].height);for(let oe=0,Le=fe.length;oe<Le;oe++)K=fe[oe],v.format!==Dn?de!==null?ce?Pe&&t.compressedTexSubImage2D(n.TEXTURE_2D,oe,0,0,K.width,K.height,de,K.data):t.compressedTexImage2D(n.TEXTURE_2D,oe,te,K.width,K.height,0,K.data):Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ce?Pe&&t.texSubImage2D(n.TEXTURE_2D,oe,0,0,K.width,K.height,de,D,K.data):t.texImage2D(n.TEXTURE_2D,oe,te,K.width,K.height,0,de,D,K.data)}else if(v.isDataArrayTexture)if(ce){if(he&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ye,te,ee.width,ee.height,ee.depth),Pe)if(v.layerUpdates.size>0){let oe=nh(ee.width,ee.height,v.format,v.type);for(let Le of v.layerUpdates){let qe=ee.data.subarray(Le*oe/ee.data.BYTES_PER_ELEMENT,(Le+1)*oe/ee.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Le,ee.width,ee.height,1,de,D,qe)}v.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,de,D,ee.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,te,ee.width,ee.height,ee.depth,0,de,D,ee.data);else if(v.isData3DTexture)ce?(he&&t.texStorage3D(n.TEXTURE_3D,Ye,te,ee.width,ee.height,ee.depth),Pe&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,de,D,ee.data)):t.texImage3D(n.TEXTURE_3D,0,te,ee.width,ee.height,ee.depth,0,de,D,ee.data);else if(v.isFramebufferTexture){if(he)if(ce)t.texStorage2D(n.TEXTURE_2D,Ye,te,ee.width,ee.height);else{let oe=ee.width,Le=ee.height;for(let qe=0;qe<Ye;qe++)t.texImage2D(n.TEXTURE_2D,qe,te,oe,Le,0,de,D,null),oe>>=1,Le>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in n){let oe=n.canvas;if(oe.hasAttribute("layoutsubtree")||oe.setAttribute("layoutsubtree","true"),ee.parentNode!==oe){oe.appendChild(ee),u.add(v),oe.onpaint=Le=>{let qe=Le.changedElements;for(let ve of u)qe.includes(ve.image)&&(ve.needsUpdate=!0)},oe.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,ee);else{let qe=n.RGBA,ve=n.RGBA,ot=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,qe,ve,ot,ee)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(fe.length>0){if(ce&&he){let oe=Ge(fe[0]);t.texStorage2D(n.TEXTURE_2D,Ye,te,oe.width,oe.height)}for(let oe=0,Le=fe.length;oe<Le;oe++)K=fe[oe],ce?Pe&&t.texSubImage2D(n.TEXTURE_2D,oe,0,0,de,D,K):t.texImage2D(n.TEXTURE_2D,oe,te,de,D,K);v.generateMipmaps=!1}else if(ce){if(he){let oe=Ge(ee);t.texStorage2D(n.TEXTURE_2D,Ye,te,oe.width,oe.height)}Pe&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,de,D,ee)}else t.texImage2D(n.TEXTURE_2D,0,te,de,D,ee);w(v)&&v.mipmapsAutoUpdate===!0&&T(re),me.__version=le.version,v.onUpdate&&v.onUpdate(v)}R.__version=v.version}function an(R,v,V){if(v.image.length!==6)return;let re=ct(R,v),ie=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,R.__webglTexture,n.TEXTURE0+V);let le=i.get(ie);if(ie.version!==le.__version||re===!0){t.activeTexture(n.TEXTURE0+V);let me=Qe.getPrimaries(Qe.workingColorSpace),Q=v.colorSpace===ui?null:Qe.getPrimaries(v.colorSpace),ee=v.colorSpace===ui||me===Q?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ee);let de=v.isCompressedTexture||v.image[0].isCompressedTexture,D=v.image[0]&&v.image[0].isDataTexture,te=[];for(let ve=0;ve<6;ve++)!de&&!D?te[ve]=S(v.image[ve],!0,s.maxCubemapSize):te[ve]=D?v.image[ve].image:v.image[ve],te[ve]=Ne(v,te[ve]);let K=te[0],fe=r.convert(v.format,v.colorSpace),ce=r.convert(v.type),he=C(v.internalFormat,fe,ce,v.normalized,v.colorSpace),Pe=v.isVideoTexture!==!0,Ye=le.__version===void 0||re===!0,oe=ie.dataReady,Le=E(v,K);rt(n.TEXTURE_CUBE_MAP,v);let qe;if(v.isDepthTexture){if(he=x(v.format===hi,v.type),Ye)if(Pe)t.texStorage2D(n.TEXTURE_CUBE_MAP,1,he,K.width,K.height);else for(let ve=0;ve<6;ve++)t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,he,K.width,K.height,0,fe,ce,null)}else if(de){Pe&&Ye&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Le,he,K.width,K.height);for(let ve=0;ve<6;ve++){qe=te[ve].mipmaps;for(let ot=0;ot<qe.length;ot++){let Ft=qe[ot];v.format!==Dn?fe!==null?Pe?oe&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,ot,0,0,Ft.width,Ft.height,fe,Ft.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,ot,he,Ft.width,Ft.height,0,Ft.data):Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Pe?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,ot,0,0,Ft.width,Ft.height,fe,ce,Ft.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,ot,he,Ft.width,Ft.height,0,fe,ce,Ft.data)}}}else{if(qe=v.mipmaps,Pe&&Ye){qe.length>0&&Le++;let ve=Ge(te[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Le,he,ve.width,ve.height)}for(let ve=0;ve<6;ve++)if(D){Pe?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,0,0,te[ve].width,te[ve].height,fe,ce,te[ve].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,he,te[ve].width,te[ve].height,0,fe,ce,te[ve].data);for(let ot=0;ot<qe.length;ot++){let fi=qe[ot].image[ve].image;Pe?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,ot+1,0,0,fi.width,fi.height,fe,ce,fi.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,ot+1,he,fi.width,fi.height,0,fe,ce,fi.data)}}else{Pe?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,0,0,fe,ce,te[ve]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,he,fe,ce,te[ve]);for(let ot=0;ot<qe.length;ot++){let Ft=qe[ot];Pe?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,ot+1,0,0,fe,ce,Ft.image[ve]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,ot+1,he,fe,ce,Ft.image[ve])}}}w(v)&&v.mipmapsAutoUpdate===!0&&T(n.TEXTURE_CUBE_MAP),le.__version=ie.version,v.onUpdate&&v.onUpdate(v)}R.__version=v.version}function gt(R,v,V,re,ie,le){let me=r.convert(V.format,V.colorSpace),Q=r.convert(V.type),ee=C(V.internalFormat,me,Q,V.normalized,V.colorSpace),de=i.get(v),D=i.get(V);if(D.__renderTarget=v,!de.__hasExternalTextures){let te=Math.max(1,v.width>>le),K=Math.max(1,v.height>>le);ie===n.TEXTURE_3D||ie===n.TEXTURE_2D_ARRAY?t.texImage3D(ie,le,ee,te,K,v.depth,0,me,Q,null):t.texImage2D(ie,le,ee,te,K,0,me,Q,null)}t.bindFramebuffer(n.FRAMEBUFFER,R),_e(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,re,ie,D.__webglTexture,0,pt(v)):(ie===n.TEXTURE_2D||ie>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ie<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,re,ie,D.__webglTexture,le),t.bindFramebuffer(n.FRAMEBUFFER,null)}function On(R,v,V){if(n.bindRenderbuffer(n.RENDERBUFFER,R),v.depthBuffer){let re=v.depthTexture,ie=re&&re.isDepthTexture?re.type:null,le=x(v.stencilBuffer,ie),me=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;_e(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,pt(v),le,v.width,v.height):V?n.renderbufferStorageMultisample(n.RENDERBUFFER,pt(v),le,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,le,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,me,n.RENDERBUFFER,R)}else{let re=v.textures;for(let ie=0;ie<re.length;ie++){let le=re[ie],me=r.convert(le.format,le.colorSpace),Q=r.convert(le.type),ee=C(le.internalFormat,me,Q,le.normalized,le.colorSpace);_e(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,pt(v),ee,v.width,v.height):V?n.renderbufferStorageMultisample(n.RENDERBUFFER,pt(v),ee,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,ee,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ot(R,v,V){let re=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,R),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let ie=i.get(v.depthTexture);ie.__renderTarget=v;let le=re?v.depthTexture.image[0]:v.depthTexture.image;(!ie.__webglTexture||le.width!==v.width||le.height!==v.height)&&(le.width=v.width,le.height=v.height,v.depthTexture.needsUpdate=!0),re?ue(v.depthTexture,0):ae(v.depthTexture,0);let me=ie.__webglTexture,Q=pt(v),ee=re?n.TEXTURE_CUBE_MAP_POSITIVE_X+V:n.TEXTURE_2D,de=v.depthTexture.format===hi?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(v.depthTexture.format===ri)_e(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,de,ee,me,0,Q):n.framebufferTexture2D(n.FRAMEBUFFER,de,ee,me,0);else if(v.depthTexture.format===hi)_e(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,de,ee,me,0,Q):n.framebufferTexture2D(n.FRAMEBUFFER,de,ee,me,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function gn(R){let v=i.get(R),V=R.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==R.depthTexture){let re=R.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),re){let ie=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,re.removeEventListener("dispose",ie)};re.addEventListener("dispose",ie),v.__depthDisposeCallback=ie}v.__boundDepthTexture=re}if(R.depthTexture&&!v.__autoAllocateDepthBuffer)if(V)for(let re=0;re<6;re++)Ot(v.__webglFramebuffer[re],R,re);else R.texture.mipmaps.length>0?Ot(v.__webglFramebuffer[0],R,0):Ot(v.__webglFramebuffer,R,0);else if(V){v.__webglDepthbuffer=[];for(let re=0;re<6;re++)if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[re]),v.__webglDepthbuffer[re]===void 0)v.__webglDepthbuffer[re]=n.createRenderbuffer(),On(v.__webglDepthbuffer[re],R,!1);else{let ie=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,le=v.__webglDepthbuffer[re];n.bindRenderbuffer(n.RENDERBUFFER,le),n.framebufferRenderbuffer(n.FRAMEBUFFER,ie,n.RENDERBUFFER,le)}}else if(R.texture.mipmaps.length>0?t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),On(v.__webglDepthbuffer,R,!1);else{let ie=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,le=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,le),n.framebufferRenderbuffer(n.FRAMEBUFFER,ie,n.RENDERBUFFER,le)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function _n(R,v,V){let re=i.get(R);v!==void 0&&gt(re.__webglFramebuffer,R,R.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),V!==void 0&&gn(R)}function xn(R){let v=R.texture,V=i.get(R),re=i.get(v);R.addEventListener("dispose",z),U(R);let ie=R.textures,le=R.isWebGLCubeRenderTarget===!0,me=ie.length>1;if(me||(re.__webglTexture===void 0&&(re.__webglTexture=n.createTexture()),re.__version=v.version,o.memory.textures++),le){V.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(v.mipmaps.length>0){V.__webglFramebuffer[Q]=[];for(let ee=0;ee<v.mipmaps.length;ee++)V.__webglFramebuffer[Q][ee]=n.createFramebuffer()}else V.__webglFramebuffer[Q]=n.createFramebuffer()}else{if(v.mipmaps.length>0){V.__webglFramebuffer=[];for(let Q=0;Q<v.mipmaps.length;Q++)V.__webglFramebuffer[Q]=n.createFramebuffer()}else V.__webglFramebuffer=n.createFramebuffer();if(me)for(let Q=0,ee=ie.length;Q<ee;Q++){let de=i.get(ie[Q]);de.__webglTexture===void 0&&(de.__webglTexture=n.createTexture(),o.memory.textures++)}if(R.samples>0&&_e(R)===!1){V.__webglMultisampledFramebuffer=n.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let Q=0;Q<ie.length;Q++){let ee=ie[Q];V.__webglColorRenderbuffer[Q]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,V.__webglColorRenderbuffer[Q]);let de=r.convert(ee.format,ee.colorSpace),D=r.convert(ee.type),te=C(ee.internalFormat,de,D,ee.normalized,ee.colorSpace,R.isXRRenderTarget===!0),K=pt(R);n.renderbufferStorageMultisample(n.RENDERBUFFER,K,te,R.width,R.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Q,n.RENDERBUFFER,V.__webglColorRenderbuffer[Q])}n.bindRenderbuffer(n.RENDERBUFFER,null),R.depthBuffer&&(V.__webglDepthRenderbuffer=n.createRenderbuffer(),On(V.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(le){t.bindTexture(n.TEXTURE_CUBE_MAP,re.__webglTexture),rt(n.TEXTURE_CUBE_MAP,v);for(let Q=0;Q<6;Q++)if(v.mipmaps.length>0)for(let ee=0;ee<v.mipmaps.length;ee++)gt(V.__webglFramebuffer[Q][ee],R,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ee);else gt(V.__webglFramebuffer[Q],R,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);w(v)?T(n.TEXTURE_CUBE_MAP):v.mipmaps.length>0&&n.texParameteri(n.TEXTURE_CUBE_MAP,n.TEXTURE_MAX_LEVEL,v.mipmaps.length-1),t.unbindTexture()}else if(me){for(let Q=0,ee=ie.length;Q<ee;Q++){let de=ie[Q],D=i.get(de),te=n.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(te=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(te,D.__webglTexture),rt(te,de),gt(V.__webglFramebuffer,R,de,n.COLOR_ATTACHMENT0+Q,te,0),w(de)&&T(te)}t.unbindTexture()}else{let Q=n.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(Q=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Q,re.__webglTexture),rt(Q,v),v.mipmaps.length>0)for(let ee=0;ee<v.mipmaps.length;ee++)gt(V.__webglFramebuffer[ee],R,v,n.COLOR_ATTACHMENT0,Q,ee);else gt(V.__webglFramebuffer,R,v,n.COLOR_ATTACHMENT0,Q,0);w(v)?T(Q):v.mipmaps.length>0&&n.texParameteri(Q,n.TEXTURE_MAX_LEVEL,v.mipmaps.length-1),t.unbindTexture()}R.depthBuffer&&gn(R)}function B(R){let v=R.textures;for(let V=0,re=v.length;V<re;V++){let ie=v[V];if(w(ie)&&ie.mipmapsAutoUpdate===!0){let le=A(R),me=i.get(ie).__webglTexture;t.bindTexture(le,me),T(le),t.unbindTexture()}}}let yn=[];function ft(R){if(R.samples>0){if(_e(R)===!1){let v=R.textures,V=R.width,re=R.height,ie=n.COLOR_BUFFER_BIT,le=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,me=i.get(R),Q=v.length>1;if(Q)for(let de=0;de<v.length;de++)t.bindFramebuffer(n.FRAMEBUFFER,me.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,me.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,me.__webglMultisampledFramebuffer),R.texture.mipmaps.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,me.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,me.__webglFramebuffer);for(let de=0;de<v.length;de++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(ie|=n.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(ie|=n.STENCIL_BUFFER_BIT)),Q){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,me.__webglColorRenderbuffer[de]);let D=i.get(v[de]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,D,0)}n.blitFramebuffer(0,0,V,re,0,0,V,re,ie,n.NEAREST),c===!0&&(yn.length=0,yn.push(n.COLOR_ATTACHMENT0+de),R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&yn.push(le),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,yn))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Q)for(let de=0;de<v.length;de++){t.bindFramebuffer(n.FRAMEBUFFER,me.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.RENDERBUFFER,me.__webglColorRenderbuffer[de]);let D=i.get(v[de]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,me.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.TEXTURE_2D,D,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,me.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&c){let v=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function pt(R){return Math.min(s.maxSamples,R.samples)}function _e(R){let v=i.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function Dt(R){let v=o.render.frame;h.get(R)!==v&&(h.set(R,v),R.update())}function Ne(R,v){let V=R.colorSpace,re=R.format,ie=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||V!==lr&&V!==ui&&(Qe.getTransfer(V)===it?(re!==Dn||ie!==cn)&&Oe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Fe("WebGLTextures: Unsupported texture color space:",V)),v}function Ge(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(l.width=R.naturalWidth||R.width,l.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(l.width=R.displayWidth,l.height=R.displayHeight):(l.width=R.width,l.height=R.height),l}this.allocateTextureUnit=Ce,this.resetTextureUnits=$,this.getTextureUnits=ne,this.setTextureUnits=xe,this.setTexture2D=ae,this.setTexture2DArray=ye,this.setTexture3D=Ie,this.setTextureCube=ue,this.rebindTextures=_n,this.setupRenderTarget=xn,this.updateRenderTargetMipmap=B,this.updateMultisampleRenderTarget=ft,this.setupDepthRenderbuffer=gn,this.setupFrameBufferTexture=gt,this.useMultisampledRTT=_e,this.dispose=P}function My(n,e){function t(i,s=ui){let r,o=Qe.getTransfer(s);if(i===cn)return n.UNSIGNED_BYTE;if(i===Ea)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Aa)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Vl)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Wl)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Gl)return n.BYTE;if(i===Hl)return n.SHORT;if(i===Bs)return n.UNSIGNED_SHORT;if(i===Ta)return n.INT;if(i===Pn)return n.UNSIGNED_INT;if(i===In)return n.FLOAT;if(i===Ln)return n.HALF_FLOAT;if(i===Xl)return n.ALPHA;if(i===ql)return n.RGB;if(i===Dn)return n.RGBA;if(i===ri)return n.DEPTH_COMPONENT;if(i===hi)return n.DEPTH_STENCIL;if(i===Yl)return n.RED;if(i===wa)return n.RED_INTEGER;if(i===Ci)return n.RG;if(i===Ca)return n.RG_INTEGER;if(i===Ra)return n.RGBA_INTEGER;if(i===Ur||i===Or||i===Fr||i===kr)if(o===it)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Ur)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Or)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Fr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===kr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Ur)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Or)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Fr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===kr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Pa||i===Ia||i===La||i===Da)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Pa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ia)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===La)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Da)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Na||i===Ua||i===Oa||i===Fa||i===ka||i===Br||i===Ba)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Na||i===Ua)return o===it?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Oa)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Fa)return r.COMPRESSED_R11_EAC;if(i===ka)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Br)return r.COMPRESSED_RG11_EAC;if(i===Ba)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===za||i===Ga||i===Ha||i===Va||i===Wa||i===Xa||i===qa||i===Ya||i===Za||i===Ja||i===$a||i===ja||i===Ka||i===Qa)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===za)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ga)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ha)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Va)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Wa)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Xa)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===qa)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ya)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Za)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ja)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===$a)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ja)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ka)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Qa)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ec||i===tc||i===nc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===ec)return o===it?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===tc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===nc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===ic||i===sc||i===zr||i===rc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===ic)return r.COMPRESSED_RED_RGTC1_EXT;if(i===sc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===zr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===rc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ji?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var Ty=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ey=`
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

}`,gh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new Tr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new Wn({vertexShader:Ty,fragmentShader:Ey,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new st(new Mi(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},_h=class extends Bn{constructor(e,t){super();let i=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,f=null,d=null,g=null,y=typeof XRWebGLBinding<"u",_=new gh,p={},S=t.getContextAttributes(),w=null,T=null,A=[],C=[],x=new ke,E=null,U=null,I=new Wt;I.viewport=new mt;let k=new Wt;k.viewport=new mt;let z=[I,k],J=new xa,M=null,P=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let ae=A[j];return ae===void 0&&(ae=new Ps,A[j]=ae),ae.getTargetRaySpace()},this.getControllerGrip=function(j){let ae=A[j];return ae===void 0&&(ae=new Ps,A[j]=ae),ae.getGripSpace()},this.getHand=function(j){let ae=A[j];return ae===void 0&&(ae=new Ps,A[j]=ae),ae.getHandSpace()};function L(j){let ae=C.indexOf(j.inputSource);if(ae===-1)return;let ye=A[ae];ye!==void 0&&(ye.update(j.inputSource,j.frame,l||o),ye.dispatchEvent({type:j.type,data:j.inputSource}))}function F(){s.removeEventListener("select",L),s.removeEventListener("selectstart",L),s.removeEventListener("selectend",L),s.removeEventListener("squeeze",L),s.removeEventListener("squeezestart",L),s.removeEventListener("squeezeend",L),s.removeEventListener("end",F),s.removeEventListener("inputsourceschange",Y);for(let j=0;j<A.length;j++){let ae=C[j];ae!==null&&(C[j]=null,A[j].disconnect(ae))}M=null,P=null,_.reset();for(let j in p)delete p[j];if(e.setRenderTarget(w),d=null,f=null,u=null,s=null,T=null,Ce.stop(),i.isPresenting=!1,e.setPixelRatio(E),e.setSize(x.width,x.height,!1),U!==null){let j=U.camera;j.fov=U.fov,j.zoom=U.zoom,j.updateProjectionMatrix(),U=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,i.isPresenting===!0&&Oe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,i.isPresenting===!0&&Oe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(j){l=j},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&y&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(w=e.getRenderTarget(),s.addEventListener("select",L),s.addEventListener("selectstart",L),s.addEventListener("selectend",L),s.addEventListener("squeeze",L),s.addEventListener("squeezestart",L),s.addEventListener("squeezeend",L),s.addEventListener("end",F),s.addEventListener("inputsourceschange",Y),S.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(x),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let ye=null,Ie=null,ue=null;S.depth&&(ue=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ye=S.stencil?hi:ri,Ie=S.stencil?Ji:Pn);let Xe={colorFormat:t.RGBA8,depthFormat:ue,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(Xe),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),T=new dn(f.textureWidth,f.textureHeight,{format:Dn,type:cn,depthTexture:new ai(f.textureWidth,f.textureHeight,Ie,void 0,void 0,void 0,void 0,void 0,void 0,ye),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let ye={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,t,ye),s.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),T=new dn(d.framebufferWidth,d.framebufferHeight,{format:Dn,type:cn,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Ce.setContext(s),Ce.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function Y(j){for(let ae=0;ae<j.removed.length;ae++){let ye=j.removed[ae],Ie=C.indexOf(ye);Ie>=0&&(C[Ie]=null,A[Ie].disconnect(ye))}for(let ae=0;ae<j.added.length;ae++){let ye=j.added[ae],Ie=C.indexOf(ye);if(Ie===-1){for(let Xe=0;Xe<A.length;Xe++)if(Xe>=C.length){C.push(ye),Ie=Xe;break}else if(C[Xe]===null){C[Xe]=ye,Ie=Xe;break}if(Ie===-1)break}let ue=A[Ie];ue&&ue.connect(ye)}}function q(j,ae){ae===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(ae.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let ae=j.near,ye=j.far;_.texture!==null&&(_.depthNear>0&&(ae=_.depthNear),_.depthFar>0&&(ye=_.depthFar)),J.near=k.near=I.near=ae,J.far=k.far=I.far=ye,(M!==J.near||P!==J.far)&&(s.updateRenderState({depthNear:J.near,depthFar:J.far}),M=J.near,P=J.far),J.layers.mask=j.layers.mask|6,I.layers.mask=J.layers.mask&-5,k.layers.mask=J.layers.mask&-3;let Ie=j.parent,ue=J.cameras;q(J,Ie);for(let Xe=0;Xe<ue.length;Xe++)q(ue[Xe],Ie);J.projectionMatrix.copy(I.projectionMatrix),J.projectionMatrixInverse.copy(I.projectionMatrixInverse),U===null&&j.isPerspectiveCamera&&(U={camera:j,fov:j.fov,zoom:j.zoom}),$(j,J,Ie)};function $(j,ae,ye){ye===null?j.matrix.copy(ae.matrixWorld):(j.matrix.copy(ye.matrixWorld),j.matrix.invert(),j.matrix.multiply(ae.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(ae.projectionMatrix),j.projectionMatrixInverse.copy(ae.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=fr*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return J},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(j){c=j,f!==null&&(f.fixedFoveation=j),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=j)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(J)},this.getCameraTexture=function(j){return p[j]};let ne=null;function xe(j,ae){if(h=ae.getViewerPose(l||o),g=ae,h!==null){let ye=h.views;d!==null&&(e.setRenderTargetFramebuffer(T,d.framebuffer),e.setRenderTarget(T));let Ie=!1;ye.length!==J.cameras.length&&(J.cameras.length=0,Ie=!0);for(let Ue=0;Ue<ye.length;Ue++){let rt=ye[Ue],ct=null;if(d!==null)ct=d.getViewport(rt);else{let Ht=u.getViewSubImage(f,rt);ct=Ht.viewport,Ue===0&&(e.setRenderTargetTextures(T,Ht.colorTexture,Ht.depthStencilTexture),e.setRenderTarget(T))}let $e=z[Ue];$e===void 0&&($e=new Wt,$e.layers.enable(Ue),$e.viewport=new mt,z[Ue]=$e),$e.matrix.fromArray(rt.transform.matrix),$e.matrix.decompose($e.position,$e.quaternion,$e.scale),$e.projectionMatrix.fromArray(rt.projectionMatrix),$e.projectionMatrixInverse.copy($e.projectionMatrix).invert(),$e.viewport.set(ct.x,ct.y,ct.width,ct.height),Ue===0&&(J.matrix.copy($e.matrix),J.matrix.decompose(J.position,J.quaternion,J.scale)),Ie===!0&&J.cameras.push($e)}let ue=s.enabledFeatures;if(ue&&ue.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&y){u=i.getBinding();let Ue=u.getDepthInformation(ye[0]);Ue&&Ue.isValid&&Ue.texture&&_.init(Ue,s.renderState)}if(ue&&ue.includes("camera-access")&&y){e.state.unbindTexture(),u=i.getBinding();for(let Ue=0;Ue<ye.length;Ue++){let rt=ye[Ue].camera;if(rt){let ct=p[rt];ct||(ct=new Tr,p[rt]=ct);let $e=u.getCameraImage(rt);ct.sourceTexture=$e}}}}for(let ye=0;ye<A.length;ye++){let Ie=C[ye],ue=A[ye];Ie!==null&&ue!==void 0&&ue.update(Ie,ae,l||o)}ne&&ne(j,ae),ae.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ae}),g=null}let Ce=new Of;Ce.setAnimationLoop(xe),this.setAnimationLoop=function(j){ne=j},this.dispose=function(){}}},Ay=new ut,qf=new Be;qf.set(-1,0,0,0,1,0,0,0,1);function wy(n,e){function t(_,p){_.matrixAutoUpdate===!0&&_.updateMatrix(),p.value.copy(_.matrix)}function i(_,p){p.color.getRGB(_.fogColor.value,Ql(n)),p.isFog?(_.fogNear.value=p.near,_.fogFar.value=p.far):p.isFogExp2&&(_.fogDensity.value=p.density)}function s(_,p,S,w,T){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(_,p):p.isMeshLambertMaterial?(r(_,p),p.envMap&&(_.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(_,p),u(_,p)):p.isMeshPhongMaterial?(r(_,p),h(_,p),p.envMap&&(_.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(_,p),f(_,p),p.isMeshPhysicalMaterial&&d(_,p,T)):p.isMeshMatcapMaterial?(r(_,p),g(_,p)):p.isMeshDepthMaterial?r(_,p):p.isMeshDistanceMaterial?(r(_,p),y(_,p)):p.isMeshNormalMaterial?r(_,p):p.isLineBasicMaterial?(o(_,p),p.isLineDashedMaterial&&a(_,p)):p.isPointsMaterial?c(_,p,S,w):p.isSpriteMaterial?l(_,p):p.isShadowMaterial?(_.color.value.copy(p.color),_.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(_,p){_.opacity.value=p.opacity,p.color&&_.diffuse.value.copy(p.color),p.emissive&&_.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(_.map.value=p.map,t(p.map,_.mapTransform)),p.alphaMap&&(_.alphaMap.value=p.alphaMap,t(p.alphaMap,_.alphaMapTransform)),p.bumpMap&&(_.bumpMap.value=p.bumpMap,t(p.bumpMap,_.bumpMapTransform),_.bumpScale.value=p.bumpScale,p.side===rn&&(_.bumpScale.value*=-1)),p.normalMap&&(_.normalMap.value=p.normalMap,t(p.normalMap,_.normalMapTransform),_.normalScale.value.copy(p.normalScale),p.side===rn&&_.normalScale.value.negate()),p.displacementMap&&(_.displacementMap.value=p.displacementMap,t(p.displacementMap,_.displacementMapTransform),_.displacementScale.value=p.displacementScale,_.displacementBias.value=p.displacementBias),p.emissiveMap&&(_.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,_.emissiveMapTransform)),p.specularMap&&(_.specularMap.value=p.specularMap,t(p.specularMap,_.specularMapTransform)),p.alphaTest>0&&(_.alphaTest.value=p.alphaTest);let S=e.get(p),w=S.envMap,T=S.envMapRotation;w&&(_.envMap.value=w,_.envMapRotation.value.setFromMatrix4(Ay.makeRotationFromEuler(T)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&_.envMapRotation.value.premultiply(qf),_.reflectivity.value=p.reflectivity,_.ior.value=p.ior,_.refractionRatio.value=p.refractionRatio),p.lightMap&&(_.lightMap.value=p.lightMap,_.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,_.lightMapTransform)),p.aoMap&&(_.aoMap.value=p.aoMap,_.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,_.aoMapTransform))}function o(_,p){_.diffuse.value.copy(p.color),_.opacity.value=p.opacity,p.map&&(_.map.value=p.map,t(p.map,_.mapTransform))}function a(_,p){_.dashSize.value=p.dashSize,_.totalSize.value=p.dashSize+p.gapSize,_.scale.value=p.scale}function c(_,p,S,w){_.diffuse.value.copy(p.color),_.opacity.value=p.opacity,_.size.value=p.size*S,_.scale.value=w*.5,p.map&&(_.map.value=p.map,t(p.map,_.uvTransform)),p.alphaMap&&(_.alphaMap.value=p.alphaMap,t(p.alphaMap,_.alphaMapTransform)),p.alphaTest>0&&(_.alphaTest.value=p.alphaTest)}function l(_,p){_.diffuse.value.copy(p.color),_.opacity.value=p.opacity,_.rotation.value=p.rotation,p.map&&(_.map.value=p.map,t(p.map,_.mapTransform)),p.alphaMap&&(_.alphaMap.value=p.alphaMap,t(p.alphaMap,_.alphaMapTransform)),p.alphaTest>0&&(_.alphaTest.value=p.alphaTest)}function h(_,p){_.specular.value.copy(p.specular),_.shininess.value=Math.max(p.shininess,1e-4)}function u(_,p){p.gradientMap&&(_.gradientMap.value=p.gradientMap)}function f(_,p){_.metalness.value=p.metalness,p.metalnessMap&&(_.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,_.metalnessMapTransform)),_.roughness.value=p.roughness,p.roughnessMap&&(_.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,_.roughnessMapTransform)),p.envMap&&(_.envMapIntensity.value=p.envMapIntensity)}function d(_,p,S){_.ior.value=p.ior,p.diffuseRoughness>0&&(_.diffuseRoughness.value=p.diffuseRoughness,p.diffuseRoughnessMap&&(_.diffuseRoughnessMap.value=p.diffuseRoughnessMap,t(p.diffuseRoughnessMap,_.diffuseRoughnessMapTransform))),p.sheen>0&&(_.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),_.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(_.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,_.sheenColorMapTransform)),p.sheenRoughnessMap&&(_.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,_.sheenRoughnessMapTransform))),p.clearcoat>0&&(_.clearcoat.value=p.clearcoat,_.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(_.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,_.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(_.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,_.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(_.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,_.clearcoatNormalMapTransform),_.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===rn&&_.clearcoatNormalScale.value.negate())),p.dispersion>0&&(_.dispersion.value=p.dispersion),p.retroreflectivity>0&&(_.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(_.iridescence.value=p.iridescence,_.iridescenceIOR.value=p.iridescenceIOR,_.iridescenceThicknessMinimum.value=p.iridescenceThicknessMinimum,_.iridescenceThicknessMaximum.value=p.iridescenceThicknessMaximum,p.iridescenceMap&&(_.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,_.iridescenceMapTransform)),p.iridescenceThicknessMap&&(_.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,_.iridescenceThicknessMapTransform))),p.transmission>0&&(_.transmission.value=p.transmission,_.transmissionSamplerMap.value=S.texture,_.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(_.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,_.transmissionMapTransform)),_.thickness.value=p.thickness,p.thicknessMap&&(_.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,_.thicknessMapTransform)),_.attenuationDistance.value=p.attenuationDistance,_.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(_.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(_.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,_.anisotropyMapTransform))),_.specularIntensity.value=p.specularIntensity,_.specularColor.value.copy(p.specularColor),p.specularColorMap&&(_.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,_.specularColorMapTransform)),p.specularIntensityMap&&(_.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,_.specularIntensityMapTransform))}function g(_,p){p.matcap&&(_.matcap.value=p.matcap)}function y(_,p){let S=e.get(p).light;_.referencePosition.value.setFromMatrixPosition(S.matrixWorld),_.nearDistance.value=S.shadow.camera.near,_.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Cy(n,e,t,i){let s={},r={};function o(S,w){let T=w.program;i.uniformBlockBinding(S,T,s[S.id])}function a(S,w){let T=s[S.id];T===void 0&&(g(S),T=c(S),s[S.id]=T,S.addEventListener("dispose",_));let A=w.program;i.updateUBOMapping(S,A);let C=e.render.frame;r[S.id]!==C&&(l(S),r[S.id]=C)}function c(S){let w=n.createBuffer(),T=S.__size,A=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,w),n.bufferData(n.UNIFORM_BUFFER,T,A),n.bindBuffer(n.UNIFORM_BUFFER,null),w}function l(S){let w=s[S.id],T=S.uniforms,A=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let C=0,x=T.length;C<x;C++){let E=T[C];if(Array.isArray(E))for(let U=0,I=E.length;U<I;U++)h(E[U],C,U,A);else h(E,C,0,A)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function h(S,w,T,A){if(f(S,w,T,A)===!0){let C=S.__offset,x=S.value;if(Array.isArray(x)){let E=0;for(let U=0;U<x.length;U++){let I=x[U],k=y(I,!0);u(I,S.__data,E),E+=k.storage/Float32Array.BYTES_PER_ELEMENT}}else u(x,S.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,C,S.__data)}}function u(S,w,T){typeof S=="number"||typeof S=="boolean"?w[T]=S:S.isMatrix3?(w[T]=S.elements[0],w[T+1]=S.elements[1],w[T+2]=S.elements[2],w[T+3]=0,w[T+4]=S.elements[3],w[T+5]=S.elements[4],w[T+6]=S.elements[5],w[T+7]=0,w[T+8]=S.elements[6],w[T+9]=S.elements[7],w[T+10]=S.elements[8],w[T+11]=0):ArrayBuffer.isView(S)?w.set(S.subarray(0,w.length-T),T):S.toArray(w,T)}function f(S,w,T,A){let C=S.value,x=w+"_"+T;if(Array.isArray(C)){A[x]===void 0&&(A[x]=[]);let E=A[x],U=!1;for(let I=0;I<C.length;I++)d(C[I],E,I)===!0&&(U=!0);return U}return d(C,A,x)}function d(S,w,T){if(w[T]===void 0)return typeof S=="number"||typeof S=="boolean"?w[T]=S:ArrayBuffer.isView(S)?w[T]=S.slice():w[T]=S.clone(),!0;{let A=w[T];if(typeof S=="number"||typeof S=="boolean"){if(A!==S)return w[T]=S,!0}else{if(ArrayBuffer.isView(S))return!0;if(A.equals(S)===!1)return A.copy(S),!0}}return!1}function g(S){let w=S.uniforms,T=0,A=16;for(let x=0,E=w.length;x<E;x++){let U=Array.isArray(w[x])?w[x]:[w[x]];for(let I=0,k=U.length;I<k;I++){let z=U[I],J=Array.isArray(z.value)?z.value:[z.value],M=Array.isArray(w[x])||Array.isArray(z.value),P=T;for(let F=0,Y=J.length;F<Y;F++){let q=J[F],$=y(q,M),ne=T%A,xe=ne%$.boundary,Ce=ne+xe;T+=xe,Ce!==0&&A-Ce<$.storage&&(T+=A-Ce),F===0&&(P=T),T+=$.storage}let L=z.type==="int"?Int32Array:z.type==="uint"?Uint32Array:Float32Array;z.__data=new L((T-P)/Float32Array.BYTES_PER_ELEMENT),z.__offset=P}}let C=T%A;return C>0&&(T+=A-C),S.__size=T,S.__cache={},this}function y(S,w){let T={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(T.boundary=4,T.storage=4):S.isVector2?(T.boundary=8,T.storage=8):S.isVector3||S.isColor?(T.boundary=16,T.storage=12):S.isVector4?(T.boundary=16,T.storage=16):S.isMatrix3?(T.boundary=16,T.storage=48):S.isMatrix4?(T.boundary=16,T.storage=64):S.isTexture?Oe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(T.boundary=16,T.storage=S.byteLength):Oe("WebGLRenderer: Unsupported uniform value type.",S),w===!0&&(T.boundary=16,T.storage=Math.ceil(T.storage/16)*16),T}function _(S){let w=S.target;w.removeEventListener("dispose",_),n.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function p(){for(let S in s)n.deleteBuffer(s[S]);s={},r={}}return{bind:o,update:a,dispose:p}}var Ry=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Yn=null;function Py(){return Yn===null&&(Yn=new na(Ry,16,16,Ci,Ln),Yn.name="DFG_LUT",Yn.minFilter=nn,Yn.magFilter=nn,Yn.wrapS=kn,Yn.wrapT=kn,Yn.generateMipmaps=!1,Yn.needsUpdate=!0),Yn}var uc=class{constructor(e={}){let{canvas:t=nf(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1,outputBufferType:d=cn}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=o;let y=d,_=new Set([Ra,Ca,wa]),p=new Set([cn,Pn,Bs,Ji,Ea,Aa]),S=new Uint32Array(4),w=new Int32Array(4),T={textures:[],min:[],max:[],resolution:[]},A=null,C=null,x=[],E=[],U=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=qn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,k=!1,z=null,J=null,M=null,P=null;this._outputColorSpace=bt;let L=0,F=0,Y=null,q=-1,$=null,ne=new mt,xe=new mt,Ce=null,j=new Ve(0),ae=0,ye=t.width,Ie=t.height,ue=1,Xe=null,Tt=null,Ue=new mt(0,0,ye,Ie),rt=new mt(0,0,ye,Ie),ct=!1,$e=new bi,Ht=new ia,Lt=!1,an=!1,gt=new ut,On=new G,Ot=new mt,gn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},_n=!1;function xn(){return Y===null?ue:1}let B=i;function yn(b,O){return t.getContext(b,O)}let ft,pt,_e,Dt,Ne,Ge,R,v,V,re,ie,le,me,Q,ee,de,D,te,K,fe,ce,he,Pe;try{let b={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"187"}`),t.addEventListener("webglcontextlost",Le,!1),t.addEventListener("webglcontextrestored",qe,!1),t.addEventListener("webglcontextcreationerror",ve,!1),B===null){let O="webgl2";if(B=yn(O,b),B===null)throw yn(O)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ye()}catch(b){throw t.removeEventListener("webglcontextlost",Le,!1),t.removeEventListener("webglcontextrestored",qe,!1),t.removeEventListener("webglcontextcreationerror",ve,!1),Fe("WebGLRenderer: "+b.message),b}function Ye(){ft=new G_(B),ft.init(),ce=new My(B,ft),pt=new P_(B,ft,e,ce),_e=new Sy(B,ft),pt.reversedDepthBuffer&&f&&_e.buffers.depth.setReversed(!0),J=B.createFramebuffer(),M=B.createFramebuffer(),P=B.createFramebuffer(),Dt=new W_(B),Ne=new ay,Ge=new by(B,ft,_e,Ne,pt,ce,Dt),R=new z_(I),v=new qm(B),he=new C_(B,v),V=new H_(B,v,Dt,he),re=new q_(B,V,v,he,Dt),te=new X_(B,pt,Ge),ee=new I_(Ne),ie=new oy(I,R,ft,pt,he,ee),le=new wy(I,Ne),me=new ly,Q=new my(ft),D=new w_(I,R,_e,re,g,c),de=new vy(I,re,pt),Pe=new Cy(B,Dt,pt,_e),K=new R_(B,ft,Dt),fe=new V_(B,ft,Dt),Dt.programs=ie.programs,I.capabilities=pt,I.extensions=ft,I.properties=Ne,I.renderLists=me,I.shadowMap=de,I.state=_e,I.info=Dt}y!==cn&&(U=new Z_(y,t.width,t.height,a,s,r));let oe=new _h(I,B);this.xr=oe,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){let b=ft.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=ft.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return ue},this.setPixelRatio=function(b){b!==void 0&&(ue=b,this.setSize(ye,Ie,!1))},this.getSize=function(b){return b.set(ye,Ie)},this.setSize=function(b,O,Z=!0){if(oe.isPresenting){Oe("WebGLRenderer: Can't change size while VR device is presenting.");return}ye=b,Ie=O,t.width=Math.floor(b*ue),t.height=Math.floor(O*ue),Z===!0&&(t.style.width=b+"px",t.style.height=O+"px"),U!==null&&U.setSize(t.width,t.height),this.setViewport(0,0,b,O)},this.getDrawingBufferSize=function(b){return b.set(ye*ue,Ie*ue).floor()},this.setDrawingBufferSize=function(b,O,Z){ye=b,Ie=O,ue=Z,t.width=Math.floor(b*Z),t.height=Math.floor(O*Z),this.setViewport(0,0,b,O)},this.setEffects=function(b){if(y===cn){Fe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let O=0;O<b.length;O++)if(b[O].isOutputPass===!0){Oe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}U.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(ne)},this.getViewport=function(b){return b.copy(Ue)},this.setViewport=function(b,O,Z,H){b.isVector4?Ue.set(b.x,b.y,b.z,b.w):Ue.set(b,O,Z,H),_e.viewport(ne.copy(Ue).multiplyScalar(xn()).round())},this.getScissor=function(b){return b.copy(rt)},this.setScissor=function(b,O,Z,H){b.isVector4?rt.set(b.x,b.y,b.z,b.w):rt.set(b,O,Z,H),_e.scissor(xe.copy(rt).multiplyScalar(xn()).round())},this.getScissorTest=function(){return ct},this.setScissorTest=function(b){_e.setScissorTest(ct=b)},this.setOpaqueSort=function(b){Xe=b},this.setTransparentSort=function(b){Tt=b},this.getClearColor=function(b){return b.copy(D.getClearColor())},this.setClearColor=function(){D.setClearColor(...arguments)},this.getClearAlpha=function(){return D.getClearAlpha()},this.setClearAlpha=function(){D.setClearAlpha(...arguments)},this.clear=function(b=!0,O=!0,Z=!0){let H=0;if(b){let W=!1;if(Y!==null){let ge=Y.texture.format;W=_.has(ge)}if(W){let ge=Y.texture.type,Me=p.has(ge),pe=D.getClearColor(),be=D.getClearAlpha(),we=pe.r,He=pe.g,je=pe.b;Me?(S[0]=we,S[1]=He,S[2]=je,S[3]=be,B.clearBufferuiv(B.COLOR,0,S)):(w[0]=we,w[1]=He,w[2]=je,w[3]=be,B.clearBufferiv(B.COLOR,0,w))}else H|=B.COLOR_BUFFER_BIT}O&&(H|=B.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Z&&(H|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&B.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),z=b},this.dispose=function(){t.removeEventListener("webglcontextlost",Le,!1),t.removeEventListener("webglcontextrestored",qe,!1),t.removeEventListener("webglcontextcreationerror",ve,!1),D.dispose(),me.dispose(),Q.dispose(),Ge.dispose(),Ne.dispose(),R.dispose(),re.dispose(),V.dispose(),he.dispose(),Pe.dispose(),ie.dispose(),oe.dispose(),oe.removeEventListener("sessionstart",Bu),oe.removeEventListener("sessionend",zu),Di.stop()};function Le(b){b.preventDefault(),dr("WebGLRenderer: Context Lost."),k=!0}function qe(){dr("WebGLRenderer: Context Restored."),k=!1;let b=Dt.autoReset,O=de.enabled,Z=de.autoUpdate,H=de.needsUpdate,W=de.type;Ye(),Dt.autoReset=b,de.enabled=O,de.autoUpdate=Z,de.needsUpdate=H,de.type=W}function ve(b){Fe("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function ot(b){let O=b.target;O.removeEventListener("dispose",ot),Ft(O)}function Ft(b){fi(b),Ne.remove(b)}function fi(b){let O=Ne.get(b).programs;O!==void 0&&(O.forEach(function(Z){ie.releaseProgram(Z)}),b.isShaderMaterial&&ie.releaseShaderCache(b))}this.renderBufferDirect=function(b,O,Z,H,W,ge){O===null&&(O=gn);let Me=W.isMesh&&W.matrixWorld.determinantAffine()<0,pe=Zp(b,O,Z,H,W);_e.setMaterial(H,Me);let be=Z.index,we=1;if(H.wireframe===!0){if(be=V.getWireframeAttribute(Z),be===void 0)return;we=2}let He=Z.drawRange,je=Z.attributes.position,Te=He.start*we,Ke=(He.start+He.count)*we;ge!==null&&(Te=Math.max(Te,ge.start*we),Ke=Math.min(Ke,(ge.start+ge.count)*we)),be!==null?(Te=Math.max(Te,0),Ke=Math.min(Ke,be.count)):je!=null&&(Te=Math.max(Te,0),Ke=Math.min(Ke,je.count));let Et=Ke-Te;if(Et<0||Et===1/0)return;he.setup(W,H,pe,Z,be);let ht,lt=K;if(be!==null&&(ht=v.get(be),lt=fe,lt.setIndex(ht)),W.isMesh)H.wireframe===!0?(_e.setLineWidth(H.wireframeLinewidth*xn()),lt.setMode(B.LINES)):lt.setMode(B.TRIANGLES);else if(W.isLine){let qt=H.linewidth;qt===void 0&&(qt=1),_e.setLineWidth(qt*xn()),W.isLineSegments?lt.setMode(B.LINES):W.isLineLoop?lt.setMode(B.LINE_LOOP):lt.setMode(B.LINE_STRIP)}else W.isPoints?lt.setMode(B.POINTS):W.isSprite&&lt.setMode(B.TRIANGLES);if(W.isBatchedMesh)if(ft.get("WEBGL_multi_draw"))lt.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{let qt=W._multiDrawStarts,Ee=W._multiDrawCounts,en=W._multiDrawCount,nt=be?v.get(be).bytesPerElement:1,Ni=Ne.get(H).currentProgram.getUniforms();for(let Yt=0;Yt<en;Yt++)Ni.setValue(B,"_gl_DrawID",Yt),lt.render(qt[Yt]/nt,Ee[Yt])}else if(W.isInstancedMesh)lt.renderInstances(Te,Et,W.count);else if(Z.isInstancedBufferGeometry){let qt=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,Ee=Math.min(Z.instanceCount,qt);lt.renderInstances(Te,Et,Ee)}else lt.render(Te,Et)};function ku(b,O,Z,H){z!==null&&b.isNodeMaterial&&z.setObject(H,b),Lt===!0&&ee.setState(b,Z,!1),b.transparent===!0&&b.side===Xn&&b.forceSinglePass===!1?(b.side=rn,b.needsUpdate=!0,Ks(b,O,H),b.side=wi,b.needsUpdate=!0,Ks(b,O,H),b.side=Xn):Ks(b,O,H)}this.compile=function(b,O,Z=null){Z===null&&(Z=b),z!==null&&z.renderStart(b,O,Z),C=Q.get(Z),C.init(O),E.push(C),Z.traverseVisible(function(W){W.isLight&&W.layers.test(O.layers)&&(C.pushLight(W),W.castShadow&&C.pushShadow(W))}),b!==Z&&b.traverseVisible(function(W){W.isLight&&W.layers.test(O.layers)&&(C.pushLight(W),W.castShadow&&C.pushShadow(W))}),C.setupLights(),z!==null&&z.updateLights(C.state.lightsArray),an=this.localClippingEnabled,Lt=ee.init(this.clippingPlanes,an),Lt===!0&&ee.setGlobalState(this.clippingPlanes,O),z!==null&&de.render(C.state.shadowsArray,Z,O);let H=new Set;return b.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;let ge=W.material;if(ge)if(Array.isArray(ge))for(let Me=0;Me<ge.length;Me++){let pe=ge[Me];ku(pe,Z,O,W),H.add(pe)}else ku(ge,Z,O,W),H.add(ge)}),C=E.pop(),z!==null&&z.renderEnd(),H},this.compileAsync=function(b,O,Z=null){let H=this.compile(b,O,Z);return new Promise(W=>{function ge(){if(H.forEach(function(Me){let be=Ne.get(Me).currentProgram;(be===void 0||be.isReady())&&H.delete(Me)}),H.size===0){W(b);return}setTimeout(ge,10)}ft.get("KHR_parallel_shader_compile")!==null?ge():setTimeout(ge,10)})};let qc=null;function qp(b){qc&&qc(b)}function Bu(){Di.stop()}function zu(){Di.start()}let Di=new Of;Di.setAnimationLoop(qp),typeof self<"u"&&Di.setContext(self),this.setAnimationLoop=function(b){qc=b,oe.setAnimationLoop(b),b===null?Di.stop():Di.start()},oe.addEventListener("sessionstart",Bu),oe.addEventListener("sessionend",zu),this.render=function(b,O){if(O!==void 0&&O.isCamera!==!0){Fe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(k===!0)return;z!==null&&z.renderStart(b,O);let Z=oe.enabled===!0&&oe.isPresenting===!0,H=U!==null&&(Y===null||Z)&&U.begin(I,Y);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),oe.enabled===!0&&oe.isPresenting===!0&&(U===null||U.isCompositing()===!1)&&(oe.cameraAutoUpdate===!0&&oe.updateCamera(O),O=oe.getCamera()),b.isScene===!0&&b.onBeforeRender(I,b,O,Y),C=Q.get(b,E.length),C.init(O),C.state.textureUnits=Ge.getTextureUnits(),E.push(C),gt.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),O.isArrayCamera?Ht.setFromArrayCamera(O):$e.setFromProjectionMatrix(gt,Sn,O.reversedDepth),an=this.localClippingEnabled,Lt=ee.init(this.clippingPlanes,an),A=me.get(b,x.length),A.init(),x.push(A),this.info.render.frame++,oe.enabled===!0&&oe.isPresenting===!0){let Me=I.xr.getDepthSensingMesh();Me!==null&&Yc(Me,O,-1/0,I.sortObjects)}Yc(b,O,0,I.sortObjects),A.finish(),z!==null&&z.updateLights(C.state.lightsArray),I.sortObjects===!0&&A.sort(Xe,Tt),_n=oe.enabled===!1||oe.isPresenting===!1||oe.hasDepthSensing()===!1,_n&&D.addToRenderList(A,b),this.info.autoReset===!0&&this.info.reset(),Lt===!0&&ee.beginShadows();let W=C.state.shadowsArray;if(de.render(W,b,O),Lt===!0&&ee.endShadows(),(H&&U.hasRenderPass())===!1){let Me=A.opaque,pe=A.transmissive;if(C.setupLights(),O.isArrayCamera){let be=O.cameras;if(pe.length>0)for(let we=0,He=be.length;we<He;we++){let je=be[we];Hu(Me,pe,b,je)}_n&&D.render(b);for(let we=0,He=be.length;we<He;we++){let je=be[we];Gu(A,b,je,je.viewport)}}else pe.length>0&&Hu(Me,pe,b,O),_n&&D.render(b),Gu(A,b,O)}Y!==null&&F===0&&(Ge.updateMultisampleRenderTarget(Y),Ge.updateRenderTargetMipmap(Y)),H&&U.end(I),b.isScene===!0&&b.onAfterRender(I,b,O),he.resetDefaultState(),q=-1,$=null,E.pop(),E.length>0?(C=E[E.length-1],Ge.setTextureUnits(C.state.textureUnits),Lt===!0&&ee.setGlobalState(I.clippingPlanes,C.state.camera)):C=null,x.pop(),x.length>0?A=x[x.length-1]:A=null,z!==null&&z.renderEnd()};function Yc(b,O,Z,H){if(b.visible===!1)return;if(b.layers.test(O.layers)){if(b.isGroup)Z=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(O);else if(b.isLight)C.pushLight(b),b.castShadow&&C.pushShadow(b);else if(b.isSprite){let Me=O.isArrayCamera?Ht:$e;if(!b.frustumCulled||b.intersectsFrustum(Me)){H&&Ot.setFromMatrixPosition(b.matrixWorld).applyMatrix4(gt);let pe=re.update(b),be=b.material;be.visible&&A.push(b,pe,be,Z,Ot.z,null,O)}}else if(b.isMesh||b.isLine||b.isPoints){let Me=O.isArrayCamera?Ht:$e;if(!b.frustumCulled||b.intersectsFrustum(Me)){let pe=re.update(b),be=b.material;if(H&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Ot.copy(b.boundingSphere.center)):(pe.boundingSphere===null&&pe.computeBoundingSphere(),Ot.copy(pe.boundingSphere.center)),Ot.applyMatrix4(b.matrixWorld).applyMatrix4(gt)),Array.isArray(be)){let we=pe.groups;for(let He=0,je=we.length;He<je;He++){let Te=we[He],Ke=be[Te.materialIndex];Ke&&Ke.visible&&A.push(b,pe,Ke,Z,Ot.z,Te,O)}}else be.visible&&A.push(b,pe,be,Z,Ot.z,null,O)}}}let ge=b.children;for(let Me=0,pe=ge.length;Me<pe;Me++)Yc(ge[Me],O,Z,H)}function Gu(b,O,Z,H){let{opaque:W,transmissive:ge,transparent:Me}=b;C.setupLightsView(Z),Lt===!0&&ee.setGlobalState(I.clippingPlanes,Z),H&&_e.viewport(ne.copy(H)),W.length>0&&po(W,O,Z),ge.length>0&&po(ge,O,Z),Me.length>0&&po(Me,O,Z),_e.buffers.depth.setTest(!0),_e.buffers.depth.setMask(!0),_e.buffers.color.setMask(!0),_e.setPolygonOffset(!1)}function Hu(b,O,Z,H){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;if(C.state.transmissionRenderTarget[H.id]===void 0){let Te=ft.has("EXT_color_buffer_half_float")||ft.has("EXT_color_buffer_float");C.state.transmissionRenderTarget[H.id]=new dn(1,1,{generateMipmaps:!0,type:Te?Ln:cn,minFilter:li,samples:Math.max(4,pt.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Qe.workingColorSpace})}let ge=C.state.transmissionRenderTarget[H.id],Me=H.viewport||ne;ge.setSize(Me.z*I.transmissionResolutionScale,Me.w*I.transmissionResolutionScale);let pe=I.getRenderTarget(),be=I.getActiveCubeFace(),we=I.getActiveMipmapLevel();I.setRenderTarget(ge),I.getClearColor(j),ae=I.getClearAlpha(),ae<1&&I.setClearColor(16777215,.5),I.clear(),_n&&D.render(Z);let He=I.toneMapping;I.toneMapping=qn;let je=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),C.setupLightsView(H),Lt===!0&&ee.setGlobalState(I.clippingPlanes,H),po(b,Z,H),Ge.updateMultisampleRenderTarget(ge),Ge.updateRenderTargetMipmap(ge),ft.has("WEBGL_multisampled_render_to_texture")===!1){let Te=!1;for(let Ke=0,Et=O.length;Ke<Et;Ke++){let ht=O[Ke],{object:lt,geometry:qt,material:Ee,group:en}=ht;if(Ee.side===Xn&&lt.layers.test(H.layers)){let nt=Ee.side;Ee.side=rn,Ee.needsUpdate=!0,Vu(lt,Z,H,qt,Ee,en),Ee.side=nt,Ee.needsUpdate=!0,Te=!0}}Te===!0&&(Ge.updateMultisampleRenderTarget(ge),Ge.updateRenderTargetMipmap(ge))}I.setRenderTarget(pe,be,we),I.setClearColor(j,ae),je!==void 0&&(H.viewport=je),I.toneMapping=He}function po(b,O,Z){let H=O.isScene===!0?O.overrideMaterial:null;for(let W=0,ge=b.length;W<ge;W++){let Me=b[W],{object:pe,geometry:be,group:we}=Me,He=Me.material;He.allowOverride===!0&&H!==null&&(He=H),pe.layers.test(Z.layers)&&Vu(pe,O,Z,be,He,we)}}function Vu(b,O,Z,H,W,ge){z!==null&&W.isNodeMaterial&&z.setObject(b,W),b.onBeforeRender(I,O,Z,H,W,ge),b.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),W.onBeforeRender(I,O,Z,H,b,ge),W.transparent===!0&&W.side===Xn&&W.forceSinglePass===!1?(W.side=rn,W.needsUpdate=!0,I.renderBufferDirect(Z,O,H,W,b,ge),W.side=wi,W.needsUpdate=!0,I.renderBufferDirect(Z,O,H,W,b,ge),W.side=Xn):I.renderBufferDirect(Z,O,H,W,b,ge),b.onAfterRender(I,O,Z,H,W,ge)}function Wu(b){let O=0;for(let Z of b)Z.texture!==null&&O++;return O}function Ks(b,O,Z){O.isScene!==!0&&(O=gn);let H=Ne.get(b),W=C.state.lights,ge=C.state.shadowsArray,Me=W.state.version,pe=ie.getParameters(b,W.state,ge,O,Z,C.state.lightProbeGridArray),be=ie.getProgramCacheKey(pe),we=H.programs;H.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?O.environment:null,H.fog=O.fog;let He=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;H.envMap=R.get(b.envMap||H.environment,He),H.envMapRotation=H.environment!==null&&b.envMap===null?O.environmentRotation:b.envMapRotation,we===void 0&&(b.addEventListener("dispose",ot),we=new Map,H.programs=we,H.programVariants=new Map);let je=we.get(be);if(je!==void 0){if(H.currentProgram===je&&H.lightsStateVersion===Me)return qu(b,pe),je}else pe.uniforms=ie.getUniforms(b),z!==null&&b.isNodeMaterial&&z.build(b,Z,pe),b.onBeforeCompile(pe,I),je=ie.acquireProgram(pe,be),we.set(be,je),H.uniforms=pe.uniforms;let Te=H.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Te.clippingPlanes=ee.uniform),qu(b,pe),H.needsLights=$p(b),H.lightsStateVersion=Me,H.needsLights&&(Te.ambientLightColor.value=W.state.ambient,Te.lightProbe.value=W.state.probe,Te.sunLights.value=W.state.sun,Te.sunLightShadows.value=W.state.sunShadow,Te.directionalLights.value=W.state.directional,Te.directionalLightShadows.value=W.state.directionalShadow,Te.spotLights.value=W.state.spot,Te.spotLightShadows.value=W.state.spotShadow,Te.rectAreaLights.value=W.state.rectArea,Te.ltc_1.value=W.state.rectAreaLTC1,Te.ltc_2.value=W.state.rectAreaLTC2,Te.pointLights.value=W.state.point,Te.pointLightShadows.value=W.state.pointShadow,Te.hemisphereLights.value=W.state.hemi,Te.sunShadowMatrix.value=W.state.sunShadowMatrix,Te.sunShadowCascade.value=W.state.sunShadowCascade,Te.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Te.spotLightMatrix.value=W.state.spotLightMatrix,Te.spotLightMap.value=W.state.spotLightMap,Te.pointShadowMatrix.value=W.state.pointShadowMatrix),H.numLightProbeGrids=Wu(C.state.lightProbeGridArray),H.currentProgram=je,H.uniformsList=null,je}function Yp(b,O,Z,H,W){let ge=Ne.get(b),Me=ge.currentProgram.id+","+H+","+W,pe=ge.programVariants.get(Me);return pe===void 0?(pe=Ks(b,O,Z),ge.programVariants.set(Me,pe)):(ge.currentProgram=pe,ge.uniformsList=null,ge.outputColorSpace=H,ge.toneMapping=W),pe}function Xu(b){if(b.uniformsList===null){let O=b.currentProgram.getUniforms();b.uniformsList=zs.seqWithValue(O.seq,b.uniforms)}return b.uniformsList}function qu(b,O){let Z=Ne.get(b);Z.outputColorSpace=O.outputColorSpace,Z.batching=O.batching,Z.batchingColor=O.batchingColor,Z.instancing=O.instancing,Z.instancingColor=O.instancingColor,Z.instancingMorph=O.instancingMorph,Z.skinning=O.skinning,Z.morphTargets=O.morphTargets,Z.morphNormals=O.morphNormals,Z.morphColors=O.morphColors,Z.morphTargetsCount=O.morphTargetsCount,Z.numClippingPlanes=O.numClippingPlanes,Z.numIntersection=O.numClipIntersection,Z.vertexAlphas=O.vertexAlphas,Z.vertexTangents=O.vertexTangents,Z.toneMapping=O.toneMapping}function Zp(b,O,Z,H,W){O.isScene!==!0&&(O=gn),Ge.resetTextureUnits();let ge=O.fog,Me=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?O.environment:null,pe=Y===null?I.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:Qe.workingColorSpace,be=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,we=R.get(H.envMap||Me,be),He=H.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,je=!!Z.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Te=!!Z.morphAttributes.position,Ke=!!Z.morphAttributes.normal,Et=!!Z.morphAttributes.color,ht=qn;H.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(ht=I.toneMapping);let lt=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,qt=lt!==void 0?lt.length:0,Ee=Ne.get(H),en=C.state.lights;if(Lt===!0&&(an===!0||b!==$)){let _t=b===$&&H.id===q;ee.setState(H,b,_t)}let nt=!1,Ni=!1;H.version===Ee.__version?Ee.needsLights&&Ee.lightsStateVersion!==en.state.version||W.isBatchedMesh&&Ee.batching===!1||!W.isBatchedMesh&&Ee.batching===!0||W.isBatchedMesh&&Ee.batchingColor===!0&&W._colorsTexture===null||W.isBatchedMesh&&Ee.batchingColor===!1&&W._colorsTexture!==null||W.isInstancedMesh&&Ee.instancing===!1||!W.isInstancedMesh&&Ee.instancing===!0||W.isSkinnedMesh&&Ee.skinning===!1||!W.isSkinnedMesh&&Ee.skinning===!0||W.isInstancedMesh&&Ee.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Ee.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Ee.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Ee.instancingMorph===!1&&W.morphTexture!==null||Ee.envMap!==we||H.fog===!0&&Ee.fog!==ge||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==ee.numPlanes||Ee.numIntersection!==ee.numIntersection)||Ee.vertexAlphas!==He||Ee.vertexTangents!==je||Ee.morphTargets!==Te||Ee.morphNormals!==Ke||Ee.morphColors!==Et||Ee.morphTargetsCount!==qt||Ee.numLightProbeGrids!==Wu(C.state.lightProbeGridArray)?nt=!0:(Ee.outputColorSpace!==pe||Ee.toneMapping!==ht)&&(Ni=!0):(nt=!0,Ee.__version=H.version);let Yt=Ee.currentProgram;(nt===!0||Ni===!0)&&(Yt=Ni===!0?Yp(H,O,W,pe,ht):Ks(H,O,W),z&&H.isNodeMaterial&&z.onUpdateProgram(H,Yt,Ee));let mo=!1,pi=!1,Ui=!1,tt=Yt.getUniforms(),Vt=Ee.uniforms;if(_e.useProgram(Yt.program)&&(mo=!0,pi=!0,Ui=!0),H.id!==q&&(q=H.id,pi=!0),mo||$!==b){_e.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),tt.setValue(B,"projectionMatrix",b.projectionMatrix),tt.setValue(B,"viewMatrix",b.matrixWorldInverse);let kt=tt.map.cameraPosition;kt!==void 0&&kt.setValue(B,On.setFromMatrixPosition(b.matrixWorld)),pt.logarithmicDepthBuffer&&tt.setValue(B,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&tt.setValue(B,"isOrthographic",b.isOrthographicCamera===!0),$!==b&&($=b,pi=!0,Ui=!0)}if(Ee.needsLights&&(en.state.sunShadowMap.length>0&&tt.setValue(B,"sunShadowMap",en.state.sunShadowMap,Ge),en.state.directionalShadowMap.length>0&&tt.setValue(B,"directionalShadowMap",en.state.directionalShadowMap,Ge),en.state.spotShadowMap.length>0&&tt.setValue(B,"spotShadowMap",en.state.spotShadowMap,Ge),en.state.pointShadowMap.length>0&&tt.setValue(B,"pointShadowMap",en.state.pointShadowMap,Ge)),W.isSkinnedMesh){tt.setOptional(B,W,"bindMatrix"),tt.setOptional(B,W,"bindMatrixInverse");let _t=W.skeleton;_t&&(_t.boneTexture===null&&_t.computeBoneTexture(),tt.setValue(B,"boneTexture",_t.boneTexture,Ge))}W.isBatchedMesh&&(tt.setOptional(B,W,"batchingTexture"),tt.setValue(B,"batchingTexture",W._matricesTexture,Ge),tt.setOptional(B,W,"batchingIdTexture"),tt.setValue(B,"batchingIdTexture",W._indirectTexture,Ge),tt.setOptional(B,W,"batchingColorTexture"),W._colorsTexture!==null&&tt.setValue(B,"batchingColorTexture",W._colorsTexture,Ge));let Mn=Z.morphAttributes;if((Mn.position!==void 0||Mn.normal!==void 0||Mn.color!==void 0)&&te.update(W,Z,Yt),(pi||Ee.receiveShadow!==W.receiveShadow)&&(Ee.receiveShadow=W.receiveShadow,tt.setValue(B,"receiveShadow",W.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&O.environment!==null&&(Vt.envMapIntensity.value=O.environmentIntensity),Vt.dfgLUT!==void 0&&(Vt.dfgLUT.value=Py()),pi){if(tt.setValue(B,"toneMappingExposure",I.toneMappingExposure),Ee.needsLights&&Jp(Vt,Ui),ge&&H.fog===!0&&le.refreshFogUniforms(Vt,ge),le.refreshMaterialUniforms(Vt,H,ue,Ie,C.state.transmissionRenderTarget[b.id]),Ee.needsLights&&Ee.numLightProbeGrids>0){let _t=T,kt=0;for(let jn of C.state.lightProbeGridArray)jn.texture!==null&&(_t.textures[kt]=jn.texture,_t.min[kt]=jn.boundingBox.min,_t.max[kt]=jn.boundingBox.max,_t.resolution[kt]=jn.resolution,kt++);for(let jn in _t)_t[jn].length=kt;Vt.probesSH.value=_t.textures,Vt.probesMin.value=_t.min,Vt.probesMax.value=_t.max,Vt.probesResolution.value=_t.resolution}zs.upload(B,Xu(Ee),Vt,Ge)}if(H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(zs.upload(B,Xu(Ee),Vt,Ge),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&tt.setValue(B,"center",W.center),tt.setValue(B,"modelViewMatrix",W.modelViewMatrix),tt.setValue(B,"normalMatrix",W.normalMatrix),tt.setValue(B,"modelMatrix",W.matrixWorld),H.uniformsGroups!==void 0){let _t=H.uniformsGroups;for(let kt=0,jn=_t.length;kt<jn;kt++){let Zu=_t[kt];Pe.update(Zu,Yt),Pe.bind(Zu,Yt)}}return Yt}function Jp(b,O){b.ambientLightColor.needsUpdate=O,b.lightProbe.needsUpdate=O,b.sunLights.needsUpdate=O,b.sunLightShadows.needsUpdate=O,b.directionalLights.needsUpdate=O,b.directionalLightShadows.needsUpdate=O,b.pointLights.needsUpdate=O,b.pointLightShadows.needsUpdate=O,b.spotLights.needsUpdate=O,b.spotLightShadows.needsUpdate=O,b.rectAreaLights.needsUpdate=O,b.hemisphereLights.needsUpdate=O}function $p(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return F},this.getRenderTarget=function(){return Y},this.setRenderTargetTextures=function(b,O,Z){let H=Ne.get(b);H.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),Ne.get(b.texture).__webglTexture=O,Ne.get(b.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:Z,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,O){let Z=Ne.get(b);Z.__webglFramebuffer=O,Z.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(b,O=0,Z=0){Y=b,L=O,F=Z;let H=null,W=!1,ge=!1;if(b){let pe=Ne.get(b);if(pe.__useDefaultFramebuffer!==void 0){_e.bindFramebuffer(B.FRAMEBUFFER,pe.__webglFramebuffer),ne.copy(b.viewport),xe.copy(b.scissor),Ce=b.scissorTest,_e.viewport(ne),_e.scissor(xe),_e.setScissorTest(Ce),q=-1;return}else if(pe.__webglFramebuffer===void 0)Ge.setupRenderTarget(b);else if(pe.__hasExternalTextures)Ge.rebindTextures(b,Ne.get(b.texture).__webglTexture,Ne.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){let He=b.depthTexture;if(pe.__boundDepthTexture!==He){if(He!==null&&Ne.has(He)&&(b.width!==He.image.width||b.height!==He.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Ge.setupDepthRenderbuffer(b)}}let be=b.texture;(be.isData3DTexture||be.isDataArrayTexture||be.isCompressedArrayTexture)&&(ge=!0);let we=Ne.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(we[O])?H=we[O][Z]:H=we[O],W=!0):b.samples>0&&Ge.useMultisampledRTT(b)===!1?H=Ne.get(b).__webglMultisampledFramebuffer:Array.isArray(we)?H=we[Z]:H=we,ne.copy(b.viewport),xe.copy(b.scissor),Ce=b.scissorTest}else ne.copy(Ue).multiplyScalar(ue).floor(),xe.copy(rt).multiplyScalar(ue).floor(),Ce=ct;if(Z!==0&&(H=J),_e.bindFramebuffer(B.FRAMEBUFFER,H)&&_e.drawBuffers(b,H),_e.viewport(ne),_e.scissor(xe),_e.setScissorTest(Ce),W){let pe=Ne.get(b.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+O,pe.__webglTexture,Z)}else if(ge){let pe=O;for(let be=0;be<b.textures.length;be++){let we=Ne.get(b.textures[be]);B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0+be,we.__webglTexture,Z,pe)}}else if(b!==null&&Z!==0){let pe=Ne.get(b.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,pe.__webglTexture,Z)}q=-1};function Yu(b){let O=Ne.get(b);return(O.__readFormat!==b.format||O.__readType!==b.type)&&(O.__readFormat=b.format,O.__readType=b.type,O.__formatReadable=pt.textureFormatReadable(b.format),O.__typeReadable=pt.textureTypeReadable(b.type)),O}this.readRenderTargetPixels=function(b,O,Z,H,W,ge,Me,pe=0){if(!(b&&b.isWebGLRenderTarget)){Fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let be=Ne.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Me!==void 0&&(be=be[Me],Array.isArray(be)&&(be=be[0])),be){_e.bindFramebuffer(B.FRAMEBUFFER,be);try{let we=b.textures[pe],He=we.format,je=we.type;b.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+pe);let Te=Yu(we);if(Te.__formatReadable===!1){Fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Te.__typeReadable===!1){Fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=b.width-H&&Z>=0&&Z<=b.height-W&&B.readPixels(O,Z,H,W,ce.convert(He),ce.convert(je),ge)}finally{let we=Y!==null?Ne.get(Y).__webglFramebuffer:null;_e.bindFramebuffer(B.FRAMEBUFFER,we)}}},this.readRenderTargetPixelsAsync=async function(b,O,Z,H,W,ge,Me,pe=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let be=Ne.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Me!==void 0&&(be=be[Me],Array.isArray(be)&&(be=be[0])),be)if(O>=0&&O<=b.width-H&&Z>=0&&Z<=b.height-W){_e.bindFramebuffer(B.FRAMEBUFFER,be);let we=b.textures[pe],He=we.format,je=we.type;b.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+pe);let Te=Yu(we);if(Te.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Te.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Ke=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,Ke),B.bufferData(B.PIXEL_PACK_BUFFER,ge.byteLength,B.STREAM_READ),B.readPixels(O,Z,H,W,ce.convert(He),ce.convert(je),0),B.bindBuffer(B.PIXEL_PACK_BUFFER,null);let Et=Y!==null?Ne.get(Y).__webglFramebuffer:null;_e.bindFramebuffer(B.FRAMEBUFFER,Et);let ht=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await rf(B,ht,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,Ke),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,ge),B.bindBuffer(B.PIXEL_PACK_BUFFER,null),B.deleteBuffer(Ke),B.deleteSync(ht),ge}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,O=null,Z=0){let H=Math.pow(2,-Z),W=Math.floor(b.image.width*H),ge=Math.floor(b.image.height*H),Me=O!==null?O.x:0,pe=O!==null?O.y:0;Ge.setTexture2D(b,0),B.copyTexSubImage2D(B.TEXTURE_2D,Z,0,0,Me,pe,W,ge),_e.unbindTexture()},this.copyTextureToTexture=function(b,O,Z=null,H=null,W=0,ge=0){let Me,pe,be,we,He,je,Te,Ke,Et,ht=b.isCompressedTexture?b.mipmaps[ge]:b.image;if(Z!==null)Me=Z.max.x-Z.min.x,pe=Z.max.y-Z.min.y,be=Z.isBox3?Z.max.z-Z.min.z:1,we=Z.min.x,He=Z.min.y,je=Z.isBox3?Z.min.z:0;else{let tt=Math.pow(2,-W);Me=Math.floor(ht.width*tt),pe=Math.floor(ht.height*tt),b.isDataArrayTexture?be=ht.depth:b.isData3DTexture?be=Math.floor(ht.depth*tt):be=1,we=0,He=0,je=0}H!==null?(Te=H.x,Ke=H.y,Et=H.z):(Te=0,Ke=0,Et=0);let lt=ce.convert(O.format),qt=ce.convert(O.type),Ee;O.isData3DTexture?(Ge.setTexture3D(O,0),Ee=B.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(Ge.setTexture2DArray(O,0),Ee=B.TEXTURE_2D_ARRAY):(Ge.setTexture2D(O,0),Ee=B.TEXTURE_2D),_e.activeTexture(B.TEXTURE0),_e.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,O.flipY),_e.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),_e.pixelStorei(B.UNPACK_ALIGNMENT,O.unpackAlignment);let en=_e.getParameter(B.UNPACK_ROW_LENGTH),nt=_e.getParameter(B.UNPACK_IMAGE_HEIGHT),Ni=_e.getParameter(B.UNPACK_SKIP_PIXELS),Yt=_e.getParameter(B.UNPACK_SKIP_ROWS),mo=_e.getParameter(B.UNPACK_SKIP_IMAGES);_e.pixelStorei(B.UNPACK_ROW_LENGTH,ht.width),_e.pixelStorei(B.UNPACK_IMAGE_HEIGHT,ht.height),_e.pixelStorei(B.UNPACK_SKIP_PIXELS,we),_e.pixelStorei(B.UNPACK_SKIP_ROWS,He),_e.pixelStorei(B.UNPACK_SKIP_IMAGES,je);let pi=b.isDataArrayTexture||b.isData3DTexture,Ui=O.isDataArrayTexture||O.isData3DTexture;if(b.isDepthTexture){let tt=Ne.get(b),Vt=Ne.get(O),Mn=Ne.get(tt.__renderTarget),_t=Ne.get(Vt.__renderTarget);_e.bindFramebuffer(B.READ_FRAMEBUFFER,Mn.__webglFramebuffer),_e.bindFramebuffer(B.DRAW_FRAMEBUFFER,_t.__webglFramebuffer);for(let kt=0;kt<be;kt++)pi&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Ne.get(b).__webglTexture,W,je+kt),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Ne.get(O).__webglTexture,ge,Et+kt)),B.blitFramebuffer(we,He,we+Me,He+pe,Te,Ke,Te+Me,Ke+pe,B.DEPTH_BUFFER_BIT,B.NEAREST);_e.bindFramebuffer(B.READ_FRAMEBUFFER,null),_e.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if(W!==0||b.isRenderTargetTexture||Ne.has(b)){let tt=Ne.get(b),Vt=Ne.get(O);_e.bindFramebuffer(B.READ_FRAMEBUFFER,M),_e.bindFramebuffer(B.DRAW_FRAMEBUFFER,P);for(let Mn=0;Mn<be;Mn++)pi?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,tt.__webglTexture,W,je+Mn):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,tt.__webglTexture,W),Ui?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Vt.__webglTexture,ge,Et+Mn):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Vt.__webglTexture,ge),W!==0?B.blitFramebuffer(we,He,we+Me,He+pe,Te,Ke,Te+Me,Ke+pe,B.COLOR_BUFFER_BIT,B.NEAREST):Ui?B.copyTexSubImage3D(Ee,ge,Te,Ke,Et+Mn,we,He,Me,pe):B.copyTexSubImage2D(Ee,ge,Te,Ke,we,He,Me,pe);_e.bindFramebuffer(B.READ_FRAMEBUFFER,null),_e.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else Ui?b.isDataTexture||b.isData3DTexture?B.texSubImage3D(Ee,ge,Te,Ke,Et,Me,pe,be,lt,qt,ht.data):O.isCompressedArrayTexture?B.compressedTexSubImage3D(Ee,ge,Te,Ke,Et,Me,pe,be,lt,ht.data):B.texSubImage3D(Ee,ge,Te,Ke,Et,Me,pe,be,lt,qt,ht):b.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,ge,Te,Ke,Me,pe,lt,qt,ht.data):b.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,ge,Te,Ke,ht.width,ht.height,lt,ht.data):B.texSubImage2D(B.TEXTURE_2D,ge,Te,Ke,Me,pe,lt,qt,ht);_e.pixelStorei(B.UNPACK_ROW_LENGTH,en),_e.pixelStorei(B.UNPACK_IMAGE_HEIGHT,nt),_e.pixelStorei(B.UNPACK_SKIP_PIXELS,Ni),_e.pixelStorei(B.UNPACK_SKIP_ROWS,Yt),_e.pixelStorei(B.UNPACK_SKIP_IMAGES,mo),ge===0&&O.generateMipmaps===!0&&O.mipmapsAutoUpdate===!0&&B.generateMipmap(Ee),_e.unbindTexture()},this.initRenderTarget=function(b){Ne.get(b).__webglFramebuffer===void 0&&Ge.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?Ge.setTextureCube(b,0):b.isData3DTexture?Ge.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?Ge.setTexture2DArray(b,0):Ge.setTexture2D(b,0),_e.unbindTexture()},this.resetState=function(){L=0,F=0,Y=null,_e.reset(),he.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Sn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=Qe._getUnpackColorSpace()}};function Ki(n,e=!1){let t=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},o={},a=n[0].morphTargetsRelative,c=new Ct;c.morphTargetsRelative=a;let l=0;for(let h=0;h<n.length;++h){let u=n[h],f=0,d=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let g in u.attributes){if(!i.has(g))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+g+'" attribute exists among all geometries, or in none of them.'),null;r[g]===void 0&&(r[g]=[]),r[g].push(u.attributes[g]),f++}if(f!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let g in u.morphAttributes){if(!s.has(g))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;if(u.morphAttributes[g].length!==n[0].morphAttributes[g].length)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have the same number of morph targets for the "'+g+'" morph attribute.'),null;o[g]===void 0&&(o[g]=[]),o[g].push(u.morphAttributes[g]),d++}if(d!==s.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of morph attributes."),null;if(e){let g;if(t)g=u.index.count;else if(u.attributes.position!==void 0)g=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,g,h),l+=g}}if(t){let h=0,u=[];for(let f=0;f<n.length;++f){let d=n[f].index;for(let g=0;g<d.count;++g)u.push(d.getX(g)+h);h+=n[f].attributes.position.count}c.setIndex(u)}for(let h in r){let u=Zf(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(let h in o){let u=o[h][0].length;if(u!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let f=0;f<u;++f){let d=[];for(let y=0;y<o[h].length;++y)d.push(o[h][y][f]);let g=Zf(d);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(g)}}}return c}function Zf(n){let e,t,i,s=-1,r=0;for(let l=0;l<n.length;++l){let h=n[l];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=h.normalized),i!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}let o=new e(r),a=new zt(o,t,i),c=0;for(let l=0;l<n.length;++l){let h=n[l];if(h.isInterleavedBufferAttribute){let u=c/t;for(let f=0,d=h.count;f<d;f++)for(let g=0;g<t;g++){let y=h.getComponent(f,g);a.setComponent(f+u,g,y)}}else o.set(h.array,c);c+=h.count*t}return s!==void 0&&(a.gpuType=s),a}var xh=class{constructor(){this.encoder=new TextEncoder,this._pieces=[],this._parts=[]}append_buffer(e){this.flush(),this._parts.push(e)}append(e){this._pieces.push(e)}flush(){if(this._pieces.length>0){let e=new Uint8Array(this._pieces);this._parts.push(e),this._pieces=[]}}toArrayBuffer(){let e=[];for(let t of this._parts)e.push(t);return Iy(e).buffer}};function Iy(n){let e=0;for(let s of n)e+=s.byteLength;let t=new Uint8Array(e),i=0;for(let s of n){let r=new Uint8Array(s.buffer,s.byteOffset,s.byteLength);t.set(r,i),i+=s.byteLength}return t}function Sh(n){return new yh(n).unpack()}function bh(n){let e=new vh,t=e.pack(n);return t instanceof Promise?t.then(()=>e.getBuffer()):e.getBuffer()}var yh=class{constructor(e){this.index=0,this.dataBuffer=e,this.dataView=new Uint8Array(this.dataBuffer),this.length=this.dataBuffer.byteLength}unpack(){let e=this.unpack_uint8();if(e<128)return e;if((e^224)<32)return(e^224)-32;let t;if((t=e^160)<=15)return this.unpack_raw(t);if((t=e^176)<=15)return this.unpack_string(t);if((t=e^144)<=15)return this.unpack_array(t);if((t=e^128)<=15)return this.unpack_map(t);switch(e){case 192:return null;case 193:return;case 194:return!1;case 195:return!0;case 202:return this.unpack_float();case 203:return this.unpack_double();case 204:return this.unpack_uint8();case 205:return this.unpack_uint16();case 206:return this.unpack_uint32();case 207:return this.unpack_uint64();case 208:return this.unpack_int8();case 209:return this.unpack_int16();case 210:return this.unpack_int32();case 211:return this.unpack_int64();case 212:return;case 213:return;case 214:return;case 215:return;case 216:return t=this.unpack_uint16(),this.unpack_string(t);case 217:return t=this.unpack_uint32(),this.unpack_string(t);case 218:return t=this.unpack_uint16(),this.unpack_raw(t);case 219:return t=this.unpack_uint32(),this.unpack_raw(t);case 220:return t=this.unpack_uint16(),this.unpack_array(t);case 221:return t=this.unpack_uint32(),this.unpack_array(t);case 222:return t=this.unpack_uint16(),this.unpack_map(t);case 223:return t=this.unpack_uint32(),this.unpack_map(t)}}unpack_uint8(){let e=this.dataView[this.index]&255;return this.index++,e}unpack_uint16(){let e=this.read(2),t=(e[0]&255)*256+(e[1]&255);return this.index+=2,t}unpack_uint32(){let e=this.read(4),t=((e[0]*256+e[1])*256+e[2])*256+e[3];return this.index+=4,t}unpack_uint64(){let e=this.read(8),t=((((((e[0]*256+e[1])*256+e[2])*256+e[3])*256+e[4])*256+e[5])*256+e[6])*256+e[7];return this.index+=8,t}unpack_int8(){let e=this.unpack_uint8();return e<128?e:e-256}unpack_int16(){let e=this.unpack_uint16();return e<32768?e:e-65536}unpack_int32(){let e=this.unpack_uint32();return e<2**31?e:e-2**32}unpack_int64(){let e=this.unpack_uint64();return e<2**63?e:e-2**64}unpack_raw(e){if(this.length<this.index+e)throw new Error(`BinaryPackFailure: index is out of range ${this.index} ${e} ${this.length}`);let t=this.dataBuffer.slice(this.index,this.index+e);return this.index+=e,t}unpack_string(e){let t=this.read(e),i=0,s="",r,o;for(;i<e;)r=t[i],r<160?(o=r,i++):(r^192)<32?(o=(r&31)<<6|t[i+1]&63,i+=2):(r^224)<16?(o=(r&15)<<12|(t[i+1]&63)<<6|t[i+2]&63,i+=3):(o=(r&7)<<18|(t[i+1]&63)<<12|(t[i+2]&63)<<6|t[i+3]&63,i+=4),s+=String.fromCodePoint(o);return this.index+=e,s}unpack_array(e){let t=new Array(e);for(let i=0;i<e;i++)t[i]=this.unpack();return t}unpack_map(e){let t={};for(let i=0;i<e;i++){let s=this.unpack();t[s]=this.unpack()}return t}unpack_float(){let e=this.unpack_uint32(),t=e>>31,i=(e>>23&255)-127,s=e&8388607|8388608;return(t===0?1:-1)*s*2**(i-23)}unpack_double(){let e=this.unpack_uint32(),t=this.unpack_uint32(),i=e>>31,s=(e>>20&2047)-1023,o=(e&1048575|1048576)*2**(s-20)+t*2**(s-52);return(i===0?1:-1)*o}read(e){let t=this.index;if(t+e<=this.length)return this.dataView.subarray(t,t+e);throw new Error("BinaryPackFailure: read index out of range")}},vh=class{getBuffer(){return this._bufferBuilder.toArrayBuffer()}pack(e){if(typeof e=="string")this.pack_string(e);else if(typeof e=="number")Math.floor(e)===e?this.pack_integer(e):this.pack_double(e);else if(typeof e=="boolean")e===!0?this._bufferBuilder.append(195):e===!1&&this._bufferBuilder.append(194);else if(e===void 0)this._bufferBuilder.append(192);else if(typeof e=="object")if(e===null)this._bufferBuilder.append(192);else{let t=e.constructor;if(e instanceof Array){let i=this.pack_array(e);if(i instanceof Promise)return i.then(()=>this._bufferBuilder.flush())}else if(e instanceof ArrayBuffer)this.pack_bin(new Uint8Array(e));else if("BYTES_PER_ELEMENT"in e){let i=e;this.pack_bin(new Uint8Array(i.buffer,i.byteOffset,i.byteLength))}else if(e instanceof Date)this.pack_string(e.toString());else{if(e instanceof Blob)return e.arrayBuffer().then(i=>{this.pack_bin(new Uint8Array(i)),this._bufferBuilder.flush()});if(t==Object||t.toString().startsWith("class")){let i=this.pack_object(e);if(i instanceof Promise)return i.then(()=>this._bufferBuilder.flush())}else throw new Error(`Type "${t.toString()}" not yet supported`)}}else throw new Error(`Type "${typeof e}" not yet supported`);this._bufferBuilder.flush()}pack_bin(e){let t=e.length;if(t<=15)this.pack_uint8(160+t);else if(t<=65535)this._bufferBuilder.append(218),this.pack_uint16(t);else if(t<=4294967295)this._bufferBuilder.append(219),this.pack_uint32(t);else throw new Error("Invalid length");this._bufferBuilder.append_buffer(e)}pack_string(e){let t=this._textEncoder.encode(e),i=t.length;if(i<=15)this.pack_uint8(176+i);else if(i<=65535)this._bufferBuilder.append(216),this.pack_uint16(i);else if(i<=4294967295)this._bufferBuilder.append(217),this.pack_uint32(i);else throw new Error("Invalid length");this._bufferBuilder.append_buffer(t)}pack_array(e){let t=e.length;if(t<=15)this.pack_uint8(144+t);else if(t<=65535)this._bufferBuilder.append(220),this.pack_uint16(t);else if(t<=4294967295)this._bufferBuilder.append(221),this.pack_uint32(t);else throw new Error("Invalid length");let i=s=>{if(s<t){let r=this.pack(e[s]);return r instanceof Promise?r.then(()=>i(s+1)):i(s+1)}};return i(0)}pack_integer(e){if(e>=-32&&e<=127)this._bufferBuilder.append(e&255);else if(e>=0&&e<=255)this._bufferBuilder.append(204),this.pack_uint8(e);else if(e>=-128&&e<=127)this._bufferBuilder.append(208),this.pack_int8(e);else if(e>=0&&e<=65535)this._bufferBuilder.append(205),this.pack_uint16(e);else if(e>=-32768&&e<=32767)this._bufferBuilder.append(209),this.pack_int16(e);else if(e>=0&&e<=4294967295)this._bufferBuilder.append(206),this.pack_uint32(e);else if(e>=-2147483648&&e<=2147483647)this._bufferBuilder.append(210),this.pack_int32(e);else if(e>=-9223372036854776e3&&e<=9223372036854776e3)this._bufferBuilder.append(211),this.pack_int64(e);else if(e>=0&&e<=18446744073709552e3)this._bufferBuilder.append(207),this.pack_uint64(e);else throw new Error("Invalid integer")}pack_double(e){let t=0;e<0&&(t=1,e=-e);let i=Math.floor(Math.log(e)/Math.LN2),s=e/2**i-1,r=Math.floor(s*2**52),o=2**32,a=t<<31|i+1023<<20|r/o&1048575,c=r%o;this._bufferBuilder.append(203),this.pack_int32(a),this.pack_int32(c)}pack_object(e){let t=Object.keys(e),i=t.length;if(i<=15)this.pack_uint8(128+i);else if(i<=65535)this._bufferBuilder.append(222),this.pack_uint16(i);else if(i<=4294967295)this._bufferBuilder.append(223),this.pack_uint32(i);else throw new Error("Invalid length");let s=r=>{if(r<t.length){let o=t[r];if(e.hasOwnProperty(o)){this.pack(o);let a=this.pack(e[o]);if(a instanceof Promise)return a.then(()=>s(r+1))}return s(r+1)}};return s(0)}pack_uint8(e){this._bufferBuilder.append(e)}pack_uint16(e){this._bufferBuilder.append(e>>8),this._bufferBuilder.append(e&255)}pack_uint32(e){let t=e&4294967295;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255)}pack_uint64(e){let t=e/4294967296,i=e%2**32;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255),this._bufferBuilder.append((i&4278190080)>>>24),this._bufferBuilder.append((i&16711680)>>>16),this._bufferBuilder.append((i&65280)>>>8),this._bufferBuilder.append(i&255)}pack_int8(e){this._bufferBuilder.append(e&255)}pack_int16(e){this._bufferBuilder.append((e&65280)>>8),this._bufferBuilder.append(e&255)}pack_int32(e){this._bufferBuilder.append(e>>>24&255),this._bufferBuilder.append((e&16711680)>>>16),this._bufferBuilder.append((e&65280)>>>8),this._bufferBuilder.append(e&255)}pack_int64(e){let t=Math.floor(e/4294967296),i=e%2**32;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255),this._bufferBuilder.append((i&4278190080)>>>24),this._bufferBuilder.append((i&16711680)>>>16),this._bufferBuilder.append((i&65280)>>>8),this._bufferBuilder.append(i&255)}constructor(){this._bufferBuilder=new xh,this._textEncoder=new TextEncoder}};var $f=!0,jf=!0;function Hs(n,e,t){let i=n.match(e);return i&&i.length>=t&&parseFloat(i[t],10)}function Jn(n,e,t){if(!n.RTCPeerConnection)return;if(!Object.getOwnPropertyDescriptor(EventTarget.prototype,"addEventListener").writable){Xr("Unable to polyfill events");return}let s=n.RTCPeerConnection.prototype,r=s.addEventListener;s.addEventListener=function(a,c){if(a!==e)return r.apply(this,arguments);let l=h=>{let u=t(h);u&&(c.handleEvent?c.handleEvent(u):c(u))};return this._eventMap=this._eventMap||{},this._eventMap[e]||(this._eventMap[e]=new Map),this._eventMap[e].set(c,l),r.apply(this,[a,l])};let o=s.removeEventListener;s.removeEventListener=function(a,c){if(a!==e||!this._eventMap||!this._eventMap[e])return o.apply(this,arguments);if(!this._eventMap[e].has(c))return o.apply(this,arguments);let l=this._eventMap[e].get(c);return this._eventMap[e].delete(c),this._eventMap[e].size===0&&delete this._eventMap[e],Object.keys(this._eventMap).length===0&&delete this._eventMap,o.apply(this,[a,l])},Object.defineProperty(s,"on"+e,{get(){return this["_on"+e]},set(a){this["_on"+e]&&(this.removeEventListener(e,this["_on"+e]),delete this["_on"+e]),a&&this.addEventListener(e,this["_on"+e]=a)},enumerable:!0,configurable:!0})}function Kf(n){return typeof n!="boolean"?new Error("Argument type: "+typeof n+". Please use a boolean."):($f=n,n?"adapter.js logging disabled":"adapter.js logging enabled")}function Qf(n){return typeof n!="boolean"?new Error("Argument type: "+typeof n+". Please use a boolean."):(jf=!n,"adapter.js deprecation warnings "+(n?"disabled":"enabled"))}function Xr(){if(typeof window=="object"){if($f)return;typeof console<"u"&&typeof console.log=="function"&&console.log.apply(console,arguments)}}function Vs(n,e){jf&&console.warn(n+" is deprecated, please use "+e+" instead.")}function ep(n){let e={browser:null,version:null};if(typeof n>"u"||!n.navigator||!n.navigator.userAgent)return e.browser="Not a browser.",e;let{navigator:t}=n;if(t.userAgentData&&t.userAgentData.brands){let i=t.userAgentData.brands.find(s=>s.brand==="Chromium");if(i){let s=parseInt(i.version,10);if(s>=90)return{browser:"chrome",version:s}}}if(t.mozGetUserMedia)e.browser="firefox",e.version=parseInt(Hs(t.userAgent,/Firefox\/(\d+)\./,1));else if(t.webkitGetUserMedia||n.isSecureContext===!1&&n.webkitRTCPeerConnection)e.browser="chrome",e.version=parseInt(Hs(t.userAgent,/Chrom(e|ium)\/(\d+)\./,2))||null;else if(n.RTCPeerConnection&&t.userAgent.match(/AppleWebKit\/(\d+)\./))e.browser="safari",e.version=parseInt(Hs(t.userAgent,/AppleWebKit\/(\d+)\./,1)),e.supportsUnifiedPlan=n.RTCRtpTransceiver&&"currentDirection"in n.RTCRtpTransceiver.prototype,e._safariVersion=Hs(t.userAgent,/Version\/(\d+(\.?\d+))/,1);else return e.browser="Not a supported browser.",e;return e}function Jf(n){return Object.prototype.toString.call(n)==="[object Object]"}function Th(n){return Jf(n)?Object.keys(n).reduce(function(e,t){let i=Jf(n[t]),s=i?Th(n[t]):n[t],r=i&&!Object.keys(s).length;return s===void 0||r?e:Object.assign(e,{[t]:s})},{}):n}function Mh(n,e,t){!e||t.has(e.id)||(t.set(e.id,e),Object.keys(e).forEach(i=>{i.endsWith("Id")?Mh(n,n.get(e[i]),t):i.endsWith("Ids")&&e[i].forEach(s=>{Mh(n,n.get(s),t)})}))}function Eh(n,e,t){let i=t?"outbound-rtp":"inbound-rtp",s=new Map;if(e===null)return s;let r=[];return n.forEach(o=>{o.type==="track"&&o.trackIdentifier===e.id&&r.push(o)}),r.forEach(o=>{n.forEach(a=>{a.type===i&&a.trackId===o.id&&Mh(n,a,s)})}),s}var gc={};go(gc,{fixNegotiationNeeded:()=>Ih,shimAddTrackRemoveTrack:()=>Ph,shimAddTrackRemoveTrackWithNative:()=>np,shimGetSendersWithDtmf:()=>Ch,shimGetUserMedia:()=>pc,shimMediaStream:()=>Ah,shimOnTrack:()=>wh,shimPeerConnection:()=>mc,shimSenderReceiverGetStats:()=>Rh});var tp=Xr;function pc(n,e){if(e.version>=64)return;let t=n&&n.navigator;if(!t.mediaDevices)return;let i=function(a){if(typeof a!="object"||a.mandatory||a.optional)return a;let c={};return Object.keys(a).forEach(l=>{if(l==="require"||l==="advanced"||l==="mediaSource")return;let h=typeof a[l]=="object"?a[l]:{ideal:a[l]};h.exact!==void 0&&typeof h.exact=="number"&&(h.min=h.max=h.exact);let u=function(f,d){return f?f+d.charAt(0).toUpperCase()+d.slice(1):d==="deviceId"?"sourceId":d};if(h.ideal!==void 0){c.optional=c.optional||[];let f={};typeof h.ideal=="number"?(f[u("min",l)]=h.ideal,c.optional.push(f),f={},f[u("max",l)]=h.ideal,c.optional.push(f)):(f[u("",l)]=h.ideal,c.optional.push(f))}h.exact!==void 0&&typeof h.exact!="number"?(c.mandatory=c.mandatory||{},c.mandatory[u("",l)]=h.exact):["min","max"].forEach(f=>{h[f]!==void 0&&(c.mandatory=c.mandatory||{},c.mandatory[u(f,l)]=h[f])})}),a.advanced&&(c.optional=(c.optional||[]).concat(a.advanced)),c},s=function(a,c){if(e.version>=61)return c(a);if(a=JSON.parse(JSON.stringify(a)),a&&typeof a.audio=="object"){let l=function(h,u,f){u in h&&!(f in h)&&(h[f]=h[u],delete h[u])};a=JSON.parse(JSON.stringify(a)),l(a.audio,"autoGainControl","googAutoGainControl"),l(a.audio,"noiseSuppression","googNoiseSuppression"),a.audio=i(a.audio)}if(a&&typeof a.video=="object"){let l=a.video.facingMode;l=l&&(typeof l=="object"?l:{ideal:l});let h=e.version<66;if(l&&(l.exact==="user"||l.exact==="environment"||l.ideal==="user"||l.ideal==="environment")&&!(t.mediaDevices.getSupportedConstraints&&t.mediaDevices.getSupportedConstraints().facingMode&&!h)){delete a.video.facingMode;let u;if(l.exact==="environment"||l.ideal==="environment"?u=["back","rear"]:(l.exact==="user"||l.ideal==="user")&&(u=["front"]),u)return t.mediaDevices.enumerateDevices().then(f=>{f=f.filter(g=>g.kind==="videoinput");let d=f.find(g=>u.some(y=>g.label.toLowerCase().includes(y)));return!d&&f.length&&u.includes("back")&&(d=f[f.length-1]),d&&(a.video.deviceId=l.exact?{exact:d.deviceId}:{ideal:d.deviceId}),a.video=i(a.video),tp("chrome: "+JSON.stringify(a)),c(a)})}a.video=i(a.video)}return tp("chrome: "+JSON.stringify(a)),c(a)},r=function(a){return e.version>=64?a:{name:{PermissionDeniedError:"NotAllowedError",PermissionDismissedError:"NotAllowedError",InvalidStateError:"NotAllowedError",DevicesNotFoundError:"NotFoundError",ConstraintNotSatisfiedError:"OverconstrainedError",TrackStartError:"NotReadableError",MediaDeviceFailedDueToShutdown:"NotAllowedError",MediaDeviceKillSwitchOn:"NotAllowedError",TabCaptureError:"AbortError",ScreenCaptureError:"AbortError",DeviceCaptureError:"AbortError"}[a.name]||a.name,message:a.message,constraint:a.constraint||a.constraintName,toString(){return this.name+(this.message&&": ")+this.message}}},o=function(a,c,l){s(a,h=>{t.webkitGetUserMedia(h,c,u=>{l&&l(r(u))})})};if(t.getUserMedia=o.bind(t),t.mediaDevices.getUserMedia){let a=t.mediaDevices.getUserMedia.bind(t.mediaDevices);t.mediaDevices.getUserMedia=function(c){return s(c,l=>a(l).then(h=>{if(l.audio&&!h.getAudioTracks().length||l.video&&!h.getVideoTracks().length)throw h.getTracks().forEach(u=>{u.stop()}),new DOMException("","NotFoundError");return h},h=>Promise.reject(r(h))))}}}function Ah(n){n.MediaStream=n.MediaStream||n.webkitMediaStream}function wh(n,e){if(!(e.version>102))if(typeof n=="object"&&n.RTCPeerConnection&&!("ontrack"in n.RTCPeerConnection.prototype)){Object.defineProperty(n.RTCPeerConnection.prototype,"ontrack",{get(){return this._ontrack},set(i){this._ontrack&&this.removeEventListener("track",this._ontrack),this.addEventListener("track",this._ontrack=i)},enumerable:!0,configurable:!0});let t=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(){return this._ontrackpoly||(this._ontrackpoly=s=>{s.stream.addEventListener("addtrack",r=>{let o;n.RTCPeerConnection.prototype.getReceivers?o=this.getReceivers().find(c=>c.track&&c.track.id===r.track.id):o={track:r.track};let a=new Event("track");a.track=r.track,a.receiver=o,a.transceiver={receiver:o},a.streams=[s.stream],this.dispatchEvent(a)}),s.stream.getTracks().forEach(r=>{let o;n.RTCPeerConnection.prototype.getReceivers?o=this.getReceivers().find(c=>c.track&&c.track.id===r.id):o={track:r};let a=new Event("track");a.track=r,a.receiver=o,a.transceiver={receiver:o},a.streams=[s.stream],this.dispatchEvent(a)})},this.addEventListener("addstream",this._ontrackpoly)),t.apply(this,arguments)}}else Jn(n,"track",t=>(t.transceiver||Object.defineProperty(t,"transceiver",{value:{receiver:t.receiver}}),t))}function Ch(n){if(typeof n=="object"&&n.RTCPeerConnection&&!("getSenders"in n.RTCPeerConnection.prototype)&&"createDTMFSender"in n.RTCPeerConnection.prototype){let e=function(s,r){return{track:r,get dtmf(){return this._dtmf===void 0&&(r.kind==="audio"?this._dtmf=s.createDTMFSender(r):this._dtmf=null),this._dtmf},_pc:s}};if(!n.RTCPeerConnection.prototype.getSenders){n.RTCPeerConnection.prototype.getSenders=function(){return this._senders=this._senders||[],this._senders.slice()};let s=n.RTCPeerConnection.prototype.addTrack;n.RTCPeerConnection.prototype.addTrack=function(a,c){let l=s.apply(this,arguments);return l||(l=e(this,a),this._senders.push(l)),l};let r=n.RTCPeerConnection.prototype.removeTrack;n.RTCPeerConnection.prototype.removeTrack=function(a){r.apply(this,arguments);let c=this._senders.indexOf(a);c!==-1&&this._senders.splice(c,1)}}let t=n.RTCPeerConnection.prototype.addStream;n.RTCPeerConnection.prototype.addStream=function(r){this._senders=this._senders||[],t.apply(this,[r]),r.getTracks().forEach(o=>{this._senders.push(e(this,o))})};let i=n.RTCPeerConnection.prototype.removeStream;n.RTCPeerConnection.prototype.removeStream=function(r){this._senders=this._senders||[],i.apply(this,[r]),r.getTracks().forEach(o=>{let a=this._senders.find(c=>c.track===o);a&&this._senders.splice(this._senders.indexOf(a),1)})}}else if(typeof n=="object"&&n.RTCPeerConnection&&"getSenders"in n.RTCPeerConnection.prototype&&"createDTMFSender"in n.RTCPeerConnection.prototype&&n.RTCRtpSender&&!("dtmf"in n.RTCRtpSender.prototype)){let e=n.RTCPeerConnection.prototype.getSenders;n.RTCPeerConnection.prototype.getSenders=function(){let i=e.apply(this,[]);return i.forEach(s=>s._pc=this),i},Object.defineProperty(n.RTCRtpSender.prototype,"dtmf",{get(){return this._dtmf===void 0&&(this.track.kind==="audio"?this._dtmf=this._pc.createDTMFSender(this.track):this._dtmf=null),this._dtmf}})}}function Rh(n,e){if(e.version>=67||!(typeof n=="object"&&n.RTCPeerConnection&&n.RTCRtpSender&&n.RTCRtpReceiver))return;if(!("getStats"in n.RTCRtpSender.prototype)){let i=n.RTCPeerConnection.prototype.getSenders;i&&(n.RTCPeerConnection.prototype.getSenders=function(){let o=i.apply(this,[]);return o.forEach(a=>a._pc=this),o});let s=n.RTCPeerConnection.prototype.addTrack;s&&(n.RTCPeerConnection.prototype.addTrack=function(){let o=s.apply(this,arguments);return o._pc=this,o}),n.RTCRtpSender.prototype.getStats=function(){let o=this;return this._pc.getStats().then(a=>Eh(a,o.track,!0))}}if(!("getStats"in n.RTCRtpReceiver.prototype)){let i=n.RTCPeerConnection.prototype.getReceivers;i&&(n.RTCPeerConnection.prototype.getReceivers=function(){let r=i.apply(this,[]);return r.forEach(o=>o._pc=this),r}),Jn(n,"track",s=>(s.receiver._pc=s.srcElement,s)),n.RTCRtpReceiver.prototype.getStats=function(){let r=this;return this._pc.getStats().then(o=>Eh(o,r.track,!1))}}if(!("getStats"in n.RTCRtpSender.prototype&&"getStats"in n.RTCRtpReceiver.prototype))return;let t=n.RTCPeerConnection.prototype.getStats;n.RTCPeerConnection.prototype.getStats=function(){if(arguments.length>0&&arguments[0]instanceof n.MediaStreamTrack){let s=arguments[0],r,o,a;return this.getSenders().forEach(c=>{c.track===s&&(r?a=!0:r=c)}),this.getReceivers().forEach(c=>(c.track===s&&(o?a=!0:o=c),c.track===s)),a||r&&o?Promise.reject(new DOMException("There are more than one sender or receiver for the track.","InvalidAccessError")):r?r.getStats():o?o.getStats():Promise.reject(new DOMException("There is no sender or receiver for the track.","InvalidAccessError"))}return t.apply(this,arguments)}}function np(n){n.RTCPeerConnection.prototype.getLocalStreams=function(){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},Object.keys(this._shimmedLocalStreams).map(o=>this._shimmedLocalStreams[o][0])};let e=n.RTCPeerConnection.prototype.addTrack;n.RTCPeerConnection.prototype.addTrack=function(o,a){if(!a)return e.apply(this,arguments);this._shimmedLocalStreams=this._shimmedLocalStreams||{};let c=e.apply(this,arguments);return this._shimmedLocalStreams[a.id]?this._shimmedLocalStreams[a.id].indexOf(c)===-1&&this._shimmedLocalStreams[a.id].push(c):this._shimmedLocalStreams[a.id]=[a,c],c};let t=n.RTCPeerConnection.prototype.addStream;n.RTCPeerConnection.prototype.addStream=function(o){this._shimmedLocalStreams=this._shimmedLocalStreams||{},o.getTracks().forEach(l=>{if(this.getSenders().find(u=>u.track===l))throw new DOMException("Track already exists.","InvalidAccessError")});let a=this.getSenders();t.apply(this,arguments);let c=this.getSenders().filter(l=>a.indexOf(l)===-1);this._shimmedLocalStreams[o.id]=[o].concat(c)};let i=n.RTCPeerConnection.prototype.removeStream;n.RTCPeerConnection.prototype.removeStream=function(o){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},delete this._shimmedLocalStreams[o.id],i.apply(this,arguments)};let s=n.RTCPeerConnection.prototype.removeTrack;n.RTCPeerConnection.prototype.removeTrack=function(o){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},o&&Object.keys(this._shimmedLocalStreams).forEach(a=>{let c=this._shimmedLocalStreams[a].indexOf(o);c!==-1&&this._shimmedLocalStreams[a].splice(c,1),this._shimmedLocalStreams[a].length===1&&delete this._shimmedLocalStreams[a]}),s.apply(this,arguments)}}function Ph(n,e){if(!n.RTCPeerConnection)return;if(n.RTCPeerConnection.prototype.addTrack&&e.version>=65)return np(n);let t=n.RTCPeerConnection.prototype.getLocalStreams;n.RTCPeerConnection.prototype.getLocalStreams=function(){let h=t.apply(this);return this._reverseStreams=this._reverseStreams||{},h.map(u=>this._reverseStreams[u.id])};let i=n.RTCPeerConnection.prototype.addStream;n.RTCPeerConnection.prototype.addStream=function(h){if(this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{},h.getTracks().forEach(u=>{if(this.getSenders().find(d=>d.track===u))throw new DOMException("Track already exists.","InvalidAccessError")}),!this._reverseStreams[h.id]){let u=new n.MediaStream(h.getTracks());this._streams[h.id]=u,this._reverseStreams[u.id]=h,h=u}i.apply(this,[h])};let s=n.RTCPeerConnection.prototype.removeStream;n.RTCPeerConnection.prototype.removeStream=function(h){this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{},s.apply(this,[this._streams[h.id]||h]),delete this._reverseStreams[this._streams[h.id]?this._streams[h.id].id:h.id],delete this._streams[h.id]},n.RTCPeerConnection.prototype.addTrack=function(h,u){if(this.signalingState==="closed")throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");let f=[].slice.call(arguments,1);if(f.length!==1||!f[0].getTracks().find(y=>y===h))throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.","NotSupportedError");if(this.getSenders().find(y=>y.track===h))throw new DOMException("Track already exists.","InvalidAccessError");this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{};let g=this._streams[u.id];if(g)g.addTrack(h),Promise.resolve().then(()=>{this.dispatchEvent(new Event("negotiationneeded"))});else{let y=new n.MediaStream([h]);this._streams[u.id]=y,this._reverseStreams[y.id]=u,this.addStream(y)}return this.getSenders().find(y=>y.track===h)};function r(l,h){let u=h.sdp;return Object.keys(l._reverseStreams||[]).forEach(f=>{let d=l._reverseStreams[f],g=l._streams[d.id];u=u.replace(new RegExp(g.id,"g"),d.id)}),new RTCSessionDescription({type:h.type,sdp:u})}function o(l,h){let u=h.sdp;return Object.keys(l._reverseStreams||[]).forEach(f=>{let d=l._reverseStreams[f],g=l._streams[d.id];u=u.replace(new RegExp(d.id,"g"),g.id)}),new RTCSessionDescription({type:h.type,sdp:u})}["createOffer","createAnswer"].forEach(function(l){let h=n.RTCPeerConnection.prototype[l],u={[l](){let f=arguments;return arguments.length&&typeof arguments[0]=="function"?h.apply(this,[g=>{let y=r(this,g);f[0].apply(null,[y])},g=>{f[1]&&f[1].apply(null,g)},arguments[2]]):h.apply(this,arguments).then(g=>r(this,g))}};n.RTCPeerConnection.prototype[l]=u[l]});let a=n.RTCPeerConnection.prototype.setLocalDescription;n.RTCPeerConnection.prototype.setLocalDescription=function(){return!arguments.length||!arguments[0].type?a.apply(this,arguments):(arguments[0]=o(this,arguments[0]),a.apply(this,arguments))};let c=Object.getOwnPropertyDescriptor(n.RTCPeerConnection.prototype,"localDescription");Object.defineProperty(n.RTCPeerConnection.prototype,"localDescription",{get(){let l=c.get.apply(this);return l.type===""?l:r(this,l)}}),n.RTCPeerConnection.prototype.removeTrack=function(h){if(this.signalingState==="closed")throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");if(!h._pc)throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.","TypeError");if(!(h._pc===this))throw new DOMException("Sender was not created by this connection.","InvalidAccessError");this._streams=this._streams||{};let f;Object.keys(this._streams).forEach(d=>{this._streams[d].getTracks().find(y=>h.track===y)&&(f=this._streams[d])}),f&&(f.getTracks().length===1?this.removeStream(this._reverseStreams[f.id]):f.removeTrack(h.track),this.dispatchEvent(new Event("negotiationneeded")))}}function mc(n,e){!n.RTCPeerConnection&&n.webkitRTCPeerConnection&&(n.RTCPeerConnection=n.webkitRTCPeerConnection),n.RTCPeerConnection&&e.version<53&&["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(t){let i=n.RTCPeerConnection.prototype[t],s={[t](){return arguments[0]=new(t==="addIceCandidate"?n.RTCIceCandidate:n.RTCSessionDescription)(arguments[0]),i.apply(this,arguments)}};n.RTCPeerConnection.prototype[t]=s[t]})}function Ih(n,e){e.version>102||Jn(n,"negotiationneeded",t=>{let i=t.target;if(!((e.version<72||i.getConfiguration&&i.getConfiguration().sdpSemantics==="plan-b")&&i.signalingState!=="stable"))return t})}var yc={};go(yc,{shimAddTransceiver:()=>kh,shimCreateAnswer:()=>Gh,shimCreateOffer:()=>zh,shimGetDisplayMedia:()=>ip,shimGetParameters:()=>Bh,shimGetStats:()=>Dh,shimGetUserMedia:()=>_c,shimOnTrack:()=>Lh,shimPeerConnection:()=>xc,shimRTCDataChannel:()=>Fh,shimReceiverGetStats:()=>Uh,shimRemoveStream:()=>Oh,shimSenderGetStats:()=>Nh});function _c(n,e){let t=n&&n.navigator;if(!t.mediaDevices)return;let i=n&&n.MediaStreamTrack;if(t.getUserMedia=function(s,r,o){Vs("navigator.getUserMedia","navigator.mediaDevices.getUserMedia"),t.mediaDevices.getUserMedia(s).then(r,o)},!(e.version>55&&"autoGainControl"in t.mediaDevices.getSupportedConstraints())){let s=function(o,a,c){a in o&&!(c in o)&&(o[c]=o[a],delete o[a])},r=t.mediaDevices.getUserMedia.bind(t.mediaDevices);if(t.mediaDevices.getUserMedia=function(o){return typeof o=="object"&&typeof o.audio=="object"&&(o=JSON.parse(JSON.stringify(o)),s(o.audio,"autoGainControl","mozAutoGainControl"),s(o.audio,"noiseSuppression","mozNoiseSuppression")),r(o)},i&&i.prototype.getSettings){let o=i.prototype.getSettings;i.prototype.getSettings=function(){let a=o.apply(this,arguments);return s(a,"mozAutoGainControl","autoGainControl"),s(a,"mozNoiseSuppression","noiseSuppression"),a}}if(i&&i.prototype.applyConstraints){let o=i.prototype.applyConstraints;i.prototype.applyConstraints=function(a){return this.kind==="audio"&&typeof a=="object"&&(a=JSON.parse(JSON.stringify(a)),s(a,"autoGainControl","mozAutoGainControl"),s(a,"noiseSuppression","mozNoiseSuppression")),o.apply(this,[a])}}}}function ip(n,e){n.navigator.mediaDevices&&(n.navigator.mediaDevices&&"getDisplayMedia"in n.navigator.mediaDevices||(n.navigator.mediaDevices.getDisplayMedia=function(i){if(!(i&&i.video)){let s=new DOMException("getDisplayMedia without video constraints is undefined");return s.name="NotFoundError",s.code=8,Promise.reject(s)}return i.video===!0?i.video={mediaSource:e}:i.video.mediaSource=e,n.navigator.mediaDevices.getUserMedia(i)}))}function Lh(n){typeof n=="object"&&n.RTCTrackEvent&&"receiver"in n.RTCTrackEvent.prototype&&!("transceiver"in n.RTCTrackEvent.prototype)&&Object.defineProperty(n.RTCTrackEvent.prototype,"transceiver",{get(){return{receiver:this.receiver}}})}function xc(n,e){typeof n!="object"||!(n.RTCPeerConnection||n.mozRTCPeerConnection)||(!n.RTCPeerConnection&&n.mozRTCPeerConnection&&(n.RTCPeerConnection=n.mozRTCPeerConnection),e.version<53&&["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(t){let i=n.RTCPeerConnection.prototype[t],s={[t](){return arguments[0]=new(t==="addIceCandidate"?n.RTCIceCandidate:n.RTCSessionDescription)(arguments[0]),i.apply(this,arguments)}};n.RTCPeerConnection.prototype[t]=s[t]}))}function Dh(n,e){if(typeof n!="object"||!(n.RTCPeerConnection||n.mozRTCPeerConnection)||e.version>=151)return;let t={inboundrtp:"inbound-rtp",outboundrtp:"outbound-rtp",candidatepair:"candidate-pair",localcandidate:"local-candidate",remotecandidate:"remote-candidate"},i=n.RTCPeerConnection.prototype.getStats;n.RTCPeerConnection.prototype.getStats=function(){let[r,o,a]=arguments;return this.signalingState==="closed"?Promise.resolve(new Map):i.apply(this,[r||null]).then(c=>{if(e.version<53&&!o)try{c.forEach(l=>{l.type=t[l.type]||l.type})}catch(l){if(l.name!=="TypeError")throw l;c.forEach((h,u)=>{c.set(u,Object.assign({},h,{type:t[h.type]||h.type}))})}return c}).then(o,a)}}function Nh(n){if(!(typeof n=="object"&&n.RTCPeerConnection&&n.RTCRtpSender)||n.RTCRtpSender&&"getStats"in n.RTCRtpSender.prototype)return;let e=n.RTCPeerConnection.prototype.getSenders;e&&(n.RTCPeerConnection.prototype.getSenders=function(){let s=e.apply(this,[]);return s.forEach(r=>r._pc=this),s});let t=n.RTCPeerConnection.prototype.addTrack;t&&(n.RTCPeerConnection.prototype.addTrack=function(){let s=t.apply(this,arguments);return s._pc=this,s}),n.RTCRtpSender.prototype.getStats=function(){return this.track?this._pc.getStats(this.track):Promise.resolve(new Map)}}function Uh(n){if(!(typeof n=="object"&&n.RTCPeerConnection&&n.RTCRtpSender)||n.RTCRtpSender&&"getStats"in n.RTCRtpReceiver.prototype)return;let e=n.RTCPeerConnection.prototype.getReceivers;e&&(n.RTCPeerConnection.prototype.getReceivers=function(){let i=e.apply(this,[]);return i.forEach(s=>s._pc=this),i}),Jn(n,"track",t=>(t.receiver._pc=t.srcElement,t)),n.RTCRtpReceiver.prototype.getStats=function(){return this._pc.getStats(this.track)}}function Oh(n){!n.RTCPeerConnection||"removeStream"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.removeStream=function(t){Vs("removeStream","removeTrack"),this.getSenders().forEach(i=>{i.track&&t.getTracks().includes(i.track)&&this.removeTrack(i)})})}function Fh(n){n.DataChannel&&!n.RTCDataChannel&&(n.RTCDataChannel=n.DataChannel)}function kh(n,e){if(!(typeof n=="object"&&n.RTCPeerConnection)||e.version>=110)return;let t=n.RTCPeerConnection.prototype.addTransceiver;t&&(n.RTCPeerConnection.prototype.addTransceiver=function(){this.setParametersPromises=[];let s=arguments[1]&&arguments[1].sendEncodings;s===void 0&&(s=[]),s=[...s];let r=s.length>0;r&&s.forEach(a=>{if("rid"in a&&!/^[a-z0-9]{0,16}$/i.test(a.rid))throw new TypeError("Invalid RID value provided.");if("scaleResolutionDownBy"in a&&!(parseFloat(a.scaleResolutionDownBy)>=1))throw new RangeError("scale_resolution_down_by must be >= 1.0");if("maxFramerate"in a&&!(parseFloat(a.maxFramerate)>=0))throw new RangeError("max_framerate must be >= 0.0")});let o=t.apply(this,arguments);if(r){let{sender:a}=o,c=a.getParameters();(!("encodings"in c)||c.encodings.length===1&&Object.keys(c.encodings[0]).length===0)&&(c.encodings=s,a.sendEncodings=s,this.setParametersPromises.push(a.setParameters(c).then(()=>{delete a.sendEncodings}).catch(()=>{delete a.sendEncodings})))}return o})}function Bh(n,e){if(!(typeof n=="object"&&n.RTCRtpSender)||e.version>=110)return;let t=n.RTCRtpSender.prototype.getParameters;t&&(n.RTCRtpSender.prototype.getParameters=function(){let s=t.apply(this,arguments);return"encodings"in s||(s.encodings=[].concat(this.sendEncodings||[{}])),s})}function zh(n,e){if(!(typeof n=="object"&&n.RTCPeerConnection)||e.version>=110)return;let t=n.RTCPeerConnection.prototype.createOffer;n.RTCPeerConnection.prototype.createOffer=function(){return this.setParametersPromises&&this.setParametersPromises.length?Promise.all(this.setParametersPromises).then(()=>t.apply(this,arguments)).finally(()=>{this.setParametersPromises=[]}):t.apply(this,arguments)}}function Gh(n,e){if(!(typeof n=="object"&&n.RTCPeerConnection)||e.version>=110)return;let t=n.RTCPeerConnection.prototype.createAnswer;n.RTCPeerConnection.prototype.createAnswer=function(){return this.setParametersPromises&&this.setParametersPromises.length?Promise.all(this.setParametersPromises).then(()=>t.apply(this,arguments)).finally(()=>{this.setParametersPromises=[]}):t.apply(this,arguments)}}var vc={};go(vc,{shimAudioContext:()=>Jh,shimCallbacksAPI:()=>Wh,shimConstraints:()=>sp,shimCreateOfferLegacy:()=>Zh,shimGetUserMedia:()=>Xh,shimLocalStreamsAPI:()=>Hh,shimRTCIceServerUrls:()=>qh,shimRemoteStreamsAPI:()=>Vh,shimTrackEventTransceiver:()=>Yh});function Hh(n){if(!(typeof n!="object"||!n.RTCPeerConnection)){if("getLocalStreams"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.getLocalStreams=function(){return this._localStreams||(this._localStreams=[]),this._localStreams}),!("addStream"in n.RTCPeerConnection.prototype)){let e=n.RTCPeerConnection.prototype.addTrack;n.RTCPeerConnection.prototype.addStream=function(i){this._localStreams||(this._localStreams=[]),this._localStreams.includes(i)||this._localStreams.push(i),i.getAudioTracks().forEach(s=>e.call(this,s,i)),i.getVideoTracks().forEach(s=>e.call(this,s,i))},n.RTCPeerConnection.prototype.addTrack=function(i,...s){return s&&s.forEach(r=>{this._localStreams?this._localStreams.includes(r)||this._localStreams.push(r):this._localStreams=[r]}),e.apply(this,arguments)}}"removeStream"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.removeStream=function(t){this._localStreams||(this._localStreams=[]);let i=this._localStreams.indexOf(t);if(i===-1)return;this._localStreams.splice(i,1);let s=t.getTracks();this.getSenders().forEach(r=>{s.includes(r.track)&&this.removeTrack(r)})})}}function Vh(n){if(!(typeof n!="object"||!n.RTCPeerConnection)&&("getRemoteStreams"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.getRemoteStreams=function(){return this._remoteStreams?this._remoteStreams:[]}),!("onaddstream"in n.RTCPeerConnection.prototype))){Object.defineProperty(n.RTCPeerConnection.prototype,"onaddstream",{get(){return this._onaddstream},set(t){this._onaddstream&&(this.removeEventListener("addstream",this._onaddstream),this.removeEventListener("track",this._onaddstreampoly)),this.addEventListener("addstream",this._onaddstream=t),this.addEventListener("track",this._onaddstreampoly=i=>{i.streams.forEach(s=>{if(this._remoteStreams||(this._remoteStreams=[]),this._remoteStreams.includes(s))return;this._remoteStreams.push(s);let r=new Event("addstream");r.stream=s,this.dispatchEvent(r)})})}});let e=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(){let i=this;return this._onaddstreampoly||this.addEventListener("track",this._onaddstreampoly=function(s){s.streams.forEach(r=>{if(i._remoteStreams||(i._remoteStreams=[]),i._remoteStreams.indexOf(r)>=0)return;i._remoteStreams.push(r);let o=new Event("addstream");o.stream=r,i.dispatchEvent(o)})}),e.apply(i,arguments)}}}function Wh(n){if(typeof n!="object"||!n.RTCPeerConnection)return;let e=n.RTCPeerConnection.prototype,t=e.createOffer,i=e.createAnswer,s=e.setLocalDescription,r=e.setRemoteDescription,o=e.addIceCandidate;e.createOffer=function(l,h){let u=arguments.length>=2?arguments[2]:arguments[0],f=t.apply(this,[u]);return h?(f.then(l,h),Promise.resolve()):f},e.createAnswer=function(l,h){let u=arguments.length>=2?arguments[2]:arguments[0],f=i.apply(this,[u]);return h?(f.then(l,h),Promise.resolve()):f};let a=function(c,l,h){let u=s.apply(this,[c]);return h?(u.then(l,h),Promise.resolve()):u};e.setLocalDescription=a,a=function(c,l,h){let u=r.apply(this,[c]);return h?(u.then(l,h),Promise.resolve()):u},e.setRemoteDescription=a,a=function(c,l,h){let u=o.apply(this,[c]);return h?(u.then(l,h),Promise.resolve()):u},e.addIceCandidate=a}function Xh(n){let e=n&&n.navigator;if(e.mediaDevices&&e.mediaDevices.getUserMedia){let t=e.mediaDevices,i=t.getUserMedia.bind(t);e.mediaDevices.getUserMedia=s=>i(sp(s))}!e.getUserMedia&&e.mediaDevices&&e.mediaDevices.getUserMedia&&(e.getUserMedia=function(i,s,r){e.mediaDevices.getUserMedia(i).then(s,r)}.bind(e))}function sp(n){return n&&n.video!==void 0?Object.assign({},n,{video:Th(n.video)}):n}function qh(n){if(!n.RTCPeerConnection)return;let e=n.RTCPeerConnection;n.RTCPeerConnection=function(i,s){if(i&&i.iceServers){let r=[];for(let o=0;o<i.iceServers.length;o++){let a=i.iceServers[o];a.urls===void 0&&a.url?(Vs("RTCIceServer.url","RTCIceServer.urls"),a=JSON.parse(JSON.stringify(a)),a.urls=a.url,delete a.url,r.push(a)):r.push(i.iceServers[o])}i.iceServers=r}return new e(i,s)},n.RTCPeerConnection.prototype=e.prototype,"generateCertificate"in e&&Object.defineProperty(n.RTCPeerConnection,"generateCertificate",{get(){return e.generateCertificate}})}function Yh(n){typeof n=="object"&&n.RTCTrackEvent&&"receiver"in n.RTCTrackEvent.prototype&&!("transceiver"in n.RTCTrackEvent.prototype)&&Object.defineProperty(n.RTCTrackEvent.prototype,"transceiver",{get(){return{receiver:this.receiver}}})}function Zh(n){let e=n.RTCPeerConnection.prototype.createOffer;n.RTCPeerConnection.prototype.createOffer=function(i){if(i){typeof i.offerToReceiveAudio<"u"&&(i.offerToReceiveAudio=!!i.offerToReceiveAudio);let s=this.getTransceivers().find(o=>o.receiver.track.kind==="audio");i.offerToReceiveAudio===!1&&s?s.direction==="sendrecv"?s.setDirection?s.setDirection("sendonly"):s.direction="sendonly":s.direction==="recvonly"&&(s.setDirection?s.setDirection("inactive"):s.direction="inactive"):i.offerToReceiveAudio===!0&&!s&&this.addTransceiver("audio",{direction:"recvonly"}),typeof i.offerToReceiveVideo<"u"&&(i.offerToReceiveVideo=!!i.offerToReceiveVideo);let r=this.getTransceivers().find(o=>o.receiver.track.kind==="video");i.offerToReceiveVideo===!1&&r?r.direction==="sendrecv"?r.setDirection?r.setDirection("sendonly"):r.direction="sendonly":r.direction==="recvonly"&&(r.setDirection?r.setDirection("inactive"):r.direction="inactive"):i.offerToReceiveVideo===!0&&!r&&this.addTransceiver("video",{direction:"recvonly"})}return e.apply(this,arguments)}}function Jh(n){typeof n!="object"||n.AudioContext||(n.AudioContext=n.webkitAudioContext)}var Kh={};go(Kh,{removeExtmapAllowMixed:()=>Mc,shimAddIceCandidateNullOrEmpty:()=>Jr,shimConnectionState:()=>bc,shimMaxMessageSize:()=>Yr,shimParameterlessSetLocalDescription:()=>$r,shimRTCIceCandidate:()=>qr,shimRTCIceCandidateRelayProtocol:()=>Sc,shimSendThrowTypeError:()=>Zr});var Ws=Ju(jh());function qr(n){if(!n.RTCIceCandidate||n.RTCIceCandidate&&"foundation"in n.RTCIceCandidate.prototype)return;let e=n.RTCIceCandidate;n.RTCIceCandidate=function(i){if(typeof i=="object"&&i.candidate&&i.candidate.indexOf("a=")===0&&(i=JSON.parse(JSON.stringify(i)),i.candidate=i.candidate.substring(2)),i.candidate&&i.candidate.length){let s=new e(i),r=Ws.default.parseCandidate(i.candidate);for(let o in r)o in s||Object.defineProperty(s,o,{value:r[o]});return s.toJSON=function(){return{candidate:s.candidate,sdpMid:s.sdpMid,sdpMLineIndex:s.sdpMLineIndex,usernameFragment:s.usernameFragment}},s}return new e(i)},n.RTCIceCandidate.prototype=e.prototype,Jn(n,"icecandidate",t=>(t.candidate&&Object.defineProperty(t,"candidate",{value:new n.RTCIceCandidate(t.candidate),writable:"false"}),t))}function Sc(n){!n.RTCIceCandidate||n.RTCIceCandidate&&"relayProtocol"in n.RTCIceCandidate.prototype||Jn(n,"icecandidate",e=>{if(e.candidate){let t=Ws.default.parseCandidate(e.candidate.candidate);t.type==="relay"&&(e.candidate.relayProtocol={0:"tls",1:"tcp",2:"udp"}[t.priority>>24])}return e})}function Yr(n,e){if(!n.RTCPeerConnection||e.browser==="chrome"&&e.version>102||e.browser==="firefox"&&e.version>=113)return;"sctp"in n.RTCPeerConnection.prototype||Object.defineProperty(n.RTCPeerConnection.prototype,"sctp",{get(){return typeof this._sctp>"u"?null:this._sctp}});let t=function(a){if(!a||!a.sdp)return!1;let c=Ws.default.splitSections(a.sdp);return c.shift(),c.some(l=>{let h=Ws.default.parseMLine(l);return h&&h.kind==="application"&&h.protocol.indexOf("SCTP")!==-1})},i=function(a){let c=a.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);if(c===null||c.length<2)return-1;let l=parseInt(c[1],10);return l!==l?-1:l},s=function(a){let c=65536;return e.browser==="firefox"&&(e.version<57?a===-1?c=16384:c=2147483637:e.version<60?c=e.version===57?65535:65536:c=2147483637),c},r=function(a,c){let l=65536;e.browser==="firefox"&&e.version===57&&(l=65535);let h=Ws.default.matchPrefix(a.sdp,"a=max-message-size:");return h.length>0?l=parseInt(h[0].substring(19),10):e.browser==="firefox"&&c!==-1&&(l=2147483637),l},o=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(){if(this._sctp=null,e.browser==="chrome"&&e.version>=76){let{sdpSemantics:c}=this.getConfiguration();c==="plan-b"&&Object.defineProperty(this,"sctp",{get(){return typeof this._sctp>"u"?null:this._sctp},enumerable:!0,configurable:!0})}if(t(arguments[0])){let c=i(arguments[0]),l=s(c),h=r(arguments[0],c),u;l===0&&h===0?u=Number.POSITIVE_INFINITY:l===0||h===0?u=Math.max(l,h):u=Math.min(l,h);let f={};Object.defineProperty(f,"maxMessageSize",{get(){return u}}),this._sctp=f}return o.apply(this,arguments)}}function Zr(n,e){if(!(n.RTCPeerConnection&&"createDataChannel"in n.RTCPeerConnection.prototype)||e.browser==="chrome"&&e.version>=149||e.browser==="firefox"&&e.version>60)return;function t(s,r){let o=s.send;s.send=function(){let c=arguments[0],l=c.length||c.size||c.byteLength;if(s.readyState==="open"&&r.sctp&&l>r.sctp.maxMessageSize)throw new TypeError("Message too large (can send a maximum of "+r.sctp.maxMessageSize+" bytes)");return o.apply(s,arguments)}}let i=n.RTCPeerConnection.prototype.createDataChannel;n.RTCPeerConnection.prototype.createDataChannel=function(){let r=i.apply(this,arguments);return t(r,this),r},Jn(n,"datachannel",s=>(t(s.channel,s.target),s))}function bc(n){if(!n.RTCPeerConnection||"connectionState"in n.RTCPeerConnection.prototype)return;let e=n.RTCPeerConnection.prototype;Object.defineProperty(e,"connectionState",{get(){return{completed:"connected",checking:"connecting"}[this.iceConnectionState]||this.iceConnectionState},enumerable:!0,configurable:!0}),Object.defineProperty(e,"onconnectionstatechange",{get(){return this._onconnectionstatechange||null},set(t){this._onconnectionstatechange&&(this.removeEventListener("connectionstatechange",this._onconnectionstatechange),delete this._onconnectionstatechange),t&&this.addEventListener("connectionstatechange",this._onconnectionstatechange=t)},enumerable:!0,configurable:!0}),["setLocalDescription","setRemoteDescription"].forEach(t=>{let i=e[t];e[t]=function(){return this._connectionstatechangepoly||(this._connectionstatechangepoly=s=>{let r=s.target;if(r._lastConnectionState!==r.connectionState){r._lastConnectionState=r.connectionState;let o=new Event("connectionstatechange",s);r.dispatchEvent(o)}return s},this.addEventListener("iceconnectionstatechange",this._connectionstatechangepoly)),i.apply(this,arguments)}})}function Mc(n,e){if(!n.RTCPeerConnection||e.browser==="chrome"&&e.version>=71||e.browser==="safari"&&e._safariVersion>=13.1)return;let t=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(s){if(s&&s.sdp&&s.sdp.indexOf(`
a=extmap-allow-mixed`)!==-1){let r=s.sdp.split(`
`).filter(o=>o.trim()!=="a=extmap-allow-mixed").join(`
`);n.RTCSessionDescription&&s instanceof n.RTCSessionDescription?arguments[0]=new n.RTCSessionDescription({type:s.type,sdp:r}):s.sdp=r}return t.apply(this,arguments)}}function Jr(n,e){if(!(n.RTCPeerConnection&&n.RTCPeerConnection.prototype))return;let t=n.RTCPeerConnection.prototype.addIceCandidate;!t||t.length===0||(n.RTCPeerConnection.prototype.addIceCandidate=function(){return arguments[0]?(e.browser==="chrome"&&e.version<78||e.browser==="firefox"&&e.version<68||e.browser==="safari")&&arguments[0]&&arguments[0].candidate===""?Promise.resolve():t.apply(this,arguments):(arguments[1]&&arguments[1].apply(null),Promise.resolve())})}function $r(n,e){if(!(n.RTCPeerConnection&&n.RTCPeerConnection.prototype))return;let t=n.RTCPeerConnection.prototype.setLocalDescription;!t||t.length===0||(n.RTCPeerConnection.prototype.setLocalDescription=function(){let s=arguments[0]||{};if(typeof s!="object"||s.type&&s.sdp)return t.apply(this,arguments);if(s={type:s.type,sdp:s.sdp},!s.type)switch(this.signalingState){case"stable":case"have-local-offer":case"have-remote-pranswer":s.type="offer";break;default:s.type="answer";break}return s.sdp||s.type!=="offer"&&s.type!=="answer"?t.apply(this,[s]):(s.type==="offer"?this.createOffer:this.createAnswer).apply(this).then(o=>t.apply(this,[o]))})}var Ly=Ju(jh());function rp({window:n}={},e={shimChrome:!0,shimFirefox:!0,shimSafari:!0}){let t=Xr,i=ep(n),s={browserDetails:i,commonShim:Kh,extractVersion:Hs,disableLog:Kf,disableWarnings:Qf,sdp:Ly};switch(i.browser){case"chrome":if(!gc||!mc||!e.shimChrome)return t("Chrome shim is not included in this adapter release."),s;if(i.version===null)return t("Chrome shim can not determine version, not shimming."),s;t("adapter.js shimming chrome."),s.browserShim=gc,Jr(n,i),$r(n,i),pc(n,i),Ah(n,i),mc(n,i),wh(n,i),Ph(n,i),Ch(n,i),Rh(n,i),Ih(n,i),qr(n,i),Sc(n,i),bc(n,i),Yr(n,i),Zr(n,i),Mc(n,i);break;case"firefox":if(!yc||!xc||!e.shimFirefox)return t("Firefox shim is not included in this adapter release."),s;t("adapter.js shimming firefox."),s.browserShim=yc,Jr(n,i),$r(n,i),_c(n,i),xc(n,i),Dh(n,i),Lh(n,i),Oh(n,i),Nh(n,i),Uh(n,i),Fh(n,i),kh(n,i),Bh(n,i),zh(n,i),Gh(n,i),qr(n,i),bc(n,i),Yr(n,i),Zr(n,i);break;case"safari":if(!vc||!e.shimSafari)return t("Safari shim is not included in this adapter release."),s;t("adapter.js shimming safari."),s.browserShim=vc,Jr(n,i),$r(n,i),qh(n,i),Zh(n,i),Wh(n,i),Hh(n,i),Vh(n,i),Yh(n,i),Xh(n,i),Jh(n,i),qr(n,i),Sc(n,i),Yr(n,i),Zr(n,i),Mc(n,i);break;default:t("Unsupported browser!");break}return s}var Dy=rp({window:typeof window>"u"?void 0:window}),Qh=Dy;function ts(n,e,t,i){Object.defineProperty(n,e,{get:t,set:i,enumerable:!0,configurable:!0})}var Ec=class{constructor(){this.chunkedMTU=16300,this._dataCount=1,this.chunk=e=>{let t=[],i=e.byteLength,s=Math.ceil(i/this.chunkedMTU),r=0,o=0;for(;o<i;){let a=Math.min(i,o+this.chunkedMTU),c=e.slice(o,a),l={__peerData:this._dataCount,n:r,data:c,total:s};t.push(l),o=a,r++}return this._dataCount++,t}}};function Ny(n){let e=0;for(let s of n)e+=s.byteLength;let t=new Uint8Array(e),i=0;for(let s of n)t.set(s,i),i+=s.byteLength;return t}var eu=Qh.default||Qh,jr=new class{isWebRTCSupported(){return typeof RTCPeerConnection<"u"}isBrowserSupported(){let n=this.getBrowser(),e=this.getVersion();return this.supportedBrowsers.includes(n)?n==="chrome"?e>=this.minChromeVersion:n==="firefox"?e>=this.minFirefoxVersion:n==="safari"?!this.isIOS&&e>=this.minSafariVersion:!1:!1}getBrowser(){return eu.browserDetails.browser}getVersion(){return eu.browserDetails.version||0}isUnifiedPlanSupported(){let n=this.getBrowser(),e=eu.browserDetails.version||0;if(n==="chrome"&&e<this.minChromeVersion)return!1;if(n==="firefox"&&e>=this.minFirefoxVersion)return!0;if(!window.RTCRtpTransceiver||!("currentDirection"in RTCRtpTransceiver.prototype))return!1;let t,i=!1;try{t=new RTCPeerConnection,t.addTransceiver("audio"),i=!0}catch{}finally{t&&t.close()}return i}toString(){return`Supports:
    browser:${this.getBrowser()}
    version:${this.getVersion()}
    isIOS:${this.isIOS}
    isWebRTCSupported:${this.isWebRTCSupported()}
    isBrowserSupported:${this.isBrowserSupported()}
    isUnifiedPlanSupported:${this.isUnifiedPlanSupported()}`}constructor(){this.isIOS=typeof navigator<"u"?["iPad","iPhone","iPod"].includes(navigator.platform):!1,this.supportedBrowsers=["firefox","chrome","safari"],this.minFirefoxVersion=59,this.minChromeVersion=72,this.minSafariVersion=605}},Uy=n=>!n||/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(n),ap=()=>Math.random().toString(36).slice(2),op={iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:["turn:eu-0.turn.peerjs.com:3478","turn:us-0.turn.peerjs.com:3478"],username:"peerjs",credential:"peerjsp"}],sdpSemantics:"unified-plan"},tu=class extends Ec{noop(){}blobToArrayBuffer(e,t){let i=new FileReader;return i.onload=function(s){s.target&&t(s.target.result)},i.readAsArrayBuffer(e),i}binaryStringToArrayBuffer(e){let t=new Uint8Array(e.length);for(let i=0;i<e.length;i++)t[i]=e.charCodeAt(i)&255;return t.buffer}isSecure(){return location.protocol==="https:"}constructor(...e){super(...e),this.CLOUD_HOST="0.peerjs.com",this.CLOUD_PORT=443,this.chunkedBrowsers={Chrome:1,chrome:1},this.defaultConfig=op,this.browser=jr.getBrowser(),this.browserVersion=jr.getVersion(),this.pack=bh,this.unpack=Sh,this.supports=(function(){let t={browser:jr.isBrowserSupported(),webRTC:jr.isWebRTCSupported(),audioVideo:!1,data:!1,binaryBlob:!1,reliable:!1};if(!t.webRTC)return t;let i;try{i=new RTCPeerConnection(op),t.audioVideo=!0;let s;try{s=i.createDataChannel("_PEERJSTEST",{ordered:!0}),t.data=!0,t.reliable=!!s.ordered;try{s.binaryType="blob",t.binaryBlob=!jr.isIOS}catch{}}catch{}finally{s&&s.close()}}catch{}finally{i&&i.close()}return t})(),this.validateId=Uy,this.randomToken=ap}},ln=new tu,Oy="PeerJS: ";var nu=class{get logLevel(){return this._logLevel}set logLevel(e){this._logLevel=e}log(...e){this._logLevel>=3&&this._print(3,...e)}warn(...e){this._logLevel>=2&&this._print(2,...e)}error(...e){this._logLevel>=1&&this._print(1,...e)}setLogFunction(e){this._print=e}_print(e,...t){let i=[Oy,...t];for(let s in i)i[s]instanceof Error&&(i[s]="("+i[s].name+") "+i[s].message);e>=3?console.log(...i):e>=2?console.warn("WARNING",...i):e>=1&&console.error("ERROR",...i)}constructor(){this._logLevel=0}},Ae=new nu,pu={},Fy=Object.prototype.hasOwnProperty,on="~";function to(){}Object.create&&(to.prototype=Object.create(null),new to().__proto__||(on=!1));function ky(n,e,t){this.fn=n,this.context=e,this.once=t||!1}function cp(n,e,t,i,s){if(typeof t!="function")throw new TypeError("The listener must be a function");var r=new ky(t,i||n,s),o=on?on+e:e;return n._events[o]?n._events[o].fn?n._events[o]=[n._events[o],r]:n._events[o].push(r):(n._events[o]=r,n._eventsCount++),n}function Tc(n,e){--n._eventsCount===0?n._events=new to:delete n._events[e]}function Qt(){this._events=new to,this._eventsCount=0}Qt.prototype.eventNames=function(){var e=[],t,i;if(this._eventsCount===0)return e;for(i in t=this._events)Fy.call(t,i)&&e.push(on?i.slice(1):i);return Object.getOwnPropertySymbols?e.concat(Object.getOwnPropertySymbols(t)):e};Qt.prototype.listeners=function(e){var t=on?on+e:e,i=this._events[t];if(!i)return[];if(i.fn)return[i.fn];for(var s=0,r=i.length,o=new Array(r);s<r;s++)o[s]=i[s].fn;return o};Qt.prototype.listenerCount=function(e){var t=on?on+e:e,i=this._events[t];return i?i.fn?1:i.length:0};Qt.prototype.emit=function(e,t,i,s,r,o){var a=on?on+e:e;if(!this._events[a])return!1;var c=this._events[a],l=arguments.length,h,u;if(c.fn){switch(c.once&&this.removeListener(e,c.fn,void 0,!0),l){case 1:return c.fn.call(c.context),!0;case 2:return c.fn.call(c.context,t),!0;case 3:return c.fn.call(c.context,t,i),!0;case 4:return c.fn.call(c.context,t,i,s),!0;case 5:return c.fn.call(c.context,t,i,s,r),!0;case 6:return c.fn.call(c.context,t,i,s,r,o),!0}for(u=1,h=new Array(l-1);u<l;u++)h[u-1]=arguments[u];c.fn.apply(c.context,h)}else{var f=c.length,d;for(u=0;u<f;u++)switch(c[u].once&&this.removeListener(e,c[u].fn,void 0,!0),l){case 1:c[u].fn.call(c[u].context);break;case 2:c[u].fn.call(c[u].context,t);break;case 3:c[u].fn.call(c[u].context,t,i);break;case 4:c[u].fn.call(c[u].context,t,i,s);break;default:if(!h)for(d=1,h=new Array(l-1);d<l;d++)h[d-1]=arguments[d];c[u].fn.apply(c[u].context,h)}}return!0};Qt.prototype.on=function(e,t,i){return cp(this,e,t,i,!1)};Qt.prototype.once=function(e,t,i){return cp(this,e,t,i,!0)};Qt.prototype.removeListener=function(e,t,i,s){var r=on?on+e:e;if(!this._events[r])return this;if(!t)return Tc(this,r),this;var o=this._events[r];if(o.fn)o.fn===t&&(!s||o.once)&&(!i||o.context===i)&&Tc(this,r);else{for(var a=0,c=[],l=o.length;a<l;a++)(o[a].fn!==t||s&&!o[a].once||i&&o[a].context!==i)&&c.push(o[a]);c.length?this._events[r]=c.length===1?c[0]:c:Tc(this,r)}return this};Qt.prototype.removeAllListeners=function(e){var t;return e?(t=on?on+e:e,this._events[t]&&Tc(this,t)):(this._events=new to,this._eventsCount=0),this};Qt.prototype.off=Qt.prototype.removeListener;Qt.prototype.addListener=Qt.prototype.on;Qt.prefixed=on;Qt.EventEmitter=Qt;pu=Qt;var ns={};ts(ns,"ConnectionType",()=>Pi);ts(ns,"PeerErrorType",()=>Rt);ts(ns,"BaseConnectionErrorType",()=>iu);ts(ns,"DataConnectionErrorType",()=>mu);ts(ns,"SerializationType",()=>Ic);ts(ns,"SocketEventType",()=>Ri);ts(ns,"ServerMessageType",()=>Kt);var Pi=(function(n){return n.Data="data",n.Media="media",n})({}),Rt=(function(n){return n.BrowserIncompatible="browser-incompatible",n.Disconnected="disconnected",n.InvalidID="invalid-id",n.InvalidKey="invalid-key",n.Network="network",n.PeerUnavailable="peer-unavailable",n.SslUnavailable="ssl-unavailable",n.ServerError="server-error",n.SocketError="socket-error",n.SocketClosed="socket-closed",n.UnavailableID="unavailable-id",n.WebRTC="webrtc",n})({}),iu=(function(n){return n.NegotiationFailed="negotiation-failed",n.ConnectionClosed="connection-closed",n})({}),mu=(function(n){return n.NotOpenYet="not-open-yet",n.MessageToBig="message-too-big",n})({}),Ic=(function(n){return n.Binary="binary",n.BinaryUTF8="binary-utf8",n.JSON="json",n.None="raw",n})({}),Ri=(function(n){return n.Message="message",n.Disconnected="disconnected",n.Error="error",n.Close="close",n})({}),Kt=(function(n){return n.Heartbeat="HEARTBEAT",n.Candidate="CANDIDATE",n.Offer="OFFER",n.Answer="ANSWER",n.Open="OPEN",n.Error="ERROR",n.IdTaken="ID-TAKEN",n.InvalidKey="INVALID-KEY",n.Leave="LEAVE",n.Expire="EXPIRE",n})({}),lp="1.5.5",su=class extends pu.EventEmitter{constructor(e,t,i,s,r,o=5e3){super(),this.pingInterval=o,this._disconnected=!0,this._messagesQueue=[];let a=e?"wss://":"ws://";this._baseUrl=a+t+":"+i+s+"peerjs?key="+r}start(e,t){this._id=e;let i=`${this._baseUrl}&id=${e}&token=${t}`;this._socket||!this._disconnected||(this._socket=new WebSocket(i+"&version="+lp),this._disconnected=!1,this._socket.onmessage=s=>{let r;try{r=JSON.parse(s.data),Ae.log("Server message received:",r)}catch{Ae.log("Invalid server message",s.data);return}this.emit(Ri.Message,r)},this._socket.onclose=s=>{this._disconnected||(Ae.log("Socket closed.",s),this._cleanup(),this._disconnected=!0,this.emit(Ri.Disconnected))},this._socket.onopen=()=>{this._disconnected||(this._sendQueuedMessages(),Ae.log("Socket open"),this._scheduleHeartbeat())})}_scheduleHeartbeat(){this._wsPingTimer=setTimeout(()=>{this._sendHeartbeat()},this.pingInterval)}_sendHeartbeat(){if(!this._wsOpen()){Ae.log("Cannot send heartbeat, because socket closed");return}let e=JSON.stringify({type:Kt.Heartbeat});this._socket.send(e),this._scheduleHeartbeat()}_wsOpen(){return!!this._socket&&this._socket.readyState===1}_sendQueuedMessages(){let e=[...this._messagesQueue];this._messagesQueue=[];for(let t of e)this.send(t)}send(e){if(this._disconnected)return;if(!this._id){this._messagesQueue.push(e);return}if(!e.type){this.emit(Ri.Error,"Invalid message");return}if(!this._wsOpen())return;let t=JSON.stringify(e);this._socket.send(t)}close(){this._disconnected||(this._cleanup(),this._disconnected=!0)}_cleanup(){this._socket&&(this._socket.onopen=this._socket.onmessage=this._socket.onclose=null,this._socket.close(),this._socket=void 0),clearTimeout(this._wsPingTimer)}},Ac=class{constructor(e){this.connection=e}startConnection(e){let t=this._startPeerConnection();if(this.connection.peerConnection=t,this.connection.type===Pi.Media&&e._stream&&this._addTracksToConnection(e._stream,t),e.originator){let i=this.connection,s={ordered:!!e.reliable},r=t.createDataChannel(i.label,s);i._initializeDataChannel(r),this._makeOffer()}else this.handleSDP("OFFER",e.sdp)}_startPeerConnection(){Ae.log("Creating RTCPeerConnection.");let e=new RTCPeerConnection(this.connection.provider.options.config);return this._setupListeners(e),e}_setupListeners(e){let t=this.connection.peer,i=this.connection.connectionId,s=this.connection.type,r=this.connection.provider;Ae.log("Listening for ICE candidates."),e.onicecandidate=o=>{!o.candidate||!o.candidate.candidate||(Ae.log(`Received ICE candidates for ${t}:`,o.candidate),r.socket.send({type:Kt.Candidate,payload:{candidate:o.candidate,type:s,connectionId:i},dst:t}))},e.oniceconnectionstatechange=()=>{switch(e.iceConnectionState){case"failed":Ae.log("iceConnectionState is failed, closing connections to "+t),this.connection.emitError(iu.NegotiationFailed,"Negotiation of connection to "+t+" failed."),this.connection.close();break;case"closed":Ae.log("iceConnectionState is closed, closing connections to "+t),this.connection.emitError(iu.ConnectionClosed,"Connection to "+t+" closed."),this.connection.close();break;case"disconnected":Ae.log("iceConnectionState changed to disconnected on the connection with "+t);break;case"completed":e.onicecandidate=()=>{};break}this.connection.emit("iceStateChanged",e.iceConnectionState)},Ae.log("Listening for data channel"),e.ondatachannel=o=>{Ae.log("Received data channel");let a=o.channel;r.getConnection(t,i)._initializeDataChannel(a)},Ae.log("Listening for remote stream"),e.ontrack=o=>{Ae.log("Received remote stream");let a=o.streams[0],c=r.getConnection(t,i);if(c.type===Pi.Media){let l=c;this._addStreamToMediaConnection(a,l)}}}cleanup(){Ae.log("Cleaning up PeerConnection to "+this.connection.peer);let e=this.connection.peerConnection;if(!e)return;this.connection.peerConnection=null,e.onicecandidate=e.oniceconnectionstatechange=e.ondatachannel=e.ontrack=()=>{};let t=e.signalingState!=="closed",i=!1,s=this.connection.dataChannel;s&&(i=!!s.readyState&&s.readyState!=="closed"),(t||i)&&e.close()}async _makeOffer(){let e=this.connection.peerConnection,t=this.connection.provider;try{let i=await e.createOffer(this.connection.options.constraints);Ae.log("Created offer."),this.connection.options.sdpTransform&&typeof this.connection.options.sdpTransform=="function"&&(i.sdp=this.connection.options.sdpTransform(i.sdp)||i.sdp);try{await e.setLocalDescription(i),Ae.log("Set localDescription:",i,`for:${this.connection.peer}`);let s={sdp:i,type:this.connection.type,connectionId:this.connection.connectionId,metadata:this.connection.metadata};if(this.connection.type===Pi.Data){let r=this.connection;s={...s,label:r.label,reliable:r.reliable,serialization:r.serialization}}t.socket.send({type:Kt.Offer,payload:s,dst:this.connection.peer})}catch(s){s!="OperationError: Failed to set local offer sdp: Called in wrong state: kHaveRemoteOffer"&&(t.emitError(Rt.WebRTC,s),Ae.log("Failed to setLocalDescription, ",s))}}catch(i){t.emitError(Rt.WebRTC,i),Ae.log("Failed to createOffer, ",i)}}async _makeAnswer(){let e=this.connection.peerConnection,t=this.connection.provider;try{let i=await e.createAnswer();Ae.log("Created answer."),this.connection.options.sdpTransform&&typeof this.connection.options.sdpTransform=="function"&&(i.sdp=this.connection.options.sdpTransform(i.sdp)||i.sdp);try{await e.setLocalDescription(i),Ae.log("Set localDescription:",i,`for:${this.connection.peer}`),t.socket.send({type:Kt.Answer,payload:{sdp:i,type:this.connection.type,connectionId:this.connection.connectionId},dst:this.connection.peer})}catch(s){t.emitError(Rt.WebRTC,s),Ae.log("Failed to setLocalDescription, ",s)}}catch(i){t.emitError(Rt.WebRTC,i),Ae.log("Failed to create answer, ",i)}}async handleSDP(e,t){t=new RTCSessionDescription(t);let i=this.connection.peerConnection,s=this.connection.provider;Ae.log("Setting remote description",t);let r=this;try{await i.setRemoteDescription(t),Ae.log(`Set remoteDescription:${e} for:${this.connection.peer}`),e==="OFFER"&&await r._makeAnswer()}catch(o){s.emitError(Rt.WebRTC,o),Ae.log("Failed to setRemoteDescription, ",o)}}async handleCandidate(e){Ae.log("handleCandidate:",e);try{await this.connection.peerConnection.addIceCandidate(e),Ae.log(`Added ICE candidate for:${this.connection.peer}`)}catch(t){this.connection.provider.emitError(Rt.WebRTC,t),Ae.log("Failed to handleCandidate, ",t)}}_addTracksToConnection(e,t){if(Ae.log(`add tracks from stream ${e.id} to peer connection`),!t.addTrack)return Ae.error("Your browser does't support RTCPeerConnection#addTrack. Ignored.");e.getTracks().forEach(i=>{t.addTrack(i,e)})}_addStreamToMediaConnection(e,t){Ae.log(`add stream ${e.id} to media connection ${t.connectionId}`),t.addStream(e)}},wc=class extends pu.EventEmitter{emitError(e,t){Ae.error("Error:",t),this.emit("error",new ru(`${e}`,t))}},ru=class extends Error{constructor(e,t){typeof t=="string"?super(t):(super(),Object.assign(this,t)),this.type=e}},Cc=class extends wc{get open(){return this._open}constructor(e,t,i){super(),this.peer=e,this.provider=t,this.options=i,this._open=!1,this.metadata=i.metadata}},hu,Qr=class Qr extends Cc{get type(){return Pi.Media}get localStream(){return this._localStream}get remoteStream(){return this._remoteStream}constructor(e,t,i){super(e,t,i),this._localStream=this.options._stream,this.connectionId=this.options.connectionId||Qr.ID_PREFIX+ln.randomToken(),this._negotiator=new Ac(this),this._localStream&&this._negotiator.startConnection({_stream:this._localStream,originator:!0})}_initializeDataChannel(e){this.dataChannel=e,this.dataChannel.onopen=()=>{Ae.log(`DC#${this.connectionId} dc connection success`),this.emit("willCloseOnRemote")},this.dataChannel.onclose=()=>{Ae.log(`DC#${this.connectionId} dc closed for:`,this.peer),this.close()}}addStream(e){Ae.log("Receiving stream",e),this._remoteStream=e,super.emit("stream",e)}handleMessage(e){let t=e.type,i=e.payload;switch(e.type){case Kt.Answer:this._negotiator.handleSDP(t,i.sdp),this._open=!0;break;case Kt.Candidate:this._negotiator.handleCandidate(i.candidate);break;default:Ae.warn(`Unrecognized message type:${t} from peer:${this.peer}`);break}}answer(e,t={}){if(this._localStream){Ae.warn("Local stream already exists on this MediaConnection. Are you answering a call twice?");return}this._localStream=e,t&&t.sdpTransform&&(this.options.sdpTransform=t.sdpTransform),this._negotiator.startConnection({...this.options._payload,_stream:e});let i=this.provider._getMessages(this.connectionId);for(let s of i)this.handleMessage(s);this._open=!0}close(){this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this._localStream=null,this._remoteStream=null,this.provider&&(this.provider._removeConnection(this),this.provider=null),this.options&&this.options._stream&&(this.options._stream=null),this.open&&(this._open=!1,super.emit("close"))}};hu=new WeakMap,Qs(Qr,hu,Qr.ID_PREFIX="mc_");var Rc=Qr,ou=class{constructor(e){this._options=e}_buildRequest(e){let t=this._options.secure?"https":"http",{host:i,port:s,path:r,key:o}=this._options,a=new URL(`${t}://${i}:${s}${r}${o}/${e}`);return a.searchParams.set("ts",`${Date.now()}${Math.random()}`),a.searchParams.set("version",lp),fetch(a.href,{referrerPolicy:this._options.referrerPolicy})}async retrieveId(){try{let e=await this._buildRequest("id");if(e.status!==200)throw new Error(`Error. Status:${e.status}`);return e.text()}catch(e){Ae.error("Error retrieving ID",e);let t="";throw this._options.path==="/"&&this._options.host!==ln.CLOUD_HOST&&(t=" If you passed in a `path` to your self-hosted PeerServer, you'll also need to pass in that same path when creating a new Peer."),new Error("Could not get an ID from the server."+t)}}async listAllPeers(){try{let e=await this._buildRequest("peers");if(e.status!==200){if(e.status===401){let t="";throw this._options.host===ln.CLOUD_HOST?t="It looks like you're using the cloud server. You can email team@peerjs.com to enable peer listing for your API key.":t="You need to enable `allow_discovery` on your self-hosted PeerServer to use this feature.",new Error("It doesn't look like you have permission to list peers IDs. "+t)}throw new Error(`Error. Status:${e.status}`)}return e.json()}catch(e){throw Ae.error("Error retrieving list peers",e),new Error("Could not get list peers from the server."+e)}}},uu,du,es=class es extends Cc{get type(){return Pi.Data}constructor(e,t,i){super(e,t,i),this.connectionId=this.options.connectionId||es.ID_PREFIX+ap(),this.label=this.options.label||this.connectionId,this.reliable=!!this.options.reliable,this._negotiator=new Ac(this),this._negotiator.startConnection(this.options._payload||{originator:!0,reliable:this.reliable})}_initializeDataChannel(e){this.dataChannel=e,this.dataChannel.onopen=()=>{Ae.log(`DC#${this.connectionId} dc connection success`),this._open=!0,this.emit("open")},this.dataChannel.onmessage=t=>{Ae.log(`DC#${this.connectionId} dc onmessage:`,t.data)},this.dataChannel.onclose=()=>{Ae.log(`DC#${this.connectionId} dc closed for:`,this.peer),this.close()}}close(e){if(e?.flush){this.send({__peerData:{type:"close"}});return}this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this.provider&&(this.provider._removeConnection(this),this.provider=null),this.dataChannel&&(this.dataChannel.onopen=null,this.dataChannel.onmessage=null,this.dataChannel.onclose=null,this.dataChannel=null),this.open&&(this._open=!1,super.emit("close"))}send(e,t=!1){if(!this.open){this.emitError(mu.NotOpenYet,"Connection is not open. You should listen for the `open` event before sending messages.");return}return this._send(e,t)}async handleMessage(e){let t=e.payload;switch(e.type){case Kt.Answer:await this._negotiator.handleSDP(e.type,t.sdp);break;case Kt.Candidate:await this._negotiator.handleCandidate(t.candidate);break;default:Ae.warn("Unrecognized message type:",e.type,"from peer:",this.peer);break}}};uu=new WeakMap,du=new WeakMap,Qs(es,uu,es.ID_PREFIX="dc_"),Qs(es,du,es.MAX_BUFFERED_AMOUNT=8388608);var Pc=es,no=class extends Pc{get bufferSize(){return this._bufferSize}_initializeDataChannel(e){super._initializeDataChannel(e),this.dataChannel.binaryType="arraybuffer",this.dataChannel.addEventListener("message",t=>this._handleDataMessage(t))}_bufferedSend(e){(this._buffering||!this._trySend(e))&&(this._buffer.push(e),this._bufferSize=this._buffer.length)}_trySend(e){if(!this.open)return!1;if(this.dataChannel.bufferedAmount>Pc.MAX_BUFFERED_AMOUNT)return this._buffering=!0,setTimeout(()=>{this._buffering=!1,this._tryBuffer()},50),!1;try{this.dataChannel.send(e)}catch(t){return Ae.error(`DC#:${this.connectionId} Error when sending:`,t),this._buffering=!0,this.close(),!1}return!0}_tryBuffer(){if(!this.open||this._buffer.length===0)return;let e=this._buffer[0];this._trySend(e)&&(this._buffer.shift(),this._bufferSize=this._buffer.length,this._tryBuffer())}close(e){if(e?.flush){this.send({__peerData:{type:"close"}});return}this._buffer=[],this._bufferSize=0,super.close()}constructor(...e){super(...e),this._buffer=[],this._bufferSize=0,this._buffering=!1}},Kr=class extends no{close(e){super.close(e),this._chunkedData={}}constructor(e,t,i){super(e,t,i),this.chunker=new Ec,this.serialization=Ic.Binary,this._chunkedData={}}_handleDataMessage({data:e}){let t=Sh(e),i=t.__peerData;if(i){if(i.type==="close"){this.close();return}this._handleChunk(t);return}this.emit("data",t)}_handleChunk(e){let t=e.__peerData,i=this._chunkedData[t]||{data:[],count:0,total:e.total};if(i.data[e.n]=new Uint8Array(e.data),i.count++,this._chunkedData[t]=i,i.total===i.count){delete this._chunkedData[t];let s=Ny(i.data);this._handleDataMessage({data:s})}}_send(e,t){let i=bh(e);if(i instanceof Promise)return this._send_blob(i);if(!t&&i.byteLength>this.chunker.chunkedMTU){this._sendChunks(i);return}this._bufferedSend(i)}async _send_blob(e){let t=await e;if(t.byteLength>this.chunker.chunkedMTU){this._sendChunks(t);return}this._bufferedSend(t)}_sendChunks(e){let t=this.chunker.chunk(e);Ae.log(`DC#${this.connectionId} Try to send ${t.length} chunks...`);for(let i of t)this.send(i,!0)}},au=class extends no{_handleDataMessage({data:e}){super.emit("data",e)}_send(e,t){this._bufferedSend(e)}constructor(...e){super(...e),this.serialization=Ic.None}},cu=class extends no{_handleDataMessage({data:e}){let t=this.parse(this.decoder.decode(e)),i=t.__peerData;if(i&&i.type==="close"){this.close();return}this.emit("data",t)}_send(e,t){let i=this.encoder.encode(this.stringify(e));if(i.byteLength>=ln.chunkedMTU){this.emitError(mu.MessageToBig,"Message too big for JSON channel");return}this._bufferedSend(i)}constructor(...e){super(...e),this.serialization=Ic.JSON,this.encoder=new TextEncoder,this.decoder=new TextDecoder,this.stringify=JSON.stringify,this.parse=JSON.parse}};var fu,eo=class eo extends wc{get id(){return this._id}get options(){return this._options}get open(){return this._open}get socket(){return this._socket}get connections(){let e=Object.create(null);for(let[t,i]of this._connections)e[t]=i;return e}get destroyed(){return this._destroyed}get disconnected(){return this._disconnected}constructor(e,t){super(),this._serializers={raw:au,json:cu,binary:Kr,"binary-utf8":Kr,default:Kr},this._id=null,this._lastServerId=null,this._destroyed=!1,this._disconnected=!1,this._open=!1,this._connections=new Map,this._lostMessages=new Map;let i;if(e&&e.constructor==Object?t=e:e&&(i=e.toString()),t={debug:0,host:ln.CLOUD_HOST,port:ln.CLOUD_PORT,path:"/",key:eo.DEFAULT_KEY,token:ln.randomToken(),config:ln.defaultConfig,referrerPolicy:"strict-origin-when-cross-origin",serializers:{},...t},this._options=t,this._serializers={...this._serializers,...this.options.serializers},this._options.host==="/"&&(this._options.host=window.location.hostname),this._options.path&&(this._options.path[0]!=="/"&&(this._options.path="/"+this._options.path),this._options.path[this._options.path.length-1]!=="/"&&(this._options.path+="/")),this._options.secure===void 0&&this._options.host!==ln.CLOUD_HOST?this._options.secure=ln.isSecure():this._options.host==ln.CLOUD_HOST&&(this._options.secure=!0),this._options.logFunction&&Ae.setLogFunction(this._options.logFunction),Ae.logLevel=this._options.debug||0,this._api=new ou(t),this._socket=this._createServerConnection(),!ln.supports.audioVideo&&!ln.supports.data){this._delayedAbort(Rt.BrowserIncompatible,"The current browser does not support WebRTC");return}if(i&&!ln.validateId(i)){this._delayedAbort(Rt.InvalidID,`ID "${i}" is invalid`);return}i?this._initialize(i):this._api.retrieveId().then(s=>this._initialize(s)).catch(s=>this._abort(Rt.ServerError,s))}_createServerConnection(){let e=new su(this._options.secure,this._options.host,this._options.port,this._options.path,this._options.key,this._options.pingInterval);return e.on(Ri.Message,t=>{this._handleMessage(t)}),e.on(Ri.Error,t=>{this._abort(Rt.SocketError,t)}),e.on(Ri.Disconnected,()=>{this.disconnected||(this.emitError(Rt.Network,"Lost connection to server."),this.disconnect())}),e.on(Ri.Close,()=>{this.disconnected||this._abort(Rt.SocketClosed,"Underlying socket is already closed.")}),e}_initialize(e){this._id=e,this.socket.start(e,this._options.token)}_handleMessage(e){let t=e.type,i=e.payload,s=e.src;switch(t){case Kt.Open:this._lastServerId=this.id,this._open=!0,this.emit("open",this.id);break;case Kt.Error:this._abort(Rt.ServerError,i.msg);break;case Kt.IdTaken:this._abort(Rt.UnavailableID,`ID "${this.id}" is taken`);break;case Kt.InvalidKey:this._abort(Rt.InvalidKey,`API KEY "${this._options.key}" is invalid`);break;case Kt.Leave:Ae.log(`Received leave message from ${s}`),this._cleanupPeer(s),this._connections.delete(s);break;case Kt.Expire:this.emitError(Rt.PeerUnavailable,`Could not connect to peer ${s}`);break;case Kt.Offer:{let r=i.connectionId,o=this.getConnection(s,r);if(o&&(o.close(),Ae.warn(`Offer received for existing Connection ID:${r}`)),i.type===Pi.Media){let c=new Rc(s,this,{connectionId:r,_payload:i,metadata:i.metadata});o=c,this._addConnection(s,o),this.emit("call",c)}else if(i.type===Pi.Data){let c=new this._serializers[i.serialization](s,this,{connectionId:r,_payload:i,metadata:i.metadata,label:i.label,serialization:i.serialization,reliable:i.reliable});o=c,this._addConnection(s,o),this.emit("connection",c)}else{Ae.warn(`Received malformed connection type:${i.type}`);return}let a=this._getMessages(r);for(let c of a)o.handleMessage(c);break}default:{if(!i){Ae.warn(`You received a malformed message from ${s} of type ${t}`);return}let r=i.connectionId,o=this.getConnection(s,r);o&&o.peerConnection?o.handleMessage(e):r?this._storeMessage(r,e):Ae.warn("You received an unrecognized message:",e);break}}}_storeMessage(e,t){this._lostMessages.has(e)||this._lostMessages.set(e,[]),this._lostMessages.get(e).push(t)}_getMessages(e){let t=this._lostMessages.get(e);return t?(this._lostMessages.delete(e),t):[]}connect(e,t={}){if(t={serialization:"default",...t},this.disconnected){Ae.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect, or call reconnect on this peer if you believe its ID to still be available."),this.emitError(Rt.Disconnected,"Cannot connect to new Peer after disconnecting from server.");return}let i=new this._serializers[t.serialization](e,this,t);return this._addConnection(e,i),i}call(e,t,i={}){if(this.disconnected){Ae.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect."),this.emitError(Rt.Disconnected,"Cannot connect to new Peer after disconnecting from server.");return}if(!t){Ae.error("To call a peer, you must provide a stream from your browser's `getUserMedia`.");return}let s=new Rc(e,this,{...i,_stream:t});return this._addConnection(e,s),s}_addConnection(e,t){Ae.log(`add connection ${t.type}:${t.connectionId} to peerId:${e}`),this._connections.has(e)||this._connections.set(e,[]),this._connections.get(e).push(t)}_removeConnection(e){let t=this._connections.get(e.peer);if(t){let i=t.indexOf(e);i!==-1&&t.splice(i,1)}this._lostMessages.delete(e.connectionId)}getConnection(e,t){let i=this._connections.get(e);if(!i)return null;for(let s of i)if(s.connectionId===t)return s;return null}_delayedAbort(e,t){setTimeout(()=>{this._abort(e,t)},0)}_abort(e,t){Ae.error("Aborting!"),this.emitError(e,t),this._lastServerId?this.disconnect():this.destroy()}destroy(){this.destroyed||(Ae.log(`Destroy peer with ID:${this.id}`),this.disconnect(),this._cleanup(),this._destroyed=!0,this.emit("close"))}_cleanup(){for(let e of this._connections.keys())this._cleanupPeer(e),this._connections.delete(e);this.socket.removeAllListeners()}_cleanupPeer(e){let t=this._connections.get(e);if(t)for(let i of t)i.close()}disconnect(){if(this.disconnected)return;let e=this.id;Ae.log(`Disconnect peer with ID:${e}`),this._disconnected=!0,this._open=!1,this.socket.close(),this._lastServerId=e,this._id=null,this.emit("disconnected",e)}reconnect(){if(this.disconnected&&!this.destroyed)Ae.log(`Attempting reconnection to server with ID ${this._lastServerId}`),this._disconnected=!1,this._initialize(this._lastServerId);else{if(this.destroyed)throw new Error("This peer cannot reconnect to the server. It has already been destroyed.");if(!this.disconnected&&!this.open)Ae.error("In a hurry? We're still trying to make the initial connection!");else throw new Error(`Peer ${this.id} cannot reconnect because it is not disconnected from the server!`)}}listAllPeers(e=t=>{}){this._api.listAllPeers().then(t=>e(t)).catch(t=>this._abort(Rt.ServerError,t))}};fu=new WeakMap,Qs(eo,fu,eo.DEFAULT_KEY="peerjs");var lu=eo;var hp=lu;var Dc=[{id:"chef",name:"Chef",emoji:"\u{1F468}\u200D\u{1F373}",tag:"kitchen",color:15921906,ab:"hint",abName:"Secret Recipe",abDesc:"Remove 2 wrong answers on a question (2 times).",charges:2},{id:"doctor",name:"Doctor",emoji:"\u{1FA7A}",tag:"clinic",color:4171680,ab:"revive",abName:"Revive",abDesc:"Bring back a caught teammate. Stand next to their body and press Q (once).",charges:1},{id:"librarian",name:"Librarian",emoji:"\u{1F4DA}",tag:"library",color:8081312,ab:"clue",abName:"Book of Secrets",abDesc:"Reveal one extra clue about the killer (once). Press Q.",charges:1},{id:"scientist",name:"Scientist",emoji:"\u{1F52C}",tag:"lab",color:15263976,ab:"danger",abName:"Danger Sense",abDesc:"Your screen pulses red when the killer is close (automatic).",charges:0},{id:"engineer",name:"Engineer",emoji:"\u{1F527}",tag:"workshop",color:15902976,ab:"second",abName:"Second Chance",abDesc:"A wrong answer will NOT power up the killer (2 times, automatic).",charges:2},{id:"detective",name:"Detective",emoji:"\u{1F575}\uFE0F",tag:"office",color:7031342,ab:"xray",abName:"X-Ray Eyes",abDesc:"See everyone through walls for 5 seconds. Press Q (45s recharge).",cd:45,dur:5},{id:"explorer",name:"Explorer",emoji:"\u{1F9ED}",tag:"outdoor",color:3967548,ab:"sprint",abName:"Super Sprint",abDesc:"Run much faster for 4 seconds. Press Q (25s recharge).",cd:25,dur:4},{id:"artist",name:"Artist",emoji:"\u{1F3A8}",tag:"art",color:14174826,ab:"lamp",abName:"Glow Lamp",abDesc:"Drop a bright lamp that glows for 40 seconds. Press Q (30s recharge).",cd:30,dur:40}],mn=n=>Dc.find(e=>e.id===n)||Dc[0],By={kitchen:"Stove",clinic:"Hospital Bed",library:"Bookshelf",lab:"Lab Bench",workshop:"Workbench",office:"Desk",outdoor:"Supply Crates",art:"Easel"},Lc={school:{name:"Haunted School",emoji:"\u{1F3EB}",seed:11,indoor:!0,H:3.8,bg:263432,fog:.085,hemi:[4871288,1709330,.6],floor:[4867646,4209717],wall:7301467,ceil:2828839,trim:3814701,bulb:16770728,blood:6949900,pc:[8018490,6112816,4087658],props:["table","locker","shelf","crate","table"],hub:"Main Hall",exit:"Front Gate",rooms:{"0,0":["library","Library"],"1,0":["lab","Science Lab"],"2,0":["art","Art Room"],"0,1":["kitchen","Canteen"],"2,1":["clinic","Sick Bay"],"0,2":["workshop","Workshop"],"1,2":["outdoor","Gym"],"2,2":["office","Principal's Office"]},links:["11-10","11-01","11-21*","11-12","00-10","00-01*","20-10","02-01","22-21","22-12*"]},hospital:{name:"Abandoned Hospital",emoji:"\u{1F3E5}",seed:23,indoor:!0,H:3.6,bg:198408,fog:.09,hemi:[5933702,1055256,.6],floor:[8227462,7306360],wall:10334378,ceil:5201242,trim:6255213,bulb:13172720,blood:7343373,pc:[14212828,11057332,7177600],props:["bed","bed","locker","crate","table"],hub:"Reception",exit:"Ambulance Bay",rooms:{"0,0":["clinic","Patient Ward"],"1,0":["lab","Laboratory"],"2,0":["library","Records Room"],"0,1":["kitchen","Cafeteria"],"2,1":["workshop","Boiler Room"],"0,2":["art","Therapy Room"],"1,2":["office","Admin Office"],"2,2":["outdoor","Courtyard"]},links:["11-10","11-01*","11-21","11-12","00-10","00-01","10-20","20-21","02-12","02-01*","22-12","22-21*"]},mansion:{name:"Creepy Mansion",emoji:"\u{1F3DA}\uFE0F",seed:37,indoor:!0,H:5,bg:459526,fog:.075,hemi:[6963810,1838606,.6],floor:[5908014,4857638],wall:7030326,ceil:2758674,trim:10123818,bulb:16757594,blood:4851206,pc:[3810328,5913130,8006186],props:["couch","table","pillar","coffin","shelf"],hub:"Grand Hall",exit:"Front Door",rooms:{"0,0":["kitchen","Old Kitchen"],"1,0":["library","Grand Library"],"2,0":["art","Portrait Gallery"],"0,1":["workshop","Cellar Workshop"],"2,1":["lab","Alchemist's Study"],"0,2":["clinic","Sick Room"],"1,2":["office","Butler's Office"],"2,2":["outdoor","Conservatory"]},links:["11-10","11-01","11-21","11-12*","00-10","00-01","20-10*","20-21","02-01","22-12","22-21*","02-12"]},cabin:{name:"Dark Forest Cabin",emoji:"\u{1F332}",seed:53,indoor:!1,H:4.4,bg:132362,fog:.065,hemi:[4873882,1451546,.75],floor:[3428394,2835491],wall:1853992,ceil:0,trim:2759178,bulb:16751168,blood:5376008,pc:[3811866,4863522,2833186],props:["tree","log","tree","grave","crate"],hub:"Cabin Clearing",exit:"Forest Road",rooms:{"0,0":["workshop","Woodcutter's Shed"],"1,0":["outdoor","Old Graveyard"],"2,0":["library","Witch's Library"],"0,1":["kitchen","Campfire Kitchen"],"2,1":["clinic","Healer's Hut"],"0,2":["lab","Swamp Lab"],"1,2":["office","Ranger Station"],"2,2":["art","Painter's Cabin"]},links:["11-10*","11-01","11-21","11-12","00-10","20-21","02-01","22-12","22-21","10-20*","00-01*"]}},ST=Object.keys(Lc).map(n=>({id:n,name:Lc[n].name,emoji:Lc[n].emoji}));function zy(n){let e=n>>>0;return()=>{e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function di(n,e){let t=Math.min(255,Math.round((n>>16&255)*e)),i=Math.min(255,Math.round((n>>8&255)*e)),s=Math.min(255,Math.round((n&255)*e));return t<<16|i<<8|s}var Gy={table:{w:1.8,h:.8,d:1},couch:{w:2.2,h:.8,d:.9},crate:{w:1,h:1,d:1},bed:{w:2,h:.55,d:.95},coffin:{w:.9,h:.7,d:2},log:{w:2.4,h:.5,d:.55},grave:{w:.8,h:1.1,d:.25},pillar:{w:.7,h:-1,d:.7},tree:{w:.5,h:3.2,d:.5},shelf:{w:.6,h:2.1,d:2.2,wall:!0},locker:{w:.6,h:2,d:1.6,wall:!0}};function up(n,e){let t=Lc[n],i=!!(e&&e.lockAll),s=zy(t.seed),r=t.H,o=[],a=[],c=[],l=[],h=[],u=[],f=[],d=[],g=(M,P,L,F,Y,q,$,ne,xe,Ce)=>M.push({s:P,x:L,y:F+$/2,z:Y,w:q,h:$,d:ne,c:xe,f:Ce||0}),y=(M,P,L,F,Y,q,$)=>g(o,"b",M,P,L,F,Y,q,$),_=(M,P,L,F,Y,q,$,ne)=>g(a,"b",M,P,L,F,Y,q,$,ne),p=(M,P,L,F)=>c.push({x0:M,z0:P,x1:L,z1:F}),S=[];for(let M=0;M<3;M++)for(let P=0;P<3;P++)S.push([P,M]);S.push([1,3]);let w=(M,P)=>M>=0&&M<3&&P>=0&&P<3||M===1&&P===3,T=(M,P)=>M<P?M+"-"+P:P+"-"+M,A=new Map;for(let M of t.links)A.set(T(M.slice(0,2),M.slice(3,5)),{locked:M.endsWith("*")||i});A.set(T("12","13"),{gate:!0});for(let[M,P]of S){let L=M*16,F=P*16,Y="hub",q=t.hub,$="hub";if(M===1&&P===3)Y="exit",q=t.exit,$="exit";else if(!(M===1&&P===1)){let ne=t.rooms[M+","+P];Y=ne[0],q=ne[1],$="room"}h.push({cell:""+M+P,c:M,r:P,tag:Y,name:q,kind:$,x0:L,z0:F,x1:L+16,z1:F+16,cx:L+16/2,cz:F+16/2})}for(let M of h){let P=t.floor[(M.c+M.r)%2];if(M.kind==="hub"&&(P=di(P,1.25)),M.kind==="exit"&&(P=2050602),y(M.cx,-.3,M.cz,16,.3,16,P),t.indoor)y(M.cx,r,M.cz,16,.3,16,t.ceil),_(M.cx,r-.1,M.cz,.9,.1,.9,M.kind==="exit"?6750105:t.bulb,1),d.push({x:M.cx,y:r-.15,z:M.cz,c:M.kind==="exit"?3407752:t.bulb,r:5.8});else{let L=M.cx+(s()<.5?-1:1)*2.5,F=M.cz+(s()<.5?-1:1)*2.5;y(L,0,F,.14,2.4,.14,t.trim),_(L,2.4,F,.32,.32,.32,M.kind==="exit"?6750105:t.bulb,1),d.push({x:L,y:2.55,z:F,c:M.kind==="exit"?3407752:t.bulb,r:4.6}),p(L-.1,F-.1,L+.1,F+.1)}}function C(M,P,L,F,Y){let q=Y==null?[[L,F]]:[[L,Y-1.7],[Y+1.7,F]];for(let[$,ne]of q){let xe=ne-$;if(xe<.02)continue;let Ce=($+ne)/2,j=di(t.wall,.86+.28*s());if(M==="v"?(y(P,0,Ce,.4,r,xe+.4,j),y(P,0,Ce,.4+.08,.3,xe+.4,t.trim),p(P-.4/2,$-.4/2,P+.4/2,ne+.4/2)):(y(Ce,0,P,xe+.4,r,.4,j),y(Ce,0,P,xe+.4,.3,.4+.08,t.trim),p($-.4/2,P-.4/2,ne+.4/2,P+.4/2)),!t.indoor)for(let ae=$+.8;ae<ne;ae+=2.3){let ye=o.length;g(o,"k",M==="v"?P:ae,r-.4,M==="v"?ae:P,2.8,3.4,2.8,di(t.wall,.8+.5*s()))}}if(Y!=null){t.indoor&&(M==="v"?y(P,3,Y,.4,r-3,3.4,di(t.wall,.9)):y(Y,3,P,3.4,r-3,.4,di(t.wall,.9)));for(let $ of[-1,1]){let ne=Y+$*1.7;M==="v"?y(P,0,ne,.4+.14,3,.16,t.trim):y(ne,0,P,.16,3,.4+.14,t.trim)}}}function x(M,P,L,F){let Y={id:l.length,kind:M.gate?"gate":"lock",o:P,cx:L,cz:F};Y.col=P==="v"?{x0:L-.2,z0:F-3.4/2,x1:L+.2,z1:F+3.4/2}:{x0:L-3.4/2,z0:F-.2,x1:L+3.4/2,z1:F+.2},l.push(Y),Y.kind==="lock"&&(P==="v"?(f.push({door:Y.id,x:L-.34,z:F+3.4/2+.4,o:P}),f.push({door:Y.id,x:L+.34,z:F-3.4/2-.4,o:P})):(f.push({door:Y.id,x:L+3.4/2+.4,z:F-.34,o:P}),f.push({door:Y.id,x:L-3.4/2-.4,z:F+.34,o:P})))}for(let[M,P]of S){let L=M*16,F=P*16;if(w(M+1,P)){let Y=A.get(T(""+M+P,""+(M+1)+P));C("v",L+16,F,F+16,Y?F+16/2:null),Y&&(Y.locked||Y.gate)&&x(Y,"v",L+16,F+16/2)}else C("v",L+16,F,F+16,null);if(w(M,P+1)){let Y=A.get(T(""+M+P,""+M+(P+1)));C("h",F+16,L,L+16,Y?L+16/2:null),Y&&(Y.locked||Y.gate)&&x(Y,"h",L+16/2,F+16)}else C("h",F+16,L,L+16,null);w(M-1,P)||C("v",L,F,F+16,null),w(M,P-1)||C("h",F,L,L+16,null)}function E(M,P,L){let F=[12595248,3170496,3186768,13672480];switch(M){case"kitchen":y(P,0,L,1.5,.9,.9,4870230),_(P-.3,.9,L,.45,.05,.45,16742938,1),y(P+.35,.9,L,.4,.35,.4,10066329),p(P-.8,L-.5,P+.8,L+.5);break;case"clinic":y(P,.3,L,2,.25,.95,14474460),y(P-.7,.55,L,.4,.15,.6,16777215),y(P+1.3,0,L+.4,.05,1.7,.05,11184810),_(P+1.3,1.3,L+.4,.14,.3,.1,6737151,0),p(P-1,L-.5,P+1,L+.5);break;case"library":y(P,0,L,1.8,2.1,.55,5913122);for(let Y=0;Y<4;Y++)y(P-.6+Y*.4,.9,L+.3,.15,.4,.1,F[Y]);p(P-.95,L-.3,P+.95,L+.3);break;case"lab":y(P,0,L,1.9,.9,.8,13620182),_(P-.45,.9,L,.2,.35,.2,4259728,1),y(P+.5,.9,L,.25,.4,.2,2236962),p(P-1,L-.45,P+1,L+.45);break;case"workshop":y(P,0,L,1.9,.95,.85,7031338),y(P+.6,.95,L,.2,.3,.3,3355443),y(P-.4,.95,L,.5,.15,.3,8947848),p(P-1,L-.45,P+1,L+.45);break;case"office":y(P,0,L,1.9,.8,.95,4861984),_(P-.6,.8,L,.15,.35,.15,16769162,1),y(P+.4,.8,L,.5,.05,.4,15658734),p(P-1,L-.5,P+1,L+.5);break;case"outdoor":y(P,0,L,1.1,1.1,1.1,9071162),y(P+.9,0,L+.2,.9,.9,.9,8018474),y(P+.2,1.1,L,.8,.7,.8,10123850),p(P-.6,L-.6,P+1.4,L+.7);break;case"art":y(P-.5,0,L,.07,1.7,.07,6965802),y(P+.5,0,L,.07,1.7,.07,6965802),y(P,.6,L,1.1,1.1,.07,16117984),y(P-.2,1,L+.05,.3,.3,.02,F[0]),y(P+.2,.8,L+.05,.3,.3,.02,F[1]),p(P-.6,L-.2,P+.6,L+.2);break}}h.forEach((M,P)=>{if(M.kind!=="room")return;[[M.x0+3.4,M.z0+3.4],[M.x1-3.4,M.z1-3.4]].forEach(([F,Y],q)=>{u.push({id:u.length,room:P,tag:M.tag,x:F,z:Y,name:By[M.tag]}),E(M.tag,F,Y)})});let U=M=>{let P=[];for(let[L,F]of[[M.x0,M.cz],[M.x1,M.cz],[M.cx,M.z0],[M.cx,M.z1]])P.push({x0:L-3.2,x1:L+3.2,z0:F-3.2,z1:F+3.2});for(let L of u)L.room===h.indexOf(M)&&P.push({x0:L.x-2.4,x1:L.x+2.4,z0:L.z-2.4,z1:L.z+2.4});return P},I=(M,P,L=0)=>M.x0<P.x1+L&&M.x1>P.x0-L&&M.z0<P.z1+L&&M.z1>P.z0-L;for(let M of h){if(M.kind==="exit"){_(M.cx,2.2,M.z1-.5,4,.7,.1,3211104,0);for(let Y of[-5,5])y(M.cx+Y,0,M.cz,.6,r,.6,t.trim),_(M.cx+Y,.2,M.cz,.15,r-.4,.15,3211104,0),p(M.cx+Y-.3,M.cz-.3,M.cx+Y+.3,M.cz+.3);continue}if(M.kind==="hub"){d.push({x:M.cx,y:1,z:M.cz,c:16724016,r:3.4}),y(M.cx,0,M.cz,1.3,.9,1.3,2763310),_(M.cx,.9,M.cz,.5,.12,.5,16719904,0),p(M.cx-.65,M.cz-.65,M.cx+.65,M.cz+.65);for(let[Y,q]of[[-6,-6],[6,-6],[-6,6],[6,6]])y(M.cx+Y,0,M.cz+q,.8,r,.8,t.trim),p(M.cx+Y-.4,M.cz+q-.4,M.cx+Y+.4,M.cz+q+.4);y(M.cx,0,M.cz,7,.03,7,di(t.floor[0],.7));continue}let P=U(M),L=[],F=5+Math.floor(s()*3);for(let Y=0;Y<F;Y++){let q=t.props[Math.floor(s()*t.props.length)],$=Gy[q];for(let ne=0;ne<25;ne++){let xe=$.w,Ce=$.d,j,ae;if($.wall){let ue=Math.floor(s()*4);ue<2?(xe=$.d,Ce=$.w,j=M.x0+2.5+s()*11,ae=ue===0?M.z0+.4/2+Ce/2+.05:M.z1-.4/2-Ce/2-.05):(j=ue===2?M.x0+.4/2+xe/2+.05:M.x1-.4/2-xe/2-.05,ae=M.z0+2.5+s()*11)}else j=M.x0+1.8+s()*(16-3.6),ae=M.z0+1.8+s()*(16-3.6);let ye={x0:j-xe/2,x1:j+xe/2,z0:ae-Ce/2,z1:ae+Ce/2};if(P.some(ue=>I(ye,ue))||L.some(ue=>I(ye,ue,.7)))continue;L.push(ye);let Ie=di(t.pc[Math.floor(s()*t.pc.length)],.8+.4*s());if(q==="tree")y(j,0,ae,.5,2.2,.5,3811864),g(o,"k",j,1.6,ae,2.6,3.4,2.6,di(t.wall,.7+.4*s())),p(ye.x0,ye.z0,ye.x1,ye.z1);else{let ue=$.h<0?r:$.h;y(j,0,ae,xe,ue,Ce,Ie),p(ye.x0,ye.z0,ye.x1,ye.z1),q==="table"&&y(j,0,ae,xe*.8,.05,Ce*.8,di(Ie,.6))}break}}for(let Y=0;Y<2;Y++){let q=.8+s()*.8,$=.6+s()*.8;y(M.x0+2+s()*12,0,M.z0+2+s()*12,q,.02,$,t.blood)}}let k=h.find(M=>M.kind==="hub"),z=h.find(M=>M.kind==="exit"),J=[];for(let M=0;M<12;M++){let P=M/12*Math.PI*2,L=k.cx+Math.cos(P)*4.6,F=k.cz+Math.sin(P)*4.6;J.push({x:L,z:F,yaw:Math.atan2(-(k.cx-L),-(k.cz-F))})}return{id:n,name:t.name,emoji:t.emoji,D:t,S:16,H:r,indoor:t.indoor,rooms:h,doors:l,panels:f,stations:u,parts:o,glow:a,lamps:d,cols:c,spawn:J,button:{x:k.cx,z:k.cz},exit:{x0:z.x0+.6,z0:z.z0+.6,x1:z.x1-.6,z1:z.z1-.6},bounds:{x0:0,z0:0,x1:48,z1:64}}}var We=null,Nn=null,Uc=null,St=null,xu=.8,gu=2,_u=null,io=null,Ii={},Nc={},Hy=["scream","jumpscare","step","run","door_open","creak","correct","wrong","hint","revive","lamp","heartbeat","killer_power","alarm","body_found","exit_open","time_warning","escape","win","lose"],Vy={cabin:"school",hospital:"school",mansion:"school",school:"hospital"};function dp(){if(We){We.state==="suspended"&&We.resume();return}let n=window.AudioContext||window.webkitAudioContext;if(!n)return;We=new n,Nn=We.createGain(),Nn.gain.value=xu,Nn.connect(We.destination),Uc=We.createBuffer(1,We.sampleRate*2,We.sampleRate);let e=Uc.getChannelData(0);for(let t=0;t<e.length;t++)e[t]=Math.random()*2-1;Hy.forEach(Oc)}function Oc(n){return Nc[n]||(Nc[n]=fetch(n+".mp3").then(e=>{if(!e.ok||!(e.headers.get("content-type")||"").includes("audio"))throw new Error("missing");return e.arrayBuffer()}).then(e=>We.decodeAudioData(e)).then(e=>(Ii[n]=e,e)).catch(()=>null)),Nc[n]}var fp=n=>!!Ii[n],pp=()=>({loaded:Object.keys(Ii),music:!!(St&&St.music),escape:!!(St&&St.escape),ducked:!!(St&&St.ducked),state:We&&We.state}),mp=!1;function Fc(n){xu=n,Nn&&!mp&&(Nn.gain.value=n)}function gp(n){mp=n,Nn&&(Nn.gain.value=n?0:xu)}function so(n){gu=n}function Wy(n){if(!We.createStereoPanner)return null;let e=We.createStereoPanner();return e.pan.value=Math.max(-1,Math.min(1,n||0)),e}function yu(n,e){let t=Wy(e);t?(n.connect(t),t.connect(Nn)):n.connect(Nn)}function yt(n,e,t,i,s,r,o){if(!We)return;let a=We.currentTime+(o||0),c=We.createOscillator(),l=We.createGain();c.type=n,c.frequency.setValueAtTime(e,a),c.frequency.exponentialRampToValueAtTime(Math.max(1,t),a+i),l.gain.setValueAtTime(1e-4,a),l.gain.exponentialRampToValueAtTime(s,a+Math.min(.03,i/4)),l.gain.exponentialRampToValueAtTime(1e-4,a+i),c.connect(l),yu(l,r),c.start(a),c.stop(a+i+.05)}function is(n,e,t,i,s,r,o,a){if(!We)return;let c=We.currentTime+(o||0),l=We.createBufferSource();l.buffer=Uc,l.loop=!0;let h=We.createBiquadFilter();h.type=e,h.Q.value=a||1,h.frequency.setValueAtTime(t,c),h.frequency.exponentialRampToValueAtTime(Math.max(20,i),c+n);let u=We.createGain();u.gain.setValueAtTime(1e-4,c),u.gain.exponentialRampToValueAtTime(s,c+Math.min(.04,n/3)),u.gain.exponentialRampToValueAtTime(1e-4,c+n),l.connect(h),h.connect(u),yu(u,r),l.start(c,Math.random()),l.stop(c+n+.05)}function vt(n,e,t){t=t||{};let i=Ii[n];if(!i||!We)return null;let s=We.createBufferSource();s.buffer=i,s.loop=!!t.loop,t.rate&&(s.playbackRate.value=t.rate);let r=We.createGain(),o=We.currentTime;return t.dur!=null?(r.gain.setValueAtTime(0,o),r.gain.linearRampToValueAtTime(e,o+.02),r.gain.setValueAtTime(e,o+Math.max(.03,t.dur-.05)),r.gain.linearRampToValueAtTime(0,o+t.dur)):r.gain.value=e,s.connect(r),yu(r,t.pan),t.dur!=null?s.start(0,t.offset||0,t.dur):s.start(0,t.offset||0),{s,gn:r}}var De={step(n,e){let t=n??1;if(Ii.step){vt("step",.7*t,{offset:Math.random()*Math.max(.1,Ii.step.duration-.5),dur:.4,pan:e,rate:.92+Math.random()*.16});return}is(.09,"bandpass",380,160,.05*t,e)},run(){vt("run",.8)||yt("sine",400,700,.3,.1)},door(){vt("door_open",.8)||(yt("sawtooth",90,45,.7,.12),is(.7,"lowpass",500,120,.15))},correct(){vt("correct",.9)||De.chime()},wrong(){vt("wrong",.9)||De.buzz()},hint(){vt("hint",.9)||De.chime()},revive(){vt("revive",1)||De.chime()},lamp(){vt("lamp",.8)||De.chime()},chime(){yt("sine",660,660,.35,.12),yt("sine",880,880,.5,.12,0,.12),yt("sine",1320,1320,.6,.1,0,.24)},buzz(){yt("square",140,110,.45,.14),yt("square",100,80,.45,.1,0,.05)},click(){yt("sine",520,400,.06,.06)},creak(){if(Ii.creak){vt("creak",.5,{rate:.85+Math.random()*.3,pan:Math.random()*2-1});return}is(1.2+Math.random(),"bandpass",300+Math.random()*300,900+Math.random()*500,.05,Math.random()*2-1,0,14)},thud(){yt("sine",70,35,.35,.2,Math.random()*2-1)},whisper(){for(let n=0;n<4;n++)is(.35,"bandpass",1500+Math.random()*1500,2500,.05,Math.random()*2-1,n*.3,4)},killerNear(){vt("killer_power",.7)||De.whisper()},heart(){yt("sine",62,38,.18,.28),yt("sine",58,36,.2,.22,0,.2)},heartLoop(n){if(!n){if(io){try{io.s.stop()}catch{}io=null}return}!io&&Ii.heartbeat&&(io=vt("heartbeat",.9,{loop:!0}))},alarm(){if(!vt("alarm",.8))for(let n=0;n<6;n++)yt("square",n%2?520:760,n%2?520:760,.3,.07,0,n*.3)},bodyFound(){vt("body_found",.9)||(De.alarm(),De.gong())},exitAlarm(){vt("exit_open",.8)||De.alarm()},warn(){vt("time_warning",.9)||De.gong()},gong(){yt("sine",110,100,2.2,.25),yt("sine",220,200,1.8,.1),is(1.5,"bandpass",500,200,.08)},sting(){vt("jumpscare",1)||(yt("sawtooth",880,700,.9,.22),yt("sawtooth",933,740,.9,.22),yt("sawtooth",1250,1e3,.9,.18),is(.9,"highpass",1500,4e3,.3))},scream(n){let e=n??1;if(!vt("scream",e)){for(let t=0;t<3;t++)yt("sawtooth",700+t*90,1500+t*120,1.3,.16*e,0,t*.02),yt("sawtooth",1100+t*50,900,1.1,.08*e,0,.25+t*.03);is(1.3,"bandpass",2200,3200,.25*e,0,0,2),yt("sine",120,60,1.4,.3*e)}},escape(){vt("escape",1)||De.win()},win(){vt("win",.9)||[523,659,784,1046].forEach((n,e)=>yt("triangle",n,n,.5,.15,0,e*.16))},lose(){vt("lose",.9)||[392,330,262,196].forEach((n,e)=>yt("sawtooth",n,n*.98,.7,.12,0,e*.3))}};async function Xy(n){let e="music_"+n;return await Oc(e)?e:(e="music_"+(Vy[n]||"school"),await Oc(e)?e:null)}var _p=.5;function vu(n){if(ro(),!We)return;let e=[],t=We.createGain();t.gain.value=1e-4,t.gain.exponentialRampToValueAtTime(.09,We.currentTime+4),t.connect(Nn);let i=We.createBiquadFilter();i.type="lowpass",i.frequency.value=220,i.connect(t);for(let d of[55,55.7,82.4]){let g=We.createOscillator();g.type="sawtooth",g.frequency.value=d,g.connect(i),g.start(),e.push(g)}let s=We.createOscillator(),r=We.createGain();s.frequency.value=.12,r.gain.value=70,s.connect(r),r.connect(i.frequency),s.start(),e.push(s);let o=We.createBufferSource();o.buffer=Uc,o.loop=!0;let a=We.createBiquadFilter();a.type="bandpass",a.frequency.value=400,a.Q.value=.8;let c=We.createGain();c.gain.value=.03;let l=We.createOscillator(),h=We.createGain();l.frequency.value=.07,h.gain.value=250,l.connect(h),h.connect(a.frequency),l.start(),o.connect(a),a.connect(c),c.connect(Nn),o.start(),e.push(o,l);let u={nodes:e,g:t,music:null,escape:null,ducked:!1};St=u,Xy(n).then(d=>{St!==u||!d||(u.music=vt(d,1e-4,{loop:!0}),u.music&&(u.music.gn.gain.setTargetAtTime(u.ducked?.12:_p,We.currentTime,1.5),t.gain.setTargetAtTime(.03,We.currentTime,2)))});let f=()=>{if(St===u){if(gu>=1){let d=Math.random();d<.4?De.creak():d<.7?De.thud():gu>=2&&De.whisper()}_u=setTimeout(f,6e3+Math.random()*12e3)}};_u=setTimeout(f,4e3)}function Su(n){St&&(St.ducked=n,St.music&&St.music.gn.gain.setTargetAtTime(n?.12:St.escape?.1:_p,We.currentTime,.4))}async function xp(){let n=St;!n||n.escape||!await Oc("music_escape")||St!==n||(n.escape=vt("music_escape",1e-4,{loop:!0}),n.escape&&n.escape.gn.gain.setTargetAtTime(.55,We.currentTime,1),n.music&&n.music.gn.gain.setTargetAtTime(.08,We.currentTime,1))}function ro(){if(clearTimeout(_u),De.heartLoop(!1),!!St){for(let n of St.nodes)try{n.stop()}catch{}try{St.g.disconnect()}catch{}for(let n of[St.music,St.escape])if(n)try{n.s.stop()}catch{}St=null}}var Re=128,ze=1,$n=!1;function ss(){let n=document.createElement("canvas");return n.width=n.height=Re,n}function rs(n){let e=n>>>0;return()=>{e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function Xs(n,e,t,i,s,r){t=Math.round(t*ze*ze);for(let o=0;o<t;o++){let a=(1+e()*s)*ze;n.fillStyle=(r&&e()<.4?"rgba(255,255,255,":"rgba(0,0,0,")+(e()*i).toFixed(3)+")",n.fillRect(e()*Re,e()*Re,a,a)}}function qs(n,e,t){if($n){for(let i=0;i<7;i++){let s=e()*Re,r=(2+e()*5)*ze,o=n.createLinearGradient(0,0,0,Re*(.4+e()*.6));o.addColorStop(0,"rgba(0,0,0,"+(.1*t).toFixed(3)+")"),o.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=o,n.fillRect(s,0,r,Re)}for(let i=0;i<4;i++){let s=e()*Re,r=e()*Re,o=n.createRadialGradient(s,r,1,s,r,(14+e()*26)*ze);o.addColorStop(0,"rgba(0,0,0,"+(.16*t).toFixed(3)+")"),o.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=o,n.fillRect(0,0,Re,Re)}n.strokeStyle="rgba(0,0,0,"+(.13*t).toFixed(3)+")",n.lineWidth=ze;for(let i=0;i<10;i++){let s=e()*Re,r=e()*Re;n.beginPath(),n.moveTo(s,r),n.lineTo(s+(6+e()*14)*ze,r+(e()-.5)*8*ze),n.stroke()}}}function os(n){let e=new Cn(n);return e.wrapS=e.wrapT=As,e.colorSpace=bt,e.anisotropy=$n?4:2,e}function kc(n){let e=rs(n),t=ss(),i=t.getContext("2d");i.fillStyle="#e9e9e9",i.fillRect(0,0,Re,Re);for(let o=0;o<5;o++){let a=i.createRadialGradient(e()*Re,e()*Re,2*ze,e()*Re,e()*Re,(30+e()*30)*ze);a.addColorStop(0,"rgba(0,0,0,.10)"),a.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=a,i.fillRect(0,0,Re,Re)}Xs(i,e,700,.1,2,!0),i.strokeStyle="rgba(0,0,0,.28)",i.lineWidth=ze,i.beginPath();let s=(20+e()*80)*ze,r=0;for(i.moveTo(s,r);r<Re;)s+=(e()-.5)*12*ze,r+=(6+e()*8)*ze,i.lineTo(s,r);return i.stroke(),qs(i,e,1),os(t)}function bu(n,e){let t=rs(n),i=ss(),s=i.getContext("2d"),r=Re/e;s.fillStyle="#efefef",s.fillRect(0,0,Re,Re);for(let o=0;o<e;o++)for(let a=0;a<e;a++)s.fillStyle="rgba(0,0,0,"+(t()*($n?.11:.07)).toFixed(3)+")",s.fillRect(o*r,a*r,r,r),$n&&(s.fillStyle="rgba(255,255,255,.35)",s.fillRect(o*r+2*ze,a*r+2*ze,r-5*ze,2*ze));s.fillStyle="rgba(30,30,30,.55)";for(let o=0;o<e;o++)s.fillRect(o*r,0,2*ze,Re),s.fillRect(0,o*r,Re,2*ze);return Xs(s,t,500,.12,2,!1),qs(s,t,1.2),os(i)}function qy(n){let e=rs(n),t=ss(),i=t.getContext("2d");i.fillStyle="#e4e4e4",i.fillRect(0,0,Re,Re);for(let s=0;s<8;s++)i.fillStyle="rgba(0,0,0,.13)",i.fillRect(s*16*ze,0,8*ze,Re);i.fillStyle="rgba(0,0,0,.28)";for(let s=0;s<4;s++)for(let r=0;r<4;r++){let o=(s*32+16)*ze,a=(r*32+16)*ze;i.beginPath(),i.moveTo(o,a-5*ze),i.lineTo(o+4*ze,a),i.lineTo(o,a+5*ze),i.lineTo(o-4*ze,a),i.closePath(),i.fill(),$n&&(i.fillStyle="rgba(255,255,255,.22)",i.beginPath(),i.arc(o,a,1.6*ze,0,7),i.fill(),i.fillStyle="rgba(0,0,0,.28)")}return Xs(i,e,400,.1,2,!1),qs(i,e,1.1),os(t)}function Yy(n){let e=rs(n),t=ss(),i=t.getContext("2d"),s=Re/4;for(let r=0;r<4;r++){let o=e()*Re;i.fillStyle="rgba("+(205+e()*40|0)+","+(205+e()*40|0)+","+(205+e()*40|0)+",1)",i.fillRect(0,r*s,Re,s);for(let a=0;a<14*($n?2:1);a++){i.strokeStyle="rgba(0,0,0,"+(.06+e()*.1).toFixed(2)+")",i.beginPath();let c=r*s+e()*s;i.moveTo(0,c),i.lineTo(Re,c+(e()-.5)*3*ze),i.stroke()}i.fillStyle="rgba(20,20,20,.6)",i.fillRect(o%Re,r*s,2*ze,s),i.fillRect(0,r*s,Re,2*ze)}return qs(i,e,1),os(t)}function yp(n){let e=rs(n),t=ss(),i=t.getContext("2d");i.fillStyle="#d6d6d6",i.fillRect(0,0,Re,Re),Xs(i,e,1400,.28,4,!0),i.strokeStyle="rgba(0,0,0,.22)",i.lineWidth=ze;for(let s=0;s<140*ze;s++){let r=e()*Re,o=e()*Re;i.beginPath(),i.moveTo(r,o),i.lineTo(r+(e()-.5)*5*ze,o-(3+e()*5)*ze),i.stroke()}if($n)for(let s=0;s<6;s++){let r=e()*Re,o=e()*Re,a=i.createRadialGradient(r,o,1,r,o,(10+e()*18)*ze);a.addColorStop(0,"rgba(60,40,20,.28)"),a.addColorStop(1,"rgba(60,40,20,0)"),i.fillStyle=a,i.fillRect(0,0,Re,Re)}return os(t)}function vp(n){let e=rs(n),t=ss(),i=t.getContext("2d");return i.fillStyle="#e2e2e2",i.fillRect(0,0,Re,Re),Xs(i,e,900,.16,1,!1),i.fillStyle="rgba(0,0,0,.45)",i.fillRect(0,0,Re,2*ze),i.fillRect(0,0,2*ze,Re),i.fillRect(0,Re/2,Re,ze),i.fillRect(Re/2,0,ze,Re),qs(i,e,1.4),os(t)}function Mu(n){let e=rs(n),t=ss(),i=t.getContext("2d");i.fillStyle="#dcdcdc",i.fillRect(0,0,Re,Re);for(let s=0;s<46*($n?2:1);s++){i.strokeStyle="rgba(0,0,0,"+(.05+e()*.14).toFixed(2)+")",i.lineWidth=(1+e()*2)*ze;let r=e()*Re;i.beginPath(),i.moveTo(r,0),i.bezierCurveTo(r+(e()-.5)*14*ze,Re*.3,r+(e()-.5)*14*ze,Re*.7,r+(e()-.5)*8*ze,Re),i.stroke()}return Xs(i,e,150,.12,2,!1),qs(i,e,.8),os(t)}function Sp(n,e){switch($n=!!e,Re=$n?256:128,ze=Re/128,n){case"hospital":return{w:bu(11,4),f:bu(12,4),c:vp(13),p:kc(14)};case"mansion":return{w:qy(21),f:Yy(22),c:kc(23),p:Mu(24)};case"cabin":return{w:yp(31),f:yp(32),c:kc(33),p:Mu(34)};default:return{w:kc(41),f:bu(42,2),c:vp(43),p:Mu(44)}}}function bp(n){let t=document.createElement("canvas");t.width=512,t.height=80*n.length;let i=t.getContext("2d");n.forEach((r,o)=>{let a=o*80;i.fillStyle="#17202a",i.fillRect(0,a,512,80),i.strokeStyle="#d8c070",i.lineWidth=5,i.strokeRect(4,a+4,504,72),i.fillStyle="#f4efe0",i.font="bold 40px Inter, DejaVu Sans, sans-serif",i.textAlign="center",i.textBaseline="middle",i.fillText(r.toUpperCase(),256,a+80/2+2,480)});let s=new Cn(t);return s.colorSpace=bt,s.anisotropy=4,{tex:s,rows:n.length}}function Mp(){let n=document.createElement("canvas");n.width=n.height=128;let e=n.getContext("2d"),t=e.createRadialGradient(64,64,2,64,64,64);t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.35,"rgba(255,255,255,.45)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,128,128);let i=new Cn(n);return i.colorSpace=bt,i}function Tp(){let n=document.createElement("canvas");n.width=64,n.height=128;let e=n.getContext("2d"),t=e.createRadialGradient(32,50,2,32,60,56);t.addColorStop(0,"rgba(200,225,255,.9)"),t.addColorStop(.5,"rgba(160,200,255,.35)"),t.addColorStop(1,"rgba(160,200,255,0)"),e.fillStyle=t,e.beginPath(),e.ellipse(32,62,30,60,0,0,7),e.fill(),e.fillStyle="rgba(0,0,30,.6)",e.beginPath(),e.ellipse(24,40,4,7,0,0,7),e.ellipse(40,40,4,7,0,0,7),e.fill();let i=new Cn(n);return i.colorSpace=bt,i}var X=n=>document.getElementById(n),uo=new URLSearchParams(location.search),Zy=!!uo.get("debug"),Mt=n=>String(n).replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e]),Zs=(n,e,t)=>Math.max(e,Math.min(t,n));function Jy(){let n=uo.get("pjs");if(n){let[e,t]=n.split(":");return{host:e,port:+t,path:"/",secure:!1,debug:0}}return{debug:0}}var fo=1.6,Ep=.35,Ap=4,m={name:"",code:"",job:"chef",q:1,id:0,role:"crew",phase:"join",lobby:[],map:null,mapId:"",players:new Map,doors:[],bodies:[],tasks:[],prog:[0,0],clues:[],alive:!0,escaped:!1,ghost:!1,charges:{},rage:0,kcd:0,cdTotal:25,scare:2,myScare:2,paused:!1,qbox:null,meeting:null,exitOpen:!1,xray:0,sprint:0,abilCd:0,danger:!1,flick:0,dark:0,frozenUntil:0,pos:{x:0,y:fo,z:0},yaw:0,pitch:0,pings:[],lamps:[],waitingQ:!1,emergLeft:1,jump:0,appT:60,stepT:0,onBreak:!1,tl:null,w2:!1,w30:!1,smooth:!1,fps:0,showFps:!1,dangerOn:!1,mode:"classic",aliveN:0,escN:0,auto:!1,forceClassic:!1,autoClassic:!1},N={},Pt={},Ys=null,Un=null,Hc=!1,Vc=0;function xt(n,e){X(n).style.display=e?"flex":"none"}function It(n,e,t){let i=document.createElement("div");i.className="tst "+(t||""),i.innerHTML=n,X("toast").appendChild(i),setTimeout(()=>i.classList.add("out"),(e||3500)-400),setTimeout(()=>i.remove(),e||3500)}function co(n,e){let t=X("flash");t.style.background=n,t.style.opacity=.55,setTimeout(()=>t.style.opacity=0,e||250)}var Li=()=>Math.min(m.scare,m.myScare),$y=new Set(["ask","kill","report","emerg","ability"]);function Xt(n){if($y.has(n.t)&&(n.px=+m.pos.x.toFixed(2),n.pz=+m.pos.z.toFixed(2)),Un&&Un.open)try{Un.send(n)}catch{}}X("code").value=(uo.get("room")||"").toUpperCase();X("btnJoin").onclick=()=>{let n=X("nm").value.trim(),e=X("code").value.trim().toUpperCase();if(!n)return X("jmsg").textContent="Please type your name.";if(e.length<4)return X("jmsg").textContent="Please type the 4-letter room code.";m.name=n,m.code=e;{let t=X("gfx").value;if(m.auto=t==="a",m.smooth=t==="s",m.q=t==="s"?0:t==="a"?1:+t,m.autoClassic=!1,m.auto)try{m.autoClassic=localStorage.getItem("se_fb")==="1"}catch{}}m.showFps=!!uo.get("fps"),dp(),Lp()};X("nm").addEventListener("keydown",n=>{n.key==="Enter"&&X("btnJoin").click()});X("code").addEventListener("keydown",n=>{n.key==="Enter"&&X("btnJoin").click()});function Lp(){X("jmsg").textContent="Connecting\u2026",Hc=!1;try{Ys&&Ys.destroy()}catch{}Ys=new hp(Jy());let n=setTimeout(()=>{Hc||(X("jmsg").textContent="Cannot reach the room. Check the code and the Wi-Fi, and make sure the teacher page is open.")},12e3);Ys.on("open",()=>{Un=Ys.connect("shadowesc-"+m.code,{reliable:!0,serialization:"json"}),Un.on("open",()=>{Vc=0,Un.send({t:"join",name:m.name,job:m.job})}),Un.on("data",e=>{try{Ky(e)}catch(t){console.error(t)}}),Un.on("close",()=>{clearTimeout(n),jy()}),Un.on("error",()=>{})}),Ys.on("error",e=>{clearTimeout(n),e.type==="peer-unavailable"?X("jmsg").textContent='Room "'+m.code+'" not found. Check the code with your teacher.':Hc||(X("jmsg").textContent="Connection problem ("+e.type+").")})}function Dp(n){if(m.off=!!n,X("offbox").style.display=n?"flex":"none",n){m.paused=!0,document.exitPointerLock&&document.exitPointerLock();for(let e in Pt)Pt[e]=!1;document.activeElement&&document.activeElement.blur&&document.activeElement.blur()}gp(!!n)}function jy(){m.phase!=="join"&&(m.off&&Dp(!1),X("lost").style.display="flex",X("lostMsg").textContent="Connection lost\u2026 trying to reconnect ("+(Vc+1)+")",document.exitPointerLock&&document.exitPointerLock(),Vc++<30?setTimeout(Lp,2500):X("lostMsg").textContent="The teacher closed the game or the connection is gone. Reload the page to join again.")}function Pu(){let n=m.lobby.find(e=>e.id===m.id);n&&(m.job=n.job),X("lobPlayers").innerHTML=m.lobby.map(e=>'<span class="chip'+(e.id===m.id?" me":"")+'">'+mn(e.job).emoji+" "+Mt(e.name)+"</span>").join(""),X("jobGrid").innerHTML=Dc.map(e=>{let t=m.lobby.find(i=>i.job===e.id&&i.id!==m.id);return'<div class="job'+(e.id===m.job?" sel":"")+(t?" taken":"")+'" data-j="'+e.id+'"><div class="je">'+e.emoji+"</div><b>"+e.name+"</b><small>\u2B50 "+e.abName+'</small><small class="jd">'+e.abDesc+"</small>"+(t?"<em>"+Mt(t.name)+"</em>":"")+"</div>"}).join(""),X("jobGrid").querySelectorAll(".job").forEach(e=>e.addEventListener("click",()=>{e.classList.contains("taken")||(m.job=e.dataset.j,Xt({t:"pick",job:m.job}),Pu(),De.click())}))}function Ky(n){switch(n.t){case"joined":Hc=!0,m.id=n.id,X("lost").style.display="none",m.phase==="join"&&(m.phase="lobby",xt("join",!1),xt("lobby",!0));break;case"reject":X("jmsg").textContent=n.why,Vc=99,m.phase="join";break;case"lobby":m.lobby=n.players,m.phase==="lobby"&&Pu();break;case"start":xv(n);break;case"s":vv(n);break;case"q":Av(n);break;case"deny":m.waitingQ=!1,It(Mt(n.why),2500,"bad"),De.wrong();break;case"hint":wv(n);break;case"res":Cv(n);break;case"door":Lu(n.id,n.open,!0);break;case"clue":m.clues.push(n.text),It("\u{1F50E} <b>NEW CLUE:</b> "+Mt(n.text),6e3,"clue"),De.hint();break;case"dead":Sv(n);break;case"revive":bv(n);break;case"escaped":Mv(n);break;case"flick":m.flick=1.4,Li()>=1&&(m.dark=Li()>=2?.5:0,De.killerNear());break;case"rage":m.rage=n.n,m.pings.push({x:n.x,z:n.z,t:9}),It("\u{1F608} A wrong answer in the <b>"+Mt(n.room)+"</b>! You feel stronger. (Power "+n.n+")",5e3,"bad");break;case"killok":m.kcd=n.cd;break;case"meet":Rv(n);break;case"voted":m.meeting&&(m.meeting.voted=n.voted,ho());break;case"ready":m.meeting&&(m.meeting.ready=n.ready,ho());break;case"tp":m.pos.x=n.x,m.pos.z=n.z,m.pos.y=m.ghost?2:fo,m.yaw=n.yaw;break;case"meetend":Pv(n);break;case"exitopen":Tv(n);break;case"end":Ev(n);break;case"off":Dp(n.on);break;case"paused":m.paused=n.on,X("pausebox").style.display=n.on?"flex":"none",n.on&&document.exitPointerLock&&document.exitPointerLock();break;case"cfg":m.scare=n.scare,m.forceClassic=n.look==="classic",so(Li()),js();break;case"danger":m.danger=n.on;break;case"lamp":Fp(n.x,n.z);break;case"gone":{let e=m.players.get(n.id);e&&(e.st=1),n.id===m.id&&(m.alive=!1,m.ghost=!0);break}case"abused":m.charges=n.charges;break;case"tolobby":Qy();break;case"caughtnote":lo("\u{1F480} "+Mt(n.name).toUpperCase()+" WAS CAUGHT!",n.left>0?"\u{1F3C3} "+n.left+(n.left===1?" student is":" students are")+" still running!":"Nobody is left\u2026",3800),De.bodyFound();break}}function Qy(){m.dangerOn=!1,ro(),X("bodyBanner").style.display="none",m.phase="lobby",m.meeting=null,m.qbox=null;for(let n of["hud","qbox","meet","end","role","pausebox","jump","cluebox","menu","breakbox"])xt(n,!1);X("btnBreak").style.display="none",m.onBreak=!1,xt("lobby",!0),document.exitPointerLock&&document.exitPointerLock(),X("app").classList.remove("playing"),Pu()}var ev={w:2.4,f:2,c:2,p:1.2};function tv(n,e){if(n.s!=="b")return"p";let t=n.y+n.h/2,i=n.y-n.h/2,s=Math.min(n.w,n.d);return t<=.05?"f":i>=e-.05?"c":s<=.8&&(n.h>=2.4||n.h<=.32&&i<.05&&s<=.5)?"w":"p"}function Wc(n,e,t){let i=n.attributes.position,s=i.count,r=new Float32Array(s*3),o=new Ve(e);for(let a=0;a<s;a++){let c=t?t(i.getX(a),i.getY(a),i.getZ(a)):1;r[a*3]=o.r*c,r[a*3+1]=o.g*c,r[a*3+2]=o.b*c}n.setAttribute("color",new zt(r,3))}function nv(n,e,t){let i;n.s==="b"?i=new fn(n.w,n.h,n.d):n.s==="k"?i=new Ar(n.w/2,n.h,7):i=new Vn(n.w/2,n.w/2,n.h,8),i.translate(n.x,n.y,n.z);let s=i.attributes.position,r=i.attributes.normal,o=i.attributes.uv,a=ev[e||"p"];for(let c=0;c<s.count;c++){let l=Math.abs(r.getX(c)),h=Math.abs(r.getY(c)),u=Math.abs(r.getZ(c)),f=s.getX(c),d=s.getY(c),g=s.getZ(c);h>=l&&h>=u?o.setXY(c,f/a,g/a):l>=u?o.setXY(c,g/a,d/a):o.setXY(c,f/a,d/a)}return Wc(i,n.c,t),i}function Bc(n,e,t){if(!n.length)return null;let i=n.map(r=>nv(r,e,t)),s=Ki(i,!1);return i.forEach(r=>r.dispose()),s}function iv(n,e,t,i,s){let r=document.createElement("canvas");r.width=e,r.height=t;let o=r.getContext("2d");o.font=i,o.textAlign="center",o.textBaseline="middle",o.lineWidth=6,o.strokeStyle="rgba(0,0,0,.85)",o.strokeText(n,e/2,t/2),o.fillStyle=s||"#fff",o.fillText(n,e/2,t/2);let a=new Cn(r);return a.colorSpace=bt,a}function sv(){if(N.renderer)return;let n=m.q;N.renderer=new uc({canvas:X("gl"),antialias:n>=2,powerPreference:"high-performance"}),N.prBase=[.55,.8,Math.min(window.devicePixelRatio||1,1.25)][n],N.pr=N.prBase,N.renderer.setPixelRatio(N.pr),N.renderer.shadowMap.enabled=!0,N.renderer.shadowMap.type=Wi,N.renderer.setSize(innerWidth,innerHeight,!1),N.camera=new Wt(72,innerWidth/innerHeight,.08,70),N.camera.rotation.order="YXZ",addEventListener("resize",()=>{N.renderer.setSize(innerWidth,innerHeight,!1),N.camera.aspect=innerWidth/innerHeight,N.camera.updateProjectionMatrix()})}function rv(){let n=m.map,e=n.D,t=N.scene=new _r;if(t.background=new Ve(e.bg),t.fog=new gr(e.bg,e.fog),N.camera.clear(),t.add(N.camera),N.look=null,N.staticGroup=null,Np(Cu()),N.glowTex=N.glowTex||Mp(),N.pools=N.halos=null,n.lamps.length){let o=[],a=new Float32Array(n.lamps.length*3),c=new Float32Array(n.lamps.length*3);n.lamps.forEach((h,u)=>{let f=new Mi(h.r*2,h.r*2);f.rotateX(-Math.PI/2),f.translate(h.x,.05,h.z),Wc(f,h.c),o.push(f);let d=new Ve(h.c);a.set([h.x,h.y,h.z],u*3),c.set([d.r,d.g,d.b],u*3)}),N.pools=new st(Ki(o,!1),new $t({map:N.glowTex,vertexColors:!0,transparent:!0,opacity:.5,blending:qi,depthWrite:!1})),N.poolBase=n.indoor?.5:.75,t.add(N.pools);let l=new Ct;l.setAttribute("position",new zt(a,3)),l.setAttribute("color",new zt(c,3)),N.halos=new Ls(l,new Hi({map:N.glowTex,size:2.8,sizeAttenuation:!0,vertexColors:!0,transparent:!0,opacity:.7,blending:qi,depthWrite:!1})),N.halos.frustumCulled=!1,t.add(N.halos)}N.dustN=110,N.dustP=new Float32Array(N.dustN*3);for(let o=0;o<N.dustN;o++)N.dustP[o*3]=(Math.random()-.5)*16,N.dustP[o*3+1]=Math.random()*3.6,N.dustP[o*3+2]=(Math.random()-.5)*16;let i=new Ct;N.dustAttr=new zt(N.dustP,3),i.setAttribute("position",N.dustAttr),N.dust=new Ls(i,new Hi({map:N.glowTex,color:n.indoor?13619151:16770442,size:n.indoor?.12:.16,transparent:!0,opacity:n.indoor?.35:.8,depthWrite:!1})),N.dust.frustumCulled=!1,t.add(N.dust),N.wispTex=N.wispTex||Tp(),N.wisps=[];for(let o=0;o<3;o++){let a=new Gi(new Si({map:N.wispTex,transparent:!0,opacity:0,depthWrite:!1,blending:qi}));a.scale.set(1.7,3.4,1),a.userData.ph=o*2.1,t.add(a),N.wisps.push(a)}if(N.hemi=new Rr(e.hemi[0],e.hemi[1],e.hemi[2]),t.add(N.hemi),N.hemiBase=e.hemi[2]*1.3,!e.indoor){let o=new Dr(7309e3,.55);o.position.set(-20,40,10),t.add(o)}N.flash=new Ir(16773328,60,28,.55,.55,1.5),N.flash.position.set(.15,-.1,0),N.flash.target.position.set(0,0,-6),N.camera.add(N.flash),N.camera.add(N.flash.target),N.flash.shadow.mapSize.set(512,512),N.flash.shadow.camera.near=.3,N.flash.shadow.camera.far=28,N.flash.shadow.bias=-8e-4,N.lantern=new Ns(16769712,7,7,1.6),N.camera.add(N.lantern),N.doors=[],N.doorLight=[];let s=new Rn({color:2238513});for(let o of n.doors){let a=o.o==="v"?new fn(.3,3,3.4):new fn(3.4,3,.3),c=o.kind==="gate"?new Rn({color:10099740,emissive:3343364}):new Rn({color:5913122}),l=new st(a,c);l.position.set(o.cx,3/2,o.cz),t.add(l),N.doors[o.id]={mesh:l,open:!1,t:0},N.doorLight[o.id]=new $t({color:16719904})}for(let o of n.panels){let a=new st(new fn(o.o==="v"?.14:.55,.8,o.o==="v"?.55:.14),s);a.position.set(o.x,1.25,o.z),t.add(a);let c=new st(new fn(.22,.22,.22),N.doorLight[o.door]);c.position.set(o.x,1.45,o.z),t.add(c)}N.markers=new Map;for(let o of m.tasks)o.done||dv(o.sid);let r=n.exit;N.exitBeam=new st(new Vn(.8,.8,4,12,1,!0),new $t({color:4259712,transparent:!0,opacity:.25,depthWrite:!1})),N.exitBeam.position.set((r.x0+r.x1)/2,2,(r.z0+r.z1)/2+3),N.exitBeam.visible=!1,t.add(N.exitBeam),N.bodies=[],N.lamps=[],N.xrayMat=new $t({color:6741503,transparent:!0,opacity:.4,depthTest:!1}),N.xrayGeo=new Hn(.28,1.1,2,6),Iu()}var Cu=()=>m.forceClassic||m.smooth||m.q===0||m.autoClassic?"classic":"rich";function ov(n){n.traverse(e=>{e.geometry&&e.geometry.dispose(),e.material&&(e.material.map&&e.material.map.dispose(),e.material.dispose())})}function av(n){let e=n.D,t=[],i=[];if(!e.indoor)return{deco:t,glass:i};let s=e.seed*7919>>>0,r=()=>{s=s+1831565813|0;let h=Math.imul(s^s>>>15,1|s);return h=h+Math.imul(h^h>>>7,61|h)^h,((h^h>>>14)>>>0)/4294967296},o=(h,u,f,d,g,y,_,p)=>h.push({s:"b",x:u,y:f+y/2,z:d,w:g,h:y,d:_,c:p}),a=[12597547,3049153,13937677,2600544,9323693,15105570],c=.23,l=e.bg===198408?5209996:3428474;for(let h of n.rooms){for(let f=0;f<2;f++){let d=Math.floor(r()*4),g=r()<.5?-1:1,y=3.6+r()*3,_=a[Math.floor(r()*a.length)],p=d<2,S=p?h.cx+g*y:d===2?h.x0+c:h.x1-c,w=p?d===0?h.z0+c:h.z1-c:h.cz+g*y,T=p?.85:.03,A=p?.03:.85,C=p?.7:.05,x=p?.05:.7;o(t,S,1.25,w,T,1.15,A,15262415),o(t,S,1.95,w,C,.32,x,_);for(let E=0;E<3;E++)o(t,S,1.7-E*.17,w,p?.6:.045,.045,p?.045:.6,5591112)}let u=[];if(h.c===0&&u.push("W"),h.c===2&&u.push("E"),h.r===0&&u.push("N"),h.kind==="exit"&&u.push("W","E"),h.kind!=="hub")for(let f of u){let d=f==="N",g=f==="N"?h.cx:f==="W"?h.x0+c:h.x1-c,y=f==="N"?h.z0+c:h.cz,_=d?2.1:.1,p=d?.1:2.1,S=d?1.85:.07,w=d?.07:1.85,T=2759956,A=d;o(i,g,1.3,y,S,1.3,w,l),i[i.length-1].f=0,o(t,g,1.15,y,A?2.1:.12,.12,A?.12:2.1,T),o(t,g,2.65,y,A?2.1:.12,.12,A?.12:2.1,T),o(t,A?g-1:g,1.15,A?y:y-1,.12,1.6,.12,T),o(t,A?g+1:g,1.15,A?y:y+1,.12,1.6,.12,T),o(t,g,1.3,y,A?.07:.14,1.3,A?.14:.07,T),o(t,g,1.9,y,A?1.85:.14,.06,A?.14:1.85,T)}}return{deco:t,glass:i}}function Np(n){let e=N.scene,t=m.map,i=n==="rich",s=t.H;N.staticGroup&&(e.remove(N.staticGroup),ov(N.staticGroup));let r=N.staticGroup=new bn;e.add(r),N.look=n,N.tex=Sp(m.mapId,i);let o={w:[],f:[],c:[],p:[]};for(let f of t.parts)o[tv(f,s)].push(f);let a=f=>i&&(f==="w"||f==="p")?(d,g)=>(g<.9?.7+.3*(g/.9):1)*(s-g<.8?.84+.16*((s-g)/.8):1):null;for(let f of["w","f","c","p"]){let d=Bc(o[f],f,a(f));if(!d)continue;let g=new st(d,new Rn({vertexColors:!0,map:N.tex[f]}));g.receiveShadow=i,g.castShadow=i&&(f==="w"||f==="p"),r.add(g)}let c=i?av(t):{deco:[],glass:[]},l=Bc(c.deco,"p");l&&r.add(new st(l,new Rn({vertexColors:!0})));let h=Bc(t.glow.filter(f=>!f.f).concat(c.glass)),u=Bc(t.glow.filter(f=>f.f));if(h&&r.add(new st(h,new $t({vertexColors:!0}))),N.flickMat=new $t({vertexColors:!0}),u&&r.add(new st(u,N.flickMat)),i&&t.indoor){let f=t.rooms.map(_=>_.name),d=bp(f),g=f.length,y=[];t.rooms.forEach((_,p)=>{let S=new Mi(3.2,.62),w=S.attributes.uv,T=1-(p+1)/g;for(let A=0;A<w.count;A++)w.setY(A,T+w.getY(A)/g);S.translate(_.cx+5.4,2.8,_.z0+.2+.025),Wc(S,16777215),y.push(S)}),r.add(new st(Ki(y,!1),new Rn({vertexColors:!0,map:d.tex})))}}var cv=new Vn(.35,.35,3.4,10,1,!0),lv=new $t({color:16765770,transparent:!0,opacity:.2,depthWrite:!1}),hv=new wr(.28),uv=new $t({color:16765770});function dv(n){if(N.markers.has(n))return;let e=m.map.stations[n],t=new bn,i=new st(cv,lv);i.position.y=1.7,t.add(i);let s=new st(hv,uv);s.position.y=2.3,t.add(s),t.position.set(e.x,0,e.z),N.scene.add(t),N.markers.set(n,{g:t,gem:s})}function fv(n){let e=N.markers.get(n);e&&(N.scene.remove(e.g),N.markers.delete(n))}function Iu(){m.colList=m.map.cols.slice(),m.map.doors.forEach(n=>{m.doors[n.id]||m.colList.push(n.col)})}function wp(n,e){let t=Ep*Ep,i=m.colList;for(let s=0;s<i.length;s++){let r=i[s],o=n<r.x0?r.x0:n>r.x1?r.x1:n,a=e<r.z0?r.z0:e>r.z1?r.z1:e,c=n-o,l=e-a;if(c*c+l*l<t)return!0}return!1}function Lu(n,e,t){if(m.doors[n]===e)return;m.doors[n]=e,Iu();let i=N.doors&&N.doors[n];i&&(i.open=e),N.doorLight&&N.doorLight[n]&&N.doorLight[n].color.setHex(e?3211104:16719904),t&&De.door()}var Cp=new Rn({vertexColors:!0});function Je(n,e,t,i,s,r,o,a,c){o!=null&&e.scale(o,a??o,c??o),e.translate(i,s,r),Wc(e,t),n.push(e)}var Tu=new Map;function pv(n){if(Tu.has(n.id))return Tu.get(n.id);let e=[],t=h=>new ci(h,12,9),i=(h,u,f)=>new fn(h,u,f),s=(h,u)=>new Vn(h,h,u,12),r=n.color,o=14922895;Je(e,new Hn(.22,.4,3,10),r,0,1.02,0,1,1,.82),Je(e,t(.21),o,0,1.62,0,1,1.05,1);for(let h of[-1,1])Je(e,t(.058),16777215,h*.08,1.645,.19,1,1,.6),Je(e,t(.03),1118481,h*.08,1.645,.215),Je(e,i(.1,.02,.02),3811874,h*.08,1.735,.18);Je(e,i(.09,.02,.02),9058874,0,1.54,.2),Je(e,t(.032),13803644,0,1.6,.215);for(let h of[-1,1])Je(e,t(.05),o,h*.205,1.62,0,.6,1,1);switch(Je(e,new Vn(.07,.08,.14,8),o,0,1.44,0),Je(e,new ci(.22,12,6,0,Math.PI*2,0,Math.PI/2),2759958,0,1.69,-.045,1,.9,1),n.id){case"chef":Je(e,s(.2,.26),16777215,0,1.88,0),Je(e,t(.25),16777215,0,2.06,0,1,.8,1);break;case"doctor":Je(e,s(.22,.06),16777215,0,1.76,0),Je(e,s(.06,.02),13621468,0,1.8,.2),Je(e,i(.22,.06,.02),16722474,0,1.08,.19),Je(e,i(.06,.22,.02),16722474,0,1.08,.19);break;case"librarian":Je(e,i(.1,.07,.02),2236962,-.075,1.65,.205),Je(e,i(.1,.07,.02),2236962,.075,1.65,.205),Je(e,i(.05,.015,.02),2236962,0,1.65,.205),Je(e,i(.2,.28,.06),8934860,.3,.85,.12);break;case"scientist":Je(e,i(.44,.09,.06),3394798,0,1.76,.17),Je(e,new Hn(.235,.3,3,10),16053492,0,.82,0,1,1,.85);break;case"engineer":Je(e,new ci(.24,12,8,0,Math.PI*2,0,Math.PI/2),16763904,0,1.68,0),Je(e,i(.5,.04,.34),16763904,0,1.68,.06);break;case"detective":Je(e,s(.34,.04),4862752,0,1.78,0),Je(e,s(.2,.2),4862752,0,1.9,0),Je(e,s(.205,.05),1381653,0,1.83,0);break;case"explorer":Je(e,s(.38,.04),13152368,0,1.78,0),Je(e,s(.2,.18),13152368,0,1.88,0),Je(e,i(.36,.5,.18),3103279,0,1.08,-.27);break;case"artist":Je(e,t(.28),13378099,.05,1.82,0,1,.38,1),Je(e,s(.03,.08),13378099,.05,1.93,0),Je(e,i(.2,.14,.03),14596231,.3,.85,.1);break}let a=[],c=[];Je(a,new Hn(.09,.4,3,6),2830138,0,-.3,0),Je(a,i(.17,.08,.28),1381653,0,-.6,.04),Je(c,new Hn(.075,.36,3,6),r,0,-.25,0),Je(c,t(.07),o,0,-.52,0);let l={body:Ki(e,!1),leg:Ki(a,!1),arm:Ki(c,!1)};return Tu.set(n.id,l),l}function Up(n){let e=pv(mn(n)),t=new bn;t.add(new st(e.body,Cp));let i=(s,r,o)=>{let a=new st(s,Cp);return a.position.set(r,o,0),t.add(a),a};return t.children.forEach(s=>{s.castShadow=!0}),t.userData={legL:i(e.leg,-.12,.78),legR:i(e.leg,.12,.78),armL:i(e.arm,-.32,1.3),armR:i(e.arm,.32,1.3)},t}function mv(){let n=new bn,e=new $t({color:10475263,transparent:!0,opacity:.45,depthWrite:!1}),t=new st(new Hn(.26,1,2,8),e);t.position.y=1,n.add(t);let i=new st(new ci(.22,8,8),e);return i.position.y=1.75,n.add(i),n}function gv(n){let e=Up(n.job),t=mv(),i=new st(N.xrayGeo,N.xrayMat);i.position.y=1,i.renderOrder=999,i.visible=!1,e.add(i);let s=new Gi(new Si({map:iv(n.name,256,64,"bold 34px sans-serif"),transparent:!0}));s.scale.set(1.6,.4,1),s.position.y=2.35,e.add(s);let r=s.clone();t.add(r),r.position.y=2.3,N.scene.add(e),N.scene.add(t),e.visible=!1,t.visible=!1,n.av=e,n.gh=t,n.xr=i,n.cx=n.tx=0,n.cz=n.tz=0,n.cy=n.ty=0,n.cyaw=n.tyaw=0,n.new=!0,n.moving=0,n.stepT=0}function Op(n,e,t){let i=m.players.get(n),s=Up(i?i.job:"chef");s.rotation.order="YXZ",s.rotation.x=-Math.PI/2,s.rotation.y=Math.random()*6,s.position.set(e,.25,t);let r=new st(new Er(.9,14),new $t({color:6948872}));return r.rotation.x=-Math.PI/2,r.position.set(e,.03,t),N.scene.add(s),N.scene.add(r),{id:n,x:e,z:t,a:s,pool:r}}function _v(){for(let n of N.bodies)N.scene.remove(n.a),N.scene.remove(n.pool);N.bodies=[],m.bodies=[]}function Fp(n,e){let t=new st(new ci(.22,10,8),new $t({color:16771488}));t.position.set(n,.3,e),N.scene.add(t);let i=null;if(m.q>=1&&(i=new Ns(16771504,22,14,1.4),i.position.set(n,1.2,e),N.scene.add(i)),N.lamps.push({m:t,light:i,t:40}),N.lamps.length>4){let s=N.lamps.shift();N.scene.remove(s.m),s.light&&N.scene.remove(s.light)}}function xv(n){sv(),m.mode=n.mode||"classic",m.aliveN=0,m.escN=0,m.mapId=n.map,m.map=up(n.map,{lockAll:m.mode==="survival"}),m.role=n.role,m.id=n.id,m.tasks=n.tasks,m.doors=n.doors.split("").map(e=>e==="1"),m.prog=n.prog,m.clues=n.clues.slice(),m.exitOpen=n.exitOpen,m.charges=n.charges,m.alive=n.alive,m.escaped=n.escaped,m.ghost=!n.alive||n.escaped,m.rage=n.rage,m.paused=n.paused,m.scare=n.scare,m.forceClassic=n.look==="classic",m.cdTotal=n.cd,m.kcd=0,m.xray=m.sprint=m.abilCd=0,m.danger=!1,m.pings=[],m.qbox=null,m.meeting=null,m.emergLeft=1,m.waitingQ=!1,m.appT=50+Math.random()*40,m.tl=n.tl,m.w2=n.tl!=null&&n.tl<=120,m.w30=n.tl!=null&&n.tl<=30,m.onBreak=!1,xt("breakbox",!1),X("btnBreak").style.display="block",so(Li()),rv(),js(),X("fps").style.display=m.showFps?"block":"none",X("chkFps").checked=m.showFps,m.players=new Map(n.players.map(e=>[e.id,Object.assign({},e,{st:0})]));for(let[e,t]of n.status)m.players.has(e)&&(m.players.get(e).st=t);for(let e of m.players.values())e.id!==m.id&&gv(e);m.doors.forEach((e,t)=>{N.doors[t]&&(N.doors[t].open=e,N.doors[t].t=e?1:0,N.doors[t].mesh.visible=!e,e&&N.doorLight[t].color.setHex(3211104))}),Iu();for(let e of n.bodies)N.bodies.push(Op(e.id,e.x,e.z));n.exitOpen&&(N.exitBeam.visible=!0),m.pos={x:n.spawn.x,y:m.ghost?2:fo,z:n.spawn.z},m.yaw=n.spawn.yaw,m.pitch=0,m.phase=n.phase==="meeting"?"meeting":"play";for(let e of["join","lobby","end","lost","qbox"])xt(e,!1);xt("hud",!0),X("app").classList.add("playing"),X("pausebox").style.display=n.paused?"flex":"none",X("hudRole").textContent=mn(m.job).emoji+" "+mn(m.job).name,X("hudRole").className="crew",X("hudMap").textContent=m.map.emoji+" "+m.map.name+(m.mode==="survival"?" \xB7 SURVIVAL":""),X("killbtn").style.display="none",vu(m.mapId),n.resume?It("Reconnected!",2500):yv(),n.brk&&Xc(!0),Wp()}function yv(){let n=m.role==="killer";X("roleBig").textContent=n?"YOU ARE THE KILLER":"YOU ARE CREW",X("roleBig").className=n?"k":"c",X("roleSub").innerHTML=n?m.mode==="survival"?"SURVIVAL MODE! Nobody knows it is you. Catch EVERYONE before they escape!<br>The doors are locked until the crew open them. Press <b>F</b> or <b>click</b> next to a student to catch them.":"Nobody knows it is you. Catch the crew one by one, but don't get caught!<br>You still get questions to look busy. Press <b>F</b> or <b>click</b> next to a student to catch them.":m.mode==="survival"?"SURVIVAL MODE! One of your friends is the killer, but you will not know who!<br>Every door is locked: answer questions to open them. Finish your tasks, open the exit and RUN. If you are caught you become a ghost.<br>Survive!":"One of your friends is the killer! Do your tasks (answer questions) to open the exit, find clues, and vote out the killer.<br>Stay together and watch out!",xt("role",!0),X("roleTapBox").style.display="flex",X("roleShow").style.display="none",m.frozenUntil=performance.now()+3e4,clearTimeout(m.roleT),m.roleT=setTimeout(kp,15e3)}function kp(){X("roleShow").style.display!=="block"&&(clearTimeout(m.roleT),X("roleTapBox").style.display="none",X("roleShow").style.display="block",De.gong(),setTimeout(()=>{xt("role",!1),m.frozenUntil=performance.now(),m.phase==="play"&&(X("lockhint").style.display="flex")},3500))}X("btnRoleTap").addEventListener("click",kp);function vv(n){if(m.map){for(let[e,t,i,s,r,o]of n.p){let a=m.players.get(e);a&&(a.st=o,e!==m.id&&(a.tx=t,a.ty=i,a.tz=s,a.tyaw=r,a.new&&a.av&&(a.cx=t,a.cy=i,a.cz=s,a.cyaw=r,a.new=!1)))}m.prog[0]=n.pr,n.al!=null&&(m.aliveN=n.al,m.escN=n.es),n.tl!=null&&(m.tl=n.tl,n.tl>130&&(m.w2=!1),n.tl>40&&(m.w30=!1),n.tl<=120&&!m.w2&&(m.w2=!0,It("\u23F0 <b>2 minutes left!</b> Finish the tasks and escape!",5e3,"bad"),De.warn()),n.tl<=30&&!m.w30&&(m.w30=!0,It("\u23F0 <b>30 seconds left!</b>",5e3,"bad"),De.warn())),n.d.split("").forEach((e,t)=>Lu(t,e==="1",!0)),n.kc!=null&&(m.kcd=n.kc),n.rg!=null&&(m.rage=n.rg)}}function Sv(n){let e=m.players.get(n.id);e&&(e.st=1),N.bodies.push(Op(n.id,n.x,n.z)),m.bodies.push({id:n.id,x:n.x,z:n.z});let t=Math.hypot(m.pos.x-n.x,m.pos.z-n.z);n.you?(m.alive=!1,m.ghost=!0,m.jump=1.7,m.qbox=null,xt("qbox",!1),De.scream(1),De.sting(),co("#a00",500),Li()>=2?Iv():(X("jump").style.display="flex",Lv()),X("jump").style.display="flex",setTimeout(()=>{X("jump").style.display="none",It("\u{1F480} <b>You were caught!</b> You are a ghost now. You can fly around and still do your tasks to help your team!",8e3,"bad")},1800),document.exitPointerLock&&document.exitPointerLock()):t<45&&(De.scream(Math.max(.2,1-t/45)),Li()>=2&&t<18&&co("#800",300),It("\u{1F631} Someone screamed!",3e3,"bad"))}function bv(n){let e=m.players.get(n.id);e&&(e.st=0);let t=N.bodies.findIndex(i=>i.id===n.id);t>=0&&(N.scene.remove(N.bodies[t].a),N.scene.remove(N.bodies[t].pool),N.bodies.splice(t,1)),m.bodies=m.bodies.filter(i=>i.id!==n.id),De.revive(),n.id===m.id?(m.alive=!0,m.ghost=!1,m.pos.x=n.x,m.pos.z=n.z,m.pos.y=fo,It("\u{1F49A} You were revived by the Doctor!",5e3,"good")):It("\u{1F49A} "+Mt(e?e.name:"Someone")+" was revived!",3500,"good")}function Mv(n){let e=m.players.get(n.id);e&&(e.st=2),n.id===m.id?(m.escaped=!0,m.ghost=!0,It("\u{1F3C3} <b>YOU ESCAPED!</b> You are safe. You can watch the others.",8e3,"good"),De.escape()):It("\u{1F3C3} "+Mt(e?e.name:"Someone")+" escaped!",3500,"good")}function Tv(){m.exitOpen=!0,N.exitBeam&&(N.exitBeam.visible=!0);let n=m.map.doors.findIndex(e=>e.kind==="gate");n>=0&&Lu(n,!0,!0),De.exitAlarm(),xp(),It("\u{1F6AA} <b>ALL TASKS DONE!</b> The EXIT is open. RUN to the green light!",9e3,"good"),m.flick=2}function Ev(n){m.phase="ended",m.dangerOn=!1,ro(),X("bodyBanner").style.display="none",document.exitPointerLock&&document.exitPointerLock();for(let s of["hud","qbox","meet","pausebox","jump","cluebox","menu","role","lockhint","breakbox"])xt(s,!1);X("btnBreak").style.display="none",m.onBreak=!1,X("lockhint").style.display="none";let e=n.winner==="crew",t=m.role==="killer",i=e!==t;X("endTitle").textContent=e?"\u{1F389} THE CREW WINS!":"\u{1F52A} THE KILLER WINS!",X("endTitle").className=e?"c":"k",X("endSub").innerHTML=(n.reason==="time"?"\u23F0 <b>Time is up!</b><br>":"")+"The killer was <b>"+mn(n.killer.job).emoji+" "+Mt(n.killer.name)+"</b>.<br>"+(i?"You won! \u{1F3C6}":"Better luck next time!"),X("endTable").innerHTML="<tr><th>Name</th><th>Job</th><th>Tasks</th><th>\u2713</th><th>\u2717</th><th>Result</th></tr>"+n.stats.map(s=>'<tr class="'+(s.role==="killer"?"kr":"")+'"><td>'+Mt(s.name)+(s.role==="killer"?" \u{1F52A}":"")+"</td><td>"+mn(s.job).emoji+"</td><td>"+s.done+"/"+s.total+"</td><td>"+s.correct+"</td><td>"+s.wrong+"</td><td>"+s.status+"</td></tr>").join(""),xt("end",!0),(i?De.win:De.lose)()}function Av(n){if(m.waitingQ=!1,m.phase!=="play")return;m.qbox={qid:n.qid,kind:n.kind,id:n.id,locked:!1,hint:n.hint,hinted:!1,n:n.opts.length},X("qTitle").textContent=n.kind==="lock"?"\u{1F512} Unlock the door":"\u{1F4DD} Task: "+Du(n.id),X("qText").textContent=n.text;let e=["#e84b4b","#3b82f6","#2fb36b","#e0a81c"];X("qOpts").innerHTML=n.opts.map((i,s)=>'<button class="opt" data-i="'+s+'" style="--c:'+e[s%4]+'"><span class="ol">'+"ABCD"[s]+"</span> "+Mt(i)+"</button>").join(""),X("qOpts").querySelectorAll(".opt").forEach(i=>i.addEventListener("click",()=>Nu(+i.dataset.i)));let t=X("qHint");t.style.display=n.hint>0&&n.opts.length>=3?"inline-block":"none",t.textContent="\u{1F4A1} "+mn(m.job).abName+" ("+n.hint+")",X("qMsg").textContent="",X("qMsg").className="",xt("qbox",!0),document.exitPointerLock&&document.exitPointerLock(),X("lockhint").style.display="none"}function Du(n){let e=m.map.stations[n];return m.map.rooms[e.room].name+" \u2013 "+e.name}function Nu(n){let e=m.qbox;!e||e.locked||(e.locked=!0,Xt({t:"ans",qid:e.qid,i:n}),De.click(),X("qOpts").querySelectorAll(".opt").forEach(t=>{t.disabled=!0,+t.dataset.i===n&&t.classList.add("pick")}))}X("qHint").addEventListener("click",()=>{let n=m.qbox;n&&!n.hinted&&!n.locked&&Xt({t:"hint",qid:n.qid})});X("qClose").addEventListener("click",Bp);function Bp(){m.qbox&&!m.qbox.locked&&Xt({t:"cancelq"}),m.qbox=null,xt("qbox",!1),m.phase==="play"&&(X("lockhint").style.display="flex")}function wv(n){let e=m.qbox;if(!(!e||e.qid!==n.qid)){e.hinted=!0,X("qHint").style.display="none",m.charges.hint=n.left;for(let t of n.remove){let i=X("qOpts").querySelector('[data-i="'+t+'"]');i&&(i.disabled=!0,i.classList.add("gone"))}De.hint()}}function Cv(n){let e=m.qbox;if(!e||e.qid!==n.qid)return;let t=X("qMsg");if(n.ok){if(t.textContent=e.kind==="lock"?"\u2705 Correct! The door unlocks!":"\u2705 Correct! Task complete!",t.className="good",De.correct(),X("qOpts").querySelectorAll(".opt").forEach(i=>{i.classList.contains("pick")&&i.classList.add("right")}),e.kind==="task"){let i=m.tasks.find(s=>s.sid===e.id);i&&(i.done=!0,fv(e.id))}setTimeout(()=>{m.qbox===e&&(m.qbox=null,xt("qbox",!1),m.phase==="play"&&(X("lockhint").style.display="flex"))},1100)}else{De.wrong(),co("#c00",300);let i=n.right!=null?X("qOpts").querySelector('[data-i="'+n.right+'"]'):null;i&&i.classList.add("right"),X("qOpts").querySelectorAll(".opt").forEach(s=>{s.classList.contains("pick")&&s.classList.add("wrong")}),t.className="bad",m.role==="killer"||m.ghost?t.textContent="\u274C Not quite. The right answer is shown in green.":t.textContent=n.saved?"\u274C Wrong! But your Second Chance protected the team ("+n.left+" left).":"\u274C Wrong! The killer heard you and grew stronger\u2026 Try again!",setTimeout(()=>{m.qbox===e&&(m.qbox=null,xt("qbox",!1),m.phase==="play"&&(X("lockhint").style.display="flex"))},2600)}}function lo(n,e,t){let i=X("bodyBanner");X("bbT").innerHTML=n,X("bbS").innerHTML=e,i.style.display="block",i.classList.remove("pop"),i.offsetWidth,i.classList.add("pop"),clearTimeout(lo.t),lo.t=setTimeout(()=>{i.style.display="none"},t||3800)}function Rv(n){if(n.stage==="discuss"){m.phase="meeting",m.qbox=null,xt("qbox",!1),X("lockhint").style.display="none",document.exitPointerLock&&document.exitPointerLock(),m.meeting={stage:"discuss",by:n.by,why:n.why,victim:n.victim,end:performance.now()+n.secs*1e3,cand:n.cand,voted:[],my:void 0,ready:n.ready||[],myReady:!1},co("#fff",300),Su(!0);let e=t=>{let i=[...m.players.values()].find(s=>s.name===t);return(i?mn(i.job).emoji+" ":"")+"<b>"+Mt(t)+"</b>"};n.why==="body"?(lo("\u{1F480} BODY FOUND!",e(n.by)+" found "+e(n.victim)+"'s body!<br><small>"+e(n.victim)+" was caught by the killer.</small>",4500),De.bodyFound()):(lo("\u{1F6A8} EMERGENCY MEETING","Called by "+e(n.by),3200),De.alarm())}else m.meeting&&(m.meeting.stage=n.stage,m.meeting.end=performance.now()+n.secs*1e3,m.meeting.cand=n.cand,m.meeting.voted=n.voted,n.stage==="result"&&(m.meeting.res=n,n.ejected&&De.gong()));xt("meet",!0),ho()}function ho(){let n=m.meeting;if(!n)return;let e=X("meetTitle"),t=n.stage==="vote"&&n.cand.includes(m.id)&&n.my===void 0;e.innerHTML=n.why==="body"?"\u{1F480} <b>"+Mt(n.by)+"</b> found <b>"+Mt(n.victim)+"</b>'s body!":"\u{1F6A8} <b>"+Mt(n.by)+"</b> called an emergency meeting!",X("meetStage").textContent=n.stage==="discuss"?"DISCUSS \u2013 talk to each other! Who is the killer?":n.stage==="vote"?"VOTE \u2013 who do you think is the killer?":"RESULT";let i=n.res;X("meetGrid").innerHTML=[...m.players.values()].map(a=>{let c=a.st===1||n.stage!=="result"&&!n.cand.includes(a.id),l=n.voted.includes(a.id),h=i?(i.tally.find(u=>u[0]===a.id)||[0,0])[1]:0;return'<div class="vc'+(c?" dead":"")+(n.my===a.id?" sel":"")+(t&&!c?" can":"")+'" data-id="'+a.id+'"><div class="ve">'+mn(a.job).emoji+"</div><b>"+Mt(a.name)+(a.id===m.id?" (you)":"")+"</b>"+(c?"<small>\u274C out</small>":"")+(l&&n.stage==="vote"?'<span class="vt">\u2714 voted</span>':"")+(i&&h?'<span class="vn">'+h+" vote"+(h>1?"s":"")+"</span>":"")+"</div>"}).join(""),X("meetGrid").querySelectorAll(".vc.can").forEach(a=>a.addEventListener("click",()=>zp(+a.dataset.id))),X("btnSkip").style.display=t?"inline-block":"none";let s=n.cand.length,r=n.cand.includes(m.id);X("btnReady").style.display=n.stage==="discuss"&&r?"inline-block":"none",X("btnReady").disabled=!!n.myReady,X("btnReady").textContent=n.myReady?"\u2714 Ready - waiting for the others ("+n.ready.length+" of "+s+")":"\u2705 I'm ready to vote ("+n.ready.length+" of "+s+" ready)",X("meetWait").textContent=n.stage==="vote"?r?n.my!==void 0?"\u2714 You voted - "+n.voted.length+" of "+s+" have voted":"Tap who you think is the killer  ("+n.voted.length+" of "+s+" voted)":"You are out - watch the vote.":n.stage==="discuss"?r?"":"You are out - listen to the others.":"",X("meetClues").innerHTML=m.clues.length?"<b>\u{1F4D3} Clues so far:</b><ul>"+m.clues.map(a=>"<li>"+Mt(a)+"</li>").join("")+"</ul>":"<i>No clues yet.</i>";let o=X("meetRes");i?(o.style.display="block",o.innerHTML=i.ejected?'<div class="big">'+Mt(i.ejected.name)+' was voted out\u2026</div><div class="'+(i.ejected.killer?"good":"bad")+' big2">'+(i.ejected.killer?"and they WERE the killer! \u{1F389}":"and they were NOT the killer. \u{1F628}")+"</div>":'<div class="big">Nobody was voted out.</div>'):o.style.display="none"}function zp(n){let e=m.meeting;!e||e.my!==void 0||(e.my=n,Xt({t:"vote",target:n}),De.click(),ho())}X("btnSkip").addEventListener("click",()=>zp(0));X("btnReady").addEventListener("click",()=>{let n=m.meeting;!n||n.myReady||(n.myReady=!0,Xt({t:"ready"}),De.click(),ho())});setInterval(()=>{let n=m.meeting;!n||m.paused||(X("meetTime").textContent=n.stage==="result"?"":Math.max(0,Math.ceil((n.end-performance.now())/1e3))+"s")},250);function Pv(n){m.meeting=null,m.phase="play",xt("meet",!1),X("lockhint").style.display="flex",Su(!1),_v();for(let[e,t]of n.status){let i=m.players.get(e);i&&(i.st=t),e===m.id&&(m.alive=t===0,m.ghost=t!==0)}N.camera&&(m.flick=1)}function Iv(){let n=X("jumpc"),e=n.getContext("2d");n.width=640,n.height=480,e.fillStyle="#000",e.fillRect(0,0,640,480);let t=e.createRadialGradient(320,230,20,320,240,260);t.addColorStop(0,"#d9d4c4"),t.addColorStop(1,"#2a2620"),e.fillStyle=t,e.beginPath(),e.ellipse(320,250,170,220,0,0,7),e.fill(),e.fillStyle="#000",e.beginPath(),e.ellipse(250,200,48,70,-.2,0,7),e.ellipse(390,200,48,70,.2,0,7),e.fill(),e.fillStyle="#fff",e.beginPath(),e.arc(252,215,9,0,7),e.arc(388,215,9,0,7),e.fill(),e.fillStyle="#300",e.beginPath(),e.moveTo(230,320);for(let i=0;i<=10;i++)e.lineTo(230+i*18,320+(i%2?90:20));for(let i=10;i>=0;i--)e.lineTo(230+i*18,400+(i%2?-10:40));e.closePath(),e.fill(),e.strokeStyle="#a00",e.lineWidth=5;for(let i=0;i<9;i++)e.beginPath(),e.moveTo(200+Math.random()*240,330),e.lineTo(200+Math.random()*240,470),e.stroke();e.fillStyle="rgba(160,0,0,.25)",e.fillRect(0,0,640,480),X("jump").classList.remove("calm")}function Lv(){let n=X("jumpc"),e=n.getContext("2d");n.width=640,n.height=240,e.fillStyle="#220",e.fillRect(0,0,640,240),e.fillStyle="#fff",e.font="48px sans-serif",e.textAlign="center",e.fillText("You were caught\u2026",320,130),X("jump").classList.add("calm")}function Dv(){let n=document.createElement("canvas");n.width=128,n.height=256;let e=n.getContext("2d");e.fillStyle="rgba(0,0,0,.92)",e.beginPath(),e.moveTo(30,250),e.lineTo(40,110),e.quadraticCurveTo(64,20,88,110),e.lineTo(98,250),e.closePath(),e.fill(),e.beginPath(),e.arc(64,62,30,0,7),e.fill(),e.fillStyle="#fff",e.beginPath(),e.ellipse(52,60,6,10,0,0,7),e.ellipse(76,60,6,10,0,0,7),e.fill();let t=new Cn(n);return t.colorSpace=bt,t}addEventListener("keydown",n=>{if(m.off){n.preventDefault();return}if(m.phase==="join"||m.phase==="lobby")return;let e=n.key.toLowerCase();if(!(n.target&&(n.target.tagName==="INPUT"||n.target.tagName==="SELECT"))){if(e==="h"&&(m.phase==="play"||m.phase==="meeting")){Xc(!m.onBreak);return}if(!m.onBreak){if(m.qbox){let t="1234".indexOf(e)>=0?"1234".indexOf(e):"abcd".indexOf(e);if(t>=0&&t<m.qbox.n){let i=X("qOpts").querySelector('[data-i="'+t+'"]');i&&!i.disabled&&Nu(t)}e==="escape"&&Bp();return}Pt[e]=!0,["arrowup","arrowdown","arrowleft","arrowright"," "].includes(e)&&n.preventDefault(),!(m.phase!=="play"||m.paused)&&(e==="e"||e==="r"?Hp():e==="f"?Vp():e==="q"?Nv():e==="c"&&Ou())}}});addEventListener("keyup",n=>{Pt[n.key.toLowerCase()]=!1});addEventListener("blur",()=>{for(let n in Pt)Pt[n]=!1});document.addEventListener("mousemove",n=>{m.phase!=="play"||m.qbox||m.paused||(document.pointerLockElement===X("gl")||Uu)&&(m.yaw-=(n.movementX||0)*.0022,m.pitch=Zs(m.pitch-(n.movementY||0)*.0022,-1.45,1.45))});var Uu=!1;X("gl").addEventListener("mousedown",()=>{Uu=!0,m.phase==="play"&&document.pointerLockElement!==X("gl")?Gp():Vp()});addEventListener("mouseup",()=>{Uu=!1});function Gp(){if(!(m.qbox||m.paused||m.phase!=="play"))try{let n=X("gl").requestPointerLock();n&&n.catch&&n.catch(()=>{})}catch{}}X("lockhint").addEventListener("click",()=>{X("lockhint").style.display="none",Gp()});document.addEventListener("pointerlockchange",()=>{document.pointerLockElement===X("gl")?X("lockhint").style.display="none":m.phase==="play"&&!m.qbox&&!m.paused&&!m.onBreak&&!X("menu").style.display.includes("flex")&&performance.now()>m.frozenUntil&&(X("lockhint").style.display="flex")});X("btnMenu").addEventListener("click",()=>{xt("menu",!0),document.exitPointerLock&&document.exitPointerLock(),X("lockhint").style.display="none"});X("btnResume").addEventListener("click",()=>{xt("menu",!1),X("lockhint").style.display="flex"});X("btnClues").addEventListener("click",Ou);X("btnCluesClose").addEventListener("click",Ou);function Ou(){let n=X("cluebox").style.display!=="flex";n?(X("clueList").innerHTML=m.clues.length?m.clues.map(e=>"<li>"+Mt(e)+"</li>").join(""):"<li><i>No clues yet. Unlock doors to find clues about the killer!</i></li>",document.exitPointerLock&&document.exitPointerLock(),X("lockhint").style.display="none"):X("lockhint").style.display="flex",xt("cluebox",n)}X("myGfx").addEventListener("change",()=>{let n=X("myGfx").value;m.smooth=n==="s",m.autoClassic=!1,n!=="s"&&(m.q=+n),js()});X("chkFps").addEventListener("change",()=>{m.showFps=X("chkFps").checked,X("fps").style.display=m.showFps?"block":"none"});X("vol").addEventListener("input",()=>Fc(+X("vol").value/100));X("myScare").addEventListener("change",()=>{m.myScare=+X("myScare").value,so(Li())});function Fu(){if(!m.map||m.escaped)return null;let n=m.pos,e=m.map,t=null,i=s=>{(!t||s.d<t.d)&&(t=s)};if(!m.ghost&&m.mode!=="survival"){for(let r of m.bodies){let o=Math.hypot(n.x-r.x,n.z-r.z);o<3.4&&i({kind:"report",d:o-3,text:"\u{1F6A8} Press <b>E</b> \u2013 REPORT the body!"})}let s=Math.hypot(n.x-e.button.x,n.z-e.button.z);s<2.8&&m.emergLeft>0&&i({kind:"emerg",d:s,text:"\u{1F534} Press <b>E</b> \u2013 Emergency meeting"})}for(let s of m.tasks)if(!s.done){let r=e.stations[s.sid],o=Math.hypot(n.x-r.x,n.z-r.z);o<3&&i({kind:"task",id:s.sid,d:o,text:"\u{1F4DD} Press <b>E</b> \u2013 Do task: "+Du(s.sid)})}if(m.role!=="killer")for(let s of e.panels){if(m.doors[s.door])continue;let r=Math.hypot(n.x-s.x,n.z-s.z);r<2.6&&i({kind:"lock",id:s.door,d:r,text:"\u{1F512} Press <b>E</b> \u2013 Answer to unlock this door"})}return t}function Hp(){if(m.qbox||m.waitingQ)return;let n=Fu();n&&(n.kind==="report"?Xt({t:"report"}):n.kind==="emerg"?(m.emergLeft--,Xt({t:"emerg"})):(m.waitingQ=!0,Xt({t:"ask",kind:n.kind,id:n.id}),setTimeout(()=>m.waitingQ=!1,3e3)))}function Ru(){if(m.role!=="killer"||!m.alive)return null;let n=null,e=2.7;for(let t of m.players.values()){if(t.id===m.id||t.st!==0||t.new)continue;let i=Math.hypot(m.pos.x-t.tx,m.pos.z-t.tz);i<e&&(e=i,n=t)}return n}function Vp(){if(m.role!=="killer"||m.phase!=="play"||m.qbox||m.paused)return;let n=Ru();if(n){if(m.kcd>0){It("\u23F3 Wait "+Math.ceil(m.kcd)+"s\u2026",1200);return}Xt({t:"kill",target:n.id}),m.kcd=99}}function Nv(){let n=mn(m.job);m.ghost||(n.ab==="revive"&&m.role==="crew"?m.charges.revive>0?Xt({t:"ability",what:"revive"}):It("No revives left.",1500):n.ab==="clue"&&m.role==="crew"?m.charges.clue>0?(Xt({t:"ability",what:"clue"}),m.charges.clue--):It("Already used.",1500):n.ab==="xray"&&m.abilCd<=0?(m.xray=n.dur,m.abilCd=n.cd,De.whisper()):n.ab==="sprint"&&m.abilCd<=0?(m.sprint=n.dur,m.abilCd=n.cd,De.run()):n.ab==="lamp"&&m.abilCd<=0?(m.abilCd=n.cd,Fp(m.pos.x,m.pos.z),Xt({t:"ability",what:"lamp"}),De.lamp()):m.abilCd>0&&It("Recharging\u2026 "+Math.ceil(m.abilCd)+"s",1200))}function Wp(){if(!m.map||m.phase==="join")return;let n=m.prog[0];X("progBar").style.width=(m.prog[1]?100*n/m.prog[1]:0)+"%";let e=m.tl!=null?"  \xB7  \u23F1 "+Math.floor(m.tl/60)+":"+String(m.tl%60).padStart(2,"0"):"";X("progTxt").textContent=(m.exitOpen?"EXIT OPEN \u2013 RUN!":"Escape progress "+n+" / "+m.prog[1])+(m.mode==="survival"?"  \xB7  \u{1F3C3} "+m.aliveN+" running"+(m.escN?"  \xB7  \u{1F6AA} "+m.escN+" escaped":""):"")+e,X("progTxt").className=m.tl!=null&&m.tl<=60?"low":"";let t=m.tasks.filter(a=>a.done).length;X("taskList").innerHTML="<b>Your tasks "+t+"/"+m.tasks.length+"</b>"+m.tasks.map(a=>'<div class="'+(a.done?"td":"")+'">'+(a.done?"\u2705 ":"\u2B1C ")+Mt(Du(a.sid))+"</div>").join("")+(m.ghost&&!m.escaped?'<div class="gh">\u{1F47B} You are a ghost \u2013 keep doing tasks!</div>':"");let i=mn(m.job),s='<span class="ai">'+i.emoji+"</span><b>"+i.abName+"</b>";if(i.ab==="hint"?s+="<small>in questions \xB7 "+(m.charges.hint||0)+" left</small>":i.ab==="second"?s+="<small>automatic \xB7 "+(m.charges.second||0)+" left</small>":i.ab==="danger"?s+="<small>automatic</small>":i.ab==="revive"?s+="<small>Q \xB7 "+(m.charges.revive||0)+" left</small>":i.ab==="clue"?s+="<small>Q \xB7 "+(m.charges.clue||0)+" left</small>":s+="<small>Q \xB7 "+(m.abilCd>0?Math.ceil(m.abilCd)+"s":"ready")+"</small>",X("abil").innerHTML=s,m.role==="killer"){let a=Ru();X("killbtn").innerHTML="<b>\u{1F52A} "+(m.kcd>.05?Math.ceil(m.kcd)+"s":a?"CATCH "+Mt(a.name)+"! (F)":"ready")+"</b><small>Power "+m.rage+"/10 \u{1F608}</small>",X("killbtn").className=m.kcd<=.05&&a?"hot":"",X("killbtn").style.display=a?"flex":"none"}X("clueN").textContent=m.clues.length;let r=Fu(),o=X("prompt");if(m.phase==="play"&&!m.qbox&&!m.paused){let a=r?r.text:"";!a&&m.role==="killer"&&Ru()&&(a=m.kcd>.05?"":"\u{1F52A} Press <b>F</b> or click to CATCH"),!a&&mn(m.job).ab==="revive"&&m.charges.revive>0&&!m.ghost&&m.bodies.some(c=>Math.hypot(m.pos.x-c.x,m.pos.z-c.z)<4.5)&&(a="\u{1F49A} Press <b>Q</b> to REVIVE"),o.innerHTML=a,o.style.display=a?"block":"none"}else o.style.display="none";Ov()}setInterval(Wp,100);var Js=X("mini"),Uv=Js.getContext("2d");function Ov(){if(!m.map)return;let n=Js.width/48,e=Uv;e.clearRect(0,0,Js.width,Js.height),e.fillStyle="rgba(8,10,16,.72)",e.fillRect(0,0,Js.width,Js.height),e.font="8px sans-serif",e.textAlign="center";for(let t of m.map.rooms)e.strokeStyle=t.kind==="exit"?"#35c46a":"#445066",e.lineWidth=1,e.strokeRect(t.x0*n+.5,t.z0*n+.5,16*n,16*n),e.fillStyle=t.kind==="exit"?"#35c46a":"#6b778c",e.fillText(t.name.length>14?t.name.slice(0,13)+".":t.name,t.cx*n,t.cz*n+3);for(let t of m.map.doors)m.doors[t.id]||(e.fillStyle=t.kind==="gate"?"#ff5050":"#ffb347",t.o==="v"?e.fillRect(t.cx*n-1.5,(t.cz-3.4/2)*n,3,3.4*n):e.fillRect((t.cx-3.4/2)*n,t.cz*n-1.5,3.4*n,3));for(let t of m.tasks)if(!t.done){let i=m.map.stations[t.sid];e.fillStyle="#ffd34a",e.fillRect(i.x*n-3,i.z*n-3,6,6)}for(let t of m.pings)e.strokeStyle="rgba(255,60,60,"+Math.min(1,t.t/4)+")",e.lineWidth=2,e.beginPath(),e.arc(t.x*n,t.z*n,4+(9-t.t)*1.6,0,7),e.stroke();for(let t of m.bodies)e.fillStyle="#ff3030",e.fillText("\u2716",t.x*n,t.z*n+3);e.save(),e.translate(m.pos.x*n,m.pos.z*n),e.rotate(-m.yaw),e.fillStyle="#fff",e.beginPath(),e.moveTo(0,-5),e.lineTo(4,4),e.lineTo(-4,4),e.closePath(),e.fill(),e.restore()}var Eu=performance.now(),zc=0,Au=0,Gc=0,wu=0,Rp=0,Pp=0;function js(){if(!N.renderer)return;let n=m.smooth;N.prBase=[.55,.8,Math.min(window.devicePixelRatio||1,1.25)][m.q],N.pr=n?Math.min(N.prBase,.5):N.prBase,N.renderer.setPixelRatio(N.pr),N.renderer.setSize(innerWidth,innerHeight,!1),N.camera.far=n?38:70,N.camera.updateProjectionMatrix(),N.scene&&m.map&&(N.scene.fog.density=m.map.D.fog*(n?1.35:1)),N.flash&&(N.flash.distance=n?20:28),N.dust&&(N.dust.visible=!n),N.halos&&(N.halos.visible=!n),N.pools&&(N.pools.visible=!n);for(let t of N.wisps||[])t.visible=!n;N.scene&&m.map&&N.look!==Cu()&&Np(Cu());let e=m.q>=2&&!n&&N.look==="rich";N.flash&&N.flash.castShadow!==e&&(N.flash.castShadow=e,N.scene.traverse(t=>{t.material&&(t.material.needsUpdate=!0)})),X("myGfx")&&(X("myGfx").value=n?"s":String(m.q))}function Ip(){try{localStorage.setItem("se_fb","1")}catch{}}function Xp(n){if(requestAnimationFrame(Xp),!N.renderer||!m.map||m.phase!=="play"&&m.phase!=="meeting"){Eu=n;return}let e=n-Eu;if(m.smooth&&e<31)return;let t=Math.min(.06,e/1e3);Eu=n,Fv(t,n/1e3),N.renderer.render(N.scene,N.camera);let i=Math.min(e,250)/1e3;if(zc+=i,Au++,Gc+=i,wu++,zc>=1&&(m.fps=Math.round(Au/zc),zc=0,Au=0,m.showFps&&(X("fps").textContent=m.fps+" FPS \xB7 "+N.renderer.info.render.calls+" draws \xB7 "+(m.smooth?"Smooth":["Low","Medium","High"][m.q]))),Gc>3&&!uo.get("nogov")){let s=Gc/wu;Gc=0,wu=0,N.look==="rich"&&s>.036?(m.autoClassic=!0,js(),It("\u26A1 Switched to the simple look to keep the game fast",3500),Ip()):s>.042&&!m.smooth?(m.smooth=!0,js(),It("\u26A1 Smooth mode turned on to keep the game fast",3500),Ip()):s>.055&&N.pr>.42&&(N.pr*=.85,N.renderer.setPixelRatio(N.pr),N.renderer.setSize(innerWidth,innerHeight,!1))}}requestAnimationFrame(Xp);setInterval(()=>{m.fps&&(m.phase==="play"||m.phase==="meeting")&&Xt({t:"fps",v:m.fps,q:m.smooth?"Smooth":["Low","Medium","High"][m.q]})},5e3);function Fv(n,e){let t=m.map,i=m.pos,s=m.phase==="play"&&!m.paused&&!m.qbox&&!m.onBreak&&performance.now()>m.frozenUntil&&!m.jump;if(m.abilCd=Math.max(0,m.abilCd-n),m.xray=Math.max(0,m.xray-n),m.sprint=Math.max(0,m.sprint-n),!m.paused){m.kcd=Math.max(0,m.kcd-n),m.flick=Math.max(0,m.flick-n),m.dark=Math.max(0,m.dark-n),m.jump=Math.max(0,m.jump-n);for(let d of m.pings)d.t-=n;m.pings=m.pings.filter(d=>d.t>0)}let r=!1,o=Ap;if(s){let d=0,g=0;(Pt.w||Pt.arrowup)&&(g+=1),(Pt.s||Pt.arrowdown)&&(g-=1),Pt.a&&(d-=1),Pt.d&&(d+=1),Pt.arrowleft&&(m.yaw+=n*1.9),Pt.arrowright&&(m.yaw-=n*1.9);let y=Math.hypot(d,g);if(y>0){d/=y,g/=y,r=!0,m.role==="killer"&&(o*=1+Math.min(.2,.02*m.rage)),m.sprint>0&&(o*=1.9),m.ghost&&(o*=1.25);let _=-Math.sin(m.yaw),p=-Math.cos(m.yaw),S=Math.cos(m.yaw),w=-Math.sin(m.yaw),T=(_*g+S*d)*o*n,A=(p*g+w*d)*o*n;m.ghost?(i.x=Zs(i.x+T,.5,48-.5),i.z=Zs(i.z+A,.5,64-.5),i.y=Zs(i.y+Math.sin(m.pitch)*g*o*n,.6,t.H-.5)):(wp(i.x+T,i.z)||(i.x+=T),wp(i.x,i.z+A)||(i.z+=A)),m.ghost||(m.stepT+=n*(o/Ap),m.stepT>.48&&(m.stepT=0,De.step(.6)))}Pt[" "]&&m.ghost&&(i.y=Math.min(t.H-.5,i.y+n*2.5))}m.ghost&&s&&Pt.shift&&(i.y=Math.max(.6,i.y-n*2.5)),m.ghost||(Pp+=r?n*9:0,i.y=fo+(r?Math.sin(Pp)*.035:0));let a=performance.now();a-Rp>100&&m.phase==="play"&&!m.paused&&(Rp=a,Xt({t:"pos",x:+i.x.toFixed(2),y:+i.y.toFixed(2),z:+i.z.toFixed(2),yaw:+m.yaw.toFixed(2)}));let c=N.camera,l=m.jump>0?(Math.random()-.5)*.08:0;c.position.set(i.x,i.y,i.z),c.rotation.set(m.pitch+l,m.yaw+l,0);let h=Li(),u=1;m.flick>0&&h>=1?u=Math.random()<.5?.15:1:h>=1&&Math.random()<.004&&(m.flick=.3),m.dark>0&&(u=0),N.hemi.intensity=N.hemiBase*(m.ghost?1.5:1)*(u===0?.25:1),N.flash.intensity=m.ghost?25:60*(u<1?.2+.8*u:1)*(m.dark>0?0:1),N.lantern.intensity=m.ghost?12:7*(m.dark>0?0:1);let f=u===1?.8+.2*Math.sin(e*2.3):u;if(N.flickMat.color.setScalar(u===1?.75+.25*Math.sin(e*2.3):u),N.pools&&(N.pools.material.opacity=N.poolBase*f,N.halos.material.opacity=.7*f),!m.smooth){N.dust.position.set(i.x,0,i.z);let d=N.dustP,g=N.dustN;for(let _=0;_<g;_++){let p=_*3;d[p]+=Math.sin(_*1.3+e*.3)*.12*n,d[p+1]-=(.04+_%5*.01)*n,d[p+2]+=Math.cos(_*.7+e*.25)*.12*n,d[p+1]<0&&(d[p+1]=3.6),d[p]>8?d[p]=-8:d[p]<-8&&(d[p]=8),d[p+2]>8?d[p+2]=-8:d[p+2]<-8&&(d[p+2]=8)}N.dustAttr.needsUpdate=!0;let y=h>=1&&m.phase==="play";for(let _ of N.wisps){let p=_.userData.ph;_.position.set(24+Math.sin(e*.11+p)*20,1.8+Math.sin(e*.7+p)*.3,32+Math.cos(e*.083+p*1.3)*26);let S=Math.hypot(_.position.x-i.x,_.position.z-i.z);_.material.opacity=y?Zs((S-4)/6,0,1)*(h>=2?.26:.14):0}}for(let d of N.doors)if(d){let g=d.open?1:0;d.t+=(g-d.t)*Math.min(1,n*4),d.mesh.position.y=3/2-d.t*(3+.2),d.mesh.visible=d.t<.97}for(let[,d]of N.markers)d.gem.rotation.y+=n*2,d.gem.position.y=2.3+Math.sin(e*2)*.1;for(let d of m.players.values()){if(d.id===m.id||!d.av)continue;let g=Math.min(1,n*10),y=d.cx,_=d.cz;d.cx+=(d.tx-d.cx)*g,d.cy+=(d.ty-d.cy)*g,d.cz+=(d.tz-d.cz)*g;let p=d.tyaw-d.cyaw;p=Math.atan2(Math.sin(p),Math.cos(p)),d.cyaw+=p*g;let S=Math.hypot(d.cx-y,d.cz-_)/Math.max(n,.001);if(d.moving+=((S>.6?1:0)-d.moving)*Math.min(1,n*8),d.av.visible=d.st===0,d.gh.visible=d.st===1&&m.ghost,d.xr.visible=d.st===0&&(m.xray>0||m.ghost||m.role==="killer"&&m.exitOpen),d.av.visible){d.av.position.set(d.cx,0,d.cz),d.av.rotation.y=d.cyaw+Math.PI;let w=d.av.userData,T=Math.sin(e*9)*.6*d.moving;if(w.legL.rotation.x=T,w.legR.rotation.x=-T,w.armL.rotation.x=-T,w.armR.rotation.x=T,d.moving>.5&&S>.6&&(d.stepT+=n,d.stepT>.5)){d.stepT=0;let A=Math.hypot(d.cx-i.x,d.cz-i.z);A<14&&De.step(.5*(1-A/14),Zs(Math.sin(Math.atan2(d.cx-i.x,i.z-d.cz)+m.yaw)*.8,-1,1))}}d.gh.visible&&d.gh.position.set(d.cx,.2+Math.sin(e*2+d.id)*.15+(d.cy>1.5?d.cy-1.6:0),d.cz)}for(let d of N.bodies)d.a.visible=!0;for(let d of N.lamps)d.t-=n,d.t<0&&(N.scene.remove(d.m),d.light&&N.scene.remove(d.light),d.dead=!0);if(N.lamps=N.lamps.filter(d=>!d.dead),m.appT-=n,m.appT<=0&&m.phase==="play"&&h>=2&&!m.ghost&&(kv(),m.appT=55+Math.random()*60),N.app){N.app.t-=n;let d=new G;c.getWorldDirection(d);let g=N.app.s.position.clone().sub(c.position).normalize();d.dot(g)>.93&&N.app.t<1.3&&(De.sting(),co("#fff",120),N.app.t=0),N.app.t<=0&&(N.scene.remove(N.app.s),N.app=null)}X("danger").style.opacity=m.danger?.25+.2*Math.sin(e*8):0,m.danger!==m.dangerOn&&(m.dangerOn=m.danger,De.heartLoop(m.danger)),m.danger&&!fp("heartbeat")&&Math.floor(e*1.6)!==Math.floor((e-n)*1.6)&&De.heart()}function kv(){N.appTex||(N.appTex=Dv());let n=m.yaw+(Math.random()<.5?-1:1)*(.6+Math.random()*.5),e=9,t=new Gi(new Si({map:N.appTex,transparent:!0,fog:!1}));t.scale.set(1.7,3.4,1),t.position.set(m.pos.x-Math.sin(n)*e,1.7,m.pos.z-Math.cos(n)*e),N.scene.add(t),N.app={s:t,t:2.2},m.flick=.5,De.creak(),De.thud()}function Xc(n){m.onBreak===n||m.phase!=="play"&&m.phase!=="meeting"||(m.onBreak=n,xt("breakbox",n),Xt({t:"break",on:n}),n?(document.exitPointerLock&&document.exitPointerLock(),Fc(.12),ro(),m.myScare=0,X("myScare").value="0",so(0),m.flick=0,m.dark=0,X("danger").style.opacity=0,X("lockhint").style.display="none",Pt.w=Pt.a=Pt.s=Pt.d=!1):(Fc(+X("vol").value/100),vu(m.mapId),X("lockhint").style.display=m.phase==="play"?"flex":"none"))}X("btnBreak").addEventListener("click",()=>Xc(!0));X("btnBreakEnd").addEventListener("click",()=>Xc(!1));Zy&&(window.__se={ST:m,V:N,send:Xt,drop(){Un&&Un.close()},setSmooth(n){m.smooth=n,js()},audioInfo:pp,tp(n,e){m.pos.x=n,m.pos.z=e},nearest:Fu,interact:Hp,answer:Nu,toast:It,sees:()=>[...m.players.values()].map(n=>[n.id,n.name,n.st,+(n.cx||0).toFixed(1),+(n.cz||0).toFixed(1)])});})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
