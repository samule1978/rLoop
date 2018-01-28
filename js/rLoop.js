/**
 * **** BISMILLAH-HIRRAHMAH-NIRRAHEEM ***
 * Created by samuleghurry on 20/01/2018.
 */

var showDebug = false;

$(document).ready(function () {
    showDebug = true;
    $(this).showDebugInfo();

    $("#main").hide();

    isMobile = $(this).isMobile();
    if (!isMobile) $('#spiniPhoneX').hide();

    $(this).load();
});

$.fn.showDebugInfo = function() {
    if (!showDebug) return;

    // Show Gyro Info
    window.ondeviceorientation = function(event) {
        $(this).debugLog("Alpha : " + event.alpha);
        $(this).debugLog("Beta : " + event.beta);
        $(this).debugLog("Gamma : " + event.gamma);
    }
};
