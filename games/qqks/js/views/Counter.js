/*计数器*/
function Counter() {
    var _self = this;
    _self.timerA = {
        name: 'timer',
        startX: Math.round(util.getCoordinateRate(652, 22).x * application.canvas.width),
        startY: Math.round(util.getCoordinateRate(652, 22).y * application.canvas.height)
    };
    _self.timerB = {
        name: 'timer',
        startX: Math.round(util.getCoordinateRate(30, 22).x * application.canvas.width),
        startY: Math.round(util.getCoordinateRate(30, 22).y * application.canvas.height)
    };
    _self.caculatorA = {
        name: 'label-counter',
        startX: Math.round(util.getCoordinateRate(40, 22).x * application.canvas.width),
        startY: Math.round(util.getCoordinateRate(40, 22).y * application.canvas.height)
    };
    _self.caculatorbB = {
        name: 'label-counter',
        startX: Math.round(util.getCoordinateRate(40, 176).x * application.canvas.width),
        startY: Math.round(util.getCoordinateRate(40, 176).y * application.canvas.height)
    }
};

Counter.prototype.paint = function (obj) {
    var _self = this;
    var myImage = util.$$(obj.name);
    var x = obj.startX;
    var y = obj.startY;
    var width = Math.round(myImage.width * appConfig.prop);
    var height = Math.round(myImage.height * appConfig.prop);

    application.context.drawImage(myImage, x, y, width, height);
};

Counter.prototype.initTimer = function (obj) {
    var _self = this;
    _self.paint(obj);
};

Counter.prototype.updateTimer = function () {

};

Counter.prototype.initCaculator = function (obj) {
    var _self = this;
    _self.paint(obj);
};

Counter.prototype.updateCaculator = function () {

};