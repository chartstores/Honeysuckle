/*对象、状态/行为、属性*/
function App(){
    var _self = this;
    _self.isPaper=(function(){
        appConfig.canvas=util.$$(appConfig.container);
        appConfig.canvas.width = window.innerWidth;
        appConfig.canvas.height = window.innerHeight;

        if (!appConfig.canvas.getContext) {
            return false;
        }
        appConfig.context = appConfig.canvas.getContext('2d');
        return true;
    })();
}
//铺好布局，一切就绪，将开始游戏
App.prototype.init=function(){
    var _self = this;
    if(!appConfig.isShowDebugInfo){
        $$("debug-tool").style.display="none";
    }
    if(_self.isPaper){
        _self.game= new Game();
        _self.game.start();
    }
};

var application=(function () {
    var appInstance = new App();
    return appInstance;
})();
application.init();