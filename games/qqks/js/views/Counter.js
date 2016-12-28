/*计数器*/
function Counter() {
    var _self = this;
    _self.counterValue=0;
    _self.timerTopRight = {
        name: 'timer',
        startX: Math.round(util.getCoordinateMap(602, 22).x * application.canvas.width),
        startY: Math.round(util.getCoordinateMap(602, 22).y * application.canvas.height)
    };
    _self.timerB = {
        name: 'timer',
        startX: Math.round(util.getCoordinateMap(30, 22).x * application.canvas.width),
        startY: Math.round(util.getCoordinateMap(30, 22).y * application.canvas.height)
    };
    _self.caculatorA = {
        name: 'label-counter',
        startX: Math.round(util.getCoordinateMap(40, 22).x * application.canvas.width),
        startY: Math.round(util.getCoordinateMap(40, 22).y * application.canvas.height)
    };
    _self.caculatorbB = {
        name: 'label-counter',
        startX: Math.round(util.getCoordinateMap(40, 176).x * application.canvas.width),
        startY: Math.round(util.getCoordinateMap(40, 176).y * application.canvas.height)
    }
};

Counter.prototype.paint = function (counterObj) {
    var _self = this;
    var myImage = util.$$(counterObj.name);
    var x = counterObj.startX;
    var y = counterObj.startY;
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

Counter.prototype.setValue=function(value){
    this.counterValue=value;
};

Counter.prototype.getCounerValue=function(){
    return this.counterValue;
}