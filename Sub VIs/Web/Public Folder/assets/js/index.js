/*global $, console, google, d3 */
var drawVolume = function (div, volume) {
    "use strict";
    var rect = div.selectAll("rect").data(volume);
    rect.enter().append("rect")
            .attr("height", function (d, i) { return (d * $("svg").height() * 0.075); })
            .attr("x", function (d, i) { return i * ($("svg").width() / 4) + $("svg").width() / 16; })
            .attr("width", $("svg").width() / 8)
            .attr("y", function (d) {return $("svg").height() * 0.75 - (d * $("svg").height() * 0.075); })
            .attr("stroke", "black")
            .attr("fill", "royalblue");
    rect.exit().remove();
};

var drawPanAndFX = function (div, pan, fx) {
    "use strict";
    var circle_pan = div.selectAll("circle").data(pan);
    circle_pan.enter().append("circle")
            .attr("cx", function (d, i) { return i * ($("svg").width() / 4) + ($("svg").width() / 16) + ($("svg").width() / 8) * d; })
            .attr("cy", $("svg").height() * 0.75)
            .attr("r", 10)
            .attr("stroke", "gray")
            .attr("fill", function (d, i) {if (d === true) { return "green"; } return "white"; });
    circle_pan.exit().remove();
};

var drawRecord = function (div, record) {
    "use strict";
    var circle = div.selectAll("ellipse").data(record);
    circle.enter().append("ellipse")
            .attr("cx", function (d, i) { return i * ($("svg").width() / 4) + ($("svg").width() / 8); })
            .attr("cy", $("svg").height() * 0.875)
            .attr("rx", 20)
            .attr("ry", 20)
            .attr("stroke", "red")
            .attr("fill", function (d) {if (d === true) { return "red"; } return "white"; });
    circle.exit().remove();
};

var volume = function (data) {
    "use strict";
    return [data["Track 0"].Volume,
                      data["Track 1"].Volume,
                      data["Track 2"].Volume,
                      data["Track 3"].Volume];
};
var pan = function (data) {
    "use strict";
    return [data["Track 0"].Pan,
                   data["Track 1"].Pan,
                   data["Track 2"].Pan,
                   data["Track 3"].Pan];
};
var record = function (data) {
    "use strict";
    return [data["Track 0"].Record,
                      data["Track 1"].Record,
                      data["Track 2"].Record,
                      data["Track 3"].Record];
};

var fx = function (data) {
    "use strict";
    return [data["Track 0"].FX,
                      data["Track 1"].FX,
                      data["Track 2"].FX,
                      data["Track 3"].FX];
};

var plot = function () {
    "use strict";
    $.getJSON("getTrackControls", function (data) {
        var svg = d3.select('svg');
        drawVolume(svg, volume(data));
        drawPanAndFX(svg, pan(data));
        drawRecord(svg, record(data));
    });
};

var update = function () {
    "use strict";
    $("svg").height($(window).height() * 0.8);

    $.getJSON("getTrackControls", function (data) {
        var svg = d3.select("svg").transition();
        svg.selectAll("rect")
            .attr("height", function (d, i) { return (volume(data)[i] * $("svg").height() * 0.075); })
            .attr("x", function (d, i) { return i * ($("svg").width() / 4) + $("svg").width() / 16; })
            .attr("width", $("svg").width() / 8)
            .attr("y", function (d, i) {return $("svg").height() * 0.75 - (volume(data)[i] * $("svg").height() * 0.075); });
        
        svg.selectAll("circle")
            .attr("cx", function (d, i) { return i * ($("svg").width() / 4) + ($("svg").width() / 16) + ($("svg").width() / 8) * pan(data)[i]; })
            .attr("cy", $("svg").height() * 0.75)
            .attr("fill", function (d, i) {if (fx(data)[i] === true) { return "green"; } return "white"; });
   
        svg.selectAll("ellipse")
            .attr("cx", function (d, i) { return i * ($("svg").width() / 4) + ($("svg").width() / 8); })
            .attr("cy", $("svg").height() * 0.875)
            .attr("rx", 20)
            .attr("ry", 20)
            .attr("fill", function (d, i) {if (record(data)[i] === true) { return "red"; } return "white"; });
    });
};
    

$(document).ready(function () {
    "use strict";

    $('#loadBlankBtn').on("click", function () {$.getJSON("loadFile?fn="); });
    $('#loadDrumsBtn').on("click", function () {$.getJSON("loadFile?fn=drums1"); });
    $('#loadUserBtn').on("click", function () {$.getJSON("loadFile?fn=user1"); });
    $('#saveUserBtn').on("click", function () {$.getJSON("saveFile?fn=user1"); });
    $("svg").height($(window).height() * 0.8);
    plot();
    setInterval(update, 100);


});

