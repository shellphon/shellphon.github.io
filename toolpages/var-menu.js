  (function(){
    var menuArr = [
        {"price":"7.0","name":"卤蛋拼卤豆腐饭"},
        {"price":"7.0","name":"鸭肝拼豆腐饭"},
        {"price":"8.0","name":"卤蛋拼腊肠饭"},
        {"price":"8.0","name":"卤豆腐拼腊肠饭"},
        {"price":"8.0","name":"卤鸡翅饭"},
        {"price":"8.0","name":"鸭肾饭"},
        {"price":"9.0","name":"烧鸡翅饭"},
        {"price":"9.0","name":"金牌鸡腿饭"},
        {"price":"9.0","name":"小鱼仔饭"},
        {"price":"10.0","name":"金牌港式烧鸭饭"},
        {"price":"10.0","name":"金牌白切鸭饭"},
        {"price":"10.0","name":"金牌红烧肉饭"},
        {"price":"10.0","name":"煎海鱼饭"},
        {"price":"10.0","name":"金牌扣肉饭"},
        {"price":"10.0","name":"招牌五花肉饭"},
        {"price":"10.0","name":"小肠饭"},
        {"price":"10.0","name":"金牌肥肠饭"},
        {"price":"11.0","name":"烧鸭腿饭"},
        {"price":"11.0","name":"白切鸭腿饭"},
        {"price":"11.0","name":"干煸烧鸭腿饭"},
        {"price":"11.0","name":"卤鸡翅拼腊肠饭"},
        {"price":"11.0","name":"卤鸭肾拼腊肠饭"},
        {"price":"11.0","name":"金牌叉烧饭"},
        {"price":"11.0","name":"蜜汁叉烧饭"},
        {"price":"12.0","name":"招牌猪脚饭"},
        {"price":"12.0","name":"烧鸡翅拼腊肠饭"},
        {"price":"12.0","name":"金牌猪肚饭"},
        {"price":"12.0","name":"回锅肉"},
        {"price":"12.0","name":"烧鸭拼腊肠饭"},
        {"price":"12.0","name":"香菇鸡饭"},
        {"price":"13.0","name":"文昌鸡饭"},
        {"price":"13.0","name":"排骨饭"},
        {"price":"13.0","name":"金牌烧鸭拼扣肉饭"},
        {"price":"14.0","name":"文昌鸡腿饭"},
        {"price":"14.0","name":"金牌叉烧拼腊肠饭"},
        {"price":"15.0","name":"金牌猪脚拼扣肉饭"},
        {"price":"15.0","name":"金牌叉烧拼扣肉饭"},
        {"price":"15.0","name":"金牌牛腩饭"},
        {"price":"16.0","name":"金牌烧鸭拼叉烧饭"}
    ];
    var str = '',
        template = '<tr><td class="dish-id">${i}</td><td class="name">${name}</td><td class="price">${price}</td></tr>',
        oMenu = document.getElementById('menu');
        menuArr.forEach(function(e,i){
          str += template.replace('${name}',e.name).replace('${price}',e.price).replace('${i}',i+1);
        }); 
    oMenu&&(oMenu.innerHTML=str);
  })();
