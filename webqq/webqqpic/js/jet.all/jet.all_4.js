Jx().$package(function (d) {
    var b, i, j, a, e, h, g, f, n, k, p, o, c, m, r, v, x = null, t, u, l, y;
    d.dom = d.dom || {};
    b = d.dom;
    i = d.browser;
    j = b.win ? b.win.contentWindow : b.win || window;
    b.win = j;
    b.doc = j.document;
    var z = document && Object.prototype.hasOwnProperty.call(document.documentElement, "classList");
    u = function () {
        return l ? l : l = document.compatMode === "CSS1Compat" ? document.documentElement : document.body
    };
    v = function (c) {
        c ? (c = c || window.document, x = c.nodeType === 9 ? c : c.ownerDocument || b.doc) : x || (c = c || window.document, x = c.nodeType === 9 ? c : c.ownerDocument || b.doc);
        return x
    };
    t = function (c) {
        var a = v(c);
        return c.document ? c : a.defaultView || a.parentWindow || b.win
    };
    j = function (c, a) {
        a = a || v();
        return a.getElementsByTagName(c)
    };
    p = function (c) {
        return (c ? c.scrollLeft : Math.max(document.documentElement.scrollLeft, document.body.scrollLeft)) || 0
    };
    o = function (c) {
        return (c ? c.scrollTop : Math.max(document.documentElement.scrollTop, document.body.scrollTop)) || 0
    };
    a = function () {
        return z ?
        function (c, a) {
            return !c || !a ? !1 : c.classList.contains(a)
        } : function (c, a) {
            return !c || !a ? !1 : -1 < (" " + c.className + " ").indexOf(" " + a + " ")
        }
    }();
    e = function () {
        return z ?
        function (c, b) {
            c && b && !a(c, b) && c.classList.add(b)
        } : function (c, b) {
            c && b && !a(c, b) && (c.className += " " + b)
        }
    }();
    h = function () {
        return z ?
        function (c, b) {
            c && b && a(c, b) && c.classList.remove(b)
        } : function (c, b) {
            if (c && b && a(c, b)) c.className = c.className.replace(RegExp("(?:^|\\s)" + b + "(?:\\s|$)"), " ")
        }
    }();
    g = function () {
        return z ?
        function (c, a) {
            c && a && c.classList.toggle(a)
        } : function (c, b) {
            c && b && (a(c, b) ? h(c, b) : e(c, b))
        }
    }();
    f = function (c, a, b) {
        if (c) {
            var m = d.browser.name;
            if (a === "float" || a === "cssFloat") a = m === "ie" ? "styleFloat" : "cssFloat";
            if (a === "opacity" && m === "ie" && d.browser.ie < 9) {
                if (c.style.filter = 'alpha(opacity="' + b * 100 + '")', !c.style.zoom) c.style.zoom = 1
            } else c.style[a] = b
        }
    };
    n = function (c, a) {
        if (c) {
            var b = t(c),
                m = d.browser.name;
            if (a === "float" || a === "cssFloat") a = m === "ie" ? "styleFloat" : "cssFloat";
            if (a === "opacity" && m === "ie" && d.browser.ie < 9) return b = 1, (m = c.style.filter.match(/opacity=(\d+)/)) && m[1] && (b = m[1] / 100), b;
            if (c.style[a]) return c.style[a];
            else if (c.currentStyle) return c.currentStyle[a];
            else if (b.getComputedStyle) return b.getComputedStyle(c, null)[a];
            else if (document.defaultView && document.defaultView.getComputedStyle) return a = a.replace(/([/A-Z])/g, "-$1"), a = a.toLowerCase(), (b = document.defaultView.getComputedStyle(c, "")) && b.getPropertyValue(a)
        }
    };
    k = function (c, a) { c.style.cssText = a };
    c = function (c) {
        var a = 0, b = 0;
        if (c)
			if (document.documentElement.getBoundingClientRect && c.getBoundingClientRect) {
				b = {
					left: 0,
					top: 0,
					right: 0,
					bottom: 0
				};
				try {b = c.getBoundingClientRect()} catch (m) {return [0, 0]}
				var c = c.ownerDocument,
					e = d.browser.ie ? 2 : 0,
					a = b.top - e + o(c),
					b = b.left - e + p(c)
			} else for (; c.offsetParent;) a += c.offsetTop, b += c.offsetLeft, c = c.offsetParent;
        return [b, a]
    };
    m = function (a) {
        a = c(a);
        a[0] += p();
        a[1] += o();
        return a
    };
    r = function (c, a, b) {
        var m = parseInt(n(c, "marginLeft")) || 0, d = parseInt(n(c, "marginTop")) || 0;
        f(c, "left", parseInt(a) - m + "px");
        f(c, "top", parseInt(b) - d + "px")
    };
    for (var B = function (c) {
            return !c || c == "auto" ? 0 : parseInt(c.substr(0, c.length - 2))
        }, w = j("script"), q = 0; q < w.length; q++) if (w[q].getAttribute("hasJx") == "true") d.src = w[q].src;
    if (!d.src) d.src = w[w.length - 1].src;
    d.filename = d.src.replace(/(.*\/){0,}([^\\]+).*/ig, "$2");
    d.path = d.src.split(d.filename)[0];
    b.getDoc = v;
    b.id = function (c, a) {
        return v(a).getElementById(c)
    };
    b.name = function (c, a) {
        return v(a).getElementsByName(c)
    };
    b.tagName = j;
    b.getText = function (c) {
        var a = c ? c[TEXT_CONTENT] : "";
        a === UNDEFINED && INNER_TEXT in c && (a = c[INNER_TEXT]);
        return a || ""
    };
    b.getAttributeByParent = function (c, a, b) {
        var m = !1,
            e;
        do e = a.getAttribute(c), d.isUndefined(e) || d.isNull(e) ? a === b ? m = !0 : a = a.parentNode : m = !0;
        while (!m);
        return e
    };
    b.node = function (c, a) {
        var b, m = document.createElement(c),
            d = {
                "class": function () {
                    m.className = a["class"]
                },
                style: function () {
                    k(m, a.style)
                }
            };
        for (b in a) if (d[b]) d[b]();
        else m.setAttribute(b, a[b]);
        return m
    };
    b.setClass = function (c, a) {
        c.className = a
    };
    b.getClass = function (c) {
        return c.className
    };
    b.hasClass = a;
    b.addClass = e;
    b.removeClass = h;
    b.toggleClass = g;
    b.replaceClass = function (c, a, b) {
        h(c, a);
        e(c, b)
    };
    b.createStyleNode = function (c, a) {
        var m = b.node("style", {
            id: a || "",
            type: "text/css"
        });
        if (m.styleSheet) m.styleSheet.cssText = c;
        else {
            var d = document.createTextNode(c);
            m.appendChild(d)
        }
        b.getDocHead().appendChild(m);
        return m
    };
    b.setStyle = f;
    b.getStyle = n;
    b.setCssText = k;
    b.getCssText = function (c) {
        return c.style.cssText
    };
    b.addCssText = function (c, a) {
        c.style.cssText += ";" + a
    };
    b.show = function (c, a) {
        var b;
        b = (b = c.getAttribute("_oldDisplay")) ? b : n(c, "display");
        a ? f(c, "display", a) : b === "none" ? f(c, "display", "block") : f(c, "display", b)
    };
    b.isShow = function (c) {
        return n(c, "display") === "none" ? !1 : !0
    };
    b.recover = function (c) {
        var a;
        a = (a = c.getAttribute("_oldDisplay")) ? a : n(c, "display");
        a === "none" ? f(c, "display", "") : f(c, "display", a)
    };
    b.hide = function (c) {
        var a = n(c, "display");
        c.getAttribute("_oldDisplay") || (a === "none" ? c.setAttribute("_oldDisplay", "") : c.setAttribute("_oldDisplay", a));
        f(c, "display", "none")
    };
    b.getScrollLeft = p;
    b.getScrollTop = o;
    b.getScrollHeight = function (c) {
        return (c ? c.scrollHeight : Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)) || 0
    };
    b.getScrollWidth = function (c) {
        return (c ? c.scrollWidth : Math.max(document.documentElement.scrollWidth, document.body.scrollWidth)) || 0
    };
    b.getClientHeight = function (c) {
        c = c || u();
        return c.clientHeight
    };
    b.getClientWidth = function (c) {
        c = c || u();
        return c.clientWidth
    };
    b.getOffsetHeight = function (c) {
        c = c || u();
        return c.offsetHeight
    };
    b.getOffsetWidth = function (c) {
        c = c || u();
        return c.offsetWidth
    };
    b.getClientXY = c;
    b.setClientXY = function (c, a, b) {
        a = parseInt(a) + p();
        b = parseInt(b) + o();
        r(c, a, b)
    };
    b.getXY = m;
    b.setXY = r;
    b.getRelativeXY = function (c, a) {
        var b = m(c),
            d = m(a),
            e = [];
        e[0] = b[0] - d[0];
        e[1] = b[1] - d[1];
        return e
    };
    b.getPosX = function (c) {
        return B(b.getStyle(c, "left"))
    };
    b.getPosY = function (c) {
        return B(b.getStyle(c, "top"))
    };
    b.getWidth = function (c) {
        return B(b.getStyle(c, "width"))
    };
    b.getHeight = function (c) {
        return B(b.getStyle(c, "height"))
    };
    b.getSelection = void 0;
    b.getSelectionText = function (c) {
        var c = c || window,
            a = c.document;
        if (c.getSelection) return c.getSelection().toString();
        else if (a.getSelection) return a.getSelection();
        else if (a.selection) return a.selection.createRange().text
    };
    b.getTextFieldSelection = function (c) {
        return c.selectionStart != void 0 && c.selectionEnd != void 0 ? c.value.substring(c.selectionStart, c.selectionEnd) : ""
    };
    b.getDocumentElement = u;
    b.getDocHead = function () {
        if (!y) {
            var c = v();
            y = c.getElementsByTagName("head") ? c.getElementsByTagName("head")[0] : c.documentElement
        }
        return y
    };
    b.contains = function (c, a, b) {
        if (!b && c === a) return !1;
        if (c.compareDocumentPosition) {
            if (c = c.compareDocumentPosition(a), c == 20 || c == 0) return !0
        } else if (c.contains(a)) return !0;
        return !1
    };
    b.getHref = function (c) {
        return (i.ie && i.ie <= 7 ? c.getAttribute("href", 4) : c.href) || null
    }
});