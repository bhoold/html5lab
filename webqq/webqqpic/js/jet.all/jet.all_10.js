Jx().$package(function (d) {
    d.array = d.array || {};
    var b = d.array,
        i, j, a, e, h, g, f, n, k, p, o, c;
    i = Array.prototype.indexOf ?
    function () {
        var c = Array.prototype.slice.call(arguments, 1);
        return Array.prototype.indexOf.apply(arguments[0], c)
    } : function (c, a, b) {
        for (b == null ? b = 0 : b < 0 && (b = Math.max(0, c.length + b)); b < c.length; b++) if (c[b] === a) return b;
        return -1
    };
    j = Array.prototype.lastIndexOf ?
    function () {
        var c = Array.prototype.slice.call(arguments, 1);
        return Array.prototype.lastIndexOf.apply(arguments[0], c)
    } : function (c, a, b) {
        for (b == null ? b = c.length - 1 : b < 0 && (b = Math.max(0, c.length + b)); b >= 0; b--) if (c[b] === a) return b;
        return -1
    };
    a = Array.prototype.forEach ?
    function () {
        var c = Array.prototype.slice.call(arguments, 1);
        return Array.prototype.forEach.apply(arguments[0], c)
    } : function (c, a, b) {
        var d = c.length;
        if (typeof a != "function") throw new TypeError;
        for (var e = 0; e < d; e++) e in c && a.call(b, c[e], e, c)
    };
    e = Array.prototype.filter ?
    function () {
        var c = Array.prototype.slice.call(arguments, 1);
        return Array.prototype.filter.apply(arguments[0], c)
    } : function (c, a, b) {
        var d = c.length;
        if (typeof a != "function") throw new TypeError;
        for (var e = [], f = 0; f < d; f++) if (f in c) {
            var g = c[f];
            a.call(b, g, f, c) && e.push(g)
        }
        return e
    };
    h = Array.prototype.some ?
    function () {
        var c = Array.prototype.slice.call(arguments, 1);
        return Array.prototype.some.apply(arguments[0], c)
    } : function (c, a, b) {
        var d = c.length;
        if (typeof a != "function") throw new TypeError;
        for (var e = 0; e < d; e++) if (e in c && a.call(b, c[e], e, c)) return !0;
        return !1
    };
    g = Array.prototype.map ?
    function () {
        var c = Array.prototype.slice.call(arguments, 1);
        return Array.prototype.map.apply(arguments[0], c)
    } : function (c, a, b) {
        var d = c.length;
        if (typeof a != "function") throw new TypeError;
        for (var e = Array(d), f = 0; f < d; f++) f in c && (e[f] = a.call(b, c[f], f, c));
        return e
    };
    f = Array.prototype.every ?
    function () {
        var c = Array.prototype.slice.call(arguments, 1);
        return Array.prototype.every.apply(arguments[0], c)
    } : function (c, a, b) {
        var d = c.length;
        if (typeof a != "function") throw new TypeError;
        for (var e = 0; e < d; e++) if (e in c && !a.call(b, c[e], e, c)) return !1;
        return !0
    };
    n = Array.prototype.reduce ?
    function () {
        var c = Array.prototype.slice.call(arguments, 1);
        return Array.prototype.reduce.apply(arguments[0], c)
    } : function (c, a) {
        var b = c.length >>> 0;
        if (typeof a != "function") throw new TypeError;
        if (b == 0 && arguments.length == 2) throw new TypeError;
        var d = 0;
        if (arguments.length >= 3) var e = arguments[2];
        else {
            do {
                if (d in c) {
                    e = c[d++];
                    break
                }
                if (++d >= b) throw new TypeError;
            } while (1)
        }
        for (; d < b; d++) d in c && (e = a.call(null, e, c[d], d, c));
        return e
    };
    k = Array.prototype.reduceRight ?
    function () {
        var c = Array.prototype.slice.call(arguments, 1);
        return Array.prototype.reduceRight.apply(arguments[0], c)
    } : function (c, a) {
        var b = c.length >>> 0;
        if (typeof a != "function") throw new TypeError;
        if (b == 0 && arguments.length == 2) throw new TypeError;
        b -= 1;
        if (arguments.length >= 3) var d = arguments[2];
        else {
            do {
                if (b in c) {
                    d = c[b--];
                    break
                }
                if (--b < 0) throw new TypeError;
            } while (1)
        }
        for (; b >= 0; b--) b in c && (d = a.call(null, d, c[b], b, c));
        return d
    };
    p = function (c) {
        var a = d.$typeof(c);
        return a ? a != "array" && a != "arguments" ? [c] : c : []
    };
    o = function (c, a) {
        return i(c, a) > -1
    };
    c = function (c) {
        for (var a = [], b = 0, d = c.length; b < d; b++) o(a, c[b]) || a.push(c[b]);
        return a
    };
    b.indexOf = i;
    b.lastIndexOf = j;
    b.forEach = a;
    b.filter = e;
    b.some = h;
    b.map = g;
    b.every = f;
    b.reduce = n;
    b.reduceRight = k;
    b.toArray = p;
    b.remove = function (c, a) {
        var a = p(a),
            b, d, e = !1;
        for (b = 0; b < a.length; b++) for (d = 0; d < c.length; d++) c[d] === a[b] && (c.splice(d, 1), e = !0);
        return e
    };
    b.replace = function (c, a, b) {
        for (; 0 < c.length; ij++) if (c[0] === a) return c[0] = b, !0;
        return !1
    };
    b.bubbleSort = function (c, a) {
        for (var a = a ||
        function (c, a) {
            return c - a
        }, b = c.length, d, e, f = 0; f < b - 1; f++) {
            e = !1;
            for (var g = b - 1; g > f; g--) a(c[g], c[g - 1]) < 0 && (e = !0, d = c[g - 1], c[g - 1] = c[g], c[g] = d);
            if (!e) break
        }
        return c
    };
    b.binarySearch = function (c, a, b) {
        for (var d = 0, e = c.length, f = Math.floor(c.length / 2); e != f;) b(a, c[f]) > 0 ? d = f + 1 : e = f, f = Math.floor((d + e) / 2);
        return f
    };
    b.contains = o;
    b.uniquelize = c;
    b.intersect = function (c, a) {
        for (var b = [], d = 0, e = c.length; d < e; d++) o(a, c[d]) && b.push(c[d]);
        return b
    };
    b.minus = function (c, a) {
        for (var b = [], d = 0, e = c.length; d < e; d++) o(a, c[d]) || b.push(c[d]);
        return b
    };
    b.union = function (a, b) {
        return c(a.concat(b))
    }
});
