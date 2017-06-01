Jet().$package("qqweb.util.group", function (b) {
    var d = b.http,
        c = !1;
    this.loadGroupClass = function (b, g) {
        if (c) return typeof b != "undefined" && b(g), !0;
        d.loadScript(alloy.CONST.CDN_URL_0 + "js/qqweb.util.group.js?20110316", {
            onSuccess: function () {
                c = !0;
                typeof b != "undefined" && b(g)
            }
        })
    };
    this.isLoadData = function () {
        return c
    }
});

Jet().$package("qqweb.util.loclist", function (b) {
    var d = b.http,
        c = !1;
    this.loadData = function (b, g) {
        if (c) return typeof b != "undefined" && b(g), !0;
        d.loadScript(alloy.CONST.CDN_URL_0 + "js/qqweb.util.loclist.js?20110316", {
            onSuccess: function () {
                c = !0;
                typeof b != "undefined" && b(g)
            }
        })
    };
    this.isDataLoaded = function () {
        return c
    }
});
Jx().$package("alloy.util.stat", function (b) {
    function d(b) {
        return (String(b).match(/(\d)+/g) || []).join(".")
    }
    this.report = function () {
        var c = alloy.util.report2qqweb,
            e;
        e = b.browser.name;
        var g = b.browser.version,
            j = navigator.userAgent,
            l;
        (l = j.match(/Maxthon[\s|\/]([\d.]*)/)) ? (e = "maxthon", g = l[1] ? d(l[1]) : 0) : j.match(/TheWorld/) ? (e = "theworld", g = 0) : (l = j.match(/SE\s([\d.]*)/)) ? (e = "sougou", g = l[1] ? d(l[1]) : 0) : (l = j.match(/QQBrowser\/([\d.]*)/)) ? (e = "qq", g = l[1] ? d(l[1]) : 0) : (l = j.match(/TencentTraveler\s([\d.]*)/)) ? (e = "tt", g = l[1] ? d(l[1]) : 0) : j.match(/360SE/) && (e = "360", g = 0);
        e = {
            name: e,
            version: g
        };
        g = {
            name: b.platform.name,
            version: b.platform.version
        };
        j = {
            width: screen.width,
            height: screen.height
        };
        e = e.name + "|" + e.version;
        g = g.name + "|" + g.version;
        j = j.width + "," + j.height;
        l = b.GetSwfVer();
        l = String(l);
        c("monitor|browser|" + e);
        c("monitor|os|" + g);
        c("monitor|resolution|" + j);
        c("monitor|flashversion|" + l)
    }
});