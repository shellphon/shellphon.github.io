(function(){
        var rundate = [],
        runstep = [],
        runmile = [],
        runcalory = [];
/*
 * 检测对象是否是空对象(不包含任何可读属性)。
 * 方法只既检测对象本身的属性，不检测从原型继承的属性。
 */
function isOwnEmpty(obj){
    for(var name in obj){
        if(obj.hasOwnProperty(name)){
            return false;
        }
    }
    return true;
};
        var RunData = {
              pull:function(){//拉下数据，并排序后返回数组给range
                var that = this;
                var urltemp = 'http://api.duoshuo.com/threads/listPosts.jsonp?order=asc&thread_key=run1115&short_name=shellphon&page={page}&limit=15',
                    result = [];
                function getAjax(i){
                    $.ajax({
                           type: "get",
                           async: false,
                           cache:true,
                           url: urltemp.replace(/{page}/, i),
                           dataType: "jsonp",
                           jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
                           //jsonpCallback:"",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
                           success: function(dataJson){
                              var key,
                                  temp,
                                  eveObj;
                              if(dataJson.parentPosts&&!isOwnEmpty(dataJson.parentPosts)){
                                i++;
                               for(key in dataJson.parentPosts){
                                 temp = dataJson.parentPosts[key].message.replace(/\&quot;/g,'"');
                                 eveObj = JSON.parse(temp);
                                 eveObj.time = dataJson.parentPosts[key].created_at;
                                 result.push(eveObj);
                               }
                               getAjax(i);
                             }else{
                                  result.forEach(function(e,i){
                                        rundate.push(e['date']);
                                        runstep.push(e['steps']);
                                        runmile.push(e['miles']);
                                        runcalory.push(e['calory']);
                                    });
                                  draw();
                             }
                           }
                         });
                }
                getAjax(1);
              }
          };

    require.config({
        paths: {
            echarts: 'http://cdn.bootcss.com/echarts/2.2.1'
        }
    });
    RunData.pull();
   function draw(){
     require(
        [
            'echarts',
            'echarts/chart/line',   // 按需加载所需图表，如需动态类型切换功能，别忘了同时加载相应图表
            'echarts/chart/bar'
        ],
        function (ec) {
                    var myChart = ec.init(document.getElementById('main'));
                    var option = {
                         title : {
            text: '奔跑吧，胖砸',
            subtext: '数据来自weloop手环'
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['步数(步)','距离(m)','卡路里(c)']
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : rundate
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel : {
                    formatter: '{value}'
                }
            }
        ],
        series : [
            {
                name:'步数(步)',
                type:'line',
                data:runstep,
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name: '平均值'}
                    ]
                }
            },
             {
                name:'距离(m)',
                type:'line',
                data:runmile,
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name: '平均值'}
                    ]
                }
            },
             {
                name:'卡路里(c)',
                type:'bar',
                data:runcalory,
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name: '平均值'}
                    ]
                }
            }
        ]
                    };
                    myChart.setOption(option);
                }
            );
   }
})();
