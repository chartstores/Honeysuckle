/**
 * Created by duhuiling on 2016/8/18.
 * author duhuiling
 */
/*轮播插件*/
function slider(elem, args){
    this.config = $.extend({
            "effect": 'x',//效果  水平 - x | 垂直 - y | 渐隐 - fade | 隐藏 - none
            "speed": 600,//动画速度
            "space": 5000,//时间间隔
            "auto": true,//自动滚动
            "trigger": 'mouseenter',//触发事件
            "content_box": '.banner-list',//内容容器id或class
            "content_tag": 'li',//内容标签 默认为<li>
            "prev": 'prev',//上一个幅箭头样式名称
            "next": 'next',//下一个幅箭头样式名称
            "rand": false,//是否随机指定默认幻灯页
            "callback": null // 回调函数
            /*
             *TODO  不倒序滚动
             *recycle:true,
             */
        },
        args || {});
    this.el = elem;
    this.init();
}
slider.prototype = {
    "init": function(){
        var opts = this.config;
        var index = 1,
            last_index = 0,
            timer = null;
        var $content_box = this.el.find(opts.content_box),
            $content_tag = $content_box.find(opts.content_tag);

        if (opts.rand){
            index = Math.floor(Math.random() * $content_tag.length);
            slide();
        }
        $content_box.after("<div class='switchers'><ul></ul></div>");
        for (var i = 0; i < $content_tag.length; i++){
            var T = $content_tag.eq(i).find("img").attr('alt');
            var html = i == 0 ? '<li class="active"><a></a></li>': '<li><a></a></li>';
            $content_box.next(".switchers").children("ul").append(html);
        }
        var $switcher = $content_box.next(".switchers"),
            $switcher_tag = $switcher.find("li");

        if (opts.effect == 'fade'){
            $.each($content_tag,function(k, v){
                (k === 0) ? ($(this).css({'position': 'absolute','z-index': 9}),$(this).addClass('active')) : ($(this).css({'position': 'absolute','z-index': 1,'opacity': 0}),$(this).removeClass('active'));
            });
        }
        function slide(){
            if (index >= $content_tag.length){index = 0;}
            if (index < 0){index = $content_tag.length - 1;}

            $switcher_tag.removeClass("active").eq(index).addClass("active");

            switch (opts.effect){
                case 'x':
                {
                    $content_box.width($content_tag.length * $content_tag.width());
                    $content_box.stop().animate({left: -parseFloat($content_tag.width()) * index},opts.speed);
                }
                    break;
                case 'y':
                {
                    $content_tag.css("display", 'block');
                    $content_box.stop().animate({"top": -parseFloat($content_tag.height()) * index},opts.speed);
                }
                    break;
                case 'fade':
                {
                    $content_tag.eq(last_index).stop().animate({'opacity':0},
                        opts.speed / 2).css('z-index', 1).removeClass('active').end().eq(index).css('z-index', 9).addClass('active').stop().animate({'opacity': 1},
                        opts.speed / 2);
                }
                    break;
                case 'none':
                {$content_tag.hide().eq(index).show();}
                    break;
            }
            last_index = index;
            index++;
            // 是否有回调函数
            if (typeof opts.callback === 'function'){opts.callback.call(this);}
        }

        opts.trigger = opts.trigger === 'mouseover' || opts.trigger === 'hover' ? "mouseenter": opts.trigger;

        // 标签切换按钮
        $switcher_tag.on(opts.trigger,
            function(){
                pause();
                index = $(this).index();
                slide();
                _continue();
            });
        // 左右箭头
        this.el.find('.arrow').on("click",
            function(evt){
                pause();
                if (!evt){evt = window.event;}
                var prev_side = (evt.target.className).indexOf(opts.prev),
                    next_side = (evt.target.className).indexOf(opts.next);
                if (prev_side > 0){index = last_index - 1;slide();}
                if (next_side > 0){slide();}
                _continue();
            });

        if (opts.auto){timer = setInterval(slide, opts.space);}	// 是否自动
        $content_box.hover(pause, _continue);	// 触发悬停事件
        function pause(){clearInterval(timer);}	// 暂停
        function _continue(){if (opts.auto){timer = setInterval(slide, opts.space);}	// 继续
        }
    }
};
$.fn.slider = function(args){
    return this.each(function(){
        var $el = $(this);
        var plugins = new slider($el, args);
        $el.data("slider", plugins);
    });
};
/*轮播插件*/

var newInit = {
    blockHover: function(){
        $('a.border').hover(
            function(){
                var $this = $(this),
                    hover = $this.find('div.move-box').data('hover');
                $this.find('div.move-box').stop().animate({top: hover + 'px'});
            },
            function(){
                var $this = $(this),
                    a_height = $this.height(),
                    top_height = a_height - 89;
                $this.find('div.move-box').stop().animate({top: top_height+'px'});
            }
        );
    },
    reSize: function(){
        reset();
        $(window).resize(function(){
            reset();
        });
        function reset(){
            //$('.dot').dotdotdot();

            //隐藏、显示水平滚动条
            if($(window).width() > 1000){
                $('body').css({'overflow':'hidden'});
            }else{
                $('body').css({'overflow':'auto'});
            }

            var sm = 0;
            if($('body').height() <= 756){  //笔记本小屏幕
                $('.move-box:not(:last) p').addClass('over-hide');
                sm = 15 - $('.move-box p').css("marginTop").replace('px', '');
            }else{
                $('.move-box:not(:last) p').removeClass('over-hide');
            }

            $('a.border').each(function(idx,val){
                var $this = $(this),
                    a_height = $this.height(),
                    mbox_h = $this.find('p').height() + 109 - sm,     //109为p的高度和margin+h2,h4高度+movebox的margin
                    top_height = a_height - 89;     //89为movebox的margin-top+h2,h4高度+p的margin-top
                $this.find('div.move-box').css({top: top_height + 'px'});      //设置初始top值

                var top_hover = a_height - mbox_h;
                if(top_hover >= -20){
                    $this.find('div.move-box').data('hover',top_hover / 2);
                }else{
                    $this.find('div.move-box').data('hover',-10).height(a_height - 20);
                }
            });

        }
    },
    init: function(){
        var _self = this;
        _self.blockHover();
        _self.reSize();

        $(".banner-index").slider({"effect":'fade',"space":5000});
    }
}

$(function(){
    newInit.init();
})