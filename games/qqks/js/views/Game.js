/*动作、游戏控制台*/
//开始、暂停、重新启动、停止功能
function Game(){
    var _self=this;
    _self.gameCounter=0;//记录当前第几关
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
    btn.paint(btn.index.start);
    btn.paint(btn.back.index);
    _self.btn=btn;

    var toucher = new Toucher();
    _self.toucher=toucher;

    //判断区域落点，触发对应的事件处理函数
    var btnFun=btn.touchAction(toucher);
    _self.btn.btnFun=btnFun;
    var counter=new Counter();
    _self.counter=counter;

    //test
    _self.showGateList('start');
};
/**
 *
 * @param number 需要展示的关数 -1为回退操作
 * @param action 动作
 */
Game.prototype.showGateList=function(number,action){
    var _self=this;
    console.info("去抢钱按钮");
    switch(number){
        case -1:
            alert("回退操作");
            break;
        case 1:
            //画背景图，解绑事件，绘制按钮，然后绑定按钮事件
            _self.toucher.eventHandle('remove',document,'touchstart', function(){}, false);
            application.context.clearRect(0, 0, application.canvas.width, application.canvas.height);

            _self.background.paint(_self.background.list,application.canvas.width,application.canvas.height);

            //初始化排行榜、计数功能
            _self.btn.paint(_self.btn.rank);
            _self.startCounter();

            //对相应的通关按钮绑定事件
            _self.btn.coordinates=[];
            var offset=[];//由于激活状态和未激活状态的图片尺寸大小有差异，需要重新计算绘图开始位置
            if(_self.btn.gateList.gateCoin.one.enabled){
                offset.push(Math.round(util.$$(_self.btn.gateList.gateCoin.one.enabledName).width-util.$$(_self.btn.gateList.gateCoin.one.name).width)/2);
                offset.push(Math.round(util.$$(_self.btn.gateList.gateCoin.one.enabledName).height-util.$$(_self.btn.gateList.gateCoin.one.name).height)/2);

                _self.btn.gateList.gateCoin.one.name = _self.btn.gateList.gateCoin.one.enabledName;
            }
            console.info("偏移量是");
            console.info(offset);

            _self.btn.paint(_self.btn.gateList.gateCoin.one);
            _self.btn.paint(_self.btn.back.gateList);

            //绘制非绑定事件区域的按钮
            _self.btn.paintOther([
                _self.btn.gateList.gateCoin.one.shadow, _self.btn.gateList.gateCoin.one.starshine,
                _self.btn.gateList.gateCoin.two, _self.btn.gateList.gateCoin.two.shadow, _self.btn.gateList.gateCoin.two.starshine,
                _self.btn.gateList.gateCoin.three, _self.btn.gateList.gateCoin.three.shadow, _self.btn.gateList.gateCoin.three.starshine,
                _self.btn.gateList.gateCoin.four, _self.btn.gateList.gateCoin.four.shadow, _self.btn.gateList.gateCoin.four.starshine,
                _self.btn.gateList.gateCoin.what, _self.btn.gateList.gateCoin.what.shadow
            ]);

            _self.toucher.eventHandle('add',document,'touchstart', _self.btn.btnFun, false);

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
};

/**
 *
 * @param number -1为去到上一关
 * @param isEnabled
 */
Game.prototype.startGate=function(number,isEnabled){
    console.info("开始闯第"+number+"关");
    if(!isEnabled){
        alert("sorry,你还没有权限通往第"+number+"关");
    }
    switch(number){
        case -1:
            break;
        case 1:
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
    }
};

Game.prototype.gate=function(){

};

/*执行计算器功能*/
Game.prototype.startCounter=function(){
    var _self=this;

    _self.counter.initTimer();
    _self.counter.initCaculator();
};

/*显示排行榜功能*/
Game.prototype.rank=function(){

};
