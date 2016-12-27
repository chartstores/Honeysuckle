/*按钮*/
function Button() {
    this.coordinates = [];//存放按钮信息
    this.btnEventCount = 0;
    this.firTime = 0;
    this.index = {
        start: {
            name: 'index-btn1',
            startX: Math.round(util.getCoordinateMap(160, 810).x * application.canvas.width),
            startY: Math.round(util.getCoordinateMap(160, 810).y * application.canvas.height),
            rect: []
        }
    };
    this.gateList = {
        gateCoin: {
            one: {
                name: 'gate-coin-one',
                enabled: true,
                enabledName: 'gate-coin-one-enabled',
                startX: Math.round(util.getCoordinateMap(300, 1020).x * application.canvas.width),
                startY: Math.round(util.getCoordinateMap(300, 1020).y * application.canvas.height),
                shadow: {
                    name: 'shadow',
                    startX: Math.round(util.getCoordinateMap(320, 1229).x * application.canvas.width),
                    startY: Math.round(util.getCoordinateMap(320, 1229).y * application.canvas.height)
                },
                starshine: {
                    name: 'starshine',
                    startX: Math.round(util.getCoordinateMap(335, 1060).x * application.canvas.width),
                    startY: Math.round(util.getCoordinateMap(335, 1060).y * application.canvas.height)
                }
            },
            two: {
                name: 'gate-coin-two',
                enabled: false,
                enabledName: 'gate-coin-two-enabled',
                startX: Math.round(util.getCoordinateMap(515, 852).x * application.canvas.width),
                startY: Math.round(util.getCoordinateMap(515, 852).y * application.canvas.height),
                shadow: {
                    name: 'shadow',
                    startX: Math.round(util.getCoordinateMap(521, 1005).x * application.canvas.width),
                    startY: Math.round(util.getCoordinateMap(521, 1005).y * application.canvas.height)
                },
                starshine: {
                    name: 'starshine',
                    startX: Math.round(util.getCoordinateMap(521, 785).x * application.canvas.width),
                    startY: Math.round(util.getCoordinateMap(521, 785).y * application.canvas.height)
                }
            },
            three: {
                name: 'gate-coin-three',
                enabled: false,
                enabledName: 'gate-coin-three-enabled',
                startX: Math.round(util.getCoordinateMap(138, 706).x * application.canvas.width),
                startY: Math.round(util.getCoordinateMap(138, 706).y * application.canvas.height),
                shadow: {
                    name: 'shadow',
                    startX: Math.round(util.getCoordinateMap(138, 860).x * application.canvas.width),
                    startY: Math.round(util.getCoordinateMap(138, 860).y * application.canvas.height)
                },
                starshine: {
                    name: 'starshine',
                    startX: Math.round(util.getCoordinateMap(158, 636).x * application.canvas.width),
                    startY: Math.round(util.getCoordinateMap(158, 636).y * application.canvas.height)
                }
            },
            four: {
                name: 'gate-coin-four',
                enabled: false,
                enabledName: 'gate-coin-four-enabled',
                startX: Math.round(util.getCoordinateMap(540, 375).x * application.canvas.width),
                startY: Math.round(util.getCoordinateMap(540, 375).y * application.canvas.height),
                shadow: {
                    name: 'shadow',
                    startX: Math.round(util.getCoordinateMap(530, 530).x * application.canvas.width),
                    startY: Math.round(util.getCoordinateMap(530, 530).y * application.canvas.height)
                },
                starshine: {
                    name: 'starshine',
                    startX: Math.round(util.getCoordinateMap(550, 306).x * application.canvas.width),
                    startY: Math.round(util.getCoordinateMap(550, 306).y * application.canvas.height)
                }
            },
            what: {
                name: 'gate-coin-what',
                startX: Math.round(util.getCoordinateMap(130, 139).x * application.canvas.width),
                startY: Math.round(util.getCoordinateMap(130, 139).y * application.canvas.height),
                shadow: {
                    name: 'shadow',
                    startX: Math.round(util.getCoordinateMap(137, 300).x * application.canvas.width),
                    startY: Math.round(util.getCoordinateMap(137, 300).y * application.canvas.height)
                }
            }
        }
    };
    this.rank = {
        name: 'label-rank',
        startX: Math.round(util.getCoordinateMap(511, 22).x * application.canvas.width),
        startY: Math.round(util.getCoordinateMap(511, 22).y * application.canvas.height)
    };
    this.back = {
        index: {
            name: 'index-btn2',
            startX: Math.round(util.getCoordinateMap(160, 1015).x * application.canvas.width),
            startY: Math.round(util.getCoordinateMap(160, 1015).y * application.canvas.height)
        },
        gateList: {
            name: 'btn-back-gate',
            startX: Math.round(util.getCoordinateMap(34, 1190).x * application.canvas.width),
            startY: Math.round(util.getCoordinateMap(34, 1190).y * application.canvas.height)
        },
        rankPage: {
            name: 'btn-rank-back',
            startX: Math.round(util.getCoordinateMap(33, 1198).x * application.canvas.width),
            startY: Math.round(util.getCoordinateMap(33, 1198).y * application.canvas.height)
        }
    };
}

/*渲染图片按钮*/
Button.prototype.paint = function (btn, w, h) {
    var _self = this;
    var myImage = util.$$(btn.name);
    var x = btn.startX;
    var y = btn.startY;
    var width = w ? w : Math.round(myImage.width * appConfig.prop);
    var height = h ? h : Math.round(myImage.height * appConfig.prop);

    application.context.drawImage(myImage, x, y, parseInt(width), parseInt(height));
    $("#debug-info").html(x+","+y+","+parseInt(width)+","+parseInt(height));
    _self.coordinates.push(btn.name, x, y, width, height);
};

/*
 * 渲染阴影、星光、效果
 * */
Button.prototype.paintOther = function (objectArr) {
    var _self = this;
    var myImage, x, y, width, height;
    for (var i = 0; i < objectArr.length; i++) {
        myImage = util.$$(objectArr[i].name);
        x = objectArr[i].startX;
        y = objectArr[i].startY;
        width = Math.round(myImage.width * appConfig.prop);
        height = Math.round(myImage.height * appConfig.prop);
        application.context.drawImage(myImage, x, y, width, height);
    }
};

/*绑定点击某个区域,以使某个方法生效*/
Button.prototype.touch = function (toucher,game) {
    var _self = this;
    var fnMap = {
        "index-btn1": function () {
            return game.showGateList(1, "start");
        },
        "index-btn2": function () {
            return game.showGateList(-1, "back");
        },
        "gate-coin-one": function () {
            game.gameNumber=1;
            game.isEnabled=false;
            return game.main();
        },
        "gate-coin-one-enabled": function () {
            game.gameNumber=1;
            game.isEnabled=true;
            return game.main();
        },
        "gate-coin-two": function () {
            game.gameNumber=2;
            game.isEnabled=false;
            return game.main();
        },
        "gate-coin-two-enabled": function () {
            game.gameNumber=2;
            game.isEnabled=true;
            return game.main();
        },
        "gate-coin-three": function () {
            game.gameNumber=3;
            game.isEnabled=false;
            return game.main();
        },
        "gate-coin-three-enabled": function () {
            game.gameNumber=3;
            game.isEnabled=true;
            return game.main();
        },
        "gate-coin-four": function () {
            game.gameNumber=4;
            game.isEnabled=true;
            return game.main();
        },
        "gate-coin-four-enabled": function () {
            game.gameNumber=4;
            game.isEnabled=true;
            return game.main();
        },
        "label-rank": function () {
            return game.rank();
        },
        "btn-back-gate": function () {
            game.gameNumber=1;
            game.isEnabled=false;
            return game.main();
        },
    };
    var btnFn = function (event) {
        if (Date.parse(new Date()) - _self.firTime < 10 && _self.firTime != 0) {
            return;
        } else {
            _self.firTime = Date.parse(new Date());
        }

        x = Number(event.touches[0].pageX) * appConfig.ratio;
        y = Number(event.touches[0].pageY) * appConfig.ratio;

        for (var i = 0; i < _self.coordinates.length; i += 5) {
            if (x > _self.coordinates[i + 1] && x < _self.coordinates[i + 1] + _self.coordinates[i + 3] && y > _self.coordinates[i + 2] && y < _self.coordinates[i + 2] + _self.coordinates[i + 4]) {
                fnMap[_self.coordinates[i]]();//判断
                break;
            }
        }
    };
    if (_self.btnEventCount == 0) {
        toucher.eventHandle('add', document, 'touchstart', btnFn, false);
    }
    _self.btnEventCount++;

    return btnFn;
};
