/**
 * Created by Administrator on 2016/8/3.
 * author yaoqianfeng
 */
function game(){

}
game.prototype.start=function(){
    //可加特效
    var _self=this;
    _self.isRunnning=true;
    console.info("启动游戏");
    _self.running();
};

game.prototype.running=function(){
    //定时
    var _self=this;
    this.intervalTimer=setInterval(function(){
        if(_self.isRunnning){
            //渲染画布
            console.info("游戏正在运行中");
        }
    },appConfig.secondsBetweenFrames);
};

game.prototype.pause=function(){
    console.info("暂停游戏");
    var _self=this;
    _self.isRunnning=false;
};

game.prototype.stop=function(){
    console.info("游戏停止");
    var _self=this;
    _self.isRunnning=false;
    clearInterval(_self.intervalTimer);
};
game.prototype.restart=function(){
    var _self=this;
    _self.isRunnning=true;
    _self.running();
};