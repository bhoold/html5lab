Jx().$package(function (d) {
    var b = d.dom,
        i = d.event,
        j = !1,
        a = !1;
    d.ui.Sortables = new d.Class({
        init: function (a, b, d) {
            this.dropTargets = a.concat();
            this.sortStr = b;
            this.option = d || {};
            this.limiteOption = this.option.limiteOption || {};
            this.dragController = {};
            this._isLock = !1
        },
        addDropTarget: function (a) {
            this.dropTargets.push(a)
        },
        addEffect: function (a) {
            this.effectEl = a
        },
        removeDropTarget: function (a) {
            d.array.remove(this.dropTargets, a)
        },
        refreshDropTarget: function (a) {
            var d, g, f, i = this.dropTargets;
            this.dropPos = [];
            if (a) for (j in i) {
                if (dropTargetEl = i[j].el, a.el === dropTargetEl) {
                    d = {};
                    g = b.getXY(dropTargetEl);
                    f = b.getClientWidth(dropTargetEl);
                    a = b.getClientHeight(dropTargetEl);
                    d.x = g[0];
                    d.y = g[1];
                    d.w = f;
                    d.h = a;
                    this.dropPos[j] = d;
                    break
                }
            } else for (var j in i) a = i[j].el, d = {}, g = b.getXY(a), f = b.getClientWidth(a), a = b.getClientHeight(a), d.x = g[0], d.y = g[1], d.w = f, d.h = a, this.dropPos[j] = d
        },
        addDragClass: function (e) {
            var h = e.parentNode,
                g = e,
                f = !1,
                n = this,
                k = null;
            b.getXY(h);
            var p = b.getXY(g),
                o = e.getAttribute(this.sortStr) || "",
                c = this.dropTargets,
                m, r;
            this.dropPos = [];
            this.dragController[o] = new d.ui.Drag(e, f, this.limiteOption);
            i.addObserver(this.dragController[o], "beforeStart", d.bind(function () {
                j = b.getClientWidth(g);
                a = b.getClientHeight(g);
                var d = {};
                d.top = parseInt(b.getStyle(g, "marginTop") || 0);
                d.buttom = parseInt(b.getStyle(g, "marginbottom") || 0);
                d.left = parseInt(b.getStyle(g, "marginLeft") || 0);
                d.right = parseInt(b.getStyle(g, "marginRight") || 0);
                j += d.left + d.right;
                a += d.top + d.buttom;
                c = this.dropTargets;
                f = n.effectEl || n.clone(g);
                n.dragController[o].setEffect(f);
                p = b.getXY(g);
                var d = p[0],
                    e = p[1];
                r = [d, e];
                b.setStyle(f, "left", d + "px");
                b.setStyle(f, "top", e + "px");
                this.refreshDropTarget();
                h = g.parentNode;
                m = g.nextSibling;
                document.body.appendChild(f);
                i.notifyObservers(n, "beforeStart")
            }, this));
            i.addObserver(this.dragController[o], "start", d.bind(function () {
                k = null;
                n.option.isDash ? g = n.cloneDashedEl(g) : d.browser.ie || b.addClass(g, "ui_halfOpacity");
                i.notifyObservers(n, "start")
            }, this));
            i.addObserver(this.dragController[o], "move", d.bind(function (d) {
                var e = d.orientEvent,
                    f = e.pageX,
                    e = e.pageY;
                if (!(Math.abs(f - r[0]) + Math.abs(e - r[1]) < 1)) {
                    var h = f - r[0] > 0 ? "right" : "left";
                    r = [f, e];
                    var o = {
                        el: null,
                        level: -1,
                        index: 0
                    },
                        m;
                    for (m in this.dropPos) if (f > this.dropPos[m].x && f < this.dropPos[m].x + this.dropPos[m].w && e > this.dropPos[m].y && e < this.dropPos[m].y + this.dropPos[m].h) {
                        var p = c[m],
                            B = p.el,
                            w = b.getClientWidth(B),
                            w = Math.floor(w / j),
                            q = b.getXY(B),
                            B = f - q[0],
                            q = Math.floor((e - q[1]) / a);
                        if (h == "right") var A = Math.ceil(B / j);
                        else h == "left" && (A = Math.floor(B / j));
                        w = A + q * w;
                        if (o.level < p.level) o.level = p.level, o.el = p.el, o.index = w
                    }(k = o.el) && (k.getAttribute("customAcceptDrop") ? i.notifyObservers(k, "dragmove", d) : k.childNodes[w] ? k.insertBefore(g, k.childNodes[w]) : k.appendChild(g));
                    i.notifyObservers(n, "move", d)
                }
            }, this));
            i.addObserver(this.dragController[o], "overFlowBorder", d.bind(function (a) {
                a.el = f;
                i.notifyObservers(n, "overFlowBorder", a)
            }, this));
            i.addObserver(this.dragController[o], "end", d.bind(function (a) {
                var j = a.orientEvent,
                    o = j.pageX,
                    j = j.pageY;
                k && k.getAttribute && k.getAttribute("customAcceptDrop") && i.notifyObservers(k, "drop", {
                    dragEl: e,
                    queue: p,
                    pos: {
                        x: o,
                        y: j
                    },
                    apperceiveEl: g,
                    nextEl: m,
                    parentEl: h,
                    currentDropTarget: k
                });
                document.body.removeChild(f);
                n.option.isDash ? (n.removeDashedEl(), g = n.tempEl) : d.browser.ie || b.removeClass(g, "ui_halfOpacity");
                var p = [],
                    l;
                for (l in c) {
                    p[l] = [];
                    for (var r = c[l].el.childNodes, z = 0; z < r.length; z++) {
                        if (!r[z].getAttribute) break;
                        var B = r[z].getAttribute(n.sortStr);
                        B && p[l].push(B)
                    }
                }
                try {
                    i.notifyObservers(n, "end", {
                        queue: p,
                        pos: a,
                        apperceiveEl: g,
                        nextEl: m,
                        parentEl: h
                    })
                } catch (w) {
                    d.out("drop error")
                }(a = document.elementFromPoint(o, j)) && i.notifyObservers(d.ui, "drop", {
                    dragEl: e,
                    pos: {
                        x: o,
                        y: j
                    },
                    apperceiveEl: g,
                    dropEl: a
                })
            }, this))
        },
        setLimite: function (a) {
            for (var b in this.dragController) this.dragController[b].setLimite(a)
        },
        cloneDashedEl: function (a) {
            var d = b.node("div"),
                g = this.option.className;
            if (g) b.setClass(d, g);
            else {
                b.setStyle(d, "border", "dashed 2px #fff");
                b.setClass(d, a.className);
                b.setStyle(d, "position", "relative");
                b.setStyle(d, "float", "left");
                var g = a.offsetWidth - 10 * parseInt(d.style.borderWidth) + "px",
                    f = a.offsetHeight - 10 * parseInt(d.style.borderWidth) + "px";
                b.setStyle(d, "width", g);
                b.setStyle(d, "height", f)
            }
            this.dashedEl = d;
            a.nextSibling ? a.parentNode.insertBefore(d, a.nextSibling) : a.parentNode.appendChild(d);
            this.tempEl = a;
            a.parentNode.removeChild(a);
            return d
        },
        removeDashedEl: function () {
            this.dashedEl.nextSibling ? this.dashedEl.parentNode.insertBefore(this.tempEl, this.dashedEl.nextSibling) : this.dashedEl.parentNode.appendChild(this.tempEl);
            this.dashedEl.parentNode.removeChild(this.dashedEl)
        },
        clone: function (a) {
            a = a.cloneNode(!0);
            a.setAttribute("id", "");
            b.setStyle(a, "position", "absolute");
            b.setStyle(a, "zIndex", "9999999");
            b.setStyle(a, "background", "none");
            return a
        },
        lock: function () {
            this._isLock = !0;
            for (var a in this.dragController) this.dragController[a].lock()
        },
        unlock: function () {
            this._isLock = !1;
            for (var a in this.dragController) this.dragController[a].unlock()
        },
        isLock: function () {
            return this._isLock
        },
        forEachNode: function (a, b, d) {
            var f = a.length;
            if (typeof b != "function") throw new TypeError;
            for (var i = 0; i < f; i++) i in a && b.call(d, a[i], i, a)
        }
    })
});