function Loader(){

}

Loader.prototype.load=function(imageData,callback){
    this.image=new Image();
    this.image.load=callback;
};
Loader.prototype.draw=function(){

}
