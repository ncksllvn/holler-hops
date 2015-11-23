(function($){
  $(function(){

    $('.button-collapse').sideNav();
    
    $('.slider').slider({full_width: true});
    
    $('.maps').click(function () {
      $('.maps iframe').css("pointer-events", "auto");
    });
    
    //Fixed positioning for the scrollspy on the menu page
    var $menu = $('#menu') 
    
    if ($menu.length)
      $('#menu ul').pushpin({ top: $menu.offset().top, offset: 64 });
    
    $('.scrollspy').scrollSpy();
    
    $('.parallax').parallax();

  }); // end of document ready
})(jQuery); // end of jQuery name space