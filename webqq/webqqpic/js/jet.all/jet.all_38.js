Jx().$package(function (d) {
    var b = d.dom,
        i = d.browser.ie && (d.browser.ie < 9 || b.getDoc().documentMode < 9),
        d = new d.Class({
            init: function (d) {
                this.el = d;
                this.type = 0;
                this.type2class = ["", "rotation-90deg", "rotation-180deg", "rotation-270deg"];
                i ? b.createStyleNode("\t\t\t\t\t.rotation-90deg {\t\t\t\t\t\tfilter:progid:DXImageTransform.Microsoft.BasicImage(rotation=1);\t\t\t\t\t}\t\t\t\t\t.rotation-180deg {\t\t\t\t\t\tfilter:progid:DXImageTransform.Microsoft.BasicImage(rotation=2);\t\t\t\t\t}\t\t\t\t\t.rotation-270deg {\t\t\t\t\t\tfilter:progid:DXImageTransform.Microsoft.BasicImage(rotation=3);\t\t\t\t\t}\t\t\t\t", "rotation-style") : b.createStyleNode("\t\t\t\t\t.rotation-90deg {\t\t\t\t\t\t-moz-transform:rotate(90deg);\t\t\t\t\t\t-webkit-transform:rotate(90deg);\t\t\t\t\t\t-o-transform: rotate(90deg);\t\t\t\t\t\t-ms-transform: rotate(90deg);\t\t\t\t\t\ttransform:rotate(90deg);\t\t\t\t\t}\t\t\t\t\t.rotation-180deg {\t\t\t\t\t\t-moz-transform:rotate(180deg);\t\t\t\t\t\t-webkit-transform:rotate(180deg);\t\t\t\t\t\t-o-transform: rotate(180deg);\t\t\t\t\t\t-ms-transform: rotate(180deg);\t\t\t\t\t\ttransform:rotate(180deg);\t\t\t\t\t}\t\t\t\t\t.rotation-270deg {\t\t\t\t\t\t-moz-transform:rotate(270deg);\t\t\t\t\t\t-webkit-transform:rotate(270deg);\t\t\t\t\t\t-o-transform: rotate(270deg);\t\t\t\t\t\t-ms-transform: rotate(270deg);\t\t\t\t\t\ttransform:rotate(270deg);\t\t\t\t\t}\t\t\t\t", "rotation-style");
                styleText = null
            },
            uninit: function () {
                this.el = null;
                this.type = 0
            },
            left: function () {
                var b = this.type;
                b -= 1; - 1 === b && (b = 3);
                return this.rotate(b)
            },
            right: function () {
                var b = this.type;
                b += 1;
                4 === b && (b = 0);
                return this.rotate(b)
            },
            rotate: function (d) {
                d = parseInt(d, 10);
                if (isNaN(d) || !(d in this.type2class) || d === this.type) return !1;
                b.removeClass(this.el, this.type2class[this.type]);
                b.addClass(this.el, this.type2class[d]);
                var a = d % 2 !== this.type % 2;
                this.type = d;
                a && this.center();
                return this.type
            },
            center: function () {
                if (i && "absolute" === b.getStyle(this.el, "position")) {
                    var d = parseInt(b.getStyle(this.el, "left"), 10),
                        a = parseInt(b.getStyle(this.el, "top"), 10),
                        e = parseInt(b.getStyle(this.el, "width"), 10),
                        h = parseInt(b.getStyle(this.el, "height"), 10);
                    if (0 === this.type % 2) var g = e,
                        e = h,
                        h = g;
                    e = (h - e) / 2;
                    d -= e;
                    a += e;
                    b.setStyle(this.el, "left", d + "px");
                    b.setStyle(this.el, "top", a + "px")
                }
            },
            reset: function () {
                b.removeClass(this.el, this.type2class[this.type]);
                this.type = 0
            },
            isLandscape: function () {
                return this.type % 2
            }
        });
    Jx.ui = Jx.ui || {};
    Jx.ui.Rotation = d
});