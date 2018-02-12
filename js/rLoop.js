/**
 * **** BISMILLAH-HIRRAHMAH-NIRRAHEEM ***
 * Created by samuleghurry on 20/01/2018.
 */

$(document).ready(function () {
    $(this).initialise();
});

$.fn.initialise = function() {
    // Set mobile flag.
    isMobile = $(this).util_isMobile();

    // Set device type.
    $(this).util_setDeviceType(isMobile);

    // Hide main content.
    $("#main").hide();

    // Add twinkling stars to body.
    $("body").util_showStars(true);

    window.onresize = function (event) {
        if($("orientation.portrait").is(":visible")) {
            if ($("#rLoopContent .section.landscape").length > 0) {
                var portraitSections = "";

                $("#rLoopContent .section.landscape .slide").each(function(index) {
                    portraitSections += "<div class='section portrait'>" + $(this).html() + "</div>";
                });

                $("#rLoopContent").html(portraitSections);
            }
        } else {
            if ($("#rLoopContent .section.portrait").length > 0) {
                var landscapeSections = "";

                $("#rLoopContent .section.portrait").each(function(index) {
                    landscapeSections += "<div class='slide'>" + $(this).html() + "</div>";
                });

                landscapeSections = "<div class='section landscape'>" + landscapeSections + "</div>";

                $("#rLoopContent").html(landscapeSections);
            }
        }
        alert($("#rLoopContent").html());
    };

    // Show loading animation.
    $(this).showLoadingAnimation();

    $('#rLoopContent').fullpage({
        /*navigation: false,
         slidesNavigation: false,*/
        css3: true,
        controlArrows: false,
        scrollingSpeed: 750
    });
};