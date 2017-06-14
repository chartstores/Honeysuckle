//#2 我们知道，我们可以在函数中这样调用函数

function foo1(a,b,c){
    console.log("我要调用foo2函数");
    foo2(4,5,6);
}

function foo2(a,b,c){
    console.log("我已经被foo1调用");
}

foo1(1,2,3);