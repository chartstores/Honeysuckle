function Text(){
    this.gate={
        one:{
            name:'Level1',
            value:'level1',
            startX: Math.round(util.getCoordinateMap(100, 515).x * application.canvas.width),
            startY: Math.round(util.getCoordinateMap(100, 515).y * application.canvas.height),
            moneyCounter:{
                part:{
                    value:0,
                    startX: Math.round(util.getCoordinateMap(250, 620).x * application.canvas.width),
                    startY: Math.round(util.getCoordinateMap(250, 620).y * application.canvas.height),
                },
                all:{
                    value:0,
                    startX: Math.round(util.getCoordinateMap(250, 620).x * application.canvas.width),
                    startY: Math.round(util.getCoordinateMap(250, 620).y * application.canvas.height),
                }
            }
        }
    };
}

Text.prototype.paint=function(txt,value,color,font,textAlign){
    var app=application;
    var name=txt.name;
    var x = txt.startX;
    var y = txt.startY;
    var value=value?value:txt.value||txt.name;
    var w=app.context.measureText(value).width;

    app.context.textAlign=textAlign;
    app.context.font=font?font:"25px Georgia";
    app.context.fillStyle=color?color:'#fff';
    app.context.fillText(value,x,y);
};