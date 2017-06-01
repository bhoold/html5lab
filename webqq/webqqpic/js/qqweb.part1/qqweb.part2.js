Jx().$package("alloy.flashUploadManager", function (b) {
    function d() {
        var a;
        if (typeof ActiveXObject != "undefined") try {
            new ActiveXObject("ShockwaveFlash.ShockwaveFlash.10")
        } catch (b) {
            return !1
        } else if (a = navigator.plugins["Shockwave Flash"]) {
            if (a = a.description.match(/(?:\d+\.)*\d+/), !a || +a[0].split(".")[0] < 10) return !1
        } else return !1;
        return !0
    }
    function c(a, b) {
        a._verifiedBytes = a.fileSize;
        k(y.FINISH_LOCAL_VERIFY, a);
        a.folderId == -2 ? (a.directUpload = 1, alloy.storage.createFile(a, b)) : alloy.desktopFile.createFile(a, b)
    }
    function e(a, b, f) {
        b.status = f;
        delete E[b.fileId];
        k(a, b);
        q()
    }
    function g(a) {
        var b = 0,
            f = E,
            c;
        for (c in f) f[c].status == z.UPLOADING && f[c].via == a && b++;
        return b
    }
    function j(b, f) {
        if (f) {
            b.status = z.UPLOADING;
            E[b.fileId] = b;
            b.startTime = +new Date;
            var d = h.id(b.flashInstanceId);
            d && (d.uploadFile(b._info.flashId, f, {
                mode: "flashupload"
            }), k(y.START_UPLOAD, b))
        } else c(b, function (f) {
            var c = alloy.iconFactory.getIcons(f.id, alloy.fileSystem.FILE_TYPE.FILE);
            i = 0;
            for (len = c.length; i < len; i++) i != 0 && icon.hideUploadBar();
            K[b.fileId] = c[0];
            N[b.fileId] = f;
            a.addObserver(c[0], "cancle", function () {
                var a = h.id(b.flashInstanceId);
                a && a.cancleUpload(b._info.flashId)
            });
            j(b, f.post_url)
        })
    }
    function l() {
        for (var a = Array.prototype.slice.call(arguments), b = 0, f = a.length; b < f; b++) A.push(a[b]), k(y.ADDED_TO_QUEUE, D[a[b]]);
        q()
    }
    function q() {
        var a, b;
        a = A.shift();
        if ((a = D[a]) && !E[a.fileId]) {
            b = g(a.via);
            switch (a.via) {
            case "FLASH":
                if (b >= r.flashConcurrency) {
                    A.unshift(a.fileId);
                    return
                }
                j(a);
                break;
            case "PLUGIN":
                if (b >= r.pluginConcurrency) {
                    A.unshift(a.fileId);
                    return
                }
                _uploadViaPlugin(a)
            }
            q()
        }
    }
    function u() {
        var a = 0,
            b;
        for (b in E) a += E[b].fileSize;
        b = 0;
        for (var f = A.length; b < f; b++) a += D[A[b]].fileSize;
        return a
    }
    function p(a) {
        var b = Math.min(r.singleSizeLimit, a.via == "PLUGIN" ? C : w);
        if (a.fileName.replace(/[^\x00-\xff]/g, "xx").length > s) return a.status = z.FAIL_VERIFY, k(y.FILE_NAME_LENGTH_EXCEED_LIMIT, a, s), 1;
        else if (a.fileSize > b) return a.status = z.FAIL_VERIFY, k(y.FILE_SIZE_EXCEED_SINGLE_LIMIT, a, b), 1;
        else if (a.fileSize === 0) return a.status = z.FAIL_VERIFY, k(y.FILE_SIZE_ZERO, a), 1;
        return 0
    }
    function v(a, b, f) {
        var c, d, h, e, o;
        if (!b || !b.length) return 1;
        c = h = 0;
        for (d = b.length; c < d; c++) h += +b[c].size;
        c = b.length;
        d = h;
        h = r.selectionLimit;
        if (e = r.totalUploadLimit) {
            e = 0;
            for (o in E) e++;
            e += A.length;
            e = c + e > r.totalUploadLimit
        }
        e ? (k(y.EXCEED_MAX_UPLOAD, r.totalUploadLimit), c = 1) : c > h ? (k(y.EXCEED_MAX_SELECTION, c, h), c = 1) : r.totalSizeLimit && d + u() > r.totalSizeLimit ? (k(y.FILE_SIZE_EXCEED_TOTAL_LIMIT, d + u(), r.totalSizeLimit), c = 1) : c = 0;
        if (c !== 0) return 1;
        o = [];
        c = 0;
        for (d = b.length; c < d; c++) {
            e = b[c].name;
            fileSize = +b[c].size;
            h = a;
            var n = fileSize;
            h = {
                _uin: r.uin,
                _verifiedBytes: 0,
                _uploadedBytes: 0,
                index: H++,
                type: h ? h : 0,
                via: "FLASH",
                status: z.INIT,
                fileId: +(Math.round(Math.random() * 1E4).toString() + (new Date).getMilliseconds()),
                localPath: e,
                fileName: e.split("\\").pop(),
                fileSize: n,
                startTime: 0,
                _info: {}
            };
            if (D[void 0]) h.fileId = void 0;
            D[h.fileId] = h;
            if (p(h) === 0) o.push(h.fileId), h._info.flashId = b[c].id, h.flashInstanceId = b[c].flashInstanceId, h.folderId = f.folderId, I[b[c].id] = h.fileId
        }
        l.apply(this, o);
        return 0
    }
    function x() {
        g("FLASH") > 0 ? alloy.system.setCloseHookMessage("\u6b63\u5728\u4e0a\u4f20\u6587\u4ef6\uff0c\u60a8\u786e\u5b9a\u8981\u79bb\u5f00\u201cWebQQ\u201d\u5417\uff1f") : alloy.system.setCloseHookMessage("\u60a8\u786e\u5b9a\u8981\u79bb\u5f00\u201cWebQQ\u201d\u5417\uff1f")
    }
    function m(a, b, f) {
        switch (a) {
        case y.UPDATE_UPLOAD:
            (a = K[b.fileId]) && a.uploadProcess(f);
            break;
        case y.FILE_SIZE_EXCEED_SINGLE_LIMIT:
            alloy.layout.alert("\u76ee\u524d\u4ec5\u652f\u6301\u4e0a\u4f20\u5c0f\u4e8e100M\u7684\u6587\u4ef6\uff01");
            break;
        case y.FILE_SIZE_ZERO:
            alloy.layout.alert("\u6587\u4ef6\u5927\u5c0f\u4e0d\u80fd\u4e3a0\uff01");
            break;
        case y.FILE_SIZE_EXCEED_TOTAL_LIMIT:
            alloy.layout.alert("\u6587\u4ef6\u540d\u957f\u5ea6\u8d85\u8fc7\u4e86\u6700\u5927\u9650\u5236\uff01");
            break;
        case y.FAIL_UPLOAD:
            (a = K[b.fileId]) && a.uploadFailed()
        }
    }
    function o() {
        if (document.body.fireEvent) document.body.fireEvent("onclick", a);
        else if (document.createEvent) {
            var a = document.createEvent("MouseEvents");
            a.initEvent("click", !0, !0);
            document.body.dispatchEvent(a)
        }
    }
    var h = b.dom,
        a = b.event,
        f = this,
        n = 0;
    f.FlashUploader = new b.Class({
        isReady: !1,
        init: function (f) {
            f = f || {};
            f.callback = f.callback ||
            function () {};
            f.holder = f.holder || null;
            f.width = b.isUndefined(f.width) ? "1px" : f.width;
            f.height = b.isUndefined(f.height) ? "1px" : f.height;
            f.mode = b.isUndefined(f.mode) ? 0 : f.mode;
            f.autoshow = b.isUndefined(f.autoshow) ? !0 : f.autoshow;
            f.text = f.text || "";
            f.extInfo = f.extInfo || "";
            var c = this;
            if (this.flash) return 0;
            var d = ++n;
            if (!f.holder) {
                var e = h.node("div", {
                    id: "Alloy_Flash_Upload_" + d,
                    "class": "Alloy_Flash_Upload"
                });
                document.body.appendChild(e);
                f.holder = h.id("Alloy_Flash_Upload_" + d)
            }
            var e = typeof ActiveXObject != "undefined",
                o = alloy.CONST.MAIN_URL + "swf/FileUploader.swf?preventSwfCache=" + (new Date).getTime(),
                s = "";
            f.extInfo && (s = "&extInfo=" + f.extInfo);
            this.flashId = "swfFileUploader_" + d;
            this.wrapperNode = h.node("div", {
                id: "swfFileUploaderWrapper_" + d,
                style: "position:absolute;top:0;left:0;overflow:hidden;width:" + f.width + ";height:" + f.height + ";"
            });
            this.wrapperNode.innerHTML = ['<object id="' + this.flashId + '"' + (e ? "" : ' data="' + o + '"') + ' width="' + f.width + '" height="' + f.height + '" ' + (e ? 'classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' : 'type="application/x-shockwave-flash"') + ">", e ? '<param name="movie" value="' + o + '"/>' : "", '<param name="allowScriptAccess" value="always" /><param name="allownetworking" value="all" /><param name="wmode" value="transparent" />', '<param name="flashVars" value=\'callback=' + f.callback + "&flashInstanceId=" + this.flashId + "&selectionMode=" + (f.mode === 1 ? 1 : 0) + s + "' />", '<param name="menu" value="false" /></object>'].join("");
            f.holder.innerHTML = "";
            f.holder.appendChild(this.wrapperNode);
            this.divNode = h.node("div", {
                id: "swfFileUploaderDiv_" + d,
                style: "_background:url(" + alloy.CONST.CDN_URL_0 + "style/images/transparent.gif);width:" + f.width + ";height:" + f.height + ";"
            });
            this.divNode.innerHTML = f.text;
            f.holder.appendChild(this.divNode);
            this.holder = f.holder;
            c = this;
            a.on(this.divNode, "click", function (a) {
                a.preventDefault();
                alloy.flashUploadManager.checkBeforeUpload()
            });
            setTimeout(function () {
                c.flash = document.getElementById(c.flashId)
            }, 0);
            this.option = f;
            f.autoshow || this.hideFileSelector();
            this.isReady = !0;
            return 0
        },
        showFileSelector: function () {
            b.platform.iPad ? (h.setStyle(this.wrapperNode, "width", "1px"), h.setStyle(this.wrapperNode, "height", "1px"), h.setStyle(this.divNode, "color", "#999")) : (h.setStyle(this.wrapperNode, "width", this.option.width), h.setStyle(this.wrapperNode, "height", this.option.height));
            this.isFileSelectorShow = !0
        },
        hideFileSelector: function () {
            h.setStyle(this.wrapperNode, "width", "1px");
            h.setStyle(this.wrapperNode, "height", "1px");
            this.isFileSelectorShow = !1
        }
    });
    var s = 260,
        w = 157286399,
        C = 1073741823,
        y = {
            EXCEED_MAX_SELECTION: 1,
            EXCEED_MAX_UPLOAD: 2,
            FILE_POSTFIX_NOT_ALLOWED: 3,
            FILE_NAME_LENGTH_EXCEED_LIMIT: 4,
            FILE_SIZE_EXCEED_SINGLE_LIMIT: 5,
            FILE_SIZE_ZERO: 6,
            FILE_SIZE_EXCEED_TOTAL_LIMIT: 7,
            ADDED_TO_QUEUE: 8,
            START_LOCAL_VERIFY: 9,
            UPDATE_LOCAL_VERIFY: 10,
            FINISH_LOCAL_VERIFY: 11,
            FAIL_LOCAL_VERIFY: 12,
            FAIL_CREATE: 13,
            START_UPLOAD: 14,
            UPDATE_UPLOAD: 15,
            FINISH_UPLOAD: 16,
            FAIL_UPLOAD: 17,
            NOT_LOGIN: 18,
            NO_PRIVILEDGE: 19,
            SPACE_FULL: 20,
            BAD_WORDS: 21,
            CANCEL_UPLOAD: 22,
            REMOVE_FILE: 23,
            STORAGE_FULL: 24,
            NONE: 0
        };
    (function () {
        var a = {},
            b;
        for (b in y) a[y[b]] = b;
        return a
    })();
    var z = {
        INIT: 0,
        UPLOADING: 1,
        FINISHED: 2,
        FAIL_VERIFY: 3,
        FAIL_CREATE: 4,
        FAIL_UPLOAD: 5,
        CANCELLED: 6
    },
        F, H = 0,
        r = {
            postfixWhiteList: {
                "7z": 1,
                avi: 1,
                bmp: 1,
                doc: 1,
                docx: 1,
                flv: 1,
                swf: 1,
                jpg: 1,
                jpeg: 1,
                mov: 1,
                mp3: 1,
                pdf: 1,
                png: 1,
                ppt: 1,
                pptx: 1,
                rar: 1,
                rm: 1,
                rmvb: 1,
                rtf: 1,
                tif: 1,
                tiff: 1,
                txt: 1,
                wav: 1,
                wave: 1,
                wma: 1,
                wmv: 1,
                wps: 1,
                xls: 1,
                xlsx: 1,
                zip: 1
            }
        },
        k = function () {},
        A = [],
        D = {},
        E = {},
        I = {},
        K = {},
        N = {};
    f.flashEventListener = function (c, d, h) {
        var n = D[I[d && d.id]],
            s, c = parseInt(c);
        h && (h = b.json.parse(h));
        switch (c) {
        case 1:
            v(1, d, h);
            o();
            qqweb.util.report2qqweb("add|desktop|adddocument");
            break;
        case 11:
            o();
            break;
        case 3:
            if (n._uploadedBytes == d.processed) return;
            n._uploadedBytes = d.processed;
            k(y.UPDATE_UPLOAD, n, {
                processed: d.processed,
                fileSize: n.fileSize
            });
            break;
        case 4:
            h = !1;
            c = N[n.fileId];
            if ((s = d.res.match(/ftn_post_end\((\-?\d+)\)/)) && parseInt(s[1]) === 0) h = !0;
            else if (s = d.res.indexOf('"code":"ok"'), s >= 0) h = !0, d = b.json.parse(d.res), c.ks_fileid = d.fileId, a.notifyObservers(f, "FileUploadComplete", c);
            if (h) {
                var w = K[n.fileId];
                n.directUpload ? w && w.uploadSuccess() : (h = {}, d = {}, c.cur_size = c.size, h.obj = c, d.data = h, d.onSuccess = function (a) {
                    if (a.retcode == 0 && a.result && a.result.code == 0) n.serverPath = n._info.file_path, n._uploadedBytes = n.fileSize, n.status = z.FINISHED, k(y.FINISH_UPLOAD, n), q(), x(), w && w.uploadSuccess()
                }, alloy.fileSystem.sendUpdateProgress(d))
            } else e(y.FAIL_UPLOAD, n, z.FAIL_UPLOAD), alloy.layout.alert("\u4f20\u8f93\u6587\u4ef6\u6570\u636e\u5230\u5b58\u50a8\u786c\u76d8\u5931\u8d25\uff01");
            break;
        case 5:
            e(y.FAIL_UPLOAD, n, z.FAIL_UPLOAD);
            break;
        case 6:
            console.log("cancle")
        }
        x()
    };
    f.showUploadMask = function () {
        F || (F = new b.ui.MaskLayer({
            zIndex: alloy.layout.getTopZIndex(4),
            appendTo: document.body
        }), a.on(F.getElement(), "click", function (a) {
            a.preventDefault();
            a.stopPropagation()
        }));
        F.setOpacity(0.01);
        F.show()
    };
    f.hideUploadMask = function () {
        F && F.hide()
    };
    f.checkBeforeUpload = function () {
        if (b.platform.iPad) alloy.layout.alert("\u60a8\u5f53\u524d\u4f7f\u7528\u7684\u5e73\u53f0\u6682\u4e0d\u652f\u6301\u8be5\u529f\u80fd\uff01");
        else if (d()) alloy.system.getLoginLevel() < 2 ? alloy.layout.showLoginWindow("") : alloy.storage.getDefaultDisk() || (a = alloy.layout.confirm('<div class="bindDiskAlert">\u60a8\u8fd8\u672a\u7ed1\u5b9a\u4efb\u4f55\u786c\u76d8\uff0c\u7ed1\u5b9a\u540e\u6700\u591a\u53ef\u83b7\u5f9715GB\u7684Q+ Web\u5b58\u50a8\u7a7a\u95f4\u3002</div>', function () {
            alloy.portal.runApp("diskExplorer")
        }, {
            height: "70"
        }), a.getButton("ok").setText("\u7ed1\u5b9a"));
        else {
            var a = alloy.layout.confirm('<div class="flashInstallAlert">\u9700\u8981\u5b89\u88c5<a href="http://get.adobe.com/cn/flashplayer/" target="_blank">Flash Player</a>\u624d\u80fd\u4e0a\u4f20\u6587\u4ef6\u3002</div>', function () {
                window.open("http://get.adobe.com/cn/flashplayer/", "_blank")
            });
            a.getButton("ok").setText("\u4e0b\u8f7d")
        }
    };
    f.upload = j;
    this.init = function () {
        var a = {
            uin: alloy.portal.getCookieUin(),
            listener: m
        },
            b;
        for (b in a) r[b] = a[b];
        r.uin = +r.uin;
        r.port = r.port || 80;
        r.selectionLimit = r.selectionLimit || 12;
        r.singleSizeLimit = r.singleSizeLimit || C;
        r.flashConcurrency = r.flashConcurrency || 10;
        k = r.listener || k
    }
});