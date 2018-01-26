import { Categories } from '../imports/api/categories.js';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.goal.helpers({
  category() {
    let categoryId = FlowRouter.getQueryParam('categoryId');
    return Categories.findOne({ _id: categoryId });
  }
});

Template.goal.events({
	'submit .new-goal'(event){
		if(event.target.b1.name=='b1'){
			window.alert(event.target.duration.value + '\n' + event.target.amount.value);
      var duration = event.target.duration.value;
      var amount = event.target.amount.value;

      FlowRouter.go("/offer-selection", {}, { goalId: this._id });
	   }
	}
})
