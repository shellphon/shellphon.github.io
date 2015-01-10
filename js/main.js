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
  })(jQuery);
