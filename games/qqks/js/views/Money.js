/*钱*/
function Money(){
    this.fallMoney={
        step:0,
        first:'money-first',
        second:'money-second',
        third:'money-third',
        startX:123,
        startY:0
    };
}
/*下落*/
Money.prototype.fall=function(moneyObj,name){
    var _self = this;
    var myImage = util.$$(name);
    var x = moneyObj.startX;
    var y = moneyObj.startY+moneyObj.step*180;
    var width = Math.round(myImage.width * appConfig.prop);
    var height = Math.round(myImage.height * appConfig.prop);

    application.context.drawImage(myImage, x, y, width, height);
    moneyObj.step++;
    if(moneyObj.step>4){
        moneyObj.step=0;
    }

};

/*堆叠*/
Money.prototype.stack=function(){

};


