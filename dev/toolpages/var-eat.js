  (function(){
    var restArr = [
      '中大职工饭堂',
      '肯德基',
      '天桥饺子店',
      '百佳超市',
      '仙踪林',
      '星巴克',
      '都城快餐'
    ],
    str='',
    ulObj = document.getElementById('rest_ul');
    restArr.forEach(function(e,i){
      str+='<li>'+e+'</li>';
    });

    var laweiArr = [{"price":"7.0","name":"卤蛋拼卤豆腐饭"},{"price":"7.0","name":"鸭肝拼豆腐饭"},{"price":"8.0","name":"卤蛋拼腊肠饭"},{"price":"8.0","name":"卤豆腐拼腊肠饭"},{"price":"8.0","name":"卤鸡翅饭"},{"price":"8.0","name":"鸭肾饭"},{"price":"9.0","name":"烧鸡翅饭"},{"price":"9.0","name":"金牌港式烧鸡饭"},{"price":"9.0","name":"金牌鸡腿饭"},{"price":"9.0","name":"小鱼仔饭"},{"price":"10.0","name":"金牌红烧肉饭"},{"price":"10.0","name":"海鱼饭"},{"price":"10.0","name":"金牌扣肉饭"},{"price":"10.0","name":"招牌五花肉饭"},{"price":"10.0","name":"小肠饭"},{"price":"10.0","name":"金牌肥肠饭"},{"price":"11.0","name":"烧鸭腿饭"},{"price":"11.0","name":"白切鸭腿饭"},{"price":"11.0","name":"干煸烧鸭腿饭"},{"price":"11.0","name":"卤鸡翅拼腊肠饭"},{"price":"11.0","name":"卤鸭肾拼腊肠饭"},{"price":"11.0","name":"金牌叉烧饭"},{"price":"11.0","name":"蜜汁叉烧饭"},{"price":"12.0","name":"招牌猪脚饭"},{"price":"12.0","name":"烧鸡翅拼腊肠饭"},{"price":"12.0","name":"文昌鸡饭"},{"price":"12.0","name":"金牌猪肚饭"},{"price":"12.0","name":"烧鸭拼腊肠饭"},{"price":"13.0","name":"文昌鸡腿饭"},{"price":"13.0","name":"金牌烧鸭拼扣肉饭"},{"price":"14.0","name":"金牌叉烧拼腊肠饭"},{"price":"15.0","name":"金牌猪脚拼扣肉饭"},{"price":"15.0","name":"金牌叉烧拼扣肉饭"}]; 
   // console.log(ulObj);
    ulObj&&(ulObj.innerHTML=str);
  })();
