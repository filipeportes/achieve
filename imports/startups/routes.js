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
        FlowRouter.go("/goals");
    }
});

FlowRouter.route('/goals', {
    name: 'goals',
    action() {
        BlazeLayout.render('Layout', {main: 'goals'});
    }
});

