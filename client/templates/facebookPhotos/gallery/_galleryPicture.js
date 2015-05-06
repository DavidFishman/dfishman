Template._galleryPicture.helpers({
    imageUrl:function(){
        return facebookApi.getPhotoUrl(this.id  ,"normal");
    },
    pictureSelected: function () {
        var cssClass='';
        if (Meteor.user().profile.facebookImageIds.indexOf(this.id)>=0){
            cssClass='selected';
        }
        return cssClass;
    }
});
