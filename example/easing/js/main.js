var a= 2,b=3;//系数
var canvas,context,point=new Point();
var easing = 0.005;
$(function(){
    $("canvas").each(function(i){
        var canvas=this;
        context=canvas.getContext("2d");
        var axis=new Axis(canvas,context);
        axis.draw();
    });

    $("dl dd .btn").live({
        "click":function(event){
            var _self=this;
            var type=$(_self).attr("line-type");
            var canvas=document.getElementById("line-"+type);
            var center={x:Math.round(canvas.clientWidth/2),y:Math.round(canvas.clientHeight/2)};
            var length=utils.getMin(canvas.clientWidth,canvas.clientHeight);//372
            switch(type){
                case "a"://y=ax+b
                    point.startX=center.x-length/2;
                    point.startY=center.y+length/2-b;
                    point.targetX = center.x+length/2;
                    point.targetY = center.y-length/2;

                    point.x=point.startX;
                    point.y=point.startY;
                    drawAnimate();
                    break;
                case "b":
                    console.log(type);
                    break;
                case "c":
                    console.log(type);
                break;
                case "d":
                    console.log(type);
                break;
                case "e":
                    console.log(type);
                break;
                case "f":
                    console.log(type);
                break;
                case "g"://y=x
                    /*point.startX=center.x-length/2;
                    point.startY=center.y+length/2;
                    point.targetX = center.x+length/2;
                    point.targetY = center.y-length/2;*/

                    point.startX=utils.coordinateTransfer(-length/2,-length/2,center).cx;
                    point.startY=utils.coordinateTransfer(-length/2,-length/2,center).cy;
                    point.targetX=utils.coordinateTransfer(length/2,length/2,center).cy;
                    point.targetY=utils.coordinateTransfer(length/2,length/2,center).cy;

                    point.x=point.startX;
                    point.y=point.startY;
                    drawAnimate();
                    break;
                case "h"://y=-x
                    point.startX=center.x-length/2;
                    point.startY=center.y-length/2;
                    point.targetX = center.x+length/2;
                    point.targetY = center.y+length/2;

                    point.x=point.startX;
                    point.y=point.startY;
                    drawAnimate();
                    break;
                case "i":
                    console.log(type);
                break;
            }
        }
    });
});
function drawAnimate(){
    var stopAni =window.requestAnimationFrame(drawAnimate, canvas);
    //context.clearRect(0, 0, canWid, canHei);//清除点
    var dx = point.targetX - point.x;
    var vy = (point.targetY - point.y)*easing;
    if(Math.abs(dx)<1){
        //停止动画
        window.cancelAnimationFrame(stopAni);
        console.info("停止动画");
    }else{
        var vx=dx*easing;
        point.x += vx;
        point.y += vy;
    }
    point.draw(context);
}

