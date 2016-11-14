/*
* 背景
* */
function Background(){

}
/*各个关卡、步骤的背景图片*/
Background.prototype.paint=function(myImage,x,y,width,height){
    application.context.drawImage(myImage,x,y,width,height);
};
