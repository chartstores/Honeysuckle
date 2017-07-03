//下面用于图片上传预览功能
function setImagePreview(avalue) {
    var docObj = document.getElementById("doc");
    var imgObjPreview = document.getElementById("preview");
    var divs = document.getElementById("localImag");
    //动态创建多个img
    var tempImg;
    if (docObj.files && docObj.files[0]) {
        for(var i=0;i<docObj.files.length;i++){
            tempImg=document.createElement("img");
            tempImg.className="preview";
            tempImg.style.height = '100px';
            tempImg.src = window.URL.createObjectURL(docObj.files[i]);
            divs.appendChild(tempImg);
        }
    } else {
        //IE下，使用滤镜
        docObj.select();
        var imgSrc = document.selection.createRange().text;
        var localImagId = document.getElementById("localImag");
        //必须设置初始大小
        localImagId.style.width = "100px";
        localImagId.style.height = "100px";
        //图片异常的捕捉，防止用户修改后缀来伪造图片
        try {
            localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
            localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
        } catch (e) {
            alert("您上传的图片格式不正确，请重新选择!");
            return false;
        }
        imgObjPreview.style.display = 'none';
        document.selection.empty();
    }
    return true;
}