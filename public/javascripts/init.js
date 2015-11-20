(function($){
  $(function(){

    $('.button-collapse').sideNav();
    
    $(document).ready(function(){
      $('.slider').slider({full_width: true});
    });
    
    $('.maps').click(function () {
      $('.maps iframe').css("pointer-events", "auto");
    });

        

  }); // end of document ready
})(jQuery); // end of jQuery name space