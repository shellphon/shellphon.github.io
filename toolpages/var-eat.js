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
    console.log(ulObj);
    ulObj&&(ulObj.innerHTML=str);
  })();
