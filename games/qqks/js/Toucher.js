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
    },1000);
};

//解绑事件
// if(!_self.isEnabled){
//     //中途由于碰到锤子，被迫停止
//     // alert("sorry,你还没有权限通往第"+number+"关");
//
// }

//检测碰撞
Toucher.prototype.checkCollisions=function(){
    // console.info("检测碰撞");
    var _self=this;
    var hammerRect=application.game.hammer.rect;
    var moneyRect=application.game.money.rect;
    var handRect=application.game.hand.rect;

    //锤子和手
    var flagA=_self.boxCollides(
        [hammerRect.x,hammerRect.y],
        [hammerRect.width,hammerRect.height],
        [handRect.x,handRect.y],
        [handRect.width,handRect.height]
    );
    // console.log(flagA);
    if(flagA){
        application.game.isRunning=false;
        application.game.layer.fail();
    }

    //手和钱
    var flagB=_self.boxCollides(
        [handRect.x,handRect.y],
        [handRect.width,handRect.height],
        [moneyRect.x,moneyRect.y],
        [moneyRect.width,moneyRect.height]
    );
    // console.log(flagB);
    if(flagA&&flagB){
        console.log("抢到钱咯");
    }
    //撞到钱继续+加分、撞到锤子结束+不加不减
    //判断显示何种弹窗
    // application.game.showStatic('success');
    // util.saveImage();
};

//返回两个物体的边界
Toucher.prototype.boxCollides=function(pos, size, pos2, size2) {
    return this.collides(pos[0], pos[1],
        pos[0] + size[0], pos[1] + size[1],
        pos2[0], pos2[1],
        pos2[0] + size2[0], pos2[1] + size2[1]);
};

//判断是否碰撞
Toucher.prototype.collides=function(x, y, r, b, x2, y2, r2, b2) {
    return !(r <= x2 || x > r2 ||
    b <= y2 || y > b2);
};
