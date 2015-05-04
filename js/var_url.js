  (function($){
    var tmpl = '<li><a href="{url}" target="_blank">{desc}</a></li>',
        urls = [
          {url:'./toolpages/tomatto.html',desc:'番茄'},
          {url:"./toolpages/rgb.html",desc:'rgb换算'},
          {url:"./funs/ukulele.html",desc:'我的第一把CSSukulele'},
          {url:"./funs/css_draw.html",desc:'CSS画图'},
          {url:"./toolpages/eat.html",desc:'纠结的午饭'},
          {url:"./funs/flower.html",desc:'小花'},
          {url:"./funs/newton.html",desc:'钟摆'},
          {url:"./funs/love.html",desc:'表白'},
          {url:"./funs/pokemonball.html",desc:'精灵球'},
          {url:"./funs/target.html",desc:'靶子'},
          {url:"./funs/pills.html",desc:'药'},
          {url:"./funs/moondog.html",desc:'月亮哟'},
          {url:"./funs/bone.html",desc:'骷髅'},
          {url:"./funs/country.html",desc:'101'},
          {url:"./funs/cloud.html",desc:'云朵'},
          {url:"./funs/matches.html",desc:'游戏-匹配'},
          {url:"./toolpages/dontrun.html",desc:'手环数据'}
        ];
      
    $('#urls').append(urls.map(function(e){
        return tmpl.replace('{url}',e.url).replace('{desc}',e.desc);
      }).join('')
    );
  })(jQuery);
