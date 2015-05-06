UserFBAlbums = new Meteor.Collection(null);

Template.albums.rendered = function () {
    if (!UserFBAlbums.findOne({})) {
        IonLoading.show();
    }
    this.autorun(function () {
        if (UserFBAlbums.findOne({})) {
            IonLoading.hide();
        }
        else if (Session.get('fbLoaded') && Meteor.userId()) {
            facebookApi.getAlbums({}, function (result) {
                UserFBAlbums.insert({id:"me",name:"Tagged Photos"});
                for (var i = 0; i < result.data.length; i++) {
                    UserFBAlbums.insert(result.data[i]);
                }
                IonLoading.hide();
            });
        }
    }.bind(this));
};

Template.albums.helpers({
    albums: function () {
        return UserFBAlbums.find({});
    }
});

Template.albums.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('user', Meteor.userId());
    }.bind(this));
};