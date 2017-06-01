Jx().$package(function (d) {
    var b = window.location.host;
    d.cookie = {
        set: function (d, j, a, e, h) {
            if (h) {
                var g = new Date;
                g.setTime((new Date).getTime() + 36E5 * h)
            }
            window.document.cookie = d + "=" + j + "; " + (h ? "expires=" + g.toGMTString() + "; " : "") + (e ? "path=" + e + "; " : "path=/; ") + (a ? "domain=" + a + ";" : "domain=" + b + ";");
            return !0
        },
        get: function (b) {
            b = window.document.cookie.match(RegExp("(?:^|;+|\\s+)" + b + "=([^;]*)"));
            return !b ? "" : b[1]
        },
        remove: function (d, j, a) {
            window.document.cookie = d + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; " + (a ? "path=" + a + "; " : "path=/; ") + (j ? "domain=" + j + ";" : "domain=" + b + ";")
        }
    }
});