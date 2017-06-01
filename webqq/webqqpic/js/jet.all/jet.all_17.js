Jx().$package(function (d) {
    var b = d.dom,
        i = d.event,
        j = new d.Class({
            init: function (c, a) {
                a = d.array.toArray(a);
                return d.extend(c, {
                    easeIn: function (b) {
                        return c(b, a)
                    },
                    easeOut: function (b) {
                        return 1 - c(1 - b, a)
                    },
                    easeInOut: function (b) {
                        return b <= 0.5 ? c(2 * b, a) / 2 : (2 - c(2 * (1 - b), a)) / 2
                    }
                })
            }
        }),
        a = {
            linear: function (c) {
                return c
            },
            extend: function (c) {
                for (var a in c) this[a] = new j(c[a])
            }
        };
    a.extend({
        pow: function (c, a) {
            return Math.pow(c, a && a[0] || 6)
        },
        exponential: function (c) {
            return Math.pow(2, 8 * (c - 1))
        },
        circular: function (c) {
            return 1 - Math.sin(Math.acos(c))
        },
        sinusoidal: function (c) {
            return 1 - Math.sin((1 - c) * Math.PI / 2)
        },
        back: function (c, a) {
            a = a && a[0] || 1.618;
            return Math.pow(c, 2) * ((a + 1) * c - a)
        },
        bounce: function (c) {
            for (var a, b = 0, d = 1;; b += d, d /= 2) if (c >= (7 - 4 * b) / 11) {
                a = d * d - Math.pow((11 - 6 * b - 11 * c) / 4, 2);
                break
            }
            return a
        },
        elastic: function (c, a) {
            return Math.pow(2, 10 * --c) * Math.cos(20 * c * Math.PI * (a && a[0] || 1) / 3)
        }
    });
    d.array.forEach(["quadratic", "cubic", "quartic", "quintic"], function (c, b) {
        a[c] = new j(function (c) {
            return Math.pow(c, [b + 2])
        })
    });
    var e = new d.Class({
        init: function (c) {
            this.setOption(c)
        },
        setOption: function (c) {
            this.option = d.extend({
                duration: 500,
                loop: 1,
                fps: 1E3 / (c && c.duration || 500)
            }, c)
        },
        start: function () {
            if (!this.check()) return this;
            var c = this.option;
            this.time = 0;
            this.loop = c.loop;
            this.onStart.apply(this, arguments);
            this.startTimer();
            return this
        },
        pause: function () {
            this.stopTimer();
            return this
        },
        resume: function () {
            this.startTimer();
            return this
        },
        end: function () {
            this.stopTimer() && this.onEnd.apply(this, arguments);
            return this
        },
        cancel: function () {
            this.stopTimer() && this.onCancel.apply(this, arguments);
            return this
        },
        onStart: function () {
            i.notifyObservers(this, "start")
        },
        onEnd: function () {
            i.notifyObservers(this, "end")
        },
        onCancel: function () {
            i.notifyObservers(this, "cancel")
        },
        onLoop: function () {
            i.notifyObservers(this, "loop")
        },
        onBeater: function () {
            i.notifyObservers(this, "beater")
        },
        check: function () {
            return !this.timer ? !0 : !1
        },
        setDuration: function (c) {
            this.option.duration = c || 500
        },
        update: function () {
            var c = d.now(),
                a = this.option;
            if (c < this.time + this.option.duration) this.onBeater((c - this.time) / a.duration);
            else this.onBeater(1), this.onLoop(), a.loop <= 0 || --this.loop ? this.time = c : (this.stopTimer(), this.onEnd())
        },
        stopTimer: function () {
            if (!this.timer) return !1;
            this.time = d.now() - this.time;
            this.timer = n(this);
            return !0
        },
        startTimer: function () {
            if (this.timer) return !1;
            this.time = d.now() - this.time;
            this.timer = f(this);
            return !0
        }
    }),
        h = {},
        g = {},
        f = function (c) {
            var a = c.option.fps,
                b = h[a] || (h[a] = []);
            b.push(c);
            g[a] || (g[a] = setInterval(function () {
                for (var c = b.length; c--;) b[c] && b[c].update()
            }, Math.round(1E3 / a)));
            return !0
        },
        n = function (c) {
            var a = c.option.fps,
                b = h[a] || [];
            d.array.remove(b, c);
            !b.length && g[a] && (g[a] = clearInterval(g[a]));
            return !1
        },
        k = new d.Class({
            extend: e
        }, {
            init: function (c) {
                k.superClass.init.apply(this, arguments);
                this.option = this.option || {};
                c = d.extend(this.option, {
                    element: null,
                    property: "",
                    from: 0,
                    to: 1,
                    unit: !1,
                    transition: a.linear,
                    fps: 25,
                    converter: p
                }, c);
                this.from = c.from;
                this.to = c.to
            },
            getTransition: function () {
                return this.option.transition || a.sinusoidal.easeInOut
            },
            set: function (c) {
                var a = this.option;
                this.render(a.element, a.property, c, a.unit);
                return this
            },
            setFromTo: function (c, a) {
                this.from = c;
                this.to = a
            },
            render: function (c, a, d, e) {
                b.setStyle(c, a, this.option.converter(d, e))
            },
            compute: function (c, a, b) {
                return (a - c) * b + c
            },
            onStart: function (c, a) {
                var b = this.option;
                this.from = d.isNumber(c) ? c : b.from;
                this.to = d.isNumber(a) ? a : b.to;
                i.notifyObservers(this, "start")
            },
            onEnd: function () {
                this.set(this.compute(this.from, this.to, this.option.transition(1)));
                i.notifyObservers(this, "end")
            },
            onCancel: function () {
                this.set(this.compute(this.from, this.to, this.option.transition(0)));
                i.notifyObservers(this, "cancel")
            },
            onBeater: function (c) {
                this.set(this.compute(this.from, this.to, this.option.transition(c)))
            }
        }),
        p = function (c, a) {
            return a ? c + a : c
        },
        o = new d.Class({
            init: function (c) {
                this.option = c = d.extend({
                    element: null,
                    property: "",
                    from: 0,
                    to: 0,
                    unit: !1,
                    duration: 500,
                    transition: a.linear,
                    fps: 25
                }, c);
                this.from = c.from;
                this.to = c.to
            },
            getTransition: function () {
                return this.option.transition || a.sinusoidal.easeInOut
            },
            update: function () {
                var a = d.now(),
                    b = this.option;
                a < this.time + this.option.duration ? this.set(this.compute(this.from, this.to, b.transition((a - this.time) / b.duration))) : (this.set(this.compute(this.from, this.to, 1)), this.end())
            },
            set: function (a) {
                var b = this.option;
                this.render(b.element, b.property, a, b.unit);
                return this
            },
            setDuration: function (a) {
                this.option.duration = a || 500
            },
            setFromTo: function (a, b) {
                this.from = a;
                this.to = b
            },
            render: function (a, d, e, f) {
                b.setStyle(a, d, f ? e + f : e)
            },
            compute: function (a, b, d) {
                return (b - a) * d + a
            },
            check: function () {
                return !this.timer ? !0 : !1
            },
            start: function (a, b) {
                if (!this.check(a, b)) return this;
                var e = this.option;
                this.from = d.isNumber(a) ? a : e.from;
                this.to = d.isNumber(b) ? b : e.to;
                this.time = 0;
                this.startTimer();
                this.onStart();
                return this
            },
            end: function () {
                if (this.stopTimer()) this.onEnd();
                return this
            },
            cancel: function () {
                if (this.stopTimer()) this.onCancel();
                return this
            },
            onStart: function () {
                i.notifyObservers(this, "start")
            },
            onEnd: function () {
                i.notifyObservers(this, "end")
            },
            onCancel: function () {
                i.notifyObservers(this, "cancel")
            },
            pause: function () {
                this.stopTimer();
                return this
            },
            resume: function () {
                this.startTimer();
                return this
            },
            stopTimer: function () {
                if (!this.timer) return !1;
                this.time = d.now() - this.time;
                this.timer = n(this);
                return !0
            },
            startTimer: function () {
                if (this.timer) return !1;
                this.time = d.now() - this.time;
                this.timer = f(this);
                return !0
            }
        });
    d.fx.Beater = e;
    d.fx.Animation = k;
    d.fx.Animation2 = o;
    d.fx.transitions = a
});
Jx().$package(function (d) {
    d.ui = d.ui || {}
});