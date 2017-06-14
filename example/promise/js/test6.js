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