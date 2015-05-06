Router.route('/', {
    name: 'trending'
});

Router.route('/login', {
    name: 'login'
});

Router.route('/map', {
    name: 'map'
});

Router.route('/cards', {
    name: 'cards'
});

Router.route('/albums', {
    name: 'albums',
    data: {
        path: 'profile'
    }
});

Router.route('/gallery/:_albumId?', {
    name: 'gallery',
    data: {
        path: 'albums'
    },
    onBeforeAction: function () {
        var albumId = this.params._albumId;
        if (albumId && !UserFBAlbums.findOne({id: albumId})) {
            this.render('albums');
        }
        else{
            this.next();
        }
    }
});

Router.route('/recent', {
    name: 'recent'
});

Router.route('/products/:_id', {
    name: 'products.show'
});

Router.route('/users/:_id', {
    name: 'users.show'
});

Router.route('/notifications', {
    name: 'notifications'
});

Router.route('/profile', {
    name: 'profile'
});


Router.onBeforeAction(function () {
    if (!Meteor.userId()) {
        this.render('login');
    } else {
        this.next();
    }
});