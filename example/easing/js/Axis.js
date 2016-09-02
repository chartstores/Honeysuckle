function Axis(canvas,context){
    this.canvas=canvas;
    this.context=context;
    this.width=this.height=utils.getMin(canvas.clientWidth,canvas.clientHeight);
    this.center={x:Math.round(canvas.clientWidth/2),y:Math.round(canvas.clientHeight/2)};
    this.tickLength=3;
    this.tickAmount=10;
}
Axis.prototype.draw=function(){
    var _self=this;
    _self.drawAxis();
    _self.drawTick();
};
Axis.prototype.drawAxis=function(){
    var _self=this;
    var x1=_self.center.x-_self.width/2,
        y1=_self.center.y,
        x2=_self.center.x+_self.width/2,
        y2=_self.center.y;
    var x3=_self.center.x,
        y3=_self.center.y-_self.width/2,
        x4=_self.center.x,
        y4=_self.center.y+_self.width/2;
    var line=new Line();
    line.x1=x1;
    line.y1=y1;
    line.x2=x2;
    line.y2=y2;
    line.draw(_self.context);

    line.x1=x3;
    line.y1=y3;
    line.x2=x4;
    line.y2=y4;
    line.draw(_self.context);
};
Axis.prototype.drawTick=function(){
    var _self=this;
    var coordinate=[];
    var tickInterval=_self.width/_self.tickAmount;
    var tick=new Line();
    for(var i=0;i<_self.tickAmount/2;i++){
        //x tick
        coordinate.push([
            _self.center.x-tickInterval*i,
            _self.center.y,
            _self.center.x-tickInterval*i,
            _self.center.y-_self.tickLength
        ]);
        coordinate.push([
            _self.center.x+tickInterval*i,
            _self.center.y,
            _self.center.x+tickInterval*i,
            _self.center.y-_self.tickLength
        ]);

        //y tick
        coordinate.push([
            _self.center.x,
            _self.center.y+tickInterval*i,
            _self.center.x+_self.tickLength,
            _self.center.y+tickInterval*i
        ]);
        coordinate.push([
            _self.center.x,
            _self.center.y-tickInterval*i,
            _self.center.x+_self.tickLength,
            _self.center.y-tickInterval*i
        ]);
    }
    for(var j=0;j<coordinate.length;j++){
        tick.x1=coordinate[j][0];
        tick.y1=coordinate[j][1];
        tick.x2=coordinate[j][2];
        tick.y2=coordinate[j][3];
        tick.draw(_self.context);
    }
};