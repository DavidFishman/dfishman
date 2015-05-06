Meteor.publish('products', function () {
    return Products.find();
});

Meteor.publish('productsSearch', function (query) {
    check(query, String);

    if (_.isEmpty(query)) {
        return this.ready();
    }

    return Products.search(query);
});
Meteor.publish('nearbyUsers', function (_userId, milesAway) {
    var user = Meteor.users.findOne({_id: _userId});
    var passedIds = user.profile.passedUserIds ? user.profile.passedUserIds : [];
    var likedIds = user.profile.likedUserIds ? user.profile.likedUserIds : [];
    var lookingFor = [];
    var into = user.interestProfile.interestedIn;
    if(user.interestProfile.interestedIn){
        if(into=='Men' || into=='Both')
            lookingFor.push('male');
        if(into=='Women' || into=='Both')
            lookingFor.push('female');
    }
    return Meteor.users.find(
        {
            $and: [{
                'profile.currentLocation': {
                    $geoWithin: {
                        $centerSphere: [
                            user.profile.currentLocation.coordinates,
                            milesAway / 3963.2]
                    }
                }

            },
                {_id: {$nin: likedIds}},
                {_id: {$nin: passedIds}}
            ]
        });
});

Meteor.publishComposite('product', function (_id) {
    return {
        find: function () {
            return Products.find({_id: _id});
        },
        children: [
            {
                find: function (product) {
                    return Meteor.users.find({_id: product.userId});
                }
            },
            {
                find: function (product) {
                    return Meteor.users.find({_id: product.voterIds});
                }
            },
            {
                find: function (product) {
                    return Comments.find({productId: product._id});
                },
                children: [
                    {
                        find: function (comment) {
                            return Meteor.users.find({_id: comment.userId});
                        }
                    }
                ]
            }
        ]
    };
});

Meteor.publishComposite('user', function (_id) {
    return {
        find: function () {
            return Meteor.users.find({_id: _id});
        },
        children: [
            {
                find: function (user) {
                    return Products.find({_id: {$in: user.profile.votedProductIds}});
                }
            }
        ]
    };
});
