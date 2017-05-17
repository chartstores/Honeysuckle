var config={
    data:[
        {value:100, name:'新增注册'},
        {value:80, name:'新增绑卡'},
        {value:60, name:'新增投资'},
        {value:40, name:'重复投资'},
        {value:20, name:'新增用户'}
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
    var legendNames=['新增注册','新增绑卡','新增投资','重复投资','新增用户'];
    var seriesData=config.data.sort(function (a, b) { return a.value - b.value});

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
                                width:0.5,
                                color: '#6c6c77'
                            }
                        }
                    },
                    emphasis: {
                        label: {
                            position:'inside',
                            formatter: '{c} 人',
                            textStyle: {
                                color: '#fff',
                                fontSize:22
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
                            position: 'inside',
                            formatter: '{c} 人',
                            textStyle: {
                                color: '#fff',
                                fontSize:22
                            }
                        }
                    },
                    emphasis: {
                        label: {
                            position:'inside',
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