/**
 * **** BISMILLAH-HIRRAHMAH-NIRRAHEEM ***
 * Created by samuleghurry on 21/01/2018.
 */

/******* START -- Loading Functionality *******/
/******* Variables *******/
var width = 100,
    perfData = window.performance.timing, // The PerformanceTiming interface represents timing-related performance information for the given page.
    EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
    time = parseInt((EstimatedTime/1000)%60)*100;

/******* Functions *******/
$.fn.showLoadingAnimation = function() {
    var initialDelay = 3000;

    setTimeout(function(){
        $(".headline-top").animate({
            opacity: 1
        }, initialDelay - 1000);

        $(".headline-bottom").animate({
            opacity: 1
        }, initialDelay);
    }, 0);

    $(".loadbar").delay(initialDelay).animate({
            width: width + "%"
        },
        {
            step: function(now, fx) {
                $(".hyper-loop").util_clipPathRectLeftToRight(now);
            }
        }, time);

    // Finish Loading Animation
    setTimeout(function(){
        $(".preloader-wrap").addClass("hide").queue(function(){
            $(this).dequeue().delay(3000).addClass("finished").queue(function(){
                $(this).setup();
            });
        });
    }, (time >= initialDelay) ? time : initialDelay);
};

$.fn.finishedLoading = function() {
    return $(".preloader-wrap").hasClass("finished");
};
/******* FINISH -- Loading Functionality *******/



/******* START -- Page Functionality *******/
/******* Variables *******/

/******* Functions *******/
$.fn.setup = function() {
    $("#main").show();


};