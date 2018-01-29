import { Offers } from '../imports/api/offers.js';
import { Goals } from '../imports/api/goals.js';
import { FlowRouter } from 'meteor/kadira:flow-router';

var goalId;
var goal;
var chart;

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
    buildGraph(1);
});

Template.offerSelection.events({
    'change .offerSelect'(event) {
        console.log(event.target.value);
        buildGraph(parseFloat(event.target.value))
    }
});

function buildGraph(interest) {

    var canvas = document.getElementById("chartCanvas");
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, ctx.width, ctx.height);
    ctx.beginPath();

    if(chart){
        chart.clear();
        chart.destroy();
        chart = null;
    }

    let installments = new Array();
    let installments2 = new Array();
    let installmentValue = parseFloat(goal.amount) / parseInt(goal.duration);

    let labels = new Array();
    let currentDate = new Date();

    let sum = installmentValue;
    for (let i = 0; i < goal.duration; i++) {
        installments.push(sum);
        installments2.push(sum * (1 + interest / 10));
        labels.push(((currentDate.getMonth() + i) % 12) + 1);
        sum += installmentValue;
    }

    // Set the data
    let data = {
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
        }]
    };

    if(interest > 1) {
        data.datasets.push({
            label: "Normal",
            fillColor: "rgba(100,100,220,0.2)",
            strokeColor: "rgba(100,100,250,1)",
            pointColor: "rgba(00,00,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: installments2
        });
    }

    chart = new Chart(ctx).Line(data, options);
}

// Set the options
const options = {
    animation: {
        onProgress: function(animation) {
            progress.value = animation.animationObject.currentStep / animation.animationObject.numSteps;
        }
    },
    responsive: false,
    maintainAspectRatio: true
};
