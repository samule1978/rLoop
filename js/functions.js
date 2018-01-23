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
};

$.fn.gyro = function() {
    if (window.DeviceMotionEvent === undefined) {
        return false;
    } else {
        window.ondeviceorientation = function(event) {
            if($(this).portrait()) {
                //degrees = Math.round(event.alpha);
                degrees = Math.round(event.gamma);

                $("#spinLogo").rotate(-degrees);
                $("#spiniPhoneX").rotate(-degrees);
            } else {
                //$("#spinLogo").rotate(0);
                //$("#spiniPhoneX").rotate(0);
            }
        }

        return true;
    }
};

$.fn.animateOnOrientationChange = function() {
    window.addEventListener("resize", function() {
        $("#spinLogo").removeAttr('style');
        $("#spiniPhoneX").removeAttr('style');
        $("#spinLogo").rotate(0);
        $("#spiniPhoneX").rotate(0);

        if($(this).portrait()) {

        } else {
            $('#spiniPhoneX').delay(500).animate({opacity:0, scale: '=10'}, 500);
            $("#spinLogo").delay(500).animate({top:'-235px'}, 500, function() {
                //callback
            });
        }
    }, false);
};

$.fn.spinOut = function() {

}

/*$.fn.rotate = function(degrees) {
    //$(this).css({'transform' : 'rotate('+ degrees +'deg)'});
    $(this).css({
        '-webkit-transform' : 'rotate('+ degrees +'deg)',
        '-moz-transform'    : 'rotate('+ degrees +'deg)',
        '-ms-transform'     : 'rotate('+ degrees +'deg)',
        '-o-transform'      : 'rotate('+ degrees +'deg)',
        'transform'         : 'rotate('+ degrees +'deg)'
    });

    return $(this);
};*/

/*$.fn.scale = function(size) {
    //$(this).css({'transform' : 'scale('+ size +')'});
    $(this).css({
        '-webkit-transform' : 'scale('+ size +')',
        '-moz-transform'    : 'scale('+ size +')',
        '-ms-transform'     : 'scale('+ size +')',
        '-o-transform'      : 'scale('+ size +')',
        'transform'         : 'scale('+ size +')'
    });
    return $(this);
};*/

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