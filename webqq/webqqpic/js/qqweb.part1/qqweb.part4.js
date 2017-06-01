Jx().$package("alloy", function (b) {
    var d = this,
        c = window.location.host+'qq';
    d.CONST = {
        CDN_URL: "http://0.web.qstatic.com/webqqpic/",
        CDN_ROOT: "web.qstatic.com/webqqpic/",
        CDN_URL_0: "http://0.web.qstatic.com/webqqpic/",
        UPDATE_TIME_STAMP: "20120320001",
        MAIN_DOMAIN: document.domain,
        DEFAULT_DOMAIN: "web.qq.com",
        DOMAIN: c,
        MAIN_URL: "http://" + c + "/",
        API_SERVER_URL: "http://s.web2.qq.com/api/",
        CONN_SERVER_DOMAIN: "http://s.web2.qq.com/",
        CONN_SERVER_DOMAIN2: "http://d.web2.qq.com/",
        CGI_BIN_SERVER_URL: "http://web2-b.qq.com/cgi-bin/",
        CGI_BIN_SERVER_URL2: "http://" + c + "/cgi-bin/",
        CGI_BIN_SERVER_URL3: "http://" + c + "/cgi-bin/",
        CGI_BIN_SERVER_URL4: "http://up.web2.qq.com/cgi-bin/",
        JAVA_CGI_URL: window.location,
        PS_CGI_URL: "http://ps.qq.com:8080/",
        JAVA_UP_CGI_URL: "http://up.web2.qq.com/",
        API_PROXY_URL: "http://s.web2.qq.com/proxy.html?v=20110412001",
        JAVA_CGI_PROXY_URL: "http://" + c + "/proxy.html?v=20110412001",
        PS_PROXY_URL: "http://ps.qq.com:8080/proxy.html?v=20110412001",
        JAVA_UP_CGI_PROXY_URL: "http://up.web2.qq.com/proxy.html?v=20110412001",
        PUB_APP_STATIC_URL: "pubapps/",
        PRI_APP_STATIC_URL: "http://wqbg.qpic.cn/appmarket/",
        PRI_APP_STATIC_URL2: "/",
        SYSTEM_FACE_URL: "http://0.web.qstatic.com/webqqpic/style/face/",
        DEFAULT_AVATAR_URL: "http://0.web.qstatic.com/webqqpic/style/heads/",
        AVATAR_SERVER_DOMAIN: "http://qun.qq.com/",
        AVATAR_SERVER_DOMAINS: ["http://face1.qun.qq.com/", "http://face2.qun.qq.com/", "http://face3.qun.qq.com/", "http://face4.qun.qq.com/", "http://face5.qun.qq.com/", "http://face6.qun.qq.com/", "http://face7.qun.qq.com/", "http://face8.qun.qq.com/", "http://face9.qun.qq.com/", "http://face10.qun.qq.com/", "http://face11.qun.qq.com/"],
        QZONE_SERVER_DOMAIN: "http://qzone.qq.com/",
        QZONE_USER_SERVER_DOMAIN: "http://user.qzone.qq.com/",
        QMAIL_SERVER_DOMAIN: "http://mail.qq.com/",
        QQ_GROUP_URL: "http://qun.qq.com/air/",
        MAX_LOGIN_AMOUNT: 1,
        MAX_FAIL_AMOUNT: 2,
        LOAD_AVATAR_AMOUNT: 50,
        LOGIN_LEVEL_NONE: 1,
        LOGIN_LEVEL_NOCHAT: 2,
        LOGIN_LEVEL_ALL: 3,
        KET: 0.1,
        WINDOW_FLAG_MIN: 1,
        WINDOW_FLAG_NORMAL: 2,
        WINDOW_FLAG_MAX: 4,
        WINDOW_FLAG_CURRENT: 8,
        WINDOW_FLAG_NOT_CURRENT: 16,
        WINDOW_FLAG_FULLSCREEN: 32
    };

	document.domain = d.CONST.MAIN_DOMAIN;
	if (d.CONST.CDN_URL.indexOf("static.com") == -1) d.CONST.MAIN_URL = "http://" + c + "/webqqpic/";
	window.onerror = function (c, d, j) {
		try {
			alloy.util.report2h("js_error", "start"), b.error("js\u5f02\u5e38\uff1a[\u63cf\u8ff0]:" + c + ", [Url]\uff1a" + d + ", [\u884c\u53f7]\uff1a" + j + "\r\n", "js_error")
		} catch (l) {}
		return !0
	};
	d.init = function () {
		var c = {};
		b.$namespace("alloy.app");
		if (window.webTop) {
			var g = webTop.ui.channel.postCmd(24, d.portal.getUin() || 0, d.portal.getSecretIp() || 0);
			alloy.rpcService.sendCheckHack({
				key: g,
				onSuccess: function (b) {
					if (!b.retcode && b.result && !b.result.result) {
						var b = b.result.i,
							g = webTop.ui.channel.postCmd(24, d.portal.getUin() || 0, b);
						alloy.portal.setSecretIp(b);
						alloy.portal.setSecretKey(g);
						d.portal.init(c)
					} else top.location = "http://im.qq.com/webqq/"
				}
			})
		} else d.portal.init(c), alloy.rpcService.sendCheckHack({
			key: 0
		});
		pgvSendClick({
			hottag: "web2qq.version." + d.CONST.UPDATE_TIME_STAMP
		})
	};
	d.ajaxProxyCallback = function (b, c) {
		switch (b) {
		case 1:
			alloy.rpcService.onAjaxFrameLoad(c);
			break;
		case 2:
			if (typeof EQQ !== "undefined") EQQ.RPCService.onAjaxFrameLoad(c)
		}
	}
});
var qqweb = alloy,
    $D = Jx().dom,
    $S = Jx().string,
    lockedEl = null,
    lockProxy = null;
padEventProxyFor421 = function (b, d, c) {
    var e = Jet().dom,
        g = document.getElementById(c.substr(1)),
        j = document.getElementById(c.substr(1) + "_proxy"),
        c = {
            mousedown: 1
        };
    g && j && (c[b] ? (d.preventDefault(), lockProxy && (clearTimeout(lockProxy), lockProxy = null), e.hide(j), g && g.tagName == "IFRAME" && g.dispatchEvent(d), lockProxy = setTimeout(function () {
        j && e.show(j)
    }, 1500)) : g.dispatchEvent(d))
};
padEventProxy = function (b, d) {
    var c, e;
    d.initEvent(b, !0, !1);
    d.changedTouches && d.changedTouches.length ? (e = d.changedTouches[0], c = e.pageX, e = e.pageY) : (c = d.clientX, e = d.clientY);
    b == "touchmove" ? e = lockedEl ? lockedEl : lockedEl = document.elementFromPoint(c, e) : lockedEl && (b == "touchend" || b == "touchcancel") ? (e = lockedEl, lockedEl = null) : e = document.elementFromPoint(c, e);
    c = alloy.windowManager.getCurrentWindow();
    if (e.tagName == "IFRAME" && c) {
        c = document.getElementById("iframeApp_" + c.getId());
        var g = !1;
        try {
            g = c && typeof c.contentWindow.padEventProxy == "function" ? !0 : !1
        } catch (j) {}
        if (g) {
            e = c.offsetLeft;
            for (var g = c.offsetTop, l = c; l = l.offsetParent;) e += l.offsetLeft, g += l.offsetTop;
            c.contentWindow.padEventProxy(b, d, {
                offsetX: e,
                offsetY: g
            })
        } else e.dispatchEvent(d)
    } else e.dispatchEvent(d)
};

function ptlogin2_onResize(b, d) {
    alloy.layout.setLoginWindowHeight(d + 66)
}