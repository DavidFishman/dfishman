if (Meteor.isServer) {
    ServiceConfiguration.configurations.remove({
        service: 'facebook'
    });

    ServiceConfiguration.configurations.insert({
        service: 'facebook',
        appId: '364170930452589',
        secret: 'd5c2507dd91f7ff47c5f6aff7e90e4d7'
    });
}
