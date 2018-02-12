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

    // Set device orientation markers.
    $(this).util_addDeviceOrientationMarkers();

    // Add twinkling stars to body.
    $("body").util_showStars(true);

    // Hide main content.
    $("#main").hide();

    // Show loading animation.
    $(this).showLoadingAnimation();
};