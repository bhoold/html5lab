Jx().$package(function (d) {
    var b = window.JSON || {};
    (function () {
        function d(a) {
            e.lastIndex = 0;
            return e.test(a) ? '"' + a.replace(e, function (a) {
                var b = f[a];
                return typeof b === "string" ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + a + '"'
        }
        function j(a, b) {
            var e, c, f, r, v = h,
                x, t = b[a];
            t && typeof t === "object" && typeof t.toJSON === "function" && (t = t.toJSON(a));
            typeof n === "function" && (t = n.call(b, a, t));
            switch (typeof t) {
            case "string":
                return d(t);
            case "number":
                return isFinite(t) ? String(t) : "null";
            case "boolean":
            case "null":
                return String(t);
            case "object":
                if (!t) return "null";
                h += g;
                x = [];
                if (Object.prototype.toString.apply(t) === "[object Array]") {
                    r = t.length;
                    for (e = 0; e < r; e += 1) x[e] = j(e, t) || "null";
                    f = x.length === 0 ? "[]" : h ? "[\n" + h + x.join(",\n" + h) + "\n" + v + "]" : "[" + x.join(",") + "]";
                    h = v;
                    return f
                }
                if (n && typeof n === "object") {
                    r = n.length;
                    for (e = 0; e < r; e += 1) c = n[e], typeof c === "string" && (f = j(c, t)) && x.push(d(c) + (h ? ": " : ":") + f)
                } else for (c in t) Object.hasOwnProperty.call(t, c) && (f = j(c, t)) && x.push(d(c) + (h ? ": " : ":") + f);
                f = x.length === 0 ? "{}" : h ? "{\n" + h + x.join(",\n" + h) + "\n" + v + "}" : "{" + x.join(",") + "}";
                h = v;
                return f
            }
        }
        var a = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            e = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            h, g, f = {
                "\u0008": "\\b",
                "\t": "\\t",
                "\n": "\\n",
                "\u000c": "\\f",
                "\r": "\\r",
                '"': '\\"',
                "\\": "\\\\"
            },
            n;
        if (typeof b.stringify !== "function") b.stringify = function (a, b, d) {
            var c;
            g = h = "";
            if (typeof d === "number") for (c = 0; c < d; c += 1) g += " ";
            else typeof d === "string" && (g = d);
            if ((n = b) && typeof b !== "function" && (typeof b !== "object" || typeof b.length !== "number")) throw Error("JSON.stringify");
            return j("", {
                "": a
            })
        };
        if (typeof b.parse !== "function") b.parse = function (b, d) {
            function e(c, a) {
                var b, f, g = c[a];
                if (g && typeof g === "object") for (b in g) Object.hasOwnProperty.call(g, b) && (f = e(g, b), f !== void 0 ? g[b] = f : delete g[b]);
                return d.call(c, a, g)
            }
            var c;
            a.lastIndex = 0;
            a.test(b) && (b = b.replace(a, function (c) {
                return "\\u" + ("0000" + c.charCodeAt(0).toString(16)).slice(-4)
            }));
            if (/^[\],:{}\s]*$/.test(b.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return c = eval("(" + b + ")"), typeof d === "function" ? e({
                "": c
            }, "") : c;
            throw new SyntaxError("JSON.parse");
        }
    })();
    d.json = b
});
Jx().$package(function (d) {
    d.fx = d.fx || {}
});