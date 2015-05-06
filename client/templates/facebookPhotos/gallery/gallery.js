var albumId;
var addPictures = function (result) {
    UserFBAlbums.update({id: albumId}, {$set: {'paging': result.paging}});
    for (var i = 0; i < result.data.length; i++) {
        UserFBAlbums.update({id: albumId}, {$addToSet: {'pictures': result.data[i]}});
    }
    IonLoading.hide();
};
Template.gallery.events({
    'click .loadNext': function () {
        IonLoading.show();
        var next = UserFBAlbums.findOne({id: albumId}).paging.next;
        facebookApi.getNext(next, addPictures)
    },
    'click .thumb': function (e) {
        Meteor.call('TogglePicture', this.id, function (error, result) {
            if (error) {
                console.log(error.reason);
            }
            else if (!result) {
                IonPopup.alert({
                    title: 'Too many images!',
                    template: 'You can only select up to five images.\n Please review your "Selected Photos" album, and remove some before adding more.',
                    okText: 'Got It.'
                });
            }

        });
    }
});
var pictures = [];
Template.gallery.helpers({
    pictures: function () {
        if (albumId) {
            pictures = UserFBAlbums.findOne({id: albumId}).pictures;
        }
        return pictures;
    },
    photosSelected: function () {
        var selected = 0;
        if (Meteor.user()) {
            selected = Meteor.user().profile.facebookImageIds.length;
        }
        return '(' + selected + '/5)';
    },
    hasNext: function () {
        var album = UserFBAlbums.findOne({id: albumId});
        if (album && album.paging) {
            return album.paging.next;
        }
        return false;
    }
});

Template.gallery.rendered = function () {
    if (albumId) {
        if (!UserFBAlbums.findOne({id: albumId}).pictures) {
            IonLoading.show();
        }
        this.autorun(function () {

            if (UserFBAlbums.findOne({id: albumId}).pictures) {
                IonLoading.hide();
            }
            else if (Session.get('fbLoaded') && Meteor.userId()) {
                facebookApi.getPhotos({identifier: albumId}, function (result) {
                    addPictures(result);
                });
            }

        }.bind(this));
    }

};
Template.gallery.created = function () {
    albumId = Router.current().params._albumId;
    this.autorun(function () {
        this.subscription = Meteor.subscribe('user', Meteor.userId());
    }.bind(this));
    if (!albumId) {
        var images = Meteor.user().profile.facebookImageIds;
        for (var i = 0; i < images.length; i++) {
            pictures.push({id: images[i]});
        }
    }
};
