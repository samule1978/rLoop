// Acceleration
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
var spinLogoInterval;

$(document).ready(function () {
    $('#fullpage').fullpage({
        /*sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', 'whitesmoke', '#ccddff'],
        anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage', 'lastPage'],
        menu: '#menu',*/
    });

    $(this).gyro();

    spinLogoInterval = setInterval(function() {
        $("#spinLogo").rotate(0);
    }, delay);

    $(window).on("orientationchange", function(event) {
        if($(this).portrait()) {
            //$("#spinLogo").show();
            spinLogoInterval = setInterval(function() {
                $("#spinLogo").rotate(0);
            }, delay);
        } else {
            clearInterval(spinLogoInterval);
            //$("#spinLogo").hide();
            $("#spinLogo").rotate(0);
        }
    });
});

$.fn.portrait = function() {
    switch(window.orientation) {
        case -90 || 90:
            return false;
        default:
            return true;
    }
};

$.fn.gyro = function() {
    if (window.DeviceMotionEvent === undefined) {
        return false;
    } else {
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

        return true;
    }
};

$.fn.rotate = function(degrees) {
    $(this).css({'transform' : 'rotate('+ degrees +'deg)'});
    return $(this);
};