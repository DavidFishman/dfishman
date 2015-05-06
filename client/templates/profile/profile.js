Template.profile.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('user', Meteor.userId());
    }.bind(this));
};

Template.profile.rendered = function () {
    this.autorun(function () {
        if (!this.subscription.ready()) {
            IonLoading.show();
        } else {
            IonLoading.hide();
        }
    }.bind(this));

    if (!Meteor.loggingIn() && !Meteor.user()) {
        IonModal.open('signIn');
    }
};
Template.profile.destroyed = function(){

};
Template.profile.helpers({
    user: function () {
        if (Meteor.userId()) {
            return Meteor.user();
        }
    },
    formDoc: function () {
        if (Meteor.user())
            return Meteor.user();
        return null;
    },
    formCollection: function () {
        return Meteor.users;
    }
});
