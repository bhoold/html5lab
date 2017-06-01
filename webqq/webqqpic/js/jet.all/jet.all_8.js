Jx().$package(function (d) {
    var b = d.event,
        i = {
            "#": "id",
            ".": "className",
            "@": "el",
            "!": "!"
        },
        j = {
            blur: 1,
            focus: 1,
            change: 1
        };
    d.event.eventProxy = function (a, e) {
        var h = {},
            g, f;
        for (g in e) {
            f = e[g];
            var n = g.split(" "),
                k = n[0],
                n = n[1];
            h[n] = h[n] || [];
            h[n].push([k, f])
        }
        g = f = null;
        for (g in h) if (f = h[g], j[g] || g.charAt(0) == "@") for (n = f.length - 1; n >= 0; n--) for (var k = f[n][0].split(","), p = k.length - 1; p >= 0; p--) {
            var o = i[k[p].charAt(0)];
            if (o == "id") b.on($D.id(k[p].substr(1)), g, f[n][1]);
            else if (o == "el") b.on(a, g.substr(1), f[n][1])
        } else b.on(a, g, function (c) {
            for (var a = f.length - 1; a >= 0; a--) d.event.eventParser.parse(f[a][0], f[a][1], c)
        })
    }
});