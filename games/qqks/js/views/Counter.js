/*计数器*/
function Counter() {
    var _self = this;
    _self = {
        timer: {
            name: 'timer',
            startX: '',
            startY: ''
        },
        caculator: {
            name: 'label-counter',
            startX: Math.round(util.getCoordinateRate(40, 176).x * application.canvas.width),
            startY: Math.round(util.getCoordinateRate(40, 176).y * application.canvas.height)
        }
    };
};

Counter.prototype.initTimer = function () {

};

Counter.prototype.updateTimer = function () {

};

Counter.prototype.initCaculator = function () {

};

Counter.prototype.updateCaculator = function () {

};