$(document).ready(function () {
    $('#fullpage').fullpage({
        /*sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', 'whitesmoke', '#ccddff'],
        anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage', 'lastPage'],
        menu: '#menu',*/
    });

    var delay = 100;
    var beta = 0;

    if (window.DeviceMotionEvent === undefined) {
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

        function d2h(d) {return d.toString(16);}
        function h2d(h) {return parseInt(h,16);}

        setInterval(function() {
            document.getElementById("betalabel").innerHTML = "Beta 7: " + beta;
            //$("#spinLogo").rotate({ startDeg:beta, endDeg:beta, easing:'ease-in' });
            $("#spinLogo").rotateSam(beta);
        }, delay);
    }
});

$.fn.rotateSam = function(degrees) {
    $(this).css({'transform' : 'rotate('+ degrees +'deg)'});
    return $(this);
};

/*
 jQuery-Rotate-Plugin v0.2 by anatol.at
 http://jsfiddle.net/Anatol/T6kDR/
 */
$.fn.rotate=function(options) {
    var $this=$(this), prefixes, opts, wait4css=0;
    prefixes=['-Webkit-', '-Moz-', '-O-', '-ms-', ''];
    opts=$.extend({
        startDeg: false,
        endDeg: 360,
        duration: 1,
        count: 1,
        easing: 'linear',
        animate: {},
        forceJS: false
    }, options);

    function supports(prop) {
        var can=false, style=document.createElement('div').style;
        $.each(prefixes, function(i, prefix) {
            if (style[prefix.replace(/\-/g, '')+prop]==='') {
                can=true;
            }
        });
        return can;
    }

    function prefixed(prop, value) {
        var css={};
        if (!supports.transform) {
            return css;
        }
        $.each(prefixes, function(i, prefix) {
            css[prefix.toLowerCase()+prop]=value || '';
        });
        return css;
    }

    function generateFilter(deg) {
        var rot, cos, sin, matrix;
        if (supports.transform) {
            return '';
        }
        rot=deg>=0 ? Math.PI*deg/180 : Math.PI*(360+deg)/180;
        cos=Math.cos(rot);
        sin=Math.sin(rot);
        matrix='M11='+cos+',M12='+(-sin)+',M21='+sin+',M22='+cos+',SizingMethod="auto expand"';
        return 'progid:DXImageTransform.Microsoft.Matrix('+matrix+')';
    }

    supports.transform=supports('Transform');
    supports.transition=supports('Transition');

    opts.endDeg*=opts.count;
    opts.duration*=opts.count;

    if (supports.transition && !opts.forceJS) { // CSS-Transition
        if ((/Firefox/).test(navigator.userAgent)) {
            wait4css=(!options||!options.animate)&&(opts.startDeg===false||opts.startDeg>=0)?0:25;
        }
        $this.queue(function(next) {
            if (opts.startDeg!==false) {
                $this.css(prefixed('transform', 'rotate('+opts.startDeg+'deg)'));
            }
            setTimeout(function() {
                $this
                    .css(prefixed('transition', 'all '+opts.duration+'s '+opts.easing))
                    .css(prefixed('transform', 'rotate('+opts.endDeg+'deg)'))
                    .css(opts.animate);
            }, wait4css);

            setTimeout(function() {
                $this.css(prefixed('transition'));
                if (!opts.persist) {
                    $this.css(prefixed('transform'));
                }
                next();
            }, (opts.duration*1000)-wait4css);
        });

    } else { // JavaScript-Animation + filter
        if (opts.startDeg===false) {
            opts.startDeg=$this.data('rotated') || 0;
        }
        opts.animate.perc=100;

        $this.animate(opts.animate, {
            duration: opts.duration*1000,
            easing: $.easing[opts.easing] ? opts.easing : '',
            step: function(perc, fx) {
                var deg;
                if (fx.prop==='perc') {
                    deg=opts.startDeg+(opts.endDeg-opts.startDeg)*perc/100;
                    $this
                        .css(prefixed('transform', 'rotate('+deg+'deg)'))
                        .css('filter', generateFilter(deg));
                }
            },
            complete: function() {
                if (opts.persist) {
                    while (opts.endDeg>=360) {
                        opts.endDeg-=360;
                    }
                } else {
                    opts.endDeg=0;
                    $this.css(prefixed('transform'));
                }
                $this.css('perc', 0).data('rotated', opts.endDeg);
            }
        });
    }

    return $this;
};