var util = {
    $$: function (id) {
        return document.getElementById(id);
    },
    debug: function (html) {
        var oTest = $$("debug-info");
        var newNode = document.createElement("div");
        newNode.innerHTML = html;
        oTest.insertBefore(newNode, null);
    },
    ajax: function (obj) {
        var xhr = (function () {
            if (typeof XMLHttpRequest != 'undefined') {
                return new XMLHttpRequest();
            } else if (typeof ActiveXObject != 'undefined') {
                var version = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'];
                for (var i = 0; i < version.length; i++) {
                    try {
                        return new ActiveXObject(version[i]);
                    } catch (e) {
                        //跳过
                    }
                }
            } else {
                throw new Error('您的系统或浏览器不支持XHR对象！');
            }
        })();
        obj.url = obj.url + '?rand=' + Math.random();
        obj.data = (function (data) {
            var arr = [];
            for (var i in data) {
                arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
            }
            return arr.join('&');
        })(obj.data);
        if (obj.method === 'get') obj.url += obj.url.indexOf('?') == -1 ? '?' + obj.data : '&' + obj.data;
        if (obj.async === true) {
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    callback();
                }
            };
        }
        xhr.open(obj.method, obj.url, obj.async);
        if (obj.method === 'post') {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(obj.data);
        } else {
            xhr.send(null);
        }
        if (obj.async === false) {
            callback();
        }
        function callback() {
            if (xhr.status == 200) {
                obj.success(xhr.responseText);
            } else {
                obj.error(xhr);
            }
        }
    },
    /*保存渲染的某帧为图片*/
    saveImage: function () {
        var image = new Image();

        if ($$("canvasImg")) {
            $$("canvasImg").src = appConfig.canvas.toDataURL("image/png");
        } else {
            var imgObj = document.createElement("img");
            imgObj.src = appConfig.canvas.toDataURL("image/png");
            imgObj.id = "canvasImg";
            $$("imgbox").appendChild(imgObj);
        }
    },
    /**
     * 获取设计稿上的开始坐标定位比例
     * @param psX
     * @param pxY
     * @returns {{x: number, y: number}}
     */
    getCoordinateRate:function(psX,psY){
        var rateX=psX/1242;
        var rateY=psY/2016;
        return {x:rateX,y:rateY};
    }
};