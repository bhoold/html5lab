Jx().$package(function (d) {
    var b = d.dom,
        i = d.event;
    d.ui.IframeScroller = function (j) {
        this.container = j.parentNode;
        if (d.platform.iPad && d.platform.iPad.split(".")[0] >= 4) this.container = j.parentNode.parentNode;
        this.iframe = j;
        this.holding = !1;
        this.offsetY = this.offsetX = this.posy = this.posx = 0;
        var a = this;
        this.observers = {
            onTouchStart: function (d) {
                d = d.changedTouches[0];
                a.posx = d.pageX;
                a.posy = d.pageY;
                a.minX = b.getWidth(a.container) - b.getWidth(a.iframe);
                a.minY = b.getHeight(a.container) - b.getHeight(a.iframe);
                i.on(a.iframe, "touchmove", a.observers.onTouchMove);
                i.on(a.iframe, "touchend", a.observers.onTouchEnd)
            },
            onTouchMove: function (b) {
                if (!(b.changedTouches.length > 1)) {
                    b.preventDefault();
                    b.stopPropagation();
                    var d = b.changedTouches[0],
                        b = d.pageX,
                        d = d.pageY,
                        g = a.offsetX - (a.posx - b),
                        f = a.offsetY - (a.posy - d);
                    if (g > 0) g = 0;
                    else if (g < a.minX) g = a.minX;
                    if (f > 0) f = 0;
                    else if (f < a.minY) f = a.minY;
                    j.style.left = g + "px";
                    j.style.top = f + "px";
                    a.offsetX = g;
                    a.offsetY = f;
                    a.posx = b;
                    a.posy = d
                }
            },
            onTouchEnd: function () {
                i.off(a.iframe, "touchmove", a.observers.onTouchMove);
                i.off(a.iframe, "touchend", a.observers.onTouchEnd)
            }
        };
        this.destroy = function () {
            i.off(this.iframe, "touchstart", this.observers.onTouchStart);
            i.off(this.iframe, "touchmove", this.observers.onTouchMove);
            i.off(this.iframe, "touchend", this.observers.onTouchEnd);
            this.container = this.iframe = null
        };
        i.on(this.iframe, "touchstart", this.observers.onTouchStart)
    }
});
Jx().$package(function (d) {
    d.ui.Notifier = new d.Class({
        hasSupport: function () {
            return window.webkitNotifications ? !0 : !1
        },
        requestPermission: function (b) {
            window.webkitNotifications.requestPermission(function () {
                b && b(window.webkitNotifications.checkPermission() == 0)
            })
        },
        notify: function (b, d, j) {
            return window.webkitNotifications.checkPermission() == 0 ? (b = window.webkitNotifications.createNotification(b, d, j), b.show(), b) : !1
        }
    })
});