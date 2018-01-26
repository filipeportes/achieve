import { Offers } from '../imports/api/offers.js';
import { Goals } from '../imports/api/goals.js';
import { FlowRouter } from 'meteor/kadira:flow-router';

var goalId;
var goal;

Template.offerSelection.helpers({
    offers() {
        return Offers.find({}, { bank_name: 1 });
    },
    monthlyDeposit() {
        goalId = FlowRouter.current().params['goalId'];
        goal = Goals.findOne({ _id: goalId });
        return parseFloat(goal.amount) / parseInt(goal.duration);
    }
});

Template.offerSelection.onRendered(function() {

    goalId = FlowRouter.current().params['goalId'];
    console.log("goalId: " + goalId);

    goal = Goals.findOne({ _id: goalId });
    console.log("goal: " + goal);

    var ctx = document.getElementById("chartCanvas")
        .getContext('2d');

    if(!goal){
        return;
    }

    let installments = new Array();
    let installments2 = new Array();
    let installmentValue = parseFloat(goal.amount) / parseInt(goal.duration);

    let labels = new Array();
    let currentDate = new Date();

    let sum = installmentValue;
    for (let i = 0; i < goal.duration; i++) {
        installments.push(sum);
        installments2.push(sum * 1.5);
        labels.push(((currentDate.getMonth() + i) % 12) + 1);
        sum += installmentValue;
    }

    // Set the data
    var data = {
        labels: labels,
        datasets: [{
            label: "Normal",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(255,100,100,1)",
            pointColor: "rgba(150,00,150,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: installments
        },
            {
                label: "Normal",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(255,100,100,1)",
                pointColor: "rgba(00,00,250,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: installments2
            }]
    };



    new Chart(ctx)
        .Line(data, options);

});

Template.offerSelection.events({
    'change .offerSelect'(event) {
        console.log(event);
    }
});

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
