/*动作、游戏控制台*/
//开始、暂停、重新启动、停止功能
function Game(){
    var _self=this;
}
/*开始*/
Game.prototype.start=function(){
    var _self=this;

    var background=new Background();
    background.paint(background.index,application.canvas.width,application.canvas.height);

    var btn=new Button();
    _self.btn=btn;
    btn.paint(btn.index.start);
    btn.paint(btn.index.back);

    var toucher = new Toucher();
    //判断区域落点，触发对应的事件处理函数
    btn.touchAction(toucher,background);
};

Game.prototype.startGate=function(){

};
/*暂停*/
Game.prototype.pause=function(){

};

/*重新启动*/
Game.prototype.restart=function(){

};

/*停止*/
Game.prototype.stop=function(){

};