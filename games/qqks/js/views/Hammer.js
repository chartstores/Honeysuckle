/*锤子*/
function Hammer() {
    this.step = 0;
    this.speed = 2000;// 每秒移动的像素
    this.isFail = false;
    this.hammerTimer = null;
    this.style = 'normal';//'hammer' 'hammer-beat'
    this.startX = Math.round(util.getCoordinateMap(30, 0).x * application.canvas.width);
    this.startY = 0;
    this.stopX = Math.round(util.getCoordinateMap(30, 750).x * application.canvas.width);
    this.stopY = Math.round(util.getCoordinateMap(30, 750).y * application.canvas.height);
    this.x = 0;
    this.y = 0;
}
//设置一次，掉一次锤子
Hammer.prototype.isFailing = function () {
    var _self=this;
    var randomNumber=util.getRandom(0,100);
    if(randomNumber%30==0&&!_self.isFail){//产生的随机数条件符合而且上一次的锤子结束运动
        _self.isFail=true;
    }
    return _self.isFail;
};

Hammer.prototype.fall = function (modifier) {
    var _self = this;
    var x = _self.x = _self.startX;
    var y=_self.y = _self.y + _self.speed * modifier;

    var myImage = util.$$('hammer-' + _self.style);
    var width = Math.round(myImage.width * appConfig.prop);
    var height = Math.round(myImage.height * appConfig.prop);
    application.context.drawImage(myImage, x, y, width, height);

    //判断该锤子状态是否应该结束
    if (y >= _self.stopY) {
        _self.y = 0;
        _self.isFail=false;
    }
};

Hammer.prototype.moving = function (modifier) {

};