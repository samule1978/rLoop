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

    // Initialise Content.
    if ($("#main").length <= 0) $("body").append("<div id='main'></div>");
    $("#main").util_initialiseContent();

    // Add twinkling stars to body.
    $("body").util_showStars(true);

    // Show loading animation.
    $(this).showLoadingAnimation();
};