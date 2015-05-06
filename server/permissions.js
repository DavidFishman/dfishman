Products.allow({
  'insert': function(userId, doc) {
    return userId;
  },
  'update': function(userId, doc, fields, modifier) {
    return userId === doc.userId;
  },
  'remove': function(userId, doc) {
    return false;
  }
});

Comments.allow({
  'insert': function(userId, doc) {
    return userId;
  },
  'update': function(userId, doc, fields, modifier) {
    return userId === doc.userId;
  },
  'remove': function(userId, doc) {
    return false;
  }
});

Meteor.users.allow({
    update: function (userId, user, fields, modifier) {
        // can only change your own documents
        console.log("Updating");
        if(user._id === userId)
        {
            Meteor.users.update({_id: userId}, modifier);
            return true;
        }
        else return false;
    }
});