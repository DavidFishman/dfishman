Template.cards.helpers({
    users: function () {
        return Meteor.users.find({_id:{$ne:Meteor.userId()}});
    }
});

Template.cards.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('nearbyUsers', Meteor.userId(),100);
    }.bind(this));
};
//Template.cards.events({
//    'throwout': function (event, template) {
//        e.target.fadeOut();
//    }
//});


stack.on('throwout', function (e) {
    $(e.target).remove();
});


