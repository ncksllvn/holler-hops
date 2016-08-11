(function($){
  $(function(){

    // Side navigation for mobile ------------
    $('.button-collapse').sideNav();

    // Dropdown buttons
    $(".dropdown-button").dropdown();

    // Index page -------------------------
    $('.slider').slider({full_width: true});

    // Fix for Google Map picking up scrolling
    $('.maps').click(function () {
      $('.maps iframe').css("pointer-events", "auto");
    });

    // Menu page ------------------------
    var $menu = $('#menu')

    if ($menu.length)
      $('#menu ul').pushpin({ top: $menu.offset().top, offset: 64 });

    $('.scrollspy').scrollSpy();

    // Our Story --------------------------
    $('.parallax').parallax();

    // Contact Page ------------------------
    $('form[name=contact]').submit(function(event){
      event.preventDefault()

      var $this = $(this)
      var $submit = $this.find('button[type=submit]').attr('disabled', 'true')
      var $message = $('.email-response')

      $.post('/contact', $this.serialize())
        .done(function(response){
          $this.fadeOut()
          $message.html('Your message has been received! We will respond to you soon.')
        })
        .fail(function(response){
          $message.html('There was a problem trying to send your message. Sorry about that.')
        })


    })

  }); // end of document ready
})(jQuery); // end of jQuery name space