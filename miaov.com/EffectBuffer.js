function EffectBuffer(fDistanceCoefficient, iMinSpeed) {
        this.distanceCoefficient = fDistanceCoefficient;
        this.iMinSpeed = iMinSpeed
}
EffectBuffer.prototype.initMotion = function(aMotionData) {};
EffectBuffer.prototype.next = function(aMotionData) {
        var motion = null;
        var i = 0;
        var complete = true;
        for (i = 0; i < aMotionData.length; i++) {
                motion = aMotionData[i];
                motion.speed = (motion.target - motion.cur) / this.distanceCoefficient;
                motion.speed = ceilSpeed(motion.speed);
                if (Math.abs(motion.speed) < this.iMinSpeed) {
                        motion.speed = this.iMinSpeed > 0 ? this.iMinSpeed: -this.iMinSpeed
                }
                if (Math.abs(motion.speed) > motion.speedMax) {
                        motion.speed = (motion.speed > 0) ? motion.speedMax: -motion.speedMax
                }
                motion.cur += motion.speed;
                if (motion.cur != motion.target) {
                        complete = false
                }
        }
        if (complete) {
                for (i = 0; i < aMotionData.length; i++) {
                        aMotionData[i].cur = aMotionData[i].target;
                        aMotionData[i].speed = 0
                }
                return true
        }
        return false
};