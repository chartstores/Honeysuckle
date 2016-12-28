/**
 * 屏幕界面区域绑定处理事件
 */
function Toucher(){
    this.speed=256;
    this.isHandMoving=false;
    this.touchTimer=null;
};
/**
 * 事件处理
 * @param eventType 执行操作
 * @param element 绑定的元素
 * @param eType  事件类型
 * @param handle 事件处理函数
 * @param bol 是否冒泡上浮
 */
Toucher.prototype.eventHandle=function(eventType,element, eType, handle, bol){
    var eventHandle={
        add:function(element, eType, handle, bol) {
            if(element.addEventListener){
                element.addEventListener(eType, handle, bol);
            }else if(element.attachEvent){
                element.attachEvent("on"+eType, handle);
            }else{
                element["on"+eType] = handle;
            }
        },
        remove:function(element, eType, handle, bol) {
            if(element.addEventListener){
                element.removeEventListener(eType, handle, bol);
            }else if(element.attachEvent){
                element.detachEvent("on"+eType, handle);
            }else{
                element["on"+eType] = null;
            }
        }
    };
    eventHandle[eventType](element, eType, handle, bol);
};

//点击一次屏幕，添加一个定时器，在限定时间内可以执行一次抓钱操作
Toucher.prototype.addTriger=function(){
    var _self=this;
    _self.isHandMoving=true;
    clearTimeout(_self.touchTimer);
    _self.touchTimer=setTimeout(function(){
        _self.isHandMoving=false;
    },1000)
};
/*点击屏幕，手势移动*/
Toucher.prototype.moving=function(modifier){
    //检测碰撞

    //解绑事件
    // if(!_self.isEnabled){
    //     //中途由于碰到锤子，被迫停止
    //     // alert("sorry,你还没有权限通往第"+number+"关");
    //
    // }
};

Toucher.prototype.checkCollisions=function(){

};