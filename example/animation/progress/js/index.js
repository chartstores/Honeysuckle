$(function(){
    var rate=0;
    var loaderBar=$("#js-pjax-loader-bar .progress");
    var timer=setInterval(function(){
        if(rate==100){
            clearInterval(timer);
            rate=0;
            $("#js-pjax-loader-bar").css({'opacity':0});
        }
        if(rate==0){
            $("#js-pjax-loader-bar").css({'opacity':1});
        }

        loaderBar.css({'transition':'width 0.4s ease 0s','width':rate+'%'});
        rate++;
    },1000);
});