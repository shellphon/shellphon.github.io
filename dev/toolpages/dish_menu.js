(function($){
        var Util = {
            order: {
                datas:{
                    short_name:'shellphon',
                    thread_key:'dish0214',
                    secret:'980060bdb2bb38f1bdf5d73b37382696',
                    author_name:'dish_menu',
                    message:''
                },
                url:'http://api.duoshuo.com/posts/create.json',
                post:function(dataObj, method){
                    var result = this.datas;
                    result.message = JSON.stringify(dataObj);
                    Util.postIframe(this.url, method, result); 
                }
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
      var oMenu = $('#menu');
      $('#lucky').click(function(){
         var names = oMenu.find('.name'),
             trs = oMenu.find('tr'),
             prices = oMenu.find('.price'),
             ids = oMenu.find('.dish-id'),
             rand = Math.floor(Math.random()*names.length),
             dishName = names.eq(rand).text(),
             dishPrice = prices.eq(rand).text(),
             rtn = {};
             bootbox.confirm('不如试下：【'+ids.eq(rand).text()+'】<span class="lucky-name">'+dishName+'</span>? <span class="lucky-price">'+ dishPrice + '</span>元',function(res){
                if(res){
                    if(window.localStorage&&localStorage['whoOrder']){
                            rtn.who = localStorage['whoOrder']+'随机了一下';
                            console&&console.log(localStorage['whoOrder']+"点了"+dishName+' ￥'+dishPrice);
                            rtn.name = dishName;
                            rtn.price= dishPrice;
                            Util.order.post(rtn,'POST');
                            trs.eq(rand).removeClass('info').addClass('danger').unbind();
                        }else{
                            bootbox.prompt('请输入昵称方便对照：',function(answer){
                                if(answer){
                                    window.localStorage&&localStorage.setItem('whoOrder', answer);

                                    rtn.who = answer+'随机了一下';
                                    console&&console.log(answer+"点了"+dishName+' ￥'+dishPrice);
                                    rtn.name = dishName;
                                    rtn.price= dishPrice;
                                    Util.order.post(rtn,'POST');
                                    trs.eq(rand).removeClass('info').addClass('danger').unbind();
                                }
                            });
                        }
                }
             });
      });
      $('#rich').click(function(){
         var names = oMenu.find('.name'),
             trs = oMenu.find('tr'),
             prices = oMenu.find('.price'),
             ids = oMenu.find('.dish-id'),
             rand = names.length-Math.floor(Math.random()*5)-1,
             dishName = names.eq(rand).text(),
             dishPrice = prices.eq(rand).text(),
             rtn = {};
             bootbox.confirm('本期豪华大礼包：【'+ids.eq(rand).text()+'】<span class="lucky-name">'+dishName+'</span>? <span class="lucky-price">'+ dishPrice + '</span>元<br/>不够？加几个配菜。←',function(res){
                if(res){
                     if(window.localStorage&&localStorage['whoOrder']){
                            rtn.who = localStorage['whoOrder']+'任性了一下';
                            console&&console.log(localStorage['whoOrder']+"点了"+dishName+' ￥'+dishPrice);
                            rtn.name = dishName;
                            rtn.price= dishPrice;
                            Util.order.post(rtn,'POST');
                            trs.eq(rand).removeClass('info').addClass('danger').unbind();
                        }else{
                            bootbox.prompt('请输入昵称方便对照：',function(answer){
                                if(answer){
                                    window.localStorage&&localStorage.setItem('whoOrder', answer);

                                    rtn.who = answer+'任性了一下';
                                    console&&console.log(answer+"点了"+dishName+' ￥'+dishPrice);
                                    rtn.name = dishName;
                                    rtn.price= dishPrice;
                                    Util.order.post(rtn,'POST');
                                    trs.eq(rand).removeClass('info').addClass('danger').unbind();
                                }
                            });
                        }
                }
             });
      }); 
      oMenu.find('tr').each(function(){
         var self = $(this),
             name = self.find('.name').eq(0).text(),
             price = self.find('.price').eq(0).text();
             self.click(function(){
                var that = self,
                    rtn = {};
                 bootbox.confirm('确定点这个？--'+name+'(￥'+price+')', function(res){
                    if(res){
                        if(window.localStorage&&localStorage['whoOrder']){
                            rtn.who = localStorage['whoOrder'];
                            console&&console.log(localStorage['whoOrder']+"点了"+name+' ￥'+price);
                            rtn.name = name;
                            rtn.price= price;
                            Util.order.post(rtn,'POST');
                            that.removeClass('info').addClass('danger').unbind();
                        }else{
                            bootbox.prompt('请输入昵称方便对照：',function(answer){
                                if(answer){
                                    window.localStorage&&localStorage.setItem('whoOrder', answer);

                                    rtn.who = answer;
                                    console&&console.log(answer+"点了"+name+' ￥'+price);
                                    rtn.name = name;
                                    rtn.price= price;
                                    Util.order.post(rtn,'POST');
                                    that.removeClass('info').addClass('danger').unbind();
                                }
                            });
                        }
                    }
                 });
             });
      });
  })(jQuery);