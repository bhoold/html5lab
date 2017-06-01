Jx().$package(function (d) {
    var b = function () {
            function d() {
                if (!E) {
                    try {
                        var a = q.getElementsByTagName("body")[0].appendChild(q.createElement("span"));
                        a.parentNode.removeChild(a)
                    } catch (b) {
                        return
                    }
                    E = !0;
                    for (var a = H.length, c = 0; c < a; c++) H[c]()
                }
            }
            function j(a) {
                E ? a() : H[H.length] = a
            }
            function a(a) {
                if (typeof w.addEventListener != l) w.addEventListener("load", a, !1);
                else if (typeof q.addEventListener != l) q.addEventListener("load", a, !1);
                else if (typeof w.attachEvent != l) r(w, "onload", a);
                else if (typeof w.onload == "function") {
                    var b = w.onload;
                    w.onload = function () {
                        b();
                        a()
                    }
                } else w.onload = a
            }
            function e() {
                var a = q.getElementsByTagName("body")[0],
                    b = q.createElement(y);
                b.style.position = "absolute";
                b.style.left = "-9999px";
                b.style.top = "-9999px";
                b.style.width = "1px";
                b.style.height = "1px";
                b.setAttribute("type", z);
                var c = a.appendChild(b);
                if (c) {
                    var d = 0;
                    (function () {
                        if (typeof c.GetVariable != l) {
                            var e = c.GetVariable("$version");
                            if (e) e = e.split(" ")[1].split(","), s.pv = [parseInt(e[0], 10), parseInt(e[1], 10), parseInt(e[2], 10)]
                        } else if (d < 10) {
                            d++;
                            setTimeout(arguments.callee, 10);
                            return
                        }
                        a.removeChild(b);
                        c = null;
                        h()
                    })()
                } else h()
            }
            function h() {
                var a = D.length;
                if (a > 0) for (var b = 0; b < a; b++) {
                    var c = D[b].id,
                        d = D[b].callbackFn,
                        e = {
                            success: !1,
                            id: c
                        };
                    if (s.pv[0] > 0) {
                        var h = m(c);
                        if (h) if (v(D[b].swfVersion) && !(s.wk && s.wk < 312)) {
                            if (t(c, !0), d) e.success = !0, e.ref = g(c), d(e)
                        } else if (D[b].expressInstall && f()) {
                            e = {};
                            e.data = D[b].expressInstall;
                            e.width = h.getAttribute("width") || "0";
                            e.height = h.getAttribute("height") || "0";
                            if (h.getAttribute("class")) e.styleclass = h.getAttribute("class");
                            if (h.getAttribute("align")) e.align = h.getAttribute("align");
                            for (var i = {}, h = h.getElementsByTagName("param"), j = h.length, o = 0; o < j; o++) h[o].getAttribute("name").toLowerCase() != "movie" && (i[h[o].getAttribute("name")] = h[o].getAttribute("value"));
                            n(e, i, c, d)
                        } else k(h), d && d(e)
                    } else if (t(c, !0), d) {
                        if ((c = g(c)) && typeof c.SetVariable != l) e.success = !0, e.ref = c;
                        d(e)
                    }
                }
            }
            function g(a) {
                var b = null;
                if ((a = m(a)) && a.nodeName == "OBJECT") typeof a.SetVariable != l ? b = a : (a = a.getElementsByTagName(y)[0]) && (b = a);
                return b
            }
            function f() {
                return !J && v("6.0.65") && (s.win || s.mac) && !(s.wk && s.wk < 312)
            }
            function n(a, b, c, d) {
                J = !0;
                L = d || null;
                O = {
                    success: !1,
                    id: c
                };
                var e = m(c);
                if (e) {
                    e.nodeName == "OBJECT" ? (G = p(e), K = null) : (G = e, K = c);
                    a.id = B;
                    if (typeof a.width == l || !/%$/.test(a.width) && parseInt(a.width, 10) < 310) a.width = "310";
                    if (typeof a.height == l || !/%$/.test(a.height) && parseInt(a.height, 10) < 137) a.height = "137";
                    q.title = q.title.slice(0, 47) + " - Flash Player Installation";
                    d = s.ie && s.win ? "ActiveX" : "PlugIn";
                    d = "MMredirectURL=" + w.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + d + "&MMdoctitle=" + q.title;
                    typeof b.flashvars != l ? b.flashvars += "&" + d : b.flashvars = d;
                    if (s.ie && s.win && e.readyState != 4) d = q.createElement("div"), c += "SWFObjectNew", d.setAttribute("id", c), e.parentNode.insertBefore(d, e), e.style.display = "none", function () {
                        e.readyState == 4 ? e.parentNode.removeChild(e) : setTimeout(arguments.callee, 10)
                    }();
                    o(a, b, c)
                }
            }
            function k(a) {
                if (s.ie && s.win && a.readyState != 4) {
                    var b = q.createElement("div");
                    a.parentNode.insertBefore(b, a);
                    b.parentNode.replaceChild(p(a), b);
                    a.style.display = "none";
                    (function () {
                        a.readyState == 4 ? a.parentNode.removeChild(a) : setTimeout(arguments.callee, 10)
                    })()
                } else a.parentNode.replaceChild(p(a), a)
            }
            function p(a) {
                var b = q.createElement("div");
                if (s.win && s.ie) b.innerHTML = a.innerHTML;
                else if (a = a.getElementsByTagName(y)[0]) if (a = a.childNodes) for (var c = a.length, d = 0; d < c; d++)!(a[d].nodeType == 1 && a[d].nodeName == "PARAM") && a[d].nodeType != 8 && b.appendChild(a[d].cloneNode(!0));
                return b
            }
            function o(a, b, c) {
                var d, e = m(c);
                if (s.wk && s.wk < 312) return d;
                if (e) {
                    if (typeof a.id == l) a.id = c;
                    if (s.ie && s.win) {
                        var f = "",
                            g;
                        for (g in a) if (a[g] != Object.prototype[g]) g.toLowerCase() == "data" ? b.movie = a[g] : g.toLowerCase() == "styleclass" ? f += ' class="' + a[g] + '"' : g.toLowerCase() != "classid" && (f += " " + g + '="' + a[g] + '"');
                        g = "";
                        for (var h in b) b[h] != Object.prototype[h] && (g += '<param name="' + h + '" value="' + b[h] + '" />');
                        e.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + f + ">" + g + "</object>";
                        I[I.length] = a.id;
                        d = m(a.id)
                    } else {
                        h = q.createElement(y);
                        h.setAttribute("type", z);
                        for (var i in a) a[i] != Object.prototype[i] && (i.toLowerCase() == "styleclass" ? h.setAttribute("class", a[i]) : i.toLowerCase() != "classid" && h.setAttribute(i, a[i]));
                        for (f in b) b[f] != Object.prototype[f] && f.toLowerCase() != "movie" && (a = h, g = f, i = b[f], c = q.createElement("param"), c.setAttribute("name", g), c.setAttribute("value", i), a.appendChild(c));
                        e.parentNode.replaceChild(h, e);
                        d = h
                    }
                }
                return d
            }
            function c(a) {
                var b = m(a);
                if (b && b.nodeName == "OBJECT") s.ie && s.win ? (b.style.display = "none", function () {
                    if (b.readyState == 4) {
                        var c = m(a);
                        if (c) {
                            for (var d in c) typeof c[d] == "function" && (c[d] = null);
                            c.parentNode.removeChild(c)
                        }
                    } else setTimeout(arguments.callee, 10)
                }()) : b.parentNode.removeChild(b)
            }
            function m(a) {
                var b = null;
                try {
                    b = q.getElementById(a)
                } catch (c) {}
                return b
            }
            function r(a, b, c) {
                a.attachEvent(b, c);
                F[F.length] = [a, b, c]
            }
            function v(a) {
                var b = s.pv,
                    a = a.split(".");
                a[0] = parseInt(a[0], 10);
                a[1] = parseInt(a[1], 10) || 0;
                a[2] = parseInt(a[2], 10) || 0;
                return b[0] > a[0] || b[0] == a[0] && b[1] > a[1] || b[0] == a[0] && b[1] == a[1] && b[2] >= a[2] ? !0 : !1
            }
            function x(a, b, c, d) {
                if (!s.ie || !s.mac) {
                    var e = q.getElementsByTagName("head")[0];
                    if (e) {
                        c = c && typeof c == "string" ? c : "screen";
                        d && (M = C = null);
                        if (!C || M != c) d = q.createElement("style"), d.setAttribute("type", "text/css"), d.setAttribute("media", c), C = e.appendChild(d), s.ie && s.win && typeof q.styleSheets != l && q.styleSheets.length > 0 && (C = q.styleSheets[q.styleSheets.length - 1]), M = c;
                        s.ie && s.win ? C && typeof C.addRule == y && C.addRule(a, b) : C && typeof q.createTextNode != l && C.appendChild(q.createTextNode(a + " {" + b + "}"))
                    }
                }
            }
            function t(a, b) {
                if (P) {
                    var c = b ? "visible" : "hidden";
                    E && m(a) ? m(a).style.visibility = c : x("#" + a, "visibility:" + c)
                }
            }
            function u(a) {
                return /[\\\"<>\.;]/.exec(a) != null && typeof encodeURIComponent != l ? encodeURIComponent(a) : a
            }
            var l = "undefined",
                y = "object",
                z = "application/x-shockwave-flash",
                B = "SWFObjectExprInst",
                w = window,
                q = document,
                A = navigator,
                N = !1,
                H = [function () {
                    N ? e() : h()
                }],
                D = [],
                I = [],
                F = [],
                G, K, L, O, E = !1,
                J = !1,
                C, M, P = !0,
                s = function () {
                    var a = typeof q.getElementById != l && typeof q.getElementsByTagName != l && typeof q.createElement != l,
                        b = A.userAgent.toLowerCase(),
                        c = A.platform.toLowerCase(),
                        d = c ? /win/.test(c) : /win/.test(b),
                        c = c ? /mac/.test(c) : /mac/.test(b),
                        b = /webkit/.test(b) ? parseFloat(b.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1,
                        e = !+"\u000b1",
                        f = [0, 0, 0],
                        g = null;
                    if (typeof A.plugins != l && typeof A.plugins["Shockwave Flash"] == y) {
                        if ((g = A.plugins["Shockwave Flash"].description) && !(typeof A.mimeTypes != l && A.mimeTypes[z] && !A.mimeTypes[z].enabledPlugin)) N = !0, e = !1, g = g.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), f[0] = parseInt(g.replace(/^(.*)\..*$/, "$1"), 10), f[1] = parseInt(g.replace(/^.*\.(.*)\s.*$/, "$1"), 10), f[2] = /[a-zA-Z]/.test(g) ? parseInt(g.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0
                    } else if (typeof w.ActiveXObject != l) try {
                        var h = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                        if (h && (g = h.GetVariable("$version"))) e = !0, g = g.split(" ")[1].split(","), f = [parseInt(g[0], 10), parseInt(g[1], 10), parseInt(g[2], 10)]
                    } catch (i) {}
                    return {
                        w3: a,
                        pv: f,
                        wk: b,
                        ie: e,
                        win: d,
                        mac: c
                    }
                }();
            (function () {
                s.w3 && ((typeof q.readyState != l && q.readyState == "complete" || typeof q.readyState == l && (q.getElementsByTagName("body")[0] || q.body)) && d(), E || (typeof q.addEventListener != l && q.addEventListener("DOMContentLoaded", d, !1), s.ie && s.win && (q.attachEvent("onreadystatechange", function () {
                    q.readyState == "complete" && (q.detachEvent("onreadystatechange", arguments.callee), d())
                }), w == top &&
                function () {
                    if (!E) {
                        try {
                            q.documentElement.doScroll("left")
                        } catch (a) {
                            setTimeout(arguments.callee, 0);
                            return
                        }
                        d()
                    }
                }()), s.wk &&
                function () {
                    E || (/loaded|complete/.test(q.readyState) ? d() : setTimeout(arguments.callee, 0))
                }(), a(d)))
            })();
            (function () {
                s.ie && s.win && window.attachEvent("onunload", function () {
                    for (var a = F.length, d = 0; d < a; d++) F[d][0].detachEvent(F[d][1], F[d][2]);
                    a = I.length;
                    for (d = 0; d < a; d++) c(I[d]);
                    for (var e in s) s[e] = null;
                    s = null;
                    for (var f in b) b[f] = null;
                    b = null
                })
            })();
            return {
                registerObject: function (a, b, c, d) {
                    if (s.w3 && a && b) {
                        var e = {};
                        e.id = a;
                        e.swfVersion = b;
                        e.expressInstall = c;
                        e.callbackFn = d;
                        D[D.length] = e;
                        t(a, !1)
                    } else d && d({
                        success: !1,
                        id: a
                    })
                },
                getObjectById: function (a) {
                    if (s.w3) return g(a)
                },
                embedSWF: function (a, b, c, d, e, g, h, i, m, k) {
                    var p = {
                        success: !1,
                        id: b
                    };
                    s.w3 && !(s.wk && s.wk < 312) && a && b && c && d && e ? (t(b, !1), j(function () {
                        c += "";
                        d += "";
                        var j = {};
                        if (m && typeof m === y) for (var q in m) j[q] = m[q];
                        j.data = a;
                        j.width = c;
                        j.height = d;
                        q = {};
                        if (i && typeof i === y) for (var r in i) q[r] = i[r];
                        if (h && typeof h === y) for (var s in h) typeof q.flashvars != l ? q.flashvars += "&" + s + "=" + h[s] : q.flashvars = s + "=" + h[s];
                        if (v(e)) r = o(j, q, b), j.id == b && t(b, !0), p.success = !0, p.ref = r;
                        else if (g && f()) {
                            j.data = g;
                            n(j, q, b, k);
                            return
                        } else t(b, !0);
                        k && k(p)
                    })) : k && k(p)
                },
                switchOffAutoHideShow: function () {
                    P = !1
                },
                ua: s,
                getFlashPlayerVersion: function () {
                    return {
                        major: s.pv[0],
                        minor: s.pv[1],
                        release: s.pv[2]
                    }
                },
                hasFlashPlayerVersion: v,
                createSWF: function (a, b, c) {
                    if (s.w3) return o(a, b, c)
                },
                showExpressInstall: function (a, b, c, d) {
                    s.w3 && f() && n(a, b, c, d)
                },
                removeSWF: function (a) {
                    s.w3 && c(a)
                },
                createCSS: function (a, b, c, d) {
                    s.w3 && x(a, b, c, d)
                },
                addDomLoadEvent: j,
                addLoadEvent: a,
                getQueryParamValue: function (a) {
                    var b = q.location.search || q.location.hash;
                    if (b) {
                        /\?/.test(b) && (b = b.split("?")[1]);
                        if (a == null) return u(b);
                        for (var b = b.split("&"), c = 0; c < b.length; c++) if (b[c].substring(0, b[c].indexOf("=")) == a) return u(b[c].substring(b[c].indexOf("=") + 1))
                    }
                    return ""
                },
                expressInstallCallback: function () {
                    if (J) {
                        var a = m(B);
                        if (a && G) {
                            a.parentNode.replaceChild(G, a);
                            if (K && (t(K, !0), s.ie && s.win)) G.style.display = "block";
                            L && L(O)
                        }
                        J = !1
                    }
                }
            }
        }();
    d.swfobject = b;
    (function () {
        var b = navigator.appVersion.indexOf("MSIE") != -1 ? !0 : !1,
            j = navigator.appVersion.toLowerCase().indexOf("win") != -1 ? !0 : !1,
            a = navigator.userAgent.indexOf("Opera") != -1 ? !0 : !1;
        d.GetSwfVer = function () {
            var d = -1;
            if (navigator.plugins != null && navigator.plugins.length > 0) {
                if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
                    var d = navigator.plugins["Shockwave Flash" + (navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "")].description.split(" "),
                        h = d[2].split("."),
                        g = h[0],
                        h = h[1],
                        f = d[3];
                    f == "" && (f = d[4]);
                    f[0] == "d" ? f = f.substring(1) : f[0] == "r" && (f = f.substring(1), f.indexOf("d") > 0 && (f = f.substring(0, f.indexOf("d"))));
                    d = g + "." + h + "." + f
                }
            } else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) d = 4;
            else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) d = 3;
            else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) d = 2;
            else if (b && j && !a) {
                try {
                    h = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"), g = h.GetVariable("$version")
                } catch (n) {}
                if (!g) try {
                    h = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"), g = "WIN 6,0,21,0", h.AllowScriptAccess = "always", g = h.GetVariable("$version")
                } catch (k) {}
                if (!g) try {
                    h = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3"), g = h.GetVariable("$version")
                } catch (p) {}
                if (!g) try {
                    new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3"), g = "WIN 3,0,18,0"
                } catch (o) {}
                if (!g) try {
                    new ActiveXObject("ShockwaveFlash.ShockwaveFlash"), g = "WIN 2,0,0,11"
                } catch (c) {
                    g = -1
                }
                d = g
            }
            return d
        }
    })()
});