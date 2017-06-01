Jet().$package(function (d) {
    var b = d.dom,
        i = d.event;
    d.ui.DivSelect = new d.Class({
        init: function (d, a, e, h, g, f) {
            this._selectName = a;
            this._dataObj = e;
            this._selOption = h;
            this._isUpper = f || !1;
            e = e.data;
            d = document.getElementById(d);
            if (!d || typeof d === "undefined") return !1;
            f = document.createElement("div");
            isNaN(g) || g == "" ? g = 150 : g < 26 && (g = 26);
            f.style.width = g;
            var n = "";
            if (this._isUpper) {
                f.style.position = "relative";
                var k = 15 * e.length,
                    n = "top:-" + ((k > 150 ? 150 : k) + 4) + "px;"
            }
            k = "";
            if (e.length > 0) {
                k += "<input type='hidden' name='" + a + "' id='" + a + "' value='" + this.relv(h, e) + "'>";
                k += "<div id='_a_" + a + "' style='width:" + g + "px;height:18px; border:1px #728EA4 solid;'>";
                k += "<div id='_v_" + a + "' style='position:relative;float:left;left:2px;width:" + (g - 22) + "px;height:18px;font-size:12px;overflow:hidden;line-height:18px;'>" + this.reStr(e, h) + "</div>";
                k += "<div id='_arr_" + a + "' class='divSelect_arr' style='position:relative;float:right;right:0px;width:18px;height:18px;text-align:center;font-family:Webdings;font-size:16px;overflow:hidden;background-color:#FFF;cursor:pointer!important;cursor:hand;'></div>";
                k += "</div>";
                k += "<div id='_b_" + a + "' style='position:absolute; background-color:#FFFFFF; width:" + g + "px; height:" + this.height(e.length) + "px;border:1px #728EA4 solid;overflow-x:hidden;overflow-y:auto;display:none; z-index:99999;" + n + "'>";
                for (g = 0; g < e.length; g++) n = e[g][0] == h ? this.style(2) : this.style(1), k += "<div id='_s_" + a + g + "' style='" + n + "' >" + e[g][1] + "</div>";
                k += "</div>"
            } else k += "<input type='hidden' name='" + a + "' id='" + a + "' value='" + h + "'>", k += "<div id='_a_" + a + "' style='width:" + g + "px;height:18px; border:1px #728EA4 solid;'>", k += "<div id='_v_" + a + "' style='position:relative;float:left;left:2px;width:" + (g - 22) + "px;height:18px;font-size:12px;overflow:hidden;line-height:18px;'></div>", k += "<div id='_arr_" + a + "' class='divSelect_arr' style='position:relative;float:right;right:0px;width:18px;height:18px;text-align:center;font-family:Webdings;font-size:16px;overflow:hidden;background-color:#FFF;cursor:pointer!important;cursor:hand;'></div>", k += "</div>", k += "<div id='_b_" + a + "' style='position:absolute; background-color:#FFFFFF; width:" + g + "px; height:" + this.height(0) + "px;border:1px #728EA4 solid;overflow-x:hidden;overflow-y:auto;display:none; z-index:99999;'></div>";
            f.innerHTML = k;
            d.appendChild(f);
            var p = this,
                h = function () {
                    p.showOptions()
                };
            i.on(b.id("_v_" + a), "click", h);
            i.on(b.id("_arr_" + a), "click", h);
            if (e.length > 0) {
                h = function () {
                    p.css(this, 3)
                };
                d = function () {
                    p.css(this, 1)
                };
                f = function () {
                    p.selected(this)
                };
                for (g = 0; g < e.length; g++) i.on(b.id("_s_" + a + g), "mouseover", h), i.on(b.id("_s_" + a + g), "mouseout", d), i.on(b.id("_s_" + a + g), "click", f)
            }
        },
        value: function (b) {
            b = b || this._selectName;
            return document.getElementById(b).value
        },
        text: function (b) {
            b = b || this._selectName;
            return document.getElementById("_v_" + b).innerHTML
        },
        selected: function (d) {
            for (var a = this._dataObj.data, e = d.innerHTML, h = 0; h < a.length; h++) {
                if (a[h][1] === e) b.id(this._selectName).value = a[h][0];
                b.id("_s_" + this._selectName + h).style.cssText = this.style(1)
            }
            b.id("_v_" + this._selectName).innerHTML = e;
            d.style.cssText = this.style(2);
            this.hidden();
            i.notifyObservers(this, "selectedChanged")
        },
        relv: function (b, a) {
            for (var d = 0; d < a.length; d++) if (a[d][0] == b) return b;
            if (b == null || b == "") return a[0][0]
        },
        reStr: function (b, a) {
            for (var d = 0; d < b.length; d++) if (b[d][0] == a) return b[d][1];
            if (a == null || a == "") return b[0][1]
        },
        height: function (b) {
            b = b > 10 || b < 1 ? 150 : b * 15;
            b += 2;
            return b
        },
        showOptions: function (b) {
            b = b || this._selectName;
            b = document.getElementById("_b_" + b);
            b.style.display = b.style.display == "none" ? "" : "none"
        },
        hidden: function () {
            document.getElementById("_b_" + this._selectName).style.display = "none"
        },
        style: function (b) {
            var a = "";
            switch (b) {
            case 1:
                a = "height:15px; font-size:12px; line-height:15px; overflow:hidden; background-color:#FFFFFF; color:#000000; font-weight:normal;";
                break;
            case 2:
                a = "height:15px; font-size:12px; line-height:15px; overflow:hidden; background-color:#315DAD; color:#FFFFFF; font-weight:bold;";
                break;
            case 3:
                a = "height:15px; font-size:12px; line-height:15px; overflow:hidden; background-color:#D8D8D8; color:#000000; font-weight:normal;"
            }
            return a
        },
        css: function (d, a) {
            if (b.id("_v_" + this._selectName).innerHTML != d.innerHTML) d.style.cssText = this.style(a)
        }
    })
});