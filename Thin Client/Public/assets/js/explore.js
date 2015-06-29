/*global $, console, google */
function drawChart() {
    "use strict";
    $.getJSON("assets/audio waves/impulses/factory", function (data) {
        var wavedata = new google.visualization.DataTable();
        wavedata.addColumn('number', 't');
        wavedata.addColumn('number', 'Factory Impulse Response');
        var i = 0;
        for (i  = 0; i < data.Y.length; i = i + 200) {
            wavedata.addRow([i * data.dt, data.Y[i]]);
        }
        var options = {
            title: 'Impulse',
            curveType: 'function',
            legend: { position: 'bottom' }
        },

            chart = new google.visualization.LineChart(document.getElementById('impulse_chart'));

        chart.draw(wavedata, options);
    });
    $.getJSON("assets/audio waves/samples/basic beat", function (data) {
        var wavedata = new google.visualization.DataTable();
        wavedata.addColumn('number', 't');
        wavedata.addColumn('number', 'Simple Drum Beat');
        var i = 0;
        for (i  = 0; i < data.Y.length; i = i + 200) {
            wavedata.addRow([i * data.dt, data.Y[i]]);
        }
        var options = {
            title: 'Input',
            curveType: 'function',
            legend: { position: 'bottom' }
        },

            chart = new google.visualization.LineChart(document.getElementById('sample_chart'));

        chart.draw(wavedata, options);
    });
    $.getJSON("assets/audio waves/output/drums-reverb", function (data) {
        var wavedata = new google.visualization.DataTable();
        wavedata.addColumn('number', 't');
        wavedata.addColumn('number', 'Output');
        var i = 0;
        for (i  = 0; i < data.Y.length; i = i + 1) {
            wavedata.addRow([i * data.dt, data.Y[i]]);
        }
        var options = {
            title: 'Output',
            curveType: 'function',
            legend: { position: 'bottom' }
        },

            chart = new google.visualization.LineChart(document.getElementById('output_chart'));

        chart.draw(wavedata, options);
    });

    
}

$(document).ready(function () {
    "use strict";
    google.setOnLoadCallback(drawChart);
});

