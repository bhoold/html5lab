Jx().$package(function (d) {
    var b = d.Class({
        init: function () {
            var b = this;
            this.op = [{
                ".": function (b, a) {
                    return a.className == b
                },
                "+": function (b, a) {
                    return a.getAttribute(b)
                },
                "#": function (b, a) {
                    return a.id == b
                },
                ".~": function (b, a) {
                    return $D.hasClass(a, b)
                }
            }, {
                ">": function (d, a) {
                    var e, h, g;
                    g = d.split(">");
                    h = g[0];
                    g = g[1];
                    return (g == "*" || b.match(g, a)) && (e = b.operate(b.detectAncestor, h, a)()) ? b.packEvent(a, e) : !1
                }
            }, {
                "!": function (d, a) {
                    d = d.substr(1);
                    return !b.match(d, a)
                }
            }, {
                "&&": function (d, a) {
                    var e, h;
                    h = d.split("&&");
                    e = h[0];
                    h = h.slice(1).join("");
                    return b.match(e, a) ? h.indexOf("&&") == -1 ? b.match(h, a) : arguments.callee(h, a) : !1
                }
            }];
            this.op2Level = [
                [".", "#", "+", ".~"], ">", "!", "&&"]
        },
        detectAncestor: function (b, d, a) {
            var e = 5,
                h = d.target;
            return function () {
                if (a(b, h)) return h;
                else if (e > 0) return e--, h.parentNode ? h = h.parentNode : e = 0, arguments.callee();
                return null
            }
        },
        detect: function (b, d, a) {
            var e = d.target;
            if (e.nodeType != 1) {
                if (e = e.parentNode, a(b, e)) return this.packEvent(d, e)
            } else return a(b, e);
            return !1
        },
        packEvent: function (b, d) {
            return [!0, {
                target: d,
                oTarget: b.target,
                stopPropagation: function () {
                    b.stopPropagation()
                },
                preventDefault: function () {
                    b.preventDefault()
                },
                pageX: b.pageX,
                pageY: b.pageY
            }]
        },
        operate: function (b, d, a) {
            for (var e, h = 3; h > 0;) {
                if (e = this.op[0][d.substr(0, h)]) {
                    var g = null;
                    if (g = b(d.substr(h), a, e)) return g
                }
                h--
            }
            return !1
        },
        match: function (b, d) {
            for (var a = this.op2Level.length; a > 0; a--) {
                var e = this.op2Level[a];
                if (b.indexOf(e) != -1) return this.op[a][e](b, d, void 0)
            }
            return this.operate(this.detect, b, d)
        },
        router: function (b, d, a) {
            for (var b = b.split(","), e, a = b.length - 1; a >= 0; a--) if (e = this.match(b[a], d)) return e;
            return !1
        },
        parse: function (b, d, a) {
            b = this.router(b, a);
            b.length == 2 ? d(b[1]) : b && d(a)
        }
    });
    d.event.eventParser = new b
});