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

    _self.toucher = new Toucher();
    //判断区域落点，触发对应的事件处理函数
    _self.btn.btnFn=btn.touch(_self.toucher,_self);
    _self.txt=new Text();
    _self.counter=new Counter();
    _self.hand=new Hand();
    _self.money=new Money();
    _self.hammer=new Hammer();
    _self.layer=new Layer();
};
/**
 *
 * @param gateName {string}||{int} -1 "one"、"two"、"three"、"four"、"what" 需要展示的关数 -1为回退操作
 * @param action 动作
 */
Game.prototype.showGateList=function(gateName,action){
    var _self=this;

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
            alert(action);
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
    if(timerCounter<(appConfig.timerCounter+1)){
        application.game.render(timerCounter);
        application.game.update(delta);
        requestAnimFrame(application.game.main);
        application.game.toucher.checkCollisions();
        application.game.lastTime=now;
    }else if(timerCounter==(appConfig.timerCounter+1)){
        console.log("当前游戏停止，切换到下一关");
        application.game.toucher.eventHandle('remove',document,'touchstart', function(){}, false);
    }
};
Game.prototype.render=function(timerCounter){
    // console.log("第"+timerCounter+"秒");
    var _self=this;
    var progress={'-1':'back','1':'one','2':'two','3':'three','4':'four'};

    _self.background.paint(_self.background.gate[progress[_self.gameNumber]],application.canvas.width,application.canvas.height);
    _self.background.paint(_self.background.gate[progress[_self.gameNumber]].bedding);//绘制女巫&罐子
    _self.txt.paint(_self.txt.gate[progress[_self.gameNumber]]);//绘制level n文字
    _self.txt.paint(_self.txt.gate[progress[_self.gameNumber]].moneyCounter.now,_self.counter.getCounerValue(),'#f44038',"bold "+32*appConfig.ratio+"px Arial",'right');//当前金额值
    _self.txt.paint(_self.txt.gate[progress[_self.gameNumber]].moneyCounter.total,'/'+appConfig.passValue.one.score,'#793605',"bold "+32*appConfig.ratio+"px Arial",'left');//当前关数值
    //计算时间值
    _self.counter.paint(_self.counter.timerTopRight);
    _self.txt.paint(_self.txt.timer.topRight,timerCounter+'s','#f44038',"bold "+18*appConfig.ratio+"px Arial",'center');
};

Game.prototype.update=function(modifier){
    var _self=this;
    //掉钱
    //下落的money形状不变的话，但下落的位置已经变化，需要做好判断
    _self.money.fall(_self.money.fallMoney, modifier);

    //掉锤子
    //何时会掉锤子
    var randomNumber=util.getRandom(0,100);
    if(randomNumber%30==0){
        //锤子需要完整的下落
        _self.hammer.fall(modifier);
    }

    //手的运动轨迹
    if(_self.toucher.isHandMoving){
        _self.hand.moving(modifier);
    }

    //如何触发掉钱动作、动手行为、铁锤出现、捡钱行为(碰撞行为)？
    //将产生堆叠钱的行为
};

//显示游戏统计信息
Game.prototype.showStatic=function(name){
    //判断显示
    // this.layer.success();
    this.layer[name]();
};

/*显示排行榜功能*/
Game.prototype.showRanking=function(){

};
