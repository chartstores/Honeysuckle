//#3 当输入的参数是函数类型呢？该怎么使用这个参数？使用这个参数后会变成怎样呢？

function foo3(a,b,c,d){
    console.log("我要调用foo4");
    d();
}

function foo4(a,b,c){
    console.log(arguments);
    console.log("我已经被foo3调用了");
}

foo4.apply(this,[4,5,6]);
foo3(1,2,3,foo4);