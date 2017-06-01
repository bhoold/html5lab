Jx().$package(function (d) {
    var b = d.dom,
        i = d.string,
        j = d.event,
        a = 0;
    d.ui.Button = new d.Class({
        _class: "ui_button",
        _available: !0,
        _shownInLogic: !1,
        _getButtionId: function () {
            return a++
        },
        init: function (a) {
            var a = a || {},
                h = this._getButtionId(),
                g = {
                    appendTo: b.getDocumentElement(),
                    className: "",
                    text: "",
                    title: ""
                };
            d.extend(g, a);
            this._node = b.node("a", {
                id: "ui_button_" + h,
                "class": this._class + " " + i.encodeScript(g.className),
                title: i.encodeScript(g.title),
                hidefocus: "",
                href: "###"
            });
            this._node.innerHTML = i.encodeHtml(g.text);
            g.appendTo.appendChild(this._node);
            g.event && this.attachEvent(g.event);
            g.isStopPropagation && (j.on(this._node, "mousedown", function (a) {
                a.stopPropagation()
            }), j.on(this._node, "click", function (a) {
                a.stopPropagation()
            }))
        },
        attachEvent: function (a) {
            for (var b in a) j.on(this._node, b, a[b])
        },
        removeEvent: function (a) {
            for (var b in a) j.off(this._node, b, a[b])
        },
        setAvailability: function (a) {
            this._available = !! a;
            this._shownInLogic && b[this._available ? "show" : "hide"](this._node)
        },
        hide: function () {
            this._shownInLogic = !1;
            this._available && (b.hide(this._node), j.notifyObservers(this, "hide"))
        },
        show: function () {
            this._shownInLogic = !0;
            this._available && (b.show(this._node), j.notifyObservers(this, "show"))
        },
        setText: function (a) {
            this._node.innerHTML = i.encodeHtml(a)
        },
        setTitle: function (a) {
            this._node.title = i.encodeScript(a)
        },
        getNode: function () {
            return this._node
        },
        disable: function (a) {
            a ? b.addClass(this._node, "window_button_disabled") : b.removeClass(this._node, "window_button_disabled")
        }
    })
});