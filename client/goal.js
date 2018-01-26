import { Categories } from '../imports/api/categories.js';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.goal.helpers({
  category() {
    let categoryId = FlowRouter.getQueryParam('categoryId');
    return Categories.findOne({ _id: categoryId });
  }
});
