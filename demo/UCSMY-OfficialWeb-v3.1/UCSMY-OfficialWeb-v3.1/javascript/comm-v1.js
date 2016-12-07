/**
 * [description **达到测试状态]
 * @date        2016-09-09
 * @return      {[type]}                 [description]
 */
var COMM = window.COMM || {};

COMM = {
    init: function (){
        var _ts = this;

        _ts.navHover();
        _ts.navliHover();
        _ts.honorSlide();
        _ts.organSlide();
        _ts.countDown(3);
        // _ts.loadmore.init({url:'xxx'});
    },
    navHover : function (){
        var index = 0,
            newcurrentNum = 1,
            $navbar = $('.header .barwp .nav-bar'),
            $headerInner = $('.header-inner'),
            $li = $('.header .nav li'),
            inDex = $li.index($li.filter('.current'));

        $li.mouseenter(function (){
            index = $li.index($(this));
            $li.removeClass('current').eq(index).addClass('current');

            if(index === 0 || index === 4){
                $navbar.removeClass('cur');
            }
            else{
                $navbar.removeClass('cur').eq(index-1).addClass('cur');
            }

        });

        $headerInner.mouseleave(function (){
            $li.removeClass('current').eq(inDex).addClass('current');
            $navbar.removeClass('cur');
        });
    },
    //新头部
    navliHover: function(){
        var _self = this,
            $li = $('.nav li'),
            curr_idx = $('.nav li.current').index();
        $('.new-header li').hover(
            function(){
                if($(this).parents().hasClass('nav')){
                    var index = $(this).index();
                    $li.removeClass('current').eq(index).addClass('current');
                    //子导航
                    var data_h = $('.sub-'+index).data('height');
                    $('.new-sub-nav>li').stop().animate({height: '0px'});
                    $('.sub-'+index).stop().animate({height: data_h+'px'});
                }
            }
        );

        $('.nav').mouseleave(function(){
            var c = $li.removeClass('current');
            if (curr_idx >=0 ) {
                c.eq(curr_idx).addClass('current');
            }
            //$('.new-sub-nav>li').stop().animate({height: '0px'});
        });
    },
    //公司荣誉
    honorSlide : function (){
        var _ts = this,
            touchEl = $('.honor-wrap .box').find('.clickEle'),
            $ul = $('.honor-wrap .list ul'),
            liLength = $ul.find('li').outerWidth(),
            liNum = $ul.find('li').length,
            ulWidth = liLength*liNum;

        $('.main-honor').parent('body').css('min-width','1130px');

        _ts.gotoclick(touchEl,$ul,liNum,liLength);
    },
    gotoclick : function(touchEl,$ul,liNum,liLength){
        var length = Math.ceil(liNum/3-1),
            next = true,//next 按钮
            doneL = false,//初始化，左按钮不可点击
            doneR = true,//初始化，右按钮可点击
            liLen = parseInt(liLength*3) ;
        index = 0,
            inDex = 0,
            $prev = $('.prev'),
            $next = $('.next');

        touchEl.click(function(){
            // 判断点击next 还是 pre
            $(this).hasClass('next') ? next = true : next = false;
            doneR = doneR === true ? true : false;

            if(next && doneR){
                index < length ?  index++ : index = 0;
                index === length ? ( doneR = false, $next.addClass('no_click') ) : doneR = true;
                doneL = true;
                $prev.removeClass('no_click');

            }
            else if( next === false && doneL === true){
                index > 0 ? index-- : index = length  ;
                index === 0 ? ( doneL = false,$prev.addClass('no_click') ) : doneL = true ;
                doneR = true;
                $next.removeClass('no_click');

            }

            if( inDex === index){
                return ;
            }

            inDex = index;
            $ul.stop(true,false).animate({left: -liLen*inDex}, 350);


        });
    },
    //首页 业务布局
    organSlide : function (){
        var _ts = this,
            $box = $('.slide-box'),
            $sli = $('.home .slide-box li'),
            index = 0;


        $sli.hover(function (e){
            if($(e.currentTarget).hasClass('cur')){
                return ;
            }
            index = $sli.index($(e.currentTarget));
            $sli.removeClass('cur').eq(index).addClass('cur');

            $box.removeClass('sl0 sl1 sl2 sl3').addClass('sl'+index);

        });

    },
    // 请求数据
    loadmore: {

        Lock : true,
        dataCache: [],
        page: 2, //初始化
        init: function (Url) {
            var _t = this,
                $btn = $('.add-more'),
                U = Url || '' ;
            if($btn.length >= 1 && typeof U === 'object' && U.url){
                _t.even(U);
            }
        },
        even: function (U) {
            var _t = this,
                $btn = $('.add-more'),
                $el = $btn.prev(),
                _url = U.url,
                lock = _t.Lock,
                length = 5; //每次请求多少数据

            $btn.click($el, function () {

                if(typeof U === 'object' && U.url){
                    _t.Lock = false;
                    _t.getData($el, _url, length, _t.page);
                }
                return ;
            });

        },
        getData: function ($el, _url, length, page) {
            var _t = this,
                data = {length:length,page:page},
                uRl = _url;
            $.ajax({
                url: uRl,
                type: 'get',
                data : data,
                dataType: 'json',
                success: function (ret) {
                    if (typeof ret !== 'undefined' && ret.Code === 200) {
                        _t.dataCache = ret.Data; //缓存数据
                        _t.renderHtml($el, _t.dataCache);
                        _t.page++;
                    }
                },
                error: function () {
                    alert('网络错误，请重新刷新页面！');
                    _t.page--;

                }
            })
        },
        renderHtml: function ($el, dataCache) {
            var _t = this,
                _data = dataCache,
                dataLenth = _data.length,
                $ul = $el, //最新公告
                isNews = false,
                _html = '';

            isNews = $ul.hasClass('layout-box') ? true : false;
            if (dataLenth > 0) {

                if (isNews === true) {
                    for (var i = 0; i < dataLenth; i++) {
                        _html += '<li>\
                                    <div class="f-left layout-img">\
                                        <img src="' + _data[i].imageSrc + '" alt=""/>\
                                    </div>\
                                    <div class="f-left layout-text">\
                                        <p class="time"><i class="point"></i>' + _data[i].time + '</p>\
                                        <p class="title"><a href="' + _data[i].linkUrl + '">' + _data[i].title + '</a></p>\
                                        <p class="context">' + _data[i].detail + '</p>\
                                     </div>\
                                     <div class="clear"></div>\
                                  </li>';

                    }
                }
                else {
                    var month = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
                    for (var i = 0; i < dataLenth; i++) {

                        _html += '<li>\
                                <div class="data">\
                                    <p class="day">' + _data[i].day + '</p>\
                                    <p class="month">' + month[_data[i].month-1] + '</p>\
                                    <p class="year">' + _data[i].year + '</p>\
                                </div>\
                                <a href="' + _data[i].linkUrl + '" class="inner">\
                                    <p class="file-name">' + _data[i].title + '</p>\
                                    <p class="file-text"></p>\
                                </a>';
                        if(_data[i].filepath !== "" && _data[i].filepath != null && _data[i].filepath !== 'null'){
                            _html += '<div class="download">\
                                    <a href="' + _data[i].filepath + '">\
                                        <i class="icon-yun"></i>\
                                        <p>PDF</p>\
                                    </a>\
                                </div>';
                        }
                        _html += '</li>';
                    }
                }

                $ul.append(_html);
                _t.toscrllop();

            }
            else if (dataLenth <= 0) {
                alert('没有更多了哦！');
                _t.page--;
            }

            _t.Lock = true;

        },
        toscrllop: function () {
            var _t = this;
            scrollHeight = $(document).height(),
                scrollTop = $(document).scrollTop(),
                windowHeight = $(window).height(),
                scrltop = scrollHeight - windowHeight;

            $('html,body').stop().animate({ scrollTop: scrltop }, 500);
        }
    },
    countDown : function (num){
        var timeD = null;
        var notfindLenth = $('.notfind').length;

        if(notfindLenth < 1){ return ;}

        clearInterval(timeD);
        timeD = setInterval(function (){
            num--;
            $('.notfind .wrap p span').html(num);
            // console.info(num);
            if(num === 0){
                clearInterval(timeD);
                window.history.go(-1);
            }
        },1000);
    }
};

//入口
$(function(){
    var host = window.location.host;
    if(host !== 'www.ucsmy.com' && host !== 'test.ucsmy.com'){
        //window.location.href = 'http://www.ucsmy.com';
    }
    COMM.init();

    (function () {
        var sup = $('.sub-nav .wrap');
        if (!sup.length) return;
        if (!sup.find('.abs').length){
            sup.append('<p class="abs"></p>')
        }
        var links = sup.find('li'),
            abs = sup.find('.abs'),
            cur = sup.find('.cur'),
            link = null,
            offset = 16,
            width = cur.width(),
            left = cur.position().left + offset;
        if(cur.index() == 0){
            left = cur.position().left;
        }
        abs.css({'width':width, 'left':left,'display':'block'}).fadeIn(300);
        links.hover(hoverOn, hoverOut);
        function hoverOn() {
            link = $(this);
            if(!link.hasClass("cur")){
                cur.find("a").css({"color":"#999"});
            }
            if(link.index() == 0){
                control(link.width(), link.position().left);
            }else{
                control(link.width(), link.position().left + offset);
            }
        }
        function hoverOut() {
            cur.find("a").css({"color":""});
            control(width, left);
        }
        function control(width, left) {
            abs.stop().animate({"width":width, "left":left}, 300);
        }
    }());
});

/*页面不够高，底部绝对定位*/
function globalResize(){
    var _h = $(window).height();
    if($("body").height() < _h){
        $('.footer').css({
            position: 'absolute',
            bottom: '0'
        })
    }else{
        $('.footer').css({
            position: 'static'
        })
    }
}