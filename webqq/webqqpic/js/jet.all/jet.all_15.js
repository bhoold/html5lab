Jx().$package(function (d) {
    var b = function () {
            function b(p, o) {
                o = o || document;
                if (!/^[\w\-_#]+$/.test(p) && o.querySelectorAll) return d(o.querySelectorAll(p));
                if (p.indexOf(",") > -1) {
                    for (var c = p.split(/,/g), m = [], r = 0, v = c.length; r < v; ++r) m = m.concat(b(c[r], o));
                    return k(m)
                }
                c = p.match(e);
                r = c.pop();
                m = (r.match(g) || n)[1];
                v = !m && (r.match(h) || n)[1];
                r = !m && (r.match(f) || n)[1];
                if (v && !r && o.getElementsByClassName) r = d(o.getElementsByClassName(v));
                else {
                    r = !m && d(o.getElementsByTagName(r || "*"));
                    if (v) {
                        for (var v = RegExp("(^|\\s)" + v + "(\\s|$)"), x = -1, t, u = -1, l = []; t = r[++x];) v.test(t.className) && (l[++u] = t);
                        r = l
                    }
                    if (m) return (c = o.getElementById(m)) ? [c] : []
                }
                return c[0] && r[0] ? a(c, r) : r
            }
            function d(a) {
                try {
                    return Array.prototype.slice.call(a)
                } catch (b) {
                    for (var c = [], e = 0, f = a.length; e < f; ++e) c[e] = a[e];
                    return c
                }
            }
            function a(b, d, c) {
                var e = b.pop();
                if (e === ">") return a(b, d, !0);
                for (var k = [], i = -1, j = (e.match(g) || n)[1], t = !j && (e.match(h) || n)[1], e = !j && (e.match(f) || n)[1], u = -1, l, y, z, e = e && e.toLowerCase(); l = d[++u];) {
                    y = l.parentNode;
                    do if (z = (z = (z = !e || e === "*" || e === y.nodeName.toLowerCase()) && (!j || y.id === j)) && (!t || RegExp("(^|\\s)" + t + "(\\s|$)").test(y.className)), c || z) break;
                    while (y = y.parentNode);
                    z && (k[++i] = l)
                }
                return b[0] && k[0] ? a(b, k) : k
            }
            var e = /(?:[\w\-\\.#]+)+(?:\[\w+?=([\'"])?(?:\\\1|.)+?\1\])?|\*|>/ig,
                h = /^(?:[\w\-_]+)?\.([\w\-_]+)/,
                g = /^(?:[\w\-_]+)?#([\w\-_]+)/,
                f = /^([\w\*\-_]+)/,
                n = [null, null],
                k = function () {
                    var a = +new Date,
                        b = function () {
                            var c = 1;
                            return function (b) {
                                var d = b[a],
                                    e = c++;
                                return !d ? (b[a] = e, !0) : !1
                            }
                        }();
                    return function (c) {
                        for (var d = c.length, e = [], f = -1, g = 0, h; g < d; ++g) h = c[g], b(h) && (e[++f] = h);
                        a += 1;
                        return e
                    }
                }();
            return b
        }();
    d.dom.mini = b
});