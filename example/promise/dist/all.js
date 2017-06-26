
//#1 函数参数的类型

function foo(a,b,c){
    console.log("a="+a,"b="+b,"c="+c);
}

foo(1,2,3);
//#10 普通操作的回调函数接口-2
var wait = function(dtd){
    var dtd = $.Deferred(); //在函数内部，新建一个Deferred对象
    var tasks = function(){
        alert("执行完毕！");
        dtd.resolve(); // 改变Deferred对象的执行状态
    };

    setTimeout(tasks,5000);
    return dtd.promise(); // 返回promise对象
};
$.when(wait())
    .done(function(){ alert("哈哈，成功了！"); })
    .fail(function(){ alert("出错啦！"); });
//#11 普通操作的回调函数接口-3
$.Deferred(wait)
    .done(function(){ alert("哈哈，成功了！"); })
    .fail(function(){ alert("出错啦！"); });
//#12 普通操作的回调函数接口-4
//直接在wait对象上部署deferred接口。
//作用就是在wait对象上部署Deferred接口。正是因为有了这一行，后面才能直接在wait上面调用done()和fail()。
var dtd = $.Deferred(); // 生成Deferred对象
var wait = function(dtd){
    var tasks = function(){
        alert("执行完毕！");
        dtd.resolve(); // 改变Deferred对象的执行状态
    };
    setTimeout(tasks,5000);
};
dtd.promise(wait);
wait.done(function(){ alert("哈哈，成功了！"); })
    .fail(function(){ alert("出错啦！"); });
wait(dtd);
//#13 往后发展出了Promise/A、Promise/B、Promise/D

//#14 es6的promise
function runAsync(){
    var p = new Promise(function(resolve, reject){
        //做一些异步操作
        setTimeout(function(){
            console.log('执行完成');
            resolve('随便什么数据');
        }, 2000);
    });
    return p;
}
runAsync();


//# 15 es6和jq中的异同
//jquery
(function(){
    var deferred = $.Deferred();
    var promise = deferred.promise();
})();

//es6
(function(){
    var deferred = Promise.defer();
    var promise= defered.promise;
})();
//#2 我们知道，我们可以在函数中这样调用函数

function foo1(a,b,c){
    console.log("我要调用foo2函数");
    foo2(4,5,6);
}

function foo2(a,b,c){
    console.log("我已经被foo1调用");
}

foo1(1,2,3);
//#3 当输入的参数是函数类型呢？该怎么使用这个参数？使用这个参数后会变成怎样呢？

function foo3(a,b,c,d){
    console.log("我要调用foo4");
    d();
}

function foo4(a,b,c){
    console.log(arguments);
    console.log("我已经被foo3调用了");
}

foo4.apply(this,[4,5,6]);
foo3(1,2,3,foo4);
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
//#5 有时我们遇到这样的情况,响应的顺序不按循环的顺序
for(var i=0;i<10;i++){
    //发送10次ajax异步请求
    (function(index){
        $.ajax({
            url:"data/test.json",
            dataType:"json",
            success:function(res){
                // console.log(res);
                console.log("第"+(index+1)+"次请求");
            }
        });
    })(i);
}
//#6 给我一个承诺好不好，不要不按套路出牌
for(var i=0;i<10;i++){
    //发送10次ajax异步请求
    (function(index){
        var promise=$.ajax({
            url:"data/test.json",
            dataType:"json",
            success:function(res){
                // console.log(res);
                console.log("第"+(index+1)+"次请求");
            }
        });
        console.info("65,"+(index+1));
        console.info(promise);
    })(i);
}
//#7 什么是promise？先执行异步调用，延迟传递处理

var promise=$.ajax({
    url:"data/test.json",
    dataType:"json",
    success:function(res){
        console.log(res);
    }
});
console.log(promise);
promise.done(function(){
    console.log("执行计划1");
},function(){
    console.log("执行计划2");
},function(){
    console.log("执行计划3");
},function(){
    console.log("执行计划4");
},function(){
    console.log("执行计划5");
});

$.get('data/test.json')
    .success(onSuccess)
    .error(onError)
    .complete(onComplete);

function onSuccess(){
    console.log("on success");
}

function onError(){
    console.log("on error");
}

function onComplete(){
    console.log("on complete");
}
//#8 为多个操作指定回调函数
$.when($.ajax("test1.html"), $.ajax("test2.html"))
    .done(function(){ alert("哈哈，成功了！"); })
    .fail(function(){ alert("出错啦！"); });
//#9 普通操作的回调函数接口-1
var wait = function(dtd){
    var tasks = function(){
        alert("执行完毕！");
        dtd.resolve(); // 改变deferred对象的执行状态
    };
    setTimeout(tasks,5000);
    return dtd.promise(); // 返回promise对象
};

var dtd = $.Deferred(); // 新建一个deferred对象
$.when(wait(dtd))
    .done(function(){ alert("哈哈，成功了！"); })
    .fail(function(){ alert("出错啦！"); });