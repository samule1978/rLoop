/**
 * **** BISMILLAH-HIRRAHMAH-NIRRAHEEM ***
 * Created by samuleghurry on 20/01/2018.
 */

$(document).ready(function () {
    window.ondeviceorientation = function(event) {
        degrees = Math.round(event.gamma);

        $("#containerRLoopIcon").rotate(-degrees);
    }

    $("#main").hide();

    isMobile = $(this).isMobile();
    if (!isMobile) $('#spiniPhoneX').hide();

    //$(this).load();
});