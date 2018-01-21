/**
 * **** BISMILLAH-HIRRAHMAH-NIRRAHEEM ***
 * Created by samuleghurry on 20/01/2018.
 */

var width = 100,
    perfData = window.performance.timing, // The PerformanceTiming interface represents timing-related performance information for the given page.
    EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
    time = parseInt((EstimatedTime/1000)%60)*100;

// Percentage Increment Animation
var start = 0,
    end = 100,
    durataion = time;

$(document).ready(function () {
    // Loadbar Animation
    $(".loadbar").animate({
        width: width + "%"
    }, time);

    // Fading Out Loadbar on Finised
    setTimeout(function(){
        $('.preloader-wrap').fadeOut(700);
    }, time);
});

