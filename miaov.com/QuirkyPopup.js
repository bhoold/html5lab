function QuirkyPopup(oEleMove, oEleDrag, oEleBtn, oCloseBtn, oMaxSize, fnGetPos, fnGetSize, fnDoMove, fnDoResize, fnOnShowEnd, fnOnHideEnd) {
        var obj = this;
        var oSize = fnGetSize();
        var oPos = fnGetPos();
        this.__oEleMove__ = oEleMove;
        this.__oEleDrag__ = oEleDrag;
        this.__oEleBtn__ = oEleBtn;
        this.__oMaxSize__ = oMaxSize;
        this.__fnGetPos__ = fnGetPos;
        this.__fnGetSize__ = fnGetSize;
        this.__fnDoMove__ = fnDoMove;
        this.__fnDoResize__ = fnDoResize;
        this.__fnOnShowEnd__ = fnOnShowEnd;
        this.__fnOnHideEnd__ = fnOnHideEnd;
        this.__oDivOuter__ = document.createElement('div');
        this.__oDivOuter__.style.display = 'none';
        this.__oDivOuter__.style.background = 'white';
        this.__oDivOuter__.style.width = '100%';
        this.__oDivOuter__.style.filter = 'alpha(opacity=0)';
        this.__oDivOuter__.style.opacity = '0';
        this.__oDivOuter__.style.top = '0px';
        this.__oDivOuter__.style.left = '0px';
        this.__oDivOuter__.style.position = 'absolute';
        this.__oDivOuter__.style.zIndex = '3003';
        this.__oDivOuter__.style.overflow = 'hidden';
        this.__oDivOuter__.style.height = document.body.offsetHeight + "px";
        document.body.appendChild(this.__oDivOuter__);
        this.__oDrag__ = new PerfectDrag(
			oEleDrag, 
			fnGetPos,
			function(x, y) {
                var top = document.body.scrollTop || document.documentElement.scrollTop;
                if (x < 0) {
                        x = 0
                } else if (x + obj.__oMaxSize__.x > document.body.offsetWidth) {
                        x = document.body.offsetWidth - obj.__oMaxSize__.x
                }
                if (y < top) {
                        y = top
                } else if (y + obj.__oMaxSize__.y > top + document.documentElement.clientHeight) {
                        y = top + document.documentElement.clientHeight - obj.__oMaxSize__.y
                }
                oEleMove.style.left = x + 'px';
                oEleMove.style.top = y + 'px';
                obj.__oSpeed__.x = x - obj.__oLastPos__.x;
                obj.__oSpeed__.y = y - obj.__oLastPos__.y;
                obj.__oLastPos__.x = x;
                obj.__oLastPos__.y = y
			},
			function() {
                obj.__oLastPos__ = obj.__fnGetPos__();
                obj.stopMove();
                obj.__oDivOuter__.style.display = 'block'
            },
			function() {
                obj.startMove();
                obj.__oDivOuter__.style.display = 'none'
            }
		);
        this.__oDrag__.disable();
        this.__oLastPos__ = { x: 0, y: 0 };
        this.__oSpeed__ = { x: 0, y: 0 };
        this.__oMoveTimer__ = null;

        this.__oMLResize__ = new MoveLib(
			[oSize.x, oSize.y],
			[60, 60],
			function(arr) {
                obj.__fnDoMove__(oPos.x, oPos.y - arr[1].cur / 2);
                obj.__fnDoResize__(arr[0].cur, arr[1].cur)
			},
			function() {
                obj.__oDrag__.enable();
                obj.startMove();
                oCloseBtn.onmousedown = function() {
                        obj.hide();
                        return false
				}
			},
			MoveLibType.BUFFER
		);

        this.__oMLMove__ = new MoveLib(
			[0, 0], 
			[40, 40],
			function(arr) {
                obj.__fnDoMove__(arr[0].cur, arr[1].cur)
            },
			function() {
                obj.startShowBtn();
                obj.__oDock__.fnOnResizeOrScroll = function(oPos) { obj.__oEleMove__.left = -obj.__oMaxSize__.x + 'px' }
            },
			MoveLibType.BUFFER
		);

        this.__oMLBtn__ = new MoveLib(
			[0],
			[40],
			function(arr) {
                obj.__oDock__.move({
                        left: arr[0].cur,
                        top: 0
                })
            },
			function() {
                if (this.isOpening) {
                        obj.__oSpeed__.x = 150 + Math.ceil(Math.random() * 150);
                        obj.__oSpeed__.y = 0;
                        obj.startMove();
                        obj.__oDrag__.enable();
                        this.isOpening = false
                }
            },
			MoveLibType.BUFFER
		);

        this.__oMLBtn__.isOpening = false;
        this.iAcc = 3;
        this.fScale = -0.7;
        this.__oEleBtn__.style.display = 'block';
        this.__oDock__ = new Dock(oEleBtn, DockType.LEFT | DockType.TOP, { left: -oEleBtn.offsetWidth, top: 0 }, null, null);
        this.__oEleBtn__.onclick = function() {
                var top = document.body.scrollTop || document.documentElement.scrollTop;
                oEleMove.style.top = top + 'px';
                obj.show()
        }
}
QuirkyPopup.prototype.initShow = function() {
        var obj = this;
        this.__oMLResize__.setTarget([this.__oMaxSize__.x, this.__oMaxSize__.y])
};
QuirkyPopup.prototype.show = function() {
        this.__oDrag__.disable();
        this.stopMove();
        this.__oMLBtn__.setCurrent([0]);
        this.__oMLBtn__.setTarget([ - this.__oEleBtn__.offsetWidth]);
        this.__oMLBtn__.isOpening = true
};
QuirkyPopup.prototype.hide = function() {
        var obj = this;
        var oPos = this.__fnGetPos__();
        var oSize = this.__oDock__.getScreen();
        var top = document.body.scrollTop || document.documentElement.scrollTop;
        this.__oDrag__.disable();
        this.stopMove();
        this.__oMLMove__.setCurrent([oPos.x, oPos.y]);
        this.__oMLMove__.setTarget([ - this.__oMaxSize__.x, oSize.top]);
        this.__oDock__.fnOnResizeOrScroll = function(oSize) {
                obj.__oMLMove__.setTarget([ - obj.__oMaxSize__.x, oSize.top])
        }
};
QuirkyPopup.prototype.startShowBtn = function() {
        this.__oMLBtn__.setCurrent([ - this.__oEleBtn__.offsetWidth]);
        this.__oMLBtn__.setTarget([0])
};
QuirkyPopup.prototype.startMove = function() {
        var obj = this;
        if (this.__oMoveTimer__) { clearInterval(this.__oMoveTimer__) }
        this.__oMoveTimer__ = setInterval(function() { obj.__doMove__() },30)
};
QuirkyPopup.prototype.stopMove = function() {
        clearInterval(this.__oMoveTimer__);
        this.__oMoveTimer__ = null
};
QuirkyPopup.prototype.__doMove__ = function() {
        var oPos = this.__fnGetPos__();
        var r = document.body.offsetWidth - this.__oMaxSize__.x;
        var t = document.body.scrollTop || document.documentElement.scrollTop;
        var b = t + document.documentElement.clientHeight - this.__oMaxSize__.y;
        this.__oSpeed__.y += this.iAcc;
        oPos.x += this.__oSpeed__.x;
        oPos.y += this.__oSpeed__.y;
        if (Math.abs(this.__oSpeed__.x) < 1) { this.__oSpeed__.x = 0 }
        if (Math.abs(this.__oSpeed__.y) < 1) { this.__oSpeed__.y = 0 }
        if (oPos.x <= 0) {
                oPos.x = 0;
                this.__oSpeed__.x *= this.fScale
        } else if (oPos.x >= r) {
                oPos.x = r;
                this.__oSpeed__.x *= this.fScale
        }
        if (oPos.y <= t) {
                oPos.y = t;
                this.__oSpeed__.y *= this.fScale
        } else if (oPos.y >= b) {
                oPos.y = b;
                this.__oSpeed__.y *= this.fScale;
                this.__oSpeed__.x *= -this.fScale
        }
        if (Math.abs(this.__oSpeed__.x) > 0 || Math.abs(this.__oSpeed__.y) > 0) {
                this.__fnDoMove__(oPos.x, oPos.y)
        }
};