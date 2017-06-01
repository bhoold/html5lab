Jx().$package("alloy.portal", function (b) {
    var d = this,
        c = b.dom,
        e = b.event,
        g = b.http,
        j, l = !1,
        q, u = alloy.CONST.LOGIN_LEVEL_NONE,
        p = 0,
        v, x = 1,
        m, o, h = !1,
        a = !1,
        f = 0,
        n = 0,
        s, w = !1,
        C = "",
        y, z, F = "",
        H = "",
        r = null,
        k = 0,
        A = !1,
        D, E, I, K, N = !1,
        M, J, Q = [],
        R = [],
        G = 0,
        W = "socket",
        P, B = 0,
        L = {},
        V, T = null,
        S = !0;
    alloy.system = d;
    d.speedTest = alloy.util.speedTest;
    d.isWebTop = function () {
        return window.webTop ? !0 : !1
    };
    d.isWebTopAir = function () {
        return /AIR/.test(webTop.type) ? !0 : !1
    };
    d.isWebTopQT = function () {
        return /QT\//.test(webTop.type) ? !0 : !1
    };
    d.isWebTopWin = function () {
        return /WIN/.test(webTop.type) ? !0 : !1
    };
    this.setPortalSelf = function (a) {
        d.self = d.self || {};
        d.self.uin = a.uin || d.getUin();
        d.self.allow = a.allow;
        d.self.age = a.age;
        d.self.nick = a.nick;
        d.self.vip = a.vip_info;
        d.self.vipRoam = null;
        d.self.htmlNick = b.string.encodeHtml(String(a.nick));
        d.self.titleNick = String(a.nick);
        d.self.country = a.country;
        d.self.province = a.province;
        d.self.city = a.city;
        d.self.gender = a.gender;
        d.self.face = a.face;
        d.self.phone = a.phone;
        d.self.mobile = a.mobile;
        d.self.email = a.email;
        d.self.uiuin = a.uiuin || a.uin
    };
    this.setPortalSelfItem = function (a, b) {
        d.self[a] = b
    };
    this.getPortalSelf = function (a) {
        return typeof d.self == "undefined" ? {} : typeof a == "undefined" ? d.self : d.self[a]
    };
    this.isNewUser = function () {
        return w
    };
    this.setIsNewUser = function (a) {
        w = a
    };
    var U = function () {
            b.profile("runCoreApps Start!", "portal!");
            alloy.notifier.init();
            d.runApp("tips", {
                callback: function () {
                    b.profile("runCoreApps Finish!", "portal!")
                }
            })
        },
        Z = function () {
            var a = d.getLoginLevel(),
                b;
            a == 1 ? b = "panel" : a == 2 ? b = "go" : a == 3 && (b = "logined");
            return b
        };
    this.setReRunAppList = function (a) {
        Q = a
    };
    this.getReRunAppList = function () {
        return Q
    };
    var t = function () {
            b.profile("reRunBeforeLoginApps Start!", "portal!");
            if (Q) {
                for (var a = 0; a < Q.length; ++a) {
                    var c, f;
                    b.isArray(Q[a]) ? (c = Q[a][0], f = Q[a][1], f = d.getUrlOption(c) || f, d.removeUrlOption(c)) : c = Q[a];
                    var e = d.getApp(c);
                    e && !e.isRunning() && (c == alloy.config.__eqqid ? (c = Z(), b.debug("run EQQ in [reRunBeforeLoginApps],level:" + d.getLoginLevel() + ": " + c, "_plogin"), d.runApp(alloy.config.__eqqid, {
                        loginMode: c
                    })) : f ? d.runApp(c, f) : d.runApp(c))
                }
                d.setReRunAppList([])
            }
            b.profile("reRunBeforeLoginApps Finish!", "portal!")
        };
    this.getDefaultRunApps = function () {
        T = T == null ? [] : T;
        return [].concat([], [], T)
    };
    var $ = function () {
            var a = decodeURIComponent(window.location.search);
            if (a.indexOf("appUrl") == -1 && (a = b.string.mapQuery(a).run || "")) return b.json.parse(a)
        },
        aa = function () {
            var a = $();
            if (b.isObject(a)) for (var c in a) alloy.portal.runApp(c, d.getUrlOption(c) || {
                runFrom: "url"
            });
            window.location.search.indexOf("_APPBOX") > -1 && alloy.util.report2qqweb("monitor|signin|fromqqclient");
            window.location.search.indexOf("CLIENT.QQ.PROFILE") > -1 && alloy.util.report2qqweb("monitor|signin|fromqqclientminicard")
        },
        da = function (a) {
            if (b.isObject(a)) for (var c in a) if (b.isObject(a[c]) || b.isArray(a[c])) {
                if (!arguments.callee.call(this, a[c])) return !1
            } else {
                if (!b.isNumber(a[c]) && /(\'|\")/g.test(a[c])) return b.error("urlApp option\u4e2dvalue\u503c\u7684\u5b57\u7b26\u4e32\u4e0d\u80fd\u5305\u542b\u5355\u53cc\u5f15\u53f7\uff01"), !1
            } else if (b.isArray(a)) for (var d = 0; d < a.length; d++) if (b.isObject(a[d]) || b.isArray(a[d])) {
                if (!arguments.callee.call(this, a[d])) return !1
            } else {
                if (!b.isNumber(a[d]) && /(\'|\")/g.test(a[c])) return b.error("urlApp option\u4e2dvalue\u503c\u7684\u5b57\u7b26\u4e32\u4e0d\u80fd\u5305\u542b\u5355\u53cc\u5f15\u53f7\uff01"), !1
            } else return !1;
            return !0
        },
        ea = function () {
            var a = $();
            if (b.isObject(a)) for (var c in a) if (b.isObject(a[c])) da(a[c]) ? (a[c].runFrom = "url", o = {}, ~~c != 0 && !d.getAllConfig(c) && (o.appMarket = {
                page: "introduce",
                option: {
                    appid: c
                },
                runFrom: "url"
            }), o[c] = a[c]) : a[c].runFrom = "url"
        };
    this.getUrlOption = function (a) {
        return o && o[a] || null
    };
    this.removeUrlOption = function (a) {
        o && delete o[a];
        o && !a && (o = null)
    };
    this.getIsAlloyJsReady = function () {
        return v
    };
    var X = function () {
            b.profile("reset start!", "portal!");
            if (v) {
                var a = d.getRunningAppStatus();
                if (a) {
                    N = !0;
                    for (var c = 0; c < a.appList.length; c++) {
                        var f = a.appList[c].appId;~~f && (f = "app" + f);
                        (f = alloy.app[f]) && f.isRunning() && f.exit()
                    }
                    N = !1
                }
            }
            h = !1;
            e.notifyObservers(alloy.portal, "reset", d.getLoginLevel());
            b.profile("reset finish!", "portal!")
        },
        ba = function () {
            M = m = !0;
            b.profile("tryLogin start, tryLoginLevel:" + u, "portal!");
            qqweb.util.report2h("pass_ptlogin", "start");
            typeof progress == "function" && progress("pass_ptlogin");
            if (u > alloy.CONST.LOGIN_LEVEL_NONE) if (alloy.util.report2h("get_vfwebqq", "start"), p = d.getCookieUin(), E) {
                if (d.setUin(p), ca() ? X() : M = !1, u == alloy.CONST.LOGIN_LEVEL_ALL) {
                    d.setLoginLevel(alloy.CONST.LOGIN_LEVEL_ALL);
                    b.debug("run EQQ in [tryLogin],tryLoginLevel:" + u, "_plogin");
                    var a = {
                        directLogin: !0
                    };
                    if (d.getTryLoginState()) a.loginState = d.getTryLoginState();
                    d.runApp(alloy.config.__eqqid, a)
                }
            } else alloy.rpcService.sendGetSeftInfo(p);
            else p = 0, d.setUin(p), fa();
            b.profile("tryLogin finish!", "portal!")
        },
        fa = function () {
            e.notifyObservers(d, "SimpleUACReady", {
                uacLoaded: 3
            })
        },
        ca = function () {
            return d.getUin() === d.getOldUin() ? (b.debug("uin not change: " + d.getUin(), "_plogin"), !1) : (b.debug("uin change: " + d.getOldUin() + " -> " + d.getUin(), "_plogin"), !0)
        },
        Y = function () {
            return x === q ? (b.debug("loginLevel not change: " + x, "_plogin"), !1) : (b.debug("loginLevel change: " + q + " -> " + x, "_plogin"), !0)
        },
        ga = function () {
            l || alloy.portal.recoverCookie()
        };
    this.longPoll = function (a) {
        if (a) a = a.r, G = a.ssid, R = a.al;
        alloy.rpcService.psSend(alloy.CONST.PS_CGI_URL + "kl/poll", {
            context: d,
            method: "GET",
            timeout: 61E3,
            data: {
                ssid: G
            },
            onSuccess: function (a) {
                if (a.c == 0) for (var a = a.r, c = a.ml, f = 0; f < c.length; ++f) b.event.notifyObservers(qqweb.portal, "message", c[f]);
                a.c != 22905 ? d.longPollIn() : B < 3 && (d.longPollLogin(), ++B)
            },
            onError: function () {},
            onTimeout: function () {}
        })
    };
    this.longPollIn = function () {
        alloy.rpcService.psSend(alloy.CONST.PS_CGI_URL + "kl/poll", {
            context: d,
            method: "GET",
            timeout: 61E3,
            data: {
                ssid: G
            },
            onSuccess: function (a) {
                if (a.c == 0) for (var a = a.r, c = a.ml, f = 0; f < c.length; ++f) b.event.notifyObservers(qqweb.portal, "message", c[f]);
                a.c != 22905 ? d.longPollIn() : B < 3 && (d.longPollLogin(), ++B)
            },
            onError: function () {},
            onTimeout: function () {}
        })
    };
    this.longPollLogin = function () {
        alloy.rpcService.psSend(alloy.CONST.PS_CGI_URL + "kl/login", {
            context: d,
            method: "GET",
            timeout: 1E4,
            data: {
                ct: 1,
                sl: 0,
                ua: 1
            },
            onSuccess: function (a) {
                a.c == 0 ? d.longPoll(a) : B < 3 && (d.longPollLogin(), ++B)
            },
            onError: function () {},
            onTimeout: function () {}
        })
    };
    this.initPushService = function () {
        b.browser.plugins.flash ? c.id("socketFlash").innerHTML = '<object style="position:absolute;left:1px;top:1px;" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9.0.45.0" width="1" height="1" id="Socket" align="middle">\t\t\t\t<param name="allowScriptAccess" value="always" />\t\t\t\t<param name="allowFullScreen" value="false" />\t\t\t\t<param name="movie" value="swf/Socket.swf?t=20111011001" /><param name="quality" value="high" /><param name="wmode" value="opaque" /><param name="bgcolor" value="#ffffff" /><embed src="swf/Socket.swf?t=20111011001" quality="high" wmode="opaque" bgcolor="#ffffff" width="1" height="1" name="Socket" align="middle" allowScriptAccess="sameDomain" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/go/getflashplayer_cn" />\t\t\t\t</object>' : (d.longPollLogin(), W = "longPoll")
    };
    var ia = function () {
            b.cookie.remove("ptwebqq", alloy.CONST.MAIN_DOMAIN)
        },
        ha = function () {
            var a = alloy.windowManager.getOnlyWidgetList(),
                b = {},
                c, d;
            for (d in a) c = a[d], b[c.getAppId()] = c.desktopIndex;
            return b
        },
        O = {
            onPortalReady: function (a) {
                typeof progress == "function" && progress("portalReady", 0);
                h = !0;
                k++;
                b.profile("onPortalReady, portalReadyCount:" + k + ", currentLevel:" + a + ", oldLevel:" + q, "portal!");
                if (ca() || k == 1) {
                    a = 0;
                    if (b.browser.ie == 6 || b.browser.ie == 7) a = 500;
                    setTimeout(function () {
                        var a = $();
                        if (b.isObject(a)) ea(), aa();
                        else {
                            ea();
                            b.profile("runAppsInRunStatus Start!", "portal!");
                            d.getLoginLevel() < alloy.CONST.LOGIN_LEVEL_NOCHAT ? a = alloy.config.getDefaultRunWidget() : (alloy.config.removeFromRunStatusList(alloy.config.getDeleteAppList()), a = alloy.config.getRunStatus());
                            if (a) {
                                T = T == null ? [] : T;
                                for (var c in a) T.push(c);
                                var f, e;
                                for (e in a) c = Number(e), f = a[e], d.runApp(c, {
                                    desktopIndex: f
                                });
                                b.profile("runAppsInRunStatus Finish!", "portal!")
                            }
                            if (d.getLoginLevel() < alloy.CONST.LOGIN_LEVEL_NOCHAT) {
                                b.profile("runDefaultApps Start!", "portal!");
                                e = [];
                                a = d.getLoginLevel();
                                for (c = 0; c < e.length; ++c) e[c] == alloy.config.__eqqid ? a != 3 && (f = Z(), b.debug("run EQQ in [runDefaultApps],level:" + a + ": " + f, "_plogin"), d.runApp(alloy.config.__eqqid, {
                                    loginMode: f
                                })) : d.runApp(e[c]);
                                b.profile("runDefaultApps Finish!", "portal!")
                            }
                            t();
                            aa();
                            b.profile("runPopApps Start!", "portal!");
                            e = [];
                            for (a = 0; a < e.length; ++a) switch (e[a]) {
                            default:
                                d.runApp(e[a])
                            }
                            b.profile("runPopApps Finish!", "portal!")
                        }
                        U()
                    }, a)
                }
                if (k == 1) {
                    window.webTop && webTop.ui.channel.postCmd(19);
                    try {
                        typeof pgvMain == "function" && (window.webTop ? pgvMain("", {
                            virtualDomain: "web2.qq.com"
                        }) : pgvMain("", {
                            virtualDomain: alloy.CONST.DEFAULT_DOMAIN
                        })), qqweb.util.report2h("portal", "end", "ok"), qqweb.portal.speedTest.sRTS(8, "end", new Date, !0)
                    } catch (c) {}
                }
                d.getLoginLevel() > qqweb.CONST.LOGIN_LEVEL_NONE && d.initPushService();
                a = b.string.mapQuery(location.href.toLowerCase());
                a.adtag && a.adtag == "desktop" && alloy.util.report2qqweb("monitor|signin|fromqqclient165desktop");
                alloy.system.runApp("explorer")
            },
            onExitSuccess: function () {
                location.reload()
            },
            onGetVfWebQQError: function () {
                b.profile("onGetVfWebQQError", "portal!");
                qqweb.util.report2h("get_vfwebqq", "end", "error");
                d.setUin(0);
                d.setLoginLevel(qqweb.CONST.LOGIN_LEVEL_NONE);
                fa()
            },
            onGetVfWebQQSuccess: function (a) {
                d.setLoginLevel(alloy.CONST.LOGIN_LEVEL_NOCHAT);
                d.setUin(p);
                r = a.result ? a.result.vfwebqq : null;
                b.profile("onGetVfWebQQSuccess, vfwebqq:" + r, "portal!");
                qqweb.util.report2h("get_vfwebqq", "end", "ok");
                X();
                e.notifyObservers(alloy.portal, "GetLoginInfoSuccess", {
                    isSelfInfoLoad: !0
                })
            },
            onGetLoginInfoSuccess: function (a) {
                typeof progress == "function" && progress("get_vfwebqq");
                qqweb.util.report2h("pass_ptlogin", "end", "ok");
                if (!a || !a.isSelfInfoLoad) alloy.util.report2h("get_selfinfo", "start"), alloy.rpcService.sendGetUserInfo(alloy.portal.getUin())
            },
            onGetSelfInfoSuccess: function (a) {
                if (a.retcode == 0) {
                    var c = a.arguments.uin,
                        d = a.result;
                    if (alloy.portal.getUin() == c) d.uiuin = alloy.portal.getCookiePTUiUin(), alloy.portal.setPortalSelf(d), e.notifyObservers(alloy.portal, "selfInfoReady", alloy.portal.getPortalSelf()), qqweb.util.report2h("get_selfinfo", "end", ["ok"][a.retcode] || a.retcode), alloy.util.stat.report()
                } else b.error("[sendGetUserInfo\uff1a\u6570\u636e\u683c\u5f0f\u9519\u8bef] error: " + a.retcode + "-" + a.errmsg)
            },
            onSelfInfoReady: function () {
                b.profile("onSelfInfoReady", "portal!");
                m && (m = !1, M ? (M = !1, alloy.config.init()) : Y() && t())
            },
            onReset: function () {},
            onUACReady: function () {
                v ? e.notifyObservers(alloy.portal, "AlloyReady") : e.notifyObservers(alloy.portal, "FrameWorkReady")
            },
            onFrameWorkReady: function () {
                typeof progress == "function" && progress("FrameWorkReady", 100);
                alloy.layout.hideStartingCover();
                var a;
                a = b.browser.mobileSafari ? 1 : 0;
                var c = alloy.CONST.CDN_URL + "alloy/";
                g.loadCss(alloy.CONST.CDN_URL + "style/qqweb.main.2.css?t=" + alloy.CONST.UPDATE_TIME_STAMP, {
                    onSuccess: function () {}
                });
                g.loadScript(c + a + "/qqweb.part2.js?t=" + alloy.CONST.UPDATE_TIME_STAMP, {
                    onSuccess: function () {
                        v = !0;
                        e.notifyObservers(alloy.portal, "AlloyJsReady");
                        e.notifyObservers(alloy.portal, "AlloyReady")
                    }
                })
            },
            onAlloyJsReady: function () {
                typeof progress == "function" && progress("AlloyJsReady", 0);
                alloy.navbar.init();
                alloy.sound.init();
                alloy.hotkeyManager.init();
                alloy.hotkey.init();
                alloy.messageSystem.init();
                alloy.pushService.init();
                alloy.localStorage.init();
                alloy.windowFactory.registerWindow("Window", alloy.businessClass.Window);
                alloy.windowFactory.registerWindow("EqqWindow", alloy.businessClass.EqqWindow);
                alloy.windowFactory.registerWindow("Widget", alloy.businessClass.Widget)
            },
            onFirstScreenReady: function () {
                typeof progress == "function" && progress("FirstScreenReady", 0);
                var a = d.getLoginLevel();
                b.profile("onGetAppConfigComplete", "portal!");
                try {
                    e.notifyObservers(alloy.portal, "portalReady", a)
                } catch (c) {
                    b.error("portalReady, but [portalReady notify] error, level:" + a)
                }
            },
            onGetAppConfigComplete: function () {},
            onLoginLevelChange: function () {},
            onUpdateAppConfig: function (a) {
                var b = d.getApp(a.id);
                b && b.updateAppConfig(a)
            },
            onRemoveAppConfig: function (a) {
                var b = d.getApp(a.id);
                b && b.removeAppConfig(a);
                delete alloy.app["app" + a.id];
                d.setAppLoading(a.id, !1)
            },
            onAppRun: function (a) {
                if (!(alloy.portal.getLoginLevel() == alloy.CONST.LOGIN_LEVEL_NONE || !alloy.portal.getVfWebQQ() || !Number(a))) if ((a = alloy.portal.getAllConfig(a)) && !(a.preview || a.windowType != "widget")) a = ha(), alloy.rpcService.sendMSetConfigDelay({
                    data: {
                        0: {
                            runWidgets: a
                        }
                    },
                    delay: 2E3
                })
            },
            onAppExit: function (a) {
                if (!(alloy.portal.getLoginLevel() == alloy.CONST.LOGIN_LEVEL_NONE || !alloy.portal.getVfWebQQ() || N || a.preview)) {
                    var b = a.window || a.widget;
                    if (b && (a = Number(a.option.id)) && /(window)|(widget)/.test(b.windowType)) {
                        var c = alloy.portal.getAllConfig(a);
                        if (c) if (c.selfConfig = c.selfConfig || {}, b.windowType == "widget") {
                            var d = b.getX(),
                                b = b.getY();
                            c.selfConfig.x = d;
                            c.selfConfig.y = b;
                            c = {};
                            c[a] = {
                                x: d,
                                y: b
                            };
                            b = ha();
                            b[a] = null;
                            delete b[a];
                            c[0] = {
                                runWidgets: b
                            };
                            alloy.rpcService.sendMSetConfigDelay({
                                data: c,
                                delay: 1E3
                            })
                        } else if (b.option.resize) {
                            var d = b.getBodyWidth(),
                                f = b.getBodyHeight(),
                                b = b.getBoxStatus();
                            c.selfConfig.defaultMode = b;
                            c.selfConfig.width = d;
                            c.selfConfig.height = f;
                            c = {};
                            c.defaultMode = b;
                            if (b != "fullscreen" && b != "max") c.width = d, c.height = f;
                            alloy.rpcService.sendSetConfig({
                                data: {
                                    r: {
                                        appid: a,
                                        value: c
                                    }
                                }
                            })
                        }
                    }
                }
            },
            onThirdPartyAppExit: function (a) {
                alloy.portal.unCacheOpenkey(a.option.id)
            }
        };
    this.init = function () {
        typeof progress == "function" && progress("portal init");
        j = {};
        K = 0;
        qqweb.app.appKeyMap = {};
        e.addObserver(qqweb.portal, "exitSuccess", O.onExitSuccess);
        e.addObserver(alloy.rpcService, "GetVfWebQQError", O.onGetVfWebQQError);
        e.addObserver(alloy.rpcService, "GetVfWebQQSuccess", O.onGetVfWebQQSuccess);
        e.addObserver(alloy.portal, "GetLoginInfoSuccess", O.onGetLoginInfoSuccess);
        e.addObserver(alloy.rpcService, "GetUserInfoSuccess", O.onGetSelfInfoSuccess);
        e.addObserver(alloy.portal, "selfInfoReady", O.onSelfInfoReady);
        e.addObserver(alloy.portal, "reset", O.onReset);
        e.addObserver(alloy.portal, "UACReady", O.onUACReady);
        e.addObserver(alloy.portal, "FrameWorkReady", O.onFrameWorkReady);
        e.addObserver(alloy.portal, "FirstScreenReady", O.onFirstScreenReady);
        e.addObserver(alloy.appconfig, "GetAppConfigComplete", O.onGetAppConfigComplete);
        e.addObserver(alloy.appconfig, "GetDefaultAppConfigComplete", O.onGetAppConfigComplete);
        e.addObserver(alloy.appconfig, "UpdateAppConfig", O.onUpdateAppConfig);
        e.addObserver(alloy.appconfig, "RemoveAppConfig", O.onRemoveAppConfig);
        e.addObserver(alloy.portal, "AlloyJsReady", O.onAlloyJsReady);
        e.addObserver(alloy.portal, "portalReady", O.onPortalReady);
        e.addObserver(alloy.portal, "appRun", O.onAppRun);
        e.addObserver(alloy.portal, "appExit", O.onAppExit);
        e.addObserver(alloy.portal, "appExit", O.onThirdPartyAppExit);
        e.addObserver(alloy.portal, "loginLevelChange", O.onLoginLevelChange);
        alloy.fileSystem.init();
        alloy.storage.init();
        alloy.desktopContact.init();
        alloy.desktopFolder.init();
        alloy.desktopFile.init();
        alloy.flashUploadManager.init();
        alloy.layout.init();
        alloy.layout.themeManager.init();
        e.addObserver(alloy.layout, "clickDesktop", ga);
        e.addObserver(alloy.layout, "desktopFocus", ga);
        b.profile("initAccount start!", "portal!");
        C = d.getOriginalCookieUin();
        H = d.getCookieSkey();
        F = d.getCookiePtwebqq();
        y = d.getCookieUin();
        u = d.getUin() && d.getSkey() ? 2 : 1;
        b.profile("initAccount finish!", "portal!");
        ba();
        e.on(window, "unload", ia);
        qqweb.util.report2h("portal", "end_runCoreApps", "ok")
    };
    var ka = 6E5,
        la = 6E6,
        ma = 42E6;
    this.changeCheckOpenKeyFrequency = function (a) {
        ka = a.check * 1E3;
        la = a.renewal * 1E3;
        ma = a.reload * 1E3;
        b.debug("set check frequency done", "OpenKey")
    };
    var qa = function () {
            var a = +new Date;
            b.debug("check open key: " + a, "OpenKey");
            var c, d, f = !1,
                e;
            for (e in L) if (d = Number(e)) f = !0, c = L[e], a - c.createTime >= ma ? (b.debug("\u8fc7\u671f\u91cd\u62c9(appId: " + d + "):" + (a - c.createTime) / 1E3, "OpenKey"), alloy.config.reRequestGrant({
                appId: d
            })) : a - c.lastUpdateTime >= la && (b.debug("\u7eed\u671f(appId: " + d + "):" + (a - c.lastUpdateTime) / 1E3, "OpenKey"), alloy.config.renewalGrant({
                appId: d,
                openId: c.openId,
                openKey: c.openKey
            }));
            f || (clearInterval(V), V = 0, b.debug("stop check open key", "OpenKey"))
        };
    this.cacheOpenkey = function (a) {
        var c = +new Date;
        a.renewal && L[a.appId] ? L[a.appId].lastUpdateTime = c : L[a.appId] = {
            gaid: a.gaid,
            openKey: a.openKey,
            openId: a.openId,
            createTime: c,
            lastUpdateTime: c
        };
        V || (V = setInterval(qa, ka), b.debug("start check open key", "OpenKey"))
    };
    this.unCacheOpenkey = function (a) {
        L[a] && (L[a] = null, delete L[a])
    };
    this.getCacheOpenkey = function (a) {
        return L[a]
    };
    this.getPtwebqq = function () {
        return F
    };
    this.setPtwebqq = function (a) {
        return F = a
    };
    this.getOldUin = function () {
        return z
    };
    this.getUin = function () {
        return y
    };
    this.getTryUin = function () {
        return p
    };
    this.getOriginalUin = function () {
        return C
    };
    this.setSecretKey = function (a) {
        f = a
    };
    this.getSecretKey = function () {
        return f
    };
    this.setSecretIp = function (a) {
        n = a
    };
    this.getSecretIp = function () {
        return n
    };
    this.acceptSocket = function (a) {
        var a = decodeURI(a),
            c = b.json.parse(a);
        if (c.e == 0) if (b.isUndefined(c.appid)) {
            if (c.sid) R = c.al, alloy.util.report2qqweb("push|loginsuccess")
        } else b.event.notifyObservers(qqweb.portal, "message", c);
        else d.longPollLogin(), W = "longPoll", b.error("PushService error: " + a), alloy.util.report2qqweb("push|loginfail")
    };
    this.reportAppState = function (a, f) {
        if (W == "socket") if (P) for (var e = 0; e < R.length; ++e) {
            if (a == R[e]) {
                P.reportAppState && P.reportAppState(a, f);
                break
            }
        } else P = b.browser.ie ? c.id("Socket") || window.Socket : document.Socket;
        else for (e = 0; e < R.length; ++e) if (a == R[e]) {
            alloy.rpcService.psSend(alloy.CONST.PS_CGI_URL + "kl/as", {
                context: d,
                method: "GET",
                timeout: 1E4,
                data: {
                    ssid: G,
                    aid: a,
                    s: f
                },
                onSuccess: function () {},
                onError: function () {},
                onTimeout: function () {}
            });
            break
        }
    };
    this.reportOpen = function (a) {
        var c = b.json.parse(a);
        if (c.appid) b.event.notifyObservers(qqweb.portal, "message", c), b.event.notifyObservers(qqweb.portal, "message" + c.appId, a);
        else if (c.sid) R = c.al
    };
    this.getSkey = function () {
        return H
    };
    this.getUinAndSkey = function () {
        return {
            uin: y,
            skey: H
        }
    };
    this.getLoginLevel = function () {
        return x
    };
    this.setLoginLevel = function (a) {
        a != x && (q = x, x = a, Y() && (e.notifyObservers(alloy.portal, "loginLevelChange", a), a > 1 && K < 1 && d.addExitConfirm()), a != 1 && (a == 2 ? q == 1 && (alloy.util.report2qqweb("signin|visitortoweakness"), d.getPtwebqq() ? alloy.util.report2qqweb("signin|visitortoweakness|signinwithptwebqq") : alloy.util.report2qqweb("signin|visitortoweakness|signin")) : a == 3 && (q == 1 ? (alloy.util.report2qqweb("signin|visitortostrength"), alloy.util.report2qqweb("signin|visitortostrength|" + d.getTryLoginState())) : q == 2 && (d.isWithPtwebqqLogin() ? (alloy.util.report2qqweb("signin|weaknesstostrength|signinwithptwebqq"), alloy.util.report2qqweb("signin|weaknesstostrength|signinwithptwebqq|" + d.getTryLoginState())) : (alloy.util.report2qqweb("signin|weaknesstostrength|signin"), alloy.util.report2qqweb("signin|weaknesstostrength|signin|" + d.getTryLoginState()))))), d.setWithPtwebqqLogin(d.getPtwebqq() || !1))
    };
    this.getOldLoginLevel = function () {
        return q
    };
    this.setWithPtwebqqLogin = function (b) {
        a = b
    };
    this.isWithPtwebqqLogin = function () {
        return a
    };
    this.isPortalReady = function () {
        return h
    };
    this.setUin = function (a) {
        z = y;
        return y = a
    };
    this.recoverCookie = function () {};
    this.validatePTLoginSuccess = function (a) {
        a = a || {};
        a = b.string.mapQuery(a.url);
        if (typeof a.login2qq === "undefined" && (alloy.util.report2qqweb("monitor|nologinquery"), E)) a.login2qq = 1;
        if (Number(a.login2qq) === 1) {
            u = 3;
            if (a = a.webqq_type || 0) a = alloy.util.code2state(a), alloy.portal.setTryLoginState(a);
            alloy.portal.setTryLoginType(!0)
        } else u = 2, alloy.portal.setTryLoginType(!1);
        b.profile("validatePTLoginSuccess, tryLoginLevel:" + u, "portal!");
        alloy.util.report2h("pass_ptlogin", "start");
        C = d.getOriginalCookieUin();
        H = d.getCookieSkey();
        F = d.getCookiePtwebqq();
        ba();
        alloy.layout.hideLoginWindow()
    };
    this.setTryLoginState = function (a) {
        D = a
    };
    this.getTryLoginState = function () {
        return D
    };
    this.setTryLoginType = function (a) {
        E = a
    };
    this.getSSOForm = function (a) {
        a = a || window.location.search;
        a = b.string.mapQuery(a).sso;
        if (!a) return {};
        var a = b.json.parse(a),
            c = a.skey,
            f = a.cgi,
            e = a.custom,
            g = {};
        g[a.uin] = d.getUin();
        g[c] = d.getCookieSkey();
        b.extend(g, e);
        return {
            option: {
                method: "POST",
                data: g
            },
            cgi: f
        }
    };
    this.getCookieUin = function () {
        var a = b.cookie.get("uin", alloy.CONST.MAIN_DOMAIN),
            a = a ? parseInt(a.substr(1), 10) : null;
        b.out("Cookie uin:" + a);
        return a
    };
    this.getCookiePTUiUin = function () {
        var a = b.cookie.get("ptui_loginuin", alloy.CONST.MAIN_DOMAIN);
        a || (a = void 0);
        b.out("PTUI uin:" + a);
        return a
    };
    this.getOriginalCookieUin = function () {
        return b.cookie.get("uin", alloy.CONST.MAIN_DOMAIN)
    };
    this.getCookieSkey = function () {
        return b.cookie.get("skey", alloy.CONST.MAIN_DOMAIN)
    };
    this.getCookiePtwebqq = function () {
        return b.cookie.get("ptwebqq", alloy.CONST.MAIN_DOMAIN)
    };
    var ra = function (a, b) {
            alloy.rpcService.getAppInfo(a, ["appName", "appType", "appUrl", "iconUrl", "id", "category", "exinfo", "al", "gaid"], function (c) {
                if (c.retcode === 0) c = c.result.resultData, c.preview = !0, alloy.appconfig.addAppConfigTemp(c), alloy.portal.runApp(a, b)
            })
        };
    this.runApp = function (a, c) {
        if (v) {
            var c = c || {},
                a = a == "eqq" ? alloy.config.__eqqid : a,
                f = this.getAllConfig(a);
            if (!f) return b.out("id:" + a), f = c.runFrom, a = Number(a), c.preview ? ra(a, c) : a != 19 && (h ? alloy.portal.runApp("appMarket", {
                page: "introduce",
                option: {
                    appid: a
                },
                runFrom: f
            }) : alert("\u56e0\u7f51\u7edc\u73af\u5883\u95ee\u9898\u5bfc\u81f4\u52a0\u8f7d\u5f02\u5e38\uff0c\u8bf7\u5c1d\u8bd5\u91cd\u65b0\u767b\u5f55\u3002")), !1;
            if (a == "appMarket" && !h) return alert("\u56e0\u7f51\u7edc\u73af\u5883\u95ee\u9898\u5bfc\u81f4\u52a0\u8f7d\u5f02\u5e38\uff0c\u8bf7\u5c1d\u8bd5\u91cd\u65b0\u767b\u5f55\u3002"), !1;
            var e = this.getApp(a),
                c = d.getUrlOption(a) || c;
            e ? (e.run && (~~a > 0 && !f.preview && !f.selfConfigLoaded && d.getLoginLevel() > alloy.CONST.LOGIN_LEVEL_NONE ? (e = ["width", "height", "defaultMode"], f.windowType == "widget" && (e = ["x", "y"]), alloy.rpcService.sendGetConfig({
                arguments: {
                    appConfig: f,
                    option: c
                },
                data: {
                    r: {
                        appid: f.id,
                        itemlist: e
                    }
                },
                action: "get",
                onSuccess: na,
                onError: na
            })) : (f.selfConfig && b.extend(c, f.selfConfig), e.run(c), d.removeUrlOption(a))), c && b.isFunction(c.callback) && c.callback()) : f && (~~a > 0 ? f.appType == 1 ? alloy.portal.loadApp(f, c) : f.appType == 2 && (qqweb.app["app" + a] = new qqweb.businessClass.App(f), alloy.portal.runApp(a, c)) : f.appType == 1 ? alloy.portal.loadApp(f, c) : f.appType == 2 && (alloy.app[a] = new alloy.businessClass.App(f), alloy.portal.runApp(a, c)), d.removeUrlOption(a), d.removeUrlOption(a));
            f && (S = !1);
            a == alloy.config.__eqqid && b.platform.iPad && alloy.sound.createIpadAudioObj();
            return !0
        } else alert("\u7cfb\u7edf\u52a0\u8f7d\u4e2d\uff0c\u8bf7\u7a0d\u540e\u3002\u3002\u3002")
    };
    this.loadApp = function (a, c) {
        a = a || {};
        if (!this.getAppLoading(a.id)) {
            this.setAppLoading(a.id, !0);
            var d = a.id,
                f = alloy.util.getAppRoot(d),
                e = f + (a.css || "style.css");
            f += a.js || "main.js";
            (a.css || b.isNumber(d)) && g.loadCss(e + "?" + alloy.CONST.UPDATE_TIME_STAMP);
            g.loadScript(f + "?" + alloy.CONST.UPDATE_TIME_STAMP, {
                onSuccess: function () {
                    alloy.portal.runApp(a.id, c)
                }
            })
        }
    };
    var na = function (a) {
            var c = a.arguments.appConfig,
                f = a.arguments.option;
            if (a.retcode == 0 && a.result) {
                if (!b.isObject(a.result)) a.result = b.json.parse(a.result);
                var a = a.result || {},
                    e = ["width", "height", "defaultMode"];
                c.windowType == "widget" && (e = ["x", "y"]);
                var g = !0,
                    t;
                for (t in e) e[t] in a || (g = !1), (a[e[t]] === null || typeof a[e[t]] === "undefined") && delete a[e[t]];
                c.selfConfig = g ? a : {}
            } else c.selfConfig = {};
            c.selfConfigLoaded = !0;
            d.runApp(c.id, f)
        };
    this.getAppConfigList = function () {
        return alloy.appconfig.appConfigList
    };
    this.getAppConfig = function (a) {
        return alloy.appconfig.getAppConfig(a)
    };
    this.getSystemConfig = function (a) {
        return alloy.appconfig.getSystemConfig(a)
    };
    this.getAllConfig = function (a) {
        return alloy.appconfig.getAllConfig(a)
    };
    this.getApp = function (a) {
        return ~~a > 0 ? alloy.app["app" + a] : alloy.app[a]
    };
    this.shutdownApp = function (a) {
        var b;
        if (b = d.getApp(a)) b.isRunning() && b.exit(), delete alloy.app["app" + a]
    };
    this.setAppLoading = function (a, b) {
        return j[a] = b
    };
    this.getAppLoading = function (a) {
        return j[a]
    };
    var ja = "\u60a8\u786e\u5b9a\u8981\u79bb\u5f00\u201cQ+ Web\u201d\u5417\uff1f";
    this.setCloseHookMessage = function (a) {
        ja = a
    };
    this.getCloseHookMessage = function () {
        return ja
    };
    this.closeHook = function (a) {
        var c = ja;
        pgvSendClick({
            hottag: "web2qq.qqpanel.status.exitQQ"
        });
        if (b.browser.safari || b.browser.chrome) return c;
        else b.browser.ie > 0 ? window.event.returnValue = c : a.returnValue = c
    };
    this.closeHookForHotKey = function () {
        alloy.hotkey.unstall()
    };
    var sa = function () {
            alloy.portal.getLoginLevel() == alloy.CONST.LOGIN_LEVEL_ALL && (EQQ.logout(), WebqCore.api.log("browser-close-ok"), EQQ.RPCService._proxy && EQQ.RPCService._proxy.abort(), EQQ.View.ChatBox && EQQ.View.ChatBox.scaptureHotkey && EQQ.View.ChatBox.scaptureHotkey.unstall())
        };
    this.addCloseHook = function () {
        A || (A = !0, e.on(window, "beforeunload", this.closeHook), e.on(window, "unload", sa))
    };
    this.addCloseHookForHotKey = function () {
        e.on(window, "unload", this.closeHookForHotKey)
    };
    this.removeCloseHook = function () {
        e.off(window, "beforeunload");
        A = !1
    };
    this.getCloseHook = function () {
        return A
    };
    this.addExitConfirm = function (a) {
        K += a || 1;
        K > 0 && this.addCloseHook();
        return K
    };
    this.removeExitConfirm = function (a) {
        K -= a || 1;
        K < 1 && this.removeCloseHook();
        return K
    };
    this.getExitConfirm = function () {
        return K
    };
    var oa = function (a) {
            var c = alloy.windowManager.getCurrentWindow();
            c && c.getAppId();
            e.notifyObservers(alloy.portal, "exit");
            l = !0;
            G && alloy.rpcService.psSend(alloy.CONST.PS_CGI_URL + "kl/logout", {
                context: d,
                method: "GET",
                timeout: 1E4,
                data: {
                    ssid: G
                },
                onSuccess: function () {},
                onError: function () {},
                onTimeout: function () {}
            });
            a || (b.cookie.remove("ptwebqq", alloy.CONST.MAIN_DOMAIN), b.cookie.remove("skey", alloy.CONST.MAIN_DOMAIN), b.cookie.remove("uin", alloy.CONST.MAIN_DOMAIN), b.cookie.remove("vfwebqq", alloy.CONST.MAIN_DOMAIN), b.out(">>>>> cookie.remove"));
            alloy.layout.hideDesktop();
            setTimeout(function () {
                e.notifyObservers(alloy.portal, "exitSuccess")
            }, 1E3);
            S && pgvSendClick({
                hottag: "WEB2QQ.NOAPP.USER.ALL"
            })
        };
    this.exit = function (a) {
        this.getExitConfirm() > 0 ? I ? (I.setWindowCentered(), I.setCurrent()) : I = alloy.layout.confirm("\u60a8\u786e\u8ba4\u8981\u6ce8\u9500  Q+ Web \u5417\uff1f", function () {
            d.removeCloseHook();
            pgvSendClick({
                hottag: "web2qq.qqpanel.status.exitQQ"
            });
            alloy.util.report2qqweb("taskabr|start|exit|ok");
            oa(a)
        }, {
            modal: !0,
            onClose: function () {
                I = null
            }
        }) : oa(a)
    };
    this.restart = function () {
        this.exit(!0)
    };
    this.close = function () {
        window.webTop && (qqweb.util.report2c(webTop.ui.channel.postCmd(25)), qqweb.util.report(), webTop.ui.channel.postCmd(21));
        alloy.portal.exit();
        e.notifyObservers(alloy.portal, "Exit");
        alloy.util.report2qqweb("taskbar|start|close")
    };
    this.getVfWebQQ = function () {
        return typeof EQQ !== "undefined" && EQQ.getVfWebQQ && EQQ.getVfWebQQ() && EQQ.getIsLogin() ? EQQ.getVfWebQQ() : r ? r : ""
    };
    this.setVfWebQQ = function (a) {
        r = a
    };
    this.getRunningAppStatus = function () {
        var a = alloy.windowManager.getCurrentWindow(),
            b = "",
            c;
        a && (b = a.getAppId());
        for (var a = {
            currentAppId: b,
            appList: []
        }, b = alloy.windowManager.getWindowList(), d = 0; d < b.length; d++) {
            var f = b[d],
                e = f.getAppId();
            if (!(e === "eqq--" || e === "sceneChristmas")) {
                c = f.getX();
                var g = f.getY();
                if (f.windowType === "window") {
                    var t = f.getBoxStatus();
                    if (t !== "min") {
                        var h = f.getWidth(),
                            f = f.getHeight();
                        c = {
                            appId: e,
                            defaultMode: t,
                            x: c,
                            y: g,
                            width: h,
                            height: f
                        };
                        e && a.appList.push(c)
                    }
                } else f.windowType === "widget" && (c = {
                    appId: e,
                    x: c,
                    y: g
                }, a.appList.push(c))
            }
        }
        return a
    };
    d.runSettingCenter = function (a) {
        var b = ["config_page_general", "config_page_msg", "config_page_bkg"];
        switch (a && a.pageID || b[0]) {
        case b[0]:
            return d.runApp("settingCenter");
        case b[1]:
            return d.runApp("notifications");
        case b[2]:
            return d.runApp("themeSetting")
        }
    };
    d.runAppMarket = function (a) {
        return d.runApp("appMarket", a)
    };
    d.runBrowser = function (a) {
        return d.runApp("6", a)
    };
    d.runQQ = function (a) {
        return d.runApp(alloy.config.__eqqid, a)
    };
    d.runIME = function (a) {
        return d.runApp("qqWebIme", a)
    };
    d.runHandWrite = function (a) {
        return d.runApp("qqHandWrite", a)
    };
    this.openInWebBrowser = function (a) {
        var a = a || {},
            c = this.getApp(6);
        return b.isUndefined(c) || !c.isRunning() ? (a.isOpenNewTab = !0, alloy.portal.runApp("6", a)) : (c.openUrl(a), a.callback && a.callback(), !0)
    };
    this.isOpenFile = function (a) {
        return b.array.indexOf(["jpg", "jpeg", "bmp", "png", "gif", "txt", "doc", "docx", "ppt", "pptx", "xls", "xlsx", "pdf"], a) >= 0 ? 1 : 0
    };
    this.openFile = function (a) {
        if ("type" in a) switch (a.type) {
        case "image":
        case "img":
        case "pic":
        case "photo":
        case "jpg":
        case "jpeg":
        case "bmp":
        case "png":
        case "gif":
            alloy.portal.runApp("imgViewer", a);
            break;
        case "sound":
        case "music":
        case "audio":
            alloy.portal.runApp("audioPlayer", a);
            break;
        case "txt":
        case "doc":
        case "docx":
        case "ppt":
        case "pptx":
        case "xls":
        case "xlsx":
        case "pdf":
            alloy.portal.runApp("docViewer", a);
            break;
        default:
            alloy.system.alert("\u672a\u77e5\u6587\u4ef6\u7c7b\u578b")
        }
    };
    d.getLoginState = d.getLoginLevel;
    d.isAppInstalled = function (a) {
        if (b.isArray(a.appId)) {
            for (var c = {}, d = 0; d < a.appId.length; d++) c[a.appId[d]] = alloy.config.isInSetupAppList(a.appId[d]) ? !0 : !1;
            return c
        } else return alloy.config.isInSetupAppList(a.appId) ? !0 : !1
    };
    d.isAppRunning = function (a) {
        return (a = d.getApp(a.appId)) && a.isRunning() ? !0 : !1
    };
    d.getAppInfo = function (a) {
        var c = {};
        c.appList = a.appList;
        c.onSuccess = a.onSuccess;
        c.onError = a.onError;
        if (!b.isArray(a.appList)) c.appList = [], c.appList.push(a.appList);
        alloy.rpcService.getAppInfoMulti(c)
    };
    d.isLocked = function () {
        return qqweb.app.screenLocker && qqweb.app.screenLocker.isLocked() ? !0 : !1
    };
    d.openURL = d.openInWebBrowser;
    d.search = function (a) {
        a = a.keyword;
        if (a == "") return !1;
        a = "http://www.soso.com/q?bid=203&cid=webq.a&ie=utf-8&w=" + encodeURIComponent(a);
        d.openURL({
            url: a,
            title: "\u641c\u641csoso"
        })
    };
    d.onAirClientReady = function () {
        J = {};
        var a = document.getElementById("webtopInstallerFlash");
        a.detectAppVersion("alloy.portal.onDetectAppVersion");
        a.setOnClick("alloy.portal.onWebTopInstallClick")
    };
    d.onAirInstallerInitFail = function (a) {
        b.error(a)
    };
    d.onDetectAppVersion = function (a) {
        J.appVersion = a || 0
    };
    d.onWebTopSystemClickCb = function (a) {
        d.onDetectAppVersion(a);
        alloy.navbar.showRunWebTopTip()
    };
    d.onWebTopInstallClick = function () {
        alloy.navbar.closeTip()
    };
    d.getAirRunTime = function () {
        return J
    };
    d.switchToDesktop = function (a, b) {
        typeof a !== "undefined" && webTop.ui.channel.postCmd(17, a, b);
        webTop.ui.channel.postCmd(18, 255)
    };
    d.setWebTopNavBarOnTop = function (a) {
        webTop.ui.channel.postCmd(26, a)
    };
    if (window.webTop) {
        var pa = function () {
                var a = arguments[0];
                b.info("onWebTopCommand:" + a);
                var c = ta[a];
                c ? c.apply(null, Array.prototype.slice.call(arguments, 1)) : alert("no such callback! - cmd: " + a)
            },
            ta = {
                16: function (a) {
                    d.openInWebBrowser({
                        url: a,
                        title: "\u6d4f\u89c8\u7f51\u9875"
                    })
                },
                17: function (a, b) {
                    alloy.navbar.setNavBarPosition(Number(a), Number(b));
                    if (webTop.ui.channel.postCmd(22)) {
                        var c = alloy.layout.createBubble({
                            hasCloseButton: !1
                        });
                        c.setTitle("\u8fd4\u56de\u7cfb\u7edf\u684c\u9762");
                        c.setContent('<div class="webtop-sysbtn-thumb"></div>');
                        c.showButton("ok", "\u77e5\u9053\u5566");
                        c.show({
                            pointerPosition: "top left",
                            target: alloy.navbar.getSystemButton()
                        })
                    }
                },
                18: function (a) {
                    alloy.desktopManager.setCurrentDesktop(a)
                },
                20: function () {
                    if (!s) {
                        var a = "\u60a8\u786e\u5b9a\u8981\u9000\u51fa  Q+ Web \u5417\uff1f";
                        window.webTop && (a = "\u60a8\u786e\u5b9a\u8981\u9000\u51fa\u201c\u5ba2\u6237\u7aef\u201d\u5417\uff1f");
                        s = alloy.layout.confirm(a, function () {
                            alloy.portal.close()
                        }, {
                            modal: !0,
                            onClose: function () {
                                s = null
                            }
                        })
                    }
                },
                26: function (a) {
                    alloy.navbar.setNavBarOnTop(a, !0)
                },
                27: function (a) {
                    alloy.util.report2qqweb(a)
                },
                28: function (a) {
                    alloy.util.report2c(a)
                },
                29: function (a) {
                    b.info(a);
                    eval("(" + a + ")")
                }
            };
        /QT\//.test(webTop.type) ? webTop.ui.channel.onCmd.connect(pa) : webTop.ui.channel.onCmd = pa
    }
});