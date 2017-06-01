Jx().$package(function (d) {
    var b = d.dom;
    d.ui.Marquee = new d.Class({
        init: function (b) {
            var d = this;
            this.speed = b.speed || 40;
            this.stopTime = b.stopTime || 3E3;
            this.lineHeight = b.lineHeight || 20;
            this.target = b.target;
            this.intervaler = this.lineTimer = this.timer = null;
            this.scrollHeight = this.lineHeight;
            this.isStop = !1;
            this._onTimeRun = function () {
                d.scrollOneLine()
            }
        },
        scrollOneLine: function () {
            if (this.scrollHeight > 0) {
                this.scrollHeight--;
                var b = this.target.style.top.match(/-?\d+/),
                    b = !b ? 0 : parseInt(b[0]);
                this.target.style.top = --b + "px";
                this.lineTimer = setTimeout(this._onTimeRun, this.speed)
            } else this.isStop || this.update()
        },
        stop: function () {
            this.timer && clearTimeout(this.timer)
        },
        stopAll: function () {
            this.stop();
            this.lineTimer && clearTimeout(this.lineTimer)
        },
        reset: function () {
            this.target.style.top = "0px"
        },
        update: function () {
            if (!this.isStop) {
                this.timer && clearTimeout(this.timer);
                this.scrollHeight = this.lineHeight;
                var d = this.target.style.top.match(/\d+/),
                    j = b.getScrollHeight(this.target);
                if (d && j && (d = parseInt(d[0]), d >= j)) {
                    this.target.style.top = this.lineHeight + "px";
                    this.scrollOneLine();
                    return
                }
                this.timer = setTimeout(this._onTimeRun, this.stopTime)
            }
        },
        walkOnLastLine: function () {
            this._onTimeRun()
        }
    })
});
