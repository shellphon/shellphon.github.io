  (function(){
    var data = {
        'menu' : [
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
        ],
        'extra':[
            {'price':'3.0','name':'鸡肝、蒸腊肠'},
            {'price':'4.0','name':'扣肉'},
            {'price':'5.0','name':'烧汁淋菜、凉拌青瓜'},
            {'price':'6.0','name':'卤鸭肾、卤鸡翅'},
            {'price':'7.0','name':'烧鸡翅、卤鸡腿'},
            {'price':'8.0','name':'海鱼'},
            {'price':'2.0','name':'米饭'},
            {'price':'2.0','name':'卤豆腐、卤鸡蛋'},
            {'price':'2.0','name':'卤海带、莲藕'},
            {'price':'2.0','name':'酱香萝卜干、榨菜'},
            {'price':'2.0','name':'酸豆角'},
            {'price':'3.0','name':'竹笋'}
        ]
    };
    var str = '',
        exStr='',
        template = '<tr class="${class}"><td class="dish-id">${i}</td><td class="name">${name}</td><td class="price">${price}</td></tr>',
        oMenu = document.getElementById('menu'),
        oExtra = document.getElementById('extra');
        data['menu'].forEach(function(e,i){
            if(i%2){
                str += template.replace('${class}','').replace('${name}',e.name).replace('${price}',e.price).replace('${i}',i+1);
            }else{
                str += template.replace('${class}','info').replace('${name}',e.name).replace('${price}',e.price).replace('${i}',i+1);
            }
        }); 
        data['extra'].forEach(function(e,i){
            if(i%2){
                exStr += template.replace('${class}','').replace('${name}',e.name).replace('${price}',e.price).replace('${i}','☆');
            }else{
                exStr += template.replace('${class}','success').replace('${name}',e.name).replace('${price}',e.price).replace('${i}','☆');
            }
        }); 
    oMenu&&(oMenu.innerHTML=str);
    oExtra&&(oExtra.innerHTML=exStr);
  })();
