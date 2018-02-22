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
            .fromTo(loader, 1, {opacity:1}, {opacity:0}, '+=1')
            .fromTo(rLoopMenu, 1, {opacity:0}, {opacity:1})
            .to(headlineWrapTop, 1, {bottom:-30})
            .to(headlineWrapBottom, 1, {top:-100, opacity:0}, '-=1')
            .fromTo(preLoadInnerBottom, 1, {opacity:1}, {opacity:0})
            .to(headlineBottom, 0, {opacity:0})
            .to(headlineWrapTop, 1, {top:100})
            .to(rLoopMenuBorder, 1, {width:"100%", onComplete:$(this).anim_Finish_SceneOne}, '-=1')
            .to(bgPod, 1, {opacity:1}, '-=1')
            .to(preLoadOuter, 2, {background:"rgba(0, 0, 0, 0.3)"}, '-=1');

    sceneOneInitialised = true;
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

var ringOne, ringTwo, ringThree, ringFour;
$.fn.anim_Start_SceneTwo = function() {
    if (!sceneTwoInitialised) $("#" + _idRLoopContent).util_disableScrollFullPage(false);

    $("#sceneTwo .section-graphics").empty(); // Must empty to ensure nothing is inside when we add animations (especially when scene reloaded/resized).

    var container = document.getElementById('sceneTwo').getElementsByClassName('section-graphics')[0];

    var percentageHeight = 100;
    var coinHeight = 0;
    if ($("#sceneTwo .section-graphics").innerWidth() > $("#sceneTwo .section-graphics").innerHeight()) {
        coinHeight = ($("#sceneTwo .section-graphics").innerHeight() / 100) * percentageHeight;
    } else {
        coinHeight = ($("#sceneTwo .section-graphics").innerWidth() / 100) * percentageHeight;
    }
    var initialRadius = (coinHeight / 2) + 40;
    var initialDotSize = 10;
    var initialDotCount = 20;

    var rTokenContainerObject = document.createElement("div");
    var backgroundSize = "";
    rTokenContainerObject.setAttribute("id", "rTokenContainer");
    if ($("#sceneTwo .section-graphics").innerWidth() > $("#sceneTwo .section-graphics").innerHeight()) {
        backgroundSize = "background-size: auto " + percentageHeight + "%;";
    } else {
        backgroundSize = "background-size: " + percentageHeight + "% auto;";
    }
    rTokenContainerObject.setAttribute("style", "position: absolute; width: 100%; height: 100%; background-image: url(img/assets/coin.png); background-position: 50% 50%; background-repeat: no-repeat;" + backgroundSize);
    container.appendChild(rTokenContainerObject);

    container = document.getElementById('rTokenContainer');

    var rTokenContainer = $("#rTokenContainer");
    var tokenEaseTime = 1;
    if (!sceneTwoInitialised) {
        TweenMax.fromTo(rTokenContainer, tokenEaseTime, {opacity:1, transform:"scale(0)"}, {opacity:1, transform:"scale(1)", ease: SlowMo.ease.config(0.1, 2, false)});
    } else {
        TweenMax.fromTo(rTokenContainer, tokenEaseTime, {opacity:0}, {opacity:1});
    }

    ringOne = new addCoinDots({
        parent:container,
        radius:initialRadius,
        dotSize:initialDotSize,
        dotCount:initialDotCount,
        colors:["#00fcff"],
        animationOffset: 1.8,
    });
    ringTwo = new addCoinDots({
        parent:container,
        radius:(initialRadius + 40),
        dotSize:initialDotSize - 2.5,
        dotCount:initialDotCount + 5,
        colors:["#60fdff"],
        animationOffset: 1.6,
    });
    ringThree = new addCoinDots({
        parent:container,
        radius:(initialRadius + 80),
        dotSize:initialDotSize - 5,
        dotCount:initialDotCount + 10,
        colors:["#93fdff"],
        animationOffset: 1.4,
    });
    ringFour = new addCoinDots({
        parent:container,
        radius:(initialRadius + 120),
        dotSize:initialDotSize - 7.5,
        dotCount:initialDotCount + 15,
        colors:["#93fdff"],
        animationOffset: 1.2,
    });

    if (!sceneTwoInitialised) {
        setTimeout(function() {
            ringOne.active(true);
        }, tokenEaseTime * 500);
        setTimeout(function() {
            ringTwo.active(true);
        }, tokenEaseTime * 1000);
        setTimeout(function() {
            ringThree.active(true);
        }, tokenEaseTime * 1500);
        setTimeout(function() {
            ringFour.active(true);
        }, tokenEaseTime * 2000);
    } else {
        ringOne.active(true);
        ringTwo.active(true);
        ringThree.active(true);
        ringFour.active(true);
    }

    function addCoinDots(options) {
        options = options || {};
        var parent = options.parent || document.body,
            element = this.element = document.createElement("div"),
            radius = options.radius || 42,
            dotSize = options.dotSize || 15,
            animationOffset = options.animationOffset || 1.8, //jumps to a more active part of the animation initially (just looks cooler especially when the preloader isn't displayed for very long)
            createDot = function(rotation) {
                var dot = document.createElement("div");
                element.appendChild(dot);
                TweenLite.set(dot, {width:dotSize, height:dotSize, transformOrigin:(-radius + "px 0px"), x: radius, backgroundColor:colors[colors.length-1], borderRadius:"50%", force3D:true, position:"absolute", rotation:rotation});
                dot.className = options.dotClass || "preloader-dot";
                return dot;
            },
            i = options.dotCount || 10,
            rotationIncrement = 360 / i,
            colors = options.colors || ["#61AC27","black"],
            animation = new TimelineLite({paused:true}),
            dots = [],
            isActive = false,
            box = document.createElement("div"),
            tl, dot, closingAnimation, j;
        colors.push(colors.shift());

        parent.appendChild(element);

        TweenLite.set(element, {position:"relative", top:"50%", left:"50%", perspective:600, overflow:"visible", zIndex:2000});
        animation.from(box, 0.1, {opacity:0, scale:0.1, ease:Power1.easeOut}, animationOffset);
        while (--i > -1) {
            dot = createDot(i * rotationIncrement);
            dots.unshift(dot);
            animation.from(dot, 0.1, {scale:0.01, opacity:0, ease:Power1.easeOut}, animationOffset);
            //tuck the repeating parts of the animation into a nested TimelineMax (the intro shouldn't be repeated)
            tl = new TimelineMax({repeat:-1, repeatDelay:0.25});
            for (j = 0; j < colors.length; j++) {
                tl.to(dot, 2.5, {rotation:"-=360", ease:Power2.easeInOut}, j * 2.9)
                    .to(dot, 1.2, {skewX:"+=360", backgroundColor:colors[j], ease:Power2.easeInOut}, 1.6 + 2.9 * j);
            }
            //stagger its placement into the master timeline
            animation.add(tl, i * 0.07);
        }
        if (TweenLite.render) {
            TweenLite.render(); //trigger the from() tweens' lazy-rendering (otherwise it'd take one tick to render everything in the beginning state, thus things may flash on the screen for a moment initially). There are other ways around this, but TweenLite.render() is probably the simplest in this case.
        }

        //call preloader.active(true) to open the preloader, preloader.active(false) to close it, or preloader.active() to get the current state.
        this.active = function(show) {
            if (!arguments.length) {
                return isActive;
            }
            if (isActive != show) {
                isActive = show;
                if (closingAnimation) {
                    closingAnimation.kill(); //in case the preloader is made active/inactive/active/inactive really fast and there's still a closing animation running, kill it.
                }
                if (isActive) {
                    element.style.visibility = "visible";
                    TweenLite.set([element, box], {rotation:0});
                    animation.play(animationOffset);
                } else {
                    closingAnimation = new TimelineLite();
                    if (animation.time() < animationOffset + 0.3) {
                        animation.pause();
                        closingAnimation.to(element, 1, {rotation:-360, ease:Power1.easeInOut}).to(box, 1, {rotation:360, ease:Power1.easeInOut}, 0);
                    }
                    closingAnimation.staggerTo(dots, 0.3, {scale:0.01, opacity:0, ease:Power1.easeIn, overwrite:false}, 0.05, 0).to(box, 0.4, {opacity:0, scale:0.2, ease:Power2.easeIn, overwrite:false}, 0).call(function() { animation.pause(); closingAnimation = null; }).set(element, {visibility:"hidden"});
                }
            }
            return this;
        };
    }

    if (!sceneTwoInitialised) {
        $("#" + _idRLoopContent).util_disableScrollFullPage(false);
        sceneTwoInitialised = true;
    }
};
$.fn.anim_Stop_SceneTwo = function() {
    var rTokenContainer = $("#rTokenContainer");
    var tokenEaseTime = 1;
    TweenMax.fromTo(rTokenContainer, tokenEaseTime, {opacity:1}, {opacity:0});

    ringOne.active(false);
    ringTwo.active(false);
    ringThree.active(false);
    ringFour.active(false);
};

$.fn.anim_Start_SceneThree = function() {
    if (!sceneThreeInitialised) $("#" + _idRLoopContent).util_disableScrollFullPage(true);

    if (!sceneThreeInitialised) {
        $("#" + _idRLoopContent).util_disableScrollFullPage(false);
        sceneThreeInitialised = true;
    }
};
$.fn.anim_Stop_SceneThree = function() {
};

$.fn.anim_Start_SceneFour = function() {
    if (!sceneFourInitialised) $("#" + _idRLoopContent).util_disableScrollFullPage(true);

    if (!sceneFourInitialised) {
        $("#" + _idRLoopContent).util_disableScrollFullPage(false);
        sceneFourInitialised = true;
    }
};
$.fn.anim_Stop_SceneFour = function() {
};

$.fn.anim_Start_SceneFive = function() {
    if (!sceneFiveInitialised) $("#" + _idRLoopContent).util_disableScrollFullPage(true);

    if (!sceneFiveInitialised) {
        $("#" + _idRLoopContent).util_disableScrollFullPage(false);
        sceneFiveInitialised = true;
    }
};
$.fn.anim_Stop_SceneFive = function() {
};

$.fn.anim_Start_Scene_Content = function(scene) {
    var tlLoader = new TimelineMax();

    var sceneContent = scene.find(".section-content");

    tlLoader.fromTo(sceneContent, 1, {opacity:0}, {opacity:1});
};
$.fn.anim_Stop_Scene_Content = function(scene) {
    var tlLoader = new TimelineMax();

    var sceneContent = scene.find(".section-content");

    tlLoader.fromTo(sceneContent, 1, {opacity:1}, {opacity:0});
};

$.fn.resize_Scenes = function() {
    var activeSection = $(".section.active");
    switch(activeSection.attr('id')) {
        case "sceneOne":
            $(this).resize_SceneOne();
        case "sceneTwo":
            $(this).anim_Start_SceneTwo();
        case "sceneThree":
        case "sceneFour":
        case "sceneFive":
        default:
            break;
    }
};