import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { AccountsTemplates } from 'meteor/useraccounts:core';

AccountsTemplates.configure({
    defaultLayout: 'Layout',
    defaultContentRegion: 'main'
});

AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');

FlowRouter.route('/logout', {
    name: 'logout',
    action() {
        Meteor.logout();
        FlowRouter.go("/");
    }
});

FlowRouter.route('/', {
    name: 'root',
    action() {
        FlowRouter.go("/category-selection");
    }
});

FlowRouter.route('/category-selection', {
    name: 'category-selection',
    action() {
        BlazeLayout.render('Layout', {main: 'categorySelection'});
    }
});

FlowRouter.route('/goal/:categoryId', {
    name: 'next goal',
    triggersEnter: [AccountsTemplates.ensureSignedIn],
    action() {
        BlazeLayout.render('Layout', {main: 'goal'});
    }
});

FlowRouter.route('/offer-selection/:goalId', {
    name: 'offer selection',
    triggersEnter: [AccountsTemplates.ensureSignedIn],
    action() {
        BlazeLayout.render('Layout', {main: 'offerSelection'});
    }
});
