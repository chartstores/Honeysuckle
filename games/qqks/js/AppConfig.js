var appConfig={
    container:"canvas",
    margin:[0,0,0,0],
    //canvas:null,
    //context:null,
    isShowDebugInfo:true,
    passScore:200,
    secondsBetweenFrames:1000/0.5, //频率
    countdown:20*1000,
    horizonGridCount:5,//水平格子数
    verticalGridCount:10,//垂直格子数
    gridMap:[],//格子数组索引,指明那个格子是图片or纯色
    prop:null, //计算canvas上绘图时图片与实际图片的缩放比例
    ratio:null, //图片高清化用的，相当于dpr
    imgSrc:'images/'//图片路径
};