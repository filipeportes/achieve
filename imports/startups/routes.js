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

