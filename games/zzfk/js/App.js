/**
 * Created by Administrator on 2016/8/3.
 * author yaoqianfeng
 */
function app() {
    var _self = this;
}

app.prototype.init = function () {
    /**
     *1、加载网络数据
     *2、加载图片
     *3、初始化画布
     *4、开始游戏
     ***/
    var _self = this;
    if(!appConfig.isShowDebugInfo){
        $$("debug-tool").style.display="none";
    }
    if(_self.initPaper()){
        var touche = new touch();
        touche.eventHandle("add", document, "touchstart", function (e) {
            console.info("touchstart event");
        }, false);
        var g = new game();
        g.start();
    }
};

app.prototype.initPaper = function () {
    appConfig.canvas=$$(appConfig.container);
    appConfig.canvas.width = window.innerWidth;
    appConfig.canvas.height = window.innerHeight;

    if (!appConfig.canvas.getContext) {
        return false;
    }
    appConfig.context = appConfig.canvas.getContext('2d');
    return true;
};

(function () {
    var application = new app();
    application.init();
})();