/**
 * **** BISMILLAH-HIRRAHMAH-NIRRAHEEM ***
 * Created by samuleghurry on 20/01/2018.
 */

$(document).ready(function () {
    showDebug = false;
    isMobile = $(this).isMobile();

    $("#main").hide();
    if (!isMobile) $('#spiniPhoneX').hide();

    $(this).load();
});
