//#4 有时我们要这样做递归

function foo5(a,b,c,callback){
    //nodejs读写文件，异步模型
    var readStream;

    if(a<10){
        readStream.on("close",function(){
            a++;
            callback(a,b,c,foo5);
        });
    }
}

foo5();

//以及这样的callback
var fs = require('fs');
fs.readFile('sample01.txt', 'utf8', function (err, data) {
    fs.readFile('sample02.txt', 'utf8', function (err,data) {
        fs.readFile('sample03.txt', 'utf8', function (err, data) {
            fs.readFile('sample04.txt', 'utf8', function (err, data) {

            });
        });
    });
});