(function(){
        var rundate = [],
        runstep = [],
        runmile = [],
        runcalory = [];
        var beforeData = [
          {"date":"2015-04-01","miles":"7122","steps":"9329","calory":"534"},
          {"date":"2015-04-02","miles":"7406","steps":"9227","calory":"555"},
          {"date":"2015-04-03","miles":"15119","steps":"20087","calory":"1133"},
          {"date":"2015-04-04","miles":"6659","steps":"8232","calory":"499"},
          {"date":"2015-04-05","miles":"4548","steps":"6010","calory":"340"},
          {"date":"2015-04-06","miles":"401","steps":"492","calory":"30"},
          {"date":"2015-04-07","miles":"7182","steps":"8802","calory":"538"},
          {"date":"2015-04-08","miles":"8118","steps":"11161","calory":"608"},
          {"date":"2015-04-09","miles":"11105","steps":"15093","calory":"832"},
          {"date":"2015-04-10","miles":"2751","steps":"3661","calory":"206"},

          {"date":"2015-04-11","miles":"6069","steps":"8131","calory":"455"},
          {"date":"2015-04-12","miles":"31224","steps":"42780","calory":"2341"},
          {"date":"2015-04-13","miles":"9816","steps":"11735","calory":"735"},
          {"date":"2015-04-14","miles":"14968","steps":"18022","calory":"1122"},
          {"date":"2015-04-15","miles":"17342","steps":"22431","calory":"1300"},
          {"date":"2015-04-16","miles":"16394","steps":"21154","calory":"1229"},
          {"date":"2015-04-17","miles":"23415","steps":"29443","calory":"1755"},
          {"date":"2015-04-18","miles":"28652","steps":"41254","calory":"2148"},
          {"date":"2015-04-19","miles":"27490","steps":"37646","calory":"2061"},
          {"date":"2015-04-20","miles":"6400","steps":"8320","calory":"479"},

          {"date":"2015-04-21","miles":"4383","steps":"5745","calory":"328"},
          {"date":"2015-04-22","miles":"12177","steps":"13116","calory":"912"},
          {"date":"2015-04-23","miles":"12213","steps":"12473","calory":"915"},
          {"date":"2015-04-24","miles":"17001","steps":"18416","calory":"1274"},
          {"date":"2015-04-25","miles":"10218","steps":"13498","calory":"766"},
          {"date":"2015-04-26","miles":"22808","steps":"23710","calory":"1709"},
          {"date":"2015-04-27","miles":"12061","steps":"12752","calory":"903"},
          {"date":"2015-04-28","miles":"14286","steps":"16075","calory":"1070"},
          {"date":"2015-04-29","miles":"11308","steps":"12451","calory":"847"}

        ];
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
                    result = beforeData;
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
                                        runstep.push(parseInt(e['steps']));
                                        runmile.push(parseInt(e['miles']));
                                        runcalory.push(parseInt(e['calory']));
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
