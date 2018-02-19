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
    $(this).resize_SceneOne();

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
    var bgPod = $(".bg-pod");
    var preLoadOuter = $(".pre-load-outer");

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
            .to(rLoopMenuBorder, 2, {width:"100%"}, '-=2')
            .to(bgPod, 3, {opacity:1}, '-=2')
            .to(preLoadOuter, 5, {background:"rgba(0, 0, 0, 0.5)"}, '-=3');

};
$.fn.anim_Finish_SceneOne = function() {
    $("#" + _idRLoopContent).util_disableScrollFullPage(false);
};
$.fn.resize_SceneOne = function() {
    function set_css(elem_id, style) {
        var elem = id(elem_id);
        for (var prop in style) {
            elem.style[prop] = style[prop];
        }
    }
    function id(id) {
        return document.getElementById(id);
    }
    function len(num) {
        return (w * num).toFixed(2) + 'vw';
    }
    function blend(a, b, t) {
        t = clamp01(t);
        return a * (1 - t) + b * t;
    }
    function clamp(min, max, t) {
        if (t < min) return min;
        if (t > max) return max;
        return t;
    }

    var clamp01 = clamp.bind(null, 0, 1);

    var ww = window.innerWidth,
        wh = window.innerHeight,
        ratio = ww / wh,
        mobility,
        mob0h = 0.57,
        mob1h = 1.5;
    if (ratio * mob0h > 1) {
        mobility = 1 - ratio * mob0h;
    } else if (ratio * mob1h < 1) {
        mobility = 1;
    } else {
        mobility = 1 - (1 / ratio - mob1h) / (mob0h - mob1h);
    }
    var w = mobility < 0 ? 1 / (1 - mobility) : 1;

    var bg_w = len(blend(105, 140, mobility)),
        bg_h = len(blend(75, 110, mobility)),
        bg_x = blend(50, 50, mobility) + '%',
        bg_y = len(blend(-15, 14, mobility)),
        bg_size = bg_w + ' ' + bg_h + ', 100vw ' + bg_h;
    if (ratio > 0.5) {
        bg_size = bg_size + ', ' + bg_w + ' 100vh';
    } else {
        bg_size = bg_size + ', ' + bg_w + ' 100px';
    }
    set_css('bgPod', {
        backgroundImage: 'url(img/bg/pod_conv.jpg), url(img/bg/pod_h.png), url(img/bg/pod_v.png)',
        backgroundSize: bg_size,
        backgroundPosition: bg_x + ' ' + bg_y + ', 0 ' + bg_y + ', ' + bg_x + ' 0%',
        backgroundRepeat: 'no-repeat, no-repeat, no-repeat',
    });
};

$.fn.resize_Scenes = function() {
    $(this).resize_SceneOne();
};