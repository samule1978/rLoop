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
        $("#main").show();
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



$.fn.load = function() {
    $(this).loadAnimation(true, true, true);
};

$.fn.loadAnimation = function(usePerspective, bePrecise, showStars) {
    if (showStars) {
        $(".loader-wrap-top").addClass("show-stars");
        $(".loader-wrap-top").removeClass("hide-stars");
    } else {
        $(".loader-wrap-top").addClass("hide-stars");
        $(".loader-wrap-top").removeClass("show-stars");
    }

    // Loading Gyro Animation
    window.ondeviceorientation = function(event) {
        $(this).animatePolygons(usePerspective, bePrecise);

        time = time * 5;

        // Loadbar Animation
        $(".loadbar").animate({
                width: width + "%"
            },
            {
                step: function(now, fx) {
                    $(".headline-bottom").css('opacity', now / 100);
                    $("#hlHyperLoop").css('clip-path', 'polygon(0 0, ' + now + '% 0, ' + now + '% 100%, 0 100%)');
                }
            }, time);

        /*$(".loadbar").animate({
            opacity: 0
        }, time);*/

        // Finish Loading Animation
        /*setTimeout(function(){
            $(".preloader-wrap").addClass("hide").delay(2000).queue(function(){
                $(this).addClass("finished").dequeue().delay(1000).queue(function(){
                    //$(this).setup();
                });
            });
        }, time);*/
        
        if (showDebug) {
            var debug = document.querySelector('.debug');
            debug.innerHTML = version + "<br />";
            debug.innerHTML += "Beta : " + beta + "<br />";
            debug.innerHTML += "Gamma : " + gamma + "<br />";
            debug.innerHTML += "Alpha : " + alpha + "<br />";
            debug.innerHTML += "x : " + x + "<br />";
            debug.innerHTML += "y : " + y + "<br />";
            debug.innerHTML += "z : " + z + "<br />";
        }
    }
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

