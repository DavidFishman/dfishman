Template._albumPreview.helpers({
    imageUrl: function () {
        if (!this.cover_photo) {
            return "https://avatars0.githubusercontent.com/u/4804028?v=3&s=96";
        }
        else {
            return facebookApi.getPhotoUrl(this.cover_photo, "album");
        }
    }
});

