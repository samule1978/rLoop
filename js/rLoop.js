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

    // Set device orientation markers.
    //$(this).util_addDeviceOrientationMarkers();
    alert($("orientation.portrait").is(":visible") ? "P" : "L");
    window.addEventListener("orientationchange", function() {
        //$(this).util_amendContentBasedOnOrientation();
        alert($("orientation.portrait").is(":visible") ? "P" : "L");
    }, false);

    $(this).util_amendContentBasedOnOrientationChange();

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