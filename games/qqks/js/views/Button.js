/*按钮*/
function Button(){
    this.coordinates=[];//存放按钮信息
    this.btnEventCount=0;
    this.firTime=0;
    this.index={
        start:{
            name:'index-btn1',
            startX:Math.round(util.getCoordinateRate(160,810).x*application.canvas.width),
            startY:Math.round(util.getCoordinateRate(160,810).y*application.canvas.height),
            rect:[]
        }
    };
    this.gateList={
        gateCoin:{
            one:{
                name:'gate-coin-one',
                enabled:true,
                enabledName:'gate-coin-one-enabled',
                startX:Math.round(util.getCoordinateRate(307,1120).x*application.canvas.width),
                startY:Math.round(util.getCoordinateRate(307,1120).y*application.canvas.height),
                shadow:{
                    name:'shadow',
                    startX:Math.round(util.getCoordinateRate(312,1229).x*application.canvas.width),
                    startY:Math.round(util.getCoordinateRate(312,1229).y*application.canvas.height)
                },
                starshine:{
                    name:'starshine',
                    startX:Math.round(util.getCoordinateRate(312,1062).x*application.canvas.width),
                    startY:Math.round(util.getCoordinateRate(312,1062).y*application.canvas.height)
                }
            },
            two:{
                name:'gate-coin-two',
                enabled:false,
                enabledName:'gate-coin-two-enabled',
                startX:Math.round(util.getCoordinateRate(515,902).x*application.canvas.width),
                startY:Math.round(util.getCoordinateRate(515,902).y*application.canvas.height),
                shadow:{
                    name:'shadow',
                    startX:Math.round(util.getCoordinateRate(521,1005).x*application.canvas.width),
                    startY:Math.round(util.getCoordinateRate(521,1005).y*application.canvas.height)
                },
                starshine:{
                    name:'starshine',
                    startX:Math.round(util.getCoordinateRate(521,850).x*application.canvas.width),
                    startY:Math.round(util.getCoordinateRate(521,850).y*application.canvas.height)
                }
            },
            three:{
                name:'gate-coin-three',
                enabled:false,
                enabledName:'gate-coin-three-enabled',
                startX:Math.round(util.getCoordinateRate(148,756).x*application.canvas.width),
                startY:Math.round(util.getCoordinateRate(148,756).y*application.canvas.height),
                shadow:{
                    name:'shadow',
                    startX:Math.round(util.getCoordinateRate(148,862).x*application.canvas.width),
                    startY:Math.round(util.getCoordinateRate(148,862).y*application.canvas.height)
                },
                starshine:{
                    name:'starshine',
                    startX:Math.round(util.getCoordinateRate(158,706).x*application.canvas.width),
                    startY:Math.round(util.getCoordinateRate(158,706).y*application.canvas.height)
                }
            },
            four:{
                name:'gate-coin-four',
                enabled:false,
                enabledName:'gate-coin-four-enabled',
                startX:Math.round(util.getCoordinateRate(548,435).x*application.canvas.width),
                startY:Math.round(util.getCoordinateRate(548,435).y*application.canvas.height),
                shadow:{
                    name:'shadow',
                    startX:Math.round(util.getCoordinateRate(545,539).x*application.canvas.width),
                    startY:Math.round(util.getCoordinateRate(545,539).y*application.canvas.height)
                },
                starshine:{
                    name:'starshine',
                    startX:Math.round(util.getCoordinateRate(550,386).x*application.canvas.width),
                    startY:Math.round(util.getCoordinateRate(550,386).y*application.canvas.height)
                }
            },
            what:{
                name:'gate-coin-what',
                startX:Math.round(util.getCoordinateRate(157,199).x*application.canvas.width),
                startY:Math.round(util.getCoordinateRate(157,199).y*application.canvas.height),
                shadow:{
                    name:'shadow',
                    startX:Math.round(util.getCoordinateRate(157,300).x*application.canvas.width),
                    startY:Math.round(util.getCoordinateRate(157,300).y*application.canvas.height)
                }
            }
        }
    };
    this.rank={
        name:'label-rank',
        startX:Math.round(util.getCoordinateRate(511,22).x*application.canvas.width),
        startY:Math.round(util.getCoordinateRate(511,22).y*application.canvas.height)
    };
    this.back={
        index:{
            name:'index-btn2',
            startX:Math.round(util.getCoordinateRate(160,1015).x*application.canvas.width),
            startY:Math.round(util.getCoordinateRate(160,1015).y*application.canvas.height)
        },
        gateList:{
            name:'btn-back-gate',
            startX:Math.round(util.getCoordinateRate(34,1236).x*application.canvas.width),
            startY:Math.round(util.getCoordinateRate(34,1236).y*application.canvas.height)
        },
        rankPage:{
            name:'btn-rank-back',
            startX:Math.round(util.getCoordinateRate(33,1198).x*application.canvas.width),
            startY:Math.round(util.getCoordinateRate(33,1198).y*application.canvas.height)
        }
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

/*
* 渲染阴影、星光、效果
* */
Button.prototype.paintOther=function(objectArr){
    var _self=this;
    var myImage,x, y,width,height;
    for(var i=0;i<objectArr.length;i++){
        myImage = util.$$(objectArr[i].name);
        x = objectArr[i].startX;
        y = objectArr[i].startY;
        width = Math.round(myImage.width*appConfig.prop);
        height = Math.round(myImage.height*appConfig.prop);
        application.context.drawImage(myImage,x,y,width,height);
    }
};

/*绑定点击某个区域,以使某个方法生效*/
Button.prototype.touchAction=function(toucher){
    var _self=this;
    var fnMap={
        "index-btn1" : function(){ return application.game.showGateList(1,"start"); },            //显示通关列表
        "index-btn2" : function(){ return application.game.showGateList(-1,"back"); },             //显示通关列表
        "gate-coin-one" : function(){ return application.game.startGate(1,false); },            //通关按钮1
        "gate-coin-one-enabled": function(){ return application.game.startGate(1,true); },      //通关按钮1
        "gate-coin-two" : function(){ return application.game.startGate(2,false); },            //通关按钮2
        "gate-coin-two-enabled": function(){ return application.game.startGate(2,true); },      //通关按钮2
        "gate-coin-three" : function(){ return application.game.startGate(3,false); },          //通关按钮3
        "gate-coin-three-enabled" : function(){ return application.game.startGate(3,true); },   //通关按钮3
        "gate-coin-four" : function(){ return application.game.startGate(4,false); },           //通关按钮4
        "gate-coin-four-enabled" :function(){ return application.game.startGate(4,true); },     //通关按钮4
        "label-rank" : function(){ return application.game.rank();},                            //排行榜
        "btn-back-gate" : function(){ return application.game.startGate(-1,false);},            //通关列表，回退按钮
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
                fnMap[_self.coordinates[i]]();//判断
                break;
            }
        }
    };
    if(_self.btnEventCount==0){
        toucher.eventHandle('add',document,'touchstart', btnFun, false);
    }
    _self.btnEventCount++;

    return btnFun;
};
