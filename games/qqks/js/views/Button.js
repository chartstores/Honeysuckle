/*按钮*/
function Button(){
    this.coordinates=[];//存放按钮信息
    this.btnEventCount=0;
    this.firTime=0;
    this.index={
        start:{
            name:'index-btn1',
            startX:Math.round(util.getCoordinateRate(276,1188).x*application.canvas.width),
            startY:Math.round(util.getCoordinateRate(276,1188).y*application.canvas.height),
            rect:[]
        },
        back:{
            name:'index-btn2',
            startX:Math.round(util.getCoordinateRate(276,1491).x*application.canvas.width),
            startY:Math.round(util.getCoordinateRate(276,1491).y*application.canvas.height)
        }
    };
    this.gateOne={
        name:''
    };
    this.gateTwo={
        name:''
    };
    this.gateThree={
        name:''
    };
    this.gateFour={
        name:''
    };
}

/*渲染图片按钮*/
Button.prototype.paint=function(btn){
    var _self=this;
    var myImage = util.$$(btn.name);
    var x = btn.startX;
    var y = btn.startY;
    var width = Math.round(myImage.width*appConfig.prop);
    var height = Math.round(myImage.height*appConfig.prop);

    application.context.drawImage(myImage,x,y,width,height);
    _self.coordinates.push(btn.name, x, y, width, height);
};

/*绑定点击某个区域,以使某个方法生效*/
Button.prototype.touchAction=function(toucher){
    var _self=this;
    var btnEventFn={
        "index-btn1":function(){
            console.info("事件按钮1");
        },
        "index-btn2":function(){
            console.info("事件按钮2");
        }
    };
    var btnFun = function(event) {
        if (Date.parse(new Date()) - _self.firTime < 10 && _self.firTime != 0) {
            return;
        } else {
            _self.firTime = Date.parse(new Date());
        }

        x = Number(event.touches[0].pageX) * appConfig.ratio;
        y = Number(event.touches[0].pageY) * appConfig.ratio;

        for (var i = 0; i < _self.coordinates.length; i += 5) {
            if (x > _self.coordinates[i + 1] && x < _self.coordinates[i + 1] + _self.coordinates[i + 3] && y > _self.coordinates[i + 2] && y < _self.coordinates[i + 2] + _self.coordinates[i + 4]) {
                console.log(i);
                btnEventFn[_self.coordinates[i]]();//判断
                break;
            }
        }
    };
    if(_self.btnEventCount==0){
        toucher.eventHandle('add',document,'touchstart', btnFun, false);
    }
    _self.btnEventCount++;
};
