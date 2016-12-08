/*手*/
function Hand() {
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
        }
    };
    this.count={
        name:"手套计数",
        startX: Math.round(util.getCoordinateMap(470,856).x * application.canvas.width),
        startY: Math.round(util.getCoordinateMap(470,856).y * application.canvas.height)
    };
}

//工具方法
Hand.prototype.paint = function (statu, name, position,rect) {
    var _self = this;
    var myImage = util.$$(statu[name]);
    var x = statu.startX;
    var y = statu.startY;
    var width = rect.w ? rect.w : Math.round(myImage.width * appConfig.prop);
    var height = rect.h ? rect.h : Math.round(myImage.height * appConfig.prop);

    application.context.drawImage(myImage, x, y, width, height);
};

//行为-伸、缩
Hand.prototype.move = function () {

};

Hand.prototype.addGloves = function () {

};