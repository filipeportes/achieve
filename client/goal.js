import { Categories } from '../imports/api/categories.js';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.goal.helpers({
  category() {
    let categoryId = FlowRouter.getQueryParam('categoryId');
    return Categories.findOne({ _id: categoryId });
  }
});

Template.goal.events({
	"click .new-goal"(event){
		if(event.target.name=="b1"){
			window.alert(event.target.duration.value);
		}

        FlowRouter.go("/offer-selection", {}, { goalId: this._id });
		//if(event.target.text.value==""){
		///	window.alert(event.target.amount);
		//}
	}
})
