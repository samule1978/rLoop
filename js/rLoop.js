/**
 * **** BISMILLAH-HIRRAHMAH-NIRRAHEEM ***
 * Created by samuleghurry on 20/01/2018.
 */

// Set mobile flag.
isMobile = $(this).util_isMobile();

// Set device type.
var device = (isMobile) ? "mobile" : "desktop";
$("body").addClass(device);

// Add twinkling stars to body.
$("body").util_showStars(true);

// Hide main content.
$("#main").hide();

// Show loading animation.
$(this).showLoadingAnimation();


$(document).ready(function () {
    $(this).initialise();
});

$.fn.initialise = function() {
};