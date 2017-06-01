Jet().$package(function (d) {
    var b = d.dom,
        i = d.event,
        j = d.ui.Bubble = d.Class({
            init: function (a) {
                var a = a || {},
                    a = this.option = d.extend({
                        bubbleParent: document.body,
                        className: "",
                        hasCloseButton: !0,
                        closeOnHide: !1,
                        zIndex: 1E6
                    }, a),
                    e = this._getId(),
                    h = '<div id="bubble_tip_pointer_' + e + '" class="bubble_tip_pointer bubble_tip_pointer_left"></div>\t            <div class="bubble_tip_head"></div>\t            <div class="bubble_tip_body">\t                <div class="bubble_tip_title"><a id="bubble_tip_close_' + e + '" href="###" class="bubble_tip_close" title="\u5173\u95ed">x</a>                        <span id="bubble_tip_title_' + e + '"></span></div>\t                <div id="bubble_tip_content_' + e + '" class="bubble_tip_content"></div>\t            </div>\t            <div id="bubble_tip_foot_' + e + '" class="bubble_tip_foot">\t                <a id="bubble_tip_btn_next_' + e + '" href="###" class="bubble_tip_btn"></a>                    <a id="bubble_tip_btn_ok_' + e + '" href="###" class="bubble_tip_btn"></a>\t            </div>                <iframe width="100%" height="100%" class="bubble_tip_bg_iframe" src="about:blank"></iframe>',
                    g = b.node("div", {
                        "class": "bubble_tip_container " + a.className
                    });
                g.innerHTML = h;
                b.setCssText(g, "left: -10000px; top: 0px; z-index: " + a.zIndex + ";");
                a.bubbleParent.appendChild(g);
                this._container = g;
                this._title = b.id("bubble_tip_title_" + e);
                this._content = b.id("bubble_tip_content_" + e);
                this._pointer = b.id("bubble_tip_pointer_" + e);
                this._okBtn = b.id("bubble_tip_btn_ok_" + e);
                this._nextBtn = b.id("bubble_tip_btn_next_" + e);
                this._closeBtn = b.id("bubble_tip_close_" + e);
                a.hasCloseButton || b.hide(this._closeBtn);
                var f = this,
                    a = {
                        onCloseBtnClick: function (a) {
                            a.preventDefault();
                            a.stopPropagation();
                            i.notifyObservers(f, "onBubbleClose", f);
                            f.hide()
                        },
                        onOkButtonClick: function (a) {
                            a.preventDefault();
                            a.stopPropagation();
                            i.notifyObservers(f, "onBubbleOkBtnClick", f);
                            f.hide()
                        },
                        onNextButtonClick: function (a) {
                            a.preventDefault();
                            a.stopPropagation();
                            i.notifyObservers(f, "onBubbleNextBtnClick", f)
                        }
                    };
                i.on(this._closeBtn, "click", a.onCloseBtnClick);
                i.on(this._okBtn, "click", a.onOkButtonClick);
                i.on(this._nextBtn, "click", a.onNextButtonClick)
            },
            getElement: function () {
                return this._container
            },
            show: function (a) {
                a = a || {};
                a = d.extend({
                    pointerPosition: "top right",
                    pointerOffset: 20,
                    pointerSize: [18, 12],
                    position: [0, 0],
                    target: null,
                    targetOffset: [0, 0]
                }, a);
                if (!this._checkPointerPosition(a.pointerPosition)) throw Error("Bubble >>>> the pointerPosition's value is not correct");
                this._setPointerPosition(a.pointerPosition, a.pointerOffset);
                this._setBubblePosition(a);
                b.show(this._container)
            },
            setZIndex: function (a) {
                b.setStyle(this._container, "zIndex", a)
            },
            setContainerStyle: function (a, d) {
                b.setStyle(this._container, a, d)
            },
            setTitle: function (a) {
                this._title.innerHTML = a
            },
            setContent: function (a) {
                this._content.innerHTML = a
            },
            showButton: function (a, e, h) {
                a = this["_" + a + "Btn"];
                h = d.isUndefined(h) ? !1 : !0;
                if (a) a.innerHTML = e, b.show(a), h ? b.addClass(a, "bubble_tip_btn_next") : b.addClass(a, "bubble_tip_btn_ok");
                return a
            },
            hideButton: function (a) {
                (a = this["_" + a + "Btn"]) && b.hide(a)
            },
            hide: function () {
                b.hide(this._container);
                this.option.closeOnHide && this.close()
            },
            close: function () {
                if (this._isClosed) d.warn("Trying to close a closed bubbleTip!", "BubbleTip");
                else {
                    this._isClosed = !0;
                    i.off(this._closeBtn, "click");
                    i.off(this._okBtn, "click");
                    i.off(this._nextBtn, "click");
                    this._container.parentNode && this._container.parentNode.removeChild(this._container);
                    for (var a in this) this.hasOwnProperty(a) && delete this[a]
                }
            },
            isClose: function () {
                return this._isClosed
            },
            _getId: function () {
                if (!j.__id) j.__id = 0;
                return j.__id++
            },
            _setPointerPosition: function (a, d) {
                var h = a.split(" "),
                    g = this._pointer;
                b.setClass(g, "bubble_tip_pointer bubble_tip_pointer_" + h[0]);
                b.setCssText(g, "");
                b.setStyle(g, h[1], d + "px")
            },
            _setBubblePosition: function (a) {
                var d = a.position;
                if (a.target) {
                    var h = a.pointerPosition.split(" "),
                        g = this._calculateBubblePosition(a.target, a.pointerSize, a.pointerOffset),
                        f = 0;
                    /top|bottom/.test(h[0]) && (f = 1);
                    d[0] = g[h[f] + f];
                    f = (f + 1) % 2;
                    d[1] = g[h[f] + f]
                }
                h = d[1] + a.targetOffset[1];
                b.setStyle(this._container, "left", d[0] + a.targetOffset[0] + "px");
                b.setStyle(this._container, "top", h + "px")
            },
            _calculateBubblePosition: function (a, d, h) {
                var g = this._container,
                    f = b.getClientXY(a),
                    i = b.getOffsetWidth(g),
                    g = b.getOffsetHeight(g),
                    j = b.getWidth(a),
                    a = b.getHeight(a),
                    p = f[0],
                    f = f[1];
                h += d[0] / 2;
                d = d[1];
                return {
                    top0: f + a + d,
                    bottom0: f - g - d,
                    left0: p + j + d,
                    right0: p - i - d,
                    top1: f + a / 2 - h,
                    bottom1: f + a / 2 - g + h,
                    left1: p + j / 2 - h,
                    right1: p + j / 2 - i + h
                }
            },
            _checkPointerPosition: function (a) {
                var a = a.split(" "),
                    b = /left|right/,
                    d = /top|bottom/;
                if (d.test(a[0]) && b.test(a[1])) return !0;
                else if (b.test(a[0]) && d.test(a[1])) return !0;
                return !1
            }
        })
});