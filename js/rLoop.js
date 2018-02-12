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

    // Initialise Content.
    $(this).util_initialiseContent();

    // Show loading animation.
    $(this).showLoadingAnimation();
};