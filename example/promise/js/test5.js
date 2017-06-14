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