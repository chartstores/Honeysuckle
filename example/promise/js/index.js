//#1 函数参数的类型

function foo(a,b,c){
    console.log("a="+a,"b="+b,"c="+c);
}

foo(1,2,3);

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

//#7 什么是promise？

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
        promise.done(function(){
            console.log("成功了");
        },function(){
            console.log("失败了");
        });
    })(i);
}


//#8 自我实现的一个promise



