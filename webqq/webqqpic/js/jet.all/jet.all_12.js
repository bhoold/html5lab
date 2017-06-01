Jx().$package(function (d) {
    var b = d.dom.id,
        i = d.dom,
        j = d.event,
        a;
    if (typeof window.XMLHttpRequest === "undefined") window.XMLHttpRequest = function () {
        return new window.ActiveXObject(navigator.userAgent.indexOf("MSIE 5") >= 0 ? "Microsoft.XMLHTTP" : "Msxml2.XMLHTTP")
    };
    d.http = d.http || {};
    a = function (e, f, h) {
        var k, p, o, c, m = document.getElementsByTagName("head") ? document.getElementsByTagName("head")[0] : document.documentElement,
            r, v = !1,
            x = !1,
            h = h || {};
        o = h.isDefer || !1;
        p = h.query || null;
        arguments = h.arguments || null;
        var t = h.onSuccess ||
        function () {}, u = h.onError ||
        function () {}, l = h.onComplete ||
        function () {}, y, z = h.onTimeout ||
        function () {}, B = h.timeout, w = h.charset ? h.charset : "utf-8", q = h.win || window, A, f = f || "";
        p !== null && (f = f + "?" + p);
        c = a.Id++;
        y = function (c) {
            (c = b("jet_load_" + c)) && m.removeChild(c)
        };
        p = function (a, b, d) {
            return i.node("link", {
                id: "jet_load_" + c,
                type: "text/css",
                charset: d || "utf-8",
                rel: "stylesheet",
                href: a
            }, b)
        };
        e === "script" ? k = h.node ||
        function (a, b, d, e) {
            a = i.node("script", {
                id: "jet_load_" + c,
                type: "text/javascript",
                charset: d || "utf-8",
                src: a
            }, b);
            e && a.setAttribute("defer", "defer");
            return a
        }(f, q, w, o) : e === "css" && (k = h.node || p(f, q, w));
        if (d.browser.engine.trident && parseInt(d.browser.ie) < 9) k.onreadystatechange = function () {
            var a = this.readyState;
            if (a === "loaded" || a === "complete") if (k.onreadystatechange = null, !v) x = !0, window.clearTimeout(r), r = null, A = {}, A.id = c, A.uri = f, A.arguments = arguments, t(A), l(A)
        };
        else if (d.browser.engine.webkit) j.on(k, "load", function () {
            var a;
            if (!v) x = !0, window.clearTimeout(r), r = null, a = {}, a.id = c, a.uri = f, a.arguments = arguments, t(a), l(a), e === "script" && y(c)
        });
        else k.onload = function () {
            var a;
            if (!v) x = !0, window.clearTimeout(r), r = null, a = {}, a.id = c, a.uri = f, a.arguments = h.arguments, t(a), l(a), e === "script" && y(c)
        }, k.onerror = function (a) {
            var b;
            if (!v) x = !0, window.clearTimeout(r), r = null, b = {}, b.id = c, b.uri = f, b.arguments = arguments, b.error = a, u(b), l(b), y(c)
        };
        if (h.node) if (e === "script") k.src = f;
        else {
            if (e === "css") k.href = f
        } else m.appendChild(k);
        e === "script" && B && (r = window.setTimeout(function () {
            var a;
            if (!x) v = !0, a = {}, a.uri = f, a.arguments = arguments, z(a), l(a), y(c)
        }, B));
        o = function (c) {
            this._node = c;
            this._head = m
        };
        o.prototype = {
            abort: function () {
                this._node.src = "";
                this._head.removeChild(this._node);
                delete this._node
            }
        };
        return new o(k)
    };
    a.Id = 0;
    var e, h = {
        _iframes: [],
        _tick: 0,
        _select: function () {
            this._tick++;
            return this._iframes[(this._tick - 1) % this._len]
        },
        init: function (a) {
            if (this._isInit != !0) {
                this._len = a;
                for (var b = document.body, d = 0; d < a; d++) e = i.node("div", {
                    "class": "RPCService_hDiv"
                }), i.hide(e), e.innerHTML = '<iframe id="RPCService_hIframe_' + d + '" name="RPCService_hIframe_' + d + '" src="' + alloy.CONST.MAIN_URL + 'domain.html"></iframe>', b.appendChild(e), this._iframes[d] = [e, null, "RPCService_hIframe_" + d];
                this._isInit = !0
            }
        },
        take: function (a) {
            var b = this._select();
            b[1] && b[0].removeChild(b[1]);
            a.setAttribute("target", b[2]);
            b[1] = a;
            b[0].appendChild(a)
        }
    };
    d.http.ajax = function (a, b) {
        var d, e, h, i = !1,
            c = !1,
            b = {
                method: b.method || "GET",
                data: b.data || null,
                arguments: b.arguments || null,
                onSuccess: b.onSuccess ||
                function () {},
                onError: b.onError ||
                function () {},
                onComplete: b.onComplete ||
                function () {},
                onTimeout: b.onTimeout ||
                function () {},
                isAsync: b.isAsync || !0,
                timeout: b.timeout ? b.timeout : 3E4,
                contentType: b.contentType ? b.contentType : "utf-8",
                type: b.type || "xml"
            },
            a = a || "";
        h = b.timeout;
        d = new window.XMLHttpRequest;
        d.open(b.method, a, b.isAsync);
        d.setRequestHeader("Content-Type", b.contentType);
        e = function (c) {
            try {
                return !c.status && location.protocol == "file:" || c.status >= 200 && c.status < 300 || c.status == 304 || navigator.userAgent.indexOf("Safari") > -1 && typeof c.status == "undefined"
            } catch (a) {}
            return !1
        };
        d.onreadystatechange = function () {
            if (d.readyState == 4) {
                if (!i) {
                    var h = {};
                    h.responseText = d.responseText;
                    h.responseXML = d.responseXML;
                    h.data = b.data;
                    h.status = d.status;
                    h.uri = a;
                    h.arguments = b.arguments;
                    if (e(d)) b.type === "script" && eval.call(window, data), b.onSuccess(h);
                    else b.onError(h);
                    b.onComplete(h)
                }
                c = !0;
                d = null
            }
        };
        d.send(b.data);
        window.setTimeout(function () {
            var d;
            if (!c) i = !0, d = {}, d.uri = a, d.arguments = b.arguments, b.onTimeout(d), b.onComplete(d)
        }, h);
        return d
    };
    d.http.comet = function (a, b) {
        var a = a || "",
            b = {
                method: b.method || "GET",
                data: b.data || null,
                arguments: b.arguments || null,
                callback: b.callback ||
                function () {},
                onLoad: b.onLoad ||
                function () {},
                contentType: b.contentType ? b.contentType : "utf-8"
            },
            e;
        if (d.browser.ie) {
            e = new ActiveXObject("htmlfile");
            e.open();
            e.close();
            var h = e.createElement("div");
            e.appendChild(h);
            e.parentWindow._parent = self;
            h.innerHTML = '<iframe id="_cometIframe" src="' + a + "?callback=window.parent._parent." + b.callback + '"></iframe>';
            e = e.getElementById("_cometIframe")
        } else e = i.node("iframe"), e.setAttribute("id", "_cometIframe"), e.setAttribute("src", a + "?callback=window.parent._parent." + b.callback), e.style.position = "absolute", e.style.visibility = "hidden", e.style.left = e.style.top = "-999px", e.style.width = e.style.height = "1px", document.body.appendChild(e), self._parent = self;
        j.on(e, "load", b.onLoad);
        return e
    };
    d.http.load = a;
    d.http.loadCss = function (b, d) {
        return a("css", b, d)
    };
    d.http.loadScript = function (b, d) {
        return a("script", b, d)
    };
    d.http.formSend = function (a, b) {
        h.init(2);
        var d = {
            method: b.method || "GET",
            enctype: b.enctype || "",
            data: b.data || {},
            onSuccess: b.onSuccess ||
            function () {},
            onError: b.onError ||
            function () {},
            onComplete: b.onComplete ||
            function () {},
            onTimeout: b.onTimeout ||
            function () {},
            timeout: b.timeout ? b.timeout : 1E4
        },
            e = i.node("form", {
                "class": "RPCService_form",
                method: d.method,
                action: a + "?t=" + (new Date).getTime(),
                enctype: d.enctype
            });
        if (Object.prototype.toString.call(d.data).indexOf("String") > -1) {
            var j = i.node("input");
            j.type = "text";
            j.name = d.data;
            e.appendChild(j)
        } else for (var o in d.data) j = i.node("input"), j.type = "text", j.name = o, j.setAttribute("value", d.data[o]), e.appendChild(j);
        h.take(e);
        e.submit()
    }
});