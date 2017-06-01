Jx().$package(function (d) {
    var b = d.dom,
        i = d.event;
    d.ui.Tab = function (b, a, d) {
        this.tabs = [];
        this.currentTab = null;
        this.config = {
            defaultIndex: 0,
            triggerEvent: "click",
            slideEnabled: !1,
            slideInterval: 5E3,
            slideDelay: 300,
            autoInit: !0,
            onShow: function () {}
        };
        this.setConfig(d);
        b && a && (this.addRange(b, a), this.config.autoInit && this.init())
    };
    d.ui.Tab.prototype = {
        setConfig: function (b) {
            if (b) for (var a in b) this.config[a] = b[a]
        },
        add: function (b) {
            if (b && b.trigger) this.tabs.push(b), b.trigger.style.display = "block"
        },
        addRange: function (b, a) {
            if (b && a && b.length && a.length && b.length == a.length) for (var d = 0, h = b.length; d < h; d++) this.add({
                trigger: b[d],
                sheet: a[d]
            })
        },
        select: function (d) {
            if (d && !(this.currentTab && d.trigger == this.currentTab.trigger)) {
                if (this.currentTab && (b.removeClass(this.currentTab.trigger, "current"), this.currentTab.sheet)) this.currentTab.sheet.style.display = "none";
                this.currentTab = d;
                this.show()
            }
        },
        remove: function (d) {
            if (d) {
                if (d.trigger) b.removeClass(d.trigger, "current"), d.trigger.style.display = "none";
                if (d.sheet) d.sheet.style.display = "none";
                var a = this.indexOf(d);
                this.tabs.splice(a, a);
                d.trigger == this.currentTab.trigger && (a == 0 ? this.select(this.tabs[a + 1]) : this.select(this.tabs[a - 1]))
            }
        },
        show: function () {
            if (this.currentTab.trigger) this.currentTab.trigger.style.display = "block";
            b.addClass(this.currentTab.trigger, "current");
            if (this.currentTab.sheet) this.currentTab.sheet.style.display = "block";
            this.config.onShow.call(this);
            i.notifyObservers(this, "show", this.currentTab)
        },
        slide: function () {
            function b() {
                var a = g.indexOf(g.currentTab);
                a != -1 && (f = window.setInterval(function () {
                    var b = g.tabs[++a % g.tabs.length];
                    b && g.select(b)
                }, h.slideInterval))
            }
            function a() {
                window.clearTimeout(n);
                window.clearInterval(f)
            }
            function e() {
                n = window.setTimeout(b, h.slideDelay)
            }
            var h = this.config,
                g = this,
                f, n;
            d.array.forEach(this.tabs, function (b) {
                i.on(b.trigger, "mouseover", a);
                i.on(b.sheet, "mouseover", a);
                i.on(b.trigger, "mouseout", e);
                i.on(b.sheet, "mouseout", e)
            });
            b()
        },
        next: function () {
            var b = this.indexOf(this.currentTab);
            b != -1 && (++b == this.tabs.length && (b = 0), (b = this.tabs[b]) && this.select(b))
        },
        prev: function () {
            var b = this.indexOf(this.currentTab);
            b != -1 && (--b == -1 && (b = this.tabs.length - 1), (b = this.tabs[b]) && this.select(b))
        },
        indexOf: function (b) {
            for (var a = 0, d = this.tabs.length; a < d; a++) if (b.trigger == this.tabs[a].trigger) return a;
            return -1
        },
        init: function () {
            var b = this.config,
                a = this;
            d.array.forEach(this.tabs, function (d) {
                i.on(d.trigger, b.triggerEvent, function () {
                    a.select.call(a, d)
                });
                if (d.sheet) d.sheet.style.display = "none"
            });
            this.select(this.tabs[b.defaultIndex]);
            b.slideEnabled && this.slide()
        }
    }
});