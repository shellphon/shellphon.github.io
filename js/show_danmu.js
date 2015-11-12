(function($){
	var danmu = function(str){
    	var rgb = [],
    		fontSize=['18px','20px','24px','30px'],
    		top = 0,
    		id = new Date().getTime(),
    		height = $(window).height(),
    		width = $(window).width(),
    		$dom = $('<div class="danmu" id="danmu'+id+'">'+str+'</div>').appendTo($('body'));
    	    top = Math.ceil(Math.random()*height);
	    	for(var i=0;i<3;i++){
	    		rgb.push(Math.ceil(Math.random()*256));
	    	}
    		$dom.css({
    			'color':'rgb('+rgb.join(",")+')',
    			'top':top+'px',
    			'font-size':fontSize[Math.ceil(Math.random()*fontSize.length)]
    		});
    		setTimeout(function(){
    			$dom.css({
    				right:width+$dom.width()+'px'
    			})
    		},200);
    		

    };
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
        var GetData = {
        	  result:[],
        	  damu:function(){
        	  	this.result.forEach(function(e,i){
        	  		damu(e.text);
        	  	});
        	  },
              pull:function(){//拉下数据，并排序后返回数组给range
                var that = this;
                var urltemp = 'http://api.duoshuo.com/threads/listPosts.jsonp?order=asc&thread_key=danmu&short_name=shellphon&page={page}&limit=15';
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
                                 that.result.push(eveObj);
                               }
                               getAjax(i);
                             }else{
                             	that.damu();
                             }
                           }
                         });
                }
                getAjax(1);
              }
          };

    
    


})(jQuery);