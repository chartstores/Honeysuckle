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
    _self.gate={
        name:'gate-list-bg',
        startX:0,
        startY:0,
        one:{
            name:'gate-bg-one',
            startX:0,
            startY:0
        },
        two:{
            name:'gate-bg-two',
            startX:0,
            startY:0
        },
        three:{
            name:'gate-bg-three',
            startX:0,
            startY:0
        },
        four:{
            name:'gate-bg-four',
            startX:0,
            startY:0
        },
        bedding:{
            name:'bedding',
            startX:0,
            startY:0,
        }
    };
    _self.rank={
        name:'rank-bg',
        startX:0,
        startY:0
    }
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
