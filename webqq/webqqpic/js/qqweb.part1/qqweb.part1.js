(function () {
    function b(a) {
        this.url = [];
        this.init(a)
    }
    var d, c, e, g, j, l, q, u, p, v, x = "3.0.2";
    if (typeof m == "undefined") var m = 1;
    b.prototype = {
        init: function (a) {
            a ? g = a : g = {};
            d = document;
            if (!g.statIframe && window != top) try {
                d = top.document
            } catch (f) {}
            c = d.location;
            e = d.body
        },
        run: function () {
            var a, f, b;
            a = (new Date).getTime();
            h.init();
            this.url.push(this.getDomainInfo());
            this.url.unshift("http://pingfore." + q + "/pingd?");
            this.url.push(this.getRefInfo(g));
            try {
                navigator.cookieEnabled ? this.url.push("&pvid=" + h.setCookie("pgv_pvid", !0)) : this.url.push("&pvid=NoCookie")
            } catch (c) {
                this.url.push("&pvid=NoCookie")
            }
            this.url.push(this.getMainEnvInfo());
            this.url.push(this.getExtendEnvInfo());
            this.url.push("&vs=" + x);
            g.userDefineVariable ? this.url.push(o.setv(g.userDefineVariable)) : this.url.push(o.setv());
            h.setCookie("ssid");
            h.save();
            g.originalReferer && this.url.push("&or=" + g.originalReferer);
            f = (new Date).getTime();
            g.extParam ? b = g.extParam + "|" : b = "";
            this.url.push("&ext=" + escape(b + (f - a)));
            this.url.push("&reserved1=" + escape(g.reserved1Param || ""));
            this.url.push("&rand=" + Math.round(Math.random() * 1E5));
            this.sendInfo(this.url.join(""));
            g.hot && (document.attachEvent ? document.attachEvent("onclick", this.watchClick) : document.addEventListener("click", this.watchClick, !1));
            g.repeatApplay && g.repeatApplay == "true" && typeof m != "undefined" && (m = 1)
        },
        getDomainInfo: function (a) {
            var f;
            j = g.virtualDomain || c.host;
            f = j.toLowerCase();
            q || (q = this.getCookieSetDomain());
            a && (a = f.indexOf(":"), a > -1 ? f = f.substr(0, a) + ".hot" + f.substr(a) : f += ".hot");
            a = this.getCurrentUrl();
			f="web.qq.com.hot";//²âÊÔ
            return "dm=" + f + "&url=" + a
        },
        getCurrentUrl: function () {
            var a = "",
                f = "-";
            if (g.virtualURL) a = g.virtualURL;
            else if (a = l = escape(c.pathname), c.search != "" && (f = escape(c.search.substr(1))), g.senseParam) {
                var b = this.getParameter(g.senseParam, d.URL);
                b && (a += "_" + b)
            }
            return a + "&arg=" + f
        },
        getRefInfo: function (a) {
            var f = "-",
                b = "-",
                e = "-",
                o = d.referrer,
                g, y = a.virtualDomain ? a.virtualDomain : "-",
                m = a.virtualURL ? a.virtualURL : "-";
            u = a.virtualRefDomain ? a.virtualRefDomain : "";
            p = a.virtualRefURL ? a.virtualRefURL : "";
            a.statIframe || a.useCookie == "true" ? (o = h.get("pgvReferrer"), g = d.URL, y = g.indexOf("?"), y > -1 && (g = g.substr(0, y)), h.set("pgvReferrer", g)) : a.useCookie == "set" && u != "" && p != "" ? (g = "https:" == c.protocol ? "https://" : "http://", g += u + refUrl, h.set("pgvReferrer", g)) : a.useCookie == "set" && (y != "-" || m != "-") ? (g = "https:" == c.protocol ? "https://" : "http://", g += y == "-" ? j : y, g += m == "-" ? l : m, h.set("pgvReferrer", g)) : (a.useCookie == "get" && (g = h.get("pgvReferrer"), g != "" && (o = g)), h.set("pgvReferrer", ""));
            if (g = this.getParameter(a.tagParamName || "ADTAG", d.URL)) f = "ADTAG", b = g;
            g = o.indexOf("://");
            if (g > -1 && f == "-" && (g = o.match(/(\w+):\/\/([^\:|\/]+)(\:\d*)?(.*\/)([^#|\?|\n]+)?(#.*)?(\?.*)?/i))) f = g[2], b = g[4] + g[5];
            o.indexOf("?") != -1 && (g = o.indexOf("?") + 1, e = o.substr(g));
            u != "" && a.useCookie == "false" && (f = u);
            p != "" && a.useCookie == "false" && (b = p);
            u = f;
            p = escape(b);
            return "&rdm=" + u + "&rurl=" + p + "&rarg=" + escape(e)
        },
        getMainEnvInfo: function () {
            var a = "";
            try {
                var f = "-",
                    b = "-",
                    c = "-",
                    d = "-",
                    h = "-",
                    e = "-",
                    o = 0,
                    g = navigator;
                self.screen && (f = screen.width + "x" + screen.height, b = screen.colorDepth + "-bit");
                g.language ? c = g.language.toLowerCase() : g.browserLanguage && (c = g.browserLanguage.toLowerCase());
                o = g.javaEnabled() ? 1 : 0;
                d = g.cpuClass;
                h = g.platform;
                e = (new Date).getTimezoneOffset() / 60;
                a = "&scr=" + f + "&scl=" + b + "&lang=" + c + "&java=" + o + "&cc=" + d + "&pf=" + h + "&tz=" + e
            } catch (H) {} finally {
                return a
            }
        },
        getExtendEnvInfo: function () {
            var a = "";
            try {
                var f = c.href,
                    b = "-";
                a += "&flash=" + this.getFlashInfo();
                e.addBehavior && (e.addBehavior("#default#homePage"), e.isHomePage(f) && (a += "&hp=Y"));
                if (e.addBehavior) e.addBehavior("#default#clientCaps"), b = e.connectionType;
                a += "&ct=" + b
            } catch (d) {} finally {
                return a
            }
        },
        getFlashInfo: function () {
            var a = "-",
                f = navigator;
            try {
                if (f.plugins && f.plugins.length) for (var b = 0; b < f.plugins.length; b++) {
                    if (f.plugins[b].name.indexOf("Shockwave Flash") > -1) {
                        a = f.plugins[b].description.split("Shockwave Flash ")[1];
                        break
                    }
                } else if (window.ActiveXObject) for (b = 12; b >= 5; b--) try {
                    if (eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash." + b + "');")) {
                        a = b + ".0";
                        break
                    }
                } catch (c) {}
            } catch (d) {}
            return a
        },
        getParameter: function (a, f) {
            if (a && f) {
                var b = f.match(RegExp("(\\?|#|&)" + a + "=([^&^#]*)(#|&|$)"));
                return b ? b[2] : ""
            }
            return ""
        },
        getCookieSetDomain: function () {
            var a, f, b = [];
            for (f = a = 0; f < j.length; f++) j.charAt(f) == "." && (b[a] = f, a++);
            a = b.length;
            j.indexOf(".cn") > -1 && a--;
            f = "qq.com";
            a == 1 ? f = j : a > 1 && (f = j.substring(b[a - 2] + 1));
            return f
        },
        watchClick: function (a) {
            try {
                var f = !0,
                    c = "",
                    d;
                d = a.target || window.event.srcElement;
                switch (d.tagName) {
                case "A":
                    c = "<A href=" + d.href + ">" + d.innerHTML + "</a>";
                    break;
                case "IMG":
                    c = "<IMG src=" + d.src + ">";
                    break;
                case "INPUT":
                    c = "<INPUT type=" + d.type + " value=" + d.value + ">";
                    break;
                case "BUTTON":
                    c = "<BUTTON>" + d.innerText + "</BUTTON>";
                    break;
                case "SELECT":
                    c = "SELECT";
                    break;
                default:
                    f = !1
                }
                if (f) {
                    var h = new b(g),
                        e = h.getElementPos(d);
                    if (g.coordinateId) {
                        var o = h.getElementPos(document.getElementById(g.coordinateId));
                        e.x -= o.x
                    }
                    h.url.push(h.getDomainInfo(!0));
                    h.url.push("&hottag=" + escape(c));
                    h.url.push("&hotx=" + e.x);
                    h.url.push("&hoty=" + e.y);
                    h.url.push("&rand=" + Math.round(Math.random() * 1E5));
                    h.url.unshift("http://pinghot." + q + "/pingd?");
                    h.sendInfo(h.url.join(""))
                }
            } catch (m) {}
        },
        getElementPos: function (a) {
            if (a.parentNode === null || a.style.display == "none") return !1;
            var f = navigator.userAgent.toLowerCase(),
                b = null,
                c = [];
            if (a.getBoundingClientRect) return f = a.getBoundingClientRect(), {
                x: f.left + Math.max(document.documentElement.scrollLeft, document.body.scrollLeft) - document.body.clientLeft,
                y: f.top + Math.max(document.documentElement.scrollTop, document.body.scrollTop) - document.body.clientTop
            };
            else if (document.getBoxObjectFor) f = document.getBoxObjectFor(a), c = [f.x - (a.style.borderLeftWidth ? Math.floor(a.style.borderLeftWidth) : 0), f.y - (a.style.borderTopWidth ? Math.floor(a.style.borderTopWidth) : 0)];
            else {
                c = [a.offsetLeft, a.offsetTop];
                b = a.offsetParent;
                if (b != a) for (; b;) c[0] += b.offsetLeft, c[1] += b.offsetTop, b = b.offsetParent;
                if (f.indexOf("opera") > -1 || f.indexOf("safari") > -1 && a.style.position == "absolute") c[0] -= document.body.offsetLeft, c[1] -= document.body.offsetTop
            }
            for (b = a.parentNode ? a.parentNode : null; b && b.tagName != "BODY" && b.tagName != "HTML";) c[0] -= b.scrollLeft, c[1] -= b.scrollTop, b = b.parentNode ? b.parentNode : null;
            return {
                x: c[0],
                y: c[1]
            }
        },
        sendClick: function () {
            g.hottag && (this.url.push(this.getDomainInfo(!0)), this.url.push("&hottag=" + escape(g.hottag)), this.url.push("&hotx=9999&hoty=9999"), this.url.push("&rand=" + Math.round(Math.random() * 1E5)), this.url.unshift("http://pinghot." + q + "/pingd?"), this.sendInfo(this.url.join("")))
        },
        sendInfo: function (a) {
            v = new Image(1, 1);
            v.src = a
        }
    };
    var o = {
        vscope: {
            page: 3,
            session: 2,
            user: 1
        },
        setv: function (a) {
            var f = "",
                f = "";
            if (!a || !a.name || a.name == "" || !a.value || a.value == "" || !a.scope || a.scope < 1 || a.scope > 3) f = h.get("custvar=") == "-" ? h.get("custvar=", !0) : h.get("custvar=");
            else switch (f = a.name + ":" + a.value, a.scope) {
            case this.vscope.session:
                h.setCookie("custvar", !1, f);
                break;
            case this.vscope.user:
                h.setCookie("custvar", !0, f)
            }
            return "&custvar=" + f
        }
    },
        h = {
            sck: [],
            sco: {},
            init: function () {
                var a = this.get("pgv_info=", !0);
                if (a != "-") for (var a = a.split("&"), f = 0; f < a.length; f++) {
                    var b = a[f].split("=");
                    this.set(b[0], unescape(b[1]))
                }
            },
            get: function (a, f) {
                var b = f ? d.cookie : this.get("pgv_info=", !0),
                    c = "-",
                    h;
                h = b.indexOf(a);
                if (h > -1) {
                    h += a.length;
                    c = b.indexOf(";", h);
                    if (c == -1) c = b.length;
                    if (!f) {
                        var e = b.indexOf("&", h);
                        e > -1 && (c = Math.min(c, e))
                    }
                    c = b.substring(h, c)
                }
                return c
            },
            set: function (a, f) {
                this.sco[a] = f;
                for (var b = !1, c = this.sck.length, d = 0; d < c; d++) if (a == this.sck[d]) {
                    b = !0;
                    break
                }
                b || this.sck.push(a)
            },
            setCookie: function (a, f, b) {
                var c = h.get(a + "=", f);
                c == "-" && !b ? (f ? c = "" : c = "s", b = (new Date).getUTCMilliseconds(), c += Math.round(Math.abs(Math.random() - 1) * 2147483647) * b % 1E10) : c = b ? b : c;
                f ? this.saveCookie(a + "=" + c, "expires=Sun, 18 Jan 2038 00:00:00 GMT;") : this.set(a, c);
                return c
            },
            save: function () {
                if (g.sessionSpan) {
                    var a = new Date;
                    a.setTime(a.getTime() + g.sessionSpan * 6E4)
                }
                for (var f = "", b = this.sck.length, c = 0; c < b; c++) f += this.sck[c] + "=" + this.sco[this.sck[c]] + "&";
                f = "pgv_info=" + f.substr(0, f.length - 1);
                b = "";
                a && (b = "expires=" + a.toGMTString());
                this.saveCookie(f, b)
            },
            saveCookie: function (a, b) {
                d.cookie = a + ";path=/;domain=" + q + ";" + b
            }
        };
    window.pgvMain = function (a, f) {
        var c = "";
        f ? (c = f, x = "o3.0.2") : (c = a, x = "3.0.2");
        try {
            m == 1 && (m = 2, (new b(c)).run())
        } catch (d) {}
    };
    window.pgvSendClick = function (a) {
        (new b(a)).sendClick()
    };
    window.pgvWatchClick = function (a) {
        (new b(a)).watchClick()
    }
})();