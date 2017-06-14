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