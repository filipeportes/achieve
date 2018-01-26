import { Categories } from '../imports/api/categories.js';

Template.categorySelection.helpers({
    categories() {
    	// return Categories.find({});
    	return [
	    	{
	    		title: "Travel"
	    	},
	    	{
	    		title: "Car"
	    	},
	    	{
	    		title: "Savings"
	    	}
    	];
    }
});

