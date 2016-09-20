/**
 * 1、兼容列表高度不确定的
 * 2、
 */
(function() {
    var $wrapper = $(this.wrapper);
    var myScroll = new IScroll($wrapper[0], {
        scrollX: false,
        scrollY: true,
        mouseWheel: true,
        click: true
    });
    myScroll.pullDown = $wrapper.find('.pulldown');
    myScroll.pullUp = $wrapper.find('.pullup');

    myScroll.on('scrollMove', function() {
        console.info(this);
        if (this.y > 60) {
            myScroll.pullDown.addClass('flip').find('.label').html('Release to refresh...');
        } else {
            myScroll.pullDown.removeClass('flip').find('.label').html('Pull down to refresh...');
        }

        if (this.maxScrollY - this.y > 60) {
            myScroll.pullUp.addClass('flip').find('.label').html('Release to load more...');
        } else {
            myScroll.pullUp.removeClass('flip').find('.label').html('Pull up to load more...');
        }
    });

    myScroll.on('scrollEnd', function() {
        if (myScroll.pullDown.hasClass('flip')) {
            $wrapper.addClass('pulldownrefresh');
            this.refresh();
            myScroll.pullDown.removeClass('flip').addClass('loading').find('.label').html('Loading...');
            pullDownAction();
        }

        if (myScroll.pullUp.hasClass('flip')) {
            myScroll.pullUp.removeClass('flip').addClass('loading').find('.label').html('Loading...');
            pullUpAction();
        }
    });

    //下拉后的动作
    function pullDownAction() {
        setTimeout(function() {
            $wrapper.removeClass('pulldownrefresh');
            myScroll.pullDown.removeClass('flip loading').find('.label').html('Pull down to refresh...');
            myScroll.refresh();
        }, 3000);
    }

    //上滑后的动作
    function pullUpAction() {
        setTimeout(function() {
            myScroll.pullUp.removeClass('flip loading').find('.label').html('Pull up to load more...');
            myScroll.refresh();
        }, 3000);
    }

}());