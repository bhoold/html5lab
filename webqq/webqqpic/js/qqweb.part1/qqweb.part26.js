Jx().$package("alloy.hotkeyManager",function(b){
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
					des:"Alt + (1/2/3/4/5)",
					keys:[
						{
							ctrlKey:0,
							shiftKey:0,
							altKey:1,
							keyCode:49,
							des:"Alt + 1"
						},{
							ctrlKey:0,
							shiftKey:0,
							altKey:1,
							keyCode:50,
							des:"Alt + 2"
						},{
							ctrlKey:0,
							shiftKey:0,
							altKey:1,
							keyCode:51,
							des:"Alt + 3"
						},{
							ctrlKey:0,
							shiftKey:0,
							altKey:1,
							keyCode:52,
							des:"Alt + 4"
						},{
							ctrlKey:0,
							shiftKey:0,
							altKey:1,
							keyCode:53,
							des:"Alt + 5"
						},{
							ctrlKey:0,
							shiftKey:0,
							altKey:1,
							keyCode:97,
							des:"Alt + 1"
						},{
							ctrlKey:0,
							shiftKey:0,
							altKey:1,
							keyCode:98,
							des:"Alt + 2"
						},{
							ctrlKey:0,
							shiftKey:0,
							altKey:1,
							keyCode:99,
							des:"Alt + 3"
						},{
							ctrlKey:0,
							shiftKey:0,
							altKey:1,
							keyCode:100,
							des:"Alt + 4"
						},{
							ctrlKey:0,
							shiftKey:0,
							altKey:1,
							keyCode:101,
							des:"Alt + 5"
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