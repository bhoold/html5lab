Jx().$package("alloy.hotkey",function(b){
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