Jx().$package("alloy.startMenu", function (b) {
    var d = this,
        c = b.dom,
        e = b.event,
        g, j, l, q, u, p, v, x = {
            weibo: {
                url: "http://t.qq.com/Qplus_Web",
                title: "\u5b98\u65b9\u5fae\u535a"
            },
            support: {
                url: "http://support.qq.com/portal/discuss_pdt/513_1.html",
                title: "\u53cd\u9988\u8bba\u575b"
            },
            blog: {
                url: "http://webqq.qzone.qq.com",
                title: "\u5b98\u65b9\u535a\u5ba2"
            },
            question: {
                url: "http://service.qq.com/category/webQQ.html",
                title: "\u5e38\u89c1\u95ee\u9898"
            },
            imqq: {
                url: "http://www.qplus.com/productForWeb.shtml",
                title: "Q+\u5b98\u65b9\u7f51\u7ad9 -\u4ea7\u54c1\u4e2d\u5fc3"
            },
            download: {
                url: "http://www.qplus.com/productForPC.shtml",
                title: "Q+\u5b98\u65b9\u7f51\u7ad9 -\u4ea7\u54c1\u4e2d\u5fc3"
            }
        },
        m = {
            stopPropagation: function (a) {
                a.stopPropagation()
            },
            onStartMenuBodyClick: function (b) {
                var c = alloy.util.getActionTarget(b, 2);
                if (c && c != "help") switch (l.hide(), b.preventDefault(), b.stopPropagation(), b = c.getAttribute("cmd"), b) {
                case "home":
                    pgvSendClick({
                        hottag: "WEB2QQ.TASKBAR.HOMEPAGE.LOGIN"
                    });
                    alloy.util.report2qqweb("taskbar|start|homepage");
                    alloy.util.setHomePage();
                    break;
                case "favorite":
                    pgvSendClick({
                        hottag: "WEB2QQ.TASKBAR.FAVORITE.LOGIN"
                    });
                    alloy.util.report2qqweb("taskbar|start|favorite");
                    alloy.util.addFavorite();
                    break;
                case "shortcut":
                    pgvSendClick({
                        hottag: "WEB2QQ.TASKBAR.SHORTCUT.LOGIN"
                    });
                    alloy.util.report2qqweb("taskbar|start|desktop");
                    open("./QPlusWeb.url");
                    break;
                case "lock":
                    alloy.portal.runApp("screenLocker");
                    pgvSendClick({
                        hottag: "WEB2QQ.TASKBAR.SCREENLOCKER.LOGIN"
                    });
                    alloy.util.report2qqweb("taskbar|start|screenlocker");
                    break;
                case "setting":
                    alloy.portal.runApp("settingCenter");
                    pgvSendClick({
                        hottag: "WEB2QQ.TASKBAR.SETTING.LOGIN"
                    });
                    alloy.util.report2qqweb("taskbar|start|setting");
                    break;
                case "logout":
                    alloy.portal.exit();
                    e.notifyObservers(alloy.portal, "Exit");
                    window.webTop && webTop.ui.channel.postCmd(23);
                    pgvSendClick({
                        hottag: "WEB2QQ.TASKBAR.EXIT.LOGIN"
                    });
                    alloy.util.report2qqweb("taskbar|start|exit");
                    break;
                case "exit":
                    a();
                    break;
                case "download":
                    w(x.download);
                    break;
                case "support":
                    window.open(x[b].url);
                    break;
                case "helper":
                    y();
                    break;
                case "about":
                    f()
                }
            },
            onHelpMenuClick: function (a) {
                var b = alloy.util.getActionTarget(a, 2);
                if (b) switch (a.preventDefault(), a = b.getAttribute("cmd"), a) {
                case "hot":
                    alloy.util.report2qqweb("taskbar|help|tips");
                    alloy.app.tips.showNews();
                    break;
                case "weibo":
                    w(x[a]);
                    alloy.util.report2qqweb("taskbar|help|officialmicroblog");
                    break;
                case "support":
                    window.open(x[a].url);
                    alloy.util.report2qqweb("taskbar|help|support");
                    break;
                case "report":
                    C();
                    break;
                case "blog":
                    w(x[a]);
                    alloy.util.report2qqweb("taskbar|help|officialblog");
                    break;
                case "helper":
                    y();
                    break;
                case "question":
                    w(x[a]);
                    alloy.util.report2qqweb("taskbar|help|faq");
                    break;
                case "imqq":
                    w(x[a])
                }
            },
            onHelpMenuMouseenter: function () {
                v && (clearTimeout(v), v = 0)
            },
            onHelpMenuMouseleave: function () {
                s()
            },
            onStartHeplerBtnMouseover: function () {
                f()
            },
            onStartHeplerBtnClick: function (a) {
                a.preventDefault();
                a.stopPropagation();
                f()
            },
            onStartHeplerBtnMouseout: function () {
                s()
            },
            onStartMenuBodyMouseover: function (a) {
                var b;
                ((b = a.target).tagName == "LI" || (b = a.target.parentNode).tagName == "LI") && c.setClass(b, "taskbar_start_menu_hover")
            },
            onStartMenuBodyMouseout: function (a) {
                var b;
                ((b = a.target).tagName == "LI" || (b = a.target.parentNode).tagName == "LI") && c.setClass(b, "")
            },
            onHelpMenuMouseover: function (a) {
                (a = alloy.util.getActionTarget(a, 2)) && c.setClass(a, "taskbar_help_menu_hover")
            },
            onHelpMenuMouseout: function (a) {
                (a = alloy.util.getActionTarget(a, 2)) && c.setClass(a, "")
            },
            onSelfInfoAreaClick: function (a) {
                a.preventDefault();
                if (alloy.portal.getLoginLevel() == alloy.CONST.LOGIN_LEVEL_NONE) alloy.layout.showLoginWindow(""), alloy.util.report2qqweb("taskbar|start|signin");
                else if (a = parseInt(this.getAttribute("uin"), 10)) alloy.portal.runApp("userDetails", a), alloy.util.report2qqweb("taskbar|start|profile")
            },
            onSelfInfoReady: function (a) {
                p.title = "\u7f16\u8f91\u4e2a\u4eba\u8d44\u6599";
                p.innerHTML = a.htmlNick;
                p.setAttribute("uin", a.uin)
            },
            onUserAvatarChanged: function () {}
        },
        o = function () {
            j || d.init();
            l.setZIndex(alloy.layout.getTopZIndex(3));
            var a = alloy.dock.getDockLocation(),
                b = c.getXY(g),
                f, e;
            a == "left" ? (f = b[0] + 60, e = b[1] - 200) : a == "right" ? (f = b[0] - 210, e = b[1] - 200) : a == "top" && (f = b[0] - 120, e = b[1] + 60);
            l.setXY(f, e);
            l.show()
        },
        h = function () {
            l.hide()
        };
    this.showStartMenu = o;
    this.hideStartMenu = h;
    this.toggleStartMenu = function (a) {
        g = a || g;
        l && l.isShow() ? h() : o();
        pgvSendClick({
            hottag: "WEB2QQ.TASKBAR.START.LOGIN"
        });
        alloy.util.report2qqweb("taskbar|start")
    };
    this.getStartMenuHeight = function () {
        return c.getClientHeight(u)
    };
    this.getStartMenuPos = function () {
        return c.getXY(u)
    };
    var a = function () {
            var a = "\u60a8\u786e\u5b9a\u8981\u9000\u51fa  Q+ Web \u5417\uff1f";
            window.webTop && (a = "\u60a8\u786e\u5b9a\u8981\u9000\u51fa\u201c\u5ba2\u6237\u7aef\u201d\u5417\uff1f");
            alloy.layout.confirm(a, function () {
                alloy.portal.close()
            }, {
                modal: !0
            });
            alloy.util.report2qqweb("taskbar|start|quit")
        },
        f = function () {
            if (!q) {
                var a = '                <div class="taskbar_help_menu_head">                </div>                <div class="taskbar_help_menu_body">                    <div class="taskbar_help_menu_text">\u4f60\u7684\u5728\u7ebf\u5e94\u7528\u6570\u636e\u5e73\u53f0\uff0c\u5b9e\u73b0\u672c\u5730\u4e0e\u4e91\u7aef\u65e0\u7f1d\u5207\u6362</div>                    <a href="###" cmd="imqq" class="taskbar_help_menu_link" title="http://www.qplus.com/productForWeb.shtml">http://www.qplus.com/productForWeb.shtml</a>                    <a href="###" cmd="report" class="taskbar_help_menu_link" title="\u9519\u8bef\u4e0a\u62a5">\u9519\u8bef\u4e0a\u62a5</a>                </div>                <div class="taskbar_help_menu_bottom">                    <span class="taskbar_help_menu_bottom_text">\u53cd\u9988:</span>                    <a href="###" cmd="weibo" class="helpMenuImg taskbar_help_menu_weibo" title="\u5b98\u65b9\u5fae\u535a">&nbsp;</a>\t\t\t\t\t<a href="###" cmd="blog" class="helpMenuImg taskbar_help_menu_blog" title="\u5b98\u65b9\u535a\u5ba2">&nbsp;</a>\t\t\t\t\t<a href="###" cmd="question" class="helpMenuImg taskbar_help_menu_question" title="\u5e38\u89c1\u95ee\u9898">&nbsp;</a>                </div>';
                b.browser.ie && (a += '<iframe width="100%" height="100%" class="fullscreen_bg_iframe"></iframe>');
                var d = c.node("div", {
                    "class": "helpMenuImg taskbar_help_menu_container"
                });
                c.hide(d);
                alloy.layout.getDesktop().body.appendChild(d);
                q = new alloy.layout.PopupBox({
                    container: d,
                    parentPopupBox: l,
                    html: a
                });
                e.on(d, "click", m.onHelpMenuClick)
            }
            v && (clearTimeout(v), v = 0);
            q.setZIndex(alloy.layout.getTopZIndex(3));
            q.show()
        },
        n = function () {
            q.hide()
        },
        s = function () {
            v && (clearTimeout(v), v = 0);
            v = setTimeout(n, 200)
        },
        w = function (a) {
            alloy.portal.openInWebBrowser(a)
        },
        C = function () {
            alloy.layout.confirm("<div style='margin:10px 20px 20px;text-indent:24px;text-align:left;line-height:24px;'>\u5982\u679c\u60a8\u9047\u5230\u9875\u9762\u5f02\u5e38\uff0c\u53ef\u4ee5\u53cd\u9988\u9875\u9762\u9519\u8bef\u65e5\u5fd7\uff0c\u4ee5\u4fbf\u7cfb\u7edf\u5c3d\u5feb\u5b9a\u4f4d\u95ee\u9898\uff0c\u53cd\u9988\u8fc7\u7a0b\u4e2d\u4e0d\u4f1a\u66b4\u9732\u60a8\u7684\u4efb\u4f55\u9690\u79c1\u4fe1\u606f\u3002\u662f\u5426\u53cd\u9988\u672c\u6b21\u9875\u9762\u9519\u8bef\u65e5\u5fd7\uff1f<div>", function () {
                alloy.util.LogReport()
            }, {
                title: "\u9519\u8bef\u62a5\u544a",
                width: 365,
                height: 100,
                modal: !0
            });
            alloy.util.report2qqweb("taskbar|help|report")
        },
        y = function () {
            alloy.portal.runApp("helper");
            pgvSendClick({
                hottag: "WEB2QQ.TASKBAR.HELPER.LOGIN"
            });
            alloy.util.report2qqweb("taskbar|help|helper")
        },
        z = ['<li cmd="home"><a href="###" title="\u8bbe\u4e3a\u4e3b\u9875">\u8bbe\u4e3a\u4e3b\u9875</a></li>', '<li cmd="favorite"><a href="###" title="\u6dfb\u52a0\u5230\u6536\u85cf\u5939">\u6dfb\u52a0\u5230\u6536\u85cf\u5939</a></li>', '<li cmd="shortcut"><a href="###" target="_blank" title="\u4fdd\u5b58\u684c\u9762\u5feb\u6377\u65b9\u5f0f">\u4fdd\u5b58\u684c\u9762\u5feb\u6377\u65b9\u5f0f</a></li>', '<li cmd="lock"><a href="###" title="\u9501\u5b9a">\u9501\u5b9a</a></li>', '<li cmd="setting"><a href="###" title="\u7cfb\u7edf\u8bbe\u7f6e">\u7cfb\u7edf\u8bbe\u7f6e</a></li>', '<li id="taskbar_helpButton" cmd="about"  title="\u5173\u4e8eQ+ Web"><a href="###">\u5173\u4e8eQ+ Web</a></li>', '<li cmd="logout"><a href="###"  title="\u9000\u51fa" class="logout_botton"></a></li>', '<li cmd="exit"><a href="###" title="\u9000\u51fa">\u9000\u51fa</a></li>', '<li cmd="download"><a href="###" title="\u4e0b\u8f7d\u5ba2\u6237\u7aef">\u4e0b\u8f7d\u5ba2\u6237\u7aef</a></li>', '<li cmd="helper"><a href="###" title="\u65b0\u624b\u6307\u5bfc">\u65b0\u624b\u6307\u5bfc</a></li>'],
        F = [1, 2, 8, 5, 9];
    this.init = function () {
        for (var a = [], d = 0; d < F.length; ++d) a.push(z[F[d]]);
        a = '            <div id="taskbar_start_menu_body" class="startMenuImg taskbar_start_menu_body">                <div id="startMenuSelfInfo" class="taskbar_start_menu_selfinfo" uin="0">                    <div id="startMenuSelfNick" class="taskbar_start_menu_nick">\u8bf7&nbsp;<a href="###">\u767b\u5f55</a></div>                    <a cmd="support" class="startMenuImg startMenuTopControl_support" href="###" title="\u53cd\u9988">&nbsp;</a>                    <a cmd="lock" class="startMenuImg startMenuTopControl_lock" href="###" title="\u9501\u5b9a">&nbsp;</a>                </div>                <ul class="taskbar_start_menu">' + a.join("") + '</ul>                <a href="###" cmd="logout" title="\u6ce8\u9500\u5f53\u524d\u7528\u6237" class="startMenuImg logout_botton"></a>            </div>            ';
        b.browser.ie && (a += '<iframe width="100%" height="100%" class="fullscreen_bg_iframe"></iframe>');
        u = c.node("div", {
            "class": "taskbar_start_menu_container",
            id: "startMenuContainer"
        });
        u.innerHTML = a;
        alloy.layout.getDesktop().body.appendChild(u);
        a = !1;
        b.browser.mobileSafari && (a = !0);
        l = new alloy.layout.PopupBox({
            container: u,
            noCatchMouseUp: a
        });
        p = c.id("startMenuSelfNick");
        c.id("startMenuSelfInfo");
        if (alloy.portal.getLoginLevel() > alloy.CONST.LOGIN_LEVEL_NONE) m.onSelfInfoReady(alloy.system.getPortalSelf());
        a = c.id("taskbar_start_menu_body");
        e.on(p, "click", m.onSelfInfoAreaClick);
        e.on(a, "click", m.onStartMenuBodyClick);
        b.browser.ie == 6 && (e.on(a, "mouseover", m.onStartMenuBodyMouseover), e.on(a, "mouseout", m.onStartMenuBodyMouseout));
        j = !0;
        e.addObserver(alloy.portal, "selfInfoReady", m.onSelfInfoReady);
        e.addObserver(alloy.portal, "UserAvatarChanged", m.onUserAvatarChanged);
        e.addObserver(alloy.portal, "SelfInfoChanged", m.onSelfInfoReady)
    }
});