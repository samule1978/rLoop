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
    var device = (isMobile) ? "mobile" : "desktop";
    $("html").addClass(device);

    $('#rLoopContentVertical').fullpage({
        navigation: false,
        slidesNavigation: false,
        css3: true,
        controlArrows: false,
        scrollingSpeed: 1000
    });
    if (isMobile) {
        $('#main').util_addHorizontalSlides(".section.vertical", "section horizontal");

        $('#rLoopContentHorizontal').fullpage({
            navigation: false,
            slidesNavigation: false,
            css3: true,
            controlArrows: false,
            scrollingSpeed: 1000
        });
    }

    // Add twinkling stars to body.
    $("body").util_showStars(true);

    // Hide main content.
    $("#main").hide();

    // Show loading animation.
    $(this).showLoadingAnimation();
};