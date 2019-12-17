function MoveLib(aCur, aSpeedMax, fnDoMove, fnMoveEnd, iEffectType) {
        var i = 0;
        switch (iEffectType) {
            case MoveLibType.COLLISION:
                this.__oEffect__ = new EffectCollision( - 0.6, 3);
                break;
            case MoveLibType.ELASTICITY:
                this.__oEffect__ = new EffectElasticity(4, 0.65);
                break;
            case MoveLibType.BUFFER:
                this.__oEffect__ = new EffectBuffer(8);
                break;
            case MoveLibType.DIRECT:
                this.__oEffect__ = new EffectDirect(10);
                break;
            case MoveLibType.DIRECT_SLOW:
                this.__oEffect__ = new EffectDirect(20);
                break;
            case MoveLibType.DIRECT_FAST:
                this.__oEffect__ = new EffectDirect(5);
                break;
            case MoveLibType.BUFFER_CUSTOM:
                this.__oEffect__ = new EffectBuffer(parseInt(arguments[5]), parseInt(arguments[6]));
                break;
            default:
                alert('未知的类型' + iEffectType);
                return
        }
        this.motionDatas = [];
        for (i = 0; i < aCur.length; i++) {
                this.motionDatas[i] = {
                        target: aCur[i],
                        speed: 0,
                        speedMax: aSpeedMax[i],
                        cur: aCur[i]
                }
        }
        this.fnDoMove = fnDoMove;
        this.fnMoveEnd = fnMoveEnd;
        this.interval = 40;
        this.timer = null;
        this.lastTimer = 0;
        this.enabled = true;
        this.pause = false
}
MoveLib.prototype.setTarget = function(aValue) {
        var t = (new Date()).getTime();
        var allSame = true;
        var i = 0;
        for (i = 0; i < aValue.length; i++) {
                this.motionDatas[i].target = parseInt(aValue[i]);
                if (this.motionDatas[i].target != this.motionDatas[i].cur) { allSame = false }
        }
        if (allSame) {
                if (!this.timer) { this.start() }
                return
        }
        this.__oEffect__.initMotion(this.motionDatas);
        if (this.enabled) {
                if (!this.timer) { this.start() }
                if (t - this.lastTimer > this.interval) {
                        this.__timerHandler__();
                        this.lastTimer = t
                }
        }
};
MoveLib.prototype.setCurrent = function(aValue) {
        var i = 0;
        for (i = 0; i < aValue.length; i++) {
                this.motionDatas[i].cur = parseInt(aValue[i])
        }
};
MoveLib.prototype.start = function() {
        var obj = this;
        if (!this.enabled) { return }
        if (this.timer) {
			clearInterval(this.timer) 
		} else {
            this.timer = setInterval(function() { obj.__timerHandler__() }, this.interval)
        }
        this.iStartTime = ((new Date()).getTime());
        this.iCounter = 0
};
MoveLib.prototype.stop = function() {
        if (this.timer) {
                clearInterval(this.timer);
                this.timer = null
        }
};
MoveLib.prototype.__timerHandler__ = function() {
        var bEnd = false;
        if (this.pause) { return }
        bEnd = this.__oEffect__.next(this.motionDatas);
        if (bEnd) {
                if (this.fnMoveEnd) { this.fnMoveEnd(this.motionDatas) }
                this.fnDoMove(this.motionDatas);
                this.stop()
        } else {
                this.iCounter++;
                this.fnDoMove(this.motionDatas)
        }
        this.lastTimer = ((new Date()).getTime())
};