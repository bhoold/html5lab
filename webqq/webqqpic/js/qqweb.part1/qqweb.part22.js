Jx().$package("alloy.taskBar",function(b){
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
