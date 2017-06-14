//#11 普通操作的回调函数接口-3
$.Deferred(wait)
    .done(function(){ alert("哈哈，成功了！"); })
    .fail(function(){ alert("出错啦！"); });