/*动作、游戏控制台*/
//开始、暂停、重新启动、停止功能
function Game(){
    var _self=this;
    _self.gameCounter=0;//记录当前第几关
    _self.last=0;//上一幀的时间位置
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
    background.paint(background.index,application.canvas.width,application.canvas.height);
    _self.background=background;

    var btn=new Button();
    btn.paint(btn.index.start,730,300);
    btn.paint(btn.back.index,730,300);
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
    // _self.showGateList(1,'start');
    //_self.showGateList(2,'start');
    //_self.showGateList(3,'start');
    //_self.showGateList(4,'start');
    // _self.startGate(1, true);
    // _self.startGate(1, true);
    // _self.startGate(2, true);
    // _self.startGate(3, true);


    // clearInterval(appConfig.gameInterval);
    // clearInterval(appConfig.timer);
    // appConfig.timerCounter=0;
    // appConfig.timer=setInterval(function(){
    //     appConfig.timerCounter++;
    // },1*1000);
    _self.startTime= Date.now();
    _self.main(4, true);
};

/**
 *
 * @param number 需要展示的关数 -1为回退操作
 * @param action 动作
 */
Game.prototype.showGateList=function(number,action){
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

    switch(number){
        case -1:
            alert("回退操作");
            break;
        case 1:
            //对相应的通关按钮绑定事件
            _self.btn.coordinates=[];
            var offset=[];//由于激活状态和未激活状态的图片尺寸大小有差异，需要重新计算绘图开始位置
            if(_self.btn.gateList.gateCoin.one.enabled){
                offset.push(Math.round(util.$$(_self.btn.gateList.gateCoin.one.enabledName).width-util.$$(_self.btn.gateList.gateCoin.one.name).width)/2);
                offset.push(Math.round(util.$$(_self.btn.gateList.gateCoin.one.enabledName).height-util.$$(_self.btn.gateList.gateCoin.one.name).height)/2);
                _self.btn.gateList.gateCoin.one.startX = _self.btn.gateList.gateCoin.one.startX-offset[0];
                _self.btn.gateList.gateCoin.one.startY = _self.btn.gateList.gateCoin.one.startY-offset[1];
                _self.btn.gateList.gateCoin.one.name = _self.btn.gateList.gateCoin.one.enabledName;
                _self.btn.paintOther([_self.btn.gateList.gateCoin.one.starshine]);
            }
            //console.info("偏移量是");
            //console.info(offset);

            _self.btn.paint(_self.btn.gateList.gateCoin.one);
            _self.btn.paint(_self.btn.back.gateList);

            //绘制非绑定事件区域的按钮
            _self.btn.paintOther([
                _self.btn.gateList.gateCoin.one.shadow,
                _self.btn.gateList.gateCoin.two, _self.btn.gateList.gateCoin.two.shadow, _self.btn.gateList.gateCoin.two.starshine,
                _self.btn.gateList.gateCoin.three, _self.btn.gateList.gateCoin.three.shadow, _self.btn.gateList.gateCoin.three.starshine,
                _self.btn.gateList.gateCoin.four, _self.btn.gateList.gateCoin.four.shadow, _self.btn.gateList.gateCoin.four.starshine,
                _self.btn.gateList.gateCoin.what, _self.btn.gateList.gateCoin.what.shadow
            ]);

            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
        case 5:
            alert("what");
            break;
    }
    _self.toucher.eventHandle('add',document,'touchstart', _self.btn.btnFn, false);
};

/**
 *
 * @param number -1为去到上一关
 * @param isEnabled
 */
Game.prototype.main=function(number,isEnabled){
    var _self=this;
    var now = Date.now();
    var delta = (now - _self.lastTime) / 1000.0;
    var timerCounter=parseInt((now-_self.startTime)/1000);

    var strMap=['one','two','three','four','five','six','seven'];
    var step=0;
    var moneyMap=['money-first','money-second','money-second','money-third'];
    var moneyActionStep=0;
    console.info("开始闯第"+number+"关");
    //解绑事件
    if(!isEnabled){
        //中途由于碰到锤子，被迫停止
        // alert("sorry,你还没有权限通往第"+number+"关");
        _self.toucher.eventHandle('remove',document,'touchstart', _self.btn.btnFn, false);

    }
    step++;
    if(step>6){
        step=0;
    }
    _self.timerCounter=timerCounter;
    if(timerCounter<21){
        /*绘制静态图*/
        _self.render(number);
        /*绘制动态运动图*/
        _self.update(delta);

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
        console.log(timerCounter);
        util.requestAnimFrame(_self.main(number,isEnabled));
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
Game.prototype.render=function(number){
    var _self=this;
    var progress={'-1':'back','1':'one','2':'two','3':'three','4':'four'};

    _self.background.paint(_self.background.gate[progress[number]],application.canvas.width,application.canvas.height);
    _self.background.paint(_self.background.gate[progress[number]].bedding);
    _self.txt.paint(_self.txt.gate[progress[number]]);
    _self.txt.paint(_self.txt.gate[progress[number]].moneyCounter.part,_self.counter.getCounerValue(),'#f44038',"bold 32px Arial",'right');
    _self.txt.paint(_self.txt.gate[progress[number]].moneyCounter.all,'/'+appConfig.passValue.one.score,'#793605',"bold 32px Arial",'left');
    _self.counter.paint(_self.counter.timerTopRight,_self.txt,_self.txt.timer.topRight,_self.timerCounter+'s','#f44038',"bold 21px Arial",'center');
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
