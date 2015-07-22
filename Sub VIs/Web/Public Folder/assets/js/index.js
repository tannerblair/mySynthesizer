/*global $, console, google */

var update = function () {
    "use strict";
    $.getJSON("getTrackControls", function (data) {
        $("#ch0-volume").val(data["Track 0"]["Volume Settings"].Volume);
        $("#ch1-volume").val(data["Track 1"]["Volume Settings"].Volume);
        $("#ch2-volume").val(data["Track 2"]["Volume Settings"].Volume);
        $("#ch3-volume").val(data["Track 3"]["Volume Settings"].Volume);
        $("#ch0-pan").val(data["Track 0"]["Volume Settings"].Pan);
        $("#ch1-pan").val(data["Track 1"]["Volume Settings"].Pan);
        $("#ch2-pan").val(data["Track 2"]["Volume Settings"].Pan);
        $("#ch3-pan").val(data["Track 3"]["Volume Settings"].Pan);
        $("#ch0-rec").html(data["Track 0"]["Volume Settings"].Record);
        $("#ch1-rec").html(data["Track 1"]["Volume Settings"].Record);
        $("#ch2-rec").html(data["Track 2"]["Volume Settings"].Record);
        $("#ch3-rec").html(data["Track 3"]["Volume Settings"].Record);
    });
};

$(document).ready(function () {
    "use strict";
    setInterval(update, 200);
});

