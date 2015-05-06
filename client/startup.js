Meteor.startup(function () {
    Session.set('fbLoaded',false);
});
Deps.autorun(function() {
    if(Meteor.userId() && Geolocation.latLng()) {
        var location = Geolocation.latLng();
        var latitude = location.lat;
        var longitude = location.lng;
        Meteor.call("setLocation",latitude,longitude);
    }
});