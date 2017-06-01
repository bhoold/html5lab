Jx().$package("alloy.dock", function (b) {
    var d = this,
        c = b.dom,
        e = b.event,
        g, j, l, q, u, p, v, x, m, o, h = 0,
        a = {},
        f = {},
        n, s, w, C = function (a, b) {
            r.onDockMenuItemClick(a, b)
        },
        y = [{
            text: "\u5411\u5de6\u505c\u9760",
            icon: {
                className: "dock_menu_item_left"
            },
            argument: {
                location: "left"
            },
            onClick: C
        }, {
            text: "\u5411\u4e0a\u505c\u9760",
            icon: {
                className: "dock_menu_item_top"
            },
            argument: {
                location: "top"
            },
            onClick: C
        }, {
            text: "\u5411\u53f3\u505c\u9760",
            icon: {
                className: "dock_menu_item_right"
            },
            argument: {
                location: "right"
            },
            onClick: C
        }],
        z = function () {
            var a = alloy.portal.getSystemConfig("appMarket");
            w = alloy.iconFactory.createIcon("app", {
                className: "appMarket",
                longTouchable: !1,
                deleteable: !1,
                icon: {
                    url: alloy.CONST.CDN_URL + "style/images/appmarket.png?20111011001"
                },
                contextMenu: [{
                    text: "\u6253\u5f00\u5e94\u7528\u5e02\u573a",
                    onClick: function () {
                        alloy.portal.runApp("appMarket")
                    }
                }, {
                    type: "separator"
                }, {
                    text: "\u5378\u8f7d",
                    enable: !1
                }],
                onClick: function () {
                    if (w.isNotifyShow()) {
                        alloy.portal.runApp("appMarket", {
                            page: "all",
                            option: {
                                cat: -1,
                                orderBy: 2
                            }
                        });
                        if (alloy.portal.getLoginLevel() > 1) {
                            var a = {
                                context: this,
                                action: "reset",
                                data: {
                                    appid: 1E6,
                                    value: {
                                        appReadTime: (new Date).getTime()
                                    }
                                }
                            };
                            alloy.rpcService.sendSetConfigNew(a)
                        }
                        alloy.util.report2qqweb("screen|appmarket|new")
                    } else alloy.portal.runApp("appMarket"), alloy.util.report2qqweb("screen|appmarket");
                    w.hideNotify();
                    return !1
                }
            }, a);
            u.parentNode.insertBefore(w.getElement(), u);
            c.hide(w.getElement())
        },
        F = function () {
            var a = alloy.portal.getSystemConfig("diskExplorer");
            s = alloy.iconFactory.createIcon("app", {
                className: "diskExplorer",
                longTouchable: !1,
                deleteable: !1,
                icon: {
                    url: alloy.CONST.CDN_URL + "style/images/diskexplorer.png?20111011001"
                },
                contextMenu: [{
                    text: "\u6253\u5f00\u4e91\u5b58\u50a8",
                    onClick: function () {
                        alloy.system.getLoginLevel() > 1 ? alloy.system.runApp("diskExplorer") : alloy.layout.showLoginWindow("diskExplorer")
                    }
                }, {
                    type: "separator"
                }, {
                    text: "\u5378\u8f7d",
                    enable: !1
                }],
                onClick: function () {
                    alloy.system.getLoginLevel() > 1 ? alloy.system.runApp("diskExplorer") : alloy.layout.showLoginWindow("diskExplorer");
                    return !1
                }
            }, a);
            u.parentNode.insertBefore(s.getElement(), u);
            c.hide(s.getElement())
        },
        H = function () {
            if (!b.platform.iPad && !b.cookie.get("cloudstoragetip") && !alloy.windowManager.getWindow("-100")) {
                var a = alloy.windowFactory.createWindow("Window", {
                    windowId: "-100",
                    title: "\u4e91\u5b58\u50a8",
                    modeSwitch: !0,
                    dragable: !0,
                    resize: !0,
                    hasCloseButton: !0,
                    width: 539,
                    height: 378
                });
                a.setHtml('<div style="width:539px;height:378px;background:url(http://0.web.qstatic.com/webqqpic/style/images/cloud-storage.jpg)"></div>');
                e.addObserver(a, "close", function () {
                    b.cookie.set("cloudstoragetip", 1, alloy.CONST.DOMAIN, "/", 1440)
                })
            }
        },
        r = {
            onQuickListContainerDragMove: function () {},
            onAlloyJsReady: function () {
                z();
                F();
                e.addObserver(alloy.sound, "SoundMuteChange", r.onSoundSettingChange)
            },
            onPortalReady: function () {
                c.show(w.getElement());
                c.show(s.getElement());
                H();
                alloy.portal.getLoginLevel() > alloy.CONST.LOGIN_LEVEL_NONE && alloy.rpcService.sendGetNewAppCount()
            },
            onGetNewAppCountSuccess: function (a) {
                var b = w;
                b && (a.result.allcount == 0 ? b.hideNotify() : b.showNotify(a.result.allcount), a.appReadTime && (n = a.appReadTime || (new Date).getTime()))
            },
            onDockContextMenu: function (a) {
                a.preventDefault();
                a.stopPropagation();
                alloy.layout.showContextMenu({
                    x: a.clientX,
                    y: a.clientY
                }, {
                    items: y,
                    beforeShow: function () {
                        this.setClass("dock_menu_select_" + m)
                    }
                })
            },
            onDockMenuItemClick: function (a, b) {
                var c = b.option.argument.location;
                d.setDockLocation(c, !0);
                alloy.util.report2qqweb("contextmenu|desktop|dock|" + c)
            },
            onQuickListContainerDrop: function (a) {
                var b = a.apperceiveEl,
                    d = b.getAttribute("type"),
                    f = a.pos,
                    e = c.getXY(u),
                    a = parseInt(b.getAttribute("fileId"));
                if (!isNaN(a)) {
                    f = m == "top" ? Math.ceil((f.x - e[0] - 29) / 58) : Math.ceil((f.y - e[1] - 29) / 58);
                    f < 0 ? f = 0 : f > 5 && (f = 5);
                    d = {
                        t: d,
                        id: a
                    };
                    b.getAttribute("from");
                    var g;
                    (g = alloy.fileSystem.getFileInfoByFile(d)) && alloy.fileSystem.moveFile(g.file, 5, f, g.parent.id, g.position, !0)
                }
            },
            onDesktopSwitchStatus: function (a) {
                a.status === alloy.desktopManager.DESK_STATUS.EDIT ? c.addClass(g.children[0], "appButtonEditState") : c.removeClass(g.children[0], "appButtonEditState")
            },
            onUACReady: function () {
                var a = alloy.config.configList.dockLoca || "left";
                m !== a && d.setDockLocation(a)
            },
            onDockDragStart: function () {
                c.show(l);
                c.show(q);
                c.show(j.top);
                c.show(j.left);
                c.show(j.right);
                k();
                alloy.util.report2qqweb("dockpositon|drag")
            },
            onDockDragEnd: function () {
                c.hide(l);
                c.hide(q);
                c.hide(j.top);
                c.hide(j.left);
                c.hide(j.right);
                x !== m && (setTimeout(function () {
                    d.setDockLocation(x, !0)
                }, 0), alloy.util.report2qqweb("dockpositon|dragto" + x))
            },
            onDockDragMove: function (a) {
                var b = a.orientEvent.pageX,
                    a = a.orientEvent.pageY,
                    c = alloy.layout.getClientWidth(),
                    d = alloy.layout.getClientHeight(),
                    b = a < d * 0.2 ? "top" : b < c / 2 ? "left" : "right";
                b !== x && k(b)
            },
            onFileAdd: function () {},
            onFileMove: function (a) {
                if (a.targetId == 5) if (a.sourceId == 5) {
                    var b = f[alloy.iconFactory.getIconId(a.file.t, a.file.id)],
                        c = a.targetPosition;
                    a.targetPosition > a.sourcePosition && c++;
                    D(b, c)
                } else A(a.file, a.targetPosition);
                else a.sourceId == 5 && E(a.file)
            },
            onFileDelete: function (a) {
                a.parent.id == 5 && E(a.file)
            },
            onClearDefaultApp: function () {
                I()
            },
            onGetAppConfigError: function () {
                I();
                alloy.appconfig.getAllConfig(50) && A({
                    id: 50,
                    t: "app"
                })
            },
            onGetAppConfigComplete: function () {
                b.profile("DockButton Create");
                var a = alloy.fileSystem.getFolderById(5).items;
                I();
                for (var c = 0; c < a.length && c < 5; c++) A(a[c]);
                b.profile("DockButton CreateFinish")
            },
            onPinyinClick: function () {
                alloy.portal.runApp("qqWebIme")
            },
            onSettingClick: function () {
                alloy.portal.runApp("settingCenter")
            },
            onThemeClick: function () {
                alloy.portal.runApp("themeSetting")
            },
            onSoundClick: function () {
                alloy.sound.isMute() ? alloy.sound.setMute(!1) : alloy.sound.setMute(!0)
            },
            stopPropagation: function (a) {
                a.stopPropagation()
            },
            onStartClick: function (a) {
                a.preventDefault();
                alloy.startMenu.toggleStartMenu(a.target)
            },
            onSoundSettingChange: function (b) {
                b ? (c.addClass(a.sound, "dock_tool_sound_mute"), a.sound.title = "\u53d6\u6d88\u9759\u97f3") : (c.removeClass(a.sound, "dock_tool_sound_mute"), a.sound.title = "\u9759\u97f3")
            },
            onToolListClick: function (a) {
                var b = qqweb.util.getActionTarget(a);
                if (b) {
                    var c = b.getAttribute("cmd");
                    c && r["on" + c + "Click"] && (a.preventDefault(), r["on" + c + "Click"](b))
                }
            },
            onStorageSpaceChanged: function () {
                var a = alloy.util.formatFileSize(alloy.storage.getTotalUsedSpace()),
                    b = alloy.util.formatFileSize(alloy.storage.getTotalSpace());
                s.setTitle("\u4e91\u5b58\u50a8 " + a + "/" + b)
            }
        },
        k = function (a) {
            x = a || m;
            c.setClass(j.top, "dock_drap_effect dock_drap_effect_top");
            c.setClass(j.left, "dock_drap_effect dock_drap_effect_left");
            c.setClass(j.right, "dock_drap_effect dock_drap_effect_right");
            c.setClass(j[x], "dock_drap_effect dock_drap_effect_" + x + " dock_drap_effect_current")
        };
    this.setDockLocation = function (a, b, d) {
        if ("left right top".indexOf(a) != -1) {
            var f = m;
            x = m = a;
            var h = alloy.layout.getArea(a);
            h.appendChild(g);
            v && (c.setStyle(v, "width", "0px"), c.setStyle(v, "height", "0px"));
            v = h;
            a == "left" || a == "right" ? (c.setStyle(h, "width", "73px"), c.setStyle(h, "height", "100%")) : (c.setStyle(h, "width", "100%"), c.setStyle(h, "height", "73px"));
            c.setClass(g, "dock_container dock_pos_" + a);
            if (b) {
                if (alloy.portal.getLoginLevel() > alloy.CONST.LOGIN_LEVEL_NONE) alloy.config.configList.dockLoca = a, d ? alloy.rpcService.sendMSetConfigDelay({
                    data: {
                        0: {
                            dockLoca: a
                        }
                    },
                    delay: d
                }) : alloy.rpcService.sendSetConfig({
                    data: {
                        r: {
                            appid: 0,
                            value: {
                                dockLoca: a
                            }
                        }
                    }
                });
                alloy.util.report2qqweb("dockpositon|" + a)
            }
            e.notifyObservers(alloy.dock, "DockLocationChanged", {
                loca: a,
                oldLoca: f
            })
        }
    };
    this.getDockLocation = function () {
        return m
    };
    this.getDockHeight = function () {
        return parseInt(c.getClientHeight(g))
    };
    var A = function (a, c) {
            var d;
            a: {
                d = {
                    parentNode: u
                };
                var e = alloy.fileSystem.FILE_TYPE;
                if (a.t == e.APP) {
                    e = alloy.appconfig.getAppConfig(a.id);
                    if (!e) {
                        b.profile('Dock createFileIcon. id="' + a.id + '" appConfig is null', "Dock");
                        alloy.fileSystem.deleteFile(a, null, null, null, !1);
                        d = null;
                        break a
                    }
                    d = alloy.iconFactory.createIcon(a.t, d, e)
                } else if (a.t == e.BUDDY || a.t == e.GROUP) d = alloy.iconFactory.createIcon(a.t, d, a);
                else if (a.t == e.FOLDER || a.t == e.FILE) d.file = a, d = alloy.iconFactory.createIcon(a.t, d, a);
                else {
                    d = null;
                    break a
                }
                d && (f[d.getId()] = d, h++, o.addDragClass(d.getElement()))
            }
            d && D(d, c)
        },
        D = function (a, c) {
            var d = a.getElement();
            if (b.isUndefined(c)) u.appendChild(d);
            else {
                var f = u.childNodes;
                f[c] ? u.insertBefore(d, f[c]) : u.appendChild(d)
            }
        },
        E = function (a) {
            if (a = f[a.t + "_" + a.id]) f[a.getId()] = null, delete f[a.getId()], h--, a.destroy()
        },
        I = function () {
            for (var a in f) {
                var b = f[a];
                f[a] = null;
                delete f[a];
                b.destroy()
            }
            h = 0
        };
    this.isInDock = function (a) {
        return !b.isUndefined(f[a])
    };
    this.getDockItemCount = function () {
        return h
    };
    this.getMaxDockItemCount = function () {
        return 5
    };
    this.getDragController = function () {
        return o
    };
    this.getAppIdList = function () {
        for (var a = [], b = u.children, c = 0, d = b.length; c < d; c++) a.push(parseInt(b[c].getAttribute("appId")));
        return a
    };
    this.setUpdateUacTime = function (a) {
        n = a
    };
    this.getUpdateUacTime = function () {
        return n
    };
    this.init = function (k) {
        f = {};
        h = 0;
        b.profile("Dock Create");
        o = k.dragController;
        g = c.node("div", {
            id: "dockContainer",
            "class": "dock_container"
        });
        g.innerHTML = '            <div class="dock_middle">                <div id="dockItemList" class="dock_item_list"></div>                <div id="dockToolList" class="dock_tool_list">                    <div class="dock_tool_item">                        <a href="###" class="dock_tool_icon dock_tool_pinyin" cmd="Pinyin" title="QQ\u4e91\u8f93\u5165\u6cd5"></a>                        <a href="###" class="dock_tool_icon dock_tool_sound" cmd="Sound" title="\u9759\u97f3"></a>                    </div>                    <div class="dock_tool_item">                        <a href="###" class="dock_tool_icon dock_tool_setting" cmd="Setting" title="\u7cfb\u7edf\u8bbe\u7f6e"></a>                        <a href="###" class="dock_tool_icon dock_tool_theme" cmd="Theme" title="\u4e3b\u9898\u8bbe\u7f6e"></a>                    </div>                    <div class="dock_tool_item2">                        <a href="###" class="dock_tool_icon dock_tool_start" title="\u70b9\u51fb\u8fd9\u91cc\u5f00\u59cb"></a>                    </div>                </div>            </div>        ';
        k = alloy.layout.getDesktop().body;
        k.appendChild(g);
        u = c.id("dockItemList");
        p = c.id("dockToolList");
        a.pinyin = c.mini(".dock_tool_pinyin", p)[0];
        a.sound = c.mini(".dock_tool_sound", p)[0];
        a.setting = c.mini(".dock_tool_setting", p)[0];
        a.theme = c.mini(".dock_tool_theme", p)[0];
        a.start = c.mini(".dock_tool_start", p)[0];
        e.on(p, "click", r.onToolListClick);
        e.on(a.start, "click", r.stopPropagation);
        e.on(a.start, "click", r.onStartClick);
        c.setStyle(g, "zIndex", alloy.layout.getTopZIndex());
        d.setDockLocation("left");
        e.on(g, "contextmenu", r.onDockContextMenu);
        u.setAttribute("customAcceptDrop", 1);
        e.addObserver(u, "dragmove", r.onQuickListContainerDragMove);
        e.addObserver(u, "drop", r.onQuickListContainerDrop);
        o.addDropTarget({
            el: u,
            level: 1
        });
        j = {
            top: c.node("div", {
                "class": "dock_drap_effect dock_drap_effect_top"
            }),
            left: c.node("div", {
                "class": "dock_drap_effect dock_drap_effect_left"
            }),
            right: c.node("div", {
                "class": "dock_drap_effect dock_drap_effect_right"
            })
        };
        k.appendChild(j.top);
        k.appendChild(j.left);
        k.appendChild(j.right);
        l = c.node("div", {
            "class": "dock_drap_proxy"
        });
        k.appendChild(l);
        q = c.node("div", {
            "class": "dock_drap_mask"
        });
        q.innerHTML = '<div class="dock_drop_region_top" name="top" cmd="region"></div><div class="dock_drop_region_left" name="left" cmd="region"></div><div class="dock_drop_region_right" name="right" cmd="region"></div>';
        k.appendChild(q);
        k = new b.ui.Drag(g, l);
        e.addObserver(k, "start", r.onDockDragStart);
        e.addObserver(k, "move", r.onDockDragMove);
        e.addObserver(k, "end", r.onDockDragEnd);
        e.addObserver(alloy.rpcService, "SendGetNewAppCountSuccess", r.onGetNewAppCountSuccess);
        e.addObserver(qqweb.portal, "AlloyJsReady", r.onAlloyJsReady);
        e.addObserver(alloy.portal, "portalReady", r.onPortalReady);
        e.addObserver(alloy.storage, "StorageSpaceChanged", r.onStorageSpaceChanged);
        b.profile("Dock CreateFinish");
        e.addObserver(alloy.fileSystem, "FileMove", r.onFileMove);
        e.addObserver(alloy.fileSystem, "FileAdd", r.onFileAdd);
        e.addObserver(alloy.fileSystem, "FileDelete", r.onFileDelete);
        e.addObserver(alloy.appconfig, "ClearDefaultApp", r.onClearDefaultApp);
        e.addObserver(alloy.appconfig, "GetAppConfigComplete", r.onGetAppConfigComplete);
        e.addObserver(alloy.appconfig, "GetDefaultAppConfigComplete", r.onGetAppConfigComplete);
        e.addObserver(alloy.appconfig, "GetAppConfigError", r.onGetAppConfigError);
        e.addObserver(alloy.portal, "UACReady", r.onUACReady);
        e.addObserver(alloy.portal, "DesktopSwitchStatus", r.onDesktopSwitchStatus)
    }
});