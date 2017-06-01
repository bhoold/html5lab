Jx().$package(function (d) {
    d.ui = d.ui || {};
    var b = d.dom,
        i = d.event,
        j = 0,
        a = {
            t: "t",
            r: "r",
            b: "b",
            l: "l",
            rt: "rt",
            rb: "rb",
            lb: "lb",
            lt: "lt"
        };
    d.ui.Resize = new d.Class({
        init: function (e, h, g) {
            var f = this,
                g = g || {};
            this.apperceiveEl = e;
            this.effectEl = h === !1 ? !1 : h || e;
            this.size = g.size || 5;
            this.minWidth = g.minWidth || 0;
            this.minHeight = g.minHeight || 0;
            this._dragProxy = g.dragProxy;
            if (this.isLimited = g.isLimited || !1) this._leftMargin = g.leftMargin || 0, this._topMargin = g.topMargin || 0, this._rightMargin = g.rightMargin || 0, this._bottomMargin = g.bottomMargin || 0;
            this._left = this.getLeft();
            this._top = this.getTop();
            this._width = this.getWidth();
            this._height = this.getHeight();
            this.id = this.getId();
            e = {
                t: "cursor:n-resize; z-index:1; left:0; top:-5px; width:100%; height:5px;",
                r: "cursor:e-resize; z-index:1; right:-5px; top:0; width:5px; height:100%;",
                b: "cursor:s-resize; z-index:1; left:0; bottom:-5px; width:100%; height:5px;",
                l: "cursor:w-resize; z-index:1; left:-5px; top:0; width:5px; height:100%;",
                rt: "cursor:ne-resize; z-index:2; right:-5px; top:-5px; width:5px; height:5px;",
                rb: "cursor:se-resize; z-index:2; right:-5px; bottom:-5px; width:5px; height:5px;",
                lt: "cursor:nw-resize; z-index:2; left:-5px; top:-5px; width:5px; height:5px;",
                lb: "cursor:sw-resize; z-index:2; left:-5px; bottom:-5px; width:5px; height:5px;"
            };
            this._onMousedown = function () {
                i.notifyObservers(f, "mousedown", {
                    width: f._width,
                    height: f._height
                })
            };
            this._onDragEnd = function () {
                i.notifyObservers(f, "end", {
                    x: f.getLeft(),
                    y: f.getTop(),
                    width: f.getWidth(),
                    height: f.getHeight()
                })
            };
            for (var j in a) h = b.node("div", {
                id: "window_" + this.id + "_resize_" + a[j]
            }), this.apperceiveEl.appendChild(h), b.setCssText(h, "position:absolute; overflow:hidden; background:url(" + d.path + "assets/images/transparent.gif);" + e[j]), this["_dragController_" + a[j]] = new d.ui.Drag(h, !1);
            this._onDragLeftStart = function () {
                i.notifyObservers(f, "mousedown", {
                    width: f._width,
                    height: f._height
                });
                f._startLeft = f._left = f.getLeft();
                f._startWidth = f._width = f.getWidth();
                f._startHeight = f._height = f.getHeight()
            };
            this._onDragLeft = function (a) {
                var b = f._startWidth - a.x,
                    a = f._startLeft + a.x;
                if (b < f.minWidth) b = f.minWidth, a = f._startLeft + (f._startWidth - b);
                if (f.isLimited && a - f._leftMargin < 0) a = f._leftMargin, b = f._startLeft + f._startWidth - f._leftMargin;
                f.setLeft(a);
                f.setWidth(b);
                i.notifyObservers(f, "resize", {
                    width: f._width,
                    height: f._height
                })
            };
            this._onDragTopStart = function () {
                i.notifyObservers(f, "mousedown", {
                    width: f._width,
                    height: f._height
                });
                f._startTop = f._top = f.getTop();
                f._startHeight = f._height = f.getHeight()
            };
            this._onDragTop = function (a) {
                var b = f._startHeight - a.y,
                    a = f._startTop + a.y;
                if (b < f.minHeight) b = f.minHeight, a = f._startTop + (f._startHeight - b);
                if (f.isLimited && a - f._topMargin < 0) a = f._topMargin, b = f._startTop + f._startHeight - f._topMargin;
                f.setTop(a);
                f.setHeight(b);
                i.notifyObservers(f, "resize", {
                    width: f._width,
                    height: f._height
                })
            };
            this._onDragRightStart = function () {
                i.notifyObservers(f, "mousedown", {
                    width: f._width,
                    height: f._height
                });
                f._startWidth = f._width = f.getWidth();
                f._startLeft = f._left = f.getLeft();
                f._startHeight = f._height = f.getHeight();
                qqweb.layout.getClientWidth()
            };
            this._onDragRight = function (a) {
                a = f._startWidth + a.x;
                if (a < f.minWidth) a = f.minWidth;
                var d = (b.getClientWidth() || 0) - f._startLeft - f._rightMargin;
                f.isLimited && d < a && (a = d);
                f.setWidth(a);
                i.notifyObservers(f, "resize", {
                    width: f._width,
                    height: f._height
                })
            };
            this._onDragBottomStart = function () {
                i.notifyObservers(f, "mousedown", {
                    width: f._width,
                    height: f._height
                });
                f._startHeight = f._height = f.getHeight();
                f._startTop = f._top = f.getTop();
                b.getClientHeight()
            };
            this._onDragBottom = function (a) {
                a = f._startHeight + a.y;
                if (a < f.minHeight) a = f.minHeight;
                var d = (b.getClientHeight() || 0) - f._startTop - f._bottomMargin;
                f.isLimited && d < a && (a = d);
                f.setHeight(a);
                i.notifyObservers(f, "resize", {
                    width: f._width,
                    height: f._height
                })
            };
            this._onDragLeftTopStart = function (a) {
                f._onDragLeftStart(a);
                f._onDragTopStart(a)
            };
            this._onDragLeftTop = function (a) {
                f._onDragLeft(a);
                f._onDragTop(a)
            };
            this._onDragLeftBottomStart = function (a) {
                f._onDragLeftStart(a);
                f._onDragBottomStart(a)
            };
            this._onDragLeftBottom = function (a) {
                f._onDragLeft(a);
                f._onDragBottom(a)
            };
            this._onDragRightBottomStart = function (a) {
                f._onDragRightStart(a);
                f._onDragBottomStart(a)
            };
            this._onDragRightBottom = function (a) {
                f._onDragRight(a);
                f._onDragBottom(a)
            };
            this._onDragRightTopStart = function (a) {
                f._onDragRightStart(a);
                f._onDragTopStart(a)
            };
            this._onDragRightTop = function (a) {
                f._onDragRight(a);
                f._onDragTop(a)
            };
            i.addObserver(this["_dragController_" + a.t], "start", this._onDragTopStart);
            i.addObserver(this["_dragController_" + a.t], "move", this._onDragTop);
            i.addObserver(this["_dragController_" + a.t], "end", this._onDragEnd);
            i.addObserver(this["_dragController_" + a.r], "start", this._onDragRightStart);
            i.addObserver(this["_dragController_" + a.r], "move", this._onDragRight);
            i.addObserver(this["_dragController_" + a.r], "end", this._onDragEnd);
            i.addObserver(this["_dragController_" + a.b], "start", this._onDragBottomStart);
            i.addObserver(this["_dragController_" + a.b], "move", this._onDragBottom);
            i.addObserver(this["_dragController_" + a.b], "end", this._onDragEnd);
            i.addObserver(this["_dragController_" + a.l], "start", this._onDragLeftStart);
            i.addObserver(this["_dragController_" + a.l], "move", this._onDragLeft);
            i.addObserver(this["_dragController_" + a.l], "end", this._onDragEnd);
            i.addObserver(this["_dragController_" + a.rb], "start", this._onDragRightBottomStart);
            i.addObserver(this["_dragController_" + a.rb], "move", this._onDragRightBottom);
            i.addObserver(this["_dragController_" + a.rb], "end", this._onDragEnd);
            i.addObserver(this["_dragController_" + a.rt], "start", this._onDragRightTopStart);
            i.addObserver(this["_dragController_" + a.rt], "move", this._onDragRightTop);
            i.addObserver(this["_dragController_" + a.rt], "end", this._onDragEnd);
            i.addObserver(this["_dragController_" + a.lt], "start", this._onDragLeftTopStart);
            i.addObserver(this["_dragController_" + a.lt], "move", this._onDragLeftTop);
            i.addObserver(this["_dragController_" + a.lt], "end", this._onDragEnd);
            i.addObserver(this["_dragController_" + a.lb], "start", this._onDragLeftBottomStart);
            i.addObserver(this["_dragController_" + a.lb], "move", this._onDragLeftBottom);
            i.addObserver(this["_dragController_" + a.lb], "end", this._onDragEnd)
        },
        setWidth: function (a) {
            b.setStyle(this.effectEl, "width", a + "px");
            this._width = a
        },
        setHeight: function (a) {
            b.setStyle(this.effectEl, "height", a + "px");
            this._height = a
        },
        setLeft: function (a) {
            b.setStyle(this.effectEl, "left", a + "px");
            this._left = a
        },
        setTop: function (a) {
            b.setStyle(this.effectEl, "top", a + "px");
            this._top = a
        },
        getWidth: function () {
            return parseInt(b.getStyle(this.effectEl, "width"))
        },
        getHeight: function () {
            return parseInt(b.getStyle(this.effectEl, "height"))
        },
        getLeft: function () {
            return parseInt(b.getStyle(this.effectEl, "left"))
        },
        getTop: function () {
            return parseInt(b.getStyle(this.effectEl, "top"))
        },
        getId: function () {
            return j++
        },
        lock: function () {
            for (var b in a) this["_dragController_" + a[b]].lock()
        },
        unlock: function () {
            for (var b in a) this["_dragController_" + a[b]].unlock()
        },
        show: function () {
            for (var b in a) this["_dragController_" + a[b]].show()
        },
        hide: function () {
            for (var b in a) this["_dragController_" + a[b]].hide()
        },
        setLimite: function (a) {
            a = a || {};
            this.isLimited = a.isLimited || !0, this._leftMargin = a.leftMargin || 0, this._topMargin = a.topMargin || 0, this._rightMargin = a.rightMargin || 0, this._bottomMargin = a.bottomMargin || 0
        },
        setMinLimite: function (a) {
            a = a || {};
            this.minWidth = a.minWidth || 0;
            this.minHeight = a.minHeight || 0
        }
    })
});