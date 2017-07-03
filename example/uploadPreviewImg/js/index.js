//下面用于图片上传预览功能
function setImagePreview(avalue) {
    var docObj = document.getElementById("doc");
    var imgObjPreview = document.getElementById("preview");
    var localImgId = document.getElementById("localImg");
    //动态创建多个img
    var tempImg;
    if (docObj.files && docObj.files[0]) {
        for(var i=0;i<docObj.files.length;i++){
            tempImg=document.createElement("img");
            tempImg.className="preview";
            tempImg.style.height = '100px';
            tempImg.src = window.URL.createObjectURL(docObj.files[i]);
            localImgId.appendChild(tempImg);
        }
    } else {
        //IE下，使用滤镜
        docObj.select();
        var imgSrc = document.selection.createRange().text;
        //必须设置初始大小
        localImgId.style.height = "100px";
        //图片异常的捕捉，防止用户修改后缀来伪造图片
        try {
            localImgId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
            localImgId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
        } catch (e) {
            return false;
        }
        imgObjPreview.style.display = 'none';
        document.selection.empty();
    }
    return true;
}