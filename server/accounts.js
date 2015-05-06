Meteor.startup(function () {
    //ServiceConfiguration.configurations.remove({service: 'meteor-developer'});
    //ServiceConfiguration.configurations.insert({
    //    service: 'meteor-developer',
    //    clientId: Meteor.settings.meteorDeveloper.clientId,
    //    secret: Meteor.settings.meteorDeveloper.secret
    //});
});

Accounts.onCreateUser(function (options, user) {
    //user.emails = user.services['meteor-developer'].emails;
    //user.profile = options.profile;
    if (options.profile)
        user.profile = options.profile;
    user.profile.profilePictureUrl = userGetProfilePictureUrl(user);
    return user;
});
userGetProfilePictureUrl = function (user) {
    return "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
};
