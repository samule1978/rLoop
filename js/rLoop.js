/**
 * **** BISMILLAH-HIRRAHMAH-NIRRAHEEM ***
 * Created by samuleghurry on 20/01/2018.
 */

$(document).ready(function () {
    showDebug = false;
    isMobile = $(this).isMobile();

    $("#main").hide();
    if (!isMobile) $('#spiniPhoneX').hide();

    /*$(".loader-wrap-top").append("<container class='pixels-wrap'></container>");
    $(".pixels-wrap").append("<pixels class='left'></pixels>");
    $("pixels.left").pixxelate("HYPE", "white");
    $(".pixels-wrap").append("<pixels class='right'></pixels>");
    $("pixels.right").pixxelate("RLOOP", "blue");*/

    $(this).load();
});