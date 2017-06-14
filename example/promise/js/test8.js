//#8 为多个操作指定回调函数
$.when($.ajax("test1.html"), $.ajax("test2.html"))
    .done(function(){ alert("哈哈，成功了！"); })
    .fail(function(){ alert("出错啦！"); });