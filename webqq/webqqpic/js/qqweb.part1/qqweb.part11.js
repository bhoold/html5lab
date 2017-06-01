Jx().$package("alloy.desktopContact", function (b) {
    var d = this,
        c = b.event,
        c = b.event,
        e = alloy.fileSystem.FILE_TYPE,
        g = !1,
        j = {
            onBuddySelected: function (b, c) {
                var a = c;
                a == -1 && (a = alloy.desktopManager.getCurrentDesktopIndex());
                var d = [],
                    g;
                for (g in b) {
                    var s = b[g],
                        m;
                    s.gcode ? (m = Number(s.gcode), s = {
                        id: s.gcode,
                        n: s.name,
                        t: alloy.fileSystem.FILE_TYPE.GROUP,
                        gid: s.gid || 0
                    }) : (m = Number(s.uin), s = {
                        id: s.uin,
                        n: s.name,
                        t: alloy.fileSystem.FILE_TYPE.BUDDY
                    });
                    isNaN(m) || alloy.fileSystem.getFileByFile(s) || d.push(s)
                }
                d.length && (g = alloy.fileSystem.getFileAmount(e.BUDDY), m = alloy.fileSystem.getFileAmount(e.GROUP), g + m + d.length >= 200 ? alloy.layout.alert("\u684c\u9762\u8054\u7cfb\u4eba\u5df2\u8d85\u8fc7200\u4eba\u4e0a\u9650\uff0c\u8bf7\u5220\u51cf\u540e\u518d\u521b\u5efa\u3002") : alloy.fileSystem.getFolderById(a) ? alloy.fileSystem.addFiles(d, a, null, !0) : alloy.layout.alert("\u6587\u4ef6\u5939\u5df2\u7ecf\u4e0d\u5b58\u5728\uff0c\u6dfb\u52a0\u5931\u8d25\u3002"));
                qqweb.util.report2qqweb("deskcontact|create|context")
            },
            onBeforeGetRecentList: function () {
                c.addObserver(EQQ.Model.BuddyList, "RecentListChange", j.onRecentListChange)
            },
            onEQQLoginSuccess: function () {
                c.removeObserver(EQQ.Model.BuddyList, "BuddyStateChange", j.onBuddyStateChange);
                c.addObserver(EQQ.Model.BuddyList, "BuddyStateChange", j.onBuddyStateChange);
                g || (alloy.notifier.register("desktopContact", j.onMessageReceive, j.onMessageHandled), g = !0);
                x();
                var b = alloy.fileSystem.getFilesByType(e.BUDDY),
                    d;
                for (d in b) m(b[d].id);
                alloy.system.reportAppState("50", 1)
            },
            onDockLocationChanged: function () {},
            onBuddyStateChange: function (b) {
                m(b)
            },
            onLoginLevelChange: function (b) {
                if (b == 2 && b < alloy.portal.getOldLoginLevel()) {
                    var c = alloy.fileSystem.getFilesByType(e.BUDDY),
                        a;
                    for (a in c) c[a].notifyNumber = 0, alloy.iconFactory.updateNotifyNumber(c[a]);
                    var c = alloy.fileSystem.getFilesByType(e.GROUP),
                        d;
                    for (d in c) c[d].notifyNumber = 0, alloy.iconFactory.updateNotifyNumber(c[d])
                }
                b < 3 && alloy.portal.getOldLoginLevel() == 3 && alloy.system.reportAppState("50", 2)
            },
            onFileAddFail: function () {},
            onMessageReceive: function (b) {
                var c;
                c = alloy.config.configList.isNoContactNotify ? !1 : b.from != 50 ? !1 : b.body.extra.isChatBoxOpen ? !1 : !0;
                if (c) {
                    c = b.body;
                    var a;
                    b.type == "SingleChat" ? (b = c.uin, a = e.BUDDY) : (b = c.code, a = e.GROUP);
                    alloy.iconFactory.updateNotifyNumber({
                        id: b,
                        t: a,
                        notifyNumber: c.count
                    })
                }
            },
            onMessageHandled: function (b) {
                var c = b.body;
                b.type == "SingleChat" ? (b = c.uin, c = e.BUDDY) : (b = c.code, c = e.GROUP);
                alloy.iconFactory.updateNotifyNumber({
                    id: b,
                    t: c,
                    notifyNumber: 0
                })
            },
            onRecentListChange: function () {
                c.removeObserver(EQQ.Model.BuddyList, "RecentListChange", j.onRecentListChange);
                if (alloy.fileSystem.isFileSystemReady()) l();
                else {
                    var b = function () {
                            l();
                            c.removeObserver(alloy.fileSystem, "FileSystemReady", b)
                        };
                    c.addObserver(alloy.fileSystem, "FileSystemReady", b)
                }
            }
        },
        l = function () {
            if (!alloy.config.configList.hasRecentFolder) {
                for (var b = EQQ.Model.BuddyList.getRecentList(), c = [], a, d, g = 0; g < b.length; g++) {
                    if (c.length >= 16) break;
                    a = null;
                    if (b[g].type == 0)(d = EQQ.Model.BuddyList.getBuddyByUin(b[g].uin)) && (a = {
                        t: e.BUDDY,
                        id: b[g].uin,
                        n: d.showName
                    });
                    else if (b[g].type == 1)(d = EQQ.Model.BuddyList.getGroupByGid(b[g].uin)) && (a = {
                        t: e.GROUP,
                        id: d.code,
                        n: d.showName,
                        gid: b[g].uin
                    });
                    else continue;
                    a && !alloy.fileSystem.getFileByFile(a) && c.push(a)
                }
                alloy.fileSystem.createRecentContactFolder(c)
            }
        },
        q = [],
        u = function () {},
        p = function (b) {
            q.push(b)
        },
        v = function () {
            for (var b; b = q.shift();) setTimeout(b, 500)
        },
        x = function () {
            var c = alloy.fileSystem.getFilesByType(e.BUDDY),
                h, a, f = !1,
                g = {},
                s, m, j;
            for (j in c) {
                h = c[j];
                if ((a = EQQ.Model.BuddyList.getUserByUin(h.id)) && h.n !== a.showName) f = !0, h.n = a.showName, a = alloy.fileSystem.getFolderIdByFile(h), g[a] || (g[a] = {}), g[a][h.id] = h;
                m = alloy.iconFactory.getIcons(h.id, e.BUDDY) || [];
                a = 0;
                for (s = m.length; a < s; a++) m[a].refreshIcon(), m[a].setText(h.n)
            }
            var c = alloy.fileSystem.getFilesByType(e.GROUP),
                l;
            for (l in c) {
                h = c[l];
                if ((j = EQQ.Model.BuddyList.getGroupByCode(h.id)) && h.n !== j.showName) f = !0, h.n = j.showName, a = alloy.fileSystem.getFolderIdByFile(h), g[a] || (g[a] = {}), g[a][h.id] = h;
                m = alloy.iconFactory.getIcons(h.id, e.GROUP) || [];
                a = 0;
                for (s = m.length; a < s; a++) m[a].refreshIcon(), m[a].setText(h.n)
            }
            if (f) for (var q in g) {
                h = [];
                var f = Number(q),
                    x;
                for (x in g[q]) h.push(g[q][x]);
                p(b.bind(function (a) {
                    alloy.fileSystem.sendUpdateFiles(a.fileList, a.folderId, u, null, !0)
                }, d, {
                    fileList: h,
                    folderId: f
                }))
            }
            v()
        },
        m = this.updateContactIconState = function (b, c, a) {
            var c = alloy.iconFactory.getIcons(b, e.BUDDY),
                d;
            if (c) if (a = a || EQQ.Model.BuddyList.getState(b)) {
                b = 0;
                for (d = c.length; b < d; b++) c[b].showState(a)
            } else {
                b = 0;
                for (d = c.length; b < d; b++) c[b].hideState()
            }
        };
    this.init = function () {
        c.addObserver(alloy.portal, "EQQLoginSuccess", j.onEQQLoginSuccess);
        c.addObserver(alloy.portal, "BeforeGetRecentList", j.onBeforeGetRecentList);
        c.addObserver(alloy.portal, "loginLevelChange", j.onLoginLevelChange)
    };
    this.addContactIcon = function (b, c, a) {
        var d = alloy.fileSystem.getFileInfoByFile(b);
        if (d) b = d.parent.id, b == 5 ? c = "\u8be5\u8054\u7cfb\u4eba\u5df2\u6dfb\u52a0\uff0c\u4f4d\u4e8e\u201c\u5e94\u7528\u7801\u5934\u201d\u3002" : b >= 0 && b < 5 ? c = "\u8be5\u8054\u7cfb\u4eba\u5df2\u6dfb\u52a0\uff0c\u4f4d\u4e8e" + ("\u201c\u684c\u9762" + (b + 1) + "\u201d") + "\u3002" : b == c ? c = "\u8be5\u8054\u7cfb\u4eba\u5df2\u4f4d\u4e8e\u8be5\u6587\u4ef6\u5939\u3002" : (c = "\u6587\u4ef6\u5939\u201c" + (d.parent.n || d.parent.id) + "\u201d", c = "\u8be5\u8054\u7cfb\u4eba\u5df2\u6dfb\u52a0\uff0c\u4f4d\u4e8e" + c + "\u3002"), alloy.layout.alert(c);
        else {
            var d = alloy.fileSystem.getFileAmount(e.BUDDY),
                g = alloy.fileSystem.getFileAmount(e.GROUP);
            d + g >= 200 ? alloy.layout.alert("\u684c\u9762\u8054\u7cfb\u4eba\u5df2\u8d85\u8fc7200\u4eba\u4e0a\u9650\uff0c\u8bf7\u5220\u51cf\u540e\u518d\u521b\u5efa\u3002") : (c = c || alloy.desktopManager.getCurrentDesktopIndex(), d = b.t == e.BUDDY ? EQQ.Model.BuddyList.getUserByUin(b.id) : EQQ.Model.BuddyList.getGroupByCode(b.id), b.n = d.showName, alloy.fileSystem.addFile(b, c, a, !0))
        }
    };
    this.deleteContactIcon = function (b) {
        alloy.fileSystem.deleteFile(b, null, null, !1, !0)
    };
    this.getCurrentContacts = function () {
        var b = {},
            c, a = alloy.fileSystem.getFilesByType(e.BUDDY),
            d;
        for (d in a) c = a[d], b[c.id] = {
            type: c.t,
            uin: c.id,
            name: c.n
        };
        a = alloy.fileSystem.getFilesByType(e.GROUP);
        for (d in a) c = a[d], b[c.id] = {
            type: c.t,
            uin: c.gid,
            name: c.n,
            gcode: c.id
        };
        return b
    };
    this.showSelectBuddyBox = function (b) {
        typeof b == "undefined" && (b = -1);
        if (alloy.portal.getLoginLevel() == alloy.CONST.LOGIN_LEVEL_NONE) alloy.layout.showLoginWindow("selectBuddy");
        else {
            var c = d.getCurrentContacts();
            alloy.portal.runApp("selectBuddy", {
                id: "desktopContact",
                title: "\u6dfb\u52a0\u684c\u9762\u8054\u7cfb\u4eba",
                isAddSelf: !1,
                maxBuddy: 0,
                initList: c,
                lockInitList: !0,
                onlyNewMember: !0,
                groupDisplayType: "group",
                cbParam: b,
                onSelected: j.onBuddySelected
            })
        }
    }
});