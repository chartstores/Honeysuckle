/**
 * 屏幕界面区域绑定处理事件
 */
function Toucher(){

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
