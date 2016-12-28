/*手*/
function Hand() {
    this.hasGoldenHand=false;
    this.handActionStep=0;
    this.handAction="stretch";//stretch伸 shrink-缩
    this.speed=2000;
    this.startX=Math.round(util.getCoordinateMap(750, 780).x * application.canvas.width);//手的初始坐标
    this.startY=Math.round(util.getCoordinateMap(750, 780).x * application.canvas.width);//手的初始坐标
    this.stopX=Math.round(util.getCoordinateMap(225, 780).x * application.canvas.width);//手的目标坐标，由手触摸后控制
    this.stopY=Math.round(util.getCoordinateMap(225, 780).x * application.canvas.width);//手的目标坐标，由手触摸后控制
    this.x=0;
    this.y=0;
    this.status = {
        one: {
            normal: 'normal-hand-a',
            golden: 'golden-hand-a',
            startX: Math.round(util.getCoordinateMap(427, 576).x * application.canvas.width),
            startY: Math.round(util.getCoordinateMap(427, 576).y * application.canvas.height)
        },
        two: {
            normal: 'normal-hand-b',
            golden: 'golden-hand-b',
            startX: Math.round(util.getCoordinateMap(280, 516).x * application.canvas.width),
            startY: Math.round(util.getCoordinateMap(280, 516).y * application.canvas.height)
        },
        three: {
            normal: 'normal-hand-b',
            golden: 'golden-hand-b',
            normalSwollen:'normal-hand-swollen',
            goldenSwollen:'golden-hand-notswollen',
            startX: Math.round(util.getCoordinateMap(170, 426).x * application.canvas.width),
            startY: Math.round(util.getCoordinateMap(170, 426).y * application.canvas.height)
        },
        four: {
            normal: 'normal-hand-b',
            golden: 'golden-hand-b',
            normalCatch:'normal-hand-c',
            goldenCatch:'golden-hand-c',
            startX: Math.round(util.getCoordinateMap(180, 596).x * application.canvas.width),
            startY: Math.round(util.getCoordinateMap(180, 596).y * application.canvas.height)
        },
        five: {
            normal: 'normal-hand-b',
            golden: 'golden-hand-b',
            normalCatch:'normal-hand-c',
            goldenCatch:'golden-hand-c',
            startX: Math.round(util.getCoordinateMap(310,736).x * application.canvas.width),
            startY: Math.round(util.getCoordinateMap(310,736).y * application.canvas.height)
        },
        six: {
            normal: 'normal-hand-b',
            golden: 'golden-hand-b',
            normalCatch:'normal-hand-c',
            goldenCatch:'golden-hand-c',
            startX: Math.round(util.getCoordinateMap(430,806).x * application.canvas.width),
            startY: Math.round(util.getCoordinateMap(430,806).y * application.canvas.height)
        },
        seven: {
            normal: 'normal-hand-b',
            golden: 'golden-hand-b',
            normalCatch:'normal-hand-c',
            goldenCatch:'golden-hand-c',
            startX: Math.round(util.getCoordinateMap(470,856).x * application.canvas.width),
            startY: Math.round(util.getCoordinateMap(470,856).y * application.canvas.height)
        },
        eight: {
            normal: 'normal-hand-b',
            golden: 'golden-hand-b',
            normalCatch:'normal-hand-c',
            goldenCatch:'golden-hand-c',
            startX: Math.round(util.getCoordinateMap(470,856).x * application.canvas.width),
            startY: Math.round(util.getCoordinateMap(470,856).y * application.canvas.height)
        }
    };
    this.count={
        name:"手套计数",
        value:0,
        startX: Math.round(util.getCoordinateMap(470,856).x * application.canvas.width),
        startY: Math.round(util.getCoordinateMap(470,856).y * application.canvas.height)
    };
}

//行为-伸、缩
Hand.prototype.moving = function (modifier) {
    var _self=this;
    var gloveStyle=_self.hasGoldenHand?'golden':'normal';
    var handStatu = ['one', 'two', 'three', 'four', 'five', 'six', 'seven','eight'];//手的步骤状态
    var gap = Math.round((_self.startX - _self.stopX) / handStatu.length);
    var x= _self.x = _self.startX-gap;
    var y= _self.y = _self.startY;

    if(_self.handActionStep >7){
        _self.handActionStep=0;
    }else{
        if(_self.handAction=='stretch'){//伸
            if (x > _self.stopX) {
                if ((_self.stopX+3*gap) < x && x <= (_self.stopX+4*gap)) {
                    _self.handActionStep = 0;
                    console.info("状态1");
                    console.log(x,y);
                } else if ((_self.stopX+2*gap )< x && x <= (_self.stopX+3*gap)) {
                    _self.handActionStep = 1;
                    console.info("状态2");
                    console.log(x,y);
                } else if ((_self.stopX+gap )< x && x <= (_self.stopX+2*gap)) {
                    _self.handActionStep = 2;
                    console.info("状态3");
                    console.log(x,y);
                } else if (_self.stopX < x && x <= (_self.stopX+gap)) {
                    _self.handActionStep = 3;
                    console.info("状态4");
                    console.log(x,y);
                }
                x=_self.x = _self.x - _self.speed * modifier;
            } else if (x <= _self.stopX) {
                x=_self.x = _self.stopX;
                _self.handAction='shrink';
            }

        }else if(_self.handAction=='shrink'){//缩
            if (x > _self.stopX) {
                if (_self.stopX < x && x <= gap) {
                    _self.handActionStep = 4;
                    console.info("状态5");
                    console.log(x,y);
                } else if ((_self.stopX+gap) < x && x <= (_self.stopX+2*gap)) {
                    _self.handActionStep = 5;
                    console.info("状态6");
                    console.log(x,y);
                } else if ((_self.stopX+2*gap) < x && x <= (_self.stopX+3*gap)) {
                    _self.handActionStep = 6;
                    console.info("状态7");
                    console.log(x,y);
                }else if ((_self.stopX+3*gap) < x && x <= (_self.stopX+4*gap)) {
                    _self.handActionStep = 7;
                    console.info("状态8");
                    console.log(x,y);
                }
                x=_self.x = _self.x + _self.speed * modifier;
            } else if (x <= _self.stopX) {
                x=_self.x = _self.stopX;
                _self.handAction='stretch';
            }
        }
        _self.paint(_self.status[handStatu[_self.handActionStep]][gloveStyle],x,y);
        _self.handActionStep++;
    }

    // if(_self.hasGoldenHand){
    //     if(step>2&&_self.isCatchMoney){
    //         _self.hand.paint(_self.hand.status[strMap[step]],'goldenCatch',{},{});
    //     }else{
    //         _self.hand.paint(_self.hand.status[strMap[step]],'golden',{},{});
    //     }
    // }else{
    //     if(step>2&&_self.isCatchMoney) {
    //         _self.hand.paint(_self.hand.status[strMap[step]], 'normalCatch', {}, {});
    //     }else{
    //         _self.hand.paint(_self.hand.status[strMap[step]], 'normal', {}, {});
    //     }
    // }
};

//工具方法
Hand.prototype.paint=function(name,x,y){
    var myImage = util.$$(name);//各个阶段show各个阶段的money形状
    var width = Math.round(myImage.width * appConfig.prop);
    var height = Math.round(myImage.height * appConfig.prop);
    application.context.drawImage(myImage, x, y, width, height);
};


Hand.prototype.addGloves = function () {

};