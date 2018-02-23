/**
 * **** BISMILLAH-HIRRAHMAH-NIRRAHEEM ***
 * Created by samuleghurry on 20/01/2018.
 */

$(document).ready(function () {
    $(this).initialise();
});

$.fn.initialise = function() {
    debugMobileLandscapeOnDesktop = false;

    // Set mobile flag.
    isMobile = $(this).util_isMobile();

    if (isMobile) {
        /mobile/i.test(navigator.userAgent) && !location.hash &&
        setTimeout(function () {   window.scrollTo(0, 1); }, 1000);​
    }

    // Set device type.
    $(this).util_setDeviceType(isMobile);

    // Add twinkling stars to body.
    $("body").util_showStars(true);

    // Initialise Content.
    $("body").util_initialiseContent();

    // Start animation.
    $(this).anim_Start_SceneOne();
};