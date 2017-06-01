Jx().$package(function (d) {
    d.number = d.number || {};
    d.number.format = function (b, d) {
        for (var j = b ? b.toString().split(".") : ["0"], a = d ? d.split(".") : [""], e = "", h = j[0], g = a[0], f = h.length - 1, n = !1, k = g.length - 1; k >= 0; k--) switch (g.substr(k, 1)) {
        case "":
            f >= 0 && (e = h.substr(f--, 1) + e);
            break;
        case "0":
            e = f >= 0 ? h.substr(f--, 1) + e : "0" + e;
            break;
        case ",":
            n = !0, e = "," + e
        }
        if (f >= 0) if (n) for (g = h.length; f >= 0; f--) e = h.substr(f, 1) + e, f > 0 && (g - f) % 3 == 0 && (e = "," + e);
        else e = h.substr(0, f + 1) + e;
        e += ".";
        h = j.length > 1 ? j[1] : "";
        g = a.length > 1 ? a[1] : "";
        for (k = f = 0; k < g.length; k++) switch (g.substr(k, 1)) {
        case "":
            f < h.length && (e += h.substr(f++, 1));
            break;
        case "0":
            e += f < h.length ? h.substr(f++, 1) : "0"
        }
        return e.replace(/^,+/, "").replace(/\.$/, "")
    }
});