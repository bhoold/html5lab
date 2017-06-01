(function () {
    var d = this,
        b = d.Jx,
        i = {},
        j = {},
        a = {
            NO_DEBUG: 0,
            SHOW_ALL: 1
        },
        e = {
            debug: 1
        },
        h = function (b, a, d) {
            b = String(b);
            e.debug && this.console && (this.console.out ? this.console.out(b, a, d) : alert(b + " - \u6d88\u606f\u7c7b\u578b[" + d + "]"));
            return b
        };
    try {
        if (typeof b === "undefined" || b.mark && b.mark === "JxMark") {
            if (b) i = b.VERSIONS, j = b.PACKAGES;
            b = function (a, d) {
                var e = this;
                if (d) this._init();
                else if (a) {
                    a = String(a);
                    try {
                        if (b.VERSIONS[a]) e = b.VERSIONS[a];
                        else throw e = b.VERSIONS[b.DEFAULT_VERSION], Error("\u6ca1\u6709\u627e\u5230 JET version " + a + ", \u6240\u4ee5\u8fd4\u56de\u9ed8\u8ba4\u7248\u672c JET version " + b.DEFAULT_VERSION + "!");
                    } catch (g) {
                        e.out("A.\u9519\u8bef\uff1a[" + g.name + "] " + g.message + ", " + g.fileName + ", \u884c\u53f7:" + g.lineNumber + "; stack:" + typeof g.stack, 2)
                    }
                } else e = b.VERSIONS[b.DEFAULT_VERSION];
                return e
            };
            b.prototype = {
                version: "1.0",
                DEBUG: a,
                option: e,
                _init: function () {
                    this.constructor = b
                },
                $namespace: function (b) {
                    for (var a, d = b.split("."), e = window, b = 0; b < d.length; b += 1) a = d[b], e[a] = e[a] || {}, e = e[d[b]];
                    return e
                },
                $package: function () {
                    var a = arguments[0],
                        e = arguments[arguments.length - 1],
                        g = d;
                    if (typeof e === "function") typeof a === "string" ? (g = this.$namespace(a), b.PACKAGES[a] || (b.PACKAGES[a] = {
                        isLoaded: !0,
                        returnValue: void 0
                    }), g.packageName = a) : typeof a === "object" && (g = a), e.call(g, this);
                    else throw Error("Function required");
                },
                checkPackage: function (a) {
                    return b.PACKAGES[a]
                },
                out: h,
                debug: function () {},
                profile: function () {},
                warn: function () {},
                error: function () {},
                startTime: +new Date,
                about: function () {
                    return this.out("JET (Javascript Extend Tools)\nversion: " + this.version + "\n\nCopyright (c) 2009, All rights reserved.")
                },
                toString: function () {
                    return "JET version " + this.version + " !"
                }
            };
            b.VERSIONS = i;
            b.PACKAGES = j;
            b.VERSIONS["1.0"] = new b("1.0", !0);
            b.DEFAULT_VERSION = "1.0";
            b.mark = "JxMark";
            d.Jet = d.Jx = b
        } else throw Error('"Jx" name is defined in other javascript code !!!');
    } catch (g) {
        h("JET \u5fae\u5185\u6838\u521d\u59cb\u5316\u5931\u8d25! B.\u9519\u8bef\uff1a[" + g.name + "] " + g.message + ", " + g.fileName + ", \u884c\u53f7:" + g.lineNumber + "; stack:" + typeof g.stack, 1)
    }
})();