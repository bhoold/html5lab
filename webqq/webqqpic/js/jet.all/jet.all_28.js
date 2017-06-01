Jx().$package(function (d) {
    var b = d.dom,
        i = d.event,
        j = new d.Class({
            init: function (a) {
                a = a || {};
                this.id = a.id;
                this.name = a.name;
                this.container = a.container;
                this.body = a.body || a.container;
                a.html = a.html || "";
                a.html && this.setHtml(a.html);
                b.isShow(this.container) ? this.show() : this.hide()
            },
            setHtml: function (a) {
                this.html = a;
                this.body.innerHTML = a
            },
            append: function (a) {
                this.body.appendChild(a)
            },
            getSize: function () {
                return {
                    width: b.getClientWidth(this.container),
                    height: b.getClientHeight(this.container)
                }
            },
            getBodySize: function () {
                return {
                    width: parseInt(b.getStyle(this.body, "width"), 10),
                    height: parseInt(b.getStyle(this.body, "height"), 10)
                }
            },
            show: function () {
                b.show(this.container);
                i.notifyObservers(this, "show", this.getBodySize());
                this._isShow = !0
            },
            hide: function () {
                b.hide(this.container);
                i.notifyObservers(this, "hide");
                this._isShow = !1
            },
            isShow: function () {
                return this._isShow
            },
            toggleShow: function () {
                this.isShow() ? this.hide() : this.show()
            },
            getZIndex: function () {
                return this._zIndex
            },
            setZIndex: function (a) {
                b.setStyle(this.container, "zIndex", a);
                this._zIndex = a
            },
            setXY: function (a, b) {
                this.setX(a);
                this.setY(b)
            },
            setX: function (a) {
                b.setStyle(this.container, "left", a + "px")
            },
            setY: function (a) {
                b.setStyle(this.container, "top", a + "px")
            },
            setWidth: function (a) {
                b.setStyle(this.container, "width", a + "px")
            },
            getWidth: function () {
                return parseInt(b.getStyle(this.container, "width"))
            },
            setHeight: function (a) {
                b.setStyle(this.container, "height", a + "px")
            },
            getHeight: function () {
                return parseInt(b.getStyle(this.container, "height"))
            }
        });
    d.ui.Panel = j
});