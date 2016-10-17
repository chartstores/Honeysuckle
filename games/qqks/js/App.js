/*对象、状态/行为、属性*/

//开始、暂停、重新启动、停止功能
function App(){
    var _self = this;
    _self.isPaper=(function(){
        appConfig.canvas=$$(appConfig.container);
        appConfig.canvas.width = window.innerWidth;
        appConfig.canvas.height = window.innerHeight;

        if (!appConfig.canvas.getContext) {
            return false;
        }
        appConfig.context = appConfig.canvas.getContext('2d');
        return true;
    })();
}
//dsdsds
/*开始*/
App.prototype.start=function(){
    var _self = this;
    if(!appConfig.isShowDebugInfo){
        $$("debug-tool").style.display="none";
    }
    if(_self.isPaper){
        _self.game= new game();
        var touche = new touch();
        touche.eventHandle("add", document, "touchstart", function (e) {
            console.info("touchstart event");
        }, false);
        _self.game.start();
    }
};

/*暂停*/
App.prototype.pause=function(){

};

/*重新启动*/
App.prototype.restart=function(){

};

/*停止*/
App.prototype.stop=function(){

};


var application=(function () {
    var appInstance = new App();
    return appInstance;
})();
application.start();