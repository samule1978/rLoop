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
    $('.spinlogo-wrap').animate({opacity:1}, 1000);

    if (isMobile) $(this).showGyroAnimation(false);

    $(this).fadeOutRLoopLogo();

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
                        degrees = event.gamma;
                    } else {
                        degrees = Math.round(event.gamma);
                    }
                    degrees = $(this).util_constrain(degrees, 90);
                    degrees = -degrees;
                } else {
                    if (bePrecise) {
                        degrees = event.beta;
                    } else {
                        degrees = Math.round(event.beta);
                    }
                    degrees = $(this).util_constrain(degrees, 90);
                }

                $("#spinLogo, #spiniPhoneX").rotate(degrees);
            }
        }

        return true;
    }
};

$.fn.fadeOutRLoopLogo = function() {
    $('#containerSpinLogo').delay(3000).animate({opacity:0, scale: '20'}, 2000, function() {
        $(".spinlogo-wrap").hide();
        $("#main").show();
    });
};