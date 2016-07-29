/**
 * Created by Administrator on 2016/7/13.
 * author yaoqianfeng
 */
//获取、处理数据
//随机数
function randomNum(Min,Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Math.round(Rand * Range));
}

//转换成二维坐标数组
function coordinateMap(data,scale){
    var coordinate=[];
    if(data){
        for(var i=0;i<data.length;i++){
            coordinate.push([i*scale.w,data[i]*scale.h]);
        }
        return coordinate;
    }else{
        return [];
    }
}