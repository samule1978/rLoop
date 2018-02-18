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
$.fn.anim_Start_SceneOne = function() {
    var tlLoader = new TimelineMax({onComplete:$(this).anim_Finish_SceneOne});

    var initialDelay = 1;

    var timeToLoad = ((time/1000) < initialDelay) ? initialDelay : (time/1000) - initialDelay;

    var headlineTop = $(".headline-top");
    var headlineBottom = $(".headline-bottom");
    var loader = $(".loader");
    var loadbar = $(".loadbar");
    var hyperLoop = $(".hyper-loop");
    var headlineWrapBottom = $(".headline-wrap.bottom");
    var preLoadInnerBottom = $(".pre-load-inner-bottom");
    var rLoopMenu = $("#" + _idRLoopMenu);

    tlLoader.to(headlineTop, initialDelay, {opacity:1, delay:initialDelay})
            .to(headlineBottom, initialDelay+1, {opacity:1}, '-=' + initialDelay)
            .to(loadbar, timeToLoad, {width:"100%"})
            .to(hyperLoop, timeToLoad, {webkitClipPath:"polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                                        mozClipPath:"polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                                        msClipPath:"polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                                        oClipPath:"polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                                        clipPath:"polygon(0 0, 100% 0, 100% 100%, 0 100%)"}, '-=' + timeToLoad)
            .fromTo(loader, 2, {opacity:1}, {opacity:0}, '+=1')
            .to(headlineWrapBottom, 3, {top:-100, opacity:0, ease:Elastic.easeOut})
            .fromTo(preLoadInnerBottom, 1, {opacity:1}, {opacity:0})
            .fromTo(rLoopMenu, 2, {opacity:0}, {opacity:1});
};
$.fn.anim_Finish_SceneOne = function() {
    $("#" + _idRLoopContent).util_disableScrollFullPage(false);
};