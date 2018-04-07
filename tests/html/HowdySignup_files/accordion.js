/**
 * Created by dfuller on 2/18/15.
 */
(function ($) {

    $(document).ready(function() {

        // $("#accordion").accordion(
        $(".accordion:not(.notification-portlet-wrapper):not(.notification-container)").accordion({
                icons: {
                    header: "ui-icon-circle-plus",
                    activeHeader: "ui-icon-circle-minus"
                },
                active: false,
                collapsible: true,
                autoHeight: true,
                // heightStyle: "content" //MJ
                heightStyle: "panel"
        });

        //$("div.notification-container div:first-child").trigger( "click" );

    });

})(jQuery);
