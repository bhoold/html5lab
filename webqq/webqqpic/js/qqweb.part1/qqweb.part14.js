Jx().$package("alloy.windowFactory", function (b) {
    var d = this,
        c = b.dom,
        e = b.event,
        g, j, l, q, u, p = {
            onDesktopResize: function () {
                var b, c = alloy.windowManager.getWindowList(),
                    d;
                for (d in c) {
                    b = c[d];
                    var a = b.getBoxStatus();
                    if (a == "max" || a == "fullscreen") a: {
                        var f = void 0,
                            e = void 0,
                            g = void 0,
                            j = a = void 0,
                            j = e = f = a = g = void 0,
                            j = b.getBoxStatus(),
                            g = alloy.layout.getAreaWidth("left"),
                            a = alloy.layout.getAreaHeight("top"),
                            f = alloy.layout.getClientWidth(),
                            e = alloy.layout.getClientHeight();
                        if (j == "fullscreen") j = 5, f += j * 2, e += j * 2, g = -g - j, a = -a - j;
                        else if (j == "max") j = 10, f += j * 2, e += j * 2, g = -g - j, a = -a - j;
                        else break a;
                        (b.windowType == "window" || b.windowType == "chatbox" || b.windowType == "messagebox") && b.adjustSize(f, e, g, a)
                    } else b.getY() < 0 && b.setY(0)
                }
            },
            onWindowSetCenter: function () {
                var b = alloy.layout.getClientWidth(),
                    c = alloy.layout.getClientHeight(),
                    b = b > this.getWidth() ? (b - this.getWidth()) / 2 : 0,
                    c = c > this.getHeight() ? (c - this.getHeight()) / 2 : 0;
                this.setXY(b, c)
            },
            onWindowSetCurrent: function () {
                alloy.windowManager.setCurrentWindow(this);
                x(this);
                this.subMode == 1 && this.isSubWinFloat && this.subWin && x(this.subWin)
            },
            onWindowTitleBarClick: function () {
                g && g.focus()
            },
            onWindowDestroy: function () {
                alloy.app.gravity && alloy.app.gravity.removeBox(this);
                j && c.hide(j);
                b.platform.iPad || g && g.focus()
            },
            onWindowResize: function () {
                alloy.app.gravity && alloy.app.gravity.resizeBox(this);
                if (this.subMode == 1 && this.isSubWinFloat && this.subWin && this.isShow()) {
                    b.info("subWindowResize", "subWindow");
                    var d = c.getRelativeXY(this._subBodyOuter, this.container.parentNode);
                    this.subWin.setXY(d[0], d[1] + (b.browser.ie ? 2 : 0))
                }
            },
            onWindowMax: function () {
                var b = alloy.layout.getClientWidth(),
                    c = alloy.layout.getClientHeight(),
                    d = alloy.layout.getAreaWidth("left"),
                    a = alloy.layout.getAreaHeight("top");
                this.setXY(-d - 10, -a - 10);
                this.setWinWidth(b + 20);
                this.setWinHeight(c + 20)
            },
            onWindowRestore: function () {},
            onWindowFullscreen: function () {
                var d = alloy.layout.getClientWidth(),
                    e = alloy.layout.getClientHeight(),
                    g = alloy.layout.getAreaWidth("left"),
                    a = alloy.layout.getAreaHeight("top");
                this.setXY(-g - 5, -a - 5);
                this.setWinWidth(d + 10);
                this.setWinHeight(e + 10);
                this.setZIndexLevel(3);
                x(this);
                b.browser.mobileSafari || (j || (j = c.node("div", {
                    id: "fullscreen_tip",
                    "class": "fullscreen_tip"
                }), document.body.appendChild(j)), c.setStyle(j, "zIndex", alloy.layout.getTopZIndex(3)), c.show(j), this.subMode == 1 && this.isSubWinFloat && this.subWin && this.isShow() && (this.subWin.setZIndexLevel(3), x(this.subWin)), setTimeout(function () {
                    c.hide(j)
                }, 3E3))
            },
            onWindowRestoreFull: function () {
                this.setZIndexLevel(0);
                x(this);
                this.subMode == 1 && this.isSubWinFloat && this.subWin && this.isShow() && (this.subWin.setZIndexLevel(0), x(this.subWin))
            },
            onWindowHide: function () {
                this.subMode == 1 && this.isSubWinFloat && this.subWin && this.subWin.hide(!0)
            },
            onWindowShow: function () {
                if (this.subMode == 1 && this.isSubWinFloat && this.subWin) {
                    var d = c.getRelativeXY(this._subBodyOuter, this.container.parentNode);
                    this.subWin.setXY(d[0], d[1] + (b.browser.ie ? 2 : 0));
                    this.subWin.show()
                }
            },
            onWindowSetRight: function () {
                var b = this.getBodySize()[0];
                this.setX(alloy.layout.getClientWidth() - b)
            },
            onWindowBeforeDragStart: function () {
                var b = -10 - alloy.layout.getAreaHeight("top"),
                    c = -this.getTitleBarHeight() - this.getHeight();
                this.setDragLimite({
                    topMargin: b,
                    bottomMargin: c
                })
            }
        },
        v = function (c) {
            if (c) {
                var d = c.option || {};
                d.isSetCurrent ? c.setCurrent({
                    fromInit: !0
                }) : c.setNotCurrent({
                    fromInit: !0
                });
                var e = alloy.layout.getAvailableWidth(),
                    a = alloy.layout.getAvailableHeight(),
                    f = c.getWidth(),
                    g = c.getHeight();
                c.getX();
                c.getY();
                g > a && (g = a);
                f > e && (f = e);
                if (c.windowType == "window" || c.windowType == "chatbox" || c.windowType == "messagebox") c.setWinWidth(f), c.setWinHeight(g);
                b.isUndefined(d.defaultMode) || c.restore();
                switch (d.defaultMode) {
                case "max":
                    c.max();
                    c._restoreWidth = d.defaultWidth;
                    c._restoreHeight = d.defaultHeight;
                    break;
                case "min":
                    c.min();
                    break;
                case "fullscreen":
                    c.fullscreen()
                }
                if (alloy.app.gravity) c.b2Box = alloy.app.gravity.createBox(c);
                d.isSetCentered && c.setWindowCentered()
            }
        },
        x = function (b) {
            if (!b.isLockZIndex()) {
                var c = b.getZIndexLevel() || 0,
                    c = alloy.layout.getTopZIndex(c);
                b.setZIndex(c)
            }
        };
    this.init = function () {
        l = {};
        q = 0;
        u = !1;
        g || (g = c.node("input", {
            id: "qqweb_focus_input"
        }), g.setAttribute("type", "text"), document.body.appendChild(g));
        e.addObserver(alloy.layout, "desktopResize", p.onDesktopResize);
        e.addObserver(alloy.dock, "DockLocationChanged", p.onDesktopResize)
    };
    this.createWindow = function (g, j, h) {
        var a = l[g],
            j = b.clone(j);
        j.level = j.level ? parseInt(j.level) : 0;
        j.dragProxy = j.dragProxy || u;
        j.zIndex = j.zIndex || alloy.layout.getTopZIndex();
        j.topMargin = j.bottomMargin = 0;
        if (a) {
            if (!j.appendTo) {
                if (b.isUndefined(j.desktopIndex)) j.desktopIndex = alloy.desktopManager.getCurrentDesktopIndex();
                g = alloy.desktopManager.getDesktop(j.desktopIndex).getElement();
                j.appendTo = g
            }
            j.windowId = j.windowId || q++;
            a = new a(j);
            e.notifyObservers(d, "WindowCreate", a);
            a.setZIndexLevel(j.level);
            a.setLockZIndex(j.lockZIndex || !1);
            e.addObserver(a, "setCenter", p.onWindowSetCenter);
            e.addObserver(a, "setCurrent", p.onWindowSetCurrent);
            e.addObserver(a, "clickTitleBar", p.onWindowTitleBarClick);
            e.addObserver(a, "destroy", p.onWindowDestroy);
            e.addObserver(a, "resize", p.onWindowResize);
            e.addObserver(a, "hide", p.onWindowHide);
            e.addObserver(a, "show", p.onWindowShow);
            e.addObserver(a, "beforeDragStart", p.onWindowBeforeDragStart);
            e.addObserver(a, "SetRight", p.onWindowSetRight);
            (a.windowType == "window" || a.windowType == "chatbox" || a.windowType == "messagebox") && e.addObserver(a, "max", p.onWindowMax);
            if (b.isUndefined(j.x) && b.isUndefined(j.y)) {
                var f, n;
                n = f = 0;
                var j = a.option.clientWidth || alloy.layout.getAvailableWidth(),
                    g = a.option.clientHeight || alloy.layout.getAvailableHeight(),
                    s = j - a.getWidth(),
                    w = g - a.getHeight(),
                    x = s > 0 ? s / 2 : 0,
                    y = w > 0 ? w / 2 : 0,
                    z = a.getId(),
                    z = alloy.windowManager.getWindowList().length == 1 ? 0 : z < 0 ? 0 : z;
                f = (x + z * 25) % s + f;
                n = (y + z * 25) % w + n;
                f = f > 0 ? f : 0;
                n = n > 0 ? n : 0;
                f = f + parseInt(a.getWidth()) >= j ? 0 : f;
                n = n + parseInt(a.getHeight()) >= g ? 0 : n;
                a.setXY(f, n)
            } else n = alloy.layout.getAvailableWidth(), j = alloy.layout.getAvailableHeight(), w = a.getX() || 0, g = a.getY() || 0, w + a.getWidth() > n && (n -= a.getWidth(), a.setX(n < 0 ? 0 : n)), g + a.getHeight() > j && (j -= a.getHeight(), a.setY(j < 0 ? 0 : j)), a.subMode == 1 && a.isSubWinFloat && a.subWin && (j = c.getRelativeXY(a._subBodyOuter, a.container.parentNode), a.subWin.setXY(j[0], j[1] + (b.browser.ie ? 2 : 0)), a.subWin.show());
            h || v(a);
            e.notifyObservers(d, "WindowCreated", a);
            return a
        } else throw Error('WindowFactory: class "' + g + '" has not register!');
    };
    this.registerWindow = function (b, c) {
        l[b] = c
    };
    this.initWindow = v
});