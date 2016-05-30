
import { Meteor } from 'meteor/meteor';
Meteor.publish("users", function () {
  return Meteor.users.find({}, {fields: {emails: 1, profile: 1, roles:1, createdAt:1, width:1, height:1, imageAsData:1}});
});


Meteor.methods({

    'users.insert'(user) {
        Meteor.users.insert(user);
    },
    'users.remove'(userId) {
        Meteor.users.remove(userId);
    },
    'users.update'(userId, action) {
        Meteor.users.update(userId, action);
    },

});

Meteor.users.allow({
    insert: function () {
        return true;
    },
    update: function () {
        return true;
    },
    remove: function () {

        return true;
        //return userId && staff.userId === userId;
    }
});