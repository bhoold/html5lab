Jx().$package("alloy.storage", function (b) {
    var d = this,
        c = alloy.storage.rpcService,
        e = b.event,
        g = b.dom,
        e = b.event,
        j = b.string,
        l = null,
        q = [],
        u = [],
        p = this.DISK = {
            QQDISK: "qqdisk",
            KINGSOFT: "kingsoft"
        },
        v = d.diskConfig = {
            qqdisk: {
                id: 0,
                key: p.QQDISK,
                icon: "./module/diskexplorer/images/qqdisk.png",
                name: "QQ\u7f51\u76d8",
                userUsedSpace: 0,
                userTotalSpace: 1073741824,
                dataReady: !1
            },
            kingsoft: {
                id: 1,
                key: p.KINGSOFT,
                icon: "./module/diskexplorer/images/kingsoft.png",
                name: "\u91d1\u5c71\u5feb\u76d8",
                userUsedSpace: 0,
                userTotalSpace: 5368709120,
                dataReady: !1
            }
        },
        x = [];
    (function () {
        var b, a = 0;
        for (b in v) v.hasOwnProperty(b) && (x[a++] = v[b])
    })();
    this.getTotalUsedSpace = function () {
        for (var b = 0, a = 0; a < q.length; a++) b += v[q[a]].userUsedSpace;
        return b
    };
    this.getTotalSpace = function () {
        for (var b = 0, a = 0; a < q.length; a++) b += v[q[a]].userTotalSpace;
        return b
    };
    this.getTotalSpaceById = function (b) {
        if (b == p.QQDISK) switch (alloy.portal.getPortalSelf().vip) {
        case 1:
            return 3221225472;
        case 2:
            return 4294967296;
        case 3:
            return 5368709120;
        case 4:
            return 6442450944;
        case 5:
            return 7516192768;
        case 6:
            return 8589934592;
        case 7:
            return 10737418240;
        default:
            return 1073741824
        } else if (b == p.KINGSOFT) return 5368709120
    };
    this.getFreeSpaceById = function (b) {
        return v[b].userTotalSpace - v[b].userUsedSpace
    };
    this.getDiskById = function (b) {
        return v[b]
    };
    this.getBoundDisk = function () {
        return q
    };
    this.addBoundDisk = function (c) {
        b.array.indexOf(q, c) < 0 && q.push(c);
        u = this.getUnBoundDisk()
    };
    this.removeBoundDisk = function (c) {
        b.array.remove(q, c);
        u = this.getUnBoundDisk()
    };
    this.sendSetBoundDisk = function (b) {
        alloy.rpcService.sendSetConfig({
            data: {
                r: {
                    appid: 0,
                    value: {
                        diskList: b
                    }
                }
            }
        })
    };
    this.getUnBoundDisk = function () {
        u = [];
        for (var b = {}, a = 0; a < q.length; a++) b[q[a]] = 1;
        for (a = 0; a < x.length; a++) b[x[a].key] || u.push(x[a].key);
        return u
    };
    this.setDefaultDisk = function (b) {
        l = b
    };
    this.sendSetBoundAndDefaultDisk = function (b, a) {
        b = b || alloy.storage.getBoundDisk();
        a = a || l;
        alloy.rpcService.sendSetConfig({
            data: {
                r: {
                    appid: 0,
                    value: {
                        defaultDisk: a,
                        diskList: b
                    }
                }
            }
        })
    };
    this.getDefaultDisk = function () {
        l = l || "qqdisk";
        return v[l]
    };
    this.useSpace = function (c, a) {
        b.isNumber(a) && (v[c].userUsedSpace += a, e.notifyObservers(d, "StorageSpaceChanged", c))
    };
    this.releaseSpace = function (c, a) {
        if (b.isNumber(a)) v[c].userUsedSpace -= a, v[c].userUsedSpace = v[c].userUsedSpace > 0 ? v[c].userUsedSpace : 0, e.notifyObservers(d, "StorageSpaceChanged", c)
    };
    this.receiveFile = function (c) {
        c.cookie_name && b.cookie.set(c.cookie_name, c.cookie_value, alloy.CONST.MAIN_DOMAIN, "", 0.5);
        var a = g.id("fs_download");
        if (typeof a == "undefined" || a == null) a = document.createElement("IFRAME"), a.id = "fs_download", a.name = "fs_download", a.src = alloy.CONST.MAIN_URL + "domain.html", a.style.display = "none", document.body.appendChild(a);
        a.src = c.url
    };
    this.fileDownload = function (b, a) {
        c.fileDownload({
            data: {
                target: a,
                obj: b
            },
            onSuccess: function (a) {
                a.retcode == 0 && a.result && a.result.code == 0 && d.receiveFile(a.result)
            }
        })
    };
    this.fileView = function (d, a) {
        c.fileDownload({
            data: {
                target: a,
                obj: d
            },
            onSuccess: function (a) {
                if (a.retcode == 0 && a.result && a.result.code == 0) {
                    var c = b.extend({}, d, a.result, a.result.obj);
                    alloy.fileSystem.openFile(c, a.result.url)
                }
            }
        })
    };
    this.openFile = function (b, a) {
        var c = alloy.util.getFileExt(b.n).toLowerCase();
        alloy.system.isOpenFile(c) && this.fileView(b, a)
    };
    this.createFile = function (b, a) {
        var f = this.getExplorerInstance(),
            n = f.getCurFolder(),
            g = f.getCurDisk(),
            f = b.fileSize;
        alloy.storage.getFreeSpaceById(g) < f ? alloy.storage.storageFullAlert(g) : (n = {
            target: g,
            file: {
                t: alloy.fileSystem.FILE_TYPE.FILE,
                n: b.fileName,
                size: f,
                md5: "",
                sha: ""
            },
            parent: n
        }, n.parent == "root" && delete n.parent, c.fileUpload({
            data: n,
            onSuccess: function (b) {
                b.retcode == 0 && b.result && b.result.code == 0 ? (b = b.result.obj, b.upload = 1, d.useSpace(g, b.size), e.notifyObservers(d, "ExplorerFileAdd", b), a && a(b)) : b.retcode == 0 && b.result && b.result.code == 30001 ? alloy.storage.storageFullAlert() : alloy.layout.alert("\u4e0a\u4f20\u6587\u4ef6\u5931\u8d25\uff01")
            }
        }))
    };
    this.createDir = function () {
        var b = {},
            a = {},
            c = this.getExplorerInstance();
        b.target = c.getCurDisk();
        b.obj = c.getCurFolder();
        b.obj == "root" && delete b.obj;
        a.data = b;
        a.onSuccess = function (a) {
            a.retcode == 0 && a.result && a.result.code == 0 ? e.notifyObservers(d, "ExplorerFileAdd", a.result.obj) : alloy.layout.alert("\u521b\u5efa\u6587\u4ef6\u5939\u5931\u8d25\uff01")
        };
        alloy.storage.rpcService.createDir(a)
    };
    var m = function (b) {
            if (b.replace(/[\\/:*?"<>|]/g, "") != b) return '\u540d\u79f0\u4e0d\u80fd\u5305\u542b\\/:*?"<>|\u7b49\u7279\u6b8a\u5b57\u7b26';
            else if (j.byteLength(b) > 48) return "\u6587\u4ef6\u5939\u540d\u79f0\u8fc7\u957f\uff08\u5b57\u6570\u6700\u591a\u4e3a24\u4e2a\u6c49\u5b57\u621648\u4e2a\u5b57\u7b26\uff09";
            return 0
        };
    this.fileRename = function (b, a) {
        var c = m(a);
        if (c == 0) {
            var c = {},
                g = {},
                o = this.getExplorerInstance();
            c.target = o.getCurDisk();
            b.n = a;
            c.obj = b;
            g.data = c;
            g.arguments = {
                obj: b
            };
            g.onSuccess = function (a) {
                a.retcode == 0 && a.result && a.result.code == 0 ? e.notifyObservers(d, "ExplorerFileRename", a.arguments.obj) : a.result.code == 33333 ? alloy.layout.alert("\u7cfb\u7edf\u6587\u4ef6\u5939\u4e0d\u5141\u8bb8\u91cd\u547d\u540d") : alloy.layout.alert("\u91cd\u547d\u540d\u5931\u8d25\uff01")
            };
            alloy.storage.rpcService.fileRename(g)
        } else alloy.layout.alert(c, null, {
            title: "\u91cd\u547d\u540d"
        })
    };
    this.fileRemove = function (b) {
        var a = {},
            c = {},
            g = this.getExplorerInstance().getCurDisk();
        a.obj = b;
        a.target = g;
        c.data = a;
        c.arguments = {
            obj: b
        };
        c.onSuccess = function (a) {
            a.retcode == 0 && a.result && a.result.code == 0 ? (a = a.arguments.obj, d.releaseSpace(g, a.size), e.notifyObservers(d, "ExplorerFileRemove", a)) : a.result.code == 33333 ? alloy.layout.alert("\u7cfb\u7edf\u6587\u4ef6\u5939\u4e0d\u5141\u8bb8\u5220\u9664") : alloy.layout.alert("\u5220\u9664\u5931\u8d25\uff01")
        };
        alloy.storage.rpcService.fileRemove(c)
    };
    this.fileCopy = function (b, a) {
        var c = {},
            g = {},
            o = this.getExplorerInstance();
        c.target = o.getCurDisk();
        c.obj = b;
        c.dest = o.getCurFolder();
        c.dest == "root" && delete c.dest;
        g.data = c;
        g.onSuccess = function (b) {
            b.retcode == 0 && b.result && b.result.code == 0 ? (b = b.result.obj, d.useSpace(a, b.size), e.notifyObservers(d, "ExplorerFileCopy", b)) : b.retcode == 0 && b.result && b.result.code == 30001 ? alloy.storage.storageFullAlert() : alloy.layout.alert("\u590d\u5236\u5931\u8d25\uff01")
        };
        alloy.storage.rpcService.copyFile(g)
    };
    this.fileMove = function (b) {
        var a = {},
            c = {},
            g = this.getExplorerInstance();
        a.target = g.getCurDisk();
        a.obj = b;
        a.dest = g.getCurFolder();
        a.dest == "root" && delete a.dest;
        c.data = a;
        c.onSuccess = function (a) {
            a.retcode == 0 && a.result && a.result.code == 0 ? e.notifyObservers(d, "ExplorerFileMove", a.result.obj) : a.result.code == 33333 ? alloy.layout.alert("\u7cfb\u7edf\u6587\u4ef6\u5939\u4e0d\u5141\u8bb8\u79fb\u52a8") : alloy.layout.alert("\u7c98\u8d34\u5931\u8d25\uff01")
        };
        alloy.storage.rpcService.fileMove(c)
    };
    this.isDiskReady = function () {
        return !1
    };
    this.storageFullAlert = function (b) {
        b ? alloy.layout.alert("\u60a8\u7684" + v[b].name + "\u5269\u4f59\u7a7a\u95f4\u4e0d\u8db3\uff0c\u8bf7\u4fee\u6539\u9ed8\u8ba4\u786c\u76d8\u540e\u91cd\u65b0\u4e0a\u4f20", function () {
            alloy.system.runApp("diskExplorer")
        }) : alloy.layout.alert("\u78c1\u76d8\u7a7a\u95f4\u5df2\u6ee1\uff0c\u8bf7\u7ed1\u5b9a\u6216\u4f7f\u7528\u65b0\u7684\u786c\u76d8")
    };
    this.getExplorerInstance = function () {
        if (alloy.app.diskExplorer) return alloy.app.diskExplorer.getInstance()
    };
    var o = {
        onPortalReady: function () {
            var c = alloy.config.getDiskList();
            l = alloy.config.getDefaultDisk();
            if (v[l]) v[l].isDefault = !0;
            c && (q = c);
            u = d.getUnBoundDisk();
            for (var a = 0, c = 0; c < q.length; c++) {
                var f = {};
                f.data = {
                    target: q[c]
                };
                f.arguments = {
                    target: q[c]
                };
                f.onSuccess = function (c) {
                    if (c.retcode == 0 && c.result && c.result.code == 0) {
                        var f = c.arguments.target,
                            h = parseInt(c.result.userUsedSpaceBytes),
                            c = parseInt(c.result.userTotalSpaceBytes);
                        v[f].userUsedSpace = h > c ? c : h;
                        v[f].userTotalSpace = c;
                        v[f].dataReady = !0;
                        a++;
                        e.notifyObservers(d, "StorageSpaceChanged", f)
                    } else b.out("\u52a0\u8f7d\u4e91\u5b58\u50a8\u4fe1\u606f\u9519\u8bef\uff01"), e.notifyObservers(d, "StorageError")
                };
                alloy.storage.rpcService.queryUser(f)
            }
            q.length == 0 && e.notifyObservers(d, "StorageReady")
        },
        onMessageUpdate: function (c) {
            if ((Number(c.appid) || Number(c.aid)) == 400011741) {
                var c = b.json.parse(b.string.decodeHtmlSimple(c.m)),
                    a = alloy.storage.getDiskById(c.source);
                if (a) {
                    var f = parseInt(c.userUsedSpaceBytes),
                        g = parseInt(c.userTotalSpaceBytes);
                    a.userUsedSpace = f > g ? g : f;
                    a.userTotalSpace = g;
                    e.notifyObservers(d, "StorageSpaceChanged", c.source)
                }
            }
        }
    };
    this.init = function () {
        e.addObserver(alloy.portal, "portalReady", o.onPortalReady);
        e.addObserver(alloy.portal, "message", o.onMessageUpdate)
    }
});