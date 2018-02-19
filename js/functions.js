/**
 * **** BISMILLAH-HIRRAHMAH-NIRRAHEEM ***
 * Created by samuleghurry on 21/01/2018.
 */

/******* START -- Loading Functionality *******/
/******* Variables *******/
var perfData = window.performance.timing, // The PerformanceTiming interface represents timing-related performance information for the given page.
    pageLoadTime = -(perfData.loadEventEnd - perfData.navigationStart),
    time = parseInt((pageLoadTime/1000)%60)*100;

/******* Functions *******/
$.fn.anim_Start_SceneOne = function() {
    //var tlLoader = new TimelineMax({onComplete:$(this).anim_Finish_SceneOne});
    var tlLoader = new TimelineMax();

    var initialDelay = 1;

    var timeToLoad = ((time/1000) < initialDelay) ? initialDelay : (time/1000) - initialDelay;

    var headlineTop = $(".headline-top");
    var headlineBottom = $(".headline-bottom");
    var loader = $(".loader");
    var loadbar = $(".loadbar");
    var hyperLoop = $(".hyper-loop");
    var headlineWrapTop = $(".headline-wrap.top");
    var headlineWrapBottom = $(".headline-wrap.bottom");
    var preLoadInnerBottom = $(".pre-load-inner-bottom");
    var rLoopMenu = $("#" + _idRLoopMenu);
    var rLoopMenuBorder = $("#" + _idRLoopMenu + " .menu-border");

    tlLoader.to(headlineTop, initialDelay, {opacity:1, delay:initialDelay})
            .to(headlineBottom, initialDelay+1, {opacity:1}, '-=' + initialDelay)
            .to(loadbar, timeToLoad, {width:"100%"})
            .to(hyperLoop, timeToLoad, {webkitClipPath:"polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                                        mozClipPath:"polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                                        msClipPath:"polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                                        oClipPath:"polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                                        clipPath:"polygon(0 0, 100% 0, 100% 100%, 0 100%)"}, '-=' + timeToLoad)
            .fromTo(loader, 2, {opacity:1}, {opacity:0}, '+=1')
            .fromTo(rLoopMenu, 1, {opacity:0}, {opacity:1, onComplete:$(this).anim_Finish_SceneOne})
            .to(headlineWrapTop, 2, {bottom:-30})
            .to(headlineWrapBottom, 2, {top:-100, opacity:0}, '-=2')
            .fromTo(preLoadInnerBottom, 1, {opacity:1}, {opacity:0})
            .to(headlineBottom, 0, {opacity:0})
            .to(headlineWrapTop, 2, {top:100})
            .to(rLoopMenuBorder, 2, {width:"100%"}, '-=2');

};
$.fn.anim_Finish_SceneOne = function() {
    $("#" + _idRLoopContent).util_disableScrollFullPage(false);
};