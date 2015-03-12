(function($){
    //游戏规则：游戏布局 4*4，有8个不同的item（每个item有两个实体），全部覆盖着
    //只有点击的时候翻转看实体内容，当连续翻开的两个相同时，销去。
    //当不同时盖上。且盖上的图有所标识,当布局不再有盖着的item时，过关
    /*
      状态： 全新覆盖
             翻转
             覆盖但标识翻过
             消除
    */
    //map item个数
    //标识是否揭开一个：oneShow
    //数组：元素是一对 item/2个数的随机字符（不重复）
    //一个字符池（不重复，个数尽量多）：作为随机字符的来源
    //已匹配对数，当不小于item/2时表示游戏结束
    function ran(d){return Math.floor(Math.random()*d);}
    function randStr(src,len){
        var len,
            i,
            res = [],
            temp,
            a = src.split('');
        if(len>a.length){
          len = a.length;
        }
        l = a.length;
        for(i=0;i<len;i++){
          temp = ran(l--);
          res.push(a[temp]);
          a.splice(temp,1);
        }
        return res.join('');
    }
    function dbRandArr(str){
      var a = str.split(''),
          len = a.length*2,
          l = len,
          t,i,res=[];
          a = a.concat(a);
          for(i=0;i<len;i++){
            t = ran(l--);
            res.push(a[t]);
            a.splice(t,1);
          }
      return res;
    }
    var Max = 8;
    var Game = {
      row:4,
      pair:0,
      num:16,
      oneShow:false,
      step:0,
      tcount:null,
      initParam:function(row){
        row&&(this.row = row);
        if(this.row%2){
          this.num = this.row*(this.row+1);
        }else{
          this.num = this.row*this.row;
        }
        this.pair = 0;
        this.step = 0;
        $('#steps').text(this.step);
        $('#time_min').text('00');
        $('#time_sec').text('00');
        oneShow = false;
        $('#map').css('width',(this.row*100)+'px')
        if(this.row>6){
          $('#map').css({'transform':'scale(0.8)'});
        }
      },
      start:function(row){
        this.initParam(row);
        var iTmpl = '<div class="item un" data-no="{index}"><span></span></div>',
            htmlStr='',
            src = 'ABCDEFGHI☆J❤KLMNOPQRSTUVWXYZ☺☻☼♂♀♠♣★△▽囧你我他',
            datas = [];
        for(var i=0; i<Game.num;i++){
            htmlStr+=iTmpl.replace(/{index}/g,i);
        }
        $('#map').html(htmlStr);
        datas = dbRandArr(randStr(src,Game.num/2));
        $('#map').unbind().on('click','.item',function(){
          var that = $(this),
              showing = $('.show'),
              allStep = 0,
              allTime = null,
              postObj = {};
          if(that.hasClass('match')||that.hasClass('show')){
            return;
          }
          that.hasClass('un')&&that.removeClass('un');
          that.addClass('show').find('span').text(datas[that.data('no')]);
          if(Game.oneShow){
            Game.step++;
            $('#steps').text(Game.step);
            Game.oneShow = false;
             if(showing.find('span').text()==datas[that.data('no')]){
               Game.pair++;
               if(Game.pair==Game.num/2){
                     // console.log($('#time_min').text()+'分'+$('#time_sec').text()+'秒');
                  $('#level_pass').append('<li>Level '+(Game.row-1)+': 用了<span>'+Game.step+'</span>步'+'| 耗时：<span>'+$('#time_min').text()+'</span>分<span>'+$('#time_sec').text()+'</span>秒</li>');
                  Game.tcount&&clearInterval(Game.tcount);
                  if(Game.row==Max){
                    allStep = Game.summary();
                    if(RangeNet.isBreakRange(allStep)){
                      bootbox.prompt('通关，敢问阁下高姓大名？', function(res){
                        if(res){
                          postObj.step = allStep;
                          postObj.id = res;
                          allTime = Game.countTime();
                          postObj.min = allTime.min;
                          postObj.sec = allTime.sec;
                          PostScore.upload(postObj,'POST');
                        }
                        bootbox.alert('Game Over。好腻害啊',function(){
                            setTimeout(function(){
                                location = location;
                            },1500);
                        });
                      });
                    }else{
                         bootbox.alert('Game Over,加油哦~',function(){
                            setTimeout(function(){
                                location = location;
                            },1500);
                        });
                    }
                    return;
                  }else{
                    bootbox.alert('过关~继续闯关吧~~',function(){
                        Game.start(++Game.row);
                        return;
                    });
                  }
               }
               setTimeout(function(){
                 showing.removeClass('show').addClass('match');
                 that.removeClass('show').addClass('match');
               },500);
             }
          }else{//未有展示，则将其他已经展示的移除
            if(Game.step==0){
              Game.tcount&&clearInterval(Game.tcount);
              Game.tcount = setInterval(function(){
                var sec = $('#time_sec').text()*1,
                    min = 0;
                sec++;
                if(sec<10){
                  $('#time_sec').text('0'+sec);
                  return;
                }
                if(sec>60){
                  $('#time_sec').text('00');
                  min = $('#time_min').text()*1;
                  min++;
                  if(min<9){
                    $('#time_min').text('0'+min);
                    return;
                  }
                  $('#time_min').text(min);
                }else{
                  $('#time_sec').text(sec);
                }
              },1000);
            }
            showing.removeClass('show').find('span').text('');
            Game.oneShow = true;
          }
        });
      },
      summary:function(){
        var steps = 0;
        $('#level_pass li').each(function(){
          steps+=$(this).find('span').eq(0).text()*1;
        });
        return steps;
      },
      countTime:function(){
        var min = 0,
            sec = 0,
            time = {};
        $('#level_pass li').each(function(){
          min+=$(this).find('span').eq(1).text()*1;
          sec+=$(this).find('span').eq(2).text()*1;
        });
        min += Math.floor(sec/60);
        sec = sec%60;
        time.sec = sec;
        time.min = min;
        return time;
      }
    };
    var PostScore = {
            datas:{
                short_name:'shellphon',
                thread_key:'g-match',
                secret:'980060bdb2bb38f1bdf5d73b37382696',
                author_name:'g-match',
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
    var RangeNet = {
      range:[],
      pull:function(){//拉下数据，并排序后返回数组给range
        var that = this;
        $.ajax({
               type: "get",
               async: false,
               cache:true,
               url: 'http://api.duoshuo.com/threads/listPosts.jsonp?order=desc&thread_key=g-match&short_name=shellphon&page=1&limit=15',
               dataType: "jsonp",
               jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
               //jsonpCallback:"",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
               success: function(dataJson){
                  var key,
                      temp,
                      eveObj,
                      result = [];
                  if(dataJson.parentPosts){
                   for(key in dataJson.parentPosts){
                     temp = dataJson.parentPosts[key].message.replace(/\&quot;/g,'"');
                     eveObj = JSON.parse(temp);
                     eveObj.time = dataJson.parentPosts[key].created_at;
                     result.push(eveObj);
                   }
                 }
                 that.range = that.sortRange(result);
                 that.showRange();
               }
             });
      },
      sortRange:function(arr){
        return arr.sort(function(a,b){
          return a.step-b.step
        });
      },
      showRange:function(){
        var tmpl = '<tr><td>{i}</td><td>{id}</td><td>{step}</td><td>{time}</td></tr>',
            temp = '',
            item;
        for(var i=0;i<this.range.length;i++){
            item = this.range[i];
            temp+=tmpl.replace(/{i}/g,(i+1)).replace(/{id}/g,item.id).replace(/{step}/g,item.step)
            .replace(/{time}/g,item.min+':'+item.sec);
        }
        $('#range').html(temp);
      },
      isBreakRange:function(step){
        return this.range.length<10 || this.range.slice(0,10).some(function(e){
          return e.step>step;
        });
      }
    };
    RangeNet.pull();
    Game.start(2);
  })(jQuery);