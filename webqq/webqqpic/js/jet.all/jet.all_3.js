Jx().$package(function (d) {
    d.browserOptions = {
        adjustBehaviors: !0,
        htmlClass: !0
    };
    d.host = window.location.host;
    var b = navigator.platform.toLowerCase(), i = navigator.userAgent.toLowerCase(), j = navigator.plugins, a, e, h, g, f;
    g = function (a, b) {
        a = ("" + a).replace(/_/g, ".");
        b = b || 1;
        a = String(a).split(".");
        a = a[0] + "." + (a[1] || "0");
        return a = Number(a).toFixed(b)
    };
    a = {
        getPlatform: function () {return b},
        name: window.orientation != void 0 ? "iPod" : (b.match(/mac|win|linux/i) || ["unknown"])[0],
        version: 0,
        iPod: 0,
        iPad: 0,
        iPhone: 0,
        android: 0,
        win: 0,
        linux: 0,
        mac: 0,
        set: function (a, b) {
            this.name = a;
            this.version = b;
            this[a] = b
        }
    };
    a[a.name] = !0;
    (f = i.match(/windows ([\d.]+)/)) ? a.set("win", g(f[1])) : (f = i.match(/windows nt ([\d.]+)/)) ? a.set("win", g(f[1])) : (f = i.match(/linux ([\d.]+)/)) ? a.set("linux", g(f[1])) : (f = i.match(/mac ([\d.]+)/)) ? a.set("mac", g(f[1])) : (f = i.match(/ipod ([\d.]+)/)) ? a.set("iPod", g(f[1])) : (f = i.match(/ipad[\D]*os ([\d_]+)/)) ? a.set("iPad", g(f[1])) : (f = i.match(/iphone ([\d.]+)/)) ? a.set("iPhone", g(f[1])) : (f = i.match(/android ([\d.]+)/)) && a.set("android", g(f[1]));
    e = {
        features: {
            xpath: !! document.evaluate,
            air: !! window.runtime,
            query: !! document.querySelector
        },
        getPlugins: function () {
            return j
        },
        plugins: {
            flash: function () {
                var a = 0;
                if (j && j.length) {
                    var b = j["Shockwave Flash"];
                    b && b.description && (a = g(b.description.match(/\b(\d+)\.\d+\b/)[1], 1) || a)
                } else for (b = 13; b--;) try {
                    new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + b);
                    a = g(b);
                    break
                } catch (c) {}
                return a
            }()
        },
        getUserAgent: function () {
            return i
        },
        name: "unknown",
        version: 0,
        ie: 0,
        firefox: 0,
        chrome: 0,
        opera: 0,
        safari: 0,
        mobileSafari: 0,
        adobeAir: 0,
        set: function (a, b) {
            this.name = a;
            this.version = b;
            this[a] = b
        }
    };
    (f = i.match(/msie ([\d.]+)/)) ? e.set("ie", g(f[1])) : (f = i.match(/firefox\/([\d.]+)/)) ? e.set("firefox", g(f[1])) : (f = i.match(/chrome\/([\d.]+)/)) ? e.set("chrome", g(f[1])) : (f = i.match(/opera.([\d.]+)/)) ? e.set("opera", g(f[1])) : (f = i.match(/adobeair\/([\d.]+)/)) ? e.set("adobeAir", g(f[1])) : (f = i.match(/version\/([\d.]+).*safari/)) && e.set("safari", g(f[1]));
    (f = i.match(/version\/([\d.]+).*mobile.*safari/)) && e.set("mobileSafari", g(f[1]));
    a.iPad && e.set("mobileSafari", "0.0");
    if (e.ie) document.documentMode ? document.documentMode !== Math.floor(e.ie) && e.set("ie", g(document.documentMode)) : document.documentMode = Math.floor(e.ie);
    h = {
        name: "unknown",
        version: 0,
        trident: 0,
        gecko: 0,
        webkit: 0,
        presto: 0,
        set: function (a, b) {
            this.name = a;
            this.version = b;
            this[a] = b
        }
    };
    (f = i.match(/trident\/([\d.]+)/)) ? h.set("trident", g(f[1])) : (f = i.match(/gecko\/([\d.]+)/)) ? h.set("gecko", g(f[1])) : (f = i.match(/applewebkit\/([\d.]+)/)) ? h.set("webkit", g(f[1])) : (f = i.match(/presto\/([\d.]+)/)) && h.set("presto", g(f[1]));
    e.ie && (e.ie == 6 ? h.set("trident", g("4")) : (e.ie == 7 || e.ie == 8) && h.set("trident", g("5")));
    if (d.browserOptions.adjustBehaviors && e.ie && e.ie < 7) try { document.execCommand("BackgroundImageCache", !1, !0) } catch (n) {}
    var k = function (a) { return String(a).replace(/\./gi, "_") };
    d.browserOptions.htmlClass &&
    function () {
        var b = document.documentElement,
            d = [b.className];
        d.push("javascriptEnabled");
        d.push(a.name);
        d.push(a.name + k(a.version));
        d.push(e.name);
        d.push(e.name + k(e.version));
        document.documentMode && d.push("documentMode_" + document.documentMode);
        d.push(h.name);
        d.push(h.name + k(h.version));
        e.plugins.flash && (d.push("flash"), d.push("flash" + k(e.plugins.flash)));
        typeof window.webTop != "undefined" && window.webTop && d.push("webTop");
        b.className = d.join(" ")
    }();
    d.platform = a;
    d.browser = e;
    d.browser.engine = h
});