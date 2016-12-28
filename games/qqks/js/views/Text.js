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
            startX: Math.round(util.getCoordinateMap(665, 192).x * (application.canvas.width/ appConfig.ratio)),
            startY: Math.round(util.getCoordinateMap(665, 192).y * (application.canvas.width/ appConfig.ratio))
        }
    };

    this.gate={
        one:{
            name:'Level1',
            value:'level1',
            startX: Math.round(util.getCoordinateMap(276, 1030).x * (application.canvas.width/ appConfig.ratio)),
            startY: Math.round(util.getCoordinateMap(276, 1030).y * (application.canvas.height/ appConfig.ratio)),
            moneyCounter:{
                now:{
                    value:0,
                    startX: Math.round(util.getCoordinateMap(400, 1270).x * (application.canvas.width/ appConfig.ratio)),
                    startY: Math.round(util.getCoordinateMap(400, 1270).y * (application.canvas.height/ appConfig.ratio)),
                },
                total:{
                    value:0,
                    startX: Math.round(util.getCoordinateMap(400, 1270).x * (application.canvas.width/ appConfig.ratio)),
                    startY: Math.round(util.getCoordinateMap(400, 1270).y * (application.canvas.height/ appConfig.ratio)),
                }
            }
        },
        two:{
            name:'Level2',
            value:'level2',
            startX: Math.round(util.getCoordinateMap(276, 1030).x * (application.canvas.width/ appConfig.ratio)),
            startY: Math.round(util.getCoordinateMap(276, 1030).y * (application.canvas.height/ appConfig.ratio)),
            moneyCounter:{
                now:{
                    value:0,
                    startX: Math.round(util.getCoordinateMap(400, 1270).x * (application.canvas.width/ appConfig.ratio)),
                    startY: Math.round(util.getCoordinateMap(400, 1270).y * (application.canvas.height/ appConfig.ratio)),
                },
                total:{
                    value:0,
                    startX: Math.round(util.getCoordinateMap(400, 1270).x * (application.canvas.width/ appConfig.ratio)),
                    startY: Math.round(util.getCoordinateMap(400, 1270).y * (application.canvas.height/ appConfig.ratio)),
                }
            }
        },
        three:{
            name:'Level3',
            value:'level3',
            startX: Math.round(util.getCoordinateMap(276, 1030).x * (application.canvas.width/ appConfig.ratio)),
            startY: Math.round(util.getCoordinateMap(276, 1030).y * (application.canvas.height/ appConfig.ratio)),
            moneyCounter:{
                now:{
                    value:0,
                    startX: Math.round(util.getCoordinateMap(400, 1270).x * (application.canvas.width/ appConfig.ratio)),
                    startY: Math.round(util.getCoordinateMap(400, 1270).y * (application.canvas.height/ appConfig.ratio)),
                },
                total:{
                    value:0,
                    startX: Math.round(util.getCoordinateMap(400, 1270).x * (application.canvas.width/ appConfig.ratio)),
                    startY: Math.round(util.getCoordinateMap(400, 1270).y * (application.canvas.height/ appConfig.ratio)),
                }
            }
        },
        four:{
            name:'Level4',
            value:'level4',
            startX: Math.round(util.getCoordinateMap(276, 1030).x * (application.canvas.width/ appConfig.ratio)),
            startY: Math.round(util.getCoordinateMap(276, 1030).y * (application.canvas.height/ appConfig.ratio)),
            moneyCounter:{
                now:{
                    value:0,
                    startX: Math.round(util.getCoordinateMap(400, 1270).x * (application.canvas.width/ appConfig.ratio)),
                    startY: Math.round(util.getCoordinateMap(400, 1270).y * (application.canvas.height/ appConfig.ratio)),
                },
                total:{
                    value:0,
                    startX: Math.round(util.getCoordinateMap(400, 1270).x * (application.canvas.width/ appConfig.ratio)),
                    startY: Math.round(util.getCoordinateMap(400, 1270).y * (application.canvas.height/ appConfig.ratio)),
                }
            }
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
    app.context.font=font?font:32*appConfig.ratio+"px Arial";
    app.context.fillStyle=color?color:'#fff';
    app.context.fillText(value,x,y);
};