(()=>{var Qp=Object.create;var Jc=Object.defineProperty;var em=Object.getOwnPropertyDescriptor;var tm=Object.getOwnPropertyNames;var nm=Object.getPrototypeOf,im=Object.prototype.hasOwnProperty;var sm=n=>{throw TypeError(n)};var rm=(n,e)=>()=>{try{return e||n((e={exports:{}}).exports,e),e.exports}catch(t){throw e=0,t}},go=(n,e)=>{for(var t in e)Jc(n,t,{get:e[t],enumerable:!0})},om=(n,e,t,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of tm(e))!im.call(n,s)&&s!==t&&Jc(n,s,{get:()=>e[s],enumerable:!(i=em(e,s))||i.enumerable});return n};var $u=(n,e,t)=>(t=n!=null?Qp(nm(n)):{},om(e||!n||!n.__esModule?Jc(t,"default",{value:n,enumerable:!0}):t,n));var tr=(n,e,t)=>e.has(n)?sm("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(n):e.set(n,t);var Kh=rm((_T,jh)=>{"use strict";var se={};se.generateIdentifier=function(){return Math.random().toString(36).substring(2,12)};se.localCName=se.generateIdentifier();se.splitLines=function(n){return n.trim().split(`
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
`),e.headerExtensions&&e.headerExtensions.forEach(s=>{t+=se.writeExtmap(s)}),t};se.parseRtpEncodingParameters=function(n){let e=[],t=se.parseRtpParameters(n),i=t.fecMechanisms.indexOf("RED")!==-1,s=t.fecMechanisms.indexOf("ULPFEC")!==-1,r=se.matchPrefix(n,"a=ssrc:").map(h=>se.parseSsrcMedia(h)).filter(h=>h.attribute==="cname"),o=r.length>0&&r[0].ssrc,a,c=se.matchPrefix(n,"a=ssrc-group:FID").map(h=>h.substring(17).split(" ").map(d=>parseInt(d,10)));c.length>0&&c[0].length>1&&c[0][0]===o&&(a=c[0][1]),t.codecs.forEach(h=>{if(h.name.toUpperCase()==="RTX"&&h.parameters.apt){let u={ssrc:o,codecPayloadType:parseInt(h.parameters.apt,10)};o&&a&&(u.rtx={ssrc:a}),e.push(u),i&&(u=JSON.parse(JSON.stringify(u)),u.fec={ssrc:o,mechanism:s?"red+ulpfec":"red"},e.push(u))}}),e.length===0&&o&&e.push({ssrc:o});let l=se.matchPrefix(n,"b=");return l.length&&(l[0].indexOf("b=TIAS:")===0?l=parseInt(l[0].substring(7),10):l[0].indexOf("b=AS:")===0?l=parseInt(l[0].substring(5),10)*1e3*.95-2e3*8:l=void 0,e.forEach(h=>{h.maxBitrate=l})),e};se.parseRtcpParameters=function(n){let e={},t=se.matchPrefix(n,"a=ssrc:").map(r=>se.parseSsrcMedia(r)).filter(r=>r.attribute==="cname")[0];t&&(e.cname=t.value,e.ssrc=t.ssrc);let i=se.matchPrefix(n,"a=rtcp-rsize");e.reducedSize=i.length>0,e.compound=i.length===0;let s=se.matchPrefix(n,"a=rtcp-mux");return e.mux=s.length>0,e};se.writeRtcpParameters=function(n){let e="";return n.reducedSize&&(e+=`a=rtcp-rsize\r
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
`};se.getDirection=function(n,e){let t=se.splitLines(n);for(let i=0;i<t.length;i++)switch(t[i]){case"a=sendrecv":case"a=sendonly":case"a=recvonly":case"a=inactive":return t[i].substring(2);default:}return e?se.getDirection(e):"sendrecv"};se.getKind=function(n){return se.splitLines(n)[0].split(" ")[0].substring(2)};se.isRejected=function(n){return n.split(" ",2)[1]==="0"};se.parseMLine=function(n){let t=se.splitLines(n)[0].substring(2).split(" ");return{kind:t[0],port:parseInt(t[1],10),protocol:t[2],fmt:t.slice(3).join(" ")}};se.parseOLine=function(n){let t=se.matchPrefix(n,"o=")[0].substring(2).split(" ");return{username:t[0],sessionId:t[1],sessionVersion:parseInt(t[2],10),netType:t[3],addressType:t[4],address:t[5]}};se.isValidSDP=function(n){if(typeof n!="string"||n.length===0)return!1;let e=se.splitLines(n);for(let t=0;t<e.length;t++)if(e[t].length<2||e[t].charAt(1)!=="=")return!1;return!0};typeof jh=="object"&&(jh.exports=se)});var Ed=0,Rl=1,Ad=2;var Xi=1,wd=2,ks=3,Ri=0,rn=1,Xn=2,qi=0,Bs=1,Pi=2,Pl=3,Il=4,Cd=5;var Yi=100,Rd=101,Pd=102,Id=103,Ld=104,Dd=200,Nd=201,Ud=202,Od=203,Ll=204,Dl=205,Fd=206,kd=207,Bd=208,zd=209,Gd=210,Hd=211,Vd=212,Wd=213,Xd=214,Wo=0,Xo=1,qo=2,ws=3,Yo=4,Zo=5,Jo=6,$o=7,va=0,qd=1,Yd=2,qn=0,Nl=1,Ul=2,Ol=3,Fl=4,kl=5,Bl=6,zl=7;var Gl=300,Zi=301,zs=302,Sa=303,ba=304,Cs=1e3,kn=1001,jo=1002,Ht=1003,Zd=1004;var Or=1005;var nn=1006,Ma=1007;var hi=1008;var cn=1009,Hl=1010,Vl=1011,Gs=1012,Ta=1013,Pn=1014,In=1015,Ln=1016,Ea=1017,Aa=1018,Ji=1020,Wl=35902,Xl=35899,ql=1021,Yl=1022,Dn=1023,ri=1026,ui=1027,Zl=1028,wa=1029,Ii=1030,Ca=1031;var Ra=1033,Fr=33776,kr=33777,Br=33778,zr=33779,Pa=35840,Ia=35841,La=35842,Da=35843,Na=36196,Ua=37492,Oa=37496,Fa=37488,ka=37489,Gr=37490,Ba=37491,za=37808,Ga=37809,Ha=37810,Va=37811,Wa=37812,Xa=37813,qa=37814,Ya=37815,Za=37816,Ja=37817,$a=37818,ja=37819,Ka=37820,Qa=37821,ec=36492,tc=36494,nc=36495,ic=36283,sc=36284,Hr=36285,rc=36286;var hr=2300,Ko=2301,Ho=2302,yl=2303,vl=2400,Sl=2401,bl=2402;var Jd=3200;var oc=0,$d=1,di="",Et="srgb",ur="srgb-linear",dr="linear",rt="srgb";var Vo=7680;var jd=519,Kd=512,Qd=513,ef=514,Jl=515,tf=516,nf=517,$l=518,jl=519,Kl=35044;var Ql="300 es",Sn=2e3,Rs=2001;function am(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function cm(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function fr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function sf(){let n=fr("canvas");return n.style.display="block",n}var ju={},Ps=null;function pr(...n){let e="THREE."+n.shift();Ps?Ps("log",e,...n):console.log(e,...n)}function rf(n){let e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Oe(...n){n=rf(n);let e="THREE."+n.shift();if(Ps)Ps("warn",e,...n);else{let t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Fe(...n){n=rf(n);let e="THREE."+n.shift();if(Ps)Ps("error",e,...n);else{let t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function lr(...n){let e=n.join(" ");e in ju||(ju[e]=!0,Oe(...n))}function of(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}var af={[Wo]:Wo,[qo]:Jo,[Yo]:Yo,[ws]:Zo,[Xo]:Xo,[Jo]:qo,[$o]:$o,[Zo]:ws},Bn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let s=i[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},Zt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var $c=Math.PI/180,mr=180/Math.PI;function $i(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Zt[n&255]+Zt[n>>8&255]+Zt[n>>16&255]+Zt[n>>24&255]+"-"+Zt[e&255]+Zt[e>>8&255]+"-"+Zt[e>>16&15|64]+Zt[e>>24&255]+"-"+Zt[t&63|128]+Zt[t>>8&255]+"-"+Zt[t>>16&255]+Zt[t>>24&255]+Zt[i&255]+Zt[i>>8&255]+Zt[i>>16&255]+Zt[i>>24&255]).toLowerCase()}function et(n,e,t){return Math.max(e,Math.min(t,n))}function lm(n,e){return(n%e+e)%e}function jc(n,e,t){return(1-t)*n+t*e}function cf(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function ac(n){switch(n.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function lf(n,e){if(e.constructor===Float32Array)return n;let t=ac(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(n/t,-1)}function hf(n,e){if(e.constructor===Float32Array)return n;let t=ac(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(n*t)}var sh=class sh{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(et(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(et(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*i-o*s+e.x,this.y=r*s+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};sh.prototype.isVector2=!0;var ke=sh,zn=class{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,o,a){let c=i[s+0],l=i[s+1],h=i[s+2],u=i[s+3],d=r[o+0],p=r[o+1],x=r[o+2],_=r[o+3];if(u!==_||c!==d||l!==p||h!==x){let g=c*d+l*p+h*x+u*_;g<0&&(d=-d,p=-p,x=-x,_=-_,g=-g);let m=1-a;if(g<.9995){let S=Math.acos(g),E=Math.sin(S);m=Math.sin(m*S)/E,a=Math.sin(a*S)/E,c=c*m+d*a,l=l*m+p*a,h=h*m+x*a,u=u*m+_*a}else{c=c*m+d*a,l=l*m+p*a,h=h*m+x*a,u=u*m+_*a;let S=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=S,l*=S,h*=S,u*=S}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,s,r,o){let a=i[s],c=i[s+1],l=i[s+2],h=i[s+3],u=r[o],d=r[o+1],p=r[o+2],x=r[o+3];return e[t]=a*x+h*u+c*p-l*d,e[t+1]=c*x+h*d+l*u-a*p,e[t+2]=l*x+h*p+a*d-c*u,e[t+3]=h*x-a*u-c*d-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(i/2),h=a(s/2),u=a(r/2),d=c(i/2),p=c(s/2),x=c(r/2);switch(o){case"XYZ":this._x=d*h*u+l*p*x,this._y=l*p*u-d*h*x,this._z=l*h*x+d*p*u,this._w=l*h*u-d*p*x;break;case"YXZ":this._x=d*h*u+l*p*x,this._y=l*p*u-d*h*x,this._z=l*h*x-d*p*u,this._w=l*h*u+d*p*x;break;case"ZXY":this._x=d*h*u-l*p*x,this._y=l*p*u+d*h*x,this._z=l*h*x+d*p*u,this._w=l*h*u-d*p*x;break;case"ZYX":this._x=d*h*u-l*p*x,this._y=l*p*u+d*h*x,this._z=l*h*x-d*p*u,this._w=l*h*u+d*p*x;break;case"YZX":this._x=d*h*u+l*p*x,this._y=l*p*u+d*h*x,this._z=l*h*x-d*p*u,this._w=l*h*u-d*p*x;break;case"XZY":this._x=d*h*u-l*p*x,this._y=l*p*u-d*h*x,this._z=l*h*x+d*p*u,this._w=l*h*u+d*p*x;break;default:Oe("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=i+a+u;if(d>0){let p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-c)*p,this._y=(r-l)*p,this._z=(o-s)*p}else if(i>a&&i>u){let p=2*Math.sqrt(1+i-a-u);this._w=(h-c)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+l)/p}else if(a>u){let p=2*Math.sqrt(1+a-i-u);this._w=(r-l)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(c+h)/p}else{let p=2*Math.sqrt(1+u-i-a);this._w=(o-s)/p,this._x=(r+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(et(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=i*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-i*l,this._z=r*h+o*l+i*c-s*a,this._w=o*h-i*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,o=e._w,a=this.dot(e);a<0&&(i=-i,s=-s,r=-r,o=-o,a=-a);let c=1-t;if(a<.9995){let l=Math.acos(a),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+i*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+o*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+o*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},rh=class rh{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ku.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ku.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,i=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*i),h=2*(a*t-r*s),u=2*(r*i-o*t);return this.x=t+c*l+o*u-a*h,this.y=i+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this.z=et(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this.z=et(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(et(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-i*c,this.z=i*a-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Kc.copy(this).projectOnVector(e),this.sub(Kc)}reflect(e){return this.sub(Kc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(et(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};rh.prototype.isVector3=!0;var V=rh,Kc=new V,Ku=new zn,oh=class oh{constructor(e,t,i,s,r,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,c,l)}set(e,t,i,s,r,o,a,c,l){let h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=c,h[6]=i,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],h=i[4],u=i[7],d=i[2],p=i[5],x=i[8],_=s[0],g=s[3],m=s[6],S=s[1],E=s[4],M=s[7],A=s[2],w=s[5],y=s[8];return r[0]=o*_+a*S+c*A,r[3]=o*g+a*E+c*w,r[6]=o*m+a*M+c*y,r[1]=l*_+h*S+u*A,r[4]=l*g+h*E+u*w,r[7]=l*m+h*M+u*y,r[2]=d*_+p*S+x*A,r[5]=d*g+p*E+x*w,r[8]=d*m+p*M+x*y,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-i*r*h+i*a*c+s*r*l-s*o*c}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=h*o-a*l,d=a*c-h*r,p=l*r-o*c,x=t*u+i*d+s*p;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/x;return e[0]=u*_,e[1]=(s*l-h*i)*_,e[2]=(a*i-s*o)*_,e[3]=d*_,e[4]=(h*t-s*c)*_,e[5]=(s*r-a*t)*_,e[6]=p*_,e[7]=(i*c-l*t)*_,e[8]=(o*t-i*r)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return lr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Qc.makeScale(e,t)),this}rotate(e){return lr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Qc.makeRotation(-e)),this}translate(e,t){return lr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Qc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};oh.prototype.isMatrix3=!0;var ze=oh,Qc=new ze,Qu=new ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ed=new ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function hm(){let n={enabled:!0,workingColorSpace:ur,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===rt&&(s.r=si(s.r),s.g=si(s.g),s.b=si(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===rt&&(s.r=As(s.r),s.g=As(s.g),s.b=As(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===di?dr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[o].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[ur]:{primaries:e,whitePoint:i,transfer:dr,toXYZ:Qu,fromXYZ:ed,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Et},outputColorSpaceConfig:{drawingBufferColorSpace:Et}},[Et]:{primaries:e,whitePoint:i,transfer:rt,toXYZ:Qu,fromXYZ:ed,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Et}}}),n}var Qe=hm();function si(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function As(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var ls,Qo=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{ls===void 0&&(ls=fr("canvas")),ls.width=e.width,ls.height=e.height;let s=ls.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=ls}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=fr("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=si(r[o]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(si(t[i]/255)*255):t[i]=si(t[i]);return{data:t,width:e.width,height:e.height}}else return Oe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},um=0,Is=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:um++}),this.uuid=$i(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(el(s[o].image)):r.push(el(s[o]))}else r=el(s);i.url=r}return t||(e.images[this.uuid]=i),i}};function el(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Qo.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Oe("Texture: Unable to serialize Texture."),{})}var dm=0,tl=new V,sn=class n extends Bn{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=kn,s=kn,r=nn,o=hi,a=Dn,c=cn,l=n.DEFAULT_ANISOTROPY,h=di){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:dm++}),this.uuid=$i(),this.name="",this.source=new Is(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ke(0,0),this.repeat=new ke(1,1),this.center=new ke(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ze,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(tl).x}get height(){return this.source.getSize(tl).y}get depth(){return this.source.getSize(tl).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){Oe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Oe(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Gl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Cs:e.x=e.x-Math.floor(e.x);break;case kn:e.x=e.x<0?0:1;break;case jo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Cs:e.y=e.y-Math.floor(e.y);break;case kn:e.y=e.y<0?0:1;break;case jo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};sn.DEFAULT_IMAGE=null;sn.DEFAULT_MAPPING=Gl;sn.DEFAULT_ANISOTROPY=1;var ah=class ah{constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*i+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r,c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],p=c[5],x=c[9],_=c[2],g=c[6],m=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(x-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(x+g)<.1&&Math.abs(l+p+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let E=(l+1)/2,M=(p+1)/2,A=(m+1)/2,w=(h+d)/4,y=(u+_)/4,T=(x+g)/4;return E>M&&E>A?E<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(E),s=w/i,r=y/i):M>A?M<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),i=w/s,r=T/s):A<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),i=y/r,s=T/r),this.set(i,s,r,t),this}let S=Math.sqrt((g-x)*(g-x)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(S)<.001&&(S=1),this.x=(g-x)/S,this.y=(u-_)/S,this.z=(d-h)/S,this.w=Math.acos((l+p+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this.z=et(this.z,e.z,t.z),this.w=et(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this.z=et(this.z,e,t),this.w=et(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(et(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};ah.prototype.isVector4=!0;var yt=ah,ea=class extends Bn{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:nn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new yt(0,0,e,t),this.scissorTest=!1,this.viewport=new yt(0,0,e,t),this.textures=[];let s=i.count;for(let r=0;r<s;r++)this.textures[r]=new sn({width:e,height:t,depth:i.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:nn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Is(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},dn=class extends ea{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},gr=class extends sn{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Ht,this.minFilter=Ht,this.wrapR=kn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var ta=class extends sn{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Ht,this.minFilter=Ht,this.wrapR=kn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var ya=class ya{constructor(e,t,i,s,r,o,a,c,l,h,u,d,p,x,_,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,c,l,h,u,d,p,x,_,g)}set(e,t,i,s,r,o,a,c,l,h,u,d,p,x,_,g){let m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=s,m[1]=r,m[5]=o,m[9]=a,m[13]=c,m[2]=l,m[6]=h,m[10]=u,m[14]=d,m[3]=p,m[7]=x,m[11]=_,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ya().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,i=e.elements,s=1/hs.setFromMatrixColumn(e,0).length(),r=1/hs.setFromMatrixColumn(e,1).length(),o=1/hs.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,s=e.y,r=e.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let d=o*h,p=o*u,x=a*h,_=a*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=p+x*l,t[5]=d-_*l,t[9]=-a*c,t[2]=_-d*l,t[6]=x+p*l,t[10]=o*c}else if(e.order==="YXZ"){let d=c*h,p=c*u,x=l*h,_=l*u;t[0]=d+_*a,t[4]=x*a-p,t[8]=o*l,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=p*a-x,t[6]=_+d*a,t[10]=o*c}else if(e.order==="ZXY"){let d=c*h,p=c*u,x=l*h,_=l*u;t[0]=d-_*a,t[4]=-o*u,t[8]=x+p*a,t[1]=p+x*a,t[5]=o*h,t[9]=_-d*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let d=o*h,p=o*u,x=a*h,_=a*u;t[0]=c*h,t[4]=x*l-p,t[8]=d*l+_,t[1]=c*u,t[5]=_*l+d,t[9]=p*l-x,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let d=o*c,p=o*l,x=a*c,_=a*l;t[0]=c*h,t[4]=_-d*u,t[8]=x*u+p,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=p*u+x,t[10]=d-_*u}else if(e.order==="XZY"){let d=o*c,p=o*l,x=a*c,_=a*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+_,t[5]=o*h,t[9]=p*u-x,t[2]=x*u-p,t[6]=a*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(fm,e,pm)}lookAt(e,t,i){let s=this.elements;return hn.subVectors(e,t),hn.lengthSq()===0&&(hn.z=1),hn.normalize(),_i.crossVectors(i,hn),_i.lengthSq()===0&&(Math.abs(i.z)===1?hn.x+=1e-4:hn.z+=1e-4,hn.normalize(),_i.crossVectors(i,hn)),_i.normalize(),_o.crossVectors(hn,_i),s[0]=_i.x,s[4]=_o.x,s[8]=hn.x,s[1]=_i.y,s[5]=_o.y,s[9]=hn.y,s[2]=_i.z,s[6]=_o.z,s[10]=hn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],h=i[1],u=i[5],d=i[9],p=i[13],x=i[2],_=i[6],g=i[10],m=i[14],S=i[3],E=i[7],M=i[11],A=i[15],w=s[0],y=s[4],T=s[8],O=s[12],I=s[1],B=s[5],H=s[9],Z=s[13],D=s[2],$=s[6],R=s[10],P=s[14],U=s[3],k=s[7],G=s[11],ee=s[15];return r[0]=o*w+a*I+c*D+l*U,r[4]=o*y+a*B+c*$+l*k,r[8]=o*T+a*H+c*R+l*G,r[12]=o*O+a*Z+c*P+l*ee,r[1]=h*w+u*I+d*D+p*U,r[5]=h*y+u*B+d*$+p*k,r[9]=h*T+u*H+d*R+p*G,r[13]=h*O+u*Z+d*P+p*ee,r[2]=x*w+_*I+g*D+m*U,r[6]=x*y+_*B+g*$+m*k,r[10]=x*T+_*H+g*R+m*G,r[14]=x*O+_*Z+g*P+m*ee,r[3]=S*w+E*I+M*D+A*U,r[7]=S*y+E*B+M*$+A*k,r[11]=S*T+E*H+M*R+A*G,r[15]=S*O+E*Z+M*P+A*ee,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],p=e[14],x=e[3],_=e[7],g=e[11],m=e[15],S=c*p-l*d,E=a*p-l*u,M=a*d-c*u,A=o*p-l*h,w=o*d-c*h,y=o*u-a*h;return t*(_*S-g*E+m*M)-i*(x*S-g*A+m*w)+s*(x*E-_*A+m*y)-r*(x*M-_*w+g*y)}determinantAffine(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],o=e[5],a=e[9],c=e[2],l=e[6],h=e[10];return t*(o*h-a*l)-i*(r*h-a*c)+s*(r*l-o*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],p=e[11],x=e[12],_=e[13],g=e[14],m=e[15],S=t*a-i*o,E=t*c-s*o,M=t*l-r*o,A=i*c-s*a,w=i*l-r*a,y=s*l-r*c,T=h*_-u*x,O=h*g-d*x,I=h*m-p*x,B=u*g-d*_,H=u*m-p*_,Z=d*m-p*g,D=S*Z-E*H+M*B+A*I-w*O+y*T;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let $=1/D;return e[0]=(a*Z-c*H+l*B)*$,e[1]=(s*H-i*Z-r*B)*$,e[2]=(_*y-g*w+m*A)*$,e[3]=(d*w-u*y-p*A)*$,e[4]=(c*I-o*Z-l*O)*$,e[5]=(t*Z-s*I+r*O)*$,e[6]=(g*M-x*y-m*E)*$,e[7]=(h*y-d*M+p*E)*$,e[8]=(o*H-a*I+l*T)*$,e[9]=(i*I-t*H-r*T)*$,e[10]=(x*w-_*M+m*S)*$,e[11]=(u*M-h*w-p*S)*$,e[12]=(a*O-o*B-c*T)*$,e[13]=(t*B-i*O+s*T)*$,e[14]=(_*E-x*A-g*S)*$,e[15]=(h*A-u*E+d*S)*$,this}scale(e){let t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),s=Math.sin(t),r=1-i,o=e.x,a=e.y,c=e.z,l=r*o,h=r*a;return this.set(l*o+i,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+i,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,o){return this.set(1,i,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){let s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,h=o+o,u=a+a,d=r*l,p=r*h,x=r*u,_=o*h,g=o*u,m=a*u,S=c*l,E=c*h,M=c*u,A=i.x,w=i.y,y=i.z;return s[0]=(1-(_+m))*A,s[1]=(p+M)*A,s[2]=(x-E)*A,s[3]=0,s[4]=(p-M)*w,s[5]=(1-(d+m))*w,s[6]=(g+S)*w,s[7]=0,s[8]=(x+E)*y,s[9]=(g-S)*y,s[10]=(1-(d+_))*y,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let o=hs.set(s[0],s[1],s[2]).length(),a=hs.set(s[4],s[5],s[6]).length(),c=hs.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Tn.copy(this);let l=1/o,h=1/a,u=1/c;return Tn.elements[0]*=l,Tn.elements[1]*=l,Tn.elements[2]*=l,Tn.elements[4]*=h,Tn.elements[5]*=h,Tn.elements[6]*=h,Tn.elements[8]*=u,Tn.elements[9]*=u,Tn.elements[10]*=u,t.setFromRotationMatrix(Tn),i.x=o,i.y=a,i.z=c,this}makePerspective(e,t,i,s,r,o,a=Sn,c=!1){let l=this.elements,h=2*r/(t-e),u=2*r/(i-s),d=(t+e)/(t-e),p=(i+s)/(i-s),x,_;if(c)x=r/(o-r),_=o*r/(o-r);else if(a===Sn)x=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===Rs)x=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=x,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,s,r,o,a=Sn,c=!1){let l=this.elements,h=2/(t-e),u=2/(i-s),d=-(t+e)/(t-e),p=-(i+s)/(i-s),x,_;if(c)x=1/(o-r),_=o/(o-r);else if(a===Sn)x=-2/(o-r),_=-(o+r)/(o-r);else if(a===Rs)x=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=x,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};ya.prototype.isMatrix4=!0;var mt=ya,hs=new V,Tn=new mt,fm=new V(0,0,0),pm=new V(1,1,1),_i=new V,_o=new V,hn=new V,td=new mt,nd=new zn,oi=class n{constructor(e=0,t=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],d=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(et(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-et(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(et(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-et(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(et(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-et(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:Oe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return td.makeRotationFromQuaternion(e),this.setFromRotationMatrix(td,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return nd.setFromEuler(this),this.setFromQuaternion(nd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};oi.DEFAULT_ORDER="XYZ";var _r=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},mm=0,id=new V,us=new zn,Kn=new mt,xo=new V,nr=new V,gm=new V,_m=new zn,sd=new V(1,0,0),rd=new V(0,1,0),od=new V(0,0,1),ad={type:"added"},xm={type:"removed"},ds={type:"childadded",child:null},nl={type:"childremoved",child:null},Ct=class n extends Bn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:mm++}),this.uuid=$i(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new V,t=new oi,i=new zn,s=new V(1,1,1);function r(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new mt},normalMatrix:{value:new ze}}),this.matrix=new mt,this.matrixWorld=new mt,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new _r,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return us.setFromAxisAngle(e,t),this.quaternion.multiply(us),this}rotateOnWorldAxis(e,t){return us.setFromAxisAngle(e,t),this.quaternion.premultiply(us),this}rotateX(e){return this.rotateOnAxis(sd,e)}rotateY(e){return this.rotateOnAxis(rd,e)}rotateZ(e){return this.rotateOnAxis(od,e)}translateOnAxis(e,t){return id.copy(e).applyQuaternion(this.quaternion),this.position.add(id.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(sd,e)}translateY(e){return this.translateOnAxis(rd,e)}translateZ(e){return this.translateOnAxis(od,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Kn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?xo.copy(e):xo.set(e,t,i);let s=this.parent;this.updateWorldMatrix(!0,!1),nr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Kn.lookAt(nr,xo,this.up):Kn.lookAt(xo,nr,this.up),this.quaternion.setFromRotationMatrix(Kn),s&&(Kn.extractRotation(s.matrixWorld),us.setFromRotationMatrix(Kn),this.quaternion.premultiply(us.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Fe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ad),ds.child=e,this.dispatchEvent(ds),ds.child=null):Fe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(xm),nl.child=e,this.dispatchEvent(nl),nl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Kn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Kn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Kn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ad),ds.child=e,this.dispatchEvent(ds),ds.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){let o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(nr,e,gm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(nr,_m,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,i)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){let a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),p=o(e.animations),x=o(e.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),x.length>0&&(i.nodes=x)}return i.object=s,i;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let s=e.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Ct.DEFAULT_UP=new V(0,1,0);Ct.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ct.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var bn=class extends Ct{constructor(){super(),this.isGroup=!0,this.type="Group"}},ym={type:"move"},Ls=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new bn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new bn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new bn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let _ of e.hand.values()){let g=t.getJointPose(_,i),m=this._getHandJoint(l,_);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.quaternion,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,x=.005;l.inputState.pinching&&d>p+x?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=p-x&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.quaternion,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.quaternion,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(ym)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new bn;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},uf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},xi={h:0,s:0,l:0},yo={h:0,s:0,l:0};function il(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var We=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Et){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Qe.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=Qe.workingColorSpace){return this.r=e,this.g=t,this.b=i,Qe.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=Qe.workingColorSpace){if(e=lm(e,1),t=et(t,0,1),i=et(i,0,1),t===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+t):i+t-i*t,o=2*i-r;this.r=il(o,r,e+1/3),this.g=il(o,r,e),this.b=il(o,r,e-1/3)}return Qe.colorSpaceToWorking(this,s),this}setStyle(e,t=Et){function i(r){r!==void 0&&parseFloat(r)<1&&Oe("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,t);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Oe("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);Oe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Et){let i=uf[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Oe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=si(e.r),this.g=si(e.g),this.b=si(e.b),this}copyLinearToSRGB(e){return this.r=As(e.r),this.g=As(e.g),this.b=As(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Et){return Qe.workingToColorSpace(Jt.copy(this),e),Math.round(et(Jt.r*255,0,255))*65536+Math.round(et(Jt.g*255,0,255))*256+Math.round(et(Jt.b*255,0,255))}getHexString(e=Et){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Qe.workingColorSpace){Qe.workingToColorSpace(Jt.copy(this),t);let i=Jt.r,s=Jt.g,r=Jt.b,o=Math.max(i,s,r),a=Math.min(i,s,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case i:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-i)/u+2;break;case r:c=(i-s)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Qe.workingColorSpace){return Qe.workingToColorSpace(Jt.copy(this),t),e.r=Jt.r,e.g=Jt.g,e.b=Jt.b,e}getStyle(e=Et){Qe.workingToColorSpace(Jt.copy(this),e);let t=Jt.r,i=Jt.g,s=Jt.b;return e!==Et?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(xi),this.setHSL(xi.h+e,xi.s+t,xi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(xi),e.getHSL(yo);let i=jc(xi.h,yo.h,t),s=jc(xi.s,yo.s,t),r=jc(xi.l,yo.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Jt=new We;We.NAMES=uf;var xr=class n{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new We(e),this.density=t}clone(){return new n(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var yr=class extends Ct{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new oi,this.environmentIntensity=1,this.environmentRotation=new oi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},En=new V,Qn=new V,sl=new V,ei=new V,fs=new V,ps=new V,cd=new V,rl=new V,ol=new V,al=new V,cl=new yt,ll=new yt,hl=new yt,ii=class n{constructor(e=new V,t=new V,i=new V){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),En.subVectors(e,t),s.cross(En);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){En.subVectors(s,t),Qn.subVectors(i,t),sl.subVectors(e,t);let o=En.dot(En),a=En.dot(Qn),c=En.dot(sl),l=Qn.dot(Qn),h=Qn.dot(sl),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,p=(l*c-a*h)*d,x=(o*h-a*c)*d;return r.set(1-p-x,x,p)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,ei)===null?!1:ei.x>=0&&ei.y>=0&&ei.x+ei.y<=1}static getInterpolation(e,t,i,s,r,o,a,c){return this.getBarycoord(e,t,i,s,ei)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,ei.x),c.addScaledVector(o,ei.y),c.addScaledVector(a,ei.z),c)}static getInterpolatedAttribute(e,t,i,s,r,o){return cl.setScalar(0),ll.setScalar(0),hl.setScalar(0),cl.fromBufferAttribute(e,t),ll.fromBufferAttribute(e,i),hl.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(cl,r.x),o.addScaledVector(ll,r.y),o.addScaledVector(hl,r.z),o}static isFrontFacing(e,t,i,s){return En.subVectors(i,t),Qn.subVectors(e,t),En.cross(Qn).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return En.subVectors(this.c,this.b),Qn.subVectors(this.a,this.b),En.cross(Qn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return n.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,s=this.b,r=this.c,o,a;fs.subVectors(s,i),ps.subVectors(r,i),rl.subVectors(e,i);let c=fs.dot(rl),l=ps.dot(rl);if(c<=0&&l<=0)return t.copy(i);ol.subVectors(e,s);let h=fs.dot(ol),u=ps.dot(ol);if(h>=0&&u<=h)return t.copy(s);let d=c*u-h*l;if(d<=0&&c>=0&&h<=0&&c-h>0)return o=c/(c-h),t.copy(i).addScaledVector(fs,o);al.subVectors(e,r);let p=fs.dot(al),x=ps.dot(al);if(x>=0&&p<=x)return t.copy(r);let _=p*l-c*x;if(_<=0&&l>=0&&x<=0)return a=l/(l-x),t.copy(i).addScaledVector(ps,a);let g=h*x-p*u;if(g<=0&&u-h>=0&&p-x>=0)return cd.subVectors(r,s),a=(u-h)/(u-h+(p-x)),t.copy(s).addScaledVector(cd,a);let m=1/(g+_+d);return o=_*m,a=d*m,t.copy(i).addScaledVector(fs,o).addScaledVector(ps,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},bi=class{constructor(e=new V(1/0,1/0,1/0),t=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(An.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(An.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=An.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,An):An.fromBufferAttribute(r,o),An.applyMatrix4(e.matrixWorld),this.expandByPoint(An);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),vo.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),vo.copy(i.boundingBox)),vo.applyMatrix4(e.matrixWorld),this.union(vo)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,An),An.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ir),So.subVectors(this.max,ir),ms.subVectors(e.a,ir),gs.subVectors(e.b,ir),_s.subVectors(e.c,ir),yi.subVectors(gs,ms),vi.subVectors(_s,gs),ki.subVectors(ms,_s);let t=[0,-yi.z,yi.y,0,-vi.z,vi.y,0,-ki.z,ki.y,yi.z,0,-yi.x,vi.z,0,-vi.x,ki.z,0,-ki.x,-yi.y,yi.x,0,-vi.y,vi.x,0,-ki.y,ki.x,0];return!ul(t,ms,gs,_s,So)||(t=[1,0,0,0,1,0,0,0,1],!ul(t,ms,gs,_s,So))?!1:(bo.crossVectors(yi,vi),t=[bo.x,bo.y,bo.z],ul(t,ms,gs,_s,So))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,An).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(An).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ti[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ti[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ti[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ti[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ti[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ti[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ti[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ti[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ti),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},ti=[new V,new V,new V,new V,new V,new V,new V,new V],An=new V,vo=new bi,ms=new V,gs=new V,_s=new V,yi=new V,vi=new V,ki=new V,ir=new V,So=new V,bo=new V,Bi=new V;function ul(n,e,t,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){Bi.fromArray(n,r);let a=s.x*Math.abs(Bi.x)+s.y*Math.abs(Bi.y)+s.z*Math.abs(Bi.z),c=e.dot(Bi),l=t.dot(Bi),h=i.dot(Bi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var wt=new V,Mo=new ke,vm=0,Gt=class extends Bn{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:vm++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Kl,this.updateRanges=[],this.gpuType=In,this.version=0,this._normalizationScale=e!==void 0?ac(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Mo.fromBufferAttribute(this,t),Mo.applyMatrix3(e),this.setXY(t,Mo.x,Mo.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix3(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix4(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.applyNormalMatrix(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.transformDirection(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=this._denormalize(i)),i}setComponent(e,t,i){return this.normalized&&(i=this._normalize(i)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),i=this._normalize(i)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),i=this._normalize(i),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),i=this._normalize(i),s=this._normalize(s),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):lf(e,this.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):hf(e,this.array)}};var vr=class extends Gt{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var Sr=class extends Gt{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var lt=class extends Gt{constructor(e,t,i){super(new Float32Array(e),t,i)}},Sm=new bi,sr=new V,dl=new V,Hi=class{constructor(e=new V,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):Sm.setFromPoints(e).getCenter(i);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;sr.subVectors(e,this.center);let t=sr.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(sr,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(dl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(sr.copy(e.center).add(dl)),this.expandByPoint(sr.copy(e.center).sub(dl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},bm=0,vn=new mt,fl=new Ct,xs=new V,un=new bi,rr=new bi,zt=new V,Rt=class n extends Bn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:bm++}),this.uuid=$i(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(am(e)?Sr:vr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new ze().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return vn.makeRotationFromQuaternion(e),this.applyMatrix4(vn),this}rotateX(e){return vn.makeRotationX(e),this.applyMatrix4(vn),this}rotateY(e){return vn.makeRotationY(e),this.applyMatrix4(vn),this}rotateZ(e){return vn.makeRotationZ(e),this.applyMatrix4(vn),this}translate(e,t,i){return vn.makeTranslation(e,t,i),this.applyMatrix4(vn),this}scale(e,t,i){return vn.makeScale(e,t,i),this.applyMatrix4(vn),this}lookAt(e){return fl.lookAt(e),fl.updateMatrix(),this.applyMatrix4(fl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(xs).negate(),this.translate(xs.x,xs.y,xs.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new lt(i,3))}else{let i=Math.min(e.length,t.count);for(let s=0;s<i;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Oe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new bi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Fe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){let r=t[i];un.setFromBufferAttribute(r),this.morphTargetsRelative?(zt.addVectors(this.boundingBox.min,un.min),this.boundingBox.expandByPoint(zt),zt.addVectors(this.boundingBox.max,un.max),this.boundingBox.expandByPoint(zt)):(this.boundingBox.expandByPoint(un.min),this.boundingBox.expandByPoint(un.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Fe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Hi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Fe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(e){let i=this.boundingSphere.center;if(un.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];rr.setFromBufferAttribute(a),this.morphTargetsRelative?(zt.addVectors(un.min,rr.min),un.expandByPoint(zt),zt.addVectors(un.max,rr.max),un.expandByPoint(zt)):(un.expandByPoint(rr.min),un.expandByPoint(rr.max))}un.getCenter(i);let s=0;for(let r=0,o=e.count;r<o;r++)zt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(zt));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)zt.fromBufferAttribute(a,l),c&&(xs.fromBufferAttribute(e,l),zt.add(xs)),s=Math.max(s,i.distanceToSquared(zt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Fe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Fe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,s=t.normal,r=t.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==i.count)&&(o=new Gt(new Float32Array(4*i.count),4),this.setAttribute("tangent",o));let a=[],c=[],l=new Uint8Array(i.count);for(let O=0;O<i.count;O++)a[O]=new V,c[O]=new V;let h=new V,u=new V,d=new V,p=new ke,x=new ke,_=new ke,g=new V,m=new V;function S(O,I,B){l[O]=l[I]=l[B]=1,h.fromBufferAttribute(i,O),u.fromBufferAttribute(i,I),d.fromBufferAttribute(i,B),p.fromBufferAttribute(r,O),x.fromBufferAttribute(r,I),_.fromBufferAttribute(r,B),u.sub(h),d.sub(h),x.sub(p),_.sub(p);let H=1/(x.x*_.y-_.x*x.y);isFinite(H)&&(g.copy(u).multiplyScalar(_.y).addScaledVector(d,-x.y).multiplyScalar(H),m.copy(d).multiplyScalar(x.x).addScaledVector(u,-_.x).multiplyScalar(H),a[O].add(g),a[I].add(g),a[B].add(g),c[O].add(m),c[I].add(m),c[B].add(m))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let O=0,I=E.length;O<I;++O){let B=E[O],H=B.start,Z=B.count;for(let D=H,$=H+Z;D<$;D+=3)S(e.getX(D+0),e.getX(D+1),e.getX(D+2))}let M=new V,A=new V,w=new V,y=new V;function T(O){w.fromBufferAttribute(s,O),y.copy(w);let I=a[O];M.copy(I),M.sub(w.multiplyScalar(w.dot(I))).normalize(),A.crossVectors(y,I);let H=A.dot(c[O])<0?-1:1;o.setXYZW(O,M.x,M.y,M.z,H)}for(let O=0,I=i.count;O<I;++O)l[O]&&T(O);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Gt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);let s=new V,r=new V,o=new V,a=new V,c=new V,l=new V,h=new V,u=new V;if(e)for(let d=0,p=e.count;d<p;d+=3){let x=e.getX(d+0),_=e.getX(d+1),g=e.getX(d+2);s.fromBufferAttribute(t,x),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,g),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(i,x),c.fromBufferAttribute(i,_),l.fromBufferAttribute(i,g),a.add(h),c.add(h),l.add(h),i.setXYZ(x,a.x,a.y,a.z),i.setXYZ(_,c.x,c.y,c.z),i.setXYZ(g,l.x,l.y,l.z)}else for(let d=0,p=t.count;d<p;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)zt.fromBufferAttribute(e,t),zt.normalize(),e.setXYZ(t,zt.x,zt.y,zt.z)}toNonIndexed(){function e(a,c){let l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h),p=0,x=0;for(let _=0,g=c.length;_<g;_++){a.isInterleavedBufferAttribute?p=c[_]*a.data.stride+a.offset:p=c[_]*h;for(let m=0;m<h;m++)d[x++]=l[p++]}return new Gt(d,h,u)}if(this.index===null)return Oe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=e(c,i);t.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){let d=l[h],p=e(d,i);c.push(p)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let c in i){let l=i[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){let p=l[u];h.push(p.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let s=e.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],u=r[l];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,h=o.length;l<h;l++){let u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},br=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Kl,this.updateRanges=[],this.version=0,this.uuid=$i()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=ld(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=this.array.slice(0).buffer);let i=new this.array.constructor(e.arrayBuffers[t]),s=new this.constructor(i,this.stride);return s.setUsage(this.usage),s}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=ld(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=Array.from(new Uint32Array(this.array.slice(0).buffer)));let i={uuid:this.uuid,buffer:t,type:this.array.constructor.name,stride:this.stride};return i.usage=this.usage,i}};function ld(n){return n.buffer._uuid===void 0&&(n.buffer._uuid=$i()),n.byteOffset===0&&n.byteLength===n.buffer.byteLength?n.buffer._uuid:n.buffer._uuid+":"+n.byteOffset+":"+n.byteLength}var tn=new V,Ds=class n{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s,this._normalizationScale=e!==void 0?ac(e.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)tn.fromBufferAttribute(this,t),tn.applyMatrix4(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)tn.fromBufferAttribute(this,t),tn.applyNormalMatrix(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)tn.fromBufferAttribute(this,t),tn.transformDirection(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=this._denormalize(i)),i}setComponent(e,t,i){return this.normalized&&(i=this._normalize(i)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=this._denormalize(t)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=this._denormalize(t)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=this._denormalize(t)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=this._denormalize(t)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),i=this._normalize(i)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),i=this._normalize(i),s=this._normalize(s)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),i=this._normalize(i),s=this._normalize(s),r=this._normalize(r)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){pr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Gt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new n(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){pr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):lf(e,this.data.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):hf(e,this.data.array)}},pl=new V,Mm=new V,Tm=new ze,wn=class{constructor(e=new V(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let s=pl.subVectors(i,t).cross(Mm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let s=e.delta(pl),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(s,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||Tm.getNormalMatrix(e),s=this.coplanarPoint(pl).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Em=0,Gn=class extends Bn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Em++}),this.uuid=$i(),this.name="",this.type="Material",this.blending=Bs,this.side=Ri,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ll,this.blendDst=Dl,this.blendEquation=Yi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new We(0,0,0),this.blendAlpha=0,this.depthFunc=ws,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=jd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Vo,this.stencilZFail=Vo,this.stencilZPass=Vo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){Oe(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Oe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(i.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(i.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(i.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(i.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new We().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new wn().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new ke().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ke().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},ai=class extends Gn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new We(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},ys,or=new V,vs=new V,Ss=new V,bs=new ke,ar=new ke,df=new mt,To=new V,cr=new V,Eo=new V,hd=new ke,ml=new ke,ud=new ke,Mi=class extends Ct{constructor(e=new ai){if(super(),this.isSprite=!0,this.type="Sprite",ys===void 0){ys=new Rt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new br(t,5);ys.setIndex([0,1,2,0,2,3]),ys.setAttribute("position",new Ds(i,3,0,!1)),ys.setAttribute("uv",new Ds(i,2,3,!1))}this.geometry=ys,this.material=e,this.center=new ke(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&Fe('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),vs.setFromMatrixScale(this.matrixWorld),df.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ss.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&vs.multiplyScalar(-Ss.z);let i=this.material.rotation,s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));let o=this.center;Ao(To.set(-.5,-.5,0),Ss,o,vs,s,r),Ao(cr.set(.5,-.5,0),Ss,o,vs,s,r),Ao(Eo.set(.5,.5,0),Ss,o,vs,s,r),hd.set(0,0),ml.set(1,0),ud.set(1,1);let a=e.ray.intersectTriangle(To,cr,Eo,!1,or);if(a===null&&(Ao(cr.set(-.5,.5,0),Ss,o,vs,s,r),ml.set(0,1),a=e.ray.intersectTriangle(To,Eo,cr,!1,or),a===null))return;let c=e.ray.origin.distanceTo(or);c<e.near||c>e.far||t.push({distance:c,point:or.clone(),uv:ii.getInterpolation(or,To,cr,Eo,hd,ml,ud,new ke),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}toJSON(e){let t=super.toJSON(e);return t.object.center=this.center.toArray(),t}};function Ao(n,e,t,i,s,r){bs.subVectors(n,t).addScalar(.5).multiply(i),s!==void 0?(ar.x=r*bs.x-s*bs.y,ar.y=s*bs.x+r*bs.y):ar.copy(bs),n.copy(e),n.x+=ar.x,n.y+=ar.y,n.applyMatrix4(df)}var ni=new V,gl=new V,wo=new V,Co=new V,Mr=class{constructor(e=new V,t=new V(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ni)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ni.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ni.copy(this.origin).addScaledVector(this.direction,t),ni.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){gl.copy(e).add(t).multiplyScalar(.5),wo.copy(t).sub(e).normalize(),Co.copy(this.origin).sub(gl);let r=e.distanceTo(t)*.5,o=-this.direction.dot(wo),a=Co.dot(this.direction),c=-Co.dot(wo),l=Co.lengthSq(),h=Math.abs(1-o*o),u,d,p,x;if(h>0)if(u=o*c-a,d=o*a-c,x=r*h,u>=0)if(d>=-x)if(d<=x){let _=1/h;u*=_,d*=_,p=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*c)+l;else d<=-x?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-c),r),p=-u*u+d*(d+2*c)+l):d<=x?(u=0,d=Math.min(Math.max(-r,-c),r),p=d*(d+2*c)+l):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-c),r),p=-u*u+d*(d+2*c)+l);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(gl).addScaledVector(wo,d),p}intersectSphere(e,t){if(e.radius<0)return null;ni.subVectors(e.center,this.origin);let i=ni.dot(this.direction),s=ni.dot(ni)-i*i,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(i=(e.min.x-d.x)*l,s=(e.max.x-d.x)*l):(i=(e.max.x-d.x)*l,s=(e.min.x-d.x)*l),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),i>c||a>s)||((a>i||i!==i)&&(i=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,ni)!==null}intersectTriangle(e,t,i,s,r){let o=this.origin,a=this.direction,c=a.x,l=a.y,h=a.z,u=e.x-o.x,d=e.y-o.y,p=e.z-o.z,x=t.x-o.x,_=t.y-o.y,g=t.z-o.z,m=i.x-o.x,S=i.y-o.y,E=i.z-o.z,M=Math.abs(c),A=Math.abs(l),w=Math.abs(h),y,T,O,I,B,H,Z,D,$,R,P,U;if(M>=A&&M>=w?(O=c,H=u,$=x,U=m,c>=0?(y=l,T=h,I=d,B=p,Z=_,D=g,R=S,P=E):(y=h,T=l,I=p,B=d,Z=g,D=_,R=E,P=S)):A>=w?(O=l,H=d,$=_,U=S,l>=0?(y=h,T=c,I=p,B=u,Z=g,D=x,R=E,P=m):(y=c,T=h,I=u,B=p,Z=x,D=g,R=m,P=E)):(O=h,H=p,$=g,U=E,h>=0?(y=c,T=l,I=u,B=d,Z=x,D=_,R=m,P=S):(y=l,T=c,I=d,B=u,Z=_,D=x,R=S,P=m)),O===0)return null;let k=y/O,G=T/O,ee=1/O,ae=I-k*H,Ee=B-G*H,j=Z-k*$,ce=D-G*$,ye=R-k*U,Me=P-G*U,he=ye*ce-Me*j,Be=ae*Me-Ee*ye,st=j*Ee-ce*ae;if(s){if(he<0||Be<0||st<0)return null}else if((he<0||Be<0||st<0)&&(he>0||Be>0||st>0))return null;let Ue=he+Be+st;if(Ue===0)return null;let at=ee*(he*H+Be*$+st*U);return(Ue>0?at<0:at>0)?null:this.at(at/Ue,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},$t=class extends Gn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new We(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new oi,this.combine=va,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},dd=new mt,zi=new Mr,Ro=new Hi,fd=new V,Po=new V,Io=new V,Lo=new V,_l=new V,Do=new V,pd=new V,No=new V,ot=class extends Ct{constructor(e=new Rt,t=new $t){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(s,e);let a=this.morphTargetInfluences;if(r&&a){Do.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],u=r[c];h!==0&&(_l.fromBufferAttribute(u,e),o?Do.addScaledVector(_l,h):Do.addScaledVector(_l.sub(t),h))}t.add(Do)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ro.copy(i.boundingSphere),Ro.applyMatrix4(r),zi.copy(e.ray).recast(e.near),!(Ro.containsPoint(zi.origin)===!1&&(zi.intersectSphere(Ro,fd)===null||zi.origin.distanceToSquared(fd)>(e.far-e.near)**2))&&(dd.copy(r).invert(),zi.copy(e.ray).applyMatrix4(dd),!(i.boundingBox!==null&&zi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,zi)))}_computeIntersections(e,t,i){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let x=0,_=d.length;x<_;x++){let g=d[x],m=o[g.materialIndex],S=Math.max(g.start,p.start),E=Math.min(a.count,Math.min(g.start+g.count,p.start+p.count));for(let M=S,A=E;M<A;M+=3){let w=a.getX(M),y=a.getX(M+1),T=a.getX(M+2);s=Uo(this,m,e,i,l,h,u,w,y,T),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let x=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let g=x,m=_;g<m;g+=3){let S=a.getX(g),E=a.getX(g+1),M=a.getX(g+2);s=Uo(this,o,e,i,l,h,u,S,E,M),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let x=0,_=d.length;x<_;x++){let g=d[x],m=o[g.materialIndex],S=Math.max(g.start,p.start),E=Math.min(c.count,Math.min(g.start+g.count,p.start+p.count));for(let M=S,A=E;M<A;M+=3){let w=M,y=M+1,T=M+2;s=Uo(this,m,e,i,l,h,u,w,y,T),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let x=Math.max(0,p.start),_=Math.min(c.count,p.start+p.count);for(let g=x,m=_;g<m;g+=3){let S=g,E=g+1,M=g+2;s=Uo(this,o,e,i,l,h,u,S,E,M),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}};function Am(n,e,t,i,s,r,o,a){let c;if(e.side===rn?c=i.intersectTriangle(o,r,s,!0,a):c=i.intersectTriangle(s,r,o,e.side===Ri,a),c===null)return null;No.copy(a),No.applyMatrix4(n.matrixWorld);let l=t.ray.origin.distanceTo(No);return l<t.near||l>t.far?null:{distance:l,point:No.clone(),object:n}}function Uo(n,e,t,i,s,r,o,a,c,l){n.getVertexPosition(a,Po),n.getVertexPosition(c,Io),n.getVertexPosition(l,Lo);let h=Am(n,e,t,i,Po,Io,Lo,pd);if(h){let u=new V;ii.getBarycoord(pd,Po,Io,Lo,u),s&&(h.uv=ii.getInterpolatedAttribute(s,a,c,l,u,new ke)),r&&(h.uv1=ii.getInterpolatedAttribute(r,a,c,l,u,new ke)),o&&(h.normal=ii.getInterpolatedAttribute(o,a,c,l,u,new V),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:c,c:l,normal:new V,materialIndex:0};ii.getNormal(Po,Io,Lo,d.normal),h.face=d,h.barycoord=u}return h}var na=class extends sn{constructor(e=null,t=1,i=1,s,r,o,a,c,l=Ht,h=Ht,u,d){super(null,o,a,c,l,h,s,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Gi=new Hi,wm=new ke(.5,.5),Oo=new V,Ti=class{constructor(e=new wn,t=new wn,i=new wn,s=new wn,r=new wn,o=new wn){this.planes=[e,t,i,s,r,o]}set(e,t,i,s,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Sn,i=!1){let s=this.planes,r=e.elements,o=r[0],a=r[1],c=r[2],l=r[3],h=r[4],u=r[5],d=r[6],p=r[7],x=r[8],_=r[9],g=r[10],m=r[11],S=r[12],E=r[13],M=r[14],A=r[15];if(s[0].setComponents(l-o,p-h,m-x,A-S).normalize(),s[1].setComponents(l+o,p+h,m+x,A+S).normalize(),s[2].setComponents(l+a,p+u,m+_,A+E).normalize(),s[3].setComponents(l-a,p-u,m-_,A-E).normalize(),i)s[4].setComponents(c,d,g,M).normalize(),s[5].setComponents(l-c,p-d,m-g,A-M).normalize();else if(s[4].setComponents(l-c,p-d,m-g,A-M).normalize(),t===Sn)s[5].setComponents(l+c,p+d,m+g,A+M).normalize();else if(t===Rs)s[5].setComponents(c,d,g,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Gi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Gi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Gi)}intersectsSprite(e){Gi.center.set(0,0,0);let t=wm.distanceTo(e.center);return Gi.radius=.7071067811865476+t,Gi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Gi)}intersectsSphere(e){let t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let s=t[i];if(Oo.x=s.normal.x>0?e.max.x:e.min.x,Oo.y=s.normal.y>0?e.max.y:e.min.y,Oo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Oo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},md=new mt,ia=class n{constructor(){this.coordinateSystem=Sn,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,i=this._frustums;for(let s=0;s<t.length;s++){let r=t[s];md.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),i[s]===void 0&&(i[s]=new Ti),i[s].setFromProjectionMatrix(md,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,i=e._frustums;for(let s=0;s<e._count;s++)t[s]===void 0&&(t[s]=new Ti),t[s].copy(i[s]);return this._count=e._count,this}clone(){return new n().copy(this)}};var Vi=class extends Gn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new We(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},gd=new mt,Ml=new Mr,Fo=new Hi,ko=new V,Ns=class extends Ct{constructor(e=new Rt,t=new Vi){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Fo.copy(i.boundingSphere),Fo.applyMatrix4(s),Fo.radius+=r,e.ray.intersectsSphere(Fo)===!1)return;gd.copy(s).invert(),Ml.copy(e.ray).applyMatrix4(gd);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=i.index,u=i.attributes.position;if(l!==null){let d=Math.max(0,o.start),p=Math.min(l.count,o.start+o.count);for(let x=d,_=p;x<_;x++){let g=l.getX(x);ko.fromBufferAttribute(u,g),_d(ko,g,c,s,e,t,this)}}else{let d=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let x=d,_=p;x<_;x++)ko.fromBufferAttribute(u,x),_d(ko,x,c,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function _d(n,e,t,i,s,r,o){let a=Ml.distanceSqToPoint(n);if(a<t){let c=new V;Ml.closestPointToPoint(n,c),c.applyMatrix4(i);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var Tr=class extends sn{constructor(e=[],t=Zi,i,s,r,o,a,c,l,h){super(e,t,i,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Cn=class extends sn{constructor(e,t,i,s,r,o,a,c,l){super(e,t,i,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var ci=class extends sn{constructor(e,t,i=Pn,s,r,o,a=Ht,c=Ht,l,h=ri,u=1){if(h!==ri&&h!==ui)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:u};super(d,s,r,o,a,c,h,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Is(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Er=class extends ci{constructor(e,t=Pn,i=Zi,s,r,o=Ht,a=Ht,c,l=ri){let h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,i,s,r,o,a,c,l),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Ar=class extends sn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},fn=class n extends Rt{constructor(e=1,t=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],u=[],d=0,p=0;x("z","y","x",-1,-1,i,t,e,o,r,0),x("z","y","x",1,-1,i,t,-e,o,r,1),x("x","z","y",1,1,e,i,t,s,o,2),x("x","z","y",1,-1,e,i,-t,s,o,3),x("x","y","z",1,-1,e,t,i,s,r,4),x("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new lt(l,3)),this.setAttribute("normal",new lt(h,3)),this.setAttribute("uv",new lt(u,2));function x(_,g,m,S,E,M,A,w,y,T,O){let I=M/y,B=A/T,H=M/2,Z=A/2,D=w/2,$=y+1,R=T+1,P=0,U=0,k=new V;for(let G=0;G<R;G++){let ee=G*B-Z;for(let ae=0;ae<$;ae++){let Ee=ae*I-H;k[_]=Ee*S,k[g]=ee*E,k[m]=D,l.push(k.x,k.y,k.z),k[_]=0,k[g]=0,k[m]=w>0?1:-1,h.push(k.x,k.y,k.z),u.push(ae/y),u.push(1-G/T),P+=1}}for(let G=0;G<T;G++)for(let ee=0;ee<y;ee++){let ae=d+ee+$*G,Ee=d+ee+$*(G+1),j=d+(ee+1)+$*(G+1),ce=d+(ee+1)+$*G;c.push(ae,Ee,ce),c.push(Ee,j,ce),U+=6}a.addGroup(p,U,O),p+=U,d+=P}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}},Hn=class n extends Rt{constructor(e=1,t=1,i=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:i,radialSegments:s,heightSegments:r},t=Math.max(0,t),i=Math.max(1,Math.floor(i)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));let o=[],a=[],c=[],l=[],h=t/2,u=Math.PI/2*e,d=t,p=2*u+d,x=i*2+r,_=s+1,g=new V,m=new V;for(let S=0;S<=x;S++){let E=0,M=0,A=0,w=0;if(S<=i){let O=S/i,I=O*Math.PI/2;M=-h-e*Math.cos(I),A=e*Math.sin(I),w=-e*Math.cos(I),E=O*u}else if(S<=i+r){let O=(S-i)/r;M=-h+O*t,A=e,w=0,E=u+O*d}else{let O=(S-i-r)/i,I=O*Math.PI/2;M=h+e*Math.sin(I),A=e*Math.cos(I),w=e*Math.sin(I),E=u+d+O*u}let y=Math.max(0,Math.min(1,E/p)),T=0;S===0?T=.5/s:S===x&&(T=-.5/s);for(let O=0;O<=s;O++){let I=O/s,B=I*Math.PI*2,H=Math.sin(B),Z=Math.cos(B);m.x=-A*Z,m.y=M,m.z=A*H,a.push(m.x,m.y,m.z),g.set(-A*Z,w,A*H),g.normalize(),c.push(g.x,g.y,g.z),l.push(I+T,y)}if(S>0){let O=(S-1)*_;for(let I=0;I<s;I++){let B=O+I,H=O+I+1,Z=S*_+I,D=S*_+I+1;o.push(B,H,Z),o.push(H,D,Z)}}}this.setIndex(o),this.setAttribute("position",new lt(a,3)),this.setAttribute("normal",new lt(c,3)),this.setAttribute("uv",new lt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},wr=class n extends Rt{constructor(e=1,t=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:s},t=Math.max(3,t);let r=[],o=[],a=[],c=[],l=new V,h=new ke;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){let p=i+u/t*s;l.x=e*Math.cos(p),l.y=e*Math.sin(p),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[d]/e+1)/2,h.y=(o[d+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new lt(o,3)),this.setAttribute("normal",new lt(a,3)),this.setAttribute("uv",new lt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Vn=class n extends Rt{constructor(e=1,t=1,i=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],d=[],p=[],x=0,_=[],g=i/2,m=0;S(),o===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new lt(u,3)),this.setAttribute("normal",new lt(d,3)),this.setAttribute("uv",new lt(p,2));function S(){let M=new V,A=new V,w=0,y=(t-e)/i;for(let T=0;T<=r;T++){let O=[],I=T/r,B=I*(t-e)+e;for(let H=0;H<=s;H++){let Z=H/s,D=Z*c+a,$=Math.sin(D),R=Math.cos(D);A.x=B*$,A.y=-I*i+g,A.z=B*R,u.push(A.x,A.y,A.z),M.set($,y,R).normalize(),d.push(M.x,M.y,M.z),p.push(Z,1-I),O.push(x++)}_.push(O)}for(let T=0;T<s;T++)for(let O=0;O<r;O++){let I=_[O][T],B=_[O+1][T],H=_[O+1][T+1],Z=_[O][T+1];(e>0||O!==0)&&(h.push(I,B,Z),w+=3),(t>0||O!==r-1)&&(h.push(B,H,Z),w+=3)}l.addGroup(m,w,0),m+=w}function E(M){let A=x,w=new ke,y=new V,T=0,O=M===!0?e:t,I=M===!0?1:-1;for(let H=1;H<=s;H++)u.push(0,g*I,0),d.push(0,I,0),p.push(.5,.5),x++;let B=x;for(let H=0;H<=s;H++){let D=H/s*c+a,$=Math.cos(D),R=Math.sin(D);y.x=O*R,y.y=g*I,y.z=O*$,u.push(y.x,y.y,y.z),d.push(0,I,0),w.x=$*.5+.5,w.y=R*.5*I+.5,p.push(w.x,w.y),x++}for(let H=0;H<s;H++){let Z=A+H,D=B+H;M===!0?h.push(D,D+1,Z):h.push(D+1,D,Z),T+=3}l.addGroup(m,T,M===!0?1:2),m+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Cr=class n extends Vn{constructor(e=1,t=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,i,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new n(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},sa=class n extends Rt{constructor(e=[],t=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:s};let r=[],o=[];a(s),l(i),h(),this.setAttribute("position",new lt(r,3)),this.setAttribute("normal",new lt(r.slice(),3)),this.setAttribute("uv",new lt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(S){let E=new V,M=new V,A=new V;for(let w=0;w<t.length;w+=3)p(t[w+0],E),p(t[w+1],M),p(t[w+2],A),c(E,M,A,S)}function c(S,E,M,A){let w=A+1,y=[];for(let T=0;T<=w;T++){y[T]=[];let O=S.clone().lerp(M,T/w),I=E.clone().lerp(M,T/w),B=w-T;for(let H=0;H<=B;H++)H===0&&T===w?y[T][H]=O:y[T][H]=O.clone().lerp(I,H/B)}for(let T=0;T<w;T++)for(let O=0;O<2*(w-T)-1;O++){let I=Math.floor(O/2);O%2===0?(d(y[T][I+1]),d(y[T+1][I]),d(y[T][I])):(d(y[T][I+1]),d(y[T+1][I+1]),d(y[T+1][I]))}}function l(S){let E=new V;for(let M=0;M<r.length;M+=3)E.x=r[M+0],E.y=r[M+1],E.z=r[M+2],E.normalize().multiplyScalar(S),r[M+0]=E.x,r[M+1]=E.y,r[M+2]=E.z}function h(){let S=new V;for(let E=0;E<r.length;E+=3){S.x=r[E+0],S.y=r[E+1],S.z=r[E+2];let M=g(S)/2/Math.PI+.5,A=m(S)/Math.PI+.5;o.push(M,1-A)}x(),u()}function u(){for(let S=0;S<o.length;S+=6){let E=o[S+0],M=o[S+2],A=o[S+4],w=Math.max(E,M,A),y=Math.min(E,M,A);w>.9&&y<.1&&(E<.2&&(o[S+0]+=1),M<.2&&(o[S+2]+=1),A<.2&&(o[S+4]+=1))}}function d(S){r.push(S.x,S.y,S.z)}function p(S,E){let M=S*3;E.x=e[M+0],E.y=e[M+1],E.z=e[M+2]}function x(){let S=new V,E=new V,M=new V,A=new V,w=new ke,y=new ke,T=new ke;for(let O=0,I=0;O<r.length;O+=9,I+=6){S.set(r[O+0],r[O+1],r[O+2]),E.set(r[O+3],r[O+4],r[O+5]),M.set(r[O+6],r[O+7],r[O+8]),w.set(o[I+0],o[I+1]),y.set(o[I+2],o[I+3]),T.set(o[I+4],o[I+5]),A.copy(S).add(E).add(M).divideScalar(3);let B=g(A);_(w,I+0,S,B),_(y,I+2,E,B),_(T,I+4,M,B)}}function _(S,E,M,A){A<0&&S.x===1&&(o[E]=S.x-1),M.x===0&&M.z===0&&(o[E]=A/2/Math.PI+.5)}function g(S){return Math.atan2(S.z,-S.x)}function m(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.vertices,e.indices,e.radius,e.detail)}};var Rr=class n extends sa{constructor(e=1,t=0){let i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new n(e.radius,e.detail)}},Ei=class n extends Rt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};let r=e/2,o=t/2,a=Math.floor(i),c=Math.floor(s),l=a+1,h=c+1,u=e/a,d=t/c,p=[],x=[],_=[],g=[];for(let m=0;m<h;m++){let S=m*d-o;for(let E=0;E<l;E++){let M=E*u-r;x.push(M,-S,0),_.push(0,0,1),g.push(E/a),g.push(1-m/c)}}for(let m=0;m<c;m++)for(let S=0;S<a;S++){let E=S+l*m,M=S+l*(m+1),A=S+1+l*(m+1),w=S+1+l*m;p.push(E,M,w),p.push(M,A,w)}this.setIndex(p),this.setAttribute("position",new lt(x,3)),this.setAttribute("normal",new lt(_,3)),this.setAttribute("uv",new lt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}};var li=class n extends Rt{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let c=Math.min(o+a,Math.PI),l=0,h=[],u=new V,d=new V,p=[],x=[],_=[],g=[];for(let m=0;m<=i;m++){let S=[],E=m/i,M=o+E*a,A=e*Math.cos(M),w=Math.sqrt(e*e-A*A),y=0;m===0&&o===0?y=.5/t:m===i&&c===Math.PI&&(y=-.5/t);for(let T=0;T<=t;T++){let O=T/t,I=s+O*r;u.x=-w*Math.cos(I),u.y=A,u.z=w*Math.sin(I),x.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),g.push(O+y,1-E),S.push(l++)}h.push(S)}for(let m=0;m<i;m++)for(let S=0;S<t;S++){let E=h[m][S+1],M=h[m][S],A=h[m+1][S],w=h[m+1][S+1];(m!==0||o>0)&&p.push(E,M,w),(m!==i-1||c<Math.PI)&&p.push(M,A,w)}this.setIndex(p),this.setAttribute("position",new lt(x,3)),this.setAttribute("normal",new lt(_,3)),this.setAttribute("uv",new lt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};function ji(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let s=n[t][i];if(xd(s))s.isRenderTargetTexture?(Oe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(xd(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function jt(n){let e={};for(let t=0;t<n.length;t++){let i=ji(n[t]);for(let s in i)e[s]=i[s]}return e}function xd(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Cm(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function eh(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Qe.workingColorSpace}var ff={clone:ji,merge:jt},Rm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Pm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Wn=class extends Gn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Rm,this.fragmentShader=Pm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ji(e.uniforms),this.uniformsGroups=Cm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let i in e.uniforms){let s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new We().setHex(s.value);break;case"v2":this.uniforms[i].value=new ke().fromArray(s.value);break;case"v3":this.uniforms[i].value=new V().fromArray(s.value);break;case"v4":this.uniforms[i].value=new yt().fromArray(s.value);break;case"m3":this.uniforms[i].value=new ze().fromArray(s.value);break;case"m4":this.uniforms[i].value=new mt().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},ra=class extends Wn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var Rn=class extends Gn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new We(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new We(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=oc,this.normalScale=new ke(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new oi,this.combine=va,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},oa=class extends Gn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Jd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},aa=class extends Gn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Ms(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function Bo(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}var Ai=class{constructor(e,t,i,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,s=t[i],r=t[i-1];n:{e:{let o;t:{i:if(!(e<s)){for(let a=i+2;;){if(s===void 0){if(e<r)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(r=s,s=t[++i],e<s)break e}o=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(i=2,r=a);for(let c=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(s=r,r=t[--i-1],e>=r)break e}o=i,i=0;break t}break n}for(;i<o;){let a=i+o>>>1;e<t[a]?o=a:i=a+1}if(s=t[i],r=t[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=i[r+o];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},ca=class extends Ai{constructor(e,t,i,s){super(e,t,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:vl,endingEnd:vl}}intervalChanged_(e,t,i){let s=this.parameterPositions,r=e-2,o=e+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Sl:r=e,a=2*t-i;break;case bl:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=i}if(c===void 0)switch(this.getSettings_().endingEnd){case Sl:o=e,c=2*i-t;break;case bl:o=1,c=i+s[1]-s[0];break;default:o=e-1,c=t}let l=(i-t)*.5,h=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-i),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,p=this._weightNext,x=(i-t)/(s-t),_=x*x,g=_*x,m=-d*g+2*d*_-d*x,S=(1+d)*g+(-1.5-2*d)*_+(-.5+d)*x+1,E=(-1-p)*g+(1.5+p)*_+.5*x,M=p*g-p*_;for(let A=0;A!==a;++A)r[A]=m*o[h+A]+S*o[l+A]+E*o[c+A]+M*o[u+A];return r}},la=class extends Ai{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=(i-t)/(s-t),u=1-h;for(let d=0;d!==a;++d)r[d]=o[l+d]*u+o[c+d]*h;return r}},ha=class extends Ai{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e){return this.copySampleValue_(e-1)}},ua=class extends Ai{interpolate_(e,t,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this.inTangents,u=this.outTangents;if(!h||!u){let x=(i-t)/(s-t),_=1-x;for(let g=0;g!==a;++g)r[g]=o[l+g]*_+o[c+g]*x;return r}let d=a*2,p=e-1;for(let x=0;x!==a;++x){let _=o[l+x],g=o[c+x],m=p*d+x*2,S=u[m],E=u[m+1],M=e*d+x*2,A=h[M],w=h[M+1],y=Lm(i,t,S,A,s);r[x]=pf(y,_,E,w,g)}return r}};function pf(n,e,t,i,s){let r=1-n;return r*r*r*e+3*r*r*n*t+3*r*n*n*i+n*n*n*s}function Im(n,e,t,i,s){let r=1-n;return 3*r*r*(t-e)+6*r*n*(i-t)+3*n*n*(s-i)}function Lm(n,e,t,i,s){let r=(n-e)/(s-e);for(let o=0;o<8;o++){let a=pf(r,e,t,i,s)-n;if(Math.abs(a)<1e-10)break;let c=Im(r,e,t,i,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-a/c))}return r}var pn=class{constructor(e,t,i,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ms(t,this.TimeBufferType),this.values=Ms(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:Ms(e.times,Array),values:Ms(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(i.interpolation=s),Bo(e.settings)&&(i.settings={inTangents:Ms(e.settings.inTangents,Array),outTangents:Ms(e.settings.outTangents,Array)})}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new ha(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new la(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ca(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new ua(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case hr:t=this.InterpolantFactoryMethodDiscrete;break;case Ko:t=this.InterpolantFactoryMethodLinear;break;case Ho:t=this.InterpolantFactoryMethodSmooth;break;case yl:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Oe("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return hr;case this.InterpolantFactoryMethodLinear:return Ko;case this.InterpolantFactoryMethodSmooth:return Ho;case this.InterpolantFactoryMethodBezier:return yl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]+=e;Bo(this.settings)&&(yd(this.settings.inTangents,e),yd(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]*=e;Bo(this.settings)&&(vd(this.settings.inTangents,e),vd(this.settings.outTangents,e))}return this}trim(e,t){let i=this.times,s=i.length,r=0,o=s-1;for(;r!==s&&i[r]<e;)++r;for(;o!==-1&&i[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=i.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Fe("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,s=this.values,r=i.length;r===0&&(Fe("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let c=i[a];if(typeof c=="number"&&isNaN(c)){Fe("KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){Fe("KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(s!==void 0&&cm(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){Fe("KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Ho,r=e.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=e[a],h=e[a+1];if(l!==h&&(a!==1||l!==e[0]))if(s)c=!0;else{let u=a*i,d=u-i,p=u+i;for(let x=0;x!==i;++x){let _=t[u+x];if(_!==t[d+x]||_!==t[p+x]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let u=a*i,d=o*i;for(let p=0;p!==i;++p)t[d+p]=t[u+p]}++o}}if(r>0){e[o]=e[r];for(let a=r*i,c=o*i,l=0;l!==i;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,s=new i(this.name,e,t);return s.createInterpolant=this.createInterpolant,Bo(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function yd(n,e){for(let t=0,i=n.length;t!==i;t+=2)n[t]+=e}function vd(n,e){for(let t=0,i=n.length;t!==i;t+=2)n[t]*=e}pn.prototype.ValueTypeName="";pn.prototype.TimeBufferType=Float32Array;pn.prototype.ValueBufferType=Float32Array;pn.prototype.DefaultInterpolation=Ko;var wi=class extends pn{constructor(e,t,i){super(e,t,i)}};wi.prototype.ValueTypeName="bool";wi.prototype.ValueBufferType=Array;wi.prototype.DefaultInterpolation=hr;wi.prototype.InterpolantFactoryMethodLinear=void 0;wi.prototype.InterpolantFactoryMethodSmooth=void 0;var da=class extends pn{constructor(e,t,i,s){super(e,t,i,s)}};da.prototype.ValueTypeName="color";var fa=class extends pn{constructor(e,t,i,s){super(e,t,i,s)}};fa.prototype.ValueTypeName="number";var pa=class extends Ai{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(i-t)/(s-t),l=e*a;for(let h=l+a;l!==h;l+=4)zn.slerpFlat(r,0,o,l-a,o,l,c);return r}},Pr=class extends pn{constructor(e,t,i,s){super(e,t,i,s)}InterpolantFactoryMethodLinear(e){return new pa(this.times,this.values,this.getValueSize(),e)}};Pr.prototype.ValueTypeName="quaternion";Pr.prototype.InterpolantFactoryMethodSmooth=void 0;var Ci=class extends pn{constructor(e,t,i){super(e,t,i)}};Ci.prototype.ValueTypeName="string";Ci.prototype.ValueBufferType=Array;Ci.prototype.DefaultInterpolation=hr;Ci.prototype.InterpolantFactoryMethodLinear=void 0;Ci.prototype.InterpolantFactoryMethodSmooth=void 0;var ma=class extends pn{constructor(e,t,i,s){super(e,t,i,s)}};ma.prototype.ValueTypeName="vector";var ga=class{constructor(e,t,i){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let p=l[u],x=l[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return x}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},mf=new ga,_a=class{constructor(e){this.manager=e!==void 0?e:mf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}};_a.DEFAULT_MATERIAL_NAME="__DEFAULT";var Wi=class extends Ct{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new We(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Ir=class extends Wi{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ct.DEFAULT_UP),this.updateMatrix(),this.groundColor=new We(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},xl=new mt,Sd=new V,bd=new V,Us=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ke(512,512),this.mapType=cn,this.map=null,this.mapPass=null,this.matrix=new mt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ti,this._frameExtents=new ke(1,1),this._viewportCount=1,this._viewports=[new yt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Sd.setFromMatrixPosition(e.matrixWorld),t.position.copy(Sd),bd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(bd),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,s){xl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(xl,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;e.coordinateSystem===Rs||e.reversedDepth?t.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,1,0,0,0,0,1):t.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,.5,.5,0,0,0,1),t.multiply(xl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},zo=new V,Go=new zn,Fn=new V,Lr=class extends Ct{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new mt,this.projectionMatrix=new mt,this.projectionMatrixInverse=new mt,this.coordinateSystem=Sn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(zo,Go,Fn),Fn.x===1&&Fn.y===1&&Fn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(zo,Go,Fn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(zo,Go,Fn),Fn.x===1&&Fn.y===1&&Fn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(zo,Go,Fn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Si=new V,Md=new ke,Td=new ke,Xt=class extends Lr{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=mr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan($c*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return mr*2*Math.atan(Math.tan($c*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Si.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Si.x,Si.y).multiplyScalar(-e/Si.z),Si.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Si.x,Si.y).multiplyScalar(-e/Si.z)}getViewSize(e,t){return this.getViewBounds(e,Md,Td),t.subVectors(Td,Md)}setViewOffset(e,t,i,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan($c*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*i/l,s*=o.width/c,i*=o.height/l}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Tl=class extends Us{constructor(){super(new Xt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,i=mr*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(i!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=i,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},Dr=class extends Wi{constructor(e,t,i=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Ct.DEFAULT_UP),this.updateMatrix(),this.target=new Ct,this.distance=i,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Tl}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},El=class extends Us{constructor(){super(new Xt(90,1,.5,500)),this.isPointLightShadow=!0}},Os=class extends Wi{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new El}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Nr=class extends Lr{constructor(e=-1,t=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-e,o=i+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Al=class extends Us{constructor(){super(new Nr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ur=class extends Wi{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ct.DEFAULT_UP),this.updateMatrix(),this.target=new Ct,this.shadow=new Al}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var Ts=-90,Es=1,Fs=class extends Ct{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Xt(Ts,Es,e,t);s.layers=this.layers,this.add(s);let r=new Xt(Ts,Es,e,t);r.layers=this.layers,this.add(r);let o=new Xt(Ts,Es,e,t);o.layers=this.layers,this.add(o);let a=new Xt(Ts,Es,e,t);a.layers=this.layers,this.add(a);let c=new Xt(Ts,Es,e,t);c.layers=this.layers,this.add(c);let l=new Xt(Ts,Es,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,s,r,o,a,c]=t;for(let l of t)this.remove(l);if(e===Sn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Rs)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;let _=i.texture.mipmapsAutoUpdate;i.texture.mipmapsAutoUpdate=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,2,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,3,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,4,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.mipmapsAutoUpdate=_,e.setRenderTarget(i,5,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,d,p),e.xr.enabled=x,i.texture.needsPMREMUpdate=!0}},xa=class extends Xt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}};var th="\\[\\]\\.:\\/",Dm=new RegExp("["+th+"]","g"),nh="[^"+th+"]",Nm="[^"+th.replace("\\.","")+"]",Um=/((?:WC+[\/:])*)/.source.replace("WC",nh),Om=/(WCOD+)?/.source.replace("WCOD",Nm),Fm=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",nh),km=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",nh),Bm=new RegExp("^"+Um+Om+Fm+km+"$"),zm=["material","materials","bones","map"],wl=class{constructor(e,t,i){let s=i||gt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},gt=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Dm,"")}static parseTrackName(e){let t=Bm.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);zm.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let c=i(a.children);if(c)return c}return null},s=i(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)e[t++]=i[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Oe("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let l=t.objectIndex;switch(i){case"materials":if(!e.material){Fe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Fe("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Fe("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Fe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Fe("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){Fe("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(l!==void 0){if(e[l]===void 0){Fe("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let o=e[s];if(o===void 0){let l=t.nodeName;Fe("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Fe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Fe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};gt.Composite=wl;gt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};gt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};gt.prototype.GetterByBindingType=[gt.prototype._getValue_direct,gt.prototype._getValue_array,gt.prototype._getValue_arrayElement,gt.prototype._getValue_toArray];gt.prototype.SetterByBindingTypeAndVersioning=[[gt.prototype._setValue_direct,gt.prototype._setValue_direct_setNeedsUpdate,gt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[gt.prototype._setValue_array,gt.prototype._setValue_array_setNeedsUpdate,gt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[gt.prototype._setValue_arrayElement,gt.prototype._setValue_arrayElement_setNeedsUpdate,gt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[gt.prototype._setValue_fromArray,gt.prototype._setValue_fromArray_setNeedsUpdate,gt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Xv=new Float32Array(1);var ch=class ch{constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}};ch.prototype.isMatrix2=!0;var Cl=ch;function ih(n,e,t,i){let s=Gm(i);switch(t){case ql:return n*e;case Zl:return n*e/s.components*s.byteLength;case wa:return n*e/s.components*s.byteLength;case Ii:return n*e*2/s.components*s.byteLength;case Ca:return n*e*2/s.components*s.byteLength;case Yl:return n*e*3/s.components*s.byteLength;case Dn:return n*e*4/s.components*s.byteLength;case Ra:return n*e*4/s.components*s.byteLength;case Fr:case kr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Br:case zr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ia:case Da:return Math.max(n,16)*Math.max(e,8)/4;case Pa:case La:return Math.max(n,8)*Math.max(e,8)/2;case Na:case Ua:case Fa:case ka:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Oa:case Gr:case Ba:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case za:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ga:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Ha:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Va:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Wa:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Xa:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case qa:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Ya:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Za:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Ja:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case $a:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case ja:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Ka:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Qa:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case ec:case tc:case nc:return Math.ceil(n/4)*Math.ceil(e/4)*16;case ic:case sc:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Hr:case rc:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Gm(n){switch(n){case cn:case Hl:return{byteLength:1,components:1};case Gs:case Vl:case Ln:return{byteLength:2,components:1};case Ea:case Aa:return{byteLength:2,components:4};case Pn:case Ta:case In:return{byteLength:4,components:1};case Wl:case Xl:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Oe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function Ff(){let n=null,e=!1,t=null,i=null;function s(r,o){i=n.requestAnimationFrame(s),t(r,o)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function Zm(n){let e=new WeakMap;function t(a,c){let l=a.array,h=a.usage,u=l.byteLength,d=n.createBuffer();n.bindBuffer(c,d),n.bufferData(c,l,h),a.onUploadCallback();let p;if(l instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=n.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=n.SHORT;else if(l instanceof Uint32Array)p=n.UNSIGNED_INT;else if(l instanceof Int32Array)p=n.INT;else if(l instanceof Int8Array)p=n.BYTE;else if(l instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function i(a,c,l){let h=c.array,u=c.updateRanges;if(n.bindBuffer(l,a),u.length===0)n.bufferSubData(l,0,h);else{u.sort((p,x)=>p.start-x.start);let d=0;for(let p=1;p<u.length;p++){let x=u[d],_=u[p];_.start<=x.start+x.count+1?x.count=Math.max(x.count,_.start+_.count-x.start):(++d,u[d]=_)}u.length=d+1;for(let p=0,x=u.length;p<x;p++){let _=u[p];n.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(n.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var Jm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,$m=`#ifdef USE_ALPHAHASH
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
#endif`,jm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Km=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Qm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,e0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,t0=`#ifdef USE_AOMAP
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
#endif`,n0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,i0=`#ifdef USE_BATCHING
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
#endif`,s0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,r0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,o0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,a0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,c0=`#ifdef USE_IRIDESCENCE
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
#endif`,l0=`#ifdef USE_BUMPMAP
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
#endif`,h0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,u0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,d0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,f0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,p0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,m0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,g0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,_0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,x0=`#define PI 3.141592653589793
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
} // validated`,y0=`vec3 transformedNormal = objectNormal;
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
#endif`,v0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,S0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,b0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,M0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,T0="gl_FragColor = linearToOutputTexel( gl_FragColor );",E0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,A0=`#ifdef USE_ENVMAP
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
#endif`,w0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,C0=`#ifdef USE_ENVMAP
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
#endif`,R0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,P0=`#ifdef USE_ENVMAP
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
#endif`,I0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,L0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,D0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,N0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,U0=`#ifdef USE_GRADIENTMAP
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
}`,O0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,F0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,k0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,B0=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,z0=`#ifdef USE_ENVMAP
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
#endif`,G0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,H0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,V0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,W0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,X0=`PhysicalMaterial material;
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
#endif`,q0=`uniform sampler2D dfgLUT;
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
}`,Y0=`
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
#endif`,Z0=`#if defined( RE_IndirectDiffuse )
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
#endif`,J0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,$0=`#if NUM_LIGHT_PROBE_GRIDS > 0
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
#endif`,j0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,K0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Q0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,eg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,tg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ng=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ig=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,sg=`#if defined( USE_POINTS_UV )
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
#endif`,rg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,og=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ag=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,cg=`#if defined( USE_MORPHCOLORS )
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
#endif`,lg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,hg=`#ifdef USE_MORPHTARGETS
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
#endif`,ug=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,dg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,fg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,pg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,_g=`#ifdef USE_NORMALMAP
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
#endif`,xg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,yg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,vg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Sg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,bg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Mg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Tg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Eg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ag=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,wg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Cg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Rg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Pg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ig=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Lg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Dg=`float getShadowMask() {
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
}`,Ng=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ug=`#ifdef USE_SKINNING
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
#endif`,Og=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Fg=`#ifdef USE_SKINNING
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
#endif`,kg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Bg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,zg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Gg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Hg=`#ifdef USE_TRANSMISSION
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
#endif`,Vg=`#ifdef USE_TRANSMISSION
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
#endif`,Wg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Xg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,qg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Yg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Zg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Jg=`uniform sampler2D t2D;
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
}`,$g=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jg=`uniform float backgroundBlurriness;
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
}`,Kg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,e_=`#include <common>
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
}`,t_=`#if DEPTH_PACKING == 3200
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
}`,n_=`#define DISTANCE
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
}`,i_=`#define DISTANCE
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
}`,s_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,r_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,o_=`uniform float scale;
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
}`,a_=`uniform vec3 diffuse;
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
}`,c_=`#include <common>
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
}`,l_=`uniform vec3 diffuse;
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
}`,h_=`#define LAMBERT
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
}`,u_=`#define LAMBERT
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
}`,d_=`#define MATCAP
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
}`,f_=`#define MATCAP
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
}`,p_=`#define NORMAL
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
}`,m_=`#define NORMAL
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
}`,g_=`#define PHONG
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
}`,__=`#define PHONG
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
}`,x_=`#define STANDARD
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
}`,y_=`#define STANDARD
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
}`,v_=`#define TOON
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
}`,S_=`#define TOON
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
}`,b_=`uniform float size;
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
}`,M_=`uniform vec3 diffuse;
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
}`,T_=`#include <common>
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
}`,E_=`uniform vec3 color;
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
}`,A_=`uniform float rotation;
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
}`,w_=`uniform vec3 diffuse;
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
}`,Ze={alphahash_fragment:Jm,alphahash_pars_fragment:$m,alphamap_fragment:jm,alphamap_pars_fragment:Km,alphatest_fragment:Qm,alphatest_pars_fragment:e0,aomap_fragment:t0,aomap_pars_fragment:n0,batching_pars_vertex:i0,batching_vertex:s0,begin_vertex:r0,beginnormal_vertex:o0,bsdfs:a0,iridescence_fragment:c0,bumpmap_pars_fragment:l0,clipping_planes_fragment:h0,clipping_planes_pars_fragment:u0,clipping_planes_pars_vertex:d0,clipping_planes_vertex:f0,color_fragment:p0,color_pars_fragment:m0,color_pars_vertex:g0,color_vertex:_0,common:x0,defaultnormal_vertex:y0,displacementmap_pars_vertex:v0,displacementmap_vertex:S0,emissivemap_fragment:b0,emissivemap_pars_fragment:M0,colorspace_fragment:T0,colorspace_pars_fragment:E0,envmap_fragment:A0,envmap_common_pars_fragment:w0,envmap_pars_fragment:C0,envmap_pars_vertex:R0,envmap_physical_pars_fragment:z0,envmap_vertex:P0,fog_vertex:I0,fog_pars_vertex:L0,fog_fragment:D0,fog_pars_fragment:N0,gradientmap_pars_fragment:U0,lightmap_pars_fragment:O0,lights_lambert_fragment:F0,lights_lambert_pars_fragment:k0,lights_pars_begin:B0,lights_toon_fragment:G0,lights_toon_pars_fragment:H0,lights_phong_fragment:V0,lights_phong_pars_fragment:W0,lights_physical_fragment:X0,lights_physical_pars_fragment:q0,lights_fragment_begin:Y0,lights_fragment_maps:Z0,lights_fragment_end:J0,lightprobes_pars_fragment:$0,logdepthbuf_fragment:j0,logdepthbuf_pars_fragment:K0,logdepthbuf_pars_vertex:Q0,logdepthbuf_vertex:eg,map_fragment:tg,map_pars_fragment:ng,map_particle_fragment:ig,map_particle_pars_fragment:sg,metalnessmap_fragment:rg,metalnessmap_pars_fragment:og,morphinstance_vertex:ag,morphcolor_vertex:cg,morphnormal_vertex:lg,morphtarget_pars_vertex:hg,morphtarget_vertex:ug,normal_fragment_begin:dg,normal_fragment_maps:fg,normal_pars_fragment:pg,normal_pars_vertex:mg,normal_vertex:gg,normalmap_pars_fragment:_g,clearcoat_normal_fragment_begin:xg,clearcoat_normal_fragment_maps:yg,clearcoat_pars_fragment:vg,iridescence_pars_fragment:Sg,opaque_fragment:bg,packing:Mg,premultiplied_alpha_fragment:Tg,project_vertex:Eg,dithering_fragment:Ag,dithering_pars_fragment:wg,roughnessmap_fragment:Cg,roughnessmap_pars_fragment:Rg,shadowmap_pars_fragment:Pg,shadowmap_pars_vertex:Ig,shadowmap_vertex:Lg,shadowmask_pars_fragment:Dg,skinbase_vertex:Ng,skinning_pars_vertex:Ug,skinning_vertex:Og,skinnormal_vertex:Fg,specularmap_fragment:kg,specularmap_pars_fragment:Bg,tonemapping_fragment:zg,tonemapping_pars_fragment:Gg,transmission_fragment:Hg,transmission_pars_fragment:Vg,uv_pars_fragment:Wg,uv_pars_vertex:Xg,uv_vertex:qg,worldpos_vertex:Yg,background_vert:Zg,background_frag:Jg,backgroundCube_vert:$g,backgroundCube_frag:jg,cube_vert:Kg,cube_frag:Qg,depth_vert:e_,depth_frag:t_,distance_vert:n_,distance_frag:i_,equirect_vert:s_,equirect_frag:r_,linedashed_vert:o_,linedashed_frag:a_,meshbasic_vert:c_,meshbasic_frag:l_,meshlambert_vert:h_,meshlambert_frag:u_,meshmatcap_vert:d_,meshmatcap_frag:f_,meshnormal_vert:p_,meshnormal_frag:m_,meshphong_vert:g_,meshphong_frag:__,meshphysical_vert:x_,meshphysical_frag:y_,meshtoon_vert:v_,meshtoon_frag:S_,points_vert:b_,points_frag:M_,shadow_vert:T_,shadow_frag:E_,sprite_vert:A_,sprite_frag:w_},Se={common:{diffuse:{value:new We(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ze}},envmap:{envMap:{value:null},envMapRotation:{value:new ze},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ze},normalScale:{value:new ke(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new We(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new We(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0},uvTransform:{value:new ze}},sprite:{diffuse:{value:new We(16777215)},opacity:{value:1},center:{value:new ke(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}}},Zn={basic:{uniforms:jt([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.fog]),vertexShader:Ze.meshbasic_vert,fragmentShader:Ze.meshbasic_frag},lambert:{uniforms:jt([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new We(0)},envMapIntensity:{value:1}}]),vertexShader:Ze.meshlambert_vert,fragmentShader:Ze.meshlambert_frag},phong:{uniforms:jt([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new We(0)},specular:{value:new We(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphong_vert,fragmentShader:Ze.meshphong_frag},standard:{uniforms:jt([Se.common,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.roughnessmap,Se.metalnessmap,Se.fog,Se.lights,{emissive:{value:new We(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag},toon:{uniforms:jt([Se.common,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.gradientmap,Se.fog,Se.lights,{emissive:{value:new We(0)}}]),vertexShader:Ze.meshtoon_vert,fragmentShader:Ze.meshtoon_frag},matcap:{uniforms:jt([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,{matcap:{value:null}}]),vertexShader:Ze.meshmatcap_vert,fragmentShader:Ze.meshmatcap_frag},points:{uniforms:jt([Se.points,Se.fog]),vertexShader:Ze.points_vert,fragmentShader:Ze.points_frag},dashed:{uniforms:jt([Se.common,Se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ze.linedashed_vert,fragmentShader:Ze.linedashed_frag},depth:{uniforms:jt([Se.common,Se.displacementmap]),vertexShader:Ze.depth_vert,fragmentShader:Ze.depth_frag},normal:{uniforms:jt([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,{opacity:{value:1}}]),vertexShader:Ze.meshnormal_vert,fragmentShader:Ze.meshnormal_frag},sprite:{uniforms:jt([Se.sprite,Se.fog]),vertexShader:Ze.sprite_vert,fragmentShader:Ze.sprite_frag},background:{uniforms:{uvTransform:{value:new ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ze.background_vert,fragmentShader:Ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ze}},vertexShader:Ze.backgroundCube_vert,fragmentShader:Ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ze.cube_vert,fragmentShader:Ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ze.equirect_vert,fragmentShader:Ze.equirect_frag},distance:{uniforms:jt([Se.common,Se.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ze.distance_vert,fragmentShader:Ze.distance_frag},shadow:{uniforms:jt([Se.lights,Se.fog,{color:{value:new We(0)},opacity:{value:1}}]),vertexShader:Ze.shadow_vert,fragmentShader:Ze.shadow_frag}};Zn.physical={uniforms:jt([Zn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ze},clearcoatNormalScale:{value:new ke(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ze},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new ze},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ze},sheen:{value:0},sheenColor:{value:new We(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ze},transmissionSamplerSize:{value:new ke},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ze},attenuationDistance:{value:0},attenuationColor:{value:new We(0)},specularColor:{value:new We(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ze},anisotropyVector:{value:new ke},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ze}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag};var cc={r:0,b:0,g:0},C_=new mt,kf=new ze;kf.set(-1,0,0,0,1,0,0,0,1);function R_(n,e,t,i,s,r){let o=new We(0),a=s===!0?0:1,c,l,h=null,u=0,d=null;function p(S){let E=S.isScene===!0?S.background:null;if(E&&E.isTexture){let M=S.backgroundBlurriness>0;E=e.get(E,M)}return E}function x(S){let E=!1,M=p(S);M===null?g(o,a):M&&M.isColor&&(g(M,1),E=!0);let A=n.xr.getEnvironmentBlendMode();A==="additive"?t.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||E)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function _(S,E){let M=p(E);M&&M.isCubeTexture?(l===void 0&&(l=new ot(new fn(1,1,1),new Wn({name:"BackgroundCubeMaterial",uniforms:ji(Zn.backgroundCube.uniforms),vertexShader:Zn.backgroundCube.vertexShader,fragmentShader:Zn.backgroundCube.fragmentShader,side:rn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(A,w,y){this.matrixWorld.copyPosition(y.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=M,l.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(C_.makeRotationFromEuler(E.backgroundRotation)).transpose(),M.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(kf),l.material.toneMapped=Qe.getTransfer(M.colorSpace)!==rt,(h!==M||u!==M.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,h=M,u=M.version,d=n.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new ot(new Ei(2,2),new Wn({name:"BackgroundMaterial",uniforms:ji(Zn.background.uniforms),vertexShader:Zn.background.vertexShader,fragmentShader:Zn.background.fragmentShader,side:Ri,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.toneMapped=Qe.getTransfer(M.colorSpace)!==rt,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||u!==M.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,h=M,u=M.version,d=n.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function g(S,E){S.getRGB(cc,eh(n)),t.buffers.color.setClear(cc.r,cc.g,cc.b,E,r)}function m(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(S,E=1){o.set(S),a=E,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(S){a=S,g(o,a)},render:x,addToRenderList:_,dispose:m}}function P_(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=d(null),r=s,o=!1;function a(B,H,Z,D,$){let R=!1,P=u(B,D,Z,H);r!==P&&(r=P,l(r.object)),R=p(B,D,Z,$),R&&x(B,D,Z,$),$!==null&&e.update($,n.ELEMENT_ARRAY_BUFFER),(R||o)&&(o=!1,M(B,H,Z,D),$!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get($).buffer))}function c(){return n.createVertexArray()}function l(B){return n.bindVertexArray(B)}function h(B){return n.deleteVertexArray(B)}function u(B,H,Z,D){let $=D.wireframe===!0,R=i[H.id];R===void 0&&(R={},i[H.id]=R);let P=B.isInstancedMesh===!0?B.id:0,U=R[P];U===void 0&&(U={},R[P]=U);let k=U[Z.id];k===void 0&&(k={},U[Z.id]=k);let G=k[$];return G===void 0&&(G=d(c()),k[$]=G),G}function d(B){let H=[],Z=[],D=[];for(let $=0;$<t;$++)H[$]=0,Z[$]=0,D[$]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:H,enabledAttributes:Z,attributeDivisors:D,object:B,attributes:{},index:null}}function p(B,H,Z,D){let $=r.attributes,R=H.attributes,P=0,U=Z.getAttributes();for(let k in U)if(U[k].location>=0){let ee=$[k],ae=R[k];if(ae===void 0&&(k==="instanceMatrix"&&B.instanceMatrix&&(ae=B.instanceMatrix),k==="instanceColor"&&B.instanceColor&&(ae=B.instanceColor)),ee===void 0||ee.attribute!==ae||ae&&ee.data!==ae.data)return!0;P++}return r.attributesNum!==P||r.index!==D}function x(B,H,Z,D){let $={},R=H.attributes,P=0,U=Z.getAttributes();for(let k in U)if(U[k].location>=0){let ee=R[k];ee===void 0&&(k==="instanceMatrix"&&B.instanceMatrix&&(ee=B.instanceMatrix),k==="instanceColor"&&B.instanceColor&&(ee=B.instanceColor));let ae={};ae.attribute=ee,ee&&ee.data&&(ae.data=ee.data),$[k]=ae,P++}r.attributes=$,r.attributesNum=P,r.index=D}function _(){let B=r.newAttributes;for(let H=0,Z=B.length;H<Z;H++)B[H]=0}function g(B){m(B,0)}function m(B,H){let Z=r.newAttributes,D=r.enabledAttributes,$=r.attributeDivisors;Z[B]=1,D[B]===0&&(n.enableVertexAttribArray(B),D[B]=1),$[B]!==H&&(n.vertexAttribDivisor(B,H),$[B]=H)}function S(){let B=r.newAttributes,H=r.enabledAttributes;for(let Z=0,D=H.length;Z<D;Z++)H[Z]!==B[Z]&&(n.disableVertexAttribArray(Z),H[Z]=0)}function E(B,H,Z,D,$,R,P){P===!0?n.vertexAttribIPointer(B,H,Z,$,R):n.vertexAttribPointer(B,H,Z,D,$,R)}function M(B,H,Z,D){_();let $=D.attributes,R=Z.getAttributes(),P=H.defaultAttributeValues;for(let U in R){let k=R[U];if(k.location>=0){let G=$[U];if(G===void 0&&(U==="instanceMatrix"&&B.instanceMatrix&&(G=B.instanceMatrix),U==="instanceColor"&&B.instanceColor&&(G=B.instanceColor)),G!==void 0){let ee=G.normalized,ae=G.itemSize,Ee=e.get(G);if(Ee===void 0)continue;let j=Ee.buffer,ce=Ee.type,ye=Ee.bytesPerElement,Me=ce===n.INT||ce===n.UNSIGNED_INT||G.gpuType===Ta;if(G.isInterleavedBufferAttribute){let he=G.data,Be=he.isInterleavedBuffer===!0?he.stride:he.itemSize,st=G.offset;if(he.isInstancedInterleavedBuffer||he.isInstancedBufferAttribute){for(let Ue=0;Ue<k.locationSize;Ue++)m(k.location+Ue,he.meshPerAttribute);B.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let Ue=0;Ue<k.locationSize;Ue++)g(k.location+Ue);n.bindBuffer(n.ARRAY_BUFFER,j);for(let Ue=0;Ue<k.locationSize;Ue++)E(k.location+Ue,ae/k.locationSize,ce,ee,Be*ye,(st+ae/k.locationSize*Ue)*ye,Me)}else{if(G.isInstancedBufferAttribute){for(let he=0;he<k.locationSize;he++)m(k.location+he,G.meshPerAttribute);B.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=G.meshPerAttribute*G.count)}else for(let he=0;he<k.locationSize;he++)g(k.location+he);n.bindBuffer(n.ARRAY_BUFFER,j);for(let he=0;he<k.locationSize;he++)E(k.location+he,ae/k.locationSize,ce,ee,ae*ye,ae/k.locationSize*he*ye,Me)}}else if(P!==void 0){let ee=P[U];if(ee!==void 0)switch(ee.length){case 2:n.vertexAttrib2fv(k.location,ee);break;case 3:n.vertexAttrib3fv(k.location,ee);break;case 4:n.vertexAttrib4fv(k.location,ee);break;default:n.vertexAttrib1fv(k.location,ee)}}}}S()}function A(){O();for(let B in i){let H=i[B];for(let Z in H){let D=H[Z];for(let $ in D){let R=D[$];for(let P in R)h(R[P].object),delete R[P];delete D[$]}}delete i[B]}}function w(B){if(i[B.id]===void 0)return;let H=i[B.id];for(let Z in H){let D=H[Z];for(let $ in D){let R=D[$];for(let P in R)h(R[P].object),delete R[P];delete D[$]}}delete i[B.id]}function y(B){for(let H in i){let Z=i[H];for(let D in Z){let $=Z[D];if($[B.id]===void 0)continue;let R=$[B.id];for(let P in R)h(R[P].object),delete R[P];delete $[B.id]}}}function T(B){for(let H in i){let Z=i[H],D=B.isInstancedMesh===!0?B.id:0,$=Z[D];if($!==void 0){for(let R in $){let P=$[R];for(let U in P)h(P[U].object),delete P[U];delete $[R]}delete Z[D],Object.keys(Z).length===0&&delete i[H]}}}function O(){I(),o=!0,r!==s&&(r=s,l(r.object))}function I(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:O,resetDefaultState:I,dispose:A,releaseStatesOfGeometry:w,releaseStatesOfObject:T,releaseStatesOfProgram:y,initAttributes:_,enableAttribute:g,disableUnusedAttributes:S}}function I_(n,e,t){let i;function s(c){i=c}function r(c,l){n.drawArrays(i,c,l),t.update(l,i,1)}function o(c,l,h){h!==0&&(n.drawArraysInstanced(i,c,l,h),t.update(l,i,h))}function a(c,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,h);let d=0;for(let p=0;p<h;p++)d+=l[p];t.update(d,i,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function L_(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let y=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(y.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(y){return!(y!==Dn&&i.convert(y)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(y){let T=y===Ln&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(y!==cn&&y!==In&&!T&&i.convert(y)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function c(y){if(y==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";y="mediump"}return y==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",h=c(l);h!==l&&(Oe("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),d=t.logarithmicDepthBuffer===!0&&u===!1;t.reversedDepthBuffer===!0&&u===!1&&Oe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&u===!0&&Oe("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),S=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),E=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),A=n.getParameter(n.MAX_SAMPLES),w=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:x,maxTextureSize:_,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:S,maxVaryings:E,maxFragmentUniforms:M,maxSamples:A,samples:w}}function D_(n){let e=this,t=null,i=0,s=!1,r=!1,o=new wn,a=new ze,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let p=u.length!==0||d||i!==0||s;return s=d,i=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,p){let x=u.clippingPlanes,_=u.clipIntersection,g=u.clipShadows,m=n.get(u);if(!s||x===null||x.length===0||r&&!g)r?h(null):l();else{let S=r?0:i,E=S*4,M=m.clippingState||null;c.value=M,M=h(x,d,E,p);for(let A=0;A!==E;++A)M[A]=t[A];m.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(u,d,p,x){let _=u!==null?u.length:0,g=null;if(_!==0){if(g=c.value,x!==!0||g===null){let m=p+_*4,S=d.matrixWorldInverse;a.getNormalMatrix(S),(g===null||g.length<m)&&(g=new Float32Array(m));for(let E=0,M=p;E!==_;++E,M+=4)o.copy(u[E]).applyMatrix4(S,a),o.normal.toArray(g,M),g[M+3]=o.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}var Xr=class extends dn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new Tr(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new fn(5,5,5),r=new Wn({name:"CubemapFromEquirect",uniforms:ji(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:rn,blending:qi});r.uniforms.tEquirect.value=t;let o=new ot(s,r),a=t.minFilter;return t.minFilter===hi&&(t.minFilter=nn),new Fs(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,s);e.setRenderTarget(r)}},gf=256,N_=3,U_=20,Bf=256,zf=16,O_=3,F_=new V,k_=new We,hc=class n{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Fs(1,10,null),this._boxMesh=new ot(new fn(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){let{size:o=256,position:a=F_}=r,c=this._renderer;this._setSize(o);let l=this._allocateTarget(),h=this._getSourceTarget(!0);t>0&&(h.texture.mipmapsAutoUpdate=!1);let u=c.autoClear,d=c.autoClearColor,p=c.autoClearDepth,x=c.autoClearStencil,_=e.background;c.autoClear=!0,c.autoClearColor=!0,c.autoClearDepth=!0,c.autoClearStencil=!0,_===null&&(e.background=c.getClearColor(k_));let g=new Fs(i,s,h);return g.position.copy(a),g.update(c,e),c.autoClear=u,c.autoClearColor=d,c.autoClearDepth=p,c.autoClearStencil=x,e.background=_,t>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(l,t)),this._applyPMREM(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=yf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=xf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(gf,cf(e))}_fromTexture(e,t){e.mapping===Zi||e.mapping===zs?this._setSize(e.image.length===0?gf:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let i=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(i),i}_allocateTarget(){let e=this._cubeSize,t=_f(e,!1,!1),i=Math.log2(e)-N_;for(let s=0;s<=i;s++)t.texture.mipmaps.push({width:e>>s,height:e>>s});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,i=this._sourceTarget;return(i===null||i.width!==t||e&&i.depthBuffer===!1)&&(i!==null&&i.dispose(),this._sourceTarget=_f(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,i){let s=this._boxMesh,r=this._cubeCamera;s.material=i,r.renderTarget=e,r.activeMipmapLevel=t;let o=e.width>>t;e.viewport.set(0,0,o,o),r.update(this._renderer,s),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===Zi||e.mapping===zs?(this._cubemapMaterial===null&&(this._cubemapMaterial=yf()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=xf()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=B_(),this._integrationMaterial=z_());let t=this._cubeSize,i=e.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(t/zf);for(let o=0;o<=i;o++){let a=n.lodToRoughness(o,i);if(o>i-O_)r.roughness.value=a,this._renderCube(e,o,this._integrationMaterial);else{let c=a>0?Math.log2(t)+.5*Math.log2(6/(Bf*Math.pow(a,4)))+.5:0;s.roughness.value=a,s.lodBias.value=c,this._renderCube(e,o,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=G_());let i=this._blurMaterial,s=i.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(e,0,i),s.envMap.value=e.texture,this._renderCube(r,0,i)}};function _f(n,e,t){return new Xr(n,{minFilter:hi,generateMipmaps:e,type:Ln,colorSpace:ur,depthBuffer:t})}function qr(n,e,t){return new Wn({name:n,uniforms:e,vertexShader:Ze.cube_vert,fragmentShader:t,side:rn,blending:qi,depthTest:!1,depthWrite:!1})}function B_(){return qr("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Bf}u

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
	`)}function z_(){return qr("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:zf}},`

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
	`)}function G_(){return qr("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${U_}
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
	`)}function xf(){return qr("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

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
	`)}function yf(){return qr("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function H_(n){let e=new WeakMap,t=new WeakMap,i=null;function s(d,p=!1){return d==null?null:p?o(d):r(d)}function r(d){if(d&&d.isTexture){let p=d.mapping;if(p===Sa||p===ba)if(e.has(d)){let x=e.get(d).texture;return a(x,d.mapping)}else{let x=d.image;if(x&&x.height>0){let _=new Xr(x.height);return _.fromEquirectangularTexture(n,d),e.set(d,_),d.addEventListener("dispose",l),a(_.texture,d.mapping)}else return null}}return d}function o(d){if(d&&d.isTexture&&d.isPMREMTexture!==!0){let p=d.mapping,x=p===Sa||p===ba,_=p===Zi||p===zs;if(x||_){let g=t.get(d),m=g!==void 0?g.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==m)return i===null&&(i=new hc(n)),g=x?i.fromEquirectangular(d,g):i.fromCubemap(d,g),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),g.texture;if(g!==void 0)return g.texture;{let S=d.image;return x&&S&&S.height>0||_&&S&&c(S)?(i===null&&(i=new hc(n)),g=x?i.fromEquirectangular(d):i.fromCubemap(d),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),d.addEventListener("dispose",h),g.texture):null}}}return d}function a(d,p){return p===Sa?d.mapping=Zi:p===ba&&(d.mapping=zs),d}function c(d){let p=0,x=6;for(let _=0;_<x;_++)d[_]!==void 0&&p++;return p===x}function l(d){let p=d.target;p.removeEventListener("dispose",l);let x=e.get(p);x!==void 0&&(e.delete(p),x.dispose())}function h(d){let p=d.target;p.removeEventListener("dispose",h);let x=t.get(p);x!==void 0&&(t.delete(p),x.dispose())}function u(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:u}}function V_(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let s=t(i);return s===null&&lr("WebGLRenderer: "+i+" extension not supported."),s}}}function W_(n,e,t,i){let s={},r=new WeakMap,o=new FinalizationRegistry(x=>delete s[x]);function a(x){c(x.target)}function c(x){x.index!==null&&e.remove(x.index);for(let g in x.attributes)e.remove(x.attributes[g]);x.removeEventListener("dispose",a),delete s[x.id],o.unregister(x);let _=r.get(x);_&&(e.remove(_),r.delete(x)),i.releaseStatesOfGeometry(x),x.isInstancedBufferGeometry===!0&&delete x._maxInstanceCount,t.memory.geometries--}function l(x,_){return s[_.id]!==void 0||(_.addEventListener("dispose",a),s[_.id]=new WeakRef(_),o.register(_,_.id,_),t.memory.geometries++),_}function h(x){let _=x.attributes;for(let g in _)e.update(_[g],n.ARRAY_BUFFER)}function u(x){let _=x.index,g=x.attributes.position,m=0;if(g===void 0)return;let S=_!==null?_.array.length:g.array.length/3-1,E=g.count>=65535?Sr:vr,M=new E(Math.ceil(S/3)*6,1),A=M.array;if(_!==null){let y=_.array;m=_.version;for(let T=0,O=0;T<S;T+=3){let I=y[T+0],B=y[T+1],H=y[T+2];A[O++]=I,A[O++]=B,A[O++]=B,A[O++]=H,A[O++]=H,A[O++]=I}}else{m=g.version;for(let y=0,T=0;y<S;y+=3){let O=y+0,I=y+1,B=y+2;A[T++]=O,A[T++]=I,A[T++]=I,A[T++]=B,A[T++]=B,A[T++]=O}}M.version=m;let w=r.get(x);w&&e.remove(w),r.set(x,M)}function d(x){let _=r.get(x);if(_){let g=x.index;g!==null&&_.version<g.version&&u(x)}else u(x);return r.get(x)}function p(){for(let x in s){let _=s[x].deref();_!==void 0&&c(_)}}return{get:l,update:h,getWireframeAttribute:d,dispose:p}}function X_(n,e,t){let i;function s(u){i=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function c(u,d){n.drawElements(i,d,r,u*o),t.update(d,i,1)}function l(u,d,p){p!==0&&(n.drawElementsInstanced(i,d,r,u*o,p),t.update(d,i,p))}function h(u,d,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,r,u,0,p);let _=0;for(let g=0;g<p;g++)_+=d[g];t.update(_,i,1)}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function q_(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(r/3);break;case n.LINES:t.lines+=a*(r/2);break;case n.LINE_STRIP:t.lines+=a*(r-1);break;case n.LINE_LOOP:t.lines+=a*r;break;case n.POINTS:t.points+=a*r;break;default:Fe("WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function Y_(n,e,t){let i=new WeakMap,s=new yt;function r(o,a,c){let l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=i.get(a);if(d===void 0||d.count!==u){let O=function(){y.dispose(),i.delete(a),a.removeEventListener("dispose",O)};d!==void 0&&d.texture.dispose();let p=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],S=a.morphAttributes.color||[],E=0;p===!0&&(E=1),x===!0&&(E=2),_===!0&&(E=3);let M=a.attributes.position.count*E,A=1;M>e.maxTextureSize&&(A=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);let w=new Float32Array(M*A*4*u),y=new gr(w,M,A,u);y.type=In,y.needsUpdate=!0;let T=E*4;for(let I=0;I<u;I++){let B=g[I],H=m[I],Z=S[I],D=M*A*4*I;for(let $=0;$<B.count;$++){let R=$*T;p===!0&&(s.fromBufferAttribute(B,$),w[D+R+0]=s.x,w[D+R+1]=s.y,w[D+R+2]=s.z,w[D+R+3]=0),x===!0&&(s.fromBufferAttribute(H,$),w[D+R+4]=s.x,w[D+R+5]=s.y,w[D+R+6]=s.z,w[D+R+7]=0),_===!0&&(s.fromBufferAttribute(Z,$),w[D+R+8]=s.x,w[D+R+9]=s.y,w[D+R+10]=s.z,w[D+R+11]=Z.itemSize===4?s.w:1)}}d={count:u,texture:y,size:new ke(M,A)},i.set(a,d),a.addEventListener("dispose",O)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let p=0;for(let _=0;_<l.length;_++)p+=l[_];let x=a.morphTargetsRelative?1:1-p;c.getUniforms().setValue(n,"morphTargetBaseInfluence",x),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:r}}function Z_(n,e,t,i,s){let r=new WeakMap;function o(l){let h=s.render.frame,u=l.geometry,d=e.get(l,u);if(r.get(d)!==h&&(e.update(d),r.set(d,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){let p=l.skeleton;r.get(p)!==h&&(p.update(),r.set(p,h))}return d}function a(){r=new WeakMap}function c(l){let h=l.target;h.removeEventListener("dispose",c),i.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:o,dispose:a}}var J_={[Nl]:"LINEAR_TONE_MAPPING",[Ul]:"REINHARD_TONE_MAPPING",[Ol]:"CINEON_TONE_MAPPING",[Fl]:"ACES_FILMIC_TONE_MAPPING",[Bl]:"AGX_TONE_MAPPING",[zl]:"NEUTRAL_TONE_MAPPING",[kl]:"CUSTOM_TONE_MAPPING"};function $_(n,e,t,i,s,r){let o=new dn(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,c=null,l=null,h=new Rt;h.setAttribute("position",new lt([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new lt([0,2,0,0,2,0],2));let u=new ra({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new ot(h,u),p=new Nr(-1,1,1,-1,0,1),x=null,_=null,g=!1,m,S=null,E=[],M=!1;this.setSize=function(A,w){o.setSize(A,w),a!==null&&a.setSize(A,w),c!==null&&c.setSize(A,w);for(let y=0;y<E.length;y++){let T=E[y];T.setSize&&T.setSize(A,w)}},this.setEffects=function(A){E=A,M=E.length>0&&E[0].isRenderPass===!0;let w=o.width,y=o.height;E.length>0&&a===null&&(a=new dn(w,y,{type:Ln,depthBuffer:!1,stencilBuffer:!1}),c=new dn(w,y,{type:Ln,depthBuffer:!1,stencilBuffer:!1}));let T=s===!0&&E.some(O=>O.needsDepthTexture===!0);T!==(o.depthTexture!==null)&&(T===!0&&l===null&&(l=new ci(w,y),r===!0&&(l.format=ui,l.type=Ji)),o.dispose(),o.depthTexture=T?l:null,o.resolveDepthBuffer=T,o.storeMultisampledDepthBuffer=T);for(let O=0;O<E.length;O++){let I=E[O];I.setSize&&I.setSize(w,y),T&&I.needsDepthTexture===!0&&I.setDepthTexture&&I.setDepthTexture(l)}},this.begin=function(A,w){if(g||A.toneMapping===qn&&E.length===0)return!1;if(S=w,w!==null){let y=w.width,T=w.height;(o.width!==y||o.height!==T)&&this.setSize(y,T)}return M===!1&&A.setRenderTarget(o),m=A.toneMapping,A.toneMapping=qn,!0},this.hasRenderPass=function(){return M},this.end=function(A,w){A.toneMapping=m,g=!0;let y=o,T=a;for(let O=0;O<E.length;O++){let I=E[O];I.enabled!==!1&&(I.render(A,T,y,w),I.needsSwap!==!1&&(y=T,T=T===a?c:a))}if(x!==A.outputColorSpace||_!==A.toneMapping){x=A.outputColorSpace,_=A.toneMapping,u.defines={},Qe.getTransfer(x)===rt&&(u.defines.SRGB_TRANSFER="");let O=J_[_];O&&(u.defines[O]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=y.texture,A.setRenderTarget(S),A.render(d,p),S=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),c!==null&&c.dispose(),h.dispose(),u.dispose()}}var Gf=new sn,Hf=new ci(1,1),Vf=new Er(1),Wf=new gr,Xf=new ta,qf=new Tr,vf=[],Sf=[],bf=new Float32Array(16),Mf=new Float32Array(9),Tf=new Float32Array(4);function Vs(n,e,t){let i=n[0];if(i<=0||i>0)return n;let s=e*t,r=vf[s];if(r===void 0&&(r=new Float32Array(s),vf[s]=r),e!==0){i.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(r,a)}return r}function Ut(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Ot(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function dc(n,e){let t=Sf[e];t===void 0&&(t=new Int32Array(e),Sf[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function j_(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function K_(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;n.uniform2fv(this.addr,e),Ot(t,e)}}function Q_(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ut(t,e))return;n.uniform3fv(this.addr,e),Ot(t,e)}}function ex(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;n.uniform4fv(this.addr,e),Ot(t,e)}}function tx(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Ut(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Ot(t,e)}else{if(Ut(t,i))return;Tf.set(i),n.uniformMatrix2fv(this.addr,!1,Tf),Ot(t,i)}}function nx(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Ut(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Ot(t,e)}else{if(Ut(t,i))return;Mf.set(i),n.uniformMatrix3fv(this.addr,!1,Mf),Ot(t,i)}}function ix(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Ut(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Ot(t,e)}else{if(Ut(t,i))return;bf.set(i),n.uniformMatrix4fv(this.addr,!1,bf),Ot(t,i)}}function sx(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function rx(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;n.uniform2iv(this.addr,e),Ot(t,e)}}function ox(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ut(t,e))return;n.uniform3iv(this.addr,e),Ot(t,e)}}function ax(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;n.uniform4iv(this.addr,e),Ot(t,e)}}function cx(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function lx(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;n.uniform2uiv(this.addr,e),Ot(t,e)}}function hx(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ut(t,e))return;n.uniform3uiv(this.addr,e),Ot(t,e)}}function ux(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;n.uniform4uiv(this.addr,e),Ot(t,e)}}function fc(n){return n.version===0&&(n.compareFunction=jl,n.needsUpdate=!0),n}function dx(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?r=fc(Hf):r=Gf,t.setTexture2D(e||r,s)}function fx(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||Xf,s)}function px(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_CUBE_SHADOW?r=fc(Vf):r=qf,t.setTextureCube(e||r,s)}function mx(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Wf,s)}function gx(n){switch(n){case 5126:return j_;case 35664:return K_;case 35665:return Q_;case 35666:return ex;case 35674:return tx;case 35675:return nx;case 35676:return ix;case 5124:case 35670:return sx;case 35667:case 35671:return rx;case 35668:case 35672:return ox;case 35669:case 35673:return ax;case 5125:return cx;case 36294:return lx;case 36295:return hx;case 36296:return ux;case 35678:case 36198:case 36298:case 36306:case 35682:return dx;case 35679:case 36299:case 36307:return fx;case 35680:case 36300:case 36308:case 36293:return px;case 36289:case 36303:case 36311:case 36292:return mx}}function _x(n,e){n.uniform1fv(this.addr,e)}function xx(n,e){let t=Vs(e,this.size,2);n.uniform2fv(this.addr,t)}function yx(n,e){let t=Vs(e,this.size,3);n.uniform3fv(this.addr,t)}function vx(n,e){let t=Vs(e,this.size,4);n.uniform4fv(this.addr,t)}function Sx(n,e){let t=Vs(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function bx(n,e){let t=Vs(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Mx(n,e){let t=Vs(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Tx(n,e){n.uniform1iv(this.addr,e)}function Ex(n,e){n.uniform2iv(this.addr,e)}function Ax(n,e){n.uniform3iv(this.addr,e)}function wx(n,e){n.uniform4iv(this.addr,e)}function Cx(n,e){n.uniform1uiv(this.addr,e)}function Rx(n,e){n.uniform2uiv(this.addr,e)}function Px(n,e){n.uniform3uiv(this.addr,e)}function Ix(n,e){n.uniform4uiv(this.addr,e)}function Lx(n,e,t){let i=this.cache,s=e.length,r=dc(t,s);Ut(i,r)||(n.uniform1iv(this.addr,r),Ot(i,r));let o;this.type===n.SAMPLER_2D_SHADOW?o=fc(Hf):o=Gf;for(let a=0;a!==s;++a)t.setTexture2D(e[a]||o,r[a])}function Dx(n,e,t){let i=this.cache,s=e.length,r=dc(t,s);Ut(i,r)||(n.uniform1iv(this.addr,r),Ot(i,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Xf,r[o])}function Nx(n,e,t){let i=this.cache,s=e.length,r=dc(t,s);Ut(i,r)||(n.uniform1iv(this.addr,r),Ot(i,r));let o;this.type===n.SAMPLER_CUBE_SHADOW?o=fc(Vf):o=qf;for(let a=0;a!==s;++a)t.setTextureCube(e[a]||o,r[a])}function Ux(n,e,t){let i=this.cache,s=e.length,r=dc(t,s);Ut(i,r)||(n.uniform1iv(this.addr,r),Ot(i,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Wf,r[o])}function Ox(n){switch(n){case 5126:return _x;case 35664:return xx;case 35665:return yx;case 35666:return vx;case 35674:return Sx;case 35675:return bx;case 35676:return Mx;case 5124:case 35670:return Tx;case 35667:case 35671:return Ex;case 35668:case 35672:return Ax;case 35669:case 35673:return wx;case 5125:return Cx;case 36294:return Rx;case 36295:return Px;case 36296:return Ix;case 35678:case 36198:case 36298:case 36306:case 35682:return Lx;case 35679:case 36299:case 36307:return Dx;case 35680:case 36300:case 36308:case 36293:return Nx;case 36289:case 36303:case 36311:case 36292:return Ux}}var uh=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=gx(t.type)}},dh=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ox(t.type)}},fh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(e,t[a.id],i)}}},lh=/(\w+)(\])?(\[|\.)?/g;function Ef(n,e){n.seq.push(e),n.map[e.id]=e}function Fx(n,e,t){let i=n.name,s=i.length;for(lh.lastIndex=0;;){let r=lh.exec(i),o=lh.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Ef(t,l===void 0?new uh(a,n,e):new dh(a,n,e));break}else{let u=t.map[a];u===void 0&&(u=new fh(a),Ef(t,u)),t=u}}}var Hs=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){let a=e.getActiveUniform(t,o),c=e.getUniformLocation(t,a.name);Fx(a,c,this)}let s=[],r=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){let r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){let s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,o=t.length;r!==o;++r){let a=t[r],c=i[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){let i=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&i.push(o)}return i}};function Af(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var kx=37297,Bx=0;function zx(n,e){let t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}var wf=new ze;function Gx(n){Qe._getMatrix(wf,Qe.workingColorSpace,n);let e=`mat3( ${wf.elements.map(t=>t.toFixed(4))} )`;switch(Qe.getTransfer(n)){case dr:return[e,"LinearTransferOETF"];case rt:return[e,"sRGBTransferOETF"];default:return Oe("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Cf(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+zx(n.getShaderSource(e),a)}else return r}function Hx(n,e){let t=Gx(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var Vx={[Nl]:"Linear",[Ul]:"Reinhard",[Ol]:"Cineon",[Fl]:"ACESFilmic",[Bl]:"AgX",[zl]:"Neutral",[kl]:"Custom"};function Wx(n,e){let t=Vx[e];return t===void 0?(Oe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var lc=new V;function Xx(){Qe.getLuminanceCoefficients(lc);let n=lc.x.toFixed(4),e=lc.y.toFixed(4),t=lc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function qx(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Wr).join(`
`)}function Yx(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Zx(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(e,s),o=r.name,a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Wr(n){return n!==""}function Rf(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function Pf(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Jx=/^[ \t]*#include +<([\w\d./]+)>/gm;function ph(n){return n.replace(Jx,$x)}function $x(n,e){let t=Ze[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return ph(t)}var jx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function If(n){return n.replace(jx,Kx)}function Kx(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Lf(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}var Qx={[Xi]:"SHADOWMAP_TYPE_PCF",[ks]:"SHADOWMAP_TYPE_VSM"};function ey(n){return Qx[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var ty={[zs]:"ENVMAP_MODE_REFRACTION"};function ny(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":ty[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var iy={[va]:"ENVMAP_BLENDING_MULTIPLY",[qd]:"ENVMAP_BLENDING_MIX",[Yd]:"ENVMAP_BLENDING_ADD"};function sy(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":iy[n.combine]||"ENVMAP_BLENDING_NONE"}function ry(n,e,t,i){let s=n.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,c=ey(t),l=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=ny(t),u=sy(t),d=qx(t),p=Yx(r),x=s.createProgram(),_,g,m=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(_=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Wr).join(`
`),_.length>0&&(_+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Wr).join(`
`),g.length>0&&(g+=`
`)):(_=[Lf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Wr).join(`
`),g=[Lf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==qn?"#define TONE_MAPPING":"",t.toneMapping!==qn?Ze.tonemapping_pars_fragment:"",t.toneMapping!==qn?Wx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ze.colorspace_pars_fragment,Hx("linearToOutputTexel",t.outputColorSpace),Xx(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Wr).join(`
`)),o=ph(o),o=Rf(o,t),o=Pf(o,t),a=ph(a),a=Rf(a,t),a=Pf(a,t),o=If(o),a=If(a),t.isRawShaderMaterial!==!0&&(m=`#version 300 es
`,_=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,g=["#define varying in",t.glslVersion===Ql?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ql?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let S=m+_+o,E=m+g+a,M=Af(s,s.VERTEX_SHADER,S),A=Af(s,s.FRAGMENT_SHADER,E);s.attachShader(x,M),s.attachShader(x,A),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function w(I){if(n.debug.checkShaderErrors){let B=s.getProgramInfoLog(x)||"",H=s.getShaderInfoLog(M)||"",Z=s.getShaderInfoLog(A)||"",D=B.trim(),$=H.trim(),R=Z.trim(),P=!0,U=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(P=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,x,M,A);else{let k=Cf(s,M,"vertex"),G=Cf(s,A,"fragment");Fe("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+D+`
`+k+`
`+G)}else D!==""?Oe("WebGLProgram: Program Info Log:",D):($===""||R==="")&&(U=!1);U&&(I.diagnostics={runnable:P,programLog:D,vertexShader:{log:$,prefix:_},fragmentShader:{log:R,prefix:g}})}s.deleteShader(M),s.deleteShader(A),y=new Hs(s,x),T=Zx(s,x)}let y;this.getUniforms=function(){return y===void 0&&w(this),y};let T;this.getAttributes=function(){return T===void 0&&w(this),T};let O=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return O===!1&&(O=s.getProgramParameter(x,kx)),O},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Bx++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=M,this.fragmentShader=A,this}var oy=0,mh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new gh(e),t.set(e,i)),i}},gh=class{constructor(e){this.id=oy++,this.code=e,this.usedTimes=0}};function ay(n){return n===Ii||n===Gr||n===Hr}function cy(n,e,t,i,s,r){let o=new _r,a=new mh,c=new Set,l=[],h=new Map,u=i.logarithmicDepthBuffer,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(y){return c.add(y),y===0?"uv":`uv${y}`}function x(y,T,O,I,B,H){let Z=I.fog,D=B.geometry,$=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?I.environment:null,R=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,P=e.get(y.envMap||$,R),U=d[y.type],k=i.precision;y.precision!==null&&(k=i.getMaxPrecision(y.precision),k!==y.precision&&Oe("WebGLProgram.getParameters:",y.precision,"not supported, using",k,"instead."));let G=D.morphAttributes.position||D.morphAttributes.normal||D.morphAttributes.color,ee=G!==void 0?G.length:0,ae=0;D.morphAttributes.position!==void 0&&(ae=1),D.morphAttributes.normal!==void 0&&(ae=2),D.morphAttributes.color!==void 0&&(ae=3);let Ee,j,ce,ye;if(U){let ve=Zn[U];Ee=ve.vertexShader,j=ve.fragmentShader}else{Ee=y.vertexShader,j=y.fragmentShader;let ve=a.getVertexShaderStage(y),ct=a.getFragmentShaderStage(y);a.update(y,ve,ct),ce=ve.id,ye=ct.id}let Me=n.getRenderTarget(),he=n.state.buffers.depth.getReversed(),Be=B.isInstancedMesh===!0,st=B.isBatchedMesh===!0,Ue=!!y.map,at=!!y.matcap,ut=!!P,$e=ut&&P.isPMREMTexture===!0,Vt=!!y.aoMap,Dt=!!y.lightMap,an=!!y.bumpMap&&y.wireframe===!1,vt=!!y.normalMap,On=!!y.displacementMap,Ft=!!y.emissiveMap,gn=!!y.metalnessMap,_n=!!y.roughnessMap,xn=y.anisotropy>0,z=y.clearcoat>0,yn=y.diffuseRoughness>0,_t=y.dispersion>0,xt=y.retroreflectivity>0,xe=y.iridescence>0,Nt=y.sheen>0,Ne=y.transmission>0,He=xn&&!!y.anisotropyMap,C=z&&!!y.clearcoatMap,v=z&&!!y.clearcoatNormalMap,q=z&&!!y.clearcoatRoughnessMap,re=yn&&!!y.diffuseRoughnessMap,ie=xe&&!!y.iridescenceMap,ue=xe&&!!y.iridescenceThicknessMap,ge=Nt&&!!y.sheenColorMap,Q=Nt&&!!y.sheenRoughnessMap,te=!!y.specularMap,fe=!!y.specularColorMap,L=!!y.specularIntensityMap,ne=Ne&&!!y.transmissionMap,K=Ne&&!!y.thicknessMap,pe=!!y.gradientMap,le=!!y.alphaMap,de=y.alphaTest>0,Le=!!y.alphaHash,Ye=!!y.extensions,oe=qn;y.toneMapped&&(Me===null||Me.isXRRenderTarget===!0)&&(oe=n.toneMapping);let De=$e?P.isCompressedCubeTexture?P.image[0].mipmaps:P.mipmaps:null,qe={shaderID:U,shaderType:y.type,shaderName:y.name,vertexShader:Ee,fragmentShader:j,defines:y.defines,customVertexShaderID:ce,customFragmentShaderID:ye,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:k,batching:st,batchingColor:st&&B._colorsTexture!==null,instancing:Be,instancingColor:Be&&B.instanceColor!==null,instancingMorph:Be&&B.morphTexture!==null,outputColorSpace:Me===null?n.outputColorSpace:Me.isXRRenderTarget===!0?Me.texture.colorSpace:Qe.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:Ue,matcap:at,envMap:ut,envMapMode:ut&&P.mapping,envMapPMREM:$e,envMapMaxLod:$e?De.length-1:null,envMapSize:$e?De[0].width:null,aoMap:Vt,lightMap:Dt,bumpMap:an,normalMap:vt,displacementMap:On,emissiveMap:Ft,normalMapObjectSpace:vt&&y.normalMapType===$d,normalMapTangentSpace:vt&&y.normalMapType===oc,packedNormalMap:vt&&y.normalMapType===oc&&ay(y.normalMap.format),metalnessMap:gn,roughnessMap:_n,anisotropy:xn,anisotropyMap:He,clearcoat:z,clearcoatMap:C,clearcoatNormalMap:v,clearcoatRoughnessMap:q,diffuseRoughness:yn,diffuseRoughnessMap:re,dispersion:_t,retroreflection:xt,iridescence:xe,iridescenceMap:ie,iridescenceThicknessMap:ue,sheen:Nt,sheenColorMap:ge,sheenRoughnessMap:Q,specularMap:te,specularColorMap:fe,specularIntensityMap:L,transmission:Ne,transmissionMap:ne,thicknessMap:K,gradientMap:pe,opaque:y.transparent===!1&&y.blending===Bs&&y.alphaToCoverage===!1,alphaMap:le,alphaTest:de,alphaHash:Le,combine:y.combine,mapUv:Ue&&p(y.map.channel),aoMapUv:Vt&&p(y.aoMap.channel),lightMapUv:Dt&&p(y.lightMap.channel),bumpMapUv:an&&p(y.bumpMap.channel),normalMapUv:vt&&p(y.normalMap.channel),displacementMapUv:On&&p(y.displacementMap.channel),emissiveMapUv:Ft&&p(y.emissiveMap.channel),metalnessMapUv:gn&&p(y.metalnessMap.channel),roughnessMapUv:_n&&p(y.roughnessMap.channel),anisotropyMapUv:He&&p(y.anisotropyMap.channel),clearcoatMapUv:C&&p(y.clearcoatMap.channel),clearcoatNormalMapUv:v&&p(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:q&&p(y.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:re&&p(y.diffuseRoughnessMap.channel),iridescenceMapUv:ie&&p(y.iridescenceMap.channel),iridescenceThicknessMapUv:ue&&p(y.iridescenceThicknessMap.channel),sheenColorMapUv:ge&&p(y.sheenColorMap.channel),sheenRoughnessMapUv:Q&&p(y.sheenRoughnessMap.channel),specularMapUv:te&&p(y.specularMap.channel),specularColorMapUv:fe&&p(y.specularColorMap.channel),specularIntensityMapUv:L&&p(y.specularIntensityMap.channel),transmissionMapUv:ne&&p(y.transmissionMap.channel),thicknessMapUv:K&&p(y.thicknessMap.channel),alphaMapUv:le&&p(y.alphaMap.channel),vertexTangents:!!D.attributes.tangent&&(vt||xn),vertexNormals:!!D.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!D.attributes.color&&D.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!D.attributes.uv&&(Ue||le),fog:!!Z,useFog:y.fog===!0,fogExp2:!!Z&&Z.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||D.attributes.normal===void 0&&vt===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:he,skinning:B.isSkinnedMesh===!0,hasPositionAttribute:D.attributes.position!==void 0,morphTargets:D.morphAttributes.position!==void 0,morphNormals:D.morphAttributes.normal!==void 0,morphColors:D.morphAttributes.color!==void 0,morphTargetsCount:ee,morphTextureStride:ae,numSunLights:T.sun.length,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numSunLightShadows:T.sunShadowMap.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:H.filter(ve=>ve.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&O.length>0,shadowMapType:n.shadowMap.type,toneMapping:oe,decodeVideoTexture:Ue&&y.map.isVideoTexture===!0&&Qe.getTransfer(y.map.colorSpace)===rt,decodeVideoTextureEmissive:Ft&&y.emissiveMap.isVideoTexture===!0&&Qe.getTransfer(y.emissiveMap.colorSpace)===rt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Xn,flipSided:y.side===rn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Ye&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ye&&y.extensions.multiDraw===!0||st)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return qe.vertexUv1s=c.has(1),qe.vertexUv2s=c.has(2),qe.vertexUv3s=c.has(3),c.clear(),qe}function _(y){let T=[];if(y.shaderID?T.push(y.shaderID):(T.push(y.customVertexShaderID),T.push(y.customFragmentShaderID)),y.defines!==void 0)for(let O in y.defines)T.push(O),T.push(y.defines[O]);return y.isRawShaderMaterial===!1&&(g(T,y),m(T,y),T.push(n.outputColorSpace)),T.push(y.customProgramCacheKey),T.join()}function g(y,T){y.push(T.precision),y.push(T.outputColorSpace),y.push(T.envMapMode),y.push(T.envMapPMREM),y.push(T.envMapMaxLod),y.push(T.envMapSize),y.push(T.mapUv),y.push(T.alphaMapUv),y.push(T.lightMapUv),y.push(T.aoMapUv),y.push(T.bumpMapUv),y.push(T.normalMapUv),y.push(T.displacementMapUv),y.push(T.emissiveMapUv),y.push(T.metalnessMapUv),y.push(T.roughnessMapUv),y.push(T.anisotropyMapUv),y.push(T.clearcoatMapUv),y.push(T.clearcoatNormalMapUv),y.push(T.clearcoatRoughnessMapUv),y.push(T.diffuseRoughnessMapUv),y.push(T.iridescenceMapUv),y.push(T.iridescenceThicknessMapUv),y.push(T.sheenColorMapUv),y.push(T.sheenRoughnessMapUv),y.push(T.specularMapUv),y.push(T.specularColorMapUv),y.push(T.specularIntensityMapUv),y.push(T.transmissionMapUv),y.push(T.thicknessMapUv),y.push(T.combine),y.push(T.fogExp2),y.push(T.sizeAttenuation),y.push(T.morphTargetsCount),y.push(T.numSunLights),y.push(T.numDirLights),y.push(T.numPointLights),y.push(T.numSpotLights),y.push(T.numSpotLightMaps),y.push(T.numHemiLights),y.push(T.numRectAreaLights),y.push(T.numSunLightShadows),y.push(T.numDirLightShadows),y.push(T.numPointLightShadows),y.push(T.numSpotLightShadows),y.push(T.numSpotLightShadowsWithMaps),y.push(T.numLightProbes),y.push(T.numLightProbeGrids),y.push(T.shadowMapType),y.push(T.toneMapping),y.push(T.numClippingPlanes),y.push(T.numClipIntersection),y.push(T.depthPacking)}function m(y,T){o.disableAll(),T.instancing&&o.enable(0),T.instancingColor&&o.enable(1),T.instancingMorph&&o.enable(2),T.matcap&&o.enable(3),T.envMap&&o.enable(4),T.normalMapObjectSpace&&o.enable(5),T.normalMapTangentSpace&&o.enable(6),T.clearcoat&&o.enable(7),T.iridescence&&o.enable(8),T.alphaTest&&o.enable(9),T.vertexColors&&o.enable(10),T.vertexAlphas&&o.enable(11),T.vertexUv1s&&o.enable(12),T.vertexUv2s&&o.enable(13),T.vertexUv3s&&o.enable(14),T.vertexTangents&&o.enable(15),T.anisotropy&&o.enable(16),T.alphaHash&&o.enable(17),T.batching&&o.enable(18),T.dispersion&&o.enable(19),T.retroreflection&&o.enable(24),T.diffuseRoughness&&o.enable(25),T.batchingColor&&o.enable(20),T.gradientMap&&o.enable(21),T.packedNormalMap&&o.enable(22),T.vertexNormals&&o.enable(23),y.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.reversedDepthBuffer&&o.enable(4),T.skinning&&o.enable(5),T.morphTargets&&o.enable(6),T.morphNormals&&o.enable(7),T.morphColors&&o.enable(8),T.premultipliedAlpha&&o.enable(9),T.shadowMapEnabled&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.transmission&&o.enable(15),T.sheen&&o.enable(16),T.opaque&&o.enable(17),T.pointsUvs&&o.enable(18),T.decodeVideoTexture&&o.enable(19),T.decodeVideoTextureEmissive&&o.enable(20),T.alphaToCoverage&&o.enable(21),T.numLightProbeGrids>0&&o.enable(22),T.hasPositionAttribute&&o.enable(23),y.push(o.mask)}function S(y){let T=d[y.type],O;if(T){let I=Zn[T];O=ff.clone(I.uniforms)}else O=y.uniforms;return O}function E(y,T){let O=h.get(T);return O!==void 0?++O.usedTimes:(O=new ry(n,T,y,s),l.push(O),h.set(T,O)),O}function M(y){if(--y.usedTimes===0){let T=l.indexOf(y);l[T]=l[l.length-1],l.pop(),h.delete(y.cacheKey),y.destroy()}}function A(y){a.remove(y)}function w(){a.dispose()}return{getParameters:x,getProgramCacheKey:_,getUniforms:S,acquireProgram:E,releaseProgram:M,releaseShaderCache:A,programs:l,dispose:w}}function ly(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,c){n.get(o)[a]=c}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function hy(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Df(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Nf(){let n=[],e=0,t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function o(d){let p=0;return d.isInstancedMesh&&(p+=2),d.isSkinnedMesh&&(p+=1),p}function a(d,p,x,_,g,m){let S=n[e];return S===void 0?(S={id:d.id,object:d,geometry:p,material:x,materialVariant:o(d),groupOrder:_,renderOrder:d.renderOrder,z:g,group:m},n[e]=S):(S.id=d.id,S.object=d,S.geometry=p,S.material=x,S.materialVariant=o(d),S.groupOrder=_,S.renderOrder=d.renderOrder,S.z=g,S.group=m),e++,S}function c(d,p,x,_,g,m,S){S.reversedDepth===!0&&(g=-g);let E=a(d,p,x,_,g,m);x.transmission>0?i.push(E):x.transparent===!0?s.push(E):t.push(E)}function l(d,p,x,_,g,m){let S=a(d,p,x,_,g,m);x.transmission>0?i.unshift(S):x.transparent===!0?s.unshift(S):t.unshift(S)}function h(d,p){t.length>1&&t.sort(d||hy),i.length>1&&i.sort(p||Df),s.length>1&&s.sort(p||Df)}function u(){for(let d=e,p=n.length;d<p;d++){let x=n[d];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:c,unshift:l,finish:u,sort:h}}function uy(){let n=new WeakMap;function e(i,s){let r=n.get(i),o;return r===void 0?(o=new Nf,n.set(i,[o])):s>=r.length?(o=new Nf,r.push(o)):o=r[s],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function dy(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new V,color:new We};break;case"SpotLight":t={position:new V,direction:new V,color:new We,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new V,color:new We,distance:0,decay:0};break;case"HemisphereLight":t={direction:new V,skyColor:new We,groundColor:new We};break;case"RectAreaLight":t={color:new We,position:new V,halfWidth:new V,halfHeight:new V};break}return n[e.id]=t,t}}}function fy(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ke};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ke};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ke,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var py=0;function my(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function gy(n){let e=new dy,t=fy(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new V);let s=new V,r=new mt,o=new mt;function a(l){let h=0,u=0,d=0;for(let H=0;H<9;H++)i.probe[H].set(0,0,0);let p=0,x=0,_=0,g=0,m=0,S=0,E=0,M=0,A=0,w=0,y=0,T=0,O=0,I=0;l.sort(my);for(let H=0,Z=l.length;H<Z;H++){let D=l[H],$=D.color,R=D.intensity,P=D.distance,U=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===Ii?U=D.shadow.map.texture:U=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)h+=$.r*R,u+=$.g*R,d+=$.b*R;else if(D.isLightProbe){for(let k=0;k<9;k++)i.probe[k].addScaledVector(D.sh.coefficients[k],R);I++}else if(D.isSunLight){let k=e.get(D);if(k.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let G=D.shadow,ee=t.get(D);ee.shadowIntensity=G.intensity,ee.shadowBias=G.bias,ee.shadowNormalBias=G.normalBias,ee.shadowRadius=G.radius,ee.shadowMapSize.copy(G.mapSize).multiply(G.getFrameExtents()),i.sunShadow[x]=ee,i.sunShadowMap[x]=U;let ae=G.getViewportCount();for(let Ee=0;Ee<ae;Ee++)i.sunShadowMatrix[_+Ee]=G.getMatrix(Ee),i.sunShadowCascade[_+Ee]=G._cascadeData[Ee];_+=ae,x++}i.sun[p]=k,p++}else if(D.isDirectionalLight){let k=e.get(D);if(k.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let G=D.shadow,ee=t.get(D);ee.shadowIntensity=G.intensity,ee.shadowBias=G.bias,ee.shadowNormalBias=G.normalBias,ee.shadowRadius=G.radius,ee.shadowMapSize=G.mapSize,i.directionalShadow[g]=ee,i.directionalShadowMap[g]=U,i.directionalShadowMatrix[g]=D.shadow.matrix,A++}i.directional[g]=k,g++}else if(D.isSpotLight){let k=e.get(D);k.position.setFromMatrixPosition(D.matrixWorld),k.color.copy($).multiplyScalar(R),k.distance=P,k.coneCos=Math.cos(D.angle),k.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),k.decay=D.decay,i.spot[S]=k;let G=D.shadow;if(D.map&&(i.spotLightMap[T]=D.map,T++,G.updateMatrices(D),D.castShadow&&O++),i.spotLightMatrix[S]=G.matrix,D.castShadow){let ee=t.get(D);ee.shadowIntensity=G.intensity,ee.shadowBias=G.bias,ee.shadowNormalBias=G.normalBias,ee.shadowRadius=G.radius,ee.shadowMapSize=G.mapSize,i.spotShadow[S]=ee,i.spotShadowMap[S]=U,y++}S++}else if(D.isRectAreaLight){let k=e.get(D);k.color.copy($).multiplyScalar(R),k.halfWidth.set(D.width*.5,0,0),k.halfHeight.set(0,D.height*.5,0),i.rectArea[E]=k,E++}else if(D.isPointLight){let k=e.get(D);if(k.color.copy(D.color).multiplyScalar(D.intensity),k.distance=D.distance,k.decay=D.decay,D.castShadow){let G=D.shadow,ee=t.get(D);ee.shadowIntensity=G.intensity,ee.shadowBias=G.bias,ee.shadowNormalBias=G.normalBias,ee.shadowRadius=G.radius,ee.shadowMapSize=G.mapSize,ee.shadowCameraNear=G.camera.near,ee.shadowCameraFar=G.camera.far,i.pointShadow[m]=ee,i.pointShadowMap[m]=U,i.pointShadowMatrix[m]=D.shadow.matrix,w++}i.point[m]=k,m++}else if(D.isHemisphereLight){let k=e.get(D);k.skyColor.copy(D.color).multiplyScalar(R),k.groundColor.copy(D.groundColor).multiplyScalar(R),i.hemi[M]=k,M++}}E>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Se.LTC_FLOAT_1,i.rectAreaLTC2=Se.LTC_FLOAT_2):(i.rectAreaLTC1=Se.LTC_HALF_1,i.rectAreaLTC2=Se.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=d;let B=i.hash;(B.sunLength!==p||B.directionalLength!==g||B.pointLength!==m||B.spotLength!==S||B.rectAreaLength!==E||B.hemiLength!==M||B.numSunShadows!==x||B.numDirectionalShadows!==A||B.numPointShadows!==w||B.numSpotShadows!==y||B.numSpotMaps!==T||B.numLightProbes!==I)&&(i.sun.length=p,i.directional.length=g,i.spot.length=S,i.rectArea.length=E,i.point.length=m,i.hemi.length=M,i.sunShadow.length=x,i.sunShadowMap.length=x,i.sunShadowMatrix.length=_,i.sunShadowCascade.length=_,i.directionalShadow.length=A,i.directionalShadowMap.length=A,i.directionalShadowMatrix.length=A,i.pointShadow.length=w,i.pointShadowMap.length=w,i.pointShadowMatrix.length=w,i.spotShadow.length=y,i.spotShadowMap.length=y,i.spotLightMatrix.length=y+T-O,i.spotLightMap.length=T,i.numSpotLightShadowsWithMaps=O,i.numLightProbes=I,B.sunLength=p,B.directionalLength=g,B.pointLength=m,B.spotLength=S,B.rectAreaLength=E,B.hemiLength=M,B.numSunShadows=x,B.numDirectionalShadows=A,B.numPointShadows=w,B.numSpotShadows=y,B.numSpotMaps=T,B.numLightProbes=I,i.version=py++)}function c(l,h){let u=0,d=0,p=0,x=0,_=0,g=0,m=h.matrixWorldInverse;for(let S=0,E=l.length;S<E;S++){let M=l[S];if(M.isSunLight){let A=i.sun[u];A.direction.setFromMatrixPosition(M.matrixWorld),A.direction.transformDirection(m),u++}else if(M.isDirectionalLight){let A=i.directional[d];A.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(m),d++}else if(M.isSpotLight){let A=i.spot[x];A.position.setFromMatrixPosition(M.matrixWorld),A.position.applyMatrix4(m),A.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(m),x++}else if(M.isRectAreaLight){let A=i.rectArea[_];A.position.setFromMatrixPosition(M.matrixWorld),A.position.applyMatrix4(m),o.identity(),r.copy(M.matrixWorld),r.premultiply(m),o.extractRotation(r),A.halfWidth.set(M.width*.5,0,0),A.halfHeight.set(0,M.height*.5,0),A.halfWidth.applyMatrix4(o),A.halfHeight.applyMatrix4(o),_++}else if(M.isPointLight){let A=i.point[p];A.position.setFromMatrixPosition(M.matrixWorld),A.position.applyMatrix4(m),p++}else if(M.isHemisphereLight){let A=i.hemi[g];A.direction.setFromMatrixPosition(M.matrixWorld),A.direction.transformDirection(m),g++}}}return{setup:a,setupView:c,state:i}}function Uf(n){let e=new gy(n),t=[],i=[],s=[];function r(u){h.camera=u,t.length=0,i.length=0,s.length=0}function o(u){u.isLightProbeGrid?s.push(u):t.push(u)}function a(u){i.push(u)}function c(){e.setup(t),s.sort((u,d)=>u.priority-d.priority||u.id-d.id)}function l(u){e.setupView(t,u)}let h={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function _y(n){let e=new WeakMap;function t(s,r=0){let o=e.get(s),a;return o===void 0?(a=new Uf(n),e.set(s,[a])):r>=o.length?(a=new Uf(n),o.push(a)):a=o[r],a}function i(){e=new WeakMap}return{get:t,dispose:i}}var xy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,yy=`uniform sampler2D shadow_pass;
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
}`,vy=[new V(1,0,0),new V(-1,0,0),new V(0,1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1)],Sy=[new V(0,-1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1),new V(0,-1,0),new V(0,-1,0)],Of=new mt,Vr=new V,hh=new V;function by(n,e,t){let i=new Ti,s=new ke,r=new ke,o=new yt,a=new oa,c=new aa,l={},h=t.maxTextureSize,u={[Ri]:rn,[rn]:Ri,[Xn]:Xn},d=new Wn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ke},radius:{value:4}},vertexShader:xy,fragmentShader:yy}),p=d.clone();p.defines.HORIZONTAL_PASS=1;let x=new Rt;x.setAttribute("position",new Gt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new ot(x,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Xi;let m=this.type;this.render=function(w,y,T){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||w.length===0)return;this.type===wd&&(Oe("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Xi);let O=n.getRenderTarget(),I=n.getActiveCubeFace(),B=n.getActiveMipmapLevel(),H=n.state;H.setBlending(qi),H.buffers.depth.getReversed()===!0?H.buffers.color.setClear(0,0,0,0):H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);let Z=m!==this.type;Z&&y.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach($=>$.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,$=w.length;D<$;D++){let R=w[D],P=R.shadow;if(P===void 0){Oe("WebGLShadowMap:",R,"has no shadow.");continue}if(P.autoUpdate===!1&&P.needsUpdate===!1)continue;s.copy(P.mapSize);let U=P.getFrameExtents();s.multiply(U),r.copy(P.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/U.x),s.x=r.x*U.x,P.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/U.y),s.y=r.y*U.y,P.mapSize.y=r.y));let k=n.state.buffers.depth.getReversed();if(P.camera._reversedDepth=k,P.map===null||Z===!0){if(P.map!==null&&(P.map.depthTexture!==null&&(P.map.depthTexture.dispose(),P.map.depthTexture=null),P.map.dispose()),this.type===ks){if(R.isPointLight){Oe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}P.map=new dn(s.x,s.y,{format:Ii,type:Ln,minFilter:nn,magFilter:nn,generateMipmaps:!1}),P.map.texture.name=R.name+".shadowMap",P.map.depthTexture=new ci(s.x,s.y,In),P.map.depthTexture.name=R.name+".shadowMapDepth",P.map.depthTexture.format=ri,P.map.depthTexture.compareFunction=null,P.map.depthTexture.minFilter=Ht,P.map.depthTexture.magFilter=Ht}else R.isPointLight?(P.map=new Xr(s.x),P.map.depthTexture=new Er(s.x,Pn)):(P.map=new dn(s.x,s.y),P.map.depthTexture=new ci(s.x,s.y,Pn)),P.map.depthTexture.name=R.name+".shadowMap",P.map.depthTexture.format=ri,this.type===Xi?(P.map.depthTexture.compareFunction=k?$l:Jl,P.map.depthTexture.minFilter=nn,P.map.depthTexture.magFilter=nn):(P.map.depthTexture.compareFunction=null,P.map.depthTexture.minFilter=Ht,P.map.depthTexture.magFilter=Ht);P.camera.updateProjectionMatrix()}P.map.isWebGLCubeRenderTarget!==!0&&(P.map.width!==s.x||P.map.height!==s.y)&&P.map.setSize(s.x,s.y);let G=P.map.isWebGLCubeRenderTarget?6:P.getViewportCount();R.isPointLight!==!0&&P.updateMatrices(R,T);let ee=(P.camera.layers.mask&4294967294)!==0?P.camera.layers:T.layers;for(let ae=0;ae<G;ae++){let Ee=P.getCamera(ae);if(R.isPointLight){let j=P.camera,ce=P.matrix,ye=R.distance||j.far;ye!==j.far&&(j.far=ye,j.updateProjectionMatrix()),Vr.setFromMatrixPosition(R.matrixWorld),j.position.copy(Vr),hh.copy(j.position),hh.add(vy[ae]),j.up.copy(Sy[ae]),j.lookAt(hh),j.updateMatrixWorld(),ce.makeTranslation(-Vr.x,-Vr.y,-Vr.z),Of.multiplyMatrices(j.projectionMatrix,j.matrixWorldInverse),P._frustum.setFromProjectionMatrix(Of,j.coordinateSystem,j.reversedDepth)}if(P.map.isWebGLCubeRenderTarget)n.setRenderTarget(P.map,ae),n.clear();else{ae===0&&(n.setRenderTarget(P.map),n.clear());let j=P.getViewport(ae);o.set(r.x*j.x,r.y*j.y,r.x*j.z,r.y*j.w),H.viewport(o)}i=P.getFrustum(ae),M(y,T,Ee,R,ee,this.type)}P.isPointLightShadow!==!0&&this.type===ks&&S(P,T),P.needsUpdate=!1}m=this.type,g.needsUpdate=!1,n.setRenderTarget(O,I,B)};function S(w,y){let T=e.update(_);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null?w.mapPass=new dn(s.x,s.y,{format:Ii,type:Ln}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),d.uniforms.shadow_pass.value=w.map.depthTexture,d.uniforms.resolution.value.set(w.map.width,w.map.height),d.uniforms.radius.value=w.radius,n.setRenderTarget(w.mapPass),n.clear(),n.renderBufferDirect(y,null,T,d,_,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value.set(w.map.width,w.map.height),p.uniforms.radius.value=w.radius,n.setRenderTarget(w.map),n.clear(),n.renderBufferDirect(y,null,T,p,_,null)}function E(w,y,T,O){let I=null,B=T.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(B!==void 0)I=B;else if(I=T.isPointLight===!0?c:a,n.localClippingEnabled&&y.clipShadows===!0&&Array.isArray(y.clippingPlanes)&&y.clippingPlanes.length!==0||y.displacementMap&&y.displacementScale!==0||y.alphaMap&&y.alphaTest>0||y.map&&y.alphaTest>0||y.alphaToCoverage===!0){let H=I.uuid,Z=y.uuid,D=l[H];D===void 0&&(D={},l[H]=D);let $=D[Z];$===void 0&&($=I.clone(),D[Z]=$,y.addEventListener("dispose",A)),I=$}if(I.visible=y.visible,I.wireframe=y.wireframe,O===ks?I.side=y.shadowSide!==null?y.shadowSide:y.side:I.side=y.shadowSide!==null?y.shadowSide:u[y.side],I.alphaMap=y.alphaMap,I.alphaTest=y.alphaToCoverage===!0?.5:y.alphaTest,I.map=y.map,I.clipShadows=y.clipShadows,I.clippingPlanes=y.clippingPlanes,I.clipIntersection=y.clipIntersection,I.displacementMap=y.displacementMap,I.displacementScale=y.displacementScale,I.displacementBias=y.displacementBias,I.wireframeLinewidth=y.wireframeLinewidth,I.linewidth=y.linewidth,T.isPointLight===!0&&I.isMeshDistanceMaterial===!0){let H=n.properties.get(I);H.light=T}return I}function M(w,y,T,O,I,B){if(w.visible===!1)return;if(w.layers.test(I)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&B===ks)&&(!w.frustumCulled||w.intersectsFrustum(i))){w.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,w.matrixWorld);let D=e.update(w),$=w.material;if(Array.isArray($)){let R=D.groups;for(let P=0,U=R.length;P<U;P++){let k=R[P],G=$[k.materialIndex];if(G&&G.visible){let ee=E(w,G,O,B);w.onBeforeShadow(n,w,y,T,D,ee,k),n.renderBufferDirect(T,null,D,ee,w,k),w.onAfterShadow(n,w,y,T,D,ee,k)}}}else if($.visible){let R=E(w,$,O,B);w.onBeforeShadow(n,w,y,T,D,R,null),n.renderBufferDirect(T,null,D,R,w,null),w.onAfterShadow(n,w,y,T,D,R,null)}}let Z=w.children;for(let D=0,$=Z.length;D<$;D++)M(Z[D],y,T,O,I,B)}function A(w){w.target.removeEventListener("dispose",A);for(let T in l){let O=l[T],I=w.target.uuid;I in O&&(O[I].dispose(),delete O[I])}}}function My(n,e){function t(){let L=!1,ne=new yt,K=null,pe=new yt(0,0,0,0);return{setMask:function(le){K!==le&&!L&&(n.colorMask(le,le,le,le),K=le)},setLocked:function(le){L=le},setClear:function(le,de,Le,Ye,oe){oe===!0&&(le*=Ye,de*=Ye,Le*=Ye),ne.set(le,de,Le,Ye),pe.equals(ne)===!1&&(n.clearColor(le,de,Le,Ye),pe.copy(ne))},reset:function(){L=!1,K=null,pe.set(-1,0,0,0)}}}function i(){let L=!1,ne=!1,K=null,pe=null,le=null;return{setReversed:function(de){if(ne!==de){let Le=e.get("EXT_clip_control");de?Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.ZERO_TO_ONE_EXT):Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.NEGATIVE_ONE_TO_ONE_EXT),ne=de;let Ye=le;le=null,this.setClear(Ye)}},getReversed:function(){return ne},setTest:function(de){de?he(n.DEPTH_TEST):Be(n.DEPTH_TEST)},setMask:function(de){K!==de&&!L&&(n.depthMask(de),K=de)},setFunc:function(de){if(ne&&(de=af[de]),pe!==de){switch(de){case Wo:n.depthFunc(n.NEVER);break;case Xo:n.depthFunc(n.ALWAYS);break;case qo:n.depthFunc(n.LESS);break;case ws:n.depthFunc(n.LEQUAL);break;case Yo:n.depthFunc(n.EQUAL);break;case Zo:n.depthFunc(n.GEQUAL);break;case Jo:n.depthFunc(n.GREATER);break;case $o:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}pe=de}},setLocked:function(de){L=de},setClear:function(de){le!==de&&(le=de,ne&&(de=1-de),n.clearDepth(de))},reset:function(){L=!1,K=null,pe=null,le=null,ne=!1}}}function s(){let L=!1,ne=null,K=null,pe=null,le=null,de=null,Le=null,Ye=null,oe=null;return{setTest:function(De){L||(De?he(n.STENCIL_TEST):Be(n.STENCIL_TEST))},setMask:function(De){ne!==De&&!L&&(n.stencilMask(De),ne=De)},setFunc:function(De,qe,ve){(K!==De||pe!==qe||le!==ve)&&(n.stencilFunc(De,qe,ve),K=De,pe=qe,le=ve)},setOp:function(De,qe,ve){(de!==De||Le!==qe||Ye!==ve)&&(n.stencilOp(De,qe,ve),de=De,Le=qe,Ye=ve)},setLocked:function(De){L=De},setClear:function(De){oe!==De&&(n.clearStencil(De),oe=De)},reset:function(){L=!1,ne=null,K=null,pe=null,le=null,de=null,Le=null,Ye=null,oe=null}}}let r=new t,o=new i,a=new s,c={},l=new WeakMap,h={},u={},d={},p=new WeakMap,x=[],_=null,g=!1,m=null,S=null,E=null,M=null,A=null,w=null,y=null,T=new We(0,0,0),O=0,I=!1,B=null,H=null,Z=null,D=null,$=null,R=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),P=!1,U=0,k=n.getParameter(n.VERSION);k.indexOf("WebGL")!==-1?(U=parseFloat(/^WebGL (\d)/.exec(k)[1]),P=U>=1):k.indexOf("OpenGL ES")!==-1&&(U=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),P=U>=2);let G=null,ee={},ae=n.getParameter(n.SCISSOR_BOX),Ee=n.getParameter(n.VIEWPORT),j=new yt().fromArray(ae),ce=new yt().fromArray(Ee);function ye(L,ne,K,pe){let le=new Uint8Array(4),de=n.createTexture();n.bindTexture(L,de),n.texParameteri(L,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(L,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Le=0;Le<K;Le++)L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY?n.texImage3D(ne,0,n.RGBA,1,1,pe,0,n.RGBA,n.UNSIGNED_BYTE,le):n.texImage2D(ne+Le,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,le);return de}let Me={};Me[n.TEXTURE_2D]=ye(n.TEXTURE_2D,n.TEXTURE_2D,1),Me[n.TEXTURE_CUBE_MAP]=ye(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Me[n.TEXTURE_2D_ARRAY]=ye(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Me[n.TEXTURE_3D]=ye(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),he(n.DEPTH_TEST),o.setFunc(ws),an(!1),vt(Rl),he(n.CULL_FACE),Vt(qi);function he(L){h[L]!==!0&&(n.enable(L),h[L]=!0)}function Be(L){h[L]!==!1&&(n.disable(L),h[L]=!1)}function st(L,ne){return d[L]!==ne?(n.bindFramebuffer(L,ne),d[L]=ne,L===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=ne),L===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=ne),!0):!1}function Ue(L,ne){let K=x,pe=!1;if(L){K=p.get(ne),K===void 0&&(K=[],p.set(ne,K));let le=L.textures;if(K.length!==le.length||K[0]!==n.COLOR_ATTACHMENT0){for(let de=0,Le=le.length;de<Le;de++)K[de]=n.COLOR_ATTACHMENT0+de;K.length=le.length,pe=!0}}else K[0]!==n.BACK&&(K[0]=n.BACK,pe=!0);pe&&n.drawBuffers(K)}function at(L){return _!==L?(n.useProgram(L),_=L,!0):!1}let ut={[Yi]:n.FUNC_ADD,[Rd]:n.FUNC_SUBTRACT,[Pd]:n.FUNC_REVERSE_SUBTRACT};ut[Id]=n.MIN,ut[Ld]=n.MAX;let $e={[Dd]:n.ZERO,[Nd]:n.ONE,[Ud]:n.SRC_COLOR,[Ll]:n.SRC_ALPHA,[Gd]:n.SRC_ALPHA_SATURATE,[Bd]:n.DST_COLOR,[Fd]:n.DST_ALPHA,[Od]:n.ONE_MINUS_SRC_COLOR,[Dl]:n.ONE_MINUS_SRC_ALPHA,[zd]:n.ONE_MINUS_DST_COLOR,[kd]:n.ONE_MINUS_DST_ALPHA,[Hd]:n.CONSTANT_COLOR,[Vd]:n.ONE_MINUS_CONSTANT_COLOR,[Wd]:n.CONSTANT_ALPHA,[Xd]:n.ONE_MINUS_CONSTANT_ALPHA};function Vt(L,ne,K,pe,le,de,Le,Ye,oe,De){if(L===qi){g===!0&&(Be(n.BLEND),g=!1);return}if(g===!1&&(he(n.BLEND),g=!0),L!==Cd){if(L!==m||De!==I){if((S!==Yi||A!==Yi)&&(n.blendEquation(n.FUNC_ADD),S=Yi,A=Yi),De)switch(L){case Bs:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Pi:n.blendFunc(n.ONE,n.ONE);break;case Pl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Il:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Fe("WebGLState: Invalid blending: ",L);break}else switch(L){case Bs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Pi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Pl:Fe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Il:Fe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Fe("WebGLState: Invalid blending: ",L);break}E=null,M=null,w=null,y=null,T.set(0,0,0),O=0,m=L,I=De}return}le=le||ne,de=de||K,Le=Le||pe,(ne!==S||le!==A)&&(n.blendEquationSeparate(ut[ne],ut[le]),S=ne,A=le),(K!==E||pe!==M||de!==w||Le!==y)&&(n.blendFuncSeparate($e[K],$e[pe],$e[de],$e[Le]),E=K,M=pe,w=de,y=Le),(Ye.equals(T)===!1||oe!==O)&&(n.blendColor(Ye.r,Ye.g,Ye.b,oe),T.copy(Ye),O=oe),m=L,I=!1}function Dt(L,ne){L.side===Xn?Be(n.CULL_FACE):he(n.CULL_FACE);let K=L.side===rn;ne&&(K=!K),an(K),L.blending===Bs&&L.transparent===!1?Vt(qi):Vt(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),o.setFunc(L.depthFunc),o.setTest(L.depthTest),o.setMask(L.depthWrite),r.setMask(L.colorWrite);let pe=L.stencilWrite;a.setTest(pe),pe&&(a.setMask(L.stencilWriteMask),a.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),a.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Ft(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?he(n.SAMPLE_ALPHA_TO_COVERAGE):Be(n.SAMPLE_ALPHA_TO_COVERAGE)}function an(L){B!==L&&(L?n.frontFace(n.CW):n.frontFace(n.CCW),B=L)}function vt(L){L!==Ed?(he(n.CULL_FACE),L!==H&&(L===Rl?n.cullFace(n.BACK):L===Ad?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Be(n.CULL_FACE),H=L}function On(L){L!==Z&&(P&&n.lineWidth(L),Z=L)}function Ft(L,ne,K){L?(he(n.POLYGON_OFFSET_FILL),(D!==ne||$!==K)&&(D=ne,$=K,o.getReversed()&&(ne=-ne,K=-K),n.polygonOffset(ne,K))):Be(n.POLYGON_OFFSET_FILL)}function gn(L){L?he(n.SCISSOR_TEST):Be(n.SCISSOR_TEST)}function _n(L){L===void 0&&(L=n.TEXTURE0+R-1),G!==L&&(n.activeTexture(L),G=L)}function xn(L,ne,K){K===void 0&&(G===null?K=n.TEXTURE0+R-1:K=G);let pe=ee[K];pe===void 0&&(pe={type:void 0,texture:void 0},ee[K]=pe),(pe.type!==L||pe.texture!==ne)&&(G!==K&&(n.activeTexture(K),G=K),n.bindTexture(L,ne||Me[L]),pe.type=L,pe.texture=ne)}function z(){let L=ee[G];L!==void 0&&L.type!==void 0&&(n.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function yn(){try{n.compressedTexImage2D(...arguments)}catch(L){Fe("WebGLState:",L)}}function _t(){try{n.compressedTexImage3D(...arguments)}catch(L){Fe("WebGLState:",L)}}function xt(){try{n.texSubImage2D(...arguments)}catch(L){Fe("WebGLState:",L)}}function xe(){try{n.texSubImage3D(...arguments)}catch(L){Fe("WebGLState:",L)}}function Nt(){try{n.compressedTexSubImage2D(...arguments)}catch(L){Fe("WebGLState:",L)}}function Ne(){try{n.compressedTexSubImage3D(...arguments)}catch(L){Fe("WebGLState:",L)}}function He(){try{n.texStorage2D(...arguments)}catch(L){Fe("WebGLState:",L)}}function C(){try{n.texStorage3D(...arguments)}catch(L){Fe("WebGLState:",L)}}function v(){try{n.texImage2D(...arguments)}catch(L){Fe("WebGLState:",L)}}function q(){try{n.texImage3D(...arguments)}catch(L){Fe("WebGLState:",L)}}function re(L){return u[L]!==void 0?u[L]:n.getParameter(L)}function ie(L,ne){u[L]!==ne&&(n.pixelStorei(L,ne),u[L]=ne)}function ue(L){j.equals(L)===!1&&(n.scissor(L.x,L.y,L.z,L.w),j.copy(L))}function ge(L){ce.equals(L)===!1&&(n.viewport(L.x,L.y,L.z,L.w),ce.copy(L))}function Q(L,ne){let K=l.get(ne);K===void 0&&(K=new WeakMap,l.set(ne,K));let pe=K.get(L);pe===void 0&&(pe=n.getUniformBlockIndex(ne,L.name),n.uniformBlockBinding(ne,pe,pe),K.set(L,pe))}function te(L,ne,K){let le=l.get(ne).get(L);c[le]!==K&&(n.bindBufferBase(n.UNIFORM_BUFFER,le,K),c[le]=K)}function fe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),h={},u={},G=null,ee={},d={},c={},p=new WeakMap,x=[],_=null,g=!1,m=null,S=null,E=null,M=null,A=null,w=null,y=null,T=new We(0,0,0),O=0,I=!1,B=null,H=null,Z=null,D=null,$=null,j.set(0,0,n.canvas.width,n.canvas.height),ce.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:he,disable:Be,bindFramebuffer:st,drawBuffers:Ue,useProgram:at,setBlending:Vt,setMaterial:Dt,setFlipSided:an,setCullFace:vt,setLineWidth:On,setPolygonOffset:Ft,setScissorTest:gn,activeTexture:_n,bindTexture:xn,unbindTexture:z,compressedTexImage2D:yn,compressedTexImage3D:_t,texImage2D:v,texImage3D:q,pixelStorei:ie,getParameter:re,updateUBOMapping:Q,uniformBlockBinding:te,texStorage2D:He,texStorage3D:C,texSubImage2D:xt,texSubImage3D:xe,compressedTexSubImage2D:Nt,compressedTexSubImage3D:Ne,scissor:ue,viewport:ge,reset:fe}}function Ty(n,e,t,i,s,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ke,h=new WeakMap,u=new Set,d,p=new WeakMap,x=new Set,_=new FinalizationRegistry(C=>x.delete(C)),g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(C,v){return g?new OffscreenCanvas(C,v):fr("canvas")}function S(C,v,q){let re=1,ie=He(C);if((ie.width>q||ie.height>q)&&(re=q/Math.max(ie.width,ie.height)),re<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let ue=Math.floor(re*ie.width),ge=Math.floor(re*ie.height);d===void 0&&(d=m(ue,ge));let Q=v?m(ue,ge):d;return Q.width=ue,Q.height=ge,Q.getContext("2d").drawImage(C,0,0,ue,ge),Oe("WebGLRenderer: Texture has been resized from ("+ie.width+"x"+ie.height+") to ("+ue+"x"+ge+")."),Q}else return"data"in C&&Oe("WebGLRenderer: Image in DataTexture is too big ("+ie.width+"x"+ie.height+")."),C;return C}function E(C){return C.generateMipmaps}function M(C){n.generateMipmap(C)}function A(C){return C.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?n.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function w(C,v,q,re,ie,ue=!1){if(C!==null){if(n[C]!==void 0)return n[C];Oe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let ge;re&&(ge=e.get("EXT_texture_norm16"),ge||Oe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=v;if(v===n.RED&&(q===n.FLOAT&&(Q=n.R32F),q===n.HALF_FLOAT&&(Q=n.R16F),q===n.UNSIGNED_BYTE&&(Q=n.R8),q===n.UNSIGNED_SHORT&&ge&&(Q=ge.R16_EXT),q===n.SHORT&&ge&&(Q=ge.R16_SNORM_EXT)),v===n.RED_INTEGER&&(q===n.UNSIGNED_BYTE&&(Q=n.R8UI),q===n.UNSIGNED_SHORT&&(Q=n.R16UI),q===n.UNSIGNED_INT&&(Q=n.R32UI),q===n.BYTE&&(Q=n.R8I),q===n.SHORT&&(Q=n.R16I),q===n.INT&&(Q=n.R32I)),v===n.RG&&(q===n.FLOAT&&(Q=n.RG32F),q===n.HALF_FLOAT&&(Q=n.RG16F),q===n.UNSIGNED_BYTE&&(Q=n.RG8),q===n.UNSIGNED_SHORT&&ge&&(Q=ge.RG16_EXT),q===n.SHORT&&ge&&(Q=ge.RG16_SNORM_EXT)),v===n.RG_INTEGER&&(q===n.UNSIGNED_BYTE&&(Q=n.RG8UI),q===n.UNSIGNED_SHORT&&(Q=n.RG16UI),q===n.UNSIGNED_INT&&(Q=n.RG32UI),q===n.BYTE&&(Q=n.RG8I),q===n.SHORT&&(Q=n.RG16I),q===n.INT&&(Q=n.RG32I)),v===n.RGB_INTEGER&&(q===n.UNSIGNED_BYTE&&(Q=n.RGB8UI),q===n.UNSIGNED_SHORT&&(Q=n.RGB16UI),q===n.UNSIGNED_INT&&(Q=n.RGB32UI),q===n.BYTE&&(Q=n.RGB8I),q===n.SHORT&&(Q=n.RGB16I),q===n.INT&&(Q=n.RGB32I)),v===n.RGBA_INTEGER&&(q===n.UNSIGNED_BYTE&&(Q=n.RGBA8UI),q===n.UNSIGNED_SHORT&&(Q=n.RGBA16UI),q===n.UNSIGNED_INT&&(Q=n.RGBA32UI),q===n.BYTE&&(Q=n.RGBA8I),q===n.SHORT&&(Q=n.RGBA16I),q===n.INT&&(Q=n.RGBA32I)),v===n.RGB&&(q===n.UNSIGNED_SHORT&&ge&&(Q=ge.RGB16_EXT),q===n.SHORT&&ge&&(Q=ge.RGB16_SNORM_EXT),q===n.UNSIGNED_INT_5_9_9_9_REV&&(Q=n.RGB9_E5),q===n.UNSIGNED_INT_10F_11F_11F_REV&&(Q=n.R11F_G11F_B10F)),v===n.RGBA){let te=ue?dr:Qe.getTransfer(ie);q===n.FLOAT&&(Q=n.RGBA32F),q===n.HALF_FLOAT&&(Q=n.RGBA16F),q===n.UNSIGNED_BYTE&&(Q=te===rt?n.SRGB8_ALPHA8:n.RGBA8),q===n.UNSIGNED_SHORT&&ge&&(Q=ge.RGBA16_EXT),q===n.SHORT&&ge&&(Q=ge.RGBA16_SNORM_EXT),q===n.UNSIGNED_SHORT_4_4_4_4&&(Q=n.RGBA4),q===n.UNSIGNED_SHORT_5_5_5_1&&(Q=n.RGB5_A1)}return(Q===n.R16F||Q===n.R32F||Q===n.RG16F||Q===n.RG32F||Q===n.RGBA16F||Q===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function y(C,v){let q;return C?v===null||v===Pn||v===Ji?q=n.DEPTH24_STENCIL8:v===In?q=n.DEPTH32F_STENCIL8:v===Gs&&(q=n.DEPTH24_STENCIL8,Oe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Pn||v===Ji?q=n.DEPTH_COMPONENT24:v===In?q=n.DEPTH_COMPONENT32F:v===Gs&&(q=n.DEPTH_COMPONENT16),q}function T(C,v){return E(C)===!0||C.isFramebufferTexture&&C.minFilter!==Ht&&C.minFilter!==nn?Math.log2(Math.max(v.width,v.height))+1:C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?v.mipmaps.length:1}function O(C){let v=new WeakRef(C);i.get(C).__ref=v,x.add(v),_.register(C,v,v)}function I(C){let v=i.get(C).__ref;v!==void 0&&(x.delete(v),_.unregister(v))}function B(C){Z(C.target)}function H(C){D(C.target)}function Z(C){C.removeEventListener("dispose",B),I(C),R(C),C.isVideoTexture&&h.delete(C),C.isHTMLTexture&&u.delete(C)}function D(C){C.removeEventListener("dispose",H),I(C),U(C)}function $(){for(let C of x){let v=C.deref();v!==void 0&&(v.isRenderTarget===!0?D(v):Z(v))}x.clear(),u.clear()}function R(C){let v=i.get(C);if(v.__webglInit===void 0)return;let q=C.source,re=p.get(q);if(re){let ie=re[v.__cacheKey];ie.usedTimes--,ie.usedTimes===0&&P(C),Object.keys(re).length===0&&p.delete(q)}i.remove(C)}function P(C){let v=i.get(C);n.deleteTexture(v.__webglTexture);let q=C.source,re=p.get(q);delete re[v.__cacheKey],o.memory.textures--}function U(C){let v=i.get(C);v.__depthDisposeCallback&&v.__depthDisposeCallback();let q=C.depthTexture;if(q&&q.renderTarget===C&&Z(q),C.isWebGLCubeRenderTarget)for(let ie=0;ie<6;ie++){if(Array.isArray(v.__webglFramebuffer[ie]))for(let ue=0;ue<v.__webglFramebuffer[ie].length;ue++)n.deleteFramebuffer(v.__webglFramebuffer[ie][ue]);else n.deleteFramebuffer(v.__webglFramebuffer[ie]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[ie])}else{if(Array.isArray(v.__webglFramebuffer))for(let ie=0;ie<v.__webglFramebuffer.length;ie++)n.deleteFramebuffer(v.__webglFramebuffer[ie]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let ie=0;ie<v.__webglColorRenderbuffer.length;ie++)v.__webglColorRenderbuffer[ie]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[ie]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let re=C.textures;for(let ie=0,ue=re.length;ie<ue;ie++){let ge=i.get(re[ie]);ge.__webglTexture&&(n.deleteTexture(ge.__webglTexture),o.memory.textures--),i.remove(re[ie])}i.remove(C)}let k=0;function G(){k=0}function ee(){return k}function ae(C){k=C}function Ee(){let C=k;return C>=s.maxTextures&&Oe("WebGLTextures: Trying to use "+(C+1)+" texture units while this GPU supports only "+s.maxTextures),k+=1,C}function j(C){let v=[];return v.push(C.wrapS),v.push(C.wrapT),v.push(C.wrapR||0),v.push(C.magFilter),v.push(C.minFilter),v.push(C.anisotropy),v.push(C.internalFormat),v.push(C.format),v.push(C.type),v.push(C.generateMipmaps),v.push(C.mipmapsAutoUpdate),v.push(C.premultiplyAlpha),v.push(C.flipY),v.push(C.unpackAlignment),v.push(C.colorSpace),v.join()}function ce(C,v){let q=i.get(C);if(C.isVideoTexture&&Nt(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&q.__version!==C.version){let re=C.image;if(re===null)Oe("WebGLRenderer: Texture marked for update but no image data found.");else if(re.complete===!1)Oe("WebGLRenderer: Texture marked for update but image is incomplete");else{Dt(q,C,v);return}}else C.isExternalTexture&&(q.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,q.__webglTexture,n.TEXTURE0+v)}function ye(C,v){let q=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&q.__version!==C.version){Dt(q,C,v);return}else C.isExternalTexture&&(q.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,q.__webglTexture,n.TEXTURE0+v)}function Me(C,v){let q=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&q.__version!==C.version){Dt(q,C,v);return}t.bindTexture(n.TEXTURE_3D,q.__webglTexture,n.TEXTURE0+v)}function he(C,v){let q=i.get(C);if(C.version>0&&q.__version!==C.version){an(q,C,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture,n.TEXTURE0+v)}let Be={[Cs]:n.REPEAT,[kn]:n.CLAMP_TO_EDGE,[jo]:n.MIRRORED_REPEAT},st={[Ht]:n.NEAREST,[Zd]:n.NEAREST_MIPMAP_NEAREST,[Or]:n.NEAREST_MIPMAP_LINEAR,[nn]:n.LINEAR,[Ma]:n.LINEAR_MIPMAP_NEAREST,[hi]:n.LINEAR_MIPMAP_LINEAR},Ue={[Kd]:n.NEVER,[jl]:n.ALWAYS,[Qd]:n.LESS,[Jl]:n.LEQUAL,[ef]:n.EQUAL,[$l]:n.GEQUAL,[tf]:n.GREATER,[nf]:n.NOTEQUAL};function at(C,v){if(v.type===In&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===nn||v.magFilter===Ma||v.magFilter===Or||v.magFilter===hi||v.minFilter===nn||v.minFilter===Ma||v.minFilter===Or||v.minFilter===hi)&&Oe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(C,n.TEXTURE_WRAP_S,Be[v.wrapS]),n.texParameteri(C,n.TEXTURE_WRAP_T,Be[v.wrapT]),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,Be[v.wrapR]),n.texParameteri(C,n.TEXTURE_MAG_FILTER,st[v.magFilter]),n.texParameteri(C,n.TEXTURE_MIN_FILTER,st[v.minFilter]),v.compareFunction&&(n.texParameteri(C,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(C,n.TEXTURE_COMPARE_FUNC,Ue[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Ht||v.minFilter!==Or&&v.minFilter!==hi||v.type===In&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){let q=e.get("EXT_texture_filter_anisotropic");n.texParameterf(C,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function ut(C,v){let q=!1;C.__webglInit===void 0&&(C.__webglInit=!0,v.addEventListener("dispose",B),O(v));let re=v.source,ie=p.get(re);ie===void 0&&(ie={},p.set(re,ie));let ue=j(v);if(ue!==C.__cacheKey){ie[ue]===void 0&&(ie[ue]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,q=!0),ie[ue].usedTimes++;let ge=ie[C.__cacheKey];ge!==void 0&&(ie[C.__cacheKey].usedTimes--,ge.usedTimes===0&&P(v)),C.__cacheKey=ue,C.__webglTexture=ie[ue].texture}return q}function $e(C,v,q){return Math.floor(Math.floor(C/q)/v)}function Vt(C,v,q,re){let ue=C.updateRanges;if(ue.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,v.width,v.height,q,re,v.data);else{ue.sort((L,ne)=>L.start-ne.start);let ge=0;for(let L=1;L<ue.length;L++){let ne=ue[ge],K=ue[L],pe=ne.start+ne.count,le=$e(K.start,v.width,4),de=$e(ne.start,v.width,4);K.start<=pe+1&&le===de&&$e(K.start+K.count-1,v.width,4)===le?ne.count=Math.max(ne.count,K.start+K.count-ne.start):(++ge,ue[ge]=K)}ue.length=ge+1;let Q=t.getParameter(n.UNPACK_ROW_LENGTH),te=t.getParameter(n.UNPACK_SKIP_PIXELS),fe=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,v.width);for(let L=0,ne=ue.length;L<ne;L++){let K=ue[L],pe=Math.floor(K.start/4),le=Math.ceil(K.count/4),de=pe%v.width,Le=Math.floor(pe/v.width),Ye=le,oe=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,de),t.pixelStorei(n.UNPACK_SKIP_ROWS,Le),t.texSubImage2D(n.TEXTURE_2D,0,de,Le,Ye,oe,q,re,v.data)}C.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,Q),t.pixelStorei(n.UNPACK_SKIP_PIXELS,te),t.pixelStorei(n.UNPACK_SKIP_ROWS,fe)}}function Dt(C,v,q){let re=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(re=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(re=n.TEXTURE_3D);let ie=ut(C,v),ue=v.source;t.bindTexture(re,C.__webglTexture,n.TEXTURE0+q);let ge=i.get(ue);if(ue.version!==ge.__version||ie===!0){if(t.activeTexture(n.TEXTURE0+q),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){let oe=Qe.getPrimaries(Qe.workingColorSpace),De=v.colorSpace===di?null:Qe.getPrimaries(v.colorSpace),qe=v.colorSpace===di||oe===De?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,qe)}t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment);let te=S(v.image,!1,s.maxTextureSize);te=Ne(v,te);let fe=r.convert(v.format,v.colorSpace),L=r.convert(v.type),ne=w(v.internalFormat,fe,L,v.normalized,v.colorSpace,v.isVideoTexture);at(re,v);let K,pe=v.mipmaps,le=v.isVideoTexture!==!0,de=ge.__version===void 0||ie===!0,Le=ue.dataReady,Ye=T(v,te);if(v.isDepthTexture)ne=y(v.format===ui,v.type),de&&(le?t.texStorage2D(n.TEXTURE_2D,1,ne,te.width,te.height):t.texImage2D(n.TEXTURE_2D,0,ne,te.width,te.height,0,fe,L,null));else if(v.isDataTexture)if(pe.length>0){le&&de&&t.texStorage2D(n.TEXTURE_2D,Ye,ne,pe[0].width,pe[0].height);for(let oe=0,De=pe.length;oe<De;oe++)K=pe[oe],le?Le&&t.texSubImage2D(n.TEXTURE_2D,oe,0,0,K.width,K.height,fe,L,K.data):t.texImage2D(n.TEXTURE_2D,oe,ne,K.width,K.height,0,fe,L,K.data);v.generateMipmaps=!1}else le?(de&&t.texStorage2D(n.TEXTURE_2D,Ye,ne,te.width,te.height),Le&&Vt(v,te,fe,L)):t.texImage2D(n.TEXTURE_2D,0,ne,te.width,te.height,0,fe,L,te.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){le&&de&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ye,ne,pe[0].width,pe[0].height,te.depth);for(let oe=0,De=pe.length;oe<De;oe++)if(K=pe[oe],v.format!==Dn)if(fe!==null)if(le){if(Le)if(v.layerUpdates.size>0){let qe=ih(K.width,K.height,v.format,v.type);for(let ve of v.layerUpdates){let ct=K.data.subarray(ve*qe/K.data.BYTES_PER_ELEMENT,(ve+1)*qe/K.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,oe,0,0,ve,K.width,K.height,1,fe,ct)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,oe,0,0,0,K.width,K.height,te.depth,fe,K.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,oe,ne,K.width,K.height,te.depth,0,K.data,0,0);else Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else le?Le&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,oe,0,0,0,K.width,K.height,te.depth,fe,L,K.data):t.texImage3D(n.TEXTURE_2D_ARRAY,oe,ne,K.width,K.height,te.depth,0,fe,L,K.data);v.layerUpdates.size>0&&v.clearLayerUpdates()}else{le&&de&&t.texStorage2D(n.TEXTURE_2D,Ye,ne,pe[0].width,pe[0].height);for(let oe=0,De=pe.length;oe<De;oe++)K=pe[oe],v.format!==Dn?fe!==null?le?Le&&t.compressedTexSubImage2D(n.TEXTURE_2D,oe,0,0,K.width,K.height,fe,K.data):t.compressedTexImage2D(n.TEXTURE_2D,oe,ne,K.width,K.height,0,K.data):Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):le?Le&&t.texSubImage2D(n.TEXTURE_2D,oe,0,0,K.width,K.height,fe,L,K.data):t.texImage2D(n.TEXTURE_2D,oe,ne,K.width,K.height,0,fe,L,K.data)}else if(v.isDataArrayTexture)if(le){if(de&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ye,ne,te.width,te.height,te.depth),Le)if(v.layerUpdates.size>0){let oe=ih(te.width,te.height,v.format,v.type);for(let De of v.layerUpdates){let qe=te.data.subarray(De*oe/te.data.BYTES_PER_ELEMENT,(De+1)*oe/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,De,te.width,te.height,1,fe,L,qe)}v.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,fe,L,te.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,ne,te.width,te.height,te.depth,0,fe,L,te.data);else if(v.isData3DTexture)le?(de&&t.texStorage3D(n.TEXTURE_3D,Ye,ne,te.width,te.height,te.depth),Le&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,fe,L,te.data)):t.texImage3D(n.TEXTURE_3D,0,ne,te.width,te.height,te.depth,0,fe,L,te.data);else if(v.isFramebufferTexture){if(de)if(le)t.texStorage2D(n.TEXTURE_2D,Ye,ne,te.width,te.height);else{let oe=te.width,De=te.height;for(let qe=0;qe<Ye;qe++)t.texImage2D(n.TEXTURE_2D,qe,ne,oe,De,0,fe,L,null),oe>>=1,De>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in n){let oe=n.canvas;if(oe.hasAttribute("layoutsubtree")||oe.setAttribute("layoutsubtree","true"),te.parentNode!==oe){oe.appendChild(te),u.add(v),oe.onpaint=De=>{let qe=De.changedElements;for(let ve of u)qe.includes(ve.image)&&(ve.needsUpdate=!0)},oe.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,te);else{let qe=n.RGBA,ve=n.RGBA,ct=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,qe,ve,ct,te)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(pe.length>0){if(le&&de){let oe=He(pe[0]);t.texStorage2D(n.TEXTURE_2D,Ye,ne,oe.width,oe.height)}for(let oe=0,De=pe.length;oe<De;oe++)K=pe[oe],le?Le&&t.texSubImage2D(n.TEXTURE_2D,oe,0,0,fe,L,K):t.texImage2D(n.TEXTURE_2D,oe,ne,fe,L,K);v.generateMipmaps=!1}else if(le){if(de){let oe=He(te);t.texStorage2D(n.TEXTURE_2D,Ye,ne,oe.width,oe.height)}Le&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,fe,L,te)}else t.texImage2D(n.TEXTURE_2D,0,ne,fe,L,te);E(v)&&v.mipmapsAutoUpdate===!0&&M(re),ge.__version=ue.version,v.onUpdate&&v.onUpdate(v)}C.__version=v.version}function an(C,v,q){if(v.image.length!==6)return;let re=ut(C,v),ie=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,C.__webglTexture,n.TEXTURE0+q);let ue=i.get(ie);if(ie.version!==ue.__version||re===!0){t.activeTexture(n.TEXTURE0+q);let ge=Qe.getPrimaries(Qe.workingColorSpace),Q=v.colorSpace===di?null:Qe.getPrimaries(v.colorSpace),te=v.colorSpace===di||ge===Q?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);let fe=v.isCompressedTexture||v.image[0].isCompressedTexture,L=v.image[0]&&v.image[0].isDataTexture,ne=[];for(let ve=0;ve<6;ve++)!fe&&!L?ne[ve]=S(v.image[ve],!0,s.maxCubemapSize):ne[ve]=L?v.image[ve].image:v.image[ve],ne[ve]=Ne(v,ne[ve]);let K=ne[0],pe=r.convert(v.format,v.colorSpace),le=r.convert(v.type),de=w(v.internalFormat,pe,le,v.normalized,v.colorSpace),Le=v.isVideoTexture!==!0,Ye=ue.__version===void 0||re===!0,oe=ie.dataReady,De=T(v,K);at(n.TEXTURE_CUBE_MAP,v);let qe;if(v.isDepthTexture){if(de=y(v.format===ui,v.type),Ye)if(Le)t.texStorage2D(n.TEXTURE_CUBE_MAP,1,de,K.width,K.height);else for(let ve=0;ve<6;ve++)t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,de,K.width,K.height,0,pe,le,null)}else if(fe){Le&&Ye&&t.texStorage2D(n.TEXTURE_CUBE_MAP,De,de,K.width,K.height);for(let ve=0;ve<6;ve++){qe=ne[ve].mipmaps;for(let ct=0;ct<qe.length;ct++){let kt=qe[ct];v.format!==Dn?pe!==null?Le?oe&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,ct,0,0,kt.width,kt.height,pe,kt.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,ct,de,kt.width,kt.height,0,kt.data):Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Le?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,ct,0,0,kt.width,kt.height,pe,le,kt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,ct,de,kt.width,kt.height,0,pe,le,kt.data)}}}else{if(qe=v.mipmaps,Le&&Ye){qe.length>0&&De++;let ve=He(ne[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,De,de,ve.width,ve.height)}for(let ve=0;ve<6;ve++)if(L){Le?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,0,0,ne[ve].width,ne[ve].height,pe,le,ne[ve].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,de,ne[ve].width,ne[ve].height,0,pe,le,ne[ve].data);for(let ct=0;ct<qe.length;ct++){let mi=qe[ct].image[ve].image;Le?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,ct+1,0,0,mi.width,mi.height,pe,le,mi.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,ct+1,de,mi.width,mi.height,0,pe,le,mi.data)}}else{Le?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,0,0,pe,le,ne[ve]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,de,pe,le,ne[ve]);for(let ct=0;ct<qe.length;ct++){let kt=qe[ct];Le?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,ct+1,0,0,pe,le,kt.image[ve]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,ct+1,de,pe,le,kt.image[ve])}}}E(v)&&v.mipmapsAutoUpdate===!0&&M(n.TEXTURE_CUBE_MAP),ue.__version=ie.version,v.onUpdate&&v.onUpdate(v)}C.__version=v.version}function vt(C,v,q,re,ie,ue){let ge=r.convert(q.format,q.colorSpace),Q=r.convert(q.type),te=w(q.internalFormat,ge,Q,q.normalized,q.colorSpace),fe=i.get(v),L=i.get(q);if(L.__renderTarget=v,!fe.__hasExternalTextures){let ne=Math.max(1,v.width>>ue),K=Math.max(1,v.height>>ue);ie===n.TEXTURE_3D||ie===n.TEXTURE_2D_ARRAY?t.texImage3D(ie,ue,te,ne,K,v.depth,0,ge,Q,null):t.texImage2D(ie,ue,te,ne,K,0,ge,Q,null)}t.bindFramebuffer(n.FRAMEBUFFER,C),xe(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,re,ie,L.__webglTexture,0,xt(v)):(ie===n.TEXTURE_2D||ie>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ie<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,re,ie,L.__webglTexture,ue),t.bindFramebuffer(n.FRAMEBUFFER,null)}function On(C,v,q){if(n.bindRenderbuffer(n.RENDERBUFFER,C),v.depthBuffer){let re=v.depthTexture,ie=re&&re.isDepthTexture?re.type:null,ue=y(v.stencilBuffer,ie),ge=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;xe(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,xt(v),ue,v.width,v.height):q?n.renderbufferStorageMultisample(n.RENDERBUFFER,xt(v),ue,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,ue,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ge,n.RENDERBUFFER,C)}else{let re=v.textures;for(let ie=0;ie<re.length;ie++){let ue=re[ie],ge=r.convert(ue.format,ue.colorSpace),Q=r.convert(ue.type),te=w(ue.internalFormat,ge,Q,ue.normalized,ue.colorSpace);xe(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,xt(v),te,v.width,v.height):q?n.renderbufferStorageMultisample(n.RENDERBUFFER,xt(v),te,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,te,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ft(C,v,q){let re=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,C),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let ie=i.get(v.depthTexture);ie.__renderTarget=v;let ue=re?v.depthTexture.image[0]:v.depthTexture.image;(!ie.__webglTexture||ue.width!==v.width||ue.height!==v.height)&&(ue.width=v.width,ue.height=v.height,v.depthTexture.needsUpdate=!0),re?he(v.depthTexture,0):ce(v.depthTexture,0);let ge=ie.__webglTexture,Q=xt(v),te=re?n.TEXTURE_CUBE_MAP_POSITIVE_X+q:n.TEXTURE_2D,fe=v.depthTexture.format===ui?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(v.depthTexture.format===ri)xe(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,fe,te,ge,0,Q):n.framebufferTexture2D(n.FRAMEBUFFER,fe,te,ge,0);else if(v.depthTexture.format===ui)xe(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,fe,te,ge,0,Q):n.framebufferTexture2D(n.FRAMEBUFFER,fe,te,ge,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function gn(C){let v=i.get(C),q=C.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==C.depthTexture){let re=C.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),re){let ie=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,re.removeEventListener("dispose",ie)};re.addEventListener("dispose",ie),v.__depthDisposeCallback=ie}v.__boundDepthTexture=re}if(C.depthTexture&&!v.__autoAllocateDepthBuffer)if(q)for(let re=0;re<6;re++)Ft(v.__webglFramebuffer[re],C,re);else C.texture.mipmaps.length>0?Ft(v.__webglFramebuffer[0],C,0):Ft(v.__webglFramebuffer,C,0);else if(q){v.__webglDepthbuffer=[];for(let re=0;re<6;re++)if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[re]),v.__webglDepthbuffer[re]===void 0)v.__webglDepthbuffer[re]=n.createRenderbuffer(),On(v.__webglDepthbuffer[re],C,!1);else{let ie=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ue=v.__webglDepthbuffer[re];n.bindRenderbuffer(n.RENDERBUFFER,ue),n.framebufferRenderbuffer(n.FRAMEBUFFER,ie,n.RENDERBUFFER,ue)}}else if(C.texture.mipmaps.length>0?t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),On(v.__webglDepthbuffer,C,!1);else{let ie=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ue=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ue),n.framebufferRenderbuffer(n.FRAMEBUFFER,ie,n.RENDERBUFFER,ue)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function _n(C,v,q){let re=i.get(C);v!==void 0&&vt(re.__webglFramebuffer,C,C.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),q!==void 0&&gn(C)}function xn(C){let v=C.texture,q=i.get(C),re=i.get(v);C.addEventListener("dispose",H),O(C);let ie=C.textures,ue=C.isWebGLCubeRenderTarget===!0,ge=ie.length>1;if(ge||(re.__webglTexture===void 0&&(re.__webglTexture=n.createTexture()),re.__version=v.version,o.memory.textures++),ue){q.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(v.mipmaps.length>0){q.__webglFramebuffer[Q]=[];for(let te=0;te<v.mipmaps.length;te++)q.__webglFramebuffer[Q][te]=n.createFramebuffer()}else q.__webglFramebuffer[Q]=n.createFramebuffer()}else{if(v.mipmaps.length>0){q.__webglFramebuffer=[];for(let Q=0;Q<v.mipmaps.length;Q++)q.__webglFramebuffer[Q]=n.createFramebuffer()}else q.__webglFramebuffer=n.createFramebuffer();if(ge)for(let Q=0,te=ie.length;Q<te;Q++){let fe=i.get(ie[Q]);fe.__webglTexture===void 0&&(fe.__webglTexture=n.createTexture(),o.memory.textures++)}if(C.samples>0&&xe(C)===!1){q.__webglMultisampledFramebuffer=n.createFramebuffer(),q.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let Q=0;Q<ie.length;Q++){let te=ie[Q];q.__webglColorRenderbuffer[Q]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,q.__webglColorRenderbuffer[Q]);let fe=r.convert(te.format,te.colorSpace),L=r.convert(te.type),ne=w(te.internalFormat,fe,L,te.normalized,te.colorSpace,C.isXRRenderTarget===!0),K=xt(C);n.renderbufferStorageMultisample(n.RENDERBUFFER,K,ne,C.width,C.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Q,n.RENDERBUFFER,q.__webglColorRenderbuffer[Q])}n.bindRenderbuffer(n.RENDERBUFFER,null),C.depthBuffer&&(q.__webglDepthRenderbuffer=n.createRenderbuffer(),On(q.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ue){t.bindTexture(n.TEXTURE_CUBE_MAP,re.__webglTexture),at(n.TEXTURE_CUBE_MAP,v);for(let Q=0;Q<6;Q++)if(v.mipmaps.length>0)for(let te=0;te<v.mipmaps.length;te++)vt(q.__webglFramebuffer[Q][te],C,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,te);else vt(q.__webglFramebuffer[Q],C,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);E(v)?M(n.TEXTURE_CUBE_MAP):v.mipmaps.length>0&&n.texParameteri(n.TEXTURE_CUBE_MAP,n.TEXTURE_MAX_LEVEL,v.mipmaps.length-1),t.unbindTexture()}else if(ge){for(let Q=0,te=ie.length;Q<te;Q++){let fe=ie[Q],L=i.get(fe),ne=n.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ne=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ne,L.__webglTexture),at(ne,fe),vt(q.__webglFramebuffer,C,fe,n.COLOR_ATTACHMENT0+Q,ne,0),E(fe)&&M(ne)}t.unbindTexture()}else{let Q=n.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(Q=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Q,re.__webglTexture),at(Q,v),v.mipmaps.length>0)for(let te=0;te<v.mipmaps.length;te++)vt(q.__webglFramebuffer[te],C,v,n.COLOR_ATTACHMENT0,Q,te);else vt(q.__webglFramebuffer,C,v,n.COLOR_ATTACHMENT0,Q,0);E(v)?M(Q):v.mipmaps.length>0&&n.texParameteri(Q,n.TEXTURE_MAX_LEVEL,v.mipmaps.length-1),t.unbindTexture()}C.depthBuffer&&gn(C)}function z(C){let v=C.textures;for(let q=0,re=v.length;q<re;q++){let ie=v[q];if(E(ie)&&ie.mipmapsAutoUpdate===!0){let ue=A(C),ge=i.get(ie).__webglTexture;t.bindTexture(ue,ge),M(ue),t.unbindTexture()}}}let yn=[];function _t(C){if(C.samples>0){if(xe(C)===!1){let v=C.textures,q=C.width,re=C.height,ie=n.COLOR_BUFFER_BIT,ue=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ge=i.get(C),Q=v.length>1;if(Q)for(let fe=0;fe<v.length;fe++)t.bindFramebuffer(n.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ge.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ge.__webglMultisampledFramebuffer),C.texture.mipmaps.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ge.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ge.__webglFramebuffer);for(let fe=0;fe<v.length;fe++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(ie|=n.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(ie|=n.STENCIL_BUFFER_BIT)),Q){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ge.__webglColorRenderbuffer[fe]);let L=i.get(v[fe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,L,0)}n.blitFramebuffer(0,0,q,re,0,0,q,re,ie,n.NEAREST),c===!0&&(yn.length=0,yn.push(n.COLOR_ATTACHMENT0+fe),C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&yn.push(ue),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,yn))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Q)for(let fe=0;fe<v.length;fe++){t.bindFramebuffer(n.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.RENDERBUFFER,ge.__webglColorRenderbuffer[fe]);let L=i.get(v[fe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ge.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.TEXTURE_2D,L,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ge.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&c){let v=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function xt(C){return Math.min(s.maxSamples,C.samples)}function xe(C){let v=i.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function Nt(C){let v=o.render.frame;h.get(C)!==v&&(h.set(C,v),C.update())}function Ne(C,v){let q=C.colorSpace,re=C.format,ie=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||q!==ur&&q!==di&&(Qe.getTransfer(q)===rt?(re!==Dn||ie!==cn)&&Oe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Fe("WebGLTextures: Unsupported texture color space:",q)),v}function He(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=Ee,this.resetTextureUnits=G,this.getTextureUnits=ee,this.setTextureUnits=ae,this.setTexture2D=ce,this.setTexture2DArray=ye,this.setTexture3D=Me,this.setTextureCube=he,this.rebindTextures=_n,this.setupRenderTarget=xn,this.updateRenderTargetMipmap=z,this.updateMultisampleRenderTarget=_t,this.setupDepthRenderbuffer=gn,this.setupFrameBufferTexture=vt,this.useMultisampledRTT=xe,this.dispose=$}function Ey(n,e){function t(i,s=di){let r,o=Qe.getTransfer(s);if(i===cn)return n.UNSIGNED_BYTE;if(i===Ea)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Aa)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Wl)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Xl)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Hl)return n.BYTE;if(i===Vl)return n.SHORT;if(i===Gs)return n.UNSIGNED_SHORT;if(i===Ta)return n.INT;if(i===Pn)return n.UNSIGNED_INT;if(i===In)return n.FLOAT;if(i===Ln)return n.HALF_FLOAT;if(i===ql)return n.ALPHA;if(i===Yl)return n.RGB;if(i===Dn)return n.RGBA;if(i===ri)return n.DEPTH_COMPONENT;if(i===ui)return n.DEPTH_STENCIL;if(i===Zl)return n.RED;if(i===wa)return n.RED_INTEGER;if(i===Ii)return n.RG;if(i===Ca)return n.RG_INTEGER;if(i===Ra)return n.RGBA_INTEGER;if(i===Fr||i===kr||i===Br||i===zr)if(o===rt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Fr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===kr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Br)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===zr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Fr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===kr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Br)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===zr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Pa||i===Ia||i===La||i===Da)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Pa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ia)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===La)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Da)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Na||i===Ua||i===Oa||i===Fa||i===ka||i===Gr||i===Ba)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Na||i===Ua)return o===rt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Oa)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Fa)return r.COMPRESSED_R11_EAC;if(i===ka)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Gr)return r.COMPRESSED_RG11_EAC;if(i===Ba)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===za||i===Ga||i===Ha||i===Va||i===Wa||i===Xa||i===qa||i===Ya||i===Za||i===Ja||i===$a||i===ja||i===Ka||i===Qa)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===za)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ga)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ha)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Va)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Wa)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Xa)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===qa)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ya)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Za)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ja)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===$a)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ja)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ka)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Qa)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ec||i===tc||i===nc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===ec)return o===rt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===tc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===nc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===ic||i===sc||i===Hr||i===rc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===ic)return r.COMPRESSED_RED_RGTC1_EXT;if(i===sc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Hr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===rc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ji?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var Ay=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,wy=`
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

}`,_h=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new Ar(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new Wn({vertexShader:Ay,fragmentShader:wy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ot(new Ei(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},xh=class extends Bn{constructor(e,t){super();let i=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,p=null,x=null,_=typeof XRWebGLBinding<"u",g=new _h,m={},S=t.getContextAttributes(),E=null,M=null,A=[],w=[],y=new ke,T=null,O=null,I=new Xt;I.viewport=new yt;let B=new Xt;B.viewport=new yt;let H=[I,B],Z=new xa,D=null,$=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let ce=A[j];return ce===void 0&&(ce=new Ls,A[j]=ce),ce.getTargetRaySpace()},this.getControllerGrip=function(j){let ce=A[j];return ce===void 0&&(ce=new Ls,A[j]=ce),ce.getGripSpace()},this.getHand=function(j){let ce=A[j];return ce===void 0&&(ce=new Ls,A[j]=ce),ce.getHandSpace()};function R(j){let ce=w.indexOf(j.inputSource);if(ce===-1)return;let ye=A[ce];ye!==void 0&&(ye.update(j.inputSource,j.frame,l||o),ye.dispatchEvent({type:j.type,data:j.inputSource}))}function P(){s.removeEventListener("select",R),s.removeEventListener("selectstart",R),s.removeEventListener("selectend",R),s.removeEventListener("squeeze",R),s.removeEventListener("squeezestart",R),s.removeEventListener("squeezeend",R),s.removeEventListener("end",P),s.removeEventListener("inputsourceschange",U);for(let j=0;j<A.length;j++){let ce=w[j];ce!==null&&(w[j]=null,A[j].disconnect(ce))}D=null,$=null,g.reset();for(let j in m)delete m[j];if(e.setRenderTarget(E),p=null,d=null,u=null,s=null,M=null,Ee.stop(),i.isPresenting=!1,e.setPixelRatio(T),e.setSize(y.width,y.height,!1),O!==null){let j=O.camera;j.fov=O.fov,j.zoom=O.zoom,j.updateProjectionMatrix(),O=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,i.isPresenting===!0&&Oe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,i.isPresenting===!0&&Oe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(j){l=j},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(E=e.getRenderTarget(),s.addEventListener("select",R),s.addEventListener("selectstart",R),s.addEventListener("selectend",R),s.addEventListener("squeeze",R),s.addEventListener("squeezestart",R),s.addEventListener("squeezeend",R),s.addEventListener("end",P),s.addEventListener("inputsourceschange",U),S.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(y),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let ye=null,Me=null,he=null;S.depth&&(he=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ye=S.stencil?ui:ri,Me=S.stencil?Ji:Pn);let Be={colorFormat:t.RGBA8,depthFormat:he,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(Be),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),M=new dn(d.textureWidth,d.textureHeight,{format:Dn,type:cn,depthTexture:new ci(d.textureWidth,d.textureHeight,Me,void 0,void 0,void 0,void 0,void 0,void 0,ye),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let ye={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,ye),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),M=new dn(p.framebufferWidth,p.framebufferHeight,{format:Dn,type:cn,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Ee.setContext(s),Ee.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function U(j){for(let ce=0;ce<j.removed.length;ce++){let ye=j.removed[ce],Me=w.indexOf(ye);Me>=0&&(w[Me]=null,A[Me].disconnect(ye))}for(let ce=0;ce<j.added.length;ce++){let ye=j.added[ce],Me=w.indexOf(ye);if(Me===-1){for(let Be=0;Be<A.length;Be++)if(Be>=w.length){w.push(ye),Me=Be;break}else if(w[Be]===null){w[Be]=ye,Me=Be;break}if(Me===-1)break}let he=A[Me];he&&he.connect(ye)}}function k(j,ce){ce===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(ce.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let ce=j.near,ye=j.far;g.texture!==null&&(g.depthNear>0&&(ce=g.depthNear),g.depthFar>0&&(ye=g.depthFar)),Z.near=B.near=I.near=ce,Z.far=B.far=I.far=ye,(D!==Z.near||$!==Z.far)&&(s.updateRenderState({depthNear:Z.near,depthFar:Z.far}),D=Z.near,$=Z.far),Z.layers.mask=j.layers.mask|6,I.layers.mask=Z.layers.mask&-5,B.layers.mask=Z.layers.mask&-3;let Me=j.parent,he=Z.cameras;k(Z,Me);for(let Be=0;Be<he.length;Be++)k(he[Be],Me);Z.projectionMatrix.copy(I.projectionMatrix),Z.projectionMatrixInverse.copy(I.projectionMatrixInverse),O===null&&j.isPerspectiveCamera&&(O={camera:j,fov:j.fov,zoom:j.zoom}),G(j,Z,Me)};function G(j,ce,ye){ye===null?j.matrix.copy(ce.matrixWorld):(j.matrix.copy(ye.matrixWorld),j.matrix.invert(),j.matrix.multiply(ce.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(ce.projectionMatrix),j.projectionMatrixInverse.copy(ce.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=mr*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return Z},this.getFoveation=function(){if(!(d===null&&p===null))return c},this.setFoveation=function(j){c=j,d!==null&&(d.fixedFoveation=j),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=j)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(Z)},this.getCameraTexture=function(j){return m[j]};let ee=null;function ae(j,ce){if(h=ce.getViewerPose(l||o),x=ce,h!==null){let ye=h.views;p!==null&&(e.setRenderTargetFramebuffer(M,p.framebuffer),e.setRenderTarget(M));let Me=!1;ye.length!==Z.cameras.length&&(Z.cameras.length=0,Me=!0);for(let Ue=0;Ue<ye.length;Ue++){let at=ye[Ue],ut=null;if(p!==null)ut=p.getViewport(at);else{let Vt=u.getViewSubImage(d,at);ut=Vt.viewport,Ue===0&&(e.setRenderTargetTextures(M,Vt.colorTexture,Vt.depthStencilTexture),e.setRenderTarget(M))}let $e=H[Ue];$e===void 0&&($e=new Xt,$e.layers.enable(Ue),$e.viewport=new yt,H[Ue]=$e),$e.matrix.fromArray(at.transform.matrix),$e.matrix.decompose($e.position,$e.quaternion,$e.scale),$e.projectionMatrix.fromArray(at.projectionMatrix),$e.projectionMatrixInverse.copy($e.projectionMatrix).invert(),$e.viewport.set(ut.x,ut.y,ut.width,ut.height),Ue===0&&(Z.matrix.copy($e.matrix),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale)),Me===!0&&Z.cameras.push($e)}let he=s.enabledFeatures;if(he&&he.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){u=i.getBinding();let Ue=u.getDepthInformation(ye[0]);Ue&&Ue.isValid&&Ue.texture&&g.init(Ue,s.renderState)}if(he&&he.includes("camera-access")&&_){e.state.unbindTexture(),u=i.getBinding();for(let Ue=0;Ue<ye.length;Ue++){let at=ye[Ue].camera;if(at){let ut=m[at];ut||(ut=new Ar,m[at]=ut);let $e=u.getCameraImage(at);ut.sourceTexture=$e}}}}for(let ye=0;ye<A.length;ye++){let Me=w[ye],he=A[ye];Me!==null&&he!==void 0&&he.update(Me,ce,l||o)}ee&&ee(j,ce),ce.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ce}),x=null}let Ee=new Ff;Ee.setAnimationLoop(ae),this.setAnimationLoop=function(j){ee=j},this.dispose=function(){}}},Cy=new mt,Yf=new ze;Yf.set(-1,0,0,0,1,0,0,0,1);function Ry(n,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function i(g,m){m.color.getRGB(g.fogColor.value,eh(n)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function s(g,m,S,E,M){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(g,m):m.isMeshLambertMaterial?(r(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(g,m),u(g,m)):m.isMeshPhongMaterial?(r(g,m),h(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(g,m),d(g,m),m.isMeshPhysicalMaterial&&p(g,m,M)):m.isMeshMatcapMaterial?(r(g,m),x(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),_(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(o(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?c(g,m,S,E):m.isSpriteMaterial?l(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===rn&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===rn&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);let S=e.get(m),E=S.envMap,M=S.envMapRotation;E&&(g.envMap.value=E,g.envMapRotation.value.setFromMatrix4(Cy.makeRotationFromEuler(M)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Yf),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function o(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function c(g,m,S,E){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*S,g.scale.value=E*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function l(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function u(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function d(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function p(g,m,S){g.ior.value=m.ior,m.diffuseRoughness>0&&(g.diffuseRoughness.value=m.diffuseRoughness,m.diffuseRoughnessMap&&(g.diffuseRoughnessMap.value=m.diffuseRoughnessMap,t(m.diffuseRoughnessMap,g.diffuseRoughnessMapTransform))),m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===rn&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.retroreflectivity>0&&(g.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessMinimum,g.iridescenceThicknessMaximum.value=m.iridescenceThicknessMaximum,m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=S.texture,g.transmissionSamplerSize.value.set(S.width,S.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function x(g,m){m.matcap&&(g.matcap.value=m.matcap)}function _(g,m){let S=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(S.matrixWorld),g.nearDistance.value=S.shadow.camera.near,g.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Py(n,e,t,i){let s={},r={};function o(S,E){let M=E.program;i.uniformBlockBinding(S,M,s[S.id])}function a(S,E){let M=s[S.id];M===void 0&&(x(S),M=c(S),s[S.id]=M,S.addEventListener("dispose",g));let A=E.program;i.updateUBOMapping(S,A);let w=e.render.frame;r[S.id]!==w&&(l(S),r[S.id]=w)}function c(S){let E=n.createBuffer(),M=S.__size,A=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,M,A),n.bindBuffer(n.UNIFORM_BUFFER,null),E}function l(S){let E=s[S.id],M=S.uniforms,A=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,E);for(let w=0,y=M.length;w<y;w++){let T=M[w];if(Array.isArray(T))for(let O=0,I=T.length;O<I;O++)h(T[O],w,O,A);else h(T,w,0,A)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function h(S,E,M,A){if(d(S,E,M,A)===!0){let w=S.__offset,y=S.value;if(Array.isArray(y)){let T=0;for(let O=0;O<y.length;O++){let I=y[O],B=_(I,!0);u(I,S.__data,T),T+=B.storage/Float32Array.BYTES_PER_ELEMENT}}else u(y,S.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,w,S.__data)}}function u(S,E,M){typeof S=="number"||typeof S=="boolean"?E[M]=S:S.isMatrix3?(E[M]=S.elements[0],E[M+1]=S.elements[1],E[M+2]=S.elements[2],E[M+3]=0,E[M+4]=S.elements[3],E[M+5]=S.elements[4],E[M+6]=S.elements[5],E[M+7]=0,E[M+8]=S.elements[6],E[M+9]=S.elements[7],E[M+10]=S.elements[8],E[M+11]=0):ArrayBuffer.isView(S)?E.set(S.subarray(0,E.length-M),M):S.toArray(E,M)}function d(S,E,M,A){let w=S.value,y=E+"_"+M;if(Array.isArray(w)){A[y]===void 0&&(A[y]=[]);let T=A[y],O=!1;for(let I=0;I<w.length;I++)p(w[I],T,I)===!0&&(O=!0);return O}return p(w,A,y)}function p(S,E,M){if(E[M]===void 0)return typeof S=="number"||typeof S=="boolean"?E[M]=S:ArrayBuffer.isView(S)?E[M]=S.slice():E[M]=S.clone(),!0;{let A=E[M];if(typeof S=="number"||typeof S=="boolean"){if(A!==S)return E[M]=S,!0}else{if(ArrayBuffer.isView(S))return!0;if(A.equals(S)===!1)return A.copy(S),!0}}return!1}function x(S){let E=S.uniforms,M=0,A=16;for(let y=0,T=E.length;y<T;y++){let O=Array.isArray(E[y])?E[y]:[E[y]];for(let I=0,B=O.length;I<B;I++){let H=O[I],Z=Array.isArray(H.value)?H.value:[H.value],D=Array.isArray(E[y])||Array.isArray(H.value),$=M;for(let P=0,U=Z.length;P<U;P++){let k=Z[P],G=_(k,D),ee=M%A,ae=ee%G.boundary,Ee=ee+ae;M+=ae,Ee!==0&&A-Ee<G.storage&&(M+=A-Ee),P===0&&($=M),M+=G.storage}let R=H.type==="int"?Int32Array:H.type==="uint"?Uint32Array:Float32Array;H.__data=new R((M-$)/Float32Array.BYTES_PER_ELEMENT),H.__offset=$}}let w=M%A;return w>0&&(M+=A-w),S.__size=M,S.__cache={},this}function _(S,E){let M={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(M.boundary=4,M.storage=4):S.isVector2?(M.boundary=8,M.storage=8):S.isVector3||S.isColor?(M.boundary=16,M.storage=12):S.isVector4?(M.boundary=16,M.storage=16):S.isMatrix3?(M.boundary=16,M.storage=48):S.isMatrix4?(M.boundary=16,M.storage=64):S.isTexture?Oe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(M.boundary=16,M.storage=S.byteLength):Oe("WebGLRenderer: Unsupported uniform value type.",S),E===!0&&(M.boundary=16,M.storage=Math.ceil(M.storage/16)*16),M}function g(S){let E=S.target;E.removeEventListener("dispose",g),n.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function m(){for(let S in s)n.deleteBuffer(s[S]);s={},r={}}return{bind:o,update:a,dispose:m}}var Iy=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Yn=null;function Ly(){return Yn===null&&(Yn=new na(Iy,16,16,Ii,Ln),Yn.name="DFG_LUT",Yn.minFilter=nn,Yn.magFilter=nn,Yn.wrapS=kn,Yn.wrapT=kn,Yn.generateMipmaps=!1,Yn.needsUpdate=!0),Yn}var uc=class{constructor(e={}){let{canvas:t=sf(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:p=cn}=e;this.isWebGLRenderer=!0;let x;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=i.getContextAttributes().alpha}else x=o;let _=p,g=new Set([Ra,Ca,wa]),m=new Set([cn,Pn,Gs,Ji,Ea,Aa]),S=new Uint32Array(4),E=new Int32Array(4),M={textures:[],min:[],max:[],resolution:[]},A=null,w=null,y=[],T=[],O=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=qn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,B=!1,H=null,Z=null,D=null,$=null;this._outputColorSpace=Et;let R=0,P=0,U=null,k=-1,G=null,ee=new yt,ae=new yt,Ee=null,j=new We(0),ce=0,ye=t.width,Me=t.height,he=1,Be=null,st=null,Ue=new yt(0,0,ye,Me),at=new yt(0,0,ye,Me),ut=!1,$e=new Ti,Vt=new ia,Dt=!1,an=!1,vt=new mt,On=new V,Ft=new yt,gn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},_n=!1;function xn(){return U===null?he:1}let z=i;function yn(b,F){return t.getContext(b,F)}let _t,xt,xe,Nt,Ne,He,C,v,q,re,ie,ue,ge,Q,te,fe,L,ne,K,pe,le,de,Le;try{let b={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"187"}`),t.addEventListener("webglcontextlost",De,!1),t.addEventListener("webglcontextrestored",qe,!1),t.addEventListener("webglcontextcreationerror",ve,!1),z===null){let F="webgl2";if(z=yn(F,b),z===null)throw yn(F)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ye()}catch(b){throw t.removeEventListener("webglcontextlost",De,!1),t.removeEventListener("webglcontextrestored",qe,!1),t.removeEventListener("webglcontextcreationerror",ve,!1),Fe("WebGLRenderer: "+b.message),b}function Ye(){_t=new V_(z),_t.init(),le=new Ey(z,_t),xt=new L_(z,_t,e,le),xe=new My(z,_t),xt.reversedDepthBuffer&&d&&xe.buffers.depth.setReversed(!0),Z=z.createFramebuffer(),D=z.createFramebuffer(),$=z.createFramebuffer(),Nt=new q_(z),Ne=new ly,He=new Ty(z,_t,xe,Ne,xt,le,Nt),C=new H_(I),v=new Zm(z),de=new P_(z,v),q=new W_(z,v,Nt,de),re=new Z_(z,q,v,de,Nt),ne=new Y_(z,xt,He),te=new D_(Ne),ie=new cy(I,C,_t,xt,de,te),ue=new Ry(I,Ne),ge=new uy,Q=new _y(_t),L=new R_(I,C,xe,re,x,c),fe=new by(I,re,xt),Le=new Py(z,Nt,xt,xe),K=new I_(z,_t,Nt),pe=new X_(z,_t,Nt),Nt.programs=ie.programs,I.capabilities=xt,I.extensions=_t,I.properties=Ne,I.renderLists=ge,I.shadowMap=fe,I.state=xe,I.info=Nt}_!==cn&&(O=new $_(_,t.width,t.height,a,s,r));let oe=new xh(I,z);this.xr=oe,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){let b=_t.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=_t.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return he},this.setPixelRatio=function(b){b!==void 0&&(he=b,this.setSize(ye,Me,!1))},this.getSize=function(b){return b.set(ye,Me)},this.setSize=function(b,F,J=!0){if(oe.isPresenting){Oe("WebGLRenderer: Can't change size while VR device is presenting.");return}ye=b,Me=F,t.width=Math.floor(b*he),t.height=Math.floor(F*he),J===!0&&(t.style.width=b+"px",t.style.height=F+"px"),O!==null&&O.setSize(t.width,t.height),this.setViewport(0,0,b,F)},this.getDrawingBufferSize=function(b){return b.set(ye*he,Me*he).floor()},this.setDrawingBufferSize=function(b,F,J){ye=b,Me=F,he=J,t.width=Math.floor(b*J),t.height=Math.floor(F*J),this.setViewport(0,0,b,F)},this.setEffects=function(b){if(_===cn){Fe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let F=0;F<b.length;F++)if(b[F].isOutputPass===!0){Oe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}O.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(ee)},this.getViewport=function(b){return b.copy(Ue)},this.setViewport=function(b,F,J,X){b.isVector4?Ue.set(b.x,b.y,b.z,b.w):Ue.set(b,F,J,X),xe.viewport(ee.copy(Ue).multiplyScalar(xn()).round())},this.getScissor=function(b){return b.copy(at)},this.setScissor=function(b,F,J,X){b.isVector4?at.set(b.x,b.y,b.z,b.w):at.set(b,F,J,X),xe.scissor(ae.copy(at).multiplyScalar(xn()).round())},this.getScissorTest=function(){return ut},this.setScissorTest=function(b){xe.setScissorTest(ut=b)},this.setOpaqueSort=function(b){Be=b},this.setTransparentSort=function(b){st=b},this.getClearColor=function(b){return b.copy(L.getClearColor())},this.setClearColor=function(){L.setClearColor(...arguments)},this.getClearAlpha=function(){return L.getClearAlpha()},this.setClearAlpha=function(){L.setClearAlpha(...arguments)},this.clear=function(b=!0,F=!0,J=!0){let X=0;if(b){let Y=!1;if(U!==null){let _e=U.texture.format;Y=g.has(_e)}if(Y){let _e=U.texture.type,Te=m.has(_e),me=L.getClearColor(),be=L.getClearAlpha(),Pe=me.r,Ve=me.g,je=me.b;Te?(S[0]=Pe,S[1]=Ve,S[2]=je,S[3]=be,z.clearBufferuiv(z.COLOR,0,S)):(E[0]=Pe,E[1]=Ve,E[2]=je,E[3]=be,z.clearBufferiv(z.COLOR,0,E))}else X|=z.COLOR_BUFFER_BIT}F&&(X|=z.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),J&&(X|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),X!==0&&z.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),H=b},this.dispose=function(){t.removeEventListener("webglcontextlost",De,!1),t.removeEventListener("webglcontextrestored",qe,!1),t.removeEventListener("webglcontextcreationerror",ve,!1),L.dispose(),ge.dispose(),Q.dispose(),He.dispose(),Ne.dispose(),C.dispose(),re.dispose(),q.dispose(),de.dispose(),Le.dispose(),ie.dispose(),oe.dispose(),oe.removeEventListener("sessionstart",zu),oe.removeEventListener("sessionend",Gu),Ui.stop()};function De(b){b.preventDefault(),pr("WebGLRenderer: Context Lost."),B=!0}function qe(){pr("WebGLRenderer: Context Restored."),B=!1;let b=Nt.autoReset,F=fe.enabled,J=fe.autoUpdate,X=fe.needsUpdate,Y=fe.type;Ye(),Nt.autoReset=b,fe.enabled=F,fe.autoUpdate=J,fe.needsUpdate=X,fe.type=Y}function ve(b){Fe("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function ct(b){let F=b.target;F.removeEventListener("dispose",ct),kt(F)}function kt(b){mi(b),Ne.remove(b)}function mi(b){let F=Ne.get(b).programs;F!==void 0&&(F.forEach(function(J){ie.releaseProgram(J)}),b.isShaderMaterial&&ie.releaseShaderCache(b))}this.renderBufferDirect=function(b,F,J,X,Y,_e){F===null&&(F=gn);let Te=Y.isMesh&&Y.matrixWorld.determinantAffine()<0,me=$p(b,F,J,X,Y);xe.setMaterial(X,Te);let be=J.index,Pe=1;if(X.wireframe===!0){if(be=q.getWireframeAttribute(J),be===void 0)return;Pe=2}let Ve=J.drawRange,je=J.attributes.position,Ae=Ve.start*Pe,Ke=(Ve.start+Ve.count)*Pe;_e!==null&&(Ae=Math.max(Ae,_e.start*Pe),Ke=Math.min(Ke,(_e.start+_e.count)*Pe)),be!==null?(Ae=Math.max(Ae,0),Ke=Math.min(Ke,be.count)):je!=null&&(Ae=Math.max(Ae,0),Ke=Math.min(Ke,je.count));let At=Ke-Ae;if(At<0||At===1/0)return;de.setup(Y,X,me,J,be);let pt,dt=K;if(be!==null&&(pt=v.get(be),dt=pe,dt.setIndex(pt)),Y.isMesh)X.wireframe===!0?(xe.setLineWidth(X.wireframeLinewidth*xn()),dt.setMode(z.LINES)):dt.setMode(z.TRIANGLES);else if(Y.isLine){let qt=X.linewidth;qt===void 0&&(qt=1),xe.setLineWidth(qt*xn()),Y.isLineSegments?dt.setMode(z.LINES):Y.isLineLoop?dt.setMode(z.LINE_LOOP):dt.setMode(z.LINE_STRIP)}else Y.isPoints?dt.setMode(z.POINTS):Y.isSprite&&dt.setMode(z.TRIANGLES);if(Y.isBatchedMesh)if(_t.get("WEBGL_multi_draw"))dt.renderMultiDraw(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount);else{let qt=Y._multiDrawStarts,we=Y._multiDrawCounts,en=Y._multiDrawCount,it=be?v.get(be).bytesPerElement:1,Oi=Ne.get(X).currentProgram.getUniforms();for(let Yt=0;Yt<en;Yt++)Oi.setValue(z,"_gl_DrawID",Yt),dt.render(qt[Yt]/it,we[Yt])}else if(Y.isInstancedMesh)dt.renderInstances(Ae,At,Y.count);else if(J.isInstancedBufferGeometry){let qt=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,we=Math.min(J.instanceCount,qt);dt.renderInstances(Ae,At,we)}else dt.render(Ae,At)};function Bu(b,F,J,X){H!==null&&b.isNodeMaterial&&H.setObject(X,b),Dt===!0&&te.setState(b,J,!1),b.transparent===!0&&b.side===Xn&&b.forceSinglePass===!1?(b.side=rn,b.needsUpdate=!0,er(b,F,X),b.side=Ri,b.needsUpdate=!0,er(b,F,X),b.side=Xn):er(b,F,X)}this.compile=function(b,F,J=null){J===null&&(J=b),H!==null&&H.renderStart(b,F,J),w=Q.get(J),w.init(F),T.push(w),J.traverseVisible(function(Y){Y.isLight&&Y.layers.test(F.layers)&&(w.pushLight(Y),Y.castShadow&&w.pushShadow(Y))}),b!==J&&b.traverseVisible(function(Y){Y.isLight&&Y.layers.test(F.layers)&&(w.pushLight(Y),Y.castShadow&&w.pushShadow(Y))}),w.setupLights(),H!==null&&H.updateLights(w.state.lightsArray),an=this.localClippingEnabled,Dt=te.init(this.clippingPlanes,an),Dt===!0&&te.setGlobalState(this.clippingPlanes,F),H!==null&&fe.render(w.state.shadowsArray,J,F);let X=new Set;return b.traverse(function(Y){if(!(Y.isMesh||Y.isPoints||Y.isLine||Y.isSprite))return;let _e=Y.material;if(_e)if(Array.isArray(_e))for(let Te=0;Te<_e.length;Te++){let me=_e[Te];Bu(me,J,F,Y),X.add(me)}else Bu(_e,J,F,Y),X.add(_e)}),w=T.pop(),H!==null&&H.renderEnd(),X},this.compileAsync=function(b,F,J=null){let X=this.compile(b,F,J);return new Promise(Y=>{function _e(){if(X.forEach(function(Te){let be=Ne.get(Te).currentProgram;(be===void 0||be.isReady())&&X.delete(Te)}),X.size===0){Y(b);return}setTimeout(_e,10)}_t.get("KHR_parallel_shader_compile")!==null?_e():setTimeout(_e,10)})};let Yc=null;function Zp(b){Yc&&Yc(b)}function zu(){Ui.stop()}function Gu(){Ui.start()}let Ui=new Ff;Ui.setAnimationLoop(Zp),typeof self<"u"&&Ui.setContext(self),this.setAnimationLoop=function(b){Yc=b,oe.setAnimationLoop(b),b===null?Ui.stop():Ui.start()},oe.addEventListener("sessionstart",zu),oe.addEventListener("sessionend",Gu),this.render=function(b,F){if(F!==void 0&&F.isCamera!==!0){Fe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(B===!0)return;H!==null&&H.renderStart(b,F);let J=oe.enabled===!0&&oe.isPresenting===!0,X=O!==null&&(U===null||J)&&O.begin(I,U);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),oe.enabled===!0&&oe.isPresenting===!0&&(O===null||O.isCompositing()===!1)&&(oe.cameraAutoUpdate===!0&&oe.updateCamera(F),F=oe.getCamera()),b.isScene===!0&&b.onBeforeRender(I,b,F,U),w=Q.get(b,T.length),w.init(F),w.state.textureUnits=He.getTextureUnits(),T.push(w),vt.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),F.isArrayCamera?Vt.setFromArrayCamera(F):$e.setFromProjectionMatrix(vt,Sn,F.reversedDepth),an=this.localClippingEnabled,Dt=te.init(this.clippingPlanes,an),A=ge.get(b,y.length),A.init(),y.push(A),this.info.render.frame++,oe.enabled===!0&&oe.isPresenting===!0){let Te=I.xr.getDepthSensingMesh();Te!==null&&Zc(Te,F,-1/0,I.sortObjects)}Zc(b,F,0,I.sortObjects),A.finish(),H!==null&&H.updateLights(w.state.lightsArray),I.sortObjects===!0&&A.sort(Be,st),_n=oe.enabled===!1||oe.isPresenting===!1||oe.hasDepthSensing()===!1,_n&&L.addToRenderList(A,b),this.info.autoReset===!0&&this.info.reset(),Dt===!0&&te.beginShadows();let Y=w.state.shadowsArray;if(fe.render(Y,b,F),Dt===!0&&te.endShadows(),(X&&O.hasRenderPass())===!1){let Te=A.opaque,me=A.transmissive;if(w.setupLights(),F.isArrayCamera){let be=F.cameras;if(me.length>0)for(let Pe=0,Ve=be.length;Pe<Ve;Pe++){let je=be[Pe];Vu(Te,me,b,je)}_n&&L.render(b);for(let Pe=0,Ve=be.length;Pe<Ve;Pe++){let je=be[Pe];Hu(A,b,je,je.viewport)}}else me.length>0&&Vu(Te,me,b,F),_n&&L.render(b),Hu(A,b,F)}U!==null&&P===0&&(He.updateMultisampleRenderTarget(U),He.updateRenderTargetMipmap(U)),X&&O.end(I),b.isScene===!0&&b.onAfterRender(I,b,F),de.resetDefaultState(),k=-1,G=null,T.pop(),T.length>0?(w=T[T.length-1],He.setTextureUnits(w.state.textureUnits),Dt===!0&&te.setGlobalState(I.clippingPlanes,w.state.camera)):w=null,y.pop(),y.length>0?A=y[y.length-1]:A=null,H!==null&&H.renderEnd()};function Zc(b,F,J,X){if(b.visible===!1)return;if(b.layers.test(F.layers)){if(b.isGroup)J=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(F);else if(b.isLight)w.pushLight(b),b.castShadow&&w.pushShadow(b);else if(b.isSprite){let Te=F.isArrayCamera?Vt:$e;if(!b.frustumCulled||b.intersectsFrustum(Te)){X&&Ft.setFromMatrixPosition(b.matrixWorld).applyMatrix4(vt);let me=re.update(b),be=b.material;be.visible&&A.push(b,me,be,J,Ft.z,null,F)}}else if(b.isMesh||b.isLine||b.isPoints){let Te=F.isArrayCamera?Vt:$e;if(!b.frustumCulled||b.intersectsFrustum(Te)){let me=re.update(b),be=b.material;if(X&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Ft.copy(b.boundingSphere.center)):(me.boundingSphere===null&&me.computeBoundingSphere(),Ft.copy(me.boundingSphere.center)),Ft.applyMatrix4(b.matrixWorld).applyMatrix4(vt)),Array.isArray(be)){let Pe=me.groups;for(let Ve=0,je=Pe.length;Ve<je;Ve++){let Ae=Pe[Ve],Ke=be[Ae.materialIndex];Ke&&Ke.visible&&A.push(b,me,Ke,J,Ft.z,Ae,F)}}else be.visible&&A.push(b,me,be,J,Ft.z,null,F)}}}let _e=b.children;for(let Te=0,me=_e.length;Te<me;Te++)Zc(_e[Te],F,J,X)}function Hu(b,F,J,X){let{opaque:Y,transmissive:_e,transparent:Te}=b;w.setupLightsView(J),Dt===!0&&te.setGlobalState(I.clippingPlanes,J),X&&xe.viewport(ee.copy(X)),Y.length>0&&po(Y,F,J),_e.length>0&&po(_e,F,J),Te.length>0&&po(Te,F,J),xe.buffers.depth.setTest(!0),xe.buffers.depth.setMask(!0),xe.buffers.color.setMask(!0),xe.setPolygonOffset(!1)}function Vu(b,F,J,X){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[X.id]===void 0){let Ae=_t.has("EXT_color_buffer_half_float")||_t.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[X.id]=new dn(1,1,{generateMipmaps:!0,type:Ae?Ln:cn,minFilter:hi,samples:Math.max(4,xt.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Qe.workingColorSpace})}let _e=w.state.transmissionRenderTarget[X.id],Te=X.viewport||ee;_e.setSize(Te.z*I.transmissionResolutionScale,Te.w*I.transmissionResolutionScale);let me=I.getRenderTarget(),be=I.getActiveCubeFace(),Pe=I.getActiveMipmapLevel();I.setRenderTarget(_e),I.getClearColor(j),ce=I.getClearAlpha(),ce<1&&I.setClearColor(16777215,.5),I.clear(),_n&&L.render(J);let Ve=I.toneMapping;I.toneMapping=qn;let je=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),w.setupLightsView(X),Dt===!0&&te.setGlobalState(I.clippingPlanes,X),po(b,J,X),He.updateMultisampleRenderTarget(_e),He.updateRenderTargetMipmap(_e),_t.has("WEBGL_multisampled_render_to_texture")===!1){let Ae=!1;for(let Ke=0,At=F.length;Ke<At;Ke++){let pt=F[Ke],{object:dt,geometry:qt,material:we,group:en}=pt;if(we.side===Xn&&dt.layers.test(X.layers)){let it=we.side;we.side=rn,we.needsUpdate=!0,Wu(dt,J,X,qt,we,en),we.side=it,we.needsUpdate=!0,Ae=!0}}Ae===!0&&(He.updateMultisampleRenderTarget(_e),He.updateRenderTargetMipmap(_e))}I.setRenderTarget(me,be,Pe),I.setClearColor(j,ce),je!==void 0&&(X.viewport=je),I.toneMapping=Ve}function po(b,F,J){let X=F.isScene===!0?F.overrideMaterial:null;for(let Y=0,_e=b.length;Y<_e;Y++){let Te=b[Y],{object:me,geometry:be,group:Pe}=Te,Ve=Te.material;Ve.allowOverride===!0&&X!==null&&(Ve=X),me.layers.test(J.layers)&&Wu(me,F,J,be,Ve,Pe)}}function Wu(b,F,J,X,Y,_e){H!==null&&Y.isNodeMaterial&&H.setObject(b,Y),b.onBeforeRender(I,F,J,X,Y,_e),b.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),Y.onBeforeRender(I,F,J,X,b,_e),Y.transparent===!0&&Y.side===Xn&&Y.forceSinglePass===!1?(Y.side=rn,Y.needsUpdate=!0,I.renderBufferDirect(J,F,X,Y,b,_e),Y.side=Ri,Y.needsUpdate=!0,I.renderBufferDirect(J,F,X,Y,b,_e),Y.side=Xn):I.renderBufferDirect(J,F,X,Y,b,_e),b.onAfterRender(I,F,J,X,Y,_e)}function Xu(b){let F=0;for(let J of b)J.texture!==null&&F++;return F}function er(b,F,J){F.isScene!==!0&&(F=gn);let X=Ne.get(b),Y=w.state.lights,_e=w.state.shadowsArray,Te=Y.state.version,me=ie.getParameters(b,Y.state,_e,F,J,w.state.lightProbeGridArray),be=ie.getProgramCacheKey(me),Pe=X.programs;X.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?F.environment:null,X.fog=F.fog;let Ve=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;X.envMap=C.get(b.envMap||X.environment,Ve),X.envMapRotation=X.environment!==null&&b.envMap===null?F.environmentRotation:b.envMapRotation,Pe===void 0&&(b.addEventListener("dispose",ct),Pe=new Map,X.programs=Pe,X.programVariants=new Map);let je=Pe.get(be);if(je!==void 0){if(X.currentProgram===je&&X.lightsStateVersion===Te)return Yu(b,me),je}else me.uniforms=ie.getUniforms(b),H!==null&&b.isNodeMaterial&&H.build(b,J,me),b.onBeforeCompile(me,I),je=ie.acquireProgram(me,be),Pe.set(be,je),X.uniforms=me.uniforms;let Ae=X.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Ae.clippingPlanes=te.uniform),Yu(b,me),X.needsLights=Kp(b),X.lightsStateVersion=Te,X.needsLights&&(Ae.ambientLightColor.value=Y.state.ambient,Ae.lightProbe.value=Y.state.probe,Ae.sunLights.value=Y.state.sun,Ae.sunLightShadows.value=Y.state.sunShadow,Ae.directionalLights.value=Y.state.directional,Ae.directionalLightShadows.value=Y.state.directionalShadow,Ae.spotLights.value=Y.state.spot,Ae.spotLightShadows.value=Y.state.spotShadow,Ae.rectAreaLights.value=Y.state.rectArea,Ae.ltc_1.value=Y.state.rectAreaLTC1,Ae.ltc_2.value=Y.state.rectAreaLTC2,Ae.pointLights.value=Y.state.point,Ae.pointLightShadows.value=Y.state.pointShadow,Ae.hemisphereLights.value=Y.state.hemi,Ae.sunShadowMatrix.value=Y.state.sunShadowMatrix,Ae.sunShadowCascade.value=Y.state.sunShadowCascade,Ae.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,Ae.spotLightMatrix.value=Y.state.spotLightMatrix,Ae.spotLightMap.value=Y.state.spotLightMap,Ae.pointShadowMatrix.value=Y.state.pointShadowMatrix),X.numLightProbeGrids=Xu(w.state.lightProbeGridArray),X.currentProgram=je,X.uniformsList=null,je}function Jp(b,F,J,X,Y){let _e=Ne.get(b),Te=_e.currentProgram.id+","+X+","+Y,me=_e.programVariants.get(Te);return me===void 0?(me=er(b,F,J),_e.programVariants.set(Te,me)):(_e.currentProgram=me,_e.uniformsList=null,_e.outputColorSpace=X,_e.toneMapping=Y),me}function qu(b){if(b.uniformsList===null){let F=b.currentProgram.getUniforms();b.uniformsList=Hs.seqWithValue(F.seq,b.uniforms)}return b.uniformsList}function Yu(b,F){let J=Ne.get(b);J.outputColorSpace=F.outputColorSpace,J.batching=F.batching,J.batchingColor=F.batchingColor,J.instancing=F.instancing,J.instancingColor=F.instancingColor,J.instancingMorph=F.instancingMorph,J.skinning=F.skinning,J.morphTargets=F.morphTargets,J.morphNormals=F.morphNormals,J.morphColors=F.morphColors,J.morphTargetsCount=F.morphTargetsCount,J.numClippingPlanes=F.numClippingPlanes,J.numIntersection=F.numClipIntersection,J.vertexAlphas=F.vertexAlphas,J.vertexTangents=F.vertexTangents,J.toneMapping=F.toneMapping}function $p(b,F,J,X,Y){F.isScene!==!0&&(F=gn),He.resetTextureUnits();let _e=F.fog,Te=X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial?F.environment:null,me=U===null?I.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:Qe.workingColorSpace,be=X.isMeshStandardMaterial||X.isMeshLambertMaterial&&!X.envMap||X.isMeshPhongMaterial&&!X.envMap,Pe=C.get(X.envMap||Te,be),Ve=X.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,je=!!J.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Ae=!!J.morphAttributes.position,Ke=!!J.morphAttributes.normal,At=!!J.morphAttributes.color,pt=qn;X.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(pt=I.toneMapping);let dt=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,qt=dt!==void 0?dt.length:0,we=Ne.get(X),en=w.state.lights;if(Dt===!0&&(an===!0||b!==G)){let St=b===G&&X.id===k;te.setState(X,b,St)}let it=!1,Oi=!1;X.version===we.__version?we.needsLights&&we.lightsStateVersion!==en.state.version||Y.isBatchedMesh&&we.batching===!1||!Y.isBatchedMesh&&we.batching===!0||Y.isBatchedMesh&&we.batchingColor===!0&&Y._colorsTexture===null||Y.isBatchedMesh&&we.batchingColor===!1&&Y._colorsTexture!==null||Y.isInstancedMesh&&we.instancing===!1||!Y.isInstancedMesh&&we.instancing===!0||Y.isSkinnedMesh&&we.skinning===!1||!Y.isSkinnedMesh&&we.skinning===!0||Y.isInstancedMesh&&we.instancingColor===!0&&Y.instanceColor===null||Y.isInstancedMesh&&we.instancingColor===!1&&Y.instanceColor!==null||Y.isInstancedMesh&&we.instancingMorph===!0&&Y.morphTexture===null||Y.isInstancedMesh&&we.instancingMorph===!1&&Y.morphTexture!==null||we.envMap!==Pe||X.fog===!0&&we.fog!==_e||we.numClippingPlanes!==void 0&&(we.numClippingPlanes!==te.numPlanes||we.numIntersection!==te.numIntersection)||we.vertexAlphas!==Ve||we.vertexTangents!==je||we.morphTargets!==Ae||we.morphNormals!==Ke||we.morphColors!==At||we.morphTargetsCount!==qt||we.numLightProbeGrids!==Xu(w.state.lightProbeGridArray)?it=!0:(we.outputColorSpace!==me||we.toneMapping!==pt)&&(Oi=!0):(it=!0,we.__version=X.version);let Yt=we.currentProgram;(it===!0||Oi===!0)&&(Yt=Oi===!0?Jp(X,F,Y,me,pt):er(X,F,Y),H&&X.isNodeMaterial&&H.onUpdateProgram(X,Yt,we));let mo=!1,gi=!1,Fi=!1,tt=Yt.getUniforms(),Wt=we.uniforms;if(xe.useProgram(Yt.program)&&(mo=!0,gi=!0,Fi=!0),X.id!==k&&(k=X.id,gi=!0),mo||G!==b){xe.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),tt.setValue(z,"projectionMatrix",b.projectionMatrix),tt.setValue(z,"viewMatrix",b.matrixWorldInverse);let Bt=tt.map.cameraPosition;Bt!==void 0&&Bt.setValue(z,On.setFromMatrixPosition(b.matrixWorld)),xt.logarithmicDepthBuffer&&tt.setValue(z,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&tt.setValue(z,"isOrthographic",b.isOrthographicCamera===!0),G!==b&&(G=b,gi=!0,Fi=!0)}if(we.needsLights&&(en.state.sunShadowMap.length>0&&tt.setValue(z,"sunShadowMap",en.state.sunShadowMap,He),en.state.directionalShadowMap.length>0&&tt.setValue(z,"directionalShadowMap",en.state.directionalShadowMap,He),en.state.spotShadowMap.length>0&&tt.setValue(z,"spotShadowMap",en.state.spotShadowMap,He),en.state.pointShadowMap.length>0&&tt.setValue(z,"pointShadowMap",en.state.pointShadowMap,He)),Y.isSkinnedMesh){tt.setOptional(z,Y,"bindMatrix"),tt.setOptional(z,Y,"bindMatrixInverse");let St=Y.skeleton;St&&(St.boneTexture===null&&St.computeBoneTexture(),tt.setValue(z,"boneTexture",St.boneTexture,He))}Y.isBatchedMesh&&(tt.setOptional(z,Y,"batchingTexture"),tt.setValue(z,"batchingTexture",Y._matricesTexture,He),tt.setOptional(z,Y,"batchingIdTexture"),tt.setValue(z,"batchingIdTexture",Y._indirectTexture,He),tt.setOptional(z,Y,"batchingColorTexture"),Y._colorsTexture!==null&&tt.setValue(z,"batchingColorTexture",Y._colorsTexture,He));let Mn=J.morphAttributes;if((Mn.position!==void 0||Mn.normal!==void 0||Mn.color!==void 0)&&ne.update(Y,J,Yt),(gi||we.receiveShadow!==Y.receiveShadow)&&(we.receiveShadow=Y.receiveShadow,tt.setValue(z,"receiveShadow",Y.receiveShadow)),(X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial)&&X.envMap===null&&F.environment!==null&&(Wt.envMapIntensity.value=F.environmentIntensity),Wt.dfgLUT!==void 0&&(Wt.dfgLUT.value=Ly()),gi){if(tt.setValue(z,"toneMappingExposure",I.toneMappingExposure),we.needsLights&&jp(Wt,Fi),_e&&X.fog===!0&&ue.refreshFogUniforms(Wt,_e),ue.refreshMaterialUniforms(Wt,X,he,Me,w.state.transmissionRenderTarget[b.id]),we.needsLights&&we.numLightProbeGrids>0){let St=M,Bt=0;for(let jn of w.state.lightProbeGridArray)jn.texture!==null&&(St.textures[Bt]=jn.texture,St.min[Bt]=jn.boundingBox.min,St.max[Bt]=jn.boundingBox.max,St.resolution[Bt]=jn.resolution,Bt++);for(let jn in St)St[jn].length=Bt;Wt.probesSH.value=St.textures,Wt.probesMin.value=St.min,Wt.probesMax.value=St.max,Wt.probesResolution.value=St.resolution}Hs.upload(z,qu(we),Wt,He)}if(X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(Hs.upload(z,qu(we),Wt,He),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&tt.setValue(z,"center",Y.center),tt.setValue(z,"modelViewMatrix",Y.modelViewMatrix),tt.setValue(z,"normalMatrix",Y.normalMatrix),tt.setValue(z,"modelMatrix",Y.matrixWorld),X.uniformsGroups!==void 0){let St=X.uniformsGroups;for(let Bt=0,jn=St.length;Bt<jn;Bt++){let Ju=St[Bt];Le.update(Ju,Yt),Le.bind(Ju,Yt)}}return Yt}function jp(b,F){b.ambientLightColor.needsUpdate=F,b.lightProbe.needsUpdate=F,b.sunLights.needsUpdate=F,b.sunLightShadows.needsUpdate=F,b.directionalLights.needsUpdate=F,b.directionalLightShadows.needsUpdate=F,b.pointLights.needsUpdate=F,b.pointLightShadows.needsUpdate=F,b.spotLights.needsUpdate=F,b.spotLightShadows.needsUpdate=F,b.rectAreaLights.needsUpdate=F,b.hemisphereLights.needsUpdate=F}function Kp(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(b,F,J){let X=Ne.get(b);X.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,X.__autoAllocateDepthBuffer===!1&&(X.__useRenderToTexture=!1),Ne.get(b.texture).__webglTexture=F,Ne.get(b.depthTexture).__webglTexture=X.__autoAllocateDepthBuffer?void 0:J,X.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,F){let J=Ne.get(b);J.__webglFramebuffer=F,J.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(b,F=0,J=0){U=b,R=F,P=J;let X=null,Y=!1,_e=!1;if(b){let me=Ne.get(b);if(me.__useDefaultFramebuffer!==void 0){xe.bindFramebuffer(z.FRAMEBUFFER,me.__webglFramebuffer),ee.copy(b.viewport),ae.copy(b.scissor),Ee=b.scissorTest,xe.viewport(ee),xe.scissor(ae),xe.setScissorTest(Ee),k=-1;return}else if(me.__webglFramebuffer===void 0)He.setupRenderTarget(b);else if(me.__hasExternalTextures)He.rebindTextures(b,Ne.get(b.texture).__webglTexture,Ne.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){let Ve=b.depthTexture;if(me.__boundDepthTexture!==Ve){if(Ve!==null&&Ne.has(Ve)&&(b.width!==Ve.image.width||b.height!==Ve.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");He.setupDepthRenderbuffer(b)}}let be=b.texture;(be.isData3DTexture||be.isDataArrayTexture||be.isCompressedArrayTexture)&&(_e=!0);let Pe=Ne.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Pe[F])?X=Pe[F][J]:X=Pe[F],Y=!0):b.samples>0&&He.useMultisampledRTT(b)===!1?X=Ne.get(b).__webglMultisampledFramebuffer:Array.isArray(Pe)?X=Pe[J]:X=Pe,ee.copy(b.viewport),ae.copy(b.scissor),Ee=b.scissorTest}else ee.copy(Ue).multiplyScalar(he).floor(),ae.copy(at).multiplyScalar(he).floor(),Ee=ut;if(J!==0&&(X=Z),xe.bindFramebuffer(z.FRAMEBUFFER,X)&&xe.drawBuffers(b,X),xe.viewport(ee),xe.scissor(ae),xe.setScissorTest(Ee),Y){let me=Ne.get(b.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+F,me.__webglTexture,J)}else if(_e){let me=F;for(let be=0;be<b.textures.length;be++){let Pe=Ne.get(b.textures[be]);z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0+be,Pe.__webglTexture,J,me)}}else if(b!==null&&J!==0){let me=Ne.get(b.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,me.__webglTexture,J)}k=-1};function Zu(b){let F=Ne.get(b);return(F.__readFormat!==b.format||F.__readType!==b.type)&&(F.__readFormat=b.format,F.__readType=b.type,F.__formatReadable=xt.textureFormatReadable(b.format),F.__typeReadable=xt.textureTypeReadable(b.type)),F}this.readRenderTargetPixels=function(b,F,J,X,Y,_e,Te,me=0){if(!(b&&b.isWebGLRenderTarget)){Fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let be=Ne.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Te!==void 0&&(be=be[Te],Array.isArray(be)&&(be=be[0])),be){xe.bindFramebuffer(z.FRAMEBUFFER,be);try{let Pe=b.textures[me],Ve=Pe.format,je=Pe.type;b.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+me);let Ae=Zu(Pe);if(Ae.__formatReadable===!1){Fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ae.__typeReadable===!1){Fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=b.width-X&&J>=0&&J<=b.height-Y&&z.readPixels(F,J,X,Y,le.convert(Ve),le.convert(je),_e)}finally{let Pe=U!==null?Ne.get(U).__webglFramebuffer:null;xe.bindFramebuffer(z.FRAMEBUFFER,Pe)}}},this.readRenderTargetPixelsAsync=async function(b,F,J,X,Y,_e,Te,me=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let be=Ne.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Te!==void 0&&(be=be[Te],Array.isArray(be)&&(be=be[0])),be)if(F>=0&&F<=b.width-X&&J>=0&&J<=b.height-Y){xe.bindFramebuffer(z.FRAMEBUFFER,be);let Pe=b.textures[me],Ve=Pe.format,je=Pe.type;b.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+me);let Ae=Zu(Pe);if(Ae.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ae.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Ke=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,Ke),z.bufferData(z.PIXEL_PACK_BUFFER,_e.byteLength,z.STREAM_READ),z.readPixels(F,J,X,Y,le.convert(Ve),le.convert(je),0),z.bindBuffer(z.PIXEL_PACK_BUFFER,null);let At=U!==null?Ne.get(U).__webglFramebuffer:null;xe.bindFramebuffer(z.FRAMEBUFFER,At);let pt=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await of(z,pt,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,Ke),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,_e),z.bindBuffer(z.PIXEL_PACK_BUFFER,null),z.deleteBuffer(Ke),z.deleteSync(pt),_e}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,F=null,J=0){let X=Math.pow(2,-J),Y=Math.floor(b.image.width*X),_e=Math.floor(b.image.height*X),Te=F!==null?F.x:0,me=F!==null?F.y:0;He.setTexture2D(b,0),z.copyTexSubImage2D(z.TEXTURE_2D,J,0,0,Te,me,Y,_e),xe.unbindTexture()},this.copyTextureToTexture=function(b,F,J=null,X=null,Y=0,_e=0){let Te,me,be,Pe,Ve,je,Ae,Ke,At,pt=b.isCompressedTexture?b.mipmaps[_e]:b.image;if(J!==null)Te=J.max.x-J.min.x,me=J.max.y-J.min.y,be=J.isBox3?J.max.z-J.min.z:1,Pe=J.min.x,Ve=J.min.y,je=J.isBox3?J.min.z:0;else{let tt=Math.pow(2,-Y);Te=Math.floor(pt.width*tt),me=Math.floor(pt.height*tt),b.isDataArrayTexture?be=pt.depth:b.isData3DTexture?be=Math.floor(pt.depth*tt):be=1,Pe=0,Ve=0,je=0}X!==null?(Ae=X.x,Ke=X.y,At=X.z):(Ae=0,Ke=0,At=0);let dt=le.convert(F.format),qt=le.convert(F.type),we;F.isData3DTexture?(He.setTexture3D(F,0),we=z.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(He.setTexture2DArray(F,0),we=z.TEXTURE_2D_ARRAY):(He.setTexture2D(F,0),we=z.TEXTURE_2D),xe.activeTexture(z.TEXTURE0),xe.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,F.flipY),xe.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),xe.pixelStorei(z.UNPACK_ALIGNMENT,F.unpackAlignment);let en=xe.getParameter(z.UNPACK_ROW_LENGTH),it=xe.getParameter(z.UNPACK_IMAGE_HEIGHT),Oi=xe.getParameter(z.UNPACK_SKIP_PIXELS),Yt=xe.getParameter(z.UNPACK_SKIP_ROWS),mo=xe.getParameter(z.UNPACK_SKIP_IMAGES);xe.pixelStorei(z.UNPACK_ROW_LENGTH,pt.width),xe.pixelStorei(z.UNPACK_IMAGE_HEIGHT,pt.height),xe.pixelStorei(z.UNPACK_SKIP_PIXELS,Pe),xe.pixelStorei(z.UNPACK_SKIP_ROWS,Ve),xe.pixelStorei(z.UNPACK_SKIP_IMAGES,je);let gi=b.isDataArrayTexture||b.isData3DTexture,Fi=F.isDataArrayTexture||F.isData3DTexture;if(b.isDepthTexture){let tt=Ne.get(b),Wt=Ne.get(F),Mn=Ne.get(tt.__renderTarget),St=Ne.get(Wt.__renderTarget);xe.bindFramebuffer(z.READ_FRAMEBUFFER,Mn.__webglFramebuffer),xe.bindFramebuffer(z.DRAW_FRAMEBUFFER,St.__webglFramebuffer);for(let Bt=0;Bt<be;Bt++)gi&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Ne.get(b).__webglTexture,Y,je+Bt),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Ne.get(F).__webglTexture,_e,At+Bt)),z.blitFramebuffer(Pe,Ve,Pe+Te,Ve+me,Ae,Ke,Ae+Te,Ke+me,z.DEPTH_BUFFER_BIT,z.NEAREST);xe.bindFramebuffer(z.READ_FRAMEBUFFER,null),xe.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if(Y!==0||b.isRenderTargetTexture||Ne.has(b)){let tt=Ne.get(b),Wt=Ne.get(F);xe.bindFramebuffer(z.READ_FRAMEBUFFER,D),xe.bindFramebuffer(z.DRAW_FRAMEBUFFER,$);for(let Mn=0;Mn<be;Mn++)gi?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,tt.__webglTexture,Y,je+Mn):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,tt.__webglTexture,Y),Fi?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Wt.__webglTexture,_e,At+Mn):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Wt.__webglTexture,_e),Y!==0?z.blitFramebuffer(Pe,Ve,Pe+Te,Ve+me,Ae,Ke,Ae+Te,Ke+me,z.COLOR_BUFFER_BIT,z.NEAREST):Fi?z.copyTexSubImage3D(we,_e,Ae,Ke,At+Mn,Pe,Ve,Te,me):z.copyTexSubImage2D(we,_e,Ae,Ke,Pe,Ve,Te,me);xe.bindFramebuffer(z.READ_FRAMEBUFFER,null),xe.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else Fi?b.isDataTexture||b.isData3DTexture?z.texSubImage3D(we,_e,Ae,Ke,At,Te,me,be,dt,qt,pt.data):F.isCompressedArrayTexture?z.compressedTexSubImage3D(we,_e,Ae,Ke,At,Te,me,be,dt,pt.data):z.texSubImage3D(we,_e,Ae,Ke,At,Te,me,be,dt,qt,pt):b.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,_e,Ae,Ke,Te,me,dt,qt,pt.data):b.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,_e,Ae,Ke,pt.width,pt.height,dt,pt.data):z.texSubImage2D(z.TEXTURE_2D,_e,Ae,Ke,Te,me,dt,qt,pt);xe.pixelStorei(z.UNPACK_ROW_LENGTH,en),xe.pixelStorei(z.UNPACK_IMAGE_HEIGHT,it),xe.pixelStorei(z.UNPACK_SKIP_PIXELS,Oi),xe.pixelStorei(z.UNPACK_SKIP_ROWS,Yt),xe.pixelStorei(z.UNPACK_SKIP_IMAGES,mo),_e===0&&F.generateMipmaps===!0&&F.mipmapsAutoUpdate===!0&&z.generateMipmap(we),xe.unbindTexture()},this.initRenderTarget=function(b){Ne.get(b).__webglFramebuffer===void 0&&He.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?He.setTextureCube(b,0):b.isData3DTexture?He.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?He.setTexture2DArray(b,0):He.setTexture2D(b,0),xe.unbindTexture()},this.resetState=function(){R=0,P=0,U=null,xe.reset(),de.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Sn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=Qe._getUnpackColorSpace()}};function Ki(n,e=!1){let t=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},o={},a=n[0].morphTargetsRelative,c=new Rt;c.morphTargetsRelative=a;let l=0;for(let h=0;h<n.length;++h){let u=n[h],d=0,p=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let x in u.attributes){if(!i.has(x))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+x+'" attribute exists among all geometries, or in none of them.'),null;r[x]===void 0&&(r[x]=[]),r[x].push(u.attributes[x]),d++}if(d!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let x in u.morphAttributes){if(!s.has(x))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;if(u.morphAttributes[x].length!==n[0].morphAttributes[x].length)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have the same number of morph targets for the "'+x+'" morph attribute.'),null;o[x]===void 0&&(o[x]=[]),o[x].push(u.morphAttributes[x]),p++}if(p!==s.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of morph attributes."),null;if(e){let x;if(t)x=u.index.count;else if(u.attributes.position!==void 0)x=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,x,h),l+=x}}if(t){let h=0,u=[];for(let d=0;d<n.length;++d){let p=n[d].index;for(let x=0;x<p.count;++x)u.push(p.getX(x)+h);h+=n[d].attributes.position.count}c.setIndex(u)}for(let h in r){let u=Jf(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(let h in o){let u=o[h][0].length;if(u!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let d=0;d<u;++d){let p=[];for(let _=0;_<o[h].length;++_)p.push(o[h][_][d]);let x=Jf(p);if(!x)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(x)}}}return c}function Jf(n){let e,t,i,s=-1,r=0;for(let l=0;l<n.length;++l){let h=n[l];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=h.normalized),i!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}let o=new e(r),a=new Gt(o,t,i),c=0;for(let l=0;l<n.length;++l){let h=n[l];if(h.isInterleavedBufferAttribute){let u=c/t;for(let d=0,p=h.count;d<p;d++)for(let x=0;x<t;x++){let _=h.getComponent(d,x);a.setComponent(d+u,x,_)}}else o.set(h.array,c);c+=h.count*t}return s!==void 0&&(a.gpuType=s),a}var yh=class{constructor(){this.encoder=new TextEncoder,this._pieces=[],this._parts=[]}append_buffer(e){this.flush(),this._parts.push(e)}append(e){this._pieces.push(e)}flush(){if(this._pieces.length>0){let e=new Uint8Array(this._pieces);this._parts.push(e),this._pieces=[]}}toArrayBuffer(){let e=[];for(let t of this._parts)e.push(t);return Dy(e).buffer}};function Dy(n){let e=0;for(let s of n)e+=s.byteLength;let t=new Uint8Array(e),i=0;for(let s of n){let r=new Uint8Array(s.buffer,s.byteOffset,s.byteLength);t.set(r,i),i+=s.byteLength}return t}function bh(n){return new vh(n).unpack()}function Mh(n){let e=new Sh,t=e.pack(n);return t instanceof Promise?t.then(()=>e.getBuffer()):e.getBuffer()}var vh=class{constructor(e){this.index=0,this.dataBuffer=e,this.dataView=new Uint8Array(this.dataBuffer),this.length=this.dataBuffer.byteLength}unpack(){let e=this.unpack_uint8();if(e<128)return e;if((e^224)<32)return(e^224)-32;let t;if((t=e^160)<=15)return this.unpack_raw(t);if((t=e^176)<=15)return this.unpack_string(t);if((t=e^144)<=15)return this.unpack_array(t);if((t=e^128)<=15)return this.unpack_map(t);switch(e){case 192:return null;case 193:return;case 194:return!1;case 195:return!0;case 202:return this.unpack_float();case 203:return this.unpack_double();case 204:return this.unpack_uint8();case 205:return this.unpack_uint16();case 206:return this.unpack_uint32();case 207:return this.unpack_uint64();case 208:return this.unpack_int8();case 209:return this.unpack_int16();case 210:return this.unpack_int32();case 211:return this.unpack_int64();case 212:return;case 213:return;case 214:return;case 215:return;case 216:return t=this.unpack_uint16(),this.unpack_string(t);case 217:return t=this.unpack_uint32(),this.unpack_string(t);case 218:return t=this.unpack_uint16(),this.unpack_raw(t);case 219:return t=this.unpack_uint32(),this.unpack_raw(t);case 220:return t=this.unpack_uint16(),this.unpack_array(t);case 221:return t=this.unpack_uint32(),this.unpack_array(t);case 222:return t=this.unpack_uint16(),this.unpack_map(t);case 223:return t=this.unpack_uint32(),this.unpack_map(t)}}unpack_uint8(){let e=this.dataView[this.index]&255;return this.index++,e}unpack_uint16(){let e=this.read(2),t=(e[0]&255)*256+(e[1]&255);return this.index+=2,t}unpack_uint32(){let e=this.read(4),t=((e[0]*256+e[1])*256+e[2])*256+e[3];return this.index+=4,t}unpack_uint64(){let e=this.read(8),t=((((((e[0]*256+e[1])*256+e[2])*256+e[3])*256+e[4])*256+e[5])*256+e[6])*256+e[7];return this.index+=8,t}unpack_int8(){let e=this.unpack_uint8();return e<128?e:e-256}unpack_int16(){let e=this.unpack_uint16();return e<32768?e:e-65536}unpack_int32(){let e=this.unpack_uint32();return e<2**31?e:e-2**32}unpack_int64(){let e=this.unpack_uint64();return e<2**63?e:e-2**64}unpack_raw(e){if(this.length<this.index+e)throw new Error(`BinaryPackFailure: index is out of range ${this.index} ${e} ${this.length}`);let t=this.dataBuffer.slice(this.index,this.index+e);return this.index+=e,t}unpack_string(e){let t=this.read(e),i=0,s="",r,o;for(;i<e;)r=t[i],r<160?(o=r,i++):(r^192)<32?(o=(r&31)<<6|t[i+1]&63,i+=2):(r^224)<16?(o=(r&15)<<12|(t[i+1]&63)<<6|t[i+2]&63,i+=3):(o=(r&7)<<18|(t[i+1]&63)<<12|(t[i+2]&63)<<6|t[i+3]&63,i+=4),s+=String.fromCodePoint(o);return this.index+=e,s}unpack_array(e){let t=new Array(e);for(let i=0;i<e;i++)t[i]=this.unpack();return t}unpack_map(e){let t={};for(let i=0;i<e;i++){let s=this.unpack();t[s]=this.unpack()}return t}unpack_float(){let e=this.unpack_uint32(),t=e>>31,i=(e>>23&255)-127,s=e&8388607|8388608;return(t===0?1:-1)*s*2**(i-23)}unpack_double(){let e=this.unpack_uint32(),t=this.unpack_uint32(),i=e>>31,s=(e>>20&2047)-1023,o=(e&1048575|1048576)*2**(s-20)+t*2**(s-52);return(i===0?1:-1)*o}read(e){let t=this.index;if(t+e<=this.length)return this.dataView.subarray(t,t+e);throw new Error("BinaryPackFailure: read index out of range")}},Sh=class{getBuffer(){return this._bufferBuilder.toArrayBuffer()}pack(e){if(typeof e=="string")this.pack_string(e);else if(typeof e=="number")Math.floor(e)===e?this.pack_integer(e):this.pack_double(e);else if(typeof e=="boolean")e===!0?this._bufferBuilder.append(195):e===!1&&this._bufferBuilder.append(194);else if(e===void 0)this._bufferBuilder.append(192);else if(typeof e=="object")if(e===null)this._bufferBuilder.append(192);else{let t=e.constructor;if(e instanceof Array){let i=this.pack_array(e);if(i instanceof Promise)return i.then(()=>this._bufferBuilder.flush())}else if(e instanceof ArrayBuffer)this.pack_bin(new Uint8Array(e));else if("BYTES_PER_ELEMENT"in e){let i=e;this.pack_bin(new Uint8Array(i.buffer,i.byteOffset,i.byteLength))}else if(e instanceof Date)this.pack_string(e.toString());else{if(e instanceof Blob)return e.arrayBuffer().then(i=>{this.pack_bin(new Uint8Array(i)),this._bufferBuilder.flush()});if(t==Object||t.toString().startsWith("class")){let i=this.pack_object(e);if(i instanceof Promise)return i.then(()=>this._bufferBuilder.flush())}else throw new Error(`Type "${t.toString()}" not yet supported`)}}else throw new Error(`Type "${typeof e}" not yet supported`);this._bufferBuilder.flush()}pack_bin(e){let t=e.length;if(t<=15)this.pack_uint8(160+t);else if(t<=65535)this._bufferBuilder.append(218),this.pack_uint16(t);else if(t<=4294967295)this._bufferBuilder.append(219),this.pack_uint32(t);else throw new Error("Invalid length");this._bufferBuilder.append_buffer(e)}pack_string(e){let t=this._textEncoder.encode(e),i=t.length;if(i<=15)this.pack_uint8(176+i);else if(i<=65535)this._bufferBuilder.append(216),this.pack_uint16(i);else if(i<=4294967295)this._bufferBuilder.append(217),this.pack_uint32(i);else throw new Error("Invalid length");this._bufferBuilder.append_buffer(t)}pack_array(e){let t=e.length;if(t<=15)this.pack_uint8(144+t);else if(t<=65535)this._bufferBuilder.append(220),this.pack_uint16(t);else if(t<=4294967295)this._bufferBuilder.append(221),this.pack_uint32(t);else throw new Error("Invalid length");let i=s=>{if(s<t){let r=this.pack(e[s]);return r instanceof Promise?r.then(()=>i(s+1)):i(s+1)}};return i(0)}pack_integer(e){if(e>=-32&&e<=127)this._bufferBuilder.append(e&255);else if(e>=0&&e<=255)this._bufferBuilder.append(204),this.pack_uint8(e);else if(e>=-128&&e<=127)this._bufferBuilder.append(208),this.pack_int8(e);else if(e>=0&&e<=65535)this._bufferBuilder.append(205),this.pack_uint16(e);else if(e>=-32768&&e<=32767)this._bufferBuilder.append(209),this.pack_int16(e);else if(e>=0&&e<=4294967295)this._bufferBuilder.append(206),this.pack_uint32(e);else if(e>=-2147483648&&e<=2147483647)this._bufferBuilder.append(210),this.pack_int32(e);else if(e>=-9223372036854776e3&&e<=9223372036854776e3)this._bufferBuilder.append(211),this.pack_int64(e);else if(e>=0&&e<=18446744073709552e3)this._bufferBuilder.append(207),this.pack_uint64(e);else throw new Error("Invalid integer")}pack_double(e){let t=0;e<0&&(t=1,e=-e);let i=Math.floor(Math.log(e)/Math.LN2),s=e/2**i-1,r=Math.floor(s*2**52),o=2**32,a=t<<31|i+1023<<20|r/o&1048575,c=r%o;this._bufferBuilder.append(203),this.pack_int32(a),this.pack_int32(c)}pack_object(e){let t=Object.keys(e),i=t.length;if(i<=15)this.pack_uint8(128+i);else if(i<=65535)this._bufferBuilder.append(222),this.pack_uint16(i);else if(i<=4294967295)this._bufferBuilder.append(223),this.pack_uint32(i);else throw new Error("Invalid length");let s=r=>{if(r<t.length){let o=t[r];if(e.hasOwnProperty(o)){this.pack(o);let a=this.pack(e[o]);if(a instanceof Promise)return a.then(()=>s(r+1))}return s(r+1)}};return s(0)}pack_uint8(e){this._bufferBuilder.append(e)}pack_uint16(e){this._bufferBuilder.append(e>>8),this._bufferBuilder.append(e&255)}pack_uint32(e){let t=e&4294967295;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255)}pack_uint64(e){let t=e/4294967296,i=e%2**32;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255),this._bufferBuilder.append((i&4278190080)>>>24),this._bufferBuilder.append((i&16711680)>>>16),this._bufferBuilder.append((i&65280)>>>8),this._bufferBuilder.append(i&255)}pack_int8(e){this._bufferBuilder.append(e&255)}pack_int16(e){this._bufferBuilder.append((e&65280)>>8),this._bufferBuilder.append(e&255)}pack_int32(e){this._bufferBuilder.append(e>>>24&255),this._bufferBuilder.append((e&16711680)>>>16),this._bufferBuilder.append((e&65280)>>>8),this._bufferBuilder.append(e&255)}pack_int64(e){let t=Math.floor(e/4294967296),i=e%2**32;this._bufferBuilder.append((t&4278190080)>>>24),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255),this._bufferBuilder.append((i&4278190080)>>>24),this._bufferBuilder.append((i&16711680)>>>16),this._bufferBuilder.append((i&65280)>>>8),this._bufferBuilder.append(i&255)}constructor(){this._bufferBuilder=new yh,this._textEncoder=new TextEncoder}};var jf=!0,Kf=!0;function Ws(n,e,t){let i=n.match(e);return i&&i.length>=t&&parseFloat(i[t],10)}function Jn(n,e,t){if(!n.RTCPeerConnection)return;if(!Object.getOwnPropertyDescriptor(EventTarget.prototype,"addEventListener").writable){Yr("Unable to polyfill events");return}let s=n.RTCPeerConnection.prototype,r=s.addEventListener;s.addEventListener=function(a,c){if(a!==e)return r.apply(this,arguments);let l=h=>{let u=t(h);u&&(c.handleEvent?c.handleEvent(u):c(u))};return this._eventMap=this._eventMap||{},this._eventMap[e]||(this._eventMap[e]=new Map),this._eventMap[e].set(c,l),r.apply(this,[a,l])};let o=s.removeEventListener;s.removeEventListener=function(a,c){if(a!==e||!this._eventMap||!this._eventMap[e])return o.apply(this,arguments);if(!this._eventMap[e].has(c))return o.apply(this,arguments);let l=this._eventMap[e].get(c);return this._eventMap[e].delete(c),this._eventMap[e].size===0&&delete this._eventMap[e],Object.keys(this._eventMap).length===0&&delete this._eventMap,o.apply(this,[a,l])},Object.defineProperty(s,"on"+e,{get(){return this["_on"+e]},set(a){this["_on"+e]&&(this.removeEventListener(e,this["_on"+e]),delete this["_on"+e]),a&&this.addEventListener(e,this["_on"+e]=a)},enumerable:!0,configurable:!0})}function Qf(n){return typeof n!="boolean"?new Error("Argument type: "+typeof n+". Please use a boolean."):(jf=n,n?"adapter.js logging disabled":"adapter.js logging enabled")}function ep(n){return typeof n!="boolean"?new Error("Argument type: "+typeof n+". Please use a boolean."):(Kf=!n,"adapter.js deprecation warnings "+(n?"disabled":"enabled"))}function Yr(){if(typeof window=="object"){if(jf)return;typeof console<"u"&&typeof console.log=="function"&&console.log.apply(console,arguments)}}function Xs(n,e){Kf&&console.warn(n+" is deprecated, please use "+e+" instead.")}function tp(n){let e={browser:null,version:null};if(typeof n>"u"||!n.navigator||!n.navigator.userAgent)return e.browser="Not a browser.",e;let{navigator:t}=n;if(t.userAgentData&&t.userAgentData.brands){let i=t.userAgentData.brands.find(s=>s.brand==="Chromium");if(i){let s=parseInt(i.version,10);if(s>=90)return{browser:"chrome",version:s}}}if(t.mozGetUserMedia)e.browser="firefox",e.version=parseInt(Ws(t.userAgent,/Firefox\/(\d+)\./,1));else if(t.webkitGetUserMedia||n.isSecureContext===!1&&n.webkitRTCPeerConnection)e.browser="chrome",e.version=parseInt(Ws(t.userAgent,/Chrom(e|ium)\/(\d+)\./,2))||null;else if(n.RTCPeerConnection&&t.userAgent.match(/AppleWebKit\/(\d+)\./))e.browser="safari",e.version=parseInt(Ws(t.userAgent,/AppleWebKit\/(\d+)\./,1)),e.supportsUnifiedPlan=n.RTCRtpTransceiver&&"currentDirection"in n.RTCRtpTransceiver.prototype,e._safariVersion=Ws(t.userAgent,/Version\/(\d+(\.?\d+))/,1);else return e.browser="Not a supported browser.",e;return e}function $f(n){return Object.prototype.toString.call(n)==="[object Object]"}function Eh(n){return $f(n)?Object.keys(n).reduce(function(e,t){let i=$f(n[t]),s=i?Eh(n[t]):n[t],r=i&&!Object.keys(s).length;return s===void 0||r?e:Object.assign(e,{[t]:s})},{}):n}function Th(n,e,t){!e||t.has(e.id)||(t.set(e.id,e),Object.keys(e).forEach(i=>{i.endsWith("Id")?Th(n,n.get(e[i]),t):i.endsWith("Ids")&&e[i].forEach(s=>{Th(n,n.get(s),t)})}))}function Ah(n,e,t){let i=t?"outbound-rtp":"inbound-rtp",s=new Map;if(e===null)return s;let r=[];return n.forEach(o=>{o.type==="track"&&o.trackIdentifier===e.id&&r.push(o)}),r.forEach(o=>{n.forEach(a=>{a.type===i&&a.trackId===o.id&&Th(n,a,s)})}),s}var gc={};go(gc,{fixNegotiationNeeded:()=>Lh,shimAddTrackRemoveTrack:()=>Ih,shimAddTrackRemoveTrackWithNative:()=>ip,shimGetSendersWithDtmf:()=>Rh,shimGetUserMedia:()=>pc,shimMediaStream:()=>wh,shimOnTrack:()=>Ch,shimPeerConnection:()=>mc,shimSenderReceiverGetStats:()=>Ph});var np=Yr;function pc(n,e){if(e.version>=64)return;let t=n&&n.navigator;if(!t.mediaDevices)return;let i=function(a){if(typeof a!="object"||a.mandatory||a.optional)return a;let c={};return Object.keys(a).forEach(l=>{if(l==="require"||l==="advanced"||l==="mediaSource")return;let h=typeof a[l]=="object"?a[l]:{ideal:a[l]};h.exact!==void 0&&typeof h.exact=="number"&&(h.min=h.max=h.exact);let u=function(d,p){return d?d+p.charAt(0).toUpperCase()+p.slice(1):p==="deviceId"?"sourceId":p};if(h.ideal!==void 0){c.optional=c.optional||[];let d={};typeof h.ideal=="number"?(d[u("min",l)]=h.ideal,c.optional.push(d),d={},d[u("max",l)]=h.ideal,c.optional.push(d)):(d[u("",l)]=h.ideal,c.optional.push(d))}h.exact!==void 0&&typeof h.exact!="number"?(c.mandatory=c.mandatory||{},c.mandatory[u("",l)]=h.exact):["min","max"].forEach(d=>{h[d]!==void 0&&(c.mandatory=c.mandatory||{},c.mandatory[u(d,l)]=h[d])})}),a.advanced&&(c.optional=(c.optional||[]).concat(a.advanced)),c},s=function(a,c){if(e.version>=61)return c(a);if(a=JSON.parse(JSON.stringify(a)),a&&typeof a.audio=="object"){let l=function(h,u,d){u in h&&!(d in h)&&(h[d]=h[u],delete h[u])};a=JSON.parse(JSON.stringify(a)),l(a.audio,"autoGainControl","googAutoGainControl"),l(a.audio,"noiseSuppression","googNoiseSuppression"),a.audio=i(a.audio)}if(a&&typeof a.video=="object"){let l=a.video.facingMode;l=l&&(typeof l=="object"?l:{ideal:l});let h=e.version<66;if(l&&(l.exact==="user"||l.exact==="environment"||l.ideal==="user"||l.ideal==="environment")&&!(t.mediaDevices.getSupportedConstraints&&t.mediaDevices.getSupportedConstraints().facingMode&&!h)){delete a.video.facingMode;let u;if(l.exact==="environment"||l.ideal==="environment"?u=["back","rear"]:(l.exact==="user"||l.ideal==="user")&&(u=["front"]),u)return t.mediaDevices.enumerateDevices().then(d=>{d=d.filter(x=>x.kind==="videoinput");let p=d.find(x=>u.some(_=>x.label.toLowerCase().includes(_)));return!p&&d.length&&u.includes("back")&&(p=d[d.length-1]),p&&(a.video.deviceId=l.exact?{exact:p.deviceId}:{ideal:p.deviceId}),a.video=i(a.video),np("chrome: "+JSON.stringify(a)),c(a)})}a.video=i(a.video)}return np("chrome: "+JSON.stringify(a)),c(a)},r=function(a){return e.version>=64?a:{name:{PermissionDeniedError:"NotAllowedError",PermissionDismissedError:"NotAllowedError",InvalidStateError:"NotAllowedError",DevicesNotFoundError:"NotFoundError",ConstraintNotSatisfiedError:"OverconstrainedError",TrackStartError:"NotReadableError",MediaDeviceFailedDueToShutdown:"NotAllowedError",MediaDeviceKillSwitchOn:"NotAllowedError",TabCaptureError:"AbortError",ScreenCaptureError:"AbortError",DeviceCaptureError:"AbortError"}[a.name]||a.name,message:a.message,constraint:a.constraint||a.constraintName,toString(){return this.name+(this.message&&": ")+this.message}}},o=function(a,c,l){s(a,h=>{t.webkitGetUserMedia(h,c,u=>{l&&l(r(u))})})};if(t.getUserMedia=o.bind(t),t.mediaDevices.getUserMedia){let a=t.mediaDevices.getUserMedia.bind(t.mediaDevices);t.mediaDevices.getUserMedia=function(c){return s(c,l=>a(l).then(h=>{if(l.audio&&!h.getAudioTracks().length||l.video&&!h.getVideoTracks().length)throw h.getTracks().forEach(u=>{u.stop()}),new DOMException("","NotFoundError");return h},h=>Promise.reject(r(h))))}}}function wh(n){n.MediaStream=n.MediaStream||n.webkitMediaStream}function Ch(n,e){if(!(e.version>102))if(typeof n=="object"&&n.RTCPeerConnection&&!("ontrack"in n.RTCPeerConnection.prototype)){Object.defineProperty(n.RTCPeerConnection.prototype,"ontrack",{get(){return this._ontrack},set(i){this._ontrack&&this.removeEventListener("track",this._ontrack),this.addEventListener("track",this._ontrack=i)},enumerable:!0,configurable:!0});let t=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(){return this._ontrackpoly||(this._ontrackpoly=s=>{s.stream.addEventListener("addtrack",r=>{let o;n.RTCPeerConnection.prototype.getReceivers?o=this.getReceivers().find(c=>c.track&&c.track.id===r.track.id):o={track:r.track};let a=new Event("track");a.track=r.track,a.receiver=o,a.transceiver={receiver:o},a.streams=[s.stream],this.dispatchEvent(a)}),s.stream.getTracks().forEach(r=>{let o;n.RTCPeerConnection.prototype.getReceivers?o=this.getReceivers().find(c=>c.track&&c.track.id===r.id):o={track:r};let a=new Event("track");a.track=r,a.receiver=o,a.transceiver={receiver:o},a.streams=[s.stream],this.dispatchEvent(a)})},this.addEventListener("addstream",this._ontrackpoly)),t.apply(this,arguments)}}else Jn(n,"track",t=>(t.transceiver||Object.defineProperty(t,"transceiver",{value:{receiver:t.receiver}}),t))}function Rh(n){if(typeof n=="object"&&n.RTCPeerConnection&&!("getSenders"in n.RTCPeerConnection.prototype)&&"createDTMFSender"in n.RTCPeerConnection.prototype){let e=function(s,r){return{track:r,get dtmf(){return this._dtmf===void 0&&(r.kind==="audio"?this._dtmf=s.createDTMFSender(r):this._dtmf=null),this._dtmf},_pc:s}};if(!n.RTCPeerConnection.prototype.getSenders){n.RTCPeerConnection.prototype.getSenders=function(){return this._senders=this._senders||[],this._senders.slice()};let s=n.RTCPeerConnection.prototype.addTrack;n.RTCPeerConnection.prototype.addTrack=function(a,c){let l=s.apply(this,arguments);return l||(l=e(this,a),this._senders.push(l)),l};let r=n.RTCPeerConnection.prototype.removeTrack;n.RTCPeerConnection.prototype.removeTrack=function(a){r.apply(this,arguments);let c=this._senders.indexOf(a);c!==-1&&this._senders.splice(c,1)}}let t=n.RTCPeerConnection.prototype.addStream;n.RTCPeerConnection.prototype.addStream=function(r){this._senders=this._senders||[],t.apply(this,[r]),r.getTracks().forEach(o=>{this._senders.push(e(this,o))})};let i=n.RTCPeerConnection.prototype.removeStream;n.RTCPeerConnection.prototype.removeStream=function(r){this._senders=this._senders||[],i.apply(this,[r]),r.getTracks().forEach(o=>{let a=this._senders.find(c=>c.track===o);a&&this._senders.splice(this._senders.indexOf(a),1)})}}else if(typeof n=="object"&&n.RTCPeerConnection&&"getSenders"in n.RTCPeerConnection.prototype&&"createDTMFSender"in n.RTCPeerConnection.prototype&&n.RTCRtpSender&&!("dtmf"in n.RTCRtpSender.prototype)){let e=n.RTCPeerConnection.prototype.getSenders;n.RTCPeerConnection.prototype.getSenders=function(){let i=e.apply(this,[]);return i.forEach(s=>s._pc=this),i},Object.defineProperty(n.RTCRtpSender.prototype,"dtmf",{get(){return this._dtmf===void 0&&(this.track.kind==="audio"?this._dtmf=this._pc.createDTMFSender(this.track):this._dtmf=null),this._dtmf}})}}function Ph(n,e){if(e.version>=67||!(typeof n=="object"&&n.RTCPeerConnection&&n.RTCRtpSender&&n.RTCRtpReceiver))return;if(!("getStats"in n.RTCRtpSender.prototype)){let i=n.RTCPeerConnection.prototype.getSenders;i&&(n.RTCPeerConnection.prototype.getSenders=function(){let o=i.apply(this,[]);return o.forEach(a=>a._pc=this),o});let s=n.RTCPeerConnection.prototype.addTrack;s&&(n.RTCPeerConnection.prototype.addTrack=function(){let o=s.apply(this,arguments);return o._pc=this,o}),n.RTCRtpSender.prototype.getStats=function(){let o=this;return this._pc.getStats().then(a=>Ah(a,o.track,!0))}}if(!("getStats"in n.RTCRtpReceiver.prototype)){let i=n.RTCPeerConnection.prototype.getReceivers;i&&(n.RTCPeerConnection.prototype.getReceivers=function(){let r=i.apply(this,[]);return r.forEach(o=>o._pc=this),r}),Jn(n,"track",s=>(s.receiver._pc=s.srcElement,s)),n.RTCRtpReceiver.prototype.getStats=function(){let r=this;return this._pc.getStats().then(o=>Ah(o,r.track,!1))}}if(!("getStats"in n.RTCRtpSender.prototype&&"getStats"in n.RTCRtpReceiver.prototype))return;let t=n.RTCPeerConnection.prototype.getStats;n.RTCPeerConnection.prototype.getStats=function(){if(arguments.length>0&&arguments[0]instanceof n.MediaStreamTrack){let s=arguments[0],r,o,a;return this.getSenders().forEach(c=>{c.track===s&&(r?a=!0:r=c)}),this.getReceivers().forEach(c=>(c.track===s&&(o?a=!0:o=c),c.track===s)),a||r&&o?Promise.reject(new DOMException("There are more than one sender or receiver for the track.","InvalidAccessError")):r?r.getStats():o?o.getStats():Promise.reject(new DOMException("There is no sender or receiver for the track.","InvalidAccessError"))}return t.apply(this,arguments)}}function ip(n){n.RTCPeerConnection.prototype.getLocalStreams=function(){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},Object.keys(this._shimmedLocalStreams).map(o=>this._shimmedLocalStreams[o][0])};let e=n.RTCPeerConnection.prototype.addTrack;n.RTCPeerConnection.prototype.addTrack=function(o,a){if(!a)return e.apply(this,arguments);this._shimmedLocalStreams=this._shimmedLocalStreams||{};let c=e.apply(this,arguments);return this._shimmedLocalStreams[a.id]?this._shimmedLocalStreams[a.id].indexOf(c)===-1&&this._shimmedLocalStreams[a.id].push(c):this._shimmedLocalStreams[a.id]=[a,c],c};let t=n.RTCPeerConnection.prototype.addStream;n.RTCPeerConnection.prototype.addStream=function(o){this._shimmedLocalStreams=this._shimmedLocalStreams||{},o.getTracks().forEach(l=>{if(this.getSenders().find(u=>u.track===l))throw new DOMException("Track already exists.","InvalidAccessError")});let a=this.getSenders();t.apply(this,arguments);let c=this.getSenders().filter(l=>a.indexOf(l)===-1);this._shimmedLocalStreams[o.id]=[o].concat(c)};let i=n.RTCPeerConnection.prototype.removeStream;n.RTCPeerConnection.prototype.removeStream=function(o){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},delete this._shimmedLocalStreams[o.id],i.apply(this,arguments)};let s=n.RTCPeerConnection.prototype.removeTrack;n.RTCPeerConnection.prototype.removeTrack=function(o){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},o&&Object.keys(this._shimmedLocalStreams).forEach(a=>{let c=this._shimmedLocalStreams[a].indexOf(o);c!==-1&&this._shimmedLocalStreams[a].splice(c,1),this._shimmedLocalStreams[a].length===1&&delete this._shimmedLocalStreams[a]}),s.apply(this,arguments)}}function Ih(n,e){if(!n.RTCPeerConnection)return;if(n.RTCPeerConnection.prototype.addTrack&&e.version>=65)return ip(n);let t=n.RTCPeerConnection.prototype.getLocalStreams;n.RTCPeerConnection.prototype.getLocalStreams=function(){let h=t.apply(this);return this._reverseStreams=this._reverseStreams||{},h.map(u=>this._reverseStreams[u.id])};let i=n.RTCPeerConnection.prototype.addStream;n.RTCPeerConnection.prototype.addStream=function(h){if(this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{},h.getTracks().forEach(u=>{if(this.getSenders().find(p=>p.track===u))throw new DOMException("Track already exists.","InvalidAccessError")}),!this._reverseStreams[h.id]){let u=new n.MediaStream(h.getTracks());this._streams[h.id]=u,this._reverseStreams[u.id]=h,h=u}i.apply(this,[h])};let s=n.RTCPeerConnection.prototype.removeStream;n.RTCPeerConnection.prototype.removeStream=function(h){this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{},s.apply(this,[this._streams[h.id]||h]),delete this._reverseStreams[this._streams[h.id]?this._streams[h.id].id:h.id],delete this._streams[h.id]},n.RTCPeerConnection.prototype.addTrack=function(h,u){if(this.signalingState==="closed")throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");let d=[].slice.call(arguments,1);if(d.length!==1||!d[0].getTracks().find(_=>_===h))throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.","NotSupportedError");if(this.getSenders().find(_=>_.track===h))throw new DOMException("Track already exists.","InvalidAccessError");this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{};let x=this._streams[u.id];if(x)x.addTrack(h),Promise.resolve().then(()=>{this.dispatchEvent(new Event("negotiationneeded"))});else{let _=new n.MediaStream([h]);this._streams[u.id]=_,this._reverseStreams[_.id]=u,this.addStream(_)}return this.getSenders().find(_=>_.track===h)};function r(l,h){let u=h.sdp;return Object.keys(l._reverseStreams||[]).forEach(d=>{let p=l._reverseStreams[d],x=l._streams[p.id];u=u.replace(new RegExp(x.id,"g"),p.id)}),new RTCSessionDescription({type:h.type,sdp:u})}function o(l,h){let u=h.sdp;return Object.keys(l._reverseStreams||[]).forEach(d=>{let p=l._reverseStreams[d],x=l._streams[p.id];u=u.replace(new RegExp(p.id,"g"),x.id)}),new RTCSessionDescription({type:h.type,sdp:u})}["createOffer","createAnswer"].forEach(function(l){let h=n.RTCPeerConnection.prototype[l],u={[l](){let d=arguments;return arguments.length&&typeof arguments[0]=="function"?h.apply(this,[x=>{let _=r(this,x);d[0].apply(null,[_])},x=>{d[1]&&d[1].apply(null,x)},arguments[2]]):h.apply(this,arguments).then(x=>r(this,x))}};n.RTCPeerConnection.prototype[l]=u[l]});let a=n.RTCPeerConnection.prototype.setLocalDescription;n.RTCPeerConnection.prototype.setLocalDescription=function(){return!arguments.length||!arguments[0].type?a.apply(this,arguments):(arguments[0]=o(this,arguments[0]),a.apply(this,arguments))};let c=Object.getOwnPropertyDescriptor(n.RTCPeerConnection.prototype,"localDescription");Object.defineProperty(n.RTCPeerConnection.prototype,"localDescription",{get(){let l=c.get.apply(this);return l.type===""?l:r(this,l)}}),n.RTCPeerConnection.prototype.removeTrack=function(h){if(this.signalingState==="closed")throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");if(!h._pc)throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.","TypeError");if(!(h._pc===this))throw new DOMException("Sender was not created by this connection.","InvalidAccessError");this._streams=this._streams||{};let d;Object.keys(this._streams).forEach(p=>{this._streams[p].getTracks().find(_=>h.track===_)&&(d=this._streams[p])}),d&&(d.getTracks().length===1?this.removeStream(this._reverseStreams[d.id]):d.removeTrack(h.track),this.dispatchEvent(new Event("negotiationneeded")))}}function mc(n,e){!n.RTCPeerConnection&&n.webkitRTCPeerConnection&&(n.RTCPeerConnection=n.webkitRTCPeerConnection),n.RTCPeerConnection&&e.version<53&&["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(t){let i=n.RTCPeerConnection.prototype[t],s={[t](){return arguments[0]=new(t==="addIceCandidate"?n.RTCIceCandidate:n.RTCSessionDescription)(arguments[0]),i.apply(this,arguments)}};n.RTCPeerConnection.prototype[t]=s[t]})}function Lh(n,e){e.version>102||Jn(n,"negotiationneeded",t=>{let i=t.target;if(!((e.version<72||i.getConfiguration&&i.getConfiguration().sdpSemantics==="plan-b")&&i.signalingState!=="stable"))return t})}var yc={};go(yc,{shimAddTransceiver:()=>Bh,shimCreateAnswer:()=>Hh,shimCreateOffer:()=>Gh,shimGetDisplayMedia:()=>sp,shimGetParameters:()=>zh,shimGetStats:()=>Nh,shimGetUserMedia:()=>_c,shimOnTrack:()=>Dh,shimPeerConnection:()=>xc,shimRTCDataChannel:()=>kh,shimReceiverGetStats:()=>Oh,shimRemoveStream:()=>Fh,shimSenderGetStats:()=>Uh});function _c(n,e){let t=n&&n.navigator;if(!t.mediaDevices)return;let i=n&&n.MediaStreamTrack;if(t.getUserMedia=function(s,r,o){Xs("navigator.getUserMedia","navigator.mediaDevices.getUserMedia"),t.mediaDevices.getUserMedia(s).then(r,o)},!(e.version>55&&"autoGainControl"in t.mediaDevices.getSupportedConstraints())){let s=function(o,a,c){a in o&&!(c in o)&&(o[c]=o[a],delete o[a])},r=t.mediaDevices.getUserMedia.bind(t.mediaDevices);if(t.mediaDevices.getUserMedia=function(o){return typeof o=="object"&&typeof o.audio=="object"&&(o=JSON.parse(JSON.stringify(o)),s(o.audio,"autoGainControl","mozAutoGainControl"),s(o.audio,"noiseSuppression","mozNoiseSuppression")),r(o)},i&&i.prototype.getSettings){let o=i.prototype.getSettings;i.prototype.getSettings=function(){let a=o.apply(this,arguments);return s(a,"mozAutoGainControl","autoGainControl"),s(a,"mozNoiseSuppression","noiseSuppression"),a}}if(i&&i.prototype.applyConstraints){let o=i.prototype.applyConstraints;i.prototype.applyConstraints=function(a){return this.kind==="audio"&&typeof a=="object"&&(a=JSON.parse(JSON.stringify(a)),s(a,"autoGainControl","mozAutoGainControl"),s(a,"noiseSuppression","mozNoiseSuppression")),o.apply(this,[a])}}}}function sp(n,e){n.navigator.mediaDevices&&(n.navigator.mediaDevices&&"getDisplayMedia"in n.navigator.mediaDevices||(n.navigator.mediaDevices.getDisplayMedia=function(i){if(!(i&&i.video)){let s=new DOMException("getDisplayMedia without video constraints is undefined");return s.name="NotFoundError",s.code=8,Promise.reject(s)}return i.video===!0?i.video={mediaSource:e}:i.video.mediaSource=e,n.navigator.mediaDevices.getUserMedia(i)}))}function Dh(n){typeof n=="object"&&n.RTCTrackEvent&&"receiver"in n.RTCTrackEvent.prototype&&!("transceiver"in n.RTCTrackEvent.prototype)&&Object.defineProperty(n.RTCTrackEvent.prototype,"transceiver",{get(){return{receiver:this.receiver}}})}function xc(n,e){typeof n!="object"||!(n.RTCPeerConnection||n.mozRTCPeerConnection)||(!n.RTCPeerConnection&&n.mozRTCPeerConnection&&(n.RTCPeerConnection=n.mozRTCPeerConnection),e.version<53&&["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(t){let i=n.RTCPeerConnection.prototype[t],s={[t](){return arguments[0]=new(t==="addIceCandidate"?n.RTCIceCandidate:n.RTCSessionDescription)(arguments[0]),i.apply(this,arguments)}};n.RTCPeerConnection.prototype[t]=s[t]}))}function Nh(n,e){if(typeof n!="object"||!(n.RTCPeerConnection||n.mozRTCPeerConnection)||e.version>=151)return;let t={inboundrtp:"inbound-rtp",outboundrtp:"outbound-rtp",candidatepair:"candidate-pair",localcandidate:"local-candidate",remotecandidate:"remote-candidate"},i=n.RTCPeerConnection.prototype.getStats;n.RTCPeerConnection.prototype.getStats=function(){let[r,o,a]=arguments;return this.signalingState==="closed"?Promise.resolve(new Map):i.apply(this,[r||null]).then(c=>{if(e.version<53&&!o)try{c.forEach(l=>{l.type=t[l.type]||l.type})}catch(l){if(l.name!=="TypeError")throw l;c.forEach((h,u)=>{c.set(u,Object.assign({},h,{type:t[h.type]||h.type}))})}return c}).then(o,a)}}function Uh(n){if(!(typeof n=="object"&&n.RTCPeerConnection&&n.RTCRtpSender)||n.RTCRtpSender&&"getStats"in n.RTCRtpSender.prototype)return;let e=n.RTCPeerConnection.prototype.getSenders;e&&(n.RTCPeerConnection.prototype.getSenders=function(){let s=e.apply(this,[]);return s.forEach(r=>r._pc=this),s});let t=n.RTCPeerConnection.prototype.addTrack;t&&(n.RTCPeerConnection.prototype.addTrack=function(){let s=t.apply(this,arguments);return s._pc=this,s}),n.RTCRtpSender.prototype.getStats=function(){return this.track?this._pc.getStats(this.track):Promise.resolve(new Map)}}function Oh(n){if(!(typeof n=="object"&&n.RTCPeerConnection&&n.RTCRtpSender)||n.RTCRtpSender&&"getStats"in n.RTCRtpReceiver.prototype)return;let e=n.RTCPeerConnection.prototype.getReceivers;e&&(n.RTCPeerConnection.prototype.getReceivers=function(){let i=e.apply(this,[]);return i.forEach(s=>s._pc=this),i}),Jn(n,"track",t=>(t.receiver._pc=t.srcElement,t)),n.RTCRtpReceiver.prototype.getStats=function(){return this._pc.getStats(this.track)}}function Fh(n){!n.RTCPeerConnection||"removeStream"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.removeStream=function(t){Xs("removeStream","removeTrack"),this.getSenders().forEach(i=>{i.track&&t.getTracks().includes(i.track)&&this.removeTrack(i)})})}function kh(n){n.DataChannel&&!n.RTCDataChannel&&(n.RTCDataChannel=n.DataChannel)}function Bh(n,e){if(!(typeof n=="object"&&n.RTCPeerConnection)||e.version>=110)return;let t=n.RTCPeerConnection.prototype.addTransceiver;t&&(n.RTCPeerConnection.prototype.addTransceiver=function(){this.setParametersPromises=[];let s=arguments[1]&&arguments[1].sendEncodings;s===void 0&&(s=[]),s=[...s];let r=s.length>0;r&&s.forEach(a=>{if("rid"in a&&!/^[a-z0-9]{0,16}$/i.test(a.rid))throw new TypeError("Invalid RID value provided.");if("scaleResolutionDownBy"in a&&!(parseFloat(a.scaleResolutionDownBy)>=1))throw new RangeError("scale_resolution_down_by must be >= 1.0");if("maxFramerate"in a&&!(parseFloat(a.maxFramerate)>=0))throw new RangeError("max_framerate must be >= 0.0")});let o=t.apply(this,arguments);if(r){let{sender:a}=o,c=a.getParameters();(!("encodings"in c)||c.encodings.length===1&&Object.keys(c.encodings[0]).length===0)&&(c.encodings=s,a.sendEncodings=s,this.setParametersPromises.push(a.setParameters(c).then(()=>{delete a.sendEncodings}).catch(()=>{delete a.sendEncodings})))}return o})}function zh(n,e){if(!(typeof n=="object"&&n.RTCRtpSender)||e.version>=110)return;let t=n.RTCRtpSender.prototype.getParameters;t&&(n.RTCRtpSender.prototype.getParameters=function(){let s=t.apply(this,arguments);return"encodings"in s||(s.encodings=[].concat(this.sendEncodings||[{}])),s})}function Gh(n,e){if(!(typeof n=="object"&&n.RTCPeerConnection)||e.version>=110)return;let t=n.RTCPeerConnection.prototype.createOffer;n.RTCPeerConnection.prototype.createOffer=function(){return this.setParametersPromises&&this.setParametersPromises.length?Promise.all(this.setParametersPromises).then(()=>t.apply(this,arguments)).finally(()=>{this.setParametersPromises=[]}):t.apply(this,arguments)}}function Hh(n,e){if(!(typeof n=="object"&&n.RTCPeerConnection)||e.version>=110)return;let t=n.RTCPeerConnection.prototype.createAnswer;n.RTCPeerConnection.prototype.createAnswer=function(){return this.setParametersPromises&&this.setParametersPromises.length?Promise.all(this.setParametersPromises).then(()=>t.apply(this,arguments)).finally(()=>{this.setParametersPromises=[]}):t.apply(this,arguments)}}var vc={};go(vc,{shimAudioContext:()=>$h,shimCallbacksAPI:()=>Xh,shimConstraints:()=>rp,shimCreateOfferLegacy:()=>Jh,shimGetUserMedia:()=>qh,shimLocalStreamsAPI:()=>Vh,shimRTCIceServerUrls:()=>Yh,shimRemoteStreamsAPI:()=>Wh,shimTrackEventTransceiver:()=>Zh});function Vh(n){if(!(typeof n!="object"||!n.RTCPeerConnection)){if("getLocalStreams"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.getLocalStreams=function(){return this._localStreams||(this._localStreams=[]),this._localStreams}),!("addStream"in n.RTCPeerConnection.prototype)){let e=n.RTCPeerConnection.prototype.addTrack;n.RTCPeerConnection.prototype.addStream=function(i){this._localStreams||(this._localStreams=[]),this._localStreams.includes(i)||this._localStreams.push(i),i.getAudioTracks().forEach(s=>e.call(this,s,i)),i.getVideoTracks().forEach(s=>e.call(this,s,i))},n.RTCPeerConnection.prototype.addTrack=function(i,...s){return s&&s.forEach(r=>{this._localStreams?this._localStreams.includes(r)||this._localStreams.push(r):this._localStreams=[r]}),e.apply(this,arguments)}}"removeStream"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.removeStream=function(t){this._localStreams||(this._localStreams=[]);let i=this._localStreams.indexOf(t);if(i===-1)return;this._localStreams.splice(i,1);let s=t.getTracks();this.getSenders().forEach(r=>{s.includes(r.track)&&this.removeTrack(r)})})}}function Wh(n){if(!(typeof n!="object"||!n.RTCPeerConnection)&&("getRemoteStreams"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.getRemoteStreams=function(){return this._remoteStreams?this._remoteStreams:[]}),!("onaddstream"in n.RTCPeerConnection.prototype))){Object.defineProperty(n.RTCPeerConnection.prototype,"onaddstream",{get(){return this._onaddstream},set(t){this._onaddstream&&(this.removeEventListener("addstream",this._onaddstream),this.removeEventListener("track",this._onaddstreampoly)),this.addEventListener("addstream",this._onaddstream=t),this.addEventListener("track",this._onaddstreampoly=i=>{i.streams.forEach(s=>{if(this._remoteStreams||(this._remoteStreams=[]),this._remoteStreams.includes(s))return;this._remoteStreams.push(s);let r=new Event("addstream");r.stream=s,this.dispatchEvent(r)})})}});let e=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(){let i=this;return this._onaddstreampoly||this.addEventListener("track",this._onaddstreampoly=function(s){s.streams.forEach(r=>{if(i._remoteStreams||(i._remoteStreams=[]),i._remoteStreams.indexOf(r)>=0)return;i._remoteStreams.push(r);let o=new Event("addstream");o.stream=r,i.dispatchEvent(o)})}),e.apply(i,arguments)}}}function Xh(n){if(typeof n!="object"||!n.RTCPeerConnection)return;let e=n.RTCPeerConnection.prototype,t=e.createOffer,i=e.createAnswer,s=e.setLocalDescription,r=e.setRemoteDescription,o=e.addIceCandidate;e.createOffer=function(l,h){let u=arguments.length>=2?arguments[2]:arguments[0],d=t.apply(this,[u]);return h?(d.then(l,h),Promise.resolve()):d},e.createAnswer=function(l,h){let u=arguments.length>=2?arguments[2]:arguments[0],d=i.apply(this,[u]);return h?(d.then(l,h),Promise.resolve()):d};let a=function(c,l,h){let u=s.apply(this,[c]);return h?(u.then(l,h),Promise.resolve()):u};e.setLocalDescription=a,a=function(c,l,h){let u=r.apply(this,[c]);return h?(u.then(l,h),Promise.resolve()):u},e.setRemoteDescription=a,a=function(c,l,h){let u=o.apply(this,[c]);return h?(u.then(l,h),Promise.resolve()):u},e.addIceCandidate=a}function qh(n){let e=n&&n.navigator;if(e.mediaDevices&&e.mediaDevices.getUserMedia){let t=e.mediaDevices,i=t.getUserMedia.bind(t);e.mediaDevices.getUserMedia=s=>i(rp(s))}!e.getUserMedia&&e.mediaDevices&&e.mediaDevices.getUserMedia&&(e.getUserMedia=function(i,s,r){e.mediaDevices.getUserMedia(i).then(s,r)}.bind(e))}function rp(n){return n&&n.video!==void 0?Object.assign({},n,{video:Eh(n.video)}):n}function Yh(n){if(!n.RTCPeerConnection)return;let e=n.RTCPeerConnection;n.RTCPeerConnection=function(i,s){if(i&&i.iceServers){let r=[];for(let o=0;o<i.iceServers.length;o++){let a=i.iceServers[o];a.urls===void 0&&a.url?(Xs("RTCIceServer.url","RTCIceServer.urls"),a=JSON.parse(JSON.stringify(a)),a.urls=a.url,delete a.url,r.push(a)):r.push(i.iceServers[o])}i.iceServers=r}return new e(i,s)},n.RTCPeerConnection.prototype=e.prototype,"generateCertificate"in e&&Object.defineProperty(n.RTCPeerConnection,"generateCertificate",{get(){return e.generateCertificate}})}function Zh(n){typeof n=="object"&&n.RTCTrackEvent&&"receiver"in n.RTCTrackEvent.prototype&&!("transceiver"in n.RTCTrackEvent.prototype)&&Object.defineProperty(n.RTCTrackEvent.prototype,"transceiver",{get(){return{receiver:this.receiver}}})}function Jh(n){let e=n.RTCPeerConnection.prototype.createOffer;n.RTCPeerConnection.prototype.createOffer=function(i){if(i){typeof i.offerToReceiveAudio<"u"&&(i.offerToReceiveAudio=!!i.offerToReceiveAudio);let s=this.getTransceivers().find(o=>o.receiver.track.kind==="audio");i.offerToReceiveAudio===!1&&s?s.direction==="sendrecv"?s.setDirection?s.setDirection("sendonly"):s.direction="sendonly":s.direction==="recvonly"&&(s.setDirection?s.setDirection("inactive"):s.direction="inactive"):i.offerToReceiveAudio===!0&&!s&&this.addTransceiver("audio",{direction:"recvonly"}),typeof i.offerToReceiveVideo<"u"&&(i.offerToReceiveVideo=!!i.offerToReceiveVideo);let r=this.getTransceivers().find(o=>o.receiver.track.kind==="video");i.offerToReceiveVideo===!1&&r?r.direction==="sendrecv"?r.setDirection?r.setDirection("sendonly"):r.direction="sendonly":r.direction==="recvonly"&&(r.setDirection?r.setDirection("inactive"):r.direction="inactive"):i.offerToReceiveVideo===!0&&!r&&this.addTransceiver("video",{direction:"recvonly"})}return e.apply(this,arguments)}}function $h(n){typeof n!="object"||n.AudioContext||(n.AudioContext=n.webkitAudioContext)}var Qh={};go(Qh,{removeExtmapAllowMixed:()=>Mc,shimAddIceCandidateNullOrEmpty:()=>jr,shimConnectionState:()=>bc,shimMaxMessageSize:()=>Jr,shimParameterlessSetLocalDescription:()=>Kr,shimRTCIceCandidate:()=>Zr,shimRTCIceCandidateRelayProtocol:()=>Sc,shimSendThrowTypeError:()=>$r});var qs=$u(Kh());function Zr(n){if(!n.RTCIceCandidate||n.RTCIceCandidate&&"foundation"in n.RTCIceCandidate.prototype)return;let e=n.RTCIceCandidate;n.RTCIceCandidate=function(i){if(typeof i=="object"&&i.candidate&&i.candidate.indexOf("a=")===0&&(i=JSON.parse(JSON.stringify(i)),i.candidate=i.candidate.substring(2)),i.candidate&&i.candidate.length){let s=new e(i),r=qs.default.parseCandidate(i.candidate);for(let o in r)o in s||Object.defineProperty(s,o,{value:r[o]});return s.toJSON=function(){return{candidate:s.candidate,sdpMid:s.sdpMid,sdpMLineIndex:s.sdpMLineIndex,usernameFragment:s.usernameFragment}},s}return new e(i)},n.RTCIceCandidate.prototype=e.prototype,Jn(n,"icecandidate",t=>(t.candidate&&Object.defineProperty(t,"candidate",{value:new n.RTCIceCandidate(t.candidate),writable:"false"}),t))}function Sc(n){!n.RTCIceCandidate||n.RTCIceCandidate&&"relayProtocol"in n.RTCIceCandidate.prototype||Jn(n,"icecandidate",e=>{if(e.candidate){let t=qs.default.parseCandidate(e.candidate.candidate);t.type==="relay"&&(e.candidate.relayProtocol={0:"tls",1:"tcp",2:"udp"}[t.priority>>24])}return e})}function Jr(n,e){if(!n.RTCPeerConnection||e.browser==="chrome"&&e.version>102||e.browser==="firefox"&&e.version>=113)return;"sctp"in n.RTCPeerConnection.prototype||Object.defineProperty(n.RTCPeerConnection.prototype,"sctp",{get(){return typeof this._sctp>"u"?null:this._sctp}});let t=function(a){if(!a||!a.sdp)return!1;let c=qs.default.splitSections(a.sdp);return c.shift(),c.some(l=>{let h=qs.default.parseMLine(l);return h&&h.kind==="application"&&h.protocol.indexOf("SCTP")!==-1})},i=function(a){let c=a.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);if(c===null||c.length<2)return-1;let l=parseInt(c[1],10);return l!==l?-1:l},s=function(a){let c=65536;return e.browser==="firefox"&&(e.version<57?a===-1?c=16384:c=2147483637:e.version<60?c=e.version===57?65535:65536:c=2147483637),c},r=function(a,c){let l=65536;e.browser==="firefox"&&e.version===57&&(l=65535);let h=qs.default.matchPrefix(a.sdp,"a=max-message-size:");return h.length>0?l=parseInt(h[0].substring(19),10):e.browser==="firefox"&&c!==-1&&(l=2147483637),l},o=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(){if(this._sctp=null,e.browser==="chrome"&&e.version>=76){let{sdpSemantics:c}=this.getConfiguration();c==="plan-b"&&Object.defineProperty(this,"sctp",{get(){return typeof this._sctp>"u"?null:this._sctp},enumerable:!0,configurable:!0})}if(t(arguments[0])){let c=i(arguments[0]),l=s(c),h=r(arguments[0],c),u;l===0&&h===0?u=Number.POSITIVE_INFINITY:l===0||h===0?u=Math.max(l,h):u=Math.min(l,h);let d={};Object.defineProperty(d,"maxMessageSize",{get(){return u}}),this._sctp=d}return o.apply(this,arguments)}}function $r(n,e){if(!(n.RTCPeerConnection&&"createDataChannel"in n.RTCPeerConnection.prototype)||e.browser==="chrome"&&e.version>=149||e.browser==="firefox"&&e.version>60)return;function t(s,r){let o=s.send;s.send=function(){let c=arguments[0],l=c.length||c.size||c.byteLength;if(s.readyState==="open"&&r.sctp&&l>r.sctp.maxMessageSize)throw new TypeError("Message too large (can send a maximum of "+r.sctp.maxMessageSize+" bytes)");return o.apply(s,arguments)}}let i=n.RTCPeerConnection.prototype.createDataChannel;n.RTCPeerConnection.prototype.createDataChannel=function(){let r=i.apply(this,arguments);return t(r,this),r},Jn(n,"datachannel",s=>(t(s.channel,s.target),s))}function bc(n){if(!n.RTCPeerConnection||"connectionState"in n.RTCPeerConnection.prototype)return;let e=n.RTCPeerConnection.prototype;Object.defineProperty(e,"connectionState",{get(){return{completed:"connected",checking:"connecting"}[this.iceConnectionState]||this.iceConnectionState},enumerable:!0,configurable:!0}),Object.defineProperty(e,"onconnectionstatechange",{get(){return this._onconnectionstatechange||null},set(t){this._onconnectionstatechange&&(this.removeEventListener("connectionstatechange",this._onconnectionstatechange),delete this._onconnectionstatechange),t&&this.addEventListener("connectionstatechange",this._onconnectionstatechange=t)},enumerable:!0,configurable:!0}),["setLocalDescription","setRemoteDescription"].forEach(t=>{let i=e[t];e[t]=function(){return this._connectionstatechangepoly||(this._connectionstatechangepoly=s=>{let r=s.target;if(r._lastConnectionState!==r.connectionState){r._lastConnectionState=r.connectionState;let o=new Event("connectionstatechange",s);r.dispatchEvent(o)}return s},this.addEventListener("iceconnectionstatechange",this._connectionstatechangepoly)),i.apply(this,arguments)}})}function Mc(n,e){if(!n.RTCPeerConnection||e.browser==="chrome"&&e.version>=71||e.browser==="safari"&&e._safariVersion>=13.1)return;let t=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(s){if(s&&s.sdp&&s.sdp.indexOf(`
a=extmap-allow-mixed`)!==-1){let r=s.sdp.split(`
`).filter(o=>o.trim()!=="a=extmap-allow-mixed").join(`
`);n.RTCSessionDescription&&s instanceof n.RTCSessionDescription?arguments[0]=new n.RTCSessionDescription({type:s.type,sdp:r}):s.sdp=r}return t.apply(this,arguments)}}function jr(n,e){if(!(n.RTCPeerConnection&&n.RTCPeerConnection.prototype))return;let t=n.RTCPeerConnection.prototype.addIceCandidate;!t||t.length===0||(n.RTCPeerConnection.prototype.addIceCandidate=function(){return arguments[0]?(e.browser==="chrome"&&e.version<78||e.browser==="firefox"&&e.version<68||e.browser==="safari")&&arguments[0]&&arguments[0].candidate===""?Promise.resolve():t.apply(this,arguments):(arguments[1]&&arguments[1].apply(null),Promise.resolve())})}function Kr(n,e){if(!(n.RTCPeerConnection&&n.RTCPeerConnection.prototype))return;let t=n.RTCPeerConnection.prototype.setLocalDescription;!t||t.length===0||(n.RTCPeerConnection.prototype.setLocalDescription=function(){let s=arguments[0]||{};if(typeof s!="object"||s.type&&s.sdp)return t.apply(this,arguments);if(s={type:s.type,sdp:s.sdp},!s.type)switch(this.signalingState){case"stable":case"have-local-offer":case"have-remote-pranswer":s.type="offer";break;default:s.type="answer";break}return s.sdp||s.type!=="offer"&&s.type!=="answer"?t.apply(this,[s]):(s.type==="offer"?this.createOffer:this.createAnswer).apply(this).then(o=>t.apply(this,[o]))})}var Ny=$u(Kh());function op({window:n}={},e={shimChrome:!0,shimFirefox:!0,shimSafari:!0}){let t=Yr,i=tp(n),s={browserDetails:i,commonShim:Qh,extractVersion:Ws,disableLog:Qf,disableWarnings:ep,sdp:Ny};switch(i.browser){case"chrome":if(!gc||!mc||!e.shimChrome)return t("Chrome shim is not included in this adapter release."),s;if(i.version===null)return t("Chrome shim can not determine version, not shimming."),s;t("adapter.js shimming chrome."),s.browserShim=gc,jr(n,i),Kr(n,i),pc(n,i),wh(n,i),mc(n,i),Ch(n,i),Ih(n,i),Rh(n,i),Ph(n,i),Lh(n,i),Zr(n,i),Sc(n,i),bc(n,i),Jr(n,i),$r(n,i),Mc(n,i);break;case"firefox":if(!yc||!xc||!e.shimFirefox)return t("Firefox shim is not included in this adapter release."),s;t("adapter.js shimming firefox."),s.browserShim=yc,jr(n,i),Kr(n,i),_c(n,i),xc(n,i),Nh(n,i),Dh(n,i),Fh(n,i),Uh(n,i),Oh(n,i),kh(n,i),Bh(n,i),zh(n,i),Gh(n,i),Hh(n,i),Zr(n,i),bc(n,i),Jr(n,i),$r(n,i);break;case"safari":if(!vc||!e.shimSafari)return t("Safari shim is not included in this adapter release."),s;t("adapter.js shimming safari."),s.browserShim=vc,jr(n,i),Kr(n,i),Yh(n,i),Jh(n,i),Xh(n,i),Vh(n,i),Wh(n,i),Zh(n,i),qh(n,i),$h(n,i),Zr(n,i),Sc(n,i),Jr(n,i),$r(n,i),Mc(n,i);break;default:t("Unsupported browser!");break}return s}var Uy=op({window:typeof window>"u"?void 0:window}),eu=Uy;function ts(n,e,t,i){Object.defineProperty(n,e,{get:t,set:i,enumerable:!0,configurable:!0})}var Ec=class{constructor(){this.chunkedMTU=16300,this._dataCount=1,this.chunk=e=>{let t=[],i=e.byteLength,s=Math.ceil(i/this.chunkedMTU),r=0,o=0;for(;o<i;){let a=Math.min(i,o+this.chunkedMTU),c=e.slice(o,a),l={__peerData:this._dataCount,n:r,data:c,total:s};t.push(l),o=a,r++}return this._dataCount++,t}}};function Oy(n){let e=0;for(let s of n)e+=s.byteLength;let t=new Uint8Array(e),i=0;for(let s of n)t.set(s,i),i+=s.byteLength;return t}var tu=eu.default||eu,Qr=new class{isWebRTCSupported(){return typeof RTCPeerConnection<"u"}isBrowserSupported(){let n=this.getBrowser(),e=this.getVersion();return this.supportedBrowsers.includes(n)?n==="chrome"?e>=this.minChromeVersion:n==="firefox"?e>=this.minFirefoxVersion:n==="safari"?!this.isIOS&&e>=this.minSafariVersion:!1:!1}getBrowser(){return tu.browserDetails.browser}getVersion(){return tu.browserDetails.version||0}isUnifiedPlanSupported(){let n=this.getBrowser(),e=tu.browserDetails.version||0;if(n==="chrome"&&e<this.minChromeVersion)return!1;if(n==="firefox"&&e>=this.minFirefoxVersion)return!0;if(!window.RTCRtpTransceiver||!("currentDirection"in RTCRtpTransceiver.prototype))return!1;let t,i=!1;try{t=new RTCPeerConnection,t.addTransceiver("audio"),i=!0}catch{}finally{t&&t.close()}return i}toString(){return`Supports:
    browser:${this.getBrowser()}
    version:${this.getVersion()}
    isIOS:${this.isIOS}
    isWebRTCSupported:${this.isWebRTCSupported()}
    isBrowserSupported:${this.isBrowserSupported()}
    isUnifiedPlanSupported:${this.isUnifiedPlanSupported()}`}constructor(){this.isIOS=typeof navigator<"u"?["iPad","iPhone","iPod"].includes(navigator.platform):!1,this.supportedBrowsers=["firefox","chrome","safari"],this.minFirefoxVersion=59,this.minChromeVersion=72,this.minSafariVersion=605}},Fy=n=>!n||/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(n),cp=()=>Math.random().toString(36).slice(2),ap={iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:["turn:eu-0.turn.peerjs.com:3478","turn:us-0.turn.peerjs.com:3478"],username:"peerjs",credential:"peerjsp"}],sdpSemantics:"unified-plan"},nu=class extends Ec{noop(){}blobToArrayBuffer(e,t){let i=new FileReader;return i.onload=function(s){s.target&&t(s.target.result)},i.readAsArrayBuffer(e),i}binaryStringToArrayBuffer(e){let t=new Uint8Array(e.length);for(let i=0;i<e.length;i++)t[i]=e.charCodeAt(i)&255;return t.buffer}isSecure(){return location.protocol==="https:"}constructor(...e){super(...e),this.CLOUD_HOST="0.peerjs.com",this.CLOUD_PORT=443,this.chunkedBrowsers={Chrome:1,chrome:1},this.defaultConfig=ap,this.browser=Qr.getBrowser(),this.browserVersion=Qr.getVersion(),this.pack=Mh,this.unpack=bh,this.supports=(function(){let t={browser:Qr.isBrowserSupported(),webRTC:Qr.isWebRTCSupported(),audioVideo:!1,data:!1,binaryBlob:!1,reliable:!1};if(!t.webRTC)return t;let i;try{i=new RTCPeerConnection(ap),t.audioVideo=!0;let s;try{s=i.createDataChannel("_PEERJSTEST",{ordered:!0}),t.data=!0,t.reliable=!!s.ordered;try{s.binaryType="blob",t.binaryBlob=!Qr.isIOS}catch{}}catch{}finally{s&&s.close()}}catch{}finally{i&&i.close()}return t})(),this.validateId=Fy,this.randomToken=cp}},ln=new nu,ky="PeerJS: ";var iu=class{get logLevel(){return this._logLevel}set logLevel(e){this._logLevel=e}log(...e){this._logLevel>=3&&this._print(3,...e)}warn(...e){this._logLevel>=2&&this._print(2,...e)}error(...e){this._logLevel>=1&&this._print(1,...e)}setLogFunction(e){this._print=e}_print(e,...t){let i=[ky,...t];for(let s in i)i[s]instanceof Error&&(i[s]="("+i[s].name+") "+i[s].message);e>=3?console.log(...i):e>=2?console.warn("WARNING",...i):e>=1&&console.error("ERROR",...i)}constructor(){this._logLevel=0}},Ce=new iu,mu={},By=Object.prototype.hasOwnProperty,on="~";function io(){}Object.create&&(io.prototype=Object.create(null),new io().__proto__||(on=!1));function zy(n,e,t){this.fn=n,this.context=e,this.once=t||!1}function lp(n,e,t,i,s){if(typeof t!="function")throw new TypeError("The listener must be a function");var r=new zy(t,i||n,s),o=on?on+e:e;return n._events[o]?n._events[o].fn?n._events[o]=[n._events[o],r]:n._events[o].push(r):(n._events[o]=r,n._eventsCount++),n}function Tc(n,e){--n._eventsCount===0?n._events=new io:delete n._events[e]}function Qt(){this._events=new io,this._eventsCount=0}Qt.prototype.eventNames=function(){var e=[],t,i;if(this._eventsCount===0)return e;for(i in t=this._events)By.call(t,i)&&e.push(on?i.slice(1):i);return Object.getOwnPropertySymbols?e.concat(Object.getOwnPropertySymbols(t)):e};Qt.prototype.listeners=function(e){var t=on?on+e:e,i=this._events[t];if(!i)return[];if(i.fn)return[i.fn];for(var s=0,r=i.length,o=new Array(r);s<r;s++)o[s]=i[s].fn;return o};Qt.prototype.listenerCount=function(e){var t=on?on+e:e,i=this._events[t];return i?i.fn?1:i.length:0};Qt.prototype.emit=function(e,t,i,s,r,o){var a=on?on+e:e;if(!this._events[a])return!1;var c=this._events[a],l=arguments.length,h,u;if(c.fn){switch(c.once&&this.removeListener(e,c.fn,void 0,!0),l){case 1:return c.fn.call(c.context),!0;case 2:return c.fn.call(c.context,t),!0;case 3:return c.fn.call(c.context,t,i),!0;case 4:return c.fn.call(c.context,t,i,s),!0;case 5:return c.fn.call(c.context,t,i,s,r),!0;case 6:return c.fn.call(c.context,t,i,s,r,o),!0}for(u=1,h=new Array(l-1);u<l;u++)h[u-1]=arguments[u];c.fn.apply(c.context,h)}else{var d=c.length,p;for(u=0;u<d;u++)switch(c[u].once&&this.removeListener(e,c[u].fn,void 0,!0),l){case 1:c[u].fn.call(c[u].context);break;case 2:c[u].fn.call(c[u].context,t);break;case 3:c[u].fn.call(c[u].context,t,i);break;case 4:c[u].fn.call(c[u].context,t,i,s);break;default:if(!h)for(p=1,h=new Array(l-1);p<l;p++)h[p-1]=arguments[p];c[u].fn.apply(c[u].context,h)}}return!0};Qt.prototype.on=function(e,t,i){return lp(this,e,t,i,!1)};Qt.prototype.once=function(e,t,i){return lp(this,e,t,i,!0)};Qt.prototype.removeListener=function(e,t,i,s){var r=on?on+e:e;if(!this._events[r])return this;if(!t)return Tc(this,r),this;var o=this._events[r];if(o.fn)o.fn===t&&(!s||o.once)&&(!i||o.context===i)&&Tc(this,r);else{for(var a=0,c=[],l=o.length;a<l;a++)(o[a].fn!==t||s&&!o[a].once||i&&o[a].context!==i)&&c.push(o[a]);c.length?this._events[r]=c.length===1?c[0]:c:Tc(this,r)}return this};Qt.prototype.removeAllListeners=function(e){var t;return e?(t=on?on+e:e,this._events[t]&&Tc(this,t)):(this._events=new io,this._eventsCount=0),this};Qt.prototype.off=Qt.prototype.removeListener;Qt.prototype.addListener=Qt.prototype.on;Qt.prefixed=on;Qt.EventEmitter=Qt;mu=Qt;var ns={};ts(ns,"ConnectionType",()=>Di);ts(ns,"PeerErrorType",()=>Pt);ts(ns,"BaseConnectionErrorType",()=>su);ts(ns,"DataConnectionErrorType",()=>gu);ts(ns,"SerializationType",()=>Ic);ts(ns,"SocketEventType",()=>Li);ts(ns,"ServerMessageType",()=>Kt);var Di=(function(n){return n.Data="data",n.Media="media",n})({}),Pt=(function(n){return n.BrowserIncompatible="browser-incompatible",n.Disconnected="disconnected",n.InvalidID="invalid-id",n.InvalidKey="invalid-key",n.Network="network",n.PeerUnavailable="peer-unavailable",n.SslUnavailable="ssl-unavailable",n.ServerError="server-error",n.SocketError="socket-error",n.SocketClosed="socket-closed",n.UnavailableID="unavailable-id",n.WebRTC="webrtc",n})({}),su=(function(n){return n.NegotiationFailed="negotiation-failed",n.ConnectionClosed="connection-closed",n})({}),gu=(function(n){return n.NotOpenYet="not-open-yet",n.MessageToBig="message-too-big",n})({}),Ic=(function(n){return n.Binary="binary",n.BinaryUTF8="binary-utf8",n.JSON="json",n.None="raw",n})({}),Li=(function(n){return n.Message="message",n.Disconnected="disconnected",n.Error="error",n.Close="close",n})({}),Kt=(function(n){return n.Heartbeat="HEARTBEAT",n.Candidate="CANDIDATE",n.Offer="OFFER",n.Answer="ANSWER",n.Open="OPEN",n.Error="ERROR",n.IdTaken="ID-TAKEN",n.InvalidKey="INVALID-KEY",n.Leave="LEAVE",n.Expire="EXPIRE",n})({}),hp="1.5.5",ru=class extends mu.EventEmitter{constructor(e,t,i,s,r,o=5e3){super(),this.pingInterval=o,this._disconnected=!0,this._messagesQueue=[];let a=e?"wss://":"ws://";this._baseUrl=a+t+":"+i+s+"peerjs?key="+r}start(e,t){this._id=e;let i=`${this._baseUrl}&id=${e}&token=${t}`;this._socket||!this._disconnected||(this._socket=new WebSocket(i+"&version="+hp),this._disconnected=!1,this._socket.onmessage=s=>{let r;try{r=JSON.parse(s.data),Ce.log("Server message received:",r)}catch{Ce.log("Invalid server message",s.data);return}this.emit(Li.Message,r)},this._socket.onclose=s=>{this._disconnected||(Ce.log("Socket closed.",s),this._cleanup(),this._disconnected=!0,this.emit(Li.Disconnected))},this._socket.onopen=()=>{this._disconnected||(this._sendQueuedMessages(),Ce.log("Socket open"),this._scheduleHeartbeat())})}_scheduleHeartbeat(){this._wsPingTimer=setTimeout(()=>{this._sendHeartbeat()},this.pingInterval)}_sendHeartbeat(){if(!this._wsOpen()){Ce.log("Cannot send heartbeat, because socket closed");return}let e=JSON.stringify({type:Kt.Heartbeat});this._socket.send(e),this._scheduleHeartbeat()}_wsOpen(){return!!this._socket&&this._socket.readyState===1}_sendQueuedMessages(){let e=[...this._messagesQueue];this._messagesQueue=[];for(let t of e)this.send(t)}send(e){if(this._disconnected)return;if(!this._id){this._messagesQueue.push(e);return}if(!e.type){this.emit(Li.Error,"Invalid message");return}if(!this._wsOpen())return;let t=JSON.stringify(e);this._socket.send(t)}close(){this._disconnected||(this._cleanup(),this._disconnected=!0)}_cleanup(){this._socket&&(this._socket.onopen=this._socket.onmessage=this._socket.onclose=null,this._socket.close(),this._socket=void 0),clearTimeout(this._wsPingTimer)}},Ac=class{constructor(e){this.connection=e}startConnection(e){let t=this._startPeerConnection();if(this.connection.peerConnection=t,this.connection.type===Di.Media&&e._stream&&this._addTracksToConnection(e._stream,t),e.originator){let i=this.connection,s={ordered:!!e.reliable},r=t.createDataChannel(i.label,s);i._initializeDataChannel(r),this._makeOffer()}else this.handleSDP("OFFER",e.sdp)}_startPeerConnection(){Ce.log("Creating RTCPeerConnection.");let e=new RTCPeerConnection(this.connection.provider.options.config);return this._setupListeners(e),e}_setupListeners(e){let t=this.connection.peer,i=this.connection.connectionId,s=this.connection.type,r=this.connection.provider;Ce.log("Listening for ICE candidates."),e.onicecandidate=o=>{!o.candidate||!o.candidate.candidate||(Ce.log(`Received ICE candidates for ${t}:`,o.candidate),r.socket.send({type:Kt.Candidate,payload:{candidate:o.candidate,type:s,connectionId:i},dst:t}))},e.oniceconnectionstatechange=()=>{switch(e.iceConnectionState){case"failed":Ce.log("iceConnectionState is failed, closing connections to "+t),this.connection.emitError(su.NegotiationFailed,"Negotiation of connection to "+t+" failed."),this.connection.close();break;case"closed":Ce.log("iceConnectionState is closed, closing connections to "+t),this.connection.emitError(su.ConnectionClosed,"Connection to "+t+" closed."),this.connection.close();break;case"disconnected":Ce.log("iceConnectionState changed to disconnected on the connection with "+t);break;case"completed":e.onicecandidate=()=>{};break}this.connection.emit("iceStateChanged",e.iceConnectionState)},Ce.log("Listening for data channel"),e.ondatachannel=o=>{Ce.log("Received data channel");let a=o.channel;r.getConnection(t,i)._initializeDataChannel(a)},Ce.log("Listening for remote stream"),e.ontrack=o=>{Ce.log("Received remote stream");let a=o.streams[0],c=r.getConnection(t,i);if(c.type===Di.Media){let l=c;this._addStreamToMediaConnection(a,l)}}}cleanup(){Ce.log("Cleaning up PeerConnection to "+this.connection.peer);let e=this.connection.peerConnection;if(!e)return;this.connection.peerConnection=null,e.onicecandidate=e.oniceconnectionstatechange=e.ondatachannel=e.ontrack=()=>{};let t=e.signalingState!=="closed",i=!1,s=this.connection.dataChannel;s&&(i=!!s.readyState&&s.readyState!=="closed"),(t||i)&&e.close()}async _makeOffer(){let e=this.connection.peerConnection,t=this.connection.provider;try{let i=await e.createOffer(this.connection.options.constraints);Ce.log("Created offer."),this.connection.options.sdpTransform&&typeof this.connection.options.sdpTransform=="function"&&(i.sdp=this.connection.options.sdpTransform(i.sdp)||i.sdp);try{await e.setLocalDescription(i),Ce.log("Set localDescription:",i,`for:${this.connection.peer}`);let s={sdp:i,type:this.connection.type,connectionId:this.connection.connectionId,metadata:this.connection.metadata};if(this.connection.type===Di.Data){let r=this.connection;s={...s,label:r.label,reliable:r.reliable,serialization:r.serialization}}t.socket.send({type:Kt.Offer,payload:s,dst:this.connection.peer})}catch(s){s!="OperationError: Failed to set local offer sdp: Called in wrong state: kHaveRemoteOffer"&&(t.emitError(Pt.WebRTC,s),Ce.log("Failed to setLocalDescription, ",s))}}catch(i){t.emitError(Pt.WebRTC,i),Ce.log("Failed to createOffer, ",i)}}async _makeAnswer(){let e=this.connection.peerConnection,t=this.connection.provider;try{let i=await e.createAnswer();Ce.log("Created answer."),this.connection.options.sdpTransform&&typeof this.connection.options.sdpTransform=="function"&&(i.sdp=this.connection.options.sdpTransform(i.sdp)||i.sdp);try{await e.setLocalDescription(i),Ce.log("Set localDescription:",i,`for:${this.connection.peer}`),t.socket.send({type:Kt.Answer,payload:{sdp:i,type:this.connection.type,connectionId:this.connection.connectionId},dst:this.connection.peer})}catch(s){t.emitError(Pt.WebRTC,s),Ce.log("Failed to setLocalDescription, ",s)}}catch(i){t.emitError(Pt.WebRTC,i),Ce.log("Failed to create answer, ",i)}}async handleSDP(e,t){t=new RTCSessionDescription(t);let i=this.connection.peerConnection,s=this.connection.provider;Ce.log("Setting remote description",t);let r=this;try{await i.setRemoteDescription(t),Ce.log(`Set remoteDescription:${e} for:${this.connection.peer}`),e==="OFFER"&&await r._makeAnswer()}catch(o){s.emitError(Pt.WebRTC,o),Ce.log("Failed to setRemoteDescription, ",o)}}async handleCandidate(e){Ce.log("handleCandidate:",e);try{await this.connection.peerConnection.addIceCandidate(e),Ce.log(`Added ICE candidate for:${this.connection.peer}`)}catch(t){this.connection.provider.emitError(Pt.WebRTC,t),Ce.log("Failed to handleCandidate, ",t)}}_addTracksToConnection(e,t){if(Ce.log(`add tracks from stream ${e.id} to peer connection`),!t.addTrack)return Ce.error("Your browser does't support RTCPeerConnection#addTrack. Ignored.");e.getTracks().forEach(i=>{t.addTrack(i,e)})}_addStreamToMediaConnection(e,t){Ce.log(`add stream ${e.id} to media connection ${t.connectionId}`),t.addStream(e)}},wc=class extends mu.EventEmitter{emitError(e,t){Ce.error("Error:",t),this.emit("error",new ou(`${e}`,t))}},ou=class extends Error{constructor(e,t){typeof t=="string"?super(t):(super(),Object.assign(this,t)),this.type=e}},Cc=class extends wc{get open(){return this._open}constructor(e,t,i){super(),this.peer=e,this.provider=t,this.options=i,this._open=!1,this.metadata=i.metadata}},uu,to=class to extends Cc{get type(){return Di.Media}get localStream(){return this._localStream}get remoteStream(){return this._remoteStream}constructor(e,t,i){super(e,t,i),this._localStream=this.options._stream,this.connectionId=this.options.connectionId||to.ID_PREFIX+ln.randomToken(),this._negotiator=new Ac(this),this._localStream&&this._negotiator.startConnection({_stream:this._localStream,originator:!0})}_initializeDataChannel(e){this.dataChannel=e,this.dataChannel.onopen=()=>{Ce.log(`DC#${this.connectionId} dc connection success`),this.emit("willCloseOnRemote")},this.dataChannel.onclose=()=>{Ce.log(`DC#${this.connectionId} dc closed for:`,this.peer),this.close()}}addStream(e){Ce.log("Receiving stream",e),this._remoteStream=e,super.emit("stream",e)}handleMessage(e){let t=e.type,i=e.payload;switch(e.type){case Kt.Answer:this._negotiator.handleSDP(t,i.sdp),this._open=!0;break;case Kt.Candidate:this._negotiator.handleCandidate(i.candidate);break;default:Ce.warn(`Unrecognized message type:${t} from peer:${this.peer}`);break}}answer(e,t={}){if(this._localStream){Ce.warn("Local stream already exists on this MediaConnection. Are you answering a call twice?");return}this._localStream=e,t&&t.sdpTransform&&(this.options.sdpTransform=t.sdpTransform),this._negotiator.startConnection({...this.options._payload,_stream:e});let i=this.provider._getMessages(this.connectionId);for(let s of i)this.handleMessage(s);this._open=!0}close(){this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this._localStream=null,this._remoteStream=null,this.provider&&(this.provider._removeConnection(this),this.provider=null),this.options&&this.options._stream&&(this.options._stream=null),this.open&&(this._open=!1,super.emit("close"))}};uu=new WeakMap,tr(to,uu,to.ID_PREFIX="mc_");var Rc=to,au=class{constructor(e){this._options=e}_buildRequest(e){let t=this._options.secure?"https":"http",{host:i,port:s,path:r,key:o}=this._options,a=new URL(`${t}://${i}:${s}${r}${o}/${e}`);return a.searchParams.set("ts",`${Date.now()}${Math.random()}`),a.searchParams.set("version",hp),fetch(a.href,{referrerPolicy:this._options.referrerPolicy})}async retrieveId(){try{let e=await this._buildRequest("id");if(e.status!==200)throw new Error(`Error. Status:${e.status}`);return e.text()}catch(e){Ce.error("Error retrieving ID",e);let t="";throw this._options.path==="/"&&this._options.host!==ln.CLOUD_HOST&&(t=" If you passed in a `path` to your self-hosted PeerServer, you'll also need to pass in that same path when creating a new Peer."),new Error("Could not get an ID from the server."+t)}}async listAllPeers(){try{let e=await this._buildRequest("peers");if(e.status!==200){if(e.status===401){let t="";throw this._options.host===ln.CLOUD_HOST?t="It looks like you're using the cloud server. You can email team@peerjs.com to enable peer listing for your API key.":t="You need to enable `allow_discovery` on your self-hosted PeerServer to use this feature.",new Error("It doesn't look like you have permission to list peers IDs. "+t)}throw new Error(`Error. Status:${e.status}`)}return e.json()}catch(e){throw Ce.error("Error retrieving list peers",e),new Error("Could not get list peers from the server."+e)}}},du,fu,es=class es extends Cc{get type(){return Di.Data}constructor(e,t,i){super(e,t,i),this.connectionId=this.options.connectionId||es.ID_PREFIX+cp(),this.label=this.options.label||this.connectionId,this.reliable=!!this.options.reliable,this._negotiator=new Ac(this),this._negotiator.startConnection(this.options._payload||{originator:!0,reliable:this.reliable})}_initializeDataChannel(e){this.dataChannel=e,this.dataChannel.onopen=()=>{Ce.log(`DC#${this.connectionId} dc connection success`),this._open=!0,this.emit("open")},this.dataChannel.onmessage=t=>{Ce.log(`DC#${this.connectionId} dc onmessage:`,t.data)},this.dataChannel.onclose=()=>{Ce.log(`DC#${this.connectionId} dc closed for:`,this.peer),this.close()}}close(e){if(e?.flush){this.send({__peerData:{type:"close"}});return}this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this.provider&&(this.provider._removeConnection(this),this.provider=null),this.dataChannel&&(this.dataChannel.onopen=null,this.dataChannel.onmessage=null,this.dataChannel.onclose=null,this.dataChannel=null),this.open&&(this._open=!1,super.emit("close"))}send(e,t=!1){if(!this.open){this.emitError(gu.NotOpenYet,"Connection is not open. You should listen for the `open` event before sending messages.");return}return this._send(e,t)}async handleMessage(e){let t=e.payload;switch(e.type){case Kt.Answer:await this._negotiator.handleSDP(e.type,t.sdp);break;case Kt.Candidate:await this._negotiator.handleCandidate(t.candidate);break;default:Ce.warn("Unrecognized message type:",e.type,"from peer:",this.peer);break}}};du=new WeakMap,fu=new WeakMap,tr(es,du,es.ID_PREFIX="dc_"),tr(es,fu,es.MAX_BUFFERED_AMOUNT=8388608);var Pc=es,so=class extends Pc{get bufferSize(){return this._bufferSize}_initializeDataChannel(e){super._initializeDataChannel(e),this.dataChannel.binaryType="arraybuffer",this.dataChannel.addEventListener("message",t=>this._handleDataMessage(t))}_bufferedSend(e){(this._buffering||!this._trySend(e))&&(this._buffer.push(e),this._bufferSize=this._buffer.length)}_trySend(e){if(!this.open)return!1;if(this.dataChannel.bufferedAmount>Pc.MAX_BUFFERED_AMOUNT)return this._buffering=!0,setTimeout(()=>{this._buffering=!1,this._tryBuffer()},50),!1;try{this.dataChannel.send(e)}catch(t){return Ce.error(`DC#:${this.connectionId} Error when sending:`,t),this._buffering=!0,this.close(),!1}return!0}_tryBuffer(){if(!this.open||this._buffer.length===0)return;let e=this._buffer[0];this._trySend(e)&&(this._buffer.shift(),this._bufferSize=this._buffer.length,this._tryBuffer())}close(e){if(e?.flush){this.send({__peerData:{type:"close"}});return}this._buffer=[],this._bufferSize=0,super.close()}constructor(...e){super(...e),this._buffer=[],this._bufferSize=0,this._buffering=!1}},eo=class extends so{close(e){super.close(e),this._chunkedData={}}constructor(e,t,i){super(e,t,i),this.chunker=new Ec,this.serialization=Ic.Binary,this._chunkedData={}}_handleDataMessage({data:e}){let t=bh(e),i=t.__peerData;if(i){if(i.type==="close"){this.close();return}this._handleChunk(t);return}this.emit("data",t)}_handleChunk(e){let t=e.__peerData,i=this._chunkedData[t]||{data:[],count:0,total:e.total};if(i.data[e.n]=new Uint8Array(e.data),i.count++,this._chunkedData[t]=i,i.total===i.count){delete this._chunkedData[t];let s=Oy(i.data);this._handleDataMessage({data:s})}}_send(e,t){let i=Mh(e);if(i instanceof Promise)return this._send_blob(i);if(!t&&i.byteLength>this.chunker.chunkedMTU){this._sendChunks(i);return}this._bufferedSend(i)}async _send_blob(e){let t=await e;if(t.byteLength>this.chunker.chunkedMTU){this._sendChunks(t);return}this._bufferedSend(t)}_sendChunks(e){let t=this.chunker.chunk(e);Ce.log(`DC#${this.connectionId} Try to send ${t.length} chunks...`);for(let i of t)this.send(i,!0)}},cu=class extends so{_handleDataMessage({data:e}){super.emit("data",e)}_send(e,t){this._bufferedSend(e)}constructor(...e){super(...e),this.serialization=Ic.None}},lu=class extends so{_handleDataMessage({data:e}){let t=this.parse(this.decoder.decode(e)),i=t.__peerData;if(i&&i.type==="close"){this.close();return}this.emit("data",t)}_send(e,t){let i=this.encoder.encode(this.stringify(e));if(i.byteLength>=ln.chunkedMTU){this.emitError(gu.MessageToBig,"Message too big for JSON channel");return}this._bufferedSend(i)}constructor(...e){super(...e),this.serialization=Ic.JSON,this.encoder=new TextEncoder,this.decoder=new TextDecoder,this.stringify=JSON.stringify,this.parse=JSON.parse}};var pu,no=class no extends wc{get id(){return this._id}get options(){return this._options}get open(){return this._open}get socket(){return this._socket}get connections(){let e=Object.create(null);for(let[t,i]of this._connections)e[t]=i;return e}get destroyed(){return this._destroyed}get disconnected(){return this._disconnected}constructor(e,t){super(),this._serializers={raw:cu,json:lu,binary:eo,"binary-utf8":eo,default:eo},this._id=null,this._lastServerId=null,this._destroyed=!1,this._disconnected=!1,this._open=!1,this._connections=new Map,this._lostMessages=new Map;let i;if(e&&e.constructor==Object?t=e:e&&(i=e.toString()),t={debug:0,host:ln.CLOUD_HOST,port:ln.CLOUD_PORT,path:"/",key:no.DEFAULT_KEY,token:ln.randomToken(),config:ln.defaultConfig,referrerPolicy:"strict-origin-when-cross-origin",serializers:{},...t},this._options=t,this._serializers={...this._serializers,...this.options.serializers},this._options.host==="/"&&(this._options.host=window.location.hostname),this._options.path&&(this._options.path[0]!=="/"&&(this._options.path="/"+this._options.path),this._options.path[this._options.path.length-1]!=="/"&&(this._options.path+="/")),this._options.secure===void 0&&this._options.host!==ln.CLOUD_HOST?this._options.secure=ln.isSecure():this._options.host==ln.CLOUD_HOST&&(this._options.secure=!0),this._options.logFunction&&Ce.setLogFunction(this._options.logFunction),Ce.logLevel=this._options.debug||0,this._api=new au(t),this._socket=this._createServerConnection(),!ln.supports.audioVideo&&!ln.supports.data){this._delayedAbort(Pt.BrowserIncompatible,"The current browser does not support WebRTC");return}if(i&&!ln.validateId(i)){this._delayedAbort(Pt.InvalidID,`ID "${i}" is invalid`);return}i?this._initialize(i):this._api.retrieveId().then(s=>this._initialize(s)).catch(s=>this._abort(Pt.ServerError,s))}_createServerConnection(){let e=new ru(this._options.secure,this._options.host,this._options.port,this._options.path,this._options.key,this._options.pingInterval);return e.on(Li.Message,t=>{this._handleMessage(t)}),e.on(Li.Error,t=>{this._abort(Pt.SocketError,t)}),e.on(Li.Disconnected,()=>{this.disconnected||(this.emitError(Pt.Network,"Lost connection to server."),this.disconnect())}),e.on(Li.Close,()=>{this.disconnected||this._abort(Pt.SocketClosed,"Underlying socket is already closed.")}),e}_initialize(e){this._id=e,this.socket.start(e,this._options.token)}_handleMessage(e){let t=e.type,i=e.payload,s=e.src;switch(t){case Kt.Open:this._lastServerId=this.id,this._open=!0,this.emit("open",this.id);break;case Kt.Error:this._abort(Pt.ServerError,i.msg);break;case Kt.IdTaken:this._abort(Pt.UnavailableID,`ID "${this.id}" is taken`);break;case Kt.InvalidKey:this._abort(Pt.InvalidKey,`API KEY "${this._options.key}" is invalid`);break;case Kt.Leave:Ce.log(`Received leave message from ${s}`),this._cleanupPeer(s),this._connections.delete(s);break;case Kt.Expire:this.emitError(Pt.PeerUnavailable,`Could not connect to peer ${s}`);break;case Kt.Offer:{let r=i.connectionId,o=this.getConnection(s,r);if(o&&(o.close(),Ce.warn(`Offer received for existing Connection ID:${r}`)),i.type===Di.Media){let c=new Rc(s,this,{connectionId:r,_payload:i,metadata:i.metadata});o=c,this._addConnection(s,o),this.emit("call",c)}else if(i.type===Di.Data){let c=new this._serializers[i.serialization](s,this,{connectionId:r,_payload:i,metadata:i.metadata,label:i.label,serialization:i.serialization,reliable:i.reliable});o=c,this._addConnection(s,o),this.emit("connection",c)}else{Ce.warn(`Received malformed connection type:${i.type}`);return}let a=this._getMessages(r);for(let c of a)o.handleMessage(c);break}default:{if(!i){Ce.warn(`You received a malformed message from ${s} of type ${t}`);return}let r=i.connectionId,o=this.getConnection(s,r);o&&o.peerConnection?o.handleMessage(e):r?this._storeMessage(r,e):Ce.warn("You received an unrecognized message:",e);break}}}_storeMessage(e,t){this._lostMessages.has(e)||this._lostMessages.set(e,[]),this._lostMessages.get(e).push(t)}_getMessages(e){let t=this._lostMessages.get(e);return t?(this._lostMessages.delete(e),t):[]}connect(e,t={}){if(t={serialization:"default",...t},this.disconnected){Ce.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect, or call reconnect on this peer if you believe its ID to still be available."),this.emitError(Pt.Disconnected,"Cannot connect to new Peer after disconnecting from server.");return}let i=new this._serializers[t.serialization](e,this,t);return this._addConnection(e,i),i}call(e,t,i={}){if(this.disconnected){Ce.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect."),this.emitError(Pt.Disconnected,"Cannot connect to new Peer after disconnecting from server.");return}if(!t){Ce.error("To call a peer, you must provide a stream from your browser's `getUserMedia`.");return}let s=new Rc(e,this,{...i,_stream:t});return this._addConnection(e,s),s}_addConnection(e,t){Ce.log(`add connection ${t.type}:${t.connectionId} to peerId:${e}`),this._connections.has(e)||this._connections.set(e,[]),this._connections.get(e).push(t)}_removeConnection(e){let t=this._connections.get(e.peer);if(t){let i=t.indexOf(e);i!==-1&&t.splice(i,1)}this._lostMessages.delete(e.connectionId)}getConnection(e,t){let i=this._connections.get(e);if(!i)return null;for(let s of i)if(s.connectionId===t)return s;return null}_delayedAbort(e,t){setTimeout(()=>{this._abort(e,t)},0)}_abort(e,t){Ce.error("Aborting!"),this.emitError(e,t),this._lastServerId?this.disconnect():this.destroy()}destroy(){this.destroyed||(Ce.log(`Destroy peer with ID:${this.id}`),this.disconnect(),this._cleanup(),this._destroyed=!0,this.emit("close"))}_cleanup(){for(let e of this._connections.keys())this._cleanupPeer(e),this._connections.delete(e);this.socket.removeAllListeners()}_cleanupPeer(e){let t=this._connections.get(e);if(t)for(let i of t)i.close()}disconnect(){if(this.disconnected)return;let e=this.id;Ce.log(`Disconnect peer with ID:${e}`),this._disconnected=!0,this._open=!1,this.socket.close(),this._lastServerId=e,this._id=null,this.emit("disconnected",e)}reconnect(){if(this.disconnected&&!this.destroyed)Ce.log(`Attempting reconnection to server with ID ${this._lastServerId}`),this._disconnected=!1,this._initialize(this._lastServerId);else{if(this.destroyed)throw new Error("This peer cannot reconnect to the server. It has already been destroyed.");if(!this.disconnected&&!this.open)Ce.error("In a hurry? We're still trying to make the initial connection!");else throw new Error(`Peer ${this.id} cannot reconnect because it is not disconnected from the server!`)}}listAllPeers(e=t=>{}){this._api.listAllPeers().then(t=>e(t)).catch(t=>this._abort(Pt.ServerError,t))}};pu=new WeakMap,tr(no,pu,no.DEFAULT_KEY="peerjs");var hu=no;var up=hu;var Dc=[{id:"chef",name:"Chef",emoji:"\u{1F468}\u200D\u{1F373}",tag:"kitchen",color:15921906,ab:"hint",abName:"Secret Recipe",abDesc:"Remove 2 wrong answers on a question (2 times).",charges:2},{id:"doctor",name:"Doctor",emoji:"\u{1FA7A}",tag:"clinic",color:4171680,ab:"revive",abName:"Revive",abDesc:"Bring back a caught teammate. Stand next to their body and press Q (once).",charges:1},{id:"librarian",name:"Librarian",emoji:"\u{1F4DA}",tag:"library",color:8081312,ab:"clue",abName:"Book of Secrets",abDesc:"Reveal one extra clue about the killer (once). Press Q.",charges:1},{id:"scientist",name:"Scientist",emoji:"\u{1F52C}",tag:"lab",color:15263976,ab:"danger",abName:"Danger Sense",abDesc:"Your screen pulses red when the killer is close (automatic).",charges:0},{id:"engineer",name:"Engineer",emoji:"\u{1F527}",tag:"workshop",color:15902976,ab:"second",abName:"Second Chance",abDesc:"A wrong answer will NOT power up the killer (2 times, automatic).",charges:2},{id:"detective",name:"Detective",emoji:"\u{1F575}\uFE0F",tag:"office",color:7031342,ab:"xray",abName:"X-Ray Eyes",abDesc:"See everyone through walls for 5 seconds. Press Q (45s recharge).",cd:45,dur:5},{id:"explorer",name:"Explorer",emoji:"\u{1F9ED}",tag:"outdoor",color:3967548,ab:"sprint",abName:"Super Sprint",abDesc:"Run much faster for 4 seconds. Press Q (25s recharge).",cd:25,dur:4},{id:"artist",name:"Artist",emoji:"\u{1F3A8}",tag:"art",color:14174826,ab:"lamp",abName:"Glow Lamp",abDesc:"Drop a bright lamp that glows for 40 seconds. Press Q (30s recharge).",cd:30,dur:40}],mn=n=>Dc.find(e=>e.id===n)||Dc[0],Gy={kitchen:"Stove",clinic:"Hospital Bed",library:"Bookshelf",lab:"Lab Bench",workshop:"Workbench",office:"Desk",outdoor:"Supply Crates",art:"Easel"},Lc={school:{name:"Haunted School",emoji:"\u{1F3EB}",seed:11,indoor:!0,H:3.8,bg:263432,fog:.085,hemi:[4871288,1709330,.6],floor:[4867646,4209717],wall:7301467,ceil:2828839,trim:3814701,bulb:16770728,blood:6949900,pc:[8018490,6112816,4087658],props:["table","locker","shelf","crate","table"],hub:"Main Hall",exit:"Front Gate",rooms:{"0,0":["library","Library"],"1,0":["lab","Science Lab"],"2,0":["art","Art Room"],"0,1":["kitchen","Canteen"],"2,1":["clinic","Sick Bay"],"0,2":["workshop","Workshop"],"1,2":["outdoor","Gym"],"2,2":["office","Principal's Office"]},links:["11-10","11-01","11-21*","11-12","00-10","00-01*","20-10","02-01","22-21","22-12*"]},hospital:{name:"Abandoned Hospital",emoji:"\u{1F3E5}",seed:23,indoor:!0,H:3.6,bg:198408,fog:.09,hemi:[5933702,1055256,.6],floor:[8227462,7306360],wall:10334378,ceil:5201242,trim:6255213,bulb:13172720,blood:7343373,pc:[14212828,11057332,7177600],props:["bed","bed","locker","crate","table"],hub:"Reception",exit:"Ambulance Bay",rooms:{"0,0":["clinic","Patient Ward"],"1,0":["lab","Laboratory"],"2,0":["library","Records Room"],"0,1":["kitchen","Cafeteria"],"2,1":["workshop","Boiler Room"],"0,2":["art","Therapy Room"],"1,2":["office","Admin Office"],"2,2":["outdoor","Courtyard"]},links:["11-10","11-01*","11-21","11-12","00-10","00-01","10-20","20-21","02-12","02-01*","22-12","22-21*"]},mansion:{name:"Creepy Mansion",emoji:"\u{1F3DA}\uFE0F",seed:37,indoor:!0,H:5,bg:459526,fog:.075,hemi:[6963810,1838606,.6],floor:[5908014,4857638],wall:7030326,ceil:2758674,trim:10123818,bulb:16757594,blood:4851206,pc:[3810328,5913130,8006186],props:["couch","table","pillar","coffin","shelf"],hub:"Grand Hall",exit:"Front Door",rooms:{"0,0":["kitchen","Old Kitchen"],"1,0":["library","Grand Library"],"2,0":["art","Portrait Gallery"],"0,1":["workshop","Cellar Workshop"],"2,1":["lab","Alchemist's Study"],"0,2":["clinic","Sick Room"],"1,2":["office","Butler's Office"],"2,2":["outdoor","Conservatory"]},links:["11-10","11-01","11-21","11-12*","00-10","00-01","20-10*","20-21","02-01","22-12","22-21*","02-12"]},cabin:{name:"Dark Forest Cabin",emoji:"\u{1F332}",seed:53,indoor:!1,H:4.4,bg:132362,fog:.065,hemi:[4873882,1451546,.75],floor:[3428394,2835491],wall:1853992,ceil:0,trim:2759178,bulb:16751168,blood:5376008,pc:[3811866,4863522,2833186],props:["tree","log","tree","grave","crate"],hub:"Cabin Clearing",exit:"Forest Road",rooms:{"0,0":["workshop","Woodcutter's Shed"],"1,0":["outdoor","Old Graveyard"],"2,0":["library","Witch's Library"],"0,1":["kitchen","Campfire Kitchen"],"2,1":["clinic","Healer's Hut"],"0,2":["lab","Swamp Lab"],"1,2":["office","Ranger Station"],"2,2":["art","Painter's Cabin"]},links:["11-10*","11-01","11-21","11-12","00-10","20-21","02-01","22-12","22-21","10-20*","00-01*"]},asylum:{name:"Abandoned Asylum",emoji:"\u{1F9E0}",seed:71,indoor:!0,H:3.7,bg:197892,fog:.1,hemi:[6982258,1186324,.62],floor:[5925468,5135440],wall:9149062,ceil:2765356,trim:3884605,bulb:13625520,blood:5900296,pc:[10135706,7306352,5134928],props:["bed","locker","crate","table","pillar"],hub:"Central Ward",exit:"Main Gate",rooms:{"0,0":["clinic","Patient Cells"],"1,0":["lab","Treatment Room"],"2,0":["library","Records Archive"],"0,1":["kitchen","Mess Hall"],"2,1":["office","Director's Office"],"0,2":["workshop","Boiler Basement"],"1,2":["art","Therapy Room"],"2,2":["outdoor","Padded Block"]},links:["11-10","11-01*","11-21","11-12","00-10","00-01","20-10*","20-21","02-01","22-12*","22-21","02-12"],sn:{kitchen:"Rusty Stove",clinic:"Padded Bed",library:"Patient Files",lab:"Treatment Table",workshop:"Fuse Box",office:"Director's Desk",outdoor:"Supply Crates",art:"Drawing Wall"},story:"The patients are gone... but something is still walking the halls. Find the fuses before the lights die.",hazard:"blackout",hatch:["0,0","2,2"]},hotel:{name:"Haunted Hotel",emoji:"\u{1F3E8}",seed:83,indoor:!0,H:3.4,bg:328709,fog:.08,hemi:[6969928,1577488,.6],floor:[3099210,2506302],wall:10259050,ceil:2825240,trim:13214282,bulb:16765834,blood:3802373,pc:[6965808,9075290,3099210],props:["couch","table","pillar","shelf","bed"],hub:"Grand Lobby",exit:"Hotel Entrance",rooms:{"0,0":["clinic","Room 13"],"1,0":["library","Reading Lounge"],"2,0":["lab","Pool Pump Room"],"0,1":["kitchen","Hotel Kitchen"],"2,1":["office","Front Office"],"0,2":["workshop","Maintenance"],"1,2":["art","Ballroom"],"2,2":["outdoor","Luggage Store"]},links:["11-10","11-01","11-21*","11-12","00-10*","10-20","00-01","20-21","02-01*","02-12","22-12","22-21"],sn:{kitchen:"Hotel Stove",clinic:"Guest Bed",library:"Guest Book",lab:"Pool Chemicals",workshop:"Maintenance Bench",office:"Front Desk",outdoor:"Luggage Pile",art:"Painting Wall"},story:"Check-out time was 100 years ago. The doors here slam shut on their own... Keep moving.",hazard:"slam",hatch:["2,0","0,2"]},bunker:{name:"Underground Bunker",emoji:"\u{1F6A8}",seed:97,indoor:!0,H:3,bg:262915,fog:.09,hemi:[8010296,1312776,.5],floor:[5593694,4869971],wall:6975606,ceil:2895667,trim:9054762,bulb:16743002,blood:3801088,pc:[4870232,6975606,5913136],props:["crate","locker","shelf","table","pillar"],hub:"Command Hall",exit:"Blast Door",rooms:{"0,0":["lab","Reactor Lab"],"1,0":["clinic","Medical Bay"],"2,0":["library","Archive Vault"],"0,1":["kitchen","Ration Hall"],"2,1":["office","Radio Room"],"0,2":["workshop","Generator Room"],"1,2":["outdoor","Supply Depot"],"2,2":["art","Barracks"]},links:["11-10","11-01*","11-21","11-12*","00-10","10-20*","00-01","20-21","02-01","22-21*","02-12","22-12"],sn:{kitchen:"Ration Stove",clinic:"Medical Bunk",library:"Archive Terminal",lab:"Reactor Console",workshop:"Generator",office:"Radio Desk",outdoor:"Supply Lockers",art:"Wall Map"},story:"Deep underground, the air is bad and the siren will not stop. Avoid the green gas clouds!",hazard:"gas",hatch:["0,0","2,1"],gas:["1,0","0,1","1,2"]},carnival:{name:"Creepy Carnival",emoji:"\u{1F3AA}",seed:109,indoor:!0,H:6.2,bg:459530,fog:.07,hemi:[8014474,1706528,.65],floor:[6957658,4857928],wall:10107450,ceil:2756656,trim:14725168,bulb:16765183,blood:5245450,pc:[14725168,11553354,4864650],props:["crate","table","pillar","log","couch"],hub:"Midway Square",exit:"Main Gate",rooms:{"0,0":["library","Ticket Office"],"1,0":["lab","Mirror Maze"],"2,0":["kitchen","Candy Stall"],"0,1":["clinic","Fortune Teller Tent"],"2,1":["office","Ringmaster's Wagon"],"0,2":["workshop","Ride Repair Shed"],"1,2":["art","Clown Tent"],"2,2":["outdoor","Prize Crates"]},links:["11-10","11-01","11-21","11-12","00-10*","10-20","00-01*","20-21","02-01","22-21*","02-12*","22-12"],sn:{kitchen:"Popcorn Machine",clinic:"Fortune Teller's Table",library:"Ticket Booth",lab:"Mirror Panel",workshop:"Ride Control Box",office:"Ringmaster's Desk",outdoor:"Prize Crates",art:"Face-Paint Stand"},story:"The show never ended... and the clown is still laughing. The funhouse mirrors play tricks on your map!",hazard:"mirror",hatch:["2,0","0,2"]}},AT=Object.keys(Lc).map(n=>({id:n,name:Lc[n].name,emoji:Lc[n].emoji}));function Hy(n){let e=n>>>0;return()=>{e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function fi(n,e){let t=Math.min(255,Math.round((n>>16&255)*e)),i=Math.min(255,Math.round((n>>8&255)*e)),s=Math.min(255,Math.round((n&255)*e));return t<<16|i<<8|s}var Vy={table:{w:1.8,h:.8,d:1},couch:{w:2.2,h:.8,d:.9},crate:{w:1,h:1,d:1},bed:{w:2,h:.55,d:.95},coffin:{w:.9,h:.7,d:2},log:{w:2.4,h:.5,d:.55},grave:{w:.8,h:1.1,d:.25},pillar:{w:.7,h:-1,d:.7},tree:{w:.5,h:3.2,d:.5},shelf:{w:.6,h:2.1,d:2.2,wall:!0},locker:{w:.6,h:2,d:1.6,wall:!0}};function dp(n,e){let t=Lc[n],i=!!(e&&e.lockAll),s=Hy(t.seed),r=t.H,o=[],a=[],c=[],l=[],h=[],u=[],d=[],p=[],x=(R,P,U,k,G,ee,ae,Ee,j,ce)=>R.push({s:P,x:U,y:k+ae/2,z:G,w:ee,h:ae,d:Ee,c:j,f:ce||0}),_=(R,P,U,k,G,ee,ae)=>x(o,"b",R,P,U,k,G,ee,ae),g=(R,P,U,k,G,ee,ae,Ee)=>x(a,"b",R,P,U,k,G,ee,ae,Ee),m=(R,P,U,k)=>c.push({x0:R,z0:P,x1:U,z1:k}),S=[];for(let R=0;R<3;R++)for(let P=0;P<3;P++)S.push([P,R]);S.push([1,3]);let E=(R,P)=>R>=0&&R<3&&P>=0&&P<3||R===1&&P===3,M=(R,P)=>R<P?R+"-"+P:P+"-"+R,A=new Map;for(let R of t.links)A.set(M(R.slice(0,2),R.slice(3,5)),{locked:R.endsWith("*")||i});A.set(M("12","13"),{gate:!0});for(let[R,P]of S){let U=R*16,k=P*16,G="hub",ee=t.hub,ae="hub";if(R===1&&P===3)G="exit",ee=t.exit,ae="exit";else if(!(R===1&&P===1)){let Ee=t.rooms[R+","+P];G=Ee[0],ee=Ee[1],ae="room"}h.push({cell:""+R+P,c:R,r:P,tag:G,name:ee,kind:ae,x0:U,z0:k,x1:U+16,z1:k+16,cx:U+16/2,cz:k+16/2})}let w=(t.hatch||[]).map((R,P)=>{let U=h.find(k=>k.c+","+k.r===R);return{id:P,room:h.indexOf(U),x:U.x1-2.4,z:U.z0+2.4,ox:U.x1-4.6,oz:U.z0+4.6}}),y=(t.gas||[]).map(R=>{let P=h.find(U=>U.c+","+U.r===R);return{x:P.cx,z:P.cz,r:2.8}});for(let R of h){let P=t.floor[(R.c+R.r)%2];if(R.kind==="hub"&&(P=fi(P,1.25)),R.kind==="exit"&&(P=2050602),_(R.cx,-.3,R.cz,16,.3,16,P),t.indoor)_(R.cx,r,R.cz,16,.3,16,t.ceil),g(R.cx,r-.1,R.cz,.9,.1,.9,R.kind==="exit"?6750105:t.bulb,1),p.push({x:R.cx,y:r-.15,z:R.cz,c:R.kind==="exit"?3407752:t.bulb,r:5.8});else{let U=R.cx+(s()<.5?-1:1)*2.5,k=R.cz+(s()<.5?-1:1)*2.5;_(U,0,k,.14,2.4,.14,t.trim),g(U,2.4,k,.32,.32,.32,R.kind==="exit"?6750105:t.bulb,1),p.push({x:U,y:2.55,z:k,c:R.kind==="exit"?3407752:t.bulb,r:4.6}),m(U-.1,k-.1,U+.1,k+.1)}}function T(R,P,U,k,G){let ee=G==null?[[U,k]]:[[U,G-1.7],[G+1.7,k]];for(let[ae,Ee]of ee){let j=Ee-ae;if(j<.02)continue;let ce=(ae+Ee)/2,ye=fi(t.wall,.86+.28*s());if(R==="v"?(_(P,0,ce,.4,r,j+.4,ye),_(P,0,ce,.4+.08,.3,j+.4,t.trim),m(P-.4/2,ae-.4/2,P+.4/2,Ee+.4/2)):(_(ce,0,P,j+.4,r,.4,ye),_(ce,0,P,j+.4,.3,.4+.08,t.trim),m(ae-.4/2,P-.4/2,Ee+.4/2,P+.4/2)),!t.indoor)for(let Me=ae+.8;Me<Ee;Me+=2.3){let he=o.length;x(o,"k",R==="v"?P:Me,r-.4,R==="v"?Me:P,2.8,3.4,2.8,fi(t.wall,.8+.5*s()))}}if(G!=null){t.indoor&&(R==="v"?_(P,3,G,.4,r-3,3.4,fi(t.wall,.9)):_(G,3,P,3.4,r-3,.4,fi(t.wall,.9)));for(let ae of[-1,1]){let Ee=G+ae*1.7;R==="v"?_(P,0,Ee,.4+.14,3,.16,t.trim):_(Ee,0,P,.16,3,.4+.14,t.trim)}}}function O(R,P,U,k){let G={id:l.length,kind:R.gate?"gate":"lock",o:P,cx:U,cz:k};G.col=P==="v"?{x0:U-.2,z0:k-3.4/2,x1:U+.2,z1:k+3.4/2}:{x0:U-3.4/2,z0:k-.2,x1:U+3.4/2,z1:k+.2},l.push(G),G.kind==="lock"&&(P==="v"?(d.push({door:G.id,x:U-.34,z:k+3.4/2+.4,o:P}),d.push({door:G.id,x:U+.34,z:k-3.4/2-.4,o:P})):(d.push({door:G.id,x:U+3.4/2+.4,z:k-.34,o:P}),d.push({door:G.id,x:U-3.4/2-.4,z:k+.34,o:P})))}for(let[R,P]of S){let U=R*16,k=P*16;if(E(R+1,P)){let G=A.get(M(""+R+P,""+(R+1)+P));T("v",U+16,k,k+16,G?k+16/2:null),G&&(G.locked||G.gate)&&O(G,"v",U+16,k+16/2)}else T("v",U+16,k,k+16,null);if(E(R,P+1)){let G=A.get(M(""+R+P,""+R+(P+1)));T("h",k+16,U,U+16,G?U+16/2:null),G&&(G.locked||G.gate)&&O(G,"h",U+16/2,k+16)}else T("h",k+16,U,U+16,null);E(R-1,P)||T("v",U,k,k+16,null),E(R,P-1)||T("h",k,U,U+16,null)}function I(R,P,U){let k=[12595248,3170496,3186768,13672480];switch(R){case"kitchen":_(P,0,U,1.5,.9,.9,4870230),g(P-.3,.9,U,.45,.05,.45,16742938,1),_(P+.35,.9,U,.4,.35,.4,10066329),m(P-.8,U-.5,P+.8,U+.5);break;case"clinic":_(P,.3,U,2,.25,.95,14474460),_(P-.7,.55,U,.4,.15,.6,16777215),_(P+1.3,0,U+.4,.05,1.7,.05,11184810),g(P+1.3,1.3,U+.4,.14,.3,.1,6737151,0),m(P-1,U-.5,P+1,U+.5);break;case"library":_(P,0,U,1.8,2.1,.55,5913122);for(let G=0;G<4;G++)_(P-.6+G*.4,.9,U+.3,.15,.4,.1,k[G]);m(P-.95,U-.3,P+.95,U+.3);break;case"lab":_(P,0,U,1.9,.9,.8,13620182),g(P-.45,.9,U,.2,.35,.2,4259728,1),_(P+.5,.9,U,.25,.4,.2,2236962),m(P-1,U-.45,P+1,U+.45);break;case"workshop":_(P,0,U,1.9,.95,.85,7031338),_(P+.6,.95,U,.2,.3,.3,3355443),_(P-.4,.95,U,.5,.15,.3,8947848),m(P-1,U-.45,P+1,U+.45);break;case"office":_(P,0,U,1.9,.8,.95,4861984),g(P-.6,.8,U,.15,.35,.15,16769162,1),_(P+.4,.8,U,.5,.05,.4,15658734),m(P-1,U-.5,P+1,U+.5);break;case"outdoor":_(P,0,U,1.1,1.1,1.1,9071162),_(P+.9,0,U+.2,.9,.9,.9,8018474),_(P+.2,1.1,U,.8,.7,.8,10123850),m(P-.6,U-.6,P+1.4,U+.7);break;case"art":_(P-.5,0,U,.07,1.7,.07,6965802),_(P+.5,0,U,.07,1.7,.07,6965802),_(P,.6,U,1.1,1.1,.07,16117984),_(P-.2,1,U+.05,.3,.3,.02,k[0]),_(P+.2,.8,U+.05,.3,.3,.02,k[1]),m(P-.6,U-.2,P+.6,U+.2);break}}h.forEach((R,P)=>{if(R.kind!=="room")return;[[R.x0+3.4,R.z0+3.4],[R.x1-3.4,R.z1-3.4]].forEach(([k,G],ee)=>{u.push({id:u.length,room:P,tag:R.tag,x:k,z:G,name:t.sn&&t.sn[R.tag]||Gy[R.tag]}),I(R.tag,k,G)})});let B=R=>{let P=[];for(let[U,k]of[[R.x0,R.cz],[R.x1,R.cz],[R.cx,R.z0],[R.cx,R.z1]])P.push({x0:U-3.2,x1:U+3.2,z0:k-3.2,z1:k+3.2});for(let U of u)U.room===h.indexOf(R)&&P.push({x0:U.x-2.4,x1:U.x+2.4,z0:U.z-2.4,z1:U.z+2.4});for(let U of w)U.room===h.indexOf(R)&&P.push({x0:U.x-2.6,x1:U.x+2.6,z0:U.z-2.6,z1:U.z+2.6});return P},H=(R,P,U=0)=>R.x0<P.x1+U&&R.x1>P.x0-U&&R.z0<P.z1+U&&R.z1>P.z0-U;for(let R of h){if(R.kind==="exit"){g(R.cx,2.2,R.z1-.5,4,.7,.1,3211104,0);for(let G of[-5,5])_(R.cx+G,0,R.cz,.6,r,.6,t.trim),g(R.cx+G,.2,R.cz,.15,r-.4,.15,3211104,0),m(R.cx+G-.3,R.cz-.3,R.cx+G+.3,R.cz+.3);continue}if(R.kind==="hub"){p.push({x:R.cx,y:1,z:R.cz,c:16724016,r:3.4}),_(R.cx,0,R.cz,1.3,.9,1.3,2763310),g(R.cx,.9,R.cz,.5,.12,.5,16719904,0),m(R.cx-.65,R.cz-.65,R.cx+.65,R.cz+.65);for(let[G,ee]of[[-6,-6],[6,-6],[-6,6],[6,6]])_(R.cx+G,0,R.cz+ee,.8,r,.8,t.trim),m(R.cx+G-.4,R.cz+ee-.4,R.cx+G+.4,R.cz+ee+.4);_(R.cx,0,R.cz,7,.03,7,fi(t.floor[0],.7));continue}for(let G of w)if(G.room===h.indexOf(R)){_(G.x,0,G.z,2.2,.05,2.2,659220);for(let ee of[-1,1])g(G.x+ee*1.05,.05,G.z,.1,.05,2.2,3199231,1),g(G.x,.05,G.z+ee*1.05,2.2,.05,.1,3199231,1);g(G.x,.05,G.z,.3,1.7,.3,3199231,0)}let P=B(R),U=[],k=5+Math.floor(s()*3);for(let G=0;G<k;G++){let ee=t.props[Math.floor(s()*t.props.length)],ae=Vy[ee];for(let Ee=0;Ee<25;Ee++){let j=ae.w,ce=ae.d,ye,Me;if(ae.wall){let st=Math.floor(s()*4);st<2?(j=ae.d,ce=ae.w,ye=R.x0+2.5+s()*11,Me=st===0?R.z0+.4/2+ce/2+.05:R.z1-.4/2-ce/2-.05):(ye=st===2?R.x0+.4/2+j/2+.05:R.x1-.4/2-j/2-.05,Me=R.z0+2.5+s()*11)}else ye=R.x0+1.8+s()*(16-3.6),Me=R.z0+1.8+s()*(16-3.6);let he={x0:ye-j/2,x1:ye+j/2,z0:Me-ce/2,z1:Me+ce/2};if(P.some(st=>H(he,st))||U.some(st=>H(he,st,.7)))continue;U.push(he);let Be=fi(t.pc[Math.floor(s()*t.pc.length)],.8+.4*s());if(ee==="tree")_(ye,0,Me,.5,2.2,.5,3811864),x(o,"k",ye,1.6,Me,2.6,3.4,2.6,fi(t.wall,.7+.4*s())),m(he.x0,he.z0,he.x1,he.z1);else{let st=ae.h<0?r:ae.h;_(ye,0,Me,j,st,ce,Be),m(he.x0,he.z0,he.x1,he.z1),ee==="table"&&_(ye,0,Me,j*.8,.05,ce*.8,fi(Be,.6))}break}}for(let G=0;G<2;G++){let ee=.8+s()*.8,ae=.6+s()*.8;_(R.x0+2+s()*12,0,R.z0+2+s()*12,ee,.02,ae,t.blood)}}let Z=h.find(R=>R.kind==="hub"),D=h.find(R=>R.kind==="exit"),$=[];for(let R=0;R<12;R++){let P=R/12*Math.PI*2,U=Z.cx+Math.cos(P)*4.6,k=Z.cz+Math.sin(P)*4.6;$.push({x:U,z:k,yaw:Math.atan2(-(Z.cx-U),-(Z.cz-k))})}return{id:n,name:t.name,emoji:t.emoji,D:t,S:16,H:r,indoor:t.indoor,hazard:t.hazard||"",story:t.story||"",hatches:w,gas:y,rooms:h,doors:l,panels:d,stations:u,parts:o,glow:a,lamps:p,cols:c,spawn:$,button:{x:Z.cx,z:Z.cz},exit:{x0:D.x0+.6,z0:D.z0+.6,x1:D.x1-.6,z1:D.z1-.6},bounds:{x0:0,z0:0,x1:48,z1:64}}}var Xe=null,Nn=null,Uc=null,Tt=null,yu=.8,_u=2,xu=null,ro=null,Ni={},Nc={},Wy=["scream","jumpscare","step","run","door_open","creak","correct","wrong","hint","revive","lamp","heartbeat","killer_power","alarm","body_found","exit_open","time_warning","escape","win","lose"],Xy={cabin:"school",hospital:"school",mansion:"school",school:"hospital",asylum:"hospital",hotel:"mansion",bunker:"school",carnival:"mansion"};function fp(){if(Xe){Xe.state==="suspended"&&Xe.resume();return}let n=window.AudioContext||window.webkitAudioContext;if(!n)return;Xe=new n,Nn=Xe.createGain(),Nn.gain.value=yu,Nn.connect(Xe.destination),Uc=Xe.createBuffer(1,Xe.sampleRate*2,Xe.sampleRate);let e=Uc.getChannelData(0);for(let t=0;t<e.length;t++)e[t]=Math.random()*2-1;Wy.forEach(Oc)}function Oc(n){return Nc[n]||(Nc[n]=fetch(n+".mp3").then(e=>{if(!e.ok||!(e.headers.get("content-type")||"").includes("audio"))throw new Error("missing");return e.arrayBuffer()}).then(e=>Xe.decodeAudioData(e)).then(e=>(Ni[n]=e,e)).catch(()=>null)),Nc[n]}var pp=n=>!!Ni[n],mp=()=>({loaded:Object.keys(Ni),music:!!(Tt&&Tt.music),escape:!!(Tt&&Tt.escape),ducked:!!(Tt&&Tt.ducked),state:Xe&&Xe.state}),gp=!1;function Fc(n){yu=n,Nn&&!gp&&(Nn.gain.value=n)}function _p(n){gp=n,Nn&&(Nn.gain.value=n?0:yu)}function oo(n){_u=n}function qy(n){if(!Xe.createStereoPanner)return null;let e=Xe.createStereoPanner();return e.pan.value=Math.max(-1,Math.min(1,n||0)),e}function vu(n,e){let t=qy(e);t?(n.connect(t),t.connect(Nn)):n.connect(Nn)}function bt(n,e,t,i,s,r,o){if(!Xe)return;let a=Xe.currentTime+(o||0),c=Xe.createOscillator(),l=Xe.createGain();c.type=n,c.frequency.setValueAtTime(e,a),c.frequency.exponentialRampToValueAtTime(Math.max(1,t),a+i),l.gain.setValueAtTime(1e-4,a),l.gain.exponentialRampToValueAtTime(s,a+Math.min(.03,i/4)),l.gain.exponentialRampToValueAtTime(1e-4,a+i),c.connect(l),vu(l,r),c.start(a),c.stop(a+i+.05)}function is(n,e,t,i,s,r,o,a){if(!Xe)return;let c=Xe.currentTime+(o||0),l=Xe.createBufferSource();l.buffer=Uc,l.loop=!0;let h=Xe.createBiquadFilter();h.type=e,h.Q.value=a||1,h.frequency.setValueAtTime(t,c),h.frequency.exponentialRampToValueAtTime(Math.max(20,i),c+n);let u=Xe.createGain();u.gain.setValueAtTime(1e-4,c),u.gain.exponentialRampToValueAtTime(s,c+Math.min(.04,n/3)),u.gain.exponentialRampToValueAtTime(1e-4,c+n),l.connect(h),h.connect(u),vu(u,r),l.start(c,Math.random()),l.stop(c+n+.05)}function Mt(n,e,t){t=t||{};let i=Ni[n];if(!i||!Xe)return null;let s=Xe.createBufferSource();s.buffer=i,s.loop=!!t.loop,t.rate&&(s.playbackRate.value=t.rate);let r=Xe.createGain(),o=Xe.currentTime;return t.dur!=null?(r.gain.setValueAtTime(0,o),r.gain.linearRampToValueAtTime(e,o+.02),r.gain.setValueAtTime(e,o+Math.max(.03,t.dur-.05)),r.gain.linearRampToValueAtTime(0,o+t.dur)):r.gain.value=e,s.connect(r),vu(r,t.pan),t.dur!=null?s.start(0,t.offset||0,t.dur):s.start(0,t.offset||0),{s,gn:r}}var Re={step(n,e){let t=n??1;if(Ni.step){Mt("step",.7*t,{offset:Math.random()*Math.max(.1,Ni.step.duration-.5),dur:.4,pan:e,rate:.92+Math.random()*.16});return}is(.09,"bandpass",380,160,.05*t,e)},run(){Mt("run",.8)||bt("sine",400,700,.3,.1)},door(){Mt("door_open",.8)||(bt("sawtooth",90,45,.7,.12),is(.7,"lowpass",500,120,.15))},correct(){Mt("correct",.9)||Re.chime()},wrong(){Mt("wrong",.9)||Re.buzz()},hint(){Mt("hint",.9)||Re.chime()},revive(){Mt("revive",1)||Re.chime()},lamp(){Mt("lamp",.8)||Re.chime()},chime(){bt("sine",660,660,.35,.12),bt("sine",880,880,.5,.12,0,.12),bt("sine",1320,1320,.6,.1,0,.24)},buzz(){bt("square",140,110,.45,.14),bt("square",100,80,.45,.1,0,.05)},click(){bt("sine",520,400,.06,.06)},creak(){if(Ni.creak){Mt("creak",.5,{rate:.85+Math.random()*.3,pan:Math.random()*2-1});return}is(1.2+Math.random(),"bandpass",300+Math.random()*300,900+Math.random()*500,.05,Math.random()*2-1,0,14)},thud(){bt("sine",70,35,.35,.2,Math.random()*2-1)},whisper(){for(let n=0;n<4;n++)is(.35,"bandpass",1500+Math.random()*1500,2500,.05,Math.random()*2-1,n*.3,4)},killerNear(){Mt("killer_power",.7)||Re.whisper()},heart(){bt("sine",62,38,.18,.28),bt("sine",58,36,.2,.22,0,.2)},heartLoop(n){if(!n){if(ro){try{ro.s.stop()}catch{}ro=null}return}!ro&&Ni.heartbeat&&(ro=Mt("heartbeat",.9,{loop:!0}))},alarm(){if(!Mt("alarm",.8))for(let n=0;n<6;n++)bt("square",n%2?520:760,n%2?520:760,.3,.07,0,n*.3)},bodyFound(){Mt("body_found",.9)||(Re.alarm(),Re.gong())},exitAlarm(){Mt("exit_open",.8)||Re.alarm()},warn(){Mt("time_warning",.9)||Re.gong()},gong(){bt("sine",110,100,2.2,.25),bt("sine",220,200,1.8,.1),is(1.5,"bandpass",500,200,.08)},sting(){Mt("jumpscare",1)||(bt("sawtooth",880,700,.9,.22),bt("sawtooth",933,740,.9,.22),bt("sawtooth",1250,1e3,.9,.18),is(.9,"highpass",1500,4e3,.3))},scream(n){let e=n??1;if(!Mt("scream",e)){for(let t=0;t<3;t++)bt("sawtooth",700+t*90,1500+t*120,1.3,.16*e,0,t*.02),bt("sawtooth",1100+t*50,900,1.1,.08*e,0,.25+t*.03);is(1.3,"bandpass",2200,3200,.25*e,0,0,2),bt("sine",120,60,1.4,.3*e)}},escape(){Mt("escape",1)||Re.win()},win(){Mt("win",.9)||[523,659,784,1046].forEach((n,e)=>bt("triangle",n,n,.5,.15,0,e*.16))},lose(){Mt("lose",.9)||[392,330,262,196].forEach((n,e)=>bt("sawtooth",n,n*.98,.7,.12,0,e*.3))}};async function Yy(n){let e="music_"+n;return await Oc(e)?e:(e="music_"+(Xy[n]||"school"),await Oc(e)?e:null)}var xp=.5;function Su(n){if(ao(),!Xe)return;let e=[],t=Xe.createGain();t.gain.value=1e-4,t.gain.exponentialRampToValueAtTime(.09,Xe.currentTime+4),t.connect(Nn);let i=Xe.createBiquadFilter();i.type="lowpass",i.frequency.value=220,i.connect(t);for(let p of[55,55.7,82.4]){let x=Xe.createOscillator();x.type="sawtooth",x.frequency.value=p,x.connect(i),x.start(),e.push(x)}let s=Xe.createOscillator(),r=Xe.createGain();s.frequency.value=.12,r.gain.value=70,s.connect(r),r.connect(i.frequency),s.start(),e.push(s);let o=Xe.createBufferSource();o.buffer=Uc,o.loop=!0;let a=Xe.createBiquadFilter();a.type="bandpass",a.frequency.value=400,a.Q.value=.8;let c=Xe.createGain();c.gain.value=.03;let l=Xe.createOscillator(),h=Xe.createGain();l.frequency.value=.07,h.gain.value=250,l.connect(h),h.connect(a.frequency),l.start(),o.connect(a),a.connect(c),c.connect(Nn),o.start(),e.push(o,l);let u={nodes:e,g:t,music:null,escape:null,ducked:!1};Tt=u,Yy(n).then(p=>{Tt!==u||!p||(u.music=Mt(p,1e-4,{loop:!0}),u.music&&(u.music.gn.gain.setTargetAtTime(u.ducked?.12:xp,Xe.currentTime,1.5),t.gain.setTargetAtTime(.03,Xe.currentTime,2)))});let d=()=>{if(Tt===u){if(_u>=1){let p=Math.random();p<.4?Re.creak():p<.7?Re.thud():_u>=2&&Re.whisper()}xu=setTimeout(d,6e3+Math.random()*12e3)}};xu=setTimeout(d,4e3)}function bu(n){Tt&&(Tt.ducked=n,Tt.music&&Tt.music.gn.gain.setTargetAtTime(n?.12:Tt.escape?.1:xp,Xe.currentTime,.4))}async function yp(){let n=Tt;!n||n.escape||!await Oc("music_escape")||Tt!==n||(n.escape=Mt("music_escape",1e-4,{loop:!0}),n.escape&&n.escape.gn.gain.setTargetAtTime(.55,Xe.currentTime,1),n.music&&n.music.gn.gain.setTargetAtTime(.08,Xe.currentTime,1))}function ao(){if(clearTimeout(xu),Re.heartLoop(!1),!!Tt){for(let n of Tt.nodes)try{n.stop()}catch{}try{Tt.g.disconnect()}catch{}for(let n of[Tt.music,Tt.escape])if(n)try{n.s.stop()}catch{}Tt=null}}var Ie=128,Ge=1,$n=!1;function ss(){let n=document.createElement("canvas");return n.width=n.height=Ie,n}function rs(n){let e=n>>>0;return()=>{e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function Ys(n,e,t,i,s,r){t=Math.round(t*Ge*Ge);for(let o=0;o<t;o++){let a=(1+e()*s)*Ge;n.fillStyle=(r&&e()<.4?"rgba(255,255,255,":"rgba(0,0,0,")+(e()*i).toFixed(3)+")",n.fillRect(e()*Ie,e()*Ie,a,a)}}function Zs(n,e,t){if($n){for(let i=0;i<7;i++){let s=e()*Ie,r=(2+e()*5)*Ge,o=n.createLinearGradient(0,0,0,Ie*(.4+e()*.6));o.addColorStop(0,"rgba(0,0,0,"+(.1*t).toFixed(3)+")"),o.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=o,n.fillRect(s,0,r,Ie)}for(let i=0;i<4;i++){let s=e()*Ie,r=e()*Ie,o=n.createRadialGradient(s,r,1,s,r,(14+e()*26)*Ge);o.addColorStop(0,"rgba(0,0,0,"+(.16*t).toFixed(3)+")"),o.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=o,n.fillRect(0,0,Ie,Ie)}n.strokeStyle="rgba(0,0,0,"+(.13*t).toFixed(3)+")",n.lineWidth=Ge;for(let i=0;i<10;i++){let s=e()*Ie,r=e()*Ie;n.beginPath(),n.moveTo(s,r),n.lineTo(s+(6+e()*14)*Ge,r+(e()-.5)*8*Ge),n.stroke()}}}function os(n){let e=new Cn(n);return e.wrapS=e.wrapT=Cs,e.colorSpace=Et,e.anisotropy=$n?4:2,e}function kc(n){let e=rs(n),t=ss(),i=t.getContext("2d");i.fillStyle="#e9e9e9",i.fillRect(0,0,Ie,Ie);for(let o=0;o<5;o++){let a=i.createRadialGradient(e()*Ie,e()*Ie,2*Ge,e()*Ie,e()*Ie,(30+e()*30)*Ge);a.addColorStop(0,"rgba(0,0,0,.10)"),a.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=a,i.fillRect(0,0,Ie,Ie)}Ys(i,e,700,.1,2,!0),i.strokeStyle="rgba(0,0,0,.28)",i.lineWidth=Ge,i.beginPath();let s=(20+e()*80)*Ge,r=0;for(i.moveTo(s,r);r<Ie;)s+=(e()-.5)*12*Ge,r+=(6+e()*8)*Ge,i.lineTo(s,r);return i.stroke(),Zs(i,e,1),os(t)}function Mu(n,e){let t=rs(n),i=ss(),s=i.getContext("2d"),r=Ie/e;s.fillStyle="#efefef",s.fillRect(0,0,Ie,Ie);for(let o=0;o<e;o++)for(let a=0;a<e;a++)s.fillStyle="rgba(0,0,0,"+(t()*($n?.11:.07)).toFixed(3)+")",s.fillRect(o*r,a*r,r,r),$n&&(s.fillStyle="rgba(255,255,255,.35)",s.fillRect(o*r+2*Ge,a*r+2*Ge,r-5*Ge,2*Ge));s.fillStyle="rgba(30,30,30,.55)";for(let o=0;o<e;o++)s.fillRect(o*r,0,2*Ge,Ie),s.fillRect(0,o*r,Ie,2*Ge);return Ys(s,t,500,.12,2,!1),Zs(s,t,1.2),os(i)}function Zy(n){let e=rs(n),t=ss(),i=t.getContext("2d");i.fillStyle="#e4e4e4",i.fillRect(0,0,Ie,Ie);for(let s=0;s<8;s++)i.fillStyle="rgba(0,0,0,.13)",i.fillRect(s*16*Ge,0,8*Ge,Ie);i.fillStyle="rgba(0,0,0,.28)";for(let s=0;s<4;s++)for(let r=0;r<4;r++){let o=(s*32+16)*Ge,a=(r*32+16)*Ge;i.beginPath(),i.moveTo(o,a-5*Ge),i.lineTo(o+4*Ge,a),i.lineTo(o,a+5*Ge),i.lineTo(o-4*Ge,a),i.closePath(),i.fill(),$n&&(i.fillStyle="rgba(255,255,255,.22)",i.beginPath(),i.arc(o,a,1.6*Ge,0,7),i.fill(),i.fillStyle="rgba(0,0,0,.28)")}return Ys(i,e,400,.1,2,!1),Zs(i,e,1.1),os(t)}function Jy(n){let e=rs(n),t=ss(),i=t.getContext("2d"),s=Ie/4;for(let r=0;r<4;r++){let o=e()*Ie;i.fillStyle="rgba("+(205+e()*40|0)+","+(205+e()*40|0)+","+(205+e()*40|0)+",1)",i.fillRect(0,r*s,Ie,s);for(let a=0;a<14*($n?2:1);a++){i.strokeStyle="rgba(0,0,0,"+(.06+e()*.1).toFixed(2)+")",i.beginPath();let c=r*s+e()*s;i.moveTo(0,c),i.lineTo(Ie,c+(e()-.5)*3*Ge),i.stroke()}i.fillStyle="rgba(20,20,20,.6)",i.fillRect(o%Ie,r*s,2*Ge,s),i.fillRect(0,r*s,Ie,2*Ge)}return Zs(i,e,1),os(t)}function vp(n){let e=rs(n),t=ss(),i=t.getContext("2d");i.fillStyle="#d6d6d6",i.fillRect(0,0,Ie,Ie),Ys(i,e,1400,.28,4,!0),i.strokeStyle="rgba(0,0,0,.22)",i.lineWidth=Ge;for(let s=0;s<140*Ge;s++){let r=e()*Ie,o=e()*Ie;i.beginPath(),i.moveTo(r,o),i.lineTo(r+(e()-.5)*5*Ge,o-(3+e()*5)*Ge),i.stroke()}if($n)for(let s=0;s<6;s++){let r=e()*Ie,o=e()*Ie,a=i.createRadialGradient(r,o,1,r,o,(10+e()*18)*Ge);a.addColorStop(0,"rgba(60,40,20,.28)"),a.addColorStop(1,"rgba(60,40,20,0)"),i.fillStyle=a,i.fillRect(0,0,Ie,Ie)}return os(t)}function Sp(n){let e=rs(n),t=ss(),i=t.getContext("2d");return i.fillStyle="#e2e2e2",i.fillRect(0,0,Ie,Ie),Ys(i,e,900,.16,1,!1),i.fillStyle="rgba(0,0,0,.45)",i.fillRect(0,0,Ie,2*Ge),i.fillRect(0,0,2*Ge,Ie),i.fillRect(0,Ie/2,Ie,Ge),i.fillRect(Ie/2,0,Ge,Ie),Zs(i,e,1.4),os(t)}function Tu(n){let e=rs(n),t=ss(),i=t.getContext("2d");i.fillStyle="#dcdcdc",i.fillRect(0,0,Ie,Ie);for(let s=0;s<46*($n?2:1);s++){i.strokeStyle="rgba(0,0,0,"+(.05+e()*.14).toFixed(2)+")",i.lineWidth=(1+e()*2)*Ge;let r=e()*Ie;i.beginPath(),i.moveTo(r,0),i.bezierCurveTo(r+(e()-.5)*14*Ge,Ie*.3,r+(e()-.5)*14*Ge,Ie*.7,r+(e()-.5)*8*Ge,Ie),i.stroke()}return Ys(i,e,150,.12,2,!1),Zs(i,e,.8),os(t)}function bp(n,e){switch($n=!!e,Ie=$n?256:128,Ge=Ie/128,n){case"hospital":return{w:Mu(11,4),f:Mu(12,4),c:Sp(13),p:kc(14)};case"mansion":return{w:Zy(21),f:Jy(22),c:kc(23),p:Tu(24)};case"cabin":return{w:vp(31),f:vp(32),c:kc(33),p:Tu(34)};default:return{w:kc(41),f:Mu(42,2),c:Sp(43),p:Tu(44)}}}function Mp(n){let t=document.createElement("canvas");t.width=512,t.height=80*n.length;let i=t.getContext("2d");n.forEach((r,o)=>{let a=o*80;i.fillStyle="#17202a",i.fillRect(0,a,512,80),i.strokeStyle="#d8c070",i.lineWidth=5,i.strokeRect(4,a+4,504,72),i.fillStyle="#f4efe0",i.font="bold 40px Inter, DejaVu Sans, sans-serif",i.textAlign="center",i.textBaseline="middle",i.fillText(r.toUpperCase(),256,a+80/2+2,480)});let s=new Cn(t);return s.colorSpace=Et,s.anisotropy=4,{tex:s,rows:n.length}}function Tp(){let n=document.createElement("canvas");n.width=n.height=128;let e=n.getContext("2d"),t=e.createRadialGradient(64,64,2,64,64,64);t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.35,"rgba(255,255,255,.45)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,128,128);let i=new Cn(n);return i.colorSpace=Et,i}function Ep(){let n=document.createElement("canvas");n.width=64,n.height=128;let e=n.getContext("2d"),t=e.createRadialGradient(32,50,2,32,60,56);t.addColorStop(0,"rgba(200,225,255,.9)"),t.addColorStop(.5,"rgba(160,200,255,.35)"),t.addColorStop(1,"rgba(160,200,255,0)"),e.fillStyle=t,e.beginPath(),e.ellipse(32,62,30,60,0,0,7),e.fill(),e.fillStyle="rgba(0,0,30,.6)",e.beginPath(),e.ellipse(24,40,4,7,0,0,7),e.ellipse(40,40,4,7,0,0,7),e.fill();let i=new Cn(n);return i.colorSpace=Et,i}var W=n=>document.getElementById(n),uo=new URLSearchParams(location.search),$y=!!uo.get("debug"),ht=n=>String(n).replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e]),$s=(n,e,t)=>Math.max(e,Math.min(t,n));function jy(){let n=uo.get("pjs");if(n){let[e,t]=n.split(":");return{host:e,port:+t,path:"/",secure:!1,debug:0}}return{debug:0}}var fo=1.6,Ap=.35,wp=4,f={name:"",code:"",job:"chef",q:1,id:0,role:"crew",phase:"join",lobby:[],map:null,mapId:"",players:new Map,doors:[],bodies:[],tasks:[],prog:[0,0],clues:[],alive:!0,escaped:!1,ghost:!1,charges:{},rage:0,kcd:0,cdTotal:25,scare:2,myScare:2,paused:!1,qbox:null,meeting:null,exitOpen:!1,xcode:[],xn:0,warnLeft:3,warnCd:0,hatchCd:0,blackout:0,mirror:0,inGas:!1,gasT:0,hatchSeen:new Set,xray:0,sprint:0,abilCd:0,danger:!1,flick:0,dark:0,frozenUntil:0,pos:{x:0,y:fo,z:0},yaw:0,pitch:0,pings:[],lamps:[],waitingQ:!1,emergLeft:1,jump:0,appT:60,stepT:0,onBreak:!1,tl:null,w2:!1,w30:!1,smooth:!1,fps:0,showFps:!1,dangerOn:!1,mode:"classic",aliveN:0,escN:0,auto:!1,forceClassic:!1,autoClassic:!1},N={},It={},Js=null,Un=null,Hc=!1,Vc=0;function ft(n,e){W(n).style.display=e?"flex":"none"}function nt(n,e,t){let i=document.createElement("div");i.className="tst "+(t||""),i.innerHTML=n,W("toast").appendChild(i),setTimeout(()=>i.classList.add("out"),(e||3500)-400),setTimeout(()=>i.remove(),e||3500)}function cs(n,e){let t=W("flash");t.style.background=n,t.style.opacity=.55,setTimeout(()=>t.style.opacity=0,e||250)}var pi=()=>Math.min(f.scare,f.myScare),Ky=new Set(["ask","kill","report","emerg","ability","code","warn","hatch"]);function Lt(n){if(Ky.has(n.t)&&(n.px=+f.pos.x.toFixed(2),n.pz=+f.pos.z.toFixed(2)),Un&&Un.open)try{Un.send(n)}catch{}}W("code").value=(uo.get("room")||"").toUpperCase();W("btnJoin").onclick=()=>{let n=W("nm").value.trim(),e=W("code").value.trim().toUpperCase();if(!n)return W("jmsg").textContent="Please type your name.";if(e.length<4)return W("jmsg").textContent="Please type the 4-letter room code.";f.name=n,f.code=e;{let t=W("gfx").value;if(f.auto=t==="a",f.smooth=t==="s",f.q=t==="s"?0:t==="a"?1:+t,f.autoClassic=!1,f.auto)try{f.autoClassic=localStorage.getItem("se_fb")==="1"}catch{}}f.showFps=!!uo.get("fps"),fp(),Dp()};W("nm").addEventListener("keydown",n=>{n.key==="Enter"&&W("btnJoin").click()});W("code").addEventListener("keydown",n=>{n.key==="Enter"&&W("btnJoin").click()});function Dp(){W("jmsg").textContent="Connecting\u2026",Hc=!1;try{Js&&Js.destroy()}catch{}Js=new up(jy());let n=setTimeout(()=>{Hc||(W("jmsg").textContent="Cannot reach the room. Check the code and the Wi-Fi, and make sure the teacher page is open.")},12e3);Js.on("open",()=>{Un=Js.connect("shadowesc-"+f.code,{reliable:!0,serialization:"json"}),Un.on("open",()=>{Vc=0,Un.send({t:"join",name:f.name,job:f.job})}),Un.on("data",e=>{try{ev(e)}catch(t){console.error(t)}}),Un.on("close",()=>{clearTimeout(n),Qy()}),Un.on("error",()=>{})}),Js.on("error",e=>{clearTimeout(n),e.type==="peer-unavailable"?W("jmsg").textContent='Room "'+f.code+'" not found. Check the code with your teacher.':Hc||(W("jmsg").textContent="Connection problem ("+e.type+").")})}function Np(n){if(f.off=!!n,W("offbox").style.display=n?"flex":"none",n){f.paused=!0,document.exitPointerLock&&document.exitPointerLock();for(let e in It)It[e]=!1;document.activeElement&&document.activeElement.blur&&document.activeElement.blur()}_p(!!n)}function Qy(){f.phase!=="join"&&(f.off&&Np(!1),W("lost").style.display="flex",W("lostMsg").textContent="Connection lost\u2026 trying to reconnect ("+(Vc+1)+")",document.exitPointerLock&&document.exitPointerLock(),Vc++<30?setTimeout(Dp,2500):W("lostMsg").textContent="The teacher closed the game or the connection is gone. Reload the page to join again.")}function Iu(){let n=f.lobby.find(e=>e.id===f.id);n&&(f.job=n.job),W("lobPlayers").innerHTML=f.lobby.map(e=>'<span class="chip'+(e.id===f.id?" me":"")+'">'+mn(e.job).emoji+" "+ht(e.name)+"</span>").join(""),W("jobGrid").innerHTML=Dc.map(e=>{let t=f.lobby.find(i=>i.job===e.id&&i.id!==f.id);return'<div class="job'+(e.id===f.job?" sel":"")+(t?" taken":"")+'" data-j="'+e.id+'"><div class="je">'+e.emoji+"</div><b>"+e.name+"</b><small>\u2B50 "+e.abName+'</small><small class="jd">'+e.abDesc+"</small>"+(t?"<em>"+ht(t.name)+"</em>":"")+"</div>"}).join(""),W("jobGrid").querySelectorAll(".job").forEach(e=>e.addEventListener("click",()=>{e.classList.contains("taken")||(f.job=e.dataset.j,Lt({t:"pick",job:f.job}),Iu(),Re.click())}))}function ev(n){switch(n.t){case"joined":Hc=!0,f.id=n.id,W("lost").style.display="none",f.phase==="join"&&(f.phase="lobby",ft("join",!1),ft("lobby",!0));break;case"reject":W("jmsg").textContent=n.why,Vc=99,f.phase="join";break;case"lobby":f.lobby=n.players,f.phase==="lobby"&&Iu();break;case"start":vv(n);break;case"s":bv(n);break;case"q":Cv(n);break;case"deny":f.waitingQ=!1,nt(ht(n.why),n.alarm?4500:2500,"bad"),n.alarm?(Re.alarm(),cs("#c00",500)):Re.wrong();break;case"digit":f.xcode[n.i]=n.d,f.xn=n.n,nt("\u{1F522} <b>Exit code digit "+(n.i+1)+" of "+n.n+": "+n.d+"</b> (saved in your notebook [C])",4500,"clue"),Re.hint();break;case"alarm":f.pings.push({x:n.x,z:n.z,t:9}),nt("\u{1F6A8} <b>Exit alarm!</b> A student is at the keypad in the "+ht(n.room)+"!",5e3,"bad"),Re.alarm();break;case"warned":f.pings.push({x:n.x,z:n.z,t:9}),nt("\u{1F4E3} <b>"+ht(n.name)+"</b> warns: the killer is in the <b>"+ht(n.room)+"</b>!",5e3,"bad"),Re.hint();break;case"warnok":f.warnLeft=n.left,nt("\u{1F4E3} Warning sent! ("+n.left+" left)",2e3,"good");break;case"hint":Lv(n);break;case"res":Dv(n);break;case"door":Du(n.id,n.open,!0);break;case"clue":f.clues.push(n.text),nt("\u{1F50E} <b>NEW CLUE:</b> "+ht(n.text),6e3,"clue"),Re.hint();break;case"dead":Mv(n);break;case"revive":Tv(n);break;case"escaped":Ev(n);break;case"flick":f.flick=1.4,pi()>=1&&(f.dark=pi()>=2?.5:0,Re.killerNear());break;case"rage":f.rage=n.n,f.pings.push({x:n.x,z:n.z,t:9}),nt("\u{1F608} A wrong answer in the <b>"+ht(n.room)+"</b>! You feel stronger. (Power "+n.n+")",5e3,"bad");break;case"killok":f.kcd=n.cd;break;case"meet":Nv(n);break;case"voted":f.meeting&&(f.meeting.voted=n.voted,ho());break;case"ready":f.meeting&&(f.meeting.ready=n.ready,ho());break;case"tp":f.pos.x=n.x,f.pos.z=n.z,f.pos.y=f.ghost?2:fo,f.yaw=n.yaw,n.hatch&&(f.hatchCd=25,cs("#000",450),Re.door(),nt("\u{1F573}\uFE0F You slipped through the secret passage!",2500,"good"));break;case"hz":Pv(n);break;case"meetend":Uv(n);break;case"exitopen":Av(n);break;case"end":wv(n);break;case"off":Np(n.on);break;case"paused":f.paused=n.on,W("pausebox").style.display=n.on?"flex":"none",n.on&&document.exitPointerLock&&document.exitPointerLock();break;case"cfg":f.scare=n.scare,f.forceClassic=n.look==="classic",oo(pi()),Qs();break;case"danger":f.danger=n.on;break;case"lamp":kp(n.x,n.z);break;case"gone":{let e=f.players.get(n.id);e&&(e.st=1),n.id===f.id&&(f.alive=!1,f.ghost=!0);break}case"abused":f.charges=n.charges;break;case"tolobby":tv();break;case"caughtnote":Ks("\u{1F480} "+ht(n.name).toUpperCase()+" WAS CAUGHT!",n.left>0?"\u{1F3C3} "+n.left+(n.left===1?" student is":" students are")+" still running!":"Nobody is left\u2026",3800),Re.bodyFound();break}}function tv(){f.dangerOn=!1,ao(),W("bodyBanner").style.display="none",f.phase="lobby",f.meeting=null,f.qbox=null;for(let n of["hud","qbox","meet","end","role","pausebox","jump","cluebox","menu","breakbox"])ft(n,!1);W("btnBreak").style.display="none",f.onBreak=!1,ft("lobby",!0),document.exitPointerLock&&document.exitPointerLock(),W("app").classList.remove("playing"),Iu()}var nv={w:2.4,f:2,c:2,p:1.2};function iv(n,e){if(n.s!=="b")return"p";let t=n.y+n.h/2,i=n.y-n.h/2,s=Math.min(n.w,n.d);return t<=.05?"f":i>=e-.05?"c":s<=.8&&(n.h>=2.4||n.h<=.32&&i<.05&&s<=.5)?"w":"p"}function Wc(n,e,t){let i=n.attributes.position,s=i.count,r=new Float32Array(s*3),o=new We(e);for(let a=0;a<s;a++){let c=t?t(i.getX(a),i.getY(a),i.getZ(a)):1;r[a*3]=o.r*c,r[a*3+1]=o.g*c,r[a*3+2]=o.b*c}n.setAttribute("color",new Gt(r,3))}function sv(n,e,t){let i;n.s==="b"?i=new fn(n.w,n.h,n.d):n.s==="k"?i=new Cr(n.w/2,n.h,7):i=new Vn(n.w/2,n.w/2,n.h,8),i.translate(n.x,n.y,n.z);let s=i.attributes.position,r=i.attributes.normal,o=i.attributes.uv,a=nv[e||"p"];for(let c=0;c<s.count;c++){let l=Math.abs(r.getX(c)),h=Math.abs(r.getY(c)),u=Math.abs(r.getZ(c)),d=s.getX(c),p=s.getY(c),x=s.getZ(c);h>=l&&h>=u?o.setXY(c,d/a,x/a):l>=u?o.setXY(c,x/a,p/a):o.setXY(c,d/a,p/a)}return Wc(i,n.c,t),i}function Bc(n,e,t){if(!n.length)return null;let i=n.map(r=>sv(r,e,t)),s=Ki(i,!1);return i.forEach(r=>r.dispose()),s}function rv(n,e,t,i,s){let r=document.createElement("canvas");r.width=e,r.height=t;let o=r.getContext("2d");o.font=i,o.textAlign="center",o.textBaseline="middle",o.lineWidth=6,o.strokeStyle="rgba(0,0,0,.85)",o.strokeText(n,e/2,t/2),o.fillStyle=s||"#fff",o.fillText(n,e/2,t/2);let a=new Cn(r);return a.colorSpace=Et,a}function ov(){if(N.renderer)return;let n=f.q;N.renderer=new uc({canvas:W("gl"),antialias:n>=2,powerPreference:"high-performance"}),N.prBase=[.55,.8,Math.min(window.devicePixelRatio||1,1.25)][n],N.pr=N.prBase,N.renderer.setPixelRatio(N.pr),N.renderer.shadowMap.enabled=!0,N.renderer.shadowMap.type=Xi,N.renderer.setSize(innerWidth,innerHeight,!1),N.camera=new Xt(72,innerWidth/innerHeight,.08,70),N.camera.rotation.order="YXZ",addEventListener("resize",()=>{N.renderer.setSize(innerWidth,innerHeight,!1),N.camera.aspect=innerWidth/innerHeight,N.camera.updateProjectionMatrix()})}function av(){let n=f.map,e=n.D,t=N.scene=new yr;if(t.background=new We(e.bg),t.fog=new xr(e.bg,e.fog),N.camera.clear(),t.add(N.camera),N.look=null,N.staticGroup=null,Up(Ru()),N.glowTex=N.glowTex||Tp(),N.pools=N.halos=null,n.lamps.length){let o=[],a=new Float32Array(n.lamps.length*3),c=new Float32Array(n.lamps.length*3);n.lamps.forEach((h,u)=>{let d=new Ei(h.r*2,h.r*2);d.rotateX(-Math.PI/2),d.translate(h.x,.05,h.z),Wc(d,h.c),o.push(d);let p=new We(h.c);a.set([h.x,h.y,h.z],u*3),c.set([p.r,p.g,p.b],u*3)}),N.pools=new ot(Ki(o,!1),new $t({map:N.glowTex,vertexColors:!0,transparent:!0,opacity:.5,blending:Pi,depthWrite:!1})),N.poolBase=n.indoor?.5:.75,t.add(N.pools);let l=new Rt;l.setAttribute("position",new Gt(a,3)),l.setAttribute("color",new Gt(c,3)),N.halos=new Ns(l,new Vi({map:N.glowTex,size:2.8,sizeAttenuation:!0,vertexColors:!0,transparent:!0,opacity:.7,blending:Pi,depthWrite:!1})),N.halos.frustumCulled=!1,t.add(N.halos)}N.dustN=110,N.dustP=new Float32Array(N.dustN*3);for(let o=0;o<N.dustN;o++)N.dustP[o*3]=(Math.random()-.5)*16,N.dustP[o*3+1]=Math.random()*3.6,N.dustP[o*3+2]=(Math.random()-.5)*16;let i=new Rt;N.dustAttr=new Gt(N.dustP,3),i.setAttribute("position",N.dustAttr),N.dust=new Ns(i,new Vi({map:N.glowTex,color:n.indoor?13619151:16770442,size:n.indoor?.12:.16,transparent:!0,opacity:n.indoor?.35:.8,depthWrite:!1})),N.dust.frustumCulled=!1,t.add(N.dust),N.wispTex=N.wispTex||Ep(),N.wisps=[];for(let o=0;o<3;o++){let a=new Mi(new ai({map:N.wispTex,transparent:!0,opacity:0,depthWrite:!1,blending:Pi}));a.scale.set(1.7,3.4,1),a.userData.ph=o*2.1,t.add(a),N.wisps.push(a)}N.gasS=[];for(let o of n.gas||[])for(let a=0;a<4;a++){let c=new Mi(new ai({map:N.glowTex,color:7012170,transparent:!0,opacity:.32,depthWrite:!1,blending:Pi}));c.scale.set(5.2,3.2,1),c.userData={x:o.x,z:o.z,ph:a*1.7,r:o.r*.6,y:.6+a*.35},t.add(c),N.gasS.push(c)}if(N.hemi=new Ir(e.hemi[0],e.hemi[1],e.hemi[2]),t.add(N.hemi),N.hemiBase=e.hemi[2]*1.3,!e.indoor){let o=new Ur(7309e3,.55);o.position.set(-20,40,10),t.add(o)}N.flash=new Dr(16773328,60,28,.55,.55,1.5),N.flash.position.set(.15,-.1,0),N.flash.target.position.set(0,0,-6),N.camera.add(N.flash),N.camera.add(N.flash.target),N.flash.shadow.mapSize.set(512,512),N.flash.shadow.camera.near=.3,N.flash.shadow.camera.far=28,N.flash.shadow.bias=-8e-4,N.lantern=new Os(16769712,7,7,1.6),N.camera.add(N.lantern),N.doors=[],N.doorLight=[];let s=new Rn({color:2238513});for(let o of n.doors){let a=o.o==="v"?new fn(.3,3,3.4):new fn(3.4,3,.3),c=o.kind==="gate"?new Rn({color:10099740,emissive:3343364}):new Rn({color:5913122}),l=new ot(a,c);l.position.set(o.cx,3/2,o.cz),t.add(l),N.doors[o.id]={mesh:l,open:!1,t:0},N.doorLight[o.id]=new $t({color:16719904})}for(let o of n.panels){let a=new ot(new fn(o.o==="v"?.14:.55,.8,o.o==="v"?.55:.14),s);a.position.set(o.x,1.25,o.z),t.add(a);let c=new ot(new fn(.22,.22,.22),N.doorLight[o.door]);c.position.set(o.x,1.45,o.z),t.add(c)}N.markers=new Map;for(let o of f.tasks)o.done||pv(o.sid);let r=n.exit;N.exitBeam=new ot(new Vn(.8,.8,4,12,1,!0),new $t({color:4259712,transparent:!0,opacity:.25,depthWrite:!1})),N.exitBeam.position.set((r.x0+r.x1)/2,2,(r.z0+r.z1)/2+3),N.exitBeam.visible=!1,t.add(N.exitBeam),N.bodies=[],N.lamps=[],N.xrayMat=new $t({color:6741503,transparent:!0,opacity:.4,depthTest:!1}),N.xrayGeo=new Hn(.28,1.1,2,6),Lu()}var Ru=()=>f.forceClassic||f.smooth||f.q===0||f.autoClassic?"classic":"rich";function cv(n){n.traverse(e=>{e.geometry&&e.geometry.dispose(),e.material&&(e.material.map&&e.material.map.dispose(),e.material.dispose())})}function lv(n){let e=n.D,t=[],i=[];if(!e.indoor)return{deco:t,glass:i};let s=e.seed*7919>>>0,r=()=>{s=s+1831565813|0;let h=Math.imul(s^s>>>15,1|s);return h=h+Math.imul(h^h>>>7,61|h)^h,((h^h>>>14)>>>0)/4294967296},o=(h,u,d,p,x,_,g,m)=>h.push({s:"b",x:u,y:d+_/2,z:p,w:x,h:_,d:g,c:m}),a=[12597547,3049153,13937677,2600544,9323693,15105570],c=.23,l=e.bg===198408?5209996:3428474;for(let h of n.rooms){for(let d=0;d<2;d++){let p=Math.floor(r()*4),x=r()<.5?-1:1,_=3.6+r()*3,g=a[Math.floor(r()*a.length)],m=p<2,S=m?h.cx+x*_:p===2?h.x0+c:h.x1-c,E=m?p===0?h.z0+c:h.z1-c:h.cz+x*_,M=m?.85:.03,A=m?.03:.85,w=m?.7:.05,y=m?.05:.7;o(t,S,1.25,E,M,1.15,A,15262415),o(t,S,1.95,E,w,.32,y,g);for(let T=0;T<3;T++)o(t,S,1.7-T*.17,E,m?.6:.045,.045,m?.045:.6,5591112)}let u=[];if(h.c===0&&u.push("W"),h.c===2&&u.push("E"),h.r===0&&u.push("N"),h.kind==="exit"&&u.push("W","E"),h.kind!=="hub")for(let d of u){let p=d==="N",x=d==="N"?h.cx:d==="W"?h.x0+c:h.x1-c,_=d==="N"?h.z0+c:h.cz,g=p?2.1:.1,m=p?.1:2.1,S=p?1.85:.07,E=p?.07:1.85,M=2759956,A=p;o(i,x,1.3,_,S,1.3,E,l),i[i.length-1].f=0,o(t,x,1.15,_,A?2.1:.12,.12,A?.12:2.1,M),o(t,x,2.65,_,A?2.1:.12,.12,A?.12:2.1,M),o(t,A?x-1:x,1.15,A?_:_-1,.12,1.6,.12,M),o(t,A?x+1:x,1.15,A?_:_+1,.12,1.6,.12,M),o(t,x,1.3,_,A?.07:.14,1.3,A?.14:.07,M),o(t,x,1.9,_,A?1.85:.14,.06,A?.14:1.85,M)}}return{deco:t,glass:i}}function Up(n){let e=N.scene,t=f.map,i=n==="rich",s=t.H;N.staticGroup&&(e.remove(N.staticGroup),cv(N.staticGroup));let r=N.staticGroup=new bn;e.add(r),N.look=n,N.tex=bp(f.mapId,i);let o={w:[],f:[],c:[],p:[]};for(let d of t.parts)o[iv(d,s)].push(d);let a=d=>i&&(d==="w"||d==="p")?(p,x)=>(x<.9?.7+.3*(x/.9):1)*(s-x<.8?.84+.16*((s-x)/.8):1):null;for(let d of["w","f","c","p"]){let p=Bc(o[d],d,a(d));if(!p)continue;let x=new ot(p,new Rn({vertexColors:!0,map:N.tex[d]}));x.receiveShadow=i,x.castShadow=i&&(d==="w"||d==="p"),r.add(x)}let c=i?lv(t):{deco:[],glass:[]},l=Bc(c.deco,"p");l&&r.add(new ot(l,new Rn({vertexColors:!0})));let h=Bc(t.glow.filter(d=>!d.f).concat(c.glass)),u=Bc(t.glow.filter(d=>d.f));if(h&&r.add(new ot(h,new $t({vertexColors:!0}))),N.flickMat=new $t({vertexColors:!0}),u&&r.add(new ot(u,N.flickMat)),i&&t.indoor){let d=t.rooms.map(g=>g.name),p=Mp(d),x=d.length,_=[];t.rooms.forEach((g,m)=>{let S=new Ei(3.2,.62),E=S.attributes.uv,M=1-(m+1)/x;for(let A=0;A<E.count;A++)E.setY(A,M+E.getY(A)/x);S.translate(g.cx+5.4,2.8,g.z0+.2+.025),Wc(S,16777215),_.push(S)}),r.add(new ot(Ki(_,!1),new Rn({vertexColors:!0,map:p.tex})))}}var hv=new Vn(.35,.35,3.4,10,1,!0),uv=new $t({color:16765770,transparent:!0,opacity:.2,depthWrite:!1}),dv=new Rr(.28),fv=new $t({color:16765770});function pv(n){if(N.markers.has(n))return;let e=f.map.stations[n],t=new bn,i=new ot(hv,uv);i.position.y=1.7,t.add(i);let s=new ot(dv,fv);s.position.y=2.3,t.add(s),t.position.set(e.x,0,e.z),N.scene.add(t),N.markers.set(n,{g:t,gem:s})}function mv(n){let e=N.markers.get(n);e&&(N.scene.remove(e.g),N.markers.delete(n))}function Lu(){f.colList=f.map.cols.slice(),f.map.doors.forEach(n=>{f.doors[n.id]||f.colList.push(n.col)})}function Cp(n,e){let t=Ap*Ap,i=f.colList;for(let s=0;s<i.length;s++){let r=i[s],o=n<r.x0?r.x0:n>r.x1?r.x1:n,a=e<r.z0?r.z0:e>r.z1?r.z1:e,c=n-o,l=e-a;if(c*c+l*l<t)return!0}return!1}function Du(n,e,t){if(f.doors[n]===e)return;f.doors[n]=e,Lu();let i=N.doors&&N.doors[n];i&&(i.open=e),N.doorLight&&N.doorLight[n]&&N.doorLight[n].color.setHex(e?3211104:16719904),t&&Re.door()}var Rp=new Rn({vertexColors:!0});function Je(n,e,t,i,s,r,o,a,c){o!=null&&e.scale(o,a??o,c??o),e.translate(i,s,r),Wc(e,t),n.push(e)}var Eu=new Map;function gv(n){if(Eu.has(n.id))return Eu.get(n.id);let e=[],t=h=>new li(h,12,9),i=(h,u,d)=>new fn(h,u,d),s=(h,u)=>new Vn(h,h,u,12),r=n.color,o=14922895;Je(e,new Hn(.22,.4,3,10),r,0,1.02,0,1,1,.82),Je(e,t(.21),o,0,1.62,0,1,1.05,1);for(let h of[-1,1])Je(e,t(.058),16777215,h*.08,1.645,.19,1,1,.6),Je(e,t(.03),1118481,h*.08,1.645,.215),Je(e,i(.1,.02,.02),3811874,h*.08,1.735,.18);Je(e,i(.09,.02,.02),9058874,0,1.54,.2),Je(e,t(.032),13803644,0,1.6,.215);for(let h of[-1,1])Je(e,t(.05),o,h*.205,1.62,0,.6,1,1);switch(Je(e,new Vn(.07,.08,.14,8),o,0,1.44,0),Je(e,new li(.22,12,6,0,Math.PI*2,0,Math.PI/2),2759958,0,1.69,-.045,1,.9,1),n.id){case"chef":Je(e,s(.2,.26),16777215,0,1.88,0),Je(e,t(.25),16777215,0,2.06,0,1,.8,1);break;case"doctor":Je(e,s(.22,.06),16777215,0,1.76,0),Je(e,s(.06,.02),13621468,0,1.8,.2),Je(e,i(.22,.06,.02),16722474,0,1.08,.19),Je(e,i(.06,.22,.02),16722474,0,1.08,.19);break;case"librarian":Je(e,i(.1,.07,.02),2236962,-.075,1.65,.205),Je(e,i(.1,.07,.02),2236962,.075,1.65,.205),Je(e,i(.05,.015,.02),2236962,0,1.65,.205),Je(e,i(.2,.28,.06),8934860,.3,.85,.12);break;case"scientist":Je(e,i(.44,.09,.06),3394798,0,1.76,.17),Je(e,new Hn(.235,.3,3,10),16053492,0,.82,0,1,1,.85);break;case"engineer":Je(e,new li(.24,12,8,0,Math.PI*2,0,Math.PI/2),16763904,0,1.68,0),Je(e,i(.5,.04,.34),16763904,0,1.68,.06);break;case"detective":Je(e,s(.34,.04),4862752,0,1.78,0),Je(e,s(.2,.2),4862752,0,1.9,0),Je(e,s(.205,.05),1381653,0,1.83,0);break;case"explorer":Je(e,s(.38,.04),13152368,0,1.78,0),Je(e,s(.2,.18),13152368,0,1.88,0),Je(e,i(.36,.5,.18),3103279,0,1.08,-.27);break;case"artist":Je(e,t(.28),13378099,.05,1.82,0,1,.38,1),Je(e,s(.03,.08),13378099,.05,1.93,0),Je(e,i(.2,.14,.03),14596231,.3,.85,.1);break}let a=[],c=[];Je(a,new Hn(.09,.4,3,6),2830138,0,-.3,0),Je(a,i(.17,.08,.28),1381653,0,-.6,.04),Je(c,new Hn(.075,.36,3,6),r,0,-.25,0),Je(c,t(.07),o,0,-.52,0);let l={body:Ki(e,!1),leg:Ki(a,!1),arm:Ki(c,!1)};return Eu.set(n.id,l),l}function Op(n){let e=gv(mn(n)),t=new bn;t.add(new ot(e.body,Rp));let i=(s,r,o)=>{let a=new ot(s,Rp);return a.position.set(r,o,0),t.add(a),a};return t.children.forEach(s=>{s.castShadow=!0}),t.userData={legL:i(e.leg,-.12,.78),legR:i(e.leg,.12,.78),armL:i(e.arm,-.32,1.3),armR:i(e.arm,.32,1.3)},t}function _v(){let n=new bn,e=new $t({color:10475263,transparent:!0,opacity:.45,depthWrite:!1}),t=new ot(new Hn(.26,1,2,8),e);t.position.y=1,n.add(t);let i=new ot(new li(.22,8,8),e);return i.position.y=1.75,n.add(i),n}function xv(n){let e=Op(n.job),t=_v(),i=new ot(N.xrayGeo,N.xrayMat);i.position.y=1,i.renderOrder=999,i.visible=!1,e.add(i);let s=new Mi(new ai({map:rv(n.name,256,64,"bold 34px sans-serif"),transparent:!0}));s.scale.set(1.6,.4,1),s.position.y=2.35,e.add(s);let r=s.clone();t.add(r),r.position.y=2.3,N.scene.add(e),N.scene.add(t),e.visible=!1,t.visible=!1,n.av=e,n.gh=t,n.xr=i,n.cx=n.tx=0,n.cz=n.tz=0,n.cy=n.ty=0,n.cyaw=n.tyaw=0,n.new=!0,n.moving=0,n.stepT=0}function Fp(n,e,t){let i=f.players.get(n),s=Op(i?i.job:"chef");s.rotation.order="YXZ",s.rotation.x=-Math.PI/2,s.rotation.y=Math.random()*6,s.position.set(e,.25,t);let r=new ot(new wr(.9,14),new $t({color:6948872}));return r.rotation.x=-Math.PI/2,r.position.set(e,.03,t),N.scene.add(s),N.scene.add(r),{id:n,x:e,z:t,a:s,pool:r}}function yv(){for(let n of N.bodies)N.scene.remove(n.a),N.scene.remove(n.pool);N.bodies=[],f.bodies=[]}function kp(n,e){let t=new ot(new li(.22,10,8),new $t({color:16771488}));t.position.set(n,.3,e),N.scene.add(t);let i=null;if(f.q>=1&&(i=new Os(16771504,22,14,1.4),i.position.set(n,1.2,e),N.scene.add(i)),N.lamps.push({m:t,light:i,t:40}),N.lamps.length>4){let s=N.lamps.shift();N.scene.remove(s.m),s.light&&N.scene.remove(s.light)}}function vv(n){ov(),f.mode=n.mode||"classic",f.aliveN=0,f.escN=0,f.mapId=n.map,f.map=dp(n.map,{lockAll:f.mode==="survival"}),f.role=n.role,f.id=n.id,f.tasks=n.tasks,f.doors=n.doors.split("").map(e=>e==="1"),f.prog=n.prog,f.clues=n.clues.slice(),f.exitOpen=n.exitOpen,f.hatchCd=f.blackout=f.mirror=0,f.inGas=!1,f.hatchSeen=new Set,f.xcode=(n.xcode||[]).slice(),f.xn=n.xn||0,f.warnLeft=n.warnLeft==null?3:n.warnLeft,f.warnCd=0,f.charges=n.charges,f.alive=n.alive,f.escaped=n.escaped,f.ghost=!n.alive||n.escaped,f.rage=n.rage,f.paused=n.paused,f.scare=n.scare,f.forceClassic=n.look==="classic",f.cdTotal=n.cd,f.kcd=0,f.xray=f.sprint=f.abilCd=0,f.danger=!1,f.pings=[],f.qbox=null,f.meeting=null,f.emergLeft=1,f.waitingQ=!1,f.appT=50+Math.random()*40,f.tl=n.tl,f.w2=n.tl!=null&&n.tl<=120,f.w30=n.tl!=null&&n.tl<=30,f.onBreak=!1,ft("breakbox",!1),W("btnBreak").style.display="block",oo(pi()),av(),Qs(),W("fps").style.display=f.showFps?"block":"none",W("chkFps").checked=f.showFps,f.players=new Map(n.players.map(e=>[e.id,Object.assign({},e,{st:0})]));for(let[e,t]of n.status)f.players.has(e)&&(f.players.get(e).st=t);for(let e of f.players.values())e.id!==f.id&&xv(e);f.doors.forEach((e,t)=>{N.doors[t]&&(N.doors[t].open=e,N.doors[t].t=e?1:0,N.doors[t].mesh.visible=!e,e&&N.doorLight[t].color.setHex(3211104))}),Lu();for(let e of n.bodies)N.bodies.push(Fp(e.id,e.x,e.z));(n.exitOpen||f.mode==="survival")&&(N.exitBeam.visible=!0),f.pos={x:n.spawn.x,y:f.ghost?2:fo,z:n.spawn.z},f.yaw=n.spawn.yaw,f.pitch=0,f.phase=n.phase==="meeting"?"meeting":"play";for(let e of["join","lobby","end","lost","qbox"])ft(e,!1);ft("hud",!0),W("app").classList.add("playing"),W("pausebox").style.display=n.paused?"flex":"none",W("hudRole").textContent=mn(f.job).emoji+" "+mn(f.job).name,W("hudRole").className="crew",W("hudMap").textContent=f.map.emoji+" "+f.map.name+(f.mode==="survival"?" \xB7 SURVIVAL":""),W("killbtn").style.display="none",Su(f.mapId),n.resume?nt("Reconnected!",2500):Sv(),n.brk&&qc(!0),qp()}function Sv(){let n=f.role==="killer";W("roleBig").textContent=n?"YOU ARE THE KILLER":"YOU ARE CREW",W("roleBig").className=n?"k":"c",W("roleSub").innerHTML=n?f.mode==="survival"?"SURVIVAL MODE! Nobody knows it is you. Catch EVERYONE before they escape!<br>The doors are locked until the crew open them. Press <b>F</b> or <b>click</b> next to a student to catch them.":"Nobody knows it is you. Catch the crew one by one, but don't get caught!<br>You still get questions to look busy. Press <b>F</b> or <b>click</b> next to a student to catch them.":f.mode==="survival"?"SURVIVAL MODE! One of your friends is the killer, but you will not know who!<br>Every door is locked: answer questions to open them. Finish your tasks, open the exit and RUN. If you are caught you become a ghost.<br>Survive!":"One of your friends is the killer! Do your tasks (answer questions) to open the exit, find clues, and vote out the killer.<br>Stay together and watch out!",ft("role",!0),W("roleTapBox").style.display="flex",W("roleShow").style.display="none",f.frozenUntil=performance.now()+3e4,clearTimeout(f.roleT),f.roleT=setTimeout(Bp,15e3)}function Bp(){W("roleShow").style.display!=="block"&&(clearTimeout(f.roleT),W("roleTapBox").style.display="none",W("roleShow").style.display="block",Re.gong(),setTimeout(()=>{ft("role",!1),f.frozenUntil=performance.now(),f.phase==="play"&&(W("lockhint").style.display="flex"),f.map&&f.map.story&&Ks("\u{1F4CD} "+ht(f.map.name),ht(f.map.story),7e3)},3500))}W("btnRoleTap").addEventListener("click",Bp);function bv(n){if(f.map){for(let[e,t,i,s,r,o]of n.p){let a=f.players.get(e);a&&(a.st=o,e!==f.id&&(a.tx=t,a.ty=i,a.tz=s,a.tyaw=r,a.new&&a.av&&(a.cx=t,a.cy=i,a.cz=s,a.cyaw=r,a.new=!1)))}f.prog[0]=n.pr,n.al!=null&&(f.aliveN=n.al,f.escN=n.es),n.tl!=null&&(f.tl=n.tl,n.tl>130&&(f.w2=!1),n.tl>40&&(f.w30=!1),n.tl<=120&&!f.w2&&(f.w2=!0,nt("\u23F0 <b>2 minutes left!</b> Finish the tasks and escape!",5e3,"bad"),Re.warn()),n.tl<=30&&!f.w30&&(f.w30=!0,nt("\u23F0 <b>30 seconds left!</b>",5e3,"bad"),Re.warn())),n.d.split("").forEach((e,t)=>Du(t,e==="1",!0)),n.kc!=null&&(f.kcd=n.kc),n.rg!=null&&(f.rage=n.rg)}}function Mv(n){let e=f.players.get(n.id);e&&(e.st=1),N.bodies.push(Fp(n.id,n.x,n.z)),f.bodies.push({id:n.id,x:n.x,z:n.z});let t=Math.hypot(f.pos.x-n.x,f.pos.z-n.z);n.you?(f.alive=!1,f.ghost=!0,f.jump=1.7,f.qbox=null,ft("qbox",!1),ft("kpbox",!1),Re.scream(1),Re.sting(),cs("#a00",500),pi()>=2?Ov():(W("jump").style.display="flex",Fv()),W("jump").style.display="flex",setTimeout(()=>{W("jump").style.display="none",nt("\u{1F480} <b>You were caught!</b> You are a ghost now. You can fly around and still do your tasks to help your team!",8e3,"bad")},1800),document.exitPointerLock&&document.exitPointerLock()):t<45&&(Re.scream(Math.max(.2,1-t/45)),pi()>=2&&t<18&&cs("#800",300),nt("\u{1F631} Someone screamed!",3e3,"bad"))}function Tv(n){let e=f.players.get(n.id);e&&(e.st=0);let t=N.bodies.findIndex(i=>i.id===n.id);t>=0&&(N.scene.remove(N.bodies[t].a),N.scene.remove(N.bodies[t].pool),N.bodies.splice(t,1)),f.bodies=f.bodies.filter(i=>i.id!==n.id),Re.revive(),n.id===f.id?(f.alive=!0,f.ghost=!1,f.pos.x=n.x,f.pos.z=n.z,f.pos.y=fo,nt("\u{1F49A} You were revived by the Doctor!",5e3,"good")):nt("\u{1F49A} "+ht(e?e.name:"Someone")+" was revived!",3500,"good")}function Ev(n){let e=f.players.get(n.id);e&&(e.st=2),n.id===f.id?(f.escaped=!0,f.ghost=!0,nt(f.mode==="survival"?"\u{1F3C3} <b>YOU ESCAPED!</b> You are safe. Now you are a HELPER \u2013 press <b>V</b> to warn the others where the killer is!":"\u{1F3C3} <b>YOU ESCAPED!</b> You are safe. You can watch the others.",9e3,"good"),Re.escape()):nt("\u{1F3C3} "+ht(e?e.name:"Someone")+" escaped!",3500,"good")}function Av(){f.exitOpen=!0,N.exitBeam&&(N.exitBeam.visible=!0);let n=f.map.doors.findIndex(e=>e.kind==="gate");n>=0&&Du(n,!0,!0),Re.exitAlarm(),yp(),nt("\u{1F6AA} <b>ALL TASKS DONE!</b> The EXIT is open. RUN to the green light!",9e3,"good"),f.flick=2}function wv(n){f.phase="ended",f.dangerOn=!1,ao(),W("bodyBanner").style.display="none",document.exitPointerLock&&document.exitPointerLock();for(let s of["hud","qbox","meet","pausebox","jump","cluebox","menu","role","lockhint","breakbox"])ft(s,!1);W("btnBreak").style.display="none",f.onBreak=!1,W("lockhint").style.display="none";let e=n.winner==="crew",t=f.role==="killer",i=e!==t;W("endTitle").textContent=e?"\u{1F389} THE CREW WINS!":"\u{1F52A} THE KILLER WINS!",W("endTitle").className=e?"c":"k",W("endSub").innerHTML=(n.reason==="time"?"\u23F0 <b>Time is up!</b><br>":"")+"The killer was <b>"+mn(n.killer.job).emoji+" "+ht(n.killer.name)+"</b>.<br>"+(i?"You won! \u{1F3C6}":"Better luck next time!")+(n.mode==="survival"?'<br><span style="color:#ffd34a">\u{1F3C3} Escape Champion: <b>'+ht(n.champ||"\u2014")+"</b> &nbsp;\xB7&nbsp; \u2B50 Top Scorer: <b>"+ht(n.top||"\u2014")+"</b></span>":""),W("endTable").innerHTML="<tr><th>Name</th><th>Job</th><th>Tasks</th><th>\u2713</th><th>\u2717</th><th>Result</th>"+(n.mode==="survival"?"<th>\u2B50 Points</th>":"")+"</tr>"+(n.mode==="survival"?n.stats.slice().sort((s,r)=>r.score-s.score):n.stats).map(s=>'<tr class="'+(s.role==="killer"?"kr":"")+'"><td>'+ht(s.name)+(s.role==="killer"?" \u{1F52A}":"")+"</td><td>"+mn(s.job).emoji+"</td><td>"+s.done+"/"+s.total+"</td><td>"+s.correct+"</td><td>"+s.wrong+"</td><td>"+(n.mode==="survival"&&s.order&&s.order<=3?["\u{1F947}","\u{1F948}","\u{1F949}"][s.order-1]+" ":"")+s.status+"</td>"+(n.mode==="survival"?"<td><b>"+s.score+"</b></td>":"")+"</tr>").join(""),ft("end",!0),(i?Re.win:Re.lose)()}function Cv(n){if(f.waitingQ=!1,f.phase!=="play")return;f.qbox={qid:n.qid,kind:n.kind,id:n.id,locked:!1,hint:n.hint,hinted:!1,n:n.opts.length},ft("kpbox",!1),W("qTitle").textContent=n.kind==="boss"?"\u{1F6AA} EXIT QUESTION \u2013 answer to open the door!":n.kind==="lock"?"\u{1F512} Unlock the door":"\u{1F4DD} Task: "+Nu(n.id),W("qText").textContent=n.text;let e=["#e84b4b","#3b82f6","#2fb36b","#e0a81c"];W("qOpts").innerHTML=n.opts.map((i,s)=>'<button class="opt" data-i="'+s+'" style="--c:'+e[s%4]+'"><span class="ol">'+"ABCD"[s]+"</span> "+ht(i)+"</button>").join(""),W("qOpts").querySelectorAll(".opt").forEach(i=>i.addEventListener("click",()=>Uu(+i.dataset.i)));let t=W("qHint");t.style.display=n.hint>0&&n.opts.length>=3?"inline-block":"none",t.textContent="\u{1F4A1} "+mn(f.job).abName+" ("+n.hint+")",W("qMsg").textContent="",W("qMsg").className="",ft("qbox",!0),document.exitPointerLock&&document.exitPointerLock(),W("lockhint").style.display="none"}function Rv(){let n=f.tasks.filter(e=>e.done).length;if(n<f.tasks.length){nt("\u{1F6AA} Finish ALL your tasks first ("+n+"/"+f.tasks.length+").",2500,"bad");return}f.qbox={kp:!0,locked:!1,n:0},W("kpCode").textContent=f.xcode.join(" "),W("kpIn").value="",W("kpIn").maxLength=f.xn||10,W("kpIn").placeholder=Array(f.xn||4).fill("\u2022").join(" "),ft("kpbox",!0),document.exitPointerLock&&document.exitPointerLock(),W("lockhint").style.display="none",setTimeout(()=>W("kpIn").focus(),50)}function zp(){let n=W("kpIn").value.replace(/\D/g,"");n&&(Lt({t:"code",c:n}),W("kpIn").value="",Re.click())}W("kpOk").addEventListener("click",zp);W("kpIn").addEventListener("keydown",n=>{n.key==="Enter"?zp():n.key==="Escape"&&Xc()});W("kpClose").addEventListener("click",Xc);document.querySelectorAll("#kpPad button").forEach(n=>n.addEventListener("click",()=>{let e=W("kpIn"),t=n.dataset.k;t==="C"?e.value="":e.value.length<e.maxLength&&(e.value+=t),e.focus(),Re.click()}));function Gp(){if(!(!f.escaped||f.mode!=="survival"||f.phase!=="play")){if(f.warnLeft<=0){nt("No warnings left.",1500);return}if(f.warnCd>0){nt("\u23F3 Wait "+Math.ceil(f.warnCd)+"s\u2026",1200);return}f.warnCd=15,Lt({t:"warn"})}}W("btnWarn").addEventListener("click",Gp);function Pv(n){let e=pi();n.k==="blackout"?(f.blackout=n.secs,f.flick=1,nt("\u{1F526} <b>BLACKOUT!</b> The lights died \u2013 use your flashlight!",4500,"bad"),Re.creak()):n.k==="mirror"?(f.mirror=n.secs,nt("\u{1F921} <b>FUNHOUSE MIRRORS!</b> Your map is flipped for "+n.secs+" seconds.",4500,"bad"),Re.whisper()):n.k==="slam"&&(f.flick=.7,nt("\u{1F6AA} <b>SLAM!</b> A door locked itself again!",4e3,"bad"),Re.thud())}function Iv(){let n=f.map&&f.map.gas;if(!n||!n.length)return!1;for(let e of n)if(Math.hypot(f.pos.x-e.x,f.pos.z-e.z)<e.r)return!0;return!1}function Nu(n){let e=f.map.stations[n];return f.map.rooms[e.room].name+" \u2013 "+e.name}function Uu(n){let e=f.qbox;!e||e.locked||(e.locked=!0,Lt({t:"ans",qid:e.qid,i:n}),Re.click(),W("qOpts").querySelectorAll(".opt").forEach(t=>{t.disabled=!0,+t.dataset.i===n&&t.classList.add("pick")}))}W("qHint").addEventListener("click",()=>{let n=f.qbox;n&&!n.hinted&&!n.locked&&Lt({t:"hint",qid:n.qid})});W("qClose").addEventListener("click",Xc);function Xc(){f.qbox&&!f.qbox.locked&&Lt({t:"cancelq"}),f.qbox=null,ft("qbox",!1),ft("kpbox",!1),f.phase==="play"&&(W("lockhint").style.display="flex")}function Lv(n){let e=f.qbox;if(!(!e||e.qid!==n.qid)){e.hinted=!0,W("qHint").style.display="none",f.charges.hint=n.left;for(let t of n.remove){let i=W("qOpts").querySelector('[data-i="'+t+'"]');i&&(i.disabled=!0,i.classList.add("gone"))}Re.hint()}}function Dv(n){let e=f.qbox;if(!e||e.qid!==n.qid)return;let t=W("qMsg");if(n.ok){if(t.textContent=e.kind==="boss"?"\u2705 Correct! The exit door opens \u2013 RUN!":e.kind==="lock"?"\u2705 Correct! The door unlocks!":"\u2705 Correct! Task complete!",t.className="good",Re.correct(),W("qOpts").querySelectorAll(".opt").forEach(i=>{i.classList.contains("pick")&&i.classList.add("right")}),e.kind==="task"){let i=f.tasks.find(s=>s.sid===e.id);i&&(i.done=!0,mv(e.id))}setTimeout(()=>{f.qbox===e&&(f.qbox=null,ft("qbox",!1),f.phase==="play"&&(W("lockhint").style.display="flex"))},1100)}else{Re.wrong(),cs("#c00",300);let i=n.right!=null?W("qOpts").querySelector('[data-i="'+n.right+'"]'):null;i&&i.classList.add("right"),W("qOpts").querySelectorAll(".opt").forEach(s=>{s.classList.contains("pick")&&s.classList.add("wrong")}),t.className="bad",f.role==="killer"||f.ghost?t.textContent="\u274C Not quite. The right answer is shown in green.":e.kind==="boss"?t.textContent="\u274C Wrong! Enter your code again at the exit door.":t.textContent=n.saved?"\u274C Wrong! But your Second Chance protected the team ("+n.left+" left).":"\u274C Wrong! The killer heard you and grew stronger\u2026 Try again!",setTimeout(()=>{f.qbox===e&&(f.qbox=null,ft("qbox",!1),f.phase==="play"&&(W("lockhint").style.display="flex"))},2600)}}function Ks(n,e,t){let i=W("bodyBanner");W("bbT").innerHTML=n,W("bbS").innerHTML=e,i.style.display="block",i.classList.remove("pop"),i.offsetWidth,i.classList.add("pop"),clearTimeout(Ks.t),Ks.t=setTimeout(()=>{i.style.display="none"},t||3800)}function Nv(n){if(n.stage==="discuss"){f.phase="meeting",f.qbox=null,ft("qbox",!1),W("lockhint").style.display="none",document.exitPointerLock&&document.exitPointerLock(),f.meeting={stage:"discuss",by:n.by,why:n.why,victim:n.victim,end:performance.now()+n.secs*1e3,cand:n.cand,voted:[],my:void 0,ready:n.ready||[],myReady:!1},cs("#fff",300),bu(!0);let e=t=>{let i=[...f.players.values()].find(s=>s.name===t);return(i?mn(i.job).emoji+" ":"")+"<b>"+ht(t)+"</b>"};n.why==="body"?(Ks("\u{1F480} BODY FOUND!",e(n.by)+" found "+e(n.victim)+"'s body!<br><small>"+e(n.victim)+" was caught by the killer.</small>",4500),Re.bodyFound()):(Ks("\u{1F6A8} EMERGENCY MEETING","Called by "+e(n.by),3200),Re.alarm())}else f.meeting&&(f.meeting.stage=n.stage,f.meeting.end=performance.now()+n.secs*1e3,f.meeting.cand=n.cand,f.meeting.voted=n.voted,n.stage==="result"&&(f.meeting.res=n,n.ejected&&Re.gong()));ft("meet",!0),ho()}function ho(){let n=f.meeting;if(!n)return;let e=W("meetTitle"),t=n.stage==="vote"&&n.cand.includes(f.id)&&n.my===void 0;e.innerHTML=n.why==="body"?"\u{1F480} <b>"+ht(n.by)+"</b> found <b>"+ht(n.victim)+"</b>'s body!":"\u{1F6A8} <b>"+ht(n.by)+"</b> called an emergency meeting!",W("meetStage").textContent=n.stage==="discuss"?"DISCUSS \u2013 talk to each other! Who is the killer?":n.stage==="vote"?"VOTE \u2013 who do you think is the killer?":"RESULT";let i=n.res;W("meetGrid").innerHTML=[...f.players.values()].map(a=>{let c=a.st===1||n.stage!=="result"&&!n.cand.includes(a.id),l=n.voted.includes(a.id),h=i?(i.tally.find(u=>u[0]===a.id)||[0,0])[1]:0;return'<div class="vc'+(c?" dead":"")+(n.my===a.id?" sel":"")+(t&&!c?" can":"")+'" data-id="'+a.id+'"><div class="ve">'+mn(a.job).emoji+"</div><b>"+ht(a.name)+(a.id===f.id?" (you)":"")+"</b>"+(c?"<small>\u274C out</small>":"")+(l&&n.stage==="vote"?'<span class="vt">\u2714 voted</span>':"")+(i&&h?'<span class="vn">'+h+" vote"+(h>1?"s":"")+"</span>":"")+"</div>"}).join(""),W("meetGrid").querySelectorAll(".vc.can").forEach(a=>a.addEventListener("click",()=>Hp(+a.dataset.id))),W("btnSkip").style.display=t?"inline-block":"none";let s=n.cand.length,r=n.cand.includes(f.id);W("btnReady").style.display=n.stage==="discuss"&&r?"inline-block":"none",W("btnReady").disabled=!!n.myReady,W("btnReady").textContent=n.myReady?"\u2714 Ready - waiting for the others ("+n.ready.length+" of "+s+")":"\u2705 I'm ready to vote ("+n.ready.length+" of "+s+" ready)",W("meetWait").textContent=n.stage==="vote"?r?n.my!==void 0?"\u2714 You voted - "+n.voted.length+" of "+s+" have voted":"Tap who you think is the killer  ("+n.voted.length+" of "+s+" voted)":"You are out - watch the vote.":n.stage==="discuss"?r?"":"You are out - listen to the others.":"",W("meetClues").innerHTML=f.clues.length?"<b>\u{1F4D3} Clues so far:</b><ul>"+f.clues.map(a=>"<li>"+ht(a)+"</li>").join("")+"</ul>":"<i>No clues yet.</i>";let o=W("meetRes");i?(o.style.display="block",o.innerHTML=i.ejected?'<div class="big">'+ht(i.ejected.name)+' was voted out\u2026</div><div class="'+(i.ejected.killer?"good":"bad")+' big2">'+(i.ejected.killer?"and they WERE the killer! \u{1F389}":"and they were NOT the killer. \u{1F628}")+"</div>":'<div class="big">Nobody was voted out.</div>'):o.style.display="none"}function Hp(n){let e=f.meeting;!e||e.my!==void 0||(e.my=n,Lt({t:"vote",target:n}),Re.click(),ho())}W("btnSkip").addEventListener("click",()=>Hp(0));W("btnReady").addEventListener("click",()=>{let n=f.meeting;!n||n.myReady||(n.myReady=!0,Lt({t:"ready"}),Re.click(),ho())});setInterval(()=>{let n=f.meeting;!n||f.paused||(W("meetTime").textContent=n.stage==="result"?"":Math.max(0,Math.ceil((n.end-performance.now())/1e3))+"s")},250);function Uv(n){f.meeting=null,f.phase="play",ft("meet",!1),W("lockhint").style.display="flex",bu(!1),yv();for(let[e,t]of n.status){let i=f.players.get(e);i&&(i.st=t),e===f.id&&(f.alive=t===0,f.ghost=t!==0)}N.camera&&(f.flick=1)}function Ov(){let n=W("jumpc"),e=n.getContext("2d");n.width=640,n.height=480,e.fillStyle="#000",e.fillRect(0,0,640,480);let t=e.createRadialGradient(320,230,20,320,240,260);t.addColorStop(0,"#d9d4c4"),t.addColorStop(1,"#2a2620"),e.fillStyle=t,e.beginPath(),e.ellipse(320,250,170,220,0,0,7),e.fill(),e.fillStyle="#000",e.beginPath(),e.ellipse(250,200,48,70,-.2,0,7),e.ellipse(390,200,48,70,.2,0,7),e.fill(),e.fillStyle="#fff",e.beginPath(),e.arc(252,215,9,0,7),e.arc(388,215,9,0,7),e.fill(),e.fillStyle="#300",e.beginPath(),e.moveTo(230,320);for(let i=0;i<=10;i++)e.lineTo(230+i*18,320+(i%2?90:20));for(let i=10;i>=0;i--)e.lineTo(230+i*18,400+(i%2?-10:40));e.closePath(),e.fill(),e.strokeStyle="#a00",e.lineWidth=5;for(let i=0;i<9;i++)e.beginPath(),e.moveTo(200+Math.random()*240,330),e.lineTo(200+Math.random()*240,470),e.stroke();e.fillStyle="rgba(160,0,0,.25)",e.fillRect(0,0,640,480),W("jump").classList.remove("calm")}function Fv(){let n=W("jumpc"),e=n.getContext("2d");n.width=640,n.height=240,e.fillStyle="#220",e.fillRect(0,0,640,240),e.fillStyle="#fff",e.font="48px sans-serif",e.textAlign="center",e.fillText("You were caught\u2026",320,130),W("jump").classList.add("calm")}function kv(){let n=document.createElement("canvas");n.width=128,n.height=256;let e=n.getContext("2d");e.fillStyle="rgba(0,0,0,.92)",e.beginPath(),e.moveTo(30,250),e.lineTo(40,110),e.quadraticCurveTo(64,20,88,110),e.lineTo(98,250),e.closePath(),e.fill(),e.beginPath(),e.arc(64,62,30,0,7),e.fill(),e.fillStyle="#fff",e.beginPath(),e.ellipse(52,60,6,10,0,0,7),e.ellipse(76,60,6,10,0,0,7),e.fill();let t=new Cn(n);return t.colorSpace=Et,t}addEventListener("keydown",n=>{if(f.off){n.preventDefault();return}if(f.phase==="join"||f.phase==="lobby")return;let e=n.key.toLowerCase();if(!(n.target&&(n.target.tagName==="INPUT"||n.target.tagName==="SELECT"))){if(e==="h"&&(f.phase==="play"||f.phase==="meeting")){qc(!f.onBreak);return}if(!f.onBreak){if(f.qbox){let t="1234".indexOf(e)>=0?"1234".indexOf(e):"abcd".indexOf(e);if(t>=0&&t<f.qbox.n){let i=W("qOpts").querySelector('[data-i="'+t+'"]');i&&!i.disabled&&Uu(t)}e==="escape"&&Xc();return}It[e]=!0,["arrowup","arrowdown","arrowleft","arrowright"," "].includes(e)&&n.preventDefault(),!(f.phase!=="play"||f.paused)&&(e==="e"||e==="r"?Wp():e==="f"?Xp():e==="q"?Bv():e==="c"?Fu():e==="v"&&Gp())}}});addEventListener("keyup",n=>{It[n.key.toLowerCase()]=!1});addEventListener("blur",()=>{for(let n in It)It[n]=!1});document.addEventListener("mousemove",n=>{f.phase!=="play"||f.qbox||f.paused||(document.pointerLockElement===W("gl")||Ou)&&(f.yaw-=(n.movementX||0)*.0022,f.pitch=$s(f.pitch-(n.movementY||0)*.0022,-1.45,1.45))});var Ou=!1;W("gl").addEventListener("mousedown",()=>{Ou=!0,f.phase==="play"&&document.pointerLockElement!==W("gl")?Vp():Xp()});addEventListener("mouseup",()=>{Ou=!1});function Vp(){if(!(f.qbox||f.paused||f.phase!=="play"))try{let n=W("gl").requestPointerLock();n&&n.catch&&n.catch(()=>{})}catch{}}W("lockhint").addEventListener("click",()=>{W("lockhint").style.display="none",Vp()});document.addEventListener("pointerlockchange",()=>{document.pointerLockElement===W("gl")?W("lockhint").style.display="none":f.phase==="play"&&!f.qbox&&!f.paused&&!f.onBreak&&!W("menu").style.display.includes("flex")&&performance.now()>f.frozenUntil&&(W("lockhint").style.display="flex")});W("btnMenu").addEventListener("click",()=>{ft("menu",!0),document.exitPointerLock&&document.exitPointerLock(),W("lockhint").style.display="none"});W("btnResume").addEventListener("click",()=>{ft("menu",!1),W("lockhint").style.display="flex"});W("btnClues").addEventListener("click",Fu);W("btnCluesClose").addEventListener("click",Fu);function Fu(){let n=W("cluebox").style.display!=="flex";if(n){let e=f.mode==="survival"?'<li style="list-style:none;font-size:26px;color:#7fe3ff">\u{1F522} Your EXIT CODE: <b>'+f.xcode.join(" ")+" "+"_ ".repeat(Math.max(0,(f.xn||f.tasks.length)-f.xcode.length))+"</b></li>":"";W("clueList").innerHTML=e+(f.clues.length?f.clues.map(t=>"<li>"+ht(t)+"</li>").join(""):"<li><i>No clues yet. Unlock doors to find clues about the killer!</i></li>"),document.exitPointerLock&&document.exitPointerLock(),W("lockhint").style.display="none"}else W("lockhint").style.display="flex";ft("cluebox",n)}W("myGfx").addEventListener("change",()=>{let n=W("myGfx").value;f.smooth=n==="s",f.autoClassic=!1,n!=="s"&&(f.q=+n),Qs()});W("chkFps").addEventListener("change",()=>{f.showFps=W("chkFps").checked,W("fps").style.display=f.showFps?"block":"none"});W("vol").addEventListener("input",()=>Fc(+W("vol").value/100));W("myScare").addEventListener("change",()=>{f.myScare=+W("myScare").value,oo(pi())});function ku(){if(!f.map||f.escaped)return null;let n=f.pos,e=f.map,t=null,i=s=>{(!t||s.d<t.d)&&(t=s)};if(!f.ghost&&f.mode!=="survival"){for(let r of f.bodies){let o=Math.hypot(n.x-r.x,n.z-r.z);o<3.4&&i({kind:"report",d:o-3,text:"\u{1F6A8} Press <b>E</b> \u2013 REPORT the body!"})}let s=Math.hypot(n.x-e.button.x,n.z-e.button.z);s<2.8&&f.emergLeft>0&&i({kind:"emerg",d:s,text:"\u{1F534} Press <b>E</b> \u2013 Emergency meeting"})}for(let s of f.tasks)if(!s.done){let r=e.stations[s.sid],o=Math.hypot(n.x-r.x,n.z-r.z);o<3&&i({kind:"task",id:s.sid,d:o,text:"\u{1F4DD} Press <b>E</b> \u2013 Do task: "+Nu(s.sid)})}if(!f.ghost&&f.role!=="killer"&&e.hatches)for(let s of e.hatches){let r=Math.hypot(n.x-s.x,n.z-s.z);r<2.3&&i({kind:"hatch",id:s.id,d:r-.5,text:f.hatchCd>0?"\u{1F573}\uFE0F Secret passage recharging\u2026 "+Math.ceil(f.hatchCd)+"s":"\u{1F573}\uFE0F Press <b>E</b> \u2013 SECRET PASSAGE (crew only) \u2013 jump to the other side!"})}if(f.mode==="survival"&&!f.ghost){let s=e.doors.find(r=>r.kind==="gate");if(s){let r=Math.hypot(n.x-s.cx,n.z-s.cz);if(r<4.4){let o=f.tasks.filter(a=>a.done).length;i({kind:"keypad",d:r-1,text:o>=f.tasks.length?"\u{1F522} Press <b>E</b> \u2013 Enter your EXIT CODE":"\u{1F6AA} Exit door \u2013 finish your tasks first ("+o+"/"+f.tasks.length+")"})}}}if(f.role!=="killer")for(let s of e.panels){if(f.doors[s.door])continue;let r=Math.hypot(n.x-s.x,n.z-s.z);r<2.6&&i({kind:"lock",id:s.door,d:r,text:"\u{1F512} Press <b>E</b> \u2013 Answer to unlock this door"})}return t}function Wp(){if(f.qbox||f.waitingQ)return;let n=ku();n&&(n.kind==="report"?Lt({t:"report"}):n.kind==="emerg"?(f.emergLeft--,Lt({t:"emerg"})):n.kind==="keypad"?Rv():n.kind==="hatch"?f.hatchCd>0?nt("\u23F3 Passage recharging ("+Math.ceil(f.hatchCd)+" s)",1500):Lt({t:"hatch",id:n.id}):(f.waitingQ=!0,Lt({t:"ask",kind:n.kind,id:n.id}),setTimeout(()=>f.waitingQ=!1,3e3)))}function Pu(){if(f.role!=="killer"||!f.alive)return null;let n=null,e=2.7;for(let t of f.players.values()){if(t.id===f.id||t.st!==0||t.new)continue;let i=Math.hypot(f.pos.x-t.tx,f.pos.z-t.tz);i<e&&(e=i,n=t)}return n}function Xp(){if(f.role!=="killer"||f.phase!=="play"||f.qbox||f.paused)return;let n=Pu();if(n){if(f.kcd>0){nt("\u23F3 Wait "+Math.ceil(f.kcd)+"s\u2026",1200);return}Lt({t:"kill",target:n.id}),f.kcd=99}}function Bv(){let n=mn(f.job);f.ghost||(n.ab==="revive"&&f.role==="crew"?f.charges.revive>0?Lt({t:"ability",what:"revive"}):nt("No revives left.",1500):n.ab==="clue"&&f.role==="crew"?f.charges.clue>0?(Lt({t:"ability",what:"clue"}),f.charges.clue--):nt("Already used.",1500):n.ab==="xray"&&f.abilCd<=0?(f.xray=n.dur,f.abilCd=n.cd,Re.whisper()):n.ab==="sprint"&&f.abilCd<=0?(f.sprint=n.dur,f.abilCd=n.cd,Re.run()):n.ab==="lamp"&&f.abilCd<=0?(f.abilCd=n.cd,kp(f.pos.x,f.pos.z),Lt({t:"ability",what:"lamp"}),Re.lamp()):f.abilCd>0&&nt("Recharging\u2026 "+Math.ceil(f.abilCd)+"s",1200))}function qp(){if(!f.map||f.phase==="join")return;let n=f.mode==="survival",e=f.tasks.filter(u=>u.done).length,t=n?e:f.prog[0],i=n?f.tasks.length:f.prog[1];W("progBar").style.width=(i?100*t/i:0)+"%";let s=f.tl!=null?"  \xB7  \u23F1 "+Math.floor(f.tl/60)+":"+String(f.tl%60).padStart(2,"0"):"";W("progTxt").textContent=(n?e>=f.tasks.length?"\u{1F522} All tasks done \u2013 go to the EXIT door!":"\u{1F4DD} My tasks "+e+" / "+f.tasks.length+"  \xB7  \u{1F522} "+f.xcode.join("")+"_".repeat(Math.max(0,(f.xn||f.tasks.length)-f.xcode.length)):f.exitOpen?"EXIT OPEN \u2013 RUN!":"Escape progress "+t+" / "+i)+(f.mode==="survival"?"  \xB7  \u{1F3C3} "+f.aliveN+" running"+(f.escN?"  \xB7  \u{1F6AA} "+f.escN+" escaped":""):"")+s;let r=W("btnWarn");r.style.display=n&&f.escaped&&f.phase==="play"?"block":"none",r.textContent="\u{1F4E3} Warn others [V] ("+f.warnLeft+" left)",W("progTxt").className=f.tl!=null&&f.tl<=60?"low":"";let o=f.tasks.filter(u=>u.done).length;W("taskList").innerHTML="<b>Your tasks "+o+"/"+f.tasks.length+"</b>"+f.tasks.map(u=>'<div class="'+(u.done?"td":"")+'">'+(u.done?"\u2705 ":"\u2B1C ")+ht(Nu(u.sid))+"</div>").join("")+(f.ghost&&!f.escaped?'<div class="gh">\u{1F47B} You are a ghost \u2013 keep doing tasks!</div>':"");let a=mn(f.job),c='<span class="ai">'+a.emoji+"</span><b>"+a.abName+"</b>";if(a.ab==="hint"?c+="<small>in questions \xB7 "+(f.charges.hint||0)+" left</small>":a.ab==="second"?c+="<small>automatic \xB7 "+(f.charges.second||0)+" left</small>":a.ab==="danger"?c+="<small>automatic</small>":a.ab==="revive"?c+="<small>Q \xB7 "+(f.charges.revive||0)+" left</small>":a.ab==="clue"?c+="<small>Q \xB7 "+(f.charges.clue||0)+" left</small>":c+="<small>Q \xB7 "+(f.abilCd>0?Math.ceil(f.abilCd)+"s":"ready")+"</small>",W("abil").innerHTML=c,f.role==="killer"){let u=Pu();W("killbtn").innerHTML="<b>\u{1F52A} "+(f.kcd>.05?Math.ceil(f.kcd)+"s":u?"CATCH "+ht(u.name)+"! (F)":"ready")+"</b><small>Power "+f.rage+"/10 \u{1F608}</small>",W("killbtn").className=f.kcd<=.05&&u?"hot":"",W("killbtn").style.display=u?"flex":"none"}W("clueN").textContent=f.clues.length;let l=ku(),h=W("prompt");if(f.phase==="play"&&!f.qbox&&!f.paused){let u=l?l.text:"";!u&&f.role==="killer"&&Pu()&&(u=f.kcd>.05?"":"\u{1F52A} Press <b>F</b> or click to CATCH"),!u&&mn(f.job).ab==="revive"&&f.charges.revive>0&&!f.ghost&&f.bodies.some(d=>Math.hypot(f.pos.x-d.x,f.pos.z-d.z)<4.5)&&(u="\u{1F49A} Press <b>Q</b> to REVIVE"),h.innerHTML=u,h.style.display=u?"block":"none"}else h.style.display="none";Gv()}setInterval(qp,100);var as=W("mini"),zv=as.getContext("2d");function Gv(){if(!f.map)return;let n=as.width/48,e=zv;e.clearRect(0,0,as.width,as.height),e.fillStyle="rgba(8,10,16,.72)",e.fillRect(0,0,as.width,as.height),e.save(),f.mirror>0&&(e.translate(as.width,0),e.scale(-1,1)),e.font="8px sans-serif",e.textAlign="center";for(let t of f.map.rooms)e.strokeStyle=t.kind==="exit"?"#35c46a":"#445066",e.lineWidth=1,e.strokeRect(t.x0*n+.5,t.z0*n+.5,16*n,16*n),e.fillStyle=t.kind==="exit"?"#35c46a":"#6b778c",e.fillText(t.name.length>14?t.name.slice(0,13)+".":t.name,t.cx*n,t.cz*n+3);for(let t of f.map.doors)f.doors[t.id]||(e.fillStyle=t.kind==="gate"?"#ff5050":"#ffb347",t.o==="v"?e.fillRect(t.cx*n-1.5,(t.cz-3.4/2)*n,3,3.4*n):e.fillRect((t.cx-3.4/2)*n,t.cz*n-1.5,3.4*n,3));for(let t of f.tasks)if(!t.done){let i=f.map.stations[t.sid];e.fillStyle="#ffd34a",e.fillRect(i.x*n-3,i.z*n-3,6,6)}for(let t of f.pings)e.strokeStyle="rgba(255,60,60,"+Math.min(1,t.t/4)+")",e.lineWidth=2,e.beginPath(),e.arc(t.x*n,t.z*n,4+(9-t.t)*1.6,0,7),e.stroke();for(let t of f.map.gas||[])e.fillStyle="rgba(120,255,80,.3)",e.beginPath(),e.arc(t.x*n,t.z*n,t.r*n,0,7),e.fill();if(f.role!=="killer")for(let t of f.map.hatches||[])f.hatchSeen.has(t.id)&&(e.fillStyle="#30d0ff",e.fillRect(t.x*n-3,t.z*n-3,6,6));for(let t of f.bodies)e.fillStyle="#ff3030",e.fillText("\u2716",t.x*n,t.z*n+3);e.save(),e.translate(f.pos.x*n,f.pos.z*n),e.rotate(-f.yaw),e.fillStyle="#fff",e.beginPath(),e.moveTo(0,-5),e.lineTo(4,4),e.lineTo(-4,4),e.closePath(),e.fill(),e.restore(),e.restore()}var Au=performance.now(),zc=0,wu=0,Gc=0,Cu=0,Pp=0,Ip=0;function Qs(){if(!N.renderer)return;let n=f.smooth;N.prBase=[.55,.8,Math.min(window.devicePixelRatio||1,1.25)][f.q],N.pr=n?Math.min(N.prBase,.5):N.prBase,N.renderer.setPixelRatio(N.pr),N.renderer.setSize(innerWidth,innerHeight,!1),N.camera.far=n?38:70,N.camera.updateProjectionMatrix(),N.scene&&f.map&&(N.scene.fog.density=f.map.D.fog*(n?1.35:1)),N.flash&&(N.flash.distance=n?20:28),N.dust&&(N.dust.visible=!n),N.halos&&(N.halos.visible=!n),N.pools&&(N.pools.visible=!n);for(let t of N.wisps||[])t.visible=!n;N.scene&&f.map&&N.look!==Ru()&&Up(Ru());let e=f.q>=2&&!n&&N.look==="rich";N.flash&&N.flash.castShadow!==e&&(N.flash.castShadow=e,N.scene.traverse(t=>{t.material&&(t.material.needsUpdate=!0)})),W("myGfx")&&(W("myGfx").value=n?"s":String(f.q))}function Lp(){try{localStorage.setItem("se_fb","1")}catch{}}function Yp(n){if(requestAnimationFrame(Yp),!N.renderer||!f.map||f.phase!=="play"&&f.phase!=="meeting"){Au=n;return}let e=n-Au;if(f.smooth&&e<31)return;let t=Math.min(.06,e/1e3);Au=n,Hv(t,n/1e3),N.renderer.render(N.scene,N.camera);let i=Math.min(e,250)/1e3;if(zc+=i,wu++,Gc+=i,Cu++,zc>=1&&(f.fps=Math.round(wu/zc),zc=0,wu=0,f.showFps&&(W("fps").textContent=f.fps+" FPS \xB7 "+N.renderer.info.render.calls+" draws \xB7 "+(f.smooth?"Smooth":["Low","Medium","High"][f.q]))),Gc>3&&!uo.get("nogov")){let s=Gc/Cu;Gc=0,Cu=0,N.look==="rich"&&s>.036?(f.autoClassic=!0,Qs(),nt("\u26A1 Switched to the simple look to keep the game fast",3500),Lp()):s>.042&&!f.smooth?(f.smooth=!0,Qs(),nt("\u26A1 Smooth mode turned on to keep the game fast",3500),Lp()):s>.055&&N.pr>.42&&(N.pr*=.85,N.renderer.setPixelRatio(N.pr),N.renderer.setSize(innerWidth,innerHeight,!1))}}requestAnimationFrame(Yp);setInterval(()=>{f.fps&&(f.phase==="play"||f.phase==="meeting")&&Lt({t:"fps",v:f.fps,q:f.smooth?"Smooth":["Low","Medium","High"][f.q]})},5e3);function Hv(n,e){let t=f.map,i=f.pos,s=f.phase==="play"&&!f.paused&&!f.qbox&&!f.onBreak&&performance.now()>f.frozenUntil&&!f.jump;if(f.warnCd=Math.max(0,f.warnCd-n),f.abilCd=Math.max(0,f.abilCd-n),f.xray=Math.max(0,f.xray-n),f.sprint=Math.max(0,f.sprint-n),!f.paused){f.hatchCd=Math.max(0,f.hatchCd-n),f.blackout=Math.max(0,f.blackout-n),f.mirror=Math.max(0,f.mirror-n),f.kcd=Math.max(0,f.kcd-n),f.flick=Math.max(0,f.flick-n),f.dark=Math.max(0,f.dark-n),f.jump=Math.max(0,f.jump-n);for(let _ of f.pings)_.t-=n;f.pings=f.pings.filter(_=>_.t>0)}let r=!f.ghost&&Iv();if(r&&!f.inGas&&f.phase==="play"&&performance.now()>f.gasT&&(f.gasT=performance.now()+6e3,nt("\u2623\uFE0F <b>Toxic gas!</b> You move slowly \u2013 get out!",2500,"bad")),f.inGas=r,f.map.hatches)for(let _ of f.map.hatches)!f.hatchSeen.has(_.id)&&Math.hypot(i.x-_.x,i.z-_.z)<9&&f.hatchSeen.add(_.id);let o=!1,a=wp;if(s){let _=0,g=0;(It.w||It.arrowup)&&(g+=1),(It.s||It.arrowdown)&&(g-=1),It.a&&(_-=1),It.d&&(_+=1),It.arrowleft&&(f.yaw+=n*1.9),It.arrowright&&(f.yaw-=n*1.9);let m=Math.hypot(_,g);if(m>0){_/=m,g/=m,o=!0,f.role==="killer"&&(a*=1+Math.min(.2,.02*f.rage)),f.sprint>0&&(a*=1.9),f.ghost?a*=1.25:f.inGas&&(a*=.55);let S=-Math.sin(f.yaw),E=-Math.cos(f.yaw),M=Math.cos(f.yaw),A=-Math.sin(f.yaw),w=(S*g+M*_)*a*n,y=(E*g+A*_)*a*n;f.ghost?(i.x=$s(i.x+w,.5,48-.5),i.z=$s(i.z+y,.5,64-.5),i.y=$s(i.y+Math.sin(f.pitch)*g*a*n,.6,t.H-.5)):(Cp(i.x+w,i.z)||(i.x+=w),Cp(i.x,i.z+y)||(i.z+=y)),f.ghost||(f.stepT+=n*(a/wp),f.stepT>.48&&(f.stepT=0,Re.step(.6)))}It[" "]&&f.ghost&&(i.y=Math.min(t.H-.5,i.y+n*2.5))}f.ghost&&s&&It.shift&&(i.y=Math.max(.6,i.y-n*2.5)),f.ghost||(Ip+=o?n*9:0,i.y=fo+(o?Math.sin(Ip)*.035:0));for(let _ of N.gasS||[]){let g=_.userData;_.position.set(g.x+Math.cos(e*.3+g.ph)*g.r,g.y+Math.sin(e*.5+g.ph)*.15,g.z+Math.sin(e*.27+g.ph)*g.r)}let c=performance.now();c-Pp>100&&f.phase==="play"&&!f.paused&&(Pp=c,Lt({t:"pos",x:+i.x.toFixed(2),y:+i.y.toFixed(2),z:+i.z.toFixed(2),yaw:+f.yaw.toFixed(2)}));let l=N.camera,h=f.jump>0?(Math.random()-.5)*.08:0;l.position.set(i.x,i.y,i.z),l.rotation.set(f.pitch+h,f.yaw+h,0);let u=pi(),d=1;f.flick>0&&u>=1?d=Math.random()<.5?.15:1:u>=1&&Math.random()<.004&&(f.flick=.3),f.dark>0&&(d=0);let p=f.blackout>0?u>=1?.12:.55:1;N.hemi.intensity=N.hemiBase*(f.ghost?1.5:1)*(d===0?.25:1)*p,N.flash.intensity=f.ghost?25:60*(d<1?.2+.8*d:1)*(f.dark>0?0:1),N.lantern.intensity=f.ghost?12:7*(f.dark>0?0:1);let x=(d===1?.8+.2*Math.sin(e*2.3):d)*(p<1?p*.5:1);if(N.flickMat.color.setScalar((d===1?.75+.25*Math.sin(e*2.3):d)*(p<1?p:1)),N.pools&&(N.pools.material.opacity=N.poolBase*x,N.halos.material.opacity=.7*x),!f.smooth){N.dust.position.set(i.x,0,i.z);let _=N.dustP,g=N.dustN;for(let S=0;S<g;S++){let E=S*3;_[E]+=Math.sin(S*1.3+e*.3)*.12*n,_[E+1]-=(.04+S%5*.01)*n,_[E+2]+=Math.cos(S*.7+e*.25)*.12*n,_[E+1]<0&&(_[E+1]=3.6),_[E]>8?_[E]=-8:_[E]<-8&&(_[E]=8),_[E+2]>8?_[E+2]=-8:_[E+2]<-8&&(_[E+2]=8)}N.dustAttr.needsUpdate=!0;let m=u>=1&&f.phase==="play";for(let S of N.wisps){let E=S.userData.ph;S.position.set(24+Math.sin(e*.11+E)*20,1.8+Math.sin(e*.7+E)*.3,32+Math.cos(e*.083+E*1.3)*26);let M=Math.hypot(S.position.x-i.x,S.position.z-i.z);S.material.opacity=m?$s((M-4)/6,0,1)*(u>=2?.26:.14):0}}for(let _ of N.doors)if(_){let g=_.open?1:0;_.t+=(g-_.t)*Math.min(1,n*4),_.mesh.position.y=3/2-_.t*(3+.2),_.mesh.visible=_.t<.97}for(let[,_]of N.markers)_.gem.rotation.y+=n*2,_.gem.position.y=2.3+Math.sin(e*2)*.1;for(let _ of f.players.values()){if(_.id===f.id||!_.av)continue;let g=Math.min(1,n*10),m=_.cx,S=_.cz;_.cx+=(_.tx-_.cx)*g,_.cy+=(_.ty-_.cy)*g,_.cz+=(_.tz-_.cz)*g;let E=_.tyaw-_.cyaw;E=Math.atan2(Math.sin(E),Math.cos(E)),_.cyaw+=E*g;let M=Math.hypot(_.cx-m,_.cz-S)/Math.max(n,.001);if(_.moving+=((M>.6?1:0)-_.moving)*Math.min(1,n*8),_.av.visible=_.st===0,_.gh.visible=_.st===1&&f.ghost,_.xr.visible=_.st===0&&(f.xray>0||f.ghost||f.role==="killer"&&f.exitOpen),_.av.visible){_.av.position.set(_.cx,0,_.cz),_.av.rotation.y=_.cyaw+Math.PI;let A=_.av.userData,w=Math.sin(e*9)*.6*_.moving;if(A.legL.rotation.x=w,A.legR.rotation.x=-w,A.armL.rotation.x=-w,A.armR.rotation.x=w,_.moving>.5&&M>.6&&(_.stepT+=n,_.stepT>.5)){_.stepT=0;let y=Math.hypot(_.cx-i.x,_.cz-i.z);y<14&&Re.step(.5*(1-y/14),$s(Math.sin(Math.atan2(_.cx-i.x,i.z-_.cz)+f.yaw)*.8,-1,1))}}_.gh.visible&&_.gh.position.set(_.cx,.2+Math.sin(e*2+_.id)*.15+(_.cy>1.5?_.cy-1.6:0),_.cz)}for(let _ of N.bodies)_.a.visible=!0;for(let _ of N.lamps)_.t-=n,_.t<0&&(N.scene.remove(_.m),_.light&&N.scene.remove(_.light),_.dead=!0);if(N.lamps=N.lamps.filter(_=>!_.dead),f.appT-=n,f.appT<=0&&f.phase==="play"&&u>=2&&!f.ghost&&(Vv(),f.appT=55+Math.random()*60),N.app){N.app.t-=n;let _=new V;l.getWorldDirection(_);let g=N.app.s.position.clone().sub(l.position).normalize();_.dot(g)>.93&&N.app.t<1.3&&(Re.sting(),cs("#fff",120),N.app.t=0),N.app.t<=0&&(N.scene.remove(N.app.s),N.app=null)}W("danger").style.opacity=f.danger?.25+.2*Math.sin(e*8):0,f.danger!==f.dangerOn&&(f.dangerOn=f.danger,Re.heartLoop(f.danger)),f.danger&&!pp("heartbeat")&&Math.floor(e*1.6)!==Math.floor((e-n)*1.6)&&Re.heart()}function Vv(){N.appTex||(N.appTex=kv());let n=f.yaw+(Math.random()<.5?-1:1)*(.6+Math.random()*.5),e=9,t=new Mi(new ai({map:N.appTex,transparent:!0,fog:!1}));t.scale.set(1.7,3.4,1),t.position.set(f.pos.x-Math.sin(n)*e,1.7,f.pos.z-Math.cos(n)*e),N.scene.add(t),N.app={s:t,t:2.2},f.flick=.5,Re.creak(),Re.thud()}function qc(n){f.onBreak===n||f.phase!=="play"&&f.phase!=="meeting"||(f.onBreak=n,ft("breakbox",n),Lt({t:"break",on:n}),n?(document.exitPointerLock&&document.exitPointerLock(),Fc(.12),ao(),f.myScare=0,W("myScare").value="0",oo(0),f.flick=0,f.dark=0,W("danger").style.opacity=0,W("lockhint").style.display="none",It.w=It.a=It.s=It.d=!1):(Fc(+W("vol").value/100),Su(f.mapId),W("lockhint").style.display=f.phase==="play"?"flex":"none"))}W("btnBreak").addEventListener("click",()=>qc(!0));W("btnBreakEnd").addEventListener("click",()=>qc(!1));$y&&(window.__se={ST:f,V:N,send:Lt,drop(){Un&&Un.close()},setSmooth(n){f.smooth=n,Qs()},audioInfo:mp,tp(n,e){f.pos.x=n,f.pos.z=e},nearest:ku,interact:Wp,answer:Uu,toast:nt,sees:()=>[...f.players.values()].map(n=>[n.id,n.name,n.st,+(n.cx||0).toFixed(1),+(n.cz||0).toFixed(1)])});})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
