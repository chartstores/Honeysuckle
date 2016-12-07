var win_h = $(window).height();
var h_header = $('.new-header').height();
var st_fixbox = $('#fix-box').offset().top;
var arr_text = [
    '<span class="v-middle"></span>' +
    '<div class="get-height">' +
    '<h4>一站式金融科技解决方案</h4>' +
    '<p>业界首创ICT融合技术，通过私有云、数据建模、移动应用等前沿互联网技术，支撑大交易体系构建，能够快速交付、迭代开发，已为过百家资产千亿级的金融机构提供一站式、全流程的科技解决方案，服务机构数量成倍增长</p>' +
    '<a href="">进一步了解网金控股的科技能力></a>' +
    '</div>',
    '<span class="v-middle"></span>' +
    '<div class="get-height">' +
    '<h4>智能化用户管理与服务机制</h4>' +
    '<p>依托多年来对金融业务和客户的理解与跟踪反馈，能准确把握客户痛点，快速响应客户需求；针对不同类型终端客户提供多样化、便捷化的应用，提升客户体验和服务效率，服务用户数达千万级</p>' +
    '<a href="">进一步了解网金控股的服务能力></a>' +
    '</div>',
    '<span class="v-middle"></span>' +
    '<div class="get-height">' +
    '<h4>云端化交易组织与信息运营</h4>' +
    '<p>基于各类金融业态的广泛联接，建立严格满足金融机构要求的大数据组织及信息运营能力，已为上千家国家级金融机构、大型企业提供运营服务，年度交易规模超万亿</p>' +
    '<a href="">进一步了解网金控股的运营能力></a>' +
    '</div>',
    '<span class="v-middle"></span>' +
    '<div class="get-height">' +
    '<h4>网金控股集团</h4>' +
    '<p>秉承“联接金融，共享未来”的理念，以互联网科技为经--革新体验；以业务形态创新为纬--覆盖全网；以资金融通为纵深--流转高效；三位一体构建金融新生态，与全球金融主体共建共赢，共享创新成果。</p>' +
    '<a href="">进一步了解网金控股集团></a>' +
    '</div>'
];
window.animate = true;
var lock = false,
    k = 0,
    data_act = $('.sec-wrap').data('active'),
    scrollTop = 0,
    currTop = 0;
function modClick(act, ele) {
    var _act = $('.sec-wrap').data('active');
    animate = false;
    $('.sec-wrap').stop(false, true);
    if (_act !== act) {
        $('.sec-wrap').append('' +
            '<div class="section">' + arr_text[act] + '</div>'
        ).animate({
            top: '-100%'
        }, 600, function () {
            $(this).find('.section:first').remove();
            $(this).css({top: '0'});
            animate = true;
        });
    }
    $('.sec-wrap').data('active', act);
    $('.bg-group i').stop().fadeOut();
    $(ele).find('i').stop().fadeIn();
}

var count = 0;
$(function () {
    $('html,body').stop().animate({scrollTop: 0}, 100, function () {
        scrollListen(k);
    });

    var h_mod_cell = win_h - h_header - 154;
    $('.col-right,.bg-map').height(h_mod_cell);
    $('.col-left').css('top', (h_mod_cell - 420) / 2 + 154);

    $('.itop').click(function () {
        modClick(0, this);
    });
    $('.ileft').click(function () {
        modClick(1, this);
    });
    $('.iright').click(function () {
        modClick(2, this);
    });
    $('.imiddle').click(function () {
        modClick(3, this);
        $('.ani-middle').stop().fadeIn();
    });

    function scrollListen(state) {
        var headerHeight = $(".new-header").height() + 1,
            bannerHeight = $(".banner-index").height();

        //第二屏的宽、高
        var middleWidth = $(".wrap-mod").width(),
            middleHeight = $(".wrap-mod").height(),
            pageY = 0;
        var deltaY = 0;
        $("html,body").on('mousewheel', function (event) {
            // console.info(event);
            // console.info(event.pageX,event.pageY);
            // console.log(event.deltaX, event.deltaY, event.deltaFactor);
            pageY = event.pageY;
            deltaY = event.deltaY;
        });

        $(window).on('scroll', function (e) {
            scrollTop = $(this).scrollTop();

            if (scrollTop < 50) {
                $('.switchers').show();
            } else {
                $('.switchers').hide();
            }

            if (deltaY == -1) {//页面向上拉
                if (scrollTop > (bannerHeight - headerHeight - 100) && scrollTop <= (bannerHeight - headerHeight)) {
                    $('html,body').stop().animate({scrollTop: (bannerHeight - headerHeight)}, 50, "linear", function () {
                    });
                }
            } else { //页面向下拉
                if (scrollTop > (bannerHeight - headerHeight) && scrollTop <= (bannerHeight - headerHeight + 100)) {
                    $('html,body').stop().animate({scrollTop: (bannerHeight - headerHeight)}, 50, "linear", function () {
                    });
                }
            }
        });

        //鼠标落点在第二屏
        var trigerMap = {0: ".itop", 1: ".ileft", 2: ".iright", 3: ".imiddle"};
        var timeArr=[],
            lastRunTime = new Date().getTime(),
            nowRunTime;
        var delay=600;
        $('.wrap-mod').on('mousewheel', function (event, delta) {
            // timeArr.push(event.timeStamp);
            // console.info(event);
            //在这个区域鼠标滚动3次前，设置scrollTop的值为第二屏的值;滚动第4次时，跳到第三屏
            if (event.deltaY == -1) {//滚动条往下
                console.info("滚动条往下");
                nowRunTime=new Date().getTime();
                if(nowRunTime- lastRunTime>delay){
                    count++;
                    console.info("第" + count + "次");
                    if (count <= 6) {
                        if(count%2==0){
                            event.preventDefault();
                            $('html,body').stop().animate({scrollTop: (bannerHeight - headerHeight)}, 50, "linear", function () {});
                            $(trigerMap[count/2]).trigger("click");
                        }
                    } else {
                        count = 8;
                        console.info("滚动到下一屏。。。");
                    }
                    lastRunTime = new Date().getTime();
                }
            } else if (event.deltaY == 1) {//滚动条往上
                console.info("滚动条往上");
                nowRunTime=new Date().getTime();
                if(nowRunTime - lastRunTime>delay) {
                    count--;
                    if (count >= 0) {
                        if (count % 2 == 0) {
                            event.preventDefault();
                            $('html,body').stop().animate({scrollTop: (bannerHeight - headerHeight)}, 50, "linear", function () {
                            });
                            $(trigerMap[count / 2]).trigger("click");
                        }
                    } else {
                        count = 0;
                        console.info("滚动到上一屏。。。");
                    }
                    lastRunTime = new Date().getTime();
                }
            }
            // console.log(timeArr);
        });
    }
});