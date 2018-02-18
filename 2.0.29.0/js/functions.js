/**
 * **** BISMILLAH-HIRRAHMAH-NIRRAHEEM ***
 * Created by samuleghurry on 21/01/2018.
 */

/******* START -- Loading Functionality *******/
/******* Variables *******/
var width = 100,
    perfData = window.performance.timing, // The PerformanceTiming interface represents timing-related performance information for the given page.
    pageLoadTime = -(perfData.loadEventEnd - perfData.navigationStart),
    time = parseInt((pageLoadTime/1000)%60)*100;

/******* Functions *******/
$.fn.showLoadingAnimation = function() {
    var tlLoader = new TimelineMax();

    var duration = 3;
    var timeToLoad = ((time/1000) < duration) ? duration : (time/1000) - duration;

    var headlineTop = $(".headline-top");
    var headlineBottom = $(".headline-bottom");
    var loader = $(".loader");
    var loadbar = $(".loadbar");
    var hyperLoop = $(".hyper-loop");
    var headlineWrapBottom = $(".headline-wrap.bottom");
    var preLoadInnerBottom = $(".pre-load-inner-bottom");

    tlLoader.to(headlineTop, duration-1, {opacity:1})
            .to(headlineBottom, duration, {opacity:1}, '-=' + duration-1)
            .to(loadbar, timeToLoad, {width:"100%"})
            .to(hyperLoop, timeToLoad, {webkitClipPath:"polygon(0 0, 100% 0, 100% 100%, 0 100%)",mozClipPath:"polygon(0 0, 100% 0, 100% 100%, 0 100%)",msClipPath:"polygon(0 0, 100% 0, 100% 100%, 0 100%)",oClipPath:"polygon(0 0, 100% 0, 100% 100%, 0 100%)",clipPath:"polygon(0 0, 100% 0, 100% 100%, 0 100%)"}, '-=' + timeToLoad)
            .to(loader, 2, {opacity:0}, '+=1')
            .to(headlineWrapBottom, 4, {top:-100, opacity:0, ease:Elastic.easeOut})
            .to(preLoadInnerBottom, 4, {visibility:"hidden", opacity:0, ease:Elastic.easeOut});


    // Finish Loading Animation
    setTimeout(function(){
        $(".pre-load-outer").addClass("hide").queue(function(){
            $(this).dequeue().delay(3000).addClass("finished").queue(function(){
                $(this).setup();
            });
        });
    }, (time >= (duration*1000)) ? time : (duration*1000));
};
/******* FINISH -- Loading Functionality *******/



/******* START -- Page Functionality *******/
/******* Variables *******/

/******* Functions *******/
$.fn.setup = function() {
    // Finalise Content.
    $(this).util_finaliseContent();
};