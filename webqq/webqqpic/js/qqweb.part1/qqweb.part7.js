Jx().$package("alloy.config", function (b) {
    var d = this,
        c = b.event,
        e = b.dom,
        c = b.event,
        g = b.string,
        j = !1,
        l, q, u, p = {},
        v = [],
        x = {
            50: 5,
            6: 5
        },
        m = {
            18: 2,
            20: 2
        },
        o = [50, 2, 17, 16, 6, 48, 49, 26, 3401, 2527, 3693, 10, 13, 8992, 3402, 2534, 4, 64, 18, 20, 2528, 45, 2526, 56, 15, 3148, 21, 7, 5, 2250, 2535, 4494, 3070, 3988, 8058, 3147],
        h = [{
            id: 0,
            t: "dir",
            n: "\u684c\u97621",
            items: [{
                t: "app",
                id: 48
            }, {
                t: "app",
                id: 49
            }, {
                t: "app",
                id: 26
            }, {
                t: "dir",
                id: 1E3,
                pid: 0,
                n: "\u6e38\u620f",
                items: [{
                    t: "app",
                    id: 4494
                }, {
                    t: "app",
                    id: 3070
                }]
            }]
        }, {
            id: 1,
            t: "dir",
            n: "\u684c\u97622",
            items: [{
                t: "app",
                id: 3401
            }, {
                t: "app",
                id: 2527
            }, {
                t: "app",
                id: 3693
            }, {
                t: "app",
                id: 10
            }, {
                t: "app",
                id: 13
            }]
        }, {
            id: 2,
            t: "dir",
            n: "\u684c\u97623",
            items: [{
                t: "app",
                id: 8992
            }, {
                t: "app",
                id: 3402
            }, {
                t: "app",
                id: 2534
            }, {
                t: "app",
                id: 4
            }, {
                t: "app",
                id: 6
            }, {
                t: "app",
                id: 64
            }, {
                t: "app",
                id: 18
            }, {
                t: "app",
                id: 20
            }, {
                t: "dir",
                id: 1001,
                pid: 2,
                n: "\u5a31\u4e50",
                items: [{
                    t: "app",
                    id: 3988
                }, {
                    t: "app",
                    id: 8058
                }, {
                    t: "app",
                    id: 3147
                }]
            }]
        }, {
            id: 3,
            t: "dir",
            n: "\u684c\u97624",
            items: [{
                t: "app",
                id: 2528
            }, {
                t: "app",
                id: 45
            }, {
                t: "app",
                id: 2526
            }, {
                t: "app",
                id: 56
            }, {
                t: "app",
                id: 15
            }, {
                t: "app",
                id: 3148
            }]
        }, {
            id: 4,
            t: "dir",
            n: "\u684c\u97625",
            items: [{
                t: "app",
                id: 21
            }, {
                t: "app",
                id: 7
            }, {
                t: "app",
                id: 5
            }, {
                t: "app",
                id: 2250
            }, {
                t: "app",
                id: 2535
            }]
        }, {
            id: 5,
            t: "dir",
            n: "dock",
            items: [{
                t: "app",
                id: 50
            }, {
                t: "app",
                id: 16
            }, {
                t: "app",
                id: 17
            }, {
                t: "app",
                id: 2
            }]
        }];
    b.platform.iPad && (m = {
        18: 2,
        20: 2
    }, o = [50, 2, 17, 16, 6, 3141, 3575, 3694, 3401, 2527, 3693, 10, 8992, 18, 20, 2528, 45, 56, 15, 21, 7, 2250, 3988, 8058], h = [{
        id: 0,
        t: "dir",
        n: "\u684c\u97621",
        items: [{
            t: "app",
            id: 3575
        }, {
            t: "dir",
            id: 1E3,
            pid: 0,
            n: "\u751f\u6d3b",
            items: [{
                t: "app",
                id: 3141
            }, {
                t: "app",
                id: 3694
            }]
        }]
    }, {
        id: 1,
        t: "dir",
        n: "\u684c\u97622",
        items: [{
            t: "app",
            id: 3401
        }, {
            t: "app",
            id: 2527
        }, {
            t: "app",
            id: 3693
        }, {
            t: "app",
            id: 10
        }]
    }, {
        id: 2,
        t: "dir",
        n: "\u684c\u97623",
        items: [{
            t: "app",
            id: 8992
        }, {
            t: "app",
            id: 18
        }, {
            t: "app",
            id: 20
        }, {
            t: "app",
            id: 6
        }, {
            t: "dir",
            id: 1001,
            pid: 2,
            n: "\u5a31\u4e50",
            items: [{
                t: "app",
                id: 3988
            }, {
                t: "app",
                id: 8058
            }]
        }]
    }, {
        id: 3,
        t: "dir",
        n: "\u684c\u97624",
        items: [{
            t: "app",
            id: 2528
        }, {
            t: "app",
            id: 45
        }, {
            t: "app",
            id: 56
        }, {
            t: "app",
            id: 15
        }]
    }, {
        id: 4,
        t: "dir",
        n: "\u684c\u97625",
        items: [{
            t: "app",
            id: 21
        }, {
            t: "app",
            id: 7
        }, {
            t: "app",
            id: 2250
        }]
    }, {
        id: 5,
        t: "dir",
        n: "dock",
        items: [{
            t: "app",
            id: 50
        }, {
            t: "app",
            id: 16
        }, {
            t: "app",
            id: 17
        }, {
            t: "app",
            id: 2
        }]
    }]);
    window.webTop && (o = [50, 2, 17, 16, 6, 48, 49, 26, 3401, 3693, 10, 13, 8992, 3402, 2534, 64, 18, 20, 2528, 45, 2526, 56, 15, 3148, 21, 7, 5, 2250, 2535, 4494, 3070, 3988, 8058, 3147], h = [{
        id: 0,
        t: "dir",
        n: "\u684c\u97621",
        items: [{
            t: "app",
            id: 48
        }, {
            t: "app",
            id: 49
        }, {
            t: "app",
            id: 26
        }, {
            t: "dir",
            id: 1E3,
            pid: 0,
            n: "\u6e38\u620f",
            items: [{
                t: "app",
                id: 4494
            }, {
                t: "app",
                id: 3070
            }]
        }]
    }, {
        id: 1,
        t: "dir",
        n: "\u684c\u97622",
        items: [{
            t: "app",
            id: 3401
        }, {
            t: "app",
            id: 3693
        }, {
            t: "app",
            id: 10
        }, {
            t: "app",
            id: 13
        }]
    }, {
        id: 2,
        t: "dir",
        n: "\u684c\u97623",
        items: [{
            t: "app",
            id: 8992
        }, {
            t: "app",
            id: 3402
        }, {
            t: "app",
            id: 2534
        }, {
            t: "app",
            id: 6
        }, {
            t: "app",
            id: 64
        }, {
            t: "app",
            id: 18
        }, {
            t: "app",
            id: 20
        }, {
            t: "dir",
            id: 1001,
            pid: 2,
            n: "\u5a31\u4e50",
            items: [{
                t: "app",
                id: 3988
            }, {
                t: "app",
                id: 8058
            }, {
                t: "app",
                id: 3147
            }]
        }]
    }, {
        id: 3,
        t: "dir",
        n: "\u684c\u97624",
        items: [{
            t: "app",
            id: 2528
        }, {
            t: "app",
            id: 45
        }, {
            t: "app",
            id: 2526
        }, {
            t: "app",
            id: 56
        }, {
            t: "app",
            id: 15
        }, {
            t: "app",
            id: 3148
        }]
    }, {
        id: 4,
        t: "dir",
        n: "\u684c\u97625",
        items: [{
            t: "app",
            id: 21
        }, {
            t: "app",
            id: 7
        }, {
            t: "app",
            id: 5
        }, {
            t: "app",
            id: 2250
        }, {
            t: "app",
            id: 2535
        }]
    }, {
        id: 5,
        t: "dir",
        n: "dock",
        items: [{
            t: "app",
            id: 50
        }, {
            t: "app",
            id: 16
        }, {
            t: "app",
            id: 17
        }, {
            t: "app",
            id: 2
        }]
    }]);
    l = {
        id: "theme_blue_glow"
    };
    window.webTop && (l = {
        id: "theme_blue_glow"
    });
    q = {
        id: "",
        mode: "repeat",
        url: ""
    };
    u = {};
    var a = ["app_id", "app_lang", "app_nonce", "app_openid", "app_openkey", "app_ts", "sig"];
    this.configList = {
        theme: b.clone(l),
        wallpaper: b.clone(q),
        wallpaperList: [].concat(),
        appearance: b.clone(u),
        dockLoca: "left",
        navTop: 1,
        defaultScreen: 3,
        desktopList: h.concat(),
        hasRecentFolder: !1,
        defaultSetupAppList: o,
        setupAppList: o.concat()
    };
    this.onSetConfig = function () {};
    this.onEQQConfigGetSuc = function (a) {
        b.profile("getEQQCustomSuccess start!");
        this.uacResult = a = a.result ? a.result : [];
        for (var c in a) {
            var d = a;
            if (d.chatboxMode) this.configList.chatboxMode = "free";
            if (d.isNotNeedCtrlKey) this.configList.isNotNeedCtrlKey = d.isNotNeedCtrlKey;
            if (d.fontFormat) this.configList.fontFormat = d.fontFormat
        }
    };
    this.onConfigGetSuc = function (a) {
        b.profile("getCustomSuccess start!");
        alloy.portal.speedTest.sRTS(4, "end", new Date, !0);
        var f = a.result ? a.result : [];
        this.uacResult = f;
        var e = 0;
        a.retcode == 20554 ? j = d.isNewUser = !0 : d.isNewUser = !1;
        for (var h in f) {
            if (h == "0") {
                a = f["0"];
                if (a.theme && a.theme != "") this.configList.theme.id = a.theme;
                if (a.wallpaper && a.wallpaper != "" && a.wallpaper.id != "") this.configList.wallpaper = a.wallpaper;
                if (a.wallpaperList && a.wallpaperList != "") this.configList.wallpaperList = a.wallpaperList;
                if (a.appearance && a.appearance != "") this.configList.appearance.id = a.appearance;
                this.configList.runStatus = a.runWidgets ? a.runWidgets : "";
                if (a.dockLoca) this.configList.dockLoca = a.dockLoca;
                if (a.navTop !== null) this.configList.navTop = a.navTop;
                if (a.defaultScreen) this.configList.defaultScreen = a.defaultScreen;
                if (a.isShowTip) this.configList.isShowTip = a.isShowTip;
                if (a.notifySetting) this.configList.notifySetting = a.notifySetting;
                if (a.msgBubblePos) this.configList.msgBubblePos = a.msgBubblePos;
                if (a.isNoContactNotify) this.configList.isNoContactNotify = a.isNoContactNotify;
                if (a.hasRecentFolder) this.configList.hasRecentFolder = a.hasRecentFolder;
                if (a.desktopIconStyle) this.configList.desktopIconStyle = a.desktopIconStyle;
                if (a.setupAppList) {
                    var g = a.setupAppList;
                    if (b.isArray(g)) this.configList.setupAppList = g.length == 0 ? [] : g;
                    else {
                        if (b.isObject(g)) {
                            var k = [],
                                n;
                            for (e in g)(n = parseInt(g[e])) && k.push(n);
                            this.configList.setupAppList = k
                        } else this.configList.setupAppList = [];
                        j = !0;
                        C();
                        alloy.util.report2m(151400)
                    }
                    j = !0
                } else j = !0, C();
                if (a.diskList) this.configList.diskList = a.diskList;
                if (a.defaultDisk) this.configList.defaultDisk = a.defaultDisk;
                b.out("isSetupAppListLoaded: " + j)
            }
            if (h == "50") {
                a = f["50"];
                if (a.chatboxMode) this.configList.chatboxMode = "free";
                if (a.isNotNeedCtrlKey) this.configList.isNotNeedCtrlKey = a.isNotNeedCtrlKey;
                if (a.fontFormat) this.configList.fontFormat = a.fontFormat;
                this.configList.useBigHead = a.useBigHead != null ? a.useBigHead : 7
            }
        }
        c.notifyObservers(alloy.portal, "SimpleUACReady", {
            uacLoaded: 0
        });
        b.profile("getUACCustomSuccess finish!");
        qqweb.util.report2h("get_custom", "end", "ok")
    };
    var f = function () {
            w()
        },
        n = function () {
            j = !1
        },
        s = 1,
        w = function () {
            for (var a = d.getSetupAppList(), f = {
                0: ["notifications"]
            }, e = 0; e < a.length; e++) f[a[e]] = ["notifications"];
            qqweb.rpcService.sendGetConfig({
                action: "mget",
                context: this,
                data: {
                    r: {
                        appid: f
                    }
                },
                onSuccess: function (a) {
                    s = 2;
                    if (a.retcode == 0 || a.retcode == 20554) {
                        if (a.retcode == 20554) {
                            a.result = {};
                            for (var f = d.getSetupAppList(), e = 0; e < f.length; e++) a.result[f[e]] = {
                                notifications: null
                            }
                        }
                        d.myAppConfigList = d.myAppConfigList || {};
                        a.result[0] && b.isNumber(a.result[0].notifications) ? d.setGlobalNotifications(a.result[0].notifications) : d.setGlobalNotifications(alloy.notifier && alloy.notifier.ENABLE_FLAGS.ENABLE_ALL);
                        for (var h in a.result) h != 0 && (b.isNumber(a.result[h].notifications) ? d.setNotifications(h, a.result[0].notifications) : d.setNotifications(h, null));
                        s = 0
                    }
                    c.notifyObservers(alloy.system, "notifySettingReady")
                }
            })
        };
    this.getGlobalNotifications = function () {
        return s == 0 ? d.myAppConfigList[0].notifications : 0
    };
    this.setGlobalNotifications = function (a) {
        0 in d.myAppConfigList || (d.myAppConfigList[0] = {});
        d.myAppConfigList[0].notifications = a
    };
    this.getMergedNotifications = function (a) {
        if (s != 0) return 0;
        a = d.getNotifications(a);
        if (a === null) a = alloy.notifier.ENABLE_FLAGS.ENABLE_ALL;
        return a & d.getGlobalNotifications()
    };
    this.getNotifications = function (a) {
        return (a = d.myAppConfigList[a]) ? a.notifications : null
    };
    this.setNotifications = function (a, c) {
        b.isNumber(c) || (c = null);
        a in d.myAppConfigList || (d.myAppConfigList[a] = {});
        d.myAppConfigList[a].notifications = c
    };
    this.getNotificationsStatus = function () {
        return s
    };
    var C = d.sendSetSetupAppList = function () {
            if (alloy.portal.getLoginLevel() != 1 && j) {
                var a = {
                    onSuccess: function () {},
                    context: d,
                    data: {
                        retype: 1,
                        r: {
                            appid: 0,
                            value: {
                                setupAppList: d.getSetupAppList()
                            }
                        }
                    }
                };
                alloy.rpcService.sendSetConfig(a)
            }
        };
    this.getDesktopList = function () {
        return this.configList.desktopList
    };
    this.setDesktopList = function (a) {
        this.configList.desktopList = a
    };
    this.getDefaultDesktopList = function () {
        return h
    };
    this.getMustInstallAppList = function () {
        return x
    };
    this.setAppListQueue = function (a) {
        var b = [],
            c;
        for (c in a) b.push(parseInt(a[c]));
        this.configList.setupAppList = b;
        C()
    };
    this.isInSetupAppList = function (a) {
        return b.array.indexOf(this.getSetupAppList(), a) == -1 ? !1 : !0
    };
    this.sendGetAppInfo = function (a, c) {
        var f = function (a) {
                p[a] || (p[a] = 0);
                return ++p[a] > 1
            };
        a.vfwebqq = alloy.portal.getVfWebQQ();
        alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL + "keycgi/qqweb/market/getappinfo.do", {
            context: d,
            method: "POST",
            data: {
                appattrib: b.json.stringify(a),
                vfwebqq: alloy.portal.getVfWebQQ()
            },
            arguments: a,
            onSuccess: function (d) {
                d.retcode === 0 ? (d = d.result.resultData, d.folderId = alloy.desktopManager.getCurrentDesktopIndex(), c(d)) : (f("appInfo") || setTimeout(function () {
                    sendGetAppInfo(a)
                }, 3E3), b.out("\u5e94\u7528\u4ecb\u7ecd\u62c9\u53d6\u5931\u8d25" + d.errmsg))
            },
            onError: function () {
                f("appInfo") || setTimeout(function () {
                    sendGetAppInfo(a)
                }, 3E3);
                b.out("\u5e94\u7528\u62c9\u53d6\u5931\u8d25")
            }
        })
    };
    this.addSetupApp = function (a) {
        d.sendGetAppInfo({
            appid: a,
            loadMethod: 0
        }, d.add2SetupAppList)
    };
    this.add2SetupAppList = function (a) {
        if (a.flag == 4 && alloy.portal.getPortalSelf("vipInfo") <= 0) return alloy.layout.confirm('                <div style="margin-top:25px;margin-left:50px;">                <img style="float:left;" src="' + qqweb.CONST.CDN_URL_0 + 'style/images/yellow_warning.png" alt="\u60a8\u8fd8\u672a\u5f00\u901a\u4f1a\u5458"/>                <div style="width:180px;height:60px; font-size:14px;float:left;margin-left:5px;">\u5bf9\u4e0d\u8d77\uff01\u60a8\u8fd8\u4e0d\u662fQQ\u4f1a\u5458\uff0c\u4e0d\u80fd\u4f18\u5148\u4f53\u9a8c\u4f1a\u5458\u4e13\u5c5e\u5e94\u7528</div >                </div>                ', function () {
            window.open("http://pay.qq.com/qqvip/index.shtml?aid=vip.client.webqq.addapp.kaitong")
        }, {
            okButtonDecorator: {
                background: "url(" + qqweb.CONST.CDN_URL_0 + "style/images/vip_open_button.png) -1px",
                width: "83px",
                textIndent: "-999px"
            },
            height: 180,
            autoClose: !0
        }), !1;
        if (d.getSetupAppList().length >= 200) return qqweb.layout.alert("\u5e94\u7528\u6dfb\u52a0\u91cf\u6700\u591a\u4e3a200\u4e2a,\u8bf7\u5220\u51cf\u90e8\u5206\u5e94\u7528\u540e\u518d\u6dfb\u52a0\u3002"), !1;
        else if (!d.isInSetupAppList(a.id) && !e.id("appAlert_category_select_" + a.id)) return b.profile("add2SetupAppList"), qqweb.appconfig.addAppConfig(a), d.getSetupAppList().unshift(a.id), C(), c.notifyObservers(d, "AddSetupAppList", a), a.id < 1E5 && alloy.util.report2app("appbar|menu|addapp|" + a.id), !0
    };
    this.setDeleteAppList = function (a) {
        v.push(a)
    };
    this.getDeleteAppList = function () {
        return v
    };
    this.removeSetupAppList = function (a, f, e) {
        b.profile("removeSetupAppList");
        if (a.cannotUninstall) return alloy.layout.alert("\u62b1\u6b49\uff0c\u6b64\u5e94\u7528\u3010" + a.appName + "\u3011\u4e0d\u80fd\u5220\u9664\uff01"), !1;
        alloy.appconfig.removeAppConfig(a);
        this.removeFromRunStatusList(a.id, !0);
        b.array.remove(this.getSetupAppList(), parseInt(a.id));
        f !== !1 && (C(), a.id < 1E5 && alloy.util.report2app("appbar|menu|delapp|" + a.id));
        e || c.notifyObservers(d, "RemoveSetupAppList", a)
    };
    this.getSetupAppList = function () {
        return this.configList.setupAppList
    };
    this.getDefaultSetupAppList = function () {
        return this.configList.defaultSetupAppList
    };
    this.isSetupAppListLoaded = function () {
        return j
    };
    this.offlineSetupAppList = function () {
        j = !1;
        this.configList.setupAppList = o.concat()
    };
    this.removeFromRunStatusList = function (a, c) {
        if (this.configList.runStatus) {
            var f = this.configList.runStatus,
                e = !1;
            b.isArray(a) || (a = [a]);
            for (var h in f) {
                var g = Number(h);
                b.array.indexOf(this.getSetupAppList(), g) == -1 && (f[h] = null, delete f[h], e = !0)
            }
            for (var n in a) h = a[n], f[h] && (f[h] = null, delete f[h], e = !0);
            e && !c && (f = {
                data: {
                    retype: 1,
                    r: {
                        appid: 0,
                        value: {
                            runWidgets: d.getRunStatus()
                        }
                    }
                }
            }, alloy.rpcService.sendSetConfig(f))
        }
    };
    this.restoreConfig = function (a) {
        var b = !1,
            f = {};
        if (a.appConfig) b = !0, f.setupAppList = o, c.notifyObservers(d, "RestoreAppList");
        if (a.theme) b = !0, f.theme = l.id, f.wallpaper = q, f.appearance = u;
        if (a.desktopSetting) b = !0, f.dockLoca = "left", f.navTop = 1, f.defaultScreen = 3;
        b && alloy.rpcService.sendSetConfig({
            data: {
                retype: 1,
                r: {
                    appid: 0,
                    value: f
                }
            }
        })
    };
    this.getTheme = function () {
        return this.configList.theme
    };
    this.setTheme = function (a) {
        b.profile("setTheme");
        if (!(alloy.portal.getLoginLevel() < 2) && a) {
            var c = {};
            c.data = {
                retype: 1,
                r: {
                    appid: 0,
                    value: {
                        theme: a
                    }
                }
            };
            alloy.rpcService.sendSetConfig(c);
            this.configList.theme.id = a
        }
    };
    this.getWallpaper = function () {
        return this.configList.wallpaper
    };
    this.setWallpaper = function (a) {
        b.profile("setWallpaper");
        if (!(alloy.portal.getLoginLevel() < 2) && a) {
            var c = {};
            c.data = {
                retype: 1,
                r: {
                    appid: 0,
                    value: {
                        wallpaper: a
                    }
                }
            };
            alloy.rpcService.sendSetConfig(c);
            this.configList.wallpaper = a
        }
    };
    this.getWallpaperList = function () {
        return this.configList.wallpaperList
    };
    this.getRunStatus = function () {
        return this.configList.runStatus
    };
    this.getDefaultRunWidget = function () {
        return m
    };
    this.addWallpaper = function (a) {
        b.array.indexOf(this.configList.wallpaperList, a.id) == -1 && this.configList.wallpaperList.push(a.fileId)
    };
    this.removeWallpaper = function (a) {
        b.array.remove(this.getWallpaperList(), a.fileId)
    };
    this.getAppearance = function () {
        return this.configList.appearance
    };
    this.setAppearance = function (a) {
        b.profile("setAppearance");
        if (!(alloy.portal.getLoginLevel() < 2) && a) {
            var c = {};
            c.data = {
                retype: 1,
                r: {
                    appid: 0,
                    value: {
                        appearance: a
                    }
                }
            };
            alloy.rpcService.sendSetConfig(c);
            this.configList.appearance.id = a
        }
    };
    this.setCustomTheme = function (a) {
        b.profile("setCustomTheme");
        if (!(alloy.portal.getLoginLevel() < 2) && a.wallpaper) {
            var c = a.skin,
                d = a.wallpaper,
                a = {};
            a.data = {
                retype: 1,
                r: {
                    appid: 0,
                    value: {
                        appearance: c,
                        wallpaper: d
                    }
                }
            };
            alloy.rpcService.sendSetConfig(a);
            this.configList.appearance.id = c;
            this.configList.wallpaper = d
        }
    };
    this.isDeveloper = function () {
        return !!qqweb.config.uacResult["0"].isDeveloper
    };
    this.setThemeAndCustomTheme = function (a, b, c) {
        if (!(alloy.portal.getLoginLevel() < 2)) {
            c = c || "";
            this.configList.appearance.id = c;
            this.configList.wallpaper = b;
            this.configList.theme.id = a;
            var d = {};
            if (a) d.theme = a;
            if (b) d.appearance = c, d.wallpaper = b;
            a = {};
            a.data = {
                retype: 1,
                r: {
                    appid: 0,
                    value: d
                }
            };
            alloy.rpcService.sendSetConfig(a)
        }
    };
    this.getDiskList = function () {
        return this.configList.diskList
    };
    this.getDefaultDisk = function () {
        return this.configList.defaultDisk
    };
    this.init = function () {
        alloy.util.report2h("get_custom", "start");
        c.addObserver(alloy.system, "UACReady", f);
        c.addObserver(alloy.appconfig, "GetAppConfigError", n);
        var a = {
            appid: {
                0: ["theme", "wallpaper", "wallpaperList", "appearance", "setupAppList", "isShowTip", "runWidgets", "msgBubblePos", "notifySetting", "isDeveloper", "dockLoca", "defaultScreen", "navTop", "hasRecentFolder", "defaultDisk", "diskList", "desktopIconStyle"],
                50: ["chatboxMode", "isNotNeedCtrlKey", "fontFormat", "useBigHead"]
            }
        };
        b.profile("getCustom");
        typeof progress == "function" && progress("get_uac start");
        var e = 0,
            h = function () {
                g.data.r = a;
                qqweb.rpcService.sendGetConfig(g);
                e++
            },
            g = {
                onSuccess: qqweb.config.onConfigGetSuc,
                action: "mget",
                context: this,
                onError: function () {
                    typeof progress == "function" && progress("get_uac error", 0);
                    alloy.util.report2qqweb("config|uac|error");
                    e == 0 ? h() : timeoutConfirm("\u81ea\u5b9a\u4e49\u4fe1\u606f\u83b7\u53d6\u51fa\u9519,\u662f\u5426\u5237\u65b0\u91cd\u8bd5\uff1f\n\u70b9\u53d6\u6d88\u4f7f\u7528\u9ed8\u8ba4\u914d\u7f6e\u3002") || c.notifyObservers(alloy.portal, "SimpleUACReady", {
                        uacLoaded: 1
                    })
                },
                onTimeout: function () {
                    alloy.util.report2qqweb("config|uac|timeout");
                    typeof progress == "function" && progress("get_uac timeout", 0);
                    e == 0 ? h() : timeoutConfirm("\u81ea\u5b9a\u4e49\u4fe1\u606f\u83b7\u53d6\u8d85\u65f6,\u662f\u5426\u5237\u65b0\u91cd\u8bd5\uff1f\n\u70b9\u53d6\u6d88\u4f7f\u7528\u9ed8\u8ba4\u914d\u7f6e\u3002") || c.notifyObservers(alloy.portal, "SimpleUACReady", {
                        uacLoaded: 2
                    })
                },
                data: {
                    r: a
                }
            };
        c.notifyObservers(d, "BeforeGetUAC");
        qqweb.rpcService.sendGetConfig(g)
    };
    d.__eqqid = 50;
    this.sendsetAppNotify = function (a, c) {
        b.profile("sendsetAppNotify");
        alloy.portal.getLoginLevel() != 1 && j && alloy.rpcService.sendSetConfig({
            onSuccess: function () {},
            context: d,
            data: {
                retype: 1,
                r: {
                    appid: a,
                    value: {
                        notifications: c
                    }
                }
            }
        })
    };
    this.requestGrant = function (f) {
        var e = !0;
        alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL + "cgi/qqweb/app/loadappnew.do", {
            context: d,
            data: {
                r: b.json.stringify({
                    appid: f.gaid ? 0 : f.appId,
                    id: f.gaid,
                    loginParam: f.loginParam || ""
                })
            },
            method: "POST",
            arguments: f,
            onSuccess: function (d) {
                if (0 !== d.retcode) b.isFunction(f.onSuccess) && f.onSuccess({
                    auth: !1
                });
                else {
                    e = !1;
                    var h = d.result,
                        d = d.arguments,
                        n = alloy.portal.getAllConfig(d.appId);
                    n.exinfo.isAuth = 1;
                    var k = g.parseURL(n.appUrl);
                    if (null !== k) {
                        var o = {};
                        k.query && (o = g.mapQuery("?" + k.query));
                        for (var s = 0, w = a.length; s < w; s++) {
                            var m = a[s];
                            m in h && (o[m] = h[m])
                        }
                        k.query = g.toQueryString(o);
                        n.selfConfig.appUrl = g.buildURL(k)
                    }
                    alloy.portal.cacheOpenkey({
                        appId: d.appId,
                        gaid: h.app_id,
                        openId: h.app_openid,
                        openKey: h.app_openkey
                    });
                    (f.authType || 0) != 1 && alloy.portal.runApp(n.id);
                    var d = ["app_id", "app_nonce", "app_lang", "app_userip", "app_ts", "sig"],
                        j;
                    for (j in d) b.isUndefined(h[d[j]]);
                    b.isFunction(f.onSuccess) && f.onSuccess({
                        auth: !0,
                        param: h
                    });
                    j = alloy.system.getApp(f.appId);
                    c.notifyObservers(j, "openId", {
                        openId: h.app_openid
                    })
                }
            },
            onComplete: function () {
                e && alloy.layout.alert("\u6388\u6743\u4fe1\u606f\u67e5\u8be2\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5\uff01");
                e = null
            }
        })
    };
    this.renewalGrant = function (a) {
        var b = alloy.portal.getAllConfig(a.appId);
        alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL + "api/system/redoauth", {
            context: d,
            data: {
                appid: b.gaid,
                gaid: b.gaid,
                app_openkey: a.openKey,
                app_openid: a.openId
            },
            method: "GET",
            arguments: a,
            onSuccess: function (a) {
                0 === a.retcode && alloy.portal.cacheOpenkey({
                    renewal: !0,
                    appId: a.arguments.appId
                })
            }
        })
    };
    this.reRequestGrant = function (a) {
        alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL + "cgi/qqweb/app/loadappnew.do", {
            context: d,
            data: {
                r: b.json.stringify(appid > 2E8 ? {
                    appid: 0,
                    id: a.appId
                } : {
                    appid: a.appId
                })
            },
            method: "POST",
            arguments: a,
            onSuccess: function (a) {
                var c = a.result,
                    d = a.arguments;
                0 === a.retcode && alloy.portal.cacheOpenkey({
                    appId: d.appId,
                    gaid: c.app_id,
                    openId: c.app_openid,
                    openKey: c.app_openkey
                });
                b.isFunction(d.onSuccess) && d.onSuccess(a)
            }
        })
    };
    this.setPortalConfig = function (a, b) {
        alloy.config.configList[a] = b;
        var c = {
            retype: 1,
            r: {
                appid: 0
            }
        };
        c.r.value = {};
        c.r.value[a] = b;
        alloy.rpcService.sendSetConfig({
            onSuccess: function () {},
            context: d,
            data: c
        })
    }
});