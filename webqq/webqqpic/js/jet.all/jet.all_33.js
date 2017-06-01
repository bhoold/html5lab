
Jet().$package(function (d) {
    var b = d.dom,
        i = d.event;
    d.ui.TextBox = new d.Class({
        init: function (j) {
            var a = "share_box_" + (j.id || (new Date).getTime()),
                e = j.name || a,
                h = j.container || document.body,
                g = j.className || "",
                f = j.text || "";
            this._titleHeight = 22;
            this._footerHeight = 26;
            this._margin = this._padding = 8;
            j.width = j.width || 200;
            j.height = j.height || 100;
            j.limit = j.limit || 0;
            j.isPopup = j.isPopup || !1;
            j.readOnly = j.readOnly || !1;
            j.maskIframe = j.maskIframe || !1;
            j.hasCloseButton = j.hasCloseButton === !1 ? !1 : !0;
            this._isShow = !1;
            var g = this._el = b.node("div", {
                id: a,
                "class": "share_box " + g
            }),
                n = '            \t<div class="share_box_title" id="' + a + '_title">            \t\t<div class="share_box_titleTxt" id="' + a + '_titleTxt"></div>            \t</div>            \t<div class="share_box_body" id="' + a + '_body">            \t\t<\!--textarea class="share_box_text" id="' + a + '_text"></textarea--\>            \t</div>           \t\t<div class="share_box_footer" id="' + a + '_footer">           \t\t\t<div class="share_box_showthumb" id="' + a + '_showthumb"></div>           \t\t\t<div class="share_box_hint" id="' + a + '_hint"></div>           \t\t\t<div class="share_box_count" id="' + a + '_count"></div>           \t\t</div>           \t\t<div>           \t\t\t<img id="' + a + '_thumb" class="share_box_thumb" src="' + j.thumb + '" width=211 height=127 />           \t\t</div>';
            j.maskIframe && (n += '<iframe class="ui_maskBgIframe" src="' + alloy.CONST.MAIN_URL + 'domain.html;" border="0"></iframe>');
            g.innerHTML = n;
            h.appendChild(g);
            this._panel = j.isPopup ? new d.ui.PopupBox({
                id: a,
                name: e,
                container: g
            }) : new d.ui.Panel({
                id: a,
                name: e,
                container: g
            });
            this._shareBoxTitleTxt = b.id(a + "_titleTxt");
            this._shareBoxTitle = b.id(a + "_title");
            this._shareBoxHint = b.id(a + "_hint");
            this._shareBoxFooter = b.id(a + "_footer");
            this._shareBoxBody = b.id(a + "_body");
            this._shareBoxCount = b.id(a + "_count");
            this._shareBoxShowthumb = b.id(a + "_showthumb");
            this._shareBoxThumb = b.id(a + "_thumb");
            e = '<strong class="share_big_quote share_left_quote">\u201c</strong><textarea class="share_box_text" id="' + a + '_text"></textarea><strong class="share_big_quote share_right_quote">\u201d</strong>';
            j.readOnly && (e = '<strong class="share_big_quote share_left_quote">\u201c</strong><textarea class="share_box_text" id="' + a + '_text" readOnly="readonly"></textarea><strong class="share_big_quote share_right_quote">\u201d</strong>');
            j.thumb || b.hide(this._shareBoxShowthumb);
            this._shareBoxBody.innerHTML = e;
            this._shareBoxText = b.id(a + "_text");
            var k = this,
                a = {
                    onSendButtonClick: function (a) {
                        a.preventDefault();
                        a.stopPropagation();
                        i.notifyObservers(k, "clickSendButton")
                    },
                    onCloseButtonClick: function (a) {
                        a.preventDefault();
                        a.stopPropagation();
                        k.hide();
                        i.notifyObservers(k, "clickCloseButton")
                    },
                    onTextAreaKeyUp: function (a) {
                        a.stopPropagation();
                        a.preventDefault();
                        alloy.util.subStringByChar(a, j.limit)
                    },
                    toggleThumb: function (a) {
                        a.preventDefault();
                        a.stopPropagation();
                        b.isShow(k._shareBoxThumb) ? b.hide(k._shareBoxThumb) : b.show(k._shareBoxThumb)
                    }
                };
            this._sendButton = new d.ui.Button({
                appendTo: this._shareBoxFooter,
                className: "window_button window_ok",
                isStopPropagation: !0,
                text: "\u53d1\u8868",
                event: {
                    click: a.onSendButtonClick
                }
            });
            this._sendButton.show();
            if (j.hasCloseButton) this._closeButton = new d.ui.Button({
                appendTo: this._shareBoxTitle,
                className: "textbox_button",
                isStopPropagation: !0,
                title: "\u5173\u95ed",
                event: {
                    click: a.onCloseButtonClick
                }
            }), this._closeButton.show();
            this._shareBoxText.innerHTML = f;
            if (j.title) this._shareBoxTitleTxt.innerHTML = j.title, b.show(this._shareBoxTitle);
            if (j.hint) {
                f = null;
                for (e = 0; e < j.hint.length; e++) f = b.node("a", {
                    href: "###",
                    "class": "share_box_hintLink"
                }), f.innerHTML = j.hint[e].text, i.on(f, "click", j.hint[e].click), this._shareBoxHint.appendChild(f)
            }
            if (j.limit) i.on(this._shareBoxText, "keyup", a.onTextAreaKeyUp);
            i.on(this._shareBoxShowthumb, "click", a.toggleThumb);
            this.setHeight(j.height);
            this.setWidth(j.width)
        },
        setHeight: function (d) {
            b.setStyle(this._shareBoxText, "height", d - this._titleHeight - this._footerHeight + "px")
        },
        setWidth: function (d) {
            b.setStyle(this._el, "width", d + "px");
            b.setStyle(this._shareBoxText, "width", d - this._padding - this._margin + "px")
        },
        addMask: function (i) {
            if (d.browser.ie) if (d.isString(i)) {
                var a = '<iframe class="ui_maskBgIframe" src="' + alloy.CONST.MAIN_URL + 'domain.html"></iframe>';
                return i + a
            } else a = b.node("iframe", {
                "class": "ui_maskBgIframe",
                src: alloy.CONST.MAIN_URL + "domain.html"
            }), i.appendChild(a)
        },
        getElement: function () {
            return this._el
        },
        isShow: function () {
            return this._isShow
        },
        show: function (b, a) {
            b && a && this._panel.setXY(b, a);
            this._panel.show();
            this._isShow = !0
        },
        hide: function () {
            this._panel.hide();
            this._isShow = !1;
            i.notifyObservers(this, "hide")
        },
        getValue: function () {
            return this._shareBoxText.value
        },
        setValue: function (b) {
            this._shareBoxText.value = b
        },
        setHint: function (d) {
            this._shareBoxHint.innerHTML = "";
            this._shareBoxHint.appendChild(d);
            b.show(this._shareBoxHint)
        },
        setThumb: function (b) {
            this._shareBoxThumb.src = b
        }
    })
});