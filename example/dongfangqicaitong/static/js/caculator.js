$(function(){
    var hasDotA=false;
    var hasDotB=false;
    var realStrA=[];
    var realStrB=[];

    $(".ui-input .computer-money").on("keypress", function(event) {
        //对已输入值做判断处理
        var event= event || window.event;
        var getValue = ""+$(this).val()*1+"";

        if(event.which==190||event.keyCode==190){
            event.which=46;
            event.keyCode=46;
            event.key=".";
        }

        if(event.which==229||event.keyCode==229){
            event.which=46;
            event.keyCode=46;
            event.key=".";
        }
        //11.000000、22.0000无效

        //控制第一个不能输入小数点"."
        if (getValue.length == 0 && event.which == 46) {
            event.preventDefault();
            return false;
        }
        //控制只能输入一个小数点"."
        if (getValue.indexOf('.') != -1 && event.which == 46) {
            event.preventDefault();
            return false;
        }
        //控制只能输入的值
        if (event.which && (event.which < 48 || event.which > 57) && event.which != 8 && event.which != 46) {
            event.preventDefault();
            return false;
        }


        //控制只能输入两位小数点0.23、1.23、55555.23
        //2.3333、555555.233333无效
        //0.0111、0.11111无效
        //控制只能大于0.01
        var patt=/\.\d{2}$/g;
        if(patt.test(getValue)){
            event.preventDefault();
            return false;
        }

        //0.00无效
        if(getValue*1<1&&getValue.length==3&&getValue*1==0&&event.which==48){
            event.preventDefault();
            return false;
        }

        //只能输入少于1000000
        //100000
        //999999.99
        //先匹配6位整数

        var intPatt=/^\d{6}$/g;
        if(intPatt.test(getValue)){
            //46->dot、48->0
            //100000
            if(getValue*1==100000&&event.which != 46&&event.which != 48){
                event.preventDefault();
                return false;
            }

            //100001、110000、999999、999999.?
            if(getValue*1>100000&&getValue*1<=999999){
                //当前情况是6位整数，只能输入小数点

                // $("#debug-info").html(hasDotA+","+event.keyCode);
                if(hasDotA){
                    // alert(hasDotA);
                    //已经输入小数点，就只能输入数字，不能再输入小数点
                    if(event.keyCode==46){
                        event.preventDefault();
                        return false;
                    }
                }else{
                    if(event.keyCode!=46){
                        // alert(74);
                        event.preventDefault();
                        return false;
                    }else{
                        // alert(78);
                        hasDotA=true;
                    }
                }

            }
        }

        if(getValue*1>1000000||(getValue*1>=1000000&&event.which != 46&&event.which != 48)){
            event.preventDefault();
            return false;
        }else{
            if(event.keyCode==46){
                hasDotA=true;
            }
        }

    }).on("keydown",function(event){
        if(event.which==190||event.keyCode==190){
            event.which=46;
            event.keyCode=46;
            event.key=".";
        }

        if(event.which==229||event.keyCode==229){
            event.which=46;
            event.keyCode=46;
            event.key=".";
        }

        //1....无效
        if(hasDotA&&(event.which==46)){
            event.preventDefault();
            return false;
        }

        // $("#debug-info").append("<div>"+realStrA+","+event.keyCode+","+hasDotA+"</div>");
        if(hasDotA&&(event.keyCode==46)){
            $(this).val("");
            realStrA=[];
            hasDotA=false;
        }

    }).on("keyup",function(event){
        if(event.which==190||event.keyCode==190){
            event.which=46;
            event.keyCode=46;
            event.key=".";
        }

        if(event.which==229||event.keyCode==229){
            event.which=46;
            event.keyCode=46;
            event.key=".";
        }
        var getValue=$(this).val();

		//出栈
        if(event.keyCode==8){
			realStrA.pop();
			//删除置空
            if(getValue.length==0){
                realStrA=[];
                hasDotA=false;
            }
        }
		
		//入栈
        //入栈规则
        if(event.keyCode!=8){
            //存储规则
            //必须是数字和小数点
            var numberPatt=/\d|\./g;
            if(numberPatt.test(event.key)){
                realStrA.push(event.key);
            }
            //对比真实输入值和现在获取的值
            //如果两个值不相同，则取realStrB
            // console.log("未处理");
            // console.log(getValue);
            // console.log(realStrA);
            //譬如输入999.99.99.99、99.、999.，则取
            // console.log("已处理");
            getValue=getRealString(realStrA,getValue).getValue;
            realStrA=getRealString(realStrA,getValue).realStrArr;
            // console.log(getValue);
            // console.log(realStrA);
            // console.info("--------------------------------------------------------");
        }

        //输入....之后置空||兼容
        if(getValue.length==0&&hasDotA){
            $(this).val("");
            realStrA=[];
            hasDotA=false;
        }
		
        if(realStrA.indexOf('.') == -1){
            hasDotA=false;
        }else{
			hasDotA=true;
		}

		//兼容
        if(!hasDotA&&realStrA[realStrA.length-1]=="Unidentified"&&realStrA.length>0){
            hasDotA=true;
        }

        // $("#debug-info").append("<div>现在输入的值是:"+getValue+"</div>");
        //有小数的情况
        if(getValue.indexOf('.') != -1){
            hasDotA=true;
            // $("#debug-info").append("<div>149,"+getValue+"</div>");
            var arr=getValue.split(".");
            if(arr[0]*1>1000000){
                alertWarmInDialog(this,"投资本金不能大于1,000,000万元", ".opencomputer",function(){});
                $(this).val(getValue.slice(0,getValue.length-1));
                realStrA= (""+$(this).val()*1+"").split("");
            }else if(arr[0]*1==1000000){
                //小数点只能是00
                if(arr[1]*1>0){
                    alertWarmInDialog(this,"投资本金不能大于1,000,000万元", ".opencomputer",function(){});
                    $(this).val(getValue.slice(0,getValue.length-1));
                    realStrA= (""+$(this).val()*1+"").split("");
                }

                if(arr[1].length>2){
                    alertWarmInDialog(this,"投资本金最多只能有两位小数！", ".opencomputer",function(){});
                    $(this).val(getValue.slice(0,getValue.length-1));
                    realStrA= (""+$(this).val()*1+"").split("");
                }

            }else{
                //只能是两位小数点
                if(arr[1].length>2){
                    alertWarmInDialog(this,"投资本金最多只能有两位小数！", ".opencomputer",function(){});
                    $(this).val(getValue.slice(0,getValue.length-1));
                    realStrA= (""+$(this).val()*1+"").split("");
                }

                if(getValue.length==4&&getValue*1<0.01){
                    alertWarmInDialog(this,"投资本金不能低于0.01万元", ".opencomputer",function(){});
                    $(this).val('');
                    hasDotA=false;
                    realStrA=[];
                }
            }

        }else{
            // $("#debug-info").append("<div>173,"+getValue+"</div>");
            if(getValue*1>1000000){
                alertWarmInDialog(this,"投资本金不能大于1,000,000万元", ".opencomputer",function(){});
                $(this).val(getValue.slice(0,getValue.length-1));
                realStrA= (""+$(this).val()*1+"").split("");
            }else if(getValue*1==1000000){
                if(realStrA.indexOf('.') == -1){
                    realStrA= (""+$(this).val()*1+"").split("");
                }
            }else if(getValue*1<1000000){
                    console.log(250);
            }
        }

        // $("#debug-info").append("<div>186,hasDotA="+hasDotA+",realStrA="+realStrA.toString()+"</div>");
        // console.log(realStrA);

        //重置状态
        if(realStrA.indexOf('.') == -1){
            hasDotA=false;
        }else{
            hasDotA=true;
        }

        //兼容
        if(!hasDotA&&realStrA[realStrA.length-1]=="Unidentified"&&realStrA.length>0){
            hasDotA=true;
        }
        changeRIABoard();
    }).on("blur",function(event){
        if(event.which==190||event.keyCode==190){
            event.which=46;
            event.keyCode=46;
            event.key=".";
        }

        if(event.which==229||event.keyCode==229){
            event.which=46;
            event.keyCode=46;
            event.key=".";
        }

        var value = $(this).val(), reg = /\.$/;
        if (reg.test(value)) {
            value = value.replace(reg, "");
            $(this).val(value);
        }
    });

    $(".ui-input .computer-bf").on("keypress",function(event){
        //对已输入值做判断处理
        var event= event || window.event;
        var getValue = ""+$(this).val()*1+"";

        if(event.which==190||event.keyCode==190){
            event.which=46;
            event.keyCode=46;
            event.key=".";
        }

        if(event.which==229||event.keyCode==229){
            event.which=46;
            event.keyCode=46;
            event.key=".";
        }

        //控制第一个不能输入小数点"."
        if (getValue.length == 0 && event.which == 46) {
            event.preventDefault();
            return;
        }

        //控制只能输入一个小数点"."
        if (getValue.indexOf('.') != -1 && event.which == 46) {
            event.preventDefault();
            return;
        }
        //控制只能输入的值
        if (event.which && (event.which < 48 || event.which > 57) && event.which != 8 && event.which != 46) {
            event.preventDefault();
            return;
        }

        //控制只能输入两位小数点0.23、1.23、55555.23
        //2.3333、555555.233333无效
        //0.0111、0.11111无效
        //控制只能大于0.01
        var patt=/\.\d{2}$/g;
        if(patt.test(getValue)){
            event.preventDefault();
            return;
        }

        //0.00无效
        if(getValue*1<1&&getValue.length==3&&getValue*1==0&&event.which==48){
            event.preventDefault();
            return;
        }

        //只能输入小于1000
        //先匹配整数

        //输入三位整数后
        //第一次只能输入.
        //第二次可以输入数字
        //第三次可以输入数字
        //匹配999.9、999.91、999.12
        var intPatt=/^\d{3,}$/g;
        if(intPatt.test(getValue)){
            //46->dot、48->0
            if(getValue*1==100&&event.which != 46&&event.which != 48){
                event.preventDefault();
                return;
            }
            //如果未输入逗号
            if(getValue*1>100&&getValue*1<=999){
                //当前情况是3位整数，只能输入小数点
                if(hasDotB){
                    //已经输入小数点，就只能输入数字，不能再输入小数点
                    if(event.which == 46||event.keyCode==46){
                        event.preventDefault();
                        return false;
                    }
                }else{
                    if(event.which != 46||event.keyCode!=46){
                        event.preventDefault();
                        return false;
                    }else{
                        hasDotB=true;
                    }
                }
            }
        }

        if(getValue*1>1000||(getValue*1>=1000&&event.which != 46&&event.which != 48)){
            event.preventDefault();
            return false;
        }else{
            if(event.keyCode==46){
                hasDotB=true;
            }
        }
    }).on("keydown",function(event){
        if(event.which==190||event.keyCode==190){
            event.which=46;
            event.keyCode=46;
            event.key=".";
        }

        if(event.which==229||event.keyCode==229){
            event.which=46;
            event.keyCode=46;
            event.key=".";
        }

        //1....无效
        if(hasDotB&&event.which==46){
            event.preventDefault();
            return false;
        }

        // $("#debug-info").append("<div>"+hasDotB+","+getValue.length+","+event.keyCode+"</div>");
        if(hasDotB&&(event.which == 46||event.keyCode==46)){
            $(this).val("");
            realStrB=[];
            hasDotB=false;
        }

    }).on("keyup",function(event){
        if(event.which==190||event.keyCode==190){
            event.which=46;
            event.keyCode=46;
            event.key=".";
        }

        if(event.which==229||event.keyCode==229){
            event.which=46;
            event.keyCode=46;
            event.key=".";
        }

        var getValue=$(this).val();

        //出栈
        if(event.keyCode==8){
            //出栈规则
			realStrB.pop();
            if(getValue.length==0){
                realStrB=[];
                hasDotB=false;
            }
        }
		
		//入栈
        var isValid=true;//标记当前输入是否合法
        if(event.keyCode!=8){
            //存储规则
            //必须是数字和小数点
            var numberPatt=/\d|\./g;
            if(numberPatt.test(event.key)){
                realStrB.push(event.key);
            }
            //对比真实输入值和现在获取的值
            //如果两个值不相同，则取realStrB
            console.log("未处理");
            console.log(getValue);
            console.log(realStrB);
            //譬如输入999.99.99.99、99.、999.，则取
            console.log("已处理");
            getValue=getRealString(realStrB,getValue).getValue;
            realStrB=getRealString(realStrB,getValue).realStrArr;
            isValid=getRealString(realStrB,getValue).isValid;
            console.log(getValue);
            console.log(realStrB);
            console.info("--------------------------------------------------------");
        }


        //何种情况下置空
        //输入....之后置空
        if((getValue.length==0&&hasDotB)||!isValid){
            $(this).val("");
            realStrB=[];
            hasDotB=false;
        }

        if(realStrB.indexOf('.') == -1){
            hasDotB=false;
        }else{
			hasDotB=true;
		}

		if(!hasDotB&&realStrB[realStrB.length-1]=="Unidentified"&&realStrB.length>0){
            hasDotB=true;
        }

        // $("#debug-info").append("<div>现在输入的值是:"+getValue+"</div>");
        if(getValue.indexOf('.') != -1){
            var arr=getValue.split(".");
            if(arr[0]*1>1000){
                alertWarmInDialog(this,"预期年化收益率不能大于1,000.00%", ".opencomputer",function(){});
                $(this).val(getValue.slice(0,getValue.length-1));
                realStrB= (""+$(this).val()*1+"").split("");
            }else if(arr[0]*1==1000){
                //小数点只能是00
                if(arr[1]*1>0){
                    alertWarmInDialog(this,"预期年化收益率不能大于1,000.00%", ".opencomputer",function(){});
                    $(this).val(getValue.slice(0,getValue.length-1));
                    realStrB= (""+$(this).val()*1+"").split("");
                }
                //只能是两位小数点
                if(arr[1].length>2){
                    alertWarmInDialog(this,"预期年化收益率最多只能是两位小数！", ".opencomputer",function(){});
                    $(this).val(getValue.slice(0,getValue.length-1));
                    realStrB= (""+$(this).val()*1+"").split("");
                }
            }else{
                //只能是两位小数点
                if(arr[1].length>2){
                    alertWarmInDialog(this,"预期年化收益率最多只能是两位小数！", ".opencomputer",function(){});
                    $(this).val(getValue.slice(0,getValue.length-1));
                    realStrB= (""+$(this).val()*1+"").split("");
                }
                if(arr[1].length==4&&getValue*1<0.01){
                    alertWarmInDialog(this,"预期年化收益率不能低于0.01%", ".opencomputer",function(){});
                    $(this).val('');
                    hasDotB=false;
                    realStrB=[];
                }
            }

        }else {
            if (getValue * 1 > 1000) {
                alertWarmInDialog(this, "预期年化收益率不能大于1,000.00%", ".opencomputer", function () {
                });
                $(this).val(getValue.slice(0, getValue.length - 1));
                realStrB = ("" + $(this).val() * 1 + "").split("");
            } else if (getValue * 1 == 1000) {
                //当前的输入是1000.？还是1000？
                if(realStrB.indexOf('.') == -1){
                    realStrB = ("" + $(this).val() * 1 + "").split("");
                }
            } else if (getValue * 1 < 1000) {
                console.log("473");
                // console.log(realStrB);
            }
        }

        //重置状态
        if(realStrB.indexOf('.') == -1){
            hasDotB=false;
        }else{
            hasDotB=true;
        }

        if(!hasDotB&&realStrB[realStrB.length-1]=="Unidentified"&&realStrB.length>0){
            hasDotB=true;
        }
        changeRIABoard();
    }).on("blur",function(event){
        if(event.which==190||event.keyCode==190){
            event.which=46;
            event.keyCode=46;
            event.key=".";
        }

        if(event.which==229||event.keyCode==229){
            event.which=46;
            event.keyCode=46;
            event.key=".";
        }

        var value = $(this).val(), reg = /\.$/;
        if (reg.test(value)) {
            value = value.replace(reg, "");
            $(this).val(value);
        }
    });

    $(".ui-input .computer-date").on("keypress afterpaste",function(event){
        if(event.which==190||event.keyCode==190){
            event.which=46;
            event.keyCode=46;
            event.key=".";
        }

        if(event.which==229||event.keyCode==229){
            event.which=46;
            event.keyCode=46;
            event.key=".";
        }
        // 在 keypress 事件中拦截错误输入
        var sCharCode = String.fromCharCode(event.charCode);

        if (/[^0-9]/g.test(sCharCode)) {
            return false;
        }
    }).on("keyup",function(event){
        if(event.which==190||event.keyCode==190){
            event.which=46;
            event.keyCode=46;
            event.key=".";
        }

        if(event.which==229||event.keyCode==229){
            event.which=46;
            event.keyCode=46;
            event.key=".";
        }
        var c = ""+$(this).val()*1+"";//投资期限
        if (!chcknullnum(c)) {
            // alertWarmInDialog(this,"投资期限不能为空且只能是数字！", ".opencomputer", function () {
            // });
            return false;
        }
        if (c*1 > 9999) {
            $(this).val(c.slice(0,4));
            // alertWarmInDialog(this,"投资期限不能大于9,999天", ".opencomputer", function () {
            // });
            return false;
        }
        if (c*1 < 1) {
            $(this).val('');
            // alertWarmInDialog(this,"投资期限不能少于1天", ".opencomputer", function () {
            // });
            return false;
        }
        changeRIABoard();
    }).on("blur",function(event){
        if(event.which==190||event.keyCode==190){
            event.which=46;
            event.keyCode=46;
            event.key=".";
        }

        if(event.which==229||event.keyCode==229){
            event.which=46;
            event.keyCode=46;
            event.key=".";
        }
        var c = $(this).val()*1;
        if(c>0){
            $(this).val(c);
        }
    });

    //重置计算器
    $(".computer-reset").on("click", function () {
        $(".computer-money").val("");
        $(".computer-date").val("");
        $(".computer-bf").val("");
        $(".return-money").html("0.00");
        $(".computer-allmoney").html("0.00");
    });
});

function isInterception(event){
    var flag=false;

}

//格式化获取真实的输入值和getValue
// console.info(getRealString(["9", "9", "9","."],"999"));
console.info(getRealString(["9", "9", "9",".","."],"999"));
// console.info(getRealString(["9", "9", "9", ".",".",".","."],"999"));
// console.info(getRealString(["9", "9", "9", ".",".","9",".","."],"999"));
function getRealString(realStrArr, getValue){
    var tempStr='';
    var realStr='';
    tempStr=realStrArr.join("").replace(",","");
    var arr=tempStr.split(".");
    var flag=true;

    //对原始输入值作判断，输入诸如“9999.....、999..”时判断为非法
    if(/^\.{2,}&/.test(tempStr)){
        flag=false;
    }

    //99.999、99.99、99.9
    if(arr.length>2){
        realStr=arr[0]+"."+arr[1];
        //取两位小数点
        tempStr=arr[0]+"."+arr[1];

        //保留小数点
        tempStr=""+Math.floor(tempStr*100)/100+"";

        //截取最多保留两位小数点
        realStrArr=(""+Math.floor(realStr*100)/100+"").split("");
    }

    console.log(flag);
    if(tempStr!=getValue){
        return {realStrArr:realStrArr,getValue:tempStr,isValid:flag};
    }else{
        return {realStrArr:realStrArr,getValue:getValue,isValid:flag};
    }
}
function changeRIABoard(){
    var a = $(".computer-money").val(); //投资金额
    var b = $(".computer-bf").val(); //预期年化利率
    var c = $(".computer-date").val(); //预期年化利率

    if(a!=''&&b!=''&&c!=''){
        $(".return-money").html(formatMoney(CalculateInterest(parseFloat(a) * 10000, parseFloat(b) / 100, parseInt(c)).toFixed(2),2));
        $(".computer-allmoney").html(formatMoney((CalculateInterest(parseFloat(a) * 10000, parseFloat(b) / 100, parseInt(c)) + (parseFloat(a) * 10000)).toFixed(2),2));
    }else{
        $(".return-money").html("0.00");
        $(".computer-allmoney").html("0.00");
    }
}

//利息计算
function CalculateInterest(amount, rate, daysCount, yearOfDay) {
    yearOfDay = yearOfDay || 360;
    var interest = (amount * rate / yearOfDay) * daysCount;
    return ToDigits2(interest);
}

/*计算器验证输入,检查是不是数字及两数位数*/
function chcknullnum(a) {
    if (!isNaN(a) && a != "") {
        return a;
    } else {
        return false;
    }
}

function chckisnum(a) {
    if (a.indexOf(".") > -1) {
        //如果有小数点
        var b = a.split('.')[1].length;
        if (b > 2) {
            a = false;
        }
    }
    return a;
}

//添加千分位
function addCommas(val) {
    return (val + "").replace(/\b(\d+)((\.\d+)*)\b/g, function(a, b, c) { return (b.charAt(0) > 0 && !(c || ".").lastIndexOf(".") ? b.replace(/(\d)(?=(\d{3})+$)/g, "$1,") : b) + c; });
}

/**
 * 数字千分位格式化
 * @public
 * @param mixed mVal 数值
 * @param int iAccuracy 小数位精度(默认为2)
 * @return string
 */
function formatMoney(mVal, iAccuracy){
    var fTmp = 0.00;//临时变量
    var iFra = 0;//小数部分
    var iInt = 0;//整数部分
    var aBuf = new Array(); //输出缓存
    var bPositive = true; //保存正负值标记(true:正数)
    /**
     * 输出定长字符串，不够补0
     * <li>闭包函数</li>
     * @param int iVal 值
     * @param int iLen 输出的长度
     */
    function funZero(iVal, iLen){
        var sTmp = iVal.toString();
        var sBuf = new Array();
        for(var i=0,iLoop=iLen-sTmp.length; i<iLoop; i++)
            sBuf.push('0');
        sBuf.push(sTmp);
        return sBuf.join('');
    };

    if (typeof(iAccuracy) === 'undefined')
        iAccuracy = 2;
    bPositive = (mVal >= 0);//取出正负号
    fTmp = (isNaN(fTmp = parseFloat(mVal))) ? 0 : Math.abs(fTmp);//强制转换为绝对值数浮点
    //所有内容用正数规则处理
    iInt = parseInt(fTmp); //分离整数部分
    iFra = parseInt((fTmp - iInt) * Math.pow(10,iAccuracy) + 0.5); //分离小数部分(四舍五入)

    do{
        aBuf.unshift(funZero(iInt % 1000, 3));
    }while((iInt = parseInt(iInt/1000)));
    aBuf[0] = parseInt(aBuf[0]).toString();//最高段区去掉前导0
    return ((bPositive)?'':'-') + aBuf.join(',') +'.'+ ((0 === iFra)?'00':funZero(iFra, iAccuracy));
}

//保留两位小数
function ToDigits2(floatVal) {
    var strResult = ForDight(parseFloat(floatVal), 4).toFixed(4).toString();

    return parseFloat(strResult.substr(0, strResult.length - 2));
}

//四舍五入
function ForDight(Dight, How) {
    Dight = Math.round(Dight * Math.pow(10, How)) / Math.pow(10, How);
    return Dight;
}


//弹窗里的提示弹窗
function alertWarmInDialog(self,warmText, DialogId,callback) {
    $(self).trigger("blur");
    // $("body").trigger("click");
    $.layer({
        contents: "<div class='computerwarm'>" + warmText + "</div>",
        poptype: 2,
        closeparent: false,
        cancel:"取消",
        confirm: "确定",
        cancelback:function(d){
            d.remove();
            layer.close(d);
            removeHideDiv();
            callback();
        },
        confirmback: function (d) {
            d.remove();
            layer.close(d);
            removeHideDiv();
            callback();
        }
    });
    addHideDiv(DialogId);

    function addHideDiv(DialogId) {
        var hideHTML = '<div id="contentHideDiv" style="z-index:1005;background: #000;opacity: 0.2;filter: alpha(opacity=20);z-index: 1011;position: fixed;left: 0;top: 0;right: 0;bottom: 0;"></div>';
        // $("#applyDivID").parents(".layercontent").after(hideHTML);
        $(DialogId).children(".layercontent").after(hideHTML);
    }

    function removeHideDiv() {
        $("#contentHideDiv").remove();
    }
}
