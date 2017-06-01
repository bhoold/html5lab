Jx().$package("alloy.desktopManager", function (b) {
    var d = b.dom,
        c = b.event,
        e = b.fx.transitions,
        g = {
            NORMAL: 1,
            EDIT: 2,
            DRAG: 3,
            MANAGE: 4
        },
        j, l, q, u, p, v, x, m, o, h, a = [],
        f = {},
        n = [],
        s = [],
        w = {},
        C = g.NORMAL,
        y = [],
        z = [],
        F, H, r, k = [0, 0, 0, 0, 0],
        A = alloy.fileSystem.FILE_TYPE,
        D = 142,
        E = 112,
        I = 0,
        K = 0,
        N = 0,
        M = function (a) {
            return a === null || typeof a === "undefined"
        },
        J = function () {
            alloy.navbar && alloy.navbar.setZIndex(11);
            d.setStyle(alloy.layout.getArea("bottom"), "zIndex", 12)
        },
        Q = function () {
            alloy.navbar && alloy.navbar.setZIndex(10);
            d.setStyle(alloy.layout.getArea("bottom"), "zIndex", 10)
        },
        R = [{
            text: "\u4e0a\u4f20\u6587\u4ef6",
            type: "flash",
            icon: {
                className: "add_file_icon"
            },
            onClick: function () {}
        }, {
            text: "\u6dfb\u52a0\u5e94\u7528",
            icon: {
                className: "add_app_icon"
            },
            onClick: function () {
                alloy.portal.runApp("appMarket");
                qqweb.util.report2qqweb("screen|" + alloy.desktopManager.getCurrentDesktopIndex() + "|addapp")
            }
        }, {
            text: "\u6dfb\u52a0\u684c\u9762\u8054\u7cfb\u4eba",
            icon: {
                className: "add_contact_icon"
            },
            onClick: function () {
                alloy.desktopContact.showSelectBuddyBox();
                qqweb.util.report2qqweb("add|desktop|adddeskcontanct")
            }
        }, {
            type: "separator"
        }, {
            text: "\u65b0\u5efa\u6587\u4ef6\u5939",
            icon: {
                className: "add_folder_icon"
            },
            onClick: function () {
                alloy.desktopFolder.createFolder();
                qqweb.util.report2qqweb("add|desktop|addfolder")
            }
        }],
        G = {
            onWindowCreated: function (a) {
                if (this.isWindowInDesktop(a)) {
                    this._windowArray.push(a);
                    if (a.windowType != "widget") {
                        var d = this,
                            f = function () {
                                this.getBoxStatus() === "max" && (b.array.contains(d._maxWindowArray, this) || d._maxWindowArray.push(this), d._maxWindowArray.length > 0 && Q())
                            },
                            e = function () {
                                b.array.remove(d._maxWindowArray, this);
                                d._maxWindowArray.length == 0 && J()
                            };
                        c.addObserver(a, "max", f);
                        c.addObserver(a, "show", f);
                        c.addObserver(a, "restore", e);
                        c.addObserver(a, "min", e);
                        f.apply(a)
                    }
                    c.addObserver(a, "destroy", b.bind(G.onWindowDestroy, this))
                }
            },
            onWindowDestroy: function (a) {
                if (a == this.getCurrentWindow()) {
                    this.setCurrentWindow(null);
                    var c;
                    if (!this._preCurrentWindow && (c = this._windowArray[this._windowArray.length - 1])) this._preCurrentWindow = c == a ? this._windowArray[this._windowArray.length - 2] || null : c;
                    this._preCurrentWindow && this._preCurrentWindow.isShow() && this._preCurrentWindow.setCurrent()
                } else if (a == this._preCurrentWindow) this._preCurrentWindow = null;
                b.array.remove(this._windowArray, a);
                a.windowType != "widget" && (b.array.remove(this._maxWindowArray, a), this._maxWindowArray.length == 0 && J())
            },
            onDesktopSwitch: function (a) {
                this._desktopIndex == a && (this._maxWindowArray.length == 0 ? J() : Q())
            }
        },
        W = new b.Class({
            init: function (a) {
                this._desktopIndex = a.desktopIndex;
                this._windowArray = [];
                this._preCurrentWindow = this._currentWindow = null;
                this._maxWindowArray = [];
                c.addObserver(alloy.windowFactory, "WindowCreated", b.bind(G.onWindowCreated, this));
                c.addObserver(alloy.portal, "DesktopSwitch", b.bind(G.onDesktopSwitch, this))
            },
            isWindowInDesktop: function (a) {
                if (M(a.desktopIndex)) return this._desktopIndex == alloy.desktopManager.getCurrentDesktopIndex();
                else if (this._desktopIndex == a.desktopIndex) return !0;
                return !1
            },
            setCurrentWindow: function (a) {
                if (a) if (this._currentWindow) {
                    if (this._currentWindow != a) this._preCurrentWindow = this._currentWindow, this._currentWindow.setNotCurrent()
                } else this._preCurrentWindow = null;
                this._currentWindow = a
            },
            getCurrentWindow: function () {
                return this._currentWindow
            }
        }),
        P = new b.Class({
            init: function (a) {
                var f = this._index = a.index,
                    e = this._el = d.node("div", {
                        index: f,
                        "class": "desktopContainer"
                    }),
                    g = this._iconContainer = d.node("div", {
                        "class": "appListContainer",
                        customAcceptDrop: 1,
                        index: f
                    });
                c.addObserver(g, "dragmove", B.onDesktopContainerDragMove);
                c.addObserver(g, "drop", B.onDesktopContainerDrop);
                if (b.browser.mobileSafari) c.on(g, "touchstart", B.onTouchStart);
                e.appendChild(g);
                if (b.browser.mobileSafari) d.setStyle(g, "overflow-y", "auto"), d.setStyle(g, "overflow-x", "hidden"), new b.ui.TouchScroller(g);
                else {
                    var t = new b.ui.ScrollArea(g);
                    t.update();
                    y.push(t);
                    d.setStyle(g, "overflow-y", "hidden")
                }
                b.browser.engine.webkit && d.setStyle(this._el, "left", alloy.layout.getDesktopWidth() + "px");
                d.hide(g);
                a.appendTo.appendChild(e);
                this._windowManager = new W({
                    desktopIndex: f
                });
                if (b.browser.engine.webkit) {
                    d.addClass(l, "desktopsContainerEx");
                    var h = this;
                    c.on(this._el, "webkitTransitionEnd", function () {
                        h._isCurrent || d.setClass(this, "desktopContainer");
                        k[h._index]--;
                        a: {
                            for (var a in k) if (k[a] > 0) break a;
                            d.addClass(l, "desktopsContainerEx")
                        }
                    })
                }
            },
            getElement: function () {
                return this._el
            },
            getIconContainer: function () {
                return this._iconContainer
            },
            getIndex: function () {
                return this._index
            },
            getWindowManager: function () {
                return this._windowManager
            },
            setCurrent: function (a, c) {
                this._isCurrent = !0;
                var f = this._el,
                    e = this;
                d.setClass(f, "desktopContainer desktop_current");
                if (c || C === g.DRAG) b.browser.engine.webkit && (d.addClass(l, "desktopsContainerEx"), d.addClass(f, "desktop_current_noanimation"));
                else if (b.browser.engine.webkit && (k[this._index] = 2, d.removeClass(l, "desktopsContainerEx")), b.browser.engine.webkit || b.browser.firefox) this._showAnimationTimer && clearTimeout(this._showAnimationTimer), this._disappearAnimationTimer && clearTimeout(this._disappearAnimationTimer), d.addClass(f, "desktop_show_prepare" + a), this._showAnimationTimer = setTimeout(function () {
                    d.addClass(f, "desktop_show_animation" + a);
                    e._showAnimationTimer = 0
                }, 100)
            },
            setNotCurrent: function (a, c) {
                d.removeClass(l, "desktopsContainerEx");
                this._isCurrent = !1;
                var f = this._el,
                    e = this;
                d.setClass(f, "desktopContainer");
                if (!(c || C === g.DRAG)) if (b.browser.engine.webkit) b.browser.engine.webkit && (k[this._index] = 1, d.removeClass(l, "desktopsContainerEx")), d.addClass(f, "desktop_disappear_prepare" + a), d.addClass(f, "desktop_disappear_animation" + a);
                else if (b.browser.firefox) this._showAnimationTimer && clearTimeout(this._showAnimationTimer), this._disappearAnimationTimer && clearTimeout(this._disappearAnimationTimer), d.addClass(f, "desktop_disappear_prepare" + a), this._disappearAnimationTimer = setTimeout(function () {
                    d.addClass(f, "desktop_disappear_animation" + a);
                    e._disappearAnimationTimer = 0
                }, 100)
            }
        }),
        B = {
            onTouchStart: function (a) {
                var b = a.target;
                if (d.hasClass(b, "appListContainer")) I = a.changedTouches[0].pageX, K = (new Date).getTime(), c.on(b, "touchmove", B.onTouchMove), c.on(b, "touchend", B.onTouchEnd)
            },
            onTouchMove: function () {},
            onTouchEnd: function (a) {
                var b = a.target;
                c.off(b, "touchmove", B.onTouchMove);
                c.off(b, "touchend", B.onTouchEnd);
                N = a.changedTouches[0].pageX - I;
                a = (new Date).getTime() - K;
                a = N / a;
                a > 50 ? T(!0) : a < -50 ? V(!0) : N > 60 ? T(!0) : N < -60 ? V(!0) : N = 0
            },
            onSwipe: function () {},
            onDesktopContainerDragMove: function () {},
            onDesktopContainerDrop: function (a) {
                var b = a.pos,
                    c = b.x,
                    e = b.y;
                e += this.scrollTop;
                var b = a.dragEl,
                    a = this.getAttribute("index") || u,
                    g = d.getClientXY(this);
                c -= g[0];
                e -= g[1];
                c = Math.floor(c / D);
                e = Math.floor(e / E);
                c = e >= x ? e * m + c : c * x + e;
                if (c > f[a].length) c = f[a].length;
                var t, h = b.getAttribute("type"),
                    e = {
                        t: h
                    },
                    g = alloy.fileSystem.FILE_TYPE;
                t = parseInt(b.getAttribute("fileId"));
                if (!isNaN(t)) {
                    if (h == g.FILE) {
                        var k = alloy.iconFactory.getIcons(t, alloy.fileSystem.FILE_TYPE.FILE);
                        i = 0;
                        for (len = k.length; i < len; i++) if (k[i].isUploading()) return
                    }
                    e.id = t;
                    if (h == g.GROUP) e.gid = parseInt(b.getAttribute("gid"));
                    b = b.getAttribute("from");
                    t = f[a][c];
                    b == "buddy" ? (t && w[t] && w[t].type == g.FOLDER ? alloy.fileSystem.moveFile(e, w[t].fileId, null, null, null, !0) : alloy.desktopContact.addContactIcon(e, a, c), qqweb.util.report2qqweb("deskcontact|create|drag")) : alloy.fileSystem.isInFolder(e, alloy.fileSystem.getRootFolder(), !0) && (t && w[t] && w[t].type == g.FOLDER && e.t != g.FOLDER ? alloy.fileSystem.moveFile(e, w[t].fileId, null, null, null, !0) : alloy.fileSystem.moveFile(e, a, c, null, null, !0))
                }
            },
            onGetAppConfigComplete: function () {
                ea();
                v = {};
                b.array.forEach(s, function (a) {
                    clearTimeout(a)
                });
                b.array.forEach(n, function (a) {
                    a && a.stop()
                });
                n = [];
                s = [];
                var a = alloy.fileSystem.getRootFolder(),
                    d = a.items,
                    a = alloy.fileSystem.getFolderById(u, a);
                aa(a.items, a.id, function () {
                    c.notifyObservers(alloy.portal, "FirstScreenReady");
                    for (var a = 0, b = 1; a < 5; ++a) u != d[a].id && (function (a, b) {
                        s[a] = setTimeout(function () {
                            aa(d[a].items, d[a].id)
                        }, b * 5E3)
                    }(a, b), b++)
                })
            },
            onClearDefaultApp: function () {
                ea()
            },
            onFileMove: function (a) {
                if (a.targetId >= 0 && a.targetId < 5) {
                    if (a.targetId == a.sourceId) var b = X(a.file.id, a.file.t);
                    else a.sourceId >= 0 && a.sourceId < 5 && (b = X(a.file.id, a.file.t)) && da(b, a.sourceId, a.sourcePosition), b = t(a.file, q[a.targetId].getIconContainer(), a.targetId);
                    b && $(b, a)
                } else a.sourceId >= 0 && a.sourceId < 5 && (b = X(a.file.id, a.file.t)) && da(b, a.sourceId, a.sourcePosition)
            },
            onFileAdd: function (a) {
                var b = a.parent.id;
                if (b >= 0 && b < 5) {
                    var c = {
                        targetId: b,
                        targetPosition: a.position,
                        sourceId: -1,
                        sourcePosition: -1
                    };
                    (a = t(a.file, q[b].getIconContainer(), b)) && $(a, c)
                }
            },
            onFileDelete: function (a) {
                var b = a.parent.id;
                if (b >= 0 && b < 5) {
                    var c = X(a.file.id, a.file.t);
                    c && da(c, b, a.position)
                }
            },
            onFileOperateTimeout: function () {
                alloy.layout.alert("\u64cd\u4f5c\u8d85\u65f6\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u3002")
            },
            onFileOperateError: function () {
                alloy.layout.alert("\u64cd\u4f5c\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u3002")
            },
            onAddFileFail: function (a) {
                a.retcode == 0 && a.result && a.result.code == 30001 ? alloy.storage.storageFullAlert() : alloy.layout.alert("\u6dfb\u52a0\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u3002")
            },
            onCopyFileFail: function (a) {
                a.retcode == 0 && a.result && a.result.code == 30001 ? alloy.storage.storageFullAlert() : alloy.layout.alert("\u590d\u5236\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u3002")
            },
            onMoveFileFail: function (a) {
                a.retcode == 0 && a.result && a.result.code == 30001 ? alloy.storage.storageFullAlert() : alloy.layout.alert("\u79fb\u52a8\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u3002")
            },
            onUpdateFileFail: function () {
                alloy.layout.alert("\u66f4\u65b0\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u3002")
            },
            onDeleteFileFail: function () {
                alloy.layout.alert("\u5220\u9664\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u3002")
            },
            onDesktopResize: function () {
                var a = alloy.layout.getAvailableWidth(),
                    c = alloy.layout.getAvailableHeight(),
                    a = {
                        width: a,
                        height: c
                    };
                if (a.width) {
                    var c = alloy.layout.getAreaWidth("left"),
                        f = alloy.layout.getAreaWidth("right");
                    F = a.width;
                    H = F + c + f;
                    d.setStyle(l, "width", F + "px");
                    for (var f = 0, e = q.length; f < e; ++f) c = q[f], d.setStyle(c.getIconContainer(), "width", a.width - 28 + "px"), d.setStyle(c.getIconContainer(), "marginLeft", "28px"), b.browser.engine.webkit && d.setStyle(c.getElement(), "left", H + "px"), d.setStyle(c.getElement(), "width", a.width + "px")
                }
                if (a.height) {
                    r = a.height - alloy.layout.getAreaHeight("bottom");
                    d.setStyle(l, "height", r + "px");
                    f = 0;
                    for (e = q.length; f < e; ++f) d.setStyle(q[f].getIconContainer(), "height", r - 46 + "px"), d.setStyle(q[f].getIconContainer(), "marginTop", "46px"), d.setStyle(q[f].getElement(), "height", r + "px")
                }
                d.setStyle(j, "left", alloy.layout.getAreaWidth("left") + "px");
                d.setStyle(j, "right", alloy.layout.getAreaWidth("right") + "px");
                a = r - 46;
                m = Math.floor((F - 28) / D);
                x = Math.floor(a / E);
                fa()
            },
            onDockLocationChanged: function () {
                var a = alloy.layout.getAreaHeight("top");
                d.setStyle(l, "top", a + "px");
                B.onDesktopResize()
            },
            onSortControllerDragEnd: function (a) {
                alloy.util.report2qqweb("screen|screendrag");
                C === g.DRAG && S(g.NORMAL);
                var b = a.apperceiveEl,
                    a = b.getAttribute("fileId"),
                    b = b.getAttribute("type");
                if (a && b && (a = {
                    id: a,
                    t: b
                }, (a = alloy.fileSystem.getFileByFile(a)) && a.processing)) if (a = alloy.iconFactory.getIcons(a.id, a.t)) for (var b = 0, c = a.length; b < c; b++) a[b].disable()
            },
            onSortControllerDragStart: function () {
                S(g.DRAG)
            },
            onUACReady: function () {
                L(ga() - 1, !0);
                ha(ia())
            }
        },
        L = function (a, f) {
            if (a === u || M(a) || !q[a]) return !1;
            if (v && !v[a]) {
                var e = alloy.fileSystem.getFolderById(a);
                aa(e.items, e.id)
            }
            e = a > u ? 1 : 2;
            M(u) || q[u].setNotCurrent(e, f);
            u = a;
            q[a].setCurrent(e, f);
            b.browser.ie == 6 && d.setStyle(document.body, "height", d.getStyle(document.body, "height"));
            z[a] && Y(a);
            c.notifyObservers(alloy.portal, "DesktopSwitch", u);
            return !0
        },
        V = function () {
            var a = u + 1;
            a >= q.length || L(a)
        },
        T = function () {
            var a = u - 1;
            a < 0 ? alloy.portal.isWebTop() && alloy.portal.switchToDesktop() : L(a)
        },
        S = function (b) {
            b = b || g.NORMAL;
            if (b === g.EDIT) {
                if (C === g.DRAG) return;
                d.addClass(j, "appButtonEditState");
                for (var f = 0, e = a.length; f < e; ++f) a[f].setAttribute("title", "\u8fd4\u56de"), a[f].lastChild.firstChild.innerHTML = "\u8fd4\u56de";
                p.lock()
            } else if (b === g.NORMAL) {
                d.removeClass(j, "appButtonEditState");
                f = 0;
                for (e = a.length; f < e; ++f) a[f].setAttribute("title", "\u6dfb\u52a0"), a[f].lastChild.firstChild.innerHTML = "\u6dfb\u52a0"
            }
            b !== g.EDIT && p.isLock() && p.unlock();
            C = b;
            c.notifyObservers(alloy.portal, "DesktopSwitchStatus", {
                status: b
            });
            return b
        },
        U = document.createElement("div");
    U.className = "appButton addQuickLinkButton";
    U.setAttribute("title", "\u6dfb\u52a0");
    U.innerHTML = '<div class="addQuickLinkButtonInner"></div>        <div class="appButton_appName"><div class="appButton_appName_inner">\u6dfb\u52a0</div><div class="appButton_appName_inner_right"></div></div>';
    var Z = function (a) {
            a.stopPropagation();
            C === g.EDIT ? (S(g.NORMAL), alloy.util.report2qqweb("screen|ipad|edited")) : (alloy.layout.showContextMenu({
                x: a.clientX,
                y: a.clientY
            }, {
                items: R
            }), alloy.util.report2qqweb("add|add|" + alloy.desktopManager.getCurrentDesktopIndex()))
        },
        t = function (a, c) {
            var d = {
                parentNode: c
            },
                f;
            if (a.t == A.APP) {
                var e = a.id;
                f = alloy.appconfig.getAppConfig(e);
                if (!f) return b.profile('createFileIcon. id="' + e + '" appConfig is null', "DesktopManager"), alloy.fileSystem.deleteFile(a, null, null, null, !1), null;
                f = alloy.iconFactory.createIcon(a.t, d, f)
            } else if (a.t == A.BUDDY || a.t == A.GROUP) f = alloy.iconFactory.createIcon(a.t, d, a);
            else if (a.t == A.FOLDER || a.t == A.FILE) f = alloy.iconFactory.createIcon(a.t, d, a);
            f && (w[f.getId()] = f, p.addDragClass(f.getElement()));
            return f
        },
        $ = function (a, b) {
            var c = b.targetId,
                d = b.targetPosition,
                e = b.sourcePosition,
                g = -1;
            b.sourceId == c ? (f[c].splice(e, 1), f[c].splice(d, 0, a.getId()), e > d ? (g = e, e = d) : g = d) : (e = d, f[c].splice(d, 0, a.getId()));
            Y(c, e, g)
        },
        aa = function (a, c, g) {
            typeof progress == "function" && progress("screen:" + c);
            if (!v[c]) {
                v[c] = !0;
                var h = q[c].getIconContainer();
                d.hide(h);
                var k = new b.fx.Animation({
                    element: h,
                    property: "opacity",
                    from: 0,
                    to: 1,
                    unit: !1,
                    duration: 2E3,
                    fps: 30,
                    transition: e.sinusoidal.easeOut
                });
                n[c] = new b.Chunk(a, function (a) {
                    a && (a = t(a, h, c)) && f[c].push(a.getId())
                }, this, !1, function () {
                    fa();
                    setTimeout(function () {
                        b.browser.ie == 7 || b.browser.ie == 6 ? d.show(h) : (d.setStyle(h, "opacity", 0), d.show(h), k.start())
                    }, 500);
                    g && g()
                })
            }
        },
        da = function (a, b, c) {
            f[b].splice(c, 1);
            a = w[a.getId()];
            delete w[a.getId()];
            a.destroy();
            Y(b, c)
        },
        ea = function () {
            for (var a = 0, b = q.length; a < b; ++a) f[a].length = 0;
            for (a in w) b = w[a], w[a] = null, delete w[a], b.destroy && b.destroy()
        },
        X = function (a, b) {
            typeof b !== "undefined" && (a = b + "_" + a);
            return w[a]
        },
        ba = {},
        fa = function () {
            for (var a = 0, b = q.length; a < b; ++a) ba["" + a] ||
            function (a) {
                ba[a] = setTimeout(function () {
                    Y(a);
                    ba["" + a] = null
                }, 500)
            }(a)
        },
        ca = function (a, b, c) {
            var f = o || (o = d.getWidth(a)),
                e = h || (h = d.getHeight(a)),
                b = (D - f) / 2 + b,
                c = (E - e) / 2 + c;
            d.setStyle(a, "left", b + "px");
            d.setStyle(a, "top", c + "px")
        },
        Y = function (b, c, d) {
            var c = 0,
                d = -1,
                e = f[b],
                g = e.length;
            if (g == 0) ca(a[b], 0, 0);
            else {
                c !== void 0 ? c > g - 1 && (c = g - 1) : c = 0;
                if (d == void 0 || d == -1 || d > g - 1) d = g - 1;
                var t = Math.floor(c / x) * D,
                    h = c % x * E,
                    k = x * m <= c + 1;
                k && (t = c % m * D, h = Math.floor(c / m) * E);
                for (; c <= d; c++) if (k = e[c], k != void 0 && (k = X(k))) ca(k.getElement(), t, h), (k = x * m <= c + 1) ? (c + 1) % m == 0 ? (t = 0, h += E) : t += D : (c + 1) % x == 0 ? (h = 0, t += D) : h += E;
                d == g - 1 && ca(a[b], t, h);
                y[b] && y[b].update(b);
                z[b] = 0
            }
        },
        ga = function () {
            return alloy.config.configList.defaultScreen || 3
        },
        ia = function () {
            return alloy.config.configList.desktopIconStyle || 0
        },
        ha = function (a, b, f) {
            alloy.config.configList.desktopIconStyle = a;
            a == 0 ? (D = 142, E = 112, d.removeClass(l, "desktopSmallIcon")) : (E = D = 90, d.addClass(l, "desktopSmallIcon"));
            var e = r - 46;
            m = Math.floor((F - 28) / D);
            x = Math.floor(e / E);
            h = o = 0;
            z = [1, 1, 1, 1, 1];
            Y(u);
            b && alloy.portal.getLoginLevel() > alloy.CONST.LOGIN_LEVEL_NONE && (f ? alloy.rpcService.sendMSetConfigDelay({
                data: {
                    0: {
                        desktopIconStyle: a
                    }
                },
                delay: f
            }) : alloy.rpcService.sendSetConfig({
                data: {
                    r: {
                        appid: 0,
                        value: {
                            desktopIconStyle: a
                        }
                    }
                }
            }));
            c.notifyObservers(alloy.desktopManager, "DesktopIconStyleChanged", a)
        };
    this.init = function (e) {
        var g = e.initializeLength || 5,
            e = e.currentDesktopIndex || Math.floor(g / 2);
        j = alloy.layout.getArea("main");
        j.innerHTML = '            <div id="desktopsContainer"></div>';
        l = d.id("desktopsContainer");
        d.setClass(l, "desktopsContainer");
        p = new b.ui.Sortables([], "id");
        var t;
        q = [];
        for (var h = 0; h < g; ++h) {
            t = new P({
                index: h,
                appendTo: l
            });
            q.push(t);
            p.addDropTarget({
                el: t.getIconContainer(),
                level: 0
            });
            f[h] = [];
            t = h;
            var k = U.cloneNode(!0);
            k.setAttribute("screen", t);
            q[t].getIconContainer().appendChild(k);
            c.on(k, "click", Z);
            a.push(k)
        }
        L(e, !0);
        c.addObserver(p, "start", B.onSortControllerDragStart);
        c.addObserver(p, "end", B.onSortControllerDragEnd);
        c.addObserver(alloy.layout, "desktopResize", B.onDesktopResize);
        c.addObserver(alloy.dock, "DockLocationChanged", B.onDockLocationChanged);
        c.addObserver(alloy.appconfig, "GetAppConfigComplete", B.onGetAppConfigComplete);
        c.addObserver(alloy.appconfig, "GetDefaultAppConfigComplete", B.onGetAppConfigComplete);
        c.addObserver(alloy.appconfig, "ClearDefaultApp", B.onClearDefaultApp);
        c.addObserver(alloy.fileSystem, "FileMove", B.onFileMove);
        c.addObserver(alloy.fileSystem, "FileAdd", B.onFileAdd);
        c.addObserver(alloy.fileSystem, "FileDelete", B.onFileDelete);
        c.addObserver(alloy.fileSystem, "FileOperateTimeout", B.onFileOperateTimeout);
        c.addObserver(alloy.fileSystem, "FileOperateError", B.onFileOperateError);
        c.addObserver(alloy.fileSystem, "AddFileFail", B.onAddFileFail);
        c.addObserver(alloy.fileSystem, "CopyFileFail", B.onCopyFileFail);
        c.addObserver(alloy.fileSystem, "DeleteFileFail", B.onDeleteFileFail);
        c.addObserver(alloy.fileSystem, "MoveFileFail", B.onMoveFileFail);
        c.addObserver(alloy.fileSystem, "UpdateFileFail", B.onUpdateFileFail);
        c.addObserver(alloy.portal, "UACReady", B.onUACReady)
    };
    this.DESK_STATUS = g;
    this.setCurrentDesktop = L;
    this.goNextDesktop = V;
    this.goPrevDesktop = T;
    this.refreshDesktop = function () {
        p.refreshDropTarget()
    };
    this.getDesktop = function (a) {
        return q[a]
    };
    this.getDesktopList = function () {
        return q
    };
    this.getCurrentDesktopIndex = function () {
        return u
    };
    this.getCurrentDesktop = function () {
        return q[u]
    };
    this.setDesktopStatus = S;
    this.getDesktopStatus = function () {
        return C
    };
    this.getDragController = function () {
        return p
    };
    this.getDefaultDesktop = ga;
    this.setDefaultDesktop = function (a, b, c) {
        a = Number(a);
        if (b && alloy.portal.getLoginLevel() > alloy.CONST.LOGIN_LEVEL_NONE) alloy.config.configList.defaultScreen = a, c ? alloy.rpcService.sendMSetConfigDelay({
            data: {
                0: {
                    defaultScreen: a
                }
            },
            delay: c
        }) : alloy.rpcService.sendSetConfig({
            data: {
                r: {
                    appid: 0,
                    value: {
                        defaultScreen: a
                    }
                }
            }
        })
    };
    this.getDesktopIconStyle = ia;
    this.setDesktopIconStyle = ha
});