Jx().$package(function (d) {
    var b = d.dom,
        i = d.event,
        j = new d.Class({
            init: function (a) {
                var e = this,
                    a = a || {};
                this._id = a.id || (new Date).getTime();
                a.name = a.id;
                a.width = a.width || 300;
                a.height = a.height || 300;
                a.appendTo = a.appendTo || document.body;
                a.zIndex = a.zIndex || 1;
                var h = b.node("div", {
                    "class": "ui_boxy"
                });
                h.innerHTML = '\t\t\t\t<div style="position:relative; z-index:1;"><div class="ui_boxyClose" id="ui_boxyClose_' + this._id + '"></div></div>\t\t\t\t<div class="ui_boxyWrapper" id="ui_boxyWrapper_' + this._id + '"></div>\t\t\t\t';
                a.appendTo.appendChild(h);
                a.container = h;
                a.body = b.id("ui_boxyWrapper_" + this._id);
                this._option = a;
                this._panel = new d.ui.Panel(a);
                this._panel.setWidth(a.width);
                this._panel.setHeight(a.height);
                if (a.modal) this._maskLayer = new d.ui.MaskLayer({
                    appendTo: a.appendTo,
                    zIndex: a.zIndex,
                    opacity: 0.5
                }), this._maskLayer.show();
                this._panel.setZIndex(a.zIndex + 1);
                this.setCenter(a);
                new d.ui.Drag(h, h, {
                    isLimited: !0
                });
                h = b.id("ui_boxyClose_" + this._id);
                this._wrapper = b.id("ui_boxyWrapper_" + this._id);
                i.on(h, "click", function () {
                    e.close();
                    a.onClose && a.onClose.apply(e);
                    i.notifyObservers(e, "close")
                })
            },
            getPanel: function () {
                return this._panel
            },
            show: function () {
                this._panel.show()
            },
            hide: function () {
                this._panel.hide()
            },
            setZIndex: function (a) {
                this._panel.setZIndex(a)
            },
            setCenter: function (a) {
                var d = b.getClientWidth(),
                    h = b.getClientHeight();
                this._panel.setXY(d > a.width ? (d - a.width) / 2 : 0, h > a.height ? (h - a.height) / 2 : 0)
            },
            isShow: function () {
                return this._panel.isShow()
            },
            close: function () {
                this._maskLayer && this._maskLayer.remove();
                this._option.appendTo.removeChild(this._option.container)
            }
        });
    d.ui.Boxy = j
});