Jx().$package(function (d) {
    var b = d.dom,
        i = d.event,
        j;
    d.ui.ScrollArea = new d.Class({
        init: function (a, e) {
            var h = this;
            j = e ? e : document;
            this.container = a;
            this.scrollBar = j.createElement("div");
            this.scrollBar.className = "scrollBar";
            if (d.browser.ie) this.scrollBar.innerHTML = '<div class="scrollBar_bg scrollBar_bg_t"></div><div class="scrollBar_bg scrollBar_bg_b"></div>';
            this.container.appendChild(this.scrollBar);
            this.wheelThread = 20;
            this.isScrolling = !1;
            var g, f = {
                onMouseDown: function (a) {
                    a.preventDefault();
                    a.stopPropagation();
                    h.isScrolling = !0;
                    g = a.clientY;
                    b.addClass(h.scrollBar, "active");
                    i.on(j, "mousemove", f.onMouseMove);
                    i.on(j, "mouseup", f.onMouseUp)
                },
                onMouseMove: function (a) {
                    h.scroll((a.clientY - g) / (h.offsetHeight - h.scrollBarHeight) * (h.scrollHeight - h.offsetHeight));
                    g = a.clientY;
                    a.preventDefault();
                    a.stopPropagation()
                },
                onClick: function (a) {
                    a.preventDefault();
                    a.stopPropagation()
                },
                onMouseUp: function (a) {
                    a.preventDefault();
                    a.stopPropagation();
                    i.off(j, "mousemove", f.onMouseMove);
                    i.off(j, "mouseup", f.onMouseUp);
                    h.isScrolling = !1;
                    b.removeClass(h.scrollBar, "active")
                },
                onMouseOver: function () {
                    b.addClass(h.scrollBar, "hover")
                },
                onMouseOut: function () {
                    b.removeClass(h.scrollBar, "hover")
                },
                onMouseWheel: function (a) {
                    if (b.isShow(h.scrollBar)) {
                        var d = a.wheelDelta;
                        a.returnValue = !1;
                        a = d < 0 ? h.wheelThread : 0 - h.wheelThread;
                        d = h.scrollHeight / h.scrollBarHeight / 5;
                        d < 1 && (d = 1);
                        a *= d;
                        h.scroll(a)
                    }
                },
                onDomMouseScroll: function (a) {
                    if (b.isShow(h.scrollBar)) {
                        var d = a.detail > 0 ? -1 : 1;
                        a.stopPropagation();
                        a.preventDefault();
                        a = d < 0 ? h.wheelThread : 0 - h.wheelThread;
                        d = h.scrollHeight / h.scrollBarHeight / 5;
                        d < 1 && (d = 1);
                        a *= d;
                        h.scroll(a)
                    }
                }
            };
            this.observer = f;
            i.on(this.scrollBar, "mousedown", f.onMouseDown);
            i.on(this.scrollBar, "click", f.onClick);
            i.on(this.scrollBar, "mouseover", f.onMouseOver);
            i.on(this.scrollBar, "mouseout", f.onMouseOut);
            d.browser.ie || d.browser.engine.webkit || d.browser.opera ? (i.on(this.container, "mousewheel", f.onMouseWheel), i.on(this.scrollBar, "mousewheel", f.onMouseWheel)) : (i.on(this.container, "DOMMouseScroll", f.onDomMouseScroll), i.on(this.scrollBar, "DOMMouseScroll", f.onDomMouseScroll));
            this.update()
        },
        update: function () {
            if (!this.updateTimer) {
                var a = this;
                this.updateTimer = setTimeout(function () {
                    a.updateTimer = 0;
                    a.scrollBar.style.height = "0";
                    b.hide(a.scrollBar);
                    a.scrollHeight = a.container.scrollHeight;
                    a.offsetHeight = a.container.offsetHeight;
                    a.scrollBarHeight = a.offsetHeight / a.scrollHeight * a.offsetHeight;
                    if (!(a.scrollHeight <= a.offsetHeight)) {
                        b.show(a.scrollBar);
                        if (a.scrollBarHeight < 30) a.scrollBarHeight = 30;
                        a.scrollBar.style.height = a.scrollBarHeight + "px";
                        a.scrollBar.style.top = a.container.scrollTop + a.container.scrollTop / (a.scrollHeight - a.offsetHeight) * (a.offsetHeight - a.scrollBarHeight) + "px"
                    }
                }, 500)
            }
        },
        scroll: function (a) {
            var b = this.scrollHeight - (this.container.scrollTop + this.offsetHeight);
            a > b && (a = b);
            a = this.container.scrollTop + a;
            this.scrollBar.style.top = a + a / (this.scrollHeight - this.offsetHeight) * (this.offsetHeight - this.scrollBarHeight) + "px";
            this.container.scrollTop = a
        },
        getScrollTop: function () {
            return parseInt(this.container.scrollTop)
        },
        destroy: function () {
            i.off(this.scrollBar, "mousedown", this.observer.onMouseDown);
            i.off(this.scrollBar, "mouseover", this.observer.onMouseOver);
            i.off(this.scrollBar, "mouseout", this.observer.onMouseOut);
            d.browser.ie || d.browser.engine.webkit || d.browser.opera ? (i.off(this.container, "mousewheel", this.observer.onMouseWheel), i.off(this.scrollBar, "mousewheel", this.observer.onMouseWheel)) : (i.off(this.container, "DOMMouseScroll", this.observer.onDomMouseScroll), i.off(this.scrollBar, "DOMMouseScroll", this.observer.onDomMouseScroll));
            this.container.removeChild(this.scrollBar);
            this.scrollBar = this.container = null
        }
    })
});