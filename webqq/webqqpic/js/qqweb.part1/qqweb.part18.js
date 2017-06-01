Jet().$package("alloy.layout", function (b) {
    var d = this,
        c = b.dom,
        e = b.event,
        g = b.fx.transitions,
        j = c.getDocumentElement(),
        l = document.body,
        q = c.id("startingCover"),
        u = document.title,
        p = null,
        v = c.id("desktop"),
        x = !0,
        m, o, h = !1,
        a = {},
        f = [10, 1E5, 2E5, 3E5, 4E5],
        n, s, w, C, y, z, F, H, r = [],
        k = null,
        A = [{
            text: "\u663e\u793a\u684c\u9762",
            onClick: function () {
                qqweb.layout.showDesktop();
                qqweb.rpcService.reportQstatic("contextmenu|desktop|dispdesk")
            }
        }, {
            text: "\u9501\u5b9a",
            onClick: function () {
                qqweb.portal.runApp("screenLocker");
                qqweb.rpcService.reportQstatic("contextmenu|desktop|lock")
            }
        }, {
            type: "separator"
        }, {
            text: "\u6dfb\u52a0",
            type: "submenu",
            items: [{
                text: "\u6dfb\u52a0\u5e94\u7528",
                icon: {
                    className: "add_app_icon"
                },
                onClick: function () {
                    alloy.system.runApp("appMarket");
                    qqweb.util.report2qqweb("add|contextmenu|addapp")
                }
            }, {
                text: "\u6dfb\u52a0\u684c\u9762\u8054\u7cfb\u4eba",
                icon: {
                    className: "add_contact_icon"
                },
                onClick: function () {
                    alloy.desktopContact.showSelectBuddyBox();
                    qqweb.util.report2qqweb("add|contextmenu|adddeskcontanct")
                }
            }]
        }, {
            text: "\u4e0a\u4f20\u6587\u4ef6",
            type: "flash",
            icon: {
                className: "add_file_icon"
            },
            onClick: function () {}
        }, {
            text: "\u65b0\u5efa\u6587\u4ef6\u5939",
            icon: {
                className: "add_folder_icon"
            },
            onClick: function () {
                alloy.desktopFolder.createFolder();
                qqweb.util.report2qqweb("add|contextmenu|createfolder")
            }
        }, {
            text: "\u7c98\u8d34",
            onClick: function () {
                var a = alloy.clipBoard.getData();
                if (a) {
                    var b = a.data,
                        c = alloy.desktopManager.getCurrentDesktopIndex();
                    a.pasteType == alloy.clipBoard.PASTE_TYPE.COPY ? alloy.fileSystem.copyFile(b, c) : alloy.fileSystem.moveFile(b, c, null, null, null, !0)
                }
                alloy.clipBoard.clear()
            }
        }, {
            type: "separator"
        }, {
            text: "QQ\u4e91\u8bcd\u5178",
            onClick: function () {
                qqweb.portal.runApp("qqWebDict");
                qqweb.rpcService.reportQstatic("contextmenu|desktop|clouddic")
            }
        }, {
            type: "separator"
        }, {
            text: "\u4e3b\u9898\u8bbe\u7f6e",
            onClick: function () {
                qqweb.portal.runApp("themeSetting");
                qqweb.rpcService.reportQstatic("contextmenu|desktop|theme")
            }
        }, {
            text: "\u7cfb\u7edf\u8bbe\u7f6e",
            onClick: function () {
                qqweb.portal.runApp("settingCenter");
                qqweb.rpcService.reportQstatic("contextmenu|desktop|config")
            }
        }, {
            text: "\u56fe\u6807\u8bbe\u7f6e",
            type: "submenu",
            beforeShow: function (a) {
                alloy.desktopManager.getDesktopIconStyle() ? (a.getItemAt(0).setIcon({
                    className: "desktop_icon_style_checked"
                }), a.getItemAt(1).setIcon()) : (a.getItemAt(0).setIcon(), a.getItemAt(1).setIcon({
                    className: "desktop_icon_style_checked"
                }))
            },
            items: [{
                text: "\u5c0f\u56fe\u6807",
                onClick: function () {
                    alloy.desktopManager.getDesktopIconStyle() != 1 && (alloy.desktopManager.setDesktopIconStyle(1, !0), qqweb.util.report2qqweb("iconchange|right|icon|small"))
                }
            }, {
                text: "\u5927\u56fe\u6807",
                onClick: function () {
                    alloy.desktopManager.getDesktopIconStyle() != 0 && (alloy.desktopManager.setDesktopIconStyle(0, !0), qqweb.util.report2qqweb("iconchange|right|icon|big"))
                }
            }]
        }, {
            type: "separator"
        }, {
            text: "\u53cd\u9988",
            onClick: function () {
                window.open("http://support.qq.com/discuss/513_1.shtml")
            }
        }, {
            text: "\u6ce8\u9500",
            onClick: function () {
                qqweb.portal.exit();
                e.notifyObservers(qqweb.portal, "Exit");
                qqweb.rpcService.reportQstatic("contextmenu|desktop|quit")
            }
        }],
        D = {
            layout_showdesktop: function () {
                qqweb.layout.showDesktop();
                alloy.util.report2qqweb("hotkey|showdesk")
            },
            layout_lock: function () {
                qqweb.portal.getLoginLevel() > qqweb.CONST.LOGIN_LEVEL_NONE && (qqweb.portal.runApp("screenLocker"), alloy.util.report2qqweb("hotkey|lock"))
            },
            layout_exit: function () {
                qqweb.portal.getLoginLevel() > qqweb.CONST.LOGIN_LEVEL_NONE && (alloy.util.report2qqweb("hotkey|signout"), qqweb.portal.exit(), e.notifyObservers(qqweb.portal, "Exit"))
            },
            layout_window_current_close: function () {
                var a = alloy.windowManager.getCurrentWindow();
                a && a.isShow() && (a.close(), alloy.util.report2qqweb("hotkey|close"))
            },
            layout_window_closeall: function () {
                for (var a = alloy.windowManager.getWindowList(), b, c = a.length - 1; c >= 0; c--) b = a[c], b.windowType == "window" && b.close();
                alloy.util.report2qqweb("hotkey|closeallapp")
            },
            layout_window_goleft: function () {
                J(-1);
                alloy.util.report2qqweb("hotkey|tableft")
            },
            layout_window_goright: function () {
                J(1);
                alloy.util.report2qqweb("hotkey|tabright")
            },
            eqq_chatbox_classall: function () {
                for (var a = alloy.windowManager.getWindowList(), b, c = a.length - 1; c >= 0; c--) b = a[c], b.windowType == "chatbox" && b.close();
                alloy.util.report2qqweb("hotkey|closeallchat")
            },
            eqq_chatbox_read: function () {
                if (qqweb.portal.getLoginLevel() == qqweb.CONST.LOGIN_LEVEL_ALL) {
                    var a = alloy.messageSystem.getLatestMessage();
                    a && (alloy.messageSystem.handleNotification(a.id), alloy.util.report2qqweb("hotkey|getmsg"))
                }
            },
            layout_screencaptrue: function () {
                if (alloy.portal.isWebTop()) if (alloy.portal.getLoginLevel() == alloy.CONST.LOGIN_LEVEL_ALL) {
                    var a = alloy.windowManager.getCurrentWindow();
                    a ? alloy.portal.runApp("screenCapture2", {
                        mode: a.mode,
                        uin: a.uin,
                        chatBoxType: a.chatBoxType
                    }) : alloy.portal.runApp("screenCapture2")
                } else alloy.portal.runApp("screenCapture2");
                else alloy.portal.runApp("screenCapture")
            },
            layout_desktop_goleft: function () {
                alloy.desktopManager.goPrevDesktop();
                alloy.util.report2qqweb("hotkey|screenleft")
            },
            layout_desktop_goright: function () {
                alloy.desktopManager.goNextDesktop();
                alloy.util.report2qqweb("hotkey|screenright")
            },
            layout_desktop_gospecific: function (a) {
                a = Number(a.keyCode);
                a = a > 96 ? a - 97 : a - 49;
                alloy.desktopManager.setCurrentDesktop(a);
                alloy.util.report2qqweb("hotkey|screen" + a)
            },
            layout_desktop_gosystem: function (a) {
                alloy.portal.switchToDesktop();
                a = Number(a.keyCode);
                a == 48 || a == 96 ? alloy.util.report2qqweb("hotkey|0systemdesk") : a == 113 ? alloy.util.report2qqweb("hotkey|f2systemdesk") : a == 192 ? alloy.util.report2qqweb("hotkey|wavesystemdesk") : alloy.util.report2qqweb("hotkey|othersystemdesk")
            },
            layout_desktop_manage: function () {
                alloy.appManager.tooglePanel()
            },
            open_msg_manager: function () {
                alloy.portal.runApp("messageManager")
            }
        },
        E = {};
    this.Panel = b.ui.Panel;
    this.PopupBox = b.ui.PopupBox;
    var I = {
        stopPropagation: function (a) {
            a.stopPropagation()
        },
        onClickDesktop: function (a) {
            var b;
            a.target.tagName === "A" && (b = a.target.getAttribute("href")) && (b === "###" || b === "#") && a.preventDefault();
            x = !0;
            e.notifyObservers(qqweb.layout, "clickDesktop")
        },
        onFocusDesktop: function () {
            x = !0;
            e.notifyObservers(alloy.layout, "desktopFocus")
        },
        onBlurDesktop: function () {
            x = !1;
            e.notifyObservers(alloy.layout, "desktopBlur")
        },
        onKeydownDesktop: function (a) {
            e.notifyObservers(alloy.layout, "desktopKeydown", a)
        },
        onKeyupDesktop: function (a) {
            e.notifyObservers(alloy.layout, "desktopKeyup", a)
        },
        onWindowResize: function () {
            var a = c.getClientWidth(),
                d = c.getClientHeight();
            b.browser.ie == 6 && (a = a % 2 + a, d = d % 2 + d);
            if (n == a && s == d) b.out("resize nothing");
            else {
                a = c.getClientWidth();
                d = c.getClientHeight();
                b.browser.ie == 6 && (a = a % 2 + a, d = d % 2 + d);
                n = a;
                s = d;
                var f = !1;
                a >= z ? (c.setStyle(j, "overflowX", "hidden"), c.setStyle(v, "width", ""), w = a) : (f = !0, c.setStyle(j, "overflowX", "auto"), c.setStyle(v, "width", z + "px"), w = z);
                d >= F ? (c.setStyle(j, "overflowY", "hidden"), c.setStyle(v, "height", ""), C = d) : (f = !0, c.setStyle(j, "overflowY", "auto"), c.setStyle(v, "height", F + "px"), C = F);
                f ? c.setStyle(v, "position", "absolute") : c.setStyle(v, "position", "static");
                c.setStyle(l, "height", C + "px");
                q && (c.setStyle(q, "width", w + "px"), c.setStyle(q, "height", C + "px"));
                e.notifyObservers(alloy.layout, "desktopResize")
            }
        },
        onDesktopContextmenu: function (a) {
            if (c.hasClass(a.target, "zoomWallpaper") || c.hasClass(a.target, "desktopContainer") || c.hasClass(a.target, "appListContainer")) {
                a.preventDefault();
                var b;
                alloy.portal.getLoginLevel() == alloy.CONST.LOGIN_LEVEL_NONE ? (b = A.concat(), b.splice(5, 2)) : b = A;
                alloy.layout.showContextMenu({
                    x: a.clientX,
                    y: a.clientY
                }, {
                    beforeShow: G,
                    items: b
                });
                qqweb.rpcService.reportQstatic("contextmenu|desktop")
            }
        }
    },
        K = function () {
            E = {};
            if (window.webTop) alloy.hotkeyManager.getHotkeyInfo("layout_desktop_gosystem").disable = !1;
            for (var a in D) {
                var b = D[a],
                    c = alloy.hotkeyManager.getHotkeyInfo(a);
                if (!c.disable) for (var d in c.keys) {
                    var f = c.keys[d];
                    E["" + (f.ctrlKey ? 1 : 0) + (f.shiftKey ? 1 : 0) + (f.altKey ? 1 : 0) + "_" + f.keyCode] = {
                        keyId: a,
                        action: b
                    }
                }
            }
        };
    this.removeHotKeyAction = function (a) {
        D[a] = null;
        delete D[a];
        K()
    };
    this.getIsFocusOnDesktop = function () {
        return x
    };
    var N = function () {
            alloy.iconFactory.init()
        },
        M = function (a) {
            if (alloy.hotkeyManager.isHotkeyEnable()) {
                var b = "" + (a.ctrlKey ? 1 : 0) + (a.shiftKey ? 1 : 0) + (a.altKey ? 1 : 0) + "_" + a.keyCode;
                if (E[b]) {
                    var c = alloy.hotkeyManager.getHotkeyInfo(E[b].keyId);
                    !c.disable && (!alloy.hotkeyManager.isHotkeyLimited() || !c.limit) && E[b].action(a)
                }
            }
        },
        J = function (a) {
            var b = alloy.windowManager.getOnlyWindowList(),
                c = alloy.windowManager.getCurrentWindow(),
                d;
            if (c) for (var f = 0, e = b.length; f < e; f++) {
                if (d = b[f], c == d) {
                    c = f;
                    (d = b[c += a]) ? d.setCurrent() : c < 0 ? (d = b[b.length - 1], d.setCurrent()) : c >= b.length && (d = b[0], d.setCurrent());
                    break
                }
            } else b.length > 0 && b[b.length - 1].setCurrent()
        },
        Q = new b.fx.Animation({
            element: q,
            property: "opacity",
            from: 1,
            to: 0,
            unit: !1,
            duration: 1E3,
            fps: 30,
            transition: g.sinusoidal.easeOut
        });
    e.addObserver(Q, "end", function () {
        c.hide(q)
    });
    var R = new b.fx.Animation({
        element: v,
        property: "opacity",
        from: 1,
        to: 0,
        unit: !1,
        duration: 1E3,
        fps: 30,
        transition: g.sinusoidal.easeOut
    });
    e.addObserver(R, "end", function () {
        c.hide(v)
    });
    var G = function (a) {
            if (alloy.portal.getLoginLevel() != alloy.CONST.LOGIN_LEVEL_NONE) {
                var b = alloy.clipBoard.getData(),
                    c = alloy.clipBoard.CLIP_BOARD_TYPE;
                b && (b.type == c.FILE || b.type == c.FOLDER) ? a.getItemAt(6).enable() : a.getItemAt(6).disable()
            }
        },
        W = function () {
            b.profile("DesktopCreate");
            var f = c.id("desktopWrapper"),
                g = c.id("topBar"),
                h = c.id("bottomBar"),
                k = c.id("rightBar"),
                n = c.id("leftBar");
            a.topArea = g;
            a.bottomArea = h;
            a.mainArea = f;
            a.leftArea = n;
            a.rightArea = k;
            if (b.browser.mobileSafari) f = c.id("touchpad"), c.show(f), f.src = qqweb.CONST.MAIN_URL + "./touchpad.html?20101021001", e.on(l, "touchmove", function (a) {
                a.touches && a.touches.length == 1 && a.preventDefault()
            }, !0);
            f = H.createPanel({
                id: "desktop",
                name: "desktop",
                container: d.getBody(),
                body: v,
                html: ""
            });
            e.on(v, "contextmenu", I.onDesktopContextmenu);
            e.on(window, "resize", I.onWindowResize);
            if (b.browser.mobileSafari) e.on(window, "orientationchange", I.onWindowResize);
            e.on(v, "click", I.onClickDesktop);
            e.on(document, "keydown", I.onKeydownDesktop);
            e.on(document, "keyup", I.onKeyupDesktop);
            "onfocusin" in document ? (e.on(document, "focusin", I.onFocusDesktop), e.on(document, "focusout", I.onBlurDesktop)) : (e.on(window, "focus", I.onFocusDesktop), e.on(window, "blur", I.onBlurDesktop));
            b.profile("DesktopCreateFinish");
            return f
        },
        P = b.Class({
            init: function () {
                this.panelList = []
            },
            createPanel: function (a) {
                var a = a || {},
                    c = new b.ui.Panel(a);
                this.panelList[a.id] = c;
                b.out("createPanel:" + a.name, "layout");
                return c
            },
            getPanel: function (a) {
                return this.panelList[a]
            }
        });
    this.init = function () {
        b.browser.mobileSafari ? (z = 680, F = 640) : (z = 320, F = 100);
        H = this.panelManager = new P;
        W();
        alloy.windowFactory.init();
        alloy.windowManager.init();
        alloy.desktopManager.init({
            initializeLength: 5
        });
        if (b.browser.firefox) setTimeout(I.onWindowResize, 100);
        else I.onWindowResize();
        e.addObserver(qqweb.portal, "AlloyJsReady", N);
        e.addObserver(alloy.layout, "desktopKeyup", M);
        alloy.dock.init({
            dragController: alloy.desktopManager.getDragController()
        });
        alloy.taskBar.init();
        K()
    };
    this.getArea = function (b) {
        return a[b + "Area"]
    };
    this.getAreaWidth = function (b) {
        return (b = a[b + "Area"]) ? c.getWidth(b) : 0
    };
    this.getAreaHeight = function (b) {
        return b === "bottom" ? 30 : (b = a[b + "Area"]) ? c.getHeight(b) : 0
    };
    this.getAvailableWidth = function () {
        return this.getDesktopWidth() - this.getAreaWidth("left") - this.getAreaWidth("right")
    };
    this.getAvailableHeight = function () {
        return this.getDesktopHeight() - this.getAreaHeight("top") - this.getAreaHeight("bottom")
    };
    this.setDesktopWidth = function (a) {
        return w = a
    };
    this.setDesktopHeight = function (a) {
        return C = a
    };
    this.getDesktopWidth = function () {
        return w
    };
    this.getDesktopHeight = function () {
        return C
    };
    this.getDesktopSize = function () {
        return {
            width: w,
            height: C
        }
    };
    this.getAvailSize = function () {
        return {
            width: this.getAvailableWidth(),
            height: this.getAvailableHeight()
        }
    };
    this.getClientWidth = function () {
        return n = n || c.getClientWidth()
    };
    this.getClientHeight = function () {
        return s = s || c.getClientHeight()
    };
    this.getClientSize = function () {
        return {
            width: d.getClientWidth(),
            height: d.getClientHeight()
        }
    };
    this.getDesktop = function () {
        return H.getPanel("desktop")
    };
    this.getBody = function () {
        return l
    };
    this.getMaskLayer = function (a) {
        return a ? (a = new b.ui.MaskLayer({
            appendTo: this.getDesktop().body,
            zIndex: 1,
            opacity: 0.5
        }), a.reset(), a) : (o || (o = new b.ui.MaskLayer({
            appendTo: this.getDesktop().body,
            zIndex: 1,
            opacity: 0.5
        })), o.reset(), o)
    };
    this.getPanel = function (a) {
        return H.getPanel(a)
    };
    this.getTopZIndex = function (a) {
        if (b.isUndefined(a) || !f[a]) a = 0;
        return f[a]++
    };
    this.getThemeManager = function () {};
    this.showDesktop = function () {
        for (var a = [], b, c = alloy.windowManager.getCurrentWindow(), d = alloy.windowManager.getWindowList(), f = 0; f < d.length; f++) b = d[f], b.windowType !== "widget" && b.isShow && b.isShow() && (b.min(), a.push(b));
        if (a.length > 0) r = a, k = c;
        else {
            k && !k.isDestroy && k.setCurrent();
            for (f = 0; f < r.length; f++) r[f].show()
        }
    };
    this.setTitle = function (a, b) {
        b.roll = b.roll || !1;
        b.speed = b.speed || 500;
        if (b.roll) {
            if (!(a.length < 1)) u = document.title, p && clearInterval(p), p = setInterval(function () {
                document.title = a;
                a = a.substr(1) + a.charAt(0)
            }, b.speed)
        } else u = document.title, document.title = a
    };
    this.resetTitle = function () {
        p && (clearInterval(p), p = null);
        document.title = u
    };
    this.setIe9IconOverLay = function (a) {
        var b = alloy.CONST.DOMAIN,
            c = ["overlay1", "overlay2", "overlay3", "overlay4", "overlay5", "overlay6", "overlay7", "overlay8", "overlay9", "overlay10"];
        if (a == 0) try {
            window.external.msSiteModeClearIconOverlay()
        } catch (d) {} else if (a < 10) try {
            window.external.msSiteModeSetIconOverlay("http://" + b + "/" + c[a - 1] + ".ico", "overlay " + a), window.external.msSiteModeActivate()
        } catch (f) {} else if (a >= 10) try {
            window.external.msSiteModeSetIconOverlay("http://" + b + "/" + c[9] + ".ico", "overlay 10"), window.external.msSiteModeActivate()
        } catch (e) {}
    };
    this.messagebox = function (a, b) {
        b = b || {};
        b.innerHtml = a;
        b.appendTo = b.appendTo || alloy.desktopManager.getCurrentDesktop().getElement();
        return (new alloy.businessClass.MessageBox(b)).Window
    };
    this.alert = function (a, b, c) {
        c = c || {};
        c.onAccept = b;
        c.innerHtml = a;
        c.appendTo = c.appendTo || alloy.desktopManager.getCurrentDesktop().getElement();
        return (new alloy.businessClass.MessageBox.Alert(c)).Window
    };
    this.confirm = function (a, b, c) {
        c = c || {};
        c.onAccept = b;
        c.innerHtml = a;
        c.appendTo = c.appendTo || alloy.desktopManager.getCurrentDesktop().getElement();
        return (new alloy.businessClass.MessageBox.Confirm(c)).Window
    };
    this.createBubble = function (a) {
        a = a || {};
        a.bubbleParent = a.bubbleParent || qqweb.layout.getDesktop().body;
        a.zIndex = a.zIndex || qqweb.layout.getTopZIndex(4);
        return new b.ui.Bubble(a)
    };
    this.getBubble = function () {
        y || (y = this.createBubble());
        return y
    };
    this.showContextMenu = function (a, c) {
        m || (m = new b.ui.ContextMenu({
            container: alloy.layout.getDesktop().body
        }));
        m.setZIndex(alloy.layout.getTopZIndex(3));
        m.setStyle("width", c.width ? c.width + "px" : "140px");
        m.clearItems();
        m.addItems(c.items);
        m.setArgument(c.argument);
        c.beforeShow && c.beforeShow.call(m, m);
        m.show(a.x, a.y, a.offset);
        c.afterShow && c.afterShow.call(m, m);
        return m
    };
    this.hideLoginWindow = function () {
        var a;
        if (a = c.id("ifram_login")) a.src = alloy.CONST.MAIN_URL + "domain.html";
        try {
            h.close(), h = null
        } catch (b) {}
    };
    this.showLoginBox = this.showLoginWindow = function (a, c, f, e) {
        a = {
            width: 380,
            height: 320,
            title: "\u767b\u5f55Q+ Web",
            hasCloseButton: !0,
            isSetCurrent: !0,
            isSetCentered: !0,
            dragable: !0,
            src: "",
            modal: !0,
            zIndex: d.getTopZIndex(3),
            appendTo: d.getDesktop().body,
            onClose: function () {
                h = null
            }
        };
        alloy.portal.setTryLoginType(c);
        f = f || "online";
        alloy.portal.setTryLoginState(f);
        f = alloy.util.state2code(f);
        alloy.portal.setWithPtwebqqLogin( !! alloy.portal.getPtwebqq());
        var g = encodeURIComponent(window.location.protocol + "//" + window.location.host + "/loginproxy.html"),
            k = "",
            e = e || "",
            k = "";
        if (e) c ? (d.loginWindowInfoHeight = !1, k = '<div id="login_window_info" class ="login_window_info login_window_info2">' + e + "</div>") : (d.loginWindowInfoHeight = !0, k = '<div id="login_window_info" class ="login_window_info">' + e + "</div>");
        c ? (a.src = "http://ui.ptlogin2.qq.com/cgi-bin/login?target=self&style=5&mibao_css=m_webqq&appid=1003903&enable_qlogin=0&no_verifyimg=1&s_url=" + g + "&f_url=loginerroralert&strong_login=1&login_state=" + f + "&t=" + alloy.CONST.UPDATE_TIME_STAMP, k = '            <div id="login_window_content_area" class="login_content_area"><div class="login_logo_qq"></div>' + k + '<div class="login_window_wrap">            <iframe id="ifram_login"  src="' + a.src + '" scrolling="no" frameborder="no" allowtransparency="true" scrolling="hidden" hidefocus ></iframe>                    </div></div>') : (a.src = "http://ui.ptlogin2.qq.com/cgi-bin/login?target=self&style=5&mibao_css=m_webqq&appid=1003903&enable_qlogin=0&no_verifyimg=1&s_url=" + g + "&f_url=loginerroralert&strong_login=0&login_state=" + f + "&t=" + alloy.CONST.UPDATE_TIME_STAMP, k = '<div id="login_window_content_area" class="login_content_area"><div class="login_logo_webqq"></div>' + k + '<div class="login_window_wrap">            <iframe id="ifram_login"  src="' + a.src + '" scrolling="no" frameborder="no" allowtransparency="true" scrolling="hidden" hidefocus ></iframe>                    </div></div>');
        h = new b.ui.Boxy(a);
        h.getPanel().setHtml(k);
        return h
    };
    this.setLoginWindowHeight = function (a) {
        d.loginWindowInfoHeight && (a += 18);
        h.getPanel().setHeight(a);
        if (b.browser.ie && b.browser.ie < 7) {
            var f = c.id("login_window_content_area");
            c.setStyle(f, "height", a + "px")
        }
    };
    this.hideStartingCover = function () {
        b.browser.ie == 6 ? setTimeout(function () {
            c.hide(q)
        }, 500) : Q.start();
        window.webTop && webTop.ui.channel.postCmd(23)
    };
    this.hideDesktop = function () {
        R.start()
    };
    this.showWebTopInstallBox = function () {
        if (b.platform.win) window.open("http://dl_dir.qq.com/qqfile/web/webqq/WebQQ_1.2.46.400.exe", "_blank");
        else {
            var a = alloy.CONST.CDN_URL + "swf/webtopInstall.swf?t=" + alloy.CONST.UPDATE_TIME_STAMP,
                d = alloy.layout.messagebox('<div class="airInstallPopup">        <div class="airInstallPopupContent">            <object id="webtopInstallFlash" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="385" height="164" align="middle">                <param name="movie" value="' + a + '" />                <param name="quality" value="high" />                <param name="bgcolor" value="#ffffff" />                <param name="play" value="true" />                <param name="loop" value="true" />                <param name="wmode" value="window" />                <param name="scale" value="showall" />                <param name="menu" value="true" />                <param name="devicefont" value="false" />                <param name="salign" value="" />                <param name="allowScriptAccess" value="always" />                <param name="flashvars" value="oninstall=alloy.layout.onAirInstallSuccess&onruntimeready=alloy.layout.onRuntimeReady&version=1.1.30&url=http://dl_dir.qq.com/qqfile/web/webqq/WebQQ.air" />                <embed src="' + a + '" FlashVars="oninstall=alloy.layout.onAirInstallSuccess&onruntimeready=alloy.layout.onRuntimeReady&version=1.1.30&url=http://dl_dir.qq.com/qqfile/web/webqq/WebQQ.air"                     quality="high" wmode="transparent" bgcolor="#ffffff" width="385" height="164" name="main" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/go/getflashplayer_cn" />            </object>        </div>        <div id="airInstallTip">            <span class="mytip">\u201c\u5ba2\u6237\u7aef\u201d\u652f\u6301Windows\u3001Mac\u3001Linux\u7b49\u7cfb\u7edf\u3002</span>            <div class="mytip2">\u5982\u679c\u5728\u7ebf\u5b89\u88c5\u5931\u8d25\uff0c\u60a8\u4e5f\u53ef\u4ee5\u624b\u52a8\u4e0b\u8f7d\u5b89\u88c5\uff0c\u6b65\u9aa4\u5982\u4e0b\uff1a</div>            <ol class="mylinks">                <li id="airDownloadLinkArea" class="link">                <a href="http://dl_dir.qq.com/qqfile/web/webqq/win/AdobeAIRInstaller.exe" target="_blank"  class="webtop_down_link_win">\u4e0b\u8f7dAdobe Air\u73af\u5883</a>                <a href="http://dl_dir.qq.com/qqfile/web/webqq/mac/AdobeAIR.dmg" target="_blank" class="webtop_down_link_mac">\u4e0b\u8f7dAdobe Air\u73af\u5883</a>                <select id="airDownloadSelect" class="webtop_down_link_linux" >                    <option value="">\u4e0b\u8f7dAdobe Air\u73af\u5883</option>                    <option value="http://dl_dir.qq.com/qqfile/web/webqq/lin/AdobeAIRInstaller.bin">Adobe AIR for Linux(.bin)</option>                    <option value="http://dl_dir.qq.com/qqfile/web/webqq/lin/adobeair.i386.rpm">Adobe AIR for Linux(.rpm)</option>                    <option value="http://dl_dir.qq.com/qqfile/web/webqq/lin/adobeair.deb">Adobe AIR for Linux(.deb)</option>                </select>                <span>\uff08\u82e5\u5df2\u5b89\u88c5\u53ef\u8df3\u8fc7\u6b64\u6b65\uff09</span>                </li>                <li id="airDownloadLinkArea2" class="link2">                    <a href="http://dl_dir.qq.com/qqfile/web/webqq/WebQQ.air" target="_blank">\u4e0b\u8f7dQ+ Web\u5ba2\u6237\u7aef</a></li>            </ol>        </div>        <div id="airCloseTip">            <div class="closeText">\u60a8\u73b0\u5728\u53ef\u4ee5\u5173\u95ed\u5f53\u524d\u6d4f\u89c8\u5668\u7a97\u53e3\uff0c\u4f7f\u7528"\u5ba2\u6237\u7aef"\u3002</div>            <a href="###" class="myBtn" id="airInstalledSureBtn">\u786e\u5b9a</a>        </div>    </div>', {
                    title: "\u201c\u5ba2\u6237\u7aef\u201d\u4e0b\u8f7d",
                    width: 385,
                    height: 268
                }),
                f = c.id("airInstalledSureBtn");
            e.on(f, "click", function (a) {
                a.preventDefault();
                e.off(f, "click");
                d.close()
            });
            a = c.id("airDownloadLinkArea");
            e.on(a, "click", function (a) {
                var b = a.target.href;
                if (b) return a.preventDefault(), window.open(b, "_blank"), !1
            });
            b.platform.linux && (a = c.id("airDownloadSelect"), e.on(a, "change", function () {
                var a = this.options[this.selectedIndex];
                a.value && window.open(a.value, "_blank")
            }))
        }
    };
    this.onAirInstallSuccess = function () {
        var a = c.id("airInstallTip"),
            b = c.id("airCloseTip");
        a && b && (c.hide(a), c.show(b))
    };
    this.onRuntimeReady = function () {
        var a = c.id("airDownloadLinkArea");
        a && c.hide(a)
    }
});
