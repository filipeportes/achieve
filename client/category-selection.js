import { Categories } from '../imports/api/categories.js';

Template.categorySelection.helpers({
    categories() {
    	return Categories.find({});
    }
});

Template.categorySelection.events({
	'click .category'() {
		// TODO Here
		alert(this.title);
	},
});