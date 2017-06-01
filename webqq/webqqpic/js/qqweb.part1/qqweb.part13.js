Jx().$package("alloy.desktopFile", function (b) {
    var d = {
        onFileCreateSuccess: function () {}
    };
    this.init = function () {};
    this.createFile = function (c, e) {
        if (alloy.system.getLoginLevel() > 1) {
            var g = c.folderId,
                j = alloy.storage.getDefaultDisk().key;
            alloy.storage.getFreeSpaceById(j) < c.fileSize ? alloy.storage.storageFullAlert(j) : (g == -1 && (g = alloy.desktopManager.getCurrentDesktopIndex()), alloy.fileSystem.createFile({
                t: alloy.fileSystem.FILE_TYPE.FILE,
                n: c.fileName,
                size: c.fileSize,
                md5: "",
                sha: "",
                s: j
            }, g, null, b.bind(function (b) {
                d.onFileCreateSuccess(b);
                alloy.storage.useSpace(b.s, b.size);
                e && e(b)
            }, this)))
        } else alloy.layout.showLoginWindow("")
    };
    this.deleteFile = function (b) {
        alloy.fileSystem.deleteFile(b, null, null, !1, !0);
        alloy.storage.releaseSpace(b.s, b.size)
    }
});