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
        }, 2000);

        $(".headline-bottom").animate({
            opacity: 1
        }, 4000);
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
        $(".preloader-wrap").delay(initialDelay).addClass("hide").delay(2000).queue(function(){
            $(this).addClass("finished").dequeue().delay(1000).queue(function(){
                $(this).setup();
            });
        });
    }, time + initialDelay);
};

$.fn.finishedLoading = function() {
    return $(".preloader-wrap").hasClass("finished");
};
/******* FINISH -- Loading Functionality *******/



/******* START -- Page Functionality *******/
/******* Variables *******/

/******* Functions *******/
$.fn.setup = function() {
    $('.spinlogo-wrap').animate({opacity:1}, 250);

    if (isMobile) {
        if ($(this).showGyroAnimation(true)) {
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

$.fn.showGyroAnimation = function(bePrecise) {
    if (window.DeviceMotionEvent === undefined) {
        return false;
    } else {
        window.ondeviceorientation = function(event) {
            if ($(this).finishedLoading()) {
                var degrees;
                if($(this).util_portrait()) {
                    if (bePrecise) {
                        degrees = event.beta;
                    } else {
                        degrees = Math.round(event.beta);
                    }
                    degrees = $(this).util_constrain(degrees, 90);
                    //degrees = degrees * 0.15; // In portrait reduce amount of velocity on y axis
                    degrees = -degrees;
                } else {
                    if (bePrecise) {
                        degrees = event.gamma;
                    } else {
                        degrees = Math.round(event.gamma);
                    }
                    degrees = $(this).util_constrain(degrees, 90);
                }

                $("#spinLogo").rotate(degrees);
                $("#spiniPhoneX").rotate(degrees);
            }
        }

        return true;
    }
};

$.fn.animateOnDesktop = function() {
    $('#containerSpinLogo').delay(2000).animate({opacity:0, scale: '20'}, 1000, function() {
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

        if(!$(this).util_portrait()) {
            $('#containerSpinLogo').delay(2000).animate({opacity:0, scale: '20'}, 1000, function() {
                $(".spinlogo-wrap").hide();
                $("#main").show();
            });
        }
    }, false);
};