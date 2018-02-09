/**
 * **** BISMILLAH-HIRRAHMAH-NIRRAHEEM ***
 * Created by samuleghurry on 20/01/2018.
 */

$(document).ready(function () {
    $(this).initialise();
});

$.fn.initialise = function() {
    // Set mobile flag
    isMobile = $(this).util_isMobile();

    var device = (isMobile) ? "mobile" : "desktop";
    var orientation = ($(this).util_portrait()) ? "portrait" : "landscape";
    $("body").addClass(device + "-" + orientation);

    $(this).util_trackDeviceOrientation();

    // Add twinkling stars to body.
    $("body").util_showStars(true);

    // Hide main content.
    $("#main").hide();

    // Show loading animation.
    $(this).showLoadingAnimation();
};