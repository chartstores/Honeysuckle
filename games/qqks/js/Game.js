/*动作、游戏控制台*/
//开始、暂停、重新启动、停止功能
function Game(){
    var _self=this;
    _self.gameCounter=0;//记录当前第几关
    _self.lastTime =0;//上一幀的时间位置
    _self.gameNumber=0;
    _self.isEnabled=false;
    this.isCatchMoney=true;//是否抓住钱
}
/*暂停*/
Game.prototype.pause=function(){

};

/*重新启动*/
Game.prototype.restart=function(){

};

/*停止*/
Game.prototype.stop=function(){

};

/*开始*/
Game.prototype.start=function(){
    var _self=this;

    var background=new Background();
    background.paint(background.index,window.innerWidth*appConfig.ratio,window.innerHeight*appConfig.ratio);
    _self.background=background;

    var btn=new Button();
    btn.paint(btn.index.start,440*appConfig.prop,181*appConfig.prop);
    btn.paint(btn.back.index,440*appConfig.prop,181*appConfig.prop);
    _self.btn=btn;

    var toucher = new Toucher();
    //判断区域落点，触发对应的事件处理函数
    _self.btn.btnFn=btn.touch(toucher,_self);
    _self.toucher=toucher;

    var txt=new Text();
    _self.txt=txt;

    var counter=new Counter();
    _self.counter=counter;

    var hand=new Hand();
    _self.hand=hand;

    var money=new Money();
    _self.money=money;

    var hammer=new Hammer();
    _self.hammer=hammer;

    //test
    // _self.showGateList("one",'start');
    // _self.showGateList("two",'start');
    // _self.showGateList("three",'start');
    // _self.showGateList("four",'start');
    // _self.showGateList("what",'');

    _self.gameNumber=4;
    _self.isEnabled=true;
    _self.lastTime =_self.startTime= Date.now();
    _self.main();
};
/**
 *
 * @param gateName 需要展示的关数 -1为回退操作
 * @param action 动作
 */
Game.prototype.showGateList=function(gateName,action){
    var _self=this;
    console.info("去抢钱按钮");

    //画背景图，解绑事件，绘制按钮，然后绑定按钮事件
    _self.toucher.eventHandle('remove',document,'touchstart', function(){}, false);
    application.context.clearRect(0, 0, application.canvas.width, application.canvas.height);

    _self.background.paint(_self.background.gate,application.canvas.width,application.canvas.height);
    //初始化计数器、排行榜
    _self.counter.paint(_self.counter.caculatorA,_self.txt,_self.txt.counter.counterA,'123500','#fbe985',"bold 21px Arial",'center');
    _self.btn.paint(_self.btn.rank);
    _self.txt.paint(_self.txt.rank,'排行榜','#fbe985',"20px Microsoft Yahei",'center');

    //对相应的通关按钮绑定事件
    _self.btn.coordinates=[];
    var offset=[];//由于激活状态和未激活状态的图片尺寸大小有差异，需要重新计算绘图开始位置
    if(_self.btn.gateList.gateCoin[gateName].enabled){
        offset.push(Math.round(util.$$(_self.btn.gateList.gateCoin[gateName].enabledName).width-util.$$(_self.btn.gateList.gateCoin[gateName].name).width)/2);
        offset.push(Math.round(util.$$(_self.btn.gateList.gateCoin[gateName].enabledName).height-util.$$(_self.btn.gateList.gateCoin[gateName].name).height)/2);
        _self.btn.gateList.gateCoin[gateName].startX = _self.btn.gateList.gateCoin[gateName].startX-offset[0];
        _self.btn.gateList.gateCoin[gateName].startY = _self.btn.gateList.gateCoin[gateName].startY-offset[1];
        _self.btn.gateList.gateCoin[gateName].name = _self.btn.gateList.gateCoin[gateName].enabledName;
        _self.btn.paintOther([_self.btn.gateList.gateCoin[gateName].starshine]);
    }

    _self.btn.paint(_self.btn.gateList.gateCoin[gateName]);
    _self.btn.paint(_self.btn.back.gateList);
    switch(gateName){
        case -1:
            alert("回退操作");
            break;
        case "one":
            //绘制非当前关数按钮/非当前按钮绑定事件区域的按钮
            _self.btn.paintOther([
                _self.btn.gateList.gateCoin.one.shadow,
                _self.btn.gateList.gateCoin.two, _self.btn.gateList.gateCoin.two.shadow, _self.btn.gateList.gateCoin.two.starshine,
                _self.btn.gateList.gateCoin.three, _self.btn.gateList.gateCoin.three.shadow, _self.btn.gateList.gateCoin.three.starshine,
                _self.btn.gateList.gateCoin.four, _self.btn.gateList.gateCoin.four.shadow, _self.btn.gateList.gateCoin.four.starshine,
                _self.btn.gateList.gateCoin.what, _self.btn.gateList.gateCoin.what.shadow
            ]);

            break;
        case "two":
            _self.btn.paintOther([
                _self.btn.gateList.gateCoin.one, _self.btn.gateList.gateCoin.one.shadow, _self.btn.gateList.gateCoin.one.starshine,
                _self.btn.gateList.gateCoin.one.shadow,
                _self.btn.gateList.gateCoin.three, _self.btn.gateList.gateCoin.three.shadow, _self.btn.gateList.gateCoin.three.starshine,
                _self.btn.gateList.gateCoin.four, _self.btn.gateList.gateCoin.four.shadow, _self.btn.gateList.gateCoin.four.starshine,
                _self.btn.gateList.gateCoin.what, _self.btn.gateList.gateCoin.what.shadow
            ]);
            break;
        case "three":
            _self.btn.paintOther([
                _self.btn.gateList.gateCoin.one, _self.btn.gateList.gateCoin.one.shadow, _self.btn.gateList.gateCoin.one.starshine,
                _self.btn.gateList.gateCoin.two, _self.btn.gateList.gateCoin.two.shadow, _self.btn.gateList.gateCoin.two.starshine,
                _self.btn.gateList.gateCoin.three.shadow,
                _self.btn.gateList.gateCoin.four, _self.btn.gateList.gateCoin.four.shadow, _self.btn.gateList.gateCoin.four.starshine,
                _self.btn.gateList.gateCoin.what, _self.btn.gateList.gateCoin.what.shadow
            ]);
            break;
        case "four":
            _self.btn.paintOther([
                _self.btn.gateList.gateCoin.one, _self.btn.gateList.gateCoin.one.shadow, _self.btn.gateList.gateCoin.one.starshine,
                _self.btn.gateList.gateCoin.two, _self.btn.gateList.gateCoin.two.shadow, _self.btn.gateList.gateCoin.two.starshine,
                _self.btn.gateList.gateCoin.three, _self.btn.gateList.gateCoin.three.shadow, _self.btn.gateList.gateCoin.three.starshine,
                _self.btn.gateList.gateCoin.four.shadow,
                _self.btn.gateList.gateCoin.what, _self.btn.gateList.gateCoin.what.shadow
            ]);
            break;
        case "what":
            _self.btn.paintOther([
                _self.btn.gateList.gateCoin.one, _self.btn.gateList.gateCoin.one.shadow, _self.btn.gateList.gateCoin.one.starshine,
                _self.btn.gateList.gateCoin.two, _self.btn.gateList.gateCoin.two.shadow, _self.btn.gateList.gateCoin.two.starshine,
                _self.btn.gateList.gateCoin.three, _self.btn.gateList.gateCoin.three.shadow, _self.btn.gateList.gateCoin.three.starshine,
                _self.btn.gateList.gateCoin.four, _self.btn.gateList.gateCoin.four.shadow, _self.btn.gateList.gateCoin.four.starshine,
                _self.btn.gateList.gateCoin.what, _self.btn.gateList.gateCoin.what.shadow
            ]);
            break;
    }
    _self.toucher.eventHandle('add',document,'touchstart', _self.btn.btnFn, false);
};

/**
 *
 * @param number -1为去到上一关
 * @param isEnabled
 */
Game.prototype.main=function(){
    var _self=this;
    var now = Date.now();
    var delta = (now - application.game.lastTime) / 1000.0;
    var timerCounter=parseInt((now-application.game.startTime)/1000);
    if(timerCounter<21){
        /*绘制静态图*/
        application.game.render(timerCounter);
        /*绘制动态运动图*/
        // _self.update(delta);

        //如何触发掉钱动作、动手行为、铁锤出现、捡钱行为(碰撞行为)？
        // if(appConfig.hasGoldenHand){
        //     if(step>2&&_self.isCatchMoney){
        //         _self.hand.paint(_self.hand.status[strMap[step]],'goldenCatch',{},{});
        //     }else{
        //         _self.hand.paint(_self.hand.status[strMap[step]],'golden',{},{});
        //     }
        // }else{
        //     if(step>2&&_self.isCatchMoney) {
        //         _self.hand.paint(_self.hand.status[strMap[step]], 'normalCatch', {}, {});
        //     }else{
        //         _self.hand.paint(_self.hand.status[strMap[step]], 'normal', {}, {});
        //     }
        // }
        requestAnimFrame(application.game.main);
    }
    _self.lastTime=now;
    // appConfig.moneyInterval=setInterval(function(){
    //     if(moneyActionStep>3){
    //         moneyActionStep=0;
    //     }
    //     if(appConfig.timerCounter<21) {
    //         _self.money.fall(_self.money.fallMoney, moneyMap[moneyActionStep]);
    //     }else{
    //         clearInterval(appConfig.moneyInterval);
    //     }
    // },appConfig.moneyFrame);
    //
    // appConfig.hammerInterval=setInterval(function(){
    //     if(appConfig.timerCounter<21) {
    //         _self.hammer.fall(_self.hammer.normal);//该什么时候出现锤子呢？
    //     }else{
    //         clearInterval(appConfig.hammerInterval);
    //     }
    // },appConfig.hammerFrame);
};
Game.prototype.render=function(timerCounter){
    console.log("第"+timerCounter+"秒");
    var strMap=['one','two','three','four','five','six','seven'];
    var moneyMap=['money-first','money-second','money-second','money-third'];
    var moneyActionStep=0;

    var _self=this;
    var progress={'-1':'back','1':'one','2':'two','3':'three','4':'four'};

    _self.background.paint(_self.background.gate[progress[_self.gameNumber]],application.canvas.width,application.canvas.height);
    _self.background.paint(_self.background.gate[progress[_self.gameNumber]].bedding,750*appConfig.prop,484*appConfig.prop);//绘制女巫&罐子
    _self.txt.paint(_self.txt.gate[progress[_self.gameNumber]]);//绘制level n文字
    _self.txt.paint(_self.txt.gate[progress[_self.gameNumber]].moneyCounter.now,_self.counter.getCounerValue(),'#f44038',"bold "+32*appConfig.ratio+"px Arial",'right');//当前金额值
    _self.txt.paint(_self.txt.gate[progress[_self.gameNumber]].moneyCounter.total,'/'+appConfig.passValue.one.score,'#793605',"bold "+32*appConfig.ratio+"px Arial",'left');//当前关数值
    _self.counter.paint(_self.counter.timerTopRight,_self.txt,_self.txt.timer.topRight,timerCounter+'s','#f44038',"bold "+25*appConfig.ratio+"px Arial",'center');//计算时间值
};

Game.prototype.update=function(delta){
    var _self=this;
    //掉钱

    //掉锤子

    //手的运动轨迹
};

/*显示排行榜功能*/
Game.prototype.rank=function(){

};
