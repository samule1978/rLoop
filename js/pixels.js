/**
 * **** BISMILLAH-HIRRAHMAH-NIRRAHEEM ***
 * Created by samuleghurry on 21/01/2018.
 */

var pixelGeneratorCode = {
    "E":"...../.____/.____/...._/.____/.____/.....",
    "F":"...../.____/.____/...._/.____/.____/.____",
    "H":".___./.___./.___./...../.___./.___./.___."
};

$.fn.pixxelate = function(word) {
    var pixelSpaceCode = "_";
    var pixelRows = 7;

    var codeForEacRow = [];
    for (var pixelRow = 0; pixelRow < pixelRows; pixelRow++) {
        var code = "";

        for (var charIndex = 0; charIndex < word.length; charIndex++) {
            var letter = word.charAt(charIndex);

            code += pixelGeneratorCode[letter].split("/")[pixelRow];

            // Only add space if its not the last character,
            if (charIndex != (word.length - 1))code += pixelSpaceCode;
        }

        codeForEacRow.push(code);
    }

    var pixels = "";
    for (row = 0; row < codeForEacRow.length; row++) {
        var rowCode = codeForEacRow[row];

        for (var col = 0; col < rowCode.length; col++) {
            var newline = (col == 0) ? " br" : "";

            if (rowCode.charAt(col) == ".") {
                pixels += "<pixel class='r-" + row + " c-" + col + " white" + newline + "'></pixel>";
            } else if (rowCode.charAt(col) == "_") {
                pixels += "<pixel class='r-" + row + " c-" + col + " blank" + newline + "'></pixel>";
            }
        }
    }

    return $(this).append("<pixels>" + pixels + "</pixels>");
};
