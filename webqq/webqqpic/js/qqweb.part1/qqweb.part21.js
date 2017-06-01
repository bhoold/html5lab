Jx().$package("alloy.appManager", function (b) {
    var d = this,
        c = b.dom,
        e = b.event,
        g, j = [],
        l, q, u, p, v, x = {},
        m, o = function () {
            g = c.node("div", {
                id: "appManagerPanel",
                "class": "appManagerPanel"
            });
            g.innerHTML = '                <a class="aMg_close" href="###"></a>                <div class="aMg_dock_container" customAcceptDrop=1 index=5></div>                <div class="aMg_line_x"></div>                <div class="aMg_folder_container">                    <div class="folderItem">                        <div class="folder_bg folder_bg1"></div>                        <div class="folderOuter" customAcceptDrop=1 index=0><div class="folderInner" customAcceptDrop=1 index=0></div></div>                    </div>                    <div class="folderItem ">                        <div class="folder_bg folder_bg2"></div>                        <div class="folderOuter" customAcceptDrop=1 index=1><div class="folderInner" customAcceptDrop=1 index=1></div></div>                        <div class="aMg_line_y"></div>                    </div>                    <div class="folderItem ">                        <div class="folder_bg folder_bg3"></div>                        <div class="folderOuter" customAcceptDrop=1 index=2><div class="folderInner" customAcceptDrop=1 index=2></div></div>                        <div class="aMg_line_y"></div>                    </div>                    <div class="folderItem ">                        <div class="folder_bg folder_bg4"></div>                        <div class="folderOuter" customAcceptDrop=1 index=3><div class="folderInner" customAcceptDrop=1 index=3></div></div>                        <div class="aMg_line_y"></div>                    </div>                    <div class="folderItem ">                        <div class="folder_bg folder_bg5"></div>                        <div class="folderOuter" customAcceptDrop=1 index=4><div class="folderInner" customAcceptDrop=1 index=4></div></div>                        <div class="aMg_line_y"></div>                    </div>                </div>';
            document.body.appendChild(g);
            l = c.mini(".aMg_dock_container", g)[0];
            m = c.mini(".aMg_folder_container", g)[0];
            q = c.mini(".folderItem", g);
            u = c.mini(".folderInner", g);
            p = c.mini(".folderOuter", g);
            v = new b.ui.Sortables([], "id");
            b.array.forEach(p, function (a, c) {
                j[c] = new b.ui.ScrollBar(a, {
                    ipadTouchArea: !0
                })
            });
            v.addDropTarget({
                el: l,
                level: 0
            });
            e.addObserver(l, "drop", h.onDockContainerDrop);
            b.array.forEach(p, function (a) {
                v.addDropTarget({
                    el: a,
                    level: 0
                });
                e.addObserver(a, "drop", h.onFolderContainerDrop)
            });
            var a = c.mini(".aMg_close", g)[0];
            e.on(a, "click", n);
            e.addObserver(v, "start", h.onDragStart);
            e.addObserver(alloy.layout, "desktopResize", F);
            e.addObserver(alloy.fileSystem, "FileMove", h.onFileMove)
        },
        h = {
            onDragStart: function () {
                alloy.util.report2app("navbar|fullview|move")
            },
            onFolderContainerDrop: function (a) {
                var b = a.apperceiveEl,
                    d = b.getAttribute("type"),
                    f = a.pos,
                    e = a.currentDropTarget,
                    a = parseInt(e.getAttribute("index"));
                xy = c.getXY(e);
                e = parseInt(b.getAttribute("fileId"));
                if (!isNaN(e)) {
                    f = Math.floor((f.y + j[a].getScrollTop() - xy[1]) / 35);
                    d = {
                        t: d,
                        id: e
                    };
                    b.getAttribute("from");
                    var g;
                    (g = alloy.fileSystem.getFileInfoByFile(d)) && alloy.fileSystem.moveFile(g.file, a, f, null, null, !0)
                }
            },
            onDockContainerDrop: function (a) {
                var b = a.apperceiveEl,
                    d = b.getAttribute("type"),
                    f = a.pos,
                    e = a.currentDropTarget,
                    a = parseInt(e.getAttribute("index"));
                xy = c.getXY(e);
                e = parseInt(b.getAttribute("fileId"));
                if (!isNaN(e)) {
                    f = Math.floor((f.x - 80) / 70);
                    f > 5 && (f = 5);
                    f < 0 && (f = 0);
                    d = {
                        t: d,
                        id: e
                    };
                    b.getAttribute("from");
                    var g;
                    (g = alloy.fileSystem.getFileInfoByFile(d)) && alloy.fileSystem.moveFile(g.file, a, f, g.parent.id, g.position, !0)
                }
            },
            onFileMove: function (b) {
                if (b.targetId >= 0 && b.targetId < 5) {
                    if (b.targetId == b.sourceId) {
                        var c = f(b.file.id, b.file.t);
                        if (c) {
                            var c = c.getElement(),
                                d = c.parentNode;
                            d.removeChild(c);
                            var e = b.targetPosition;
                            d.childNodes[e] ? d.insertBefore(c, d.childNodes[e]) : d.appendChild(c)
                        }
                    } else if ((c = f(b.file.id, b.file.t)) && a(c, b.sourceId, b.sourcePosition), c = y([b.file], b.targetId)[0]) c = c.getElement(), d = c.parentNode, e = b.targetPosition, d.childNodes[e] && d.insertBefore(c, d.childNodes[e]);
                    j[b.targetId] && j[b.targetId].update();
                    j[b.sourceId] && j[b.sourceId].update()
                } else if ((c = f(b.file.id, b.file.t)) && a(c, b.sourceId, b.sourcePosition), c = C([b.file], b.targetId)[0]) c = c.getElement(), d = c.parentNode, e = b.targetPosition + 1, b.sourceId == 5 && d.removeChild(c), d.childNodes[e] && d.insertBefore(c, d.childNodes[e])
            }
        },
        a = function (a) {
            a = x[a.getId()];
            delete x[a.getId()];
            a.destroy()
        },
        f = function (a, b) {
            typeof b !== "undefined" && (a = b + "_" + a);
            return x[a]
        },
        n = function (a) {
            a && a.preventDefault();
            g && (d.hide(), c.show(alloy.layout.getDesktop().body))
        };
    this.close = n;
    var s = function () {
            l.innerHTML = "";
            b.array.forEach(u, function (a) {
                a.innerHTML = ""
            });
            var a = alloy.fileSystem.getFolderById(5);
            w();
            C(a.items);
            for (var a = [], c = 0; c < 5; c++) {
                var d = alloy.fileSystem.getFolderById(c);
                a.push(d);
                y(d.items, c)
            }
        },
        w = function () {
            var a = alloy.portal.getSystemConfig("appMarket");
            appMarketButton = alloy.iconFactory.createIcon(alloy.fileSystem.FILE_TYPE.APP, {
                className: "appMarket",
                longTouchable: !1,
                deleteable: !1,
                isShowNotify: !1,
                parentNode: l,
                icon: {
                    url: alloy.CONST.CDN_URL + "style/images/appmarket.png?20111011001"
                },
                onClick: function () {
                    d.close();
                    alloy.portal.runApp("appMarket");
                    return !1
                }
            }, a)
        },
        C = function (a) {
            var c = [],
                f = {
                    parentNode: l,
                    longTouchable: !1,
                    isShowNotify: !1
                },
                g = function () {
                    d.close();
                    alloy.util.report2app("navbar|fullview|runapp")
                },
                h;
            for (h in a) {
                var n = z(a[h], b.clone(f));
                c.push(n);
                e.addObserver(n, "iconclick", g)
            }
            return c
        },
        y = function (a, c) {
            var f = [],
                g = {
                    parentNode: u[c],
                    longTouchable: !1,
                    isShowNotify: !1,
                    className: "amg_folder_appbutton"
                },
                h = function () {
                    d.close();
                    alloy.util.report2app("navbar|fullview|runapp")
                },
                n;
            for (n in a) {
                var j = z(a[n], b.clone(g));
                f.push(j);
                e.addObserver(j, "iconclick", h)
            }
            return f
        },
        z = function (a, c) {
            var d, f = alloy.fileSystem.FILE_TYPE;
            if (a.t == f.APP) d = alloy.appconfig.getAppConfig(a.id), d = alloy.iconFactory.createIcon(a.t, c, d);
            else if (a.t == f.BUDDY || a.t == f.GROUP) d = alloy.iconFactory.createIcon(a.t, c, a);
            else if (a.t == f.FOLDER || a.t == f.FILE) c.file = a, d = alloy.iconFactory.createIcon(a.t, c, a);
            x[d.getId()] = d;
            b.platform.iPad || v.addDragClass(d.getElement());
            return d
        },
        F = function () {
            var a = alloy.layout.getDesktopHeight() - 80;
            c.setStyle(m, "height", a + "px");
            b.browser.ie == 6 && (a = alloy.layout.getClientWidth(), c.setStyle(m, "width", (a / 5 % 1 > 0.5 ? a + 2 : a) + "px"));
            b.array.forEach(j, function (a) {
                a.update()
            })
        };
    this.tooglePanel = function () {
        g && c.isShow(g) ? this.close() : this.show()
    };
    this.show = function () {
        g || o();
        alloy.util.report2app("navbar|fullview");
        alloy.desktopManager.setDesktopStatus(alloy.desktopManager.DESK_STATUS.MANAGE);
        s();
        c.hide(alloy.layout.getDesktop().body);
        c.show(g);
        b.array.forEach(q, function (a) {
            setTimeout(function () {
                c.addClass(a, "folderItem_turn")
            }, 0)
        });
        F()
    };
    this.hide = function () {
        c.hide(g);
        alloy.util.report2app("navbar|fullview|exit");
        alloy.desktopManager.setDesktopStatus(alloy.desktopManager.DESK_STATUS.NORMAL);
        b.array.forEach(q, function (a) {
            c.removeClass(a, "folderItem_turn")
        })
    }
});