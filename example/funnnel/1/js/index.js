var config={
    data:[
        {value:100, name:'新增注册'},
        {value:75, name:'新增绑卡'},
        {value:50, name:'新增投资'},
        {value:25, name:'重复投资'},
        {value:125, name:'新增用户'},
        {value:150, name:'新增用户2'},
        {value:170, name:'新增用户3'},
        {value:70, name:'新增用户4'},
    ]
};
initCharts();

function initCharts(){
    require.config({
        paths: {
            echarts: 'libs/echarts'
        }
    });

    require(
        [
            'echarts',
            'echarts/chart/funnel'
        ],
        paintCharts
    );
}

function paintCharts(ec){
    var container=document.getElementById('main');
    container.style.width = window.innerWidth+"px";
    container.style.height = window.innerWidth*0.6+"px";
    var myChart = ec.init(container);
    var legendNames=[];
    var seriesData=config.data.sort(function (a, b) { return b.value-a.value});
    var realSeriesValues={};
    var step=parseInt(100/seriesData.length);
    // var max=Math.max.apply(null, seriesValues);
    for(var i=0;i<seriesData.length;i++){
        realSeriesValues[(100-(step*i))]=seriesData[i].value;
        legendNames.push(seriesData[i].name);
        seriesData[i].value=100-(step*i);

    }

    option = {
        color : ['#22c9b4','#2aa4c4','#2285c0','#254db5','#16388f'],
        tooltip : {
            show:false
        },
        legend: {
            show:false,
            data : legendNames
        },
        series : [
            {
                name:'数据显示1',
                type:'funnel',
                x: 0,
                y:0,
                width: '80%',
                maxSize:'100%',
                sort : 'ascending',
                gap:10,
                itemStyle: {
                    normal: {
                        label: {
                            formatter: '{b}',
                            textStyle:{
                                fontSize:22,
                                color:'#6c6c77'
                            }
                        },
                        labelLine: {
                            show : true,
                            lineStyle: {
                                width:0.5
                            }
                        }
                    }
                },
                data:seriesData
            },
            {
                name:'数据显示2',
                type:'funnel',
                x: 0,
                y:0,
                width: '80%',
                maxSize: '100%',
                sort : 'ascending',
                gap:10,
                itemStyle: {
                    normal: {
                        borderColor: '#fff',
                        borderWidth: 0,
                        label: {
                            position: 'center',
                            formatter: function (params) {
                                return realSeriesValues[params.value] + '人';
                            },
                            textStyle: {
                                color: '#fff',
                                fontSize:22
                            }
                        }
                    },
                    emphasis: {
                        label: {
                            position:'center',
                            formatter: '{c} 人',
                            textStyle: {
                                color: '#fff',
                                fontSize:22
                            }
                        }
                    }
                },
                data:seriesData
            }
        ]
    };

    myChart.setOption(option);
}