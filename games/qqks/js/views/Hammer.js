/*锤子*/
function Hammer(){
    this.step=0;
    this.normal={
        name:'hammer',
        startX:23,
        startY:0
    };
    this.beat={
        name:'hammer-beat',
        startX:23,
        startY:0
    };
}

Hammer.prototype.fall=function(hammerObj){
    var _self = this;
    var myImage = util.$$(hammerObj.name);
    var x = hammerObj.startX;
    var y = hammerObj.startY+_self.step*180;
    var width = Math.round(myImage.width * appConfig.prop);
    var height = Math.round(myImage.height * appConfig.prop);

    application.context.drawImage(myImage, x, y, width, height);
    _self.step++;
    if(_self.step>4){
        _self.step=0;
    }

};