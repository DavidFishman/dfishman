Meteor.methods({
    'Products.vote': function (_id) {
        if (!Meteor.user()) {
            return;
        }

        if (_(Meteor.user().profile.votedProductIds).include(_id)) {
            return;
        }

        Products.update({_id: _id}, {$inc: {numberOfVotes: 1}, $addToSet: {voterIds: this.userId}});
        Meteor.users.update({_id: this.userId}, {$addToSet: {'profile.votedProductIds': _id}});
    },
    'setLocation': function (latitude, longitude) {
        if (!Meteor.user()) {
            return;
        }
        //geoJSON does long before lat
        var geoJSONPoint = {
            "type": "Point",
            "coordinates":[
                longitude,
                latitude
            ]
        };
        Meteor.users.update({_id: this.userId}, {$set: {'profile.currentLocation': geoJSONPoint}});

    },
    'TogglePicture': function (id) {
        if (!Meteor.user()) {
            return false;
        }
        var images = Meteor.user().profile.facebookImageIds;

        if (images.indexOf(id) >= 0) {
            Meteor.users.update({_id: this.userId}, {$pull: {'profile.facebookImageIds': id}});
        }
        else {
            if (images.length < 5) {
                Meteor.users.update({_id: this.userId}, {$addToSet: {'profile.facebookImageIds': id}});
            }
            else {
                return false;
            }
        }
        return true;
    }
});
