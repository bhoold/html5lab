Jx().$package(function (d) {
    var b = d.dom.id,
        i = d.dom,
        j = d.event,
        a = d.string,
        e = d.http,
        h = this,
        g = d.string.mapQuery(window.location.search),
        f = window.open;
    window.open = function (a, b, e, c) {
        b == void 0 && (b = "_blank");
        e == void 0 && (e = "");
        c == void 0 && (c = !1);
        return !f(a, b, e, c) ? (d.out("\u4f60\u7684\u673a\u5668\u4e0a\u6709\u8f6f\u4ef6\u62e6\u622a\u4e86\u5f39\u51fa\u7a97\u53e3"), !1) : !0
    };
    var n = new d.Class({
        _defaultType: 3,
        _defaultTag: "information",
        _defaultTemplate: "<%=msg%>(<%=type%>#<%=tag%>@<%=time%>)",
        TYPE: ["PROFILE", "WARNING", "ERROR", "INFO", "DEBUG"],
        init: function (a) {
            this.msg = a.msg || "";
            this.tag = a.tag || this._defaultTag;
            this.type = d.isUndefined(a.type) ? this._defaultType : a.type;
            this.time = (new Date).valueOf();
            this._template = a.template || this._defaultTemplate
        },
        format: function (b, d, e) {
            e = e || this._template;
            return d ? a.encodeHtml(a.template(e, b)) : a.template(e, b)
        },
        parseOption: function () {
            return {
                msg: this.msg,
                time: this.time,
                type: this.TYPE[this.type],
                tag: this.tag
            }
        },
        toString: function (a, b) {
            return this.format(this.parseOption(), a, b || this._template)
        }
    });
    d.config = {
        debugLevel: 1
    };
    d.console = {};
    d.Report = {
        receive: d.emptyFunc,
        addRule: d.emptyFunc
    };
    d.extend(d.console, {
        _isCreated: !1,
        _maxLength: 1E3,
        _html: '<div id="ConsoleBoxHead" class="consoleBoxHead">\t\t\t\t\t\t<a href="###" id="ConsoleCloseButton" class="consoleCloseButton" title="\u5173\u95ed">X</a>\t\t\t\t\t\t<a href="###" id="ConsoleClearButton" class="consoleCloseButton" title="\u6e05\u9664\u6240\u6709\u65e5\u5fd7">cls</a>\t\t\t\t\t\t<a href="###" id="ConsoleRefreshButton" class="consoleCloseButton" title="\u8fd8\u539f\u6240\u6709\u65e5\u5fd7">r</a>\t\t\t\t\t\t<a href="###" id="ConsoleHelpButton" class="consoleCloseButton" title="\u63a7\u5236\u53f0\u5e2e\u52a9">H</a>\t\t\t\t\t\t<h5 class="title" title="\u63a7\u5236\u53f0">Console</h5>\t\t\t\t\t</div>\t\t\t\t\t<div id="consoleMain" class="consoleMain">\t\t\t\t\t\t<ul id="ConsoleOutput" class="consoleOutput"></ul>\t\t\t\t\t</div>\t\t\t\t\t<div class="consoleInputBox">\t\t\t\t\t\t&gt;<input id="ConsoleInput" class="consoleInput" title="\u8bf7\u8f93\u5165\u63a7\u5236\u53f0\u6307\u4ee4\u6216\u8005Javascript\u8bed\u53e5..." />\t\t\t\t\t</div>',
        _opened: !1,
        _log_record: [],
        _cmd_history: [],
        _cmd_last_index: 0,
        isCustomConsole: !0,
        _templateArr: ["<%=msg%>", "<%=msg%>(<%=type%>#<%=tag%>@<%=time%>)"],
        _templateType: 0,
        _typeInfo: [
            ["log_profile_type", "\u2514"],
            ["log_warning_type", "!"],
            ["log_error_type", "x"],
            ["log_info_type", "i"],
            ["log_debug_type", "\u221a"]
        ],
        TYPE: {
            PROFILE: 0,
            WARNING: 1,
            ERROR: 2,
            INFO: 3,
            DEBUG: 4
        },
        show: function () {
            this._isCreated || this._create();
            this._opened = !0;
            this._main.style.display = "block";
            this.render();
            window.setTimeout(d.bind(this.focusCommandLine, this), 0)
        },
        hide: function (a) {
            a && a.preventDefault();
            this.clear();
            d.console._main.style.display = "none";
            d.console._opened = !1
        },
        enable: function () {
            d.option.console = !0;
            this.show()
        },
        disable: function () {
            d.option.console = !1;
            this.hide()
        },
        _init: function () {
            j.on(document, "keydown", d.bind(this.handleDocumentKeydown, this));
            d.option.console && this.show();
            this.setToDebug()
        },
        _create: function () {
            e.loadCss(d.path + "assets/jet.css");
            this._main = document.createElement("div");
            this._main.id = "JxConsole";
            this._main.style.display = "none";
            this._main.className = "consoleBox";
            this._main.innerHTML = this._html;
            window.document.body.appendChild(this._main);
            var a = i.getClientWidth(),
                f = i.getClientHeight(),
                a = a - 210 - 300;
            i.setStyle(this._main, "top", f - 50 - 310 + "px");
            i.setStyle(this._main, "left", a + "px");
            this._headEl = b("ConsoleBoxHead");
            this._inputEl = b("ConsoleInput");
            this._closeButtonEl = b("ConsoleCloseButton");
            this._clsButtonEl = b("ConsoleClearButton");
            this._refreshButtonEl = b("ConsoleRefreshButton");
            this._helpButtonEl = b("ConsoleHelpButton");
            this._outputEl = b("ConsoleOutput");
            this._consoleMainEl = b("consoleMain");
            d.ui.Drag && new d.ui.Drag(this._headEl, this._main);
            j.on(this._inputEl, "keyup", d.bind(this.onInputKeyup, this));
            j.on(this._clsButtonEl, "click", d.bind(this.clear, this));
            j.on(this._refreshButtonEl, "click", d.bind(this.refresh, this));
            j.on(this._helpButtonEl, "click", d.bind(this.help, this));
            j.on(this._closeButtonEl, "click", d.bind(this.hide, this));
            f = {
                hScrollbar: !0,
                vScrollbar: !0,
                checkDOMChanges: !1,
                desktopCompatibility: !0
            };
            if (d.browser.mobileSafari && d.ui.iScroll && !this.consoleScroller) this.consoleScroller = new d.ui.iScroll(this._outputEl, f), d.debug("!!!!2", "console");
            this._isCreated = !0
        },
        handleDocumentKeydown: function (a) {
            switch (a.keyCode) {
            case 192:
                a.ctrlKey && a.shiftKey && (this.toggleShow(), a.preventDefault())
            }
        },
        focusCommandLine: function () {
            this._inputEl.focus()
        },
        toggleShow: function () {
            this._opened ? this.hide() : this.show()
        },
        outConsoleShow: function (a, b) {
            this.outConsole(a, b);
            !this._opened && d.option.console && this.show()
        },
        outConsole: function (a) {
            if (this._opened) {
                var b = document.createElement("li");
                this._outputEl.appendChild(b);
                var e = d.console._typeInfo[a.type] || d.console._typeInfo[0],
                    c = this._templateArr[this._templateType];
                b.className = e[0];
                b.innerHTML = '<div class="log_icon" title="' + e[0] + '">' + e[1] + '</div><div class="log_text">' + a.toString(!0, c) + "</div>";
                this.consoleScroller && this.consoleScroller.refresh();
                this._consoleMainEl.scrollTop = this._consoleMainEl.scrollHeight
            }
        },
        print: function (a) {
            var b = document.createElement("li");
            this._outputEl.appendChild(b);
            b.innerHTML = a;
            this._consoleMainEl.scrollTop = this._consoleMainEl.scrollHeight
        },
        out: function (a, b, d) {
            var c = this._templateArr[this._templateType],
                a = new n({
                    msg: a,
                    tag: b,
                    type: d
                });
            this.logRecord(a);
            g && g.consolefilter ? a.tag == g.consolefilter && (this.isCustomConsole ? this.outConsole(a) : h.console.log(a.toString(!1, c))) : this.isCustomConsole ? this.outConsole(a) : h.console.log(a.toString(!1, c))
        },
        profile: function (a, b) {
            this.out(a, b || "system", 0)
        },
        warn: function (a, b) {
            this.out(a, b, 1)
        },
        error: function (a, b) {
            this.out(a, b, 2)
        },
        info: function (a, b) {
            this.out(a, b, 3)
        },
        debug: function (a, b) {
            this.out(a, b, 4)
        },
        setToDebug: function () {
            this.isCustomConsole = g.console && g.console == "firebug" ? !1 : !0
        },
        setToNoDebug: function () {
            this.out = d.emptyFunc
        },
        logRecord: function (a) {
            this._log_record.push(a);
            g.console || this._log_record.length > this._maxLength && this._log_record.shift()
        },
        setTemplate: function (a) {
            if (this._templateArr[a]) this._templateType = a
        },
        filter: function (a) {
            var b = RegExp(a, "i"),
                e = [];
            d.array.forEach(this._log_record, function (a) {
                var d = a.toString(!0);
                b.test(d) && e.push(a)
            });
            return e
        },
        filterByType: function (a, b) {
            var e = [],
                a = a || [];
            d.array.forEach(a, function (a) {
                var f = !1;
                d.array.forEach(b, function (b) {
                    a.type == b && (f = !0)
                });
                f && e.push(a)
            });
            return e
        },
        filterByTag: function (a, b) {
            var e = [],
                a = a || [];
            d.array.forEach(a, function (a) {
                var f = !1;
                d.array.forEach(b, function (b) {
                    a.tag == b && (f = !0)
                });
                f && e.push(a)
            });
            return e
        },
        filterByMsg: function (a, b) {
            var e = [],
                a = a || [];
            d.array.forEach(a, function (a) {
                var f = !1;
                d.array.forEach(b, function (b) {
                    a.msg.indexOf(b) > -1 && (f = !0)
                });
                f && e.push(a)
            });
            return e
        },
        getReport: function (a, b, e) {
            var c = [],
                f = this._log_record,
                g = this;
            !a || a == "" ? a = !1 : d.isArray(a) || (a = [a]);
            !b || b == "" ? b = !1 : d.isArray(b) || (b = [b]);
            !e || e == "" ? e = !1 : d.isArray(e) || (e = [e]);
            a && (f = this.filterByType(f, a));
            b && (f = this.filterByTag(f, b));
            e && (f = this.filterByMsg(f, e));
            d.array.forEach(f, function (a) {
                c.push(a.toString(!1, g._templateArr[1]))
            });
            return c.join(",")
        },
        render: function (a, b) {
            a = a || this._log_record;
            b || (a = a.slice(-15));
            var e = this;
            e.clear();
            d.array.forEach(a, function (a) {
                e.outConsole(a)
            })
        },
        clear: function (a) {
            a && a.preventDefault();
            d.console._outputEl.innerHTML = ""
        },
        refresh: function (a) {
            a && a.preventDefault();
            this.clear();
            this.render()
        },
        help: function (a) {
            a && a.preventDefault();
            this.print("&lt;&lt; Console Help &gt;&gt;<br/>\t\t\t\t\t\t\t\thelp|h  : \u63a7\u5236\u53f0\u5e2e\u52a9<br/>\t\t\t\t\t\t\t\tclear|cls : \u6e05\u7a7a\u63a7\u5236\u53f0\u8f93\u51fa<br/>\t\t\t\t\t\t\t\trefresh|r : \u5237\u65b0\u63a7\u5236\u53f0\u8f93\u51fa<br/>\t\t\t\t\t\t\t\tfilter|f : \u8fc7\u6ee4\u63a7\u5236\u53f0\u8f93\u51fa<br/>\t\t\t\t\t\t\t\tsetTemplate|s : \u8bbe\u7f6e\u8f93\u51fa\u6a21\u7248\u7c7b\u578b<br/>\t\t\t\t\t\t\t\thide  : \u9690\u85cf\u63a7\u5236\u53f0\uff0c\u6216\u8005\u4f7f\u7528 Ctrl+Shift+`[~] \u5feb\u6377\u952e")
        },
        onInputKeyup: function (a) {
            switch (a.keyCode) {
            case 13:
                this._cmd_history.push(d.console._inputEl.value);
                this._cmd_last_index = this._cmd_history.length;
                this._execCommand(d.console._inputEl.value);
                break;
            case 38:
                if (this._cmd_history.length == 0) break;
                a = "";
                this._cmd_last_index > 0 ? (this._cmd_last_index--, a = this._cmd_history[this._cmd_last_index]) : this._cmd_last_index = -1;
                d.console._inputEl.value = a;
                break;
            case 40:
                if (this._cmd_history.length == 0) break;
                a = "";
                this._cmd_last_index < this._cmd_history.length - 1 ? (this._cmd_last_index++, a = this._cmd_history[this._cmd_last_index]) : this._cmd_last_index = this._cmd_history.length;
                d.console._inputEl.value = a
            }
        },
        _execCommand: function (a) {
            a == "help" || a == "h" ? this.help() : a == "clear" || a == "cls" ? d.console.clear() : a == "hide" ? d.console.hide() : a == "refresh" || a == "r" ? this.refresh() : a == "showall" || a == "sa" ? (this.clear(), this.render(null, !0)) : RegExp(/^(?:filter|f)(?:\(|\s+)(.+)(?:\)|\s*)$/i).test(a) ? (a = eval("this.filter('" + RegExp.$1 + "')"), a.length > 0 ? this.render(a, !0) : (this.clear(), this.out("NO RESULT!", 1))) : RegExp(/^(?:setTemplate|s)(?:\(|\s+)(\d+)(?:\)|\s*)$/i).test(a) ? (this.setTemplate(parseInt(RegExp.$1)), this.refresh()) : this._execScript(a);
            d.console._inputEl.value = ""
        },
        _execScript: function (a) {
            var b = '<span style="color:#ccff00">' + a + "</span><br/>";
            try {
                b += (eval(a) || "").toString().replace(/</g, "&lt;").replace(/>/g, "&gt;"), d.console.print(b, 0)
            } catch (e) {
                b += e.description, d.console.print(b, 1)
            }
        }
    });
    d.profile = d.console.profile;
    d.warn = d.console.warn;
    d.error = d.console.error;
    d.info = d.console.info;
    d.debug = d.console.debug;
    j.onDomReady(function () {
        d.console._init();
        if (g.console == "true") d.console = d.extend(d.console, {
            profile: d.emptyFunc,
            warn: d.emptyFunc,
            error: d.emptyFunc,
            info: d.emptyFunc,
            debug: d.emptyFunc
        }), d.console.show()
    });
    g.console && g.console == "firebug" && (h.console || e.loadScript(d.path + "firebug/firebug-lite.js", {
        onSuccess: function () {
            if (firebug) firebug.env.height = 220, firebug.env.css = "../../source/firebug/firebug-lite.css", d.out("...\u63a7\u5236\u53f0\u5f00\u542f"), d.out("...\u6d4b\u8bd5\u6210\u529f")
        }
    }));
    d.runtime = function () {
        function a() {
            return d.config.debugLevel > 0
        }
        function b(c, f) {
            var g;
            a() ? g = c + "\n=STACK=\n" + e() : f == "error" && (g = c);
            d.Debug.errorLogs.push(g)
        }
        function e(a, b) {
            function d(a, b) {
                if (a.stack) return a.stack;
                else if (a.message.indexOf("\nBacktrace:\n") >= 0) {
                    var c = 0;
                    return a.message.split("\nBacktrace:\n")[1].replace(/\s*\n\s*/g, function () {
                        c++;
                        return c % 2 == 0 ? "\n" : " @ "
                    })
                } else {
                    for (var f = b.callee == e ? b.callee.caller : b.callee, g = f.arguments, h = [], i = 0, j = g.length; i < j; i++) h.push(typeof g[i] == "undefined" ? "<u>" : g[i] === null ? "<n>" : g[i]);
                    g = /function\s+([^\s\(]+)\(/;
                    return ((g.test(f.toString()) ? g.exec(f.toString())[1] : "<ANON>") + "(" + h.join() + ");").replace(/\n/g, "")
                }
            }
            var f;
            if (a instanceof Error && typeof arguments == "object" && arguments.callee) f = d(a, b);
            else try {
                ({}).sds()
            } catch (g) {
                f = d(g, arguments)
            }
            return f.replace(/\n/g, " <= ")
        }
        return {
            stack: e,
            warn: function (a, d) {
                b(write.apply(null, arguments), "warn")
            },
            error: function (a, d) {
                b(write.apply(null, arguments), "error")
            },
            isDebugMode: a
        }
    }()
});
