Jx().$package(function (d) {
    var b = d.event,
        i = null,
        j = new d.Class({
            extend: d.ui.Panel
        }, {
            callSuper: function (a) {
                var b = Array.prototype.slice,
                    d = b.call(arguments, 1);
                j.superClass[a].apply(this, d.concat(b.call(arguments)))
            },
            init: function (a) {
                this.parentPopupBox = a.parentPopupBox;
                this.callSuper("init", a);
                var b = this;
                this.catchMouseUp = !0;
                if (a.noCatchMouseUp) this.catchMouseUp = !1;
                this.closeOnEsc = !0;
                if (a.noCloseOnEsc) this.closeOnEsc = !1;
                this.onDocumentKeydown = function (a) {
                    a.keyCode === 27 && (a.preventDefault(), b.hide())
                };
                this.onMouseUp = function () {
                    b.isShow() && b.hide()
                };
                this.onDocumentClick = function () {
                    b.hide()
                };
                this.onWindowResize = function () {
                    b.hide()
                }
            },
            show: function () {
                i && this.parentPopupBox != i && i.hide();
                if (this.catchMouseUp) b.on(document.body, "mouseup", this.onMouseUp);
                if (this.closeOnEsc) b.on(document, "keydown", this.onDocumentKeydown);
                b.on(document.body, "click", this.onDocumentClick);
                b.on(window, "resize", this.onWindowResize);
                this.parentPopupBox || (i = this);
                this.callSuper("show")
            },
            hide: function () {
                b.off(document.body, "click", this.onDocumentClick);
                b.off(document, "keydown", this.onDocumentKeydown);
                b.off(window, "resize", this.onWindowResize);
                b.off(document.body, "mouseup", this.onMouseUp);
                i && !this.parentPopupBox && (i !== this && i.hide(), i = null);
                this.callSuper("hide")
            },
            destroy: function () {
                this.container.parentNode.removeChild(this.container)
            }
        });
    d.ui.PopupBox = j
});