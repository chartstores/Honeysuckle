/**
 * 屏幕界面区域绑定处理事件
 */
function Toucher(){
    this.speed=256;
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

/*点击屏幕，手势移动*/
Toucher.prototype.moving=function(modifier){
    //检测碰撞

    //解绑事件
    // if(!_self.isEnabled){
    //     //中途由于碰到锤子，被迫停止
    //     // alert("sorry,你还没有权限通往第"+number+"关");
    //     _self.toucher.eventHandle('remove',document,'touchstart', _self.btn.btnFn, false);
    // }
};