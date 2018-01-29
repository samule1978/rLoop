/**
 * **** BISMILLAH-HIRRAHMAH-NIRRAHEEM ***
 * Created by samuleghurry on 21/01/2018.
 */

/******* VARIABLES *******/
var isMobile = false;

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
var loadingTimer;





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

$.fn.clipPathPolygon = function(topLeft, topRight, bottomLeft, bottomRight) {
    $(this).css({
        '-webkit-clip-path' : 'polygon(0 ' + topLeft + '%, 100% ' + topRight + '%, 100% ' + bottomRight + '%, 0 ' + bottomLeft + '%)',
        '-moz-clip-path'    : 'polygon(0 ' + topLeft + '%, 100% ' + topRight + '%, 100% ' + bottomRight + '%, 0 ' + bottomLeft + '%)',
        '-ms-clip-path'     : 'polygon(0 ' + topLeft + '%, 100% ' + topRight + '%, 100% ' + bottomRight + '%, 0 ' + bottomLeft + '%)',
        '-o-clip-path'      : 'polygon(0 ' + topLeft + '%, 100% ' + topRight + '%, 100% ' + bottomRight + '%, 0 ' + bottomLeft + '%)',
        'clip-path'         : 'polygon(0 ' + topLeft + '%, 100% ' + topRight + '%, 100% ' + bottomRight + '%, 0 ' + bottomLeft + '%)'
    });

    return $(this);
};

$.fn.portrait = function() {
    return window.innerHeight > window.innerWidth;
};

$.fn.isMobile = function() {
    return (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))
    );

}

$.fn.load = function() {
    window.ondeviceorientation = function(event) {
        // In degree in the range [0,360] - z-axis
        var z = Math.round(event.alpha);
        var alpha = Math.round(event.alpha);

        // In degree in the range [-180,180] - front to back
        var x = Math.round(event.beta);
        var beta = Math.round(event.beta);

        // In degree in the range [-90,90] - left to right
        var y = Math.round(event.gamma);
        var gamma = Math.round(event.gamma);

        var degrees;

        // Default values
        var thresholdGap = 0.3;
        var thresholdMinTop = 50;
        var thresholdMaxTop = 29.85;
        var thresholdTop;
        var thresholdBottom;

        if($(this).portrait()) {
            // Because we don't want to have the device upside down
            // We constrain the y value to the range [-90,90]
            if (y >  90) { y =  90};
            if (y < -90) { y = -90};

            y = y*0.15; // In portrait reduce amount of velocity on y axis
            degrees = -y;

            if (x >  90) { x =  90};
            if (x < -90) { x = -90};
            thresholdTop = thresholdMinTop + Math.abs(((thresholdMaxTop / 90) * x));
            //thresholdTop = thresholdMinTop + thresholdMaxTop;
            thresholdBottom = thresholdTop + thresholdGap;

            $(".containerRLoopIcon").rotate(degrees + "deg");
            $(".loader-wrap-top").clipPathPolygon(0, 0, thresholdTop + y, thresholdTop - y);
            $(".loader-wrap-bottom").clipPathPolygon(thresholdBottom + y, thresholdBottom - y, 100, 100);
        } else {
            // Because we don't want to have the device upside down
            // We constrain the x value to the range [-90,90]
            if (x >  90) { x =  90};
            if (x < -90) { x = -90};

            degrees = x;

            if (y >  90) { y =  90};
            if (y < -90) { y = -90};
            thresholdTop = thresholdMinTop + Math.abs(((thresholdMaxTop / 90) * y));
            //thresholdTop = thresholdMinTop + thresholdMaxTop;
            thresholdBottom = thresholdTop + thresholdGap;

            $(".containerRLoopIcon").rotate(degrees + "deg");
            $(".loader-wrap-top").clipPathPolygon(0, 0, thresholdTop - x, thresholdTop + x);
            $(".loader-wrap-bottom").clipPathPolygon(thresholdBottom - x, thresholdBottom + x, 100, 100);
        }

        var debug = document.querySelector('.debug');
        debug.innerHTML = version + "<br /><br />";
        debug.innerHTML += "Alpha : " + alpha + "<br />";
        debug.innerHTML += "Beta : " + beta + "<br />";
        debug.innerHTML += "Gamma : " + gamma + "<br />";
        debug.innerHTML += "x : " + x + "<br />";
        debug.innerHTML += "y : " + y + "<br />";
        debug.innerHTML += "z : " + z + "<br />";
        debug.innerHTML += "thresholdTop : " + thresholdTop + "<br />";
        debug.innerHTML += "thresholdBottom : " + thresholdBottom + "<br />";
    }

    // Loadbar Animation
    $(".loadbar").animate({
        width: width + "%"
    }, time);

    // Loadbar Animation on Finished
    /*setTimeout(function(){
        $(".preloader-wrap").addClass("hide").delay(2000).queue(function(){
            $(this).addClass("finished").dequeue().delay(1000).queue(function(){
                //$(this).setup();
            });
        });
    }, time);*/
};

$.fn.finishedLoading = function() {
    return $(".preloader-wrap").hasClass("finished");
};
