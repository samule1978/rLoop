/**
 * **** BISMILLAH-HIRRAHMAH-NIRRAHEEM ***
 * Created by samuleghurry on 20/01/2018.
 */

var showDebug = false;
var debug = document.querySelector('.debug');

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
        debug.innerHTML += "Alpha : " + event.alpha + "<br />";
        debug.innerHTML += "Beta : " + event.beta + "<br />";
        debug.innerHTML += "Gamma : " + event.gamma + "<br />";
    }
};
