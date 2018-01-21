/**
 * **** BISMILLAH-HIRRAHMAH-NIRRAHEEM ***
 * Created by samuleghurry on 21/01/2018.
 */

/******* VARIABLES *******/
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
    $("#containerSpinLogo").hide();
    $("#containerStaticLogo").show();
};

$.fn.gyro = function() {
    if (window.DeviceMotionEvent === undefined) {
        return false;
    } else {
        window.ondeviceorientation = function(event) {
            //degrees = Math.round(event.alpha);
            degrees = Math.round(event.gamma);

            if($(this).portrait()) {
                $("#containerSpinLogo").show();
                $("#containerStaticLogo").hide();

                $("#spinLogo").rotate(-degrees);
                $("#spiniPhoneX").rotate(-degrees);
            } else {
                $("#spinLogo").rotate(0);
                $("#spiniPhoneX").rotate(0);

                $("#containerSpinLogo").hide();
                $("#containerStaticLogo").show();
            }
        }

        return true;
    }
};

$.fn.rotate = function(degrees) {
    $(this).css({'transform' : 'rotate('+ degrees +'deg)'});
    return $(this);
};

$.fn.portrait = function() {
    return window.innerHeight > window.innerWidth;
};

$.fn.showLoader = function(show) {
    if (show) {
        $('.preloader-wrap').show();

        // Loadbar Animation
        $(".loadbar").animate({
            width: width + "%"
        }, time);

        // Fading Out Loadbar on Finished
        setTimeout(function(){
            $('.preloader-wrap').fadeOut(700);
        }, time);
    } else {
        $('.preloader-wrap').hide();
    }
};

$.fn.animateOnOrientationChange = function() {
    window.addEventListener("resize", function() {
        if($(this).portrait()) {
            $("#staticLogo").removeAttr('style');
            $("#staticiPhoneX").removeAttr('style');
        } else {
            $("#staticiPhoneX").delay(1000).fadeOut(1000,
                $("#staticLogo").animate({top:'-70px'}, 1000)
            );
        }
    }, false);
};

$.fn.showDebugInfo = function(show) {
    if (show) {
        $("#debugInfo").show();

        window.ondevicemotion = function(event) {
            ax = Math.round(Math.abs(event.accelerationIncludingGravity.x * 1));
            ay = Math.round(Math.abs(event.accelerationIncludingGravity.y * 1));
            az = Math.round(Math.abs(event.accelerationIncludingGravity.z * 1));
            ai = Math.round(event.interval * 100) / 100;
            rR = event.rotationRate;
            if (rR != null) {
                arAlpha = Math.round(rR.alpha);
                arBeta = Math.round(rR.beta);
                arGamma = Math.round(rR.gamma);
            }
        }

        window.ondeviceorientation = function(event) {
            alpha = Math.round(event.alpha);
            beta = Math.round(event.beta);
            gamma = Math.round(event.gamma);
        }

        setInterval(function() {
            document.getElementById("xlabel").innerHTML = "X: " + ax;
            document.getElementById("ylabel").innerHTML = "Y: " + ay;
            document.getElementById("zlabel").innerHTML = "Z: " + az;
            document.getElementById("ilabel").innerHTML = "I: " + ai;
            document.getElementById("arAlphaLabel").innerHTML = "arA: " + arAlpha;
            document.getElementById("arBetaLabel").innerHTML = "arB: " + arBeta;
            document.getElementById("arGammaLabel").innerHTML = "arG: " + arGamma;
            document.getElementById("alphalabel").innerHTML = "Alpha: " + alpha;
            document.getElementById("betalabel").innerHTML = "Beta: " + beta;
            document.getElementById("gammalabel").innerHTML = "Gamma: " + gamma;

            if($(this).portrait()) {
                document.getElementById("orientationlabel").innerHTML = "Orientation: Portrait";
            } else {
                document.getElementById("orientationlabel").innerHTML = "Orientation: Landscape";
            }
        }, delay);
    } else {
        $("#debugInfo").hide();
    }
};