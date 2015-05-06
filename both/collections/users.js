Meteor.users.before.insert(function (userId, doc) {
    doc.profile.votedProductIds = [];
    doc.profile.facebookImageIds = [];
    doc.interestProfile = {};
    doc.profile.likedUserIds = [];
    doc.profile.passedUserIds = [];
});


Meteor.users.helpers({
    votedProducts: function () {
        return Products.find({_id: {$in: this.profile.votedProductIds}});
    },
    defaultPicture: function () {
        if (this.profile.facebookImageIds && this.profile.facebookImageIds.count > 0) {
            return facebookApi.getPhotoUrl(this.profile.facebookImageIds[0]);
        }
        else {
            return this.profile.facebookImageIds[0] || this.profilePictureUrl;
        }
    },
    /***
     *
     * @param size Size of FB pictures. small, album, or normal
     */
    selectedImageUrls: function (size) {
        var urls = [];
        if (Session.get("fbLoaded")) {
            for (var i = 0; i < this.profile.facebookImageIds.length; i++) {
                var url = facebookApi.getPhotoUrl(this.profile.facebookImageIds[i], 'album');
                urls.push(url);
            }
        }
        return urls;
    }
});

InterestProfileSchema = new SimpleSchema({
    MBTI: {
        type: String,
        allowedValues: ['ENFJ', 'ENFP', 'ENTP', 'ENTJ', 'ESFP', 'ESFJ', 'ESTP', 'ESTJ',
            'INFJ', 'INFP', 'INTP', 'INTJ', 'ISFP', 'ISFJ', 'ISTP', 'ISTJ'],
        optional: true
    },
    birthday: {
        type: Date,
        optional: true
    },
    educationProgress:{
        type: String,
        allowedValues: ['Completed','Enrolled In','Dropped out of'],
        optional: true
    },
    educationLevel: {
        type: String,
        allowedValues: ['High School','Masters','Business School','Law School','Med School','Ph.D'],
        optional: true
    },
    inchesTall:{
        type: Number,
        optional: true
    },
    kids:{
        type: String,
        regEx: /^[0-9]*$/,
        optional: true,
        allowedValues:[]
    },
    drinks:{
        type: String,
        allowedValues: ['Yes','No'],
        optional: true
    },
    drugs:{
        type: String,
        allowedValues: ['Yes','No'],
        optional: true
    },
    smokes:{
        type: String,
        allowedValues: ['Yes','No'],
        optional: true
    },

    gender: {
        type: String,
        allowedValues: ['Man', 'Woman', 'Transexual-Woman', 'Transexual-Man'],
        optional: true
    },
    interestedIn: {
        type: String,
        allowedValues: ['Men', 'Women', 'Both'],
        optional: true
    },
    jobTitle: {
        type: String,
        regEx: /^[a-z0-9A-z .]{3,30}$/,
        optional: true
    },
    employer: {
        type: String,
        regEx: /^[a-z0-9A-z .]{3,30}$/,
        optional: true
    },
    aboutMe: {
        type: String,
        optional: true
    },
    goals: {
        type: String,
        optional: true
    },
    hobbies: {
        type: String,
        optional: true
    },
    favorites: {
        type: String,
        optional: true
    }
});

UserSchema = new SimpleSchema({
    username: {
        type: String,
        regEx: /^[a-z0-9A-Z_]{3,15}$/,
        optional: true
    },
    emails: {
        type: [Object],
        // this must be optional if you also use other login services like facebook,
        // but if you use only accounts-password, then it can be required
        optional: true
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        optional: true
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: Object,
        optional: true,
        blackbox: true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // Add `roles` to your schema if you use the meteor-roles package.
    // Option 1: Object type
    // If you specify that type as Object, you must also specify the
    // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
    // Example:
    // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
    // You can't mix and match adding with and without a group since
    // you will fail validation in some cases.
    roles: {
        type: Object,
        optional: true,
        blackbox: true
    },
    interestProfile: {
        type: InterestProfileSchema,
        optional: true
    }

});
Meteor.users.attachSchema(UserSchema);
if (Meteor.isServer) {
    Meteor.users._ensureIndex({'profile.currentLocation.coordinates': '2dsphere'});
}