Jx().$package(function (d) {
    var b = d.dom,
        i = d.event,
        j = d.browser,
        a, e, h, g, f, n, k, p;
    d.sound = d.sound || {};
    n = {
        _volume: 100,
        _boolMute: !1,
        _url: "",
        _id: -1,
        init: function () {
            throw "init does not implement a required interface";
        },
        load: function () {
            throw "load does not implement a required interface";
        },
        getVolume: function () {
            return this._volume
        },
        setVolume: function (a) {
            return !isNaN(a) && a >= 0 && a <= 100 ? (this._volume = a, this._correctVolume(), !0) : !1
        },
        _correctVolume: function () {
            this._setDirectVolume(this._volume * d.sound.Global._volume * !this._boolMute * !d.sound.Global._boolMute / 100)
        },
        _setDirectVolume: function () {
            throw "_setDirectVolume does not implement a required interface";
        },
        mute: function () {
            if (!this._boolMute) this._boolMute = !0, this._correntVolume()
        },
        unMute: function () {
            if (this._boolMute) this._boolMute = !1, this._correntVolume()
        },
        isMute: function () {
            return this._boolMute
        },
        play: function () {
            throw "play does not implement a required interface";
        },
        pause: function () {
            throw "pause does not implement a required interface";
        },
        stop: function () {
            throw "stop does not implement a required interface";
        },
        getDuration: function () {
            throw "getDuration does not implement a required interface";
        },
        getPosition: function () {
            throw "getPosition does not implement a required interface";
        },
        setPosition: function () {
            throw "setPosition does not implement a required interface";
        },
        free: function () {
            throw "free does not implement a required interface";
        }
    };
    e = {
        init: function (a, c, d) {
            var e = this;
            this._needEventSupport = !! d;
            this._url = a;
            this._id = g.length;
            if (c) c = new Audio, c.id = "audioSoundObject_" + this._id, this._onloadCallback = function () {
                e.play();
                e._obj.removeEventListener("canplay", e._onloadCallback, !1);
                e._onloadCallback = null
            }, c.addEventListener("canplay", this._onloadCallback, !1), b.id("sound_object_container").appendChild(c), this._obj = c, this.load.call(this, a);
            g.push(this)
        },
        load: function (a) {
            var c = this;
            if (a) this._url = a;
            else if (!this._url) return;
            if (!this._obj) a = new Audio, a.id = "audioSoundObject_" + this._id, this._needEventSupport && (a.addEventListener("durationchange", function () {
                i.notifyObservers(c, "durationchange")
            }, !1), a.addEventListener("timeupdate", function () {
                i.notifyObservers(c, "timeupdate")
            }, !1), a.addEventListener("canplay", function () {
                i.notifyObservers(c, "canplay")
            }, !1), a.addEventListener("ended", function () {
                i.notifyObservers(c, "ended")
            }, !1), a.addEventListener("play", function () {
                i.notifyObservers(c, "play")
            }, !1), a.addEventListener("pause", function () {
                i.notifyObservers(c, "pause")
            }, !1), a.addEventListener("progress", function () {
                i.notifyObservers(c, "progress")
            }, !1), a.addEventListener("error", function () {
                i.notifyObservers(c, "error")
            }, !1)), b.id("sound_object_container").appendChild(a), this._obj = a;
            this._obj.src = this._url;
            j.mobileSafari && this._obj.load()
        },
        _setDirectVolume: function (a) {
            if (this._obj) this._obj.volume = a / 100
        },
        play: function () {
            this._obj && this._obj.play()
        },
        pause: function () {
            if (this._obj) {
                if (this._onloadCallback) this._obj.removeEventListener("canplay", this._onloadCallback, !1), this._onloadCallback = null;
                this._obj.pause()
            }
        },
        stop: function () {
            this._obj && (this._obj.pause(), this.setPosition(0))
        },
        getDuration: function () {
            return !this._obj ? 0 : this._obj.duration
        },
        getPosition: function () {
            return !this._obj ? 0 : this._obj.currentTime
        },
        setPosition: function (a) {
            if (!this._obj) return !1;
            var b = this._obj;
            try {
                return a >= 0 && a < b.duration ? (b.currentTime = parseFloat(a), !0) : !1
            } catch (d) {
                return !1
            }
        },
        buffered: function () {
            if (!this._obj) return 0;
            var a = this._obj;
            return !a.buffered.length ? 0 : a.buffered.end(0)
        },
        free: function () {
            if (this._obj) {
                var a = this._obj;
                a.pause();
                b.id("sound_object_container").removeChild(a);
                this._obj = null
            }
            g[this._id] = null
        }
    };
    h = {
        init: function (a, c, d) {
            this._needEventSupport = !! d;
            this._url = a;
            this._id = g.length;
            if (c) f ? this._obj = f : (c = new Audio, c.id = "audioSoundObject_" + this._id, b.id("sound_object_container").appendChild(c), f = this._obj = c, this.load.call(this, a));
            g.push(this)
        },
        load: function (a) {
            var c = this;
            if (a) this._url = a;
            else if (!this._url) return;
            if (!this._obj) if (f) this._obj = f;
            else {
                var d = new Audio;
                d.id = "audioSoundObject_" + this._id;
                b.id("sound_object_container").appendChild(d);
                f = this._obj = d
            }
            if (this._needEventSupport && !this._hashEventSupport) d = this._obj, this._hashEventSupport = !0, d.addEventListener("durationchange", function () {
                d._inject || i.notifyObservers(c, "durationchange")
            }, !1), d.addEventListener("timeupdate", function () {
                d._inject || i.notifyObservers(c, "timeupdate")
            }, !1), d.addEventListener("canplay", function () {
                d._inject || i.notifyObservers(c, "canplay")
            }, !1), d.addEventListener("ended", function () {
                d._inject || i.notifyObservers(c, "ended")
            }, !1), d.addEventListener("play", function () {
                d._inject || i.notifyObservers(c, "play")
            }, !1), d.addEventListener("pause", function () {
                d._inject || i.notifyObservers(c, "pause")
            }, !1), d.addEventListener("progress", function () {
                d._inject || i.notifyObservers(c, "progress")
            }, !1), d.addEventListener("error", function () {
                d._inject || i.notifyObservers(c, "error")
            }, !1);
            this._obj.src = this._url;
            j.mobileSafari && this._obj.load()
        },
        _setDirectVolume: function (a) {
            if (this._obj) this._obj.volume = a / 100
        },
        play: function (a, b) {
            if (this._obj) {
                if (a) {
                    this._obj._inject = !0;
                    var d, e, f = this;
                    if (!this._obj.paused) d = this._obj.src, this._obj.ended || (e = this._obj.currentTime + 0.01);
                    this.load(b);
                    var g = function () {
                            f._obj.removeEventListener("ended", g, !1);
                            f._obj._inject = !1;
                            if (d && (f._obj.src = d, f._obj.muted = !0, f._obj.load(), e)) {
                                var a = function () {
                                        try {
                                            f._obj.currentTime = e, f._obj.muted = !1, f._obj.play()
                                        } catch (b) {
                                            setTimeout(a, 1E3)
                                        }
                                    };
                                a()
                            }
                        };
                    this._obj.addEventListener("ended", g, !1);
                    setTimeout(function () {
                        f._obj._inject && g()
                    }, 3E3)
                }
                this._obj.play()
            }
        },
        pause: function () {
            this._obj && this._obj.pause()
        },
        stop: function () {
            this._obj && (this._obj.pause(), this.setPosition(0))
        },
        getDuration: function () {
            return !this._obj ? 0 : this._obj.duration
        },
        getPosition: function () {
            return !this._obj ? 0 : this._obj.currentTime
        },
        setPosition: function (a) {
            if (!this._obj) return !1;
            var b = this._obj;
            try {
                return a >= 0 && a < b.duration ? (b.currentTime = parseFloat(a), !0) : !1
            } catch (d) {
                return !1
            }
        },
        buffered: function () {
            if (!this._obj) return 0;
            var a = this._obj;
            return !a.buffered.length ? 0 : a.buffered.end(0)
        },
        free: function () {
            if (this._obj) {
                var a = this._obj;
                a.pause();
                b.id("sound_object_container").removeChild(a);
                this._obj = null
            }
            g[this._id] = null
        }
    };
    a = {
        init: function (a, c, d) {
            this._fid = -1;
            this._needEventSupport = !! d;
            this._url = a;
            this._id = g.length;
            if (c) this._fid = b.id("JxSwfSound_Flash").loadSound(this._url, -1, !0), this._correctVolume();
            g.push(this)
        },
        load: function (a) {
            if (a) this._url = a;
            else if (!this._url) return;
            a = b.id("JxSwfSound_Flash");
            this._fid != -1 && a.free(this._fid);
            this._fid = a.loadSound(this._url, this._needEventSupport ? this._id : -1, !1);
            this._correctVolume()
        },
        _setDirectVolume: function (a) {
            this._fid != -1 && b.id("JxSwfSound_Flash").setVolume(this._fid, a)
        },
        play: function () {
            this._fid != -1 && b.id("JxSwfSound_Flash").playSound(this._fid)
        },
        pause: function () {
            this._fid != -1 && b.id("JxSwfSound_Flash").pauseSound(this._fid)
        },
        stop: function () {
            this._fid != -1 && b.id("JxSwfSound_Flash").stopSound(this._fid)
        },
        getDuration: function () {
            return this._fid == -1 ? 0 : b.id("JxSwfSound_Flash").getDuration(this._fid)
        },
        getPosition: function () {
            return this._fid == -1 ? 0 : b.id("JxSwfSound_Flash").getPosition(this._fid)
        },
        setPosition: function (a) {
            return this._fid == -1 ? !1 : b.id("JxSwfSound_Flash").setPosition(this._fid, a)
        },
        buffered: function () {
            return this._fid == -1 ? 0 : b.id("JxSwfSound_Flash").getBuffered(this._fid)
        },
        free: function () {
            this._fid != -1 && b.id("JxSwfSound_Flash").free(this._fid);
            g[this._id] = null
        }
    };
    k = function (a) {
        a == void 0 && (a = "./swf/jxswfsound.swf");
        var c = {
            id: "JxSwfSound_Flash",
            name: "JxSwfSound_Flash"
        },
            e = {
                menu: "false",
                wmode: "transparent",
                swLiveConnect: "true",
                allowScriptAccess: "always"
            },
            f = b.node("div", {
                id: "swfSound_Flash_div"
            }),
            g = b.id("sound_object_container");
        g.appendChild(f);
        b.setStyle(g, "display", "");
        try {
            d.swfobject.embedSWF(a, "swfSound_Flash_div", "1", "1", "8.0.0", "./swf/expressInstall.swf", !1, e, c)
        } catch (h) {
            d.error("J.Sound module error: " + h.message, "Sound")
        }
    };
    p = function (a, b) {
        var d = g[a];
        d && i.notifyObservers(d, b)
    };
    g = [];
    switch (d.browser.chrome ? 1 : d.platform.iPad ? 4 : window.Audio && (new Audio).canPlayType("audio/mpeg") ? 3 : d.browser.plugins.flash >= 9 ? 1 : 0) {
    case 1:
        d.sound = new d.Class(d.extend({}, n, a));
        d.sound.isReady = !1;
        d.sound.init = function (a) {
            if (!d.sound.isReady) {
                window.JxSwfSoundOnLoadCallback = function () {
                    d.sound.isReady = !0;
                    var a = b.id("sound_object_container");
                    b.setStyle(a, "width", "1px");
                    b.setStyle(a, "height", "1px");
                    i.notifyObservers(d.sound, "ready")
                };
                window.soundEventDispatcher = p;
                var c = b.node("div", {
                    id: "sound_object_container",
                    style: "position:absolute;left:0;top:0;width:100px;height:100px;overflow:hidden;"
                });
                (document.body || document.documentElement).appendChild(c);
                k(a && a.path)
            }
        };
        break;
    case 3:
        d.sound = new d.Class(d.extend({}, n, e));
        d.sound.isReady = !1;
        d.sound.init = function () {
            if (!d.sound.isReady) {
                var a = b.node("div", {
                    id: "sound_object_container",
                    style: "position:absolute;left:0;top:0;width:1px;height:1px;overflow:hidden;"
                });
                (document.body || document.documentElement).appendChild(a);
                d.sound.isReady = !0
            }
        };
        break;
    case 4:
        d.sound = new d.Class(d.extend({}, n, h));
        d.sound.isReady = !1;
        d.sound.init = function () {
            if (!d.sound.isReady) {
                var a = b.node("div", {
                    id: "sound_object_container",
                    style: "position:absolute;left:0;top:0;width:1px;height:1px;overflow:hidden;"
                });
                (document.body || document.documentElement).appendChild(a);
                d.sound.isReady = !0
            }
        };
        break;
    default:
        d.sound = new d.Class(d.extend({}, n, {
            init: function () {},
            load: function () {},
            _correctVolume: function () {},
            play: function () {},
            pause: function () {},
            stop: function () {},
            getDuration: function () {
                return -1
            },
            getPosition: function () {
                return 0
            },
            setPosition: function () {
                return !0
            },
            free: function () {}
        })), d.sound.init = function () {}, d.sound.isReady = !1
    }
    d.sound.Global = {
        _volume: 100,
        _boolMute: !1,
        getVolume: function () {
            return this._volume
        },
        setVolume: function (a) {
            if (!isNaN(a) && a >= 0 && a <= 100) {
                this._volume = a;
                for (var a = 0, b = g.length; a < b; a++) g[a] != null && g[a]._correctVolume();
                return !0
            }
            return !1
        },
        mute: function () {
            if (!this._boolMute) {
                this._boolMute = !0;
                for (var a = 0, b = g.length; a < b; a++) g[a] != null && g[a]._correctVolume()
            }
        },
        unMute: function () {
            if (this._boolMute) {
                this._boolMute = !1;
                for (var a = 0, b = g.length; a < b; a++) g[a] != null && g[a]._correctVolume()
            }
        },
        isMute: function () {
            return this._boolMute
        },
        removeAll: function () {
            for (var a = 0, b = g.length; a < b; a++) g[a] != null && g[a].free()
        }
    }
});