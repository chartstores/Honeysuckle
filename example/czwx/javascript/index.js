function redirect1(e) {
    map2();
    $(e).attr('class', 'active');
    $('#b').removeClass('active');
    $('#map_container').hide();
    $('#map_drawing').show();
}

function redirect2(e) {
    selectMapbyid();
    $(e).attr('class', 'active');
    $('#a').removeClass('active');
    $('#map_drawing').hide();
    $('#map_container').show();
}

var map;
function selectMapbyid() {
    var ss = $('#SchoolID').val();
    var $mapContainer = $('#map_container');
    $mapContainer.height($(window).height() - 45);
    $mapContainer.width($(window).width());
    $mapContainer.html('');
    $.ajax(host + "/czwx/apps/ucs/pages/Map/Map.ashx?action=selectMap", {
        type: "post",
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        data: {SchoolID: ss},
        success: function (d) {
            if (d != null && d.mapImg != "") {

                map = new BMap.Map("map_container");      // 创建地图实例
                var point = new BMap.Point(d.CenterX, d.CenterY);  // 创建点坐标
                map.centerAndZoom(point, d.level);                  // 初始化地图，设置中心点坐标和地图级别
                map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
                map.enableContinuousZoom();
                var top_left_navigation = new BMap.NavigationControl({
                    anchor: BMAP_ANCHOR_TOP_LEFT,
                    type: BMAP_NAVIGATION_CONTROL_SMALL
                }); //右上角，仅包含平移和缩放按钮
                map.addControl(top_left_navigation);
//                        var tilelayer = new BMap.TileLayer();         // 创建地图层实例    
//                        tilelayer.getTilesUrl = function () {             // 设置图块路径     
//                            return "../../../../" + d.mapImg;
//                        };
//                        map.addTileLayer(tilelayer);
//                        mapid = d.Mapid;
//                        mapImg = d.mapImg;
                var markers = eval('(' + d.markers + ')');
                NUM_MARKER = markers.length;
                for (var index = 0; index < markers.length; index++) {
                    var point = new BMap.Point(markers[index].position.lng, markers[index].position.lat);
                    var marker = new BMap.Marker(point);
                    var label = new BMap.Label(markers[index].title, {offset: new BMap.Size(25, 5)});
                    var sContent = '<div style="margin:0;line-height:20px;padding:2px;">' + markers[index].content + '</div>';
                    var searchInfoWindow = null;
                    //创建检索信息窗口对象
                    searchInfoWindow = new BMapLib.SearchInfoWindow(map, sContent, {
                        title: markers[index].title,      //标题
                        width: 290,             //宽度
                        height: 105,              //高度
                        panel: "panel",         //检索结果面板
                        enableAutoPan: true,     //自动平移
                        searchTypes: [
                            BMAPLIB_TAB_SEARCH,   //周边检索
                            BMAPLIB_TAB_TO_HERE,  //到这里去
                            BMAPLIB_TAB_FROM_HERE //从这里出发
                        ]
                    });
                    marker.setLabel(label);
                    map.addOverlay(marker);
                    marker.enableDragging();
                    addClickHandler(searchInfoWindow, marker);
                }
            }
        }
    })
}
function addClickHandler(searchInfoWindow, marker) {
    marker.addEventListener("click", function (e) {
        var p = e.target;
        var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
        var marker = new BMap.Marker(point);
        searchInfoWindow.open(marker);
    });
}

function map2() {
//            $('#map_drawing').html('');
    var ss = $('#school').val();
    $.ajax(host + "/czwx/apps/ucs/pages/Map/Map.ashx?action=selectMap", {
        type: "post",
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        data: {SchoolID: ss},
        success: function (d) {
            if (d != null && d.mapImg != "") {
                $("#img").attr("src", "../../../" + d.mapImg);
                //自适应屏幕高度
                var scale = $("#img").height() / $("#img").width();
                var width = ($(window).height() - 45) / scale;
                $("#img").width(width);

            }
        }
    })
}

//放大
//maxZoom: 4
function zoomInImg(_self) {
    pz.zoomFactor=pz.zoomFactor+0.5;
    if(pz.zoomFactor>4){
        pz.zoomFactor=4;
    }
    pz.update();
    return false;
}

//缩小
//minZoom:0.5
function zoomOutImg(_self) {
    pz.zoomFactor=pz.zoomFactor-0.5;
    if(pz.zoomFactor<0.5){
        pz.zoomFactor=0.5;
    }
    pz.update();
    return false;
}

var pz;
$(function () {
    map2();
    $('.map-img').each(function () {
        pz=new RTP.PinchZoom($(this), {});
    });
});
