Jx().$package(function (d) {
    var b = d.dom,
        i = d.event,
        j = 0;
    d.ui.MaskLayer = new d.Class({
        _getMaskId: function () {
            return j++
        },
        init: function (a) {
            var a = a || {},
                e = this._getMaskId(),
                h = this;
            this._initZIndex = a.zIndex = !d.isUndefined(a.zIndex) ? a.zIndex : 9E6;
            this._initOpacity = a.opacity = !d.isUndefined(a.opacity) ? a.opacity : 0.5;
            a.appendTo = a.appendTo || document.body;
            a.className = a.className || "";
            this.option = a;
            this.container = b.node("div", {
                id: "ui_maskLayer_" + e,
                "class": "ui_maskLayer " + a.className
            });
            var g = '<div id="ui_maskLayerBody_' + e + '" class="ui_maskLayerBody"></div>';
            d.browser.ie && (g += '<iframe class="ui_maskBgIframe"></iframe>');
            this.container.innerHTML = g;
            this.reset();
            a.appendTo.appendChild(this.container);
            i.on(this.container, "click", function () {
                i.notifyObservers(h, "click", h)
            });
            this.body = b.id("ui_maskLayerBody_" + e)
        },
        getElement: function () {
            return this.container
        },
        append: function (a) {
            this.body.appendChild(a)
        },
        show: function () {
            b.show(this.container);
            i.notifyObservers(this, "show");
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
        setOpacity: function (a) {
            b.setStyle(this.container, "opacity", a)
        },
        reset: function () {
            this.setOpacity(this._initOpacity);
            this.setZIndex(this._initZIndex);
            return this
        },
        fadeIn: function () {
            this.show()
        },
        fadeOut: function () {
            this.hide()
        },
        remove: function () {
            this.option.appendTo && this.option.appendTo.removeChild(this.container)
        },
        about: function () {}
    })
});