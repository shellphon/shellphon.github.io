(function($){
	var PostText = {
            datas:{
                short_name:'shellphon',
                thread_key:'danmu',
                secret:'980060bdb2bb38f1bdf5d73b37382696',
                author_name:'danmu',
                message:''
            },
            url:'http://api.duoshuo.com/posts/create.json',
            upload:function(dataObj, method){
                var result = this.datas;
                result.message = JSON.stringify(dataObj);
                this.postIframe(this.url, method, result); 
            },
            postIframe:function(target_url, method, params){
                var iframe = document.createElement("iframe");
                document.body.appendChild(iframe);
                iframe.style.display = "none";
                var frame_name = "frame_name" + (new Date).getTime();
                iframe.contentWindow.name = frame_name;
                var form = document.createElement("form");
                form.target = frame_name;
                form.action = target_url;
                form.method = method;
                for (var key in params){
                    if (params.hasOwnProperty(key)){
                        var input = document.createElement("input");
                        input.type = "hidden";
                        input.name = key;
                        input.value = params[key];
                        form.appendChild(input);
                    }
                }
                document.body.appendChild(form);
                form.submit();
            }
    };
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
    $('.sub').click(function(){
    	var text = $.trim($('#text').val());
    	if(text===''){
    		bootbox.alert('请输入内容哦');
    		return;
    	}
    	if(text.length>20){
    		bootbox.alert('字数不要太多，受不了～');
    		return;
    	}
    	PostText.upload({'text':text},'POST');
    	bootbox.alert('发射成功～',function(){
    		danmu(text);
    	});
    });


})(jQuery);