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