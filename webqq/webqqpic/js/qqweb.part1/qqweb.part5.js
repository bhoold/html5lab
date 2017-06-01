Jx().$package("alloy.util", function (b) {
    var d = this,
        c = b.dom,
        e = b.event,
        g = b.browser,
        j = Array(50),
        l = 0,
        q, u = 0,
        p = [],
        v;
    this.observer = {
        openInWebBrowser: function (a) {
            try {
                a.preventDefault()
            } catch (b) {}
            var a = this.getAttribute("href"),
                c = this.getAttribute("title");
            alloy.portal.runApp("6", {
                url: a,
                isHideBar: !1,
                title: c
            })
        }
    };
    this.getCookie = function (a) {
        return b.cookie.get(a, alloy.CONST.MAIN_DOMAIN)
    };
    this.getCookieUin = function () {
        var a = b.cookie.get("uin", alloy.CONST.MAIN_DOMAIN),
            a = a ? parseInt(a.substr(1), 10) : null;
        b.out("Cookie uin:" + a, 2);
        return a
    };
    this.getOriginalCookieUin = function () {
        return d.getCookie("uin")
    };
    this.getCookieSkey = function () {
        return d.getCookie("skey")
    };
    this.getCookiePtwebqq = function () {
        return d.getCookie("ptwebqq")
    };
    this.getCdnUrlById = function (a) {
        a = (a || 0) % 10;
        return alloy.CONST.CDN_URL.indexOf("static.com") == -1 ? alloy.CONST.CDN_URL : "http://" + a + "." + alloy.CONST.CDN_ROOT
    };
    this.getAppRoot = function (a) {
        return b.isNumber(a) ? d.getCdnUrlById(a) + qqweb.CONST.PUB_APP_STATIC_URL + Math.floor(a / 1E3) % 1E3 + "/" + a + "/" : d.getCdnUrlById(a.length)
    };
    this.subStringByChar = function (a, b) {
        if (a.keyCode !== 13) {
            var c = a.currentTarget,
                d = c.value;
            if (d.replace(/[^\x00-\xff]/g, "aa").length > b) {
                if (a.keyCode !== 8) for (; d.replace(/[^\x00-\xff]/g, "aa").length > b;) d = d.substring(0, d.length - 1);
                c.value = d
            }
        }
    };
    this.getUserDefaultAvatar = function (a) {
        a = a || 40;
        return alloy.CONST.CDN_URL + "style/images/avatar_default_" + a + "_" + a + ".gif"
    };
    this.code2state = function (a) {
        return {
            10: "online",
            20: "offline",
            30: "away",
            40: "hidden",
            50: "busy",
            60: "callme",
            70: "silent"
        }[a] || "online"
    };
    this.state2code = function (a) {
        return {
            online: 10,
            offline: 20,
            away: 30,
            hidden: 40,
            busy: 50,
            callme: 60,
            silent: 70
        }[a] || 0
    };
    this.getFaceServer = function (a) {
        return alloy.CONST.AVATAR_SERVER_DOMAINS[a % 10]
    };
    this.getUserAvatar = function (a, b, c) {
        b = b || 0;
        if (isNaN(a)) return this.getDefaultUserAvatar();
        var d = "&vfwebqq=" + alloy.portal.getVfWebQQ();
        c && (d = "");
        return this.getFaceServer(a) + "cgi/svr/face/getface?cache=" + b + "&type=1&fid=0&uin=" + a + d
    };
    this.getGroupAvatar = function (a, b) {
        return this.getFaceServer(a) + "cgi/svr/face/getface?cache=" + (b || 0) + "&type=4&fid=0&uin=" + a + "&vfwebqq=" + alloy.portal.getVfWebQQ()
    };
    this.getDiscuAvatar = function () {
        return alloy.CONST.CDN_URL_0 + "style/images/discu_avatar.png"
    };
    this.getQzoneUrl = function (a) {
        return alloy.CONST.QZONE_USER_SERVER_DOMAIN + a
    };
    this.getSendMailUrl = function (a) {
        return "http://mail.qq.com/cgi-bin/login?Fun=clientwrite&vm=pt&email=" + a + "@qq.com"
    };
    this.getDefaultUserAvatar = function () {
        return alloy.CONST.CDN_URL + "style/images/avatar.png"
    };
    this.setDefaultAppThumb = function (a) {
        a.src = alloy.CONST.CDN_URL + "style/images/thumb_default.png"
    };
    this.IEAddOption = function (a, b) {
        if (g.ie) {
            var d = c.node("option", {
                value: b.value,
                text: b.text
            });
            b.selected && (d.selected = "selected");
            a.options.add(d)
        }
    };
    this.setPngForIE6 = function (a, c) {
        if (b.browser.ie == 6) a.style.background = "none", a.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + c + "', sizingMethod='crop')"
    };
    this.getFileSize = function (a) {
        var b = new Image,
            c = a.value,
            d = 0;
        try {
            b.dynsrc = c
        } catch (e) {
            return 0
        }
        try {
            d = b.fileSize || 0
        } catch (h) {}
        if (d == 0) try {
            d = a.files[0].fileSize
        } catch (y) {}
        return d
    };
    this.getFileExt = function (a) {
        var b = a.lastIndexOf(".");
        return b >= 0 ? a.substring(b + 1) : ""
    };
    this.getFileName = function (a) {
        var b = a.lastIndexOf(".");
        return b >= 0 ? a.substring(0, b) : a
    };
    this.formatFileSize = function (a, c) {
        for (var c = b.isUndefined(c) ? 1 : c, d = 0; a >= 1024;) a /= 1024, ++d;
        return a.toFixed(c) + ["B", "KB", "MB", "GB", "ER"][d]
    };
    this.formatTitle = function (a) {
        var c = "\n";
        if (b.browser.firefox || b.browser.opera) c = "  ";
        return a.join(c)
    };
    this.setHomePage = function () {
        (!b.browser.ie && !b.browser.firefox || b.browser.ie == "9.0") && alert("\u4e0d\u597d\u610f\u601d\uff0c\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u6b64\u64cd\u4f5c\u3002");
        var a = "http://" + document.URL.split("/")[2] + "/";
        try {
            this.style.behavior = "url(#default#homepage)", this.setHomePage(a)
        } catch (c) {
            if (b.browser.firefox) {
                try {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")
                } catch (d) {
                    alert("\u6b64\u64cd\u4f5c\u88ab\u6d4f\u89c8\u5668\u62d2\u7edd\uff01\n\u8bf7\u5728\u6d4f\u89c8\u5668\u5730\u5740\u680f\u8f93\u5165\u201cabout:config\u201d\u5e76\u56de\u8f66\n\u7136\u540e\u5c06[signed.applets.codebase_principal_support]\u8bbe\u7f6e\u4e3a'true'")
                }
                Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch).setCharPref("browser.startup.homepage", a)
            }
        }
    };
    this.addFavorite = function () {
        var a = "http://" + document.URL.split("/")[2] + "/";
        try {
            window.external.AddFavorite(a, "Q+ Web")
        } catch (c) {
            b.browser.firefox ? window.sidebar.addPanel("Q+ Web", a, "") : alert("\u4e0d\u597d\u610f\u601d\uff0c\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u6b64\u64cd\u4f5c\u3002")
        }
    };
    this.getShortcutUrl = function () {
        return "./WebQQ2.0.exe"
    };
    this.getActionTarget = function (a, b, c, d) {
        a = a.target;
        b = b || 3;
        c = c || "cmd";
        for (d = d || document.body; a && a !== d && b-- > 0;) if (a.getAttribute(c)) return a;
        else a = a.parentNode;
        return null
    };
    var x = function (a) {
            for (var b = (new Date).getTime(), c = j.length; c--;) {
                var d = j[c];
                if (d) {
                    if (d.timestamp + 5E3 < b) {
                        d.timestamp = b;
                        d.img.src = a + "&t=" + (new Date).getTime();
                        break
                    }
                } else {
                    d = j[c] = {
                        img: new Image,
                        timestamp: b
                    };
                    b = d.img;
                    e.on(b, "load", function () {
                        d.timestamp = 0
                    });
                    e.on(b, "error", function () {
                        d.timestamp = 0
                    });
                    b.src = a + "&t=" + (new Date).getTime();
                    break
                }
            }
        },
        m;
    d.speedTest = new function () {
        var a = [];
        this.sRTS = this.setReportTimeStamp = function (b, c, d, e) {
            a[b] || (a[b] = {});
            a[b][c] = d.getTime();
            e == !0 && this.report([b])
        };
        this.gRTS = this.getReportTimeStamp = function (b, c) {
            return a[b] ? a[b][c] : null
        };
        this.report = function (b) {
            for (var c = !1, d = "http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7723&flag2=2&flag3=1&flag4=" + alloy.portal.getUin(), e = 0; e < b.length; e++) {
                var h = b[e];
                a[h].end && a[h].start && (c = !0, d += "&" + h + "=" + (a[h].end - a[h].start))
            }
            c && x(d)
        }
    };
    this.initSystem = function () {
        (new Function(function (a) {
            var b = "",
                c, d, e = "",
                h, y = "",
                g = 0;
            /[^A-Za-z0-9+/=]/g.exec(a);
            a = a.replace(/[^A-Za-z0-9+/=]/g, "");
            do c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(g++)), d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(g++)), h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(g++)), y = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(g++)), c = c << 2 | d >> 4, d = (d & 15) << 4 | h >> 2, e = (h & 3) << 6 | y, b += String.fromCharCode(c), h != 64 && (b += String.fromCharCode(d)), y != 64 && (b += String.fromCharCode(e));
            while (g < a.length);
            return unescape(b)
        }("dmFyJTIwc2hvd0l0JTNEZnVuY3Rpb24lMjhrZXklMjklN0JpZiUyOE1hdGgucmFuZG9tJTI4JTI5JTNDMC4xJTI5JTdCcXF3ZWIucnBjU2VydmljZS5mb3JtU2VuZCUyOCUyMmh0dHAlM0EvL3RqLnFzdGF0aWMuY29tL2xvZyUyMiUyQyU3Qm1ldGhvZCUzQSUyMlBPU1QlMjIlMkNkYXRhJTNBJTdCciUzQWtleSU3RCU3RCUyOSU3RCUzQmxvY2F0aW9uLnJlcGxhY2UlMjglMjJodHRwJTNBLy9ocC5xcS5jb20vNDA0JTIyJTI5JTNCJTdEJTNCdmFyJTIwaW1nMiUzRG5ldyUyMEltYWdlJTI4JTI5JTNCaW1nMi5zcmMlM0QlMjJyZXMlM0EvL1dlYlFRLmV4ZS8lMjMyMy9MT0dPLlBORyUyMiUzQmltZzIub25sb2FkJTNEZnVuY3Rpb24lMjglMjklN0JzaG93SXQlMjglMjJfZnVrX3dfMiUyMiUyOSUzQiU3RCUzQnZhciUyMGltZzMlM0RuZXclMjBJbWFnZSUyOCUyOSUzQmltZzMuc3JjJTNEJTIycmVzJTNBLy9XZWJRUTIuZXhlLyUyMzIzL0xPR08uUE5HJTIyJTNCaW1nMy5vbmxvYWQlM0RmdW5jdGlvbiUyOCUyOSU3QnNob3dJdCUyOCUyMl9mdWtfd18yJTIyJTI5JTNCJTdEJTNCdmFyJTIwaW1nNCUzRG5ldyUyMEltYWdlJTI4JTI5JTNCaW1nNC5zcmMlM0QlMjJyZXMlM0EvL1dlYlFRMi5leGUvbG9nby5wbmclMjIlM0JpbWc0Lm9ubG9hZCUzRGZ1bmN0aW9uJTI4JTI5JTdCc2hvd0l0JTI4JTIyX2Z1a193XzIlMjIlMjklM0IlN0QlM0J0cnklN0JpZiUyOHdpbmRvdy5leHRlcm5hbCUyNiUyNndpbmRvdy5leHRlcm5hbC50d0dldFJ1blBhdGglMjklN0J2YXIlMjB0JTNEZXh0ZXJuYWwudHdHZXRSdW5QYXRoJTI4JTI5JTNCaWYlMjh0JTI2JTI2dC50b0xvd2VyQ2FzZSUyOCUyOS5pbmRleE9mJTI4JTIyd2VicXElMjIlMjklM0UtMSUyOSU3QnNob3dJdCUyOCUyMl9mdWtfd18yJTIyJTI5JTNCJTdEJTdEJTdEY2F0Y2glMjhlJTI5JTdCJTdEJTNCdHJ5JTdCaWYlMjh3aW5kb3cuZXh0ZXJuYWwlMjklN0IlN0QlN0RjYXRjaCUyOGUlMjklN0JpZiUyOGUuZGVzY3JpcHRpb24ubGVuZ3RoJTNEJTNENiUyOSU3QnNob3dJdCUyOCUyMl9mdWtfd18yJTIyJTI5JTNCJTdEJTdEJTNCdHJ5JTdCdmFyJTIwdWElM0RuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlJTI4JTI5JTNCaWYlMjh1YS5pbmRleE9mJTI4JTIybXNpZSUyMiUyOSUzRS0xJTI5JTdCaWYlMjh0eXBlb2YlMjh3aW5kb3cuZXh0ZXJuYWwuU2hvd0Jyb3dzZXJVSSUyOSUzRCUzRCUyMnVuZGVmaW5lZCUyMiUyOSU3QmlmJTI4dWEuaW5kZXhPZiUyOCUyMnRlbmNlbnQlMjIlMjklM0UtMSU3QyU3Q3VhLmluZGV4T2YlMjglMjJtYXh0aG9uJTIyJTI5JTNFLTElN0MlN0N1YS5pbmRleE9mJTI4JTIyU2FhWWFhJTIyJTI5JTNFLTElN0MlN0N1YS5tYXRjaCUyOC9zZSUyMCUyOCU1QiU1Q2QuJTVEKyUyOS8lMjklMjklN0IlN0RlbHNlJTdCc2hvd0l0JTI4JTIyX2Z1a193XzIlMjIlMjklM0IlN0QlN0QlN0QlN0RjYXRjaCUyOGUlMjklN0IlN0QlM0J0cnklN0J2YXIlMjB1YSUzRG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UlMjglMjklM0JpZiUyOHVhLmluZGV4T2YlMjglMjJtc2llJTIyJTI5JTNFLTElMjklN0JpZiUyOHR5cGVvZiUyOHdpbmRvdy5leHRlcm5hbC5JbXBvcnRFeHBvcnRGYXZvcml0ZXMlMjklM0QlM0QlMjJ1bmRlZmluZWQlMjIlMjklN0JpZiUyOHVhLmluZGV4T2YlMjglMjJ0ZW5jZW50JTIyJTI5JTNFLTElN0MlN0N1YS5pbmRleE9mJTI4JTIybWF4dGhvbiUyMiUyOSUzRS0xJTdDJTdDdWEuaW5kZXhPZiUyOCUyMlNhYVlhYSUyMiUyOSUzRS0xJTdDJTdDdWEubWF0Y2glMjgvJTNCJTIwc2UlMjAlMjglNUIlNUNkLiU1RCslMjkvJTI5JTI5JTdCJTdEZWxzZSU3QnNob3dJdCUyOCUyMl9mdWtfd18yJTIyJTI5JTNCJTdEJTdEJTdEJTdEY2F0Y2glMjhlJTI5JTdCJTdEJTNC")))()
    };
    this.LogReport = function () {
        var a = {},
            c = "";
        a.log = b.console.getReport([0, 1, 2]);
        a.uin = alloy.portal.getUin() || "";
        a.skey = alloy.portal.getSkey() || "";
        a.ua = navigator.userAgent.toLowerCase();
        a.pf = navigator.platform.toLowerCase();
        if (c = alloy.config.uacResult) a.uac = c;
        c = b.json.stringify(a);
        alloy.rpcService.sendReport(c)
    };
    m = function () {};
    m.prototype = {
        timer: null,
        count: 0,
        config: {
            interval: 1E4,
            maxBytes: 1024,
            reportUrl: {
                isd: "http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7723&flag2=2&flag3=1",
                qstatic: "http://tj.qstatic.com/getlog?"
            },
            reportUrlLength: {
                isd: [0,
                {}],
                qstatic: [0,
                {}]
            },
            reportHeaderLength: {
                isd: {
                    _total: 80
                },
                qstatic: {
                    p2: 13,
                    qqweb2: 7,
                    webtop: 7,
                    im2: 4,
                    client: 7,
                    webtop: 7,
                    app2: 5,
                    m: 2,
                    _total: 29
                }
            },
            countCombineLength: {
                qstatic: {
                    m: 4
                }
            }
        },
        queue: {
            isd: [],
            qstatic: {
                p2: [],
                qqweb2: [],
                client: [],
                webtop: [],
                im2: [],
                app2: [],
                m: {},
                webtop: []
            }
        },
        add: function (a, b, c) {
            c = String(c);
            this.checkUrlLength(a, b, c);
            b ? b == "m" ? this.queue[a][b][c] ? this.queue[a][b][c]++ : this.queue[a][b][c] = 1 : this.queue[a][b].push(c) : this.queue[a].push(c);
            this.StartTimer()
        },
        checkUrlLength: function (a, b, c) {
            var d = this.config,
                e = d.reportUrlLength[a],
                h = d.reportHeaderLength[a];
            e[0] = e[0] || h._total;
            b && (e[0] += e[1][b] ? 0 : h[b] + 1, e[1][b] = !0);
            d.countCombineLength[a] && d.countCombineLength[a][b] ? this.queue[a][b][c] || (e[0] += d.countCombineLength[a][b]) : e[0] += c.length + 1;
            e[0] > d.maxBytes && (b = {}, b[a] = [e[0],
            {}], this.report(b), d.reportUrlLength[a] = [0,
            {}])
        },
        forEach: function (a, b) {
            for (var c in a) a.hasOwnProperty(c) && b(c, a)
        },
        report: function (a) {
            var b = this,
                a = a || this.config.reportUrlLength,
                c = "",
                d = [];
            b.forEach(b.queue, function (e) {
                a[e] && a[e][0] && (e == "isd" ? (c = b.config.reportUrl.isd + "&flag4=" + (alloy.portal.getUin() || 0) + "&" + b.queue[e].join("&"), x(c), b.queue[e] = [], a[e] = [0,
                {}]) : e == "qstatic" && (b.forEach(b.queue[e], function (a) {
                    if (a == "m") {
                        var c = [];
                        b.forEach(b.queue[e][a], function (a, b) {
                            c.push(b[a] + "$" + a)
                        });
                        c.length && d.push(a + "=" + c.join("|"));
                        b.queue[e][a] = {}
                    } else {
                        var h = b.queue[e][a].join("|");
                        h && (a == "p2" ? d.push(a + "=" + Math.floor((new Date).getTime() / 1E3) + "|" + h) : d.push(a + "=" + h), b.queue[e][a] = [])
                    }
                }), d = b.config.reportUrl.qstatic + d.join("&"), x(d), a[e] = [0,
                {}]))
            })
        },
        StartTimer: function () {
            var a = this;
            if (!this.timer) this.timer = setTimeout(function () {
                a.report();
                a.timer = null;
                a.StartTimer()
            }, this.config.interval)
        }
    };
    var o = new m;
    this.report = function () {
        o.report()
    };
    d.speedTest = new function () {
        var a = [];
        this.sRTS = this.setReportTimeStamp = function (b, c, d, e) {
            a[b] || (a[b] = {});
            a[b][c] = d.getTime();
            e == !0 && this.report([b])
        };
        this.gRTS = this.getReportTimeStamp = function (b, c) {
            return a[b] ? a[b][c] : null
        };
        this.report = function (b) {
            for (var c = "http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7723&flag2=2&flag3=1&flag4=" + alloy.portal.getUin() || 0, d = 0; d < b.length; d++) {
                var e = b[d];
                a[e].end && a[e].start && (c += "&" + e + "=" + (a[e].end - a[e].start), o.add("isd", null, e + "=" + (a[e].end - a[e].start)))
            }
        }
    };
    this.report2h = function () {
        var a = function () {
                return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1)
            },
            b = a() + a() + a() + a();
        return function (a, c, d, e) {
            var d = d || "0",
                e = e || "0",
                h = alloy.portal.getUin() || b,
                a = [Math.floor((new Date).getTime() / 1E3), a, c, h, b, d, e].join("$");
            o.add("qstatic", "p2", a)
        }
    }();
    this.report2c = function (a) {
        o.add("qstatic", "client", alloy.portal.getUin() + "$" + a)
    };
    this.report2m = this.report2monitor = function (a) {
        o.add("qstatic", "m", a)
    };
    this.report2qqweb = function (a) {
        var b = alloy.portal.getUin();
        b || (b = "0");
        o.add("qstatic", "qqweb2", b + "$" + a.split("|").join("$"));
        window.webTop && o.add("qstatic", "webtop", b + "$" + a.split("|").join("$"))
    };
    this.report2app = function (a) {
        var b = alloy.portal.getUin();
        b || (b = "0");
        o.add("qstatic", "app2", b + "$" + a.split("|").join("$"))
    };
    this.report2im = function (a) {
        var b = alloy.portal.getUin();
        b || (b = "0");
        o.add("qstatic", "im2", b + "$" + a.split("|").join("$"))
    };
    this.getTargetLessFormEl = function (a, b) {
        var c = {
            method: b.method || "GET",
            enctype: b.enctype || "",
            data: b.data || {}
        },
            d = document.createElement("form");
        d.style.visibility = "hidden";
        d.method = c.method;
        d.action = a + "?t=" + (new Date).getTime();
        d.enctype = c.enctype;
        if (Object.prototype.toString.call(c.data).indexOf("String") > -1) {
            var e = document.createElement("input");
            e.type = "text";
            e.name = c.data;
            d.appendChild(e)
        } else for (var h in c.data) e = document.createElement("input"), e.type = "text", e.name = h, e.value = c.data[h], d.appendChild(e);
        return d
    };
    this.setTimingRpt = function (a, b, c, d) {
        var e, h = window.webkitPerformance ? window.webkitPerformance : window.msPerformance,
            g = ["navigationStart", "unloadEventStart", "unloadEventEnd", "redirectStart", "redirectEnd", "fetchStart", "domainLookupStart", "domainLookupEnd", "connectStart", "connectEnd", "requestStart", "responseStart", "responseEnd", "domLoading", "domInteractive", "domContentLoadedEventStart", "domContentLoadedEventEnd", "domComplete", "loadEventStart", "loadEventEnd"],
            o = [];
        if ((h = h ? h : window.performance) && (e = h.timing)) {
            e.domContentLoadedEventStart ? d && (c = d) : e.domContentLoadedStart ? (g.splice(15, 2, "domContentLoadedStart", "domContentLoadedEnd"), d && (c = d)) : g.splice(15, 2, "domContentLoaded", "domContentLoaded");
            for (var d = e[g[0]], m = 1, H = g.length; m < H; m++) h = (h = e[g[m]]) ? h - d : 0, h > 0 && o.push(m + "=" + h);
            a = "http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=" + a + "&flag2=" + b + "&flag3=" + c + "&" + o.join("&");
            x(a)
        }
    };
    this.reportAppRun = function (a) {
        alloy.portal.getLoginLevel() > alloy.CONST.LOGIN_LEVEL_NONE && ~~a && alloy.rpcService.reportAppRun(a)
    };
    this.reportAppShare = function (a) {
        alloy.portal.getLoginLevel() > alloy.CONST.LOGIN_LEVEL_NONE && ~~a.appId && alloy.rpcService.reportAppShare(a)
    };
    var h = function () {
            alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL + "cgi/qqweb/time.do", {
                context: this,
                onSuccess: function (a) {
                    if (l === 1) if (a.retcode === 0) {
                        u = Math.ceil(a.millisTime - (+new Date + q) / 2);
                        l = isNaN(u) || isNaN(+new Date(+new Date + u)) ? u = 0 : 2;
                        for (; p.length;) p.shift()();
                        e.notifyObservers(d.svrDate, "timeReady")
                    } else ++v > 2 ? (e.notifyObservers(d.svrDate, "timeError"), l = 0) : setTimeout(h, 1E3)
                },
                onError: function () {
                    ++v > 2 ? (e.notifyObservers(d.svrDate, "timeError"), l = 0) : setTimeout(h, 1E3)
                },
                onTimeout: function () {
                    ++v > 2 ? (e.notifyObservers(d.svrDate, "timeError"), l = 0) : setTimeout(h, 1E3)
                }
            })
        };
    d.svrDate = function () {
        return new Date(+new Date + u)
    };
    d.svrDate.getInitState = function () {
        return l
    };
    d.svrDate.init = function (a) {
        a && a.callback && p.push(a.callback);
        l != 1 && (v = 0, q = +new Date, l = 1, h())
    };
    d.getLocaleTime = function (a, c) {
        var c = c || !1,
            d = new Date;
        !b.isUndefined(a) && a != "" && (c && b.isNumber(a) && (a *= 1E3), d = new Date(a));
        var e = d.getFullYear(),
            h = d.getMonth() + 1,
            d = d.getDate();
        return e.toString() + "-" + (h > 9 ? h : "0" + h) + "-" + (d > 9 ? d : "0" + d) + " " + (new Date(a)).toLocaleTimeString()
    }
});