/**
 * **** BISMILLAH-HIRRAHMAH-NIRRAHEEM ***
 * Created by samuleghurry on 21/01/2018.
 */

/******* Variables *******/
var version = "Version: 2.0.0.18.0";
var isMobile = false;

/******* Functions *******/
$.fn.util_isMobile = function() {
    return (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))
    );
}

$.fn.util_clipPathPolygon = function(topLeft, topRight, bottomLeft, bottomRight) {
    $(this).css({
        '-webkit-clip-path' : 'polygon(0 ' + topLeft + '%, 100% ' + topRight + '%, 100% ' + bottomRight + '%, 0 ' + bottomLeft + '%)',
        '-moz-clip-path'    : 'polygon(0 ' + topLeft + '%, 100% ' + topRight + '%, 100% ' + bottomRight + '%, 0 ' + bottomLeft + '%)',
        '-ms-clip-path'     : 'polygon(0 ' + topLeft + '%, 100% ' + topRight + '%, 100% ' + bottomRight + '%, 0 ' + bottomLeft + '%)',
        '-o-clip-path'      : 'polygon(0 ' + topLeft + '%, 100% ' + topRight + '%, 100% ' + bottomRight + '%, 0 ' + bottomLeft + '%)',
        'clip-path'         : 'polygon(0 ' + topLeft + '%, 100% ' + topRight + '%, 100% ' + bottomRight + '%, 0 ' + bottomLeft + '%)'
    });

    return $(this);
};

$.fn.util_clipPathRectLeftToRight = function(percentage) {
    $(this).css({
        '-webkit-clip-path' : 'polygon(0 0, ' + percentage + '% 0, ' + percentage + '% 100%, 0 100%)',
        '-moz-clip-path'    : 'polygon(0 0, ' + percentage + '% 0, ' + percentage + '% 100%, 0 100%)',
        '-ms-clip-path'     : 'polygon(0 0, ' + percentage + '% 0, ' + percentage + '% 100%, 0 100%)',
        '-o-clip-path'      : 'polygon(0 0, ' + percentage + '% 0, ' + percentage + '% 100%, 0 100%)',
        'clip-path'         : 'polygon(0 0, ' + percentage + '% 0, ' + percentage + '% 100%, 0 100%)'
    });

    return $(this);
};

$.fn.util_constrain = function(value, boundary) {
    // Because we don't want to have the device upside down
    // We constrain the y value to the range [-boundary,boundary]
    if (value >  boundary) { value =  boundary};
    if (value < -boundary) { value = -boundary};
    return value;
};

$.fn.util_showStars = function(show) {
    if (show) {
        $(this).prepend("<div class='stars'></div><div class='twinkling'></div>");
    } else {
        $(this).remove(".stars");
        $(this).remove(".twinkling");

        $(this).css({
            'background-image'      : 'url(img/bg/section2bg.jpg)',
            'background-position'   : '0px 0px',
            'background-repeat'     : 'no-repeat',
            'background-attachment' : 'fixed',
            'background-size'       : 'cover'
        });
    }
};

$.fn.util_setDeviceType = function(mobile) {
    var device = (mobile) ? "mobile" : "desktop";
    $("html").addClass(device);
};

$.fn.util_portrait = function() {
    return $("orientation.portrait").is(":visible");
};

$.fn.util_initialiseContent = function() {
    if (!isMobile) {
        $('#rLoopContent').util_applyFullPage();
    } else {
        $(this).util_createMobileContent();
        $(this).util_displayContentBasedOnOrientation();
    }
}

$.fn.util_createMobileContent = function() {
    if ($("#rLoopContent .section").length > 0) {
        var landscapeSections = "";
        var portraitSections = "";

        $("#rLoopContent .section").each(function(index) {
            landscapeSections += "<div class='slide'>" + $(this).html() + "</div>";
            portraitSections += "<div class='section'>" + $(this).html() + "</div>";
        });

        landscapeSections = "<div id='rLoopContentLandscape'><div class='section landscape'>" + landscapeSections + "</div></div>";
        portraitSections = "<div id='rLoopContentPortrait'>" + portraitSections + "</div>";

        $("#rLoopContent").remove();
        $("#main").append(landscapeSections);
        $("#main").append(portraitSections);
    }
};

$.fn.util_displayContentBasedOnOrientation = function() {
    if($("orientation.landscape").is(":visible")) {
        $('#rLoopContentLandscape').util_applyFullPage();
    } else {
        $('#rLoopContentPortrait').util_applyFullPage();
    }

    window.onresize = function (event) {
        if ($('#rLoopContentLandscape').fullpage) $('#rLoopContentLandscape').fullpage.destroy(true);
        if ($('#rLoopContentPortrait').fullpage) $('#rLoopContentPortrait').fullpage.destroy(true);

        if($("orientation.landscape").is(":visible")) {
            $('#rLoopContentLandscape').util_applyFullPage();
        } else {
            $('#rLoopContentPortrait').util_applyFullPage();
        }
    }
};

$.fn.util_applyFullPage = function() {
    $(this).fullpage({
        css3: true,
        controlArrows: false,
        scrollingSpeed: 750
    });
};