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

    // Add twinkling stars to body.
    $("body").util_showStars(true);

    // Hide main content.
    $("#main").hide();

    // Hide phone container image if not mobile.
    if (!isMobile) $('#spiniPhoneX').hide();

    // Show loading animation.
    $(this).showLoadingAnimation();
};