Jx().$package(function (d) {
    d.date = d.date || {};
    d.date.format = function (b, d) {
        var j = {
            "M+": b.getMonth() + 1,
            "D+": b.getDate(),
            "h+": b.getHours(),
            "m+": b.getMinutes(),
            "s+": b.getSeconds(),
            "q+": Math.floor((b.getMonth() + 3) / 3),
            S: b.getMilliseconds()
        };
        /(Y+)/.test(d) && (d = d.replace(RegExp.$1, (b.getFullYear() + "").substr(4 - RegExp.$1.length)));
        for (var a in j) RegExp("(" + a + ")").test(d) && (d = d.replace(RegExp.$1, RegExp.$1.length == 1 ? j[a] : ("00" + j[a]).substr(("" + j[a]).length)));
        return d
    }
});