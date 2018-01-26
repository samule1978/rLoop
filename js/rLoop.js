/**
 * **** BISMILLAH-HIRRAHMAH-NIRRAHEEM ***
 * Created by samuleghurry on 20/01/2018.
 */

$(document).ready(function () {
    window.ondeviceorientation = function(event) {
        var x = Math.round(event.beta);  // In degree in the range [-180,180]
        var y = Math.round(event.gamma); // In degree in the range [-90,90]
        var left, right;

        if($(this).portrait()) {
            $(".containerRLoopIcon").rotate(y + "deg");
            $(".loader-wrap-top").clipPathPolygonTop(y, 49.75 - y, 49.75 + y);
            $(".loader-wrap-bottom").clipPathPolygonBottom(y, 49.75 - y, 49.75 + y);

        } else {
            // Because we don't want to have the device upside down
            // We constrain the x value to the range [-90,90]
            //if (x >  90) { x =  90};
            //if (x < -90) { x = -90};

            // To make computation easier we shift the range of
            // x and y to [0,180]
            //x += 90;
            //y += 90;

            $(".containerRLoopIcon").rotate(-x + "deg");
            $(".loader-wrap-top").clipPathPolygonTop(x, 50.25 + x, 50.25 - x);
            $(".loader-wrap-bottom").clipPathPolygonBottom(x, 50.25 + x, 50.25 - x);
        }

        var debug = document.querySelector('.debug');
        debug.innerHTML  = "beta : " + x + "<br />";
        debug.innerHTML += "gamma: " + y + "<br />";
        debug.innerHTML += "left: " + left + "%" + "<br />";
        debug.innerHTML += "right: " + right + "%" + "<br />";
    }

    $("#main").hide();

    isMobile = $(this).isMobile();
    if (!isMobile) $('#spiniPhoneX').hide();

    //$(this).load();
});