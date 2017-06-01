Jet().$package(function (b) {
    var d = b.dom,
        c = b.event,
        e = 0,
        g = 0,
        j = {},
        l = {},
        q = function (b) {
            b.preventDefault();
            b.stopPropagation()
        },
        u = b.ui.ContextMenu = new b.Class({
            init: function (o) {
                var h = this,
                    a = this.id = "context_menu_" + (o.id || e++),
                    f = o.name || a,
                    n = this._parent = o.container || (o.parentMenu ? o.parentMenu._parent : null) || document.body,
                    s = o.className || "";
                this.parentMenu = o.parentMenu;
                var h = this,
                    w = this._el = d.id(a) || d.node("div", {
                        id: a,
                        "class": "context_menu",
                        style: "display: none;"
                    }),
                    s = '<div class="context_menu_container "' + s + '"><ul id="' + a + '_body" class="context_menu_item_list"></ul></div>';
                b.browser.ie && (s += '<iframe class="context_menu_iframe" src="' + alloy.CONST.MAIN_URL + 'domain.html"></iframe>');
                w.innerHTML = s;
                n.appendChild(w);
                o.width && d.setStyle(w, "width", o.width + "px");
                this._body = d.id(a + "_body");
                c.off(w, "contextmenu");
                c.on(w, "contextmenu", q);
                var g = function () {
                        h.isShow() && h.hide()
                    };
                c.addObserver(document, "beforeStart", g);
                c.addObserver(this, "Beforedestroy", function () {
                    c.removeObserver(document, "beforeStart", g)
                });
                this._popupBox = new b.ui.PopupBox({
                    id: a,
                    name: f,
                    noCatchMouseUp: !0,
                    parentPopupBox: this.parentMenu ? this.parentMenu._popupBox : null,
                    container: w
                });
                c.addObserver(this._popupBox, "hide", function () {
                    h.hideSubmenu();
                    c.notifyObservers(h, "onHide")
                });
                this.setZIndex(9E6);
                this._itemArr = [];
                this._key2Item = {};
                if (o.items) this._items_config = o.items, this.addItems(o.items);
                if (o.triggers) {
                    f = o.triggerEvent || "contextmenu";
                    n = function (a) {
                        a.preventDefault();
                        h.show(a.clientX, a.clientY)
                    };
                    for (w = 0; s = o.triggers[w]; w++) c.on(s, f, n)
                }
                o.beforeShow && c.addObserver(this, "BeforeShow", o.beforeShow);
                j[a] = this;
                o.afterShow && c.addObserver(this, "onShow", o.afterShow)
            },
            getId: function () {
                return this.id
            },
            setClass: function (b) {
                d.setClass(this._el, "context_menu " + b)
            },
            setStyle: function (b, c) {
                d.setStyle(this._el, b, c)
            },
            addItem: function (b) {
                var c = b.type || "item";
                b.parentMenu = this;
                switch (c) {
                case "item":
                    b = new p(b);
                    break;
                case "flash":
                    b = new v(b);
                    break;
                case "separator":
                    b = new x(b);
                    break;
                case "submenu":
                    b.parentMenu = this;
                    b = new m(b);
                    break;
                default:
                    b = null
                }
                b && (this._body.appendChild(b.getElement()), this._itemArr.push(b))
            },
            addItems: function (b) {
                for (var c = 0, a = b.length; c < a; c++) this.addItem(b[c])
            },
            refresh: function () {
                this._items_config && (this.clearItems(), this.addItems(this._items_config))
            },
            clearItems: function () {
                for (var b = this._itemArr.shift(); b;) b.destroy(), b = this._itemArr.shift()
            },
            removeItemAt: function (b) {
                for (var c = 0; c < this._itemArr.length; c++) {
                    var a = this._itemArr[c];
                    b == c && a && (a.destroy(), this._itemArr.splice(c, 1))
                }
            },
            getItemAt: function (b) {
                return b < this._itemArr.length ? (b < 0 && (b = this._itemArr.length + b), this._itemArr[b]) : null
            },
            getElement: function () {
                return this._el
            },
            getBody: function () {
                return this._body
            },
            setZIndex: function (b) {
                this._popupBox.setZIndex(b)
            },
            getZIndex: function () {
                return this._popupBox.getZIndex()
            },
            setArgument: function (b) {
                this._argument = b
            },
            getArgument: function () {
                return this._argument
            },
            show: function (e, h, a, f) {
                c.notifyObservers(this, "BeforeShow", this);
                var e = e || 0,
                    h = h || 0,
                    a = typeof a === "undefined" ? 5 : a,
                    n = this._popupBox,
                    s = e + a,
                    w = h + a,
                    g = 0,
                    y = 0,
                    m = b.browser.ie;
                if (f && (g = d.getOffsetWidth(f), y = d.getOffsetHeight(f), s += g + 5, w -= 1, m == 9 || m == 8)) s += 2;
                n.setX("-10000");
                n.show();
                var f = d.getClientWidth(this._el),
                    j = d.getClientHeight(this._el),
                    H = d.getClientWidth(),
                    r = d.getClientHeight();
                if (s + f > H && e - f - a > 0) if (g) {
                    if (s = e - f - a - 5, m == 9 || m == 8) s += 2
                } else s = e - f - a;
                w + j > r && h - j - a > 0 && (w = y ? h - j - a + y + 1 : h - j - a);
                n.setXY(s, w);
                c.notifyObservers(this, "onShow", this)
            },
            hide: function () {
                this._popupBox.hide();
                c.notifyObservers(this, "onHide", this)
            },
            hideSubmenu: function () {
                for (var b in this._itemArr) this._itemArr[b].getSubmenu && this._itemArr[b].getSubmenu().hide()
            },
            isShow: function () {
                return this._popupBox.isShow()
            },
            destroy: function () {
                c.notifyObservers(this, "Beforedestroy", this);
                this.clearItems();
                c.off(this._el, "contextmenu");
                this._el.innerHTML = "";
                this._el.parentNode.removeChild(this._el);
                for (var b in this) this.hasOwnProperty(b) && delete this[b]
            }
        });
    u.getMenu = function (b) {
        return j[b]
    };
    var p = b.ui.ContextMenuItem = new b.Class({
        init: function (b) {
            var h = {
                title: b.title || b.text || "",
                text: b.text || "",
                link: b.link || "javascript:void(0);",
                icon: b.icon || null,
                enable: typeof b.enable === "undefined" ? !0 : b.enable,
                onClick: b.onClick || null,
                argument: b.argument
            };
            this.option = h;
            this.parentMenu = b.parentMenu;
            b = this._el = d.node("li", {
                "class": "context_menu_item_container"
            });
            this.render();
            h.enable ? this.enable() : this.disable();
            var a = this;
            c.on(b, "click", h.onClick ?
            function (b) {
                b.preventDefault();
                a._isEnable && h.onClick.call(this, b, a, a.parentMenu)
            } : function (a) {
                a.preventDefault()
            })
        },
        setText: function (b, c) {
            this.option.text = b;
            this.option.title = c || b;
            this.render()
        },
        setIcon: function (b) {
            this.option.icon = b;
            this.render()
        },
        render: function () {
            var b = this.option,
                c = '<a class="context_menu_item" href="' + b.link + '" title="' + b.title + '">';
            if (b.icon) {
                var a = b.icon;
                c += '<span class="context_menu_item_icon ' + (a.className || "") + '" style="' + ((a.style || "") + (a.url ? "background-image: url(" + a.url + ");" : "")) + '"></span>'
            }
            c += '<span class="context_menu_item_text">' + b.text + "</span>";
            c += "</a>";
            this._el.innerHTML = c
        },
        getElement: function () {
            return this._el
        },
        show: function () {
            d.show(this._el)
        },
        hide: function () {
            d.hide(this._el)
        },
        disable: function () {
            this._isEnable = !1;
            d.addClass(this._el, "context_menu_item_disable")
        },
        enable: function () {
            this._isEnable = !0;
            d.removeClass(this._el, "context_menu_item_disable")
        },
        destroy: function () {
            c.off(this._el, "click");
            this._el.innerHTML = "";
            this._el.parentNode.removeChild(this._el);
            for (var b in this) this.hasOwnProperty(b) && delete this[b]
        }
    }),
        v = b.ui.FlashContextMenuItem = new b.Class({
            init: function (b) {
                var h = {
                    title: b.title || b.text || "",
                    text: b.text || "",
                    link: b.link || "javascript:void(0);",
                    icon: b.icon || null,
                    enable: typeof b.enable === "undefined" ? !0 : b.enable,
                    onClick: b.onClick || null,
                    folderId: b.folderId || -1,
                    argument: b.argument
                };
                this.option = h;
                this.parentMenu = b.parentMenu;
                var b = this._el = d.node("li", {
                    "class": "context_menu_item_container"
                }),
                    a = this._flashLi = d.node("li", {
                        "class": "context_menu_item_container"
                    }),
                    f = this._itemId = "context_menu_flashItem_" + ++g,
                    f = this._flashUl = d.node("ul", {
                        id: f,
                        "class": "context_menu_item_list context_menu_flashitem_item"
                    });
                l[g] = f;
                f.appendChild(a);
                this.render();
                document.body.appendChild(f);
                h.enable ? this.enable() : this.disable();
                var e = this;
                c.on(b, "click", h.onClick ?
                function (a) {
                    a.preventDefault();
                    e._isEnable && h.onClick.call(this, a, e, e.parentMenu)
                } : function (a) {
                    a.preventDefault()
                });
                e = this;
                b = e.observer = {
                    onShow: function () {
                        var a = d.getClientXY(e._el);
                        d.setXY(e._flashUl, a[0] + 0 + "px", a[1] + 0 + "px");
                        d.setStyle(e._flashUl, "width", d.getClientWidth(e._el) + "px");
                        d.setStyle(e._flashUl, "height", d.getClientHeight(e._el) + "px");
                        d.setStyle(e._flashUl, "zIndex", e.parentMenu.getZIndex() + 1);
                        alloy.portal.getLoginLevel() > 1 && alloy.storage.getDefaultDisk() ? e._flashUploader.showFileSelector() : e._flashUploader.hideFileSelector()
                    },
                    onHide: function () {
                        d.setXY(e._flashUl, 0, 0);
                        d.setStyle(e._flashUl, "width", "1px");
                        d.setStyle(e._flashUl, "height", "1px")
                    }
                };
                c.addObserver(this.parentMenu, "onShow", b.onShow);
                c.addObserver(this.parentMenu, "onHide", b.onHide)
            },
            setText: function () {},
            setIcon: function () {},
            render: function () {
                var b = this.option;
                this._el.innerHTML = '<a class="context_menu_item" href="' + b.link + '"></a>';
                var c = '<a class="context_menu_item" href="' + b.link + '" title="' + b.title + '">';
                if (b.icon) {
                    var a = b.icon;
                    c += '<span class="context_menu_item_icon ' + (a.className || "") + '" style="' + ((a.style || "") + (a.url ? "background-image: url(" + a.url + ");" : "")) + '"></span>'
                }
                c += '<div class="explorer_upload_holder2" style="padding:0 5px"></div>';
                c += "</a>";
                this._flashLi.innerHTML = c;
                b = {
                    callback: "alloy.flashUploadManager.flashEventListener",
                    mode: 0,
                    autoshow: !1,
                    holder: d.mini(".explorer_upload_holder2", this._flashLi)[0],
                    text: '<span class="context_menu_item_text">' + b.text + "</span>",
                    width: "100%",
                    height: "100%",
                    extInfo: '{"folderId":' + this.option.folderId + "}"
                };
                this._flashUploader = new alloy.flashUploadManager.FlashUploader(b);
                d.setXY(this._flashUl, 0, 0);
                d.setStyle(this._flashUl, "width", "1px");
                d.setStyle(this._flashUl, "height", "1px")
            },
            getElement: function () {
                return this._el
            },
            show: function () {
                d.show(this._el)
            },
            hide: function () {
                d.hide(this._el)
            },
            disable: function () {
                this._isEnable = !1;
                d.addClass(this._el, "context_menu_item_disable")
            },
            enable: function () {
                this._isEnable = !0;
                d.removeClass(this._el, "context_menu_item_disable")
            },
            destroy: function () {
                this._el.innerHTML = "";
                this._flashUl.innerHTML = "";
                c.off(this._el, "click");
                c.removeObserver(this.parentMenu, "onShow", this.observer.onShow);
                c.removeObserver(this.parentMenu, "onHide", this.observer.onHide);
                this._el.parentNode.removeChild(this._el);
                this._flashUl.parentNode.removeChild(this._flashUl);
                for (var b in this) this.hasOwnProperty(b) && delete this[b]
            }
        });
    v.getItem = function (b) {
        return l[b]
    };
    var x = b.ui.ContextMenuSeparator = new b.Class({
        init: function () {
            (this._el = d.node("li", {
                "class": "context_menu_separator_container"
            })).innerHTML = '<span class="context_menu_separator"></span>'
        },
        getElement: function () {
            return this._el
        },
        show: function () {
            d.show(this._el)
        },
        hide: function () {
            d.hide(this._el)
        },
        destroy: function () {
            this._el.innerHTML = "";
            this._el.parentNode.removeChild(this._el);
            for (var b in this) this.hasOwnProperty(b) && delete this[b]
        }
    }),
        m = b.ui.ContextSubmenuItem = new b.Class({
            extend: p
        }, {
            init: function (e) {
                if (!e.items) throw Error("J.ui.ContextSubmenuItem: option.items is null!");
                e.title = e.title || e.text || "";
                var h = {
                    title: null,
                    text: "",
                    autoHide: !0,
                    link: "javascript:void(0);",
                    icon: null,
                    enable: !0,
                    subWidth: null,
                    parentMenu: e.parentMenu
                };
                delete e.parentMenu;
                e = this.option = b.extend(h, e);
                this.parentMenu = e.parentMenu;
                var a = this._el = d.node("li", {
                    "class": "context_menu_item_container"
                });
                this.render();
                e.enable ? this.enable() : this.disable();
                this._submenu = new u({
                    parentMenu: e.parentMenu,
                    width: e.subWidth,
                    beforeShow: e.beforeShow,
                    items: e.items
                });
                var f = this,
                    n = f.sunmenuTimer = 0,
                    s = function () {
                        f._submenu.isShow() && f._submenu.hide()
                    },
                    w = {
                        onItemMouseenter: function (a) {
                            a.stopPropagation();
                            f._isEnable && (a = d.getClientXY(this), f._submenu.setZIndex(f.parentMenu.getZIndex()), f._submenu.show(a[0], a[1], 0, this))
                        },
                        onItemMouseleave: function () {
                            n && (window.clearTimeout(n), n = 0);
                            n = window.setTimeout(s, 200)
                        },
                        onSubmenuMouseenter: function () {
                            n && (window.clearTimeout(n), n = 0);
                            d.addClass(a, "context_menu_item_hover")
                        },
                        onSubmenuMouseleave: function (a) {
                            w.onItemMouseleave(a)
                        },
                        onSubmenuShow: function () {
                            d.addClass(a, "context_menu_item_hover")
                        },
                        onSubmenuHide: function () {
                            d.removeClass(a, "context_menu_item_hover")
                        }
                    },
                    h = f._submenu.getElement();
                c.on(a, "mouseenter", w.onItemMouseenter);
                e.autoHide && (c.on(a, "mouseleave", w.onItemMouseleave), c.on(h, "mouseenter", w.onSubmenuMouseenter), c.on(h, "mouseleave", w.onSubmenuMouseleave));
                c.addObserver(f._submenu, "onHide", w.onSubmenuHide);
                c.on(a, "click", e.onClick ?
                function (a) {
                    a.preventDefault();
                    f._isEnable && (e.onClick.call(this, a, f), w.onItemMouseenter.call(this, a))
                } : function (a) {
                    a.preventDefault();
                    w.onItemMouseenter.call(this, a)
                })
            },
            getSubmenu: function () {
                return this._submenu
            },
            render: function () {
                var b = this.option,
                    c = '<a class="context_menu_item" href="' + b.link + '" title="' + b.title + '">';
                if (b.icon) {
                    var a = b.icon;
                    c += '<span class="context_menu_item_icon ' + (a.className || "") + '" style="' + ((a.style || "") + (a.url ? "background-image: url(" + a.url + ");" : "")) + '"></span>'
                }
                c += '<span class="context_menu_item_text">' + b.text + '</span><span class="context_menu_item_subicon"></span></a>';
                this._el.innerHTML = c
            },
            destroy: function () {
                c.off(this._el, "click");
                c.off(this._el, "mouseenter");
                c.off(this._el, "mouseleave");
                this._el.innerHTML = "";
                this._el.parentNode.removeChild(this._el);
                var b = this._submenu.getElement();
                c.off(b, "mouseenter");
                c.off(b, "mouseleave");
                this._submenu.destroy();
                for (var d in this) this.hasOwnProperty(d) && delete this[d]
            }
        })
});
typeof progress == "function" && progress("qqweb.part1.js loaded");