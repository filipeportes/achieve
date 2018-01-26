import { Categories } from '../imports/api/categories.js';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.categorySelection.helpers({
    categories() {
    	return Categories.find({});
    }
});

Template.categorySelection.events({
	'click .category'() {
      FlowRouter.go("/goal/" + this._id);
	},
});
