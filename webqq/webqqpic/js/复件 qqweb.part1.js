(function(){function b(a){this.url=[];this.init(a)}var d,c,e,g,j,l,q,u,p,v,x="3.0.2";if(typeof m=="undefined")var m=1;b.prototype={init:function(a){a?g=a:g={};d=document;if(!g.statIframe&&window!=top)try{d=top.document}catch(f){}c=d.location;e=d.body},run:function(){var a,f,b;a=(new Date).getTime();h.init();this.url.push(this.getDomainInfo());this.url.unshift("http://pingfore."+q+"/pingd?");this.url.push(this.getRefInfo(g));try{navigator.cookieEnabled?this.url.push("&pvid="+h.setCookie("pgv_pvid",!0)):this.url.push("&pvid=NoCookie")}catch(c){this.url.push("&pvid=NoCookie")}this.url.push(this.getMainEnvInfo());this.url.push(this.getExtendEnvInfo());this.url.push("&vs="+x);g.userDefineVariable?this.url.push(o.setv(g.userDefineVariable)):this.url.push(o.setv());h.setCookie("ssid");h.save();g.originalReferer&&this.url.push("&or="+g.originalReferer);f=(new Date).getTime();g.extParam?b=g.extParam+"|":b="";this.url.push("&ext="+escape(b+(f-a)));this.url.push("&reserved1="+escape(g.reserved1Param||""));this.url.push("&rand="+Math.round(Math.random()*1E5));this.sendInfo(this.url.join(""));g.hot&&(document.attachEvent?document.attachEvent("onclick",this.watchClick):document.addEventListener("click",this.watchClick,!1));g.repeatApplay&&g.repeatApplay=="true"&&typeof m!="undefined"&&(m=1)},getDomainInfo:function(a){var f;j=g.virtualDomain||c.host;f=j.toLowerCase();q||(q=this.getCookieSetDomain());a&&(a=f.indexOf(":"),a>-1?f=f.substr(0,a)+".hot"+f.substr(a):f+=".hot");a=this.getCurrentUrl();return"dm="+f+"&url="+a},getCurrentUrl:function(){var a="",f="-";if(g.virtualURL)a=g.virtualURL;else if(a=l=escape(c.pathname),c.search!=""&&(f=escape(c.search.substr(1))),g.senseParam){var b=this.getParameter(g.senseParam,d.URL);b&&(a+="_"+b)}return a+"&arg="+f},getRefInfo:function(a){var f="-",b="-",e="-",o=d.referrer,g,y=a.virtualDomain?a.virtualDomain:"-",m=a.virtualURL?a.virtualURL:"-";u=a.virtualRefDomain?a.virtualRefDomain:"";p=a.virtualRefURL?a.virtualRefURL:"";a.statIframe||a.useCookie=="true"?(o=h.get("pgvReferrer"),g=d.URL,y=g.indexOf("?"),y>-1&&(g=g.substr(0,y)),h.set("pgvReferrer",g)):a.useCookie=="set"&&u!=""&&p!=""?(g="https:"==c.protocol?"https://":"http://",g+=u+refUrl,h.set("pgvReferrer",g)):a.useCookie=="set"&&(y!="-"||m!="-")?(g="https:"==c.protocol?"https://":"http://",g+=y=="-"?j:y,g+=m=="-"?l:m,h.set("pgvReferrer",g)):(a.useCookie=="get"&&(g=h.get("pgvReferrer"),g!=""&&(o=g)),h.set("pgvReferrer",""));if(g=this.getParameter(a.tagParamName||"ADTAG",d.URL))f="ADTAG",b=g;g=o.indexOf("://");if(g>-1&&f=="-"&&(g=o.match(/(\w+):\/\/([^\:|\/]+)(\:\d*)?(.*\/)([^#|\?|\n]+)?(#.*)?(\?.*)?/i)))f=g[2],b=g[4]+g[5];o.indexOf("?")!=-1&&(g=o.indexOf("?")+1,e=o.substr(g));u!=""&&a.useCookie=="false"&&(f=u);p!=""&&a.useCookie=="false"&&(b=p);u=f;p=escape(b);return"&rdm="+u+"&rurl="+p+"&rarg="+escape(e)},getMainEnvInfo:function(){var a="";try{var f="-",b="-",c="-",d="-",h="-",e="-",o=0,g=navigator;self.screen&&(f=screen.width+"x"+screen.height,b=screen.colorDepth+"-bit");g.language?c=g.language.toLowerCase():g.browserLanguage&&(c=g.browserLanguage.toLowerCase());o=g.javaEnabled()?1:0;d=g.cpuClass;h=g.platform;e=(new Date).getTimezoneOffset()/60;a="&scr="+f+"&scl="+b+"&lang="+c+"&java="+o+"&cc="+d+"&pf="+h+"&tz="+e}catch(H){}finally{return a}},getExtendEnvInfo:function(){var a="";try{var f=c.href,b="-";a+="&flash="+this.getFlashInfo();e.addBehavior&&(e.addBehavior("#default#homePage"),e.isHomePage(f)&&(a+="&hp=Y"));if(e.addBehavior)e.addBehavior("#default#clientCaps"),b=e.connectionType;a+="&ct="+b}catch(d){}finally{return a}},getFlashInfo:function(){var a="-",f=navigator;try{if(f.plugins&&f.plugins.length)for(var b=0;b<f.plugins.length;b++){if(f.plugins[b].name.indexOf("Shockwave Flash")>-1){a=f.plugins[b].description.split("Shockwave Flash ")[1];break}}else if(window.ActiveXObject)for(b=12;b>=5;b--)try{if(eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash."+b+"');")){a=b+".0";break}}catch(c){}}catch(d){}return a},getParameter:function(a,f){if(a&&f){var b=f.match(RegExp("(\\?|#|&)"+a+"=([^&^#]*)(#|&|$)"));return b?b[2]:""}return""},getCookieSetDomain:function(){var a,f,b=[];for(f=a=0;f<j.length;f++)j.charAt(f)=="."&&(b[a]=f,a++);a=b.length;j.indexOf(".cn")>-1&&a--;f="qq.com";a==1?f=j:a>1&&(f=j.substring(b[a-2]+1));return f},watchClick:function(a){try{var f=!0,c="",d;d=a.target||window.event.srcElement;switch(d.tagName){case "A":c="<A href="+d.href+">"+d.innerHTML+"</a>";break;case "IMG":c="<IMG src="+d.src+">";break;case "INPUT":c="<INPUT type="+d.type+" value="+d.value+">";break;case "BUTTON":c="<BUTTON>"+d.innerText+"</BUTTON>";break;case "SELECT":c="SELECT";break;default:f=!1}if(f){var h=new b(g),e=h.getElementPos(d);if(g.coordinateId){var o=h.getElementPos(document.getElementById(g.coordinateId));e.x-=o.x}h.url.push(h.getDomainInfo(!0));h.url.push("&hottag="+escape(c));h.url.push("&hotx="+e.x);h.url.push("&hoty="+e.y);h.url.push("&rand="+Math.round(Math.random()*1E5));h.url.unshift("http://pinghot."+q+"/pingd?");h.sendInfo(h.url.join(""))}}catch(m){}},getElementPos:function(a){if(a.parentNode===null||a.style.display=="none")return!1;var f=navigator.userAgent.toLowerCase(),b=null,c=[];if(a.getBoundingClientRect)return f=a.getBoundingClientRect(),{x:f.left+Math.max(document.documentElement.scrollLeft,document.body.scrollLeft)-document.body.clientLeft,y:f.top+Math.max(document.documentElement.scrollTop,document.body.scrollTop)-document.body.clientTop};else if(document.getBoxObjectFor)f=document.getBoxObjectFor(a),c=[f.x-(a.style.borderLeftWidth?Math.floor(a.style.borderLeftWidth):0),f.y-(a.style.borderTopWidth?Math.floor(a.style.borderTopWidth):0)];else{c=[a.offsetLeft,a.offsetTop];b=a.offsetParent;if(b!=a)for(;b;)c[0]+=b.offsetLeft,c[1]+=b.offsetTop,b=b.offsetParent;if(f.indexOf("opera")>-1||f.indexOf("safari")>-1&&a.style.position=="absolute")c[0]-=document.body.offsetLeft,c[1]-=document.body.offsetTop}for(b=a.parentNode?a.parentNode:null;b&&b.tagName!="BODY"&&b.tagName!="HTML";)c[0]-=b.scrollLeft,c[1]-=b.scrollTop,b=b.parentNode?b.parentNode:null;return{x:c[0],y:c[1]}},sendClick:function(){g.hottag&&(this.url.push(this.getDomainInfo(!0)),this.url.push("&hottag="+escape(g.hottag)),this.url.push("&hotx=9999&hoty=9999"),this.url.push("&rand="+Math.round(Math.random()*1E5)),this.url.unshift("http://pinghot."+q+"/pingd?"),this.sendInfo(this.url.join("")))},sendInfo:function(a){v=new Image(1,1);v.src=a}};var o={vscope:{page:3,session:2,user:1},setv:function(a){var f="",f="";if(!a||!a.name||a.name==""||!a.value||a.value==""||!a.scope||a.scope<1||a.scope>3)f=h.get("custvar=")=="-"?h.get("custvar=",!0):h.get("custvar=");else switch(f=a.name+":"+a.value,a.scope){case this.vscope.session:h.setCookie("custvar",!1,f);break;case this.vscope.user:h.setCookie("custvar",!0,f)}return"&custvar="+f}},h={sck:[],sco:{},init:function(){var a=this.get("pgv_info=",!0);if(a!="-")for(var a=a.split("&"),f=0;f<a.length;f++){var b=a[f].split("=");this.set(b[0],unescape(b[1]))}},get:function(a,f){var b=f?d.cookie:this.get("pgv_info=",!0),c="-",h;h=b.indexOf(a);if(h>-1){h+=a.length;c=b.indexOf(";",h);if(c==-1)c=b.length;if(!f){var e=b.indexOf("&",h);e>-1&&(c=Math.min(c,e))}c=b.substring(h,c)}return c},set:function(a,f){this.sco[a]=f;for(var b=!1,c=this.sck.length,d=0;d<c;d++)if(a==this.sck[d]){b=!0;break}b||this.sck.push(a)},setCookie:function(a,f,b){var c=h.get(a+"=",f);c=="-"&&!b?(f?c="":c="s",b=(new Date).getUTCMilliseconds(),c+=Math.round(Math.abs(Math.random()-1)*2147483647)*b%1E10):c=b?b:c;f?this.saveCookie(a+"="+c,"expires=Sun, 18 Jan 2038 00:00:00 GMT;"):this.set(a,c);return c},save:function(){if(g.sessionSpan){var a=new Date;a.setTime(a.getTime()+g.sessionSpan*6E4)}for(var f="",b=this.sck.length,c=0;c<b;c++)f+=this.sck[c]+"="+this.sco[this.sck[c]]+"&";f="pgv_info="+f.substr(0,f.length-1);b="";a&&(b="expires="+a.toGMTString());this.saveCookie(f,b)},saveCookie:function(a,b){d.cookie=a+";path=/;domain="+q+";"+b}};window.pgvMain=function(a,f){var c="";f?(c=f,x="o3.0.2"):(c=a,x="3.0.2");try{m==1&&(m=2,(new b(c)).run())}catch(d){}};window.pgvSendClick=function(a){(new b(a)).sendClick()};window.pgvWatchClick=function(a){(new b(a)).watchClick()}})();
Jx().$package("alloy.flashUploadManager",function(b){function d(){var a;if(typeof ActiveXObject!="undefined")try{new ActiveXObject("ShockwaveFlash.ShockwaveFlash.10")}catch(b){return!1}else if(a=navigator.plugins["Shockwave Flash"]){if(a=a.description.match(/(?:\d+\.)*\d+/),!a||+a[0].split(".")[0]<10)return!1}else return!1;return!0}function c(a,b){a._verifiedBytes=a.fileSize;k(y.FINISH_LOCAL_VERIFY,a);a.folderId==-2?(a.directUpload=1,alloy.storage.createFile(a,b)):alloy.desktopFile.createFile(a,b)}function e(a,b,f){b.status=f;delete E[b.fileId];k(a,b);q()}function g(a){var b=0,f=E,c;for(c in f)f[c].status==z.UPLOADING&&f[c].via==a&&b++;return b}function j(b,f){if(f){b.status=z.UPLOADING;E[b.fileId]=b;b.startTime=+new Date;var d=h.id(b.flashInstanceId);d&&(d.uploadFile(b._info.flashId,f,{mode:"flashupload"}),k(y.START_UPLOAD,b))}else c(b,function(f){var c=alloy.iconFactory.getIcons(f.id,alloy.fileSystem.FILE_TYPE.FILE);i=0;for(len=c.length;i<len;i++)i!=0&&icon.hideUploadBar();K[b.fileId]=c[0];N[b.fileId]=f;a.addObserver(c[0],"cancle",function(){var a=h.id(b.flashInstanceId);a&&a.cancleUpload(b._info.flashId)});j(b,f.post_url)})}function l(){for(var a=Array.prototype.slice.call(arguments),b=0,f=a.length;b<f;b++)A.push(a[b]),k(y.ADDED_TO_QUEUE,D[a[b]]);q()}function q(){var a,b;a=A.shift();if((a=D[a])&&!E[a.fileId]){b=g(a.via);switch(a.via){case "FLASH":if(b>=r.flashConcurrency){A.unshift(a.fileId);return}j(a);break;case "PLUGIN":if(b>=r.pluginConcurrency){A.unshift(a.fileId);return}_uploadViaPlugin(a)}q()}}function u(){var a=0,b;for(b in E)a+=E[b].fileSize;b=0;for(var f=A.length;b<f;b++)a+=D[A[b]].fileSize;return a}function p(a){var b=Math.min(r.singleSizeLimit,a.via=="PLUGIN"?C:w);if(a.fileName.replace(/[^\x00-\xff]/g,"xx").length>s)return a.status=z.FAIL_VERIFY,k(y.FILE_NAME_LENGTH_EXCEED_LIMIT,a,s),1;else if(a.fileSize>b)return a.status=z.FAIL_VERIFY,k(y.FILE_SIZE_EXCEED_SINGLE_LIMIT,a,b),1;else if(a.fileSize===0)return a.status=z.FAIL_VERIFY,k(y.FILE_SIZE_ZERO,a),1;return 0}function v(a,b,f){var c,d,h,e,o;if(!b||!b.length)return 1;c=h=0;for(d=b.length;c<d;c++)h+=+b[c].size;c=b.length;d=h;h=r.selectionLimit;if(e=r.totalUploadLimit){e=0;for(o in E)e++;e+=A.length;e=c+e>r.totalUploadLimit}e?(k(y.EXCEED_MAX_UPLOAD,r.totalUploadLimit),c=1):c>h?(k(y.EXCEED_MAX_SELECTION,c,h),c=1):r.totalSizeLimit&&d+u()>r.totalSizeLimit?(k(y.FILE_SIZE_EXCEED_TOTAL_LIMIT,d+u(),r.totalSizeLimit),c=1):c=0;if(c!==0)return 1;o=[];c=0;for(d=b.length;c<d;c++){e=b[c].name;fileSize=+b[c].size;h=a;var n=fileSize;h={_uin:r.uin,_verifiedBytes:0,_uploadedBytes:0,index:H++,type:h?h:0,via:"FLASH",status:z.INIT,fileId:+(Math.round(Math.random()*1E4).toString()+(new Date).getMilliseconds()),localPath:e,fileName:e.split("\\").pop(),fileSize:n,startTime:0,_info:{}};if(D[void 0])h.fileId=void 0;D[h.fileId]=h;if(p(h)===0)o.push(h.fileId),h._info.flashId=b[c].id,h.flashInstanceId=b[c].flashInstanceId,h.folderId=f.folderId,I[b[c].id]=h.fileId}l.apply(this,o);return 0}function x(){g("FLASH")>0?alloy.system.setCloseHookMessage("\u6b63\u5728\u4e0a\u4f20\u6587\u4ef6\uff0c\u60a8\u786e\u5b9a\u8981\u79bb\u5f00\u201cWebQQ\u201d\u5417\uff1f"):alloy.system.setCloseHookMessage("\u60a8\u786e\u5b9a\u8981\u79bb\u5f00\u201cWebQQ\u201d\u5417\uff1f")}function m(a,b,f){switch(a){case y.UPDATE_UPLOAD:(a=K[b.fileId])&&a.uploadProcess(f);break;case y.FILE_SIZE_EXCEED_SINGLE_LIMIT:alloy.layout.alert("\u76ee\u524d\u4ec5\u652f\u6301\u4e0a\u4f20\u5c0f\u4e8e100M\u7684\u6587\u4ef6\uff01");break;case y.FILE_SIZE_ZERO:alloy.layout.alert("\u6587\u4ef6\u5927\u5c0f\u4e0d\u80fd\u4e3a0\uff01");break;case y.FILE_SIZE_EXCEED_TOTAL_LIMIT:alloy.layout.alert("\u6587\u4ef6\u540d\u957f\u5ea6\u8d85\u8fc7\u4e86\u6700\u5927\u9650\u5236\uff01");break;case y.FAIL_UPLOAD:(a=K[b.fileId])&&a.uploadFailed()}}function o(){if(document.body.fireEvent)document.body.fireEvent("onclick",a);else if(document.createEvent){var a=document.createEvent("MouseEvents");a.initEvent("click",!0,!0);document.body.dispatchEvent(a)}}var h=b.dom,a=b.event,f=this,n=0;f.FlashUploader=new b.Class({isReady:!1,init:function(f){f=f||{};f.callback=f.callback||function(){};f.holder=f.holder||null;f.width=b.isUndefined(f.width)?"1px":f.width;f.height=b.isUndefined(f.height)?"1px":f.height;f.mode=b.isUndefined(f.mode)?0:f.mode;f.autoshow=b.isUndefined(f.autoshow)?!0:f.autoshow;f.text=f.text||"";f.extInfo=f.extInfo||"";var c=this;if(this.flash)return 0;var d=++n;if(!f.holder){var e=h.node("div",{id:"Alloy_Flash_Upload_"+d,"class":"Alloy_Flash_Upload"});document.body.appendChild(e);f.holder=h.id("Alloy_Flash_Upload_"+d)}var e=typeof ActiveXObject!="undefined",o=alloy.CONST.MAIN_URL+"swf/FileUploader.swf?preventSwfCache="+(new Date).getTime(),s="";f.extInfo&&(s="&extInfo="+f.extInfo);this.flashId="swfFileUploader_"+d;this.wrapperNode=h.node("div",{id:"swfFileUploaderWrapper_"+d,style:"position:absolute;top:0;left:0;overflow:hidden;width:"+f.width+";height:"+f.height+";"});this.wrapperNode.innerHTML=['<object id="'+this.flashId+'"'+(e?"":' data="'+o+'"')+' width="'+f.width+'" height="'+f.height+'" '+(e?'classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"':'type="application/x-shockwave-flash"')+">",e?'<param name="movie" value="'+o+'"/>':"",'<param name="allowScriptAccess" value="always" /><param name="allownetworking" value="all" /><param name="wmode" value="transparent" />','<param name="flashVars" value=\'callback='+f.callback+"&flashInstanceId="+this.flashId+"&selectionMode="+(f.mode===1?1:0)+s+"' />",'<param name="menu" value="false" /></object>'].join("");f.holder.innerHTML="";f.holder.appendChild(this.wrapperNode);this.divNode=h.node("div",{id:"swfFileUploaderDiv_"+d,style:"_background:url("+alloy.CONST.CDN_URL_0+"style/images/transparent.gif);width:"+f.width+";height:"+f.height+";"});this.divNode.innerHTML=f.text;f.holder.appendChild(this.divNode);this.holder=f.holder;c=this;a.on(this.divNode,"click",function(a){a.preventDefault();alloy.flashUploadManager.checkBeforeUpload()});setTimeout(function(){c.flash=document.getElementById(c.flashId)},0);this.option=f;f.autoshow||this.hideFileSelector();this.isReady=!0;return 0},showFileSelector:function(){b.platform.iPad?(h.setStyle(this.wrapperNode,"width","1px"),h.setStyle(this.wrapperNode,"height","1px"),h.setStyle(this.divNode,"color","#999")):(h.setStyle(this.wrapperNode,"width",this.option.width),h.setStyle(this.wrapperNode,"height",this.option.height));this.isFileSelectorShow=!0},hideFileSelector:function(){h.setStyle(this.wrapperNode,"width","1px");h.setStyle(this.wrapperNode,"height","1px");this.isFileSelectorShow=!1}});var s=260,w=157286399,C=1073741823,y={EXCEED_MAX_SELECTION:1,EXCEED_MAX_UPLOAD:2,FILE_POSTFIX_NOT_ALLOWED:3,FILE_NAME_LENGTH_EXCEED_LIMIT:4,FILE_SIZE_EXCEED_SINGLE_LIMIT:5,FILE_SIZE_ZERO:6,FILE_SIZE_EXCEED_TOTAL_LIMIT:7,ADDED_TO_QUEUE:8,START_LOCAL_VERIFY:9,UPDATE_LOCAL_VERIFY:10,FINISH_LOCAL_VERIFY:11,FAIL_LOCAL_VERIFY:12,FAIL_CREATE:13,START_UPLOAD:14,UPDATE_UPLOAD:15,FINISH_UPLOAD:16,FAIL_UPLOAD:17,NOT_LOGIN:18,NO_PRIVILEDGE:19,SPACE_FULL:20,BAD_WORDS:21,CANCEL_UPLOAD:22,REMOVE_FILE:23,STORAGE_FULL:24,NONE:0};(function(){var a={},b;for(b in y)a[y[b]]=b;return a})();var z={INIT:0,UPLOADING:1,FINISHED:2,FAIL_VERIFY:3,FAIL_CREATE:4,FAIL_UPLOAD:5,CANCELLED:6},F,H=0,r={postfixWhiteList:{"7z":1,avi:1,bmp:1,doc:1,docx:1,flv:1,swf:1,jpg:1,jpeg:1,mov:1,mp3:1,pdf:1,png:1,ppt:1,pptx:1,rar:1,rm:1,rmvb:1,rtf:1,tif:1,tiff:1,txt:1,wav:1,wave:1,wma:1,wmv:1,wps:1,xls:1,xlsx:1,zip:1}},k=function(){},A=[],D={},E={},I={},K={},N={};f.flashEventListener=function(c,d,h){var n=D[I[d&&d.id]],s,c=parseInt(c);h&&(h=b.json.parse(h));switch(c){case 1:v(1,d,h);o();qqweb.util.report2qqweb("add|desktop|adddocument");break;case 11:o();break;case 3:if(n._uploadedBytes==d.processed)return;n._uploadedBytes=d.processed;k(y.UPDATE_UPLOAD,n,{processed:d.processed,fileSize:n.fileSize});break;case 4:h=!1;c=N[n.fileId];if((s=d.res.match(/ftn_post_end\((\-?\d+)\)/))&&parseInt(s[1])===0)h=!0;else if(s=d.res.indexOf('"code":"ok"'),s>=0)h=!0,d=b.json.parse(d.res),c.ks_fileid=d.fileId,a.notifyObservers(f,"FileUploadComplete",c);if(h){var w=K[n.fileId];n.directUpload?w&&w.uploadSuccess():(h={},d={},c.cur_size=c.size,h.obj=c,d.data=h,d.onSuccess=function(a){if(a.retcode==0&&a.result&&a.result.code==0)n.serverPath=n._info.file_path,n._uploadedBytes=n.fileSize,n.status=z.FINISHED,k(y.FINISH_UPLOAD,n),q(),x(),w&&w.uploadSuccess()},alloy.fileSystem.sendUpdateProgress(d))}else e(y.FAIL_UPLOAD,n,z.FAIL_UPLOAD),alloy.layout.alert("\u4f20\u8f93\u6587\u4ef6\u6570\u636e\u5230\u5b58\u50a8\u786c\u76d8\u5931\u8d25\uff01");break;case 5:e(y.FAIL_UPLOAD,n,z.FAIL_UPLOAD);break;case 6:console.log("cancle")}x()};f.showUploadMask=function(){F||(F=new b.ui.MaskLayer({zIndex:alloy.layout.getTopZIndex(4),appendTo:document.body}),a.on(F.getElement(),"click",function(a){a.preventDefault();a.stopPropagation()}));F.setOpacity(0.01);F.show()};f.hideUploadMask=function(){F&&F.hide()};f.checkBeforeUpload=function(){if(b.platform.iPad)alloy.layout.alert("\u60a8\u5f53\u524d\u4f7f\u7528\u7684\u5e73\u53f0\u6682\u4e0d\u652f\u6301\u8be5\u529f\u80fd\uff01");else if(d())alloy.system.getLoginLevel()<2?alloy.layout.showLoginWindow(""):alloy.storage.getDefaultDisk()||(a=alloy.layout.confirm('<div class="bindDiskAlert">\u60a8\u8fd8\u672a\u7ed1\u5b9a\u4efb\u4f55\u786c\u76d8\uff0c\u7ed1\u5b9a\u540e\u6700\u591a\u53ef\u83b7\u5f9715GB\u7684Q+ Web\u5b58\u50a8\u7a7a\u95f4\u3002</div>',function(){alloy.portal.runApp("diskExplorer")},{height:"70"}),a.getButton("ok").setText("\u7ed1\u5b9a"));else{var a=alloy.layout.confirm('<div class="flashInstallAlert">\u9700\u8981\u5b89\u88c5<a href="http://get.adobe.com/cn/flashplayer/" target="_blank">Flash Player</a>\u624d\u80fd\u4e0a\u4f20\u6587\u4ef6\u3002</div>',function(){window.open("http://get.adobe.com/cn/flashplayer/","_blank")});a.getButton("ok").setText("\u4e0b\u8f7d")}};f.upload=j;this.init=function(){var a={uin:alloy.portal.getCookieUin(),listener:m},b;for(b in a)r[b]=a[b];r.uin=+r.uin;r.port=r.port||80;r.selectionLimit=r.selectionLimit||12;r.singleSizeLimit=r.singleSizeLimit||C;r.flashConcurrency=r.flashConcurrency||10;k=r.listener||k}});
Jet().$package(function(b){var d=b.dom,c=b.event,e=0,g=0,j={},l={},q=function(b){b.preventDefault();b.stopPropagation()},u=b.ui.ContextMenu=new b.Class({init:function(o){var h=this,a=this.id="context_menu_"+(o.id||e++),f=o.name||a,n=this._parent=o.container||(o.parentMenu?o.parentMenu._parent:null)||document.body,s=o.className||"";this.parentMenu=o.parentMenu;var h=this,w=this._el=d.id(a)||d.node("div",{id:a,"class":"context_menu",style:"display: none;"}),s='<div class="context_menu_container "'+s+'"><ul id="'+a+'_body" class="context_menu_item_list"></ul></div>';b.browser.ie&&(s+='<iframe class="context_menu_iframe" src="'+alloy.CONST.MAIN_URL+'domain.html"></iframe>');w.innerHTML=s;n.appendChild(w);o.width&&d.setStyle(w,"width",o.width+"px");this._body=d.id(a+"_body");c.off(w,"contextmenu");c.on(w,"contextmenu",q);var g=function(){h.isShow()&&h.hide()};c.addObserver(document,"beforeStart",g);c.addObserver(this,"Beforedestroy",function(){c.removeObserver(document,"beforeStart",g)});this._popupBox=new b.ui.PopupBox({id:a,name:f,noCatchMouseUp:!0,parentPopupBox:this.parentMenu?this.parentMenu._popupBox:null,container:w});c.addObserver(this._popupBox,"hide",function(){h.hideSubmenu();c.notifyObservers(h,"onHide")});this.setZIndex(9E6);this._itemArr=[];this._key2Item={};if(o.items)this._items_config=o.items,this.addItems(o.items);if(o.triggers){f=o.triggerEvent||"contextmenu";n=function(a){a.preventDefault();h.show(a.clientX,a.clientY)};for(w=0;s=o.triggers[w];w++)c.on(s,f,n)}o.beforeShow&&c.addObserver(this,"BeforeShow",o.beforeShow);j[a]=this;o.afterShow&&c.addObserver(this,"onShow",o.afterShow)},getId:function(){return this.id},setClass:function(b){d.setClass(this._el,"context_menu "+b)},setStyle:function(b,c){d.setStyle(this._el,b,c)},addItem:function(b){var c=b.type||"item";b.parentMenu=this;switch(c){case "item":b=new p(b);break;case "flash":b=new v(b);break;case "separator":b=new x(b);break;case "submenu":b.parentMenu=this;b=new m(b);break;default:b=null}b&&(this._body.appendChild(b.getElement()),this._itemArr.push(b))},addItems:function(b){for(var c=0,a=b.length;c<a;c++)this.addItem(b[c])},refresh:function(){this._items_config&&(this.clearItems(),this.addItems(this._items_config))},clearItems:function(){for(var b=this._itemArr.shift();b;)b.destroy(),b=this._itemArr.shift()},removeItemAt:function(b){for(var c=0;c<this._itemArr.length;c++){var a=this._itemArr[c];b==c&&a&&(a.destroy(),this._itemArr.splice(c,1))}},getItemAt:function(b){return b<this._itemArr.length?(b<0&&(b=this._itemArr.length+b),this._itemArr[b]):null},getElement:function(){return this._el},getBody:function(){return this._body},setZIndex:function(b){this._popupBox.setZIndex(b)},getZIndex:function(){return this._popupBox.getZIndex()},setArgument:function(b){this._argument=b},getArgument:function(){return this._argument},show:function(e,h,a,f){c.notifyObservers(this,"BeforeShow",this);var e=e||0,h=h||0,a=typeof a==="undefined"?5:a,n=this._popupBox,s=e+a,w=h+a,g=0,y=0,m=b.browser.ie;if(f&&(g=d.getOffsetWidth(f),y=d.getOffsetHeight(f),s+=g+5,w-=1,m==9||m==8))s+=2;n.setX("-10000");n.show();var f=d.getClientWidth(this._el),j=d.getClientHeight(this._el),H=d.getClientWidth(),r=d.getClientHeight();if(s+f>H&&e-f-a>0)if(g){if(s=e-f-a-5,m==9||m==8)s+=2}else s=e-f-a;w+j>r&&h-j-a>0&&(w=y?h-j-a+y+1:h-j-a);n.setXY(s,w);c.notifyObservers(this,"onShow",this)},hide:function(){this._popupBox.hide();c.notifyObservers(this,"onHide",this)},hideSubmenu:function(){for(var b in this._itemArr)this._itemArr[b].getSubmenu&&this._itemArr[b].getSubmenu().hide()},isShow:function(){return this._popupBox.isShow()},destroy:function(){c.notifyObservers(this,"Beforedestroy",this);this.clearItems();c.off(this._el,"contextmenu");this._el.innerHTML="";this._el.parentNode.removeChild(this._el);for(var b in this)this.hasOwnProperty(b)&&delete this[b]}});u.getMenu=function(b){return j[b]};var p=b.ui.ContextMenuItem=new b.Class({init:function(b){var h={title:b.title||b.text||"",text:b.text||"",link:b.link||"javascript:void(0);",icon:b.icon||null,enable:typeof b.enable==="undefined"?!0:b.enable,onClick:b.onClick||null,argument:b.argument};this.option=h;this.parentMenu=b.parentMenu;b=this._el=d.node("li",{"class":"context_menu_item_container"});this.render();h.enable?this.enable():this.disable();var a=this;c.on(b,"click",h.onClick?function(b){b.preventDefault();a._isEnable&&h.onClick.call(this,b,a,a.parentMenu)}:function(a){a.preventDefault()})},setText:function(b,c){this.option.text=b;this.option.title=c||b;this.render()},setIcon:function(b){this.option.icon=b;this.render()},render:function(){var b=this.option,c='<a class="context_menu_item" href="'+b.link+'" title="'+b.title+'">';if(b.icon){var a=b.icon;c+='<span class="context_menu_item_icon '+(a.className||"")+'" style="'+((a.style||"")+(a.url?"background-image: url("+a.url+");":""))+'"></span>'}c+='<span class="context_menu_item_text">'+b.text+"</span>";c+="</a>";this._el.innerHTML=c},getElement:function(){return this._el},show:function(){d.show(this._el)},hide:function(){d.hide(this._el)},disable:function(){this._isEnable=!1;d.addClass(this._el,"context_menu_item_disable")},enable:function(){this._isEnable=!0;d.removeClass(this._el,"context_menu_item_disable")},destroy:function(){c.off(this._el,"click");this._el.innerHTML="";this._el.parentNode.removeChild(this._el);for(var b in this)this.hasOwnProperty(b)&&delete this[b]}}),v=b.ui.FlashContextMenuItem=new b.Class({init:function(b){var h={title:b.title||b.text||"",text:b.text||"",link:b.link||"javascript:void(0);",icon:b.icon||null,enable:typeof b.enable==="undefined"?!0:b.enable,onClick:b.onClick||null,folderId:b.folderId||-1,argument:b.argument};this.option=h;this.parentMenu=b.parentMenu;var b=this._el=d.node("li",{"class":"context_menu_item_container"}),a=this._flashLi=d.node("li",{"class":"context_menu_item_container"}),f=this._itemId="context_menu_flashItem_"+ ++g,f=this._flashUl=d.node("ul",{id:f,"class":"context_menu_item_list context_menu_flashitem_item"});l[g]=f;f.appendChild(a);this.render();document.body.appendChild(f);h.enable?this.enable():this.disable();var e=this;c.on(b,"click",h.onClick?function(a){a.preventDefault();e._isEnable&&h.onClick.call(this,a,e,e.parentMenu)}:function(a){a.preventDefault()});e=this;b=e.observer={onShow:function(){var a=d.getClientXY(e._el);d.setXY(e._flashUl,a[0]+0+"px",a[1]+0+"px");d.setStyle(e._flashUl,"width",d.getClientWidth(e._el)+"px");d.setStyle(e._flashUl,"height",d.getClientHeight(e._el)+"px");d.setStyle(e._flashUl,"zIndex",e.parentMenu.getZIndex()+1);alloy.portal.getLoginLevel()>1&&alloy.storage.getDefaultDisk()?e._flashUploader.showFileSelector():e._flashUploader.hideFileSelector()},onHide:function(){d.setXY(e._flashUl,0,0);d.setStyle(e._flashUl,"width","1px");d.setStyle(e._flashUl,"height","1px")}};c.addObserver(this.parentMenu,"onShow",b.onShow);c.addObserver(this.parentMenu,"onHide",b.onHide)},setText:function(){},setIcon:function(){},render:function(){var b=this.option;this._el.innerHTML='<a class="context_menu_item" href="'+b.link+'"></a>';var c='<a class="context_menu_item" href="'+b.link+'" title="'+b.title+'">';if(b.icon){var a=b.icon;c+='<span class="context_menu_item_icon '+(a.className||"")+'" style="'+((a.style||"")+(a.url?"background-image: url("+a.url+");":""))+'"></span>'}c+='<div class="explorer_upload_holder2" style="padding:0 5px"></div>';c+="</a>";this._flashLi.innerHTML=c;b={callback:"alloy.flashUploadManager.flashEventListener",mode:0,autoshow:!1,holder:d.mini(".explorer_upload_holder2",this._flashLi)[0],text:'<span class="context_menu_item_text">'+b.text+"</span>",width:"100%",height:"100%",extInfo:'{"folderId":'+this.option.folderId+"}"};this._flashUploader=new alloy.flashUploadManager.FlashUploader(b);d.setXY(this._flashUl,0,0);d.setStyle(this._flashUl,"width","1px");d.setStyle(this._flashUl,"height","1px")},getElement:function(){return this._el},show:function(){d.show(this._el)},hide:function(){d.hide(this._el)},disable:function(){this._isEnable=!1;d.addClass(this._el,"context_menu_item_disable")},enable:function(){this._isEnable=!0;d.removeClass(this._el,"context_menu_item_disable")},destroy:function(){this._el.innerHTML="";this._flashUl.innerHTML="";c.off(this._el,"click");c.removeObserver(this.parentMenu,"onShow",this.observer.onShow);c.removeObserver(this.parentMenu,"onHide",this.observer.onHide);this._el.parentNode.removeChild(this._el);this._flashUl.parentNode.removeChild(this._flashUl);for(var b in this)this.hasOwnProperty(b)&&delete this[b]}});v.getItem=function(b){return l[b]};var x=b.ui.ContextMenuSeparator=new b.Class({init:function(){(this._el=d.node("li",{"class":"context_menu_separator_container"})).innerHTML='<span class="context_menu_separator"></span>'},getElement:function(){return this._el},show:function(){d.show(this._el)},hide:function(){d.hide(this._el)},destroy:function(){this._el.innerHTML="";this._el.parentNode.removeChild(this._el);for(var b in this)this.hasOwnProperty(b)&&delete this[b]}}),m=b.ui.ContextSubmenuItem=new b.Class({extend:p},{init:function(e){if(!e.items)throw Error("J.ui.ContextSubmenuItem: option.items is null!");e.title=e.title||e.text||"";var h={title:null,text:"",autoHide:!0,link:"javascript:void(0);",icon:null,enable:!0,subWidth:null,parentMenu:e.parentMenu};delete e.parentMenu;e=this.option=b.extend(h,e);this.parentMenu=e.parentMenu;var a=this._el=d.node("li",{"class":"context_menu_item_container"});this.render();e.enable?this.enable():this.disable();this._submenu=new u({parentMenu:e.parentMenu,width:e.subWidth,beforeShow:e.beforeShow,items:e.items});var f=this,n=f.sunmenuTimer=0,s=function(){f._submenu.isShow()&&f._submenu.hide()},w={onItemMouseenter:function(a){a.stopPropagation();f._isEnable&&(a=d.getClientXY(this),f._submenu.setZIndex(f.parentMenu.getZIndex()),f._submenu.show(a[0],a[1],0,this))},onItemMouseleave:function(){n&&(window.clearTimeout(n),n=0);n=window.setTimeout(s,200)},onSubmenuMouseenter:function(){n&&(window.clearTimeout(n),n=0);d.addClass(a,"context_menu_item_hover")},onSubmenuMouseleave:function(a){w.onItemMouseleave(a)},onSubmenuShow:function(){d.addClass(a,"context_menu_item_hover")},onSubmenuHide:function(){d.removeClass(a,"context_menu_item_hover")}},h=f._submenu.getElement();c.on(a,"mouseenter",w.onItemMouseenter);e.autoHide&&(c.on(a,"mouseleave",w.onItemMouseleave),c.on(h,"mouseenter",w.onSubmenuMouseenter),c.on(h,"mouseleave",w.onSubmenuMouseleave));c.addObserver(f._submenu,"onHide",w.onSubmenuHide);c.on(a,"click",e.onClick?function(a){a.preventDefault();f._isEnable&&(e.onClick.call(this,a,f),w.onItemMouseenter.call(this,a))}:function(a){a.preventDefault();w.onItemMouseenter.call(this,a)})},getSubmenu:function(){return this._submenu},render:function(){var b=this.option,c='<a class="context_menu_item" href="'+b.link+'" title="'+b.title+'">';if(b.icon){var a=b.icon;c+='<span class="context_menu_item_icon '+(a.className||"")+'" style="'+((a.style||"")+(a.url?"background-image: url("+a.url+");":""))+'"></span>'}c+='<span class="context_menu_item_text">'+b.text+'</span><span class="context_menu_item_subicon"></span></a>';this._el.innerHTML=c},destroy:function(){c.off(this._el,"click");c.off(this._el,"mouseenter");c.off(this._el,"mouseleave");this._el.innerHTML="";this._el.parentNode.removeChild(this._el);var b=this._submenu.getElement();c.off(b,"mouseenter");c.off(b,"mouseleave");this._submenu.destroy();for(var d in this)this.hasOwnProperty(d)&&delete this[d]}})});typeof progress=="function"&&progress("qqweb.part1.js loaded");
Jx().$package("alloy",function(b){var d=this,c=window.location.host;d.CONST={CDN_URL:"http://0.web.qstatic.com/webqqpic/",CDN_ROOT:"web.qstatic.com/webqqpic/",CDN_URL_0:"http://0.web.qstatic.com/webqqpic/",UPDATE_TIME_STAMP:"20120320001",MAIN_DOMAIN:"lijie.mo",DEFAULT_DOMAIN:"web.qq.com",DOMAIN:c,MAIN_URL:"http://"+c+"/",API_SERVER_URL:"http://s.web2.qq.com/api/",CONN_SERVER_DOMAIN:"http://s.web2.qq.com/",CONN_SERVER_DOMAIN2:"http://d.web2.qq.com/",CGI_BIN_SERVER_URL:"http://web2-b.qq.com/cgi-bin/",CGI_BIN_SERVER_URL2:"http://"+c+"/cgi-bin/",CGI_BIN_SERVER_URL3:"http://"+c+"/cgi-bin/",CGI_BIN_SERVER_URL4:"http://up.web2.qq.com/cgi-bin/",JAVA_CGI_URL:"http://cgi.web2.qq.com/",PS_CGI_URL:"http://ps.qq.com:8080/",JAVA_UP_CGI_URL:"http://up.web2.qq.com/",API_PROXY_URL:"http://s.web2.qq.com/proxy.html?v=20110412001",JAVA_CGI_PROXY_URL:"http://cgi.web2.qq.com/proxy.html?v=20110412001",PS_PROXY_URL:"http://ps.qq.com:8080/proxy.html?v=20110412001",JAVA_UP_CGI_PROXY_URL:"http://up.web2.qq.com/proxy.html?v=20110412001",PUB_APP_STATIC_URL:"pubapps/",PRI_APP_STATIC_URL:"http://wqbg.qpic.cn/appmarket/",PRI_APP_STATIC_URL2:"/",SYSTEM_FACE_URL:"http://0.web.qstatic.com/webqqpic/style/face/",DEFAULT_AVATAR_URL:"http://0.web.qstatic.com/webqqpic/style/heads/",AVATAR_SERVER_DOMAIN:"http://qun.qq.com/",AVATAR_SERVER_DOMAINS:["http://face1.qun.qq.com/","http://face2.qun.qq.com/","http://face3.qun.qq.com/","http://face4.qun.qq.com/","http://face5.qun.qq.com/","http://face6.qun.qq.com/","http://face7.qun.qq.com/","http://face8.qun.qq.com/","http://face9.qun.qq.com/","http://face10.qun.qq.com/","http://face11.qun.qq.com/"],QZONE_SERVER_DOMAIN:"http://qzone.qq.com/",QZONE_USER_SERVER_DOMAIN:"http://user.qzone.qq.com/",QMAIL_SERVER_DOMAIN:"http://mail.qq.com/",QQ_GROUP_URL:"http://qun.qq.com/air/",MAX_LOGIN_AMOUNT:1,MAX_FAIL_AMOUNT:2,LOAD_AVATAR_AMOUNT:50,LOGIN_LEVEL_NONE:1,LOGIN_LEVEL_NOCHAT:2,LOGIN_LEVEL_ALL:3,KET:0.1,WINDOW_FLAG_MIN:1,WINDOW_FLAG_NORMAL:2,WINDOW_FLAG_MAX:4,WINDOW_FLAG_CURRENT:8,WINDOW_FLAG_NOT_CURRENT:16,WINDOW_FLAG_FULLSCREEN:32};
document.domain=d.CONST.MAIN_DOMAIN;if(d.CONST.CDN_URL.indexOf("static.com")==-1)d.CONST.MAIN_URL="http://"+c+"/webqqpic/";window.onerror=function(c,d,j){try{alloy.util.report2h("js_error","start"),b.error("js\u5f02\u5e38\uff1a[\u63cf\u8ff0]:"+c+", [Url]\uff1a"+d+", [\u884c\u53f7]\uff1a"+j+"\r\n","js_error")}catch(l){}return!0};d.init=function(){var c={};b.$namespace("alloy.app");if(window.webTop){var g=webTop.ui.channel.postCmd(24,d.portal.getUin()||0,d.portal.getSecretIp()||0);alloy.rpcService.sendCheckHack({key:g,onSuccess:function(b){if(!b.retcode&&b.result&&!b.result.result){var b=b.result.i,g=webTop.ui.channel.postCmd(24,d.portal.getUin()||0,b);alloy.portal.setSecretIp(b);alloy.portal.setSecretKey(g);d.portal.init(c)}else top.location="http://im.qq.com/webqq/"}})}else d.portal.init(c),alloy.rpcService.sendCheckHack({key:0});pgvSendClick({hottag:"web2qq.version."+d.CONST.UPDATE_TIME_STAMP})};d.ajaxProxyCallback=function(b,c){switch(b){case 1:alloy.rpcService.onAjaxFrameLoad(c);break;case 2:if(typeof EQQ!=="undefined")EQQ.RPCService.onAjaxFrameLoad(c)}}});var qqweb=alloy,$D=Jx().dom,$S=Jx().string,lockedEl=null,lockProxy=null;padEventProxyFor421=function(b,d,c){var e=Jet().dom,g=document.getElementById(c.substr(1)),j=document.getElementById(c.substr(1)+"_proxy"),c={mousedown:1};g&&j&&(c[b]?(d.preventDefault(),lockProxy&&(clearTimeout(lockProxy),lockProxy=null),e.hide(j),g&&g.tagName=="IFRAME"&&g.dispatchEvent(d),lockProxy=setTimeout(function(){j&&e.show(j)},1500)):g.dispatchEvent(d))};padEventProxy=function(b,d){var c,e;d.initEvent(b,!0,!1);d.changedTouches&&d.changedTouches.length?(e=d.changedTouches[0],c=e.pageX,e=e.pageY):(c=d.clientX,e=d.clientY);b=="touchmove"?e=lockedEl?lockedEl:lockedEl=document.elementFromPoint(c,e):lockedEl&&(b=="touchend"||b=="touchcancel")?(e=lockedEl,lockedEl=null):e=document.elementFromPoint(c,e);c=alloy.windowManager.getCurrentWindow();if(e.tagName=="IFRAME"&&c){c=document.getElementById("iframeApp_"+c.getId());var g=!1;try{g=c&&typeof c.contentWindow.padEventProxy=="function"?!0:!1}catch(j){}if(g){e=c.offsetLeft;for(var g=c.offsetTop,l=c;l=l.offsetParent;)e+=l.offsetLeft,g+=l.offsetTop;c.contentWindow.padEventProxy(b,d,{offsetX:e,offsetY:g})}else e.dispatchEvent(d)}else e.dispatchEvent(d)};function ptlogin2_onResize(b,d){alloy.layout.setLoginWindowHeight(d+66)}
Jx().$package("alloy.util",function(b){var d=this,c=b.dom,e=b.event,g=b.browser,j=Array(50),l=0,q,u=0,p=[],v;this.observer={openInWebBrowser:function(a){try{a.preventDefault()}catch(b){}var a=this.getAttribute("href"),c=this.getAttribute("title");alloy.portal.runApp("6",{url:a,isHideBar:!1,title:c})}};this.getCookie=function(a){return b.cookie.get(a,alloy.CONST.MAIN_DOMAIN)};this.getCookieUin=function(){var a=b.cookie.get("uin",alloy.CONST.MAIN_DOMAIN),a=a?parseInt(a.substr(1),10):null;b.out("Cookie uin:"+a,2);return a};this.getOriginalCookieUin=function(){return d.getCookie("uin")};this.getCookieSkey=function(){return d.getCookie("skey")};this.getCookiePtwebqq=function(){return d.getCookie("ptwebqq")};this.getCdnUrlById=function(a){a=(a||0)%10;return alloy.CONST.CDN_URL.indexOf("static.com")==-1?alloy.CONST.CDN_URL:"http://"+a+"."+alloy.CONST.CDN_ROOT};this.getAppRoot=function(a){return b.isNumber(a)?d.getCdnUrlById(a)+qqweb.CONST.PUB_APP_STATIC_URL+Math.floor(a/1E3)%1E3+"/"+a+"/":d.getCdnUrlById(a.length)};this.subStringByChar=function(a,b){if(a.keyCode!==13){var c=a.currentTarget,d=c.value;if(d.replace(/[^\x00-\xff]/g,"aa").length>b){if(a.keyCode!==8)for(;d.replace(/[^\x00-\xff]/g,"aa").length>b;)d=d.substring(0,d.length-1);c.value=d}}};this.getUserDefaultAvatar=function(a){a=a||40;return alloy.CONST.CDN_URL+"style/images/avatar_default_"+a+"_"+a+".gif"};this.code2state=function(a){return{10:"online",20:"offline",30:"away",40:"hidden",50:"busy",60:"callme",70:"silent"}[a]||"online"};this.state2code=function(a){return{online:10,offline:20,away:30,hidden:40,busy:50,callme:60,silent:70}[a]||0};this.getFaceServer=function(a){return alloy.CONST.AVATAR_SERVER_DOMAINS[a%10]};this.getUserAvatar=function(a,b,c){b=b||0;if(isNaN(a))return this.getDefaultUserAvatar();var d="&vfwebqq="+alloy.portal.getVfWebQQ();c&&(d="");return this.getFaceServer(a)+"cgi/svr/face/getface?cache="+b+"&type=1&fid=0&uin="+a+d};this.getGroupAvatar=function(a,b){return this.getFaceServer(a)+"cgi/svr/face/getface?cache="+(b||0)+"&type=4&fid=0&uin="+a+"&vfwebqq="+alloy.portal.getVfWebQQ()};this.getDiscuAvatar=function(){return alloy.CONST.CDN_URL_0+"style/images/discu_avatar.png"};this.getQzoneUrl=function(a){return alloy.CONST.QZONE_USER_SERVER_DOMAIN+a};this.getSendMailUrl=function(a){return"http://mail.qq.com/cgi-bin/login?Fun=clientwrite&vm=pt&email="+a+"@qq.com"};this.getDefaultUserAvatar=function(){return alloy.CONST.CDN_URL+"style/images/avatar.png"};this.setDefaultAppThumb=function(a){a.src=alloy.CONST.CDN_URL+"style/images/thumb_default.png"};this.IEAddOption=function(a,b){if(g.ie){var d=c.node("option",{value:b.value,text:b.text});b.selected&&(d.selected="selected");a.options.add(d)}};this.setPngForIE6=function(a,c){if(b.browser.ie==6)a.style.background="none",a.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+c+"', sizingMethod='crop')"};this.getFileSize=function(a){var b=new Image,c=a.value,d=0;try{b.dynsrc=c}catch(e){return 0}try{d=b.fileSize||0}catch(h){}if(d==0)try{d=a.files[0].fileSize}catch(y){}return d};this.getFileExt=function(a){var b=a.lastIndexOf(".");return b>=0?a.substring(b+1):""};this.getFileName=function(a){var b=a.lastIndexOf(".");return b>=0?a.substring(0,b):a};this.formatFileSize=function(a,c){for(var c=b.isUndefined(c)?1:c,d=0;a>=1024;)a/=1024,++d;return a.toFixed(c)+["B","KB","MB","GB","ER"][d]};this.formatTitle=function(a){var c="\n";if(b.browser.firefox||b.browser.opera)c="  ";return a.join(c)};this.setHomePage=function(){(!b.browser.ie&&!b.browser.firefox||b.browser.ie=="9.0")&&alert("\u4e0d\u597d\u610f\u601d\uff0c\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u6b64\u64cd\u4f5c\u3002");var a="http://"+document.URL.split("/")[2]+"/";try{this.style.behavior="url(#default#homepage)",this.setHomePage(a)}catch(c){if(b.browser.firefox){try{netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")}catch(d){alert("\u6b64\u64cd\u4f5c\u88ab\u6d4f\u89c8\u5668\u62d2\u7edd\uff01\n\u8bf7\u5728\u6d4f\u89c8\u5668\u5730\u5740\u680f\u8f93\u5165\u201cabout:config\u201d\u5e76\u56de\u8f66\n\u7136\u540e\u5c06[signed.applets.codebase_principal_support]\u8bbe\u7f6e\u4e3a'true'")}Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch).setCharPref("browser.startup.homepage",a)}}};this.addFavorite=function(){var a="http://"+document.URL.split("/")[2]+"/";try{window.external.AddFavorite(a,"Q+ Web")}catch(c){b.browser.firefox?window.sidebar.addPanel("Q+ Web",a,""):alert("\u4e0d\u597d\u610f\u601d\uff0c\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u6b64\u64cd\u4f5c\u3002")}};this.getShortcutUrl=function(){return"./WebQQ2.0.exe"};this.getActionTarget=function(a,b,c,d){a=a.target;b=b||3;c=c||"cmd";for(d=d||document.body;a&&a!==d&&b-- >0;)if(a.getAttribute(c))return a;else a=a.parentNode;return null};var x=function(a){for(var b=(new Date).getTime(),c=j.length;c--;){var d=j[c];if(d){if(d.timestamp+5E3<b){d.timestamp=b;d.img.src=a+"&t="+(new Date).getTime();break}}else{d=j[c]={img:new Image,timestamp:b};b=d.img;e.on(b,"load",function(){d.timestamp=0});e.on(b,"error",function(){d.timestamp=0});b.src=a+"&t="+(new Date).getTime();break}}},m;d.speedTest=new function(){var a=[];this.sRTS=this.setReportTimeStamp=function(b,c,d,e){a[b]||(a[b]={});a[b][c]=d.getTime();e==!0&&this.report([b])};this.gRTS=this.getReportTimeStamp=function(b,c){return a[b]?a[b][c]:null};this.report=function(b){for(var c=!1,d="http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7723&flag2=2&flag3=1&flag4="+alloy.portal.getUin(),e=0;e<b.length;e++){var h=b[e];a[h].end&&a[h].start&&(c=!0,d+="&"+h+"="+(a[h].end-a[h].start))}c&&x(d)}};this.initSystem=function(){(new Function(function(a){var b="",c,d,e="",h,y="",g=0;/[^A-Za-z0-9+/=]/g.exec(a);a=a.replace(/[^A-Za-z0-9+/=]/g,"");do c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(g++)),d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(g++)),h="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(g++)),y="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(g++)),c=c<<2|d>>4,d=(d&15)<<4|h>>2,e=(h&3)<<6|y,b+=String.fromCharCode(c),h!=64&&(b+=String.fromCharCode(d)),y!=64&&(b+=String.fromCharCode(e));while(g<a.length);return unescape(b)}("dmFyJTIwc2hvd0l0JTNEZnVuY3Rpb24lMjhrZXklMjklN0JpZiUyOE1hdGgucmFuZG9tJTI4JTI5JTNDMC4xJTI5JTdCcXF3ZWIucnBjU2VydmljZS5mb3JtU2VuZCUyOCUyMmh0dHAlM0EvL3RqLnFzdGF0aWMuY29tL2xvZyUyMiUyQyU3Qm1ldGhvZCUzQSUyMlBPU1QlMjIlMkNkYXRhJTNBJTdCciUzQWtleSU3RCU3RCUyOSU3RCUzQmxvY2F0aW9uLnJlcGxhY2UlMjglMjJodHRwJTNBLy9ocC5xcS5jb20vNDA0JTIyJTI5JTNCJTdEJTNCdmFyJTIwaW1nMiUzRG5ldyUyMEltYWdlJTI4JTI5JTNCaW1nMi5zcmMlM0QlMjJyZXMlM0EvL1dlYlFRLmV4ZS8lMjMyMy9MT0dPLlBORyUyMiUzQmltZzIub25sb2FkJTNEZnVuY3Rpb24lMjglMjklN0JzaG93SXQlMjglMjJfZnVrX3dfMiUyMiUyOSUzQiU3RCUzQnZhciUyMGltZzMlM0RuZXclMjBJbWFnZSUyOCUyOSUzQmltZzMuc3JjJTNEJTIycmVzJTNBLy9XZWJRUTIuZXhlLyUyMzIzL0xPR08uUE5HJTIyJTNCaW1nMy5vbmxvYWQlM0RmdW5jdGlvbiUyOCUyOSU3QnNob3dJdCUyOCUyMl9mdWtfd18yJTIyJTI5JTNCJTdEJTNCdmFyJTIwaW1nNCUzRG5ldyUyMEltYWdlJTI4JTI5JTNCaW1nNC5zcmMlM0QlMjJyZXMlM0EvL1dlYlFRMi5leGUvbG9nby5wbmclMjIlM0JpbWc0Lm9ubG9hZCUzRGZ1bmN0aW9uJTI4JTI5JTdCc2hvd0l0JTI4JTIyX2Z1a193XzIlMjIlMjklM0IlN0QlM0J0cnklN0JpZiUyOHdpbmRvdy5leHRlcm5hbCUyNiUyNndpbmRvdy5leHRlcm5hbC50d0dldFJ1blBhdGglMjklN0J2YXIlMjB0JTNEZXh0ZXJuYWwudHdHZXRSdW5QYXRoJTI4JTI5JTNCaWYlMjh0JTI2JTI2dC50b0xvd2VyQ2FzZSUyOCUyOS5pbmRleE9mJTI4JTIyd2VicXElMjIlMjklM0UtMSUyOSU3QnNob3dJdCUyOCUyMl9mdWtfd18yJTIyJTI5JTNCJTdEJTdEJTdEY2F0Y2glMjhlJTI5JTdCJTdEJTNCdHJ5JTdCaWYlMjh3aW5kb3cuZXh0ZXJuYWwlMjklN0IlN0QlN0RjYXRjaCUyOGUlMjklN0JpZiUyOGUuZGVzY3JpcHRpb24ubGVuZ3RoJTNEJTNENiUyOSU3QnNob3dJdCUyOCUyMl9mdWtfd18yJTIyJTI5JTNCJTdEJTdEJTNCdHJ5JTdCdmFyJTIwdWElM0RuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlJTI4JTI5JTNCaWYlMjh1YS5pbmRleE9mJTI4JTIybXNpZSUyMiUyOSUzRS0xJTI5JTdCaWYlMjh0eXBlb2YlMjh3aW5kb3cuZXh0ZXJuYWwuU2hvd0Jyb3dzZXJVSSUyOSUzRCUzRCUyMnVuZGVmaW5lZCUyMiUyOSU3QmlmJTI4dWEuaW5kZXhPZiUyOCUyMnRlbmNlbnQlMjIlMjklM0UtMSU3QyU3Q3VhLmluZGV4T2YlMjglMjJtYXh0aG9uJTIyJTI5JTNFLTElN0MlN0N1YS5pbmRleE9mJTI4JTIyU2FhWWFhJTIyJTI5JTNFLTElN0MlN0N1YS5tYXRjaCUyOC9zZSUyMCUyOCU1QiU1Q2QuJTVEKyUyOS8lMjklMjklN0IlN0RlbHNlJTdCc2hvd0l0JTI4JTIyX2Z1a193XzIlMjIlMjklM0IlN0QlN0QlN0QlN0RjYXRjaCUyOGUlMjklN0IlN0QlM0J0cnklN0J2YXIlMjB1YSUzRG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UlMjglMjklM0JpZiUyOHVhLmluZGV4T2YlMjglMjJtc2llJTIyJTI5JTNFLTElMjklN0JpZiUyOHR5cGVvZiUyOHdpbmRvdy5leHRlcm5hbC5JbXBvcnRFeHBvcnRGYXZvcml0ZXMlMjklM0QlM0QlMjJ1bmRlZmluZWQlMjIlMjklN0JpZiUyOHVhLmluZGV4T2YlMjglMjJ0ZW5jZW50JTIyJTI5JTNFLTElN0MlN0N1YS5pbmRleE9mJTI4JTIybWF4dGhvbiUyMiUyOSUzRS0xJTdDJTdDdWEuaW5kZXhPZiUyOCUyMlNhYVlhYSUyMiUyOSUzRS0xJTdDJTdDdWEubWF0Y2glMjgvJTNCJTIwc2UlMjAlMjglNUIlNUNkLiU1RCslMjkvJTI5JTI5JTdCJTdEZWxzZSU3QnNob3dJdCUyOCUyMl9mdWtfd18yJTIyJTI5JTNCJTdEJTdEJTdEJTdEY2F0Y2glMjhlJTI5JTdCJTdEJTNC")))()};this.LogReport=function(){var a={},c="";a.log=b.console.getReport([0,1,2]);a.uin=alloy.portal.getUin()||"";a.skey=alloy.portal.getSkey()||"";a.ua=navigator.userAgent.toLowerCase();a.pf=navigator.platform.toLowerCase();if(c=alloy.config.uacResult)a.uac=c;c=b.json.stringify(a);alloy.rpcService.sendReport(c)};m=function(){};m.prototype={timer:null,count:0,config:{interval:1E4,maxBytes:1024,reportUrl:{isd:"http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7723&flag2=2&flag3=1",qstatic:"http://tj.qstatic.com/getlog?"},reportUrlLength:{isd:[0,{}],qstatic:[0,{}]},reportHeaderLength:{isd:{_total:80},qstatic:{p2:13,qqweb2:7,webtop:7,im2:4,client:7,webtop:7,app2:5,m:2,_total:29}},countCombineLength:{qstatic:{m:4}}},queue:{isd:[],qstatic:{p2:[],qqweb2:[],client:[],webtop:[],im2:[],app2:[],m:{},webtop:[]}},add:function(a,b,c){c=String(c);this.checkUrlLength(a,b,c);b?b=="m"?this.queue[a][b][c]?this.queue[a][b][c]++:this.queue[a][b][c]=1:this.queue[a][b].push(c):this.queue[a].push(c);this.StartTimer()},checkUrlLength:function(a,b,c){var d=this.config,e=d.reportUrlLength[a],h=d.reportHeaderLength[a];e[0]=e[0]||h._total;b&&(e[0]+=e[1][b]?0:h[b]+1,e[1][b]=!0);d.countCombineLength[a]&&d.countCombineLength[a][b]?this.queue[a][b][c]||(e[0]+=d.countCombineLength[a][b]):e[0]+=c.length+1;e[0]>d.maxBytes&&(b={},b[a]=[e[0],{}],this.report(b),d.reportUrlLength[a]=[0,{}])},forEach:function(a,b){for(var c in a)a.hasOwnProperty(c)&&b(c,a)},report:function(a){var b=this,a=a||this.config.reportUrlLength,c="",d=[];b.forEach(b.queue,function(e){a[e]&&a[e][0]&&(e=="isd"?(c=b.config.reportUrl.isd+"&flag4="+(alloy.portal.getUin()||0)+"&"+b.queue[e].join("&"),x(c),b.queue[e]=[],a[e]=[0,{}]):e=="qstatic"&&(b.forEach(b.queue[e],function(a){if(a=="m"){var c=[];b.forEach(b.queue[e][a],function(a,b){c.push(b[a]+"$"+a)});c.length&&d.push(a+"="+c.join("|"));b.queue[e][a]={}}else{var h=b.queue[e][a].join("|");h&&(a=="p2"?d.push(a+"="+Math.floor((new Date).getTime()/1E3)+"|"+h):d.push(a+"="+h),b.queue[e][a]=[])}}),d=b.config.reportUrl.qstatic+d.join("&"),x(d),a[e]=[0,{}]))})},StartTimer:function(){var a=this;if(!this.timer)this.timer=setTimeout(function(){a.report();a.timer=null;a.StartTimer()},this.config.interval)}};var o=new m;this.report=function(){o.report()};d.speedTest=new function(){var a=[];this.sRTS=this.setReportTimeStamp=function(b,c,d,e){a[b]||(a[b]={});a[b][c]=d.getTime();e==!0&&this.report([b])};this.gRTS=this.getReportTimeStamp=function(b,c){return a[b]?a[b][c]:null};this.report=function(b){for(var c="http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7723&flag2=2&flag3=1&flag4="+alloy.portal.getUin()||0,d=0;d<b.length;d++){var e=b[d];a[e].end&&a[e].start&&(c+="&"+e+"="+(a[e].end-a[e].start),o.add("isd",null,e+"="+(a[e].end-a[e].start)))}}};this.report2h=function(){var a=function(){return((1+Math.random())*65536|0).toString(16).substring(1)},b=a()+a()+a()+a();return function(a,c,d,e){var d=d||"0",e=e||"0",h=alloy.portal.getUin()||b,a=[Math.floor((new Date).getTime()/1E3),a,c,h,b,d,e].join("$");o.add("qstatic","p2",a)}}();this.report2c=function(a){o.add("qstatic","client",alloy.portal.getUin()+"$"+a)};this.report2m=this.report2monitor=function(a){o.add("qstatic","m",a)};this.report2qqweb=function(a){var b=alloy.portal.getUin();b||(b="0");o.add("qstatic","qqweb2",b+"$"+a.split("|").join("$"));window.webTop&&o.add("qstatic","webtop",b+"$"+a.split("|").join("$"))};this.report2app=function(a){var b=alloy.portal.getUin();b||(b="0");o.add("qstatic","app2",b+"$"+a.split("|").join("$"))};this.report2im=function(a){var b=alloy.portal.getUin();b||(b="0");o.add("qstatic","im2",b+"$"+a.split("|").join("$"))};this.getTargetLessFormEl=function(a,b){var c={method:b.method||"GET",enctype:b.enctype||"",data:b.data||{}},d=document.createElement("form");d.style.visibility="hidden";d.method=c.method;d.action=a+"?t="+(new Date).getTime();d.enctype=c.enctype;if(Object.prototype.toString.call(c.data).indexOf("String")>-1){var e=document.createElement("input");e.type="text";e.name=c.data;d.appendChild(e)}else for(var h in c.data)e=document.createElement("input"),e.type="text",e.name=h,e.value=c.data[h],d.appendChild(e);return d};this.setTimingRpt=function(a,b,c,d){var e,h=window.webkitPerformance?window.webkitPerformance:window.msPerformance,g=["navigationStart","unloadEventStart","unloadEventEnd","redirectStart","redirectEnd","fetchStart","domainLookupStart","domainLookupEnd","connectStart","connectEnd","requestStart","responseStart","responseEnd","domLoading","domInteractive","domContentLoadedEventStart","domContentLoadedEventEnd","domComplete","loadEventStart","loadEventEnd"],o=[];if((h=h?h:window.performance)&&(e=h.timing)){e.domContentLoadedEventStart?d&&(c=d):e.domContentLoadedStart?(g.splice(15,2,"domContentLoadedStart","domContentLoadedEnd"),d&&(c=d)):g.splice(15,2,"domContentLoaded","domContentLoaded");for(var d=e[g[0]],m=1,H=g.length;m<H;m++)h=(h=e[g[m]])?h-d:0,h>0&&o.push(m+"="+h);a="http://isdspeed.qq.com/cgi-bin/r.cgi?flag1="+a+"&flag2="+b+"&flag3="+c+"&"+o.join("&");x(a)}};this.reportAppRun=function(a){alloy.portal.getLoginLevel()>alloy.CONST.LOGIN_LEVEL_NONE&&~~a&&alloy.rpcService.reportAppRun(a)};this.reportAppShare=function(a){alloy.portal.getLoginLevel()>alloy.CONST.LOGIN_LEVEL_NONE&&~~a.appId&&alloy.rpcService.reportAppShare(a)};var h=function(){alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL+"cgi/qqweb/time.do",{context:this,onSuccess:function(a){if(l===1)if(a.retcode===0){u=Math.ceil(a.millisTime-(+new Date+q)/2);l=isNaN(u)||isNaN(+new Date(+new Date+u))?u=0:2;for(;p.length;)p.shift()();e.notifyObservers(d.svrDate,"timeReady")}else++v>2?(e.notifyObservers(d.svrDate,"timeError"),l=0):setTimeout(h,1E3)},onError:function(){++v>2?(e.notifyObservers(d.svrDate,"timeError"),l=0):setTimeout(h,1E3)},onTimeout:function(){++v>2?(e.notifyObservers(d.svrDate,"timeError"),l=0):setTimeout(h,1E3)}})};d.svrDate=function(){return new Date(+new Date+u)};d.svrDate.getInitState=function(){return l};d.svrDate.init=function(a){a&&a.callback&&p.push(a.callback);l!=1&&(v=0,q=+new Date,l=1,h())};d.getLocaleTime=function(a,c){var c=c||!1,d=new Date;!b.isUndefined(a)&&a!=""&&(c&&b.isNumber(a)&&(a*=1E3),d=new Date(a));var e=d.getFullYear(),h=d.getMonth()+1,d=d.getDate();return e.toString()+"-"+(h>9?h:"0"+h)+"-"+(d>9?d:"0"+d)+" "+(new Date(a)).toLocaleTimeString()}});Jet().$package("qqweb.util.group",function(b){var d=b.http,c=!1;this.loadGroupClass=function(b,g){if(c)return typeof b!="undefined"&&b(g),!0;d.loadScript(alloy.CONST.CDN_URL_0+"js/qqweb.util.group.js?20110316",{onSuccess:function(){c=!0;typeof b!="undefined"&&b(g)}})};this.isLoadData=function(){return c}});
Jet().$package("qqweb.util.loclist",function(b){var d=b.http,c=!1;this.loadData=function(b,g){if(c)return typeof b!="undefined"&&b(g),!0;d.loadScript(alloy.CONST.CDN_URL_0+"js/qqweb.util.loclist.js?20110316",{onSuccess:function(){c=!0;typeof b!="undefined"&&b(g)}})};this.isDataLoaded=function(){return c}});
Jx().$package("alloy.util.stat",function(b){function d(b){return(String(b).match(/(\d)+/g)||[]).join(".")}this.report=function(){var c=alloy.util.report2qqweb,e;e=b.browser.name;var g=b.browser.version,j=navigator.userAgent,l;(l=j.match(/Maxthon[\s|\/]([\d.]*)/))?(e="maxthon",g=l[1]?d(l[1]):0):j.match(/TheWorld/)?(e="theworld",g=0):(l=j.match(/SE\s([\d.]*)/))?(e="sougou",g=l[1]?d(l[1]):0):(l=j.match(/QQBrowser\/([\d.]*)/))?(e="qq",g=l[1]?d(l[1]):0):(l=j.match(/TencentTraveler\s([\d.]*)/))?(e="tt",g=l[1]?d(l[1]):0):j.match(/360SE/)&&(e="360",g=0);e={name:e,version:g};g={name:b.platform.name,version:b.platform.version};j={width:screen.width,height:screen.height};e=e.name+"|"+e.version;g=g.name+"|"+g.version;j=j.width+","+j.height;l=b.GetSwfVer();l=String(l);c("monitor|browser|"+e);c("monitor|os|"+g);c("monitor|resolution|"+j);c("monitor|flashversion|"+l)}});
Jx().$package("alloy.config",function(b){var d=this,c=b.event,e=b.dom,c=b.event,g=b.string,j=!1,l,q,u,p={},v=[],x={50:5,6:5},m={18:2,20:2},o=[50,2,17,16,6,48,49,26,3401,2527,3693,10,13,8992,3402,2534,4,64,18,20,2528,45,2526,56,15,3148,21,7,5,2250,2535,4494,3070,3988,8058,3147],h=[{id:0,t:"dir",n:"\u684c\u97621",items:[{t:"app",id:48},{t:"app",id:49},{t:"app",id:26},{t:"dir",id:1E3,pid:0,n:"\u6e38\u620f",items:[{t:"app",id:4494},{t:"app",id:3070}]}]},{id:1,t:"dir",n:"\u684c\u97622",items:[{t:"app",id:3401},{t:"app",id:2527},{t:"app",id:3693},{t:"app",id:10},{t:"app",id:13}]},{id:2,t:"dir",n:"\u684c\u97623",items:[{t:"app",id:8992},{t:"app",id:3402},{t:"app",id:2534},{t:"app",id:4},{t:"app",id:6},{t:"app",id:64},{t:"app",id:18},{t:"app",id:20},{t:"dir",id:1001,pid:2,n:"\u5a31\u4e50",items:[{t:"app",id:3988},{t:"app",id:8058},{t:"app",id:3147}]}]},{id:3,t:"dir",n:"\u684c\u97624",items:[{t:"app",id:2528},{t:"app",id:45},{t:"app",id:2526},{t:"app",id:56},{t:"app",id:15},{t:"app",id:3148}]},{id:4,t:"dir",n:"\u684c\u97625",items:[{t:"app",id:21},{t:"app",id:7},{t:"app",id:5},{t:"app",id:2250},{t:"app",id:2535}]},{id:5,t:"dir",n:"dock",items:[{t:"app",id:50},{t:"app",id:16},{t:"app",id:17},{t:"app",id:2}]}];b.platform.iPad&&(m={18:2,20:2},o=[50,2,17,16,6,3141,3575,3694,3401,2527,3693,10,8992,18,20,2528,45,56,15,21,7,2250,3988,8058],h=[{id:0,t:"dir",n:"\u684c\u97621",items:[{t:"app",id:3575},{t:"dir",id:1E3,pid:0,n:"\u751f\u6d3b",items:[{t:"app",id:3141},{t:"app",id:3694}]}]},{id:1,t:"dir",n:"\u684c\u97622",items:[{t:"app",id:3401},{t:"app",id:2527},{t:"app",id:3693},{t:"app",id:10}]},{id:2,t:"dir",n:"\u684c\u97623",items:[{t:"app",id:8992},{t:"app",id:18},{t:"app",id:20},{t:"app",id:6},{t:"dir",id:1001,pid:2,n:"\u5a31\u4e50",items:[{t:"app",id:3988},{t:"app",id:8058}]}]},{id:3,t:"dir",n:"\u684c\u97624",items:[{t:"app",id:2528},{t:"app",id:45},{t:"app",id:56},{t:"app",id:15}]},{id:4,t:"dir",n:"\u684c\u97625",items:[{t:"app",id:21},{t:"app",id:7},{t:"app",id:2250}]},{id:5,t:"dir",n:"dock",items:[{t:"app",id:50},{t:"app",id:16},{t:"app",id:17},{t:"app",id:2}]}]);window.webTop&&(o=[50,2,17,16,6,48,49,26,3401,3693,10,13,8992,3402,2534,64,18,20,2528,45,2526,56,15,3148,21,7,5,2250,2535,4494,3070,3988,8058,3147],h=[{id:0,t:"dir",n:"\u684c\u97621",items:[{t:"app",id:48},{t:"app",id:49},{t:"app",id:26},{t:"dir",id:1E3,pid:0,n:"\u6e38\u620f",items:[{t:"app",id:4494},{t:"app",id:3070}]}]},{id:1,t:"dir",n:"\u684c\u97622",items:[{t:"app",id:3401},{t:"app",id:3693},{t:"app",id:10},{t:"app",id:13}]},{id:2,t:"dir",n:"\u684c\u97623",items:[{t:"app",id:8992},{t:"app",id:3402},{t:"app",id:2534},{t:"app",id:6},{t:"app",id:64},{t:"app",id:18},{t:"app",id:20},{t:"dir",id:1001,pid:2,n:"\u5a31\u4e50",items:[{t:"app",id:3988},{t:"app",id:8058},{t:"app",id:3147}]}]},{id:3,t:"dir",n:"\u684c\u97624",items:[{t:"app",id:2528},{t:"app",id:45},{t:"app",id:2526},{t:"app",id:56},{t:"app",id:15},{t:"app",id:3148}]},{id:4,t:"dir",n:"\u684c\u97625",items:[{t:"app",id:21},{t:"app",id:7},{t:"app",id:5},{t:"app",id:2250},{t:"app",id:2535}]},{id:5,t:"dir",n:"dock",items:[{t:"app",id:50},{t:"app",id:16},{t:"app",id:17},{t:"app",id:2}]}]);l={id:"theme_blue_glow"};window.webTop&&(l={id:"theme_blue_glow"});q={id:"",mode:"repeat",url:""};u={};var a=["app_id","app_lang","app_nonce","app_openid","app_openkey","app_ts","sig"];this.configList={theme:b.clone(l),wallpaper:b.clone(q),wallpaperList:[].concat(),appearance:b.clone(u),dockLoca:"left",navTop:1,defaultScreen:3,desktopList:h.concat(),hasRecentFolder:!1,defaultSetupAppList:o,setupAppList:o.concat()};this.onSetConfig=function(){};this.onEQQConfigGetSuc=function(a){b.profile("getEQQCustomSuccess start!");this.uacResult=a=a.result?a.result:[];for(var c in a){var d=a;if(d.chatboxMode)this.configList.chatboxMode="free";if(d.isNotNeedCtrlKey)this.configList.isNotNeedCtrlKey=d.isNotNeedCtrlKey;if(d.fontFormat)this.configList.fontFormat=d.fontFormat}};this.onConfigGetSuc=function(a){b.profile("getCustomSuccess start!");alloy.portal.speedTest.sRTS(4,"end",new Date,!0);var f=a.result?a.result:[];this.uacResult=f;var e=0;a.retcode==20554?j=d.isNewUser=!0:d.isNewUser=!1;for(var h in f){if(h=="0"){a=f["0"];if(a.theme&&a.theme!="")this.configList.theme.id=a.theme;if(a.wallpaper&&a.wallpaper!=""&&a.wallpaper.id!="")this.configList.wallpaper=a.wallpaper;if(a.wallpaperList&&a.wallpaperList!="")this.configList.wallpaperList=a.wallpaperList;if(a.appearance&&a.appearance!="")this.configList.appearance.id=a.appearance;this.configList.runStatus=a.runWidgets?a.runWidgets:"";if(a.dockLoca)this.configList.dockLoca=a.dockLoca;if(a.navTop!==null)this.configList.navTop=a.navTop;if(a.defaultScreen)this.configList.defaultScreen=a.defaultScreen;if(a.isShowTip)this.configList.isShowTip=a.isShowTip;if(a.notifySetting)this.configList.notifySetting=a.notifySetting;if(a.msgBubblePos)this.configList.msgBubblePos=a.msgBubblePos;if(a.isNoContactNotify)this.configList.isNoContactNotify=a.isNoContactNotify;if(a.hasRecentFolder)this.configList.hasRecentFolder=a.hasRecentFolder;if(a.desktopIconStyle)this.configList.desktopIconStyle=a.desktopIconStyle;if(a.setupAppList){var g=a.setupAppList;if(b.isArray(g))this.configList.setupAppList=g.length==0?[]:g;else{if(b.isObject(g)){var k=[],n;for(e in g)(n=parseInt(g[e]))&&k.push(n);this.configList.setupAppList=k}else this.configList.setupAppList=[];j=!0;C();alloy.util.report2m(151400)}j=!0}else j=!0,C();if(a.diskList)this.configList.diskList=a.diskList;if(a.defaultDisk)this.configList.defaultDisk=a.defaultDisk;b.out("isSetupAppListLoaded: "+j)}if(h=="50"){a=f["50"];if(a.chatboxMode)this.configList.chatboxMode="free";if(a.isNotNeedCtrlKey)this.configList.isNotNeedCtrlKey=a.isNotNeedCtrlKey;if(a.fontFormat)this.configList.fontFormat=a.fontFormat;this.configList.useBigHead=a.useBigHead!=null?a.useBigHead:7}}c.notifyObservers(alloy.portal,"SimpleUACReady",{uacLoaded:0});b.profile("getUACCustomSuccess finish!");qqweb.util.report2h("get_custom","end","ok")};var f=function(){w()},n=function(){j=!1},s=1,w=function(){for(var a=d.getSetupAppList(),f={0:["notifications"]},e=0;e<a.length;e++)f[a[e]]=["notifications"];qqweb.rpcService.sendGetConfig({action:"mget",context:this,data:{r:{appid:f}},onSuccess:function(a){s=2;if(a.retcode==0||a.retcode==20554){if(a.retcode==20554){a.result={};for(var f=d.getSetupAppList(),e=0;e<f.length;e++)a.result[f[e]]={notifications:null}}d.myAppConfigList=d.myAppConfigList||{};a.result[0]&&b.isNumber(a.result[0].notifications)?d.setGlobalNotifications(a.result[0].notifications):d.setGlobalNotifications(alloy.notifier&&alloy.notifier.ENABLE_FLAGS.ENABLE_ALL);for(var h in a.result)h!=0&&(b.isNumber(a.result[h].notifications)?d.setNotifications(h,a.result[0].notifications):d.setNotifications(h,null));s=0}c.notifyObservers(alloy.system,"notifySettingReady")}})};this.getGlobalNotifications=function(){return s==0?d.myAppConfigList[0].notifications:0};this.setGlobalNotifications=function(a){0 in d.myAppConfigList||(d.myAppConfigList[0]={});d.myAppConfigList[0].notifications=a};this.getMergedNotifications=function(a){if(s!=0)return 0;a=d.getNotifications(a);if(a===null)a=alloy.notifier.ENABLE_FLAGS.ENABLE_ALL;return a&d.getGlobalNotifications()};this.getNotifications=function(a){return(a=d.myAppConfigList[a])?a.notifications:null};this.setNotifications=function(a,c){b.isNumber(c)||(c=null);a in d.myAppConfigList||(d.myAppConfigList[a]={});d.myAppConfigList[a].notifications=c};this.getNotificationsStatus=function(){return s};var C=d.sendSetSetupAppList=function(){if(alloy.portal.getLoginLevel()!=1&&j){var a={onSuccess:function(){},context:d,data:{retype:1,r:{appid:0,value:{setupAppList:d.getSetupAppList()}}}};alloy.rpcService.sendSetConfig(a)}};this.getDesktopList=function(){return this.configList.desktopList};this.setDesktopList=function(a){this.configList.desktopList=a};this.getDefaultDesktopList=function(){return h};this.getMustInstallAppList=function(){return x};this.setAppListQueue=function(a){var b=[],c;for(c in a)b.push(parseInt(a[c]));this.configList.setupAppList=b;C()};this.isInSetupAppList=function(a){return b.array.indexOf(this.getSetupAppList(),a)==-1?!1:!0};this.sendGetAppInfo=function(a,c){var f=function(a){p[a]||(p[a]=0);return++p[a]>1};a.vfwebqq=alloy.portal.getVfWebQQ();alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL+"keycgi/qqweb/market/getappinfo.do",{context:d,method:"POST",data:{appattrib:b.json.stringify(a),vfwebqq:alloy.portal.getVfWebQQ()},arguments:a,onSuccess:function(d){d.retcode===0?(d=d.result.resultData,d.folderId=alloy.desktopManager.getCurrentDesktopIndex(),c(d)):(f("appInfo")||setTimeout(function(){sendGetAppInfo(a)},3E3),b.out("\u5e94\u7528\u4ecb\u7ecd\u62c9\u53d6\u5931\u8d25"+d.errmsg))},onError:function(){f("appInfo")||setTimeout(function(){sendGetAppInfo(a)},3E3);b.out("\u5e94\u7528\u62c9\u53d6\u5931\u8d25")}})};this.addSetupApp=function(a){d.sendGetAppInfo({appid:a,loadMethod:0},d.add2SetupAppList)};this.add2SetupAppList=function(a){if(a.flag==4&&alloy.portal.getPortalSelf("vipInfo")<=0)return alloy.layout.confirm('                <div style="margin-top:25px;margin-left:50px;">                <img style="float:left;" src="'+qqweb.CONST.CDN_URL_0+'style/images/yellow_warning.png" alt="\u60a8\u8fd8\u672a\u5f00\u901a\u4f1a\u5458"/>                <div style="width:180px;height:60px; font-size:14px;float:left;margin-left:5px;">\u5bf9\u4e0d\u8d77\uff01\u60a8\u8fd8\u4e0d\u662fQQ\u4f1a\u5458\uff0c\u4e0d\u80fd\u4f18\u5148\u4f53\u9a8c\u4f1a\u5458\u4e13\u5c5e\u5e94\u7528</div >                </div>                ',function(){window.open("http://pay.qq.com/qqvip/index.shtml?aid=vip.client.webqq.addapp.kaitong")},{okButtonDecorator:{background:"url("+qqweb.CONST.CDN_URL_0+"style/images/vip_open_button.png) -1px",width:"83px",textIndent:"-999px"},height:180,autoClose:!0}),!1;if(d.getSetupAppList().length>=200)return qqweb.layout.alert("\u5e94\u7528\u6dfb\u52a0\u91cf\u6700\u591a\u4e3a200\u4e2a,\u8bf7\u5220\u51cf\u90e8\u5206\u5e94\u7528\u540e\u518d\u6dfb\u52a0\u3002"),!1;else if(!d.isInSetupAppList(a.id)&&!e.id("appAlert_category_select_"+a.id))return b.profile("add2SetupAppList"),qqweb.appconfig.addAppConfig(a),d.getSetupAppList().unshift(a.id),C(),c.notifyObservers(d,"AddSetupAppList",a),a.id<1E5&&alloy.util.report2app("appbar|menu|addapp|"+a.id),!0};this.setDeleteAppList=function(a){v.push(a)};this.getDeleteAppList=function(){return v};this.removeSetupAppList=function(a,f,e){b.profile("removeSetupAppList");if(a.cannotUninstall)return alloy.layout.alert("\u62b1\u6b49\uff0c\u6b64\u5e94\u7528\u3010"+a.appName+"\u3011\u4e0d\u80fd\u5220\u9664\uff01"),!1;alloy.appconfig.removeAppConfig(a);this.removeFromRunStatusList(a.id,!0);b.array.remove(this.getSetupAppList(),parseInt(a.id));f!==!1&&(C(),a.id<1E5&&alloy.util.report2app("appbar|menu|delapp|"+a.id));e||c.notifyObservers(d,"RemoveSetupAppList",a)};this.getSetupAppList=function(){return this.configList.setupAppList};this.getDefaultSetupAppList=function(){return this.configList.defaultSetupAppList};this.isSetupAppListLoaded=function(){return j};this.offlineSetupAppList=function(){j=!1;this.configList.setupAppList=o.concat()};this.removeFromRunStatusList=function(a,c){if(this.configList.runStatus){var f=this.configList.runStatus,e=!1;b.isArray(a)||(a=[a]);for(var h in f){var g=Number(h);b.array.indexOf(this.getSetupAppList(),g)==-1&&(f[h]=null,delete f[h],e=!0)}for(var n in a)h=a[n],f[h]&&(f[h]=null,delete f[h],e=!0);e&&!c&&(f={data:{retype:1,r:{appid:0,value:{runWidgets:d.getRunStatus()}}}},alloy.rpcService.sendSetConfig(f))}};this.restoreConfig=function(a){var b=!1,f={};if(a.appConfig)b=!0,f.setupAppList=o,c.notifyObservers(d,"RestoreAppList");if(a.theme)b=!0,f.theme=l.id,f.wallpaper=q,f.appearance=u;if(a.desktopSetting)b=!0,f.dockLoca="left",f.navTop=1,f.defaultScreen=3;b&&alloy.rpcService.sendSetConfig({data:{retype:1,r:{appid:0,value:f}}})};this.getTheme=function(){return this.configList.theme};this.setTheme=function(a){b.profile("setTheme");if(!(alloy.portal.getLoginLevel()<2)&&a){var c={};c.data={retype:1,r:{appid:0,value:{theme:a}}};alloy.rpcService.sendSetConfig(c);this.configList.theme.id=a}};this.getWallpaper=function(){return this.configList.wallpaper};this.setWallpaper=function(a){b.profile("setWallpaper");if(!(alloy.portal.getLoginLevel()<2)&&a){var c={};c.data={retype:1,r:{appid:0,value:{wallpaper:a}}};alloy.rpcService.sendSetConfig(c);this.configList.wallpaper=a}};this.getWallpaperList=function(){return this.configList.wallpaperList};this.getRunStatus=function(){return this.configList.runStatus};this.getDefaultRunWidget=function(){return m};this.addWallpaper=function(a){b.array.indexOf(this.configList.wallpaperList,a.id)==-1&&this.configList.wallpaperList.push(a.fileId)};this.removeWallpaper=function(a){b.array.remove(this.getWallpaperList(),a.fileId)};this.getAppearance=function(){return this.configList.appearance};this.setAppearance=function(a){b.profile("setAppearance");if(!(alloy.portal.getLoginLevel()<2)&&a){var c={};c.data={retype:1,r:{appid:0,value:{appearance:a}}};alloy.rpcService.sendSetConfig(c);this.configList.appearance.id=a}};this.setCustomTheme=function(a){b.profile("setCustomTheme");if(!(alloy.portal.getLoginLevel()<2)&&a.wallpaper){var c=a.skin,d=a.wallpaper,a={};a.data={retype:1,r:{appid:0,value:{appearance:c,wallpaper:d}}};alloy.rpcService.sendSetConfig(a);this.configList.appearance.id=c;this.configList.wallpaper=d}};this.isDeveloper=function(){return!!qqweb.config.uacResult["0"].isDeveloper};this.setThemeAndCustomTheme=function(a,b,c){if(!(alloy.portal.getLoginLevel()<2)){c=c||"";this.configList.appearance.id=c;this.configList.wallpaper=b;this.configList.theme.id=a;var d={};if(a)d.theme=a;if(b)d.appearance=c,d.wallpaper=b;a={};a.data={retype:1,r:{appid:0,value:d}};alloy.rpcService.sendSetConfig(a)}};this.getDiskList=function(){return this.configList.diskList};this.getDefaultDisk=function(){return this.configList.defaultDisk};this.init=function(){alloy.util.report2h("get_custom","start");c.addObserver(alloy.system,"UACReady",f);c.addObserver(alloy.appconfig,"GetAppConfigError",n);var a={appid:{0:["theme","wallpaper","wallpaperList","appearance","setupAppList","isShowTip","runWidgets","msgBubblePos","notifySetting","isDeveloper","dockLoca","defaultScreen","navTop","hasRecentFolder","defaultDisk","diskList","desktopIconStyle"],50:["chatboxMode","isNotNeedCtrlKey","fontFormat","useBigHead"]}};b.profile("getCustom");typeof progress=="function"&&progress("get_uac start");var e=0,h=function(){g.data.r=a;qqweb.rpcService.sendGetConfig(g);e++},g={onSuccess:qqweb.config.onConfigGetSuc,action:"mget",context:this,onError:function(){typeof progress=="function"&&progress("get_uac error",0);alloy.util.report2qqweb("config|uac|error");e==0?h():timeoutConfirm("\u81ea\u5b9a\u4e49\u4fe1\u606f\u83b7\u53d6\u51fa\u9519,\u662f\u5426\u5237\u65b0\u91cd\u8bd5\uff1f\n\u70b9\u53d6\u6d88\u4f7f\u7528\u9ed8\u8ba4\u914d\u7f6e\u3002")||c.notifyObservers(alloy.portal,"SimpleUACReady",{uacLoaded:1})},onTimeout:function(){alloy.util.report2qqweb("config|uac|timeout");typeof progress=="function"&&progress("get_uac timeout",0);e==0?h():timeoutConfirm("\u81ea\u5b9a\u4e49\u4fe1\u606f\u83b7\u53d6\u8d85\u65f6,\u662f\u5426\u5237\u65b0\u91cd\u8bd5\uff1f\n\u70b9\u53d6\u6d88\u4f7f\u7528\u9ed8\u8ba4\u914d\u7f6e\u3002")||c.notifyObservers(alloy.portal,"SimpleUACReady",{uacLoaded:2})},data:{r:a}};c.notifyObservers(d,"BeforeGetUAC");qqweb.rpcService.sendGetConfig(g)};d.__eqqid=50;this.sendsetAppNotify=function(a,c){b.profile("sendsetAppNotify");alloy.portal.getLoginLevel()!=1&&j&&alloy.rpcService.sendSetConfig({onSuccess:function(){},context:d,data:{retype:1,r:{appid:a,value:{notifications:c}}}})};this.requestGrant=function(f){var e=!0;alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL+"cgi/qqweb/app/loadappnew.do",{context:d,data:{r:b.json.stringify({appid:f.gaid?0:f.appId,id:f.gaid,loginParam:f.loginParam||""})},method:"POST",arguments:f,onSuccess:function(d){if(0!==d.retcode)b.isFunction(f.onSuccess)&&f.onSuccess({auth:!1});else{e=!1;var h=d.result,d=d.arguments,n=alloy.portal.getAllConfig(d.appId);n.exinfo.isAuth=1;var k=g.parseURL(n.appUrl);if(null!==k){var o={};k.query&&(o=g.mapQuery("?"+k.query));for(var s=0,w=a.length;s<w;s++){var m=a[s];m in h&&(o[m]=h[m])}k.query=g.toQueryString(o);n.selfConfig.appUrl=g.buildURL(k)}alloy.portal.cacheOpenkey({appId:d.appId,gaid:h.app_id,openId:h.app_openid,openKey:h.app_openkey});(f.authType||0)!=1&&alloy.portal.runApp(n.id);var d=["app_id","app_nonce","app_lang","app_userip","app_ts","sig"],j;for(j in d)b.isUndefined(h[d[j]]);b.isFunction(f.onSuccess)&&f.onSuccess({auth:!0,param:h});j=alloy.system.getApp(f.appId);c.notifyObservers(j,"openId",{openId:h.app_openid})}},onComplete:function(){e&&alloy.layout.alert("\u6388\u6743\u4fe1\u606f\u67e5\u8be2\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5\uff01");e=null}})};this.renewalGrant=function(a){var b=alloy.portal.getAllConfig(a.appId);alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL+"api/system/redoauth",{context:d,data:{appid:b.gaid,gaid:b.gaid,app_openkey:a.openKey,app_openid:a.openId},method:"GET",arguments:a,onSuccess:function(a){0===a.retcode&&alloy.portal.cacheOpenkey({renewal:!0,appId:a.arguments.appId})}})};this.reRequestGrant=function(a){alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL+"cgi/qqweb/app/loadappnew.do",{context:d,data:{r:b.json.stringify(appid>2E8?{appid:0,id:a.appId}:{appid:a.appId})},method:"POST",arguments:a,onSuccess:function(a){var c=a.result,d=a.arguments;0===a.retcode&&alloy.portal.cacheOpenkey({appId:d.appId,gaid:c.app_id,openId:c.app_openid,openKey:c.app_openkey});b.isFunction(d.onSuccess)&&d.onSuccess(a)}})};this.setPortalConfig=function(a,b){alloy.config.configList[a]=b;var c={retype:1,r:{appid:0}};c.r.value={};c.r.value[a]=b;alloy.rpcService.sendSetConfig({onSuccess:function(){},context:d,data:c})}});
Jx().$package("alloy.fileSystem",function(b){var d=this,c=b.event,c=b.event,e=b.string,g=this.FILE_TYPE={FOLDER:"dir",FILE:"file",APP:"app",BUDDY:"uin",GROUP:"gid"},j={},l={},q=this.MAX_FOLDER_AMOUNT=200,u=!1,p=!1,v,x=!1,m=!1,o=0,h=function(a){return a===null||typeof a==="undefined"},a=function(){return m||alloy.portal.getLoginLevel()==alloy.CONST.LOGIN_LEVEL_NONE},f=function(){var a=alloy.config.getDesktopList()||[];v={t:g.FOLDER,id:-1,n:"root",items:a}},n=this.getRootFolder=function(){v||f();return v},s=function(a,b,c){if(a.items)for(var d in a.items){var f=a.items[d];if(b(f,a.items)===!1)break;f.t==g.FOLDER&&c&&s(f,b,!0)}},w=function(a){a=a||n();s(a,function(a){j[a.t]||(j[a.t]={});j[a.t][a.id]||l[a.t]++;if(a.t==alloy.fileSystem.FILE_TYPE.FOLDER&&!a.c)a.c="folder";j[a.t][a.id]=a},!0)},C=function(a,b,c){if(!a.items)return null;for(var d in a.items){var f=a.items[d];if(f.t==g.FOLDER)if(f.id==b)return f;else if(c&&(f=C(f,b,c)))return f}return null},y=function(a,b,c){if(!a.items)return null;for(var d in a.items){var f=a.items[d];if(f.id==b.id&&f.t==b.t)return a;else if(f.t==g.FOLDER&&c&&(f=y(f,b,c)))return f}return null},z=function(a,b,c){if(!a.items)return null;for(var d=0,f=a.items.length;d<f;d++){var e=a.items[d];if(e.id==b.id&&e.t==b.t)return{parent:a,file:e,position:d};else if(e.t==g.FOLDER&&c&&(e=z(e,b,c)))return e}return null};this.getFolderById=function(a,b){return a==-1?n():j[g.FOLDER][a]?j[g.FOLDER][a]:(b=b||n(),C(b,a,!0))};this.getFolderByName=function(a){var b=j[g.FOLDER]||{},c;for(c in b)if(b[c].n===a)return b[c];return null};this.getFolderByFile=function(a,b){b=b||n();return a.t==g.FOLDER?this.getFolderById(a.pid,b):y(b,a,!0)};this.getFolderIdByFile=function(a,b){var c=this.getFolderByFile(a,b);return c?c.id:null};this.getFolderInfoByFolder=function(a,b){b=b||n();if(h(a.pid)){var c=z(b,a,!0);if(c)return{file:c.file,parent:c.folder,position:c.position}}else{for(var c=this.getFolderById(a.pid,b),d=0,f=c.items.length;d<f;d++){var e=c.items[d];if(e.id==a.id&&e.t==g.FOLDER)return{file:e,parent:c,position:d}}throw Error("the parent folder id is not correct!");}return null};this.getFileInfoByFile=function(a,b,c){b=b||n();h(c);return z(b,a,!0)};this.getFileByFile=function(a){return j[a.t]?j[a.t][a.id]:null};this.getFilesByType=function(a){return j[a]?j[a]:null};this.getFilesByParent=function(a,b){var c=this.getFolderById(a);if(c)if(b){var d=[],f,e;for(e in c.items)f=c.items[e],f.t==b&&d.push(f);return d}else return c.items;else throw Error("the parent folder id is not correct!");};this.getFileAmount=function(a){if(a)return l[a];else{var a=0,b;for(b in l)a+=l[b];return a}};this.getFileByFileName=function(a,c,d,f){var d=d||n(),f=b.isUndefined(f)?!0:f,c=c||[],e=[];s(d,function(b){if(c&&!(String(c).toLowerCase().indexOf(b.t)>-1))return!0;if(b.n&&b.n==a)return e.push(b),!1},f);return e};this.searchFileByFileName=function(a,c,d,f){var d=d||n(),f=b.isUndefined(f)?!0:f,c=c||"",e=[];s(d,function(b){if(c&&!(String(c).toLowerCase().indexOf(b.t)>-1))return!0;b.n&&String(b.n).toLowerCase().indexOf(a)>-1&&e.push(b)},f);return e};this.isInFolder=function(a,b,c){return!!z(b,a,c)};var F=function(a,b,f,e){var t=b.items?b.items:b.items=[];!h(f)&&f!==-1?t.splice(f,0,a):(t.push(a),f=t.length-1);if(a.t==g.FOLDER||a.t==g.FILE)a.pid=b.id;j[a.t][a.id]||l[a.t]++;j[a.t][a.id]=a;a={parent:b,file:a,position:f};e||c.notifyObservers(d,"FileAdd",a);return a};this.createFile=function(b,c,d,f,e){var t=!0;a()&&(t=!1);var k=this.getFolderById(c);if(k){if(b.t==g.FOLDER)b.pid=c,b.items=b.items||[];if(h(d))d=k.items.length;t?(c={fileList:[b],parent:k,position:d,callback:f},c.noProcessStatus=e,D([b],k.id,d,null,c)):(b.id=+new Date+o++,F(b,k,d,e))}};this.addFile=function(b,c,d,f,e){a()&&(f=!1);var c=h(c)?2:Number(c),t=this.getFolderById(c);if(t){b.id=Number(b.id);if(h(d)||d==-1)d=t.items.length;if(f)D([b],c,d,null,{fileList:[b],parent:t,position:d});else return F(b,t,d,e)}else throw Error("folder: "+c+" is not exist!");};this.addFiles=function(b,c,d,f,e){a()&&(f=!1);var c=h(c)?2:Number(c),t=this.getFolderById(c);if(t){if(h(d)||d==-1)d=t.items.length;if(f)D(b,c,d,null,{fileList:b,parent:t,position:d});else for(var g in b)this.addFile(b[g],c,null,!1,e)}else throw Error("folder: "+c+" is not exist!");};var H=function(a,b,f,e,t){if(h(f))f=d.getFileInfoByFile(a).position;b.items.splice(f,1);if(a.t===g.FOLDER){if(e&&a.items&&a.items.length)for(e=a.items.length-1;e>=0;e--)H(a.items[e],a,e,!0,t);delete a.pid}j[a.t][a.id]&&l[a.t]--;j[a.t][a.id]=null;delete j[a.t][a.id];a={parent:b,file:a,position:f};t||c.notifyObservers(d,"FileDelete",a);return a};this.deleteFile=function(b,c,d,f,e,t){a()&&(e=!1);if(b.t==g.FOLDER&&h(c))c=b.pid;var k,n=!1;if(h(c)){if(b=this.getFileInfoByFile(b))n=b.file,k=b.parent,d=b.position}else if(k=this.getFolderById(c),h(d)){if(b=this.getFileInfoByFile(b,k,!1))n=b.file,k=b.parent,d=b.position}else n=k.items[d];if(k&&n){if(n.t===g.FOLDER&&n.items&&n.items.length&&!f)throw Error("the folder "+n.id+' is not empty and isCascade is "'+!!f+'"!');if(e)E([n],k.id,null,{fileList:[n],parent:k,position:d,isCascade:f});else return H(n,k,d,f,t)}else return!1};this.deleteFiles=function(b,c,d,f){a()&&(d=!1);var e=this.getFolderById(c);if(e)if(d)E(b,e.id,null,{fileList:b,parent:e});else for(d=b.length-1;d>=0;d--)this.deleteFile(b[d],c,null,!0,!1,f);else return!1};var r=function(a,b,f,e,h,t){H(a,e,h,!1,!0);F(a,b,f,!0);a={file:a,targetId:b.id,targetPosition:f,sourceId:e.id,sourcePosition:h};t||c.notifyObservers(d,"FileMove",a);return a};this.moveFile=function(b,c,d,f,e,t,k){a()&&(t=!1);var n,o;h(f)?b=this.getFileInfoByFile(b):(o=this.getFolderById(f),b=this.getFileInfoByFile(b,o));if(b)o=b.parent,f=b.parent.id,e=b.position;else return!1;b=b.file;n=this.getFolderById(c);if(h(d)||d==-1)d=n.items.length;if(f==c){if(d>n.items.length)d=n.items.length;d>e&&d--;if(d==e)return!1}if(t)I([b],c,d,f,e,null,{fileList:[b],targetFolder:n,targetPosition:d,sourceFolder:o,sourcePosition:e}),(b.t==g.BUDDY||b.t==g.GROUP)&&qqweb.util.report2qqweb("deskcontact|use|move");else return c==5&&c!=f&&W(!1),r(b,n,d,o,e,k)};this.copyFile=function(a,b,c){var d={},f={};arguments={};var e=this.getFolderById(b),d={objs:[a],dest:e};arguments={fileList:[a],parent:e};f.data=d;f.arguments=arguments;f.onSuccess=c||G.onCopyFileSuccess;N(f)};this.fileDownload=function(a,b){var c={},d={};arguments={};c={objs:[a]};arguments={fileList:[a]};d.data=c;d.arguments=arguments;d.onSuccess=b||function(){};d.action="get_files";d.methon="POST";A(d)};this.getFolderItems=function(a,b){var c={},d={};arguments={};c={obj:a,providers:alloy.storage.getBoundDisk()};arguments={obj:a};d.data=c;d.arguments=arguments;d.onSuccess=b||G.onGetFolderItemSuccess;M(d)};this.openFile=function(a,c){a.cookie_name&&b.cookie.set(a.cookie_name,a.cookie_value,alloy.CONST.MAIN_DOMAIN,"",0.5);var d=alloy.util.getFileExt(a.n).toLowerCase(),f={};switch(d){case "jpg":case "jpeg":case "bmp":case "png":case "gif":f={type:d,files:[{url:c,title:a.n}]};break;case "txt":case "doc":case "docx":case "ppt":case "pptx":case "xls":case "xlsx":case "pdf":f={type:d,files:[{obj:a,url:c,title:a.n}]}}alloy.system.openFile(f)};this.cleanFiles=function(a,b){var c={},d={};arguments={};c={provider:a};arguments={provider:a};d.data=c;d.arguments=arguments;d.onSuccess=b||G.onCleanFilesSuccess;d.action="clean_files_by_provider";d.method="POST";A(d)};var k=function(a,b){var f=d.getFileByFile(a);if(!f)return!1;if(!h(a.n))f.n=a.n;b||c.notifyObservers(d,"FileUpdate",f);return f};this.isFileNameExist=function(a,c,d){var c=b.isUndefined(d)?j[c]:this.getFilesByParent(d),f;for(f in c)if(c[f].n==a)return!0;return!1};this.isFileNameAvailable=function(a,b,c){var f="\u6587\u4ef6\u5939";b==g.FILE&&(f="\u6587\u4ef6");if(a.replace(/[\\/:*?"<>|]/g,"")!=a)return f+'\u540d\u79f0\u4e0d\u80fd\u5305\u542b\\/:*?"<>|\u7b49\u7279\u6b8a\u5b57\u7b26';if(a.replace(/\s/g,"")=="")return f+"\u540d\u79f0\u4e0d\u80fd\u53ea\u5305\u542b\u7a7a\u5b57\u7b26";else if(e.byteLength(a)>48)return f+"\u540d\u79f0\u8fc7\u957f\uff08\u5b57\u6570\u6700\u591a\u4e3a24\u4e2a\u6c49\u5b57\u621648\u4e2a\u5b57\u7b26\uff09";else if(d.isFileNameExist(a,b,c))return f+"\u540d\u79f0\u6709\u51b2\u7a81\uff0c\u8bf7\u8f93\u5165\u65b0\u7684\u540d\u79f0";return 0};this.getDefaultFolderName=function(){for(var a="\u6587\u4ef6\u5939",b=2;b<q;++b){if(!alloy.fileSystem.isFileNameExist(a,g.FOLDER))break;a="\u6587\u4ef6\u5939"+b+""}b==q&&(a=+new Date);return a};this.updateFile=function(b,c,d){a()&&(c=!1);var f=this.getFileInfoByFile(b);if(!f)return!1;b.on=f.file.n;if(c)K([b],f.parent.id,null,{fileList:[b],parent:f.parent});else return k(b,d)};this.updateFiles=function(b,c,d,f){a()&&(d=!1);var e=this.getFolderById(c);if(e)if(d)K(b,c,null,{fileList:b,parent:e});else for(var h in b)this.updateFile(b[h],!1,f);else return!1};var A=function(a){if(alloy.portal.getLoginLevel()!=alloy.CONST.LOGIN_LEVEL_NONE){var a=a||{},c=a.data||{};c.vfwebqq=alloy.portal.getVfWebQQ();for(var d in c)if(b.isObject(c[d])||b.isArray(c[d]))c[d]=b.json.stringify(c[d]);a.data=c;a.method=a.method||"GET";a.onError=a.onError||G.onRequestError;a.onTimeout=a.onTimeout||G.onRequestTimeout;alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL+"cgi/top/"+a.action,a)}},D=function(a,b,f,e,t,n){!n&&p?c.notifyObservers(d,"FileProcessing",a):(p=!0,b={objs:a,pid:b,ti:f<0?0:f},t=t||{},t.noProcessStatus=h(t.noProcessStatus)?n:t.noProcessStatus,t={data:b,arguments:t},t.onSuccess=e||G.onAddFileSuccess,t.onError=G.onAddFileError,t.onTimeout=G.onAddFileTimeout,t.action="create",t.method="POST",A(t),J(a,"create"))},E=function(a,b,f,e,t){if(!t&&p)c.notifyObservers(d,"FileProcessing",a);else{p=!0;var n=[],k;for(k in a){var g=a[k];if(!t&&P(g,!0))return;n.push({t:g.t,id:g.id})}b={did:b,objs:n};e=e||{};e.noProcessStatus=h(e.noProcessStatus)?t:e.noProcessStatus;e={data:b,arguments:e};e.onSuccess=f||G.onDeleteFileSuccess;e.action="remove";e.method="POST";A(e);J(a,"del")}},I=function(a,b,f,e,t,n,k,g){if(!g&&p)c.notifyObservers(d,"FileProcessing",a);else{p=!0;var o=[],s;for(s in a){var w=a[s];if(!g&&P(w,!0))return;o.push({t:w.t,id:w.id})}k=k||{};k.noProcessStatus=h(k.noProcessStatus)?g:k.noProcessStatus;k={arguments:k};if(b==e)k.action="order",k.data={did:e,from:t,to:f,count:o.length};else if(k.action="move",k.data={objs:o,did:e,tid:b,ti:f<0?0:f},b===5)k.data.limit=5,k.data.ofd=e;k.onSuccess=n||G.onMoveFileSuccess;k.method="POST";A(k);J(a,"move")}},K=this.sendUpdateFiles=function(a,b,f,e,t){if(!t&&p)c.notifyObservers(d,"FileProcessing",a);else{p=!0;var k=[],n;for(n in a){var g=a[n];if(!t&&P(g,!0))return;var o={t:g.t,id:g.id,n:g.n};if(!h(g.n))o.n=g.n,o.on=g.on;k.push(o)}b={did:b,objs:k};e=e||{};e.noProcessStatus=h(e.noProcessStatus)?t:e.noProcessStatus;e={data:b,arguments:e};e.onSuccess=f||G.onUpdateFileSuccess;e.action="modify";e.method="POST";A(e);J(a,"modify")}};this.sendUpdateProgress=function(a){a.action="update_progress";a.method="POST";A(a)};var N=this.sendCopyFile=function(a){a.action="copy_file";a.method="POST";A(a)};this.sendFileMove=function(a){a.action="file_move";a.method="POST";A(a)};var M=this.sendGetFolderItem=function(a){a.action="get_folder";a.method="POST";A(a)},J=function(a,b){var c=a[0];c.t==g.FOLDER?alloy.util.report2qqweb("file|"+b+"|folder"):c.t==g.APP?alloy.util.report2qqweb("file|"+b+"|app"):(c.t==g.BUDDY||c.t==g.GROUP)&&alloy.util.report2qqweb("file|"+b+"|contact")},Q=function(){alloy.util.report2h("get_file_system","start");b.profile("getDesktopStart");typeof progress=="function"&&progress("get_file_system start");var a=0,c="pc";b.platform.iPad?c="pad":window.webTop&&(c="air");var d={onSuccess:G.onGetFileSystemConfigSuccess,context:this,data:{from:c},onError:function(){alloy.util.report2m(151396);alloy.util.report2qqweb("config|file|error");b.error("getDesktopError");typeof progress=="function"&&progress("get_file_system error",0);a==0?(R(d),a++):timeoutConfirm("\u8bfb\u53d6\u6587\u4ef6\u4fe1\u606f\u51fa\u9519\uff0c\u662f\u5426\u5237\u65b0\u91cd\u8bd5\uff1f\n\u70b9\u53d6\u6d88\u4f7f\u7528\u9ed8\u8ba4\u6587\u4ef6\u914d\u7f6e\u3002")||(m=!0,alloy.config.offlineSetupAppList(),L())},onTimeout:function(){alloy.util.report2m(151395);alloy.util.report2qqweb("config|file|timeout");b.error("getDesktopTimeout");typeof progress=="function"&&progress("get_file_system timeout",0);a==0?(R(d),a++):timeoutConfirm("\u8bfb\u53d6\u6587\u4ef6\u4fe1\u606f\u8d85\u65f6\uff0c\u662f\u5426\u5237\u65b0\u91cd\u8bd5\uff1f\n\u70b9\u53d6\u6d88\u4f7f\u7528\u9ed8\u8ba4\u6587\u4ef6\u914d\u7f6e\u3002")||(m=!0,alloy.config.offlineSetupAppList(),L())}};R(d)},R=function(a){a.action="get_desk";a.method="GET";A(a)},G={onBeforeGetUAC:function(){u=!1},onSimpleUACReady:function(a){a.uacLoaded?(m=!0,x=!1):(m=!1,x=!0);x&&alloy.portal.getLoginLevel()>alloy.CONST.LOGIN_LEVEL_NONE?alloy.config.isNewUser?(alloy.config.restoreConfig({appConfig:1}),L()):Q():(m=!0,L())},onGetFileSystemConfigSuccess:function(a){if(a&&a.retcode==0)if(alloy.util.report2h("get_file_system","end","ok"),b.profile("getDesktopSuccess"),a=a.result.values,h(a)||alloy.config.setDesktopList(a),a=alloy.config.getDesktopList(),a.length<5)alloy.util.report2m(151401),b.error("getDesktopFail : desktop data part missing"),timeoutConfirm("\u8bfb\u53d6\u5230\u7684\u684c\u9762\u6570\u636e\u90e8\u5206\u6570\u636e\u4e22\u5931, \u662f\u5426\u5237\u65b0\u91cd\u8bd5\uff1f\n\u70b9\u53d6\u6d88\u4f7f\u7528\u9ed8\u8ba4\u6587\u4ef6\u914d\u7f6e\u3002")||(m=!0,alloy.config.offlineSetupAppList(),alloy.config.setDesktopList(alloy.config.getDefaultDesktopList()),L());else{var c=0,d;for(d in a)a[d].items&&a[d].items.length&&(c+=a[d].items.length);c?(x&&(m=!1),L()):(alloy.util.report2m(151398),b.error("getDesktopFail : empty desktop"),timeoutConfirm("\u8bfb\u53d6\u5230\u7684\u684c\u9762\u6570\u636e\u4e0d\u6b63\u786e, \u662f\u5426\u5237\u65b0\u91cd\u8bd5\uff1f\n\u70b9\u53d6\u6d88\u4f7f\u7528\u9ed8\u8ba4\u6587\u4ef6\u914d\u7f6e\u3002")||(m=!0,alloy.config.offlineSetupAppList(),alloy.config.setDesktopList(alloy.config.getDefaultDesktopList()),L()))}else alloy.util.report2m(151397),alloy.util.report2h("get_file_system","end","error"),b.error("getDesktopFail : retcode="+a.retcode),timeoutConfirm("\u8bfb\u53d6\u684c\u9762\u6570\u636e\u51fa\u9519\uff0c\u662f\u5426\u5237\u65b0\u91cd\u8bd5\uff1f\n\u70b9\u53d6\u6d88\u4f7f\u7528\u9ed8\u8ba4\u6587\u4ef6\u914d\u7f6e\u3002")||(m=!0,alloy.config.offlineSetupAppList(),L())},onAddSetupAppList:function(a){var b=a.folderId;d.getFolderById(b);d.addFile({t:g.APP,id:a.id},b,-1,!0)},onRemoveSetupAppList:function(a){d.deleteFile({t:g.APP,id:a.id},null,null,!1,!a.noSave)},onRestoreAppList:function(){var a=alloy.config.getDefaultDesktopList(),b=[g.APP,g.BUDDY,g.GROUP,g.FOLDER,g.FILE],c=[],d;for(d in a)c.push(a[d].items);A({data:{objects:c,types:b},onSuccess:void 0,action:"reset",method:"POST"})},onRequestError:function(a){p=!1;var f=a.arguments.fileList,e;for(e in f)P(f[e],!1);b.error("FileOperateError");a.arguments.noProcessStatus||c.notifyObservers(d,"FileOperateError",a.arguments)},onRequestTimeout:function(a){p=!1;var f=a.arguments.fileList,e;for(e in f)P(f[e],!1);b.error("FileOperateTimeout");a.arguments.noProcessStatus||c.notifyObservers(d,"FileOperateTimeout",a.arguments);f=a.arguments;delete a.arguments;alloy.rpcService.sendFileErrorReport({request:f,response:a})},onAddFileError:function(a){b.error("AddFileError");p=!1;a.arguments.noProcessStatus||c.notifyObservers(d,"FileOperateError",a.arguments)},onAddFileTimeout:function(a){b.error("AddFileTimeout");p=!1;a.arguments.noProcessStatus||c.notifyObservers(d,"FileOperateTimeout",a.arguments);var f=a.arguments;delete a.arguments;alloy.rpcService.sendFileErrorReport({request:f,response:a})},onAddFileSuccess:function(a){p=!1;if(a.retcode==0&&a.result&&a.result.code==0){var f=a.result.objs||[],a=a.arguments,e=h(a.position)?a.parent.items.length:a.position,t;for(t in f){var k=f[t];if(k.t==g.FILE)k.upload=1;F(k,a.parent,e);e+=1;b.isFunction(a.callback)&&a.callback(k)}}else b.error("AddFileFail"),a.arguments.noProcessStatus||c.notifyObservers(d,"AddFileFail",a),a.arguments.fileList&&a.arguments.fileList[0]&&(k=a.arguments.fileList[0],k.t==g.FOLDER?alloy.util.report2m(151383):k.t==g.APP?alloy.util.report2m(151387):(k.t==g.BUDDY||k.t==g.GROUP)&&alloy.util.report2m(151391)),f=a.arguments,delete a.arguments,alloy.rpcService.sendFileErrorReport({request:f,response:a})},onDeleteFileSuccess:function(a){p=!1;if(a.retcode==0&&a.result&&a.result.code==0){var a=a.arguments,f=a.fileList,e;for(e in f){var h=f[e];P(h,!1);H(h,a.parent,a.position,a.isCascade)}}else b.error("DeleteFileFail"),B(a.arguments.fileList,!1),a.arguments.noProcessStatus||c.notifyObservers(d,"DeleteFileFail",a.arguments),a.arguments.fileList&&a.arguments.fileList[0]&&(h=a.arguments.fileList[0],h.t==g.FOLDER?alloy.util.report2m(151385):h.t==g.APP?alloy.util.report2m(151389):(h.t==g.BUDDY||h.t==g.GROUP)&&alloy.util.report2m(151393)),e=a.arguments,delete a.arguments,alloy.rpcService.sendFileErrorReport({request:e,response:a})},onMoveFileSuccess:function(a){p=!1;if(a.retcode==0&&a.result&&a.result.code==0){var a=a.arguments,f=a.fileList,e=a.targetFolder.id,h;for(h in f){var t=f[h];P(t,!1);e==5&&e!=a.sourceFolder.id&&W(!1);r(t,a.targetFolder,a.targetPosition,a.sourceFolder,a.sourcePosition)}}else b.error("MoveFileFail"),B(a.arguments.fileList,!1),a.arguments.noProcessStatus||c.notifyObservers(d,"MoveFileFail",a.arguments),a.arguments.fileList&&a.arguments.fileList[0]&&(t=a.arguments.fileList[0],t.t==g.FOLDER?alloy.util.report2m(151384):t.t==g.APP?alloy.util.report2m(151388):(t.t==g.BUDDY||t.t==g.GROUP)&&alloy.util.report2m(151392)),h=a.arguments,delete a.arguments,alloy.rpcService.sendFileErrorReport({request:h,response:a})},onCopyFileSuccess:function(a){if(a.retcode==0&&a.result&&a.result.code==0){var b=a.arguments,a=a.result.objs,f;for(f in a){var e=a[f];P(e,!1);alloy.storage.useSpace(e.s,e.size);F(e,b.parent,null,null)}}else B(a.arguments.fileList,!1),a.arguments.noProcessStatus||c.notifyObservers(d,"CopyFileFail",a.arguments),b=a.arguments,delete a.arguments,alloy.rpcService.sendFileErrorReport({request:b,response:a})},onGetFolderItemSuccess:function(a){a.retcode==0&&a.result&&a.result.code==0?c.notifyObservers(d,"GetFolderItemSuccess",a):c.notifyObservers(d,"GetFolderItemFail",a)},onCleanFilesSuccess:function(a){if(a.retcode==0&&a.result&&a.result.code==0){var b=j[g.FILE],f;for(f in b){var e=b[f];e.s===a.arguments.provider&&d.deleteFile(e,null,null,null,!1,!1)}c.notifyObservers(d,"CleanFilesSuccess",a.arguments.provider)}else alloy.layout.alert("\u89e3\u9664\u7ed1\u5b9a\u5931\u8d25\uff01")},onUpdateFileSuccess:function(a){p=!1;if(a.retcode==0&&a.result&&a.result.code==0){var a=a.arguments.fileList,f;for(f in a){var e=a[f];P(e,!1);k(e)}}else b.error("UpdateFileFail"),B(a.arguments.fileList,!1),a.arguments.noProcessStatus||c.notifyObservers(d,"UpdateFileFail",a.arguments),a.arguments.fileList&&a.arguments.fileList[0]&&(e=a.arguments.fileList[0],e.t==g.FOLDER?alloy.util.report2m(151386):e.t==g.APP?alloy.util.report2m(151390):(e.t==g.BUDDY||e.t==g.GROUP)&&alloy.util.report2m(151394)),f=a.arguments,delete a.arguments,alloy.rpcService.sendFileErrorReport({request:f,response:a})}},W=function(a){var b=alloy.fileSystem.getFolderById(5);if(b.items.length>=5)for(var c=alloy.desktopManager.getCurrentDesktopIndex(),b=b.items;b.length>=5;){var f=b.length-1;d.moveFile(b[f],c,null,5,f,!!a)}},P=function(a,b){if(b){if(a.processing)return c.notifyObservers(d,"FileProcessing",a),!0;a.processing=!0;c.notifyObservers(d,"FileBeforeProcess",a)}else delete a.processing,c.notifyObservers(d,"FileProcessed",a)},B=function(a,c){if(b.isArray(a))for(var d in a)P(a[d],c);else P(a,c)},L=function(){f();j={};j[g.FOLDER]={};j[g.FILE]={};j[g.APP]={};j[g.BUDDY]={};j[g.GROUP]={};l={};l[g.FOLDER]=0;l[g.FILE]=0;l[g.APP]=0;l[g.BUDDY]=0;l[g.GROUP]=0;w();a()||t();u=!0;c.notifyObservers(d,"FileSystemReady");c.notifyObservers(alloy.portal,"UACReady")},V=[],T=function(){},S=function(a){p=!1;if(!(a.retcode==0&&a.result&&a.result.code==0)){b.error("AddFileFail");var c=a.arguments;delete a.arguments;alloy.rpcService.sendFileErrorReport({request:c,response:a})}},U=function(a){V.push(a)},Z=function(){for(var a;a=V.shift();)setTimeout(a,500)},t=function(){var a=alloy.config.getSetupAppList(),c=alloy.config.configList.defaultScreen,c=h(c)?2:c-1,f=d.getFolderById(c),e=d.getFolderById(5),t=[],k,n=!1,o=alloy.config.getMustInstallAppList(),s;for(s in o){var w=Number(s);alloy.config.isInSetupAppList(w)||(n=!0,k={t:g.APP,id:w},a.push(w),d.getFileByFile(k)||(t.push(k),d.addFile(k,5,0,!1,!0)))}if(n&&(b.profile("forceInstallApp"),alloy.config.sendSetSetupAppList(),t.length)){var B=e.items.length,m=t.concat();U(function(){D(m,5,B,S,{fileList:m},!0)})}t=[];if(e.items.length>5)for(k=e.items;k.length>5;)w=k.length-1,t.push(k[w]),d.moveFile(k[w],c,null,5,w,!1,!0);if(t.length&&(b.profile("checkDock"),!n)){var O=t.concat();U(function(){I(O,c,0,5,null,T,{fileList:O},!0)})}t=[];n=d.getFilesByType(g.APP);for(s in a)n[a[s]]||(k={t:g.APP,id:a[s]},t.push(k));if(t.length){b.profile("addMissApp");d.addFiles(t,c,-1,!1,!0);var r=t.concat(),j=f.items.length;U(function(){D(r,c,j,S,{fileList:r},!0)})}var f={},t=!1,l;for(l in n)if((w=Number(n[l].id))&&b.array.indexOf(a,w)==-1)t=!0,k=n[l],s=d.getFileInfoByFile(k),f[s.parent.id]||(f[s.parent.id]={}),f[s.parent.id][k.id]=k,d.deleteFile(k,null,null,!1,!1,!0);if(t){b.profile("removeSurplusApp");for(var H in f){a=[];l=Number(H);for(var p in f[H])a.push(f[H][p]);U(b.bind(function(a){E(a.fileList,a.folderId,T,null,!0)},d,{fileList:a,folderId:l}))}}Z()};this.createRecentContactFolder=function(b){if(!a()){var c=d.getFolderByName("\u5e38\u7528\u8054\u7cfb\u4eba");if(c){if(b.length){var f=16-c.items.length;b.length>f&&b.splice(f);d.addFiles(b,c.id,null,!1);D(b,c.id,0,S,null,!0)}alloy.config.setPortalConfig("hasRecentFolder",1)}else c={t:g.FOLDER,n:"\u5e38\u7528\u8054\u7cfb\u4eba"},d.createFile(c,alloy.config.configList.defaultScreen-1,null,function(a){alloy.config.setPortalConfig("hasRecentFolder",1);b.length&&(d.addFiles(b,a.id,null,!1),D(b,a.id,0,S,null,!0))},!0)}};this.isFileSystemReady=function(){return u};this.init=function(){c.addObserver(alloy.portal,"SimpleUACReady",G.onSimpleUACReady);c.addObserver(alloy.config,"BeforeGetUAC",G.onBeforeGetUAC);c.addObserver(alloy.config,"AddSetupAppList",G.onAddSetupAppList);c.addObserver(alloy.config,"RemoveSetupAppList",G.onRemoveSetupAppList);c.addObserver(alloy.config,"RestoreAppList",G.onRestoreAppList)}});
Jx().$package("alloy.storage.rpcService",function(b){var d={onRequestError:function(){},onRequestTimeout:function(){}},c=function(c){if(alloy.portal.getLoginLevel()!=alloy.CONST.LOGIN_LEVEL_NONE){var c=c||{},g=c.data||{};g.vfwebqq=alloy.portal.getVfWebQQ();for(var j in g)if(b.isObject(g[j])||b.isArray(g[j]))g[j]=b.json.stringify(g[j]);c.data=g;c.method=c.method||"GET";c.onError=c.onError||d.onRequestError;c.onTimeout=c.onTimeout||d.onRequestTimeout;alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL+"cloud/cs/"+c.action,c)}};this.copyFile=function(b){b.action="copy_file";b.method="POST";c(b)};this.fileMove=function(b){b.action="file_move";b.method="POST";c(b)};this.createUser=function(b){b.action="create_user";b.method="POST";c(b)};this.fileRename=function(b){b.action="file_rename";b.method="POST";c(b)};this.createDir=function(b){b.action="create_dir";b.method="POST";c(b)};this.fileContUpload=function(){};this.queryUser=function(b){b.action="query_user";b.method="POST";c(b)};this.fileRemove=function(b){b.action="file_remove";b.method="POST";c(b)};this.queryFile=function(){};this.fileUpload=function(b){b.action="file_upload";b.method="POST";c(b)};this.fileDownload=function(b){b.action="file_download";c(b)};this.updateFileLength=function(){};this.getHomeKey=function(){};this.queryDir=function(b){b.action="query_dir";b.method="POST";c(b)}});
Jx().$package("alloy.storage",function(b){var d=this,c=alloy.storage.rpcService,e=b.event,g=b.dom,e=b.event,j=b.string,l=null,q=[],u=[],p=this.DISK={QQDISK:"qqdisk",KINGSOFT:"kingsoft"},v=d.diskConfig={qqdisk:{id:0,key:p.QQDISK,icon:"./module/diskexplorer/images/qqdisk.png",name:"QQ\u7f51\u76d8",userUsedSpace:0,userTotalSpace:1073741824,dataReady:!1},kingsoft:{id:1,key:p.KINGSOFT,icon:"./module/diskexplorer/images/kingsoft.png",name:"\u91d1\u5c71\u5feb\u76d8",userUsedSpace:0,userTotalSpace:5368709120,dataReady:!1}},x=[];(function(){var b,a=0;for(b in v)v.hasOwnProperty(b)&&(x[a++]=v[b])})();this.getTotalUsedSpace=function(){for(var b=0,a=0;a<q.length;a++)b+=v[q[a]].userUsedSpace;return b};this.getTotalSpace=function(){for(var b=0,a=0;a<q.length;a++)b+=v[q[a]].userTotalSpace;return b};this.getTotalSpaceById=function(b){if(b==p.QQDISK)switch(alloy.portal.getPortalSelf().vip){case 1:return 3221225472;case 2:return 4294967296;case 3:return 5368709120;case 4:return 6442450944;case 5:return 7516192768;case 6:return 8589934592;case 7:return 10737418240;default:return 1073741824}else if(b==p.KINGSOFT)return 5368709120};this.getFreeSpaceById=function(b){return v[b].userTotalSpace-v[b].userUsedSpace};this.getDiskById=function(b){return v[b]};this.getBoundDisk=function(){return q};this.addBoundDisk=function(c){b.array.indexOf(q,c)<0&&q.push(c);u=this.getUnBoundDisk()};this.removeBoundDisk=function(c){b.array.remove(q,c);u=this.getUnBoundDisk()};this.sendSetBoundDisk=function(b){alloy.rpcService.sendSetConfig({data:{r:{appid:0,value:{diskList:b}}}})};this.getUnBoundDisk=function(){u=[];for(var b={},a=0;a<q.length;a++)b[q[a]]=1;for(a=0;a<x.length;a++)b[x[a].key]||u.push(x[a].key);return u};this.setDefaultDisk=function(b){l=b};this.sendSetBoundAndDefaultDisk=function(b,a){b=b||alloy.storage.getBoundDisk();a=a||l;alloy.rpcService.sendSetConfig({data:{r:{appid:0,value:{defaultDisk:a,diskList:b}}}})};this.getDefaultDisk=function(){l=l||"qqdisk";return v[l]};this.useSpace=function(c,a){b.isNumber(a)&&(v[c].userUsedSpace+=a,e.notifyObservers(d,"StorageSpaceChanged",c))};this.releaseSpace=function(c,a){if(b.isNumber(a))v[c].userUsedSpace-=a,v[c].userUsedSpace=v[c].userUsedSpace>0?v[c].userUsedSpace:0,e.notifyObservers(d,"StorageSpaceChanged",c)};this.receiveFile=function(c){c.cookie_name&&b.cookie.set(c.cookie_name,c.cookie_value,alloy.CONST.MAIN_DOMAIN,"",0.5);var a=g.id("fs_download");if(typeof a=="undefined"||a==null)a=document.createElement("IFRAME"),a.id="fs_download",a.name="fs_download",a.src=alloy.CONST.MAIN_URL+"domain.html",a.style.display="none",document.body.appendChild(a);a.src=c.url};this.fileDownload=function(b,a){c.fileDownload({data:{target:a,obj:b},onSuccess:function(a){a.retcode==0&&a.result&&a.result.code==0&&d.receiveFile(a.result)}})};this.fileView=function(d,a){c.fileDownload({data:{target:a,obj:d},onSuccess:function(a){if(a.retcode==0&&a.result&&a.result.code==0){var c=b.extend({},d,a.result,a.result.obj);alloy.fileSystem.openFile(c,a.result.url)}}})};this.openFile=function(b,a){var c=alloy.util.getFileExt(b.n).toLowerCase();alloy.system.isOpenFile(c)&&this.fileView(b,a)};this.createFile=function(b,a){var f=this.getExplorerInstance(),n=f.getCurFolder(),g=f.getCurDisk(),f=b.fileSize;alloy.storage.getFreeSpaceById(g)<f?alloy.storage.storageFullAlert(g):(n={target:g,file:{t:alloy.fileSystem.FILE_TYPE.FILE,n:b.fileName,size:f,md5:"",sha:""},parent:n},n.parent=="root"&&delete n.parent,c.fileUpload({data:n,onSuccess:function(b){b.retcode==0&&b.result&&b.result.code==0?(b=b.result.obj,b.upload=1,d.useSpace(g,b.size),e.notifyObservers(d,"ExplorerFileAdd",b),a&&a(b)):b.retcode==0&&b.result&&b.result.code==30001?alloy.storage.storageFullAlert():alloy.layout.alert("\u4e0a\u4f20\u6587\u4ef6\u5931\u8d25\uff01")}}))};this.createDir=function(){var b={},a={},c=this.getExplorerInstance();b.target=c.getCurDisk();b.obj=c.getCurFolder();b.obj=="root"&&delete b.obj;a.data=b;a.onSuccess=function(a){a.retcode==0&&a.result&&a.result.code==0?e.notifyObservers(d,"ExplorerFileAdd",a.result.obj):alloy.layout.alert("\u521b\u5efa\u6587\u4ef6\u5939\u5931\u8d25\uff01")};alloy.storage.rpcService.createDir(a)};var m=function(b){if(b.replace(/[\\/:*?"<>|]/g,"")!=b)return'\u540d\u79f0\u4e0d\u80fd\u5305\u542b\\/:*?"<>|\u7b49\u7279\u6b8a\u5b57\u7b26';else if(j.byteLength(b)>48)return"\u6587\u4ef6\u5939\u540d\u79f0\u8fc7\u957f\uff08\u5b57\u6570\u6700\u591a\u4e3a24\u4e2a\u6c49\u5b57\u621648\u4e2a\u5b57\u7b26\uff09";return 0};this.fileRename=function(b,a){var c=m(a);if(c==0){var c={},g={},o=this.getExplorerInstance();c.target=o.getCurDisk();b.n=a;c.obj=b;g.data=c;g.arguments={obj:b};g.onSuccess=function(a){a.retcode==0&&a.result&&a.result.code==0?e.notifyObservers(d,"ExplorerFileRename",a.arguments.obj):a.result.code==33333?alloy.layout.alert("\u7cfb\u7edf\u6587\u4ef6\u5939\u4e0d\u5141\u8bb8\u91cd\u547d\u540d"):alloy.layout.alert("\u91cd\u547d\u540d\u5931\u8d25\uff01")};alloy.storage.rpcService.fileRename(g)}else alloy.layout.alert(c,null,{title:"\u91cd\u547d\u540d"})};this.fileRemove=function(b){var a={},c={},g=this.getExplorerInstance().getCurDisk();a.obj=b;a.target=g;c.data=a;c.arguments={obj:b};c.onSuccess=function(a){a.retcode==0&&a.result&&a.result.code==0?(a=a.arguments.obj,d.releaseSpace(g,a.size),e.notifyObservers(d,"ExplorerFileRemove",a)):a.result.code==33333?alloy.layout.alert("\u7cfb\u7edf\u6587\u4ef6\u5939\u4e0d\u5141\u8bb8\u5220\u9664"):alloy.layout.alert("\u5220\u9664\u5931\u8d25\uff01")};alloy.storage.rpcService.fileRemove(c)};this.fileCopy=function(b,a){var c={},g={},o=this.getExplorerInstance();c.target=o.getCurDisk();c.obj=b;c.dest=o.getCurFolder();c.dest=="root"&&delete c.dest;g.data=c;g.onSuccess=function(b){b.retcode==0&&b.result&&b.result.code==0?(b=b.result.obj,d.useSpace(a,b.size),e.notifyObservers(d,"ExplorerFileCopy",b)):b.retcode==0&&b.result&&b.result.code==30001?alloy.storage.storageFullAlert():alloy.layout.alert("\u590d\u5236\u5931\u8d25\uff01")};alloy.storage.rpcService.copyFile(g)};this.fileMove=function(b){var a={},c={},g=this.getExplorerInstance();a.target=g.getCurDisk();a.obj=b;a.dest=g.getCurFolder();a.dest=="root"&&delete a.dest;c.data=a;c.onSuccess=function(a){a.retcode==0&&a.result&&a.result.code==0?e.notifyObservers(d,"ExplorerFileMove",a.result.obj):a.result.code==33333?alloy.layout.alert("\u7cfb\u7edf\u6587\u4ef6\u5939\u4e0d\u5141\u8bb8\u79fb\u52a8"):alloy.layout.alert("\u7c98\u8d34\u5931\u8d25\uff01")};alloy.storage.rpcService.fileMove(c)};this.isDiskReady=function(){return!1};this.storageFullAlert=function(b){b?alloy.layout.alert("\u60a8\u7684"+v[b].name+"\u5269\u4f59\u7a7a\u95f4\u4e0d\u8db3\uff0c\u8bf7\u4fee\u6539\u9ed8\u8ba4\u786c\u76d8\u540e\u91cd\u65b0\u4e0a\u4f20",function(){alloy.system.runApp("diskExplorer")}):alloy.layout.alert("\u78c1\u76d8\u7a7a\u95f4\u5df2\u6ee1\uff0c\u8bf7\u7ed1\u5b9a\u6216\u4f7f\u7528\u65b0\u7684\u786c\u76d8")};this.getExplorerInstance=function(){if(alloy.app.diskExplorer)return alloy.app.diskExplorer.getInstance()};var o={onPortalReady:function(){var c=alloy.config.getDiskList();l=alloy.config.getDefaultDisk();if(v[l])v[l].isDefault=!0;c&&(q=c);u=d.getUnBoundDisk();for(var a=0,c=0;c<q.length;c++){var f={};f.data={target:q[c]};f.arguments={target:q[c]};f.onSuccess=function(c){if(c.retcode==0&&c.result&&c.result.code==0){var f=c.arguments.target,h=parseInt(c.result.userUsedSpaceBytes),c=parseInt(c.result.userTotalSpaceBytes);v[f].userUsedSpace=h>c?c:h;v[f].userTotalSpace=c;v[f].dataReady=!0;a++;e.notifyObservers(d,"StorageSpaceChanged",f)}else b.out("\u52a0\u8f7d\u4e91\u5b58\u50a8\u4fe1\u606f\u9519\u8bef\uff01"),e.notifyObservers(d,"StorageError")};alloy.storage.rpcService.queryUser(f)}q.length==0&&e.notifyObservers(d,"StorageReady")},onMessageUpdate:function(c){if((Number(c.appid)||Number(c.aid))==400011741){var c=b.json.parse(b.string.decodeHtmlSimple(c.m)),a=alloy.storage.getDiskById(c.source);if(a){var f=parseInt(c.userUsedSpaceBytes),g=parseInt(c.userTotalSpaceBytes);a.userUsedSpace=f>g?g:f;a.userTotalSpace=g;e.notifyObservers(d,"StorageSpaceChanged",c.source)}}}};this.init=function(){e.addObserver(alloy.portal,"portalReady",o.onPortalReady);e.addObserver(alloy.portal,"message",o.onMessageUpdate)}});
Jx().$package("alloy.desktopContact",function(b){var d=this,c=b.event,c=b.event,e=alloy.fileSystem.FILE_TYPE,g=!1,j={onBuddySelected:function(b,c){var a=c;a==-1&&(a=alloy.desktopManager.getCurrentDesktopIndex());var d=[],g;for(g in b){var s=b[g],m;s.gcode?(m=Number(s.gcode),s={id:s.gcode,n:s.name,t:alloy.fileSystem.FILE_TYPE.GROUP,gid:s.gid||0}):(m=Number(s.uin),s={id:s.uin,n:s.name,t:alloy.fileSystem.FILE_TYPE.BUDDY});isNaN(m)||alloy.fileSystem.getFileByFile(s)||d.push(s)}d.length&&(g=alloy.fileSystem.getFileAmount(e.BUDDY),m=alloy.fileSystem.getFileAmount(e.GROUP),g+m+d.length>=200?alloy.layout.alert("\u684c\u9762\u8054\u7cfb\u4eba\u5df2\u8d85\u8fc7200\u4eba\u4e0a\u9650\uff0c\u8bf7\u5220\u51cf\u540e\u518d\u521b\u5efa\u3002"):alloy.fileSystem.getFolderById(a)?alloy.fileSystem.addFiles(d,a,null,!0):alloy.layout.alert("\u6587\u4ef6\u5939\u5df2\u7ecf\u4e0d\u5b58\u5728\uff0c\u6dfb\u52a0\u5931\u8d25\u3002"));qqweb.util.report2qqweb("deskcontact|create|context")},onBeforeGetRecentList:function(){c.addObserver(EQQ.Model.BuddyList,"RecentListChange",j.onRecentListChange)},onEQQLoginSuccess:function(){c.removeObserver(EQQ.Model.BuddyList,"BuddyStateChange",j.onBuddyStateChange);c.addObserver(EQQ.Model.BuddyList,"BuddyStateChange",j.onBuddyStateChange);g||(alloy.notifier.register("desktopContact",j.onMessageReceive,j.onMessageHandled),g=!0);x();var b=alloy.fileSystem.getFilesByType(e.BUDDY),d;for(d in b)m(b[d].id);alloy.system.reportAppState("50",1)},onDockLocationChanged:function(){},onBuddyStateChange:function(b){m(b)},onLoginLevelChange:function(b){if(b==2&&b<alloy.portal.getOldLoginLevel()){var c=alloy.fileSystem.getFilesByType(e.BUDDY),a;for(a in c)c[a].notifyNumber=0,alloy.iconFactory.updateNotifyNumber(c[a]);var c=alloy.fileSystem.getFilesByType(e.GROUP),d;for(d in c)c[d].notifyNumber=0,alloy.iconFactory.updateNotifyNumber(c[d])}b<3&&alloy.portal.getOldLoginLevel()==3&&alloy.system.reportAppState("50",2)},onFileAddFail:function(){},onMessageReceive:function(b){var c;c=alloy.config.configList.isNoContactNotify?!1:b.from!=50?!1:b.body.extra.isChatBoxOpen?!1:!0;if(c){c=b.body;var a;b.type=="SingleChat"?(b=c.uin,a=e.BUDDY):(b=c.code,a=e.GROUP);alloy.iconFactory.updateNotifyNumber({id:b,t:a,notifyNumber:c.count})}},onMessageHandled:function(b){var c=b.body;b.type=="SingleChat"?(b=c.uin,c=e.BUDDY):(b=c.code,c=e.GROUP);alloy.iconFactory.updateNotifyNumber({id:b,t:c,notifyNumber:0})},onRecentListChange:function(){c.removeObserver(EQQ.Model.BuddyList,"RecentListChange",j.onRecentListChange);if(alloy.fileSystem.isFileSystemReady())l();else{var b=function(){l();c.removeObserver(alloy.fileSystem,"FileSystemReady",b)};c.addObserver(alloy.fileSystem,"FileSystemReady",b)}}},l=function(){if(!alloy.config.configList.hasRecentFolder){for(var b=EQQ.Model.BuddyList.getRecentList(),c=[],a,d,g=0;g<b.length;g++){if(c.length>=16)break;a=null;if(b[g].type==0)(d=EQQ.Model.BuddyList.getBuddyByUin(b[g].uin))&&(a={t:e.BUDDY,id:b[g].uin,n:d.showName});else if(b[g].type==1)(d=EQQ.Model.BuddyList.getGroupByGid(b[g].uin))&&(a={t:e.GROUP,id:d.code,n:d.showName,gid:b[g].uin});else continue;a&&!alloy.fileSystem.getFileByFile(a)&&c.push(a)}alloy.fileSystem.createRecentContactFolder(c)}},q=[],u=function(){},p=function(b){q.push(b)},v=function(){for(var b;b=q.shift();)setTimeout(b,500)},x=function(){var c=alloy.fileSystem.getFilesByType(e.BUDDY),h,a,f=!1,g={},s,m,j;for(j in c){h=c[j];if((a=EQQ.Model.BuddyList.getUserByUin(h.id))&&h.n!==a.showName)f=!0,h.n=a.showName,a=alloy.fileSystem.getFolderIdByFile(h),g[a]||(g[a]={}),g[a][h.id]=h;m=alloy.iconFactory.getIcons(h.id,e.BUDDY)||[];a=0;for(s=m.length;a<s;a++)m[a].refreshIcon(),m[a].setText(h.n)}var c=alloy.fileSystem.getFilesByType(e.GROUP),l;for(l in c){h=c[l];if((j=EQQ.Model.BuddyList.getGroupByCode(h.id))&&h.n!==j.showName)f=!0,h.n=j.showName,a=alloy.fileSystem.getFolderIdByFile(h),g[a]||(g[a]={}),g[a][h.id]=h;m=alloy.iconFactory.getIcons(h.id,e.GROUP)||[];a=0;for(s=m.length;a<s;a++)m[a].refreshIcon(),m[a].setText(h.n)}if(f)for(var q in g){h=[];var f=Number(q),x;for(x in g[q])h.push(g[q][x]);p(b.bind(function(a){alloy.fileSystem.sendUpdateFiles(a.fileList,a.folderId,u,null,!0)},d,{fileList:h,folderId:f}))}v()},m=this.updateContactIconState=function(b,c,a){var c=alloy.iconFactory.getIcons(b,e.BUDDY),d;if(c)if(a=a||EQQ.Model.BuddyList.getState(b)){b=0;for(d=c.length;b<d;b++)c[b].showState(a)}else{b=0;for(d=c.length;b<d;b++)c[b].hideState()}};this.init=function(){c.addObserver(alloy.portal,"EQQLoginSuccess",j.onEQQLoginSuccess);c.addObserver(alloy.portal,"BeforeGetRecentList",j.onBeforeGetRecentList);c.addObserver(alloy.portal,"loginLevelChange",j.onLoginLevelChange)};this.addContactIcon=function(b,c,a){var d=alloy.fileSystem.getFileInfoByFile(b);if(d)b=d.parent.id,b==5?c="\u8be5\u8054\u7cfb\u4eba\u5df2\u6dfb\u52a0\uff0c\u4f4d\u4e8e\u201c\u5e94\u7528\u7801\u5934\u201d\u3002":b>=0&&b<5?c="\u8be5\u8054\u7cfb\u4eba\u5df2\u6dfb\u52a0\uff0c\u4f4d\u4e8e"+("\u201c\u684c\u9762"+(b+1)+"\u201d")+"\u3002":b==c?c="\u8be5\u8054\u7cfb\u4eba\u5df2\u4f4d\u4e8e\u8be5\u6587\u4ef6\u5939\u3002":(c="\u6587\u4ef6\u5939\u201c"+(d.parent.n||d.parent.id)+"\u201d",c="\u8be5\u8054\u7cfb\u4eba\u5df2\u6dfb\u52a0\uff0c\u4f4d\u4e8e"+c+"\u3002"),alloy.layout.alert(c);else{var d=alloy.fileSystem.getFileAmount(e.BUDDY),g=alloy.fileSystem.getFileAmount(e.GROUP);d+g>=200?alloy.layout.alert("\u684c\u9762\u8054\u7cfb\u4eba\u5df2\u8d85\u8fc7200\u4eba\u4e0a\u9650\uff0c\u8bf7\u5220\u51cf\u540e\u518d\u521b\u5efa\u3002"):(c=c||alloy.desktopManager.getCurrentDesktopIndex(),d=b.t==e.BUDDY?EQQ.Model.BuddyList.getUserByUin(b.id):EQQ.Model.BuddyList.getGroupByCode(b.id),b.n=d.showName,alloy.fileSystem.addFile(b,c,a,!0))}};this.deleteContactIcon=function(b){alloy.fileSystem.deleteFile(b,null,null,!1,!0)};this.getCurrentContacts=function(){var b={},c,a=alloy.fileSystem.getFilesByType(e.BUDDY),d;for(d in a)c=a[d],b[c.id]={type:c.t,uin:c.id,name:c.n};a=alloy.fileSystem.getFilesByType(e.GROUP);for(d in a)c=a[d],b[c.id]={type:c.t,uin:c.gid,name:c.n,gcode:c.id};return b};this.showSelectBuddyBox=function(b){typeof b=="undefined"&&(b=-1);if(alloy.portal.getLoginLevel()==alloy.CONST.LOGIN_LEVEL_NONE)alloy.layout.showLoginWindow("selectBuddy");else{var c=d.getCurrentContacts();alloy.portal.runApp("selectBuddy",{id:"desktopContact",title:"\u6dfb\u52a0\u684c\u9762\u8054\u7cfb\u4eba",isAddSelf:!1,maxBuddy:0,initList:c,lockInitList:!0,onlyNewMember:!0,groupDisplayType:"group",cbParam:b,onSelected:j.onBuddySelected})}}});
Jx().$package("alloy.desktopFolder",function(b){var d=b.event,c=b.dom,d=b.event,e=b.string,g=alloy.fileSystem.MAX_FOLDER_AMOUNT,j=alloy.fileSystem.FILE_TYPE,l={onFileUpdate:function(b){var c=alloy.iconFactory.getIcons(b.id,b.t);if(c)for(var d=0,e=c.length;d<e;d++)c[d].setText(b.n),c[d].file.n=b.n},onFileCreateSuccess:function(b){var c=alloy.iconFactory.getIcons(b.id,b.t);if(c)for(var d=0,g=c.length;d<g;d++)c[d].setText(e.encodeHtml(b.n))},onFileAdd:function(b){if(b=alloy.iconFactory.getIcons(b.parent.id,b.parent.type))for(var c=0,d=b.length;c<d;c++)b[c].update()},onFileDelete:function(b){if(b=alloy.iconFactory.getIcons(b.parent.id,b.parent.type))for(var c=0,d=b.length;c<d;c++)b[c].update()},onFileMove:function(b){var c=b.targetId,b=b.sourceId,d=alloy.iconFactory.getIcons(c,j.FOLDER);if(d)for(var e=0,g=d.length;e<g;e++)d[e].update();if(d=alloy.iconFactory.getIcons(b,j.FOLDER)){e=0;for(g=d.length;e<g;e++)d[e].update()}alloy.iconFactory.updateNotifyNumber(alloy.fileSystem.getFolderById(b));alloy.iconFactory.updateNotifyNumber(alloy.fileSystem.getFolderById(c))}};this.init=function(){d.addObserver(alloy.fileSystem,"FileUpdate",l.onFileUpdate);d.addObserver(alloy.fileSystem,"FileAdd",l.onFileAdd);d.addObserver(alloy.fileSystem,"FileDelete",l.onFileDelete);d.addObserver(alloy.fileSystem,"FileMove",l.onFileMove)};this.createFolder=function(){alloy.fileSystem.getFileAmount(j.FOLDER)>=g?alloy.layout.alert("\u6587\u4ef6\u5939\u5df2\u8d85\u8fc7"+g+"\u4e2a\u4e0a\u9650\uff0c\u8bf7\u5220\u51cf\u540e\u518d\u521b\u5efa\u3002"):alloy.system.getLoginLevel()>1?new u({callback:function(b){var c=alloy.desktopManager.getCurrentDesktopIndex();alloy.fileSystem.createFile({t:alloy.fileSystem.FILE_TYPE.FOLDER,n:b.n,c:b.c},c,null,l.onFileCreateSuccess)}}):alloy.layout.showLoginWindow("")};this.deleteFolder=function(b){var c=alloy.fileSystem.getFolderById(b.id).items,d=!1,e=!1;c.length?alloy.layout.confirm("\u60a8\u786e\u5b9a\u5220\u9664\u6587\u4ef6\u5939\u7684\u6240\u6709\u5185\u5bb9\u5417\uff1f",function(){for(var g=[],h=c.length-1;h>=0;h--){var a=c[h];if(a.t==j.APP){var f=alloy.appconfig.getAppConfig(a.id);if(f)f.noSave=!0,alloy.config.removeSetupAppList(f,!1,!0)===!1?e=!0:(g.push(a),d=!0)}else g.push(a)}d&&alloy.config.sendSetSetupAppList();e?g.length&&alloy.fileSystem.deleteFiles(g,b.id,!0):alloy.fileSystem.deleteFile(b,null,null,!0,!0)},{title:"\u5220\u9664\u6587\u4ef6\u5939"}):alloy.fileSystem.deleteFile(b,null,null,!1,!0)};var q=function(c){var d=alloy.CONST.CDN_URL+"style/images/filesys/"+c+".png",e=alloy.CONST.CDN_URL+"style/images/transparent.gif";return b.browser.ie==6?'<img class="fcDropdown_img" src="'+e+'" style="'+("background:node;filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+d+"', sizingMethod='scale')")+'" idx="'+c+'" />':'<img class="fcDropdown_img" src="'+d+'" idx="'+c+'" />'},u=new b.Class({init:function(e){var g=this,e=e||{};e.id=e.id||+new Date;e.callback=e.callback||function(){};g.option=e;var l=g.folderWindow=alloy.windowFactory.createWindow("Window",{title:"\u65b0\u5efa\u6587\u4ef6\u5939",modeSwitch:!0,dragable:!0,width:380,height:120,hasCloseButton:!0,hasOkButton:!0,hasCancelButton:!0,doubleClickModeSwitch:!1,isSetCentered:!0}),m='\t\t\t\t<div class="folderCreator" id="folderCreator_'+e.id+'">\t\t\t\t\t<a class="folderSelector" id="folderSelector_'+e.id+'">'+q("folder")+'</a>\t\t\t\t\t<div class="folderNameTxt">\u8bf7\u8f93\u5165\u6587\u4ef6\u5939\u540d\u79f0\uff1a</div>\t\t\t\t\t<div class="folderInput"><input class="folderName" id="folderName_'+e.id+'"></input></div>\t\t\t\t\t<div class="folderNameError" id="folderNameError_'+e.id+'"></div>\t\t\t\t</div>\t\t\t';l.setHtml(m);g.container=c.id("folderCreator_"+e.id);g.selector=c.id("folderSelector_"+e.id);g.folderName=c.id("folderName_"+e.id);g.folderNameError=c.id("folderNameError_"+e.id);m='\t\t\t\t<div class="fcDropdown_title" id="fcDropdown_title_'+e.id+'">\u56fe\u6807</div>\t\t\t\t<div class="fcDropdown_body" id ="fcDropdown_body_'+e.id+'">\t\t\t\t\t<a class="fcDropdown_item" title="\u9ed8\u8ba4">'+q("folder")+'</a>\t\t\t\t\t<a class="fcDropdown_item" title="\u8054\u7cfb\u4eba">'+q("contact")+'</a>\t\t\t\t\t<a class="fcDropdown_item" title="\u6587\u672c">'+q("doc")+'</a>\t\t\t\t\t<a class="fcDropdown_item" title="\u6e38\u620f">'+q("game")+'</a>\t\t\t\t\t<a class="fcDropdown_item" title="\u751f\u6d3b">'+q("life")+'</a>\t\t\t\t\t<a class="fcDropdown_item" title="\u97f3\u4e50">'+q("music")+'</a>\t\t\t\t\t<a class="fcDropdown_item" title="\u5de5\u5177">'+q("tool")+'</a>\t\t\t\t\t<a class="fcDropdown_item" title="\u89c6\u9891">'+q("video")+"</a>\t\t\t\t</div>\t\t\t";g.dropdown=c.node("div",{id:"fcDropdown_"+e.id,"class":"folderCreatorDropdown"});g.dropdown.innerHTML=m;document.body.appendChild(g.dropdown);g.dropdownTitle=c.id("fcDropdown_title_"+e.id);g.dropdownBody=c.id("fcDropdown_body_"+e.id);g.folderType=c.id("folderType_"+e.id);g.folderSelector=c.id("folderSelector_"+e.id);c.hide(g.dropdown);g.dropdownPanel=new b.ui.PopupBox({noCatchMouseUp:!0,container:g.dropdown});g.folderName.value=alloy.fileSystem.getDefaultFolderName();g.folderName.select();var o={onClick:function(b){b.preventDefault();b.stopPropagation();g.showDropDown()},onKeyDown:function(b){c.hide(g.folderNameError);b.keyCode==13&&o.onClickOkButton()&&l.close()},onDropdownClick:function(b){b=b.target.getAttribute("idx");g._selectedCate=b;g.folderSelector.innerHTML=q(b)},onClickOkButton:function(){var b=g.getFolderByName(),a=g.getSelectedCate(),d=alloy.fileSystem.isFileNameAvailable(b,j.FOLDER);if(d!=0)return c.show(g.folderNameError),g.folderNameError.innerHTML=d,!1;e.callback({c:a,n:b});return!0},onDragStart:function(){g.hideDropDown()},onWindowClose:function(){document.body.removeChild(g.dropdown)}};d.on(g.selector,"click",o.onClick);d.on(g.folderName,"keydown",o.onKeyDown);d.on(g.dropdownBody,"click",o.onDropdownClick);d.addObserver(l,"clickOkButton",o.onClickOkButton);d.addObserver(l,"dragStart",o.onDragStart);d.addObserver(l,"close",o.onWindowClose);this._selectedCate="folder"},getSelectedCate:function(){return this._selectedCate},getFolderByName:function(){return this.folderName.value},showDropDown:function(){var b=c.getXY(this.selector);this.dropdownPanel.show();var d=alloy.layout.themeManager.getCurrentSkin().currentWindow.ie6WindowCenterBackground||"##B6EAFD";c.setStyle(this.dropdownTitle,"backgroundColor",d);c.setStyle(this.dropdown,"zIndex",alloy.layout.getTopZIndex(1));c.setXY(this.dropdown,b[0]+"px",b[1]+57+"px")},hideDropDown:function(){this.dropdownPanel.hide()},destroy:function(){}})});
Jx().$package("alloy.desktopFile",function(b){var d={onFileCreateSuccess:function(){}};this.init=function(){};this.createFile=function(c,e){if(alloy.system.getLoginLevel()>1){var g=c.folderId,j=alloy.storage.getDefaultDisk().key;alloy.storage.getFreeSpaceById(j)<c.fileSize?alloy.storage.storageFullAlert(j):(g==-1&&(g=alloy.desktopManager.getCurrentDesktopIndex()),alloy.fileSystem.createFile({t:alloy.fileSystem.FILE_TYPE.FILE,n:c.fileName,size:c.fileSize,md5:"",sha:"",s:j},g,null,b.bind(function(b){d.onFileCreateSuccess(b);alloy.storage.useSpace(b.s,b.size);e&&e(b)},this)))}else alloy.layout.showLoginWindow("")};this.deleteFile=function(b){alloy.fileSystem.deleteFile(b,null,null,!1,!0);alloy.storage.releaseSpace(b.s,b.size)}});
Jx().$package("alloy.windowFactory",function(b){var d=this,c=b.dom,e=b.event,g,j,l,q,u,p={onDesktopResize:function(){var b,c=alloy.windowManager.getWindowList(),d;for(d in c){b=c[d];var a=b.getBoxStatus();if(a=="max"||a=="fullscreen")a:{var f=void 0,e=void 0,g=void 0,j=a=void 0,j=e=f=a=g=void 0,j=b.getBoxStatus(),g=alloy.layout.getAreaWidth("left"),a=alloy.layout.getAreaHeight("top"),f=alloy.layout.getClientWidth(),e=alloy.layout.getClientHeight();if(j=="fullscreen")j=5,f+=j*2,e+=j*2,g=-g-j,a=-a-j;else if(j=="max")j=10,f+=j*2,e+=j*2,g=-g-j,a=-a-j;else break a;(b.windowType=="window"||b.windowType=="chatbox"||b.windowType=="messagebox")&&b.adjustSize(f,e,g,a)}else b.getY()<0&&b.setY(0)}},onWindowSetCenter:function(){var b=alloy.layout.getClientWidth(),c=alloy.layout.getClientHeight(),b=b>this.getWidth()?(b-this.getWidth())/2:0,c=c>this.getHeight()?(c-this.getHeight())/2:0;this.setXY(b,c)},onWindowSetCurrent:function(){alloy.windowManager.setCurrentWindow(this);x(this);this.subMode==1&&this.isSubWinFloat&&this.subWin&&x(this.subWin)},onWindowTitleBarClick:function(){g&&g.focus()},onWindowDestroy:function(){alloy.app.gravity&&alloy.app.gravity.removeBox(this);j&&c.hide(j);b.platform.iPad||g&&g.focus()},onWindowResize:function(){alloy.app.gravity&&alloy.app.gravity.resizeBox(this);if(this.subMode==1&&this.isSubWinFloat&&this.subWin&&this.isShow()){b.info("subWindowResize","subWindow");var d=c.getRelativeXY(this._subBodyOuter,this.container.parentNode);this.subWin.setXY(d[0],d[1]+(b.browser.ie?2:0))}},onWindowMax:function(){var b=alloy.layout.getClientWidth(),c=alloy.layout.getClientHeight(),d=alloy.layout.getAreaWidth("left"),a=alloy.layout.getAreaHeight("top");this.setXY(-d-10,-a-10);this.setWinWidth(b+20);this.setWinHeight(c+20)},onWindowRestore:function(){},onWindowFullscreen:function(){var d=alloy.layout.getClientWidth(),e=alloy.layout.getClientHeight(),g=alloy.layout.getAreaWidth("left"),a=alloy.layout.getAreaHeight("top");this.setXY(-g-5,-a-5);this.setWinWidth(d+10);this.setWinHeight(e+10);this.setZIndexLevel(3);x(this);b.browser.mobileSafari||(j||(j=c.node("div",{id:"fullscreen_tip","class":"fullscreen_tip"}),document.body.appendChild(j)),c.setStyle(j,"zIndex",alloy.layout.getTopZIndex(3)),c.show(j),this.subMode==1&&this.isSubWinFloat&&this.subWin&&this.isShow()&&(this.subWin.setZIndexLevel(3),x(this.subWin)),setTimeout(function(){c.hide(j)},3E3))},onWindowRestoreFull:function(){this.setZIndexLevel(0);x(this);this.subMode==1&&this.isSubWinFloat&&this.subWin&&this.isShow()&&(this.subWin.setZIndexLevel(0),x(this.subWin))},onWindowHide:function(){this.subMode==1&&this.isSubWinFloat&&this.subWin&&this.subWin.hide(!0)},onWindowShow:function(){if(this.subMode==1&&this.isSubWinFloat&&this.subWin){var d=c.getRelativeXY(this._subBodyOuter,this.container.parentNode);this.subWin.setXY(d[0],d[1]+(b.browser.ie?2:0));this.subWin.show()}},onWindowSetRight:function(){var b=this.getBodySize()[0];this.setX(alloy.layout.getClientWidth()-b)},onWindowBeforeDragStart:function(){var b=-10-alloy.layout.getAreaHeight("top"),c=-this.getTitleBarHeight()-this.getHeight();this.setDragLimite({topMargin:b,bottomMargin:c})}},v=function(c){if(c){var d=c.option||{};d.isSetCurrent?c.setCurrent({fromInit:!0}):c.setNotCurrent({fromInit:!0});var e=alloy.layout.getAvailableWidth(),a=alloy.layout.getAvailableHeight(),f=c.getWidth(),g=c.getHeight();c.getX();c.getY();g>a&&(g=a);f>e&&(f=e);if(c.windowType=="window"||c.windowType=="chatbox"||c.windowType=="messagebox")c.setWinWidth(f),c.setWinHeight(g);b.isUndefined(d.defaultMode)||c.restore();switch(d.defaultMode){case "max":c.max();c._restoreWidth=d.defaultWidth;c._restoreHeight=d.defaultHeight;break;case "min":c.min();break;case "fullscreen":c.fullscreen()}if(alloy.app.gravity)c.b2Box=alloy.app.gravity.createBox(c);d.isSetCentered&&c.setWindowCentered()}},x=function(b){if(!b.isLockZIndex()){var c=b.getZIndexLevel()||0,c=alloy.layout.getTopZIndex(c);b.setZIndex(c)}};this.init=function(){l={};q=0;u=!1;g||(g=c.node("input",{id:"qqweb_focus_input"}),g.setAttribute("type","text"),document.body.appendChild(g));e.addObserver(alloy.layout,"desktopResize",p.onDesktopResize);e.addObserver(alloy.dock,"DockLocationChanged",p.onDesktopResize)};this.createWindow=function(g,j,h){var a=l[g],j=b.clone(j);j.level=j.level?parseInt(j.level):0;j.dragProxy=j.dragProxy||u;j.zIndex=j.zIndex||alloy.layout.getTopZIndex();j.topMargin=j.bottomMargin=0;if(a){if(!j.appendTo){if(b.isUndefined(j.desktopIndex))j.desktopIndex=alloy.desktopManager.getCurrentDesktopIndex();g=alloy.desktopManager.getDesktop(j.desktopIndex).getElement();j.appendTo=g}j.windowId=j.windowId||q++;a=new a(j);e.notifyObservers(d,"WindowCreate",a);a.setZIndexLevel(j.level);a.setLockZIndex(j.lockZIndex||!1);e.addObserver(a,"setCenter",p.onWindowSetCenter);e.addObserver(a,"setCurrent",p.onWindowSetCurrent);e.addObserver(a,"clickTitleBar",p.onWindowTitleBarClick);e.addObserver(a,"destroy",p.onWindowDestroy);e.addObserver(a,"resize",p.onWindowResize);e.addObserver(a,"hide",p.onWindowHide);e.addObserver(a,"show",p.onWindowShow);e.addObserver(a,"beforeDragStart",p.onWindowBeforeDragStart);e.addObserver(a,"SetRight",p.onWindowSetRight);(a.windowType=="window"||a.windowType=="chatbox"||a.windowType=="messagebox")&&e.addObserver(a,"max",p.onWindowMax);if(b.isUndefined(j.x)&&b.isUndefined(j.y)){var f,n;n=f=0;var j=a.option.clientWidth||alloy.layout.getAvailableWidth(),g=a.option.clientHeight||alloy.layout.getAvailableHeight(),s=j-a.getWidth(),w=g-a.getHeight(),x=s>0?s/2:0,y=w>0?w/2:0,z=a.getId(),z=alloy.windowManager.getWindowList().length==1?0:z<0?0:z;f=(x+z*25)%s+f;n=(y+z*25)%w+n;f=f>0?f:0;n=n>0?n:0;f=f+parseInt(a.getWidth())>=j?0:f;n=n+parseInt(a.getHeight())>=g?0:n;a.setXY(f,n)}else n=alloy.layout.getAvailableWidth(),j=alloy.layout.getAvailableHeight(),w=a.getX()||0,g=a.getY()||0,w+a.getWidth()>n&&(n-=a.getWidth(),a.setX(n<0?0:n)),g+a.getHeight()>j&&(j-=a.getHeight(),a.setY(j<0?0:j)),a.subMode==1&&a.isSubWinFloat&&a.subWin&&(j=c.getRelativeXY(a._subBodyOuter,a.container.parentNode),a.subWin.setXY(j[0],j[1]+(b.browser.ie?2:0)),a.subWin.show());h||v(a);e.notifyObservers(d,"WindowCreated",a);return a}else throw Error('WindowFactory: class "'+g+'" has not register!');};this.registerWindow=function(b,c){l[b]=c};this.initWindow=v});
Jx().$package("alloy.windowManager",function(b){var d=b.event,c,e,g,j,l={onWidnowCreated:function(b){c.push(b);e[b.getId()]=b;b.windowType=="widget"?j.push(b):g.push(b);d.addObserver(b,"destroy",l.onWindowDestroy)},onWindowDestroy:function(d){e[d.getId()]=null;d.windowType=="widget"?b.array.remove(j,d):b.array.remove(g,d);b.array.remove(c,d)}};this.init=function(){c=[];e={};g=[];j=[];d.addObserver(alloy.windowFactory,"WindowCreated",l.onWidnowCreated)};this.getWindow=function(b){return e[b]};this.getWindowList=function(){return c};this.getOnlyWindowList=function(){return g};this.getOnlyWidgetList=function(){return j};this.setCurrentWindow=function(b){var c=alloy.desktopManager.getCurrentDesktop();b.desktopIndex!==c.getIndex()&&alloy.desktopManager.setCurrentDesktop(b.desktopIndex);c=alloy.desktopManager.getCurrentDesktop();c.getWindowManager().setCurrentWindow(b)};this.getCurrentWindow=function(){return alloy.desktopManager.getCurrentDesktop().getWindowManager().getCurrentWindow()}});
Jx().$package("alloy.desktopManager",function(b){var d=b.dom,c=b.event,e=b.fx.transitions,g={NORMAL:1,EDIT:2,DRAG:3,MANAGE:4},j,l,q,u,p,v,x,m,o,h,a=[],f={},n=[],s=[],w={},C=g.NORMAL,y=[],z=[],F,H,r,k=[0,0,0,0,0],A=alloy.fileSystem.FILE_TYPE,D=142,E=112,I=0,K=0,N=0,M=function(a){return a===null||typeof a==="undefined"},J=function(){alloy.navbar&&alloy.navbar.setZIndex(11);d.setStyle(alloy.layout.getArea("bottom"),"zIndex",12)},Q=function(){alloy.navbar&&alloy.navbar.setZIndex(10);d.setStyle(alloy.layout.getArea("bottom"),"zIndex",10)},R=[{text:"\u4e0a\u4f20\u6587\u4ef6",type:"flash",icon:{className:"add_file_icon"},onClick:function(){}},{text:"\u6dfb\u52a0\u5e94\u7528",icon:{className:"add_app_icon"},onClick:function(){alloy.portal.runApp("appMarket");qqweb.util.report2qqweb("screen|"+alloy.desktopManager.getCurrentDesktopIndex()+"|addapp")}},{text:"\u6dfb\u52a0\u684c\u9762\u8054\u7cfb\u4eba",icon:{className:"add_contact_icon"},onClick:function(){alloy.desktopContact.showSelectBuddyBox();qqweb.util.report2qqweb("add|desktop|adddeskcontanct")}},{type:"separator"},{text:"\u65b0\u5efa\u6587\u4ef6\u5939",icon:{className:"add_folder_icon"},onClick:function(){alloy.desktopFolder.createFolder();qqweb.util.report2qqweb("add|desktop|addfolder")}}],G={onWindowCreated:function(a){if(this.isWindowInDesktop(a)){this._windowArray.push(a);if(a.windowType!="widget"){var d=this,f=function(){this.getBoxStatus()==="max"&&(b.array.contains(d._maxWindowArray,this)||d._maxWindowArray.push(this),d._maxWindowArray.length>0&&Q())},e=function(){b.array.remove(d._maxWindowArray,this);d._maxWindowArray.length==0&&J()};c.addObserver(a,"max",f);c.addObserver(a,"show",f);c.addObserver(a,"restore",e);c.addObserver(a,"min",e);f.apply(a)}c.addObserver(a,"destroy",b.bind(G.onWindowDestroy,this))}},onWindowDestroy:function(a){if(a==this.getCurrentWindow()){this.setCurrentWindow(null);var c;if(!this._preCurrentWindow&&(c=this._windowArray[this._windowArray.length-1]))this._preCurrentWindow=c==a?this._windowArray[this._windowArray.length-2]||null:c;this._preCurrentWindow&&this._preCurrentWindow.isShow()&&this._preCurrentWindow.setCurrent()}else if(a==this._preCurrentWindow)this._preCurrentWindow=null;b.array.remove(this._windowArray,a);a.windowType!="widget"&&(b.array.remove(this._maxWindowArray,a),this._maxWindowArray.length==0&&J())},onDesktopSwitch:function(a){this._desktopIndex==a&&(this._maxWindowArray.length==0?J():Q())}},W=new b.Class({init:function(a){this._desktopIndex=a.desktopIndex;this._windowArray=[];this._preCurrentWindow=this._currentWindow=null;this._maxWindowArray=[];c.addObserver(alloy.windowFactory,"WindowCreated",b.bind(G.onWindowCreated,this));c.addObserver(alloy.portal,"DesktopSwitch",b.bind(G.onDesktopSwitch,this))},isWindowInDesktop:function(a){if(M(a.desktopIndex))return this._desktopIndex==alloy.desktopManager.getCurrentDesktopIndex();else if(this._desktopIndex==a.desktopIndex)return!0;return!1},setCurrentWindow:function(a){if(a)if(this._currentWindow){if(this._currentWindow!=a)this._preCurrentWindow=this._currentWindow,this._currentWindow.setNotCurrent()}else this._preCurrentWindow=null;this._currentWindow=a},getCurrentWindow:function(){return this._currentWindow}}),P=new b.Class({init:function(a){var f=this._index=a.index,e=this._el=d.node("div",{index:f,"class":"desktopContainer"}),g=this._iconContainer=d.node("div",{"class":"appListContainer",customAcceptDrop:1,index:f});c.addObserver(g,"dragmove",B.onDesktopContainerDragMove);c.addObserver(g,"drop",B.onDesktopContainerDrop);if(b.browser.mobileSafari)c.on(g,"touchstart",B.onTouchStart);e.appendChild(g);if(b.browser.mobileSafari)d.setStyle(g,"overflow-y","auto"),d.setStyle(g,"overflow-x","hidden"),new b.ui.TouchScroller(g);else{var t=new b.ui.ScrollArea(g);t.update();y.push(t);d.setStyle(g,"overflow-y","hidden")}b.browser.engine.webkit&&d.setStyle(this._el,"left",alloy.layout.getDesktopWidth()+"px");d.hide(g);a.appendTo.appendChild(e);this._windowManager=new W({desktopIndex:f});if(b.browser.engine.webkit){d.addClass(l,"desktopsContainerEx");var h=this;c.on(this._el,"webkitTransitionEnd",function(){h._isCurrent||d.setClass(this,"desktopContainer");k[h._index]--;a:{for(var a in k)if(k[a]>0)break a;d.addClass(l,"desktopsContainerEx")}})}},getElement:function(){return this._el},getIconContainer:function(){return this._iconContainer},getIndex:function(){return this._index},getWindowManager:function(){return this._windowManager},setCurrent:function(a,c){this._isCurrent=!0;var f=this._el,e=this;d.setClass(f,"desktopContainer desktop_current");if(c||C===g.DRAG)b.browser.engine.webkit&&(d.addClass(l,"desktopsContainerEx"),d.addClass(f,"desktop_current_noanimation"));else if(b.browser.engine.webkit&&(k[this._index]=2,d.removeClass(l,"desktopsContainerEx")),b.browser.engine.webkit||b.browser.firefox)this._showAnimationTimer&&clearTimeout(this._showAnimationTimer),this._disappearAnimationTimer&&clearTimeout(this._disappearAnimationTimer),d.addClass(f,"desktop_show_prepare"+a),this._showAnimationTimer=setTimeout(function(){d.addClass(f,"desktop_show_animation"+a);e._showAnimationTimer=0},100)},setNotCurrent:function(a,c){d.removeClass(l,"desktopsContainerEx");this._isCurrent=!1;var f=this._el,e=this;d.setClass(f,"desktopContainer");if(!(c||C===g.DRAG))if(b.browser.engine.webkit)b.browser.engine.webkit&&(k[this._index]=1,d.removeClass(l,"desktopsContainerEx")),d.addClass(f,"desktop_disappear_prepare"+a),d.addClass(f,"desktop_disappear_animation"+a);else if(b.browser.firefox)this._showAnimationTimer&&clearTimeout(this._showAnimationTimer),this._disappearAnimationTimer&&clearTimeout(this._disappearAnimationTimer),d.addClass(f,"desktop_disappear_prepare"+a),this._disappearAnimationTimer=setTimeout(function(){d.addClass(f,"desktop_disappear_animation"+a);e._disappearAnimationTimer=0},100)}}),B={onTouchStart:function(a){var b=a.target;if(d.hasClass(b,"appListContainer"))I=a.changedTouches[0].pageX,K=(new Date).getTime(),c.on(b,"touchmove",B.onTouchMove),c.on(b,"touchend",B.onTouchEnd)},onTouchMove:function(){},onTouchEnd:function(a){var b=a.target;c.off(b,"touchmove",B.onTouchMove);c.off(b,"touchend",B.onTouchEnd);N=a.changedTouches[0].pageX-I;a=(new Date).getTime()-K;a=N/a;a>50?T(!0):a<-50?V(!0):N>60?T(!0):N<-60?V(!0):N=0},onSwipe:function(){},onDesktopContainerDragMove:function(){},onDesktopContainerDrop:function(a){var b=a.pos,c=b.x,e=b.y;e+=this.scrollTop;var b=a.dragEl,a=this.getAttribute("index")||u,g=d.getClientXY(this);c-=g[0];e-=g[1];c=Math.floor(c/D);e=Math.floor(e/E);c=e>=x?e*m+c:c*x+e;if(c>f[a].length)c=f[a].length;var t,h=b.getAttribute("type"),e={t:h},g=alloy.fileSystem.FILE_TYPE;t=parseInt(b.getAttribute("fileId"));if(!isNaN(t)){if(h==g.FILE){var k=alloy.iconFactory.getIcons(t,alloy.fileSystem.FILE_TYPE.FILE);i=0;for(len=k.length;i<len;i++)if(k[i].isUploading())return}e.id=t;if(h==g.GROUP)e.gid=parseInt(b.getAttribute("gid"));b=b.getAttribute("from");t=f[a][c];b=="buddy"?(t&&w[t]&&w[t].type==g.FOLDER?alloy.fileSystem.moveFile(e,w[t].fileId,null,null,null,!0):alloy.desktopContact.addContactIcon(e,a,c),qqweb.util.report2qqweb("deskcontact|create|drag")):alloy.fileSystem.isInFolder(e,alloy.fileSystem.getRootFolder(),!0)&&(t&&w[t]&&w[t].type==g.FOLDER&&e.t!=g.FOLDER?alloy.fileSystem.moveFile(e,w[t].fileId,null,null,null,!0):alloy.fileSystem.moveFile(e,a,c,null,null,!0))}},onGetAppConfigComplete:function(){ea();v={};b.array.forEach(s,function(a){clearTimeout(a)});b.array.forEach(n,function(a){a&&a.stop()});n=[];s=[];var a=alloy.fileSystem.getRootFolder(),d=a.items,a=alloy.fileSystem.getFolderById(u,a);aa(a.items,a.id,function(){c.notifyObservers(alloy.portal,"FirstScreenReady");for(var a=0,b=1;a<5;++a)u!=d[a].id&&(function(a,b){s[a]=setTimeout(function(){aa(d[a].items,d[a].id)},b*5E3)}(a,b),b++)})},onClearDefaultApp:function(){ea()},onFileMove:function(a){if(a.targetId>=0&&a.targetId<5){if(a.targetId==a.sourceId)var b=X(a.file.id,a.file.t);else a.sourceId>=0&&a.sourceId<5&&(b=X(a.file.id,a.file.t))&&da(b,a.sourceId,a.sourcePosition),b=t(a.file,q[a.targetId].getIconContainer(),a.targetId);b&&$(b,a)}else a.sourceId>=0&&a.sourceId<5&&(b=X(a.file.id,a.file.t))&&da(b,a.sourceId,a.sourcePosition)},onFileAdd:function(a){var b=a.parent.id;if(b>=0&&b<5){var c={targetId:b,targetPosition:a.position,sourceId:-1,sourcePosition:-1};(a=t(a.file,q[b].getIconContainer(),b))&&$(a,c)}},onFileDelete:function(a){var b=a.parent.id;if(b>=0&&b<5){var c=X(a.file.id,a.file.t);c&&da(c,b,a.position)}},onFileOperateTimeout:function(){alloy.layout.alert("\u64cd\u4f5c\u8d85\u65f6\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u3002")},onFileOperateError:function(){alloy.layout.alert("\u64cd\u4f5c\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u3002")},onAddFileFail:function(a){a.retcode==0&&a.result&&a.result.code==30001?alloy.storage.storageFullAlert():alloy.layout.alert("\u6dfb\u52a0\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u3002")},onCopyFileFail:function(a){a.retcode==0&&a.result&&a.result.code==30001?alloy.storage.storageFullAlert():alloy.layout.alert("\u590d\u5236\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u3002")},onMoveFileFail:function(a){a.retcode==0&&a.result&&a.result.code==30001?alloy.storage.storageFullAlert():alloy.layout.alert("\u79fb\u52a8\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u3002")},onUpdateFileFail:function(){alloy.layout.alert("\u66f4\u65b0\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u3002")},onDeleteFileFail:function(){alloy.layout.alert("\u5220\u9664\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u3002")},onDesktopResize:function(){var a=alloy.layout.getAvailableWidth(),c=alloy.layout.getAvailableHeight(),a={width:a,height:c};if(a.width){var c=alloy.layout.getAreaWidth("left"),f=alloy.layout.getAreaWidth("right");F=a.width;H=F+c+f;d.setStyle(l,"width",F+"px");for(var f=0,e=q.length;f<e;++f)c=q[f],d.setStyle(c.getIconContainer(),"width",a.width-28+"px"),d.setStyle(c.getIconContainer(),"marginLeft","28px"),b.browser.engine.webkit&&d.setStyle(c.getElement(),"left",H+"px"),d.setStyle(c.getElement(),"width",a.width+"px")}if(a.height){r=a.height-alloy.layout.getAreaHeight("bottom");d.setStyle(l,"height",r+"px");f=0;for(e=q.length;f<e;++f)d.setStyle(q[f].getIconContainer(),"height",r-46+"px"),d.setStyle(q[f].getIconContainer(),"marginTop","46px"),d.setStyle(q[f].getElement(),"height",r+"px")}d.setStyle(j,"left",alloy.layout.getAreaWidth("left")+"px");d.setStyle(j,"right",alloy.layout.getAreaWidth("right")+"px");a=r-46;m=Math.floor((F-28)/D);x=Math.floor(a/E);fa()},onDockLocationChanged:function(){var a=alloy.layout.getAreaHeight("top");d.setStyle(l,"top",a+"px");B.onDesktopResize()},onSortControllerDragEnd:function(a){alloy.util.report2qqweb("screen|screendrag");C===g.DRAG&&S(g.NORMAL);var b=a.apperceiveEl,a=b.getAttribute("fileId"),b=b.getAttribute("type");if(a&&b&&(a={id:a,t:b},(a=alloy.fileSystem.getFileByFile(a))&&a.processing))if(a=alloy.iconFactory.getIcons(a.id,a.t))for(var b=0,c=a.length;b<c;b++)a[b].disable()},onSortControllerDragStart:function(){S(g.DRAG)},onUACReady:function(){L(ga()-1,!0);ha(ia())}},L=function(a,f){if(a===u||M(a)||!q[a])return!1;if(v&&!v[a]){var e=alloy.fileSystem.getFolderById(a);aa(e.items,e.id)}e=a>u?1:2;M(u)||q[u].setNotCurrent(e,f);u=a;q[a].setCurrent(e,f);b.browser.ie==6&&d.setStyle(document.body,"height",d.getStyle(document.body,"height"));z[a]&&Y(a);c.notifyObservers(alloy.portal,"DesktopSwitch",u);return!0},V=function(){var a=u+1;a>=q.length||L(a)},T=function(){var a=u-1;a<0?alloy.portal.isWebTop()&&alloy.portal.switchToDesktop():L(a)},S=function(b){b=b||g.NORMAL;if(b===g.EDIT){if(C===g.DRAG)return;d.addClass(j,"appButtonEditState");for(var f=0,e=a.length;f<e;++f)a[f].setAttribute("title","\u8fd4\u56de"),a[f].lastChild.firstChild.innerHTML="\u8fd4\u56de";p.lock()}else if(b===g.NORMAL){d.removeClass(j,"appButtonEditState");f=0;for(e=a.length;f<e;++f)a[f].setAttribute("title","\u6dfb\u52a0"),a[f].lastChild.firstChild.innerHTML="\u6dfb\u52a0"}b!==g.EDIT&&p.isLock()&&p.unlock();C=b;c.notifyObservers(alloy.portal,"DesktopSwitchStatus",{status:b});return b},U=document.createElement("div");U.className="appButton addQuickLinkButton";U.setAttribute("title","\u6dfb\u52a0");U.innerHTML='<div class="addQuickLinkButtonInner"></div>        <div class="appButton_appName"><div class="appButton_appName_inner">\u6dfb\u52a0</div><div class="appButton_appName_inner_right"></div></div>';var Z=function(a){a.stopPropagation();C===g.EDIT?(S(g.NORMAL),alloy.util.report2qqweb("screen|ipad|edited")):(alloy.layout.showContextMenu({x:a.clientX,y:a.clientY},{items:R}),alloy.util.report2qqweb("add|add|"+alloy.desktopManager.getCurrentDesktopIndex()))},t=function(a,c){var d={parentNode:c},f;if(a.t==A.APP){var e=a.id;f=alloy.appconfig.getAppConfig(e);if(!f)return b.profile('createFileIcon. id="'+e+'" appConfig is null',"DesktopManager"),alloy.fileSystem.deleteFile(a,null,null,null,!1),null;f=alloy.iconFactory.createIcon(a.t,d,f)}else if(a.t==A.BUDDY||a.t==A.GROUP)f=alloy.iconFactory.createIcon(a.t,d,a);else if(a.t==A.FOLDER||a.t==A.FILE)f=alloy.iconFactory.createIcon(a.t,d,a);f&&(w[f.getId()]=f,p.addDragClass(f.getElement()));return f},$=function(a,b){var c=b.targetId,d=b.targetPosition,e=b.sourcePosition,g=-1;b.sourceId==c?(f[c].splice(e,1),f[c].splice(d,0,a.getId()),e>d?(g=e,e=d):g=d):(e=d,f[c].splice(d,0,a.getId()));Y(c,e,g)},aa=function(a,c,g){typeof progress=="function"&&progress("screen:"+c);if(!v[c]){v[c]=!0;var h=q[c].getIconContainer();d.hide(h);var k=new b.fx.Animation({element:h,property:"opacity",from:0,to:1,unit:!1,duration:2E3,fps:30,transition:e.sinusoidal.easeOut});n[c]=new b.Chunk(a,function(a){a&&(a=t(a,h,c))&&f[c].push(a.getId())},this,!1,function(){fa();setTimeout(function(){b.browser.ie==7||b.browser.ie==6?d.show(h):(d.setStyle(h,"opacity",0),d.show(h),k.start())},500);g&&g()})}},da=function(a,b,c){f[b].splice(c,1);a=w[a.getId()];delete w[a.getId()];a.destroy();Y(b,c)},ea=function(){for(var a=0,b=q.length;a<b;++a)f[a].length=0;for(a in w)b=w[a],w[a]=null,delete w[a],b.destroy&&b.destroy()},X=function(a,b){typeof b!=="undefined"&&(a=b+"_"+a);return w[a]},ba={},fa=function(){for(var a=0,b=q.length;a<b;++a)ba[""+a]||function(a){ba[a]=setTimeout(function(){Y(a);ba[""+a]=null},500)}(a)},ca=function(a,b,c){var f=o||(o=d.getWidth(a)),e=h||(h=d.getHeight(a)),b=(D-f)/2+b,c=(E-e)/2+c;d.setStyle(a,"left",b+"px");d.setStyle(a,"top",c+"px")},Y=function(b,c,d){var c=0,d=-1,e=f[b],g=e.length;if(g==0)ca(a[b],0,0);else{c!==void 0?c>g-1&&(c=g-1):c=0;if(d==void 0||d==-1||d>g-1)d=g-1;var t=Math.floor(c/x)*D,h=c%x*E,k=x*m<=c+1;k&&(t=c%m*D,h=Math.floor(c/m)*E);for(;c<=d;c++)if(k=e[c],k!=void 0&&(k=X(k)))ca(k.getElement(),t,h),(k=x*m<=c+1)?(c+1)%m==0?(t=0,h+=E):t+=D:(c+1)%x==0?(h=0,t+=D):h+=E;d==g-1&&ca(a[b],t,h);y[b]&&y[b].update(b);z[b]=0}},ga=function(){return alloy.config.configList.defaultScreen||3},ia=function(){return alloy.config.configList.desktopIconStyle||0},ha=function(a,b,f){alloy.config.configList.desktopIconStyle=a;a==0?(D=142,E=112,d.removeClass(l,"desktopSmallIcon")):(E=D=90,d.addClass(l,"desktopSmallIcon"));var e=r-46;m=Math.floor((F-28)/D);x=Math.floor(e/E);h=o=0;z=[1,1,1,1,1];Y(u);b&&alloy.portal.getLoginLevel()>alloy.CONST.LOGIN_LEVEL_NONE&&(f?alloy.rpcService.sendMSetConfigDelay({data:{0:{desktopIconStyle:a}},delay:f}):alloy.rpcService.sendSetConfig({data:{r:{appid:0,value:{desktopIconStyle:a}}}}));c.notifyObservers(alloy.desktopManager,"DesktopIconStyleChanged",a)};this.init=function(e){var g=e.initializeLength||5,e=e.currentDesktopIndex||Math.floor(g/2);j=alloy.layout.getArea("main");j.innerHTML='            <div id="desktopsContainer"></div>';l=d.id("desktopsContainer");d.setClass(l,"desktopsContainer");p=new b.ui.Sortables([],"id");var t;q=[];for(var h=0;h<g;++h){t=new P({index:h,appendTo:l});q.push(t);p.addDropTarget({el:t.getIconContainer(),level:0});f[h]=[];t=h;var k=U.cloneNode(!0);k.setAttribute("screen",t);q[t].getIconContainer().appendChild(k);c.on(k,"click",Z);a.push(k)}L(e,!0);c.addObserver(p,"start",B.onSortControllerDragStart);c.addObserver(p,"end",B.onSortControllerDragEnd);c.addObserver(alloy.layout,"desktopResize",B.onDesktopResize);c.addObserver(alloy.dock,"DockLocationChanged",B.onDockLocationChanged);c.addObserver(alloy.appconfig,"GetAppConfigComplete",B.onGetAppConfigComplete);c.addObserver(alloy.appconfig,"GetDefaultAppConfigComplete",B.onGetAppConfigComplete);c.addObserver(alloy.appconfig,"ClearDefaultApp",B.onClearDefaultApp);c.addObserver(alloy.fileSystem,"FileMove",B.onFileMove);c.addObserver(alloy.fileSystem,"FileAdd",B.onFileAdd);c.addObserver(alloy.fileSystem,"FileDelete",B.onFileDelete);c.addObserver(alloy.fileSystem,"FileOperateTimeout",B.onFileOperateTimeout);c.addObserver(alloy.fileSystem,"FileOperateError",B.onFileOperateError);c.addObserver(alloy.fileSystem,"AddFileFail",B.onAddFileFail);c.addObserver(alloy.fileSystem,"CopyFileFail",B.onCopyFileFail);c.addObserver(alloy.fileSystem,"DeleteFileFail",B.onDeleteFileFail);c.addObserver(alloy.fileSystem,"MoveFileFail",B.onMoveFileFail);c.addObserver(alloy.fileSystem,"UpdateFileFail",B.onUpdateFileFail);c.addObserver(alloy.portal,"UACReady",B.onUACReady)};this.DESK_STATUS=g;this.setCurrentDesktop=L;this.goNextDesktop=V;this.goPrevDesktop=T;this.refreshDesktop=function(){p.refreshDropTarget()};this.getDesktop=function(a){return q[a]};this.getDesktopList=function(){return q};this.getCurrentDesktopIndex=function(){return u};this.getCurrentDesktop=function(){return q[u]};this.setDesktopStatus=S;this.getDesktopStatus=function(){return C};this.getDragController=function(){return p};this.getDefaultDesktop=ga;this.setDefaultDesktop=function(a,b,c){a=Number(a);if(b&&alloy.portal.getLoginLevel()>alloy.CONST.LOGIN_LEVEL_NONE)alloy.config.configList.defaultScreen=a,c?alloy.rpcService.sendMSetConfigDelay({data:{0:{defaultScreen:a}},delay:c}):alloy.rpcService.sendSetConfig({data:{r:{appid:0,value:{defaultScreen:a}}}})};this.getDesktopIconStyle=ia;this.setDesktopIconStyle=ha});
Jx().$package("alloy.portal",function(b){var d=this,c=b.dom,e=b.event,g=b.http,j,l=!1,q,u=alloy.CONST.LOGIN_LEVEL_NONE,p=0,v,x=1,m,o,h=!1,a=!1,f=0,n=0,s,w=!1,C="",y,z,F="",H="",r=null,k=0,A=!1,D,E,I,K,N=!1,M,J,Q=[],R=[],G=0,W="socket",P,B=0,L={},V,T=null,S=!0;alloy.system=d;d.speedTest=alloy.util.speedTest;d.isWebTop=function(){return window.webTop?!0:!1};d.isWebTopAir=function(){return/AIR/.test(webTop.type)?!0:!1};d.isWebTopQT=function(){return/QT\//.test(webTop.type)?!0:!1};d.isWebTopWin=function(){return/WIN/.test(webTop.type)?!0:!1};this.setPortalSelf=function(a){d.self=d.self||{};d.self.uin=a.uin||d.getUin();d.self.allow=a.allow;d.self.age=a.age;d.self.nick=a.nick;d.self.vip=a.vip_info;d.self.vipRoam=null;d.self.htmlNick=b.string.encodeHtml(String(a.nick));d.self.titleNick=String(a.nick);d.self.country=a.country;d.self.province=a.province;d.self.city=a.city;d.self.gender=a.gender;d.self.face=a.face;d.self.phone=a.phone;d.self.mobile=a.mobile;d.self.email=a.email;d.self.uiuin=a.uiuin||a.uin};this.setPortalSelfItem=function(a,b){d.self[a]=b};this.getPortalSelf=function(a){return typeof d.self=="undefined"?{}:typeof a=="undefined"?d.self:d.self[a]};this.isNewUser=function(){return w};this.setIsNewUser=function(a){w=a};var U=function(){b.profile("runCoreApps Start!","portal!");alloy.notifier.init();d.runApp("tips",{callback:function(){b.profile("runCoreApps Finish!","portal!")}})},Z=function(){var a=d.getLoginLevel(),b;a==1?b="panel":a==2?b="go":a==3&&(b="logined");return b};this.setReRunAppList=function(a){Q=a};this.getReRunAppList=function(){return Q};var t=function(){b.profile("reRunBeforeLoginApps Start!","portal!");if(Q){for(var a=0;a<Q.length;++a){var c,f;b.isArray(Q[a])?(c=Q[a][0],f=Q[a][1],f=d.getUrlOption(c)||f,d.removeUrlOption(c)):c=Q[a];var e=d.getApp(c);e&&!e.isRunning()&&(c==alloy.config.__eqqid?(c=Z(),b.debug("run EQQ in [reRunBeforeLoginApps],level:"+d.getLoginLevel()+": "+c,"_plogin"),d.runApp(alloy.config.__eqqid,{loginMode:c})):f?d.runApp(c,f):d.runApp(c))}d.setReRunAppList([])}b.profile("reRunBeforeLoginApps Finish!","portal!")};this.getDefaultRunApps=function(){T=T==null?[]:T;return[].concat([],[],T)};var $=function(){var a=decodeURIComponent(window.location.search);if(a.indexOf("appUrl")==-1&&(a=b.string.mapQuery(a).run||""))return b.json.parse(a)},aa=function(){var a=$();if(b.isObject(a))for(var c in a)alloy.portal.runApp(c,d.getUrlOption(c)||{runFrom:"url"});window.location.search.indexOf("_APPBOX")>-1&&alloy.util.report2qqweb("monitor|signin|fromqqclient");window.location.search.indexOf("CLIENT.QQ.PROFILE")>-1&&alloy.util.report2qqweb("monitor|signin|fromqqclientminicard")},da=function(a){if(b.isObject(a))for(var c in a)if(b.isObject(a[c])||b.isArray(a[c])){if(!arguments.callee.call(this,a[c]))return!1}else{if(!b.isNumber(a[c])&&/(\'|\")/g.test(a[c]))return b.error("urlApp option\u4e2dvalue\u503c\u7684\u5b57\u7b26\u4e32\u4e0d\u80fd\u5305\u542b\u5355\u53cc\u5f15\u53f7\uff01"),!1}else if(b.isArray(a))for(var d=0;d<a.length;d++)if(b.isObject(a[d])||b.isArray(a[d])){if(!arguments.callee.call(this,a[d]))return!1}else{if(!b.isNumber(a[d])&&/(\'|\")/g.test(a[c]))return b.error("urlApp option\u4e2dvalue\u503c\u7684\u5b57\u7b26\u4e32\u4e0d\u80fd\u5305\u542b\u5355\u53cc\u5f15\u53f7\uff01"),!1}else return!1;return!0},ea=function(){var a=$();if(b.isObject(a))for(var c in a)if(b.isObject(a[c]))da(a[c])?(a[c].runFrom="url",o={},~~c!=0&&!d.getAllConfig(c)&&(o.appMarket={page:"introduce",option:{appid:c},runFrom:"url"}),o[c]=a[c]):a[c].runFrom="url"};this.getUrlOption=function(a){return o&&o[a]||null};this.removeUrlOption=function(a){o&&delete o[a];o&&!a&&(o=null)};this.getIsAlloyJsReady=function(){return v};var X=function(){b.profile("reset start!","portal!");if(v){var a=d.getRunningAppStatus();if(a){N=!0;for(var c=0;c<a.appList.length;c++){var f=a.appList[c].appId;~~f&&(f="app"+f);(f=alloy.app[f])&&f.isRunning()&&f.exit()}N=!1}}h=!1;e.notifyObservers(alloy.portal,"reset",d.getLoginLevel());b.profile("reset finish!","portal!")},ba=function(){M=m=!0;b.profile("tryLogin start, tryLoginLevel:"+u,"portal!");qqweb.util.report2h("pass_ptlogin","start");typeof progress=="function"&&progress("pass_ptlogin");if(u>alloy.CONST.LOGIN_LEVEL_NONE)if(alloy.util.report2h("get_vfwebqq","start"),p=d.getCookieUin(),E){if(d.setUin(p),ca()?X():M=!1,u==alloy.CONST.LOGIN_LEVEL_ALL){d.setLoginLevel(alloy.CONST.LOGIN_LEVEL_ALL);b.debug("run EQQ in [tryLogin],tryLoginLevel:"+u,"_plogin");var a={directLogin:!0};if(d.getTryLoginState())a.loginState=d.getTryLoginState();d.runApp(alloy.config.__eqqid,a)}}else alloy.rpcService.sendGetSeftInfo(p);else p=0,d.setUin(p),fa();b.profile("tryLogin finish!","portal!")},fa=function(){e.notifyObservers(d,"SimpleUACReady",{uacLoaded:3})},ca=function(){return d.getUin()===d.getOldUin()?(b.debug("uin not change: "+d.getUin(),"_plogin"),!1):(b.debug("uin change: "+d.getOldUin()+" -> "+d.getUin(),"_plogin"),!0)},Y=function(){return x===q?(b.debug("loginLevel not change: "+x,"_plogin"),!1):(b.debug("loginLevel change: "+q+" -> "+x,"_plogin"),!0)},ga=function(){l||alloy.portal.recoverCookie()};this.longPoll=function(a){if(a)a=a.r,G=a.ssid,R=a.al;alloy.rpcService.psSend(alloy.CONST.PS_CGI_URL+"kl/poll",{context:d,method:"GET",timeout:61E3,data:{ssid:G},onSuccess:function(a){if(a.c==0)for(var a=a.r,c=a.ml,f=0;f<c.length;++f)b.event.notifyObservers(qqweb.portal,"message",c[f]);a.c!=22905?d.longPollIn():B<3&&(d.longPollLogin(),++B)},onError:function(){},onTimeout:function(){}})};this.longPollIn=function(){alloy.rpcService.psSend(alloy.CONST.PS_CGI_URL+"kl/poll",{context:d,method:"GET",timeout:61E3,data:{ssid:G},onSuccess:function(a){if(a.c==0)for(var a=a.r,c=a.ml,f=0;f<c.length;++f)b.event.notifyObservers(qqweb.portal,"message",c[f]);a.c!=22905?d.longPollIn():B<3&&(d.longPollLogin(),++B)},onError:function(){},onTimeout:function(){}})};this.longPollLogin=function(){alloy.rpcService.psSend(alloy.CONST.PS_CGI_URL+"kl/login",{context:d,method:"GET",timeout:1E4,data:{ct:1,sl:0,ua:1},onSuccess:function(a){a.c==0?d.longPoll(a):B<3&&(d.longPollLogin(),++B)},onError:function(){},onTimeout:function(){}})};this.initPushService=function(){b.browser.plugins.flash?c.id("socketFlash").innerHTML='<object style="position:absolute;left:1px;top:1px;" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9.0.45.0" width="1" height="1" id="Socket" align="middle">\t\t\t\t<param name="allowScriptAccess" value="always" />\t\t\t\t<param name="allowFullScreen" value="false" />\t\t\t\t<param name="movie" value="swf/Socket.swf?t=20111011001" /><param name="quality" value="high" /><param name="wmode" value="opaque" /><param name="bgcolor" value="#ffffff" /><embed src="swf/Socket.swf?t=20111011001" quality="high" wmode="opaque" bgcolor="#ffffff" width="1" height="1" name="Socket" align="middle" allowScriptAccess="sameDomain" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/go/getflashplayer_cn" />\t\t\t\t</object>':(d.longPollLogin(),W="longPoll")};var ia=function(){b.cookie.remove("ptwebqq",alloy.CONST.MAIN_DOMAIN)},ha=function(){var a=alloy.windowManager.getOnlyWidgetList(),b={},c,d;for(d in a)c=a[d],b[c.getAppId()]=c.desktopIndex;return b},O={onPortalReady:function(a){typeof progress=="function"&&progress("portalReady",0);h=!0;k++;b.profile("onPortalReady, portalReadyCount:"+k+", currentLevel:"+a+", oldLevel:"+q,"portal!");if(ca()||k==1){a=0;if(b.browser.ie==6||b.browser.ie==7)a=500;setTimeout(function(){var a=$();if(b.isObject(a))ea(),aa();else{ea();b.profile("runAppsInRunStatus Start!","portal!");d.getLoginLevel()<alloy.CONST.LOGIN_LEVEL_NOCHAT?a=alloy.config.getDefaultRunWidget():(alloy.config.removeFromRunStatusList(alloy.config.getDeleteAppList()),a=alloy.config.getRunStatus());if(a){T=T==null?[]:T;for(var c in a)T.push(c);var f,e;for(e in a)c=Number(e),f=a[e],d.runApp(c,{desktopIndex:f});b.profile("runAppsInRunStatus Finish!","portal!")}if(d.getLoginLevel()<alloy.CONST.LOGIN_LEVEL_NOCHAT){b.profile("runDefaultApps Start!","portal!");e=[];a=d.getLoginLevel();for(c=0;c<e.length;++c)e[c]==alloy.config.__eqqid?a!=3&&(f=Z(),b.debug("run EQQ in [runDefaultApps],level:"+a+": "+f,"_plogin"),d.runApp(alloy.config.__eqqid,{loginMode:f})):d.runApp(e[c]);b.profile("runDefaultApps Finish!","portal!")}t();aa();b.profile("runPopApps Start!","portal!");e=[];for(a=0;a<e.length;++a)switch(e[a]){default:d.runApp(e[a])}b.profile("runPopApps Finish!","portal!")}U()},a)}if(k==1){window.webTop&&webTop.ui.channel.postCmd(19);try{typeof pgvMain=="function"&&(window.webTop?pgvMain("",{virtualDomain:"web2.qq.com"}):pgvMain("",{virtualDomain:alloy.CONST.DEFAULT_DOMAIN})),qqweb.util.report2h("portal","end","ok"),qqweb.portal.speedTest.sRTS(8,"end",new Date,!0)}catch(c){}}d.getLoginLevel()>qqweb.CONST.LOGIN_LEVEL_NONE&&d.initPushService();a=b.string.mapQuery(location.href.toLowerCase());a.adtag&&a.adtag=="desktop"&&alloy.util.report2qqweb("monitor|signin|fromqqclient165desktop");alloy.system.runApp("explorer")},onExitSuccess:function(){location.reload()},onGetVfWebQQError:function(){b.profile("onGetVfWebQQError","portal!");qqweb.util.report2h("get_vfwebqq","end","error");d.setUin(0);d.setLoginLevel(qqweb.CONST.LOGIN_LEVEL_NONE);fa()},onGetVfWebQQSuccess:function(a){d.setLoginLevel(alloy.CONST.LOGIN_LEVEL_NOCHAT);d.setUin(p);r=a.result?a.result.vfwebqq:null;b.profile("onGetVfWebQQSuccess, vfwebqq:"+r,"portal!");qqweb.util.report2h("get_vfwebqq","end","ok");X();e.notifyObservers(alloy.portal,"GetLoginInfoSuccess",{isSelfInfoLoad:!0})},onGetLoginInfoSuccess:function(a){typeof progress=="function"&&progress("get_vfwebqq");qqweb.util.report2h("pass_ptlogin","end","ok");if(!a||!a.isSelfInfoLoad)alloy.util.report2h("get_selfinfo","start"),alloy.rpcService.sendGetUserInfo(alloy.portal.getUin())},onGetSelfInfoSuccess:function(a){if(a.retcode==0){var c=a.arguments.uin,d=a.result;if(alloy.portal.getUin()==c)d.uiuin=alloy.portal.getCookiePTUiUin(),alloy.portal.setPortalSelf(d),e.notifyObservers(alloy.portal,"selfInfoReady",alloy.portal.getPortalSelf()),qqweb.util.report2h("get_selfinfo","end",["ok"][a.retcode]||a.retcode),alloy.util.stat.report()}else b.error("[sendGetUserInfo\uff1a\u6570\u636e\u683c\u5f0f\u9519\u8bef] error: "+a.retcode+"-"+a.errmsg)},onSelfInfoReady:function(){b.profile("onSelfInfoReady","portal!");m&&(m=!1,M?(M=!1,alloy.config.init()):Y()&&t())},onReset:function(){},onUACReady:function(){v?e.notifyObservers(alloy.portal,"AlloyReady"):e.notifyObservers(alloy.portal,"FrameWorkReady")},onFrameWorkReady:function(){typeof progress=="function"&&progress("FrameWorkReady",100);alloy.layout.hideStartingCover();var a;a=b.browser.mobileSafari?1:0;var c=alloy.CONST.CDN_URL+"alloy/";g.loadCss(alloy.CONST.CDN_URL+"style/qqweb.main.2.css?t="+alloy.CONST.UPDATE_TIME_STAMP,{onSuccess:function(){}});g.loadScript(c+a+"/qqweb.part2.js?t="+alloy.CONST.UPDATE_TIME_STAMP,{onSuccess:function(){v=!0;e.notifyObservers(alloy.portal,"AlloyJsReady");e.notifyObservers(alloy.portal,"AlloyReady")}})},onAlloyJsReady:function(){typeof progress=="function"&&progress("AlloyJsReady",0);alloy.navbar.init();alloy.sound.init();alloy.hotkeyManager.init();alloy.hotkey.init();alloy.messageSystem.init();alloy.pushService.init();alloy.localStorage.init();alloy.windowFactory.registerWindow("Window",alloy.businessClass.Window);alloy.windowFactory.registerWindow("EqqWindow",alloy.businessClass.EqqWindow);alloy.windowFactory.registerWindow("Widget",alloy.businessClass.Widget)},onFirstScreenReady:function(){typeof progress=="function"&&progress("FirstScreenReady",0);var a=d.getLoginLevel();b.profile("onGetAppConfigComplete","portal!");try{e.notifyObservers(alloy.portal,"portalReady",a)}catch(c){b.error("portalReady, but [portalReady notify] error, level:"+a)}},onGetAppConfigComplete:function(){},onLoginLevelChange:function(){},onUpdateAppConfig:function(a){var b=d.getApp(a.id);b&&b.updateAppConfig(a)},onRemoveAppConfig:function(a){var b=d.getApp(a.id);b&&b.removeAppConfig(a);delete alloy.app["app"+a.id];d.setAppLoading(a.id,!1)},onAppRun:function(a){if(!(alloy.portal.getLoginLevel()==alloy.CONST.LOGIN_LEVEL_NONE||!alloy.portal.getVfWebQQ()||!Number(a)))if((a=alloy.portal.getAllConfig(a))&&!(a.preview||a.windowType!="widget"))a=ha(),alloy.rpcService.sendMSetConfigDelay({data:{0:{runWidgets:a}},delay:2E3})},onAppExit:function(a){if(!(alloy.portal.getLoginLevel()==alloy.CONST.LOGIN_LEVEL_NONE||!alloy.portal.getVfWebQQ()||N||a.preview)){var b=a.window||a.widget;if(b&&(a=Number(a.option.id))&&/(window)|(widget)/.test(b.windowType)){var c=alloy.portal.getAllConfig(a);if(c)if(c.selfConfig=c.selfConfig||{},b.windowType=="widget"){var d=b.getX(),b=b.getY();c.selfConfig.x=d;c.selfConfig.y=b;c={};c[a]={x:d,y:b};b=ha();b[a]=null;delete b[a];c[0]={runWidgets:b};alloy.rpcService.sendMSetConfigDelay({data:c,delay:1E3})}else if(b.option.resize){var d=b.getBodyWidth(),f=b.getBodyHeight(),b=b.getBoxStatus();c.selfConfig.defaultMode=b;c.selfConfig.width=d;c.selfConfig.height=f;c={};c.defaultMode=b;if(b!="fullscreen"&&b!="max")c.width=d,c.height=f;alloy.rpcService.sendSetConfig({data:{r:{appid:a,value:c}}})}}}},onThirdPartyAppExit:function(a){alloy.portal.unCacheOpenkey(a.option.id)}};this.init=function(){typeof progress=="function"&&progress("portal init");j={};K=0;qqweb.app.appKeyMap={};e.addObserver(qqweb.portal,"exitSuccess",O.onExitSuccess);e.addObserver(alloy.rpcService,"GetVfWebQQError",O.onGetVfWebQQError);e.addObserver(alloy.rpcService,"GetVfWebQQSuccess",O.onGetVfWebQQSuccess);e.addObserver(alloy.portal,"GetLoginInfoSuccess",O.onGetLoginInfoSuccess);e.addObserver(alloy.rpcService,"GetUserInfoSuccess",O.onGetSelfInfoSuccess);e.addObserver(alloy.portal,"selfInfoReady",O.onSelfInfoReady);e.addObserver(alloy.portal,"reset",O.onReset);e.addObserver(alloy.portal,"UACReady",O.onUACReady);e.addObserver(alloy.portal,"FrameWorkReady",O.onFrameWorkReady);e.addObserver(alloy.portal,"FirstScreenReady",O.onFirstScreenReady);e.addObserver(alloy.appconfig,"GetAppConfigComplete",O.onGetAppConfigComplete);e.addObserver(alloy.appconfig,"GetDefaultAppConfigComplete",O.onGetAppConfigComplete);e.addObserver(alloy.appconfig,"UpdateAppConfig",O.onUpdateAppConfig);e.addObserver(alloy.appconfig,"RemoveAppConfig",O.onRemoveAppConfig);e.addObserver(alloy.portal,"AlloyJsReady",O.onAlloyJsReady);e.addObserver(alloy.portal,"portalReady",O.onPortalReady);e.addObserver(alloy.portal,"appRun",O.onAppRun);e.addObserver(alloy.portal,"appExit",O.onAppExit);e.addObserver(alloy.portal,"appExit",O.onThirdPartyAppExit);e.addObserver(alloy.portal,"loginLevelChange",O.onLoginLevelChange);alloy.fileSystem.init();alloy.storage.init();alloy.desktopContact.init();alloy.desktopFolder.init();alloy.desktopFile.init();alloy.flashUploadManager.init();alloy.layout.init();alloy.layout.themeManager.init();e.addObserver(alloy.layout,"clickDesktop",ga);e.addObserver(alloy.layout,"desktopFocus",ga);b.profile("initAccount start!","portal!");C=d.getOriginalCookieUin();H=d.getCookieSkey();F=d.getCookiePtwebqq();y=d.getCookieUin();u=d.getUin()&&d.getSkey()?2:1;b.profile("initAccount finish!","portal!");ba();e.on(window,"unload",ia);qqweb.util.report2h("portal","end_runCoreApps","ok")};var ka=6E5,la=6E6,ma=42E6;this.changeCheckOpenKeyFrequency=function(a){ka=a.check*1E3;la=a.renewal*1E3;ma=a.reload*1E3;b.debug("set check frequency done","OpenKey")};var qa=function(){var a=+new Date;b.debug("check open key: "+a,"OpenKey");var c,d,f=!1,e;for(e in L)if(d=Number(e))f=!0,c=L[e],a-c.createTime>=ma?(b.debug("\u8fc7\u671f\u91cd\u62c9(appId: "+d+"):"+(a-c.createTime)/1E3,"OpenKey"),alloy.config.reRequestGrant({appId:d})):a-c.lastUpdateTime>=la&&(b.debug("\u7eed\u671f(appId: "+d+"):"+(a-c.lastUpdateTime)/1E3,"OpenKey"),alloy.config.renewalGrant({appId:d,openId:c.openId,openKey:c.openKey}));f||(clearInterval(V),V=0,b.debug("stop check open key","OpenKey"))};this.cacheOpenkey=function(a){var c=+new Date;a.renewal&&L[a.appId]?L[a.appId].lastUpdateTime=c:L[a.appId]={gaid:a.gaid,openKey:a.openKey,openId:a.openId,createTime:c,lastUpdateTime:c};V||(V=setInterval(qa,ka),b.debug("start check open key","OpenKey"))};this.unCacheOpenkey=function(a){L[a]&&(L[a]=null,delete L[a])};this.getCacheOpenkey=function(a){return L[a]};this.getPtwebqq=function(){return F};this.setPtwebqq=function(a){return F=a};this.getOldUin=function(){return z};this.getUin=function(){return y};this.getTryUin=function(){return p};this.getOriginalUin=function(){return C};this.setSecretKey=function(a){f=a};this.getSecretKey=function(){return f};this.setSecretIp=function(a){n=a};this.getSecretIp=function(){return n};this.acceptSocket=function(a){var a=decodeURI(a),c=b.json.parse(a);if(c.e==0)if(b.isUndefined(c.appid)){if(c.sid)R=c.al,alloy.util.report2qqweb("push|loginsuccess")}else b.event.notifyObservers(qqweb.portal,"message",c);else d.longPollLogin(),W="longPoll",b.error("PushService error: "+a),alloy.util.report2qqweb("push|loginfail")};this.reportAppState=function(a,f){if(W=="socket")if(P)for(var e=0;e<R.length;++e){if(a==R[e]){P.reportAppState&&P.reportAppState(a,f);break}}else P=b.browser.ie?c.id("Socket")||window.Socket:document.Socket;else for(e=0;e<R.length;++e)if(a==R[e]){alloy.rpcService.psSend(alloy.CONST.PS_CGI_URL+"kl/as",{context:d,method:"GET",timeout:1E4,data:{ssid:G,aid:a,s:f},onSuccess:function(){},onError:function(){},onTimeout:function(){}});break}};this.reportOpen=function(a){var c=b.json.parse(a);if(c.appid)b.event.notifyObservers(qqweb.portal,"message",c),b.event.notifyObservers(qqweb.portal,"message"+c.appId,a);else if(c.sid)R=c.al};this.getSkey=function(){return H};this.getUinAndSkey=function(){return{uin:y,skey:H}};this.getLoginLevel=function(){return x};this.setLoginLevel=function(a){a!=x&&(q=x,x=a,Y()&&(e.notifyObservers(alloy.portal,"loginLevelChange",a),a>1&&K<1&&d.addExitConfirm()),a!=1&&(a==2?q==1&&(alloy.util.report2qqweb("signin|visitortoweakness"),d.getPtwebqq()?alloy.util.report2qqweb("signin|visitortoweakness|signinwithptwebqq"):alloy.util.report2qqweb("signin|visitortoweakness|signin")):a==3&&(q==1?(alloy.util.report2qqweb("signin|visitortostrength"),alloy.util.report2qqweb("signin|visitortostrength|"+d.getTryLoginState())):q==2&&(d.isWithPtwebqqLogin()?(alloy.util.report2qqweb("signin|weaknesstostrength|signinwithptwebqq"),alloy.util.report2qqweb("signin|weaknesstostrength|signinwithptwebqq|"+d.getTryLoginState())):(alloy.util.report2qqweb("signin|weaknesstostrength|signin"),alloy.util.report2qqweb("signin|weaknesstostrength|signin|"+d.getTryLoginState()))))),d.setWithPtwebqqLogin(d.getPtwebqq()||!1))};this.getOldLoginLevel=function(){return q};this.setWithPtwebqqLogin=function(b){a=b};this.isWithPtwebqqLogin=function(){return a};this.isPortalReady=function(){return h};this.setUin=function(a){z=y;return y=a};this.recoverCookie=function(){};this.validatePTLoginSuccess=function(a){a=a||{};a=b.string.mapQuery(a.url);if(typeof a.login2qq==="undefined"&&(alloy.util.report2qqweb("monitor|nologinquery"),E))a.login2qq=1;if(Number(a.login2qq)===1){u=3;if(a=a.webqq_type||0)a=alloy.util.code2state(a),alloy.portal.setTryLoginState(a);alloy.portal.setTryLoginType(!0)}else u=2,alloy.portal.setTryLoginType(!1);b.profile("validatePTLoginSuccess, tryLoginLevel:"+u,"portal!");alloy.util.report2h("pass_ptlogin","start");C=d.getOriginalCookieUin();H=d.getCookieSkey();F=d.getCookiePtwebqq();ba();alloy.layout.hideLoginWindow()};this.setTryLoginState=function(a){D=a};this.getTryLoginState=function(){return D};this.setTryLoginType=function(a){E=a};this.getSSOForm=function(a){a=a||window.location.search;a=b.string.mapQuery(a).sso;if(!a)return{};var a=b.json.parse(a),c=a.skey,f=a.cgi,e=a.custom,g={};g[a.uin]=d.getUin();g[c]=d.getCookieSkey();b.extend(g,e);return{option:{method:"POST",data:g},cgi:f}};this.getCookieUin=function(){var a=b.cookie.get("uin",alloy.CONST.MAIN_DOMAIN),a=a?parseInt(a.substr(1),10):null;b.out("Cookie uin:"+a);return a};this.getCookiePTUiUin=function(){var a=b.cookie.get("ptui_loginuin",alloy.CONST.MAIN_DOMAIN);a||(a=void 0);b.out("PTUI uin:"+a);return a};this.getOriginalCookieUin=function(){return b.cookie.get("uin",alloy.CONST.MAIN_DOMAIN)};this.getCookieSkey=function(){return b.cookie.get("skey",alloy.CONST.MAIN_DOMAIN)};this.getCookiePtwebqq=function(){return b.cookie.get("ptwebqq",alloy.CONST.MAIN_DOMAIN)};var ra=function(a,b){alloy.rpcService.getAppInfo(a,["appName","appType","appUrl","iconUrl","id","category","exinfo","al","gaid"],function(c){if(c.retcode===0)c=c.result.resultData,c.preview=!0,alloy.appconfig.addAppConfigTemp(c),alloy.portal.runApp(a,b)})};this.runApp=function(a,c){if(v){var c=c||{},a=a=="eqq"?alloy.config.__eqqid:a,f=this.getAllConfig(a);if(!f)return b.out("id:"+a),f=c.runFrom,a=Number(a),c.preview?ra(a,c):a!=19&&(h?alloy.portal.runApp("appMarket",{page:"introduce",option:{appid:a},runFrom:f}):alert("\u56e0\u7f51\u7edc\u73af\u5883\u95ee\u9898\u5bfc\u81f4\u52a0\u8f7d\u5f02\u5e38\uff0c\u8bf7\u5c1d\u8bd5\u91cd\u65b0\u767b\u5f55\u3002")),!1;if(a=="appMarket"&&!h)return alert("\u56e0\u7f51\u7edc\u73af\u5883\u95ee\u9898\u5bfc\u81f4\u52a0\u8f7d\u5f02\u5e38\uff0c\u8bf7\u5c1d\u8bd5\u91cd\u65b0\u767b\u5f55\u3002"),!1;var e=this.getApp(a),c=d.getUrlOption(a)||c;e?(e.run&&(~~a>0&&!f.preview&&!f.selfConfigLoaded&&d.getLoginLevel()>alloy.CONST.LOGIN_LEVEL_NONE?(e=["width","height","defaultMode"],f.windowType=="widget"&&(e=["x","y"]),alloy.rpcService.sendGetConfig({arguments:{appConfig:f,option:c},data:{r:{appid:f.id,itemlist:e}},action:"get",onSuccess:na,onError:na})):(f.selfConfig&&b.extend(c,f.selfConfig),e.run(c),d.removeUrlOption(a))),c&&b.isFunction(c.callback)&&c.callback()):f&&(~~a>0?f.appType==1?alloy.portal.loadApp(f,c):f.appType==2&&(qqweb.app["app"+a]=new qqweb.businessClass.App(f),alloy.portal.runApp(a,c)):f.appType==1?alloy.portal.loadApp(f,c):f.appType==2&&(alloy.app[a]=new alloy.businessClass.App(f),alloy.portal.runApp(a,c)),d.removeUrlOption(a),d.removeUrlOption(a));f&&(S=!1);a==alloy.config.__eqqid&&b.platform.iPad&&alloy.sound.createIpadAudioObj();return!0}else alert("\u7cfb\u7edf\u52a0\u8f7d\u4e2d\uff0c\u8bf7\u7a0d\u540e\u3002\u3002\u3002")};this.loadApp=function(a,c){a=a||{};if(!this.getAppLoading(a.id)){this.setAppLoading(a.id,!0);var d=a.id,f=alloy.util.getAppRoot(d),e=f+(a.css||"style.css");f+=a.js||"main.js";(a.css||b.isNumber(d))&&g.loadCss(e+"?"+alloy.CONST.UPDATE_TIME_STAMP);g.loadScript(f+"?"+alloy.CONST.UPDATE_TIME_STAMP,{onSuccess:function(){alloy.portal.runApp(a.id,c)}})}};var na=function(a){var c=a.arguments.appConfig,f=a.arguments.option;if(a.retcode==0&&a.result){if(!b.isObject(a.result))a.result=b.json.parse(a.result);var a=a.result||{},e=["width","height","defaultMode"];c.windowType=="widget"&&(e=["x","y"]);var g=!0,t;for(t in e)e[t]in a||(g=!1),(a[e[t]]===null||typeof a[e[t]]==="undefined")&&delete a[e[t]];c.selfConfig=g?a:{}}else c.selfConfig={};c.selfConfigLoaded=!0;d.runApp(c.id,f)};this.getAppConfigList=function(){return alloy.appconfig.appConfigList};this.getAppConfig=function(a){return alloy.appconfig.getAppConfig(a)};this.getSystemConfig=function(a){return alloy.appconfig.getSystemConfig(a)};this.getAllConfig=function(a){return alloy.appconfig.getAllConfig(a)};this.getApp=function(a){return~~a>0?alloy.app["app"+a]:alloy.app[a]};this.shutdownApp=function(a){var b;if(b=d.getApp(a))b.isRunning()&&b.exit(),delete alloy.app["app"+a]};this.setAppLoading=function(a,b){return j[a]=b};this.getAppLoading=function(a){return j[a]};var ja="\u60a8\u786e\u5b9a\u8981\u79bb\u5f00\u201cQ+ Web\u201d\u5417\uff1f";this.setCloseHookMessage=function(a){ja=a};this.getCloseHookMessage=function(){return ja};this.closeHook=function(a){var c=ja;pgvSendClick({hottag:"web2qq.qqpanel.status.exitQQ"});if(b.browser.safari||b.browser.chrome)return c;else b.browser.ie>0?window.event.returnValue=c:a.returnValue=c};this.closeHookForHotKey=function(){alloy.hotkey.unstall()};var sa=function(){alloy.portal.getLoginLevel()==alloy.CONST.LOGIN_LEVEL_ALL&&(EQQ.logout(),WebqCore.api.log("browser-close-ok"),EQQ.RPCService._proxy&&EQQ.RPCService._proxy.abort(),EQQ.View.ChatBox&&EQQ.View.ChatBox.scaptureHotkey&&EQQ.View.ChatBox.scaptureHotkey.unstall())};this.addCloseHook=function(){A||(A=!0,e.on(window,"beforeunload",this.closeHook),e.on(window,"unload",sa))};this.addCloseHookForHotKey=function(){e.on(window,"unload",this.closeHookForHotKey)};this.removeCloseHook=function(){e.off(window,"beforeunload");A=!1};this.getCloseHook=function(){return A};this.addExitConfirm=function(a){K+=a||1;K>0&&this.addCloseHook();return K};this.removeExitConfirm=function(a){K-=a||1;K<1&&this.removeCloseHook();return K};this.getExitConfirm=function(){return K};var oa=function(a){var c=alloy.windowManager.getCurrentWindow();c&&c.getAppId();e.notifyObservers(alloy.portal,"exit");l=!0;G&&alloy.rpcService.psSend(alloy.CONST.PS_CGI_URL+"kl/logout",{context:d,method:"GET",timeout:1E4,data:{ssid:G},onSuccess:function(){},onError:function(){},onTimeout:function(){}});a||(b.cookie.remove("ptwebqq",alloy.CONST.MAIN_DOMAIN),b.cookie.remove("skey",alloy.CONST.MAIN_DOMAIN),b.cookie.remove("uin",alloy.CONST.MAIN_DOMAIN),b.cookie.remove("vfwebqq",alloy.CONST.MAIN_DOMAIN),b.out(">>>>> cookie.remove"));alloy.layout.hideDesktop();setTimeout(function(){e.notifyObservers(alloy.portal,"exitSuccess")},1E3);S&&pgvSendClick({hottag:"WEB2QQ.NOAPP.USER.ALL"})};this.exit=function(a){this.getExitConfirm()>0?I?(I.setWindowCentered(),I.setCurrent()):I=alloy.layout.confirm("\u60a8\u786e\u8ba4\u8981\u6ce8\u9500  Q+ Web \u5417\uff1f",function(){d.removeCloseHook();pgvSendClick({hottag:"web2qq.qqpanel.status.exitQQ"});alloy.util.report2qqweb("taskabr|start|exit|ok");oa(a)},{modal:!0,onClose:function(){I=null}}):oa(a)};this.restart=function(){this.exit(!0)};this.close=function(){window.webTop&&(qqweb.util.report2c(webTop.ui.channel.postCmd(25)),qqweb.util.report(),webTop.ui.channel.postCmd(21));alloy.portal.exit();e.notifyObservers(alloy.portal,"Exit");alloy.util.report2qqweb("taskbar|start|close")};this.getVfWebQQ=function(){return typeof EQQ!=="undefined"&&EQQ.getVfWebQQ&&EQQ.getVfWebQQ()&&EQQ.getIsLogin()?EQQ.getVfWebQQ():r?r:""};this.setVfWebQQ=function(a){r=a};this.getRunningAppStatus=function(){var a=alloy.windowManager.getCurrentWindow(),b="",c;a&&(b=a.getAppId());for(var a={currentAppId:b,appList:[]},b=alloy.windowManager.getWindowList(),d=0;d<b.length;d++){var f=b[d],e=f.getAppId();if(!(e==="eqq--"||e==="sceneChristmas")){c=f.getX();var g=f.getY();if(f.windowType==="window"){var t=f.getBoxStatus();if(t!=="min"){var h=f.getWidth(),f=f.getHeight();c={appId:e,defaultMode:t,x:c,y:g,width:h,height:f};e&&a.appList.push(c)}}else f.windowType==="widget"&&(c={appId:e,x:c,y:g},a.appList.push(c))}}return a};d.runSettingCenter=function(a){var b=["config_page_general","config_page_msg","config_page_bkg"];switch(a&&a.pageID||b[0]){case b[0]:return d.runApp("settingCenter");case b[1]:return d.runApp("notifications");case b[2]:return d.runApp("themeSetting")}};d.runAppMarket=function(a){return d.runApp("appMarket",a)};d.runBrowser=function(a){return d.runApp("6",a)};d.runQQ=function(a){return d.runApp(alloy.config.__eqqid,a)};d.runIME=function(a){return d.runApp("qqWebIme",a)};d.runHandWrite=function(a){return d.runApp("qqHandWrite",a)};this.openInWebBrowser=function(a){var a=a||{},c=this.getApp(6);return b.isUndefined(c)||!c.isRunning()?(a.isOpenNewTab=!0,alloy.portal.runApp("6",a)):(c.openUrl(a),a.callback&&a.callback(),!0)};this.isOpenFile=function(a){return b.array.indexOf(["jpg","jpeg","bmp","png","gif","txt","doc","docx","ppt","pptx","xls","xlsx","pdf"],a)>=0?1:0};this.openFile=function(a){if("type"in a)switch(a.type){case "image":case "img":case "pic":case "photo":case "jpg":case "jpeg":case "bmp":case "png":case "gif":alloy.portal.runApp("imgViewer",a);break;case "sound":case "music":case "audio":alloy.portal.runApp("audioPlayer",a);break;case "txt":case "doc":case "docx":case "ppt":case "pptx":case "xls":case "xlsx":case "pdf":alloy.portal.runApp("docViewer",a);break;default:alloy.system.alert("\u672a\u77e5\u6587\u4ef6\u7c7b\u578b")}};d.getLoginState=d.getLoginLevel;d.isAppInstalled=function(a){if(b.isArray(a.appId)){for(var c={},d=0;d<a.appId.length;d++)c[a.appId[d]]=alloy.config.isInSetupAppList(a.appId[d])?!0:!1;return c}else return alloy.config.isInSetupAppList(a.appId)?!0:!1};d.isAppRunning=function(a){return(a=d.getApp(a.appId))&&a.isRunning()?!0:!1};d.getAppInfo=function(a){var c={};c.appList=a.appList;c.onSuccess=a.onSuccess;c.onError=a.onError;if(!b.isArray(a.appList))c.appList=[],c.appList.push(a.appList);alloy.rpcService.getAppInfoMulti(c)};d.isLocked=function(){return qqweb.app.screenLocker&&qqweb.app.screenLocker.isLocked()?!0:!1};d.openURL=d.openInWebBrowser;d.search=function(a){a=a.keyword;if(a=="")return!1;a="http://www.soso.com/q?bid=203&cid=webq.a&ie=utf-8&w="+encodeURIComponent(a);d.openURL({url:a,title:"\u641c\u641csoso"})};d.onAirClientReady=function(){J={};var a=document.getElementById("webtopInstallerFlash");a.detectAppVersion("alloy.portal.onDetectAppVersion");a.setOnClick("alloy.portal.onWebTopInstallClick")};d.onAirInstallerInitFail=function(a){b.error(a)};d.onDetectAppVersion=function(a){J.appVersion=a||0};d.onWebTopSystemClickCb=function(a){d.onDetectAppVersion(a);alloy.navbar.showRunWebTopTip()};d.onWebTopInstallClick=function(){alloy.navbar.closeTip()};d.getAirRunTime=function(){return J};d.switchToDesktop=function(a,b){typeof a!=="undefined"&&webTop.ui.channel.postCmd(17,a,b);webTop.ui.channel.postCmd(18,255)};d.setWebTopNavBarOnTop=function(a){webTop.ui.channel.postCmd(26,a)};if(window.webTop){var pa=function(){var a=arguments[0];b.info("onWebTopCommand:"+a);var c=ta[a];c?c.apply(null,Array.prototype.slice.call(arguments,1)):alert("no such callback! - cmd: "+a)},ta={16:function(a){d.openInWebBrowser({url:a,title:"\u6d4f\u89c8\u7f51\u9875"})},17:function(a,b){alloy.navbar.setNavBarPosition(Number(a),Number(b));if(webTop.ui.channel.postCmd(22)){var c=alloy.layout.createBubble({hasCloseButton:!1});c.setTitle("\u8fd4\u56de\u7cfb\u7edf\u684c\u9762");c.setContent('<div class="webtop-sysbtn-thumb"></div>');c.showButton("ok","\u77e5\u9053\u5566");c.show({pointerPosition:"top left",target:alloy.navbar.getSystemButton()})}},18:function(a){alloy.desktopManager.setCurrentDesktop(a)},20:function(){if(!s){var a="\u60a8\u786e\u5b9a\u8981\u9000\u51fa  Q+ Web \u5417\uff1f";window.webTop&&(a="\u60a8\u786e\u5b9a\u8981\u9000\u51fa\u201c\u5ba2\u6237\u7aef\u201d\u5417\uff1f");s=alloy.layout.confirm(a,function(){alloy.portal.close()},{modal:!0,onClose:function(){s=null}})}},26:function(a){alloy.navbar.setNavBarOnTop(a,!0)},27:function(a){alloy.util.report2qqweb(a)},28:function(a){alloy.util.report2c(a)},29:function(a){b.info(a);eval("("+a+")")}};/QT\//.test(webTop.type)?webTop.ui.channel.onCmd.connect(pa):webTop.ui.channel.onCmd=pa}});Jet().$package("alloy.layout",function(b){var d=this,c=b.dom,e=b.event,g=b.fx.transitions,j=c.getDocumentElement(),l=document.body,q=c.id("startingCover"),u=document.title,p=null,v=c.id("desktop"),x=!0,m,o,h=!1,a={},f=[10,1E5,2E5,3E5,4E5],n,s,w,C,y,z,F,H,r=[],k=null,A=[{text:"\u663e\u793a\u684c\u9762",onClick:function(){qqweb.layout.showDesktop();qqweb.rpcService.reportQstatic("contextmenu|desktop|dispdesk")}},{text:"\u9501\u5b9a",onClick:function(){qqweb.portal.runApp("screenLocker");qqweb.rpcService.reportQstatic("contextmenu|desktop|lock")}},{type:"separator"},{text:"\u6dfb\u52a0",type:"submenu",items:[{text:"\u6dfb\u52a0\u5e94\u7528",icon:{className:"add_app_icon"},onClick:function(){alloy.system.runApp("appMarket");qqweb.util.report2qqweb("add|contextmenu|addapp")}},{text:"\u6dfb\u52a0\u684c\u9762\u8054\u7cfb\u4eba",icon:{className:"add_contact_icon"},onClick:function(){alloy.desktopContact.showSelectBuddyBox();qqweb.util.report2qqweb("add|contextmenu|adddeskcontanct")}}]},{text:"\u4e0a\u4f20\u6587\u4ef6",type:"flash",icon:{className:"add_file_icon"},onClick:function(){}},{text:"\u65b0\u5efa\u6587\u4ef6\u5939",icon:{className:"add_folder_icon"},onClick:function(){alloy.desktopFolder.createFolder();qqweb.util.report2qqweb("add|contextmenu|createfolder")}},{text:"\u7c98\u8d34",onClick:function(){var a=alloy.clipBoard.getData();if(a){var b=a.data,c=alloy.desktopManager.getCurrentDesktopIndex();a.pasteType==alloy.clipBoard.PASTE_TYPE.COPY?alloy.fileSystem.copyFile(b,c):alloy.fileSystem.moveFile(b,c,null,null,null,!0)}alloy.clipBoard.clear()}},{type:"separator"},{text:"QQ\u4e91\u8bcd\u5178",onClick:function(){qqweb.portal.runApp("qqWebDict");qqweb.rpcService.reportQstatic("contextmenu|desktop|clouddic")}},{type:"separator"},{text:"\u4e3b\u9898\u8bbe\u7f6e",onClick:function(){qqweb.portal.runApp("themeSetting");qqweb.rpcService.reportQstatic("contextmenu|desktop|theme")}},{text:"\u7cfb\u7edf\u8bbe\u7f6e",onClick:function(){qqweb.portal.runApp("settingCenter");qqweb.rpcService.reportQstatic("contextmenu|desktop|config")}},{text:"\u56fe\u6807\u8bbe\u7f6e",type:"submenu",beforeShow:function(a){alloy.desktopManager.getDesktopIconStyle()?(a.getItemAt(0).setIcon({className:"desktop_icon_style_checked"}),a.getItemAt(1).setIcon()):(a.getItemAt(0).setIcon(),a.getItemAt(1).setIcon({className:"desktop_icon_style_checked"}))},items:[{text:"\u5c0f\u56fe\u6807",onClick:function(){alloy.desktopManager.getDesktopIconStyle()!=1&&(alloy.desktopManager.setDesktopIconStyle(1,!0),qqweb.util.report2qqweb("iconchange|right|icon|small"))}},{text:"\u5927\u56fe\u6807",onClick:function(){alloy.desktopManager.getDesktopIconStyle()!=0&&(alloy.desktopManager.setDesktopIconStyle(0,!0),qqweb.util.report2qqweb("iconchange|right|icon|big"))}}]},{type:"separator"},{text:"\u53cd\u9988",onClick:function(){window.open("http://support.qq.com/discuss/513_1.shtml")}},{text:"\u6ce8\u9500",onClick:function(){qqweb.portal.exit();e.notifyObservers(qqweb.portal,"Exit");qqweb.rpcService.reportQstatic("contextmenu|desktop|quit")}}],D={layout_showdesktop:function(){qqweb.layout.showDesktop();alloy.util.report2qqweb("hotkey|showdesk")},layout_lock:function(){qqweb.portal.getLoginLevel()>qqweb.CONST.LOGIN_LEVEL_NONE&&(qqweb.portal.runApp("screenLocker"),alloy.util.report2qqweb("hotkey|lock"))},layout_exit:function(){qqweb.portal.getLoginLevel()>qqweb.CONST.LOGIN_LEVEL_NONE&&(alloy.util.report2qqweb("hotkey|signout"),qqweb.portal.exit(),e.notifyObservers(qqweb.portal,"Exit"))},layout_window_current_close:function(){var a=alloy.windowManager.getCurrentWindow();a&&a.isShow()&&(a.close(),alloy.util.report2qqweb("hotkey|close"))},layout_window_closeall:function(){for(var a=alloy.windowManager.getWindowList(),b,c=a.length-1;c>=0;c--)b=a[c],b.windowType=="window"&&b.close();alloy.util.report2qqweb("hotkey|closeallapp")},layout_window_goleft:function(){J(-1);alloy.util.report2qqweb("hotkey|tableft")},layout_window_goright:function(){J(1);alloy.util.report2qqweb("hotkey|tabright")},eqq_chatbox_classall:function(){for(var a=alloy.windowManager.getWindowList(),b,c=a.length-1;c>=0;c--)b=a[c],b.windowType=="chatbox"&&b.close();alloy.util.report2qqweb("hotkey|closeallchat")},eqq_chatbox_read:function(){if(qqweb.portal.getLoginLevel()==qqweb.CONST.LOGIN_LEVEL_ALL){var a=alloy.messageSystem.getLatestMessage();a&&(alloy.messageSystem.handleNotification(a.id),alloy.util.report2qqweb("hotkey|getmsg"))}},layout_screencaptrue:function(){if(alloy.portal.isWebTop())if(alloy.portal.getLoginLevel()==alloy.CONST.LOGIN_LEVEL_ALL){var a=alloy.windowManager.getCurrentWindow();a?alloy.portal.runApp("screenCapture2",{mode:a.mode,uin:a.uin,chatBoxType:a.chatBoxType}):alloy.portal.runApp("screenCapture2")}else alloy.portal.runApp("screenCapture2");else alloy.portal.runApp("screenCapture")},layout_desktop_goleft:function(){alloy.desktopManager.goPrevDesktop();alloy.util.report2qqweb("hotkey|screenleft")},layout_desktop_goright:function(){alloy.desktopManager.goNextDesktop();alloy.util.report2qqweb("hotkey|screenright")},layout_desktop_gospecific:function(a){a=Number(a.keyCode);a=a>96?a-97:a-49;alloy.desktopManager.setCurrentDesktop(a);alloy.util.report2qqweb("hotkey|screen"+a)},layout_desktop_gosystem:function(a){alloy.portal.switchToDesktop();a=Number(a.keyCode);a==48||a==96?alloy.util.report2qqweb("hotkey|0systemdesk"):a==113?alloy.util.report2qqweb("hotkey|f2systemdesk"):a==192?alloy.util.report2qqweb("hotkey|wavesystemdesk"):alloy.util.report2qqweb("hotkey|othersystemdesk")},layout_desktop_manage:function(){alloy.appManager.tooglePanel()},open_msg_manager:function(){alloy.portal.runApp("messageManager")}},E={};this.Panel=b.ui.Panel;this.PopupBox=b.ui.PopupBox;var I={stopPropagation:function(a){a.stopPropagation()},onClickDesktop:function(a){var b;a.target.tagName==="A"&&(b=a.target.getAttribute("href"))&&(b==="###"||b==="#")&&a.preventDefault();x=!0;e.notifyObservers(qqweb.layout,"clickDesktop")},onFocusDesktop:function(){x=!0;e.notifyObservers(alloy.layout,"desktopFocus")},onBlurDesktop:function(){x=!1;e.notifyObservers(alloy.layout,"desktopBlur")},onKeydownDesktop:function(a){e.notifyObservers(alloy.layout,"desktopKeydown",a)},onKeyupDesktop:function(a){e.notifyObservers(alloy.layout,"desktopKeyup",a)},onWindowResize:function(){var a=c.getClientWidth(),d=c.getClientHeight();b.browser.ie==6&&(a=a%2+a,d=d%2+d);if(n==a&&s==d)b.out("resize nothing");else{a=c.getClientWidth();d=c.getClientHeight();b.browser.ie==6&&(a=a%2+a,d=d%2+d);n=a;s=d;var f=!1;a>=z?(c.setStyle(j,"overflowX","hidden"),c.setStyle(v,"width",""),w=a):(f=!0,c.setStyle(j,"overflowX","auto"),c.setStyle(v,"width",z+"px"),w=z);d>=F?(c.setStyle(j,"overflowY","hidden"),c.setStyle(v,"height",""),C=d):(f=!0,c.setStyle(j,"overflowY","auto"),c.setStyle(v,"height",F+"px"),C=F);f?c.setStyle(v,"position","absolute"):c.setStyle(v,"position","static");c.setStyle(l,"height",C+"px");q&&(c.setStyle(q,"width",w+"px"),c.setStyle(q,"height",C+"px"));e.notifyObservers(alloy.layout,"desktopResize")}},onDesktopContextmenu:function(a){if(c.hasClass(a.target,"zoomWallpaper")||c.hasClass(a.target,"desktopContainer")||c.hasClass(a.target,"appListContainer")){a.preventDefault();var b;alloy.portal.getLoginLevel()==alloy.CONST.LOGIN_LEVEL_NONE?(b=A.concat(),b.splice(5,2)):b=A;alloy.layout.showContextMenu({x:a.clientX,y:a.clientY},{beforeShow:G,items:b});qqweb.rpcService.reportQstatic("contextmenu|desktop")}}},K=function(){E={};if(window.webTop)alloy.hotkeyManager.getHotkeyInfo("layout_desktop_gosystem").disable=!1;for(var a in D){var b=D[a],c=alloy.hotkeyManager.getHotkeyInfo(a);if(!c.disable)for(var d in c.keys){var f=c.keys[d];E[""+(f.ctrlKey?1:0)+(f.shiftKey?1:0)+(f.altKey?1:0)+"_"+f.keyCode]={keyId:a,action:b}}}};this.removeHotKeyAction=function(a){D[a]=null;delete D[a];K()};this.getIsFocusOnDesktop=function(){return x};var N=function(){alloy.iconFactory.init()},M=function(a){if(alloy.hotkeyManager.isHotkeyEnable()){var b=""+(a.ctrlKey?1:0)+(a.shiftKey?1:0)+(a.altKey?1:0)+"_"+a.keyCode;if(E[b]){var c=alloy.hotkeyManager.getHotkeyInfo(E[b].keyId);!c.disable&&(!alloy.hotkeyManager.isHotkeyLimited()||!c.limit)&&E[b].action(a)}}},J=function(a){var b=alloy.windowManager.getOnlyWindowList(),c=alloy.windowManager.getCurrentWindow(),d;if(c)for(var f=0,e=b.length;f<e;f++){if(d=b[f],c==d){c=f;(d=b[c+=a])?d.setCurrent():c<0?(d=b[b.length-1],d.setCurrent()):c>=b.length&&(d=b[0],d.setCurrent());break}}else b.length>0&&b[b.length-1].setCurrent()},Q=new b.fx.Animation({element:q,property:"opacity",from:1,to:0,unit:!1,duration:1E3,fps:30,transition:g.sinusoidal.easeOut});e.addObserver(Q,"end",function(){c.hide(q)});var R=new b.fx.Animation({element:v,property:"opacity",from:1,to:0,unit:!1,duration:1E3,fps:30,transition:g.sinusoidal.easeOut});e.addObserver(R,"end",function(){c.hide(v)});var G=function(a){if(alloy.portal.getLoginLevel()!=alloy.CONST.LOGIN_LEVEL_NONE){var b=alloy.clipBoard.getData(),c=alloy.clipBoard.CLIP_BOARD_TYPE;b&&(b.type==c.FILE||b.type==c.FOLDER)?a.getItemAt(6).enable():a.getItemAt(6).disable()}},W=function(){b.profile("DesktopCreate");var f=c.id("desktopWrapper"),g=c.id("topBar"),h=c.id("bottomBar"),k=c.id("rightBar"),n=c.id("leftBar");a.topArea=g;a.bottomArea=h;a.mainArea=f;a.leftArea=n;a.rightArea=k;if(b.browser.mobileSafari)f=c.id("touchpad"),c.show(f),f.src=qqweb.CONST.MAIN_URL+"./touchpad.html?20101021001",e.on(l,"touchmove",function(a){a.touches&&a.touches.length==1&&a.preventDefault()},!0);f=H.createPanel({id:"desktop",name:"desktop",container:d.getBody(),body:v,html:""});e.on(v,"contextmenu",I.onDesktopContextmenu);e.on(window,"resize",I.onWindowResize);if(b.browser.mobileSafari)e.on(window,"orientationchange",I.onWindowResize);e.on(v,"click",I.onClickDesktop);e.on(document,"keydown",I.onKeydownDesktop);e.on(document,"keyup",I.onKeyupDesktop);"onfocusin"in document?(e.on(document,"focusin",I.onFocusDesktop),e.on(document,"focusout",I.onBlurDesktop)):(e.on(window,"focus",I.onFocusDesktop),e.on(window,"blur",I.onBlurDesktop));b.profile("DesktopCreateFinish");return f},P=b.Class({init:function(){this.panelList=[]},createPanel:function(a){var a=a||{},c=new b.ui.Panel(a);this.panelList[a.id]=c;b.out("createPanel:"+a.name,"layout");return c},getPanel:function(a){return this.panelList[a]}});this.init=function(){b.browser.mobileSafari?(z=680,F=640):(z=320,F=100);H=this.panelManager=new P;W();alloy.windowFactory.init();alloy.windowManager.init();alloy.desktopManager.init({initializeLength:5});if(b.browser.firefox)setTimeout(I.onWindowResize,100);else I.onWindowResize();e.addObserver(qqweb.portal,"AlloyJsReady",N);e.addObserver(alloy.layout,"desktopKeyup",M);alloy.dock.init({dragController:alloy.desktopManager.getDragController()});alloy.taskBar.init();K()};this.getArea=function(b){return a[b+"Area"]};this.getAreaWidth=function(b){return(b=a[b+"Area"])?c.getWidth(b):0};this.getAreaHeight=function(b){return b==="bottom"?30:(b=a[b+"Area"])?c.getHeight(b):0};this.getAvailableWidth=function(){return this.getDesktopWidth()-this.getAreaWidth("left")-this.getAreaWidth("right")};this.getAvailableHeight=function(){return this.getDesktopHeight()-this.getAreaHeight("top")-this.getAreaHeight("bottom")};this.setDesktopWidth=function(a){return w=a};this.setDesktopHeight=function(a){return C=a};this.getDesktopWidth=function(){return w};this.getDesktopHeight=function(){return C};this.getDesktopSize=function(){return{width:w,height:C}};this.getAvailSize=function(){return{width:this.getAvailableWidth(),height:this.getAvailableHeight()}};this.getClientWidth=function(){return n=n||c.getClientWidth()};this.getClientHeight=function(){return s=s||c.getClientHeight()};this.getClientSize=function(){return{width:d.getClientWidth(),height:d.getClientHeight()}};this.getDesktop=function(){return H.getPanel("desktop")};this.getBody=function(){return l};this.getMaskLayer=function(a){return a?(a=new b.ui.MaskLayer({appendTo:this.getDesktop().body,zIndex:1,opacity:0.5}),a.reset(),a):(o||(o=new b.ui.MaskLayer({appendTo:this.getDesktop().body,zIndex:1,opacity:0.5})),o.reset(),o)};this.getPanel=function(a){return H.getPanel(a)};this.getTopZIndex=function(a){if(b.isUndefined(a)||!f[a])a=0;return f[a]++};this.getThemeManager=function(){};this.showDesktop=function(){for(var a=[],b,c=alloy.windowManager.getCurrentWindow(),d=alloy.windowManager.getWindowList(),f=0;f<d.length;f++)b=d[f],b.windowType!=="widget"&&b.isShow&&b.isShow()&&(b.min(),a.push(b));if(a.length>0)r=a,k=c;else{k&&!k.isDestroy&&k.setCurrent();for(f=0;f<r.length;f++)r[f].show()}};this.setTitle=function(a,b){b.roll=b.roll||!1;b.speed=b.speed||500;if(b.roll){if(!(a.length<1))u=document.title,p&&clearInterval(p),p=setInterval(function(){document.title=a;a=a.substr(1)+a.charAt(0)},b.speed)}else u=document.title,document.title=a};this.resetTitle=function(){p&&(clearInterval(p),p=null);document.title=u};this.setIe9IconOverLay=function(a){var b=alloy.CONST.DOMAIN,c=["overlay1","overlay2","overlay3","overlay4","overlay5","overlay6","overlay7","overlay8","overlay9","overlay10"];if(a==0)try{window.external.msSiteModeClearIconOverlay()}catch(d){}else if(a<10)try{window.external.msSiteModeSetIconOverlay("http://"+b+"/"+c[a-1]+".ico","overlay "+a),window.external.msSiteModeActivate()}catch(f){}else if(a>=10)try{window.external.msSiteModeSetIconOverlay("http://"+b+"/"+c[9]+".ico","overlay 10"),window.external.msSiteModeActivate()}catch(e){}};this.messagebox=function(a,b){b=b||{};b.innerHtml=a;b.appendTo=b.appendTo||alloy.desktopManager.getCurrentDesktop().getElement();return(new alloy.businessClass.MessageBox(b)).Window};this.alert=function(a,b,c){c=c||{};c.onAccept=b;c.innerHtml=a;c.appendTo=c.appendTo||alloy.desktopManager.getCurrentDesktop().getElement();return(new alloy.businessClass.MessageBox.Alert(c)).Window};this.confirm=function(a,b,c){c=c||{};c.onAccept=b;c.innerHtml=a;c.appendTo=c.appendTo||alloy.desktopManager.getCurrentDesktop().getElement();return(new alloy.businessClass.MessageBox.Confirm(c)).Window};this.createBubble=function(a){a=a||{};a.bubbleParent=a.bubbleParent||qqweb.layout.getDesktop().body;a.zIndex=a.zIndex||qqweb.layout.getTopZIndex(4);return new b.ui.Bubble(a)};this.getBubble=function(){y||(y=this.createBubble());return y};this.showContextMenu=function(a,c){m||(m=new b.ui.ContextMenu({container:alloy.layout.getDesktop().body}));m.setZIndex(alloy.layout.getTopZIndex(3));m.setStyle("width",c.width?c.width+"px":"140px");m.clearItems();m.addItems(c.items);m.setArgument(c.argument);c.beforeShow&&c.beforeShow.call(m,m);m.show(a.x,a.y,a.offset);c.afterShow&&c.afterShow.call(m,m);return m};this.hideLoginWindow=function(){var a;if(a=c.id("ifram_login"))a.src=alloy.CONST.MAIN_URL+"domain.html";try{h.close(),h=null}catch(b){}};this.showLoginBox=this.showLoginWindow=function(a,c,f,e){a={width:380,height:320,title:"\u767b\u5f55Q+ Web",hasCloseButton:!0,isSetCurrent:!0,isSetCentered:!0,dragable:!0,src:"",modal:!0,zIndex:d.getTopZIndex(3),appendTo:d.getDesktop().body,onClose:function(){h=null}};alloy.portal.setTryLoginType(c);f=f||"online";alloy.portal.setTryLoginState(f);f=alloy.util.state2code(f);alloy.portal.setWithPtwebqqLogin(!!alloy.portal.getPtwebqq());var g=encodeURIComponent(window.location.protocol+"//"+window.location.host+"/loginproxy.html"),k="",e=e||"",k="";if(e)c?(d.loginWindowInfoHeight=!1,k='<div id="login_window_info" class ="login_window_info login_window_info2">'+e+"</div>"):(d.loginWindowInfoHeight=!0,k='<div id="login_window_info" class ="login_window_info">'+e+"</div>");c?(a.src="http://ui.ptlogin2.qq.com/cgi-bin/login?target=self&style=5&mibao_css=m_webqq&appid=1003903&enable_qlogin=0&no_verifyimg=1&s_url="+g+"&f_url=loginerroralert&strong_login=1&login_state="+f+"&t="+alloy.CONST.UPDATE_TIME_STAMP,k='            <div id="login_window_content_area" class="login_content_area"><div class="login_logo_qq"></div>'+k+'<div class="login_window_wrap">            <iframe id="ifram_login"  src="'+a.src+'" scrolling="no" frameborder="no" allowtransparency="true" scrolling="hidden" hidefocus ></iframe>                    </div></div>'):(a.src="http://ui.ptlogin2.qq.com/cgi-bin/login?target=self&style=5&mibao_css=m_webqq&appid=1003903&enable_qlogin=0&no_verifyimg=1&s_url="+g+"&f_url=loginerroralert&strong_login=0&login_state="+f+"&t="+alloy.CONST.UPDATE_TIME_STAMP,k='<div id="login_window_content_area" class="login_content_area"><div class="login_logo_webqq"></div>'+k+'<div class="login_window_wrap">            <iframe id="ifram_login"  src="'+a.src+'" scrolling="no" frameborder="no" allowtransparency="true" scrolling="hidden" hidefocus ></iframe>                    </div></div>');h=new b.ui.Boxy(a);h.getPanel().setHtml(k);return h};this.setLoginWindowHeight=function(a){d.loginWindowInfoHeight&&(a+=18);h.getPanel().setHeight(a);if(b.browser.ie&&b.browser.ie<7){var f=c.id("login_window_content_area");c.setStyle(f,"height",a+"px")}};this.hideStartingCover=function(){b.browser.ie==6?setTimeout(function(){c.hide(q)},500):Q.start();window.webTop&&webTop.ui.channel.postCmd(23)};this.hideDesktop=function(){R.start()};this.showWebTopInstallBox=function(){if(b.platform.win)window.open("http://dl_dir.qq.com/qqfile/web/webqq/WebQQ_1.2.46.400.exe","_blank");else{var a=alloy.CONST.CDN_URL+"swf/webtopInstall.swf?t="+alloy.CONST.UPDATE_TIME_STAMP,d=alloy.layout.messagebox('<div class="airInstallPopup">        <div class="airInstallPopupContent">            <object id="webtopInstallFlash" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="385" height="164" align="middle">                <param name="movie" value="'+a+'" />                <param name="quality" value="high" />                <param name="bgcolor" value="#ffffff" />                <param name="play" value="true" />                <param name="loop" value="true" />                <param name="wmode" value="window" />                <param name="scale" value="showall" />                <param name="menu" value="true" />                <param name="devicefont" value="false" />                <param name="salign" value="" />                <param name="allowScriptAccess" value="always" />                <param name="flashvars" value="oninstall=alloy.layout.onAirInstallSuccess&onruntimeready=alloy.layout.onRuntimeReady&version=1.1.30&url=http://dl_dir.qq.com/qqfile/web/webqq/WebQQ.air" />                <embed src="'+a+'" FlashVars="oninstall=alloy.layout.onAirInstallSuccess&onruntimeready=alloy.layout.onRuntimeReady&version=1.1.30&url=http://dl_dir.qq.com/qqfile/web/webqq/WebQQ.air"                     quality="high" wmode="transparent" bgcolor="#ffffff" width="385" height="164" name="main" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/go/getflashplayer_cn" />            </object>        </div>        <div id="airInstallTip">            <span class="mytip">\u201c\u5ba2\u6237\u7aef\u201d\u652f\u6301Windows\u3001Mac\u3001Linux\u7b49\u7cfb\u7edf\u3002</span>            <div class="mytip2">\u5982\u679c\u5728\u7ebf\u5b89\u88c5\u5931\u8d25\uff0c\u60a8\u4e5f\u53ef\u4ee5\u624b\u52a8\u4e0b\u8f7d\u5b89\u88c5\uff0c\u6b65\u9aa4\u5982\u4e0b\uff1a</div>            <ol class="mylinks">                <li id="airDownloadLinkArea" class="link">                <a href="http://dl_dir.qq.com/qqfile/web/webqq/win/AdobeAIRInstaller.exe" target="_blank"  class="webtop_down_link_win">\u4e0b\u8f7dAdobe Air\u73af\u5883</a>                <a href="http://dl_dir.qq.com/qqfile/web/webqq/mac/AdobeAIR.dmg" target="_blank" class="webtop_down_link_mac">\u4e0b\u8f7dAdobe Air\u73af\u5883</a>                <select id="airDownloadSelect" class="webtop_down_link_linux" >                    <option value="">\u4e0b\u8f7dAdobe Air\u73af\u5883</option>                    <option value="http://dl_dir.qq.com/qqfile/web/webqq/lin/AdobeAIRInstaller.bin">Adobe AIR for Linux(.bin)</option>                    <option value="http://dl_dir.qq.com/qqfile/web/webqq/lin/adobeair.i386.rpm">Adobe AIR for Linux(.rpm)</option>                    <option value="http://dl_dir.qq.com/qqfile/web/webqq/lin/adobeair.deb">Adobe AIR for Linux(.deb)</option>                </select>                <span>\uff08\u82e5\u5df2\u5b89\u88c5\u53ef\u8df3\u8fc7\u6b64\u6b65\uff09</span>                </li>                <li id="airDownloadLinkArea2" class="link2">                    <a href="http://dl_dir.qq.com/qqfile/web/webqq/WebQQ.air" target="_blank">\u4e0b\u8f7dQ+ Web\u5ba2\u6237\u7aef</a></li>            </ol>        </div>        <div id="airCloseTip">            <div class="closeText">\u60a8\u73b0\u5728\u53ef\u4ee5\u5173\u95ed\u5f53\u524d\u6d4f\u89c8\u5668\u7a97\u53e3\uff0c\u4f7f\u7528"\u5ba2\u6237\u7aef"\u3002</div>            <a href="###" class="myBtn" id="airInstalledSureBtn">\u786e\u5b9a</a>        </div>    </div>',{title:"\u201c\u5ba2\u6237\u7aef\u201d\u4e0b\u8f7d",width:385,height:268}),f=c.id("airInstalledSureBtn");e.on(f,"click",function(a){a.preventDefault();e.off(f,"click");d.close()});a=c.id("airDownloadLinkArea");e.on(a,"click",function(a){var b=a.target.href;if(b)return a.preventDefault(),window.open(b,"_blank"),!1});b.platform.linux&&(a=c.id("airDownloadSelect"),e.on(a,"change",function(){var a=this.options[this.selectedIndex];a.value&&window.open(a.value,"_blank")}))}};this.onAirInstallSuccess=function(){var a=c.id("airInstallTip"),b=c.id("airCloseTip");a&&b&&(c.hide(a),c.show(b))};this.onRuntimeReady=function(){var a=c.id("airDownloadLinkArea");a&&c.hide(a)}});
Jx().$package("alloy.dock",function(b){var d=this,c=b.dom,e=b.event,g,j,l,q,u,p,v,x,m,o,h=0,a={},f={},n,s,w,C=function(a,b){r.onDockMenuItemClick(a,b)},y=[{text:"\u5411\u5de6\u505c\u9760",icon:{className:"dock_menu_item_left"},argument:{location:"left"},onClick:C},{text:"\u5411\u4e0a\u505c\u9760",icon:{className:"dock_menu_item_top"},argument:{location:"top"},onClick:C},{text:"\u5411\u53f3\u505c\u9760",icon:{className:"dock_menu_item_right"},argument:{location:"right"},onClick:C}],z=function(){var a=alloy.portal.getSystemConfig("appMarket");w=alloy.iconFactory.createIcon("app",{className:"appMarket",longTouchable:!1,deleteable:!1,icon:{url:alloy.CONST.CDN_URL+"style/images/appmarket.png?20111011001"},contextMenu:[{text:"\u6253\u5f00\u5e94\u7528\u5e02\u573a",onClick:function(){alloy.portal.runApp("appMarket")}},{type:"separator"},{text:"\u5378\u8f7d",enable:!1}],onClick:function(){if(w.isNotifyShow()){alloy.portal.runApp("appMarket",{page:"all",option:{cat:-1,orderBy:2}});if(alloy.portal.getLoginLevel()>1){var a={context:this,action:"reset",data:{appid:1E6,value:{appReadTime:(new Date).getTime()}}};alloy.rpcService.sendSetConfigNew(a)}alloy.util.report2qqweb("screen|appmarket|new")}else alloy.portal.runApp("appMarket"),alloy.util.report2qqweb("screen|appmarket");w.hideNotify();return!1}},a);u.parentNode.insertBefore(w.getElement(),u);c.hide(w.getElement())},F=function(){var a=alloy.portal.getSystemConfig("diskExplorer");s=alloy.iconFactory.createIcon("app",{className:"diskExplorer",longTouchable:!1,deleteable:!1,icon:{url:alloy.CONST.CDN_URL+"style/images/diskexplorer.png?20111011001"},contextMenu:[{text:"\u6253\u5f00\u4e91\u5b58\u50a8",onClick:function(){alloy.system.getLoginLevel()>1?alloy.system.runApp("diskExplorer"):alloy.layout.showLoginWindow("diskExplorer")}},{type:"separator"},{text:"\u5378\u8f7d",enable:!1}],onClick:function(){alloy.system.getLoginLevel()>1?alloy.system.runApp("diskExplorer"):alloy.layout.showLoginWindow("diskExplorer");return!1}},a);u.parentNode.insertBefore(s.getElement(),u);c.hide(s.getElement())},H=function(){if(!b.platform.iPad&&!b.cookie.get("cloudstoragetip")&&!alloy.windowManager.getWindow("-100")){var a=alloy.windowFactory.createWindow("Window",{windowId:"-100",title:"\u4e91\u5b58\u50a8",modeSwitch:!0,dragable:!0,resize:!0,hasCloseButton:!0,width:539,height:378});a.setHtml('<div style="width:539px;height:378px;background:url(http://0.web.qstatic.com/webqqpic/style/images/cloud-storage.jpg)"></div>');e.addObserver(a,"close",function(){b.cookie.set("cloudstoragetip",1,alloy.CONST.DOMAIN,"/",1440)})}},r={onQuickListContainerDragMove:function(){},onAlloyJsReady:function(){z();F();e.addObserver(alloy.sound,"SoundMuteChange",r.onSoundSettingChange)},onPortalReady:function(){c.show(w.getElement());c.show(s.getElement());H();alloy.portal.getLoginLevel()>alloy.CONST.LOGIN_LEVEL_NONE&&alloy.rpcService.sendGetNewAppCount()},onGetNewAppCountSuccess:function(a){var b=w;b&&(a.result.allcount==0?b.hideNotify():b.showNotify(a.result.allcount),a.appReadTime&&(n=a.appReadTime||(new Date).getTime()))},onDockContextMenu:function(a){a.preventDefault();a.stopPropagation();alloy.layout.showContextMenu({x:a.clientX,y:a.clientY},{items:y,beforeShow:function(){this.setClass("dock_menu_select_"+m)}})},onDockMenuItemClick:function(a,b){var c=b.option.argument.location;d.setDockLocation(c,!0);alloy.util.report2qqweb("contextmenu|desktop|dock|"+c)},onQuickListContainerDrop:function(a){var b=a.apperceiveEl,d=b.getAttribute("type"),f=a.pos,e=c.getXY(u),a=parseInt(b.getAttribute("fileId"));if(!isNaN(a)){f=m=="top"?Math.ceil((f.x-e[0]-29)/58):Math.ceil((f.y-e[1]-29)/58);f<0?f=0:f>5&&(f=5);d={t:d,id:a};b.getAttribute("from");var g;(g=alloy.fileSystem.getFileInfoByFile(d))&&alloy.fileSystem.moveFile(g.file,5,f,g.parent.id,g.position,!0)}},onDesktopSwitchStatus:function(a){a.status===alloy.desktopManager.DESK_STATUS.EDIT?c.addClass(g.children[0],"appButtonEditState"):c.removeClass(g.children[0],"appButtonEditState")},onUACReady:function(){var a=alloy.config.configList.dockLoca||"left";m!==a&&d.setDockLocation(a)},onDockDragStart:function(){c.show(l);c.show(q);c.show(j.top);c.show(j.left);c.show(j.right);k();alloy.util.report2qqweb("dockpositon|drag")},onDockDragEnd:function(){c.hide(l);c.hide(q);c.hide(j.top);c.hide(j.left);c.hide(j.right);x!==m&&(setTimeout(function(){d.setDockLocation(x,!0)},0),alloy.util.report2qqweb("dockpositon|dragto"+x))},onDockDragMove:function(a){var b=a.orientEvent.pageX,a=a.orientEvent.pageY,c=alloy.layout.getClientWidth(),d=alloy.layout.getClientHeight(),b=a<d*0.2?"top":b<c/2?"left":"right";b!==x&&k(b)},onFileAdd:function(){},onFileMove:function(a){if(a.targetId==5)if(a.sourceId==5){var b=f[alloy.iconFactory.getIconId(a.file.t,a.file.id)],c=a.targetPosition;a.targetPosition>a.sourcePosition&&c++;D(b,c)}else A(a.file,a.targetPosition);else a.sourceId==5&&E(a.file)},onFileDelete:function(a){a.parent.id==5&&E(a.file)},onClearDefaultApp:function(){I()},onGetAppConfigError:function(){I();alloy.appconfig.getAllConfig(50)&&A({id:50,t:"app"})},onGetAppConfigComplete:function(){b.profile("DockButton Create");var a=alloy.fileSystem.getFolderById(5).items;I();for(var c=0;c<a.length&&c<5;c++)A(a[c]);b.profile("DockButton CreateFinish")},onPinyinClick:function(){alloy.portal.runApp("qqWebIme")},onSettingClick:function(){alloy.portal.runApp("settingCenter")},onThemeClick:function(){alloy.portal.runApp("themeSetting")},onSoundClick:function(){alloy.sound.isMute()?alloy.sound.setMute(!1):alloy.sound.setMute(!0)},stopPropagation:function(a){a.stopPropagation()},onStartClick:function(a){a.preventDefault();alloy.startMenu.toggleStartMenu(a.target)},onSoundSettingChange:function(b){b?(c.addClass(a.sound,"dock_tool_sound_mute"),a.sound.title="\u53d6\u6d88\u9759\u97f3"):(c.removeClass(a.sound,"dock_tool_sound_mute"),a.sound.title="\u9759\u97f3")},onToolListClick:function(a){var b=qqweb.util.getActionTarget(a);if(b){var c=b.getAttribute("cmd");c&&r["on"+c+"Click"]&&(a.preventDefault(),r["on"+c+"Click"](b))}},onStorageSpaceChanged:function(){var a=alloy.util.formatFileSize(alloy.storage.getTotalUsedSpace()),b=alloy.util.formatFileSize(alloy.storage.getTotalSpace());s.setTitle("\u4e91\u5b58\u50a8 "+a+"/"+b)}},k=function(a){x=a||m;c.setClass(j.top,"dock_drap_effect dock_drap_effect_top");c.setClass(j.left,"dock_drap_effect dock_drap_effect_left");c.setClass(j.right,"dock_drap_effect dock_drap_effect_right");c.setClass(j[x],"dock_drap_effect dock_drap_effect_"+x+" dock_drap_effect_current")};this.setDockLocation=function(a,b,d){if("left right top".indexOf(a)!=-1){var f=m;x=m=a;var h=alloy.layout.getArea(a);h.appendChild(g);v&&(c.setStyle(v,"width","0px"),c.setStyle(v,"height","0px"));v=h;a=="left"||a=="right"?(c.setStyle(h,"width","73px"),c.setStyle(h,"height","100%")):(c.setStyle(h,"width","100%"),c.setStyle(h,"height","73px"));c.setClass(g,"dock_container dock_pos_"+a);if(b){if(alloy.portal.getLoginLevel()>alloy.CONST.LOGIN_LEVEL_NONE)alloy.config.configList.dockLoca=a,d?alloy.rpcService.sendMSetConfigDelay({data:{0:{dockLoca:a}},delay:d}):alloy.rpcService.sendSetConfig({data:{r:{appid:0,value:{dockLoca:a}}}});alloy.util.report2qqweb("dockpositon|"+a)}e.notifyObservers(alloy.dock,"DockLocationChanged",{loca:a,oldLoca:f})}};this.getDockLocation=function(){return m};this.getDockHeight=function(){return parseInt(c.getClientHeight(g))};var A=function(a,c){var d;a:{d={parentNode:u};var e=alloy.fileSystem.FILE_TYPE;if(a.t==e.APP){e=alloy.appconfig.getAppConfig(a.id);if(!e){b.profile('Dock createFileIcon. id="'+a.id+'" appConfig is null',"Dock");alloy.fileSystem.deleteFile(a,null,null,null,!1);d=null;break a}d=alloy.iconFactory.createIcon(a.t,d,e)}else if(a.t==e.BUDDY||a.t==e.GROUP)d=alloy.iconFactory.createIcon(a.t,d,a);else if(a.t==e.FOLDER||a.t==e.FILE)d.file=a,d=alloy.iconFactory.createIcon(a.t,d,a);else{d=null;break a}d&&(f[d.getId()]=d,h++,o.addDragClass(d.getElement()))}d&&D(d,c)},D=function(a,c){var d=a.getElement();if(b.isUndefined(c))u.appendChild(d);else{var f=u.childNodes;f[c]?u.insertBefore(d,f[c]):u.appendChild(d)}},E=function(a){if(a=f[a.t+"_"+a.id])f[a.getId()]=null,delete f[a.getId()],h--,a.destroy()},I=function(){for(var a in f){var b=f[a];f[a]=null;delete f[a];b.destroy()}h=0};this.isInDock=function(a){return!b.isUndefined(f[a])};this.getDockItemCount=function(){return h};this.getMaxDockItemCount=function(){return 5};this.getDragController=function(){return o};this.getAppIdList=function(){for(var a=[],b=u.children,c=0,d=b.length;c<d;c++)a.push(parseInt(b[c].getAttribute("appId")));return a};this.setUpdateUacTime=function(a){n=a};this.getUpdateUacTime=function(){return n};this.init=function(k){f={};h=0;b.profile("Dock Create");o=k.dragController;g=c.node("div",{id:"dockContainer","class":"dock_container"});g.innerHTML='            <div class="dock_middle">                <div id="dockItemList" class="dock_item_list"></div>                <div id="dockToolList" class="dock_tool_list">                    <div class="dock_tool_item">                        <a href="###" class="dock_tool_icon dock_tool_pinyin" cmd="Pinyin" title="QQ\u4e91\u8f93\u5165\u6cd5"></a>                        <a href="###" class="dock_tool_icon dock_tool_sound" cmd="Sound" title="\u9759\u97f3"></a>                    </div>                    <div class="dock_tool_item">                        <a href="###" class="dock_tool_icon dock_tool_setting" cmd="Setting" title="\u7cfb\u7edf\u8bbe\u7f6e"></a>                        <a href="###" class="dock_tool_icon dock_tool_theme" cmd="Theme" title="\u4e3b\u9898\u8bbe\u7f6e"></a>                    </div>                    <div class="dock_tool_item2">                        <a href="###" class="dock_tool_icon dock_tool_start" title="\u70b9\u51fb\u8fd9\u91cc\u5f00\u59cb"></a>                    </div>                </div>            </div>        ';k=alloy.layout.getDesktop().body;k.appendChild(g);u=c.id("dockItemList");p=c.id("dockToolList");a.pinyin=c.mini(".dock_tool_pinyin",p)[0];a.sound=c.mini(".dock_tool_sound",p)[0];a.setting=c.mini(".dock_tool_setting",p)[0];a.theme=c.mini(".dock_tool_theme",p)[0];a.start=c.mini(".dock_tool_start",p)[0];e.on(p,"click",r.onToolListClick);e.on(a.start,"click",r.stopPropagation);e.on(a.start,"click",r.onStartClick);c.setStyle(g,"zIndex",alloy.layout.getTopZIndex());d.setDockLocation("left");e.on(g,"contextmenu",r.onDockContextMenu);u.setAttribute("customAcceptDrop",1);e.addObserver(u,"dragmove",r.onQuickListContainerDragMove);e.addObserver(u,"drop",r.onQuickListContainerDrop);o.addDropTarget({el:u,level:1});j={top:c.node("div",{"class":"dock_drap_effect dock_drap_effect_top"}),left:c.node("div",{"class":"dock_drap_effect dock_drap_effect_left"}),right:c.node("div",{"class":"dock_drap_effect dock_drap_effect_right"})};k.appendChild(j.top);k.appendChild(j.left);k.appendChild(j.right);l=c.node("div",{"class":"dock_drap_proxy"});k.appendChild(l);q=c.node("div",{"class":"dock_drap_mask"});q.innerHTML='<div class="dock_drop_region_top" name="top" cmd="region"></div><div class="dock_drop_region_left" name="left" cmd="region"></div><div class="dock_drop_region_right" name="right" cmd="region"></div>';k.appendChild(q);k=new b.ui.Drag(g,l);e.addObserver(k,"start",r.onDockDragStart);e.addObserver(k,"move",r.onDockDragMove);e.addObserver(k,"end",r.onDockDragEnd);e.addObserver(alloy.rpcService,"SendGetNewAppCountSuccess",r.onGetNewAppCountSuccess);e.addObserver(qqweb.portal,"AlloyJsReady",r.onAlloyJsReady);e.addObserver(alloy.portal,"portalReady",r.onPortalReady);e.addObserver(alloy.storage,"StorageSpaceChanged",r.onStorageSpaceChanged);b.profile("Dock CreateFinish");e.addObserver(alloy.fileSystem,"FileMove",r.onFileMove);e.addObserver(alloy.fileSystem,"FileAdd",r.onFileAdd);e.addObserver(alloy.fileSystem,"FileDelete",r.onFileDelete);e.addObserver(alloy.appconfig,"ClearDefaultApp",r.onClearDefaultApp);e.addObserver(alloy.appconfig,"GetAppConfigComplete",r.onGetAppConfigComplete);e.addObserver(alloy.appconfig,"GetDefaultAppConfigComplete",r.onGetAppConfigComplete);e.addObserver(alloy.appconfig,"GetAppConfigError",r.onGetAppConfigError);e.addObserver(alloy.portal,"UACReady",r.onUACReady);e.addObserver(alloy.portal,"DesktopSwitchStatus",r.onDesktopSwitchStatus)}});
Jx().$package("alloy.startMenu",function(b){var d=this,c=b.dom,e=b.event,g,j,l,q,u,p,v,x={weibo:{url:"http://t.qq.com/Qplus_Web",title:"\u5b98\u65b9\u5fae\u535a"},support:{url:"http://support.qq.com/portal/discuss_pdt/513_1.html",title:"\u53cd\u9988\u8bba\u575b"},blog:{url:"http://webqq.qzone.qq.com",title:"\u5b98\u65b9\u535a\u5ba2"},question:{url:"http://service.qq.com/category/webQQ.html",title:"\u5e38\u89c1\u95ee\u9898"},imqq:{url:"http://www.qplus.com/productForWeb.shtml",title:"Q+\u5b98\u65b9\u7f51\u7ad9 -\u4ea7\u54c1\u4e2d\u5fc3"},download:{url:"http://www.qplus.com/productForPC.shtml",title:"Q+\u5b98\u65b9\u7f51\u7ad9 -\u4ea7\u54c1\u4e2d\u5fc3"}},m={stopPropagation:function(a){a.stopPropagation()},onStartMenuBodyClick:function(b){var c=alloy.util.getActionTarget(b,2);if(c&&c!="help")switch(l.hide(),b.preventDefault(),b.stopPropagation(),b=c.getAttribute("cmd"),b){case "home":pgvSendClick({hottag:"WEB2QQ.TASKBAR.HOMEPAGE.LOGIN"});alloy.util.report2qqweb("taskbar|start|homepage");alloy.util.setHomePage();break;case "favorite":pgvSendClick({hottag:"WEB2QQ.TASKBAR.FAVORITE.LOGIN"});alloy.util.report2qqweb("taskbar|start|favorite");alloy.util.addFavorite();break;case "shortcut":pgvSendClick({hottag:"WEB2QQ.TASKBAR.SHORTCUT.LOGIN"});alloy.util.report2qqweb("taskbar|start|desktop");open("./QPlusWeb.url");break;case "lock":alloy.portal.runApp("screenLocker");pgvSendClick({hottag:"WEB2QQ.TASKBAR.SCREENLOCKER.LOGIN"});alloy.util.report2qqweb("taskbar|start|screenlocker");break;case "setting":alloy.portal.runApp("settingCenter");pgvSendClick({hottag:"WEB2QQ.TASKBAR.SETTING.LOGIN"});alloy.util.report2qqweb("taskbar|start|setting");break;case "logout":alloy.portal.exit();e.notifyObservers(alloy.portal,"Exit");window.webTop&&webTop.ui.channel.postCmd(23);pgvSendClick({hottag:"WEB2QQ.TASKBAR.EXIT.LOGIN"});alloy.util.report2qqweb("taskbar|start|exit");break;case "exit":a();break;case "download":w(x.download);break;case "support":window.open(x[b].url);break;case "helper":y();break;case "about":f()}},onHelpMenuClick:function(a){var b=alloy.util.getActionTarget(a,2);if(b)switch(a.preventDefault(),a=b.getAttribute("cmd"),a){case "hot":alloy.util.report2qqweb("taskbar|help|tips");alloy.app.tips.showNews();break;case "weibo":w(x[a]);alloy.util.report2qqweb("taskbar|help|officialmicroblog");break;case "support":window.open(x[a].url);alloy.util.report2qqweb("taskbar|help|support");break;case "report":C();break;case "blog":w(x[a]);alloy.util.report2qqweb("taskbar|help|officialblog");break;case "helper":y();break;case "question":w(x[a]);alloy.util.report2qqweb("taskbar|help|faq");break;case "imqq":w(x[a])}},onHelpMenuMouseenter:function(){v&&(clearTimeout(v),v=0)},onHelpMenuMouseleave:function(){s()},onStartHeplerBtnMouseover:function(){f()},onStartHeplerBtnClick:function(a){a.preventDefault();a.stopPropagation();f()},onStartHeplerBtnMouseout:function(){s()},onStartMenuBodyMouseover:function(a){var b;((b=a.target).tagName=="LI"||(b=a.target.parentNode).tagName=="LI")&&c.setClass(b,"taskbar_start_menu_hover")},onStartMenuBodyMouseout:function(a){var b;((b=a.target).tagName=="LI"||(b=a.target.parentNode).tagName=="LI")&&c.setClass(b,"")},onHelpMenuMouseover:function(a){(a=alloy.util.getActionTarget(a,2))&&c.setClass(a,"taskbar_help_menu_hover")},onHelpMenuMouseout:function(a){(a=alloy.util.getActionTarget(a,2))&&c.setClass(a,"")},onSelfInfoAreaClick:function(a){a.preventDefault();if(alloy.portal.getLoginLevel()==alloy.CONST.LOGIN_LEVEL_NONE)alloy.layout.showLoginWindow(""),alloy.util.report2qqweb("taskbar|start|signin");else if(a=parseInt(this.getAttribute("uin"),10))alloy.portal.runApp("userDetails",a),alloy.util.report2qqweb("taskbar|start|profile")},onSelfInfoReady:function(a){p.title="\u7f16\u8f91\u4e2a\u4eba\u8d44\u6599";p.innerHTML=a.htmlNick;p.setAttribute("uin",a.uin)},onUserAvatarChanged:function(){}},o=function(){j||d.init();l.setZIndex(alloy.layout.getTopZIndex(3));var a=alloy.dock.getDockLocation(),b=c.getXY(g),f,e;a=="left"?(f=b[0]+60,e=b[1]-200):a=="right"?(f=b[0]-210,e=b[1]-200):a=="top"&&(f=b[0]-120,e=b[1]+60);l.setXY(f,e);l.show()},h=function(){l.hide()};this.showStartMenu=o;this.hideStartMenu=h;this.toggleStartMenu=function(a){g=a||g;l&&l.isShow()?h():o();pgvSendClick({hottag:"WEB2QQ.TASKBAR.START.LOGIN"});alloy.util.report2qqweb("taskbar|start")};this.getStartMenuHeight=function(){return c.getClientHeight(u)};this.getStartMenuPos=function(){return c.getXY(u)};var a=function(){var a="\u60a8\u786e\u5b9a\u8981\u9000\u51fa  Q+ Web \u5417\uff1f";window.webTop&&(a="\u60a8\u786e\u5b9a\u8981\u9000\u51fa\u201c\u5ba2\u6237\u7aef\u201d\u5417\uff1f");alloy.layout.confirm(a,function(){alloy.portal.close()},{modal:!0});alloy.util.report2qqweb("taskbar|start|quit")},f=function(){if(!q){var a='                <div class="taskbar_help_menu_head">                </div>                <div class="taskbar_help_menu_body">                    <div class="taskbar_help_menu_text">\u4f60\u7684\u5728\u7ebf\u5e94\u7528\u6570\u636e\u5e73\u53f0\uff0c\u5b9e\u73b0\u672c\u5730\u4e0e\u4e91\u7aef\u65e0\u7f1d\u5207\u6362</div>                    <a href="###" cmd="imqq" class="taskbar_help_menu_link" title="http://www.qplus.com/productForWeb.shtml">http://www.qplus.com/productForWeb.shtml</a>                    <a href="###" cmd="report" class="taskbar_help_menu_link" title="\u9519\u8bef\u4e0a\u62a5">\u9519\u8bef\u4e0a\u62a5</a>                </div>                <div class="taskbar_help_menu_bottom">                    <span class="taskbar_help_menu_bottom_text">\u53cd\u9988:</span>                    <a href="###" cmd="weibo" class="helpMenuImg taskbar_help_menu_weibo" title="\u5b98\u65b9\u5fae\u535a">&nbsp;</a>\t\t\t\t\t<a href="###" cmd="blog" class="helpMenuImg taskbar_help_menu_blog" title="\u5b98\u65b9\u535a\u5ba2">&nbsp;</a>\t\t\t\t\t<a href="###" cmd="question" class="helpMenuImg taskbar_help_menu_question" title="\u5e38\u89c1\u95ee\u9898">&nbsp;</a>                </div>';b.browser.ie&&(a+='<iframe width="100%" height="100%" class="fullscreen_bg_iframe"></iframe>');var d=c.node("div",{"class":"helpMenuImg taskbar_help_menu_container"});c.hide(d);alloy.layout.getDesktop().body.appendChild(d);q=new alloy.layout.PopupBox({container:d,parentPopupBox:l,html:a});e.on(d,"click",m.onHelpMenuClick)}v&&(clearTimeout(v),v=0);q.setZIndex(alloy.layout.getTopZIndex(3));q.show()},n=function(){q.hide()},s=function(){v&&(clearTimeout(v),v=0);v=setTimeout(n,200)},w=function(a){alloy.portal.openInWebBrowser(a)},C=function(){alloy.layout.confirm("<div style='margin:10px 20px 20px;text-indent:24px;text-align:left;line-height:24px;'>\u5982\u679c\u60a8\u9047\u5230\u9875\u9762\u5f02\u5e38\uff0c\u53ef\u4ee5\u53cd\u9988\u9875\u9762\u9519\u8bef\u65e5\u5fd7\uff0c\u4ee5\u4fbf\u7cfb\u7edf\u5c3d\u5feb\u5b9a\u4f4d\u95ee\u9898\uff0c\u53cd\u9988\u8fc7\u7a0b\u4e2d\u4e0d\u4f1a\u66b4\u9732\u60a8\u7684\u4efb\u4f55\u9690\u79c1\u4fe1\u606f\u3002\u662f\u5426\u53cd\u9988\u672c\u6b21\u9875\u9762\u9519\u8bef\u65e5\u5fd7\uff1f<div>",function(){alloy.util.LogReport()},{title:"\u9519\u8bef\u62a5\u544a",width:365,height:100,modal:!0});alloy.util.report2qqweb("taskbar|help|report")},y=function(){alloy.portal.runApp("helper");pgvSendClick({hottag:"WEB2QQ.TASKBAR.HELPER.LOGIN"});alloy.util.report2qqweb("taskbar|help|helper")},z=['<li cmd="home"><a href="###" title="\u8bbe\u4e3a\u4e3b\u9875">\u8bbe\u4e3a\u4e3b\u9875</a></li>','<li cmd="favorite"><a href="###" title="\u6dfb\u52a0\u5230\u6536\u85cf\u5939">\u6dfb\u52a0\u5230\u6536\u85cf\u5939</a></li>','<li cmd="shortcut"><a href="###" target="_blank" title="\u4fdd\u5b58\u684c\u9762\u5feb\u6377\u65b9\u5f0f">\u4fdd\u5b58\u684c\u9762\u5feb\u6377\u65b9\u5f0f</a></li>','<li cmd="lock"><a href="###" title="\u9501\u5b9a">\u9501\u5b9a</a></li>','<li cmd="setting"><a href="###" title="\u7cfb\u7edf\u8bbe\u7f6e">\u7cfb\u7edf\u8bbe\u7f6e</a></li>','<li id="taskbar_helpButton" cmd="about"  title="\u5173\u4e8eQ+ Web"><a href="###">\u5173\u4e8eQ+ Web</a></li>','<li cmd="logout"><a href="###"  title="\u9000\u51fa" class="logout_botton"></a></li>','<li cmd="exit"><a href="###" title="\u9000\u51fa">\u9000\u51fa</a></li>','<li cmd="download"><a href="###" title="\u4e0b\u8f7d\u5ba2\u6237\u7aef">\u4e0b\u8f7d\u5ba2\u6237\u7aef</a></li>','<li cmd="helper"><a href="###" title="\u65b0\u624b\u6307\u5bfc">\u65b0\u624b\u6307\u5bfc</a></li>'],F=[1,2,8,5,9];this.init=function(){for(var a=[],d=0;d<F.length;++d)a.push(z[F[d]]);a='            <div id="taskbar_start_menu_body" class="startMenuImg taskbar_start_menu_body">                <div id="startMenuSelfInfo" class="taskbar_start_menu_selfinfo" uin="0">                    <div id="startMenuSelfNick" class="taskbar_start_menu_nick">\u8bf7&nbsp;<a href="###">\u767b\u5f55</a></div>                    <a cmd="support" class="startMenuImg startMenuTopControl_support" href="###" title="\u53cd\u9988">&nbsp;</a>                    <a cmd="lock" class="startMenuImg startMenuTopControl_lock" href="###" title="\u9501\u5b9a">&nbsp;</a>                </div>                <ul class="taskbar_start_menu">'+a.join("")+'</ul>                <a href="###" cmd="logout" title="\u6ce8\u9500\u5f53\u524d\u7528\u6237" class="startMenuImg logout_botton"></a>            </div>            ';b.browser.ie&&(a+='<iframe width="100%" height="100%" class="fullscreen_bg_iframe"></iframe>');u=c.node("div",{"class":"taskbar_start_menu_container",id:"startMenuContainer"});u.innerHTML=a;alloy.layout.getDesktop().body.appendChild(u);a=!1;b.browser.mobileSafari&&(a=!0);l=new alloy.layout.PopupBox({container:u,noCatchMouseUp:a});p=c.id("startMenuSelfNick");c.id("startMenuSelfInfo");if(alloy.portal.getLoginLevel()>alloy.CONST.LOGIN_LEVEL_NONE)m.onSelfInfoReady(alloy.system.getPortalSelf());a=c.id("taskbar_start_menu_body");e.on(p,"click",m.onSelfInfoAreaClick);e.on(a,"click",m.onStartMenuBodyClick);b.browser.ie==6&&(e.on(a,"mouseover",m.onStartMenuBodyMouseover),e.on(a,"mouseout",m.onStartMenuBodyMouseout));j=!0;e.addObserver(alloy.portal,"selfInfoReady",m.onSelfInfoReady);e.addObserver(alloy.portal,"UserAvatarChanged",m.onUserAvatarChanged);e.addObserver(alloy.portal,"SelfInfoChanged",m.onSelfInfoReady)}});
Jx().$package("alloy.appManager",function(b){var d=this,c=b.dom,e=b.event,g,j=[],l,q,u,p,v,x={},m,o=function(){g=c.node("div",{id:"appManagerPanel","class":"appManagerPanel"});g.innerHTML='                <a class="aMg_close" href="###"></a>                <div class="aMg_dock_container" customAcceptDrop=1 index=5></div>                <div class="aMg_line_x"></div>                <div class="aMg_folder_container">                    <div class="folderItem">                        <div class="folder_bg folder_bg1"></div>                        <div class="folderOuter" customAcceptDrop=1 index=0><div class="folderInner" customAcceptDrop=1 index=0></div></div>                    </div>                    <div class="folderItem ">                        <div class="folder_bg folder_bg2"></div>                        <div class="folderOuter" customAcceptDrop=1 index=1><div class="folderInner" customAcceptDrop=1 index=1></div></div>                        <div class="aMg_line_y"></div>                    </div>                    <div class="folderItem ">                        <div class="folder_bg folder_bg3"></div>                        <div class="folderOuter" customAcceptDrop=1 index=2><div class="folderInner" customAcceptDrop=1 index=2></div></div>                        <div class="aMg_line_y"></div>                    </div>                    <div class="folderItem ">                        <div class="folder_bg folder_bg4"></div>                        <div class="folderOuter" customAcceptDrop=1 index=3><div class="folderInner" customAcceptDrop=1 index=3></div></div>                        <div class="aMg_line_y"></div>                    </div>                    <div class="folderItem ">                        <div class="folder_bg folder_bg5"></div>                        <div class="folderOuter" customAcceptDrop=1 index=4><div class="folderInner" customAcceptDrop=1 index=4></div></div>                        <div class="aMg_line_y"></div>                    </div>                </div>';document.body.appendChild(g);l=c.mini(".aMg_dock_container",g)[0];m=c.mini(".aMg_folder_container",g)[0];q=c.mini(".folderItem",g);u=c.mini(".folderInner",g);p=c.mini(".folderOuter",g);v=new b.ui.Sortables([],"id");b.array.forEach(p,function(a,c){j[c]=new b.ui.ScrollBar(a,{ipadTouchArea:!0})});v.addDropTarget({el:l,level:0});e.addObserver(l,"drop",h.onDockContainerDrop);b.array.forEach(p,function(a){v.addDropTarget({el:a,level:0});e.addObserver(a,"drop",h.onFolderContainerDrop)});var a=c.mini(".aMg_close",g)[0];e.on(a,"click",n);e.addObserver(v,"start",h.onDragStart);e.addObserver(alloy.layout,"desktopResize",F);e.addObserver(alloy.fileSystem,"FileMove",h.onFileMove)},h={onDragStart:function(){alloy.util.report2app("navbar|fullview|move")},onFolderContainerDrop:function(a){var b=a.apperceiveEl,d=b.getAttribute("type"),f=a.pos,e=a.currentDropTarget,a=parseInt(e.getAttribute("index"));xy=c.getXY(e);e=parseInt(b.getAttribute("fileId"));if(!isNaN(e)){f=Math.floor((f.y+j[a].getScrollTop()-xy[1])/35);d={t:d,id:e};b.getAttribute("from");var g;(g=alloy.fileSystem.getFileInfoByFile(d))&&alloy.fileSystem.moveFile(g.file,a,f,null,null,!0)}},onDockContainerDrop:function(a){var b=a.apperceiveEl,d=b.getAttribute("type"),f=a.pos,e=a.currentDropTarget,a=parseInt(e.getAttribute("index"));xy=c.getXY(e);e=parseInt(b.getAttribute("fileId"));if(!isNaN(e)){f=Math.floor((f.x-80)/70);f>5&&(f=5);f<0&&(f=0);d={t:d,id:e};b.getAttribute("from");var g;(g=alloy.fileSystem.getFileInfoByFile(d))&&alloy.fileSystem.moveFile(g.file,a,f,g.parent.id,g.position,!0)}},onFileMove:function(b){if(b.targetId>=0&&b.targetId<5){if(b.targetId==b.sourceId){var c=f(b.file.id,b.file.t);if(c){var c=c.getElement(),d=c.parentNode;d.removeChild(c);var e=b.targetPosition;d.childNodes[e]?d.insertBefore(c,d.childNodes[e]):d.appendChild(c)}}else if((c=f(b.file.id,b.file.t))&&a(c,b.sourceId,b.sourcePosition),c=y([b.file],b.targetId)[0])c=c.getElement(),d=c.parentNode,e=b.targetPosition,d.childNodes[e]&&d.insertBefore(c,d.childNodes[e]);j[b.targetId]&&j[b.targetId].update();j[b.sourceId]&&j[b.sourceId].update()}else if((c=f(b.file.id,b.file.t))&&a(c,b.sourceId,b.sourcePosition),c=C([b.file],b.targetId)[0])c=c.getElement(),d=c.parentNode,e=b.targetPosition+1,b.sourceId==5&&d.removeChild(c),d.childNodes[e]&&d.insertBefore(c,d.childNodes[e])}},a=function(a){a=x[a.getId()];delete x[a.getId()];a.destroy()},f=function(a,b){typeof b!=="undefined"&&(a=b+"_"+a);return x[a]},n=function(a){a&&a.preventDefault();g&&(d.hide(),c.show(alloy.layout.getDesktop().body))};this.close=n;var s=function(){l.innerHTML="";b.array.forEach(u,function(a){a.innerHTML=""});var a=alloy.fileSystem.getFolderById(5);w();C(a.items);for(var a=[],c=0;c<5;c++){var d=alloy.fileSystem.getFolderById(c);a.push(d);y(d.items,c)}},w=function(){var a=alloy.portal.getSystemConfig("appMarket");appMarketButton=alloy.iconFactory.createIcon(alloy.fileSystem.FILE_TYPE.APP,{className:"appMarket",longTouchable:!1,deleteable:!1,isShowNotify:!1,parentNode:l,icon:{url:alloy.CONST.CDN_URL+"style/images/appmarket.png?20111011001"},onClick:function(){d.close();alloy.portal.runApp("appMarket");return!1}},a)},C=function(a){var c=[],f={parentNode:l,longTouchable:!1,isShowNotify:!1},g=function(){d.close();alloy.util.report2app("navbar|fullview|runapp")},h;for(h in a){var n=z(a[h],b.clone(f));c.push(n);e.addObserver(n,"iconclick",g)}return c},y=function(a,c){var f=[],g={parentNode:u[c],longTouchable:!1,isShowNotify:!1,className:"amg_folder_appbutton"},h=function(){d.close();alloy.util.report2app("navbar|fullview|runapp")},n;for(n in a){var j=z(a[n],b.clone(g));f.push(j);e.addObserver(j,"iconclick",h)}return f},z=function(a,c){var d,f=alloy.fileSystem.FILE_TYPE;if(a.t==f.APP)d=alloy.appconfig.getAppConfig(a.id),d=alloy.iconFactory.createIcon(a.t,c,d);else if(a.t==f.BUDDY||a.t==f.GROUP)d=alloy.iconFactory.createIcon(a.t,c,a);else if(a.t==f.FOLDER||a.t==f.FILE)c.file=a,d=alloy.iconFactory.createIcon(a.t,c,a);x[d.getId()]=d;b.platform.iPad||v.addDragClass(d.getElement());return d},F=function(){var a=alloy.layout.getDesktopHeight()-80;c.setStyle(m,"height",a+"px");b.browser.ie==6&&(a=alloy.layout.getClientWidth(),c.setStyle(m,"width",(a/5%1>0.5?a+2:a)+"px"));b.array.forEach(j,function(a){a.update()})};this.tooglePanel=function(){g&&c.isShow(g)?this.close():this.show()};this.show=function(){g||o();alloy.util.report2app("navbar|fullview");alloy.desktopManager.setDesktopStatus(alloy.desktopManager.DESK_STATUS.MANAGE);s();c.hide(alloy.layout.getDesktop().body);c.show(g);b.array.forEach(q,function(a){setTimeout(function(){c.addClass(a,"folderItem_turn")},0)});F()};this.hide=function(){c.hide(g);alloy.util.report2app("navbar|fullview|exit");alloy.desktopManager.setDesktopStatus(alloy.desktopManager.DESK_STATUS.NORMAL);b.array.forEach(q,function(a){c.removeClass(a,"folderItem_turn")})}});
Jx().$package(
	"alloy.taskBar",
	function(b){
		var d=this,
			c=b.dom,
			e=b.event,
			g=b.string;
		this.init=function(){
			alloy.layout.getArea("bottom").innerHTML='<div class="taskNextBox" id="taskNextBox"><a href="#" class="taskNext" id="taskNext" hidefocus="true"></a></div>\t\t\t\t\t\t\t\t<div class="taskContainer" id="taskContainer"><div class="taskContainerInner" id="taskContainerInner"></div></div>\t\t\t\t\t\t\t\t<div class="taskPreBox" id="taskPreBox"><a href="#" class="taskPre" id="taskPre" hidefocus="true"></a></div>';
			j=c.id("taskContainer");
			l=c.id("taskContainerInner");
			r.init();
			k.init();
			e.addObserver(this,"NewTaskItem",A.onNewTaskItem);
			e.addObserver(this,"RemoveTaskItem",A.onRemoveTaskItem);
			e.addObserver(this,"NotifyTaskItem",A.onNotifyTaskItem);
			e.addObserver(this,"FlashTaskItem",A.onFlashTaskItem);
			e.addObserver(this,"UpdateTaskName",A.onUpdateTaskName);
			e.addObserver(this,"UpdateTaskTitle",A.onUpdateTaskTitle);
			e.addObserver(alloy.windowFactory,"WindowCreate",D);
			e.addObserver(this,"NotifyBeat_250",P);
			e.addObserver(alloy.layout,"desktopResize",K);
			e.addObserver(this,"EQQBuddyStateChange",V);
			e.addObserver(this,"EQQSelfStateChange",T);
			e.addObserver(alloy.dock,"DockLocationChanged",Z)
		};
		this.getTask=function(a){return b.isUndefined(a)?!1:n(a)};
		this.getTaskItem=function(a,c){
			if(b.isUndefined(a)||b.isUndefined(c))
				return!1;
			var d=M({appId:a,id:c});
			if(d=n(d.appId))
				return d.getItem(c)
		};
		var j=null,
			l=null,
			q=!1,
			u=!1,
			p=!1,
			v=alloy.CONST.CDN_URL+"style/images/transparent.gif",
			x=alloy.CONST.CDN_URL+"style/images/mid.png",
			m={appId:"5_0",appName:"\u6b63\u5728\u804a\u5929...",appIcon:alloy.CONST.CDN_URL+"style/images/task/eqq_chatbox.png"},
			o={appId:"_folder",appName:"\u6587\u4ef6\u5939"},
			h={appId:"_diskAdmin",appName:"\u8d44\u6e90\u7ba1\u7406\u5668"},
			a=0,
			f={},
			n=function(a){return a==0?!1:f[a]},
			s=function(a,c){
				if(b.isUndefined(a)||b.isUndefined(c))
					return!1;
				var d=n(a);
				return d?d.getItem(c):!1
			},
			w=function(a){return a==""?"":b.browser.ie==6?'<img src="'+v+'" style="'+("background:node;filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+a+"', sizingMethod='scale')")+'" />':'<img src="'+a+'" />'},
			C=function(a){if(b.browser.ie==6)return!1;if(a=c.mini(".taskItemIcon img",a)[0])e.on(a,"error",function(){this.src=x})},
			y=0,
			z=null,
			F=function(a){
				var f=a.id,
					h=a.icon||"",
					k=a.name.toString()||"\u4efb\u52a1\u680f\u9879",
					n=a.title||k,
					j=a.win,
					s=y++,
					l=a._appId,
					q=g.encodeHtmlSimple(k),
					m=null;
				this.setName=function(a){
					k=a.toString()||"";
					q=g.encodeHtmlSimple(k);
					n=k;
					m.title=n;
					c.mini(".taskItemTxt",m)[0].innerHTML=q
				};
				this.setTitle=function(a){if(b.isUndefined(a))return!1;n=a;m.title=n};
				this.getId=function(){return f};
				this.getDid=function(){return s};
				this.setAppId=function(a){l=a;m.setAttribute("appid",a)};
				this.createDom=function(){
					var a=c.node("a",{id:"taskItem_"+s,"class":"taskItem",href:"#",appid:l,tid:f,title:n});
					a.innerHTML='<div class="taskItemIcon">'+w(h)+'<div class="taskItemIconState"></div>\t\t\t\t\t\t\t </div>\t\t\t\t\t\t\t <div class="taskItemTxt">'+q+"</div>";
					m=a;
					e.on(a,"click",this.onClick);
					e.on(a,"contextmenu",this.onRightClick);
					C(a);
					return a
				};
				this.removeDom=function(){m.parentNode.removeChild(m);e.off(m,"click")};
				this.getDom=function(){return m};
				this.addClass=function(a){c.addClass(m,a)};
				this.removeClass=function(a){c.removeClass(m,a)};
				this.onClick=function(a){
					b.isUndefined(a)||a.preventDefault();
					j.desktopIndex===alloy.desktopManager.getCurrentDesktopIndex()?j.getWindowFlags&&j.getWindowFlags()&alloy.CONST.WINDOW_FLAG_CURRENT?j.min():j.setCurrent():j.setCurrent();
					e.notifyObservers(d,"TaskItemClick",f)
				};
				this.onRightClick=function(a){
					a.preventDefault();
					var b=U(l,f);
					b&&alloy.layout.showContextMenu({x:a.clientX,y:a.clientY},{argument:{appId:l,id:f},items:b})
				};
				this.setCurrent=function(){this.jumpDown()};
				this.setNotCurrent=function(){};
				this.jumpUp=function(){
					var a="",
						a=c.hasClass(m,"fistTaskItem")?"firstTaskItemHight":"taskItemHight";
					c.addClass(m,a);
					r.isShow()&&r.getCurAppId()==l&&r.jumpUpItem("taskItem_"+s,a)
				};
				this.jumpDown=function(){
					var a="",
						a=c.hasClass(m,"fistTaskItem")?"firstTaskItemHight":"taskItemHight";
					c.removeClass(m,a)
				};
				this.winMax=function(){j.setCurrent();j.max()};
				this.winMin=function(){j.min()};
				this.close=function(){j.close()};
				this.getWinStatus=function(){return j.getBoxStatus()};
				this.isWinShow=function(){return j.isShow()};
				this.getWin=function(){return j}
			},
			H=function(a){
				var d=a.appId||0,
					h=a.srcAppId||0,
					n=a.groupId||d,
					j=a.groupType||"single",
					s=a.appIcon||"",
					m=a.preSiblingAppId||null,
					q=a.appName.toString()||"",
					o=a.appType,
					A=this,
					u=g.encodeHtmlSimple(q),
					p={},
					v=[],
					y=null,
					x=null,
					z=null,
					D=null,
					E=0;
				this.init=function(){
					p={};
					v=[];
					var a=c.node("div",{id:"taskGroup_"+d,"class":"taskGroup"});
					a.innerHTML='<div class="taskItemBox"></div>';
					y=a;
					x=c.mini(".taskItemBox",a)[0];
					if(l.innerHTML=="")
						l.appendChild(a);
					else{
						var f=b.browser.ie&&b.browser.ie<9?l.firstChild:l.firstElementChild;
						if(m){
							var e=c.id("taskGroup_"+m);
							e&&(f=e)
						}
						l.insertBefore(a,f)
					}
					f=c.getWidth(l);
					c.setStyle(l,"width",f+114+"px");
					c.addClass(a,"taskGroupAnaWidth")
				};
				this.getAppId=function(){return d};
				this.setAppId=function(a){
					for(var b in v)
						v[b].setAppId(a);
					d=a
				};
				this.getGroupId=function(){return n};
				this.getGroupType=function(){return j};
				this.getSrcAppId=function(){return h};
				this.getCurrentItemId=function(){return E};
				this.addItem=function(a){
					p||(p={});
					if(!b.isUndefined(p[a.id])&&p[a.id])
						return!1;
					E=a.id;
					a.id=a.id;
					a._appId=d;
					a._appType=o;
					if(b.isUndefined(a.icon)||a.icon=="")
						a.icon=s;
					var c=new F(a),f=c.createDom();
					p[a.id]=c;
					v.push(c);
					x.appendChild(f);
					this.checkTask();
					k.resize();
					G();
					K()
				};
				this.removeItem=function(a){
					E==a&&(E=0);
					if(this.getItemCount()>1){
						for(var b in v)
							if(v[b].getId()==a){
								v.splice(b,1);
								break
							}
						p[a].removeDom();
						p[a]=null;
						delete p[a];
						this.checkTask();
						G();
						k.resize();
						K();
						return this.getItemCount()
					}else 
						return this.removeTask(),K(),0
				};
				this.getItem=function(a){return p[a]};
				this.getItemList=function(){return p};
				this.getItemArr=function(){return v};
				this.getItemWinSatus=function(a){if(p[a])return p[a].getWinStatus()};
				this.isItemWinShow=function(a){if(p[a])return p[a].isWinShow()};
				this.setItemName=function(a,c){!b.isUndefined(p[a])&&p[a]&&p[a].setName(c)};
				this.removeTask=function(){
					z&&e.off(z,"click");
					y.parentNode.removeChild(y);
					p=null;
					v=[];
					y=null;
					B();
					var a=c.getWidth(l);
					c.setStyle(l,"width",a-114+"px");
					k.resize();
					a=d;
					b.isUndefined(f[a])||(f[a]=null,delete f[a])
				};
				this.onClick=function(a){if(b.isUndefined(a))return!1;p[a].onClick()};
				this.onRightClick=function(a){
					a.preventDefault();
					var b=U(d);
					b&&alloy.layout.showContextMenu({x:a.clientX,y:a.clientY},{argument:{appId:d},items:b})
				};
				this.checkTask=function(){
					if(this.getItemCount()>1){
						if(z)
							c.show(z);
						else{
							var a=c.node("div",{id:"taskGroupItem_"+d,"class":"taskItem taskGroupItem",title:q});
							a.innerHTML='<div class="taskItemIcon">'+w(s)+'</div>\t\t\t\t\t\t\t  <div class="taskItemCount"></div>\t\t\t\t\t\t\t  <div class="taskItemTxt">'+u+'</div>\t\t\t\t\t\t\t  <div class="taskItemGroupIcon"></div>';
							z=a;
							D=c.mini(".taskItemCount",a)[0];
							y.appendChild(a);
							e.on(a,"click",I);
							e.on(a,"contextmenu",A.onRightClick);
							C(a)
						}
						c.hide(x)
					}else z&&c.hide(z),c.show(x)
				};
				this.getItemCount=function(){
					var a=0;
					if(!p)return 0;
					for(var b in p)
						a++;
					return a
				};
				this.setCurrent=function(a){
					if(!y)
						return!1;
					E=a;
					(a=this.getItem(a))&&a.setCurrent();
					c.addClass(y,"taskCurrent")
				};
				this.setNotCurrent=function(a){
					if(!y)
						return!1;
					(a=this.getItem(a))&&a.setNotCurrent();
					c.removeClass(y,"taskCurrent")
				};
				this.jumpUp=function(a){
					c.addClass(y,"taskJumpUp");
					(a=this.getItem(a))&&a.jumpUp()
				};
				this.jumpDown=function(){c.removeClass(y,"taskJumpUp")};
				this.winMin=function(){
					for(var a in p)
						p[a].winMin()
				};
				this.close=function(){
					for(var a in p)
						p[a].close()
				};
				this.resetTaskGroupOpen=function(){
					c.removeClass(z,"taskGroupItemOpen");
					e.off(document.body,"mouseup")
				};
				this.getItemsWidth=function(){return this.getItemCount()*114};
				this.getContainer=function(){return y};
				var I=function(){
						if(r.isShow())
							B();
						else{
							r.setContent(x.innerHTML,d);
							var a=c.getClientXY(this);
							r.setPostion(a[0]);
							r.show();
							c.addClass(z,"taskGroupItemOpen");
							e.on(document.body,"mouseup",H)
						}
					},
					B=function(){
						r.hide();
						z&&c.removeClass(z,"taskGroupItemOpen");
						e.off(document.body,"mouseup")
					},
					H=function(a){
						if(c.contains(z,a.target))
							return!1;
						B()
					},
					G=function(){
						if(!D)
							return!1;
						D.innerHTML=A.getItemCount()
					},
					K=function(){
						if(!p)
							return!1;
						var a=0,b;
						for(b in p){
							a++;
							var c=p[b];
							a==1?c.addClass("fistTaskItem"):c.removeClass("fistTaskItem")
						}
					}
			},
			r={
				_curAppId:0,
				_mainDom:null,
				_contentDom:null,
				_contentInnerDom:null,
				_maskIframe:null,
				_domPageUp:null,
				_domPageDown:null,
				_turnPageMaxHeight:120,
				_turnPageHeight:40,
				_touchStartY:0,
				_touchEndY:0,
				_isMove:!1,
				init:function(){
					var a=alloy.layout.getArea("bottom"),
						b=c.node(
							"iframe",
							{
								id:"taskMenuMask",
								name:"taskMenuMask",
								"class":"taskMenuMask",
								frameBorder:"0",
								allowtransparency:"true",
								scrolling:"no",
								style:"display:none",
								src:"./domain.html"
							}
						);
					this._maskIframe=b;
					a.parentNode.insertBefore(b,a);
					b=c.node("div",{id:"taskMenuBox","class":"taskMenuBox ",style:"display:none"});
					b.innerHTML='<div class="taskMenuContentBox"><div class="taskMenuContentInner"></div></div>';
					this._mainDom=b;
					this._contentDom=c.mini(".taskMenuContentBox",b)[0];
					this._contentInnerDom=c.mini(".taskMenuContentInner",b)[0];
					a.parentNode.insertBefore(b,a)
				},
				getCurAppId:function(){return this._curAppId},
				getMainDom:function(){return this._mainDom},
				getMenuInnerDom:function(){return this._contentInnerDom},
				setContent:function(a,b){
					this._curAppId=b;
					this.unbindDom();
					this._contentInnerDom.innerHTML=a;
					this.bindDom();
					setTimeout(this.resizeMask,0)
				},
				bindDom:function(){
					var a=c.mini(".taskItem",this._mainDom),b;
					for(b in a)
						e.on(a[b],"click",this.onClick),
						e.on(a[b],"mouseup",this.onMouseUp),
						e.on(a[b],"contextmenu",this.onRightClick)
				},
				unbindDom:function(){
					var a=c.mini(".taskItem",this._mainDom),b;
					for(b in a)
						e.off(a[b],"click"),
						e.off(a[b],"mouseup"),
						e.off(a[b],"contextmenu")
				},
				getItemCount:function(){return c.mini(".taskItem",this._mainDom).length},
				resizeMask:function(){
					var a=c.getClientHeight(r._mainDom);
					c.setStyle(r._maskIframe,"height",a+"px")
				},
				setPostion:function(a){
					c.setStyle(this._mainDom,"left",a-1+"px");
					c.setStyle(this._maskIframe,"left",a+"px")
				},
				show:function(){
					if(!this._mainDom)return!1;
					c.show(this._mainDom);
					c.show(this._maskIframe);
					this.setPage()
				},
				isShow:function(){return c.isShow(this._mainDom)},
				hide:function(){this._mainDom&&(c.hide(this._mainDom),c.hide(this._maskIframe))},
				jumpUpItem:function(a,b){
					var d=c.mini(".taskItem",this._contentInnerDom),f;
					for(f in d){
						var e=d[f];
						if(e.getAttribute("id")==a){
							c.addClass(e,b);
							break
						}
					}
				},
				jumpDownItem:function(a,b){
					var d=c.mini(".taskItem",this._contentInnerDom),f;
					for(f in d){
						var e=d[f];
						if(e.getAttribute("id")==a){
							c.removeClass(e,b);
							break
						}
					}
				},
				onClick:function(a){
					a.preventDefault();
					var b=this.getAttribute("appid"),a=this.getAttribute("tid"),b=n(b);
					b.onClick(a);
					b.resetTaskGroupOpen();
					r.hide()
				},
				onRightClick:function(a){
					a.preventDefault();
					var b=this.getAttribute("appid"),c=this.getAttribute("tid"),d=U(b,c);
					d&&alloy.layout.showContextMenu(
						{x:a.clientX,y:a.clientY},
						{argument:{appId:b,id:c},items:d}
					)
				},
				onMouseUp:function(a){a.stopPropagation()},
				setPageMaxHeight:function(){
					var a=alloy.layout.getAvailableHeight();
					this._turnPageMaxHeight=a-a%40-80
				},
				setPage:function(){
					this.setPageMaxHeight();
					this.resetPage();
					var a=this._turnPageMaxHeight;
					c.getClientHeight(this._mainDom);
					var d=c.getClientHeight(this._contentInnerDom);
					if(d>a){
						if(!this._domPageUp)
							this._domPageUp=d=c.node("a",{"class":"taskMenuUp taskMenuUpDisable",href:"#",hidefocus:"true"}),
							e.on(d,"click",this.menuUp),
							e.on(d,"mouseup",function(a){a.stopPropagation()}),
							this._mainDom.insertBefore(d,b.browser.ie&&b.browser.ie<9?this._mainDom.firstChild:this._mainDom.firstElementChild),
							d=c.node("a",{"class":"taskMenuDown",href:"#",hidefocus:"true"}),
							e.on(d,"click",this.menuDown),
							e.on(d,"mouseup",function(a){a.stopPropagation()}),
							this._domPageDown=d,
							this._mainDom.appendChild(d);
						c.setStyle(this._contentDom,"height",a+"px");
						b.platform.iPad&&this.setIpad();
						this.downToBottom()
					}else 
						this._domPageUp&&(c.hide(this._domPageUp),c.hide(this._domPageDown),b.platform.iPad&&this.removeIpad()),
						c.setStyle(this._contentDom,"height",d+"px")
				},
				resetPage:function(){
					if(!r._contentInnerDom||!r._domPageUp)
						return!1;
					c.setStyle(r._contentInnerDom,"marginTop","0px");
					c.getClientHeight(this._mainDom);
					var a=c.getClientHeight(this._contentInnerDom);
					this._domPageUp&&this._turnPageMaxHeight<a?(
						c.show(this._domPageUp),
						c.show(this._domPageDown),
						c.addClass(r._domPageUp,"taskMenuUpDisable"),
						c.removeClass(r._domPageDown,"taskMenuDownDisable")
					):(
						c.hide(this._domPageUp),
						c.hide(this._domPageDown),
						c.addClass(r._domPageUp,"taskMenuUpDisable"),
						c.addClass(r._domPageDown,"taskMenuDownDisable")
					)
				},
				resize:function(){this.isShow()&&this.hide()},
				menuUp:function(a,b){
					a&&(a.preventDefault(),a.stopPropagation());
					b=b||r._turnPageHeight;
					if(c.hasClass(r._domPageUp,"taskMenuUpDisable"))
						return!1;
					var d=parseInt(c.getStyle(r._contentInnerDom,"marginTop")||0),
						f=c.getHeight(r._contentDom),
						e=c.getClientHeight(r._contentInnerDom);
					if(d>=0||f>=e)
						return!1;
					c.setStyle(r._contentInnerDom,"marginTop",(-d>b?d+b:0)+"px");
					-d<=b&&c.addClass(r._domPageUp,"taskMenuUpDisable");
					c.hasClass(r._domPageDown,"taskMenuDownDisable")&&c.removeClass(r._domPageDown,"taskMenuDownDisable")
				},
				menuDown:function(a,b){
					a&&(a.preventDefault(),a.stopPropagation());
					b=b||r._turnPageHeight;
					if(c.hasClass(r._domPageDown,"taskMenuUpDisable"))
						return!1;
					var d=parseInt(c.getStyle(r._contentInnerDom,"marginTop")||0),
						f=c.getHeight(r._contentDom),
						e=c.getClientHeight(r._contentInnerDom);
					if(e+d<=f||f>=e)
						return!1;
					var g=e-f+d;
					c.setStyle(r._contentInnerDom,"marginTop",(g>b?d-b:-(e-f))+"px");
					g<=b&&c.addClass(r._domPageDown,"taskMenuDownDisable");
					c.hasClass(r._domPageUp,"taskMenuUpDisable")&&c.removeClass(r._domPageUp,"taskMenuUpDisable")
				},
				downToBottom:function(){
					var a=c.getClientHeight(this._mainDom),b=c.getClientHeight(this._contentInnerDom);
					b>a&&(
						c.removeClass(this._contentInnerDom,"taskMenuContentInnerAnm"),
						this.menuDown(null,b),
						c.addClass(this._contentInnerDom,"taskMenuContentInnerAnm")
					)
				},
				setIpad:function(){
					var a=this._contentInnerDom;
					a.addEventListener(
						"touchstart",
						function(a){r._touchStartY=a.targetTouches[0].clientY},
						!0
					);
					a.addEventListener(
						"touchmove",
						function(a){
							r._touchEndY=a.targetTouches[0].clientY;
							a=r._touchEndY-r._touchStartY;
							if(a<-5){
								if(c.isShow(r._domPageUp))
									r.menuDown(null,-a),r._isMove=!0
							}else
								if(a>5){
									if(c.isShow(k._domPageDown))
										r.menuUp(null,a),r._isMove=!0
								}else 
									return!1;
							r._touchStartY=r._touchEndY
						},
						!0
					);
					a.addEventListener(
						"touchend",
						function(a){
							r._isMove&&(a.preventDefault(),a.stopPropagation());
							r._isMove=!1
						},
						!0
					)
				},
				removeIpad:function(){
					var a=this._contentInnerDom;
					a.removeEventListener("touchstart");
					a.removeEventListener("touchmove");
					a.removeEventListener("touchend")
				}
			},
			k={
				_pre:null,
				_preBox:null,
				_next:null,
				_nextBox:null,
				_dockMarginDom:null,
				_dockMarginWidth:-1,
				_touchStartX:0,
				_touchEndX:0,
				_isMove:!1,
				init:function(){
					this._pre=c.id("taskPre");
					this._preBox=c.id("taskPreBox");
					this._next=c.id("taskNext");
					this._nextBox=c.id("taskNextBox");
					e.on(this._pre,"click",this.onPre);
					e.on(this._next,"click",this.onNext);
					var a=k.getAvailableWidth();
					b.isNumber(a)&&this.setContainerWidth(a-114);
					this.setDockMargin();
					b.platform.iPad&&this.setIpad()
				},
				setInnerRight:function(a){
					var d=b.browser;
					d.ie>0&&d.ie<8?c.setStyle(l,"right",a+"px"):c.setStyle(l,"marginRight",a+"px")
				},
				getInnerRight:function(){
					var a=b.browser;
					return a.ie>0&&a.ie<8?parseInt(c.getStyle(l,"right")):parseInt(c.getStyle(l,"marginRight"))
				},
				resize:function(){
					if(p)return!1;
					if(!u){
						u=!0;
						var a=k.getAvailableWidth(),b=0,d;
						for(d in f)
							b+=f[d].getItemsWidth();
						if(b>a){
							if(!q){
								q=!0;
								var e=[],g;
								for(g in f)
									e.push(f[g]);
								var h=z.getGroupId(),a=z.getCurrentItemId(),b=-1;
								f={};
								for(g in e)
									if(d=e[g],d.getGroupType()=="group"){
										var j=d.getItemList(),s=d.getAppId(),w=d.getGroupId(),m;
										for(m in j){
											var o=j[m],r=o.getWin();
											D(r,s);
											w==h&&o.getId()==a&&(z=n(w),b=a);
											W(s,o.getId())&&(r=N(r),G(s,o.getId()),R(r))
										}
										d.removeTask()
							}else
								j=d.getSrcAppId(),j=M({appId:j,id:j}),d.setAppId(j.appId),f[j.appId]=d;
							b!=-1&&z.setCurrent(a)
						}
					}else 
						if(q){
							q=!1;
							g=[];
							for(e in f)
								g.push(f[e]);
							m=z.getGroupId();
							a=z.getCurrentItemId();
							b=-1;
							f={};
							for(e in g)
								if(d=g[e],d.getGroupType()=="group"){
									d.getItemList();
									s=d.getItemArr();
									j=[];
									if(s.length>1&&s[0].getDid()>s[1].getDid())
										for(h=s.length-1;h>=0;h--)
											j.push(s[h].getId());
									else
										for(h in s)
											j.push(s[h].getId());
									w=s=d.getAppId();
									o=d.getGroupId();
									for(h in j){
										var r=d.getItem(j[h]),A=r.getWin();
										D(A,w);
										var y=N(A),w=y.appId;
										if(o==m&&r.getId()==a)
											z=n(y.appId),b=y.id;
										d.removeItem(r.getId());
										W(s,r.getId())&&(y=N(A),G(s,r.getId()),R(y))
									}
								}else 
									j=d.getSrcAppId(),j=M({appId:j,id:j}),d.setAppId(j.appId),f[j.appId]=d;
							b!=-1&&z.setCurrent(a)
						}
					u=!1
				}
				e=k.getAvailableWidth();
				h=c.getWidth(l);
				h>e?(k.setContainerWidth(e-114),k.resizeCurrentTask(),k.showBtn()):(k.setContainerWidth(h),k.setInnerRight(0),k.hideBtn());
				k.checkShowDockMargin()
			},
			setContainerWidth:function(a){
				c.setStyle(j,"width",a+"px");
				if(b.browser.ie==6){
					var d=alloy.layout.getArea("bottom");
					c.setStyle(d,"width",a+114+6+"px")
				}
			},
			setBottomAreaWidth:function(){
				var a=alloy.layout.getArea("bottom");
				c.setStyle(a,"right",this._dockMarginWidth+"px")
			},
			setDockMargin:function(){
				if(alloy.dock.getDockLocation()=="right"){
					if(this._dockMarginWidth==-1){
						var a=k.getAvailableWidth();
						this._dockMarginWidth=c.getClientWidth()-a;
						this.setBottomAreaWidth()
					}
				}else 
					if(this._dockMarginWidth>0)
						this._dockMarginWidth=-1,this.setBottomAreaWidth()
			},
			checkShowDockMargin:function(){
				if(this._dockMarginWidth==-1)
					return!1;
				var a=alloy.dock.getDockHeight();
				if((c.getClientHeight()-a)/2-64<0){
					if(this._dockMarginWidth==0)
						a=k.getAvailableWidth(),this._dockMarginWidth=c.getClientWidth()-a,this.setBottomAreaWidth()
				}else 
					this._dockMarginWidth=0,this.setBottomAreaWidth()
			},
			resizeCurrentTask:function(){
				var a=k.getAvailableWidth(),b=c.getWidth(l);
				if(!z)
					return!1;
				z.getAppId();
				var d=c.mini(".taskGroup",l);
				k.getInnerRight();
				var f=0,e;
				for(e in d)
					if(f++,c.hasClass(d[e],"taskCurrent"))
						break;
				f=d.length-f+1;
				a-=114;
				f=b-f*114;
				b-f<a&&(f=b-a);
				k.setInnerRight(-f)
			},
			hideBtn:function(){
				c.hide(this._preBox);
				c.hide(this._nextBox);
				e.off(j,"mousewheel",this.onMouseWheel)
			},
			showBtn:function(){
				c.show(this._preBox);
				c.show(this._nextBox);
				this.checkPreBtn();
				this.checkNextBtn();
				e.on(j,"mousewheel",this.onMouseWheel)
			},
			onPre:function(a,b){
				a&&a.preventDefault();
				if(c.hasClass(k._pre,"taskPreDisable"))
					return!1;
				var b=b||114,d=c.getWidth(l),f=c.getWidth(j),e=k.getInnerRight();
				if(f>=d||f-e>=d)
					return!1;
				d=d-f+e;
				k.setInnerRight(e-(d>b?b:d));
				k.checkPreBtn();
				k.checkNextBtn()
			},
			checkPreBtn:function(){
				var a=c.getWidth(l),b=c.getWidth(j),d=k.getInnerRight(),f=this._pre;
				a-b+d>10?c.hasClass(f,"taskPreDisable")&&c.removeClass(f,"taskPreDisable"):c.hasClass(f,"taskPreDisable")||c.addClass(f,"taskPreDisable")
			},
			onNext:function(a,b){
				a&&a.preventDefault();
				if(c.hasClass(k._next,"taskNextDisable"))
					return!1;
				var b=b||114,d=c.getWidth(l),f=c.getWidth(j),e=k.getInnerRight();
				if(f>=d||e>=0)
					return!1;
				d=b;
				k.setInnerRight(e+(-e>b?b:-e));
				-e<=b&&k.checkNextBtn();
				k.checkPreBtn()
			},
			checkNextBtn:function(){
				var a=this._next;
				k.getInnerRight()<0?c.hasClass(a,"taskNextDisable")&&c.removeClass(a,"taskNextDisable"):c.hasClass(a,"taskNextDisable")||c.addClass(a,"taskNextDisable")
			},
			onMouseWheel:function(a){
				if(a.wheelDelta>0){
					if(c.isShow(k._preBox))
						k.onPre()
				}else if(a.wheelDelta<0&&c.isShow(k._nextBox))
					k.onNext()
			},
			getAvailableWidth:function(){
				var a=alloy.dock.getDockHeight();
				return(c.getClientHeight()-a)/2-64<0?alloy.layout.getAvailableWidth():c.getClientWidth()
			},
			setIpad:function(){
				var a=l;
				a.addEventListener(
					"touchstart",
					function(a){
						k._isMove=!1;
						k.touchStartX=a.targetTouches[0].clientX
					},
					!0
				);
				a.addEventListener(
					"touchmove",
					function(a){
						k.touchEndX=a.targetTouches[0].clientX;
						a=k.touchEndX-k.touchStartX;
						if(a>50){
							if(c.isShow(k._preBox))
								k.onPre(null,a),k._isMove=!0
						}else if(a<-50){
							if(c.isShow(k._nextBox))
								k.onNext(null,-a),k._isMove=!0
						}else 
							return!1;
						k.touchStartX=k.touchEndX
					},
					!0
				);
				a.addEventListener(
					"touchend",
					function(a){
						k._isMove&&(a.preventDefault(),a.stopPropagation());
						k._isMove=!1
					},
					!0
				)
			}
		},
		A={
			onNewTaskItem:function(c){
				var d=c.appId||"task_"+a++,e=n(d);
				if(b.isUndefined(e)||!e)
					e=new H(c),e.init(),f[d]=e;
				e.addItem(
					{
						id:c.id,
						name:c.name,
						title:c.title,
						preSiblingAppId:c.preSiblingAppId,
						icon:c.icon,
						win:c.win
					}
				)
			},
			onNotifyTaskItem:function(a){a=M(a);R(a)},
			onFlashTaskItem:function(a){a=M(a);B(a);setTimeout(function(){L(a)},200)},
			onRemoveTaskItem:function(a){var c=n(a.appId);b.isUndefined(c)||(b.isUndefined(a.id)?c.removeTask():c.removeItem(a.id))},
			onUpdateTaskName:function(a){var a=M(a),c=n(a.appId);b.isUndefined(c)||c.setItemName(a.id,a.name)},
			onUpdateTaskTitle:function(a){var c=n(a.appId);b.isUndefined(c)||c.getItem(a.id).setTitle(a.title)},
			onSetCurrent:function(a){var c=n(a.appId);b.isUndefined(c)||(z&&c.getAppId()!=z.getAppId()&&z.setNotCurrent(),c.setCurrent(a.id),z=c,k.resize())},
			onSetNotCurrent:function(a){a=n(a.appId);b.isUndefined(a)||a.setNotCurrent()}
		},
		D=function(a,c){
			var f=a.option.taskType||"";
			if(f=="app"){
				var f=a.option,g=alloy.portal.getAllConfig(f.appId);
				if(!(b.isUndefined(g)||g.appLevel&&g.appLevel=="system"&&!g.quickPanel)){
					var k=k=d.getAppIcon(g),
						f={
							appId:f.appId,
							srcAppId:f.appId,
							appName:g.appName,
							appIcon:k,
							appType:"app",
							groupType:"single",
							id:f.appId,
							name:g.appName,
							icon:k,
							win:a
						},
						f=M(f);
					A.onNewTaskItem(f)
				}
			}else 
				if(f=="chatBox"){
					g=a.option;
					f=g.chatBoxType;
					g=g.userOrGroup;
					k={
						appId:m.appId,
						srcAppId:m.appId,
						appName:m.appName,
						appIcon:m.appIcon,
						appType:"chatBox",
						groupType:"group",
						preSiblingAppId:c,
						win:a
					};
					if(f=="single")
						k.id=g.uin,k.name=g.markName||g.nick,k.title=k.name+" - "+EQQ.hash.onlineStatusText[g.state],k.icon=alloy.util.getUserAvatar(g.uin);
					else if(f=="group")
						k.id=g.gid,k.name=g.markName||g.name,k.icon=alloy.util.getGroupAvatar(g.code);
					else if(f=="discu")
						k.id=g.did,k.name=g.name,k.icon=alloy.util.getDiscuAvatar(g.did);
					if(!q)
						k.groupId=k.appId,k.appId=k.appId+"_"+k.id;
					A.onNewTaskItem(k);
					f=="single"&&V({id:g.uin,state:g.state})
				}else if(f=="folder"){
					f=a.option;
					g=alloy.CONST.CDN_URL+"/style/images/filesys/folder.png?t=20111011001";
					f={
						appId:o.appId,
						srcAppId:o.appId,
						appName:o.appName,
						appIcon:g,
						appType:"folder",
						groupType:"group",
						preSiblingAppId:c,
						id:f.windowId,
						name:f.title,
						icon:g,
						win:a
					};
					if(!q)
						f.groupId=f.appId,f.appId=f.appId+"_"+f.id;
					A.onNewTaskItem(f)
				}else if(f=="diskAdmin"){
					f=a.option;
					g=alloy.CONST.CDN_URL+"/style/images/diskexplorer.png?t=20111011001";
					f={
						appId:h.appId,
						srcAppId:h.appId,
						appName:h.appName,
						appIcon:g,
						appType:"diskAdmin",
						groupType:"group",
						preSiblingAppId:c,
						id:f.windowId,
						name:f.title,
						icon:g,
						win:a
					};
					if(!q)
						f.groupId=f.appId,f.appId=f.appId+"_"+f.id;
					A.onNewTaskItem(f)
				}
			e.addObserver(a,"close",E);
			e.addObserver(a,"setCurrent",b.bind(I,this,a))
		},
		E=function(a){
			if(N(a))
				A.onRemoveTaskItem(N(a))
		},
		I=function(a){
			if(a=N(a))
				A.onSetCurrent(a),G(a.appId,a.id)
		},
		K=function(){
			k.resize();
			r.resize()
		},
		N=function(a){
			var b=a.option,c=b.taskType||"",d={};
			if(c=="app")
				d={appId:b.appId,id:b.appId};
			else if(c=="chatBox")
				d={appId:m.appId,id:a.uin};
			else if(c=="folder")
				d={appId:o.appId,id:b.windowId};
			else if(c=="diskAdmin")
				d={appId:h.appId,id:b.windowId};
			else 
				return!1;
			return M(d)
		},
		M=function(a){
			if(!q)
				a.appId=a.appId+"_"+a.id;
			return a
		},
		J=[],
		Q=1,
		R=function(a){
			if(b.isUndefined(a.appId))
				return!1;
			if(z&&z.getAppId()==a.appId&&z.getCurrentItemId()==a.id&&z.isItemWinShow(a.id))
				return!1;
			var c=n(a.appId);
			if(b.isUndefined(c)||b.isUndefined(c.getItem(a.id)))
				return!1;
			var c=!1,f;
			for(f in J){
				var g=J[f];
				if(g.appId==a.appId&&g.id==a.id){
					c=!0;
					break
				}
			}
			c||J.push(a);
			e.notifyObservers(d,"TaskBarNotifyBeatStart")
		},
		G=function(a,b){
			if(!J||J.length<1)
				return!1;
			for(var c in J){
				var f=J[c];
				if(f.appId==a&&f.id==b){
					L(f);
					J.splice(c,1);
					break
				}
			}
			J.length<1&&e.notifyObservers(d,"TaskBarNotifyBeatStop")
		},
		W=function(a,b){
			if(!J||J.length<1)
				return!1;
			for(var c in J){
				var d=J[c];
				if(d.appId==a&&d.id==b)
					return!0
			}
			return!1
		},
		P=function(){
			for(var a in J){
				var b=J[a],c=n(b.appId);
				c&&(Q==1?c.jumpUp(b.id):c.jumpDown(b.id))
			}
			Q=-Q
		},
		B=function(a){
			var b=n(a.appId);
			b&&b.jumpUp(a.id)
		},
		L=function(a){
			var b=n(a.appId);
			b&&b.jumpDown(a.id)
		};
		this.getAppIcon=function(a){
			var b=a.id;
			if(alloy.appconfig.isQplusApp(b)&&a.icon)
				return a.icon;
			var a=a.iconUrl||"",c=alloy.util.getAppRoot(b)+"images/",d=alloy.CONST.PRI_APP_STATIC_URL;
			if(b=="appMarket")
				return b=alloy.CONST.CDN_URL_0+"/style/images/appbar_manage.png";
			else if(b=="docViewer")
				return b=alloy.CONST.CDN_URL_0+"/style/images/docviewer.png";
			else if(b=="imgViewer")
				return b=alloy.CONST.CDN_URL_0+"/style/images/imgviewer.png";
			else if(b=="messageCenter")
				return b=alloy.CONST.CDN_URL_0+"/style/images/messagecenter.png";
			if(a&&a.smallIcon&&a.smallIcon.indexOf("priapps")>-1)
				d=alloy.CONST.PRI_APP_STATIC_URL2;
			var f=a.type||a;
			return b=(f&10)>0?b>99999?d+a.midIcon:c+"mid.png":(f&1)>0?b>99999?d+a.smallIcon:c+"small.png":alloy.CONST.CDN_URL+"module/appmarket/images/mid.png"
		};
		var V=function(a){
			if(b.isUndefined(EQQ)||b.isUndefined(EQQ.hash.onlineStatus[a.state]))
				return!1;
			var c=M({appId:m.appId,id:a.id}),c=n(c.appId);
			b.isUndefined(c)||(c=c.getItem(a.id),b.isUndefined(c)||c.getDom().setAttribute("class","taskItem taskItem_"+EQQ.hash.onlineStatus[a.state]))},T=function(a){var c=M({appId:50,id:50}),d=n(c.appId);b.isUndefined(d)||(c=d.getItem(c.id),b.isUndefined(c)||c.getDom().setAttribute("class","taskItem taskItem_"+a.state))},S={_default:[{text:"\u6700\u5927\u5316",onClick:function(a,b,c){a=c.getArgument();(a=s(a.appId,a.id))&&a.winMax()}},{text:"\u6700\u5c0f\u5316",onClick:function(a,b,c){a=c.getArgument();(a=s(a.appId,a.id))&&a.winMin()}},{type:"separator"},{text:"\u5173\u95ed",onClick:function(a,b,c){a=c.getArgument();(a=s(a.appId,a.id))&&a.close()}}],_defaultNoMax:[{text:"\u6700\u5c0f\u5316",onClick:function(a,b,c){a=c.getArgument();(a=s(a.appId,a.id))&&a.winMin()}},{type:"separator"},{text:"\u5173\u95ed",onClick:function(a,b,c){a=c.getArgument();(a=s(a.appId,a.id))&&a.close()}}],_defaultGroup:[{text:"\u6700\u5c0f\u5316\u7ec4",onClick:function(a,b,c){a=c.getArgument();d.getTask(a.appId).winMin()}},{type:"separator"},{text:"\u5173\u95ed\u7ec4",onClick:function(a,b,c){a=c.getArgument();a=d.getTask(a.appId);p=!0;a.close();p=!1;k.resize()}}]},U=function(a,c){if(b.isUndefined(a))return!1;var d=a,f=[];if(b.isUndefined(c))f=S[d],b.isUndefined(f)&&(f=S._defaultGroup);else if(d+="_"+c,f=S[d],d.indexOf("50_")>-1&&alloy.portal.getLoginLevel()==alloy.CONST.LOGIN_LEVEL_ALL&&(f=!1),b.isUndefined(f)){d=s(a,c);f=!0;try{f=d.getWin().option.hasMaxButton}catch(e){}f=f?S._default:S._defaultNoMax}return!f?!1:f},Z=function(){k.setDockMargin();k.resize()}});
Jx().$package(
	"alloy.rpcService",
	function(b){
		var d=this,
			c=b.dom,
			e=b.event,
			g,j,
			l=0,
			q,
			u=new b.Class(
				{
					init:function(a){this._ajaxRequestInstant=a},
					send:function(a,c){
						c=c||{};
						c.cacheTime=c.cacheTime||0;
						c.onSuccess=c.onSuccess||function(){};
						c.onError=c.onError||function(){};
						c.onTimeout=c.onTimeout||function(){};
						c.onComplete=c.onComplete||function(){};
						var d={
							method:c.method||"GET",
							contentType:c.contentType||"",
							enctype:c.enctype||"",
							data:c.data||{},
							param:c.param||{},
							arguments:c.arguments||{},
							context:c.context||null,
							timeout:c.timeout||3E4,
							onSuccess:function(a){
								var a=a.responseText||"-",d={};
								try{d=b.json.parse(a)}catch(e){b.error("alloy.rpcservice: JSON \u683c\u5f0f\u51fa\u9519","HttpRequest")}
								d.arguments=c.arguments||{};
								c.onSuccess.call(c.context,d)
							},
							onError:function(a){c.onError.call(c.context,a)},
							onTimeout:function(){var a={};a.arguments=c.arguments||{};c.onTimeout.call(c.context,a)},
							onComplete:function(){var a={};a.arguments=c.arguments||{};c.onComplete.call(c.context,a)}
						};
						alloy.portal.recoverCookie();
						d.data=b.string.toQueryString(d.data);
						if(d.method=="GET"){
							var e=d.data;
							c.cacheTime===0&&(e+=e?"&t="+(new Date).getTime():"t="+(new Date).getTime());
							e&&(a=a+"?"+e);
							d.data=null
						}else 
							d.contentType="application/x-www-form-urlencoded",a.indexOf("?");
						this._ajaxRequestInstant(a,d)
					}
				}
			),
			p=new b.Class(
				{
					init:function(a,f){
						var e="qqweb_proxySendIframe_"+a,g=this,h;
						this._ajaxCallbacks=[];
						this._proxyAjaxSend=this._proxySend=null;
						f+=(/\?/.test(f)?"&":"?")+"id="+a;
						b.out("ProxyRequest >>>>> init: "+f,"ProxyRequest");
						var j=function(){
							var a=window.frames[e];
							b.out("ProxyRequest >>>>> load: "+a.location.href,"ProxyRequest");
							try{
								if(a.ajax){
									g._proxyAjaxSend=a.ajax;
									for(var c=g._ajaxCallbacks,a=0,d=c.length;a<d;a++)
										g.proxySend(c[a].url,c[a].option);
									g._ajaxCallbacks=[]
								}else 
									b.warn("ProxyRequest >>>>> ajaxProxy error: ajax is undefined!!!!","ProxyRequest"),alloy.util.report2h("proxyrequest_error","start")
							}catch(f){
								b.error("ProxyRequest >>>>> ajaxProxy error: "+f.message+" !!!!","ProxyRequest"),alloy.util.report2h("proxyrequest_error2","start")
							}
						};
						h=document.body;
						var l=c.node("div",{"class":"hiddenIframe"});
						l.innerHTML='<iframe id="'+e+'" class="hiddenIframe" name="'+e+'" src="'+f+'" width="1" height="1"></iframe>';
						h.appendChild(l);
						h=c.id(e);
						this.id=a;
						this.onAjaxFrameLoad=j;
						d.onAjaxFrameLoad2=j;
						b.browser.firefox&&h.setAttribute("src",f)
					},
					send:function(a,b){
						this._proxyAjaxSend?(this.proxySend(a,b),this.send=this.proxySend):this._ajaxCallbacks.push({url:a,option:b})
					},
					proxySend:function(a,b){
						if(!this._proxySend)
							this._proxySend=new u(this._proxyAjaxSend);
						this._proxySend.send(a,b)
					}
				}
			),
			v=new b.Class(
				{
					init:function(){
						this._proxyArr={};
						this._proxyId=1
					},
					getProxyId:function(){
						return this._proxyId++
					},
					getProxy:function(a){
						var b=this._proxyArr[a];
						b||(b=new p(this.getProxyId(),a),this._proxyArr[a]=b);
						return b
					},
					getProxyById:function(a){
						for(var b in this._proxyArr)
							if(this._proxyArr[b].id==a)
								return this._proxyArr[b];
						return null
					}
				}
			);
		this.selfSend=function(a,c){
			g||(g=new u(b.http.ajax));
			g.send(a,c)
		};
		this.sSend=this.send=this.proxySend=function(a,b,c){
			j||(j=new v);
			c=c||alloy.CONST.API_PROXY_URL;
			c+=(/\?/.test(c)?"&":"?")+"callback=1";
			j.getProxy(c).send(a,b)
		};
		this.cgiSend=function(a,b,c){
			c=c||alloy.CONST.JAVA_CGI_PROXY_URL;
			d.proxySend(a,b,c)
		};
		this.psSend=function(a,b,c){
			c=c||alloy.CONST.PS_PROXY_URL;
			d.proxySend(a,b,c)
		};
		this.upSend=function(a,b,c){
			c=c||alloy.CONST.JAVA_UP_CGI_PROXY_URL;
			d.proxySend(a,b,c)
		};
		this.onAjaxFrameLoad=function(a){
			if(b.isUndefined(a))
				this.onAjaxFrameLoad2();
			else
				(a=j.getProxyById(a))&&a.onAjaxFrameLoad()
		};
		var x={
			_iframes:[],
			_tick:0,
			_select:function(){
				this._tick++;
				return this._iframes[(this._tick-1)%this._len]
			},
			init:function(a){
				if(this._isInit!=!0){
					this._len=a;
					for(var b=document.body,d,e=0;e<a;e++)
						d=c.node("div",{"class":"RPCService_hDiv"}),
						c.hide(d),
						d.innerHTML='<iframe id="RPCService_hIframe_'+e+'" name="RPCService_hIframe_'+e+'" src="'+alloy.CONST.MAIN_URL+'domain.html"></iframe>',
						b.appendChild(d),
						this._iframes[e]=[d,null,"RPCService_hIframe_"+e];
					this._isInit=!0
				}
			},
			take:function(a){
				var b=this._select();
				b[1]&&b[0].removeChild(b[1]);
				a.setAttribute("target",b[2]);
				b[1]=a;
				b[0].appendChild(a)
			}
		};
		this.formSend=function(a,b){
			x.init(2);
			var d={
					method:b.method||"GET",
					enctype:b.enctype||"",
					data:b.data||{},
					onSuccess:b.onSuccess||function(){},
					onError:b.onError||function(){},
					onComplete:b.onComplete||function(){},
					onTimeout:b.onTimeout||function(){},
					timeout:b.timeout?b.timeout:1E4
				},
				e=c.node(
					"form",
					{
						"class":"RPCService_form",
						method:d.method,
						action:a+"?t="+(new Date).getTime(),
						enctype:d.enctype
					}
				);
			if(Object.prototype.toString.call(d.data).indexOf("String")>-1){
				var g=c.node("input");
				g.type="text";
				g.name=d.data;
				e.appendChild(g)
			}else 
				for(var h in d.data)
					g=c.node("input"),
					g.type="text",
					g.name=h,
					g.setAttribute("value",d.data[h]),
					e.appendChild(g);
			x.take(e);
			e.submit()
		};
		this.sendGetVfWebQQ=function(a,c,d){
			alloy.portal.getTryUin()&&alloy.portal.getSkey()?(
				alloy.portal.speedTest.sRTS(1,"start",new Date),
				this.send(
					alloy.CONST.API_SERVER_URL+"get_vfwebqq2",
					{
						context:this,
						data:{},
						arguments:{uin:a},
						onSuccess:c||function(a){
							a.retcode===0&&a.result&&a.result.length===2&&a.result[0]=="vfwebqq"?(
								b.out(":GetVfWebQQSuccess..."),
								e.notifyObservers(this,"GetVfWebQQSuccess",a)
							):(
								b.out("[sendGetVfWebQQ\uff1a\u6570\u636e\u683c\u5f0f\u9519\u8bef] error: "+a.retcode+"-"+a.errmsg),
								e.notifyObservers(this,"GetVfWebQQError",a)
							);
							alloy.portal.speedTest.sRTS(1,"end",new Date,!0);
							alloy.portal.speedTest.sRTS(4,"start",new Date);
							alloy.portal.speedTest.sRTS(5,"start",new Date)
						},
						onError:d||function(a){
							b.out("\u83b7\u53d6\u4e00\u4e2a\u4eba\u7684\u767b\u5f55\u4fe1\u606f\u5931\u8d25");
							e.notifyObservers(this,"GetVfWebQQError",a);
							alloy.portal.speedTest.sRTS(1,"end",new Date,!0)
						}
					}
				)
			):e.notifyObservers(this,"GetVfWebQQError",{})
		};
		this.sendGetSeftInfo=function(a,c,d){
			alloy.portal.getTryUin()&&alloy.portal.getSkey()?(
				alloy.portal.speedTest.sRTS(1,"start",new Date),
				this.send(
					alloy.CONST.API_SERVER_URL+"get_self_info2",
					{
						context:this,
						data:{},
						arguments:{uin:a},
						timeout:2E4,
						onSuccess:c||function(a){
							a.retcode===0&&a.result?(
								alloy.util.report2qqweb("config|vfwebqq|success"),
								b.out(":GetVfWebQQSuccess..."),
								e.notifyObservers(this,"GetVfWebQQSuccess",a),
								e.notifyObservers(this,"GetUserInfoSuccess",a)
							):(
								b.out("[sendGetVfWebQQ\uff1a\u6570\u636e\u683c\u5f0f\u9519\u8bef] error: "+a.retcode+"-"+a.errmsg),
								e.notifyObservers(this,"GetVfWebQQError",a)
							);
							alloy.portal.speedTest.sRTS(1,"end",new Date,!0);
							alloy.portal.speedTest.sRTS(4,"start",new Date);
							alloy.portal.speedTest.sRTS(5,"start",new Date)
						},
						onError:d||function(a){
							b.out("\u83b7\u53d6\u4e00\u4e2a\u4eba\u7684\u767b\u5f55\u4fe1\u606f\u5931\u8d25");
							alloy.util.report2qqweb("config|vfwebqq|error");
							timeoutConfirm("\u83b7\u53d6\u4e2a\u4eba\u767b\u5f55\u4fe1\u606f\u5931\u8d25,\u662f\u5426\u5237\u65b0\u91cd\u8bd5\uff1f(\u70b9\u51fb\u53d6\u6d88\u5c06\u4ee5\u6e38\u5ba2\u6001\u767b\u5f55)")||e.notifyObservers(this,"GetVfWebQQError",a);
							alloy.portal.speedTest.sRTS(1,"end",new Date,!0)
						},
						onTimeout:function(){
							alloy.util.report2qqweb("config|vfwebqq|timeout");
							timeoutConfirm("\u83b7\u53d6\u4e2a\u4eba\u767b\u5f55\u4fe1\u606f\u8d85\u65f6,\u662f\u5426\u5237\u65b0\u91cd\u8bd5\uff1f(\u70b9\u51fb\u53d6\u6d88\u5c06\u4ee5\u6e38\u5ba2\u6001\u767b\u5f55)")||e.notifyObservers(this,"GetVfWebQQError");
							alloy.util.report2h("get_vfwebqq","timeout")
						}
					}
				)
			):e.notifyObservers(this,"GetVfWebQQError",{})
		};
		var m,
			o=function(a,d){
				m=alloy.layout.messagebox('<div style="width:100%; height:100%; line-height:30px;">\t\t\t\t\t\t<div style ="text-align: left; padding-left: 10px;">\t\t\t\t\t\t\t<div>\u4e3a\u4e86\u60a8\u7684\u8d26\u53f7\u5b89\u5168\uff0c\u8bf7\u6267\u884c\u8eab\u4efd\u9a8c\u8bc1\uff0c\u5728\u8f93\u5165\u6846\u8f93\u5165\u4e0b\u56fe\u4e2d\u7684\u9a8c\u8bc1\u7801</div>\t\t\t\t\t\t\t<div>\u9a8c\u8bc1\u7801:&nbsp&nbsp<input id="verify_input_code" type="text" style="vertical-align:middle;" />&nbsp;&nbsp;<span id="buddyfinder_code_gf" style="color:red"></span></div>\t\t\t\t\t\t\t<img style="float:left;margin-right:10px" id="verify_img_code" src="" />\t\t\t\t\t\t\t<a style="display:inline;line-height:60px;" id="verify_a_code" alt="\u770b\u4e0d\u6e05\u6362\u4e00\u5f20" href="">\u770b\u4e0d\u6e05\u6362\u4e00\u5f20</a>\t\t\t\t\t\t\t<div id="verify_img_code_wrong" style="display:none;color:red;width:65px;">\u9a8c\u8bc1\u7801\u9519\u8bef</div>\t\t\t\t\t\t</div>\t\t\t\t\t</div>',
					{
						title:"\u8eab\u4efd\u9a8c\u8bc1",
						resize:!0,
						width:380,
						height:123,
						hasOkButton:!0,
						windowType:"EqqWindow",
						isSetCentered:!0
					}
				);
				var g=c.id("verify_img_code"),
					h=c.id("verify_a_code"),
					j=c.id("verify_input_code"),
					l=null;
				e.on(
					g,
					"load",
					function(){
						l=b.cookie.get("verifysession",alloy.CONST.MAIN_DOMAIN)
					}
				);
				e.on(
					h,
					"click",
					function(a){
						a.preventDefault();
						c.id("verify_img_code").src="http://captcha.qq.com/getimage?aid=1003901&"+Math.random()
					}
				);
				e.addObserver(
					m,
					"clickOkButton",
					function(){
						var b=j.value;
						if(b&&l)
							return d(a,b,l),!1;
						j.focus();
						c.id("verify_input_code").innerHTML="\u8bf7\u5148\u8f93\u5165\u9a8c\u8bc1\u7801\uff01";
						return!1
					}
				);
				j.focus();
				e.on(
					j,
					"keydown",
					function(a){
						a.keyCode==13&&e.notifyObservers(m,"clickOkButton")&&setTimeout(function(){m.close()},0)
					}
				);
				c.id("verify_img_code").src="http://captcha.qq.com/getimage?aid=1003901&"+Math.random()
			};
		this.sendGetUserInfo=function(a,b,g,h){
			this.send(
				alloy.CONST.API_SERVER_URL+"get_friend_info2",
				{
					context:this,
					data:{
						tuin:a,
						verifysession:g||"",
						code:b||"",
						vfwebqq:alloy.portal.getVfWebQQ()
					},
					arguments:{uin:a},
					onSuccess:function(b){
						b.retcode===0?(
							setTimeout(function(){try{m&&m.close()}catch(a){}},0),
							h?h.call(this,b):e.notifyObservers(this,"GetUserInfoSuccess",b)
						):b.retcode===1E3?o(
							a,
							function(a,b,c){
								d.sendGetUserInfo(a,b,c,h)
							}
						):b.retcode===1001?(
							c.id("verify_img_code_wrong").style.display="inline",
							c.id("verify_img_code").src="http://captcha.qq.com/getimage?aid=1003901&"+Math.random(),
							c.id("verify_input_code").value="",
							c.id("verify_input_code").focus()
						):(setTimeout(function(){try{m&&m.close()}catch(a){}},0),
							e.notifyObservers(this,"GetUserInfoError",b)
						)
					},
					onError:function(a){e.notifyObservers(this,"GetUserInfoError",a)}
				}
			)
		};
		this.sendGetSingleInfo=function(a,b,g,h){
			!b||!g?o(
						a,
						function(a,b,c){
							d.sendGetSingleInfo(a,b,c,h)
						}
					):this.send(
						alloy.CONST.API_SERVER_URL+"get_single_info2",
						{
							context:this,
							data:{
								tuin:a,
								verifysession:g||"",
								code:b||"",
								vfwebqq:alloy.portal.getVfWebQQ()
							},
							arguments:{uin:a},
							onSuccess:function(b){
								b.retcode===0?(
												b.result.uin=b.result.tuin,
												setTimeout(function(){try{m&&m.close()}catch(a){}},0),
												h?h.call(this,b):e.notifyObservers(this,"GetUserInfoSuccess",b)
											):b.retcode===1E3?o(
																a,
																function(a,b,c){d.sendGetSingleInfo(a,b,c,h)}
															):b.retcode===1001?(
																				c.id("verify_img_code_wrong").style.display="inline",
																				c.id("verify_img_code").src="http://captcha.qq.com/getimage?aid=1003901&"+Math.random(),
																				c.id("verify_input_code").value="",
																				c.id("verify_input_code").focus()
																			):(
																				setTimeout(function(){try{m&&m.close()}catch(a){}},0),
																				e.notifyObservers(this,"GetUserInfoError",b)
																			)
							},
							onError:function(a){e.notifyObservers(this,"GetUserInfoError",a)}
						}
					)
		};
		this.sendGetUserInfo_with_code=function(a,f,g,h,j){
			f=f||"";
			this.send(
				alloy.CONST.API_SERVER_URL+"get_stranger_info2",
				{
					context:this,
					data:{
						tuin:a,
						verifysession:g||"",
						gid:0,
						code:f,
						vfwebqq:alloy.portal.getVfWebQQ()
					},
					arguments:{uin:a,code:f},
					onSuccess:h||function(b){
						b.retcode===0?(
							setTimeout(function(){try{m&&m.close()}catch(a){}},0),
							h&&h.call(this,b),
							e.notifyObservers(this,"GetUserInfoSuccess",b)
						):b.retcode===1E3?o(
							a,
							function(a,b,c){d.sendGetUserInfo_with_code(a,b,c)}
						):b.retcode===1001?(
							c.id("verify_img_code_wrong").style.display="inline",
							c.id("verify_img_code").src="http://captcha.qq.com/getimage?aid=1003901&"+Math.random(),
							c.id("verify_input_code").value="",
							c.id("verify_input_code").focus()
						):(
							setTimeout(function(){try{m&&m.close()}catch(a){}},0),
							e.notifyObservers(this,"GetUserInfoError",b)
						)
					},
					onError:j||function(a){
						b.out("\u83b7\u53d6\u4e00\u4e2a\u4eba\u7684\u4fe1\u606f\u5931\u8d25");
						e.notifyObservers(this,"GetUserInfoError",a)
					}
				}
			)
		};
		this.sendGetFriendUin2=function(a,f,g,h,j,l){
			this.send(
				alloy.CONST.API_SERVER_URL+"get_friend_uin2",
				{
					context:this,
					data:{
						tuin:a,
						verifysession:j||"",
						type:f,
						code:h||"",
						vfwebqq:alloy.portal.getVfWebQQ()
					},
					arguments:{uin:a},
					onSuccess:function(b){
						b.retcode===0?(
							l||setTimeout(function(){try{m&&m.close()}catch(a){}},0),
							g&&g(b),
							e.notifyObservers(this,"GetFriendUinSuccess",b)
						):b.retcode===1E3?o(
							a,
							function(a,b,c){d.sendGetFriendUin2(a,f,g,b,c)}
						):b.retcode===1001?(
							c.id("verify_img_code_wrong").style.display="inline",
							c.id("verify_img_code").src="http://captcha.qq.com/getimage?aid=1003901&"+Math.random(),
							c.id("verify_input_code").value="",
							c.id("verify_input_code").focus()
						):(
							setTimeout(function(){try{m&&m.close()}catch(a){}},0),
							e.notifyObservers(this,"GetFriendUinError",b)
						)
					},
					onError:function(a){
						b.out("\u83b7\u53d6\u4e00\u4e2a\u4eba\u7684uin\u5931\u8d25");
						e.notifyObservers(this,"GetFriendUinError",a)
					}
				}
			)
		};
		this.sendModifyMyDetails=function(a){
			a.vfwebqq=alloy.portal.getVfWebQQ();
			this.send(
				alloy.CONST.API_SERVER_URL+"modify_my_details2",
				{
					context:this,
					method:"POST",
					data:{r:b.json.stringify(a)},
					arguments:{},
					onSuccess:function(a){
						a.retcode===0?(
							b.out(":ModifyMyDetailsSuccess..."),
							e.notifyObservers(this,"ModifyMyDetailsSuccess",a)
						):(
							b.out("[sendModifyMyDetails\uff1a\u6570\u636e\u683c\u5f0f\u9519\u8bef] error: "+a.retcode+"-"+a.errmsg),
							e.notifyObservers(this,"ModifyMyDetailsError",a)
						)
					},
					onError:function(a){
						b.out("\u4fee\u6539\u81ea\u5df1\u7684\u7684\u8be6\u7ec6\u8d44\u6599\u5931\u8d25");
						e.notifyObservers(this,"ModifyMyDetailsError",a)
					}
				}
			)
		};
		this.sendModifyMyAvatar=function(a){
			a.vfwebqq=alloy.portal.getVfWebQQ();
			this.send(
				alloy.CONST.API_SERVER_URL+"modify_my_head",
				{
					context:this,
					method:"POST",
					data:{r:b.json.stringify(a)},
					arguments:{},
					onSuccess:function(a){a.retcode===0?e.notifyObservers(this,"ModifyMyAvatarSuccess",a):e.notifyObservers(this,"ModifyMyAvatarError",a)},
					onError:function(a){e.notifyObservers(this,"ModifyMyAvatarError",a)}
				}
			)
		};
		this.sendGetGroupInfoByGid=function(a){
			this.send(
				alloy.CONST.API_SERVER_URL+"get_group_info_ext2",
				{
					context:this,
					data:{
						gcode:a,
						vfwebqq:alloy.portal.getVfWebQQ()
					},
					arguments:{gcode:a},
					onSuccess:function(a){
						a.retcode===0?(
							b.out(":GetUserInfoSuccess..."),
							e.notifyObservers(this,"GetGroupInfoByGidSuccess",a)
						):(
							b.out("[sendGetUserInfo\uff1a\u6570\u636e\u683c\u5f0f\u9519\u8bef] error: "+a.retcode+"-"+a.errmsg),
							e.notifyObservers(this,"GetGroupInfoByGidError",a)
						)
					},
					onError:function(a){
						b.out("\u83b7\u53d6\u7fa4\u7684\u4fe1\u606f\u5931\u8d25");
						e.notifyObservers(this,"GetUserInfoError",a)
					}
				}
			)
		};
		this.sendGetGroupPublicInfo=function(a,c,d,g){
			this.send(
				alloy.CONST.API_SERVER_URL+"get_group_public_info2",
				{
					context:this,
					data:{
						gcode:a,
						vfwebqq:alloy.portal.getVfWebQQ()
					},
					arguments:c||{gcode:a},
					onSuccess:d||function(a){
						a.retcode===0?(
							b.out(":GetGroupPublicInfoSuccess..."),
							e.notifyObservers(this,"GetGroupPublicInfoSuccess",a)
						):(
							b.out("[GetGroupPublicInfoError\uff1a\u6570\u636e\u683c\u5f0f\u9519\u8bef] error: "+a.retcode+"-"+a.errmsg),
							e.notifyObservers(this,"GetGroupPublicInfoError",a)
						)
					},
					onError:g||function(a){
						b.out("\u83b7\u53d6\u7fa4\u7684\u516c\u5171\u4fe1\u606f\u5931\u8d25");
						e.notifyObservers(this,"GetGroupPublicInfoError",a)
					}
				}
			)
		};
		this.sendGetGCardInfo=function(a){
			this.send(
				alloy.CONST.API_SERVER_URL+"get_self_business_card2",
				{
					context:this,
					data:{
						gcode:a,
						vfwebqq:alloy.portal.getVfWebQQ()
					},
					arguments:{gcode:a},
					onSuccess:function(a){
						a.retcode===0?(
							b.out(":GetGCardInfoSuccess..."),
							e.notifyObservers(this,"GetGCardInfoSuccess",a)
						):(
							b.out("[sendGetUserInfo\uff1a\u6570\u636e\u683c\u5f0f\u9519\u8bef] error: "+a.retcode+"-"+a.errmsg),
							e.notifyObservers(this,"GetGCardInfoError",a)
						)
					},
					onError:function(a){
						b.out("\u83b7\u53d6\u7fa4\u7684\u4fe1\u606f\u5931\u8d25");
						e.notifyObservers(this,"GetGCardInfoError",a)
					}
				}
			)
		};
		this.sendGetBuddyList=function(a,c,d){
			a=a||{};
			a.vfwebqq=alloy.portal.getVfWebQQ();
			alloy.portal.speedTest.sRTS(3,"start",new Date);
			this.send(
				alloy.CONST.API_SERVER_URL+"get_user_friends2",
				{
					context:this,
					arguments:a,
					method:"POST",
					data:{r:b.json.stringify(a)},
					onSuccess:c||function(a){
						if(a.retcode===0){
							for(var c=a.result.categories||[],d=!1,f=0;f<c.length;f++)
								c[f].index==0&&(d=!0);
							d||c.unshift({index:0,name:"\u6211\u7684\u597d\u53cb"});
							b.out(":GetBuddyListSuccess...1");
							e.notifyObservers(this,"GetBuddyListSuccess",a.result);
							b.out(":GetBuddyListSuccess...2")
						}else 
							b.out("[sendGetBuddyList] error: "+a.retcode+"-"+a.errmsg),
								e.notifyObservers(this,"GetBuddyListError",a),
								b.out("[sendGetBuddyList] error: end")
					},
					onError:d||function(a){
						b.out("\u597d\u53cb\u5217\u8868\u5931\u8d25");
						e.notifyObservers(this,"GetBuddyListError",a)
					}
				}
			)
		};
		this.sendBatchGetVipInfo=function(a,c,d,g){
			param={};
			param.ul=b.json.stringify(a);
			param.vfwebqq=alloy.portal.getVfWebQQ();
			this.send(
				alloy.CONST.API_SERVER_URL+"batch_get_vipinfo",
				{
					context:this,
					arguments:c||param,method:"POST",
					data:param,
					onSuccess:d||function(a){
						a.retcode===0?e.notifyObservers(this,"BatchGetVipInfoSuccess",a.result):(
							b.out("\u6279\u91cf\u62c9\u53d6\u4f1a\u5458\u4fe1\u606f\u5931\u8d25"),
							e.notifyObservers(this,"BatchGetVipInfoError",a)
						)
					},
					onError:g||function(a){
						b.out("\u6279\u91cf\u62c9\u53d6\u4f1a\u5458\u4fe1\u606f\u51fa\u9519");
						e.notifyObservers(this,"BatchGetVipInfoError",a)
					}
				}
			)
		};
		this.sendGetGroupList=function(a,c,d){
			a=a||{};
			a.vfwebqq=alloy.portal.getVfWebQQ();
			this.send(
				alloy.CONST.API_SERVER_URL+"get_group_name_list_mask2",
				{
					context:this,
					arguments:a,
					method:"POST",
					data:{r:b.json.stringify(a)},
					onSuccess:c||function(a){
						a.retcode===0?(
							e.notifyObservers(this,"GetGroupListSuccess",a.result),
							b.out(":GetGroupListSuccess...")
						):(
							b.out("[sendGetGroupList] error: "+a.retcode+"-"+a.errmsg),
							e.notifyObservers(this,"GetGroupListError",a)
						)
					},
					onError:d||function(a){
						b.out("\u7fa4\u5217\u8868\u5931\u8d25");
						e.notifyObservers(this,"GetGroupListError",a)
					}
				}
			)
		};
		this.sendGetRecentList=function(a,c,d){
			a=a||{};
			a.vfwebqq=alloy.portal.getVfWebQQ();
			this.send(
				alloy.CONST.API_SERVER_URL+"get_recent_contact2",
				{
					context:this,
					method:"POST",
					data:{r:b.json.stringify(a)},
					onSuccess:c||function(a){
						a.retcode===0?(
							e.notifyObservers(this,"GetRecentListSuccess",a.result),
							b.out(":GetRecentListSuccess...")
						):(
							b.out("[sendGetRecentList] error: "+a.retcode+"-"+a.errmsg),
							e.notifyObservers(this,"GetRecentListError",a)
						)
					},
					onError:d||function(a){
						b.out("\u6700\u8fd1\u8054\u7cfb\u4eba\u5217\u8868\u5931\u8d25");
						e.notifyObservers(this,"GetRecentListError",a)
					}
				}
			)
		};
		this.sendChangeGroupMask=function(){};
		this.sendGetGroupInfo=function(a,c,d){
			a=a||{};
			a.vfwebqq=alloy.portal.getVfWebQQ();
			this.send(
				alloy.CONST.API_SERVER_URL+"get_group_info_ext2",
				{
					context:this,
					data:a,
					arguments:a,
					onSuccess:c||function(a){
						a.retcode===0?(
							b.out(":GetGroupInfoSuccess 1..."),
							e.notifyObservers(this,"GetGroupInfoSuccess",a.result),
							b.out(":GetGroupInfoSuccess 2...")
						):(
							b.out("[sendGetGroupInfo] error: "+a.retcode+"-"+a.errmsg),
							e.notifyObservers(this,"GetGroupInfoError",a)
						)
					},
					onError:d||function(a){
						b.out("\u7fa4\u8d44\u6599\u5931\u8d25");
						e.notifyObservers(this,"GetGroupInfoError",a)
					}
				}
			)
		};
		this.sendGetQQAllow=function(a,b){
			this.send(
				alloy.CONST.API_SERVER_URL+"get_allow_info2",
				{
					context:this,
					method:"GET",
					data:{
						tuin:a,
						retainKey:"allow",
						vfwebqq:alloy.portal.getVfWebQQ()
					},
					arguments:{uin:a},
					onSuccess:b||function(){},
					onError:function(){}
				}
			)
		};
		this.sendGetQQLevel=function(a){
			this.send(
				alloy.CONST.API_SERVER_URL+"get_qq_level2",
				{
					context:this,
					method:"GET",
					data:{
						tuin:a,
						vfwebqq:alloy.portal.getVfWebQQ()
					},
					arguments:{uin:a},
					onSuccess:function(a){
						a.retcode===0?(
							b.out(":GetQQLevelSuccess 1..."),
							e.notifyObservers(d,"GetQQLevelSuccess",a),
							b.out(":GetQQLevelSuccess 2...")
						):(
							b.out("[sendGetQQLevel] error: "+a.retcode+"-"+a.errmsg),
							e.notifyObservers(d,"GetQQLevelError",a)
						)
					},
					onError:function(a){
						b.out("QQ\u7b49\u7ea7\u62c9\u53bb\u5931\u8d25");
						e.notifyObservers(d,"GetQQLevelError",a)
					}
				}
			)
		};
		this.sendSetSignature=function(a){alloy.rpcService.send(alloy.CONST.API_SERVER_URL+"set_long_nick2",{context:d,method:"POST",data:{r:b.json.stringify({nlk:a,vfwebqq:alloy.portal.getVfWebQQ()})},arguments:{nlk:a},onSuccess:function(c){c.retcode===0?e.notifyObservers(d,"SetBuddySignatureSuccess",a):(e.notifyObservers(d,"SetBuddySignatureError",a),b.error("[sendSetSelfSignature] error: "+c.retcode+"-"+c.errmsg))}})};this.sendGetSignature=function(a){this.send(alloy.CONST.API_SERVER_URL+"get_single_long_nick2",{context:this,method:"GET",data:{tuin:a,vfwebqq:alloy.portal.getVfWebQQ()},arguments:{uin:a},onSuccess:function(a){a.retcode===0?e.notifyObservers(d,"GetBuddySignatureSuccess",a):b.out("[sendGetSignature] error: "+a.retcode+"-"+a.errmsg)},onError:function(){b.out(" sendGetSignatureError")}})};this.sendGetMultiSignature=function(a){this.send(alloy.CONST.API_SERVER_URL+"get_long_nick",{context:this,method:"GET",data:{tuin:a,vfwebqq:alloy.portal.getVfWebQQ()},onSuccess:function(a){a.retcode===0?e.notifyObservers(d,"GetMultiBuddySignatureSuccess",a):b.out("[sendGetSignature] error: "+a.retcode+"-"+a.errmsg)},onError:function(){b.out(" sendGetSignatureError")}})};this.sendGetTipsInfo=function(a){a=a||{};alloy.rpcService.selfSend(alloy.CONST.MAIN_URL+"web2/get_msg_tip",{context:d,method:"GET",data:{uin:a.uin||"",tp:a.tp||1,id:a.id||0,retype:a.retype||1,rc:a.rc||0,lv:alloy.portal.getLoginLevel()||""},onSuccess:a.onSuccess?a.onSuccess:function(a){a.c===0?e.notifyObservers(d,"GetTipsInfoSuccess",a):a.c!==1&&b.error("[sendGetTipsInfo] error!")}})};this.sendQuitGroup=function(a){a.vfwebqq=alloy.portal.getVfWebQQ();alloy.rpcService.send(alloy.CONST.API_SERVER_URL+"quit_group2",{context:this,method:"POST",data:{r:b.json.stringify(a)},arguments:a,onSuccess:function(a){a.retcode===0?(b.out(":sendQuitGroup..."),e.notifyObservers(alloy.rpcService,"sendQuitGroupSuccess",a)):(b.out("[sendModifyMyDetails\uff1a\u6570\u636e\u683c\u5f0f\u9519\u8bef] error: "+a.retcode+"-"+a.errmsg),e.notifyObservers(alloy.rpcService,"sendQuitGroupError",a))},onError:function(a){b.out("\u9000\u51fa\u5931\u8d25");e.notifyObservers(alloy.rpcService,"sendQuitGroupError",a)}})};this.getAppInfo=function(a,c,d,e){a={appid:parseInt(a),loadMethod:0};if(c)a.val=c;a.vfwebqq=alloy.portal.getVfWebQQ();alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL+"keycgi/qqweb/market/getappinfo.do",{context:a.context||this,method:"GET",data:{appattrib:b.json.stringify(a)},arguments:a,onSuccess:d||function(){},onError:e||function(){}})};this.setAppVote=function(a,c,g){alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL+"cgi/qqweb/market/updateapphot.do",{context:a.context||this,method:"POST",data:{appattrib:b.json.stringify(a),vfwebqq:alloy.portal.getVfWebQQ()},arguments:a,onSuccess:c||function(){},onError:g||function(a){b.out("\u5e94\u7528\u8bc4\u5206\u5931\u8d25");e.notifyObservers(d,"SetAppVoteError",a)}})};this.createAppComment=function(a,b,c){a.ni=a.ni||alloy.portal.getPortalSelf("nick")||alloy.portal.getPortalSelf("uin");a.vfwebqq=alloy.portal.getVfWebQQ();alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL+"cgi/qqweb/market/createappcomment.do",{context:a.context||this,method:"POST",data:a,arguments:a,onSuccess:b||function(){},onError:c||function(){}})};this.createAppComplain=function(a,c,d){a.ni=a.ni||alloy.portal.getPortalSelf("nick")||alloy.portal.getPortalSelf("uin");a.vfwebqq=alloy.portal.getVfWebQQ();alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL+"cgi/qqweb/market/appusercomplain.do",{context:a.context||this,method:"POST",data:{appattrib:b.json.stringify(a)},arguments:a,onSuccess:c||function(){},onError:d||function(){}})};this.sendSetConfig=function(a){a.data.vfwebqq=alloy.portal.getVfWebQQ();var c=a.action||"set";a.data&&a.data.r&&(a.data.r=b.json.stringify(a.data.r));this.cgiSend(alloy.CONST.JAVA_CGI_URL+"keycgi/qqweb/newuac/"+c+".do",{method:"POST",data:a.data,onSuccess:a.onSuccess,context:a.context})};this.sendMessageFilterConfig=function(a){a.data.vfwebqq=qqweb.portal.getVfWebQQ();this.cgiSend(alloy.CONST.JAVA_CGI_URL+"keycgi/qqweb/uac/messagefilter.do",{method:"POST",data:a.data,onSuccess:a.onSuccess,context:a.context})};this.sendSetConfigNew=function(a){this.cgiSend(alloy.CONST.JAVA_CGI_URL+"keycgi/qqweb/newuac/"+(a.action||"set")+".do",{method:"POST",data:{r:b.json.stringify(a.data),vfwebqq:alloy.portal.getVfWebQQ()},arguments:a.arguments,onSuccess:a.onSuccess,context:a.context})};this.sendMSetConfig=function(a){this.cgiSend(alloy.CONST.JAVA_CGI_URL+"keycgi/qqweb/newuac/mset.do",{method:"POST",data:{r:b.json.stringify(a.data),vfwebqq:alloy.portal.getVfWebQQ()},onSuccess:a.onSuccess,context:a.context})};var h=function(){q&&(d.sendMSetConfig({data:q}),q=null)};this.sendMSetConfigDelay=function(a){l&&clearTimeout(l);q=q||{};var b=a.data,c;for(c in b){q[c]=q[c]||{};for(var d in b[c])q[c][d]=b[c][d]}l=setTimeout(h,a.delay||5E3)};this.sendGetConfig=function(a){a.data=a.data||{};a.data.uin=qqweb.portal.getUin();a.data&&a.data.r&&(a.data.r=b.json.stringify(a.data.r));this.cgiSend(alloy.CONST.JAVA_CGI_URL+"keycgi/qqweb/newuac/"+a.action+".do",{data:a.data,arguments:a.arguments,method:"POST",timeout:2E4,onSuccess:a.onSuccess,onError:a.onError,onComplete:a.onComplete,onTimeout:a.onTimeout,context:a.context})};this.sendGetAllConfig=function(a){a.data=a.data||{};a.data.uin=alloy.portal.getUin();a.data&&a.data.r&&(a.data.r=b.json.stringify(a.data.r));this.cgiSend(alloy.CONST.JAVA_CGI_URL+"keycgi/qqweb/newuac/getall.do",{data:a.data,arguments:a.arguments,method:"POST",onSuccess:a.onSuccess,context:a.context})};this.sendGetNewAppCount=function(){var a={};this.cgiSend(alloy.CONST.JAVA_CGI_URL+"cgi/qqweb/market/getnewappnumber.do",{context:this,method:"GET",data:{r:'{"appid":1000000,"type":[1,-1]}'},onSuccess:function(b){b.retcode===0?e.notifyObservers(alloy.rpcService,"SendGetNewAppCountSuccess",b):e.notifyObservers(alloy.rpcService,"SendMsgError",{uin:a.to,retcode:b.retcode,errmsg:b.errmsg})},onError:function(){}})};this.sendGetDefaultAppIntroduce=function(a,c,g){alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL+"keycgi/qqweb/market/getdefaultappinfo.do",{context:d,method:"POST",data:{appattrib:b.json.stringify(a),vfwebqq:alloy.portal.getVfWebQQ()},arguments:a,onSuccess:c||function(a){a.retcode===0?onGetAppIntroduceSuccess(a.result.resultData):b.out("\u5e94\u7528\u4ecb\u7ecd\u62c9\u53d6\u5931\u8d25"+a.errmsg)},onError:g||function(a){b.out("\u5e94\u7528\u62c9\u53d6\u5931\u8d25");e.notifyObservers(d,"GetAppIntroduceError",a)}})};this.sendReport=function(a){alloy.rpcService.formSend("http://tj.qstatic.com/log",{method:"POST",data:{r:b.string.trim(a)}})};this.reportQstatic=function(a){qqweb.util.report2qqweb(a)};this.sendSearchGroup=function(a){a.data.vfwebqq=qqweb.portal.getVfWebQQ();this.cgiSend(alloy.CONST.JAVA_CGI_URL+"keycgi/qqweb/group/search.do",{data:a.data,arguments:a.data,onSuccess:a.onSuccess,onError:a.onError,context:a.context})};this.sendGetGroupLog2=function(a,c,g){var h,j;a.mode==1?(h=a.lastbs?a.lastbs-a.ps:0,j=a.lastbs?a.lastbs-1:0):a.mode==2&&(h=a.lastes?a.lastes+1:0,j=a.lastes?a.lastes+a.ps:0);h={ps:a.ps,bs:h,es:j,gid:a.gcode,mode:a.mode,vfwebqq:qqweb.portal.getVfWebQQ()};this.cgiSend(alloy.CONST.JAVA_CGI_URL+"keycgi/top/groupchatlog",{context:this,data:h,arguments:{gid:a.gid,gcode:a.gcode},onSuccess:c||function(a){e.notifyObservers(d,"SendGetGroupLogSuccess",a)},onError:g||function(){b.out("[SendGetGroupLog] error")}})};this.sendGetGroupLogDates=function(a,c,d){a.vfwebqq=qqweb.portal.getVfWebQQ();this.cgiSend(alloy.CONST.JAVA_CGI_URL+"keycgi/top/chatlogdates",{context:this,data:a,onSuccess:c||function(){},onError:d||function(){b.out("[SendGetGroupLog] error")}})};this.sendGetDiscuLog=function(a,c,d){var e={p:a.p,gid:a.did.slice(1),c:a.c,ty:2,vfwebqq:qqweb.portal.getVfWebQQ()};this.cgiSend(alloy.CONST.JAVA_CGI_URL+"cgi/top/get_one_page",{context:this,data:e,arguments:{did:a.did,p:a.p,c:a.c},onSuccess:c||function(){},onError:d||function(){b.out("[SendGetGroupLog] error")}})};this.sendGetGroupLogByTime=function(a,c,g){arguments={gid:a.gid,gcode:a.gcode};var h=a;h.gid=a.gcode;h.vfwebqq=qqweb.portal.getVfWebQQ();this.cgiSend(alloy.CONST.JAVA_CGI_URL+"keycgi/qqweb/group/uintimechatlog.do",{context:this,data:h,arguments:arguments,onSuccess:c||function(a){e.notifyObservers(d,"sendGetGroupLogByTime",a)},onError:g||function(){b.out("[SendGetGroupLog] error")}})};this.reportAppRun=function(a){a={appid:0,rappid:parseInt(a)};alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL+"cgi/qqweb/market/record.do",{context:a.context||this,method:"POST",data:{appattrib:b.json.stringify(a),vfwebqq:alloy.portal.getVfWebQQ()},arguments:a})};this.reportAppShare=function(a){a={type:parseInt(a.type),appid:parseInt(a.appId)};alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL+"cgi/qqweb/market/appshare.do",{context:a.context||this,method:"POST",data:{appattrib:b.json.stringify(a),vfwebqq:alloy.portal.getVfWebQQ()},arguments:a})};this.sendGetAPISkey=function(a){a=a||{};alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL+"cgi/qqweb/app/loadapp.do",{context:d,method:"GET",data:{r:b.json.stringify({appid:a.appid})},timeout:1E4,onSuccess:a.onSuccess,onError:a.onError,onTimeout:a.onTimeout})};this.sendCheckHack=function(a){alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL+"cgi/qqweb/check.do",{context:d,method:"POST",data:{k:a.key},onSuccess:a.onSuccess})};this.sendGetVipConfig=function(a,b,c){if(alloy.portal.getLoginLevel()>alloy.CONST.LOGIN_LEVEL_NONE){var g={level:a.level};g.vfwebqq=qqweb.portal.getVfWebQQ();this.send(alloy.CONST.API_SERVER_URL+"get_vipconfig",{context:a.context||this,data:g,onSuccess:b||function(a){a.retcode===0&&a.result?e.notifyObservers(d,"GetVipConfigSuccess",a):e.notifyObservers(d,"GetVipConfigError")},onError:c||function(){e.notifyObservers(d,"GetVipConfigError")},onTimeout:function(){e.notifyObservers(d,"GetVipConfigError")}})}};this.sendSetVipConfig=function(a,c,g){if(alloy.portal.getLoginLevel()>alloy.CONST.LOGIN_LEVEL_NONE){var h={};h.vfwebqq=qqweb.portal.getVfWebQQ();h.roamall=a.roamall||0;if(a.setuinlist&&a.setuinlist.length)h.setuinlist=b.json.stringify(a.setuinlist);if(a.unsetuinlist&&a.unsetuinlist.length)h.unsetuinlist=b.json.stringify(a.unsetuinlist);this.send(alloy.CONST.API_SERVER_URL+"set_vipconfig",{context:a.context||this,method:"POST",arguments:a.arguments,data:h,onSuccess:c||function(a){a.retcode===0&&a.result?e.notifyObservers(d,"SetVipConfigSuccess",a):e.notifyObservers(d,"SetVipConfigError",a)},onError:g||function(a){e.notifyObservers(d,"SetVipConfigError",a)},onTimeout:function(){e.notifyObservers(d,"SetVipConfigError",data)}})}};this.getAppInfoMulti=function(a){var c={appid:a.appList,loadMethod:4};alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL+"keycgi/qqweb/market/getappinfo.do",{context:c.context||this,method:"GET",data:{appattrib:b.json.stringify(c)},arguments:c,onSuccess:a.onSuccess||function(){},onError:a.onError||function(){},onTimeout:a.onError||function(){}})};this.sendGetRecentChat=function(a){this.send(alloy.CONST.API_SERVER_URL+"recent_chat",{context:this,method:"GET",timeout:1E4,data:{vfwebqq:alloy.portal.getVfWebQQ()},onSuccess:a.onSuccess,onError:a.onError})};this.sendFileErrorReport=function(a){this.cgiSend(alloy.CONST.JAVA_CGI_URL+"cgi/top/save_logs",{context:d,method:"POST",data:{logdata:b.json.stringify(a),vfwebqq:alloy.portal.getVfWebQQ()}})}});
Jx().$package(
	"alloy.layout.themeManager",
	function(b){
		var d=this,
			c=b.dom,
			e=b.event,
			g,
			j,
			l,
			q,
			u={id:"theme_blue_glow"},
			p=null,
			v=0;
		window.webTop&&(u={id:"theme_blue_glow"});
		var x;
		this.themeConfig={
			theme_blue:{
				id:"theme_blue",
				name:"\u68a6\u5e7b\u5149\u5f71",
				skin:"blue",
				wallpaper:{
					url:"blue.jpg?t=20111011001",
					mode:"centerRepeat"
				}
			},
			theme_pinky_night:{
				id:"theme_pinky_night",
				name:"\u7c89\u7ea2\u4e4b\u591c",
				skin:"pink",
				wallpaper:{
					url:"pinky_night.jpg?t=20111011001",
					mode:"centerRepeat"
				}
			},
			theme_green:{
				id:"theme_green",
				name:"\u9752\u9752\u4e16\u754c",
				skin:"light_green",
				wallpaper:{
					url:"green.jpg",
					mode:"centerRepeat"
				}
			},
			theme_wood1:{
				id:"theme_wood1",
				name:"\u6e29\u99a8\u6728\u7eb9",
				skin:"dark_brown",
				wallpaper:{
					url:"wood1.jpg",
					mode:"centerRepeat"
				}
			},
			theme_wood2:{
				id:"theme_wood2",
				name:"\u9ed1\u8272\u6728\u7eb9",
				skin:"black",
				wallpaper:{
					url:"wood2.jpg",
					mode:"centerRepeat"
				}
			},
			theme_universe:{
				id:"theme_universe",
				name:"\u795e\u79d8\u661f\u9645",
				skin:"dark_blue",
				wallpaper:{
					url:"universe.jpg?t=20111011001",
					mode:"centerRepeat"
				}
			},
			theme_metal:{
				id:"theme_metal",
				name:"\u9177\u70ab\u91d1\u5c5e",
				skin:"grey",
				wallpaper:{
					url:"metal.jpg?t=20111011001",
					mode:"centerRepeat"
				}
			},
			theme_pinky_light:{
				id:"theme_pinky_light",
				name:"\u5e7b\u5f69\u8367\u5149",
				skin:"light_violet",
				wallpaper:{
					url:"pinky_light.jpg?t=20111011001",
					mode:"fill"
				}
			},
			theme_pinky_flower:{
				id:"theme_pinky_flower",
				name:"\u7eda\u70c2\u7e41\u82b1",
				skin:"dark_voilet",
				wallpaper:{
					url:"pinky_flower.jpg?t=20111011001",
					mode:"fill"
				}
			},
			theme_christmas:{
				id:"theme_christmas",
				name:"\u5723\u8bde\u5feb\u4e50",
				skin:"light_blue",
				wallpaper:{
					url:"christmas.jpg?t=20111011001",
					mode:"fill"
				},
				scene:"sceneChristmas"
			},
			theme_2011:{
				id:"theme_2011",
				name:"\u6b22\u5e86\u5143\u65e6",
				skin:"black",
				wallpaper:{
					url:"2011.jpg",
					mode:"fill"
				}
			},
			theme_blue1:{
				id:"theme_blue1",
				name:"\u5e7b\u5f69\u84dd\u5929",
				skin:"dark_blue",
				wallpaper:{
					url:"blue1.jpg?t=20111011001",
					mode:"fill"
				}
			},
			theme_spring_festival:{
				id:"theme_spring_festival",
				name:"\u559c\u8fce\u65b0\u6625",
				skin:"grey",
				wallpaper:{
					url:"spring_festival.jpg?t=20111011001",
					mode:"centerRepeat"
				}
			},
			theme_valentinesDay:{
				id:"theme_valentinesDay",
				name:"\u751c\u871c\u60c5\u4eba\u8282",
				skin:"valentinesDay",
				wallpaper:{
					url:"valentinesDay.jpg?t=20111011001",
					mode:"fill"
				}
			},
			theme_cloud:{
				id:"theme_cloud",
				name:"\u6674\u7a7a\u884c\u4e91",
				skin:"blue",
				wallpaper:{
					url:"cloud.jpg?t=20111011001",
					mode:"centerRepeat"
				},
				scene:"cloud"
			},
			theme_gravity:{
				id:"theme_gravity",
				name:"\u84b2\u516c\u82f1",
				skin:"blue",
				wallpaper:{
					url:"cloud.jpg?t=20111011001",
					mode:"centerRepeat"
				},
				scene:"gravity"
			},
			theme_blue_glow:{
				id:"theme_blue_glow",
				name:"\u6df1\u6d77\u4ef0\u671b",
				skin:"grey",
				wallpaper:{
					url:"blue_glow.jpg",
					mode:"zoom"
				}
			},
			theme_green_glow:{
				id:"theme_green_glow",
				name:"\u6668\u5149\u5fae\u66e6",
				skin:"grey",
				wallpaper:{
					url:"green_glow.jpg",
					mode:"zoom"
				}
			},
			theme_orange_glow:{
				id:"theme_orange_glow",
				name:"\u68a6\u9192\u65f6\u5206",
				skin:"grey",
				wallpaper:{
					url:"orange_glow.jpg",
					mode:"zoom"
				}
			},
			theme_7_7:{
				id:"theme_7_7",
				name:"\u4e03\u5915",
				skin:"7_7",
				wallpaper:{
					url:"7_7.jpg",
					mode:"fill"
				}
			},
			theme_teachersDay:{
				id:"theme_teachersDay",
				name:"\u6559\u5e08\u8282",
				skin:"teachersDay",
				wallpaper:{
					url:"teachersDay.jpg",
					mode:"zoom"
				}
			},
			theme_midAutumn:{
				id:"theme_midAutumn",
				name:"\u4e2d\u79cb\u8282",
				skin:"pink",
				wallpaper:{
					url:"midAutumn.jpg",
					mode:"fill"
				}
			},
			theme_lookUpSky:{
				id:"theme_lookUpSky",
				name:"\u4ef0\u671b\u82cd\u7a79",
				skin:"blue",
				wallpaper:{
					url:"lookUpSky.jpg",
					mode:"fill"
				}
			},
			theme_grass:{
				id:"theme_grass",
				name:"\u832b\u832b\u91ce\u8349",
				skin:"grey",
				wallpaper:{
					url:"grass.jpg",
					mode:"fill"
				}
			},
			theme_childhood:{
				id:"theme_childhood",
				name:"\u7ae5\u5e74\u8bb0\u5fc6",
				skin:"pink",
				wallpaper:{
					url:"childhood.jpg",
					mode:"fill"
				}
			},
			theme_skyBlue:{
				id:"theme_skyBlue",
				name:"\u7a7a\u7075\u84dd\u8c03",
				skin:"blue",
				wallpaper:{
					url:"skyBlue.jpg",
					mode:"fill"
				}
			},
			theme_dandelionDream:{
				id:"theme_dandelionDream",
				name:"\u84b2\u82f1\u4e4b\u68a6",
				skin:"blue",
				wallpaper:{
					url:"dandelionDream.jpg",
					mode:"fill"
				}
			},
			theme_paintingTime:{
				id:"theme_paintingTime",
				name:"\u6c34\u58a8\u5e74\u534e",
				skin:"dark_brown",
				wallpaper:{
					url:"paintingTime.jpg",
					mode:"fill"
				}
			},
			theme_dreamSky:{
				id:"theme_dreamSky",
				name:"\u68a6\u7fd4\u5929\u9645",
				skin:"blue",
				wallpaper:{
					url:"dreamSky.jpg",
					mode:"fill"
				}
			}
		};
		var m=[];
		(function(){
			var a,b=0;
			for(a in d.themeConfig)
				d.themeConfig.hasOwnProperty(a)&&(m[b++]=d.themeConfig[a])
		})();
		this.themeArray=m;
		this.getThemeArray=function(a){
			var c=[],e;
			for(e=0;e<a.length;e++)
				b.browser.mobileSafari&&a[e]=="theme_gravity"||c.push(d.themeConfig[a[e]]);
			return c
		};
		var o={
			skinRoot:"",
			timeStamp:20111011001,
			window:{
				titleColor:"#6d6d6d",
				titleHeight:"25px",
				textColor:"#666666",
				titleFontWeight:"bold",
				bodyAreaTop:"0",
				actionButtonWidth:"21px",
				actionButtonHeight:"19px",
				bodyColor:"#fff",
				ie6WindowCenterBackground:"#C2D2C8",
				ipadContainerBackColor:"rgba(168, 218, 127, .8)"
			},
			currentWindow:{
				titleColor:"#393836",
				textColor:"#333333",
				ipadContainerBackColor:"rgba(168, 218, 127, 1)",
				windowCenterBackground:"#A8DA7F",
				ie6WindowCenterBackground:"#A8DA7F"
			},
			appbar:{
				aColor:"white"
			},
			panel:{
				ie6Background:"#fff"
			},
			indicator:{
				bgHeight:"40px",
				ie6BgHeight:"28px",
				wrapperTop:"0",
				wrapperPosition:"static",
				ipadSystemBtn:".mobileSafari #navbar{width:222px;} .mobileSafari #navbar .system_button{display:none;visibility:visible;}"
			}
		},
		h=this.skinConfig={
			blue:{
				id:0,
				key:"blue",
				name:"\u6de1\u84dd",
				timeStamp:20111011001,
				window:{
					bodyColor:"#C4DCEA",
					ipadContainerBackColor:"rgba(182,234,253,.8)",
					ie6WindowCenterBackground:"#C4DEED"
				},
				currentWindow:{
					ipadContainerBackColor:"rgba(182,234,253,1)",
					ie6WindowCenterBackground:"#B6EAFD"
				}
			},
			black:{
				id:1,
				key:"black",
				name:"\u9ed1\u8272",
				timeStamp:20111011001,
				window:{
					bodyColor:"#E9E9E9",
					ipadContainerBackColor:"rgba(232,232,232,.8)",
					ie6WindowCenterBackground:"#C4C4C4"
				},
				currentWindow:{
					ipadContainerBackColor:"rgba(232,232,232,1)",
					ie6WindowCenterBackground:"#e8e8e8"
				}
			},
			light_green:{
				id:2,
				key:"light_green",
				name:"\u5ae9\u7eff",
				timeStamp:20111011001,
				window:{
					bodyColor:"#AFDD8B",
					ipadContainerBackColor:"rgba(168,218,127,.8)",
					ie6WindowCenterBackground:"#C2D2C8"
				},
				currentWindow:{
					ipadContainerBackColor:"rgba(168,218,127,1)",
					ie6WindowCenterBackground:"#A8DA7F"
				}
			},
			pink:{
				id:3,
				key:"pink",
				name:"\u6c34\u7c89",
				timeStamp:20111011001,
				window:{
					bodyColor:"#EFDEE5",
					ipadContainerBackColor:"rgba(255,225,229,.8)",
					ie6WindowCenterBackground:"#CCCCCC"
				},
				currentWindow:{
					ipadContainerBackColor:"rgba(255,225,229,1)",
					ie6WindowCenterBackground:"#FFE1E5"
				}
			},
			light_violet:{
				id:4,
				key:"light_violet",
				name:"\u6d45\u7d2b",
				timeStamp:20111011001,
				window:{
					bodyColor:"#EFDEE5",
					ipadContainerBackColor:"rgba(255,225,229,.8)",
					ie6WindowCenterBackground:"#CCCCCC"
				},
				currentWindow:{
					ipadContainerBackColor:"rgba(255,225,229,1)",
					ie6WindowCenterBackground:"#FFE1E5"
				}
			},
			dark_voilet:{
				id:5,
				key:"dark_voilet",
				name:"\u7d20\u7d2b",
				timeStamp:20111011001,
				window:{
					bodyColor:"#EFDEE5",
					ipadContainerBackColor:"rgba(255,225,229,.8)",
					ie6WindowCenterBackground:"#CCCCCC"
				},
				currentWindow:{
					ipadContainerBackColor:"rgba(255,225,229,1)",
					ie6WindowCenterBackground:"#FFE1E5"
				}
			},
			grey:{
				id:6,
				key:"grey",
				name:"\u94f6\u7070",
				timeStamp:20111011001,
				window:{
					bodyColor:"#E9E9E9",
					ipadContainerBackColor:"rgba(232,232,232,.8)",
					ie6WindowCenterBackground:"#C4C4C4"
				},
				currentWindow:{
					ipadContainerBackColor:"rgba(232,232,232,1)",
					ie6WindowCenterBackground:"#e8e8e8"
				}
			},
			dark_brown:{
				id:7,
				key:"dark_brown",
				name:"\u6d45\u68d5",
				timeStamp:20111011001,
				window:{
					bodyColor:"#E2D3BB",
					ipadContainerBackColor:"rgba(234,222,197,.8)",
					ie6WindowCenterBackground:"#C4C4C4"
				},
				currentWindow:{
					ipadContainerBackColor:"rgba(234,222,197,1)",
					ie6WindowCenterBackground:"#EADEC5"
				}
			},
			dark_blue:{
				id:8,
				key:"dark_blue",
				name:"\u6df1\u84dd",
				timeStamp:20111011001,
				window:{
					bodyColor:"#E9E9E9",
					ipadContainerBackColor:"rgba(232,232,232,.8)",
					ie6WindowCenterBackground:"#C4C4C4"
				},
				currentWindow:{
					ipadContainerBackColor:"rgba(232,232,232,1)",
					ie6WindowCenterBackground:"#e8e8e8"
				}
			},
			light_blue:{
				id:9,
				key:"light_blue",
				name:"\u6d45\u84dd",
				timeStamp:20111011001,
				window:{
					bodyColor:"#C4DCEA",
					ipadContainerBackColor:"rgba(232,232,232,.8)",
					ie6WindowCenterBackground:"#C4DEED"
				},
				currentWindow:{
					ipadContainerBackColor:"rgba(232,232,232,1)",
					ie6WindowCenterBackground:"#B6EAFD"
				}
			},
			valentinesDay:{
				id:10,
				key:"valentinesDay",
					
				name:"\u6d45\u84dd",
					
				timeStamp:20111011001,
					
				window:{
					bodyColor:"#E9E9E9",
					ipadContainerBackColor:"rgba(232,232,232,.8)",
					ie6WindowCenterBackground:"#C4C4C4"
				},
				currentWindow:{
					ipadContainerBackColor:"rgba(232,232,232,1)",
					ie6WindowCenterBackground:"#e8e8e8"
				}
			},
			red:{
				id:11,
				key:"red",
				name:"\u4eae\u7ea2",
				timeStamp:20111011001,
				window:{
					bodyColor:"#F1B7B7",
					ipadContainerBackColor:"rgba(245,194,194,.8)",
					ie6WindowCenterBackground:"#F7CECE"
				},
				currentWindow:{
					ipadContainerBackColor:"rgba(245,194,194,1)",
					ie6WindowCenterBackground:"#F5C2C2"
				}
			},
			cyan:{
				id:12,
				key:"cyan",
				name:"\u78a7\u9752",
				timeStamp:20111011001,
				window:{
					bodyColor:"#BAE3D7",
					ipadContainerBackColor:"rgba(194,245,226,.8)",
					ie6WindowCenterBackground:"#CEF7E8"
				},
				currentWindow:{
					ipadContainerBackColor:"rgba(194,245,226,1)",
					ie6WindowCenterBackground:"#C2F5E2"
				}
			},
			purple:{
				id:13,
				key:"purple",
				name:"\u7d20\u7d2b",
				timeStamp:20111011001,
				window:{
					bodyColor:"#CAB7DE",
					ipadContainerBackColor:"rgba(224,194,245,.8)",
					ie6WindowCenterBackground:"#E6CEF7"
				},
				currentWindow:{
					ipadContainerBackColor:"rgba(224,194,245,1)",
					ie6WindowCenterBackground:"#E0C2F5"
				}
			},
			"7_7":{
				id:14,
				key:"7_7",
				name:"\u6c34\u7c89",
				timeStamp:20111011001,
				window:{
					bodyColor:"#EFDEE5",
					ipadContainerBackColor:"rgba(255,225,229,.8)",
					ie6WindowCenterBackground:"#CCCCCC"
				},
				currentWindow:{
					ipadContainerBackColor:"rgba(255,225,229,1)",
					ie6WindowCenterBackground:"#FFE1E5"
				}
			},
			teachersDay:{
				id:15,
				key:"teachersDay",
				name:"\u6de1\u84dd",
				timeStamp:20111011001,
				window:{
					ipadContainerBackColor:"rgba(182,234,253,.8)",
					ie6WindowCenterBackground:"#C4DEED"
				},
				currentWindow:{
					ipadContainerBackColor:"rgba(182,234,253,1)",
					ie6WindowCenterBackground:"#B6EAFD"
				}
			}
		};
		this.getSkinArray=function(a){
			var b=[],c;
			for(c=0;c<a.length;c++)
				b[c]=h[a[c]];
			return b
		};
		var a={},
			f={
				repeat:{
					isHackNeeded:!1,
					hackType:""
				},
				center:{
					isHackNeeded:!1,
					hackType:""
				},
				centerRepeat:{
					isHackNeeded:!1,
					hackType:""
				},
				zoom:{
					isHackNeeded:!0,
					hackType:"img"
				},
				adapt:{
					isHackNeeded:!0,
					hackType:"img"
				},
				fill:{
					isHackNeeded:!0,
					hackType:"img"
				},
				iframe:{
					isHackNeeded:!0,
					hackType:"iframe"
				}
			},
			n=function(){
				d.applyTheme(u?u.id:d.themeArray[Math.floor(Math.random()*100%d.themeArray.length)].id,!0)
			},
			s=function(a,b){
				var b=b||function(){},
					c=[],
					d=a.length;
				if(a.length)
					for(var e=function(){--d<1&&(b(c),c=null)},f=function(){this.onerror=this.onload=null;e()},g=function(){this.onerror=this.onload=null;e()};a.length>0;){
						var h=new Image;
						c.push(h);
						h.onload=f;
						h.onerror=g;
						h.src=a.shift()
					}
				else 
					b(c)
			},
			w=new b.Class({
					init:function(){
						this._iframeWallpaperContainter=this._zoomWallpaperContainer=null;
						this._mode="repeat";
						var a=this;
						this._onWindowResize=function(){a.setWallpaperSize.apply(a)}
					},
					getMode:function(){return this._mode},
					isHackLayerNeeded:function(){return!0},
					isHackLayerNeed2Change:function(){return f[this._mode].hackType!=f[this._nMode].hackType},
					isModeHackNeeded:function(a){return f[a].isHackNeeded},
					initHackLayer:function(){
						if(this.isHackLayerNeeded()&&(!this.isModeHackNeeded(this._mode)||this.isHackLayerNeed2Change()))
							this.onInitHackLayer(f[this._nMode].hackType)
					},
					onInitHackLayer:function(a){
						(this._zoomWallpaperContainer=c.id("zoomWallpaperGrid"))&&document.body.removeChild(this._zoomWallpaperContainer);
						switch(a){
							case "img":
								this._zoomWallpaperContainer=c.node(
									"div",
									{
										id:"zoomWallpaperGrid",
										"class":"zoomWallpaperGrid",
										style:"position:absolute;z-index:-10;left:0;top:0;overflow:hidden;"
									}
								);
								this._zoomWallpaperContext=c.node(
									"img",
									{
										id:"zoomWallpaper",
										"class":"zoomWallpaper",
										style:"position:absolute;"
									}
								);
								this._zoomWallpaperContainer.appendChild(this._zoomWallpaperContext);
								document.body.appendChild(this._zoomWallpaperContainer);
								e.on(window,"resize",this._onWindowResize);
								break;
							case "iframe":
								this._zoomWallpaperContainer=c.node(
									"div",
									{
										id:"zoomWallpaperGrid",
										"class":"zoomWallpaperGrid",
										style:"position:absolute;left:0;top:0;overflow:hidden;width:100%;height:100%;z-index:-1;"
									}
								),
								this._zoomWallpaperContext=c.node("div"),
								this._zoomWallpaperContext.innerHTML='<iframe id ="iframeWallpaper" frameborder="no" border="0" class ="iframeWallpaper" style ="position:absolute;left:0;top:0;overflow:hidden;width:100%;height:100%;"></iframe>',
								this._zoomWallpaperContainer.appendChild(this._zoomWallpaperContext),
								document.body.appendChild(this._zoomWallpaperContainer)
						}
					},
					removeHackLayout:function(){
						if(this.isHackLayerNeeded()&&this.isModeHackNeeded(this._mode)){
							if(this._zoomWallpaperContainer&&(c.setStyle(this._zoomWallpaperContainer,"display","none"),this._mode=="iframe"))
								c.id("iframeWallpaper").src="domain.html";
							e.off(window,"resize",this._onWindowResize)
						}else 
							this.isModeHackNeeded(this._mode)&&c.removeClass(document.body,"wallpaperCss3"+this._mode)
					},
					getCurrentWallpaper:function(){return this._wallpaper.src},
					getCurrentMode:function(){return this._wallpaper.mode},
					applyWallpaper:function(a,b){
						this._wallpaper={src:a,mode:b};
						this._nMode=b;
						b=="iframe"?this.applyIframeWallpaper(a):this.applyImageWallpaper(a,b)
					},
					applyImageWallpaper:function(a){s([a],b.bind(this.onWallpaperLoaded,this))},
					applyIframeWallpaper:function(a){
						this.initHackLayer();
						this._mode=this._nMode;
						if(this._zoomWallpaperContext)
							c.id("iframeWallpaper").src=a
					},
					applyBackColor:function(a){c.setStyle(document.body,"backbroundColor",a)},
					onWallpaperLoaded:function(a){
						this._wallpaper.height=a[0].height;
						this._wallpaper.width=a[0].width;
						a="url("+this._wallpaper.src+")";
						this._nMode=this._nMode||u&&u.mode||"repeat";
						switch(this._nMode){
							case "repeat":
								this.removeHackLayout();
								this._mode="repeat";
								c.setStyle(document.body,"backgroundImage",a);
								c.setStyle(document.body,"backgroundRepeat","repeat");
								c.setStyle(document.body,"backgroundPosition","0 0");
								break;
							case "center":
								this.removeHackLayout();
								this._mode="center";
								c.setStyle(document.body,"backgroundImage",a);
								c.setStyle(document.body,"backgroundRepeat","no-repeat");
								c.setStyle(document.body,"backgroundPosition","center center");
								break;
							case "centerRepeat":
								this.removeHackLayout();
								this._mode="centerRepeat";
								c.setStyle(document.body,"backgroundImage",a);
								c.setStyle(document.body,"backgroundRepeat","repeat");
								c.setStyle(document.body,"backgroundPosition","center center");
								break;
							case "zoom":
							case "adapt":
							case "fill":
								this.initHackLayer(),
								this._mode=this._nMode,
								this.isHackLayerNeeded()?(
									c.setStyle(this._zoomWallpaperContainer,"display","none"),
									this.zoomWallpaper(),
									c.setStyle(document.body,"background","none")
								):(
									c.setStyle(document.body,"backgroundImage",a),
									c.setStyle(document.body,"backgroundRepeat","no-repeat"),
									c.addClass(document.body,"wallpaperCss3"+this._mode)
								)
						}
					},
					setWallpaperSize:function(){
						var a=alloy.layout.getDesktopHeight(),
							b=alloy.layout.getDesktopWidth(),
							d=this._wallpaper.height,
							e=this._wallpaper.width,
							f=b*d/e,
							g=a*e/d;
						c.setStyle(this._zoomWallpaperContainer,"height",a+"px");
						c.setStyle(this._zoomWallpaperContainer,"width",b+"px");
						switch(this._mode){
							case "zoom":
								c.setStyle(this._zoomWallpaperContext,"height",a+"px");
								c.setStyle(this._zoomWallpaperContext,"width",b+"px");
								break;
							case "adapt":
								e/d>b/a?(
									c.setStyle(this._zoomWallpaperContext,"height",Math.round(f)+"px"),
									c.setStyle(this._zoomWallpaperContext,"width",b+"px"),
									c.setStyle(this._zoomWallpaperContext,"top",Math.floor((a-f)/2)+"px"),
									c.setStyle(this._zoomWallpaperContext,"left","0")
								):(
									c.setStyle(this._zoomWallpaperContext,"height",a+"px"),
									c.setStyle(this._zoomWallpaperContext,"width",Math.round(g)+"px"),
									c.setStyle(this._zoomWallpaperContext,"left",Math.floor((b-g)/2)+"px"),
									c.setStyle(this._zoomWallpaperContext,"top","0")
								);
								break;
							case "fill":
								e/d>b/a?(
									c.setStyle(this._zoomWallpaperContext,"height",a+"px"),
									c.setStyle(this._zoomWallpaperContext,"width",Math.ceil(g)+"px"),
									c.setStyle(this._zoomWallpaperContext,"left",Math.floor((b-g)/2)+"px"),
									c.setStyle(this._zoomWallpaperContext,"top","0")
								):(
									c.setStyle(this._zoomWallpaperContext,"height",Math.ceil(f)+"px"),
									c.setStyle(this._zoomWallpaperContext,"width",b+"px"),
									c.setStyle(this._zoomWallpaperContext,"top",Math.floor((a-f)/2)+"px"),
									c.setStyle(this._zoomWallpaperContext,"left","0")
								)
						}
					},
					zoomWallpaper:function(){
						this._mode=="zoom"&&(
							c.setStyle(this._zoomWallpaperContext,"top","0"),
							c.setStyle(this._zoomWallpaperContext,"left","0")
						);
						this.setWallpaperSize();
						c.setStyle(this._zoomWallpaperContainer,"display","");
						this._zoomWallpaperContext.src=this._wallpaper.src
					},
					reset:function(){
						this.removeHackLayout();
						this._mode="repeat";
						b.browser.ie?(
							document.body.style.removeAttribute("backgroundImage"),
							document.body.style.removeAttribute("backgroundRepeat"),
							document.body.style.removeAttribute("backgroundPosition")
						):c.setStyle(document.body,"background","")
					}
			}),
			C=new b.Class({
				init:function(){
					this._oldStyleNode=c.id("skinStyleNode");
					this._cacheStyle={}
				},
				getCurrentSkin:function(){
					return this._skin
				},
				applySkin:function(a){
					this._skin=a=this.getConfig(a);
					s(this._getPreloadImages(a.skinRoot,a.timeStamp),b.bind(this._onImagePreloaded,this))
				},
				getConfig:function(c){
					var d={
						name:"",
						timeStamp:"",
						window:{
							ie6WindowCenterBackground:"",
							ipadContainerBackColor:""
						},
						currentWindow:{
							ie6WindowCenterBackground:"",
							ipadContainerBackColor:""
						},
						skinRoot:""
					};
					if(b.isObject(c))
						d.id=(new Date).getTime(),
						d.name=c.name||"",
						d.timeStamp=c.timeStamp||"",
						d.window.ipadContainerBackColor=c.window.ipadContainerBackColor||"",
						d.window.ie6WindowCenterBackground=c.window.ie6WindowCenterBackground||"",
						d.currentWindow.ipadContainerBackColor=c.currentWindow.ipadContainerBackColor||"",
						d.currentWindow.ie6WindowCenterBackground=c.currentWindow.ie6WindowCenterBackground||"",
						d.skinRoot=c.skinRoot;
					else if(h[c]){
						b.extend(d,h[c]);
						var e=a[c];
						e||(e=alloy.util.getCdnUrlById(h[c].id)+"style/skin/"+c,a[c]=e);
						d.skinRoot=e
					}
					return d
				},
				applySkinStyle:function(a){
					if(this._newStyleNode)
						this._oldStyleNode&&c.getDocHead().removeChild(this._oldStyleNode),
						this._oldStyleNode=this._newStyleNode;
					this._newStyleNode=c.createStyleNode(a,"skinStyleNode"+v++)
				},
				_onImagePreloaded:function(){
					var a=this._cacheStyle[this._skin.id];
					if(!a){
						var a=this._skin,c;
						c=x;
						a=b.extend({},o,a);
						a=b.string.template(c,a);
						this._cacheStyle[this._skin.id]=a
					}
					this.applySkinStyle(a)
				},
				_getPreloadImages:function(a,c){
					return b.browser.ie==6||b.browser.ie==7?[]:[a+"/images/suggess_list_bg.png?t="+c,a+"/images/sprite_repeat_x_png.png?t="+c,a+"/images/sprite_main_png.png?t="+c]
				}
			}),
			y=new b.Class({
				init:function(){
					this.isInit=!0;
					this.curScene=null
				},
				getCurrentScene:function(){
					return this.curScene
				},
				applyScene:function(a){
					this.curScene&&this.closeScene();
					if(this.curScene=a)
						if(alloy.appconfig.getAllConfig(a))
							alloy.portal.runApp(a);
					else{
						this._iframeContainer=c.node(
							"div",
							{
								id:"sceneGrid",
								"class":"sceneGrid",
								style:"position:absolute;left:0;top:0;overflow:hidden;width:100%;height:100%;z-index:-1;"
							}
						);
						this._iframeContext=c.node("div");
						this._iframeContext.innerHTML='<iframe id ="iframeScene" frameborder="no" border="0" class ="iframeScene" allowtransparency="true" style ="position:absolute;left:0;top:0;overflow:hidden;width:100%;height:100%;background-color:transparent;"></iframe>';
						this._iframeContainer.appendChild(this._iframeContext);
						var b=c.id("zoomWallpaperGrid");
						b?alloy.layout.getDesktop().body.insertBefore(this._iframeContainer,b):alloy.layout.getDesktop().body.appendChild(this._iframeContainer);
						c.id("iframeScene").src=a
					}
				},
				closeScene:function(a){
					a=a||this.curScene;
					if(alloy.appconfig.getAllConfig(a))
						(a=alloy.portal.getApp(a))&&a.isRunning()&&a.exit();
					else if(a=c.id("sceneGrid"))
						c.id("iframeScene").src="domain.html",
						a.parentNode.removeChild(a)
				}
			}),
			z=new b.Class({
				init:function(){},
				getCurrentTheme:function(){
					return this._themeId
				},
				applyTheme:function(a,b){
					this._themeId=a;
					var c=this.getConfig(a),
						d=c.skin,
						e=c.scene,
						c=c.wallpaper;
					l.applyWallpaper(c.url,c.mode);
					j.applySkin(d);
					b||q.applyScene(e)
				},
				getConfig:function(a){
					if(b.isObject(a))
						return a;
					else if(d.themeConfig[a]){
						var c=d.themeConfig[a];
						c.wallpaper.url=c.wallpaper.url.indexOf("http://")>=0?c.wallpaper.url:alloy.util.getCdnUrlById(c.wallpaper.url.length)+"style/wallpaper/"+c.wallpaper.url;
						return d.themeConfig[a]
					}
					return{}
				}
			});
			this.applyTheme=function(a,c){
				b.browser.mobileSafari&&a=="theme_gravity"&&(a="theme_cloud");
				g.applyTheme(a,c)};
				this.setTheme=function(a){
					a.wallpaper.id="themeSetting_urlWallpaper";
					this.applyTheme(a);
					if(b.isObject(a)){
						a={};
						a.skin=j.getCurrentSkin();
						var c=l.getCurrentWallpaper(),
							c={
								id:"themeSetting_urlWallpaper",
								mode:l.getCurrentMode(),
								url:c
							};
						a.wallpaper=c;
						alloy.config.setCustomTheme(a)
					}else 
						d.themeConfig[a]&&alloy.config.setTheme(a)
				};
				this.getCurrentThemeID=function(){
					return g.getCurrentTheme()
				};
				this.applyWallpaper=function(a,b){
					l.applyWallpaper(a,b)
				};
				this.setWallpaper=function(a,b){
					l.applyWallpaper(a,b);
					/(\.jpg)|(\.jpeg)|(\.bmp)|(\.gif)|(\.png)$/i.test(a)||(b="iframe");
					var c={
						id:"themeSetting_urlWallpaper",
						mode:b,
						url:a
					},
					c={
						skin:j.getCurrentSkin(),
						wallpaper:c
					};
					alloy.config.setCustomTheme(c)
				};
				this.getCurrentWallpaper=function(){
					return l.getCurrentWallpaper()
				};
				this.resetWallpaper=function(){
					l.reset()
				};
				this.applySkin=function(a){
					j.applySkin(a)
				};
				this.setSkin=function(a){
					j.applySkin(a);
					a=l.getCurrentWallpaper();
					a={
						id:"themeSetting_urlWallpaper",
						mode:l.getCurrentMode(),
						url:a
					};
					a={
						skin:j.getCurrentSkin(),
						wallpaper:a
					};
					alloy.config.setCustomTheme(a)
				};
				this.applyScene=function(a){
					q.applyScene(a)
				};
				this.setScene=function(){};
				this.getCurrentSkin=function(){
					return j.getCurrentSkin()
				};
				this.init=function(){
					var a=c.id("skinTemplate");
					x=a.innerHTML;
					document.body.removeChild(a);
					g=new z;
					j=new C;
					l=new w;
					q=new y;
					e.addObserver(alloy.portal,"UACReady",H);
					e.addObserver(alloy.portal,"portalReady",F);
					typeof progress=="function"&&progress("themenanager init")
				};
				var F=function(){
					if(!alloy.config.getWallpaper().id){
						var a=alloy.config.getTheme().id,c=d.themeConfig[a].scene,a=0;
						if(b.browser.ie==6||b.browser.ie==7)
							a=500;
						setTimeout(function(){q.applyScene(c)},a)
					}
				},
				H=function(){
					if(alloy.portal.getUin()&&alloy.portal.getSkey()){
						var a=alloy.config.getTheme().id,
							b=alloy.config.getWallpaper().id,
							c=alloy.config.getWallpaper().mode,
							e=alloy.config.getWallpaper().url,
							f=alloy.config.getAppearance().id;
						b?(d.applyWallpaper(e,c),d.applySkin(f),d.applyScene()):d.applyTheme(a,!0)
					}else 
						p?r(p):n();
					p&&p.done&&d.themeArray.push(p)&&(p=null)
				},
				r=function(a){
					u=u||{id:"",mode:"repeat"};
					alloy.rpcService.selfSend(
						alloy.CONST.MAIN_URL+"web2/get_msg_tip?retype=1&tp=3",
						{
							method:"get",
							onSuccess:function(b){
								if(b.f==1)
									a.done=!0,u.id="theme_"+a.id;
								n()
							},
							onError:function(){n()}
						}
					)
				}
			}
		);
Jx().$package(
	"alloy.appconfig",
	function(b){
		var d=this,
			c=b.event,
			e=b.localStorage,
			d=this,
			g=!1,
			j=!1,
			l=0,
			q=0,
			u=0,
			p=0;
		this.appConfigList={};
		this.appTempList={};
		this.systemConfigList={
			50:{
				id:50,
				appUrl:"",
				appName:"QQ",
				al:null,
				category:7,
				iconUrl:"111",
				"New Property":"Value..",
				minWidth:"260",
				width:"280",
				settingCenter:"0",
				windowMode:"none",
				ipadincompatible:0,
				provider:"Tencent \u817e\u8baf",
				ver:"2.3",
				alterMode:"",
				flashMode:"",
				appDesc:"WebQQ\u662f\u7531Tencent\u63d0\u4f9b\u7684\u7f51\u9875IM\u670d\u52a1\uff0c\u652f\u6301\u5728\u7ebf\u804a\u5929\u3001\u4f20\u8f93\u6587\u4ef6\u3001\u622a\u56fe\u3001\u6d88\u606f\u8bb0\u5f55\u6f2b\u6e38\u7b49\u591a\u79cd\u529f\u80fd\u3002",
				height:"560",
				loginLevel:"1",
				defaultMode:"",
				cannotUninstall:"1",
				powerLevel:"3",
				reportName:"eqq",
				appType:1
			},
			taskBar:{
				id:"taskBar",
				appName:"\u4efb\u52a1\u680f",
				appType:1,
				appLevel:"system",
				js:"./js/qqweb.system.module.js",
				windowMode:"none",
				customLoginValidate:!0,
				settingCenter:0
			},
			dock:{
				id:"dock",
				appName:"dock",
				appType:1,
				appLevel:"system",
				css:"./module/dock/style.css",
				js:"./module/dock/main.js",
				windowMode:"none"
			},
			tips:{
				id:"tips",
				appName:"tips",
				appType:1,
				appLevel:"system",
				js:"./js/qqweb.system.module.js",
				windowMode:"none",
				customLoginValidate:!1,
				settingCenter:0
			},
			shareComponent:{
				id:"shareComponent",
				appName:"shareComponent",
				appType:1,
				appLevel:"system",
				js:"./module/sharecomponent/main.js",
				css:"./module/sharecomponent/style.css",
				windowMode:"none",
				customLoginValidate:!1,
				settingCenter:0
			},
			helper:{
				id:"helper",
				appName:"WebQQ\u5c0f\u52a9\u624b",
				appName:"Q+ Web\u5c0f\u52a9\u624b",
				appType:1,
				appLevel:"system",
				css:"./module/helper/style.css",
				js:"./module/helper/main.js",
				width:358,
				height:230,
				right:5,
				bottom:5,
				hasCloseButton:!0,
				settingCenter:0
			},
			bubbleTip:{
				id:"bubbleTip",
				appName:"\u6c14\u6ce1\u63d0\u793a",
				appType:1,
				appLevel:"system",
				css:"./module/bubbletip/qqweb.app.bubbletip.css",
				js:"./module/bubbletip/qqweb.app.bubbletip.js",
				windowMode:"none"
			},
			qqWebIme:{
				id:"qqWebIme",
				appName:"QQ\u4e91\u8f93\u5165\u6cd5",
				appType:1,
				appLevel:"system",
				css:"./module/qqwebime/style.css",
				js:"./module/qqwebime/main.js",
				windowMode:"none",
				customLoginValidate:!1,
				click2run:1,
				quickPanelIcon:"./style/images/pinyin.png",
				settingCenter:0
			},
			qqHandWrite:{
				id:"qqHandWrite",
				appName:"QQ\u4e91\u624b\u5199\u677f",
				appType:2,
				appLevel:"system",
				appUrl:qqweb.CONST.MAIN_URL+"module/qqhandwrite/qqhandwrite.html?"+qqweb.CONST.UPDATE_TIME_STAMP,
				hasCloseButton:!0,
				hasMaxButton:!1,
				hasMinButton:!1,
				modeSwitch:!1,
				resize:!1,
				width:445,
				height:292,
				right:1,
				bottom:1,
				hasToolBar:0,
				loginLevel:alloy.CONST.LOGIN_LEVEL_NONE
			},
			qqWebDict:{
				id:"qqWebDict",
				appName:"QQ\u4e91\u8bcd\u5178",
				appType:1,
				appLevel:"system",
				css:"./module/qqwebdict/style.css",
				js:"./module/qqwebdict/main.js",
				windowMode:"none",
				customLoginValidate:!1,
				settingCenter:0
			},
			appBar:{
				id:"appBar",
				appName:"appBar",
				appType:1,
				appLevel:"system",
				css:"./module/appbar/qqweb.app.appbar.css",
				js:"./module/appbar/qqweb.app.appbar.js",
				windowMode:"none",
				settingCenter:0
			},
			appMarket:{
				id:"appMarket",
				appName:"\u5e94\u7528\u5e02\u573a",
				appType:2,
				appDesc:"\u5e94\u7528\u5e02\u573a\u662fWebQQ\u7ed9\u7f51\u53cb\u6dfb\u52a0\u5e94\u7528\u7684\u5e73\u53f0\uff0c\u63d0\u4f9b\u6700\u70ed\uff0c\u6700\u65b0\u7684\u5e94\u7528\uff0c\u7f51\u53cb\u5206\u4eab\u4e5f\u5c3d\u5728\u5176\u4e2d\u3002",
				appDesc:"\u5e94\u7528\u5e02\u573a\u662fQ+ Web\u7ed9\u7f51\u53cb\u6dfb\u52a0\u5e94\u7528\u7684\u5e73\u53f0\uff0c\u63d0\u4f9b\u6700\u70ed\uff0c\u6700\u65b0\u7684\u5e94\u7528\uff0c\u7f51\u53cb\u5206\u4eab\u4e5f\u5c3d\u5728\u5176\u4e2d\u3002",
				appLevel:"system",
				appUrl:qqweb.CONST.MAIN_URL+"module/appmarket/appmarket.html?"+qqweb.CONST.UPDATE_TIME_STAMP,
				hasCloseButton:!0,
				hasMinButton:!0,
				hasMaxButton:!0,
				modeSwitch:!0,
				resize:!0,
				width:900,
				height:570,
				hasToolBar:0,
				loginLevel:alloy.CONST.LOGIN_LEVEL_NONE,quickPanel:1,
				titleIcon:"http://0.web.qstatic.com/webqqpic/style/images/appmarket_icon.png",
				quickPanelIcon:"./style/images/appmarket.png?20111011001",
				settingCenter:0
			},
			notifications:{
				id:"notifications",
				appName:"\u901a\u77e5\u8bbe\u7f6e",
				appType:1,
				appLevel:"system",
				css:"./module/notifications/qqweb.app.notifications.css",
				js:"./module/notifications/qqweb.app.notifications.js",
				hasMinButton:!1,
				hasMaxButton:!1,
				hasOkButton:!0,
				hasCancelButton:!0,
				hasToolBar:0,
				settingCenter:0
			},
			themeSetting:{
				id:"themeSetting",
				appName:"\u4e3b\u9898\u8bbe\u7f6e",
				appType:1,
				appLevel:"system",
				css:"./module/themesetting/qqweb.app.themesetting.css",
				js:"./module/themesetting/qqweb.app.themesetting.js",
				hasMinButton:!1,
				hasMaxButton:!1,
				hasToolBar:0,
				resize:!1,
				settingCenter:0
			},
			themeSetting2:{
				id:"themeSetting2",
				appName:"\u4e3b\u98982",
				appType:1,
				appLevel:"system",
				css:"./module/themesetting2/qqweb.app.themesetting2.css",
				js:"./module/themesetting2/qqweb.app.themesetting2.js",
				hasMinButton:!1,
				hasMaxButton:!1,
				hasToolBar:0,
				resize:!1,
				windowMode:"none",
				settingCenter:0
			},
			notifySetting:{
				id:"notifySetting",
				appName:"QQ\u63d0\u9192",
				appType:1,
				appLevel:"system",
				css:"./module/notifysetting/qqweb.app.notifysetting.css",
				js:"./module/notifysetting/qqweb.app.notifysetting.js",
				hasMinButton:!1,
				hasMaxButton:!1,
				hasOkButton:!0,
				hasCancelButton:!0,
				resize:!1,
				hasToolBar:0,
				settingCenter:0
			},
			desktopSetting:{
				id:"desktopSetting",
				appName:"\u684c\u9762\u8bbe\u7f6e",
				appType:1,
				appLevel:"system",
				css:"./module/desktopsetting/style.css",
				js:"./module/desktopsetting/main.js",
				hasMinButton:!1,
				hasMaxButton:!1,
				hasOkButton:!0,
				hasCancelButton:!0,
				resize:!1,
				minWidth:600,
				minHeight:450,
				hasToolBar:0,
				settingCenter:0
			},
			hotkeySetting:{
				id:"hotkeySetting",
				appName:"\u70ed\u952e",
				appType:1,
				appLevel:"system",
				css:"./module/hotkeysetting/qqweb.app.hotkeysetting.css",
				js:"./module/hotkeysetting/qqweb.app.hotkeysetting.js",
				hasMinButton:!1,
				hasMaxButton:!1,
				hasOkButton:!0,
				hasCancelButton:!0,
				resize:!1,
				hasToolBar:0,
				settingCenter:0
			},
			ienotification:{
				id:"ienotification",
				appType:1,
				appLevel:"system",
				appName:"IE\u6d88\u606f\u63d0\u9192",
				css:"./module/ienotification/qqweb.app.ienotification.css",
				js:"./module/ienotification/qqweb.app.ienotification.js",
				windowMode:"none"
			},
			msgBubble:{
				id:"msgBubble",
				appType:1,
				appLevel:"system",
				appName:"\u6d88\u606f\u8d70\u9a6c\u706f",
				css:"./module/messagebubble/qqweb.app.msgbubble.css",
				js:"./module/messagebubble/qqweb.app.msgbubble.js",
				windowMode:"none",
				settingCenter:0
			},
			messageManager:{
				id:"messageManager",
				appType:1,
				appLevel:"system",
				appName:"\u6d88\u606f\u7ba1\u7406\u5668",
				css:"./module/messagemanager/style.css",
				js:"./module/messagemanager/main.js",
				windowMode:"none"
			},
			chatLogViewer:{
				id:"chatLogViewer",
				appName:"\u804a\u5929\u8bb0\u5f55\u7ba1\u7406\u5668",
				appDesc:"WebQQ\u4e3a\u60a8\u63d0\u4f9b\u7684\u7fa4\u804a\u5929\u8bb0\u5f55\u6f2b\u6e38\u670d\u52a1\uff0c\u652f\u6301\u67e5\u770b7\u5929\u5185\u7fa4\u5185\u6d88\u606f\uff0c\u8fd8\u53ef\u4ee5\u76f4\u63a5\u4ece\u804a\u5929\u8bb0\u5f55\u91cc\u548c\u7fa4\u53cb\u53d1\u8d77\u4e34\u65f6\u4f1a\u8bdd\uff0c\u8d76\u5feb\u6765\u4f53\u9a8c\u5427\uff01",
				appDesc:"Q+ Web\u4e3a\u60a8\u63d0\u4f9b\u7684\u7fa4\u804a\u5929\u8bb0\u5f55\u6f2b\u6e38\u670d\u52a1\uff0c\u652f\u6301\u67e5\u770b7\u5929\u5185\u7fa4\u5185\u6d88\u606f\uff0c\u8fd8\u53ef\u4ee5\u76f4\u63a5\u4ece\u804a\u5929\u8bb0\u5f55\u91cc\u548c\u7fa4\u53cb\u53d1\u8d77\u4e34\u65f6\u4f1a\u8bdd\uff0c\u8d76\u5feb\u6765\u4f53\u9a8c\u5427\uff01",
				appType:1,
				appLevel:"system",
				css:"./module/chatlogviewer/qqweb.app.chatlogviewer.css",
				js:"./module/chatlogviewer/qqweb.app.chatlogviewer.js",
				loginLevel:alloy.CONST.LOGIN_LEVEL_ALL,
				windowMode:"multi",
				needApp:["eqq"],
				settingCenter:0
			},
			userDetails:{
				id:"userDetails",
				appName:"\u8be6\u7ec6\u8d44\u6599",
				appType:1,
				appLevel:"system",
				css:"./module/userdetails/qqweb.app.userdetails.css",
				js:"./module/userdetails/qqweb.app.userdetails.js",
				loginLevel:alloy.CONST.LOGIN_LEVEL_NOCHAT,
				windowMode:"multi",
				hasToolBar:0,
				needApp:["eqq"],
				settingCenter:0
			},
			avatarChanger:{
				id:"avatarChanger",
				appName:"\u66f4\u6362\u5934\u50cf",
				appType:1,
				appLevel:"system",
				css:"./module/avatarchanger/qqweb.app.avatarchanger.css",
				js:"./module/avatarchanger/qqweb.app.avatarchanger.js",
				loginLevel:alloy.CONST.LOGIN_LEVEL_NOCHAT,
				needApp:["eqq"],
				width:550,
				windowType:"EqqWindow",
				height:395,
				resize:!1,
				hasMinButton:!1,
				hasMaxButton:!1,
				hasOkButton:!0,
				hasCancelButton:!0,
				hasToolBar:0,
				settingCenter:0
			},
			groupDetails:{
				id:"groupDetails",
				appName:"\u7fa4\u8be6\u7ec6\u8d44\u6599",
				appType:1,
				appLevel:"system",
				css:"./module/groupdetails/qqweb.app.groupdetails.css",
				js:"./module/groupdetails/qqweb.app.groupdetails.js",
				loginLevel:alloy.CONST.LOGIN_LEVEL_NOCHAT,
				windowMode:"multi",
				hasToolBar:0,
				needApp:["eqq"],
				settingCenter:0
			},
			groupSystemMsg:{
				id:"groupSystemMsg",
				appName:"\u7fa4\u7cfb\u7edf\u6d88\u606f",
				appType:1,
				appLevel:"system",
				css:"./module/groupsystemmsg/qqweb.app.groupsystemmsg.css",
				js:"./module/groupsystemmsg/qqweb.app.groupsystemmsg.js",
				loginLevel:alloy.CONST.LOGIN_LEVEL_NOCHAT,
				windowMode:"multi",
				hasToolBar:0,
				windowType:"EqqWindow",
				needApp:["eqq"],
				settingCenter:0
			},
			appIntroduce:{
				id:"appIntroduce",
				appType:1,
				appName:"\u5e94\u7528\u4ecb\u7ecd",
				appLevel:"system",
				appDesc:"\u5728\u8fd9\u91cc\uff0c\u5e94\u7528\u4ecb\u7ecd",
				provider:"Tencent \u817e\u8baf",
				ver:"1.0",
				css:"./module/appintroduce/qqweb.app.appintroduce.css",
				js:"./module/appintroduce/qqweb.app.appintroduce.js",
				loginLevel:alloy.CONST.LOGIN_LEVEL_NOCHAT,
				width:620,
				height:500,
				windowMode:"multi",
				hasToolBar:0,
				resize:!1,
				hasMinButton:!1,
				hasMaxButton:!1,
				settingCenter:0
			},
			buddyAdder:{
				id:"buddyAdder",
				appName:"\u6dfb\u52a0\u597d\u53cb",
				appType:1,
				appLevel:"system",
				css:"./module/buddyadder/qqweb.app.buddyadder.css",
				js:"./module/buddyadder/qqweb.app.buddyadder.js",
				loginLevel:alloy.CONST.LOGIN_LEVEL_ALL,windowMode:"multi",
				windowType:"EqqWindow",
				hasToolBar:0,
				needApp:["eqq"],
				settingCenter:0
			},
			buddyFinder:{
				id:"buddyFinder",
				appName:"\u67e5\u627e\u597d\u53cb/\u7fa4",
				appDesc:"WebQQ\u4e3a\u4f60\u63d0\u4f9b\u7684\u67e5\u627eQQ\u7fa4\u670d\u52a1\uff0c\u652f\u6301\u901a\u8fc7\u7fa4\u53f7\u7801\uff0c\u5173\u952e\u5b57\u67e5\u627e\u60a8\u6240\u9700\u8981\u7684\u7fa4\u3002\u8be5\u670d\u52a1\u9700\u8981\u767b\u9646QQ\u624d\u80fd\u4f7f\u7528\u3002",
				appDesc:"Q+ Web\u4e3a\u4f60\u63d0\u4f9b\u7684\u67e5\u627eQQ\u7fa4\u670d\u52a1\uff0c\u652f\u6301\u901a\u8fc7\u7fa4\u53f7\u7801\uff0c\u5173\u952e\u5b57\u67e5\u627e\u60a8\u6240\u9700\u8981\u7684\u7fa4\u3002\u8be5\u670d\u52a1\u9700\u8981\u767b\u9646QQ\u624d\u80fd\u4f7f\u7528\u3002",
				appType:1,
				appLevel:"system",
				css:"./module/buddyfinder/qqweb.app.buddyfinder.css",
				js:"./module/buddyfinder/qqweb.app.buddyfinder.js",
				loginLevel:alloy.CONST.LOGIN_LEVEL_ALL,
				width:540,
				height:362,
				modeSwitch:!1,
				resize:!1,
				hasMinButton:!1,
				hasToolBar:0,
				hasMaxButton:!1,
				hasNextButton:!0,
				windowType:"EqqWindow",
				hasCancelButton:!0,
				needApp:["eqq"],
				settingCenter:0
			},
			screenLocker:{
				id:"screenLocker",
				appName:"\u9501\u5c4f",
				appType:1,
				appLevel:"system",
				css:"./module/screenlocker/qqweb.app.screenlocker.css",
				js:"./module/screenlocker/qqweb.app.screenlocker.js",
				windowMode:"none",
				hasToolBar:0,
				settingCenter:0
			},
			screenCapture:{
				id:"screenCapture",
				appName:"\u622a\u5c4f",
				appType:1,
				appLevel:"system",
				css:"./module/screencapture/qqweb.app.screencapture.css",
				js:"./module/screencapture/qqweb.app.screencapture.js",
				windowMode:"none",
				settingCenter:0
			},
			screenCapture2:{
				id:"screenCapture2",
				appName:"webtop\u622a\u5c4f",
				appType:1,
				appLevel:"system",
				css:"./module/screencapture2/style.css",
				js:"./module/screencapture2/main.js",
				windowMode:"none",
				settingCenter:0
			},
			settingCenter:{
				id:"settingCenter",
				appName:"\u7cfb\u7edf\u8bbe\u7f6e",
				appType:1,
				appLevel:"system",
				css:"./module/settingcenter/qqweb.app.settingcenter.css",
				js:"./module/settingcenter/qqweb.app.settingcenter.js",
				hasCloseButton:!0,
				hasMinButton:!1,
				hasMaxButton:!1,
				resize:!1,
				hasToolBar:0,
				settingCenter:0
			},
			explorer:{
				id:"explorer",
				appName:"\u8d44\u6e90\u7ba1\u7406\u5668",
				appType:1,
				appLevel:"system",
				css:"./module/explorer/style.css",
				js:"./module/explorer/main.js",
				hasCloseButton:!0,
				hasMinButton:!0,
				hasMaxButton:!0,
				resize:!0,
				hasToolBar:0,
				settingCenter:0,
				windowMode:"multi"
			},
			diskExplorer:{
				id:"diskExplorer",
				appName:"\u4e91\u5b58\u50a8",
				appType:1,
				appLevel:"system",
				css:"./module/diskexplorer/style.css",
				js:"./module/diskexplorer/main.js",
				hasCloseButton:!0,
				hasMinButton:!0,
				hasMaxButton:!0,
				resize:!0,
				hasToolBar:0,
				settingCenter:0,
				windowMode:"multi"
			},
			layoutSaver:{
				id:"layoutSaver",
				appName:"\u8bb0\u5fc6\u684c\u9762\u5e03\u5c40",
				appType:1,
				appLevel:"system",
				css:"./module/layoutsaver/qqweb.app.layoutsaver.css",
				js:"./module/layoutsaver/qqweb.app.layoutsaver.js",
				windowMode:"none",
				settingCenter:0
			},
			sceneChristmas:{
				id:"sceneChristmas",
				appName:"\u5723\u8bde\u5feb\u4e50",
				appType:1,
				appLevel:"system",
				css:"./scene/christmas/style.css",
				js:"./scene/christmas/main.js",
				settingCenter:0
			},
			gravity:{
				id:"gravity",
				appName:"\u83ca\u82b1",
				appType:1,
				appLevel:"system",
				css:"./scene/gravity/style.css",
				js:"./scene/gravity/main.js",
				settingCenter:0
			},
			urlSave:{
				id:"urlSave",
				appType:1,
				appName:"\u4e00\u952e\u53e6\u5b58\u4e3a\u5e94\u7528",
				appLevel:"system",
				appDesc:"\u5728\u8fd9\u91cc\uff0c\u4e00\u952e\u53e6\u5b58\u4e3a",
				ver:"1.0",
				css:"./module/urlsave/qqweb.app.urlsave.css",
				js:"./module/urlsave/qqweb.app.urlsave.js",
				loginLevel:alloy.CONST.LOGIN_LEVEL_NOCHAT,
				width:688,
				height:398,
				hasMinButton:!1,
				hasMaxButton:!1,
				resize:!1,
				hasOkButton:!0,
				hasCancelButton:!0,
				hasToolBar:0,
				settingCenter:0
			},
			activityGameCollection:{
				id:"activityGameCollection",
				appName:"WebGame\u5927\u96c6\u5408",
				appDesc:"WebGame\u5927\u96c6\u5408,\u7cbe\u9009WebGame,\u7545\u4eab\u5a31\u4e50",
				appType:1,
				appLevel:"system",
				css:"./activity/gamecollection/style.css",
				js:"./activity/gamecollection/main.js",
				hasCloseButton:!0,
				hasMinButton:!1,
				hasToolBar:0,
				width:740,
				height:530,
				loginLevel:alloy.CONST.LOGIN_LEVEL_NONE,settingCenter:0
			},
			activityChildsday:{
				id:"activityChildsday",
				appName:"\u513f\u7ae5\u8282\u5927\u96c6\u5408",
				appDesc:"\u513f\u7ae5\u8282\u5927\u96c6\u5408,\u7545\u4eab\u5a31\u4e50",
				appType:1,
				appLevel:"system",
				css:"./activity/childsday/style.css",
				js:"./activity/childsday/main.js",
				hasCloseButton:!0,
				hasMinButton:!1,
				hasToolBar:0,
				width:940,
				height:550,
				loginLevel:alloy.CONST.LOGIN_LEVEL_NONE,
				settingCenter:0
			},
			activity3366:{
				id:"activity3366",
				appName:"3366\u6d3b\u52a8",
				appDesc:"3366\u6d3b\u52a8",
				appType:1,
				appLevel:"system",
				css:"./activity/3366/style.css",
				js:"./activity/3366/main.js",
				hasCloseButton:!0,
				hasMinButton:!1,
				hasToolBar:0,
				width:940,
				height:550,
				loginLevel:alloy.CONST.LOGIN_LEVEL_NONE,
				settingCenter:0
			},
			restoreSetting:{
				id:"restoreSetting",
				appName:"\u7cfb\u7edf\u8fd8\u539f",
				appType:1,
				appLevel:"system",
				css:"./module/restoresetting/style.css",
				js:"./module/restoresetting/main.js",
				hasMinButton:!1,
				hasMaxButton:!1,
				hasOkButton:!0,
				hasCancelButton:!0,
				resize:!1,
				hasToolBar:0,
				settingCenter:0
			},
			mapLocation:{
				id:"mapLocation",
				appName:"html5\u5730\u56fe\u5b9a\u4f4d",
				appType:2,
				x:1,
				y:420,
				appDesc:"html5\u5730\u56fe\u5b9a\u4f4d",
				appLevel:"system",
				appUrl:qqweb.CONST.MAIN_URL+"module/maplocation/maplocation.html",
				width:224,
				height:185,
				windowType:"widget",
				hasToolBar:0,
				loginLevel:alloy.CONST.LOGIN_LEVEL_NONE,
				settingCenter:0
			},
			selectBuddy:{
				id:"selectBuddy",
				appName:"\u9009\u62e9\u8054\u7cfb\u4eba",
				appDesc:"\u9009\u62e9\u8054\u7cfb\u4eba",
				appType:1,
				appLevel:"system",
				css:"./module/selectbuddy/style.css",
				js:"./module/selectbuddy/main.js",
				loginLevel:alloy.CONST.LOGIN_LEVEL_NOCHAT,
				windowMode:"multi",
				settingCenter:0
			},
			99999:{
				id:"99999",
				appName:"\u89c6\u9891\u804a\u5929",
				appType:2,
				width:384,
				height:320,
				hasMinButton:!1,
				hasMaxButton:!1,
				appLevel:"system",
				appUrl:"http://vcall.hehehi.com",
				hasToolBar:0,
				powerLevel:3
			},
			cloud:{
				id:"cloud",
				appName:"\u4e91\u6735",
				appType:1,
				appLevel:"system",
				css:"./scene/cloud/style.css",
				js:"./scene/cloud/main.js",
				settingCenter:0
			},
			activitySaturday:{
				id:"activitySaturday",
				appName:"\u793c\u62dc\u516d\u56e2\u961f\u4e13\u8bbf",
				appDesc:"\u793c\u62dc\u516d\u56e2\u961f\u4e13\u8bbf\u3002",
				appType:1,
				appLevel:"system",
				css:"./activity/saturday/style.css",
				js:"./activity/saturday/main.js",
				hasCloseButton:!0,
				hasMinButton:!1,
				hasMaxButton:!0,
				resize:!0,
				hasToolBar:0,
				width:900,
				height:550,
				loginLevel:alloy.CONST.LOGIN_LEVEL_NONE,
				settingCenter:0
			},
			activityXindongfang:{
				id:"activityXindongfang",
				appName:"\u6dfb\u52a0\u65b0\u4e1c\u65b9\u5e94\u7528\uff0c\u8d62\u53d6\u8d2d\u8bfe\u4ee3\u91d1\u5238",
				appDesc:"\u6dfb\u52a0\u65b0\u4e1c\u65b9\u5e94\u7528\uff0c\u8d62\u53d6\u8d2d\u8bfe\u4ee3\u91d1\u5238",
				appType:1,
				appLevel:"system",
				css:"./activity/xindongfang/style.css",
				js:"./activity/xindongfang/main.js",
				hasCloseButton:!0,
				hasMinButton:!1,
				hasMaxButton:!0,
				hasToolBar:0,
				width:780,
				height:530,
				loginLevel:alloy.CONST.LOGIN_LEVEL_NONE,settingCenter:0
			},
			appGrant:{
				id:"appGrant",
				appName:"\u5e94\u7528\u6388\u6743",
				appType:1,
				appLevel:"system",
				css:"./module/appgrant/qqweb.app.grant.css",
				js:"./module/appgrant/qqweb.app.grant.js",
				windowMode:"none",
				hasToolBar:0,
				settingCenter:0
			},
			imgViewer:{
				id:"imgViewer",
				appName:"Q+ Web\u56fe\u7247\u64ad\u653e\u5668",
				appDesc:"Q+ Web\u56fe\u7247\u64ad\u653e\u5668",
				appType:1,css:"./module/imgviewer/qqweb.img.viewer.css",
				js:"./module/imgviewer/qqweb.img.viewer.js",
				hasToolBar:0,
				width:760,
				height:502,
				minWidth:390,
				minHeight:155,
				loginLevel:alloy.CONST.LOGIN_LEVEL_NONE,
				quickPanel:1,
				settingCenter:0
			},
			docViewer:{
				id:"docViewer",
				appName:"Q+ Web\u6587\u6863\u6d4f\u89c8\u5668",
				appDesc:"Q+ Web\u6587\u6863\u6d4f\u89c8\u5668",
				appType:2,
				appUrl:qqweb.CONST.MAIN_URL+"module/docviewer/docviewer.html",
				hasToolBar:0,
				width:1E3,
				height:540,
				minWidth:300,
				minHeight:320,
				exinfo:{powerLevel:20},
				powerLevel:20,
				quickPanel:1,
				loginLevel:alloy.CONST.LOGIN_LEVEL_NONE,
				settingCenter:0
			},
			audioPlayer:{
				id:"audioPlayer",
				appName:"Q+ Web\u97f3\u9891\u64ad\u653e\u5668",
				appDesc:"Q+ Web\u97f3\u9891\u64ad\u653e\u5668",
				appType:2,
				appUrl:qqweb.CONST.MAIN_URL+"module/audioplayer/audioplayer.html?"+qqweb.CONST.UPDATE_TIME_STAMP,
				windowType:"widget",
				hasToolBar:0,
				hasMinButton:!0,
				hasMaxButton:!1,
				width:228,
				height:84,
				loginLevel:alloy.CONST.LOGIN_LEVEL_NONE,
				quickPanel:1,
				quickPanelIcon:"./style/images/audioplayer.gif",
				settingCenter:0,
				powerLevel:200,
				exinfo:{powerLevel:200}
			},
			messageCenter:{
				id:"messageCenter",
				appName:"\u6d88\u606f\u4e2d\u5fc3",
				appDesc:"Q+ Web \u6d88\u606f\u4e2d\u5fc3",
				appType:2,
				appLevel:"system",
				appUrl:qqweb.CONST.MAIN_URL+"module/messagecenter/messagecenter.html?"+qqweb.CONST.UPDATE_TIME_STAMP,
				hasCloseButton:!0,
				hasMinButton:!0,
				hasMaxButton:!1,
				modeSwitch:!0,
				resize:!1,
				width:640,
				height:482,
				hasToolBar:0,
				loginLevel:alloy.CONST.LOGIN_LEVEL_NOCHAT,
				settingCenter:0,
				quickPanel:1
			}
		};
		this.getAppConfigList=function(){return this.appConfigList};
		this.getAllConfig=function(b){return v(b,this.appConfigList)||v(b,this.systemConfigList)};
		this.getAppConfig=function(c){if((c=v(c,this.appConfigList))&&(b.isUndefined(c.id)||b.isUndefined(c.appName)))c=null,alloy.util.report2m(151399);return c};
		this.getSystemConfig=function(b){return v(b,this.systemConfigList)};
		this.isAppConfigLoad=function(){return j};
		var v=function(b,a){
			if(b&&b.call){
				var c=[],d;
				for(d in a){
					var e=a[d];
					b(e)&&c.push(e)
				}
				return c
			}else 
				return a[b]
		};
		this.clearConfig=function(){this.appConfigList={}};
		this.addAppConfigList=function(e){
			var a=e.result.resultData;
			b.profile("AddAppConfigList");
			for(var f in a)
				a[f]?a[f].isDel?(alloy.config.setDeleteAppList(a[f].id),delete a[f]):(a[f].title=a[f].appName,a[f].type=a[f].appType,b.extend(a[f],a[f].exinfo)):delete a[f];
			b.extend(this.appConfigList,a);
			b.profile("AddAppConfigListEnd");
			c.notifyObservers(d,"AddAppConfigList",e)
		};
		this.addAppConfig=function(e){
			b.profile("addAppConfig");
			this.appConfigList[e.id]=b.extend(e,e.exinfo);
			var a={
				appid:e.id,
				value:1,
				type:0
			};
			e.id<1E5&&x(a);
			c.notifyObservers(d,"AddAppConfig",e);
			if((a=alloy.system.getApp("appMarket"))&&a._iframe)
				a._iframe.contentWindow.appMarket.onAddAppConfig(e)
		};
		this.addAppConfigTemp=function(c){
			b.profile("addAppConfig Temp");
			this.appConfigList[c.id]=b.extend(c,c.exinfo)
		};
		this.updateAppConfig=function(e){
			b.profile("updateAppConfig");
			this.appConfigList[e.id]=e;
			c.notifyObservers(d,"UpdateAppConfig",e)
		};
		this.removeAppConfig=function(e){
			b.profile("removeAppConfig");
			delete this.appConfigList[e.id];
			var a={appid:e.id,value:-1,type:0};
			e.id<1E5&&x(a);
			c.notifyObservers(d,"RemoveAppConfig",e);
			if((a=alloy.system.getApp("appMarket"))&&a._iframe)
				a._iframe.contentWindow.appMarket.onRemoveAppConfig(e)
		};
		this.setNewSystemAppCount=function(b){q=b};
		this.setNewAllAppCount=function(b){u=b};
		this.getNewSystemAppCount=function(){return q};
		this.getNewAllAppCount=function(){return u};
		this.isQplusApp=function(b){
			if(isNaN(b))
				return!1;
			b=d.getAppConfig(b);
			return!b?!1:(b=b.gaid)&&b>=2E8&&b<3E8?!0:!1
		};
		var x=function(e){
			alloy.config.isSetupAppListLoaded()&&alloy.rpcService.cgiSend(
				alloy.CONST.JAVA_CGI_URL+"cgi/qqweb/market/updateapphot.do",
				{
					context:d,
					method:"POST",
					data:{
						appattrib:b.json.stringify(e),
						vfwebqq:alloy.portal.getVfWebQQ()
					},
					arguments:e,
					onSuccess:function(a){
						a.retcode!==0&&b.out("\u5e94\u7528\u6b21\u6570\u6dfb\u52a0\u5931\u8d25"+a.errmsg)
					},
					onError:function(a){
						b.out("\u5e94\u7528\u6b21\u6570\u6dfb\u52a0\u5931\u8d25");
						c.notifyObservers(d,"SetAppCountError",a)
					}
				}
			)
		},
		m=function(h,a){
			alloy.rpcService.cgiSend(
				alloy.CONST.JAVA_CGI_URL+a,
				{
					context:d,
					method:"POST",
					arguments:h.appid,
					timeout:2E4,
					data:{
						appattrib:b.json.stringify(h),
						vfwebqq:alloy.portal.getVfWebQQ()
					},
					onSuccess:function(f){
						if(f.retcode===0)
							if(typeof progress=="function"&&progress("get_appinfo end"),alloy.util.report2qqweb("config|appconfig|success"),g)
								alloy.util.report2h("get_def_appinfo","end"),
								this.addAppConfigList(f),
								e.setItem("UPDATE_TIME_STAMP",alloy.CONST.UPDATE_TIME_STAMP),
								e.setItem("defaultAppConfig",b.json.stringify(d.getAppConfigList())),
								c.notifyObservers(d,"GetDefaultAppConfigComplete",this.getAppConfigList()),
								b.profile("\u9ed8\u8ba4app config\u5b8c\u6210"),
								alloy.util.report2h("def_appinfo","end");
							else{
								alloy.util.report2h("get_appinfo","end");
								c.notifyObservers(d,"GetAppConfigAsPartSuccess",f.result);
								l++;
								var n=alloy.config.getSetupAppList(),
									q=l*100,
									o=(l+1)*100;
								this.addAppConfigList(f);
								q<n.length?(
									n=n.slice(q,o),
									m(
										{
											appid:n,
											loadMethod:3,
											val:["appName","appType","appUrl","iconUrl","id","category","exinfo","al"]
										},
										"keycgi/qqweb/market/getappinfonew.do"
									)
								):(
									j=!0,
									b.isUndefined(f.userflag)
									||
									alloy.portal.setIsNewUser(f.userflag==0?!0:!1),
									c.notifyObservers(d,"GetAppConfigComplete",this.getAppConfigList()),
									alloy.portal.speedTest.sRTS(5,"end",new Date,!0),
									b.profile("\u81ea\u5b9a\u4e49app config\u5b8c\u6210")
								)
							}
						else 
							f.retcode==1E5?(
								timeoutConfirm("\u767b\u5f55\u4fe1\u606f\u8d85\u65f6,\u662f\u5426\u5237\u65b0\u91cd\u8bd5\uff1f"),
								alloy.util.report2qqweb("config|appconfig|logintimeout"),
								p<1?(++p,m(h,a)):(
									timeoutConfirm("\u767b\u5f55\u4fe1\u606f\u8d85\u65f6,\u662f\u5426\u5237\u65b0\u91cd\u8bd5\uff1f"),
									alloy.util.report2qqweb("config|appconfig|logintimeout")
								)
							):(
								timeoutConfirm("\u83b7\u53d6\u5e94\u7528\u4fe1\u606f\u51fa\u9519,\u662f\u5426\u5237\u65b0\u91cd\u8bd5\uff1f"),
								alloy.util.report2qqweb("config|appconfig|reterror"),
								c.notifyObservers(d,"GetAppConfigError",f.resutlt),
								b.error("get app config \u8fd4\u56de\u7ed3\u679c\u4e0d\u6b63\u786e. data: "+f,"AppConfig"),
								p<1?(++p,m(h,a)):(
									timeoutConfirm("\u83b7\u53d6\u5e94\u7528\u4fe1\u606f\u51fa\u9519,\u662f\u5426\u5237\u65b0\u91cd\u8bd5\uff1f"),
									alloy.util.report2qqweb("config|appconfig|reterror"),
									c.notifyObservers(d,"GetAppConfigError",f.resutlt),
									b.error("get app config \u8fd4\u56de\u7ed3\u679c\u4e0d\u6b63\u786e. data: "+f,"AppConfig")
								)
							);
						qqweb.util.report2h("appinfo","end",["ok"][f.retcode]||f.retcode)
					},
					onError:function(e){
						b.profile("GetAppConfigError");
						qqweb.util.report2h(g?"def_appinfo":"appinfo","end","error");
						c.notifyObservers(d,"GetAppConfigError",e.resutlt);
						timeoutConfirm("\u83b7\u53d6\u5e94\u7528\u4fe1\u606f\u51fa\u9519,\u662f\u5426\u5237\u65b0\u91cd\u8bd5\uff1f");
						alloy.util.report2qqweb("config|appconfig|error");
						p<1?(++p,m(h,a)):(
							qqweb.util.report2h(g?"def_appinfo":"appinfo","end","error"),
							c.notifyObservers(d,"GetAppConfigError",e.resutlt),
							timeoutConfirm("\u83b7\u53d6\u5e94\u7528\u4fe1\u606f\u51fa\u9519,\u662f\u5426\u5237\u65b0\u91cd\u8bd5\uff1f"),
							alloy.util.report2qqweb("config|appconfig|error")
						)
					},
					onTimeout:function(b){
						timeoutConfirm("\u83b7\u53d6\u5e94\u7528\u4fe1\u606f\u8d85\u65f6,\u662f\u5426\u5237\u65b0\u91cd\u8bd5\uff1f");
						alloy.util.report2qqweb("config|appconfig|timeout");
						c.notifyObservers(d,"GetAppConfigError",b.resutlt);
						qqweb.util.report2h(g?"def_appinfo":"appinfo","end","timeout");
						p<1?(++p,m(h,a)):(
							timeoutConfirm("\u83b7\u53d6\u5e94\u7528\u4fe1\u606f\u8d85\u65f6,\u662f\u5426\u5237\u65b0\u91cd\u8bd5\uff1f"),
							alloy.util.report2qqweb("config|appconfig|timeout"),
							c.notifyObservers(d,"GetAppConfigError",b.resutlt),
							qqweb.util.report2h(g?"def_appinfo":"appinfo","end","timeout")
						)
					}
				}
			)
		},
		o={
			onAlloyReady:function(){
				b.profile("UACReady\uff1a"+alloy.config.isSetupAppListLoaded());
				if(alloy.config.isSetupAppListLoaded())
					if(j)
						c.notifyObservers(d,"GetAppConfigComplete");
					else{
						c.notifyObservers(d,"ClearDefaultApp");
						var h;
						h=alloy.config.getSetupAppList();
						d.clearConfig();
						g=!1;
						l=0;
						h=h.slice(0,100);
						b.profile("\u62c9\u53d6\u81ea\u5b9a\u4e49app config");
						alloy.util.report2h("appinfo","start");
						typeof progress=="function"&&progress("get_appinfo start");
						m({appid:h,loadMethod:3,val:["appName","appType","appUrl","iconUrl","id","category","exinfo","al","gaid"]},"keycgi/qqweb/market/getappinfonew.do")
					}
				else{
					g=!0;
					b.profile("\u62c9\u53d6\u9ed8\u8ba4app config",b.console.TYPE.WARNING);
					alloy.util.report2h("def_appinfo","start");
					typeof progress=="function"&&progress("get_def_appinfo start");
					if(e.getItem("UPDATE_TIME_STAMP")==alloy.CONST.UPDATE_TIME_STAMP&&(h=e.getItem("defaultAppConfig"))){
						d.appConfigList=b.json.parse(h);
						c.notifyObservers(d,"GetDefaultAppConfigComplete",d.getAppConfigList());
						b.profile("\u9ed8\u8ba4app config\u5b8c\u6210");
						alloy.util.report2h("def_appinfo","end");
						return
					}
					m(
						{
							appid:alloy.config.getDefaultSetupAppList(),
							loadMethod:3,
							val:[
								"appName",
								"appType",
								"appUrl",
								"iconUrl",
								"id",
								"category",
								"exinfo",
								"al",
								"gaid"
							]
						},
						"keycgi/qqweb/market/getdefaultappinfonew.do"
					)
				}
			},
			onReset:function(){j=!1}
		};
		c.addObserver(alloy.portal,"reset",o.onReset);
		c.addObserver(alloy.portal,"AlloyReady",o.onAlloyReady)
	}
);
Jx().$package(
	"alloy.hotkeyManager",
	function(b){
		var d=b.event,
			c=this,
			e=!0,
			g=!1,
			j={
				eqq_chatbox_read:{
					id:"eqq_chatbox_read",
					name:"\u63d0\u53d6\u6700\u65b0\u6d88\u606f",
					limit:!0,
					keys:[
						{
							ctrlKey:1,
							shiftKey:0,
							altKey:1,
							keyCode:90,
							des:"Ctrl + Alt + Z"
						},{
							ctrlKey:0,
							shiftKey:0,
							altKey:1,
							keyCode:87,
							des:"Alt + W"
						}
					]
				},
				eqq_chatbox_sendmsg:{
					id:"eqq_chatbox_sendmsg",
					name:"\u53d1\u9001\u6d88\u606f",
					limit:!0,
					mutexKeys:[
						{
							ctrlKey:1,
							shiftKey:0,
							altKey:0,
							keyCode:13,
							selected:!0,
							des:"Ctrl + Enter"
						},{
							ctrlKey:0,
							shiftKey:0,
							altKey:0,
							keyCode:13,
							des:"Enter"
						}
					],
					keys:[
						{
							ctrlKey:0,
							shiftKey:0,
							altKey:1,
							keyCode:83,
							des:"Alt + S"
						}
					]
				},
				eqq_chatbox_classall:{
					id:"eqq_chatbox_classall",
					name:"\u5173\u95ed\u6240\u6709\u804a\u5929\u7a97\u53e3",
					limit:!0,
					keys:[
						{
							ctrlKey:1,
							shiftKey:0,
							altKey:1,
							keyCode:67,
							des:"Ctrl + Alt + C"
						}
					]
				},
				open_msg_manager:{
					id:"open_msg_manager",
					name:"\u6253\u5f00\u6d88\u606f\u7ba1\u7406\u5668",
					limit:!0,
					keys:[
						{
							ctrlKey:1,
							shiftKey:0,
							altKey:1,
							keyCode:83,
							des:"Ctrl + Alt + S"
						}
					]
				},
				layout_window_current_close:{
					id:"layout_window_current_close",
					name:"\u5173\u95ed\u5f53\u524d\u7a97\u53e3",
					disable:!1,
					keys:[
						{
							ctrlKey:0,
							shiftKey:0,
							altKey:1,
							keyCode:67,
							des:"Alt + C"
						}
					]
				},
				layout_window_closeall:{
					id:"layout_window_closeall",
					name:"\u5173\u95ed\u6240\u6709\u5e94\u7528\u7a97\u53e3",
					limit:!0,
					keys:[
						{
							ctrlKey:0,
							shiftKey:1,
							altKey:1,
							keyCode:81,
							des:"Alt + Shift + Q"
						}
					]
				},
				layout_window_goleft:{
					id:"layout_window_goleft",
					name:"\u5207\u6362\u5230\u4e0a\u4e00\u4e2a\u7a97\u53e3",
					limit:!0,
					keys:[
						{
							ctrlKey:1,
							shiftKey:0,
							ltKey:0,
							keyCode:37,
							des:"Ctrl + \u2190"
						}
					]
				},
				layout_window_goright:{
					id:"layout_window_goright",
					name:"\u5207\u6362\u5230\u4e0b\u4e00\u4e2a\u7a97\u53e3",
					limit:!0,
					keys:[
						{
							ctrlKey:1,
							shiftKey:0,
							altKey:0,
							keyCode:39,
							des:"Ctrl + \u2192"
						}
					]
				},
				layout_showdesktop:{
					id:"layout_showdesktop",
					name:"\u663e\u793a\u684c\u9762",
					limit:!0,keys:[
						{
							ctrlKey:1,
							shiftKey:0,
							altKey:1,
							keyCode:68,
							des:"Ctrl + Alt + D"
						}
					]
				},
				layout_screencaptrue:{
					id:"layout_screencaptrue",
					name:"\u622a\u5c4f",
					keys:[
						{
							ctrlKey:1,
							shiftKey:0,
							altKey:1,
							keyCode:65,
							des:"Ctrl + Alt + A"
						},{
							ctrlKey:1,
							shiftKey:1,
							altKey:1,
							keyCode:65,
							des:"Ctrl + Shift + Alt + A"
						}
					]
				},
				layout_lock:{
					id:"layout_lock",
					name:"\u9501\u5b9a",
					limit:!0,
					keys:[
						{
							ctrlKey:1,
							shiftKey:0,
							altKey:1,
							keyCode:76,
							des:"Ctrl + Alt + L"
						}
					]
				},
				layout_exit:{
					id:"layout_exit",
					name:"\u6ce8\u9500",
					limit:!0,
					keys:[
						{
							ctrlKey:1,
							shiftKey:0,
							altKey:1,
							keyCode:69,
							des:"Ctrl + Alt + E"
						}
					]
				},
				layout_desktop_goleft:{
					id:"layout_desktop_goleft",
					name:"\u5207\u6362\u5230\u4e0a\u4e00\u4e2a\u684c\u9762",
					limit:!0,
					keys:[
						{
							ctrlKey:1,
							shiftKey:0,
							altKey:1,
							keyCode:37,
							des:"Ctrl + Alt + \u2190"
						}
					]
				},
				layout_desktop_goright:{
					id:"layout_desktop_goright",
					name:"\u5207\u6362\u5230\u4e0b\u4e00\u4e2a\u684c\u9762",
					limit:!0,
					keys:[
						{
							ctrlKey:1,
							shiftKey:0,
							altKey:1,
							keyCode:39,
							des:"Ctrl + Alt + \u2192"
						}
					]
				},
				layout_desktop_gospecific:{
					id:"layout_desktop_gospecific",
					name:"\u5207\u6362\u5230\u6307\u5b9a\u684c\u9762",
					limit:!0,
					des:"Ctrl + Alt + (1/2/3/4/5)",
					keys:[
						{
							ctrlKey:1,
							shiftKey:0,
							altKey:1,
							keyCode:49,
							des:"Ctrl + Alt + 1"
						},{
							ctrlKey:1,
							shiftKey:0,
							altKey:1,
							keyCode:50,
							des:"Ctrl + Alt + 2"
						},{
							ctrlKey:1,
							shiftKey:0,
							altKey:1,
							keyCode:51,
							des:"Ctrl + Alt + 3"
						},{
							ctrlKey:1,
							shiftKey:0,
							altKey:1,
							keyCode:52,
							des:"Ctrl + Alt + 4"
						},{
							ctrlKey:1,
							shiftKey:0,
							altKey:1,
							keyCode:53,
							des:"Ctrl + Alt + 5"
						},{
							ctrlKey:1,
							shiftKey:0,
							altKey:1,
							keyCode:97,
							des:"Ctrl + Alt + 1"
						},{
							ctrlKey:1,
							shiftKey:0,
							altKey:1,
							keyCode:98,
							des:"Ctrl + Alt + 2"
						},{
							ctrlKey:1,
							shiftKey:0,
							altKey:1,
							keyCode:99,
							des:"Ctrl + Alt + 3"
						},{
							ctrlKey:1,
							shiftKey:0,
							altKey:1,
							keyCode:100,
							des:"Ctrl + Alt + 4"
						},{
							ctrlKey:1,
							shiftKey:0,
							altKey:1,
							keyCode:101,
							des:"Ctrl + Alt + 5"
						}
					]
				},
				layout_desktop_gosystem:{
					id:"layout_desktop_gosystem",
					name:"\u5feb\u901f\u6536\u8d77Q+ Web\u684c\u9762",
					limit:!0,disable:!0,
					des:"F2",
					keys:[
						{
							ctrlKey:1,
							shiftKey:0,
							altKey:1,
							keyCode:48,
							des:"Ctrl + Alt + 0"
						},{
							ctrlKey:1,
							shiftKey:0,
							altKey:1,
							keyCode:96,
							des:"Ctrl + Alt + 0"
						},{
							ctrlKey:0,
							shiftKey:0,
							altKey:0,
							keyCode:113,
							des:"F2"
						},{
							ctrlKey:1,
							shiftKey:0,
							altKey:1,
							keyCode:192,
							des:"Ctrl + Alt + `"
						}
					]
				},
				layout_desktop_manage:{
					id:"layout_desktop_manage",
					name:"\u5168\u5c40\u89c6\u56fe",
					limit:!0,
					keys:[
						{
							ctrlKey:1,
							shiftKey:0,
							altKey:1,
							keyCode:38,
							des:"Ctrl + Alt + \u2191"
						}
					]
				}
			};
		this.addHotkeyInfo=function(b){j[b.id]=b};
		this.getHotkeyInfo=function(b){return j[b]};
		this.setHotkeyInfo=function(b,c){j[b]=c};
		this.removeHotkeyInfo=function(b){return j[b]?(j[b]=null,delete j[b],!0):!1};
		this.setHotkeyState=function(b){e=b;d.notifyObservers(alloy.hotkeyManager,"hotkeyStateChanged",b)};
		this.isHotkeyEnable=function(){return e};
		this.setHotkeyLimitState=function(b){g=b};
		this.isHotkeyLimited=function(){return g};
		this.setSendHotKey=function(b){
			var d=c.getHotkeyInfo("eqq_chatbox_sendmsg");
			b.toString()=="true"?(d.mutexKeys[0].selected=!1,d.mutexKeys[1].selected=!0):(d.mutexKeys[0].selected=!0,d.mutexKeys[1].selected=!1);
			alloy.config.configList.isNotNeedCtrlKey=b
		};
		var l=function(){
			var b=alloy.config.configList.isNotNeedCtrlKey;
			b&&c.setSendHotKey(b)
		};
		this.init=function(){
			d.addObserver(alloy.portal,"UACReady",l)
		}
	}
);
Jx().$package(
	"alloy.hotkey",
	function(b){
		var d=this,
			c=b.dom,
			e="\u622a\u5c4f",
			g=!1,
			j=new b.Class({
				hotkeyctrl:null,
				init:function(){
					if(this.detectPlugin())
						if(b.browser.ie){
							var d=document.createElement("div");
							c.addClass(d,"hidden_div");
							d.innerHTML='<object id="hotkeyctrlid" CLASSID="CLSID:E9E96A86-4CEC-4DBF-A5A2-37C8C7E66F1A" ></object>';
							document.body.appendChild(d);
							this.hotkeyctrl=document.getElementById("hotkeyctrlid").object
						}else if(b.browser.firefox)
							d=document.createElement("div"),
							c.addClass(d,"hidden_div"),
							d.innerHTML='<embed id="hotkeyctrlid" type="application/tencent-WebQQ-hotkey" hidden="true"></embed>',
							document.body.appendChild(d),
							this.hotkeyctrl=document.getElementById("hotkeyctrlid");
						else if(b.browser.chrome)
							d=document.createElement("div"),
							c.addClass(d,"hidden_div"),
							d.innerHTML='<embed id="hotkeyctrlid" type="application/tencent-webqq-hotkey" hidden="true"></embed>',
							document.body.appendChild(d),
							this.hotkeyctrl=document.getElementById("hotkeyctrlid")
				},
				install:function(){
					if((b.browser.ie||b.browser.firefox||b.browser.chrome)&&this.detectPlugin()){
						var c=this.reghotkey(1,3,65);
						c?e="\u622a\u5c4f(Ctrl + Alt + A)":(c=this.reghotkey(1,7,65))&&(e="\u622a\u5c4f(Ctrl + Alt + Shift + A)");
						if(c)
							return this.regCallback(function(){alloy.portal.runApp("screenCapture")}),alloy.layout.removeHotKeyAction("layout_screencaptrue"),!0;
						else
							setTimeout(function(){},1E3)
					}
					return!1
				},
				hotKeyBusy:function(){
					alloy.windowFactory.createWindow(
						"Window",
						{
							title:"\u6e29\u99a8\u63d0\u793a",
							modeSwitch:!0,
							dragable:!0,
							resize:!0,
							width:380,
							height:120,
							hasCloseButton:!0,
							hasOkButton:!0,
							isSetCentered:!0
						}
					).setHtml('<div style="width:100%; height:100%; background-color:#FFFFFF; line-height:60px;text-align:center; vertical-align:middle;">\t\t\t\t\t\t\t\u622a\u5c4f\u5feb\u6377\u952e\u5df2\u88ab\u5176\u4ed6\u7a0b\u5e8f\u5360\u7528,\u82e5\u8981\u8fdb\u884c\u622a\u5c4f,\u8bf7\u624b\u52a8\u70b9\u51fb\u622a\u5c4f\u6309\u94ae!\t\t\t\t\t\t   </div>')
				},
				detectPlugin:function(){
					try{
						if(new ActiveXObject("hotkeyctrl.Hotkey"))
							return!0
					}catch(b){
						var c=navigator.mimeTypes["application/tencent-WebQQ-hotkey"];
						if(c){
							if(c=c.enabledPlugin)
								return!0
						}else{
							if(c=navigator.mimeTypes["application/tencent-webqq-hotkey"])
								if(c=c.enabledPlugin)
									return!0;
							return!1
						}
					}
				},
				reghotkey:function(b,c,d){
					if(this.hotkeyctrl)
						return 0==this.hotkeyctrl.reg(b,c,d)?!0:!1
				},
				regCallback:function(b){
					if(this.hotkeyctrl)
						this.hotkeyctrl.onhotkey=b
				},
				unreg:function(b){
					this.hotkeyctrl&&this.hotkeyctrl.unreg(b)
				},
				unstall:function(){
					this.hotkeyctrl&&this.hotkeyctrl.unreg(1);
					this.hotkeyctrl=null
				}
			});
		this.init=function(){
			d.scaptureHotkey=new j;
			g=d.scaptureHotkey.install();
			alloy.portal.addCloseHookForHotKey()
		};
		this.unstall=function(){
				d.scaptureHotkey&&d.scaptureHotkey.unstall()
		};
		this.getHotKeyTitle=function(){
			return e
		};
		this.isRegisterSuccess=function(){
			return g
		}
	}
);
Jx().$package(
	function(b){
		var d=b.event;
		if(top.location.host!=location.host)
			alloy.util.report2h("be_iframed","start"),
			top.location=location;
		d.on(window,"load",function(){alloy.util.setTimingRpt(7723,2,2,3)});
		b.profile("Hello everyone, welcome to Q+ Web, 100% loaded, we're starting... time: "+b.now());
		alloy.util.report2h("portal","start");
		alloy.portal.speedTest.sRTS(7,"start",window._SPEEDTIME_WINDOWSTART);
		alloy.portal.speedTest.sRTS(7,"end",new Date,!0);
		alloy.portal.speedTest.sRTS(8,"start",new Date);
		d.on(window,"load",function(){alloy.init()})
	}
);