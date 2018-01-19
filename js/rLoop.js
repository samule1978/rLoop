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

    $(this).showDebugInfo(true);

    if ($(this).gyro()) {
        if($(this).portrait()) {
            $(this).gyroItem($("#spinLogo"), spinLogoInterval, delay, alpha, true);
        } else {
            $(this).gyroItem($("#spinLogo"), spinLogoInterval, null, null, false);
        }

        $(window).on("orientationchange", function(event) {
            if($(this).portrait()) {
                $(this).gyroItem($("#spinLogo"), spinLogoInterval, delay, alpha, true);
            } else {
                $(this).gyroItem($("#spinLogo"), spinLogoInterval, null, null, false);
            }
        });
    } else {
        $(this).gyroItem($("#spinLogo"), null, null, null, false);
    }
});

$.fn.gyroItem = function(item, interval, delay, degrees, start) {
    alert(start):
    if (start) {
        if (item && interval && delay && degrees) {
            if (interval) clearInterval(interval);
            item.rotate(0);

            interval = setInterval(function() {
                item.rotate(degrees);
            }, delay);
        }
    } else {
        if (interval) clearInterval(interval);
        if (item) item.rotate(0);
    }
};

$.fn.showDebugInfo = function(show) {
    if (show) {
        $("#debugInfo").show();

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
                document.getElementById("orientationlabel").innerHTML = "Orientationsss: Portrait";
            } else {
                document.getElementById("orientationlabel").innerHTML = "Orientationsss: Landscape";
            }

        }, delay);

    } else {
        $("#debugInfo").hide();
    }
};

$.fn.portrait = function() {
    return window.innerHeight > window.innerWidth;
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