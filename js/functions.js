/**
 * **** BISMILLAH-HIRRAHMAH-NIRRAHEEM ***
 * Created by samuleghurry on 21/01/2018.
 */

/*** Acceleration/Gyro ***/
var ax = 0;
var ay = 0;
var az = 0;
var ai = 0;
var arAlpha = 0;
var arBeta = 0;
var arGamma = 0;
var alpha = 0;
var beta = 0;
var gamma = 0;
var delay = 100;

/*** Preloader ***/
var width = 100,
    perfData = window.performance.timing, // The PerformanceTiming interface represents timing-related performance information for the given page.
    EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
    time = parseInt((EstimatedTime/1000)%60)*100;

// Percentage Increment Animation
var start = 0,
    end = 100;


/******* FUNCTIONS *******/
$.fn.setup = function() {
    $("#main").show();
    $(".loader-wrap-top").showStars(false);

    if (isMobile) {
        if ($(this).gyro()) {
            $(this).animateOnMobile();
        }
    } else {
        $(this).animateOnDesktop();
    }

    $('#fullpage').fullpage({
        /*sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', 'whitesmoke', '#ccddff'],
         anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage', 'lastPage'],
         menu: '#menu',*/
        /*slidesNavigation: true,
        scrollHorizontally: true*/
    });
};

$.fn.animateOnDesktop = function() {
    $('#containerSpinLogo').delay(500).animate({opacity:0, scale: '20'}, 1000, function() {
        $(".spinlogo-wrap").hide();
    });
};

$.fn.animateOnMobile = function() {
    window.addEventListener("resize", function() {
        $('#spiniPhoneX').scale(1);
        $("#spinLogo").removeAttr('style');
        $("#spiniPhoneX").removeAttr('style');
        $("#spinLogo").rotate(0);
        $("#spiniPhoneX").rotate(0);

        if(!$(this).portrait()) {
            /*$('#spiniPhoneX').delay(500).animate({opacity:0, scale: '10'}, 500);
            $("#spinLogo").delay(500).animate({top:'-235px'}, 500, function() {
                //callback
            });*/
            $('#containerSpinLogo').delay(500).animate({opacity:0, scale: '20'}, 1000, function() {
                $(".spinlogo-wrap").hide();
                $("#main").show();
            });
        }
    }, false);
};

$.fn.gyro = function() {
    if (window.DeviceMotionEvent === undefined) {
        return false;
    } else {
        window.ondeviceorientation = function(event) {
            if ($(this).finishedLoading()) {
                if($(this).portrait()) {
                    degrees = Math.round(event.gamma);

                    $("#spinLogo").rotate(-degrees);
                    $("#spiniPhoneX").rotate(-degrees);
                }
            }
        }

        return true;
    }
};

$.fn.loadGyroEffects = function(usePerspective, bePrecise) {
    // Loading Gyro Effects
    window.ondeviceorientation = function(event) {
        $(this).animatePolygons(usePerspective, bePrecise);
    }
};

$.fn.load = function() {
    $(this).loadAnimation();
};

$.fn.loadAnimation = function() {
    var initialDelay = 1750;

    setTimeout(function(){
        $(".headline-top").animate({
            opacity: 1
        }, 1000);

        $(".headline-bottom").animate({
            opacity: 1
        }, 1500);
    }, 0);

    $(".loadbar").delay(initialDelay).animate({
            width: width + "%"
        },
        {
            step: function(now, fx) {
                $("#hlHyperLoop").clipPathRectLeftToRight(now);
            }
        }, time);

    setTimeout(function(){
        $(".loadbar").animate({
            opacity: 0
        }, 1000);
    }, time);

    // Finish Loading Animation
    setTimeout(function(){
        $("body").showStars(true);

        $(".preloader-wrap").addClass("hide").delay(2000).queue(function(){
            $(this).addClass("finished").dequeue().delay(1000).queue(function(){
                $(this).setup();
            });
        });
     }, time);
};

$.fn.finishedLoading = function() {
    return $(".preloader-wrap").hasClass("finished");
};

$.fn.animatePolygons = function(usePerspective, bePrecise) {
    // In degree in the range [0,360] - z-axis
    var z;
    var alpha;
    // In degree in the range [-180,180] - front to back
    var x;
    var beta;
    // In degree in the range [-90,90] - left to right
    var y;
    var gamma;

    if (bePrecise) {
        x = event.beta;
        y = event.gamma;
        z = event.alpha;
    } else {
        x = Math.round(event.beta);
        y = Math.round(event.gamma);
        z = Math.round(event.alpha);
    }
    beta = x;
    gamma = y;
    alpha = z;

    // Default values
    var thresholdGap = 0.3;
    var thresholdMinTop = (isMobile) ? 60 : 70;
    var thresholdMaxTop = 29.85;
    var thresholdTop;
    var thresholdBottom;

    if($(this).portrait()) {
        y = $(this).constrain(y, 90);
        x = $(this).constrain(x, 180);

        y = y*0.15; // In portrait reduce amount of velocity on y axis

        // Animate top polygon.
        if (usePerspective) {
            thresholdTop = thresholdMinTop + Math.abs(((thresholdMaxTop / 90) * x));
        } else {
            thresholdTop = thresholdMinTop + thresholdMaxTop;
        }
        $(".loader-wrap-top").clipPathPolygon(  0,
            0,
            thresholdTop + y,
            thresholdTop - y);

        // Animate bottom polygon.
        thresholdBottom = thresholdTop + thresholdGap;
        $(".loader-wrap-bottom").clipPathPolygon(   thresholdBottom + y,
            thresholdBottom - y,
            100,
            100);
    } else {
        x = $(this).constrain(x, 90);
        y = $(this).constrain(y, 180);

        // Animate top polygon.
        if (usePerspective) {
            thresholdTop = thresholdMinTop + Math.abs(((thresholdMaxTop / 90) * y));
        } else {
            thresholdTop = thresholdMinTop + thresholdMaxTop;
        }
        $(".loader-wrap-top").clipPathPolygon(  0,
            0,
            thresholdTop - x,
            thresholdTop + x);

        // Animate bottom polygon.
        thresholdBottom = thresholdTop + thresholdGap;
        $(".loader-wrap-bottom").clipPathPolygon(   thresholdBottom - x,
            thresholdBottom + x,
            100,
            100);
    }
};

