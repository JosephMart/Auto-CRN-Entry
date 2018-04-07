(function ($) {

  $(document).ready(function() {
    $(".customExpand").click(function(){



        $(this).next().toggle( "slow", function() {



        });
        return false;

    });

      $( "#tabs" ).tabs();

  });

})(jQuery);


