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

    var tlLoader = new TimelineMax({onComplete:$(this).anim_Finish_SceneOne});
    //var tlLoader = new TimelineMax();

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
            .fromTo(rLoopMenu, 1, {opacity:0}, {opacity:1})
            .to(headlineWrapTop, 2, {bottom:-30})
            .to(headlineWrapBottom, 2, {top:-100, opacity:0}, '-=2')
            .fromTo(preLoadInnerBottom, 1, {opacity:1}, {opacity:0})
            .to(headlineBottom, 0, {opacity:0})
            .to(headlineWrapTop, 2, {top:100})
            .to(rLoopMenuBorder, 2, {width:"100%"}, '-=2')
            .to(bgPod, 3, {opacity:1}, '-=2')
            .to(preLoadOuter, 5, {background:"rgba(0, 0, 0, 0.3)"}, '-=3');

};
$.fn.anim_Finish_SceneOne = function() {
    $("#" + _idRLoopContent).util_disableScrollFullPage(false);

    $(this).anim_Start_SceneTwo();
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

$.fn.anim_Start_SceneTwo = function() {
    var ringOne = new addCoinDots({
        parent:document.getElementById('sceneTwo').getElementsByClassName('section-graphics')[0],
        radius:100,
        dotSize:10,
        dotCount:15,
        colors:["#00fcff","#60fdff","#93fdff","#d3feff"], //have as many or as few colors as you want.
        animationOffset: 1.8, //jump 1.8 seconds into the animation for a more active part of the spinning initially (just looks a bit better in my opinion)
    });
    var ringTwo = new addCoinDots({
        parent:document.getElementById('sceneTwo').getElementsByClassName('section-graphics')[0],
        radius:125,
        dotSize:7.5,
        dotCount:20,
        colors:["#d3feff","#00fcff","#60fdff","#93fdff"], //have as many or as few colors as you want.
        animationOffset: 1.5, //jump 1.8 seconds into the animation for a more active part of the spinning initially (just looks a bit better in my opinion)
    });
    var ringThree = new addCoinDots({
        parent:document.getElementById('sceneTwo').getElementsByClassName('section-graphics')[0],
        radius:150,
        dotSize:5,
        dotCount:25,
        colors:["#93fdff","d3feff","#00fcff","#60fdff"], //have as many or as few colors as you want.
        animationOffset: 1.2, //jump 1.8 seconds into the animation for a more active part of the spinning initially (just looks a bit better in my opinion)
    });
    ringOne.active(true);
    ringTwo.active(true);
    ringThree.active(true);

    //this is the whole preloader class/function
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
};

$.fn.resize_Scenes = function() {
    $(this).resize_SceneOne();
};