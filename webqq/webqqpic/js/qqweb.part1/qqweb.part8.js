Jx().$package("alloy.fileSystem", function (b) {
    var d = this,
        c = b.event,
        c = b.event,
        e = b.string,
        g = this.FILE_TYPE = {
            FOLDER: "dir",
            FILE: "file",
            APP: "app",
            BUDDY: "uin",
            GROUP: "gid"
        },
        j = {},
        l = {},
        q = this.MAX_FOLDER_AMOUNT = 200,
        u = !1,
        p = !1,
        v, x = !1,
        m = !1,
        o = 0,
        h = function (a) {
            return a === null || typeof a === "undefined"
        },
        a = function () {
            return m || alloy.portal.getLoginLevel() == alloy.CONST.LOGIN_LEVEL_NONE
        },
        f = function () {
            var a = alloy.config.getDesktopList() || [];
            v = {
                t: g.FOLDER,
                id: -1,
                n: "root",
                items: a
            }
        },
        n = this.getRootFolder = function () {
            v || f();
            return v
        },
        s = function (a, b, c) {
            if (a.items) for (var d in a.items) {
                var f = a.items[d];
                if (b(f, a.items) === !1) break;
                f.t == g.FOLDER && c && s(f, b, !0)
            }
        },
        w = function (a) {
            a = a || n();
            s(a, function (a) {
                j[a.t] || (j[a.t] = {});
                j[a.t][a.id] || l[a.t]++;
                if (a.t == alloy.fileSystem.FILE_TYPE.FOLDER && !a.c) a.c = "folder";
                j[a.t][a.id] = a
            }, !0)
        },
        C = function (a, b, c) {
            if (!a.items) return null;
            for (var d in a.items) {
                var f = a.items[d];
                if (f.t == g.FOLDER) if (f.id == b) return f;
                else if (c && (f = C(f, b, c))) return f
            }
            return null
        },
        y = function (a, b, c) {
            if (!a.items) return null;
            for (var d in a.items) {
                var f = a.items[d];
                if (f.id == b.id && f.t == b.t) return a;
                else if (f.t == g.FOLDER && c && (f = y(f, b, c))) return f
            }
            return null
        },
        z = function (a, b, c) {
            if (!a.items) return null;
            for (var d = 0, f = a.items.length; d < f; d++) {
                var e = a.items[d];
                if (e.id == b.id && e.t == b.t) return {
                    parent: a,
                    file: e,
                    position: d
                };
                else if (e.t == g.FOLDER && c && (e = z(e, b, c))) return e
            }
            return null
        };
    this.getFolderById = function (a, b) {
        return a == -1 ? n() : j[g.FOLDER][a] ? j[g.FOLDER][a] : (b = b || n(), C(b, a, !0))
    };
    this.getFolderByName = function (a) {
        var b = j[g.FOLDER] || {},
            c;
        for (c in b) if (b[c].n === a) return b[c];
        return null
    };
    this.getFolderByFile = function (a, b) {
        b = b || n();
        return a.t == g.FOLDER ? this.getFolderById(a.pid, b) : y(b, a, !0)
    };
    this.getFolderIdByFile = function (a, b) {
        var c = this.getFolderByFile(a, b);
        return c ? c.id : null
    };
    this.getFolderInfoByFolder = function (a, b) {
        b = b || n();
        if (h(a.pid)) {
            var c = z(b, a, !0);
            if (c) return {
                file: c.file,
                parent: c.folder,
                position: c.position
            }
        } else {
            for (var c = this.getFolderById(a.pid, b), d = 0, f = c.items.length; d < f; d++) {
                var e = c.items[d];
                if (e.id == a.id && e.t == g.FOLDER) return {
                    file: e,
                    parent: c,
                    position: d
                }
            }
            throw Error("the parent folder id is not correct!");
        }
        return null
    };
    this.getFileInfoByFile = function (a, b, c) {
        b = b || n();
        h(c);
        return z(b, a, !0)
    };
    this.getFileByFile = function (a) {
        return j[a.t] ? j[a.t][a.id] : null
    };
    this.getFilesByType = function (a) {
        return j[a] ? j[a] : null
    };
    this.getFilesByParent = function (a, b) {
        var c = this.getFolderById(a);
        if (c) if (b) {
            var d = [],
                f, e;
            for (e in c.items) f = c.items[e], f.t == b && d.push(f);
            return d
        } else return c.items;
        else throw Error("the parent folder id is not correct!");
    };
    this.getFileAmount = function (a) {
        if (a) return l[a];
        else {
            var a = 0,
                b;
            for (b in l) a += l[b];
            return a
        }
    };
    this.getFileByFileName = function (a, c, d, f) {
        var d = d || n(),
            f = b.isUndefined(f) ? !0 : f,
            c = c || [],
            e = [];
        s(d, function (b) {
            if (c && !(String(c).toLowerCase().indexOf(b.t) > -1)) return !0;
            if (b.n && b.n == a) return e.push(b), !1
        }, f);
        return e
    };
    this.searchFileByFileName = function (a, c, d, f) {
        var d = d || n(),
            f = b.isUndefined(f) ? !0 : f,
            c = c || "",
            e = [];
        s(d, function (b) {
            if (c && !(String(c).toLowerCase().indexOf(b.t) > -1)) return !0;
            b.n && String(b.n).toLowerCase().indexOf(a) > -1 && e.push(b)
        }, f);
        return e
    };
    this.isInFolder = function (a, b, c) {
        return !!z(b, a, c)
    };
    var F = function (a, b, f, e) {
            var t = b.items ? b.items : b.items = [];
            !h(f) && f !== -1 ? t.splice(f, 0, a) : (t.push(a), f = t.length - 1);
            if (a.t == g.FOLDER || a.t == g.FILE) a.pid = b.id;
            j[a.t][a.id] || l[a.t]++;
            j[a.t][a.id] = a;
            a = {
                parent: b,
                file: a,
                position: f
            };
            e || c.notifyObservers(d, "FileAdd", a);
            return a
        };
    this.createFile = function (b, c, d, f, e) {
        var t = !0;
        a() && (t = !1);
        var k = this.getFolderById(c);
        if (k) {
            if (b.t == g.FOLDER) b.pid = c, b.items = b.items || [];
            if (h(d)) d = k.items.length;
            t ? (c = {
                fileList: [b],
                parent: k,
                position: d,
                callback: f
            }, c.noProcessStatus = e, D([b], k.id, d, null, c)) : (b.id = +new Date + o++, F(b, k, d, e))
        }
    };
    this.addFile = function (b, c, d, f, e) {
        a() && (f = !1);
        var c = h(c) ? 2 : Number(c),
            t = this.getFolderById(c);
        if (t) {
            b.id = Number(b.id);
            if (h(d) || d == -1) d = t.items.length;
            if (f) D([b], c, d, null, {
                fileList: [b],
                parent: t,
                position: d
            });
            else return F(b, t, d, e)
        } else throw Error("folder: " + c + " is not exist!");
    };
    this.addFiles = function (b, c, d, f, e) {
        a() && (f = !1);
        var c = h(c) ? 2 : Number(c),
            t = this.getFolderById(c);
        if (t) {
            if (h(d) || d == -1) d = t.items.length;
            if (f) D(b, c, d, null, {
                fileList: b,
                parent: t,
                position: d
            });
            else for (var g in b) this.addFile(b[g], c, null, !1, e)
        } else throw Error("folder: " + c + " is not exist!");
    };
    var H = function (a, b, f, e, t) {
            if (h(f)) f = d.getFileInfoByFile(a).position;
            b.items.splice(f, 1);
            if (a.t === g.FOLDER) {
                if (e && a.items && a.items.length) for (e = a.items.length - 1; e >= 0; e--) H(a.items[e], a, e, !0, t);
                delete a.pid
            }
            j[a.t][a.id] && l[a.t]--;
            j[a.t][a.id] = null;
            delete j[a.t][a.id];
            a = {
                parent: b,
                file: a,
                position: f
            };
            t || c.notifyObservers(d, "FileDelete", a);
            return a
        };
    this.deleteFile = function (b, c, d, f, e, t) {
        a() && (e = !1);
        if (b.t == g.FOLDER && h(c)) c = b.pid;
        var k, n = !1;
        if (h(c)) {
            if (b = this.getFileInfoByFile(b)) n = b.file, k = b.parent, d = b.position
        } else if (k = this.getFolderById(c), h(d)) {
            if (b = this.getFileInfoByFile(b, k, !1)) n = b.file, k = b.parent, d = b.position
        } else n = k.items[d];
        if (k && n) {
            if (n.t === g.FOLDER && n.items && n.items.length && !f) throw Error("the folder " + n.id + ' is not empty and isCascade is "' + !! f + '"!');
            if (e) E([n], k.id, null, {
                fileList: [n],
                parent: k,
                position: d,
                isCascade: f
            });
            else return H(n, k, d, f, t)
        } else return !1
    };
    this.deleteFiles = function (b, c, d, f) {
        a() && (d = !1);
        var e = this.getFolderById(c);
        if (e) if (d) E(b, e.id, null, {
            fileList: b,
            parent: e
        });
        else for (d = b.length - 1; d >= 0; d--) this.deleteFile(b[d], c, null, !0, !1, f);
        else return !1
    };
    var r = function (a, b, f, e, h, t) {
            H(a, e, h, !1, !0);
            F(a, b, f, !0);
            a = {
                file: a,
                targetId: b.id,
                targetPosition: f,
                sourceId: e.id,
                sourcePosition: h
            };
            t || c.notifyObservers(d, "FileMove", a);
            return a
        };
    this.moveFile = function (b, c, d, f, e, t, k) {
        a() && (t = !1);
        var n, o;
        h(f) ? b = this.getFileInfoByFile(b) : (o = this.getFolderById(f), b = this.getFileInfoByFile(b, o));
        if (b) o = b.parent, f = b.parent.id, e = b.position;
        else return !1;
        b = b.file;
        n = this.getFolderById(c);
        if (h(d) || d == -1) d = n.items.length;
        if (f == c) {
            if (d > n.items.length) d = n.items.length;
            d > e && d--;
            if (d == e) return !1
        }
        if (t) I([b], c, d, f, e, null, {
            fileList: [b],
            targetFolder: n,
            targetPosition: d,
            sourceFolder: o,
            sourcePosition: e
        }), (b.t == g.BUDDY || b.t == g.GROUP) && qqweb.util.report2qqweb("deskcontact|use|move");
        else return c == 5 && c != f && W(!1), r(b, n, d, o, e, k)
    };
    this.copyFile = function (a, b, c) {
        var d = {},
            f = {};
        arguments = {};
        var e = this.getFolderById(b),
            d = {
                objs: [a],
                dest: e
            };
        arguments = {
            fileList: [a],
            parent: e
        };
        f.data = d;
        f.arguments = arguments;
        f.onSuccess = c || G.onCopyFileSuccess;
        N(f)
    };
    this.fileDownload = function (a, b) {
        var c = {},
            d = {};
        arguments = {};
        c = {
            objs: [a]
        };
        arguments = {
            fileList: [a]
        };
        d.data = c;
        d.arguments = arguments;
        d.onSuccess = b ||
        function () {};
        d.action = "get_files";
        d.methon = "POST";
        A(d)
    };
    this.getFolderItems = function (a, b) {
        var c = {},
            d = {};
        arguments = {};
        c = {
            obj: a,
            providers: alloy.storage.getBoundDisk()
        };
        arguments = {
            obj: a
        };
        d.data = c;
        d.arguments = arguments;
        d.onSuccess = b || G.onGetFolderItemSuccess;
        M(d)
    };
    this.openFile = function (a, c) {
        a.cookie_name && b.cookie.set(a.cookie_name, a.cookie_value, alloy.CONST.MAIN_DOMAIN, "", 0.5);
        var d = alloy.util.getFileExt(a.n).toLowerCase(),
            f = {};
        switch (d) {
        case "jpg":
        case "jpeg":
        case "bmp":
        case "png":
        case "gif":
            f = {
                type: d,
                files: [{
                    url: c,
                    title: a.n
                }]
            };
            break;
        case "txt":
        case "doc":
        case "docx":
        case "ppt":
        case "pptx":
        case "xls":
        case "xlsx":
        case "pdf":
            f = {
                type: d,
                files: [{
                    obj: a,
                    url: c,
                    title: a.n
                }]
            }
        }
        alloy.system.openFile(f)
    };
    this.cleanFiles = function (a, b) {
        var c = {},
            d = {};
        arguments = {};
        c = {
            provider: a
        };
        arguments = {
            provider: a
        };
        d.data = c;
        d.arguments = arguments;
        d.onSuccess = b || G.onCleanFilesSuccess;
        d.action = "clean_files_by_provider";
        d.method = "POST";
        A(d)
    };
    var k = function (a, b) {
            var f = d.getFileByFile(a);
            if (!f) return !1;
            if (!h(a.n)) f.n = a.n;
            b || c.notifyObservers(d, "FileUpdate", f);
            return f
        };
    this.isFileNameExist = function (a, c, d) {
        var c = b.isUndefined(d) ? j[c] : this.getFilesByParent(d),
            f;
        for (f in c) if (c[f].n == a) return !0;
        return !1
    };
    this.isFileNameAvailable = function (a, b, c) {
        var f = "\u6587\u4ef6\u5939";
        b == g.FILE && (f = "\u6587\u4ef6");
        if (a.replace(/[\\/:*?"<>|]/g, "") != a) return f + '\u540d\u79f0\u4e0d\u80fd\u5305\u542b\\/:*?"<>|\u7b49\u7279\u6b8a\u5b57\u7b26';
        if (a.replace(/\s/g, "") == "") return f + "\u540d\u79f0\u4e0d\u80fd\u53ea\u5305\u542b\u7a7a\u5b57\u7b26";
        else if (e.byteLength(a) > 48) return f + "\u540d\u79f0\u8fc7\u957f\uff08\u5b57\u6570\u6700\u591a\u4e3a24\u4e2a\u6c49\u5b57\u621648\u4e2a\u5b57\u7b26\uff09";
        else if (d.isFileNameExist(a, b, c)) return f + "\u540d\u79f0\u6709\u51b2\u7a81\uff0c\u8bf7\u8f93\u5165\u65b0\u7684\u540d\u79f0";
        return 0
    };
    this.getDefaultFolderName = function () {
        for (var a = "\u6587\u4ef6\u5939", b = 2; b < q; ++b) {
            if (!alloy.fileSystem.isFileNameExist(a, g.FOLDER)) break;
            a = "\u6587\u4ef6\u5939" + b + ""
        }
        b == q && (a = +new Date);
        return a
    };
    this.updateFile = function (b, c, d) {
        a() && (c = !1);
        var f = this.getFileInfoByFile(b);
        if (!f) return !1;
        b.on = f.file.n;
        if (c) K([b], f.parent.id, null, {
            fileList: [b],
            parent: f.parent
        });
        else return k(b, d)
    };
    this.updateFiles = function (b, c, d, f) {
        a() && (d = !1);
        var e = this.getFolderById(c);
        if (e) if (d) K(b, c, null, {
            fileList: b,
            parent: e
        });
        else for (var h in b) this.updateFile(b[h], !1, f);
        else return !1
    };
    var A = function (a) {
            if (alloy.portal.getLoginLevel() != alloy.CONST.LOGIN_LEVEL_NONE) {
                var a = a || {},
                    c = a.data || {};
                c.vfwebqq = alloy.portal.getVfWebQQ();
                for (var d in c) if (b.isObject(c[d]) || b.isArray(c[d])) c[d] = b.json.stringify(c[d]);
                a.data = c;
                a.method = a.method || "GET";
                a.onError = a.onError || G.onRequestError;
                a.onTimeout = a.onTimeout || G.onRequestTimeout;
                alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL + "cgi/top/" + a.action, a)
            }
        },
        D = function (a, b, f, e, t, n) {
            !n && p ? c.notifyObservers(d, "FileProcessing", a) : (p = !0, b = {
                objs: a,
                pid: b,
                ti: f < 0 ? 0 : f
            }, t = t || {}, t.noProcessStatus = h(t.noProcessStatus) ? n : t.noProcessStatus, t = {
                data: b,
                arguments: t
            }, t.onSuccess = e || G.onAddFileSuccess, t.onError = G.onAddFileError, t.onTimeout = G.onAddFileTimeout, t.action = "create", t.method = "POST", A(t), J(a, "create"))
        },
        E = function (a, b, f, e, t) {
            if (!t && p) c.notifyObservers(d, "FileProcessing", a);
            else {
                p = !0;
                var n = [],
                    k;
                for (k in a) {
                    var g = a[k];
                    if (!t && P(g, !0)) return;
                    n.push({
                        t: g.t,
                        id: g.id
                    })
                }
                b = {
                    did: b,
                    objs: n
                };
                e = e || {};
                e.noProcessStatus = h(e.noProcessStatus) ? t : e.noProcessStatus;
                e = {
                    data: b,
                    arguments: e
                };
                e.onSuccess = f || G.onDeleteFileSuccess;
                e.action = "remove";
                e.method = "POST";
                A(e);
                J(a, "del")
            }
        },
        I = function (a, b, f, e, t, n, k, g) {
            if (!g && p) c.notifyObservers(d, "FileProcessing", a);
            else {
                p = !0;
                var o = [],
                    s;
                for (s in a) {
                    var w = a[s];
                    if (!g && P(w, !0)) return;
                    o.push({
                        t: w.t,
                        id: w.id
                    })
                }
                k = k || {};
                k.noProcessStatus = h(k.noProcessStatus) ? g : k.noProcessStatus;
                k = {
                    arguments: k
                };
                if (b == e) k.action = "order", k.data = {
                    did: e,
                    from: t,
                    to: f,
                    count: o.length
                };
                else if (k.action = "move", k.data = {
                    objs: o,
                    did: e,
                    tid: b,
                    ti: f < 0 ? 0 : f
                }, b === 5) k.data.limit = 5, k.data.ofd = e;
                k.onSuccess = n || G.onMoveFileSuccess;
                k.method = "POST";
                A(k);
                J(a, "move")
            }
        },
        K = this.sendUpdateFiles = function (a, b, f, e, t) {
            if (!t && p) c.notifyObservers(d, "FileProcessing", a);
            else {
                p = !0;
                var k = [],
                    n;
                for (n in a) {
                    var g = a[n];
                    if (!t && P(g, !0)) return;
                    var o = {
                        t: g.t,
                        id: g.id,
                        n: g.n
                    };
                    if (!h(g.n)) o.n = g.n, o.on = g.on;
                    k.push(o)
                }
                b = {
                    did: b,
                    objs: k
                };
                e = e || {};
                e.noProcessStatus = h(e.noProcessStatus) ? t : e.noProcessStatus;
                e = {
                    data: b,
                    arguments: e
                };
                e.onSuccess = f || G.onUpdateFileSuccess;
                e.action = "modify";
                e.method = "POST";
                A(e);
                J(a, "modify")
            }
        };
    this.sendUpdateProgress = function (a) {
        a.action = "update_progress";
        a.method = "POST";
        A(a)
    };
    var N = this.sendCopyFile = function (a) {
            a.action = "copy_file";
            a.method = "POST";
            A(a)
        };
    this.sendFileMove = function (a) {
        a.action = "file_move";
        a.method = "POST";
        A(a)
    };
    var M = this.sendGetFolderItem = function (a) {
            a.action = "get_folder";
            a.method = "POST";
            A(a)
        },
        J = function (a, b) {
            var c = a[0];
            c.t == g.FOLDER ? alloy.util.report2qqweb("file|" + b + "|folder") : c.t == g.APP ? alloy.util.report2qqweb("file|" + b + "|app") : (c.t == g.BUDDY || c.t == g.GROUP) && alloy.util.report2qqweb("file|" + b + "|contact")
        },
        Q = function () {
            alloy.util.report2h("get_file_system", "start");
            b.profile("getDesktopStart");
            typeof progress == "function" && progress("get_file_system start");
            var a = 0,
                c = "pc";
            b.platform.iPad ? c = "pad" : window.webTop && (c = "air");
            var d = {
                onSuccess: G.onGetFileSystemConfigSuccess,
                context: this,
                data: {
                    from: c
                },
                onError: function () {
                    alloy.util.report2m(151396);
                    alloy.util.report2qqweb("config|file|error");
                    b.error("getDesktopError");
                    typeof progress == "function" && progress("get_file_system error", 0);
                    a == 0 ? (R(d), a++) : timeoutConfirm("\u8bfb\u53d6\u6587\u4ef6\u4fe1\u606f\u51fa\u9519\uff0c\u662f\u5426\u5237\u65b0\u91cd\u8bd5\uff1f\n\u70b9\u53d6\u6d88\u4f7f\u7528\u9ed8\u8ba4\u6587\u4ef6\u914d\u7f6e\u3002") || (m = !0, alloy.config.offlineSetupAppList(), L())
                },
                onTimeout: function () {
                    alloy.util.report2m(151395);
                    alloy.util.report2qqweb("config|file|timeout");
                    b.error("getDesktopTimeout");
                    typeof progress == "function" && progress("get_file_system timeout", 0);
                    a == 0 ? (R(d), a++) : timeoutConfirm("\u8bfb\u53d6\u6587\u4ef6\u4fe1\u606f\u8d85\u65f6\uff0c\u662f\u5426\u5237\u65b0\u91cd\u8bd5\uff1f\n\u70b9\u53d6\u6d88\u4f7f\u7528\u9ed8\u8ba4\u6587\u4ef6\u914d\u7f6e\u3002") || (m = !0, alloy.config.offlineSetupAppList(), L())
                }
            };
            R(d)
        },
        R = function (a) {
            a.action = "get_desk";
            a.method = "GET";
            A(a)
        },
        G = {
            onBeforeGetUAC: function () {
                u = !1
            },
            onSimpleUACReady: function (a) {
                a.uacLoaded ? (m = !0, x = !1) : (m = !1, x = !0);
                x && alloy.portal.getLoginLevel() > alloy.CONST.LOGIN_LEVEL_NONE ? alloy.config.isNewUser ? (alloy.config.restoreConfig({
                    appConfig: 1
                }), L()) : Q() : (m = !0, L())
            },
            onGetFileSystemConfigSuccess: function (a) {
                if (a && a.retcode == 0) if (alloy.util.report2h("get_file_system", "end", "ok"), b.profile("getDesktopSuccess"), a = a.result.values, h(a) || alloy.config.setDesktopList(a), a = alloy.config.getDesktopList(), a.length < 5) alloy.util.report2m(151401), b.error("getDesktopFail : desktop data part missing"), timeoutConfirm("\u8bfb\u53d6\u5230\u7684\u684c\u9762\u6570\u636e\u90e8\u5206\u6570\u636e\u4e22\u5931, \u662f\u5426\u5237\u65b0\u91cd\u8bd5\uff1f\n\u70b9\u53d6\u6d88\u4f7f\u7528\u9ed8\u8ba4\u6587\u4ef6\u914d\u7f6e\u3002") || (m = !0, alloy.config.offlineSetupAppList(), alloy.config.setDesktopList(alloy.config.getDefaultDesktopList()), L());
                else {
                    var c = 0,
                        d;
                    for (d in a) a[d].items && a[d].items.length && (c += a[d].items.length);
                    c ? (x && (m = !1), L()) : (alloy.util.report2m(151398), b.error("getDesktopFail : empty desktop"), timeoutConfirm("\u8bfb\u53d6\u5230\u7684\u684c\u9762\u6570\u636e\u4e0d\u6b63\u786e, \u662f\u5426\u5237\u65b0\u91cd\u8bd5\uff1f\n\u70b9\u53d6\u6d88\u4f7f\u7528\u9ed8\u8ba4\u6587\u4ef6\u914d\u7f6e\u3002") || (m = !0, alloy.config.offlineSetupAppList(), alloy.config.setDesktopList(alloy.config.getDefaultDesktopList()), L()))
                } else alloy.util.report2m(151397), alloy.util.report2h("get_file_system", "end", "error"), b.error("getDesktopFail : retcode=" + a.retcode), timeoutConfirm("\u8bfb\u53d6\u684c\u9762\u6570\u636e\u51fa\u9519\uff0c\u662f\u5426\u5237\u65b0\u91cd\u8bd5\uff1f\n\u70b9\u53d6\u6d88\u4f7f\u7528\u9ed8\u8ba4\u6587\u4ef6\u914d\u7f6e\u3002") || (m = !0, alloy.config.offlineSetupAppList(), L())
            },
            onAddSetupAppList: function (a) {
                var b = a.folderId;
                d.getFolderById(b);
                d.addFile({
                    t: g.APP,
                    id: a.id
                }, b, -1, !0)
            },
            onRemoveSetupAppList: function (a) {
                d.deleteFile({
                    t: g.APP,
                    id: a.id
                }, null, null, !1, !a.noSave)
            },
            onRestoreAppList: function () {
                var a = alloy.config.getDefaultDesktopList(),
                    b = [g.APP, g.BUDDY, g.GROUP, g.FOLDER, g.FILE],
                    c = [],
                    d;
                for (d in a) c.push(a[d].items);
                A({
                    data: {
                        objects: c,
                        types: b
                    },
                    onSuccess: void 0,
                    action: "reset",
                    method: "POST"
                })
            },
            onRequestError: function (a) {
                p = !1;
                var f = a.arguments.fileList,
                    e;
                for (e in f) P(f[e], !1);
                b.error("FileOperateError");
                a.arguments.noProcessStatus || c.notifyObservers(d, "FileOperateError", a.arguments)
            },
            onRequestTimeout: function (a) {
                p = !1;
                var f = a.arguments.fileList,
                    e;
                for (e in f) P(f[e], !1);
                b.error("FileOperateTimeout");
                a.arguments.noProcessStatus || c.notifyObservers(d, "FileOperateTimeout", a.arguments);
                f = a.arguments;
                delete a.arguments;
                alloy.rpcService.sendFileErrorReport({
                    request: f,
                    response: a
                })
            },
            onAddFileError: function (a) {
                b.error("AddFileError");
                p = !1;
                a.arguments.noProcessStatus || c.notifyObservers(d, "FileOperateError", a.arguments)
            },
            onAddFileTimeout: function (a) {
                b.error("AddFileTimeout");
                p = !1;
                a.arguments.noProcessStatus || c.notifyObservers(d, "FileOperateTimeout", a.arguments);
                var f = a.arguments;
                delete a.arguments;
                alloy.rpcService.sendFileErrorReport({
                    request: f,
                    response: a
                })
            },
            onAddFileSuccess: function (a) {
                p = !1;
                if (a.retcode == 0 && a.result && a.result.code == 0) {
                    var f = a.result.objs || [],
                        a = a.arguments,
                        e = h(a.position) ? a.parent.items.length : a.position,
                        t;
                    for (t in f) {
                        var k = f[t];
                        if (k.t == g.FILE) k.upload = 1;
                        F(k, a.parent, e);
                        e += 1;
                        b.isFunction(a.callback) && a.callback(k)
                    }
                } else b.error("AddFileFail"), a.arguments.noProcessStatus || c.notifyObservers(d, "AddFileFail", a), a.arguments.fileList && a.arguments.fileList[0] && (k = a.arguments.fileList[0], k.t == g.FOLDER ? alloy.util.report2m(151383) : k.t == g.APP ? alloy.util.report2m(151387) : (k.t == g.BUDDY || k.t == g.GROUP) && alloy.util.report2m(151391)), f = a.arguments, delete a.arguments, alloy.rpcService.sendFileErrorReport({
                    request: f,
                    response: a
                })
            },
            onDeleteFileSuccess: function (a) {
                p = !1;
                if (a.retcode == 0 && a.result && a.result.code == 0) {
                    var a = a.arguments,
                        f = a.fileList,
                        e;
                    for (e in f) {
                        var h = f[e];
                        P(h, !1);
                        H(h, a.parent, a.position, a.isCascade)
                    }
                } else b.error("DeleteFileFail"), B(a.arguments.fileList, !1), a.arguments.noProcessStatus || c.notifyObservers(d, "DeleteFileFail", a.arguments), a.arguments.fileList && a.arguments.fileList[0] && (h = a.arguments.fileList[0], h.t == g.FOLDER ? alloy.util.report2m(151385) : h.t == g.APP ? alloy.util.report2m(151389) : (h.t == g.BUDDY || h.t == g.GROUP) && alloy.util.report2m(151393)), e = a.arguments, delete a.arguments, alloy.rpcService.sendFileErrorReport({
                    request: e,
                    response: a
                })
            },
            onMoveFileSuccess: function (a) {
                p = !1;
                if (a.retcode == 0 && a.result && a.result.code == 0) {
                    var a = a.arguments,
                        f = a.fileList,
                        e = a.targetFolder.id,
                        h;
                    for (h in f) {
                        var t = f[h];
                        P(t, !1);
                        e == 5 && e != a.sourceFolder.id && W(!1);
                        r(t, a.targetFolder, a.targetPosition, a.sourceFolder, a.sourcePosition)
                    }
                } else b.error("MoveFileFail"), B(a.arguments.fileList, !1), a.arguments.noProcessStatus || c.notifyObservers(d, "MoveFileFail", a.arguments), a.arguments.fileList && a.arguments.fileList[0] && (t = a.arguments.fileList[0], t.t == g.FOLDER ? alloy.util.report2m(151384) : t.t == g.APP ? alloy.util.report2m(151388) : (t.t == g.BUDDY || t.t == g.GROUP) && alloy.util.report2m(151392)), h = a.arguments, delete a.arguments, alloy.rpcService.sendFileErrorReport({
                    request: h,
                    response: a
                })
            },
            onCopyFileSuccess: function (a) {
                if (a.retcode == 0 && a.result && a.result.code == 0) {
                    var b = a.arguments,
                        a = a.result.objs,
                        f;
                    for (f in a) {
                        var e = a[f];
                        P(e, !1);
                        alloy.storage.useSpace(e.s, e.size);
                        F(e, b.parent, null, null)
                    }
                } else B(a.arguments.fileList, !1), a.arguments.noProcessStatus || c.notifyObservers(d, "CopyFileFail", a.arguments), b = a.arguments, delete a.arguments, alloy.rpcService.sendFileErrorReport({
                    request: b,
                    response: a
                })
            },
            onGetFolderItemSuccess: function (a) {
                a.retcode == 0 && a.result && a.result.code == 0 ? c.notifyObservers(d, "GetFolderItemSuccess", a) : c.notifyObservers(d, "GetFolderItemFail", a)
            },
            onCleanFilesSuccess: function (a) {
                if (a.retcode == 0 && a.result && a.result.code == 0) {
                    var b = j[g.FILE],
                        f;
                    for (f in b) {
                        var e = b[f];
                        e.s === a.arguments.provider && d.deleteFile(e, null, null, null, !1, !1)
                    }
                    c.notifyObservers(d, "CleanFilesSuccess", a.arguments.provider)
                } else alloy.layout.alert("\u89e3\u9664\u7ed1\u5b9a\u5931\u8d25\uff01")
            },
            onUpdateFileSuccess: function (a) {
                p = !1;
                if (a.retcode == 0 && a.result && a.result.code == 0) {
                    var a = a.arguments.fileList,
                        f;
                    for (f in a) {
                        var e = a[f];
                        P(e, !1);
                        k(e)
                    }
                } else b.error("UpdateFileFail"), B(a.arguments.fileList, !1), a.arguments.noProcessStatus || c.notifyObservers(d, "UpdateFileFail", a.arguments), a.arguments.fileList && a.arguments.fileList[0] && (e = a.arguments.fileList[0], e.t == g.FOLDER ? alloy.util.report2m(151386) : e.t == g.APP ? alloy.util.report2m(151390) : (e.t == g.BUDDY || e.t == g.GROUP) && alloy.util.report2m(151394)), f = a.arguments, delete a.arguments, alloy.rpcService.sendFileErrorReport({
                    request: f,
                    response: a
                })
            }
        },
        W = function (a) {
            var b = alloy.fileSystem.getFolderById(5);
            if (b.items.length >= 5) for (var c = alloy.desktopManager.getCurrentDesktopIndex(), b = b.items; b.length >= 5;) {
                var f = b.length - 1;
                d.moveFile(b[f], c, null, 5, f, !! a)
            }
        },
        P = function (a, b) {
            if (b) {
                if (a.processing) return c.notifyObservers(d, "FileProcessing", a), !0;
                a.processing = !0;
                c.notifyObservers(d, "FileBeforeProcess", a)
            } else delete a.processing, c.notifyObservers(d, "FileProcessed", a)
        },
        B = function (a, c) {
            if (b.isArray(a)) for (var d in a) P(a[d], c);
            else P(a, c)
        },
        L = function () {
            f();
            j = {};
            j[g.FOLDER] = {};
            j[g.FILE] = {};
            j[g.APP] = {};
            j[g.BUDDY] = {};
            j[g.GROUP] = {};
            l = {};
            l[g.FOLDER] = 0;
            l[g.FILE] = 0;
            l[g.APP] = 0;
            l[g.BUDDY] = 0;
            l[g.GROUP] = 0;
            w();
            a() || t();
            u = !0;
            c.notifyObservers(d, "FileSystemReady");
            c.notifyObservers(alloy.portal, "UACReady")
        },
        V = [],
        T = function () {},
        S = function (a) {
            p = !1;
            if (!(a.retcode == 0 && a.result && a.result.code == 0)) {
                b.error("AddFileFail");
                var c = a.arguments;
                delete a.arguments;
                alloy.rpcService.sendFileErrorReport({
                    request: c,
                    response: a
                })
            }
        },
        U = function (a) {
            V.push(a)
        },
        Z = function () {
            for (var a; a = V.shift();) setTimeout(a, 500)
        },
        t = function () {
            var a = alloy.config.getSetupAppList(),
                c = alloy.config.configList.defaultScreen,
                c = h(c) ? 2 : c - 1,
                f = d.getFolderById(c),
                e = d.getFolderById(5),
                t = [],
                k, n = !1,
                o = alloy.config.getMustInstallAppList(),
                s;
            for (s in o) {
                var w = Number(s);
                alloy.config.isInSetupAppList(w) || (n = !0, k = {
                    t: g.APP,
                    id: w
                }, a.push(w), d.getFileByFile(k) || (t.push(k), d.addFile(k, 5, 0, !1, !0)))
            }
            if (n && (b.profile("forceInstallApp"), alloy.config.sendSetSetupAppList(), t.length)) {
                var B = e.items.length,
                    m = t.concat();
                U(function () {
                    D(m, 5, B, S, {
                        fileList: m
                    }, !0)
                })
            }
            t = [];
            if (e.items.length > 5) for (k = e.items; k.length > 5;) w = k.length - 1, t.push(k[w]), d.moveFile(k[w], c, null, 5, w, !1, !0);
            if (t.length && (b.profile("checkDock"), !n)) {
                var O = t.concat();
                U(function () {
                    I(O, c, 0, 5, null, T, {
                        fileList: O
                    }, !0)
                })
            }
            t = [];
            n = d.getFilesByType(g.APP);
            for (s in a) n[a[s]] || (k = {
                t: g.APP,
                id: a[s]
            }, t.push(k));
            if (t.length) {
                b.profile("addMissApp");
                d.addFiles(t, c, -1, !1, !0);
                var r = t.concat(),
                    j = f.items.length;
                U(function () {
                    D(r, c, j, S, {
                        fileList: r
                    }, !0)
                })
            }
            var f = {},
                t = !1,
                l;
            for (l in n) if ((w = Number(n[l].id)) && b.array.indexOf(a, w) == -1) t = !0, k = n[l], s = d.getFileInfoByFile(k), f[s.parent.id] || (f[s.parent.id] = {}), f[s.parent.id][k.id] = k, d.deleteFile(k, null, null, !1, !1, !0);
            if (t) {
                b.profile("removeSurplusApp");
                for (var H in f) {
                    a = [];
                    l = Number(H);
                    for (var p in f[H]) a.push(f[H][p]);
                    U(b.bind(function (a) {
                        E(a.fileList, a.folderId, T, null, !0)
                    }, d, {
                        fileList: a,
                        folderId: l
                    }))
                }
            }
            Z()
        };
    this.createRecentContactFolder = function (b) {
        if (!a()) {
            var c = d.getFolderByName("\u5e38\u7528\u8054\u7cfb\u4eba");
            if (c) {
                if (b.length) {
                    var f = 16 - c.items.length;
                    b.length > f && b.splice(f);
                    d.addFiles(b, c.id, null, !1);
                    D(b, c.id, 0, S, null, !0)
                }
                alloy.config.setPortalConfig("hasRecentFolder", 1)
            } else c = {
                t: g.FOLDER,
                n: "\u5e38\u7528\u8054\u7cfb\u4eba"
            }, d.createFile(c, alloy.config.configList.defaultScreen - 1, null, function (a) {
                alloy.config.setPortalConfig("hasRecentFolder", 1);
                b.length && (d.addFiles(b, a.id, null, !1), D(b, a.id, 0, S, null, !0))
            }, !0)
        }
    };
    this.isFileSystemReady = function () {
        return u
    };
    this.init = function () {
        c.addObserver(alloy.portal, "SimpleUACReady", G.onSimpleUACReady);
        c.addObserver(alloy.config, "BeforeGetUAC", G.onBeforeGetUAC);
        c.addObserver(alloy.config, "AddSetupAppList", G.onAddSetupAppList);
        c.addObserver(alloy.config, "RemoveSetupAppList", G.onRemoveSetupAppList);
        c.addObserver(alloy.config, "RestoreAppList", G.onRestoreAppList)
    }
});