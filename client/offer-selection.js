import { Offers } from '../imports/api/offers.js';
import { Goals } from '../imports/api/goals.js';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.offerSelection.helpers({
    offers() {
        return Offers.find({}, { bank_id: 1 });
    }
});

Template.offerSelection.onRendered(function() {

    let goalId = FlowRouter.current().params['goalId'];
    console.log("goalId: " + goalId);

    let goal = Goals.findOne({ _id: goalId });
    console.log("goal: " + goal);

    var ctx = document.getElementById("chartCanvas")
        .getContext('2d');

    let installments = new Array();
    let installmentValue = parseFloat(goal.amount) / parseInt(goal.duration);

    let labels = new Array();
    let currentDate = new Date();

    for (let i = 0; i < goal.duration; i++) {
        installments.push(installmentValue);
        labels.push((currentDate.getMonth() % 12) + 1);
    }

    // Set the data
    var data = {
        labels: labels,
        datasets: [{
            label: "Normal",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: installments
        }]
    };

    // Set the options
    var options = {

        ///Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines: true,

        //String - Colour of the grid lines
        scaleGridLineColor: "rgba(0,0,0,.05)",

        //Number - Width of the grid lines
        scaleGridLineWidth: 1,

        //Boolean - Whether to show horizontal lines (except X axis)
        scaleShowHorizontalLines: true,

        //Boolean - Whether to show vertical lines (except Y axis)
        scaleShowVerticalLines: true,

        //Boolean - Whether the line is curved between points
        bezierCurve: false,

        //Number - Tension of the bezier curve between points
        bezierCurveTension: 0.4,

        //Boolean - Whether to show a dot for each point
        pointDot: true,

        //Number - Radius of each point dot in pixels
        pointDotRadius: 4,

        //Number - Pixel width of point dot stroke
        pointDotStrokeWidth: 1,

        //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
        pointHitDetectionRadius: 20,

        //Boolean - Whether to show a stroke for datasets
        datasetStroke: true,

        //Number - Pixel width of dataset stroke
        datasetStrokeWidth: 2,

        //Boolean - Whether to fill the dataset with a colour
        datasetFill: false,

        //String - A legend template
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",

        maintainAspectRatio: false

    };

    new Chart(ctx)
        .Line(data, options);

});
