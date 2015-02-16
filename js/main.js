  (function($){
    var ul = $('#ul_guide'),
        tabParent = $('#tab_content');
        $('#ul_guide li a').click(function(){
          var _this = $(this),
              curActive = ul.find('.active').eq(0);
              curActive.removeClass('active');
              _this.parents('li').addClass('active');
              tabParent.find('.active').eq(0).removeClass('active');
              $('#'+_this.attr('data-tabid')).addClass('active');
        });
    $('.show-ds').click(function(){
      $('.ds-thread').slideToggle();
    });
    var typeEffect = function(dom,time){//打字效果，
      var _obj = $(dom),
          txt = _obj.text(),
          len = txt.length;
          _obj.text('');
      function write(pos){
        var letter = txt.substr(pos,1);
        if(pos<len){
         // console.log(pos,len,letter,txt)
          _obj.append(letter);
          pos++;
          setTimeout(function(){
            write(pos); 
          },time);
        }
      }
      write(0);
    }
    setTimeout(function(){
      typeEffect('.div-title h3', 88);
      typeEffect('#tab_home p', 88);
    },500);
  })(jQuery);
