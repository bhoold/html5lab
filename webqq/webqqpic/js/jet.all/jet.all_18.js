Jx().$package(function (d) {
    var b = d.dom,
        i = d.event,
        j = function (a) {
            a.preventDefault()
        },
        a = !1,
        e = !1,
        h, g, f = !1,
        n = !1,
        k, p, o, c, m, r, v;
    d.ui.Drag = new d.Class({
        init: function (x, t, u) {
            var l = this,
                y, z, B, w;
            this.apperceiveEl = x;
            u = u || {};
            this.isLimited = u.isLimited || !1;
            this.dragType = u.dragType;
            this.isLocked = u.isLocked || !1;
            this.isLockCursorInScreen = u.isLockCursorInScreen || !1;
            var q = !1;
            if (this.isLimited) this._leftMargin = u.leftMargin || 0, this._topMargin = u.topMargin || 0, this._rightMargin = u.rightMargin || 0, this._bottomMargin = u.bottomMargin || 0;
            if (u.xOnly) this._xOnly = u.xOnly || !1;
            if (u.yOnly) this._yOnly = u.yOnly || !1;
            this.effectEl = t === !1 ? !1 : t || x;
            this.dragStart = function (a) {
                if (a.changedTouches) {
                    if (a.changedTouches.length > 1) return;
                    a = a.changedTouches[0];
                    document.body.style.WebkitTouchCallout = "none"
                } else a.preventDefault(), a.stopPropagation();
                l.dragStartIn(a.pageX, a.pageY)
            };
            this.dragStartIn = function (q, x) {
                if (!l.isLocked) {
                    i.notifyObservers(l, "beforeStart");
                    i.notifyObservers(document, "beforeStart");
                    h = b.getClientWidth();
                    g = b.getClientHeight();
                    a = u.clientEl ? b.getClientWidth(u.clientEl) : h;
                    e = u.clientEl ? b.getClientHeight(u.clientEl) : g;
                    f = l.effectEl ? parseInt(b.getClientWidth(l.effectEl)) : 0;
                    n = l.effectEl ? parseInt(b.getClientHeight(l.effectEl)) : 0;
                    if (l.isLimited) k = a - f - l._rightMargin, p = l._leftMargin, o = l._topMargin, c = e - n - l._bottomMargin;
                    v || (v = new d.ui.MaskLayer({
                        opacity: 0
                    }));
                    v.setZIndex(9E6);
                    v.show();
                    l._oldX = y = l.effectEl ? parseInt(b.getStyle(l.effectEl, "left")) || 0 : 0;
                    l._oldY = z = l.effectEl ? parseInt(b.getStyle(l.effectEl, "top")) || 0 : 0;
                    B = q;
                    w = x;
                    if (d.browser.mobileSafari) {
                        i.on(document, "touchmove", l.dragMove);
                        i.on(document, "touchend", l.dragStop);
                        var t = new WebKitCSSMatrix(window.getComputedStyle(l.apperceiveEl).webkitTransform);
                        m = q - t.m41;
                        r = x - t.m42
                    } else i.on(document, "mousemove", l.dragMove), i.on(document, "mouseup", l.dragStop);
                    if (d.browser.ie) i.on(document.body, "selectstart", j);
                    d.browser.mobileSafari ? i.notifyObservers(l, "start", {
                        x: q,
                        y: x
                    }) : i.notifyObservers(l, "start", {
                        x: y,
                        y: z
                    })
                }
            };
            this.dragMove = function (a) {
                if (!l.isLocked) {
                    a.browserEvent ? (a.browserEvent.preventDefault(), a.browserEvent.stopPropagation()) : (a.preventDefault(), a.stopPropagation());
                    a.changedTouches && (a = a.changedTouches[0]);
                    var b, e, f = a.pageX,
                        j = a.pageY;
                    l.isLockCursorInScreen && (f < 0 ? f = 0 : f > h && (f = h), j < 0 ? j = 0 : j > g && (j = g));
                    d.browser.mobileSafari || (b = y + (f - B), e = z + (j - w));
                    l.isLimited && (b > k && !u.isOverRight && (b = k), b < p && !u.isOverLeft && (b = p));
                    if (l._oldX !== b && !l._yOnly) {
                        l._oldX = b;
                        if (l.effectEl && !d.browser.mobileSafari) l.effectEl.style.left = b + "px";
                        q = !0
                    }
                    l.isLimited && (e > c && !u.isOverBottom && (e = c), e < o && !u.isOverTop && (e = o));
                    if (l._oldY !== e && !l._xOnly) {
                        l._oldY = e;
                        if (l.effectEl && !d.browser.mobileSafari) l.effectEl.style.top = e + "px";
                        q = !0
                    }
                    if (l.effectEl && d.browser.mobileSafari) l._oldX = y + (f - B), l._oldY = z + (j - w), b = l._yOnly ? y : f - m, e = l._xOnly ? z : j - r, l.effectEl.style.webkitTransform = "translate3d(" + b + "px, " + e + "px, 0px)", b = f, e = j;
                    q && i.notifyObservers(l, "move", {
                        x: b,
                        y: e,
                        orientEvent: a
                    })
                }
            };
            this.dragStop = function (g) {
                v.hide();
                if (!l.isLocked) {
                    document.body.style.WebkitTouchCallout = "auto";
                    if (q || d.browser.mobileSafari) {
                        var h = l._oldX,
                            m = l._oldY;
                        l.isLimited && (h > k && !u.isOverRight && (h = k), h < p && !u.isOverLeft && (h = p));
                        l.isLimited && (m > c && !u.isOverBottom && (m = c), m < o && !u.isOverTop && (m = o));
                        if (d.browser.mobileSafari) {
                            g.preventDefault();
                            if (u.noEndCallback && l.effectEl) l.effectEl.style.webkitTransform = "none", b.setStyle(l.effectEl, "left", h + "px"), b.setStyle(l.effectEl, "top", m + "px");
                            i.notifyObservers(l, "end", {
                                x: h,
                                y: m,
                                orientEvent: g.changedTouches[0]
                            })
                        } else i.notifyObservers(l, "end", {
                            x: h,
                            y: m,
                            orientEvent: g
                        })
                    } else i.notifyObservers(l, "end", {
                        orientEvent: g
                    });
                    if (l.isLimited && (l.isOverRight || l.isOverLeft || l.isOverTop || l.isOverBottom)) {
                        var h = y + (g.pageX - B),
                            m = z + (g.pageY - w),
                            g = l._leftMargin,
                            r = e - l._bottomMargin,
                            x = l._topMargin;
                        (h > a - f - l._rightMargin || h < g || m > r || m < x) && i.notifyObservers(l, "overFlowBorder", {
                            x: h,
                            y: m
                        })
                    }
                    n = f = e = a = !1;
                    d.browser.mobileSafari ? (i.off(document, "touchmove", l.dragMove), i.off(document, "touchend", l.dragStop)) : (i.off(document, "mousemove", l.dragMove), i.off(document, "mouseup", l.dragStop));
                    d.browser.ie && i.off(document.body, "selectstart", j);
                    q = !1
                }
            };
            i.on(this.apperceiveEl, "drag", this.dragStart)
        },
        setEffect: function (a) {
            this.effectEl = a
        },
        lock: function () {
            this.isLocked = !0;
            i.off(this.apperceiveEl, "drag", this.dragStart)
        },
        unlock: function () {
            this.isLocked = !1;
            i.on(this.apperceiveEl, "drag", this.dragStart)
        },
        show: function () {
            b.show(this.apperceiveEl)
        },
        hide: function () {
            b.hide(this.apperceiveEl)
        },
        setLimite: function (a) {
            a = a || {};
            this.isLimited = a.isLimited || !0, this._leftMargin = a.leftMargin || 0, this._topMargin = a.topMargin || 0, this._rightMargin = a.rightMargin || 0, this._bottomMargin = a.bottomMargin || 0
        }
    })
});