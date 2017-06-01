Jx().$package(function (d) {
    var b, i, j, a, e, h, g = [], f, n, k, p, o;
    d.event = d.event || {};
    b = d.event;
    o = function (c, a) {
        if (!c) c = window.event;
        var a = a || c.srcElement,
            b = document,
            e = b.documentElement,
            b = b.body,
            e = {
                _event: c,
                type: c.type,
                target: c.srcElement,
                currentTarget: a,
                relatedTarget: c.fromElement ? c.fromElement : c.toElement,
                eventPhase: c.srcElement == a ? 2 : 3,
                clientX: c.clientX,
                clientY: c.clientY,
                screenX: c.screenX,
                screenY: c.screenY,
                layerX: c.offsetX,
                layerY: c.offsetY,
                pageX: c.clientX + (e && e.scrollLeft || b && b.scrollLeft || 0) - (e && e.clientLeft || b && b.clientLeft || 0),
                pageY: c.clientY + (e && e.scrollTop || b && b.scrollTop || 0) - (e && e.clientTop || b && b.clientTop || 0),
                wheelDelta: c.wheelDelta || -40 * (c.detail || 0),
                altKey: c.altKey,
                ctrlKey: c.ctrlKey,
                shiftKey: c.shiftKey,
                charCode: c.keyCode,
                keyCode: c.keyCode,
                stopPropagation: function () {
                    this._event.cancelBubble = !0
                },
                preventDefault: function () {
                    this._event.returnValue = !1
                }
            },
            b = c.type.toLowerCase();
        if (b == "mouseover") e.relatedTarget = c.fromElement;
        else if (b == "mouseout") e.relatedTarget = c.toElement;
        if (!d.isUndefined(c.button)) {
            var b = c.button,
                f = {
                    0: -1,
                    1: 0,
                    2: 2,
                    3: -1,
                    4: 1
                };
            e.button = d.isUndefined(f[b]) ? b : f[b]
        }
        return e
    };
    d.browser.ie ? (i = function (c, a, b, d) {
        if (h["on" + a]) h["on" + a](c, a, b, d);
        else j(c, a, b)
    }, j = function (c, a, d) {
        if (b._find(arguments) == -1) {
            var e = function (a) {
                    a = o(a, c);
                    Function.prototype.call ? d.call(c, a) : (c._currentHandler = d, c._currentHandler(a), c._currentHandler = null)
                };
            c.attachEvent("on" + a, e);
            var e = {
                element: c,
                eventType: a,
                handler: d,
                wrappedEvent: e
            },
                f = (c.document || c).parentWindow || window,
                g = b._uid();
            if (!f._allHandlers) f._allHandlers = {};
            f._allHandlers[g] = e;
            if (!c._handlers) c._handlers = [];
            c._handlers.push(g);
            if (!f._onunloadEventRegistered) f._onunloadEventRegistered = !0, f.attachEvent("onunload", b._removeAllEvents)
        }
    }, a = function (c, a, b) {
        if (h["off" + a]) h["off" + a](c, a, b);
        else arguments.length == 3 ? e(c, a, b) : e(c, a)
    }, e = function (c, a, d) {
        var e = b._find(arguments);
        if (e != -1) {
            for (var f = (c.document || c).parentWindow || window, g = 0; g < e.length; g++) {
                var i = e[g],
                    h = c._handlers[i],
                    j = f._allHandlers[h];
                c.detachEvent("on" + j.eventType, j.wrappedEvent);
                c._handlers[i] = null;
                c._handlers.splice(i, 1);
                delete f._allHandlers[h]
            }
            if (c._handlers && c._handlers.length == 0) c._handlers = null
        }
    }, b._find = function (c) {
        var a = c[0],
            b = c[1],
            d = c[2],
            e = a._handlers;
        if (!e) return -1;
        var a = (a.document || a).parentWindow || window,
            f = [];
        if (c.length === 3) for (c = e.length - 1; c >= 0; c--) {
            var g = e[c],
                g = a._allHandlers[g];
            if (g.eventType == b && g.handler == d) return f.push(c), f
        } else if (c.length === 2) {
            for (c = e.length - 1; c >= 0; c--) g = e[c], g = a._allHandlers[g], g.eventType == b && f.push(c);
            if (f.length > 0) return f
        } else if (c.length === 1) {
            for (c = e.length - 1; c >= 0; c--) f.push(c);
            if (f.length > 0) return f
        }
        return -1
    }, b._removeAllEvents = function () {
        for (var c in this._allHandlers) {
            var a = this._allHandlers[c];
            a.element.detachEvent("on" + a.eventType, a.wrappedEvent);
            a.element._handlers = null;
            delete this._allHandlers[c]
        }
    }, b._counter = 0, b._uid = function () {
        return "h" + b._counter++
    }) : document.addEventListener && (i = function (c, a, b, d) {
        if (h["on" + a]) h["on" + a](c, a, b, d);
        else j(c, a, b)
    }, j = function (c, a, b) {
        var e = !1;
        c || d.out("targetModel undefined:" + a + b);
        if (!c._eventTypes) c._eventTypes = {};
        c._eventTypes[a] || (c._eventTypes[a] = []);
        c.addEventListener(a, b, !1);
        c = c._eventTypes[a];
        for (a = 0; a < c.length; a++) if (c[a] == b) {
            e = !0;
            break
        }
        e || c.push(b)
    }, a = function (c, a, b) {
        if (h["off" + a]) h["off" + a](c, a, b);
        else arguments.length == 3 ? e(c, a, b) : e(c, a)
    }, e = function (c, a, b) {
        if (a) if (arguments.length == 3) {
            if (b && (c.removeEventListener(a, b, !1), c._eventTypes && c._eventTypes[a])) for (var d = c._eventTypes[a], e = 0; e < d.length; e++) if (d[e] === b) {
                d[e] = null;
                d.splice(e, 1);
                break
            }
        } else {
            if (c._eventTypes && c._eventTypes[a]) {
                d = c._eventTypes[a];
                for (e = 0; e < d.length; e++) c.removeEventListener(a, d[e], !1);
                c._eventTypes[a] = []
            }
        } else if (c._eventTypes) {
            var f = c._eventTypes,
                g;
            for (g in f) {
                d = c._eventTypes[g];
                for (e = 0; e < d.length; e++) c.removeEventListener(g, d[e], !1)
            }
        }
    });
    h = {
        ondrag: function (c, a, e) {
            var f, i, h = !1,
                j = function (a) {
                    if (d.browser.mobileSafari || a.button === 0) d.browser.mobileSafari ? (a.stopPropagation(), a = a.touches[0], f = a.pageX, i = a.pageY) : (a.stopPropagation(), a.preventDefault(), f = a.clientX, i = a.clientY), h = !1, d.browser.mobileSafari ? (b.addEventListener(document, "touchmove", k), b.addEventListener(c, "touchend", o)) : b.addEventListener(document, "mousemove", k)
                },
                k = function (a) {
                    if (d.browser.mobileSafari || a.button === 0) {
                        var m, g;
                        a.stopPropagation();
                        d.browser.mobileSafari ? (g = a.changedTouches[0], m = g.pageX, g = g.pageY) : (m = a.clientX, g = a.clientY);
                        Math.abs(f - m) + Math.abs(i - g) > 2 && (d.browser.mobileSafari ? (b.removeEventListener(document, "touchmove", k), b.removeEventListener(c, "touchend", o)) : b.removeEventListener(document, "mousemove", k), h || (e.call(c, a), h = !0))
                    }
                },
                o = function (c) {
                    if (d.browser.mobileSafari || c.button === 0) d.browser.mobileSafari ? (b.removeEventListener(document, "touchmove", k), h && (c.stopPropagation(), c.preventDefault())) : b.removeEventListener(document, "mousemove", k)
                };
            d.browser.mobileSafari ? b.addEventListener(c, "touchstart", j) : (b.addEventListener(c, "mousedown", j), b.addEventListener(c, "mouseup", o));
            g.push({
                element: c,
                eventType: a,
                handler: e,
                actions: [j, o]
            })
        },
        offdrag: function (c, a, e) {
            for (var f in g) if (g[f].handler == e && g[f].element == c && g[f].eventType == a) {
                d.browser.mobileSafari ? (b.removeEventListener(c, "touchstart", g[f].actions[0]), b.removeEventListener(c, "touchend", g[f].actions[1])) : (b.removeEventListener(c, "mousedown", g[f].actions[0]), b.removeEventListener(c, "mouseup", g[f].actions[1]));
                g.splice(f, 1);
                break
            }
        },
        oncustomclick: function (c, a, e, f) {
            var i, h, j = !1,
                k = !1,
                o, f = f ? f : {},
                n = f.longtouchable,
                p = -1,
                f = function (a) {
                    j = !1;
                    if (d.browser.mobileSafari || a.button === 0) {
                        var m;
                        d.browser.mobileSafari ? (m = a.changedTouches[0], i = m.pageX, h = m.pageY) : (i = a.clientX, h = a.clientY);
                        k = !1;
                        n && (o = setTimeout(function () {
                            !j && !k && (d.browser.mobileSafari ? (b.removeEventListener(c, "touchmove", q), b.removeOriginalEventListener(c, "touchend", A)) : (b.removeEventListener(c, "mousemove", q), b.removeOriginalEventListener(c, "click", A)), e.call(c, a, 2E3))
                        }, 1E3));
                        d.browser.mobileSafari ? (b.addEventListener(c, "touchmove", q), b.addOriginalEventListener(c, "touchend", A)) : (b.addEventListener(c, "mousemove", q), b.addOriginalEventListener(c, "click", A))
                    }
                },
                w = function (c) {
                    p = c.button;
                    if (d.browser.mobileSafari || c.button === 0) d.browser.mobileSafari && (touch = c.changedTouches[0])
                },
                q = function (a) {
                    if (d.browser.mobileSafari) {
                        touch = a.changedTouches[0];
                        var e = touch.pageX,
                            a = touch.pageY
                    } else e = a.clientX, a = a.clientY;
                    if (j = Math.abs(i - e) + Math.abs(h - a) > 1) clearTimeout(o), o = null, d.browser.mobileSafari ? (b.removeEventListener(c, "touchmove", q), b.removeOriginalEventListener(c, "touchend", A)) : (b.removeEventListener(c, "mousemove", q), b.removeOriginalEventListener(c, "click", A))
                },
                A = function (a) {
                    clearTimeout(o);
                    o = null;
                    k = !0;
                    if (d.browser.mobileSafari || p === 0) {
                        var b;
                        if (d.browser.mobileSafari) {
                            b = a.changedTouches[0];
                            var m = b.pageX;
                            b = b.pageY
                        } else m = a.clientX, b = a.clientY;
                        Math.abs(i - m) + Math.abs(h - b) < 1 && (j = !1, e.call(c, a, 0))
                    }
                };
            d.browser.mobileSafari ? b.addEventListener(c, "touchstart", f) : (b.addEventListener(c, "mousedown", f), b.addEventListener(c, "mouseup", w));
            g.push({
                element: c,
                eventType: a,
                handler: e,
                actions: [f, q, w, A]
            })
        },
        offcustomclick: function (c, a, e) {
            for (var f in g) if (g[f].handler == e && g[f].element == c && g[f].eventType == a) {
                d.browser.mobileSafari ? (b.removeEventListener(c, "touchstart", g[f].actions[0]), b.removeEventListener(c, "touchmove", g[f].actions[1]), b.removeOriginalEventListener(c, "touchend", g[f].actions[3])) : (b.removeEventListener(c, "mousedown", g[f].actions[0]), b.removeEventListener(c, "mousemove", g[f].actions[1]), b.removeEventListener(c, "mouseup", g[f].actions[2]), b.removeOriginalEventListener(c, "click", g[f].actions[3]));
                g.splice(f, 1);
                break
            }
        },
        oncontextmenu: function (c, a, e) {
            if (d.browser.ie == 9) {
                var f = function (a) {
                        a = o(a, c);
                        e.call(c, a)
                    };
                c.attachEvent("oncontextmenu", f);
                g.push({
                    element: c,
                    eventType: a,
                    handler: e,
                    actions: [f]
                })
            } else b.addOriginalEventListener(c, a, e)
        },
        offcontextmenu: function (c, a, e) {
            if (d.browser.ie == 9) for (var f in g) {
                if (g[f].handler == e && g[f].element == c && g[f].eventType == a) {
                    c.detachEvent("oncontextmenu", g[f].actions[0]);
                    g.splice(f, 1);
                    break
                }
            } else b.removeOriginalEventListener(c, a, e)
        },
        onmousewheel: function (c, a, e) {
            if (d.browser.firefox) {
                var f = function (a) {
                        a = o(a, c);
                        e.call(c, a)
                    };
                b.addOriginalEventListener(c, "DOMMouseScroll", f);
                g.push({
                    element: c,
                    eventType: a,
                    handler: e,
                    actions: [f]
                })
            } else b.addOriginalEventListener(c, "mousewheel", e)
        },
        offmousewheel: function (c, a, e) {
            if (d.browser.firefox) for (var f in g) {
                if (g[f].handler == e && g[f].element == c && g[f].eventType == a) {
                    b.removeOriginalEventListener(c, "DOMMouseScroll", g[f].actions[0]);
                    g.splice(f, 1);
                    break
                }
            } else b.removeOriginalEventListener(c, "mousewheel", e)
        },
        onmouseenter: function (c, a, d) {
            var e = function (c) {
                    var a = c.relatedTarget;
                    if (a) if (this.compareDocumentPosition) {
                        var b = this.compareDocumentPosition(a);
                        a == this || b == 20 || b == 0 || d.call(this, c)
                    } else a == this || this.contains(a) || d.call(this, c);
                    else d.call(this, c)
                };
            b.addEventListener(c, "mouseover", e);
            g.push({
                element: c,
                eventType: a,
                handler: d,
                actions: [e]
            })
        },
        offmouseenter: function (c, a, d) {
            for (var e in g) if (g[e].handler == d && g[e].element == c && g[e].eventType == a) {
                b.removeEventListener(c, "mouseover", g[e].actions[0]);
                g.splice(e, 1);
                break
            }
        },
        onmouseleave: function (c, a, d) {
            var e = function (c) {
                    var a = c.relatedTarget;
                    a ? this.compareDocumentPosition ? (a = this.compareDocumentPosition(a), a == 20 || a == 0 || d.call(this, c)) : this.contains(a) || d.call(this, c) : d.call(this, c)
                };
            b.addEventListener(c, "mouseout", e);
            g.push({
                element: c,
                eventType: a,
                handler: d,
                actions: [e]
            })
        },
        offmouseleave: function (c, a, d) {
            for (var e in g) if (g[e].handler == d && g[e].element == c && g[e].eventType == a) {
                b.removeEventListener(c, "mouseout", g[e].actions[0]);
                g.splice(e, 1);
                break
            }
        },
        oninput: function (c, a, e) {
            if (d.browser.ie) {
                var f = function (a) {
                        a.propertyName.toLowerCase() == "value" && (a = o(a, c), e.call(c, a))
                    };
                c.attachEvent("onpropertychange", f);
                g.push({
                    element: c,
                    eventType: a,
                    handler: e,
                    actions: [f]
                });
                d.browser.ie == 9 && b.addOriginalEventListener(c, "change", e)
            } else b.addOriginalEventListener(c, "input", e)
        },
        offinput: function (c, a, e) {
            if (d.browser.ie) {
                for (var f in g) if (g[f].handler == e && g[f].element == c && g[f].eventType == a) {
                    c.detachEvent("onpropertychange", g[f].actions[0]);
                    g.splice(f, 1);
                    break
                }
                d.browser.ie == 9 && b.removeOriginalEventListener(c, "change", e)
            } else b.removeOriginalEventListener(c, "input", e)
        }
    };
    f = function (c) {
        if (f.done) return c();
        f.timer ? f.ready.push(c) : (f.ready = [c], b.on(window, "load", n), f.timer = window.setInterval(n, 300))
    };
    n = function () {
        if (f.done) return !0;
        if (document && document.getElementsByTagName && document.getElementById && document.body) {
            f.done = !0;
            window.clearInterval(f.timer);
            f.timer = null;
            for (var c = 0; c < f.ready.length; c++) f.ready[c]();
            f.ready = null;
            return !0
        }
    };
    k = function () {
        this.subscribers = []
    };
    k.prototype.subscribe = function (c) {
        d.array.some(this.subscribers, function (a) {
            return a === c
        }) || this.subscribers.push(c);
        return c
    };
    k.prototype.deliver = function (c) {
        d.array.forEach(this.subscribers, function (a) {
            a(c)
        })
    };
    k.prototype.unsubscribe = function (c) {
        this.subscribers = d.array.filter(this.subscribers, function (a) {
            return a !== c
        });
        return c
    };
    p = function (c, a, b) {
        var e, f;
        if (b) {
            a = "on" + a;
            if (!c._$events) c._$events = {};
            c._$events[a] ? c._$events[a].length == 0 && (c._$events[a] = []) : c._$events[a] = [];
            c = c._$events[a];
            a = c.length;
            e = -1;
            for (f = 0; f < a; f++) if (c[f] == b) {
                e = f;
                break
            }
            e === -1 && c.push(b)
        } else d.out(">>> \u6dfb\u52a0\u7684\u89c2\u5bdf\u8005\u65b9\u6cd5\u4e0d\u5b58\u5728\uff1a" + c + a + b)
    };
    b.addEventListener = i;
    b.removeEventListener = a;
    b.addOriginalEventListener = j;
    b.removeOriginalEventListener = e;
    b.on = b.addEventListener;
    b.off = b.removeEventListener;
    b.onDomReady = f;
    b.Publish = k;
    b.addObserver = p;
    b.addObservers = function (c) {
        var a = c.targetModel,
            c = c.eventMapping,
            b;
        for (b in c) p(a, b, c[b])
    };
    b.notifyObservers = function (c, a, b) {
        var e, a = "on" + a,
            d = !0;
        if (c._$events && c._$events[a] && (a = c._$events[a], a.length > 0)) for (e = 0; e < a.length; e++) a[e].apply(c, [b]) === !1 && (d = !1);
        return d
    };
    b.removeObserver = function (c, a, b) {
        var e, d = !1,
            f, g = c._$events;
        if (b) {
            if (g && (c = g["on" + a])) {
                f = c.length;
                for (e = 0; e < f; e++) if (c[e] == b) {
                    c[e] = null;
                    c.splice(e, 1);
                    d = !0;
                    break
                }
            }
        } else if (a) {
            if (g && (a = "on" + a, c = g[a])) {
                f = c.length;
                for (e = 0; e < f; e++) c[e] = null;
                delete g[a];
                d = !0
            }
        } else if (c && g) {
            for (e in g) delete g[e];
            delete c._$events;
            d = !0
        }
        return d
    }
});