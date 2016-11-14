/*
* 背景
* */
function Background(){
    var _self=this;
    _self.index={
        name:'index-bg',
        startX:0,
        startY:0
    };
    _self.list={
        one:{
            name:'gate-list-show-one',
            startX:0,
            startY:0
        },
        two:{
            name:'gate-list-show-one',
            startX:0,
            startY:0
        },
        three:{
            name:'gate-list-show-one',
            startX:0,
            startY:0
        },
        four:{
            name:'gate-list-show-one',
            startX:0,
            startY:0
        }

    };
}
/*各个关卡、步骤的背景图片*/
Background.prototype.paint=function(bg,w,h){
    var _self=this;
    var myImage = util.$$(bg.name);
    var x = bg.startX;
    var y = bg.startY;
    var width = w?w:Math.round(myImage.width*appConfig.prop);
    var height = h?h:Math.round(myImage.height*appConfig.prop);

    application.context.drawImage(myImage,x,y,width,height);
};
