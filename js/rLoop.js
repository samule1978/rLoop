/**
 * **** BISMILLAH-HIRRAHMAH-NIRRAHEEM ***
 * Created by samuleghurry on 20/01/2018.
 */

var showDebug = true;
var debug = document.querySelector('.debug');

$(document).ready(function () {
    $("#main").hide();

    isMobile = $(this).isMobile();
    if (!isMobile) $('#spiniPhoneX').hide();

    $(this).load();
});