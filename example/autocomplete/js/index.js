/*自动下拉补全 zhk */
var highlightindex = -1;//当前高亮的节点
$(document).ready(function () {
    var wordInput = $("#word");
    var resultList = $("#result-list");
    resultList.hide();

    wordInput.keyup(function (event) {
        var myEvent = event || window.event;
        var keyCode = myEvent.keyCode;
        var autoNodes = resultList.children("div");
        if (keyCode >= 65 && keyCode <= 90 || keyCode == 8 || keyCode == 46) { //A  Z BackSpace Delete
            if ($("#word").val() != "") {
                search($("#word").val());
            } else {
                resultList.hide();
                highlightindex = -1;
            }
        }else if (keyCode == 13) { //Enter
            if (highlightindex != -1) {
                var comText = $("#result-list").hide()
                    .children("div")
                    .eq(highlightindex)
                    .text();
                highlightindex = -1;
                search(comText,true);
            } else {
                if ($("#word").val() != "") {
                    search($("#word").val(),false);
                }
                $("#result-list").hide();
                $("#word").get(0)
                    .blur();//失去焦点
            }
        } else if (keyCode == 38 || keyCode == 40) {
            if (keyCode == 38) {//向上
                if (highlightindex != -1) {
                    autoNodes.eq(highlightindex)
                        .css("background-color", "white");
                    highlightindex--;
                } else {
                    highlightindex = autoNodes.length - 1;
                }

                if (highlightindex == -1) {
                    highlightindex = autoNodes.length - 1;
                }
                autoNodes.eq(highlightindex)
                    .css("background-color", "#efefef");
                wordInput.val(autoNodes.eq(highlightindex).text());
            }
            if (keyCode == 40) { //向下
                if (highlightindex != -1) {
                    autoNodes.eq(highlightindex)
                        .css("background-color", "white");
                }
                highlightindex++;
                if (highlightindex == autoNodes.length) {
                    highlightindex = 0;
                }
                autoNodes.eq(highlightindex)
                    .css("background-color", "#efefef");
                wordInput.val(autoNodes.eq(highlightindex).text());
            }
        }
    });

    $("input[type='button']").click(function () {
        search($("#word").val(),false);
    });
});

/**
 *
 * @param keyword
 * @param isSlide 是:下拉关键字联想菜单,否:展示搜索结果页面
 */
function search(keyword,isSlide){
    var resultList = $(".result-list");
    if(appConfig.isModel){
        var wordNodes = ['aaa','abc','abd','bbc','beb','cer','erd','beg'];
        resultList.html("");
        wordNodes.forEach(function (element, i, array) {
            var newDivNode = $("<div>").attr("id", i);

            newDivNode.html(element).appendTo(resultList);
            newDivNode.mouseover(function () {//鼠标进入
                if (highlightindex != -1) {
                    $("#result-list").children("div")
                        .eq(highlightindex)
                        .css("background-color", "white");
                }
                highlightindex = $(this).attr("id");
                $(this).css("background-color", "#efefef");
            });

            newDivNode.mouseout(function () {//鼠标移除
                $(this).css("background-color", "white");

            });
            newDivNode.click(function () {//点击
                var comText = $(this).text();
                $("#word").val(comText);
                search(comText);
                $("#result-list").hide();
                highlightindex = -1;
            });
        });
        if (wordNodes.length > 0) {
            resultList.show();
        } else {
            resultList.hide();
            highlightindex = -1;
        }
    }else{
        if(isSlide){
            updateSlide(keyword,function(json){

            });
        }else{
            getSearchPage(keyword,function(json){

            });
        }
    }

    function updateSlide(keyword,callback){
        $.ajax({
            type:'get',
            dataType:'json',
            url:appConfig.host+'/example/autocomplete/js/data/index.json?k='+keyword,
            success:function(res){
                console.log(res);
                callback(res);
            }
        });
    }

    //获取搜索结果界面
    function getSearchPage(keyword){
        $.ajax({
            type:'get',
            dataType:'json',
            url:appConfig.host+'/example/autocomplete/js/data/index.json?k='+keyword,
            success:function(res){
                console.log(res);
                callback(res);
            }
        });
    }
}