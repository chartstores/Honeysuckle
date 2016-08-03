/**
 * Created by Administrator on 2016/8/3.
 * author yaoqianfeng
 */
function app(){
    var _self=this;
}

app.prototype.init=function(){
    /**
     *1、加载网络数据
     *2、加载图片
     *3、初始化画布
     *4、开始游戏
    **/
    var touche=new touch();
    touche.eventHandle("add",document,"touchstart",function(){
        console.info("touchstart event");
    },false);
    var g=new game();
    g.start();
};

(function(){
    var application=new app();
    application.init();
})();
(function(){

})();