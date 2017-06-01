Jx().$package(function (d) {
    var b = d.dom,
        i = d.event;
    d.ui.ScrollBar = new d.Class({
        option: {
            barClass: "scrollBar",
            barHoverClass: null,
            barActiveClass: null,
            showBarContainer: !1
        },
        init: function (j, a) {
            var e = this;
            d.extend(this.option, a);
            this.bar = b.node("div", {
                "class": a.scrollBarClassName || "scrollBar"
            });
            this.obj = j;
            this.content = this.obj.getElementsByTagName("div")[0] || this.obj;
            b.setStyle(this.content, "height", "100%");
            b.setStyle(this.content, "overflow", "hidden");
            if (d.browser.ie) this.bar.innerHTML = '<div class="scrollBar_bg scrollBar_bg_t"></div><div class="scrollBar_bg scrollBar_bg_b"></div>';
            this.onscroll = a.onscroll ||
            function () {};
            this.scrollToBottom = a.scrollToBottom ||
            function () {};
            this.ipadTouchArea = a.ipadTouchArea || !1;
            b.setStyle(this.bar, "marginTop", 0);
            this.obj.appendChild(this.bar);
            if (a.showBarContainer) {
                this.barBc = b.node("div", {
                    "class": "scrollBar_bgc"
                });
                if (d.browser.ie) this.barBc.innerHTML = '<div class="scrollBar_bgc_c scrollBar_bgc_t"></div><div class="scrollBar_bgc_c scrollBar_bgc_b"></div>';
                this.obj.appendChild(this.barBc)
            }
            this.setBarHeight();
            this.wheelThread = 20;
            this.isScrolling = !1;
            var h = {
                onMouseDown: function (a) {
                    var f = a.target;
                    a.changedTouches && (a = a.changedTouches[0]);
                    e.bar.y = a.clientY;
                    e.bar.t = parseInt(e.bar.style.marginTop);
                    d.platform.iPad ? f == e.bar ? (i.on(document, "touchmove", h.onMouseMove), i.on(document, "touchend", h.onBarMouseUp)) : (i.on(document, "touchmove", h.onTouchAreaMove), i.on(document, "touchend", h.onMouseUp)) : (i.on(document, "mousemove", h.onMouseMove), i.on(document, "mouseup", h.onMouseUp), a.stopPropagation());
                    e.isScrolling = !0;
                    e.option.barActiveClass && b.addClass(e.bar, e.option.barActiveClass)
                },
                onMouseMove: function (a) {
                    a.changedTouches && (a.preventDefault(), a = a.changedTouches[0]);
                    e.scroll(a.clientY - e.bar.y);
                    d.platform.iPad || (a.preventDefault(), a.stopPropagation())
                },
                onTouchAreaMove: function (a) {
                    a.preventDefault();
                    a.stopPropagation();
                    a.changedTouches && (a = a.changedTouches[0]);
                    e.scroll(-a.clientY + e.bar.y)
                },
                onBarMouseUp: function () {
                    d.platform.iPad ? (i.off(document, "touchmove", h.onMouseMove), i.off(document, "touchend", h.onBarMouseUp)) : (i.off(document, "mousemove", h.onMouseMove), i.off(document, "mouseup", h.onMouseUp));
                    e.isScrolling = !1;
                    e.option.barActiveClass && b.removeClass(e.bar, e.option.barActiveClass)
                },
                onMouseUp: function () {
                    d.platform.iPad ? (i.off(document, "touchmove", h.onTouchAreaMove), i.off(document, "touchend", h.onMouseUp)) : (i.off(document, "mousemove", h.onMouseMove), i.off(document, "mouseup", h.onMouseUp));
                    e.isScrolling = !1;
                    e.option.barActiveClass && b.removeClass(e.bar, e.option.barActiveClass)
                },
                onMouseOver: function () {
                    b.addClass(e.bar, e.option.barHoverClass)
                },
                onMouseOut: function () {
                    b.removeClass(e.bar, e.option.barHoverClass)
                },
                onMouseWheel: function (a) {
                    if (b.isShow(e.bar)) {
                        e.D = a.wheelDelta;
                        a.returnValue = !1;
                        var d = e.D < 0 ? e.wheelThread : 0 - e.wheelThread;
                        e.bar.y = a.clientY;
                        e.bar.t = parseInt(e.bar.style.marginTop);
                        e.scroll(d)
                    } else e.scrollToBottom(a)
                },
                onClick: function (a) {
                    a.stopPropagation()
                },
                onDomMouseScroll: function (a) {
                    b.isShow(e.bar) ? (e.D = a.detail > 0 ? -1 : 1, d.platform.iPad || (a.stopPropagation(), a.preventDefault()), e.bar.y = a.clientY, e.bar.t = parseInt(e.bar.style.marginTop), e.scroll(e.D < 0 ? e.wheelThread : 0 - e.wheelThread)) : e.scrollToBottom(a)
                }
            };
            if (this.option.stopClick) i.on(this.bar, "click", h.onClick);
            this.option.barHoverClass && (i.on(this.bar, "mouseover", h.onMouseOver), i.on(this.bar, "mouseout", h.onMouseOut));
            if (d.platform.iPad) {
                if (i.on(this.bar, "touchstart", h.onMouseDown), this.ipadTouchArea) i.on(this.content, "touchstart", h.onMouseDown)
            } else i.on(this.bar, "mousedown", h.onMouseDown), d.browser.ie || d.browser.engine.webkit || d.browser.opera ? (i.on(this.content, "mousewheel", h.onMouseWheel), i.on(this.bar, "mousewheel", h.onMouseWheel)) : (i.on(this.content, "DOMMouseScroll", h.onDomMouseScroll), i.on(this.bar, "DOMMouseScroll", h.onDomMouseScroll))
        },
        scrollBack: function () {
            this.content.scrollTop = "0px";
            this.bar.t = 0;
            this.scroll(0)
        },
        refresh: function () {
            this.update()
        },
        update: function () {
            this.setBarHeight()
        },
        setBarHeight: function () {
            this.onscroll(0, 0);
            this.bar.style.height = "0";
            b.hide(this.bar);
            this.content.offsetHeight - this.content.scrollHeight >= 0 ? (this.barBc && b.hide(this.barBc), this.bar.t = 0) : (this.bar.style.height = parseInt(this.content.offsetHeight / this.content.scrollHeight * this.content.offsetHeight) + "px", b.show(this.bar), this.barBc && b.show(this.barBc), this.bar.t = parseInt(this.bar.style.marginTop));
            this.scroll(0)
        },
        scroll: function (b) {
            this.marginTop = (this.bar.t || 0) + b;
            if (this.marginTop < 0) this.marginTop = 0;
            if (this.marginTop > this.content.clientHeight - this.bar.offsetHeight) this.marginTop = this.content.clientHeight - this.bar.offsetHeight, this.scrollToBottom();
            this.bar.style.marginTop = this.marginTop + "px";
            if (b == 0) this.onscroll(b, b);
            var a = (this.content.scrollHeight - this.content.offsetHeight) * parseInt(this.marginTop) / (this.content.offsetHeight - this.bar.offsetHeight);
            this.content.scrollTop = a;
            this.onscroll(a, b)
        },
        getScrollTop: function () {
            return parseInt(this.content.scrollTop)
        },
        contentScroll: function (b) {
            b = parseInt(this.obj.offsetHeight / this.content.scrollHeight * b);
            this.scroll(b)
        },
        contentPosition: function () {
            return this.content.scrollTop
        }
    })
});