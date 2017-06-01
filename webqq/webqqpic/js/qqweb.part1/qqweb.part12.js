Jx().$package("alloy.desktopFolder", function (b) {
    var d = b.event,
        c = b.dom,
        d = b.event,
        e = b.string,
        g = alloy.fileSystem.MAX_FOLDER_AMOUNT,
        j = alloy.fileSystem.FILE_TYPE,
        l = {
            onFileUpdate: function (b) {
                var c = alloy.iconFactory.getIcons(b.id, b.t);
                if (c) for (var d = 0, e = c.length; d < e; d++) c[d].setText(b.n), c[d].file.n = b.n
            },
            onFileCreateSuccess: function (b) {
                var c = alloy.iconFactory.getIcons(b.id, b.t);
                if (c) for (var d = 0, g = c.length; d < g; d++) c[d].setText(e.encodeHtml(b.n))
            },
            onFileAdd: function (b) {
                if (b = alloy.iconFactory.getIcons(b.parent.id, b.parent.type)) for (var c = 0, d = b.length; c < d; c++) b[c].update()
            },
            onFileDelete: function (b) {
                if (b = alloy.iconFactory.getIcons(b.parent.id, b.parent.type)) for (var c = 0, d = b.length; c < d; c++) b[c].update()
            },
            onFileMove: function (b) {
                var c = b.targetId,
                    b = b.sourceId,
                    d = alloy.iconFactory.getIcons(c, j.FOLDER);
                if (d) for (var e = 0, g = d.length; e < g; e++) d[e].update();
                if (d = alloy.iconFactory.getIcons(b, j.FOLDER)) {
                    e = 0;
                    for (g = d.length; e < g; e++) d[e].update()
                }
                alloy.iconFactory.updateNotifyNumber(alloy.fileSystem.getFolderById(b));
                alloy.iconFactory.updateNotifyNumber(alloy.fileSystem.getFolderById(c))
            }
        };
    this.init = function () {
        d.addObserver(alloy.fileSystem, "FileUpdate", l.onFileUpdate);
        d.addObserver(alloy.fileSystem, "FileAdd", l.onFileAdd);
        d.addObserver(alloy.fileSystem, "FileDelete", l.onFileDelete);
        d.addObserver(alloy.fileSystem, "FileMove", l.onFileMove)
    };
    this.createFolder = function () {
        alloy.fileSystem.getFileAmount(j.FOLDER) >= g ? alloy.layout.alert("\u6587\u4ef6\u5939\u5df2\u8d85\u8fc7" + g + "\u4e2a\u4e0a\u9650\uff0c\u8bf7\u5220\u51cf\u540e\u518d\u521b\u5efa\u3002") : alloy.system.getLoginLevel() > 1 ? new u({
            callback: function (b) {
                var c = alloy.desktopManager.getCurrentDesktopIndex();
                alloy.fileSystem.createFile({
                    t: alloy.fileSystem.FILE_TYPE.FOLDER,
                    n: b.n,
                    c: b.c
                }, c, null, l.onFileCreateSuccess)
            }
        }) : alloy.layout.showLoginWindow("")
    };
    this.deleteFolder = function (b) {
        var c = alloy.fileSystem.getFolderById(b.id).items,
            d = !1,
            e = !1;
        c.length ? alloy.layout.confirm("\u60a8\u786e\u5b9a\u5220\u9664\u6587\u4ef6\u5939\u7684\u6240\u6709\u5185\u5bb9\u5417\uff1f", function () {
            for (var g = [], h = c.length - 1; h >= 0; h--) {
                var a = c[h];
                if (a.t == j.APP) {
                    var f = alloy.appconfig.getAppConfig(a.id);
                    if (f) f.noSave = !0, alloy.config.removeSetupAppList(f, !1, !0) === !1 ? e = !0 : (g.push(a), d = !0)
                } else g.push(a)
            }
            d && alloy.config.sendSetSetupAppList();
            e ? g.length && alloy.fileSystem.deleteFiles(g, b.id, !0) : alloy.fileSystem.deleteFile(b, null, null, !0, !0)
        }, {
            title: "\u5220\u9664\u6587\u4ef6\u5939"
        }) : alloy.fileSystem.deleteFile(b, null, null, !1, !0)
    };
    var q = function (c) {
            var d = alloy.CONST.CDN_URL + "style/images/filesys/" + c + ".png",
                e = alloy.CONST.CDN_URL + "style/images/transparent.gif";
            return b.browser.ie == 6 ? '<img class="fcDropdown_img" src="' + e + '" style="' + ("background:node;filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + d + "', sizingMethod='scale')") + '" idx="' + c + '" />' : '<img class="fcDropdown_img" src="' + d + '" idx="' + c + '" />'
        },
        u = new b.Class({
            init: function (e) {
                var g = this,
                    e = e || {};
                e.id = e.id || +new Date;
                e.callback = e.callback ||
                function () {};
                g.option = e;
                var l = g.folderWindow = alloy.windowFactory.createWindow("Window", {
                    title: "\u65b0\u5efa\u6587\u4ef6\u5939",
                    modeSwitch: !0,
                    dragable: !0,
                    width: 380,
                    height: 120,
                    hasCloseButton: !0,
                    hasOkButton: !0,
                    hasCancelButton: !0,
                    doubleClickModeSwitch: !1,
                    isSetCentered: !0
                }),
                    m = '\t\t\t\t<div class="folderCreator" id="folderCreator_' + e.id + '">\t\t\t\t\t<a class="folderSelector" id="folderSelector_' + e.id + '">' + q("folder") + '</a>\t\t\t\t\t<div class="folderNameTxt">\u8bf7\u8f93\u5165\u6587\u4ef6\u5939\u540d\u79f0\uff1a</div>\t\t\t\t\t<div class="folderInput"><input class="folderName" id="folderName_' + e.id + '"></input></div>\t\t\t\t\t<div class="folderNameError" id="folderNameError_' + e.id + '"></div>\t\t\t\t</div>\t\t\t';
                l.setHtml(m);
                g.container = c.id("folderCreator_" + e.id);
                g.selector = c.id("folderSelector_" + e.id);
                g.folderName = c.id("folderName_" + e.id);
                g.folderNameError = c.id("folderNameError_" + e.id);
                m = '\t\t\t\t<div class="fcDropdown_title" id="fcDropdown_title_' + e.id + '">\u56fe\u6807</div>\t\t\t\t<div class="fcDropdown_body" id ="fcDropdown_body_' + e.id + '">\t\t\t\t\t<a class="fcDropdown_item" title="\u9ed8\u8ba4">' + q("folder") + '</a>\t\t\t\t\t<a class="fcDropdown_item" title="\u8054\u7cfb\u4eba">' + q("contact") + '</a>\t\t\t\t\t<a class="fcDropdown_item" title="\u6587\u672c">' + q("doc") + '</a>\t\t\t\t\t<a class="fcDropdown_item" title="\u6e38\u620f">' + q("game") + '</a>\t\t\t\t\t<a class="fcDropdown_item" title="\u751f\u6d3b">' + q("life") + '</a>\t\t\t\t\t<a class="fcDropdown_item" title="\u97f3\u4e50">' + q("music") + '</a>\t\t\t\t\t<a class="fcDropdown_item" title="\u5de5\u5177">' + q("tool") + '</a>\t\t\t\t\t<a class="fcDropdown_item" title="\u89c6\u9891">' + q("video") + "</a>\t\t\t\t</div>\t\t\t";
                g.dropdown = c.node("div", {
                    id: "fcDropdown_" + e.id,
                    "class": "folderCreatorDropdown"
                });
                g.dropdown.innerHTML = m;
                document.body.appendChild(g.dropdown);
                g.dropdownTitle = c.id("fcDropdown_title_" + e.id);
                g.dropdownBody = c.id("fcDropdown_body_" + e.id);
                g.folderType = c.id("folderType_" + e.id);
                g.folderSelector = c.id("folderSelector_" + e.id);
                c.hide(g.dropdown);
                g.dropdownPanel = new b.ui.PopupBox({
                    noCatchMouseUp: !0,
                    container: g.dropdown
                });
                g.folderName.value = alloy.fileSystem.getDefaultFolderName();
                g.folderName.select();
                var o = {
                    onClick: function (b) {
                        b.preventDefault();
                        b.stopPropagation();
                        g.showDropDown()
                    },
                    onKeyDown: function (b) {
                        c.hide(g.folderNameError);
                        b.keyCode == 13 && o.onClickOkButton() && l.close()
                    },
                    onDropdownClick: function (b) {
                        b = b.target.getAttribute("idx");
                        g._selectedCate = b;
                        g.folderSelector.innerHTML = q(b)
                    },
                    onClickOkButton: function () {
                        var b = g.getFolderByName(),
                            a = g.getSelectedCate(),
                            d = alloy.fileSystem.isFileNameAvailable(b, j.FOLDER);
                        if (d != 0) return c.show(g.folderNameError), g.folderNameError.innerHTML = d, !1;
                        e.callback({
                            c: a,
                            n: b
                        });
                        return !0
                    },
                    onDragStart: function () {
                        g.hideDropDown()
                    },
                    onWindowClose: function () {
                        document.body.removeChild(g.dropdown)
                    }
                };
                d.on(g.selector, "click", o.onClick);
                d.on(g.folderName, "keydown", o.onKeyDown);
                d.on(g.dropdownBody, "click", o.onDropdownClick);
                d.addObserver(l, "clickOkButton", o.onClickOkButton);
                d.addObserver(l, "dragStart", o.onDragStart);
                d.addObserver(l, "close", o.onWindowClose);
                this._selectedCate = "folder"
            },
            getSelectedCate: function () {
                return this._selectedCate
            },
            getFolderByName: function () {
                return this.folderName.value
            },
            showDropDown: function () {
                var b = c.getXY(this.selector);
                this.dropdownPanel.show();
                var d = alloy.layout.themeManager.getCurrentSkin().currentWindow.ie6WindowCenterBackground || "##B6EAFD";
                c.setStyle(this.dropdownTitle, "backgroundColor", d);
                c.setStyle(this.dropdown, "zIndex", alloy.layout.getTopZIndex(1));
                c.setXY(this.dropdown, b[0] + "px", b[1] + 57 + "px")
            },
            hideDropDown: function () {
                this.dropdownPanel.hide()
            },
            destroy: function () {}
        })
});