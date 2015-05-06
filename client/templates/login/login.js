Template.login.events({
    'click #facebook-login': function (event) {
        Meteor.loginWithFacebook({
            requestPermissions:['user_photos',
                'user_likes',
                'email',
                'user_location',
                'user_work_history',
                'user_friends']
        }, function (err) {
            if (err) {
                console.log(err);
                IonPopup.alert({
                    title: 'Login Failed',
                    template: 'Facebook reported an unsuccessful login.',
                    okText: 'Let me try again.'
                });
                throw new Meteor.Error("Facebook login failed");
            }
        });

    },

    'click #logout': function (event) {
        Meteor.logout(function (err) {
            if (err) {
                throw new Meteor.Error("Logout failed");
            }
        })
    }
});