/**
 * **** BISMILLAH-HIRRAHMAH-NIRRAHEEM ***
 * Created by samuleghurry on 20/01/2018.
 */

$(document).ready(function () {
    var preLoaderlogo   = document.querySelector('.preLoaderlogo');
    var preloader = document.querySelector('.preloader');

    var maxX = preloader.clientWidth  - preLoaderlogo.clientWidth;
    var maxY = preloader.clientHeight - preLoaderlogo.clientHeight;

    window.ondeviceorientation = function(event) {
        var x = event.beta;  // In degree in the range [-180,180]
        var y = event.gamma; // In degree in the range [-90,90]

        output.innerHTML  = "beta : " + x + "\n";
        output.innerHTML += "gamma: " + y + "\n";
        output.innerHTML  = "preloader : " + preloader.clientWidth + " x " + preloader.clientHeight + "\n";
        output.innerHTML  = "preLoaderlogo : " + preLoaderlogo.clientWidth + " x " + preLoaderlogo.clientHeight + "\n";

        // Because we don't want to have the device upside down
        // We constrain the x value to the range [-90,90]
        if (x >  90) { x =  90};
        if (x < -90) { x = -90};

        // To make computation easier we shift the range of
        // x and y to [0,180]
        x += 90;
        y += 90;

        // 10 is half the size of the preLoaderlogo
        // It center the positioning point to the center of the preLoaderlogo
        preLoaderlogo.style.top  = (maxX*x/180 - (preLoaderlogo.clientHeight/2)) + "px";
        preLoaderlogo.style.left = (maxY*y/180 - (preLoaderlogo.clientWidth/2)) + "px";
    }

    $("#main").hide();

    isMobile = $(this).isMobile();
    if (!isMobile) $('#spiniPhoneX').hide();

    //$(this).load();
});