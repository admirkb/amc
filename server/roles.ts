
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.publish('roles', function () {
    return Meteor.roles.find({});
});


Meteor.methods({

    'roles.insert'(role) {
        var self = this;
        Meteor.roles.insert(role);
    },
    'roles.remove'(roleId) {

        Meteor.roles.remove(roleId);
    },
    'roles.update'(roleId, action) {
        // console.dir(action)
        Meteor.roles.update(roleId, action);
    },


});
Meteor.roles.allow({
    insert: function (userId, role) {
        return true;
    },
    update: function (userId, role) {
        return true;
    },
    remove: function (userId, role) {

        return true;
        //return userId && role.userId === userId;
    }
});
