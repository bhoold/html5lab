Jx().$package("alloy.storage.rpcService", function (b) {
    var d = {
        onRequestError: function () {},
        onRequestTimeout: function () {}
    },
        c = function (c) {
            if (alloy.portal.getLoginLevel() != alloy.CONST.LOGIN_LEVEL_NONE) {
                var c = c || {},
                    g = c.data || {};
                g.vfwebqq = alloy.portal.getVfWebQQ();
                for (var j in g) if (b.isObject(g[j]) || b.isArray(g[j])) g[j] = b.json.stringify(g[j]);
                c.data = g;
                c.method = c.method || "GET";
                c.onError = c.onError || d.onRequestError;
                c.onTimeout = c.onTimeout || d.onRequestTimeout;
                alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL + "cloud/cs/" + c.action, c)
            }
        };
    this.copyFile = function (b) {
        b.action = "copy_file";
        b.method = "POST";
        c(b)
    };
    this.fileMove = function (b) {
        b.action = "file_move";
        b.method = "POST";
        c(b)
    };
    this.createUser = function (b) {
        b.action = "create_user";
        b.method = "POST";
        c(b)
    };
    this.fileRename = function (b) {
        b.action = "file_rename";
        b.method = "POST";
        c(b)
    };
    this.createDir = function (b) {
        b.action = "create_dir";
        b.method = "POST";
        c(b)
    };
    this.fileContUpload = function () {};
    this.queryUser = function (b) {
        b.action = "query_user";
        b.method = "POST";
        c(b)
    };
    this.fileRemove = function (b) {
        b.action = "file_remove";
        b.method = "POST";
        c(b)
    };
    this.queryFile = function () {};
    this.fileUpload = function (b) {
        b.action = "file_upload";
        b.method = "POST";
        c(b)
    };
    this.fileDownload = function (b) {
        b.action = "file_download";
        c(b)
    };
    this.updateFileLength = function () {};
    this.getHomeKey = function () {};
    this.queryDir = function (b) {
        b.action = "query_dir";
        b.method = "POST";
        c(b)
    }
});