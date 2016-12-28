/*手*/
function Hand() {
    this.hasGoldenHand=false;
    this.handActionStep=0;
    this.handAction="stretch";//stretch伸 shrink-缩
    this.speedX=2500;
    this.speedY=2500;
    this.defaultX=Math.round(util.getCoordinateMap(590, 1080).x * application.canvas.width);//手的初始坐标
    this.defaultY=Math.round(util.getCoordinateMap(590, 1080).y * application.canvas.width);//手的初始坐标
    this.targetX=Math.round(util.getCoordinateMap(115, 400).x * application.canvas.width);//手的目标坐标，由手触摸后控制
    this.targetY=Math.round(util.getCoordinateMap(115, 400).y * application.canvas.width);//手的目标坐标，由手触摸后控制
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
    var gap = Math.round((application.canvas.width - _self.targetX) / handStatu.length)*2;
    var x;
    var y= _self.defaultY;
    if(_self.handActionStep >7){
        _self.handActionStep=0;
    }else{
        _self.x+=_self.speedX * modifier;
        _self.y+=_self.speedY * modifier;
        if(_self.handAction=='stretch'){//伸
            x=application.canvas.width-_self.x;
            if (x > _self.targetX) {
                if ((_self.targetX+3*gap) < x && x <= (_self.targetX+4*gap)) {
                    _self.handActionStep = 0;
                } else if ((_self.targetX+2*gap )< x && x <= (_self.targetX+3*gap)) {
                    _self.handActionStep = 1;
                } else if ((_self.targetX+gap )< x && x <= (_self.targetX+2*gap)) {
                    _self.handActionStep = 2;
                } else if (_self.targetX < x && x <= (_self.targetX+gap)) {
                    _self.handActionStep = 3;
                }
            }
            _self.paint(_self.status[handStatu[_self.handActionStep]][gloveStyle],x,y);
            if (x <= _self.targetX) {
                _self.x=0;
                _self.handAction='shrink';
            }
        }else if(_self.handAction=='shrink'){//缩
            x=_self.targetX+_self.x;
            if (x > _self.targetX&&x<application.canvas.width) {
                if (_self.targetX < x && x <= gap) {
                    _self.handActionStep = 4;
                } else if ((_self.targetX+gap) < x && x <= (_self.targetX+2*gap)) {
                    _self.handActionStep = 5;
                } else if ((_self.targetX+2*gap) < x && x <= (_self.targetX+3*gap)) {
                    _self.handActionStep = 6;
                }else if ((_self.targetX+3*gap) < x && x <= (_self.targetX+4*gap)) {
                    _self.handActionStep = 7;
                    application.game.toucher.isHandMoving=false;
                }
            }
            _self.paint(_self.status[handStatu[_self.handActionStep]][gloveStyle],x,y);
            if (x > _self.targetX&&x>=application.canvas.width) {
                _self.x = 0;
                _self.handAction='stretch';
            }
        }
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