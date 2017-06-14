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