Jx().$package(function (d) {
    d.string = d.string || {};
    var b = d.string,
        i, j, a, e, h, g, f, n, k, p, o = {};
    i = function (c, a) {
        var b = !/\W/.test(c) ? o[c] = o[c] || i(document.getElementById(c).innerHTML) : new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + c.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');");
        return a ? b(a) : b
    };
    j = function (c) {
        return j.RE.test(c)
    };
    j.RE = /^(?:ht|f)tp(?:s)?\:\/\/(?:[\w\-\.]+)\.\w+/i;
    a = function (c) {
        var b = null;
        if (null !== (b = a.RE.exec(c))) {
            for (var c = {}, d = 0, e = a.SPEC.length; d < e; d++) c[a.SPEC[d]] = b[d + 1];
            b = c
        }
        return b
    };
    a.SPEC = ["scheme", "user", "pass", "host", "port", "path", "query", "fragment"];
    a.RE = /^([^:]+):\/\/(?:([^:@]+):?([^@]*)@)?(?:([^/?#:]+):?(\d*))([^?#]*)(?:\?([^#]+))?(?:#(.+))?$/;
    e = function (c) {
        return String(c).replace(/^\s+|\s+$/g, "")
    };
    h = function (c, a) {
        return encodeURIComponent(String(c)) + "=" + encodeURIComponent(String(a))
    };
    g = function (c, a) {
        return c.replace(/[^\x00-\xff]/g, {
            2: "aa",
            3: "aaa"
        }[a || 2]).length
    };
    f = function (c, a) {
        return c.substring(0, c.length - a)
    };
    n = function (c) {
        return c.replace(/[&'"<>\/\\\-\x00-\x09\x0b-\x0c\x1f\x80-\xff]/g, function (c) {
            return "&#" + c.charCodeAt(0) + ";"
        }).replace(/ /g, "&nbsp;").replace(/\r\n/g, "<br />").replace(/\n/g, "<br />").replace(/\r/g, "<br />")
    };
    k = function (c) {
        return escape(c).replace(/\+/g, "%2B")
    };
    p = function (c, a) {
        var b = document.createElement("div");
        b.style.visibility = "hidden";
        b.style.width = "auto";
        if (a) b.style.fontSize = a + "px";
        b.style.position = "absolute";
        b.innerHTML = d.string.encodeHtmlSimple(c);
        document.body.appendChild(b);
        var e = b.offsetWidth;
        document.body.removeChild(b);
        return e
    };
    b.cutByWidth = function (c, a, b) {
        for (var d = c.length; d >= 0; --d) if (c = c.substring(0, d), p(c, a) < b) return c;
        return ""
    };
    b.toString = function (c) {
        return c + ""
    };
    b.template = i;
    b.isURL = j;
    b.parseURL = a;
    b.buildURL = function (c) {
        for (var b = "", d = {}, e = {}, f = 0, g = a.SPEC.length; f < g; f++) {
            var h = a.SPEC[f];
            if (c[h]) {
                switch (h) {
                case "scheme":
                    e[h] = "://";
                    break;
                case "pass":
                    d[h] = ":";
                case "user":
                    d.host = "@";
                    break;
                case "port":
                    d[h] = ":";
                    break;
                case "query":
                    d[h] = "?";
                    break;
                case "fragment":
                    d[h] = "#"
                }
                h in d && (b += d[h]);
                h in c && (b += c[h]);
                h in e && (b += e[h])
            }
        }
        return b
    };
    b.mapQuery = function (c) {
        var a, b, c = c || window.location.href,
            d = c.indexOf("?"),
            e = c.substring(d + 1).split("&"),
            f = {};
        if (d === -1) return f;
        for (c = 0; c < e.length; c++) try {
            if (d = e[c].indexOf("="), a = e[c].substring(0, d), b = e[c].substring(d + 1), !(f[a] = unescape(b))) throw Error("uri has wrong query string when run mapQuery.");
        } catch (g) {}
        return f
    };
    b.test = function (c, a, b) {
        return (typeof a == "string" ? RegExp(a, b) : a).test(c)
    };
    b.contains = function (c, a, b) {
        return b ? (b + c + b).indexOf(b + a + b) > -1 : c.indexOf(a) > -1
    };
    b.trim = e;
    b.clean = function (c) {
        return e(c.replace(/\s+/g, " "))
    };
    b.camelCase = function (c) {
        return c.replace(/-\D/g, function (c) {
            return c.charAt(1).toUpperCase()
        })
    };
    b.hyphenate = function (c) {
        return c.replace(/[A-Z]/g, function (c) {
            return "-" + c.charAt(0).toLowerCase()
        })
    };
    b.capitalize = function (c) {
        return c.replace(/\b[a-z]/g, function (c) {
            return c.toUpperCase()
        })
    };
    b.escapeRegExp = function (c) {
        return c.replace(/([-.*+?^${}()|[\]\/\\])/g, "\\$1")
    };
    b.toInt = function (c, a) {
        return parseInt(c, a || 10)
    };
    b.toFloat = function (c) {
        return parseFloat(c)
    };
    b.toSingleLine = function (c) {
        return String(c).replace(/\r/gi, "").replace(/\n/gi, "")
    };
    b.toHtml = function (c) {
        return String(c).replace(/&/gi, "&amp;").replace(/\\/gi, "&#92;").replace(/\'/gi, "&#39;").replace(/\"/gi, "&quot;").replace(/</gi, "&lt;").replace(/>/gi, "&gt;").replace(/ /gi, "&nbsp;").replace(/\r\n/g, "<br />").replace(/\n\r/g, "<br />").replace(/\n/g, "<br />").replace(/\r/g, "<br />")
    };
    b.toTitle = function (c) {
        return String(c).replace(/\\/gi, "\\").replace(/\'/gi, "'").replace(/\"/gi, "'")
    };
    b.toQueryPair = h;
    b.toQueryString = function (c) {
        var a = [],
            b;
        for (b in c) a.push(h(b, c[b]));
        return a.join("&")
    };
    b.hexToRgb = function (c, a) {
        var b = c.match(/^#?(\w{1,2})(\w{1,2})(\w{1,2})$/);
        return b ? b.slice(1).hexToRgb(a) : null
    };
    b.rgbToHex = function (c, a) {
        var b = c.match(/\d{1,3}/g);
        return b ? b.rgbToHex(a) : null
    };
    b.stripScripts = function (c, a) {
        var b = "",
            d = c.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, function (c, a) {
                b += a + "\n";
                return ""
            });
        a === !0 ? $exec(b) : $type(a) == "function" && a(b, d);
        return d
    };
    b.substitute = function (c, a, b) {
        return c.replace(b || /\\?\{([^{}]+)\}/g, function (c, b) {
            return c.charAt(0) == "\\" ? c.slice(1) : a[b] != void 0 ? a[b] : ""
        })
    };
    b.replaceAll = function (c, a, b, d) {
        return RegExp.prototype.isPrototypeOf(a) ? c.replace(a, b) : c.replace(RegExp(a, d ? "gi" : "g"), b)
    };
    b.byteLength = g;
    b.cutRight = f;
    b.isNumber = function (c) {
        return c.search(/^\d+$/) !== -1 ? !0 : !1
    };
    b.isEmail = function (c) {
        return c.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) !== -1 ? !0 : !1
    };
    b.cutByBytes = function (c, a) {
        for (var b = c; g(b) > a;) b = f(b, 1);
        return b
    };
    b.encodeHtmlSimple = function (c) {
        c = c.replace(/&/g, "&amp;");
        c = c.replace(/>/g, "&gt;");
        c = c.replace(/</g, "&lt;");
        c = c.replace(/"/g, "&quot;");
        return c = c.replace(/'/g, "&#39;")
    };
    b.decodeHtmlSimple = function (c) {
        c = c.replace(/&amp;/g, "&");
        c = c.replace(/&gt;/g, ">");
        c = c.replace(/&lt;/g, "<");
        c = c.replace(/&quot;/g, '"');
        return c = c.replace(/&#39;/g, "'")
    };
    b.decodeHtmlSimple2 = function (c) {
        c = c.replace(/&amp;/g, "&");
        c = c.replace(/&gt;/g, ">");
        c = c.replace(/&lt;/g, "<");
        c = c.replace(/\\\\"/g, '"');
        return c = c.replace(/\\\\'/g, "'")
    };
    b.encodeHtmlAttributeSimple = function (c) {
        c = c.replace(/&/g, "&amp;");
        c = c.replace(/>/g, "&gt;");
        c = c.replace(/</g, "&lt;");
        c = c.replace(/"/g, "&quot;");
        c = c.replace(/'/g, "&#39;");
        c = c.replace(/=/g, "&#61;");
        return c = c.replace(/`/g, "&#96;")
    };
    b.encodeHtmlAttribute = function (c) {
        return c.replace(/[&'"<>\/\\\-\x00-\x1f\x80-\xff]/g, function (c) {
            return "&#" + c.charCodeAt(0) + ";"
        })
    };
    b.encodeHtml = n;
    b.encodeScript = function (c) {
        c += "";
        return c.replace(/[\\"']/g, function (c) {
            return "\\" + c
        }).replace(/%/g, "\\x25").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\x01/g, "\\x01")
    };
    b.encodeHrefScript = function (c) {
        return n(k(escScript(c)))
    };
    b.encodeRegExp = function (c) {
        return c.replace(/[\\\^\$\*\+\?\{\}\.\(\)\[\]]/g, function (c) {
            return "\\" + c
        })
    };
    b.encodeUrl = k;
    b.encodeUriComponent = function (c) {
        c = encodeURIComponent(c);
        c = c.replace(/~/g, "%7E");
        c = c.replace(/!/g, "%21");
        c = c.replace(/\*/g, "%2A");
        c = c.replace(/\(/g, "%28");
        c = c.replace(/\)/g, "%29");
        c = c.replace(/'/g, "%27");
        c = c.replace(/\?/g, "%3F");
        return c = c.replace(/;/g, "%3B")
    };
    b.vaildTencentUrl = function (c) {
        return /^(https?:\/\/)?[\w\-.]+\.(qq|paipai|soso|taotao)\.com($|\/|\\)/i.test(c) || /^[\w][\w\/\.\-_%]+$/i.test(c) || /^[\/\\][^\/\\]/i.test(c) ? !0 : !1
    };
    b.vaildUrl = function (c) {
        var c = encodeURI(c).replace(/(^\s*)|(\s*$)/g, ""),
            a = /(^[a-zA-Z0-9]+[^.]):/,
            b = /^[\S.]+\.[\S.]+$/,
            d = /[\w.]+\/(\S*)/,
            e = /^[\s*]*javascript[\s*]*:/;
        !a.test(c) && !b.test(c) ? c = "" : (a.test(c) || (c = "http://" + c), d.test(c) || (c += "/"), e.test(c) && (c = ""));
        return c
    };
    b.getCharWidth = p
});