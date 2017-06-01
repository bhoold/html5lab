Jx().$package(function (d) {
    var b, i, j, a, e, h, g, f, n, k, p;
    b = function (c) {return typeof c === "undefined"};
    i = function (c) {return c === null};
    j = function (c) {return (c === 0 || c) && c.constructor === Number};
    e = function (c) {return (c === !1 || c) && c.constructor === Boolean};
    a = function (c) {return (c === "" || c) && c.constructor === String};
    h = function (c) {return c && c.constructor === Object || String(c) === "[object Object]"};
    g = function (c) {return c && c.constructor === Array || Object.prototype.toString.call(c) === "[object Array]"};
    f = function (c) {return c && c.callee && j(c.length) ? !0 : !1};
    n = function (c) {return c && c.constructor === Function};
    k = function (c, m, a) {
        var b = arguments, d, e;
        b.length === 1 ? (c = this, b = 0) : (c = b[0] || {}, b = 1);
        for (; b < arguments.length; b++) 
			for (d in e = arguments[b], e) {
				var f = c[d], i = e[d];
				f !== i && (i && h(i) && !g(i) && !i.nodeType && !n(i) ? (f = c[d] || {}, c[d] = k(f, i || (i.length != null ? [] : {}))) : i !== void 0 && (c[d] = i))
			}
        return c
    };
    p = function () {
        var c = arguments.length, m = arguments[c - 1];
        m.init = m.init || function () {};
        if (c === 2) {
            var c = arguments[0].extend, b = function () {};
            b.prototype = c.prototype;
            var a = function () {this.init.apply(this, arguments)};
            a.superClass = c.prototype;
            a.callSuper = function (c, m) {
                var b = Array.prototype.slice, d = b.call(arguments, 2);
                (m = a.superClass[m]) && m.apply(c, d.concat(b.call(arguments)))
            };
            a.prototype = new b;
            a.prototype.constructor = a;
            d.extend(a.prototype, m);
            a.prototype.init = function () {m.init.apply(this, arguments)};
            return a
        } else if (c === 1) return c = function () {return this.init.apply(this, arguments)}, c.prototype = m, c
    };
    var o = new p({
        init: function (c, m, b, a, d) {
            var e = c.concat();
            a && (e = c);
            this.timeout = window.setTimeout(function () {
                var a = +new Date;
                do m.call(b, e.shift());
                while (e.length > 0 && +new Date - a < 50);
                e.length > 0 ? this.timeout = window.setTimeout(arguments.callee, 25) : d && d(c)
            }, 25)
        },
        stop: function () {
            clearTimeout(this.timeout)
        }
    });
    d.isUndefined = b;
    d.isNull = i;
    d.isNumber = j;
    d.isString = a;
    d.isBoolean = e;
    d.isObject = h;
    d.isArray = g;
    d.isArguments = f;
    d.isFunction = n;
    d.$typeof = function (c) {return b(c) ? "undefined" : i(c) ? "null" : j(c) ? "number" : e(c) ? "boolean" : a(c) ? "string" : h(c) ? "object" : g(c) ? "array" : f(c) ? "arguments" : n(c) ? "function" : "other"};
    d.$return = function (c) {return d.isFunction(c) ? c : function () {return c}};
    d.$try = function () {
        var c, m = arguments.length, b;
        for (c = 0; c < m; c++)
			try {
				b = arguments[c]();
				break
			} catch (a) {d.out("C.\u9519\u8bef\uff1a[" + a.name + "] " + a.message + ", " + a.fileName + ", \u884c\u53f7:" + a.lineNumber + "; stack:" + typeof a.stack, 2)}
        return b
    };
    d.emptyFunc = function () {};
    d.clone = function (c) {
        var a = function () {};
        a.prototype = c;
        return new a
    };
    d.getLength = function (c) {
        var a, b = 0;
        for (a in c) c.hasOwnProperty(a) && b++;
        return b
    };
    d.checkJSON = function () {
        return !0
    };
    d.random = function (c, a) {
        return Math.floor(Math.random() * (a - c + 1) + c)
    };
    d.extend = k;
    d.now = function () {
        return +new Date
    };
    d.timedChunk = function (c, a, b, d, e) {
        var f = c.concat();
        d && (f = c);
        window.setTimeout(function () {
            var d = +new Date;
            do a.call(b, f.shift());
            while (f.length > 0 && +new Date - d < 50);
            f.length > 0 ? window.setTimeout(arguments.callee, 25) : e && e(c)
        }, 25)
    };
    d.rebuild = function (c, a) {
        a = a || {};
        c.$$rebuildedFunc = c.$$rebuildedFunc ||
        function () {
            var b, d;
            b = a.contextObj || this;
            d = Array.prototype.slice.call(arguments, 0);
            d !== void 0 && (d = d.concat(a.arguments));
            a.event === !1 && (d = d.slice(1));
            return c.apply(b, d)
        };
        return c.$$rebuildedFunc
    };
    d.pass = function (c, a) {
        var b = Array.prototype.slice, d = b.call(arguments, 1);
        return function () {return c.apply(this, d.concat(b.call(arguments)))}
    };
    d.bind = function (c, a, b) {
        var d = Array.prototype.slice, e = d.call(arguments, 2);
        return function () {return c.apply(a, e.concat(d.call(arguments)))}
    };
    d.bindNoEvent = void 0;
    d.Class = p;
    d.Chunk = o
});