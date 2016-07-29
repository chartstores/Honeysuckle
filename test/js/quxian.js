/**
 * Created by Administrator on 2016/7/13.
 * author yaoqianfeng
 */

    //画圆+线连接
(function(){
    var canvas=document.getElementById("myCanvas3");
    var context=canvas.getContext("2d");

    var chartObj={
        chart:{
            margin:10,
            padding:10,
            scale:{
                w:null,
                h:null
            }
        },
        line:{
            color:"#f99027",
            lineWidth:1,
            circle:{
                borderWidth:2,
                borderColor:"#93c1c",
                fillColor:"rgba(90,169,120,0.5)"
            }
        }
    };

    var width=canvas.width = window.innerWidth-chartObj.chart.margin*2;
    var height=canvas.height = (window.innerHeight-chartObj.chart.margin*2)/2;

    //伸缩比例
    chartObj.chart.scale.w =width/20;
    chartObj.chart.scale.h=1;

    canvas.strokeStyle = "red";
    canvas.lineWidth = 5;

    //画20个点+线条+是否填充区域颜色
    var data=[];

    for(var i=0;i<20;i++){
        data.push(randomNum(0,height));
    }
    var coordinate=coordinateMap(data,chartObj.chart.scale);

    //画线
    drawLine(coordinate,chartObj.line);
    //以该点为圆心，画圆
    drawCircle(coordinate,5,chartObj.line.circle);
})();