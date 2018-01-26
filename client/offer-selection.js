import { Offers } from '../imports/api/offers.js';
import { Goals } from '../imports/api/goals.js';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.offerSelection.helpers({
    offers() {
        return Offers.find({}, { bank_id: 1 });
    },
    goal() {
        let goalId = FlowRouter.getQueryParam('goalId');
        return Goals.findOne({ _id: goalId });
    }
});



Template.offerSelection.events({
  "change #offerSelect": function(event, template){
    var selectValue = template.$("#offerSelect").val();
    console.log(selectValue);
    alert(selectValue);
  }
});

