/*对象、状态/行为、属性*/
function App(){
    var _self = this;
    _self.canvas=null;
    _self.context=null;
    _self.isPaper=false;
    _self.prop=0;
}
//铺好布局，一切就绪，将开始游戏
App.prototype.init=function(){
    var _self = this;
    if(!appConfig.isShowDebugInfo){
        $$("debug-tool").style.display="none";
    }
    //初始化画布
    _self.isPaper=(function(){
        _self.canvas=util.$$(appConfig.container);
        _self.canvas.width = window.innerWidth;
        _self.canvas.height = window.innerHeight;

        if (!_self.canvas.getContext) {
            return false;
        }
        _self.context = _self.canvas.getContext('2d');
        return true;
    })();

    //加载资源文件
    var loader=new Loader();
    loader.loadingImage({
        url: function () {
            return loader.getUrl();
        },
        oncomplete: function (s) {
            loader.loadingEffect(s);
        },
        complete: function (imgs, s) {
            if (s.total == s.load + s.error) {
                var $image = util.$$("index-bg");
                appConfig.prop = (application.canvas.width / $image.width)*1.66;//首页设计稿尺寸是1242×2016，其他页是750×1334

                if(_self.isPaper){
                    _self.game= new Game();
                    _self.game.start();
                }
            }
        }
    });
};

var application=(function () {
    var appInstance = new App();
    return appInstance;
})();
application.init();