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