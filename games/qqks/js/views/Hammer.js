/*锤子*/
function Hammer() {
    this.step = 0;
    this.speed = 1800;// 每秒移动的像素
    this.statu = 'normal';//'hammer' 'hammer-beat'
    this.startX = Math.round(util.getCoordinateMap(30, 0).x * application.canvas.width);
    this.startY = 0;
    this.stopX = Math.round(util.getCoordinateMap(30, 750).x * application.canvas.width);
    this.stopY = Math.round(util.getCoordinateMap(30, 750).y * application.canvas.height);
    this.x=0;
    this.y=0;
}

Hammer.prototype.fall = function (modifier) {
    var _self = this;
    var x = _self.x = _self.startX;
    var y;

    _self.y = _self.y + _self.speed * modifier;
    y = _self.y;
    if (y > _self.stopY) {
        _self.y = 0;
    }

    var myImage = util.$$('hammer-' + _self.statu);
    var width = Math.round(myImage.width * appConfig.prop);
    var height = Math.round(myImage.height * appConfig.prop);

    application.context.drawImage(myImage, x, y, width, height);
};

Hammer.prototype.moving = function (modifier) {

};