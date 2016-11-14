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
    this.gateList={
        rank:{
            name:'rank-bg',
            startX:Math.round(util.getCoordinateRate(511,176).x*application.canvas.width),
            startY:Math.round(util.getCoordinateRate(511,176).y*application.canvas.height)
        },
        back:{
            name:'btn-back-gate',
            startX:Math.round(util.getCoordinateRate(34,1202).x*application.canvas.width),
            startY:Math.round(util.getCoordinateRate(34,1202).y*application.canvas.height)
        },
        caculator:{
            name:'caculator',
            startX:Math.round(util.getCoordinateRate(40,176).x*application.canvas.width),
            startY:Math.round(util.getCoordinateRate(40,176).y*application.canvas.height)
        },
        gateCoin:{
            one:{
                name:'gate-list-show-one',
                startX:Math.round(util.getCoordinateRate(284,1050).x*application.canvas.width),
                startY:Math.round(util.getCoordinateRate(284,1050).y*application.canvas.height)
            },
            two:{
                name:'gate-list-show-two',
                startX:Math.round(util.getCoordinateRate(495,882).x*application.canvas.width),
                startY:Math.round(util.getCoordinateRate(495,882).y*application.canvas.height)
            },
            three:{
                name:'gate-list-show-three',
                startX:Math.round(util.getCoordinateRate(128,756).x*application.canvas.width),
                startY:Math.round(util.getCoordinateRate(128,756).y*application.canvas.height)
            },
            four:{
                name:'gate-list-show-four',
                startX:Math.round(util.getCoordinateRate(514,465).x*application.canvas.width),
                startY:Math.round(util.getCoordinateRate(514,465).y*application.canvas.height)
            }
        }
    };
    this.timer={
        name:'timer',
        startX:'',
        startY:''
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
Button.prototype.touchAction=function(toucher,background){
    var _self=this;
    var btnEventFn={
        "index-btn1":function(){
            console.info("去抢钱按钮");
            //画背景图，解绑事件，绘制按钮，然后绑定按钮事件
            toucher.eventHandle('remove',document,'touchstart', btnFun, false);
            background.paint(background.list.one,application.canvas.width,application.canvas.height);
            _self.coordinates=[];
            _self.paint(_self.gateList.gateCoin.one);
            toucher.eventHandle('add',document,'touchstart', btnFun, false);
        },
        "index-btn2":function(){
            console.info("返回俱乐部按钮");
        },
        "rank-bg":function(){

        },
        "btn-back-gate":function(){

        },
        "caculator":function(){

        },
        "gate-list-show-one":function(){

        },
        "gate-list-show-two":function(){

        },
        "gate-list-show-three":function(){

        },
        "gate-list-show-four":function(){

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
