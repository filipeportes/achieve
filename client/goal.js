import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {Categories} from '../imports/api/categories.js';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {Goals} from '../imports/api/goals.js';

var categoryId;

Template.goal.helpers({
  category() {
      categoryId = FlowRouter.current().params['categoryId'];
      return Categories.findOne({ _id: categoryId });
  }
});

Template.goal.events({
    'submit .new-goal'(event) {
        if (event.target.duration.value == '') {
            window.alert("Duration missing!");
        }
        else if (event.target.amount.value == '') {
            window.alert("Amount to spend is missing")
        }
        else if (event.target.b1.name == 'b1') {
            //window.alert(event.target.duration.value + '\n' + event.target.amount.value);
            var duration = event.target.duration.value;
            var amount = event.target.amount.value;
            window.alert('vor insert');

            var goalId = Goals.insert({
                'categoryID': categoryID, 'amount': amount,
                'duration': duration, 'userId': Meteor.userId()
            });
            window.alert('danach');
            //FlowRouter.go("/offer-selection", {}, { goalId: goalId});
        }
    }
})
