function Text(){

    this.counter={
        counterA:{
            name: 'label-counter',
            value:'123500',
            startX: Math.round(util.getCoordinateMap(90, 34).x * application.canvas.width),
            startY: Math.round(util.getCoordinateMap(90, 34).y * application.canvas.height)
        }
    };

    this.rank={
        name: '排行榜',
        startX: Math.round(util.getCoordinateMap(322, 32).x * application.canvas.width),
        startY: Math.round(util.getCoordinateMap(322, 32).y * application.canvas.height),
    };

    this.timer={
        topRight:{
            name:'19s',
            value:'19s',
            startX: Math.round(util.getCoordinateMap(335, 55).x * application.canvas.width),
            startY: Math.round(util.getCoordinateMap(335, 55).y * application.canvas.height)
        }
    };

    this.gate={
        one:{
            name:'Level1',
            value:'level1',
            startX: Math.round(util.getCoordinateMap(130, 515).x * application.canvas.width),
            startY: Math.round(util.getCoordinateMap(130, 515).y * application.canvas.height),
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
        },
        two:{

        },
        three:{

        },
        four:{

        }
    };
}

Text.prototype.paint=function(obj,value,color,font,textAlign){
    var app=application;
    var name=obj.name;
    var x = obj.startX;
    var y = obj.startY;
    var value=value?value:obj.value;
    var w=app.context.measureText(value).width;

    app.context.textAlign=textAlign;
    app.context.font=font?font:"25px Arial";
    app.context.fillStyle=color?color:'#fff';
    app.context.fillText(value,x,y);
};