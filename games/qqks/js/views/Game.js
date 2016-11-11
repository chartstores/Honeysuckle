/*动作、游戏控制台*/
//开始、暂停、重新启动、停止功能
function Game(){

}
/*开始*/
Game.prototype.start=function(){
    var toucher = new Toucher();
    toucher.eventHandle("add", document, "touchstart", function (e) {
        console.info("touchstart event");
    }, false);
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