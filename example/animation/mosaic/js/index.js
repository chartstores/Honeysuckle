function initPage(){
    var number;
    var row=15;
    var rol=32;
    for(var i=0;i<row;i++){
        $("#container").append("<ul></ul>");
        for(var j=0;j<rol;j++){
            number=i*rol+j+1;
            number=number>9?number:'0'+number;
            // console.log(number);
            $("#container ul:last").append("<li><img src='images/mosaic_"+number+".jpg'/></li>");
        }
    }
}

initPage();