(function($){
  $(function(){

    $('.button-collapse').sideNav();
    
    $(document).ready(function(){
      $('.slider').slider({full_width: true});
    });
    
    $('.maps').click(function () {
      $('.maps iframe').css("pointer-events", "auto");
    });
    
    
    //Fixed positioning for the scrollspy on the menu page
    var $menu = $('#menu') 
    
    if ($menu.length)
      $('#menu ul').pushpin({ top: $menu.offset().top, offset: 64 });
    
    $('.scrollspy').scrollSpy();

  }); // end of document ready
})(jQuery); // end of jQuery name space