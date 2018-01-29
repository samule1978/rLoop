/**
 * **** BISMILLAH-HIRRAHMAH-NIRRAHEEM ***
 * Created by samuleghurry on 20/01/2018.
 */
var version = "Version: 2.0.0.13.0";

$(document).ready(function () {
    $("#main").hide();

    isMobile = $(this).isMobile();
    if (!isMobile) $('#spiniPhoneX').hide();

    $(this).load();
});