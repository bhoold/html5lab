function PerfectDrag(oElementDrag, fnGetPos, fnDoMove, fnOnDragStart, fnOnDragEnd) {
        var obj = this;
        this.oElement = oElementDrag;
        this.oElement.style.overflow = 'hidden';
        this.fnGetPos = fnGetPos;
        this.fnDoMove = fnDoMove;
        this.fnOnDragStart = fnOnDragStart;
        this.fnOnDragEnd = fnOnDragEnd;
        this.__oStartOffset__ = { x: 0, y: 0 };
        this.oElement.onmousedown = function(ev) { obj.startDrag(window.event || ev); return false };
        this.fnOnMouseUp = function(ev) { obj.stopDrag(window.event || ev) };
        this.fnOnMouseMove = function(ev) { obj.doDrag(window.event || ev) }
}
PerfectDrag.prototype.enable = function() {
        var obj = this;
        this.oElement.onmousedown = function(ev) {
                obj.startDrag(window.event || ev);
                return false
        }
};
PerfectDrag.prototype.disable = function() { this.oElement.onmousedown = null };
PerfectDrag.prototype.startDrag = function(oEvent) {
        var oPos = this.fnGetPos();
        var x = oEvent.clientX;
        var y = oEvent.clientY;
        if (this.fnOnDragStart) { this.fnOnDragStart() }
        this.__oStartOffset__.x = x - oPos.x;
        this.__oStartOffset__.y = y - oPos.y;
        if (this.oElement.setCapture) {
                this.oElement.setCapture();
                this.oElement.onmouseup = this.fnOnMouseUp;
                this.oElement.onmousemove = this.fnOnMouseMove
        } else {
                document.addEventListener("mouseup", this.fnOnMouseUp, true);
                document.addEventListener("mousemove", this.fnOnMouseMove, true);
                window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP)
        }
};
PerfectDrag.prototype.stopDrag = function(oEvent) {
        if (this.oElement.releaseCapture) {
                this.oElement.releaseCapture();
                this.oElement.onmouseup = null;
                this.oElement.onmousemove = null
        } else {
                document.removeEventListener("mouseup", this.fnOnMouseUp, true);
                document.removeEventListener("mousemove", this.fnOnMouseMove, true);
                window.releaseEvents(Event.MOUSE_MOVE | Event.MOUSE_UP)
        }
        if (this.fnOnDragEnd) {
                if (oEvent.clientX == this.__oStartOffset__.x && oEvent.clientY == this.__oStartOffset__.y) {
                        this.fnOnDragEnd(false)
                } else {
                        this.fnOnDragEnd(true)
                }
        }
};
PerfectDrag.prototype.doDrag = function(oEvent) {
        var x = oEvent.clientX;
        var y = oEvent.clientY;
        this.fnDoMove(x - this.__oStartOffset__.x, y - this.__oStartOffset__.y)
};