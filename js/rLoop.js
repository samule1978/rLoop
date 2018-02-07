/**
 * **** BISMILLAH-HIRRAHMAH-NIRRAHEEM ***
 * Created by samuleghurry on 20/01/2018.
 */

//$(this).loadGyroEffects(true, true);

$(document).ready(function () {
    isMobile = $(this).isMobile();

    $("body").showStars(true);

    $("#main").hide();
    if (!isMobile) $('#spiniPhoneX').hide();

    $(this).load();
});