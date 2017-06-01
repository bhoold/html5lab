Jx().$package(function (d) {
    var b = d.dom,
        i = d.event;
    d.ui = d.ui || {};
    Jx.ui = Jx.ui || {};
    var j = d.ui.TouchScroller = new d.Class({
        container: null,
        _dx: 0,
        _dy: 0,
        _posy: 0,
        _posx: 0,
        _maxOffsetX: 0,
        _maxOffsetY: 0,
        init: function (a, e) {
            this.container = d.isString(a) ? b.id(a) : a;
            this.touchContainer = e || this.container;
            var h = this;
            this.observer = {
                onTouchStart: function (a) {
                    if (!(a.changedTouches.length > 1)) a = a.changedTouches[0], h._dx = h.container.scrollLeft, h._dy = h.container.scrollTop, h._posx = a.pageX, h._posy = a.pageY, h.maxOffsetX = h.container.scrollWidth - h.container.clientWidth, h.maxOffsetY = h.container.scrollHeight - h.container.clientHeight, i.on(h.touchContainer, "touchmove", h.observer.onTouchMove), i.on(h.touchContainer, "touchend", h.observer.onTouchEnd)
                },
                onTouchMove: function (a) {
                    var b = a.changedTouches[0],
                        a = b.pageX,
                        b = b.pageY;
                    h._dx += h._posx - a;
                    h._dy += h._posy - b;
                    h._posx = a;
                    h._posy = b;
                    if (h._dx < 0) h._dx = 0;
                    if (h._dy < 0) h._dy = 0;
                    if (h._dx > h.maxOffsetX) h._dx = h.maxOffsetX;
                    if (h._dy > h.maxOffsetY) h._dy = h.maxOffsetY;
                    h.container.scrollLeft = h._dx;
                    h.container.scrollTop = h._dy
                },
                onTouchEnd: function () {
                    i.off(h.touchContainer, "touchmove", h.observer.onTouchMove);
                    i.off(h.touchContainer, "touchend", h.observer.onTouchEnd)
                }
            };
            i.on(this.touchContainer, "touchstart", this.observer.onTouchStart)
        },
        destroy: function () {
            i.off(this.touchContainer, "touchstart", this.observer.onTouchStart);
            this.container = null
        },
        disable: function () {
            i.off(this.touchContainer, "touchstart", this.observer.onTouchStart)
        },
        enable: function () {
            i.on(this.touchContainer, "touchstart", this.observer.onTouchStart)
        }
    });
    Jx.ui = Jx.ui || {};
    Jx.ui.TouchScroller = j
});