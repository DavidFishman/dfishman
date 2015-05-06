facebookApi = {
    getNextPageResult: function (next) {

    },
    getNext: function(nextUrl,callback){
        $.get(nextUrl,callback,"json");
    },
    getPhotos: function (options, callback) {
        options.edge = 'photos';
        this.sendRequest(options, callback)
    },
    getAlbums: function (options, callback) {
        options.edge = 'albums';
        this.sendRequest(options, callback);
    },
    getPhotoUrl: function (photoId, type) {
        type = type ? type : 'normal';
        return "https://graph.facebook.com/" + photoId + "/picture?type=" + type + "&access_token=" + this.getAccessToken()
    },
    sendRequest: function (options, callback) {
        limit = options.limit ? options.limit : '20';
        identifier = options.identifier ? options.identifier : "me";
        method = options.method ? options.method : "get";
        callback = callback ? callback : function (response) {
            console.log(response)
        };
        if (options.url) {
            url = options.url;
        }
        else {
            if (!options.edge) {
                alert('no edge for facebook API');
                return;
            }
            url = "/" + identifier + "/" + options.edge;
        }
        FB.api(
            url,
            method,
            {
                limit: limit,
                access_token: this.getAccessToken()
            },
            function (response) {
                if (response && !response.error) {
                    callback(response);
                }
                else {
                    console.log(response);
                }
            }
        );

    },
    getAccessToken: function () {
        if(Meteor.user().services)
            return Meteor.user().services.facebook.accessToken;
        return false;
    }

}
;