function Dock(oEle, iDirection, oDistance, fnOnBrowserChecked, fnOnResizeOrScroll) {
        var bIsIe6 = false;
        var obj = this;
        this.__oEle__ = oEle;
        this.__iDir__ = iDirection;
        this.__oDis__ = oDistance;
        this.fnOnResizeOrScroll = fnOnResizeOrScroll;
        if ( - 1 != window.navigator.userAgent.indexOf('MSIE 6.0')) {
                if ( - 1 != window.navigator.userAgent.indexOf('MSIE 7.0') || -1 != window.navigator.userAgent.indexOf('MSIE 8.0')) {
                        bIsIe6 = false
                } else {
                        bIsIe6 = true
                }
        } else {
                bIsIe6 = false
        }
        this.bIsIe6 = bIsIe6;
        if (fnOnBrowserChecked) {
                fnOnBrowserChecked(bIsIe6)
        }
        if (bIsIe6) {
                oEle.style.position = 'absolute'
        } else {
                oEle.style.position = 'fixed'
        }
        if (bIsIe6) {
                miaovAppendEventListener(window, "scroll", function() { obj.fixItem() })
        }
        miaovAppendEventListener(window, "resize", function() { obj.fixItem() });
        this.fixItem()
}
Dock.prototype.getScreen = function() {
        var t = document.body.scrollTop || document.documentElement.scrollTop;
        return {
                left: 0,
                right: document.documentElement.clientWidth,
                top: t,
                bottom: t + document.documentElement.clientHeight
        }
};
Dock.prototype.move = function(oDistance) {
        this.__oDis__ = oDistance;
        this.fixItem()
};
Dock.prototype.fixItem = function() {
        var t = document.body.scrollTop || document.documentElement.scrollTop;
        if (this.__iDir__ & DockType.LEFT) {
                this.__oEle__.style.left = this.__oDis__.left + 'px'
        } else if (this.__iDir__ & DockType.RIGHT) {
                this.__oEle__.style.left = document.documentElement.clientWidth - this.__oDis__.right - this.__oEle__.offsetWidth + 'px'
        } else if (this.__iDir__ & DockType.BOTTOM) {
                if (this.bIsIe6) {
                        this.__oEle__.style.top = t + document.documentElement.clientHeight - this.__oDis__.bottom - this.__oEle__.offsetHeight
                } else {
                        this.__oEle__.style.top = document.documentElement.clientHeight - this.__oDis__.bottom - this.__oEle__.offsetHeight
                }
        } else if (this.__iDir__ & DockType.TOP) {
                if (this.bIsIe6) {
                        this.__oEle__.style.top = t + this.__oDis__.top + 'px'
                } else {
                        this.__oEle__.style.top = this.__oDis__.top + 'px'
                }
        }
        if (this.fnOnResizeOrScroll) {
                this.fnOnResizeOrScroll({
                        left: 0,
                        right: document.documentElement.clientWidth,
                        top: t,
                        bottom: t + document.documentElement.clientHeight
                })
        }
};